import {
    DataTable_Column, DataTable_DataRow_ColumnEntry, DataTable_DataRowEntry,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions,
    DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ModProteinList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableProperties";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ModViewDataVizRenderer_MultiSearch} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch";
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


export class ModProteinList_SubTableGenerator {

    static async getProteinListSubTable(param:DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm):Promise<DataTable_RootTableObject> {

        const dataTableId_ThisTable = "Mod View Protein List Sub Table";

        const params = <ModProteinList_SubTableProperties>param.dataRow_GetChildTableData_ViaPromise_Parameter;

        const modMass:number = params.modMass;
        const modViewDataManager:ModViewDataManager = params.modViewDataManager;
        const vizOptionsData = params.vizOptionsData;
        const dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;

        // create the columns for the table
        const dataTableColumns : Array<DataTable_Column> = await ModProteinList_SubTableGenerator.getDataTableColumns({
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
            columns : dataTableColumns,
            dataTable_DataRowEntries: dataTableRows
        });

        const projectSearchIds = vizOptionsData.data.projectSearchIds;
        const subTableGenerator = projectSearchIds.length === 1 ? ModProteinSearchPeptideList_SubTableGenerator.getSearchListSubTable : ModProteinSearchList_SubTableGenerator.getSearchListSubTable
        const tableOptions = new DataTable_TableOptions({
            dataRow_GetChildTableData_ViaPromise:subTableGenerator
        });

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        return dataTable_RootTableObject;
    }

    static async getDataTableColumns(
        {
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        }:{
            vizOptionsData : ModView_VizOptionsData,
            modMass:number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }
    ) : Promise<Array<DataTable_Column>> {

        const dataTableColumns : Array<DataTable_Column> = [];

        {
            const dataTableColumn = new DataTable_Column({
                id : "proteinName", // Used for tracking sort order. Keep short
                displayName : "Protein",
                width : 200,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", overflowX: "auto", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "modPos", // Used for tracking sort order. Keep short
                displayName : "Positions",
                width : 100,
                sortable : false,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "modRes", // Used for tracking sort order. Keep short
                displayName : "Residues",
                width : 100,
                sortable : false,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server });

            const dataTableColumn = new DataTable_Column({
                id : projectSearchId + '-' + modMass + '-psms', // Used for tracking sort order. Keep short
                displayName : "PSM Count (" + searchId + ")",
                width : 100,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        return dataTableColumns;
    }

    static async getDataTableRows(
        {
            modViewDataManager,
            vizOptionsData,
            modMass,
            dataPageStateManager_DataFrom_Server
        } : {
            modViewDataManager:ModViewDataManager,
            vizOptionsData : ModView_VizOptionsData
            modMass:number,
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

            // add the name
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : proteinData.proteinName,
                    valueSort : proteinData.proteinName
                });
                columnEntries.push( columnEntry );
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

                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : positions.map(e => e.toString()).join(", ")
                });
                columnEntries.push( columnEntry );
            }

            // add modded residues
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : Array.from(proteinData.modifiedResidues).sort().join(', ')
                });
                columnEntries.push( columnEntry );
            }

            // add in psm counts for each project search id
            const projectSearchIds = vizOptionsData.data.projectSearchIds;

            for(const projectSearchId of projectSearchIds) {

                const count = proteinData.psmCounts.has(projectSearchId) ? proteinData.psmCounts.get(projectSearchId) : 0;


                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : count.toString(),
                    valueSort : count
                });
                columnEntries.push( columnEntry );
            }

            // data to pass in for the sub table
            let subTableData;

            if(projectSearchIds.length !== 1) {
                subTableData = new ModProteinSearchList_SubTableProperties({
                    modViewDataManager,
                    vizOptionsData,
                    modMass,
                    proteinId: proteinData.proteinId,
                    dataPageStateManager_DataFrom_Server
                });
            } else {
                subTableData = new ModProteinSearchPeptideList_SubTableProperties({
                    modViewDataManager,
                    vizOptionsData,
                    modMass,
                    proteinId: proteinData.proteinId,
                    dataPageStateManager_DataFrom_Server,
                    projectSearchId:projectSearchIds[0]
                });
            }

            // add this row to the rows
            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : proteinData.proteinId + '-' + modMass,
                sortOrder_OnEquals : modMass,
                columnEntries,
                dataRow_GetChildTableData_ViaPromise_Parameter:subTableData
            });

            dataTableRows.push( dataTable_DataRowEntry );
        }

        if( vizOptionsData.data.projectSearchIds.length === 1 ) {

            // sort by psm count if there is one project search id
            dataTableRows.sort((function(a, b) {
                return b.columnEntries[3].valueSort - a.columnEntries[3].valueSort;
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
    static async getProteinDataForModMass(
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
            vizOptionsData
        });

        // get the names of the proteins

        for(const proteinId of proteinPositionMap.keys()) {

            const proteinData = new ProteinDataForModMass({
                proteinId:proteinId,
                proteinName:Array.from(namesForProtein.get(proteinId)).sort().join(', '),
                modifiedResidues:proteinResidueMap.get(proteinId),
                modifiedPositions:proteinPositionMap.get(proteinId),
                psmCounts:proteinPSMCountsByProjectSearchId.get(proteinId),
                unlocalizedPositionRanges:Array.from(unlocalizedRangesByProteinId.get(proteinId).values())
            });

            proteinDataForModMass.push(proteinData);
        }

        return proteinDataForModMass;
    }

    static async rollupProteinDataForAllProjectSearchIds(
        {
            proteinPositionMap,
            proteinResidueMap,
            proteinPSMCountsByProjectSearchId,
            unlocalizedRangesByProteinId,
            modViewDataManager,
            projectSearchIds,
            modMass,
            namesForProtein,
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
            vizOptionsData : ModView_VizOptionsData
        }
    ) : Promise<void> {

        const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;

        for(const projectSearchId of projectSearchIds) {

            const psmsForProjectSearchIdAndModMass:Array<any> = await modViewDataManager.getPsmsForModMass({ modMass, projectSearchId })

            // get a map of reported peptide id => psms
            const reportedPeptidePSMMap:Map<number, Set<any>> = new Map();
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
                modViewDataManager
            });

        }

    }

    static async rollupProteinDataForProjectSearchId(
        {
            proteinPositionMap,
            proteinResidueMap,
            proteinPSMCountsByProjectSearchId,
            unlocalizedRangesByProteinId,
            proteinIdReportedPeptideMap,
            projectSearchId,
            reportedPeptidePSMMap,
            namesForProtein,
            modViewDataManager,
        } : {
            proteinPositionMap:Map<number, Set<number>>,
            proteinResidueMap:Map<number, Set<string>>,
            proteinPSMCountsByProjectSearchId:Map<number, Map<number, number>>,
            unlocalizedRangesByProteinId:Map<number, Map<string, UnlocalizedStartEnd>>,
            proteinIdReportedPeptideMap:Map<number, Set<ReportedPeptide>>,
            projectSearchId:number,
            reportedPeptidePSMMap:Map<number, Set<any>>,
            namesForProtein:Map<number, Set<string>>,
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

                        if (psm.variable.loc.nterm) {
                            const peptidePosition = 1;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.variable.loc.cterm) {
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

                        if (psm.open.loc.nterm) {
                            const peptidePosition = 1;

                            const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                            proteinResidueMap.get(proteinId).add(residueLetterCode);

                            for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                const finalPosition = proteinPosition + (peptidePosition - 1);
                                proteinPositionMap.get(proteinId).add(finalPosition);
                            }
                        }

                        if (psm.open.loc.cterm) {
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
    private readonly _modifiedResidues:Set<string>;
    private readonly _modifiedPositions:Set<number>;
    private readonly _psmCounts:Map<number, number>;
    private readonly _unlocalizedPositionRanges:Array<UnlocalizedStartEnd>;


    constructor(
        {
            proteinId,
            proteinName,
            modifiedResidues,
            modifiedPositions,
            psmCounts,
            unlocalizedPositionRanges
        } : {
            proteinId:number,
            proteinName:string,
            modifiedResidues:Set<string>,
            modifiedPositions:Set<number>,
            psmCounts:Map<number,number>,
            unlocalizedPositionRanges:Array<UnlocalizedStartEnd>
        }
    ) {
        this._proteinId = proteinId;
        this._proteinName = proteinName;
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