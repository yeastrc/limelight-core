/**
 * catchAndReportGlobalOnError.ts
 * 
 * Add Listener for global on error
 * 
 * Call init() from all page root init functions
 * 
 * 
 * Exported Javascript variable
 * 
 * export { catchAndReportGlobalOnError }
 * 
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */
"use strict";

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

/**
 * 
 */
var catchAndReportGlobalOnError = {

		/**
		 * 
		 */
		init : function() {
			
			try {
				window.addEventListener('error', function(e) {
//					var errorText = [
//					e.message,
//					'URL: ' + e.filename,
//					'Line: ' + e.lineno + ', Column: ' + e.colno,
//					'Stack: ' + (e.error && e.error.stack || '(no stack trace)')
//					].join('\n');

					console.log("global error caught in catchAndReportGlobalOnError");

					let errorException = e.error;
					try {
						reportWebErrorToServer.reportErrorObjectToServer ( { errorException : errorException } );
					} catch ( e ) {
						console.log("In catchAndReportGlobalOnError: exception calling reportWebErrorToServer.reportErrorObjectToServer(...)");
					}

				});
			} catch( e ) {
				console.log("In catchAndReportGlobalOnError: exception adding window error event listener");
			}
		}
}

export { catchAndReportGlobalOnError }
