/**
 * qcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : PSM Count vs Peptide Length Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {qc_SingleSearch__SubSearches__Open_PSMCount_VS_PeptideLength_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_OverlayContainer";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";


const chartTitle = "Distribution of PSM Peptide Lengths";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_PeptideLength_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
            ) {
            } else {
                //  Nothing changed so return

                return;  // EARLY RETURN
            }

            this.setState({ showUpdatingMessage: true });

            window.setTimeout( async () => {
                try {
                    await this._populateChart();

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
            this._populateChart()  //  Returns Ignored Promise

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

            const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

            const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
            const searchSubGroupIds_DisplayOrder: Array<number> = [];
            const searchSubGroups_Map_Key_searchSubGroupId: Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Map();
            {
                const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
                for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                    searchSubGroups_DisplayOrder.push(searchSubGroup);
                    searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
                    searchSubGroups_Map_Key_searchSubGroupId.set(searchSubGroup.searchSubGroup_Id, searchSubGroup);
                }
            }

            const qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }


            const get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch_ReturnPromise();
            const peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result.peptideIds_For_MainFilters_Holder;

            const get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().
                get_numPsmsForReportedPeptideIdMap_ReturnPromise();
            const numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result.numPsmsForReportedPeptideIdMap

            const get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise();
            const peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result.peptideSequences_For_MainFilters_Holder


            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const peptideLengthCounts_Map_Key_PeptideLength_Map_Key_SearchSubGroupId = new Map<number, Map<number, Peptide_LengthCount_Entry>>();

            for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

                //  Expected to only contain 1 entry at root level
                const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId = new Map<number, Map<number, Map<number, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry>>>();

                for ( const dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue of peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.values() ) {

                    for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue.entries() ) {

                        const searchSubgroupId = dataPerReportedPeptideId_MapEntry[0];
                        const data_PerReportedPeptideId_SearchSubGroupId_Value = dataPerReportedPeptideId_MapEntry[1];
                        const reportedPeptideId = data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId;

                        if ( ! searchSubGroup_Ids_Selected.has( searchSubgroupId ) ) {
                            // Not Selected so skip
                            continue; // EARLY CONTINUE
                        }

                        const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );

                        let dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId.get( peptideId );
                        if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId ) {
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId = new Map();
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId.set( peptideId, dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId );
                        }
                        let dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId.get( searchSubgroupId );
                        if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId = new Map();
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId.set( searchSubgroupId, dataPerReportedPeptideId_Map_Key_reportedPeptideId );
                        }
                        dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( reportedPeptideId, data_PerReportedPeptideId_SearchSubGroupId_Value );
                    }
                }

                for ( const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId.entries() ) {

                    const peptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId_Entry[0];
                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_PeptideId_Entry[1];

                    const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId );
                    const peptideSequence_Length = peptideSequenceString.length;

                    for ( const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId.entries() ) {

                        const searchSubgroupId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Entry[0];
                        const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Map_Key_SearchSubgroupId_Entry[1];

                        let peptideLengthCounts_Map_Key_PeptideLength_Map = peptideLengthCounts_Map_Key_PeptideLength_Map_Key_SearchSubGroupId.get(searchSubgroupId);
                        if ( ! peptideLengthCounts_Map_Key_PeptideLength_Map ) {
                            peptideLengthCounts_Map_Key_PeptideLength_Map = new Map();
                            peptideLengthCounts_Map_Key_PeptideLength_Map_Key_SearchSubGroupId.set( searchSubgroupId, peptideLengthCounts_Map_Key_PeptideLength_Map );
                        }

                        let peptideLengthCount_Entry = peptideLengthCounts_Map_Key_PeptideLength_Map.get( peptideSequence_Length );
                        if ( ! peptideLengthCount_Entry ) {
                            peptideLengthCount_Entry = new Peptide_LengthCount_Entry({ peptideLength: peptideSequence_Length });
                            peptideLengthCounts_Map_Key_PeptideLength_Map.set( peptideSequence_Length, peptideLengthCount_Entry );
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

            //  Must add to chart_X, chart_Y in the order they will be shown in the chart

            const chart_X : Array<string> = []
            const chart_Y : Array<number> = []

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                const peptideLengthCounts_Map_Key_PeptideLength_Map = peptideLengthCounts_Map_Key_PeptideLength_Map_Key_SearchSubGroupId.get( searchSubGroup.searchSubGroup_Id );

                if ( ! peptideLengthCounts_Map_Key_PeptideLength_Map ) {
                    //  NOT a Found searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const x_Label = searchSubGroup.subgroupName_Display;

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

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                if ( ! peptideLengthCounts_Map_Key_PeptideLength_Map_Key_SearchSubGroupId.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT a Found searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                transforms_styles.push({target: searchSubGroup.subgroupName_Display, value: {line: {color: color}}});
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

            const xAxisTitle = "Sub Search";

            const chart_Layout = qcPage_StandardChartLayout({
                chartTitle,
                chart_X_Axis_Label: xAxisTitle,
                chart_X_Axis_IsTypeCategory: true,
                chart_Y_Axis_Label: "PSM Peptide Length",
                showlegend: false,
                search_SubSearch_Count_SizeFor: transforms_styles.length
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

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }

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
            qc_SingleSearch__SubSearches__Open_PSMCount_VS_PeptideLength_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent,
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
