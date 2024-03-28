/**
 * qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.ts
 *
 * QC Page - Centralized Common code to use Plotly to update Page DOM
 *
 *      Render the Plotly Plot / Chart on the page
 *      Update the Plot
 *      Remove the Plot
 *
 * Common code to provide a single place plus Queueing.
 *
 * On the Main Page, the Plot will be converted to a PNG and put on the page.
 *
 * On the Overlay, the Plot will be rendered.
 */

//  Use to get Typescript typings, but then switch since it does NOT build with this import
// import Plotly from "plotly.js"

//  Plotly ONLY imports successfully for a Build using this import
import Plotly from 'plotly.js-dist/plotly'


import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";


/**
 *
 */
export class QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot {

    private _requestQueue__RenderOn_MainPage__As_PNG : Array<QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params> = []

    private _requestInProgress__RenderOn_MainPage__As_PNG: boolean = false;

    private _pause__RenderOn_MainPage__As_PNG: boolean = false; // True when Overlay is opened so Main page stops rendering

    /**
     *
     * @param qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
     */
    qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG(
        {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
        } : {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
        }
    ) {
        this._requestQueue__RenderOn_MainPage__As_PNG.push( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params )

        if ( ! this._requestInProgress__RenderOn_MainPage__As_PNG ) {
            this._process_NextRequest_IfAnyExist();
        }
    }

    /**
     *
     */
    private _process_NextRequest_IfAnyExist() {

        while ( this._requestQueue__RenderOn_MainPage__As_PNG.length !== 0 ) {

            if ( this._pause__RenderOn_MainPage__As_PNG ) {

                break;  //  EARLY EXIT
            }

            //  Exit loop when process next_request_Holder with api that is NOT aborted ( _is_abortCalled() returns false )

            const next_request = this._requestQueue__RenderOn_MainPage__As_PNG.shift();  // Remove first entry and return it

            if (!next_request) {
                // SHOULD NOT OCCUR
                const msg = "_process_NextRequest_IfAnyExist() called and this._requestQueue__RenderOn_MainPage__As_PNG.shift() returned nothing after checked ( this._requestQueue__RenderOn_MainPage__As_PNG.length === 0 ) ";
                console.warn(msg);
                throw Error(msg);
            }

            if (next_request.is_aborted()) {

                // request has been aborted so skip

                console.log( "skipping Render Plot request that has been aborted" );

                continue;   //  EARLY LOOP CONTINUE
            }

            this._renderSinglePlot_MainPage({ qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: next_request });

            ///  Processed an entry so EXIT LOOP

            break;  //  EXIT LOOP
        }
    }

