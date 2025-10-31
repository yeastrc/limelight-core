/**
 * qcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : PSM Count vs Retention Time Statistics
 *
 */

import React from "react";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { qcPage_StandardChartLayout } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcPage_UpdatingData_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import { SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import { qc_SingleSearch__SubSearches__Open_PSMCount_VS_RetentionTime_OverlayContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_OverlayContainer";
import { QcPage_CreatingPlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import { QcPage_ClickPlot_ForInteractivePlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data";
import Plotly from "plotly.js-dist-min";
import {
    Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition
} from "page_js/common_all_pages/Plotly_PlottingLibrary_CommonCode/Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition";


const chartTitle = "Distribution of PSM Retention Time";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_State >
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
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_RetentionTime_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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

        if (
            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
            )) {
            //  Skip these params since they are not the "Latest"
            return; // EARLY RETURN
        }

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        let scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder> = new Map()
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        { // scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId

            const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
            if ( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) {

                //  Load Data

                if ( ! this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
                    const msg = "( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) AND ( ! qcPage_Flags_SingleSearch.hasScanData ) ";
                    console.warn(msg);
                    throw Error(msg);
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
        { // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
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

        const promisesAll = Promise.all(promises)


        promisesAll.catch( reason => {
            try {
                console.warn( "_populateChart():: catch(...): reason: ", reason );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promisesAll.then( novalue => {
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

                this._populateChart({ scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder }); // returns ignored  Promise<void>

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private async _populateChart(
        {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        } : {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder>
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
    ) : Promise<void> {
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

            const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
            if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise()

            const searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result.searchSubGroupId_ForPSM_ID_Holder;

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            let search__PSMS_precursor_retention_time__NotNull = false;
            {
                const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
                if (qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull) {
                    //  PSM M/Z data for search IS SET
                    search__PSMS_precursor_retention_time__NotNull = true;
                }
            }

            if ( ! search__PSMS_precursor_retention_time__NotNull ) {
                if ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId ) {
                    const msg = " ( ! search__PSMS_precursor_retention_time__NotNull ) AND ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId ) for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
            }

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const searchSubGroup_Ids_Found = new Set<number>()

            //  Collect values by subgroupName_Display in a map
            const subgroupName_Display__RetentionTime__EntryArray_Map_Key_subgroupName_Display : Map<string, Array<{

                subgroupName_Display: string
                retentionTime_Minutes: number
            }>> = new Map();

            for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

                let retentionTimeSeconds: number = undefined;

                if ( search__PSMS_precursor_retention_time__NotNull ) {
                    // get from PSM
                    retentionTimeSeconds = psmTblData_Filtered_Entry.retentionTimeSeconds;
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

                    const scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder = scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get( psmTblData_Filtered_Entry.searchScanFileId )
                    if ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder ) {
                        const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get( psmTblData_Filtered_Entry.searchScanFileId ); returned nothing. searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const spectralStorage_NO_Peaks_DataFor_ScanNumber = scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                    if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                        const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing. scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    retentionTimeSeconds = spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds;
                }

                const searchSubGroup_Id = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmTblData_Filtered_Entry.psmId);
                if ( ! searchSubGroup_Id ) {
                    const msg = "( ! searchSubGroup_Id ) psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup_Id ) ) {
                    //  NOT a Selected searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const searchSubGroup = searchSubGroups_Map_Key_searchSubGroupId.get(searchSubGroup_Id);
                if ( ! searchSubGroup ) {
                    const msg = "( ! searchSubGroup ). searchSubGroup_Id: " + searchSubGroup_Id + ", psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                searchSubGroup_Ids_Found.add(searchSubGroup_Id);

                const subgroupName_Display = searchSubGroup.subgroupName_Display;

                let subgroupName_Display__RetentionTime__EntryArray = subgroupName_Display__RetentionTime__EntryArray_Map_Key_subgroupName_Display.get( subgroupName_Display );
                if ( ! subgroupName_Display__RetentionTime__EntryArray ) {
                    subgroupName_Display__RetentionTime__EntryArray = [];
                    subgroupName_Display__RetentionTime__EntryArray_Map_Key_subgroupName_Display.set( subgroupName_Display, subgroupName_Display__RetentionTime__EntryArray );
                }

                const subgroupName_Display__RetentionTime__Entry = { subgroupName_Display, retentionTime_Minutes: retentionTimeSeconds / 60 };

                subgroupName_Display__RetentionTime__EntryArray.push( subgroupName_Display__RetentionTime__Entry );
            }

            //  Must add to chart_X, chart_Y in the order they will be shown in the chart

            const chart_X : Array<string> = []
            const chart_Y : Array<number> = []

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                if ( ! searchSubGroup_Ids_Found.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT a Found searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const subgroupName_Display__RetentionTime__EntryArray = subgroupName_Display__RetentionTime__EntryArray_Map_Key_subgroupName_Display.get( searchSubGroup.subgroupName_Display );

                for ( const subgroupName_Display__RetentionTime__Entry of subgroupName_Display__RetentionTime__EntryArray ) {

                    chart_X.push( subgroupName_Display__RetentionTime__Entry.subgroupName_Display );
                    chart_Y.push( subgroupName_Display__RetentionTime__Entry.retentionTime_Minutes );
                }
            }


            const transforms_styles: Array<any> = [];

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                if ( ! searchSubGroup_Ids_Found.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT a Found searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const color = "#" + qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                const x_Label = searchSubGroup.subgroupName_Display;

                transforms_styles.push({target: x_Label, value: {line: {color: color}}});
            }

            const chart_Data_Entry: Plotly.Data = {
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
                //  'transforms' property set in next statement
            }

            Plotly_PlottingLibrary__SetProperties_NOT_in_TypescriptTypingsDefinition.Data_Class.plotly_Set_chart_Data_transforms_property({
                transforms_PropertyValue: [{
                    type: 'groupby',
                    groups: chart_X,
                    styles: transforms_styles
                }],
                plotly_Data_SingleTrace: chart_Data_Entry
            })

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
                chart_Y_Axis_Label: "Retention Time (minutes)",
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
            qc_SingleSearch__SubSearches__Open_PSMCount_VS_RetentionTime_OverlayContainer({
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
