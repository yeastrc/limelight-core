/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer.ts
 */
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import {
    retrieveSearchNamesFromServer,
    RetrieveSearchNamesFromServer_Result, RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroupData
} from "page_js/data_pages/data_pages_common/searchNameRetrieval";


///////////////////


/**
 * Getting the Searches Details from the server webservice
 *
 * @param projectSearchIds - array of projectSearchIds to get details for
 * @returns Promise - Promise.resolve(...)
 */
export const searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer = async function (
    {
        projectSearchIds, retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate
    }: {
        projectSearchIds: Array<number>
        retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate: RetrieveSearchNamesFromServer_Result  //  OPTIONAL.  If populated is assumed to be up to date.  Expected on Project Search based pages Peptide, Protein, Mod
    }
): Promise<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Root> {
    try {
        let retrieveSearchNamesFromServer_Result__Local: RetrieveSearchNamesFromServer_Result

        if ( retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate ) {

            retrieveSearchNamesFromServer_Result__Local = retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate
        } else {
            retrieveSearchNamesFromServer_Result__Local = await retrieveSearchNamesFromServer({ projectSearchIds })
        }

        const get_SearchDetails_FromServer_Result = await _get_SearchDetails_FromServer({ projectSearchIds })

        return _getResult_FromWebserviceResult({
            retrieveSearchNamesFromServer_Result__Local, get_SearchDetails_FromServer_Result
        })

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );

        throw e;
    }
}

/**
 *
 * @param projectSearchIds
 */
const _get_SearchDetails_FromServer = function (
    {
        projectSearchIds
    }: {
        projectSearchIds: Array<number>
    }
): Promise<Internal_WebserviceResult_GetDataFromServer_Result_Root> {

    return new Promise<Internal_WebserviceResult_GetDataFromServer_Result_Root>( ( resolve, reject ) => {
        try {
            const requestObj = { projectSearchIds: projectSearchIds };

            const url = "d/rws/for-page/psb/get-search-details-all";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url } );

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                reject()
            } );

            promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                try {
                    const responseData_Cast = responseData as Internal_WebserviceResult_GetDataFromServer_Result_Root

                    resolve( responseData_Cast );

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );

                    throw e;
                }
            } );
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e;
        }
    } );
}

/**
 *
 * @param get_SearchDetails_FromServer_Result
 * @param retrieveSearchNamesFromServer_Result__Local
 */
const _getResult_FromWebserviceResult = function (
    {
        get_SearchDetails_FromServer_Result, retrieveSearchNamesFromServer_Result__Local
    } : {
        get_SearchDetails_FromServer_Result: Internal_WebserviceResult_GetDataFromServer_Result_Root
        retrieveSearchNamesFromServer_Result__Local: RetrieveSearchNamesFromServer_Result
    }
) : SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Root  {

    //  Internal Map for lookup

    const searchSubGroupsPerSearch_Map_Key_ProjectSearchId: Map<number, RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroupData> = new Map()

    if ( retrieveSearchNamesFromServer_Result__Local.searchSubGroupsPerSearchList ) {
        for ( const searchSubGroupsPerSearch_Item of retrieveSearchNamesFromServer_Result__Local.searchSubGroupsPerSearchList ) {
            searchSubGroupsPerSearch_Map_Key_ProjectSearchId.set( searchSubGroupsPerSearch_Item.projectSearchId, searchSubGroupsPerSearch_Item )
        }
    }

    //  Create Results
    const commonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject = {
        weblinksShowBlockAlways: get_SearchDetails_FromServer_Result.weblinksShowBlockAlways,
        weblinksShowAddWeblinkLink: get_SearchDetails_FromServer_Result.weblinksShowAddWeblinkLink,
        commentsShowBlockAlways: get_SearchDetails_FromServer_Result.commentsShowBlockAlways,
        canEditSearchSubGroups: retrieveSearchNamesFromServer_Result__Local.canEditSearchSubGroups
    }

    const result_PerProjectSearchId_Item_Map_Key_ProjectSearchId: Map<number, SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item> = new Map()

    if ( ! get_SearchDetails_FromServer_Result.result_PerProjectSearchId_Item_List ) {
        throw Error("( ! responseData_Cast.result_PerProjectSearchId_Item_List )" )
    }

    for ( const result_PerProjectSearchId_Item_MainPart of get_SearchDetails_FromServer_Result.result_PerProjectSearchId_Item_List ) {
        const subGroupData = searchSubGroupsPerSearch_Map_Key_ProjectSearchId.get( result_PerProjectSearchId_Item_MainPart.projectSearchId )

        const result_PerProjectSearchId_Item: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item = {
            mainPart: result_PerProjectSearchId_Item_MainPart, subGroupData
        }
        result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.set( result_PerProjectSearchId_Item_MainPart.projectSearchId, result_PerProjectSearchId_Item )
    }

    const result = new SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Root({
        commonForProject, result_PerProjectSearchId_Item_Map_Key_ProjectSearchId
    })

    return result
}


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   Generic Root Holder Class - for Root of Project Page



