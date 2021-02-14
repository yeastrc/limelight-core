/**
 * lorikeetSpectrumViewer_createDataFor_PsmPeptideTable.ts
 *
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 *
 * Create the data for displaying the Table of PSM/Peptide data
 *
 */

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';
import {DataTable_Column, DataTable_DataRow_ColumnEntry, DataTable_DataRowEntry, DataTable_RootTableDataObject} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {AnnotationTypeData_Root, AnnotationTypeItem, AnnotationTypeItems_PerProjectSearchId, DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class";


//   !!!  Constants visible in this file/module


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 4;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;

// Internal class

class PsmPeptideEntryAfterProcessing {

	precursor_M_Over_Z_Display: any
	precursor_M_Over_Z_Sort: any
	retentionTimeMinutesDisplay: any
	retentionTimeMinutesSort: any
	reporterIonMassesDisplay: any
	reporterIonMassesSort: any
	openModificationMassesDisplay: any
	openModificationMassesSort: any
	psmObject: any // Existing psmObject from server
}

/**
 * Create PSM Peptide Table Data
 *
 */
export const lorikeetSpectrumViewer_createPsmPeptideTable_HeadersAndData = function ( { psmId_Selection, projectSearchId, loadedDataFromServer, dataPageStateManager_DataFrom_Server } : {

	psmId_Selection : number
	projectSearchId : number
	loadedDataFromServer: any
	dataPageStateManager_DataFrom_Server : DataPageStateManager

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
		anyPsmsHave_openModificationMassesDisplay
	} =  _preProcessInputData({ sorted_psmPeptideData, loadedDataFromServer })

	const dataTable_Columns : Array<DataTable_Column> = _getDataTableColumns( { psmAnnotationTypesForPsmListEntries_DisplayOrder, anyPsmsHave_precursor_M_Over_Z, anyPsmsHave_retentionTime, anyPsmsHave_reporterIonMassesDisplay, anyPsmsHave_openModificationMassesDisplay } );

	const dataTable_DataRowEntries = _createDataTableDataObjectArrayFromWebServiceResponse({
		psmId_Selection,
		psmPeptideEntryAfterProcessingEntries,
		psmAnnotationTypesForPsmListEntries_DisplayOrder,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay
	});

	const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
		columns : dataTable_Columns,
		dataTable_DataRowEntries
	});

	return dataTable_RootTableDataObject
}

/**
 * Pre-Process input data to compute derived values and determine other data
 *
 * @param {*} param0
 */
