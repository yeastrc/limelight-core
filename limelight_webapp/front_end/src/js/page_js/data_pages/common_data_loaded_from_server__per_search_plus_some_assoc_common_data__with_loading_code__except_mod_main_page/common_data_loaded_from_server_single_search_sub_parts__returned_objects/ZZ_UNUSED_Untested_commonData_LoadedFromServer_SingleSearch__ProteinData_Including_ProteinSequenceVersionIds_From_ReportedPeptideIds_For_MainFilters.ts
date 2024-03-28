import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

/**
 * ZZ_UNUSED_Untested_commonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptideIds_For_MainFilters.ts
 *
 * !!!!!!!!!!    Unused and Un tested
 *
 * For Single Project Search  -  Some Protein Data from Reported Peptide Ids - Except Protein Coverage
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */
//
// import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
// import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
// import {limelight__variable_is_type_number_Check} from "page_js/limelight__variable_is_type_number_Check";
//
// /**
//  *
//  */
// export class CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters_Holder {
//
//     //  	Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
//     //  	Per proteinSequenceVersionId
//     private _reportedPeptideIdsKeyProteinSequenceVersionId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>
//
//     //  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
//     private _proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>
//
//     //  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
//     private _proteinSequenceVersionIdsArray : Array<number>; // - Array [integer] : [proteinSequenceVersionIds] - unique values, sorted
//
//     private _proteinSequenceVersionIdsKeyReportedPeptideId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ReportedPeptideId,[proteinSequenceVersionIds]>
//
//     constructor(
//         {
//             reportedPeptideIdsKeyProteinSequenceVersionId, proteinSequenceVersionIdsUnique, proteinSequenceVersionIdsArray, proteinSequenceVersionIdsKeyReportedPeptideId
//         } : {
//
//             //  	Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
//             //  	Per proteinSequenceVersionId
//             reportedPeptideIdsKeyProteinSequenceVersionId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>
//
//             //  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
//             proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>
//
//             //  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
//             proteinSequenceVersionIdsArray : Array<number>; // - Array [integer] : [proteinSequenceVersionIds] - unique values, sorted
//
//             proteinSequenceVersionIdsKeyReportedPeptideId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ReportedPeptideId,[proteinSequenceVersionIds]>
//
//         }
//     ) {
//         this._reportedPeptideIdsKeyProteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId
//         this._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique
//         this._proteinSequenceVersionIdsArray = proteinSequenceVersionIdsArray
//         this._proteinSequenceVersionIdsKeyReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId
//     }
//
//     /**
//      *
//      * @param proteinSequenceVersionId
//      */
//     get_reportedPeptideIds_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
//         return this._reportedPeptideIdsKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
//     }
//
//     get_proteinSequenceVersionIdsUnique() {
//         return this._proteinSequenceVersionIdsUnique;
//     }
//
//     get_proteinSequenceVersionIdsArray() {
//         return this._proteinSequenceVersionIdsArray;
//     }
//
//     /**
//      *
//      * @param reportedPeptideId
//      */
//     get_proteinSequenceVersionIds_For_ReportedPeptideId( reportedPeptideId: number ) {
//         return this._proteinSequenceVersionIdsKeyReportedPeptideId.get(reportedPeptideId);
//     }
// }
//
// /**
//  *
//  */
// export class CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult {
//
//     proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
// }
//
// //   !!!  MAIN CLASS
//
// /**
//  *
//  */
// export class CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters {
//
//     //  !! If these values change, then create a new instance of this class
//
//     private _projectSearchId: number
//
//     //  Parent Object class
//     private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//
//     //
//
//     private _get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult
//
//     //  Set when have to wait to load Reported Peptide Ids first
//     private _promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult>
//
//     private _promise_Load_Primary_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult>
//     private _reportedPeptideIds_LoadPeptideIds_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
//
//     /**
//      *
//      * @param projectSearchId
//      */
//     private constructor(
//         {
//             projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         }: {
//             projectSearchId: number
//             commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         }
//     ) {
//         this._projectSearchId = projectSearchId;
//         this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
//     }
//
//     /**
//      * Create New Instance
//      *
//      * @param projectSearchId
//      */
//     static getNewInstance(
//         {
//             projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         }: {
//             projectSearchId: number
//             commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         }
//     ) {
//         return new CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters({
//             projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
//         });
//     }
//
//     /**
//      * !!!  Always return promise
//      *
//      * Get all for search for main filters
//      */
//     get_ProteinData_Including_ProteinSequenceVersionIds_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult> {
//         try {
//             const result = this.get_ProteinData_Including_ProteinSequenceVersionIds_AllForSearch();
//
//             if (result.data) {
//
//                 return Promise.resolve(result.data);
//             }
//
//             return result.promise;
//
//         } catch( e ) {
//             console.warn("Exception caught in get_ProteinData_Including_ProteinSequenceVersionIds_AllForSearch_ReturnPromise: ", e);
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//
//     /**
//      * Get all for search for main filters
//      */
//     get_ProteinData_Including_ProteinSequenceVersionIds_AllForSearch():
//         {
//             data: CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult
//             promise: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult>
//         } {
//
//         if (this._get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult) {
//
//             //  Have loaded data so just return it
//             return {
//                 data: this._get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult,
//                 promise: undefined
//             };
//         }
//
//         //  Get reportedPeptideIds for All for Main filters
//
//         const get_reportedPeptideIds_Result =
//             this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
//             get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();
//
//         if ( get_reportedPeptideIds_Result.data ) {
//
//             // Have reportedPeptideIds for All for Main filters Data.  Return Load Peptide Ids Promise
//
//             return {                // EARLY RETURN
//                 data: undefined,
//                 promise: this._load_ProteinData_Including_ProteinSequenceVersionIds_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
//             }
//         }
//
//         // NOT Have reportedPeptideIds for All for Main filters Data.  Have outer Promise to encompass loading them as well
//
//         if ( this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress ) {
//
//             //  EARLY RETURN
//             return { data: undefined, promise: this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress };            //  EARLY RETURN
//         }
//
//         // Create and return new Promise that encompasses
//
//          this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult>( (resolve, reject) => {
//             try {
//                 get_reportedPeptideIds_Result.promise.catch(reason => {
//                     reject(reason)
//                 })
//                 get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => {
//                     const promise_load_PeptideIds_Data = this._load_ProteinData_Including_ProteinSequenceVersionIds_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
//                     promise_load_PeptideIds_Data.catch( reason => {
//                         reject(reason)
//                     })
//                     promise_load_PeptideIds_Data.then( load_PeptideIds_Data_Value => {
//                         try {
//                             resolve(load_PeptideIds_Data_Value);
//
//                         } catch( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                             throw e;
//                         }
//                     })
//                 })
//             } catch( e ) {
//                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                 throw e;
//             }
//         })
//
//         return {
//             data: undefined, promise: this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress
//         }
//     }
//
//     /**
//      * Get Data For Single Project Search Id
//      *
//      */
//
//     private _load_ProteinData_Including_ProteinSequenceVersionIds_Data(
//         {
//             reportedPeptideIds
//         } : {
//             reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
//         }
//     ) : Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult> {
//         try {
//             if ( this._promise_Load_Primary_Data_InProgress ) {
//
//                 if ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds ) {
//                     const msg = "True ( this._promise_LoadPeptideIds_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds )";
//                     console.warn(msg)
//                     throw Error(msg)
//                 }
//
//                 return this._promise_Load_Primary_Data_InProgress;
//             }
//
//             if ( ! ( reportedPeptideIds instanceof Array ) ) {
//                 const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_PeptideIds_Data";
//                 console.warn(msg);
//                 throw Error(msg);
//             }
//
//             this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = reportedPeptideIds;
//
//             const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );
//
//             //  Sort numbers ascending so the same request always sent to the server to match prev request for caching.
//
//             reportedPeptideIds_Sorted.sort( (a,b) => {
//                 if ( a < b ) {
//                     return  -1;
//                 }
//                 if ( a > b ) {
//                     return  1;
//                 }
//                 return 0;
//             } );
//
//             this._promise_Load_Primary_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult>( ( resolve, reject ) => {
//                 try {
//                     let requestObject = {
//                         projectSearchId : this._projectSearchId,
//                         reportedPeptideIds : reportedPeptideIds_Sorted,
//                          searchDataLookupParams_For_Single_ProjectSearchId
//                     };
//
//                     console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds START, Now: " + new Date() );
//
//                     const url = "d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id-version-0002";
//
//                     const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
//
//                     const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//                     promise_webserviceCallStandardPost.catch( () => { reject() }  );
//
//                     promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
//                         try {
//                             console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds END, Now: " + new Date() );
//
//                             //  JS Object.  Key Reported Peptide Id, value, Array of proteinSequenceVersionId
//
//                             this._process_WebserviceResponse({ responseData });
//
//                             resolve( this._get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult );
//
//                         } catch( e ) {
//                             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                             throw e;
//                         }
//                     });
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//
//             this._promise_Load_Primary_Data_InProgress.catch( reason => {
//                 this._promise_Load_Primary_Data_InProgress = undefined;
//                 this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
//             });
//             this._promise_Load_Primary_Data_InProgress.then( value => {
//                 this._promise_Load_Primary_Data_InProgress = undefined;
//                 this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
//             })
//
//             return this._promise_Load_Primary_Data_InProgress;
//
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     }
//
//     /**
//      *
//      * @param responseData
//      * @private
//      */
//     private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {
//
//         const proteinSequenceVersionIdsPerReportedPeptideIdMap = responseData.proteinSequenceVersionIdsPerReportedPeptideIdMap;
//
//
//         //  JS Object.  Key Reported Peptide Id, value, Array of proteinSequenceVersionId
//         let proteinSequenceVersionIdsPerReportedPeptideIdFromServer = proteinSequenceVersionIdsPerReportedPeptideIdMap;
//
//         //  Extract the proteinSequenceVersionIds into an array and if populated put the numPsms in a Map on loadedData
//
//         const proteinSequenceVersionIdsUnique = new Set<number>();
//         const proteinSequenceVersionIdsKeyReportedPeptideId = new Map();
//         const reportedPeptideIdsKeyProteinSequenceVersionId = new Map();
//
//         let proteinSequenceVersionIdsPerReportedPeptideIdFromServer_Keys = Object.keys( proteinSequenceVersionIdsPerReportedPeptideIdFromServer );
//
//         for ( const reportedPeptideIdString of proteinSequenceVersionIdsPerReportedPeptideIdFromServer_Keys ) {
//             const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
//             const proteinSequenceVersionIdsForReportedPeptideId = proteinSequenceVersionIdsPerReportedPeptideIdFromServer[ reportedPeptideIdString ];
//
//             proteinSequenceVersionIdsKeyReportedPeptideId.set( reportedPeptideIdInt, proteinSequenceVersionIdsForReportedPeptideId );
//
//             for ( const proteinSequenceVersionId of proteinSequenceVersionIdsForReportedPeptideId ) {
//                 proteinSequenceVersionIdsUnique.add( proteinSequenceVersionId );
//
//                 let reportedPeptideIdsForProtSeqVId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
//                 if ( ! reportedPeptideIdsForProtSeqVId ) {
//                     reportedPeptideIdsForProtSeqVId = [];
//                     reportedPeptideIdsKeyProteinSequenceVersionId.set( proteinSequenceVersionId, reportedPeptideIdsForProtSeqVId );
//                 }
//                 if ( ! reportedPeptideIdsForProtSeqVId.includes( reportedPeptideIdInt ) ) {
//                     reportedPeptideIdsForProtSeqVId.push( reportedPeptideIdInt )
//                 }
//             }
//         }
//
//         const proteinSequenceVersionIdsArray = [];
//         for ( const proteinSequenceVersionId of proteinSequenceVersionIdsUnique ) {
//             proteinSequenceVersionIdsArray.push( proteinSequenceVersionId );
//         }
//         proteinSequenceVersionIdsArray.sort();
//
//         const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ProteinData_Including_ProteinSequenceVersionIds_From_ReportedPeptidePeptideIds_For_MainFilters_Holder({
//             reportedPeptideIdsKeyProteinSequenceVersionId, proteinSequenceVersionIdsUnique, proteinSequenceVersionIdsArray, proteinSequenceVersionIdsKeyReportedPeptideId
//         })
//
//         this._get_ProteinData_Including_ProteinSequenceVersionIds__FunctionResult = {
//             proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
//         }
//     }
//
// }