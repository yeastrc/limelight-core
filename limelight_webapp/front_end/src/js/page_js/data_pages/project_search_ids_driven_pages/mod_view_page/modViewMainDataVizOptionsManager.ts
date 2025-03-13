import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch';
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {
    ModView_VizOptionsData,
    ModView_VizOptionsData_SubPart_data
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import ReactDOM from "react-dom";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import React from "react";
import {
    ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_MainContent_Component";
import {
    ModPage_OptionsSection_UserInput_Display_Root_Component,
    ModPage_OptionsSection_UserInput_Display_Root_Component_Props
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_Root_Component";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

export class ModViewDataVizRendererOptionsHandler {

    /**
     * @param dataPageStateManager_DataFrom_Server
     * @param vizOptionsData
     * @param modViewDataManager
     * @param allProjectSearchIds
     */
    static async showOptionsOnPage(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            dataPageStateManager_DataFrom_Server :  DataPageStateManager
            vizOptionsData : ModView_VizOptionsData
            modViewDataManager : ModViewDataManager
            allProjectSearchIds : Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) { try {

        // defaults for the viz
        const defaults : ModView_VizOptionsData_SubPart_data = {
            psmQuant: 'counts',
        };

        // clear the div
        ModViewDataVizRendererOptionsHandler._clearDiv_OuterContainer();

        // add section to page - wait for React render
        await ModViewDataVizRendererOptionsHandler._addFormToPage({
            vizOptionsData,
            projectSearchIds: allProjectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        // add in any defaults that aren't explicitly set
        ModViewDataVizRendererOptionsHandler._populateDefaultOptions({ defaults, vizOptionsData });

        // update fields to reflect what's in vizOptionsData
        ModViewDataVizRendererOptionsHandler._updateFormSelectionsToReflectState({ vizOptionsData });

        // add handlers to fields
        ModViewDataVizRendererOptionsHandler._addChangeHandlerToFormElements({
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager,
            allProjectSearchIds
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    private static _addChangeHandlerToFormElements(
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
            }

            // update whether we're excluding unlocalized modifications
            {
                const isExcludeChecked = $formDiv.find("input#exclude-unlocalized-mods-checkbox").prop('checked');
                if(isExcludeChecked) {
                    vizOptionsData.data.excludeUnlocalizedOpenMods = true;
                } else {
                    vizOptionsData.data.excludeUnlocalizedOpenMods = false;
                }
            }

            console.log('vizOptionsData', vizOptionsData);

            // update hash in URL to reflect user customization state
            vizOptionsData.stateManagementObject.updateState();

            ModViewDataVizRenderer_MultiSearch.renderDataViz({
                dataPageStateManager_DataFrom_Server,
                vizOptionsData,
                modViewDataManager
            });

        });

    }

    private static _updateFormSelectionsToReflectState({ vizOptionsData } : {

        vizOptionsData: ModView_VizOptionsData
    }) {

        // get a handle to the form
        const $formToUpdate = $('div#data-viz-form');
        if( !$formToUpdate ) {
            console.log( "ERROR: Asked to populate form with defaults, but there is no form.");
            return;
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

        // update ratios vs/ counts
        {
            if( vizOptionsData.data.psmQuant === 'ratios' ) {

                const $elem = $formToUpdate.find("input#psm-quant-option-ratios")

                console.warn( ' $formToUpdate.find("input#psm-quant-option-ratios") $elem: ', $elem )

                $formToUpdate.find("input#psm-quant-option-ratios").prop('checked', true);
            } else {
                $formToUpdate.find("input#psm-quant-option-counts").prop('checked', true);
            }
        }

        // update whether we're counting psms or scans
        {
            if( vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms' ) {
                $formToUpdate.find("input#quant-type-option-psms").prop( "checked", true);
            } else {
                const $elem = $formToUpdate.find("input#quant-type-option-scans")

                console.warn( ' $formToUpdate.find("input#quant-type-option-scans") $elem: ', $elem )

                $formToUpdate.find("input#quant-type-option-scans").prop( "checked", true);
            }
        }

        // update whether we're excluding unlocalized mods
        {
            if( vizOptionsData.data.excludeUnlocalizedOpenMods === undefined || !(vizOptionsData.data.excludeUnlocalizedOpenMods) ) {
                $formToUpdate.find("input#exclude-unlocalized-mods-checkbox").prop( "checked", false);
            } else {
                $formToUpdate.find("input#exclude-unlocalized-mods-checkbox").prop( "checked", true);
            }
        }

    }

    private static _addFormToPage(
        {
            vizOptionsData, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            vizOptionsData : ModView_VizOptionsData
            projectSearchIds : Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) : Promise<void> {

        //  ASSUME:   Only contents inside <div> with id 'data_viz_options__outer_container' is the contents added here


        const data_viz_options__outer_container_DOM = document.getElementById( "data_viz_options__outer_container" )

        if ( ! data_viz_options__outer_container_DOM ) {
            throw Error("NO DOM element with id 'data_viz_options__outer_container'")
        }

        return new Promise<void>( (resolve, reject) => { try {

            const props_Prop: ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop = {
                vizOptionsData,
                projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            }

            const props: ModPage_OptionsSection_UserInput_Display_Root_Component_Props = {
                propsValue: props_Prop
            }

            const component =
                React.createElement(
                    ModPage_OptionsSection_UserInput_Display_Root_Component,
                    props,
                    null
                )

            ReactDOM.render(
                component,
                data_viz_options__outer_container_DOM,
                () => {  try {

                    resolve()  //  render compete so resolve

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    private static _clearDiv_OuterContainer() {

        const data_viz_options__outer_container_DOM = document.getElementById( "data_viz_options__outer_container" )

        if ( ! data_viz_options__outer_container_DOM ) {
            throw Error("NO DOM element with id 'data_viz_options__outer_container'")
        }

        ReactDOM.unmountComponentAtNode( data_viz_options__outer_container_DOM )
    }

    /**
     * Save the default option values to vizOptionsData if there are no values set for those options
     * @param defaults
     * @param vizOptionsData
     */
    private static _populateDefaultOptions({ defaults, vizOptionsData } : {

        defaults: ModView_VizOptionsData_SubPart_data
        vizOptionsData: ModView_VizOptionsData
    }) {

        //  param 'defaults' AND 'vizOptionsData.data' MUST both be same class which is currently 'ModView_VizOptionsData_SubPart_data'

        const vizOptionsData_Data: ModView_VizOptionsData_SubPart_data = vizOptionsData.data

        const vizOptionsData_data_ObjectKeys = Object.keys(vizOptionsData.data)

        for(const optionName of Object.keys(defaults)) {
            if( ! vizOptionsData_data_ObjectKeys.includes(optionName) ) {

                vizOptionsData_Data[optionName] = defaults[optionName];
            }
        }
    }
}
