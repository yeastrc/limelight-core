/**
 * projectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Researchers Section - People invited to project using email address
 *
 * Common - Project Owner, Researcher
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { showErrorMsg } from "page_js/common_all_pages/showHideErrorMessage";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/**
 *
 */
export interface ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_Props {

    projectIdentifier: string
    projectIsLocked: boolean

    forceReload_UserList_Object: object
}

/**
 *
 */
interface ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component extends React.Component< ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_Props, ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_State > {

    private _refresh_UserList_Callback_BindThis = this._refresh_UserList_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _invitedPerson_ViaEmail_InProject_Array: Array<INTERNAL__InvitedPerson_ViaEmail_InProject_Entry>

    /**
     *
     */
    constructor(props: ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_Props) {
        super(props)

        this.state = { force_ReRender_Object: {} }
    }

    componentDidMount() {
        try {
            this._loadData()

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    componentDidUpdate( prevProps: Readonly<ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_Props>, prevState: Readonly<ProjectPage__ResearchersSection__CommonInteraction_InvitedPeople_List_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.forceReload_UserList_Object !== this.props.forceReload_UserList_Object ) {

                this._loadData()
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    private _refresh_UserList_Callback() : void {

        this._loadData()
    }

    private _loadData() {

        //  TODO  Show Loading message?

        this.setState({ force_ReRender_Object: {} })

        const promise = _get_InvitedPerson_ViaEmail_Array_In_Project({ projectIdentifier: this.props.projectIdentifier })

        promise.catch(reason => {})
        promise.then( value => { try {

            this._invitedPerson_ViaEmail_InProject_Array = value

            this.setState({ force_ReRender_Object: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    render() {

        if ( ! this._invitedPerson_ViaEmail_InProject_Array ) {
            // NO data so return
            return null;  // EARLY RETURN
        }

        return (
            <React.Fragment>

                {/*   CSS grid  IN Parent Component  */}

                { this._invitedPerson_ViaEmail_InProject_Array.map( (userEntry, index) => {
                    return (
                        <INTERNAL__InvitedPeople_Entry_Component
                            key={ userEntry.invitedUserEmail }
                            invitedPerson_ViaEmail_Entry={ userEntry }
                            invitedPerson_ViaEmail_Array_InProject_Object={ this._invitedPerson_ViaEmail_InProject_Array }
                            projectIdentifier={ this.props.projectIdentifier }
                            refresh_UserList_Callback={ this._refresh_UserList_Callback_BindThis }
                        />
                    )
                }) }
            </React.Fragment>
        )
    }

}


//////////////////////


/**
 *
 */
interface INTERNAL__InvitedPeople_Entry_Component_Props {

    invitedPerson_ViaEmail_Entry: INTERNAL__InvitedPerson_ViaEmail_InProject_Entry
    projectIdentifier: string

    invitedPerson_ViaEmail_Array_InProject_Object: object // Changes on View List

    refresh_UserList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__InvitedPeople_Entry_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class INTERNAL__InvitedPeople_Entry_Component extends React.Component< INTERNAL__InvitedPeople_Entry_Component_Props, INTERNAL__InvitedPeople_Entry_Component_State > {

    private _changeUserToProjectOwner_BindThis = this._changeUserToProjectOwner.bind(this)
    private _changeUserToAssistantProjectOwner_BindThis = this._changeUserToAssistantProjectOwner.bind(this)
    private _changeUserTo_Viewer_ReadOnly_BindThis = this._changeUserTo_Viewer_ReadOnly.bind(this)

    private _remove_Clicked_BindThis = this._remove_Clicked.bind(this)
    private _resend_Email_Clicked_BindThis = this._resend_Email_Clicked.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _show_Removing_Message = false
    private _show_Updating_Message = false

    /**
     *
     */
    constructor( props: INTERNAL__InvitedPeople_Entry_Component_Props ) {
        super( props )

        this.state = { force_ReRender_Object: {} }
    }

    componentDidUpdate( prevProps: Readonly<INTERNAL__InvitedPeople_Entry_Component_Props>, prevState: Readonly<INTERNAL__InvitedPeople_Entry_Component_State>, snapshot?: any ) {

        if ( this.props.invitedPerson_ViaEmail_Array_InProject_Object !== prevProps.invitedPerson_ViaEmail_Array_InProject_Object ) {

            this._show_Removing_Message = false
            this._show_Updating_Message = false

            this.setState({ force_ReRender_Object: {} })
        }
    }


    /**
     *
     */
    private _changeUserToProjectOwner( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            this._show_Updating_Message = true

            this.setState({ force_ReRender_Object: {} })

            const requestObj = {
                inviteTrackingId : this.props.invitedPerson_ViaEmail_Entry.inviteId
            };

            const url = "d/rws/for-page/project-invite-change-user-access-to-project-owner";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { throw Error("Failed call to webservice " + url ) }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    this.props.refresh_UserList_Callback()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _changeUserToAssistantProjectOwner( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            this._show_Updating_Message = true

            this.setState({ force_ReRender_Object: {} })

            const requestObj = {
                inviteTrackingId : this.props.invitedPerson_ViaEmail_Entry.inviteId
            };

            const url = "d/rws/for-page/project-invite-change-user-access-to-assist-project-owner";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {  throw Error("Failed call to webservice " + url ) }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    this.props.refresh_UserList_Callback()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _changeUserTo_Viewer_ReadOnly( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            this._show_Updating_Message = true

            this.setState({ force_ReRender_Object: {} })

            const requestObj = {
                inviteTrackingId : this.props.invitedPerson_ViaEmail_Entry.inviteId
            };

            const url = "d/rws/for-page/project-invite-change-user-access-to-viewer-read-only";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {  throw Error("Failed call to webservice " + url ) }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    this.props.refresh_UserList_Callback()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _remove_Clicked( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            if ( ! window.confirm("Remove invite from project?") ) {
                return;
            }

            this._show_Removing_Message = true

            this.setState({ force_ReRender_Object: {} })

            let requestObj = {
                inviteTrackingId : this.props.invitedPerson_ViaEmail_Entry.inviteId
            };

            const url = "d/rws/for-page/project-invite-revoke";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    if ( ! responseData.statusSuccess ) {
                        const msg = "( ! responseData.statusSuccess ) from URL: " + url
                        console.warn(msg)
                        throw Error(msg)
                    }

                    this.props.refresh_UserList_Callback()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _resend_Email_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            let requestObj = {
                inviteId : this.props.invitedPerson_ViaEmail_Entry.inviteId
            };

            const url = "d/rws/for-page/project-invite-resend-invite-email";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    if (responseData.status) {

                        //  Display msg
                        const $element = $("#success_message_invite_email_re_sent");
                        showErrorMsg( $element );  //  Used for success messages as well

                    } else {
                        //		alert("Unable to send email, system error.");
                        const $element = $("#error_message_invite_email_re_send_sytem_error");
                        showErrorMsg( $element );
                    }

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /////////////////

    /**
     *
     */
    render() {

        if ( this._show_Updating_Message ) {
            return (
                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>
                    Updating Entry...
                </div>
            )
        }
        if ( this._show_Removing_Message ) {
            return (
                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>
                    Removing Entry...
                </div>
            )
        }

        const marginRight = 10

        return (
            <React.Fragment>

                {/*   IN Root Component::  5 column grid.  5th column is dummy 1fr to take rest of available space.  */ }

                <div style={ { marginRight } }>
                    { this.props.invitedPerson_ViaEmail_Entry.canRemoveEntry ? (
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Remove from project
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input
                                type="image" src="static/images/icon-circle-delete.png"
                                className=" icon-small "
                                onClick={ this._remove_Clicked_BindThis }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    ) : null }
                </div>
                <div style={ { marginRight } }>
                    { this.props.invitedPerson_ViaEmail_Entry.invitedUserEmail }
                </div>
                <div style={ { marginRight } }>
                    { this.props.invitedPerson_ViaEmail_Entry.canDemoteEntry ? (
                        this.props.invitedPerson_ViaEmail_Entry.accessLevelResearcher ? (
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Demote to viewer
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input
                                    type="image" src="static/images/icon-down-arrow.png"
                                    className=" icon-small "
                                    onClick={ this._changeUserTo_Viewer_ReadOnly_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        ) : (
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Demote to researcher
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input
                                    type="image" src="static/images/icon-down-arrow.png"
                                    className=" icon-small "
                                    onClick={ this._changeUserToAssistantProjectOwner_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        )
                    ) : null }
                    <span> </span>
                    { this.props.invitedPerson_ViaEmail_Entry.canPromoteEntry ? (
                        this.props.invitedPerson_ViaEmail_Entry.accessLevelResearcher ? (
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Promote to owner
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input
                                    type="image" src="static/images/icon-up-arrow.png"
                                    className=" icon-small "
                                    onClick={ this._changeUserToProjectOwner_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        ) : (
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Promote to researcher
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input
                                    type="image" src="static/images/icon-up-arrow.png"
                                    className=" icon-small "
                                    onClick={ this._changeUserToAssistantProjectOwner_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        )
                    ) : null }
                </div>
                <div>
                    { this.props.invitedPerson_ViaEmail_Entry.accessLevelProjectOwner ? (
                        <div>
                            Owner
                        </div>
                    ) : this.props.invitedPerson_ViaEmail_Entry.accessLevelResearcher ? (
                        <div>
                            Researcher
                        </div>
                    ) : (
                        <div>
                            Viewer
                        </div>
                    ) }
                </div>
                <div style={ { paddingLeft: 20 } }>
                    Invited on { this.props.invitedPerson_ViaEmail_Entry.inviteDate }
                </div>
                <div>
                    { this.props.invitedPerson_ViaEmail_Entry.canResendInviteEmail ? (
                        <div
                            style={ { paddingLeft: 20 } }
                        >
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Resend Invite Email
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <button
                                    onClick={ this._resend_Email_Clicked_BindThis }
                                >
                                    Resend Email
                                </button>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    ) : null }
                </div>

                {/*   Last column is dummy 1fr to take rest of available space.  */ }
                <div></div>

                {/*  Divider line across all columns */ }

                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>

                    <div className="researchers-block-item-bottom-border"></div>
                </div>

            </React.Fragment>
        );
    }

}


/////////////////////

const _get_InvitedPerson_ViaEmail_Array_In_Project = function (
    {
        projectIdentifier
    }: {
        projectIdentifier: string
    }
): Promise<Array<INTERNAL__InvitedPerson_ViaEmail_InProject_Entry>> {


    let requestObj = {
        projectIdentifier
    };

    const url = "d/rws/for-page/project-view-page-user-invite-list";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url } );

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    return new Promise<Array<INTERNAL__InvitedPerson_ViaEmail_InProject_Entry>>( ( resolve, reject ) => {
        try {

            promise_webserviceCallStandardPost.catch( () => {
                reject( reject )
            } );

            promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                try {

                    const userInviteList = responseData.userInviteList as Array<INTERNAL__InvitedPerson_ViaEmail_InProject_Entry>

                    resolve( userInviteList )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    } )
}

class INTERNAL__InvitedPerson_ViaEmail_InProject_Entry {


    inviteId: number

    invitedUserEmail: string
    inviteDate: string

    accessLevelProjectOwner: boolean
    accessLevelResearcher: boolean

    canRemoveEntry: boolean
    canDemoteEntry: boolean
    canPromoteEntry: boolean
    canResendInviteEmail: boolean

    projectId: number
}