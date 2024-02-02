/**
 * commonData_LoadedFromServerFor_Project_DoSections_HaveAnyData.ts
 *
 * Javascript - Data from server for Project Identifier or Project Search Ids - Searches, Search Tags, Folders
 *
 * MAIN FUNCTION:   getSearchesSearchTagsAndFolders_SingleProject
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result {

    readonly has_Searches_Data: boolean
    readonly has_ScanFile_Data: boolean
    readonly has_Experiment_NOT_Drafts_Data: boolean
    readonly has_DataPage_SavedView_Data: boolean
    readonly has_FeatureDetectionRoot_ProjectMapping_Data: boolean
}

/**
 *
 */
export const get_CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result = function (
    {
        projectIdentifier
    } : {
        projectIdentifier : string
    }) : Promise<CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result> {

    return new Promise<CommonData_LoadedFromServerFor_Project_DoSections_HaveAnyData_Result> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier
            };

            const url = "d/rws/for-page/project-view-page-has-data-for-each-section-of-project-page";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    resolve(responseData);

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
