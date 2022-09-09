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
	DataTable_DataGroupRowEntry,
	DataTable_DataRowEntry,
	DataTable_RootTableDataObject,
	DataTable_RootTableObject,
	DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {create_dataTable_Root_React} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM";
import {
	LorikeetSpectrumViewer_Data_ForLorikeet_Data_Root
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_Data_ForLorikeet_Data";
import {LorikeetSpectrumViewer_DataFromServer_Root_Data} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_Root_Data";
import {
	LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data,
	LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry,
	LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data";
import {LorikeetSpectrumViewer_Constants} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_Constants";
import {lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_createDataFor_PsmPeptideTable";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

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

	private _projectSearchId: number

	private _psmId_Displayed: number
	private _openModPosition_Displayed: string | number

	private _dataPageStateManager_DataFrom_Server: DataPageStateManager

	private _dataTable_RootTableDataObject_PutOnDOM : DataTable_RootTableDataObject

	private _loadedDataFromServer: LorikeetSpectrumViewer_DataFromServer_Root_Data  //  Set in method 'addLorikeetToPage'

	private _storedPsmPeptideData_Map_Key_PsmId: Map<number, LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry> = undefined;

	private _lorikeet_ScanData_RetentionTime_PrecursorMZ: any = undefined;

	/**
	 * 
	 */
	constructor(
		{
			projectSearchId, psmId, openmodPosition, dataPageStateManager_DataFrom_Server
		}:{
			projectSearchId: number
			psmId: number
			openmodPosition: number | string
			dataPageStateManager_DataFrom_Server: DataPageStateManager
		}) {

		this._projectSearchId = projectSearchId;
		this._psmId_Displayed = psmId;

		this._openModPosition_Displayed = openmodPosition;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		console.log( "LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded: constructor called")
		
		if ( ! itemsAddedTo_jQuery ) {
			
			// @ts-ignore
			let jquery = window.jQuery;
			
			addFlotToJquery( jquery );
			addFlotSelectionToJquery( jquery );
			addLorikeetToJquery( jquery );
			
			itemsAddedTo_jQuery = true;
		}
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
	addLorikeetToPage(
		{
			loadedDataFromServer, dataTable_RootTableDataObject
		} : {
			loadedDataFromServer:  LorikeetSpectrumViewer_DataFromServer_Root_Data
			dataTable_RootTableDataObject : DataTable_RootTableDataObject
		} ) {
		try {
			if ( ! loadedDataFromServer ) {
				throw Error("( ! loadedDataFromServer )")
			}

			if ( ! dataTable_RootTableDataObject ) {
				throw Error("( ! dataTable_RootTableDataObject )")
			}

			this._loadedDataFromServer = loadedDataFromServer;

			this._lorikeet_ScanData_RetentionTime_PrecursorMZ = loadedDataFromServer.primaryLorikeetData.lorikeet_ScanData_RetentionTime_PrecursorMZ;

			this._savePsmPeptideDataToLocalVariableForLookup( { loadedDataFromServer } );

			this._addPsmPeptideListToPage( { dataTable_RootTableDataObject, loadedDataFromServer } );

			this._insert_LorikeetSpectrumViewer();


		} catch( e ) {
			
			const msg = "Failed to add Lorikeet Spectrum viewer to page.";
			console.warn( msg + "  Error: ", e )
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			alert( msg );
			throw e;
		}
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
		this._dataTable_RootTableDataObject_PutOnDOM = dataTable_RootTableDataObject

		const dataTable_TableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

		const dataTable_RootTableObject = new DataTable_RootTableObject({ tableDataObject : dataTable_RootTableDataObject, dataTableId : "PSM List Under Lorikeet Spectrum Viewer", tableOptions : dataTable_TableOptions })

		create_dataTable_Root_React({ tableObject : dataTable_RootTableObject, containerDOMElement, renderCompleteCallbackFcn : undefined })
	}

	/**
	 * Create Data Table and insert on page
	 */
	handlePsmLinkClick( { psmIdOfClicked, openModPosition_OfClicked } : { psmIdOfClicked : number, openModPosition_OfClicked: number | string } ) : void {

		if (this._psmId_Displayed === psmIdOfClicked && this._openModPosition_Displayed === openModPosition_OfClicked ) {

			//  This is the currently displayed PSM Id and Open Mod Position so just exit.  Open Mod Position can be LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED aka null
			return; // EARLY RETURN
		}

		this._psmId_Displayed = psmIdOfClicked; //  Save to instance variable

		this._openModPosition_Displayed = openModPosition_OfClicked; //  Save to instance variable

		this._insert_LorikeetSpectrumViewer();

	}

	/**
	 *
	 */
	private _insert_LorikeetSpectrumViewer() {

		//  Update URL in browser
		const lorikeetSpectrumViewer_newWindowURL = lorikeetSpectrumViewer_CreateURL({ projectSearchId : this._projectSearchId, psmId : this._psmId_Displayed, openModPosition: this._openModPosition_Displayed });
		window.history.replaceState( null, null, lorikeetSpectrumViewer_newWindowURL );


		{  // Update table for new/current selection
			const dataTable_RootTableDataObject =
				lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData( {
					psmId_Selection : this._psmId_Displayed,
					openModPosition_Selection: this._openModPosition_Displayed,
					projectSearchId: this._projectSearchId,
					loadedDataFromServer: this._loadedDataFromServer,
					dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
					lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded: this
				} );

			this._insertPsmTableOnPage({dataTable_RootTableDataObject})
		}

		//  create new lorikeetOptions to create new Lorikeet

		const primaryLorikeetData_Data_FromServer = this._loadedDataFromServer.primaryLorikeetData.data;

		//  Add these items to the lorikeetOptions variable from PSM List record

		const storedPsmPeptideDataForPsmId = this._storedPsmPeptideData_Map_Key_PsmId.get( this._psmId_Displayed );
		if ( ! storedPsmPeptideDataForPsmId ) {
			throw Error("No data for psmId: " + this._psmId_Displayed );
		}

		let variableMods = storedPsmPeptideDataForPsmId.variableMods
		let ntermMod = storedPsmPeptideDataForPsmId.ntermMod
		let ctermMod = storedPsmPeptideDataForPsmId.ctermMod


		if ( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) {

			const openModificationMassAndPositionsList = storedPsmPeptideDataForPsmId.openModificationMassAndPositionsList;
			if ( ( ! openModificationMassAndPositionsList ) || openModificationMassAndPositionsList.length < 1 ) {

				window.alert("URL has open mod position but there is no open mod for psm");

				const msg = "( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) AND ( ( ! openModificationMassAndPositionsList ) || openModificationMassAndPositionsList.length < 1 )";
				console.warn(msg);
				throw Error(msg);
			}

			const openModificationMassAndPositions_FirstEntry = openModificationMassAndPositionsList[0];

			const positionEntries_Optional = openModificationMassAndPositions_FirstEntry.positionEntries_Optional
			if ( ( ! openModificationMassAndPositionsList ) || openModificationMassAndPositionsList.length < 1 ) {

				window.alert("URL has open mod position but there are no positions for open mod for psm");

				const msg = "( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) AND ( ( ! openModificationMassAndPositionsList ) || openModificationMassAndPositionsList.length < 1 )";
				console.warn(msg);
				throw Error(msg);
			}

			if ( this._openModPosition_Displayed === LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__N ) {

				let positionEntry : LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data = null;
				if ( positionEntries_Optional ) {
					for ( const positionEntry_InList of positionEntries_Optional ) {
						if ( positionEntry_InList.is_N_Terminal ) {
							positionEntry = positionEntry_InList;
						}
					}
				}
				if ( ! positionEntry ) {

					window.alert("URL has open mod position but there is NO data for position 'n' for open mod for psm");

					const msg = "( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) AND NO entry for ( positionEntry_InList.is_N_Terminal ) ";
					console.warn(msg);
					throw Error(msg);
				}

				ntermMod = _add_2_modMasses_And_Round( storedPsmPeptideDataForPsmId.ntermMod, openModificationMassAndPositions_FirstEntry.openModMass );

			} else if ( this._openModPosition_Displayed === LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__C ) {

				let positionEntry : LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data = null;
				if ( positionEntries_Optional ) {
					for ( const positionEntry_InList of positionEntries_Optional ) {
						if ( positionEntry_InList.is_C_Terminal ) {
							positionEntry = positionEntry_InList;
						}
					}
				}
				if ( ! positionEntry ) {

					window.alert("URL has open mod position but there is NO data for position 'c' for open mod for psm");

					const msg = "( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) AND NO entry for ( positionEntry_InList.is_C_Terminal ) ";
					console.warn(msg);
					throw Error(msg);
				}

				ctermMod = _add_2_modMasses_And_Round( storedPsmPeptideDataForPsmId.ctermMod, openModificationMassAndPositions_FirstEntry.openModMass );

			} else {

				//  A numeric position was selected

				let positionEntry : LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data = null;
				if ( positionEntries_Optional ) {
					for ( const positionEntry_InList of positionEntries_Optional ) {
						if ( positionEntry_InList.position === this._openModPosition_Displayed ) {
							positionEntry = positionEntry_InList;
						}
					}
				}
				if ( ! positionEntry ) {

					window.alert("URL has open mod position but there is NO data for position " + this._openModPosition_Displayed + " for open mod for psm");

					const msg = "( this._openModPosition_Displayed !== undefined && this._openModPosition_Displayed !== null ) AND NO entry for position " + this._openModPosition_Displayed;
					console.warn(msg);
					throw Error(msg);
				}

				//  Create new Variable Mods array with open mod mass added into it.

				const variableMods_New: LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data[] = [];

				let openModPosition_FoundIn_VariableMods = false;

				for ( const variableMod of variableMods ) {

					if ( variableMod.index === this._openModPosition_Displayed ) {

						//  Create new entry with open mod mass added to variable mod mass

						const summed_ModMass = _add_2_modMasses_And_Round( variableMod.modMass, openModificationMassAndPositions_FirstEntry.openModMass );

						const new_VariableModEntry: LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data = {
							index: variableMod.index,
							aminoAcid: variableMod.aminoAcid,
							modMass: summed_ModMass
						}

						variableMods_New.push( new_VariableModEntry );

						openModPosition_FoundIn_VariableMods = true;

					} else {

						variableMods_New.push( variableMod );
					}
				}

				if ( ! openModPosition_FoundIn_VariableMods ) {

					//  Add new entry for open mod mass

					const sequence_ArrayIndex_FromPosition = positionEntry.position - 1;

					const aminoAcid = storedPsmPeptideDataForPsmId.peptideSequence[ sequence_ArrayIndex_FromPosition ];

					const new_VariableModEntry: LorikeetSpectrumViewer_DataFromServer_VariableModificationDataItem_Data = {
						index: positionEntry.position,
						aminoAcid,
						modMass: openModificationMassAndPositions_FirstEntry.openModMass
					}

					variableMods_New.push( new_VariableModEntry );

					//  Sort new entry into position

					variableMods_New.sort( (a,b) => {
						if ( a.index < b.index ) {
							return -1;
						}
						if ( a.index > b.index ) {
							return 1;
						}
						return 0;
					})

				}

				variableMods = variableMods_New;
			}
		}


		const new_lorikeetOptions : LorikeetSpectrumViewer_Data_ForLorikeet_Data_Root = {

			precursorMz: undefined,  // Set Next

			charge: storedPsmPeptideDataForPsmId.charge,
			sequence: storedPsmPeptideDataForPsmId.peptideSequence,
			variableMods,
			ntermMod,
			ctermMod,
			userReporterIons: storedPsmPeptideDataForPsmId.reporterIonMassList,

			//  From Spectrum Webservice

			fileName: primaryLorikeetData_Data_FromServer.fileName,
			scanNum: primaryLorikeetData_Data_FromServer.scanNum,
			peaks: primaryLorikeetData_Data_FromServer.peaks,
			ms1peaks: primaryLorikeetData_Data_FromServer.ms1peaks,
			staticMods: primaryLorikeetData_Data_FromServer.staticMods,

			height : LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_HEIGHT_PARAM,
			width :  LORIKEET_VIEWER_SIZE_PARAM_FOR_NEW_WINDOW_WIDTH_PARAM,

			//  Override default value for massError
			massError : LORIKEET_OPTIONS__MASS_ERROR, // mass tolerance (in th) for labeling peaks

			peakDetect : false,

			//  Need to at least set ms1scanLabel to something to get the "MS1 Scan:" to show up on the MS1 scan
//		    ms1scanLabel = "ms1scanLabel";  //  TODO  set this to something else
			ms1scanLabel : " "  //  TODO  set this to something else

		}


		if ( storedPsmPeptideDataForPsmId.psm_precursor_MZ !== undefined && storedPsmPeptideDataForPsmId.psm_precursor_MZ !== null ) {

			new_lorikeetOptions.precursorMz = storedPsmPeptideDataForPsmId.psm_precursor_MZ;
		} else {
			new_lorikeetOptions.precursorMz = this._lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ;
		}

		this._addLorikeetToPageInternal( { lorikeetOptions : new_lorikeetOptions } );
	}

	/**
	 *
	 */
	_addLorikeetToPageInternal( { lorikeetOptions }: { lorikeetOptions: LorikeetSpectrumViewer_Data_ForLorikeet_Data_Root } ) {

		const lorikeet_holderElement = document.getElementById( 'lorikeet_holder' );

		if ( ! lorikeet_holderElement ) {
			const msg = "No DOM element with id 'lorikeet_holder'";
			console.warn(msg);
			throw Error(msg);
		}

		const $lorikeet_holderElement = $( lorikeet_holderElement );

		$lorikeet_holderElement.empty();

		const $newDivInHolder = $( '<div id="lorikeet_inner_holder"></div>' ).appendTo( $lorikeet_holderElement );

		//  calling 'specview' inserts the Lorikeet instance into the page

		// @ts-ignore
		$newDivInHolder.specview( lorikeetOptions );

	}


	/**
	 * Save PSM Peptide Data in Map for retrieval for display in Lorikeet
	 */
	_savePsmPeptideDataToLocalVariableForLookup(
		{
			loadedDataFromServer
		}:{
			loadedDataFromServer:  LorikeetSpectrumViewer_DataFromServer_Root_Data
		} ) : void {

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
	}
}


/**
 *
 * @param modMass_1
 * @param modMass_2
 * @private
 */
const _add_2_modMasses_And_Round = function ( modMass_1: number, modMass_2: number ) : number {


	let modMass_1_ModMass_DigitsAfterDecimalPoint : number = undefined;
	let modMass_2_ModMass_DigitsAfterDecimalPoint : number = undefined;

	{
		const modMass_AsString = modMass_1.toString();
		const decimalPointIndex = modMass_AsString.indexOf(".");
		modMass_1_ModMass_DigitsAfterDecimalPoint = modMass_AsString.length - decimalPointIndex - 1;  // - 1 to remove decimal point position
	}
	{
		const modMass_AsString = modMass_2.toString();
		const decimalPointIndex = modMass_AsString.indexOf(".");
		modMass_2_ModMass_DigitsAfterDecimalPoint = modMass_AsString.length - decimalPointIndex - 1;  // - 1 to remove decimal point position
	}

	const larger_DigitsAfterDecimalPoint = Math.max( modMass_1_ModMass_DigitsAfterDecimalPoint, modMass_2_ModMass_DigitsAfterDecimalPoint);

	const multiplier = Math.pow( 10, larger_DigitsAfterDecimalPoint );

	const summed_ModMass_InitialSum = modMass_1 + modMass_2;

	const summed_ModMass_Multiplied = summed_ModMass_InitialSum * multiplier;
	const summed_ModMass_Multiplied_Rounded = Math.round( summed_ModMass_Multiplied );

	const summed_ModMass_FinalSum = summed_ModMass_Multiplied_Rounded / multiplier;

	return summed_ModMass_FinalSum;
}