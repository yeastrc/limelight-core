/**
 * featureDetection_ViewPage_RootLaunch_LoggedInUsers.js
 *
 * For qcView.jsp page
 *
 * Root Launch Javascript for logged in users
 *
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 *
 * !!!  This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 *
 *
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

import { Handlebars, _dummy_template_template_bundle } from './featureDetection_ViewPage_RootLaunch_ImportHandlebars';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


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
