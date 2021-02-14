/**
 * projectPage_PublicAccessSection_ProjectOwnerInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Public Access Section - Provide interaction for Project Owner , Also Provide interaction for Researcher
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  Import Handlebars templates

// @ts-ignore
import { _project_page__share_data_section_loggedin_users_template } from './projectPage__Common__ImportHandlebarsTemplates'

//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

//  Local imports



/**
 * 
 */
export class ProjectPage_PublicAccessSection_ProjectOwnerInteraction {

	private _initializeCalled = false;

	private _blockContentsIntialized = false;  //  Are the contents of the block initialized (initialized on first open)

	private _projectIdentifierFromURL: string;
	private _userIsProjectOwner: boolean;
	private _projectLocked: boolean;

	private _share_data_project_label_project_owner_template = _project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner;
	private _share_data_project_label_project_owner_prj_locked_or_researcher_template = _project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner_prj_locked_or_researcher;

	private _page_controller_path_separator: string;
	private _page_controller_ShortName_Path: string;

	private _pageURL_BeforeControllerPath: string;

	private _projectLabelLengthMax: number;

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, userIsProjectOwner, projectLocked } : { projectIdentifierFromURL: string, userIsProjectOwner: boolean, projectLocked: boolean } ) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._userIsProjectOwner = userIsProjectOwner;
		this._projectLocked = projectLocked;

		if (!_project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner) {
			throw Error("Nothing in _project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner");
		}
		if (!_project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner_prj_locked_or_researcher) {
			throw Error("Nothing in _project_page__share_data_section_loggedin_users_template.share_data_project_label_project_owner_prj_locked_or_researcher");
		}
	}

	/**
	 * 
	 */
	initialize() {
		
		const objectThis = this;
		
		//  Show/Hide Public Access Block clickable elements

		let $project_public_access_block_show = $("#project_public_access_block_show");
		if ($project_public_access_block_show.length === 0) {
			throw Error("No element with id: 'project_public_access_block_show'");
		}
		$project_public_access_block_show.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._showPublicAcessClicked();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		let $project_public_access_block_hide = $("#project_public_access_block_hide");
		if ($project_public_access_block_hide.length === 0) {
			throw Error("No element with id: 'project_public_access_block_hide'");
		}
		$project_public_access_block_hide.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._hidePublicAcessClicked();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		//  Get Controller Path for page

		const $controller_path = $("#controller_path");
		if ($controller_path.length === 0) {
			throw Error("No element with id: 'controller_path'");
		}
		const controller_path = $controller_path.text();

		//  Set URL Path before controller to span on page

		const pageURL = window.location.href

		const controllerStartIndex = pageURL.indexOf( controller_path );
		if ( controllerStartIndex === -1 ) {
			throw Error("Controller Path is not in Page URL.  Controller Path: " + controller_path + ", pageURL: " + pageURL );
		}
		this._pageURL_BeforeControllerPath = pageURL.substring( 0, controllerStartIndex );

		
		this._initializeCalled = true;
	}

	/**
	 * Show Public Access
	 */
	_showPublicAcessClicked() {
		let $project_public_access_block = $("#project_public_access_block");
		if ($project_public_access_block.length === 0) {
			throw Error("No element with id: 'project_public_access_block'");
		}
		$project_public_access_block.show();

		let $project_public_access_block_show = $("#project_public_access_block_show");
		if ($project_public_access_block_show.length === 0) {
			throw Error("No element with id: 'project_public_access_block_show'");
		}
		$project_public_access_block_show.hide();

		let $project_public_access_block_hide = $("#project_public_access_block_hide");
		if ($project_public_access_block_hide.length === 0) {
			throw Error("No element with id: 'project_public_access_block_hide'");
		}
		$project_public_access_block_hide.show();

		if ( ! this._blockContentsIntialized ) {

			this._blockContentsIntialized = true;

			this._initialize_Block();
		}
	}

	/**
	 * Hide Public Access
	 */
	_hidePublicAcessClicked() {

		let $project_public_access_block = $("#project_public_access_block");
		if ($project_public_access_block.length === 0) {
			throw Error("No element with id: 'project_public_access_block'");
		}
		$project_public_access_block.hide();

		let $project_public_access_block_hide = $("#project_public_access_block_hide");
		if ($project_public_access_block_hide.length === 0) {
			throw Error("No element with id: 'project_public_access_block_hide'");
		}
		$project_public_access_block_hide.hide();

		let $project_public_access_block_show = $("#project_public_access_block_show");
		if ($project_public_access_block_show.length === 0) {
			throw Error("No element with id: 'project_public_access_block_show'");
		}
		$project_public_access_block_show.show();

	}

	/**
	 * 
	 */
	_initialize_Block() {

		//  Get Page Controller Separator and Page Controller Short Name Path

		const $share_data_project_label_page_controller_path_separator = $("#share_data_project_label_page_controller_path_separator");
		if ( $share_data_project_label_page_controller_path_separator.length === 0 ) {
			throw Error("No element with id: 'share_data_project_label_page_controller_path_separator'");
		}
		const share_data_project_label_page_controller_path_separator = $share_data_project_label_page_controller_path_separator.text();
		if ( share_data_project_label_page_controller_path_separator === undefined ||
				share_data_project_label_page_controller_path_separator === null ||
				share_data_project_label_page_controller_path_separator === "" ) {
			throw Error("element with id: 'share_data_project_label_page_controller_path_separator' contains empty string or returned null or undefined");
		}
		this._page_controller_path_separator = share_data_project_label_page_controller_path_separator;
		
		const $share_data_project_label_page_controller_path = $("#share_data_project_label_page_controller_path");
		if ( $share_data_project_label_page_controller_path.length === 0 ) {
			throw Error("No element with id: 'share_data_project_label_page_controller_path'");
		}
		const share_data_project_label_page_controller_path = $share_data_project_label_page_controller_path.text();
		if ( share_data_project_label_page_controller_path === undefined ||
				share_data_project_label_page_controller_path === null ||
				share_data_project_label_page_controller_path === "" ) {
			throw Error("element with id: 'share_data_project_label_page_controller_path' contains empty string or returned null or undefined");
		}
		this._page_controller_ShortName_Path = share_data_project_label_page_controller_path;
		
		//////

		if ( this._userIsProjectOwner && ( ! this._projectLocked ) ) {
			
			this._initialize_ProjectOwner_ProjectNotLocked();
		} else {
			this._initialize_ProjectOwner_ProjectLocked_OR_Researcher();
		}

	}
	
	/**
	 * 
	 */
	_initialize_ProjectOwner_ProjectLocked_OR_Researcher() {
		
		const objectThis = this;

        const promise_getLabel_ProjectLabel_OnServer = this._getLabel_ProjectLabel_OnServer( {} );

        promise_getLabel_ProjectLabel_OnServer.catch((reason) => {});

        promise_getLabel_ProjectLabel_OnServer.then((result) => {
			try {
				objectThis._updateProjectLabelBlock_ProjectOwner_ProjectYesLocked_Or_Researcher_AfterGetFromServer({ labelTextFromServer : result.labelText });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
	}

	/**
	 * 
	 */
	_initialize_ProjectOwner_ProjectNotLocked() {
		
		const objectThis = this;
		
		//  Enable/Disable Public Access buttons

		let $enable_project_public_access_button = $("#enable_project_public_access_button");
		if ($enable_project_public_access_button.length === 0) {
			throw Error("No element with id: 'enable_project_public_access_button'");
		}

		$enable_project_public_access_button.click(function(eventObject) {
			try {
				let clickThis = this;
				eventObject.preventDefault();
				objectThis._enablePublicAcessClicked( { clickThis } );
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		let $disable_project_public_access_button = $("#disable_project_public_access_button");
		if ($disable_project_public_access_button.length === 0) {
			throw Error("No element with id: 'disable_project_public_access_button'");
		}
		$disable_project_public_access_button.click(function(eventObject) {
			try {
				let clickThis = this;
				eventObject.preventDefault();
				objectThis._disablePublicAcessClicked( { clickThis } );
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		this._updateProjectLabelBlock_ProjectOwner_ProjectNotLocked();
	}

	/**
	 * 
	 */
	_updateProjectLabelBlock_ProjectOwner_ProjectNotLocked() {

		const objectThis = this;
		

        const promise_getLabel_ProjectLabel_OnServer = this._getLabel_ProjectLabel_OnServer( {} );

        promise_getLabel_ProjectLabel_OnServer.catch((reason) => {});

        promise_getLabel_ProjectLabel_OnServer.then((result) => {
			try {
				objectThis._updateProjectLabelBlock_ProjectOwner_ProjectNotLocked_AfterGetFromServer({ labelTextFromServer : result.labelText });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
	}

	/**
	 * 
	 */  
    _getLabel_ProjectLabel_OnServer( {} ) : Promise<any> {
    
		const objectThis = this;
		
        return new Promise(function(resolve, reject) {
		  try {
            let requestObj = {
                projectIdentifier : objectThis._projectIdentifierFromURL
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
	_updateProjectLabelBlock_ProjectOwner_ProjectNotLocked_AfterGetFromServer({ labelTextFromServer } : { labelTextFromServer: any }) {

		const objectThis = this;

		if ( ! this._projectLabelLengthMax ) {

			//  Max length for project label
			const $share_data_project_label_max_length = $("#share_data_project_label_max_length");
			if ($share_data_project_label_max_length.length === 0) {
				throw Error("No element with id: 'share_data_project_label_max_length'");
			}
			const share_data_project_label_max_lengthString = $share_data_project_label_max_length.text();
			const share_data_project_label_max_length = Number.parseInt( share_data_project_label_max_lengthString );
			if ( Number.isNaN( share_data_project_label_max_length ) ) {
				throw Error("Element with id: 'share_data_project_label_max_length' does not contain an integer.  Contents: " + share_data_project_label_max_lengthString );
			}
			this._projectLabelLengthMax = share_data_project_label_max_length;
		}

		const $share_data_label_project_owner_project_not_locked_container = $("#share_data_label_project_owner_project_not_locked_container");
		if ($share_data_label_project_owner_project_not_locked_container.length === 0) {
			throw Error("No element with id: 'share_data_label_project_owner_project_not_locked_container'");
		}
		$share_data_label_project_owner_project_not_locked_container.empty();

		const urlBase = this._pageURL_BeforeControllerPath + this._page_controller_ShortName_Path + this._page_controller_path_separator;

		const context : any
			= {
			maxLength : this._projectLabelLengthMax,
			urlBase
		};

		if ( labelTextFromServer === null ) {
			context.showAdd = true;
			context.currentProjectURL = window.location.href;
		} else {
			context.showChangeRemove = true;
			context.labelText = labelTextFromServer;
			context.currentProjectURL = urlBase + labelTextFromServer;
		}

		const html = this._share_data_project_label_project_owner_template( context );
		$share_data_label_project_owner_project_not_locked_container.append( html );

		//  Have this button for either option
		const $share_data_label_change_button = $("#share_data_label_change_button");
		if ($share_data_label_change_button.length === 0) {
			throw Error("No element with id: 'share_data_label_change_button'");
		}
		$share_data_label_change_button.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._changeProjectLabelClicked({ clickThis : this });
				return false;
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		if ( context.showChangeRemove ) {
			
			const $share_data_label_change_init_button = $("#share_data_label_change_init_button");
			if ($share_data_label_change_init_button.length === 0) {
				throw Error("No element with id: 'share_data_label_change_init_button'");
			}
			$share_data_label_change_init_button.click(function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._changeInitProjectLabelClicked({ labelTextFromServer, clickThis : this });
					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});
			
			const $share_data_label_remove_button = $("#share_data_label_remove_button");
			if ($share_data_label_remove_button.length === 0) {
				throw Error("No element with id: 'share_data_label_remove_button'");
			}
			$share_data_label_remove_button.click(function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._removeProjectLabelClicked({ clickThis : this });
					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			const $share_data_label_cancel_change_button = $("#share_data_label_cancel_change_button");
			if ($share_data_label_cancel_change_button.length === 0) {
				throw Error("No element with id: 'share_data_label_cancel_change_button'");
			}
			$share_data_label_cancel_change_button.click(function(eventObject) {
				try {
					eventObject.preventDefault();
					const $share_data_label_change_container = $("#share_data_label_change_container");
					if ($share_data_label_change_container.length === 0) {
						throw Error("No element with id: 'share_data_label_change_container'");
					}
					$share_data_label_change_container.hide();

					//  Show main Change/Remove buttons
					const $share_data_label_change_init_remove_container = $("#share_data_label_change_init_remove_container");
					if ( $share_data_label_change_init_remove_container.length === 0 ) {
						console.log("WARN: No DOM element found with id 'share_data_label_change_init_remove_container'");
					}
					$share_data_label_change_init_remove_container.show();

					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});
			
		}

		

		

		//  Commented out since method _labelFieldChanged not implemented
		// const $share_data_label_input = $("#selector_saved_view_item_edit_label_input");
		// if ( $share_data_label_input.length === 0 ) {
		// 	console.log("WARN: No DOM element found with id 'share_data_label_input'");
		// }
		// $share_data_label_input.change(function(eventObject) {
		// 	try {
		// 		eventObject.preventDefault();
		// 		objectThis._labelFieldChanged( { fieldThis : this } );
		// 		return false;
		// 	} catch( e ) {
		// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		// 		throw e;
		// 	}
		// });
		// $share_data_label_input.keyup(function(eventObject) {
		// 	try {
		// 		eventObject.preventDefault();
		// 		objectThis._labelFieldChanged( { fieldThis : this } );
		// 		return false;
		// 	} catch( e ) {
		// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		// 		throw e;
		// 	}
		// });
	
	};

	_changeInitProjectLabelClicked({ labelTextFromServer, clickThis }: { labelTextFromServer: any, clickThis: any }) {

        const objectThis = this;

		//  Update text in input field
        const $share_data_label_input = $("#share_data_label_input");
        if ( $share_data_label_input.length === 0 ) {
            console.log("WARN: No DOM element found with id 'share_data_label_input'");
        }
        $share_data_label_input.val( labelTextFromServer );

		//  Show Update section
        const $share_data_label_change_container = $("#share_data_label_change_container");
        if ( $share_data_label_change_container.length === 0 ) {
            console.log("WARN: No DOM element found with id 'share_data_label_change_container'");
        }
		$share_data_label_change_container.show();

		//  Hide main Change/Remove buttons
        const $share_data_label_change_init_remove_container = $("#share_data_label_change_init_remove_container");
        if ( $share_data_label_change_init_remove_container.length === 0 ) {
            console.log("WARN: No DOM element found with id 'share_data_label_change_init_remove_container'");
        }
		$share_data_label_change_init_remove_container.hide();
	}

	/**
	 * 
	 */
	_changeProjectLabelClicked({ clickThis } : { clickThis: any }) {

        const objectThis = this;

        const $share_data_label_input = $("#share_data_label_input");
        if ( $share_data_label_input.length === 0 ) {
            console.log("WARN: No DOM element found with id 'share_data_label_input'");
        }
        const labelText : any = $share_data_label_input.val();

        if ( labelText === "" ) {

            //  No value so exit
            return; // EARLY EXIT
		}
		
		const $share_data_label_input_value_invalid = $("#share_data_label_input_value_invalid");
		if ( $share_data_label_input_value_invalid.length === 0 ) {
            console.log("WARN: No DOM element found with id 'share_data_label_input_value_invalid'");
		}
		
		if ( labelText.length > this._projectLabelLengthMax ) {

			$share_data_label_input_value_invalid.show();
            //  Value not Valid so exit
            return; // EARLY EXIT
		}

		if ( ! this._isValidateProjectLabel( { labelText } ) ) {

			$share_data_label_input_value_invalid.show();
            //  Value not Valid so exit
            return; // EARLY EXIT
		}

		$share_data_label_input_value_invalid.hide();


        const promise_changeLabel_ProjectLabel_OnServer = this._changeLabel_ProjectLabel_OnServer( { labelText } );

        promise_changeLabel_ProjectLabel_OnServer.catch((reason) => {});

        promise_changeLabel_ProjectLabel_OnServer.then((result) => {
			try {

				const $share_data_label_input_value_duplicate = $("#share_data_label_input_value_duplicate");
				if ( $share_data_label_input_value_duplicate.length === 0 ) {
					console.log("WARN: No DOM element found with id 'share_data_label_input_value_duplicate'");
				}
				
				if ( result.duplicateLabelEncountered ) {

					$share_data_label_input_value_duplicate.show();
					//  Value Duplicate so exit
					return; // EARLY EXIT
				}

				if ( ! result.status ) {

					throw Error("result.status is false")
				}

				$share_data_label_input_value_duplicate.hide();

				objectThis._updateProjectLabelBlock_ProjectOwner_ProjectNotLocked();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
	}

	/**
	 * 
	 */  
    _isValidateProjectLabel( { labelText }: { labelText: any } ) {

		//  Allow digits, lowercase letters, '-' and '_'
		if ( !  /^[\da-z\-_]+$/.test( labelText ) ) {
			//  value is not valid
			return false; 
		}
		return true;
	}

	/**
	 * 
	 */
	_removeProjectLabelClicked({ clickThis } : { clickThis: any }) {

		const objectThis = this;
		
		if ( ! window.confirm("Remove Custom Label?") ) {
			return;
		}

        const promise_changeLabel_ProjectLabel_OnServer = this._changeLabel_ProjectLabel_OnServer( { labelText : null } );

        promise_changeLabel_ProjectLabel_OnServer.catch((reason) => {});

        promise_changeLabel_ProjectLabel_OnServer.then((result) => {
			try {
				objectThis._updateProjectLabelBlock_ProjectOwner_ProjectNotLocked();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
	}

	/**
	 * 
	 */  
    _changeLabel_ProjectLabel_OnServer( { labelText } : { labelText: any } ) : Promise<any> {
    
		const objectThis = this;
		
        return new Promise(function(resolve, reject) {
		  try {
            let requestObj = {
                labelText,
                projectIdentifier : objectThis._projectIdentifierFromURL
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
	 * Display only of Project Label in URL
	 */
	_updateProjectLabelBlock_ProjectOwner_ProjectYesLocked_Or_Researcher_AfterGetFromServer({ labelTextFromServer } : { labelTextFromServer : any }) {

		const $share_data_label_project_owner_project_locked_or_researcher_container = $("#share_data_label_project_owner_project_locked_or_researcher_container");
		if ($share_data_label_project_owner_project_locked_or_researcher_container.length === 0) {
			throw Error("No element with id: 'share_data_label_project_owner_project_locked_or_researcher_container'");
		}
		$share_data_label_project_owner_project_locked_or_researcher_container.empty();

		const urlBase = this._pageURL_BeforeControllerPath + this._page_controller_ShortName_Path + this._page_controller_path_separator;

		const context : any = { };

		if ( labelTextFromServer === null ) {
			context.currentProjectURL = window.location.href;
		} else {
			context.currentProjectURL = urlBase + labelTextFromServer;
		}

		const html = this._share_data_project_label_project_owner_prj_locked_or_researcher_template( context );
		$share_data_label_project_owner_project_locked_or_researcher_container.append( html );
	}

	///////////////

	/**
	 * 
	 */
	_enablePublicAcessClicked( { clickThis } : { clickThis: any } ) {

		let objectThis = this;

		let requestObj = { projectIdentifier : this._projectIdentifierFromURL };

		const url = "d/rws/for-page/project-enable-public-access";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
			try {
				objectThis._enablePublicAcessProcessResponse( { requestObj, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_enablePublicAcessProcessResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any }  ) {
		if ( ! responseData.statusSuccess ) {
			throw Error("responseData.statusSuccess not true");
		}

		let $show_when_public_access_or_public_access_code_enabled_jq = $(".show_when_public_access_or_public_access_code_enabled_jq");
		let $show_when_public_access_or_public_access_code_disabled_jq = $(".show_when_public_access_or_public_access_code_disabled_jq");
		$show_when_public_access_or_public_access_code_disabled_jq.hide();
		$show_when_public_access_or_public_access_code_enabled_jq.show();
	}
	
	/**
	 * 
	 */
	_disablePublicAcessClicked( { clickThis } : { clickThis: any }  ) {

		let objectThis = this;

		let requestObj = { projectIdentifier : this._projectIdentifierFromURL };

		const url = "d/rws/for-page/project-disable-public-access";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => {  }  );

		promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
			try {
				objectThis._disablePublicAcessProcessResponse( { requestObj, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_disablePublicAcessProcessResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
		if ( ! responseData.statusSuccess ) {
			throw Error("responseData.statusSuccess not true");
		}

		let $show_when_public_access_or_public_access_code_enabled_jq = $(".show_when_public_access_or_public_access_code_enabled_jq");
		let $show_when_public_access_or_public_access_code_disabled_jq = $(".show_when_public_access_or_public_access_code_disabled_jq");
		$show_when_public_access_or_public_access_code_enabled_jq.hide();
		$show_when_public_access_or_public_access_code_disabled_jq.show();
	}
	
};


