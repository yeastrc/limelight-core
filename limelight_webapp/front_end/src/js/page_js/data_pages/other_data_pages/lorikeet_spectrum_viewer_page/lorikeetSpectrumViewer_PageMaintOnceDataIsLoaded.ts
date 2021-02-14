/**
 * lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.ts
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

//  module import

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

// @ts-ignore
import {addFlotToJquery} from 'libs/Lorikeet/jquery.flot';
// @ts-ignore
import {addFlotSelectionToJquery} from 'libs/Lorikeet/jquery.flot.selection';

// @ts-ignore
import {addLorikeetToJquery} from 'libs/Lorikeet/specview';


import {lorikeetSpectrumViewer_CreateURL} from 'page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_CreateURL'
import {
	DataTable_DataRow_ColumnEntry,
	DataTable_DataRowEntry,
	DataTable_RootTableDataObject,
	DataTable_RootTableObject,
	DataTable_TableOptions,
	DataTable_TableOptions_dataRowClickHandler_RequestParm
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {create_dataTable_Root_React} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM";
import {LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class";


//  Overrides for LorikeetOptions:

//  Override default value for massError - Assign to lorikeetOptions.massError
const LORIKEET_OPTIONS__MASS_ERROR = 0.01; // mass tolerance (in th) for labeling peaks


//  Size of lorikeet spectrum part of viewer
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM = 700;
const LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM = 700;


//  Variables visible in this file/module  
let itemsAddedTo_jQuery = false;


/**
 * 
 */
export class LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded {

	private _projectSearchId: any
	private _psmId_Displayed: any

	private _dataTable_RootTableDataObject_PutOnDOM : DataTable_RootTableDataObject

	private _storedPsmPeptideData_Map_Key_PsmId: any = undefined;

	private lastUsed_lorikeetOptions: any = undefined;

	private _lorikeet_ScanData_RetentionTime_PrecursorMZ: any = undefined;

