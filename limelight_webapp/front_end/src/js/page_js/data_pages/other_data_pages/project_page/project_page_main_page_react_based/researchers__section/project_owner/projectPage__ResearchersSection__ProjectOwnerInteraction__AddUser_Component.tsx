/**
 * projectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Researchers Section - Provide interaction for Project Owner
 *
 * Add User Component
 *
 */

import React from "react";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteCloseReason,
    TextField
} from "@mui/material";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { showErrorMsg } from "page_js/common_all_pages/showHideErrorMessage";
import {
    projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/researchers__section/common/projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM";


/**
 *
 */
const userAccessLevels = projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM()


/**
 *
 */
export interface ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component_Props {
    projectIdentifier: string
    projectIsLocked: boolean

    refresh_UserList_InvitedList_Callback: () => void
}

/**
 *
 */
interface ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component extends React.Component<ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component_Props, ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component_State> {

    private _showBody_Clicked_BindThis = this._showBody_Clicked.bind( this )
    private _hideBody_Clicked_BindThis = this._hideBody_Clicked.bind( this )
    private _selected_ExistingUser_Cancel_Clicked_BindThis = this._selected_ExistingUser_Cancel_Clicked.bind( this )
    private _email_Field__Changed_BindThis = this._email_Field__Changed.bind( this )
    private _selected_ExistingUser_Callback_BindThis = this._selected_ExistingUser_Callback.bind( this )
    private _invitedPersonAccessLevel_Changed_BindThis = this._invitedPersonAccessLevel_Changed.bind(this)

    private _inviteUser_Button_Clicked_BindThis = this._inviteUser_Button_Clicked.bind( this )


    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const _selected_ExistingUser_Callback: INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback = this._selected_ExistingUser_Callback
    }

    // private _addUser_BodyEverShown = false
    private _addUser_ShowBody = false

    private _inviteUser_Button_Disabled = true

    private _selected_ExistingUser_ByName: INTERNAL__User_NotInProject_Entry

    private _email_Entered = ""

    private _invitedPersonAccessLevel = userAccessLevels.access_level_id_project_researcher



    /**
     *
     */
    constructor( props: ProjectPage__ResearchersSection__ProjectOwnerInteraction__AddUser_Component_Props ) {
        super( props )

        this.state = {
            force_ReRender_Object: {}
        }
    }

    private _showBody_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        event.stopPropagation()
        this._addUser_ShowBody = true
        // this._addUser_BodyEverShown = true
        this.setState( { force_ReRender_Object: {} } )
    }

    private _hideBody_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        event.stopPropagation()
        this._addUser_ShowBody = false
        this.setState( { force_ReRender_Object: {} } )
    }

    private _selected_ExistingUser_Callback( params: INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback_Params ) {

        this._selected_ExistingUser_ByName = params.selectedUser

        this._email_Entered = ""

        this._update__InviteUser_Button_Disabled()

        this.setState( { force_ReRender_Object: {} } )
    }

    private _invitedPersonAccessLevel_Changed( event: React.ChangeEvent<HTMLSelectElement> ) {

        this._invitedPersonAccessLevel = Number.parseInt( event.target.value )

        this.setState( { force_ReRender_Object: {} } )
    }

    private _selected_ExistingUser_Cancel_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            this._selected_ExistingUser_ByName = undefined

            this._email_Entered = ""

            this._update__InviteUser_Button_Disabled()
            this.setState( { force_ReRender_Object: {} } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    private _email_Field__Changed( event: React.ChangeEvent<HTMLInputElement> ): void {

        this._email_Entered = event.target.value

        this._update__InviteUser_Button_Disabled()
        this.setState( { force_ReRender_Object: {} } )
    }

    private _update__InviteUser_Button_Disabled() {

        if ( this._selected_ExistingUser_ByName ) {

            this._inviteUser_Button_Disabled = false
            return
        }

        if ( this._email_Entered !== "" ) {

            this._inviteUser_Button_Disabled = false
            return
        }

        this._inviteUser_Button_Disabled = true
    }

    private _inviteUser_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {

        this._update__InviteUser_Button_Disabled()

        if ( this._inviteUser_Button_Disabled ) {
            this.setState( { force_ReRender_Object: {} } )

            return
        }

        // hide AllErrorMessages

        const webservice_Request_Params: {

            projectIdentifier: string

            invitedPersonUserId: number
            invitedPersonEmail: string
            invitedPersonAccessLevel: number
        } = {
            projectIdentifier: this.props.projectIdentifier,
            invitedPersonAccessLevel: this._invitedPersonAccessLevel,
            invitedPersonEmail: undefined, // set later
            invitedPersonUserId: undefined // set later
        }

        if ( this._selected_ExistingUser_ByName ) {
            webservice_Request_Params.invitedPersonUserId = this._selected_ExistingUser_ByName.userId

        } else if ( this._email_Entered !== "" ) {
            webservice_Request_Params.invitedPersonEmail = this._email_Entered

        } else {
            console.warn( "_inviteUser_Button_Clicked(...):  ELSE of ( this._selected_ExistingUser_ByName ) OR ( this._email_Entered !== \"\" ).  return from method")
            return;
        }


        const url = "d/rws/for-page/project-invite-user-to-project-new-or-existing-user";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: webservice_Request_Params, url } );

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {
        } );

        promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
            try {
                this._process_Invite_Response( {
                    invitedPersonEmail: webservice_Request_Params.invitedPersonEmail,
                    responseData
                } );
            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e;
            }
        } );

    }

    private _process_Invite_Response(
        {
            invitedPersonEmail, responseData
        }: {
            invitedPersonEmail: string
            responseData: any
        } ) {

        if (responseData.status) {

            {
                //  Reset Form

                this._selected_ExistingUser_ByName = undefined

                this._email_Entered = ""

                this._update__InviteUser_Button_Disabled()
                this.setState( { force_ReRender_Object: {} } )

            }

            var addedExistingUser = responseData.addedExistingUser;
            var existingUserThatWasAdded = responseData.existingUserThatWasAdded;
            var invite_user_email = invitedPersonEmail;
            if ( addedExistingUser ) {
                if ( existingUserThatWasAdded ) {
//					var firstName = existingUserThatWasAdded.firstName;
//					var lastName = existingUserThatWasAdded.lastName;
//					alert( "Access to project added for " + firstName + " " + lastName );
                } else {
//					alert( "Access to project added for provided user" );
                }
            } else {
//				alert( "email sent to " + invite_user_email  + " inviting them to this project" );
                $("#invite_user_email_that_was_sent").text( invite_user_email );
                var $element = $("#success_message_invite_email_sent");
                showErrorMsg( $element );  //  Used for success messages as well
            }

            window.setTimeout( () => {
                // Refresh other parts of the Researcher section
                this.props.refresh_UserList_InvitedList_Callback()
            }, 10 )

        } else {
//			status: false
//			addedExistingUser: false
//			duplicateInsertError: false
//			emailAddressDuplicateError: false
//			emailAddressInvalidSendError: false
//			emailSent: false
//			existingUserThatWasAdded: null
//			lastNameDuplicateError: false
//			lastNameNotFoundError: true
//			unableToSendEmailError: false
            if (responseData.duplicateInsertError) {
//				alert("User already has access to this project");
                var $element = $("#error_message_invite_already_has_access");
                showErrorMsg( $element );
            } else if (responseData.lastNameNotFoundError ) {
//				alert("Unable to send email, email address is invalid.");
                var $element = $("#error_message_invite_name_not_found");
                showErrorMsg( $element );
            } else if (responseData.lastNameDuplicateError ) {
                //  More than one user has this last name
//				alert("Unable to send email, email address is invalid.");
                var $element = $("#error_message_invite_name_duplicate");
                showErrorMsg( $element );
            } else if (responseData.emailAddressInvalidSendError ) {
//				alert("Unable to send email, email address is invalid.");
                var $element = $("#error_message_invite_email_address_invalid");
                showErrorMsg( $element );
            } else if (responseData.unableToSendEmailError ) {
//				alert("Unable to send email, system error.");
                var $element = $("#error_message_invite_email_send_sytem_error");
                showErrorMsg( $element );
            } else {
//				alert("Error adding user to project");
                var $element = $("#error_message_invite_error_adding_user_to_project");
                showErrorMsg( $element );
            }
        }
    }

    /**
     *
     */
    render() {

        return (
            <div>
                { this._render_ClosedStateView() }

                { ( this._addUser_ShowBody ) ? (

                    <div style={ { display: this._addUser_ShowBody ? "" : "none" } }>

                        { this._render_OpenedStateView() }
                    </div>
                ) : null }

                <div className="top-level-label-bottom-border" style={ { width: "100%" } }></div>

            </div>
        )
    }

    /**
     *
     */
    private _render_ClosedStateView() {

        return (

            <div style={ { display: ( ! this._addUser_ShowBody ) ? "" : "none" } }>
                <div className="invite-user-expand-icon-container">
                    <span
                        title="Invite new or existing user to project"
                        className=" second-level-label clickable "
                        onClick={ this._showBody_Clicked_BindThis }
                    >
                        <img src="static/images/icon-add-user.png" className=" icon-small "/>
                    </span>
                </div>
                <div>
                    <span
                        title="Invite new or existing user to project"
                        className=" second-level-label fake-link "
                        onClick={ this._showBody_Clicked_BindThis }
                    >
                        Invite User
                    </span>
                </div>

            </div>
        )
    }

    /**
     *
     */
    private _render_OpenedStateView() {

        const margin_Around_Or = 3

        return (
            <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }>

                <div>
                    <div>
                        <img
                            src="static/images/icon-circle-delete.png"
                            title="Close Invite User"
                            className=" icon-small clickable "
                            style={ { marginRight: 4 } }
                            onClick={ this._hideBody_Clicked_BindThis }
                        />
                    </div>
                    <div style={ { position: "relative" } }>
                        { this._render_ErrorMessages() }
                    </div>
                </div>

                <div>
                    <div style={ { marginBottom: 10, fontSize: 16, fontWeight: "bold" } }>
                        Invite user to this project:
                    </div>

                    <div style={ { display: "grid", gridTemplateColumns: "max-content max-content " } }>

                        <div>
                            { this._selected_ExistingUser_ByName ? (

                                //  User Selected Existing User by Name so display only that
                                <div>
                                    <img
                                        src="static/images/icon-circle-delete.png"
                                        className=" icon-small clickable "
                                        title="Clear chosen Last Name or Email Address"
                                        onClick={ this._selected_ExistingUser_Cancel_Clicked_BindThis }
                                    />
                                    <span
                                        style={ { marginLeft: 10, marginRight: 10 } }
                                    >
                                        { this._selected_ExistingUser_ByName.label_ComputedLocally }
                                    </span>
                                </div>

                            ) : (
                                <div style={ {
                                    display: "grid",
                                    gridTemplateColumns: "max-content max-content max-content "
                                } }>
                                    {/* Row 1 Inner Grid */ }
                                    <div>
                                        <div>
                                            <INTERNAL__ChooseExistingUser_AutoComplete_Component
                                                projectIdentifier={ this.props.projectIdentifier }
                                                selected_ExistingUserId_Callback={ this._selected_ExistingUser_Callback_BindThis }
                                            />
                                        </div>
                                        <div>
                                            Existing user only
                                        </div>
                                    </div>
                                    <div>
                                        <span
                                            style={ { marginLeft: margin_Around_Or, marginRight: margin_Around_Or } }
                                        >
                                            or
                                        </span>
                                    </div>
                                    <div>
                                        <div>
                                            <input
                                                placeholder="Email Address"
                                                title="Email Address"
                                                style={ { marginRight: 8 } }
                                                value={ this._email_Entered }
                                                onChange={ this._email_Field__Changed_BindThis }
                                            />
                                        </div>
                                        <div>
                                            New or existing user
                                        </div>
                                    </div>
                                </div>
                            ) }
                        </div>

                        <div>
                            <select
                                style={ { marginRight: 6 } }
                                value={ this._invitedPersonAccessLevel }
                                onChange={ this._invitedPersonAccessLevel_Changed_BindThis }
                            >
                                <option value={ userAccessLevels.access_level_id_project_researcher }>Researcher</option>
                                <option value={ userAccessLevels.access_level_id_project_viewer }>Viewer</option>
                                <option value={ userAccessLevels.access_level_id_project_owner }>Owner</option>
                            </select>
                            <span> </span>
                            <div style={ { display: "inline-block", position: "relative" } }>

                                <button
                                    disabled={ this._inviteUser_Button_Disabled }
                                    onClick={ this._inviteUser_Button_Clicked_BindThis }
                                >
                                    Invite User
                                </button>
                                { this._inviteUser_Button_Disabled ? (
                                    <div
                                        style={ { position: "absolute", inset: 0 } }
                                        title="First enter value for email or choose from selection for last name"
                                    ></div>
                                ) : null }
                            </div>

                            <span> </span>
                            <button
                                onClick={ this._hideBody_Clicked_BindThis }
                            >
                                Cancel
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        )

    }

    /**
     *
     * @private
     */
    private _render_ErrorMessages() {

        return (

            <div style={ { position: "relative", left: 100, top: 20 } }>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_name_or_email_required">

                    <div className="error-message-inner-container" style={ { width: 380 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Last Name or Email must be specified</div>
                    </div>
                </div>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_name_and_email_have_values">

                    <div className="error-message-inner-container" style={ { width: 420 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Last Name and Email cannot both be specified</div>
                    </div>
                </div>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_name_not_found">

                    <div className="error-message-inner-container" style={ { width: 380, textAlign: "left" } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Last Name entered cannot be found.<br/>  Please choose a user from the dropdown list.</div>
                    </div>
                </div>


                <div className="error-message-container error_message_container_jq" id="error_message_invite_name_duplicate">

                    <div className="error-message-inner-container" style={ { width: 480, textAlign: "left" } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Last Name entered matches more than one user.<br/>  Please choose a user from the dropdown list.</div>
                    </div>
                </div>


                <div className="error-message-container error_message_container_jq" id="error_message_invite_already_has_access">

                    <div className="error-message-inner-container" style={ { width: 380 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >User already has access to this project</div>
                    </div>
                </div>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_email_address_invalid">

                    <div className="error-message-inner-container" style={ { width: 440 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Unable to send email, email address is invalid</div>
                    </div>
                </div>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_email_send_sytem_error">

                    <div className="error-message-inner-container" style={ { width: 400 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Unable to send email, system error.</div>
                    </div>
                </div>

                <div className="error-message-container error_message_container_jq" id="error_message_invite_error_adding_user_to_project">

                    <div className="error-message-inner-container" style={ { width: 380 } }>
                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                        <div className="error-message-text" >Error adding user to project</div>
                    </div>
                </div>

                {/*  Invite email successfully sent message */}

                <div className="success-message-container error_message_container_jq" id="success_message_invite_email_sent">
                    <div className="success-message-inner-container"  style={ { width: 800 } }>
                        <div className="success-message-close-x error_message_close_x_jq">X</div>
                        <div className="success-message-text" >Email sent to <span id="invite_user_email_that_was_sent"></span> inviting them to this project</div>
                    </div>
                </div>


            </div>

    )
    }

}


type INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback_Params = {
    selectedUser: INTERNAL__User_NotInProject_Entry
}

type INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback =
    ( params: INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback_Params ) => void


/**
 *
 */
interface INTERNAL__ChooseExistingUser_AutoComplete_Component_Props {

    projectIdentifier: string
    selected_ExistingUserId_Callback: INTERNAL__ChooseExistingUser_AutoComplete_Component__Selected_ExistingUser_Callback
}

/**
 *
 */
interface INTERNAL__ChooseExistingUser_AutoComplete_Component_State {

    force_ReRender_Object?: object
}

type INTERNAL__ChooseExistingUser_AutoComplete_Component__Name_Entry = {
    label: string, id: number
}

/**
 *
 */
export class INTERNAL__ChooseExistingUser_AutoComplete_Component extends React.Component<INTERNAL__ChooseExistingUser_AutoComplete_Component_Props, INTERNAL__ChooseExistingUser_AutoComplete_Component_State> {

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _user_NotInProject_Entry_Array: Array<INTERNAL__User_NotInProject_Entry> // From Server

    private _open_Autocomplete_Prop = false

    private _loading_Autocomplete_Prop = false

    private _options_AutoComplete_Prop: Array<INTERNAL__ChooseExistingUser_AutoComplete_Component__Name_Entry> = [] //  Populate later. Must be empty array for first render

    private _renderNothing_ON_Select_Entry = false // Set to true on user selects a name from autocomplete

    /**
     *
     */
    constructor( props: INTERNAL__ChooseExistingUser_AutoComplete_Component_Props ) {
        super( props )

        this.state = {
            force_ReRender_Object: {}
        }
    }

    componentDidMount() {

    }

    private _autoComplete__OnOpen( event: React.SyntheticEvent<Element, Event> ) {
        try {
            this._open_Autocomplete_Prop = true
            this._loading_Autocomplete_Prop = true

            this.setState( { force_ReRender_Object: {} } )

            const promise = _get_Users_NotIn_Project( { projectIdentifier: this.props.projectIdentifier } )

            promise.catch()
            promise.then( user_NotInProject_Entry_Array => {
                try {

                    this._user_NotInProject_Entry_Array = user_NotInProject_Entry_Array

                    this._loading_Autocomplete_Prop = false

                    this._options_AutoComplete_Prop = []

                    for ( const user of this._user_NotInProject_Entry_Array ) {

                        this._options_AutoComplete_Prop.push( {
                            label: user.label_ComputedLocally,
                            id: user.userId
                        } )
                    }

                    this.setState( { force_ReRender_Object: {} } )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    private _autoComplete__OnClose( event: React.SyntheticEvent<Element, Event>, reason: AutocompleteCloseReason ) {
        try {
            this._open_Autocomplete_Prop = false

            this.setState( { force_ReRender_Object: {} } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _changed_AutoComplete(
        event: React.SyntheticEvent<Element, Event>,
        selected_Value_Param: INTERNAL__ChooseExistingUser_AutoComplete_Component__Name_Entry,
        changeReason: AutocompleteChangeReason,
        changeDetails: AutocompleteChangeDetails<{ label: string, id: number }> ) {

        // 'selected_Value_Param' will be the selected entry even if there are multiple entries with the same 'label' value

        try {
            if ( ! this._user_NotInProject_Entry_Array ) {
                const msg = "in _changed_AutoComplete(...):  ( ! this._user_NotInProject_Entry_Array )"
                console.warn( msg )
                throw Error( msg )
            }

            let selectedUser: INTERNAL__User_NotInProject_Entry

            for ( const user_NotInProject_Entry of this._user_NotInProject_Entry_Array ) {
                if ( selected_Value_Param.id === user_NotInProject_Entry.userId ) {
                    selectedUser = user_NotInProject_Entry
                    break
                }
            }

            if ( ! selectedUser ) {
                const msg = "in _changed_AutoComplete(...):  ( ! selectedUser ). value.id NOT FOUND.  selected_Value_Param.id: " + selected_Value_Param.id
                console.warn( msg )
                throw Error( msg )
            }

            this.props.selected_ExistingUserId_Callback( { selectedUser } )

            this._renderNothing_ON_Select_Entry = true

            this.setState( { force_ReRender_Object: {} } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    render() {

        if ( this._renderNothing_ON_Select_Entry ) {
            return null
        }

        return (
            //  Probably need to make this a child component so can set open to true on mount
            <Autocomplete
                title="Last Name. Must choose from list."
                open={ this._open_Autocomplete_Prop } // hard code true for now.  Set to default true on component Mount
                onOpen={ ( event ) => {
                    this._autoComplete__OnOpen( event )
                } }
                onClose={ ( event, reason ) => {
                    this._autoComplete__OnClose( event, reason )
                } }
                onChange={
                    //  Put inline so get parameter types to ensure those types are used in the called method
                    ( event, value, changeReason, changeDetails ) => {
                        this._changed_AutoComplete( event, value, changeReason, changeDetails )
                    } }
                disableClearable={ true }
                // disablePortal
                loading={ this._loading_Autocomplete_Prop } // Display loading message
                options={ this._options_AutoComplete_Prop }
                sx={ { width: 500 } }
                renderInput={ ( params ) => <TextField { ...params } label="Last Name"/> }
            />
        );
    }

}


const _get_Users_NotIn_Project = function (
    {
        projectIdentifier
    }: {
        projectIdentifier: string
    }
): Promise<Array<INTERNAL__User_NotInProject_Entry>> {


    let requestObj = {
        lastNamePrefix: "", // load everything
        projectIdentifier
    };

    const url = "d/rws/for-page/project-users-not-in-project-list";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url } );

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    return new Promise<Array<INTERNAL__User_NotInProject_Entry>>( ( resolve, reject ) => {
        try {

            promise_webserviceCallStandardPost.catch( () => {
                reject( reject )
            } );

            promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                try {

                    const userList = responseData.userList as Array<INTERNAL__User_NotInProject_Entry>

                    for ( const user of userList ) {

                        //  Create Display Label

                        user.label_ComputedLocally = user.lastName + ", " + user.firstName
                    }

                    resolve( responseData.userList )

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

class INTERNAL__User_NotInProject_Entry {
    lastName: string
    firstName: string
    userId: number

    label_ComputedLocally: string  // Computed here
}