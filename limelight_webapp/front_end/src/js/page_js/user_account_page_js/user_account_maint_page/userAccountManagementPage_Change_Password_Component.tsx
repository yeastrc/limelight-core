/**
 * userAccountManagementPage_Change_Password_Component.tsx
 *
 * React Component for userAccountManagement.jsp page - Change Password
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


///////

/**
 *
 */
export const userAccountManagementPage_Change_Password_Component__openOverlay = function (
    {
        position_top,
        position_left
    } : {
        position_top: number
        position_left: number
    }) : void {

    if ( position_top > window.innerHeight - 160 ) {
        position_top = window.innerHeight - 160;
    }
    if ( position_top < 10 ) {
        position_top = 10;
    }

    if ( position_left < 10 ) {
        position_left = 10;
    }
    if ( position_left > 100 ) {
        position_left = 100;
    }

    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const close_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();
    }

    const componentToAdd = (
        <UserAccountManagementPage_Change_Password_Component
            position_top={ position_top }
            position_left={ position_left }
            close_Callback={ close_Callback_Local }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}

///////

/**
 *
 */
interface UserAccountManagementPage_Change_Password_Component_Props {

    position_top: number
    position_left: number

    close_Callback: () => void
}

/**
 *
 */
interface UserAccountManagementPage_Change_Password_Component_State {

    new_password_Confirm_InvalidValue?: boolean
    oldPasswordIncorrect?: boolean

    show_SavingMessage?: boolean

    force_ReRender?: object
}

/**
 *
 */
class UserAccountManagementPage_Change_Password_Component extends React.Component< UserAccountManagementPage_Change_Password_Component_Props, UserAccountManagementPage_Change_Password_Component_State > {

    private _password_Input_Changed_BndThis = this._password_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _password_Old_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()
    private _password_New_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()
    private _password_NewConfirm_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _enableSaveButton = false
    private _mainBlock_VisibilityShow = false

