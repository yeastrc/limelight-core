/**
 * proteinSequenceWidget_StateObject.ts
 * 
 * Protein Sequence Widget - State Object
 *
 * State Object used in: 
 *      proteinSequenceWidget_BuildDisplayObject.ts
 *      proteinSequenceWidgetDisplay_Component_React.tsx
 *
 *  NOTE:  'Protein_Start_End' is ONLY used in Protein Bar Widget but included here since is another way of selecting protein positions in Single Protein
 */

	//     In ProteinViewPage_RootClass_Common, this data is transfered to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:
//
//   Protein Positions are sorted ascending first
// '<first position, base 35 encoded number>Z<Offset from first position, base 35 encoded number>Z<Offset from second position, base 35 encoded number>'

//  Protein Start/End positions:  Start/End pairs are '<start position>Y<end position>' with pairs separated by 'Z'.  Each number will be an offset from the previous number and base 35 encoded

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__PROTEIN_START_END_POSITIONS_ENCODING_PROPERTY_NAME = 'c';

const _ENCODING_DATA__POSITION_BASE = 35;
const _ENCODING_DATA__POSITION_SEPARATOR = 'Z';

const _ENCODING_DATA__Protein_Start_End_EncodeNumber_Radix = 30
const _ENCODING_DATA__Protein_Start_End_Separator_BetweenStartEnd_Delimiter = "Y"
const _ENCODING_DATA__Protein_Start_End_Separator_BetweenPairs_Delimiter = "Z"

///////

const _Protein_Start_End_SingleStringDelimited_ForComparisons_Delimiter = ":"

const _compute_protein_Start_End_SingleStringDelimited_ForComparisons = function (
	{
		protein_Start, protein_End
	} : {
		readonly protein_Start: number
		readonly protein_End: number
	}
) {

	const protein_Start_End_SingleStringDelimited_ForComparisons = protein_Start + _Protein_Start_End_SingleStringDelimited_ForComparisons_Delimiter + protein_End

	return protein_Start_End_SingleStringDelimited_ForComparisons
}

/**
 * Used for "Peptide" selections in the Single Protein "Protein Bar" which actually stores the Protein Start/End positions
 */
export class ProteinSequenceWidget_StateObject__Single_Protein_StartEnd_SelectionEntry {

	readonly protein_Start: number
	readonly protein_End: number

	readonly protein_Start_End_SingleStringDelimited_ForComparisons: string

	constructor(
		{
			protein_Start, protein_End
		} : {
			readonly protein_Start: number
			readonly protein_End: number
		}
	) {
		this.protein_Start = protein_Start
		this.protein_End = protein_End
		this.protein_Start_End_SingleStringDelimited_ForComparisons = _compute_protein_Start_End_SingleStringDelimited_ForComparisons({ protein_Start, protein_End })
	}
}


/**
 * 
 */
export class ProteinSequenceWidget_StateObject {

	// private _initializeCalled = false;

	private _selectedProteinSequencePositions : Set<number> = new Set();

	private _selectedProtein_StartEnd_Positions : Map<string, ProteinSequenceWidget_StateObject__Single_Protein_StartEnd_SelectionEntry> = new Map();

	/**

	 */
	constructor() {

    }

	/**
	 * 
	 */
	// initialize() : void {
	//
	// 	this._initializeCalled = true;
    // }

	//////////////////

	//   Protein Start/End Positions for selected Peptides

	/**
	 * @param position - is position in selected positions
	 */
	is_Any_selected_Protein_StartEnd_Position() : boolean {

		return this._selectedProtein_StartEnd_Positions.size !== 0;
	}

	/**
	 * ADD:
	 *
	 * @param protein_Start
	 * @param protein_End
	 */
	add_selected_Protein_StartEnd_Position(
		{
			protein_Start, protein_End
		} : {
			readonly protein_Start: number
			readonly protein_End: number
		}
	) {

		const newEntry = new ProteinSequenceWidget_StateObject__Single_Protein_StartEnd_SelectionEntry({ protein_Start, protein_End })

		this._selectedProtein_StartEnd_Positions.set( newEntry.protein_Start_End_SingleStringDelimited_ForComparisons, newEntry )
	}

