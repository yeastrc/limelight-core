/**
 * qcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : The count of proteins where each entry is the number of Distinct Peptides for a Single Protein Entry
 *
 * X axis: Distinct Peptides count:  1, 2, ..., 10+  -- Stick 10 and up in the "10+" bin
 * Y axis: Number of Proteins with that number of Distinct Peptides
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {qc_SingleSearch__SubSearches__Open_ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_OverlayContainer";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import Plotly from "plotly.js-dist-min";


const chartTitle = "Peptides Per Protein";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_State >
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
    constructor(props: QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_StatisticsPlot_State>, snapshot?: any) {
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

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
                const msg = "( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 )"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

            const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
            {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise()
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder

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

            const proteinSequenceVersionId_DistinctValuesSet_Map_Key_SearchSubGroup_Id = new Map<number,Set<number>>();

            const peptideDistinct_Count_Map_Key_ProteinSequenceVersionId_Map_Key_SearchSubGroup_Id = new Map<number,Map<number, number>>();

            for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {
                proteinSequenceVersionId_DistinctValuesSet_Map_Key_SearchSubGroup_Id.set(searchSubGroup_Id, new Set()); // Insert empty Set for each searchSubGroup_Id
                peptideDistinct_Count_Map_Key_ProteinSequenceVersionId_Map_Key_SearchSubGroup_Id.set(searchSubGroup_Id, new Map())// Insert empty Map for each searchSubGroup_Id
            }

            for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

                for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {

                    const proteinSequenceVersionId_DistinctValuesSet = proteinSequenceVersionId_DistinctValuesSet_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
                    const peptideDistinct_Count_Map_Key_ProteinSequenceVersionId = peptideDistinct_Count_Map_Key_ProteinSequenceVersionId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);

                    const proteinSequenceVersionIds_Processed_For_This_DistinctPeptide__ForThis_SearchSubGroup_Id = new Set<number>();

                    for (const dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map of peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.values()) {

                        const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map.get( searchSubGroup_Id );
                        if (!dataPerReportedPeptideId) {
                            //  No data for searchSubGroup_Id
                            continue; // EARLY CONTINUE
                        }

                        const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;
                        const proteinSequenceVersionIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
                        if (!proteinSequenceVersionIds) {

                            continue; // EARLY CONTINUE
                        }

                        for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                            if ( ! proteinSequenceVersionIds_Processed_For_This_DistinctPeptide__ForThis_SearchSubGroup_Id.has( proteinSequenceVersionId ) ) {

                                proteinSequenceVersionId_DistinctValuesSet.add(proteinSequenceVersionId); // for total protein count for this project search id

                                proteinSequenceVersionIds_Processed_For_This_DistinctPeptide__ForThis_SearchSubGroup_Id.add( proteinSequenceVersionId ) // So only add to this proteinSequenceVersionId once for this searchSubGroup_Id

                                {
                                    const existing_DistinctPeptideCount = peptideDistinct_Count_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
                                    if ( existing_DistinctPeptideCount ) {
                                        peptideDistinct_Count_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, existing_DistinctPeptideCount + 1 );
                                    } else {
                                        peptideDistinct_Count_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, 1 );
                                    }
                                }
                            }
                        }
                    }
                }
            }

            const chartData_MainTraces_Array: Plotly.Data[] = [];

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

                const qcViewPage_SingleSearch__SubSearches__ComputeColorsForSubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

                for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                    if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                        //  NOT a Selected searchSubGroup_Id so SKIP
                        continue; // EARLY CONTINUE
                    }

                    const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsForSubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                    let proteinCount = 0;

                    let proteinSequenceVersionId_DistinctValuesSet = proteinSequenceVersionId_DistinctValuesSet_Map_Key_SearchSubGroup_Id.get( searchSubGroup.searchSubGroup_Id );
                    if ( proteinSequenceVersionId_DistinctValuesSet ) {
                        proteinCount = proteinSequenceVersionId_DistinctValuesSet.size;
                    }

                    const peptideDistinct_Count_Map_Key_ProteinSequenceVersionId = peptideDistinct_Count_Map_Key_ProteinSequenceVersionId_Map_Key_SearchSubGroup_Id.get(searchSubGroup.searchSubGroup_Id)
                    if ( ( ! peptideDistinct_Count_Map_Key_ProteinSequenceVersionId ) || peptideDistinct_Count_Map_Key_ProteinSequenceVersionId.size === 0 ) {

                        //  No data for searchSubGroup_Id

                        continue; // EARLY CONTINUE
                    }


                    let proteinSequenceVersionId_DistinctValues_Count = 0;

                    {
                        const proteinSequenceVersionId_DistinctValuesSet = proteinSequenceVersionId_DistinctValuesSet_Map_Key_SearchSubGroup_Id.get(searchSubGroup.searchSubGroup_Id);
                        if (proteinSequenceVersionId_DistinctValuesSet) {
                            proteinSequenceVersionId_DistinctValues_Count = proteinSequenceVersionId_DistinctValuesSet.size;
                        }
                    }

                    const proteinCounts_Per_DistinctPeptideCount__1_through_9: Array<number> = [] //  Index is Distinct Peptide Count so skip index zero

                    let proteinCounts_Per_DistinctPeptideCount__10_Plus: number = 0;  // For Distinct Peptide Count 10+

                    for ( const peptideDistinct_Count of peptideDistinct_Count_Map_Key_ProteinSequenceVersionId.values() ) {
                        if ( peptideDistinct_Count >= 10 ) {
                            proteinCounts_Per_DistinctPeptideCount__10_Plus++;
                        } else {
                            if ( proteinCounts_Per_DistinctPeptideCount__1_through_9[ peptideDistinct_Count ] ) {
                                proteinCounts_Per_DistinctPeptideCount__1_through_9[ peptideDistinct_Count ]++;
                            } else {
                                proteinCounts_Per_DistinctPeptideCount__1_through_9[ peptideDistinct_Count ] = 1;
                            }
                        }
                    }

                    let count_Index_largestWithValue = 9;

                    if ( proteinCounts_Per_DistinctPeptideCount__10_Plus === 0 ) {
                        while ( ( count_Index_largestWithValue > 0 ) && ( ! proteinCounts_Per_DistinctPeptideCount__1_through_9[ count_Index_largestWithValue ] ) ) {
                            count_Index_largestWithValue--;
                        }
                    }

                    if ( count_Index_largestWithValue === 0 ) {
                        throw Error("count_Index_largestWithValue === 0")
                    }

                    const chart_X : Array<string> = []
                    const chart_Y : Array<number> = []
                    const chart_Bars_Tooltips : Array<string> = []

                    for ( let countIndex = 1; countIndex <= count_Index_largestWithValue; countIndex++ ) {

                        let protein_Fraction = 0;
                        let proteinCount = 0;

                        {
                            const proteinCount_Local = proteinCounts_Per_DistinctPeptideCount__1_through_9[ countIndex ];
                            if ( proteinCount_Local ) {
                                proteinCount = proteinCount_Local;
                                protein_Fraction = proteinCount / proteinSequenceVersionId_DistinctValues_Count;
                            }
                        }

                        const x_Label = countIndex.toString();
                        chart_X.push(x_Label);
                        chart_Y.push(protein_Fraction);

                        const chart_Bars_Tooltip =
                            "<b>Sub Search</b>: " + searchSubGroup.subgroupName_Display +
                            "<br><b>Distinct Peptide Count<b>: " + countIndex +
                            "<br><b>Protein Count</b>: " + proteinCount +
                            "<br><b>Protein Fraction</b>: " + protein_Fraction.toFixed(3)


                        chart_Bars_Tooltips.push( chart_Bars_Tooltip );
                    }
                    if ( proteinCounts_Per_DistinctPeptideCount__10_Plus > 0 ) {
                        //  10+ entry

                        const proteinCount = proteinCounts_Per_DistinctPeptideCount__10_Plus;
                        const protein_Fraction = proteinCount / proteinSequenceVersionId_DistinctValues_Count;

                        const x_Label = "10+";
                        chart_X.push(x_Label);
                        chart_Y.push(protein_Fraction);

                        const chart_Bars_Tooltip =
                            "<b>Sub Search</b>: " + searchSubGroup.subgroupName_Display +
                            "<br><b>Distinct Peptide Count<b>: " + "10+" +
                            "<br><b>Protein Count</b>: " + proteinCount +
                            "<br><b>Protein Fraction</b>: " + protein_Fraction.toFixed(3)


                        chart_Bars_Tooltips.push( chart_Bars_Tooltip );
                    }

                    const chart_Data_SingleProjectSearchId: Plotly.Data =
                        {
                            name: searchSubGroup.subgroupName_Display,
                            type: 'scatter',
                            x: chart_X,
                            y: chart_Y,
                            hoverinfo: "text", //  Hover contents
                            hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                            marker: {
                                color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                            }
                        }
                    ;

                    chartData_MainTraces_Array.push( chart_Data_SingleProjectSearchId )

                }
            }

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
                chart_X_Axis_Label: "Number Distinct Peptides",
                chart_X_Axis_IsTypeCategory: true,
                chart_Y_Axis_Label: "Protein Fraction",
                showlegend: true
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
                    plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
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
                    plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
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
            qc_SingleSearch__SubSearches__Open_ProteinCount_For_DistinctPeptideCount_Per_SingleProteinEntry_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent : this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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
