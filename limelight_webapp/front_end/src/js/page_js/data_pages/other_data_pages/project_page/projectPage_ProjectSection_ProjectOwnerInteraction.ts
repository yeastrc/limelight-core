/**
 * projectPage_ProjectSection_ProjectOwnerInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Section - Provide interaction for Project Owner 
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

//  Local imports



/**
 * 
 */
export class ProjectPage_ProjectSection_ProjectOwnerInteraction {

	private _initializeCalled: boolean
	private _projectIdentifierFromURL : string
	private _projectLocked : boolean

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectLocked } : { projectIdentifierFromURL: string, projectLocked: boolean } ) {

		this._initializeCalled = false;
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectLocked = projectLocked;
	}

	/**
	 * 
	 */
	initialize() {

		catchAndReportGlobalOnError.init();
		
		if ( this._projectLocked ) {
			
			this._initialize_ProjectLocked();
		} else {
			this._initialize_ProjectNotLocked();
		}
		
		this._initializeCalled = true;
	}

	/**
	 * 
	 */
	_initialize_ProjectNotLocked() {
		
		let objectThis = this;
		
		let $change_project_title_button = $("#change_project_title_button");
		if ($change_project_title_button.length === 0) {
			throw Error( "Unable to find '#change_project_title_button'" );
		}
		$change_project_title_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._openChangeProjectTitle( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		let $change_project_title_save = $("#change_project_title_save");
		if ($change_project_title_save.length === 0) {
			throw Error( "Unable to find '#change_project_title_save'" );
		}
		$change_project_title_save.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._saveProjectTitle( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		let $change_project_title_cancel = $("#change_project_title_cancel");
		if ($change_project_title_cancel.length === 0) {
			throw Error( "Unable to find '#change_project_title_cancel'" );
		}
		$change_project_title_cancel.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._cancelChangeProjectTitle( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		

		let $change_project_abstract_button = $("#change_project_abstract_button");
		if ($change_project_abstract_button.length === 0) {
			throw Error( "Unable to find '#change_project_abstract_button'" );
		}
		$change_project_abstract_button.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._openChangeProjectAbstract( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		let $change_project_abstract_save = $("#change_project_abstract_save");
		if ($change_project_abstract_save.length === 0) {
			throw Error( "Unable to find '#change_project_abstract_save'" );
		}
		$change_project_abstract_save.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._saveProjectAbstract( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		let $change_project_abstract_cancel = $("#change_project_abstract_cancel");
		if ($change_project_abstract_cancel.length === 0) {
			throw Error( "Unable to find '#change_project_abstract_cancel'" );
		}
		$change_project_abstract_cancel.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._cancelChangeProjectAbstract( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $project_unlocked_icon = $("#project_unlocked_icon");
		if ($project_unlocked_icon.length === 0) {
			throw Error( "Unable to find '#project_unlocked_icon'" );
		}
		$project_unlocked_icon.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._lockProject( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  $project_unlocked_icon  Add Tool Tip
		$project_unlocked_icon.show();
	};

	/**
	 * 
	 */
	_initialize_ProjectLocked() {
		
		let objectThis = this;
		
		let $project_locked_icon = $("#project_locked_icon");
		if ($project_locked_icon.length === 0) {
			throw Error( "Unable to find '#project_locked_icon'" );
		}
		$project_locked_icon.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._unlockProject( { clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  $$project_locked_icon  Add Tool Tip
		$project_locked_icon.show();

	}
	
	/**
	 * 
	 */
	_openChangeProjectTitle( { clickThis } : { clickThis: any } ) {
		
		let $project_title_display = $("#project_title_display");
		let project_title_display = $project_title_display.text();
		let $change_project_title_input = $("#change_project_title_input");
		$change_project_title_input.val( project_title_display );
		
		let $change_project_title_container = $("#change_project_title_container");
		$change_project_title_container.show();
	}

	/**
	 * 
	 */
	_saveProjectTitle( { clickThis } : { clickThis: any } ) {
		
		let objectThis = this;
		
		let $change_project_title_input = $("#change_project_title_input");
		let newProjectTitle = $change_project_title_input.val();

		if ( newProjectTitle === "" ){
			window.alert("Project Title cannot be empty");
			return;
		}

		let requestObj = { projectId : this._projectIdentifierFromURL, projectTitle : newProjectTitle };

		const url = "d/rws/for-page/project-update-title";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => {});

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._saveProjectTitleResponse( { requestObj, responseData, clickThis } );

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_saveProjectTitleResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
		if ( ! responseData.status ) {
			throw Error("responseData.status not true");
		}
		
		let $project_title_display = $("#project_title_display");
		$project_title_display.text( requestObj.projectTitle );
		
		let $header_project_title = $("#header_project_title");
		$header_project_title.text( requestObj.projectTitle );
		
		this._closeChangeProjectTitle( { clickThis } );
	}
	
	/**
	 * 
	 */
	_cancelChangeProjectTitle( { clickThis } : { clickThis: any } ) {
		this._closeChangeProjectTitle( { clickThis } );
	}

	/**
	 * 
	 */
	_closeChangeProjectTitle( { clickThis } : { clickThis: any } ) {

		let $change_project_title_container = $("#change_project_title_container");
		$change_project_title_container.hide();
	}


	/**
	 * 
	 */
	_openChangeProjectAbstract( { clickThis } : { clickThis: any } ) {
		
		let $project_abstract_display = $("#project_abstract_display");
		let project_abstract_display = $project_abstract_display.text();
		let $change_project_abstract_input = $("#change_project_abstract_input");
		$change_project_abstract_input.val( project_abstract_display );
		
		let $change_project_abstract_container = $("#change_project_abstract_container");
		$change_project_abstract_container.show();
		
		let $abstract_display_container = $("#abstract_display_container");
		$abstract_display_container.hide();
	}

	/**
	 * 
	 */
	_saveProjectAbstract( { clickThis } : { clickThis: any } ) {
		
		let objectThis = this;
		
		let $change_project_abstract_input = $("#change_project_abstract_input");
		let newProjectAbstract = $change_project_abstract_input.val();

		let requestObj = { projectId : this._projectIdentifierFromURL, projectAbstract : newProjectAbstract };

		const url = "d/rws/for-page/project-update-abstract";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._saveProjectAbstractResponse( { requestObj, responseData, clickThis } );

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_saveProjectAbstractResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
		if ( ! responseData.status ) {
			throw Error("responseData.status not true");
		}
		
		let $project_abstract_display = $("#project_abstract_display");
		$project_abstract_display.text( requestObj.projectAbstract );
		
		let $header_project_abstract = $("#header_project_abstract");
		$header_project_abstract.text( requestObj.projectAbstract );
		
		this._closeChangeProjectAbstract( { clickThis } );
	}
	
	/**
	 * 
	 */
	_cancelChangeProjectAbstract( { clickThis } : { clickThis: any } ) {
		this._closeChangeProjectAbstract( { clickThis } );
	}

	/**
	 * 
	 */
	_closeChangeProjectAbstract( { clickThis } : { clickThis: any } ) {

		let $change_project_abstract_container = $("#change_project_abstract_container");
		$change_project_abstract_container.hide();

		let $abstract_display_container = $("#abstract_display_container");
		$abstract_display_container.show();
	}

	/////////////////////////
	
	///////    Lock/Unlock Project
	


	/**
	 * 
	 */
	_lockProject( { clickThis } : { clickThis: any } ) {

		let objectThis = this;
		
		let requestObj = { projectIdentifier : this._projectIdentifierFromURL };

		const url = "d/rws/for-page/project-lock-project";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._lockProjectProcessResponse( { requestObj, responseData, clickThis } );

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_lockProjectProcessResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
		if ( ! responseData.statusSuccess ) {
			throw Error("responseData.statusSuccess not true");
		}

		//  reload current URL
		window.location.reload(true);
	}
	
	/**
	 * 
	 */
	_unlockProject( { clickThis } : { clickThis: any } ) {

		let objectThis = this;
		
		let requestObj = { projectIdentifier : this._projectIdentifierFromURL };

		const url = "d/rws/for-page/project-unlock-project";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._unlockProjectProcessResponse( { requestObj, responseData, clickThis } );

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_unlockProjectProcessResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
		if ( ! responseData.statusSuccess ) {
			throw Error("responseData.statusSuccess not true");
		}

		//  reload current URL
		window.location.reload(true);
	}
	
};


