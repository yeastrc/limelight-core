/**
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition.ts
 *
 *
 */

import Plotly, { Layout, ShapeLine } from "plotly.js-dist-min";


//  At bottom of file:   export class Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition



///////////////////////////////

///   Plotly: Partial<Layout>

/**
 * SET: chart_Layout.violinmode = "overlay"
 *
 * // violinmode: https://plotly.com/javascript/reference/layout/#layout-violinmode
 *     // Type: enumerated , one of ( "group" | "overlay" )
 *     // Default: "overlay"
 *
 *
 * @param chart_Layout
 */
const plotly_Set_chart_Layout_violinmode_To_Overlay = function (
    {
        chart_Layout
    } : {
    chart_Layout: Partial<Layout>
}
) : void {

    // @ts-ignore  -- NOT in the types but still in the docs so keep with the ignore
    chart_Layout.violinmode = "overlay"  // Combines the 2 halves
}



/**
 * Plotly 'Layout' Class
 *
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition
 *
 * Centralize setting properties on objects related to Plotly that are NOT in the Typescript typings definition
 * and thus require '@ts-ignore' to set.
 *
 * This is NOT necessarily all the use of '@ts-ignore' with Plotly.
 */
class Layout_Class {

    static plotly_Set_chart_Layout_violinmode_To_Overlay = plotly_Set_chart_Layout_violinmode_To_Overlay

}



///////////////////////////////

///   Plotly: Data - Class for single trace

/**
 * SET: chart_Data.transforms = transforms_PropertyValue
 *
 *  https://plotly.com/javascript/multiple-transforms/
 *
 *  Note: transforms are deprecated and will be removed in a future version of Plotly.js
 *
 * @param transforms_PropertyValue
 * @param plotly_Data_SingleTrace
 */
const plotly_Set_chart_Data_transforms_property = function (
    {
        transforms_PropertyValue, plotly_Data_SingleTrace
    } : {
        transforms_PropertyValue: any
        plotly_Data_SingleTrace: Plotly.Data
    }
) : void {

    // @ts-ignore  -- NOT in the types but still in the docs so keep with the ignore
    plotly_Data_SingleTrace.transforms = transforms_PropertyValue
}


/**
 * SET: chart_Data.bingroup = bingroup_PropertyValue
 *
 *  https://plotly.com/javascript/reference/histogram/#histogram-bingroup
 *
 * @param bingroup_PropertyValue
 * @param plotly_Data_SingleTrace
 */
const plotly_Set_chart_Data_bingroup_property = function (
    {
        bingroup_PropertyValue, plotly_Data_SingleTrace
    } : {
        bingroup_PropertyValue: any
        plotly_Data_SingleTrace: Plotly.Data
    }
) : void {

    // @ts-ignore  -- NOT in the types but still in the docs so keep with the ignore
    plotly_Data_SingleTrace.bingroup = bingroup_PropertyValue
}

/**
 * Plotly 'Data' Class for single trace
 *
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition
 *
 * Centralize setting properties on objects related to Plotly that are NOT in the Typescript typings definition
 * and thus require '@ts-ignore' to set.
 *
 * This is NOT necessarily all the use of '@ts-ignore' with Plotly.
 */
class Data_Class {

    static plotly_Set_chart_Data_transforms_property = plotly_Set_chart_Data_transforms_property

    static plotly_Set_chart_Data_bingroup_property = plotly_Set_chart_Data_bingroup_property
}


/**
 *   Setting property 'opacity' is not in the Types for Plotly.
 *     ALSO: appears to not change the resulting SVG.  Cannot find any elements with opacity of 0.1 (any other than opacity 1) when choose 'Show persistent feature boundaries' and change code to not render the heatmap or scatter traces above.
 *
 * @param shapeLine
 * @param opacity
 */
// const plotly_Set_shapeLine_opacity = function (
//     {
//         shapeLine, opacity
//     } : {
//     shapeLine: Partial<ShapeLine>
//     opacity: number
// }) : void {
//
//     //   Setting property 'opacity' is not in the Types for Plotly.
//     //        ALSO: appears to not change the resulting SVG.  Cannot find any elements with opacity of 0.1 (any other than opacity 1) when choose 'Show persistent feature boundaries' and change code to not render the heatmap or scatter traces above.
//     // @ts-ignore
//     shapeLine.opacity = opacity  // Forced to separate assignment since not part of types.  Unsure it os doing anything.
// }


/**
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition
 *
 * Centralize setting properties on objects related to Plotly that are NOT in the Typescript typings definition
 * and thus require '@ts-ignore' to set.
 *
 * This is NOT necessarily all the use of '@ts-ignore' with Plotly.
 */
export class Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition {

    static Layout_Class = Layout_Class
    static Data_Class = Data_Class

}