	/**
	 * Delete:
	 *
	 * @param protein_Start
	 * @param protein_End
	 */
	delete_selected_Protein_StartEnd_Position(
		{
			protein_Start, protein_End
		} : {
			readonly protein_Start: number
			readonly protein_End: number
		}
	) {

		const protein_Start_End_SingleStringDelimited_ForComparisons = _compute_protein_Start_End_SingleStringDelimited_ForComparisons({ protein_Start, protein_End })

		this._selectedProtein_StartEnd_Positions.delete( protein_Start_End_SingleStringDelimited_ForComparisons )
	}

	/**
	 * Is Protein_StartEnd_Position Selected:
	 *
	 * @param protein_Start
	 * @param protein_End
	 */
	isSelected_Protein_StartEnd_Position(
		{
			protein_Start, protein_End
		} : {
			readonly protein_Start: number
			readonly protein_End: number
		}
	) {
		const protein_Start_End_SingleStringDelimited_ForComparisons = _compute_protein_Start_End_SingleStringDelimited_ForComparisons({ protein_Start, protein_End })

		return this._selectedProtein_StartEnd_Positions.has( protein_Start_End_SingleStringDelimited_ForComparisons )
	}

	/**
	 * All Protein_StartEnd_Position Selections
	 */
	get_AllSelections_Protein_StartEnd_Position() {

		return this._selectedProtein_StartEnd_Positions.values()
	}

	/**
	 * All Protein_StartEnd_Position Selections Size
	 */
	get_AllSelections_Protein_StartEnd_Position_Size() {

		return this._selectedProtein_StartEnd_Positions.size
	}

	/**
	 * Clear Protein_StartEnd_Position Selections
	 */
	clearAll_Selections_Protein_StartEnd_Position() {

		this._selectedProtein_StartEnd_Positions.clear()
	}


	///////////////////////

	//  Protein Sequence Positions

	/**
	 * @param position - position to add to selected positions
	 */
	add_selectedProteinSequencePosition({ position }: { position: number }) : void {

		if ( position === undefined ) {
			const msg = "add_selectedProteinSequencePosition: Error to add position: undefined";
			console.warn( msg );
			throw Error( msg );
		}
		
		this._selectedProteinSequencePositions.add( position );
    }
    
	/**
	 * @param position - position to delete from selected positions
	 */
	delete_selectedProteinSequencePosition({ position }: { position: number }) : void {
		
		if ( position === undefined ) {
			const msg = "delete_selectedProteinSequencePosition: Error to delete position: undefined";
			console.warn( msg );
			throw Error( msg );
		}
		
		this._selectedProteinSequencePositions.delete( position );
    }
    
	/**
	 * @param position - is position in selected positions
	 */
	has_selectedProteinSequencePosition({ position }: { position: number }) : boolean {
		
		if ( position === undefined ) {
			const msg = "has_selectedProteinSequencePosition: Error to has position: undefined";
			console.warn( msg );
			throw Error( msg );
		}
		
		return this._selectedProteinSequencePositions.has( position );
	}

	/**
	 * @param position - is position in selected positions
	 */
	is_Any_selectedProteinSequencePosition() : boolean {
		
		return this._selectedProteinSequencePositions.size !== 0;
	}

	/**
	 * Clear the Selected Protein Positions
	 */
	clear_selectedProteinSequencePositions() : void {

		this._selectedProteinSequencePositions.clear();
	}

	/**
	 * 
	 */
	get_selectedProteinSequencePositions() : Set<number> {
		
		return this._selectedProteinSequencePositions;
	}

	//  Not Used.
	// /**
	//  *
	//  */
	// set_selectedProteinSequencePositions( { selectedProteinSequencePositions } : { selectedProteinSequencePositions : Set<number> }) : void {
	// 	if ( ! ( selectedProteinSequencePositions ) ) {
	// 		console.warn("set_selectedProteinSequencePositions(...): Provided selectedProteinSequencePositions param must have a value");
	// 		throw Error("Provided selectedProteinSequencePositions param must have a value");
	// 	}
	// 	if ( ! ( selectedProteinSequencePositions instanceof Set ) ) {
	// 		console.warn("set_selectedProteinSequencePositions(...): Provided selectedProteinSequencePositions param must be type Set");
	// 		throw Error("Provided selectedProteinSequencePositions param must be type Set");
	// 	}
	// 	this._selectedProteinSequencePositions = selectedProteinSequencePositions;
	// }

