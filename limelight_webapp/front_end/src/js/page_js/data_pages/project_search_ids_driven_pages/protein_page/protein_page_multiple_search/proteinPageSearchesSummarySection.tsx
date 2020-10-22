/**
 * proteinPageSearchesSummarySection.tsx
 *
 * Javascript for proteinView.jsp page -
 *
 */

import React from 'react';
import {
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
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
        {

            {
                const dataTable_Column = new DataTable_Column({
                    id : "search", // Used for tracking sort order. Keep short
                    displayName : "Search",
                    width : 500,
                    sortable : true,
                    style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }

            { // Protein Count for a single search
                const dataTable_Column = new DataTable_Column({
                    id : "proteinNum", // Used for tracking sort order. Keep short
                    displayName : "Protein Count",
                    width : 60,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            {  // Reported Peptide Id Count for a single search
                const dataTable_Column = new DataTable_Column({
                    id : "peptideNum", // Used for tracking sort order. Keep short
                    displayName : "Peptide Count",
                    width : 60,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            { // PSM Count for a single search
                const dataTable_Column = new DataTable_Column({
                    id : "psmNum", // Used for tracking sort order. Keep short
                    displayName : "PSM Count",
                    width : 60,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
        }

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
        {
            let index = 0;
            for ( const perSearchEntry of this.props.summarySectionData.perSearchEntries ) {

                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
                {
                    { // Protein Name
                        const searchNameDisplay = "(" + perSearchEntry.searchId + ") " + perSearchEntry.searchName;
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: searchNameDisplay,
                            valueSort: searchNameDisplay
                        })
                        columnEntries.push(columnEntry);
                    }
                    { // perSearchEntry.proteinCount_TotalForSearch
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: perSearchEntry.proteinCount_TotalForSearch.toLocaleString(),
                            valueSort: perSearchEntry.proteinCount_TotalForSearch
                        })
                        columnEntries.push(columnEntry);
                    }
                    { // perSearchEntry.reportedPeptideCount_TotalForSearch
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: perSearchEntry.reportedPeptideCount_TotalForSearch.toLocaleString(),
                            valueSort: perSearchEntry.reportedPeptideCount_TotalForSearch
                        })
                        columnEntries.push(columnEntry);
                    }
                    { // perSearchEntry.psmCount_TotalForSearch
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay: perSearchEntry.psmCount_TotalForSearch.toLocaleString(),
                            valueSort: perSearchEntry.psmCount_TotalForSearch
                        })
                        columnEntries.push(columnEntry);
                    }
                }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: perSearchEntry.searchId,
                    sortOrder_OnEquals: index,
                    columnEntries,
                })

                dataTable_DataRowEntries.push(dataTable_DataRowEntry);

                index++;
            }

        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns: dataTable_Columns,
            dataTable_DataRowEntries
        });

        const dataTable_TableOptions = new DataTable_TableOptions({});

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