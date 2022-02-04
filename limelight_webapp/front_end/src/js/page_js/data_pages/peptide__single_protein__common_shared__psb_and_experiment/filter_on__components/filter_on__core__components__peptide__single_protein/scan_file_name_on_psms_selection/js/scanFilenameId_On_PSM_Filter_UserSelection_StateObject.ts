import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";

/**
 * scanFilename_On_PSM_Filter_UserSelection_StateObject.ts
 *
 * Filter on Scan Filename on PSM - State Object
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
     * @param dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
     */
    remove_scanFilenameIds_Selected_NOT_Loaded_In_dataPage_common_Data_Holder_Holder_SearchScanFileData_Root(
        {
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) : void {

        if ( ! this._scanFilenameIds_Selected ) {
            // No selection so exit
            return;  // EARLY EXIT
        }

        if ( ! dataPage_common_Data_Holder_Holder_SearchScanFileData_Root ) {
            // No SearchScanFileData loaded
            const msg = "No value in dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.  remove_scanFilenameIds_Selected_NOT_Loaded_In_dataPage_common_Data_Holder_Holder_SearchScanFileData_Root(...)";
            console.warn(msg);
            throw Error(msg);
        }

        const loaded_All_SearchScanFileIds = dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_All_SearchScanFileIds()

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
            throw Error("remove_scanFilenameIds_Selected_NOT_Loaded_In_dataPage_common_Data_Holder_Holder_SearchScanFileData_Root::( ! this._valueChangedCallback )")
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

        const result = {}

        if ( this._scanFilenameIds_Selected !== undefined ) {
            result[ _ENCODED_DATA__SCAN_FILENAME_IDS_SELECTED_ENCODING_PROPERTY_NAME ] = Array.from( this._scanFilenameIds_Selected );
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

