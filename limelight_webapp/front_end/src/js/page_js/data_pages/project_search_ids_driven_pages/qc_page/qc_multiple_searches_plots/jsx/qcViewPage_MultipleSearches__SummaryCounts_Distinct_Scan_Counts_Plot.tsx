/**
 * qcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Distinct_Scan_Counts_Plot.tsx
 *
 * QC Page Multiple Searches : Summary Counts - Distinct_Scan
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_SummaryCounts_Distinct_Scan_Counts_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_OverlayContainer";
import {QcViewPage_MultipleSearches__ComputeColorsForSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_MultipleSearches__ComputeColorsForSearches";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";


const chartTitle = "Distinct_Scan Count";

/**
 *
 */
export interface QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot extends React.Component< QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props, QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State > {

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
    constructor(props: QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props>, nextState: Readonly<QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props>, prevState: Readonly<QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State>, snapshot?: any) {
        try {

            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
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
    private async _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;


        //  Get Data
        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

        for (const projectSearchId of projectSearchIds) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
            }
            {
                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();

                const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;

                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId.set( projectSearchId, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder );
            }
        }

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct_Scan Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const qcViewPage_MultipleSearches__ComputeColorsForSearches = new QcViewPage_MultipleSearches__ComputeColorsForSearches({ projectSearchIds });

        //  Track all reportedPeptideIds where o_SubFiltering_On_PsmIds_... is TRUE within each ProjectSearchId
        const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId : Map<number,Set<number>> = new Map();

        //  Accumulate all PSM Ids for each reportedPeptideId where o_SubFiltering_On_PsmIds_... is FALSE within each ProjectSearchId
        const psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number,Map<number,Set<number>>> = new Map();

        for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

