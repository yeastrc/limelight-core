/**
 * lorikeetSpectrumViewer_createDataFor_PsmPeptideTable.ts
 *
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 *
 * Create the data for displaying the Table of PSM/Peptide data
 *
 */

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';
import {
	DataTable_Column,
	DataTable_Column_DownloadTable, DataTable_DataGroupRowEntry,
	DataTable_DataRow_ColumnEntry, DataTable_DataRow_ColumnEntry_SearchTableData,
	DataTable_DataRowEntry, DataTable_DataRowEntry_DownloadTable, DataTable_DataRowEntry_DownloadTable_SingleColumn,
	DataTable_RootTableDataObject, DataTable_RootTableDataObject_Both_ColumnArrays
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {AnnotationTypeData_Root, AnnotationTypeItem, AnnotationTypeItems_PerProjectSearchId, DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded";
import {annotationTypes_SortOn_DisplayOrderAnnTypeName} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/annotationTypes_SortOn_DisplayOrderAnnTypeName";
import {LorikeetSpectrumViewer_DataFromServer_Root_Data} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_Root_Data";
import {
	LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data,
	LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data";
import {LorikeetSpectrumViewer_Constants} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_Constants";
import {
	modificationMass_CommonRounding_ReturnNumber,
	modificationMass_CommonRounding_ReturnString
} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {
	reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches,
	reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
	reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches";


//   !!!  Constants visible in this file/module


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 4;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;

// Internal class

class PsmPeptideEntryAfterProcessing {

	precursor_M_Over_Z_Display: string
	precursor_M_Over_Z_Sort: number
	retentionTimeMinutesDisplay: string
	retentionTimeMinutesSort: number
	reporterIonMassesDisplay: string
	reporterIonMassesSort: string
	openModificationMassesDisplay: string
	openModificationMassesSort: number
	psmObject:  LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry // Existing psmObject from server
}

/**
 * Create PSM Peptide Table Data
 *
 * Called on Initial Page load and when User clicks on a Table row to change to display data for that table row
 *
 */
export const lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData = function (
	{
		psmId_Selection, openModPosition_Selection, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server, lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
	} : {

	psmId_Selection : number
	openModPosition_Selection: number | string
	projectSearchId : number
	loadedDataFromServer: LorikeetSpectrumViewer_DataFromServer_Root_Data
	dataPageStateManager_DataFrom_Server : DataPageStateManager
	lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded : LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded

} ) : DataTable_RootTableDataObject {

	const psmPeptideData = loadedDataFromServer.psmPeptideData.resultList;

	const sorted_psmPeptideData = _sortPsmPeptideListOnSortOrder( { psmPeptideData, projectSearchId, dataPageStateManager_DataFrom_Server } );

	const { psmAnnotationTypesForPsmListEntries_DisplayOrder } =
		_getAnnotationTypeRecords_DisplayOrder({ psmList : sorted_psmPeptideData, projectSearchId, dataPageStateManager : dataPageStateManager_DataFrom_Server })

	const {
		psmPeptideEntryAfterProcessingEntries,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay,
		anyPsmsHave_openModification_Positions_MoreThanOne
	} =  _preProcessInputData({ sorted_psmPeptideData, loadedDataFromServer })

	const dataTable_RootTableDataObject_Both_ColumnArrays = _getDataTableColumns( { psmAnnotationTypesForPsmListEntries_DisplayOrder, anyPsmsHave_precursor_M_Over_Z, anyPsmsHave_retentionTime, anyPsmsHave_reporterIonMassesDisplay, anyPsmsHave_openModificationMassesDisplay } );

	// 1 of these will be populated
	let dataTable_DataGroupRowEntries : DataTable_DataGroupRowEntry[] = undefined;
	let dataTable_DataRowEntries: DataTable_DataRowEntry[] = undefined;

	if ( anyPsmsHave_openModification_Positions_MoreThanOne ) {

		dataTable_DataGroupRowEntries =
			_create_DataTable_Group_Rows({
				psmId_Selection,
				openModPosition_Selection,
				psmPeptideEntryAfterProcessingEntries,
				psmAnnotationTypesForPsmListEntries_DisplayOrder,
				anyPsmsHave_precursor_M_Over_Z,
				anyPsmsHave_retentionTime,
				anyPsmsHave_reporterIonMassesDisplay,
				anyPsmsHave_openModificationMassesDisplay,
				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
			});

	} else {
		dataTable_DataRowEntries =
			_create_DataTable_Rows({
				psmId_Selection,
				openModPosition_Selection,
				psmPeptideEntryAfterProcessingEntries,
				psmAnnotationTypesForPsmListEntries_DisplayOrder,
				anyPsmsHave_precursor_M_Over_Z,
				anyPsmsHave_retentionTime,
				anyPsmsHave_reporterIonMassesDisplay,
				anyPsmsHave_openModificationMassesDisplay,
				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
			});
	}

	const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
		columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
		columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
		dataTable_DataRowEntries,
		dataTable_DataGroupRowEntries
	});

	return dataTable_RootTableDataObject
}

/**
 * Pre-Process input data to compute derived values and determine other data
 *
 */
const _preProcessInputData = function(
	{
		sorted_psmPeptideData, loadedDataFromServer
	}: {
		sorted_psmPeptideData: Array<LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry>
		loadedDataFromServer: LorikeetSpectrumViewer_DataFromServer_Root_Data
	}) : {

	psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing>
	anyPsmsHave_precursor_M_Over_Z : boolean
	anyPsmsHave_retentionTime : boolean
	anyPsmsHave_reporterIonMassesDisplay : boolean
	anyPsmsHave_openModificationMassesDisplay : boolean
	anyPsmsHave_openModification_Positions_MoreThanOne : boolean
} {

	const lorikeet_ScanData_RetentionTime_PrecursorMZ = loadedDataFromServer.primaryLorikeetData.lorikeet_ScanData_RetentionTime_PrecursorMZ;

	let anyPsmsHave_precursor_M_Over_Z = false;
	let anyPsmsHave_retentionTime = false;
	let anyPsmsHave_reporterIonMassesDisplay = false;
	let anyPsmsHave_openModificationMassesDisplay = false;
	let anyPsmsHave_openModification_Positions_MoreThanOne = false;

	const psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing> = []

	for ( const psmObject of sorted_psmPeptideData ) {

		const psmPeptideEntryAfterProcessing = new PsmPeptideEntryAfterProcessing()

		psmPeptideEntryAfterProcessing.psmObject = psmObject

		{
			let outputPrecursorMZ_Number: number = undefined;
			if ( psmObject.psm_precursor_MZ !== undefined && psmObject.psm_precursor_MZ !== null ) {
				//  Have value from PSM so use that
				outputPrecursorMZ_Number = psmObject.psm_precursor_MZ;

			} else if ( lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ !== undefined && lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ !== null ) {
				//  Have value from Scan so use that
				outputPrecursorMZ_Number = lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_precursorMZ;
			}
			if ( outputPrecursorMZ_Number !== undefined ) {

				psmPeptideEntryAfterProcessing.precursor_M_Over_Z_Display = outputPrecursorMZ_Number.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
				psmPeptideEntryAfterProcessing.precursor_M_Over_Z_Sort = outputPrecursorMZ_Number;

				anyPsmsHave_precursor_M_Over_Z = true
			}
		}

		{
			let outputRetentionTime_Number_Seconds: number = undefined;
			if ( psmObject.psm_precursor_RetentionTime !== undefined && psmObject.psm_precursor_RetentionTime !== null ) {
				//  Have value from PSM so use that
				outputRetentionTime_Number_Seconds = psmObject.psm_precursor_RetentionTime;

			} else if ( lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds !== undefined && lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds !== null ) {

				outputRetentionTime_Number_Seconds = lorikeet_ScanData_RetentionTime_PrecursorMZ.scan_retentionTimeSeconds;
			}

			if ( outputRetentionTime_Number_Seconds !== undefined ) {

				const retentionTimeMinutesNumber = outputRetentionTime_Number_Seconds / 60;

				psmPeptideEntryAfterProcessing.retentionTimeMinutesDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
				psmPeptideEntryAfterProcessing.retentionTimeMinutesSort = retentionTimeMinutesNumber

				anyPsmsHave_retentionTime = true
			}
		}
		{
			if ( psmObject.reporterIonMassList && psmObject.reporterIonMassList.length > 0 ) {

				const reporterIonMassAsString_List = [];
				for ( const reporterIonMass of psmObject.reporterIonMassList ) {
					const reporterIonMass_String = reporterIonMass.toString();
					reporterIonMassAsString_List.push( reporterIonMass_String );
				}
				const reporterIonMassesDisplay = reporterIonMassAsString_List.join(", ");

				psmPeptideEntryAfterProcessing.reporterIonMassesDisplay = reporterIonMassesDisplay;
				psmPeptideEntryAfterProcessing.reporterIonMassesSort = reporterIonMassesDisplay;  // Arbitrary but not really sortable on this.  Column will not be sortable by user

				anyPsmsHave_reporterIonMassesDisplay = true
			}

			if ( psmObject.openModificationMassAndPositionsList && psmObject.openModificationMassAndPositionsList.length > 0 ) {

				const openModificationMassAsString_List: Array<string> = [];
				for ( const openModificationMassAndPositionsEntry of psmObject.openModificationMassAndPositionsList ) {
					const openModMass = openModificationMassAndPositionsEntry.openModMass;
					const positionEntries_Optional = openModificationMassAndPositionsEntry.positionEntries_Optional;
					const openModificationMass_String = openModMass.toString();
					let outputEntry_positionsSubstring = "";
					if ( positionEntries_Optional && positionEntries_Optional.length > 0 ) {

						if ( positionEntries_Optional.length > 1 ) {
							anyPsmsHave_openModification_Positions_MoreThanOne = true;
						}

						const positionNumbers = [];
						let is_N_Terminal = false;
						let is_C_Terminal = false;
						for ( const positionEntry of positionEntries_Optional ) { // positionEntry : { position, is_N_Terminal, is_C_Terminal }
							if ( positionEntry.is_N_Terminal ) {
								is_N_Terminal = true;
							} else if ( positionEntry.is_C_Terminal ) {
								is_C_Terminal = true;
							}
							if ( ( ! positionEntry.is_N_Terminal ) && ( ! positionEntry.is_C_Terminal ) ) {
								positionNumbers.push(positionEntry.position);
							}
						}

						let positionNumbers_JoinString = "";

						if ( positionNumbers.length > 0 ) {
							positionNumbers.sort((a, b) => {
								if (a < b) {
									return -1;
								}
								if (a > b) {
									return 1;
								}
								return 0;
							});

							positionNumbers_JoinString = positionNumbers.join(", ");
						}

						let n_TerminalLabel = ""
						let n_TerminalSeparator = ""
						if ( is_N_Terminal ) {
							n_TerminalLabel = "n-term"
							if ( positionNumbers_JoinString.length > 0 ) {
								n_TerminalSeparator = ", "
							}
						}
						let c_TerminalLabel = ""
						let c_TerminalSeparator = ""
						if ( is_C_Terminal ) {
							c_TerminalLabel = "c-term"
							if ( positionNumbers_JoinString.length > 0 ) {
								c_TerminalSeparator = ", "
							}
						}
						outputEntry_positionsSubstring = " (" + n_TerminalLabel + n_TerminalSeparator + positionNumbers_JoinString + c_TerminalSeparator + c_TerminalLabel + ")";
					}
					const outputEntryString = openModificationMass_String + outputEntry_positionsSubstring
					openModificationMassAsString_List.push( outputEntryString );
				}

				const valueDisplay = openModificationMassAsString_List.join(", ");
				const valueSort = psmObject.openModificationMassAndPositionsList[ 0 ].openModMass; // Sort on first entry mass

				psmPeptideEntryAfterProcessing.openModificationMassesDisplay = valueDisplay
				psmPeptideEntryAfterProcessing.openModificationMassesSort = valueSort

				anyPsmsHave_openModificationMassesDisplay = true;
			}
		}

		psmPeptideEntryAfterProcessingEntries.push( psmPeptideEntryAfterProcessing )
	}

	return {
		psmPeptideEntryAfterProcessingEntries,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay,
		anyPsmsHave_openModification_Positions_MoreThanOne
	}
}



/**
 * Get the columns for the PSM table.
 *
 * @param {*} param0
 */
const _getDataTableColumns = function(
	{
		psmAnnotationTypesForPsmListEntries_DisplayOrder,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay
	} : {
		psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
		anyPsmsHave_precursor_M_Over_Z : boolean
		anyPsmsHave_retentionTime : boolean
		anyPsmsHave_reporterIonMassesDisplay : boolean
		anyPsmsHave_openModificationMassesDisplay : boolean

	} ) : DataTable_RootTableDataObject_Both_ColumnArrays {

	const dataTable_Columns : Array<DataTable_Column> = [];
	const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

	{
		const displayName = "Sequence";

		const dataTable_Column = new DataTable_Column({
			id : "sequence", // Used for tracking sort order. Keep short
			displayName,
			width : 500,
			sortable : true
		});
		dataTable_Columns.push( dataTable_Column );

		const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
		dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
	}

	if ( anyPsmsHave_precursor_M_Over_Z ) {

		const displayName = "Obs. m/z";

		const dataTable_Column = new DataTable_Column({
			id : "mz", // Used for tracking sort order. Keep short
			displayName,
			width : 100,
			sortable : true,
			onlyShow_ValueDisplay_FirstRowOfGroup: true
		});
		dataTable_Columns.push( dataTable_Column );

		const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
		dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
	}

	{
		const displayName = "Charge";

		const dataTable_Column = new DataTable_Column({
			id : "Charge", // Used for tracking sort order. Keep short
			displayName : "Charge",
			width : 55,
			sortable : true,
			onlyShow_ValueDisplay_FirstRowOfGroup: true
		});
		dataTable_Columns.push( dataTable_Column );

		const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
		dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
	}

	if ( anyPsmsHave_retentionTime ) {

		const displayName = "RT(min)";

		const dataTable_Column = new DataTable_Column({
			id : "rt", // Used for tracking sort order. Keep short
			displayName,
			width : 60,
			sortable : true,
			onlyShow_ValueDisplay_FirstRowOfGroup: true
		});
		dataTable_Columns.push( dataTable_Column );
	}

	if ( anyPsmsHave_reporterIonMassesDisplay ) {

		const displayName = "Reporter Ions";

		const dataTable_Column = new DataTable_Column({
			id : "reporterIons", // Used for tracking sort order. Keep short
			displayName,
			width : 60,
			sortable : false,  // String of 1 or more mass values so not sortable
			onlyShow_ValueDisplay_FirstRowOfGroup: true
		});
		dataTable_Columns.push( dataTable_Column );

		const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
		dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
	}

	if ( anyPsmsHave_openModificationMassesDisplay ) {
		{
			const displayName = "Open Modifi- cations";

			const dataTable_Column = new DataTable_Column({
				id : "openMods", // Used for tracking sort order. Keep short
				displayName,
				width : 65,
				sortable : true,
				onlyShow_ValueDisplay_FirstRowOfGroup: true
			});
			dataTable_Columns.push( dataTable_Column );

			const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
			dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
		}
		{
			const displayName = "Open Modifi- cation Position";

			const dataTable_Column = new DataTable_Column({
				id : "openModPos", // Used for tracking sort order. Keep short
				displayName,
				width : 54,
				sortable : false  // since assign null when no value
			});
			dataTable_Columns.push( dataTable_Column );

			const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
			dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
		}
	}

	for( let annotation of psmAnnotationTypesForPsmListEntries_DisplayOrder ) {

		const displayName = annotation.name;

		const dataTable_Column = new DataTable_Column({
			id : annotation.annotationTypeId.toString(), // Used for tracking sort order. Keep short
			displayName,
			width : 100,
			sortable : true,
			onlyShow_ValueDisplay_FirstRowOfGroup: true
		});
		dataTable_Columns.push( dataTable_Column );

		const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
		dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
	}

	const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: dataTable_Columns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });

	return dataTable_RootTableDataObject_Both_ColumnArrays;
}


