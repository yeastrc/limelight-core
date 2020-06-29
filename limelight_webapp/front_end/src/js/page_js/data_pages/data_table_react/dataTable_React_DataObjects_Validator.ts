/**
 * dataTable_React_DataObjects_Validator.ts
 *
 * Used in Data Table React
 *
 * Validate data in object of class DataTable_RootTableObject and it's children
 *
 *    (DataTable_RootTableObject is in file dataTable_React_DataObjects.ts)
 */

import {
    DataTable_Column,
    DataTable_DataGroupRowEntry, DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


/**
 * Data Table - Root Table Object
 *
 * @throws Throws Error for some errors
 */
export const dataTable_React_DataObjects_Validator = function ({ dataTable_RootTableObject } : {

    dataTable_RootTableObject : DataTable_RootTableObject
}) : void {

    const dataTableId = dataTable_RootTableObject.dataTableId

    // throw Error if an error
    DataTable_RootTableObject.constructorDataValidation( dataTable_RootTableObject )

    const dataTable_TableOptions : DataTable_TableOptions = dataTable_RootTableObject.tableOptions
    const dataTable_RootTableDataObject : DataTable_RootTableDataObject = dataTable_RootTableObject.tableDataObject

    // throw Error if an error
    DataTable_RootTableDataObject.constructorDataValidation( dataTable_RootTableDataObject )

    const dataTable_ColumnEntries : Array<DataTable_Column> = dataTable_RootTableDataObject.columns
    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = dataTable_RootTableDataObject.dataTable_DataGroupRowEntries
    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = dataTable_RootTableDataObject.dataTable_DataRowEntries

    if ( dataTable_DataGroupRowEntries ) {

        return validate_dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTableId })
    }

    return  validate_dataTable_DataRowEntries({ dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTableId })
}

/**
 * Data Table - dataTable_DataRowEntries
 *
 * @returns true if valid, otherwise false
 * @throws Throws Error for some errors
 */
const validate_dataTable_DataGroupRowEntries = function({ dataTable_DataGroupRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTableId } : {

    dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry>
    dataTable_ColumnEntries : Array<DataTable_Column>
    dataTable_TableOptions : DataTable_TableOptions
    dataTableId : string
}) : void {

    for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

        validate_dataTable_DataRowEntries({ dataTable_DataRowEntries : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTableId });
    }
}

/**
 * Data Table - dataTable_DataRowEntries
 *
 * @returns true if valid, otherwise false
 * @throws Throws Error for some errors
 */
