/**
 * userAccountManagementPage_Change_SubmitImportProgramKey_Component.tsx
 *
 * React Component for userAccountManagement.jsp page - Change Submit Import Program Key
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

const USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL = "user/rws/for-page/user-submit-import-key-manage";

///////

/**
 *
 */
interface UserAccountManagementPage_Change_SubmitImportProgramKey_Component_Props {


}

/**
 *
 */
interface UserAccountManagementPage_Change_SubmitImportProgramKey_Component_State {

    displaySubmitImportKeyMgmtBlock?: boolean

    submitImportKey? : string
    show_SubmitKey?: boolean

    show_LoadingMessage?: boolean
    showError_ReadingData?: boolean
    show_SavingMessage?: boolean
}

/**
 *
 */
export class UserAccountManagementPage_Change_SubmitImportProgramKey_Component extends React.Component< UserAccountManagementPage_Change_SubmitImportProgramKey_Component_Props, UserAccountManagementPage_Change_SubmitImportProgramKey_Component_State > {

    /**
     *
     */
    constructor(props: UserAccountManagementPage_Change_SubmitImportProgramKey_Component_Props) {
        super(props)

        let displaySubmitImportKeyMgmtBlock = false;

        {
            const display_submit_import_key_mgmt_blockDOM = document.getElementById("display_submit_import_key_mgmt_block");
            if ( display_submit_import_key_mgmt_blockDOM ) {
                displaySubmitImportKeyMgmtBlock = true;
            }
        }


        this.state = {
            displaySubmitImportKeyMgmtBlock,
            show_LoadingMessage: true
        }
    }

    /**
     *
     */
    componentDidMount() {

        if ( ! this.state.displaySubmitImportKeyMgmtBlock ) {

            return; // EARLY RETURN
        }

        this._getExistingSubmitImportProgramKey();
    }

    /**
     *
     */
    private _getExistingSubmitImportProgramKey() {

        var requestData = {};

        const url = "user/rws/for-page/user-submit-import-key-get";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                if ( ! responseData.status ) {

                    throw Error( "if ( ! responseData.status ) from call to: " + url );
                }

                const existingSubmitImportProgramKey = responseData.existingKey;

                this.setState({ submitImportKey: existingSubmitImportProgramKey, show_LoadingMessage: false, show_SavingMessage: false });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _addSubmitImportProgramKey() {

        this.setState({ show_SavingMessage: true });

        var requestData = {
            createKey : true
        };

        const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this._getExistingSubmitImportProgramKey();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _changeSubmitImportProgramKey() {

        if ( ! window.confirm("Change Key?" ) ) {
            return;
        }

        this.setState({ show_SavingMessage: true });

        var requestData = {
            replaceKey : true,
            existingKey : this.state.submitImportKey
        };

        const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this._getExistingSubmitImportProgramKey();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _removeSubmitImportProgramKey() {

        if ( ! window.confirm("Remove Key?" ) ) {
            return;
        }

        this.setState({ show_SavingMessage: true });

        var requestData = {
            deleteKey : true,
            existingKey : this.state.submitImportKey
        };

        const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this._getExistingSubmitImportProgramKey();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }



    /**
     *
     */
    render() {

        if ( ! this.state.displaySubmitImportKeyMgmtBlock ) {

            return null; // EARLY RETURN
        }

        return (

            <div className="submit-import-key-mgmt-block" >
                <div style={ { fontWeight: "bold" } }>
                    Submit Import Program Key
                </div>
                <div >
                    Manage the key that is required for use with the Submit Import Program.
                </div>
                <div >
                    (If the Submit Import Program is not used, then this key is not needed)
                </div>

                { ( this.state.show_LoadingMessage ) ? (

                    <div  style={ { marginTop: 10 } }>
                        Loading...
                    </div>

                ) : ( this.state.show_SavingMessage ) ? (
                    <div  style={ { marginTop: 10 } }>
                        Saving...
                    </div>

                ) : (

                    ( ! this.state.submitImportKey ) ? (

                        //  NO Key for user

                        <div  style={ { marginTop: 10 } }>
                            <button
                                onClick={
                                    event => {
                                        this._addSubmitImportProgramKey();
                                    }
                                }
                            >
                                Create Key
                            </button>
                        </div>

                    ) : (

                        //  YES Key for user

                        <div id="submit_import_program_key_change_remove_key__block">
                            <div style={ { marginTop: 10, marginBottom: 10 } }>
                                <span style={ { fontWeight: "bold" } }>
                                    Current Key:
                                </span>
                                <span > </span>

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
                            <div >
                                <button
                                    onClick={
                                        event => {
                                            this._changeSubmitImportProgramKey();
                                        }
                                    }
                                >
                                    Change Key
                                </button>
                                <span > </span>
                                <button
                                    onClick={
                                        event => {
                                            this._removeSubmitImportProgramKey();
                                        }
                                    }
                                >
                                    Remove Key
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }
}
