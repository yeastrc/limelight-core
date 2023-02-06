/**
 * searchSelection_OrderSelectionResult.ts
 *
 * Choose Searches Selection - Order Selection Result - Mostly used to pass to create 'code' for "Compare ..." pages for order of searches to display.
 *
 *  Used on "Change Searches" overlay on Data Pages (Peptide/Protein/etc)
 *
 *  Also used on Project Page
 *
 *  !!!!   NOT USED   !!!!
 *
 *  Switched to just put in the order the searches were selected
 *
 */

// import {CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";
//
// /**
//  *
//  */
// export class SearchSelection_OrderSelectionResult_ResultObject {
//     projectSearchIds_InOrder: Array<number>
// }
//
// export class SearchSelection_OrderSelectionResult__searchSelection__Param {
//     searchSelection_Array: Array<SearchSelection_OrderSelectionResult__searchSelection_ArrayEntry__Param>
// }
//
// export class SearchSelection_OrderSelectionResult__searchSelection_ArrayEntry__Param {
//     readonly folderId: number  //  undefined or null when not in folder
//     readonly projectSearchId: number
// }
//
// /**
//  *
//  */
// export const searchSelection_OrderSelectionResult = function (
//     {
//         searchSelection_Param, searchesSearchTagsFolders_Result_Root
//     } : {
//         searchSelection_Param: SearchSelection_OrderSelectionResult__searchSelection__Param
//         searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
//     }
// ) : SearchSelection_OrderSelectionResult_ResultObject {
//
//     const projectSearchIds_InOrder: Array<number> = []
//
//     for ( const folderData of searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() ) {
//         for ( const projectSearchId_InFolder of folderData.searchesInFolder_ProjectSearchIds_InDisplayOrder ) {
//             if ( ! projectSearchIds_InOrder.includes( projectSearchId_InFolder ) ) {
//                 for ( const searchSelection_Entry of searchSelection_Param.searchSelection_Array ) {
//                     if ( searchSelection_Entry.projectSearchId === projectSearchId_InFolder ) {
//                         if ( searchSelection_Entry.folderId == undefined || searchSelection_Entry.folderId === null || searchSelection_Entry.folderId === folderData.folderId ) {
//                             projectSearchIds_InOrder.push( projectSearchId_InFolder );
//                             break;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//
//     for ( const projectSearchId_NotIn_AnyFolder of searchesSearchTagsFolders_Result_Root.get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() ) {
//
//         if ( ! projectSearchIds_InOrder.includes( projectSearchId_NotIn_AnyFolder ) ) {
//             for ( const searchSelection_Entry of searchSelection_Param.searchSelection_Array ) {
//                 if ( searchSelection_Entry.projectSearchId === projectSearchId_NotIn_AnyFolder ) {
//                     if ( searchSelection_Entry.folderId == undefined || searchSelection_Entry.folderId === null ) {
//                         projectSearchIds_InOrder.push( projectSearchId_NotIn_AnyFolder );
//                         break;
//                     }
//                 }
//             }
//         }
//     }
//
//     //  Validate all entries in searchSelection_Array end up in result
//     {
//         const projectSearchIds_InOrder__LocalCopy_AsSet: Set<number> = new Set( projectSearchIds_InOrder )  //
//         for ( const searchSelection_Entry of searchSelection_Param.searchSelection_Array ) {
//             if ( ! projectSearchIds_InOrder__LocalCopy_AsSet.has( searchSelection_Entry.projectSearchId ) ) {
//                 const msg = "Search Selection entry searchSelection_Array NOT found in results. searchSelection_Entry.projectSearchId: " + searchSelection_Entry.projectSearchId;
//                 console.warn(msg)
//                 throw Error(msg)
//             }
//         }
//     }
//
//     const result : SearchSelection_OrderSelectionResult_ResultObject = {
//         projectSearchIds_InOrder
//     }
//
//     return result;
// }