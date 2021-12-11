/**
 * qcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot.tsx
 *
 * QC Page Multiple Searches : PSM Count vs Peptide Length Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_MultipleSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/js/qcViewPage_MultipleSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {open_PSMCount_VS_PeptideLength_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_OverlayContainer";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcViewPage_MultipleSearches__ComputeColorsForSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_MultipleSearches__ComputeColorsForSearches";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";


const chartTitle = "Distribution of PSM Peptide Lengths";

/**
 *
 */
export interface QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot extends React.Component< QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props, QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State > {

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
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

        this.setState({ showUpdatingMessage: false });

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        const loadedDataCommonHolder = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataCommonHolder;

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const qcViewPage_MultipleSearches__ComputeColorsForSearches = new QcViewPage_MultipleSearches__ComputeColorsForSearches({ projectSearchIds });

        const searchNames_AsMap = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchNames_AsMap();


        const peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId = new Map<number, Map<number, Peptide_LengthCount_Entry>>();

        const projectSearchIds_Found = new Set<number>();

        for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

            for (const projectSearchId of projectSearchIds) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                    continue; // EARLY CONTINUE
                }

                const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
                if (!loadedDataPerProjectSearchIdHolder) {

                    continue; // EARLY CONTINUE
                }

                const searchData = searchNames_AsMap.get( projectSearchId );
                if ( ! searchData ) {
                    const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                projectSearchIds_Found.add(projectSearchId);

                let peptideLengthCounts_Map_Key_PeptideLength = peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! peptideLengthCounts_Map_Key_PeptideLength ) {
                    peptideLengthCounts_Map_Key_PeptideLength = new Map();
                    peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId.set(projectSearchId, peptideLengthCounts_Map_Key_PeptideLength);
                }

                const x_Label = searchData.searchId.toString();

                //  Expected to only contain 1 entry at root level
                const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId = new Map<number, Map<number,  ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry>>();

                for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                    const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                    const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                    const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({ reportedPeptideId });

                    let dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId.get( peptideId );
                    if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId = new Map();
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId.set( peptideId, dataPerReportedPeptideId_Map_Key_reportedPeptideId );
                    }
                    dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( reportedPeptideId, dataPerReportedPeptideId );
                }

                for ( const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId.entries() ) {

                    const peptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId_Entry[0];
                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_PeptideId_Entry[1];

                    const peptideSequenceString = loadedDataCommonHolder.get_peptideSequenceString_For_peptideId({ peptideId });
                    const peptideSequence_Length = peptideSequenceString.length;

                    let peptideLengthCount_Entry = peptideLengthCounts_Map_Key_PeptideLength.get( peptideSequence_Length );
                    if ( ! peptideLengthCount_Entry ) {
                        peptideLengthCount_Entry = new Peptide_LengthCount_Entry({ peptideLength: peptideSequence_Length });
                        peptideLengthCounts_Map_Key_PeptideLength.set( peptideSequence_Length, peptideLengthCount_Entry );
                    }

                    for ( const dataPerReportedPeptideId_Value of dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map.values() ) {

                        const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

                        if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                            peptideLengthCount_Entry.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds.add( reportedPeptideId )

                        } else {
                            if (dataPerReportedPeptideId_Value.psmIdsSet) {

                                let psmIds = peptideLengthCount_Entry.psmIds_Map_Key_ReportedPeptideId.get( reportedPeptideId );
                                if ( ! psmIds ) {
                                    psmIds = new Set();
                                    peptideLengthCount_Entry.psmIds_Map_Key_ReportedPeptideId.set( reportedPeptideId, psmIds );
                                }
                                for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {
                                    psmIds.add( psmId );
                                }
                            }
                        }
                    }
                }
            }
        }

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []

        for ( const peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId_Entry of peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId.entries() ) {

            const projectSearchId = peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId_Entry[0];
            const peptideLengthCounts_Map_Key_PeptideLength_Map = peptideLengthCounts_Map_Key_PeptideLength_Map_Key_ProjectSearchId_Entry[1];

            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const searchData = searchNames_AsMap.get( projectSearchId );
            if ( ! searchData ) {
                const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            projectSearchIds_Found.add(projectSearchId);

            const x_Label = searchData.searchId.toString();

            for ( const peptideLengthCountEntry of peptideLengthCounts_Map_Key_PeptideLength_Map.values() ) {

                const peptideSequence_Length = peptideLengthCountEntry.peptideLength

                //  Add in all PSM Id counts

                for ( const psmIds_MapEntry of peptideLengthCountEntry.psmIds_Map_Key_ReportedPeptideId.entries() ) {

                    const reportedPeptideId: number = psmIds_MapEntry[0];
                    const psmIds = psmIds_MapEntry[1];

                    if ( peptideLengthCountEntry.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds.has( reportedPeptideId ) ) {
                        //  Have entry where no filtering on PsmIds so skip this entry
                        continue; // EARLY CONTINUE
                    }

                    for ( let psmCounter = 0; psmCounter < psmIds.size; psmCounter++ ) {

                        chart_X.push( x_Label )
                        chart_Y.push( peptideSequence_Length )
                    }
                }

                //  Add in all PSM counts for Reported Peptide Ids where no filtering on PsmIds

                const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

                for ( const reportedPeptideId of peptideLengthCountEntry.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds ) {
                    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if ( numPsms ) {

                        for ( let psmCounter = 0; psmCounter < numPsms; psmCounter++ ) {

                            chart_X.push( x_Label )
                            chart_Y.push( peptideSequence_Length )
                        }
                    }
                }
            }
        }

        const transforms_styles: Array<any> = [];

        for ( const projectSearchId of projectSearchIds ) {

            if ( projectSearchIds_Found.has(projectSearchId)) {

                const color = qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsHexString_By_ProjectSearchId( projectSearchId )

                const searchData = searchNames_AsMap.get( projectSearchId );
                if ( ! searchData ) {
                    const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                transforms_styles.push({target: searchData.searchId.toString(), value: {line: {color: color}}});
            }
        }

        const chart_Data_Entry = {
            type: 'violin',
            x: chart_X,
            y: chart_Y,
            points: "outliers", // https://plotly.com/javascript/reference/violin/#violin-points
            box: {
                visible: true
            },
            line: {
                color: 'green',
            },
            meanline: {
                visible: true
            },
            transforms: [{
                type: 'groupby',
                groups: chart_X,
                styles: transforms_styles
            }]
        }

        //  Single Search:
        // const chart_Data_Entry = {
        //     type: 'bar',
        //         x: chart_X,
        //     y: chart_Y,
        //     // text: chart_Bars_labels, //  Text put on each bar
        //     hoverinfo: "text", //  Hover contents
        //     hovertext: chart_Bars_Tooltips  //  Hover contents per bar
        // }

        const chart_Data = [
            chart_Data_Entry
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
            chart_Y_Axis_Label: "PSM Peptide Length",
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

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            qcViewPage_MultipleSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
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
            open_PSMCount_VS_PeptideLength_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent,
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

class Peptide_LengthCount_Entry {
    peptideLength: number
    reportedPeptideIds_Where_no_SubFiltering_On_PsmIds: Set<number>
    psmIds_Map_Key_ReportedPeptideId: Map<number,Set<number>>

    psmCountForEntry: number  // Computed from properties in this object

    constructor({ peptideLength } : { peptideLength: number }) {
        this.peptideLength = peptideLength;
        this.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds = new Set();
        this.psmIds_Map_Key_ReportedPeptideId = new Map();
    }

    private _ONLY_FORCE_USE_Constructor() {}
}
