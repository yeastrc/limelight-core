/**
 * qcPage_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the QC Page that is NOT covered by the Peptide Page Page State.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { QC_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = QC_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';

const _SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'e';

/**
 *
 */
export class QcPage_CentralStateManagerObjectClass {

    private _value : {
        distinctPeptideContents_For_ProteinList_Selection_EncodedStateData?: any // ProteinViewPage_DisplayData_ProteinList__DistinctPeptide_UserSelections_StateObject
        qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData?: any   // QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject
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
                distinctPeptideContents_For_ProteinList_Selection_EncodedStateData : encodedStateData[ _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
                qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData : encodedStateData[ _SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    get_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData() {
        return this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData;
    }

    set_distinctPeptideContents_For_ProteinList_Selection_EncodedStateData( { distinctPeptideContents_For_ProteinList_Selection_EncodedStateData } : { distinctPeptideContents_For_ProteinList_Selection_EncodedStateData: any } ) {
        this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData = distinctPeptideContents_For_ProteinList_Selection_EncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    get_qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData() {
        return this._value.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData;
    }

    set_qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData( { qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData } : { qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData: any } ) {
        this._value.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData = qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData;

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

        if ( this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData !== undefined ) {
            dataForEncoding[ _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData;
        }
        if ( this._value.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData !== undefined ) {
            dataForEncoding[ _SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_EncodedStateData;
        }

        return dataForEncoding;
    }
}