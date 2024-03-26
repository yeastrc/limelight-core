/**
 * manageUsersForAdminPage_Main_Component.tsx
 */


import React from "react";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";



//////////////////

var adminGlobals = {
    logged_in_user_id : null
};

var access_level_id_administrator: number

var access_level_id_user: number = null;  //  default to null if field === ""


try {

    var $logged_in_user_id = $( "#logged_in_user_id" );
    if ( $logged_in_user_id.length === 0 ) {
        throw Error( "Unable to find hidden field '#logged_in_user_id'" );
    }
    var logged_in_user_id = $( "#logged_in_user_id" ).val();
    if ( logged_in_user_id === undefined || logged_in_user_id === null
        || logged_in_user_id === "" ) {
        throw Error( "No value in hidden field '#logged_in_user_id' " );
    }
    try {
        const logged_in_user_id_ANY: any = logged_in_user_id
        adminGlobals.logged_in_user_id = parseInt( logged_in_user_id_ANY, 10 );
    } catch ( ex ) {
        throw Error( "failed to parse logged_in_user_id: " + logged_in_user_id );
    }
    if ( isNaN( adminGlobals.logged_in_user_id ) ) {
        throw Error( "failed to parse logged_in_user_id (parse to NaN): " + logged_in_user_id );
    }


    var access_level_id_administrator_String : any = $("#access_level_id_administrator").val();
    var access_level_id_user_String : any = $("#access_level_id_user").val();
    if ( access_level_id_administrator_String === undefined ||
        access_level_id_administrator_String === null ||
        access_level_id_administrator_String === "" ) {
        throw Error( "No value for hidden field with id 'access_level_id_administrator'" );
    }
    if ( access_level_id_user_String === undefined ||
        access_level_id_user_String === null ) {
        throw Error( "Hidden field with id 'access_level_id_user' value is undefined or null or the field is not found" );
    }
    access_level_id_administrator = parseInt( access_level_id_administrator_String, 10 );
    if ( isNaN( access_level_id_administrator ) ) {
        throw Error( "value in hidden field with id 'access_level_id_administrator' is not a number, it is: " + access_level_id_administrator_String );
    }
    if ( access_level_id_user_String !== "" ) {
        access_level_id_user = parseInt( access_level_id_user_String, 10 );
        if ( isNaN( access_level_id_user ) ) {
            throw Error( "value in hidden field with id 'access_level_id_user' is not a number, it is: " + access_level_id_user_String );
        }
    }

} catch( e ) {
    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    throw e;
}


/**
 *
 */
export class ManageUsersForAdminPage_Main_Component_Props_Prop {

    force_ReloadData_Object: object
}


/**
 *
 */
export interface ManageUsersForAdminPage_Main_Component_Props {

    propsValue : ManageUsersForAdminPage_Main_Component_Props_Prop
}

/**
 *
 */
interface ManageUsersForAdminPage_Main_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
export class ManageUsersForAdminPage_Main_Component extends React.Component< ManageUsersForAdminPage_Main_Component_Props, ManageUsersForAdminPage_Main_Component_State > {

    private _currentUser_Array: Array<any>

    /**
     *
     */
    constructor( props: ManageUsersForAdminPage_Main_Component_Props ) {
        super( props );

        this.state = { force_Rerender_Object: {} }

    }

    componentDidMount() {
        try {
            this._getCurrentUserList()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    componentDidUpdate( prevProps: Readonly<ManageUsersForAdminPage_Main_Component_Props>, prevState: Readonly<ManageUsersForAdminPage_Main_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.propsValue.force_ReloadData_Object !== this.props.propsValue.force_ReloadData_Object ) {
                //  reload User List
                this._getCurrentUserList()
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     *
     */
    private _getCurrentUserList() {

        const requestData = {};

        const url = 'admin/rws/for-page/manage-users-list-users';

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                if ( responseData === undefined || responseData === null || responseData.status === false ) {
                    alert("Get user data failed.");
                    return;
                }

                this._currentUser_Array = responseData.users
                this.setState({ force_Rerender_Object: {} })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        } );
    };

    render() {
        return (

            <div>
                <table style={ { borderWidth: 0, padding: 0, margin: 0, width: "100%" } }>
                    <tbody>
                        { this._currentUser_Array ? (
                            this._currentUser_Array.map( (userItem, index) => {
                                return (
                                    <INTERNAL__UserEntry_Component
                                        key={ index }
                                        userItem={ userItem }
                                        refresh_UserList_Callback={ () => { this._getCurrentUserList() }}
                                    />
                                )
                            })
                        ): null }
                    </tbody>

                </table>
            </div>
        );
    }
}




/**
 *
 */
interface INTERNAL__UserEntry_Component_Props {

    userItem: any
    refresh_UserList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__UserEntry_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
class INTERNAL__UserEntry_Component extends React.Component< INTERNAL__UserEntry_Component_Props, INTERNAL__UserEntry_Component_State > {

    /**
     *
     */
    constructor( props: INTERNAL__UserEntry_Component_Props ) {
        super( props );

        this.state = { force_Rerender_Object: {} }
    }

    private _disableUser() {

        const requestData = {
            personId : this.props.userItem.userId,
            personEnabledFlag : false
        };
        const url = "admin/rws/for-page/manage-users-user-enable";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this.props.refresh_UserList_Callback()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        } );
    }

