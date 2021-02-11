import {
    DataTable_Column, DataTable_DataRow_ColumnEntry, DataTable_DataRowEntry,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions,
    DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ModViewDataVizRenderer_MultiSearch} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch";
import {ReportedPeptide} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {ModDataUtils} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataUtils";
import {ModProteinSearchList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchList_SubTableProperties";
import {
    ModProteinSearchPeptideList_SubTableGenerator,
    UnlocalizedStartEnd
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableGenerator";
import {ModProteinSearchPeptideList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableProperties";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModViewDataUtilities} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";

export class ModProteinSearchList_SubTableGenerator {

    static async getSearchListSubTable(param:DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm):Promise<DataTable_RootTableObject> {

        const dataTableId_ThisTable = "Mod View Protein List By Search Sub Table";

        const params = <ModProteinSearchList_SubTableProperties>param.dataRow_GetChildTableData_ViaPromise_Parameter;

        const modMass:number = params.modMass;
        const proteinId:number = params.proteinId;
        const modViewDataManager:ModViewDataManager = params.modViewDataManager;
        const vizOptionsData: ModView_VizOptionsData = params.vizOptionsData;
        const dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;

        // create the columns for the table
        const dataTableColumns : Array<DataTable_Column> = await ModProteinSearchList_SubTableGenerator.getDataTableColumns();

        // create the rows for the table
        const dataTableRows : Array<DataTable_DataRowEntry> = await ModProteinSearchList_SubTableGenerator.getDataTableRows({
            modViewDataManager,
            vizOptionsData,
            modMass,
            proteinId,
            dataPageStateManager_DataFrom_Server
        });

        // assemble the table
        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTableColumns,
            dataTable_DataRowEntries: dataTableRows
        });

        const tableOptions = new DataTable_TableOptions({
            dataRow_GetChildTableData_ViaPromise:ModProteinSearchPeptideList_SubTableGenerator.getSearchListSubTable
        });

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        // draw the table

        const renderCompleteCallbackFcn = () => {
            console.log("Rendering Protein For Search END, Now: " + new Date() );
        };

        return dataTable_RootTableObject;
    }

    static async getDataTableColumns() : Promise<Array<DataTable_Column>> {

        const dataTableColumns : Array<DataTable_Column> = [];

        {
            const dataTableColumn = new DataTable_Column({
                id : "searchProteinSearchName", // Used for tracking sort order. Keep short
                displayName : "Search",
                width : 500,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", overflowX: "auto", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "searchProteinPSMCount", // Used for tracking sort order. Keep short
                displayName : "PSMs",
                width : 100,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "searchProteinModPos", // Used for tracking sort order. Keep short
                displayName : "Positions",
                width : 100,
                sortable : false,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "searchProteinModRes", // Used for tracking sort order. Keep short
                displayName : "Residues",
                width : 100,
                sortable : false,
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
            proteinId,
            dataPageStateManager_DataFrom_Server
        } : {
            modViewDataManager:ModViewDataManager,
            vizOptionsData: ModView_VizOptionsData
            modMass:number,
            proteinId:number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }
    ) : Promise<Array<DataTable_DataRowEntry>> {

        const dataTableRows : Array<DataTable_DataRowEntry> = [];

        const allProteinDataForModMass:Array<SearchProteinDataForModMass> = await ModProteinSearchList_SubTableGenerator.getSearchProteinDataForModMass({
            modMass,
            vizOptionsData,
            modViewDataManager,
            proteinId
        });

        for(const proteinData of allProteinDataForModMass) {

            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

            // add the name
            {

                const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                    projectSearchId:proteinData.projectSearchId,
                    dataPageStateManager_DataFrom_Server
                });

                const searchName = ModDataUtils.getSearchNameForProjectSearchId({
                    projectSearchId:proteinData.projectSearchId,
                    dataPageStateManager_DataFrom_Server
                });

                const displayString = "(" + searchId + ") " + searchName;


                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : displayString,
                    valueSort : proteinData.projectSearchId
                });
                columnEntries.push( columnEntry );
            }

            // add psm count
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : proteinData.psmCounts.toString(),
                    valueSort : proteinData.psmCounts
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

            // data to pass in for the sub table
            const subTableData = new ModProteinSearchPeptideList_SubTableProperties({
                modMass: modMass,
                modViewDataManager: modViewDataManager,
                projectSearchId: proteinData.projectSearchId,
                proteinId: proteinData.proteinId,
                vizOptionsData: vizOptionsData,
                dataPageStateManager_DataFrom_Server
            });

            // add this row to the rows
            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : proteinData.projectSearchId + '-' + modMass + '-' + proteinId,
                sortOrder_OnEquals : proteinData.projectSearchId,
                columnEntries,
                dataRow_GetChildTableData_ViaPromise_Parameter:subTableData
            });

            dataTableRows.push( dataTable_DataRowEntry );
        }

        return dataTableRows;
    }


    static async getSearchProteinDataForModMass(
        {
            modViewDataManager,
            vizOptionsData,
            modMass,
            proteinId
        }:{
            modViewDataManager:ModViewDataManager,
            vizOptionsData: ModView_VizOptionsData
            modMass:number,
            proteinId:number
        }
    ) : Promise<Array<SearchProteinDataForModMass>> {

        const proteinDataForModMass:Array<SearchProteinDataForModMass> = new Array();
        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        // maps of projectSearchId to needed information
        const proteinPositionMapByProjectSearchId:Map<number, Set<number>> =  new Map();
        const proteinResidueMapByProjectSearchId:Map<number, Set<string>> =  new Map();
        const psmCountMapByProjectSearchId:Map<number, number> = new Map();
        const unlocalizedRangesByProjectSearchId:Map<number, Map<string, UnlocalizedStartEnd>> = new Map();

        // populate the data structures above
        await ModProteinSearchList_SubTableGenerator.rollupProteinData({
            proteinPositionMapByProjectSearchId,
            proteinResidueMapByProjectSearchId,
            psmCountMapByProjectSearchId,
            unlocalizedRangesByProjectSearchId,
            modViewDataManager,
            projectSearchIds,
            modMass,
            proteinId,
            vizOptionsData
        });

        // get the names of the proteins

        for(const projectSearchId of proteinPositionMapByProjectSearchId.keys()) {

            const proteinData = new SearchProteinDataForModMass({
                projectSearchId:projectSearchId,
                modifiedResidues:proteinResidueMapByProjectSearchId.get(projectSearchId),
                modifiedPositions:proteinPositionMapByProjectSearchId.get(projectSearchId),
                psmCounts:psmCountMapByProjectSearchId.get(projectSearchId),
                unlocalizedPositionRanges:Array.from(unlocalizedRangesByProjectSearchId.get(projectSearchId).values()),
                proteinId
            });

            proteinDataForModMass.push(proteinData);
        }

        return proteinDataForModMass;
    }

    static async rollupProteinData(
        {
            proteinPositionMapByProjectSearchId,
            proteinResidueMapByProjectSearchId,
            psmCountMapByProjectSearchId,
            unlocalizedRangesByProjectSearchId,
            modViewDataManager,
            projectSearchIds,
            modMass,
            proteinId,
            vizOptionsData
        }:{
            proteinPositionMapByProjectSearchId:Map<number, Set<number>>,
            proteinResidueMapByProjectSearchId:Map<number, Set<string>>,
            psmCountMapByProjectSearchId:Map<number, number>,
            unlocalizedRangesByProjectSearchId:Map<number, Map<string, UnlocalizedStartEnd>>,
            modViewDataManager:ModViewDataManager,
            projectSearchIds : Array<number>,
            modMass:number,
            proteinId:number,
            vizOptionsData: ModView_VizOptionsData
        }
    ) : Promise<void> {

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

            // get all reported peptides in this search
            const reportedPeptides:Map<number, ReportedPeptide> = await modViewDataManager.getReportedPeptides({projectSearchId});

            // get all reported peptides that matched to this protein
            const reportedPeptidesForProtein:Set<ReportedPeptide> = new Set();
            for(const reportedPeptideId of reportedPeptidePSMMap.keys()) {
                const reportedPeptide = reportedPeptides.get(reportedPeptideId);

                for(const reportedPeptideProteinId of reportedPeptide.proteinMatches.keys()) {
                    if(reportedPeptideProteinId === proteinId) {
                        reportedPeptidesForProtein.add(reportedPeptide);
                    }
                }
            }

            // get our data
            this.rollupProteinDataForProjectSearchIdAndProtein({
                proteinPositionMapByProjectSearchId,
                proteinResidueMapByProjectSearchId,
                projectSearchId,
                reportedPeptidePSMMap,
                proteinId,
                psmCountMapByProjectSearchId,
                unlocalizedRangesByProjectSearchId,
                reportedPeptidesForProtein
            });

        }

    }

    static rollupProteinDataForProjectSearchIdAndProtein(
        {
            proteinPositionMapByProjectSearchId,
            proteinResidueMapByProjectSearchId,
            projectSearchId,
            reportedPeptidePSMMap,
            unlocalizedRangesByProjectSearchId,
            proteinId,
            psmCountMapByProjectSearchId,
            reportedPeptidesForProtein
        }:{
            proteinPositionMapByProjectSearchId:Map<number, Set<number>>,
            proteinResidueMapByProjectSearchId:Map<number, Set<string>>,
            projectSearchId:number,
            reportedPeptidePSMMap:Map<number, Set<any>>,
            proteinId:number,
            psmCountMapByProjectSearchId:Map<number, number>,
            unlocalizedRangesByProjectSearchId:Map<number, Map<string, UnlocalizedStartEnd>>,
            reportedPeptidesForProtein:Set<ReportedPeptide>
        }
    ) : void {


        if(!(psmCountMapByProjectSearchId.has(projectSearchId))) {
            psmCountMapByProjectSearchId.set(projectSearchId, 0);
        }

        if(!(proteinPositionMapByProjectSearchId.has(projectSearchId))) {
            proteinPositionMapByProjectSearchId.set(projectSearchId, new Set<number>());
        }

        if(!(proteinResidueMapByProjectSearchId.has(projectSearchId))) {
            proteinResidueMapByProjectSearchId.set(projectSearchId, new Set<string>());
        }

        if(!(unlocalizedRangesByProjectSearchId.has(projectSearchId))) {
            unlocalizedRangesByProjectSearchId.set(projectSearchId, new Map<string, UnlocalizedStartEnd>());
        }


        // add the # of psms for the found for each reported peptide to the psm count for this protein for this mod
        for(const reportedPeptide of reportedPeptidesForProtein) {

            // where this reportedPeptide maps in the protein with proteinId, starting at 1
            const reportedPeptidePositionsInProtein = reportedPeptide.proteinMatches.get(proteinId);

            // update psm count for this protein in this search
            const psmCount:number = reportedPeptidePSMMap.get(reportedPeptide.reportedPeptideId).size;
            const currentCount:number = psmCountMapByProjectSearchId.get(projectSearchId);
            psmCountMapByProjectSearchId.set(projectSearchId, psmCount + currentCount);

            for(const psm of reportedPeptidePSMMap.get(reportedPeptide.reportedPeptideId)) {

                if(psm.variable !== null && psm.variable !== undefined) {

                    // add in the positions in this protein
                    for (const peptidePosition of psm.variable.loc) {

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                    if (psm.variable.loc.nterm) {
                        const peptidePosition = 1;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                    if (psm.variable.loc.cterm) {
                        const peptidePosition = reportedPeptide.sequence.length;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                }

                if(psm.open !== null && psm.open !== undefined) {

                    // add in the positions in this protein
                    for (const peptidePosition of psm.open.loc) {

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                    if (psm.open.loc.nterm) {
                        const peptidePosition = 1;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                    if (psm.open.loc.cterm) {
                        const peptidePosition = reportedPeptide.sequence.length;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);
                        proteinResidueMapByProjectSearchId.get(projectSearchId).add(residueLetterCode);

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);
                            proteinPositionMapByProjectSearchId.get(projectSearchId).add(finalPosition);
                        }
                    }

                    // add in the unlocalized start stop for this unlocalized open mod if appropriate
                    if(ModProteinSearchPeptideList_SubTableGenerator.getIsUnlocalizedOpenMod({psm})) {

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const start = proteinPosition;
                            const end = proteinPosition + reportedPeptide.sequence.length - 1;

                            const unlocalizedPos = new UnlocalizedStartEnd({start, end});

                            unlocalizedRangesByProjectSearchId.get(projectSearchId).set(unlocalizedPos.toString(), unlocalizedPos);
                        }
                    }
                }

            }

        }

    }
}




