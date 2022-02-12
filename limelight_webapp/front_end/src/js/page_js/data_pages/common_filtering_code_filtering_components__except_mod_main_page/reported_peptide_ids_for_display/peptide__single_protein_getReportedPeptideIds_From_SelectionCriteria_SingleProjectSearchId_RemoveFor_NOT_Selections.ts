/**
 *  peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections.ts
 *
 *  Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 *
 */

import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS
} from "./peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "../../project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 */
export const peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,                     // Main Selected values
        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__NOT_Selection,       // NOT Selected values to remove
        loadedDataPerProjectSearchIdHolder,
        projectSearchId
    } : {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__NOT_Selection: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number // for error logging
    }
) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    //  First either:
    //
    //  1) use incoming peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS

    //  2) or: if incoming peptide__sing...  has true either is_noFilter_OR_FilterHasNoData() or is_includeAll_ReportedPeptideIds():
    //
    //      create new peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing
    //       for all reportedPeptideId in reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId

    let peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing = peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS;

    if ( peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS.is_noFilter_OR_FilterHasNoData()
        || peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS.is_includeAll_ReportedPeptideIds() ) {

        //  For ALL But "NOT"/"EXCLUDE" filters, either there are no filters selected or combined result in Include All ReportedPeptideIds

        //    So create a input with reportedPeptideIds from reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId

        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
        {
            for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmIds_Include: undefined
                });

                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    const reportedPeptideIds_Copy = Array.from(peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing.get_Entries_Keys_ReportedPeptideIds());

    for (const reportedPeptideId of reportedPeptideIds_Copy) {

        //  main Entry (from 'ANY'/'OR' or 'ALL'/'AND'
        const entry_MAIN_Selection_For_reportedPeptideId = peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing.get_Entry_For_ReportedPeptideId( reportedPeptideId )

        const entry_NOT_Selection_For_reportedPeptideId =
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__NOT_Selection.get_Entry_For_ReportedPeptideId( reportedPeptideId );

        if (! entry_NOT_Selection_For_reportedPeptideId ) {

            //  Not found in "NOT"/"EXCLUDE" selection so add to result and skip to next entry

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry_MAIN_Selection_For_reportedPeptideId);

            continue;  // EARLY CONTINUE
        }

        if ( ! entry_NOT_Selection_For_reportedPeptideId.psmIds_Include ) {

            //  Found in "NOT"/"EXCLUDE" selection

            //  "NOT"/"EXCLUDE" entry does not have 'psmIds_Include' property so Excluding whole entry for reportedPeptideId so skip for whole reportedPeptideId

            continue;  // EARLY CONTINUE
        }

        //  Excluding only some of the PSM Ids so remove the specified PSM Ids

        //  result_psmIds_Include  will in the end be the PSM IDs after removing the "NOT"/"EXCLUDE" PSM IDs

        let result_psmIds_Include: Set<number> = undefined;

        if ( entry_MAIN_Selection_For_reportedPeptideId.psmIds_Include ) {

            //  Have MAIN entry PSM Ids so copy to result Set to allow deletions

            result_psmIds_Include = new Set( entry_MAIN_Selection_For_reportedPeptideId.psmIds_Include )

        } else {

            //  Not Have MAIN entry PSM Ids so create new Set with All PsmIds for reportedPeptideId at current PSM filters to allow deletions

            //  All PSM IDs for each reported peptide id for current cutoffs
            const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
            if ( ! psmIdsForReportedPeptideIdMap ) {
                const msg = "else of 'if ( entry_MAIN_Selection_For_reportedPeptideId.psmIds_Include ) ': loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap(); returns NOTHING. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
            if (!psmIdsForReportedPeptideId) {
                const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }
            result_psmIds_Include = new Set( psmIdsForReportedPeptideId );
        }

        for ( const entry_NOT_psmId of entry_NOT_Selection_For_reportedPeptideId.psmIds_Include ) {
            result_psmIds_Include.delete( entry_NOT_psmId );
        }

        if ( result_psmIds_Include.size === 0 ) {

            //  NO PSM Ids left to be included so skip whole reported peptide id

            continue;  // EARLY CONTINUE

        } else {

            //  Add to result with result PSM IDs

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: result_psmIds_Include
            });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    return resultData;
}