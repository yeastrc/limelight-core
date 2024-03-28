/**
 *  peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections.ts
 *
 *  Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 *
 */

import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "./peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";

/**
 * Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT
 */
export const peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections = function (
    {
        reportedPeptideIds_ProteinId_Params_PassedIn,
        OR_AND_Results,    // OR and AND Selected values
        NOT_Selection_Results_Array,       // NOT Selected values to remove
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
        OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId:
            CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    const promises: Array<Promise<void>> = []

    //  Get data for processing

    let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined;

    {  // Get psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder

        const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();

        if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

        } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) => {
                try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

            promises.push(promise);

        } else {
            throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result  no 'data' or 'promise'")
        }
    }

    if ( promises.length === 0 ) {

        const result = _peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections_AfterGetData({
            reportedPeptideIds_ProteinId_Params_PassedIn,
            OR_AND_Results,    // ANY and AND Selected values
            NOT_Selection_Results_Array,       // NOT Selected values to remove
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
        });

        return { result, promise: undefined }  // EARLY RETURN
    }

    const promises_All = Promise.all(promises);


    const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
        try {
            promises_All.catch(reason => {
                reject(reason)
            })
            promises_All.then(noValue => {
                try {
                    const result = _peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections_AfterGetData({
                        reportedPeptideIds_ProteinId_Params_PassedIn,
                        OR_AND_Results,    // ANY and AND Selected values
                        NOT_Selection_Results_Array,       // NOT Selected values to remove
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    });

                    resolve(result);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return {
        promise: promise_Return,  result: undefined
    }
}

/**
 * Remove from reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for selected NOT  --  Internal After load data
 */
const _peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections_AfterGetData = function (
    {
        reportedPeptideIds_ProteinId_Params_PassedIn,
        OR_AND_Results,    // ANY and AND Selected values
        NOT_Selection_Results_Array,       // NOT Selected values to remove
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
    } : {
        reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
        OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
    }
) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    //  First either:
    //
    //  1) use incoming peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS

    //  2) or: if incoming peptide__sing...  has true either is_noFilter_OR_FilterHasNoData() or is_includeAll_ReportedPeptideIds():
    //
    //      create new peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing
    //       for all reportedPeptideId in reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId

    let peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing =
        OR_AND_Results;

    if ( OR_AND_Results.is_noFilter_OR_FilterHasNoData()
        || OR_AND_Results.is_includeAll_ReportedPeptideIds() ) {

        //  For ALL But "NOT"/"EXCLUDE" filters, either there are no filters selected or combined result in Include All ReportedPeptideIds

        //    So create a input with reportedPeptideIds from reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId

        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
        {
            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmIds_Include: undefined
                });

                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }
    }

    let resultData: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS

    const reportedPeptideIds_Copy = Array.from(peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing.get_Entries_Keys_ReportedPeptideIds());

    //  Initialize Input.  Will be updated at end of for (...NOT_Selection_Results_Array) to be current 'resultData'
    let inputData = peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS_ForProcessing

    //  NOT_Selection_Results_Array:  Currently entries for NOT Modifications and NOT reporter Ions

    for ( const NOT_Selection_Results of NOT_Selection_Results_Array ) {

        //  Reset for next trip through loop.   Input is updated at end of loop

        resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_Copy) {

            //  main Entry (from 'ANY'/'OR' or 'ALL'/'AND'
            const entry_MAIN_Selection_For_reportedPeptideId = inputData.get_Entry_For_ReportedPeptideId( reportedPeptideId )

            if ( ! entry_MAIN_Selection_For_reportedPeptideId ) {

                //  reportedPeptideId No longer in input so skip

                continue;  // EARLY CONTINUE
            }


            const entry_NOT_Selection_For_reportedPeptideId =
                NOT_Selection_Results.get_Entry_For_ReportedPeptideId( reportedPeptideId );

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

                const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
                if (!psmIdsForReportedPeptideId) {
                    const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId
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

        inputData = resultData;  // Move output to input for next time through the loop
    }

    return resultData;
}