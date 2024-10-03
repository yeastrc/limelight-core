/**
 * createUserAccount_Main_Common_Component.tsx
 */


import React from "react";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export interface CreateUserAccount_Main_Common_Component_Props {

    createFor_YES_Invite: boolean  //  True YES Invite.  False NO invite

    showInvitedMessage: boolean
    google_RecaptchaSiteKey: string

}

/**
 *
 */
interface CreateUserAccount_Main_Common_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
export class CreateUserAccount_Main_Common_Component extends React.Component< CreateUserAccount_Main_Common_Component_Props, CreateUserAccount_Main_Common_Component_State > {



    private readonly _firstName_Ref: React.RefObject<HTMLInputElement>
    private readonly _lastName_Ref: React.RefObject<HTMLInputElement>
    private readonly _organization_Ref: React.RefObject<HTMLInputElement>
    private readonly _email_Ref: React.RefObject<HTMLInputElement>
    private readonly _username_Ref: React.RefObject<HTMLInputElement>
    private readonly _password_Ref: React.RefObject<HTMLInputElement>
    private readonly _passwordConfirm_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor( props: CreateUserAccount_Main_Common_Component_Props ) {
        super( props );


        this._firstName_Ref = React.createRef();
        this._lastName_Ref = React.createRef();
        this._organization_Ref = React.createRef();
        this._email_Ref = React.createRef();
        this._username_Ref = React.createRef();
        this._password_Ref = React.createRef();
        this._passwordConfirm_Ref = React.createRef();

        this.state = { force_Rerender_Object: {} }
    }

    /**
     *
     */
    render() {
        return (
            <div>
                { ! this.props.createFor_YES_Invite ? (
                    <div
                        id="create_account_loading_message_div"
                        style={ { fontSize: 22, marginTop: 40, marginBottom: 40 } }
                    >
                        Loading Data for Form...
                    </div>
                ) : null }
                <div id="create_account_outermost_container_div" style={ { display: this.props.createFor_YES_Invite ? "" : "none" } }>
                    <div  style={ { position: "relative" } } className="page-label">
                        <div className="error-message-container error_message_container_jq" id="error_message_recaptcha_required">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >Recaptcha must be completed
                                <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>
                        <div className="error-message-container error_message_container_jq" id="error_message_all_fields_required">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >All fields are required
                                <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>
                        <div className="error-message-container error_message_container_jq" id="error_message_password_confirm_password_not_match">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >Password and Confirm Password must match
                                <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>

                        <div className="error-message-container error_message_container_jq" id="error_message_username_taken">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >Username already taken
                                <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>
                        <div className="error-message-container error_message_container_jq" id="error_message_email_taken">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >Email address already taken
                                <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>
                        <div className="error-message-container error_message_container_jq" id="error_message_username_email_taken">
                            <div className="error-message-inner-container" >
                                <span className="error-message-text" >Username already taken.  Email address already taken.
                                    <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>

                        <div className="error-message-container error_message_container_jq" id="error_message_from_server">
                            <div className="error-message-inner-container" >
                                <div className="error-message-close-x error_message_close_x_jq">X</div>
                                <div className="error-message-text" id="error_message_from_server_text"></div>
                            </div>
                        </div>

                        <div className="error-message-container error_message_container_jq" id="error_message_system_error">
                            <div className="error-message-inner-container" >
                    <span className="error-message-text" >System Error
                        <span className="error-message-close-x error_message_close_x_jq">X</span></span>
                            </div>
                        </div>

                        <div className="success-message-container error_message_container_jq" id="success_message_system_success">
                            <div className="success-message-inner-container" >
                                <div className="success-message-close-x error_message_close_x_jq">X</div>
                                <div className="success-message-text" >Account Created</div>
                            </div>
                        </div>

                        Create new user
                    </div>

                    { this.props.showInvitedMessage ? (
                        <div className="page-text">
                            You have been invited to <span className="Limelight-DB-text" >limelight DB</span>.  Fill out the form below to create an account.
                        </div>
                    ) : null }

                    <form
                        action=""
                        id="create_account_form"
                        // onSubmit={ event => {
                        //     event.preventDefault()
                        //     event.stopPropagation()
                        //
                        //     sss
                        // }}
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "First name"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._firstName_Ref } type="text" id="firstName" placeholder="First name" className="input-field input_field_jq" maxLength={ 40 }/>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Last name"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._lastName_Ref } type="text" id="lastName" placeholder="Last name" className="input-field input_field_jq" maxLength={ 60 }/>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Organization"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._organization_Ref } type="text" id="organization" placeholder="Organization" className="input-field input_field_jq" maxLength={ 2000 } />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Email address"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._email_Ref } type="text" id="email" placeholder="Email address" className="input-field input_field_jq" maxLength={ 255 } />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Username"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._username_Ref } type="text" id="username" placeholder="Username" className="input-field input_field_jq" maxLength={ 40 } />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Password"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._password_Ref } type="password" id="password" placeholder="Password" className="input-field input_field_jq" maxLength={ 40 } />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Confirm Password"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input ref={ this._passwordConfirm_Ref } type="password" id="passwordConfirm" placeholder="Confirm Password" className="input-field input_field_jq" maxLength={ 40 } />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <br/>

                        { this.props.google_RecaptchaSiteKey ? (
                            <div style={ { textAlign: "center" } } id="limelight_google_recaptcha_container_div">
                                <div className="page-text">
                                    <div className="g-recaptcha"
                                         data-sitekey={ this.props.google_RecaptchaSiteKey }></div>
                                </div>
                            </div>
                        ) : null }

                        <input type="submit" className="submit-button" value="Create Account" id="create_account_button"/>
                    </form>

                </div>
            </div>
        )
    }

}