const _create_DataTable_Rows = function(
	{
		psmId_Selection,
		openModPosition_Selection,

		psmPeptideEntryAfterProcessingEntries,
		psmAnnotationTypesForPsmListEntries_DisplayOrder,

		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay,

		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
	} : {
		psmId_Selection : number
		openModPosition_Selection: number | string
		psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing>
		psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
		anyPsmsHave_precursor_M_Over_Z : boolean
		anyPsmsHave_retentionTime : boolean
		anyPsmsHave_reporterIonMassesDisplay : boolean
		anyPsmsHave_openModificationMassesDisplay : boolean

		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded : LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded

	} ) : Array<DataTable_DataRowEntry> {

		//  Data Rows

	const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

	for ( const psmPeptideEntryAfterProcessingEntry of psmPeptideEntryAfterProcessingEntries ) {

		let openModificationMassAndPosition_Entry : LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data = undefined;

		if ( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList && psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 0 ) {

			if ( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 1 ) {
				const msg = "( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 1 )";
				console.warn(msg);
				throw Error(msg);
			}


			const openModificationMassAndPositions = psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList[0];
			if ( openModificationMassAndPositions.positionEntries_Optional && openModificationMassAndPositions.positionEntries_Optional.length > 0 ) {

				if ( openModificationMassAndPositions.positionEntries_Optional.length > 1 ) {
					const msg = "In '_create_DataTable_Rows(...)' ( openModificationMassAndPositions.positionEntries_Optional.length > 1 )";
					console.warn(msg);
					throw Error(msg);
				}

				openModificationMassAndPosition_Entry = openModificationMassAndPositions.positionEntries_Optional[0];
			}
		}

		const dataTable_DataRowEntry = _create_Single_DataTable_Row({

			isPutIn_Groups: false,

			psmId_Selection,
			openModPosition_Selection,
			psmPeptideEntryAfterProcessingEntry,
			openModificationMassAndPosition_Entry,
			psmAnnotationTypesForPsmListEntries_DisplayOrder,
			anyPsmsHave_precursor_M_Over_Z,
			anyPsmsHave_retentionTime,
			anyPsmsHave_reporterIonMassesDisplay,
			anyPsmsHave_openModificationMassesDisplay,

			lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
		});

		dataTable_DataRowEntries.push(dataTable_DataRowEntry);
	}

	return dataTable_DataRowEntries;
}

