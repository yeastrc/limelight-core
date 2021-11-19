/**
 * proteinList_ExpPage_CentralStateManagerObjectClass.ts
 *
 * Holds the state of the Experiment Protein List.  Registers with CentralPageStateManager
 *
 * For use with:  centralPageStateManager.js
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { PROTEIN_LIST_EXPERIMENT_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';




const _COMPONENT_UNIQUE_ID = PROTEIN_LIST_EXPERIMENT_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _SINGLE_PROTEIN_GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';

const _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';
const _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'e';
const _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'f';
const _PROTEIN_LIST_COLUMNS_DISPLAY_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'g';

/**
 *
 */
export class ProteinList_ExpPage_CentralStateManagerObjectClass {

    private _value : {

        singleProtein_generatedPeptideContentsSelectedEncodedStateData? : any  //  Used on Single Protein. Saved here for continuity from view Single Protein to next view Single Protein

        distinctPeptideContents_For_ProteinList_Selection_EncodedStateData?: any // ProteinViewPage_DisplayData_ProteinList__DistinctPeptide_UserSelections_StateObject
        proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData?: any // ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData?: any // ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
        modsSelectedEncodedStateData? : any
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
                singleProtein_generatedPeptideContentsSelectedEncodedStateData : encodedStateData[ _SINGLE_PROTEIN_GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
                distinctPeptideContents_For_ProteinList_Selection_EncodedStateData : encodedStateData[ _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
                proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData: encodedStateData[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
                modsSelectedEncodedStateData : encodedStateData[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
                proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData : encodedStateData[ _PROTEIN_LIST_COLUMNS_DISPLAY_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
            };
        }
    }

    clearAll() {

        this._value = {};
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState( { component : this } );
        }
    }

    set_SingleProtein_GeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData }: { generatedPeptideContentsSelectedEncodedStateData: any } ) {
        this._value.singleProtein_generatedPeptideContentsSelectedEncodedStateData = generatedPeptideContentsSelectedEncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    get_SingleProtein_GeneratedPeptideContentsSelectedEncodedStateData() {
        return this._value.singleProtein_generatedPeptideContentsSelectedEncodedStateData;
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

    get_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData() {
        return this._value.proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData;
    }
    set_proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData( { proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData } : { proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData: any } ) {
        this._value.proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData = proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    get_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData() {
        return this._value.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData;
    }

    set_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData( { proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData } : { proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData: any } ) {
        this._value.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    setModsSelectedEncodedStateData( { modsSelectedEncodedStateData } : { modsSelectedEncodedStateData: any } ) {
        this._value.modsSelectedEncodedStateData = modsSelectedEncodedStateData;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }

    getModsSelectedEncodedStateData() {
        return this._value.modsSelectedEncodedStateData;
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

        if ( this._value.singleProtein_generatedPeptideContentsSelectedEncodedStateData !== undefined ) {
            dataForEncoding[ _SINGLE_PROTEIN_GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.singleProtein_generatedPeptideContentsSelectedEncodedStateData;
        }

        if ( this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData !== undefined ) {
            dataForEncoding[ _DISTINCT_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.distinctPeptideContents_For_ProteinList_Selection_EncodedStateData;
        }

        if ( this._value.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData !== undefined ) {
            dataForEncoding[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_Selection_EncodedStateData;
        }
        if ( this._value.modsSelectedEncodedStateData !== undefined ) {
            dataForEncoding[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.modsSelectedEncodedStateData;
        }
        if ( this._value.proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData !== undefined ) {
            dataForEncoding[ _PROTEIN_LIST_COLUMNS_DISPLAY_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinListColumnsDisplayContents_For_ProteinList_Selection_EncodedStateData;
        }

        return dataForEncoding;
    }
}