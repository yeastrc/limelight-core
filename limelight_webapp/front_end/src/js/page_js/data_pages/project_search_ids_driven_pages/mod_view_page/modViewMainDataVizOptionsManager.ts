import { Handlebars, _mod_table_template_bundle } from './mod_ViewPage_Import_Handlebars_AndTemplates_Generic'
import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch';
import { addToolTips } from 'page_js/common_all_pages/genericToolTip';
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {
    ProteinPositionFilterDataManager,
    ProteinRange
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {
    ModView_VizOptionsData,
    ModView_VizOptionsData_SubPart_data
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

export class ModViewDataVizRendererOptionsHandler {

    static async showOptionsOnPage(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        } : {
            dataPageStateManager_DataFrom_Server :  DataPageStateManager
            vizOptionsData : ModView_VizOptionsData
            modViewDataManager : ModViewDataManager
            allProjectSearchIds : Array<number>
    }) {

        // defaults for the viz
        const defaults : ModView_VizOptionsData_SubPart_data = {
            psmQuant: 'ratios',
        };

        // clear the div
        ModViewDataVizRendererOptionsHandler.clearDiv();

        // add section to page
        ModViewDataVizRendererOptionsHandler.addFormToPage();

        // add in any defaults that aren't explicitly set
        ModViewDataVizRendererOptionsHandler.populateDefaultOptions({ defaults, vizOptionsData });

        // update fields to reflect what's in vizOptionsData
        ModViewDataVizRendererOptionsHandler.updateFormSelectionsToReflectState({ vizOptionsData });

        // add handlers to fields
        ModViewDataVizRendererOptionsHandler.addChangeHandlerToFormElements({
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        });

        await ModViewDataVizRendererOptionsHandler.updateProteinPositionFilterProteinListing({
            vizOptionsData,
            modViewDataManager,
            $formDiv:$('div#data-viz-form'),
            allProjectSearchIds
        });

    }

    static async showProteinPositionFilterForm(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            $formDiv,
            allProjectSearchIds
        } : {
            dataPageStateManager_DataFrom_Server:DataPageStateManager,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            $formDiv:any,
            allProjectSearchIds:Array<number>
        }) : Promise<void>
    {

        // add text saying data are loading
        const $addButtonContainer = $formDiv.find('div#add-protein-filter-button-container');
        const $addProteinForm = $formDiv.find('div#add-protein-filter-form-container');

        $addButtonContainer.hide();

        $addProteinForm.show();
        $addProteinForm.html("Loading protein data...");

        const formHTML = await ModViewDataVizRendererOptionsHandler.getAddProteinFormHTML({
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        });

        $addProteinForm.empty();
        $addProteinForm.append($(formHTML));

        // update the end position for the default-selected protein
        await ModViewDataVizRendererOptionsHandler.updateEndPositionForProteinPositionProtein({
            formDiv: $formDiv,
            projectSearchIds: allProjectSearchIds,
            modViewDataManager
        });

        const $newform = $formDiv.find('form#add-protein-position-form');

        // add click handler for cancel
        $newform.find('input#protein-position-filter-cancel').click( function() {
            ModViewDataVizRendererOptionsHandler.proteinPositionCancelClicked({formDiv:$formDiv});
        });

        // add click handler for add
        $newform.find('input#protein-position-filter-add').click( function() {
            ModViewDataVizRendererOptionsHandler.proteinPositionAddClicked({$formDiv, vizOptionsData, modViewDataManager, allProjectSearchIds});
        });

        // add change handler for select field
        $newform.find('select#add-protein-position-select').change( function() {
            ModViewDataVizRendererOptionsHandler.updateEndPositionForProteinPositionProtein({
                formDiv: $formDiv,
                projectSearchIds: allProjectSearchIds,
                modViewDataManager
            });
        });

    }

    static proteinPositionAddClicked(
        {
            vizOptionsData,
            modViewDataManager,
            $formDiv,
            allProjectSearchIds
        } : {
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            $formDiv:any,
            allProjectSearchIds:Array<number>
        }):void {

        const $addButtonContainer = $formDiv.find('div#add-protein-filter-button-container');
        const $addProteinForm = $formDiv.find('div#add-protein-filter-form-container');

        const proteinIdString = $formDiv.find("select#add-protein-position-select").val();
        let startString = $formDiv.find("input#protein-position-filter-start-position").val();
        let endString = $formDiv.find("input#protein-position-filter-end-position").val();

        // do some form validation.
        // all of these returns should be producing some kind of error message to the user

        if(startString.length < 1 && endString.length < 1) { return; }
        if(startString.length < 1) { startString = endString; }
        if(endString.length < 1) { endString = startString; }

        // should produce error messages for these cases
        if(!(/^\d+$/.test(startString))) { return; }
        if(!(/^\d+$/.test(endString))) { return; }

        const proteinId = parseInt(proteinIdString);
        const start = parseInt(startString);
        const end = parseInt(endString);

        if(end < start) { return; }

        // data checks out if we got here, add it to the page
        if(vizOptionsData.data.proteinPositionFilter === undefined) {
            vizOptionsData.data.proteinPositionFilter = new ProteinPositionFilterDataManager();
        }

        const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;
        proteinPositionFilter.addProteinRange({proteinId, start, end});

        // update the listed protein positions
        ModViewDataVizRendererOptionsHandler.updateProteinPositionFilterProteinListing(
            {
                vizOptionsData,
                modViewDataManager,
                $formDiv,
                allProjectSearchIds
            }
        );

    }

    static async updateProteinPositionFilterProteinListing(
        {
            vizOptionsData,
            modViewDataManager,
            $formDiv,
            allProjectSearchIds
        } : {
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            $formDiv:any,
            allProjectSearchIds:Array<number>
        }) : Promise<void> {

        const $divToUpdate = $formDiv.find('div#current-protein-position-filters');
        $divToUpdate.empty();

        const proteinPositionFilterManager: ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;

        if (proteinPositionFilterManager === undefined) {
            $divToUpdate.html('Showing all proteins and positions.');
            return;
        }

        const currentRanges = await ModViewDataVizRendererOptionsHandler.sortRanges({
            ranges:proteinPositionFilterManager.getProteinRanges(),
            allProjectSearchIds,
            modViewDataManager
        });

        if(currentRanges.length < 1) {
            $divToUpdate.html('Showing all proteins and positions.');
            return;
        }

        for(const range of currentRanges) {
            const idString:string = 'delete-protein-position-filter-' + range.proteinId + '-' + range.start + '-' + range.end;
            let html = '<div class=\"protein-position-filter-listing\">';
            html += await ModViewDataVizRendererOptionsHandler.getStringForRangeListing({modViewDataManager, allProjectSearchIds, range});
            html += '<img id=\"' + idString + '\" style=\"margin-left:2px;\" src=\"static/images/icon-circle-delete.png\" class=\"icon-small clickable\" />';
            html += '</div>';

            $divToUpdate.append($(html));

            // add deletion click handler to this
            $formDiv.find('img#' + idString).click(function() {
                if(vizOptionsData.data.proteinPositionFilter !== undefined) {
                    const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;
                    proteinPositionFilter.deleteProteinRange({proteinId:range.proteinId, start:range.start, end:range.end});

                    ModViewDataVizRendererOptionsHandler.updateProteinPositionFilterProteinListing({
                        vizOptionsData,
                        modViewDataManager,
                        $formDiv,
                        allProjectSearchIds
                    });
                }
            });
        }

    }

    static async getStringForRangeListing(
        {
            modViewDataManager,
            allProjectSearchIds,
            range
        } : {
            modViewDataManager:ModViewDataManager,
            allProjectSearchIds:Array<number>,
            range:ProteinRange
        }) : Promise<String> {

        const name = await ModViewDataVizRendererOptionsHandler.getNameForProteinId({modViewDataManager, allProjectSearchIds, proteinId:range.proteinId});
        const protein = await modViewDataManager.getDataForProteinMultipleSearches({proteinId:range.proteinId, projectSearchIds:allProjectSearchIds});
        const length = protein.length;

        if(range.start === 1 && range.end >= length) {
            return name;
        }

        return name + ' (' + range.start + '-' + range.end + ')';
    }


    /**
     * Sort the protein ranges by protein name first, then by start position of the range
     *
     * @param modViewDataManager
     * @param allProjectSearchIds
     * @param ranges
     */
    static async sortRanges(
        {
            modViewDataManager,
            allProjectSearchIds,
            ranges
        } : {
            modViewDataManager:ModViewDataManager,
            allProjectSearchIds:Array<number>,
            ranges:Array<ProteinRange>
        }) : Promise<Array<ProteinRange>> {

        // sort the ranges by protein name then start position
        const proteinNamesMap = new Map<number, string>();
        for(const range of ranges) {
            if(!(proteinNamesMap.has(range.proteinId))) {
                proteinNamesMap.set(range.proteinId, await ModViewDataVizRendererOptionsHandler.getNameForProteinId({proteinId:range.proteinId, allProjectSearchIds, modViewDataManager}));
            }
        }

        ranges.sort(function(a,b) {
            const nameA = proteinNamesMap.get(a.proteinId);
            const nameB = proteinNamesMap.get(b.proteinId);

            if(nameA < nameB) { return -1; }
            if(nameA > nameB) { return 1; }

            return a.start - b.start;
        });

        return ranges;
    }



    static async getNameForProteinId(
        {
            modViewDataManager,
            allProjectSearchIds,
            proteinId
        } : {
            modViewDataManager:ModViewDataManager,
            allProjectSearchIds:Array<number>,
            proteinId:number
        }) : Promise<string> {

        try {
            const combinedProtein = await modViewDataManager.getDataForProteinMultipleSearches({
                proteinId,
                projectSearchIds: allProjectSearchIds
            });

            const sortedNames = Array.from(combinedProtein.annotations.keys()).sort();

            let name = sortedNames.join(", ");
            if (name.length > 20) {
                name = name.substring(0, 20);
            }

            return name;
        } catch (e) {
            console.error("Could not find name for proteinId", proteinId);
            return "Name not found";
        }
    }


    static async updateEndPositionForProteinPositionProtein(
        {
            formDiv,
            projectSearchIds,
            modViewDataManager
        } : {
            formDiv:any,
            projectSearchIds:Array<number>,
            modViewDataManager:ModViewDataManager
        }
    ) : Promise<void> {

        const length = await ModViewDataVizRendererOptionsHandler.getLengthOfSelectedProteinPositionProtein({
            formDiv,
            projectSearchIds,
            modViewDataManager
        });

        formDiv.find("input#protein-position-filter-end-position").val(length);
        formDiv.find("input#protein-position-filter-start-position").val(1);
    }

    static proteinPositionCancelClicked({formDiv}:{formDiv:any}):void {

        const $addButtonContainer = formDiv.find('div#add-protein-filter-button-container');
        const $addProteinForm = formDiv.find('div#add-protein-filter-form-container');

        $addButtonContainer.show();

        $addProteinForm.hide();
        $addProteinForm.empty();
    }

    static getSelectedProteinPositionProtein({formDiv}:{formDiv:any}):number {
        const proteinIdString = formDiv.find("select#add-protein-position-select").val();
        return parseInt(proteinIdString);
    }

    static async getLengthOfSelectedProteinPositionProtein(
        {
            formDiv,
            projectSearchIds,
            modViewDataManager
        }:{
            formDiv:any,
            projectSearchIds:Array<number>,
            modViewDataManager:ModViewDataManager
        }
        ):Promise<number> {

        const proteinId = ModViewDataVizRendererOptionsHandler.getSelectedProteinPositionProtein({formDiv});
        const protein = await modViewDataManager.getDataForProteinMultipleSearches({proteinId, projectSearchIds});

        return protein.length;
    }


    static async getAddProteinFormHTML(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        } : {
            dataPageStateManager_DataFrom_Server:DataPageStateManager,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            allProjectSearchIds:Array<number>
        })
    {

        console.log('called getAddProteinForm()');

        // load the data
        const sortedProteinObjects = await ModViewDataVizRendererOptionsHandler.getProteinsForForm({
            modViewDataManager,
            allProjectSearchIds
        });

        const genericProteinObjects = new Array<any>();
        for(const prot of sortedProteinObjects) {
            const ob = {
                name: prot.name,
                id: prot.id,
                description: prot.description
            };

            genericProteinObjects.push(ob);
        }

        const template = Handlebars.templates.addProteinPositionForm;
        const html = template( {proteins:genericProteinObjects} );

        return html;
    }

    static async getProteinsForForm(
        {
            modViewDataManager,
            allProjectSearchIds
        } : {
            modViewDataManager:ModViewDataManager,
            allProjectSearchIds:Array<number>
        }) : Promise<Array<SimplifiedProtein>>
    {

        console.log('called getProteinsForForm()');

        const proteinIds = await modViewDataManager.getAllProteinIdsInSearches({projectSearchIds:allProjectSearchIds});
        const simplifiedProteinArray = new Array<SimplifiedProtein>();

        for(const proteinId of proteinIds) {
            const combinedProtein = await modViewDataManager.getDataForProteinMultipleSearches({proteinId, projectSearchIds:allProjectSearchIds});
            const sortedNames = Array.from(combinedProtein.annotations.keys()).sort();
            const allAnnotations = new Set<string>();

            for(const sn of sortedNames) {
                for(const sd of combinedProtein.annotations.get(sn)) {
                    allAnnotations.add(sd);
                }
            }

            let name = sortedNames.join(", ");
            if(name.length > 20) { name = name.substring(0, 20); }

            let description = Array.from(allAnnotations).sort().join(", ");
            if(description === null || description.length < 1) { description = "No description found."; }

            const protein = new SimplifiedProtein({id:proteinId, name, description, length});
            simplifiedProteinArray.push(protein);
        }

        simplifiedProteinArray.sort(function(a, b) {
            if(a.name < b.name) { return -1; }
            if(a.name == b.name) { return 0; }
            return 1;
        });

        return simplifiedProteinArray;
    }

    static addChangeHandlerToFormElements(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        } : {
            dataPageStateManager_DataFrom_Server :  DataPageStateManager
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager : ModViewDataManager
            allProjectSearchIds : Array<number>
        }) {

        const $formDiv = $('div#data-viz-form');

        // add click handler to "Add Protein Filter"
        $formDiv.find('input#add-protein-filter-button').click( function() {
            console.log('clicked update data viz');
            ModViewDataVizRendererOptionsHandler.showProteinPositionFilterForm({
                $formDiv,
                vizOptionsData,
                modViewDataManager,
                dataPageStateManager_DataFrom_Server,
                allProjectSearchIds
            });
        });


        // add click handler to "Update Visualization"
        $formDiv.find('input#update-viz-button').click( function() {

            console.log('clicked update data viz');

            //  These variables that hold values from .val() are all cast to 'any' because otherwise the code !isNaN(...) does not compile in Typescript

            //        Search for ": any"

            //  It is unclear what the code the code !isNaN(...) does since .val() likely never returns a number

            // update ratios vs/ counts
            {
                // value of psm quant choice
                const choice = $formDiv.find("input:radio[name='psm-quant']:checked").val();
                if ( ! limelight__IsVariableAString( choice ) ) {
                    const msg = "Value from '$formDiv.find(\"input:radio[name='psm-quant']:checked\").val();' is NOT a string."
                    console.warn( msg + " value: ", choice )
                    throw Error( msg + " value: " + choice )
                }
                vizOptionsData.data.psmQuant = choice as string;  // Cast as String since just validated it is a string
            }

            // update what kind of transformation we're applying to the data (e.g. zscore)
            {
                const choice = $formDiv.find("select#transformation-pulldown").val();
                if ( ! limelight__IsVariableAString( choice ) ) {
                    const msg = "Value from '$formDiv.find(\"select#transformation-pulldown\").val();' is NOT a string."
                    console.warn( msg + " value: ", choice )
                    throw Error( msg + " value: " + choice )
                }
                vizOptionsData.data.dataTransformation = choice as string;
            }

            // update cutoffs for color scale
            {
                const ratioCutoff : any = $formDiv.find("input#color-cutoff-ratio").val();
                if( ratioCutoff === '') {
                    delete vizOptionsData.data.colorCutoffRatio;
                } else if( ratioCutoff !== undefined && !isNaN(ratioCutoff) ) {
                    vizOptionsData.data.colorCutoffRatio = parseFloat(ratioCutoff);
                }

                const countCutoff : any = $formDiv.find("input#color-cutoff-count").val();
                if( countCutoff === '' ) {
                    delete vizOptionsData.data.colorCutoffCount;
                } else if( countCutoff !== undefined && !isNaN(countCutoff) ) {
                    vizOptionsData.data.colorCutoffCount = parseInt(countCutoff);
                }
            }

            // update min and max mod masses
            {

                const cutoff : any = $formDiv.find("input#modmass-cutoff-min").val();
                if( cutoff === '' ) {
                    delete vizOptionsData.data.modMassCutoffMin;
                } else if( cutoff !== undefined && !isNaN(cutoff) ) {
                    vizOptionsData.data.modMassCutoffMin = parseInt(cutoff);
                }
            }
            {

                const cutoff : any = $formDiv.find("input#modmass-cutoff-max").val();
                if( cutoff === '' ) {
                    delete vizOptionsData.data.modMassCutoffMax;
                } else if( cutoff !== undefined && !isNaN(cutoff) ) {
                    vizOptionsData.data.modMassCutoffMax = parseInt(cutoff);
                }
            }

            // update whether we're showing psms or scan data
            {
                const isPsmsChecked = $formDiv.find("input#quant-type-option-psms").prop('checked');
                if(isPsmsChecked) {
                    vizOptionsData.data.quantType = 'psms';
                } else {
                    vizOptionsData.data.quantType = 'scans';
                }

                console.log('vizOptionsData', vizOptionsData);
            }

            // update hash in URL to reflect user customization state
            vizOptionsData.stateManagementObject.updateState();

            ModViewDataVizRenderer_MultiSearch.renderDataViz({
                dataPageStateManager_DataFrom_Server,
                vizOptionsData,
                modViewDataManager
            });

        });

    }

    static updateFormSelectionsToReflectState({ vizOptionsData } : {

        vizOptionsData: ModView_VizOptionsData
    }) {

        // get a handle to the form
        const $formToUpdate = $('div#data-viz-form');
        if( !$formToUpdate ) {
            console.log( "ERROR: Asked to populate form with defaults, but there is no form.");
            return;
        }

        // update ratios vs/ counts
        {
            if( vizOptionsData.data.psmQuant === 'ratios' ) {
                $formToUpdate.find("input#psm-quant-option-ratios").attr('checked', 'checked');
            } else {
                $formToUpdate.find("input#psm-quant-option-counts").attr('checked', 'checked');
            }
        }

        // update data transformations
        {
            const option = vizOptionsData.data.dataTransformation;

            if( option === undefined || option === 'none' ) {
                $formToUpdate.find('option[value="none"]').prop('selected', 'selected');
            } else if( option === 'scaled-mean-diff') {
                $formToUpdate.find('option[value="scaled-mean-diff"]').prop('selected', 'selected');
            } else if( option === 'per-mod-zscore') {
                $formToUpdate.find('option[value="per-mod-zscore"]').prop('selected', 'selected');
            } else if( option === 'global-zscore') {
                $formToUpdate.find('option[value="global-zscore"]').prop('selected', 'selected');
            } else if( option === 'global-pvalue-bonf') {
                $formToUpdate.find('option[value="global-pvalue-bonf"]').prop('selected', 'selected');
            } else if( option === 'global-qvalue-bh') {
                $formToUpdate.find('option[value="global-qvalue-bh"]').prop('selected', 'selected');
            }
        }

        // update ratio and count cutoffs
        {
            if( vizOptionsData.data.colorCutoffRatio !== undefined ) {
                $formToUpdate.find("input#color-cutoff-ratio").val(vizOptionsData.data.colorCutoffRatio )
            }
            if( vizOptionsData.data.colorCutoffCount !== undefined ) {
                $formToUpdate.find("input#color-cutoff-count").val(vizOptionsData.data.colorCutoffCount )
            }
        }

        // update min and max mod masses
        {
            if( vizOptionsData.data.modMassCutoffMin !== undefined ) {
                $formToUpdate.find("input#modmass-cutoff-min").val(vizOptionsData.data.modMassCutoffMin )
            }
            if( vizOptionsData.data.modMassCutoffMax !== undefined ) {
                $formToUpdate.find("input#modmass-cutoff-max").val(vizOptionsData.data.modMassCutoffMax )
            }
        }

        // update whether we're counting psms or scans
        {
            if( vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms' ) {
                $formToUpdate.find("input#quant-type-option-psms").prop( "checked", true);
            } else {
                $formToUpdate.find("input#quant-type-option-scans").prop( "checked", true);
            }

        }

    }

    static addFormToPage() {

        const $mainContentDiv = $('#mod_list_container');

        // blow away existing form if it exists
        $mainContentDiv.find("div#data-viz-options-container").remove();

        const template = _mod_table_template_bundle.dataVizOptionsForm;
        const html = template( {  } );
        $mainContentDiv.append(  $(html) );

        addToolTips($mainContentDiv.find('div#data-viz-options-container'));

    }

    static clearDiv() {
        const $mainContentDiv = $('#mod_list_container');
        $mainContentDiv.empty();
    }

    /**
     * Save the default option values to vizOptionsData if there are no values set for those options
     * @param defaults
     * @param vizOptionsData
     */
    static populateDefaultOptions({ defaults, vizOptionsData } : {

        defaults: ModView_VizOptionsData_SubPart_data
        vizOptionsData: ModView_VizOptionsData
    }) {

        for(const optionName of Object.keys(defaults)) {
            if( !Object.keys(vizOptionsData.data).includes(optionName)) {
                vizOptionsData.data[optionName] = defaults[optionName];
            }
        }
    }
}

export class SimplifiedProtein {

    private readonly _id:number;
    private readonly _name:string;
    private readonly _description:string;
    private readonly _length:number;

    constructor({id, name, description, length}:{id:number, name:string, description:string, length:number}) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._length = length;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get length(): number {
        return this._length;
    }
}
