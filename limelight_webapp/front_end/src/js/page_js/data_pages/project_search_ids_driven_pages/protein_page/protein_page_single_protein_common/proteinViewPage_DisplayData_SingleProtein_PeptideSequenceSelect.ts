/**
 * proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.ts
 * 
 * Javascript for proteinView.jsp page - User Enter String that Peptide Sequences Must Contain.
 * 
 * Companion file to proteinViewPage_DisplayData_SingleProtein_SingleSearch.js and proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


////////////////////

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Peptide Sequences stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME = 'b';

///////

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect {

    private _callbackMethodForSelectedChange;

    private _peptideSearchStrings = undefined; //  Set to undefined if no selections

    private _callbackTimeoutId = undefined;

    private _initializeCalled = false;

	/**
	 * 
	 */
	constructor({ callbackMethodForSelectedChange }) {

        this._callbackMethodForSelectedChange = callbackMethodForSelectedChange;

        this._peptideSearchStrings = undefined; //  Set to undefined if no selections

        this._callbackTimeoutId = undefined;
    }

	/**
	 * @param encodedStateData
	 */
	initialize({ encodedStateData }) {

		if ( encodedStateData ) {
			this._updateWithEncodedStateData({ encodedStateData });
        }

        // document.querySelector(...) Returns first element found
        const selector_protein_peptide_sequence_selection_inputDOMElement = document.querySelector(".selector_protein_peptide_sequence_selection_input");
        if ( selector_protein_peptide_sequence_selection_inputDOMElement === null ) {
                throw Error("No DOM elements with class 'selector_protein_peptide_sequence_selection_input' ");
        }

        selector_protein_peptide_sequence_selection_inputDOMElement.addEventListener('input', ( eventObject ) => {
            try {
                eventObject.preventDefault();
                const eventTarget = eventObject.target;
                const eventTarget_HTMLInputElement = ( eventTarget as HTMLInputElement );
                const inputBoxValue = eventTarget_HTMLInputElement.value;
                if ( this._callbackTimeoutId ) {
                    window.clearTimeout( this._callbackTimeoutId ); // Cancel previous setTimeout if get another change and the previous timeout hasn't fired
                }
                this._callbackTimeoutId = window.setTimeout( () => {
                    // console.log("'input' fired. inputBoxValue: " + inputBoxValue );
                    if ( inputBoxValue !== "" ) {
                        this._peptideSearchStrings = [ inputBoxValue ]; // Array to support multiple
                    } else {
                        this._peptideSearchStrings = undefined; //  Set to undefined if no selections
                    }
                    this._callbackMethodForSelectedChange();
                }, CALL_CALLBACK_DELAY );
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        this._initializeCalled = true;
    }

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() {
        const encodedData = {};
        encodedData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;
        encodedData[ _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME ] = this._peptideSearchStrings;
        return encodedData;
    }

	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	_updateWithEncodedStateData({ encodedStateData }) {

		if ( ! ( encodedStateData ) ) {
			const msg = "_updateWithEncodedStateData(...): No value in encodedStateData";
			console.log( msg );
			throw Error( msg );
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "_updateWithEncodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.log( msg );
			throw Error( msg );
		}

        this._peptideSearchStrings = encodedStateData[ _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME ];

        const $selector_protein_peptide_sequence_selection_input = $(".selector_protein_peptide_sequence_selection_input");
        if ( this._peptideSearchStrings !== undefined ) {
            $selector_protein_peptide_sequence_selection_input.val( this._peptideSearchStrings );
        } else {
            $selector_protein_peptide_sequence_selection_input.val( "" );
        }
    }

    //////////////////////////////////////

	/**
	 * @returns Array of String
	 * 
	 */
	getPeptideSearchStrings() {

        return this._peptideSearchStrings;
    }

	/**
	 * 
	 * 
	 */
	clearPeptideSearchStrings() {

        this._peptideSearchStrings = undefined;

        // document.querySelector(...) Returns first element found
        const selector_protein_peptide_sequence_selection_inputDOMElement = document.querySelector(".selector_protein_peptide_sequence_selection_input");
        if ( selector_protein_peptide_sequence_selection_inputDOMElement === null ) {
                throw Error("clearPeptideSearchStrings(): No DOM elements with class 'selector_protein_peptide_sequence_selection_input' ");
        }
        const selector_protein_peptide_sequence_selection_inputDOMElement_HTMLInputElement = ( selector_protein_peptide_sequence_selection_inputDOMElement as HTMLInputElement );
        selector_protein_peptide_sequence_selection_inputDOMElement_HTMLInputElement.value = "";
    }


}