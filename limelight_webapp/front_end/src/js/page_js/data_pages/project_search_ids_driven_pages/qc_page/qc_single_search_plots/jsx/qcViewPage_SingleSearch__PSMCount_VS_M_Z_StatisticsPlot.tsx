/**
 * qcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count vs M/Z Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {open_PSMCount_VS_M_Z_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount_VS_M_Z_OverlayContainer";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";


const chartTitle = "PSM Count vs/ M/Z";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_State > {

    static chartTitle = chartTitle;

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
    constructor(props: QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }


        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ||
            props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) ) {
            // No Data for chart so NOT render it
            this._renderChart = false;

        } else {

            const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
            const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId

            if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {

            } else if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {


            } else {
                const msg = "Neither is true. qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull, qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                console.warn(msg);
                throw Error(msg)
            }

        }

        this.plot_Ref = React.createRef();

        this.state = {
            showUpdatingMessage: true
        }
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextProps.searchScanFileId_Selection !== this.props.searchScanFileId_Selection
            || nextProps.isInSingleChartOverlay !== this.props.isInSingleChartOverlay
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount_VS_M_Z_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || prevProps.searchScanFileId_Selection !== this.props.searchScanFileId_Selection
                    || prevProps.isInSingleChartOverlay !== this.props.isInSingleChartOverlay
                    // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  Nothing changed so return

                    return;  // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: true });

                window.setTimeout(() => {
                    try {
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

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

        const projectSearchId = projectSearchIds[0];

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const promise_get_PsmStatistics_M_Z_Statistics_Data =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_M_Z_Statistics_Data();

        promise_get_PsmStatistics_M_Z_Statistics_Data.catch( reason => {
            try {

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_get_PsmStatistics_M_Z_Statistics_Data.then( value => {
            try {
                const psmTblData = value.psmTblData;
                const spectralStorage_NO_Peaks_Data = value.spectralStorage_NO_Peaks_Data;

                const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                    qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                        projectSearchId, peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                    });

                const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
                const qcPage_Flags_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId

                const chart_X : Array<number> = []

                if ( psmTblData_Filtered.length === 0 ) {
                    const msg = "psmTblData_Filtered is empty";
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {
                    const psmTblData_Filtered_FirstEntry = psmTblData_Filtered[0];
                    if ( psmTblData_Filtered_FirstEntry.precursor_M_Over_Z === undefined || psmTblData_Filtered_FirstEntry.precursor_M_Over_Z === null ) {
                        const msg = "( psmTblData_Filtered_FirstEntry.precursor_M_Over_Z === undefined || psmTblData_Filtered_FirstEntry.precursor_M_Over_Z === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                    if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                        if ( psmTblData_Filtered_Entry.searchScanFileId !== this.props.searchScanFileId_Selection ) {
                            //  NOT selected scan file so skip
                            continue;  // EARLY CONTINUE
                        }
                    }

                    let precursor_M_Over_Z: number = null;

                    if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {

                        precursor_M_Over_Z = psmTblData_Filtered_Entry.precursor_M_Over_Z;

                    } else if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

                        const spectralStorage_NO_Peaks_DataFor_SearchScanFileId = spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Filtered_Entry.searchScanFileId );
                        if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
                            const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Filtered_Entry.searchScanFileId ); returned nothing. searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                        if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                            const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing. scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        precursor_M_Over_Z = spectralStorage_NO_Peaks_DataFor_ScanNumber.precursor_M_Over_Z;

                    } else {
                        const msg = "Neither is true. qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull, qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                        console.warn(msg);
                        throw Error(msg)
                    }

                    chart_X.push( precursor_M_Over_Z );
                }

                //  Colors for Bars
                const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

                const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

                const chart_Data = [
                    {
                        name: "",  // So tooltip does not show "trace0"
                        type: 'histogram',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram'
                        x: chart_X,
                        hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                            '<b>PSM Count</b>: %{y}' +
                            '<br><b>M/Z</b>: %{x}<extra></extra>',
                        marker: {
                            color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        }
                    }
                ];

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label: "M/Z",
                    //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
                    chart_Y_Axis_Label: "PSM Count",
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

                this.setState({ showUpdatingMessage: false });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
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
            open_PSMCount_VS_M_Z_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
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
