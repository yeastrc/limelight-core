/**
 * manage__importer_pipeline_execution__for_admin_page__webservice_call__schedule_get.ts
 *
 *
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Constants_Enums";
import { limelight__variable_is_type_number_Check } from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response {

    readonly scheduleJSON_PrevLastUpdated_Milliseconds: number  // can be null
    readonly scheduleJSON_Root: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root //  can be null or undefined
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root {

    readonly schedulePauseItemList: ReadonlyArray<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item>
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item {

    readonly dayList: ReadonlyArray<number>;  //  from 1 to 7   Sun to Sat
    readonly startTime_24HourClock: number;
    readonly durationInHours: number;
}


/**
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get = function () :

    Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response>
    {
        return new Promise<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response>(( resolve, reject) => { try {

            const url = "admin/rws/for-page/manage-run-importer-pause-schedule-get";

            console.log("START: AJAX Call to " + url + ", Now: " + new Date() );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : {}, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { try {
                reject(reason)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                console.log("END: AJAX Call to " + url + ", Now: " + new Date() );

                resolve( _processWebserviceResult( responseData ) )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})

}

/**
 *
 */
const _processWebserviceResult = function( responseData: any ) : Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response {


    if ( responseData.scheduleJSON === undefined ) {   //  Can be null;
        throw Error("( responseData.scheduleJSON === undefined )")
    }

    if ( responseData.scheduleJSON !== null && responseData.scheduleJSON_Version !== 1 ) {
        throw Error("( responseData.scheduleJSON !== null && responseData.scheduleJSON_Version !== 1 )")
    }

    if ( responseData.scheduleJSON !== null && responseData.scheduleJSON_PrevLastUpdated_Milliseconds === undefined ) {
        throw Error("( responseData.scheduleJSON !== null && responseData.scheduleJSON_PrevLastUpdated_Milliseconds === undefined )")
    }

    if ( responseData.scheduleJSON_PrevLastUpdated_Milliseconds !== null && ( ! limelight__variable_is_type_number_Check( responseData.scheduleJSON_PrevLastUpdated_Milliseconds ) ) ) {
        throw Error("( responseData.scheduleJSON_PrevLastUpdated_Milliseconds !== null && ( ! limelight__variable_is_type_number_Check( responseData.scheduleJSON_PrevLastUpdated_Milliseconds ) ) )")
    }

    let scheduleJSON_Object: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root

    if ( responseData.scheduleJSON !== null ) {

        try {
            scheduleJSON_Object = JSON.parse( responseData.scheduleJSON )
        } catch( e ) {
            console.warn( "Failed to parse as JSON: responseData.scheduleJSON: " + responseData.scheduleJSON )
            throw e;
        }

        if ( ! scheduleJSON_Object.schedulePauseItemList ) {
            throw Error("( ! scheduleJSON_Object.schedulePauseItemList )")
        }
        if ( ! ( scheduleJSON_Object.schedulePauseItemList instanceof Array ) ) {
            throw Error("( ! ( scheduleJSON_Object.schedulePauseItemList instanceof Array ) )")
        }

        for ( const item of scheduleJSON_Object.schedulePauseItemList ) {

            if ( item.dayList === null || item.dayList === undefined ) {
                throw Error("( item.dayList === null || item.dayList === undefined )")
            }
            if ( ! ( item.dayList instanceof Array ) ) {
                throw Error("( ! ( item.dayList instanceof Array ) )")
            }
            for ( const dayListItem of item.dayList ) {
                if ( dayListItem === null || dayListItem === undefined ) {
                    throw Error("( dayListItem === null || dayListItem === undefined )")
                }
                if ( ! limelight__variable_is_type_number_Check( dayListItem ) ) {
                    throw Error("( ! limelight__variable_is_type_number_Check( dayListItem ) )")
                }
            }
            if ( item.startTime_24HourClock === null || item.startTime_24HourClock === undefined ) {
                throw Error("( item.startTime_24HourClock === null || item.startTime_24HourClock === undefined )")
            }
            if ( ! limelight__variable_is_type_number_Check( item.startTime_24HourClock ) ) {
                throw Error("( ! limelight__variable_is_type_number_Check( item.startTime_24HourClock ) )")
            }
            if ( item.durationInHours === null || item.durationInHours === undefined ) {
                throw Error("( item.durationInHours === null || item.durationInHours === undefined )")
            }
            if ( ! limelight__variable_is_type_number_Check( item.durationInHours ) ) {
                throw Error("( ! limelight__variable_is_type_number_Check( item.durationInHours ) )")
            }
        }
    }

    const result: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response = {

        scheduleJSON_PrevLastUpdated_Milliseconds: responseData.scheduleJSON_PrevLastUpdated_Milliseconds, //  Can be null;
        scheduleJSON_Root: scheduleJSON_Object
    }

    return result
}