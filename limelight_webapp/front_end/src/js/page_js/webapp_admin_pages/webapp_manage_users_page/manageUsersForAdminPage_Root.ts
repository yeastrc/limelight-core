/**
 * manageUsersForAdminPage_Root.ts
 * 
 * Javascript for webappAdminManageUsers.jsp page  
 *
 * Currently SKIPPED for upgrade 'ReactDOM.render' call
 */

import React from "react";
import ReactDOM from "react-dom";


/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';


import { MainPagesPopulateHeader } from "page_js/main_pages/mainPagesPopulateHeader";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ManageUsersForAdminPage_Root_Component, ManageUsersForAdminPage_Root_Component_Props
} from "page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root_Component";
import {
    manageUsersForAdminPage_Main__Init
} from "page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Main";


///////////////

const _render_RootComponent = function () {

    const props: ManageUsersForAdminPage_Root_Component_Props = { propsValue: { force_ReloadData_Object: {} } }

    const root_Component = (
        React.createElement(
            ManageUsersForAdminPage_Root_Component,
            props,
            null
        )
    );


    //  Render to page:

    const containerDOMElement = document.getElementById("limelight_page__main_react_root");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'limelight_page__main_react_root'");
    }

    //  Called on render complete
    const renderCompleteCallbackFcn = () => {

    };

    const renderedReactComponent = ReactDOM.render(
        root_Component,
        containerDOMElement,
        renderCompleteCallbackFcn
    );
}


{
    try {

        limelight__catchAndReportGlobalOnError.init();

        ////Instance of class
        const mainPagesPopulateHeader = new MainPagesPopulateHeader();
        mainPagesPopulateHeader.initialize();

        const refresh_UserList_Callback = function () {

            _render_RootComponent()
        }

        manageUsersForAdminPage_Main__Init( { refresh_UserList_Callback } )

        _render_RootComponent()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e;
    }
}
