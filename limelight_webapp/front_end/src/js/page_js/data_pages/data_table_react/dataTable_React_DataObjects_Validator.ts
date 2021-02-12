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

    if ( ! ( dataTable_RootTableObject instanceof DataTable_RootTableObject ) ) {
        const msg = "dataTable_React_DataObjects_Validator: dataTable_RootTableObject NOT instanceof DataTable_RootTableObject"
        console.warn( msg )
        throw Error( msg )
    }

    // throw Error if an error
    DataTable_RootTableObject.constructorDataValidation( dataTable_RootTableObject )


    const dataTableId = dataTable_RootTableObject.dataTableId

    const dataTable_TableOptions : DataTable_TableOptions = dataTable_RootTableObject.tableOptions

    if ( ! ( dataTable_TableOptions instanceof DataTable_TableOptions) ) {
        const msg = "dataTable_React_DataObjects_Validator: dataTable_TableOptions NOT instanceof DataTable_TableOptions"
        console.warn( msg )
        throw Error( msg )
    }

    const dataTable_RootTableDataObject : DataTable_RootTableDataObject = dataTable_RootTableObject.tableDataObject

    if ( ! ( dataTable_RootTableDataObject instanceof DataTable_RootTableDataObject) ) {
        const msg = "dataTable_React_DataObjects_Validator: dataTable_RootTableDataObject NOT instanceof DataTable_RootTableDataObject"
        console.warn( msg )
        throw Error( msg )
    }

    // throw Error if an error
    DataTable_RootTableDataObject.constructorDataValidation( dataTable_RootTableDataObject )

    const dataTable_ColumnEntries : Array<DataTable_Column> = dataTable_RootTableDataObject.columns
    const dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry> = dataTable_RootTableDataObject.dataTable_DataGroupRowEntries
    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = dataTable_RootTableDataObject.dataTable_DataRowEntries

    { // Validate dataTable_ColumnEntries

        const id_Values = new Set<string>()

        for (const dataTable_ColumnEntry of dataTable_ColumnEntries) {

            if (!(dataTable_ColumnEntry instanceof DataTable_Column)) {
                const msg = "dataTable_React_DataObjects_Validator: dataTable_ColumnEntry NOT instanceof DataTable_Column"
                console.warn(msg)
                throw Error(msg)
            }

            // throw Error if an error
            DataTable_Column.constructorDataValidation(dataTable_ColumnEntry)

            if ( id_Values.has( dataTable_ColumnEntry.id ) ) {
                const msg = "dataTable_React_DataObjects_Validator: dataTable_ColumnEntry.id same value found in more than one entry.  dataTable_ColumnEntry.id: " +
                    dataTable_ColumnEntry.id +
                    ", dataTableId: " + dataTableId
                console.warn( msg )
                throw Error( msg )
            }

            id_Values.add( dataTable_ColumnEntry.id )
        }
    }

    if ( dataTable_DataGroupRowEntries ) {

        return validate_dataTable_DataGroupRowEntries({ dataTable_DataGroupRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTable_RootTableDataObject, dataTableId })
    }

    return  validate_dataTable_DataRowEntries({ dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTable_RootTableDataObject, dataTableId })
}

/**
 * Data Table - dataTable_DataRowEntries
 *
 * @returns true if valid, otherwise false
 * @throws Throws Error for some errors
 */
const validate_dataTable_DataGroupRowEntries = function({ dataTable_DataGroupRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTable_RootTableDataObject, dataTableId } : {

    dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry>
    dataTable_ColumnEntries : Array<DataTable_Column>
    dataTable_TableOptions : DataTable_TableOptions
    dataTable_RootTableDataObject : DataTable_RootTableDataObject
    dataTableId : string
}) : void {

    const uniqueIdValues = new Set<string|number>()

    for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

        if ( ! ( dataTable_DataGroupRowEntry instanceof DataTable_DataGroupRowEntry) ) {
            const msg = "dataTable_React_DataObjects_Validator: dataTable_DataGroupRowEntry NOT instanceof DataTable_DataGroupRowEntry"
            console.warn( msg )
            throw Error( msg )
        }

        if ( uniqueIdValues.has( dataTable_DataGroupRowEntry.uniqueId ) ) {
            const msg = "dataTable_React_DataObjects_Validator: dataTable_DataGroupRowEntry.uniqueId same value found in more than one entry.  dataTable_DataGroupRowEntry.uniqueId: " +
                dataTable_DataGroupRowEntry.uniqueId +
                ", dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }

        uniqueIdValues.add( dataTable_DataGroupRowEntry.uniqueId )

        validate_dataTable_DataRowEntries({
            dataTable_DataRowEntries : dataTable_DataGroupRowEntry.dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTable_RootTableDataObject, dataTableId
        });
    }
}

/**
 * Data Table - dataTable_DataRowEntries
 *
 * @returns true if valid, otherwise false
 * @throws Throws Error for some errors
 */
