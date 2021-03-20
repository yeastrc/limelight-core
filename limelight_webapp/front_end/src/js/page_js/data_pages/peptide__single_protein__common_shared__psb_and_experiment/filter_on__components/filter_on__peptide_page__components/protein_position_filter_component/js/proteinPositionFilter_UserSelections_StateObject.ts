/**
 * proteinPositionFilter_UserSelections_StateObject.ts
 *
 * Protein Position Selection - State Object
 *
 * State Object used in:
 *      proteinPositionFilter_UserSelections_....tsx
 */
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__SELECTIONS_ENCODING_PROPERTY_NAME = 'b';

//  Sub Part Per proteinSequenceVersionId
const _ENCODED_DATA__PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME = 'a';
const _ENCODED_DATA__POSITIONS_SUB_PART__ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__FULL_PROTEIN_SELECTED__ENCODING_PROPERTY_NAME = 'c';

//  Sub Part Per positions entry
const _ENCODED_DATA__POSITION_START_ENCODING_PROPERTY_NAME = 'a';
const _ENCODED_DATA__POSITION_END_ENCODING_PROPERTY_NAME = 'b';

///////

export class ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root {

	entriesMap_Key_proteinSequenceVersionId : Map<number, ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId> = new Map();
}

export class ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId {

	proteinSequenceVersionId : number
	fullProteinSelected : boolean = false
	rangeEntries : Array<ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange> // REQUIRED to be ascending order with NO overlaps
}

export class ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange {

	proteinPosition_Start : number
	proteinPosition_End : number
}


////  Internal Classes at bottom of file


/**
 *
 */
export class ProteinPositionFilter_UserSelections_StateObject {

	// private _initializeCalled : boolean = false;

	private _selections_Ranges : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root

	/**
	 *
	 */
	constructor() {

	}

	/**
	 * @returns false if no selections
	 */
	isAnySelections() : boolean {

		if ( this._selections_Ranges ) {
			return true;
		}
		return false
	}

	/**
	 * @returns undefined if no selections
	 */
	getSelections_Ranges() : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root {

		return this._selections_Ranges;
	}

	/**
	 *
	 * @param newValue
	 */
	setSelections_Ranges( newValue : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root) : void {

		this._selections_Ranges = newValue
	}

