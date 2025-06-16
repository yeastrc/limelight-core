/**
 * scanFilename_On_PSM_Filter_UserSelection_StateObject.ts
 *
 * Filter on Scan Filename on PSM - State Object
 *
 *
 * State Object used in:   Peptide List - Peptide page and Single Protein  - Search Based and Experiment
 *
 */

import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected SCAN_FILENAME_IDS are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__SCAN_FILENAME_IDS_SELECTED_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class ScanFilenameId_On_PSM_Filter_UserSelection_StateObject {

    private _scanFilenameIds_Selected : Set<number> = undefined;

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
    areAllSelected__scanFilenameIds() {

        let areAllSelected = true;
        if ( this._scanFilenameIds_Selected ) {
            areAllSelected = false;
        }
        return areAllSelected;
    }

    /**
     * @returns undefined if default
     */
    get__scanFilenameIds_Selected() {

        return this._scanFilenameIds_Selected;
    }
    /**
     *
     */
    set__scanFilenameIds_Selected( scanFilenameIds_Selected : Set<number> ) : void {

        this._scanFilenameIds_Selected = scanFilenameIds_Selected;

        if ( ! this._valueChangedCallback ) {
            throw Error("set__scanFilenameIds_Selected::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
     */
    remove_scanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder(
        {
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        } : {
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        }
    ) : void {

        if ( ! this._scanFilenameIds_Selected ) {
            // No selection so exit
            return;  // EARLY EXIT
        }

        if ( ! commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {
            // No SearchScanFileData loaded
            const msg = "No value in commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.  remove_scanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder(...)";
            console.warn(msg);
            throw Error(msg);
        }

        const loaded_All_SearchScanFileIds = commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds()

        let deletedEntries = false;

        const scanFilenameIds_Selected_Copy = Array.from( this._scanFilenameIds_Selected );
        for ( const scanFilenameIds_Selected_Copy_Entry of scanFilenameIds_Selected_Copy ) {
            if ( ! loaded_All_SearchScanFileIds.has( scanFilenameIds_Selected_Copy_Entry ) ) {
                this._scanFilenameIds_Selected.delete( scanFilenameIds_Selected_Copy_Entry );
                deletedEntries = true;
            }
        }

        if ( deletedEntries && this._scanFilenameIds_Selected.size === 0 ) {
            this._scanFilenameIds_Selected = undefined;  // None selected so change to all selected
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("remove_scanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._scanFilenameIds_Selected = undefined;

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

        if ( this._scanFilenameIds_Selected !== undefined ) {
            const scanFilenameIds_Selected = Array.from( this._scanFilenameIds_Selected );
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace(scanFilenameIds_Selected);

            result[ _ENCODED_DATA__SCAN_FILENAME_IDS_SELECTED_ENCODING_PROPERTY_NAME ] = scanFilenameIds_Selected;
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

        if ( encodedStateData[ _ENCODED_DATA__SCAN_FILENAME_IDS_SELECTED_ENCODING_PROPERTY_NAME ] ) {
            const scanFilenameIds_Selected_Array = encodedStateData[ _ENCODED_DATA__SCAN_FILENAME_IDS_SELECTED_ENCODING_PROPERTY_NAME ];
            this._scanFilenameIds_Selected = new Set( scanFilenameIds_Selected_Array );
        }
    }
}

