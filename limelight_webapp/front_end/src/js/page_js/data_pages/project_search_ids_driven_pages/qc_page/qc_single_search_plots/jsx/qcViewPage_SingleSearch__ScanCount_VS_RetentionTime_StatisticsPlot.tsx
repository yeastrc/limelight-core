/**
 * qcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot.tsx
 *
 * QC Page Single Search : Scan Count vs Retention Time Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout, qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_ScanCount_VS_RetentionTime_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanCount_VS_RetentionTime_OverlayContainer";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";


//  used nbinsx: _CHART_MAX_BINS,
// const _CHART_MAX_BINS = 100;

const _CHART_BIN_SIZE = 2;  //  xbins: { size: _CHART_BIN_SIZE }

const chartTitle = "Scan Count vs/ Retention Time";

/**
 *
 */
export interface QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number
    searchScanFileName_Selected: string

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    showUpdatingMessage?: boolean
    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props, QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }


        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {

            // No Data for chart so NOT render it

            const msg = "No Data for Chart";
            console.warn(msg);
            throw Error(msg)

            this._renderChart = false;


        } else {

            const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId
            if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

            } else {
                const msg = "Not true. qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                console.warn(msg);
                throw Error(msg)
            }

        }

        this.plot_Ref = React.createRef();

        this.state = {
            showUpdatingMessage: true,
            show_NoData_Message: false
        };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
            || this.state.show_NoData_Message !== nextState.show_NoData_Message
        ) {
            return true;
        }

        return false;
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                    // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  // Always remove state property checks in 'componentDidUpdate'
                    // || this.state.show_NoData_Message !== nextState.show_NoData_Message
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

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg)
        }

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;



        // if ( peptideDistinct_Array.length === 0 ) {
        //
        //     //  NO Data
        //
        //     this.setState( (state: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State, props: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props ) : QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State => {
        //
        //         if ( ! state.show_NoData_Message ) {
        //             return { show_NoData_Message: true };
        //         }
        //         return null;
        //     });
        //
        //     try {
        //         //  First remove any existing plot, if it exists (And event listener on it)
        //         this._removeChart();
        //     } catch (e) {
        //         //  Eat Exception
        //     }
        //
        //     return; // EARLY RETURN
        // }
        //
        // //   !!!! ONLY Continue if peptideDistinct_Array.length > 0
        //
        // //  YES Data
        //
        // this.setState( (state: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State, props: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_Props ) : QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot_State => {
        //
        //     if ( state.show_NoData_Message ) {
        //         return { show_NoData_Message: false };
        //     }
        //     return null;
        // });



        const promises: Array<Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>> = []

        {
            const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileStatistics_RetentionTime_Statistics_Data();

            promises.push(promise);
        }

        const promisesAll = Promise.all( promises );

        promisesAll.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: false });

                console.warn( "promise.catch(...): reason: ", reason );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promisesAll.then( values => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                const value = values[0]; // Just use first entry

                this.setState({ showUpdatingMessage: false });

                const psmTblData = value.psmTblData;
                const spectralStorage_NO_Peaks_Data = value.spectralStorage_NO_Peaks_Data;

                let chart_Width : number = undefined
                let chart_Height : number = undefined

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

                    chart_Width = Math.floor( targetDOMElement_domRect.width );
                    chart_Height = Math.floor( targetDOMElement_domRect.height );

                    //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

                    // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
                    //
                    // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                    // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                    //
                    // if ()
                } else {

                    chart_Width = qcPage_StandardChartLayout_StandardWidth();
                    chart_Height = qcPage_StandardChartLayout_StandardHeight();
                }

                const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                    qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                        projectSearchId, peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                    });

                const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
                const qcPage_Flags_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId


                //  Colors for Bars.  3 categories to match colors from Summary Count
                const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 2 });

                ////  Create chart_Data

                const chart_Data: Array<any> = [];

                {
                    ///  Create Scan Count (Total) 'X' Array

                    const chart_ScanCount_X: Array<number> = []

                    for ( const spectralStorage_NO_Peaks_DataEntry of spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator() ) {

                        if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                            if ( spectralStorage_NO_Peaks_DataEntry.searchScanFileId !== this.props.searchScanFileId_Selection ) {
                                //  NOT selected scan file so skip
                                continue;  // EARLY CONTINUE
                            }
                        }

                        for ( const dataForSingleScanNumberEntry of spectralStorage_NO_Peaks_DataEntry.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {

                            if ( dataForSingleScanNumberEntry.level !== 1 ) {
                                //  Level is !== 1

                                const retentionTime_Minutes = dataForSingleScanNumberEntry.retentionTime_InSeconds / 60;

                                chart_ScanCount_X.push( retentionTime_Minutes );
                            }
                        }
                    }

                    //  Add to Chart Data

                    const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

                    chart_Data.push({
                        type: 'histogram',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram'
                        x: chart_ScanCount_X,
                        // nbinsx: _CHART_MAX_BINS,
                        xbins: {
                            start: 0,
                            size: _CHART_BIN_SIZE
                        },
                        name: "All",
                        hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                            '<br><b>Scans</b>: %{y}' +
                            '<br><b>Retention Time</b>: %{x}<extra></extra>',
                        marker: {
                            color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        }
                    });
                }

                ///  Create Scan Count 'X' (Filtered) Array

                const chart_FilteredScanEntries_X : Array<number> = [];

                {
                    // if ( psmTblData_Filtered.length === 0 ) {
                    //     const msg = "psmTblData_Filtered is empty";
                    //     console.warn(msg);
                    //     throw Error(msg);
                    // }

                    if ( psmTblData_Filtered.length > 0 ) {

                        if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) {
                            const psmTblData_Filtered_FirstEntry = psmTblData_Filtered[0];
                            if ( psmTblData_Filtered_FirstEntry.retentionTimeSeconds === undefined || psmTblData_Filtered_FirstEntry.retentionTimeSeconds === null ) {
                                const msg = "( psmTblData_Filtered_FirstEntry.retentionTimeSeconds === undefined || psmTblData_Filtered_FirstEntry.retentionTimeSeconds === null )";
                                console.warn(msg);
                                throw Error(msg);
                            }
                        }

                        const scanNumbersProcessed_Map_Key_SearchScanFileId = new Map<number, Set<number>>();

                        for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                            if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                                if ( psmTblData_Filtered_Entry.searchScanFileId !== this.props.searchScanFileId_Selection ) {
                                    //  NOT selected scan file so skip

                                    continue;  // EARLY CONTINUE
                                }
                            }

                            {  //  Track 'Search Scan File Id / Scan Number' processed so do NOT process same pair more than once

                                let scanNumbersProcessed_For_SearchScanFileId = scanNumbersProcessed_Map_Key_SearchScanFileId.get( psmTblData_Filtered_Entry.searchScanFileId );
                                if ( ! scanNumbersProcessed_For_SearchScanFileId ) {
                                    scanNumbersProcessed_For_SearchScanFileId = new Set<number>();
                                    scanNumbersProcessed_Map_Key_SearchScanFileId.set( psmTblData_Filtered_Entry.searchScanFileId, scanNumbersProcessed_For_SearchScanFileId );
                                }
                                if ( scanNumbersProcessed_For_SearchScanFileId.has( psmTblData_Filtered_Entry.scanNumber ) ) {

                                    //  Already Processed this 'Search Scan File Id / Scan Number' so Skip to Next PSM

                                    continue; // EARLY CONTINUE
                                }
                                // Add 'Search Scan File Id / Scan Number' to 'Processed'

                                scanNumbersProcessed_For_SearchScanFileId.add( psmTblData_Filtered_Entry.scanNumber );
                            }

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

                            const retentionTimeSeconds = spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds;

                            const retentionTimeMinutes = retentionTimeSeconds / 60;

                            chart_FilteredScanEntries_X.push( retentionTimeMinutes );
                        }
                    }

                } //  END Filtered Processing

                //  Add to Chart Data

                let hovertemplate =  //  Added '<extra></extra>' to remove secondary box with trace name
                    '<b>Scans</b>: %{y}' +
                    '<br><b>Retention Time</b>: %{x}<extra></extra>';

                if ( this.props.isInSingleChartOverlay ) {
                    hovertemplate =  //  Added '<extra></extra>' to remove secondary box with trace name
                        '<br><b>Number of Scans with at least one PSM that passes current filters</b>: %{y}' +
                        '<br><b>Retention Time</b>: %{x}<extra></extra>';
                }

                const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(1);

                chart_Data.push({
                    type: 'histogram',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram'
                    x: chart_FilteredScanEntries_X,
                    // nbinsx: _CHART_MAX_BINS,
                    xbins: {
                        start: 0,
                        size: _CHART_BIN_SIZE
                    },
                    name: "Filtered",
                    hovertemplate,
                    marker: {
                        color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                    }
                });

                //  Create Chart

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label: "Retention Time (minutes)",
                    //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
                    chart_Y_Axis_Label: "Scan Count",
                    showlegend: true
                });

                //  "Filtered" bars 'overlay' "All" bars
                chart_Layout.barmode = "overlay"

                if ( this.props.isInSingleChartOverlay ) {

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
    private _openChartInOverlay( event : MouseEvent ) {
        try {
            event.stopPropagation()
            open_ScanCount_VS_RetentionTime_OverlayContainer({
                params: {
                    searchScanFileId_Selection: this.props.searchScanFileId_Selection,
                    searchScanFileName_Selected: this.props.searchScanFileName_Selected,
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

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const style : React.CSSProperties = {
            position: "relative",
            height: qcPage_StandardChartLayout_StandardHeight()
        };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }


        return (
            <div style={ style }>
                {( this.state.show_NoData_Message ) ? (
                    <QcPage_ChartFiller_NoData chartTitle={ chartTitle } />
                ) : (
                    <React.Fragment>
                        <div ref={this.plot_Ref} style={ style }></div>
                        {( this.state.showUpdatingMessage ) ? (

                            <QcPage_UpdatingData_BlockCover/>

                        ): null }
                    </React.Fragment>
                )}

            </div>
        );
    }


}
