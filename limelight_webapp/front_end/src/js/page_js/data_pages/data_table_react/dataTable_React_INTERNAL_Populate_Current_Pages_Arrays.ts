/**
 * dataTable_React_INTERNAL_Populate_Current_Pages_Arrays.ts
 *
 * Populate DataTable_INTERNAL_RootTableDataObject properties
 *      dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged
 *      dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged
 */

import {
    DataTable_INTERNAL_DataGroupRowEntries_SinglePage,
    DataTable_INTERNAL_DataGroupRowEntry, DataTable_INTERNAL_DataRowEntries_SinglePage,
    DataTable_INTERNAL_DataRowEntry,
    DataTable_INTERNAL_RootTableDataObject
} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";

/**
 *
 */
export const dataTable_React_INTERNAL_Populate_Current_Pages_Arrays = function (
    {
        dataTable_INTERNAL_RootTableDataObject, itemsPerPage_Count, enable_Pagination_Download_Search
    } : {
        dataTable_INTERNAL_RootTableDataObject: DataTable_INTERNAL_RootTableDataObject
        itemsPerPage_Count : number
        enable_Pagination_Download_Search: boolean

    }) : DataTable_INTERNAL_RootTableDataObject {

    const dataTable_INTERNAL_RootTableDataObject_New = dataTable_INTERNAL_RootTableDataObject.shallowClone();

    if ( dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing ) {

        dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged =
            get_dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged({
                dataTable_DataRowEntries__INTERNAL_CurrentlyShowing : dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing,
                itemsPerPage_Count,
                enable_Pagination_Download_Search
            });

    } else if ( dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {




        dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged =
            get_dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged({
                dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing : dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing,
                itemsPerPage_Count,
                enable_Pagination_Download_Search
            });

    } else {

        const msg = "dataTable_React_INTERNAL_Populate_Current_Pages_Arrays: Neither are populated: dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing, dataTable_INTERNAL_RootTableDataObject_New.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing";
        console.warn( msg );
        throw Error( msg );
    }

    //  Return updated object
    return dataTable_INTERNAL_RootTableDataObject_New;
}


/**
 *
 */
const get_dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged = function(
    {
        dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing, itemsPerPage_Count, enable_Pagination_Download_Search
    } : {
        dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing :  Array<DataTable_INTERNAL_DataGroupRowEntry>
        itemsPerPage_Count : number
        enable_Pagination_Download_Search: boolean

    }) : Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage> {

    //  Page the data

    //   Page on Data Groups

    const result : Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage> = [];

    let itemsCountTotal = 0;
    let itemCount_pageStart = 1;

    let dataTable_INTERNAL_DataGroupRowEntries : Array<DataTable_INTERNAL_DataGroupRowEntry> = [];

    for ( const entry of dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {

        itemsCountTotal++;

        dataTable_INTERNAL_DataGroupRowEntries.push( entry );

        if ( enable_Pagination_Download_Search && ( itemsCountTotal % itemsPerPage_Count === 0 ) ) {

            const resultEntry = new DataTable_INTERNAL_DataGroupRowEntries_SinglePage({ dataTable_INTERNAL_DataGroupRowEntries, itemCount_pageStart, itemCount_pageEnd : itemsCountTotal });
            result.push( resultEntry );

            //  reset
            itemCount_pageStart = itemsCountTotal + 1; // Start at next entry
            dataTable_INTERNAL_DataGroupRowEntries = [];
        }
    }

    if ( dataTable_INTERNAL_DataGroupRowEntries.length > 0 ) {
        // Save final page if any entries
        const resultEntry = new DataTable_INTERNAL_DataGroupRowEntries_SinglePage({ dataTable_INTERNAL_DataGroupRowEntries, itemCount_pageStart, itemCount_pageEnd : itemsCountTotal });
        result.push( resultEntry );
    }

    //   WAS:  Page Data on Number of Data Rows Per Page, keeping all Data Rows for a Group together

    // const result : Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage> = [];
    //
    // let dataRowEntries_CountTotal = 0;
    // let dataRowEntries_Count_ForPage = 0;
    // let dataRowEntries_Count_pageStart = 1;
    //
    // let dataTable_INTERNAL_DataGroupRowEntries : Array<DataTable_INTERNAL_DataGroupRowEntry> = [];
    //
    // for ( const entry of dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing ) {
    //
    //     const dataRowEntriesInGroup_Count = entry.dataTable_DataRowEntries__INTERNAL.length;
    //
    //     dataRowEntries_CountTotal += dataRowEntriesInGroup_Count;
    //     dataRowEntries_Count_ForPage += dataRowEntriesInGroup_Count;
    //
    //     dataTable_INTERNAL_DataGroupRowEntries.push( entry );
    //
    //     if ( enable_Pagination_Download_Search && ( dataRowEntries_Count_ForPage >= itemsPerPage_Count ) ) {
    //
    //         const resultEntry = new DataTable_INTERNAL_DataGroupRowEntries_SinglePage({
    //             dataTable_INTERNAL_DataGroupRowEntries: dataTable_INTERNAL_DataGroupRowEntries, itemCount_pageStart: dataRowEntries_Count_pageStart, itemCount_pageEnd : dataRowEntries_CountTotal
    //         });
    //         result.push( resultEntry );
    //
    //         //  reset
    //         dataRowEntries_Count_ForPage = 0;
    //         dataRowEntries_Count_pageStart = dataRowEntries_CountTotal + 1; // Start at next entry
    //         dataTable_INTERNAL_DataGroupRowEntries = [];
    //     }
    // }
    //
    // if ( dataTable_INTERNAL_DataGroupRowEntries.length > 0 ) {
    //     // Save final page if any entries
    //     const resultEntry = new DataTable_INTERNAL_DataGroupRowEntries_SinglePage({
    //         dataTable_INTERNAL_DataGroupRowEntries: dataTable_INTERNAL_DataGroupRowEntries, itemCount_pageStart: dataRowEntries_Count_pageStart, itemCount_pageEnd : dataRowEntries_CountTotal
    //     });
    //     result.push( resultEntry );
    // }

    return result;

}


/**
 *
 */
const get_dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged = function(
    {
        dataTable_DataRowEntries__INTERNAL_CurrentlyShowing, itemsPerPage_Count, enable_Pagination_Download_Search
    } : {
        dataTable_DataRowEntries__INTERNAL_CurrentlyShowing :  Array<DataTable_INTERNAL_DataRowEntry>
        itemsPerPage_Count : number
        enable_Pagination_Download_Search: boolean

    }) : Array<DataTable_INTERNAL_DataRowEntries_SinglePage> {

    //  Page the data

    const result : Array<DataTable_INTERNAL_DataRowEntries_SinglePage> = [];

    let itemsCountTotal = 0;
    let itemCount_pageStart = 1;

    let dataTable_INTERNAL_DataRowEntries : Array<DataTable_INTERNAL_DataRowEntry> = [];

    for ( const entry of dataTable_DataRowEntries__INTERNAL_CurrentlyShowing ) {

        itemsCountTotal++;

        dataTable_INTERNAL_DataRowEntries.push( entry );

        if ( enable_Pagination_Download_Search && ( itemsCountTotal % itemsPerPage_Count === 0 ) ) {

            const resultEntry = new DataTable_INTERNAL_DataRowEntries_SinglePage({ dataTable_INTERNAL_DataRowEntries, itemCount_pageStart, itemCount_pageEnd : itemsCountTotal });
            result.push( resultEntry );

            //  reset
            itemCount_pageStart = itemsCountTotal + 1; // Start at next entry
            dataTable_INTERNAL_DataRowEntries = [];
        }
    }

    if ( dataTable_INTERNAL_DataRowEntries.length > 0 ) {
        // Save final page if any entries
        const resultEntry = new DataTable_INTERNAL_DataRowEntries_SinglePage({ dataTable_INTERNAL_DataRowEntries, itemCount_pageStart, itemCount_pageEnd : itemsCountTotal });
        result.push( resultEntry );
    }

    return result;
}
