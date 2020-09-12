/**
 * manageCachedDataForAdminPage_Root_Component.tsx
 *
 * Root of webappAdminManageCachedData.jsp
 *
 */


import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export interface ClearAllCachedData_ClickHandler_Callback {
    () : void
}

/**
 *
 */
export interface WriteCachedDataSizesToLogClickHandler_Callback {
    () : void
}

/**
 *
 */
export interface ManageCachedDataForAdminPage_Root_Component_Props {

    clearAllCachedData_ClickHandler_Callback : ClearAllCachedData_ClickHandler_Callback
    writeCachedDataSizesToLogClickHandler_Callback : WriteCachedDataSizesToLogClickHandler_Callback
}

/**
 *
 */
interface ManageCachedDataForAdminPage_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ManageCachedDataForAdminPage_Root_Component extends React.Component< ManageCachedDataForAdminPage_Root_Component_Props, ManageCachedDataForAdminPage_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    private _clearAllCachedDataClickHandler_BindThis = this._clearAllCachedDataClickHandler.bind(this);
    private _writeCachedDataSizesToLogClickHandler_BindThis = this._writeCachedDataSizesToLogClickHandler.bind(this);

    /**
     *
     */
    constructor(props: ManageCachedDataForAdminPage_Root_Component_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    static getDerivedStateFromError(error: any): ManageCachedDataForAdminPage_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return {component_SubTree_Has_Error: true};
    }

    /**
     *
     */
    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ManageCachedDataForAdminPage_Root_Component'. componentDidCatch: ", error, errorInfo);
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    componentDidMount() {

    }
    
    /**
     *
     */
    componentWillUnmount() {

    }

    /**
     *
     */
    _clearAllCachedDataClickHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
        try {
            this.props.clearAllCachedData_ClickHandler_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _writeCachedDataSizesToLogClickHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
        try {
            this.props.writeCachedDataSizesToLogClickHandler_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ( this.state.component_SubTree_Has_Error ) {

            //  Return an error message if error is caught

            return (  //  EARLY RETURN

                <div>An Error has Occurred. Please reload the page and try again.</div>
            );
        }

        return (

            <div >
                <div style={ { marginBottom : 10 }}>
                    Click this when change any data in the database directly:
                    <input type="button" value="Clear All Cached Data" onClick={ this._clearAllCachedDataClickHandler_BindThis } />
                </div>
                <div style={ { marginBottom : 10 }}>
                    Click this to have current sizes of in memory data caches to the log file:
                    <input type="button" value="Write Cached Data Sizes to log" onClick={ this._writeCachedDataSizesToLogClickHandler_BindThis } />
                </div>

            </div>
        );
    }

}

