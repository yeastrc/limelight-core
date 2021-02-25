/**
 * proteinPageStatsSection.tsx
 * 
 * Add Conditions Section
 * 
 * Shown when "Add Replicate" is clicked
 */


import React from 'react'
import {
    DataTable_Column, DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry, DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry, DataTable_DataRowEntry_DownloadTable, DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";


export interface ProteinViewPage_StatsSection_Props {

    searchContainsSubGroups : boolean
    data: any
}

/**
 * 
 */
export class ProteinViewPage_StatsSection extends React.Component< ProteinViewPage_StatsSection_Props, {} > {

    constructor(props : ProteinViewPage_StatsSection_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._mainCellClickHandler_BindThis = this._mainCellClickHandler.bind(this);
        
        this.state = {
        };
    }


    /**
     *
     */
    private _getDataTable_RootTableObject() : DataTable_RootTableObject {

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];
        {
            {
                const displayName = "#MS2 scans";

                const dataTable_Column = new DataTable_Column({
                    id : "numMS2scans", // Used for tracking sort order. Keep short
                    displayName,
                    width : 85
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // PSM Count
                const displayName = "Total #PSMs";

                const dataTable_Column = new DataTable_Column({
                    id : "psmNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 87
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  // Reported Peptide Id Count
                const displayName = "Total #peptides";

                const dataTable_Column = new DataTable_Column({
                    id : "peptideNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 107
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // Protein Count
                const displayName = "Total #proteins";

                const dataTable_Column = new DataTable_Column({
                    id : "proteinNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 105
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // Total #unmodified PSMs
                const displayName = "Total #unmodified PSMs";

                const dataTable_Column = new DataTable_Column({
                    id : "TotalNumUnmodifiedPSMs", // Used for tracking sort order. Keep short
                    displayName,
                    width : 170
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // Total #modified PSMs
                const displayName = "Total #modified PSMs";

                const dataTable_Column = new DataTable_Column({
                    id : "TotalNumModifiedPSMs", // Used for tracking sort order. Keep short
                    displayName,
                    width : 148
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
        {
            const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                { // MS2 scans
                    const valueDisplay = this.props.data.ms2ScanCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.ms2ScanCount
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                { // Total #PSMs
                    const valueDisplay = this.props.data.psmCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.psmCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #peptides
                    const valueDisplay = this.props.data.reportedPeptideCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.reportedPeptideCount
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                { // Total #proteins
                    const valueDisplay = this.props.data.proteinCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.proteinCount
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                { // Total #unmodified PSMs
                    const valueDisplay = this.props.data.psmsNoVariableModsCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.psmsNoVariableModsCount
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                { // Total #modified PSMs
                    const valueDisplay = this.props.data.psmsYesVariableModsCount.toLocaleString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: this.props.data.psmsYesVariableModsCount
                    })
                    columnEntries.push(columnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
            }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId: 1,
                sortOrder_OnEquals: 1,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable
            })

            dataTable_DataRowEntries.push(dataTable_DataRowEntry);
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns: dataTable_Columns,
            columns_tableDownload : dataTable_Column_DownloadTable_Entries,
            dataTable_DataRowEntries
        });

        const dataTable_TableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            tableDataObject : dataTable_RootTableDataObject,
            dataTableId : "Per Search Summary Table",
            tableOptions : dataTable_TableOptions
        })

        return dataTable_RootTableObject;
    }

    /**
     * 
     */
    render () {

        const dataTable_RootTableObject = this._getDataTable_RootTableObject();

        let subGroupsDisclaimer : JSX.Element = null;

        if ( this.props.searchContainsSubGroups ) {

            subGroupsDisclaimer = (
                <div >
                    The Search Stats are not filtered using the selections of "Sub Groups".
                </div>
            )
        }

        return (
            <div style={ { marginBottom: 10 } }>
                { subGroupsDisclaimer }
                <DataTable_TableRoot
                    tableObject={ dataTable_RootTableObject }
                />
            </div>
        );

    }

}