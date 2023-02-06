/**
 * qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer.tsx
 *
 * QC Page Single Search : Feature Detection: Total Ion Current Y Axis VS Retention Time X Axis Statistics - Main Page Container
 *
 */

// import React from "react";
// import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
// import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
// import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
// import {
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot,
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType,
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
// import {
//     QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType__DEFAULT,
//     QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer";
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
//
// /**
//  *
//  */
// export interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer_Props {
//
//     featureDetection_Root_Entry_Selection: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
//
//     qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
//     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
// }
//
// /**
//  *
//  */
// interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer_State {
//
//     force_Rerender?: {}
// }
//
// /**
//  *
//  */
// export class QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_MainPageContainer extends React.Component< QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer_Props, QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer_State > {
//
//     //  bind to 'this' for passing as parameters
//     private __qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function_BindThis =
//         this.__qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function.bind(this);
//
//     private _DONOTCALL() {
//
//         //  Validate local functions meet function type
//
//         const _qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function: QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType =
//             this.__qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function
//     }
//
//     private _renderChart = true;
//
//     private _show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection: number = null
//
//     /**
//      *
//      */
//     constructor(props: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer_Props) {
//         super(props);
//
//         if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
//             const msg = "ONLY valid for 1 search";
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ||
//             props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) ) {
//
//             // No Data for chart so NOT render it
//
//             this._renderChart = false;
//         }
//
//         this.state = {
//             force_Rerender: {}
//         };
//     }
//
//     /**
//      *  Called from main chart code when scan not have Total Ion Current
//      */
//     private __qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function(
//         params: QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params
//     ) : void {
//
//         this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = this.props.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id
//         this.setState({ force_Rerender: {} } )
//     }
//
//     /**
//      *
//      */
//     render() {
//         try {
//             if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection &&
//                 ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection !== this.props.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
//                 this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = null;  // reset to null since not currently selected id
//             }
//
//             if ( ! this._renderChart ) {
//                 //  Skip render Chart
//                 return null; // EARLY RETURN
//             }
//
//             let noData_Element: JSX.Element = null;
//
//             if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection ) {
//
//                 const displayMessages_Replace_NoData_Message: Array<string> = [ "Data for scan file does not have required Total Ion Current" ];
//
//                 noData_Element = (
//
//                     <QcPage_ChartFiller_NoData
//                         chartTitle={ QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot.chartTitle }
//                         displayMessages_Replace_NoData_Message={ displayMessages_Replace_NoData_Message }
//                     />
//                 )
//             }
//
//             return (
//                 <div >
//                     {/*<div >*/}
//                     {/*    <h2>*/}
//                     {/*        XXX*/}
//                     {/*    </h2>*/}
//                     {/*</div>*/}
//
//                     {( noData_Element ) ? (
//
//                         <QcPage_ChartBorder >
//                             {noData_Element}
//                         </QcPage_ChartBorder >
//
//                     ) : (
//                         <QcPage_ChartBorder >
//
//                             <QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot
//                                 qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
//                                 qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
//                                 featureDetection_Root_Entry_Selection={ this.props.featureDetection_Root_Entry_Selection }
//                                 plot_Type={ QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType__DEFAULT }
//                                 transform_Score={ QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT }
//                                 qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function={ this.__qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function_BindThis }
//                                 isInSingleChartOverlay={ false }
//                             />
//                         </QcPage_ChartBorder>
//                     )}
//                 </div>
//             );
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//
// }
