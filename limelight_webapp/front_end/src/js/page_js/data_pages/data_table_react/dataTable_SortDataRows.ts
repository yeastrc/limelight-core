
/**
 * dataTable_SortDataRows.ts
 * 
 * Sort Data Rows or Data Group Rows
 */

import {
    DataTable_Column,
    DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry
} from "./dataTable_React_DataObjects";
import { SORT_DIRECTION_ASCENDING, SORT_DIRECTION_DECENDING } from "./dataTable_constants";
import {
    DataTable_INTERNAL_DataGroupRowEntry,
    DataTable_INTERNAL_DataRowEntry,
    DataTable_INTERNAL_SortColumnsInfoEntry
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";

//

/**
 * 
 */
export const dataTable_SortDataRows__sort_dataRows_on_sortColumnsInfo = function({
    dataToSort,
    columns, 
    sortColumnsInfo 
} : { 
    dataToSort : Array<DataTable_INTERNAL_DataRowEntry> | Array<DataTable_INTERNAL_DataGroupRowEntry>
    columns: Array<DataTable_Column>, 
    sortColumnsInfo : Array<DataTable_INTERNAL_SortColumnsInfoEntry>
}) : void {

    // console.log("_sort_tableObject_on_sortColumnsInfo")


    if ( ! sortColumnsInfo ) {
        //  No Sort columns so exit
        return; // EARLY RETURN
    }

    //  Sort table

    //  Get Index in data row entry arrays for sortColumnsInfo entries

    const dataRowEntrySortDataEntries : Array<{
        columnIndex: number,
        columnInfo:  DataTable_Column,
        sortColumnsInfoEntry:  DataTable_INTERNAL_SortColumnsInfoEntry
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

    dataToSort.sort( ( dataObject_A : DataTable_INTERNAL_DataRowEntry | DataTable_INTERNAL_DataGroupRowEntry, dataObject_B : DataTable_INTERNAL_DataRowEntry | DataTable_INTERNAL_DataGroupRowEntry ) => {

        //  Sort each selected columnId.   Sort undefined and null before other values

        for ( const dataRowEntrySortDataEntry of dataRowEntrySortDataEntries ) {

            // const columnId = dataRowEntrySortDataEntry.sortColumnsInfoEntry.columnId;
            const column_sortDirection = dataRowEntrySortDataEntry.sortColumnsInfoEntry.sortDirection;

            const dataTable_Column_ForIndex : DataTable_Column = columns[ dataRowEntrySortDataEntry.columnIndex ];

            let a_ColumnValue: string | number = undefined;
            let b_ColumnValue: string | number = undefined;

            let a_ColumnValue_FOR_DataTable_Column_sortFunction: unknown = undefined;
            let b_ColumnValue_FOR_DataTable_Column_sortFunction: unknown = undefined;

            const a_ColumnEntry = dataObject_A.columnEntries[ dataRowEntrySortDataEntry.columnIndex ];
            const b_ColumnEntry = dataObject_B.columnEntries[ dataRowEntrySortDataEntry.columnIndex ];

            if ( a_ColumnEntry ) {
                a_ColumnValue = a_ColumnEntry.valueSort;
                a_ColumnValue_FOR_DataTable_Column_sortFunction = a_ColumnEntry.valueSort_FOR_DataTable_Column_sortFunction;
            } else {
                var z = 0
                // window.alert( "else of if ( a_ColumnEntry ) {")
            }
            if ( b_ColumnEntry ) {
                b_ColumnValue = b_ColumnEntry.valueSort;
                b_ColumnValue_FOR_DataTable_Column_sortFunction = b_ColumnEntry.valueSort_FOR_DataTable_Column_sortFunction;
            } else {
                var z = 0
                // window.alert( "else of if ( b_ColumnEntry ) {")
            }

            //  Sort where a_ColumnValue OR b_ColumnValue is undefined --  Should NEVER Happen

            if ( ( a_ColumnValue === undefined ) && ( b_ColumnValue === undefined ) ) {

                continue;  // EARLY CONTINUE
            }

            //  Sort where a_ColumnValue OR b_ColumnValue is null

            if ( a_ColumnValue === null || b_ColumnValue === null ) {

                if ( ! dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum ) {
                    const msg = "DataTable: Unexpected valueSort of null since dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum NOT populated"
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( a_ColumnValue === null && b_ColumnValue === null ) {

                    //  Skip to next sort

                    var z = 0

                } else {

                    if ( a_ColumnValue === null ) {

                        if ( dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum === DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_BEFORE_SMALLEST_VALUE ) {

                            if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                                return -1;
                            } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                                return 1;
                            }

                        } else if ( dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum === DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_AFTER_LARGEST_VALUE ) {

                            if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                                return 1;
                            } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                                return -1;
                            }

                        } else {
                            const msg = "DataTable: dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum is NEITHER OF SORT_NULL_BEFORE_VALUES SORT_NULL_AFTER_VALUES"
                            console.warn(msg)
                            throw Error(msg)
                        }
                    }

                    if ( b_ColumnValue === null ) {

                        if ( dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum === DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_BEFORE_SMALLEST_VALUE ) {

                            if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                                return 1;
                            } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                                return -1;
                            }

                        } else if ( dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum === DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_AFTER_LARGEST_VALUE ) {

                            if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                                return -1;
                            } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                                return 1;
                            }

                        } else {
                            const msg = "DataTable: dataTable_Column_ForIndex.sort_Null_BeforeValues_AfterValues_Enum is NEITHER OF SORT_NULL_BEFORE_VALUES SORT_NULL_AFTER_VALUES"
                            console.warn(msg)
                            throw Error(msg)
                        }
                    }
                }
            } else {

                //  Sort where NEITHER OF a_ColumnValue OR b_ColumnValue is null

                if ( dataTable_Column_ForIndex.sortFunction ) {

                    //  custom sort function

                    const sortOrderResponse = dataTable_Column_ForIndex.sortFunction( {
                        sortValue_A: a_ColumnValue_FOR_DataTable_Column_sortFunction,
                        sortValue_B: b_ColumnValue_FOR_DataTable_Column_sortFunction
                    } );

                    if ( sortOrderResponse < 0 ) {
                        if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                            return -1;
                        } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                            return 1;
                        }
                        throw Error( "column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                    }
                    if ( sortOrderResponse > 0 ) {
                        if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                            return 1;
                        } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                            return -1;
                        }
                        throw Error( "column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                    }

                } else {

                    // NO custom sort function

                    if ( a_ColumnValue < b_ColumnValue ) {
                        if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                            return -1;
                        } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                            return 1;
                        }
                        throw Error( "column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                    }
                    if ( a_ColumnValue > b_ColumnValue ) {
                        if ( column_sortDirection === SORT_DIRECTION_ASCENDING ) {
                            return 1;
                        } else if ( column_sortDirection === SORT_DIRECTION_DECENDING ) {
                            return -1;
                        }
                        throw Error( "column_sortDirection Not Ascending or Descending, is: " + column_sortDirection );
                    }
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


