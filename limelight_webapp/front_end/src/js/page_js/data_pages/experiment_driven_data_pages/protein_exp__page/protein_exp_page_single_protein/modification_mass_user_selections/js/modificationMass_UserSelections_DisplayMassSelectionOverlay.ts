/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay.ts
 * 
 * Variable Modification Mass Selection - Overlay for Large number of Modification masses
 * 
 * Re-uses Selection from Project Search based code for Large number of Modification masses
 * 
 */

import { Handlebars, _common_template_bundle, _protein_table_template_bundle } from './modificationMass_UserSelections_DisplayMassSelectionOverlay_ImportHandlebarsTemplates';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler';

import { _SORT_TYPE_NUMBER, _SORT_TYPE_STRING } from 'page_js/data_pages/data_pages_common/a_annotationTypesConstants';


//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';



import { ModificationMass_UserSelections_StateObject } from './modificationMass_UserSelections_StateObject';


//  Modal Dialog for selecting mod masses when count > _MAX_MODS_DISPLAY_NON_SELECTED

const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH = 800;
const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT = 700;

const _MOD_MASS_ENTRY_SELECTION_DIALOG_ALL_ROWS_CSS_CLASS = "mod-mass-dialog-row-incl-header";

const _MOD_MASS_ENTRY_SELECTION_DIALOG_CSS_CLASS = "mod-mass-dialog-entry";

const _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS = "mod-mass-dialog-selected";



export class ModificationMass_UserSelections_DisplayMassSelectionOverlay {

    // From common template:

    private _common_template_dataTable_Template = _common_template_bundle.dataTable;
    
    //  Template Bundle _protein_table_template_bundle
    
    //      Selection Dialog

    private _protein_mods_selection_dialog_root_Template = _protein_table_template_bundle.protein_mods_selection_dialog_root;

    private _selectModsOverlay;

    private _proteinNameDescription

    private _modificationSelectionChanged_Callback : () => void;

    private _modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;

    private _proteinSequenceVersionId : number
    private _projectSearchIds : Array<number> 
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    private _modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search

	/**
	 * 
	 */
	constructor({ 
        modificationMass_UserSelections_StateObject,
        proteinNameDescription,
        proteinSequenceVersionId, 
        projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber,
        modificationSelectionChanged_Callback
    } : { 
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        proteinNameDescription,
        proteinSequenceVersionId : number, 
        projectSearchIds : Array<number>, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
        modificationSelectionChanged_Callback : () => void
    }) {
        if ( ! modificationSelectionChanged_Callback ) {
            const msg = "ModificationMass_UserSelections_DisplayMassSelectionOverlay: constructor: Invalid: modificationSelectionChanged_Callback not populated ";
            console.warn( msg );
            throw Error( msg );
        }
        this._modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject;
        this._proteinNameDescription = proteinNameDescription;
        this._modificationSelectionChanged_Callback = modificationSelectionChanged_Callback;

        this._proteinSequenceVersionId = proteinSequenceVersionId
        this._projectSearchIds = projectSearchIds
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this._modificationMass_CommonRounding_ReturnNumber = modificationMass_CommonRounding_ReturnNumber;
    
    }

	/**
	 * Display Dialog for "Change Mods"
	 */
    showVariableModificationMassSelectionDialog() {

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

        let props = { width : undefined, height : undefined, title : undefined, $containerDiv : undefined, $contentDiv : undefined, callbackOnClickedHide : undefined, hideOnBackgroundClick : undefined };
        props.width = _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH.toString();
        props.height = _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT.toString();
        props.title = 'Change Modification Selection';
        props.$containerDiv = $('body' );

        let $contentDiv = undefined;

        try {
            
            $contentDiv = this._createModalOverlayContentDiv();
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
                    const znothing = 0;
                }
            }
            throw e;
        }

    }



	/**
	 * 
	 */
    _createModalOverlayContentDiv() {
        
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

		const tableObject = { columns, dataObjects : tableObjects, expandableRows : undefined };

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

        if ( this._modificationMass_UserSelections_StateObject.is_Any_VariableModification_Selected() ) {

            const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
            $selector_data_table_row_All.each( function(index, element) {
                const $row = $( this );
                const modMassNumber = objectThis._selectionDialog_ModRow_GetModMassNumber({ $row });
                if ( objectThis._modificationMass_UserSelections_StateObject.is_VariableModification_Selected( modMassNumber ) ) {
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

        const modificationsSelectedInDialog : Set<number> = new Set();

        const $selector_data_table_row_All = $selector_mod_mass_select_table_container.find(".selector_data_table_row");
        $selector_data_table_row_All.each( function(index, element) {
            const $row = $( this );
            if ( $row.hasClass( _MOD_MASS_SELECTED_SELECTION_DIALOG_CSS_CLASS ) ) {
                const modMassNumber = objectThis._selectionDialog_ModRow_GetModMassNumber({ $row });
                modificationsSelectedInDialog.add( modMassNumber );
            }
        });

        this._hide_remove_ModalOverlay();


        //  Clear main mod mass selections
        this._modificationMass_UserSelections_StateObject.clear_selectedVariableModifications();

        //  Add in newly selected mod masses
        for ( const modSelected of modificationsSelectedInDialog ) {
            this._modificationMass_UserSelections_StateObject.add_VariableModification_Selected( modSelected );
        }

        this._modificationSelectionChanged_Callback();
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

                        if ( this._modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using
            
                            //  Used in multiple searches to round the modification mass
                            mass = this._modificationMass_CommonRounding_ReturnNumber( mass );
                        }

                        const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                        if ( ! numPsmsForReportedPeptideId ) {
                            throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", proteinSequenceVersionId: " + this._proteinSequenceVersionId );
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
	
}