/**
 * user_reset_password_form_main_display_Component.tsx
 */


import React from "react";
import { hideAllErrorMessages, showErrorMsg } from "page_js/common_all_pages/showHideErrorMessage";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

/**
 *
 */
export interface User_reset_password_form_main_display_Component_Props {

    placeHolder?: unknown
}

/**
 *
 */
interface User_reset_password_form_main_display_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
export class User_reset_password_form_main_display_Component extends React.Component< User_reset_password_form_main_display_Component_Props, User_reset_password_form_main_display_Component_State > {

    private readonly _reset_password_username_Ref: React.RefObject<HTMLInputElement>
    private readonly _reset_password_email_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor( props: User_reset_password_form_main_display_Component_Props ) {
        super( props );

        this._reset_password_username_Ref = React.createRef();
        this._reset_password_email_Ref = React.createRef();

        this.state = { force_Rerender_Object: {} }
    }


    /**
     *
     */
    _personForgotPasswordFormSubmit() {

        this._resetPassword();
    };

    /**
     *
     */
    _resetPassword() {

        const objectThis = this;

        hideAllErrorMessages();


        var username = this._reset_password_username_Ref.current.value;
        var email = this._reset_password_email_Ref.current.value

        if ( username === "" && email === "" ) {
            var $element = $("#error_message_username_or_email_required");
            showErrorMsg( $element );
            return;  //  !!!  EARLY EXIT
        }

        if ( username !== "" && email !== "" ) {
            var $element = $("#error_message_username_and_email_both_populated");
            showErrorMsg( $element );
            return;  //  !!!  EARLY EXIT
        }

        var requestObj = {
            username : username,
            email : email
        };

        const url = "user/rws/for-page/reset-password-gen-email";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, doNotHandleErrorResponse : true, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {

            var $element = $("#error_message_system_error");
            showErrorMsg( $element );
        }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                objectThis._resetPasswordComplete( requestObj, responseData );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    };

    /**
     *
     */
    _resetPasswordComplete(requestObj, responseData) {

        if ( ! responseData.status ) {

//			private boolean invalidUserOrPassword = false;
//			private boolean disabledUser = false;

            if ( responseData.invalidUsernameOrEmail ) {

                var id = null;
                if ( requestObj.username !== ""  ) {

                    id = "error_message_username_invalid";
                } else {
                    id = "error_message_email_invalid";
                }
                var $element = $( "#" + id );

                showErrorMsg( $element );

            } else if ( responseData.disabledUser ) {

                var $element = $("#error_message_user_disabled");
                showErrorMsg( $element );
            } else {
                var $element = $("#error_message_system_error");
                showErrorMsg( $element );
            }
            return;

        }

        var $element = $("#success_message_system_success");

        showErrorMsg( $element );
    };



    /**
     *
     */
    render() {
        return (
            <div>
                <div style={ { position: "relative" } } className="page-label">

                    <div className="error-message-container error_message_container_jq"
                         id="error_message_username_or_email_required">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Username or Email Address is required</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq"
                         id="error_message_username_and_email_both_populated">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Cannot populate both Username and Email Address</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq"
                         id="error_message_username_invalid">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Username provided is invalid</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq"
                         id="error_message_email_invalid">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">Email Address provided is invalid</div>
                        </div>
                    </div>
                    <div className="error-message-container error_message_container_jq" id="error_message_system_error">
                        <div className="error-message-inner-container">
                            <div className="error-message-close-x error_message_close_x_jq">X</div>
                            <div className="error-message-text">System Error</div>
                        </div>
                    </div>

                    <div className="success-message-container error_message_container_jq"
                         id="success_message_system_success">
                        <div className="success-message-inner-container">
                            <div className="success-message-close-x error_message_close_x_jq">X</div>
                            <div className="success-message-text">Email sent</div>
                        </div>
                    </div>
                    Reset your password
                </div>


                <form
                    action=""
                    onSubmit={ event => {
                        event.preventDefault()

                        this._personForgotPasswordFormSubmit()
                    }}
                >
                    <div>
                        <input
                            ref={ this._reset_password_username_Ref }
                            type="text"
                            placeholder="Username"
                            className="input-field "
                            maxLength={ 40 }
                            autoFocus={ true }
                        />  {/*  size="20" size controlled by CSS  */}
                    </div>
                    <div className="page-label" style={ { margin: 0, padding: 0, marginBottom: 3 } }>
                        or
                    </div>
                    <div>
                        <input
                            ref={ this._reset_password_email_Ref }
                            type="text"
                            placeholder="Email Address"
                            className="input-field "
                            maxLength={ 255 }
                        /><br/> {/*  size="20" size controlled by CSS */}
                    </div>

                    <input
                        type="submit"
                        className="submit-button"
                        value="Reset Password"
                    />
                </form>

                <div className="page-text" style={ { marginBottom: 10 } }>
                    A link will be emailed to you for resetting your password. The link is valid for 24 hours.
                </div>

            </div>
        )
    }

}