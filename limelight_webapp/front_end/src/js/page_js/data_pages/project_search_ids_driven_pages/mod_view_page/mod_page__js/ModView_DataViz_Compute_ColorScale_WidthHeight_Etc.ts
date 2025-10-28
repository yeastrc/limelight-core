/**
 * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc.ts
 */


import * as d3 from "d3";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";


// some defaults for the viz

export const ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS = {

    margin: { top: 60, right: 30, bottom: 78, left: 5 }, // 'left' changed to remove the search labels and color bar label on the left (Those were moved to HTML).  WAS:  margin: { top: 60, right: 30, bottom: 78, left: 300 },
    widthDefs: { default: 1000, min: 3, max: 40 },
    heightDefs: { default: 500, min: 40, max: 40 },

    // legend defs
    legendHeight: 40,
    minLegendWidth: 400,

    // label defs
    /**
     * font size (in pixels) of labels
     */
    labelFontSize: 14,
    label_FontFamily: 'sans-serif',
    /**
     * max # of characters in a search label before truncation
     */
    maxSearchLabelLength: 44,

    /**
     * Margin between the Color Scale Legend and the main modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height above it
     */
    colorScaleLegend_TopMargin: 10

} as const


export class ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result {
    colorScale: any
    xScale: any //  Usage sometimes passes a number to for now use 'any'. IDE reports it is: string[] & d3.ScaleBand<string>
    yScale: any //  Usage sometimes passes a number to for now use 'any'. IDE reports it is: string[] & d3.ScaleBand<string>
    minValue_ForViz: number
    maxValue_ForViz: number
    width: number
    height: number
    modMatrix: INTERNAL__ModMatrix  //  Used by the code that uses D3 to generate the Mod Mass Visualization Graphic
    sortedModMasses: ReadonlyArray<number>
}

export const modView_DataViz_Compute_ColorScale_WidthHeight_Etc = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
        modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>

        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    }
): ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result {

    const sortedModMasses = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_ModMass_Values_OrderedArray()

    let minValue_ForViz = 0;

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() !== undefined
            && ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY()
                !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) ) {

            minValue_ForViz = _getMin_topLevelTable_DisplayValue_AcrossAll_ModMasses_All_ProjectSearchIds_Or_SubSearchIds( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modViewPage_DataVizOptions_VizSelections_PageStateManager )
        }
    }

    let maxValue_ForViz = _getMax_topLevelTable_DisplayValue_Or_UserEntered_MaxColorPsmCount_Or_MaxColorRatio( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modViewPage_DataVizOptions_VizSelections_PageStateManager )

    // make min and max count symmetrical if zscore is enabled

    //   This code was reviewed and appears to be functioning properly for all values of "get_dataTransformation()" on 4/2/2025

    //  Code was:
    // if( vizOptionsData.data.dataTransformation !== undefined
    //     && vizOptionsData.data.dataTransformation !== 'none') {
    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() !== undefined
            && ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY()
                !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) ) {

            if ( Math.abs( minValue_ForViz ) > maxValue_ForViz ) {

                maxValue_ForViz = Math.abs(minValue_ForViz);

            } else if ( maxValue_ForViz > Math.abs( minValue_ForViz ) ) {

                minValue_ForViz = -1 * maxValue_ForViz;
            }
        }
    }


    const width = _getWidth({sortedModMasses});
    const height = _getHeight({ projectSearchIds_Or_SubSearchIds_For_DisplayOrder });

    // set up our scales
    let xScale = d3.scaleBand()
        // @ts-ignore  -- Typescript types for '.domain(...)' is Array<string>
        .domain(sortedModMasses)
        .range([0,width]);

    let yScale = d3.scaleBand()
        // @ts-ignore  -- Typescript types for '.domain(...)' is Array<string>
        .domain(projectSearchIds_Or_SubSearchIds_For_DisplayOrder)
        .range([0, height]);

    let colorScale: any  // treated as a function in code below so unknown what the type is since ".range(" returns an array per d3 Typescript types

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP
        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() !== undefined
        && ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY()
            !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf
            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() ===
            ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh ) {

            minValue_ForViz = 0;
            maxValue_ForViz = 1;

            colorScale = d3.scalePow()
                .exponent(0.25)
                .domain([1, 0.05, 0])
                //  Typescript types for '.range(...)' is Array<number>
                // @ts-ignore
                .range(["white", "#57c4ad", "#006164"]);
        } else {

            colorScale = d3.scalePow()
                .exponent(1.4)
                .domain([minValue_ForViz, minValue_ForViz / 2, 0, maxValue_ForViz / 2, maxValue_ForViz])
                //  Typescript types for '.range(...)' is Array<number>
                // @ts-ignore
                .range(["#db4325", "#eda247", "white", "#57c4ad", "#006164"]);
        }
    } else {
        //const logScale = d3.scaleSqrt().domain([minCount, maxCount]);
        //colorScale = d3.scaleSequential((d) => d3.interpolatePlasma(logScale(d)));

        colorScale = d3.scaleLinear()
            .domain([0, maxValue_ForViz/2, maxValue_ForViz])
            //  Typescript types for '.range(...)' is Array<number>
            // @ts-ignore
            .range(["white", "#57c4ad", "#006164"]);
    }

    const modMatrix: INTERNAL__ModMatrix = _getModMatrix({
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, minValue_ForViz, maxValue_ForViz
    });

    const result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result = {
        colorScale, xScale, yScale, minValue_ForViz, maxValue_ForViz, width, height,
        modMatrix,
        sortedModMasses
    }

    return result
}


