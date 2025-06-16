/**
 * scan_RetentionTime_MZ_UserSelections_StateObject.ts
 *
 * Filter on Retention Time and M/Z - State Object
 *
 *    !!!  No longer restricted to values from scans.  Also filter on values on PSMs.
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

const _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__FROM__FILTER_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__TO__FILTER_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__MZ__FROM__FILTER_ENCODING_PROPERTY_NAME = 'd';
const _ENCODED_DATA__MZ__TO__FILTER_ENCODING_PROPERTY_NAME = 'e';

///////

/**
 *
 */
export class Scan_RetentionTime_MZ_UserSelections_StateObject {

    private _retentionTime_InMinutes__From__Filter : number = undefined;
    private _retentionTime_InMinutes__To__Filter : number = undefined;
    private _mz__From__Filter : number = undefined;
    private _mz__To__Filter : number = undefined;

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
     */
    is_Any_FilterHaveValue() : boolean {
        if (
            ( this._retentionTime_InMinutes__From__Filter !== undefined && this._retentionTime_InMinutes__From__Filter !== null )
            || ( this._retentionTime_InMinutes__To__Filter !== undefined && this._retentionTime_InMinutes__To__Filter !== null )
            || ( this._mz__From__Filter !== undefined && this._mz__From__Filter !== null )
            || ( this._mz__To__Filter !== undefined && this._mz__To__Filter !== null )
        ) {
            return  true;
        }
        return false;
    }

    /**
     * @returns undefined if default
     */
    get_retentionTime_InMinutes__From__Filter() : number {

        return this._retentionTime_InMinutes__From__Filter;
    }
    /**
     *
     */
    set_retentionTime_InMinutes__From__Filter(retentionTime_InMinutes__From__Filter : number ) : void {

        this._retentionTime_InMinutes__From__Filter = retentionTime_InMinutes__From__Filter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_retentionTime_InMinutes__From__Filter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns undefined if default
     */
    get_retentionTime_InMinutes__To__Filter() : number {

        return this._retentionTime_InMinutes__To__Filter;
    }
    /**
     *
     */
    set_retentionTime_InMinutes__To__Filter(retentionTime_InMinutes__To__Filter : number ) : void {

        this._retentionTime_InMinutes__To__Filter = retentionTime_InMinutes__To__Filter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_retentionTime_InMinutes__To__Filter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns undefined if default
     */
    get_mz__From__Filter() : number {

        return this._mz__From__Filter;
    }
    /**
     *
     */
    set_mz__From__Filter(mz__From__Filter : number ) : void {

        this._mz__From__Filter = mz__From__Filter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_mz__From__Filter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns undefined if default
     */
    get_mz__To__Filter() : number {

        return this._mz__To__Filter;
    }
    /**
     *
     */
    set_mz__To__Filter(mz__To__Filter : number ) : void {

        this._mz__To__Filter = mz__To__Filter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_mz__To__Filter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._retentionTime_InMinutes__From__Filter = undefined;
        this._retentionTime_InMinutes__To__Filter = undefined;
        this._mz__From__Filter = undefined;
        this._mz__To__Filter = undefined;

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

        if ( this._retentionTime_InMinutes__From__Filter !== undefined ) {
            result[ _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__FROM__FILTER_ENCODING_PROPERTY_NAME ] = this._retentionTime_InMinutes__From__Filter;
        }
        if ( this._retentionTime_InMinutes__To__Filter !== undefined ) {
            result[ _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__TO__FILTER_ENCODING_PROPERTY_NAME ] = this._retentionTime_InMinutes__To__Filter;
        }
        if ( this._mz__From__Filter !== undefined ) {
            result[ _ENCODED_DATA__MZ__FROM__FILTER_ENCODING_PROPERTY_NAME ] = this._mz__From__Filter;
        }
        if ( this._mz__To__Filter !== undefined ) {
            result[ _ENCODED_DATA__MZ__TO__FILTER_ENCODING_PROPERTY_NAME ] = this._mz__To__Filter;
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

        this._retentionTime_InMinutes__From__Filter = encodedStateData[ _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__FROM__FILTER_ENCODING_PROPERTY_NAME ];
        this._retentionTime_InMinutes__To__Filter = encodedStateData[ _ENCODED_DATA__RETENTION_TIME__IN_MINUTES__TO__FILTER_ENCODING_PROPERTY_NAME ];
        this._mz__From__Filter = encodedStateData[ _ENCODED_DATA__MZ__FROM__FILTER_ENCODING_PROPERTY_NAME ]
        this._mz__To__Filter = encodedStateData[ _ENCODED_DATA__MZ__TO__FILTER_ENCODING_PROPERTY_NAME ]
    }
}

