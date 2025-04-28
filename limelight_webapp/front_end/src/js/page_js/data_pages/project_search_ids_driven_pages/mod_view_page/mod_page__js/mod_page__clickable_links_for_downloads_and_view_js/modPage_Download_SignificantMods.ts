/**
 * modPage_Download_SignificantMods.ts
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
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModPage_ModStatsUtils
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";

/**
 * User clicked on '[Download ZScore Report]'
 *
 *
 * From ModStatsUtils.downloadSignificantMods
 */
export const modPage_Download_SignificantMods = function (
    {
        projectSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
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

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

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

        _download_SignificantMods_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
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
        _download_SignificantMods_After_GetData({
            projectSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager
        })
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

////////////////

const _download_SignificantMods_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
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

    const outputLines_Array: Array<string> = []

    {  //  Header Line

        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        const outputLine_String = "search1\tsearch2\tmod mass\t" + quantTypeString + " count 1\t" + quantTypeString + " count 2\tz-score\tp-value";

        outputLines_Array.push( outputLine_String )
    }

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

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

                    const data_For_ModMass_FROM_computeData_For_ModMassViz_And_TopLevelTable_Result_Root = computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations.get_Data_For_ModMass( modMass )
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

                    pvalue = pvalue * computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_SkipRatioSkipTransformations.get_ModMass_Values_Set().size;

                    if (pvalue > 1) {
                        pvalue = 1;
                    }

                    const outputLine_String = searchNameForProjectSearchId_1 + "\t" +
                        searchNameForProjectSearchId_2 + "\t" +
                        modMass + "\t" +
                        x_1 + "\t" +
                        x_2 + "\t" +
                        zscore + "\t" +
                        pvalue

                    outputLines_Array.push( outputLine_String )
                }
            }
        }
    }

    outputLines_Array.push( "" ) // Add so last line has '\n' at end

    const downloadString = outputLines_Array.join("\n")

    StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: 'mod_pvalue_report.txt' } );
}