const _getWidth = function ({sortedModMasses}: { sortedModMasses: ReadonlyArray<number>}) {

    let width = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.widthDefs.default + 0;

    // adjust width as necessary
    if(width < sortedModMasses.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.widthDefs.min) {
        width = sortedModMasses.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.widthDefs.min;
    } else if(width > sortedModMasses.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.widthDefs.max) {
        width = sortedModMasses.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.widthDefs.max;
    }

    if( width < ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.minLegendWidth ) {
        width = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.minLegendWidth;
    }

    // adjust to be an integer multiple of the number of mod masses
    // done in an effort to avoid white space between rects
    width = Math.round( width / sortedModMasses.length) * sortedModMasses.length;

    return width;
}

const _getHeight = function ({projectSearchIds_Or_SubSearchIds_For_DisplayOrder}: { projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number> }) {

    let height = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.default;

    // adjust width as necessary
    if(height < projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.min) {
        height = projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.min;
    } else if(height > projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.max) {
        height = projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.max;
    }

    return height;
}



const _getMin_topLevelTable_DisplayValue_AcrossAll_ModMasses_All_ProjectSearchIds_Or_SubSearchIds = function (

    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
) {

    let min_topLevelTable_DisplayValue = 0

    for ( const entry_ForSingle_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const entry_ForSingle_ProjectSearchId_Or_SubSearchId of entry_ForSingle_ModMass.get_Data_AllValues() ) {

            const topLevelTable_DisplayValue = entry_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            if ( min_topLevelTable_DisplayValue > topLevelTable_DisplayValue ) {
                min_topLevelTable_DisplayValue = topLevelTable_DisplayValue
            }
        }
    }

    return min_topLevelTable_DisplayValue
}

/**
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 */
const _getMax_topLevelTable_DisplayValue_Or_UserEntered_MaxColorPsmCount_Or_MaxColorRatio = function (

    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager) {

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios
            && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined ) {

            //  Displaying Ratios so return User Entered Max Color Cutoff Ratio
            return modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY()  // EARLY RETURN
        }

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
            && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined ) {

            //  Displaying Counts so return User Entered Max Color Cutoff Count
            return modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY()  // EARLY RETURN
        }
    }

    let max_topLevelTable_DisplayValue = 0

    for ( const entry_ForSingle_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const entry_ForSingle_ProjectSearchId_Or_SubSearchId of entry_ForSingle_ModMass.get_Data_AllValues() ) {

            const topLevelTable_DisplayValue = entry_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            if ( max_topLevelTable_DisplayValue < topLevelTable_DisplayValue ) {
                max_topLevelTable_DisplayValue = topLevelTable_DisplayValue
            }
        }
    }

    return max_topLevelTable_DisplayValue
}


