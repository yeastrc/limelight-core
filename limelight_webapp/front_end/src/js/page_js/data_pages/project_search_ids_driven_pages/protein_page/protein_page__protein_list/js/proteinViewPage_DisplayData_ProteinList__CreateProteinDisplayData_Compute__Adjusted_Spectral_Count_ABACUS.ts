/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute__Adjusted_Spectral_Count_ABACUS.ts
 *
 * Create Display Data for Protein List - Compute Adjusted_Spectral_Count_ABACUS for the final displayed Protein List
 *
 */

import {
    ProteinDataDisplay_ProteinList_Item,
    ProteinDataDisplay_ProteinList_Sub_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    adjusted_Spectral_Count_ABACUS__Annotation_Calculator
} from "page_js/data_pages/calculated_annotations/adjusted_Spectral_Count_ABACUS__Annotation_Calculator";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";




/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute__Adjusted_Spectral_Count_ABACUS__ReturnPromise = function (
    {
        searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
        projectSearchIds,
        proteinDisplayData,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        searchSubGroup_Ids_Selected: Set<number>
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : Promise<void> {

    if (proteinDisplayData.proteinList.length === 0) {
        // No entries to process
        return Promise.resolve(); // EARLY RETURN
    }

    const get_DataFromServer_AsNeeded_Result =
        _get_DataFromServer_AsNeeded({ projectSearchIds, searchSubGroup_Ids_Selected, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root })

    if ( get_DataFromServer_AsNeeded_Result.data ) {

        _process_Main_AfterLoadData({
            dataFromServer_Root__INTERNAL: get_DataFromServer_AsNeeded_Result.data, searchSubGroup_Ids_Selected, projectSearchIds, proteinDisplayData
        })
        return Promise.resolve()

    } else if ( get_DataFromServer_AsNeeded_Result.promise ) {

        return new Promise<void>((resolve, reject) => { try {
            get_DataFromServer_AsNeeded_Result.promise.catch(reason => reject(reason))
            get_DataFromServer_AsNeeded_Result.promise.then(value => { try {

                _process_Main_AfterLoadData({
                    dataFromServer_Root__INTERNAL: value, searchSubGroup_Ids_Selected, projectSearchIds, proteinDisplayData
                })
                resolve()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } else {
        throw Error("get_DataFromServer_AsNeeded_Result no 'data' or 'promise'")
    }
}

/**
 *
 * @param root__INTERNAL
 * @param dataFromServer_Root__INTERNAL
 */
const _process_Main_AfterLoadData = function(
    {
        dataFromServer_Root__INTERNAL, searchSubGroup_Ids_Selected, projectSearchIds, proteinDisplayData
    } : {
        dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root

        searchSubGroup_Ids_Selected: Set<number>
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }
): void {

    if ( searchSubGroup_Ids_Selected ) {

        _process_Data_For_SubGroupIds( {
            searchSubGroup_Ids_Selected,
            projectSearchIds,
            proteinDisplayData,
            dataFromServer_Root__INTERNAL
        })

    } else {

        _process_Data_For_ProjectSearchIds({ projectSearchIds, proteinDisplayData, dataFromServer_Root__INTERNAL })
    }
}


////////////////////


/**
 * Process 1 Search (NO Sub Groups) or Multiple Searches
 *
 *
 */
const _process_Data_For_ProjectSearchIds = function (
    {
        projectSearchIds,
        proteinDisplayData,
        dataFromServer_Root__INTERNAL
    } : {
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

        dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root
    }
) {

    //  Process Project Search Ids, including if there is only one

    for ( const projectSearchId of projectSearchIds ) {

        //  Process Single Project Search Id

        //  Create Callback Function For get protein Sub Item for input data
        const get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback = ({ proteinItem } : {  proteinItem: ProteinDataDisplay_ProteinList_Item }) : { protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> }  => {

            const protein_SubItem = proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId )

            if ( ! protein_SubItem ) {
                return null
            }

            return { protein_Sub_Item_Array: [{ protein_Sub_Item: protein_SubItem, projectSearchId } ] }
        }

        //  Create Callback Function For Update
        const update_ProteinItem_Callback = ({ adjusted_Spectral_Count_ABACUS, proteinItem }  : { adjusted_Spectral_Count_ABACUS: number, proteinItem: ProteinDataDisplay_ProteinList_Item }) :  void => {

            const protein_SubItem = proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId )
            if ( ! protein_SubItem ) {
                return // EARLY RETURN
            }

            protein_SubItem.adjusted_Spectral_Count_ABACUS = adjusted_Spectral_Count_ABACUS
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
            const msg = "dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        adjusted_Spectral_Count_ABACUS__Annotation_Calculator({
            id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: projectSearchId,
            proteinDisplayData,
            get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback,
            psmFilter_Callback: undefined,  // NO Filtering
            update_ProteinItem_Callback,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })
    }

}

/**
 * Process 1 Search (NO Sub Groups) or Multiple Searches
 *
 *
 */
const _process_Data_For_SubGroupIds = function (
    {
        searchSubGroup_Ids_Selected,
        projectSearchIds,
        proteinDisplayData,

        dataFromServer_Root__INTERNAL
    } : {
        searchSubGroup_Ids_Selected: Set<number>
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

        dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root
    }
) {

    //  Process Sub Group Ids

    const projectSearchId = projectSearchIds[ 0 ]

    const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( projectSearchId )
    if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
        const msg = "dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
        console.warn(msg)
        throw Error(msg)
    }

    //  Process Single Project Search Id

    //  Create Callback Function For get protein Sub Item for input data
    const get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback = ({ proteinItem } : {  proteinItem: ProteinDataDisplay_ProteinList_Item }) : { protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> }  => {

        const protein_SubItem = proteinItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId )

        if ( ! protein_SubItem ) {
            return null
        }

        return { protein_Sub_Item_Array: [{ protein_Sub_Item: protein_SubItem, projectSearchId } ] }
    }

    for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

        //  Process Single Project Search Id

        const psmFilter_Callback = ({ psmId } : { psmId: number } ) : boolean => {

            if ( ! dataFromServer_Root__INTERNAL.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                const msg = "IN psmFilter_Callback: searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder not populated "
                console.warn(msg)
                throw Error(msg)
            }
            const subGroupId_For_PsmId = dataFromServer_Root__INTERNAL.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId );
            if ( ! subGroupId_For_PsmId ) {
                throw Error("IN psmFilter_Callback: dataFromServer_Root__INTERNAL.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId ); not return a value. psmId: " + psmId + ", projectSearchId: " + projectSearchId );
            }
            if ( subGroupId_For_PsmId === searchSubGroup_Id ) {
                return true
            }
            return false
        }

        //  Create Callback Function For Update
        const update_ProteinItem_Callback = ({ adjusted_Spectral_Count_ABACUS, proteinItem }  : { adjusted_Spectral_Count_ABACUS: number, proteinItem: ProteinDataDisplay_ProteinList_Item }) :  void => {

            const protein_SubItem = proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroup_Id )
            if ( ! protein_SubItem ) {
                return // EARLY RETURN
            }

            protein_SubItem.adjusted_Spectral_Count_ABACUS = adjusted_Spectral_Count_ABACUS
        }

        adjusted_Spectral_Count_ABACUS__Annotation_Calculator({
            id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: searchSubGroup_Id,
            proteinDisplayData,
            get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback,
            psmFilter_Callback,
            update_ProteinItem_Callback,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })
    }

}


