/**
 * projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Admin - Copy Move Searches to another Project
 *
 * Supports Overlay Component in projectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component.tsx
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";


/**
 * Result from function projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_Results {

    status: boolean
    otherProjects: Array<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_ResultEntry>
}

/**
 * Result Entry from function projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_ResultEntry {

    projectId: number
    projectTitle: string
}

/**
 *
 */
export const projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo = function(
    {
        projectIdentifier, projectSearchIdsSelected
    } : {
        projectIdentifier : string
        projectSearchIdsSelected: Set<number>
    } ) : Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_Results> {

    const projectSearchIdsSelected_Array = Array.from( projectSearchIdsSelected );

    return new Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_Results>(function(resolve, reject) {
        try {
            let requestObj = {
                projectIdentifier,
                projectSearchIdsBeingCopied: projectSearchIdsSelected_Array
            };

            const url = "d/rws/for-page/list-other-projects-excluding-project-search-ids";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    const result: ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_Results =  responseData;
                    if ( result.status === undefined || result.status === null ) {
                        const msg = "( result.status === undefined || result.status === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( result.otherProjects === undefined || result.otherProjects === null ) {
                        const msg = "( result.otherProjects === undefined || result.otherProjects === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! ( result.otherProjects instanceof Array ) ) {
                        const msg = "( ! ( result.otherProjects instanceof Array ) ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    for ( const otherProject of result.otherProjects ) {
                        if ( otherProject.projectId === undefined || otherProject.projectId === null ) {
                            const msg = "( otherProject.projectId === undefined || otherProject.projectId === null ): URL: " + url;
                            console.warn( msg );
                            throw Error( msg );
                        }
                        if ( otherProject.projectTitle === undefined || otherProject.projectTitle === null ) {
                            const msg = "( otherProject.projectTitle === undefined || otherProject.projectTitle === null ): URL: " + url;
                            console.warn( msg );
                            throw Error( msg );
                        }
                        if ( ! limelight__variable_is_type_number_Check( otherProject.projectId ) ) {
                            const msg = "( ! limelight__variable_is_type_number_Check( otherProject.projectId ) ): URL: " + url;
                            console.warn( msg );
                            throw Error( msg );
                        }
                        if ( ! limelight__IsVariableAString( otherProject.projectTitle ) ) {
                            const msg = "( ! limelight__IsVariableAString( otherProject.projectTitle ) ): URL: " + url;
                            console.warn( msg );
                            throw Error( msg );
                        }
                    }

                    resolve( result );

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

/////


/**
 * Result from function projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_Results {

    status: boolean
    projectSearchDataEntriesInProject: Array<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResultEntry>
}

/**
 * Result Entry from function projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResultEntry {

    projectSearchId: number
    searchId: number
    searchName: string
}


/**
 * Get the Project Search Ids trying to Copy/Move that have associated Search Ids already in the target Project Id
 */
export const projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject = function(
    {
        projectId, projectSearchIds
    } : {
        projectId : number
        projectSearchIds: Set<number>
    } ) : Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_Results> {

    const projectSearchIdsSelected_Array = Array.from( projectSearchIds );

    return new Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_Results>(function(resolve, reject) {
      try {
        let requestObj = {
            projectId,
            projectSearchIds: projectSearchIdsSelected_Array
        };

        const url = "d/rws/for-page/list-project-search-ids-where-assoc-search-ids-already-in-project";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { reject() }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {

                const result: ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_Results =  responseData;
                if ( result.status === undefined || result.status === null ) {
                    const msg = "( result.status === undefined || result.status === null ): URL: " + url;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( result.projectSearchDataEntriesInProject === undefined || result.projectSearchDataEntriesInProject === null ) {
                    const msg = "( result.projectSearchDataEntriesInProject === undefined || result.projectSearchDataEntriesInProject === null ): URL: " + url;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( ! ( result.projectSearchDataEntriesInProject instanceof Array ) ) {
                    const msg = "( ! ( result.projectSearchDataEntriesInProject instanceof Array ) ): URL: " + url;
                    console.warn( msg );
                    throw Error( msg );
                }
                for ( const projectSearchDataEntry of result.projectSearchDataEntriesInProject ) {

                    if ( projectSearchDataEntry.projectSearchId === undefined || projectSearchDataEntry.projectSearchId === null ) {
                        const msg = "( projectSearchDataEntry.projectSearchId === undefined || projectSearchDataEntry.projectSearchId === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( projectSearchDataEntry.searchId === undefined || projectSearchDataEntry.searchId === null ) {
                        const msg = "( projectSearchDataEntry.searchId === undefined || projectSearchDataEntry.searchId === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( projectSearchDataEntry.searchName === undefined || projectSearchDataEntry.searchName === null ) {
                        const msg = "( projectSearchDataEntry.searchName === undefined || projectSearchDataEntry.searchName === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! limelight__variable_is_type_number_Check( projectSearchDataEntry.projectSearchId ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( projectSearchDataEntry.projectSearchId ) ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! limelight__variable_is_type_number_Check( projectSearchDataEntry.searchId ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( projectSearchDataEntry.searchId ) ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! limelight__IsVariableAString( projectSearchDataEntry.searchName ) ) {
                        const msg = "( ! limelight__IsVariableAString( projectSearchDataEntry.searchName ) ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                }

                resolve( result )

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

///////


/**
 * Result from function projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches
 */
export class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results {

    status: boolean
    experimentsWhereDeleted: boolean
    copyToProjectMarkedForDeletion: boolean
    copyToProjectDisabled: boolean
    projectSearchIds_NotFoundInDatabase: Array<number>
}

/**
 *
 */
export const projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches = function(
    {
        projectIdentifier, projectSearchIdsSelected, experimentIds_To_Delete, chosenProjectId, copyAnyAssociatedTags, doCopy, doMove
    } : {
        projectIdentifier : string
        projectSearchIdsSelected: Set<number>
        experimentIds_To_Delete: Set<number>
        chosenProjectId: number
        copyAnyAssociatedTags: boolean
        doCopy: boolean
        doMove: boolean

    } ) : Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results> {

    const projectSearchIdsSelected_Array = Array.from( projectSearchIdsSelected );

    let experimentIds_To_Delete_Array : Array<number> = null;

    if ( experimentIds_To_Delete && experimentIds_To_Delete.size > 0 ) {
        experimentIds_To_Delete_Array = Array.from( experimentIds_To_Delete );
    }

    let requestObj = {
        projectIdentifier: projectIdentifier,  // current project
        projectSearchIdsSelected: projectSearchIdsSelected_Array, // to copy or move
        experimentIds_Containing_ProjectSearchIds: experimentIds_To_Delete_Array,
        copyOrMoveToProjectId: chosenProjectId, // Project Id to copy or move to
        copyAnyAssociatedTags,
        copyToOtherProject: doCopy,  // true if copy
        moveToOtherProject: doMove  // true if move
    };

    const url = "d/rws/for-page/copy-or-move-project-search-ids-to-new-project";

    return new Promise<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results>(function(resolve, reject) {
        try {
            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch(() => {
            });

            promise_webserviceCallStandardPost.then(({responseData}) => {
                try {
                    const result: ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results = responseData;
                    if ( result.status === undefined || result.status === null ) {
                        const msg = "( result.status === undefined || result.status === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( result.experimentsWhereDeleted === undefined || result.experimentsWhereDeleted === null ) {
                        const msg = "( result.experimentsWhereDeleted === undefined || result.experimentsWhereDeleted === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( result.copyToProjectMarkedForDeletion === undefined || result.copyToProjectMarkedForDeletion === null ) {
                        const msg = "( result.copyToProjectMarkedForDeletion === undefined || result.copyToProjectMarkedForDeletion === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( result.copyToProjectDisabled === undefined || result.copyToProjectDisabled === null ) {
                        const msg = "( result.copyToProjectDisabled === undefined || result.copyToProjectDisabled === null ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    if ( ! result.status && ( ! ( result.experimentsWhereDeleted || result.copyToProjectMarkedForDeletion || result.copyToProjectDisabled || result.projectSearchIds_NotFoundInDatabase ) ) ) {
                        const msg = "( ! result.status && ( ! ( result.experimentsWhereDeleted || result.copyToProjectMarkedForDeletion || result.copyToProjectDisabled || result.projectSearchIds_NotFoundInDatabase ) ) ): URL: " + url;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    resolve( result );

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    });
}
