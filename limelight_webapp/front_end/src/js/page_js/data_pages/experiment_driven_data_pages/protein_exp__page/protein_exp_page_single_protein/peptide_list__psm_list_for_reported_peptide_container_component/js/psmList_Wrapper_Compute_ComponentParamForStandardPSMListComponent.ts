/**
 * psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent.ts
 * 
 * Experiment Protein Page: Single Protein: Wrapper of PSM List for Single Reported Peptide, Single Search, Peptide in Peptide List
 * 
 * Create     DataTable_RootTableObject for child table
 */

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber,
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';

import { PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_Wrapper_ReturnChildReactComponent'

//  Contained PSM List component
import { PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent';

/**
 * returned from reportedPeptidesForSingleSearch_createChildTableObjects
 */
export class PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result {

    psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
}

/**
 * 
 * @returns PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result
 */
export const psmList_Wrapper_Compute_ComponentParamForStandardPSMListComponent = ({

    dataRow_GetChildTable_ReturnReactComponent_Parameter
} : {
    dataRow_GetChildTable_ReturnReactComponent_Parameter : PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter

}) : PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result => {

    const projectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchId;
    const reporterIonMassesSelected = dataRow_GetChildTable_ReturnReactComponent_Parameter.reporterIonMassesSelected;
    const reportedPeptideId = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideId;
    const loadedDataPerProjectSearchIdHolder = dataRow_GetChildTable_ReturnReactComponent_Parameter.loadedDataPerProjectSearchIdHolder

    const searchDataLookupParamsRoot = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot;
    const dataPageStateManager = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;

    const forMultipleSearchesPage = dataRow_GetChildTable_ReturnReactComponent_Parameter.forMultipleSearchesPage;

    let psmIds = undefined;

    if ( reporterIonMassesSelected && reporterIonMassesSelected.size !== 0 ) {
        //  User has selected Reporter Ion Masses so need to get psm ids to display

        const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = ( 
            loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()
        );
        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
            throw Error("_psmExpansionHandler: reporterIonMassesSelected is populated. nothing returned from loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()" );
        }

        const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
            // No data for this reported peptide
            throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId ). reportedPeptideId: " + reportedPeptideId );
        }

        const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

        let reporterIonMassTransformer = undefined;

        if ( forMultipleSearchesPage ) {

            reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to psm_ReporterIonMasses_FilterOnSelectedValues
                transformMass_ReturnNumber : function({ mass }) {
                    return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
                }
            }
        }

        const psm_ReporterIonMasses_FilterOnSelectedValues_Result = (
            psm_ReporterIonMasses_FilterOnSelectedValues({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds : true, reporterIonMassTransformer })
        );

        psmIds = psm_ReporterIonMasses_FilterOnSelectedValues_Result.psmIds;
    }


    const psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter({
        projectSearchId,
        reportedPeptideId,
        searchDataLookupParamsRoot,
        psmIds ,
        dataPageStateManager
    });

    const result = new PsmList_Wrapper_For_SingleReportedPeptide_createChildTableObjects_Result();
    result.psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter = psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter;

    return result;

}

