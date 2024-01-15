/**
 * qcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot.tsx
 *
 * QC Page Multiple Searches : PSM Count vs M/Z Statistics
 *
 */

import React from "react";

import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { qcPage_StandardChartLayout } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcPage_UpdatingData_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import { open_PSMCount_VS_M_Z_OverlayContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSMCount_VS_M_Z_OverlayContainer";
import { QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import { QcViewPage_MultipleSearches__ComputeColorsForSearches } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_MultipleSearches__ComputeColorsForSearches";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { QcPage_CreatingPlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import { QcPage_ClickPlot_ForInteractivePlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import { qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/js/qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data";


const chartTitle = "Distribution of PSM Precursor m/z";


/**
 *
 */
export interface QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot
    extends React.Component< QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_Props, QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_State >
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
    constructor(props: QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
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
                    this._loadData_IfNeeded_ThenCall_populateChart();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_M_Z_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
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

                    this._loadData_IfNeeded_ThenCall_populateChart();

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
            this._loadData_IfNeeded_ThenCall_populateChart()

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
    private _loadData_IfNeeded_ThenCall_populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        let scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder> = new Map()

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

        const promises: Array<Promise<void>> = []

        {

            const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

            for (const projectSearchId of projectSearchIds) {

                let search__PSMS_precursor_retention_time__NotNull = false;
                {
                    const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
                    if (!qcPage_Searches_Info_SingleSearch) {
                        const msg = "this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull) {
                        //  PSM Retention Time data for search IS SET
                        search__PSMS_precursor_retention_time__NotNull = true;
                    }
                }

                if ( ! search__PSMS_precursor_retention_time__NotNull ) {

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                        this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
                    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                        const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const promise = new Promise<void>((resolve, reject) => { try {
                        const promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().
                            get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

                        promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.catch(reason => reject(reason))
                        promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.then( value_promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch => { try {

                            const promises_ScanData_Array: Array<Promise<void>> = []

                            for ( const scanFile_ProjectScanFileId_SearchScanFileId_Entry of value_promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_All() ) {

                                const searchScanFileId = scanFile_ProjectScanFileId_SearchScanFileId_Entry.searchScanFileId

                                const get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result =
                                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data().
                                    get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId({ searchScanFileId })
                                if ( get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.data ) {
                                    scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.set( searchScanFileId, get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.data.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder )
                                } else if ( get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise ) {
                                    const promise_For_Single_SearchScanFileId = new Promise<void>((resolve_For_Single_SearchScanFileId, reject_For_Single_SearchScanFileId) => { try {
                                        get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise.catch( reason => reject_For_Single_SearchScanFileId(reason) )
                                        get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise.then( value => { try {
                                            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.set( searchScanFileId, value.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder )
                                            resolve_For_Single_SearchScanFileId()
                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                    promises_ScanData_Array.push(promise_For_Single_SearchScanFileId)
                                } else {
                                    throw Error( "get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result NO data or promise" )
                                }
                            }

                            if ( promises_ScanData_Array.length === 0 ) {

                                resolve()

                            } else {
                                const promises_ScanData_Array_All = Promise.all( promises_ScanData_Array )
                                promises_ScanData_Array_All.catch(reason => reject(reason))
                                promises_ScanData_Array_All.then(novalue => { try {
                                    resolve()
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            }

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    promises.push(promise)
                }
            }
        }

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result NO data or promise"
                console.warn(msg)
                throw Error(msg)
            }
        }

        const promiseAll = Promise.all( promises )

        promiseAll.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }



            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promiseAll.then( novalue => {
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

                this._populateChart({ scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _populateChart(
        {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
        } : {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder>
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
        }
    ) : void {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        this.setState({showUpdatingMessage: false});

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const searchData_SearchName_Etc_Root = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root();

        const qcViewPage_MultipleSearches__ComputeColorsForSearches = new QcViewPage_MultipleSearches__ComputeColorsForSearches({projectSearchIds});

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []

        for (const projectSearchId of projectSearchIds) {

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            let search__PSMS_precursor_m_z__NotNull = false;
            {
                const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
                if (!qcPage_Searches_Info_SingleSearch) {
                    const msg = "this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if (qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull) {
                    //  PSM M/Z data for search IS SET
                    search__PSMS_precursor_m_z__NotNull = true;
                }
            }

            const searchData = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchData ) {
                const msg = "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const x_Label = searchData.searchLabel__SearchShortName_OR_SearchId;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

                let precursor_M_Over_Z: number = undefined;

                if ( search__PSMS_precursor_m_z__NotNull ) {
                    // get from PSM
                    precursor_M_Over_Z = psmTblData_Filtered_Entry.precursor_M_Over_Z;
                } else {
                    // Get from Scan
                    if ( ! psmTblData_Filtered_Entry.searchScanFileId ) {
                        const msg = "( ! psmTblData_Filtered_Entry.searchScanFileId )  projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! psmTblData_Filtered_Entry.scanNumber ) {
                        const msg = "( ! psmTblData_Filtered_Entry.scanNumber )  projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId ) {
                        const msg = " else of ( search__PSMS_precursor_m_z__NotNull ) AND (! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId ) for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const scanData_Single_SearchScanFileId_NO_Peaks_Data_HolderFor_SearchScanFileId = scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get(psmTblData_Filtered_Entry.searchScanFileId);
                    if ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_HolderFor_SearchScanFileId ) {
                        const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get(psmTblData_Filtered_Entry.searchScanFileId); returned nothing for searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    const spectralStorage_NO_Peaks_DataFor_ScanNumber = scanData_Single_SearchScanFileId_NO_Peaks_Data_HolderFor_SearchScanFileId.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                    if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                        const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_HolderFor_SearchScanFileId.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing for scanNumber: " + psmTblData_Filtered_Entry.scanNumber + ", searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    precursor_M_Over_Z = spectralStorage_NO_Peaks_DataFor_ScanNumber.precursor_M_Over_Z;
                }

                chart_X.push( x_Label );
                chart_Y.push( precursor_M_Over_Z );
            }
        }


        const transforms_styles: Array<any> = [];

        for ( const projectSearchId of projectSearchIds ) {

            const color = qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsHexString_By_ProjectSearchId( projectSearchId )

            const searchData = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchData ) {
                const msg = "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const x_Label = searchData.searchLabel__SearchShortName_OR_SearchId;

            transforms_styles.push({target: x_Label, value: {line: {color: color}}});
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

        const qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc__Result =
            qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc({
                projectSearchIds,
                searchData_SearchName_Etc_Root: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root()
            })

        const xAxisTitle = qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc__Result.xAxisTitle;

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: xAxisTitle,
            chart_X_Axis_IsTypeCategory: true,
            chart_Y_Axis_Label: "m/z",
            showlegend: false,
            search_SubSearch_Count_SizeFor: transforms_styles.length
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
            open_PSMCount_VS_M_Z_OverlayContainer({
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
