/**
 * qcViewPage_SingleSearch__MissedCleavages_Plot.tsx
 *
 * QC Page Single Search : Missed Cleavages - Multiple computed values
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
import {open_MissedCleavages_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MissedCleavages_OverlayContainer";
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";


const chartTitle = "Missed Cleavages (MC) Values";


/**
 *
 */
export interface QcViewPage_SingleSearch__MissedCleavages_Plot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    compute_MissedCleavages_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__MissedCleavages_Plot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__MissedCleavages_Plot extends React.Component< QcViewPage_SingleSearch__MissedCleavages_Plot_Props, QcViewPage_SingleSearch__MissedCleavages_Plot_State > {

    static chartTitle = chartTitle;


    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MissedCleavages_Plot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();

        this.state = {};
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

        this._componentMounted = true;

        try {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__MissedCleavages_Plot_Props>, nextState: Readonly<QcViewPage_SingleSearch__MissedCleavages_Plot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextProps.compute_MissedCleavages_Data_Result_Root !== this.props.compute_MissedCleavages_Data_Result_Root
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MissedCleavages_Plot_Props>, prevState: Readonly<QcViewPage_SingleSearch__MissedCleavages_Plot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                || prevProps.compute_MissedCleavages_Data_Result_Root !== this.props.compute_MissedCleavages_Data_Result_Root
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
            ) {
            } else {
                //  Nothing changed so return

                return;  // EARLY RETURN
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

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result = this.props.compute_MissedCleavages_Data_Result_Root;

        let  missedCleavages_Data: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch = undefined;

        if ( qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result ) {
            missedCleavages_Data = qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result.get_result_ForProjectSearchId(projectSearchId);
        }

        //  Colors for Bars
        const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 3 });

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []
        const chart_Bars_labels: Array<string> = [];
        const chart_Bars_Tooltips: Array<string> = [];
        const chart_Colors : Array<any> = []

        {  // Fraction Distinct Peptides with Missed Cleavage

            const distinctPeptide_Count_Containing_MissedCleavage = missedCleavages_Data.distinctPeptide_Count_Containing_MissedCleavage;
            const total_DistinctPeptide_Count = missedCleavages_Data.total_DistinctPeptide_Count;

            const fraction = distinctPeptide_Count_Containing_MissedCleavage / total_DistinctPeptide_Count;
            const label = distinctPeptide_Count_Containing_MissedCleavage.toLocaleString() + " Distinct Peptide Missed Cleavage Count / " +
                total_DistinctPeptide_Count.toLocaleString() + " Total Distinct Peptide Count"

            let fraction_BarLabel = fraction.toFixed( 2 );
            {
                const removeFromEndString = "0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }
            {
                const removeFromEndString = ".0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }

            chart_X.push( "MC / Peptide" );
            chart_Y.push( fraction );
            chart_Bars_labels.push( fraction_BarLabel );
            chart_Bars_Tooltips.push( label );

            const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 0 );
            chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
        }
        {   // Fraction PSMs with Missed Cleavage

            const psm_Count_Containing_MissedCleavage = missedCleavages_Data.psm_Count_Containing_MissedCleavage;
            const total_PSM_Count = missedCleavages_Data.total_PSM_Count;

            const fraction = psm_Count_Containing_MissedCleavage / total_PSM_Count;
            const label = psm_Count_Containing_MissedCleavage.toLocaleString() + " PSM Count with Missed Cleavage  / " +
                total_PSM_Count.toLocaleString() + " Total PSM Count"

            let fraction_BarLabel = fraction.toFixed( 2 );
            {
                const removeFromEndString = "0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }
            {
                const removeFromEndString = ".0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }

            chart_X.push( "MC PSM Fraction" );
            chart_Y.push( fraction );
            chart_Bars_labels.push( fraction_BarLabel );
            chart_Bars_Tooltips.push( label );

            const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 1 );
            chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
        }
        {  // Missed Cleavage Count for PSMs / Total PSM Count

            const missedCleavage_TotalCount_AcrossAllPSMs = missedCleavages_Data.missedCleavage_TotalCount_AcrossAllPSMs;
            const total_PSM_Count = missedCleavages_Data.total_PSM_Count;

            const fraction = missedCleavage_TotalCount_AcrossAllPSMs / total_PSM_Count;
            const label = missedCleavage_TotalCount_AcrossAllPSMs.toLocaleString() + " Missed Cleavage Count (PSMs) / " +
                total_PSM_Count.toLocaleString() + " Total PSM Count"

            let fraction_BarLabel = fraction.toFixed( 2 );
            {
                const removeFromEndString = "0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }
            {
                const removeFromEndString = ".0";
                if ( fraction_BarLabel.endsWith( removeFromEndString ) ) {
                    fraction_BarLabel = fraction_BarLabel.substring( 0, fraction_BarLabel.length - removeFromEndString.length );
                }
            }

            chart_X.push( "MC / PSM" );
            chart_Y.push( fraction );
            chart_Bars_labels.push( fraction_BarLabel );
            chart_Bars_Tooltips.push( label );

            const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 2 );
            chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
        }

        const chart_Data = [
            {
                type: 'bar',
                x: chart_X,
                y: chart_Y,
                text: chart_Bars_labels, //  Text put on each bar
                hoverinfo: "text", //  Hover contents
                hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                marker: {
                    color: chart_Colors  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
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

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: undefined,
            chart_X_Axis_IsTypeCategory: true,
            chart_Y_Axis_Label: "Fraction",
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

        if ( ! this.plot_Ref.current ) {
            const msg = "( ! this.plot_Ref.current )";
            console.warn(msg);
            throw Error(msg);
        }

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        {
            // console.log("Logging of Fraction PSMs w/ Missed Cleavages chart Data currently commented out.  Data for Chart with Title: " + chartTitle );

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

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }

        this.setState({ showUpdatingMessage: false });
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
            open_MissedCleavages_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    compute_MissedCleavages_Data_Result_Root : this.props.compute_MissedCleavages_Data_Result_Root
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