const _preProcessInputData = function({ sorted_psmPeptideData, loadedDataFromServer }: { sorted_psmPeptideData: any, loadedDataFromServer: any }) : {

	psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing>
	anyPsmsHave_precursor_M_Over_Z : boolean
	anyPsmsHave_retentionTime : boolean
	anyPsmsHave_reporterIonMassesDisplay : boolean
	anyPsmsHave_openModificationMassesDisplay : boolean
} {

	const primaryLorikeetData = loadedDataFromServer.primaryLorikeetData.data;
	const lorikeet_ScanData_RetentionTime_PrecursorMZ = loadedDataFromServer.primaryLorikeetData.lorikeet_ScanData_RetentionTime_PrecursorMZ;

	let anyPsmsHave_precursor_M_Over_Z = false;
	let anyPsmsHave_retentionTime = false;
	let anyPsmsHave_reporterIonMassesDisplay = false;
	let anyPsmsHave_openModificationMassesDisplay = false;

	const psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing> = []

	for ( const psmObject of sorted_psmPeptideData ) {

		const psmPeptideEntryAfterProcessing = new PsmPeptideEntryAfterProcessing()

		psmPeptideEntryAfterProcessing.psmObject = psmObject

		{
			let outputPrecursorMZ_Number = undefined;
			if ( psmObject.psm_precursor_MZ !== undefined && psmObject.psm_precursor_MZ !== null ) {
				//  Have value from PSM so use that
				outputPrecursorMZ_Number = psmObject.psm_precursor_MZ;

			} else if ( primaryLorikeetData.precursorMz !== undefined && primaryLorikeetData.precursorMz !== null ) {
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
			let outputRetentionTime_Number_Seconds = undefined;
			if ( psmObject.psm_precursor_RetentionTime !== undefined && psmObject.psm_precursor_RetentionTime !== null ) {
				//  Have value from PSM so use that
				outputRetentionTime_Number_Seconds = psmObject.psm_precursor_RetentionTime;

			} else if ( primaryLorikeetData.retentionTimeSeconds !== undefined && primaryLorikeetData.retentionTimeSeconds !== null ) {

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
				let valueDisplay = "";
				let valueSort = "";

				const openModificationMassAsString_List = [];
				for ( const openModificationMassAndPositionsEntry of psmObject.openModificationMassAndPositionsList ) {
					const openModMass = openModificationMassAndPositionsEntry.openModMass;
					const positionEntries_Optional = openModificationMassAndPositionsEntry.positionEntries_Optional;
					const openModificationMass_String = openModMass.toString();
					let outputEntry_positionsSubstring = "";
					if ( positionEntries_Optional ) {
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

				valueDisplay = openModificationMassAsString_List.join(", ");
				valueSort = psmObject.openModificationMassAndPositionsList[ 0 ].openModMass; // Sort on first entry mass

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
		anyPsmsHave_openModificationMassesDisplay
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

	} ) : Array<DataTable_Column> {

	const dataTable_Columns : Array<DataTable_Column> = [];

	{
		const dataTable_Column = new DataTable_Column({
			id : "sequence", // Used for tracking sort order. Keep short
			displayName : "Sequence",
			width : 500,
			sortable : true,
			style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	if ( anyPsmsHave_precursor_M_Over_Z ) {

		const dataTable_Column = new DataTable_Column({
			id : "mz", // Used for tracking sort order. Keep short
			displayName : "Obs. m/z",
			width : 100,
			sortable : true,
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	{
		const dataTable_Column = new DataTable_Column({
			id : "Charge", // Used for tracking sort order. Keep short
			displayName : "Charge",
			width : 55,
			sortable : true,
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	if ( anyPsmsHave_retentionTime ) {
		const dataTable_Column = new DataTable_Column({
			id : "rt", // Used for tracking sort order. Keep short
			displayName : "RT(min)",
			width : 60,
			sortable : true,
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	if ( anyPsmsHave_reporterIonMassesDisplay ) {
		const dataTable_Column = new DataTable_Column({
			id : "reporterIons", // Used for tracking sort order. Keep short
			displayName : "Reporter Ions",
			width : 60,
			sortable : false,  // String of 1 or more mass values so not sortable
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	if ( anyPsmsHave_openModificationMassesDisplay ) {
		const dataTable_Column = new DataTable_Column({
			id : "openModifications", // Used for tracking sort order. Keep short
			displayName : "Open Modifications",
			width : 65,
			sortable : true,
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	for( let annotation of psmAnnotationTypesForPsmListEntries_DisplayOrder ) {

		const dataTable_Column = new DataTable_Column({
			id : annotation.annotationTypeId.toString(), // Used for tracking sort order. Keep short
			displayName : annotation.name,
			width : 100,
			sortable : true,
			style_override_DataRowCell_React : { fontSize: 12 },
			// style_override_header_React : {},  // Optional
			// style_override_React : {},  // Optional
			// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
			// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
		});
		dataTable_Columns.push( dataTable_Column );
	}

	return dataTable_Columns;
}


/**
 * return dataObjectArray created using the data returned from a web service call for PSMs
 *
 * @param {*} param0
 */
const _createDataTableDataObjectArrayFromWebServiceResponse = function(
	{
		psmId_Selection,
		psmPeptideEntryAfterProcessingEntries,
		psmAnnotationTypesForPsmListEntries_DisplayOrder,
		anyPsmsHave_precursor_M_Over_Z,
		anyPsmsHave_retentionTime,
		anyPsmsHave_reporterIonMassesDisplay,
		anyPsmsHave_openModificationMassesDisplay
	} : {
		psmId_Selection : number
		psmPeptideEntryAfterProcessingEntries : Array<PsmPeptideEntryAfterProcessing>
		psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
		anyPsmsHave_precursor_M_Over_Z : boolean
		anyPsmsHave_retentionTime : boolean
		anyPsmsHave_reporterIonMassesDisplay : boolean
		anyPsmsHave_openModificationMassesDisplay : boolean

	} ) : Array<DataTable_DataRowEntry> {


	//  Data Rows

	const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

	for ( const psmPeptideEntryAfterProcessingEntry of psmPeptideEntryAfterProcessingEntries ) {

		let psmId : number = undefined;
		let reportedPeptideString = undefined;
		let charge : number = undefined;
		let psmAnnotationMap : any = undefined;    //  psmAnnotationMap is an Object
		{
			const psmObject = psmPeptideEntryAfterProcessingEntry.psmObject

			psmId = psmObject.psmId
			reportedPeptideString = psmObject.reportedPeptideString
			charge = psmObject.charge
			psmAnnotationMap = psmObject.psmAnnotationMap    //  psmAnnotationMap is an Object

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

		{
			{ // reportedPeptideSequence
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay: reportedPeptideString,
					valueSort: reportedPeptideString
				})
				columnEntries.push(columnEntry);
			}

			if (anyPsmsHave_precursor_M_Over_Z) {
				let valueDisplay = ""
				let valueSort = ""
				if (psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Display !== undefined) {
					valueDisplay = psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Display
					valueSort = psmPeptideEntryAfterProcessingEntry.precursor_M_Over_Z_Sort
				}
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);
			}

			{ // Charge
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay: charge.toString(),
					valueSort: charge
				})
				columnEntries.push(columnEntry);
			}


			if (anyPsmsHave_retentionTime) {
				let valueDisplay = ""
				let valueSort = ""
				if (psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesDisplay !== undefined) {
					valueDisplay = psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesDisplay
					valueSort = psmPeptideEntryAfterProcessingEntry.retentionTimeMinutesSort
				}
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);
			}

			if (anyPsmsHave_reporterIonMassesDisplay) {
				let valueDisplay = ""
				let valueSort = ""
				if (psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay !== undefined) {
					valueDisplay = psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay
					valueSort = psmPeptideEntryAfterProcessingEntry.reporterIonMassesDisplay
				}
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);
			}

			if (anyPsmsHave_openModificationMassesDisplay) {
				let valueDisplay = ""
				let valueSort = ""
				if (psmPeptideEntryAfterProcessingEntry.openModificationMassesDisplay !== undefined) {
					valueDisplay = psmPeptideEntryAfterProcessingEntry.openModificationMassesDisplay
					valueSort = psmPeptideEntryAfterProcessingEntry.openModificationMassesSort
				}
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay,
					valueSort
				})
				columnEntries.push(columnEntry);
			}
			{
				//  Put PSM annotations into a list for display matching table headers

				//  psmAnnotationMap is an Object
				if (psmAnnotationMap) {
					for (const annTypeItem of psmAnnotationTypesForPsmListEntries_DisplayOrder) {
						const entryForAnnTypeId = psmAnnotationMap[annTypeItem.annotationTypeId];
						let valueSort = entryForAnnTypeId.valueDouble;
						if (valueSort === undefined || valueSort === null) {
							valueSort = entryForAnnTypeId.valueString;
						}
						const columnEntry = new DataTable_DataRow_ColumnEntry({
							valueDisplay: entryForAnnTypeId.valueString,
							valueSort
						});
						columnEntries.push(columnEntry);
					}
				}
			}

			let highlightRow = false
			if ( psmId_Selection === psmId ) {
				highlightRow = true
			}

			const tableRowClickHandlerParameter = new LorikeetSpectrumViewer_PsmList_ClickHandlerParam_Class({
				psmId
			});

			const dataTable_DataRowEntry = new DataTable_DataRowEntry({
				uniqueId: psmId,
				sortOrder_OnEquals: psmId,
				columnEntries,
				highlightRowWithBackgroundColor: highlightRow,
				tableRowClickHandlerParameter
			})

			dataTable_DataRowEntries.push(dataTable_DataRowEntry);
		}
	}

	return dataTable_DataRowEntries;
}


/**
 * Sort PSM Peptide Array on PSM Sort order then Psm Id
 */
const _sortPsmPeptideListOnSortOrder = function( { psmPeptideData, projectSearchId, dataPageStateManager_DataFrom_Server }:{ psmPeptideData: any, projectSearchId: any, dataPageStateManager_DataFrom_Server: any } ) {

	const sorted_psmPeptideData = psmPeptideData;

	const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( { dataPageStateManager_DataFrom_Server } );

	//  First get all Unique PSM Annotation Type Ids in the List

	let uniquePSMAnnotationTypeIds_InList = new Set();

	for ( const sorted_psmPeptideDataItem of sorted_psmPeptideData ) {
		const psmAnnotationMap = sorted_psmPeptideDataItem.psmAnnotationMap;
		if ( psmAnnotationMap ) {
			for ( const psmAnnotationMapKeyItem of Object.keys ( psmAnnotationMap ) ) {
				const psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
				uniquePSMAnnotationTypeIds_InList.add( psmAnnotationDTOItem.annotationTypeId );
			}
		}
	}

	//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names

	let psmAnnotationTypesForListEntries =
		annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( {
			projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InList } );

	let psmAnnotationTypesForListEntriesLength = psmAnnotationTypesForListEntries.length;

	sorted_psmPeptideData.sort( function( a: any, b: any ) {

		//  Compare PSM Ann Type Values match
		let a_psmAnnotationMap = a.psmAnnotationMap;
		let b_psmAnnotationMap = b.psmAnnotationMap;
		if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

			for ( let psmAnnotationTypesForListEntriesLength_Index = 0; psmAnnotationTypesForListEntriesLength_Index < psmAnnotationTypesForListEntriesLength; psmAnnotationTypesForListEntriesLength_Index++ ) {
				let psmAnnotationTypesForListEntries_Entry = psmAnnotationTypesForListEntries[ psmAnnotationTypesForListEntriesLength_Index ];
				let annotationTypeId = psmAnnotationTypesForListEntries_Entry.annotationTypeId;
				let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
				let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];

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
		psmList : Array<any>,
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

	psmList.forEach( function( psmListItem, index, array ) {
		let psmAnnotationMap = psmListItem.psmAnnotationMap;
		if ( psmAnnotationMap ) {
			Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
				const psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
				if ( ! variable_is_type_number_Check( psmAnnotationDTOItem.annotationTypeId ) ) {
					const msg = "Entry in psmAnnotationMap: psmAnnotationDTOItem.annotationTypeId is not a number. psmAnnotationDTOItem.annotationTypeId: " + psmAnnotationDTOItem.annotationTypeId;
					console.warn( msg );
					throw Error( msg );
				}
				allPSMAnnotationTypeIds_InPsmList_Set.add( psmAnnotationDTOItem.annotationTypeId );
			}, this );
		}
	}, this );

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

	_sort_AnnotationTypes_OnDisplayOrderAnnTypeName( psmAnnotationTypesForPsmListEntries_DisplayOrder );

	return {
		psmAnnotationTypesForPsmListEntries_DisplayOrder : psmAnnotationTypesForPsmListEntries_DisplayOrder
	};
}


/**
 *
 */
const _sort_AnnotationTypes_OnDisplayOrderAnnTypeName = function( annTypesArray : Array<AnnotationTypeItem> ) {

	annTypesArray.sort( function( a, b ) {
		if ( a.displayOrder && b.displayOrder ) {
			//  both a and b have display order so order them
			if ( a.displayOrder < b.displayOrder ) {
				return -1;
			}
			if ( a.displayOrder > b.displayOrder ) {
				return 1;
			}
			return 0;
		}
		if ( a.displayOrder ) {
			//  Only a has display order so order it first
			return -1;
		}
		if ( b.displayOrder ) {
			//  Only b has display order so order it first
			return 1;
		}
		//  Order on ann type name
		let nameCompare = a.name.localeCompare( b.name );
		return nameCompare;
	});
}
