/**
 * user_login_form_main_display_Component.tsx
 */


import React from "react";


export const User_login_form_main_display_Component = function () {

    return (
        <div>

            <div style={ { position: "relative" } } className="page-label">
                <div className="error-message-container error_message_container_jq"
                     id="error_message_login_username_required">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">Username is required</div>
                    </div>
                </div>
                <div className="error-message-container error_message_container_jq"
                     id="error_message_login_password_required">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">Password is required</div>
                    </div>
                </div>
                <div className="error-message-container error_message_container_jq"
                     id="error_message_login_username_or_login_password_invalid">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">Username or Password is invalid</div>
                    </div>
                </div>
                <div className="error-message-container error_message_container_jq" id="error_message_user_disabled">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">User disabled</div>
                    </div>
                </div>
                <div className="error-message-container error_message_container_jq" id="error_message_no_local_account">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">No account on Limelight</div>
                    </div>
                </div>
                <div className="error-message-container error_message_container_jq" id="error_message_system_error">
                    <div className="error-message-inner-container">
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text">System Error</div>
                    </div>
                </div>
                Please Sign In
            </div>

            <div id="main_spinner_block"></div>

            <div>

                <form id="login_form" action="">

                    <input type="text" id="login_username" placeholder="Username" className="input-field input_field_jq"
                           maxLength={ 40 }/><br/>  {/*  size="20" size controlled by CSS  */}
                    <input type="password" id="login_password" placeholder="Password"
                           className="input-field input_field_jq"
                           maxLength={ 40 }/><br/>   {/*  size="20" size controlled by CSS  */}

                    <input type="submit" className="submit-button" value="Sign In" id="login_person_button"/>
                </form>


            </div>
        </div>
    )
}