	//  Not Used.  Not Properly updated to Typescript
	// /**
	//  * @param initial_selectedProteinSequencePositions - Set of selected positions to use for initial population
	//  * 		initial_selectedProteinSequencePositions will override values in encodedStateData
	//  */
	// set_initial_selectedProteinSequencePositions({ initial_selectedProteinSequencePositions : Set<number> }) {
		
	// 	if ( this._initializeCalled ) {
	// 		const msg = "Cannot call set_initial_selectedProteinSequencePositions(...) after initialize() has been called.";
	// 		console.log( msg );
	// 		throw Error( msg );
	// 	}
	// 	this.set_selectedProteinSequencePositions({ selectedProteinSequencePositions : initial_selectedProteinSequencePositions });
	// }
	

	/**
	 * @param encodedStateData - data returned by method 'getEncodedStateData' for storage on URL
	 */
	set_encodedStateData({ encodedStateData }:{ encodedStateData: any }) : void {

		this._updateWithEncodedStateData({ encodedStateData });
    }
	
	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() : any {

		const result: { [key: string]: any } = {}

		if (this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size !== 0) {

			const positionsAsArray = Array.from( this._selectedProteinSequencePositions );

			positionsAsArray.sort(function (a, b) {
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				// a must be equal to b
				return 0;
			});

			const positionsAsOffsetAndAltBase : Array<string> = [];
			let prevPosition : number = undefined;
			for (const position of positionsAsArray) {

				let positionValueToSave = position;
				if (prevPosition !== undefined) {
					positionValueToSave = position - prevPosition; // Not first so save offset
				}
				prevPosition = position;

				const positionValueToSaveAsAltBase = positionValueToSave.toString(_ENCODING_DATA__POSITION_BASE);
				positionsAsOffsetAndAltBase.push(positionValueToSaveAsAltBase);
			}

			const positionsDelimited = positionsAsOffsetAndAltBase.join(_ENCODING_DATA__POSITION_SEPARATOR);

			result[ _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME ] = positionsDelimited;
		}

		if (this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size !== 0) {

			const positionsAsArray = Array.from( this._selectedProteinSequencePositions );

			positionsAsArray.sort(function (a, b) {
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				// a must be equal to b
				return 0;
			});

			const positionsAsOffsetAndAltBase : Array<string> = [];
			let prevPosition : number = undefined;
			for (const position of positionsAsArray) {

				let positionValueToSave = position;
				if (prevPosition !== undefined) {
					positionValueToSave = position - prevPosition; // Not first so save offset
				}
				prevPosition = position;

				const positionValueToSaveAsAltBase = positionValueToSave.toString(_ENCODING_DATA__POSITION_BASE);
				positionsAsOffsetAndAltBase.push(positionValueToSaveAsAltBase);
			}

			const positionsDelimited = positionsAsOffsetAndAltBase.join(_ENCODING_DATA__POSITION_SEPARATOR);

			result[ _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME ] = positionsDelimited;
		}


		if (this._selectedProtein_StartEnd_Positions && this._selectedProtein_StartEnd_Positions.size !== 0) {

			const entries = Array.from( this._selectedProtein_StartEnd_Positions.values() )

			entries.sort(function (a, b) {
				if (a.protein_Start < b.protein_Start) {
					return -1;
				}
				if (a.protein_Start > b.protein_Start) {
					return 1;
				}
				if (a.protein_End < b.protein_End) {
					return -1;
				}
				if (a.protein_End > b.protein_End) {
					return 1;
				}
				// a must be equal to b
				return 0;
			});

			const entries_EachEncodedString_Array: Array<string> = []

			{
				let protein_Start_Prev = 0  // For compute offset

				for ( const entry of entries ) {

					const protein_Start_PrevDiff = entry.protein_Start - protein_Start_Prev
					const protein_Start_EndDiff = entry.protein_End - entry.protein_Start

					const protein_Start_PrevDiff_Encoded = protein_Start_PrevDiff.toString( _ENCODING_DATA__Protein_Start_End_EncodeNumber_Radix )
					const protein_Start_EndDiff_Encoded = protein_Start_EndDiff.toString( _ENCODING_DATA__Protein_Start_End_EncodeNumber_Radix )

					const protein_Start_End_WithSeparator = protein_Start_PrevDiff_Encoded + _ENCODING_DATA__Protein_Start_End_Separator_BetweenStartEnd_Delimiter + protein_Start_EndDiff_Encoded

					entries_EachEncodedString_Array.push( protein_Start_End_WithSeparator )

					protein_Start_Prev = entry.protein_Start
				}
			}

			const protein_Start_End_All_Delimited = entries_EachEncodedString_Array.join(_ENCODING_DATA__Protein_Start_End_Separator_BetweenPairs_Delimiter);

			result[ _ENCODED_DATA__PROTEIN_START_END_POSITIONS_ENCODING_PROPERTY_NAME ] = protein_Start_End_All_Delimited;
		}

		if ( Object.keys( result ).length === 0 ) {

			return undefined;
		}

		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		return result
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	private _updateWithEncodedStateData({ encodedStateData }: { encodedStateData: any }) : void {

		if ( ! ( encodedStateData ) ) {
			//  No Encoded State Data
			// console.log( "_updateWithEncodedStateData(...): No value in encodedStateData.  Exiting" );
			return;  // EARLY EXIT
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "_updateWithEncodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.log( msg );
			throw Error( msg );
		}

		{
			const positionsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME ];

			const newSet_selectedProteinSequencePositions: Set<number> = new Set();

			if ( positionsAsOffsetAndAltBaseString ) {
				//  Have positions (first is position, rest are offsets) so convert to Number and compute positions
				const positionsAsOffsetAndAltBaseString_Split = positionsAsOffsetAndAltBaseString.split( _ENCODING_DATA__POSITION_SEPARATOR );

				let prevPositionValue = undefined;
				for ( const positionsAsOffsetAndAltBase of positionsAsOffsetAndAltBaseString_Split ) {
					//  positionAsOffset: all but first are offset
					const positionAsOffset = Number.parseInt( positionsAsOffsetAndAltBase, _ENCODING_DATA__POSITION_BASE );
					if ( Number.isNaN( positionAsOffset ) ) {
						const msg = "_updateWithEncodedStateData(...): PositionAsOffset failed to parse: " + positionsAsOffsetAndAltBase;
						console.log( msg );
						throw Error( msg );
					}
					let position: number = undefined;
					if ( prevPositionValue === undefined ) {
						//  First position so not offset
						position = positionAsOffset;
					} else {
						position = positionAsOffset + prevPositionValue;
					}
					newSet_selectedProteinSequencePositions.add( position );
					prevPositionValue = position;
				}
			}

			this._selectedProteinSequencePositions = newSet_selectedProteinSequencePositions;
		}

		{
			const protein_Start_End_All_Delimited_String = encodedStateData[ _ENCODED_DATA__PROTEIN_START_END_POSITIONS_ENCODING_PROPERTY_NAME ] as string

			if ( protein_Start_End_All_Delimited_String ) {

				this._selectedProtein_StartEnd_Positions = new Map()

				const protein_Start_End_All_Delimited_String_Split = protein_Start_End_All_Delimited_String.split( _ENCODING_DATA__POSITION_SEPARATOR );

				{
					let protein_Start_Prev = 0  // For compute offset

					for ( const protein_Start_End_String_Entry of protein_Start_End_All_Delimited_String_Split ) {

						const protein_Start_End_String_Entry_Split = protein_Start_End_String_Entry.split( _ENCODING_DATA__Protein_Start_End_Separator_BetweenStartEnd_Delimiter )

						const protein_Start_PrevDiff_Encoded = protein_Start_End_String_Entry_Split[ 0 ] // entry.protein_Start - protein_Start_Prev
						const protein_Start_EndDiff_Encoded = protein_Start_End_String_Entry_Split[ 1 ] // entry.protein_End - entry.protein_Start

						const protein_Start_PrevDiff = Number.parseInt( protein_Start_PrevDiff_Encoded, _ENCODING_DATA__Protein_Start_End_EncodeNumber_Radix )
						const protein_Start_EndDiff = Number.parseInt( protein_Start_EndDiff_Encoded, _ENCODING_DATA__Protein_Start_End_EncodeNumber_Radix )

						const protein_Start = protein_Start_PrevDiff + protein_Start_Prev
						const protein_End = protein_Start + protein_Start_EndDiff

						const newEntry = new ProteinSequenceWidget_StateObject__Single_Protein_StartEnd_SelectionEntry({ protein_Start, protein_End })

						this._selectedProtein_StartEnd_Positions.set( newEntry.protein_Start_End_SingleStringDelimited_ForComparisons, newEntry )

						protein_Start_Prev = protein_Start
					}
				}
			}
		}
	}

}

