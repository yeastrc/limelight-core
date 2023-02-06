/**
 * searchTags__Get_For_ProjectId.ts
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


export class SearchTags__Get_For_ProjectId_Result {

    tags_DistinctInProject: Array<SearchTags__Get_For_ProjectId_ResultItem_SingleTag>
}

export class SearchTags__Get_For_ProjectId_ResultItem_SingleTag {

    tag_id: number;
    tag_category_id: number;  // null if uncategorized
    tag_string: string;
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
}




/**
 *
 */
export const searchTags__Get_For_ProjectId = function(
    {
        projectIdentifier
    } : {
        projectIdentifier: string
    }
) : Promise<SearchTags__Get_For_ProjectId_Result> {

    return new Promise<SearchTags__Get_For_ProjectId_Result> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier
            };

            const url = "d/rws/for-page/search-tags-get-for-project-id";

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
const _getSearchList_FromServerResponseData = function ( responseData: any ) : SearchTags__Get_For_ProjectId_Result {

    const result = responseData as SearchTags__Get_For_ProjectId_Result;

    return result;
}