/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class {

    private _commonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    private _result_PerProjectSearchId_Item_Map_Key_ProjectSearchId: Map<number, SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item> = new Map()

    private _latestUpdateTracking_Object: object = {}

    constructor() {
    }

    /**
     * Updated any time this object is changed via a set... call
     */
    get_latestUpdateTracking_Object() {
        return this._latestUpdateTracking_Object
    }

    set_commonForProject( commonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject ) {
        this._commonForProject = commonForProject
        this._latestUpdateTracking_Object = {}
    }

    get_commonForProject() {
        return this._commonForProject
    }


    set_result_PerProjectSearchId_Item_For_ProjectSearchId( result_PerProjectSearchId_Item: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item ) {
        this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.set( result_PerProjectSearchId_Item.mainPart.projectSearchId, result_PerProjectSearchId_Item )
        this._latestUpdateTracking_Object = {}
    }


    delete_result_PerProjectSearchId_Item_For_ProjectSearchId( projectSearchId: number ) {
        this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.delete( projectSearchId )
    }

    get_result_PerProjectSearchId_Item_For_ProjectSearchId( projectSearchId: number ) {
        return this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( projectSearchId )
    }

    get_result_PerProjectSearchId_Item_All() {
        return this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.values()
    }

}





/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   Returned Objects


/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Root {

    readonly commonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    private _result_PerProjectSearchId_Item_Map_Key_ProjectSearchId: Map<number, SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item>

    constructor(
        {
            commonForProject, result_PerProjectSearchId_Item_Map_Key_ProjectSearchId
        } : {
            commonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
            result_PerProjectSearchId_Item_Map_Key_ProjectSearchId: Map<number, SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item>
        }
    ) {
        this.commonForProject = commonForProject
        this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId = result_PerProjectSearchId_Item_Map_Key_ProjectSearchId
    }

    get_result_PerProjectSearchId_Item_For_ProjectSearchId( projectSearchId: number ) {
        return this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( projectSearchId )
    }

    get_result_PerProjectSearchId_Item_All() {
        return this._result_PerProjectSearchId_Item_Map_Key_ProjectSearchId.values()
    }
}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject {

    /**
     * true when have a web link or user can add a web link
     */
    readonly weblinksShowBlockAlways: boolean

    /**
     * true when user can add a web link
     */
    readonly weblinksShowAddWeblinkLink: boolean

    /**
     * true when have a comment or user can add a comment
     */
    readonly commentsShowBlockAlways: boolean

    readonly canEditSearchSubGroups: boolean
}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item {

    readonly mainPart: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item_MainPart

    //  Added in this code, not part of Webservice Response
    readonly subGroupData: RetrieveSearchNamesFromServer_Result_SingleSearch_SubGroupData

}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item_MainPart {

    readonly projectSearchId: number

    readonly searchId: number
    readonly path: string

    readonly fastaFilename: string
    readonly fastaFilename_IfLimelightXMLHasDifferentFilename: string
    readonly fastaFile_FileObjectStorageId: number


    readonly formattedLoadTime: string

    //  Converter Program Info

    readonly converterProgram_Name: string
    readonly converterProgram_Version: string

    readonly converterProgram_Pgm_URI: string
    readonly converterProgram_Pgm_Arguments: string
    readonly formatted_converterProgram_ConversionDate: string

    readonly searchProgramsPerSearchList: Array<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchProgramsPerSearchDTO_Item>

    readonly scanFilenameList: Array<string>
    readonly scanFilenames_CommaDelim: string


    readonly searchFileList: Array<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchFile_Item>
    webLinkList: Array<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__WebLink_Item>
    commentList: Array<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Comment_Item>
}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchProgramsPerSearchDTO_Item {

    readonly id: number
    readonly searchId: number

    readonly name: string
    readonly displayName: string
    readonly version: string
    readonly description: string
}


/**
 * SearchFile_Item
 *
 * List per Project Search Id
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchFile_Item {

    readonly id: number
    name: string
    readonly entryIsFileObjectStorageFile: boolean
    readonly canEdit: boolean
}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__WebLink_Item {

    readonly id: number
    readonly linkURL: string
    readonly linkLabel: string
    readonly canDelete: boolean
}

/**
 *
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Comment_Item {

    readonly id: number
    commentText: string
    commentDate: string
    readonly canEdit: boolean
    readonly canDelete: boolean
}




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   Internal classes



/////////

//   Cast the Webservice response to this class

/**
 *
 */
class Internal_WebserviceResult_GetDataFromServer_Result_Root {

    readonly result_PerProjectSearchId_Item_List: Array<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item_MainPart>

    /**
     * true when have a web link or user can add a web link
     */
    readonly weblinksShowBlockAlways: boolean

    /**
     * true when user can add a web link
     */
    readonly weblinksShowAddWeblinkLink: boolean

    /**
     * true when have a comment or user can add a comment
     */
    readonly commentsShowBlockAlways: boolean

}
