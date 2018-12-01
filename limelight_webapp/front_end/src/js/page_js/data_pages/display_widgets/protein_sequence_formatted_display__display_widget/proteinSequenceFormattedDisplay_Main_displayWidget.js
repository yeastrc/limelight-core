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



const _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN = "pos";

const _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED = "pos-sel";

const _CSS_CLASS_NAME__SEQUENCE_POSITION_HAS_SEQUENCE_COVERAGE = "pos-has-seq-cov";

const _CSS_CLASS_NAME__SEQUENCE_POSITION_HAS_MODIFICATIONS = "pos-has-mods";

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
	 * proteinSequenceString
	 * widget_SequenceCoverageParam : class ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 * modsForProtein : mods per sequence position { <position 1 based> : [ <mass> ] }
	 * containerHTML_Element : HTML Element in DOM to insert the Protein Sequence In
	 */
	constructor( { 
		proteinSequenceString, 
		widget_SequenceCoverageParam,
		modsForProtein, 
		containerHTML_Element, 
		callbackMethodForSelectedChange }) {
		//  Hold onto these since need when user initiates interaction with the protein sequence widget
		
		this._proteinSequenceString = proteinSequenceString;
		this._proteinSequenceAsArray = proteinSequenceString.split("");
		
		this._widget_SequenceCoverageParam = widget_SequenceCoverageParam; 
		this._modsForProtein = modsForProtein;
		
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
		if ( ! _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_template ) {
			throw Error("Nothing in _protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_template");
		}
		
		this._protein_sequence_formatted_display_overall_block_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_overall_block_template;

		this._protein_sequence_formatted_display_single_line_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_line_template;
		
		this._protein_sequence_formatted_display_single_position_entry_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_entry_template;

		this._protein_sequence_formatted_display_single_position_tooltip_template_Template = 
			_protein_sequence_formatted_display_template_bundle.protein_sequence_formatted_display_single_position_tooltip_template;

		this._selectedProteinSequencePositions = new Set();
	}
	

	/**
	 * encodedStateData - data returned by method 'getEncodedStateData' for storage on URL
	 * 
	 * initial_selectedProteinSequencePositions - Set of selected positions to use for initial population
	 * 		initial_selectedProteinSequencePositions will override values in encodedStateData
	 */
	initialize( { encodedStateData, initial_selectedProteinSequencePositions } ) {

		if ( encodedStateData ) {
			this._updateWithEncodedStateData({ encodedStateData });
		}

		if ( initial_selectedProteinSequencePositions ) {
			this.set_selectedProteinSequencePositions( { selectedProteinSequencePositions : initial_selectedProteinSequencePositions });
		} else if ( ! encodedStateData ) {
			this._selectedProteinSequencePositions.clear(); // Reset to None
		}

		this._addProteinSequenceToContentDivInitialOrForUpdate();
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

			const positionsAsArray = Array.from(this._selectedProteinSequencePositions);

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
			const msg = "_updateWithEncodedStateData(...): No value in encodedStateData";
			console.log( msg );
			throw Error( msg );
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

		/////////////
		
		//  widget_SequenceCoverageParam is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const widget_SequenceCoverageParam = this._widget_SequenceCoverageParam;
		
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
						widget_SequenceCoverageParam,
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
				widget_SequenceCoverageParam,
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
					{ proteinSequenceForGroupStartIndex, proteinSequenceForGroupEndIndex, proteinSequenceAsArray, 
						widget_SequenceCoverageParam, $lineElement } );
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
			{ proteinSequenceForGroupStartIndex, proteinSequenceForGroupEndIndex, proteinSequenceAsArray,
				widget_SequenceCoverageParam, $lineElement } ) {
		
		const objectThis = this;
		
		// Handlebars Templates
		const protein_sequence_formatted_display_single_position_entry_template_Template = this._protein_sequence_formatted_display_single_position_entry_template_Template; 
		
		for ( let proteinSequenceIndex = proteinSequenceForGroupStartIndex; proteinSequenceIndex <= proteinSequenceForGroupEndIndex; proteinSequenceIndex++ ) {

			const proteinSequencePosition = proteinSequenceIndex + 1; // '1' based
			const proteinSequenceAtPosition = proteinSequenceAsArray[  proteinSequenceIndex]; 
			
			let cssClassNamesArr = [ _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN ]; 
			
			//  Fastest way to determine is Protein Coverage At Position 
			const isProteinCoverageAtPosition = widget_SequenceCoverageParam.isProteinCoverageAtPosition( { position : proteinSequencePosition } );
			if ( isProteinCoverageAtPosition ) {
				cssClassNamesArr.push( _CSS_CLASS_NAME__SEQUENCE_POSITION_HAS_SEQUENCE_COVERAGE );
			}
			
			if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.has( proteinSequencePosition ) ) {
				cssClassNamesArr.push( _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED );
			}
			
			//  modification masses for display
			const modMasses = this._modsForProtein[ proteinSequencePosition ];
			if ( modMasses ) {
				cssClassNamesArr.push( _CSS_CLASS_NAME__SEQUENCE_POSITION_HAS_MODIFICATIONS );
			}
			
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
				
				if ( proteinSequencePosition === 5 ) {
					var z = 0;
				}

				//  modification masses for display
				const modMasses = objectThis._modsForProtein[ proteinSequencePosition ];

				const tooltipContext = {
						position : proteinSequencePosition
				};
				if ( modMasses ) {
					tooltipContext.modMasses = modMasses;
				}

				const tooltipContentsHTML = objectThis._protein_sequence_formatted_display_single_position_tooltip_template_Template( tooltipContext );

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
	
	
}
