/**
 * modPage_Download_SummaryStatistics.ts
 */

import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    DataPageStateManager,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    SearchSubGroup_CentralStateManagerObjectClass
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";


/**
 *
 * @param projectSearchIds
 * @param modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 * @param dataPageStateManager
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
export const modPage_Download_SummaryStatistics = function (
    {
        projectSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    } : {
        projectSearchIds : Array<number>
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    }
) {

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root


    const promises: Array<Promise<void>> = []

    {
        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable({
            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        } )

        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data ) {

            computeData_For_ModMassViz_And_TopLevelTable_Result_Root = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data

        } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.catch(reason => { reject(reason)})
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.then(value => { try {
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error( "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result no 'data' or 'promise" )
        }
    }

    if ( promises.length === 0 ) {

        _modPage_Download_SummaryStatistics_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })

        return  // EARLY RETURN
    }

    const promisesAll = Promise.all(promises)

    promisesAll.catch(reason => {  })
    promisesAll.then(novalue => { try {
        _modPage_Download_SummaryStatistics_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


const _modPage_Download_SummaryStatistics_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
) {

    let projectSearchId_WhenHaveSingleSearchSubGroups: number = undefined

    const search_Id_NameDisplayString_Map_Key_ProjectSearchId: Map<number,{
        searchNameDisplay: string
        searchId: number
    } > = new Map()

    const searchSubGroups_InOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = []

    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        if ( projectSearchIds.length !== 1 ) {
            const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
            console.warn(msg)
            throw Error(msg)
        }

        const projectSearchId = projectSearchIds[ 0 ]

        projectSearchId_WhenHaveSingleSearchSubGroups = projectSearchId

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
        }

    } else {
        for ( const projectSearchId of projectSearchIds ) {

            const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                projectSearchId, dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
            } )

            const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            search_Id_NameDisplayString_Map_Key_ProjectSearchId.set( projectSearchId, {
                searchNameDisplay: searchNameForProjectSearchId,
                searchId: searchData_For_ProjectSearchId.searchId
            } )
        }
    }

    const outputLines_Array: Array<string> = []

    const psmQuantType = (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )
    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    {
        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            outputLines_Array.push( "# Search Sub Group Key:" )

            for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                const outputLine = "#\t" + searchSubGroup.subgroupName_Display + "\t" + searchSubGroup.searchSubgroupName_fromImportFile

                outputLines_Array.push( outputLine )
            }

        } else {

            outputLines_Array.push( "# Search Id Key:" )

            for ( const projectSearchId of projectSearchIds ) {

                const search_Id_NameDisplayString = search_Id_NameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId )
                const outputLine = "#\t" + search_Id_NameDisplayString.searchId + "\t" + search_Id_NameDisplayString.searchNameDisplay

                outputLines_Array.push( outputLine )
            }
        }

        const outputLine = "#";

        outputLines_Array.push( outputLine )
    }
    {
        const outputLine = "# Data transformation: " + modPage_Get_DataTransformationType_DisplayLabel({ modViewPage_DataVizOptions_VizSelections_PageStateManager })

        outputLines_Array.push( outputLine )
    }

    outputLines_Array.push( "" )    // Blank Line

    { //  Header

        let outputLine = "mod mass";

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                outputLine += "\tSub Search:" + searchSubGroup.subgroupName_Display + " " + quantTypeString + " " +
                    ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() ===
                    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ? "count" : "ratio" );
            }

        } else {

            for ( const projectSearchId of projectSearchIds ) {

                const search_Id_NameDisplayString = search_Id_NameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId )
                if ( ! search_Id_NameDisplayString ) {
                    throw Error( "search_Id_NameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                outputLine += "\tSearch:" + search_Id_NameDisplayString.searchId + " " + quantTypeString + " " +
                    ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() ===
                    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ? "count" : "ratio" );
            }
        }

        outputLines_Array.push( outputLine )
    }

    {
        const sortedModMasses = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray()

        for (const modMass of sortedModMasses) {

            let outputLine = "" + modMass;

            if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum
                === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                for ( const searchSubGroup of searchSubGroups_InOrder_Filtered ) {

                    let x1 = 0

                    const data_For_ModMass = computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )
                    if ( data_For_ModMass ) {
                        const dataFor__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( searchSubGroup.searchSubGroup_Id )
                        if ( dataFor__ProjectSearchId_Or_SubSearchId ) {
                            x1 = dataFor__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                        }
                    }

                    outputLine += "\t" + x1;
                }

            } else {

                for ( const projectSearchId of projectSearchIds ) {

                    let x1 = 0

                    const data_For_ModMass = computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )
                    if ( data_For_ModMass ) {
                        const dataFor__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                        if ( dataFor__ProjectSearchId_Or_SubSearchId ) {
                            x1 = dataFor__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                        }
                    }

                    outputLine += "\t" + x1;
                }
            }

            outputLines_Array.push( outputLine )
        }
    }

    outputLines_Array.push( "" ) // Add so last line has '\n' at end

    const downloadString = outputLines_Array.join("\n")

    StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: 'mod_summary_stats_report.txt' } );
}
