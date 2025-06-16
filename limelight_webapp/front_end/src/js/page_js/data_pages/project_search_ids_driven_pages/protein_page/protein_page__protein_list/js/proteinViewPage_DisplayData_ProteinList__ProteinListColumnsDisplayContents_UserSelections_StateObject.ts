/**
 * proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.ts
 *
 * Protein List Columns Display Contents - State Object
 *
 * Where the User Selects which columns are displayed on the Protein List
 *
 *    Currently can choose NSAF, PSM Count, Distinct Peptide Count, Unique Peptide Count, Sequence Coverage
 *    
 * State Object used in:
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PSM_COUNT_SELECTED__ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__DISTINCT_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME = 'd';
const _ENCODED_DATA__PROTEIN_COVERAGE_SELECTED__ENCODING_PROPERTY_NAME = 'e';
const _ENCODED_DATA__NSAF_SELECTED__ENCODING_PROPERTY_NAME = 'f';
const _ENCODED_DATA__ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME = 'g';
const _ENCODED_DATA__NSAF_USING_ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME = 'h';

const _ENCODED_DATA_VALUE_FOR_TRUE = 1;
const _ENCODED_DATA_VALUE_FOR_FALSE = 0;

///////

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _sequenceCoverage_Selected : boolean  //  Currently Ignored when Sub Groups, Multiple Search, or Experiment
    private _nsaf_Selected : boolean
    private _adjusted_Spectral_Count_ABACUS_Selected : boolean
    private _nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected : boolean
    private _psmCount_Selected : boolean
    private _distinctPeptideCount_Selected : boolean
    private _uniquePeptideCount_Selected : boolean

    private _valueChangedCallback: () => void;

    /**
     *
     */
    constructor(
        {
            valueChangedCallback, searchCount_IfNotExperiment, forSingleSearchHasSubGroups, forExperiment
        } : {
            valueChangedCallback: () => void
            searchCount_IfNotExperiment: number
            forSingleSearchHasSubGroups: boolean
            forExperiment: boolean
        }) {

        //  Set Defaults.  Overlaid if existing URL being loaded with values

        if ( forSingleSearchHasSubGroups || forExperiment || ( searchCount_IfNotExperiment && searchCount_IfNotExperiment > 1 ) ) {
            //  For Single Search with Sub Groups OR Experiment OR search count > 1

            this._nsaf_Selected = true;
            this._adjusted_Spectral_Count_ABACUS_Selected = false
            this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected = false
            this._psmCount_Selected = true;

        } else {

            this._sequenceCoverage_Selected = true;
            this._nsaf_Selected = true;
            this._adjusted_Spectral_Count_ABACUS_Selected = false
            this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected = false
            this._psmCount_Selected = true;
            this._distinctPeptideCount_Selected = true;
            this._uniquePeptideCount_Selected = true;
        }

        this._valueChangedCallback = valueChangedCallback;
    }

    /**
     * @returns false if not set
     *
     */
    get_SequenceCoverage_Selected() : boolean {

        if ( this._sequenceCoverage_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_SequenceCoverage_Selected( selected : boolean ) : void {

        this._sequenceCoverage_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_SequenceCoverage_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_NSAF_Selected() : boolean {

        if ( this._nsaf_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_NSAF_Selected( selected : boolean ) : void {

        this._nsaf_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_NSAF_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_Adjusted_Spectral_Count_ABACUS_Selected() : boolean {

        if ( this._adjusted_Spectral_Count_ABACUS_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_Adjusted_Spectral_Count_ABACUS_Selected( selected : boolean ) : void {

        this._adjusted_Spectral_Count_ABACUS_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_Adjusted_Spectral_Count_ABACUS_Selected_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected() : boolean {

        if ( this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected( selected : boolean ) : void {

        this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_PsmCount_Selected() : boolean {

        if ( this._psmCount_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_PsmCount_Selected( selected : boolean ) : void {

        this._psmCount_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_PsmCount_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_DistinctPeptideCount_Selected() : boolean {

        if ( this._distinctPeptideCount_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_DistinctPeptideCount_Selected( selected : boolean ) : void {

        this._distinctPeptideCount_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_DistinctPeptideCount_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     * @returns false if not set
     *
     */
    get_UniquePeptideCount_Selected() : boolean {

        if ( this._uniquePeptideCount_Selected ) {
            return  true;
        }
        return  false;
    }
    /**
     */
    set_UniquePeptideCount_Selected( selected : boolean ) : void {

        this._uniquePeptideCount_Selected = selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set_UniquePeptideCount_Selected::( ! this._valueChangedCallback )")
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

        if (  this._psmCount_Selected ) {
            result[ _ENCODED_DATA__PSM_COUNT_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__PSM_COUNT_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._distinctPeptideCount_Selected ) {
            result[ _ENCODED_DATA__DISTINCT_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__DISTINCT_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._uniquePeptideCount_Selected ) {
            result[ _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._sequenceCoverage_Selected ) {
            result[ _ENCODED_DATA__PROTEIN_COVERAGE_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__PROTEIN_COVERAGE_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._nsaf_Selected ) {
            result[ _ENCODED_DATA__NSAF_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__NSAF_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._adjusted_Spectral_Count_ABACUS_Selected ) {
            result[ _ENCODED_DATA__ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
        }
        if (  this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected ) {
            result[ _ENCODED_DATA__NSAF_USING_ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_TRUE;
        } else {
            result[ _ENCODED_DATA__NSAF_USING_ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VALUE_FOR_FALSE;
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

        if ( encodedStateData[ _ENCODED_DATA__PSM_COUNT_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._psmCount_Selected = true;
        } else {
            this._psmCount_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__DISTINCT_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._distinctPeptideCount_Selected = true;
        } else {
            this._distinctPeptideCount_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__UNIQUE_PEPTIDE_COUNT_SELECTED_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._uniquePeptideCount_Selected = true;
        } else {
            this._uniquePeptideCount_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__PROTEIN_COVERAGE_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._sequenceCoverage_Selected = true;
        } else {
            this._sequenceCoverage_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__NSAF_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._nsaf_Selected = true;
        } else {
            this._nsaf_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._adjusted_Spectral_Count_ABACUS_Selected = true;
        } else {
            this._adjusted_Spectral_Count_ABACUS_Selected = false;
        }
        if ( encodedStateData[ _ENCODED_DATA__NSAF_USING_ADJUSTED_SPECTRAL_COUNT_ABACUS_SELECTED__ENCODING_PROPERTY_NAME ] === _ENCODED_DATA_VALUE_FOR_TRUE ) {
            this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected = true;
        } else {
            this._nsaf_Using__adjusted_Spectral_Count_ABACUS_Selected = false;
        }
    }
}


