/**
 * manage_ImporterPipelineExecution_ForAdminPage_Constants_Enums.ts
 *
 * Constants and Enums
 *
 */

/**
 *
 */
export enum Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Type_ID_Enum {
    PAUSE_ALL = 1
}

/**
 *
 */
export enum Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Request_Status_ID_Enum {
    NOT_PAUSE = 1,
    PAUSE_IMMEDIATELY = 2,
    PAUSE_WHEN_COMPLETE = 3
}

/**
 *
 */
export enum Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Type_ID_Enum {
    PAUSE_ALL = 1
}

/**
 *
 */
export enum Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_ID_Enum {
    NOT_PAUSED = 1,
    YES_PAUSED = 2,
    PAUSED_PENDING_COMPLETION = 3
}

/**
 *
 */
export enum Manage_ImporterPipelineExecution_ForAdminPage_PauseProcessing_Current_Status_TriggerType_Enum {

    PAUSE_FOR_REQUEST = 1,
    PAUSE_FOR_SCHEDULE = 2
}