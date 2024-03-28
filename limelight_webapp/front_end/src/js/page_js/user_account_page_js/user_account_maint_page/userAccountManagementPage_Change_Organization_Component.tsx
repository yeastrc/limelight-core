/**
 * userAccountManagementPage_Change_Organization_Component.tsx
 *
 * React Component for userAccountManagement.jsp page - Change Organization
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


///////

export interface UserAccountManagementPage_Change_Organization_Component_Change_Callback_Params {
    newOrganization: string
}

type UserAccountManagementPage_Change_Organization_Component_Change_Callback =
    (params: UserAccountManagementPage_Change_Organization_Component_Change_Callback_Params) => void

/**
 *
 */
export const userAccountManagementPage_Change_Organization_Component__openOverlay = function (
    {
        position_top,
        position_left,
        change_Callback,
        cancel_Callback
    } : {
        position_top: number
        position_left: number
        change_Callback: UserAccountManagementPage_Change_Organization_Component_Change_Callback
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

    const change_Callback_Local = ( params : UserAccountManagementPage_Change_Organization_Component_Change_Callback_Params ) => {

        const newOrganization: string = params.newOrganization;

        addedOverlay.removeContents_AndContainer_FromDOM();

        change_Callback({ newOrganization });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        cancel_Callback()
    }

    const componentToAdd = (
        <UserAccountManagementPage_Change_Organization_Component
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
interface UserAccountManagementPage_Change_Organization_Component_Props {

    position_top: number
    position_left: number

    change_Callback: UserAccountManagementPage_Change_Organization_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface UserAccountManagementPage_Change_Organization_Component_State {

    organization_InProgress? : string
    organization_InvalidValue?: boolean

    duplicateOrganizationEncountered?: boolean

    show_LoadingMessage?: boolean
    showError_ReadingData?: boolean
    show_SavingMessage?: boolean
}

/**
 *
 */
class UserAccountManagementPage_Change_Organization_Component extends React.Component< UserAccountManagementPage_Change_Organization_Component_Props, UserAccountManagementPage_Change_Organization_Component_State > {

    private _organization_Input_Changed_BndThis = this._organization_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _organization_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _organization_FromServer : string;

    private _organization_InvalidValue : boolean = false;

    /**
     *
     */
    constructor(props: UserAccountManagementPage_Change_Organization_Component_Props) {
        super(props)

        this._organization_Input_Ref = React.createRef<HTMLInputElement>();

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

            this.setState({ organization_InProgress: result.organization, show_LoadingMessage: false });

            this._organization_FromServer = result.organization;
        })
    }

    /**
     *
     */
    private _get_Organization_InputField_AndValidate() : {
        organizationValue: string
        isValid: boolean
    } {

        const organization_Value = this._organization_Input_Ref.current.value.trim();

        //  Empty string allowed

        // if ( organization_Value.length === 0 ) {
        //
        //     this.setState({ organization_InvalidValue: true });
        //     this._organization_InvalidValue = true;
        //
        //     return { isValid: false, organizationValue: null };  // EARLY EXIT
        // }

        this.setState({ organization_InvalidValue: false });
        this._organization_InvalidValue = false;

        return { isValid: true, organizationValue: organization_Value }
    }

    /**
     *
     */
    private _organization_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        const  {
            organizationValue,
            isValid
        } = this._get_Organization_InputField_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            const  {
                organizationValue,
                isValid
            } = this._get_Organization_InputField_AndValidate();

            if ( ! isValid ) {

                this.setState({ organization_InvalidValue: true });
                this._organization_InvalidValue = true;

                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                organization : organizationValue
            };

            const url = "user/rws/for-page/user-change-account-info";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({newOrganization: organizationValue});

                        return;  // EARLY RETURN
                    }

                    if ( responseData.organizationValueAlreadyExists ) {

                        this.setState({ duplicateOrganizationEncountered: true, show_SavingMessage: false });

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
        if (this.state.organization_InvalidValue || this.state.organization_InProgress === "") {
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
                                        Organization:&nbsp;
                                    </span>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ 255 }
                                               autoFocus={ true }
                                               ref={ this._organization_Input_Ref }
                                               defaultValue={ ( this.state.organization_InProgress ) ?  this.state.organization_InProgress : "" }
                                               onChange={ this._organization_Input_Changed_BndThis }
                                        />
                                    </span>
                                </div>

                                <div style={ { marginTop: 5 }}>
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <button type="submit"
                                            disabled={ saveButton_Disabled }
                                        >
                                            Save
                                        </button>
                                        { ( saveButton_Disabled ) ? (
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                                title="Enter an last name to enable 'Save'"
                                            >
                                            </div>
                                        ) : null }
                                    </div>
                                    <span > </span>
                                    <button
                                        onClick={ ( event) => {
                                            this.props.change_Callback({ newOrganization: this._organization_FromServer })
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
