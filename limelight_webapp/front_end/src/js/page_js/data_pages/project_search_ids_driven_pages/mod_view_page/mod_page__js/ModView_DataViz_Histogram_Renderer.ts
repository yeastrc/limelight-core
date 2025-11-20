/**
 * ModView_DataViz_Histogram_Renderer.ts
 */
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import Plotly, { Layout } from "plotly.js-dist-min";
import {
    qcPage_StandardChartConfig
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    QcViewPage__ComputeColorsForCategories
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls
} from "page_js/common_all_pages/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls";


///////



const _CHART_WIDTH = 1200
const _CHART_HEIGHT = 600

const _CHART_HEIGHT_ADDITION_PER_TRACE = 200   //  Add height of 200 px per added trace.  Arbitrary amount.  TODO  Determine exactly how much to add.


const _MAX_BIN_COUNT = 200

const _CHART__MEAN_LINE__COLOR = 'violet' // 'rgba(255, 0, 0, 0.991)', // chart_Color,  // Color of the bar itself: If not populated, ALL the bars for this element in array 'chart_Data' are the same color



//  Saved data between Plotly Plot renders.  Save here since this file contains a function instead of an object.

let saved_Chart_Layout__dragmode: any = undefined // user change of dragmode saved so can be set on next render of plot.  Very helpful when dragmode is pan and user is repeatedly using pan

/////

/**
 *
 * @param data_viz_Histogram_container_DOMElement
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 * @param projectSearchIds_Or_SubSearchIds_For_DisplayOrder
 * @param projectSearchId_WhenHaveSingleSearchSubGroups
 * @param modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
 * @param all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 * @param dataPageStateManager_DataFrom_Server
 * @param updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
 */
