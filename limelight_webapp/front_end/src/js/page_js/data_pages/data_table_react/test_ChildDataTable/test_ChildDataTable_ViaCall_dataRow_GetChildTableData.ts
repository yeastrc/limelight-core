/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTableData.ts
 * 
 * Test creating a child data table using call to tableOptions.dataRow_GetChildTableData(...) which returns DataTable_RootTableObject
 */

import {
    DataTable_RootTableObject,

    DataTable_TableOptions,

    DataTable_Column,

    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable

} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//////////////////

const dataTableId_ThisTable = "Fake Child Table from Call dataRow_GetChildTableData() Root Table";





class FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting {
    fakedata: any

    shallowClone() {

        const clone = new FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting();
        // Object.assign( clone, this );
        clone.fakedata = this.fakedata;
        return clone;
    }
}


const fake_dataRow_GetChildTableData = ( dataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) : DataTable_RootTableObject => {
    if ( ! dataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTableData_RequestParm")
    }
    const dataRow_GetChildTableDataParameter_FromParam = dataTable_TableOptions_dataRow_GetChildTableData_RequestParm.dataRow_GetChildTableDataParameter;
    if ( ! dataRow_GetChildTableDataParameter_FromParam ) {
        throw Error("No value in dataRow_GetChildTableDataParameter_FromParam")
    }
    if ( ! ( dataRow_GetChildTableDataParameter_FromParam instanceof FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting ) ) {
        throw Error("Not: dataRow_GetChildTableDataParameter_FromParam instanceof FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting")
    }
    const dataRow_GetChildTableDataParameter = dataRow_GetChildTableDataParameter_FromParam as FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting
    // dataRow_GetChildTableDataParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTableDataParameter
    console.warn( "FAKE function fake_dataRow_GetChildTableData:  dataRow_GetChildTableData value: " , dataRow_GetChildTableDataParameter ) 
    console.warn( "FAKE function fake_dataRow_GetChildTableData:  dataRow_GetChildTableData.fakedata value: " , dataRow_GetChildTableDataParameter.fakedata )

    //
    // return as needed:
    //
    //     DataTable_RootTableDataObject_Both_ColumnArrays {
    //     dataTable_Columns : Array<DataTable_Column>
    //     dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable>
    // }

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "FAKE COLUMN";

        const dataTable_Column = new DataTable_Column({
            id : "repPeptStng", // Used for tracking sort order. Keep short
            displayName,
            width : 400,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "FAKE COLUMN 2";

        const dataTable_Column = new DataTable_Column({
            id : "repPeptStng2", // Used for tracking sort order. Keep short
            displayName,
            width : 410,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        {
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const valueDisplay = "row 1 col 1 val";
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : "row 1 col 1 val"
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            {
                const valueDisplay = "row 1 col 2 val";
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : "row 1 col 2 val"
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : 1,
                sortOrder_OnEquals : 1,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
        {
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const valueDisplay = "row 2 col 1 val";
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay ,
                    valueSort : "row 2 col 1 val"
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            {
                const valueDisplay = "row 2 col 2 val";
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : "row 2 col 2 val"
                })
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : 2,
                sortOrder_OnEquals : 2,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries
    });
    

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}


export { fake_dataRow_GetChildTableData, FAKE_DataRow_GetChildTableDataParameter_FakeChildTableTesting }
