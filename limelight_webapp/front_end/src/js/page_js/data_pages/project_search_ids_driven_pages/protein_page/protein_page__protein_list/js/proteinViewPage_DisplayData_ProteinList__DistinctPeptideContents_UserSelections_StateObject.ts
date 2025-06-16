/**
 * proteinViewPage_DisplayData_ProteinList__DistinctPeptide_UserSelections_StateObject.ts
 *
 * Generated Peptide Contents Selection - State Object
 *
 * State Object used in:
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME = 'c';

const _ENCODED_DATA_VALUE_FOR_TRUE = 1;
const _ENCODED_DATA_VALUE_FOR_FALSE = 0;

///////

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _variableModifications_Selected : boolean = true; // Default true

    //  Open mod selections only visible when search has open mods so can always default to true
    private _openModifications_WithLocalization_Selected : boolean = true; // Default true

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

        if ( ! this._valueChangedCallback ) {
            throw Error("setVariableModifications_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
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

        if ( ! this._valueChangedCallback ) {
            throw Error("setOpenModifications_WithLocalization_Selected::( ! this._valueChangedCallback )")
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
        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

        if (  this._variableModifications_Selected ) {
            result[ _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__VARIABLE_MODIFICATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._openModifications_WithLocalization_Selected ) {
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }

        return result;
    }

    /**
     * Update the state of this object with the value from the URL
     *
     */
    set_encodedStateData({ encodedStateData }: { encodedStateData: any }) : void {

        if ( ! ( encodedStateData ) ) {

            return; // EARLY RETURN

            // const msg = "set_encodedStateData(...): No value in encodedStateData";
            // console.warn( msg );
            // throw Error( msg );
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
        if ( encodedStateData[ _ENCODED_DATA__OPEN_MODIFICATIONS_WITH_LOCALIZATIONS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._openModifications_WithLocalization_Selected = true;
        } else {
            this._openModifications_WithLocalization_Selected = false;
        }
    }
}

