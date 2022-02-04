/**
 * proteinSequenceWidget_StateObject.ts
 * 
 * Protein Sequence Widget - React Version - State Object
 * 
 *  !!!! React Version !!!!
 * 
 * State Object used in: 
 *      proteinSequenceWidget_BuildDisplayObject.ts
 *      proteinSequenceWidgetDisplay_Component_React.tsx
 */



 //     In ProteinViewPage_RootClass_Common, this data is transfered to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager

 


///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  Positions are sorted ascending first
// '<first position, base 35 encoded number>Z<Offset from first position, base 35 encoded number>Z<Offset from second position, base 35 encoded number>'

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME = 'b';

const _ENCODING_DATA__POSITION_BASE = 35;
const _ENCODING_DATA__POSITION_SEPARATOR = 'Z';

///////


/**
 * 
 */
export class ProteinSequenceWidget_StateObject {

	private _initializeCalled = false;

	private _selectedProteinSequencePositions : Set<number> = new Set();

	/**

	 */
	constructor() {

    }

	/**
	 * 
	 */
	initialize() : void {

		this._initializeCalled = true;
    }
    
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

	/**
	 * 
	 */	
	set_selectedProteinSequencePositions( { selectedProteinSequencePositions } : { selectedProteinSequencePositions : Set<number> }) : void {
		if ( ! ( selectedProteinSequencePositions ) ) {
			console.warn("set_selectedProteinSequencePositions(...): Provided selectedProteinSequencePositions param must have a value");
			throw Error("Provided selectedProteinSequencePositions param must have a value");
		}
		if ( ! ( selectedProteinSequencePositions instanceof Set ) ) {
			console.warn("set_selectedProteinSequencePositions(...): Provided selectedProteinSequencePositions param must be type Set");
			throw Error("Provided selectedProteinSequencePositions param must be type Set");
		}
		this._selectedProteinSequencePositions = selectedProteinSequencePositions;
	}

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

		const result = {}
		// @ts-ignore
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

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

			// @ts-ignore
			result[ _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME ] = positionsDelimited;
		}

		return result;
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

		const positionsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__PROTEIN_POSITIONS_ENCODING_PROPERTY_NAME ];

		const newSet_selectedProteinSequencePositions : Set<number> = new Set();

		if ( positionsAsOffsetAndAltBaseString ) {
			//  Have positions (first is position, rest are offsets) so convert to Number and compute positions
			const positionsAsOffsetAndAltBaseString_Split = positionsAsOffsetAndAltBaseString.split(_ENCODING_DATA__POSITION_SEPARATOR);

			let prevPositionValue = undefined;
			for ( const positionsAsOffsetAndAltBase of positionsAsOffsetAndAltBaseString_Split ) {
				//  positionAsOffset: all but first are offset
				const positionAsOffset = Number.parseInt( positionsAsOffsetAndAltBase, _ENCODING_DATA__POSITION_BASE);
				if ( Number.isNaN(positionAsOffset) ) {
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

}

