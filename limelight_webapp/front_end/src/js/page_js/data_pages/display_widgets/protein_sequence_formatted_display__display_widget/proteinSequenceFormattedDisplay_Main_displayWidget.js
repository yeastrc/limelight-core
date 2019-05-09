/**
 * proteinSequenceFormattedDisplay_Main_displayWidget.js
 * 
 * Javascript for Widget for displaying the Protein Sequence Formatted  
 * 
 * Provides interactive selecting of positions in Protein Sequence
 * 
 * Provides highlighting of Protein Coverage
 * 
 * !!!!!!!!!    Currently uses object of class ProteinSequenceCoverageData_For_ProteinSequenceVersionId which is under the protein_page folder  !!!!!!!
 * 
 */


let Handlebars = require('handlebars/runtime');

let _protein_sequence_formatted_display_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/protein_sequence_formatted_display/protein_sequence_formatted_display_template-bundle.js" );

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

const positionWrapPoint = 60;

const positionGroupSize = 10;

const _HTML_ELEMENT_DATA_KEY__SEQUENCE_POSITION = "position";


const _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTOR_AT_POSITION_PREFIX = "selector_seq_at_pos_";

//  CSS Class Names for each position of protein sequence

const _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN = "pos";

const _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED = "pos-sel";

//  CSS Class Names for styling each position based on sequence coverage (overall and filtered) and presence of mods and mods selections

//		One and only one of these CSS Class names will be applied to each sequence position

const _CSS_CLASS_NAME__SEQUENCE_POSITION_UNCOVERED = "pos-uncovered";   // uncovered residue:  'fade out' the text

//         This 'filter' is the Modification and Sequence Position selections

const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD = "pos-covered-outside-filter-mod";  // covered residue. not in filtered peptide list
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_NO_MOD = "pos-covered-outside-filter-nomod";  // covered residue, covered by filtered peptide list

const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_NO_MOD = "pos-covered-within-filter-nomod";  // not modded residue in filtered peptide list
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER = "pos-covered-within-filter-mod-no-filter";  // covered residue,  covered by filtered peptide list, mod, no mod filter
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER = "pos-covered-within-filter-mod-within-filter";  // modded residue in filtered peptide list, has a mod == a mod filter
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER = "pos-covered-within-filter-mod-outside-filter";  // modded residue in filtered peptide list, does not have a mod in mod filter 

const _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD = "pos-covered-nofilters-mod";  // modded residue, no filters (mod or position)
const _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_NO_MOD = "pos-covered-nofilters-nomod";  // not modded residue, no filters (mod or position)


const _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING = "pos-match-user-peptide-filter-search-string";  

////////////////////

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
export class ProteinSequenceFormattedDisplay_Main_displayWidget {

