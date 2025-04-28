/**
 * modPage_View_SignificantMods.ts
 */


import {
    ModPage_View_ZScore_Report_Overlay_Params_TableRow,
    open_ModPage_View_ZScore_Report_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_View_ZScore_Report_Overlay";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModPage_ModStatsUtils
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import {
    modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/mod_page__compute__total__psm_id__counts__per__project_search_id__or__sub_search_id__from__mod_view_page__compute_data__for__mod_mass_viz__and__top_level_table__result__root";
import {
    modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";

/**
 * User clicked on '[View ZScore Report]'
 *
 * Copied from ModStatsUtils.viewSignificantMods
 */
export const modPage_View_SignificantMods = function (
    {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        projectSearchIds,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    } : {
        projectSearchIds : Array<number>
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager : DataPageStateManager
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    }
) {

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    //  ONLY for PSM Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result

    //  ONLY for Scans Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result

    const promises: Array<Promise<void>> = []

    {
        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable(
            {
                override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: true,
                override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: true,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                modViewPage_DataVizOptions_VizSelections_PageStateManager,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass  // Used for Ratios
            } )

        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data ) {

            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data

        } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.catch(reason => { reject(reason)})
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.then(value => { try {
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error( "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result no 'data' or 'promise" )
        }
    }

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

        //  PSM Quant is Ratio AND QuantType is PSMs.  Need Total PSM Count per Project SearchId

        {
            const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

            const getScanCount_For_ProjectSearchIds_Result =
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds )

            if ( getScanCount_For_ProjectSearchIds_Result.data ) {
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = getScanCount_For_ProjectSearchIds_Result.data
            } else if ( getScanCount_For_ProjectSearchIds_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    getScanCount_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                    getScanCount_For_ProjectSearchIds_Result.promise.then(value => { try {
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = value
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error("getScanCount_For_ProjectSearchIds_Result no 'data' or 'promise'")
            }
        }

    } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

        //  PSM Quant is Ratio AND QuantType is Scans.  Need Total Scan Count per Project SearchId for computing Total Count of: Scan Number / Search Scan File Id Pair Count

        const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

        const getScanCount_For_ProjectSearchIds_Result =
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds )

        if ( getScanCount_For_ProjectSearchIds_Result.data ) {
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = getScanCount_For_ProjectSearchIds_Result.data
        } else if ( getScanCount_For_ProjectSearchIds_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                getScanCount_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                getScanCount_For_ProjectSearchIds_Result.promise.then(value => { try {
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error("getScanCount_For_ProjectSearchIds_Result no 'data' or 'promise'")
        }
    }

    if ( promises.length === 0 ) {

        _modPage_View_SignificantMods_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager
        })

        return  // EARLY RETURN
    }

    const promisesAll = Promise.all(promises)

    promisesAll.catch(reason => {  })
    promisesAll.then(novalue => { try {
        _modPage_View_SignificantMods_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager
        })
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

////////////////

const _modPage_View_SignificantMods_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager: DataPageStateManager
    }
) {

    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
        ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        const msg = "_download_SignificantMods_After_GetData(...): SubSearchId NOT Processed"
        console.warn(msg)
        window.alert(msg)
        throw Error(msg)
    }

    const psmQuantType = (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )

    const searchNameDisplayString_Map_Key_ProjectSearchId: Map<number, string> = new Map()

    for ( const projectSearchId of projectSearchIds ) {
        const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
            projectSearchId, dataPageStateManager_DataFrom_Server: dataPageStateManager
        } )
        searchNameDisplayString_Map_Key_ProjectSearchId.set( projectSearchId, searchNameForProjectSearchId )
    }

    const searchId_Map_Key_ProjectSearchId: Map<number, number> = new Map()

    for ( const projectSearchId of projectSearchIds ) {
        const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
        if ( ! searchData_For_ProjectSearchId ) {
            throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        searchId_Map_Key_ProjectSearchId.set( projectSearchId, searchData_For_ProjectSearchId.searchId )
    }

    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    const resultsArray = new Array<{
        name1: string
        name2: string
        search1: number
        search2: number
        modMass: number
        count1: number
        count2: number
        zscore: number
        pvalue: any   //  No Typescript for result of jStat.ztest
        filteredZscore: number
        filteredPvalue: any   //  No Typescript for result of jStat.ztest
    }>();

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    let filteredCountMap_Key_ProjectSearchId_Or_SubSearchId: Map<number, number> = undefined

    {
        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSMs  quantType

            filteredCountMap_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {
                filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.uniquePsmIdCount_AcrossAllModMasses
                )
            }

        } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  Scans  quantType

            filteredCountMap_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_Scan_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {
                filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses
                )
            }

        } else {
            throw Error("modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() is NOT 'psms' or 'scans'" )
        }
    }

    for ( let projectSearchIds_Index_OuterLoop = 0; projectSearchIds_Index_OuterLoop < projectSearchIds.length; projectSearchIds_Index_OuterLoop++ ) {

        const projectSearchId_1 = projectSearchIds[ projectSearchIds_Index_OuterLoop ];

        // skip this search if we have selected data and none of it includes this project search id
        if ( modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() && !( modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_1 ) ) ) {
            continue;
        }

        const searchNameForProjectSearchId_1 = searchNameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId_1 )
        if ( ! searchNameForProjectSearchId_1 ) {
            throw Error( "searchNameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId_1 ) returned NOTHING for projectSearchId_1: " + projectSearchId_1 )
        }

        const searchId_For_ProjectSearchId_1 = searchId_Map_Key_ProjectSearchId.get( projectSearchId_1 )
        if ( ! searchId_For_ProjectSearchId_1 ) {
            throw Error( "searchId_Map_Key_ProjectSearchId.get( projectSearchId_1 ) returned NOTHING for projectSearchId_1: " + projectSearchId_1 )
        }

        let countForSearch_1: number = undefined

        if ( psmQuantType ) {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                throw Error( "after 'const projectSearchId_1': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch_1 = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_1 )
            if ( countForSearch_1 === undefined || countForSearch_1 === null ){
                throw Error( "After 'const projectSearchId_1': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_1 ) returned undefined or null for projectSearchId_1: " + projectSearchId_1 )
            }
        } else {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                throw Error( "After 'const projectSearchId_1': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch_1 = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_1 )
            if ( countForSearch_1 === undefined || countForSearch_1 === null ){
                throw Error( "After 'const projectSearchId_1': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_1 ) returned undefined or null for projectSearchId_1: " + projectSearchId_1 )
            }
        }

        const filtered_n_1 = filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_1 );

        for ( let projectSearchIds_Index_InnerLoop = 0; projectSearchIds_Index_InnerLoop < projectSearchIds.length; projectSearchIds_Index_InnerLoop++ ) {

            if ( projectSearchIds_Index_OuterLoop < projectSearchIds_Index_InnerLoop ) {

                const projectSearchId_2 = projectSearchIds[ projectSearchIds_Index_InnerLoop ];

                // skip this search if we have selected data and none of it includes this project search id
                if ( modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() && !( modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_2 ) ) ) {
                    continue;
                }

                const searchNameForProjectSearchId_2 = searchNameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId_2 )
                if ( ! searchNameForProjectSearchId_2 ) {
                    throw Error( "searchNameDisplayString_Map_Key_ProjectSearchId.get( projectSearchId_1 ) returned NOTHING for projectSearchId_2: " + projectSearchId_2 )
                }

                const searchId_For_ProjectSearchId_2 = searchId_Map_Key_ProjectSearchId.get( projectSearchId_2 )
                if ( ! searchId_For_ProjectSearchId_2 ) {
                    throw Error( "searchId_Map_Key_ProjectSearchId.get( projectSearchId_2 ) returned NOTHING for projectSearchId_2: " + projectSearchId_2 )
                }

                let countForSearch_2 = undefined

                if ( psmQuantType ) {
                    if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                        throw Error( "After 'const projectSearchId_2': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set " )
                    }
                    countForSearch_2 = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_2 )
                    if ( countForSearch_2 === undefined || countForSearch_2 === null ){
                        throw Error( "After 'const projectSearchId_2': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_2 ) returned undefined or null for projectSearchId_2: " + projectSearchId_2 )
                    }
                } else {
                    if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                        throw Error( "After 'const projectSearchId_2': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set " )
                    }
                    countForSearch_2 = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_2 )
                    if ( countForSearch_2 === undefined || countForSearch_2 === null ){
                        throw Error( "after 'const projectSearchId_2': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_2 ) returned undefined or null for projectSearchId_2: " + projectSearchId_2 )
                    }
                }

                const filtered_n_2 = filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_2 );

                for ( const modMass of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray() ) {

                    // if we have selected data and it doesn't include this combination of mod mass for both project search ids, skip it

                    if ( modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) {

                        const selectedModMasses_Set_For_ProjectSearchId_1 = modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_1 )
                        const selectedModMasses_Set_For_ProjectSearchId_2 = modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId_2 )

                        if ( ( ! selectedModMasses_Set_For_ProjectSearchId_1 ) || ( ! selectedModMasses_Set_For_ProjectSearchId_2 ) ) {
                            //  Checked above but check here
                            continue
                        }
                        if ( ( ! selectedModMasses_Set_For_ProjectSearchId_1.has( modMass ) || ( ! selectedModMasses_Set_For_ProjectSearchId_2.has( modMass ) ) ) ) {
                            continue
                        }
                    }

                    const data_For_ModMass_FROM_computeData_For_ModMassViz_And_TopLevelTable_Result_Root = computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts.get_Data_For_ModMass( modMass )
                    if ( ! data_For_ModMass_FROM_computeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {
                        throw Error("computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass ) returned NOTHING for modMass: " + modMass )
                    }

                    let x_1 = 0
                    {
                        const dataFor_ProjectSearchId_1 = data_For_ModMass_FROM_computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_1 )
                        if ( dataFor_ProjectSearchId_1 ) {
                            x_1 = dataFor_ProjectSearchId_1.topLevelTable_DisplayValue
                        }
                    }

                    let x_2 = 0
                    {
                        const dataFor_ProjectSearchId_2 = data_For_ModMass_FROM_computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_2 )
                        if ( dataFor_ProjectSearchId_2 ) {
                            x_2 = dataFor_ProjectSearchId_2.topLevelTable_DisplayValue
                        }
                    }

                    let zscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({x1: x_1, n1: countForSearch_1, x2: x_2, n2: countForSearch_2});

                    let pvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({x1: x_1, n1: countForSearch_1, x2: x_2, n2: countForSearch_2});

                    pvalue = pvalue * computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts.get_ModMass_Values_Set().size;

                    if (pvalue > 1) {
                        pvalue = 1;
                    }

                    let filteredZscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({x1: x_1, n1:filtered_n_1, x2: x_2, n2:filtered_n_2});

                    let filteredPvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({x1: x_1, n1:filtered_n_1, x2: x_2, n2:filtered_n_2});
                    filteredPvalue = filteredPvalue * computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts.get_ModMass_Values_Set().size;
                    if (filteredPvalue > 1) {
                        filteredPvalue = 1;
                    }

                    // console.log('modMass', 'search1', 'n1', 'filteredn1', 'search2', 'n2', 'filteredn2', 'x1', 'x2', 'zscore', 'filteredZscore');
                    // console.log(modMass, projectSearchId_1, n_1, filteredn_1, projectSearchId_2, n_2, filteredn2, x_1, x_2, zscore, filteredZscore);

                    const ob = {
                        name1: searchNameForProjectSearchId_1,
                        name2: searchNameForProjectSearchId_2,
                        search1: searchId_For_ProjectSearchId_1,
                        search2: searchId_For_ProjectSearchId_2,
                        modMass: modMass,
                        count1: x_1,
                        count2: x_2,
                        zscore: zscore,
                        pvalue: pvalue,
                        filteredZscore: filteredZscore,
                        filteredPvalue: filteredPvalue
                    };

                    resultsArray.push(ob);
                }
            }
        }
    }

    // sort on the magnitude of the zscore (asc) first, then p-value (desc) second
    resultsArray.sort(function(a,b) {

        const a_Zscore_Abs = Math.abs(a.zscore)
        const b_Zscore_Abs = Math.abs(b.zscore)

        if ( a_Zscore_Abs > b_Zscore_Abs ) {
            return -1;
        }

        if ( a_Zscore_Abs < b_Zscore_Abs ) {
            return 1;
        }

        return a.pvalue - b.pvalue;
    });


    //  Create Table and open overlay

    const tableRows: Array<ModPage_View_ZScore_Report_Overlay_Params_TableRow> = []

    {
        // assemble the table rows
        let rank = 1;
        for ( const ob of resultsArray ) {
            const tableRow: ModPage_View_ZScore_Report_Overlay_Params_TableRow = {
                search1: ob.search1,
                search2: ob.search2,
                modMass: ob.modMass,
                count1: ob.count1,
                count2: ob.count2,
                zscore: ob.zscore,
                pvalue: ob.pvalue,
                filteredZscore: ob.filteredZscore,
                filteredPvalue: ob.filteredPvalue,
                rank
            }

            tableRows.push( tableRow )

            rank++;
        }

        open_ModPage_View_ZScore_Report_Overlay({ tableRows, quantTypeString })
    }
}
