/**
 * commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.ts
 *
 * Data loaded from server and code to load data from server - ROOT
 *
 *   Both:
 *
 *      Data Per Project Search Id
 *      Data Common across Project Search Ids
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */


import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 *
 * Data loaded from server and code to load data from server
 *
 *   Both:
 *
 *      Data Per Project Search Id
 *      Data Common across Project Search Ids
 *
 */
export class CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root {

    //  From Constructor

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>
    private _searchDataLookupParameters_Root: SearchDataLookupParameters_Root
    private _dataPageStateManager: DataPageStateManager

    //  Instantiated in this class

    private _commonData_LoadedFromServer_PerSearch_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId> = new Map();

    private _commonData_LoadedFromServer__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches;

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParameters_Root: SearchDataLookupParameters_Root
            dataPageStateManager: DataPageStateManager
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._searchDataLookupParameters_Root = searchDataLookupParameters_Root;
        this._dataPageStateManager = dataPageStateManager

        //  Create Common across Searches Instance

        this._commonData_LoadedFromServer__CommonAcrossSearches =
            CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches.getNewInstance({
                projectSearchIds,
                commonData_LoadedFromServer__Root: this  //  Pass this object to child object for CommonAcrossSearches
            });

        //  Create Per Project Search Id Instances

        for ( const projectSearchId of projectSearchIds ) {

            let searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId = undefined;

            for ( const paramsForProjectSearchId of searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

                if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {
                    searchDataLookupParams_For_Single_ProjectSearchId = paramsForProjectSearchId;
                }
            }
            if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
                const msg = "No entry in searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING  projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const common_Searches_Info_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Info().get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! common_Searches_Info_SingleSearch_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_DataPage_common_Searches_Info().get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING  projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const forProjectSearchId = CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                common_Flags_SingleSearch_ForProjectSearchId, common_Searches_Info_SingleSearch_ForProjectSearchId,
                parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this
            });

            this._commonData_LoadedFromServer_PerSearch_Map_Key_ProjectSearchId.set( projectSearchId, forProjectSearchId );
        }

    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParameters_Root: SearchDataLookupParameters_Root
            dataPageStateManager: DataPageStateManager
        }
    ) {
        return new CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root({
            projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager
        });
    }

    /**
     *
     * @param projectSearchId
     */
    get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId: number ) {
        return this._commonData_LoadedFromServer_PerSearch_Map_Key_ProjectSearchId.get(projectSearchId);
    }

    /**
     *
     */
    get__commonData_LoadedFromServer__CommonAcrossSearches() {
        return this._commonData_LoadedFromServer__CommonAcrossSearches;
    }
}