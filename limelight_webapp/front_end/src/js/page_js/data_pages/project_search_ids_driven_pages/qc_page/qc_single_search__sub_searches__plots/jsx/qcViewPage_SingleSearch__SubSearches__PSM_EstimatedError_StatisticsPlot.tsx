/**
 * qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot.tsx
 *
 * QC Page Multiple Searches : PSM Estimated Error
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {Estimated_Error__From_IndependentDecoy__CommonCode} from "page_js/data_pages/data_pages_common/estimated_Error__From_IndependentDecoy__CommonCode";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {qcViewPage_SingleSearch__SubSearches__Open_PSM_EstimatedError_StatisticsPlot_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_OverlayContainer";
import {CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered";


const chartTitle = "PSM Estimated Error";

const _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT = 3;

////

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_State >
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
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_State>, snapshot?: any) {
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
    private _populateChart() : void {
        try {
            if (!this._componentMounted) {
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

            const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

            //  Get data per Search Sub Group

            let searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder>

            const promises: Array<Promise<void>> = []

            for ( const projectSearchId of projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        .get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId )
                }

                const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
                if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
                    const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }


                {
                    const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();

                    if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                            projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        );
                    } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                        const promise = new Promise<void>((resolve, reject) => { try {
                            get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                            get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                    projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                                );
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        promises.push(promise)
                    } else {
                        throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no  data or promise")
                    }
                }
                //  Get data per Search Sub Group

                {  //  Mapping PSM Id to searchSubGroup_Id

                    const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                        get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch();

                    if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data ) {
                        if ( ! searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId ) {
                            searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId = new Map();
                        }
                        searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId.set(
                            projectSearchId, get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID_Holder
                        );
                    } else if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise ) {
                        const promise = new Promise<void>((resolve, reject) => { try {
                            get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                            get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.then(value => { try {
                                if ( ! searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId ) {
                                    searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId = new Map();
                                }
                                searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId.set(
                                    projectSearchId, value.searchSubGroupId_ForPSM_ID_Holder
                                );
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        promises.push(promise)
                    } else {
                        throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no  data or promise")
                    }
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
                            resolve(null);  // Fake null since promises array is of a type
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_FastaFileStatisticsHolder_Result no data or promise")
                }
            }

            if ( promises.length === 0 ) {

                this._populateChart_AfterLoadData({
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId,
                    fastaFileStatistics_Holder
                });
            }

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {

            })
            promisesAll.then(noValue => { try {

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                this._populateChart_AfterLoadData({
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId,
                    fastaFileStatistics_Holder
                });
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _populateChart_AfterLoadData(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId,
            fastaFileStatistics_Holder
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
            searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder>
            fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder
        }
    ) {
        try {
            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

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

            //  Colors for Bars
            const qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({ searchSubGroupIds: searchSubGroupIds_DisplayOrder });

            const chart_X : Array<string> = []
            const chart_Y : Array<number> = []
            const chart_Bars_labels : Array<string> = []
            const chart_Bars_Tooltips : Array<string> = []
            const chart_Colors : Array<any> = []

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                const color = "#" + qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId( searchSubGroup.searchSubGroup_Id )

                const x_Label = searchSubGroup.subgroupName_Display;

                const compute_Error_SingleSearch_Result = this._compute_Error_Single_SubSearch({
                    searchSubGroup_Id: searchSubGroup.searchSubGroup_Id,
                    projectSearchId,
                    peptideDistinct_Array:
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId,
                    fastaFileStatistics_Holder
                });

                if ( ! compute_Error_SingleSearch_Result ) {

                    continue; // EARLY CONTINUE
                }

                chart_X.push(x_Label);
                chart_Y.push(compute_Error_SingleSearch_Result.psm_Estimated_Error)

                const psm_Estimated_Error_Display = compute_Error_SingleSearch_Result.psm_Estimated_Error.toPrecision( _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT );

                chart_Bars_labels.push( psm_Estimated_Error_Display );
                chart_Bars_Tooltips.push( "<b>Sub Search</b>: " + searchSubGroup.subgroupName_Display + "<br><b>PSM Estimated Error</b>: " + psm_Estimated_Error_Display );
                chart_Colors.push(color);
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
                chartTitle: chartTitle, // + "<br><sup>Note: Data in plot are not filtered.</sup>",
                chart_X_Axis_Label: undefined,
                chart_X_Axis_IsTypeCategory: true,
                chart_Y_Axis_Label: "estimated error",
                showlegend: false
            });

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

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _compute_Error_Single_SubSearch(
        {
            searchSubGroup_Id,
            projectSearchId,
            peptideDistinct_Array,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId,
            fastaFileStatistics_Holder
        } : {
            searchSubGroup_Id: number
            projectSearchId: number
            peptideDistinct_Array: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry[]
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
            searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder>
            fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder
        }) : {
        psm_Estimated_Error: number
    } {

        // I = total independent decoys in FASTA
        // T = total targets (non-independent decoys and non-decoys) in FASTA
        //
        // p = I/(I+T)
        //
        // i = total independent decoys that pass filters
        // t = total targets (non-independent decoys and non-decoys) that pass filters
        //
        // estimated error = (i/p) / (i+t)

        const fastaFileStatistics_SingleSearch_Entry = fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId)

        if ( ! fastaFileStatistics_SingleSearch_Entry ) {
            //  No Fasta File Statistics so return null

            return null; // EARLY RETURN
        }

        if ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys === 0 ) {
            //  No PSM Independent Decoys in Fasta File Statistics so return null

            return null; // EARLY RETURN
        }

        let number_PSM_Target = 0;
        let number_PSM_IndependentDecoy = 0;

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId)
        }

        const searchSubGroupId_ForPSM_ID_Holder = searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! searchSubGroupId_ForPSM_ID_Holder ) {
            throw Error("searchSubGroupId_ForPSM_ID_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId)
        }

        for ( const peptide_Entry of peptideDistinct_Array ) {

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptide_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);

            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                //  Nothing for projectSearchId so skip
                continue; // EARLY CONTINUE
            }

            let all_PSM_For_DistinctPeptide__Are__IndependentDecoy = true;

            for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned Nothing for reportedPeptideId: " + reportedPeptideId)
                    }
                    for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                        const searchSubGroupId_For_PSM = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmTblData.psmId);
                        if ( searchSubGroupId_For_PSM === undefined || searchSubGroupId_For_PSM === null ) {
                            throw Error("searchSubGroupId_ForPSM_ID_Holder.get_PsmTblData_For_PsmId(psmId); returned undefined or null for psmId: " + psmTblData.psmId)
                        }

                        if ( searchSubGroupId_For_PSM !== searchSubGroup_Id ) {
                            //  PSM Not for searchSubGroup_Id being processed so skip
                            continue; // EARLY CONTINUE
                        }

                        if ( psmTblData.independentDecoyPSM ) {
                            number_PSM_IndependentDecoy++;
                        } else {
                            //  NO Decoy PSMs are in this data so this is Target PSM
                            number_PSM_Target++;

                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                        }
                    }
                } else if ( dataPerReportedPeptideId.psmIdsSet ) {
                    for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                        const psmTblData = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId);
                        if ( ! psmTblData ) {
                            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned Nothing for psmId: " + psmId)
                        }

                        const searchSubGroupId_For_PSM = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmTblData.psmId);
                        if ( searchSubGroupId_For_PSM === undefined || searchSubGroupId_For_PSM === null ) {
                            throw Error("searchSubGroupId_ForPSM_ID_Holder.get_PsmTblData_For_PsmId(psmId); returned undefined or null for psmId: " + psmTblData.psmId)
                        }

                        if ( searchSubGroupId_For_PSM !== searchSubGroup_Id ) {
                            //  PSM Not for searchSubGroup_Id being processed so skip
                            continue; // EARLY CONTINUE
                        }

                        if ( psmTblData.independentDecoyPSM ) {
                            number_PSM_IndependentDecoy++;
                        } else {
                            //  NO Decoy PSMs are in this data so this is Target PSM
                            number_PSM_Target++;

                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                        }
                    }
                } else {
                    const msg = "dataPerReportedPeptideId no psmIdsSet or no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId"
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }

        if ( ( number_PSM_IndependentDecoy + number_PSM_Target ) === 0 ) {
            //  No PSMs pass filter

            return null; // EARLY RETURN
        }

        // I = total independent decoys in FASTA
        // T = total targets (non-independent decoys and non-decoys) in FASTA
        //
        // p = I/(I+T)
        const p = fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys / ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys + fastaFileStatistics_SingleSearch_Entry.numTargets );

        //  Compute psm_Estimated_Error

        // i = total independent decoys that pass filters
        // t = total targets (non-independent decoys and non-decoys) that pass filters
        //
        // estimated error = (i/p) / (i+t)

        const estimated_Error = ( number_PSM_IndependentDecoy / p ) / ( number_PSM_IndependentDecoy + number_PSM_Target );

        const estimated_Error_Clamped = Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One( estimated_Error );

        const psm_Estimated_Error = estimated_Error_Clamped;

        return { psm_Estimated_Error };
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
            qcViewPage_SingleSearch__SubSearches__Open_PSM_EstimatedError_StatisticsPlot_OverlayContainer({
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
