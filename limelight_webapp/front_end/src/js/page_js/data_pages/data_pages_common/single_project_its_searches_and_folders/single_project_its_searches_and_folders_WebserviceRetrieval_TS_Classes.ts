/**
 * single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes.ts
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {sortSearchesOnDisplayOrder_OrDefaultOrder} from "page_js/data_pages/data_pages_common/sortSearchesOnDisplayOrder_OrDefaultOrder";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";


export class GetSearchesAndFolders_SingleProject_PromiseResponse {

    items : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
}

/////

/**
 * Used for both Search and Folder
 */
export class GetSearchesAndFolders_SingleProject_PromiseResponse_Item {

    //  Search
    projectSearchId : number
    searchId : number
    searchName : string

    //  For Folder

    isFolder : boolean
    folderId : number
    folderName : string
    searchesInFolder : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>

    constructor({ projectSearchId, searchId, searchName, isFolder, folderId, folderName, searchesInFolder } : {

        //  Search
        projectSearchId : number
        searchId : number
        searchName : string

        //  For Folder

        isFolder : boolean
        folderId : number
        folderName : string
        searchesInFolder : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
    }) {
        this.projectSearchId = projectSearchId;
        this.searchId = searchId;
        this.searchName = searchName;
        this.isFolder = isFolder;
        this.folderId = folderId;
        this.folderName = folderName;
        this.searchesInFolder = searchesInFolder;
    }
}


/**
 *
 */
export const getSearchesAndFolders_SingleProject = function (
    {
        projectIdentifier
    } : {
        projectIdentifier : any
    }) : Promise<GetSearchesAndFolders_SingleProject_PromiseResponse> {

    return new Promise ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier: projectIdentifier
            };

            const url = "d/rws/for-page/project-view-page-search-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    const resultList = _getSearchList_FromServerResponseData(responseData);

                    resolve({ items : resultList });

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
 */
const _getSearchList_FromServerResponseData = function ( responseData: any ) : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item> {

    const searchList_Result : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item> = [];

    const folderList = responseData.folderList;
    const searchesNotInFolders = responseData.searchesNotInFolders;
    const noSearchesFound = responseData.noSearchesFound;

    if (noSearchesFound) {
        return searchList_Result; // EARLY RETURN
    }


    sortSearchesOnDisplayOrder_OrDefaultOrder({ folderList, searchesNotInFolders }); // External Function


    if (folderList && folderList.length !== 0) {

        for (const folderItem of folderList) {

            const searchesInFolder = folderItem.searchesInFolder;

            if (searchesInFolder && searchesInFolder.length !== 0) {

                if ( ! variable_is_type_number_Check( folderItem.id ) ) {
                    const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( folderItem.id ) ). folderItem.id: " + folderItem.id
                    console.warn( msg )
                    throw  Error( msg )
                }
                if ( ! limelight__IsVariableAString( folderItem.folderName ) ) {
                    const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! limelight__IsVariableAString( folderItem.folderName ) ). folderItem.folderName: " + folderItem.folderName
                    console.warn( msg )
                    throw  Error( msg )
                }
                //  Build Folder Entry and put incoming folder's searches into output folder's searches
                const searchesInFolder_Result : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item> = [];
                const searchList_Entry = new GetSearchesAndFolders_SingleProject_PromiseResponse_Item({
                    projectSearchId : undefined,
                    searchId : undefined,
                    searchName : undefined,
                    isFolder : true,
                    folderId : folderItem.id,
                    folderName : folderItem.folderName,
                    searchesInFolder : searchesInFolder_Result
                })

                searchList_Result.push( searchList_Entry );

                _getSearchList_FromServerResponseData_SpecificListOfSearches(searchesInFolder, searchesInFolder_Result);
            }
        }
    }

    if (searchesNotInFolders && searchesNotInFolders.length !== 0) {
        _getSearchList_FromServerResponseData_SpecificListOfSearches(searchesNotInFolders, searchList_Result);
    }

    return searchList_Result;
}

/**
 *
 */
const _getSearchList_FromServerResponseData_SpecificListOfSearches = function ( searchList: any, searchList_Result : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item> ) : void {

    for (const searchItem of searchList) {

        if ( ! variable_is_type_number_Check( searchItem.projectSearchId ) ) {
            const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( searchItem.projectSearchId ) ). searchItem.projectSearchId: " + searchItem.projectSearchId
            console.warn( msg )
            throw  Error( msg )
        }
        if ( ! variable_is_type_number_Check( searchItem.searchId ) ) {
            const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( searchItem.searchId ) ). searchItem.searchId: " + searchItem.searchId
            console.warn( msg )
            throw  Error( msg )
        }
        if ( ! limelight__IsVariableAString( searchItem.name ) ) {
            const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! limelight__IsVariableAString( searchItem.name ) ). searchItem.name: " + searchItem.name
            console.warn( msg )
            throw  Error( msg )
        }
        const searchList_Entry = new GetSearchesAndFolders_SingleProject_PromiseResponse_Item({
            projectSearchId : searchItem.projectSearchId,
            searchId : searchItem.searchId,
            searchName : searchItem.name,
            isFolder : false,
            folderId : undefined,
            folderName : undefined,
            searchesInFolder : undefined
        })
        searchList_Result.push( searchList_Entry );
    }
}
