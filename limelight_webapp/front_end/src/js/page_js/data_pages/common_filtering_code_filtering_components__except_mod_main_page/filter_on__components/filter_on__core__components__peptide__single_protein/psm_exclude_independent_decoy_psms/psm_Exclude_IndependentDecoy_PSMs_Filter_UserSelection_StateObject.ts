/**
 * psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.ts
 *
 * Filter on Scan Filename on PSM - State Object
 *
 *
 * State Object used in:   Peptide List - Peptide page and Single Protein  - Search Based and Experiment
 *
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Charge Values are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA___psm_Exclude_IndependentDecoy_PSMs_SELECTED_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject {

    private _psm_Exclude_IndependentDecoy_PSMs : boolean = undefined; //  Set to undefined if no selection or false

    private _valueChangedCallback: () => void;

    /**
     *
     */
    constructor(
        {
            valueChangedCallback
        } : {
            valueChangedCallback: () => void
        }) {
        this._valueChangedCallback = valueChangedCallback;
    }

    /**
     *
     *
     */
    get_psm_Exclude_IndependentDecoy_PSMs() : boolean {

        if ( ! this._psm_Exclude_IndependentDecoy_PSMs ) {
            return false;
        }

        return this._psm_Exclude_IndependentDecoy_PSMs;
    }

    /**
     *
     *
     */
    set_psm_Exclude_IndependentDecoy_PSMs( psm_Exclude_IndependentDecoy_PSMs : boolean ) : void {

        if ( ! psm_Exclude_IndependentDecoy_PSMs ) {
            this._psm_Exclude_IndependentDecoy_PSMs = undefined;
        } else {
            this._psm_Exclude_IndependentDecoy_PSMs = psm_Exclude_IndependentDecoy_PSMs;
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("set_psm_Exclude_IndependentDecoy_PSMs::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._psm_Exclude_IndependentDecoy_PSMs = undefined;

        if ( ! this._valueChangedCallback ) {
            throw Error("clearAll::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
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

        const result: { [key: string]: any } = {}

        if ( this._psm_Exclude_IndependentDecoy_PSMs !== undefined ) {
            result[ _ENCODED_DATA___psm_Exclude_IndependentDecoy_PSMs_SELECTED_ENCODING_PROPERTY_NAME ] = this._psm_Exclude_IndependentDecoy_PSMs;
        }

        if ( Object.keys(result).length === 0 ) {
            return undefined;
        }

        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

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

        if ( encodedStateData[ _ENCODED_DATA___psm_Exclude_IndependentDecoy_PSMs_SELECTED_ENCODING_PROPERTY_NAME ] ) {
            this._psm_Exclude_IndependentDecoy_PSMs = encodedStateData[ _ENCODED_DATA___psm_Exclude_IndependentDecoy_PSMs_SELECTED_ENCODING_PROPERTY_NAME ];
        }
    }
}