            for (const projectSearchId of projectSearchIds) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                    continue; // EARLY CONTINUE
                }

                let reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {
                    reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = new Set();
                    reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.set( projectSearchId, reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map );
                }

                let psmIds_Map_Key_ReportedPeptideId_Map = psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! psmIds_Map_Key_ReportedPeptideId_Map ) {
                    psmIds_Map_Key_ReportedPeptideId_Map = new Map();
                    psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmIds_Map_Key_ReportedPeptideId_Map );
                }

                for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                    const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_MapEntry[1];
                    const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

                    if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                        reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map.add( reportedPeptideId )

                    } else {
                        if (dataPerReportedPeptideId_Value.psmIdsSet) {

                            let psmIds = psmIds_Map_Key_ReportedPeptideId_Map.get( reportedPeptideId );
                            if ( ! psmIds ) {
                                psmIds = new Set();
                                psmIds_Map_Key_ReportedPeptideId_Map.set( reportedPeptideId, psmIds );
                            }
                            for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {
                                psmIds.add( psmId );
                            }
                        }
                    }
                }
            }
        }

        const distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId: Map<number, number> = new Map();

        {
            //  Add in all PSM Id counts

            for ( const psmIds_Map_Key_ReportedPeptideId_MapEntry of psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.entries() ) {

                const projectSearchId: number = psmIds_Map_Key_ReportedPeptideId_MapEntry[0];
                const psmIds_Map_Key_ReportedPeptideId = psmIds_Map_Key_ReportedPeptideId_MapEntry[1];

                const scanNumber_Set_When_NO_SearchScanFileId = new Set<number>()
                const scanNumber_Set_Map_Key_SearchScanFileId = new Map<number, Set<number>>()

                const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId.get(projectSearchId)
                if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                    throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId.get(projectSearchId) returned Nothing. projectSearchId: " + projectSearchId )
                }

                const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.get( projectSearchId );

                if ( ! reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {
                    continue;
                }

                for ( const psmIds_MapEntry of psmIds_Map_Key_ReportedPeptideId.entries() ) {

                    const reportedPeptideId: number = psmIds_MapEntry[0];
                    const psmIds = psmIds_MapEntry[1];

                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId) returned Nothing. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId )
                    }

                    if ( reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map.has( reportedPeptideId ) ) {
                        //  Have entry where no filtering on PsmIds so skip this entry
                        continue; // EARLY CONTINUE
                    }

                    for ( const psmId of psmIds ) {
                        const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId)
                        if ( ! psmTblData_For_PsmId ) {
                            throw Error("psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId) returned Nothing. psmId: " + psmId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId )
                        }
                        const scanNumber = psmTblData_For_PsmId.scanNumber
                        const searchScanFileId = psmTblData_For_PsmId.searchScanFileId

                        if ( searchScanFileId === undefined || searchScanFileId === null ) {
                            //  Handle when No searchScanFileId
                            scanNumber_Set_When_NO_SearchScanFileId.add(scanNumber)

                        } else {

                            let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get(searchScanFileId)
                            if ( ! scanNumber_Set ) {
                                scanNumber_Set = new Set()
                                scanNumber_Set_Map_Key_SearchScanFileId.set(searchScanFileId, scanNumber_Set)
                            }
                            scanNumber_Set.add(scanNumber)
                        }
                    }
                }

                let distinct_ScanCount_TotalForSearch = scanNumber_Set_When_NO_SearchScanFileId.size;

                for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                    distinct_ScanCount_TotalForSearch += scanNumber_Set.size
                }

                {
                    let distinct_ScanCount_TotalForSearch_Entry = distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( distinct_ScanCount_TotalForSearch_Entry === undefined || distinct_ScanCount_TotalForSearch_Entry === null ) {
                        distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.set(projectSearchId, distinct_ScanCount_TotalForSearch);
                    } else {
                        const newTotal = distinct_ScanCount_TotalForSearch_Entry + distinct_ScanCount_TotalForSearch;
                        distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.set(projectSearchId, newTotal);
                    }
                }

            }

            //  Add in all PSM counts for Reported Peptide Ids where no filtering on PsmIds

            for ( const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.entries() ) {

                const projectSearchId: number = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[0];
                const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[1];

                const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId.get(projectSearchId)
                if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                    throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Map_Key_ProjectSearchId.get(projectSearchId) returned Nothing. projectSearchId: " + projectSearchId )
                }

                const scanNumber_Set_When_NO_SearchScanFileId = new Set<number>()
                const scanNumber_Set_Map_Key_SearchScanFileId = new Map<number, Set<number>>()

                for ( const reportedPeptideId of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {

                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId) returned Nothing. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId )
                    }

                    //  Process all in psmTblData_For_ReportedPeptideId for main filters
                    for ( const psmTblData_Entry of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                        const scanNumber = psmTblData_Entry.scanNumber
                        const searchScanFileId = psmTblData_Entry.searchScanFileId

                        if ( searchScanFileId === undefined || searchScanFileId === null ) {
                            //  Handle when No searchScanFileId
                            scanNumber_Set_When_NO_SearchScanFileId.add(scanNumber)

                        } else {

                            let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get(searchScanFileId)
                            if ( ! scanNumber_Set ) {
                                scanNumber_Set = new Set()
                                scanNumber_Set_Map_Key_SearchScanFileId.set(searchScanFileId, scanNumber_Set)
                            }
                            scanNumber_Set.add(scanNumber)
                        }

                    }
                }

                let distinct_ScanCount_TotalForSearch = scanNumber_Set_When_NO_SearchScanFileId.size;

                for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                    distinct_ScanCount_TotalForSearch += scanNumber_Set.size
                }

                {
                    let distinct_ScanCount_TotalForSearch_Entry = distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( distinct_ScanCount_TotalForSearch_Entry === undefined || distinct_ScanCount_TotalForSearch_Entry === null ) {
                        distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.set(projectSearchId, distinct_ScanCount_TotalForSearch);
                    } else {
                        const newTotal = distinct_ScanCount_TotalForSearch_Entry + distinct_ScanCount_TotalForSearch;
                        distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.set(projectSearchId, newTotal);
                    }
                }
            }
        }

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []
        const chart_Bars_labels : Array<string> = []
        const chart_Bars_Tooltips : Array<string> = []
        const chart_Colors : Array<string> = []

        {
            const searchNames_AsMap = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchNames_AsMap();

            for (const projectSearchId of projectSearchIds) {

                const color = qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsHexString_By_ProjectSearchId( projectSearchId )

                const searchData = searchNames_AsMap.get( projectSearchId );
                if ( ! searchData ) {
                    const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const x_Label = searchData.searchId.toString();

                let distinct_ScanCount_TotalForSearch = distinct_ScanCount_TotalForSearch_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! distinct_ScanCount_TotalForSearch ) {
                    distinct_ScanCount_TotalForSearch = 0;
                }

                chart_X.push(x_Label);
                chart_Y.push(distinct_ScanCount_TotalForSearch);

                chart_Bars_labels.push(distinct_ScanCount_TotalForSearch.toLocaleString());
                chart_Bars_Tooltips.push( "<b>Search</b>: " + searchData.searchId + "<br><b>Distinct Scan Count</b>: " + distinct_ScanCount_TotalForSearch.toLocaleString());
                chart_Colors.push(color);
            }
        }


        const chart_Data = [
            {
                type: 'bar',
                x: chart_X,
                y: chart_Y,
                text: chart_Bars_labels, //  Text put on each bar.  The chart_Y entries
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
            chart_X_Axis_Label: "Search Number",
            chart_X_Axis_IsTypeCategory: true,
            chart_Y_Axis_Label: "count",
            showlegend: false,
            search_SubSearch_Count_SizeFor: chart_X.length
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
            // console.log("Logging of Summary Counts chart Data currently commented out.  Data for Chart with Title: " + chartTitle );

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
            open_SummaryCounts_Distinct_Scan_Counts_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
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