const validate_dataTable_DataRowEntries = function({ dataTable_DataRowEntries, dataTable_ColumnEntries, dataTable_TableOptions, dataTable_RootTableDataObject, dataTableId } : {

    dataTable_DataRowEntries : Array<DataTable_DataRowEntry>  // Rows in Table or in Group
    dataTable_ColumnEntries : Array<DataTable_Column>    //  DataTable_Column - Column Def for each column in table
    dataTable_TableOptions : DataTable_TableOptions,
    dataTable_RootTableDataObject : DataTable_RootTableDataObject
    dataTableId : string
}) : void {

    const uniqueIdValues = new Set<string|number>()

    let tableRowCounter = 0; //  1 based.  NOT Currently Used

    for ( const dataTable_DataRowEntry of dataTable_DataRowEntries ) {

        tableRowCounter++

        if ( ! dataTable_DataRowEntry ) {
            const msg = "dataTable_React_DataObjects_Validator: dataTable_DataRowEntry NOT contain a value.  'if ( ! dataTable_DataRowEntry ) '. dataTable_DataRowEntry: "
            console.warn( msg, dataTable_DataRowEntry )
            throw Error( msg + dataTable_DataRowEntry )
        }

        if ( ! ( dataTable_DataRowEntry instanceof DataTable_DataRowEntry) ) {
            const msg = "dataTable_React_DataObjects_Validator: dataTable_DataRowEntry NOT instanceof DataTable_DataRowEntry. dataTable_DataRowEntry: "
            console.warn( msg, dataTable_DataRowEntry )
            throw Error( msg + dataTable_DataRowEntry )
        }

        if ( uniqueIdValues.has( dataTable_DataRowEntry.uniqueId ) ) {
            const msg = "dataTable_React_DataObjects_Validator: dataTable_DataRowEntry.uniqueId same value found in more than one entry.  dataTable_DataRowEntry.uniqueId: " +
                dataTable_DataRowEntry.uniqueId +
                ", dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }

        uniqueIdValues.add( dataTable_DataRowEntry.uniqueId )

        // throw Error if an error
        DataTable_DataRowEntry.constructorDataValidation(dataTable_DataRowEntry)

        //  Data in Table Options but not in row
        if ( dataTable_TableOptions.dataRowClickHandler && ( ! dataTable_DataRowEntry.tableRowClickHandlerParameter ) ) {
            const msg = "dataTable_TableOptions.dataRowClickHandler has value BUT dataTable_DataRowEntry.tableRowClickHandlerParameter does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_TableOptions.dataRow_GetChildTableData && ( ! dataTable_DataRowEntry.dataRow_GetChildTableDataParameter ) ) {
            const msg = "dataTable_TableOptions.dataRow_GetChildTableData has value BUT dataTable_DataRowEntry.dataRow_GetChildTableDataParameter does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_TableOptions.dataRow_GetChildTableData_ViaPromise && ( ! dataTable_DataRowEntry.dataRow_GetChildTableData_ViaPromise_Parameter ) ) {
            const msg = "dataTable_TableOptions.dataRow_GetChildTableData_ViaPromise has value BUT dataTable_DataRowEntry.dataRow_GetChildTableData_ViaPromise_Parameter does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        // Data in row but not in Table Options
        if ( dataTable_DataRowEntry.tableRowClickHandlerParameter && ( ! dataTable_TableOptions.dataRowClickHandler ) ) {
            const msg = "dataTable_DataRowEntry.tableRowClickHandlerParameter has value BUT dataTable_TableOptions.dataRowClickHandler does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_DataRowEntry.dataRow_GetChildTableDataParameter && ( ! dataTable_TableOptions.dataRow_GetChildTableData ) ) {
            const msg = "dataTable_DataRowEntry.dataRow_GetChildTableDataParameter has value BUT dataTable_TableOptions.dataRow_GetChildTableData does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }
        if ( dataTable_DataRowEntry.dataRow_GetChildTableData_ViaPromise_Parameter && ( ! dataTable_TableOptions.dataRow_GetChildTableData_ViaPromise ) ) {
            const msg = "dataTable_DataRowEntry.dataRow_GetChildTableData_ViaPromise_Parameter has value BUT dataTable_TableOptions.dataRow_GetChildTableData_ViaPromise does NOT have a value. dataTableId: " + dataTableId
            console.warn( msg )
            throw Error( msg )
        }

        // Data in row but not in dataTable_RootTableDataObject
        if ( ( dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor || dataTable_DataRowEntry.highlightRowWithBorderSolid || dataTable_DataRowEntry.highlightRowWithBorderDash )
            && ( ! dataTable_RootTableDataObject.highlightingOneOrMoreRowsWithBorder ) ) {
            const msg = "dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor || dataTable_DataRowEntry.highlightRowWithBorderSolid or dataTable_DataRowEntry.highlightRowWithBorderDash is true BUT dataTable_TableOptions.highlightingOneOrMoreRowsWithBorder is not true. dataTableId: " + dataTableId
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
                if ( ( dataTable_DataRow_ColumnEntry.valueDisplay === undefined || dataTable_DataRow_ColumnEntry.valueDisplay === null )
                    && (dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === undefined || dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === null) ) {
                    const msg = "dataTable_DataRow_ColumnEntry: Invalid value for valueDisplay: (valueDisplay === undefined || valueDisplay === null) && (dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === undefined || dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === null)  is true: valueDisplay: " +
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
