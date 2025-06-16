/**
 * projectPage_ListExperimentsContainingProjectSearchIds.ts
 *
 * Javascript for projectView.jsp page
 *
 * Get Experiments for Project Search Ids
 */


import {webserviceCallStandardPost} from "../../../../../webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "../../../../../common_all_pages/reportWebErrorToServer";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";


export class ProjectPage_ListExperimentsContainingProjectSearchIds_Result {

    experiments: Array<ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry>
}

export class ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry {

    experimentId: number
    experimentName: string
    experimentNoInProject: boolean
    projectSearchIds: Set<number>
}

/**
 * List Experiments Containing ProjectSearchIds
 */
export const projectPage_ListExperimentsContainingProjectSearchIds = function (
    {
        projectSearchIds,
        projectIdentifier
    } : {
        projectSearchIds: Set<number>
        projectIdentifier : string

    }) : Promise<ProjectPage_ListExperimentsContainingProjectSearchIds_Result> {

    if ( ! projectSearchIds ) {
        const msg = "projectPage_ListExperimentsContainingProjectSearchIds: no value for param projectSearchIds";
        console.warn(msg);
        throw Error(msg);
    }
    if ( projectSearchIds.size === 0 ) {
        const msg = "projectPage_ListExperimentsContainingProjectSearchIds: param projectSearchIds is empty";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! projectIdentifier ) {
        const msg = "projectPage_ListExperimentsContainingProjectSearchIds: no value for param projectIdentifier";
        console.warn(msg);
        throw Error(msg);
    }

    const projectSearchId_Array = Array.from( projectSearchIds );

    let requestObj = {
        projectSearchIds : projectSearchId_Array,
        projectIdentifier
    };

    return new Promise<ProjectPage_ListExperimentsContainingProjectSearchIds_Result>( (resolve, reject) => {

        const url = "d/rws/for-page/list-experiments-containing-project-search-ids";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: true }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => {
            reject(reason);
        }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                const result = _projectPage_ListExperimentsContainingProjectSearchIds_convertResponse( responseData );

                resolve( result );

            } catch (e) {
                console.warn("Exception from call _projectPage_ListExperimentsContainingProjectSearchIds_convertResponse", e );
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        });
    });
}

/**
 * @param responseData
 */
const _projectPage_ListExperimentsContainingProjectSearchIds_convertResponse = function ( responseData: any ) : ProjectPage_ListExperimentsContainingProjectSearchIds_Result {

    if ( ! responseData.status ) {
        const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! responseData.status )";
        console.warn( msg );
        throw Error(msg);
    }
    if ( ! responseData.experiments ) {
        const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! responseData.experiments )";
        console.warn( msg );
        throw Error(msg);
    }
    if ( ! ( responseData.experiments instanceof Array ) ) {
        const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! ( responseData.experiments instanceof Array ) )";
        console.warn( msg );
        throw Error(msg);
    }

    const experiments: Array<ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry> = [];

    for ( const experiment_FromServer of responseData.experiments ) {

        if ( ! limelight__variable_is_type_number_Check( experiment_FromServer.experimentId ) ) {
            const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! limelight__variable_is_type_number_Check( experiment_FromServer.experimentId ) ) ";
            console.warn( msg );
            throw Error(msg);
        }
        if ( ! limelight__IsVariableAString( experiment_FromServer.experimentName ) ) {
            const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! limelight__IsVariableAString( experiment_FromServer.experimentName ) ) ";
            console.warn( msg );
            throw Error(msg);
        }

        if ( ! experiment_FromServer.projectSearchIds ) {
            const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! experiment_FromServer.projectSearchIds )";
            console.warn( msg );
            throw Error(msg);
        }
        if ( ! ( experiment_FromServer.projectSearchIds instanceof Array ) ) {
            const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! ( experiment_FromServer.projectSearchIds instanceof Array ) )";
            console.warn( msg );
            throw Error(msg);
        }
        for ( const projectSearchId of experiment_FromServer.projectSearchIds ) {
            if ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) {
                const msg = "_projectPage_ListExperimentsContainingProjectSearchIds_convertResponse: ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) ";
                console.warn( msg );
                throw Error(msg);
            }
        }

        const element : ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry = {
            experimentId: experiment_FromServer.experimentId,
            experimentName: experiment_FromServer.experimentName,
            experimentNoInProject: experiment_FromServer.experimentNoInProject,
            projectSearchIds: new Set<number>( experiment_FromServer.projectSearchIds )
        }

        experiments.push( element );
    }

    const result : ProjectPage_ListExperimentsContainingProjectSearchIds_Result = {
        experiments
    }

    return  result;
}



//
//
// export class ProjectPage_ListExperimentsContainingProjectSearchIds_Result {
//
//     experiments: Array<ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry>
// }
//
// export class ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry {
//
//     experimentId: number
//     experimentName: string
//     experimentNoInProject: boolean
//     projectSearchIds: Set<number>
// }