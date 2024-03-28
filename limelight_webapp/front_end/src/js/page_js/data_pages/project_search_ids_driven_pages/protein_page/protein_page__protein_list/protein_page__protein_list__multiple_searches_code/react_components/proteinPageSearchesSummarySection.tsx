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
import {ProteinDisplayData_From_createProteinDisplayData_ProteinList} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {proteinPageSearchesSummarySection__Compute_DisplayData} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/protein_page__protein_list__multiple_searches_code/react_components/proteinPageSearchesSummarySection__Compute_DisplayData";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";



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
    distinct_PeptideCount_TotalForSearch : number = 0;
    psmCount_TotalForSearch : number = 0;
    distinct_ScanCount_TotalForSearch : number = 0;
}


export interface ProteinPageSearchesSummarySectionData_Component_Props {

    proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    projectSearchIds : Array<number>
    dataPageStateManager : DataPageStateManager
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

}


interface ProteinPageSearchesSummarySectionData_Component_State {

    dataTable_RootTableObject? : DataTable_RootTableObject
}

/**
 *
 */
export class ProteinPageSearchesSummarySectionData_Component extends React.Component< ProteinPageSearchesSummarySectionData_Component_Props, ProteinPageSearchesSummarySectionData_Component_State > {

    constructor(props : ProteinPageSearchesSummarySectionData_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    componentDidMount() {

        this._get_Data_CallToGet_dataTable_RootTableObject();
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<ProteinPageSearchesSummarySectionData_Component_Props>, nextState: Readonly<ProteinPageSearchesSummarySectionData_Component_State>, nextContext: any): boolean {

        if (
            nextProps.proteinDisplayData !== this.props.proteinDisplayData
            || nextState.dataTable_RootTableObject !== this.state.dataTable_RootTableObject
        ) {
            return true;
        }
        return false
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ProteinPageSearchesSummarySectionData_Component_Props>, prevState: Readonly<ProteinPageSearchesSummarySectionData_Component_State>, snapshot?: any) {
        if (
            prevProps.proteinDisplayData !== this.props.proteinDisplayData
        ) {
            this._get_Data_CallToGet_dataTable_RootTableObject();
        }
    }

    /**
     *
     */
    private _get_Data_CallToGet_dataTable_RootTableObject() {

        if ( ! this.props.proteinDisplayData.summaryMap_Key_ProjectSearchId ) {
            //  Summary data not populated yet so skip
            return; // EARLY RETURN
        }

        const proteinPageSearchesSummarySection__Compute_DisplayData__Result = proteinPageSearchesSummarySection__Compute_DisplayData({
            proteinDisplayData: this.props.proteinDisplayData,
            projectSearchIds: this.props.projectSearchIds,
            dataPageStateManager: this.props.dataPageStateManager,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        if ( proteinPageSearchesSummarySection__Compute_DisplayData__Result.data ) {

            const summarySectionData = proteinPageSearchesSummarySection__Compute_DisplayData__Result.data

            const dataTable_RootTableObject = this._getDataTable_RootTableObject({ summarySectionData });
            this.setState({ dataTable_RootTableObject })

        } else if ( proteinPageSearchesSummarySection__Compute_DisplayData__Result.promise ) {

            proteinPageSearchesSummarySection__Compute_DisplayData__Result.promise.catch(reason => {  });
            proteinPageSearchesSummarySection__Compute_DisplayData__Result.promise.then(value => { try {

                const summarySectionData = value

                const dataTable_RootTableObject = this._getDataTable_RootTableObject({ summarySectionData });
                this.setState({ dataTable_RootTableObject })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } else {
            throw Error("proteinPageSearchesSummarySection__Compute_DisplayData__Result no data or promise")
        }
    }

    /**
     *
     */
    private _getDataTable_RootTableObject(
        {
            summarySectionData
        } : {
            summarySectionData: ProteinPageSearchesSummarySectionData_Root
        }
    ) : DataTable_RootTableObject {

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {

            {
                const displayName = "Search";

                const dataTable_Column = new DataTable_Column({
                    id : "search", // Used for tracking sort order. Keep short
                    displayName,
                    width : 500,
                    sortable : true
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
            { // Distinct Scan Count for a single search

                const displayName = "Distinct Scan Count";

                const dataTable_Column = new DataTable_Column({
                    id : "scanNum", // Used for tracking sort order. Keep short
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
            for ( const perSearchEntry of summarySectionData.perSearchEntries ) {

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
                        const valueDisplay = perSearchEntry.distinct_PeptideCount_TotalForSearch.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: perSearchEntry.distinct_PeptideCount_TotalForSearch
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
                    { // perSearchEntry.distinct_ScanCount_TotalForSearch
                        const valueDisplay = perSearchEntry.distinct_ScanCount_TotalForSearch.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: perSearchEntry.distinct_ScanCount_TotalForSearch
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

        return (
            <div style={ { marginBottom: 10 } }>
                <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                    Summary Data Per Search
                </div>
                { ( ! this.state.dataTable_RootTableObject ) ? (
                    <div>
                        Loading Data...
                    </div>
                ) : (
                    <DataTable_TableRoot
                        tableObject={ this.state.dataTable_RootTableObject }
                    />
                )}
            </div>
        );

    }

}

