/**
 * qcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_PSM_Counts_Plot.tsx
 *
 * QC Page SingleSearch__SubSearches : Summary Counts
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout,
    qcPage_StandardChartLayout_Standard_Plot_Margin_Bottom,
    qcPage_StandardChartLayout_StandardHeight
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_SummaryCounts_PSM_Counts_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_OverlayContainer";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";


const chartTitle = "PSM Count";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot extends React.Component< QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props, QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State > {

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
    constructor(props: QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State>, snapshot?: any) {
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
    private _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        this.setState({ showUpdatingMessage: false }); // Can do here since no Promise .then .catch after this point

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        //  Track all reportedPeptideIds where no_SubFiltering_On_PsmIds_... is TRUE within each Search Sub Group Id
        const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_SearchSubGroupId : Map<number,Set<number>> = new Map();

        //  Accumulate all PSM Ids for each reportedPeptideId where no_SubFiltering_On_PsmIds_... is FALSE within each Search Sub Group Id
        const psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId : Map<number,Map<number,Set<number>>> = new Map();

        for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

            for ( const dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue of peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.values() ) {

                for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue.entries() ) {

                    const searchSubgroupId = dataPerReportedPeptideId_MapEntry[0];
                    const data_PerReportedPeptideId_SearchSubGroupId_Value = dataPerReportedPeptideId_MapEntry[1];
                    const reportedPeptideId = data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId;

                    if (data_PerReportedPeptideId_SearchSubGroupId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                        let reportedPeptideIds_Where_no_SubFiltering_On_PsmIds = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_SearchSubGroupId.get(searchSubgroupId);
                        if ( ! reportedPeptideIds_Where_no_SubFiltering_On_PsmIds ) {
                            reportedPeptideIds_Where_no_SubFiltering_On_PsmIds = new Set();
                            reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_SearchSubGroupId.set(searchSubgroupId, reportedPeptideIds_Where_no_SubFiltering_On_PsmIds);
                        }

                        reportedPeptideIds_Where_no_SubFiltering_On_PsmIds.add( reportedPeptideId )

                    } else {
                        if (data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet) {

                            let psmIds_Map_Key_SearchSubGroupId_Map = psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId.get( reportedPeptideId );
                            if ( ! psmIds_Map_Key_SearchSubGroupId_Map ) {
                                psmIds_Map_Key_SearchSubGroupId_Map = new Map();
                                psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId.set( reportedPeptideId, psmIds_Map_Key_SearchSubGroupId_Map );
                            }
                            let psmIds = psmIds_Map_Key_SearchSubGroupId_Map.get( searchSubgroupId );
                            if ( ! psmIds ) {
                                psmIds = new Set();
                                psmIds_Map_Key_SearchSubGroupId_Map.set( searchSubgroupId, psmIds );
                            }
                            for ( const psmId of data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {
                                psmIds.add( psmId );
                            }
                        }
                    }
                }
            }

        }

        const psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId = new Map<number, number>();

        //  Add in all PSM Id counts

        for ( const psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId_MapEntry of psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId.entries() ) {

            const reportedPeptideId: number = psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId_MapEntry[0];
            const psmIds_Map_Key_SearchSubGroupId_Map = psmIds_Map_Key_SearchSubGroupId_Map_Key_ReportedPeptideId_MapEntry[1];

            for ( const psmIds_MapEntry of psmIds_Map_Key_SearchSubGroupId_Map.entries() ) {

                const searchSubGroupId: number = psmIds_MapEntry[0];
                const psmIds = psmIds_MapEntry[1];

                const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_SearchSubGroupId.get( searchSubGroupId );

                if ( reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map && reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map.has( reportedPeptideId ) ) {
                    //  Have entry where no filtering on PsmIds so skip this entry
                    continue; // EARLY CONTINUE
                }

                const psmCount_For_psmIds_MapEntry = psmIds.size;

                let psmCount_InMap_ForSearchSubGroupId = psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.get( searchSubGroupId );
                if ( psmCount_InMap_ForSearchSubGroupId ) {
                    const new_psmCount = psmCount_For_psmIds_MapEntry + psmCount_InMap_ForSearchSubGroupId;
                    psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.set(searchSubGroupId, new_psmCount);
                } else {
                    psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.set(searchSubGroupId, psmCount_For_psmIds_MapEntry);
                }
            }
        }

        //  Add in all PSM counts for Reported Peptide Ids where no filtering on PsmIds

        for ( const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_SearchSubGroupId.entries() ) {

            const searchSubGroupId: number = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[0];
            const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[1];

            let psmCount_NoPSMFiltering_ForSearch = 0;

            const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();

            for ( const reportedPeptideId of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {

                const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get(reportedPeptideId);

                const numPsms = numPsmsFor_SearchSubGroupId.get( searchSubGroupId )
                if (numPsms) {
                    psmCount_NoPSMFiltering_ForSearch += numPsms;
                }
            }

            const psmCount_ForSearchSubGroupId_Existing = psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.get( searchSubGroupId );
            if ( psmCount_ForSearchSubGroupId_Existing ) {
                psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.set( searchSubGroupId, psmCount_ForSearchSubGroupId_Existing + psmCount_NoPSMFiltering_ForSearch );
            } else {
                psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.set( searchSubGroupId, psmCount_NoPSMFiltering_ForSearch );
            }
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

            const qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT a Selected searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                const x_Label = searchSubGroup.subgroupName_Display;

                let psmCount_ForSearchSubGroupId = psmCountForSearchSubGroupId_Map_Key_SearchSubGroupId.get( searchSubGroup.searchSubGroup_Id );
                if ( ! psmCount_ForSearchSubGroupId ) {
                    psmCount_ForSearchSubGroupId = 0;
                }

                chart_X.push(x_Label);
                chart_Y.push(psmCount_ForSearchSubGroupId);

                chart_Bars_labels.push(psmCount_ForSearchSubGroupId.toLocaleString());
                chart_Bars_Tooltips.push( "<b>Sub Search</b>: " + searchSubGroup.subgroupName_Display + "<br><b>PSM Count</b>: " + psmCount_ForSearchSubGroupId.toLocaleString());
                chart_Colors.push(color);
            }
        }


        const chart_Data = [
            {
                type: 'bar',
                x: chart_X,
                y: chart_Y,
                text: chart_Bars_labels, //  Text put on each bar.  The chart_Y entries

                // textposition: "outside",  //  Position the text above the bar instead of ever inside it.  https://plotly.com/javascript/reference/bar/#bar-textposition
                // cliponaxis: false,  //  When use 'textposition: "outside",', prevent text above tallest bar from being clipped (partially or all not shown)  https://github.com/plotly/plotly.js/issues/2001
                //                      Using 'cliponaxis: false,' results in the text being closer to the chart title than chart parts would be otherwise from following the chart top margin

                // textfont: {  //  Text not visible when not on the bar.  https://plotly.com/javascript/reference/bar/#bar-textfont
                //     color: "white"
                // },

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
            open_SummaryCounts_PSM_Counts_OverlayContainer({
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
