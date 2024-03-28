/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.ts
 */

import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


/////////   CURRENTLY AT FILE BOTTOM:

// export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON {
//
//     static getReportedPeptideIdsForDisplay_ProteinPositionsSelected = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
//     static getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise
// }



/**
 * Get Reported Peptide Ids to display (or download).
 *
 * User has selected Protein Positions
 */
const _getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise = function (
    {
        selectedProteinSequencePositions,
        proteinSequenceVersionId,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }: {
        selectedProteinSequencePositions: Set<number>
        proteinSequenceVersionId: number
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    }): Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> {

    const result = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
        selectedProteinSequencePositions,
        proteinSequenceVersionId,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    })

    if ( result.result ) {
        return Promise.resolve(result.result);
    }

    return result.promise
}

/**
 * Get Reported Peptide Ids to display (or download).
 *
 * User has selected Protein Positions
 */
const _getReportedPeptideIdsForDisplay_ProteinPositionsSelected = function (
    {
        selectedProteinSequencePositions,
        proteinSequenceVersionId,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }: {
        selectedProteinSequencePositions: Set<number>
        proteinSequenceVersionId: number
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {
        const msg = "_getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...): proteinSequenceVersionId MUST be assigned a value.  is undefined or null";
        console.warn(msg);
        throw Error(msg);
    }

    const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
        get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch();

    if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {

        const resultData = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected__AfterLoadData({
            proteinSequenceVersionId, selectedProteinSequencePositions,
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData, promise: undefined
        };
        return result;  //  EARLY RETURN

    } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {

        const functionResult : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS =
            {
                result: undefined,
                promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>(
                    (resolve, reject) => { try {
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason));
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then(value => { try {
                            const resultData = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected__AfterLoadData({
                                proteinSequenceVersionId, selectedProteinSequencePositions,
                                proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                            });
                            resolve(resultData);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }

        return functionResult;    //  EARLY RETURN

    } else {
        throw Error("get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result no data or promise")
    }

    console.warn("SHOULD NOT GET HERE")
    throw Error("SHOULD NOT GET HERE")
}



/**
 * Get Reported Peptide Ids to display (or download).
 *
 * User has selected Protein Positions
 */
const _getReportedPeptideIdsForDisplay_ProteinPositionsSelected__AfterLoadData = function (
    {
        selectedProteinSequencePositions,
        proteinSequenceVersionId,
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder

    }: {
        selectedProteinSequencePositions: Set<number>
        proteinSequenceVersionId: number
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {
        const msg = "_getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...): proteinSequenceVersionId MUST be assigned a value.  is undefined or null";
        console.warn(msg);
        throw Error(msg);
    }

    // 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

    //  Sequence Coverage Data
    // const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
    // const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

    const proteinCoverageObject =
        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId(proteinSequenceVersionId)

    if (!proteinCoverageObject) {
        //  No proteinCoverageObject for this proteinSequenceVersionId for this project search id
        //  There will then be no reportedPeptideIdAtPosition
        //  Return empty

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({ noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false });

        return resultData; // EARLY RETURN
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({ noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false });

    //  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
    for (const selectedProteinSequencePosition of selectedProteinSequencePositions) {

        const reportedPeptideIdsAtPosition = proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition({position: selectedProteinSequencePosition});

        for (const reportedPeptideId of reportedPeptideIdsAtPosition) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    return resultData;
}

/**
 *
 */
export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON {

    static getReportedPeptideIdsForDisplay_ProteinPositionsSelected = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
    static getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise
}
