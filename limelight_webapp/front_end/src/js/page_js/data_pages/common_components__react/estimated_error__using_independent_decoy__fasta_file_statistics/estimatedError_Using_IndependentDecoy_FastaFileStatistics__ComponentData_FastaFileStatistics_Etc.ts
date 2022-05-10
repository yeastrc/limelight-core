/**
 * estimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc.ts
 *
 *  Estimated Error: Using Independent Decoy flag AND Fasta File Statistics
 *
 *  Data for Component - Fasta File Statistics, Etc
 *
 *      Pass this data to component so can decide in component constructor whether or not to render component.
 *      This is so don't render component with "Loading..." message and then have component switch to not render anything if don't find FASTA file statistics.
 *
 */

import {CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export class EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc {

    noSearches_Have_PSMs_with_IndependentDecoy_True: boolean
    fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder
}

/**
 * Called by 'async' function
 *
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
export const get_EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc = function(
    {
        projectSearchIds, dataPageStateManager,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>;
        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc>
{
    let anySearch__anyPsmHas_IsIndependentDecoy_True = false;

    for ( const projectSearchId of projectSearchIds ) {
        const dataPage_common_Flags_SingleSearch = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
        if ( ! dataPage_common_Flags_SingleSearch ) {
            throw Error( "dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId )
        }
        if ( dataPage_common_Flags_SingleSearch.anyPsmHas_IsIndependentDecoy_True ) {
            anySearch__anyPsmHas_IsIndependentDecoy_True = true;
            break;
        }
    }

    if ( ! anySearch__anyPsmHas_IsIndependentDecoy_True ) {
        //  No search has PSMs with independent decoy true so skip retrieval for data and return

        const result: EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc = {
            noSearches_Have_PSMs_with_IndependentDecoy_True: true, fastaFileStatistics_Holder: undefined
        }
        return Promise.resolve( result ); // EARLY RETURN
    }

    //  At least one search has PSMs with independent decoy true so retrieve FASTA File Statistics


    const promise_result =
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer__Multiple_ProjectSearchIds()
            .get_commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics().get_FastaFileStatisticsHolder_ReturnPromise()

    return new Promise<EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc>( (resolve, reject) => { try {
        promise_result.catch( reason => reject(reason))
        promise_result.then(value => { try {
            const result: EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc = {
                fastaFileStatistics_Holder: value.fastaFileStatistics_Holder, noSearches_Have_PSMs_with_IndependentDecoy_True: false
            }
            resolve(result)
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}