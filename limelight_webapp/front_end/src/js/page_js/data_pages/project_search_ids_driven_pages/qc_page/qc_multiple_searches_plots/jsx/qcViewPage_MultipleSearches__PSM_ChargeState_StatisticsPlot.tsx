/**
 * qcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot.tsx
 *
 * QC Page Multiple Searches : Charge State Statistics
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_PSM_ChargeState_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSM_ChargeState_OverlayContainer";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcViewPage_MultipleSearches__ComputeColorsForSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_MultipleSearches__ComputeColorsForSearches";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";


const chartTitle = "Fraction of PSMs with Charge";

/**
 *
 */
export interface QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot extends React.Component< QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_Props, QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_State > {

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();
        this.image_Ref = React.createRef();

        this.state = { showCreatingMessage: true, showUpdatingMessage: false };
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }
        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }

        try {
            this._resizeWindow_Handler_Remove();
        } catch (e) {
            //  Eat Exception
        }

        try {
            this._removeChart();

        } catch (e) {
            //  Eat Exception
        }

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

            window.setTimeout( () => {
                try {
                    this._populateChart();

                    if ( this.props.isInSingleChartOverlay ) {
                        this._resizeWindow_Handler_Attach();
                    }

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
        ) {
            //  Something changed so return true
            return true;
        }

        return false
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_MultipleSearches__PSM_ChargeState_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
            ) {
            } else {
                //  Nothing changed so return

                return;  // EARLY RETURN
            }

            try {
                if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
                }
            } catch (e) {
                //  Eat Exception
            }
            try {
                if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
                }
            } catch (e) {
                //  Eat Exception
            }

            this.setState({ showUpdatingMessage: true });

            window.setTimeout( () => {
                try {
                    this._populateChart();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

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
    private _resizeWindow_Handler_Attach() : void {

        //  Attach resize handler
        window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     *
     */
    private _resizeWindow_Handler_Remove() : void {

        //  Remove resize handler
        window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
     */
    private _resizeWindow_Handler() : void {
        try {
            this._populateChart()

        } catch( e ) {
            console.log("Exception caught in _resizeWindow_Handler()");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const promise_get_PsmStatistics_ChargeStateStatistics_Data =
            this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_MultipleSearches.get_PsmStatistics_ChargeStateStatistics_Data();

        promise_get_PsmStatistics_ChargeStateStatistics_Data.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }



            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_get_PsmStatistics_ChargeStateStatistics_Data.then( data_Holder_MultipleSearches => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({showUpdatingMessage: false});

                const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

                //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

                const peptideDistinct_Array =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

                const searchNames_AsMap = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchNames_AsMap();


                const qcViewPage_MultipleSearches__ComputeColorsForSearches = new QcViewPage_MultipleSearches__ComputeColorsForSearches({projectSearchIds});

                let charge_Min_AcrossAllSearches = undefined;
                let charge_Max_AcrossAllSearches = undefined;

                const charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId = new Map<number, Map<number, Charge_Count_Entry>>();

                const psm_Count_Map_Key_ProjectSearchId = new Map<number, number>();

                for (const projectSearchId of projectSearchIds) {

                    const data_Holder_SingleSearch = data_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId});
                    if (!data_Holder_SingleSearch) {
                        const msg = "data_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId}); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const psmTblData = data_Holder_SingleSearch.psmTblData

                    const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                        qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                            projectSearchId,
                            peptideDistinct_Array,
                            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                        });

                    const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                    psm_Count_Map_Key_ProjectSearchId.set(projectSearchId, psmTblData_Filtered.length)

                    let charge_Count_Map_Key_Charge = charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( ! charge_Count_Map_Key_Charge ) {
                        charge_Count_Map_Key_Charge = new Map();
                        charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.set(projectSearchId, charge_Count_Map_Key_Charge);
                    }

                    for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

                        let charge_Count_Entry = charge_Count_Map_Key_Charge.get(psmTblData_Filtered_Entry.charge);
                        if (!charge_Count_Entry) {
                            charge_Count_Entry = {
                                charge : psmTblData_Filtered_Entry.charge,
                                psmCountForEntry : 0,
                                psmCount_Fraction_ForEntry: undefined
                            };
                            charge_Count_Map_Key_Charge.set(psmTblData_Filtered_Entry.charge, charge_Count_Entry);
                        }
                        charge_Count_Entry.psmCountForEntry++;

                        //  Compute Min and Max Charge
                        if (charge_Min_AcrossAllSearches === undefined) {
                            charge_Min_AcrossAllSearches = charge_Count_Entry.charge;
                            charge_Max_AcrossAllSearches = charge_Count_Entry.charge;
                        } else {
                            if (charge_Min_AcrossAllSearches > charge_Count_Entry.charge) {
                                charge_Min_AcrossAllSearches = charge_Count_Entry.charge
                            }
                            if (charge_Max_AcrossAllSearches < charge_Count_Entry.charge) {
                                charge_Max_AcrossAllSearches = charge_Count_Entry.charge
                            }
                        }
                    }

                    //  Compute Fraction
                    for (const charge_Count_Entry of charge_Count_Map_Key_Charge.values()) {
                        charge_Count_Entry.psmCount_Fraction_ForEntry = charge_Count_Entry.psmCountForEntry / psmTblData_Filtered.length;
                    }
                }

                for (const projectSearchId of projectSearchIds) {

                    const charge_Count_Map_Key_Charge_Map = charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId);
                    if (!charge_Count_Map_Key_Charge_Map) {
                        const msg = "charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                }

                const chartData_MainTraces_Array = [];


                for (const projectSearchId of projectSearchIds) {

                    const searchNameData = searchNames_AsMap.get(projectSearchId);
                    if ( ! searchNameData ) {
                        const msg = "searchNames_AsMap.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const color = qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsHexString_By_ProjectSearchId(projectSearchId);
                    if ( ! color ) {
                        const msg = "qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsString_By_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const charge_Count_Map_Key_Charge_Map = charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( ! charge_Count_Map_Key_Charge_Map ) {
                        const msg = "charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const psm_Count_TotalForSearch = psm_Count_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( ! charge_Count_Map_Key_Charge_Map ) {
                        const msg = "psm_Count_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const chart_X: Array<string> = []
                    const chart_Y: Array<number> = []
                    const chart_Bars_labels: Array<string> = [];
                    const chart_Bars_Tooltips: Array<string> = [];

                    for (let charge = charge_Min_AcrossAllSearches; charge <= charge_Max_AcrossAllSearches; charge++) {

                        let psmCount_ForEntry = 0;
                        let psmCount_Fraction_ForEntry = 0;
                        {
                            const charge_Count_Entry = charge_Count_Map_Key_Charge_Map.get(charge);
                            if (charge_Count_Entry) {
                                psmCount_ForEntry = charge_Count_Entry.psmCountForEntry;
                                psmCount_Fraction_ForEntry = charge_Count_Entry.psmCount_Fraction_ForEntry;
                            }
                        }
                        chart_X.push("+" + charge.toString());
                        chart_Y.push(psmCount_Fraction_ForEntry);
                        chart_Bars_labels.push(psmCount_Fraction_ForEntry.toFixed(3));

                        let psmCount_Fraction_TooltipString: string = undefined;
                        if ( psmCount_Fraction_ForEntry === 0 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(1);
                        } else if (psmCount_Fraction_ForEntry < 0.1 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(3);
                        } else {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(2);
                        }

                        const tooltip =
                            "Search id: " + searchNameData.searchId.toString() +
                            "<br>Charge: +" + charge +
                            "<br>Fraction: " + psmCount_Fraction_TooltipString +
                            "<br>Count: " + psmCount_ForEntry.toLocaleString() +
                            "<br>Total Count: " + psm_Count_TotalForSearch.toLocaleString();

                        chart_Bars_Tooltips.push(tooltip);
                    }

                    const chart_Data_ForSearch =
                        {
                            name: searchNameData.searchId.toString(),
                            type: 'scatter',
                            marker: {
                                color
                            },
                            x: chart_X,
                            y: chart_Y,
                            text: chart_Bars_labels, //  Text put on each bar
                            hoverinfo: "text", //  Hover contents
                            hovertext: chart_Bars_Tooltips  //  Hover contents per bar
                        };

                    chartData_MainTraces_Array.push(chart_Data_ForSearch)
                }

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

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label: "Charge",
                    chart_X_Axis_IsTypeCategory: true,
                    chart_Y_Axis_Label: "Fraction",
                    showlegend: true
                });

                ////////////

                //  Only Put Chart in DOM in Overlay so Only remove existing chart in Overlay.

                //  Have existing chart in overlay when re-populate chart when have window resize

                if ( this.props.isInSingleChartOverlay ) {
                    try {
                        //  First remove any existing plot, if it exists
                        this._removeChart();
                    } catch (e) {
                        //  Eat Exception
                    }
                }

                const chart_config = qcPage_StandardChartConfig({chartContainer_DOM_Element: this.plot_Ref.current});

                {
                    // const chart_Data_JSON = JSON.stringify(chartData_MainTraces_Array);
                    // const chart_Layout_JSON = JSON.stringify(chart_Layout);
                    //
                    // console.log("*********************************")
                    // console.log("Data for Chart with Title: " + chartTitle);
                    // console.log("chart_Data object: ", chartData_MainTraces_Array);
                    // console.log("chart_Data_JSON: " + chart_Data_JSON);
                    // console.log("chart_Layout object: ", chart_Layout);
                    // console.log("chart_Layout_JSON: " + chart_Layout_JSON);
                    // console.log("chart_config object: ", chart_config);
                    // console.log("*********************************")
                }

                if ( ! this.props.isInSingleChartOverlay ) {

                    //  Main Page Plot

                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                        plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
                        chart_Width: chart_Layout.width,
                        chart_Height: chart_Layout.height,
                        image_DOM_Element: this.image_Ref.current,
                        changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                        plotRendered_Success_Callback: () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        },
                        plotRendered_Fail_Callback:  () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        }
                    });

                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                    qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG({
                        qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
                    });

                } else {

                    //  Overlay Plot

                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params({
                        plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
                        chart_Width: chart_Layout.width,
                        chart_Height: chart_Layout.height,
                        plot_Div_DOM_Element: this.plot_Ref.current,
                        changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                        plotRendered_Success_Callback: () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        },
                        plotRendered_Fail_Callback:  () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        }
                    });

                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                    qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot({
                        qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
                    });
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            if ( this.plot_Ref.current ) {
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                removeChart_InOverlay_FromDOM({ plot_Div_DOM_Element: this.plot_Ref.current });
            }
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _openChartInOverlay() {
        try {
            open_PSM_ChargeState_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent,
                }
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        return (

            <React.Fragment>

                {( this.props.isInSingleChartOverlay ) ? (
                    //  For Single Chart Overlay: div the chart will be rendered into
                    <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"></div>
                ) : (
                    //  For Main Page: img the chart will be inserted into
                    <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"></img>
                )}

                {( this.state.showCreatingMessage ) ? (

                    <QcPage_CreatingPlot_BlockCover/>

                ): ( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): ( ! this.props.isInSingleChartOverlay ) ? (

                    //  Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click
                    <QcPage_ClickPlot_ForInteractivePlot_BlockCover
                        clickHandler_Callback={ this._openChartInOverlay_BindThis }
                    />

                ) : null }

            </React.Fragment>
        );
    }


}

/**
 *
 */
class Charge_Count_Entry {

    charge: number
    psmCountForEntry: number
    psmCount_Fraction_ForEntry: number
}
