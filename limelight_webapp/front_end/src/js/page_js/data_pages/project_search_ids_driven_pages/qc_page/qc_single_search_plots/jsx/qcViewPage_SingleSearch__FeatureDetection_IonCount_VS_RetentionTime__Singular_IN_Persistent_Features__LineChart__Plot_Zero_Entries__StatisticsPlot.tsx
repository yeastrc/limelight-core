/**
 * qcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot.tsx
 *
 * QC Page Single Search : Feature Detection: Ion Count Y Axis VS Retention Time X Axis Statistics  --  Singular Features IN Persistent Features for Green Line "Detected Features"
 *
 */


// import React from "react";
//
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {
//     qcPage_StandardChartLayout, qcPage_StandardChartLayout_StandardHeight
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
// import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
// import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
// import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
// import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
// import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
// import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
// import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
// import {
//     QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
//     QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
// import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
// import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
// import {
//     open_FeatureDetection_IonCount_VS_RetentionTime_OverlayContainer,
//     QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType,
//     QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer";
// import {
//     CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder,
//     CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries";
// import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
//
//
//
// const chartTitle = "Ions vs/ Retention Time (Persistent)";
//
// /**
//  *
//  */
// export class QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params {
//
//     scans_NotContain_TotalIonCurrent: boolean
//     scans_NotContain_IonInjectionTime: boolean
// }
//
// /**
//  *
//  */
// export type QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType =
//     ( params: QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params ) => void
//
// /**
//  *
//  */
// export interface QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_Props {
//
//     //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change
//
//     qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
//     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//
//     featureDetection_Root_Entry_Selection: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
//
//     plot_Type: QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType
//     transform_Score: QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice
//
//     qcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function: QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType
//
//     isInSingleChartOverlay: boolean
// }
//
// /**
//  *
//  */
// interface QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_State {
//
//     //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change
//
//     showCreatingMessage?: boolean
//     showUpdatingMessage?: boolean
//     show_NoData_Message?: boolean
// }
//
// /**
//  *
//  */
// export class QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot extends React.Component< QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_Props, QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_State > {
//
//     static chartTitle = chartTitle;
//
//     //  bind to 'this' for passing as parameters
//
//     private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
//
//     private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);
//
//     private plot_Ref :  React.RefObject<HTMLDivElement>
//     private image_Ref : React.RefObject<HTMLImageElement>
//
//     private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
//     private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
//
//     private _renderChart: boolean = true;
//
//     private _componentMounted = false;
//
//     /**
//      *
//      */
//     constructor(props: QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_Props) {
//         super(props);
//
//         if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
//             const msg = "ONLY valid for 1 search";
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {
//
//             // No Data for chart so NOT render it
//
//             const msg = "No Data for Chart";
//             console.warn(msg);
//             throw Error(msg)
//
//             this._renderChart = false;
//
//         } else {
//
//             const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId
//             if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
//
//             } else {
//                 const msg = "Not true. qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
//                 console.warn(msg);
//                 throw Error(msg)
//             }
//         }
//
//         this.plot_Ref = React.createRef();
//         this.image_Ref = React.createRef();
//
//         this.state = {
//             showCreatingMessage: true,
//             showUpdatingMessage: false,
//             show_NoData_Message: false
//         };
//     }
//
//     /**
//      *
//      */
//     componentWillUnmount() {
//
//         try {
//             if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
//                 this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
//             }
//         } catch (e) {
//             //  Eat Exception
//         }
//         try {
//             if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
//                 this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
//             }
//         } catch (e) {
//             //  Eat Exception
//         }
//
//         try {
//             this._resizeWindow_Handler_Remove();
//         } catch (e) {
//             //  Eat Exception
//         }
//
//         try {
//             if ( this._renderChart ) {
//                 this._removeChart();
//             }
//         } catch (e) {
//             //  Eat Exception
//         }
//
//         this._componentMounted = false;
//     }
//
//     /**
//      *
//      */
//     componentDidMount() {
//         try {
//             this._componentMounted = true;
//
//             if ( this._renderChart ) {
//
//                 window.setTimeout(() => {
//                     try {
//                         this._populateChart();
//
//                         if ( this.props.isInSingleChartOverlay ) {
//                             this._resizeWindow_Handler_Attach();
//                         }
//
//                     } catch (e) {
//                         console.warn("Exception caught in componentDidMount inside setTimeout");
//                         console.warn(e);
//                         reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
//                         throw e;
//                     }
//                 }, 10);
//             }
//         } catch( e ) {
//             console.warn("Exception caught in componentDidMount");
//             console.warn( e );
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//     /**
//      *
//      */
//     shouldComponentUpdate(nextProps: Readonly<QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_Props>, nextState: Readonly<QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_State>, nextContext: any): boolean {
//
//         if (
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//             || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//             || this.props.featureDetection_Root_Entry_Selection !== nextProps.featureDetection_Root_Entry_Selection
//             || this.props.plot_Type !== nextProps.plot_Type
//             || this.props.transform_Score !== nextProps.transform_Score
//             || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
//             || this.state.showCreatingMessage !== nextState.showCreatingMessage
//             || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
//             || this.state.show_NoData_Message !== nextState.show_NoData_Message
//         ) {
//             return true;
//         }
//
//         return false;
//     }
//
//     /**
//      *
//      */
//     componentDidUpdate(prevProps: Readonly<QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_Props>, prevState: Readonly<QcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_State>, snapshot?: any) {
//         try {
//             if ( this._renderChart ) {
//
//                 if (
//                     this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//                     || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//                     || this.props.featureDetection_Root_Entry_Selection !== prevProps.featureDetection_Root_Entry_Selection
//                     || this.props.plot_Type !== prevProps.plot_Type
//                     || this.props.transform_Score !== prevProps.transform_Score
//                     || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
//                     // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
//                     // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  // Always remove state property checks in 'componentDidUpdate'
//                     // || this.state.show_NoData_Message !== nextState.show_NoData_Message
//                 ) {
//                 } else {
//                     //  Nothing changed so return
//
//                     return;  // EARLY RETURN
//                 }
//
//                 try {
//                     if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
//                         this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
//                     }
//                 } catch (e) {
//                     //  Eat Exception
//                 }
//                 try {
//                     if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
//                         this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
//                     }
//                 } catch (e) {
//                     //  Eat Exception
//                 }
//
//                 this.setState({ showUpdatingMessage: true });
//
//                 window.setTimeout(() => {
//                     try {
//                         this._populateChart();
//
//                     } catch (e) {
//                         console.warn("Exception caught in componentDidMount inside setTimeout");
//                         console.warn(e);
//                         reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
//                         throw e;
//                     }
//                 }, 10);
//             }
//         } catch( e ) {
//             console.warn("Exception caught in componentDidMount");
//             console.warn( e );
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//
//     }
//
//     /**
//      *
//      */
//     private _resizeWindow_Handler_Attach() : void {
//
//         //  Attach resize handler
//         window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
//     }
//
//     /**
//      *
//      */
//     private _resizeWindow_Handler_Remove() : void {
//
//         //  Remove resize handler
//         window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
//     }
//
//     /**
//      * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
//      */
//     private _resizeWindow_Handler() : void {
//         try {
//             this._populateChart()
//
//         } catch( e ) {
//             console.log("Exception caught in _resizeWindow_Handler()");
//             console.log( e );
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//     /**
//      *
//      */
//     private _populateChart() {
//
//         if ( ! this._componentMounted ) {
//             //  Component no longer mounted so exit
//             return; // EARLY RETURN
//         }
//
//         const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
//
//         const feature_detection_root__project_scnfl_mapping_tbl__id = this.props.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id;
//
//         const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//             commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
//             get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
//
//         if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
//             throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
//         }
//
//         let qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
//         let featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder
//         let featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder
//         let featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder
//
//         const promises: Array<Promise<void>> = [] // Always has at least 1 entry from first promise
//
//         {
//             const promise = new Promise<void>((resolve, reject) => { try {
//                 const promise_FromFunction =
//                     this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
//                     qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileStatistics_RetentionTime_Statistics_Data();   //  Call This to get MS1 data from Spectral Storage, retention time and total ion current
//                 promise_FromFunction.catch(reason => { reject(reason) })
//                 promise_FromFunction.then(value => { try {
//                     qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch = value;
//                     resolve();
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//             } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//             promises.push(promise);
//         }
//         {
//             const get_FeatureDetection_SingleFeature_EntriesHolder_Result =
//                 commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
//                 get_commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries().
//                 get_FeatureDetection_SingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });
//
//             if ( get_FeatureDetection_SingleFeature_EntriesHolder_Result.data ) {
//                 featureDetection_SingularFeature_Entries_Holder = get_FeatureDetection_SingleFeature_EntriesHolder_Result.data.featureDetection_SingularFeature_Entries_Holder;
//             } else if ( get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise ) {
//                 const promise = new Promise<void>((resolve, reject) => { try {
//                     get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
//                     get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise.then(value => { try {
//                         featureDetection_SingularFeature_Entries_Holder = value.featureDetection_SingularFeature_Entries_Holder;
//                         resolve();
//                     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 promises.push(promise);
//             } else {
//                 throw Error("get_FeatureDetection_SingleFeature_EntriesHolder_Result no data or promise")
//             }
//         }
//
//         {
//             const get_FeatureDetection_PersistentFeature_EntriesHolder_Result =
//                 commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
//                 get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries().
//                 get_FeatureDetection_PersistentFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });
//
//             if ( get_FeatureDetection_PersistentFeature_EntriesHolder_Result.data ) {
//                 featureDetection_PersistentFeature_Entries_Holder = get_FeatureDetection_PersistentFeature_EntriesHolder_Result.data.featureDetection_PersistentFeature_Entries_Holder;
//             } else if ( get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise ) {
//                 const promise = new Promise<void>((resolve, reject) => { try {
//                     get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
//                     get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise.then(value => { try {
//                         featureDetection_PersistentFeature_Entries_Holder = value.featureDetection_PersistentFeature_Entries_Holder;
//                         resolve();
//                     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 promises.push(promise);
//             } else {
//                 throw Error("get_FeatureDetection_PersistentFeature_EntriesHolder_Result no data or promise")
//             }
//         }
//         {
//             const get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result =
//                 commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
//                 get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries().
//                 get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });
//
//             if ( get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.data ) {
//                 featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.data.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder;
//             } else if ( get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise ) {
//                 const promise = new Promise<void>((resolve, reject) => { try {
//                     get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
//                     get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise.then(value => { try {
//                         featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = value.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder;
//                         resolve();
//                     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 promises.push(promise);
//             } else {
//                 throw Error("get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result no data or promise")
//             }
//         }
//
//         const promisesAll = Promise.all( promises );
//
//         promisesAll.catch( reason => {
//             try {
//                 if ( ! this._componentMounted ) {
//                     //  Component no longer mounted so exit
//                     return; // EARLY RETURN
//                 }
//
//                 this.setState({ showUpdatingMessage: false });
//
//                 console.warn( "promise.catch(...): reason: ", reason );
//
//             } catch( e ) {
//                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                 throw e;
//             }
//         });
//
//         promisesAll.then( noValue => { try {
//             if ( ! this._componentMounted ) {
//                 //  Component no longer mounted so exit
//                 return; // EARLY RETURN
//             }
//
//             if ( feature_detection_root__project_scnfl_mapping_tbl__id !== this.props.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id ) {
//
//                 //  Data retrieved feature_detection_root__project_scnfl_mapping_tbl__id is NO Longer the feature_detection_root__project_scnfl_mapping_tbl__id requested to be displayed
//
//                 return;  // EARLY RETURN
//             }
//
//             this._populateChart__Actual({
//                 qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch,
//                 featureDetection_SingularFeature_Entries_Holder,
//                 featureDetection_PersistentFeature_Entries_Holder,
//                 featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
//             });
//
//         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//     }
//
//     /**
//      *
//      */
//     private _populateChart__Actual(
//         {
//             qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch,
//             featureDetection_SingularFeature_Entries_Holder,
//             featureDetection_PersistentFeature_Entries_Holder,
//             featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
//         } : {
//             qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
//             featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder
//             featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder
//             featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder
//         }
//     ) {
//         const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;
//         const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data;
//
//
//         {  //  First confirm all scans have total ion current
//
//             const spectralStorage_NO_Peaks_DataFor_ProjectScanFileId =
//                 spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_ProjectScanFileId( this.props.featureDetection_Root_Entry_Selection.project_scan_file_id )
//
//             if ( ! spectralStorage_NO_Peaks_DataFor_ProjectScanFileId ) {
//                 const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_ProjectScanFileId(...) returned NOTHING for this.props.featureDetection_Root_Entry_Selection.project_scan_file_id: " + this.props.featureDetection_Root_Entry_Selection.project_scan_file_id;
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//
//             for (const dataForSingleScanNumberEntry of spectralStorage_NO_Peaks_DataFor_ProjectScanFileId.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator()) {
//
//                 let scans_NotContain_TotalIonCurrent = false;
//                 let scans_NotContain_IonInjectionTime = false;
//
//                 if ( dataForSingleScanNumberEntry.totalIonCurrent_ForScan === undefined || dataForSingleScanNumberEntry.totalIonCurrent_ForScan === null ) {
//
//                     console.warn( "No totalIonCurrent_ForScan for scanNumber: " + dataForSingleScanNumberEntry.scanNumber +
//                         ", project_scan_file_id: " + this.props.featureDetection_Root_Entry_Selection.project_scan_file_id );
//
//                     scans_NotContain_TotalIonCurrent = true;
//                 }
//                 if ( dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === undefined || dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === null ) {
//
//                     console.warn( "No ionInjectionTime_InMilliseconds for scanNumber: " + dataForSingleScanNumberEntry.scanNumber +
//                         ", project_scan_file_id: " + this.props.featureDetection_Root_Entry_Selection.project_scan_file_id );
//
//                     scans_NotContain_IonInjectionTime = true;
//                 }
//
//                 if ( scans_NotContain_TotalIonCurrent || scans_NotContain_IonInjectionTime ) {
//
//                     this.props.qcViewPage_FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function({ scans_NotContain_TotalIonCurrent, scans_NotContain_IonInjectionTime });
//
//                     //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//                     return; // EARLY RETURN
//                 }
//             }
//         }
//
//         const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
//
//         let chart_Mode = 'lines';
//
//         if ( this.props.plot_Type === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.SCATTER ) {
//
//             chart_Mode = 'markers';
//         }
//
//         //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"
//
//         const peptideDistinct_Array =
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//                 proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;
//
//         ////////////
//
//         //  Only Put Chart in DOM in Overlay so Only remove existing chart in Overlay.
//
//         //  Have existing chart in overlay when re-populate chart when have window resize
//
//         if ( this.props.isInSingleChartOverlay ) {
//             try {
//                 //  First remove any existing plot, if it exists
//                 this._removeChart();
//             } catch (e) {
//                 //  Eat Exception
//             }
//         }
//
//         const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
//             qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
//                 projectSearchId, peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
//             });
//
//         const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;
//
//         // const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
//
//         const scans_For_Selected_searchScanFileId_Map_Key_ScanNumber : Map<number,  QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> = new Map();
//
//         {  // Populate scans_For_Selected_searchScanFileId_Map_Key_ScanNumber
//
//             for ( const spectralStorage_NO_Peaks_DataEntry of spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator() ) {
//
//                 if (spectralStorage_NO_Peaks_DataEntry.projectScanFileId !== this.props.featureDetection_Root_Entry_Selection.project_scan_file_id) {
//                     //  Data NOT for this scan file so skip
//
//                     continue; // EARLY CONTINUE
//                 }
//
//                 for (const dataForSingleScanNumberEntry of spectralStorage_NO_Peaks_DataEntry.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator()) {
//                     scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.set(dataForSingleScanNumberEntry.scanNumber, dataForSingleScanNumberEntry)
//                 }
//             }
//         }
//
//         //  Colors for Bars.  3 categories to match colors from Summary Count
//         const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 2 });
//
//         ////  Create chart_Data
//
//         const chart_Data: Array<any> = [];
//
//         //  Collected MS 1 Scans from Spectral Storage
//         const ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> = []
//
//         {
//             for ( const spectralStorage_NO_Peaks_DataEntry of spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator() ) {
//
//                 if (spectralStorage_NO_Peaks_DataEntry.projectScanFileId !== this.props.featureDetection_Root_Entry_Selection.project_scan_file_id) {
//                     //  Data NOT for this scan file so skip
//
//                     continue; // EARLY CONTINUE
//                 }
//
//                 for ( const dataForSingleScanNumberEntry of spectralStorage_NO_Peaks_DataEntry.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {
//
//                     if ( dataForSingleScanNumberEntry.level === 1 ) {
//                         //  Level is === 1
//                         ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId.push( dataForSingleScanNumberEntry );
//                     }
//                 }
//             }
//
//             //  sort on retention time
//
//             ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId.sort( (a,b) => {
//                 if ( a.retentionTime_InSeconds < b.retentionTime_InSeconds ) {
//                     return -1;
//                 }
//                 if ( a.retentionTime_InSeconds > b.retentionTime_InSeconds ) {
//                     return 1;
//                 }
//                 return 0;
//             })
//         }
//
//         {
//             ///  Create MS 1 Ion Count, all MS 1 from Spectral Storage for scan file
//
//             const chart_X: Array<number> = []
//             const chart_Y: Array<number> = []
//
//             for ( const dataForSingleScanNumberEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 const retentionTime_Minutes = dataForSingleScanNumberEntry.retentionTime_InSeconds / 60;
//
//                 // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                 let ionsPerSecond = dataForSingleScanNumberEntry.totalIonCurrent_ForScan * dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds / 1000
//
//                 if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//                     if ( ionsPerSecond < 1 ) {
//                         ionsPerSecond = 0;
//                     } else {
//                         ionsPerSecond = Math.log10( ionsPerSecond );
//                     }
//                 }
//
//                 chart_X.push( retentionTime_Minutes );
//                 chart_Y.push( ionsPerSecond );
//             }
//
//             //  Add to Chart Data
//
//             // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);
//
//             chart_Data.push({
//
//                 name: "All MS1 Peaks",
//
//                 type: 'scatter',
//                 mode: chart_Mode,
//                 x: chart_X,
//                 y: chart_Y,
//
//                 // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
//                 // '<br><b>Scans</b>: %{y}' +
//                 // '<br><b>Retention Time</b>: %{x}<extra></extra>',
//                 marker: {
//                     color: "black", // black match sample chart
//                     // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
//                 }
//             });
//         }
//
//         {
//             ///  Create Feature Detection Total Ion Current, all Feature Detection Entries
//
//             const featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry>> = new Map()
//
//             for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {
//
//                 const featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array =  //  All Mapping entries for Singular Id
//                     featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.
//                     get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeature_Entry.id)
//
//                 if ( ! featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {
//
//                     //  NO Persistent Features Mapped to this Singular Feature so SKIP
//
//                     continue;  // EARLY CONTINUE
//                 }
//
//                 let featureDetection_SingleFeature_Array_Entry = featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );
//                 if ( ! featureDetection_SingleFeature_Array_Entry ) {
//                     featureDetection_SingleFeature_Array_Entry = [];
//                     featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.set(featureDetection_SingularFeature_Entry.ms_1_scan_number, featureDetection_SingleFeature_Array_Entry);
//                 }
//                 featureDetection_SingleFeature_Array_Entry.push( featureDetection_SingularFeature_Entry );
//             }
//
//             const chart_X: Array<number> = []
//             const chart_Y: Array<number> = []
//
//             for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 const retentionTime_Minutes = ms_1_ScanEntry.retentionTime_InSeconds / 60;
//
//                 const featureDetection_SingleFeature_Array_Entry = featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
//                 if ( ! featureDetection_SingleFeature_Array_Entry ) {
//                     //  No Feature Detection entries for MS 1 Scan Number
//
//                     const featureDetection_SingleFeature_Entry__intensity = 0; // Default to zero
//
//                     let ionsPerSecond = featureDetection_SingleFeature_Entry__intensity;
//
//                     if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//                         if ( ionsPerSecond < 1 ) {
//                             ionsPerSecond = 0;
//                         } else {
//                             ionsPerSecond = Math.log10( ionsPerSecond );
//                         }
//                     }
//
//                     chart_X.push( retentionTime_Minutes );
//                     chart_Y.push( ionsPerSecond );
//
//                 } else {
//                     //  Yes Feature Detection entries for MS 1 Scan Number
//
//                     let ionsPerSecondSummed = 0;
//
//                     for ( const featureDetection_SingleFeature_Entry of featureDetection_SingleFeature_Array_Entry ) {
//
//                         const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity
//
//                         // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                         const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000
//
//                         ionsPerSecondSummed += ionsPerSecond;
//                     }
//
//                     if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//                         if ( ionsPerSecondSummed < 1 ) {
//                             ionsPerSecondSummed = 0;
//                         } else {
//                             ionsPerSecondSummed = Math.log10( ionsPerSecondSummed );
//                         }
//                     }
//
//                     chart_X.push( retentionTime_Minutes );
//                     chart_Y.push( ionsPerSecondSummed );
//                 }
//
//             }
//
//             //  Add to Chart Data
//
//             // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);
//
//             chart_Data.push({
//
//                 name: "Detected Features",
//
//                 type: 'scatter',
//                 mode: chart_Mode,
//                 x: chart_X,
//                 y: chart_Y,
//
//                 // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
//                 // '<br><b>Scans</b>: %{y}' +
//                 // '<br><b>Retention Time</b>: %{x}<extra></extra>',
//                 marker: {
//                     color: "green", // green match sample chart
//                     // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
//                 }
//             });
//         }
//
//         {
//             ///  Create Feature Detection Total Ion Current,  Feature Detection Entries Filtered on PSMs using MS 2 in Feature Detection entry
//
//             const ms_2_scanData_For_PSMs_Map_Key_ScanNumber: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> = new Map();
//
//             for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {
//
//                 let ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber );
//
//                 if ( ! ms_2_scanData) {
//                     const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber ); returned nothing for psmTblData_Filtered_Entry.scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 while ( ms_2_scanData.level > 2 ) {
//                     //  Not MS 2 level scan data so get parent scan
//                     if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
//                         const msg = "In ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//
//                     const parentScanNumber = ms_2_scanData.parentScanNumber
//
//                     ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber );
//                     if ( ! ms_2_scanData) {
//                         const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber ); returned nothing for parentScanNumber: " + parentScanNumber;
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                 }
//
//                 if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
//                     const msg = "After ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 ms_2_scanData_For_PSMs_Map_Key_ScanNumber.set( ms_2_scanData.scanNumber, ms_2_scanData );
//             }
//
//             const featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber: Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry>> = new Map()
//
//             for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {
//
//                 const featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array =  //  All Mapping entries for Singular Id
//                     featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.
//                     get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeature_Entry.id)
//
//                 if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {
//
//                     for ( const featureDetection_MappingOf_PersistentToSingularFeature_Entry of featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {
//
//                         const featureDetection_PersistentFeature_Entry =
//                             featureDetection_PersistentFeature_Entries_Holder.
//                             get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry(featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id)
//
//                         if ( ! featureDetection_PersistentFeature_Entry) {
//                             const msg = "featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id ); returned nothing for featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id: " + featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id;
//                             console.warn(msg);
//                             throw Error(msg);
//                         }
//
//                         if ( featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {
//
//                             const ms_1_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );
//
//                             if ( ! ms_1_scanData) {
//                                 const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingleFeature_Entry.ms_1_scan_number ); returned nothing for featureDetection_SingleFeature_Entry.ms_1_scan_number: " + featureDetection_SingularFeature_Entry.ms_1_scan_number;
//                                 console.warn(msg);
//                                 throw Error(msg);
//                             }
//
//                             let foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = false;
//
//                             for ( const ms_2_scan_number_FromFeatureDetection of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {
//
//                                 const ms_2_scanData_For_PSM = ms_2_scanData_For_PSMs_Map_Key_ScanNumber.get( ms_2_scan_number_FromFeatureDetection );
//
//                                 if ( ms_2_scanData_For_PSM ) {
//                                     //  Scan for PSM from filter found.
//
//                                     foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = true;
//                                     break;
//
//                                 }
//                             }
//                             if ( foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry ) {
//
//                                 //  Save featureDetection_SingleFeature_Entry
//                                 let featureDetection_SingularFeature_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );
//                                 if ( ! featureDetection_SingularFeature_Map_Key_SingularFeatureId ) {
//                                     featureDetection_SingularFeature_Map_Key_SingularFeatureId = new Map();
//                                     featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.set(featureDetection_SingularFeature_Entry.ms_1_scan_number, featureDetection_SingularFeature_Map_Key_SingularFeatureId);
//                                 }
//
//                                 featureDetection_SingularFeature_Map_Key_SingularFeatureId.set( featureDetection_SingularFeature_Entry.id, featureDetection_SingularFeature_Entry);
//                             }
//                         }
//                     }
//                 }
//             }
//
//             const chart_X: Array<number> = []
//             const chart_Y: Array<number> = []
//
//             let featureDetection_SingleFeature_Entry__intensity_Max = undefined;
//
//             let retentionTime_Minutes_AT_featureDetection_SingleFeature_Entry__intensity_Max = undefined;
//
//             for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 const retentionTime_Minutes = ms_1_ScanEntry.retentionTime_InSeconds / 60;
//
//                 const featureDetection_SingularFeature_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
//                 if ( ! featureDetection_SingularFeature_Map_Key_SingularFeatureId ) {
//                     //  No Feature Detection entries for MS 1 Scan Number
//
//                     const featureDetection_SingleFeature_Entry__intensity = 0; // Default to zero
//
//                     let totalIonCurrent = featureDetection_SingleFeature_Entry__intensity;
//
//                     if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//                         if ( totalIonCurrent < 1 ) {
//                             totalIonCurrent = 0;
//                         } else {
//                             totalIonCurrent = Math.log10( totalIonCurrent );
//                         }
//                     }
//
//                     chart_X.push( retentionTime_Minutes );
//                     chart_Y.push( totalIonCurrent );
//
//                 } else {
//                     //  Yes Feature Detection entries for MS 1 Scan Number
//
//                     let ionsPerSecondSummed = 0;
//
//                     for ( const featureDetection_SingleFeature_Entry of featureDetection_SingularFeature_Map_Key_SingularFeatureId.values() ) {
//
//                         const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity
//
//                         // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                         const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000
//
//                         ionsPerSecondSummed += ionsPerSecond;
//                     }
//
//                     if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//                         if ( ionsPerSecondSummed < 1 ) {
//                             ionsPerSecondSummed = 0;
//                         } else {
//                             ionsPerSecondSummed = Math.log10( ionsPerSecondSummed );
//                         }
//                     }
//
//                     chart_X.push( retentionTime_Minutes );
//                     chart_Y.push( ionsPerSecondSummed );
//
//                     //  Debugging Code:  Get Max Intensity and the Retention Time at Max Intensity
//
//                     if ( featureDetection_SingleFeature_Entry__intensity_Max === undefined ) {
//                         featureDetection_SingleFeature_Entry__intensity_Max = ionsPerSecondSummed;
//                         retentionTime_Minutes_AT_featureDetection_SingleFeature_Entry__intensity_Max = retentionTime_Minutes;
//                     } else {
//                         if ( featureDetection_SingleFeature_Entry__intensity_Max < ionsPerSecondSummed ) {
//                             featureDetection_SingleFeature_Entry__intensity_Max = ionsPerSecondSummed;
//                             retentionTime_Minutes_AT_featureDetection_SingleFeature_Entry__intensity_Max = retentionTime_Minutes;
//                         }
//                     }
//                 }
//
//             }
//
//             //  Add to Chart Data
//
//             // const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);
//
//             chart_Data.push({
//
//                 name: "Features w/ PSMs",
//
//                 type: 'scatter',
//                 mode: chart_Mode,
//                 x: chart_X,
//                 y: chart_Y,
//
//                 // hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
//                 // '<br><b>Scans</b>: %{y}' +
//                 // '<br><b>Retention Time</b>: %{x}<extra></extra>',
//                 marker: {
//                     color: "purple", // purple match sample chart
//                     // color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
//                 }
//             });
//         }
//
//         //  Create Chart
//
//         let chart_Y_Axis_Label = "Ions";
//
//         if ( this.props.transform_Score === QcViewPage_SingleSearch__FeatureDetection_IonCount_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {
//
//             chart_Y_Axis_Label = "Log10(" + chart_Y_Axis_Label + ")";
//         }
//
//         const chart_Layout = qcPage_StandardChartLayout({
//             chartTitle,
//             chart_X_Axis_Label: "Retention Time (minutes)",
//             //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram'
//             chart_Y_Axis_Label,
//             showlegend: true,
//             hovermode_OnlyProcessFalseValue_MayBeIgnored: false   //  TURN OFF Tooltips for Scatter Plot GL since get 100% CPU usage when too many points with very similar X or Y
//         });
//
//         if ( chart_Layout.yaxis ) {
//             chart_Layout.yaxis.rangemode = 'tozero';  //  Include zero in the range
//         } else {
//             chart_Layout.yaxis = { rangemode: 'tozero' };  //  Include zero in the range
//         }
//
//         if ( chart_Layout.xaxis ) {
//             chart_Layout.xaxis.rangemode = 'tozero';  //  Include zero in the range
//         } else {
//             chart_Layout.xaxis = { rangemode: 'tozero' };  //  Include zero in the range
//         }
//
//         const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });
//
//         {
//             // const chart_Data_JSON = JSON.stringify( chart_Data );
//             // const chart_Layout_JSON = JSON.stringify( chart_Layout );
//             //
//             // console.log("*********************************")
//             // console.log("Data for Chart with Title: " + chartTitle );
//             // console.log("chart_Data object: ", chart_Data );
//             // console.log("chart_Data_JSON: " + chart_Data_JSON );
//             // console.log("chart_Layout object: ", chart_Layout );
//             // console.log("chart_Layout_JSON: " + chart_Layout_JSON );
//             // console.log("chart_config object: ", chart_config );
//             // console.log("*********************************")
//         }
//
//         if ( ! this.props.isInSingleChartOverlay ) {
//
//             //  Main Page Plot
//
//             this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
//                 plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
//                 chart_Width: chart_Layout.width,
//                 chart_Height: chart_Layout.height,
//                 image_DOM_Element: this.image_Ref.current,
//                 changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
//                 plotRendered_Success_Callback: () : void => {
//                     this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
//                 },
//                 plotRendered_Fail_Callback:  () : void => {
//                     this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
//                 }
//             });
//
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
//             qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG({
//                 qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
//             });
//
//         } else {
//
//             //  Overlay Plot
//
//             this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params({
//                 plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
//                 chart_Width: chart_Layout.width,
//                 chart_Height: chart_Layout.height,
//                 plot_Div_DOM_Element: this.plot_Ref.current,
//                 changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
//                 plotRendered_Success_Callback: () : void => {
//                     this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
//                 },
//                 plotRendered_Fail_Callback:  () : void => {
//                     this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
//                 }
//             });
//
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
//             qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot({
//                 qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
//             });
//         }
//     }
//
//     /**
//      *
//      */
//     private _removeChart() : void {
//         try {
//             if ( this.plot_Ref.current ) {
//                 this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
//                 removeChart_InOverlay_FromDOM({ plot_Div_DOM_Element: this.plot_Ref.current });
//             }
//         } catch (e) {
//             //  Eat Exception
//         }
//     }
//
//     /**
//      *
//      */
//     private _openChartInOverlay() {
//         try {
//             open_FeatureDetection_IonCount_VS_RetentionTime_OverlayContainer({
//                 params: {
//                     featureDetection_Root_Entry_Selection: this.props.featureDetection_Root_Entry_Selection,
//                     qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
//                     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
//                 }
//             });
//
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//     /**
//      *
//      */
//     render() {
//
//         if ( ! this._renderChart ) {
//             //  Skip render Chart
//             return null; // EARLY RETURN
//         }
//
//         const style : React.CSSProperties = {
//             position: "relative",
//             height: qcPage_StandardChartLayout_StandardHeight()
//         };
//
//         if ( this.props.isInSingleChartOverlay ) {
//             style.height = "100%";
//         }
//
//         if ( this.state.show_NoData_Message ) {
//
//             //  EARLY RETURN
//
//             return (
//                 <QcPage_ChartFiller_NoData chartTitle={ chartTitle } />
//             )
//         }
//
//         return (
//
//             <React.Fragment>
//
//                 {( this.props.isInSingleChartOverlay ) ? (
//                     //  For Single Chart Overlay: div the chart will be rendered into
//                     <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></div>
//                 ) : (
//                     //  For Main Page: img the chart will be inserted into
//                     <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></img>
//                 )}
//
//                 {( this.state.showCreatingMessage ) ? (
//
//                     <QcPage_CreatingPlot_BlockCover/>
//
//                 ): ( this.state.showUpdatingMessage ) ? (
//
//                     <QcPage_UpdatingData_BlockCover/>
//
//                 ): ( ! this.props.isInSingleChartOverlay ) ? (
//
//                     //  Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click
//                     <QcPage_ClickPlot_ForInteractivePlot_BlockCover
//                         clickHandler_Callback={ this._openChartInOverlay_BindThis }
//                     />
//
//                 ) : null }
//
//             </React.Fragment>
//         );
//     }
//
//
// }
