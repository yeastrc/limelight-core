/**
 * scanFileBrowserViewPage_RootLaunch_PublicUser.js
 * 
 * For scanFileBrowserView.jsp page
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ProteinViewPage_RootClass_Common
 *
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


//  From local dir
import { ScanFileBrowserViewPage_RootClass_Common }  from './scanFileBrowserViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var scanFileBrowserViewPage_RootClass_Common = new ScanFileBrowserViewPage_RootClass_Common({});
		scanFileBrowserViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
