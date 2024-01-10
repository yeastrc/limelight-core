// /**
//  * qcViewPage_SingleSearch__PSM_EstimatedError__VS_AnnotationScore_StatisticsPlot.tsx
//  *
//  * QC Page Single Search : PSM Cumulative Error vs PSM Rank by Annotation Score Statistics
//  *
//  */
//
//
// import React from "react";
// import Plotly from 'plotly.js-dist/plotly'
//
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {
//     qcPage_StandardChartLayout, qcPage_StandardChartLayout_ActualChartArea_Width,
//     qcPage_StandardChartLayout_StandardHeight,
//     qcPage_StandardChartLayout_StandardWidth
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
// import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
// import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
// import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
// import {AnnotationTypeItem} from "page_js/data_pages/data_pages_common/dataPageStateManager";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
// import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
// import {
//     qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
//     qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
//     qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
// import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";
// import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
// import {open_PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_OverlayContainer";
// import {CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics";
// import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
// import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder_Unfiltered_ForSinglePsmId} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered";
//
// // const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE = "\u2265"; // ">=" as a single character
// // const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW = "\u2264"; // "<=" as a single character
//
// // const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE_ASCII = ">=";
// // const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW_ASCII = "<=";
//
// /**
//  *
//  */
// export interface QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_Props {
//
//     //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes
//
//     qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
//     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//
//     searchScanFileId_Selection: number
//
//     annotationTypeId_Array: Array<number>
//
//     isInSingleChartOverlay: boolean
// }
//
// /**
//  *
//  */
// interface QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_State {
//
//     //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes
//
//     showUpdatingMessage?: boolean
// }
//
// /**
//  *
//  */
// export class QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_Props, QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_State > {
//
//     //  bind to 'this' for passing as parameters
//
//     private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);
//     private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
//
//     private _DONOTCALL() {
//
//         const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
//     }
//
//     private _renderChart = true;
//
//     private plot_Ref :  React.RefObject<HTMLDivElement>
//
//     private _componentMounted = false;
//
//     /**
//      *
//      */
//     constructor(props: QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_Props) {
//         super(props);
//
//         if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
//             const msg = "ONLY valid for 1 search";
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         {
//             const projectSearchId =
//                 props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId
//
//             const annotationTypeItems_ForProjectSearchId =
//                 props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//                 dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
//             if ( ! annotationTypeItems_ForProjectSearchId ) {
//                 const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//             if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.size < 1 ) {
//                 // No Data for chart so NOT render it
//                 this._renderChart = false;
//
//             } else {
//
//             }
//         }
//
//         this.plot_Ref = React.createRef();
//
//         this.state = {};
//     }
//
//     /**
//      *
//      */
//     componentWillUnmount() {
//
//         try {
//             this._resizeWindow_Handler_Remove();
//         } catch (e) {
//             //  Eat Exception
//         }
//
//         try {
//             this._removeChart();
//
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
//
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
//     shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_State>, nextContext: any): boolean {
//
//         if (
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//             || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//             || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
//             || this.props.annotationTypeId_Array !== nextProps.annotationTypeId_Array  // new Array created when values change
//             || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
//             || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
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
//     componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_StatisticsPlot_State>, snapshot?: any) {
//         try {
//             if ( this._renderChart ) {
//
//                 //  ALWAYS remove check of state properties in 'componentDidUpdate'
//
//                 if (
//                     this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//                     || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//                     || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
//                     || this.props.annotationTypeId_Array !== prevProps.annotationTypeId_Array  // new Array created when values change
//                     || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
//                     // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
//                 ) {
//                 } else {
//                     //  Nothing changed so return
//
//                     return;  // EARLY RETURN
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
//
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
//         const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();
//
//         for ( const annotationTypeId of this.props.annotationTypeId_Array ) {
//             psmFilterableAnnotationTypeIds_Requested.add( annotationTypeId );
//         }
//
//         let fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder
//
//         const promises: Array<Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>> = []
//
//         {
//             const promise =
//                 this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
//                 qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData_Unfiltered__PsmTblData();
//
//             promises.push(promise);
//         }
//         {
//             const promise =
//                 this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
//                 qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData_Unfiltered({ psmFilterableAnnotationTypeIds_Requested });
//
//             promises.push(promise);
//         }
//         //  Must be after add Promises that return QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
//         {
//
//             const get_FastaFileStatisticsHolder_Result =
//                 this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//                 commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
//                 get__commonData_LoadedFromServer__Multiple_ProjectSearchIds().
//                 get_commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics().get_FastaFileStatisticsHolder();
//
//             if ( get_FastaFileStatisticsHolder_Result.data ) {
//                 fastaFileStatistics_Holder = get_FastaFileStatisticsHolder_Result.data.fastaFileStatistics_Holder
//             } else if ( get_FastaFileStatisticsHolder_Result.promise ) {
//                 const promise = new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>((resolve, reject) => { try {
//                     get_FastaFileStatisticsHolder_Result.promise.catch(reason => reject(reason));
//                     get_FastaFileStatisticsHolder_Result.promise.then(value => { try {
//                         fastaFileStatistics_Holder = value.fastaFileStatistics_Holder;
//                         resolve(null);  // Fake null since promises array is of a type
//                     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//                 promises.push(promise)
//             } else {
//                 throw Error("get_FastaFileStatisticsHolder_Result no data or promise")
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
//         promisesAll.then( values => {
//             try {
//                 if ( ! this._componentMounted ) {
//                     //  Component no longer mounted so exit
//                     return; // EARLY RETURN
//                 }
//
//                 const value = values[0]; // Just use first entry
//
//                 const psmFilterableAnnotationData = value.psmFilterableAnnotationData_Unfiltered;
//
//                 const fastaFileStatistics_SingleSearch_Entry = fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId);
//                 if ( ! fastaFileStatistics_SingleSearch_Entry ) {
//                     const msg = "fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId;
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 let chart_Width : number = undefined
//                 let chart_Height : number = undefined
//
//                 try {
//                     //  First remove any existing plot, if it exists (And event listener on it)
//                     this._removeChart();
//                 } catch (e) {
//                     //  Eat Exception
//                 }
//
//                 if ( this.props.isInSingleChartOverlay ) {
//
//                     const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();
//
//                     /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height
//
//                     // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
//                     // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
//                     // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
//                     // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;
//
//                     chart_Width = Math.floor( targetDOMElement_domRect.width );
//                     chart_Height = Math.floor( targetDOMElement_domRect.height );
//
//                     //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
//
//                     // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
//                     //
//                     // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
//                     // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
//                     //
//                     // if ()
//                 } else {
//
//                     chart_Width = qcPage_StandardChartLayout_StandardWidth();
//                     chart_Height = qcPage_StandardChartLayout_StandardHeight();
//                 }
//
//                 //  Colors for Bars
//                 const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: this.props.annotationTypeId_Array.length });
//
//                 //  Create Chart Data
//
//                 const chart_Data = []
//
//                 for ( let annotationTypeId_Array_Index = 0; annotationTypeId_Array_Index < this.props.annotationTypeId_Array.length; annotationTypeId_Array_Index++ ) {
//
//                     const annotationTypeId = this.props.annotationTypeId_Array[ annotationTypeId_Array_Index ];
//
//                     if ( annotationTypeId === undefined || annotationTypeId === null ) {
//                         const msg = "this.props.annotationTypeId_Array[ annotationTypeId_Array_Index ]; returned nothing for annotationTypeId_Array_Index: " + annotationTypeId_Array_Index;
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//
//                     let  annotationTypeItem_ForDisplayScore: AnnotationTypeItem = undefined;
//                     {
//                         const annotationTypeItems_ForProjectSearchId =
//                             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//                             dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
//                         if ( ! annotationTypeItems_ForProjectSearchId ) {
//                             const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
//                             console.warn(msg);
//                             throw Error(msg);
//                         }
//                         annotationTypeItem_ForDisplayScore = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( annotationTypeId );
//                         if ( ! annotationTypeItem_ForDisplayScore ) {
//                             const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( annotationTypeId ); returned nothing for annotationTypeId: + " + annotationTypeId + ", projectSearchId: " + projectSearchId;
//                             console.warn(msg);
//                             throw Error(msg);
//                         }
//                     }
//                     if ( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
//                         const msg = "( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ). annotationTypeId: + " + annotationTypeId + ", projectSearchId: " + projectSearchId;
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
//                         const msg = "( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ). annotationTypeId: + " + annotationTypeId + ", projectSearchId: " + projectSearchId;
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//
//                     let psmFilterableAnnotation_Score_Min : number = undefined
//                     let psmFilterableAnnotation_Score_Max : number = undefined
//
//                     const  psmTblData_Entries_ForProcessing: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder_Unfiltered_ForSinglePsmId> = []
//
//                     {   //  Apply any filtering first
//
//                         const psmTblData_Unfiltered = value.psmTblData_Unfiltered;
//
//                         for (const psmTblData_Entry of psmTblData_Unfiltered.get_PsmTblData_Unfiltered_Entries_IterableIterator()) {
//
//                             if (this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES) {
//                                 //  NOT 'All Files' selected
//
//                                 if (psmTblData_Entry.searchScanFileId !== undefined && psmTblData_Entry.searchScanFileId !== null) {
//
//                                     if (psmTblData_Entry.searchScanFileId !== this.props.searchScanFileId_Selection) {
//                                         //  Not selected searchScanFileId so SKIP
//
//                                         continue;  //  EARLY CONTINUE
//                                     }
//                                 }
//                             }
//
//                             psmTblData_Entries_ForProcessing.push( psmTblData_Entry );
//
//                             //  Compute Min/Max values
//
//                             const psmFilterableAnnotationData_Entry = psmFilterableAnnotationData.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId)
//                             if ( ! psmFilterableAnnotationData_Entry ) {
//                                 const msg = "psmFilterableAnnotationData.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId); returned nothing. psmTblData_Entry.psmId: " + psmTblData_Entry.psmId;
//                                 console.warn(msg);
//                                 throw Error(msg);
//                             }
//
//                             const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
//                                 psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId );
//
//                             if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
//                                 const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId ); returned nothing. annotationTypeId: " + annotationTypeId;
//                                 console.warn(msg);
//                                 throw Error(msg);
//                             }
//
//                             const psmFilterableAnnotation_Score = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber
//
//                             if ( psmFilterableAnnotation_Score_Min === undefined ) {
//                                 psmFilterableAnnotation_Score_Min = psmFilterableAnnotation_Score;
//                                 psmFilterableAnnotation_Score_Max = psmFilterableAnnotation_Score;
//                             } else {
//                                 if ( psmFilterableAnnotation_Score_Min > psmFilterableAnnotation_Score ) {
//                                     psmFilterableAnnotation_Score_Min = psmFilterableAnnotation_Score
//                                 }
//                                 if ( psmFilterableAnnotation_Score_Max < psmFilterableAnnotation_Score ) {
//                                     psmFilterableAnnotation_Score_Max = psmFilterableAnnotation_Score
//                                 }
//                             }
//                         }
//                     }
//
//
//                     const internal_AnnotationScore_Psm_Entries_Map_Key_AnnotationScore: Map<number, Internal_AnnotationScore_Psm_Entries> = new Map();
//
//                     for (const psmTblData_Entry of psmTblData_Entries_ForProcessing) {
//
//                         const psmFilterableAnnotationData_Entry = psmFilterableAnnotationData.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId)
//                         if ( ! psmFilterableAnnotationData_Entry ) {
//                             const msg = "psmFilterableAnnotationData.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId); returned nothing. psmTblData_Entry.psmId: " + psmTblData_Entry.psmId;
//                             console.warn(msg);
//                             throw Error(msg);
//                         }
//
//                         const psmFilterableAnnotationData_For_annotationTypeId_Score_X = psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId );
//                         if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
//                             const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId ); returned nothing. annotationTypeId: " + annotationTypeId;
//                             console.warn(msg);
//                             throw Error(msg);
//                         }
//
//                         const annotationScore = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber
//
//                         //   All PSMs with same score have to be processed as a group
//
//                         let internal_AnnotationScore_Psm_Entries_MapEntry = internal_AnnotationScore_Psm_Entries_Map_Key_AnnotationScore.get( annotationScore );
//                         if ( ! internal_AnnotationScore_Psm_Entries_MapEntry ) {
//                             internal_AnnotationScore_Psm_Entries_MapEntry = { annotationScore, psmTblData_Entry_Array: [] }
//                             internal_AnnotationScore_Psm_Entries_Map_Key_AnnotationScore.set( annotationScore, internal_AnnotationScore_Psm_Entries_MapEntry );
//                         }
//                         internal_AnnotationScore_Psm_Entries_MapEntry.psmTblData_Entry_Array.push( psmTblData_Entry );
//                     }
//
//                     //  Copy Map into Array
//
//                     const internal_AnnotationScore_Psm_Entries_Array: Array<Internal_AnnotationScore_Psm_Entries> = []
//
//                     for ( const internal_AnnotationScore_Psm_Entries_MapEntry of internal_AnnotationScore_Psm_Entries_Map_Key_AnnotationScore.values() ) {
//                         internal_AnnotationScore_Psm_Entries_Array.push( internal_AnnotationScore_Psm_Entries_MapEntry )
//                     }
//
//                     //  Sort Best to Worst score for axis
//
//                     if ( annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
//
//                         //  Best Score is Smallest:  Sort Ascending
//
//                         internal_AnnotationScore_Psm_Entries_Array.sort(( a,b ) => {
//                             if ( a.annotationScore < b.annotationScore ) {
//                                 return -1;
//                             }
//                             if ( a.annotationScore > b.annotationScore ) {
//                                 return 1;
//                             }
//                             return 0;
//                         });
//
//                     } else if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
//
//                         //  Best Score is Largest:  Sort Descending
//
//                         internal_AnnotationScore_Psm_Entries_Array.sort(( a,b ) => {
//                             if ( a.annotationScore > b.annotationScore ) {
//                                 return -1;
//                             }
//                             if ( a.annotationScore < b.annotationScore ) {
//                                 return 1;
//                             }
//                             return 0;
//                         });
//
//                     } else {
//                         throw Error("annotationTypeItem_ForDisplayScore is not filterDirectionBelow or filterDirectionAbove")
//                     }
//
//                     const estimated_number_incorrect_answer_Array: Array<number> = [];
//
//                     {
//
//                         // p = I/(I+T)
//                         const p = fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys / ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys + fastaFileStatistics_SingleSearch_Entry.numTargets );
//
//                         let total_ToCurrent_PSM_target_Psm_Count = 0;
//                         let total_ToCurrent_PSM_independentDecoy_Psm_Count = 0;
//
//                         for ( const internal_AnnotationScore_Psm_Entries of internal_AnnotationScore_Psm_Entries_Array ) {
//
//                             //   All PSMs with same score have to be processed as a group
//
//                             //  The total_ToCurrent_PSM_independentDecoy_Psm_Count or total_ToCurrent_PSM_target_Psm_Count is incremented by the count of PSMs with the score
//                             //  and then the estimated error is computed for all the PSMs.
//
//                             for ( const singlePsm_Data_Entry of internal_AnnotationScore_Psm_Entries.psmTblData_Entry_Array ) {
//
//                                 if ( singlePsm_Data_Entry.independentDecoyPSM ) {
//                                     total_ToCurrent_PSM_independentDecoy_Psm_Count++;
//                                 } else {
//                                     total_ToCurrent_PSM_target_Psm_Count++;
//                                 }
//                             }
//
//                             //  Compute Estimated Error
//
//
//                             // I = total independent decoys in FASTA
//                             // T = total targets (non-independent decoys and non-decoys) in FASTA
//                             //
//                             // p = I/(I+T)
//                             //
//                             // i = total independent decoys that pass filters
//                             // t = total targets (non-independent decoys and non-decoys) that pass filters
//                             //
//                             // estimated error = (i/p) / (i+t)
//                             //
//                             //  Calculate estimated number correct (c) as:
//                             //
//                             //     c = t - i/p
//                             //
//                             // Then use e and c to calculate estimated number incorrect answers:
//                             //
//                             //     n = e * c
//                             //
//                             // Then plot all n with n on the y axis and the corresponding PSMs rank (starting from 1) (from the ordered list by score) on the x axis.
//
//
//                             // p = I/(I+T)
//                             //  Moved to compute above loop
//                             // const p = fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys / ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys + fastaFileStatistics_SingleSearch_Entry.numTargets );
//
//                             // estimated error (e) = (i/p) / (i+t)
//                             const estimated_Error = ( total_ToCurrent_PSM_independentDecoy_Psm_Count / p ) / ( total_ToCurrent_PSM_independentDecoy_Psm_Count + total_ToCurrent_PSM_target_Psm_Count );
//
//                              const estimated_Error_Clamped = Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One( estimated_Error );
//
//                             // estimated number correct (c) as:    c = t - i/p
//
//                             const estimated_Number_Correct = total_ToCurrent_PSM_target_Psm_Count - total_ToCurrent_PSM_independentDecoy_Psm_Count / p;
//
//                             //  Then use e and c to calculate estimated number incorrect answers:   n = e * c
//
//                             const estimated_number_incorrect_answer = estimated_Error_Clamped * estimated_Number_Correct;
//
//                             //  Add to result array an entry for each PSM processed
//
//                             const psmTblData_Entry_Array_Length = internal_AnnotationScore_Psm_Entries.psmTblData_Entry_Array.length;
//
//                             for ( let counter = 0; counter < psmTblData_Entry_Array_Length; counter++ ) {
//
//                                 estimated_number_incorrect_answer_Array.push( estimated_number_incorrect_answer );  // Insert entry for each PSM in internal_AnnotationScore_Psm_Entries
//                             }
//                         }
//                     }
//
//
//                     //  Bin the values into buckets
//
//                     const binCount = Math.floor( ( chart_Width - ( qcPage_StandardChartLayout_StandardWidth() - qcPage_StandardChartLayout_ActualChartArea_Width() ) ) * 2 );
//                     const binSize = psmTblData_Entries_ForProcessing.length / binCount;
//
//
//                     //  Compute Cumulative Error Count for each PSM
//
//                     const chart_X : Array<number> = []  //  Cumulative Error Count for each PSM
//                     const chart_Y : Array<number> = []  //  PSM Rank
//
//                     {
//                         let binNumber: number = undefined
//                         let largestValue_ForBin: number = undefined;
//
//                         let counter = 0;
//                         for ( const estimated_number_incorrect_answer_Entry of estimated_number_incorrect_answer_Array ) {
//                             counter++;
//
//                             if ( counter === 1 ) {
//                                 // Plot first point
//
//                                 chart_Y.push( 1 );
//                                 chart_X.push( estimated_number_incorrect_answer_Entry )
//                             }
//
//                             if ( binNumber === undefined ) {
//                                 //  First bin
//                                 binNumber = Math.floor( counter / binSize );
//                             } else {
//                                 const new_binNumber = Math.floor( counter / binSize );
//                                 if ( new_binNumber !== binNumber ) {
//
//                                     const y = Math.floor( binNumber * binSize );
//
//                                     chart_Y.push( y );
//                                     chart_X.push( largestValue_ForBin )
//
//                                     binNumber = new_binNumber;
//                                     largestValue_ForBin = undefined; // reset
//                                 }
//                             }
//
//                             if ( largestValue_ForBin === undefined ) {
//                                 largestValue_ForBin = estimated_number_incorrect_answer_Entry;
//                             } else {
//                                 if ( largestValue_ForBin > estimated_number_incorrect_answer_Entry ) {
//                                     largestValue_ForBin = estimated_number_incorrect_answer_Entry
//                                 }
//                             }
//
//                         }
//                     }
//
//                     const annotationType_Name_Score : string = this._get_AnnotationTypeName_SearchProgramName( annotationTypeId );
//
//                     const annotationType_Name_Score_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score );
//
//                     const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index( annotationTypeId_Array_Index );
//
//                     const chart_Entry =    {
//                         name: annotationType_Name_Score_HTMLEncoded,
//                         x: chart_X,
//                         y: chart_Y,
//                         type: 'scatter',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'scatter'
//                         // hoverinfo: "text", //  Hover contents
//                         // hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
//                         mode: 'line',
//                         marker: {
//                             size: 2,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
//                             color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
//                         }
//                         // marker: {
//                         //     color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
//                         // }
//                     }
//
//                     chart_Data.push( chart_Entry )
//                 }
//
//                 const chartTitle = "PSM Rank by score vs/ PSM Cumulative Error Count" + "<br><sup>Note: Data in plot are not filtered.</sup>";
//
//                 const chart_X_Axis_Label = "cumulative error count";
//                 const chart_Y_Axis_Label = "PSM rank by score";
//
//                 const chart_Layout = qcPage_StandardChartLayout({
//                     chartTitle,
//                     chart_X_Axis_Label,
//                     //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
//                     chart_Y_Axis_Label,
//                     showlegend: true
//                 });
//
//                 // chart_Layout.hovermode = false;  //  TURN OFF Tooltips for Scatter Plot GL since get 100% CPU usage when too many points with very similar X or Y
//
//                 if ( this.props.isInSingleChartOverlay ) {
//
//                     chart_Layout.width = chart_Width;
//                     chart_Layout.height = chart_Height;
//                 }
//
//                 const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });
//
//                 {
//                     // const chart_Data_JSON = JSON.stringify( chart_Data );
//                     // const chart_Layout_JSON = JSON.stringify( chart_Layout );
//                     //
//                     // console.log("*********************************")
//                     // console.log("Data for Chart with Title: " + chartTitle );
//                     // console.log("chart_Data object: ", chart_Data );
//                     // console.log("chart_Data_JSON: " + chart_Data_JSON );
//                     // console.log("chart_Layout object: ", chart_Layout );
//                     // console.log("chart_Layout_JSON: " + chart_Layout_JSON );
//                     // console.log("chart_config object: ", chart_config );
//                     // console.log("*********************************")
//                 }
//
//                 const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );
//
//                 this.setState({ showUpdatingMessage: false });
//
//                 if ( ! this.props.isInSingleChartOverlay ) {
//
//                     //  Add click handler on chart on main page to open chart in overlay
//
//                     qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
//                 }
//
//             } catch( e ) {
//                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                 throw e;
//             }
//         })
//     }
//
//     /**
//      *
//      */
//     private _removeChart() : void {
//         try {
//             qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
//                 plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis
//             });
//         } catch (e) {
//             //  Eat Exception
//         }
//         try {
//             Plotly.purge(this.plot_Ref.current)
//         } catch (e) {
//             //  Eat Exception
//         }
//     }
//
//     /**
//      *
//      */
//     private _openChartInOverlay( event ) {
//         try {
//             event.stopPropagation()
//             open_PSM_CumulativeErrorCount_VS_PSM_RankByAnnScore_OverlayContainer({
//                 params: {
//                     qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
//                     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
//                     annotationTypeId_Array: this.props.annotationTypeId_Array
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
//     private _get_AnnotationTypeName_SearchProgramName( annotationTypeId: number ) : string {
//
//         const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
//
//         const annotationTypeItems_ForProjectSearchId =
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//             dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
//         if ( ! annotationTypeItems_ForProjectSearchId ) {
//             const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
//             console.warn(msg);
//             throw Error(msg);
//         }
//         const searchProgramsPerSearchItems__ForProjectSearchId =
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//             dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
//         if ( ! searchProgramsPerSearchItems__ForProjectSearchId ) {
//             const msg = "dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         const psmFilterableAnnotationType = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId);
//         if ( ! psmFilterableAnnotationType ) {
//             const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId); returned nothing for annotationTypeId: " + annotationTypeId;
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         const searchProgramsPerSearchItem = searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId );
//         if ( ! searchProgramsPerSearchItem ) {
//             const msg = "searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId ); returned nothing for psmFilterableAnnotationType.searchProgramsPerSearchId: " + psmFilterableAnnotationType.searchProgramsPerSearchId;
//             console.warn(msg);
//             throw Error(msg);
//         }
//
//         return psmFilterableAnnotationType.name + " (" + searchProgramsPerSearchItem.name + ")"
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
//         const style : React.CSSProperties = { position: "relative" };
//
//         if ( this.props.isInSingleChartOverlay ) {
//             style.height = "100%";
//         }
//
//         return (
//             <div style={ style }>
//                 <div ref={this.plot_Ref} style={ style }></div>
//                 {( this.state.showUpdatingMessage ) ? (
//
//                     <QcPage_UpdatingData_BlockCover/>
//
//                 ): null }
//             </div>
//         );
//     }
//
//
// }
//
//
//
//
// class Internal_AnnotationScore_Psm_Entries {
//
//     psmTblData_Entry_Array: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder_Unfiltered_ForSinglePsmId>
//     annotationScore: number
// }
