/**
 * qcPage_StandardChartConfig.ts
 *
 */

//  Import from 'plotly.js' will NOT build in Webpack

// import { ModeBarButtonAny, ModeBarDefaultButtons } from "plotly.js";
// import Plotly from "plotly.js";

import Plotly, { Layout } from "plotly.js-dist-min";
import { Config, ModeBarButtonAny, ModeBarDefaultButtons } from "plotly.js-dist-min";


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
        chartLayout?: Partial<Layout>
    }) : Partial<Config> {

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


    //  Change ModeBarDefaultButtons to type 'any' since type 'ModeBarDefaultButtons' is imported from "plotly.js"; and will not build in webpack

    const modeBarButtonsToRemove:
        Array<ModeBarDefaultButtons> = (
        // Array<any> = (

        [ 'toImage' ]
    )

    //  Change modeBarButtonsToAdd to type 'any' since:
    //
    //      1)   type 'ModeBarButtonAny' is missing property 'direction' which is in the Plotly example.  https://plotly.com/javascript/configuration-options/
    //      2)   type 'ModeBarButtonAny' is imported from "plotly.js"; and will not build in webpack

    //  Property 'direction' has been removed since does not appear to be needed for the icon 'camera'.  Maybe in the example it is needed for icon 'pencil'.

    const modeBarButtonsToAdd:
        Array<ModeBarButtonAny> = (
        // Array<any> = (
        [
            {
                name: 'Download plot as a png',
                title: 'Download plot as a png',
                icon: Plotly.Icons.camera,
                // direction: 'up',  //  'direction'  is in example but NOT in Typescript typing file for Plotly.  Example: https://plotly.com/javascript/configuration-options/
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
                title: 'Download plot as a svg',
                icon: Plotly.Icons.camera,
                // direction: 'up',  //  'direction'  is in example but NOT in Typescript typing file for Plotly.  Example: https://plotly.com/javascript/configuration-options/
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
    )

    return {

        //  Remove "Produced by Plotly" icon on right end of Modebar
        displaylogo:false,

        //  Remove existing PNG download
        modeBarButtonsToRemove,

        //  Add buttons to Right end of Modebar

        modeBarButtonsToAdd
    }

}