    private _enableUser() {

        const requestData = {
            personId : this.props.userItem.userId,
            personEnabledFlag : true
        };
        const url = "admin/rws/for-page/manage-users-user-enable";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this.props.refresh_UserList_Callback()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        } );
    }

    private _set_UserLevel_User() {

        this._set_UserLevel( access_level_id_user )
    }

    private _set_UserLevel_Administrator() {

        this._set_UserLevel( access_level_id_administrator )
    }

    private _set_UserLevel( newAccessLevel: number ) {

        const requestData = {
            personId : this.props.userItem.userId,
            personAccessLevel : newAccessLevel
        };
        const url = "admin/rws/for-page/manage-users-user-global-access-level";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this.props.refresh_UserList_Callback()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        } );
    }

    /**
     *
     */
    render() {

        const userDataItem = this.props.userItem

        const userDataItem_IS_CurrentUser = adminGlobals.logged_in_user_id === userDataItem.userId

        const userDataItem__UserAccessLevel__Administrator = userDataItem.userAccessLevel === access_level_id_administrator
        const userDataItem__UserAccessLevel__User = userDataItem.userAccessLevel !== access_level_id_administrator

        const userEnabledAppSpecific =  userDataItem.enabledAppSpecific as boolean;
        const userEnabledUserMgmtGlobalLevel =  userDataItem.enabledUserMgmtGlobalLevel as boolean;

        let user_Disabled_Overall = false

        //  From Old Code:

        // if ( adminGlobals.logged_in_user_id === userDataItem.authUserId ) {
        //
        // } else {
        //     //  User being processed is not the currently logged on user
        //     if ( userEnabledAppSpecific && userEnabledUserMgmtGlobalLevel ) {
        //
        //     } else if ( ! userEnabledUserMgmtGlobalLevel ) {
        //         user_Disabled_Overall = true
        //     } else {
        //         user_Disabled_Overall = true
        //     }
        // }

        if ( userEnabledAppSpecific && userEnabledUserMgmtGlobalLevel ) {

        } else {

            user_Disabled_Overall = true
        }

        let className_On_User_Name = " name-of-user  "

        if ( user_Disabled_Overall ) {

            className_On_User_Name += " name-of-user-disabled-user "
        }

        return (
            <>
                <tr>

                    <td style={ { paddingRight: 5, whiteSpace: "nowrap" } }>

                        { userEnabledAppSpecific && userEnabledUserMgmtGlobalLevel ? (
                            <input
                                type="image"
                                src="static/images/icon-circle-delete.png"
                                className="user_disable_button_jq"
                                title="Disable User"
                                onClick={ event => {
                                    event.stopPropagation()
                                    this._disableUser()
                                } }
                            />
                        ) :  ( userEnabledUserMgmtGlobalLevel ) ? ( //  Only allow enable when NOT disabled Global
                            <input
                                type="image"
                                src="static/images/icon-circle-plus.png"
                                className="user_enable_button_jq"
                                title="Enable User"
                                onClick={ event => {
                                    event.stopPropagation()
                                    this._enableUser()
                                } }
                            />
                        ) : null }
                    </td>
                    <td style={ { whiteSpace: "nowrap" } }>
                        {/*  Add class 'name-of-user-disabled-user' if user is disabled in Javascript */ }
                        <span
                            className={ className_On_User_Name }
                        >{ this.props.userItem.firstName } { this.props.userItem.lastName }</span>
                    </td>

                    <td style={ { paddingLeft: 5, paddingRight: 5, whiteSpace: "nowrap" } }>

                        {/*For Current User OR Disabled User, create space where arrow would be*/ }
                        { userDataItem_IS_CurrentUser || user_Disabled_Overall ? (
                            <span style={ { visibility: "hidden" } }>
                                <input type="image" src="static/images/icon-up-arrow.png"/>
                            </span>
                        ) : (
                            userDataItem__UserAccessLevel__Administrator ? (
                                <input type="image" src="static/images/icon-down-arrow.png"
                                       title="Decrease User Access Level to 'User'"
                                       onClick={ event => {
                                           event.stopPropagation()
                                           this._set_UserLevel_User()
                                       } }
                                />
                            ) : (
                                <input
                                    type="image"
                                    src="static/images/icon-up-arrow.png"
                                    title="Increase User Access Level to 'Administrator'"
                                    onClick={ event => {
                                        event.stopPropagation()
                                        this._set_UserLevel_Administrator()
                                    } }
                                />
                            )
                        ) }
                    </td>

                    <td style={ { whiteSpace: "nowrap" } }>

                        { ( ! userEnabledUserMgmtGlobalLevel ) ? (
                            <span className="role-of-user ">Disabled For All Apps</span>

                        ) : ( ! userEnabledAppSpecific ) ? (

                            <span className="role-of-user ">Disabled For This App</span>
                        ) : userDataItem__UserAccessLevel__Administrator ? (

                            <span className="role-of-user ">Administrator</span>
                        ) : (
                            <span className="role-of-user ">User</span>
                        ) }
                    </td>

                    <td></td>
                    <td width="100%"></td>

                </tr>
                <tr>
                    <td colSpan={ 10 }>
                        <div className="top-level-label-bottom-border"></div>
                    </td>
                </tr>
            </>
        )
    }
}



