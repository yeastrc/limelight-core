/**
 * projectPage_UploadData_SubmitImportProgramInfo_Overlay.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay
 *
 *
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";

const _Overlay_Title = "Command Line Import Information"

const _Overlay_Width_Min = 700;
const _Overlay_Width_Max = 700;
const _Overlay_Height_Min = 420;
const _Overlay_Height_Max = 420;


/**
 *
 */
export const projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay = function ({ projectIdentifierFromURL } : { projectIdentifierFromURL: any }) {


    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Close_Clicked = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay__GetComponent({ projectIdentifierFromURL, callbackOn_Close_Clicked })

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })



}

/**
 *
 */
const projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay__GetComponent = function (
    {
        projectIdentifierFromURL,
        callbackOn_Close_Clicked
    } : {
        projectIdentifierFromURL: any
        callbackOn_Close_Clicked: ()=>void
    }) : JSX.Element {

    const controller_path = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
    const urlFullPath = window.location.href;

    const controller_pathStart = urlFullPath.indexOf( controller_path );
    if ( controller_pathStart === -1 ) {
        throw Error("Controller Path not found in Page URL. Page URL: " + urlFullPath );
    }
    const baseURL = urlFullPath.substring( 0, controller_pathStart - 1 ); // subtract one to remove '/' after webapp context

    return (
        <SubmitImportProgramInfo_Overlay_Component
            baseURL={ baseURL }
            projectIdentifierFromURL={ projectIdentifierFromURL }
            callbackOn_Close_Clicked={ callbackOn_Close_Clicked }
        />
    )
}


/**
 *
 */
class SubmitImportProgramInfo_Overlay_Component_Props {

    baseURL: string
    projectIdentifierFromURL: any
    callbackOn_Close_Clicked: ()=>void
}

/**
 *
 */
class SubmitImportProgramInfo_Overlay_Component_State {

    submitImportKey?: string
    show_SubmitKey?: boolean

    show_LoadingMessage?: boolean
    show_ErrorMessage?: boolean
    show_UpdatingMessage?: boolean
}

/**
 *
 */
class SubmitImportProgramInfo_Overlay_Component extends React.Component< SubmitImportProgramInfo_Overlay_Component_Props, SubmitImportProgramInfo_Overlay_Component_State > {

    /**
     *
     */
    constructor(props: SubmitImportProgramInfo_Overlay_Component_Props) {
        super(props);

        this.state = { show_LoadingMessage: true, show_SubmitKey: false }
    }

