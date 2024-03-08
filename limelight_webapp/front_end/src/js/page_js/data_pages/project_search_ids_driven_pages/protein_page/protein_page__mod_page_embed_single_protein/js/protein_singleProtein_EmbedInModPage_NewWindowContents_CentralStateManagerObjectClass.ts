/**
 * protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the Single Protein Additions for Embed on Mod Page EXTRA when Open in New Window.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import {SINGLE_PROTEIN__EMBED_IN_MOD_PAGE_OPEN_IN_NEW_WINDOW__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY} from "page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";

const _COMPONENT_UNIQUE_ID = SINGLE_PROTEIN__EMBED_IN_MOD_PAGE_OPEN_IN_NEW_WINDOW__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const FOR_OPEN_NEW_WINDOW__MODMASS_ROUNDED_FROM_MODPAGE_FOR_INITIAL_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';


/**
 *
 */
export class Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass {

    private _value : {
        for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection?: number
    }

    _centralPageStateManager? : CentralPageStateManager

    /**
     *
     */
    constructor(
        {
            centralPageStateManager, initial__for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection
        }: {
            centralPageStateManager: CentralPageStateManager
            initial__for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection?: number
        } ) {

        this._value = {
            for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection: initial__for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection
        };

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
                for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection :
                    encodedStateData[ FOR_OPEN_NEW_WINDOW__MODMASS_ROUNDED_FROM_MODPAGE_FOR_INITIAL_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
        }
    }

    /**
     * Called after Single Protein successfully transfers these values into it's page state and to the URL
     */
    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    clear_for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection() : void {
        this.set_for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection({ for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection : undefined });
    }

    set_for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection( { for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection }: { for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection: number } ) : void {
        this._value.for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection = for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    get_for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection() : number {
        return this._value.for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection
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

        let have_a_ValueToStore = false

        if ( this._value.for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection !== undefined ) {
            dataForEncoding[ FOR_OPEN_NEW_WINDOW__MODMASS_ROUNDED_FROM_MODPAGE_FOR_INITIAL_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] =
                this._value.for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection;
            have_a_ValueToStore = true;
        }

        if ( ! have_a_ValueToStore ) {
            //  NO Values to Store to URL so just return undefined.
            return undefined; // EARLY RETURN
        }

        return dataForEncoding;
    }
}
