/**
 * proteinPageSearchesSummarySection.tsx
 *
 * Javascript for proteinView.jsp page -
 *
 */

import React from 'react';
import {
    DataTable_Column, DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry, DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry, DataTable_DataRowEntry_DownloadTable, DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";



/**
 *
 */
export class ProteinPageSearchesSummarySectionData_Root {

    perSearchEntries : Array<ProteinPageSearchesSummarySectionData_PerSearchEntry>
}

/**
 *
 */
export class ProteinPageSearchesSummarySectionData_PerSearchEntry {

    searchId : number
    searchName : string
    proteinCount_TotalForSearch : number = 0;
    reportedPeptideCount_TotalForSearch : number = 0;
    psmCount_TotalForSearch : number = 0;
}


export interface ProteinPageSearchesSummarySectionData_Component_Props {

    summarySectionData : ProteinPageSearchesSummarySectionData_Root
}

/**
 *
 */
export class ProteinPageSearchesSummarySectionData_Component extends React.Component< ProteinPageSearchesSummarySectionData_Component_Props, {} > {

    constructor(props : ProteinPageSearchesSummarySectionData_Component_Props) {
        super(props);

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
                const displayName = "Search";

                const dataTable_Column = new DataTable_Column({
                    id : "search", // Used for tracking sort order. Keep short
                    displayName,
                    width : 500,
                    sortable : true,
                    style_override_DataRowCell_React : { whiteSpace: "nowrap", overflowX: "auto" }
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            { // Protein Count for a single search

                const displayName = "Protein Count";

                const dataTable_Column = new DataTable_Column({
                    id : "proteinNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 60,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  // Reported Peptide Id Count for a single search

                const displayName = "Peptide Count";

                const dataTable_Column = new DataTable_Column({
                    id : "peptideNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 60,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // PSM Count for a single search

                const displayName = "PSM Count";

                const dataTable_Column = new DataTable_Column({
                    id : "psmNum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 60,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
        {
            let index = 0;
            for ( const perSearchEntry of this.props.summarySectionData.perSearchEntries ) {

                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
                const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                {
                    { // Search Name
                        const searchNameDisplay = "(" + perSearchEntry.searchId + ") " + perSearchEntry.searchName;
                        const valueDisplay = searchNameDisplay;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: searchNameDisplay,
                            tooltipText: searchNameDisplay
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    { // perSearchEntry.proteinCount_TotalForSearch
                        const valueDisplay = perSearchEntry.proteinCount_TotalForSearch.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: perSearchEntry.proteinCount_TotalForSearch
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    { // perSearchEntry.reportedPeptideCount_TotalForSearch
                        const valueDisplay = perSearchEntry.reportedPeptideCount_TotalForSearch.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: perSearchEntry.reportedPeptideCount_TotalForSearch
                        })
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    { // perSearchEntry.psmCount_TotalForSearch
                        const valueDisplay = perSearchEntry.psmCount_TotalForSearch.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: perSearchEntry.psmCount_TotalForSearch
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: perSearchEntry.searchId,
                    sortOrder_OnEquals: index,
                    columnEntries,
                    dataTable_DataRowEntry_DownloadTable
                })

                dataTable_DataRowEntries.push(dataTable_DataRowEntry);

                index++;
            }

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

        return (
            <div style={ { marginBottom: 10 } }>
                <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                    Summary Data Per Search
                </div>
                <DataTable_TableRoot
                    tableObject={ dataTable_RootTableObject }
                />
            </div>
        );

    }

}