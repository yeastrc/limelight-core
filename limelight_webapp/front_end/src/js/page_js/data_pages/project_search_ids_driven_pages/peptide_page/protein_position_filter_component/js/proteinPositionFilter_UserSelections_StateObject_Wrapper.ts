/**
 * proteinPositionFilter_UserSelections_StateObject_Wrapper.ts
 *
 * Protein Position Selection - State Object
 *
 * State Object used in:
 *      proteinPositionFilter_UserSelections_....tsx
 */
import {
	ProteinPositionFilter_UserSelections_StateObject,
	ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId,
	ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root,
	ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange
} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";


///////

export interface ProteinPositionFilter_UserSelections_StateObject_Wrapper_Add_Remove_Param {

	proteinSequenceVersionId : number
	proteinPosition_Start : number
	proteinPosition_End : number
}

///////

/**
 *
 */
export class ProteinPositionFilter_UserSelections_StateObject_Wrapper {

	// private _initializeCalled : boolean = false;

	private proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
	private projectSearchIds : Array<number>
	private loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

	/**
	 *
	 */
	constructor(
		{
			proteinPositionFilter_UserSelections_StateObject,
			projectSearchIds,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
		} : {
			proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
			projectSearchIds : Array<number>,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
		}) {
		if ( ! proteinPositionFilter_UserSelections_StateObject ) {
			throw Error( "constructor: (! proteinPositionFilter_UserSelections_StateObject) ")
		}
		if ( ! projectSearchIds ) {
			throw Error( "constructor: (! projectSearchIds) ")
		}
		if ( ! loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
			throw Error( "constructor: (! loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds) ")
		}
		this.proteinPositionFilter_UserSelections_StateObject = proteinPositionFilter_UserSelections_StateObject;
		this.projectSearchIds = projectSearchIds;
		this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
	}

