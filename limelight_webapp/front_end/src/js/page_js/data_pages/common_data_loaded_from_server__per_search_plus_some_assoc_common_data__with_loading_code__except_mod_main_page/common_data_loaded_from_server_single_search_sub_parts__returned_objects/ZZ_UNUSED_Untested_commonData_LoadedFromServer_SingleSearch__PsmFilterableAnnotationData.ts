/**
 * ZZ_UNUSED_Untested_commonData_LoadedFromServer_SingleSearch__PsmFilterableAnnotationData.ts
 *
 *
 * !!!!!!!!!!    Unused and Un tested
 *
 * For Single Project Search  -  PSM Filterable Annotation Data for Annotation Type Ids
 *
 *
 * This code was copied from elsewhere and would need to be reformatted to a standard "Loader/Holder" like all other files in this directory
 *
 * The call to the webservice is at the bottom of this file
 *
 * The Webservice needs to be uncommented and tested as well
 *
 */


/////////////////

////  psmFilterableAnnotationData

// /**
//  *
//  */
// export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root {
//
//     private _per_Psm_Holder_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId>
//     private _per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder>
//
//     constructor(
//         {
//             psmTblData_Map_Key_ReportedPeptideId, per_Psm_Holder_Map_Key_PsmId
//         }: {
//             psmTblData_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId>
//             per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder>
//         }
//     ) {
//         this._per_Psm_Holder_Map_Key_ReportedPeptideId = psmTblData_Map_Key_ReportedPeptideId;
//         this._per_Psm_Holder_Map_Key_PsmId = per_Psm_Holder_Map_Key_PsmId;
//     }
//
//     get_Per_Psm_Holder_For_ReportedPeptideId(reportedPeptideId: number) {
//         return this._per_Psm_Holder_Map_Key_ReportedPeptideId.get(reportedPeptideId);
//     }
//
//     get_Per_Psm_Holder_For_PsmId(psmId: number) {
//         return this._per_Psm_Holder_Map_Key_PsmId.get(psmId);
//     }
//
//     /**
//      *
//      */
//     get_Per_Psm_Holder_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> {
//
//         return this._per_Psm_Holder_Map_Key_PsmId.values()
//     }
// }
//
// /**
//  *
//  */
// export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId {
//
//     readonly reportedPeptideId: number;
//     private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> = new Map()
//
//     constructor(
//         {
//             reportedPeptideId
//         }: {
//             reportedPeptideId: number
//         }
//     ) {
//         this.reportedPeptideId = reportedPeptideId;
//     }
//
//     get_Per_Psm_Holder_Holder_For_PsmId(psmId: number) {
//         return this._psmTblData_Map_Key_PsmId.get(psmId);
//     }
//
//     /**
//      *
//      */
//     get_Per_Psm_Holder_Holder_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> {
//
//         return this._psmTblData_Map_Key_PsmId.values()
//     }
//
//     //  Add to Map
//
//     /**
//      * Set to Map
//      * @param entry
//      */
//     set_Per_Psm_Holder_Holder( psmTblDataEntry_holder : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder ) {
//         this._psmTblData_Map_Key_PsmId.set(psmTblDataEntry_holder.psmTblData_Entry.psmId, psmTblDataEntry_holder);
//     }
// }
//
// /**
//  *
//  */
// export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder {
//
//     readonly psmTblData_Entry: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId
//     private _psmFilterableAnnotationData_Map_Key_AnnotationTypeId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId> = new Map()
//
//     constructor(
//         {
//             psmTblData_Entry
//         } : {
//             psmTblData_Entry: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId
//         }
//     ) {
//         this.psmTblData_Entry = psmTblData_Entry;
//     }
//
//     get_PsmFilterableAnnotationData_For_AnnotationTypeId(annotationTypeId: number) {
//         return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.get(annotationTypeId);
//     }
//
//     /**
//      *
//      */
//     get_PsmFilterableAnnotationData_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId> {
//
//         return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.values()
//     }
//
//     //  Add to Map
//
//     /**
//      * Set to Map
//      * @param entry
//      */
//     set_PsmFilterableAnnotationData( entry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId ) {
//         this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.set(entry.annotationTypeId, entry);
//     }
// }
//
// /**
//  *  !!!   cast of object returned from webservice with property reportedPeptideId populated in the Javascript code
//  */
// export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId {
//
//     readonly psmId: number;
//     readonly reportedPeptideId: number;
// }
//
//
// /**
//  * !!!   cast of object returned from webservice
//  */
// export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId {
//
//     readonly psmId: number;
//     readonly annotationTypeId: number;
//     readonly annotationValueNumber: number;
// }




// This Needs to:
//
// Pass annotation type ids to webservice
//
// Copy in the annotation data to new JS class
//
// Handle more than 1 request with different annotation type ids and track them separately with separate Promise objects.
//
//     Combine the results of requests into single object graph under single QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root




