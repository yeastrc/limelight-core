/**
 * proteinPageStatsSection.tsx
 * 
 * Add Conditions Section
 * 
 * Shown when "Add Replicate" is clicked
 */


import React from 'react'
import {
    DataTable_Column,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
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
        {
            {
                const dataTable_Column = new DataTable_Column({
                    id : "numMS2scans", // Used for tracking sort order. Keep short
                    displayName : "#MS2 scans",
                    width : 85,
                    // sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            { // PSM Count
                const dataTable_Column = new DataTable_Column({
                    id : "psmNum", // Used for tracking sort order. Keep short
                    displayName : "Total #PSMs",
                    width : 87,
                    // sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            {  // Reported Peptide Id Count
                const dataTable_Column = new DataTable_Column({
                    id : "peptideNum", // Used for tracking sort order. Keep short
                    displayName : "Total #peptides",
                    width : 107,
                    // sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            { // Protein Count
                const dataTable_Column = new DataTable_Column({
                    id : "proteinNum", // Used for tracking sort order. Keep short
                    displayName : "Total #proteins",
                    width : 105,
                    // sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            { // Total #unmodified PSMs
                const dataTable_Column = new DataTable_Column({
                    id : "TotalNumUnmodifiedPSMs", // Used for tracking sort order. Keep short
                    displayName : "Total #unmodified PSMs",
                    width : 170,
                    // sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 },
                    // style_override_header_React : {},  // Optional
                    // style_override_React : {},  // Optional
                    // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                    // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                });
                dataTable_Columns.push( dataTable_Column );
            }
            { // Total #modified PSMs
                const dataTable_Column = new DataTable_Column({
                    id : "TotalNumModifiedPSMs", // Used for tracking sort order. Keep short
                    displayName : "Total #modified PSMs",
                    width : 148,
                    // sortable : true,
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
            const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
            {
                { // MS2 scans
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.ms2ScanCount.toLocaleString(),
                        valueSort: this.props.data.ms2ScanCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #PSMs
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.psmCount.toLocaleString(),
                        valueSort: this.props.data.psmCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #peptides
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.reportedPeptideCount.toLocaleString(),
                        valueSort: this.props.data.reportedPeptideCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #proteins
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.proteinCount.toLocaleString(),
                        valueSort: this.props.data.proteinCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #unmodified PSMs
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.psmsNoVariableModsCount.toLocaleString(),
                        valueSort: this.props.data.psmsNoVariableModsCount
                    })
                    columnEntries.push(columnEntry);
                }
                { // Total #modified PSMs
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay: this.props.data.psmsYesVariableModsCount.toLocaleString(),
                        valueSort: this.props.data.psmsYesVariableModsCount
                    })
                    columnEntries.push(columnEntry);
                }
            }

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId: 1,
                sortOrder_OnEquals: 1,
                columnEntries,
            })

            dataTable_DataRowEntries.push(dataTable_DataRowEntry);
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