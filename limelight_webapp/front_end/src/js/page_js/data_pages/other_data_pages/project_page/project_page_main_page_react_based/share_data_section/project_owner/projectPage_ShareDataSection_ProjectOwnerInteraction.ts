/**
 * projectPage_PublicAccessSection_ProjectOwnerInteraction.ts
 *
 * Javascript for projectView.jsp page
 *
 * Share Data Section - Provide Server Interaction for React code for Project Owner
 *
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  Import Handlebars templates

//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


/**
 *
 */
export class ProjectPage_ShareDataSection_ProjectOwnerInteraction {

	/**
	 *
	 */
	static getLabel_ProjectLabel_OnServer( { projectIdentifier } : { projectIdentifier: any} ) : Promise<any> {

		return new Promise(function(resolve, reject) {
			try {
				let requestObj = {
					projectIdentifier
				};

				const url = "d/rws/for-page/project-label-get";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { reject() }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						resolve( responseData );

					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
						throw e;
					}
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 *
	 */
	static changeLabel_ProjectLabel_OnServer( { labelText, projectIdentifier } : { labelText: any, projectIdentifier : any } ) : Promise<{ duplicateLabelEncountered: boolean, status: boolean }> {

		return new Promise<{ duplicateLabelEncountered: boolean, status: boolean }>(function(resolve, reject) {
			try {
				let requestObj = {
					labelText,
					projectIdentifier
				};

				const url = "d/rws/for-page/project-label-add-change";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { reject() }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						resolve( responseData );

					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
						throw e;
					}
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 *
	 */
	static enablePublicAccess( { projectIdentifier } : { projectIdentifier: any } ) {
		return new Promise(function(resolve, reject) {
			try {
				let requestObj = { projectIdentifier };

				const url = "d/rws/for-page/project-enable-public-access";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						resolve( responseData );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 *
	 */
	static disablePublicAccess( { projectIdentifier } : { projectIdentifier: any }  ) {
		return new Promise(function(resolve, reject) {
			try {
				let requestObj = { projectIdentifier };

				const url = "d/rws/for-page/project-disable-public-access";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => {  }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						resolve( responseData );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 *
	 */
	static enable_PublicAccess_Code( { projectIdentifier } : { projectIdentifier: any } ) {
		return new Promise<{ publicAccessCode: string }>(function(resolve, reject) {
			try {
				let requestObj = { projectIdentifier };

				const url = "d/rws/for-page/project-enable-public-access-code";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						if ( ! responseData.publicAccessCode ) {
							const msg = "responseData.publicAccessCode is not set."
							console.warn(msg)
							throw Error(msg)
						}
						resolve( responseData );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 *
	 */
	static generate_New_PublicAccess_Code( { projectIdentifier } : { projectIdentifier: any } ) {
		
		return new Promise<{ publicAccessCode: string }>(function(resolve, reject) {
			try {
				let requestObj = { projectIdentifier };

				const url = "d/rws/for-page/project-generate-new-public-access-code";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						if ( ! responseData.publicAccessCode ) {
							const msg = "responseData.publicAccessCode is not set."
							console.warn(msg)
							throw Error(msg)
						}
						resolve( responseData );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 *
	 */
	static disable_PublicAccess_Code( { projectIdentifier } : { projectIdentifier: any }  ) {
		
		return new Promise(function(resolve, reject) {
			try {
				let requestObj = { projectIdentifier };

				const url = "d/rws/for-page/project-disable-public-access-code";

				const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

				const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => {  }  );

				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						resolve( responseData );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

};


