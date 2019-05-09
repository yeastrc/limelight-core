/**
 * proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js
 * 
 * Javascript for proteinView.jsp page - Display Mods and Selections of Mods for a protein or selections in a protein sequence. 
 * 
 * Companion file to proteinViewPage_DisplayData_SingleProtein_SingleSearch.js and proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 */

let Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

let _protein_table_template_bundle = require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

import { _SORT_TYPE_NUMBER, _SORT_TYPE_STRING } from 'page_js/data_pages/data_pages_common/a_annotationTypesConstants.js';


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

// VERSION 1 ENCODING STRING:  

//  Selected Variable Modification Masses are separated into Integer and non-Integer values
//    The Integer values are sorted ascending first and encoded in the following string
// '<first mod mass, base 35 encoded number>Z<Offset from first mod mass, base 35 encoded number>Z<Offset from second mod mass, base 35 encoded number>'
//  The non-Integer mod masses are sorted and stored in an Array

//  Selected Static Modification Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'd';

const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE = 35;         // Only specific Variable Modifications
const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR = 'Z';   // Only specific Variable Modifications

///////

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect {

	/**
	 * 
	 */
	constructor({ 
        modificationMassTransformer,  //  Used in multiple searches to round the modification mass
        rootDisplayJquerySelector, 
        projectSearchIds, 
        proteinSequenceVersionId, 
        loadedDataCommonHolder, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
        callbackMethodForSelectedChange } ) {

        this._initializeCalled = false;

        this._modificationMassTransformer = modificationMassTransformer;
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

		if (!_protein_table_template_bundle.protein_mods_static_selection_entry) {
			throw Error("Nothing in _protein_table_template_bundle.protein_mods_static_selection_entry");
		}
        this._protein_mods_static_selection_entry_Template = _protein_table_template_bundle.protein_mods_static_selection_entry;
        
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

        //  Set of Selected Variable Modification Masses
        this._variableModificationsSelected = new Set();  // call .clear() to reset the selected

        //  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
        this._staticModificationsSelected = new Map();  // call .clear() to reset the selected

        this._proteinNameDescription = undefined; //  Provided in initialize(...)
    }

	/**
	 * @param initial_variableModificationsSelected - Not currently used
	 * @param initial_staticModificationsSelected - Not currently used
	 */
	initialize({ proteinNameDescription, encodedStateData, initial_variableModificationsSelected, initial_staticModificationsSelected }) {

        this._proteinNameDescription = proteinNameDescription;

		if ( encodedStateData ) {
			this._updateWithEncodedStateData({ encodedStateData });
        }
        
		if ( initial_variableModificationsSelected ) {
            if ( ! ( initial_variableModificationsSelected instanceof Set ) ) {
                console.log("initialize(...): Provided initial_variableModificationsSelected param must be type Set");
                throw Error("Provided initial_variableModificationsSelected param must be type Set");
            }
            this._variableModificationsSelected = initial_variableModificationsSelected;
            this._initialVariableModificationsSelectedCleanup();
		} else if ( ! encodedStateData ) {
			this._variableModificationsSelected.clear(); // Reset to None
        }
        
		if ( initial_staticModificationsSelected ) {
            if ( ! ( initial_staticModificationsSelected instanceof Map ) ) {
                console.log("initialize(...): Provided initial_staticModificationsSelected param must be type Map");
                throw Error("Provided initial_staticModificationsSelected param must be type Map");
            }
            this._staticModificationsSelected = initial_staticModificationsSelected;
            this._initialVariableModificationsSelectedCleanup();
		} else if ( ! encodedStateData ) {
			this._staticModificationsSelected.clear(); // Reset to None
        }

        this._initializeCalled = true;
    }

	/**
	 * 
     * 
     * 
	 */
    clear_selectedModifications() {

        this._variableModificationsSelected.clear(); // Reset to None
        this._staticModificationsSelected.clear(); // Reset to None

        this._modListDisplay_Internal();
    }

	/**
	 * Clean up this._variableModificationsSelected due to not allowing unmodified to be selected when anything else is selected.
     * 
     * If any mass selected, the unmodified will be removed.
	 */
	_initialVariableModificationsSelectedCleanup() {

        if ( this._variableModificationsSelected.size > 1 ) {
            //  If the set contains _UNMODIFIED_SELECTED and anything else, remove _UNMODIFIED_SELECTED
            this._variableModificationsSelected.delete( _UNMODIFIED_SELECTED );
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

        //  This has to deal with the value for _UNMODIFIED_SELECTED (which is currently "U") in the array this._variableModificationsSelected
        //        (which ends up in the array modificationsNonInteger)
        //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this._variableModificationsSelected && this._variableModificationsSelected.size !== 0) {

            //  Split selected modifications into Integer and non-integer
            const modificationsInteger = [];
            const modificationsNonInteger = [];

			for ( const modificationSelected of this._variableModificationsSelected ) {
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

                    result[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ] = modificationsDelimited;
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

                    result[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] = modificationsNonInteger;
                }
            }
		}

        // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
		if ( this._staticModificationsSelected && this._staticModificationsSelected.size !== 0 ) {

            //  Convert to Javascript Object and Arrays for JSON encoding

            const staticModificationsSelectedForEncoding = {};

            for ( const mapEntry of this._staticModificationsSelected.entries() ) {

                const mapKey = mapEntry[ 0 ];
                const mapValue = mapEntry[ 1 ];

                const staticModificationsSelectedArray = Array.from( mapValue );
                staticModificationsSelectedArray.sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });

                staticModificationsSelectedForEncoding[ mapKey ] = staticModificationsSelectedArray;
            }

            result[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] = staticModificationsSelectedForEncoding;

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
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];

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
            
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( modificationsNonInteger && modificationsNonInteger.length !== 0 ) {

                for ( const modificationNonInteger of modificationsNonInteger ) {
                    newSet_selectedModificationMasses.add( modificationNonInteger );
                }
            }
        }

        this._variableModificationsSelected = newSet_selectedModificationMasses;


        { //  Static Mods

            // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>

            const staticModificationsSelectedEncoded = encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( staticModificationsSelectedEncoded ) { // local_staticModificationsSelected is Object of Arrays if populated

                const local_staticModificationsSelected = new Map();

                const objectKeys = Object.keys( staticModificationsSelectedEncoded );
                for ( const objectKey of objectKeys ) {
                    const staticModificationsSelectedMassesArray = staticModificationsSelectedEncoded[ objectKey ];
                    const staticModificationsSelectedMassesSet = new Set( staticModificationsSelectedMassesArray );
                    local_staticModificationsSelected.set( objectKey, staticModificationsSelectedMassesSet );
                }
                this._staticModificationsSelected = local_staticModificationsSelected;
            }
        }
        
        this._initialVariableModificationsSelectedCleanup();
	}

    //////////////////////////////////

	/**
	 * 
	 */
    isAnyVariableModificationSelected() {
        return this._variableModificationsSelected.size !== 0;
    }

	/**
	 * Did the user select to show reported peptides with no modification masses
	 */
    isNoVariableModificationSelected() {
        return this._variableModificationsSelected.has( _UNMODIFIED_SELECTED );
    }

	/**
	 * 
	 */
    isVariableModificationSelected( modMass ) {
        return this._variableModificationsSelected.has( modMass );
    }

	/**
	 * @returns a Set of the currently selected Variable Modifications, excluding the "No Modification" selection option
	 */
    getVariableModificationsSelected_ExcludingNoModificationOption() {
        const selectionCopy = new Set( this._variableModificationsSelected );
        selectionCopy.delete( _UNMODIFIED_SELECTED );
        
        return selectionCopy;
    }

	/**
	 * @returns true if any Static Modifications currently selected
	 */
    isAnyStaticModificationSelected() {
        return this._staticModificationsSelected.size !== 0;
    }

	/**
	 * @returns a Map of the currently selected Static Modifications: 
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
	 */
    getStaticModificationsSelected() {
        return this._staticModificationsSelected;
    }

    /////////////////

	/**
	 * Display mods for whole protein or for selected protein positions
	 */
	modListDisplay() {

        this._modListDisplay_Internal();
    }

	/**
     * Internal function
	 * Display mods for whole protein or for selected protein positions
	 */
	_modListDisplay_Internal() {

        const staticModificationsUniqueResidueLettersMassesMapSet = this._create_staticModificationsUniqueResidueLettersMassesMapSet();

        let showNoStaticModificationsMsg = false;

        if ( staticModificationsUniqueResidueLettersMassesMapSet.size === 0 ) {

            showNoStaticModificationsMsg = true;
        }

        const variableModificationsUniqueMassesSet = this._create_variableModificationsUniqueMassesSet();

        let showVariableModificationMasses = true;
        let showSelectedOnlyVariableModifications = false;
        let showAddVariableModificationsSelectionLink = false;
        let showChangeVariableModificationsSelectionLink = false;

        let showNoVariableModificationsMsg = false;

        if ( ( this._variableModificationsSelected.size === 0 ) && ( variableModificationsUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            showVariableModificationMasses = false;
        }
        if ( ( this._variableModificationsSelected.size !== 0 ) && ( variableModificationsUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            showSelectedOnlyVariableModifications = true;
        }
        if ( ( variableModificationsUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {
            if ( this._variableModificationsSelected.size === 0 || ( this._variableModificationsSelected.size === 1 && this._variableModificationsSelected.has( _UNMODIFIED_SELECTED ) ) ) {
                showAddVariableModificationsSelectionLink = true;
            } else {
                showChangeVariableModificationsSelectionLink = true;
            }
        }

        if ( variableModificationsUniqueMassesSet.size === 0 ) {

            showNoVariableModificationsMsg = true;
        }

        //  Display mods on page and/or 'change mods selected' link
        this._modificationListDisplayOnPage({ 
            //  Variable Mods
            variableModificationsUniqueMassesSet, 
            showVariableModificationMasses, 
            showSelectedOnlyVariableModifications, 
            showAddVariableModificationsSelectionLink, 
            showChangeVariableModificationsSelectionLink, 
            showNoVariableModificationsMsg,
            //  Static Mods
            staticModificationsUniqueResidueLettersMassesMapSet,
            showNoStaticModificationsMsg });
        
    }

	/**
	 * Display Variable Modifications for protein and Static Modifications for Search(es)
     * 
     * Display list on page
	 * 
	 */
	_modificationListDisplayOnPage({ 
        //  Variable Mods
        variableModificationsUniqueMassesSet, 
        showVariableModificationMasses, 
        showSelectedOnlyVariableModifications, 
        showAddVariableModificationsSelectionLink, 
        showChangeVariableModificationsSelectionLink, 
        showNoVariableModificationsMsg,
        //  Static Mods
        staticModificationsUniqueResidueLettersMassesMapSet,
        showNoStaticModificationsMsg } ) {

        const objectThis = this;


        const $rootDisplayElement = $( this._rootDisplayJquerySelector );
		if ( $rootDisplayElement.length === 0 ) {
			throw Error("No DOM element found with selector '" + this._rootDisplayJquerySelector + "'.");
        }
        $rootDisplayElement.empty();
        
        const blockHTML = this._protein_mods_selection_block_Template({ showNoVariableModificationsMsg, showNoStaticModificationsMsg });
        const $blockDOM = $( blockHTML );

        $blockDOM.appendTo( $rootDisplayElement );


        this._modificationListDisplayOnPage_VariableModfications({ 
            //  Variable Mods
            variableModificationsUniqueMassesSet, 
            showVariableModificationMasses, 
            showSelectedOnlyVariableModifications, 
            showAddVariableModificationsSelectionLink, 
            showChangeVariableModificationsSelectionLink, 
            showNoVariableModificationsMsg,
            $blockDOM } );

        this._modificationListDisplayOnPage_StaticModifications({ 
            //  Static Mods
            staticModificationsUniqueResidueLettersMassesMapSet,
            showNoStaticModificationsMsg,
            $blockDOM } );
        
    }

    /**
	 * Display mods for whole protein or for selected protein positions
     * 
     * Display list on page
	 * 
	 */
	_modificationListDisplayOnPage_StaticModifications({ 
        //  Static Mods
        staticModificationsUniqueResidueLettersMassesMapSet,
        showNoStaticModificationsMsg,
        $blockDOM } ) {

        const objectThis = this;

        if ( showNoStaticModificationsMsg ) {

            //  No Modifications so return here

            return; // EARLY EXIT
        }

        let residueLetterMassArrayForDisplay = undefined;

        if ( staticModificationsUniqueResidueLettersMassesMapSet ) {

            //  Convert to array of objects for display

            residueLetterMassArrayForDisplay = [];

            //  Masses as Array so can sort

            for ( const mapEntry of staticModificationsUniqueResidueLettersMassesMapSet.entries() ) {

                const residueLetter = mapEntry[ 0 ];
                const masses = mapEntry[ 1 ];
                for ( const mass of masses ) {
                    const displayEntry = { residueLetter, mass };
                    residueLetterMassArrayForDisplay.push( displayEntry );
                }
            }

            //  Sort on mass, then residue letter
            residueLetterMassArrayForDisplay.sort( function(a, b) {
                if ( a.mass < b.mass ) {
                    return -1;
                }
                if ( a.mass > b.mass ) {
                    return 1;
                }
                if ( a.residueLetter < b.residueLetter ) {
                    return -1;
                }
                if ( a.residueLetter > b.residueLetter ) {
                    return 1;
                }
                return 0;
            });

        } else {
            residueLetterMassArrayForDisplay = [];
        }

		const $selector_protein_static_modification_list = $blockDOM.find(".selector_protein_static_modification_list");
		if ( $selector_protein_static_modification_list.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_static_modification_list'");
        }

        if ( residueLetterMassArrayForDisplay ) { // residueLetterMassArrayForDisplay only populated when have mod entries

            let first = true;

            for ( const modEntry of residueLetterMassArrayForDisplay ) {

                if ( first ) {
                    first = false;
                } else {
                    // $selector_protein_static_modification_list.append('<span style="" >&nbsp;&nbsp;</span>');
                }

                const modEntryContext = { modEntry };

                // this._staticModificationsSelected:  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
                {
                    const selectedMassesForResidueLetter = this._staticModificationsSelected.get( modEntry.residueLetter );
                    if ( selectedMassesForResidueLetter && selectedMassesForResidueLetter.has( modEntry.mass ) ) {
                        modEntryContext.isSelected = true;
                    }
                }
                const modEntryHTML = this._protein_mods_static_selection_entry_Template(modEntryContext);
                const $modEntryDOM = $( modEntryHTML );
                $modEntryDOM.appendTo( $selector_protein_static_modification_list );

                const $selector_mod_entry_checkbox = $modEntryDOM.find(".selector_mod_entry_checkbox");
                if ( $selector_mod_entry_checkbox.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_mod_entry_checkbox'");
                }
                $selector_mod_entry_checkbox.change( function(eventObject) {
                    try {
                        eventObject.preventDefault();
                        const clickThis = this;
                        window.setTimeout( function() { //  Use setTimeout to run update later so checkbox shows or clears check immediately
                            try {
                                objectThis._staticModificationMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }, 10);
                        return false;
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });	
            }
        }
    }

	/**
	 * Static Modification Mass displayed on page clicked
	 */
    _staticModificationMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry }) {

        // check 'checked' property on DOM element checkbox
        // if ( clickThis.checked ) {

        const residueLetter = modEntry.residueLetter;
        const modMass = modEntry.mass;

        const $clickThis = $( clickThis );
        if ( $clickThis.prop('checked') ) {

        // this._staticModificationsSelected:  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
            let selectedMassesForResidueLetter = this._staticModificationsSelected.get( residueLetter );
            if ( ! selectedMassesForResidueLetter  ) {
                selectedMassesForResidueLetter = new Set();
                this._staticModificationsSelected.set( residueLetter, selectedMassesForResidueLetter );
            }
            selectedMassesForResidueLetter.add( modMass );

        } else {
            let selectedMassesForResidueLetter = this._staticModificationsSelected.get( residueLetter );
            if ( selectedMassesForResidueLetter  ) {
                selectedMassesForResidueLetter.delete( modMass );
                if ( selectedMassesForResidueLetter.size === 0 ) {
                    this._staticModificationsSelected.delete( residueLetter );
                }
            }
        }

        this._modSelectionsChanged();
    }


    /**
	 * Display Variable modifications for whole protein or for selected protein positions
     * 
     * Display list on page
	 * 
	 */
	_modificationListDisplayOnPage_VariableModfications({ 
        //  Variable Mods
        variableModificationsUniqueMassesSet, 
        showVariableModificationMasses, 
        showSelectedOnlyVariableModifications, 
        showAddVariableModificationsSelectionLink, 
        showChangeVariableModificationsSelectionLink, 
        showNoVariableModificationsMsg,
        $blockDOM } ) {

        const objectThis = this;
        

        if ( showNoVariableModificationsMsg ) {

            //  No Modifications so return here

            return; // EARLY EXIT
        }

        let modUniqueMassesArray = undefined;

        if ( showVariableModificationMasses ) {

            //  Masses as Array so can sort
            modUniqueMassesArray = Array.from( variableModificationsUniqueMassesSet );

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

		const $selector_protein_variable_modification_list = $blockDOM.find(".selector_protein_variable_modification_list");
		if ( $selector_protein_variable_modification_list.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_variable_modification_list'");
        }
        const $selector_protein_variable_modification_change_selection_link_container = $blockDOM.find(".selector_protein_variable_modification_change_selection_link_container");
		if ( $selector_protein_variable_modification_change_selection_link_container.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_variable_modification_change_selection_link_container'");
        }

        if ( modUniqueMassesArray ) { // modUniqueMassesArray only populated when showing mod entries

            let first = true;

            for ( const modEntry of modUniqueMassesArray ) {

                if ( showSelectedOnlyVariableModifications ) {

                    if ( ( ! this._variableModificationsSelected.has( modEntry ) ) && modEntry !== _UNMODIFIED_SELECTED ) {
                        //  Always display Unmodified checkbox

                        //  Skip to next modification
                        continue; // EARLY CONTINUE
                    }
                }

                if ( first ) {
                    first = false;
                } else {
                    // $selector_protein_variable_modification_list.append('<span style="" >&nbsp;&nbsp;</span>');
                }

                let unmodifiedEntry = false;
                if ( modEntry === _UNMODIFIED_SELECTED ) {
                    unmodifiedEntry = true;
                }

                const modEntryContext = { modMass : modEntry, unmodifiedEntry };

                if ( this._variableModificationsSelected.has( modEntry ) ) {
                    modEntryContext.isSelected = true;
                }
                const modEntryHTML = this._protein_mods_selection_entry_Template(modEntryContext);
                const $modEntryDOM = $( modEntryHTML );
                $modEntryDOM.appendTo( $selector_protein_variable_modification_list );

                const $selector_mod_entry_checkbox = $modEntryDOM.find(".selector_mod_entry_checkbox");
                if ( $selector_mod_entry_checkbox.length === 0 ) {
                    throw Error("No DOM element found with class 'selector_mod_entry_checkbox'");
                }
                $selector_mod_entry_checkbox.change( function(eventObject) {
                    try {
                        eventObject.preventDefault();
                        const clickThis = this;
                        window.setTimeout( function() { //  Use setTimeout to run update later so checkbox shows or clears check immediately
                            try {
                                objectThis._variablemodificationMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry, unmodifiedEntry });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }, 10);
                        return false;
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });	
            }
        }

        
        if ( showAddVariableModificationsSelectionLink ) {

            const addModsLinkHTML = this._protein_mods_selection_add_fake_link_Template();
            const $addModsLinkDOM = $( addModsLinkHTML );

            $addModsLinkDOM.appendTo( $selector_protein_variable_modification_list );

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
                    objectThis._showVariableModificationMassSelectionDialog();
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });	
        }

        if ( showChangeVariableModificationsSelectionLink ) {

            const changeModsLinkHTML = this._protein_mods_selection_change_fake_link_Template();
            const $changeModsLinkDOM = $( changeModsLinkHTML );

            $changeModsLinkDOM.appendTo( $selector_protein_variable_modification_change_selection_link_container );

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
                    objectThis._showVariableModificationMassSelectionDialog();
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });	
        }
    }
    
	/**
	 * Variable Modification Mass displayed on page clicked
	 */
    _variablemodificationMassOnPageCheckboxChanged({ clickThis, eventObject, modEntry, unmodifiedEntry }) {

        // check 'checked' property on DOM element checkbox
        // if ( clickThis.checked ) {

        const $clickThis = $( clickThis );
        if ( $clickThis.prop('checked') ) {

            if ( unmodifiedEntry ) {
                //  remove from Set and uncheck all not unmodified entries

                this._variableModificationsSelected.clear();
                const $selector_protein_mod_block = $clickThis.closest(".selector_protein_mod_block");
                const $selector_not_unmodified_entryAll = $selector_protein_mod_block.find(".selector_not_unmodified_entry");
                $selector_not_unmodified_entryAll.each( function( index, element ) {
                    const $selector_not_unmodified_entry = $( this );
                    const $selector_mod_entry_checkbox = $selector_not_unmodified_entry.find(".selector_mod_entry_checkbox");
                    $selector_mod_entry_checkbox.prop( 'checked', false );
                })
                
            } else {

                //  remove from Set and uncheck the unmodified entry
                this._variableModificationsSelected.delete( _UNMODIFIED_SELECTED );
                const $selector_protein_mod_block = $clickThis.closest(".selector_protein_mod_block");
                const $selector_unmodified_entry = $selector_protein_mod_block.find(".selector_unmodified_entry");
                const $selector_mod_entry_checkbox = $selector_unmodified_entry.find(".selector_mod_entry_checkbox");
                $selector_mod_entry_checkbox.prop( 'checked', false );
            }

            this._variableModificationsSelected.add( modEntry );

        } else {
            this._variableModificationsSelected.delete( modEntry );
        }

        this._modSelectionsChanged();
    }

	/**
	 * Display Dialog for "Change Mods"
	 */
    _showVariableModificationMassSelectionDialog() {

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
        
        const protein_mods_selection_dialog_root_Context = { proteinData : this._proteinNameDescription };
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

        if ( this._variableModificationsSelected.size !== 0 ) {

            const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
            $selector_data_table_row_All.each( function(index, element) {
                const $row = $( this );
                const modMassNumber = objectThis._selectionDialog_ModRow_GetModMassNumber({ $row });
                if ( objectThis._variableModificationsSelected.has( modMassNumber ) ) {
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

        const $clickThis = $( clickThis );

        //  Up DOM tree to Container
        const $selector_mods_selection_dialog_root = $clickThis.closest(".selector_mods_selection_dialog_root");
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


        if ( this._variableModificationsSelected.has( _UNMODIFIED_SELECTED ) ) {

            //  remove from Set and uncheck the unmodified entry
            this._variableModificationsSelected.delete( _UNMODIFIED_SELECTED );
            const $selector_protein_mod_block = $clickThis.closest(".selector_protein_mod_block");
            const $selector_unmodified_entry = $selector_protein_mod_block.find(".selector_unmodified_entry");
            const $selector_mod_entry_checkbox = $selector_unmodified_entry.find(".selector_mod_entry_checkbox");
            $selector_mod_entry_checkbox.prop( 'checked', false );
        }

        //  Clear main mod mass selections
        this._variableModificationsSelected.clear();

        //  Add in newly selected mod masses
        for ( const modSelected of modificationsSelectedInDialog ) {
            this._variableModificationsSelected.add( modSelected );
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
	 * Get Unique Static Mod  Map<Residue Letter, <Set<Mod Mass>> for the Searches
	 */
	_create_staticModificationsUniqueResidueLettersMassesMapSet() {

		//  Unique Static Mod Residue Letter/ masses for the Searches:  Map<Residue Letter, <Set<Mod Mass>>
        const staticModificationsUniqueResidueLettersMassesMapSet = new Map(); 

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const staticModsForSearch = loadedDataPerProjectSearchIdHolder.get_staticMods();

            if ( staticModsForSearch ) {
                for ( const staticModEntry of staticModsForSearch ) { // mass: 57.021464, residue: "C"
                    const residue = staticModEntry.residue;
                    let massesSet = staticModificationsUniqueResidueLettersMassesMapSet.get( residue );
                    if ( ! massesSet ) {
                        massesSet = new Set();
                        staticModificationsUniqueResidueLettersMassesMapSet.set( residue, massesSet );
                    }

                    let mass = staticModEntry.mass;

                    if ( this._modificationMassTransformer ) {  //  Transform Modification masses before using
        
                        //  Used in multiple searches to round the modification mass
                        mass = this._modificationMassTransformer.transformMass_ReturnNumber({ mass });
                    }

                    massesSet.add( mass );
                }
            }
        }

        return staticModificationsUniqueResidueLettersMassesMapSet;
    }

	/**
	 * Get Unique Variable Mods Set for whole protein or for selected protein positions
	 */
	_create_variableModificationsUniqueMassesSet() {

		//  Unique Variable Mod masses for the protein or selected positions
        const variableModificationsUniqueMassesSet = new Set(); 

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

                if ( modificationsOnProtein ) {
                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                        const position = modificationOnProtein.position;
                        let mass = modificationOnProtein.mass;
                        // const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        if ( this._modificationMassTransformer ) {  //  Transform Modification masses before using
        
                            //  Used in multiple searches to round the modification mass
                            mass = this._modificationMassTransformer.transformMass_ReturnNumber({ mass });
                        }

                        variableModificationsUniqueMassesSet.add( mass );
                    }
                }
            }
        }

        return variableModificationsUniqueMassesSet;
    }

	/**
	 * Create Variable Mods and PSM Counts Map for whole protein or for selected protein positions
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

            let modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
            
                if ( modificationsOnProtein ) {
                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                        const position = modificationOnProtein.position;
                        let mass = modificationOnProtein.mass;

                        if ( this._modificationMassTransformer ) {  //  Transform Modification masses before using
            
                            //  Used in multiple searches to round the modification mass
                            mass = this._modificationMassTransformer.transformMass_ReturnNumber({ mass });
                        }

                        const reportedPeptideId = modificationOnProtein.reportedPeptideId;

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