/**
 *
 * @param psmId_Selection
 * @param openModPosition_Selection
 * @param psmPeptideEntryAfterProcessingEntries
 * @param psmAnnotationTypesForPsmListEntries_DisplayOrder
 * @param anyPsmsHave_precursor_M_Over_Z
 * @param anyPsmsHave_retentionTime
 * @param anyPsmsHave_reporterIonMassesDisplay
 * @param anyPsmsHave_openModificationMassesDisplay
 * @param lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
 * @private
 */
const _create_DataTable_Group_Rows = function(
	{
		psmId_Selection,
		openModPosition_Selection,

		psmPeptideEntryAfterProcessingEntries,
		psmAnnotationTypesForPsmListEntries_DisplayOrder,

		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay,

		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
	} : {
		psmId_Selection : number
		openModPosition_Selection: number | string
		psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing>
		psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
		anyPsmsHave_precursor_M_Over_Z : boolean
		anyPsmsHave_retentionTime : boolean
		anyPsmsHave_reporterIonMassesDisplay : boolean
		anyPsmsHave_openModificationMassesDisplay : boolean

		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded : LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded

	} ) : Array<DataTable_DataGroupRowEntry> {

	//  Data Group Rows

	const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = [];

	for ( const psmPeptideEntryAfterProcessingEntry of psmPeptideEntryAfterProcessingEntries ) {

		//  Put each psmPeptideEntryAfterProcessingEntry in it's own Data Table Group

		const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

		if ( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList
			&& psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 0
		) {
			if ( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 1 ) {
				const msg = "( psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList.length > 1 )";
				console.warn(msg);
				throw Error(msg);
			}

			const openModificationMassAndPositions = psmPeptideEntryAfterProcessingEntry.psmObject.openModificationMassAndPositionsList[0];
			if ( openModificationMassAndPositions.positionEntries_Optional && openModificationMassAndPositions.positionEntries_Optional.length > 0 ) {

				//  Add Rows to group for open mod positions

				for ( const openModificationMassAndPosition_Entry of openModificationMassAndPositions.positionEntries_Optional ) {

					const dataTable_DataRowEntry = _create_Single_DataTable_Row({

						isPutIn_Groups: true,

						psmId_Selection,
						openModPosition_Selection,

						psmPeptideEntryAfterProcessingEntry,
						openModificationMassAndPosition_Entry,

						psmAnnotationTypesForPsmListEntries_DisplayOrder,
						anyPsmsHave_precursor_M_Over_Z,
						anyPsmsHave_retentionTime,
						anyPsmsHave_reporterIonMassesDisplay,
						anyPsmsHave_openModificationMassesDisplay,

						lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
					});

					dataTable_DataRowEntries.push(dataTable_DataRowEntry);
				}
			}
		}

		if ( dataTable_DataRowEntries.length === 0 ) {

			//  No Rows added to group so add a single row

			const dataTable_DataRowEntry = _create_Single_DataTable_Row({

				isPutIn_Groups: true,

				psmId_Selection,
				openModPosition_Selection,
				psmPeptideEntryAfterProcessingEntry,
				openModificationMassAndPosition_Entry: undefined,
				psmAnnotationTypesForPsmListEntries_DisplayOrder,
				anyPsmsHave_precursor_M_Over_Z,
				anyPsmsHave_retentionTime,
				anyPsmsHave_reporterIonMassesDisplay,
				anyPsmsHave_openModificationMassesDisplay,

				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
			});

			dataTable_DataRowEntries.push(dataTable_DataRowEntry);
		}

		const first_dataTable_DataRowEntry = dataTable_DataRowEntries[ 0 ];

		if ( dataTable_DataRowEntries.length > 1 ) {
			dataTable_DataRowEntries.sort( ( a,b ) => {
				if ( a.sortOrder_OnEquals < b.sortOrder_OnEquals ) {
					return -1;
				}
				if ( a.sortOrder_OnEquals > b.sortOrder_OnEquals ) {
					return 1;
				}
				return 0;
			});
		}

		const dataTable_DataGroupRowEntry = new DataTable_DataGroupRowEntry({
			dataTable_DataRowEntries,
			columnEntries : first_dataTable_DataRowEntry.columnEntries,
			sortOrder_OnEquals : psmPeptideEntryAfterProcessingEntry.psmObject.psmId,
			uniqueId : psmPeptideEntryAfterProcessingEntry.psmObject.psmId
		});

		dataTable_DataGroupRowEntries.push( dataTable_DataGroupRowEntry )
	}

	return dataTable_DataGroupRowEntries;
}