////////////////////////////////////////////////////////////////////////////////

////////////////////   Get Data From Server


const _get_DataFromServer_AsNeeded = function (
    {
        projectSearchIds,
        searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        searchSubGroup_Ids_Selected: Set<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): {
    data: INTERNAL__DataFromServer_Root
    promise: Promise<INTERNAL__DataFromServer_Root>
} {
    const dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root = {
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: new Map(),
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: undefined
    }

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )

            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }
    }

    {  //  searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

        if ( searchSubGroup_Ids_Selected && projectSearchIds.length !== 1 ) {
            const msg = "( searchSubGroup_Ids_Selected && projectSearchIds.length !== 1 )"
            console.warn( msg )
            throw Error( msg )
        }

        if ( searchSubGroup_Ids_Selected ) {

            const projectSearchId = projectSearchIds[ 0 ]

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }


            {  //  Get searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

                const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch()
                if (get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
                    dataFromServer_Root__INTERNAL.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder;
                } else if (get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                            try {
                                reject(reason);
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                        get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(result => {
                            try {
                                dataFromServer_Root__INTERNAL.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                                resolve(); //  resolve
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
                    console.warn(msg)
                    throw Error(msg)
                }
            }

        }
    }

    if ( promises.length === 0 ) {

        return {
            data: dataFromServer_Root__INTERNAL, promise: undefined
        }
    }

    return { data: undefined, promise: new Promise<INTERNAL__DataFromServer_Root>((resolve, reject) => { try {

            const promisesAll = Promise.all( promises )
            promisesAll.catch(reason => reject(reason))
            promisesAll.then(novalue => { try {
                resolve( dataFromServer_Root__INTERNAL )
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}

///////////

class INTERNAL__DataFromServer_Root {

    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>

    /**
     * ONLY for Single Search with Sub Groups
     */
    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
}

