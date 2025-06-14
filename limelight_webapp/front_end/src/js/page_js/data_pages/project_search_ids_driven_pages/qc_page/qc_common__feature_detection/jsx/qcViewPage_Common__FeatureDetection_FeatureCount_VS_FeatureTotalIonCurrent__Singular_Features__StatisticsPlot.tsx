/**
 * qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot.tsx
 *
 * QC Page Common : Feature Detection: Feature Count Y Axis VS Total Ion Current X Axis Statistics  --  Singular Features for Red "Detected Features"
 *
 */


import React from "react";
import { DataTitle } from "plotly.js-dist-min";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout,
    qcPage_StandardChartLayout_StandardHeight
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcPage_UpdatingData_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import { QcPage_CreatingPlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import { QcPage_ClickPlot_ForInteractivePlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { QcPage_ChartFiller_NoData } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {
    open_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent_OverlayContainer,
    QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer";
import { CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { QcViewPage_Common__FeatureDetection__DataToPlot_Parameters } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";


const chartTitle = "Feature Count vs/ Total Ion Current";

const _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY = 4;

const _CHART_BIN_COUNT = 80;

/**
 *
 */
export class QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params {

    scans_NotContain_TotalIonCurrent: boolean
}

/**
 *
 */
export type QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType =
    ( params: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params ) => void

/**
 *
 */
export interface QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_Props {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    dataToPlot : QcViewPage_Common__FeatureDetection__DataToPlot_Parameters

    transform_Score: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice

    qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_State {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot
    extends React.Component< QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_Props, QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_State >
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

    private _renderChart: boolean = true;

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel: QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_Props) {
        super(props);

        const classObject_This = this;

        // if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {
        //
        //     // No Data for chart so NOT render it
        //
        //     const msg = "No Data for Chart";
        //     console.warn(msg);
        //     throw Error(msg)
        //
        //     this._renderChart = false;
        //
        // } else {
        //
        //     const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId
        //     if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
        //
        //     } else {
        //         const msg = "Not true. qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
        //         console.warn(msg);
        //         throw Error(msg)
        //     }
        // }

        this.plot_Ref = React.createRef();
        this.image_Ref = React.createRef();

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

            //  Initialize to current passed value

            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register( { callbackItem: this } )
        }

        /////

        this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel = {
            set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {
                classObject_This._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel = item;
                classObject_This.setState({ showUpdatingMessage: true });
            }
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel =
            props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel

        props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.register({
            callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
        })

        this.state = {
            showCreatingMessage: true,
            showUpdatingMessage: false,
            show_NoData_Message: false
        };
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
            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.un_register({ callbackItem: this })
            }
        } catch (e) {
            //  Eat Exception
        }

        try {
            this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.un_register({
                callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
            })
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
            if ( this._renderChart ) {
                this._removeChart();
            }
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_Props>, nextState: Readonly<QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.dataToPlot !== nextProps.dataToPlot
            || this.props.transform_Score !== nextProps.transform_Score
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
            || this.state.show_NoData_Message !== nextState.show_NoData_Message
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_Props>, prevState: Readonly<QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.dataToPlot !== prevProps.dataToPlot
                    || this.props.transform_Score !== prevProps.transform_Score
                    || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                    // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                    // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  // Always remove state property checks in 'componentDidUpdate'
                    // || this.state.show_NoData_Message !== nextState.show_NoData_Message
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

                if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {
                    if (
                        (
                            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                            )
                        )
                        || (
                            ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                            )
                        )
                    ) {
                        //  Skip these params since they are not the "Latest"
                        return; // EARLY RETURN
                    }
                }

                this.setState({ showUpdatingMessage: true });

                window.setTimeout(() => {
                    try {
                        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

                            if (
                                (
                                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                                    )
                                )
                                || (
                                    ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                                    )
                                )
                            ) {
                                //  Skip these params since they are not the "Latest"
                                return; // EARLY RETURN
                            }
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

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {
            if (
                (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )
                )
                || (
                    ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                    )
                )
            ) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = this.props.dataToPlot.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        const searchScanFileId_EntriesFor_projectScanFileId_Set = this.props.dataToPlot.searchScanFileId_EntriesFor_projectScanFileId_Set

        const commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = this.props.dataToPlot.commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

        const featureDetection_SingularFeature_Entries_Holder = this.props.dataToPlot.featureDetection_SingularFeature_Entries_Holder
        const featureDetection_PersistentFeature_Entries_Holder = this.props.dataToPlot.featureDetection_PersistentFeature_Entries_Holder
        const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = this.props.dataToPlot.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder

        this._populateChart__Actual({
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            searchScanFileId_EntriesFor_projectScanFileId_Set,
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
            featureDetection_SingularFeature_Entries_Holder,
            featureDetection_PersistentFeature_Entries_Holder,
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
        });
    }

    /**
     *
     */
    private _populateChart__Actual(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            searchScanFileId_EntriesFor_projectScanFileId_Set,
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
            featureDetection_SingularFeature_Entries_Holder,
            featureDetection_PersistentFeature_Entries_Holder,
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            searchScanFileId_EntriesFor_projectScanFileId_Set: Set<number>
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
            featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder
            featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder
        }
    ) : void {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {
            if (
                (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )
                )
                || (
                    ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                    )
                )
            ) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }
        }

        {  //  First confirm all scans have total ion current

            for (const dataForSingleScanNumberEntry of commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray) {

                let scans_NotContain_TotalIonCurrent = false;

                if ( dataForSingleScanNumberEntry.totalIonCurrent_ForScan === undefined || dataForSingleScanNumberEntry.totalIonCurrent_ForScan === null ) {

                    console.warn( "No totalIonCurrent_ForScan for scanNumber: " + dataForSingleScanNumberEntry.scanNumber +
                        ", project_scan_file_id: " + this.props.dataToPlot.projectScanFileId );

                    scans_NotContain_TotalIonCurrent = true;
                }

                if ( scans_NotContain_TotalIonCurrent ) {

                    this.props.qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function({
                        scans_NotContain_TotalIonCurrent
                    });

                    //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    return; // EARLY RETURN
                }
            }
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

        const scans_For_Selected_searchScanFileId_Map_Key_ScanNumber : Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map();

        {  // Populate scans_For_Selected_searchScanFileId_Map_Key_ScanNumber

            for ( const spectralStorage_NO_Peaks_DataEntry of commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {
                scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.set(spectralStorage_NO_Peaks_DataEntry.scanNumber, spectralStorage_NO_Peaks_DataEntry)
            }
        }

        ////  Create chart_Data

        let max_Value_Feature_Intensity_ALL_FeatureDetection_Entries: number = undefined
        let min_Value_Feature_Intensity_ALL_FeatureDetection_Entries: number = undefined

        for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

            if ( max_Value_Feature_Intensity_ALL_FeatureDetection_Entries === undefined ) {
                max_Value_Feature_Intensity_ALL_FeatureDetection_Entries = featureDetection_SingularFeature_Entry.intensity;
                min_Value_Feature_Intensity_ALL_FeatureDetection_Entries = featureDetection_SingularFeature_Entry.intensity;
            } else {
                if ( max_Value_Feature_Intensity_ALL_FeatureDetection_Entries < featureDetection_SingularFeature_Entry.intensity ) {
                    max_Value_Feature_Intensity_ALL_FeatureDetection_Entries = featureDetection_SingularFeature_Entry.intensity;
                }
                if ( min_Value_Feature_Intensity_ALL_FeatureDetection_Entries > featureDetection_SingularFeature_Entry.intensity ) {
                    min_Value_Feature_Intensity_ALL_FeatureDetection_Entries = featureDetection_SingularFeature_Entry.intensity;
                }
            }
        }

        let min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10: number;

        if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
            if ( min_Value_Feature_Intensity_ALL_FeatureDetection_Entries < 1 ) {
                //  set min to 1 since less than 1
                min_Value_Feature_Intensity_ALL_FeatureDetection_Entries = 1;
            }

            min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10 = Math.log10( min_Value_Feature_Intensity_ALL_FeatureDetection_Entries );
        }

        let binSize_Feature_Intensity_ALL_FeatureDetection_Entries =
            ( max_Value_Feature_Intensity_ALL_FeatureDetection_Entries - min_Value_Feature_Intensity_ALL_FeatureDetection_Entries ) / _CHART_BIN_COUNT;

        if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
            binSize_Feature_Intensity_ALL_FeatureDetection_Entries =
                ( Math.log10( max_Value_Feature_Intensity_ALL_FeatureDetection_Entries ) - Math.log10( min_Value_Feature_Intensity_ALL_FeatureDetection_Entries ) ) / _CHART_BIN_COUNT;
        }

        const count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries: Array<number> = [];

        {
            for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

                let index: number

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                    let feature_intensity = featureDetection_SingularFeature_Entry.intensity;
                    if ( feature_intensity <  1 ) {
                        //  set min to 1 since less than 1
                        feature_intensity = 1;
                    }
                    const feature_intensity_Log10 = Math.log10( feature_intensity );

                    index = Math.floor( ( feature_intensity_Log10 - min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10 ) / binSize_Feature_Intensity_ALL_FeatureDetection_Entries );

                } else {
                    index = Math.floor( ( featureDetection_SingularFeature_Entry.intensity - min_Value_Feature_Intensity_ALL_FeatureDetection_Entries ) / binSize_Feature_Intensity_ALL_FeatureDetection_Entries );
                }

                if ( count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries[ index ] ) {
                    count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries[ index ]++;
                } else {
                    count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries[ index ] = 1;
                }
            }
        }

        const count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries: Array<number> = [];

        const chart_Data: Array<any> = [];


        {
            ///  Create Feature Detection Total Ion Current, all Feature Detection Entries

            const chart_X: Array<number> = []
            const chart_Y: Array<number> = []
            const chart_Bars_Tooltips: Array<string> = [];

            for ( let index = 0; index < _CHART_BIN_COUNT; index++ ) {

                let minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries;

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                    minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10;
                }

                const binCenter =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) +
                    ( 0.5 * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );  // * 0.5 for center

                let count = count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries[ index ];
                if ( ! count ) {
                    count = 0;
                }

                const binStart =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );

                const binEnd =
                    minValue +
                    ( ( index + 1 ) * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) //  add 1 for bin end

                let label_Log10_Start = "";
                let label_Log10_End = "";

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                    label_Log10_Start = "Log10(";
                    label_Log10_End = ")";
                }

                const label =
                    "Feature Count: " +  count.toLocaleString() +
                    "<br>Total Ion Current between " +
                    label_Log10_Start +
                    binStart.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End +
                    " and " +
                    label_Log10_Start +
                    binEnd.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End;

                let chart_Y_Entry = count

                if ( chart_Y_Entry < 0 ) {
                    //  Should never happen
                    chart_Y_Entry = 0;
                }

                chart_X.push( binCenter );
                chart_Y.push( chart_Y_Entry );
                chart_Bars_Tooltips.push( label );
            }

            //  Add to Chart Data

            // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

            chart_Data.push({

                name: "Detected Features",

                type: 'bar',
                x: chart_X,
                y: chart_Y,

                hoverinfo: "text", //  Hover contents
                hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                // '<br><b>Scans</b>: %{y}' +
                // '<br><b>Retention Time</b>: %{x}<extra></extra>',
                marker: {
                    color: "#696969", // changed from "red", // red match sample chart
                    // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
            });
        }

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            && this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result ) {

            //  Plotly Trace "Features w/ PSMs"

            ///  Create Feature Detection Total Ion Current,  Feature Detection Entries Filtered on PSMs using MS 2 in Feature Detection entry

            const projectSearchId = this.props.dataToPlot.projectSearchId;

            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId, peptideDistinct_Array, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const ms_2_scanData_For_PSMs_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map();

            for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                if ( ! searchScanFileId_EntriesFor_projectScanFileId_Set.has( psmTblData_Filtered_Entry.searchScanFileId ) ) {

                    //  Skip since not for Scan File this Feature Detection is for
                    continue; // EARLY CONTINUE
                }

                let ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber );

                if ( ! ms_2_scanData) {
                    const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber ); returned nothing for psmTblData_Filtered_Entry.scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                while ( ms_2_scanData.level > 2 ) {
                    //  Not MS 2 level scan data so get parent scan
                    if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                        const msg = "In ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const parentScanNumber = ms_2_scanData.parentScanNumber

                    ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber );
                    if ( ! ms_2_scanData) {
                        const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber ); returned nothing for parentScanNumber: " + parentScanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                    const msg = "After ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                ms_2_scanData_For_PSMs_Map_Key_ScanNumber.set( ms_2_scanData.scanNumber, ms_2_scanData );
            }


            for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

                let foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = false;

                {
                    const featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array =  //  All Mapping entries for Singular Id
                        featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.
                        get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeature_Entry.id)

                    if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                        for ( const featureDetection_MappingOf_PersistentToSingularFeature_Entry of featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                            if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry ) {

                                const featureDetection_PersistentFeature_Entry =
                                    featureDetection_PersistentFeature_Entries_Holder.
                                    get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry(featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id)

                                if ( ! featureDetection_PersistentFeature_Entry) {
                                    const msg = "featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id ); returned nothing for featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id: " + featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                if ( featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                                    const ms_1_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );

                                    if ( ! ms_1_scanData) {
                                        const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingleFeature_Entry.ms_1_scan_number ); returned nothing for featureDetection_SingleFeature_Entry.ms_1_scan_number: " + featureDetection_SingularFeature_Entry.ms_1_scan_number;
                                        console.warn(msg);
                                        throw Error(msg);
                                    }

                                    for ( const ms_2_scan_number_FromFeatureDetection of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                                        const ms_2_scanData_For_PSM = ms_2_scanData_For_PSMs_Map_Key_ScanNumber.get( ms_2_scan_number_FromFeatureDetection );

                                        if ( ms_2_scanData_For_PSM ) {
                                            //  Scan for PSM from filter found.

                                            foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = true;
                                            break;
                                        }
                                    }
                                }
                            }

                            if ( foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry ) {

                                break;
                            }
                        }
                    }
                }

                if ( foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry ) {

                    let index: number

                    if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                        let feature_intensity = featureDetection_SingularFeature_Entry.intensity;
                        if ( feature_intensity <  1 ) {
                            //  set min to 1 since less than 1
                            feature_intensity = 1;
                        }
                        const feature_intensity_Log10 = Math.log10( feature_intensity );

                        index = Math.floor( ( feature_intensity_Log10 - min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10 ) / binSize_Feature_Intensity_ALL_FeatureDetection_Entries );

                    } else {
                        index = Math.floor( ( featureDetection_SingularFeature_Entry.intensity - min_Value_Feature_Intensity_ALL_FeatureDetection_Entries ) / binSize_Feature_Intensity_ALL_FeatureDetection_Entries );
                    }

                    if ( count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries[ index ] ) {
                        count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries[ index ]++;
                    } else {
                        count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries[ index ] = 1;
                    }
                }
            }

            const chart_X: Array<number> = []
            const chart_Y: Array<number> = []
            const chart_Bars_Tooltips: Array<string> = [];

            let minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries;

            if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10;
            }

            for ( let index = 0; index < _CHART_BIN_COUNT; index++ ) {

                const binCenter =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) +
                    ( 0.5 * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );  // * 0.5 for center

                let count = count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries[ index ];
                if ( ! count ) {
                    count = 0;
                }

                const binStart =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );

                const binEnd =
                    minValue +
                    ( ( index + 1 ) * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) //  add 1 for bin end

                let label_Log10_Start = "";
                let label_Log10_End = "";

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                    label_Log10_Start = "Log10(";
                    label_Log10_End = ")";
                }

                const label = "Feature Count: " +  count.toLocaleString() +
                    "<br>Total Ion Current between " +
                    label_Log10_Start +
                    binStart.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End +
                    " and " +
                    label_Log10_Start +
                    binEnd.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End;

                chart_X.push( binCenter );
                chart_Y.push( count );
                chart_Bars_Tooltips.push( label );
            }

            //  Add to Chart Data

            // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

            chart_Data.push({

                name: "Features w/ PSMs",

                type: 'bar',
                x: chart_X,
                y: chart_Y,

                hoverinfo: "text", //  Hover contents
                hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                // '<br><b>Scans</b>: %{y}' +
                // '<br><b>Retention Time</b>: %{x}<extra></extra>',
                marker: {
                    color: "#1F77B4", // changed from "blue", // blue match sample chart
                    // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
            });
        }


        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            && this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result ) {

            //  Plotly Trace "Fraction IDed"

            ///  Create Identification Rate

            const chart_X: Array<number> = []
            const chart_Y: Array<number> = []
            const chart_Bars_Tooltips: Array<string> = [];

            for ( let index = 0; index < _CHART_BIN_COUNT; index++ ) {

                let minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries;

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                    minValue = min_Value_Feature_Intensity_ALL_FeatureDetection_Entries__Log10;
                }

                const binCenter =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) +
                    ( 0.5 * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );  // * 0.5 for center

                let count_All = count_Per_Binned_FeatureDetection_Intensity__ALL_FeatureDetection_Entries[ index ];
                if ( ! count_All ) {
                    count_All = 0;
                }
                let count_FilteredOn_PSM = count_Per_Binned_FeatureDetection_Intensity__FilteredOn_PSM_FeatureDetection_Entries[ index ];
                if ( ! count_FilteredOn_PSM ) {
                    count_FilteredOn_PSM = 0;
                }

                let fraction = 0;
                if ( count_All !== 0 ) { // check since cannot divide by zero
                    fraction = count_FilteredOn_PSM / count_All;
                }

                const binStart =
                    minValue +
                    ( index * binSize_Feature_Intensity_ALL_FeatureDetection_Entries );

                const binEnd =
                    minValue +
                    ( ( index + 1 ) * binSize_Feature_Intensity_ALL_FeatureDetection_Entries ) //  add 1 for bin end

                let label_Log10_Start = "";
                let label_Log10_End = "";

                if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
                    label_Log10_Start = "Log10(";
                    label_Log10_End = ")";
                }

                const label = "Fraction IDed: " +
                    fraction.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    "<br>Total Ion Current between " +
                    label_Log10_Start +
                    binStart.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End +
                    " and " +
                    label_Log10_Start +
                    binEnd.toExponential( _NUMBER_SIGNIFICANT_DIGITS_EXPONENTIAL_DISPLAY ) +
                    label_Log10_End;

                chart_X.push( binCenter );
                chart_Y.push( fraction );
                chart_Bars_Tooltips.push( label );
            }

            //  Add to Chart Data

            // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

            chart_Data.push({

                name: "Fraction IDed",

                type: 'scatter',
                mode: 'lines',
                x: chart_X,
                y: chart_Y,
                yaxis: 'y2',
                hoverinfo: "text", //  Hover contents
                hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                // '<br><b>Scans</b>: %{y}' +
                // '<br><b>Retention Time</b>: %{x}<extra></extra>',
                marker: {
                    color: "#FF0000", // changed from "purple", // purple match sample chart
                    // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                }
            });
        }

        //  Create Chart

        let chart_X_Axis_Label = "Total Ion Current";

        if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
            chart_X_Axis_Label = "Log10(" + chart_X_Axis_Label + ")"
        }

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label,
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
            chart_Y_Axis_Label: "Number of Features",
            showlegend: true
        });

        // chart_Layout.barmode = 'stack'; //  Stack the bar charts

        //  "FD For PSM" bars 'overlay' "Feat Detect" bars
        chart_Layout.barmode = "overlay"

        chart_Layout.bargap = 0;

        if ( chart_Layout.yaxis ) {
            chart_Layout.yaxis.showgrid = false;
        } else {
            chart_Layout.yaxis = { showgrid: false }
        }

        chart_Layout.yaxis2 = {
            title: {
                text: 'Identification rate',
                font: undefined,
                position: undefined,
                standoff: undefined
            },
            //     titlefont: {color: 'rgb(148, 103, 189)'},
            // tickfont: {color: 'rgb(148, 103, 189)'},
            overlaying: 'y',
            side: 'right',
            range: [0, 1],
            rangemode: 'tozero',  //  appears to align the zero line on the Y axis for the 2 Y axes (left and right) but does NOT stay aligned when zoom in, then pan, then zoom out
            showgrid: false
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

            let qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot

            if ( this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override ) {

                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override
            } else {

                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
            }

            qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
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


            let qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot

            if ( this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override ) {

                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override
            } else {

                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
            }

            qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
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

                let qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot

                if ( this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override ) {

                    qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.dataToPlot.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override
                } else {

                    qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
                }

                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
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
            open_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent_OverlayContainer({
                params: {
                    dataToPlot: this.props.dataToPlot,
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

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const style : React.CSSProperties = {
            position: "relative",
            height: qcPage_StandardChartLayout_StandardHeight()
        };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }

        if ( this.state.show_NoData_Message ) {

            //  EARLY RETURN

            return (
                <QcPage_ChartFiller_NoData chartTitle={ chartTitle } />
            )
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
