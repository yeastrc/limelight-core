/**
 * scanFileBrowserPage_CentralStateManagerObjectClass.ts
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

const _XXXX = 'b';

const _YYYY = 'c';

/**
 *
 */
export class ScanFileBrowserPage_CentralStateManagerObjectClass {

    private _value : {
        xxxx?: any //
        yyyy?: any   // QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject
    };

    private _centralPageStateManager : CentralPageStateManager;

    /**
     *
     */
    constructor( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) {

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
                xxxx : encodedStateData[ _XXXX ],
                yyyy : encodedStateData[ _YYYY ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    get_XXXX_EncodedStateData() {
        return this._value.xxxx;
    }

    set_XXXX_EncodedStateData( { xxxx } : { xxxx: any } ) {
        this._value.xxxx = xxxx;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    get_YYYY() {
        return this._value.yyyy;
    }

    set_YYYY( { yyyy } : { yyyy: any } ) {
        this._value.yyyy = yyyy;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
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

        const dataForEncoding = {}
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        if ( this._value.xxxx !== undefined ) {
            dataForEncoding[ _XXXX ] = this._value.xxxx;
        }
        if ( this._value.yyyy !== undefined ) {
            dataForEncoding[ _YYYY ] = this._value.yyyy;
        }

        return dataForEncoding;
    }
}