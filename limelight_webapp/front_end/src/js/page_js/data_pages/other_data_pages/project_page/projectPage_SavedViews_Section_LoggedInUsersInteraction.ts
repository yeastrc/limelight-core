/**
 * projectPage_SavedViews_Section_LoggedInUsersInteraction.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Saved Views Section - Provide interaction for Logged In Users
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import 

//  Import Handlebars templates

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
    projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay,
    ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionParams
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component";

//  Local imports

/**
 * 
 */
export class ProjectPage_SavedViews_Section_LoggedInUsersInteraction {

    private _initializeCalled = false;

    private _projectIdentifierFromURL: string;

	/**
	 * 
	 */
	constructor({ 
		projectIdentifierFromURL
	}:{
        projectIdentifierFromURL: string
    }) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
	}

	/**
	 * 
	 */
	initialize() {

		this._initializeCalled = true;
	}

	openChangeLabel( params: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionParams ) {

        projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay(params)
    }


    ////////////////////////////////////////

    //   Delete

	/**
	 * 
	 */  
    deleteSavedView_OnServer( { id } : { id: any } ) {
    
        return new Promise(function(resolve, reject) {
          try {
            let requestObj = {
                id
            };

			const url = "d/rws/for-page/delete-saved-view";

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
    }
    
}
