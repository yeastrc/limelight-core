/**
 * peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.ts
 *
 * Filter on Peptide Meets the Digestion selection - State Object
 *
 *     -  Peptide meets rules of being Tryptic or Non-Tryptic or other such/similar rules
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

const _ENCODED_DATA__SELECTION_VALUE_ENCODING_PROPERTY_NAME = 'b';

///////

/**
 *
 */
export enum PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum {

    NONE = "NONE",
    TRYPTIC_PEPTIDES = "TRYPTIC_PEPTIDES",
    NON_TRYPTIC_PEPTIDES = "NON_TRYPTIC_PEPTIDES"
}

enum UserSelections_StoredInState_StateObject__SelectionEnum {

    NONE = "A",
    TRYPTIC_PEPTIDES = "B",
    NON_TRYPTIC_PEPTIDES = "C"
}


/**
 *
 */
export class PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject {

    private _userSelection : UserSelections_StoredInState_StateObject__SelectionEnum = UserSelections_StoredInState_StateObject__SelectionEnum.NONE;

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

    is_NoneSelection() : boolean {

        if ( ! this._userSelection ) {
            return  true
        }
        if ( this._userSelection === UserSelections_StoredInState_StateObject__SelectionEnum.NONE ) {
            return  true
        }

        return false
    }

    /**
     * @returns undefined if default
     */
    get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection() : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum {

        if ( ! this._userSelection ) {
            //  Return Default
            return PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE
        }
        if ( this._userSelection === UserSelections_StoredInState_StateObject__SelectionEnum.NONE ) {
            return PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE
        }
        if ( this._userSelection === UserSelections_StoredInState_StateObject__SelectionEnum.TRYPTIC_PEPTIDES ) {
            return PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES
        }
        if ( this._userSelection === UserSelections_StoredInState_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) {
            return PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES
        }
        console.warn("get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection(): this._userSelection is not an expected value.  is: " + this._userSelection )
        console.warn("get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection(): this._userSelection is not an expected value.  is: ", this._userSelection )
        throw Error("get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection(): this._userSelection is not an expected value.  is: " + this._userSelection )
    }
    /**
     *
     */
    set_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection(peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum ) : void {

        if ( ! peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection ) {
            this._userSelection = undefined
        } else if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE ) {
            this._userSelection = UserSelections_StoredInState_StateObject__SelectionEnum.NONE
        } else if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES ) {
            this._userSelection = UserSelections_StoredInState_StateObject__SelectionEnum.TRYPTIC_PEPTIDES
        } else if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) {
            this._userSelection = UserSelections_StoredInState_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES
        } else {
            console.warn("set_missedCleavageCount__From__Filter(): peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection is not an expected value.  is: " + peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection )
            console.warn("set_missedCleavageCount__From__Filter(): peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection is not an expected value.  is: ", peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection )
            throw Error("set_missedCleavageCount__From__Filter(): peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection is not an expected value.  is: " + peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection )
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("set_missedCleavageCount__From__Filter::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._userSelection = undefined;

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

        const result = {}

        if ( this._userSelection !== undefined ) {
            result[ _ENCODED_DATA__SELECTION_VALUE_ENCODING_PROPERTY_NAME ] = this._userSelection;
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

        this._userSelection = encodedStateData[ _ENCODED_DATA__SELECTION_VALUE_ENCODING_PROPERTY_NAME ];
    }
}