    /**
     *
     */
    componentDidMount() {

        const promise = _getUserSubmitImportProgramKey();
        promise.catch( reason => {
            this.setState({ show_LoadingMessage: false, show_ErrorMessage: true });
        })
        promise.then( ({ responseData }) => {
            try {
                const submitImportKey = responseData.existingKey;
                this.setState({ show_LoadingMessage: false, submitImportKey });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    private _addSubmitImportKey() {

        this.setState({ show_UpdatingMessage: true })

        const promise = _addSubmitImportProgramKey()
        promise.catch( reason => {
            this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true })
        });
        promise.then( result => {
            try {  //  Get new value, put on page
                const promise = _getUserSubmitImportProgramKey();
                promise.catch( reason => {
                    this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true });
                })
                promise.then( ({ responseData }) => {
                    try {
                        const submitImportKey = responseData.existingKey;
                        this.setState({ show_UpdatingMessage: false, submitImportKey });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    private _changeSubmitImportKey() {

        if ( ! this.state.submitImportKey ) {
            return; // No value to change
        }

        if ( ! window.confirm("Change Key?" ) ) {
            return;
        }

        this.setState({ show_UpdatingMessage: true });

        const promise = _changeSubmitImportProgramKey( this.state.submitImportKey );
        promise.catch( reason => {
            this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true });
        });
        promise.then( result => {
            try {  //  Get new value, put on page
                const promise = _getUserSubmitImportProgramKey();
                promise.catch( reason => {
                    this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true });
                })
                promise.then( ({ responseData }) => {
                    try {
                        const submitImportKey = responseData.existingKey;
                        this.setState({ show_UpdatingMessage: false, submitImportKey });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    private _removeSubmitImportKey() {

        if ( ! this.state.submitImportKey ) {
            return; // No value to remove
        }

        if ( ! window.confirm("Remove Key?" ) ) {
            return;
        }

        this.setState({ show_UpdatingMessage: true });

        const promise = _removeSubmitImportProgramKey( this.state.submitImportKey );
        promise.catch( reason => {
            this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true });
        });
        promise.then( result => {
            try {  //  Get new value, put on page
                const promise = _getUserSubmitImportProgramKey();
                promise.catch( reason => {
                    this.setState({ show_UpdatingMessage: false, show_ErrorMessage: true });
                })
                promise.then( ({ responseData }) => {
                    try {
                        const submitImportKey = responseData.existingKey;
                        this.setState({ show_UpdatingMessage: false, submitImportKey });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
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
                callbackOnClicked_Close={ this.props.callbackOn_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                >

                    <h2>Download the Submit Import Program</h2>

                    <div >
                        <a download href="static/limelightSubmitImport/limelightSubmitImport.jar" >Submit Import Program</a>
                    </div>

                    <h2>Documentation for using the Submit Import Program</h2>

                    <div >
                        <a target="_blank" href="https://github.com/yeastrc/limelight-core/blob/master/limelight_submit_import/docs/Documentation.md"
                        >Documentation</a>
                    </div>


                    <h2>Parameters for use with the Submit Import Program</h2>

                    <div style={ { marginTop: 15 } }>--limelight-web-app-url={ this.props.baseURL }</div>

                    <div style={ { marginTop: 5 } }>--project-id={ this.props.projectIdentifierFromURL }</div>

                    { ( this.state.show_UpdatingMessage ) ? (

                        <div  style={ { marginTop: 5 } }>
                            Updating --user-submit-import-key
                        </div>

                    ) : ( this.state.submitImportKey ) ? (
                        <div  style={ { marginTop: 5 } }>
                            <div>
                                <span>
                                    --user-submit-import-key=
                                </span>
                                { ( this.state.show_SubmitKey ) ? (

                                    <span>
                                        { this.state.submitImportKey }
                                    </span>

                                ) : (
                                    <button
                                        style={ { marginLeft: 5 } }
                                        onClick={ event => {
                                            event.stopPropagation();
                                            event.preventDefault();
                                            this.setState({ show_SubmitKey:true });
                                        }}
                                    >
                                        Show Key
                                    </button>
                                )}

                            </div>
                            <div style={ { marginLeft: 20, marginTop: 5 } }>
                                <div >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this._changeSubmitImportKey();
                                        }}
                                    >
                                        Change Key
                                    </button>
                                    <span> </span>
                                    <button
                                        style={ { marginLeft: 10 } }
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this._removeSubmitImportKey();
                                        }}
                                    >
                                        Remove Key
                                    </button>
                                </div>
                                <div style={ { marginTop: 5 } }>
                                    Do not share user-submit-import-key, it is unique to your account.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div  style={ { marginTop: 5 } }>
                            <span>
                                No value set for: --user-submit-import-key
                            </span>
                            <span> </span>
                            <button
                                style={ { marginLeft: 10 } }
                                onClick={ event => {
                                    event.stopPropagation();
                                    this._addSubmitImportKey();
                                }}
                            >
                                Make Key
                            </button>
                        </div>
                    )}

                </div>


            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }

}


/**
 *
 */
const _getUserSubmitImportProgramKey = function () {

    const requestData = {};

    const url = "user/rws/for-page/user-submit-import-key-get";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: true }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    return promise_webserviceCallStandardPost;
}

///////

const USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL = "user/rws/for-page/user-submit-import-key-manage";


/**
 *
 */
const _addSubmitImportProgramKey = function () : Promise<void> {

    let promise = new Promise<void>( function( resolve, reject ) {
        try {
            const requestData = {
                createKey : true
            };

            const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}

/**
 *
 */
const _changeSubmitImportProgramKey = function ( existingKey: string ) : Promise<void> {

    let promise = new Promise<void>( function( resolve, reject ) {
        try {
            var requestData = {
                replaceKey : true,
                existingKey
            };

            const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}

/**
 *
 */
const _removeSubmitImportProgramKey = function ( existingKey: string ) : Promise<void> {

    let promise = new Promise<void>( function( resolve, reject ) {
        try {
            var requestData = {
                deleteKey : true,
                existingKey
            };

            const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}