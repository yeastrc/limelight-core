/**
 * qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot,
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot";
import {
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType,
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData";
import {CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";


/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...)

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number
    annotationTypeId_Score_Y: number

    transform_Score_X: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice
    transform_Score_Y: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice

    score_X_Contains_NegativeValues_Callback: ( score_Contains_NegativeValues: boolean ) => void
    score_Y_Contains_NegativeValues_Callback: ( score_Contains_NegativeValues: boolean ) => void

    isInSingleChartOverlay: boolean

    chartType: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...)

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
    onlyPlot_PropsValue?: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    private _prevProps: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const searchDataLookupParamsForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchDataLookupParamsRoot.
                    paramsForProjectSearchIds.paramsForProjectSearchIdsList[0];

            const projectSearchId = searchDataLookupParamsForProjectSearchId.projectSearchId;

            const annotationTypeItems_ForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
            if ( ! annotationTypeItems_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.size < 2 ) {
                // No Data for chart so NOT render it
                this._renderChart = false;

            } else {

            }
        }

        this._prevProps = props;

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
                        this._populateChartData();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State>, nextContext: any): boolean {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.annotationTypeId_Score_X !== nextProps.annotationTypeId_Score_X
            || this.props.annotationTypeId_Score_Y !== nextProps.annotationTypeId_Score_Y
            || this.props.transform_Score_X !== nextProps.transform_Score_X
            || this.props.transform_Score_Y !== nextProps.transform_Score_Y
            || this.props.chartType !== nextProps.chartType
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
            || this.state.onlyPlot_PropsValue !== nextState.onlyPlot_PropsValue
        ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //   REMOVE ALL State property checks in componentDidUpdate

                if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.annotationTypeId_Score_X !== prevProps.annotationTypeId_Score_X
                    || this.props.annotationTypeId_Score_Y !== prevProps.annotationTypeId_Score_Y
                    || this.props.transform_Score_X !== prevProps.transform_Score_X
                    || this.props.transform_Score_Y !== prevProps.transform_Score_Y
                    || this.props.chartType !== prevProps.chartType
                    // || this.state.onlyPlot_PropsValue !== prevState.onlyPlot_PropsValue  //   REMOVE ALL State property checks in componentDidUpdate
                    // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                    // || this.state.showUpdatingMessage !== nextState.showUpdatingMessage  //   REMOVE ALL State property checks in componentDidUpdate
                ) {
                } else {
                    return;
                }

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                this._prevProps = this.props;

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

                        this._populateChartData();

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
    private _populateChartData() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises: Array<Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>> = []
        {
            //  Loads PSM Filtered data
            //  calls this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded(...)
            const promise =
                this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmTblData();

            promises.push(promise);
        }

        let psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
        {
            const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();

            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_X )
            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_Y );

            const get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData().
                get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested });

            if ( get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data ) {
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;
            } else if ( get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => { try {
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
            if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                const get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result =
                    commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData().
                    get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder();

                if ( get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data ) {
                    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.data.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder;
                } else if ( get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder_Result.promise ) {
                    const promise = new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => { try {
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
        }

        const promisesAll = Promise.all( promises );

        promisesAll.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({ showCreatingMessage: false, showUpdatingMessage: false });

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

                const value = values[0]; // Just use first entry

                if ( this.props.score_X_Contains_NegativeValues_Callback && this.props.score_Y_Contains_NegativeValues_Callback ) {

                    // Check for Negative Scores

                    let min_Score_X = undefined;
                    let min_Score_Y = undefined;

                    for ( const psmFilterableAnnotationData_Unfiltered_Entry of psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_Entries_IterableIterator() ) {

                        const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                            psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_X );
                        const psmFilterableAnnotationData_For_annotationTypeId_Score_Y =
                            psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_Y );

                        if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                            const msg = "psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_X ); returned nothing. this.props.annotationTypeId_Score_X: " + this.props.annotationTypeId_Score_X;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_Y ) {
                            const msg = "psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_Y ); returned nothing. this.props.annotationTypeId_Score_Y: " + this.props.annotationTypeId_Score_Y;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        {
                            const score_X = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber;
                            const score_Y = psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber;

                            if (min_Score_X === undefined) {
                                min_Score_X = score_X;
                                min_Score_Y = score_Y;
                            } else {
                                if ( min_Score_X > score_X ) {
                                    min_Score_X = score_X;
                                }
                                if ( min_Score_Y > score_Y ) {
                                    min_Score_Y = score_Y;
                                }
                            }
                        }
                    }

                    const transform_Score_X_Local = this.props.transform_Score_X;  //  Save off since calling callback changes this.props.transform_Score_X
                    const transform_Score_Y_Local = this.props.transform_Score_Y;  //  Save off since calling callback changes this.props.transform_Score_Y

                    if ( min_Score_X < 0 ) {
                        this.props.score_X_Contains_NegativeValues_Callback( true )
                    } else {
                        this.props.score_X_Contains_NegativeValues_Callback( false )
                    }
                    if ( min_Score_Y < 0 ) {
                        this.props.score_Y_Contains_NegativeValues_Callback( true )
                    } else {
                        this.props.score_Y_Contains_NegativeValues_Callback( false )
                    }

                    if ( min_Score_X < 0
                        && transform_Score_X_Local !== QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE ) {

                        //  HAVE score X < 0 AND selection X of transform log10 or -log10 so return instead of showing chart

                        return;
                    }

                    if ( min_Score_Y < 0
                        && transform_Score_Y_Local !== QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE ) {

                        //  HAVE score Y < 0 AND selection Y of transform log10 or -log10 so return instead of showing chart

                        return;
                    }

                }

                this.setState({ showCreatingMessage: false, showUpdatingMessage: false });

                const onlyPlot_PropsValue : QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue = {

                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: value,

                    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder,
                    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder,

                    searchScanFileId_Selection: this.props.searchScanFileId_Selection,
                    annotationTypeId_Score_X: this.props.annotationTypeId_Score_X,
                    annotationTypeId_Score_Y: this.props.annotationTypeId_Score_Y,

                    transform_Score_X: this.props.transform_Score_X,
                    transform_Score_Y: this.props.transform_Score_Y,

                    isInSingleChartOverlay: this.props.isInSingleChartOverlay,

                    chartType: this.props.chartType
                }

                this.setState({ onlyPlot_PropsValue });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const style : React.CSSProperties = { position: "relative" };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }


        return (
            <div style={ style } >
                { ( this.state.onlyPlot_PropsValue ) ? (
                    <div style={ style }>
                        <QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot
                            propsValue={ this.state.onlyPlot_PropsValue }
                        />
                        {( this.state.showUpdatingMessage ) ? (

                            <QcPage_UpdatingData_BlockCover/>
                            
                        ): null }
                    </div>
                ): (
                    <div>
                        LOADING DATA
                    </div>
                ) }
            </div>
        );
    }
}