	/**
	 * 
	 */
	constructor({ projectSearchId, psmId }:{ projectSearchId: any, psmId: any }) {

		this._projectSearchId = projectSearchId;
		this._psmId_Displayed = psmId;

		console.log( "LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded: contructor called")
		
		if ( ! itemsAddedTo_jQuery ) {
			
			// @ts-ignore
			let jquery = window.jQuery;
			
			addFlotToJquery( jquery );
			addFlotSelectionToJquery( jquery );
			addLorikeetToJquery( jquery );
			
			itemsAddedTo_jQuery = true;
		}

		// Stored data
		
		this._storedPsmPeptideData_Map_Key_PsmId = undefined;
		
		this.lastUsed_lorikeetOptions = undefined;
		
		this._lorikeet_ScanData_RetentionTime_PrecursorMZ = undefined;
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
	addLorikeetToPage({ loadedDataFromServer, dataTable_RootTableDataObject } : { loadedDataFromServer: any, dataTable_RootTableDataObject : DataTable_RootTableDataObject } ) {
		try {
			const lorikeetOptions = loadedDataFromServer.primaryLorikeetData.data;

			//  Add these items to the lorikeetOptions variable
			lorikeetOptions.height = LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM;
			lorikeetOptions.width =  LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM;

			this._lorikeet_ScanData_RetentionTime_PrecursorMZ = loadedDataFromServer.primaryLorikeetData.lorikeet_ScanData_RetentionTime_PrecursorMZ;

			this._addLorikeetToPageInternal( { lorikeetOptions } );
			console.log('lorikeet options:');
			console.log(lorikeetOptions);

			this._savePsmPeptideDataToLocalVariableForLookup( { loadedDataFromServer } );

			if ( dataTable_RootTableDataObject ) {
				this._addPsmPeptideListToPage( { dataTable_RootTableDataObject, loadedDataFromServer } );
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
	_addLorikeetToPageInternal( { lorikeetOptions }: { lorikeetOptions: any } ) {
		
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

		//  Override default value for massError
		lorikeetOptions.massError = LORIKEET_OPTIONS__MASS_ERROR; // mass tolerance (in th) for labeling peaks
		
		lorikeetOptions.peakDetect = false;
		
		
		//  Need to at least set lorikeetOptions.ms1scanLabel to something to get the "MS1 Scan:" to show up on the MS1 scan
//		lorikeetOptions.ms1scanLabel = "ms1scanLabel";  //  TODO  set this to something else
		lorikeetOptions.ms1scanLabel = " ";  //  TODO  set this to something else

		//  Moved to calling function in calling page:
		
		//  Add these items to the lorikeetOptions variable
//		lorikeetOptions.height = LORIKEET_VIEWER_IN_OVERLAY_HEIGHT_PARAM;
//		lorikeetOptions.width = LORIKEET_VIEWER_IN_OVERLAY_WIDTH_PARAM;

		// @ts-ignore
		$newDivInHolder.specview( lorikeetOptions );

	}

	/**
	 * Create Data Table and insert on page
	 */
	_addPsmPeptideListToPage( { dataTable_RootTableDataObject, loadedDataFromServer } : { dataTable_RootTableDataObject : DataTable_RootTableDataObject, loadedDataFromServer: any } ) {

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

		this._insertPsmTableOnPage({ dataTable_RootTableDataObject })
	}

	/**
	 * Insert Data Table on page - New or update
	 */
	private _insertPsmTableOnPage({ dataTable_RootTableDataObject } : { dataTable_RootTableDataObject : DataTable_RootTableDataObject }) : void {

		const containerDOMElement = document.getElementById("psms_peptides_for_scan_number")
		if ( ! containerDOMElement ) {
			const msg = "Failed to get DOM element with id 'psms_peptides_for_scan_number'"
			console.warn( msg )
			throw Error( msg )
		}

		const dataRowClickHandler = (param: DataTable_TableOptions_dataRowClickHandler_RequestParm) => {
			try {
				// console.warn("dataRowClickHandler in lorikeet code called. param: ", param )
				// console.warn("dataRowClickHandler in lorikeet code called. param.tableRowClickHandlerParameter: ", param.tableRowClickHandlerParameter )

				const tableRowClickHandlerParameter : LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class = param.tableRowClickHandlerParameter as LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class;

				if ( ! ( tableRowClickHandlerParameter instanceof LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class ) ) {
					const msg = "( ! ( tableRowClickHandlerParameter instanceof LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class ) ) In dataRowClickHandler in _insertPsmTableOnPage"
					console.warn( msg )
					throw Error( msg )
				}

				this._handlePsmLinkClick({ psmIdOfClicked : tableRowClickHandlerParameter.psmId })

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}

		this._dataTable_RootTableDataObject_PutOnDOM = dataTable_RootTableDataObject

		const dataTable_TableOptions = new DataTable_TableOptions({
			dataRowClickHandler
		})

		const dataTable_RootTableObject = new DataTable_RootTableObject({ tableDataObject : dataTable_RootTableDataObject, dataTableId : "PSM List", tableOptions : dataTable_TableOptions })

		create_dataTable_Root_React({ tableObject : dataTable_RootTableObject, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}

	/**
	 * Create Data Table and insert on page
	 */
	_handlePsmLinkClick( { psmIdOfClicked } : { psmIdOfClicked : number } ) : void {

		if ( this._psmId_Displayed === psmIdOfClicked ) {

			//  This is the currently displayed PSM Id so just exit
			return; // EARLY RETURN
		}

		this._psmId_Displayed = psmIdOfClicked; //  Save to instance variable

		//  Update URL in browser
		const lorikeetSpectrumViewer_newWindowURL = lorikeetSpectrumViewer_CreateURL({ projectSearchId : this._projectSearchId, psmId : this._psmId_Displayed, openModPosition:null });
		window.history.replaceState( null, null, lorikeetSpectrumViewer_newWindowURL );

		//  Update Table for new selection
		{
			const new_dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = []

			for ( const dataTable_DataRowEntry of this._dataTable_RootTableDataObject_PutOnDOM.dataTable_DataRowEntries ) {

				const tableRowClickHandlerParameter : LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class = dataTable_DataRowEntry.tableRowClickHandlerParameter as LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class;

				if ( ! ( tableRowClickHandlerParameter instanceof LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class ) ) {
					const msg = "( ! ( tableRowClickHandlerParameter instanceof LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class ) ) In dataRowClickHandler in _insertPsmTableOnPage"
					console.warn( msg )
					throw Error( msg )
				}

				let highlightRow = false
				if ( tableRowClickHandlerParameter.psmId === psmIdOfClicked ) {
					highlightRow = true
				}

				const new_dataTable_DataRowEntry = new DataTable_DataRowEntry({
					uniqueId : dataTable_DataRowEntry.uniqueId,
					sortOrder_OnEquals : dataTable_DataRowEntry.sortOrder_OnEquals,
					columnEntries : dataTable_DataRowEntry.columnEntries,
					highlightRowWithBackgroundColor: highlightRow,
					tableRowClickHandlerParameter : dataTable_DataRowEntry.tableRowClickHandlerParameter
				})

				new_dataTable_DataRowEntries.push( new_dataTable_DataRowEntry )
			}

			const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({ columns : this._dataTable_RootTableDataObject_PutOnDOM.columns, dataTable_DataRowEntries : new_dataTable_DataRowEntries })

			this._insertPsmTableOnPage({dataTable_RootTableDataObject})
		}

		//  create new lorikeetOptions to create new Lorikeet
		
		const new_lorikeetOptions = this.lastUsed_lorikeetOptions;
		
		const storedPsmPeptideDataForPsmId = this._storedPsmPeptideData_Map_Key_PsmId.get( psmIdOfClicked );
		if ( ! storedPsmPeptideDataForPsmId ) {
			throw Error("No data for psmId: " + psmIdOfClicked );
		}

		new_lorikeetOptions.charge = storedPsmPeptideDataForPsmId.charge;
		new_lorikeetOptions.sequence = storedPsmPeptideDataForPsmId.peptideSequence;
		new_lorikeetOptions.variableMods = storedPsmPeptideDataForPsmId.variableMods;
		new_lorikeetOptions.ntermMod = storedPsmPeptideDataForPsmId.ntermMod;
		new_lorikeetOptions.ctermMod = storedPsmPeptideDataForPsmId.ctermMod;
		new_lorikeetOptions.label = storedPsmPeptideDataForPsmId.label;

		new_lorikeetOptions.userReporterIons = storedPsmPeptideDataForPsmId.reporterIonMassList


		if ( storedPsmPeptideDataForPsmId.psm_precursor_MZ !== undefined && storedPsmPeptideDataForPsmId.psm_precursor_MZ !== null ) {

			new_lorikeetOptions.precursorMz = storedPsmPeptideDataForPsmId.psm_precursor_MZ;
		} else {
			new_lorikeetOptions.precursorMz = this._lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ;
		}
		
		if ( storedPsmPeptideDataForPsmId.psm_precursor_RetentionTime !== undefined && storedPsmPeptideDataForPsmId.psm_precursor_RetentionTime !== null ) {

			new_lorikeetOptions.retentionTimeSeconds = storedPsmPeptideDataForPsmId.psm_precursor_RetentionTime;
		} else {
			new_lorikeetOptions.retentionTimeSeconds = this._lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds;
		}

		this._addLorikeetToPageInternal( { lorikeetOptions : new_lorikeetOptions } );
	}

	/**
	 * Save PSM Peptide Data in Map for retrieval for display in Lorikeet
	 */
	_savePsmPeptideDataToLocalVariableForLookup( { loadedDataFromServer }:{ loadedDataFromServer: any } ) {

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

