/**
 * userAccountManagementPage_MainPage_Component.tsx
 *
 * Main React Component for userAccountManagement.jsp page
 *
 */


import React from "react";
import {
    userAccountManagementPage_Change_Email_Component__openOverlay,
    UserAccountManagementPage_Change_Email_Component_Change_Callback_Params
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_Email_Component";
import {
    userAccountManagementPage_GetUserInfo_FreshLoad
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_GetUserInfo_FreshLoad";
import {
    userAccountManagementPage_Change_Username_Component__openOverlay,
    UserAccountManagementPage_Change_Username_Component_Change_Callback_Params
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_Username_Component";
import {
    userAccountManagementPage_Change_FirstName_Component__openOverlay,
    UserAccountManagementPage_Change_FirstName_Component_Change_Callback_Params
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_FirstName_Component";
import {
    userAccountManagementPage_Change_LastName_Component__openOverlay,
    UserAccountManagementPage_Change_LastName_Component_Change_Callback_Params
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_LastName_Component";
import {
    userAccountManagementPage_Change_Organization_Component__openOverlay,
    UserAccountManagementPage_Change_Organization_Component_Change_Callback_Params
} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_Organization_Component";
import {userAccountManagementPage_Change_Password_Component__openOverlay} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_Password_Component";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {UserAccountManagementPage_Change_SubmitImportProgramKey_Component} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Change_SubmitImportProgramKey_Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


const USER_LOCAL_USER_DATA_MANAGE_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/user-local-user-data-manage";;


/**
 *  User Info
 *
 *  Webservice response cast to this class and validated in userAccountManagementPage_GetUserInfo_FreshLoad.ts
 */
export class UserAccountManagementPage_UserInfo {

    success: boolean;

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    organization: string;
}

/**
 *
 */
export interface UserAccountManagementPage_MainPage_Component_Props {

}

/**
 *
 */
interface UserAccountManagementPage_MainPage_Component_State {

    userInfo?: UserAccountManagementPage_UserInfo  //  Data loaded from web service
    show_loadingDataMessage?: boolean
    showError_ReadingData?: boolean
    fakeUpdateObject?: object

    displaySendImportCompleteEmailMgmtBlock?: boolean
    sendEmailOnImportFinish?: boolean
    show_Updating_sendEmailOnImportFinish_Message?: boolean
}

/**
 *
 */
export class UserAccountManagementPage_MainPage_Component extends React.Component< UserAccountManagementPage_MainPage_Component_Props, UserAccountManagementPage_MainPage_Component_State > {

    private _firstName_Label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()
    private _lastName_Label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()
    private _emailAddress_Label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()
    private _organization_Label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()
    private _username_Label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: UserAccountManagementPage_MainPage_Component_Props) {
        super(props)

        this._firstName_Label_Div_Ref = React.createRef<HTMLDivElement>();
        this._lastName_Label_Div_Ref = React.createRef<HTMLDivElement>();
        this._emailAddress_Label_Div_Ref = React.createRef<HTMLDivElement>();
        this._organization_Label_Div_Ref = React.createRef<HTMLDivElement>();
        this._username_Label_Div_Ref = React.createRef<HTMLDivElement>();

        let displaySendImportCompleteEmailMgmtBlock = false;
        let sendEmailOnImportFinish = false;

        {
            const display_send_import_complete_email_mgmt_blockDOM = document.getElementById("display_send_import_complete_email_mgmt_block");
            if (display_send_import_complete_email_mgmt_blockDOM) {
                displaySendImportCompleteEmailMgmtBlock = true;
            }
        }
        {
            const send_import_complete_trueDOM = document.getElementById("send_import_complete_true");
            if ( send_import_complete_trueDOM ) {
                sendEmailOnImportFinish = true;
            }
        }

        this.state = {
            show_loadingDataMessage: true,
            displaySendImportCompleteEmailMgmtBlock,
            sendEmailOnImportFinish
        }
    }

    /**
     *
     */
    componentDidMount() {

        const promise = userAccountManagementPage_GetUserInfo_FreshLoad();

        promise.catch( reason => {
            this.setState({ show_loadingDataMessage: false, showError_ReadingData: true })
            // throw Error("Failed to get User Info");
        })

        promise.then( (result) => {
            this.setState({ userInfo: result, show_loadingDataMessage: false })
        })
    }

    /**
     *
     */
    private sendEmailOnImportFinish_InputChanged( sendEmailOnImportFinish: boolean ) {
        try {
            this.setState({ show_Updating_sendEmailOnImportFinish_Message: true });

            const requestData = { sendEmailOnImportFinish }

            const url = USER_LOCAL_USER_DATA_MANAGE_REST_WEBSERVICE_CONTROLLER;

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    this.setState({ show_Updating_sendEmailOnImportFinish_Message: false });

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

        if ( this.state.show_loadingDataMessage ) {

            return (
                <div >
                    Loading Data
                </div>
            )
        }
        if ( this.state.showError_ReadingData ) {

            return (
                <div >
                    Error Loading Data
                </div>
            )
        }

        return (

            <div >
                <div className="top-level-label">Manage Account</div>

                <div className="top-level-label-bottom-border"></div>

                <div className="account-info-block" >

                    <div style={ { display: "grid", gridTemplateColumns: "120px auto" } } >

                        <div className="value-label line-keep-with-next-margin-bottom"
                             ref={ this._firstName_Label_Div_Ref }
                        >
                            First Name:
                        </div>
                        <div  className="current-value-container line-keep-with-next-margin-bottom">
                            <span >
                                { this.state.userInfo.firstName }
                            </span>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Change First Name"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img src="static/images/icon-edit.png" className=" icon-small  fake-link-image "
                                     onClick={ () => {

                                         const buttonContainer_BoundingRect = this._firstName_Label_Div_Ref.current.getBoundingClientRect();

                                         let position_top =  buttonContainer_BoundingRect.top;
                                         let position_left =  buttonContainer_BoundingRect.left;

                                         const change_Callback = ( params : UserAccountManagementPage_Change_FirstName_Component_Change_Callback_Params ) => {

                                             const newFirstName: string = params.newFirstName;

                                             const userInfo = this.state.userInfo;

                                             userInfo.firstName = newFirstName;

                                             this.setState({ fakeUpdateObject: {}, userInfo });
                                         }

                                         userAccountManagementPage_Change_FirstName_Component__openOverlay({
                                             position_left,
                                             position_top,
                                             cancel_Callback: () => {},
                                             change_Callback
                                         })
                                     }}
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div className="value-label line-margin-bottom"
                             ref={ this._lastName_Label_Div_Ref }
                        >
                            Last Name:
                        </div>
                        <div  className="current-value-container line-margin-bottom">
                            <span >
                                { this.state.userInfo.lastName }
                            </span>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Change Last Name"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img src="static/images/icon-edit.png" className=" icon-small  fake-link-image "
                                     onClick={ () => {

                                         const buttonContainer_BoundingRect = this._lastName_Label_Div_Ref.current.getBoundingClientRect();

                                         let position_top =  buttonContainer_BoundingRect.top;
                                         let position_left =  buttonContainer_BoundingRect.left;

                                         const change_Callback = ( params : UserAccountManagementPage_Change_LastName_Component_Change_Callback_Params ) => {

                                             const newLastName: string = params.newLastName;

                                             const userInfo = this.state.userInfo;

                                             userInfo.lastName = newLastName;

                                             this.setState({ fakeUpdateObject: {}, userInfo });
                                         }

                                         userAccountManagementPage_Change_LastName_Component__openOverlay({
                                             position_left,
                                             position_top,
                                             cancel_Callback: () => {},
                                             change_Callback
                                         })
                                     }}
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div className="value-label line-margin-bottom "
                            ref={ this._emailAddress_Label_Div_Ref }
                        >
                            Email Address:
                        </div>
                        <div  className="current-value-container line-margin-bottom ">
                            <span >
                                { this.state.userInfo.email }
                            </span>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Change Email"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img src="static/images/icon-edit.png" className=" icon-small  fake-link-image "
                                    onClick={ () => {

                                        const buttonContainer_BoundingRect = this._emailAddress_Label_Div_Ref.current.getBoundingClientRect();

                                        let position_top =  buttonContainer_BoundingRect.top;
                                        let position_left =  buttonContainer_BoundingRect.left;

                                        const change_Callback = ( params : UserAccountManagementPage_Change_Email_Component_Change_Callback_Params ) => {

                                            const newEmail: string = params.newEmail;

                                            const userInfo = this.state.userInfo;

                                            userInfo.email = newEmail;

                                            this.setState({ fakeUpdateObject: {}, userInfo });
                                        }

                                        userAccountManagementPage_Change_Email_Component__openOverlay({
                                            position_left,
                                            position_top,
                                            cancel_Callback: () => {},
                                            change_Callback
                                        })
                                    }}
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div className="value-label line-margin-bottom"
                             ref={ this._organization_Label_Div_Ref }
                        >
                            Organization:
                        </div>
                        <div  className="current-value-container line-margin-bottom">
                            <span >
                                { this.state.userInfo.organization }
                            </span>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Change Organization"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img src="static/images/icon-edit.png" className=" icon-small  fake-link-image "
                                     onClick={ () => {

                                         const buttonContainer_BoundingRect = this._organization_Label_Div_Ref.current.getBoundingClientRect();

                                         let position_top =  buttonContainer_BoundingRect.top;
                                         let position_left =  buttonContainer_BoundingRect.left;

                                         const change_Callback = ( params : UserAccountManagementPage_Change_Organization_Component_Change_Callback_Params ) => {

                                             const newOrganization: string = params.newOrganization;

                                             const userInfo = this.state.userInfo;

                                             userInfo.organization = newOrganization;

                                             this.setState({ fakeUpdateObject: {}, userInfo });
                                         }

                                         userAccountManagementPage_Change_Organization_Component__openOverlay({
                                             position_left,
                                             position_top,
                                             cancel_Callback: () => {},
                                             change_Callback
                                         })
                                     }}
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div className="value-label line-margin-bottom"
                             ref={ this._username_Label_Div_Ref }
                        >
                            Username:
                        </div>

                        <div  className="current-value-container line-margin-bottom">
                            <span >
                                { this.state.userInfo.username }
                            </span>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Change Username"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img src="static/images/icon-edit.png" className=" icon-small  fake-link-image "
                                     onClick={ () => {

                                         const buttonContainer_BoundingRect = this._username_Label_Div_Ref.current.getBoundingClientRect();

                                         let position_top =  buttonContainer_BoundingRect.top;
                                         let position_left =  buttonContainer_BoundingRect.left;

                                         const change_Callback = ( params : UserAccountManagementPage_Change_Username_Component_Change_Callback_Params ) => {

                                             const newUsername: string = params.newUsername;

                                             const userInfo = this.state.userInfo;

                                             userInfo.username = newUsername;

                                             this.setState({ fakeUpdateObject: {}, userInfo });
                                         }

                                         userAccountManagementPage_Change_Username_Component__openOverlay({
                                             position_left,
                                             position_top,
                                             cancel_Callback: () => {},
                                             change_Callback
                                         })
                                     }}
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                        <div className="value-label line-margin-bottom"  >
                            Password:
                        </div>

                        <div  className="current-value-container line-margin-bottom ">
                            <button //  was <span className="fake-link " >
                                  onClick={
                                      () => {
                                          const buttonContainer_BoundingRect = this._username_Label_Div_Ref.current.getBoundingClientRect();

                                          let position_top = buttonContainer_BoundingRect.top;
                                          let position_left = buttonContainer_BoundingRect.left;

                                          userAccountManagementPage_Change_Password_Component__openOverlay({ position_top, position_left })
                                      }
                                  }
                            >
                                Change Password
                            </button>
                        </div>

                    </div>   {/*  END: 2 column grid  */}

                </div>   {/*  END: <div className="account-info-block"  >  */}


                { ( this.state.displaySendImportCompleteEmailMgmtBlock ) ? (

                    <div className=" account-info-block " style={ { marginBottom: 20 } }>
                        <div style={ { fontWeight: "bold" } }>
                            Upload Email Notification
                        </div>
                        <div >
                            <label>
                                Notify me when upload is complete
                                <input
                                    type="checkbox"
                                    defaultChecked={ this.state.sendEmailOnImportFinish }
                                    onChange={
                                        event => {
                                            this.sendEmailOnImportFinish_InputChanged( event.target.checked );
                                        }
                                    }
                                />
                            </label>

                            { ( this.state.show_Updating_sendEmailOnImportFinish_Message ) ? (
                                <span>
                                    Updating
                                </span>
                            ) : null }
                        </div>
                    </div>

                ) : null }

                <UserAccountManagementPage_Change_SubmitImportProgramKey_Component />

            </div>

        );
    }

}