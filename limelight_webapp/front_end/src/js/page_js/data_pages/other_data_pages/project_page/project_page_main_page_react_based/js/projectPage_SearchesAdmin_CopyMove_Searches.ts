/**
 * projectPage_SearchesAdmin_CopyMove_Searches.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Admin - Copy Move Searches to another Project
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

import { _project_page_searches_section_researcher_user_interaction_template } from '../../projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay';
import {ProjectPage_SearchesSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_AllUsersInteraction";




/**
 * 
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches {

    private _initializeCalled = false;

    private _projectIdentifierFromURL;

    private _projectPage_SearchesSection_AllUsersInteraction : ProjectPage_SearchesSection_AllUsersInteraction = undefined;  //  Set in initialize(...) method

    private _project_searches_copy_move_container_template =
        _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_container_template;
    private _project_searches_copy_move_item_template =
        _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_item_template;
    private _project_searches_copy_move_confirm_container_template =
        _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_confirm_container_template;
    private _project_searches_copy_move_finished_container_template =
        _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_finished_container_template;


    private _projectSearchIdsSearchIdsSelected;

    private _modalOverlay;

    /**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ projectIdentifierFromURL }) {

        this._projectIdentifierFromURL = projectIdentifierFromURL;

        if ( ! _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_container_template ) {
            throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_container_template");
        }
        if ( ! _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_item_template ) {
            throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_item_template");
        }
        if ( ! _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_confirm_container_template ) {
            throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_confirm_container_template");
        }
        if ( ! _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_finished_container_template ) {
            throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template.project_searches_copy_move_confirm_container_template");
        }
    }

	/**
	 * 
	 */
	initialize(
	    {
            projectPage_SearchesSection_AllUsersInteraction
	    } : {
            projectPage_SearchesSection_AllUsersInteraction: ProjectPage_SearchesSection_AllUsersInteraction
        }) {

        this._projectPage_SearchesSection_AllUsersInteraction = projectPage_SearchesSection_AllUsersInteraction;

        this._initializeCalled = true;
    }

    /**
     *
     * @param doCopy
     * @param doMove
     * @param projectSearchIdsSelected
     */
    openOverlay_ForCopyMoveSearches(
        {
            doCopy, doMove, projectSearchIdsSelected
        } : {

            doCopy: boolean
            doMove: boolean
            projectSearchIdsSelected: Set<number>

        } ) : boolean {
    
        const objectThis = this;

        if ( projectSearchIdsSelected.size === 0 ) {
            return false; // No project search ids found to process
        }

		//  Copy to array of just project each ids
		const projectSearchIdsSelected_Array = Array.from( projectSearchIdsSelected );;

        const getOtherProjectsCanCopyMoveProjectSearchIdsTo_Promise =
            this._getOtherProjectsCanCopyMoveProjectSearchIdsTo({ projectIdentifier: this._projectIdentifierFromURL, projectSearchIdsSelected: projectSearchIdsSelected_Array });

        getOtherProjectsCanCopyMoveProjectSearchIdsTo_Promise.catch((reason) => {});

        getOtherProjectsCanCopyMoveProjectSearchIdsTo_Promise.then((responseData) => {
            try {
                objectThis._populateOtherProjectsForCopySearchesOverlay( { projectSearchIdsSelected: projectSearchIdsSelected_Array, responseData, doCopy, doMove } );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
	 * 
	 */  
    _getOtherProjectsCanCopyMoveProjectSearchIdsTo( { projectIdentifier, projectSearchIdsSelected } ) {
    
        return new Promise(function(resolve, reject) {
          try {
            let requestObj = {
                projectIdentifier,
                projectSearchIdsBeingCopied: projectSearchIdsSelected
            };

			const url = "d/rws/for-page/list-other-projects-excluding-project-search-ids";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
    
	/**
	 * 
	 */  
    _populateOtherProjectsForCopySearchesOverlay( { projectSearchIdsSelected, responseData, doCopy, doMove } ) {
    
        const objectThis = this;

        this._projectSearchIdsSearchIdsSelected = projectSearchIdsSelected; // Save off current list

        const otherProjects = responseData.otherProjects;

        const modelDialogContentsContext = { doCopy, doMove, noProjectsFound : false };

        if ( otherProjects.length === 0) {
            //  No other projects found
            modelDialogContentsContext.noProjectsFound = true;
        }

        // create overlay

		const $contentDiv = this._createModalOverlayContentDiv( modelDialogContentsContext );

		this._modalOverlay = this._createModalOverlay( { $contentDiv, doCopy, doMove } );

		this._modalOverlay.show();

        if ( otherProjects.length === 0) {
            //  No other projects found
            return;
        }
        
        const $copy_searches_other_project_list = $contentDiv.find(".selector_copy_searches_other_project_list");
        $copy_searches_other_project_list.empty();
        
        //  List the Projects can Copy/Move to
 
        for (const otherProjectsItem of  otherProjects) {
            const context = otherProjectsItem;
            const html = this._project_searches_copy_move_item_template(context);
            const $otherProjectsEntry = $(html).appendTo( $copy_searches_other_project_list );
            
            // addToolTips( $otherProjectsEntry );
    
            const $copy_search_project_choice_jqEntries = $otherProjectsEntry.find(".copy_search_project_choice_jq")
            $copy_search_project_choice_jqEntries.click(function(eventObject) {
                try {
                    eventObject.preventDefault();
                    const clickThis = this;
                    objectThis._userChoseProjectToCopyOrMoveTo_Clicked( 
                        { chosenProjectId : otherProjectsItem.projectId, chosenProjectTitle : otherProjectsItem.projectTitle, projectSearchIdsSelected, doCopy, doMove,
                            $contentDiv, clickThis, eventObject, } );
                    // objectThis._enableDisable_CopyMove_Buttons();
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    
    }

	/**
	 * User Chose a Project to Copy/Move searches to.
	 */
    _userChoseProjectToCopyOrMoveTo_Clicked({ chosenProjectId, chosenProjectTitle, projectSearchIdsSelected, doCopy, doMove, $contentDiv, clickThis, eventObject }) {

        const objectThis = this;

        const getSearchIdsPromise =
            this._getProjectSearchIdsWhereAssocSearchIdsAlreadyInProject({ projectId : chosenProjectId, projectSearchids : projectSearchIdsSelected });

        getSearchIdsPromise.catch((reason) => {});

        getSearchIdsPromise.then((responseData) => {
            try {
                objectThis._createDisplayConfirmDialogCopyMoveDialog(
                    { projectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResponseData : responseData, chosenProjectId, chosenProjectTitle, projectSearchIdsSelected, 
                        doCopy, doMove, $contentDiv });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
	 * Get the Project Search Ids trying to Copy/Move that have associated Search Ids already in the target Project Id
	 */    
    _getProjectSearchIdsWhereAssocSearchIdsAlreadyInProject({ projectId, projectSearchids }) {

        return new Promise(function(resolve, reject) {
          try {
            let requestObj = {
                projectId,
                projectSearchids
            };

			const url = "d/rws/for-page/list-project-search-ids-where-assoc-search-ids-already-in-project";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve( responseData )
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

	/**
	 * 
	 */
    _createDisplayConfirmDialogCopyMoveDialog({ 
        projectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResponseData, chosenProjectId, chosenProjectTitle, projectSearchIdsSelected, doCopy, doMove, $contentDiv }) {

        const objectThis = this;

        $contentDiv.empty(); //  Reset overlay for confirm

        const projectSearchDataEntriesInProject = projectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResponseData.projectSearchDataEntriesInProject;

        // Each entry in  projectSearchDataEntriesInProject:
        // private int projectSearchId;
        // private int searchId;
        // private String searchName;

        const templateContext = {
            chosenProjectTitle,
            projectSearchDataEntriesInProject,
            doCopy, 
            doMove
        };

        const confirmDialogHTML = this._project_searches_copy_move_confirm_container_template( templateContext );

        const $confirmDialogElement = $( confirmDialogHTML );

        $confirmDialogElement.appendTo( $contentDiv );

        const $select_copy_move_searches_confirm_button = $confirmDialogElement.find(".select_copy_move_searches_confirm_button");
        if ( $select_copy_move_searches_confirm_button.length === 0 ) {
            throw Error("No element found with class 'select_copy_move_searches_confirm_button'");
        }
        $select_copy_move_searches_confirm_button.click(function(eventObject) {
            try {
                eventObject.preventDefault();
                const clickThis = this;
                objectThis._executeCopyOrMoveSearches( { projectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResponseData, chosenProjectId, chosenProjectTitle, projectSearchIdsSelected, doCopy, doMove, $contentDiv } );
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

	/**
	 * 
	 */
    _executeCopyOrMoveSearches({ projectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResponseData, chosenProjectId, chosenProjectTitle, projectSearchIdsSelected, doCopy, doMove, $contentDiv }) {

        const objectThis = this;

        let requestObj = {
            projectIdentifier: this._projectIdentifierFromURL,  // current project
            copyOrMoveToProjectId: chosenProjectId, // Project Id to copy or move to
            projectSearchIdsSelected: projectSearchIdsSelected, // to copy or move
            copyToOtherProject: doCopy,  // true if copy
            moveToOtherProject: doMove  // true if move
        };

        const url = "d/rws/for-page/copy-or-move-project-search-ids-to-new-project";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                objectThis._executeCopySearchesComplete( { responseData, chosenProjectId, chosenProjectTitle, doCopy, doMove, $contentDiv } );
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

	/**
	 * 
	 */
    _executeCopySearchesComplete({ responseData, chosenProjectId, chosenProjectTitle, doCopy, doMove, $contentDiv }) {

        const objectThis = this;

        $contentDiv.empty(); //  Reset overlay for Status

        const templateContext = {
            chosenProjectTitle,
            doCopy,
            doMove,
            successful : undefined,
            copyToProjectMarkedForDeletion : undefined,
            copyToProjectDisabled : undefined,
            failed : undefined
        };

        if (responseData.status) {
            templateContext.successful = true;
        } else {
            if (responseData.copyToProjectMarkedForDeletion) {
                templateContext.copyToProjectMarkedForDeletion = true;
            } else if (responseData.copyToProjectDisabled) {
                templateContext.copyToProjectDisabled = true;
            } else {
                //  Shouldn't get here, no other reason for status to be false
                templateContext.failed = true;
            }
        }

        const finishStatusDialogHTML = this._project_searches_copy_move_finished_container_template(templateContext);

        const $finishStatusDialogElement = $(finishStatusDialogHTML);

        $finishStatusDialogElement.appendTo($contentDiv);

        if (responseData.status) {

            const $selector_show_project_searches_copied_moved_to = $finishStatusDialogElement.find(".selector_show_project_searches_copied_moved_to");
            if ($selector_show_project_searches_copied_moved_to.length === 0) {
                throw Error("No element found with class 'selector_show_project_searches_copied_moved_to'");
            }
            const $selector_copy_move_searches_return_to_project = $finishStatusDialogElement.find(".selector_copy_move_searches_return_to_project");
            if ($selector_copy_move_searches_return_to_project.length === 0) {
                throw Error("No element found with class 'selector_copy_move_searches_return_to_project'");
            }

            $selector_show_project_searches_copied_moved_to.click(function (eventObject) {
                try {
                    eventObject.preventDefault();
                    const clickThis = this;
                    objectThis._showProjectSearchesCopiedMovedTo({ chosenProjectId });
                    return false;
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });

            $selector_copy_move_searches_return_to_project.click(function (eventObject) {
                try {
                    eventObject.preventDefault();
                    const clickThis = this;
                    objectThis._copyMoveSearchesReturnToProject(clickThis, eventObject);
                    return false;
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        }
    }

	/**
	 * 
	 */
    _showProjectSearchesCopiedMovedTo({ chosenProjectId }) {
        document.location.href = "d/pg/project/" + chosenProjectId;  // Maybe not hard code this path
    }

	/**
	 * 
	 */
    _copyMoveSearchesReturnToProject(clickThis, eventObject) {
        //  reload/replace search list
        this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
        this._overlayClose();
    }


	/**
	 * 
	 */
	_createModalOverlayContentDiv( modelDialogContentsContext ) {

		let contentDivHTML = this._project_searches_copy_move_container_template( modelDialogContentsContext );
		let $contentDiv = $(contentDivHTML);
		return $contentDiv;
	}

	/**
	 * Create and return the overlay, but don't show it
	 * 
	 * @param {*} param0 
	 */
	_createModalOverlay( { $contentDiv, doCopy, doMove } ) {

        const objectThis = this;
        
        let overlayTitle = undefined;

        if ( doCopy ) {
            overlayTitle = 'Copy Searches';
        } else if ( doMove ) {
            overlayTitle = 'Move Searches';
        } else {
            throw Error("doCopy or doMove must be true");
        }

		let props : any = { };
		props.width = '800';
		props.height = '600'
		props.title = overlayTitle;
		props.$containerDiv = $('body');
		props.hideOnBackgroundClick = true;

		props.$contentDiv = $contentDiv;

		props.callbackOnClickedHide = function() {
			//  Overlay Hide callback
			objectThis._overlayOnClickedHide_Callback();
		}

		let overlay = new ModalOverlay(props);

		return overlay;
	}

	
	//////////////
	
	/**
	 * 
	 */
	_overlayOnClickedHide_Callback() {

        this._overlayClose();
	}
    

    _overlayClose() {

		if ( this._modalOverlay ) {
			
			this._modalOverlay.hide();
			this._modalOverlay.remove();
			this._modalOverlay = undefined;
		}
    }

}

