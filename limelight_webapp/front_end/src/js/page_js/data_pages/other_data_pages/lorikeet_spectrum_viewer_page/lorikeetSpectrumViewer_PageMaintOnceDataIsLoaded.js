/**
 * lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.js
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 * 
 * Place the data onto the page and update the page and browser URL for user interaction
 * 
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


const Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );


//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { addFlotToJquery } from 'libs/Lorikeet/jquery.flot.js';
import { addFlotSelectionToJquery } from 'libs/Lorikeet/jquery.flot.selection.js';

import { addLorikeetToJquery } from 'libs/Lorikeet/specview.js';


import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';


import { lorikeetSpectrumViewer_CreateURL } from 'page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_CreateURL.js'



//  Size of lorikeet spectrum part of viewer
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM = 700;
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM = 700;


//  Variables visible in this file/module  
let itemsAddedTo_jQuery = false;


/**
 * 
 */
export class LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded {

	/**
	 * 
	 */
	constructor({ projectSearchId, psmId }) {

		this._projectSearchId = projectSearchId;
		this._psmId_Displayed = psmId;

		console.log( "LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded: contructor called")
		
		if ( ! itemsAddedTo_jQuery ) {
			
			let jquery = window.jQuery;
			
			addFlotToJquery( jquery );
			addFlotSelectionToJquery( jquery );
			addLorikeetToJquery( jquery );
			
			itemsAddedTo_jQuery = true;
		}

		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
		// Stored data
		
		this._storedPsmPeptideData_Map_Key_PsmId = undefined;
		
		this.lastUsed_lorikeetOptions = undefined;
		
	}

	/**
	 * 
	 */
	initialize() {

		console.log( "LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded: initialize called");
		
	}
	
	/**
	 * Single parameter, JSON string
	 */
	addLorikeetToPage({ lorikeetOptions, loadedDataFromServer, psmPeptideTable_HeadersAndData } ) {
		try {
			const lorikeetOptions = loadedDataFromServer.primaryLorikeetData.data;

			//  Add these items to the lorikeetOptions variable
			lorikeetOptions.height = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM;
			lorikeetOptions.width =  LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM;

			this._addLorikeetToPageInternal( { lorikeetOptions } );

			if ( psmPeptideTable_HeadersAndData ) {

				this._savePsmPeptideDataToLocalVariableForLookup( { loadedDataFromServer } );

				this._addPsmPeptideListToPage( { psmPeptideTable_HeadersAndData, loadedDataFromServer } );
			}

		} catch( e ) {
			
			const msg = "Failed to add Lorikeet Spectrum viewer to child window.";
			console.log( msg + "  Error msg next: " )
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			alert( msg );
			throw e;
		}
	}

	/**
	 * 
	 */
	_addLorikeetToPageInternal( { lorikeetOptions } ) {
		
		this.lastUsed_lorikeetOptions = lorikeetOptions;
		
		const lorikeet_holderElement = document.getElementById( 'lorikeet_holder' );

		const $lorikeet_holderElement = $( lorikeet_holderElement );

		if ( lorikeetOptions === undefined || lorikeetOptions === null ) {

			var msg = "Error retrieving data.  lorikeetOptions === undefined || lorikeetOptions === null";

//			handleGeneralServerError( { msg: msg  });
			
			alert( msg );
		}
		
		$lorikeet_holderElement.empty();

		const $newDivInHolder = $( '<div id="lorikeet_inner_holder"></div>' ).appendTo( $lorikeet_holderElement );
		
		//  Set Lorikeet options
		
		lorikeetOptions.peakDetect = false;
		
		
		//  Need to at least set lorikeetOptions.ms1scanLabel to something to get the "MS1 Scan:" to show up on the MS1 scan
//		lorikeetOptions.ms1scanLabel = "ms1scanLabel";  //  TODO  set this to something else
		lorikeetOptions.ms1scanLabel = " ";  //  TODO  set this to something else

		//  Moved to calling function in calling page:
		
		//  Add these items to the lorikeetOptions variable
//		lorikeetOptions.height = LORIKEET_VIEWER_IN_OVERLAY_HEIGHT_PARAM;
//		lorikeetOptions.width = LORIKEET_VIEWER_IN_OVERLAY_WIDTH_PARAM;

		$newDivInHolder.specview( lorikeetOptions );

	}

