/**
 * CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete.ts
 */
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export class CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete {

    readonly projectId: number

    constructor(
        {
            projectId
        }: {
            projectId: number
        }
    ) {
        this.projectId = projectId
    }

    /**
     *
     */
    get_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete_WebserviceCall() {
        try {

            return new Promise<{
                userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject: boolean
            }>( ( resolve, reject ) => {
                try {

                    const url = "d/rws/for-page/structure-file-and-alignment-user-can-create-edit-delete-any-entries-in-project-get-info"

                    const requestObj = {
                        projectIdentifier: this.projectId.toString()
                    }

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url, dataRetrieval_CanRetry: true } );

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( ( reason: any ) => {
                        reject( reason )
                    } );

                    promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                        try {
                            // console.warn( "response from URL: " + url + " is: ", responseData )

                            resolve( {
                                userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject: responseData.userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject
                            } );

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( {
                                errorException: e
                            } );
                            throw e;
                        }
                    } );

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }
}
