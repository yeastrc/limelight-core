/**
 * featureDetection_ViewPage_RootTableSelection_StateObject.ts
 *
 * State Object used in:
 */


/**
 * peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.ts
 *
 * Filter on Counts - PSM - State Object
 *
 *
 * State Object used in:   Peptide List - Peptide page and Single Protein  - Search Based and Experiment
 *
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__ROOT_TABLE_SELECTION_MS2_SCAN_FILTER_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class FeatureDetection_ViewPage_RootTableSelection_StateObject {

    // private _initializeCalled : boolean = false;

    private _rootTableSelection_MS2_Scan : boolean = undefined;

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
     * @returns undefined if default
     */
    get_rootTableSelection_MS2_Scan() : boolean {

        return this._rootTableSelection_MS2_Scan;
    }
    /**
     *
     */
    set_rootTableSelection_MS2_Scan( rootTableSelection_MS2_Scan : boolean ) : void {

        this._rootTableSelection_MS2_Scan = rootTableSelection_MS2_Scan;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_rootTableSelection_MS2_Scan::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._rootTableSelection_MS2_Scan = undefined;

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

        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

        result[ _ENCODED_DATA__ROOT_TABLE_SELECTION_MS2_SCAN_FILTER_ENCODING_PROPERTY_NAME ] = this._rootTableSelection_MS2_Scan;

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

        this._rootTableSelection_MS2_Scan = encodedStateData[ _ENCODED_DATA__ROOT_TABLE_SELECTION_MS2_SCAN_FILTER_ENCODING_PROPERTY_NAME ];
    }
}

