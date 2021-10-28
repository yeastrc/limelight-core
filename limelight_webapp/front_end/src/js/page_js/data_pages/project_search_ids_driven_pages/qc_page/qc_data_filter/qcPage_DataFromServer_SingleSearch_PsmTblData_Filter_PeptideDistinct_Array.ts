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
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData";

export class QcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_Result {

    psmTblData_Filtered: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>
}

/**
 *
 * @param projectSearchId
 * @param peptideDistinct_Array
 * @param qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
 */
export const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array = function (
    {
        projectSearchId,
        peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
    } : {
        projectSearchId: number
        peptideDistinct_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>
        qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
    }
    ) : QcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_Result {

    //  Result
    const psmTblData_Filtered: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId> = [];

    for (const peptideDistinct_Entry of peptideDistinct_Array) {

        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
        if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

            continue; // EARLY CONTINUE
        }

        for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

            const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
            const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

            if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                const psmTblData_For_ReportedPeptideId = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                if ( ! psmTblData_For_ReportedPeptideId ) {
                    const msg = "qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);; returned nothing: reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                for ( const psmTblDataEntry of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                    psmTblData_Filtered.push( psmTblDataEntry );
                }

            } else {
                if (dataPerReportedPeptideId_Value.psmIdsSet) {

                    for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {

                        const psmTblData_For_PsmId = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_PsmId(psmId);
                        if ( ! psmTblData_For_PsmId ) {
                            const msg = "qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_PsmId(psmId); returned nothing: psmId: " + psmId + ", projectSearchId: " + projectSearchId;
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