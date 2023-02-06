/**
 * qcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable.tsx
 *
 * QC Page Single Search : Feature Detection: Total Ion Current AND Total Ion Count Statistics Table
 *
 */


// import React from "react";
//
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
// import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
// import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
// import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
// import {
//     CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder,
//     CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries";
// import {CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
//
//
// /**
//  *
//  */
// export interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_Props {
//
//     //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change
//
//     qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
//     qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//
//     featureDetection_Root_Entry_Selection: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
// }
//
// /**
//  *
//  */
// interface QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_State {
//
//     //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change
//
//     showCreatingMessage?: boolean
//     showUpdatingMessage?: boolean
//     show_NoData_Message?: boolean
//
//     displayTableContents?: DisplayTableContents
// }
//
// /**
//  *
//  */
// export class QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable extends React.Component< QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_Props, QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_State > {
//
//     //  bind to 'this' for passing as parameters
//
//     private _renderChart: boolean = true;
//
//     private _componentMounted = false;
//
//     /**
//      *
//      */
//     constructor(props: QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_Props) {
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
//         this.state = {
//             showCreatingMessage: true,
//             showUpdatingMessage: false
//         };
//     }
//
//     /**
//      *
//      */
//     componentWillUnmount() {
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
//                         this._populate_DisplayTable();
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
//     shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_Props>, nextState: Readonly<QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_State>, nextContext: any): boolean {
//
//         if (
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//             || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//             || this.props.featureDetection_Root_Entry_Selection !== nextProps.featureDetection_Root_Entry_Selection
//             || this.state.showCreatingMessage !== nextState.showCreatingMessage
//             || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
//             || this.state.show_NoData_Message !== nextState.show_NoData_Message
//
//             || this.state.displayTableContents !== nextState.displayTableContents
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
//     componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_Props>, prevState: Readonly<QcViewPage_SingleSearch__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_IN_Persistent_Features__StatisticsTable_State>, snapshot?: any) {
//         try {
//             if ( this._renderChart ) {
//
//                 if (
//                     this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
//                     || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
//                     || this.props.featureDetection_Root_Entry_Selection !== prevProps.featureDetection_Root_Entry_Selection
//                     // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
//                     // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  // Always remove state property checks in 'componentDidUpdate'
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
//                         this._populate_DisplayTable();
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
//     private _populate_DisplayTable() {
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
//         let featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
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
//                 get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries().
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
//             featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
//         }
//     ) {
//         const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;
//         const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data;
//
//         let ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = true;
//
//         {  //  First confirm all scans have total ion current and ion injection time
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
//                 if ( dataForSingleScanNumberEntry.totalIonCurrent_ForScan === undefined || dataForSingleScanNumberEntry.totalIonCurrent_ForScan === null ) {
//
//                     console.warn( "No totalIonCurrent_ForScan for scanNumber: " + dataForSingleScanNumberEntry.scanNumber +
//                         ", project_scan_file_id: " + this.props.featureDetection_Root_Entry_Selection.project_scan_file_id );
//
//                     this.setState({ show_NoData_Message: true })
//
//                     //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//                     return; // EARLY RETURN
//                 }
//
//                 if ( dataForSingleScanNumberEntry.level === 1 &&
//                     ( dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === undefined || dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === null ) ) {
//
//                     ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = false;
//                 }
//             }
//         }
//
//         const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
//
//         //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"
//
//         const peptideDistinct_Array =
//             this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
//                 proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;
//
//         ////////////
//
//         const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
//             qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
//                 projectSearchId, peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
//             });
//
//         const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;
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
//         ////  Create Display Table Data
//
//         const displayTableContents = new DisplayTableContents();
//
//         displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans;
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
//         }
//
//         {
//             ///  Sum MS 1 Total Ion Current, all MS 1 from Spectral Storage for scan file
//
//             let totalIonCurrent__All_MS_1_Scans = 0;
//             let ionCount__All_MS_1_Scans = 0;
//
//             for ( const dataForSingleScanNumberEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 let totalIonCurrent = dataForSingleScanNumberEntry.totalIonCurrent_ForScan;
//
//                 totalIonCurrent__All_MS_1_Scans += totalIonCurrent;
//
//                 if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {
//
//                     // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                     let ionsPerSecond = dataForSingleScanNumberEntry.totalIonCurrent_ForScan * dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds / 1000
//
//                     ionCount__All_MS_1_Scans += ionsPerSecond;
//                 }
//             }
//
//             displayTableContents.totalIonCurrent__All_MS_1_Scans = totalIonCurrent__All_MS_1_Scans;
//             displayTableContents.ionCount__All_MS_1_Scans = ionCount__All_MS_1_Scans;
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
//             //  Only for Debugging:
//             let featureDetection_SingleFeature_Entry__intensity_Max = undefined
//             let featureDetection_SingleFeature_Entry__intensity_Min = undefined
//
//             //  Sum up values for display table
//
//             let totalIonCurrent__Singular_Predicted_Features = 0;
//             let ionCount__Singular_Predicted_Features = 0;
//
//             for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 const featureDetection_SingleFeature_Array_Entry = featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
//                 if ( ! featureDetection_SingleFeature_Array_Entry ) {
//                     //  No Feature Detection entries for MS 1 Scan Number
//
//                     //  SKip plot when not found
//
//                 } else {
//                     //  Yes Feature Detection entries for MS 1 Scan Number
//
//                     let intensitySummed_TotalIonCurrent = 0;
//
//                     let ionsPerSecondSummed = 0; // Ion Count
//
//                     for ( const featureDetection_SingleFeature_Entry of featureDetection_SingleFeature_Array_Entry ) {
//
//                         intensitySummed_TotalIonCurrent += featureDetection_SingleFeature_Entry.intensity;
//
//
//                         const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity
//
//                         if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {
//
//                             // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                             const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000
//
//                             ionsPerSecondSummed += ionsPerSecond;
//                         }
//                     }
//
//                     totalIonCurrent__Singular_Predicted_Features += intensitySummed_TotalIonCurrent;
//
//                     ionCount__Singular_Predicted_Features += ionsPerSecondSummed;
//
//                     //  Debugging Code
//
//                     if ( featureDetection_SingleFeature_Entry__intensity_Max === undefined ) {
//                         featureDetection_SingleFeature_Entry__intensity_Max = intensitySummed_TotalIonCurrent
//                         featureDetection_SingleFeature_Entry__intensity_Min = intensitySummed_TotalIonCurrent
//                     } else {
//                         if ( featureDetection_SingleFeature_Entry__intensity_Min > intensitySummed_TotalIonCurrent ) {
//                             featureDetection_SingleFeature_Entry__intensity_Min = intensitySummed_TotalIonCurrent
//                         }
//                         if ( featureDetection_SingleFeature_Entry__intensity_Max < intensitySummed_TotalIonCurrent ) {
//                             featureDetection_SingleFeature_Entry__intensity_Max = intensitySummed_TotalIonCurrent
//                         }
//                     }
//                 }
//             }
//
//             displayTableContents.totalIonCurrent__Singular_Predicted_Features = totalIonCurrent__Singular_Predicted_Features;
//             displayTableContents.ionCount__Singular_Predicted_Features = ionCount__Singular_Predicted_Features;
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
//
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
//             let totalIonCurrent__Features_With_PSMs = 0;
//             let ionCount__Features_With_PSMs = 0;
//
//             for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {
//
//                 const featureDetection_SingularFeature_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
//                 if ( ! featureDetection_SingularFeature_Map_Key_SingularFeatureId ) {
//                     //  No Feature Detection entries for MS 1 Scan Number
//
//                     //  SKip  when not found
//
//                 } else {
//                     //  Yes Feature Detection entries for MS 1 Scan Number
//
//                     let intensitySummed_TotalIonCurrent = 0;
//
//                     let ionsPerSecondSummed = 0;
//
//                     for ( const featureDetection_SingleFeature_Entry of featureDetection_SingularFeature_Map_Key_SingularFeatureId.values() ) {
//
//                         intensitySummed_TotalIonCurrent += featureDetection_SingleFeature_Entry.intensity;
//
//                         if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {
//
//                             const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity
//
//                             // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).
//
//                             const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000
//
//                             ionsPerSecondSummed += ionsPerSecond;
//                         }
//                     }
//
//                     totalIonCurrent__Features_With_PSMs += intensitySummed_TotalIonCurrent;
//                     ionCount__Features_With_PSMs += ionsPerSecondSummed;
//                 }
//
//             }
//
//             displayTableContents.totalIonCurrent__Features_With_PSMs = totalIonCurrent__Features_With_PSMs;
//             displayTableContents.ionCount__Features_With_PSMs = ionCount__Features_With_PSMs;
//         }
//
//         displayTableContents.totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent =
//             ( displayTableContents.totalIonCurrent__Features_With_PSMs / displayTableContents.totalIonCurrent__All_MS_1_Scans ) * 100
//
//         if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {
//             displayTableContents.ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount =
//                 ( displayTableContents.ionCount__Features_With_PSMs / displayTableContents.ionCount__All_MS_1_Scans ) * 100
//         }
//
//         this.setState({ displayTableContents, showCreatingMessage: false, showUpdatingMessage: false })
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
//         if ( this.state.show_NoData_Message ) {
//
//             //  EARLY RETURN
//
//             return (
//                 <div>
//                     No Total Ion Current On Each Scan.  Re-import the scan file to re-process to have Total Ion Current for each scan.
//                 </div>
//             )
//         }
//
//         if ( this.state.showCreatingMessage ) {
//
//             //  EARLY RETURN
//
//             return (
//                 <div>
//                     Getting Data
//                 </div>
//             )
//         }
//
//         const _NumberToExponential = 3;
//         const _NumberToFixed = 1;
//
//         const rowLabel_MarginRight = 30;
//         const rowData_IonCount_MarginLeft = 20;
//
//         const row_MarginBottom = 5
//
//         return (
//
//             <React.Fragment>
//
//                 { ( this.state.displayTableContents ) ? (
//
//                     <div style={ { position: "relative", display: "inline-block" } }>
//                         <div style={ { display: "grid", gridTemplateColumns: this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? "min-content min-content min-content" : "min-content min-content " }}>
//                             {/*  Header Row */}
//                             <div>
//                             </div>
//                             <div style={ { whiteSpace: "nowrap", marginRight: 10, marginBottom: 10 } }>
//                                 Total Ion Current
//                             </div>
//                             { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
//                                 <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
//                                     Ion Count
//                                 </div>
//                             ) : null }
//                             {/*  Data Rows */}
//
//                             <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
//                                 All MS1
//                             </div>
//                             <div style={ { whiteSpace: "nowrap" } }>
//                                 { this.state.displayTableContents.totalIonCurrent__All_MS_1_Scans.toExponential( _NumberToExponential ) }
//                             </div>
//                             { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
//                                 <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
//                                     { this.state.displayTableContents.ionCount__All_MS_1_Scans.toExponential( _NumberToExponential ) }
//                                 </div>
//                             ) : null }
//
//                             <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
//                                 Predicted Features
//                             </div>
//                             <div style={ { whiteSpace: "nowrap" } }>
//                                 { this.state.displayTableContents.totalIonCurrent__Singular_Predicted_Features.toExponential( _NumberToExponential ) }
//                             </div>
//
//                             { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
//                                 <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
//                                     { this.state.displayTableContents.ionCount__Singular_Predicted_Features.toExponential( _NumberToExponential ) }
//                                 </div>
//                             ) : null }
//
//                             <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
//                                 Features w/ PSMs
//                             </div>
//                             <div style={ { whiteSpace: "nowrap" } }>
//                                 { this.state.displayTableContents.totalIonCurrent__Features_With_PSMs.toExponential( _NumberToExponential ) }
//                             </div>
//                             { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
//                                 <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
//                                     { this.state.displayTableContents.ionCount__Features_With_PSMs.toExponential( _NumberToExponential ) }
//                                 </div>
//                             ) : null }
//
//                             <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
//                                 % MS1 w/ PSMs
//                             </div>
//                             <div style={ { whiteSpace: "nowrap" } }>
//                                 { this.state.displayTableContents.totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent.toFixed( _NumberToFixed ) }%
//                             </div>
//                             { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
//                                 <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
//                                     { this.state.displayTableContents.ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount.toFixed( _NumberToFixed ) }%
//                                 </div>
//                             ) : null }
//                         </div>
//
//                         {( this.state.showUpdatingMessage ) ? (
//
//                             <QcPage_UpdatingData_BlockCover/>
//                         ) : null }
//                     </div>
//
//                 ) : null }
//             </React.Fragment>
//         );
//     }
//
//
// }
//
//
// // Internal class
//
// class DisplayTableContents {
//
//     totalIonCurrent__All_MS_1_Scans: number
//     totalIonCurrent__Singular_Predicted_Features: number
//     totalIonCurrent__Features_With_PSMs: number
//     totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent: number
//
//     ionCount__All_MS_1_Scans: number
//     ionCount__Singular_Predicted_Features: number
//     ionCount__Features_With_PSMs: number
//     ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount: number
//
//     ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans: boolean
// }