/**
 *
 * @private
 */
const _create_Single_DataTable_Row = function (
	{
		isPutIn_Groups,

		psmId_Selection,
		openModPosition_Selection,

		psmPeptideEntryAfterProcessingEntry,
		openModificationMassAndPosition_Entry,

		psmAnnotationTypesForPsmListEntries_DisplayOrder,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay,
		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
	} : {
		isPutIn_Groups: boolean

		psmId_Selection : number
		openModPosition_Selection: number | string
		psmPeptideEntryAfterProcessingEntry: PsmPeptideEntryAfterProcessing
		openModificationMassAndPosition_Entry: LorikeetSpectrumViewer_DataFromServer_OpenModification_Position_SubPart_Data
		psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
		anyPsmsHave_precursor_M_Over_Z : boolean
		anyPsmsHave_retentionTime : boolean
		anyPsmsHave_reporterIonMassesDisplay : boolean
		anyPsmsHave_openModificationMassesDisplay : boolean

		lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded : LorikeetSpectrumViewer_PageMaintOnceDataIsLoaded
	}
) : DataTable_DataRowEntry {


	const psmObject = psmPeptideEntryAfterProcessingEntry.psmObject

	const psmId : number = psmObject.psmId;
	// const reportedPeptideString = psmObject.reportedPeptideString;
	const charge : number = psmObject.charge;
	const psmAnnotationMap_Key_AnnotationTypeId = psmObject.psmAnnotationMap_Key_AnnotationTypeId;
	{
		if ( ! variable_is_type_number_Check( psmId ) ) {
			const msg = "psmId is not a number: " + psmId;
			console.warn( msg )
			throw Error( msg )
		}
		if ( ! variable_is_type_number_Check( charge ) ) {
			const msg = "charge is not a number: " + psmId;
			console.warn( msg )
			throw Error( msg )
		}
	}

	const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
	const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

	{
		{ // Peptide Sequence + Variable and Open Modifications

			const peptideSequenceString = psmObject.peptideSequence

			//  First combine all positional mods together into single map since will display all as Variable Mods in '[' ']'

			const modifications_combine_temp : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();

			if ( psmObject.ntermMod || psmObject.ctermMod || ( psmObject.variableMods && psmObject.variableMods.length > 0 ) ) {

				const modsRoundedSet_KeyPosition: Map<number, Set<number>> = new Map();

				if ( psmObject.ntermMod ) {

					const massRounded = modificationMass_CommonRounding_ReturnNumber(psmObject.ntermMod);  // Call external function

					const position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;

					let modsRoundedSet = modsRoundedSet_KeyPosition.get(position);
					if (!modsRoundedSet) {
						modsRoundedSet = new Set();
						modsRoundedSet_KeyPosition.set(position, modsRoundedSet);
					}

					modsRoundedSet.add( massRounded )
				}
				if ( psmObject.ctermMod ) {

					const massRounded = modificationMass_CommonRounding_ReturnNumber(psmObject.ctermMod);  // Call external function

					const position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;

					let modsRoundedSet = modsRoundedSet_KeyPosition.get(position);
					if (!modsRoundedSet) {
						modsRoundedSet = new Set();
						modsRoundedSet_KeyPosition.set(position, modsRoundedSet);
					}

					modsRoundedSet.add( massRounded )
				}

				if ( psmObject.variableMods && psmObject.variableMods.length > 0 ) {

					//  Have Variable Mods
					for (const variableMod of psmObject.variableMods) {

						const mass = variableMod.modMass;
						const position = variableMod.index;

						let modsRoundedSet = modsRoundedSet_KeyPosition.get(position);
						if (!modsRoundedSet) {
							modsRoundedSet = new Set();
							modsRoundedSet_KeyPosition.set(position, modsRoundedSet);
						}

						const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
						modsRoundedSet.add(massRounded);
					}
				}

				for ( const entry of modsRoundedSet_KeyPosition.entries() ) {
					const position : number = entry[ 0 ];
					const massesNumber : Set<number> = entry[ 1 ];

					let modifications_combine_temp_Entry = modifications_combine_temp.get( position );
					if ( ! modifications_combine_temp_Entry ) {
						modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
						modifications_combine_temp.set( position, modifications_combine_temp_Entry );
					}
					for ( const massNumber of massesNumber ) {
						const massString = modificationMass_CommonRounding_ReturnString( massNumber );
						modifications_combine_temp_Entry.push({massNumber, massString})
					}
				}
			}

			//  Open Mod at Position is added to Variable Mods
			let open_Modification_Rounded_NoPosition : string = undefined;


			if ( psmObject.openModificationMassAndPositionsList && psmObject.openModificationMassAndPositionsList.length > 0 ) {

				if ( psmObject.openModificationMassAndPositionsList.length > 1 )  {
					const msg = "( psmObject.openModificationMassAndPositionsList.length > 1 ) ";
					console.warn(msg);
					throw Error(msg);
				}

				const openModificationMassAndPositionsEntry = psmObject.openModificationMassAndPositionsList[0];

				const openModMass_Rounded = modificationMass_CommonRounding_ReturnNumber( openModificationMassAndPositionsEntry.openModMass );

				if ( ( ! openModificationMassAndPositionsEntry.positionEntries_Optional ) || openModificationMassAndPositionsEntry.positionEntries_Optional.length === 0 ) {  // method param

					//  No Positions
					open_Modification_Rounded_NoPosition = modificationMass_CommonRounding_ReturnString( openModMass_Rounded );

				} else {

					if ( ! openModificationMassAndPosition_Entry ) {
						//  No Position passed in
						const msg = "openModificationMassAndPositionsEntry.positionEntries_Optional has entries BUT ( ! openModificationMassAndPosition_Entry ) ";
						console.warn(msg);
						throw Error(msg);
					}

					let open_Modification_Position = openModificationMassAndPosition_Entry.position;
					if ( openModificationMassAndPosition_Entry.is_N_Terminal ) {
						open_Modification_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;
					}
					if ( openModificationMassAndPosition_Entry.is_C_Terminal ) {
						open_Modification_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
					}


					let modifications_combine_temp_Entry = modifications_combine_temp.get( open_Modification_Position );
					if ( ! modifications_combine_temp_Entry ) {
						modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
						modifications_combine_temp.set( open_Modification_Position, modifications_combine_temp_Entry );
					}
					const massString = modificationMass_CommonRounding_ReturnString( openModMass_Rounded );
					modifications_combine_temp_Entry.push({massNumber : openModMass_Rounded, massString})
				}
			}

			const variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall : Map<number, Array<string>> = new Map();

			for (const modifications_combine_temp_Entry of modifications_combine_temp.entries()) {
				const modifications_combine_tempKey = modifications_combine_temp_Entry[0];
				const modsRounded_ObjectsArray = modifications_combine_temp_Entry[1];

				modsRounded_ObjectsArray.sort((a, b) => {
					if (a.massNumber < b.massNumber) {
						return -1;
					} else if (a.massNumber > b.massNumber) {
						return 1;
					} else {
						return 0;
					}
				});
				const modsRoundedStringsArray : Array<string> = [];
				for (const modRounded of modsRounded_ObjectsArray) {
					const modRoundedString = modRounded.massString.toString();
					modsRoundedStringsArray.push(modRoundedString);
				}
				variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall.set(modifications_combine_tempKey, modsRoundedStringsArray);
			}



			//   Call external function
			const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
				peptideSequence : peptideSequenceString,
				variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
				open_Modification_Rounded: undefined,				//  Open Mod at Position is added to Variable Mods
				open_Modification_Rounded_Position: undefined,		//  Open Mod at Position is added to Variable Mods
				open_Modification_Rounded_NoPosition,
				staticModificationsRounded_KeyPosition : undefined
			});


			const valueDisplay = peptideSequenceDisplay;
			const searchEntriesForColumn : Array<string> = [ valueDisplay ]
			const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
			const columnEntry = new DataTable_DataRow_ColumnEntry({
				searchTableData,
				valueDisplay,
				valueSort: peptideSequenceDisplay
			})
			columnEntries.push(columnEntry);

			const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
			dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
		}

		if (anyPsmsHave_precursor_M_Over_Z) {
			let valueDisplay = ""
			let valueSort: number = null;
			if (psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Display !== undefined) {
				valueDisplay = psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Display
				valueSort = psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Sort
			}
			const searchEntriesForColumn : Array<string> = [ valueDisplay ]
			const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
			const columnEntry = new DataTable_DataRow_ColumnEntry({
				searchTableData,
				valueDisplay,
				valueSort
			})
			columnEntries.push(columnEntry);

			const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
			dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
		}

		{ // Charge
			const valueDisplay = charge.toString();
			const searchEntriesForColumn : Array<string> = [ valueDisplay ]
			const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
			const columnEntry = new DataTable_DataRow_ColumnEntry({
				searchTableData,
				valueDisplay,
				valueSort: charge
			})
			columnEntries.push(columnEntry);

			const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
			dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
		}


		if (anyPsmsHave_retentionTime) {
			let valueDisplay = ""
			let valueSort: number = null
			if (psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesDisplay !== undefined) {
				valueDisplay = psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesDisplay
				valueSort = psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesSort
			}
			const searchEntriesForColumn : Array<string> = [ valueDisplay ]
			const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
			const columnEntry = new DataTable_DataRow_ColumnEntry({
				searchTableData,
				valueDisplay,
				valueSort
			})
			columnEntries.push(columnEntry);

			const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
			dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
		}

		if (anyPsmsHave_reporterIonMassesDisplay) {
			let valueDisplay = ""
			let valueSort = ""
			if (psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay !== undefined) {
				valueDisplay = psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay
				valueSort = psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay
			}
			const searchEntriesForColumn : Array<string> = [ valueDisplay ]
			const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
			const columnEntry = new DataTable_DataRow_ColumnEntry({
				searchTableData,
				valueDisplay,
				valueSort
			})
			columnEntries.push(columnEntry);

			const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
			dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
		}

		if (anyPsmsHave_openModificationMassesDisplay) {
			{
				let valueDisplay = ""
				let valueSort: number = null
				if (psmPeptideEntryAfterProcessingEntry.openModificationMassesDisplay !== undefined) {
					valueDisplay = psmPeptideEntryAfterProcessingEntry.openModificationMassesDisplay
					valueSort = psmPeptideEntryAfterProcessingEntry.openModificationMassesSort
				}
				const searchEntriesForColumn : Array<string> = [ valueDisplay ]
				const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					searchTableData,
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);

				const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
				dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
			}
			{
				let valueDisplay = ""
				let valueSort: number = null
				if (openModificationMassAndPosition_Entry) {
					if ( openModificationMassAndPosition_Entry.is_N_Terminal ) {

						valueDisplay = "n"
						valueSort = -1

					} else if ( openModificationMassAndPosition_Entry.is_C_Terminal ) {

						valueDisplay = "c"
						valueSort = 1000000
					} else {
						valueDisplay = openModificationMassAndPosition_Entry.position.toString()
						valueSort = openModificationMassAndPosition_Entry.position
					}
				}
				const searchEntriesForColumn : Array<string> = [ valueDisplay ]
				const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					searchTableData,
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);

				const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
				dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
			}
		}
		{
			//  Put PSM annotations into a list for display matching table headers

			if (psmAnnotationMap_Key_AnnotationTypeId) {
				for (const annTypeItem of psmAnnotationTypesForPsmListEntries_DisplayOrder) {

					const entryForAnnTypeId = psmAnnotationMap_Key_AnnotationTypeId.get( annTypeItem.annotationTypeId );

					//  valueSort should end up the same type 'number/string' for all values in a given table column
					let valueSort: number | string = entryForAnnTypeId.valueDouble;
					if (valueSort === undefined || valueSort === null) {
						valueSort = entryForAnnTypeId.valueString;
					}
					const valueDisplay = entryForAnnTypeId.valueString;
					const searchEntriesForColumn : Array<string> = [ valueDisplay ]
					const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
					const columnEntry = new DataTable_DataRow_ColumnEntry({
						searchTableData,
						valueDisplay,
						valueSort
					});
					columnEntries.push(columnEntry);

					const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
					dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
				}
			}
		}

		let openModPosition_ForRow_SelectionFormatted = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED;

		if ( openModificationMassAndPosition_Entry ) {

			if ( openModificationMassAndPosition_Entry.is_N_Terminal ) {

				openModPosition_ForRow_SelectionFormatted = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__N;

			} else if ( openModificationMassAndPosition_Entry.is_C_Terminal ) {

				openModPosition_ForRow_SelectionFormatted = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION_QUERY_STRING_VALUE__C;

			} else {

				openModPosition_ForRow_SelectionFormatted = openModificationMassAndPosition_Entry.position;
			}
		}

		const tableRowClickHandler_Callback_NoDataPassThrough = () => {
			try {

				lorikeetSpectrumViewer_PageMaintOnceDataIsLoaded.handlePsmLinkClick({ psmIdOfClicked : psmId, openModPosition_OfClicked: openModPosition_ForRow_SelectionFormatted })

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}

		let row_CSS_Additions: string = undefined;
		let highlightRow = false

		if (  psmPeptideEntryAfterProcessingEntry.psmObject.psmIs_IndependentDecoy ) {
			row_CSS_Additions = " psm-table-addition--psm-is--independent-decoy--data-table-data-rows-inner-containing-div "
		}

		if ( psmId_Selection === psmId && openModPosition_Selection === openModPosition_ForRow_SelectionFormatted ) {

			if (  psmPeptideEntryAfterProcessingEntry.psmObject.psmIs_IndependentDecoy ) {
				row_CSS_Additions = " psm-table-addition--psm-is--independent-decoy--psm-is-selected--data-table-data-rows-inner-containing-div "
			} else {
				highlightRow = true
			}
		}

		let uniqueId : number | string = psmId;
		let sortOrder_OnEquals: number | string  = psmId;

		if ( isPutIn_Groups ) {
			if ( ! openModificationMassAndPosition_Entry ) {
				// arbitrary values since no open mod position
				uniqueId = -555;
				sortOrder_OnEquals = -555;
			} else {
				if ( openModificationMassAndPosition_Entry.is_N_Terminal ) {
					// arbitrary negative value
					uniqueId = -2;
					sortOrder_OnEquals = -2;
				} else if ( openModificationMassAndPosition_Entry.is_C_Terminal ) {
					// arbitrary value larger than any possible protein length
					uniqueId = 99999999;
					sortOrder_OnEquals = 99999999;
				} else {
					uniqueId = openModificationMassAndPosition_Entry.position;
					sortOrder_OnEquals = openModificationMassAndPosition_Entry.position;
				}
			}
		}

		const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

		const dataTable_DataRowEntry = new DataTable_DataRowEntry({
			uniqueId,
			sortOrder_OnEquals,
			columnEntries,
			dataTable_DataRowEntry_DownloadTable,
			row_CSS_Additions,
			highlightRowWithBackgroundColor: highlightRow,
			tableRowClickHandler_Callback_NoDataPassThrough
		})

		return dataTable_DataRowEntry;
	}
}


