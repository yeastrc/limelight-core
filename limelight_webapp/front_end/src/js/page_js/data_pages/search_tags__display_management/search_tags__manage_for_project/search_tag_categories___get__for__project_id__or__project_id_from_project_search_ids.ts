/**
 * searchTagCategories__Get_For_ProjectId.ts
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


export class SearchTagCategories__Get_For_ProjectId_Result {

    tagCategories_DistinctInProject: Array<SearchTagCategories__Get_For_ProjectId_ResultItem_SingleTagCategory>
}

export class SearchTagCategories__Get_For_ProjectId_ResultItem_SingleTagCategory {

    category_id: number;
    category_label: string;
    label_Color_Font: string
    label_Color_Background: string
    label_Color_Border: string
}

/**
 * Populate only 1 of these params
 * @param projectIdentifier
 * @param projectSearchIds
 */
export const searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds = function(
    {
        projectIdentifier, projectSearchIds
    } : {
        projectIdentifier: string
        projectSearchIds: Array<number>
    }
) : Promise<SearchTagCategories__Get_For_ProjectId_Result> {

    if ( projectIdentifier !== undefined && projectIdentifier !== null && projectSearchIds !== undefined && projectSearchIds !== null ) {
        const msg = "Both parameters cannot be populated"
        console.warn(msg)
        throw Error(msg)
    }

    return new Promise<SearchTagCategories__Get_For_ProjectId_Result> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier, projectSearchIds
            };

            const url = "d/rws/for-page/search-tag-categories-get-for-project-id-or-project-id-from-project-search-ids";

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
const _getSearchList_FromServerResponseData = function ( responseData: any ) : SearchTagCategories__Get_For_ProjectId_Result {

    const result = responseData as SearchTagCategories__Get_For_ProjectId_Result;

    return result;
}

