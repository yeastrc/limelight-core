/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute__Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId.ts
 *
 * Create Display Data for Protein List - Compute NSAF for the final displayed Protein List
 *
 */


import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
    ProteinDataDisplay_ProteinList_Item, ProteinDataDisplay_ProteinList_Sub_Item
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    adjusted_Spectral_Count_ABACUS__Annotation_Calculator
} from "page_js/data_pages/calculated_annotations/adjusted_Spectral_Count_ABACUS__Annotation_Calculator";


/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute__Adjusted_Spectral_Count_ABACUS__Per_ExperimentConditionId__ReturnPromise = function (
    {
        proteinDisplayData,
        conditions_with_their_project_search_ids_for_First_condition_group,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<void> {

    if ( proteinDisplayData.proteinList.length === 0 ) {
        // No entries to process
        return Promise.resolve(); // EARLY RETURN
    }

    const get_DataFromServer_AsNeeded_Result =
        _get_DataFromServer_AsNeeded({ projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root })

    if ( get_DataFromServer_AsNeeded_Result.data ) {

        _process_Main_AfterLoadData({
            dataFromServer_Root__INTERNAL: get_DataFromServer_AsNeeded_Result.data, conditions_with_their_project_search_ids_for_First_condition_group, proteinDisplayData
        })
        return Promise.resolve()

    } else if ( get_DataFromServer_AsNeeded_Result.promise ) {

        return new Promise<void>((resolve, reject) => { try {
            get_DataFromServer_AsNeeded_Result.promise.catch(reason => reject(reason))
            get_DataFromServer_AsNeeded_Result.promise.then(value => { try {

                _process_Main_AfterLoadData({
                    dataFromServer_Root__INTERNAL: value, conditions_with_their_project_search_ids_for_First_condition_group, proteinDisplayData
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
        dataFromServer_Root__INTERNAL, conditions_with_their_project_search_ids_for_First_condition_group, proteinDisplayData
    } : {
        dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root

        conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }
): void {

    for ( const condition_with_its_project_search_ids of conditions_with_their_project_search_ids_for_First_condition_group ) {

        //  Process Single Project Search Id

        //  Create Callback Function For get protein Sub Item for input data
        const get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback = ( { proteinItem }: {
            proteinItem: ProteinDataDisplay_ProteinList_Item
        } ): { protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> } => {

            const protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> = []

            {
                const conditionId = condition_with_its_project_search_ids.condition.id

                const experiment_SubData_ForCondition = proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( conditionId )

                for ( const projectSearchId of condition_with_its_project_search_ids.projectSearchIds ) {
                    const protein_SubItem_Record = experiment_SubData_ForCondition.protein_SubItem_Record_Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( ! protein_SubItem_Record ) {
                        continue
                    }

                    protein_Sub_Item_Array.push({ protein_Sub_Item: protein_SubItem_Record, projectSearchId })
                }
            }

            return { protein_Sub_Item_Array }
        }

        //  Create Callback Function For Update
        const update_ProteinItem_Callback = ( { adjusted_Spectral_Count_ABACUS, proteinItem }: {
            adjusted_Spectral_Count_ABACUS: number,
            proteinItem: ProteinDataDisplay_ProteinList_Item
        } ): void => {
            const conditionId = condition_with_its_project_search_ids.condition.id

            const experiment_SubData_ForCondition = proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( conditionId )
            if ( ! experiment_SubData_ForCondition ) {
                return // EARLY RETURN
            }

            experiment_SubData_ForCondition.adjusted_Spectral_Count_ABACUS = adjusted_Spectral_Count_ABACUS
        }

        const conditionId = condition_with_its_project_search_ids.condition.id

        adjusted_Spectral_Count_ABACUS__Annotation_Calculator( {
            id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: conditionId,
            proteinDisplayData,
            get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback,
            psmFilter_Callback: undefined,  // NO Filtering
            update_ProteinItem_Callback,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: dataFromServer_Root__INTERNAL.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
        } )
    }
}


////////////////////////////////////////////////////////////////////////////////

////////////////////   Get Data From Server


const _get_DataFromServer_AsNeeded = function (
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): {
    data: INTERNAL__DataFromServer_Root
    promise: Promise<INTERNAL__DataFromServer_Root>
} {
    const dataFromServer_Root__INTERNAL: INTERNAL__DataFromServer_Root = {
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: new Map()
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
}

