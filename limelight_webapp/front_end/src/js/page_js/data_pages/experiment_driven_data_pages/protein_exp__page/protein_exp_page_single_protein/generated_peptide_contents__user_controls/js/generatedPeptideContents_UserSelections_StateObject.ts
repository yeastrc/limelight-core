/**
 * generatedPeptideContents_UserSelections_StateObject.ts
 *
 * Generated Peptide Contents Selection - State Object
 *
 * State Object used in:
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__OPEN_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'd';
const _ENCODED_DATA__STATIC_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'e';

const _ENCODED_DATA_VALUE_FOR_TRUE = 1;
const _ENCODED_DATA_VALUE_FOR_FALSE = 0;

///////

/**
 *
 */
export class GeneratedPeptideContents_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _variableModifications_Selected : boolean = true; // Default true

    //  Open mod selections only visible when search has open mods so can always default to true
    private _openModifications_Selected : boolean = true; // Default true
    private _openModifications_WithLocalization_Selected : boolean = true; // Default true

    private _staticModifications_Selected : boolean;

    /**
     *
     */
    constructor() {

    }

    /**
     * @returns false if not set
     *
     */
    getStaticModifications_Selected() : boolean {

        if ( this._staticModifications_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    setStaticModifications_Selected( selected : boolean ) : void {

        this._staticModifications_Selected = selected;
    }

    /**
     * @returns false if not set
     *
     */
    getVariableModifications_Selected() : boolean {

        if ( this._variableModifications_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    setVariableModifications_Selected( selected : boolean ) : void {

        this._variableModifications_Selected = selected;
    }

    /**
     * @returns false if not set
     *
     */
    getOpenModifications_Selected() : boolean {

        if ( this._openModifications_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    setOpenModifications_Selected( selected : boolean ) : void {

        this._openModifications_Selected = selected;
    }

    /**
     * @returns false if not set
     *
     */
    getOpenModifications_WithLocalization_Selected() : boolean {

        if ( this._openModifications_WithLocalization_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    setOpenModifications_WithLocalization_Selected( selected : boolean ) : void {

        this._openModifications_WithLocalization_Selected = selected;
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

        if (  this._variableModifications_Selected ) {
            // @ts-ignore
            result[ _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            // @ts-ignore
            result[ _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._openModifications_Selected ) {
            // @ts-ignore
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            // @ts-ignore
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._openModifications_WithLocalization_Selected ) {
            // @ts-ignore
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            // @ts-ignore
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._staticModifications_Selected ) {
            // @ts-ignore
            result[ _ENCODED_DATA__STATIC_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            // @ts-ignore
            result[ _ENCODED_DATA__STATIC_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }

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

        if ( encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._variableModifications_Selected = true;
        } else {
            this._variableModifications_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__OPEN_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._openModifications_Selected = true;
        } else {
            this._openModifications_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._openModifications_WithLocalization_Selected = true;
        } else {
            this._openModifications_WithLocalization_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._staticModifications_Selected = true;
        } else {
            this._staticModifications_Selected = false;
        }
    }
}

