/**
 * modPage_Download_PSM_Localization_Report.ts
 */


import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
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
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {
    OpenModPosition_DataType
} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    ControllerPath_forCurrentPage_FromDOM
} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {
    lorikeetSpectrumViewer_CreateURL
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_CreateURL_ParseURL";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";


/**
 * User clicked on '[Download PSM Localization Report]'
 *
 *
 * From ModPage_PSMLocalizationReportDownloadGenerator.getPsmLocalizationReportText
 */
export const modPage_Download_PSM_Localization_Report = function (
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
) {

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    let scanFileData_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

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
    {
        const get_ScanFileDataHolder_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__Multiple_ProjectSearchIds().
            get_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId().
            get_ScanFileDataHolder()

        if ( get_ScanFileDataHolder_Result.data ) {
            scanFileData_Holder = get_ScanFileDataHolder_Result.data.scanFileData_Holder
        } else if ( get_ScanFileDataHolder_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                get_ScanFileDataHolder_Result.promise.catch(reason => { reject(reason)})
                get_ScanFileDataHolder_Result.promise.then(value => { try {
                    scanFileData_Holder = value.scanFileData_Holder
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error("get_ScanFileDataHolder_Result no 'data' or 'promise'")
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

    if ( promises.length === 0 ) {

        _modPage_Download_PSM_Localization_Report_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            scanFileData_Holder,
            peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })

        return  // EARLY RETURN
    }

    const promisesAll = Promise.all(promises)

    promisesAll.catch(reason => {  })
    promisesAll.then(novalue => { try {
        _modPage_Download_PSM_Localization_Report_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            scanFileData_Holder,
            peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

////////////////

const _modPage_Download_PSM_Localization_Report_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,

        scanFileData_Holder,
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        peptideSequences_For_MainFilters_Holder,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        scanFileData_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

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
            console.warn(msg)
            throw Error(msg)
        }

        const projectSearchId = projectSearchIds[ 0 ]

        const searchSubGroups_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
        if ( ! searchSubGroups_Root ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING"
            console.warn(msg)
            throw Error(msg)
        }

        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
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

    for ( const projectSearchId of projectSearchIds ) {
        const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
            projectSearchId, dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
        } )
        searchNameDisplayString_Map_Key_ProjectSearchId.set( projectSearchId, searchNameForProjectSearchId )

        const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
        if ( ! searchData_For_ProjectSearchId ) {
            throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }
        searchId_Map_Key_ProjectSearchId.set( projectSearchId, searchData_For_ProjectSearchId.searchId )
    }

    const searchIds_Array: Array<number> = []

    const reportLines:Array<string> = []

    {  //  Populate Header Line

        const reportLineHeader_Fields =  [
            'mod mass', 'mod type', 'scan number', 'scan filename', 'psm id', 'view psm link', 'search id', 'search name'
            ]

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            reportLineHeader_Fields.push( 'sub search label', 'sub search label from import' )
        }

        reportLineHeader_Fields.push( 'peptide sequence', 'peptide mod position', 'residue' )

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

            reportLineHeader_Fields.push( 'protein name', 'protein mod position' )
        }

        //  HEADER LINE
        reportLines.push( reportLineHeader_Fields.join( "\t" ) );
    }

    for ( const projectSearchId of projectSearchIds ) {

        const searchId = searchId_Map_Key_ProjectSearchId.get( projectSearchId )
        const searchName = searchNameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId )
        const peptideIds_For_MainFilters_Holder = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        const scanFileData_Holder_For_ProjectSearchId = scanFileData_Holder.get_For_ProjectSearchId( projectSearchId )
        const proteinInfo_For_MainFilters_Holder = proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

        searchIds_Array.push( searchId )

        //  Cache protein names string for ProteinSequenceVersionId
        const proteinNames_String_Output_Map_Key_ProteinSequenceVersionId: Map<number, string> = new Map()

        const inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId = ( proteinSequenceVersionId: number ) => {

            {
                const proteinNames_String_Output = proteinNames_String_Output_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
                if ( proteinNames_String_Output ) {
                    //  Return Cached computation
                    return proteinNames_String_Output  // EARLY RETURN
                }
            }

            const proteinInfo_For_ProteinSequenceVersionId = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId )
            if ( ! proteinInfo_For_ProteinSequenceVersionId ) {
                throw Error("proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId ) returned NOTHING for proteinSequenceVersionId: " + proteinSequenceVersionId )
            }

            const proteinAnnotation_Set: Set<string> = new Set()
            for ( const proteinAnnotation of proteinInfo_For_ProteinSequenceVersionId.annotations ) {
                proteinAnnotation_Set.add( proteinAnnotation.name )
            }

            const proteinAnnotation_Array_Sorted = Array.from( proteinAnnotation_Set ).sort()
            const proteinNames_String_Output = proteinAnnotation_Array_Sorted.join(",")

            proteinNames_String_Output_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNames_String_Output )

            return proteinNames_String_Output

        }  //  END OF Inline Function

        ///////////////

        let projectSearchId_Or_SubSearchId_Array: Array<number> = undefined

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            projectSearchId_Or_SubSearchId_Array = []

            for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                projectSearchId_Or_SubSearchId_Array.push( searchSubGroup.searchSubGroup_Id )
            }
        } else {
            //  NO Sub Searches so just create array of the projectSearchId being processed

            projectSearchId_Or_SubSearchId_Array = [ projectSearchId ]
        }

        for ( const projectSearchId_Or_SubSearchId_Entry of projectSearchId_Or_SubSearchId_Array ) {

            for ( const modMass_BeingProcessed of computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations.get_ModMass_Values_OrderedArray() ) {

                const data_ForSingle_ModMass = computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations.get_Data_For_ModMass( modMass_BeingProcessed )

                if ( ! data_ForSingle_ModMass ) {
                    //  NO Data for modMass_BeingProcessed so SKIP
                    continue  // EARLY CONTINUE
                }

                const data_For__ProjectSearchId_Or_SubSearchId = data_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId_Entry )

                if ( ! data_For__ProjectSearchId_Or_SubSearchId ) {
                    //  NO Data for ProjectSearchId_Or_SubSearchId so SKIP
                    continue  // EARLY CONTINUE
                }

                for ( const dataFor_SinglePsm of data_For__ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

                    const psmTblData = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData

                    const reportedPeptideId = psmTblData.reportedPeptideId;
                    const psmId = psmTblData.psmId;
                    const scanNumber = psmTblData.scanNumber;

                    const psmLink = _getViewScanLink({projectSearchId, psmId});

                    let scanFilename = 'not found'
                    {
                        if ( psmTblData.searchScanFileId !== undefined && psmTblData.searchScanFileId !== null ) {
                            const searchScanFileDataFor_SearchScanFileId = scanFileData_Holder_For_ProjectSearchId.get_SearchScanFileDataFor_SearchScanFileId( psmTblData.searchScanFileId )
                            if ( ! searchScanFileDataFor_SearchScanFileId ) {
                                const msg = "scanFileData_Holder_For_ProjectSearchId.get_SearchScanFileDataFor_SearchScanFileId( psmTblData.searchScanFileId ) returned NOTHING for psmTblData.searchScanFileId: " + psmTblData.searchScanFileId
                                console.warn(msg)
                                throw Error(msg)
                            }
                            scanFilename = searchScanFileDataFor_SearchScanFileId.filename
                        }
                    }

                    const peptideId_For_ReportedPeptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId )
                    const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId_For_ReportedPeptideId )

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

                            let positionLabel_InReportLine = modificationPosition.toString()

                            if ( psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.isNTerminal ) {

                                positionLabel_InReportLine = "n"

                            } else if ( psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.isCTerminal ) {

                                positionLabel_InReportLine = "c"
                            }

                            const modPositionInPeptide_OnlyNumeric_NO_n_c_term = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position
                            //  position is already 1 for 'n' term and peptideSequence.length for 'c' term

                            const residue = peptideSequence.substring( modPositionInPeptide_OnlyNumeric_NO_n_c_term - 1, modPositionInPeptide_OnlyNumeric_NO_n_c_term );


                            const modTypeLabel = 'variable'


                            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

                                //  YES all searches have Proteins so output WITH Proteins

                                //  Proteins are filtered on Protein Position Filter
                                const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                                    projectSearchId,
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

                                    const proteinNames_String_Output = inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId( proteinCoverageEntry.proteinSequenceVersionId )

                                    const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                        === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                        const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                        if ( ! searchSubGroup ) {
                                            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                        }

                                        reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                    }

                                    reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue, proteinNames_String_Output, modificationPosition_On_Protein )

                                    const reportLine_String = reportLine_Fields.join( "\t" );

                                    reportLines.push( reportLine_String );
                                }

                            } else {

                                //  NOT all searches have Proteins so output WITHOUT Proteins

                                const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                    === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                    const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                    if ( ! searchSubGroup ) {
                                        const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                    }

                                    reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                }

                                reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue )

                                const reportLine_String = reportLine_Fields.join( "\t" );

                                reportLines.push( reportLine_String );
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

                        let positionLabel_InReportLine = modificationPosition.toString()

                        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_N_Terminal ) {

                            positionLabel_InReportLine = "n"

                        } else if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_C_Terminal ) {

                            positionLabel_InReportLine = "c"
                        }

                        const modPositionInPeptide_OnlyNumeric_NO_n_c_term = variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position
                        //  position is already 1 for 'n' term and peptideSequence.length for 'c' term

                        const residue = peptideSequence.substring( modPositionInPeptide_OnlyNumeric_NO_n_c_term - 1, modPositionInPeptide_OnlyNumeric_NO_n_c_term );

                        const modTypeLabel = 'variable'

                        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

                            //  YES all searches have Proteins so output WITH Proteins

                            //  Proteins are filtered on Protein Position Filter
                            const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                                projectSearchId,
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

                                const proteinNames_String_Output = inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId( proteinCoverageEntry.proteinSequenceVersionId )

                                const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                    === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                    const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                    if ( ! searchSubGroup ) {
                                        const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                    }

                                    reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                }

                                reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue, proteinNames_String_Output, modificationPosition_On_Protein )

                                const reportLine_String = reportLine_Fields.join( "\t" );

                                reportLines.push( reportLine_String );
                            }

                        } else {

                            //  NOT all searches have Proteins so output WITHOUT Proteins

                            const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                            if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                if ( ! searchSubGroup ) {
                                    const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                }

                                reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                            }

                            reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue )

                            const reportLine_String = reportLine_Fields.join( "\t" );

                            reportLines.push( reportLine_String );
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

                                    let positionLabel_InReportLine = positionEntry.position.toString()
                                    let localization_PsmURL = positionEntry.position.toString()

                                    if ( positionEntry.isNTerminal ) {

                                        positionLabel_InReportLine = "n"
                                        localization_PsmURL = "n"

                                    } else if ( positionEntry.isCTerminal ) {

                                        positionLabel_InReportLine = "c"
                                        localization_PsmURL = "c"
                                    }

                                    //  Override 'psmLink' variable from parent code block
                                    const psmLink = _getViewScanLink( {
                                        projectSearchId,
                                        psmId,
                                        localization: localization_PsmURL
                                    } );

                                    const modPositionInPeptide_OnlyNumeric_NO_n_c_term = positionEntry.position
                                    //  position is already 1 for 'n' term and peptideSequence.length for 'c' term

                                    const residue = peptideSequence.substring( modPositionInPeptide_OnlyNumeric_NO_n_c_term - 1, modPositionInPeptide_OnlyNumeric_NO_n_c_term );

                                    const modTypeLabel = 'open'

                                    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

                                        //  YES all searches have Proteins so output WITH Proteins

                                        //  Proteins are filtered on Protein Position Filter
                                        const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                                            projectSearchId,
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

                                            const proteinNames_String_Output = inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId( proteinCoverageEntry.proteinSequenceVersionId )

                                            const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                            if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                                === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                                const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                                if ( ! searchSubGroup ) {
                                                    const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                                }

                                                reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                            }

                                            reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue, proteinNames_String_Output, modificationPosition_On_Protein )

                                            const reportLine_String = reportLine_Fields.join( "\t" );

                                            reportLines.push( reportLine_String );
                                        }

                                    } else {

                                        //  NOT all searches have Proteins so output WITHOUT Proteins

                                        const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                            const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                            if ( ! searchSubGroup ) {
                                                const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                            }

                                            reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                        }

                                        reportLine_Fields.push( peptideSequence, positionLabel_InReportLine, residue )

                                        const reportLine_String = reportLine_Fields.join( "\t" );

                                        reportLines.push( reportLine_String );
                                    }
                                }
                            }
                        } else {
                            // Unlocalized

                            const psmLink = _getViewScanLink( { projectSearchId, psmId } );

                            const modTypeLabel = 'open'

                            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ) {

                                //  YES all searches have Proteins so output WITH Proteins

                                //  Proteins are filtered on Protein Position Filter
                                const proteinCoverageEntries = getProteinCoverage_For_ReportedPeptideId_ProjectSearchId_FilteredOn_proteinPositionFilter_UserSelections_StateObject.get_ProteinCoverageEntries( {
                                    projectSearchId,
                                    reportedPeptideId
                                } )
                                if ( ! proteinCoverageEntries ) {
                                    //  NO proteinCoverageEntries.  May be due to filter on protein and position
                                    continue // EARLY CONTINUE
                                }

                                for ( const proteinCoverageEntry of proteinCoverageEntries ) {

                                    // const peptidePositionInProtein = proteinCoverageEntry.proteinStartPosition

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

                                                const selectRange_Start = selection_RangeEntry.proteinPosition_Start;
                                                const selectRange_End = selection_RangeEntry.proteinPosition_End;

                                                //  x1 <= y2 && y1 <= x2
                                                if ( selectRange_Start <= proteinCoverageEntry.proteinEndPosition && proteinCoverageEntry.proteinStartPosition <= selectRange_End ) { // coverage entry overlaps select range

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

                                    const proteinNames_String_Output = inlineFunction__Compute_proteinNames_String_Output_For_ProteinSequenceVersionId( proteinCoverageEntry.proteinSequenceVersionId )

                                    const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                        === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                        const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                        if ( ! searchSubGroup ) {
                                            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                            console.warn( msg )
                                            throw Error( msg )
                                        }

                                        reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                    }

                                    reportLine_Fields.push( peptideSequence, 'unlocalized', 'unlocalized', proteinNames_String_Output, 'unlocalized' )

                                    const reportLine_String = reportLine_Fields.join( "\t" );

                                    reportLines.push( reportLine_String );
                                }

                            } else {

                                //  NOT all searches have Proteins so output WITHOUT Proteins

                                const reportLine_Fields = [ modMass_BeingProcessed, modTypeLabel, scanNumber, scanFilename, psmId, psmLink, searchId, searchName ]

                                if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                                    === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                                    const searchSubGroup = searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry )
                                    if ( ! searchSubGroup ) {
                                        const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Map_Key_SearchSubGroupId.get( projectSearchId_Or_SubSearchId_Entry ) returned NOTHING"
                                        console.warn( msg )
                                        throw Error( msg )
                                    }

                                    reportLine_Fields.push( searchSubGroup.subgroupName_Display, searchSubGroup.searchSubgroupName_fromImportFile )
                                }

                                reportLine_Fields.push( peptideSequence, 'unlocalized', 'unlocalized' )

                                const reportLine_String = reportLine_Fields.join( "\t" );

                                reportLines.push( reportLine_String );
                            }
                        }
                    }
                }
            }
        }
    }

    reportLines.push( "" ) // Add so last line has '\n' at end

    let totalCharacterCountAllLines = 0;

    for ( const line of reportLines ) {
        totalCharacterCountAllLines += line.length + 1
    }

    console.log( "Total Character Count All Lines: " + totalCharacterCountAllLines.toLocaleString() )

    //  Tried to concatenate the strings in the array using this code instead of using the '.join(...)' but still fails for string too large for large strings

    // let downloadString_RepeatedlyConcatenate = ""
    //
    // for ( const line of reportLines ) {
    //     downloadString_RepeatedlyConcatenate += line + "\n"
    // }

    let downloadString: string

    try {

        downloadString = reportLines.join( "\n" )

    } catch ( e ) {

        const e_message = e.message

        window.alert( "Failed to create string to download.  Total character count is probably too large. Total Character Count All Lines: " + totalCharacterCountAllLines.toLocaleString() +"." )

        //  WAS when downloading all searches at once
        // window.alert( "Failed to create string to download.  Total character count is probably too large. Total Character Count All Lines: " + totalCharacterCountAllLines.toLocaleString() +".  Try changing to a few searches at a time to download." )

        const msg = "modPage_Download_PSM_Localization_Report(...): Failed to create string to download. Total Character Count All Lines: " + totalCharacterCountAllLines.toLocaleString() + ". Project Search Ids: " + projectSearchIds.join(",") + ", error msg: " + e_message

        console.warn(msg)

        throw Error( msg )
    }

    let download_Filename_SearchIdsLabel = "search"

    if ( searchIds_Array.length > 1 ) {
        download_Filename_SearchIdsLabel += "es"
    }

    const download_Filename = 'psm_modification_localization_report__' + download_Filename_SearchIdsLabel + "_" + searchIds_Array.join("_") + ".txt"

    StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: download_Filename } );
}


////////////////////

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


/**
 *
 * @param projectSearchId
 * @param psmId
 * @param localization
 */
const _getViewScanLink = function (
    {
        projectSearchId,
        psmId,
        localization
    } : {
        projectSearchId:number,
        psmId:number,
        localization?: OpenModPosition_DataType
    }
):string {

    const urlHref = window.location.href;
    const pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
    const urlBase = urlHref.split(pageControllerPath)[0];

    return urlBase + lorikeetSpectrumViewer_CreateURL({projectSearchId, psmId, openModPosition:localization, scanPeaks_MZ_That_PassFilters_Array__For_PsmId: undefined });
}