	/**
	 * @param proteinSequenceString
	 * 
	 * @param variableModificationMassesForProteinPositions : Variable Modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
	 * 
	 * @param staticModificationMassesForProteinPositions : Static Modification masses per sequence position:  
	 * 	     Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
	 * 
	 * @param variableModificationSelectionUnmodifiedSelected : True if User has chosen 'unmodified' under Variable Modifications - Initial Value - Boolean
	 * @param variableModificationMassesToFilterOn : Variable Modification masses that the user has selected to filter on - Initial value - Set
	 * @param staticModificationMassesToFilterOn : Static Modification masses that the user has selected to filter on - Initial value - Set
	 * 
	 * @param widget_SequenceCoverageParam_All_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 * 				* For all peptides for this protein, not filtering on Modification or Protein Position selections.
	 * 
	 * @param widget_SequenceCoverageParam_Selected_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 * 				* For peptides for this protein, filtering on Modification or Protein Position selections.
	 * 				* Probably not set since need to get Protein Position selections from this object.
	 * 
	 * @param containerHTML_Element : HTML Element in DOM to insert the Protein Sequence In
	 * @param callbackMethodForSelectedChange : function called when user changes the selected positions
	 */
	constructor( { 
		proteinSequenceString, 
		variableModificationSelectionUnmodifiedSelected,
		variableModificationMassesForProteinPositions, 
		staticModificationMassesForProteinPositions,
		variableModificationMassesToFilterOn,
		staticModificationMassesToFilterOn,

		widget_SequenceCoverageParam_All_Peptides,
		widget_SequenceCoverageParam_Selected_Peptides, // Probably not set since need to get Protein Position selections from this object.

		containerHTML_Element, 
		callbackMethodForSelectedChange }) {

		this._initializeCalled = false;

		//  Hold onto these since need when user initiates interaction with the protein sequence widget

		if ( proteinSequenceString === undefined || proteinSequenceString === null ) {
			const msg = "ProteinSequenceFormattedDisplay_Main_displayWidget: constructor: proteinSequenceString cannot be undefined or null";
			console.log( msg );
			throw Error( msg );
		}
		
		this._proteinSequenceString = proteinSequenceString;
		this._proteinSequenceAsArray = proteinSequenceString.split("");
		
		this._variableModificationMassesForProteinPositions = variableModificationMassesForProteinPositions;
		this._staticModificationMassesForProteinPositions = staticModificationMassesForProteinPositions;

		this._variableModificationSelectionUnmodifiedSelected = variableModificationSelectionUnmodifiedSelected;  //  Always set to undefined if not true
		this._variableModificationMassesToFilterOn = variableModificationMassesToFilterOn;  //  Always set to undefined if no selections
		this._staticModificationMassesToFilterOn = staticModificationMassesToFilterOn;  //  Always set to undefined if no selections
		
		this._widget_SequenceCoverageParam_All_Peptides = widget_SequenceCoverageParam_All_Peptides; 
		this._widget_SequenceCoverageParam_Selected_Peptides = widget_SequenceCoverageParam_Selected_Peptides;  //  Always is undefined if no selections

		this._containerHTML_Element = containerHTML_Element;
		
		this._callbackMethodForSelectedChange = callbackMethodForSelectedChange;
		

		//  Template Bundle _protein_sequence_formatted_display_template_bundle
		
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_overall_block_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_overall_block_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_line_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_line_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_entry_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_entry_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_a_start_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_a_start_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_b_end_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_b_end_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_c_before_variable_mod_masses_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_c_before_variable_mod_masses_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_d_before_static_mod_masses_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_d_before_static_mod_masses_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template");
		}
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_mass_entry_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_mass_entry_template");
		}
		
		this._protein_sequence_formatted_display_overall_block_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_overall_block_template;

		this._protein_sequence_formatted_display_single_line_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_line_template;
		
		this._protein_sequence_formatted_display_single_position_entry_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_entry_template;

		this._protein_sequence_formatted_display_single_position_tooltip_a_start_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_a_start_template;
		this._protein_sequence_formatted_display_single_position_tooltip_b_end_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_b_end_template;
		this._protein_sequence_formatted_display_single_position_tooltip_c_before_variable_mod_masses_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_c_before_variable_mod_masses_template;
		this._protein_sequence_formatted_display_single_position_tooltip_d_before_static_mod_masses_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_d_before_static_mod_masses_template;
		this._protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template;
		this._protein_sequence_formatted_display_single_position_tooltip_mass_entry_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_mass_entry_template;


		this._selectedProteinSequencePositions = new Set();

		this._sequencePositions_Applied_Labels_CssClassNames = [];  // Use sequence position (1 based) as index into this array

		this._sequencePositions_Secondary_Applied_Labels_CssClassNames = [];  // Use sequence position (1 based) as index into this array
	}

	/**
	 * @param encodedStateData - data returned by method 'getEncodedStateData' for storage on URL
	 */
	set_encodedStateData({ encodedStateData }) {

		this._updateWithEncodedStateData({ encodedStateData });
	}

	/**
	 * @param initial_selectedProteinSequencePositions - Set of selected positions to use for initial population
	 * 		initial_selectedProteinSequencePositions will override values in encodedStateData
	 */
	set_initial_selectedProteinSequencePositions({ initial_selectedProteinSequencePositions }) {
		
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_selectedProteinSequencePositions(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this.set_selectedProteinSequencePositions({ selectedProteinSequencePositions : initial_selectedProteinSequencePositions });
	}
	
	/**
	 * @param initial_variableModificationMassesForProteinPositions
	 */
	set_initial_variableModificationMassesForProteinPositions({ initial_variableModificationMassesForProteinPositions }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_variableModificationMassesForProteinPositions(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._variableModificationMassesForProteinPositions = initial_variableModificationMassesForProteinPositions; 
	}
	
	/**
	 * @param initial_staticModificationMassesForProteinPositions
	 */
	set_initial_staticModificationMassesForProteinPositions({ initial_staticModificationMassesForProteinPositions }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_staticModificationMassesForProteinPositions(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._staticModificationMassesForProteinPositions = initial_staticModificationMassesForProteinPositions; 
	}

	/**
	 * @param initial_variableModificationSelectionUnmodifiedSelected
	 */
	set_initial_variableModificationSelectionUnmodifiedSelected({ initial_variableModificationSelectionUnmodifiedSelected }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_variableModificationSelectionUnmodifiedSelected(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._variableModificationSelectionUnmodifiedSelected = initial_variableModificationSelectionUnmodifiedSelected; 
	}
	
	/**
	 * @param initial_variableModificationMassesToFilterOn
	 */
	set_initial_variableModificationMassesToFilterOn({ initial_variableModificationMassesToFilterOn }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_variableModificationMassesToFilterOn(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._variableModificationMassesToFilterOn = initial_variableModificationMassesToFilterOn; 
	}

	/**
	 * @param initial_widget_SequenceCoverageParam_All_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	set_initial_widget_SequenceCoverageParam_All_Peptides({ initial_widget_SequenceCoverageParam_All_Peptides }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_widget_SequenceCoverageParam_All_Peptides(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._widget_SequenceCoverageParam_All_Peptides = initial_widget_SequenceCoverageParam_All_Peptides; 
	}

	/**
	 * @param initial_widget_SequenceCoverageParam_Selected_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	set_initial_widget_SequenceCoverageParam_Selected_Peptides({ initial_widget_SequenceCoverageParam_Selected_Peptides }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_widget_SequenceCoverageParam_Selected_Peptides(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._widget_SequenceCoverageParam_Selected_Peptides = initial_widget_SequenceCoverageParam_Selected_Peptides; 
	}

	/**
	 * @param initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings : Array of boolean at protein positions - May be undefined
	 */
	set_initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings({ initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings }) {
	
		if ( this._initializeCalled ) {
			const msg = "Cannot call set_initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings(...) after initialize() has been called.";
			console.log( msg );
			throw Error( msg );
		}
		this._widget_proteinPositions_CoveredBy_PeptideSearchStrings = initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings; 
	}

	

	/**
	 * 
	 */
	initialize() {

		this._initializeCalled = true;
	}

	/**
	 * Clear the Selected Protein Positions
	 */
	clear_selectedProteinSequencePositions() {

		this._selectedProteinSequencePositions.clear();
		this._selectionClearAllSequencePositionsSelection_In_DOM_Remove_CSS_Class();
		
		this._updateDisplay_positionStyling();
	}

	/**
	 * 
	 */
	renderOnPage() {

		if ( ! this._initializeCalled ) {
			const msg = "renderOnPage(): initialize() not called.";
			console.log( msg );
			throw Error( msg );
		}
		this._addProteinSequenceToContentDivInitialOrForUpdate();

		this._renderOnPageCalled = true;
	}

	/**
	 * @param variableModificationMassesForProteinPositions : updated Variable Modifications per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
	 * 
	 */
	update_variableModificationMassesForProteinPositions( { variableModificationMassesForProteinPositions } ) {

		this._variableModificationMassesForProteinPositions = variableModificationMassesForProteinPositions;

		this._updateDisplay_positionStyling();
	}

	/**
	 * @param staticModificationMassesForProteinPositions : updated Static Modifications per sequence position:  
	 * 
	 *     Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
	 * 
	 */
	update_staticModificationMassesForProteinPositions( { staticModificationMassesForProteinPositions } ) {

		this._staticModificationMassesForProteinPositions = staticModificationMassesForProteinPositions;

		this._updateDisplay_positionStyling();
	}

	/**
	 * @param variableModificationSelectionUnmodifiedSelected : Updated : True if User has chosen 'unmodified' under Variable Modifications - Boolean
	 * @param variableModificationMassesToFilterOn : updated variable modifications per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
	 * @param staticModificationMassesToFilterOn : Static Modification masses that the user has selected to filter on - Set
	 * 
	 */
	update_modificationMassesToFilterOn( { variableModificationSelectionUnmodifiedSelected, variableModificationMassesToFilterOn, staticModificationMassesToFilterOn } ) {

		this._variableModificationSelectionUnmodifiedSelected = variableModificationSelectionUnmodifiedSelected;
		this._variableModificationMassesToFilterOn = variableModificationMassesToFilterOn;
		this._staticModificationMassesToFilterOn = staticModificationMassesToFilterOn;

		this._updateDisplay_positionStyling();
	}

	/**
	 * @param widget_SequenceCoverageParam_All_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	update_widget_SequenceCoverageParam_All_Peptides({ widget_SequenceCoverageParam_All_Peptides }) {
	
		this._widget_SequenceCoverageParam_All_Peptides = widget_SequenceCoverageParam_All_Peptides; 

		this._updateDisplay_positionStyling();
	}

	/**
	 * @param widget_SequenceCoverageParam_Selected_Peptides : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides }) {
	
		this._widget_SequenceCoverageParam_Selected_Peptides = widget_SequenceCoverageParam_Selected_Peptides; 

		this._updateDisplay_positionStyling();
	}

	/**
	 * @param widget_proteinPositions_CoveredBy_PeptideSearchStrings : Array of boolean at protein positions - May be undefined
	 */
	update_widget_proteinPositions_CoveredBy_PeptideSearchStrings({ widget_proteinPositions_CoveredBy_PeptideSearchStrings }) {
	
		this._widget_proteinPositions_CoveredBy_PeptideSearchStrings = widget_proteinPositions_CoveredBy_PeptideSearchStrings; 

		this._updateDisplay_positionStyling();
	}

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() {

		const result = {}
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

			const positionsAsOffsetAndAltBase = [];
			let prevPosition = undefined;
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

		return result;
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	_updateWithEncodedStateData({ encodedStateData }) {

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

		const newSet_selectedProteinSequencePositions = new Set();

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
				let position = undefined;
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


	/**
	 * 
	 */
	get_selectedProteinSequencePositions() {
		
		return this._selectedProteinSequencePositions;
	}

	/**
	 * 
	 */	
	set_selectedProteinSequencePositions( { selectedProteinSequencePositions }) {
		if ( ! ( selectedProteinSequencePositions instanceof Set ) ) {
			console.log("set_selectedProteinSequencePositions(...): Provided selectedProteinSequencePositions param must be type Set");
			throw Error("Provided selectedProteinSequencePositions param must be type Set");
		}
		this._selectedProteinSequencePositions = selectedProteinSequencePositions;
	}

	/**
	 * 
	 */
	_addProteinSequenceToContentDivInitialOrForUpdate() {
		
		if ( positionWrapPoint % positionGroupSize !== 0 ) {
			
			//  Could reduce positionWrapPoint to be a multiple of positionGroupSize instead.
			
			throw Error("positionWrapPoint must be a multiple of positionGroupSize.  positionWrapPoint: " + positionWrapPoint + 
					+ ", positionGroupSize: " + positionGroupSize );
		}
		
		// Handlebars Templates
		const protein_sequence_formatted_display_overall_block_template_Template = this._protein_sequence_formatted_display_overall_block_template_Template; 
		
		const $containerHTML_Element = $( this._containerHTML_Element );
		
		$containerHTML_Element.empty();
		
		const protein_sequence_formatted_display_overall_block_template_HTML = protein_sequence_formatted_display_overall_block_template_Template({});
		
		const $protein_sequence_formatted_display_overall_block_template_Element = $( protein_sequence_formatted_display_overall_block_template_HTML );
		
		const $selector_sequence_data = $protein_sequence_formatted_display_overall_block_template_Element.find(".selector_sequence_data");
		
		const proteinSequenceAsArray = this._proteinSequenceAsArray;
		
		const proteinSequenceLength = proteinSequenceAsArray.length;

		const proteinLength_StringLength = proteinSequenceLength.toString().length;

		////  Create and Assemble DOM Parts
		
		const sequenceGroupSeparator = '<span >&nbsp;</span>';
		
		const separatorBetweenStartLabelAndSequence = '<span >&nbsp;</span>';
		const separatorBetweenEndLabelAndSequence = separatorBetweenStartLabelAndSequence;
		
		{
			const headerLineDiv = '<div style="white-space: nowrap;"></div >';

			const seqLenForNumberOfTicks = Math.min( positionWrapPoint, proteinSequenceLength );

			const numberOfTicks = Math.ceil( seqLenForNumberOfTicks / positionGroupSize );

			{
				//  Add Header with numbers for tick marks

				const $headerLine = $( headerLineDiv );
				$headerLine.appendTo( $selector_sequence_data );

				//  Add padding for width of padded start label on left
				{
					const padding = '&nbsp;'.repeat( proteinLength_StringLength );
					const paddingHTML = '<span>' + padding + '</span>'
					$headerLine.append( paddingHTML );
				}
				
				$headerLine.append( $( separatorBetweenStartLabelAndSequence ) );

				for ( let counter = 0; counter < numberOfTicks; counter++ ) {

					const tickInt = ( counter * positionGroupSize ) + 1;
					const tickString = tickInt.toString();
					const tickStringLength = tickString.length;
					const tickStringInSpan = '<span class="header-pos-spacer-tick-number">' + tickString + '</span>';
					$headerLine.append( $( tickStringInSpan ) );
					
					//  Add padding for tickStringLength for right side of tick mark number for each digit of number, CSS class has width = right padding of sequence position
					{
						const paddingLength = tickStringLength - 1;
						const padding = '<span class="header-pos-spacer-after-tick-number">&nbsp;</span>'.repeat( paddingLength );
						$headerLine.append( padding );
					}

					//  Add padding for width of positionGroupSize - tickStringLength
					{
						const paddingLength = positionGroupSize - tickStringLength - ( tickStringLength - 1 );
						const padding = '<span class="header-pos-spacer">&nbsp;</span>'.repeat( paddingLength );
						$headerLine.append( padding );
					}

					// Sequence Group separator
					$headerLine.append( $( sequenceGroupSeparator ) );
				}
			}
			{
				//  Add Header with lines for tick marks

				const $headerLine = $( headerLineDiv );
				$headerLine.appendTo( $selector_sequence_data );

				//  Add padding for width of padded start label on left
				{
					const padding = '&nbsp;'.repeat( proteinLength_StringLength );
					const paddingHTML = '<span>' + padding + '</span>'
					$headerLine.append( paddingHTML );
				}

				$headerLine.append( $( separatorBetweenStartLabelAndSequence ) );

				for ( let counter = 0; counter < numberOfTicks; counter++ ) {

					//  Add vertical line ('|') character
					$headerLine.append( $( '<span class="header-pos-spacer">|</span>' ) );

					//  Add padding for width of positionGroupSize - 1 ( - 1 for width of line '|' character )
					{
						const paddingLength = positionGroupSize - 1;
						const padding = '<span class="header-pos-spacer">&nbsp;</span>'.repeat( paddingLength );
						$headerLine.append( padding );
					}

					// Sequence Group separator
					$headerLine.append( $( sequenceGroupSeparator ) );
				}
			}
		}

		//   Process proteinSequenceAsArray in blocks of output lines
		
		for ( let proteinSequenceIndex = 0; proteinSequenceIndex < proteinSequenceLength; proteinSequenceIndex += positionWrapPoint ) {

			const proteinSequenceForLineStartIndex = proteinSequenceIndex;
			const proteinSequenceForLineEndIndex = proteinSequenceIndex + positionWrapPoint - 1; // Last Index to display
			
			let show_lineEndPosition = false;
			if ( ( proteinSequenceIndex + positionWrapPoint )  < proteinSequenceLength ) {
				show_lineEndPosition = true;; // Only display if not after end of sequence length
			}
			
			this._addProteinSequenceLineToContainer( 
					{ 
						show_lineEndPosition,
						proteinSequenceForLineStartIndex, 
						proteinSequenceForLineEndIndex, 
						proteinSequenceAsArray : proteinSequenceAsArray,
						$selector_sequence_data, 
						positionGroupSize, 
						proteinLength_StringLength, 
						// Separators
						sequenceGroupSeparator,
						separatorBetweenStartLabelAndSequence,
						separatorBetweenEndLabelAndSequence
					} );
		}

		//  Insert into Page
		$protein_sequence_formatted_display_overall_block_template_Element.appendTo( $containerHTML_Element );

		//  Add Click Handler to whole sequence block
		this._addClickHandlerToSequenceBlock( { $protein_sequence_formatted_display_overall_block_template_Element } );
		
		//  Add qtip Tooltip to whole sequence block
		this._addTooltipToSequenceBlock( { $protein_sequence_formatted_display_overall_block_template_Element } );
	}
	
	///////////////////////////////////////////////////////////////////////////

	/**
	 * Add a single Line
	 */
	_addProteinSequenceLineToContainer( 
			{ 
				show_lineEndPosition,
				proteinSequenceForLineStartIndex, 
				proteinSequenceForLineEndIndex, 
				proteinSequenceAsArray,
				$selector_sequence_data, 
				positionGroupSize, 
				proteinLength_StringLength, 
				// Separators
				sequenceGroupSeparator,
				separatorBetweenStartLabelAndSequence,
				separatorBetweenEndLabelAndSequence
				} ) {
		

		// Handlebars Templates
		const protein_sequence_formatted_display_single_line_template_Template =  this._protein_sequence_formatted_display_single_line_template_Template;
		
		const lineHTML = protein_sequence_formatted_display_single_line_template_Template({});
		const $lineElement = $( lineHTML );
		$lineElement.appendTo( $selector_sequence_data );
		
		// Display Start Position
		const lineStartPosition = proteinSequenceForLineStartIndex + 1; // '1' based
		this._addProteinSequenceLineStartOrEndLabelToContainer( { linePosition : lineStartPosition, proteinLength_StringLength, $lineElement } );
		
		// Separator after start label
		const $separatorBetweenStartLabelAndSequence = $( separatorBetweenStartLabelAndSequence );
		$separatorBetweenStartLabelAndSequence.appendTo( $lineElement );
		
		//  Split line into groups
		
		for ( let proteinSequenceIndex = proteinSequenceForLineStartIndex; proteinSequenceIndex <= proteinSequenceForLineEndIndex; proteinSequenceIndex += positionGroupSize ) {

			if ( proteinSequenceIndex !== proteinSequenceForLineStartIndex ) {
				// Add Group Separator, before all groups except first group
				const $sequenceGroupSeparator = $( sequenceGroupSeparator );
				$sequenceGroupSeparator.appendTo( $lineElement );
			}
			
			const proteinSequenceForGroupStartIndex = proteinSequenceIndex;
			let proteinSequenceForGroupEndIndex = proteinSequenceIndex + positionGroupSize - 1; // Index of Last Position
			if ( proteinSequenceForGroupEndIndex >= proteinSequenceAsArray.length ) {
				proteinSequenceForGroupEndIndex = proteinSequenceAsArray.length - 1;
			}
			
			this._addProteinSequenceGroupToContainer( 
					{ proteinSequenceForGroupStartIndex, proteinSequenceForGroupEndIndex, proteinSequenceAsArray, $lineElement } );
		}

		// Display End Position if requested
		if ( show_lineEndPosition ) { 
			// Separator before end label
			const $separatorBetweenEndLabelAndSequence = $( separatorBetweenEndLabelAndSequence );
			$separatorBetweenEndLabelAndSequence.appendTo( $lineElement );

			const lineEndPosition = proteinSequenceForLineEndIndex + 1; // Only display if not after end of sequence length

			this._addProteinSequenceLineStartOrEndLabelToContainer( { linePosition : lineEndPosition, proteinLength_StringLength, $lineElement } );
		}
	}

	/**
	 * Add Start Or End Label (start or End Position) for a single Line
	 */
	_addProteinSequenceLineStartOrEndLabelToContainer( { linePosition, proteinLength_StringLength, $lineElement } ) {
		
		const lineStartLabelStringWithPad = 
			this._padNumberStartByRepeatingPadEntry( { number : linePosition, resultTotalStringLength : proteinLength_StringLength } );
		const lineStartLabelStringWithPadSurroundSpan = '<span>' + lineStartLabelStringWithPad + '</span>';
		const $lineStartLabelStringWithPad = $( lineStartLabelStringWithPadSurroundSpan );
		$lineStartLabelStringWithPad.appendTo( $lineElement );
	}
	
	/**
	 * Add A Sequence Group for a single Line
	 */
	_addProteinSequenceGroupToContainer( 
			{ proteinSequenceForGroupStartIndex, proteinSequenceForGroupEndIndex, proteinSequenceAsArray, $lineElement } ) {
		
		const objectThis = this;
		
		// Handlebars Templates
		const protein_sequence_formatted_display_single_position_entry_template_Template = this._protein_sequence_formatted_display_single_position_entry_template_Template; 
		
		for ( let proteinSequenceIndex = proteinSequenceForGroupStartIndex; proteinSequenceIndex <= proteinSequenceForGroupEndIndex; proteinSequenceIndex++ ) {

			const proteinSequencePosition = proteinSequenceIndex + 1; // '1' based
			const proteinSequenceAtPosition = proteinSequenceAsArray[  proteinSequenceIndex]; 
			
			const cssClassNamesArr = [ _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN ]; 

			{
				const className_ForStyling_ForProteinSequencePosition = this._get_className_ForStyling_ForProteinSequencePosition({ proteinSequencePosition });
				cssClassNamesArr.push( className_ForStyling_ForProteinSequencePosition );
				this._sequencePositions_Applied_Labels_CssClassNames[ proteinSequencePosition ] = className_ForStyling_ForProteinSequencePosition;

				//  Secondary highlighting of user enters peptide search string
				if ( this._widget_proteinPositions_CoveredBy_PeptideSearchStrings && 
					this._widget_proteinPositions_CoveredBy_PeptideSearchStrings[ proteinSequencePosition ] &&
					className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD &&
					className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER &&
					className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER &&
					className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER &&
					className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD 
					 ) {
					this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ] = _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING;
					cssClassNamesArr.push( _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING );
				}
			}

			if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.has( proteinSequencePosition ) ) {
				cssClassNamesArr.push( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
			}

			//  this._widget_SequenceCoverageParam is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId

			const cssClassNames = cssClassNamesArr.join( "  " );  //  create string of CSS class names in array

			const context = { position : proteinSequencePosition, sequenceLetter : proteinSequenceAtPosition, cssClassNames };

			const positionHTML = protein_sequence_formatted_display_single_position_entry_template_Template( context );
			const $positionElement = $( positionHTML );
			$positionElement.appendTo( $lineElement );
			
			$positionElement.data( _HTML_ELEMENT_DATA_KEY__SEQUENCE_POSITION, proteinSequencePosition );  //  Attach JS value to HTML DOM Object
		}
	}


	/**
	 * Pad the number start by repeating &nbsp;
	 */
	_padNumberStartByRepeatingPadEntry( { number, resultTotalStringLength } ) {

		const numberString = number.toString();
		const numberStringLength = numberString.length;
		
		const numberPadEntries = resultTotalStringLength - numberStringLength;
		
		//  Create padding for 
		const resultNumberStringParts = [];
		
		for ( let counter = 0; counter < numberPadEntries; counter++ ) {
			resultNumberStringParts.push( '&nbsp;' );
		}
		resultNumberStringParts.push( numberString );
		
		const resultNumberString = resultNumberStringParts.join("");
		
		return resultNumberString;
	}

	/**
	 * Get the CSS Class Name for Styling for this Protein Sequence Position
	 */
	_get_className_ForStyling_ForProteinSequencePosition({ proteinSequencePosition }) {


		if ( ! this._widget_SequenceCoverageParam_All_Peptides.isProteinCoverageAtPosition( { position : proteinSequencePosition } ) ) {

			//  position has no sequence coverage, by default, then has no mods

			return _CSS_CLASS_NAME__SEQUENCE_POSITION_UNCOVERED; // EARLY RETURN   // uncovered residue:
		}

		if ( ! this._widget_SequenceCoverageParam_Selected_Peptides ) {

			//  no user selection

			if ( this._proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ proteinSequencePosition }) ) {

				return _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD; // EARLY RETURN // modded residue, no filters (mod or position)
			}

			return _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_NO_MOD; // EARLY RETURN  // not modded residue, no filters (mod or position)
		}

		//  Have User Selection

		if ( this._widget_SequenceCoverageParam_Selected_Peptides.isProteinCoverageAtPosition( { position : proteinSequencePosition } ) ) {

			//  Position is inside selected peptides coverage

			if ( this._proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses_No_Selected_ModificationMasses({ proteinSequencePosition }) ) {

				return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER; // EARLY RETURN // covered residue,  covered by filtered peptide list, mod, no mod filter
			}

			if ( this._proteinSequencePosition_Contains_Selected_ModificationMasses({ proteinSequencePosition }) ) {

				return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER; // EARLY RETURN   // modded residue in filtered peptide list, has a mod == a mod filter
			}

			if ( this._proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ proteinSequencePosition }) ) {

				return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER; // EARLY RETURN  // modded residue in filtered peptide list, does not have a mod in mod filter 
			}

			return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_NO_MOD; // EARLY RETURN    // modded residue in filtered peptide list
		}

		//  Position is outside selected peptides coverage

		if ( this._proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ proteinSequencePosition }) ) {

			return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD; // EARLY RETURN   // covered residue. not in filtered peptide list or no filters selected
		}

		return _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_NO_MOD;  // covered residue, covered by filtered peptide list
	}

	/**
	 * Does this Protein Sequence Position contain any Variable modification masses AND there are NO SELECTED modification masses
	 */
	_proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses_No_Selected_ModificationMasses({ proteinSequencePosition }) {

		if ( this._variableModificationSelectionUnmodifiedSelected || this._variableModificationMassesToFilterOn || this._staticModificationMassesToFilterOn ) {
			//  YES selections
			return false;  // EARLY RETURN
		}

		return this._proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ proteinSequencePosition });
	}

	/**
	 * Does this Protein Sequence Position contain any SELECTED Variable or Static Modification masses
	 */
	_proteinSequencePosition_Contains_Selected_ModificationMasses({ proteinSequencePosition }) {

		if ( ( ! this._variableModificationMassesToFilterOn ) && ( ! this._staticModificationMassesToFilterOn ) ) {
			//  No SELECTED Variable or Static Modification masses
			return false;  // EARLY RETURN
		}

		if ( this._variableModificationMassesForProteinPositions ) {
			const variableModificationMassesAtPosition = this._variableModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

			if ( variableModificationMassesAtPosition && variableModificationMassesAtPosition.length !== 0 &&
				this._variableModificationMassesToFilterOn ) { 
				//  Variable Modification Masses found at position

				for ( const variableModificationMassAtPosition of variableModificationMassesAtPosition ) {
					for ( const variableModificationMassToFilterOn of this._variableModificationMassesToFilterOn ) {

						if ( variableModificationMassAtPosition === variableModificationMassToFilterOn ) {
							//  Found Variable Modification mass at position that are filtering on
							return true; // EARLY RETURN
						}
					}
				}
			}
		}

		//     this._staticModificationMassesForProteinPositions :
		//  Map<integer, Object> < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
		if ( this._staticModificationMassesForProteinPositions ) {
			const staticModificationDataAtPosition = this._staticModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

			if ( staticModificationDataAtPosition && this._staticModificationMassesToFilterOn ) { 

				//  Static Modification Masses found at position AND this._staticModificationMassesToFilterOn is populated

				const staticModificationAtPosition_Residue = staticModificationDataAtPosition.residue;
				const staticModificationAtPosition_Masses = staticModificationDataAtPosition.massesArray;

				for ( const staticModificationAtPosition_Mass of staticModificationAtPosition_Masses ) {

					const staticModificationMassesToFilterOn_Masses_ForResidue = this._staticModificationMassesToFilterOn.get( staticModificationAtPosition_Residue );
					if ( staticModificationMassesToFilterOn_Masses_ForResidue ) {
						for ( const staticModificationToFilterOn_Mass of staticModificationMassesToFilterOn_Masses_ForResidue ) {

							if ( staticModificationAtPosition_Mass === staticModificationToFilterOn_Mass ) {
								//  Found Static Modification mass at position that are filtering on
								return true; // EARLY RETURN
							}
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * Does this Protein Sequence Position contain any Variable Modification masses
	 */
	_proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ proteinSequencePosition }) {

		if ( this._variableModificationMassesForProteinPositions ) {
			const variableModificationMassesAtPosition = this._variableModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

			if ( variableModificationMassesAtPosition && variableModificationMassesAtPosition.length !== 0 ) { 
				//  Variable Modification Masses found at position
				return true; // EARLY RETURN
			}
		}

		//     this._staticModificationMassesForProteinPositions :
		//  Map<integer, Object> < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
		if ( this._staticModificationMassesForProteinPositions ) {
			const staticModificationDataAtPosition = this._staticModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

			if ( staticModificationDataAtPosition && this._staticModificationMassesToFilterOn ) { 

				//  Static Modification Masses found at position AND this._staticModificationMassesToFilterOn is populated

				const staticModificationAtPosition_Residue = staticModificationDataAtPosition.residue;
				const staticModificationAtPosition_Masses = staticModificationDataAtPosition.massesArray;

				for ( const staticModificationAtPosition_Mass of staticModificationAtPosition_Masses ) {

					const staticModificationMassesToFilterOn_Masses_ForResidue = this._staticModificationMassesToFilterOn.get( staticModificationAtPosition_Residue );
					if ( staticModificationMassesToFilterOn_Masses_ForResidue ) {
						for ( const staticModificationToFilterOn_Mass of staticModificationMassesToFilterOn_Masses_ForResidue ) {

							if ( staticModificationAtPosition_Mass === staticModificationToFilterOn_Mass ) {
								//  Found Static Modification mass at position that are filtering on
								return true; // EARLY RETURN
							}
						}
					}
				}
			}
		}

		return false;
	}

	
	////////////////////////////////////////////////////////

	/**
	 * Add Click Handler to whole sequence block, including the numbers and spaces surrounding the sequence
	 */
	_addClickHandlerToSequenceBlock( { $protein_sequence_formatted_display_overall_block_template_Element } ) {

		const objectThis = this;
		
		$protein_sequence_formatted_display_overall_block_template_Element.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._proteinSequenceClickHandler( { clickThis : this, eventObject } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});			

	}

	/**
	 * 
	 */
	_proteinSequenceClickHandler( { clickThis, eventObject } ) {
		
		const objectThis = this;
		
		// const $clickThis = $( clickThis ); not used
		
		const ctrlKey_or_metaKey_Down = eventObject.ctrlKey || eventObject.metaKey;

		const $target = $( eventObject.target )
		const proteinSequencePosition = $target.data( _HTML_ELEMENT_DATA_KEY__SEQUENCE_POSITION );

		if ( proteinSequencePosition === undefined || proteinSequencePosition === null ) {

			// position is undefined for non-sequence letter elements so just exit.
			return;
		}

		let newSelection = false;
		 
		if ( ctrlKey_or_metaKey_Down ) {
			//  ctrl-key or meta-key(Mac) Click
			
			if ( this._selectedProteinSequencePositions.has( proteinSequencePosition ) ) {
				this._selectedProteinSequencePositions.delete( proteinSequencePosition );
				
				$target.removeClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
			} else {
				this._selectedProteinSequencePositions.add( proteinSequencePosition );
				
				$target.addClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
			}
		} else {
			//  Click Without ctrl-key or meta-key(Mac) 

			newSelection = true; // Start New Selection

			if ( this._selectedProteinSequencePositions.size === 1 ) {
				//  Only 1 currently selected
				if ( this._selectedProteinSequencePositions.has( proteinSequencePosition ) ) {
					// Click selected so remove it
					this._selectedProteinSequencePositions.delete( proteinSequencePosition );
					
					$target.removeClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
				} else {
					// Not Click selected so clear all and add it
					this._selectedProteinSequencePositions.clear();
					this._selectionClearAllSequencePositionsSelection_In_DOM_Remove_CSS_Class();
					
					this._selectedProteinSequencePositions.add( proteinSequencePosition );
					$target.addClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
				}
			} else {
				this._selectedProteinSequencePositions.clear();
				this._selectionClearAllSequencePositionsSelection_In_DOM_Remove_CSS_Class();
				
				this._selectedProteinSequencePositions.add( proteinSequencePosition );
				$target.addClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
			}
		}
		
		//   Not needed since add/remove selected class
		// this._addProteinSequenceToContentDivInitialOrForUpdate();
		
		if ( this._callbackMethodForSelectedChange ) {
			this._callbackMethodForSelectedChange({ newSelection });
		}

	}
	

	/**
	 * Add qtip Tooltip to whole sequence block, including the numbers and spaces surrounding the sequence
	 */
	_selectionClearAllSequencePositionsSelection_In_DOM_Remove_CSS_Class() {

		const $containerHTML_Element = $( this._containerHTML_Element );
		const $selector_seq_at_posAll = $containerHTML_Element.find(".selector_seq_at_pos");
		if ( $selector_seq_at_posAll.length === 0 ) {
			throw Error( "Fail to find element with class 'selector_seq_at_pos'" );
		}

		$selector_seq_at_posAll.removeClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
	}
	
	///////////////////////////////////
	
	/**
	 * Add qtip Tooltip to whole sequence block, including the numbers and spaces surrounding the sequence
	 */
	_addTooltipToSequenceBlock( { $protein_sequence_formatted_display_overall_block_template_Element } ) {

		const objectThis = this;
		
		//  qtip tooltip on whole block

		const protein_sequence_formatted_display_overall_block_template_Element = $protein_sequence_formatted_display_overall_block_template_Element[ 0 ];

		$protein_sequence_formatted_display_overall_block_template_Element.qtip({

			content: {
				text: "&nbsp;" // Replaced as mouse over each sequence letter
			},
			position: {
				effect:false,
				target: 'mouse'
					,
					adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
			},
			show: {
				delay: 1,
			},
			hide: {
				delay:0,
				effect:false,
			}
		});

		// Grab the first element in the tooltips array and access its qTip API
		var qtipAPI = $protein_sequence_formatted_display_overall_block_template_Element.qtip('api');
		var lastDataPosObj = { lastDataPos : 0 };

		var updateTooltipOnMouseMove = function( eventObject, qtipAPI, lastDataPosObj ) {

			const $target = $( eventObject.target )
			const dataPos = $target.data( _HTML_ELEMENT_DATA_KEY__SEQUENCE_POSITION );

			if( dataPos === lastDataPosObj.lastDataPos ) {
				
				// position (or undefined for non-sequence letter elements) 
				// is same as prev call to mouse move so no changes required so just exit.
				return;
			}

			lastDataPosObj.lastDataPos = dataPos;

			if ( dataPos !== undefined && dataPos !== null ) {
				
				// Mouse is over a sequence letter.

				const proteinSequencePosition = dataPos;
				
				const tooltipContext = {
						position : proteinSequencePosition
				};

				const tooltipContentsHTML_Start = objectThis._protein_sequence_formatted_display_single_position_tooltip_a_start_template_Template( tooltipContext );
				
				const tooltipContentsHTML_Parts = [ tooltipContentsHTML_Start ];

				if ( objectThis._variableModificationMassesForProteinPositions ) {  //  Variable Modification Masses for display
					const variableModificationMasses = objectThis._variableModificationMassesForProteinPositions.get( proteinSequencePosition );

					if ( variableModificationMasses && variableModificationMasses.length !== 0 ) {
						
						{
							const html_blockStart = objectThis._protein_sequence_formatted_display_single_position_tooltip_c_before_variable_mod_masses_template_Template();
							tooltipContentsHTML_Parts.push( html_blockStart );
						}
						const variableModificationMassesLength = variableModificationMasses.length;
						for ( let index = 0; index < variableModificationMassesLength; index++  ) {
							const variableModificationMass = variableModificationMasses[ index ];
							if ( index > 0 ) {
								tooltipContentsHTML_Parts.push( ", " );
							}
							const massEntryContext = { modMass : variableModificationMass };

							if ( objectThis._variableModificationMassesToFilterOn && objectThis._variableModificationMassesToFilterOn.has( variableModificationMass ) ) {
								massEntryContext.highlightMass = true;
							}
							const tooltipContentsHTML_MassEntry = objectThis._protein_sequence_formatted_display_single_position_tooltip_mass_entry_template_Template( massEntryContext );
							tooltipContentsHTML_Parts.push( tooltipContentsHTML_MassEntry );
						}
						{
							const html_blockEnd = objectThis._protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template_Template();
							tooltipContentsHTML_Parts.push( html_blockEnd );
						}
					}
				}

				if ( objectThis._staticModificationMassesForProteinPositions ) {  //  Static Modification Masses for display.  Only Add Static Mods that User has Selected
					const staticModificationMassesDataObject = objectThis._staticModificationMassesForProteinPositions.get( proteinSequencePosition );

					if ( staticModificationMassesDataObject ) {
						const staticModificationResidue = staticModificationMassesDataObject.residue;
						const staticModificationMasses = staticModificationMassesDataObject.massesArray;
						if ( staticModificationMasses.length !== 0 ) {

							let addedStaticModStartBlock = false;
							let firstStaticModToAdd = true;

							const staticModificationMassesLength = staticModificationMasses.length;
							for ( let index = 0; index < staticModificationMassesLength; index++  ) {
								const staticModificationMass = staticModificationMasses[ index ];

								if ( objectThis._staticModificationMassesToFilterOn ) {
									const staticModificationMassesToFilterOn_Set_ForResidue = objectThis._staticModificationMassesToFilterOn.get( staticModificationResidue );
									if ( staticModificationMassesToFilterOn_Set_ForResidue ) {
										if ( staticModificationMassesToFilterOn_Set_ForResidue.has( staticModificationMass ) ) {

											if ( ! addedStaticModStartBlock ) {
												//  Start block not added yet so add now
												addedStaticModStartBlock = true;
												const html_blockStart = objectThis._protein_sequence_formatted_display_single_position_tooltip_d_before_static_mod_masses_template_Template();
												tooltipContentsHTML_Parts.push( html_blockStart );
											}
											if ( firstStaticModToAdd ) {
												firstStaticModToAdd = false;
											} else {
												//  Not first mod mass so add separator
												tooltipContentsHTML_Parts.push( ", " );
											}
											//  Add Entry
											const massEntryContext = { modMass : staticModificationMass, highlightMass : true }; // highlightMass always true since user selected
											const tooltipContentsHTML_MassEntry = objectThis._protein_sequence_formatted_display_single_position_tooltip_mass_entry_template_Template( massEntryContext );
											tooltipContentsHTML_Parts.push( tooltipContentsHTML_MassEntry );
										}
									}
								}
							}
							if ( addedStaticModStartBlock ) {
								//  Added start block so add end block
								const html_blockEnd = objectThis._protein_sequence_formatted_display_single_position_tooltip_e_after_mod_masses_template_Template();
								tooltipContentsHTML_Parts.push( html_blockEnd );
							}
						}
					}
				}
				{
					const tooltipContentsHTML_End = objectThis._protein_sequence_formatted_display_single_position_tooltip_b_end_template_Template( tooltipContext );
					tooltipContentsHTML_Parts.push( tooltipContentsHTML_End );
				}
				const tooltipContentsHTML = tooltipContentsHTML_Parts.join("");

				//  Update tool tip contents
				qtipAPI.set('content.text', tooltipContentsHTML );

				qtipAPI.disable( false );	// enable qtip - pass false to enable
				qtipAPI.toggle( true );	    // ensure qtip visible

			} else {

				// Mouse is Not over a sequence letter.  Hide tooltip and clear tooltip contents.
				
				//  Update tool tip contents
				qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

				qtipAPI.toggle( false );  // ensure qtip not shown
				qtipAPI.disable( true );  // disable - must pass true to disable it
			}
		}

		//  Add a mouse move to the protein bar overlay rectangle to update the contents of the qtip tool tip 
		$protein_sequence_formatted_display_overall_block_template_Element.mousemove( function( eventObject ) {
			updateTooltipOnMouseMove( eventObject, qtipAPI, lastDataPosObj );
		} );

	}
	
	///////////////////////////////////
	
	/**
	 * update CSS class for styling
	 */
	_updateDisplay_positionStyling() {

		const $containerHTML_Element = $( this._containerHTML_Element );

		const $selector_sequence_data = $containerHTML_Element.find(".selector_sequence_data");
		if ( $selector_sequence_data.length === 0 ) {
			throw Error("_updateDisplay_modPositionHightlight: Failed to find DOM element with class 'selector_sequence_data'");
		}

		const proteinSequenceLenth = this._proteinSequenceString.length;

		for ( let proteinSequencePosition = 1; proteinSequencePosition <= proteinSequenceLenth; proteinSequencePosition++ ) {

			//  Get new Position Styling CSS Classname

			const old_className_ForStyling_ForProteinSequencePosition = this._sequencePositions_Applied_Labels_CssClassNames[ proteinSequencePosition ];

			const new_className_ForStyling_ForProteinSequencePosition = this._get_className_ForStyling_ForProteinSequencePosition({ proteinSequencePosition });

			let $target = undefined;

			if ( old_className_ForStyling_ForProteinSequencePosition !== new_className_ForStyling_ForProteinSequencePosition ) {
				//  Yes change so update
				
				//  update saved CSS Class name
				this._sequencePositions_Applied_Labels_CssClassNames[ proteinSequencePosition ] = new_className_ForStyling_ForProteinSequencePosition;

				//  Remove old class name from DOM element and Add new class name to DOM element

				$target = this._getProteinSequence_SingleResidue_single_DOM_element({ proteinSequencePosition,  $selector_sequence_data });
				$target.removeClass( old_className_ForStyling_ForProteinSequencePosition );
				$target.addClass( new_className_ForStyling_ForProteinSequencePosition );
			}

			//  Secondary CSS class to highlight User entered Peptide Sequence Search String.
			//    (Only applied if position does not have a background color)

			if ( this._widget_proteinPositions_CoveredBy_PeptideSearchStrings && 
				this._widget_proteinPositions_CoveredBy_PeptideSearchStrings.length !== 0 &&
				new_className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD &&
				new_className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER &&
				new_className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER &&
				new_className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER &&
				new_className_ForStyling_ForProteinSequencePosition !== _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD 
				 ) {

				if ( this._widget_proteinPositions_CoveredBy_PeptideSearchStrings[ proteinSequencePosition ] ) {
					if ( this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ] === _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING ) {
						//  No change
					} else {
						if ( ! $target ) {
							$target = this._getProteinSequence_SingleResidue_single_DOM_element({ proteinSequencePosition,  $selector_sequence_data });
						}
						$target.addClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING );
						this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ] = _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING;
					}
				} else {
					if ( this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ] === _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING ) {
						if ( ! $target ) {
							$target = this._getProteinSequence_SingleResidue_single_DOM_element({ proteinSequencePosition,  $selector_sequence_data });
						}
						$target.removeClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING );
						delete this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ]
					}
				}

			} else {
				// Now no entry so remove if found
	
				if ( this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ] === _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING ) {
					if ( ! $target ) {
						$target = this._getProteinSequence_SingleResidue_single_DOM_element({ proteinSequencePosition,  $selector_sequence_data });
					}
					$target.removeClass( _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING );
					delete this._sequencePositions_Secondary_Applied_Labels_CssClassNames[ proteinSequencePosition ]
				}
			}
		}

	}

	/**
	 * Get Protein sequence Single Residue single DOM element (as jQuery object)
	 * 
	 * Called from _updateDisplay_modPositionHightlight()
	 */
	_getProteinSequence_SingleResidue_single_DOM_element({ proteinSequencePosition,  $selector_sequence_data }) {

		const proteinSequencePositionSelector = "." + _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTOR_AT_POSITION_PREFIX + proteinSequencePosition; 

		const $proteinSequence_SingleResidue_single_DOM_element = $selector_sequence_data.find( proteinSequencePositionSelector );
		if ( $proteinSequence_SingleResidue_single_DOM_element.length === 0 ) {
			throw Error("_getProteinSequence_SingleResidue_single_DOM_element: Failed to find DOM element with selector " + proteinSequencePositionSelector );
		}

		return $proteinSequence_SingleResidue_single_DOM_element;
	}
}
