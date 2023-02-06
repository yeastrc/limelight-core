/**
 * searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId.ts
 *
 * Search Tags for projectSearchIds and All distinct Search Tags for Associated Project Id
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


export class Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result {

    userCanEditSearchTags: boolean
    entriesPerSingleProjectSearchId : Array<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId>
    tags_DistinctInProject: Array<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleTag>
}

export class Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId {

    projectSearchId : number
    entriesPerTag : Array<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleTag>
}


export class Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleTag {

    tag_id: number;
    tag_category_id: number;
    tag_string: string;
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
}




/**
 *  Search Tags for projectSearchIds and All distinct Search Tags for Associated Project Id
 */
export const searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId = function(
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }
) : Promise<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result> {

    return new Promise<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectSearchIds
            };

            const url = "d/rws/for-page/search-tags-get-for-project-search-id-list-and-all-distinct-for-assoc-project-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    const result = _getSearchList_FromServerResponseData(responseData);

                    resolve(result);

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
const _getSearchList_FromServerResponseData = function ( responseData: any ) : Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result {

    const result = responseData as Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result;

    return result;
}

