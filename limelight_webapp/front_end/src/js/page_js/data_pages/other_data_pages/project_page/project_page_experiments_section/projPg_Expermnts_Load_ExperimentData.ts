/**
 * projPg_Expermnts_Load_ExperimentData.ts
 * 
 * Javascript for projectView.jsp page 
 * 
 * Load the Experiment Data for 1 Experiment from the server 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

/**
 * 
 */
export const getExperimentDataFromServer = function({ experimentId }:{ experimentId: any }) {

	return new Promise( (resolve, reject) => {
		try {
			let requestObj = {
				experimentId
			};

			const url = "d/rws/for-page/experiment/experiment-get";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

			promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
				try {
					resolve({ experimentData : responseData });
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});
		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({
				errorException : e
			});
			throw e;
		}
	});
}
