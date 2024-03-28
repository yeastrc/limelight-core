/**
 * qcViewPage_RootLaunch_PublicUser.js
 * 
 * For qcView.jsp page
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinViewPage_RootClass_Common
 *
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { QcViewPage_RootClass_Common }  from './qcViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var qcViewPage_RootClass_Common = new QcViewPage_RootClass_Common({});
		qcViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
