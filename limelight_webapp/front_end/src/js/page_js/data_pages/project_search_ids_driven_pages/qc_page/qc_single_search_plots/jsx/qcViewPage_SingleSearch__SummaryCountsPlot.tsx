/**
 * qcViewPage_SingleSearch__SummaryCountsPlot.tsx
 *
 * QC Page Single Search : Summary Counts
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_SummaryCounts_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__SummaryCounts_OverlayContainer";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";


const chartTitle = "Summary Counts";

////

/**
 *
 */
export interface QcViewPage_SingleSearch__SummaryCountsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SummaryCountsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SummaryCountsPlot extends React.Component< QcViewPage_SingleSearch__SummaryCountsPlot_Props, QcViewPage_SingleSearch__SummaryCountsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__SummaryCountsPlot_Props) {
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

            window.setTimeout( async () => {
                try {
                    await this._populateChart();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SummaryCountsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SummaryCountsPlot_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SummaryCountsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SummaryCountsPlot_State>, snapshot?: any) {
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
    private async _populateChart() : Promise<void> {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            try {
                //  First remove any existing plot, if it exists (And event listener on it)
                this._removeChart();
            } catch (e) {
                //  Eat Exception
            }

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map();
            const numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map();

            for (const projectSearchId of projectSearchIds) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
                }

                {
                    const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                        await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise();

                    const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(projectSearchId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder);
                }
                {
                    const get_numPsmsForReportedPeptideIdMap_ReturnPromise =
                        await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters()
                            .get_numPsmsForReportedPeptideIdMap_ReturnPromise();
                    const numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_ReturnPromise.numPsmsForReportedPeptideIdMap
                    numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set(projectSearchId, numPsmsForReportedPeptideIdMap);
                }
            }

            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            //  Track all reportedPeptideIds where o_SubFiltering_On_PsmIds_... is TRUE within each ProjectSearchId
            const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId : Map<number,Set<number>> = new Map();

            //  Accumulate all PSM Ids for each reportedPeptideId where o_SubFiltering_On_PsmIds_... is FALSE within each ProjectSearchId
            const psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number,Map<number,Set<number>>> = new Map();

            const proteinSequenceVersionId_DistinctValues = new Set<number>();

            for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

                for (const projectSearchId of projectSearchIds) {

                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                    if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                        continue; // EARLY CONTINUE
                    }

                    const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                    if (!proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder) {

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

                        const proteinSequenceVersionIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
                        if (!proteinSequenceVersionIds) {

                            continue; // EARLY CONTINUE
                        }

                        for (const proteinSequenceVersionId of proteinSequenceVersionIds) {
                            proteinSequenceVersionId_DistinctValues.add(proteinSequenceVersionId);
                        }

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

            let psmCountForSearch = 0;

            //  Add in all PSM Id counts

            for ( const psmIds_Map_Key_ReportedPeptideId_MapEntry of psmIds_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.entries() ) {
                const projectSearchId: number = psmIds_Map_Key_ReportedPeptideId_MapEntry[0];
                const psmIds_Map_Key_ReportedPeptideId = psmIds_Map_Key_ReportedPeptideId_MapEntry[1];

                const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.get( projectSearchId );

                for ( const psmIds_MapEntry of psmIds_Map_Key_ReportedPeptideId.entries() ) {

                    const reportedPeptideId: number = psmIds_MapEntry[0];
                    const psmIds = psmIds_MapEntry[1];

                    if ( reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map.has( reportedPeptideId ) ) {
                        //  Have entry where no filtering on PsmIds so skip this entry
                        continue; // EARLY CONTINUE
                    }

                    psmCountForSearch += psmIds.size
                }
            }

            //  Add in all PSM counts for Reported Peptide Ids where no filtering on PsmIds

            for ( const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map_Key_ProjectSearchId.entries() ) {
                const projectSearchId: number = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[0];
                const reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map = reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_MapEntry[1];

                const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get(projectSearchId);
                if (!numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId) {

                    continue; // EARLY CONTINUE
                }

                for ( const reportedPeptideId of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {
                    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if ( numPsms ) {
                        psmCountForSearch += numPsms;
                    }
                }
            }

            const peptideDistinct_Count = peptideDistinct_Array.length;


            //  Colors for Bars
            const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 3 });

            const chart_X : Array<string> = []
            const chart_Y : Array<number> = []
            const chart_Bars_labels : Array<string> = []
            const chart_Bars_Tooltips : Array<string> = []
            const chart_Colors : Array<any> = []

            {
                const x_Label = "PSM Count";
                chart_X.push(x_Label);
                chart_Y.push(psmCountForSearch);

                chart_Bars_labels.push( psmCountForSearch.toLocaleString() );
                chart_Bars_Tooltips.push( x_Label + ": " + psmCountForSearch.toLocaleString() );

                const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 0 );
                chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
            }
            {
                const x_Label = "Distinct Peptide Count";
                chart_X.push(x_Label);
                chart_Y.push(peptideDistinct_Count);

                chart_Bars_labels.push( peptideDistinct_Count.toLocaleString() );
                chart_Bars_Tooltips.push( x_Label + ": " + peptideDistinct_Count.toLocaleString() );
                const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 1 );
                chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
            }
            {
                const x_Label = "Protein Count";
                chart_X.push(x_Label);
                chart_Y.push(proteinSequenceVersionId_DistinctValues.size);

                chart_Bars_labels.push( proteinSequenceVersionId_DistinctValues.size.toLocaleString() );
                chart_Bars_Tooltips.push( x_Label + ": " + proteinSequenceVersionId_DistinctValues.size.toLocaleString() );
                const colorEntry = qcViewPage__ComputeColorsForCategories.get_Color_By_Index( 2 );
                chart_Colors.push('rgb(' + colorEntry.rgb_Color.red + "," + colorEntry.rgb_Color.green + "," + colorEntry.rgb_Color.blue + ')');
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
                chart_X_Axis_Label: undefined,
                chart_X_Axis_IsTypeCategory: true,
                chart_Y_Axis_Label: "count",
                showlegend: false
            });

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

            if ( ! this.props.isInSingleChartOverlay ) {

                //  Add click handler on chart on main page to open chart in overlay

                qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
            }

            this.setState({ showUpdatingMessage: false }); // Do at end

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
            open_SummaryCounts_OverlayContainer({
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
