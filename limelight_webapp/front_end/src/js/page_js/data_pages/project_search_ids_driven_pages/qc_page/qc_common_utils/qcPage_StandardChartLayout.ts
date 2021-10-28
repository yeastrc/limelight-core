/**
 * qcPage_StandardChartLayout.ts
 *
 */

import Plotly from 'plotly.js-dist/plotly'

const _StandardChart_Width = 500;
const _StandardChart_Height = 300;

const _StandardChart_AspectRatio = _StandardChart_Width / _StandardChart_Height;

const _StandardChart_ActualChartArea_Width = 380;  // Width of block used for actual bars/lines/etc of chart

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
        chartTitle, chart_X_Axis_Label, chart_X_Axis_IsTypeCategory, chart_Y_Axis_Label, showlegend, notMoveTitle
    } : {
        chartTitle: string
        chart_X_Axis_Label: string
        chart_X_Axis_IsTypeCategory?: boolean
        chart_Y_Axis_Label: string
        showlegend?: boolean // Default to false
        notMoveTitle?: boolean

    }) : Plotly.Layout {

    let chart_X_Axis_IsTypeCategory_Local : string = undefined;

    if ( chart_X_Axis_IsTypeCategory ) {
        chart_X_Axis_IsTypeCategory_Local = 'category';
    }

    if ( ! showlegend ) {
        showlegend = false;
    }

    let title_y;
    let title_yanchor;

    if ( ! notMoveTitle ) {
        title_y = 0.95;
        title_yanchor = "top";
    }

    return {
        title:{
            text: chartTitle,
            // Move title towards chart
            y: title_y,
            yanchor: title_yanchor
        },
        autosize: false,
        width: _StandardChart_Width,
        height: _StandardChart_Height,
        margin: {
            l: 70,
            r: 50,
            b: 55,
            t: 40,
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
        showlegend
    }
}