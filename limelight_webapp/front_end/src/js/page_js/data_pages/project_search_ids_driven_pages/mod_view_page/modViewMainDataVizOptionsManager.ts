import { Handlebars, _mod_table_template_bundle } from './mod_ViewPage_Import_Handlebars_AndTemplates_Generic'
import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch';
import { addToolTips } from 'page_js/common_all_pages/genericToolTip';

export class ModViewDataVizRendererOptionsHandler {

    static showOptionsOnPage({
                                 searchDetailsBlockDataMgmtProcessing,
                                 dataPageStateManager_DataFrom_Server,
                                 vizOptionsData,
                                 modViewDataManager
                             }) {

        // defaults for the viz
        const defaults = {
            psmQuant: 'ratios',
        };

        // clear the div
        ModViewDataVizRendererOptionsHandler.clearDiv();

        // // add protein position filter info
        // ModViewDataVizRendererOptionsHandler.addProteinPositionFilterToPage({
        //     proteinPositionFilterStateManager,
        //     searchDetailsBlockDataMgmtProcessing,
        //     dataPageStateManager_DataFrom_Server,
        //     vizOptionsData,
        //     projectSearchIds : undefined,
        //     modViewDataManager
        // });

        // add section to page
        ModViewDataVizRendererOptionsHandler.addFormToPage();

        // add in any defaults that aren't explicitly set
        ModViewDataVizRendererOptionsHandler.populateDefaultOptions({ defaults, vizOptionsData });

        // update fields to reflect what's in vizOptionsData
        ModViewDataVizRendererOptionsHandler.updateFormSelectionsToReflectState({ vizOptionsData });

        // add handlers to fields
        ModViewDataVizRendererOptionsHandler.addChangeHandlerToFormElements({
            searchDetailsBlockDataMgmtProcessing,
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager
        })
    }

    static addChangeHandlerToFormElements({
                                              searchDetailsBlockDataMgmtProcessing,
                                              dataPageStateManager_DataFrom_Server,
                                              vizOptionsData,
                                              modViewDataManager
                                          }) {

        const $formDiv = $('div#data-viz-form');

        $formDiv.find('input#update-viz-button').click( function() {

            console.log('clicked update data viz');

            //  These variables that hold values from .val() are all cast to 'any' because otherwise the code !isNaN(...) does not compile in Typescript

            //        Search for ": any"

            //  It is unclear what the code the code !isNaN(...) does since .val() likely never returns a number

            // update ratios vs/ counts
            {
                // value of psm quant choice
                const choice = $formDiv.find("input:radio[name='psm-quant']:checked").val();
                vizOptionsData.data.psmQuant = choice;
            }

            // update what kind of transformation we're applying to the data (e.g. zscore)
            {
                const choice = $formDiv.find("select#transformation-pulldown").val();
                vizOptionsData.data.dataTransformation = choice;
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
            {

                vizOptionsData.data.includeOpenMods = $formDiv.find("input#include-open-mods-checkbox").prop('checked');
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
                searchDetailsBlockDataMgmtProcessing,
                dataPageStateManager_DataFrom_Server,
                vizOptionsData,
                modViewDataManager
            });

        });

    }

    static updateFormSelectionsToReflectState({ vizOptionsData }) {

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

        // update whether or not to include open mods
        {
            if( vizOptionsData.data.includeOpenMods !== undefined ) {
                $formToUpdate.find("input#include-open-mods-checkbox").prop( "checked", vizOptionsData.data.includeOpenMods);
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

    // static addProteinPositionFilterToPage({
    //                                           vizOptionsData,
    //                                           proteinPositionFilterStateManager,
    //                                           searchDetailsBlockDataMgmtProcessing,
    //                                           dataPageStateManager_DataFrom_Server,
    //                                           modViewDataManager
    //                                         }) {
    //
    //     const $mainContentDiv = $('#mod_list_container');
    //
    //     const template = Handlebars.templates.currentProteinPositionFilterList;
    //     let props = ProteinPositionFilterOverlayDisplayManager.getPropsForProteinPositionFilterList( { proteinPositionFilterStateManager, proteinData } );
    //     const html = template( props );
    //     $mainContentDiv.append( html );
    //
    //     const callbackOnClickedHide = function() {
    //
    //         ModViewDataVizRendererOptionsHandler.showOptionsOnPage({
    //             vizOptionsData,
    //             proteinPositionFilterStateManager,
    //             searchDetailsBlockDataMgmtProcessing,
    //             dataPageStateManager_DataFrom_Server,
    //             modViewDataManager
    //         });
    //
    //         // add the viz to the page using these viz options
    //         ModViewDataVizRenderer_MultiSearch.renderDataViz({
    //             vizOptionsData,
    //             proteinPositionFilterStateManager,
    //             searchDetailsBlockDataMgmtProcessing,
    //             dataPageStateManager_DataFrom_Server: dataPageStateManager_DataFrom_Server,
    //             modViewDataManager
    //         });
    //     }
    //
    //     $( 'div#protein-position-filter-launch' ).click( function(e) {
    //
    //         {
    //             // const msg = "Error in $( 'div#protein-position-filter-launch' ).click(:  The call to ProteinPositionFilterOverlayDisplayManager.displayOverlay requires param 'projectSearchId' but there is no 'projectSearchId' available, only 'projectSearchIds'"
    //             // console.warn( msg )
    //             //  Comment out throw to allow the code to continue since it seems to have worked before without projectSearchId being passed
    //             // throw Error( msg )
    //         }
    //
    //         ProteinPositionFilterOverlayDisplayManager.displayOverlay( {
    //             callbackOnClickedHide,
    //             proteinPositionFilterStateManager,
    //             projectSearchId : undefined,
    //             searchDetailsBlockDataMgmtProcessing,
    //             dataPageStateManager_DataFrom_Server
    //         } );
    //         return false;
    //     });
    // }

    /**
     * Save the default option values to vizOptionsData if there are no values set for those options
     * @param defaults
     * @param vizOptionsData
     */
    static populateDefaultOptions({ defaults, vizOptionsData }) {

        for(const optionName of Object.keys(defaults)) {
            if( !Object.keys(vizOptionsData.data).includes(optionName)) {
                vizOptionsData.data[optionName] = defaults[optionName];
            }
        }
    }

}