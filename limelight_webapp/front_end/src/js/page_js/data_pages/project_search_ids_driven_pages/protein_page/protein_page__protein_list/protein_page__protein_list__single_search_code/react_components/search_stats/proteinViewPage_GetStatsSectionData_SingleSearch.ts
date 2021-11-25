/**
 * proteinViewPage_GetStatsSectionData_SingleSearch.ts
 *
 * Javascript for proteinView.jsp page -
 *
 */

//  NOT Currently USED

// The data shown when click "Show Stats" is Incorrect.
// Does NOT reflect Peptide and Protein filters and "Show Hidden Proteins".
// Does NOT update when Peptide and Protein filters and "Show Hidden Proteins" Update.

//    "Total #modified PSMs" is # variable modifications.  Should it also be the # open modifications?

// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
//
// import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
//
// import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
//
// import {
//     ProteinViewPage_StatsSection_Props,
// } from './proteinPageStatsSection';
// import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
//
// interface ProteinListData {
//     psmCount: number
//     reportedPeptideCount: number
//     proteinCount: number
// }
//
// /**
//  *
//  */
// export const proteinViewPage_GetStatsSectionData_SingleSearch = function (
//     {
//         projectSearchId,
//         proteinListData,
//         loadedDataPerProjectSearchIdHolder,
//         dataPageStateManager_DataFrom_Server
//     } : {
//         projectSearchId: number
//         proteinListData : ProteinListData
//         loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
//         dataPageStateManager_DataFrom_Server : DataPageStateManager
//     }) {
//     return new Promise<ProteinViewPage_StatsSection_Props>( ( resolve, reject ) => {
//         try {
//             const promisesArray = [];
//
//             const ms2ScanCounts_ForSearchCached = loadedDataPerProjectSearchIdHolder.get_ms2ScanCounts_ForSearch();
//
//             if ( ! ms2ScanCounts_ForSearchCached ) {
//
//                 const promise_getMS2CountsFromServer = _getMS2CountsFromServer({
//                     projectSearchId, loadedDataPerProjectSearchIdHolder
//                 });
//
//                 promisesArray.push( promise_getMS2CountsFromServer );
//             }
//
//             const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
//
//             const promise_getReportedPeptideIdsHaveDynamicModifications_FromServer = _getReportedPeptideIdsHaveDynamicModifications_FromServer({
//                 reportedPeptideIds, projectSearchId
//             });
//
//             promisesArray.push( promise_getReportedPeptideIdsHaveDynamicModifications_FromServer );
//
//             const promisesAll = Promise.all( promisesArray );
//             promisesAll.catch( (reason) => {
//                 try {
//                     reject( reason )
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             } );
//
//             promisesAll.then( (results) => {
//                 try {
//                     const statsDataFromServer = { ms2CountsFromServerResponse : ms2ScanCounts_ForSearchCached, reportedPeptideIdsHaveDynamicModificationsResult : undefined };
//                     if ( results ) {
//                         //  Process promise resolve values from the promises
//                         for ( const result of results ) {
//                             if ( result.ms2CountsFromServerResponse ) {
//                                 statsDataFromServer.ms2CountsFromServerResponse = result.ms2CountsFromServerResponse;
//                             }
//                             if ( result.reportedPeptideIdsHaveDynamicModificationsResult ) {
//                                 statsDataFromServer.reportedPeptideIdsHaveDynamicModificationsResult = result.reportedPeptideIdsHaveDynamicModificationsResult;
//                             }
//                         }
//                     }
//
//                     const proteinViewPage_StatsSection_Props = _populateStatsSection_PropsObject({
//                         statsDataFromServer,
//                         proteinListData,
//                         projectSearchId,
//                         loadedDataPerProjectSearchIdHolder,
//                         dataPageStateManager_DataFrom_Server
//                     })
//
//                     resolve(proteinViewPage_StatsSection_Props );
//
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     });
// }
//
//
// /**
//  *
//  */
// const _getMS2CountsFromServer = function(
//     {
//         projectSearchId,
//         loadedDataPerProjectSearchIdHolder
//     } : {
//         projectSearchId: number
//         loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
//     }
// ) {
//     return new Promise( ( resolve, reject ) => {
//         try {
//             let requestObject = {
//                 projectSearchId : projectSearchId
//             };
//
//             console.log("AJAX Call to get ms2 count START, Now: " + new Date() );
//
//             const url = "d/rws/for-page/psb/ms2-count-single-project-search-id";
//
//             const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
//
//             const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//             promise_webserviceCallStandardPost.catch( () => { reject() }  );
//
//             promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
//                 try {
//                     console.log("AJAX Call to get ms2 count END, Now: " + new Date() );
//
//                     loadedDataPerProjectSearchIdHolder.set_ms2ScanCounts_ForSearch( responseData );
//
//                     resolve({ ms2CountsFromServerResponse : responseData });
//
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     });
// }
//
// /**
//  *
//  */
// const _getReportedPeptideIdsHaveDynamicModifications_FromServer = function(
//     {
//         reportedPeptideIds,
//         projectSearchId
//     }: {
//         reportedPeptideIds: Array<number>
//         projectSearchId: number
//     }) {
//     return new Promise( ( resolve, reject ) => {
//         try {
//             let requestObject = {
//                 projectSearchId : projectSearchId,
//                 reportedPeptideIds
//             };
//
//             console.log("AJAX Call to get reported peptides have dynamic mods START, Now: " + new Date() );
//
//             const url = "d/rws/for-page/psb/reported-peptides-have-dynamic-mods";
//
//             const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
//
//             const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//             promise_webserviceCallStandardPost.catch( () => { reject() }  );
//
//             promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
//                 try {
//                     console.log("AJAX Call to get reported peptides have dynamic mods END, Now: " + new Date() );
//
//                     resolve({ reportedPeptideIdsHaveDynamicModificationsResult : responseData.data });
//
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     });
// }
//
// ///////////////////////////
//
// /**
//  *
//  */
// const _populateStatsSection_PropsObject = function(
//     {
//         statsDataFromServer,
//         proteinListData,
//         projectSearchId,
//         loadedDataPerProjectSearchIdHolder,
//         dataPageStateManager_DataFrom_Server
//     }: {
//         statsDataFromServer: any
//         proteinListData : ProteinListData
//         projectSearchId: number
//         loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
//         dataPageStateManager_DataFrom_Server : DataPageStateManager
//
//     }) : ProteinViewPage_StatsSection_Props {
//
//     let searchContainsSubGroups : boolean = false;
//     {
//         const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root();
//         if ( searchSubGroups_Root ) {
//             const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
//             if ( searchSubGroups_ForProjectSearchId ) {
//                 searchContainsSubGroups = true;
//             }
//         }
//     }
//
//     const ms2CountsFromServerResponse = statsDataFromServer.ms2CountsFromServerResponse;
//     const reportedPeptideIdsHaveDynamicModificationsResult = statsDataFromServer.reportedPeptideIdsHaveDynamicModificationsResult;
//
//     const data: {
//         psmCount: number
//         reportedPeptideCount: number
//         proteinCount: number
//         ms2ScanCount?: any
//         psmsNoVariableModsCount? : number
//         psmsYesVariableModsCount? : number
//
//     } = Object.assign( {}, proteinListData ); // create new object, copying all properties
//
//     if ( ms2CountsFromServerResponse.searchHasScanData ) {
//         data.ms2ScanCount = ms2CountsFromServerResponse.ms2Count;
//     } else {
//         data.ms2ScanCount = "NA";
//     }
//
//     {
//         let psmCount = 0;
//         let psmCount_Modified = 0;
//         let psmCount_NOT_Modified = 0;
//
//         const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
//
//         for ( const reportedPeptideIdsHaveDynamicModificationsEntry of reportedPeptideIdsHaveDynamicModificationsResult ) {
//             const reportedPeptideId = reportedPeptideIdsHaveDynamicModificationsEntry.reportedPeptideId;
//             const hasDynamicMods = reportedPeptideIdsHaveDynamicModificationsEntry.hasDynamicMods;
//
//             const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
//             if ( numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null ) {
//                 throw Error("No value in numPsmsForReportedPeptideIdMap for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId );
//             }
//             psmCount += numPsmsForReportedPeptideId;
//             if ( hasDynamicMods ) {
//                 psmCount_Modified += numPsmsForReportedPeptideId;
//             } else {
//                 psmCount_NOT_Modified += numPsmsForReportedPeptideId;
//             }
//         }
//
//         const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
//
//         data.psmCount = psmCount
//         data.reportedPeptideCount = reportedPeptideIds.length;
//
//         data.psmsNoVariableModsCount = psmCount_NOT_Modified;
//         data.psmsYesVariableModsCount = psmCount_Modified;
//     }
//
//     const proteinViewPage_StatsSection_Props : ProteinViewPage_StatsSection_Props = {
//         searchContainsSubGroups,
//         data
//     }
//
//     return proteinViewPage_StatsSection_Props;
// }