    /**
     *
     * @param qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
     */
    private _renderSinglePlot_MainPage(
        {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
        } : {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
        }
    ) {
        this._requestInProgress__RenderOn_MainPage__As_PNG = true;

        const plot_addedDivElementDOM = document.createElement("div");

        {  //  Add to Page DOM so can take measurements and positions using DOMElement.getBoundingClientRect()
            plot_addedDivElementDOM.style.left = "-5000px";
            const documentBody = document.querySelector('body');
            documentBody.appendChild(plot_addedDivElementDOM);
        }

        const newPlotResulting_Promise = Plotly.newPlot(
            plot_addedDivElementDOM,
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Data,
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout,
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_config
        )

        //  On Main Page, convert to an Image
        newPlotResulting_Promise.catch(reason => { try {

            this._requestInProgress__RenderOn_MainPage__As_PNG = false;

            console.warn("Plotly.newPlot:  reject: reason: ", reason)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Data: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Data)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_config: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_config)

            try {
                Plotly.purge(plot_addedDivElementDOM)
            } catch (e) {
                //  Eat Exception
            }
            try {
                plot_addedDivElementDOM.remove();
            } catch (e) {
                //  Eat Exception
            }

            if ( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback ) {

                window.setTimeout( () => {
                    try {
                        qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }, 10 )
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        newPlotResulting_Promise.then(newPlotResulting_Promise_Value => { try {

            if ( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.changePlotlyLayout_For_XaxisLabelLengths__Params ) {

                //  Adjust Plot Layout if needed so X Axis labels do not cover the X Axis title

                const  {
                    updateLayoutNeeded, updateLayout
                } = qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object({
                    plotRoot_DOM_Element: plot_addedDivElementDOM,
                    xAxisLabels: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.changePlotlyLayout_For_XaxisLabelLengths__Params.xAxisLabels,
                    xAxisTitle: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.changePlotlyLayout_For_XaxisLabelLengths__Params.xAxisTitle,
                    adjustPlotHeight: true
                });

                if ( updateLayoutNeeded ) {
                    const promise_Relayout = Plotly.relayout(plot_addedDivElementDOM, updateLayout);
                    promise_Relayout.catch( reason => { try {

                        this._requestInProgress__RenderOn_MainPage__As_PNG = false;

                        console.warn("Plotly.relayout:  reject: reason: ", reason)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Data: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Data)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_config: ", qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_config)

                        try {
                            Plotly.purge(plot_addedDivElementDOM)
                        } catch (e) {
                            //  Eat Exception
                        }
                        try {
                            plot_addedDivElementDOM.remove();
                        } catch (e) {
                            //  Eat Exception
                        }

                        if ( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback ) {

                            window.setTimeout( () => {
                                try {
                                    qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback();

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                            }, 10 )
                        }

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    promise_Relayout.then(value => { try {

                        this._renderSinglePlot_MainPage_Step_2({
                            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
                            plot_addedDivElementDOM
                        });

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } else {
                    this._renderSinglePlot_MainPage_Step_2({
                        qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
                        plot_addedDivElementDOM
                    });
                }

            } else {
                this._renderSinglePlot_MainPage_Step_2({
                    qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
                    plot_addedDivElementDOM
                });
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
     * @param plot_addedDivElementDOM
     */
    private _renderSinglePlot_MainPage_Step_2(
        {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
            plot_addedDivElementDOM
        } : {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
            plot_addedDivElementDOM: HTMLDivElement
        }
    ) {

        const plotly_ToImage_Options: Plotly.ToImgopts = {
            format: 'png',
            height: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout.height,
            width: qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotly_CreatePlot_Params.chart_Layout.width
        }

        const plotly_ToImage_Promise = Plotly.toImage( plot_addedDivElementDOM, plotly_ToImage_Options );

        plotly_ToImage_Promise.catch(reason => {
            console.warn("Plotly.toImage:  reject: reason: ", reason )
            console.warn("Plotly.toImage:  reject: plotly_ToImage_Options: ", plotly_ToImage_Options )

            this._requestInProgress__RenderOn_MainPage__As_PNG = false;

            try {
                Plotly.purge(plot_addedDivElementDOM)
            } catch (e) {
                //  Eat Exception
            }
            try {
                plot_addedDivElementDOM.remove();
            } catch (e) {
                //  Eat Exception
            }

            if ( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback ) {

                window.setTimeout( () => {
                    try {
                        qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Fail_Callback();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }, 10 )
            }
        })

        plotly_ToImage_Promise.then( (url) => {

            this._requestInProgress__RenderOn_MainPage__As_PNG = false;

            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.image_DOM_Element.src = url;

            try {
                Plotly.purge(plot_addedDivElementDOM)
            } catch (e) {
                //  Eat Exception
            }
            try {
                plot_addedDivElementDOM.remove();
            } catch (e) {
                //  Eat Exception
            }

            if ( qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Success_Callback ) {

                window.setTimeout( () => {
                    try {
                        qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.plotRendered_Success_Callback();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }, 10 )
            }

            this._process_NextRequest_IfAnyExist();
        });
    }

    //////////////////////////////////////

    qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__ChartDimensions(
        {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params
        } : {
            qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params
        }
    ) : {
        readonly chart_Width: number
        readonly chart_Height: number
    } {
        const targetDOMElement_domRect = qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params.plot_Div_DOM_Element.getBoundingClientRect();

        /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

        // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
        // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
        // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
        // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

        const chart_Width = Math.floor( targetDOMElement_domRect.width );
        const chart_Height = Math.floor( targetDOMElement_domRect.height );

        //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

        // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
        //
        // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
        // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
        //
        // if ()

        return {
            chart_Width, chart_Height
        }
    }

    /**
     *
     * @param qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params
     */
    qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot(
        {
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params
        } : {
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
        }
    ) {
        this._pause__RenderOn_MainPage__As_PNG = true;

        {
            const { chart_Width, chart_Height } = this.qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__ChartDimensions({
                qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params: {
                    plot_Div_DOM_Element: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element
                }
            })

            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout.width = chart_Width;
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout.height = chart_Height;
        }

        const newPlotResulting_Promise = Plotly.newPlot(
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element,
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Data,
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout,
            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_config
        )

        newPlotResulting_Promise.catch(reason => {
            console.warn("Plotly.newPlot:  reject: reason: ", reason)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Data: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Data)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout)
            console.warn("Plotly.newPlot:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_config: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_config)

            try {
                Plotly.purge(qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element)
            } catch (e) {
                //  Eat Exception
            }
        })
        newPlotResulting_Promise.then(newPlotResulting_Promise_Value => {

            if ( qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.changePlotlyLayout_For_XaxisLabelLengths__Params ) {

                //  Adjust Plot Layout if needed so X Axis labels do not cover the X Axis title

                const  {
                    updateLayoutNeeded, updateLayout
                } = qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object({
                    plotRoot_DOM_Element: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element,
                    xAxisLabels: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.changePlotlyLayout_For_XaxisLabelLengths__Params.xAxisLabels,
                    xAxisTitle: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.changePlotlyLayout_For_XaxisLabelLengths__Params.xAxisTitle,
                    adjustPlotHeight: false
                });

                if ( updateLayoutNeeded ) {
                    const promise_Relayout = Plotly.relayout(qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element, updateLayout);
                    promise_Relayout.catch( reason => { try {

                        this._requestInProgress__RenderOn_MainPage__As_PNG = false;

                        console.warn("Plotly.relayout:  reject: reason: ", reason)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Data: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Data)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_Layout)
                        console.warn("Plotly.relayout:  reject: qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_config: ", qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotly_CreatePlot_Params.chart_config)

                        try {
                            Plotly.purge(qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plot_Div_DOM_Element)
                        } catch (e) {
                            //  Eat Exception
                        }

                        if ( qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Fail_Callback ) {

                            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Fail_Callback();
                        }

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    promise_Relayout.then(value => { try {

                        if ( qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback ) {

                            qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback();
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } else {

                    if ( qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback ) {

                        qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback();
                    }
                }

            } else {

                if ( qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback ) {

                    qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params.plotRendered_Success_Callback();
                }
            }

        });
    }

    /**
     *
     */
    restyleChart(
        {
            restyle_chartUpdate_Properties, plot_Div_DOM_Element, restyleComplete_Success_Callback, restyleComplete_Fail_Callback
        } : {
            restyle_chartUpdate_Properties: any
            plot_Div_DOM_Element: HTMLDivElement
            restyleComplete_Success_Callback: () => void
            restyleComplete_Fail_Callback: () => void
        }
    ) {
        const restyle_Returned_Promise = Plotly.restyle(plot_Div_DOM_Element, restyle_chartUpdate_Properties);

        if ( restyleComplete_Fail_Callback ) {
            restyle_Returned_Promise.catch( reason => {
                try {
                    restyleComplete_Fail_Callback()
                } catch( e ) {
                    console.warn("Exception caught in restyle_Returned_Promise.catch()");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }
        if ( restyleComplete_Success_Callback ) {
            restyle_Returned_Promise.then( reason => {
                try {
                    restyleComplete_Success_Callback()
                } catch( e ) {
                    console.warn("Exception caught in restyle_Returned_Promise.then()");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }
    }

    /**
     *
     */
    relayoutChart(
        {
            updateLayout_Properties, plot_Div_DOM_Element, relayoutComplete_Success_Callback, relayoutComplete_Fail_Callback
        } : {
            updateLayout_Properties: any
            plot_Div_DOM_Element: HTMLDivElement
            relayoutComplete_Success_Callback: () => void
            relayoutComplete_Fail_Callback: () => void
        }
    ) {
        const relayout_Returned_Promise = Plotly.relayout(plot_Div_DOM_Element, updateLayout_Properties);

        if ( relayoutComplete_Fail_Callback ) {
            relayout_Returned_Promise.catch( reason => {
                try {
                    relayoutComplete_Fail_Callback();
                } catch( e ) {
                    console.warn("Exception caught in relayout_Returned_Promise.catch()");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }
        if ( relayoutComplete_Success_Callback ) {
            relayout_Returned_Promise.then( reason => {
                try {
                    relayoutComplete_Success_Callback();
                } catch( e ) {
                    console.warn("Exception caught in relayout_Returned_Promise.then()");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }
    }

    /**
     *
     */
    removeChart_InOverlay_FromDOM(
        {
            plot_Div_DOM_Element
        } : {
            plot_Div_DOM_Element: HTMLDivElement
        }
    ) : void {

        this._removeChart_FromDOM({ plot_Div_DOM_Element });

        //  Start processing of queue of main page charts

        this._pause__RenderOn_MainPage__As_PNG = false;

        this._process_NextRequest_IfAnyExist();
    }

    /**
     *
     */
    private _removeChart_FromDOM(
        {
            plot_Div_DOM_Element
        } : {
            plot_Div_DOM_Element: HTMLDivElement
        }
    ) : void {

        try {
            Plotly.purge(plot_Div_DOM_Element)
        } catch (e) {
            //  Eat Exception
        }
    }

}


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//     Function Params Classes




/**
 * Both Main and Overlay Sub Params
 */
export class QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params {

    readonly xAxisLabels: Set<string>
    readonly xAxisTitle: string
}

/**
 *
 */
export class QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params {

    readonly plotly_CreatePlot_Params: {
        chart_Data: any
        chart_Layout: any
        chart_config: any
    }
    readonly chart_Width: number
    readonly chart_Height: number
    readonly image_DOM_Element: HTMLImageElement
    readonly changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params
    readonly plotRendered_Success_Callback: () => void
    readonly plotRendered_Fail_Callback: () => void

    private _aborted = false

    constructor(
        {
            plotly_CreatePlot_Params, chart_Width, chart_Height, image_DOM_Element,
            changePlotlyLayout_For_XaxisLabelLengths__Params, plotRendered_Success_Callback, plotRendered_Fail_Callback
        } : {
            plotly_CreatePlot_Params: { chart_Data: any; chart_Layout: any; chart_config: any }
            chart_Width: number
            chart_Height: number
            image_DOM_Element: HTMLImageElement
            changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params
            plotRendered_Success_Callback: () => void
            plotRendered_Fail_Callback: () => void
        }
    ) {
        this.plotly_CreatePlot_Params = plotly_CreatePlot_Params;
        this.chart_Width = chart_Width;
        this.chart_Height = chart_Height;
        this.image_DOM_Element = image_DOM_Element;
        this.changePlotlyLayout_For_XaxisLabelLengths__Params = changePlotlyLayout_For_XaxisLabelLengths__Params;
        this.plotRendered_Success_Callback = plotRendered_Success_Callback;
        this.plotRendered_Fail_Callback = plotRendered_Fail_Callback;
    }

    /**
     *
     */
    abort() : void {
        this._aborted = true;
    }

    /**
     *
     */
    is_aborted() {
        return this._aborted;
    }
}

/**
 *
 */
export class QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_GetChartDimensions_Params {

    readonly plot_Div_DOM_Element: HTMLDivElement
}

/**
 *
 */
export class QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params {

    readonly plotly_CreatePlot_Params: {
        chart_Data: any
        chart_Layout: any
        chart_config: any
    }
    readonly chart_Width: number
    readonly chart_Height: number
    readonly plot_Div_DOM_Element: HTMLDivElement
    readonly changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params
    readonly plotRendered_Success_Callback: () => void
    readonly plotRendered_Fail_Callback: () => void

    private _aborted = false

    constructor(
        {
            plotly_CreatePlot_Params, chart_Width, chart_Height, plot_Div_DOM_Element,
            changePlotlyLayout_For_XaxisLabelLengths__Params, plotRendered_Success_Callback, plotRendered_Fail_Callback
        } : {
            plotly_CreatePlot_Params: { chart_Data: any; chart_Layout: any; chart_config: any }
            chart_Width: number
            chart_Height: number
            plot_Div_DOM_Element: HTMLDivElement
            changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params
            plotRendered_Success_Callback: () => void
            plotRendered_Fail_Callback: () => void
        }
    ) {
        this.plotly_CreatePlot_Params = plotly_CreatePlot_Params;
        this.chart_Width = chart_Width;
        this.chart_Height = chart_Height;
        this.plot_Div_DOM_Element = plot_Div_DOM_Element;
        this.changePlotlyLayout_For_XaxisLabelLengths__Params = changePlotlyLayout_For_XaxisLabelLengths__Params;
        this.plotRendered_Success_Callback = plotRendered_Success_Callback;
        this.plotRendered_Fail_Callback = plotRendered_Fail_Callback
    }

    /**
     *
     */
    abort() : void {
        this._aborted = true;
    }

    /**
     *
     */
    is_aborted() {
        return this._aborted;
    }
}

