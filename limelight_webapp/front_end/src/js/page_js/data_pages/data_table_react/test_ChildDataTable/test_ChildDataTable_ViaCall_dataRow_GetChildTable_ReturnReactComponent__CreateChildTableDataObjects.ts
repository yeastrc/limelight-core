/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects.ts
 * 
 * Create the Data Table objects for use in Data Table in FAKE_dataRow_ChildTable_ReactComponent from file test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Test creating a React Cmponent that is shown for show/hide row child data using call to tableOptions.dataRow_GetChildTable_ReturnReactComponent(...) which returns React.Component
 */


import {

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


const dataTableId_ThisTable = "Fake Child Table from Call dataRow_GetChildTable_ReturnReactComponent() Root Table";


/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects.ts
 * 
 * Create the Data Table objects for use in Data Table in FAKE_dataRow_ChildTable_ReactComponent from file test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Test creating a React Cmponent that is shown for show/hide row child data using call to tableOptions.dataRow_GetChildTable_ReturnReactComponent(...) which returns React.Component
 */
export const fake_Create_ChildTableData = () : DataTable_RootTableObject => {

    const dataTable_Columns : Array<DataTable_Column> = [];

    {
        const dataTable_Column = new DataTable_Column({
            id : "repPeptStng", // Used for tracking sort order. Keep short
            displayName : "FAKE COLUMN",
            width : 400,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    {
        const dataTable_Column = new DataTable_Column({
            id : "repPeptStng2", // Used for tracking sort order. Keep short
            displayName : "FAKE COLUMN 2",
            width : 410,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        {
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : "row 1 col 1 val : child data table in Containing React Component",
                    valueSort : "row 1 col 1 val"
                })
                columnEntries.push( columnEntry );
            }
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : "row 1 col 2 val : no actual child table",
                    valueSort : "row 1 col 2 val"
                })
                columnEntries.push( columnEntry );
            }

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : 1,
                sortOrder_OnEquals : 1,
                columnEntries,
                dataRow_GetChildTableDataParameter : {}
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
        {
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : "row 2 col 1 val",
                    valueSort : "row 2 col 1 val"
                })
                columnEntries.push( columnEntry );
            }
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : "row 2 col 2 val: no actual child table",
                    valueSort : "row 2 col 2 val"
                })
                columnEntries.push( columnEntry );
            }

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : 2,
                sortOrder_OnEquals : 2,
                columnEntries,
                dataRow_GetChildTableDataParameter : {}
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries : dataTable_DataRowEntries
    });
    
    const fake_dataRow_GetChildTableData = ( param: DataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) : DataTable_RootTableObject => { return null }

    const tableOptions = new DataTable_TableOptions({
        //  Comment out since no further drill down to child table
        dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
