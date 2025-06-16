/**
 * projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject.ts
 *
 * Project Scan File Id Selection - For Scan File to Searches Page - State Object
 *
 *  !!!! React Version !!!!
 *
 *
 * State Object used in:
 *      scanFileToSearchesPage_Display_MainContent_Component.tsx
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME = 'c';


///////

/**
 * 
 */
export class ProjectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject {

	// private _initializeCalled : boolean = false;

    private _projectScanFileIdSelection : number = undefined; //  Set to undefined if no selections
	private _searchScanFileIdSelections_Set: Set<number> = undefined; //  Set to undefined if no selections

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
	 */
	get_projectScanFileIdSelection() {

        return this._projectScanFileIdSelection;
	}

	/**
	 *
	 */
	get_searchScanFileIdSelections() {

		return this._searchScanFileIdSelections_Set;
	}

	/**
	 *
	 */
	set_projectScanFileIdSelection_searchScanFileIdSelections(
		{
			projectScanFileIdSelection, searchScanFileIdSelections_Set
		} : {
			projectScanFileIdSelection : number
			searchScanFileIdSelections_Set: Set<number>
		}) : void {

        this._projectScanFileIdSelection = projectScanFileIdSelection
		this._searchScanFileIdSelections_Set = searchScanFileIdSelections_Set

		if ( ! this._valueChangedCallback ) {
			throw Error("set_projectScanFileIdSelection_searchScanFileIdSelections::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
    }

	/**
	 * 
	 * 
	 */
	clearPeptideSearchStrings() {

        this._projectScanFileIdSelection = undefined;
		this._searchScanFileIdSelections_Set = undefined

		if ( ! this._valueChangedCallback ) {
			throw Error("clearPeptideSearchStrings::( ! this._valueChangedCallback )")
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
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION
        result[ _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME ] = this._projectScanFileIdSelection

		if ( this._searchScanFileIdSelections_Set && this._searchScanFileIdSelections_Set.size > 0 ) {
			const searchScanFileIdSelections_Array = Array.from( this._searchScanFileIdSelections_Set )
			result[ _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME ] = searchScanFileIdSelections_Array
		}
		return result
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

		this._projectScanFileIdSelection = encodedStateData[ _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME ];

		const searchScanFileIdSelections_Array = encodedStateData[ _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME ];
		if ( searchScanFileIdSelections_Array && ( searchScanFileIdSelections_Array instanceof Array ) ) {
			this._searchScanFileIdSelections_Set = new Set( searchScanFileIdSelections_Array )
		}
	}
}

