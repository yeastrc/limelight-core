
/**
 * projectPage_SearchesSection_Get_Searches_Folders_From_Server.ts
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {sortSearchesOnDisplayOrder_OrDefaultOrder} from "page_js/data_pages/data_pages_common/sortSearchesOnDisplayOrder_OrDefaultOrder";



/**
 *
 */
export class ProjectPage_SearchesSection_Searches_Folders_Root {
    folderList: Array<ProjectPage_SearchesSection_Searches_Folders_SingleFolder>
    searchesNotInFolders: Array<ProjectPage_SearchesSection_Searches_Folders_SingleSearch>;
    noSearchesFound: boolean;
}
export class ProjectPage_SearchesSection_Searches_Folders_SingleFolder {

    id: number;
    folderName: string ;
    searchesInFolder: Array<ProjectPage_SearchesSection_Searches_Folders_SingleSearch> ;
    canEdit: boolean ;
    canDelete: boolean ;
}
export class ProjectPage_SearchesSection_Searches_Folders_SingleSearch {

    projectSearchId: number;
    searchId: number;
    displayOrder: number; // zero if no display order applied
    name: string;
    searchDataLookupParamsCode: string;
    canChangeSearchName: boolean;
    canDelete: boolean;
}


/**
 * return data from server with no processing
 */
export const projectPage_SearchesSection_Get_Searches_Folders_From_Server = function (
    {
        projectIdentifier
    }: {
        projectIdentifier: string
    }
) {

    return new Promise<ProjectPage_SearchesSection_Searches_Folders_Root>( ( resolve, reject) => {
        try {
            let requestObj = {
                projectIdentifier: projectIdentifier
            };

            const url = "d/rws/for-page/project-view-page-search-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason) => {
                reject(reason)
            });

            promise_webserviceCallStandardPost.then(({responseData}) => {
                try {

                    const root = _process_Response_PutInTypedObjects(responseData );

                    resolve(root);

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}

/**
 *
 * @param responseData
 */
const _process_Response_PutInTypedObjects = function ( responseData : any ) : ProjectPage_SearchesSection_Searches_Folders_Root {

    const root : ProjectPage_SearchesSection_Searches_Folders_Root = responseData;

    //  Validate data

    if ( root.folderList && ( ! ( root.folderList instanceof Array ) ) ) {
        throw Error("( root.folderList && ( ! ( root.folderList instanceof Array ) ) )")
    }
    if ( root.folderList ) {

        for ( const folder of root.folderList ) {

            if ( folder.id === undefined || folder.id === null ) {
                throw Error("( folder.id === undefined || folder.id === null )")
            }
            if ( ! variable_is_type_number_Check( folder.id ) ) {
                throw Error("( ! variable_is_type_number_Check( folder.id ) )")
            }
            if ( folder.folderName === undefined || folder.folderName === null ) {
                throw Error("( folder.folderName === undefined || folder.folderName === null )")
            }
            if ( ! limelight__IsVariableAString( folder.folderName ) ) {
                throw Error("( ! limelight__IsVariableAString( folder.folderName ) )")
            }

            _validateSearchArray({ searches:  folder.searchesInFolder });
        }
    }

    _validateSearchArray({ searches : root.searchesNotInFolders });


    sortSearchesOnDisplayOrder_OrDefaultOrder({ folderList: root.folderList, searchesNotInFolders: root.searchesNotInFolders }); // External Function


    return root;
}

/**
 *
 * @param searches
 */
const _validateSearchArray = function (
    {
        searches
    }: {
        searches: Array<ProjectPage_SearchesSection_Searches_Folders_SingleSearch>
    }
): void {

    if ( searches && ( ! ( searches instanceof Array ) ) ) {
        throw Error("( searches && ( ! ( searches instanceof Array ) ) )")
    }

    if ( searches ) {

        for ( const search of searches ) {

            if ( search.projectSearchId === undefined || search.projectSearchId === null ) {
                throw Error("( search.projectSearchId === undefined || search.projectSearchId === null )")
            }
            if ( ! variable_is_type_number_Check( search.projectSearchId ) ) {
                throw Error("( ! variable_is_type_number_Check( search.projectSearchId ) )")
            }

            if ( search.searchId === undefined || search.searchId === null ) {
                throw Error("( search.searchId === undefined || search.searchId === null )")
            }
            if ( ! variable_is_type_number_Check( search.searchId ) ) {
                throw Error("( ! variable_is_type_number_Check( search.searchId ) )")
            }

            if ( search.displayOrder === undefined || search.displayOrder === null ) {
                throw Error("( search.displayOrder === undefined || search.displayOrder === null )")
            }
            if ( ! variable_is_type_number_Check( search.displayOrder ) ) {
                throw Error("( ! variable_is_type_number_Check( search.displayOrder ) )")
            }

            if ( search.name === undefined || search.name === null ) {
                throw Error("( search.name === undefined || search.name === null )")
            }
            if ( ! limelight__IsVariableAString( search.name ) ) {
                throw Error("( ! limelight__IsVariableAString( search.name ) )")
            }

            if ( search.searchDataLookupParamsCode === undefined || search.searchDataLookupParamsCode === null ) {
                throw Error("( search.searchDataLookupParamsCode === undefined || search.searchDataLookupParamsCode === null )")
            }
            if ( ! limelight__IsVariableAString( search.searchDataLookupParamsCode ) ) {
                throw Error("( ! limelight__IsVariableAString( search.searchDataLookupParamsCode ) )")
            }

        }
    }
}

// class WebserviceResult
// private List<WebserviceResult_SingleFolder> folderList;
// private List<WebserviceResult_SingleSearch> searchesNotInFolders;
// private boolean noSearchesFound;
//
// class WebserviceResult_SingleFolder {
//
//     private int id;
//     private String folderName;
//     List<WebserviceResult_SingleSearch> searchesInFolder;
//     private boolean canEdit;
//     private boolean canDelete;
//
// class WebserviceResult_SingleSearch {
//
//     private int projectSearchId;
//     private int searchId;
//     private int displayOrder; // zero if no display order applied
//     private String name;
//     private String searchDataLookupParamsCode;
//     private boolean canChangeSearchName;
//     private boolean canDelete;