/**
 * modViewPage_RootLaunch_PublicUser.ts
 * 
 * For modView.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ModViewPage_RootClass_Common
 *
 * 
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

//  From local dir
import { ModViewPage_RootClass_Common }  from './modViewPage_RootClass_Common';

///////////////

// $(document).ready(function() {

	try {
		const modViewPage_RootClass_Common = new ModViewPage_RootClass_Common({});
		modViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

// });
