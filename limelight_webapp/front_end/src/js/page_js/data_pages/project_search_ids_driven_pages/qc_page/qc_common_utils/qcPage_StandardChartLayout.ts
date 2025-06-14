/**
 * qcPage_StandardChartLayout.ts
 *
 */

//  Plotly ONLY imports successfully for a Build using this import
import Plotly from "plotly.js-dist-min";
import { Layout } from "plotly.js-dist-min";

const _Search_SubSearch_Category_Each_MinWidth = 30;

const _Plot_Margin_Left = 70;
const _Plot_Margin_Right = 50;

const _Plot_Margin_Top = 40;
const _Plot_Margin_Bottom = 55;

const _StandardChart_Width = 750; // was 500;
const _StandardChart_Height = 450; // was 300;

const _StandardChart_AspectRatio = _StandardChart_Width / _StandardChart_Height;

const _StandardChart_ActualChartArea_Width = _StandardChart_Width - _Plot_Margin_Left - _Plot_Margin_Right;  // Width of block used for actual bars/lines/etc of chart

const _Overlay_Width_Min = 800;
const _Overlay_Width_Max = 50000;

const _Overlay_Height_Min = 600;
const _Overlay_Height_Max = 50000;

const _Overlay_Dimensions = {
    min_Width: _Overlay_Width_Min,
    max_Width: _Overlay_Width_Max,
    min_Height: _Overlay_Height_Min,
    max_Height: _Overlay_Height_Max,
}


/**
 *
 */
export const qcPage_StandardChartLayout_StandardWidth = function() {
    return _StandardChart_Width
}

/**
 *
 */
export const qcPage_StandardChartLayout_StandardHeight = function() {
    return _StandardChart_Height
}

/**
 *
 */
export const qcPage_StandardChartLayout_Standard_Plot_Margin_Bottom = function() {
    return _Plot_Margin_Bottom
}

/**
 *
 */
export const qcPage_StandardChartLayout_ActualChartArea_AspectRatio = function() {
    return _StandardChart_AspectRatio
}


/**
 *
 */
export const qcPage_StandardChartLayout_ActualChartArea_Width = function() {
    return _StandardChart_ActualChartArea_Width
}


/**
 *
 */
export const qcPage_ChartOverlayDimensions = function() {
    return _Overlay_Dimensions;
}


/**
 *
 * @param chartTitle
 * @param chart_X_Axis_Label
 * @param chart_X_Axis_IsTypeCategory: false if X axis is continuous. Default to true
 * @param chart_Y_Axis_Label
 * @param showlegend - Default to false
 * @param notMoveTitle - if true, do NOT move the Chart title
 */
export const qcPage_StandardChartLayout = function (
    {
        chartTitle, chart_X_Axis_Label, chart_X_Axis_IsTypeCategory, chart_Y_Axis_Label, showlegend, notMoveTitle, search_SubSearch_Count_SizeFor
    } : {
        chartTitle: string
        chart_X_Axis_Label: string
        chart_X_Axis_IsTypeCategory?: boolean
        chart_Y_Axis_Label: string
        showlegend?: boolean // Default to false
        notMoveTitle?: boolean
        search_SubSearch_Count_SizeFor?: number  //  Passed in for Combine Search and Sub Searches when Searches or Sub Searches are categories on Horizontal Access

    }) : Partial<Layout> {

    let chart_X_Axis_IsTypeCategory_Local :  Plotly.AxisType = undefined;

    if ( chart_X_Axis_IsTypeCategory ) {
        chart_X_Axis_IsTypeCategory_Local = 'category';
    }

    let showlegend_Local = showlegend;

    if ( ! showlegend_Local ) {
        showlegend_Local = false;
    }

    //  Remove since does not appear to always place the title properly above the chart but the title sometimes ends up in the chart.
    // let title_y;
    // let title_yanchor;
    //
    // if ( ! notMoveTitle ) {
    //     title_y = 0.95;
    //     title_yanchor = "top";
    // }

    let plotWidth = _StandardChart_Width;

    if ( search_SubSearch_Count_SizeFor ) {

        const mainPlotArea_Width = search_SubSearch_Count_SizeFor * _Search_SubSearch_Category_Each_MinWidth;

        const minPlotWidth = mainPlotArea_Width + _Plot_Margin_Left + _Plot_Margin_Right;

        if ( plotWidth < minPlotWidth ) {
            plotWidth = minPlotWidth;
        }
    }

    return {
        title:{
            text: chartTitle,
            //        Remove since does not appear to always place the title properly above the chart but the title sometimes ends up in the chart.
            // Move title towards chart
            // y: title_y,
            // yanchor: title_yanchor
        },
        autosize: false,
        width: plotWidth,
        height: _StandardChart_Height,
        margin: {
            l: _Plot_Margin_Left,
            r: _Plot_Margin_Right,
            t: _Plot_Margin_Top,
            b: _Plot_Margin_Bottom,
            pad: 4
        },
        xaxis: {
            title: {
                text: chart_X_Axis_Label,
                // standoff: 10
            },
            type: chart_X_Axis_IsTypeCategory_Local,
            exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
        },
        yaxis: {
            title: {
                text: chart_Y_Axis_Label,
                // standoff: 10
            },
            exponentformat: 'e'
        },
        showlegend: showlegend_Local
    }
}