	/**
	 * Create Data Table and insert on page
	 */
	_addPsmPeptideListToPage( { psmPeptideTable_HeadersAndData, loadedDataFromServer } ) {

		const objectThis = this;
		
		const $psm_list_outer_container = $("#psm_list_outer_container");
		$psm_list_outer_container.show();
		
		////  Add scan number and filename
		
		const primaryLorikeetData = loadedDataFromServer.primaryLorikeetData;
		if ( ! primaryLorikeetData ) {
			throw Error("No loadedDataFromServer.primaryLorikeetData")
		}
		const data = primaryLorikeetData.data;
		if ( ! data ) {
			throw Error("No loadedDataFromServer.primaryLorikeetData.data")
		}
		const scanNum = data.scanNum;
		if ( ! scanNum ) {
			throw Error("No loadedDataFromServer.primaryLorikeetData.data.scanNum")
		}
		const fileName = data.fileName;
		if ( ! fileName ) {
			throw Error("No loadedDataFromServer.primaryLorikeetData.data.fileName")
		}
		
		const $scan_number = $("#scan_number");
		$scan_number.text( scanNum );
		
		const $scan_filename = $("#scan_filename");
		$scan_filename.text( fileName );
		
		////  Add main table
		
		const tableDisplayHandler = new TableDisplayHandler();

		// the columns for the data being shown on the page
		const columns = psmPeptideTable_HeadersAndData.dataTableColumns;

		// the data we're showing on the page
		const tableObjects = psmPeptideTable_HeadersAndData.dataTableDataObjectArray;
		tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

		// add the table to the page

		const tableObject = { };
		tableObject.columns = columns;
		tableObject.dataObjects = tableObjects;
		tableObject.expandableRows = false;

		const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		
		const $tableHolder = $( "#psms_peptides_for_scan_number" );
		$tableHolder.empty();
		$tableHolder.append( dataTableContainer_HTML );
		
		
		const $tableContainerDiv = $tableHolder.find(".selector_data_table_container");

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		// add in the click and over handlers for the rows
		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );

		tableDisplayHandler.addNoExpansionHandlerToRows( { $tableContainerDiv } );
		
		const initialPsmId = psmPeptideTable_HeadersAndData.initialPsmId;
		
		const $selector_table_rows_container = $tableContainerDiv.find(".selector_table_rows_container");
		
		this._markPsmRowSelected( { psmId : initialPsmId, $selector_table_rows_container } );
		
		const $selector_data_table_row_All = $tableContainerDiv.find(".selector_data_table_row");
		$selector_data_table_row_All.addClass("clickable");
        $selector_data_table_row_All.click( function(eventObject) {
            try {
                eventObject.preventDefault();
                const clickThis = this;
                objectThis._handlePsmLinkClick({ clickThis, eventObject });
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });	
	}

