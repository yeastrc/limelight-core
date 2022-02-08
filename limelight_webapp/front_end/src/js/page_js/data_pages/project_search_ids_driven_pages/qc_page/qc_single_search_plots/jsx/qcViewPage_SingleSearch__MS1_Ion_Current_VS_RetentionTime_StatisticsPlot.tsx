/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot.tsx
 *
 * QC Page Single Search : MS1 Ion Current vs Retention Time Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {open_MS1_Ion_Current_VS_RetentionTime_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_OverlayContainer";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";

/**
 *
 */
export interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props {

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
interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props, QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State > {

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _renderChart: boolean = true;

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();

        this.state = { showUpdatingMessage: false };
    }

    /**
     *
     */
    componentWillUnmount() {

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextProps.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State>, snapshot?: any) {
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
                    // || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  No Change to inputs so Don't re-populate Block

                    return; // EARLY RETURN
                }

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State =>  {

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

        if ( ! this.plot_Ref.current ) {

            //  NO DOM element to put the chart into at this.plot_Ref.current

            console.warn("( ! this.plot_Ref.current ).  Exit _populateChart_Actual early")

            return;  // EARLY RETURN
        }

        const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData = this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData;

        const jsonContents = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.jsonContents;
        const summaryData = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.summaryData;

        this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_StatisticsPlot_State =>  {

            if ( prevState.showUpdatingMessage ) {
                return { showUpdatingMessage: false };
            }
            return null;
        });

        let totalSummedIonCurrent = 0;

        const chart_X : Array<number> = []
        const chart_Y : Array<number> = []


        const ms1_IntensitiesBinnedSummed_ObjectAsMap = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.ms1_IntensitiesBinnedSummedMap;

        const ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys = Object.keys( ms1_IntensitiesBinnedSummed_ObjectAsMap );

        for ( const outerKey_RetentionTime_Seconds_Binned_String of ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys ) {

            const outerKey_RetentionTime_Seconds_Binned_Number = Number.parseFloat(outerKey_RetentionTime_Seconds_Binned_String);
            if ( Number.isNaN( outerKey_RetentionTime_Seconds_Binned_Number ) ) {
                const msg = "( Number.isNaN( outerKey_RetentionTime_Seconds_Binned_Number ) ) . outerKey_RetentionTime_Seconds_Binned_String: " + outerKey_RetentionTime_Seconds_Binned_String;
                console.warn(msg);
                throw Error(msg);
            }

            let summedIonCurrent_For_RetentionTime: number = 0;

            const innerObjectAsMap_Per_M_Z = ms1_IntensitiesBinnedSummed_ObjectAsMap[ outerKey_RetentionTime_Seconds_Binned_String ];

            const innerObjectAsMap_Per_M_Z__Keys = Object.keys(innerObjectAsMap_Per_M_Z);

            for ( const innerObjectAsMap_Per_M_Z__Key of innerObjectAsMap_Per_M_Z__Keys ) {
                const binnedIonCurrent = innerObjectAsMap_Per_M_Z[ innerObjectAsMap_Per_M_Z__Key ];
                summedIonCurrent_For_RetentionTime += binnedIonCurrent;
            }

            const outerKey_RetentionTime_Minutes = outerKey_RetentionTime_Seconds_Binned_Number / 60

            chart_X.push( outerKey_RetentionTime_Minutes );
            chart_Y.push( summedIonCurrent_For_RetentionTime )

            totalSummedIonCurrent += summedIonCurrent_For_RetentionTime;
        }

        console.log( "Chart: MS1 Ion Current vs/ Retention Time.  totalSummedIonCurrent: " + totalSummedIonCurrent )

        //  Colors for Bars
        const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

        const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

        const chart_Data = [
            {
                name: "",  // So tooltip does not show "trace0"
                type: 'histogram',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram'
                histfunc: "sum",
                x: chart_X,
                y: chart_Y,
                hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                    '<b>Ion Current</b>: %{y}' +
                    '<br><b>Retention Time (minutes)</b>: %{x}<extra></extra>',
                marker: {
                    color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
            }
        ];

        const chartTitle = "MS1 Ion Current vs/ Retention Time<br><sup>Note: Data in plot are not filtered.</sup>";

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: "Retention Time (Minutes)",
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
            chart_Y_Axis_Label: "Ion Current",
            showlegend: false
        });

        try {
            //  First remove any existing plot, if it exists (And event listener on it)
            this._removeChart();
        } catch (e) {
            //  Eat Exception
        }

        if ( this.props.isInSingleChartOverlay ) {

            const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();

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

            chart_Layout.width = chart_Width;
            chart_Layout.height = chart_Height;
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

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }

    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
                plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis
            });
        } catch (e) {
            //  Eat Exception
        }
        try {
            Plotly.purge(this.plot_Ref.current)
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _openChartInOverlay( event ) {
        try {
            event.stopPropagation()
            open_MS1_Ion_Current_VS_RetentionTime_OverlayContainer({
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

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const style : React.CSSProperties = { position: "relative" };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }

        return (
            <div style={ style }>
                <div ref={this.plot_Ref} style={ style }></div>
                {( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): null }
            </div>
        );
    }


}
