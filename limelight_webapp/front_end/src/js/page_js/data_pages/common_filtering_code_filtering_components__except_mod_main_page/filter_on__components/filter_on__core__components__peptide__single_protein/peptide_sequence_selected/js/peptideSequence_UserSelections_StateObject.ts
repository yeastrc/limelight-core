/**
 * peptideSequence_UserSelections_StateObject.ts
 *
 * Peptide Sequence Selection - State Object
 *
 *  !!!! React Version !!!!
 *
 *
 * State Object used in:
 *      peptideSequence_UserSelections.tsx
 */
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 * 
 */
export class PeptideSequence_UserSelections_StateObject {

	// private _initializeCalled : boolean = false;

    private _peptideSearchStrings : Array<string> = undefined; //  Set to undefined if no selections

	/**
	 * 
	 */
	constructor() {

    }

	/**
	 * @returns First string or undefined
	 *
	 */
	isPeptideSearchString_AtLeastOneNotEmptyString() : boolean {

		if ( ( ! this._peptideSearchStrings || this._peptideSearchStrings.length === 0 ) ) {
			return false;
		}

		for ( const entry of this._peptideSearchStrings ) {
			if ( entry !== undefined && entry !== null && entry !== "" ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * @returns First string or undefined
	 * 
	 */
	getPeptideSearchString() : string {

		if ( ( ! this._peptideSearchStrings || this._peptideSearchStrings.length === 0 ) ) {
			return undefined;
		}

        return this._peptideSearchStrings[ 0 ];
    }

	/**
	 * @returns Array of String
	 * 
	 */
	getPeptideSearchStrings() : Array<string> {

        return this._peptideSearchStrings;
	}
	
	/**
	 * @returns First string or undefined
	 * 
	 */
	setPeptideSearchStringFirstEntry( peptideSearchString : string ) : void {

		if ( ( ! this._peptideSearchStrings || this._peptideSearchStrings.length === 0 ) ) {
			this._peptideSearchStrings = [];
		}

        this._peptideSearchStrings[ 0 ] = peptideSearchString;
    }

	/**
	 * 
	 * 
	 */
	clearPeptideSearchStrings() {

        this._peptideSearchStrings = undefined;
    }


    //////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() : any {

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;
        result[ _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME ] = this._peptideSearchStrings;
		return result;
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	set_encodedStateData({ encodedStateData }: { encodedStateData: any }) : void {

		if ( ! ( encodedStateData ) ) {
			const msg = "set_encodedStateData(...): No value in encodedStateData";
			console.warn( msg );
			throw Error( msg );
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "set_encodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.warn( msg );
			throw Error( msg );
		}

        const peptideSearchStrings: Array<string> = encodedStateData[ _ENCODED_DATA__PEPTIDE_SEQUENCE_SEARCH_STRINGS_ENCODING_PROPERTY_NAME ];

		if ( peptideSearchStrings && ( peptideSearchStrings instanceof Array ) ) {

			const peptideSearchStrings_Trimmed: Array<string> = []

			for ( const peptideSearchString of peptideSearchStrings ) {

				if ( limelight__IsVariableAString( peptideSearchString ) ) {

					let peptideSearchString_Trimmed = peptideSearchString;

					try {
						peptideSearchString_Trimmed = peptideSearchString.trim();

					} catch (e) {
						//  Eat Exception.  Not Trim if call to .trim() results in Exception
					}

					peptideSearchStrings_Trimmed.push( peptideSearchString_Trimmed );
				}
			}

			this._peptideSearchStrings = peptideSearchStrings_Trimmed;
		}
	}
}

