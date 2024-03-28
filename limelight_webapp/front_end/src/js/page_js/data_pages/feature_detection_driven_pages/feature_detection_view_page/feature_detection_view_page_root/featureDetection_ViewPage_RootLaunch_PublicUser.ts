/**
 * featureDetection_ViewPage_RootLaunch_PublicUser.js
 *
 * For featureDetection_BrowserView.jsp page
 *
 * Root Launch Javascript for Public User, or Project Is Locked
 *
 * Create and initialize object of class ProteinViewPage_RootClass_Common
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { FeatureDetection_ViewPage_RootClass_Common } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_ViewPage_RootClass_Common";


///////////////

$(document).ready(function() {

    try {
        var featureDetection_ViewPage_RootClass_Common = new FeatureDetection_ViewPage_RootClass_Common({});
        featureDetection_ViewPage_RootClass_Common.initialize();

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }

});
