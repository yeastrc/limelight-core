/**
 * qcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count vs Peptide Length Statistics
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
import {open_PSMCount_VS_PeptideLength_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount_VS_PeptideLength_OverlayContainer";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";

const chartTitle = "PSM Count vs/ Peptide Length";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount_VS_PeptideLength_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
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
    private async _populateChart() : Promise<void> {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            if ( projectSearchIds.length !== 1 ) {
                const msg = "Single Search chart so projectSearchIds.length must be 1. projectSearchIds.length: " + projectSearchIds.length;
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = projectSearchIds[0];  //  Allowed since Single Search chart


            const peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map();

            for (const projectSearchId of projectSearchIds) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
                }
                { // peptideIds_For_MainFilters_Holder
                    const get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result =
                        await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch_ReturnPromise();
                    peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result.peptideIds_For_MainFilters_Holder )
                }
            }

            let numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
            { // numPsmsForReportedPeptideIdMap
                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
                }
                const get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().
                    get_numPsmsForReportedPeptideIdMap_ReturnPromise();
                numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result.numPsmsForReportedPeptideIdMap;
            }

            let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
            {
                const get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                    get__commonData_LoadedFromServer__CommonAcrossSearches().
                    get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                    get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise();
                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result.peptideSequences_For_MainFilters_Holder
            }

            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const peptideLengthCounts_Map_Key_PeptideLength = new Map<number, Peptide_LengthCount_Entry>();

            for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

                for (const projectSearchId of projectSearchIds) {

                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                    if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                        continue; // EARLY CONTINUE
                    }

                    const peptideIds_For_MainFilters_Holder = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                    if (!peptideIds_For_MainFilters_Holder) {
                        throw Error("(!peptideIds_For_MainFilters_Holder)")
                    }

                    for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                        const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                        const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

                        const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );
                        const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId );
                        const peptideSequence_Length = peptideSequenceString.length;

                        let peptideLengthCount_Entry = peptideLengthCounts_Map_Key_PeptideLength.get( peptideSequence_Length );
                        if ( ! peptideLengthCount_Entry ) {
                            peptideLengthCount_Entry = new Peptide_LengthCount_Entry({ peptideLength: peptideSequence_Length });
                            peptideLengthCounts_Map_Key_PeptideLength.set( peptideSequence_Length, peptideLengthCount_Entry );
                        }

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

            const peptide_LengthCount_Array : Array<Peptide_LengthCount_Entry> = Array.from( peptideLengthCounts_Map_Key_PeptideLength.values() );
            peptide_LengthCount_Array.sort( (a,b) => {
                if ( a.peptideLength < b.peptideLength ) {
                    return -1;
                }
                if ( a.peptideLength > b.peptideLength ) {
                    return 1;
                }
                return 0;
            })

            //  Compute PSM Count for each length

            for ( const peptide_LengthCount_Entry of peptide_LengthCount_Array ) {

                let psmCountForEntry = 0;

                //  Add in all PSM Id counts

                for ( const psmIds_MapEntry of peptide_LengthCount_Entry.psmIds_Map_Key_ReportedPeptideId.entries() ) {

                    const reportedPeptideId: number = psmIds_MapEntry[0];
                    const psmIds = psmIds_MapEntry[1];

                    if ( peptide_LengthCount_Entry.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds.has( reportedPeptideId ) ) {
                        //  Have entry where no filtering on PsmIds so skip this entry
                        continue; // EARLY CONTINUE
                    }

                    psmCountForEntry += psmIds.size
                }

                //  Add in all PSM counts for Reported Peptide Ids where no filtering on PsmIds

                for ( const reportedPeptideId of peptide_LengthCount_Entry.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds ) {
                    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if ( numPsms ) {
                        psmCountForEntry += numPsms;
                    }
                }

                peptide_LengthCount_Entry.psmCountForEntry = psmCountForEntry;
            }


            const chart_X : Array<number> = []
            const chart_Y : Array<number> = []
            // const chart_Bars_labels: Array<string> = [];
            const chart_Bars_Tooltips: Array<string> = [];

            for ( const peptide_LengthCount_Entry of peptide_LengthCount_Array ) {

                chart_X.push( peptide_LengthCount_Entry.peptideLength );
                chart_Y.push( peptide_LengthCount_Entry.psmCountForEntry );

                // const chart_Bar_label = peptide_LengthCount_Entry.psmCountForEntry.toLocaleString();
                // chart_Bars_labels.push( chart_Bar_label );

                const chart_Bar_Tooltip = "<b>Peptide Length</b>: " + peptide_LengthCount_Entry.peptideLength.toLocaleString() +
                    "<br><b>PSM Count</b>: " + peptide_LengthCount_Entry.psmCountForEntry.toLocaleString();
                chart_Bars_Tooltips.push( chart_Bar_Tooltip );
            }

            //  Colors for Bars
            const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

            const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

            const chart_Data = [
                {
                    type: 'bar',
                    x: chart_X,
                    y: chart_Y,
                    // text: chart_Bars_labels, //  Text put on each bar
                    hoverinfo: "text", //  Hover contents
                    hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                    marker: {
                        color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
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
                chart_X_Axis_Label: "Peptide Length",
                chart_X_Axis_IsTypeCategory: false,
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

            const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

            if ( ! this.props.isInSingleChartOverlay ) {

                //  Add click handler on chart on main page to open chart in overlay

                qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
            }


            this.setState({ showUpdatingMessage: false });

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
            open_PSMCount_VS_PeptideLength_OverlayContainer({
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
