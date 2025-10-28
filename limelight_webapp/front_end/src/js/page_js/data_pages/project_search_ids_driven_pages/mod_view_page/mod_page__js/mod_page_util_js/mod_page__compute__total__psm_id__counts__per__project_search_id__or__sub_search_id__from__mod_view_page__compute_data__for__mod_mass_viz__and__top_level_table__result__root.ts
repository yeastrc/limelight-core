/**
 * modPage_Compute_TotalPsmIdCounts_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.ts
 */
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";


export class ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: ReadonlyMap<number, ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId>
}

export class ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId {

    readonly projectSearchId_Or_SubSearchId: number

    /**
     * Includes counts for "unmodified" PSMs when ( ! ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin() !== undefined || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax() !== undefined ) )
     */
    readonly psmIds_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters_Set: ReadonlySet<number>

    /**
     * Includes counts for "unmodified" PSMs when ( ! ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin() !== undefined || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax() !== undefined ) )
     */
    readonly uniquePsmIdCount_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters: number
}

/**
 *
 * @param computeData_For_ModMassViz_And_TopLevelTable_Result_Root
 */
export const modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (
    {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root, modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    }
) : ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    //   Intermediate Result
    const psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Set<number>> = new Map()


    // ONLY if NOT ( "Min and max mod masses:" either has a value )

    let no_MinMax_Filters = false

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

        if ( ! (
            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined
            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined
        ) ) {
            no_MinMax_Filters = true
        }

    } else if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM ) {

        if ( ! (
            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
        ) ) {
            no_MinMax_Filters = true
        }

    } else {
        const msg = "Unexpected value for modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab(): " + modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        console.warn(msg)
        throw Error(msg)
    }



    if ( no_MinMax_Filters ) {

        // ONLY if NOT ( "Min and max mod masses:" either has a value )

        //  Add in values for "Unmodified PSMs" including PSMs where had open modifications but the open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked (checked by default)

        //  Since 'open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked' are treated as unmodified, whether or not they are unlocalized is ignored re-guarding filtering "Exclude unlocalized mods:"

        for ( const psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry of computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId() ) {

            const projectSearchId_Or_SubSearchId = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry[ 0 ]
            const psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry[ 1 ]

            let psmId_Set = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! psmId_Set ) {
                psmId_Set = new Set()
                psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, psmId_Set )
            }

            for ( const psmTblData of psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map.values() ) {
                psmId_Set.add( psmTblData.psmId )
            }
        }
    }

    for ( const dataFor_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const dataFor_ProjectSearchId_Or_SubSearchId of dataFor_ModMass.get_Data_AllValues() ) {

            const projectSearchId_Or_SubSearchId = dataFor_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

            let psmId_Set = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! psmId_Set ) {
                psmId_Set = new Set()
                psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, psmId_Set )
            }

            for ( const psmId of dataFor_ProjectSearchId_Or_SubSearchId.get_PsmIds() ) {
                psmId_Set.add( psmId )
            }
        }
    }

    const result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId> = new Map()

    for ( const psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry of psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.entries() ) {

        const projectSearchId_Or_SubSearchId = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry[ 0 ]
        const psmId_Set = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry[ 1 ]

        const resultEntry : ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId = {

            projectSearchId_Or_SubSearchId,
            psmIds_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters_Set: psmId_Set,
            uniquePsmIdCount_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters: psmId_Set.size
        }
        result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, resultEntry )
    }

    return {
        result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId
    }
}
