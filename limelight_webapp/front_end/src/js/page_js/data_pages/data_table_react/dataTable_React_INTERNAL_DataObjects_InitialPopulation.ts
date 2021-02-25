/**
 * dataTable_React_INTERNAL_DataObjects_InitialPopulation.ts
 *
 * Create DataTable_INTERNAL_RootTableObject and children from DataTable_RootTableObject
 */

import {
    DataTable_DataGroupRowEntry, DataTable_DataRowEntry, DataTable_RootTableDataObject
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    DataTable_INTERNAL_DataGroupRowEntry,
    DataTable_INTERNAL_DataRowEntry,
    DataTable_INTERNAL_RootTableDataObject,
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";

/**
 *
 */
export const dataTable_React_INTERNAL_DataObjects_InitialPopulation = function (
    {
        dataTable_RootTableDataObject
    } : {
        dataTable_RootTableDataObject: DataTable_RootTableDataObject
    }) : DataTable_INTERNAL_RootTableDataObject {

    const dataTable_DataGroupRowEntries__INTERNAL_All = create__dataTable_DataGroupRowEntries__INTERNAL_All({ dataTable_DataGroupRowEntries: dataTable_RootTableDataObject.dataTable_DataGroupRowEntries });
    const dataTable_DataRowEntries__INTERNAL_All = create__dataTable_DataRowEntries__INTERNAL({ dataTable_DataRowEntries: dataTable_RootTableDataObject.dataTable_DataRowEntries });

    const highlightingOneOrMoreRowsWithBorder = _compute_highlightingOneOrMoreRowsWithBorder({ dataTable_RootTableDataObject });

    const dataTable_INTERNAL_RootTableDataObject = new DataTable_INTERNAL_RootTableDataObject({
        dataTable_RootTableDataObject : dataTable_RootTableDataObject,
        dataTable_DataGroupRowEntries__INTERNAL_All,
        dataTable_DataRowEntries__INTERNAL_All,
        highlightingOneOrMoreRowsWithBorder
    })

    return dataTable_INTERNAL_RootTableDataObject;
}

/**
 *
 * @param dataTable_RootTableObject
 */
const _compute_highlightingOneOrMoreRowsWithBorder = function (
    {
        dataTable_RootTableDataObject
    } : {
        dataTable_RootTableDataObject: DataTable_RootTableDataObject
    }) : boolean {

    const dataTable_DataGroupRowEntries = dataTable_RootTableDataObject.dataTable_DataGroupRowEntries;
    const dataTable_DataRowEntries = dataTable_RootTableDataObject.dataTable_DataRowEntries;

    if ( dataTable_DataRowEntries ) {
        //  Have dataTable_DataRowEntries so return result
        return _compute_highlightingOneOrMoreRowsWithBorder__For_dataTable_DataRowEntries({ dataTable_DataRowEntries });
    }

    for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {
        const dataTable_DataRowEntries = dataTable_DataGroupRowEntry.dataTable_DataRowEntries;
        const highlightingOneOrMoreRowsWithBorder_FOR_GROUP = _compute_highlightingOneOrMoreRowsWithBorder__For_dataTable_DataRowEntries({ dataTable_DataRowEntries });
        if ( highlightingOneOrMoreRowsWithBorder_FOR_GROUP ) {
            //  Set highlightingOneOrMoreRowsWithBorder at table level to true
            return true; // EARLY RETURN
        }
    }
    return false; //  Set highlightingOneOrMoreRowsWithBorder at table level to false
}

/**
 *
 * @param dataTable_DataRowEntries
 */
const _compute_highlightingOneOrMoreRowsWithBorder__For_dataTable_DataRowEntries = function (
    {
        dataTable_DataRowEntries
    }: {
        dataTable_DataRowEntries : Array<DataTable_DataRowEntry>

    }) : boolean {

    if (!dataTable_DataRowEntries) {
        //  NO input data
        throw Error("_compute_highlightingOneOrMoreRowsWithBorder__For_dataTable_DataRowEntries: (!dataTable_DataRowEntries)");
    }

    for ( const dataTable_DataRowEntry of dataTable_DataRowEntries ) {

        if ( dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor || dataTable_DataRowEntry.highlightRowWithBorderSolid || dataTable_DataRowEntry.highlightRowWithBorderDash ) {
            //  Set highlightingOneOrMoreRowsWithBorder at table level to true
            return true; // EARLY RETURN
        }
    }

    return false; //  Set highlightingOneOrMoreRowsWithBorder at table level to false
}


/**
 *
 * @param dataTable_DataGroupRowEntries
 */
const create__dataTable_DataGroupRowEntries__INTERNAL_All = function (
    {
        dataTable_DataGroupRowEntries
    }: {
        dataTable_DataGroupRowEntries : Array<DataTable_DataGroupRowEntry>

    }) : Array<DataTable_INTERNAL_DataGroupRowEntry> {

    if ( ! dataTable_DataGroupRowEntries ) {
        //  NO input data so just return
        return null;  // EARLY RETURN
    }

    const dataTable_DataGroupRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataGroupRowEntry> = [];

    for ( const dataTable_DataGroupRowEntry of dataTable_DataGroupRowEntries ) {

        const dataTable_DataRowEntries__INTERNAL = create__dataTable_DataRowEntries__INTERNAL({ dataTable_DataRowEntries: dataTable_DataGroupRowEntry.dataTable_DataRowEntries })

        const dataTable_INTERNAL_DataGroupRowEntry = new DataTable_INTERNAL_DataGroupRowEntry({ dataTable_DataGroupRowEntry, dataTable_DataRowEntries__INTERNAL });
        dataTable_DataGroupRowEntries__INTERNAL_All.push( dataTable_INTERNAL_DataGroupRowEntry );
    }

    return dataTable_DataGroupRowEntries__INTERNAL_All;
}

/**
 *
 * @param dataTable_DataRowEntries
 */
const create__dataTable_DataRowEntries__INTERNAL = function (
    {
        dataTable_DataRowEntries
    }: {
        dataTable_DataRowEntries : Array<DataTable_DataRowEntry>

    }) : Array<DataTable_INTERNAL_DataRowEntry> {

    if ( ! dataTable_DataRowEntries ) {
        //  NO input data so just return
        return null;  // EARLY RETURN
    }

    const dataTable_DataRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataRowEntry> = [];

    for ( const dataTable_DataRowEntry of dataTable_DataRowEntries ) {

        const dataTable_INTERNAL_DataRowEntry = new DataTable_INTERNAL_DataRowEntry({ dataTable_DataRowEntry });
        dataTable_DataRowEntries__INTERNAL_All.push( dataTable_INTERNAL_DataRowEntry );
    }

    return dataTable_DataRowEntries__INTERNAL_All;
}