class SearchProteinDataForModMass {

    private readonly _projectSearchId:number;
    private readonly _modifiedResidues:Set<string>;
    private readonly _modifiedPositions:Set<number>;
    private readonly _psmCounts:number;
    private readonly _proteinId:number;
    private readonly _unlocalizedPositionRanges:Array<UnlocalizedStartEnd>;

    constructor(
        {
            projectSearchId,
            modifiedResidues,
            modifiedPositions,
            psmCounts,
            proteinId,
            unlocalizedPositionRanges
        }:{
            modifiedResidues:Set<string>,
            modifiedPositions:Set<number>,
            psmCounts:number,
            projectSearchId:number,
            proteinId:number,
            unlocalizedPositionRanges:Array<UnlocalizedStartEnd>
        }
    ) {
        this._modifiedResidues = modifiedResidues;
        this._modifiedPositions = modifiedPositions;
        this._psmCounts = psmCounts;
        this._projectSearchId = projectSearchId;
        this._proteinId = proteinId;
        this._unlocalizedPositionRanges = unlocalizedPositionRanges;

    }


    get unlocalizedPositionRanges(): Array<UnlocalizedStartEnd> {
        return this._unlocalizedPositionRanges;
    }

    get proteinId(): number {
        return this._proteinId;
    }

    get projectSearchId(): number {
        return this._projectSearchId;
    }

    get modifiedResidues(): Set<string> {
        return this._modifiedResidues;
    }

    get modifiedPositions(): Set<number> {
        return this._modifiedPositions;
    }

    get psmCounts(): number {
        return this._psmCounts;
    }
}