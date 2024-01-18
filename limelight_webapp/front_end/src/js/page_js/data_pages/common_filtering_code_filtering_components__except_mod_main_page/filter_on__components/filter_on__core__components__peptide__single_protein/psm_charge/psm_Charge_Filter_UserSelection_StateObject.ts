/**
 * psm_Charge_Filter_UserSelection_StateObject.ts
 *
 * Filter on Scan Filename on PSM - State Object
 *
 *
 * State Object used in:   Peptide List - Peptide page and Single Protein  - Search Based and Experiment
 *
 */

import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Charge Values are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PSM_CHARGE_VALUES_SELECTED_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class Psm_Charge_Filter_UserSelection_StateObject {

    private _chargeValues_OnPSMs_Selected : Set<number> = undefined;

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
     * @returns
     */
    areAllSelected__chargeValues_OnPSMs() {

        let areAllSelected = true;
        if ( this._chargeValues_OnPSMs_Selected ) {
            areAllSelected = false;
        }
        return areAllSelected;
    }

    /**
     * @returns undefined if default
     */
    get__chargeValues_OnPSMs_Selected() {

        return this._chargeValues_OnPSMs_Selected;
    }
    /**
     *
     */
    set__chargeValues_OnPSMs_Selected( chargeValues_OnPSMs_Selected : Set<number> ) : void {

        this._chargeValues_OnPSMs_Selected = chargeValues_OnPSMs_Selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set__chargeValues_OnPSMs_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
     */
    remove_chargeValues_OnPSMs_Selected_NOT_in_All_ChargesSet(
        {
            all_Charges
        } : {
            all_Charges: Set<number>
        }
    ) : void {

        if ( ! this._chargeValues_OnPSMs_Selected ) {
            // No selection so exit
            return;  // EARLY EXIT
        }

        if ( ! all_Charges ) {
            // No all_Charges
            const msg = "No value in all_Charges.  remove_chargeValues_OnPSMs_Selected_NOT_in_All_ChargesSet(...)";
            console.warn(msg);
            throw Error(msg);
        }

        let deletedEntries = false;

        const chargeValues_OnPSMs_Selected_Copy = Array.from( this._chargeValues_OnPSMs_Selected );
        for ( const chargeValues_OnPSMs_Selected_Copy_Entry of chargeValues_OnPSMs_Selected_Copy ) {
            if ( ! all_Charges.has( chargeValues_OnPSMs_Selected_Copy_Entry ) ) {
                this._chargeValues_OnPSMs_Selected.delete( chargeValues_OnPSMs_Selected_Copy_Entry );
                deletedEntries = true;
            }
        }

        if ( deletedEntries && this._chargeValues_OnPSMs_Selected.size === 0 ) {
            this._chargeValues_OnPSMs_Selected = undefined;  // None selected so change to all selected
        }

        if ( ! deletedEntries ) {
            //  No changes so return
            return;  // EARLY RETURN
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("remove_chargeValues_OnPSMs_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._chargeValues_OnPSMs_Selected = undefined;

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

        if ( this._chargeValues_OnPSMs_Selected !== undefined ) {
            const chargeValues = Array.from( this._chargeValues_OnPSMs_Selected );
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace(chargeValues)
            result[ _ENCODED_DATA__PSM_CHARGE_VALUES_SELECTED_ENCODING_PROPERTY_NAME ] = chargeValues;
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

        if ( encodedStateData[ _ENCODED_DATA__PSM_CHARGE_VALUES_SELECTED_ENCODING_PROPERTY_NAME ] ) {
            const chargeValues_OnPSMs_Selected_Array = encodedStateData[ _ENCODED_DATA__PSM_CHARGE_VALUES_SELECTED_ENCODING_PROPERTY_NAME ];
            this._chargeValues_OnPSMs_Selected = new Set( chargeValues_OnPSMs_Selected_Array );
        }
    }
}

