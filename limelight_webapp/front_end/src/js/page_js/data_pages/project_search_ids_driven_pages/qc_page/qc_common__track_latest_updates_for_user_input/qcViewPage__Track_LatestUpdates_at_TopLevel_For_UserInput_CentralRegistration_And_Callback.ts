/**
 * qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.ts
 *
 * QC Page : Track "Latest Updates" at "Top Level" under "Click to Show Filters and Options" for User Input - Central Registration and Callback
 *
 * Object of this class will be held at top level component.
 *
 * All child level components that render will register with this component.
 * Whenever the User changes the selections at the top level, the
 *
 */


import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";

/**
 *
 */
export interface QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface {

    set_Current_QcViewPage__Track_LatestUpdates_For_UserInput( item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput ): void
}

/**
 *
 */
export class QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback {

    private _callbackItemArray: Array<QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface> = []

    constructor() {}

    /**
     *
     * @param callbackItem
     */
    register(
        {
            callbackItem
        } : {
            callbackItem: QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
        } ) : void {

        if ( ! this._callbackItemArray.find( (value, index, obj) => {
            if ( value === callbackItem ) {
                return true
            }
            return  false
        })
        ) {
            this._callbackItemArray.push( callbackItem )
        }
    }

    /**
     *
     * @param callbackItem
     */
    un_register(
        {
            callbackItem
        } : {
            callbackItem: QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
        } ) : void {

        this._callbackItemArray = this._callbackItemArray.filter((value, index, array) => {
            if ( ! ( value === callbackItem ) ) {
                return true
            }
            return  false
        })
    }

    /**
     *
     * @param item
     */
    call_AllRegistered(
        {
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        } : {
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        }) : void {

        for ( const callbackItem of this._callbackItemArray ) {
            callbackItem.set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput)
        }
    }
}