	/**
	 * Create Data Table and insert on page
	 */
	_handlePsmLinkClick( { clickThis, eventObject } ) {
	
		const $clickedElement = $(clickThis);

		const psmIdOfClicked = $clickedElement.data( 'id' );

		if ( ! psmIdOfClicked ) {
			throw Error("psmIdOfClicked is null or undefined");
		}

		//  TODO  - Optimize to check if psm id is one already being displayed and if yes, do nothing
		//    First implement code to update browser URL for chosen psm id

		this._psmId_Displayed = psmIdOfClicked;


		//  Update URL in browser
		const lorikeetSpectrumViewer_newWindowURL = lorikeetSpectrumViewer_CreateURL({ projectSearchId : this._projectSearchId, psmId : this._psmId_Displayed });
		window.history.replaceState( null, null, lorikeetSpectrumViewer_newWindowURL );

		const $selector_table_rows_container = $clickedElement.closest(".selector_table_rows_container");
		
		this._markPsmRowSelected( { $clickedElement, $selector_table_rows_container } );
		
		//  create new lorikeetOptions to create new Lorikeet
		
		const new_lorikeetOptions = this.lastUsed_lorikeetOptions;
		
		const storedPsmPeptideDataForPsmId = this._storedPsmPeptideData_Map_Key_PsmId.get( psmIdOfClicked );
		if ( ! storedPsmPeptideDataForPsmId ) {
			throw Error("No data for psmId: " + psmIdOfClicked );
		}
		//  storedPsmPeptideDataForPsmId
		//		charge, peptideSequence, variableMods [{aminoAcid,index,modMass}], ntermMod, ctermMod,
		//		psmId, reportedPeptideId, reportedPeptideString, scanNumber

		new_lorikeetOptions.charge = storedPsmPeptideDataForPsmId.charge;
		new_lorikeetOptions.sequence = storedPsmPeptideDataForPsmId.peptideSequence;
		new_lorikeetOptions.variableMods = storedPsmPeptideDataForPsmId.variableMods;
		new_lorikeetOptions.ntermMod = storedPsmPeptideDataForPsmId.ntermMod;
		new_lorikeetOptions.ctermMod = storedPsmPeptideDataForPsmId.ctermMod;
		new_lorikeetOptions.label = storedPsmPeptideDataForPsmId.label;
		
		this._addLorikeetToPageInternal( { lorikeetOptions : new_lorikeetOptions } );
	}

	/**
	 * Create Data Table and insert on page
	 */
	_markPsmRowSelected( { psmId, $clickedElement, $selector_table_rows_container } ) {

		const _SELECTED_PSM_ROW_MARKING_CSS_CLASSNAME = "psm-selected";

		//  Clear previous row mark as selected 
		const $selector_data_table_rowAll = $selector_table_rows_container.find(".selector_data_table_row");
		$selector_data_table_rowAll.removeClass( _SELECTED_PSM_ROW_MARKING_CSS_CLASSNAME );
		
		//  Mark new row selected
		if ( $clickedElement ) {
			//  Have clicked element so use it
			const $selector_data_table_rowClicked = $clickedElement.closest(".selector_data_table_row");
			$selector_data_table_rowClicked.addClass( _SELECTED_PSM_ROW_MARKING_CSS_CLASSNAME );
		} else {
			//  Find row with id of psmId and mark it
			$selector_data_table_rowAll.each( function( index, element ) {
				const $row = $( this );
				const psmIdOfElement = $row.data( 'id' );
				if ( psmIdOfElement === psmId ) {
					$row.addClass( _SELECTED_PSM_ROW_MARKING_CSS_CLASSNAME );
				}
			} );
		}		
	}

	/**
	 * Save PSM Peptide Data in Map for retrieval for display in Lorikeet
	 */
	_savePsmPeptideDataToLocalVariableForLookup( { loadedDataFromServer } ) {

		this._storedPsmPeptideData_Map_Key_PsmId = new Map();

		if ( ! loadedDataFromServer ) {
			return;
		}
		const psmPeptideData = loadedDataFromServer.psmPeptideData;
		if ( ! psmPeptideData ) {
			return;
		}
		const resultList = psmPeptideData.resultList;
		if ( ! resultList ) {
			return;
		}
		
		for ( const resultItem of resultList ) {
			
			this._storedPsmPeptideData_Map_Key_PsmId.set( resultItem.psmId, resultItem );
		}
		
		//	resultItem: 
		//		charge, peptideSequence, variableMods [{aminoAcid,index,modMass}]
		//		psmId, reportedPeptideId, reportedPeptideString, scanNumber
	}
}

