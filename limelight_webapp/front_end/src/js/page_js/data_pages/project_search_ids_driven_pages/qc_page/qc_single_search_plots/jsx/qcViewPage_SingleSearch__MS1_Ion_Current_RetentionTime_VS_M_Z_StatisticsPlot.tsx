/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot.tsx
 *
 * QC Page Single Search : MS1 Ion Current - Retention Time vs M/Z Statistics
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
import {open_MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData";
import {
    qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__Compute_MS1_Data,
    QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data";
import {PeptidePageRoot_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePageRoot_CentralStateManagerObjectClass";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {ControllerPaths_forDataPages_FromDOM} from "page_js/data_pages/data_pages_common/controllerPaths_forDataPages_FromDOM";


const _MainPage_Chart_Width = 1000; // + 200 for y axis label, tick marks
const _MainPage_Chart_Height = 600; // + 200 for x axis label, tick marks



/**
 *
 */
export interface QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    //  Primary Data
    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData : any  // No Type since comes from server from Spectr

    searchScanFileName_Selected: string
    searchScanFileId_Selected: number

    searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds: boolean

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    onlyForOverlay: {
        cached_MS1_ChartData__ProjectSearchId: number
        cached_MS1_ChartData_Map_Key_SearchScanFileId: Map<number, QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root>
    }

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props, QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State > {

    static readonly _MainPage_Chart_Width = _MainPage_Chart_Width; // + 200 for y axis label, tick marks
    static readonly _MainPage_Chart_Height = _MainPage_Chart_Height; // + 200 for x axis label, tick marks

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Container_Ref :  React.RefObject<HTMLDivElement>
    private plot_Ref :  React.RefObject<HTMLDivElement>
    private linksUnderPlot_Container_Ref :  React.RefObject<HTMLDivElement>

    private scanLevel_1_Ref :  React.RefObject<HTMLSpanElement>
    private scanLevel_2_Ref :  React.RefObject<HTMLSpanElement>

    private _cached_MS1_ChartData__ProjectSearchId: number
    private _cached_MS1_ChartData_Map_Key_SearchScanFileId : Map<number, QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root> = new Map();

    private _renderChart: boolean = true;

    private _selectedChartArea: {
        x_Axis_Start: number
        x_Axis_End: number
        y_Axis_Start: number
        y_Axis_End: number
    }

    private _resize_SetTimeoutId: any;

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Container_Ref = React.createRef();
        this.plot_Ref = React.createRef();
        this.linksUnderPlot_Container_Ref = React.createRef();

        this.scanLevel_1_Ref = React.createRef();
        this.scanLevel_2_Ref = React.createRef();

        this.state = { showUpdatingMessage: true };
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextProps.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
            || nextProps.searchScanFileName_Selected !== this.props.searchScanFileName_Selected
            || nextProps.searchScanFileId_Selected !== this.props.searchScanFileId_Selected
            || nextProps.isInSingleChartOverlay !== this.props.isInSingleChartOverlay
            || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
        ) {
            //  Something changed so return true
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State>, snapshot?: any) {
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
                    || prevProps.searchScanFileName_Selected !== this.props.searchScanFileName_Selected
                    || prevProps.searchScanFileId_Selected !== this.props.searchScanFileId_Selected
                    || prevProps.isInSingleChartOverlay !== this.props.isInSingleChartOverlay
                    // || nextState.no_MS1_Data !== this.state.no_MS1_Data
                    // || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  No Change to inputs so Don't re-populate Block

                    return; // EARLY RETURN
                }

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State =>  {

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
            if ( this._resize_SetTimeoutId ) {
                //  Clear previous timeout
                window.clearTimeout( this._resize_SetTimeoutId );
            }

            this._resize_SetTimeoutId = window.setTimeout( () => {
                try {
                    this.setState({ showUpdatingMessage: true });

                    window.setTimeout( () => {
                        try {
                            if ( ! this._componentMounted ) {
                                //  Component no longer mounted
                                return; // EARLY RETURN
                            }

                            //  Update chart

                            //  Set plot container div back to height 100%
                            this._plot_Container_Ref_Set_Height_100Percent();

                            //  Shrink Chart to 1px X 1px so not hold space so containing <div> will be correct measurement when window size is reduced.
                            this.plot_Ref.current.style.maxWidth = "1px";
                            this.plot_Ref.current.style.maxHeight = "1px";

                            const { chart_Width, chart_Height } = this._compute_ChartSize_InOverlay();
                            const updateLayout = {
                                width: chart_Width,
                                height: chart_Height,
                            };

                            //  Remove plot container div height 100%
                            this._plot_Container_Ref_Remove_Height_100Percent();

                            //  Remove: Shrink Chart to 1px X 1px
                            this.plot_Ref.current.style.maxWidth = "";
                            this.plot_Ref.current.style.maxHeight = "";

                            Plotly.relayout(this.plot_Ref.current, updateLayout);

                        } catch( e ) {
                            console.log("Exception caught in _resizeWindow_Handler()");
                            console.log( e );
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );

                } catch( e ) {
                    console.log("Exception caught in _resizeWindow_Handler()");
                    console.log( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 300 );

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
    private async _populateChart() {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch =
                await this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileMS1_RetentionTime_VS_M_Z_Data();


            const create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result =
                await this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                qc_compute_Cache_create_GeneratedReportedPeptideListData.compute_And_Cache_create_GeneratedReportedPeptideListData();


            this._populateChart_Actual({qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch, create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result});

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _populateChart_Actual(
        {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch, create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
            create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result: Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
        }) {

        if (!this._componentMounted) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        if (!this.plot_Ref.current) {

            //  NO DOM element to put the chart into at this.plot_Ref.current

            console.warn("( ! this.plot_Ref.current ).  Exit _populateChart_Actual early")

            return;  // EARLY RETURN
        }

        if (this.props.isInSingleChartOverlay) {

            this._plot_Container_Ref_Set_Height_100Percent();
        }

        this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_Props>): QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot_State => {

            if (prevState.showUpdatingMessage) {
                return {showUpdatingMessage: false};
            }
            return null;
        });

        if (this._cached_MS1_ChartData__ProjectSearchId !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId) {
            this._cached_MS1_ChartData_Map_Key_SearchScanFileId.clear();
        }

        let ms1_ChartData: QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root;

        if ( this.props.onlyForOverlay ) {

            // Data passed from main to overlay

            ms1_ChartData = this.props.onlyForOverlay.cached_MS1_ChartData_Map_Key_SearchScanFileId.get(this.props.searchScanFileId_Selected);
            if (!ms1_ChartData) {
                const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData = this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData;
                ms1_ChartData = qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__Compute_MS1_Data({ms1_PeakIntensityBinnedOn_RT_MZ_OverallData});
            }

        } else {
            //  Main page chart

            ms1_ChartData = this._cached_MS1_ChartData_Map_Key_SearchScanFileId.get( this.props.searchScanFileId_Selected );
            if ( ! ms1_ChartData ) {

                const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData = this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData;
                ms1_ChartData = qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__Compute_MS1_Data({ ms1_PeakIntensityBinnedOn_RT_MZ_OverallData });
                this._cached_MS1_ChartData_Map_Key_SearchScanFileId.set( this.props.searchScanFileId_Selected, ms1_ChartData );
            }
        }

        const chartTitle = "MS1 Binned Ion Current: m/z vs/ Retention Time<br><sup>Note: MS1 scan data in plot are not filtered.</sup>";

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: "Retention Time (Minutes)",
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
            chart_Y_Axis_Label: "M/Z",
            showlegend: true,
            notMoveTitle: true
        });


        // console.warn("QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot:  Hard Coded width/height")
        //
        // chart_Layout.width = retentionTime_Seconds_Binned_Max - retentionTime_Seconds_Binned_Min + 1 + 200; // + 200 for y axis label, tick marks
        // chart_Layout.height = m_z_Binned_Max - m_z_Binned_Min + 1 + 200; // + 200 for x axis label, tick marks

        console.warn("QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot:  Hard Coded width/height")

        chart_Layout.width = _MainPage_Chart_Width; // + 200 for y axis label, tick marks
        chart_Layout.height = _MainPage_Chart_Height; // + 200 for x axis label, tick marks

        try {
            //  First remove any existing plot, if it exists (And event listener on it)
            this._removeChart();
        } catch (e) {
            //  Eat Exception
        }

        if ( this.props.isInSingleChartOverlay ) {

            const { chart_Width, chart_Height } = this._compute_ChartSize_InOverlay()

            chart_Layout.width = chart_Width;
            chart_Layout.height = chart_Height;
        }

        const peptideEntry_Map_Key_PSM_ID: Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = new Map();

        {  //  Populate peptideEntry_Map_Key_PSM_ID

            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            for ( const peptideEntry of create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result.peptideList ) {
                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                    const msg = "peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                    if ( dataPerReportedPeptideId_MapEntry.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;
                        const psmTblData_For_ReportedPeptideId = psmTblData.get_PsmTblData_For_ReportedPeptideId(dataPerReportedPeptideId_MapEntry.reportedPeptideId);
                        if ( ! psmTblData_For_ReportedPeptideId ) {
                            const msg = "psmTblData.get_PsmTblData_For_ReportedPeptideId(dataPerReportedPeptideId_MapEntry.reportedPeptideId); returned NOTHING. reportedPeptideId: " + dataPerReportedPeptideId_MapEntry.reportedPeptideId + ", projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        for ( const psmTblData_Entry of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                            peptideEntry_Map_Key_PSM_ID.set( psmTblData_Entry.psmId, peptideEntry );
                        }
                    } else {
                        if ( ! dataPerReportedPeptideId_MapEntry.psmIdsSet ) {
                            const msg = "( ! dataPerReportedPeptideId_MapEntry.psmIdsSet ) not set when else of ( dataPerReportedPeptideId_MapEntry.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). reportedPeptideId: " + dataPerReportedPeptideId_MapEntry.reportedPeptideId + ", projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        for ( const psmId of dataPerReportedPeptideId_MapEntry.psmIdsSet ) {
                            peptideEntry_Map_Key_PSM_ID.set( psmId, peptideEntry );
                        }
                    }
                }
            }
        }

        ////////////////////

        //  MS2+ scans for PSMs that meet filters

        const chart_X__MS_2_Plus_PrecursorData : Array<number> = [];
        const chart_Y__MS_2_Plus_PrecursorData : Array<number> = [];
        const chart_Text__MS_2_Plus_PrecursorData : Array<string> = [];

        let MS_2_Plus_PrecursorData_ScanLevel : number = undefined;
        let MS_2_Plus_PrecursorData_ScanLevel_String : string = undefined;

        {

            const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber : Map<number, Map<number, {
                scanNumber: number
                psmTblData_Entry: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId
                peptideEntry: CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
            }>> = new Map();

            for ( const psmTblData_Entry of psmTblData_Filtered ) {

                if ( ! psmTblData_Entry.searchScanFileId ) {
                    const msg = "( ! psmTblData_Entry.searchScanFileId ) projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! psmTblData_Entry.scanNumber ) {
                    const msg = "( ! psmTblData_Entry.scanNumber ) projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                const searchScanFileId = psmTblData_Entry.searchScanFileId;
                const scanNumber = psmTblData_Entry.scanNumber;

                if ( searchScanFileId !== this.props.searchScanFileId_Selected ) {

                    // PSM NOT for selected searchScanFileId_Selected
                    continue;  // EARLY CONTINUE
                }

                const peptideEntry = peptideEntry_Map_Key_PSM_ID.get( psmTblData_Entry.psmId );

                let dataPerPsmId_Map_Key_PsmId = dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber.get( scanNumber );
                if ( ! dataPerPsmId_Map_Key_PsmId ) {
                    dataPerPsmId_Map_Key_PsmId = new Map();
                    dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber.set( scanNumber, dataPerPsmId_Map_Key_PsmId);
                }
                dataPerPsmId_Map_Key_PsmId.set( psmTblData_Entry.psmId, {
                    scanNumber,
                    psmTblData_Entry,
                    peptideEntry
                } );
            }

            let retentionTime_InMinutes_Min = undefined;
            let retentionTime_InMinutes_Max = undefined;
            let precursor_M_Over_Z_Min = undefined;
            let precursor_M_Over_Z_Max = undefined;

            for ( const dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber_Entry of dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber.entries() ) {

                const scanNumber = dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber_Entry[0];
                const dataPerPsmId_Map_Key_PsmId_Map = dataPerPsmId_Map_Key_PsmId_Map_Key_ScanNumber_Entry[1];

                const spectralStorage_NO_Peaks_DataFor_SearchScanFileId =
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( this.props.searchScanFileId_Selected );
                if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
                    const msg = "qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( this.props.searchScanFileId_Selected ); returned NOTHING. searchScanFileId_Selected: " + this.props.searchScanFileId_Selected;
                    console.warn(msg);
                    throw Error(msg);
                }

                const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( scanNumber );
                if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                    const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( scanNumber ); returned NOTHING. scanNumber: " + scanNumber + ", searchScanFileId_Selected: " + this.props.searchScanFileId_Selected;
                    console.warn(msg);
                    throw Error(msg);
                }

                const retentionTime_InMinutes = spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds / 60;
                const precursor_M_Over_Z = spectralStorage_NO_Peaks_DataFor_ScanNumber.precursor_M_Over_Z;

                const precursor_M_Over_Z_String = precursor_M_Over_Z.toFixed( 3 );
                const retentionTime_InMinutes_String = retentionTime_InMinutes.toFixed( 3 );

                chart_X__MS_2_Plus_PrecursorData.push( retentionTime_InMinutes );
                chart_Y__MS_2_Plus_PrecursorData.push( precursor_M_Over_Z );

                const peptideSequenceDisplay_Charge_Display_RowsSet : Set<string> = new Set()

                for ( const dataPerPsmId_Value of dataPerPsmId_Map_Key_PsmId_Map.values() ) {
                    const peptideSequenceDisplay_Charge_Display_Row =
                        dataPerPsmId_Value.peptideEntry.peptideSequenceDisplay +
                        " (+" +
                        dataPerPsmId_Value.psmTblData_Entry.charge +
                        ")";
                    peptideSequenceDisplay_Charge_Display_RowsSet.add( peptideSequenceDisplay_Charge_Display_Row );
                }

                const peptideSequenceDisplay_Charge_Display_RowsArray = Array.from( peptideSequenceDisplay_Charge_Display_RowsSet );
                peptideSequenceDisplay_Charge_Display_RowsArray.sort();

                const hoverText =
                    // Remove this line: '<b>MS' + spectralStorage_NO_Peaks_DataFor_ScanNumber.level + ' data for PSM</b>' +
                    '<br><b>M/Z</b>: ' + precursor_M_Over_Z_String +
                    '<br><b>Retention Time</b>: ' + retentionTime_InMinutes_String +
                    '<br>' + peptideSequenceDisplay_Charge_Display_RowsArray.join("<br>");

                chart_Text__MS_2_Plus_PrecursorData.push( hoverText );

                //  Compute Max/Min

                if ( retentionTime_InMinutes_Min === undefined ) {
                    retentionTime_InMinutes_Min = retentionTime_InMinutes;
                    retentionTime_InMinutes_Max = retentionTime_InMinutes;
                    precursor_M_Over_Z_Min = precursor_M_Over_Z;
                    precursor_M_Over_Z_Max = precursor_M_Over_Z;
                } else {
                    if ( retentionTime_InMinutes_Min > retentionTime_InMinutes ) {
                        retentionTime_InMinutes_Min = retentionTime_InMinutes;
                    }
                    if ( retentionTime_InMinutes_Max < retentionTime_InMinutes ) {
                        retentionTime_InMinutes_Max = retentionTime_InMinutes;
                    }
                    if ( precursor_M_Over_Z_Min > precursor_M_Over_Z ) {
                        precursor_M_Over_Z_Min = precursor_M_Over_Z;
                    }
                    if ( precursor_M_Over_Z_Max < precursor_M_Over_Z ) {
                        precursor_M_Over_Z_Max = precursor_M_Over_Z;
                    }
                }

                MS_2_Plus_PrecursorData_ScanLevel = spectralStorage_NO_Peaks_DataFor_ScanNumber.level;
            }

            console.log( "MS2+ retentionTime_InMinutes_Min: " + retentionTime_InMinutes_Min +
                ", MS2+ retentionTime_InMinutes_Max: " + retentionTime_InMinutes_Max +
                ", MS2+ precursor_M_Over_Z_Min: " + precursor_M_Over_Z_Min +
                ", MS2+ precursor_M_Over_Z_Max: " + precursor_M_Over_Z_Max
            );
        }

        if ( ! MS_2_Plus_PrecursorData_ScanLevel ) {
            MS_2_Plus_PrecursorData_ScanLevel_String = "";
        } else {
            MS_2_Plus_PrecursorData_ScanLevel_String = MS_2_Plus_PrecursorData_ScanLevel.toString();
        }

        const ms2_Marker_Size = this._computeMarkerSize({ chart_X_Max: ms1_ChartData.chart_X_Max, chart_X_Min: ms1_ChartData.chart_X_Min, plot_width: chart_Layout.width });

        // let ms2_Marker_Size = 2;  //  4 in overlay //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
        //
        // if ( this.props.isInSingleChartOverlay ) {
        //     //  Larger size for chart in overlay
        //     ms2_Marker_Size = 4;
        // }


        const chart_Data = [
            {
                //  Fake Scatter Plot with points in upper left and lower right so chart not shift when hide MS2 scatter plot data
                name: "",  // So tooltip does not show "trace0"
                type: 'scatter',
                hoverinfo: "none",
                mode: 'marker',
                marker: {
                    size: 1, //  2,  4 in overlay //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                    color: 'rgba(255,255,255,0)', // white, transparent
                    // symbol: "x" // https://plotly.com/javascript/reference/scattergl/#scattergl-marker-symbol
                },
                xaxis: {
                    range: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ]
                },
                yaxis: {
                    range: [ ms1_ChartData.chart_Y_Min, ms1_ChartData.chart_Y_Max ]
                },
                x: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ],
                y: [ ms1_ChartData.chart_Y_Max, ms1_ChartData.chart_Y_Min ],
            },
            {
                name: "",  // So tooltip does not show "trace0"
                type: 'heatmap',
                colorscale: "OrRd",
                // colorscale: [   //  The numbers on left are from zero to one
                //     ['0', 'rgb(255,255,255)'], // white
                //     ['1', 'rgb(255,0,0)'], // red
                // ],
                // colorscale: [   //  The numbers on left are from zero to one
                //     ['0', 'rgb(255,255,255)'], // white
                //     ['.3', 'rgb(0,0,255)'], // blue
                //     ['.6', 'rgb(255,255,0)'], // yellow
                //     ['1', 'rgb(255,0,0)'], // red
                // ],
                colorbar:{
                    len: 0.92, //Change size of bar
                    y: 0,
                    yanchor: "bottom",
                    ypad: 10, //  default is 10
                    title: {  // https://plotly.com/javascript/reference/heatmap/#heatmap-colorbar-title
                        text: 'Total Ion Current', //  set title
                        side: 'top', //set position
                        // font: {color: 'blue'} //title font color
                    },
                    tickmode: "array",
                    tickvals: ms1_ChartData.ms1_IntensityScaleBar_Tick_Values,
                    ticktext: ms1_ChartData.ms1_IntensityScaleBar_Tick_Labels
                },
                xaxis: {
                    range: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ]
                },
                yaxis: {
                    range: [ ms1_ChartData.chart_Y_Min, ms1_ChartData.chart_Y_Max ]
                },
                x: ms1_ChartData.chart_X,
                y: ms1_ChartData.chart_Y,
                z: ms1_ChartData.chart_Z,
                zmin: ms1_ChartData.intensity_Min_For_ColorBar_Computations_Log,
                zmax: ms1_ChartData.intensity_Max_For_ColorBar_Computations_Log,
                hoverongaps: false,
                text: ms1_ChartData.chart_TextEntries_ForTooltip,
                hoverinfo: 'text',
                //   !!!  Update hovertemplate
                // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                //     '<b>Ion Current</b>: %{z}' +
                //     '<br><b>Retention Time (minutes)</b>: %{x}' +
                //     '<br><b>M/Z</b>: %{y}' +
                //     '<extra></extra>'
            },
            {
                name: "MS" + MS_2_Plus_PrecursorData_ScanLevel_String + " Filtered",
                type: 'scattergl', // scattergl  scatter
                mode: 'markers',
                marker: {
                    size: ms2_Marker_Size, //  2,  4 in overlay //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                    color: "green",
                    // symbol: "x" // https://plotly.com/javascript/reference/scattergl/#scattergl-marker-symbol
                },
                xaxis: {
                    range: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ]
                },
                yaxis: {
                    range: [ ms1_ChartData.chart_Y_Min, ms1_ChartData.chart_Y_Max ]
                },
                x: chart_X__MS_2_Plus_PrecursorData,
                y: chart_Y__MS_2_Plus_PrecursorData,
                text: chart_Text__MS_2_Plus_PrecursorData,
                hoverinfo: 'text',
                // hovertemplate: //  Added '<extra></extra>' to remove secondary box with trace name
                //     // Remove this line: '<b>MS' + MS_2_Plus_PrecursorData_ScanLevel_String + ' data for PSM</b>' +
                //     '<br><b>M/Z</b>: %{y}' +
                //     '<br><b>Retention Time</b>: %{x}<extra></extra>'
            }
        ];

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        try {
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
        } catch (e) {
            //  ignore exception
        }

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );

        this.setState({ showUpdatingMessage: false });

        //  Register callback on user selects zoom area in chart
        {
            const chart_DOM_Root = this.plot_Ref.current

            //   @ts-ignore
            chart_DOM_Root.on("plotly_relayout", (eventdata) => {
                try {
                    const plot_width = chart_Layout.width;

                    let newMarkerSize: number = undefined;

                    if (eventdata["xaxis.range[1]"] !== undefined) {

                        //  Selected Range  - X axis is Retention Time in Minutes.  Y axis is M/Z

                        const xaxis_range_0 = eventdata["xaxis.range[0]"];
                        const xaxis_range_1 = eventdata["xaxis.range[1]"];

                        const yaxis_range_0 = eventdata["yaxis.range[0]"];
                        const yaxis_range_1 = eventdata["yaxis.range[1]"];

                        this._selectedChartArea = {
                            x_Axis_Start: xaxis_range_0,
                            x_Axis_End: xaxis_range_1,
                            y_Axis_Start: yaxis_range_0,
                            y_Axis_End: yaxis_range_1
                        }

                        newMarkerSize = this._computeMarkerSize({ chart_X_Max: xaxis_range_1, chart_X_Min: xaxis_range_0, plot_width });

                    } else {
                        //  NO Selected Range
                        newMarkerSize = this._computeMarkerSize({ chart_X_Max: ms1_ChartData.chart_X_Max, chart_X_Min: ms1_ChartData.chart_X_Min, plot_width });

                        this._selectedChartArea = undefined;
                    }

                    const chartUpdate_Properties: any = {
                        "marker.size": newMarkerSize
                    };

                    Plotly.restyle(this.plot_Ref.current, chartUpdate_Properties);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }


        if ( this.props.isInSingleChartOverlay ) {

            this._plot_Container_Ref_Remove_Height_100Percent();

            if ( this.linksUnderPlot_Container_Ref.current ) {
                this.linksUnderPlot_Container_Ref.current.style.visibility = ""
            }
        }
    }

    /**
     *
     */
    private _compute_ChartSize_InOverlay() : { chart_Width: number, chart_Height: number } {

        const plotContainerDOMElement_domRect = this.plot_Container_Ref.current.getBoundingClientRect();

        /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

        // const targetDOMElement_domRect_Left = plotContainerDOMElement_domRect.left;
        // const targetDOMElement_domRect_Right = plotContainerDOMElement_domRect.right;
        // const targetDOMElement_domRect_Top = plotContainerDOMElement_domRect.top;
        // const targetDOMElement_domRect_Bottom = plotContainerDOMElement_domRect.bottom;

        //  <div> containing the fake links under the plot
        const linksUnderPlot_ContainerDOMElement_domRect = this.linksUnderPlot_Container_Ref.current.getBoundingClientRect();

        const chart_Width = Math.floor( plotContainerDOMElement_domRect.width );
        const chart_Height = Math.floor( plotContainerDOMElement_domRect.height - ( linksUnderPlot_ContainerDOMElement_domRect.height / 2 ) );  // Subtract half of divAbovePlotDOMElement_Height to provide space for it


        //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

        // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
        //
        // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
        // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
        //
        // if ()

        return { chart_Width, chart_Height };
    }

    /**
     *
     */
    private _computeMarkerSize({ chart_X_Max, chart_X_Min, plot_width } : { chart_X_Max: number, chart_X_Min: number, plot_width: number }) : number {

        const marker_size_Min = 2;
        const marker_size_Max = 15;

        const marker_size = 0.25; // x-axis units;

        //  Approximations

        const margin_left = 50;
        const margin_right = 50;

        let newMarkerSize = Math.floor( marker_size *
            (plot_width - margin_left - margin_right) /
            (chart_X_Max - chart_X_Min) );

        if ( newMarkerSize < marker_size_Min ) {
            newMarkerSize = marker_size_Min;
        }
        if ( newMarkerSize > marker_size_Max ) {
            newMarkerSize = marker_size_Max;
        }

        return newMarkerSize;
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
            open_MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer({
                params: {
                    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData: this.props.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData,
                    searchScanFileId_Selected: this.props.searchScanFileId_Selected,
                    searchScanFileName_Selected: this.props.searchScanFileName_Selected,
                    searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds: this.props.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    cached_MS1_ChartData__ProjectSearchId: this._cached_MS1_ChartData__ProjectSearchId,
                    cached_MS1_ChartData_Map_Key_SearchScanFileId: this._cached_MS1_ChartData_Map_Key_SearchScanFileId
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
    private _update_ThisPage_WithSelection() {
        try {
            if ( this.props.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds ) {

                const scanFilenameIds_Selected = new Set<number>();

                scanFilenameIds_Selected.add( this.props.searchScanFileId_Selected );

                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected(scanFilenameIds_Selected);
            }

            const scan_RetentionTime_MZ_UserSelection_StateObject = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject

            if ( this._selectedChartArea ) {

                //  Only set if an area of the chart is selected

                scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__From__Filter(
                    Math.floor( this._selectedChartArea.x_Axis_Start * 100 ) / 100
                );
                scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__To__Filter(
                    Math.ceil(this._selectedChartArea.x_Axis_End * 100 ) / 100
                );
                scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__From__Filter(
                    Math.floor(this._selectedChartArea.y_Axis_Start * 100 ) / 100
                );
                scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__To__Filter(
                    Math.ceil(this._selectedChartArea.y_Axis_End * 100 ) / 100
                );
            } else {

                //  No selection so clear the values

                scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
            }

            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _open_Peptide_Page_WithSelection() {
        try {

            const pageControllerPath_Override = ControllerPaths_forDataPages_FromDOM.controllerPath_Peptide_Page_FromDOM();

            //  Create to override the value of ... from the URL
            const peptidePageRoot_CentralStateManagerObjectClass_ForNewWindow = new PeptidePageRoot_CentralStateManagerObjectClass({ centralPageStateManager: undefined });

            {
                const encodedStateData = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.peptidePageRoot_CentralStateManagerObjectClass.getDataForEncoding()
                peptidePageRoot_CentralStateManagerObjectClass_ForNewWindow.initialize({optional_encodedStateData: encodedStateData });
            }

            if ( this.props.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds ) {
                const valueChangedCallback = () => {
                }
                const scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
                    valueChangedCallback
                });

                const scanFilenameIds_Selected = new Set<number>();

                scanFilenameIds_Selected.add( this.props.searchScanFileId_Selected );

                scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected(scanFilenameIds_Selected);

                const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();

                peptidePageRoot_CentralStateManagerObjectClass_ForNewWindow.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData({ scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData });
            }

            if ( this._selectedChartArea ) {

                //  Only set if an area of the chart is selected

                const valueChangedCallback = () => {
                }
                const scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
                    valueChangedCallback
                });

                if ( this._selectedChartArea ) {

                    //  Only set if an area of the chart is selected

                    scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__From__Filter(
                        Math.floor( this._selectedChartArea.x_Axis_Start * 100 ) / 100
                    );
                    scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__To__Filter(
                        Math.ceil(this._selectedChartArea.x_Axis_End * 100 ) / 100
                    );
                    scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__From__Filter(
                        Math.floor(this._selectedChartArea.y_Axis_Start * 100 ) / 100
                    );
                    scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__To__Filter(
                        Math.ceil(this._selectedChartArea.y_Axis_End * 100 ) / 100
                    );
                }

                const scan_RetentionTime_MZ_UserSelections_EncodedStateData = scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();

                peptidePageRoot_CentralStateManagerObjectClass_ForNewWindow.set_scan_RetentionTime_MZ_UserSelections_EncodedStateData({ scan_RetentionTime_MZ_UserSelections_EncodedStateData });
            }

            const newWindowURL = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.centralPageStateManager.getURL_ForCurrentState({
                componentOverridesAdditions: [peptidePageRoot_CentralStateManagerObjectClass_ForNewWindow],
                pageControllerPath_Override
            })

            // MUST open window before make AJAX Call.  This is a Browser Security requirement
            //  window.open(...): Must run in code directly triggered by click event

            const newWindow = window.open(newWindowURL, "_blank");

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //   Not Used.  MAY NEED UPDATING if decide to use it
    //
    // /**
    //  *
    //  */
    // private _open_Protein_Page_WithSelection() {
    //     try {
    //
    //         const pageControllerPath_Override = ControllerPaths_forDataPages_FromDOM.controllerPath_Protein_Page_FromDOM();
    //
    //         //  Create to override the value of ... from the URL
    //         const proteinList_CentralStateManagerObjectClass_ForNewWindow = new ProteinList_CentralStateManagerObjectClass({ centralPageStateManager: undefined });
    //
    //         //  Only easy way to get other filters from QC page is to have shared Root Central State object between Peptide, Protein, and QC main pages
    //
    //         {
    //             const valueChangedCallback = () => {
    //             }
    //             const scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject({
    //                 valueChangedCallback
    //             });
    //
    //             const scanFilenameIds_Selected = new Set<number>();
    //
    //             scanFilenameIds_Selected.add( this.props.searchScanFileId_Selected );
    //
    //             scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected(scanFilenameIds_Selected);
    //
    //             const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
    //
    //             proteinList_CentralStateManagerObjectClass_ForNewWindow.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData({ scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData });
    //         }
    //
    //         {
    //             const valueChangedCallback = () => {
    //             }
    //             const scan_RetentionTime_MZ_UserSelection_StateObject = new Scan_RetentionTime_MZ_UserSelections_StateObject({
    //                 valueChangedCallback
    //             });
    //
    //             if ( this._selectedChartArea ) {
    //
    //                 scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__From__Filter(
    //                     Math.floor( this._selectedChartArea.x_Axis_Start * 100 ) / 100
    //                 );
    //                 scan_RetentionTime_MZ_UserSelection_StateObject.set_retentionTime_InMinutes__To__Filter(
    //                     Math.ceil(this._selectedChartArea.x_Axis_End * 100 ) / 100
    //                 );
    //                 scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__From__Filter(
    //                     Math.floor(this._selectedChartArea.y_Axis_Start * 100 ) / 100
    //                 );
    //                 scan_RetentionTime_MZ_UserSelection_StateObject.set_mz__To__Filter(
    //                     Math.ceil(this._selectedChartArea.y_Axis_End * 100 ) / 100
    //                 );
    //             }
    //
    //             const scan_RetentionTime_MZ_UserSelections_EncodedStateData = scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
    //
    //             proteinList_CentralStateManagerObjectClass_ForNewWindow.set_scan_RetentionTime_MZ_UserSelections_EncodedStateData({ scan_RetentionTime_MZ_UserSelections_EncodedStateData });
    //         }
    //         { //  Copy Mod selections
    //             const modsSelectedEncodedStateData = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.peptidePageRoot_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
    //             proteinList_CentralStateManagerObjectClass_ForNewWindow.setModsSelectedEncodedStateData({ modsSelectedEncodedStateData });
    //         }
    //         { //  Copy Reporter Ion selections
    //             const reporterIonMassesSelectedEncodedStateData = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.peptidePageRoot_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
    //             proteinList_CentralStateManagerObjectClass_ForNewWindow.setReporterIonMassesSelectedEncodedStateData({ reporterIonMassesSelectedEncodedStateData });
    //         }
    //
    //         const newWindowURL = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.centralPageStateManager.getURL_ForCurrentState({
    //             componentOverridesAdditions: [proteinList_CentralStateManagerObjectClass_ForNewWindow],
    //             pageControllerPath_Override
    //         })
    //
    //         // MUST open window before make AJAX Call.  This is a Browser Security requirement
    //         //  window.open(...): Must run in code directly triggered by click event
    //
    //         const newWindow = window.open(newWindowURL, "_blank");
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }

    private _plot_Container_Ref_Set_Height_100Percent() {

        if ( this.plot_Container_Ref.current ) {
            this.plot_Container_Ref.current.style.height = "100%"; //  set height 100%
        }
    }

    private _plot_Container_Ref_Remove_Height_100Percent() {

        if ( this.plot_Container_Ref.current ) {
            this.plot_Container_Ref.current.style.height = ""; //  remove height 100%
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
        } else {
            style.minHeight = _MainPage_Chart_Height;
        }

        let linksUnderPlot_Container_Style : React.CSSProperties = undefined;
        if ( this.props.isInSingleChartOverlay ) {
            //  In Overlay
            linksUnderPlot_Container_Style = {position: "absolute", top: -15, left: 15, visibility: "hidden" };  // initially hide but take up space so can be measured
        } else {
            // Main page
            linksUnderPlot_Container_Style = {position: "relative", marginLeft: 15, marginBottom: 15 };
        }

        return (
            <div style={ style }>
                <div ref={this.plot_Container_Ref} style={ style }>
                    <div ref={this.plot_Ref}></div>
                </div>
                <div style={ { position: "relative"} }>
                    <div ref={this.linksUnderPlot_Container_Ref} style={ linksUnderPlot_Container_Style } >
                        <div>
                            <span
                                className=" fake-link "
                                onClick={ event =>  {
                                    this._update_ThisPage_WithSelection();
                                }}
                                title={ ( this.props.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds ) ? (
                                    "Clicking this link will update this page's filters to the shown m/z range, retention time range, and scan file"
                                ) : (
                                    "Clicking this link will update this page's filters to the shown m/z range and retention time range"
                                )}
                            >
                                Add Displayed Ranges to Page Filters
                            </span>
                        </div>
                        <div>
                            <span
                                className=" fake-link "
                                onClick={ event =>  {
                                    this._open_Peptide_Page_WithSelection();
                                }}
                                title={ ( this.props.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds ) ? (
                                    "Open the peptide view page using the selected scan file, m/z range, and retention time range currently visible in this plot."
                                ) : (
                                    "Open the peptide view page using the m/z range and retention time range currently visible in this plot."
                                )}
                            >
                                Show Peptide Page for Selection
                            </span>
                        </div>
                    </div>
                </div>
                {( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): null }
            </div>
        );
    }


}
