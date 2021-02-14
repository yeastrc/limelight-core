
/**
 * dataTable_SortDataRows.ts
 * 
 * Sort Data Rows or Data Group Rows
 */

import { DataTable_Column, DataTable_DataGroupRowEntry, DataTable_DataRowEntry, DataTable_SortColumnsInfoEntry } from "./dataTable_React_DataObjects";
import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from "./dataTable_constants";
 
/**
 * 
 */
export const sort_dataRows_on_sortColumnsInfo = function({ 
    dataToSort,
    columns, 
    sortColumnsInfo 
} : { 
    dataToSort : Array<DataTable_DataRowEntry> | Array<DataTable_DataGroupRowEntry> 
    columns: Array<DataTable_Column>, 
    sortColumnsInfo : Array<DataTable_SortColumnsInfoEntry>  
}) : void {

    // console.log("_sort_tableObject_on_sortColumnsInfo")

    //  Sort table

    //  Get Index in data row entry arrays for sortColumnsInfo entries

    const dataRowEntrySortDataEntries : Array<{
        columnIndex: number,
        columnInfo:  DataTable_Column,
        sortColumnsInfoEntry:  DataTable_SortColumnsInfoEntry
    }> = [];

    for ( const sortColumnsInfoEntry of sortColumnsInfo ) {
        
        let columnIndex = 0;
        let columnInfo = undefined;
        for ( const columnsEntry of columns ) {
            if ( sortColumnsInfoEntry.columnId === columnsEntry.id ) {
                columnInfo = columnsEntry;
                break;
            }
            columnIndex++;
        }
        if ( columnInfo === undefined ) {
            throw Error("No entry in tableObject.columns for columnId: " + sortColumnsInfoEntry.columnId );
        }

        const dataRowEntrySortDataEntry = {
            columnIndex,
            columnInfo,
            sortColumnsInfoEntry
        };

        dataRowEntrySortDataEntries.push( dataRowEntrySortDataEntry );
    }

    dataToSort.sort( ( dataObject_A : DataTable_DataRowEntry | DataTable_DataGroupRowEntry, dataObject_B : DataTable_DataRowEntry | DataTable_DataGroupRowEntry ) => {

        //  Sort each selected columnId.   Sort undefined and null before other values

        for ( const dataRowEntrySortDataEntry of dataRowEntrySortDataEntries ) {

            // const columnId = dataRowEntrySortDataEntry.sortColumnsInfoEntry.columnId;
            const column_sortDirection = dataRowEntrySortDataEntry.sortColumnsInfoEntry.sortDirection;

            const dataTable_Column_ForIndex : DataTable_Column = columns[ dataRowEntrySortDataEntry.columnIndex ];

            let a_ColumnValue = undefined;
            let b_ColumnValue = undefined;

            const a_ColumnEntry = dataObject_A.columnEntries[ dataRowEntrySortDataEntry.columnIndex ];
            const b_ColumnEntry = dataObject_B.columnEntries[ dataRowEntrySortDataEntry.columnIndex ];

            if ( a_ColumnEntry ) {
                a_ColumnValue = a_ColumnEntry.valueSort;
            }
            if ( b_ColumnEntry ) {
                b_ColumnValue = b_ColumnEntry.valueSort;
            }
            
            if ( ( a_ColumnValue === undefined || a_ColumnValue === null ) && ( b_ColumnValue === undefined || b_ColumnValue === null ) ) {
                continue;  // EARLY CONTINUE
            }

            if ( ( a_ColumnValue === undefined || a_ColumnValue === null ) && ( b_ColumnValue !== undefined && b_ColumnValue !== null ) ) {
                    // Sort (undefined or null) before (not undefined and not null)
                if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                    return -1;
                } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                    return 1;
                }
                throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
            }
            if ( ( a_ColumnValue !== undefined && a_ColumnValue !== null ) && ( b_ColumnValue === undefined || b_ColumnValue === null ) ) {
                // Sort (undefined or null) before (not undefined and not null)
                if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                    return 1;
                } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                    return -1;
                }
                throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
            }

            if ( dataTable_Column_ForIndex.sortFunction ) {

                //  custom sort function

                const sortOrderResponse = dataTable_Column_ForIndex.sortFunction({ sortValue_A : a_ColumnValue, sortValue_B : b_ColumnValue });

                if ( sortOrderResponse < 0 ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return -1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return 1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
                if ( sortOrderResponse > 0 ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return 1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return -1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }

            } else {

                // NO custom sort function

                if ( a_ColumnValue < b_ColumnValue ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return -1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return 1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
                if ( a_ColumnValue > b_ColumnValue ) {
                    if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                        return 1;
                    } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                        return -1;
                    }
                    throw Error("column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                }
            }
        }
        //  All sort columns match so sort on sortOrder_OnEquals

        if ( dataObject_A.sortOrder_OnEquals < dataObject_B.sortOrder_OnEquals ) {
            return -1;
        }

        if ( dataObject_A.sortOrder_OnEquals > dataObject_B.sortOrder_OnEquals ) {
            return 1;
        }
            
        //  sortOrder_OnEquals match so sort on uniqueId

        if ( dataObject_A.uniqueId < dataObject_B.uniqueId ) {
            return -1;
        }

        if ( dataObject_A.uniqueId > dataObject_B.uniqueId ) {
            return 1;
        }
        return 0;
    });
}