export const modView_DataViz_Histogram_Renderer = function (
    {
        displaying_Mean_StandardDeviation,

        show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count,

        data_viz_Histogram_container_DOMElement,

        data_viz_Histogram_Difference_Plot_container_DOMElement,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
        projectSearchId_WhenHaveSingleSearchSubGroups,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        dataPageStateManager_DataFrom_Server,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        displaying_Mean_StandardDeviation: boolean

        show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count: boolean

        data_viz_Histogram_container_DOMElement: HTMLDivElement

        data_viz_Histogram_Difference_Plot_container_DOMElement: HTMLDivElement

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>
        projectSearchId_WhenHaveSingleSearchSubGroups: number
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        dataPageStateManager_DataFrom_Server :  DataPageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void

    }) { try {

    // console.log('called modView_DataViz_Histogram_Renderer()');

    const sortedModMasses = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses
    const sortedModsToDisplay = _getSortedModsToDisplay( {
        sortedModMasses,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } );

    const modMass_MinMax_NOT_SET: number = undefined
    let modMass_ActualData_Min = modMass_MinMax_NOT_SET
    let modMass_ActualData_Max = modMass_MinMax_NOT_SET

    const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId: Map<number,
        {
            projectSearchId_ForUseWhereRequire_projectSearchId: number
            psmIds_Or_ScanData_Set__Map_Key_ModMassExact: Map<number, Set< number | string >>
        }
    > = new Map()

    {

        const process_ModMass_Value_And_PSM_MainProcessing_Fcn = (
            {
                modMass, dataFor_SinglePsm, psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId
            } : {
                modMass: number,
                dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm,
                psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId: Map<number, Set<string | number>>
            }
        ) => {

            if ( modMass_ActualData_Min === modMass_MinMax_NOT_SET ) {

                modMass_ActualData_Min = modMass
            } else {
                if ( modMass_ActualData_Min > modMass ) {
                    modMass_ActualData_Min = modMass
                }
            }
            if ( modMass_ActualData_Max === modMass_MinMax_NOT_SET ) {

                modMass_ActualData_Max = modMass
            } else {
                if ( modMass_ActualData_Max < modMass ) {
                    modMass_ActualData_Max = modMass
                }
            }

            let psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId = psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId.get( modMass )
            if ( ! psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId ) {
                psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId = new Set()
                psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId.set( modMass, psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId )
            }


            if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

                // psmIds_Or_ScanData_Set.add( dataFor_SinglePsm.psmId )
                psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId.add( dataFor_SinglePsm.psmId )


            } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

                const psmTblData = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData
                const scanId = psmTblData.scanNumber + "_" + psmTblData.searchScanFileId

                // psmIds_Or_ScanData_Set.add( scanId )
                psmIds_Or_ScanData_Set__ProjectSearchId_Or_SearchSubGroupId.add( scanId )

            } else {

                const msg = "modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() IS NOT ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms OR ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans.  modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() IS: " + modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
                console.warn( msg )
                throw Error( msg )
            }
        }

        const _GROUP_ID_1 = 1
        const _GROUP_ID_2 = 2

        for ( const modMass of sortedModsToDisplay ) {

            const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )

            if ( ! data_For_ModMass ) {
                continue  // EARLY CONTINUE
            }

            for ( const modMass_Data_AllValues_Entry of data_For_ModMass.get_Data_AllValues() ) {

                let projectSearchId_Or_SubSearchId_Or_GroupId = modMass_Data_AllValues_Entry.projectSearchId_Or_SubSearchId  // Initialize to projectSearchId_Or_SubSearchId

                {
                    const projectSearchId_Or_SubSearchId = modMass_Data_AllValues_Entry.projectSearchId_Or_SubSearchId

                    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

                        const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

                        if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {

                            projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_1

                        } else if ( searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {

                            projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_2
                        }

                        // if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId ) {
                        //
                        //     if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                        //
                        //         projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_1
                        //
                        //     } else if ( searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                        //
                        //         projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_2
                        //     }
                        //
                        // } else {
                        //
                        //     if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                        //
                        //         projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_1
                        //
                        //     } else if ( searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                        //
                        //         projectSearchId_Or_SubSearchId_Or_GroupId = _GROUP_ID_2
                        //     }
                        // }
                    }
                }


                let psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId =
                    psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.get( projectSearchId_Or_SubSearchId_Or_GroupId )
                if ( ! psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId ) {
                    psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId = {
                        projectSearchId_ForUseWhereRequire_projectSearchId: modMass_Data_AllValues_Entry.projectSearchId_ForUseWhereRequire_projectSearchId,
                        psmIds_Or_ScanData_Set__Map_Key_ModMassExact: new Map()
                    }
                    psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.set(
                        projectSearchId_Or_SubSearchId_Or_GroupId, psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId
                    )
                }


                const dataPage_common_Flags_SingleSearch_ForProjectSearchId =
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.
                    get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( modMass_Data_AllValues_Entry.projectSearchId_ForUseWhereRequire_projectSearchId )


                for ( const dataFor_SinglePsm of modMass_Data_AllValues_Entry.get_DataFor_SinglePsm_All() ) {

                    if ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) {

                        for ( const entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

                            process_ModMass_Value_And_PSM_MainProcessing_Fcn( {
                                modMass: entry.psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.modificationMass,
                                dataFor_SinglePsm,
                                psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId: psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact
                            })
                        }

                    } else {
                        for ( const entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries() ) {

                            process_ModMass_Value_And_PSM_MainProcessing_Fcn( {
                                modMass: entry.variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.mass,
                                dataFor_SinglePsm,
                                psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId: psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact
                            })
                        }
                    }

                    for ( const entry of dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entries() ) {

                        //  Remove since Open Mods already filtered for this

                        // if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                        //
                        //     const massRounded = Math.round( entry.psmOpenModificationForPsmId.openModificationMass )
                        //
                        //     if ( massRounded === 0 ) {
                        //         continue  // EARLY CONTINUE
                        //     }
                        // }
                        process_ModMass_Value_And_PSM_MainProcessing_Fcn( {
                            modMass: entry.psmOpenModificationForPsmId.openModificationMass,
                            dataFor_SinglePsm,
                            psmIds_Or_ScanData_Set__Map_Key_ModMassExact__For__ProjectSearchId_Or_SearchSubGroupId: psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact
                        })
                    }
                }
            }
        }
    }

    //////////

    let modMass_ChartDisplayRange_Min = modMass_ActualData_Min
    let modMass_ChartDisplayRange_Max = modMass_ActualData_Max

    {
        const modMassCutoffMin_UserSelection = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
        if ( modMassCutoffMin_UserSelection !== undefined ) {

            modMass_ChartDisplayRange_Min = modMassCutoffMin_UserSelection
        }
    }
    {
        const modMassCutoffMax_UserSelection = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
        if ( modMassCutoffMax_UserSelection !== undefined ) {

            modMass_ChartDisplayRange_Max = modMassCutoffMax_UserSelection
        }
    }

    // console.log( "Mod Mass Min/Max \n modMass_ActualData_Min: " + modMass_ActualData_Min + "\n modMass_ActualData_Max: " + modMass_ActualData_Max + "\n modMass_ChartDisplayRange_Min: " + modMass_ChartDisplayRange_Min + "\n modMass_ChartDisplayRange_Max: " + modMass_ChartDisplayRange_Max )

    let binSize: number = undefined

    /**
     * binCount
     */
    let binCount: number = undefined

    /**
     * Special case where data min equal data max OR bin count exceeded max bin count so using max bin count
     */
    let binningOverride_Using_Display_MinMax = false


    {  //  Compute binSize

        let numberOfDataPoints_ForBinning = 0

        for ( const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Value of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.values() ) {

            let numberOfDataPoints_ForSearchOrSubSearch = 0

            for ( const psmIds_Or_ScanData_Set of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Value.psmIds_Or_ScanData_Set__Map_Key_ModMassExact.values() ) {
                numberOfDataPoints_ForSearchOrSubSearch += psmIds_Or_ScanData_Set.size
            }

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT ) {

                //  All merged plot so add
                numberOfDataPoints_ForBinning += numberOfDataPoints_ForSearchOrSubSearch

            } else {

                //  NOT All merged plot so take Max
                if ( numberOfDataPoints_ForBinning < numberOfDataPoints_ForSearchOrSubSearch ) {
                    numberOfDataPoints_ForBinning = numberOfDataPoints_ForSearchOrSubSearch
                }
            }
        }

        // Calculate the square root of the number of data points
        const sqrtDataPoints = Math.sqrt( numberOfDataPoints_ForBinning )

        const sqrtDataPoints_Ceil_Min_1 = Math.max( 1, Math.ceil( sqrtDataPoints ) )  //  Minimum of 1.

        // Calculate the width of the display range and data range

        if ( modMass_ActualData_Min === modMass_ActualData_Max ) {

            // Handle edge case where Min === Max

            binningOverride_Using_Display_MinMax = true

            binCount = sqrtDataPoints_Ceil_Min_1

            if ( binCount > _MAX_BIN_COUNT ) {
                binCount = _MAX_BIN_COUNT
            }

            if (  modMass_ChartDisplayRange_Min === modMass_ChartDisplayRange_Max ) {

                // TODO Hack to make a very narrow bin and single bin so rest of code below works

                modMass_ChartDisplayRange_Min =  modMass_ChartDisplayRange_Min - 0.000001
                modMass_ChartDisplayRange_Max =  modMass_ChartDisplayRange_Max + 0.000001

                binCount = 1
            }

            binSize = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) / binCount

            if ( binSize === 0 ) {
                binSize = 1  //  TODO Should not get here.  Hack
            }

        } else {

            //  Main Processing where NOT Min === Max

            const data_NumberOfBins = sqrtDataPoints_Ceil_Min_1

            binSize = ( modMass_ActualData_Max - modMass_ActualData_Min ) / data_NumberOfBins

            binCount = data_NumberOfBins

            //  Number of bins for whole display area using binSize
            const numberOfBins_ForDisplay_MinMax = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) / binSize

            if ( numberOfBins_ForDisplay_MinMax > _MAX_BIN_COUNT ) {

                //  Recompute binSize with bin count of _MAX_BIN_COUNT

                binningOverride_Using_Display_MinMax = true

                binSize = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) / _MAX_BIN_COUNT

                binCount = _MAX_BIN_COUNT
            }
        }
    }

    //  Put Mod Mass Entries into bins

    const psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId: Map<number,
        {
            projectSearchId_ForUseWhereRequire_projectSearchId: number
            psmIds_Or_ScanData_Set__Map_Key_BinIndex: Map<number, Set< number | string >>
        }
    > = new Map()

    {
        for ( const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_MapEntry of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.entries() ) {

            const projectSearchId_Or_SearchSubGroupId_Or_GroupId = psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_MapEntry[ 0 ]
            const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Value = psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_MapEntry[ 1 ]

            for ( const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_MapEntry of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Value.psmIds_Or_ScanData_Set__Map_Key_ModMassExact.entries() ) {

                const modMassExact = psmIds_Or_ScanData_Set__Map_Key_ModMassExact_MapEntry[ 0 ]
                const psmIds_Or_ScanData_Set__For__ModMassExact = psmIds_Or_ScanData_Set__Map_Key_ModMassExact_MapEntry[ 1 ]

                let modMass_Min_ForBinning = modMass_ActualData_Min

                if ( binningOverride_Using_Display_MinMax ) {
                    //  Special binning since ( modMass_ActualData_Min === modMass_ActualData_Max )
                    modMass_Min_ForBinning = modMass_ChartDisplayRange_Min
                }

                let binIndex = Math.floor( ( modMassExact - modMass_Min_ForBinning ) / binSize )

                if ( binIndex >= binCount ) {
                    binIndex = binCount - 1
                }

                let psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.get( projectSearchId_Or_SearchSubGroupId_Or_GroupId )
                if ( ! psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId ) {
                    psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId =
                        {
                            projectSearchId_ForUseWhereRequire_projectSearchId: psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Value.projectSearchId_ForUseWhereRequire_projectSearchId,
                            psmIds_Or_ScanData_Set__Map_Key_BinIndex: new Map()
                        }
                    psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.set( projectSearchId_Or_SearchSubGroupId_Or_GroupId, psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId )
                }

                let psmIds_Or_ScanData_Set__For__BinIndex = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_BinIndex.get( binIndex )
                if ( ! psmIds_Or_ScanData_Set__For__BinIndex ) {
                    psmIds_Or_ScanData_Set__For__BinIndex = new Set()
                    psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData__For__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_BinIndex.set( binIndex, psmIds_Or_ScanData_Set__For__BinIndex )
                }

                for ( const psmIds_Or_ScanData of psmIds_Or_ScanData_Set__For__ModMassExact ) {
                    psmIds_Or_ScanData_Set__For__BinIndex.add( psmIds_Or_ScanData )
                }
            }
        }
    }


    //////////////

    let label_Start_PSM_Or_Scan = ""

    {
        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            label_Start_PSM_Or_Scan = "PSM"

        } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            label_Start_PSM_Or_Scan = "Scan"

        } else {

            const msg = "modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() IS NOT ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms OR ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans.  modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() IS: " + modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            console.warn(msg)
            throw Error(msg)
        }
    }

    ////////////

    const chart_Data: Array<Plotly.Data> = []

    /**
     * Index by index of search or sub search
     */
    const yaxis_Entry_Title_Text__Search_SubSearch_Label__Array: Array<string> = []

    let maxBar_Y_Value = 0

    ////////////

    //  Create bars in bar chart from binned data

    //   '__All' variables for the 'Difference Plot' when there are 2 sub plots in the main plot

    const chart_X__All: Array<Array<number>> = []
    const chart_Y__All_UnClippedValues: Array<Array<number>> = []

    const chart_Bars_Tooltips_Parts__All: Array<{
        binStart: number
        binEnd: number
    }> = []

    const trace_Parts_All: Array<{
        traceName_String: string
        searchName_SubSearchName_TooltipText: string
    }> = []

    ////////////

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT ) {

        //   Merged Data Single Chart Version - Combine data for all searches or sub searches into single bar chart

        //  if NO separate out by search or sub search

        //  Combine searches or sub searches

        const psmIds_Or_ScanData_Set__COMBINED__Map_Key_BinIndex: Map<number, Set<number | string>> = new Map()

        {

            for ( let projectSearchIds_Or_SubSearchIds_For_DisplayOrder_INDEX = 0; projectSearchIds_Or_SubSearchIds_For_DisplayOrder_INDEX < projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length; projectSearchIds_Or_SubSearchIds_For_DisplayOrder_INDEX++ ) {

                const projectSearchId_Or_SubSearchId_OrGroupId_In_DisplayOrder = projectSearchIds_Or_SubSearchIds_For_DisplayOrder[ projectSearchIds_Or_SubSearchIds_For_DisplayOrder_INDEX ]

                const psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.get( projectSearchId_Or_SubSearchId_OrGroupId_In_DisplayOrder )

                if ( ! psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId ) {
                    //  No data so skip
                    continue  // EARLY CONTINUE
                }

                for ( const psmIds_Or_ScanData_Set__Map_Key_BinIndex_MapEntry of psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_BinIndex.entries() ) {

                    const binIndex = psmIds_Or_ScanData_Set__Map_Key_BinIndex_MapEntry[ 0 ]
                    const psmIds_Or_ScanData_Set = psmIds_Or_ScanData_Set__Map_Key_BinIndex_MapEntry[ 1 ]

                    let psmIds_Or_ScanData_Set__COMBINED__For__BinIndex = psmIds_Or_ScanData_Set__COMBINED__Map_Key_BinIndex.get( binIndex )
                    if ( ! psmIds_Or_ScanData_Set__COMBINED__For__BinIndex ) {
                        psmIds_Or_ScanData_Set__COMBINED__For__BinIndex = new Set()
                        psmIds_Or_ScanData_Set__COMBINED__Map_Key_BinIndex.set( binIndex, psmIds_Or_ScanData_Set__COMBINED__For__BinIndex )
                    }


                    for ( const psmIds_Or_ScanData_Entry of psmIds_Or_ScanData_Set ) {

                        psmIds_Or_ScanData_Set__COMBINED__For__BinIndex.add( psmIds_Or_ScanData_Entry )  // This utilizes that PSM Ids are unique across searches
                    }
                }

            }
        }

        ///////////////////

        //  Create Chart data

        const chart_X: Array<number> = []
        const chart_Y: Array<number> = []
        const chart_Y_UnClippedValues: Array<number> = []
        const chart_Bars_Tooltips: Array<string> = [];

        //  Create bars in bar chart from binned data.  Actual processing:

        let total_PSM_Or_Scan_Count = 0

        if ( binningOverride_Using_Display_MinMax ) {

            //  Special case where Data Min equal Max so break into bins based on display min/max to have narrow bar for displayed data

            for ( let binIndex = 0; binIndex < binCount; binIndex++ ) {

                const binStart = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex ) )
                const binCenter = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex + 0.5 ) )
                const binEnd = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex + 1 ) )

                let psm_Or_Scan_Count_ForBin = 0

                const binValue = psmIds_Or_ScanData_Set__COMBINED__Map_Key_BinIndex.get( binIndex )

                if ( binValue ) {

                    psm_Or_Scan_Count_ForBin = binValue.size
                }

                let psm_Or_Scan_Count_ForBin__PossiblyClipped = psm_Or_Scan_Count_ForBin

                {
                    const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                    if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                        if ( psm_Or_Scan_Count_ForBin__PossiblyClipped > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                            psm_Or_Scan_Count_ForBin__PossiblyClipped = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                        }
                    }
                }

                chart_X.push( binCenter );
                chart_Y.push( psm_Or_Scan_Count_ForBin__PossiblyClipped );
                chart_Y_UnClippedValues.push( psm_Or_Scan_Count_ForBin )

                const chart_Bar_Tooltip = "<b>Mod Mass Range </b>: " + binStart + " to " + binEnd +
                    "<br><b>" + label_Start_PSM_Or_Scan + " Count</b>: " + psm_Or_Scan_Count_ForBin.toLocaleString();
                chart_Bars_Tooltips.push( chart_Bar_Tooltip );

                total_PSM_Or_Scan_Count += psm_Or_Scan_Count_ForBin

                if ( maxBar_Y_Value < psm_Or_Scan_Count_ForBin__PossiblyClipped ) {
                    maxBar_Y_Value = psm_Or_Scan_Count_ForBin__PossiblyClipped
                }
            }

        } else {

            //  Main case where Data Min NOT Equal Max so binned based on Data min/max and then extra bins added to each side to expand out to display min/max

            //  Main Data bins

            let binIndex_MainData = 0
            while ( true ) {

                const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_MainData ) )
                const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_MainData + 0.5 ) )
                const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_MainData + 1 ) )

                if ( binEnd > ( modMass_ActualData_Max ) ) {
                    // bin > data max so break
                    break  // EARLY BREAK
                }

                let psm_Or_Scan_Count_ForBin = 0

                const binValue = psmIds_Or_ScanData_Set__COMBINED__Map_Key_BinIndex.get( binIndex_MainData )

                if ( binValue ) {

                    psm_Or_Scan_Count_ForBin = binValue.size
                }

                let psm_Or_Scan_Count_ForBin__PossiblyClipped = psm_Or_Scan_Count_ForBin

                {
                    const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                    if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                        if ( psm_Or_Scan_Count_ForBin__PossiblyClipped > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                            psm_Or_Scan_Count_ForBin__PossiblyClipped = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                        }
                    }
                }

                chart_X.push( binCenter );
                chart_Y.push( psm_Or_Scan_Count_ForBin__PossiblyClipped );
                chart_Y_UnClippedValues.push( psm_Or_Scan_Count_ForBin );

                const chart_Bar_Tooltip = "<b>Mod Mass Range </b>: " + binStart + " to " + binEnd +
                    "<br><b>" + label_Start_PSM_Or_Scan + " Count QQQQ</b>: " + psm_Or_Scan_Count_ForBin.toLocaleString();
                chart_Bars_Tooltips.push( chart_Bar_Tooltip );

                total_PSM_Or_Scan_Count += psm_Or_Scan_Count_ForBin

                if ( maxBar_Y_Value < psm_Or_Scan_Count_ForBin__PossiblyClipped ) {
                    maxBar_Y_Value= psm_Or_Scan_Count_ForBin__PossiblyClipped
                }

                binIndex_MainData++
            }

            // // Add Zero Count bins to right out to Display Max.  Start at binIndex_MainData since that was NOT processed in the loop above ('break' after increment before add to 'chart_X' 'chart_Y')
            // for ( let binIndex_Right = binIndex_MainData; true; binIndex_Right++ ) {
            //
            //     const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_Right ) )
            //     const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_Right + 0.5 ) )
            //     const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_Right + 1 ) )
            //
            //     if ( binEnd > modMass_ChartDisplayRange_Max ) {
            //         // bin > data max so break
            //         break  // EARLY BREAK
            //     }
            //
            //     chart_X.push( binCenter );
            //     chart_Y.push( 0 );
            // }
            //
            // // Add Zero Count bins to left out to Display Min
            // for ( let binIndex_Left = -1; true; binIndex_Left-- ) {
            //
            //     const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_Left ) )
            //     const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_Left + 0.5 ) )
            //     const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_Left + 1 ) )
            //
            //     if ( binStart < modMass_ChartDisplayRange_Min ) {
            //         // bin > data max so break
            //         break  // EARLY BREAK
            //     }
            //
            //     chart_X.push( binCenter );
            //     chart_Y.push( 0 );
            // }
        }


        console.log( "Creating Histogram: Total PSM or Scan Count: " + total_PSM_Or_Scan_Count.toLocaleString() )

        //  Colors for Bars
        const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories( { categoryCount: 1 } );

        const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index( 0 );

        const chart_Data_Entry: Plotly.Data = {
            name: "",  // So tooltip does not show "trace0"
            showlegend: false,
            type: 'bar',
            x: chart_X,
            y: chart_Y,
            // text: chart_Bars_labels, //  Text put on each bar
            hoverinfo: "text", //  Hover contents
            hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
            marker: {
                color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
            }
        }

        if ( binCount === 1 ) {

            //  Bar chart has exactly 1 entry

            //  Set bar X to be the center of Min to Max of Display Range

            chart_X[ 0 ] = modMass_ChartDisplayRange_Min + ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.5 )

            //  Set bar width to extend from Min to Max of Display Range

            const barWidth = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min )

            chart_Data_Entry.width = [ barWidth ]
        }

        //  Add Plotly Trace to Trace Array

        chart_Data.push( chart_Data_Entry )

        //  Save X and Y data to "__All" data

        chart_X__All.push( chart_X )
        chart_Y__All_UnClippedValues.push( chart_Y_UnClippedValues )

        ////////

        if ( displaying_Mean_StandardDeviation ) {

            // const chart_Y_Min_Value = Math.min( ...chart_Y )
            const chart_Y_Max_Value = Math.max( ...chart_Y )

            let xaxis_String: string = undefined
            let yaxis_String: string = undefined

            let mean: number = undefined
            let standardDeviation: number = undefined

            {
                //   Main Line Trace

                const chart_X__Mean_StandardDeviation: Array<number> = []
                const chart_Y__Mean_StandardDeviation: Array<number> = []
                // const chart_Bars_Tooltips__Mean_StandardDeviation: Array<string> = []

                if ( modMass_ActualData_Min !== modMass_ActualData_Max ) {

                    //  Only populate when have more than 1 unique mod mass

                    // Compute mean and standard deviation
                    {
                        //  Create array to pass to mean and standard deviation

                        const modMass_Array: Array<number> = []

                        for ( const mapValue_Per_ProjectSearchId_Or_SearchSubGroupId of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.values() ) {

                            for ( const mapEntry_per_ModMassExact of mapValue_Per_ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact ) {
                                const modMassExact = mapEntry_per_ModMassExact[ 0 ]
                                const psmIds_Or_ScanData_Set = mapEntry_per_ModMassExact[ 1 ]

                                for ( let counter = 1; counter <= psmIds_Or_ScanData_Set.size; counter++ ) {
                                    modMass_Array.push( modMassExact )
                                }
                            }
                        }

                        //  Compute Mean

                        mean = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_mean( modMass_Array )

                        // Compute Standard Deviation

                        //  for jstat stddev: By default, the population standard deviation is returned.  Passing true to flag (second parameter) returns the sample standard deviation.
                        standardDeviation = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_stdev( modMass_Array )
                    }


                    if ( ( ! Number.isNaN( mean ) ) && ( ! Number.isNaN( standardDeviation ) ) ) {

                        //  'mean' and 'standardDeviation' are NOT NaN so compute

                        // Determine amplitude from tallest bar
                        let amplitude = chart_Y_Max_Value

                        {
                            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                                && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                if ( amplitude > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                    amplitude = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                }
                            }
                        }

                        {
                            const numberOfStandardDeviations_To_Subtract_Add = 3

                            let x_Start = modMass_ActualData_Min - numberOfStandardDeviations_To_Subtract_Add * standardDeviation
                            let x_End = modMass_ActualData_Max + numberOfStandardDeviations_To_Subtract_Add * standardDeviation

                            if ( x_Start < modMass_ChartDisplayRange_Min ) {
                                x_Start = modMass_ChartDisplayRange_Min
                            }
                            if ( x_End > modMass_ChartDisplayRange_Max ) {
                                x_End = modMass_ChartDisplayRange_Max
                            }

                            const binCount = _MAX_BIN_COUNT

                            const x_Start_End_Difference = x_End - x_Start

                            const scale = x_Start_End_Difference / binCount

                            const chart_X_Intermediate: Array<number> = []
                            const chart_Y_NormalValues: Array<number> = []

                            // Generate smooth normal curve
                            for ( let offset_Counter = 0; offset_Counter <= binCount; offset_Counter++ ) {

                                const x = x_Start + ( offset_Counter * scale )

                                const normalVal = Math.exp( -0.5 * ( ( x - mean ) / standardDeviation ) ** 2 );
                                chart_X_Intermediate.push( x );
                                chart_Y_NormalValues.push( normalVal );
                            }

                            const chart_Y_ScaledTo_Amplitude: Array<number> = []

                            // Scale curve so its peak = amplitude
                            const maxNormal = Math.max( ...chart_Y_NormalValues );
                            for ( let i = 0; i < chart_Y_NormalValues.length; i++ ) {
                                chart_Y_ScaledTo_Amplitude[ i ] = ( chart_Y_NormalValues[ i ] / maxNormal ) * amplitude;
                            }

                            for ( let i = 0; i < chart_X_Intermediate.length; i++ ) {

                                const chart_X_Value = chart_X_Intermediate[ i ]
                                const chart_Y_Value = chart_Y_ScaledTo_Amplitude[ i ]

                                chart_X__Mean_StandardDeviation.push( chart_X_Value )
                                chart_Y__Mean_StandardDeviation.push( chart_Y_Value )
                                // chart_Bars_Tooltips__Mean_StandardDeviation.push( "<b>mean:</b> " + mean + "<br>" + "<b>standard deviation:</b> " + standardDeviation )
                            }
                        }
                    }
                }

                if ( ( ! Number.isNaN( mean ) ) && ( ! Number.isNaN( standardDeviation ) ) ) {

                    //  'mean' and 'standardDeviation' are NOT NaN so add to chart

                    const chart_Data_Entry__Mean_StandardDeviation: Plotly.Data = {

                        name: "",
                        showlegend: false, // This trace will NOT appear in the legend

                        xaxis: xaxis_String,
                        yaxis: yaxis_String,

                        mode: 'lines',
                        x: chart_X__Mean_StandardDeviation,
                        y: chart_Y__Mean_StandardDeviation,
                        // text: chart_Bars_labels, //  Text put on each bar
                        hoverinfo: "skip", //  Skip Hover contents
                        // hoverinfo: "text", //  Hover contents
                        // hovertext: chart_Bars_Tooltips__Mean_StandardDeviation,  //  Hover contents per bar
                        marker: {
                            color: _CHART__MEAN_LINE__COLOR, // 'rgba(255, 0, 0, 0.991)', // chart_Color,  // Color of the bar itself: If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                            // line: {
                            //     width: 1, // 1px border width
                            //     color: 'black' // Black border color
                            // }
                        }
                    }

                    chart_Data.push( chart_Data_Entry__Mean_StandardDeviation )
                }
            }
            {
                if ( ( modMass_ActualData_Min !== modMass_ActualData_Max )
                    && ( ! Number.isNaN( mean ) ) && ( ! Number.isNaN( standardDeviation ) ) ) {

                    //  Only populate when have more than 1 unique mod mass

                    //  Text Label Trace in upper right

                    const x_Position = modMass_ChartDisplayRange_Max - ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.05 )
                    let y_Position = maxBar_Y_Value


                    {
                        const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                        if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                            && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                            if ( y_Position > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                y_Position = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                            }
                        }
                    }


                    // const textLabel = `μ = ${mean(y1).toFixed(2)}`

                    // const textLabel = `μ = 123.12345`

                    const textLabel = "μ = " + mean.toFixed( 5 )

                    const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                        x: [ x_Position ],
                        y: [ y_Position ],
                        xaxis: xaxis_String,
                        yaxis: yaxis_String,
                        mode: 'text',
                        text: [ textLabel ],
                        hoverinfo: "skip", //  Skip Hover contents
                        textposition: 'bottom left',
                        showlegend: false,
                        // To keep it corner-fixed, use domain axes via annotations (Option A).
                        // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                    };

                    chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )

                } else {

                    const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                        x: [  ],
                        y: [  ],
                        xaxis: xaxis_String,
                        yaxis: yaxis_String,
                        mode: 'text',
                        text: [  ],
                        hoverinfo: "skip", //  Skip Hover contents
                        textposition: 'bottom left',
                        showlegend: false,
                        // To keep it corner-fixed, use domain axes via annotations (Option A).
                        // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                    };

                    chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )
                }
            }
        }

    } else if (
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
        || all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART
    ) {

        //  if YES separate out by Search or Sub Search or Group

        //   Chart per Search or Sub Search or Group Version

        let projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder = Array.from( projectSearchIds_Or_SubSearchIds_For_DisplayOrder )

        let computeColorsForCategories__categoryCount = projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

            projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder = [ 1, 2 ]

            computeColorsForCategories__categoryCount = 2
        }

        //  Colors for Bars
        const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories( { categoryCount: computeColorsForCategories__categoryCount } );

        const chart_Y__SummedAcrossTraces: Array<number> = []


        {
            for ( let projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX = 0; projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX < projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length; projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX++ ) {

                //  Process Single Search or Sub Search or Group creating a Plotly Trace

                const projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder = projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder[ projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX ]

                let traceName_String: string = undefined
                let searchName_SubSearchName_TooltipText: string = undefined

                if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

                    traceName_String =  "Group " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder.toString()

                    searchName_SubSearchName_TooltipText = "<b>Group:</b> " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder

                    yaxis_Entry_Title_Text__Search_SubSearch_Label__Array.push( "Group " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder )

                } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId ) {

                    const searchData_For_ProjectSearchId = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder )
                    if ( ! searchData_For_ProjectSearchId ) {
                        const msg = "dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder ) returned NOTHING for projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder: " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder
                        console.warn( msg )
                        throw Error( msg )
                    }

                    const _SEARCH_NAME_DISPLAY_MAX_LENGTH = 100

                    traceName_String = searchData_For_ProjectSearchId.searchId.toString()

                    let searchName_Display = searchData_For_ProjectSearchId.name
                    if ( searchName_Display.length > _SEARCH_NAME_DISPLAY_MAX_LENGTH ) {
                        searchName_Display = searchName_Display.substring( 0, _SEARCH_NAME_DISPLAY_MAX_LENGTH ) + "..."
                    }

                    searchName_SubSearchName_TooltipText = "<b>Search:</b> (" + searchData_For_ProjectSearchId.searchId + ") " + searchName_Display

                    yaxis_Entry_Title_Text__Search_SubSearch_Label__Array.push( "Search: " + searchData_For_ProjectSearchId.searchId )

                } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                    const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
                    if ( ! searchSubGroups_Root ) {
                        const msg = "( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) AND dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() returned NOTHING: "
                        console.warn( msg )
                        throw Error( msg )
                    }

                    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId_WhenHaveSingleSearchSubGroups )
                    if ( ! searchSubGroups_ForProjectSearchId ) {
                        const msg = "searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId_WhenHaveSingleSearchSubGroups ) returned NOTHING for projectSearchId_WhenHaveSingleSearchSubGroups: " + projectSearchId_WhenHaveSingleSearchSubGroups
                        console.warn( msg )
                        throw Error( msg )
                    }

                    const searchSubGroup_For_SearchSubGroup_Id = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder )
                    if ( ! searchSubGroup_For_SearchSubGroup_Id ) {
                        const msg = "searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder ) returned NOTHING for projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder: " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder
                        console.warn( msg )
                        throw Error( msg )
                    }

                    traceName_String = searchSubGroup_For_SearchSubGroup_Id.subgroupName_Display

                    searchName_SubSearchName_TooltipText = "<b>Sub Search:</b> " + searchSubGroup_For_SearchSubGroup_Id.subgroupName_Display

                    yaxis_Entry_Title_Text__Search_SubSearch_Label__Array.push( "Sub Search: " + searchSubGroup_For_SearchSubGroup_Id.subgroupName_Display )

                } else {
                    const msg = "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum is not expected value. value: " + modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
                    console.warn( msg )
                    throw Error( msg )
                }

                const chart_X: Array<number> = []
                const chart_Y: Array<number> = []
                const chart_Y_UnClippedValues: Array<number> = []
                const chart_Bars_Tooltips: Array<string> = [];

                //  Create bars in bar chart from binned data.  Actual processing:

                let total_PSM_Or_Scan_Count = 0


                // if ( ! projectSearchId_Or_SearchSubGroupId_InData_Set.has( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder ) ) {
                //     //  No data so skip
                //     continue  // EARLY CONTINUE
                // }

                const psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.get( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder )

                if ( binningOverride_Using_Display_MinMax ) {

                    //  Special case where Data Min equal Max so break into bins based on display min/max to have narrow bar for displayed data

                    for ( let binIndex = 0; binIndex < binCount; binIndex++ ) {

                        const binStart = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex ) )
                        const binCenter = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex + 0.5 ) )
                        const binEnd = modMass_ChartDisplayRange_Min + ( binSize * ( binIndex + 1 ) )

                        let psm_Or_Scan_Count_ForBin = 0

                        if ( psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId ) {

                            const binValue = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_BinIndex.get( binIndex )

                            if ( binValue ) {

                                psm_Or_Scan_Count_ForBin = binValue.size
                            }
                        }

                        let psm_Or_Scan_Count_ForBin__PossiblyClipped = psm_Or_Scan_Count_ForBin

                        {
                            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                if ( psm_Or_Scan_Count_ForBin__PossiblyClipped > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                    psm_Or_Scan_Count_ForBin__PossiblyClipped = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                }
                            }
                        }

                        if ( maxBar_Y_Value < psm_Or_Scan_Count_ForBin__PossiblyClipped ) {
                            maxBar_Y_Value = psm_Or_Scan_Count_ForBin__PossiblyClipped
                        }

                        chart_X.push( binCenter );
                        chart_Y.push( psm_Or_Scan_Count_ForBin__PossiblyClipped );
                        chart_Y_UnClippedValues.push( psm_Or_Scan_Count_ForBin )

                        if ( chart_Y__SummedAcrossTraces[ binIndex ] ) {
                            chart_Y__SummedAcrossTraces[ binIndex ] += psm_Or_Scan_Count_ForBin__PossiblyClipped
                        } else {
                            chart_Y__SummedAcrossTraces[ binIndex ] = psm_Or_Scan_Count_ForBin__PossiblyClipped
                        }

                        const chart_Bar_Tooltip =
                            searchName_SubSearchName_TooltipText + "<br>" +
                            "<b>Mod Mass Range </b>: " + binStart + " to " + binEnd +
                            "<br><b>" + label_Start_PSM_Or_Scan + " Count</b>: " + psm_Or_Scan_Count_ForBin.toLocaleString();
                        chart_Bars_Tooltips.push( chart_Bar_Tooltip );

                        total_PSM_Or_Scan_Count += psm_Or_Scan_Count_ForBin

                        if ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX === 0 ) {

                            //  Should be same for all entries so only store for first
                            chart_Bars_Tooltips_Parts__All.push( {
                                binStart, binEnd
                            } )
                        }
                    }

                } else {

                    //  Main case where Data Min NOT Equal Max so binned based on Data min/max and then extra bins added to each side to expand out to display min/max

                    //  Main Data bins

                    let binIndex_MainData = 0
                    while ( true ) {

                        const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_MainData ) )
                        const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_MainData + 0.5 ) )
                        const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_MainData + 1 ) )

                        if ( binEnd > ( modMass_ActualData_Max ) ) {
                            // bin > data max so break
                            break  // EARLY BREAK
                        }

                        let psm_Or_Scan_Count_ForBin = 0

                        if ( psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId ) {

                            const binValue = psmIds_Or_ScanData_Set__Map_Key_BinIndex_Map_AndData_For_ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_BinIndex.get( binIndex_MainData )

                            if ( binValue ) {

                                psm_Or_Scan_Count_ForBin = binValue.size
                            }
                        }

                        let psm_Or_Scan_Count_ForBin__PossiblyClipped = psm_Or_Scan_Count_ForBin

                        {
                            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                if ( psm_Or_Scan_Count_ForBin__PossiblyClipped > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                    psm_Or_Scan_Count_ForBin__PossiblyClipped = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                }
                            }
                        }

                        if ( maxBar_Y_Value < psm_Or_Scan_Count_ForBin__PossiblyClipped ) {
                            maxBar_Y_Value = psm_Or_Scan_Count_ForBin__PossiblyClipped
                        }

                        chart_X.push( binCenter );
                        chart_Y.push( psm_Or_Scan_Count_ForBin__PossiblyClipped );
                        chart_Y_UnClippedValues.push( psm_Or_Scan_Count_ForBin )

                        if ( chart_Y__SummedAcrossTraces[ binIndex_MainData ] ) {
                            chart_Y__SummedAcrossTraces[ binIndex_MainData ] += psm_Or_Scan_Count_ForBin__PossiblyClipped
                        } else {
                            chart_Y__SummedAcrossTraces[ binIndex_MainData ] = psm_Or_Scan_Count_ForBin__PossiblyClipped
                        }

                        const chart_Bar_Tooltip =
                            searchName_SubSearchName_TooltipText + "<br>" +
                            "<b>Mod Mass Range </b>: " + binStart + " to " + binEnd +
                            "<br><b>" + label_Start_PSM_Or_Scan + " Count</b>: " + psm_Or_Scan_Count_ForBin.toLocaleString();
                        chart_Bars_Tooltips.push( chart_Bar_Tooltip );

                        total_PSM_Or_Scan_Count += psm_Or_Scan_Count_ForBin


                        if ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX === 0 ) {

                            //  Should be same for all entries so only store for first
                            chart_Bars_Tooltips_Parts__All.push( {
                                binStart, binEnd
                            } )
                        }

                        binIndex_MainData++
                    }

                    // Add Zero Count bins to right out to Display Max.  Start at binIndex_MainData since that was NOT processed in the loop above ('break' after increment before add to 'chart_X' 'chart_Y')
                    for ( let binIndex_Right = binIndex_MainData; true; binIndex_Right++ ) {

                        const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_Right ) )
                        const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_Right + 0.5 ) )
                        const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_Right + 1 ) )

                        if ( binEnd > modMass_ChartDisplayRange_Max ) {
                            // bin > data max so break
                            break  // EARLY BREAK
                        }

                        chart_X.push( binCenter );
                        chart_Y.push( 0 );
                        chart_Y_UnClippedValues.push( 0 )
                    }

                    // Add Zero Count bins to left out to Display Min
                    for ( let binIndex_Left = -1; true; binIndex_Left-- ) {

                        const binStart = modMass_ActualData_Min + ( binSize * ( binIndex_Left ) )
                        const binCenter = modMass_ActualData_Min + ( binSize * ( binIndex_Left + 0.5 ) )
                        const binEnd = modMass_ActualData_Min + ( binSize * ( binIndex_Left + 1 ) )

                        if ( binStart < modMass_ChartDisplayRange_Min ) {
                            // bin > data max so break
                            break  // EARLY BREAK
                        }

                        chart_X.push( binCenter );
                        chart_Y.push( 0 );
                        chart_Y_UnClippedValues.push( 0 )
                    }
                }

                console.log( "Creating Histogram: projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder: " + projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder + ", Total PSM or Scan Count: " + total_PSM_Or_Scan_Count.toLocaleString() )

                const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX );

                let xaxis_String: string = undefined
                let yaxis_String: string = undefined

                if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

                    xaxis_String = "x"
                    yaxis_String = "y" + ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX + 1 ) //  Add 1 since 'yaxis_String' is one based and '...INDEX' is zero based    WAS ( chart_Data.length + 1 )   // Create the index from prev length
                }

                const chart_Data_Entry: Plotly.Data = {

                    name: traceName_String,

                    xaxis: xaxis_String,
                    yaxis: yaxis_String,

                    type: 'bar',
                    x: chart_X,
                    y: chart_Y,
                    // text: chart_Bars_labels, //  Text put on each bar
                    hoverinfo: "text", //  Hover contents
                    hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                    marker: {
                        color: chart_Color,  // Color of the bar itself: If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        // line: {
                        //     width: 1, // 1px border width
                        //     color: 'black' // Black border color
                        // }
                    }
                }

                if ( binCount === 1 ) {

                    //  Bar chart has exactly 1 entry

                    //  Set bar X to be the center of Min to Max

                    chart_X[ 0 ] = modMass_ChartDisplayRange_Min + ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.5 )

                    //  Set bar width to extend from Min to Max

                    const barWidth = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min )

                    chart_Data_Entry.width = [ barWidth ]
                }

                //  Add Plotly Trace to Trace Array

                chart_Data.push( chart_Data_Entry )

                //  Save X, Y and trace_Parts data to "__All" data

                chart_X__All.push( chart_X )
                chart_Y__All_UnClippedValues.push( chart_Y_UnClippedValues )

                trace_Parts_All.push( {
                    traceName_String,
                    searchName_SubSearchName_TooltipText
                } )

                ////////

                if ( displaying_Mean_StandardDeviation ) {

                    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

                        //  Creating "Separate Plots" so create Trace for "Mean" for this plot

                        const chart_Y_Max_Value = Math.max( ...chart_Y )

                        let xaxis_String: string = undefined
                        let yaxis_String: string = undefined

                        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

                            xaxis_String = "x"
                            yaxis_String = "y" + ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX + 1 ) //  Add 1 since 'yaxis_String' is one based and '...INDEX' is zero based    WAS ( chart_Data.length + 1 )   // Create the index from prev length
                        }

                        let mean: number = undefined
                        let standardDeviation: number = undefined

                        {
                            //   Main Line Trace

                            const chart_X__Mean_StandardDeviation: Array<number> = []
                            const chart_Y__Mean_StandardDeviation: Array<number> = []
                            // const chart_Bars_Tooltips__Mean_StandardDeviation: Array<string> = []

                            if ( modMass_ActualData_Min !== modMass_ActualData_Max ) {

                                //  Only populate when have more than 1 unique mod mass

                                // Compute mean and standard deviation
                                {
                                    //  Create array to pass to mean and standard deviation

                                    const modMass_Array: Array<number> = []

                                    const psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__FOR__ProjectSearchId_Or_SearchSubGroupId =
                                        psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.get( projectSearchId_Or_SubSearchId_Or_GroupId_In_DisplayOrder )

                                    if ( psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__FOR__ProjectSearchId_Or_SearchSubGroupId ) {
                                        for ( const mapEntry_per_ModMassExact of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData__FOR__ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact ) {
                                            const modMassExact = mapEntry_per_ModMassExact[ 0 ]
                                            const psmIds_Or_ScanData_Set = mapEntry_per_ModMassExact[ 1 ]

                                            for ( let counter = 1; counter <= psmIds_Or_ScanData_Set.size; counter++ ) {
                                                modMass_Array.push( modMassExact )
                                            }
                                        }
                                    }

                                    //  Compute Mean

                                    mean = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_mean( modMass_Array )

                                    // Compute Standard Deviation

                                    //  for jstat stddev: By default, the population standard deviation is returned.  Passing true to flag (second parameter) returns the sample standard deviation.
                                    standardDeviation = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_stdev( modMass_Array )
                                }

                                // Determine amplitude from tallest bar
                                let amplitude = chart_Y_Max_Value

                                {
                                    const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                                    if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                                        && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                        if ( amplitude > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                            amplitude = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                        }
                                    }
                                }

                                {
                                    const numberOfStandardDeviations_To_Subtract_Add = 3

                                    let x_Start = modMass_ActualData_Min - numberOfStandardDeviations_To_Subtract_Add * standardDeviation
                                    let x_End = modMass_ActualData_Max + numberOfStandardDeviations_To_Subtract_Add * standardDeviation

                                    if ( x_Start < modMass_ChartDisplayRange_Min ) {
                                        x_Start = modMass_ChartDisplayRange_Min
                                    }
                                    if ( x_End > modMass_ChartDisplayRange_Max ) {
                                        x_End = modMass_ChartDisplayRange_Max
                                    }

                                    const binCount = _MAX_BIN_COUNT

                                    const x_Start_End_Difference = x_End - x_Start

                                    const scale = x_Start_End_Difference / binCount

                                    const chart_X_Intermediate: Array<number> = []
                                    const chart_Y_NormalValues: Array<number> = []

                                    // Generate smooth normal curve
                                    for ( let offset_Counter = 0; offset_Counter <= binCount; offset_Counter++ ) {

                                        const x = x_Start + ( offset_Counter * scale )

                                        const normalVal = Math.exp( -0.5 * ( ( x - mean ) / standardDeviation ) ** 2 );
                                        chart_X_Intermediate.push( x );
                                        chart_Y_NormalValues.push( normalVal );
                                    }

                                    const chart_Y_ScaledTo_Amplitude: Array<number> = []

                                    // Scale curve so its peak = amplitude
                                    const maxNormal = Math.max( ...chart_Y_NormalValues );
                                    for ( let i = 0; i < chart_Y_NormalValues.length; i++ ) {
                                        chart_Y_ScaledTo_Amplitude[ i ] = ( chart_Y_NormalValues[ i ] / maxNormal ) * amplitude;
                                    }

                                    for ( let i = 0; i < chart_X_Intermediate.length; i++ ) {

                                        const chart_X_Value = chart_X_Intermediate[ i ]
                                        const chart_Y_Value = chart_Y_ScaledTo_Amplitude[ i ]

                                        chart_X__Mean_StandardDeviation.push( chart_X_Value )
                                        chart_Y__Mean_StandardDeviation.push( chart_Y_Value )
                                        // chart_Bars_Tooltips__Mean_StandardDeviation.push( "<b>mean:</b> " + mean + "<br>" + "<b>standard deviation:</b> " + standardDeviation )
                                    }
                                }
                            }

                            const chart_Data_Entry__Mean_StandardDeviation: Plotly.Data = {

                                name: "",
                                showlegend: false, // This trace will NOT appear in the legend

                                xaxis: xaxis_String,
                                yaxis: yaxis_String,

                                mode: 'lines',
                                x: chart_X__Mean_StandardDeviation,
                                y: chart_Y__Mean_StandardDeviation,
                                // text: chart_Bars_labels, //  Text put on each bar
                                hoverinfo: "skip", //  Skip Hover contents
                                // hoverinfo: "text", //  Hover contents
                                // hovertext: chart_Bars_Tooltips__Mean_StandardDeviation,  //  Hover contents per bar
                                marker: {
                                    color: _CHART__MEAN_LINE__COLOR, // 'rgba(255, 0, 0, 0.991)', // chart_Color,  // Color of the bar itself: If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                                    // line: {
                                    //     width: 1, // 1px border width
                                    //     color: 'black' // Black border color
                                    // }
                                }
                            }

                            chart_Data.push( chart_Data_Entry__Mean_StandardDeviation )
                        }
                        {
                            if ( modMass_ActualData_Min !== modMass_ActualData_Max ) {

                                //  Only populate when have more than 1 unique mod mass

                                //  Text Label Trace in upper right ( automatically flips to bottom right for inverse Y Axis 'range' )

                                const x_Position = modMass_ChartDisplayRange_Max - ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.05 )
                                let y_Position = maxBar_Y_Value

                                {
                                    const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                                    if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                                        && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                        if ( y_Position > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                            y_Position = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                        }
                                    }
                                }

                                // const textLabel = `μ = ${mean(y1).toFixed(2)}`

                                // const textLabel = `μ = 123.12345`

                                const textLabel = "μ = " + mean.toFixed( 5 )

                                const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                                    x: [ x_Position ],
                                    y: [ y_Position ],
                                    xaxis: xaxis_String,
                                    yaxis: yaxis_String,
                                    mode: 'text',
                                    text: [ textLabel ],
                                    hoverinfo: "skip", //  Skip Hover contents
                                    textposition: 'bottom left',
                                    showlegend: false,
                                    // To keep it corner-fixed, use domain axes via annotations (Option A).
                                    // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                                }

                                if (
                                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots()
                                    &&
                                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                    === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
                                    &&
                                    projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length === 2
                                    &&
                                    projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder_INDEX === 1  // Second entry
                                ) {

                                    //  for inverse Y Axis second chart of two charts, change text position

                                    chart_Data_Entry__Mean_StandardDeviation__Label.textposition = "top left"
                                }

                                chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )

                            } else {

                                const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                                    x: [],
                                    y: [],
                                    xaxis: xaxis_String,
                                    yaxis: yaxis_String,
                                    mode: 'text',
                                    text: [],
                                    hoverinfo: "skip", //  Skip Hover contents
                                    textposition: 'bottom left',
                                    showlegend: false,
                                    // To keep it corner-fixed, use domain axes via annotations (Option A).
                                    // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                                };

                                chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )
                            }
                        }
                    }

                } // END:  for ( ...
            }
        }

        if ( displaying_Mean_StandardDeviation ) {

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART ) {

                //  Have Stacked Bar Chart so create main and standard deviation Line

                const chart_Y_Max_Value = Math.max( ...chart_Y__SummedAcrossTraces )

                let xaxis_String: string = undefined
                let yaxis_String: string = undefined

                let mean: number = undefined
                let standardDeviation: number = undefined

                {
                    //   Main Line Trace

                    const chart_X__Mean_StandardDeviation: Array<number> = []
                    const chart_Y__Mean_StandardDeviation: Array<number> = []
                    // const chart_Bars_Tooltips__Mean_StandardDeviation: Array<string> = []

                    if ( modMass_ActualData_Min !== modMass_ActualData_Max ) {

                        //  Only populate when have more than 1 unique mod mass

                        // Compute mean and standard deviation
                        {
                            //  Create array to pass to mean and standard deviation

                            const modMass_Array: Array<number> = []

                            for ( const mapValue_Per_ProjectSearchId_Or_SearchSubGroupId of psmIds_Or_ScanData_Set__Map_Key_ModMassExact_Map_AndData_Key_ProjectSearchId_Or_SearchSubGroupId_Or_GroupId.values() ) {

                                for ( const mapEntry_per_ModMassExact of mapValue_Per_ProjectSearchId_Or_SearchSubGroupId.psmIds_Or_ScanData_Set__Map_Key_ModMassExact ) {
                                    const modMassExact = mapEntry_per_ModMassExact[ 0 ]
                                    const psmIds_Or_ScanData_Set = mapEntry_per_ModMassExact[ 1 ]

                                    for ( let counter = 1; counter <= psmIds_Or_ScanData_Set.size; counter++ ) {
                                        modMass_Array.push( modMassExact )
                                    }
                                }
                            }

                            //  Compute Mean

                            mean = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_mean( modMass_Array )

                            // Compute Standard Deviation

                            //  for jstat stddev: By default, the population standard deviation is returned.  Passing true to flag (second parameter) returns the sample standard deviation.
                            standardDeviation = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_stdev( modMass_Array )
                        }

                        // Determine amplitude from tallest bar
                        const amplitude = chart_Y_Max_Value

                        {
                            const numberOfStandardDeviations_To_Subtract_Add = 3

                            let x_Start = modMass_ActualData_Min - numberOfStandardDeviations_To_Subtract_Add * standardDeviation
                            let x_End = modMass_ActualData_Max + numberOfStandardDeviations_To_Subtract_Add * standardDeviation

                            if ( x_Start < modMass_ChartDisplayRange_Min ) {
                                x_Start = modMass_ChartDisplayRange_Min
                            }
                            if ( x_End > modMass_ChartDisplayRange_Max ) {
                                x_End = modMass_ChartDisplayRange_Max
                            }

                            const binCount = _MAX_BIN_COUNT

                            const x_Start_End_Difference = x_End - x_Start

                            const scale = x_Start_End_Difference / binCount

                            const chart_X_Intermediate: Array<number> = []
                            const chart_Y_NormalValues: Array<number> = []

                            // Generate smooth normal curve
                            for ( let offset_Counter = 0; offset_Counter <= binCount; offset_Counter++ ) {

                                const x = x_Start + ( offset_Counter * scale )

                                const normalVal = Math.exp( -0.5 * ( ( x - mean ) / standardDeviation ) ** 2 );
                                chart_X_Intermediate.push( x );
                                chart_Y_NormalValues.push( normalVal );
                            }

                            const chart_Y_ScaledTo_Amplitude: Array<number> = []

                            // Scale curve so its peak = amplitude
                            const maxNormal = Math.max( ...chart_Y_NormalValues );
                            for ( let i = 0; i < chart_Y_NormalValues.length; i++ ) {
                                chart_Y_ScaledTo_Amplitude[ i ] = ( chart_Y_NormalValues[ i ] / maxNormal ) * amplitude;
                            }

                            for ( let i = 0; i < chart_X_Intermediate.length; i++ ) {

                                const chart_X_Value = chart_X_Intermediate[ i ]
                                const chart_Y_Value = chart_Y_ScaledTo_Amplitude[ i ]

                                chart_X__Mean_StandardDeviation.push( chart_X_Value )
                                chart_Y__Mean_StandardDeviation.push( chart_Y_Value )
                                // chart_Bars_Tooltips__Mean_StandardDeviation.push( "<b>mean:</b> " + mean + "<br>" + "<b>standard deviation:</b> " + standardDeviation )
                            }
                        }
                    }

                    const chart_Data_Entry__Mean_StandardDeviation: Plotly.Data = {

                        name: "",
                        showlegend: false, // This trace will NOT appear in the legend

                        xaxis: xaxis_String,
                        yaxis: yaxis_String,

                        mode: 'lines',
                        x: chart_X__Mean_StandardDeviation,
                        y: chart_Y__Mean_StandardDeviation,
                        // text: chart_Bars_labels, //  Text put on each bar
                        hoverinfo: "skip", //  Skip Hover contents
                        // hoverinfo: "text", //  Hover contents
                        // hovertext: chart_Bars_Tooltips__Mean_StandardDeviation,  //  Hover contents per bar
                        marker: {
                            color: _CHART__MEAN_LINE__COLOR, // 'rgba(255, 0, 0, 0.991)', // chart_Color,  // Color of the bar itself: If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                            // line: {
                            //     width: 1, // 1px border width
                            //     color: 'black' // Black border color
                            // }
                        }
                    }

                    chart_Data.push( chart_Data_Entry__Mean_StandardDeviation )
                }
                {
                    if ( modMass_ActualData_Min !== modMass_ActualData_Max ) {

                        //  Only populate when have more than 1 unique mod mass

                        //  Text Label Trace in upper right

                        const x_Position = modMass_ChartDisplayRange_Max - ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.05 )
                        let y_Position = maxBar_Y_Value

                        {
                            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                                && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                                if ( y_Position > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                                    y_Position = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                                }
                            }
                        }

                        // const textLabel = `μ = ${mean(y1).toFixed(2)}`

                        // const textLabel = `μ = 123.12345`

                        const textLabel = "μ = " + mean.toFixed( 5 )

                        const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                            x: [ x_Position ],
                            y: [ y_Position ],
                            xaxis: xaxis_String,
                            yaxis: yaxis_String,
                            mode: 'text',
                            text: [ textLabel ],
                            hoverinfo: "skip", //  Skip Hover contents
                            textposition: 'bottom left',
                            showlegend: false,
                            // To keep it corner-fixed, use domain axes via annotations (Option A).
                            // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                        };

                        chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )

                    } else {

                        const chart_Data_Entry__Mean_StandardDeviation__Label: Plotly.Data = {
                            x: [  ],
                            y: [  ],
                            xaxis: xaxis_String,
                            yaxis: yaxis_String,
                            mode: 'text',
                            text: [  ],
                            hoverinfo: "skip", //  Skip Hover contents
                            textposition: 'bottom left',
                            showlegend: false,
                            // To keep it corner-fixed, use domain axes via annotations (Option A).
                            // For text traces, you'd need to compute a data-space corner (e.g., from axis range).
                        };

                        chart_Data.push( chart_Data_Entry__Mean_StandardDeviation__Label )
                    }
                }
            }
        }
    }

    /////////////////

    let chartTitle_SecondLine = ""

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
        && all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== null ) {

        chartTitle_SecondLine =
            "<br>" +
            "<sup>" +
            "Note: " +
            label_Start_PSM_Or_Scan +
            " Count bar height clipped at " +
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY().toLocaleString() +
            "</sup>"
    }

    const chartTitle = label_Start_PSM_Or_Scan + " Count vs/ Mod Mass" + chartTitle_SecondLine

    const chart_X_Axis_Label = "Mod Mass"
    const chart_Y_Axis_Label = label_Start_PSM_Or_Scan + " Count"


    const get_yaxis_Entry_Fcn = (
        {
            yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index, inverse_RangeDirection
        } : {
            yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index: number
            inverse_RangeDirection: boolean
        }) => {

        let yaxis_Entry_range_MaxValue = maxBar_Y_Value

        {
            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                if ( yaxis_Entry_range_MaxValue > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                    yaxis_Entry_range_MaxValue = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                }
            }
        }

        let yaxis_Entry_range: Array<any> = undefined

        let yaxis_Entry_Title_Text = chart_Y_Axis_Label

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

            yaxis_Entry_range = [ 0, yaxis_Entry_range_MaxValue ]  //  Add so all subplots scaled same on Y axis.  This way bar heights are comparable across subplots.

            if ( inverse_RangeDirection ) {
                yaxis_Entry_range = [ yaxis_Entry_range_MaxValue, 0 ]  //  Reverse the 'range' so that the zero is at the top
            }

            const yaxis_Entry_Title_Text__Search_SubSearch_Label = yaxis_Entry_Title_Text__Search_SubSearch_Label__Array[ yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index ]
            if ( ! yaxis_Entry_Title_Text__Search_SubSearch_Label ) {
                const msg = "yaxis_Entry_Title_Text__Search_SubSearch_Label__Array[ plotTrace_Index ] returned NOTHING for yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index: " + yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index + ", yaxis_Entry_Title_Text__Search_SubSearch_Label__Array.length: " + yaxis_Entry_Title_Text__Search_SubSearch_Label__Array.length
                console.warn(msg)
                throw Error(msg)
            }

            //  Prepend Search Id or SubSearch Label
            // yaxis_Entry_Title_Text = yaxis_Entry_Title_Text__Search_SubSearch_Label + "<br>" + yaxis_Entry_Title_Text

            //  Append Search Id or SubSearch Label
            yaxis_Entry_Title_Text = yaxis_Entry_Title_Text + "<br>" + yaxis_Entry_Title_Text__Search_SubSearch_Label
        }

        const yaxis_Entry: Partial<Plotly.LayoutAxis> = {
            title: {
                text: yaxis_Entry_Title_Text
            },
            exponentformat: 'e',
            range: yaxis_Entry_range  //  Add so all subplots scaled same on Y axis.  This way bar heights are comparable across subplots.
        }

        return yaxis_Entry
    }



    let projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder = Array.from( projectSearchIds_Or_SubSearchIds_For_DisplayOrder )

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

        projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder = [ 1, 2 ]
    }



    let chart_Height = _CHART_HEIGHT

    if (
        projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length > 2
        && (
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
            !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT
        )
    ) {
        chart_Height += _CHART_HEIGHT_ADDITION_PER_TRACE * ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length - 2 )
    }

    const chart_Layout: Partial<Layout> = {
        title: {
            text: chartTitle
        },
        bargap: 0,  //  Default for Histogram.  Use as Override for Bar Chart to make look like histogram with zero gap between bars
        autosize: false,
        width: _CHART_WIDTH,
        height: chart_Height,
        xaxis: {
            title: {
                text: chart_X_Axis_Label
            },
            range: [ modMass_ChartDisplayRange_Min, modMass_ChartDisplayRange_Max ],

            exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
        },
        yaxis: get_yaxis_Entry_Fcn({ yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index: 0, inverse_RangeDirection: false }),

        // showlegend: true,
        legend: {
            // https://plotly.com/javascript/reference/#layout-legend-itemsizing
            itemsizing: 'constant' // Legend marker size will be constant
        },

        // annotations: [
        //
        //     //  Add  X-axis and Y-axis title using annotation
        //
        //     //  'x' and 'y' are in fractions of plotting area so problematic.
        //
        //     //     It is very easy to have too large of a negative number
        //     //     and then the text is outside the SVG viewport and NOT shown to the user.
        //
        //     // Master X-axis title using annotation
        //     {
        //         text: 'Master X-axis Title (Via Annotation)',
        //         x: 0.5,
        //         //  WAS y: -0.15, // Adjust this value to position the title below the bottom subplot
        //         y: -0.1, // Adjust this value to position the title below the bottom subplot
        //         xref: 'paper',
        //         yref: 'paper',
        //         showarrow: false,
        //         font: { size: 16 },
        //         xanchor: 'center',
        //         yanchor: 'bottom',
        //     },
        //     // Master Y-axis title using annotation
        //     {
        //         text: 'Master Y-axis Title (Via Annotation)',
        //         //  WAS:  x: -0.1, // Adjust this value to position the title to the left of the subplot grid
        //         x: -0.06, // Adjust this value to position the title to the left of the subplot grid
        //         y: 0.5,
        //         xref: 'paper',
        //         yref: 'paper',
        //         showarrow: false,
        //         font: { size: 16 },
        //         xanchor: 'left',
        //         yanchor: 'middle',
        //         // Rotate the text to be vertical
        //         textangle: (-90).toString(),
        //     },
        // ],
    }

    if ( ! modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {

        //  Add Center message that there is NO data

        chart_Layout.annotations = [
            {
                text: 'No modification data found for filters',
                //  Center
                x: 0.5,
                y: 0.5,
                xanchor: 'center',
                yanchor: 'middle',
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: { size: 24 },
                bgcolor: "white",
                borderpad: 20
            }
        ]
    }

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

        // Add Y Axis title, etc. for each subplot for 'yaxis2' 'yaxis3' ... ('yaxis' set above) since have subplots

        const plotTrace_Index_Start = 1 // Start at second search or sub search

        let outputCounter = 2

        for ( let yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index = plotTrace_Index_Start;
              yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index < projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length;
              yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index ++ ) {

            let inverse_RangeDirection = false

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots() ) {

                if ( projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length === 2 ) {
                    if ( outputCounter === 2 ) {

                        inverse_RangeDirection = true
                    }
                }
            }

            const objectProperty = 'yaxis' + outputCounter

            const yaxis_Entry = get_yaxis_Entry_Fcn({ yaxis_Entry_Title_Text__Search_SubSearch_Label__Array_Index, inverse_RangeDirection })

            // @ts-ignore
            chart_Layout[ objectProperty ] = yaxis_Entry

            outputCounter++
        }
    }


    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART ) {

        chart_Layout.barmode = 'stack'; //  Stack the bar charts
    }


    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {

        //  Chart Per Search or Sub Search

        const subplots: Array<string> = []

        // const subplots: Array<Array<string>> = []

        for ( let counter = 1; counter <= chart_Data.length; counter++ ) {   //  '<=' since start at '1'

            let subplot_Entry_Addition = ""
            if ( counter > 1 ) {
                subplot_Entry_Addition = counter.toString()
            }

            const subplot_Entry = "xy" + subplot_Entry_Addition

            subplots.push( subplot_Entry )

            // subplots.push( [ subplot_Entry ] )
        }

        chart_Layout.grid = {
            rows: projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length,
            columns: 1
            // yaxes: [ 'yaxis_0','yaxis_1', 'yaxis_2', 'yaxis_3' ],
            // pattern: 'independent',
            // subplots: [ 'xaxis_commonyaxis_0','xaxis_commonyaxis_1', 'xaxis_commonyaxis_2', 'xaxis_commonyaxis_3' ],
            // subplots:[ 'xy','xy2', 'xy3', 'xy4' ],
            // roworder: 'bottom to top'
        }

        chart_Layout.grid.subplots = subplots

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots()
            && projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length === 2 ) {

            //  ygap is a fraction of the vertical plot space as a gap between rows
            chart_Layout.grid.ygap = 0  //  ygap set to zero results in the zero lines are on top of each other BUT there are 2 Y axis labels so looks funny.
        }
    }


    const chart_config = qcPage_StandardChartConfig( { chartContainer_DOM_Element: data_viz_Histogram_container_DOMElement } );

    {
        if ( ! chart_config.modeBarButtonsToRemove ) {
            chart_config.modeBarButtonsToRemove = []
        }

        //  Remove from Mode Bar
        chart_config.modeBarButtonsToRemove.push(
            // 'pan2d',
            // 'zoom2d','zoomIn2d', 'zoomOut2d',
            'lasso2d', 'select2d',
            // 'autoScale2d', 'resetViews', 'resetScale2d'
        )
    }

    if ( saved_Chart_Layout__dragmode ) {

        chart_Layout.dragmode = saved_Chart_Layout__dragmode  //  Zoom vs Pan
    }

    data_viz_Histogram_container_DOMElement.style.height = chart_Layout.height + "px"

    const newPlotResulting_Promise = Plotly.newPlot(
        data_viz_Histogram_container_DOMElement,
        chart_Data,
        chart_Layout,
        chart_config
    )

    //  This does NOT show up in the download even though it shows up on the page so COMMENTED OUT.

    // newPlotResulting_Promise.then( value => { try {
    //
    //     //  This does NOT show up in the download even though it shows up on the page so COMMENTED OUT.
    //
    //     // Directly add a Y Axis label to the first <svg>.
    //
    //     //   Directly add to avoid the Plotly approach of specifying a fraction as a measurement since that seems problematic.
    //
    //     const svg_Elements_All = data_viz_Histogram_container_DOMElement.querySelectorAll("svg")
    //
    //     let svg_Element: Element = undefined
    //
    //     {
    //         let found_svg_Element = 0
    //
    //         for ( const child of svg_Elements_All ) {
    //
    //             for ( const classItem of child.classList ) {
    //                 if ( classItem === "main-svg" ) {
    //
    //                     svg_Element = child
    //
    //                     found_svg_Element++
    //
    //                     break
    //                 }
    //             }
    //             if ( svg_Element && found_svg_Element === 1 ) {
    //                 break
    //             }
    //         }
    //     }
    //
    //     const svg_Elements_All_length = svg_Elements_All.length
    //
    //     // const svg_Element = svg_Elements_All[ 1 ]
    //
    //     const svgNS = "http://www.w3.org/2000/svg";
    //     const textElement = document.createElementNS(svgNS, "text");
    //
    //     const textElement_X = - ( chart_Height / 2 )
    //     const textElement_Y = 20
    //
    //     textElement.setAttribute("x", textElement_X.toString() ); // X-coordinate for the text
    //     textElement.setAttribute("y", textElement_Y.toString() ); // Y-coordinate for the text
    //     textElement.setAttribute("font-size", "20"); // Font size
    //     textElement.setAttribute("fill", "rgb(68, 68, 68)"); // Text color --  Color Copied from some text that Plotly added
    //     textElement.setAttribute("text-anchor", "middle"); // Text color
    //     textElement.setAttribute("transform", "rotate(-90)"); // Rotate
    //     // You can add other attributes like 'text-anchor', 'dominant-baseline', etc.
    //
    //     //  Text assigned
    //     textElement.textContent = "Y Axis Label Added Directly to SVG by Limelight Code";
    //
    //     svg_Element.appendChild( textElement )
    //
    // } catch( e ) {
    //     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //     throw e;
    // }})

    //  Register callback on user selects zoom area in chart
    {
        const data_viz_Histogram_container_DOMElement_AS_Any = data_viz_Histogram_container_DOMElement as any

        //   'on' is added to DOM Element by Plotly
        data_viz_Histogram_container_DOMElement_AS_Any.on("plotly_relayout", (eventdata: any) => {
            try {
                // const plot_width = chart_Layout.width;
                //
                // let newMarkerSize: number = undefined;

                // Check for the presence of a 'dragmode' property in the event data
                if (eventdata['dragmode'] !== undefined) {
                    saved_Chart_Layout__dragmode = eventdata[ 'dragmode' ];   //  Zoom vs Pan

                    if ( saved_Chart_Layout__dragmode === 'pan' ) {
                        console.log( 'User switched to the pan tool.' );
                    } else {
                        console.log( `User switched to: ${ saved_Chart_Layout__dragmode }` );
                    }
                }

                if ( eventdata["xaxis.autorange"] || eventdata["xaxis.range"] ) {

                    //  User clicked on the icon for 'Autoscale' (first value in 'if') or 'Reset Axes' (second value in 'if')

                    //  Reset Mod Mass Min/Max selection

                    modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )
                    modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )

                    updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()

                    return // EARLY RETURN
                }

                if (eventdata["xaxis.range[1]"] !== undefined) {

                    //  Selected Range  - X axis is Retention Time in Minutes.  Y axis is m/z

                    const xaxis_range_0 = eventdata["xaxis.range[0]"];
                    const xaxis_range_1 = eventdata["xaxis.range[1]"];

                    // let do_Floor_Ceil = true
                    //
                    // {
                    //     const _do_Floor_Ceil_MAX_DIFFERENCE = 0.1
                    //
                    //     const xaxis_range_0__xaxis_range_1__Difference = Math.abs( xaxis_range_1 - xaxis_range_0 )
                    //     if ( xaxis_range_0__xaxis_range_1__Difference < _do_Floor_Ceil_MAX_DIFFERENCE ) {
                    //
                    //         // do_Floor_Ceil = false
                    //     }
                    // }

                    // const _SELECT_RANGE_SIGNIFICANT_DIGIT_COUNT = 5
                    //
                    // const _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER = Math.pow( 10, _SELECT_RANGE_SIGNIFICANT_DIGIT_COUNT )

                    {
                        const modMass_Min_Across_All_Searches = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax()

                        let modMassCutoffMin_UserSelection_NewValue = xaxis_range_0

                        // if ( do_Floor_Ceil ) {
                        //
                        //     modMassCutoffMin_UserSelection_NewValue = Math.floor( xaxis_range_0 * _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER ) / _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER
                        // }

                        if ( modMassCutoffMin_UserSelection_NewValue < modMass_Min_Across_All_Searches ) {

                            modMassCutoffMin_UserSelection_NewValue = undefined  // Clear since zoomed out past min value
                        }

                        modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMin_UserSelection_NewValue )
                    }

                    {
                        const modMass_Max_Across_All_Searches = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax()

                        let modMassCutoffMax_UserSelection_NewValue = xaxis_range_1

                        // if ( do_Floor_Ceil ) {
                        //
                        //     modMassCutoffMax_UserSelection_NewValue = Math.ceil( xaxis_range_1 * _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER ) / _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER
                        // }

                        if ( modMassCutoffMax_UserSelection_NewValue > modMass_Max_Across_All_Searches ) {

                            modMassCutoffMax_UserSelection_NewValue = undefined  // Clear since zoomed out past min value
                        }

                        modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMax_UserSelection_NewValue )
                    }

                    updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()

                    // const yaxis_range_0 = eventdata["yaxis.range[0]"];
                    // const yaxis_range_1 = eventdata["yaxis.range[1]"];

                    // this._selectedChartArea = {
                    //     x_Axis_Start: xaxis_range_0,
                    //     x_Axis_End: xaxis_range_1,
                    //     y_Axis_Start: yaxis_range_0,
                    //     y_Axis_End: yaxis_range_1
                    // }

                    return // EARLY RETURN
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    if (
        (
            show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count
            &&
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
        )
        ||
        (
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram()
            &&
            projectSearchIds_Or_SubSearchIds_Or_GroupId_For_DisplayOrder.length === 2
            &&
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
        )
    ) {

        _plot__data_viz_Histogram_Difference_Plot_container_DOMElement( {
            data_viz_Histogram_Difference_Plot_container_DOMElement,
            label_Start_PSM_Or_Scan,

            binCount,

            chart_X__All,
            chart_Y__All_UnClippedValues,
            chart_Bars_Tooltips_Parts__All,

            trace_Parts_All,

            modMass_ChartDisplayRange_Min,
            modMass_ChartDisplayRange_Max,

            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,

            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

            updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
        } )
    }

} catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

