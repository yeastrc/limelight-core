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
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";


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

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    const promises: Array<Promise<void>> = []

    {
        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable({
            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
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
            dataPageStateManager
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
            dataPageStateManager
        })
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


const _modPage_Download_SummaryStatistics_After_GetData = function (
    {
        projectSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager
    } : {
        projectSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager: DataPageStateManager
    }
) {

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

    const outputLines_Array: Array<string> = []

    const psmQuantType = (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )
    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    outputLines_Array.push( "# Search Id Key:" )

    {

        for ( const projectSearchId of projectSearchIds ) {
            const searchId = searchId_Map_Key_ProjectSearchId.get( projectSearchId )
            const outputLine = "#\t" + searchId + "\t" + modPage_GetSearchNameForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server: dataPageStateManager })

            outputLines_Array.push( outputLine )
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

        for ( const projectSearchId of projectSearchIds ) {

            const searchId = searchId_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! searchId ) {
                throw Error( "searchId_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            outputLine += "\tSearch:" + searchId + " " + quantTypeString + " " +
                ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() ===
                    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ? "count" : "ratio" );
        }
        outputLines_Array.push( outputLine )
    }

    {
        const sortedModMasses = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray()

        for (const modMass of sortedModMasses) {

            let outputLine = "" + modMass;

            for(const projectSearchId of projectSearchIds) {

                let x1 = 0

                const data_For_ModMass = computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass(modMass)
                if ( data_For_ModMass ) {
                    const dataFor__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                    if ( dataFor__ProjectSearchId_Or_SubSearchId ) {
                        x1 = dataFor__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                    }
                }

                outputLine += "\t" + x1;
            }

            outputLines_Array.push( outputLine )
        }
    }

    outputLines_Array.push( "" ) // Add so last line has '\n' at end

    const downloadString = outputLines_Array.join("\n")

    StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadString, filename: 'mod_summary_stats_report.txt' } );
}
