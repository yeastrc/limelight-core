/**
 * qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.ts
 *
 * ShowSingleSearch_Not_SubSearches Selection - State Object
 *
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _showSingleSearch_Not_SubSearches : boolean = undefined; //  Set to undefined if no selection or false

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
    get_showSingleSearch_Not_SubSearches() : boolean {

        if ( ! this._showSingleSearch_Not_SubSearches ) {
            return false;
        }

        return this._showSingleSearch_Not_SubSearches;
    }

    /**
     *
     *
     */
    set_showSingleSearch_Not_SubSearches( showSingleSearch_Not_SubSearches : boolean ) : void {

        if ( ! showSingleSearch_Not_SubSearches ) {
            this._showSingleSearch_Not_SubSearches = undefined;
        } else {
            this._showSingleSearch_Not_SubSearches = showSingleSearch_Not_SubSearches;
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("set_showSingleSearch_Not_SubSearches::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clear_showSingleSearch_Not_SubSearches() {

        this._showSingleSearch_Not_SubSearches = undefined;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_showSingleSearch_Not_SubSearches::( ! this._valueChangedCallback )")
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

        result[ _ENCODED_DATA__SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_ENCODING_PROPERTY_NAME ] = this._showSingleSearch_Not_SubSearches;
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

        this._showSingleSearch_Not_SubSearches = encodedStateData[ _ENCODED_DATA__SHOW_SINGLE_SEARCH_NOT_SUB_SEARCHES_ENCODING_PROPERTY_NAME ];
    }
}
