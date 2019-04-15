/**
 * lorikeetSpectrumViewer_OwnPage_Root.js
 * 
 * Javascript for  page lorikeetSpectrumViewerView.jsp 
 * 
 * Lorikeet Spectrum Viewer on it's own page
 * 
 * page variable: lorikeetSpectrumViewer_OwnPage_Root
 * 
 */


//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";


const Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );


//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { addFlotToJquery } from 'libs/Lorikeet/jquery.flot.js';
import { addFlotSelectionToJquery } from 'libs/Lorikeet/jquery.flot.selection.js';

import { addLorikeetToJquery } from 'libs/Lorikeet/specview.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

//  Variables visible in this file/module  
let itemsAddedTo_jQuery = false;


let lorikeetOptions_LastCall = undefined;

let loadedDataFromServer_LastCall = undefined;
let psmPeptideTable_HeadersAndData_LastCall = undefined;

/**
 * 
 */
class LorikeetSpectrumViewer_OwnPage_Root {

	/**
	 * 
	 */
	constructor() {

		console.log( "LorikeetSpectrumViewer_OwnPage_Root: contructor called")
		
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

		console.log( "LorikeetSpectrumViewer_OwnPage_Root: initialize called");
		
		const objectThis = this;
		
		//  Strictly for Debugging
		
		const $add_last_passed_in = $("#add_last_passed_in");
		if ( $add_last_passed_in.length !== 0 ) {
			$add_last_passed_in.click(function(){

				objectThis.addLorikeetToPage( { lorikeetOptions : lorikeetOptions_LastCall,
					loadedDataFromServer : loadedDataFromServer_LastCall, 
					psmPeptideTable_HeadersAndData : psmPeptideTable_HeadersAndData_LastCall } );
			})
		}
		
	}
	
	/**
	 * Single parameter, JSON string
	 */
	addLorikeetToPage( params_JSON ) {

		//  Required to pass JSON only for MS Edge, when pass JS objects like Array, could not use 'for of' on them.

		// console.log("Entered addLorikeetToPage(...) params_JSON: " + params_JSON );

		
		const params = JSON.parse( params_JSON );
		
		// console.log("addLorikeetToPage(...) params: " );
		// console.log( params );

		const lorikeetOptions = params.lorikeetOptions;
		const loadedDataFromServer = params.loadedDataFromServer; 
		const psmPeptideTable_HeadersAndData = params.psmPeptideTable_HeadersAndData;
				
		try {
			lorikeetOptions_LastCall = lorikeetOptions;

			loadedDataFromServer_LastCall = loadedDataFromServer;
			psmPeptideTable_HeadersAndData_LastCall = psmPeptideTable_HeadersAndData;

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
        

        $tableContainerDiv.find( 'div.div-table-data-row' ).children('div.column-viewPsm').click( function(clickEvent) {
        	try {
	        	clickEvent.preventDefault();
	        	objectThis._handlePsmLinkClick( { $clickedElement : $(this), clickEvent } );
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
	_handlePsmLinkClick( { $clickedElement, clickEvent } ) {
	
		const psmIdOfClicked = $clickedElement.parent().data( 'id' );
		
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

///////////////

$(document).ready(function() {
	
	console.log("called $(document).ready(function() {")
	
	try {
		const lorikeetSpectrumViewer_OwnPage_Root = new LorikeetSpectrumViewer_OwnPage_Root()
		
		lorikeetSpectrumViewer_OwnPage_Root.initialize();

		window.lorikeetSpectrumViewer_OwnPage_Root = lorikeetSpectrumViewer_OwnPage_Root;
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



