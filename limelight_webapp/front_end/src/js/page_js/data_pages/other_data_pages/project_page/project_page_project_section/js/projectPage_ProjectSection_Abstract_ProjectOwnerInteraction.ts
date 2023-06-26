/**
 * projectPage_ProjectSection_Abstract_ProjectOwnerInteraction.ts
 *
 * Javascript for projectView.jsp page - Project Section - Abstract
 *
 * Project Info Section - Provide interaction for Logged In Users
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {ProjectPage_ProjectSection_AllUsersInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_AllUsersInteraction";
import { ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback_Params } from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component";
import {
    projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay,
    ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback,
    ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component";

/**
 *
 */
export class ProjectPage_ProjectSection_Abstract_ProjectOwnerInteraction {

    private _initializeCalled: boolean
    private _projectIdentifierFromURL : string
    private _projectLocked : boolean

    private _abstract_NotEncoded: string
    private _projectPage_ProjectSection_AllUsersInteraction: ProjectPage_ProjectSection_AllUsersInteraction



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

        this._initializeCalled = true;
    }

    /**
     *
     */
    initialize_After_AllUsersInteraction_add_AbstractToPage(
        {
            abstract_NotEncoded, projectPage_ProjectSection_AllUsersInteraction
        } : {
            abstract_NotEncoded: string
            projectPage_ProjectSection_AllUsersInteraction: ProjectPage_ProjectSection_AllUsersInteraction
        }
    ) {

        this._abstract_NotEncoded = abstract_NotEncoded;
        this._projectPage_ProjectSection_AllUsersInteraction = projectPage_ProjectSection_AllUsersInteraction

        const objectThis = this;


        let $change_project_abstract_button = $("#change_project_abstract_button");
        // if ($change_project_abstract_button.length === 0) {
        //     throw Error( "Unable to find '#change_project_abstract_button'" );
        // }
        if ($change_project_abstract_button.length !== 0) {
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
        }
        // let $change_project_abstract_save = $("#change_project_abstract_save");
        // // if ($change_project_abstract_save.length === 0) {
        // //     throw Error( "Unable to find '#change_project_abstract_save'" );
        // // }
        // if ($change_project_abstract_save.length !== 0) {
        //     $change_project_abstract_save.click(function(eventObject) {
        //         try {
        //             event.preventDefault(); // to stop the
        //             let clickThis = this;
        //             objectThis._saveProjectAbstract( { clickThis } );
        //         } catch( e ) {
        //             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //             throw e;
        //         }
        //     });
        // }
        // let $change_project_abstract_cancel = $("#change_project_abstract_cancel");
        // // if ($change_project_abstract_cancel.length === 0) {
        // //     throw Error( "Unable to find '#change_project_abstract_cancel'" );
        // // }
        // if ($change_project_abstract_cancel.length !== 0) {
        //     $change_project_abstract_cancel.click(function(eventObject) {
        //         try {
        //             event.preventDefault(); // to stop the
        //             let clickThis = this;
        //             objectThis._cancelChangeProjectAbstract( { clickThis } );
        //         } catch( e ) {
        //             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        //             throw e;
        //         }
        //     });
        // }
    }



    /**
     *
     */
    _openChangeProjectAbstract( { clickThis } : { clickThis: any } ) {

        const abstract_display_outer_containerDOMElement = document.getElementById("abstract_display_outer_container")
        if ( ! abstract_display_outer_containerDOMElement ) {
            throw Error("NO DOM element with id 'abstract_display_outer_container'")
        }

        const buttonContainer_BoundingRect = abstract_display_outer_containerDOMElement.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        const change_Callback = (params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params) => {

            this._abstract_NotEncoded = params.newProjectAbstract
            
            this._projectPage_ProjectSection_AllUsersInteraction.put_Abstract_NotEncoded_Onto_Page({abstract_NotEncoded_Onto_Page: params.newProjectAbstract })
        }

        projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay({
            projectIdentifier: this._projectIdentifierFromURL,
            existingProjectAbstract: this._abstract_NotEncoded,
            position_top,
            position_left,
            change_Callback,
            cancel_Callback: (): void => {}
        })
        // let $change_project_abstract_input = $("#change_project_abstract_input");
        // $change_project_abstract_input.val( this._abstract_NotEncoded );
        //
        // let $change_project_abstract_container = $("#change_project_abstract_container");
        // $change_project_abstract_container.show();
        //
        // let $abstract_display_container = $("#abstract_display_container");
        // $abstract_display_container.hide();
    }

    // /**
    //  *
    //  */
    // _saveProjectAbstract( { clickThis } : { clickThis: any } ) {
    //
    //     let objectThis = this;
    //
    //     let $change_project_abstract_input = $("#change_project_abstract_input");
    //     let newProjectAbstract = $change_project_abstract_input.val();
    //
    //     let requestObj = { projectId : this._projectIdentifierFromURL, projectAbstract : newProjectAbstract };
    //
    //     const url = "d/rws/for-page/project-update-abstract";
    //
    //     const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;
    //
    //     const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
    //
    //     promise_webserviceCallStandardPost.catch( () => { }  );
    //
    //     promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
    //         try {
    //             objectThis._saveProjectAbstractResponse( { requestObj, responseData, clickThis } );
    //
    //         } catch( e ) {
    //             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //             throw e;
    //         }
    //     });
    // }
    //
    // /**
    //  *
    //  */
    // _saveProjectAbstractResponse( { requestObj, responseData, clickThis } : { requestObj: any, responseData: any, clickThis: any } ) {
    //     if ( ! responseData.status ) {
    //         throw Error("responseData.status not true");
    //     }
    //
    //     this._abstract_NotEncoded = requestObj.projectAbstract;
    //
    //     this._projectPage_ProjectSection_AllUsersInteraction.put_Abstract_NotEncoded_Onto_Page({abstract_NotEncoded_Onto_Page: requestObj.projectAbstract })
    //
    //     this._closeChangeProjectAbstract( { clickThis } );
    // }

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

}


