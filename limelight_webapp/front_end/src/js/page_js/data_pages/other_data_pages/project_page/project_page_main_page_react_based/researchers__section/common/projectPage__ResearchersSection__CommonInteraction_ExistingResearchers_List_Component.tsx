/**
 * projectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Researchers Section - Current Users in the Project
 *
 * Common - Project Owner, Researcher
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";


/**
 *
 */
export interface ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_Props {

    projectIdentifier: string
    projectIsLocked: boolean

    forceReload_UserList_Object: object
}

/**
 *
 */
interface ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component extends React.Component< ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_Props, ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_State > {

    private _refresh_UserList_Callback_BindThis = this._refresh_UserList_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _users_InProject: Array<INTERNAL__User_InProject_Entry>

    /**
     *
     */
    constructor(props: ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_Props) {
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

    componentDidUpdate( prevProps: Readonly<ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_Props>, prevState: Readonly<ProjectPage__ResearchersSection__CommonInteraction_ExistingResearchers_List_Component_State>, snapshot?: any ) {
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

        const promise = _get_Users_In_Project({ projectIdentifier: this.props.projectIdentifier })

        promise.catch(reason => {})
        promise.then( value => { try {

            this._users_InProject = value

            this.setState({ force_ReRender_Object: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    render() {

        if ( ! this._users_InProject ) {
            // NO data so return
            return null;  // EARLY RETURN
        }

        return (
            <React.Fragment>

                {/*   4 column grid  IN Parent Component  */}

                { this._users_InProject.map( (userEntry, index) => {
                    return (
                        <INTERNAL__ExistingResearcher_Entry_Component
                            key={ userEntry.userId }
                            userEntry={ userEntry }
                            users_InProject_Object={ this._users_InProject }
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
interface INTERNAL__ExistingResearcher_Entry_Component_Props {

    userEntry: INTERNAL__User_InProject_Entry
    projectIdentifier: string

    users_InProject_Object: object // Changes on View List

    refresh_UserList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__ExistingResearcher_Entry_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class INTERNAL__ExistingResearcher_Entry_Component extends React.Component< INTERNAL__ExistingResearcher_Entry_Component_Props, INTERNAL__ExistingResearcher_Entry_Component_State > {

    private _changeUserToProjectOwner_BindThis = this._changeUserToProjectOwner.bind(this)
    private _changeUserToAssistantProjectOwner_BindThis = this._changeUserToAssistantProjectOwner.bind(this)
    private _changeUserTo_Viewer_ReadOnly_BindThis = this._changeUserTo_Viewer_ReadOnly.bind(this)

    private _remove_Clicked_BindThis = this._remove_Clicked.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _show_Removing_Message = false
    private _show_Updating_Message = false

    /**
     *
     */
    constructor( props: INTERNAL__ExistingResearcher_Entry_Component_Props ) {
        super( props )

        this.state = { force_ReRender_Object: {} }
    }

    componentDidUpdate( prevProps: Readonly<INTERNAL__ExistingResearcher_Entry_Component_Props>, prevState: Readonly<INTERNAL__ExistingResearcher_Entry_Component_State>, snapshot?: any ) {

        if ( this.props.users_InProject_Object !== prevProps.users_InProject_Object ) {

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
                projectIdentifier : this.props.projectIdentifier,
                userId : this.props.userEntry.userId
            };

            const url = "d/rws/for-page/project-change-user-access-to-project-owner";

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
                projectIdentifier : this.props.projectIdentifier,
                userId : this.props.userEntry.userId
            };

            const url = "d/rws/for-page/project-change-user-access-to-assist-project-owner";

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
                projectIdentifier : this.props.projectIdentifier,
                userId : this.props.userEntry.userId
            };

            const url = "d/rws/for-page/project-change-user-access-to-viewer-read-only";

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
            if ( ! window.confirm("Remove user from project?") ) {
                return;
            }

            this._show_Removing_Message = true

            this.setState({ force_ReRender_Object: {} })

            const requestObj = {
                projectIdentifier : this.props.projectIdentifier,
                userId : this.props.userEntry.userId
            };

            const url = "d/rws/for-page/project-remove-user-access-to-project";

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

                {/*   IN Root Component::  5 column grid.  5th column is dummy 1fr to take rest of available space.  */}

                <div style={ { marginRight } }>
                    { this.props.userEntry.canRemoveEntry ? (
                        <input
                            type="image" src="static/images/icon-circle-delete.png"
                            className=" icon-small "
                            title="Remove from project"
                            onClick={ this._remove_Clicked_BindThis }
                        />
                    ) : null }
                </div>
                <div style={ { marginRight } }>
                    { this.props.userEntry.label_ComputedLocally }
                </div>
                <div style={ { marginRight } }>
                    { this.props.userEntry.canDemoteEntry ? (
                        this.props.userEntry.researcher ? (
                            <input
                                type="image" src="static/images/icon-down-arrow.png"
                                className=" icon-small "
                                title="Demote to viewer"
                                onClick={ this._changeUserTo_Viewer_ReadOnly_BindThis }
                            />
                        ) : (
                            <input
                                type="image" src="static/images/icon-down-arrow.png"
                                className=" icon-small "
                                title="Demote to researcher"
                                onClick={ this._changeUserToAssistantProjectOwner_BindThis }
                            />
                        )
                    ) : null }
                    <span> </span>
                    { this.props.userEntry.canPromoteEntry ? (
                        this.props.userEntry.researcher ? (
                            <input
                                type="image" src="static/images/icon-up-arrow.png"
                                className=" icon-small "
                                title="Demote to viewer"
                                onClick={ this._changeUserToProjectOwner_BindThis }
                            />
                        ) : (
                            <input
                                type="image" src="static/images/icon-up-arrow.png"
                                className=" icon-small "
                                title="Demote to researcher"
                                onClick={ this._changeUserToAssistantProjectOwner_BindThis }
                            />
                        )
                    ) : null }
                </div>
                <div>
                    { this.props.userEntry.projectOwner ? (
                        <div>
                            Owner
                        </div>
                    ) : this.props.userEntry.researcher ? (
                        <div>
                            Researcher
                        </div>
                    ) :  (
                        <div>
                            Viewer
                        </div>
                    ) }
                </div>

                {/*
                        Span rest of columns.

                        !!!!   WARNING:  HARD CODED the COLUMN NUMBER for this column so it HAS TO BE UPDATED if add more columns before it
                */}
                <div style={ { gridColumnEnd: -1 } }></div>

                {/*  Divider line across all columns */}

                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>

                    <div className="researchers-block-item-bottom-border"></div>
                </div>

            </React.Fragment>
        );
    }

}


/////////////////////

const _get_Users_In_Project = function (
    {
        projectIdentifier
    }: {
        projectIdentifier: string
    }
): Promise<Array<INTERNAL__User_InProject_Entry>> {


    let requestObj = {
        projectIdentifier
    };

    const url = "d/rws/for-page/project-view-page-user-list";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url } );

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    return new Promise<Array<INTERNAL__User_InProject_Entry>>( ( resolve, reject ) => {
        try {

            promise_webserviceCallStandardPost.catch( () => {
                reject( reject )
            } );

            promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                try {

                    const userList = responseData.userList as Array<INTERNAL__User_InProject_Entry>

                    for ( const user of userList ) {

                        //  Create Display Label

                        user.label_ComputedLocally = user.lastName + ", " + user.firstName
                    }

                    resolve( userList )

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

class INTERNAL__User_InProject_Entry {

    userId: number

    lastName: string
    firstName: string

    projectOwner: boolean
    researcher: boolean

    canRemoveEntry: boolean
    canDemoteEntry: boolean
    canPromoteEntry: boolean

    label_ComputedLocally: string  // Computed here
}