let Handlebars = require('handlebars/runtime');

let _mod_table_template_bundle = require("../../../../../../handlebars_templates_precompiled/mod_view_page/mod_view_page_template-bundle.js" );

import {ModViewDataVizRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch.js';

export class ModViewDataVizRendererOptionsHandler {

    static showOptionsOnPage({
                                 reportedPeptideModData,
                                 proteinPositionResidues,
                                 totalPSMCount,
                                 aminoAcidModStats,
                                 proteinData,
                                 proteinPositionFilterStateManager,
                                 searchDetailsBlockDataMgmtProcessing,
                                 dataPageStateManager_DataFrom_Server,
                                 vizOptionsData
                             }) {

        // defaults for the viz
        const defaults = {
            psmQuant: 'ratios',
        };

        // add section to page
        ModViewDataVizRendererOptionsHandler.addFormToPage();

        // add in any defaults that aren't explicitly set
        ModViewDataVizRendererOptionsHandler.populateDefaultOptions({ defaults, vizOptionsData });

        // update fields to reflect what's in vizOptionsData
        ModViewDataVizRendererOptionsHandler.updateFormSelectionsToReflectState({ vizOptionsData });

        // add handlers to fields
        ModViewDataVizRendererOptionsHandler.addChangeHandlerToFormElements({
            reportedPeptideModData,
            proteinPositionResidues,
            totalPSMCount,
            aminoAcidModStats,
            proteinData,
            proteinPositionFilterStateManager,
            searchDetailsBlockDataMgmtProcessing,
            dataPageStateManager_DataFrom_Server,
            vizOptionsData
        })
    }

    static addChangeHandlerToFormElements({
                                              reportedPeptideModData,
                                              proteinPositionResidues,
                                              totalPSMCount,
                                              aminoAcidModStats,
                                              proteinData,
                                              proteinPositionFilterStateManager,
                                              searchDetailsBlockDataMgmtProcessing,
                                              dataPageStateManager_DataFrom_Server,
                                              vizOptionsData
                                          }) {

        const $formDiv = $('div#data-viz-form');

        $formDiv.find('input#update-viz-button').click( function() {

            // update ratios vs/ counts
            {
                // value of psm quant choice
                const choice = $formDiv.find("input:radio[name='psm-quant']:checked").val()
                vizOptionsData.data.psmQuant = choice;
            }

            // update cutoffs for color scale
            {
                const ratioCutoff = $formDiv.find("input#color-cutoff-ratio").val();
                if( ratioCutoff === '') {
                    delete vizOptionsData.data.colorCutoffRatio;
                } else if( ratioCutoff !== undefined && !isNaN(ratioCutoff) ) {
                    vizOptionsData.data.colorCutoffRatio = parseFloat(ratioCutoff);
                }

                const countCutoff = $formDiv.find("input#color-cutoff-count").val();
                if( countCutoff === '' ) {
                    delete vizOptionsData.data.colorCutoffCount;
                } else if( countCutoff !== undefined && !isNaN(countCutoff) ) {
                    vizOptionsData.data.colorCutoffCount = parseInt(countCutoff);
                }
            }

            // update min and max mod masses
            {

                const cutoff = $formDiv.find("input#modmass-cutoff-min").val();
                if( cutoff === '' ) {
                    delete vizOptionsData.data.modMassCutoffMin;
                } else if( cutoff !== undefined && !isNaN(cutoff) ) {
                    vizOptionsData.data.modMassCutoffMin = parseInt(cutoff);
                }
            }
            {

                const cutoff = $formDiv.find("input#modmass-cutoff-max").val();
                if( cutoff === '' ) {
                    delete vizOptionsData.data.modMassCutoffMax;
                } else if( cutoff !== undefined && !isNaN(cutoff) ) {
                    vizOptionsData.data.modMassCutoffMax = parseInt(cutoff);
                }
            }

            // update hash in URL to reflect user customization state
            vizOptionsData.stateManagementObject.updateState();

            ModViewDataVizRenderer_MultiSearch.renderDataViz({
                reportedPeptideModData,
                proteinPositionResidues,
                totalPSMCount,
                aminoAcidModStats,
                proteinData,
                proteinPositionFilterStateManager,
                searchDetailsBlockDataMgmtProcessing,
                dataPageStateManager_DataFrom_Server,
                vizOptionsData
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
    }

    static addFormToPage() {

        const $mainContentDiv = $('#mod_list_container');

        // blow away existing form if it exists
        $mainContentDiv.find("div#data-viz-options-container").remove();

        const template = _mod_table_template_bundle.dataVizOptionsForm;
        const html = template( {  } );
        $mainContentDiv.append(  $( html ) );
    }

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