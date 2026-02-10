/**
 * qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer.tsx
 *
 * QC Page Single Search : Feature Detection: Total Ion Current Y Axis VS Retention Time X Axis Statistics - Overlay Container
 *
 */

// import React from "react";
//
// import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
// import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
// import {
//     limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
//     Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
// } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
// import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
// import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
// import {
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot,
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType,
//     QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
// import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
// import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
//
//
//
//
// const _Overlay_Title = "QC Plot: Feature Detection Statistics"
//
//
// const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();
//
// const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
// const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;
//
// const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
// const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;
//
// /**
//  *
//  */
// export enum QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice {
//     NONE = "NONE",
//     LOG_10 = "LOG_10"
// }
//
// export const QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT =
//     QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.NONE;
//
// //////////
//
// export enum QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType {
//     LINE = "LINE",
//     SCATTER = "SCATTER"
// }
//
// export const QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType__DEFAULT =
//     QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.LINE;
//
// //////////
//
// /**
//  *
//  */
// export const open_FeatureDetection_TotalIonCurrent_VS_RetentionTime_OverlayContainer = function (
//     {
//         params
//     } : {
//         params: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__Component_Params
//
//     }) : void {
//
//     let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;
//
//     const callbackOn_Cancel_Close_Clicked = () : void => {
//         limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
//     };
//
//     const overlayComponent = (
//         <QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_OverlayContainer
//             params={ params }
//             callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
//         />
//     )
//
//     limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
//         limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
// }
//
// /**
//  *
//  */
// export interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__Component_Params {
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
// interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer_Props {
//
//     params: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__Component_Params
//     callbackOn_Cancel_Close_Clicked: () => void
// }
//
// /**
//  *
//  */
// interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer_State {
//
//     plot_Type?: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType
//     transform_Score?: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice
//     force_Rerender?: {}
// }
//
// /**
//  *
//  */
// class QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_OverlayContainer extends React.Component< QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer_Props, QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer_State > {
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
//     private _show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection: number = null
//     /**
//      *
//      */
//     constructor(props: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer_Props) {
//         super(props);
//
//         if ( props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
//             const msg = "ONLY valid for 1 search";
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         this.state = {
//             plot_Type: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType__DEFAULT,
//             transform_Score: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT,
//             force_Rerender: {}
//         };
//     }
//
//     // componentDidMount() {
//     //     try {
//     //
//     //     } catch( e ) {
//     //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//     //         throw e;
//     //     }
//     // }
//
//     /**
//      *  Called from main chart code when scan not have Total Ion Current
//      */
//     private __qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function(
//         params: QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_FunctionType_Params
//     ) : void {
//
//         this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = this.props.params.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id
//         this.setState({ force_Rerender: {} } )
//     }
//
//     /**
//      *
//      */
//     render() {
//         try {
//             if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection &&
//                 ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection !== this.props.params.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
//                 this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = null;  // reset to null since not currently selected id
//             }
//
//             let noData_Element: React.JSX.Element = null;
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
//
//                 <ModalOverlay_Limelight_Component_v001_B_FlexBox
//                     widthMinimum={ _Overlay_Width_Min }
//                     widthMaximum={ _Overlay_Width_Max }
//                     heightMinimum={ _Overlay_Height_Min }
//                     heightMaximum={ _Overlay_Height_Max }
//                     title={ _Overlay_Title }
//                     set_CSS_Position_Fixed={ false }
//                     callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
//                     close_OnBackgroundClick={ false } >
//
//                     <React.Fragment>
//
//                         <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                              style={ { height: "100%" } }
//                         >
//
//                             <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >
//
//                                 {/*  First row for Grid Template Rows  */}
//
//                                 {/*  For any content above the chart  */}
//                                 <div >
//                                     <div >
//                                         <span>Feature Detection: </span>
//                                         <span>
//                                             { this.props.params.featureDetection_Root_Entry_Selection.displayLabel }
//                                         </span>
//                                         <span> - Scan File</span>
//                                         { this.props.params.featureDetection_Root_Entry_Selection.searchScanFileEntries.length > 1 ? (
//                                             <span>s</span>
//                                         ) : null }
//                                         <span>: </span>
//                                         <span>
//                                             { this.props.params.featureDetection_Root_Entry_Selection.searchScanFileEntries.map((value, index) => {
//                                                 return (
//                                                     <React.Fragment>
//                                                         { index !== 0 ? (
//                                                             <span>, </span>
//                                                         ) : null }
//                                                         <span>
//                                                             { value.searchScanFilename }
//                                                         </span>
//                                                     </React.Fragment>
//                                                 )
//                                             }) }
//                                         </span>
//                                     </div>
//                                     <div>
//
//                                         {/*  User Choice:  Plot Type: Line Chart or Scatter Plot  */}
//
//                                         <span style={ { paddingRight: 10  } }>
//                                             Plot Type:
//                                         </span>
//                                         <span>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType"
//                                                     checked={
//                                                         this.state.plot_Type ===
//                                                         QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.LINE
//                                                     }
//                                                     onChange={ event => {
//                                                         window.setTimeout( () => {
//                                                             this.setState({
//                                                                 plot_Type:
//                                                                 QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.LINE
//                                                             });
//                                                         }, 10 );
//                                                     }}
//                                                 />
//                                                 <span>
//                                                     Line
//                                                 </span>
//                                             </label>
//                                         </span>
//                                         <span>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType"
//                                                     checked={
//                                                         this.state.plot_Type ===
//                                                         QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.SCATTER
//                                                     }
//                                                     onChange={ event => {
//                                                         window.setTimeout( () => {
//                                                             this.setState({
//                                                                 plot_Type:
//                                                                 QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__PlotType.SCATTER
//                                                             });
//                                                         }, 10 );
//                                                     }}
//                                                 />
//                                                 <span>
//                                                     Scatter
//                                                 </span>
//                                             </label>
//                                         </span>
//
//                                         {/*  User Choice:  Transform Score: None or log10  */}
//
//                                         <span style={ { paddingRight: 10, paddingLeft: 20  } }>
//                                             Transform score:
//                                         </span>
//                                         <span>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice"
//                                                     checked={
//                                                         this.state.transform_Score ===
//                                                         QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.NONE
//                                                     }
//                                                     onChange={ event => {
//                                                         window.setTimeout( () => {
//                                                             this.setState({
//                                                                 transform_Score:
//                                                                 QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.NONE
//                                                             });
//                                                         }, 10 );
//                                                     }}
//                                                 />
//                                                 <span>
//                                                     No transformation
//                                                 </span>
//                                             </label>
//                                         </span>
//                                         <span>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice"
//                                                     checked={
//                                                         this.state.transform_Score ===
//                                                         QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10
//                                                     }
//                                                     onChange={ event => {
//                                                         window.setTimeout( () => {
//                                                             this.setState({
//                                                                 transform_Score:
//                                                                 QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10
//                                                             });
//                                                         }, 10 );
//                                                     }}
//                                                 />
//                                                 <span>
//                                                     Log10
//                                                 </span>
//                                             </label>
//                                         </span>
//
//                                     </div>
//                                 </div>
//
//                                 {/*  Second row for Grid Template Rows  */}
//
//                                 <div style={ { height: "100%" } }>
//                                     {( noData_Element ) ? (
//
//                                         <QcPage_ChartBorder >
//                                             {noData_Element}
//                                         </QcPage_ChartBorder >
//
//                                     ) : (
//                                         <QcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot
//                                             qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
//                                             qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
//                                             featureDetection_Root_Entry_Selection={ this.props.params.featureDetection_Root_Entry_Selection }
//                                             plot_Type={ this.state.plot_Type }
//                                             transform_Score={ this.state.transform_Score }
//                                             qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function={ this.__qcViewPage_FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_IN_Persistent_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MissingData_Callback_Function_BindThis }
//                                             isInSingleChartOverlay={ true }
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//
//                         </div>
//                     </React.Fragment>
//                 </ModalOverlay_Limelight_Component_v001_B_FlexBox>
//             );
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
// }