	/**
	 * @returns false if no selections
	 */
	isAnySelections() : boolean {

		if ( this.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {
			return true;
		}
		return false
	}

	/**
	 * @returns undefined if no selections
	 */
	getSelections_Ranges() : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root {

		return this.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();
	}

	/**
	 *
	 *
	 */
	addSelection( selection : ProteinPositionFilter_UserSelections_StateObject_Wrapper_Add_Remove_Param ) : void {

		let root = this.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();
		if ( ! root ) {
			root = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root();
			this.proteinPositionFilter_UserSelections_StateObject.setSelections_Ranges(root);
		}
		const entriesMap_Key_proteinSequenceVersionId = root.entriesMap_Key_proteinSequenceVersionId
		let entry_For_proteinSequenceVersionId = entriesMap_Key_proteinSequenceVersionId.get( selection.proteinSequenceVersionId );
		if ( entry_For_proteinSequenceVersionId && entry_For_proteinSequenceVersionId.fullProteinSelected ) {
			// Full Protein already selected so exit

			return; // EARLY RETURN
		}
		if ( ! entry_For_proteinSequenceVersionId ) {
			entry_For_proteinSequenceVersionId = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId();
			entry_For_proteinSequenceVersionId.proteinSequenceVersionId = selection.proteinSequenceVersionId;
			entriesMap_Key_proteinSequenceVersionId.set( selection.proteinSequenceVersionId, entry_For_proteinSequenceVersionId );
		}

		let proteinLength : number = null;
		{
			for ( const projectSearchId of this.projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
				if (!loadedDataPerProjectSearchIdHolder) {
					const msg = "this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}

				const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();
				if (!proteinInfoMapKeyProteinSequenceVersionId) {
					const msg = "this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ).get_proteinInfoMapKeyProteinSequenceVersionId() returned nothing. projectSearchId: " + projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}

				const proteinInfoMap = proteinInfoMapKeyProteinSequenceVersionId.get(selection.proteinSequenceVersionId);
				if (proteinInfoMap) {
					proteinLength = proteinInfoMap.proteinLength;
					break; // BREAK LOOP
				}
			}
		}
		if ( proteinLength === null ) {
			const msg = " proteinLength === null after attempt to get length. selection.proteinSequenceVersionId: " + selection.proteinSequenceVersionId;
			console.warn(msg);
			throw Error(msg);
		}

		if ( selection.proteinPosition_Start === 1 && selection.proteinPosition_End === proteinLength ) {
			//  New selection is full protein so set and exit

			entry_For_proteinSequenceVersionId.fullProteinSelected = true;
			entry_For_proteinSequenceVersionId.rangeEntries = null;

			return; // EARLY RETURN
		}

		const rangeEntries_Existing = entry_For_proteinSequenceVersionId.rangeEntries;
		if ( ! rangeEntries_Existing ) {
			//  No existing ranges to add and exit

			const rangeEntry = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange();
			rangeEntry.proteinPosition_Start = selection.proteinPosition_Start;
			rangeEntry.proteinPosition_End = selection.proteinPosition_End;

			entry_For_proteinSequenceVersionId.rangeEntries = [];
			entry_For_proteinSequenceVersionId.rangeEntries.push( rangeEntry );

			return; // EARLY RETURN
		}

		//  Merge new selection range into existing ranges

		//  Create Array of boolean using position as index
		const selectedPositions_IndexIsPosition = new Array<boolean>();

		//  Copy in existing ranges
		for ( const rangeEntry_Existing of rangeEntries_Existing ) {
			for ( let position = rangeEntry_Existing.proteinPosition_Start; position <= rangeEntry_Existing.proteinPosition_End; position++ ) {
				selectedPositions_IndexIsPosition[ position ] = true;
			}
		}
		//  Add in new selection
		for ( let position = selection.proteinPosition_Start; position <= selection.proteinPosition_End; position++ ) {
			selectedPositions_IndexIsPosition[ position ] = true;
		}

		//  From Array of boolean, create new ranges

		const rangeEntries_New : Array<ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange> = [];
		const proteinLength_Plus_3 = proteinLength + 3;  //  Loop longer to output final range which may run to end of protein length
		let rangeStart = null;
		let rangeEnd = null;
		for ( let position = 1; position <= proteinLength_Plus_3; position++ ) {

			if ( selectedPositions_IndexIsPosition[ position ] ) {
				if ( rangeStart === null ) {
					rangeStart = position;
				}
				rangeEnd = position
			} else {
				if ( rangeStart !== null ) {
					//  save range.  position loop to > proteinLength so this will trigger for range that extends to proteinLength

					const newRange = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange()
					newRange.proteinPosition_Start = rangeStart;
					newRange.proteinPosition_End = rangeEnd;
					rangeEntries_New.push( newRange );

					rangeStart = null;
					rangeEnd = null;
				}
			}
		}

		if ( rangeEntries_New.length === 1 ) {
			//  Results in only 1 range
			const newRange = rangeEntries_New[ 0 ];
			if ( newRange.proteinPosition_Start === 1 && newRange.proteinPosition_End === proteinLength ) {
				//  Full Protein is selected.  Set and Exit

				entry_For_proteinSequenceVersionId.fullProteinSelected
				entry_For_proteinSequenceVersionId.rangeEntries = null;

				return; // EARLY RETURN
			}
		}

		entry_For_proteinSequenceVersionId.rangeEntries = rangeEntries_New;
	}

	/**
	 *
	 *
	 */
	remove_Selected_ProteinSequenceVersionId({proteinSequenceVersionId}:{proteinSequenceVersionId: number} ) : void {

		const root = this.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();
		if (!root) {
			// No selections
			return; // EARLY RETURN
		}
		const entriesMap_Key_proteinSequenceVersionId = root.entriesMap_Key_proteinSequenceVersionId

		// delete Full Protein selection
		entriesMap_Key_proteinSequenceVersionId.delete( proteinSequenceVersionId );
		if ( entriesMap_Key_proteinSequenceVersionId.size === 0 ) {
			this.proteinPositionFilter_UserSelections_StateObject.clearSelections();
		}
	}

	/**
	 *
	 *
	 */
	removeSelectedPositions( selection : ProteinPositionFilter_UserSelections_StateObject_Wrapper_Add_Remove_Param ) : void {

		const root = this.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();
		if ( ! root ) {
			// No selections
			return; // EARLY RETURN
		}
		const entriesMap_Key_proteinSequenceVersionId = root.entriesMap_Key_proteinSequenceVersionId
		const entry_For_proteinSequenceVersionId = entriesMap_Key_proteinSequenceVersionId.get( selection.proteinSequenceVersionId );
		if ( !entry_For_proteinSequenceVersionId ) {
			// No selections for proteinSequenceVersionId
			return; // EARLY RETURN
		}

		let proteinLength : number = null;
		{
			for ( const projectSearchId of this.projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
				if (!loadedDataPerProjectSearchIdHolder) {
					const msg = "this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}

				const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();
				if (!proteinInfoMapKeyProteinSequenceVersionId) {
					const msg = "this.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ).get_proteinInfoMapKeyProteinSequenceVersionId() returned nothing. projectSearchId: " + projectSearchId;
					console.warn(msg);
					throw Error(msg);
				}

				const proteinInfoMap = proteinInfoMapKeyProteinSequenceVersionId.get(selection.proteinSequenceVersionId);
				if (proteinInfoMap) {
					proteinLength = proteinInfoMap.proteinLength;
					break; // BREAK LOOP
				}
			}
		}
		if ( proteinLength === null ) {
			const msg = " proteinLength === null after attempt to get length. selection.proteinSequenceVersionId: " + selection.proteinSequenceVersionId;
			console.warn(msg);
			throw Error(msg);
		}

		if ( selection.proteinPosition_Start ===  1 && selection.proteinPosition_End === proteinLength ) {
			// delete Full Protein selection
			entriesMap_Key_proteinSequenceVersionId.delete( selection.proteinSequenceVersionId );
			if ( entriesMap_Key_proteinSequenceVersionId.size === 0 ) {
				this.proteinPositionFilter_UserSelections_StateObject.clearSelections();
			}
			return; // EARLY RETURN
		}

		if ( ! entry_For_proteinSequenceVersionId.rangeEntries ) {
			//  No Ranges to delete so delete Full Protein selection
			entriesMap_Key_proteinSequenceVersionId.delete( selection.proteinSequenceVersionId );
			if ( entriesMap_Key_proteinSequenceVersionId.size === 0 ) {
				this.proteinPositionFilter_UserSelections_StateObject.clearSelections();
			}
			return; // EARLY RETURN
		}

		//  Delete range, copy rest into new ranges

		const rangeEntries_New : Array<ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange> = [];

		for ( const rangeEntry of entry_For_proteinSequenceVersionId.rangeEntries ) {
			if ( rangeEntry.proteinPosition_Start !== selection.proteinPosition_Start ||
				rangeEntry.proteinPosition_End !== selection.proteinPosition_End ) {

				rangeEntries_New.push( rangeEntry );
			}
		}

		entry_For_proteinSequenceVersionId.rangeEntries = rangeEntries_New;

		if ( entry_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
			//  no other ranges
			entriesMap_Key_proteinSequenceVersionId.delete( selection.proteinSequenceVersionId );
		}
		if ( entriesMap_Key_proteinSequenceVersionId.size === 0 ) {
			// No selections for other proteinSequenceVersionId
			this.proteinPositionFilter_UserSelections_StateObject.clearSelections();
		}
	}

	/**
	 *
	 *
	 */
	clearSelections() {

		this.proteinPositionFilter_UserSelections_StateObject.clearSelections();
	}


	//////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 *
	 * calls this.proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
	 */
	getEncodedStateData() : any {

		return this.proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
	}
}
