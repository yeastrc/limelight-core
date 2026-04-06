/**
 * protein_Structure_Widget_StateObject.ts
 * 
 * Protein Structure Widget - State Object
 *
 * NOTE:  Protein Structure Widget Component ALSO uses class ProteinSequenceWidget_StateObject
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

const _ENCODED_DATA__SELECTED__STRUCTURE_FILE_ID__VALUE_ENCODING_PROPERTY_NAME = 'i'
const _ENCODED_DATA__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__VALUE_ENCODING_PROPERTY_NAME = 'j'

const _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__VALUE_ENCODING_PROPERTY_NAME = 'k'

const _ENCODED_DATA__SHOW_MODIFICATIONS_SYMBOLS__VALUE_ENCODING_PROPERTY_NAME = 'l'
const _ENCODED_DATA__MODIFICATIONS_SYMBOLS__COLOR__VALUE_ENCODING_PROPERTY_NAME = 'm'

const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__VALUE_ENCODING_PROPERTY_NAME = 'n'

const _ENCODED_DATA__MODIFICATIONS_SYMBOLS__SIZE_PERCENTAGE__VALUE_ENCODING_PROPERTY_NAME = 'o'


////

// Encode child class Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__Root

const _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__RESIDUE_LETTER__VALUE_ENCODING_PROPERTY_NAME = 'a'
const _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME = 'b'
const _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__SELECTED_FOR_DISPLAY__VALUE_ENCODING_PROPERTY_NAME = 'c'

// Encode child class Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications

const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__VARIABLE_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME = 'a'
const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__OPEN_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME = 'b'

// Encode child class Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry

const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__MODIFICATION_MASS__VALUE_ENCODING_PROPERTY_NAME = 'a'
const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME = 'b'
const _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__SELECTED__VALUE_ENCODING_PROPERTY_NAME = 'c'



///////////

//  Defaults

const _show_TrypsinCutPoints_DEFAULT = true
const _shade_by_PSM_Count_DEFAULT = true

const _show_Modification_Symbols_DEFAULT = true
const _modification_Symbols_Size_Percentage_Value_DEFAULT = 100


export const Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants = {

	_BALL_SIZE_SCALE_SELECTION_MIN : 50,
	_BALL_SIZE_SCALE_SELECTION_MAX : 400,
	_BALL_SIZE_SCALE_SELECTION_STEP : 50,

	_BALL_SIZE_SCALE_SELECTION_DEFAULT : 100  // Be Sure choice here is a value that is valid given values above in this object
} as const

//   NOTE:  Validation Functions at bottom of file

//////

export class Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants {

	static readonly shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET: number = undefined
}

export const Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants = {

	_WIDTH_SCALE_SELECTION_MIN : 50,
	_WIDTH_SCALE_SELECTION_MAX : 400,
	_WIDTH_SCALE_SELECTION_STEP : 50,

	_WIDTH_SCALE_SELECTION_DEFAULT : 100  // Be Sure choice here is a value that is valid given values above in this object
} as const

////////////////////////

//   NOTE:  Validation Functions at bottom of file

////////////////////////


/**
 *
 */
export class Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Root {

	private _variable_Modifications_Selections: Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications
	private _open_Modifications_Selections: Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications
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

		this._variable_Modifications_Selections = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications({
			valueChangedCallback: valueChangedCallback
		})
		this._open_Modifications_Selections = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications({
			valueChangedCallback: valueChangedCallback
		})
	}

	get_variable_Modifications_Selections() {
		return this._variable_Modifications_Selections
	}
	get_open_Modifications_Selections() {
		return this._open_Modifications_Selections
	}

}

/**
 *
 */
export class Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Variable_OR_Open_Modifications {

	private _modificationMass_AND_Color_Map_Key_ModificationMass: Map<number, Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry> = new Map()

	/**
	 * Cached result that needs to be set to undefined whenever the map changes
	 * @private
	 */
	private _mapValues_With_selectionActivelySelected_True: Array<Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry>

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

	isEmpty() {
		return this._modificationMass_AND_Color_Map_Key_ModificationMass.size === 0
	}