// import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
// import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
// import {limelight__variable_is_type_number_Check} from "page_js/limelight__variable_is_type_number_Check";
// import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
// import {
//     QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder,
//     QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId,
//     QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId,
//     QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId,
//     QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root
// } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData";





// /**
//  * Internal Class to track "retrievals" from server
//  */
// class Internal_RetrievalTracking_Retrievals {
//
// }
//
// /**
//  * Internal Class to track a single "retrieval" from server
//  */
// class Internal_RetrievalTrackingItem {
//
//     psmFilterableAnnotationTypeIds_Requested: Set<number>
//     promiseReturnedToRequestor: Promise<void>
// }

// /**
//  *
//  */
// export class QcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded {
//
//     //  !!!!!!!!!!!   ONLY Use for initial MAIN Page chart where ONLY ONE request ever
//     private _promiseInProgress : Promise<void>
//
//     /**
//      * @returns null if no promise needed
//      */
//     async singleSearch_PsmFilterableAnnotationData_LoadIfNeeded(
//         {
//             psmFilterableAnnotationTypeIds_Requested, retrievalParams, data_Holder_SingleSearch
//         } : {
//             psmFilterableAnnotationTypeIds_Requested: Set<number>
//             retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
//             data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
//         }
//     ) : Promise<void> {
//         try {
//             if ( data_Holder_SingleSearch.psmFilterableAnnotationData ) {
//                 //  Data already loaded so return null
//                 return null
//             }
//
//             if ( this._promiseInProgress ) {
//                 return this._promiseInProgress;
//             }
//
//             const psmFilterableAnnotationTypeIds = Array.from( psmFilterableAnnotationTypeIds_Requested );
//
//             const projectSearchId = retrievalParams.projectSearchId;
//
//             const get_reportedPeptideIds_ReturnPromise_Result =
//                 await retrievalParams.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
//                 get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters()
//                     .get_reportedPeptideIds_ReturnPromise();
//
//             const reportedPeptideIds: Array<number> = get_reportedPeptideIds_ReturnPromise_Result.reportedPeptideIds;
//
//             let searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId = null;
//
//             for ( const entry of retrievalParams.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
//                 if ( entry.projectSearchId === projectSearchId ) {
//                     searchDataLookupParams_For_Single_ProjectSearchId = entry;
//                     break;
//                 }
//             }
//             if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
//                 const msg = "No entry found in retrievalParams.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId: " + projectSearchId;
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//
//             this._promiseInProgress = new Promise<void>( (resolve, reject) => {
//                 try {
//                     const url = "d/rws/for-page/psb/psm-filterable-annotation-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0002";
//
//                     const requestData = { projectSearchId, psmFilterableAnnotationTypeIds, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId };
//
//                     console.log( "START: getting data from URL: " + url );
//
//                     const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;
//
//                     const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//                     promise_webserviceCallStandardPost.catch( () => {
//                         try {
//                             this._promiseInProgress = null;
//
//                             console.log( "END: REJECTED: getting data from URL: " + url );
//
//                             reject()
//
//                         } catch( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                             throw e;
//                         }
//                     }  );
//
//                     promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
//                         try {
//                             this._promiseInProgress = null;
//
//                             console.log( "END: Successful: getting data from URL: " + url );
//
//                             _populateHolder({ responseData, data_Holder_SingleSearch });
//
//                             resolve();
//
//                         } catch( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                             throw e;
//                         }
//                     } );
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             })
//
//             return this._promiseInProgress;
//
//         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
//     }
// }
//
// /**
//  *
//  */
// const _populateHolder = function (
//     {
//         responseData, data_Holder_SingleSearch
//     } : {
//         responseData: any
//         data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
//     }) : void {
//
//     const psmTblData_Map_Key_ReportedPeptideId = new Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId>();
//     const per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> = new Map();
//
//     if ( responseData.reportedPeptideId_psmFilterableAnnotationDataList_List ) {
//         if ( ! ( responseData.reportedPeptideId_psmFilterableAnnotationDataList_List instanceof Array ) ) {
//             const msg = "( ! ( responseData.reportedPeptideId_psmFilterableAnnotationDataList_List instanceof Array ) )";
//             console.warn(msg);
//             throw Error(msg);
//         }
//         for ( const reportedPeptideId_psmFilterableAnnotationDataList_Entry of responseData.reportedPeptideId_psmFilterableAnnotationDataList_List ) {
//             if ( ! reportedPeptideId_psmFilterableAnnotationDataList_Entry.reportedPeptideId ) {
//                 const msg = "( ! reportedPeptideId_psmFilterableAnnotationDataList_Entry.reportedPeptideId )";
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//             if ( ! limelight__variable_is_type_number_Check( reportedPeptideId_psmFilterableAnnotationDataList_Entry.reportedPeptideId ) ) {
//                 const msg = "( ! limelight__variable_is_type_number_Check( reportedPeptideId_psmFilterableAnnotationDataList_Entry.reportedPeptideId ) )";
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//             if ( ! reportedPeptideId_psmFilterableAnnotationDataList_Entry.psms ) {
//                 const msg = "( ! reportedPeptideId_psmFilterableAnnotationDataList_Entry.psms )";
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//             if ( ! ( reportedPeptideId_psmFilterableAnnotationDataList_Entry.psms instanceof Array ) ) {
//                 const msg = "( ! ( reportedPeptideId_psmFilterableAnnotationDataList_Entry.psms instanceof Array ) )";
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//
//             const reportedPeptideId = reportedPeptideId_psmFilterableAnnotationDataList_Entry.reportedPeptideId;
//
//             const single_ReportedPeptideId_Entry = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId({
//                 reportedPeptideId
//             })
//
//             for ( const psmEntry of reportedPeptideId_psmFilterableAnnotationDataList_Entry.psms ) {
//
//                 //  Copy in from Parent reportedPeptideId_psmFilterableAnnotationDataList_Entry
//                 psmEntry.reportedPeptideId = reportedPeptideId;
//
//                 if ( ! psmEntry.psmFltblAnnEntries ) {
//                     const msg = "( ! psmEntry.psmFltblAnnEntries )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//                 if ( ! ( psmEntry.psmFltblAnnEntries instanceof Array ) ) {
//                     const msg = "( ! ( psmEntry.psmFltblAnnEntries instanceof Array ) )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 const psmFilterableAnnotationEntries = psmEntry.psmFltblAnnEntries;
//
//                 delete psmEntry.psmFltblAnnEntries;
//
//                 const psm : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId = psmEntry;
//
//                 if ( psm.psmId === undefined || psm.psmId === null ) {
//                     const msg = "( psm.psmId === undefined || psm.psmId === null )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//                 if ( ! limelight__variable_is_type_number_Check( psm.psmId ) ) {
//                     const msg = "( ! limelight__variable_is_type_number_Check( psm.psmId ) )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//                 if ( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null ) {
//                     const msg = "( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//                 if ( ! limelight__variable_is_type_number_Check( psm.reportedPeptideId ) ) {
//                     const msg = "( ! limelight__variable_is_type_number_Check( psm.reportedPeptideId ) )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 const psmTblDataEntry_holder = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder({ psmTblData_Entry: psmEntry });
//                 single_ReportedPeptideId_Entry.set_Per_Psm_Holder_Holder( psmTblDataEntry_holder );
//
//                 per_Psm_Holder_Map_Key_PsmId.set( psm.psmId, psmTblDataEntry_holder );
//
//                 //  Process psm.psmFilterableAnnotationEntries
//
//                 for ( const psmFilterableAnnotationEntry of psmFilterableAnnotationEntries ) {
//
//                     psmFilterableAnnotationEntry.psmId = psm.psmId;
//
//                     const psmFilterableAnnotation : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId = psmFilterableAnnotationEntry;
//
//                     if ( psmFilterableAnnotation.psmId === undefined || psmFilterableAnnotation.psmId === null ) {
//                         const msg = "( psmFilterableAnnotation.psmId === undefined || psmFilterableAnnotation.psmId === null )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.psmId ) ) {
//                         const msg = "( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.psmId ) )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( psmFilterableAnnotation.annotationTypeId === undefined || psmFilterableAnnotation.annotationTypeId === null ) {
//                         const msg = "( psmFilterableAnnotation.annotationTypeId === undefined || psmFilterableAnnotation.annotationTypeId === null )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.annotationTypeId ) ) {
//                         const msg = "( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.annotationTypeId ) )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( psmFilterableAnnotation.annotationValueNumber === undefined || psmFilterableAnnotation.annotationValueNumber === null ) {
//                         const msg = "( psmFilterableAnnotation.annotationValueNumber === undefined || psmFilterableAnnotation.annotationValueNumber === null )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//                     if ( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.annotationValueNumber ) ) {
//                         const msg = "( ! limelight__variable_is_type_number_Check( psmFilterableAnnotation.annotationValueNumber ) )";
//                         console.warn(msg);
//                         throw Error(msg);
//                     }
//
//                     psmTblDataEntry_holder.set_PsmFilterableAnnotationData( psmFilterableAnnotation );
//                 }
//             }
//
//             psmTblData_Map_Key_ReportedPeptideId.set( reportedPeptideId, single_ReportedPeptideId_Entry )
//         }
//     }
//
//     const psmFilterableAnnotationData = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root({ psmTblData_Map_Key_ReportedPeptideId, per_Psm_Holder_Map_Key_PsmId });
//
//     // data_Holder_SingleSearch.psmFilterableAnnotationData = psmFilterableAnnotationData;
// }