/**
 * Sort PSM Peptide Array on PSM Sort order then Psm Id
 */
const _sortPsmPeptideListOnSortOrder = function(
	{
		psmPeptideData, projectSearchId, dataPageStateManager_DataFrom_Server
	} : {
		psmPeptideData: Array<LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry>
		projectSearchId: number
		dataPageStateManager_DataFrom_Server: DataPageStateManager

	} )  {

	const sorted_psmPeptideData = psmPeptideData;

	const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( { dataPageStateManager_DataFrom_Server } );

	//  First get all Unique PSM Annotation Type Ids in the List

	const uniquePSMAnnotationTypeIds_InList = new Set();

	for ( const sorted_psmPeptideDataItem of sorted_psmPeptideData ) {
		const psmAnnotationMap_Key_AnnotationTypeId = sorted_psmPeptideDataItem.psmAnnotationMap_Key_AnnotationTypeId;
		if ( psmAnnotationMap_Key_AnnotationTypeId ) {
			for ( const psmAnnotationDTOItem of psmAnnotationMap_Key_AnnotationTypeId.values() ) {
				uniquePSMAnnotationTypeIds_InList.add( psmAnnotationDTOItem.annotationTypeId );
			}
		}
	}

	//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names

	const psmAnnotationTypesForListEntries =
		annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( {
			projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InList
		} );

	//  Sort sorted_psmPeptideData

	sorted_psmPeptideData.sort( function( a: LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry, b: LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry ) {

		//  Compare PSM Ann Type Values match
		const a_psmAnnotationMap_Key_AnnotationTypeId = a.psmAnnotationMap_Key_AnnotationTypeId;
		const b_psmAnnotationMap_Key_AnnotationTypeId = b.psmAnnotationMap_Key_AnnotationTypeId;

		if ( a_psmAnnotationMap_Key_AnnotationTypeId && b_psmAnnotationMap_Key_AnnotationTypeId ) {

			for ( const psmAnnotationTypesForListEntries_Entry of psmAnnotationTypesForListEntries ) {

				const annotationTypeId = psmAnnotationTypesForListEntries_Entry.annotationTypeId;
				const a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap_Key_AnnotationTypeId.get( annotationTypeId );
				const b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap_Key_AnnotationTypeId.get( annotationTypeId );

				if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
					if ( psmAnnotationTypesForListEntries_Entry.filterDirectionBelow ) {
						if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
							return -1;
						}
						if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
							return 1;
						}
						//  Values match so go to next ann type values
					} else if ( psmAnnotationTypesForListEntries_Entry.filterDirectionAbove ) {
						if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
							return -1;
						}
						if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
							return 1;
						}
						//  Values match so go to next ann type values
					} else {
						throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
					}
				}
			}
		}

		//  All PSM Ann Type Values match so order on psm id
		if ( a.psmId < b.psmId ) {
			return -1;
		}
		if ( a.psmId > b.psmId ) {
			return 1;
		}
		return 0;

	});

	return sorted_psmPeptideData;
}


