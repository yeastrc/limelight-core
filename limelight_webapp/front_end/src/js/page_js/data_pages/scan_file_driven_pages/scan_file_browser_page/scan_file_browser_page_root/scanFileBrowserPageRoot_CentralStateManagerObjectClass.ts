/**
 * scanFileBrowserPageRoot_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the Scan File Browser Page.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import {
    SCAN_FILE_BROWSER_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY
} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = SCAN_FILE_BROWSER_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA_SINGLE_SCAN_DATA = 'b';

/**
 *
 */
export class ScanFileBrowserPageRoot_CentralStateManagerObjectClass {

    private _value : {
        singleSingleScanData?: any //  ScanFileBrowserPage_SingleScan_UserSelections_StateObject
    };

    private _centralPageStateManager : CentralPageStateManager;

    /**
     *
     */
    constructor(
        {
            centralPageStateManager, no_centralPageStateManager
        } : {
            centralPageStateManager : CentralPageStateManager
            no_centralPageStateManager?: boolean
        } ) {

        if ( ! centralPageStateManager && ! no_centralPageStateManager ) {
            const msg = "ScanFileBrowserPageRoot_CentralStateManagerObjectClass.constructor: centralPageStateManager or no_centralPageStateManager MUST be set"
            console.warn(msg)
            throw Error(msg)
        }

        this._value = {};

        //  No centralPageStateManager value if used for an override

        if ( centralPageStateManager ) {
            this._centralPageStateManager = centralPageStateManager;

            this._centralPageStateManager.register( { component : this } );
        }
    }

    initialize() {
        let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
        if ( encodedStateData ) {
            this._value = {
                // groupProteins_OLD_V1? : any //  OLD V1 value for groupProteins.  Only here for Backwards compatibility.   Now Handled in proteinGrouping_CentralStateManagerObjectClass.ts.
                singleSingleScanData : encodedStateData[ _ENCODED_DATA_SINGLE_SCAN_DATA ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    get_SingleScanData_EncodedStateData() {
        return this._value.singleSingleScanData;
    }

    set_SingleScanDataEncodedStateData( { singleSingleScanData } : { singleSingleScanData: any } ) {
        this._value.singleSingleScanData = singleSingleScanData;

        // if ( ! this._centralPageStateManager ) {
        //     throw Error( "this._centralPageStateManager not set" );
        // }

        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component: this } );
        }
    }

    /**
     * Called by Central State Manager and maybe other code
     */
    getUniqueId() {
        return _COMPONENT_UNIQUE_ID;
    }

    /**
     * Called by Central State Manager and maybe other code
     */
    getDataForEncoding() {

        const dataForEncoding: { [key: string]: any } = {}
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        if ( this._value.singleSingleScanData !== undefined ) {
            dataForEncoding[ _ENCODED_DATA_SINGLE_SCAN_DATA ] = this._value.singleSingleScanData;
        }

        return dataForEncoding;
    }
}