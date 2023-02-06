/**
 * searchTags__Get_For_ProjectSearchIds.ts
 */


import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


export class SearchTags__Get_For_ProjectSearchIds_Result {

    userCanEditSearchTags: boolean
    entriesPerSingleProjectSearchId : Array<SearchTags_SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleProjectSearchId>

    categories_Array: Array<SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleCategory>
}

export class SearchTags_SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleProjectSearchId {

    projectSearchId : number
    entriesPerTag : Array<SearchTags__Get_For_ProjectSearchIds_ResultItem_SingleTag>
}


export class SearchTags__Get_For_ProjectSearchIds_ResultItem_SingleTag {

    tag_id: number;
    tag_category_id: number
    tag_string: string;
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
}

export class SearchTagCategories__Get_For_ProjectSearchIds_ResultItem_SingleCategory {

    readonly category_id: number;
    readonly category_label: string;
    readonly label_Color_Font: string;
    readonly label_Color_Background: string;
    readonly label_Color_Border: string;
}





/**
 *
 */
export const searchTags__Get_For_ProjectSearchIds = function(
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }
) : Promise<SearchTags__Get_For_ProjectSearchIds_Result> {

    return new Promise<SearchTags__Get_For_ProjectSearchIds_Result> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectSearchIds
            };

            const url = "d/rws/for-page/search-tags-get-for-project-search-id-list";

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
const _getSearchList_FromServerResponseData = function ( responseData: any ) : SearchTags__Get_For_ProjectSearchIds_Result {

    const result = responseData as SearchTags__Get_For_ProjectSearchIds_Result;

    return result;
}

