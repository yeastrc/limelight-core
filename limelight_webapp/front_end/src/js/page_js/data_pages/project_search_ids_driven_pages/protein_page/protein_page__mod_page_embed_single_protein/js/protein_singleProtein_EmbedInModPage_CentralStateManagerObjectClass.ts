/**
 * protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the Single Protein Additions for Embed on Mod Page.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import {SINGLE_PROTEIN__EMBED_IN_MOD_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY} from "page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";

const _COMPONENT_UNIQUE_ID = SINGLE_PROTEIN__EMBED_IN_MOD_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';


/**
 *
 */
export class Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass {

    private _value : {
        generatedPeptideContentsSelectedEncodedStateData? : any
    }

    _centralPageStateManager? : CentralPageStateManager

    /**
     *
     */
    constructor( { centralPageStateManager }: { centralPageStateManager: CentralPageStateManager } ) {

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
                generatedPeptideContentsSelectedEncodedStateData : encodedStateData[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }



    setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData }: { generatedPeptideContentsSelectedEncodedStateData: any } ) {
        this._value.generatedPeptideContentsSelectedEncodedStateData = generatedPeptideContentsSelectedEncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    getGeneratedPeptideContentsSelectedEncodedStateData() {
        return this._value.generatedPeptideContentsSelectedEncodedStateData;
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
        // @ts-ignore
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        let have_a_ValueToStore = false

        if ( this._value.generatedPeptideContentsSelectedEncodedStateData !== undefined ) {
            // @ts-ignore
            dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.generatedPeptideContentsSelectedEncodedStateData;
            have_a_ValueToStore = true;
        }

        if ( ! have_a_ValueToStore ) {
            //  NO Values to Store to URL so just return undefined.
            return undefined; // EARLY RETURN
        }

        return dataForEncoding;
    }
}
