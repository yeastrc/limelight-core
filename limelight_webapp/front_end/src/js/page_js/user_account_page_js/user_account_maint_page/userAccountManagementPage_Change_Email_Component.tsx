/**
 * userAccountManagementPage_Change_Email_Component.tsx
 *
 * React Component for userAccountManagement.jsp page - Change Email
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {userAccountManagementPage_GetUserInfo_FreshLoad} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_GetUserInfo_FreshLoad";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


///////

export interface UserAccountManagementPage_Change_Email_Component_Change_Callback_Params {
    newEmail: string
}

type UserAccountManagementPage_Change_Email_Component_Change_Callback =
    (params: UserAccountManagementPage_Change_Email_Component_Change_Callback_Params) => void

/**
 *
 */
export const userAccountManagementPage_Change_Email_Component__openOverlay = function (
    {
        position_top,
        position_left,
        change_Callback,
        cancel_Callback
    } : {
        position_top: number
        position_left: number
        change_Callback: UserAccountManagementPage_Change_Email_Component_Change_Callback
        cancel_Callback: () => void
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

    const change_Callback_Local = ( params : UserAccountManagementPage_Change_Email_Component_Change_Callback_Params ) => {

        const newEmail: string = params.newEmail;

        addedOverlay.removeContents_AndContainer_FromDOM();

        change_Callback({ newEmail });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        cancel_Callback()
    }

    const componentToAdd = (
        <UserAccountManagementPage_Change_Email_Component
            position_top={ position_top }
            position_left={ position_left }
            change_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}

///////

/**
 *
 */
interface UserAccountManagementPage_Change_Email_Component_Props {

    position_top: number
    position_left: number

    change_Callback: UserAccountManagementPage_Change_Email_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface UserAccountManagementPage_Change_Email_Component_State {

    email_InProgress? : string
    email_InvalidValue?: boolean

    duplicateEmailEncountered?: boolean

    show_LoadingMessage?: boolean
    showError_ReadingData?: boolean
    show_SavingMessage?: boolean
}

/**
 *
 */
class UserAccountManagementPage_Change_Email_Component extends React.Component< UserAccountManagementPage_Change_Email_Component_Props, UserAccountManagementPage_Change_Email_Component_State > {

    private _email_Input_Changed_BndThis = this._email_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _email_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _email_FromServer : string;

    private _email_InvalidValue : boolean = false;

    /**
     *
     */
    constructor(props: UserAccountManagementPage_Change_Email_Component_Props) {
        super(props)

        this._email_Input_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            show_LoadingMessage: true
        }
    }

    /**
     *
     */
    componentDidMount() {

        const promise = userAccountManagementPage_GetUserInfo_FreshLoad();

        promise.catch( reason => {
            this.setState({ show_LoadingMessage: false, showError_ReadingData: true });
            // throw Error("Failed to get User Info");
        })

        promise.then( (result) => {

            this.setState({ email_InProgress: result.email, show_LoadingMessage: false });

            this._email_FromServer = result.email;
        })
    }

    /**
     *
     */
    private _get_Email_InputField_AndValidate() : {
        emailValue: string
        isValid: boolean
    } {

        const email_Value = this._email_Input_Ref.current.value.trim();

        if ( email_Value.length === 0 ) {

            this.setState({ email_InvalidValue: true });
            this._email_InvalidValue = true;

            return { isValid: false, emailValue: null };  // EARLY EXIT
        }

        this.setState({ email_InvalidValue: false });
        this._email_InvalidValue = false;

        return { isValid: true, emailValue: email_Value }
    }

    /**
     *
     */
    private _email_Input_Changed(event: React.ChangeEvent<HTMLInputElement>) : void {

        const  {
            emailValue,
            isValid
        } = this._get_Email_InputField_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            const  {
                emailValue,
                isValid
            } = this._get_Email_InputField_AndValidate();

            if ( ! isValid ) {

                this.setState({ email_InvalidValue: true });
                this._email_InvalidValue = true;

                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                email : emailValue
            };

            const url = "user/rws/for-page/user-change-account-info";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {
                        this.props.change_Callback({newEmail: emailValue});

                        return;  // EARLY RETURN
                    }

                    if ( responseData.emailValueAlreadyExists ) {

                        this.setState({ duplicateEmailEncountered: true, show_SavingMessage: false });

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

        let saveButton_Disabled = false;
        if (this.state.email_InvalidValue || this.state.email_InProgress === "") {
            saveButton_Disabled = true;
        }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >

                    { ( this.state.show_LoadingMessage ) ? (
                        <div style={ { padding: 20, position: "relative" } }>
                            LOADING...
                        </div>
                    ) : ( this.state.showError_ReadingData ) ? (
                        <div style={ { padding: 20, position: "relative" } }>
                            Error Loading Data.  Please reload page and try again.
                        </div>

                    ) : (

                        <div style={ { padding: 20, position: "relative" } }>

                            <form
                                onSubmit={ this._formSubmit_BindThis }
                            >
                                <div>
                                    <span>
                                        Email:&nbsp;
                                    </span>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ 255 }
                                               autoFocus={ true }
                                               ref={ this._email_Input_Ref }
                                               defaultValue={ ( this.state.email_InProgress ) ?  this.state.email_InProgress : "" }
                                               onChange={ this._email_Input_Changed_BndThis }
                                        />
                                    </span>
                                    { (this.state.email_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Email is invalid.
                                        </span>
                                    ) : (this.state.duplicateEmailEncountered ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Email is already in use.
                                        </span>
                                    ) : null }
                                </div>

                                <div style={ { marginTop: 5 }}>
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <button type="submit"
                                            disabled={ saveButton_Disabled }
                                        >
                                            Save
                                        </button>
                                        { ( saveButton_Disabled ) ? (
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    "Enter an email to enable 'Save'"
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
                                            this.props.change_Callback({ newEmail: this._email_FromServer })
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

                    )}  {/*   END:  Else of Is Loading   */}

                </div>
            </div>

        )
    }
}
