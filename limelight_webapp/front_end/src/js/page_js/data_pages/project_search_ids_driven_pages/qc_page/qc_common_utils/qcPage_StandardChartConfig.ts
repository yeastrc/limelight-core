/**
 * qcPage_StandardChartConfig.ts
 *
 */

import Plotly from 'plotly.js-dist/plotly'
import {
    qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";



const _CHART_DOWNLOAD_WIDTH = 2000;

/**
 *
 */
export const qcPage_StandardChartConfig = function (
    {
        chartContainer_DOM_Element, chartLayout
    } : {
        chartContainer_DOM_Element: HTMLElement
        chartLayout?: Plotly.Layout
    }) {

    let chart_DisplayWidth : number = undefined
    let chart_DisplayHeight : number = undefined

    if ( chartLayout ) {

        if ( ! chartLayout.width ) {
            const msg = "( ! chartLayout.width )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! chartLayout.height ) {
            const msg = "( ! chartLayout.height )";
            console.warn(msg);
            throw Error(msg);
        }

        chart_DisplayWidth = chartLayout.width;
        chart_DisplayHeight = chartLayout.height;

    } else {
        chart_DisplayWidth = qcPage_StandardChartLayout_StandardWidth()
        chart_DisplayHeight = qcPage_StandardChartLayout_StandardHeight()
    }

    const chart_AspectRatio = chart_DisplayWidth / chart_DisplayHeight;

    const chart_DownloadWidth = _CHART_DOWNLOAD_WIDTH
    const chart_DownloadHeight = chart_DownloadWidth / chart_AspectRatio;

    return {

        //  Remove "Produced by Plotly" icon on right end of Modebar
        displaylogo:false,

        //  Remove existing PNG download
        modeBarButtonsToRemove: ['toImage'],

        //  Add buttons to Right end of Modebar

        modeBarButtonsToAdd: [
            {
                name: 'Download plot as a png',
                icon: Plotly.Icons.camera,
                direction: 'up',
                click: function(gd) {
                    Plotly.downloadImage(
                        chartContainer_DOM_Element,
                        {
                            format: 'png',
                            filename: 'newplot_png',
                            width: chart_DownloadWidth,
                            height: chart_DownloadHeight
                        }
                        // Optional add to object: , width: 800, height: 600
                        //  width and height of displayed chart used if none specified
                    );
                }
            },
            {
                name: 'Download plot as a svg',
                icon: Plotly.Icons.camera,
                direction: 'up',
                click: function(gd) {
                    Plotly.downloadImage(
                        chartContainer_DOM_Element,
                        {
                            format: 'svg',
                            filename: 'newplot_svg',
                            width: chart_DownloadWidth,
                            height: chart_DownloadHeight
                        }
                        // Optional add to object: , width: 800, height: 600
                        //  width and height of displayed chart used if none specified
                    );
                }
            }
        ]
    }

}