/**
 * manageUsersForAdminPage_Root_Component.tsx
 */



import React from 'react'
import {
    ManageUsersForAdminPage_Main_Component,
    ManageUsersForAdminPage_Main_Component_Props_Prop
} from "page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Main_Component";




/////////////////////////

/**
 *
 */
export interface ManageUsersForAdminPage_Root_Component_Props {

    propsValue : ManageUsersForAdminPage_Main_Component_Props_Prop
}

/**
 *
 */
interface ManageUsersForAdminPage_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ManageUsersForAdminPage_Root_Component extends React.Component< ManageUsersForAdminPage_Root_Component_Props, ManageUsersForAdminPage_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ManageUsersForAdminPage_Root_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ManageUsersForAdminPage_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ManageUsersForAdminPage_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    // componentWillUnmount() {
    //
    // }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : JSX.Element = undefined;

        let mainContent : JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <ManageUsersForAdminPage_Main_Component
                    propsValue={ this.props.propsValue }
                />
            );
        }

        return (
            <div >
                { component_SubTree_ErrorMessage }
                { mainContent }
            </div>
        );
    }

}

