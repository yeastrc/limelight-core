/**
 * userAccountManagementPage_Change_LastName_Component.tsx
 *
 * React Component for userAccountManagement.jsp page - Change LastName
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

export interface UserAccountManagementPage_Change_LastName_Component_Change_Callback_Params {
    newLastName: string
}

type UserAccountManagementPage_Change_LastName_Component_Change_Callback =
    (params: UserAccountManagementPage_Change_LastName_Component_Change_Callback_Params) => void

/**
 *
 */
export const userAccountManagementPage_Change_LastName_Component__openOverlay = function (
    {
        position_top,
        position_left,
        change_Callback,
        cancel_Callback
    } : {
        position_top: number
        position_left: number
        change_Callback: UserAccountManagementPage_Change_LastName_Component_Change_Callback
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

    const change_Callback_Local = ( params : UserAccountManagementPage_Change_LastName_Component_Change_Callback_Params ) => {

        const newLastName: string = params.newLastName;

        addedOverlay.removeContents_AndContainer_FromDOM();

        change_Callback({ newLastName });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        cancel_Callback()
    }

    const componentToAdd = (
        <UserAccountManagementPage_Change_LastName_Component
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
interface UserAccountManagementPage_Change_LastName_Component_Props {

    position_top: number
    position_left: number

    change_Callback: UserAccountManagementPage_Change_LastName_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface UserAccountManagementPage_Change_LastName_Component_State {

    lastName_InProgress? : string
    lastName_InvalidValue?: boolean

    duplicateLastNameEncountered?: boolean

    show_LoadingMessage?: boolean
    showError_ReadingData?: boolean
    show_SavingMessage?: boolean
}

/**
 *
 */
class UserAccountManagementPage_Change_LastName_Component extends React.Component< UserAccountManagementPage_Change_LastName_Component_Props, UserAccountManagementPage_Change_LastName_Component_State > {

    private _lastName_Input_Changed_BndThis = this._lastName_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _lastName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _lastName_FromServer : string;

    private _lastName_InvalidValue : boolean = false;

    /**
     *
     */
    constructor(props: UserAccountManagementPage_Change_LastName_Component_Props) {
        super(props)

        this._lastName_Input_Ref = React.createRef<HTMLInputElement>();

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

            this.setState({ lastName_InProgress: result.lastName, show_LoadingMessage: false });

            this._lastName_FromServer = result.lastName;
        })
    }

    /**
     *
     */
    private _get_LastName_InputField_AndValidate() : {
        lastNameValue: string
        isValid: boolean
    } {

        const lastName_Value = this._lastName_Input_Ref.current.value.trim();

        if ( lastName_Value.length === 0 ) {

            this.setState({ lastName_InvalidValue: true });
            this._lastName_InvalidValue = true;

            return { isValid: false, lastNameValue: null };  // EARLY EXIT
        }

        this.setState({ lastName_InvalidValue: false });
        this._lastName_InvalidValue = false;

        return { isValid: true, lastNameValue: lastName_Value }
    }

    /**
     *
     */
    private _lastName_Input_Changed(event: React.ChangeEvent<HTMLInputElement>) : void {

        const  {
            lastNameValue,
            isValid
        } = this._get_LastName_InputField_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            const  {
                lastNameValue,
                isValid
            } = this._get_LastName_InputField_AndValidate();

            if ( ! isValid ) {

                this.setState({ lastName_InvalidValue: true });
                this._lastName_InvalidValue = true;

                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                lastName : lastNameValue
            };

            const url = "user/rws/for-page/user-change-account-info";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({newLastName: lastNameValue});

                        return;  // EARLY RETURN
                    }

                    if ( responseData.lastNameValueAlreadyExists ) {

                        this.setState({ duplicateLastNameEncountered: true, show_SavingMessage: false });

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
        if (this.state.lastName_InvalidValue || this.state.lastName_InProgress === "") {
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
                                        Last Name:&nbsp;
                                    </span>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ 255 }
                                               autoFocus={ true }
                                               ref={ this._lastName_Input_Ref }
                                               defaultValue={ ( this.state.lastName_InProgress ) ?  this.state.lastName_InProgress : "" }
                                               onChange={ this._lastName_Input_Changed_BndThis }
                                        />
                                    </span>
                                    { (this.state.lastName_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Last Name is invalid.
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
                                                    "Enter an last name to enable 'Save'"
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
                                            this.props.change_Callback({ newLastName: this._lastName_FromServer })
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