/////

/**
 *  Histogram Difference Plot
 */
const _plot__data_viz_Histogram_Difference_Plot_container_DOMElement = function(
    {
        data_viz_Histogram_Difference_Plot_container_DOMElement,
        label_Start_PSM_Or_Scan,

        binCount,

        chart_X__All,
        chart_Y__All_UnClippedValues,
        chart_Bars_Tooltips_Parts__All,

        trace_Parts_All,

        modMass_ChartDisplayRange_Min,
        modMass_ChartDisplayRange_Max,

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        data_viz_Histogram_Difference_Plot_container_DOMElement: HTMLDivElement

        label_Start_PSM_Or_Scan: string

        binCount: number

        chart_X__All: Array<Array<number>>
        chart_Y__All_UnClippedValues: Array<Array<number>>


        chart_Bars_Tooltips_Parts__All: Array<{
            binStart: number
            binEnd: number
        }>

        trace_Parts_All: Array<{
            traceName_String: string
            searchName_SubSearchName_TooltipText: string
        }>

        modMass_ChartDisplayRange_Min: number
        modMass_ChartDisplayRange_Max: number

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void
    }
) {

    if ( chart_X__All.length !== 2 || chart_Y__All_UnClippedValues.length !== 2 ) {
        const msg = "( chart_X__All.length !== 2 || chart_Y__All_UnClippedValues.length !== 2 ): chart_X__All.length: " + chart_X__All.length + ", chart_Y__All_UnClippedValues.length: " + chart_Y__All_UnClippedValues.length
        console.warn(msg)
        throw Error(msg)
    }
    if ( chart_Y__All_UnClippedValues[ 0 ].length !== chart_X__All[ 1 ].length ) {
        const msg = "( chart_X__All[ 0 ].length !== chart_X__All[ 1 ].length ): chart_X__All[ 0 ].length: " + chart_X__All[ 0 ].length + ", chart_X__All[ 1 ].length: " + chart_X__All[ 1 ].length
        console.warn(msg)
        throw Error(msg)
    }
    if ( chart_Y__All_UnClippedValues[ 0 ].length !== chart_Y__All_UnClippedValues[ 1 ].length ) {
        const msg = "( chart_Y__All_UnClippedValues[ 0 ].length !== chart_Y__All_UnClippedValues[ 1 ].length ): chart_Y__All_UnClippedValues[ 0 ].length: " + chart_Y__All_UnClippedValues[ 0 ].length + ", chart_Y__All_UnClippedValues[ 1 ].length: " + chart_Y__All_UnClippedValues[ 1 ].length
        console.warn(msg)
        throw Error(msg)
    }
    if ( chart_X__All[ 0 ].length !== chart_Y__All_UnClippedValues[ 1 ].length ) {
        const msg = "( chart_X__All[ 0 ].length !== chart_Y__All_UnClippedValues[ 1 ].length ): chart_X__All[ 0 ].length: " + chart_X__All[ 0 ].length + ", chart_Y__All_UnClippedValues[ 1 ].length: " + chart_Y__All_UnClippedValues[ 1 ].length
        console.warn(msg)
        throw Error(msg)
    }

    {
        //  Validate chart_X values are same

        const chart_X__0 = chart_X__All[ 0 ]
        const chart_X__1 = chart_X__All[ 1 ]

        for ( let index = 0; index < chart_X__0.length; index++ ) {
            if ( chart_X__0[ index ] !== chart_X__1[ index ] ) {
                const msg = "( chart_X__0[ index ] !== chart_X__1[ index ] ): chart_X__0[ index ]: " + chart_X__0[ index ] + ", chart_X__1[ index ]: " + chart_X__1[ index ]
                console.warn(msg)
                throw Error(msg)
            }
            if ( chart_X__0[ index ] === undefined || chart_X__1[ index ] === undefined ) {
                const msg = "( chart_X__0[ index ] === undefined || chart_X__1[ index ] === undefined ): chart_X__0[ index ]: " + chart_X__0[ index ] + ", chart_X__1[ index ]: " + chart_X__1[ index ] + ", index: " + index
                console.warn(msg)
                throw Error(msg)
            }
        }
    }


    const chart_Data: Array<Plotly.Data> = []

    // let maxBar_Y_Value = 0

    ////////////

    //  Create bars in bar chart from binned data

    let differences_ALL_ZERO = true

    const chart_X: Array<number> = chart_X__All[ 0 ]

    const chart_Y__1: Array<number> = []
    const chart_Bars_Tooltips__1: Array<string> = []

    const chart_Y__2: Array<number> = []
    const chart_Bars_Tooltips__2: Array<string> = []

    for ( let index = 0; index < chart_X__All[0].length; index++ ) {

        const chart_Y_Value_0 = chart_Y__All_UnClippedValues[ 0 ][ index ]
        const chart_Y_Value_1 = chart_Y__All_UnClippedValues[ 1 ][ index ]

        if ( chart_Y_Value_0 === undefined || chart_Y_Value_1 === undefined ) {
            const msg = "( chart_Y_Value_0 === undefined || chart_Y_Value_1 === undefined ): index: " + index
            console.warn(msg)
            throw Error(msg)
        }

        const difference = chart_Y_Value_0 - chart_Y_Value_1

        let difference_PossiblyClipped = difference

        {
            const histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

            if ( histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined
                && histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== null ) {

                //  Clip positive value
                if ( difference_PossiblyClipped > histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) {
                    difference_PossiblyClipped = histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
                }
                //  Clip negative value
                if ( difference_PossiblyClipped < ( - histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY ) ) {
                    difference_PossiblyClipped = ( - histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY )
                }
            }
        }

        let chart_Bar_Tooltip_Main: string = ""

        const chart_Bar_TooltipParts = chart_Bars_Tooltips_Parts__All[ index ]

        if ( chart_Bar_TooltipParts ) {

            const binStart = chart_Bar_TooltipParts.binStart    // chart_X_Value - ( binSize / 2 )
            const binEnd = chart_Bar_TooltipParts.binEnd        // chart_X_Value + ( binSize / 2 )

            chart_Bar_Tooltip_Main = "<br><b>Mod Mass Range </b>: " + binStart + " to " + binEnd +
                "<br><b>" + label_Start_PSM_Or_Scan + " Count Difference</b>: " + difference.toLocaleString();
        }

        if ( difference > 0 ) {

            differences_ALL_ZERO = false

            chart_Y__1.push( difference_PossiblyClipped );

            chart_Y__2.push( 0 ); // Nothing for trace 2.  Need to add to take up X axis area so surrounding bars are correct width.

            const searchName_SubSearchName_TooltipText = trace_Parts_All[ 0 ].searchName_SubSearchName_TooltipText

            const chart_Bar_Tooltip = searchName_SubSearchName_TooltipText + chart_Bar_Tooltip_Main

            chart_Bars_Tooltips__1.push( chart_Bar_Tooltip );
            chart_Bars_Tooltips__2.push( chart_Bar_Tooltip );

        } else  if ( difference < 0 ) {

            differences_ALL_ZERO = false

            chart_Y__1.push( 0 ); // Nothing for trace 1.  Need to add to take up X axis area so surrounding bars are correct width.

            chart_Y__2.push( difference_PossiblyClipped );

            const searchName_SubSearchName_TooltipText = trace_Parts_All[ 1 ].searchName_SubSearchName_TooltipText

            const chart_Bar_Tooltip = searchName_SubSearchName_TooltipText + chart_Bar_Tooltip_Main

            chart_Bars_Tooltips__1.push( chart_Bar_Tooltip );
            chart_Bars_Tooltips__2.push( chart_Bar_Tooltip );
        } else {

            //  Difference is zero

            chart_Y__1.push( 0 );
            chart_Y__2.push( 0 );

            chart_Bars_Tooltips__1.push( "" );
            chart_Bars_Tooltips__2.push( "" );
        }
    }

    //  Colors for Bars
    const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories( { categoryCount: 2 } );

    {
        const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index( 0 );

        const traceName_String = trace_Parts_All[ 0 ].traceName_String

        const chart_Data_Entry: Plotly.Data = {
            name: traceName_String,
            type: 'bar',
            x: chart_X,
            y: chart_Y__1,
            // text: chart_Bars_labels, //  Text put on each bar
            hoverinfo: "text", //  Hover contents
            hovertext: chart_Bars_Tooltips__1,  //  Hover contents per bar
            marker: {
                color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
            }
        }

        if ( binCount === 1 ) {

            //  Bar chart has exactly 1 entry

            //  Set bar X to be the center of Min to Max of Display Range

            chart_X[ 0 ] = modMass_ChartDisplayRange_Min + ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.5 )

            //  Set bar width to extend from Min to Max of Display Range

            const barWidth = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min )

            chart_Data_Entry.width = [ barWidth ]
        }

        chart_Data.push( chart_Data_Entry )
    }
    {
        const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index( 1 );

        const traceName_String = trace_Parts_All[ 1 ].traceName_String

        const chart_Data_Entry: Plotly.Data = {
            name: traceName_String,
            type: 'bar',
            x: chart_X,
            y: chart_Y__2,
            // text: chart_Bars_labels, //  Text put on each bar
            hoverinfo: "text", //  Hover contents
            hovertext: chart_Bars_Tooltips__2,  //  Hover contents per bar
            marker: {
                color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
            }
        }

        if ( binCount === 1 ) {

            //  Bar chart has exactly 1 entry

            //  Set bar X to be the center of Min to Max of Display Range

            chart_X[ 0 ] = modMass_ChartDisplayRange_Min + ( ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min ) * 0.5 )

            //  Set bar width to extend from Min to Max of Display Range

            const barWidth = ( modMass_ChartDisplayRange_Max - modMass_ChartDisplayRange_Min )

            chart_Data_Entry.width = [ barWidth ]
        }

        chart_Data.push( chart_Data_Entry )
    }



    let chartTitle_SecondLine = ""

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
        && all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== null ) {

        chartTitle_SecondLine =
            "<br>" +
            "<sup>" +
            "Note: " +
            label_Start_PSM_Or_Scan +
            " Count Difference bar height clipped at " +
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY().toLocaleString() +
            "</sup>"
    }

    const chartTitle = label_Start_PSM_Or_Scan + " Count Difference vs/ Mod Mass" + chartTitle_SecondLine

    const chart_X_Axis_Label = "Mod Mass"
    const chart_Y_Axis_Label = label_Start_PSM_Or_Scan + " Count Difference"


    const chart_Layout: Partial<Layout> = {
        title: {
            text: chartTitle
        },
        bargap: 0,  //  Default for Histogram.  Use as Override for Bar Chart to make look like histogram with zero gap between bars
        autosize: false,
        width: _CHART_WIDTH,
        height: _CHART_HEIGHT,
        xaxis: {
            title: {
                text: chart_X_Axis_Label
            },
            range: [ modMass_ChartDisplayRange_Min, modMass_ChartDisplayRange_Max ],

            exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
        },
        yaxis: {
            title: {
                text: chart_Y_Axis_Label
            },
            exponentformat: 'e'
        },

        //  "Filtered" bars 'overlay' "Unfiltered" bars
        barmode: "overlay",


        // showlegend: true,
        legend: {
            // https://plotly.com/javascript/reference/#layout-legend-itemsizing
            itemsizing: 'constant' // Legend marker size will be constant
        }
    }

    if ( differences_ALL_ZERO ) {


        //  Add Center message that there is NO data

        chart_Layout.annotations = [
            {
                text: 'No differences found',
                //  Center
                x: 0.5,
                y: 0.5,
                xanchor: 'center',
                yanchor: 'middle',
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: { size: 24 },
                bgcolor: "white",
                borderpad: 20
            }
        ]
    }


    const chart_config = qcPage_StandardChartConfig( { chartContainer_DOM_Element: data_viz_Histogram_Difference_Plot_container_DOMElement } );

    {
        if ( ! chart_config.modeBarButtonsToRemove ) {
            chart_config.modeBarButtonsToRemove = []
        }

        //  Remove from Mode Bar
        chart_config.modeBarButtonsToRemove.push(
            // 'pan2d',
            // 'zoom2d','zoomIn2d', 'zoomOut2d',
            'lasso2d', 'select2d',
            // 'autoScale2d', 'resetViews', 'resetScale2d'
        )
    }

    const newDifferencePlotResulting_Promise = Plotly.newPlot(
        data_viz_Histogram_Difference_Plot_container_DOMElement,
        chart_Data,
        chart_Layout,
        chart_config
    )


    //  Register callback on user selects zoom area in chart
    {
        const data_viz_Histogram_Difference_Plot_container_DOMElement_AS_Any = data_viz_Histogram_Difference_Plot_container_DOMElement as any

        //   'on' is added to DOM Element by Plotly
        data_viz_Histogram_Difference_Plot_container_DOMElement_AS_Any.on("plotly_relayout", (eventdata: any) => {
            try {
                // const plot_width = chart_Layout.width;
                //
                // let newMarkerSize: number = undefined;

                // Check for the presence of a 'dragmode' property in the event data
                if (eventdata['dragmode'] !== undefined) {
                    saved_Chart_Layout__dragmode = eventdata[ 'dragmode' ];   //  Zoom vs Pan

                    if ( saved_Chart_Layout__dragmode === 'pan' ) {
                        console.log( 'User switched to the pan tool.' );
                    } else {
                        console.log( `User switched to: ${ saved_Chart_Layout__dragmode }` );
                    }
                }

                if ( eventdata["xaxis.autorange"] || eventdata["xaxis.range"] ) {

                    //  User clicked on the icon for 'Autoscale' (first value in 'if') or 'Reset Axes' (second value in 'if')

                    //  Reset Mod Mass Min/Max selection

                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )

                    updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()

                    return // EARLY RETURN
                }

                if (eventdata["xaxis.range[1]"] !== undefined) {

                    //  Selected Range  - X axis is Retention Time in Minutes.  Y axis is m/z

                    const xaxis_range_0 = eventdata["xaxis.range[0]"];
                    const xaxis_range_1 = eventdata["xaxis.range[1]"];

                    // let do_Floor_Ceil = true
                    //
                    // {
                    //     const _do_Floor_Ceil_MAX_DIFFERENCE = 0.1
                    //
                    //     const xaxis_range_0__xaxis_range_1__Difference = Math.abs( xaxis_range_1 - xaxis_range_0 )
                    //     if ( xaxis_range_0__xaxis_range_1__Difference < _do_Floor_Ceil_MAX_DIFFERENCE ) {
                    //
                    //         // do_Floor_Ceil = false
                    //     }
                    // }

                    // const _SELECT_RANGE_SIGNIFICANT_DIGIT_COUNT = 5
                    //
                    // const _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER = Math.pow( 10, _SELECT_RANGE_SIGNIFICANT_DIGIT_COUNT )

                    {
                        const modMass_Min_Across_All_Searches = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax()

                        let modMassCutoffMin_UserSelection_NewValue = xaxis_range_0

                        // if ( do_Floor_Ceil ) {
                        //
                        //     modMassCutoffMin_UserSelection_NewValue = Math.floor( xaxis_range_0 * _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER ) / _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER
                        // }

                        if ( modMassCutoffMin_UserSelection_NewValue < modMass_Min_Across_All_Searches ) {

                            modMassCutoffMin_UserSelection_NewValue = undefined  // Clear since zoomed out past min value
                        }

                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMin_UserSelection_NewValue )
                    }

                    {
                        const modMass_Max_Across_All_Searches = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax()

                        let modMassCutoffMax_UserSelection_NewValue = xaxis_range_1

                        // if ( do_Floor_Ceil ) {
                        //
                        //     modMassCutoffMax_UserSelection_NewValue = Math.ceil( xaxis_range_1 * _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER ) / _SELECT_RANGE_SIGNIFICANT_MULTIPLIER_DIVIDER
                        // }

                        if ( modMassCutoffMax_UserSelection_NewValue > modMass_Max_Across_All_Searches ) {

                            modMassCutoffMax_UserSelection_NewValue = undefined  // Clear since zoomed out past min value
                        }

                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMax_UserSelection_NewValue )
                    }

                    updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()

                    // const yaxis_range_0 = eventdata["yaxis.range[0]"];
                    // const yaxis_range_1 = eventdata["yaxis.range[1]"];

                    // this._selectedChartArea = {
                    //     x_Axis_Start: xaxis_range_0,
                    //     x_Axis_End: xaxis_range_1,
                    //     y_Axis_Start: yaxis_range_0,
                    //     y_Axis_End: yaxis_range_1
                    // }

                    return // EARLY RETURN
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

}


//////////////////

/**
 *
 * @param sortedModMasses
 * @param all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
 */
const _getSortedModsToDisplay = function ({ sortedModMasses, all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root } : {

    sortedModMasses: ReadonlyArray<number>
    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
}) : ReadonlyArray<number> {

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    // console.log('called getSortedModsToDisplay()');
    // console.log('sortedModMasses', sortedModMasses);
    // console.log('modMasses_ProjectSearchIds_Visualization_Selections_Root', modMasses_ProjectSearchIds_Visualization_Selections_Root );

    if ( ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root )
        || ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) ) {

        return sortedModMasses; // EARLY RETURN
    }

    let sortedModsToDisplay : Array<number> = [ ];
    for( const modMass of sortedModMasses ) {

        for ( const projectSearchId of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_Selection_ProjectSearchIds() ) {
            if ( modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId(projectSearchId).has(modMass) ) {
                sortedModsToDisplay.push(modMass);
                break;
            }
        }
    }

    return sortedModsToDisplay;
}