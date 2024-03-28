/**
 * featureDetection_ViewPage_RootLaunch_LoggedInUsers.ts
 *
 * For featureDetection_BrowserView.jsp page
 *
 * Root Launch Javascript for logged in users
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';


//  From local dir

///////////////

$(document).ready(function() {

    try {
        // var featureDetection_ViewPage_RootClass_LoggedInUsers = new ProteinViewPage_RootClass_LoggedInUsers();
        // featureDetection_ViewPage_RootClass_LoggedInUsers.initialize();

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }

});
