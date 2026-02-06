/**
 * proteinSequence_Bar_Widget_StateObject.ts
 * 
 * Protein Sequence Bar Widget - State Object
 *
 * NOTE:  Protein Sequence Bar Widget Component ALSO uses class ProteinSequence_Bar_Widget_StateObject
 *
 */

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:
//

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a'

const _ENCODED_DATA__HORIZONTAL_SCALE_PERCENTAGE_VALUE_ENCODING_PROPERTY_NAME = 'b'
const _ENCODED_DATA__SHOW_TRYPSIN_CUT_POINTS_VALUE_ENCODING_PROPERTY_NAME = 'c'
const _ENCODED_DATA__SHADE_BY_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME = 'd'
const _ENCODED_DATA__SHADE_BY_PSM_COUNT__MAX_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME = 'e'

const _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_PASS_ALL_FILTERS__VALUE_ENCODING_PROPERTY_NAME = 'f'
const _ENCODED_DATA__ADD_OPEN_MODIFICATIONS_UNLOCALIZED_IN_ALL_PEPTIDE_POSITIONS__VALUE_ENCODING_PROPERTY_NAME = 'g'
const _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_FILTERED_ON__EXCLUDING_STATIC__VALUE_ENCODING_PROPERTY_NAME = 'h'


const _show_TrypsinCutPoints_DEFAULT = true
const _shade_by_PSM_Count_DEFAULT = true


export class ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants {

	static readonly shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET: number = undefined
}

export const ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants = {

	_WIDTH_SCALE_SELECTION_MIN : 50,
	_WIDTH_SCALE_SELECTION_MAX : 400,
	_WIDTH_SCALE_SELECTION_STEP : 50,

	_WIDTH_SCALE_SELECTION_DEFAULT : 100  // Be Sure choice here is a value that is valid given values above in this object
} as const

//   NOTE:  Validation Functions at bottom of file

/**
 * 
 */
export class ProteinSequence_Bar_Widget_StateObject {

	private _selected_HorizontalScale_Percentage_Value : number = ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT
	private _show_TrypsinCutPoints: boolean = _show_TrypsinCutPoints_DEFAULT
	private _shade_by_PSM_Count: boolean = _shade_by_PSM_Count_DEFAULT
	private _shade_by_PSM_Count__Max_PSM_Count: number = ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET

	private _show_only_modifications_pass_all_filters = false
	private _add_open_modifications_unlocalized_in_all_peptide_positions = false
	private _show_only_modifications_filtered_on__excluding_static = false

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

