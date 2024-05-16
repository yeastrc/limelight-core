/**
 * scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.ts
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

const _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME = 'b';


//  Encoding for Single entry

const _ENCODED_DATA__SINGLE_ENTRY__SCAN_NUMBER = 'a'
const _ENCODED_DATA__SINGLE_ENTRY__ALL_SEARCHES_SELECTED = 'b'
const _ENCODED_DATA__SINGLE_ENTRY__WHOLE_SEARCHES_SELECTED = 'c'
const _ENCODED_DATA__SINGLE_ENTRY__SEARCH_SCAN_FILE_IDS_SELECTED = 'd'


///////

export class ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY {

    scanNumber: number

    allSearches_Selected: boolean
    wholeSearches_Selected_ProjectSearchIds: Set<number>
    searchScanFile_Ids_Selected: Set<number>
}


///////

/**
 *
 */
export class ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject {

    private _selections : Array<ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY> = undefined;

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

    is_AnySelections() : boolean {

        if ( this._selections ) {
            return true
        }
        return false
    }

    /**
     * @returns undefined if default
     */
    get__scanNumber_ScanFilenameIds_ProjectSearchIds_Selections() {

        return this._selections;
    }
    /**
     *
     */
    add_Entry( entry: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY ) : void {

        if ( ! this._selections ) {
            this._selections = []
        }

        this._selections.push( entry )

        if ( ! this._valueChangedCallback ) {
            throw Error("add_Entry::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    delete_Entry( entry_ToDelete: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY ) : void {

        this._selections = this._selections.filter( (entry_InArray) => {
            if ( entry_InArray !== entry_ToDelete ) {
                return true
            }
            return  false
        })

        if ( this._selections.length === 0 ) {
            this._selections = undefined
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("add_Entry::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
     */
    remove_ProjectSearchIds_Remove_ScanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder(
        {
            projectSearchIds, commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        } : {
            projectSearchIds : Array<number>;
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        }
    ) : void {

        if ( ! this._selections ) {
            // No selection so exit
            return;  // EARLY EXIT
        }

        if ( ! commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {
            // No SearchScanFileData loaded
            const msg = "No value in commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.  remove_ProjectSearchIds_Remove_ScanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder(...)";
            console.warn(msg);
            throw Error(msg);
        }

        const projectSearchIds_Current_Set = new Set( projectSearchIds )

        const loaded_All_SearchScanFileIds = commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds()

        let deletedEntries = false;

        this._selections = this._selections.filter( ( selection_Entry, index) => {

            if ( selection_Entry.wholeSearches_Selected_ProjectSearchIds ) {

                const projectSearchIds_In_Selection_Copy_Array = Array.from( selection_Entry.wholeSearches_Selected_ProjectSearchIds )

                for ( const projectSearchId_In_Selection_Copy of projectSearchIds_In_Selection_Copy_Array ) {

                    if ( ! projectSearchIds_Current_Set.has( projectSearchId_In_Selection_Copy ) ) {

                        //  projectSearchId_In_Selection_Copy NOT in projectSearchIds_Current_Set so DELETE
                        //   Check first so track that any delete was performed

                        selection_Entry.wholeSearches_Selected_ProjectSearchIds.delete( projectSearchId_In_Selection_Copy ) //  Direct alter the Set

                        deletedEntries = true
                    }
                }
                if ( selection_Entry.wholeSearches_Selected_ProjectSearchIds.size === 0 ) {
                    selection_Entry.wholeSearches_Selected_ProjectSearchIds = undefined
                }
            }

            if ( selection_Entry.searchScanFile_Ids_Selected ) {

                const searchScanFile_Ids_In_Selection_Copy_Array = Array.from( selection_Entry.searchScanFile_Ids_Selected )

                for ( const searchScanFile_Id_In_Selection_Copy of searchScanFile_Ids_In_Selection_Copy_Array ) {

                    if ( ! loaded_All_SearchScanFileIds.has( searchScanFile_Id_In_Selection_Copy ) ) {

                        //  searchScanFile_Id_In_Selection_Copy NOT in loaded_All_SearchScanFileIds so DELETE
                        //   Check first so track that any delete was performed

                        selection_Entry.searchScanFile_Ids_Selected.delete( searchScanFile_Id_In_Selection_Copy ) //  Direct alter the Set

                        deletedEntries = true
                    }
                }
                if ( selection_Entry.searchScanFile_Ids_Selected.size === 0 ) {
                    selection_Entry.searchScanFile_Ids_Selected = undefined
                }
            }

            //  Return value to drive '.filter(...)'

            if ( ! deletedEntries ) {
                //  No changes so keep
                return true
            }

            if (
                ( ! selection_Entry.allSearches_Selected )
                && ( ! selection_Entry.wholeSearches_Selected_ProjectSearchIds )
                && ( ! selection_Entry.searchScanFile_Ids_Selected )
            ) {
                //  Nothing selected so remove
                return false
            }

            return true
        })

        if ( deletedEntries && this._selections.length === 0 ) {
            this._selections = undefined;  // None selected so remove array
        }

        if ( ! this._valueChangedCallback ) {
            throw Error("remove_ProjectSearchIds_Remove_ScanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     *
     */
    clearAll() {

        this._selections = undefined;

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

        if ( this._selections !== undefined && this._selections.length > 0 ) {

            const encoded_Entry_Array: Array<any> = []

            for ( const selection_Entry of this._selections ) {

                let wholeSearchesSelected_Array: Array<number> = undefined
                if ( selection_Entry.wholeSearches_Selected_ProjectSearchIds && selection_Entry.wholeSearches_Selected_ProjectSearchIds.size > 0 ) {
                    wholeSearchesSelected_Array = Array.from( selection_Entry.wholeSearches_Selected_ProjectSearchIds )
                }
                let searchScanFile_Ids_Selected_Array: Array<number> = undefined
                if ( selection_Entry.searchScanFile_Ids_Selected && selection_Entry.searchScanFile_Ids_Selected.size > 0 ) {
                    searchScanFile_Ids_Selected_Array = Array.from( selection_Entry.searchScanFile_Ids_Selected )
                }

                const encoded_Entry: any = {}
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SCAN_NUMBER ] =  selection_Entry.scanNumber
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__ALL_SEARCHES_SELECTED ] =  selection_Entry.allSearches_Selected
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__WHOLE_SEARCHES_SELECTED ] =  wholeSearchesSelected_Array
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SEARCH_SCAN_FILE_IDS_SELECTED ] =  searchScanFile_Ids_Selected_Array

                encoded_Entry_Array.push( encoded_Entry )
            }

            result[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ] = encoded_Entry_Array;
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

        this._selections = undefined

        if ( encodedStateData[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ] ) {

            const encoded_Entry_Array = encodedStateData[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ];

            if ( encoded_Entry_Array && ( encoded_Entry_Array instanceof Array ) && encoded_Entry_Array.length > 0 ) {

                this._selections = []

                for ( const encoded_Entry of encoded_Entry_Array ) {

                    let wholeSearches_Selected_ProjectSearchIds: Set<number> = undefined
                    let searchScanFile_Ids_Selected: Set<number> = undefined

                    if ( encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__WHOLE_SEARCHES_SELECTED ] && ( encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__WHOLE_SEARCHES_SELECTED ] instanceof Array ) ) {
                        const wholeSearches_Selected_ProjectSearchIds_Array = encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__WHOLE_SEARCHES_SELECTED ]
                        if ( wholeSearches_Selected_ProjectSearchIds_Array.length > 0 ) {
                            wholeSearches_Selected_ProjectSearchIds = new Set( wholeSearches_Selected_ProjectSearchIds_Array )
                        }
                    }
                    if ( encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SEARCH_SCAN_FILE_IDS_SELECTED ] && ( encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SEARCH_SCAN_FILE_IDS_SELECTED ] instanceof Array ) ) {
                        const searchScanFile_Ids_Selected_Array = encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SEARCH_SCAN_FILE_IDS_SELECTED ]
                        if ( searchScanFile_Ids_Selected_Array.length > 0 ) {
                            searchScanFile_Ids_Selected = new Set( searchScanFile_Ids_Selected_Array )
                        }
                    }

                    const stateEntry: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY = {
                        scanNumber: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SCAN_NUMBER ],

                        allSearches_Selected: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__ALL_SEARCHES_SELECTED ],
                        wholeSearches_Selected_ProjectSearchIds,
                        searchScanFile_Ids_Selected
                    }

                    this._selections.push( stateEntry )
                }
            }
        }
    }
}

