/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot.tsx
 *
 * QC Page Single Search : MS1 Ion Current vs M/Z Statistics
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_MS1_Ion_Current_VS_M_Z_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_OverlayContainer";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";


/**
 *
 */
export interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    //  Primary Data
    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData : any  // No Type since comes from server from Spectr

    searchScanFileName_Selected: string

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props, QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _renderChart: boolean = true;

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();
        this.image_Ref = React.createRef();

        //  Initialize to current passed value
        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

        props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register({ callbackItem: this })

        this.state = { showCreatingMessage: true, showUpdatingMessage: false };
    }

    /**
     * From interface QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
     * @param item
     */
    set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback = item

        this.setState({ showUpdatingMessage: true });
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.un_register({ callbackItem: this })
        } catch (e) {
            //  Eat Exception
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

        try {
            this._resizeWindow_Handler_Remove();
        } catch (e) {
            //  Eat Exception
        }

        try {
            if ( this._renderChart ) {
                this._removeChart();
            }

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

            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        if ( ! this._componentMounted ) {
                            //  Component no longer mounted so exit
                            return; // EARLY RETURN
                        }

                        this._populateChart();

                        if ( this.props.isInSingleChartOverlay ) {
                            this._resizeWindow_Handler_Attach();
                        }

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextProps.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || prevProps.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
                    // || nextState.no_MS1_Data !== this.state.no_MS1_Data
                    // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                    // || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  No Change to inputs so Don't re-populate Block

                    return; // EARLY RETURN
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

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot_State =>  {

                    if ( ! prevState.showUpdatingMessage ) {
                        return { showUpdatingMessage: true };
                    }
                    return null;
                });

                window.setTimeout(() => {
                    try {
                        if ( ! this._componentMounted ) {
                            //  Component no longer mounted so exit
                            return; // EARLY RETURN
                        }

                        if (
                            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                            )) {
                            //  Skip these params since they are not the "Latest"
                            return; // EARLY RETURN
                        }

                        this._populateChart();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
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

        const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData = this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData;

        const jsonContents = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.jsonContents;
        const summaryData = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.summaryData;

        const ms1_IntensitiesBinnedSummed_ObjectAsMap = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.ms1_IntensitiesBinnedSummedMap;


        const summedIonCurrent_For_M_Z_Map_Key_M_Z: Map<number, number> = new Map();

        const ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys = Object.keys( ms1_IntensitiesBinnedSummed_ObjectAsMap );

        for ( const outerKey_M_Z_Seconds_Binned_String of ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys ) {

            const innerObjectAsMap_Per_M_Z = ms1_IntensitiesBinnedSummed_ObjectAsMap[ outerKey_M_Z_Seconds_Binned_String ];

            const innerObjectAsMap_Per_M_Z__Keys = Object.keys(innerObjectAsMap_Per_M_Z);

            for ( const innerObjectAsMap_Per_M_Z__Key of innerObjectAsMap_Per_M_Z__Keys ) {

                const innerKey_M_Z_Binned_Number = Number.parseFloat(innerObjectAsMap_Per_M_Z__Key);
                if ( Number.isNaN( innerKey_M_Z_Binned_Number ) ) {
                    const msg = "( Number.isNaN( innerKey_M_Z_Binned_Number ) ) . innerObjectAsMap_Per_M_Z__Key: " + innerObjectAsMap_Per_M_Z__Key;
                    console.warn(msg);
                    throw Error(msg);
                }

                const binnedIonCurrent = innerObjectAsMap_Per_M_Z[ innerObjectAsMap_Per_M_Z__Key ];

                const summedIonCurrent_For_M_Z = summedIonCurrent_For_M_Z_Map_Key_M_Z.get( innerKey_M_Z_Binned_Number );
                if ( summedIonCurrent_For_M_Z ) {
                    const new_summedIonCurrent_For_M_Z = summedIonCurrent_For_M_Z + binnedIonCurrent;
                    summedIonCurrent_For_M_Z_Map_Key_M_Z.set( innerKey_M_Z_Binned_Number, new_summedIonCurrent_For_M_Z );
                } else {
                    summedIonCurrent_For_M_Z_Map_Key_M_Z.set( innerKey_M_Z_Binned_Number, binnedIonCurrent );
                }
            }
        }

        let totalSummedIonCurrent = 0;

        const chart_X : Array<number> = []
        const chart_Y : Array<number> = []

        for ( const summedIonCurrent_For_M_Z_Map_Entry of summedIonCurrent_For_M_Z_Map_Key_M_Z.entries() ) {

            const mz = summedIonCurrent_For_M_Z_Map_Entry[0];
            const summedIonCurrent = summedIonCurrent_For_M_Z_Map_Entry[1];
            chart_X.push( mz );
            chart_Y.push( summedIonCurrent )

            totalSummedIonCurrent += summedIonCurrent;
        }

        console.log( "Chart: MS1 Ion Current vs/ m/z.  totalSummedIonCurrent: " + totalSummedIonCurrent )

        //  Colors for Bars
        const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

        const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

        const chart_Data = [
            {
                name: "",  // So tooltip does not show "trace0"
                type: 'histogram',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram'
                histfunc: "sum",
                nbinsx: 200, // _CHART_MAX_BINS,
                x: chart_X,
                y: chart_Y,
                hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                    '<b>Ion Current</b>: %{y}' +
                    '<br><b>m/z</b>: %{x}<extra></extra>',
                marker: {
                    color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
            }
        ];

        const chartTitle = "MS1 Ion Current vs/ m/z<br><sup>Note: Data in plot are not filtered.</sup>";

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: "m/z",
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
            chart_Y_Axis_Label: "Ion Current",
            showlegend: false
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

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        {
            // const chart_Data_JSON = JSON.stringify( chart_Data );
            // const chart_Layout_JSON = JSON.stringify( chart_Layout );
            //
            // console.log("*********************************")
            // console.log("Data for Chart with Title: " + chartTitle );
            // console.log("chart_Data object: ", chart_Data );
            // console.log("chart_Data_JSON: " + chart_Data_JSON );
            // console.log("chart_Layout object: ", chart_Layout );
            // console.log("chart_Layout_JSON: " + chart_Layout_JSON );
            // console.log("chart_config object: ", chart_config );
            // console.log("*********************************")
        }

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Main Page Plot

            this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
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
                plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
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
            open_MS1_Ion_Current_VS_M_Z_OverlayContainer({
                params: {
                    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData: this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData,
                    searchScanFileName_Selected: this.props.searchScanFileName_Selected,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                }
            });

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
