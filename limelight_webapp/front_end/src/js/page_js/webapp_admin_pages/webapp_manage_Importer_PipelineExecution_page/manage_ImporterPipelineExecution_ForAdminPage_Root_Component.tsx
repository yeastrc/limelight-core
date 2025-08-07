/**
 * manage_ImporterPipelineExecution_ForAdminPage_Root_Component.tsx
 *
 * Root of webappAdminManage_Importer_PipelineExecution.jsp
 *
 */


import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum,
    Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Constants_Enums";
import { manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Update_RequestedStatus } from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Update_RequestedStatus";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { ModalOverlay_Limelight_Component_v001_B_FlexBox } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item,
    manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__get__requested_status";
import {
    manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__get__current_status";
import {
    manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__schedule_get";
import { manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate } from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__schedule_insert_update";
import {
    manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount,
    Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount_Response
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage__importer_pipeline_execution__for_admin_page__webservice_call__get__running_and_queued_job_counts";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


//   Root component and below that is MAIN component


//  Root component is only for catch React error and display error message

//  MAIN component is the main component

let _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds: number

{
    //  This is a fallback until the database record is populated

    const manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_secondsDOM = document.getElementById("manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds");
    if ( ! manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_secondsDOM ) {
        const msg = "No element in DOM with id 'manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds'"
        console.warn(msg)
        throw Error(msg)
    }

    if ( ! manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_secondsDOM ) {
        const msg = "No element in DOM with id 'manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds'"
        console.warn(msg)
        throw Error(msg)
    }

    const value = manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_secondsDOM.innerText

    if ( value === undefined || value === null || value === "" ) {
        const msg = '( value === undefined || value === null || value === "" )  for DOM with id "manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds"'
        console.warn(msg)
        throw Error(msg)
    }

    _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds = Number.parseInt( value );
    if ( Number.isNaN( _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds ) ) {
        const msg = 'Number.isNaN( _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds ) for DOM with id "manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds" contents: ' + value
        console.warn(msg)
        throw Error(msg)
    }
}

///////////////

/**
 *
 */
export interface Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props {

}

/**
 *
 */
interface Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_Root_Component extends React.Component< Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props, Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_State > {

    /**
     *
     */
    constructor(props: Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    static getDerivedStateFromError(error: any): Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return {component_SubTree_Has_Error: true};
    }

    /**
     *
     */
    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'Manage_ImporterPipelineExecution_ForAdminPage_Root_Component'. componentDidCatch: ", error, errorInfo);
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    render() {

        if ( this.state.component_SubTree_Has_Error ) {

            //  Return an error message if error is caught

            return (  //  EARLY RETURN

                <div>An Error has Occurred. Please reload the page and try again.</div>
            );
        }

        return (

            <Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component />
        );
    }

}



/**
 *
 */
export interface Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component_Props {

}

/**
 *
 */
interface Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component_State {

    force_Rerender? : object
}

/**
 *
 */
export class Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component extends React.Component< Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component_Props, Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component_State > {

    //  bind to 'this' for passing as parameters

    // private _clearAll_ImporterPipelineExecution_ClickHandler_BindThis = this._clearAll_ImporterPipelineExecution_ClickHandler.bind(this);
    // private _write_ImporterPipelineExecution_SizesToLogClickHandler_BindThis = this._write_ImporterPipelineExecution_SizesToLogClickHandler.bind(this);

    private _webserviceCall_Get_RequestedStatus_Response: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response
    private _webserviceCall_Get_CurrentStatus_Response: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response
    private _webserviceCall_Schedule_Get_Response: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response

    private _webserviceCall_Get_Running_Queued_JobCount_Response: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount_Response

    private _allDataLoaded_InitialLoad: boolean = false

    private _allDataLoaded_Reload: boolean = true //  True until do reload

    //  For "Add" to Schedule block

    private _forAddToScheduleBlock_DaysOfWeek_SelectionSet: Set<number> = new Set()

    private _forAddToScheduleBlock_HoursOfDay_Selection: number = 0  // Default to zero

    private _forAddToScheduleBlock_Duration_Selection: number = null // set to null when not set


    /**
     *
     */
    constructor(props: Manage_ImporterPipelineExecution_ForAdminPage_MAIN_Component_Props) {
        super(props);

        this.state = { force_Rerender: {} };
    }

    /**
     *
     */
    componentWillUnmount() {

    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._loadData_MainDisplay()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _loadData_MainDisplay() {

        const promises: Array<Promise<void>> = []

        {
            const promiseTopLevel = new Promise<void>((resolve, reject) => { try {

                const promiseData = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus()
                promiseData.catch( (reason) => { try {
                    reject(reason)
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )
                promiseData.then(value => { try {

                    this._webserviceCall_Get_RequestedStatus_Response = value;

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

            promises.push( promiseTopLevel )
        }
        {
            const promiseTopLevel = new Promise<void>((resolve, reject) => { try {

                const promiseData = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus()
                promiseData.catch( (reason) => { try {
                    reject(reason)
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )
                promiseData.then(value => { try {

                    this._webserviceCall_Get_CurrentStatus_Response = value;

                    for ( const responseItem of this._webserviceCall_Get_CurrentStatus_Response.responseItem_Array ) {
                        if ( responseItem.type === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum.PAUSE_ALL ) {
                            _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds = responseItem.time_in_seconds_until_next_check_for_pause
                        }
                    }

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

            promises.push( promiseTopLevel )
        }
        {
            const promiseTopLevel = new Promise<void>((resolve, reject) => { try {

                const promiseData = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get()
                promiseData.catch( (reason) => { try {
                    reject(reason)
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )
                promiseData.then(value => { try {

                    this._webserviceCall_Schedule_Get_Response = value;

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

            promises.push( promiseTopLevel )
        }
        {
            const promiseTopLevel = new Promise<void>((resolve, reject) => { try {

                const promiseData = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount()
                promiseData.catch( (reason) => { try {
                    reject(reason)
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )
                promiseData.then(value => { try {

                    this._webserviceCall_Get_Running_Queued_JobCount_Response = value;

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }} )

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

            promises.push( promiseTopLevel )
        }



        const promisesAll = Promise.all( promises );

        promisesAll.catch( (reason) => { try {

            console.warn("Webservice call rejected")

            throw Error(reason)
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }} )
        promisesAll.then(value => { try {

            this._allDataLoaded_InitialLoad = true;
            this._allDataLoaded_Reload = true;
            this.setState({ force_Rerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }} )

    }

    /**
     *
     */
    private _update_RequestedStatus_ReloadAllStatus( params: INTERNAL__Update_RequestedStatus_ReloadAllStatus_Params ) : void {
        try {
            this._allDataLoaded_Reload = false

            this.setState({ force_Rerender: {} })

            const promise = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Update_RequestedStatus({
                type: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum.PAUSE_ALL,
                statusRequested: params.newRequestedStatus,
                genericPauseRequested: params.genericPauseRequested
            })
            promise.catch( (reason) => { try {

                console.warn("Webservice call rejected")

                throw Error(reason)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )
            promise.then(value => { try {

                if ( value.askUserForPauseType ) {

                    const update_RequestedStatus_ReloadAllStatus_Params_Callback = ( params: INTERNAL__Update_RequestedStatus_ReloadAllStatus_Params ) : void => {

                        this._update_RequestedStatus_ReloadAllStatus( params )
                    }

                    const cancel_Clicked_Callback = () : void => {

                        this._loadData_MainDisplay()
                    }

                    open_UserSelect_PauseType_OverlayComponent_Overlay({ mainParams: { update_RequestedStatus_ReloadAllStatus_Params_Callback, cancel_Clicked_Callback }})

                    return;  // EARLY RETURN
                }

                this._loadData_MainDisplay()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }} )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _delete_ScheduleEntry(
        {
            pauseItem_index
        } : {
            pauseItem_index: number
        }
    ) : void {
        try {
            let schedulePauseItemList: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item>

            if ( this._webserviceCall_Schedule_Get_Response && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList ) {

                schedulePauseItemList = Array.from( this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList )

                schedulePauseItemList.splice( pauseItem_index, 1 )
            } else {
                schedulePauseItemList = []
            }

            const scheduleJSON_Root_Updated: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root = {
                schedulePauseItemList
            }

            this._insert_Update_Schedule_ToServer({ scheduleJSON_Root_Updated })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _add_ScheduleEntry() : void {
        try {

            if ( ! this._is_AllInputsSetForAddToSchedule() ) {
                return
            }

            let schedulePauseItemList: Array<Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item>

            if ( this._webserviceCall_Schedule_Get_Response && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList ) {

                schedulePauseItemList = Array.from( this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList )
            } else {
                schedulePauseItemList = []
            }

            const newEntry: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Item = {
                dayList: Array.from( this._forAddToScheduleBlock_DaysOfWeek_SelectionSet ),
                startTime_24HourClock: this._forAddToScheduleBlock_HoursOfDay_Selection,
                durationInHours: this._forAddToScheduleBlock_Duration_Selection
            }

            schedulePauseItemList.push( newEntry )

            const scheduleJSON_Root_Updated: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root = {
                schedulePauseItemList
            }

            this._insert_Update_Schedule_ToServer({ scheduleJSON_Root_Updated })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _insert_Update_Schedule_ToServer(
        {
            scheduleJSON_Root_Updated
        } : {
            scheduleJSON_Root_Updated: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_Get_Response_JSON_Root
        }
    ) : void {

        this._allDataLoaded_Reload = false

        this.setState({ force_Rerender: {} })

        let scheduleJSON_PrevLastUpdated_Milliseconds: number = null  // can be null

        if ( this._webserviceCall_Schedule_Get_Response ) {

            scheduleJSON_PrevLastUpdated_Milliseconds = this._webserviceCall_Schedule_Get_Response.scheduleJSON_PrevLastUpdated_Milliseconds
        }

        const scheduleJSON = JSON.stringify( scheduleJSON_Root_Updated )

        const promise =
            manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate({ scheduleJSON, scheduleJSON_PrevLastUpdated_Milliseconds_UTC: scheduleJSON_PrevLastUpdated_Milliseconds })

        promise.catch(reason => { throw Error("manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Schedule_InsertUpdate reject: reason:" + reason )})
        promise.then(value => { try {

            if ( value.scheduleJSON_PrevLastUpdated_Milliseconds_UTC_NOT_CURRENT_VALUE ) {
                window.alert( "Value on server changed.  Try again." )
            }

            this._loadData_MainDisplay()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        } })
    }

    /**
     *
     */
    private _is_AllInputsSetForAddToSchedule() : boolean {

        if ( this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.size > 0
            && this._forAddToScheduleBlock_HoursOfDay_Selection !== null
            && this._forAddToScheduleBlock_Duration_Selection !== null ) {

            return true;
        }

        return false;
    }

    /**
     *
     */
    render() {

        if ( ! this._allDataLoaded_InitialLoad ) {

            return (
                <div>
                    <div style={ { fontSize: 24, fontWeight: "bold" } }>
                        Loading Data
                    </div>
                    <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                        <Spinner_Limelight_Component/>
                    </div>
                </div>
            )
        }

        let is_AllInputsSetForAddToSchedule = false;
        if ( this._is_AllInputsSetForAddToSchedule() ) {
            is_AllInputsSetForAddToSchedule = true;
        }

        let requestedStatus_Response_Item: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_RequestedStatus_Response_Item
        let currentStatus_Response_Item: Manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_CurrentStatus_Response_Item

        if ( this._webserviceCall_Get_RequestedStatus_Response ) {
            for ( const responseItem of this._webserviceCall_Get_RequestedStatus_Response.responseItem_Array ) {
                if ( responseItem.type === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum.PAUSE_ALL ) {
                    requestedStatus_Response_Item = responseItem
                }
            }
        }

        if ( this._webserviceCall_Get_CurrentStatus_Response ) {
            for ( const responseItem of this._webserviceCall_Get_CurrentStatus_Response.responseItem_Array ) {
                if ( responseItem.type === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum.PAUSE_ALL ) {
                    currentStatus_Response_Item = responseItem
                }
            }
        }

        let currentStatus_TriggeredByScheduled = false

        if ( currentStatus_Response_Item && currentStatus_Response_Item.current_Status_TriggerType === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE ) {

            currentStatus_TriggeredByScheduled = true
        }

        let currentStatus_Paused = false  // TODO: That should ONLY be set when explicitly Paused
        let currentStatus_Paused_WaitingConfirmation = false
        let currentStatus_Paused_WaitingJobsComplete = false

        let currentStatus_NotPaused_WaitingConfirmation = false

        if ( ! requestedStatus_Response_Item ) {

            if ( currentStatus_Response_Item ) {
                if ( currentStatus_Response_Item.status_Current === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.YES_PAUSED ) {

                    currentStatus_Paused = true;
                }

                if ( currentStatus_Response_Item.status_Current === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.PAUSED_PENDING_COMPLETION ) {

                    currentStatus_Paused_WaitingJobsComplete = true;
                }
            }

        } else if ( ( ! currentStatus_Response_Item ) || currentStatus_Response_Item.status_Current === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.NOT_PAUSED ) {

            if ( requestedStatus_Response_Item.status_Requested === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_IMMEDIATELY ) {

                currentStatus_Paused_WaitingConfirmation = true;

            } else if ( requestedStatus_Response_Item.status_Requested === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE ) {

                currentStatus_Paused_WaitingJobsComplete = true;
            }

        } else if ( currentStatus_Response_Item.status_Current === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.YES_PAUSED ) {

            if ( requestedStatus_Response_Item.status_Requested === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.NOT_PAUSE ) {

                if ( currentStatus_Response_Item.current_Status_TriggerType === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE ) {
                    //   Pause for Schedule
                    currentStatus_Paused = true;

                } else {
                    currentStatus_NotPaused_WaitingConfirmation = true
                }
            } else {
                currentStatus_Paused = true;
            }

        } else if ( currentStatus_Response_Item.status_Current === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum.PAUSED_PENDING_COMPLETION ) {

            if ( requestedStatus_Response_Item.status_Requested === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE ) {

                currentStatus_Paused_WaitingJobsComplete = true
            } else {

                if ( currentStatus_Response_Item.current_Status_TriggerType === Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE ) {
                    //   Pause for Schedule
                    currentStatus_Paused_WaitingJobsComplete = true;

                } else {
                    currentStatus_NotPaused_WaitingConfirmation = true;
                }
            }
        }

        let currentStatus: JSX.Element

        if ( currentStatus_Paused ) {

            currentStatus = (
                <>
                    <span>Paused</span>
                    { currentStatus_TriggeredByScheduled ? (
                        <>
                            <span> (Scheduled)</span>
                        </>
                    ) : null }
                </>
            )
        } else if ( currentStatus_Paused_WaitingConfirmation ) {

            currentStatus = (
                <>
                    <span>Paused</span>
                    <span> (waiting for confirmation up to { _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds } seconds)</span>
                    { currentStatus_TriggeredByScheduled ? (
                        <>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Pause is due to scheduled pause below"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span> (Scheduled)</span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </>
                    ) : null }
                </>
            )
        } else if ( currentStatus_Paused_WaitingJobsComplete ) {

            currentStatus = (
                <>
                    <span>Paused (when current jobs complete) </span>
                    { currentStatus_TriggeredByScheduled ? (
                        <>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Pause is due to scheduled pause below"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span> (Scheduled)</span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </>
                    ) : null }
                    <span></span>
                </>
            )
        } else if ( currentStatus_NotPaused_WaitingConfirmation ) {

            currentStatus = (
                <>
                    <span>Not Paused (waiting for confirmation up to { _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds } seconds)</span>
                </>
            )

        } else {
            //  Not Paused

            currentStatus = (
                <>
                    <span>Not Paused</span>
                </>
            )
        }

        const currentStatus_NotPaused = ! ( currentStatus_Paused || currentStatus_Paused_WaitingConfirmation || currentStatus_Paused_WaitingJobsComplete )

        const currentStatus_Paused_AnyPauseType = currentStatus_Paused || currentStatus_Paused_WaitingConfirmation || currentStatus_Paused_WaitingJobsComplete


        const addSchedule_StartHourOptions : Array<JSX.Element> = []

        for ( let hour = 0; hour < 24; hour++ ) {

            if ( hour === 0 ) {

                addSchedule_StartHourOptions.push(
                    <option
                        key={ hour }
                        value={ hour }
                    >
                        12 midnight
                    </option>
                )

            } else if ( hour < 12 ) {

                addSchedule_StartHourOptions.push(
                    <option
                        key={ hour }
                        value={ hour }
                    >
                        { hour } am
                    </option>
                )

            } else if ( hour === 12 ) {

                addSchedule_StartHourOptions.push(
                    <option
                        key={ hour }
                        value={ hour }
                    >
                        12 noon
                    </option>
                )
            } else {

                addSchedule_StartHourOptions.push(
                    <option
                        key={ hour }
                        value={ hour }
                    >
                        { hour - 12 } pm
                    </option>
                )
            }
        }

        let display_CurrentSchedule_Element: JSX.Element = null

        if ( this._webserviceCall_Schedule_Get_Response && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root && this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList ) {

            const schedulePauseItemList = this._webserviceCall_Schedule_Get_Response.scheduleJSON_Root.schedulePauseItemList;
            const schedulePauseItemList_Length = schedulePauseItemList.length

            const display_CurrentSchedule_Elements: Array<JSX.Element> = []

            for ( let pauseItem_index = 0; pauseItem_index < schedulePauseItemList_Length; pauseItem_index++ ) {

                const pauseItem = schedulePauseItemList[ pauseItem_index ]

                const dayList_Elements: Array<JSX.Element> = []

                for ( const dayList_Item of pauseItem.dayList ) {

                    let dayOfWeekString: string
                    switch (dayList_Item) {
                        case 1:
                            dayOfWeekString = "Sun"
                            break;
                        case 2:
                            dayOfWeekString = "Mon"
                            break;
                        case 3:
                            dayOfWeekString = "Tu"
                            break;
                        case 4:
                            dayOfWeekString = "Wed"
                            break;
                        case 5:
                            dayOfWeekString = "Th"
                            break;
                        case 6:
                            dayOfWeekString = "Fri"
                            break;
                        case 7:
                            dayOfWeekString = "Sat"
                            break;
                        default:
                            throw Error( "Unknown value for dayList_Item: " + dayList_Item )
                            break
                    }

                    if ( dayList_Elements.length > 0 ) {
                        dayList_Elements.push( <span key={ dayList_Item + "_comma" }>, </span> )
                    }
                    const dayList_Element = (
                        <span key={ dayList_Item }>
                            { dayOfWeekString }
                        </span>
                    )
                    dayList_Elements.push( dayList_Element );
                }

                let startTime_24HourClock_Element: JSX.Element

                if ( pauseItem.startTime_24HourClock === 0 ) {

                    startTime_24HourClock_Element = (
                        <span
                            key={ pauseItem.startTime_24HourClock }
                        >
                            12 midnight
                        </span>
                    )

                } else if ( pauseItem.startTime_24HourClock < 12 ) {

                    startTime_24HourClock_Element = (
                        <span
                            key={ pauseItem.startTime_24HourClock }
                        >
                            { pauseItem.startTime_24HourClock } am
                        </span>
                    )

                } else if ( pauseItem.startTime_24HourClock === 12 ) {

                    startTime_24HourClock_Element = (
                        <span
                            key={ pauseItem.startTime_24HourClock }
                        >
                            12 noon
                        </span>
                    )
                } else {

                    startTime_24HourClock_Element = (
                        <span
                            key={ pauseItem.startTime_24HourClock }
                        >
                            { pauseItem.startTime_24HourClock - 12 } pm
                        </span>
                    )
                }

                const pauseItem_Element = (
                    <div key={ pauseItem_index }>
                        { dayList_Elements }
                        <span> </span>
                        { startTime_24HourClock_Element }
                        <span> </span>
                        { pauseItem.durationInHours }
                        <span> hours </span>
                        {/*<span> </span>*/}
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Delete entry"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                style={ { marginLeft: 10 } }
                                src="static/images/icon-circle-delete.png"
                                className="icon-small clickable  "
                                onClick={ event => {
                                    this._delete_ScheduleEntry({ pauseItem_index: pauseItem_index })
                                }}
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                )

                display_CurrentSchedule_Elements.push(pauseItem_Element);
            }

            display_CurrentSchedule_Element = (
                <div style={ { marginTop: 10 } }>
                    { display_CurrentSchedule_Elements }
                </div>
            )
        }
        
        const importsCurrentlyRunning_Boolean = ( this._webserviceCall_Get_Running_Queued_JobCount_Response.importAndPipelineRun_Running_JobCount + this._webserviceCall_Get_Running_Queued_JobCount_Response.importer_Running_JobCount ) > 0
        const importsInQueue_Count = this._webserviceCall_Get_Running_Queued_JobCount_Response.importAndPipelineRun_Queued_OR_Requeued_JobCount + this._webserviceCall_Get_Running_Queued_JobCount_Response.importer_Queued_OR_Requeued_JobCount

        return (

            <div style={ { position: "relative" } }>
                <div
                    style={ { fontSize: 18, marginTop: 10, marginBottom: 10 } }
                >
                    <span>Current Status: </span>
                    { currentStatus }
                </div>

                <div>
                    { currentStatus_NotPaused ? (
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                "Let all in progress run to completion"
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => { try {
                                    this._update_RequestedStatus_ReloadAllStatus({
                                        genericPauseRequested: true,
                                        newRequestedStatus: null, // Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE
                                    })
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }}}
                            >
                                Pause Imports
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    ) : ( ! currentStatus_TriggeredByScheduled ) ? (
                        <button
                            onClick={ event => { try {
                                this._update_RequestedStatus_ReloadAllStatus({
                                    genericPauseRequested: false,
                                    newRequestedStatus: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.NOT_PAUSE
                                })
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }}}
                        >
                            Resume Imports
                        </button>
                    ) : null }
                </div>

                <div style={ { marginTop: 10 } }>
                    Pause running Imports.  Useful for taking database backup before database update and other uses.
                </div>

                { currentStatus_Paused_AnyPauseType && ( ! currentStatus_TriggeredByScheduled ) ? (

                    <div style={ { fontWeight: "bold", fontSize: 18, marginTop: 10 } }>
                        Imports are currently paused so Scheduled Pause is ignored
                    </div>

                ) : null }

                <div style={ { marginTop: 30, position: "relative" } }>

                    <div>
                        <span  style={ { fontSize: 18, fontWeight: "bold" } }>
                            Imports running and waiting to run
                        </span>
                        <button
                            style={ { marginLeft: 10 } }
                            onClick={ event => {
                                try {
                                    event.stopPropagation()

                                    const promiseData = manage_ImporterPipelineExecution_ForAdminPage_WebserviceCall_Get_Running_Queued_JobCount()
                                    promiseData.catch( (reason) => { try {
                                        // reject(reason)
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }} )
                                    promiseData.then(value => { try {

                                        this._webserviceCall_Get_Running_Queued_JobCount_Response = value;

                                        this.setState({ force_Rerender: {} })

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e;
                                    }})

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }}
                        >
                            Refresh
                        </button>
                    </div>

                    <div style={ { fontSize: 16, marginLeft: 30 } }>
                        <div style={ { marginTop: 6 } }>
                            { importsCurrentlyRunning_Boolean ? (
                                "Import(s) are currently running"
                            ) : (
                                "NO Imports are currently running"
                            )}
                        </div>
                        <div style={ { marginTop: 6 } }>
                            <span>There are </span>
                            { importsInQueue_Count > 0 ? (
                                importsInQueue_Count
                            ) : (
                                "NO"
                            )}
                            <span> import(s) waiting to run</span>
                        </div>
                    </div>
                </div>


                <div style={ { marginTop: 30, position: "relative" } }>

                    <div style={ { fontWeight: "bold", fontSize: 18 } }>
                        Scheduled pause of running imports (based on server time)
                    </div>

                    { display_CurrentSchedule_Element }

                    <div style={ { marginTop: 10 } }>
                        Add to scheduled pause:
                    </div>
                    <div style={ { marginTop: 3 } }>
                        Days of the week:
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 1;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            Sun
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 2;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            M
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 3;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            Tu
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 4;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            W
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 5;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            Th
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 6;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            F
                        </label>
                        <span> </span>
                        <label>
                            <input
                                type="checkbox"
                                onChange={ event => {
                                    const dayOfWeek = 7;  //  Update for Day of week - Sunday is day 1
                                    if ( event.target.checked ) {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.add( dayOfWeek )
                                    } else {
                                        this._forAddToScheduleBlock_DaysOfWeek_SelectionSet.delete( dayOfWeek )
                                    }
                                    this.setState({ force_Rerender: {} })
                                }}
                            />
                            Sat
                        </label>
                    </div>
                    <div style={ { marginTop: 3 } }>
                        <span>
                            Start Hour:
                        </span>
                        <span> </span>
                        <select
                            value={ this._forAddToScheduleBlock_HoursOfDay_Selection === null ? "" : this._forAddToScheduleBlock_HoursOfDay_Selection }
                            onChange={ event => {
                                const selection = event.target.value
                                const selectionNumber = Number.parseInt( selection );
                                if ( Number.isNaN( selectionNumber ) ) {
                                    this._forAddToScheduleBlock_HoursOfDay_Selection = 0
                                } else {
                                    this._forAddToScheduleBlock_HoursOfDay_Selection = selectionNumber
                                }
                                this.setState({ force_Rerender: {} })
                            }}
                        >
                            { addSchedule_StartHourOptions }
                        </select>
                        {/*<span> </span>*/}

                        <span style={ { marginLeft: 10 } }>
                            Duration (in hours):
                        </span>
                        <span> </span>
                        <input
                            style={ { width: 40 } }
                            maxLength={ 4 }
                            value={  this._forAddToScheduleBlock_Duration_Selection === null ? "" : this._forAddToScheduleBlock_Duration_Selection }
                            onChange={ event => {
                                const valueString = event.target.value
                                const valueNumber = Number.parseInt( valueString );
                                if ( Number.isNaN( valueNumber ) ) {
                                    this._forAddToScheduleBlock_Duration_Selection = null
                                } else {
                                    this._forAddToScheduleBlock_Duration_Selection = valueNumber
                                }
                                this.setState({ force_Rerender: {} })
                            }}
                        />
                        <span> </span>
                    </div>
                    <div>
                        <div style={ { display: "inline-block", position: "relative" } }>
                            <button
                                disabled={ ! is_AllInputsSetForAddToSchedule }
                                onClick={ event => {
                                    this._add_ScheduleEntry()
                                }}
                            >
                                Add
                            </button>
                            { ! is_AllInputsSetForAddToSchedule ? (
                                //  Overlay on "Add" button to show tooltip when disabled
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Select Days, a start time, and a duration to add"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } }
                                    >
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : null }
                        </div>
                    </div>
                </div>

                { ! this._allDataLoaded_Reload ? (
                    //  Cover while updating
                    <div className=" block-updating-overlay-container " >
                        Updating Data
                    </div>

                ) : null }
            </div>
        );
    }

}

/////////////////////////////////////////////

class INTERNAL__Update_RequestedStatus_ReloadAllStatus_Params {
    genericPauseRequested: boolean  //  genericPauseRequested MUST be true OR newRequestedStatus MUST have a value
    newRequestedStatus: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


//   Overlay for user select which Pause to use



class UserSelect_PauseType_MainParams {

    update_RequestedStatus_ReloadAllStatus_Params_Callback: ( params: INTERNAL__Update_RequestedStatus_ReloadAllStatus_Params ) => void
    cancel_Clicked_Callback: () => void
}

/**
 *
 */
const open_UserSelect_PauseType_OverlayComponent_Overlay = function(
    {
        mainParams
    } : {
        mainParams: UserSelect_PauseType_MainParams
    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callback_Close = () : void => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const callbackOn_Cancel_Close_Clicked = () : void => {

        callback_Close()
        mainParams.cancel_Clicked_Callback()
    }

    const overlayComponent = get_UserSelect_PauseType_OverlayComponent_Overlay_Layout({
        mainParams,
        callbackOn_Cancel_Close_Clicked,
        callback_Close
    })

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}


/**
 *
 */
const get_UserSelect_PauseType_OverlayComponent_Overlay_Layout = function(
    {
        mainParams,
        callback_Close,
        callbackOn_Cancel_Close_Clicked
    } : {
        mainParams: UserSelect_PauseType_MainParams
        callback_Close : () => void;
        callbackOn_Cancel_Close_Clicked : () => void;

    }) : JSX.Element {

    return (
        <UserSelect_PauseType_OverlayComponent
            mainParams={ mainParams }
            callback_Close={ callback_Close }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )
}


////  React Components


/**
 *
 */
interface UserSelect_PauseType_OverlayComponent_Props {
    mainParams: UserSelect_PauseType_MainParams
    callback_Close : () => void;
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface UserSelect_PauseType_OverlayComponent_State {

    showLoadingMessage?: boolean
    showUpdatingMessage_Main_OverlayWholeScrollableDiv ?: boolean

    showDelete_TagCategory_OverScrollableDiv? : boolean
    delete_TagCategory_OverScrollableDiv_Top?: number

    showEditTag_OverScrollableDiv? : boolean
    editTag_OverScrollableDiv_Top?: number

    force_Rerender?: object
}

/**
 *
 */
class UserSelect_PauseType_OverlayComponent extends React.Component< UserSelect_PauseType_OverlayComponent_Props, UserSelect_PauseType_OverlayComponent_State > {

    /**
     *
     */
    constructor( props: UserSelect_PauseType_OverlayComponent_Props ) {
        super( props );

        this.state = {
            showLoadingMessage: true,
            force_Rerender: {}
        };
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ 300 }
                widthMaximum={ 300 }
                heightMinimum={ 300 }
                heightMaximum={ 300 }
                title={ "Select Pause Type" }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div>
                        <div style={ { marginBottom: 10 } }>
                            <button
                                onClick={ event => { try {
                                    this.props.mainParams.update_RequestedStatus_ReloadAllStatus_Params_Callback({
                                        genericPauseRequested: false,
                                        newRequestedStatus: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_WHEN_COMPLETE
                                    })
                                    this.props.callback_Close()
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }}}
                            >
                                Pause when current imports finished
                            </button>
                        </div>
                        <div style={ { marginBottom: 10 } }>
                            <button
                                onClick={ event => { try {
                                    this.props.mainParams.update_RequestedStatus_ReloadAllStatus_Params_Callback({
                                        genericPauseRequested: false,
                                        newRequestedStatus: Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum.PAUSE_IMMEDIATELY
                                    })
                                    this.props.callback_Close()
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }}}
                            >
                                Pause Now (within { _manage_importer_pipeline_execution_page__wait_time_for_check_pause_request_in_seconds } seconds)
                            </button>
                        </div>
                        <div style={ { marginBottom: 10 } }>
                            <button
                                onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }

}
