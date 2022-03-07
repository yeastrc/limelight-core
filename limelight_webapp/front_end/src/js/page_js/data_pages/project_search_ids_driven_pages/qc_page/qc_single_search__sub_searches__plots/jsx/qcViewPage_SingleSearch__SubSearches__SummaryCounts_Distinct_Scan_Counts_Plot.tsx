/**
 * qcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Distinct_Scan_Counts_Plot.tsx
 *
 * QC Page SingleSearch__SubSearches : Summary Counts - Distinct Scan
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_SummaryCounts_Distinct_Scan_Counts_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_OverlayContainer";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";


const chartTitle = "Distinct Scan Count";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot extends React.Component< QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props, QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State > {

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_Distinct_Scan_Counts_Plot_State>, snapshot?: any) {
        try {

            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
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
    private async _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "Single Search - Search Sub Groups chart.  ( projectSearchIds.length !== 1 )"
            console.warn(msg)
            throw Error(msg)
        }

        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

        //  Get Data
        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
        }

        await this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
        qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
        get_SearchScanFileData();

        const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches =
            await this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
            get_PsmTblData_Data();

        const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result =
            await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
            get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();

        const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder;


        const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
        const searchSubGroupIds_DisplayOrder: Array<number> = [];
        {
            const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
            for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                searchSubGroups_DisplayOrder.push(searchSubGroup);
                searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
            }
        }

        const dataPerSubSearchArray: Array<DataPerSubSearch> = [];

        const peptideDistinct_Array: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry[] =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch();

        const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

        const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
            qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                projectSearchId,
                peptideDistinct_Array,
                qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
            });

        const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

        let scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId : Map<number,Map<number,Set<number>>>

        //  When No searchScanFileId
        let scanNumbers_Map_Key_SearchSubGroupId : Map<number,Set<number>>

        for ( const psmTblData_Entry of psmTblData_Filtered ) {

            if ( ! psmTblData_Entry.scanNumber ) {
                const msg = "( ! psmTblData_Entry.scanNumber ) projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmId = psmTblData_Entry.psmId
            const searchScanFileId = psmTblData_Entry.searchScanFileId; //  Optional
            const scanNumber = psmTblData_Entry.scanNumber;

            const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmId);
            if ( ! subGroupId ) {
                const msg = "( ! subGroupId ) psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( searchScanFileId ) {

                if ( ! scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId ) {
                    scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId = new Map()
                }

                let scanNumbers_Map_Key_searchScanFileId_Map = scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.get(subGroupId);
                if ( ! scanNumbers_Map_Key_searchScanFileId_Map ) {
                    scanNumbers_Map_Key_searchScanFileId_Map = new Map();
                    scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.set(subGroupId, scanNumbers_Map_Key_searchScanFileId_Map);
                }
                let scanNumbers_For_searchScanFileId = scanNumbers_Map_Key_searchScanFileId_Map.get(searchScanFileId);
                if ( ! scanNumbers_For_searchScanFileId ) {
                    scanNumbers_For_searchScanFileId = new Set();
                    scanNumbers_Map_Key_searchScanFileId_Map.set(searchScanFileId, scanNumbers_For_searchScanFileId);
                }
                scanNumbers_For_searchScanFileId.add( scanNumber );

            } else {

                //  When No searchScanFileId
                if ( ! scanNumbers_Map_Key_SearchSubGroupId ) {
                    scanNumbers_Map_Key_SearchSubGroupId = new Map()
                }

                let scanNumbers = scanNumbers_Map_Key_SearchSubGroupId.get(subGroupId)
                if ( ! scanNumbers ) {
                    scanNumbers = new Set();
                    scanNumbers_Map_Key_SearchSubGroupId.set(subGroupId, scanNumbers)
                }
                scanNumbers.add(scanNumber);
            }
        }

        //  Get Scan Count

        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  NOT a Selected searchSubGroup_Id so SKIP
                continue; // EARLY CONTINUE
            }

            let scanCount_PSM_MeetsCutoff = 0;
            const searchScanFileIds_For_SearchSubGroupId = new Set<number>();

            if ( scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId ) {
                const scanNumbers_Map_Key_searchScanFileId_Map = scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.get(searchSubGroup.searchSubGroup_Id);
                if ( ! scanNumbers_Map_Key_searchScanFileId_Map) {
                    //  no data so skip
                    continue;  // EARLY CONTINUE
                }
                for ( const scanNumbers_Map_Key_searchScanFileId_MapEntry of scanNumbers_Map_Key_searchScanFileId_Map.entries() ) {
                    const searchScanFileId = scanNumbers_Map_Key_searchScanFileId_MapEntry[0];
                    const scanNumbers_For_searchScanFileId = scanNumbers_Map_Key_searchScanFileId_MapEntry[1];
                    scanCount_PSM_MeetsCutoff += scanNumbers_For_searchScanFileId.size;
                    searchScanFileIds_For_SearchSubGroupId.add(searchScanFileId);
                }
            } else if ( scanNumbers_Map_Key_SearchSubGroupId ) {
                //  When No searchScanFileId

                const scanNumbers = scanNumbers_Map_Key_SearchSubGroupId.get(searchSubGroup.searchSubGroup_Id);
                if ( scanNumbers ) {
                    scanCount_PSM_MeetsCutoff += scanNumbers.size;
                }
            }

            const dataPerSubSearch: DataPerSubSearch = {

                searchSubGroup_Id: searchSubGroup.searchSubGroup_Id,
                subgroupName_Display: searchSubGroup.subgroupName_Display,

                scanCount_PSM_MeetsCutoff: scanCount_PSM_MeetsCutoff
            }

            dataPerSubSearchArray.push( dataPerSubSearch );
        }

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []
        const chart_Bars_labels : Array<string> = []
        const chart_Bars_Tooltips : Array<string> = []
        const chart_Colors : Array<string> = []

        {
            const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
            const searchSubGroupIds_DisplayOrder: Array<number> = [];
            {
                const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
                for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                    searchSubGroups_DisplayOrder.push(searchSubGroup);
                    searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
                }
            }

            const qcViewPage_SingleSearch__SubSearches__ComputeColorsForSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

            for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                dataPerSubSearchEntry.scanCount_PSM_MeetsCutoff

                const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsForSearches.get_Color_AsHexString_By_SearchSubGroupId(dataPerSubSearchEntry.searchSubGroup_Id)

                const x_Label = dataPerSubSearchEntry.subgroupName_Display;

                let distinct_Scan_CountForSearchSubGroupId = dataPerSubSearchEntry.scanCount_PSM_MeetsCutoff;
                if ( ! distinct_Scan_CountForSearchSubGroupId ) {
                    distinct_Scan_CountForSearchSubGroupId = 0;
                }

                chart_X.push(x_Label);
                chart_Y.push(distinct_Scan_CountForSearchSubGroupId);

                chart_Bars_labels.push(distinct_Scan_CountForSearchSubGroupId.toLocaleString());
                chart_Bars_Tooltips.push( "<b>Sub Search</b>: " + dataPerSubSearchEntry.subgroupName_Display + "<br><b>Distinct Scan Count</b>: " + distinct_Scan_CountForSearchSubGroupId.toLocaleString());
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

        const xAxisTitle = "Sub Search";

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: xAxisTitle,
            chart_X_Axis_IsTypeCategory: true,
            chart_Y_Axis_Label: "count",
            showlegend: false,
            search_SubSearch_Count_SizeFor: chart_X.length
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

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

        {
            //  Adjust Plot Layout if needed so X Axis labels do not cover the X Axis title

            const xAxisLabels = new Set(chart_X);

            const  {
                updateLayoutNeeded, updateLayout
            } = qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object({
                plotRoot_DOM_Element: this.plot_Ref.current,
                xAxisLabels,
                xAxisTitle,
                adjustPlotHeight: ( ! this.props.isInSingleChartOverlay )
            });

            if ( updateLayoutNeeded ) {
                Plotly.relayout(this.plot_Ref.current, updateLayout);
            }
        }

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }

        this.setState({ showUpdatingMessage: false });
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
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
            open_SummaryCounts_Distinct_Scan_Counts_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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


//////////////////////////////////////////
//////////////////////////////////////////

//  Internal Classes

class DataPerSubSearch {

    searchSubGroup_Id: number
    subgroupName_Display: string

    scanCount_PSM_MeetsCutoff: number
}
