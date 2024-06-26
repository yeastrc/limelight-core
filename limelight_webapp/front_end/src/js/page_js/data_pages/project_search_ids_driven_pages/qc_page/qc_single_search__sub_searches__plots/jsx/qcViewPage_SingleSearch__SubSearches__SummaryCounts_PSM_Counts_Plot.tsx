/**
 * qcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_PSM_Counts_Plot.tsx
 *
 * QC Page SingleSearch__SubSearches : Summary Counts
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {open_SummaryCounts_PSM_Counts_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_OverlayContainer";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";


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

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props, QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

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
        this.image_Ref = React.createRef();

        //  Initialize to current passed value
        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

        props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register({ callbackItem: this })

        this.state = { showCreatingMessage: true, showUpdatingMessage: false };
    }

    /**
     * From interface QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
     * @param item
     */
    set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback = item

        this.setState({ showUpdatingMessage: true });
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.un_register({ callbackItem: this })
        } catch (e) {
            //  Eat Exception
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__SummaryCounts_PSM_Counts_Plot_State>, snapshot?: any) {
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

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            this.setState({ showUpdatingMessage: true });

            window.setTimeout( () => {
                try {
                    if (
                        ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                        )) {
                        //  Skip these params since they are not the "Latest"
                        return; // EARLY RETURN
                    }

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

            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 )  {
                const msg = "( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 )"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];  // Allowed since Single Search

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

            {
                const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters().
                    get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();
                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }
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

                // const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();

                for ( const reportedPeptideId of reportedPeptideIds_Where_no_SubFiltering_On_PsmIds_Map ) {

                    const numPsmsFor_SearchSubGroupId = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId(reportedPeptideId);
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

                    const color = "#" + qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

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

            const changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params = {
                xAxisLabels: new Set(chart_X), xAxisTitle
            }

            if ( ! this.props.isInSingleChartOverlay ) {

                //  Main Page Plot

                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                    plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
                    chart_Width: chart_Layout.width,
                    chart_Height: chart_Layout.height,
                    image_DOM_Element: this.image_Ref.current,
                    changePlotlyLayout_For_XaxisLabelLengths__Params,
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
                    changePlotlyLayout_For_XaxisLabelLengths__Params,
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

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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

        return (

            <React.Fragment>

                {( this.props.isInSingleChartOverlay ) ? (
                    //  For Single Chart Overlay: div the chart will be rendered into
                    <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></div>
                ) : (
                    //  For Main Page: img the chart will be inserted into
                    <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></img>
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
