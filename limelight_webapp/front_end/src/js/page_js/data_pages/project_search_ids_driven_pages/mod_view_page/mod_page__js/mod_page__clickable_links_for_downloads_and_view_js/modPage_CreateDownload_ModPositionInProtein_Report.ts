/**
 * modPage_CreateDownload_ModPositionInProtein_Report.ts
 */


import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import {
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modPage_Create_GeneratedReportedPeptideEntries_String_Etc,
    ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Create_GeneratedReportedPeptideEntries_String_Etc";
import {
    Limelight__ResiduePositions_n_c_Constants
} from "page_js/constants_across_webapp/residue_position_n_c_constants/Limelight__ResiduePositions_n_c_Constants";





/**
 *
 */
export class ModPage_CreateDownload_ModPositionInProtein_Report_Result {

    download_HeaderLines_String: string
    downloadDataEntry_Map_Key_modMass_Rounded: Map<number, {
        modMass_Rounded: number
        downloadData_String: string
    }>
    searchIds_Array: Array<number>
}

/**
 * User clicked on '[Download Mod Position in Protein Report]'
 *
 *
 */
export const modPage_CreateDownload_ModPositionInProtein_Report = function (
    {
        projectSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): Promise<ModPage_CreateDownload_ModPositionInProtein_Report_Result> {

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    const peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map()
    const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()
    const proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder> = new Map()

    let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

    const promises: Array<Promise<void>> = []

    {
        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable({
            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        } )
        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data ) {
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data
        } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.catch(reason => { reject(reason)})
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.then(value => { try {
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error( "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result no 'data' or 'promise" )
        }
    }

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable(...): commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        {  // get_PeptideIdsHolder_AllForSearch_Result

            const get_PeptideIdsHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch()

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder )
            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.peptideIds_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }

        {
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
        {
            const get_ProteinInfoHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch();

            if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder )
            } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinInfoHolder_AllForSearch_Result.promise.then(value => { try {
                        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinInfo_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinInfoHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
    }

    {
        const get_PeptideSequencesHolder_AllForAllSearches_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__CommonAcrossSearches().
            get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
            get_PeptideSequencesHolder_AllForAllSearches()

        if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
            peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder
        } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => { reject(reason)})
                get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                    peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result no 'data' or 'promise'")
        }
    }

    const promisesAll = Promise.all(promises)

    return new Promise<ModPage_CreateDownload_ModPositionInProtein_Report_Result>((resolve, reject) => { try {

        promisesAll.catch(reason => reject(reason))
        promisesAll.then(novalue => { try {

            const result = _modPage_Download_ModPositionInProtein_Report_After_GetData({

                projectSearchIds,
                computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                peptideSequences_For_MainFilters_Holder,
                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
            })

            resolve( result )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

////////////////

const _modPage_Download_ModPositionInProtein_Report_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,

        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideSequences_For_MainFilters_Holder,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) : ModPage_CreateDownload_ModPositionInProtein_Report_Result {


    const getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject = new INTERNAL__CachingResults_PerCallToTopLevelFunctionInThisFile__GetProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteringOn_ProteinPositionFilter_UserSelections_StateObject__CachingResults_Per_ProjectSearchId_ReportedPeptideId({
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
    })

    const searchNameDisplayString_Map_Key_ProjectSearchId: Map<number, string> = new Map()
    const searchId_Map_Key_ProjectSearchId: Map<number, number> = new Map()


    const searchSubGroups_InOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = []
    const searchSubGroups_Map_Key_SearchSubGroupId: Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Map()

    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        if ( projectSearchIds.length !== 1 ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
            console.warn( msg )
            throw Error( msg )
        }

        const projectSearchId = projectSearchIds[ 0 ]

        const searchSubGroups_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
        if ( ! searchSubGroups_Root ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING"
            console.warn( msg )
            throw Error( msg )
        }

        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
            console.warn( msg )
            throw Error( msg )
        }

        for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {
                //  Specifically track if NO sub groups were selected
                continue // EARLY CONTINUE
            }
            {
                const selectedSearchSubGroupIds = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds()
                //  selectedSearchSubGroupIds is undefined if ALL sub groups are selected

                if ( selectedSearchSubGroupIds && ( ! selectedSearchSubGroupIds.has( searchSubGroup.searchSubGroup_Id ) ) ) {
                    //  Have selection and this sub group NOT selected
                    continue // EARLY CONTINUE
                }
            }

            searchSubGroups_InOrder_Filtered.push( searchSubGroup )

            searchSubGroups_Map_Key_SearchSubGroupId.set( searchSubGroup.searchSubGroup_Id, searchSubGroup )
        }
    }


    const searchIds_Array: Array<number> = []

    for ( const projectSearchId of projectSearchIds ) {
        const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
            projectSearchId,
            dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
        } )
        searchNameDisplayString_Map_Key_ProjectSearchId.set( projectSearchId, searchNameForProjectSearchId )

        const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
        if ( ! searchData_For_ProjectSearchId ) {
            throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }
        searchId_Map_Key_ProjectSearchId.set( projectSearchId, searchData_For_ProjectSearchId.searchId )

        searchIds_Array.push( searchData_For_ProjectSearchId.searchId )
    }

    /////////////

    const data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass: Map<number, {
        modMass_Rounded: number
        data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId: Map<number, {

            proteinSequenceVersionId: number
            data_Map_Key_ProteinPositionNumber: Map<number, {
                proteinPositionNumber: number
                projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set: Set<number>

                psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor: Map<number, Set<number>>

                peptideSequence_Letter_AT_ModificationPosition_Set: Set<string>
                peptideSequence_Letters_BEFORE_ModificationPosition_Set: Set<string>
                peptideSequence_Letters_AFTER_ModificationPosition_Set: Set<string>

                peptideSequenceString_WithMods_Set: Set<string>
            }>
        }>
    }> = new Map()


    let projectSearchId_Or_SubSearchId_Array: Array<number> = undefined

    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        projectSearchId_Or_SubSearchId_Array = []

        for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

            projectSearchId_Or_SubSearchId_Array.push( searchSubGroup.searchSubGroup_Id )
        }
    } else {
        //  NO Sub Searches so just create array of the projectSearchId being processed

        projectSearchId_Or_SubSearchId_Array = projectSearchIds
    }

    ///////////////

    //  Main Processing Loop

    for ( const data_ForSingle_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations.get_Data_AllValues() ) {

        const modMass_BeingProcessed = data_ForSingle_ModMass.modMass

        let data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass.get( modMass_BeingProcessed )
        if ( ! data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId ) {
            data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId = {
                modMass_Rounded: modMass_BeingProcessed,
                data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId: new Map()
            }
            data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass.set( modMass_BeingProcessed, data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId )
        }

        for ( const projectSearchId_Or_SubSearchId_Entry of projectSearchId_Or_SubSearchId_Array ) {

            const data_For__ProjectSearchId_Or_SubSearchId = data_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId_Entry )

            if ( ! data_For__ProjectSearchId_Or_SubSearchId ) {
                //  NO Data for ProjectSearchId_Or_SubSearchId so SKIP
                continue  // EARLY CONTINUE
            }

            const projectSearchId_ForUseWhereRequire_projectSearchId = data_For__ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId

            const peptideIds_For_MainFilters_Holder = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId_ForUseWhereRequire_projectSearchId )

            for ( const dataFor_SinglePsm of data_For__ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

                const psmTblData = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData

                const reportedPeptideId = psmTblData.reportedPeptideId;

                const peptideId_For_ReportedPeptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId )

                //  PSM Level Variable Modifications

                const modificationPositions_Processed_psmVariable_Dynamic_Modifications: Set<number> = new Set()

                if ( dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Length() > 0 ) {

                    for ( const psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

                        if ( modMass_BeingProcessed !== psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.modMass_Rounded_ForModPage_Processing ) {
                            //  NOT modMass_BeingProcessed so SKIP
                            continue  // EARLY CONTINUE
                        }

                        const modificationPosition = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position

                        modificationPositions_Processed_psmVariable_Dynamic_Modifications.add( modificationPosition )

                        const modPositionInPeptide_OnlyNumeric_NO_n_c_term = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position
                        //  position is already 1 for 'n' term and peptideSequence.length for 'c' term


                        //  Proteins are filtered on Protein Position Filter
                        const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                            projectSearchId: projectSearchId_ForUseWhereRequire_projectSearchId,
                            reportedPeptideId
                        } )
                        if ( ! proteinCoverageEntries ) {
                            //  NO proteinCoverageEntries.  May be due to filter on protein and position
                            continue // EARLY CONTINUE
                        }

                        for ( const proteinCoverageEntry of proteinCoverageEntries ) {

                            const peptidePositionInProtein = proteinCoverageEntry.proteinStartPosition

                            const modificationPosition_On_Protein = modPositionInPeptide_OnlyNumeric_NO_n_c_term + peptidePositionInProtein - 1;


                            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                                //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                                const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )

                                if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                                    //  NO selection ranges for this proteinSequenceVersionId so SKIP
                                    continue  // EARLY CONTINUE
                                }


                                if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                                    //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                                } else {
                                    if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                                        throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                                    }

                                    //  Since Modification is Unlocalized, look for any of peptide in the Protein selection

                                    let found_peptidePosition_On_Protein__IN__Selection = false

                                    for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                                        if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                                            found_peptidePosition_On_Protein__IN__Selection = true
                                            //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                                            break //  Break inner loop processing rangeEntries
                                        }
                                    }

                                    if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                                        //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                                        continue // EARLY CONTINUE
                                    }
                                }
                            }

                            let data_Map_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )
                            if ( ! data_Map_Key_ProteinPositionNumber ) {
                                data_Map_Key_ProteinPositionNumber = {
                                    proteinSequenceVersionId: proteinCoverageEntry.proteinSequenceVersionId,
                                    data_Map_Key_ProteinPositionNumber: new Map()
                                }
                                data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.set( proteinCoverageEntry.proteinSequenceVersionId, data_Map_Key_ProteinPositionNumber )
                            }

                            let data_For_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.get( modificationPosition_On_Protein )
                            if ( ! data_For_Key_ProteinPositionNumber ) {
                                data_For_Key_ProteinPositionNumber = {
                                    proteinPositionNumber: modificationPosition_On_Protein,
                                    projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set: new Set(),
                                    psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor: new Map(),
                                    peptideSequence_Letter_AT_ModificationPosition_Set: new Set(),
                                    peptideSequence_Letters_BEFORE_ModificationPosition_Set: new Set(),
                                    peptideSequence_Letters_AFTER_ModificationPosition_Set: new Set(),
                                    peptideSequenceString_WithMods_Set: new Set(),
                                }
                                data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.set( modificationPosition_On_Protein, data_For_Key_ProteinPositionNumber )
                            }

                            data_For_Key_ProteinPositionNumber.projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set.add( projectSearchId_ForUseWhereRequire_projectSearchId )

                            let psmId_Set = data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.get( projectSearchId_Or_SubSearchId_Entry )
                            if ( ! psmId_Set ) {
                                psmId_Set = new Set()
                                data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.set( projectSearchId_Or_SubSearchId_Entry, psmId_Set )
                            }

                            psmId_Set.add( psmTblData.psmId )

                            const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )

                            const peptideSequence_Letter_AT_ModificationPosition= peptideSequence.substring( ( modificationPosition - 1 ), modificationPosition )  // start at '- 1' since 'modificationPosition' is ONE based
                                const peptideSequence_Letters_BEFORE_ModificationPosition= peptideSequence.substring( 0, ( modificationPosition - 1 ) )  // end at '- 1' since 'modificationPosition' is ONE based
                            const peptideSequence_Letters_AFTER_ModificationPosition= peptideSequence.substring( modificationPosition )// start at 'modificationPosition' since 'modificationPosition' is ONE based

                            data_For_Key_ProteinPositionNumber.peptideSequence_Letter_AT_ModificationPosition_Set.add( peptideSequence_Letter_AT_ModificationPosition )
                            data_For_Key_ProteinPositionNumber.peptideSequence_Letters_BEFORE_ModificationPosition_Set.add( peptideSequence_Letters_BEFORE_ModificationPosition )
                            data_For_Key_ProteinPositionNumber.peptideSequence_Letters_AFTER_ModificationPosition_Set.add( peptideSequence_Letters_AFTER_ModificationPosition )

                            let peptideDisplayString: string = undefined

                            {
                                const commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters = {

                                    peptideSequence,
                                    reportedPeptideId,
                                    dataFor_SinglePsm,
                                    data_For_ModMass: data_ForSingle_ModMass,

                                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: undefined,
                                }

                                const modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result =
                                    modPage_Create_GeneratedReportedPeptideEntries_String_Etc( {

                                        proteinSequenceVersionId: undefined,
                                        data_ForProtein_ForSinglePsm: undefined,
                                        data_For_ModMass: data_ForSingle_ModMass,
                                        commonInputParameters,
                                        projectSearchId_ForUseWhereRequire_projectSearchId
                                    } )

                                if ( modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries.length !== 1 ) {
                                    const msg = "modPage_Create_GeneratedReportedPeptideEntries_String_Etc(...) returned other than 1 entry"
                                    console.warn( msg )
                                    throw Error( msg )
                                }

                                const generatedReportedPeptideString_Entry = modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries[ 0 ]

                                data_For_Key_ProteinPositionNumber.peptideSequenceString_WithMods_Set.add( generatedReportedPeptideString_Entry.peptideDisplayString )
                            }

                            data_For_Key_ProteinPositionNumber.peptideSequenceString_WithMods_Set.add( peptideDisplayString )
                        }
                    }
                }

                //  Reported Peptide Level Variable Modifications

                for ( const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries() ) {

                    if ( modMass_BeingProcessed !== variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.modMass_Rounded_ForModPage_Processing ) {
                        //  NOT modMass_BeingProcessed so SKIP
                        continue  // EARLY CONTINUE
                    }

                    const modificationPosition = variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position

                    //  This IF check ".has(...)" is NOT really used since if
                    //              dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries()
                    //      IS populated then
                    //              dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries()
                    //      IS NOT populated.
                    //   This may change so this is the safest way to code this.

                    if ( modificationPositions_Processed_psmVariable_Dynamic_Modifications.has( modificationPosition ) ) {
                        //  Already processed a PSM Variable Modification at this position so skip
                        continue // EARLY CONTINUE
                    }

                    const modPositionInPeptide_OnlyNumeric_NO_n_c_term = variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position
                    //  position is already 1 for 'n' term and peptideSequence.length for 'c' term

                    //  Proteins are filtered on Protein Position Filter
                    const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                        projectSearchId: projectSearchId_ForUseWhereRequire_projectSearchId,
                        reportedPeptideId
                    } )
                    if ( ! proteinCoverageEntries ) {
                        //  NO proteinCoverageEntries.  May be due to filter on protein and position
                        continue // EARLY CONTINUE
                    }

                    for ( const proteinCoverageEntry of proteinCoverageEntries ) {

                        const peptidePositionInProtein = proteinCoverageEntry.proteinStartPosition

                        const modificationPosition_On_Protein = modPositionInPeptide_OnlyNumeric_NO_n_c_term + peptidePositionInProtein - 1;

                        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                            //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                            const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )

                            if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                                //  NO selection ranges for this proteinSequenceVersionId so SKIP
                                continue  // EARLY CONTINUE
                            }

                            if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                                //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                            } else {
                                if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                                    throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                                }

                                //  Since Modification is Unlocalized, look for any of peptide in the Protein selection

                                let found_peptidePosition_On_Protein__IN__Selection = false

                                for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                                    if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                                        found_peptidePosition_On_Protein__IN__Selection = true
                                        //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                                        break //  Break inner loop processing rangeEntries
                                    }
                                }

                                if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                                    //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                                    continue // EARLY CONTINUE
                                }
                            }
                        }

                        let data_Map_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )
                        if ( ! data_Map_Key_ProteinPositionNumber ) {
                            data_Map_Key_ProteinPositionNumber = {
                                proteinSequenceVersionId: proteinCoverageEntry.proteinSequenceVersionId,
                                data_Map_Key_ProteinPositionNumber: new Map()
                            }
                            data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.set( proteinCoverageEntry.proteinSequenceVersionId, data_Map_Key_ProteinPositionNumber )
                        }

                        let data_For_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.get( modificationPosition_On_Protein )
                        if ( ! data_For_Key_ProteinPositionNumber ) {
                            data_For_Key_ProteinPositionNumber = {
                                proteinPositionNumber: modificationPosition_On_Protein,
                                projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set: new Set(),
                                psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor: new Map(),
                                peptideSequence_Letter_AT_ModificationPosition_Set: new Set(),
                                peptideSequence_Letters_BEFORE_ModificationPosition_Set: new Set(),
                                peptideSequence_Letters_AFTER_ModificationPosition_Set: new Set(),
                                peptideSequenceString_WithMods_Set: new Set(),
                            }
                            data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.set( modificationPosition_On_Protein, data_For_Key_ProteinPositionNumber )
                        }

                        data_For_Key_ProteinPositionNumber.projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set.add( projectSearchId_ForUseWhereRequire_projectSearchId )

                        let psmId_Set = data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.get( projectSearchId_Or_SubSearchId_Entry )
                        if ( ! psmId_Set ) {
                            psmId_Set = new Set()
                            data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.set( projectSearchId_Or_SubSearchId_Entry, psmId_Set )
                        }

                        psmId_Set.add( psmTblData.psmId )

                        const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )

                        const peptideSequence_Letter_AT_ModificationPosition= peptideSequence.substring( ( modificationPosition - 1 ), modificationPosition )  // start at '- 1' since 'modificationPosition' is ONE based
                        const peptideSequence_Letters_BEFORE_ModificationPosition= peptideSequence.substring( 0, ( modificationPosition - 1 ) )  // end at '- 1' since 'modificationPosition' is ONE based
                        const peptideSequence_Letters_AFTER_ModificationPosition= peptideSequence.substring( modificationPosition )// start at 'modificationPosition' since 'modificationPosition' is ONE based

                        data_For_Key_ProteinPositionNumber.peptideSequence_Letter_AT_ModificationPosition_Set.add( peptideSequence_Letter_AT_ModificationPosition )
                        data_For_Key_ProteinPositionNumber.peptideSequence_Letters_BEFORE_ModificationPosition_Set.add( peptideSequence_Letters_BEFORE_ModificationPosition )
                        data_For_Key_ProteinPositionNumber.peptideSequence_Letters_AFTER_ModificationPosition_Set.add( peptideSequence_Letters_AFTER_ModificationPosition )


                        const commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters = {

                            peptideSequence,
                            reportedPeptideId,
                            dataFor_SinglePsm,
                            data_For_ModMass: data_ForSingle_ModMass,

                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: undefined,
                        }

                        const modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result =
                            modPage_Create_GeneratedReportedPeptideEntries_String_Etc({

                                proteinSequenceVersionId: undefined,
                                data_ForProtein_ForSinglePsm: undefined,
                                data_For_ModMass: data_ForSingle_ModMass,
                                commonInputParameters,
                                projectSearchId_ForUseWhereRequire_projectSearchId
                            } )

                        if ( modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries.length !== 1 ) {
                            const msg = "modPage_Create_GeneratedReportedPeptideEntries_String_Etc(...) returned other than 1 entry"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const generatedReportedPeptideString_Entry = modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries[ 0 ]

                        data_For_Key_ProteinPositionNumber.peptideSequenceString_WithMods_Set.add( generatedReportedPeptideString_Entry.peptideDisplayString )
                    }
                }

                //  PSM Level Open Modifications

                for ( const get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

                    if ( modMass_BeingProcessed !== get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry.modMass_Rounded_ForModPage_Processing ) {
                        //  NOT modMass_BeingProcessed so SKIP
                        continue  // EARLY CONTINUE
                    }

                    if ( get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry.psmOpenModificationForPsmId.openModificationMass_Rounded === 0
                        && all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                        //  SKIP Open Mod mass that rounds to zero when User Selection

                        continue  // EARLY CONTINUE
                    }

                    if ( get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry?.psmOpenModificationForPsmId?.positionsMap_KeyPosition
                        && get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry?.psmOpenModificationForPsmId?.positionsMap_KeyPosition.size > 0 ) {

                        for ( const positions_Array of get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entry.psmOpenModificationForPsmId.positionsMap_KeyPosition.values() ) {

                            for ( const positionEntry of positions_Array ) {

                                const modPositionInPeptide_OnlyNumeric_NO_n_c_term = positionEntry.position
                                //  position is already 1 for 'n' term and peptideSequence.length for 'c' term

                                //  Proteins are filtered on Protein Position Filter
                                const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                                    projectSearchId: projectSearchId_ForUseWhereRequire_projectSearchId,
                                    reportedPeptideId
                                } )
                                if ( ! proteinCoverageEntries ) {
                                    //  NO proteinCoverageEntries.  May be due to filter on protein and position
                                    continue // EARLY CONTINUE
                                }

                                for ( const proteinCoverageEntry of proteinCoverageEntries ) {

                                    const peptidePositionInProtein = proteinCoverageEntry.proteinStartPosition

                                    const modificationPosition_On_Protein = modPositionInPeptide_OnlyNumeric_NO_n_c_term + peptidePositionInProtein - 1;

                                    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                                        //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                                        const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )

                                        if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                                            //  NO selection ranges for this proteinSequenceVersionId so SKIP
                                            continue  // EARLY CONTINUE
                                        }

                                        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

                                            //  Filter using proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                                            const selections_Ranges_For_proteinSequenceVersionId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )

                                            if ( ! selections_Ranges_For_proteinSequenceVersionId ) {
                                                //  NO selection ranges for this proteinSequenceVersionId so SKIP
                                                continue  // EARLY CONTINUE
                                            }

                                            if ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) {

                                                //  Found in selection so do nothing to continue processing proteinCoverage_Entry

                                            } else {
                                                if ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {
                                                    throw Error( "ELSE of ( selections_Ranges_For_proteinSequenceVersionId.fullProteinSelected ) AND ( ! selections_Ranges_For_proteinSequenceVersionId.rangeEntries )" )
                                                }

                                                //  Since Modification is Unlocalized, look for any of peptide in the Protein selection

                                                let found_peptidePosition_On_Protein__IN__Selection = false

                                                for ( const selection_RangeEntry of selections_Ranges_For_proteinSequenceVersionId.rangeEntries ) {

                                                    if ( selection_RangeEntry.proteinPosition_Start <= modificationPosition_On_Protein && modificationPosition_On_Protein <= selection_RangeEntry.proteinPosition_End ) {

                                                        found_peptidePosition_On_Protein__IN__Selection = true
                                                        //  Found in selection so 'break' to continue processing proteinCoverage_Entry

                                                        break //  Break inner loop processing rangeEntries
                                                    }
                                                }

                                                if ( ! found_peptidePosition_On_Protein__IN__Selection ) {
                                                    //  NOT found in selection so 'continue' to skip processing proteinCoverage_Entry

                                                    continue // EARLY CONTINUE
                                                }
                                            }
                                        }
                                    }

                                    let data_Map_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.get( proteinCoverageEntry.proteinSequenceVersionId )
                                    if ( ! data_Map_Key_ProteinPositionNumber ) {
                                        data_Map_Key_ProteinPositionNumber = {
                                            proteinSequenceVersionId: proteinCoverageEntry.proteinSequenceVersionId,
                                            data_Map_Key_ProteinPositionNumber: new Map()
                                        }
                                        data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId.set( proteinCoverageEntry.proteinSequenceVersionId, data_Map_Key_ProteinPositionNumber )
                                    }

                                    let data_For_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.get( modificationPosition_On_Protein )
                                    if ( ! data_For_Key_ProteinPositionNumber ) {
                                        data_For_Key_ProteinPositionNumber = {
                                            proteinPositionNumber: modificationPosition_On_Protein,
                                            projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set: new Set(),
                                            psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor: new Map(),
                                            peptideSequence_Letter_AT_ModificationPosition_Set: new Set(),
                                            peptideSequence_Letters_BEFORE_ModificationPosition_Set: new Set(),
                                            peptideSequence_Letters_AFTER_ModificationPosition_Set: new Set(),
                                            peptideSequenceString_WithMods_Set: new Set(),
                                        }
                                        data_Map_Key_ProteinPositionNumber.data_Map_Key_ProteinPositionNumber.set( modificationPosition_On_Protein, data_For_Key_ProteinPositionNumber )
                                    }

                                   data_For_Key_ProteinPositionNumber.projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set.add( projectSearchId_ForUseWhereRequire_projectSearchId )

                                    let psmId_Set = data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.get( projectSearchId_Or_SubSearchId_Entry )
                                    if ( ! psmId_Set ) {
                                        psmId_Set = new Set()
                                        data_For_Key_ProteinPositionNumber.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.set( projectSearchId_Or_SubSearchId_Entry, psmId_Set )
                                    }

                                    psmId_Set.add( psmTblData.psmId )

                                    const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )

                                    const modificationPosition = positionEntry.position

                                    const peptideSequence_Letter_AT_ModificationPosition= peptideSequence.substring( ( modificationPosition - 1 ), modificationPosition )  // start at '- 1' since 'modificationPosition' is ONE based
                                    const peptideSequence_Letters_BEFORE_ModificationPosition= peptideSequence.substring( 0, ( modificationPosition - 1 ) )  // end at '- 1' since 'modificationPosition' is ONE based
                                    const peptideSequence_Letters_AFTER_ModificationPosition= peptideSequence.substring( modificationPosition )  // start at 'modificationPosition' since 'modificationPosition' is ONE based

                                    data_For_Key_ProteinPositionNumber.peptideSequence_Letter_AT_ModificationPosition_Set.add( peptideSequence_Letter_AT_ModificationPosition )
                                    data_For_Key_ProteinPositionNumber.peptideSequence_Letters_BEFORE_ModificationPosition_Set.add( peptideSequence_Letters_BEFORE_ModificationPosition )
                                    data_For_Key_ProteinPositionNumber.peptideSequence_Letters_AFTER_ModificationPosition_Set.add( peptideSequence_Letters_AFTER_ModificationPosition )


                                    const commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters = {

                                        peptideSequence,
                                        reportedPeptideId,
                                        dataFor_SinglePsm,
                                        data_For_ModMass: data_ForSingle_ModMass,

                                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: undefined,
                                    }

                                    const modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result =
                                        modPage_Create_GeneratedReportedPeptideEntries_String_Etc({

                                            proteinSequenceVersionId: undefined,
                                            data_ForProtein_ForSinglePsm: undefined,
                                            data_For_ModMass: data_ForSingle_ModMass,
                                            commonInputParameters,
                                            projectSearchId_ForUseWhereRequire_projectSearchId
                                        } )

                                    let found_AnyMatch = false

                                    for ( const entry of modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries ) {

                                        let match_openModPositionOverride_ToPassTo_PsmTableCreationCode = false

                                        if ( positionEntry.isNTerminal ) {
                                            if ( entry.openModPositionOverride_ToPassTo_PsmTableCreationCode === Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__N ) {
                                                match_openModPositionOverride_ToPassTo_PsmTableCreationCode = true
                                            }
                                        } else if ( positionEntry.isCTerminal ) {
                                            if ( entry.openModPositionOverride_ToPassTo_PsmTableCreationCode === Limelight__ResiduePositions_n_c_Constants.RESIDUE_POSITION__VALUE__C ) {
                                                match_openModPositionOverride_ToPassTo_PsmTableCreationCode = true
                                            }
                                        } else {
                                            if ( entry.openModPositionOverride_ToPassTo_PsmTableCreationCode === positionEntry.position ) {
                                                match_openModPositionOverride_ToPassTo_PsmTableCreationCode = true
                                            }
                                        }

                                        if ( match_openModPositionOverride_ToPassTo_PsmTableCreationCode ) {

                                            data_For_Key_ProteinPositionNumber.peptideSequenceString_WithMods_Set.add( entry.peptideDisplayString )

                                            found_AnyMatch = true
                                        }
                                    }

                                    if ( ! found_AnyMatch ) {

                                        const peptideDisplayString_All: Array<string> = []

                                        for ( const entry of modPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result.generatedReportedPeptideString_Result_Entries ) {
                                            peptideDisplayString_All.push( entry.peptideDisplayString )
                                        }

                                        const peptideDisplayString_All_CommaDelim = peptideDisplayString_All.join(", ")

                                        const msg = "modPage_Create_GeneratedReportedPeptideEntries_String_Etc(...) NOT returned any entry that matched positionEntry. positionEntry.position: " + positionEntry.position +
                                            ", positionEntry.isNTerminal: " + positionEntry.isNTerminal + ", positionEntry.isCTerminal: " + positionEntry.isCTerminal +
                                            ", peptideDisplayString_All_CommaDelim: " + peptideDisplayString_All_CommaDelim
                                        console.warn(msg)
                                        throw Error(msg)
                                    }
                                }
                            }
                        }
                    } else {
                        // Unlocalized

                        //  Unlocalized Open Mods are excluded from this report
                    }
                }
            }
        }
    }

    ///////////////////////

    //   Build Download Report Lines

    let download_HeaderLines_String: string = undefined

    {  //  Populate Header Lines

        const reportLineHeader_Fields = [
            'modification mass rounded', 'protein name', 'protein modification position', 'peptide sequence common', 'peptide sequences', 'peptide sequences count', 'PSM Count Total'
        ]

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            // Per Sub Search Header

            for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                reportLineHeader_Fields.push( 'PSM Count(' + searchSubGroup.subgroupName_Display + ')' )
            }

        } else {
            // Per Search Header

            for ( const projectSearchId of projectSearchId_Or_SubSearchId_Array ) {

                const searchData = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchData ) {
                    const msg = " all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const searchId = searchData.searchId

                reportLineHeader_Fields.push( 'PSM Count(' + searchId + ')' )
            }
        }

        const download_Header_Comment_Lines: Array<string> = [

            "# Header comment lines start with '#",
            "#",
            "# Special Note:  Open modifications without positions (unlocalized) will not be included in this file.",
            "#",
            "# Page URL: " + window.location.href,
            "#",
            "# Search Ids and their names:",
        ]


        for ( const projectSearchId of projectSearchId_Or_SubSearchId_Array ) {

            const searchData = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchData ) {
                const msg = " all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            download_Header_Comment_Lines.push( '# (' + searchData.searchId + ') ' + searchData.name )
        }

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            // Per Sub Search Header

            download_Header_Comment_Lines.push( '# ' )
            download_Header_Comment_Lines.push( '# Processing single search with sub searches.  These are the sub search short names and full names' )
            download_Header_Comment_Lines.push( '# ' )

            for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                download_Header_Comment_Lines.push( '# (' + searchSubGroup.subgroupName_Display + ') ' + searchSubGroup.searchSubgroupName_fromImportFile )
            }
        }

        download_Header_Comment_Lines.push( "# " )
        download_Header_Comment_Lines.push( "# The data is collated into lines/records by the complex key: 'mod mass rounded', 'protein name', 'protein modification position'" )
        download_Header_Comment_Lines.push( "# (the collating uses the protein sequence as the unique protein identifier, not the protein name)" )
        download_Header_Comment_Lines.push( "# " )
        download_Header_Comment_Lines.push( "# " )
        download_Header_Comment_Lines.push( "# Column Descriptions:" )
        download_Header_Comment_Lines.push( "# " )
        download_Header_Comment_Lines.push( "# 'modification mass rounded': the variable or open modification mass rounded to a whole number" )
        download_Header_Comment_Lines.push( "# 'protein name':  All protein names for that protein sequence are output and comma delimited" )
        download_Header_Comment_Lines.push( "# 'protein modification position': Position of the modifications in the protein.  Open modifications with multiple positions will result in multiple lines in this file, one for each position." )
        download_Header_Comment_Lines.push( "# 'peptide sequence common': All the peptides in the next column are processed with just the residues (not the modifications).  This is the common peptide residues to left and right of the modification position on the protein.  This is formatted with brackets '[]' whether it is a variable or open modification.  No other modifications are in this string other than the modification at the protein position." )
        download_Header_Comment_Lines.push( "# 'peptide sequences': All the peptides that have this modification mass at this position in the protein.  Comma delimited" )
        download_Header_Comment_Lines.push( "# 'PSM Count Total': Total PSM of the peptides that have the mod mass at this protein position that round to this rounded modification mass." )
        download_Header_Comment_Lines.push( "# Columns for PSM Count per search or sub search" )
        download_Header_Comment_Lines.push( "# " )
        download_Header_Comment_Lines.push( "# " )

        const download_Header_Comment_Lines_String = download_Header_Comment_Lines.join("\n")

        //  HEADER LINE
        download_HeaderLines_String = download_Header_Comment_Lines_String + "\n" + reportLineHeader_Fields.join( "\t" )
    }

    /////////////

    //   Function Result Object

    const function_Result : ModPage_CreateDownload_ModPositionInProtein_Report_Result = {
        download_HeaderLines_String: download_HeaderLines_String,
        downloadDataEntry_Map_Key_modMass_Rounded: new Map(),
        searchIds_Array
    }



    /////////////


    //  Cache protein names string for ProteinSequenceVersionId
    const proteinNames_String_Output_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId: Map<number, Map<number, string>> = new Map()

    const inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId = (
        {
            proteinSequenceVersionId, projectSearchId
        } : {
            proteinSequenceVersionId: number
            projectSearchId: number
        }
    ) => {

        let proteinNames_String_Output_Map_Key_ProteinSequenceVersionId = proteinNames_String_Output_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! proteinNames_String_Output_Map_Key_ProteinSequenceVersionId ) {
            proteinNames_String_Output_Map_Key_ProteinSequenceVersionId = new Map()
            proteinNames_String_Output_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.set( projectSearchId, proteinNames_String_Output_Map_Key_ProteinSequenceVersionId )
        }

        {
            const proteinNames_String_Output = proteinNames_String_Output_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
            if ( proteinNames_String_Output ) {
                //  Return Cached computation
                return proteinNames_String_Output  // EARLY RETURN
            }
        }

        const proteinInfo_For_MainFilters_Holder = proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

        const proteinInfo_For_ProteinSequenceVersionId = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId )
        if ( ! proteinInfo_For_ProteinSequenceVersionId ) {
            throw Error( "proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId ) returned NOTHING for proteinSequenceVersionId: " + proteinSequenceVersionId )
        }

        const proteinAnnotation_Set: Set<string> = new Set()
        for ( const proteinAnnotation of proteinInfo_For_ProteinSequenceVersionId.annotations ) {
            proteinAnnotation_Set.add( proteinAnnotation.name )
        }

        const proteinAnnotation_Array_Sorted = Array.from( proteinAnnotation_Set ).sort()
        const proteinNames_String_Output = proteinAnnotation_Array_Sorted.join( "," )

        proteinNames_String_Output_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNames_String_Output )

        return proteinNames_String_Output

    }  //  END OF Inline Function

    const data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue_ArraySorted = Array.from( data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass.values() )

    data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue_ArraySorted.sort( (a,b) => {
        if ( a.modMass_Rounded < b.modMass_Rounded ) {
            return -1
        }
        if ( a.modMass_Rounded > b.modMass_Rounded ) {
            return 1
        }
        return 0
    })

    for ( const data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue of data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue_ArraySorted ) {

        const modMass_Rounded = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue.modMass_Rounded
        const data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map_Key_RoundedModMass_MapValue.data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId

        const reportLines_For_ModMass_Rounded: Array<string> = []


        for ( const data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_MapValue of data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_Map.values() ) {

            const proteinSequenceVersionId = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_MapValue.proteinSequenceVersionId
            const data_Map_Key_ProteinPositionNumber = data_Map_Key_ProteinPositionNumber_Map_Key_ProteinSequenceVersionId_MapValue.data_Map_Key_ProteinPositionNumber

            const data_Map_Key_ProteinPositionNumber_MapValue_Array_Sorted = Array.from( data_Map_Key_ProteinPositionNumber.values()  )

            data_Map_Key_ProteinPositionNumber_MapValue_Array_Sorted.sort( (a,b) => {
                if ( a.proteinPositionNumber < b.proteinPositionNumber ) {
                    return -1
                }
                if ( a.proteinPositionNumber > b.proteinPositionNumber ) {
                    return 1
                }
                return 0
            })


            for ( const data_Map_Key_ProteinPositionNumber_MapValue of data_Map_Key_ProteinPositionNumber_MapValue_Array_Sorted ) {

                const proteinPositionNumber = data_Map_Key_ProteinPositionNumber_MapValue.proteinPositionNumber


                const psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor = data_Map_Key_ProteinPositionNumber_MapValue.psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor
                const projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set = data_Map_Key_ProteinPositionNumber_MapValue.projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set


                const proteinNames_String_Output_Set: Set<string> = new Set()

                for ( const projectSearchId of projectSearchId_ForUseWhereRequire_projectSearchId_FoundDataFor_Set ) {

                    const proteinNames_String_Output = inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId( {
                        proteinSequenceVersionId,
                        projectSearchId
                    } )

                    proteinNames_String_Output_Set.add( proteinNames_String_Output )
                }

                const proteinNames_String_Output_Array_Sorted = Array.from( proteinNames_String_Output_Set )
                proteinNames_String_Output_Array_Sorted.sort()

                const proteinNames_String_Output_Sorted_CommaDelim = proteinNames_String_Output_Array_Sorted.join(", ")

                const commonPeptideSequence = _compute_CommonPeptideSequence({
                    modMass_Rounded,

                    peptideSequence_Letter_AT_ModificationPosition_Set: data_Map_Key_ProteinPositionNumber_MapValue.peptideSequence_Letter_AT_ModificationPosition_Set,
                    peptideSequence_Letters_BEFORE_ModificationPosition_Set: data_Map_Key_ProteinPositionNumber_MapValue.peptideSequence_Letters_BEFORE_ModificationPosition_Set,
                    peptideSequence_Letters_AFTER_ModificationPosition_Set: data_Map_Key_ProteinPositionNumber_MapValue.peptideSequence_Letters_AFTER_ModificationPosition_Set
                })

                const peptideSequences = Array.from( data_Map_Key_ProteinPositionNumber_MapValue.peptideSequenceString_WithMods_Set )
                peptideSequences.sort()

                const peptideSequences_CommaDelim = peptideSequences.join( ", " )

                //  PSM Counts

                let psmCount_Total = 0

                for ( const psmId_Set of psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.values() ) {
                    psmCount_Total += psmId_Set.size
                }


                //  Final Report Line

                const reportLine_Fields: string[] = [
                    modMass_Rounded.toString(), proteinNames_String_Output_Sorted_CommaDelim, proteinPositionNumber.toString(), commonPeptideSequence, peptideSequences_CommaDelim, peptideSequences.length.toString(), psmCount_Total.toString()
                ]

                    // Add PSM Count Per Sub Search or Per Search

                    for ( const projectSearchId_Or_SubSearchId of projectSearchId_Or_SubSearchId_Array ) {

                        let psmCount = 0

                        {
                            const psmId_Set = psmId_Set_Map_Key_ProjectSearchIds_Or_SubSearchIds_FoundDataFor.get( projectSearchId_Or_SubSearchId )
                            if ( psmId_Set ) {
                                psmCount = psmId_Set.size
                            }
                        }

                        reportLine_Fields.push( psmCount.toString() )
                    }

                //  Data LINE
                reportLines_For_ModMass_Rounded.push( reportLine_Fields.join( "\t" ) );
            }
        }

        if ( reportLines_For_ModMass_Rounded.length > 0 ) {
            //  Have data so store in map

            reportLines_For_ModMass_Rounded.push( "" )  // so have \n on last line

            const downloadData_String = reportLines_For_ModMass_Rounded.join( "\n" )

            function_Result.downloadDataEntry_Map_Key_modMass_Rounded.set( modMass_Rounded, {
                modMass_Rounded,
                downloadData_String
            } )
        }
    }

    return function_Result
}

