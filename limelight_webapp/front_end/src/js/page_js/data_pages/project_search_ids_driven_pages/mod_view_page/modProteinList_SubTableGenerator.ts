import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ModProteinList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableProperties";
import {
    ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry,
    ModViewDataManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ReportedPeptide} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {ModProteinSearchList_SubTableGenerator} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchList_SubTableGenerator";
import {ModProteinSearchList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchList_SubTableProperties";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModProteinSearchPeptideList_SubTableGenerator,
    UnlocalizedStartEnd
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableGenerator";
import {ModProteinSearchPeptideList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableProperties";
import {ModDataUtils} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataUtils";
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {ModViewDataUtilities} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {
    modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents,
    modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableGenerator_Cell_Components";
import {get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_SingleProtein_Embed_in_ModPage_Root";


export class ModProteinList_SubTableGenerator {

    static async getProteinListSubTable(params:ModProteinList_SubTableProperties):Promise<DataTable_RootTableObject> {

        const dataTableId_ThisTable = "Mod View Protein List Sub Table";

        const modMass:number = params.modMass;
        const modViewDataManager:ModViewDataManager = params.modViewDataManager;
        const vizOptionsData = params.vizOptionsData;
        const dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;

        // create the columns for the table
        const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = await ModProteinList_SubTableGenerator.getDataTableColumns({
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        });

        // create the rows for the table
        const dataTableRows : Array<DataTable_DataRowEntry> = await ModProteinList_SubTableGenerator.getDataTableRows({
            modViewDataManager,
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        });

        // assemble the table
        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
            columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
            dataTable_DataRowEntries: dataTableRows
        });

        const tableOptions = new DataTable_TableOptions({ enable_Pagination_Download_Search: false, enable_Download: true });

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        return dataTable_RootTableObject;
    }

    private static async getDataTableColumns(
        {
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        }:{
            vizOptionsData : ModView_VizOptionsData,
            modMass:number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }
    ) : Promise<DataTable_RootTableDataObject_Both_ColumnArrays> {

        const dataTableColumns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {
            const displayName = "Protein";

            const dataTableColumn = new DataTable_Column({
                id : "proteinName", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTableColumns.push( dataTableColumn );

            const displayName_Download = "Protein Name";

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName_Download });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {
            //  Download ONLY  --  Protein Description

            const displayName_Download = "Protein Description";

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName_Download });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {
            const displayName = "Positions";

            const dataTableColumn = new DataTable_Column({
                id : "modPos", // Used for tracking sort order. Keep short
                displayName,
                width : 100,
                sortable : false
            });
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {
            const displayName = "Residues";

            const dataTableColumn = new DataTable_Column({
                id : "modRes", // Used for tracking sort order. Keep short
                displayName,
                width : 100,
                sortable : false
            });
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        for(const projectSearchId of projectSearchIds) {
            const searchIdXorShortName = ModDataUtils.getSearchShortNameXorSearchIdForProjectSearchId({projectSearchId, dataPageStateManager_DataFrom_Server});

            const displayName = "PSM Count (" + searchIdXorShortName + ")";

            const dataTableColumn = new DataTable_Column({
                id : projectSearchId + '-' + modMass + '-psms', // Used for tracking sort order. Keep short
                displayName,
                width : 100,
                sortable : true
            });
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns : dataTableColumns, columns_tableDownload : dataTable_Column_DownloadTable_Entries});

        return dataTable_RootTableDataObject_Both_ColumnArrays;
    }

    private static async getDataTableRows(
        {
            modViewDataManager,
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        } : {
            modViewDataManager:ModViewDataManager
            vizOptionsData : ModView_VizOptionsData
            modMass:number
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }
    ) : Promise<Array<DataTable_DataRowEntry>> {

        const dataTableRows : Array<DataTable_DataRowEntry> = [];

        const allProteinDataForModMass:Array<ProteinDataForModMass> = await ModProteinList_SubTableGenerator.getProteinDataForModMass({
            modMass,
            vizOptionsData,
            modViewDataManager
        });

        for(const proteinData of allProteinDataForModMass) {

            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            // add the name
            {
                const clickCallback =
                    (params: modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params) : void => {

                        if ( params.ctrlKey_From_ClickEvent || params.metaKey_From_ClickEvent ) {

                            get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root().show_SingleProtein_InNewWindow({
                                proteinSequenceVersionId: params.proteinId, modMass_Rounded_From_ModPage_ForInitialSelection: modMass
                            });

                        } else {

                            get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root().show_SingleProtein_InOverlay({
                                proteinSequenceVersionId: params.proteinId, modMass_Rounded_From_ModPage_ForInitialSelection: modMass
                            });
                        }
                    }

                const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                    ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                        return modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents({
                            proteinName: proteinData.proteinName,
                            proteinId: proteinData.proteinId,
                            modMass,
                            projectSearchIds: vizOptionsData.data.projectSearchIds,
                            modViewDataManager,
                            clickCallback
                        });
                    }


                const valueDisplay = proteinData.proteinName;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                    valueSort : proteinData.proteinName
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            {  //  Download ONLY  --   Protein Description

                const valueDisplay = proteinData.proteinDescription;

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );

            }

            // add modded positions
            {
                const positions:Array<UnlocalizedStartEnd> = new Array();

                for(const loc of ModDataUtils.compressUnlocalizedRanges(proteinData.unlocalizedPositionRanges)) {
                    positions.push(loc);
                }

                for(const loc of proteinData.modifiedPositions) {
                    positions.push(new UnlocalizedStartEnd({start:loc, end:loc}));
                }

                positions.sort( function(a, b):number {
                    if(a.start === b.start) {
                        return a.end - b.end;
                    }

                    return a.start - b.start;
                });

                const valueDisplay = positions.map(e => e.toString()).join(", ");
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            // add modded residues
            {
                const valueDisplay = Array.from(proteinData.modifiedResidues).sort().join(', ');
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            // add in psm counts for each project search id
            const projectSearchIds = vizOptionsData.data.projectSearchIds;

            for(const projectSearchId of projectSearchIds) {

                const count = proteinData.psmCounts.has(projectSearchId) ? proteinData.psmCounts.get(projectSearchId) : 0;

                const valueDisplay = count.toString();
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : count
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            // call for sub table
            let dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject;

            if(projectSearchIds.length !== 1) {
                const subTableData = new ModProteinSearchList_SubTableProperties({
                    modViewDataManager,
                    vizOptionsData,
                    modMass,
                    proteinId: proteinData.proteinId,
                    dataPageStateManager_DataFrom_Server
                });

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return ModProteinSearchList_SubTableGenerator.getSearchListSubTable(subTableData);
                    };
            } else {
                const subTableData = new ModProteinSearchPeptideList_SubTableProperties({
                    modViewDataManager,
                    vizOptionsData,
                    modMass,
                    proteinId: proteinData.proteinId,
                    dataPageStateManager_DataFrom_Server,
                    projectSearchId:projectSearchIds[0]
                });

                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                        return ModProteinSearchPeptideList_SubTableGenerator.getSearchListSubTable(subTableData);
                    };
            }

            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            // add this row to the rows
            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : proteinData.proteinId + '-' + modMass,
                sortOrder_OnEquals : modMass,
                columnEntries,
                dataTable_DataRowEntry_DownloadTable,
                dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
            });

            dataTableRows.push( dataTable_DataRowEntry );
        }

        if( vizOptionsData.data.projectSearchIds.length === 1 ) {

            // sort by psm count if there is one project search id
            dataTableRows.sort((function(a, b) {

                if ( ! limelight__variable_is_type_number_Check( b.columnEntries[3].valueSort ) ) {
                    const msg = "static async getDataTableRows: b.columnEntries[3].valueSort is not a number.  b.columnEntries[3].valueSort: " + b.columnEntries[3].valueSort;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( ! limelight__variable_is_type_number_Check( a.columnEntries[3].valueSort ) ) {
                    const msg = "static async getDataTableRows: a.columnEntries[3].valueSort is not a number.  a.columnEntries[3].valueSort: " + a.columnEntries[3].valueSort;
                    console.warn( msg );
                    throw Error( msg );
                }

                if ( b.columnEntries[3].valueSort !== a.columnEntries[3].valueSort ) {

                    //  PSM Count is different so sort on that
                    return (b.columnEntries[3].valueSort as number) - (a.columnEntries[3].valueSort as number);
                }

                // sort by protein name otherwise
                if(a.columnEntries[0].valueSort < b.columnEntries[0].valueSort) {
                    return -1;
                }
                if(a.columnEntries[0].valueSort > b.columnEntries[0].valueSort) {
                    return 1;
                }
                return 0;
            }));

        } else {

            // sort by protein name otherwise
            dataTableRows.sort((function(a, b) {
                if(a.columnEntries[0].valueSort < b.columnEntries[0].valueSort) {
                    return -1;
                }
                if(a.columnEntries[0].valueSort > b.columnEntries[0].valueSort) {
                    return 1;
                }
                return 0;
            }));
        }



        return dataTableRows;
    }

    /**
     * Get protein data for a mod mass in a group of project search ids
     * For each protein+project search id we need:
     *      protein name
     *      protein id
     *      modified residues (with this mod mass)
     *      positions in the protein modified by this mod mass
     *      map of project search id => # of psms for this mod in this protein in this search
     *
     * Return:
     */
    private static async getProteinDataForModMass(
        {
            modViewDataManager,
            vizOptionsData,
            modMass
        }:{
            modViewDataManager:ModViewDataManager,
            vizOptionsData : ModView_VizOptionsData
            modMass:number
        }
    ) : Promise<Array<ProteinDataForModMass>> {

        const proteinDataForModMass:Array<ProteinDataForModMass> = new Array();
        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        // maps of protein id to needed information
        const proteinPositionMap:Map<number, Set<number>> =  new Map();
        const proteinResidueMap:Map<number, Set<string>> =  new Map();
        const proteinPSMCountsByProjectSearchId:Map<number, Map<number, number>> = new Map();
        const unlocalizedRangesByProteinId:Map<number, Map<string, UnlocalizedStartEnd>> = new Map();

        const namesForProtein:Map<number, Set<string>> = new Map();
        const descriptionsForProtein:Map<number, Set<string>> = new Map();

        // populate the data structures above
        await ModProteinList_SubTableGenerator.rollupProteinDataForAllProjectSearchIds({
            proteinPositionMap,
            proteinResidueMap,
            proteinPSMCountsByProjectSearchId,
            unlocalizedRangesByProteinId,
            modViewDataManager,
            projectSearchIds,
            modMass,
            namesForProtein,
            descriptionsForProtein,
            vizOptionsData
        });

        // get the names of the proteins

        for(const proteinId of proteinPositionMap.keys()) {

            const proteinData = new ProteinDataForModMass({
                proteinId:proteinId,
                proteinName:Array.from(namesForProtein.get(proteinId)).sort().join(', '),
                proteinDescription: Array.from(descriptionsForProtein.get(proteinId)).sort().join(', '),
                modifiedResidues:proteinResidueMap.get(proteinId),
                modifiedPositions:proteinPositionMap.get(proteinId),
                psmCounts:proteinPSMCountsByProjectSearchId.get(proteinId),
                unlocalizedPositionRanges:Array.from(unlocalizedRangesByProteinId.get(proteinId).values())
            });

            proteinDataForModMass.push(proteinData);
        }

        return proteinDataForModMass;
    }

    private static async rollupProteinDataForAllProjectSearchIds(
        {
            proteinPositionMap,
            proteinResidueMap,
            proteinPSMCountsByProjectSearchId,
            unlocalizedRangesByProteinId,
            modViewDataManager,
            projectSearchIds,
            modMass,
            namesForProtein,
            descriptionsForProtein,
            vizOptionsData
        } : {
            proteinPositionMap:Map<number, Set<number>>,
            proteinResidueMap:Map<number, Set<string>>,
            proteinPSMCountsByProjectSearchId:Map<number, Map<number, number>>,
            unlocalizedRangesByProteinId:Map<number, Map<string, UnlocalizedStartEnd>>,
            modViewDataManager:ModViewDataManager,
            projectSearchIds : Array<number>,
            modMass:number,
            namesForProtein:Map<number, Set<string>>,
            descriptionsForProtein:Map<number, Set<string>>,
            vizOptionsData : ModView_VizOptionsData
        }
    ) : Promise<void> {

        const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;

        for(const projectSearchId of projectSearchIds) {

            const psmsForProjectSearchIdAndModMass = await modViewDataManager.getPsmsForModMass({ modMass, projectSearchId })

            // get a map of reported peptide id => psms
            const reportedPeptidePSMMap:Map<number, Set<ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry>> = new Map();
            for(const psm of psmsForProjectSearchIdAndModMass) {
                const reportedPeptideId:number = psm.reportedPeptideId;

                // if psm doesn't have this mod in a position that passes the protein position filter, skip it
                if(!(await ModViewDataUtilities.psmHasModInProteinPositionFilter({
                    modMass,
                    reportedPeptideId,
                    psm,
                    projectSearchId,
                    modViewDataManager,
                    vizOptionsData
                }))) {
                    continue;
                }

                // if we are excluding unlocalized psms, skip this if it's unlocalized
                if(vizOptionsData.data.excludeUnlocalizedOpenMods && await ModViewDataUtilities.psmIsUnlocalized({
                    modMass,
                    reportedPeptideId,
                    psm,
                    projectSearchId,
                    modViewDataManager,
                })) {
                    continue;
                }

                if(!(reportedPeptidePSMMap.has(reportedPeptideId))) {
                    reportedPeptidePSMMap.set(reportedPeptideId, new Set());
                }
                reportedPeptidePSMMap.get(reportedPeptideId).add(psm);
            }

            // get all proteinIds to which these peptides were mapped
            const reportedPeptides:Map<number, ReportedPeptide> = await modViewDataManager.getReportedPeptides({projectSearchId});

            // get a map of protein ids => reported peptides, only for the reported peptides for which we have psms here
            const proteinIdReportedPeptideMap:Map<number, Set<ReportedPeptide>> = new Map();
            for(const reportedPeptideId of reportedPeptidePSMMap.keys()) {
                const reportedPeptide = reportedPeptides.get(reportedPeptideId);

                for(const proteinId of reportedPeptide.proteinMatches.keys()) {

                    // skip this protein if we have defined protein position filters that don't include it
                    if(proteinPositionFilter !== undefined && !(proteinPositionFilter.isProteinInFilter({proteinId}))) {
                        continue;
                    }

                    if(!(proteinIdReportedPeptideMap.has(proteinId))) {
                        proteinIdReportedPeptideMap.set(proteinId, new Set());
                    }
                    proteinIdReportedPeptideMap.get(proteinId).add(reportedPeptide);
                }
            }

            // get our data
            await this.rollupProteinDataForProjectSearchId({
                proteinPositionMap,
                proteinResidueMap,
                proteinPSMCountsByProjectSearchId,
                unlocalizedRangesByProteinId,
                proteinIdReportedPeptideMap,
                projectSearchId,
                reportedPeptidePSMMap,
                namesForProtein,
                descriptionsForProtein,
                modViewDataManager
            });

        }

    }

    private static async rollupProteinDataForProjectSearchId(
        {
            proteinPositionMap,
            proteinResidueMap,
            proteinPSMCountsByProjectSearchId,
            unlocalizedRangesByProteinId,
            proteinIdReportedPeptideMap,
            projectSearchId,
            reportedPeptidePSMMap,
            namesForProtein,
            descriptionsForProtein,
            modViewDataManager,
        } : {
            proteinPositionMap:Map<number, Set<number>>,
            proteinResidueMap:Map<number, Set<string>>,
            proteinPSMCountsByProjectSearchId:Map<number, Map<number, number>>,
            unlocalizedRangesByProteinId:Map<number, Map<string, UnlocalizedStartEnd>>,
            proteinIdReportedPeptideMap:Map<number, Set<ReportedPeptide>>,
            projectSearchId:number,
            reportedPeptidePSMMap:Map<number, Set<ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry>>,
            namesForProtein:Map<number, Set<string>>,
            descriptionsForProtein:Map<number, Set<string>>,
            modViewDataManager:ModViewDataManager,
        }
    ) : Promise<void> {

        // iterate over each distinct protein and roll up the data we need
        for( const proteinId of proteinIdReportedPeptideMap.keys() ) {

            if(!(proteinPSMCountsByProjectSearchId.has(proteinId))) {
                proteinPSMCountsByProjectSearchId.set(proteinId, new Map());
            }

            if(!(proteinPositionMap.has(proteinId))) {
                proteinPositionMap.set(proteinId, new Set<number>());
            }

            if(!(proteinResidueMap.has(proteinId))) {
                proteinResidueMap.set(proteinId, new Set<string>());
            }

            if(!(unlocalizedRangesByProteinId.has(proteinId))) {
                unlocalizedRangesByProteinId.set(proteinId, new Map<string, UnlocalizedStartEnd>());
            }

            // initialize the count for this projectSearchId to 0
            if(!(proteinPSMCountsByProjectSearchId.get(proteinId).has(projectSearchId))) {
                proteinPSMCountsByProjectSearchId.get(proteinId).set(projectSearchId, 0);
            }

            // add in the names for this protein
            const foundNamesForProtein:Set<string> = await modViewDataManager.getNamesForProtein({
                proteinId,
                projectSearchId
            });
            if(!(namesForProtein.has(proteinId))) {
                namesForProtein.set(proteinId, new Set());
            }
            for(const name of foundNamesForProtein) {
                namesForProtein.get(proteinId).add(name);
            }

            // add in the descriptions for this protein
            const foundDescriptionsForProtein:Set<string> = await modViewDataManager.getDescriptionsForProtein({
                proteinId,
                projectSearchId
            });
            if(!(descriptionsForProtein.has(proteinId))) {
                descriptionsForProtein.set(proteinId, new Set());
            }
            for(const description of foundDescriptionsForProtein) {
                descriptionsForProtein.get(proteinId).add(description);
            }

            // add the # of psms for the found for each reported peptide to the psm count for this protein for this mod
            for(const reportedPeptide of proteinIdReportedPeptideMap.get(proteinId)) {

                // where this reportedPeptide maps in the protein with proteinId, starting at 1
                const reportedPeptidePositionsInProtein = reportedPeptide.proteinMatches.get(proteinId);

                // update psm count for this protein in this search
                const psmCount:number = reportedPeptidePSMMap.get(reportedPeptide.reportedPeptideId).size;
                const currentCount:number = proteinPSMCountsByProjectSearchId.get(proteinId).get(projectSearchId);
                proteinPSMCountsByProjectSearchId.get(proteinId).set(projectSearchId, psmCount + currentCount);

                for(const psm of reportedPeptidePSMMap.get(reportedPeptide.reportedPeptideId)) {


                    if(psm.variable !== null && psm.variable !== undefined) {

                        // add in the positions in this protein
                        for (const peptidePosition of psm.variable.loc) {

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.variable.nterm) {
                            const peptidePosition = 1;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.variable.cterm) {
                            const peptidePosition = reportedPeptide.sequence.length;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                    }

                    if(psm.open !== null && psm.open !== undefined) {

                        // add in the positions in this protein
                        for (const peptidePosition of psm.open.loc) {

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.open.nterm) {
                            const peptidePosition = 1;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.open.cterm) {
                            const peptidePosition = reportedPeptide.sequence.length;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        // add in the unlocalized start stop for this unlocalized open mod if appropriate
                        if(ModProteinSearchPeptideList_SubTableGenerator.getIsUnlocalizedOpenMod({psm})) {

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const start = proteinPosition;
                                const end = proteinPosition + reportedPeptide.sequence.length - 1;

                                const unlocalizedPos = new UnlocalizedStartEnd({start, end});

                                unlocalizedRangesByProteinId.get(proteinId).set(unlocalizedPos.toString(), unlocalizedPos);
                            }
                        }
                    }

                }

            }

        }

    }
}




class ProteinDataForModMass {

    private readonly _proteinId:number;
    private readonly _proteinName:string;
    private readonly _proteinDescription:string;
    private readonly _modifiedResidues:Set<string>;
    private readonly _modifiedPositions:Set<number>;
    private readonly _psmCounts:Map<number, number>;
    private readonly _unlocalizedPositionRanges:Array<UnlocalizedStartEnd>;


    constructor(
        {
            proteinId,
            proteinName,
            proteinDescription,
            modifiedResidues,
            modifiedPositions,
            psmCounts,
            unlocalizedPositionRanges
        } : {
            proteinId:number,
            proteinName:string,
            proteinDescription:string,
            modifiedResidues:Set<string>,
            modifiedPositions:Set<number>,
            psmCounts:Map<number,number>,
            unlocalizedPositionRanges:Array<UnlocalizedStartEnd>
        }
    ) {
        this._proteinId = proteinId;
        this._proteinName = proteinName;
        this._proteinDescription = proteinDescription;
        this._modifiedResidues = modifiedResidues;
        this._modifiedPositions = modifiedPositions;
        this._psmCounts = psmCounts;
        this._unlocalizedPositionRanges = unlocalizedPositionRanges;
    }

    get unlocalizedPositionRanges(): Array<UnlocalizedStartEnd> {
        return this._unlocalizedPositionRanges;
    }

    get proteinId(): number {
        return this._proteinId;
    }

    get proteinName(): string {
        return this._proteinName;
    }

    get proteinDescription(): string {
        return this._proteinDescription;
    }

    get modifiedResidues(): Set<string> {
        return this._modifiedResidues;
    }

    get modifiedPositions(): Set<number> {
        return this._modifiedPositions;
    }

    get psmCounts(): Map<number, number> {
        return this._psmCounts;
    }
}