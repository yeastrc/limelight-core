/**
 * proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds.ts
 * 
 * Protein Sequence Widget - Get Sequence Coverage Boolean Array based on Filtered Reported Peptide Ids for project search ids
 * 
 *  !!!! React Version !!!!
 * 
 * Display Object used in: proteinSequenceWidgetDisplay_Component_React.tsx
 */

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";

/**
 * Get coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display
 * 
 */
export const getSequenceCoverageBooleanArray_ForReportedPeptideIds = function({
    
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    projectSearchIds
} : {
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    projectSearchIds : Array<number>
    
}) : Promise<Array<boolean>> {


    const coverageArrayOfBoolean : Array<boolean> = [];

    //  Modification or Protein Sequence Positions Selected so compute sequence coverage

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );

        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            // No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for this projectSearchId so skip to next projectSearchId
            continue; //  EARLY CONTINUE
        }

        const reportedPeptideIdsForDisplay = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );

        const promise = process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay({
            reportedPeptideIds : reportedPeptideIdsForDisplay, 
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            proteinSequenceVersionId,
            coverageArrayOfBoolean //  Updated in the function
        } );

        if ( promise ) {
            promises.push(promise)
        }
    }

    if ( promises.length === 0 ) {

        return Promise.resolve(coverageArrayOfBoolean)  //  EARLY PROMISE
    }

    const promises_All = Promise.all(promises);

    return new Promise<Array<boolean>>((resolve, reject) => { try {
        promises_All.catch(reason => {reject(reason)})
        promises_All.then(noValue => { try {
            resolve(coverageArrayOfBoolean)
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 * Update coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display.  
 * 
 */
const process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay = function(
    {
        reportedPeptideIds,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
        proteinSequenceVersionId,
        coverageArrayOfBoolean  //  Updated in this function
    } : {
        reportedPeptideIds : ReadonlySet<number>,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        proteinSequenceVersionId : number,
        coverageArrayOfBoolean : Array<boolean>
    } ) : Promise<void> {

    const getData_Result = process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay__GetData({
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    })

    if ( getData_Result.data ) {

        process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay__AfterGetData({
            reportedPeptideIds,
            proteinSequenceVersionId,
            dataFromServer: getData_Result.data,
            coverageArrayOfBoolean  //  Updated in this function
        })

        return null;  //  EARLY RETURN

    } else if ( getData_Result.promise ) {
        return new Promise<void>((resolve, reject) => { try {  //  EARLY RETURN
            getData_Result.promise.catch(reason => { reject(reason)})
            getData_Result.promise.then(value => { try {

                process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay__AfterGetData({
                    reportedPeptideIds,
                    proteinSequenceVersionId,
                    dataFromServer: value,
                    coverageArrayOfBoolean  //  Updated in this function
                })
                resolve()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } else {
        throw Error("getData_Result no data or promise")
    }
    console.warn("SHOULD NOT GET HERE")
    throw Error("SHOULD NOT GET HERE")

}

/**
 * Update coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display.  --  Get Data
 *
 */
const process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay__GetData = function(
    {
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    } : {
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    data: {
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
    }
    promise: Promise<{
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
    }>
} {
    const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch()

    if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {
        return { promise: undefined ,data: {
                proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder:
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
            }
        }
    } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {

        return { data: undefined, promise:
                new Promise<{
                    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                }>((resolve, reject) => {
                    try {
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then(value => {
                            try {
                                resolve({ proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder })
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e
                            }
                        })
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e
                    }
                })
        }
    } else {
        throw Error("get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result no data or promise")
    }

    console.warn("SHOULD NOT GET HERE")
    throw Error("SHOULD NOT GET HERE")
}


/**
 * Update coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display.  --  After Get Data
 *
 */
const process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay__AfterGetData = function(
    {
        reportedPeptideIds,
        proteinSequenceVersionId,
        coverageArrayOfBoolean,  //  Updated in this function
        dataFromServer
    } : {
        reportedPeptideIds : ReadonlySet<number>,
        proteinSequenceVersionId : number,
        coverageArrayOfBoolean : Array<boolean>
        dataFromServer: {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
        }
    } ) : void {

    //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
    const proteinCoverageObject = dataFromServer.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId( proteinSequenceVersionId );
   
    if ( proteinCoverageObject ) {

        const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

        for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

                    for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
                        coverageArrayOfBoolean[ position ] = true;
                    }
                    break;
                }
            }
        }
    }
}
