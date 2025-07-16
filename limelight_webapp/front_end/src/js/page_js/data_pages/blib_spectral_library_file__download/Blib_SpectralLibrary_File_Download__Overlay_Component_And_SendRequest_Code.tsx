/**
 * Blib_SpectralLibrary_File_Download__Overlay_Component_And_SendRequest_Code.tsx
 *
 * Javascript and React Overlay for Blib Spectral Library Download - Overlay Component && Send Request to server code
 *
 */


import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import React from "react";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

const _Overlay_Title = "Download Blib Spectral Library"


const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 500;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 300;

const _CHECK_FOR_REQUEST_FINISHED_TIMEOUT_DELAY_FIRST_CHECK = 2000; // In milliseconds

const _CHECK_FOR_REQUEST_FINISHED_TIMEOUT_DELAY = 5000; // In milliseconds


enum BlibFile_Get_Status {
    queued = "queued",
    processing = "processing",
    not_found = "not found",
    success = "success",
    error = "error"
}

/**
 *
 */
export const blib_File_Download__Initiate = function (
    {
        blib_File_Download_Root
    } : {
        blib_File_Download_Root : Blib_File_Download_Root
    }
) {

    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callback_Close_Overlay = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent =  (
        <BlibFile_Download_Overlay_Component
            blib_File_Download_Root={ blib_File_Download_Root }
            callback_Close_Overlay={ callback_Close_Overlay }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

}

/**
 *
 */
export class Blib_File_Download_Root {

    projectSearchIdsReportedPeptideIdsPsmIds: Array<Blib_File_Download_PerProjectSearchId_Entry>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
}

/**
 *
 */
class Blib_File_Download_PerProjectSearchId_Entry {

    projectSearchId : number;

    searchSubGroup_Ids_Selected? : Array<number>; // Optional

    reportedPeptideIdsAndTheirPsmIds? : Array<Blib_File_Download_PerReportedPeptideId>;  // Optional
}

/**
 *
 */
class Blib_File_Download_PerReportedPeptideId {
    reportedPeptideId : number;
    psmIds_Include? : Array<number>; // Optional to filter using psmIds instead of using searchDataLookupParamsRoot
    // psmIds_Exclude? : Array<number>; // NOT CURRENTLY USED: Optional to filter using psmIds instead of using searchDataLookupParamsRoot
}

/**
 *
 */
interface BlibFile_Download_Overlay_Component_Props {
    blib_File_Download_Root : Blib_File_Download_Root
    callback_Close_Overlay: () => void
}

/**
 *
 */
interface BlibFile_Download_Overlay_Component_State {

    sendingRequestToServer?: boolean

    blib_GetStatus_Response_status_Property?: BlibFile_Get_Status

    processing_EndUserMessage?: string
    queued_Queue_position?: number

    webserviceErrorResponse?: boolean

    blibWebserviceCall_failedToConnectToWebservice?: boolean
    blibWebserviceCall_HTTP_StatusCode?: number
}

/**
 *
 */
class BlibFile_Download_Overlay_Component extends React.Component< BlibFile_Download_Overlay_Component_Props, BlibFile_Download_Overlay_Component_State > {

    private _beforeUnload_EventHandler_BindThis = this._beforeUnload_EventHandler.bind(this);

    private _projectSearchIds: Array<number> = [];

    private _requestId: string //  Returned from initial request

    private _userClicked_CancelRequest = false;

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: BlibFile_Download_Overlay_Component_Props) {
        super(props);

        for ( const projectSearchIdsReportedPeptideIdsPsmIds_Entry of props.blib_File_Download_Root.projectSearchIdsReportedPeptideIdsPsmIds ) {
            this._projectSearchIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry.projectSearchId );
        }

        this.state = {
            sendingRequestToServer: true,
            blib_GetStatus_Response_status_Property: BlibFile_Get_Status.queued
        };
    }

    /**
     *
     */
    componentDidMount() {

        try {
            window.addEventListener("beforeunload", this._beforeUnload_EventHandler_BindThis, {passive: true});
        } catch (e) {
        }

        this._blibFile_Request_Create_DownloadFile();
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;

        try {
            window.removeEventListener( "beforeunload", this._beforeUnload_EventHandler_BindThis );
        } catch (e) {
        }
    }

    /**
     * called if user navigates from the page while this overlay is open.  Used to cancel the request to create the blib file
     */
    private _beforeUnload_EventHandler() {

        try {
            if ( this._requestId ) {
                _cancel_Create_BlibFile_Request_CallWebservice({ projectSearchIds: this._projectSearchIds, requestId: this._requestId })
            }
        } catch (e) {
        }
    }

    /**
     * Requesting a blib file be created, returns a request id to get the file later
     * @private
     */
    private _blibFile_Request_Create_DownloadFile() {

        const request_Create_BlibFile_CallWebservice_Result = _request_Create_BlibFile_CallWebservice({ blib_File_Download_Root: this.props.blib_File_Download_Root })

        request_Create_BlibFile_CallWebservice_Result.catch(reason => {

        })
        request_Create_BlibFile_CallWebservice_Result.then(webserviceResponse => { try {

            if ( ! webserviceResponse.status ) {

                this.setState({
                    sendingRequestToServer: false,
                    webserviceErrorResponse: true,
                    blibWebserviceCall_failedToConnectToWebservice: webserviceResponse.failedToConnectToWebservice,
                    blibWebserviceCall_HTTP_StatusCode: webserviceResponse.httpStatusCode_Not_200_OK
                })

                return; // EARLY RETURN
            }

            this._requestId = webserviceResponse.requestId;

            if ( this._userClicked_CancelRequest || this._unmountCalled ) {

                //  User has already clicked "Cancel Request" OR component is unmounted so send request to cancel

                _cancel_Create_BlibFile_Request_CallWebservice({ projectSearchIds: this._projectSearchIds, requestId: this._requestId })

                return; // EARLY RETURN
            }

            this.setState({ sendingRequestToServer: false });

            window.setTimeout( () => {
                try {
                    this._check_ForRequestFinished();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, _CHECK_FOR_REQUEST_FINISHED_TIMEOUT_DELAY_FIRST_CHECK )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @private
     */
    private _check_ForRequestFinished() {

        if ( this._unmountCalled ) {

            //  The Overlay is closed so exit

            return;  // EARLY RETURN
        }

        if ( this._userClicked_CancelRequest ) {
            //  User has already clicked "Cancel Request" so send request to cancel
            _cancel_Create_BlibFile_Request_CallWebservice({ projectSearchIds: this._projectSearchIds, requestId: this._requestId })

            return; // EARLY RETURN
        }

        const get_Create_BlibFile_Status_CallWebservice_Result = _get_Create_BlibFile_Status_CallWebservice({ requestId: this._requestId, projectSearchIds: this._projectSearchIds })


        get_Create_BlibFile_Status_CallWebservice_Result.catch(reason => {

        })
        get_Create_BlibFile_Status_CallWebservice_Result.then(webserviceResponse => { try {

            if ( ! webserviceResponse.status ) {

                this.setState({
                    webserviceErrorResponse: true,
                    blibWebserviceCall_failedToConnectToWebservice: webserviceResponse.failedToConnectToWebservice,
                    blibWebserviceCall_HTTP_StatusCode: webserviceResponse.httpStatusCode_Not_200_OK
                })

                return; // EARLY RETURN
            }

            if ( webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.success
                || webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.error
                || webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.queued
                || webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.processing
                || webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.not_found
            ) {
                this.setState({
                    blib_GetStatus_Response_status_Property: webserviceResponse.webserviceResponse_StatusString,
                    processing_EndUserMessage: webserviceResponse.webserviceResponse_End_user_message,
                    queued_Queue_position: webserviceResponse.webserviceResponse_Queue_position
                })
            } else {
                const msg = "'webserviceResponse_StatusString' returned from webservice is unknown webserviceResponse.  webserviceResponse_StatusString: " + webserviceResponse.webserviceResponse_StatusString;
                console.warn(msg);
                throw Error(msg);
            }

            if ( webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.queued
                || webserviceResponse.webserviceResponse_StatusString === BlibFile_Get_Status.processing
            ) {
                window.setTimeout( () => {
                    try {
                        this._check_ForRequestFinished();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }, _CHECK_FOR_REQUEST_FINISHED_TIMEOUT_DELAY )
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @private
     */
    private _download_BlibFile() {

        let requestObj = {
            weuonklUUUQSJDVCWvweyhizwoqy: true
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

        console.log( "_download_BlibFile(): first call webservice at URL: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                console.log( "_download_BlibFile(): called webservice at URL: " + url + ", responseData.downloadIdentifier: " + responseData.downloadIdentifier + ", next call this._download_BlibFile_DoActual(...)" )

                this._download_BlibFile_DoActual({
                    downloadIdentifier: responseData.downloadIdentifier
                })

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     * @private
     */
    private _download_BlibFile_DoActual(
        {
            downloadIdentifier
        } : {
            downloadIdentifier: string
        }
    ) {

        const requestJSONObject = {
            requestId: this._requestId,
            projectSearchIdList: this._projectSearchIds,
            downloadIdentifier
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        form.style.display = "none"

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/blib-spectral-library-download--get-created-file");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        requestJSONStringField.value = requestJSONString

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary

        try {
            form.submit();
        } finally {

            try {
                document.body.removeChild(form);
            } finally {
            }
            try {
                this.props.callback_Close_Overlay();  // Close overlay

            } finally {

            }
        }

        console.log( "at end of _download_BlibFile_DoActual(): downloadIdentifier: " + downloadIdentifier + ", next call this._download_BlibFile_getDownloadStatus_AfterSubmitForm(...)" )

        this._download_BlibFile_getDownloadStatus_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
    }


    /**
     *
     * @param downloadIdentifier
     * @param retryCount
     */
    _download_BlibFile_getDownloadStatus_AfterSubmitForm(
        {
            downloadIdentifier, retryCount
        } : {
            downloadIdentifier: string
            retryCount: number
        }
    ) {

        console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )


        let requestObj = {
            downloadIdentifier
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

        console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", next call webservice at url: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {

                if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                    console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    const _RETRY_COUNT_MAX = 20

                    const _MIN_DELAY_IN_SECONDS = 3

                    if ( retryCount > _RETRY_COUNT_MAX ) {

                        console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                            ", downloadIdentifier: " + downloadIdentifier +
                            ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                        return // EARLY RETURN
                    }

                    const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                    //  Retry after wait
                    window.setTimeout( () => {

                        this._download_BlibFile_getDownloadStatus_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                    }, timeoutDelay )

                    return  // EARLY RETURN
                }

                if ( responseData.statusSuccess ) {

                    //  Successful

                    console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    return  // EARLY RETURN
                }

                if ( responseData.statusFail ) {

                    //  Fail

                    console.log( "_download_BlibFile_getDownloadStatus_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    window.alert( "Blib Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                    return  // EARLY RETURN
                }

                //  NOT expect to get here

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }



    /**
     *
     */
    render() {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ undefined }
                close_OnBackgroundClick={ false }>

                { ( this.state.sendingRequestToServer ) ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div>
                            <div style={ { marginBottom: 10 } }>
                                Sending request to create Blib Spectral Library file for download to the server.
                            </div>
                        </div>
                        <div style={ { marginTop: 10 } }>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();

                                    this._userClicked_CancelRequest = true;

                                    _cancel_Create_BlibFile_Request_CallWebservice({ projectSearchIds: this._projectSearchIds, requestId: this._requestId })
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Cancel Request
                            </button>
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                            <Spinner_Limelight_Component/>
                        </div>

                    </div>

                ) : ( this.state.webserviceErrorResponse ) ? (

                    //  'status' property from Limelight webservice call is not true

                    ( this.state.blibWebserviceCall_failedToConnectToWebservice ) ? (

                        //  Failed to connect to Blib service, send/receive data failed, or non-ok HTTP Status Code

                        ( this.state.blibWebserviceCall_HTTP_StatusCode ) ? (

                            //  Have Status Code

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                                // style={ { padding : 6 } }
                            >
                                <div>
                                    Unable to connect to blib creation service. Error code: { this.state.blibWebserviceCall_HTTP_StatusCode }
                                </div>
                                <div style={ { marginTop: 10, marginBottom: 10 } }>
                                    Please try again later. If this persists, please contact the site administrator.
                                </div>
                                <div >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this.props.callback_Close_Overlay();
                                        } }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>

                        ) : (
                            //  No Status Code

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                                // style={ { padding : 6 } }
                            >
                                <div>
                                    Unable to connect to blib creation service.
                                </div>
                                <div style={ { marginTop: 10, marginBottom: 10 } }>
                                    Please try again later. If this persists, please contact the site administrator.
                                </div>
                                <div >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this.props.callback_Close_Overlay();
                                        } }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )
                    ) : (
                        // True: this.state.webserviceErrorResponse and False: this.state.blibWebserviceCall_failedToConnectToWebservice

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                            // style={ { padding : 6 } }
                        >
                            <div>
                                Unable to connect to blib creation service.
                            </div>
                            <div style={ { marginTop: 10, marginBottom: 10 } }>
                                Please try again later. If this persists, please contact the site administrator.
                            </div>
                            <div >
                                <button
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this.props.callback_Close_Overlay();
                                    } }
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )

                ) : ( this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.error ) ? (  // blib_GetStatus_Response_status_Property is a string returned from Blib webservice

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div style={ { marginBottom: 10 } }>
                            There was an error creating the blib file. Please try again later. If this persists, please contact the site administrator.
                        </div>
                        <div >
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Close
                            </button>
                        </div>
                    </div>


                ) : ( this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.not_found ) ? (  // blib_GetStatus_Response_status_Property is a string returned from Blib webservice

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div>
                            Could not find blib export request.
                        </div>
                        <div style={ { marginTop: 10, marginBottom: 10 } }>
                            Please try again later. If this persists, please contact the site administrator.
                        </div>
                        <div >
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Close
                            </button>
                        </div>
                    </div>

                ) : ( this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.queued || this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.processing ) ? (

                    // blib_GetStatus_Response_status_Property is a string returned from Blib webservice

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div>
                            <div style={ { marginBottom: 10 } }>
                                Creating Blib Spectral Library file for download
                            </div>
                            <div>
                                <span>Status: </span>
                                {( this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.queued ) ? (
                                    <span>Request is waiting to be processed</span>
                                ) : (
                                    <span>Request is processing</span>
                                )}
                            </div>

                            { ( this.state.queued_Queue_position !== undefined && this.state.queued_Queue_position !== null && this.state.queued_Queue_position !== 0 ) ? (
                                <div>
                                    Queue position: { this.state.queued_Queue_position }
                                </div>
                            ) : null}
                            { ( this.state.processing_EndUserMessage ) ? (
                                <div>
                                    { this.state.processing_EndUserMessage }
                                </div>
                            ) : null}
                        </div>
                        <div style={ { marginTop: 10 } }>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();

                                    this._userClicked_CancelRequest = true;

                                    _cancel_Create_BlibFile_Request_CallWebservice({ projectSearchIds: this._projectSearchIds, requestId: this._requestId })
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Cancel Request
                            </button>
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                            <Spinner_Limelight_Component/>
                        </div>

                    </div>
                ) : ( this.state.blib_GetStatus_Response_status_Property === BlibFile_Get_Status.success ) ? (

                    // blib_GetStatus_Response_status_Property is a string returned from Blib webservice

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div style={ { marginBottom: 10 } }>
                            Blib Spectral Library file ready for download.
                        </div>
                        <div style={ { marginBottom: 20 } }>
                            <span
                                className=" fake-link "
                                onClick={ event => {
                                    event.stopPropagation();
                                    this._download_BlibFile();
                                } }
                            >
                                Download Blib Spectral Library
                            </span>
                        </div>

                        <div >
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Close
                            </button>
                        </div>
                    </div>

                ) : ( //  Unknown value

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div>
                            Error Creating Blib File.
                        </div>
                        <div style={ { marginTop: 10, marginBottom: 10 } }>
                            Please try again later. If this persists, please contact the site administrator.
                        </div>
                        <div >
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callback_Close_Overlay();
                                } }
                            >
                                Close
                            </button>
                        </div>
                    </div>

                )}

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }

}



///////////
///////////


/**
 * Submit request to create Blib file
 */
const _request_Create_BlibFile_CallWebservice = function (
    {
        blib_File_Download_Root
    } : {
        blib_File_Download_Root : Blib_File_Download_Root
    }) : Promise<Request_Create_BlibFile_CallWebservice_Result> {

    let requestObj = {
        projectSearchIdsReportedPeptideIdsPsmIds: blib_File_Download_Root.projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot: blib_File_Download_Root.searchDataLookupParamsRoot,
    };

    return new Promise<Request_Create_BlibFile_CallWebservice_Result>((resolve, reject) => {

        const url = "d/rws/for-page/psb/blib-spectral-library-download--request-creation";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch((reason) => {
            try {
                console.warn("_request_Create_BlibFile_CallWebservice: in .then: reason: ", reason );
                reject(reason);

            } catch (e) {
                console.warn("_request_Create_BlibFile_CallWebservice: exception in .catch: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });

        promise_webserviceCallStandardPost.then(({responseData}) => {
            try {
                resolve(responseData);

            } catch (e) {
                console.warn("_request_Create_BlibFile_CallWebservice: exception in .then: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });
    })
}

class Request_Create_BlibFile_CallWebservice_Result { // Matches response from webservice
    status: boolean;
    failedToConnectToWebservice: boolean;  // Also malformed URL
    httpStatusCode_Not_200_OK: number;

    requestId: string; //  Returned from Blib Webservice
}

////////////


/**
 * Get "create Blib file" Status
 */
const _get_Create_BlibFile_Status_CallWebservice = function (
    {
        requestId, projectSearchIds
    } : {
        requestId: string
        projectSearchIds: Array<number>
    }) : Promise<Get_Create_BlibFile_Status_CallWebservice_Result> {

    let requestObj = {
        requestId,
        projectSearchIdList: projectSearchIds,
    };

    return new Promise<Get_Create_BlibFile_Status_CallWebservice_Result>((resolve, reject) => {

        const url = "d/rws/for-page/psb/blib-spectral-library-download--get-creation-status";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch((reason) => {
            try {
                console.warn("_request_Create_BlibFile_CallWebservice: in .then: reason: ", reason );
                reject(reason);

            } catch (e) {
                console.warn("_request_Create_BlibFile_CallWebservice: exception in .catch: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });

        promise_webserviceCallStandardPost.then(({responseData}) => {
            try {
                resolve(responseData);

            } catch (e) {
                console.warn("_get_Create_BlibFile_Status_CallWebservice: exception in .then: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });
    })
}

class Get_Create_BlibFile_Status_CallWebservice_Result {
    status: boolean;
    failedToConnectToWebservice: boolean;  // Also malformed URL
    httpStatusCode_Not_200_OK: number;

    webserviceResponse_StatusString: string; //  Returned from Blib Webservice
    webserviceResponse_End_user_message: string;  //  Returned from Blib Webservice
    webserviceResponse_Queue_position: number;   //  Returned from Blib Webservice
}

////////////

/**
 * Cancel "create Blib file" request
 */
const _cancel_Create_BlibFile_Request_CallWebservice = function (
    {
        requestId, projectSearchIds
    } : {
        requestId: string
        projectSearchIds: Array<number>
    }) : Promise<void> {

    if ( ! requestId ) {
        //  NO requestId so exit
        return; // EARLY RETURN
    }

    let requestObj = {
        requestId,
        projectSearchIdList: projectSearchIds,
    };

    return new Promise<void>((resolve, reject) => {

        const url = "d/rws/for-page/psb/blib-spectral-library-download--cancel-creation";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({
            dataToSend: requestObj, url,
            doNotHandleErrorResponse: true  // Ignore errors from server
        });

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch((reason) => {
            try {
                console.warn("_cancel_Create_BlibFile_Request_CallWebservice: in .then: reason: ", reason );
                reject(reason);

            } catch (e) {
                console.warn("_cancel_Create_BlibFile_Request_CallWebservice: exception in .catch: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });

        promise_webserviceCallStandardPost.then(({responseData}) => {
            try {
                resolve();

            } catch (e) {
                console.warn("_cancel_Create_BlibFile_Request_CallWebservice: exception in .then: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });
    })
}
