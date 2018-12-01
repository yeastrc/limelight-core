/**
 * proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js
 * 
 * Javascript for proteinView.jsp page - Display Mods and Selections of Mods for a protein or selections in a protein sequence. 
 * 
 * Companion file to proteinViewPage_DisplayData_SingleProtein_SingleSearch.js
 */

let Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

let _protein_table_template_bundle = require("../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

import { _SORT_TYPE_NUMBER, _SORT_TYPE_STRING } from 'page_js/data_pages/data_pages_common/a_annotationTypesConstants.js';


const _UNMODIFIED_TEXT_FOR_PAGE = "unmodified";

const _UNMODIFIED_SELECTED = "U"; // A value that a mod mass can never be

const _MAX_MODS_DISPLAY_NON_SELECTED = 20;

//  Modal Dialog for selecting mod masses when count > _MAX_MODS_DISPLAY_NON_SELECTED

const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH = 800;
const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT = 700;

const _MOD_MASS_ENTRY_SELECTION_DIALOG_ALL_ROWS_CSS_CLASS = "mod-mass-dialog-row-incl-header";

const _MOD_MASS_ENTRY_SELECTION_DIALOG_CSS_CLASS = "mod-mass-dialog-entry";

const _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS = "mod-mass-dialog-selected";



////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  Selected Modification Masses are separated into Integer and non-Integer values
//    The Integer values are sorted ascending first and encoded in the following string
// '<first mod mass, base 35 encoded number>Z<Offset from first mod mass, base 35 encoded number>Z<Offset from second mod mass, base 35 encoded number>'
//  The non-Integer mod masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__MOD_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__MOD_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'c';

const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE = 35;
const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR = 'Z';

///////


/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect {

	/**
	 * 
	 */
	constructor({ rootDisplayJquerySelector, projectSearchIds, proteinSequenceVersionId, loadedDataCommonHolder, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, callbackMethodForSelectedChange } ) {

        this._rootDisplayJquerySelector = rootDisplayJquerySelector;
        this._projectSearchIds = projectSearchIds;
        this._proteinSequenceVersionId = proteinSequenceVersionId;
        this._loadedDataCommonHolder = loadedDataCommonHolder;
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this._callbackMethodForSelectedChange = callbackMethodForSelectedChange;

		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
        //  Template Bundle _protein_table_template_bundle
        
        //       Main Page

		if (!_protein_table_template_bundle.protein_mods_selection_block) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_selection_block");
		}
		this._protein_mods_selection_block_Template = _protein_table_template_bundle.protein_mods_selection_block;

		if (!_protein_table_template_bundle.protein_mods_selection_entry) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_selection_entry");
		}
        this._protein_mods_selection_entry_Template = _protein_table_template_bundle.protein_mods_selection_entry;

		if (!_protein_table_template_bundle.protein_mods_selection_add_fake_link) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_selection_add_fake_link");
		}
        this._protein_mods_selection_add_fake_link_Template = _protein_table_template_bundle.protein_mods_selection_add_fake_link;

		if (!_protein_table_template_bundle.protein_mods_selection_change_fake_link) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_selection_change_fake_link");
		}
        this._protein_mods_selection_change_fake_link_Template = _protein_table_template_bundle.protein_mods_selection_change_fake_link;

        //      Selection Dialog

		if (!_protein_table_template_bundle.protein_mods_selection_dialog_root) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_selection_dialog_root");
		}
        this._protein_mods_selection_dialog_root_Template = _protein_table_template_bundle.protein_mods_selection_dialog_root;

        ////

        //  Instance variables

        //  Set of Selected Modification Masses
        this._modificationsSelected = new Set();  // call .clear() to reset the selected

        //  From Protein Sequence Widget, selected protein sequence positions
        this._selectedProteinSequencePositions = undefined; //  Provided in initialize(...) and update_selectedProteinSequencePositions(...)

        this._proteinNameDescription = undefined; //  Provided in initialize(...)
    }

	/**
	 * @param selectedProteinSequencePositions - empty, null, or undefined if no positions selected
	 */
	initialize({ proteinNameDescription, selectedProteinSequencePositions, encodedStateData, initial_modificationsSelected }) {

        this._proteinNameDescription = proteinNameDescription;

		if ( encodedStateData ) {
			this._updateWithEncodedStateData({ encodedStateData });
        }
        
		if ( initial_modificationsSelected ) {
            if ( ! ( initial_modificationsSelected instanceof Set ) ) {
                console.log("initialize(...): Provided initial_modificationsSelected param must be type Set");
                throw Error("Provided initial_modificationsSelected param must be type Set");
            }
			this._modificationsSelected = initial_modificationsSelected;
		} else if ( ! encodedStateData ) {
			this._modificationsSelected.clear(); // Reset to None
		}


        this._selectedProteinSequencePositions = selectedProteinSequencePositions;

        if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size === 0 ) {
            this._selectedProteinSequencePositions = undefined;
        }
        
    }


    //////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() {

        //  This has to deal with the value for _UNMODIFIED_SELECTED (which is currently "U") in the array this._modificationsSelected
        //        (which ends up in the array modificationsNonInteger)
        //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this._modificationsSelected && this._modificationsSelected.size !== 0) {

            //  Split selected modifications into Integer and non-integer
            const modificationsInteger = [];
            const modificationsNonInteger = [];

			for ( const modificationSelected of this._modificationsSelected ) {
                if ( Number.isSafeInteger( modificationSelected ) ) {
                    modificationsInteger.push( modificationSelected );
                } else {
                    modificationsNonInteger.push( modificationSelected );
                }
            }

            {  //  Encode Integer values to string and store to output object

                if ( modificationsInteger && modificationsInteger.length !== 0 ) {
                
                    modificationsInteger.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    });

                    const modificationsIntegerAsOffsetAndAltBase = [];
                    let prevModification = undefined;
                    for (const modification of modificationsInteger) {

                        let modificationValueToSave = modification;
                        if (prevModification !== undefined) {
                            modificationValueToSave = modification - prevModification; // Not first so save offset
                        }
                        prevModification = modification;

                        const modificationValueToSaveAsAltBase = modificationValueToSave.toString(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE);
                        modificationsIntegerAsOffsetAndAltBase.push(modificationValueToSaveAsAltBase);
                    }

                    const modificationsDelimited = modificationsIntegerAsOffsetAndAltBase.join(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR);

                    result[ _ENCODED_DATA__MOD_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ] = modificationsDelimited;
                }
            }

            {  //  Sort and Store Non Integer values to output object
                    
                    //  This has to deal with the value for _UNMODIFIED_SELECTED (which is currently "U") in the array modificationsNonInteger
                    //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

                if ( modificationsNonInteger && modificationsNonInteger.length !== 0 ) {

                        modificationsNonInteger.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    });

                    result[ _ENCODED_DATA__MOD_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] = modificationsNonInteger;
                }
            }
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

		const newSet_selectedModificationMasses = new Set();
        
        { //  Get Integer modifications and decode
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__MOD_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];

            if ( modificationsAsOffsetAndAltBaseString ) {
                //  Have positions (first is position, rest are offsets) so convert to Number and compute positions
                const modificationsAsOffsetAndAltBaseString_Split = modificationsAsOffsetAndAltBaseString.split(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR);

                let prevModificationValue = undefined;
                for ( const modificationsAsOffsetAndAltBase of modificationsAsOffsetAndAltBaseString_Split ) {
                    //  modificationAsOffset: all but first are offset
                    const modificationAsOffset = Number.parseInt( modificationsAsOffsetAndAltBase, _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE);
                    if ( Number.isNaN(modificationAsOffset) ) {
                        const msg = "_updateWithEncodedStateData(...): modificationsOffset failed to parse: " + modificationsAsOffsetAndAltBase;
                        console.log( msg );
                        throw Error( msg );
                    }
                    let modification = undefined;
                    if ( prevModificationValue === undefined ) {
                        //  First modification so not offset
                        modification = modificationAsOffset;
                    } else {
                        modification = modificationAsOffset + prevModificationValue;
                    }
                    newSet_selectedModificationMasses.add( modification );
                    prevModificationValue = modification;
                }
            }
        }
        { //  Get Non Integer modifications and add to set
            
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__MOD_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( modificationsNonInteger && modificationsNonInteger.length !== 0 ) {

                for ( const modificationNonInteger of modificationsNonInteger ) {
                    newSet_selectedModificationMasses.add( modificationNonInteger );
                }
            }
        }

		this._modificationsSelected = newSet_selectedModificationMasses;
	}

    //////////////////////////////////

	/**
	 * 
	 */
    isAnyModificationSelected() {
        return this._modificationsSelected.size !== 0;
    }

	/**
	 * Did the user select to show reported peptides with no modification masses
	 */
    isNoModificationSelected() {
        return this._modificationsSelected.has( _UNMODIFIED_SELECTED );
    }

	/**
	 * 
	 */
    isModificationSelected( modMass ) {
        return this._modificationsSelected.has( modMass );
    }

	/**
	 * @param selectedProteinSequencePositions - empty, null, or undefined if no positions selected
     * @param newSelection - true when is start of new selection of protein positions
	 */
    update_selectedProteinSequencePositions({ selectedProteinSequencePositions, newSelection }) {
        this._selectedProteinSequencePositions = selectedProteinSequencePositions;

        if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size === 0 ) {
            this._selectedProteinSequencePositions = undefined;
        }

        if ( newSelection ) {
            this._modificationsSelected.clear();
        } else {
            this._updatedSelectedMods_For_SelectedProteinSequencePositions();
        }

        this._modListDisplay_Internal();
    }


	/**
	 * Remove selected Mods no longer in mod list given updated selectedProteinSequencePositions(
	 * 
	 */
	_updatedSelectedMods_For_SelectedProteinSequencePositions() {

        const modUniqueMassesSet = this._createModsSet();

        const modificationsSelectedCopy = Array.from( this._modificationsSelected );

        for ( const modSelectedCopy of modificationsSelectedCopy ) {
            if ( ! modUniqueMassesSet.has( modSelectedCopy ) ) {
                this._modificationsSelected.delete( modSelectedCopy );
            }
        }
    }

    /////////////////

	/**
	 * Display mods for whole protein or for selected protein positions
	 * 
	 */
	modListDisplay() {

        this._modListDisplay_Internal();
    }

	/**
     * Internal function
	 * Display mods for whole protein or for selected protein positions
	 * 
	 */
	_modListDisplay_Internal() {

        const modUniqueMassesSet = this._createModsSet();

        let showModMasses = true;
        let showSelectedOnly = false;
        let showAddModificationsSelectionLink = false;
        let showChangeModificationsSelectionLink = false;
        let showSelectedPositionsMsg = false;

        let showNoModificationsMsg = false;
        let showNoModificationsForSelectedPositionsMsg = false;

        if ( ( this._modificationsSelected.size === 0 ) && ( modUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            showModMasses = false;
        }
        if ( ( this._modificationsSelected.size !== 0 ) && ( modUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            showSelectedOnly = true;
        }
        if ( ( modUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            if ( this._modificationsSelected.size === 0 || ( this._modificationsSelected.size === 1 && this._modificationsSelected.has( _UNMODIFIED_SELECTED ) ) ) {
                showAddModificationsSelectionLink = true;
            } else {
                showChangeModificationsSelectionLink = true;
            }
        }

        if ( modUniqueMassesSet.size === 0 ) {

            if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size !== 0 ) {
                showNoModificationsForSelectedPositionsMsg = true;
            } else {
                showNoModificationsMsg = true;
            }
        }

        if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size !== 0 ) {
            showSelectedPositionsMsg = true;
        }

        //  Display mods on page and/or 'change mods selected' link
        this._modListDisplayOnPage({ modUniqueMassesSet, showModMasses, showSelectedOnly, showAddModificationsSelectionLink, showChangeModificationsSelectionLink, showSelectedPositionsMsg, showNoModificationsMsg, showNoModificationsForSelectedPositionsMsg });
        
    }

	/**
	 * Display mods for whole protein or for selected protein positions
     * 
     * Display list on page
	 * 
	 */
	_modListDisplayOnPage({ modUniqueMassesSet, showModMasses, showSelectedOnly, showAddModificationsSelectionLink, showChangeModificationsSelectionLink, showSelectedPositionsMsg, showNoModificationsMsg, showNoModificationsForSelectedPositionsMsg }) {

        const objectThis = this;

        let modUniqueMassesArray = undefined;

        if ( showModMasses ) {

            //  Masses as Array so can sort
            modUniqueMassesArray = Array.from( modUniqueMassesSet );

            //  Sort masses
            modUniqueMassesArray.sort( function(a, b) {
                if ( a < b ) {
                    return -1;
                }
                if ( a > b ) {
                    return 1;
                }
                return 0;
            });
        }

        if ( ! modUniqueMassesArray ) {
            modUniqueMassesArray = [];
        }

        modUniqueMassesArray.unshift( _UNMODIFIED_SELECTED ); //  add to start of array
            
        const $rootDisplayElement = $( this._rootDisplayJquerySelector );
		if ( $rootDisplayElement.length === 0 ) {
			throw Error("No DOM element found with selector '" + this._rootDisplayJquerySelector + "'.");
        }
        $rootDisplayElement.empty();
        
        const blockHTML = this._protein_mods_selection_block_Template({ showNoModificationsMsg, showNoModificationsForSelectedPositionsMsg, showSelectedPositionsMsg });
        const $blockDOM = $( blockHTML );

        $blockDOM.appendTo( $rootDisplayElement );

        if ( showNoModificationsMsg || showNoModificationsForSelectedPositionsMsg ) {

            //  No Modifications so return here

            return; // EARLY EXIT
        }

		const $selector_protein_mod_list = $blockDOM.find(".selector_protein_mod_list");
		if ( $selector_protein_mod_list.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_mod_list'");
        }
        const $selector_protein_mod_change_selection_link_container = $blockDOM.find(".selector_protein_mod_change_selection_link_container");
		if ( $selector_protein_mod_change_selection_link_container.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_mod_change_selection_link_container'");
        }

        let addedModMassesToPage = false;
        
        if ( modUniqueMassesArray ) { // modUniqueMassesArray only populated when showing mod entries

            let first = true;

            for ( const modEntry of modUniqueMassesArray ) {

                if ( showSelectedOnly ) {

                    if ( ( ! this._modificationsSelected.has( modEntry ) ) && modEntry !== _UNMODIFIED_SELECTED ) {
                        //  Always display Unmodified checkbox

                        //  Skip to next modification
                        continue; // EARLY CONTINUE
                    }
                }

                if ( first ) {
                    first = false;
                } else {
                    // $selector_protein_mod_list.append('<span style="" >&nbsp;&nbsp;</span>');
                }

                const modEntryContext = { modMass : modEntry };
                if ( modEntry === _UNMODIFIED_SELECTED ) {
                    modEntryContext.modMass = _UNMODIFIED_TEXT_FOR_PAGE;
                }
                if ( this._modificationsSelected.has( modEntry ) ) {
                    modEntryContext.isSelected = true;
                }
                const modEntryHTML = this._protein_mods_selection_entry_Template(modEntryContext);
                const $modEntryDOM = $( modEntryHTML );
                $modEntryDOM.appendTo( $selector_protein_mod_list );
                addedModMassesToPage = true;
                const $selector_mod_entry_checkbox = $modEntryDOM.find(".selector_mod_entry_checkbox");
                if ( $selector_mod_entry_checkbox.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_mod_entry_checkbox'");
                }
        
                $selector_mod_entry_checkbox.change( function(eventObject) {
                    try {
                        eventObject.preventDefault();
                        const clickThis = this;
                        objectThis._modMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry });
                        return false;
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });	
            }
        }

        
        if ( showAddModificationsSelectionLink ) {

            const addModsLinkHTML = this._protein_mods_selection_add_fake_link_Template();
            const $addModsLinkDOM = $( addModsLinkHTML );

            $addModsLinkDOM.appendTo( $selector_protein_mod_list );

            let $selector_add_mods_fake_link = $addModsLinkDOM;

            if ( ! $addModsLinkDOM.hasClass("selector_add_mods_fake_link") ) {
                $selector_add_mods_fake_link = $addModsLinkDOM.find(".selector_add_mods_fake_link");
                if ( $selector_add_mods_fake_link.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_add_mods_fake_link'");
                }
            }
            $selector_add_mods_fake_link.click( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    objectThis._showModMassSelectionDialog();
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });	
        }

        if ( showChangeModificationsSelectionLink ) {

            const changeModsLinkHTML = this._protein_mods_selection_change_fake_link_Template();
            const $changeModsLinkDOM = $( changeModsLinkHTML );

            $changeModsLinkDOM.appendTo( $selector_protein_mod_change_selection_link_container );

            let $selector_change_mods_fake_link = $changeModsLinkDOM;

            if ( ! $changeModsLinkDOM.hasClass("selector_change_mods_fake_link") ) {
                $selector_change_mods_fake_link = $changeModsLinkDOM.find(".selector_change_mods_fake_link");
                if ( $selector_change_mods_fake_link.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_change_mods_fake_link'");
                }
            }
            $selector_change_mods_fake_link.click( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    objectThis._showModMassSelectionDialog();
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });	
        }
    }
    
	/**
	 * Mod Mass displayed on page clicked
	 */
    _modMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry }) {

        // check 'checked' property on DOM element checkbox
        // if ( clickThis.checked ) {

        const $clickThis = $( clickThis );
        if ( $clickThis.prop('checked') ) {
            this._modificationsSelected.add( modEntry );
        } else {
            this._modificationsSelected.delete( modEntry );
        }

        this._modSelectionsChanged();
    }

	/**
	 * Display Dialog for "Change Mods"
	 */
    _showModMassSelectionDialog() {

        // Map<mass, {mass, psmCount}>
        const modUniqueMassesWithTheirPsmCountsMap = this._createModsAndPsmCountsMap();

        const modUniqueMassesWithTheirPsmCountsArray = []; // {mass, psmCount}

        for ( const entry of modUniqueMassesWithTheirPsmCountsMap.entries() ) {
            modUniqueMassesWithTheirPsmCountsArray.push( entry[ 1 ] );  // Put 'value' of Map entry into Array
        }

        //  Sort on masses
        modUniqueMassesWithTheirPsmCountsArray.sort( function(a, b) {
            if ( a.mass < b.mass ) {
                return -1;
            }
            if ( a.mass > b.mass ) {
                return 1;
            }
            return 0;
        });

        this._selectModsOverlay = this._createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray } );
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray } ) {
    	
    	const objectThis = this;

        let props = { };
        props.width = _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH.toString();
        props.height = _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT.toString();
        props.title = 'Change Modification Selection';
        props.$containerDiv = $('body' );

        let $contentDiv = undefined;

        try {
            
            $contentDiv = this._createModalOverlayContentDiv( {  } );
            props.$contentDiv = $contentDiv;
            
            props.callbackOnClickedHide = function() {
                
                objectThis._mod_mass_select__cancel_button_Click();
            }

            const $selector_mod_mass_select_table_container = $contentDiv.find(".selector_mod_mass_select_table_container");

            this._addTableToSelectionDialog({ modUniqueMassesWithTheirPsmCountsArray, $tableContainer : $selector_mod_mass_select_table_container });

            let $selector_mod_mass_select_update_button = $contentDiv.find(".selector_mod_mass_select_update_button");
            let $selector_mod_mass_select_cancel_button = $contentDiv.find(".selector_mod_mass_select_cancel_button");

            if ( $selector_mod_mass_select_update_button.length === 0 ) {
                throw Error("No element with id 'selector_mod_mass_select_update_button'");
            }
            if ( $selector_mod_mass_select_cancel_button.length === 0 ) {
                throw Error("No element with id 'selector_mod_mass_select_cancel_button'");
            }
            
            $selector_mod_mass_select_update_button.click( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    const clickThis = this;
                    objectThis._selectionDialog_UpdateSelectedMods_fromMarkedSelectedMods_Clicked({ clickThis, eventObject });
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            $selector_mod_mass_select_cancel_button.click( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    objectThis._mod_mass_select__cancel_button_Click();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            let overlay = new ModalOverlay( props );

            overlay.show();

            //  Adjust scrollable div max-height

            const $selector_mods_selection_dialog_above_mod_list_block = $contentDiv.find(".selector_mods_selection_dialog_above_mod_list_block");
            if ( $selector_mods_selection_dialog_above_mod_list_block.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_mods_selection_dialog_above_mod_list_block'")
            }
            const aboveListBlockHeight = $selector_mods_selection_dialog_above_mod_list_block.outerHeight();
            if ( aboveListBlockHeight === undefined || Number.isNaN( aboveListBlockHeight ) ) {
                throw Error("aboveListBlockHeight is undefined || isNAN");
            }

            const scrollableDivMaxHeight = _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT - 125 - aboveListBlockHeight;
            const scrollableDivMaxHeightPxString = scrollableDivMaxHeight + "px";

            const $selector_mods_selection_dialog_list_bounding_box = $contentDiv.find(".selector_mods_selection_dialog_list_bounding_box");
            if ( $selector_mods_selection_dialog_list_bounding_box.length === 0 ) {
                throw Error("Failed to find DOM element with class 'selector_mods_selection_dialog_list_bounding_box'")
            }
            $selector_mods_selection_dialog_list_bounding_box.css("max-height", scrollableDivMaxHeightPxString );

            return overlay;

        } catch( e ) {
            if ( $contentDiv ) {
                try {
                    $contentDiv.remove();
                } catch( e2 ) {
                }
            }
            throw e;
        }

    }
    
	/**
	 * 
	 */
    _createModalOverlayContentDiv( {  } ) {
        
        let selectedProteinSequencePositionsCommaDelim = undefined;

        if ( this._selectedProteinSequencePositions && this._selectedProteinSequencePositions.size !== 0 ) {
            const selectedProteinSequencePositions = Array.from( this._selectedProteinSequencePositions ); // input is set

            selectedProteinSequencePositions.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });

            selectedProteinSequencePositionsCommaDelim = selectedProteinSequencePositions.join(", ");
        }

        const protein_mods_selection_dialog_root_Context = { proteinData : this._proteinNameDescription, selectedProteinSequencePositionsCommaDelim };
    	let contentDivHTML = this._protein_mods_selection_dialog_root_Template( protein_mods_selection_dialog_root_Context );
    	let $contentDiv = $( contentDivHTML );
    	return $contentDiv;
    }
    
	/**
	 * Add Table To: Display Dialog for "Change Mods"
	 */
    _addTableToSelectionDialog({ modUniqueMassesWithTheirPsmCountsArray, $tableContainer }) {

		//  Create Data Table and insert on page

		const tableDisplayHandler = new TableDisplayHandler();

		// the columns for the data being shown on the page
		const columns = [ ];

            //  constants for property 'sort': _SORT_TYPE_NUMBER, _SORT_TYPE_STRING
            {
			const column = {
				id :           'mod_mass',
				width :        '160px',
				displayName :  'Modification Mass',
				dataProperty : 'mass', 
                sort : _SORT_TYPE_NUMBER,
                style_override : 'font-size:12px;', 
			};

			columns.push( column );
        }
		{
			const column = {
				id :           'psms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'psmCount', 
                sort : _SORT_TYPE_NUMBER,
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }
        columns[ columns.length - 1 ].lastItem = true;


		// the data we're showing on the page
		const tableObjects = modUniqueMassesWithTheirPsmCountsArray;

		// add the table to the page

		const tableObject = { };
		tableObject.columns = columns;
		tableObject.dataObjects = tableObjects;
		tableObject.expandableRows = undefined;

		const dataTableWithContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		const $tableContainerDiv = $( dataTableWithContainer_HTML );
		$tableContainer.append( $tableContainerDiv );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		// add in the hover handler for the rows
		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
        
        this._selectionDialog_AddCssClassesToRows({ $tableContainerDiv });

        this._selectionDialog_markSelectedMods_AsSelected({ $tableContainerDiv });

        this._selectionDialog_selectedMods_AddSelectClickHandler({ $tableContainerDiv });
    }

	/**
	 * 
	 */
    _selectionDialog_AddCssClassesToRows({ $tableContainerDiv }) {

        const objectThis = this;

        //  Add to all rows
        let $selector_data_table_container = $tableContainerDiv;
        if ( ! $selector_data_table_container.hasClass("selector_data_table_container") ) {
            $selector_data_table_container = $tableContainerDiv.find(".selector_data_table_container");
        }
        const $headerRow = $selector_data_table_container.children(".div-table-header-row");
        $headerRow.addClass( _MOD_MASS_ENTRY_SELECTION_DIALOG_ALL_ROWS_CSS_CLASS );

        //  Add to Data Rows
        const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
        $selector_data_table_row_All.each( function(index, element) {
            const $row = $( this );
            $row.addClass( _MOD_MASS_ENTRY_SELECTION_DIALOG_ALL_ROWS_CSS_CLASS );
            $row.addClass( _MOD_MASS_ENTRY_SELECTION_DIALOG_CSS_CLASS );
        });
    }

	/**
	 * 
	 */
    _selectionDialog_markSelectedMods_AsSelected({ $tableContainerDiv }) {

        const objectThis = this;

        if ( this._modificationsSelected.size !== 0 ) {

            const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
            $selector_data_table_row_All.each( function(index, element) {
                const $row = $( this );
                const modMassNumber = objectThis._selectionDialog_ModRow_GetModMassNumber({ $row });
                if ( objectThis._modificationsSelected.has( modMassNumber ) ) {
                    $row.addClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS );
                }
            });
        }
    }

	/**
	 * 
	 */
    _selectionDialog_selectedMods_AddSelectClickHandler({ $tableContainerDiv }) {

        const objectThis = this;

        const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
        $selector_data_table_row_All.click( function(eventObject) {
            try {
                eventObject.preventDefault();
                const clickThis = this;
                objectThis._selectionDialog_ModRow_Clicked({ clickThis, eventObject });
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });	
    }

	/**
	 * 
	 */
    _selectionDialog_ModRow_Clicked({ clickThis, eventObject }) {
        const $row = $( clickThis );
        if ( $row.hasClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS ) ) {
            $row.removeClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS );
        } else {
            $row.addClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS );
        }
    }

	/**
	 * 
	 */
    _selectionDialog_UpdateSelectedMods_fromMarkedSelectedMods_Clicked({ clickThis, eventObject }) {

        const objectThis = this;

        //  Up DOM tree to Container
        const $selector_mods_selection_dialog_root = $( clickThis ).closest(".selector_mods_selection_dialog_root");
        if ( $selector_mods_selection_dialog_root.length === 0 ) {
            throw Error("_selectionDialog_UpdateSelectedMods_fromMarkedSelectedMods_Clicked(...): Failed to find DOM element with class 'selector_mods_selection_dialog_root'");
        }
        //  Find Mass Select List
        const $selector_mod_mass_select_table_container = $selector_mods_selection_dialog_root.find(".selector_mod_mass_select_table_container");
        if ( $selector_mod_mass_select_table_container.length === 0 ) {
            throw Error("_selectionDialog_UpdateSelectedMods_fromMarkedSelectedMods_Clicked(...): Failed to find DOM element with class 'selector_mod_mass_select_table_container'");
        }

        const modificationsSelectedInDialog = new Set();

        const $selector_data_table_row_All = $selector_mod_mass_select_table_container.find(".selector_data_table_row");
        $selector_data_table_row_All.each( function(index, element) {
            const $row = $( this );
            if ( $row.hasClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS ) ) {
                const modMassNumber = objectThis._selectionDialog_ModRow_GetModMassNumber({ $row });
                modificationsSelectedInDialog.add( modMassNumber );
            }
        });

        this._hide_remove_ModalOverlay();

        //  Save off unmodified selection status
        let unmodifiedSelected = false;
        if ( this._modificationsSelected.has( _UNMODIFIED_SELECTED ) ) {
            unmodifiedSelected = true;
        }

        //  Clear main mod mass selections
        this._modificationsSelected.clear();

        //  Add back in unmodified selection status
        if ( unmodifiedSelected ) {
            this._modificationsSelected.add( _UNMODIFIED_SELECTED );
        }

        //  Add in newly selected mod masses
        for ( const modSelected of modificationsSelectedInDialog ) {
            this._modificationsSelected.add( modSelected );
        }

        this._modListDisplay_Internal(); //  Re-display updated list on main page

        this._modSelectionsChanged();  //  Trigger changed callback
    }


    ////////////

	/**
	 * 
	 */
    _selectionDialog_ModRow_GetModMassNumber({ $row }) {
        const rowIdString = $row.attr("data-id");
        if ( rowIdString === undefined || rowIdString === null || rowIdString === "" ) {
            throw Error('Mod Selection Dialog. $row.attr("data-id") returned undefined, null, or "" ');
        }
        const rowIdNumber = Number.parseFloat( rowIdString );
        if ( Number.isNaN( rowIdNumber ) ) {
            throw Error('Mod Selection Dialog. $row.attr("data-id") not parse to Float.  String: ' + rowIdString );
        }
        return rowIdNumber;
    }

    ///////////////////////////////////////////////////////////

	/**
	 * Get Unique Mods Set for whole protein or for selected protein positions
	 */
	_createModsSet() {

		//  Unique Mod masses for the protein or selected positions
        const modUniqueMassesSet = new Set(); 

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId();
            const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

            if ( modificationsOnProtein ) {
                for ( const modificationOnProtein of modificationsOnProtein) {
                    //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                    const position = modificationOnProtein.position;
                    const mass = modificationOnProtein.mass;
                    const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                    if ( this._selectedProteinSequencePositions && ( ! this._selectedProteinSequencePositions.has( position ) ) ) {
                        //  Not for selection position(s) so skip
                        continue;
                    }

                    modUniqueMassesSet.add( mass );
                }
            }
        }

        return modUniqueMassesSet;
    }

	/**
	 * Create Mods and PSM Counts Map for whole protein or for selected protein positions
     * 
     * @returns Map<mass, {id, mass, psmCount}>   id === mass
	 */
	_createModsAndPsmCountsMap() {

        //    For Overlay
		//  Unique Mod masses And their PSM Counts for the protein or selected positions 
		const modUniqueMassesWithTheirPsmCountsMap = new Map(); // <mass, {id, mass, psmCount}>  id === mass

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

            const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId();
            const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
        
            if ( modificationsOnProtein ) {
                for ( const modificationOnProtein of modificationsOnProtein) {
                    //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                    const position = modificationOnProtein.position;
                    const mass = modificationOnProtein.mass;
                    const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                    if ( this._selectedProteinSequencePositions && ( ! this._selectedProteinSequencePositions.has( position ) ) ) {
                        //  Not for selection position(s) so skip
                        continue;
                    }

                    const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                    if ( ! numPsmsForReportedPeptideId ) {
                        throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", proteinSequenceVersionId: " + proteinSequenceVersionId );
                    }

                    let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                    if ( ! modMassPsmCount ) {
                        modMassPsmCount = { 
                            uniqueId : mass, // Set for Data Table to identify the entry in the table
                            mass: mass, psmCount : 0 }; 
                        modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                    }
                    modMassPsmCount.psmCount += numPsmsForReportedPeptideId;
                    
                }
            }
        }

        return modUniqueMassesWithTheirPsmCountsMap;
    }

    ////////////////////////
    
	/**
	 * 
	 */
	_hide_remove_ModalOverlay() {
	
		this._selectModsOverlay.hide();
		
		this._selectModsOverlay.remove();
		
		this._selectModsOverlay = undefined;
	}
	
	////////////////////////
	
	/**
	 * 
	 */
	_mod_mass_select__cancel_button_Click() {
		
		this._hide_remove_ModalOverlay();
	}
	
    ///////////////////////////////////////////

	/**
	 * 
	 */
    _modSelectionsChanged() {

        if ( this._callbackMethodForSelectedChange ) {
			this._callbackMethodForSelectedChange();
		}
    }
    

}