const validate_dataTable_DataRowEntries = function({ dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTableId } : {

    dataTable_DataRowEntries : Array<DataTable_DataRowEntry>  // Rows in Table or in Group
    dataTable_ColumnEntries : Array<DataTable_Column>    //  DataTable_Column - Column Def for each column in table
    dataTable_TableOptions : DataTable_TableOptions,
    dataTableId : string
}) : void {

    let tableRowCounter = 0; //  1 based.  NOT Currently Used

    for ( const dataTable_DataRowEntry of dataTable_DataRowEntries ) {

        tableRowCounter++

        // throw Error if an error
        DataTable_DataRowEntry.constructorDataValidation(dataTable_DataRowEntry)

        //  Data in Table Options but not in row
        if ( dataTable_TableOptions.dataRowClickHandler && ( ! dataTable_DataRowEntry.tableRowClickHandlerParameter ) ) {
            const msg = "dataTable_TableOptions.dataRowClickHandler has value BUT dataTable_DataRowEntry.tableRowClickHandlerParameter does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_TableOptions.dataRow_GetChildTableData && ( ! dataTable_DataRowEntry.childTableData ) ) {
            const msg = "dataTable_TableOptions.dataRow_GetChildTableData has value BUT dataTable_DataRowEntry.childTableData does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        // Data in row but not in Table Options
        if ( dataTable_DataRowEntry.tableRowClickHandlerParameter && ( ! dataTable_TableOptions.dataRowClickHandler ) ) {
            const msg = "dataTable_DataRowEntry.tableRowClickHandlerParameter has value BUT dataTable_TableOptions.dataRowClickHandler does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_DataRowEntry.childTableData && ( ! dataTable_TableOptions.dataRow_GetChildTableData ) ) {
            const msg = "dataTable_DataRowEntry.childTableData has value BUT dataTable_TableOptions.dataRow_GetChildTableData does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }

        const dataTable_DataRow_ColumnEntries : Array <DataTable_DataRow_ColumnEntry> = dataTable_DataRowEntry.columnEntries

        if ( dataTable_DataRow_ColumnEntries.length !== dataTable_ColumnEntries.length ) {
            const msg = "dataTable_DataRow_ColumnEntries.length !== dataTable_ColumnEntries.length.  dataTable_DataRow_ColumnEntries.length: " + dataTable_DataRow_ColumnEntries.length +
                ", dataTable_ColumnEntries.length: " + dataTable_ColumnEntries.length +
                ", dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }

        const dataTable_ColumnEntries_Iterator = dataTable_ColumnEntries.values()

        let columnCounter = 0 // 1 based.  NOT Currently Used

        for ( const dataTable_DataRow_ColumnEntry of dataTable_DataRow_ColumnEntries ) {

            columnCounter++

            const dataTable_ColumnEntries_Iterator_Result = dataTable_ColumnEntries_Iterator.next()
            if ( dataTable_ColumnEntries_Iterator_Result.done ) {
                const msg = "dataTable_ColumnEntries_Iterator.next() returned 'done' property true.  Should Never Happen. dataTableId: " + dataTableId
                console.warn( msg )
                throw Error( msg )
            }
            const dataTable_ColumnEntry : DataTable_Column = dataTable_ColumnEntries_Iterator_Result.value

            if ( dataTable_ColumnEntry.cellMgmt_External ) {
                if ( dataTable_DataRow_ColumnEntry.cellMgmt_External_Data === undefined || dataTable_DataRow_ColumnEntry.cellMgmt_External_Data === null ) {
                    const msg = "dataTable_DataRow_ColumnEntry: dataTable_ColumnEntry.cellMgmt_External has value, dataTable_DataRow_ColumnEntry.cellMgmt_External_Data does NOT have value " +
                        dataTable_DataRow_ColumnEntry.valueDisplay + ", dataTable_ColumnEntry.id " + dataTable_ColumnEntry.id + ", dataTableId: " + dataTableId + ", dataTable_DataRow_ColumnEntry: ";
                    console.warn(msg, dataTable_DataRow_ColumnEntry);
                    throw Error(msg)
                }
            } else if ( dataTable_ColumnEntry.cellMgmt_ExternalReactComponent ) {
                if (dataTable_DataRow_ColumnEntry.cellMgmt_ExternalReactComponent_Data === undefined || dataTable_DataRow_ColumnEntry.cellMgmt_ExternalReactComponent_Data === null ) {
                    const msg = "dataTable_DataRow_ColumnEntry: dataTable_ColumnEntry.cellMgmt_ExternalReactComponent has value, dataTable_DataRow_ColumnEntry.cellMgmt_ExternalReactComponent_Data does NOT have value " +
                        dataTable_DataRow_ColumnEntry.valueDisplay + ", dataTable_ColumnEntry.id " + dataTable_ColumnEntry.id + ", dataTableId: " + dataTableId + ", dataTable_DataRow_ColumnEntry: ";
                    console.warn(msg, dataTable_DataRow_ColumnEntry);
                    throw Error(msg)
                }
            } else {
                if ( dataTable_DataRow_ColumnEntry.valueDisplay === undefined || dataTable_DataRow_ColumnEntry.valueDisplay === null ) {
                    const msg = "dataTable_DataRow_ColumnEntry: Invalid value for valueDisplay: (valueDisplay === undefined || valueDisplay === null) is true: valueDisplay: " +
                        dataTable_DataRow_ColumnEntry.valueDisplay + ", dataTable_ColumnEntry.id " + dataTable_ColumnEntry.id + ", dataTableId: " + dataTableId + ", dataTable_DataRow_ColumnEntry: ";
                    console.warn(msg, dataTable_DataRow_ColumnEntry);
                    throw Error(msg)
                }
            }

            if ( dataTable_ColumnEntry.sortable ) {
                // Column Marked Sortable so property valueSort must have a value
                if ( dataTable_DataRow_ColumnEntry.valueSort === undefined || dataTable_DataRow_ColumnEntry.valueSort === null ) {
                    const msg = "Validator: column.sortable is true and dataObject_columnEntry.valueSort is undefined or null.  dataTable_DataRow_ColumnEntry.sortable: " +
                        dataTable_DataRow_ColumnEntry.valueSort + ", dataTableId: " + dataTableId;
                    console.warn( msg );
                    throw Error( msg );
                }
            }

            if ( dataTable_ColumnEntry.showHorizontalGraph ) {
                if ( ! variable_is_type_number_Check( dataTable_DataRow_ColumnEntry.valueSort ) ) {
                    const msg = "Validator: column.showHorizontalGraph is true and dataObject_columnEntry.valueSort is not a number.  dataTable_DataRow_ColumnEntry.valueSort: " +
                        dataTable_DataRow_ColumnEntry.valueSort + ", dataTableId: " + dataTableId;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( dataTable_DataRow_ColumnEntry.valueSort > dataTable_ColumnEntry.graphMaxValue ) {
                    const msg = (
                        "Validator: column.showHorizontalGraph is true and dataObject_columnEntry.valueSort is  > dataTable_ColumnEntry.graphMaxValue.  Graph will be max width.  dataTable_DataRow_ColumnEntry.valueSort: "
                        + dataTable_DataRow_ColumnEntry.valueSort
                        + ", dataTable_ColumnEntry.graphMaxValue: "
                        + dataTable_ColumnEntry.graphMaxValue
                        + ", dataTableId: " + dataTableId
                    );
                    console.warn( msg );
                }
            }
        }

    }
}