		_validate__WIDTH_SCALE_SELECTION_DEFAULT()
	}

	///////////////////////

	//  selected_HorizontalScale_Percentage_Value

	/**
	 * @param selected_HorizontalScale_Percentage_Value -
	 */
	set_selected_HorizontalScale_Percentage_Value({ selected_HorizontalScale_Percentage_Value }: { selected_HorizontalScale_Percentage_Value: number }) : void {

		if ( selected_HorizontalScale_Percentage_Value === undefined ) {
			const msg = "set_selected_HorizontalScale_Percentage_Value: selected_HorizontalScale_Percentage_Value: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		_validate_selected_HorizontalScale_Percentage_Value_Is_Valid( selected_HorizontalScale_Percentage_Value )
		
		this._selected_HorizontalScale_Percentage_Value = selected_HorizontalScale_Percentage_Value

		if ( ! this._valueChangedCallback ) {
			throw Error("set_selected_HorizontalScale_Percentage_Value::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
    }

	/**
	 * 
	 */
	get_selected_HorizontalScale_Percentage_Value() : number {
		
		return this._selected_HorizontalScale_Percentage_Value;
	}

	///////   show_TrypsinCutPoints

	/**
	 * @param show_TrypsinCutPoints -
	 */
	set_show_TrypsinCutPoints( show_TrypsinCutPoints: boolean ) : void {

		if ( show_TrypsinCutPoints === undefined ) {
			const msg = "set_show_TrypsinCutPoints: show_TrypsinCutPoints: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._show_TrypsinCutPoints = show_TrypsinCutPoints

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_TrypsinCutPoints::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_show_TrypsinCutPoints() {

		return this._show_TrypsinCutPoints;
	}

	///////   shade_by_PSM_Count

	/**
	 * @param shade_by_PSM_Count -
	 */
	set_shade_by_PSM_Count( shade_by_PSM_Count: boolean ) : void {

		if ( shade_by_PSM_Count === undefined ) {
			const msg = "set_shade_by_PSM_Count: shade_by_PSM_Count: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._shade_by_PSM_Count = shade_by_PSM_Count

		if ( ! this._valueChangedCallback ) {
			throw Error("set_shade_by_PSM_Count::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_shade_by_PSM_Count() {

		return this._shade_by_PSM_Count;
	}

	///////   shade_by_PSM_Count__Max_PSM_Count

	/**
	 * @param shade_by_PSM_Count__Max_PSM_Count -
	 */
	set_shade_by_PSM_Count__Max_PSM_Count( shade_by_PSM_Count__Max_PSM_Count: number ) : void {

		this._shade_by_PSM_Count__Max_PSM_Count = shade_by_PSM_Count__Max_PSM_Count

		if ( ! this._valueChangedCallback ) {
			throw Error("set_shade_by_PSM_Count__Max_PSM_Count::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_shade_by_PSM_Count__Max_PSM_Count() {

		return this._shade_by_PSM_Count__Max_PSM_Count;
	}

	///////   show_only_modifications_pass_all_filters

	/**
	 * @param show_only_modifications_pass_all_filters -
	 */
	set_show_only_modifications_pass_all_filters( show_only_modifications_pass_all_filters: boolean ) : void {

		if ( show_only_modifications_pass_all_filters === undefined ) {
			const msg = "set_show_only_modifications_pass_all_filters: show_only_modifications_pass_all_filters: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._show_only_modifications_pass_all_filters = show_only_modifications_pass_all_filters

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_show_only_modifications_pass_all_filters() {

		return this._show_only_modifications_pass_all_filters;
	}

	///////   add_open_modifications_unlocalized_in_all_peptide_positions

	/**
	 * @param add_open_modifications_unlocalized_in_all_peptide_positions -
	 */
	set_add_open_modifications_unlocalized_in_all_peptide_positions( add_open_modifications_unlocalized_in_all_peptide_positions: boolean ) : void {

		if ( add_open_modifications_unlocalized_in_all_peptide_positions === undefined ) {
			const msg = "set_add_open_modifications_unlocalized_in_all_peptide_positions: add_open_modifications_unlocalized_in_all_peptide_positions: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._add_open_modifications_unlocalized_in_all_peptide_positions = add_open_modifications_unlocalized_in_all_peptide_positions

		if ( ! this._valueChangedCallback ) {
			throw Error("set_add_open_modifications_unlocalized_in_all_peptide_positions::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_add_open_modifications_unlocalized_in_all_peptide_positions() {

		return this._add_open_modifications_unlocalized_in_all_peptide_positions;
	}

	///////   show_only_modifications_filtered_on__excluding_static

	/**
	 * @param show_only_modifications_filtered_on__excluding_static -
	 */
	set_show_only_modifications_filtered_on__excluding_static( show_only_modifications_filtered_on__excluding_static: boolean ) : void {

		if ( show_only_modifications_filtered_on__excluding_static === undefined ) {
			const msg = "set_show_only_modifications_filtered_on__excluding_static: show_only_modifications_filtered_on__excluding_static: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._show_only_modifications_filtered_on__excluding_static = show_only_modifications_filtered_on__excluding_static

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_filtered_on__excluding_static::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_show_only_modifications_filtered_on__excluding_static() {

		return this._show_only_modifications_filtered_on__excluding_static;
	}


	/////////////

	//   set/get encoded data

	/**
	 * @param encodedStateData - data returned by method 'getEncodedStateData' for storage on URL
	 */
	set_encodedStateData({ encodedStateData }:{ encodedStateData: any }) : void {

		this._updateWithEncodedStateData({ encodedStateData });
    }
	
	/**
	 * Get the state of this object to store on the URL
	 *
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() : any {

		const result: { [key: string]: any } = {}

		if ( this._selected_HorizontalScale_Percentage_Value ) {

			result[ _ENCODED_DATA__HORIZONTAL_SCALE_PERCENTAGE_VALUE_ENCODING_PROPERTY_NAME ] = this._selected_HorizontalScale_Percentage_Value
		}
		if ( this._show_TrypsinCutPoints ) {

			result[ _ENCODED_DATA__SHOW_TRYPSIN_CUT_POINTS_VALUE_ENCODING_PROPERTY_NAME ] = this._show_TrypsinCutPoints
		}

		if ( this._shade_by_PSM_Count ) {

			result[ _ENCODED_DATA__SHADE_BY_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME ] = this._shade_by_PSM_Count
		}

		if ( this._shade_by_PSM_Count__Max_PSM_Count !== undefined ) {

			result[ _ENCODED_DATA__SHADE_BY_PSM_COUNT__MAX_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME ] = this._shade_by_PSM_Count__Max_PSM_Count
		}

		if ( this._show_only_modifications_pass_all_filters ) {

			result[ _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_PASS_ALL_FILTERS__VALUE_ENCODING_PROPERTY_NAME ] = this._show_only_modifications_pass_all_filters
		}

		if ( this._add_open_modifications_unlocalized_in_all_peptide_positions ) {

			result[ _ENCODED_DATA__ADD_OPEN_MODIFICATIONS_UNLOCALIZED_IN_ALL_PEPTIDE_POSITIONS__VALUE_ENCODING_PROPERTY_NAME ] = this._add_open_modifications_unlocalized_in_all_peptide_positions
		}

		if ( this._show_only_modifications_filtered_on__excluding_static ) {

			result[ _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_FILTERED_ON__EXCLUDING_STATIC__VALUE_ENCODING_PROPERTY_NAME ] = this._show_only_modifications_filtered_on__excluding_static
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
			this._selected_HorizontalScale_Percentage_Value = encodedStateData[ _ENCODED_DATA__HORIZONTAL_SCALE_PERCENTAGE_VALUE_ENCODING_PROPERTY_NAME ];
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__SHOW_TRYPSIN_CUT_POINTS_VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._show_TrypsinCutPoints = true
			} else {
				this._show_TrypsinCutPoints = false
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__SHADE_BY_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._shade_by_PSM_Count = true
			} else {
				this._shade_by_PSM_Count = false
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__SHADE_BY_PSM_COUNT__MAX_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME ] !== undefined ) {
				this._shade_by_PSM_Count__Max_PSM_Count = encodedStateData[ _ENCODED_DATA__SHADE_BY_PSM_COUNT__MAX_PSM_COUNT__VALUE_ENCODING_PROPERTY_NAME ]
			}
		}


		{
			if ( encodedStateData[ _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_PASS_ALL_FILTERS__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._show_only_modifications_pass_all_filters = true
			} else {
				this._show_only_modifications_pass_all_filters = false
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__ADD_OPEN_MODIFICATIONS_UNLOCALIZED_IN_ALL_PEPTIDE_POSITIONS__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._add_open_modifications_unlocalized_in_all_peptide_positions = true
			} else {
				this._add_open_modifications_unlocalized_in_all_peptide_positions = false
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__SHOW_ONLY_MODIFICATIONS_FILTERED_ON__EXCLUDING_STATIC__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._show_only_modifications_filtered_on__excluding_static = true
			} else {
				this._show_only_modifications_filtered_on__excluding_static = false
			}
		}
	}

}


/**
 *
 */
const _validate__WIDTH_SCALE_SELECTION_DEFAULT = function () {

	if ( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT < ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) {
		const msg = "( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT < ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN )"
		console.warn( msg )
		throw Error( msg )
	}
	if ( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT > ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX ) {
		const msg = "( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT > ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX )"
		console.warn( msg )
		throw Error( msg )
	}
	//  ratio = ( default - min ) / step
	const ratio = ( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT - ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) -
		ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP

	if ( ratio !== Math.round( ratio ) ) {
		const msg = "'( default - min ) / step' is NOT a Whole Number: ( ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT - ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) / ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP is NOT a whole number.  Result of that calculation: " + ratio
		console.warn( msg )
		throw Error( msg )
	}
}

const _validate_selected_HorizontalScale_Percentage_Value_Is_Valid = function ( selected_HorizontalScale_Percentage_Value: number ) {

	//  ratio = ( selected_HorizontalScale_Percentage_Value - min ) / step
	const ratio = ( selected_HorizontalScale_Percentage_Value - ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) -
		ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP

	if ( ratio !== Math.round( ratio ) ) {
		const msg = "'( default - min ) / step' is NOT a Whole Number: ( selected_HorizontalScale_Percentage_Value - ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) / ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP is NOT a whole number.  Result of that calculation: " + ratio
		console.warn( msg )
		throw Error( msg )
	}
}