/**
 *
 * @param modMass_Rounded
 * @param peptideSequence_Letter_AT_ModificationPosition_Set
 * @param peptideSequence_Letters_BEFORE_ModificationPosition_Set
 * @param peptideSequence_Letters_AFTER_ModificationPosition_Set
 */
const _compute_CommonPeptideSequence = function (
    {
        modMass_Rounded,

        peptideSequence_Letter_AT_ModificationPosition_Set,
        peptideSequence_Letters_BEFORE_ModificationPosition_Set,
        peptideSequence_Letters_AFTER_ModificationPosition_Set
    } : {
        modMass_Rounded: number

        peptideSequence_Letter_AT_ModificationPosition_Set: Set<string>
        peptideSequence_Letters_BEFORE_ModificationPosition_Set: Set<string>
        peptideSequence_Letters_AFTER_ModificationPosition_Set: Set<string>
    }
) : string {

    const __LETTER_TO_COMPARE__UNSET__IS_UNDEFINED: string = undefined

    //  Get common letters before and at mod

    let commonLetters_Before_AndAt_ModPosition = ""

    if ( peptideSequence_Letter_AT_ModificationPosition_Set.size === 1 ) {

        {
            //  Use this since set only contains 1 element
            for ( const peptideSequence_Letter_AT_ModificationPosition of peptideSequence_Letter_AT_ModificationPosition_Set ) {
                commonLetters_Before_AndAt_ModPosition = peptideSequence_Letter_AT_ModificationPosition
                break  // break since set only contains 1 element
            }
        }

        let allLettersMatch = true

        let positionFromEnd_ToCompare = -1 // Subtract 1 each iteration

        do {
            let currentLetterToCompare = __LETTER_TO_COMPARE__UNSET__IS_UNDEFINED

            for ( const peptideSequence_Letters_BEFORE_Entry of peptideSequence_Letters_BEFORE_ModificationPosition_Set ) {

                const letterAtPos = peptideSequence_Letters_BEFORE_Entry.at( positionFromEnd_ToCompare )

                if ( ! letterAtPos ) {
                    //  NO letter at position positionFromEnd_ToCompare so exit
                    allLettersMatch = false  // Set false so exit outer loop
                    break  // EARLY BREAK
                }

                if ( currentLetterToCompare === __LETTER_TO_COMPARE__UNSET__IS_UNDEFINED ) {
                    currentLetterToCompare = letterAtPos
                } else {
                    if ( currentLetterToCompare !== letterAtPos ) {
                        //  Letters not match at position positionFromEnd_ToCompare
                        allLettersMatch = false  // Set false so exit outer loop
                        break  // EARLY BREAK
                    }
                }
            }

            if ( allLettersMatch ) {

                commonLetters_Before_AndAt_ModPosition = currentLetterToCompare + commonLetters_Before_AndAt_ModPosition  // Prepend current letter to common letters

                positionFromEnd_ToCompare--
            }

        } while ( allLettersMatch )
    }


    //  Get common letters before and at mod

    let commonLetters_After_ModPosition = ""

    {

        let allLettersMatch = true

        let positionFromStart_ToCompare = 0 // Add 1 each iteration

        do {
            let currentLetterToCompare = __LETTER_TO_COMPARE__UNSET__IS_UNDEFINED

            for ( const peptideSequence_Letters_AFTER_ModificationPosition_Entry of peptideSequence_Letters_AFTER_ModificationPosition_Set ) {

                const letterAtPos = peptideSequence_Letters_AFTER_ModificationPosition_Entry.at( positionFromStart_ToCompare )

                if ( ! letterAtPos ) {
                    //  NO letter at position positionFromStart_ToCompare so exit
                    allLettersMatch = false  // Set false so exit outer loop
                    break  // EARLY BREAK
                }

                if ( currentLetterToCompare === __LETTER_TO_COMPARE__UNSET__IS_UNDEFINED ) {
                    currentLetterToCompare = letterAtPos
                } else {
                    if ( currentLetterToCompare !== letterAtPos ) {
                        //  Letters not match at position positionFromStart_ToCompare
                        allLettersMatch = false  // Set false so exit outer loop
                        break  // EARLY BREAK
                    }
                }
            }

            if ( allLettersMatch ) {

                commonLetters_After_ModPosition += currentLetterToCompare  // Append current letter to common letters

                positionFromStart_ToCompare++
            }

        } while ( allLettersMatch )
    }

    return commonLetters_Before_AndAt_ModPosition + "[" + modMass_Rounded + "]" + commonLetters_After_ModPosition
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///////

/**
 *
 */
class INTERNAL__CachingResults_PerCallToTopLevelFunctionInThisFile__GetProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteringOn_ProteinPositionFilter_UserSelections_StateObject__CachingResults_Per_ProjectSearchId_ReportedPeptideId {

    private _proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
    private _all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    private _cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId: Map<number, Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>>> = new Map()

    constructor(
        {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        }: {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        }
    ) {
        this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
        this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }

    /**
     *
     * @param reportedPeptideId
     * @param projectSearchId
     */
    get_ProteinCoverageEntries(
        {
            reportedPeptideId, projectSearchId
        }: {
            reportedPeptideId: number
            projectSearchId: number
        }
    ) {

        {
            const dataFor_projectSearchId = this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( dataFor_projectSearchId ) {
                const dataFor_reportedPeptideId = dataFor_projectSearchId.get( reportedPeptideId )

                if ( dataFor_reportedPeptideId ) {
                    //  Have in cache so return
                    return dataFor_reportedPeptideId  // EARLY RETURN
                }
            }
        }

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder =
            this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
            throw Error( "this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId" )
        }

        const proteinCoverage_For_ReportedPeptideId_UnFiltered =
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId )
        if ( ! proteinCoverage_For_ReportedPeptideId_UnFiltered ) {
            throw Error( "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId_ForPSM ) returned NOTHING for reportedPeptideId: " + reportedPeptideId )
        }


        let proteinCoverage_For_ReportedPeptideId_Result = proteinCoverage_For_ReportedPeptideId_UnFiltered

        if (  this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

            //  YES Selections create Filtered Array and Overlay "Result"

            const proteinCoverage_For_ReportedPeptideId_YES_Filtered: Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry> = []

            for ( const proteinCoverage_Entry of proteinCoverage_For_ReportedPeptideId_Result ) {  // Start with Previous Result

                const rangeEntries_For_proteinSequenceVersionId = this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId )
                if ( rangeEntries_For_proteinSequenceVersionId ) {
                    if ( rangeEntries_For_proteinSequenceVersionId.fullProteinSelected ) {

                        // ADD to Filtered Protein Coverage Entries

                        proteinCoverage_For_ReportedPeptideId_YES_Filtered.push( proteinCoverage_Entry )

                    } else if ( ! rangeEntries_For_proteinSequenceVersionId.rangeEntries ) {
                        throw Error( "proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId ) returned object with NO 'fullProteinSelected' or 'rangeEntries' properties.  proteinCoverage_Entry.proteinSequenceVersionId:" + proteinCoverage_Entry.proteinSequenceVersionId )
                    } else if ( rangeEntries_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
                        throw Error( "proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId ) returned object with 'rangeEntries' property of length zero.  proteinCoverage_Entry.proteinSequenceVersionId:" + proteinCoverage_Entry.proteinSequenceVersionId )
                    } else {

                        // Process Range Entries

                        let found_ProteinPositionFilter_For_ProteinCoverage_Entry = false

                        for ( const proteinPositionFilter_UserSelections_RangeEntry of rangeEntries_For_proteinSequenceVersionId.rangeEntries ) {

                            const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                            const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                            //  x1 <= y2 && y1 <= x2
                            if ( selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End ) { // coverage entry overlaps select range
                                found_ProteinPositionFilter_For_ProteinCoverage_Entry = true;
                                break
                            }
                        }

                        if ( found_ProteinPositionFilter_For_ProteinCoverage_Entry ) {

                            // ADD to Filtered Protein Coverage Entries

                            proteinCoverage_For_ReportedPeptideId_YES_Filtered.push( proteinCoverage_Entry )
                        }
                    }
                }
            }

            proteinCoverage_For_ReportedPeptideId_Result = proteinCoverage_For_ReportedPeptideId_YES_Filtered
        }

        //   proteinPosition_Of_Modification_Filter_UserSelections_StateObject  is processed elsewhere in this file so it is handled.  Required since is dependent on Modification Position

        //  ADD result to the Cache

        let dataFor_projectSearchId = this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! dataFor_projectSearchId ) {
            dataFor_projectSearchId = new Map()
            this._cachedResults__ProteinCoverage_FilteredData_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, dataFor_projectSearchId )
        }
        dataFor_projectSearchId.set( reportedPeptideId, proteinCoverage_For_ReportedPeptideId_Result )

        return proteinCoverage_For_ReportedPeptideId_Result
    }
}