	/**
	 *
	 *
	 */
	clearSelections() {

		this._selections_Ranges = undefined;
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

		const resultFor_All_proteinSequenceVersionIds : Array<any> = [];

		const result = {}
		// @ts-ignore
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;
		// @ts-ignore
		result[ _ENCODED_DATA__SELECTIONS_ENCODING_PROPERTY_NAME ] = resultFor_All_proteinSequenceVersionIds;

		if ( this._selections_Ranges ) {

			for ( const mapEntry of this._selections_Ranges.entriesMap_Key_proteinSequenceVersionId.entries() ) {
				const entryFor_proteinSequenceVersionId = mapEntry[ 1 ];
				const proteinSequenceVersionId = entryFor_proteinSequenceVersionId.proteinSequenceVersionId;

				const resultFor_proteinSequenceVersionId = {};
				// @ts-ignore
				resultFor_proteinSequenceVersionId[_ENCODED_DATA__PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME] = proteinSequenceVersionId;
				resultFor_All_proteinSequenceVersionIds.push( resultFor_proteinSequenceVersionId );

				if ( entryFor_proteinSequenceVersionId.fullProteinSelected ) {
					// @ts-ignore
					resultFor_proteinSequenceVersionId[_ENCODED_DATA__FULL_PROTEIN_SELECTED__ENCODING_PROPERTY_NAME] = true;
				}

				if ( entryFor_proteinSequenceVersionId.rangeEntries && entryFor_proteinSequenceVersionId.rangeEntries.length > 0 ) {

					const resultFor_positions: Array<any> = [];
					// @ts-ignore
					resultFor_proteinSequenceVersionId[_ENCODED_DATA__POSITIONS_SUB_PART__ENCODING_PROPERTY_NAME] = resultFor_positions;

					for (const positionEntry of entryFor_proteinSequenceVersionId.rangeEntries) {
						const resultFor_position = {};
						resultFor_positions.push(resultFor_position);
						// @ts-ignore
						resultFor_position[_ENCODED_DATA__POSITION_START_ENCODING_PROPERTY_NAME] = positionEntry.proteinPosition_Start;
						// @ts-ignore
						resultFor_position[_ENCODED_DATA__POSITION_END_ENCODING_PROPERTY_NAME] = positionEntry.proteinPosition_End;
					}
				}
			}
		}

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

		const encoded_For_All_proteinSequenceVersionIds = encodedStateData[ _ENCODED_DATA__SELECTIONS_ENCODING_PROPERTY_NAME ];

		if ( encoded_For_All_proteinSequenceVersionIds ) {

			if ( ! ( encoded_For_All_proteinSequenceVersionIds instanceof Array) ) {
				const msg = "set_encodedStateData(...): encoded_For_All_proteinSequenceVersionIds is NOT instanceof Array";
				console.warn(msg);
				throw Error(msg);
			}

			if ( encoded_For_All_proteinSequenceVersionIds.length > 0 ) {

				const selections = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root();

				for ( const encoded_For_proteinSequenceVersionId of encoded_For_All_proteinSequenceVersionIds ) {

					const proteinSequenceVersionId = encoded_For_proteinSequenceVersionId[_ENCODED_DATA__PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME];

					if (proteinSequenceVersionId === undefined) {
						const msg = "set_encodedStateData(...): proteinSequenceVersionId === undefined.";
						console.warn(msg);
						throw Error(msg);
					}
					if (!variable_is_type_number_Check(proteinSequenceVersionId)) {
						const msg = "set_encodedStateData(...): proteinSequenceVersionId is not a number. proteinSequenceVersionId: ";
						console.warn(msg, proteinSequenceVersionId);
						throw Error(msg + proteinSequenceVersionId);
					}

					const result_For_proteinSequenceVersionId = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId();
					result_For_proteinSequenceVersionId.proteinSequenceVersionId = proteinSequenceVersionId

					selections.entriesMap_Key_proteinSequenceVersionId.set(proteinSequenceVersionId, result_For_proteinSequenceVersionId);

					if ( encoded_For_proteinSequenceVersionId[_ENCODED_DATA__FULL_PROTEIN_SELECTED__ENCODING_PROPERTY_NAME]) {
						result_For_proteinSequenceVersionId.fullProteinSelected = true;
					}

					const encoded_For_Positions = encoded_For_proteinSequenceVersionId[_ENCODED_DATA__POSITIONS_SUB_PART__ENCODING_PROPERTY_NAME];

					if ( encoded_For_Positions ) {

						if (!(encoded_For_Positions instanceof Array)) {
							const msg = "set_encodedStateData(...): encoded_For_Positions is NOT instanceof Array";
							console.warn(msg);
							throw Error(msg);
						}

						if ( encoded_For_Positions.length > 0 ) {

							result_For_proteinSequenceVersionId.rangeEntries = [];

							for (const encoded_For_Position of encoded_For_Positions) {

								const proteinPosition_Start = encoded_For_Position[_ENCODED_DATA__POSITION_START_ENCODING_PROPERTY_NAME];
								const proteinPosition_End = encoded_For_Position[_ENCODED_DATA__POSITION_END_ENCODING_PROPERTY_NAME];

								if (proteinPosition_Start === undefined) {
									const msg = "set_encodedStateData(...): proteinPosition_Start === undefined.";
									console.warn(msg);
									throw Error(msg);
								}
								if (proteinPosition_End === undefined) {
									const msg = "set_encodedStateData(...): proteinPosition_End === undefined.";
									console.warn(msg);
									throw Error(msg);
								}

								if (!variable_is_type_number_Check(proteinPosition_Start)) {
									const msg = "set_encodedStateData(...): proteinPosition_Start is not a number. proteinPosition_Start: ";
									console.warn(msg, proteinPosition_Start);
									throw Error(msg + proteinPosition_Start);
								}
								if (!variable_is_type_number_Check(proteinPosition_End)) {
									const msg = "set_encodedStateData(...): proteinPosition_End is not a number. proteinPosition_End: ";
									console.warn(msg, proteinPosition_End);
									throw Error(msg + proteinPosition_End);
								}

								const rangeEntry = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange();
								rangeEntry.proteinPosition_Start = proteinPosition_Start;
								rangeEntry.proteinPosition_End = proteinPosition_End;

								result_For_proteinSequenceVersionId.rangeEntries.push(rangeEntry);
							}
						}
					}
				}

				this._selections_Ranges = selections;
			}
		}
	}
}
