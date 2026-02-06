/**
 * getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId__Merge_ANY_OR__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.ts
 *
 *  UNION to support "ANY"/"NOT"
 *
 *  Merge Rules for merging UNION/ANY/OR
 */

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";


/**
 * Merge Rules for merging UNION/ANY/OR:
 *
 * UNION to support "ANY"/"NOT"
 *
 *
 * @param reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
 */
export const getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId__Merge_ANY_OR__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
    }: {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>

}): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    const entry_Result_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

    const promises_From_Entries_Array: Array<Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>> = []

    { //  Check for any that are just undefined or null and throw Error

        for (const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array) {

            if (entry === undefined || entry === null) {

                //  Found entry Not populated.  Problem with return statement that generated it.

                const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
                console.warn(msg);
                throw Error(msg);
            }

            if (entry.result) {
                entry_Result_Array.push(entry.result);

            } else if (entry.promise) {
                promises_From_Entries_Array.push(entry.promise);

            } else {
                const msg = "entry not have 'result' or 'promise': in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
                console.warn(msg);
                throw Error(msg);
            }
        }
    }

    if ( promises_From_Entries_Array.length === 0 ) {

        //  No Promises so compute and return immediately

        const mergeResult = _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entry_Result_Array
        })

        const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: mergeResult, promise: undefined
        }

        return result;  // EARLY RETURN
    }

    const promisesAll = Promise.all( promises_From_Entries_Array );

    const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {

        promisesAll.catch(reason => {
            reject(reason);
        })
        promisesAll.then(promiseResult_Array => {
            try {
                // Copy all promise results (promiseResult_Array) into entry_Result_Array

                for ( const promiseResult of promiseResult_Array ) {
                    entry_Result_Array.push(promiseResult)
                }

                const mergeResult = _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults({
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entry_Result_Array
                })

                resolve( mergeResult );

            } catch( e ) {
                console.warn("Exception caught in promisesAll.then of _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: ", e);
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })

    const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        promise: promise_Return, result: undefined
    }

    return result;  // EARLY RETURN
}

/**
 * Merge in contents As UNION to support "ANY"/"OR" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
 *
 */
const _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
    }: {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>

}): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    {  //  If ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

        let all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = false;
                break;
            }
        }

        if ( all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE ) {

            ///  ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });

            return resultData; // EARLY RETURN
        }
    }

    {  //  If ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return that entry

        let onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;
        let foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;

        let entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS = undefined;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                if ( onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

                    foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                } else {

                    onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                    entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True = entry;
                }
            }
        }

        if ( ( ! foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True )
            && onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

            ///  ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            return entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True; // EARLY RETURN
        }
    }

    {  //  Check for any that includes ALL Reported Peptide Ids

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( entry.is_includeAll_ReportedPeptideIds() ) {

                //  Found entry with is_includeAll_ReportedPeptideIds() true so just return that since it covers everything

                return entry; // EARLY RETURN
            }
        }
    }

    //  Start Computing UNION of values

    //  Break out by reported peptide id.  Store entries without PSM Ids separately.  Combine PSM Ids

    const reportedPeptideIds_Entries_Without_PsmIds : Set<number> = new Set();

    const psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId : Map<number, Map<number, Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS>>> = new Map();

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.is_noFilter_OR_FilterHasNoData() ) {

            continue; // EARLY CONTINUE
        }

        for ( const entryPer_ReportedPeptideId of entry.get_Entries_IterableIterator() ) {

            const reportedPeptideId = entryPer_ReportedPeptideId.reportedPeptideId;
            const psmEntries_Include_Map_Key_PsmId = entryPer_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId;

            if ( psmEntries_Include_Map_Key_PsmId ) {

                if ( ! reportedPeptideIds_Entries_Without_PsmIds.has( reportedPeptideId ) ) {

                    let psmEntry_Array_Map_Key_PsmId = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.get(reportedPeptideId);
                    if ( ! psmEntry_Array_Map_Key_PsmId ) {
                        psmEntry_Array_Map_Key_PsmId = new Map();
                        psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmEntry_Array_Map_Key_PsmId );
                    }
                    for ( const psmEntry of psmEntries_Include_Map_Key_PsmId.values() ) {

                        let psmEntry_Array = psmEntry_Array_Map_Key_PsmId.get( psmEntry.psmId )
                        if ( ! psmEntry_Array ) {
                            psmEntry_Array = []
                            psmEntry_Array_Map_Key_PsmId.set( psmEntry.psmId, psmEntry_Array )
                        }
                        psmEntry_Array.push( psmEntry )
                    }
                }
            } else {

                //  Have entry for Reported Peptide ID with NO Sub Filtering on PSM IDs so the UNION is to NOT filter on any PSM IDS

                //  This will NOT work well if ANY of the entries for the Reported Peptide Id has an object for a PSM with a value that needs to be passed on.

                //  TODO For now, assume that all objects that are UNION can drop all data per PSM

                psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.delete(reportedPeptideId);
                reportedPeptideIds_Entries_Without_PsmIds.add(reportedPeptideId);
            }
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry of psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.entries() ) {

        const reportedPeptideId = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry[0];
        const psmEntry_Array_Map_Key_PsmId_Map = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry[1];

        //  Resulting Map of Psm Entries where each Result Psm Entry is the MERGE of all Psm Entries for that Psm Id
        const psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

        for ( const psmEntry_Array of psmEntry_Array_Map_Key_PsmId_Map.values() ) {

            const psmEntry_Array_Merged =
                Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS.merge_ExistingObjectsOfThisType( psmEntry_Array )

            psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId.set( psmEntry_Array_Merged.psmId, psmEntry_Array_Merged )
        }

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    for ( const reportedPeptideId of reportedPeptideIds_Entries_Without_PsmIds ) {

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmEntries_Include_Map_Key_PsmId : undefined
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    return resultData;
}