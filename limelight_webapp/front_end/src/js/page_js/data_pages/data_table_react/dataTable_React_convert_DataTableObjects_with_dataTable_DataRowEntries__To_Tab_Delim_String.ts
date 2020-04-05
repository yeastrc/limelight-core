/**
 * dataTable_React_convert_DataTableObjects_To_Tab_Delim_String.ts
 * 
 * Convert the Data Objects used in Data Table React to a Tab Delimited String representation.
 * 
 * Output Header row and data rows
*/

import { DataTable_RootTableDataObject } from './dataTable_React_DataObjects';



/**
 * convert tableDataRootObject to tab delimited string
 * 
 * 
 */  
export const dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String = function({

    tableDataRootObject
} : {
    tableDataRootObject : DataTable_RootTableDataObject

}) : string {

	if ( tableDataRootObject.dataTable_DataGroupRowEntries ) {
		const msg = "Not Supported: Value in tableDataRootObject.dataTable_DataGroupRowEntries.  dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String(...)"
		console.warn( msg );
		throw Error( msg );
	}


	//  Array of Arrays of tableLineParts
	const tableLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
	
	//  tableLineParts will be joined with separator '\t'

	//  Header Line
	{
		const tableLineParts : Array<string> = [];
		
		for ( const column of tableDataRootObject.columns ) {
		
			const headerString = column.displayName;
			tableLineParts.push( headerString );
		}

		tableLineParts_AllLines.push( tableLineParts );
	}
	
	if ( tableDataRootObject.dataTable_DataRowEntries ) {

	//  Table content Lines

		for ( const dataRowEntry of tableDataRootObject.dataTable_DataRowEntries ) {

			const tableLineParts : Array<string> = [];

			for ( const columnEntry of dataRowEntry.columnEntries ) {
			
				tableLineParts.push( columnEntry.valueDisplay );
			}
				
			tableLineParts_AllLines.push( tableLineParts );
		}
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

