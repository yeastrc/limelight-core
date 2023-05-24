/**
 * qcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot.tsx
 *
 * QC Page Single Search : Distinct Peptide Estimated Error vs Best PSM Annotation Score Statistics
 *
 */


import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    AnnotationTypeItem,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";
import {CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {Estimated_Error__From_IndependentDecoy__CommonCode} from "page_js/data_pages/data_pages_common/estimated_Error__From_IndependentDecoy__CommonCode";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {qcViewPage_SingleSearch__SubSearches__Open_DistinctPeptide_EstimatedError_VS_AnnotationScore_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_OverlayContainer";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered";
import {CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData";
import {
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder,
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";


// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE = "\u2265"; // ">=" as a single character
// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW = "\u2264"; // "<=" as a single character

// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE_ASCII = ">=";
// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW_ASCII = "<=";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);

    private _renderChart = true;

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const projectSearchId =
                props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId

            const annotationTypeItems_ForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
            if ( ! annotationTypeItems_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.size < 1 ) {
                // No Data for chart so NOT render it
                this._renderChart = false;

            } else {

            }
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.annotationTypeId_Score_X !== nextProps.annotationTypeId_Score_X
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__DistinctPeptide_EstimatedError_VS_AnnotationScore_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.annotationTypeId_Score_X !== prevProps.annotationTypeId_Score_X
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

                window.setTimeout(() => {
                    try {
                        if (
                            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                            )) {
                            //  Skip these params since they are not the "Latest"
                            return; // EARLY RETURN
                        }

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

        if (
            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
            )) {
            //  Skip these params since they are not the "Latest"
            return; // EARLY RETURN
        }

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

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

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        
        const promises: Array<Promise<void>> = []

        let psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
        {
            const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();

            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_X );
            
            const get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData().
                get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested });

            if ( get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data ) {
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;
            } else if ( get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise.then(value => { try {
                        psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = value.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;
                        resolve(null);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }

        let psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder;
        {
            const get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData().
                get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder();

            if ( get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data ) {
                psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder;
            } else if ( get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise.then(value => { try {
                        psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = value.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder;
                        resolve(null);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }

        let fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder

        {
            const get_FastaFileStatisticsHolder_Result =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer__Multiple_ProjectSearchIds().
                get_commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics().get_FastaFileStatisticsHolder();

            if ( get_FastaFileStatisticsHolder_Result.data ) {
                fastaFileStatistics_Holder = get_FastaFileStatisticsHolder_Result.data.fastaFileStatistics_Holder
            } else if ( get_FastaFileStatisticsHolder_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_FastaFileStatisticsHolder_Result.promise.catch(reason => reject(reason));
                    get_FastaFileStatisticsHolder_Result.promise.then(value => { try {
                        fastaFileStatistics_Holder = value.fastaFileStatistics_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_FastaFileStatisticsHolder_Result no data or promise")
            }
        }

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__NO_FILTERING: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__NO_FILTERING: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        {
            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId__NO_FILTERING =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId__NO_FILTERING ) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned Nothing. projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId__NO_FILTERING.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

                if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__NO_FILTERING = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__NO_FILTERING = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no  data or promise")
                }
            }

            {
                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId__NO_FILTERING.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__NO_FILTERING = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__NO_FILTERING = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no  data or promise")
                }
            }
        }

        let proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__UNFILTERED_DATA: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
        {
            const promise = new Promise<void>((resolve, reject) => { try {
                const compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__Result =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING.
                    compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result();
                compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__Result.catch(reason => reject(reason))
                compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__Result.then( value => { try {
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__UNFILTERED_DATA = value;
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        }

        let searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
        {
            const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Exclude_DecoyPSMs();
            if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data ) {
                searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID_Holder
            } else if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.catch(reason => reject(reason));
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.then(value => { try {
                        searchSubGroupId_ForPSM_ID_Holder = value.searchSubGroupId_ForPSM_ID_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result no data or promise")
            }
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

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                const fastaFileStatistics_SingleSearch_Entry = fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId);
                if ( ! fastaFileStatistics_SingleSearch_Entry ) {
                    const msg = "fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let  annotationTypeItem_ForDisplayScore: AnnotationTypeItem = undefined;
                {
                    const annotationTypeItems_ForProjectSearchId =
                        this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                        dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
                    if ( ! annotationTypeItems_ForProjectSearchId ) {
                        const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    annotationTypeItem_ForDisplayScore = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( this.props.annotationTypeId_Score_X );
                    if ( ! annotationTypeItem_ForDisplayScore ) {
                        const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( this.props.annotationTypeId_Score_X ); returned nothing for this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ). this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ). this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

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

                let psmFilterableAnnotation_Score_Min__Whole_Search : number = undefined
                let psmFilterableAnnotation_Score_Max__Whole_Search : number = undefined

                const peptideData_Entries_ForProcessing: Array<Internal_PeptideEntry> = []

                {   //  Apply any filtering first

                    for ( const peptideEntry of proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result__UNFILTERED_DATA.peptideList ) {

                        const psmTblData_Entries_InitialCollect: Array<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId> = []

                        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId)

                        for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                            const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                            if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                                const psmTblData_Unfiltered_For_ReportedPeptideId = psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId)
                                if ( ! psmTblData_Unfiltered_For_ReportedPeptideId ) {
                                    const msg = "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND ( ! psmTblData_Unfiltered_For_ReportedPeptideId.psmIdsSet ).  reportedPeptideId: " + reportedPeptideId;
                                    console.warn(msg)
                                    throw Error(msg)
                                }
                                for ( const psmTblData_Entry of psmTblData_Unfiltered_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                                    psmTblData_Entries_InitialCollect.push( psmTblData_Entry );
                                }
                            } else {
                                if ( ! dataPerReportedPeptideId.psmIdsSet ) {
                                    const msg = "else of ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND ( ! dataPerReportedPeptideId.psmIdsSet ).  reportedPeptideId: " + reportedPeptideId;
                                    console.warn(msg)
                                    throw Error(msg)
                                }

                                for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {

                                    const psmTblData_Entry = psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_For_PsmId(psmId)
                                    if ( ! psmTblData_Entry ) {
                                        const msg = "psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_For_PsmId(psmId) returned Nothing. psmId: " + psmId + ", reportedPeptideId: " + reportedPeptideId;
                                        console.warn(msg)
                                        throw Error(msg)
                                    }
                                    psmTblData_Entries_InitialCollect.push( psmTblData_Entry );
                                }
                            }

                        }

                        const bestPsmAnnotationScore_Map_Key_SearchSubGroupId: Map<number, number> = new Map()

                        const psmTblData_Entries_Array_Map_Key_SearchSubGroupId: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>> = new Map()

                        for (const psmTblData_Entry of psmTblData_Entries_InitialCollect) {

                            if (this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES) {
                                //  NOT 'All Files' selected

                                if (psmTblData_Entry.searchScanFileId !== undefined && psmTblData_Entry.searchScanFileId !== null) {

                                    if (psmTblData_Entry.searchScanFileId !== this.props.searchScanFileId_Selection) {
                                        //  Not selected searchScanFileId so SKIP

                                        continue;  //  EARLY CONTINUE
                                    }
                                }
                            }

                            const searchSubGroup_Id = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmTblData_Entry.psmId);
                            if ( ! searchSubGroup_Id ) {
                                const msg = "( ! searchSubGroup_Id ) psmId: " + psmTblData_Entry.psmId + ", projectSearchId: " + projectSearchId;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup_Id ) ) {
                                //  NOT a Selected searchSubGroup_Id so SKIP
                                continue; // EARLY CONTINUE
                            }

                            let psmTblData_Entries_Array = psmTblData_Entries_Array_Map_Key_SearchSubGroupId.get( searchSubGroup_Id )
                            if ( ! psmTblData_Entries_Array ) {
                                psmTblData_Entries_Array = []
                                psmTblData_Entries_Array_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, psmTblData_Entries_Array );
                            }

                            psmTblData_Entries_Array.push( psmTblData_Entry )

                            //  Find Best/Min/Max values

                            const psmFilterableAnnotationData_Entry = psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId)
                            if ( ! psmFilterableAnnotationData_Entry ) {
                                const msg = "psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId); returned nothing. psmTblData_Entry.psmId: " + psmTblData_Entry.psmId;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                                psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_X );

                            if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                                const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_X ); returned nothing. this.props.annotationTypeId_Score_X: " + this.props.annotationTypeId_Score_X;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            const psmFilterableAnnotation_Score = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber

                            // Best Score for this Peptide for this Search Sub Group

                            {
                                const bestPsmAnnotationScore_For_SearchSubGroupId = bestPsmAnnotationScore_Map_Key_SearchSubGroupId.get(searchSubGroup_Id)

                                if ( bestPsmAnnotationScore_For_SearchSubGroupId === undefined ) {
                                    bestPsmAnnotationScore_Map_Key_SearchSubGroupId.set(searchSubGroup_Id, psmFilterableAnnotation_Score);
                                } else {
                                    if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
                                        if ( bestPsmAnnotationScore_For_SearchSubGroupId <  psmFilterableAnnotation_Score ) {
                                            bestPsmAnnotationScore_Map_Key_SearchSubGroupId.set(searchSubGroup_Id, psmFilterableAnnotation_Score);
                                        }
                                    } else if ( annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                                        if ( bestPsmAnnotationScore_For_SearchSubGroupId >  psmFilterableAnnotation_Score ) {
                                            bestPsmAnnotationScore_Map_Key_SearchSubGroupId.set(searchSubGroup_Id, psmFilterableAnnotation_Score);
                                        }
                                    } else {
                                        const msg = "annotationTypeItem_ForDisplayScore filterDirectionBelow and filterDirectionAbove BOTH NOT true. this.props.annotationTypeId_Score_X: " + this.props.annotationTypeId_Score_X;
                                        console.warn(msg);
                                        throw Error(msg);
                                    }
                                }
                            }

                            //  Min/Max Scores for Search

                            if ( psmFilterableAnnotation_Score_Min__Whole_Search === undefined ) {
                                psmFilterableAnnotation_Score_Min__Whole_Search = psmFilterableAnnotation_Score;
                                psmFilterableAnnotation_Score_Max__Whole_Search = psmFilterableAnnotation_Score;
                            } else {
                                if ( psmFilterableAnnotation_Score_Min__Whole_Search > psmFilterableAnnotation_Score ) {
                                    psmFilterableAnnotation_Score_Min__Whole_Search = psmFilterableAnnotation_Score
                                }
                                if ( psmFilterableAnnotation_Score_Max__Whole_Search < psmFilterableAnnotation_Score ) {
                                    psmFilterableAnnotation_Score_Max__Whole_Search = psmFilterableAnnotation_Score
                                }
                            }
                        }

                        if ( psmTblData_Entries_Array_Map_Key_SearchSubGroupId.size === 0 ) {
                            //  No PSMs pass filter (Scan Filename, etc) so skip
                            continue; // EARLY CONTINUE
                        }

                        const internal_PeptideEntry: Internal_PeptideEntry = {
                            peptideEntry,
                            psmTblData_Entries_Array_Map_Key_SearchSubGroupId,
                            bestPsmAnnotationScore_Map_Key_SearchSubGroupId
                        }

                        peptideData_Entries_ForProcessing.push( internal_PeptideEntry )

                    }
                }


                //  Final Array of Chart Traces
                const chartData_MainTraces_Array = [];

                for ( const searchSubGroup of searchSubGroups_DisplayOrder ) {

                    const searchSubGroupId = searchSubGroup.searchSubGroup_Id;

                    const color = "#" + qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                    const chart_Data_ForSearch__TraceName = searchSubGroup.subgroupName_Display;


                    const internal_AnnotationScore_Peptide_Entries_Map_Key_AnnotationScore: Map<number, Internal_PsmAnnotationScore_Peptide_Entries> = new Map();

                    for ( const peptideData_Entry of peptideData_Entries_ForProcessing ) {

                        //   All Peptides with same best PSM score have to be processed as a group

                        const bestPsmAnnotationScore = peptideData_Entry.bestPsmAnnotationScore_Map_Key_SearchSubGroupId.get(searchSubGroupId);

                        if ( bestPsmAnnotationScore === undefined || bestPsmAnnotationScore === null ) {
                            // No Data for searchSubGroupId

                            continue;  // EARLY CONTINUE
                        }

                        let internal_AnnotationScore_Psm_Entries_MapEntry = internal_AnnotationScore_Peptide_Entries_Map_Key_AnnotationScore.get( bestPsmAnnotationScore );
                        if ( ! internal_AnnotationScore_Psm_Entries_MapEntry ) {
                            internal_AnnotationScore_Psm_Entries_MapEntry = { best_PsmAnnotationScore: bestPsmAnnotationScore, peptide_Entry_Array: [] }
                            internal_AnnotationScore_Peptide_Entries_Map_Key_AnnotationScore.set( bestPsmAnnotationScore, internal_AnnotationScore_Psm_Entries_MapEntry );
                        }
                        internal_AnnotationScore_Psm_Entries_MapEntry.peptide_Entry_Array.push( peptideData_Entry );
                    }

                    //  Copy Map into Array

                    const internal_AnnotationScore_Peptide_Entries_Array: Array<Internal_PsmAnnotationScore_Peptide_Entries> = Array.from( internal_AnnotationScore_Peptide_Entries_Map_Key_AnnotationScore.values() )

                    //  Sort Best to Worst score for axis

                    if ( annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {

                        //  Best Score is Smallest:  Sort Ascending

                        internal_AnnotationScore_Peptide_Entries_Array.sort(( a,b ) => {
                            if ( a.best_PsmAnnotationScore < b.best_PsmAnnotationScore ) {
                                return -1;
                            }
                            if ( a.best_PsmAnnotationScore > b.best_PsmAnnotationScore ) {
                                return 1;
                            }
                            return 0;
                        });

                    } else if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {

                        //  Best Score is Largest:  Sort Descending

                        internal_AnnotationScore_Peptide_Entries_Array.sort(( a,b ) => {
                            if ( a.best_PsmAnnotationScore > b.best_PsmAnnotationScore ) {
                                return -1;
                            }
                            if ( a.best_PsmAnnotationScore < b.best_PsmAnnotationScore ) {
                                return 1;
                            }
                            return 0;
                        });

                    } else {
                        throw Error("annotationTypeItem_ForDisplayScore is not filterDirectionBelow or filterDirectionAbove")
                    }

                    //  Compute Estimated Error for each Peptide

                    const chart_X : Array<number> = []
                    const chart_Y : Array<number> = []

                    let total_ToCurrent_Peptide_target_Peptide_Count = 0;
                    let total_ToCurrent_Peptide_independentDecoy_Peptide_Count = 0;

                    for ( const internal_AnnotationScore_Peptide_Entries of internal_AnnotationScore_Peptide_Entries_Array ) {

                        //   All Peptides with same score have to be processed as a group

                        //  The total_ToCurrent_Peptide_independentDecoy_Peptide_Count or total_ToCurrent_Peptide_target_Peptide_Count is incremented by the count of PSMs with the score
                        //  and then the estimated error is computed for all the Peptides.

                        for ( const singlePeptide_Data_Entry of internal_AnnotationScore_Peptide_Entries.peptide_Entry_Array ) {

                            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = singlePeptide_Data_Entry.peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);

                            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                                //  Nothing for projectSearchId so skip
                                continue; // EARLY CONTINUE
                            }

                            let all_PSM_For_DistinctPeptide__Are__IndependentDecoy = true;

                            for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                                if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__NO_FILTERING.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                                    if ( ! psmTblData_For_ReportedPeptideId ) {
                                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned Nothing for reportedPeptideId: " + reportedPeptideId)
                                    }
                                    for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                                        if ( ! psmTblData.independentDecoyPSM ) {
                                            //  NO Decoy PSMs are in this data so this is Target PSM
                                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                                            break;
                                        }
                                    }
                                } else if ( dataPerReportedPeptideId.psmIdsSet ) {
                                    for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                                        const psmTblData = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__NO_FILTERING.get_PsmTblData_For_PsmId(psmId);
                                        if ( ! psmTblData ) {
                                            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned Nothing for psmId: " + psmId)
                                        }
                                        if ( ! psmTblData.independentDecoyPSM ) {
                                            //  NO Decoy PSMs are in this data so this is Target PSM
                                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                                            break;
                                        }
                                    }
                                } else {
                                    const msg = "dataPerReportedPeptideId no psmIdsSet or no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId"
                                    console.warn(msg)
                                    throw Error(msg)
                                }
                            }

                            if ( all_PSM_For_DistinctPeptide__Are__IndependentDecoy ) {

                                total_ToCurrent_Peptide_independentDecoy_Peptide_Count++;
                            } else {

                                //  Check if all mapped Proteins are Independent Decoy

                                let all_Proteins_For_DistinctPeptide__Are__IndependentDecoy = true;

                                for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                                    const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                                    const all_ProteinSequenceVersionId_Entries__IndependentDecoy_True = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__NO_FILTERING.get_all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId(reportedPeptideId)
                                    if ( all_ProteinSequenceVersionId_Entries__IndependentDecoy_True === undefined || all_ProteinSequenceVersionId_Entries__IndependentDecoy_True === null ) {
                                        const msg = "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__UNFILTERED.get_all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId(reportedPeptideId); returned undefined or null for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                        console.warn(msg)
                                        throw Error(msg)
                                    }
                                    if ( ! all_ProteinSequenceVersionId_Entries__IndependentDecoy_True ) {
                                        all_Proteins_For_DistinctPeptide__Are__IndependentDecoy = false;
                                        break;
                                    }
                                }

                                if ( all_Proteins_For_DistinctPeptide__Are__IndependentDecoy ) {

                                    total_ToCurrent_Peptide_independentDecoy_Peptide_Count++;
                                } else {

                                    total_ToCurrent_Peptide_target_Peptide_Count++;
                                }

                            }
                        }

                        //  Compute Estimated Error


                        // I = total independent decoys in FASTA
                        // T = total targets (non-independent decoys and non-decoys) in FASTA
                        //
                        // p = I/(I+T)
                        //
                        // i = total independent decoys that pass filters
                        // t = total targets (non-independent decoys and non-decoys) that pass filters
                        //
                        // estimated error = (i/p) / (i+t)

                        // p = I/(I+T)
                        const p = fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys / ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys + fastaFileStatistics_SingleSearch_Entry.numTargets );

                        // estimated error = (i/p) / (i+t)
                        const estimated_Error = ( total_ToCurrent_Peptide_independentDecoy_Peptide_Count / p ) / ( total_ToCurrent_Peptide_independentDecoy_Peptide_Count + total_ToCurrent_Peptide_target_Peptide_Count );

                        const estimated_Error_Clamped = Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One( estimated_Error );

                        //  Add to result array an entry for each Peptide processed

                        const peptide_Entry_Array_Length = internal_AnnotationScore_Peptide_Entries.peptide_Entry_Array.length;

                        for ( let counter = 0; counter < peptide_Entry_Array_Length; counter++ ) {
                            chart_X.push( internal_AnnotationScore_Peptide_Entries.best_PsmAnnotationScore );
                            chart_Y.push( estimated_Error_Clamped )
                        }
                    }

                    //  Marker Size
                    let marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__MAIN_PAGE;
                    if ( this.props.isInSingleChartOverlay ) {
                        marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__OVERLAY;
                    }

                    const chartData_Entry = {
                        name: chart_Data_ForSearch__TraceName,
                        x: chart_X,
                            y: chart_Y,
                        type: 'scattergl',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'scatter'
                        // hoverinfo: "text", //  Hover contents
                        // hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                        mode: 'markers',
                        marker: {
                        size: marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                            color: color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                    }
                        // marker: {
                        //     color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        // }
                    }

                    chartData_MainTraces_Array.push( chartData_Entry )
                }

                const annotationType_Name_Score_X : string = this._get_AnnotationTypeName_SearchProgramName( this.props.annotationTypeId_Score_X );

                const annotationType_Name_Score_X_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score_X );

                const chartTitle = "PSM Estimated Error vs Best PSM Annotation Score" + "<br><sup>Note: Data in plot are not filtered.</sup>";
                const chart_X_Axis_Label = "Best PSM Score: " + annotationType_Name_Score_X_HTMLEncoded;
                let chart_Y_Axis_Label = "estimated error";

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label,
                    //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
                    chart_Y_Axis_Label,
                    showlegend: true
                });

                chart_Layout.hovermode = false;  //  TURN OFF Tooltips for Scatter Plot GL since get 100% CPU usage when too many points with very similar X or Y

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
            qcViewPage_SingleSearch__SubSearches__Open_DistinctPeptide_EstimatedError_VS_AnnotationScore_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent,
                    annotationTypeId_Score_X: this.props.annotationTypeId_Score_X
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
    private _get_AnnotationTypeName_SearchProgramName( annotationTypeId: number ) : string {

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

        const annotationTypeItems_ForProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeItems_ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const searchProgramsPerSearchItems__ForProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! searchProgramsPerSearchItems__ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const psmFilterableAnnotationType = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId);
        if ( ! psmFilterableAnnotationType ) {
            const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId); returned nothing for annotationTypeId: " + annotationTypeId;
            console.warn(msg);
            throw Error(msg);
        }

        const searchProgramsPerSearchItem = searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId );
        if ( ! searchProgramsPerSearchItem ) {
            const msg = "searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId ); returned nothing for psmFilterableAnnotationType.searchProgramsPerSearchId: " + psmFilterableAnnotationType.searchProgramsPerSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        return psmFilterableAnnotationType.name + " (" + searchProgramsPerSearchItem.name + ")"
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

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


class Internal_PeptideEntry {

    peptideEntry: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry
    psmTblData_Entries_Array_Map_Key_SearchSubGroupId: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>>
    bestPsmAnnotationScore_Map_Key_SearchSubGroupId: Map<number, number>
}


class Internal_PsmAnnotationScore_Peptide_Entries {

    peptide_Entry_Array: Array<Internal_PeptideEntry>
    best_PsmAnnotationScore: number
}