/**
 *
 */
const _getAnnotationTypeRecords_DisplayOrder = function(
	{
		psmList,
		projectSearchId,
		dataPageStateManager
	} : {
		psmList : Array< LorikeetSpectrumViewer_DataFromServer_PSM_Peptide_Data_Entry>,
		projectSearchId : number,
		dataPageStateManager : DataPageStateManager
	} ) : { psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem> } {

	//   Get all annotation type ids returned in all entries and produce a list of them to put in columns

	let annotationTypeData : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

	let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
	if ( ( ! annotationTypeDataForProjectSearchId ) ) {
		throw Error("No annotation type data for projectSearchId: " + projectSearchId );
	}

	const allPSMAnnotationTypeIds_InPsmList_Set : Set<number> = new Set();

	for ( const psmListItem of psmList ) {

		let psmAnnotationMap_Key_AnnotationTypeId = psmListItem.psmAnnotationMap_Key_AnnotationTypeId;
		if ( psmAnnotationMap_Key_AnnotationTypeId ) {
			for ( const psmAnnotationDTOItem of psmAnnotationMap_Key_AnnotationTypeId.values() ) {
				if ( ! variable_is_type_number_Check( psmAnnotationDTOItem.annotationTypeId ) ) {
					const msg = "Entry in psmAnnotationMap_Key_AnnotationTypeId: psmAnnotationDTOItem.annotationTypeId is not a number. psmAnnotationDTOItem.annotationTypeId: " + psmAnnotationDTOItem.annotationTypeId;
					console.warn( msg );
					throw Error( msg );
				}
				allPSMAnnotationTypeIds_InPsmList_Set.add( psmAnnotationDTOItem.annotationTypeId );
			}
		}
	}

	//  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names

	let psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem> = [];

	//  PSM

	if ( allPSMAnnotationTypeIds_InPsmList_Set.size > 0 ) {
		//  Have PSM AnnotationType entries in Peptide list so must have PSM AnnotationType records

		let psmFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes
		let psmDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes
		if ( ( ! psmFilterableAnnotationTypes ) && ( ! psmDescriptiveAnnotationTypes ) ) {
			throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have allPSMAnnotationTypeIds_InPsmList entries");
		}
		//  Get AnnotationTypeRecords for AnnotationTypeIds
		for ( const allPSMAnnotationTypeIds_InPsmListKeyItem of allPSMAnnotationTypeIds_InPsmList_Set ) {
			let annotationTypeEntryForKey = psmFilterableAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
			if ( ! annotationTypeEntryForKey ) {
				annotationTypeEntryForKey = psmDescriptiveAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
				if ( ! annotationTypeEntryForKey ) {
					throw Error( "No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes entry for key: " + allPSMAnnotationTypeIds_InPsmListKeyItem );
				}
			}
			psmAnnotationTypesForPsmListEntries_DisplayOrder.push( annotationTypeEntryForKey );
		}
	}

	//  Sort this result array, on display order, then by ann type name

	annotationTypes_SortOn_DisplayOrderAnnTypeName( psmAnnotationTypesForPsmListEntries_DisplayOrder );

	return {
		psmAnnotationTypesForPsmListEntries_DisplayOrder : psmAnnotationTypesForPsmListEntries_DisplayOrder
	};
}

