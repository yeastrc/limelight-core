/**
 * proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered.ts
 * 
 * Protein Sequence Widget - Get Sequence Coverage Boolean Array based on All Reported Peptide Ids for project search ids that meet cutoffs / main filters
 * 
 *  !!!! React Version !!!!
 * 
 * Display Object used in: proteinSequenceWidgetDisplay_Component_React.tsx
 */


import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

/**
 * Get coverageArrayOfBoolean for Protein Sequence Coverage Based on cutoffs / main filters
 * 
 */
export const getSequenceCoverageBooleanArray_NotFiltered = async function({
    
    proteinSequenceVersionId,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    projectSearchIds
} : { 
    proteinSequenceVersionId : number,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    projectSearchIds : Array<number>
    
}) : Promise<Array<boolean>> {
    try {
        const coverageArrayOfBoolean : Array<boolean> = [];

        //  Modification or Protein Sequence Positions Selected so compute sequence coverage

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            //  Sequence Coverage Data

            const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_ReturnPromise()

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder =
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_ReturnPromise_Result.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder

            //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
            const proteinCoverageObject = proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId( proteinSequenceVersionId );
            if ( ! proteinCoverageObject ) {
                // No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
                continue; //  EARLY CONTINUE
            }

            const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();

            for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
                if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
                    coverageArrayOfBoolean[ index ] = true;
                }
            }
        }

        return coverageArrayOfBoolean;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}
