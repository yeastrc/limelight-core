/**
 * commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__MultipleProjectSearches.ts
 *
 * For Single Project Search
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */


import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics";

/**
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 *
 * For Multiple Project Searches
 *
 * Data loaded from server and code to load data from server, For Multiple Project Searches
 *
 */
export class CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Multiple_ProjectSearchIds {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>
    private _searchDataLookupParameters_Root: SearchDataLookupParameters_Root
    private _dataPageStateManager: DataPageStateManager

    //  Parent object

    private _parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

//  Instantiated objects

    private _commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParameters_Root: SearchDataLookupParameters_Root
            dataPageStateManager: DataPageStateManager
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._searchDataLookupParameters_Root = searchDataLookupParameters_Root;
        this._dataPageStateManager = dataPageStateManager;
        this._parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        this._commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics =
            CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics.getNewInstance({
                projectSearchIds
            });
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParameters_Root: SearchDataLookupParameters_Root
            dataPageStateManager: DataPageStateManager
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        return new CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Multiple_ProjectSearchIds({
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });
    }

    get_commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics() {
        return this._commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics;
    }
}