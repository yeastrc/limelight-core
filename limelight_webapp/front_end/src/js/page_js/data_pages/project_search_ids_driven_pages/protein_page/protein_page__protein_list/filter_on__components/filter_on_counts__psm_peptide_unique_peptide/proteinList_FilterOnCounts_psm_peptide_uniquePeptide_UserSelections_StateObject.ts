/**
 * proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.ts
 *
 * Filter on Counts - PSM, Peptide, Unique Peptide - State Object
 *
 *
 * State Object used in:
 *      proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component.tsx
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PSM_COUNT_FILTER_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME = 'd';


export class ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues {

    static psm_Default = 1;
    static peptide_Default = 1;
    static uniquePeptide_Default = 0;
}


///////

/**
 *
 */
export class ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _psmCountFilter : number = undefined;
    private _peptideCountFilter : number = undefined;
    private _uniquePeptideCountFilter : number = undefined;

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
    get_PSM_CountFilter() : number {

        return this._psmCountFilter;
    }
    /**
     *
     */
    set_PSM_CountFilter( psmCountFilter : number ) : void {

        this._psmCountFilter = psmCountFilter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_PSM_CountFilter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns undefined if default
     */
    get_Peptide_CountFilter() : number {

        return this._peptideCountFilter;
    }
    /**
     *
     */
    set_Peptide_CountFilter( peptideCountFilter : number ) : void {

        this._peptideCountFilter = peptideCountFilter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_Peptide_CountFilter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns undefined if default
     */
    get_UniquePeptide_CountFilter() : number {

        return this._uniquePeptideCountFilter;
    }
    /**
     *
     */
    set_UniquePeptide_CountFilter( uniquePeptideCountFilter : number ) : void {

        this._uniquePeptideCountFilter = uniquePeptideCountFilter;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_UniquePeptide_CountFilter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._psmCountFilter = undefined;
        this._peptideCountFilter = undefined;
        this._uniquePeptideCountFilter = undefined;
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
        result[ _ENCODED_DATA__PSM_COUNT_FILTER_ENCODING_PROPERTY_NAME ] = this._psmCountFilter;
        // @ts-ignore
        result[ _ENCODED_DATA__PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME ] = this._peptideCountFilter;
        // @ts-ignore
        result[ _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME ] = this._uniquePeptideCountFilter;

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

        this._psmCountFilter = encodedStateData[ _ENCODED_DATA__PSM_COUNT_FILTER_ENCODING_PROPERTY_NAME ];
        this._peptideCountFilter = encodedStateData[ _ENCODED_DATA__PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME ];
        this._uniquePeptideCountFilter = encodedStateData[ _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_FILTER_ENCODING_PROPERTY_NAME ];
    }
}

