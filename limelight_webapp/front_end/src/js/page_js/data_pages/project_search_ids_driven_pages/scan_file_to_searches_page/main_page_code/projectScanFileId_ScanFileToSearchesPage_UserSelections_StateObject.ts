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

// const _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME = 'c';


///////

/**
 * 
 */
export class ProjectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject {

	// private _initializeCalled : boolean = false;

    // private _projectScanFileIdSelection : number = undefined; //  Set to undefined if no selections
	private _searchScanFileId_Selections_Set: Set<number> = new Set(); //  Set to new Set() if no selections

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

	// /**
	//  */
	// get_projectScanFileIdSelection() {
	//
    //     return this._projectScanFileIdSelection;
	// }

	/**
	 *
	 */
	get_searchScanFileId_Selections_Set() {

		return this._searchScanFileId_Selections_Set;
	}

	/**
	 *
	 */
	set_searchScanFileId_Selections_Set(
		{
			searchScanFileId_Selections_Set
		} : {
			searchScanFileId_Selections_Set: Set<number>
		}) : void {

		this._searchScanFileId_Selections_Set = searchScanFileId_Selections_Set
		if ( ! this._searchScanFileId_Selections_Set ) {
			this._searchScanFileId_Selections_Set = new Set()
		}

		if ( ! this._valueChangedCallback ) {
			throw Error("set_searchScanFileId_Selections_Set::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	add_searchScanFileIdSelection(
		{
			searchScanFileIdSelection
		} : {
			searchScanFileIdSelection: number
		}) : void {

		if ( ! searchScanFileIdSelection ) {
			throw Error("add_searchScanFileIdSelection::( ! searchScanFileIdSelection )")
		}

		this._searchScanFileId_Selections_Set.add( searchScanFileIdSelection )

		if ( ! this._valueChangedCallback ) {
			throw Error("add_searchScanFileIdSelection::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	remove_searchScanFileIdSelection(
		{
			searchScanFileIdSelection
		} : {
			searchScanFileIdSelection: number
		}) : void {

		if ( ! searchScanFileIdSelection ) {
			throw Error("remove_searchScanFileIdSelection::( ! searchScanFileIdSelection )")
		}

		this._searchScanFileId_Selections_Set.delete( searchScanFileIdSelection )

		if ( ! this._valueChangedCallback ) {
			throw Error("remove_searchScanFileIdSelection::( ! this._valueChangedCallback )")
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

		// result[ _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME ] = this._projectScanFileIdSelection

		if ( this._searchScanFileId_Selections_Set && this._searchScanFileId_Selections_Set.size > 0 ) {
			const searchScanFileIdSelections_Array = Array.from( this._searchScanFileId_Selections_Set )
			result[ _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME ] = searchScanFileIdSelections_Array
		}

		if ( Object.keys( result ).length === 0 ) {

			//  NOTHING to return so return undefined
			return undefined  // EARLY RETURN
		}

		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION

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

		// this._projectScanFileIdSelection = encodedStateData[ _ENCODED_DATA__PROJECT_SCAN_FILE_ID_ENCODING_PROPERTY_NAME ];

		const searchScanFileIdSelections_Array = encodedStateData[ _ENCODED_DATA__SEARCH_SCAN_FILE_IDS_ENCODING_PROPERTY_NAME ];
		if ( searchScanFileIdSelections_Array && ( searchScanFileIdSelections_Array instanceof Array ) ) {
			this._searchScanFileId_Selections_Set = new Set( searchScanFileIdSelections_Array )
		} else {
			this._searchScanFileId_Selections_Set = new Set()
		}
	}
}