const _getModMatrix = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, minValue_ForViz, maxValue_ForViz
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>

        minValue_ForViz: number
        maxValue_ForViz: number

    }) : INTERNAL__ModMatrix {

    const modMatrix: INTERNAL__ModMatrix /* Array<Array<INTERNAL__ModMatrix_Entry>> */ = Array( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_ModMass_Values_OrderedArray().length );

    const sortedModMasses = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_ModMass_Values_OrderedArray()

    let modMass_Index = 0;

    for ( const modMass of sortedModMasses ) {

        modMatrix[modMass_Index] = Array(projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length);

        let search_Or_SubSearch_Index = 0;

        for ( const projectSearchId_Or_SubSearchId of projectSearchIds_Or_SubSearchIds_For_DisplayOrder ) {

            let found_For_ModMass_ProjectSearchId = false

            const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )
            if ( data_For_ModMass ) {

                const data_For__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    const topLevelTable_DisplayValue = data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

                    let topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale = topLevelTable_DisplayValue

                    //  Clamp to min/max
                    if ( topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale < minValue_ForViz ) {
                        topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale = minValue_ForViz
                    }
                    if ( topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale > maxValue_ForViz ) {
                        topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale = maxValue_ForViz
                    }

                    modMatrix[modMass_Index][search_Or_SubSearch_Index] = {
                        topLevelTable_DisplayValue,
                        topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale,
                        projectSearchId_OR_SubSearchId: projectSearchId_Or_SubSearchId,
                        modMass: modMass,
                        minValue_ForViz,
                        maxValue_ForViz
                        // search_Or_SubSearch_Index: search_Or_SubSearch_Index,
                        // modMassIndex: modMass_Index
                    };

                    found_For_ModMass_ProjectSearchId = true
                }
            }

            if ( ! found_For_ModMass_ProjectSearchId ) {

                //  HARD CODE to default of topLevelTable_DisplayValue of zero.
                //     TODO  This value is assumed to be correct regardless of what the "Transform" choice is.

                modMatrix[modMass_Index][search_Or_SubSearch_Index] = {
                    topLevelTable_DisplayValue: 0,
                    topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale: 0,
                    projectSearchId_OR_SubSearchId: projectSearchId_Or_SubSearchId,
                    modMass: modMass,
                    minValue_ForViz,
                    maxValue_ForViz
                    // search_Or_SubSearch_Index: search_Or_SubSearch_Index,
                    // modMassIndex: modMass_Index
                };
            }

            search_Or_SubSearch_Index++;
        }

        modMass_Index++;
    }

    return modMatrix;
}


/**
 *  Used by the code that uses D3 to generate the Mod Mass Visualization Graphic
 */
class INTERNAL__ModMatrix_Entry {

    topLevelTable_DisplayValue: number

    /**
     * Enforce user input "Max cutoff for color scale:"
     *
     * When used in the "color" function from 'd3' this keeps the returned color within the color range as shown below the visualization.
     */
    topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale: number

    projectSearchId_OR_SubSearchId: number
    modMass: number

    /**
     * Added for Clamping Color  Computation
     */
    minValue_ForViz: number

    /**
     * Added for Clamping Color  Computation
     */
    maxValue_ForViz: number

    // searchIndex: number
    // modMassIndex: number
}

/**
 *  Used by the code that uses D3 to generate the Mod Mass Visualization Graphic
 */
type INTERNAL__ModMatrix = Array<Array<INTERNAL__ModMatrix_Entry>>

