/**
 * featureDetection_View_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the Feature Detection View Page.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import {
    FEATURE_DETECTION_VIEW_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY
} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = FEATURE_DETECTION_VIEW_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _FEATURE_DETECTION_VIEW_PAGE_ROOT_TABLE_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';

/**
 *
 */
export class FeatureDetection_View_CentralStateManagerObjectClass {

    private _value : {
        featureDetection_ViewPage_RootTableSelection_EncodedStateData?: any //  FeatureDetection_ViewPage_RootTableSelection_StateObject
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
                featureDetection_ViewPage_RootTableSelection_EncodedStateData : encodedStateData[ _FEATURE_DETECTION_VIEW_PAGE_ROOT_TABLE_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    get_featureDetection_ViewPage_RootTableSelection_EncodedStateData() {
        return this._value.featureDetection_ViewPage_RootTableSelection_EncodedStateData;
    }

    set_featureDetection_ViewPage_RootTableSelection_EncodedStateData( { featureDetection_ViewPage_RootTableSelection_EncodedStateData } : { featureDetection_ViewPage_RootTableSelection_EncodedStateData: any } ) {
        this._value.featureDetection_ViewPage_RootTableSelection_EncodedStateData = featureDetection_ViewPage_RootTableSelection_EncodedStateData;

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

        const dataForEncoding: { [key: string]: any } = {}
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        if ( this._value.featureDetection_ViewPage_RootTableSelection_EncodedStateData !== undefined ) {
            dataForEncoding[ _FEATURE_DETECTION_VIEW_PAGE_ROOT_TABLE_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.featureDetection_ViewPage_RootTableSelection_EncodedStateData;
        }
        return dataForEncoding;
    }
}