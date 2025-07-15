/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data.ts
 *
 * Create Display Data for Protein List - Create PSM Download Parameter projectSearchIdsReportedPeptideIdsPsmIds
 */

import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    DownloadPSMs_PerProjectSearchId_Entry,
    DownloadPSMs_PerReportedPeptideId
} from "page_js/data_pages/common__project_search_and_experiment_based_download_data/download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data = function (
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }) : Array<DownloadPSMs_PerProjectSearchId_Entry> {

    if ( ( ( ! proteinDisplayData.proteinList ) || proteinDisplayData.proteinList.length === 0 )
        && ( ( ! proteinDisplayData.proteinGroupsList ) || proteinDisplayData.proteinGroupsList.length === 0 ) ) {

        throw Error("No Proteins in Protein List or Protein Groups List");
        // return []; // EARLY RETURN
    }

    const result_PerProjectSearchId_Array: Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

    for ( const data_Per_ProjectSearchId_MapEntry of proteinDisplayData.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering.data_Per_ProjectSearchId_Map_Key_ProjectSearchId.entries() ) {

        const data_Per_ProjectSearchId = data_Per_ProjectSearchId_MapEntry[1];

        const projectSearchId = data_Per_ProjectSearchId.projectSearchId;
        const data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId = data_Per_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId;

        const result_reportedPeptideIdsAndTheirPsmIds : Array<DownloadPSMs_PerReportedPeptideId> = []

        for ( const data_Per_ReportedPeptideId_MapEntry of data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.entries() ) {

            const data_Per_ReportedPeptideId = data_Per_ReportedPeptideId_MapEntry[1];
            const reportedPeptideId = data_Per_ReportedPeptideId.reportedPeptideId;

            const result_PerReportedPeptideId = new DownloadPSMs_PerReportedPeptideId();
            result_reportedPeptideIdsAndTheirPsmIds.push( result_PerReportedPeptideId );

            result_PerReportedPeptideId.reportedPeptideId = reportedPeptideId;

            if ( ! data_Per_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs ) {

                if ( ! data_Per_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId ) {
                    const msg = "( ! data_Per_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs ) and ( ! data_Per_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId ). projectSearchId: " + projectSearchId +
                        ", reportedPeptideId: " + data_Per_ReportedPeptideId.reportedPeptideId;
                    console.warn(msg);
                    throw Error(msg);
                }

                result_PerReportedPeptideId.psmEntries_Include_Map_Key_PsmId = data_Per_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId
            }
        }

        const result_PerProjectSearchId_Entry = new DownloadPSMs_PerProjectSearchId_Entry();
        result_PerProjectSearchId_Entry.projectSearchId = projectSearchId;
        result_PerProjectSearchId_Entry.reportedPeptideIdsAndTheirPsmIds = result_reportedPeptideIdsAndTheirPsmIds;

        result_PerProjectSearchId_Array.push( result_PerProjectSearchId_Entry );
    }

    return result_PerProjectSearchId_Array;
}