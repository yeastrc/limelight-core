/**
 * user_login_form_public_access_code_Component.tsx
 */


import React from "react";
import { hideAllErrorMessages, showErrorMsg } from "page_js/showHideErrorMessage";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { createSpinner, destroySpinner } from "page_js/common_all_pages/spinner";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

/**
 *
 */
export interface User_login_form_public_access_code_Component_Props {

    openSignin_Link_Clicked_Callback: () => void
}

/**
 *
 */
interface User_login_form_public_access_code_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
export class User_login_form_public_access_code_Component extends React.Component< User_login_form_public_access_code_Component_Props, User_login_form_public_access_code_Component_State > {

    private readonly _public_access_code_value_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor( props: User_login_form_public_access_code_Component_Props ) {
        super( props );

        this._public_access_code_value_Ref = React.createRef();

        this.state = { force_Rerender_Object: {} }
    }


    /**
     *
     */
    public_access_code_formSubmit() {

        this.process_PublicAccessCode_Entered();
    };

    /**
     *
     */
    process_PublicAccessCode_Entered() {

        var objectThis = this;

        const sign_in_page_project_idDOM = document.getElementById("sign_in_page_project_id")
        if ( ! sign_in_page_project_idDOM ) {
            throw Error("No DOm element with id 'sign_in_page_project_id'")
        }

        const projectIdString = sign_in_page_project_idDOM.innerText;

        const projectId : number = Number.parseInt( projectIdString );
        if ( Number.isNaN( projectId )) {
            throw Error("Failed to parse number in DOM element with id 'sign_in_page_project_id'. contents: " + projectIdString );
        }

        var public_access_code_value = this._public_access_code_value_Ref.current.value
        if ( public_access_code_value.trim() === "" ) {
            return;  //  !!!  EARLY EXIT
        }

        createSpinner(); // external function

        var requestObj = { public_access_code_value, projectId };

        const url = "user/rws/for-page/process_public_access_code_value";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {

            destroySpinner(); // external function
        }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                objectThis.process_PublicAccessCode_EnteredResponse(responseData);

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    };

    /**
     *
     */
    process_PublicAccessCode_EnteredResponse(responseData) {

        if ( responseData.success ) {
            let currentPageHref = window.location.href;

            if ( currentPageHref.includes( "/user/login" ) ) {
                window.location.href = "d/pg/project-list";
                return;
            } else {
                //  Were forwarded to the login page with some other URL on the browser address bar so just reload the page
                //  reload current URL
                limelight__ReloadPage_Function()
                return;
            }
        }

        destroySpinner(); // external function

        //  Not successful

        if ( responseData.invalidCode ) {
            var $element = $("#error_message_code_invalid");
            showErrorMsg($element);
        } else if ( responseData.invalidCodeForProjectId ) {
            var $element = $("#error_message_code_invalid_for_project_id");
            showErrorMsg($element);

        } else {
            var $element = $("#error_message_system_error");
            showErrorMsg( $element );
        }
    };

    /**
     *
     */
    render() {
        return (
            <div>

                <div style={ { position: "relative" } } className="page-label">

                    <div className="error-message-container error_message_container_jq" id="error_message_code_invalid">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Code is invalid</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq"
                         id="error_message_code_invalid_for_project_id">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Code is invalid for project</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq" id="error_message_system_error">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">System Error</div>
                        </div>
                    </div>

                    Please Enter Reviewer Access Code
                </div>

                <div id="main_spinner_block"></div>

                <div>

                    <form
                        action=""
                        onSubmit={ event => {
                            event.preventDefault()
                            event.stopPropagation()

                            this.public_access_code_formSubmit()
                        }}

                    >
                        <div>
                            <input
                                ref={ this._public_access_code_value_Ref }
                                type="text"
                                placeholder="Reviewer Access Code"
                                className=" input-field "
                                maxLength={ 40 }
                                autoFocus={ true }
                            />{/*  size="20" size controlled by CSS */}
                        </div>

                        <div style={ { position: "relative" } }>
                            <input
                                type="submit"
                                className="submit-button"
                                value="Submit"
                            />
                        </div>
                    </form>

                </div>

                <div style={ { marginTop: 20 } }>

                    <span>If you are a Limelight user, sign in </span>
                    <span
                        className="fake-link "
                        onClick={ event => {
                            event.preventDefault()
                            event.stopPropagation()

                            this.props.openSignin_Link_Clicked_Callback()
                        }}
                    >
                        here
                    </span>
                </div>
            </div>
        )
    }

}