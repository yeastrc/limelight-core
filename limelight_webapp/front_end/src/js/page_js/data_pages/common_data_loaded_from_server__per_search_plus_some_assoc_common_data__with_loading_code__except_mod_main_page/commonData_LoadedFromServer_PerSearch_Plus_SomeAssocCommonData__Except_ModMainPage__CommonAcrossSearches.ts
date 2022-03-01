/**
 * commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches.ts
 *
 * For Common Across Searches
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */


import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences";
import {CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences";

/**
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 *
 * For Common Across Searches
 *
 * Data loaded from server and code to load data from server, For Single Project Search
 *
 */
export class CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches {

    //  From Constructor

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>

    //  'Parent' object to allow loading data for all searches
    private _commonData_LoadedFromServer__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    //  Instantiated in this class

    private _commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters
    private _commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences: CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences
    private _commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences

    /**
     *
     * @param projectSearchIds
     */
    private constructor(
        {
            projectSearchIds, commonData_LoadedFromServer__Root
        } : {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._commonData_LoadedFromServer__Root = commonData_LoadedFromServer__Root;

        this._commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters =
            CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters.getNewInstance({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: this
            })

        this._commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences =
            CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences.getNewInstance({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: this
            })

        this._commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences =
            CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences.getNewInstance({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: this
            })
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance(
        {
            projectSearchIds, commonData_LoadedFromServer__Root
        } : {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        return new CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches({
            projectSearchIds, commonData_LoadedFromServer__Root
        });
    }

    get_ParentObject() {
        return this._commonData_LoadedFromServer__Root
    }

    get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters
    }

    get_commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences() {
        return this._commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences
    }

    get_commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences() {
        return this._commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences
    }
}


