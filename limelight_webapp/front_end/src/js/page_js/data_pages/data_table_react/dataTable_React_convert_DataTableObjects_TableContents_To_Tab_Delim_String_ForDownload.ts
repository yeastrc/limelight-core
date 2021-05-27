/**
 * dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload.ts
 * 
 * Convert the Data Objects used in Data Table React to a Tab Delimited String representation.
 * 
 * Output Header row and data rows
*/

import {DataTable_DataRowEntry, DataTable_RootTableDataObject} from './dataTable_React_DataObjects';



/**
 * convert tableDataRootObject to tab delimited string
 * 
 * 
 */  
export const dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload = function({

    tableDataRootObject
} : {
    tableDataRootObject : DataTable_RootTableDataObject

}) : string {

	//  Array of Arrays of tableLineParts
	const tableLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
	
	//  tableLineParts will be joined with separator '\t'

	//  Header Line
	{
		const tableLineParts : Array<string> = [];
		
		for ( const column of tableDataRootObject.columns_tableDownload ) {
		
			const headerString = column.cell_ColumnHeader_String;
			tableLineParts.push( headerString );
		}

		tableLineParts_AllLines.push( tableLineParts );
	}

	if ( tableDataRootObject.dataTable_DataGroupRowEntries ) {

		for ( const dataTable_DataGroupRowEntry of tableDataRootObject.dataTable_DataGroupRowEntries ) {

			if ( dataTable_DataGroupRowEntry.dataTable_DataRowEntries ) {

				_processDataRows({ dataTable_DataRowEntries: dataTable_DataGroupRowEntry.dataTable_DataRowEntries, tableLineParts_AllLines });
			}
		}

	}
	
	if ( tableDataRootObject.dataTable_DataRowEntries ) {

		_processDataRows({ dataTable_DataRowEntries: tableDataRootObject.dataTable_DataRowEntries, tableLineParts_AllLines });
	}
	
	//  Join all line parts into strings, delimit on '\t'
	
	const tableLine_AllLines : Array<string> = [];
	
	let tableLineParts_AllLinesIndex = -1; // init to -1 since increment first
	const tableLineParts_AllLinesIndex_Last = tableLineParts_AllLines.length - 1;

	for ( const tableLineParts of tableLineParts_AllLines ) {
		
		tableLineParts_AllLinesIndex++;
		
		let tableLine = tableLineParts.join( "\t" );
		if ( tableLineParts_AllLinesIndex === tableLineParts_AllLinesIndex_Last ) {
			tableLine += '\n'; // Add '\n' to last line
		}
		tableLine_AllLines.push( tableLine );
	}

	//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
	
	const tableLinesSingleString = tableLine_AllLines.join( '\n' );
	
	return tableLinesSingleString;
}

/**
 *
 * @param dataTable_DataRowEntries
 * @param tableLineParts_AllLines
 */
const _processDataRows = function(
	{
		dataTable_DataRowEntries,
		tableLineParts_AllLines
	} : {
		dataTable_DataRowEntries: DataTable_DataRowEntry[]
		tableLineParts_AllLines : Array<Array<string>>
	}
) : void {

	for ( const dataRowEntry of dataTable_DataRowEntries ) {

		const tableLineParts : Array<string> = [];

		for ( const columnEntry of dataRowEntry.dataTable_DataRowEntry_DownloadTable.dataColumns_tableDownload ) {

			tableLineParts.push( columnEntry.cell_ColumnData_String );
		}

		tableLineParts_AllLines.push( tableLineParts );
	}

}
