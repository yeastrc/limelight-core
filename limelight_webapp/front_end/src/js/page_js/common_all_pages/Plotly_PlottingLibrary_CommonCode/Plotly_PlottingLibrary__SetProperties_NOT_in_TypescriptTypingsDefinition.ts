/**
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition.ts
 *
 *
 */

import { Layout, ShapeLine } from "plotly.js-dist-min";

/**
 * Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition
 *
 * Centralize setting properties on objects related to Plotly that are NOT in the Typescript typings definition
 * and thus require '@ts-ignore' to set.
 *
 * This is NOT necessarily all the use of '@ts-ignore' with Plotly.
 */
export const Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition = {


    //  Create Split Violin Chart   https://plotly.com/javascript/violin/#split-violin-plot

    // violingap:  https://plotly.com/javascript/reference/layout/#layout-violingap
    //         Type: number between or equal to 0 and 1
    //         Default: 0.3
    //         Sets the gap (in plot fraction) between violins of adjacent location coordinates. Has no effect on traces that have "width" set.
    // chart_Layout.violingap = 0  //  zero from sample code on plotly website

    // violingroupgap:  https://plotly.com/javascript/reference/layout/#layout-violingroupgap
    //         Type: number between or equal to 0 and 1
    //         Default: 0.3
    //         Sets the gap (in plot fraction) between violins of the same location coordinate. Has no effect on traces that have "width" set.
    // chart_Layout.violingroupgap = 0  //  zero from sample code on plotly website

    // violinmode: https://plotly.com/javascript/reference/layout/#layout-violinmode
    // Type: enumerated , one of ( "group" | "overlay" )
    // Default: "overlay"
    //
    // Determines how violins at the same location coordinate are displayed on the graph.
    // If "group", the violins are plotted next to one another centered around the shared location.
    // If "overlay", the violins are plotted over one another, you might need to set "opacity" to see them multiple violins.
    // Has no effect on traces that have "width" set.


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
    plotly_Set_chart_Layout_violinmode_To_Overlay(
        {
            chart_Layout
        } : {
            chart_Layout: Partial<Layout>
        }
    ) : void {

        // @ts-ignore  -- NOT in the types but still in the docs so keep with the ignore
        chart_Layout.violinmode = "overlay"  // Combines the 2 halves
    },

    /**
     *   Setting property 'opacity' is not in the Types for Plotly.
     *     ALSO: appears to not change the resulting SVG.  Cannot find any elements with opacity of 0.1 (any other than opacity 1) when choose 'Show persistent feature boundaries' and change code to not render the heatmap or scatter traces above.
     *
     * @param shapeLine
     * @param opacity
     */
    plotly_Set_shapeLine_opacity(
        {
            shapeLine, opacity
        } : {
            shapeLine: Partial<ShapeLine>
            opacity: number
        }) : void {

        //   Setting property 'opacity' is not in the Types for Plotly.
        //        ALSO: appears to not change the resulting SVG.  Cannot find any elements with opacity of 0.1 (any other than opacity 1) when choose 'Show persistent feature boundaries' and change code to not render the heatmap or scatter traces above.
        // @ts-ignore
        shapeLine.opacity = opacity  // Forced to separate assignment since not part of types.  Unsure it os doing anything.
    }


} as const