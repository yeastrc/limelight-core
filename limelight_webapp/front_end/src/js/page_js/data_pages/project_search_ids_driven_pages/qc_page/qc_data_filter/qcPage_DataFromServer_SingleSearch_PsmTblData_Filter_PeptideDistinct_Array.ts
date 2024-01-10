/**
 * qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array.ts
 *
 * QC Page - Data From Server - Single Search - PSM Tbl Data - Filter on "PeptideDistinct_Array"
 *
 * ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry[]
 *
 * from:
 * qcViewPage_CommonData_To_AllComponents_From_MainComponent.
 *     proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;
 *
 */
import { ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry } from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";


/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_Result {

    psmTblData_Filtered: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
}

/**
 *
 * @param projectSearchId
 * @param peptideDistinct_Array
 * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
 */
export const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array = function (
    {
        projectSearchId,
        peptideDistinct_Array,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
    } : {
        projectSearchId: number
        peptideDistinct_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
    }
    ) : QcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_Result {

    //  Result
    const psmTblData_Filtered: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = [];

    for (const peptideDistinct_Entry of peptideDistinct_Array) {

        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
        if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

            continue; // EARLY CONTINUE
        }

        for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

            const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
            const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

            if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                if ( ! psmTblData_For_ReportedPeptideId ) {
                    const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);; returned nothing: reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const psmTblDataEntry of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                    psmTblData_Filtered.push( psmTblDataEntry );
                }

            } else {
                if (dataPerReportedPeptideId_Value.psmIdsSet) {

                    for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {

                        const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId);
                        if ( ! psmTblData_For_PsmId ) {
                            const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned nothing: psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        psmTblData_Filtered.push( psmTblData_For_PsmId );
                    }
                }
            }
        }
    }

    const result : QcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_Result = {
        psmTblData_Filtered
    }

    return result;
}