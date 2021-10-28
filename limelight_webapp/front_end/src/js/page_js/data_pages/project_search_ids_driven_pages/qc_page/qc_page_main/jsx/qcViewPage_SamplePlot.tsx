/**
 * qcViewPage_QcViewPage_SamplePlot.tsx
 *
 * QC Page Sample Plot
 *
 */

import React from "react";

import Plotly from 'plotly.js-dist/plotly'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


/////////////////////////////////

//  Sample Plot


/**
 *
 */
interface QcViewPage_SamplePlot_Props {

}

/**
 *
 */
interface QcViewPage_SamplePlot_State {

    _placeholder?: any
}

/**
 *
 */
class QcViewPage_SamplePlot extends React.Component< QcViewPage_SamplePlot_Props, QcViewPage_SamplePlot_State > {

    //  bind to 'this' for passing as parameters

    private plot_Ref :  React.RefObject<HTMLDivElement>
    // private layout_Ref :  React.RefObject<HTMLTextAreaElement>

    /**
     *
     */
    constructor(props: QcViewPage_SamplePlot_Props) {
        super(props);

        this.plot_Ref = React.createRef();
        // this.layout_Ref = React.createRef();
    }

    /**
     *
     */
    componentWillUnmount() {

        Plotly.purge( this.plot_Ref.current )
    }


    /**
     *
     */
    componentDidMount() {
        try {
            this.addChart();

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

    }

    /**
     *
     */
    addChart() {
        try {
            window.setTimeout( () => {
                try {
                    const chart_Data: Plotly.Data[] = [
                        {
                            x: ['10', '17', 255],
                            y: [ 144, 1999, 334 ],
                            type: 'bar'
                        }
                    ];


                    // Another way to color each bar, all in one trace
                    //
                    // https://plotly.com/javascript/bar-charts/#customizing-individual-bar-colors
                    //     var trace1 = {
                    //         x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
                    //         y: [20, 14, 23, 25, 22],
                    //         marker:{
                    //             color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                    //         },
                    //         type: 'bar'
                    //     };


                    const chart_Layout : Plotly.Layout =
                        {
                            title:{
                                text: "Chart Title",
                                y: 0.95,
                                yanchor: "top"
                            },
                            autosize: false,
                            width: 500,
                            height: 300,
                            margin: {
                                l: 70,
                                r: 50,
                                b: 45,
                                t: 40,
                                pad: 4
                            },
                            xaxis: {
                                title: {
                                    text: "x Axis",
                                    standoff: 10
                                },
                                type: "category"  //  can set to undefined for not type category
                            },
                            yaxis: {
                                title: {
                                    text: "y Axis",
                                    "standoff": 10
                                }
                            },
                            showlegend: false
                        };

                    // {
                    //     title: 'Chart Title',
                    //     autosize: false,
                    //     width: 500,
                    //     height: 500,
                    //     margin: {
                    //         l: 50,
                    //         r: 50,
                    //         b: 100,
                    //         t: 20,
                    //         pad: 4
                    //     },
                    //     xaxis: {
                    //         type: 'category' //  otherwise the search id is treated as a number and continuous values
                    //     },
                    //     showlegend: false
                    // }


                    // const layoutJSON = this.layout_Ref.current.value;
                    //
                    // let chart_Layout : Plotly.Layout = undefined
                    // try {
                    //     chart_Layout = JSON.parse( layoutJSON );
                    // } catch( e ) {
                    //     console.warn("Exception caught in parse layout json.  layoutJSON: ", layoutJSON );
                    //     console.warn(e);
                    //     throw e;
                    // }

                    //  downloadToImage

                    const objectThis = this;

                    var chart_config = {

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
                                        objectThis.plot_Ref.current,
                                        {format: 'png', filename: 'newplot_png'}
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
                                        objectThis.plot_Ref.current,
                                        {format: 'svg', filename: 'newplot_svg'}
                                        // Optional add to object: , width: 800, height: 600
                                        //  width and height of displayed chart used if none specified
                                    );
                                }
                            }
                        ]
                    }
                    const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in addChart");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SamplePlot_Props>, prevState: Readonly<QcViewPage_SamplePlot_State>, snapshot?: any) {

        throw Error("componentDidUpdate(...) NOT HANDLED");

        //  Need to handle updated data to chart here
    }

    /**
     *
     */
    render() {


        // {
        //     "title":{
        //     "text": "Chart Title",
        //         "y":0.95, "yanchor":"top"
        // },
        //     "autosize": false,
        //     "width": 500,
        //     "height": 300,
        //     "margin": {
        //     "l": 70,
        //         "r": 50,
        //         "b": 45,
        //         "t": 40,
        //         "pad": 4
        // },
        //     "xaxis": {
        //     "title": {
        //         "text": "x Axis",
        //          "standoff": 10
        //     },
        //     "type": "category"
        // },
        //     "yaxis": {
        //     "title": {
        //         "text": "y Axis",
        //          "standoff": 10
        //     }
        // },
        //     "showlegend": false
        // }

        return (
            <div >
                {/*<div >*/}
                {/*    <span >Enter a layout JSON and click</span>*/}
                {/*    <span > </span>*/}
                {/*    <button*/}
                {/*        onClick={ event => {*/}
                {/*            this.addChart()*/}
                {/*        } }*/}
                {/*    >Create Chart</button>*/}
                {/*</div>*/}
                {/*<div style={ { marginBottom: 20 }}>*/}
                {/*    <textarea ref={ this.layout_Ref }*/}
                {/*              rows={ 30 }*/}
                {/*              cols={ 200 }*/}

                {/*        defaultValue={ `*/}
                {/*        {*/}
                {/*        "title":{*/}
                {/*            "text": "Chart Title",*/}
                {/*                "y":0.95, "yanchor":"top"*/}
                {/*        },*/}
                {/*        "autosize": false,*/}
                {/*        "width": 500,*/}
                {/*        "height": 300,*/}
                {/*        "margin": {*/}
                {/*            "l": 70,*/}
                {/*            "r": 50,*/}
                {/*            "b": 45,*/}
                {/*            "t": 40,*/}
                {/*            "pad": 4*/}
                {/*        },*/}
                {/*        "xaxis": {*/}
                {/*            "title": {*/}
                {/*                "text": "x Axis", "standoff": 10*/}
                {/*            },*/}
                {/*            "type": "category"*/}
                {/*        },*/}
                {/*        "yaxis": {*/}
                {/*            "title": {*/}
                {/*                "text": "y Axis", "standoff": 10*/}
                {/*            }*/}
                {/*        },*/}
                {/*        "showlegend": false*/}
                {/*    }*/}
                {/*    `}*/}
                {/*    />*/}
                {/*</div>*/}
                <div style={ { marginBottom: 20, }}>
                    <div
                        style={ { display: "inline-block", borderStyle: "solid",  borderWidth: 1 } }
                        className=" standard-border-color-gray "
                    >
                        <div ref={this.plot_Ref}></div>
                    </div>
                </div>
            </div>
        );
    }


}