	isEmpty_For_Entries_SelectionActivelySelected_True() {

		this._computeIfNotSet___mapValues_With_selectionActivelySelected_True()

		if ( this._mapValues_With_selectionActivelySelected_True.length > 0 ) {
			return false
		}
		return true
	}

	size() {
		return this._modificationMass_AND_Color_Map_Key_ModificationMass.size
	}

	getAll_For_Entries_SelectionActivelySelected_True(): ReadonlyArray<Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry> {

		this._computeIfNotSet___mapValues_With_selectionActivelySelected_True()

		return this._mapValues_With_selectionActivelySelected_True
	}

	clearAll() {

		this._modificationMass_AND_Color_Map_Key_ModificationMass.clear()

		this._clear___mapValues_With_selectionActivelySelected_True()

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	getAll() {
		return this._modificationMass_AND_Color_Map_Key_ModificationMass.values()
	}

	get_Entry_For_ModificationMass( modificationMass: number ) {
		return this._modificationMass_AND_Color_Map_Key_ModificationMass.get( modificationMass )
	}
	insert_Entry( entry: Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry ) {

		this._modificationMass_AND_Color_Map_Key_ModificationMass.set( entry.modificationMass, entry )

		this._clear___mapValues_With_selectionActivelySelected_True()

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	delete_Entry_For_ModificationMass( modificationMass: number ) {

		this._modificationMass_AND_Color_Map_Key_ModificationMass.delete( modificationMass )

		this._clear___mapValues_With_selectionActivelySelected_True()

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	private _clear___mapValues_With_selectionActivelySelected_True() {
		this._mapValues_With_selectionActivelySelected_True = undefined
	}

	private _computeIfNotSet___mapValues_With_selectionActivelySelected_True() {

		this._mapValues_With_selectionActivelySelected_True = []

		for ( const entry of this._modificationMass_AND_Color_Map_Key_ModificationMass.values() ) {
			if ( entry.selectionActivelySelected ) {
				this._mapValues_With_selectionActivelySelected_True.push( entry )
			}
		}
	}
}

/**
 *
 */
export class Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry {

	readonly modificationMass: number
	/**
	 * Must be format '#RRGGBB' for easy conversion to Molstar and ChimeraX
	 */
	readonly color__SixHex_WithLeading_Hash: string

	/**
	 * Is this selection actively selected.  Only if true then use this selection for display.
	 *
	 * Have this so keep this entry around if not actively selected.
	 */
	readonly selectionActivelySelected: boolean

	constructor(
		{
			modificationMass, color__SixHex_WithLeading_Hash, selectionActivelySelected
		} : {
			readonly modificationMass: number
			/**
			 * Must be format '#RRGGBB' for easy conversion to Molstar and ChimeraX
			 */
			readonly color__SixHex_WithLeading_Hash: string

			/**
			 * Is this selection actively selected.  Only if true then use this selection for display.
			 *
			 * Have this so keep this entry around if not actively selected.
			 */
			readonly selectionActivelySelected: boolean
		}
	) {
		// Require format #RRGGBB
		if ( color__SixHex_WithLeading_Hash && ( ! ( /^#[0-9a-fA-F]{6}$/.test( color__SixHex_WithLeading_Hash ) ) ) ) {
			const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + color__SixHex_WithLeading_Hash
			console.warn(msg)
			throw Error(msg)
		}

		this.modificationMass = modificationMass
		this.color__SixHex_WithLeading_Hash = color__SixHex_WithLeading_Hash
		this.selectionActivelySelected = selectionActivelySelected
	}
}

////////

/**
 *
 */
export class Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__Root {

	private _residueLetters_AND_T_Map_Key_ResidueLetter: Map<string, Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry> = new Map()

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

	isEmpty() {
		return this._residueLetters_AND_T_Map_Key_ResidueLetter.size === 0
	}
	size() {
		return this._residueLetters_AND_T_Map_Key_ResidueLetter.size
	}
	clearAll() {
		this._residueLetters_AND_T_Map_Key_ResidueLetter.clear()

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}
	getAll() {
		return this._residueLetters_AND_T_Map_Key_ResidueLetter.values()
	}

	get_Entry_For_ResidueLetter( residueLetter: string ) {
		return this._residueLetters_AND_T_Map_Key_ResidueLetter.get( residueLetter )
	}
	insert_Entry( entry: Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry ) {
		this._residueLetters_AND_T_Map_Key_ResidueLetter.set( entry.residueLetter, entry )

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	delete_Entry_For_ResidueLetter( residueLetter: string ) {
		this._residueLetters_AND_T_Map_Key_ResidueLetter.delete( residueLetter )

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_only_modifications_pass_all_filters::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}
}

/**
 *
 */
export class Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry {

	readonly residueLetter: string
	/**
	 * Must be format '#RRGGBB' for easy conversion to Molstar and ChimeraX
	 */
	readonly color__SixHex_WithLeading_Hash: string

	readonly residueLetter_SelectedForDisplay: boolean

	constructor(
		{
			residueLetter, color__SixHex_WithLeading_Hash, residueLetter_SelectedForDisplay
		} : {
			readonly residueLetter: string
			/**
			 * Must be format '#RRGGBB' for easy conversion to Molstar and ChimeraX
			 */
			readonly color__SixHex_WithLeading_Hash: string

			residueLetter_SelectedForDisplay: boolean
		}
	) {
		// Require format #RRGGBB
		if ( color__SixHex_WithLeading_Hash && ( ! ( /^#[0-9a-fA-F]{6}$/.test( color__SixHex_WithLeading_Hash ) ) ) ) {
			const msg = "Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry::constructor: Color format of new color is NOT '#RRGGBB'.  New Color: " + color__SixHex_WithLeading_Hash
			console.warn(msg)
			throw Error(msg)
		}

		this.residueLetter = residueLetter
		this.color__SixHex_WithLeading_Hash = color__SixHex_WithLeading_Hash
		this.residueLetter_SelectedForDisplay = residueLetter_SelectedForDisplay
	}
}

/////////////////////////

/**
 * 
 */
export class Protein_Structure_Widget_StateObject {

	private _selected_StructureFile_Id: number
	private _selected_LimelightAssigned_ChainId_Set: Set<number> = new Set()

	private _selected_HorizontalScale_Percentage_Value : number = Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT
	private _show_TrypsinCutPoints: boolean = _show_TrypsinCutPoints_DEFAULT
	private _shade_by_PSM_Count: boolean = _shade_by_PSM_Count_DEFAULT
	private _shade_by_PSM_Count__Max_PSM_Count: number = Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET

	private _show_only_modifications_pass_all_filters = false
	private _add_open_modifications_unlocalized_in_all_peptide_positions = false
	private _show_only_modifications_filtered_on__excluding_static = false

	private _show_Modification_Symbols = _show_Modification_Symbols_DEFAULT
	private _modification_Symbols_Color__SixHex_WithLeading_Hash: string = undefined
	private _modification_Symbols_Size_Percentage_Value = _modification_Symbols_Size_Percentage_Value_DEFAULT

	private _residueLetter_AND_Color_Selection_Root : Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__Root

	private _modificationMass_AND_Color_Selections__Root: Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Root

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

		this._residueLetter_AND_Color_Selection_Root = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__Root({ valueChangedCallback })
		this._modificationMass_AND_Color_Selections__Root = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__Root({ valueChangedCallback })

		_validate__WIDTH_SCALE_SELECTION_DEFAULT()

		_validate__ModificationBall_SCALE_SELECTION_DEFAULT()
	}

	///////////////////////

	/**
	 *
	 */
	get_residueLetter_AND_Color_Selection_Root() {
		return this._residueLetter_AND_Color_Selection_Root
	}

	///////////////////////

	/**
	 *
	 */
	get_modificationMass_AND_Color_Selections__Root() {
		return this._modificationMass_AND_Color_Selections__Root
	}

	///////////

	/**
	 * @param show_TrypsinCutPoints -
	 */
	set_selected_StructureFile_Id( selected_StructureFile_Id: number ) : void {

		if ( selected_StructureFile_Id === undefined ) {
			const msg = "set_selected_StructureFile_Id: selected_StructureFile_Id: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._selected_StructureFile_Id = selected_StructureFile_Id

		if ( ! this._valueChangedCallback ) {
			throw Error("set_selected_StructureFile_Id::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_selected_StructureFile_Id() {

		return this._selected_StructureFile_Id;
	}

	/**
	 * @param selected_LimelightAssigned_ChainId -
	 */
	selected_LimelightAssigned_ChainId_Set__HAS_ANY() : boolean {

		return this._selected_LimelightAssigned_ChainId_Set.size > 0
	}

	/**
	 * @param selected_LimelightAssigned_ChainId -
	 */
	selected_LimelightAssigned_ChainId_Set__CONTAINS( selected_LimelightAssigned_ChainId: number ) : boolean {

		return this._selected_LimelightAssigned_ChainId_Set.has( selected_LimelightAssigned_ChainId )
	}

	/**
	 * @param selected_LimelightAssigned_ChainId -
	 */
	selected_LimelightAssigned_ChainId_Set__ADD( selected_LimelightAssigned_ChainId: number ) : void {

		if ( selected_LimelightAssigned_ChainId === undefined ) {
			const msg = "selected_LimelightAssigned_ChainId_Set__ADD: selected_LimelightAssigned_ChainId: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._selected_LimelightAssigned_ChainId_Set.add( selected_LimelightAssigned_ChainId )

		if ( ! this._valueChangedCallback ) {
			throw Error("selected_LimelightAssigned_ChainId_Set__ADD::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 * @param selected_LimelightAssigned_ChainId -
	 */
	selected_LimelightAssigned_ChainId_Set__DELETE( selected_LimelightAssigned_ChainId: number ) : void {

		if ( selected_LimelightAssigned_ChainId === undefined ) {
			const msg = "selected_LimelightAssigned_ChainId_Set__DELETE: selected_LimelightAssigned_ChainId: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._selected_LimelightAssigned_ChainId_Set.delete( selected_LimelightAssigned_ChainId )

		if ( ! this._valueChangedCallback ) {
			throw Error("selected_LimelightAssigned_ChainId_Set__DELETE::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	selected_LimelightAssigned_ChainId_Set__CLEAR() : void {

		this._selected_LimelightAssigned_ChainId_Set.clear()

		if ( ! this._valueChangedCallback ) {
			throw Error("selected_LimelightAssigned_ChainId_Set__CLEAR::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	//////

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

	///////   show_Modification_Symbols

	/**
	 * @param show_Modification_Symbols -
	 */
	set_show_Modification_Symbols( show_Modification_Symbols: boolean ) : void {

		if ( show_Modification_Symbols === undefined ) {
			const msg = "set_show_Modification_Symbols: show_Modification_Symbols: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._show_Modification_Symbols = show_Modification_Symbols

		if ( ! this._valueChangedCallback ) {
			throw Error("set_show_Modification_Symbols::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_show_Modification_Symbols() {

		return this._show_Modification_Symbols;
	}

	///////   modification_Symbols_Color__SixHex_WithLeading_Hash

	/**
	 * @param modification_Symbols_Color__SixHex_WithLeading_Hash -
	 */
	set_modification_Symbols_Color__SixHex_WithLeading_Hash( modification_Symbols_Color__SixHex_WithLeading_Hash: string ) : void {

		if ( modification_Symbols_Color__SixHex_WithLeading_Hash === undefined ) {
			const msg = "set_modification_Symbols_Color__SixHex_WithLeading_Hash: modification_Symbols_Color__SixHex_WithLeading_Hash: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		// Require format #RRGGBB
		if ( ! ( /^#[0-9a-fA-F]{6}$/.test( modification_Symbols_Color__SixHex_WithLeading_Hash ) ) ) {
			const msg = "set_modification_Symbols_Color__SixHex_WithLeading_Hash(...): Color format of new color is NOT '#RRGGBB'.  New Color: " + modification_Symbols_Color__SixHex_WithLeading_Hash
			console.warn(msg)
			throw Error(msg)
		}

		this._modification_Symbols_Color__SixHex_WithLeading_Hash = modification_Symbols_Color__SixHex_WithLeading_Hash

		if ( ! this._valueChangedCallback ) {
			throw Error("set_modification_Symbols_Color__SixHex_WithLeading_Hash::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_modification_Symbols_Color__SixHex_WithLeading_Hash() {

		return this._modification_Symbols_Color__SixHex_WithLeading_Hash;
	}

	///////   modification_Symbols_Size_Percentage_Value

	/**
	 * @param modification_Symbols_Size_Percentage_Value -
	 */
	set_modification_Symbols_Size_Percentage_Value( modification_Symbols_Size_Percentage_Value: number ) : void {

		if ( modification_Symbols_Size_Percentage_Value === undefined ) {
			const msg = "set_modification_Symbols_Size_Percentage_Value: modification_Symbols_Size_Percentage_Value: undefined";
			console.warn( msg );
			throw Error( msg );
		}

		this._modification_Symbols_Size_Percentage_Value = modification_Symbols_Size_Percentage_Value

		if ( ! this._valueChangedCallback ) {
			throw Error("set_modification_Symbols_Size_Percentage_Value::( ! this._valueChangedCallback )")
		}

		this._valueChangedCallback();
	}

	/**
	 *
	 */
	get_modification_Symbols_Size_Percentage_Value() {

		return this._modification_Symbols_Size_Percentage_Value;
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

		if ( this._selected_StructureFile_Id ) {

			result[ _ENCODED_DATA__SELECTED__STRUCTURE_FILE_ID__VALUE_ENCODING_PROPERTY_NAME ] = this._selected_StructureFile_Id
		}

		if ( this._selected_LimelightAssigned_ChainId_Set && this._selected_LimelightAssigned_ChainId_Set.size > 0 ) {

			const dataAsArray = Array.from( this._selected_LimelightAssigned_ChainId_Set )

			result[ _ENCODED_DATA__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__VALUE_ENCODING_PROPERTY_NAME ] = dataAsArray
		}

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

		// if ( this._show_Modification_Symbols ) {

			result[ _ENCODED_DATA__SHOW_MODIFICATIONS_SYMBOLS__VALUE_ENCODING_PROPERTY_NAME ] = this._show_Modification_Symbols
		// }

		if ( this._modification_Symbols_Color__SixHex_WithLeading_Hash ) {

			result[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__COLOR__VALUE_ENCODING_PROPERTY_NAME ] = this._modification_Symbols_Color__SixHex_WithLeading_Hash
		}
		{
			result[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__SIZE_PERCENTAGE__VALUE_ENCODING_PROPERTY_NAME ] = this._modification_Symbols_Size_Percentage_Value
		}

		if ( ! this._residueLetter_AND_Color_Selection_Root.isEmpty() ) {

			const result_SubPart_Array: Array<{ [key: string]: any }> = []

			for ( const entry of this._residueLetter_AND_Color_Selection_Root.getAll() ) {

				const result_SubPart_Entry: { [key: string]: any } = {}

				result_SubPart_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__RESIDUE_LETTER__VALUE_ENCODING_PROPERTY_NAME ] = entry.residueLetter
				if ( entry.color__SixHex_WithLeading_Hash ) {
					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ] = entry.color__SixHex_WithLeading_Hash
				}
				if ( entry.residueLetter_SelectedForDisplay ) {
					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__SELECTED_FOR_DISPLAY__VALUE_ENCODING_PROPERTY_NAME ] = entry.residueLetter_SelectedForDisplay
				}

				result_SubPart_Array.push( result_SubPart_Entry )
			}

			result[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__VALUE_ENCODING_PROPERTY_NAME ] = result_SubPart_Array
		}

		{
			const result_SubPart_AllSubTypes: { [ key: string ]: any } = {}

			if ( ! this._modificationMass_AND_Color_Selections__Root.get_variable_Modifications_Selections().isEmpty() ) {

				const result_SubPart_Array: Array<{ [ key: string ]: any }> = []

				for ( const entry of this._modificationMass_AND_Color_Selections__Root.get_variable_Modifications_Selections().getAll() ) {

					const result_SubPart_Entry: { [ key: string ]: any } = {}

					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__MODIFICATION_MASS__VALUE_ENCODING_PROPERTY_NAME ] = entry.modificationMass
					if ( entry.color__SixHex_WithLeading_Hash ) {
						result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ] = entry.color__SixHex_WithLeading_Hash
					}
					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__SELECTED__VALUE_ENCODING_PROPERTY_NAME ] = entry.selectionActivelySelected

					result_SubPart_Array.push( result_SubPart_Entry )
				}

				result_SubPart_AllSubTypes[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__VARIABLE_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME ] = result_SubPart_Array
			}

			if ( ! this._modificationMass_AND_Color_Selections__Root.get_open_Modifications_Selections().isEmpty() ) {

				const result_SubPart_Array: Array<{ [ key: string ]: any }> = []

				for ( const entry of this._modificationMass_AND_Color_Selections__Root.get_open_Modifications_Selections().getAll() ) {

					const result_SubPart_Entry: { [ key: string ]: any } = {}

					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__MODIFICATION_MASS__VALUE_ENCODING_PROPERTY_NAME ] = entry.modificationMass
					if ( entry.color__SixHex_WithLeading_Hash ) {
						result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ] = entry.color__SixHex_WithLeading_Hash
					}
					result_SubPart_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__SELECTED__VALUE_ENCODING_PROPERTY_NAME ] = entry.selectionActivelySelected

					result_SubPart_Array.push( result_SubPart_Entry )
				}

				result_SubPart_AllSubTypes[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__OPEN_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME ] = result_SubPart_Array
			}

			if ( Object.keys( result_SubPart_AllSubTypes ).length > 0 ) {

				result[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__VALUE_ENCODING_PROPERTY_NAME ] = result_SubPart_AllSubTypes
			}
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
			if ( encodedStateData[ _ENCODED_DATA__SELECTED__STRUCTURE_FILE_ID__VALUE_ENCODING_PROPERTY_NAME ] !== undefined ) {
				this._selected_StructureFile_Id = encodedStateData[ _ENCODED_DATA__SELECTED__STRUCTURE_FILE_ID__VALUE_ENCODING_PROPERTY_NAME ]
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__VALUE_ENCODING_PROPERTY_NAME ] ) {

				const dataAsArray = encodedStateData[ _ENCODED_DATA__SELECTED__LIMELIGHT_ASSIGNED_CHAIN_ID__VALUE_ENCODING_PROPERTY_NAME ]

				this._selected_LimelightAssigned_ChainId_Set = new Set( dataAsArray )

			}
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

		{
			const encodedValue = encodedStateData[ _ENCODED_DATA__SHOW_MODIFICATIONS_SYMBOLS__VALUE_ENCODING_PROPERTY_NAME ]

			//  Can only use this default if always set to true or false in encode
			// if ( encodedValue === undefined || encodedValue === null ) {
			// 	this._show_Modification_Symbols = _show_Modification_Symbols_DEFAULT
			// } else {
				if ( encodedValue ) {
					this._show_Modification_Symbols = true
				} else {
					this._show_Modification_Symbols = false
				}
			// }
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__COLOR__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._modification_Symbols_Color__SixHex_WithLeading_Hash = encodedStateData[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__COLOR__VALUE_ENCODING_PROPERTY_NAME ]
			}
		}
		{
			if ( encodedStateData[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__SIZE_PERCENTAGE__VALUE_ENCODING_PROPERTY_NAME ] ) {
				this._modification_Symbols_Size_Percentage_Value = encodedStateData[ _ENCODED_DATA__MODIFICATIONS_SYMBOLS__SIZE_PERCENTAGE__VALUE_ENCODING_PROPERTY_NAME ]
			}
		}
		{
			const encoded_Selection = encodedStateData[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__VALUE_ENCODING_PROPERTY_NAME ]
			if ( encoded_Selection ) {

				this._residueLetter_AND_Color_Selection_Root.clearAll()

				for ( const encoded_Selection_Entry of encoded_Selection ) {

					const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry({
						residueLetter: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__RESIDUE_LETTER__VALUE_ENCODING_PROPERTY_NAME ],
						color__SixHex_WithLeading_Hash: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ],
						residueLetter_SelectedForDisplay: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__RESIDUE_LETTER_COLOR__SUB__SELECTED_FOR_DISPLAY__VALUE_ENCODING_PROPERTY_NAME ]
					})

					this._residueLetter_AND_Color_Selection_Root.insert_Entry( entry )
				}
			}
		}
		{
			const encoded_Selection = encodedStateData[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__VALUE_ENCODING_PROPERTY_NAME ]
			if ( encoded_Selection ) {

				{
					const result_SubPart_Array = encoded_Selection[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__VARIABLE_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME ]
					if ( result_SubPart_Array ) {

						const variable_Modifications_Selections = this._modificationMass_AND_Color_Selections__Root.get_variable_Modifications_Selections()
						variable_Modifications_Selections.clearAll()

						for ( const encoded_Selection_Entry of result_SubPart_Array ) {

							let selectionActivelySelected = false
							if ( encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__SELECTED__VALUE_ENCODING_PROPERTY_NAME ] ) {
								selectionActivelySelected = true
							}

							const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry({
								modificationMass: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__MODIFICATION_MASS__VALUE_ENCODING_PROPERTY_NAME ],
								color__SixHex_WithLeading_Hash: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ],
								selectionActivelySelected
							})

							variable_Modifications_Selections.insert_Entry( entry )
						}
					}
				}
				{
					const result_SubPart_Array = encoded_Selection[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__OPEN_MODIFICATION_DATA__VALUE_ENCODING_PROPERTY_NAME ]
					if ( result_SubPart_Array ) {

						const open_Modifications_Selections = this._modificationMass_AND_Color_Selections__Root.get_open_Modifications_Selections()
						open_Modifications_Selections.clearAll()

						for ( const encoded_Selection_Entry of result_SubPart_Array ) {

							let selectionActivelySelected = false
							if ( encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__SELECTED__VALUE_ENCODING_PROPERTY_NAME ] ) {
								selectionActivelySelected = true
							}

							const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry({
								modificationMass: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__MODIFICATION_MASS__VALUE_ENCODING_PROPERTY_NAME ],
								color__SixHex_WithLeading_Hash: encoded_Selection_Entry[ _ENCODED_DATA__SELECTED__MODIFICATION_MASS_COLOR__SUB__COLOR__VALUE_ENCODING_PROPERTY_NAME ],
								selectionActivelySelected
							})

							open_Modifications_Selections.insert_Entry( entry )
						}
					}
				}
			}
		}
	}
}


/**
 *
 */
const _validate__WIDTH_SCALE_SELECTION_DEFAULT = function () {

	if ( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT < Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) {
		const msg = "( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT < Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN )"
		console.warn( msg )
		throw Error( msg )
	}
	if ( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT > Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX ) {
		const msg = "( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT > Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX )"
		console.warn( msg )
		throw Error( msg )
	}
	//  ratio = ( default - min ) / step
	const ratio = ( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT - Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) -
		Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP

	if ( ratio !== Math.round( ratio ) ) {
		const msg = "'( default - min ) / step' is NOT a Whole Number: ( Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT - Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) / Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP is NOT a whole number.  Result of that calculation: " + ratio
		console.warn( msg )
		throw Error( msg )
	}
}

const _validate_selected_HorizontalScale_Percentage_Value_Is_Valid = function ( selected_HorizontalScale_Percentage_Value: number ) {

	//  ratio = ( selected_HorizontalScale_Percentage_Value - min ) / step
	const ratio = ( selected_HorizontalScale_Percentage_Value - Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) -
		Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP

	if ( ratio !== Math.round( ratio ) ) {
		const msg = "'( default - min ) / step' is NOT a Whole Number: ( selected_HorizontalScale_Percentage_Value - Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) / Protein_Structure_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP is NOT a whole number.  Result of that calculation: " + ratio
		console.warn( msg )
		throw Error( msg )
	}
}



/**
 *
 */
const _validate__ModificationBall_SCALE_SELECTION_DEFAULT = function () {

	if ( Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_DEFAULT < Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_MIN ) {
		const msg = "( Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT < Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN )"
		console.warn( msg )
		throw Error( msg )
	}
	if ( Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_DEFAULT > Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_MAX ) {
		const msg = "( Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT > Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX )"
		console.warn( msg )
		throw Error( msg )
	}
	//  ratio = ( default - min ) / step
	const ratio = ( Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_DEFAULT - Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_MIN ) -
		Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_STEP

	if ( ratio !== Math.round( ratio ) ) {
		const msg = "'( default - min ) / step' is NOT a Whole Number: ( Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_DEFAULT - Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN ) / Protein_Structure_Widget_StateObject__ModificationBall_Scale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP is NOT a whole number.  Result of that calculation: " + ratio
		console.warn( msg )
		throw Error( msg )
	}
}