    /**
     *
     */
    constructor(props: UserAccountManagementPage_Change_Password_Component_Props) {
        super(props)

        this._password_Old_Input_Ref = React.createRef<HTMLInputElement>();
        this._password_New_Input_Ref = React.createRef<HTMLInputElement>();
        this._password_NewConfirm_Input_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            force_ReRender: {}
        }
    }

    componentDidMount() {

        window.setTimeout( () => {
            // Delay show to not have tooltip display on overlay open due to tooltip positioning problem

            this._mainBlock_VisibilityShow = true

            this.setState({ force_ReRender: {} })

        }, 10 )
    }

    /**
     *
     */
    private _get_Password_InputField_AndValidate() : {
        oldPasswordValue: string
        newPasswordValue: string
        isValid: boolean
    } {
        this._enableSaveButton = false

        const old_password_Value = this._password_Old_Input_Ref.current.value;
        const new_password_Value = this._password_New_Input_Ref.current.value;
        const newConfirm_password_Value = this._password_NewConfirm_Input_Ref.current.value;

        if ( new_password_Value.length === 0 ) {
            if ( new_password_Value !== newConfirm_password_Value ) {
                this.setState( { new_password_Confirm_InvalidValue: true } );
            } else {
                this.setState( { new_password_Confirm_InvalidValue: false } );
            }
            this.setState({ force_ReRender: {} })
            return { isValid: false, oldPasswordValue: null, newPasswordValue: null };  // EARLY EXIT
        }

        if ( newConfirm_password_Value.length === 0 ) {
            if ( new_password_Value !== newConfirm_password_Value ) {
                this.setState( { new_password_Confirm_InvalidValue: true } );
            } else {
                this.setState( { new_password_Confirm_InvalidValue: false } );
            }
            this.setState({ force_ReRender: {} })
            return { isValid: false, oldPasswordValue: null, newPasswordValue: null };  // EARLY EXIT
        }

        if ( new_password_Value !== newConfirm_password_Value ) {

            this.setState({ new_password_Confirm_InvalidValue: true });
            this.setState({ force_ReRender: {} })
            return { isValid: false, oldPasswordValue: null, newPasswordValue: null };  // EARLY EXIT
        }

        if ( old_password_Value.length === 0 ) {

            this.setState({ force_ReRender: {} })
            return { isValid: false, oldPasswordValue: null, newPasswordValue: null };  // EARLY EXIT
        }

        this._enableSaveButton = true

        this.setState({ new_password_Confirm_InvalidValue: false });

        this.setState({ force_ReRender: {} })

        return { isValid: true, oldPasswordValue: old_password_Value, newPasswordValue: new_password_Value }
    }

    /**
     *
     */
    private _password_Input_Changed(event: React.ChangeEvent<HTMLInputElement>) : void {

        this._get_Password_InputField_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            const  {
                oldPasswordValue,
                newPasswordValue,
                isValid
            } = this._get_Password_InputField_AndValidate();

            if ( ! isValid ) {

                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                password : newPasswordValue,
                oldPassword : oldPasswordValue
            };

            const url = "user/rws/for-page/user-change-account-info";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.close_Callback();

                        return;  // EARLY RETURN
                    }

                    if ( responseData.oldPasswordInvalid ) {

                        this._enableSaveButton = false

                        this.setState({ oldPasswordIncorrect: true, show_SavingMessage: false });

                        return;  // EARLY RETURN
                    }

                    throw Error("Status False NOT handled")

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const mainBlock_Style : React.CSSProperties = { padding: 20, position: "relative" }

        if ( ! this._mainBlock_VisibilityShow ) {
            mainBlock_Style.visibility = "hidden"
        }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >

                    <div style={ mainBlock_Style }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >
                            <div>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Old Password"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <input type="password" placeholder="Old Password"
                                           className="edit-value-input-field  "
                                           maxLength={ 40 }
                                           autoFocus={true}
                                           ref={ this._password_Old_Input_Ref }
                                           defaultValue={ "" }
                                           onChange={ this._password_Input_Changed_BndThis }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                { ( this.state.oldPasswordIncorrect ) ? (
                                    <span style={ { color: "red", whiteSpace: "nowrap", marginLeft: 10 } }>
                                        Old Password is Incorrect
                                    </span>
                                ) : null }
                            </div>
                            <div style={ { marginTop: 5 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "New Password"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <input type="password" placeholder="New Password"
                                           className="edit-value-input-field  "
                                           maxLength={ 40 }
                                           ref={ this._password_New_Input_Ref }
                                           defaultValue={ "" }
                                           onChange={ this._password_Input_Changed_BndThis }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>
                            <div style={ { marginTop: 5, marginBottom: 6 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Confirm New Password"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <input type="password" placeholder="Confirm New Password"
                                           className="edit-value-input-field  "
                                           maxLength={ 40 }
                                           ref={ this._password_NewConfirm_Input_Ref }
                                           defaultValue={ "" }
                                           onChange={ this._password_Input_Changed_BndThis }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                { ( this.state.new_password_Confirm_InvalidValue ) ? (
                                    <span style={ { color: "red", whiteSpace: "nowrap", marginLeft: 10 } }>
                                        The new password and confirm password do not match
                                    </span>
                                ) : null }
                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ ! this._enableSaveButton }
                                    >
                                        Save
                                    </button>
                                    { ( ! this._enableSaveButton ) ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Enter an old password and matching new password and confirm new password to enable 'Save'"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            >
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    ) : null }
                                </div>
                                <span > </span>
                                <button
                                    onClick={ ( event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        this.props.close_Callback()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Cover Div while updating server */}

                            { this.state.show_SavingMessage ? (

                                <div style={
                                    {
                                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0 ,
                                        backgroundColor: "white", textAlign: "center", paddingTop: 50, fontSize: 24
                                    }
                                } >
                                    Saving Data
                                </div>
                            ) : null }

                        </form>

                    </div>

                </div>
            </div>

        )
    }
}
