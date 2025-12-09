/**
 * Plotly_PlottingLibrary__Set_Layout_X_Axis_Add_TickMarkLines_To_TickLabels.ts
 */
import { Layout } from "plotly.js-dist-min";

/**
 * add tick mark lines to the X Axis Tick labels - Use on 'Continuous' values X Axis like Histogram
 *
 * @param chart_Layout
 */
export const plotly_PlottingLibrary__Set_Layout_X_Axis_Add_TickMarkLines_To_TickLabels = function ( chart_Layout: Partial<Layout> ) {

    //  Add tick marks at the x axis labels

    if ( ! chart_Layout.xaxis ) {

        const msg = "ERROR: plotly_PlottingLibrary__Set_Layout_X_Axis_Add_TickMarkLines_To_TickLabels called BUT chart_Layout.xaxis is NOT populated"
        console.warn(msg)
        throw Error(msg)
    }

    chart_Layout.xaxis.tickmode = "auto"
    chart_Layout.xaxis.ticks = "outside"     // <-- shows actual tick-mark lines
    chart_Layout.xaxis.ticklen = 8           // length of tick marks
    chart_Layout.xaxis.tickwidth = 2         // thickness of tick marks
    // tickcolor: "#333",    // color of tick marks
}

