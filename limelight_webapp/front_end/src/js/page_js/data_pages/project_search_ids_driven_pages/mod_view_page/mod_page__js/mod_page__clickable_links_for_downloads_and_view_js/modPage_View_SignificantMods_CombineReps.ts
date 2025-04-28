/**
 * modPage_View_SignificantMods_CombineReps.ts
 */


import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModPage_ModStatsUtils
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils";
import {
    modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/mod_page__compute__total__psm_id__counts__per__project_search_id__or__sub_search_id__from__mod_view_page__compute_data__for__mod_mass_viz__and__top_level_table__result__root";
import {
    modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root";
import {
    ModPage_View_Replicate_ZScore_Report_Overlay_Params_TableRow,
    open_ModPage_View_Replicate_ZScore_Report_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_View_Replicate_ZScore_Report_Overlay";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";

/**
 * Assume first n/2 searches are 1 rep and the second n/2 searches are the second rep
 *
 * User clicked on '[View Replicate ZScore Report]'
 *
 * Copied from ModStatsUtils.viewSignificantMods_CombineReps
 */
export const modPage_View_SignificantMods_CombineReps = function (
    {
        projectSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager : DataPageStateManager
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) {

    // do nothing if it's not an even number of searches
    if ( projectSearchIds.length % 2 != 0 ) {
        console.log("Didn't get an even # of searches, doing nothing.");

        return;  // EARLY RETURN
    }

    /////////

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
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
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

        _modPage_View_SignificantMods_CombineReps_After_GetData({
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
        _modPage_View_SignificantMods_CombineReps_After_GetData({
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

const _modPage_View_SignificantMods_CombineReps_After_GetData = function (
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
    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    const resultsArray = new Array<{
        group0: string
        group1: string
        modMass: number
        count1: number
        count2: number
        zscore: number
        pvalue: any   //  No Typescript for result of jStat.ztest
        filteredZscore: number
        filteredPvalue: any   //  No Typescript for result of jStat.ztest
    }>();

    // const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

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


    const group_0_ProjectSearchIds = projectSearchIds.slice( 0, projectSearchIds.length / 2 )
    const group_1_ProjectSearchIds = projectSearchIds.slice( projectSearchIds.length / 2, projectSearchIds.length )

    const combinedModMap__GROUP_KEY_0 = 0
    const combinedModMap__GROUP_KEY_1 = 1

    // combine psm counts for reps into single row in new mod map
    const combinedModMap__PsmCount_Map_Key_Group_0_or_1_Map_Key_ModMass: Map<number, Map<number, number>> = new Map();

    if ( computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {
        throw Error( "CODE NOT HANDLE  ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId" )
    }

    for ( const result_ForSingle_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_OverrideRatioToGetCounts.get_Data_AllValues() ) {

        const combinedModMap__PsmCount_Map_Key_Group_0_or_1: Map<number, number> = new Map()

        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_0_ProjectSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Map_Key_Group_0_or_1.set( combinedModMap__GROUP_KEY_0, topLevelTable_DisplayValue_Summed )
        }
        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_1_ProjectSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Map_Key_Group_0_or_1.set( combinedModMap__GROUP_KEY_1, topLevelTable_DisplayValue_Summed )
        }

        combinedModMap__PsmCount_Map_Key_Group_0_or_1_Map_Key_ModMass.set( result_ForSingle_ModMass.modMass, combinedModMap__PsmCount_Map_Key_Group_0_or_1 )
    }

    // get combined total psm count for each rep group

    let psm_Or_Scan_Count_Group_0 = 0;
    let psm_Or_Scan_Count_Group_1 = 0;

    for ( const projectSearchId of group_0_ProjectSearchIds ) {

        let countForSearch: number = undefined

        if ( psmQuantType ) {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( countForSearch === undefined || countForSearch === null ){
                throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
            }
        } else {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId )
            if ( countForSearch === undefined || countForSearch === null ){
                throw Error( "In 'for ( const projectSearchId of group0 ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
            }
        }

        psm_Or_Scan_Count_Group_0 += countForSearch
    }

    for ( const projectSearchId of group_1_ProjectSearchIds ) {

        let countForSearch: number = undefined

        if ( psmQuantType ) {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                throw Error( "In 'for ( const projectSearchId of group_1_ProjectSearchIds ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( countForSearch === undefined || countForSearch === null ){
                throw Error( "In 'for ( const projectSearchId of group_1_ProjectSearchIds ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
            }
        } else {
            if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                throw Error( "In 'for ( const projectSearchId of group_1_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set " )
            }
            countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId )
            if ( countForSearch === undefined || countForSearch === null ){
                throw Error( "In 'for ( const projectSearchId of group_1_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId ) returned undefined or null for projectSearchId: " + projectSearchId )
            }
        }

        psm_Or_Scan_Count_Group_1 += countForSearch
    }

    // get combined filtered psm count for each rep group
    let filteredPsmCount0 = 0;
    let filteredPsmCount1 = 0;
    for ( const projectSearchId of group_0_ProjectSearchIds ) {
        const n = filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.get(projectSearchId);
        filteredPsmCount0 += n;
    }
    for ( const projectSearchId of group_1_ProjectSearchIds ) {
        const n = filteredCountMap_Key_ProjectSearchId_Or_SubSearchId.get(projectSearchId);
        filteredPsmCount1 += n;
    }

    const sortedModMasses = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray()

    for ( const modMass of sortedModMasses ) {

        let x1:number = combinedModMap__PsmCount_Map_Key_Group_0_or_1_Map_Key_ModMass.get(modMass).get(0); // modMap[modMass][projectSearchId1];
        if (x1 === undefined) {
            x1 = 0;
        }

        let x2:number = combinedModMap__PsmCount_Map_Key_Group_0_or_1_Map_Key_ModMass.get(modMass).get(1); // modMap[modMass][projectSearchId2];
        if (x2 === undefined) {
            x2 = 0;
        }

        let zscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({x1, n1:psm_Or_Scan_Count_Group_0, x2, n2:psm_Or_Scan_Count_Group_1});

        let pvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({x1, n1:psm_Or_Scan_Count_Group_0, x2, n2:psm_Or_Scan_Count_Group_1});
        pvalue = pvalue * sortedModMasses.length;
        if (pvalue > 1) {
            pvalue = 1;
        }

        let filteredZscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({x1, n1:filteredPsmCount0, x2, n2:filteredPsmCount1});

        let filteredPvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({x1, n1:filteredPsmCount0, x2, n2:filteredPsmCount1});
        filteredPvalue = filteredPvalue * sortedModMasses.length;
        if (filteredPvalue > 1) {
            filteredPvalue = 1;
        }

        // console.log('modMass', 'rep_group', 'n1', 'filteredn1', 'search2', 'n2', 'filteredn2', 'x1', 'x2', 'zscore', 'filteredZscore');
        // console.log(modMass, 0, psm_Or_Scan_Count_Group_0, filteredPsmCount0, 1, psm_Or_Scan_Count_Group_1, filteredPsmCount1, x1, x2, zscore, filteredZscore);

        let group_0_SearchIds_Display: string
        let group_1_SearchIds_Display: string

        {
            {
                const searchIds: Array<number> = []
                for ( const projectSearchId of group_0_ProjectSearchIds ) {
                    const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                    if ( ! searchData_For_ProjectSearchId ) {
                        throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                    }
                    searchIds.push( searchData_For_ProjectSearchId.searchId )
                }
                limelight__Sort_ArrayOfNumbers_SortArrayInPlace( searchIds )

                group_0_SearchIds_Display = searchIds.join(",")
            }
            {
                const searchIds: Array<number> = []
                for ( const projectSearchId of group_1_ProjectSearchIds ) {
                    const searchData_For_ProjectSearchId = dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                    if ( ! searchData_For_ProjectSearchId ) {
                        throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                    }
                    searchIds.push( searchData_For_ProjectSearchId.searchId )
                }
                limelight__Sort_ArrayOfNumbers_SortArrayInPlace( searchIds )

                group_1_SearchIds_Display = searchIds.join(",")
            }
        }

        const ob = {
            group0: group_0_SearchIds_Display,
            group1: group_1_SearchIds_Display,
            modMass:modMass,
            count1:x1,
            count2:x2,
            zscore:zscore,
            pvalue:pvalue,
            filteredZscore:filteredZscore,
            filteredPvalue:filteredPvalue
        };

        resultsArray.push(ob);
    }

    // sort on the magnitude of the zscore (asc) first, then p-value (desc) second
    resultsArray.sort(function(a,b) {

        if(Math.abs(a.zscore) > Math.abs(b.zscore)) {
            return -1;
        }

        if(Math.abs(a.zscore) < Math.abs(b.zscore)) {
            return 1;
        }

        return a.pvalue - b.pvalue;
    });

    //  Create Table and open overlay

    const tableRows: Array<ModPage_View_Replicate_ZScore_Report_Overlay_Params_TableRow> = []

    {
        // assemble the table rows
        let rank = 1;
        for ( const ob of resultsArray ) {
            const tableRow: ModPage_View_Replicate_ZScore_Report_Overlay_Params_TableRow = {
                group0: ob.group0,
                group1: ob.group1,
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

        open_ModPage_View_Replicate_ZScore_Report_Overlay({ tableRows, quantTypeString })
    }
}
