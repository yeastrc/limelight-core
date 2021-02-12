/**
 *  proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections.ts
 *
 *  Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 *
 */

import {
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "./proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "../../../../project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 */
export const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,                     // Main Selected values
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection,       // NOT Selected values to remove
        loadedDataPerProjectSearchIdHolder,
        projectSearchId
    } : {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
    }
) : void {

    //  All PSM IDs for each reported peptide id for current cutoffs
    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();

    const reportedPeptideIds_Copy = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds());

    for (const reportedPeptideId of reportedPeptideIds_Copy) {

        //  main Entry from 'ANY' or from All reportedPeptideIds
        const entry_MAIN_Selection_For_reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )

        const entry_NOT_Selection_For_reportedPeptideId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection.get_EntryFor_reportedPeptideId( reportedPeptideId )
        if (! entry_NOT_Selection_For_reportedPeptideId ) {
            //  Not found in NOT selection so skip to next entry

            continue;  // EARLY CONTINUE
        }

        if ( ! entry_NOT_Selection_For_reportedPeptideId.psmIds_Include ) {
            //  Excluding whole entry for reportedPeptideId so delete for whole reportedPeptideId
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId);

            continue;  // EARLY CONTINUE
        }

        //  Excluding only some of the PSM Ids so remove the specified PSM Ids

        let new_psmIds_Include: Set<number> = undefined;

        if ( entry_MAIN_Selection_For_reportedPeptideId.psmIds_Include ) {
            new_psmIds_Include = new Set( entry_MAIN_Selection_For_reportedPeptideId.psmIds_Include )

        } else {

            const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
            if (!psmIdsForReportedPeptideId) {
                const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }
            new_psmIds_Include = new Set( psmIdsForReportedPeptideId );
        }

        for ( const entry_NOT_psmId of entry_NOT_Selection_For_reportedPeptideId.psmIds_Include ) {
            new_psmIds_Include.delete( entry_NOT_psmId );
        }

        if ( new_psmIds_Include.size === 0 ) {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
        } else {
            const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId : entry_MAIN_Selection_For_reportedPeptideId.reportedPeptideId,
                psmIds_Include : new_psmIds_Include,
                psmIds_UnionSelection_ExplicitSelectAll : false,
                psmCount_after_Include: new_psmIds_Include.size
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
        }
    }
    // reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.


}