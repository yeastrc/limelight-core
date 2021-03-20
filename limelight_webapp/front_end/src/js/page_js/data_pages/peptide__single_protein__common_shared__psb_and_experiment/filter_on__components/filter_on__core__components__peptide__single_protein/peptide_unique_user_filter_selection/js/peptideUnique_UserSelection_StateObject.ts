/**
 * peptideUnique_UserSelection_StateObject.ts
 *
 * Peptide Unique Selection - State Object
 *
 *  !!!! React Version !!!!
 *
 *
 * State Object used in:
 *      peptideUnique_UserSelection.tsx
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class PeptideUnique_UserSelection_StateObject {

    // private _initializeCalled : boolean = false;

    private _peptideUnique : boolean = undefined; //  Set to undefined if no selection or false

    /**
     *
     */
    constructor() {

    }

    /**
     *
     *
     */
    getPeptideUnique() : boolean {

        if ( ! this._peptideUnique ) {
            return false;
        }

        return this._peptideUnique;
    }

    /**
     *
     *
     */
    setPeptideUnique( peptideUnique : boolean ) : void {

        if ( ! peptideUnique ) {
            this._peptideUnique = undefined;
        } else {
            this._peptideUnique = peptideUnique;
        }
    }

    /**
     *
     *
     */
    clearPeptideUnique() {

        this._peptideUnique = undefined;
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
        // @ts-ignore
        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;
        // @ts-ignore
        result[ _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME ] = this._peptideUnique;
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

        this._peptideUnique = encodedStateData[ _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME ];
    }
}

