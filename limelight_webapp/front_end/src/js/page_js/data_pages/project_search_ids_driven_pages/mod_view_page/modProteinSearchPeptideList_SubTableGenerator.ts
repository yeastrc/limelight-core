import {
    DataTable_Column, DataTable_Column_sortFunction_Param, DataTable_DataRow_ColumnEntry, DataTable_DataRowEntry,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions,
    DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ReportedPeptide} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {ModProteinSearchPeptideList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableProperties";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent,
    PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent";
import {ModViewDataUtilities} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities";
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";


export class ModProteinSearchPeptideList_SubTableGenerator {

    static async getSearchListSubTable(param:DataTable_TableOptions_dataRow_GetChildTableData_ViaPromise_RequestParm):Promise<DataTable_RootTableObject> {

        const dataTableId_ThisTable = "Mod View Protein List By Search Sub Table";

        const params = <ModProteinSearchPeptideList_SubTableProperties>param.dataRow_GetChildTableData_ViaPromise_Parameter;

        const modMass:number = params.modMass;
        const projectSearchId:number = params.projectSearchId;
        const proteinId:number = params.proteinId;
        const modViewDataManager:ModViewDataManager = params.modViewDataManager;
        const dataPageStateManager_DataFrom_Server = params.dataPageStateManager_DataFrom_Server;
        const vizOptionsData = params.vizOptionsData;

        // create the columns for the table
        const dataTableColumns : Array<DataTable_Column> = await ModProteinSearchPeptideList_SubTableGenerator.getDataTableColumns();

        // create the rows for the table
        const dataTableRows : Array<DataTable_DataRowEntry> = await ModProteinSearchPeptideList_SubTableGenerator.getDataTableRows({
            projectSearchId,
            modViewDataManager,
            modMass,
            proteinId,
            dataPageStateManager_DataFrom_Server,
            vizOptionsData
        });

        // assemble the table
        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTableColumns,
            dataTable_DataRowEntries: dataTableRows
        });

        const tableOptions = new DataTable_TableOptions({
            //  Comment out since no further drill down to child table
            // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
            //dataRow_GetChildTable_ReturnReactComponent : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent
            //dataRow_GetChildTableData_ViaPromise:ModProteinList_SubTableGenerator.getProteinListSubTable
            dataRow_GetChildTable_ReturnReactComponent:psmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent
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
                id : "modListGeneratedPeptide", // Used for tracking sort order. Keep short
                displayName : "Peptide",
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

            const sortFunction = function(param : DataTable_Column_sortFunction_Param ): number {

                const arrayA = param.sortValue_A as Array<number>;
                const arrayB = param.sortValue_B as Array<number>

                // handle blanks
                if(arrayA.length === 0 && arrayB.length === 0) { return 0; }
                if(arrayA.length === 0 && arrayB.length !== 0) { return -1; }
                if(arrayA.length !== 0 && arrayB.length === 0) { return 1; }

                return arrayA[0] - arrayB[0];
            }

            const dataTableColumn = new DataTable_Column({
                id : "searchProteinModPos", // Used for tracking sort order. Keep short
                displayName : "Positions",
                width : 100,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 },
                sortFunction:sortFunction
            });
            dataTableColumns.push( dataTableColumn );
        }

        {
            const dataTableColumn = new DataTable_Column({
                id : "searchProteinModRes", // Used for tracking sort order. Keep short
                displayName : "Residues",
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
            modMass,
            proteinId,
            projectSearchId,
            dataPageStateManager_DataFrom_Server,
            vizOptionsData
        } : {
            modViewDataManager : ModViewDataManager
            modMass,
            proteinId,
            projectSearchId: number,
            dataPageStateManager_DataFrom_Server : DataPageStateManager,
            vizOptionsData
        }
    ) : Promise<Array<DataTable_DataRowEntry>> {

        const dataTableRows : Array<DataTable_DataRowEntry> = [];

        const allProteinDataForModMass:Array<PeptideDataForModProteinSearch> = await ModProteinSearchPeptideList_SubTableGenerator.getPeptideDataForModProteinSearch({
            modMass,
            modViewDataManager,
            proteinId,
            projectSearchId,
            vizOptionsData
        });

        for(const proteinData of allProteinDataForModMass) {

            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

            // add the name
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : proteinData.peptideString,
                    valueSort : proteinData.peptideString
                });
                columnEntries.push( columnEntry );
            }

            // add psm count
            {
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : proteinData.psmIds.size.toString(),
                    valueSort : proteinData.psmIds.size
                });
                columnEntries.push( columnEntry );
            }

            // add modded positions
            {
                let valueString:string;
                let valueSort:any;

                if(proteinData.modifiedPositions && proteinData.modifiedPositions.size > 0) {
                    valueString = Array.from(proteinData.modifiedPositions).sort((a, b) => a - b).join(', ');
                    valueSort = Array.from(proteinData.modifiedPositions).sort((a, b) => a - b);
                } else if(proteinData.unlocalizedPositionRanges && proteinData.unlocalizedPositionRanges.length > 0) {
                    const ranges = new Array<string>();
                    const sorts = new Array<number>();

                    proteinData.unlocalizedPositionRanges.sort( (a, b) => a.start - b.start);
                    for(const unlocPos of proteinData.unlocalizedPositionRanges) {
                        sorts.push(unlocPos.start);
                        ranges.push("[" + unlocPos.start + "-" + unlocPos.end + "]");
                    }

                    valueString = ranges.join(', ');
                    valueSort = sorts;
                } else {
                    valueString = '';
                    valueSort = [];
                }

                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : valueString,
                    valueSort : valueSort
                });

                columnEntries.push( columnEntry );
            }

            // add modded residues
            {
                const valueString:string = (!(proteinData.unlocalizedPositionRanges) || proteinData.unlocalizedPositionRanges.length === 0) ? Array.from(proteinData.modifiedResidues).sort().join(', ') : 'unlocalized';

                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : valueString,
                    valueSort : valueString
                });
                columnEntries.push( columnEntry );
            }

            const subTableData = new PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                dataPageStateManager: dataPageStateManager_DataFrom_Server,
                projectSearchId: projectSearchId,
                psmIds_Include: proteinData.psmIds,
                reportedPeptideId: undefined,
                searchDataLookupParamsRoot: modViewDataManager.searchDataLookupParameters_Root,
                openModPositionOverride:proteinData.openModPositionOverride
            });

            // add this row to the rows
            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : proteinData.projectSearchId + '-' + modMass + '-' + proteinId + '-' + proteinData.peptideString,
                sortOrder_OnEquals : proteinData.projectSearchId,
                columnEntries,
                dataRow_GetChildTable_ReturnReactComponent_Parameter:subTableData
            });

            // sort by protein name
            dataTableRows.sort((function(a, b) {
                if(a.columnEntries[1].valueSort > b.columnEntries[1].valueSort) {
                    return -1;
                }
                if(a.columnEntries[1].valueSort < b.columnEntries[1].valueSort) {
                    return 1;
                }
                return 0;
            }));

            dataTableRows.push( dataTable_DataRowEntry );
        }

        return dataTableRows;
    }


    static async getPeptideDataForModProteinSearch(
        {
            modViewDataManager,
            modMass,
            proteinId,
            projectSearchId,
            vizOptionsData
        }:{
            modViewDataManager:ModViewDataManager,
            modMass:number,
            proteinId:number,
            projectSearchId:number,
            vizOptionsData
        }
    ) : Promise<Array<PeptideDataForModProteinSearch>> {

        const searchPeptideDataForModMassProtein:Array<PeptideDataForModProteinSearch> = new Array();

        // maps of generated reported peptide strings to needed information
        const proteinPositionMapByPeptideString:Map<string, Set<number>> =  new Map();
        const proteinResidueMapByPeptideString:Map<string, Set<string>> =  new Map();
        const psmIdsByPeptideString:Map<string, Set<number>> = new Map();
        const unlocalizedLocsByPeptideString:Map<string, Array<UnlocalizedStartEnd>> = new Map();

        // the open mod localization associated with a specific peptide--a peptide can have max 1--can be a number or 'n' or 'c'
        const openModPositionOverrideByPeptideString:Map<string, OpenModPosition_DataType> = new Map();

        // populate the data structures above
        await ModProteinSearchPeptideList_SubTableGenerator.rollupProteinData({
            proteinPositionMapByPeptideString,
            proteinResidueMapByPeptideString,
            psmIdsByPeptideString,
            unlocalizedLocsByPeptideString,
            openModPositionOverrideByPeptideString,
            modViewDataManager,
            projectSearchId,
            modMass,
            proteinId,
            vizOptionsData
        });

        for(const peptideString of proteinPositionMapByPeptideString.keys()) {

            const proteinData = new PeptideDataForModProteinSearch({
                peptideString,
                modMass,
                projectSearchId:projectSearchId,
                modifiedResidues:proteinResidueMapByPeptideString.get(peptideString),
                modifiedPositions:proteinPositionMapByPeptideString.get(peptideString),
                psmIds:psmIdsByPeptideString.get(peptideString),
                unlocalizedPositionRanges:unlocalizedLocsByPeptideString.get(peptideString),
                openModPositionOverride:openModPositionOverrideByPeptideString.get(peptideString)
            });

            searchPeptideDataForModMassProtein.push(proteinData);
        }

        return searchPeptideDataForModMassProtein;
    }

    static async rollupProteinData(
        {
            proteinPositionMapByPeptideString,
            proteinResidueMapByPeptideString,
            psmIdsByPeptideString,
            unlocalizedLocsByPeptideString,
            openModPositionOverrideByPeptideString,
            modViewDataManager,
            projectSearchId,
            modMass,
            proteinId,
            vizOptionsData
        }:{
            proteinPositionMapByPeptideString:Map<string, Set<number>>,
            proteinResidueMapByPeptideString:Map<string, Set<string>>,
            psmIdsByPeptideString:Map<string, Set<number>>,
            unlocalizedLocsByPeptideString:Map<string, Array<UnlocalizedStartEnd>>,
            openModPositionOverrideByPeptideString:Map<string, OpenModPosition_DataType>,
            modViewDataManager:ModViewDataManager,
            projectSearchId:number,
            modMass:number,
            proteinId:number,
            vizOptionsData:any
        }
    ) : Promise<void> {


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
            proteinPositionMapByPeptideString,
            proteinResidueMapByPeptideString,
            psmIdsByPeptideString,
            unlocalizedLocsByPeptideString,
            openModPositionOverrideByPeptideString,
            reportedPeptidePSMMap,
            proteinId,
            reportedPeptidesForProtein,
            reportedPeptides,
            modMass
        });


    }

    static rollupProteinDataForProjectSearchIdAndProtein(
        {
            proteinPositionMapByPeptideString,
            proteinResidueMapByPeptideString,
            reportedPeptidePSMMap,
            unlocalizedLocsByPeptideString,
            openModPositionOverrideByPeptideString,
            proteinId,
            psmIdsByPeptideString,
            reportedPeptidesForProtein,
            reportedPeptides,
            modMass
        }:{
            proteinPositionMapByPeptideString:Map<string, Set<number>>,
            proteinResidueMapByPeptideString:Map<string, Set<string>>,
            reportedPeptidePSMMap:Map<number, Set<any>>,
            proteinId:number,
            psmIdsByPeptideString:Map<string, Set<number>>,
            unlocalizedLocsByPeptideString:Map<string, Array<UnlocalizedStartEnd>>,
            openModPositionOverrideByPeptideString:Map<string, OpenModPosition_DataType>,
            reportedPeptidesForProtein:Set<ReportedPeptide>,
            reportedPeptides:Map<number, ReportedPeptide>,
            modMass:number
        }
    ) : void {


        // add the # of psms for the found for each reported peptide to the psm count for this protein for this mod
        for(const reportedPeptide of reportedPeptidesForProtein) {

            // where this reportedPeptide maps in the protein with proteinId, starting at 1
            const reportedPeptidePositionsInProtein = reportedPeptide.proteinMatches.get(proteinId);

            for(const psm of reportedPeptidePSMMap.get(reportedPeptide.reportedPeptideId)) {

                // get generated reported peptide string for psm
                const generatedReportedPeptides:Set<string> = ModProteinSearchPeptideList_SubTableGenerator.getReportedPeptideStringsForPsm({
                    modMass: modMass,
                    psm: psm,
                    reportedPeptides: reportedPeptides,
                    openModPositionOverrideByPeptideString
                });

                // initialize for all found reported peptide strings
                for(const generatedReportedPeptide of generatedReportedPeptides) {
                    if(!(proteinPositionMapByPeptideString.has(generatedReportedPeptide))) {
                        proteinPositionMapByPeptideString.set(generatedReportedPeptide, new Set());
                    }

                    if(!(proteinResidueMapByPeptideString.has(generatedReportedPeptide))) {
                        proteinResidueMapByPeptideString.set(generatedReportedPeptide, new Set());
                    }

                    if(!(psmIdsByPeptideString.has(generatedReportedPeptide))) {
                        psmIdsByPeptideString.set(generatedReportedPeptide, new Set());
                    }

                    // add this psm to the appropriate map
                    psmIdsByPeptideString.get(generatedReportedPeptide).add(psm.psmId);
                }


                if(psm.variable !== null && psm.variable !== undefined) {

                    // add in the positions in this protein
                    for (const peptidePosition of psm.variable.loc) {

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                    if (psm.variable.loc.nterm) {
                        const peptidePosition = 1;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                    if (psm.variable.loc.cterm) {
                        const peptidePosition = reportedPeptide.sequence.length;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                }

                if(psm.open !== null && psm.open !== undefined) {

                    // add in the positions in this protein
                    for (const peptidePosition of psm.open.loc) {

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                    if (psm.open.loc.nterm) {
                        const peptidePosition = 1;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                    if (psm.open.loc.cterm) {
                        const peptidePosition = reportedPeptide.sequence.length;

                        const residueLetterCode = reportedPeptide.sequence.substring(peptidePosition - 1, peptidePosition);

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            proteinResidueMapByPeptideString.get(generatedReportedPeptide).add(residueLetterCode);
                        }

                        for (const proteinPosition of reportedPeptidePositionsInProtein) {
                            const finalPosition = proteinPosition + (peptidePosition - 1);

                            for(const generatedReportedPeptide of generatedReportedPeptides) {
                                proteinPositionMapByPeptideString.get(generatedReportedPeptide).add(finalPosition);
                            }
                        }
                    }

                    // add in the unlocalized start stop for this unlocalized open mod if appropriate
                    if(ModProteinSearchPeptideList_SubTableGenerator.getIsUnlocalizedOpenMod({psm})) {

                        for(const generatedReportedPeptide of generatedReportedPeptides) {
                            if(!(unlocalizedLocsByPeptideString.has(generatedReportedPeptide))) {
                                unlocalizedLocsByPeptideString.set(generatedReportedPeptide, new Array<UnlocalizedStartEnd>());

                                for (const proteinPosition of reportedPeptidePositionsInProtein) {
                                    const start = proteinPosition;
                                    const end = proteinPosition + reportedPeptide.sequence.length - 1;

                                    const unlocalizedPos = new UnlocalizedStartEnd({start, end});

                                    unlocalizedLocsByPeptideString.get(generatedReportedPeptide).push(unlocalizedPos);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Given the psm (and the reported peptide to which it maps), generate the appropriate reported peptide
     * string. Will be in the form of n[123]PEP[23]TI(11)DE or PEPTIDE-(11) or PEP[12](112)TIDE where
     * [] indicates variable mod and () indicates open mod.
     *
     * An open mod will only ever be shown at once condition. If an open mod is predicted at multiple positions
     * for a PSM, one reported peptide will be generated for all positions for which the open mod was predicted
     *
     * @param psm
     * @param reportedPeptides
     */
    static getReportedPeptideStringsForPsm(
        {
            psm,
            reportedPeptides,
            modMass,
            openModPositionOverrideByPeptideString
        }:{
            psm:any,
            reportedPeptides:Map<number, ReportedPeptide>,
            modMass:number,
            openModPositionOverrideByPeptideString:Map<string, OpenModPosition_DataType>
        }
    ) : Set<string> {

        const reportedPeptideStrings:Set<string> = new Set();

        const reportedPeptideId:number = psm.reportedPeptideId;
        if(!(reportedPeptides.has(reportedPeptideId))) {
            const error = new Error("reported peptide id not in reported peptide map...");
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : error } );
            throw error;
        }

        const reportedPeptide:ReportedPeptide = reportedPeptides.get(reportedPeptideId);


        // get variable mod info
        const variableModsByPosition:Map<number, Set<number>> = ModProteinSearchPeptideList_SubTableGenerator.getVariableModsIndexedByPosition({reportedPeptide});
        const nTerminalMods:Set<number> = ModProteinSearchPeptideList_SubTableGenerator.getNTerminalVariableMods({reportedPeptide});
        const cTerminalMods:Set<number> = ModProteinSearchPeptideList_SubTableGenerator.getCTerminalVariableMods({reportedPeptide});

        if(ModProteinSearchPeptideList_SubTableGenerator.hasAnyOpenMod({psm})) {

            if( ModProteinSearchPeptideList_SubTableGenerator.getIsUnlocalizedOpenMod({psm})) {
                const generatedString = ModProteinSearchPeptideList_SubTableGenerator.addModsToPeptideSequence({
                    peptideSequence:reportedPeptide.sequence,
                    variableModsByPosition,
                    nTermMods:nTerminalMods,
                    cTermMods:cTerminalMods,
                    openModPos:null,
                    openModNTerm:false,
                    openModCTerm:false,
                    openModUnloc:true,
                    openModMass:modMass
                });

                reportedPeptideStrings.add(generatedString);
            } else {

                if(ModProteinSearchPeptideList_SubTableGenerator.getIsNTerminalOpenMod({psm})) {
                    const generatedString = ModProteinSearchPeptideList_SubTableGenerator.addModsToPeptideSequence({
                        peptideSequence:reportedPeptide.sequence,
                        variableModsByPosition,
                        nTermMods:nTerminalMods,
                        cTermMods:cTerminalMods,
                        openModPos:null,
                        openModNTerm:true,
                        openModCTerm:false,
                        openModUnloc:false,
                        openModMass:modMass
                    });

                    reportedPeptideStrings.add(generatedString);

                    openModPositionOverrideByPeptideString.set(generatedString, 'n');
                }

                if(ModProteinSearchPeptideList_SubTableGenerator.getIsCTerminalOpenMod({psm})) {
                    const generatedString = ModProteinSearchPeptideList_SubTableGenerator.addModsToPeptideSequence({
                        peptideSequence:reportedPeptide.sequence,
                        variableModsByPosition,
                        nTermMods:nTerminalMods,
                        cTermMods:cTerminalMods,
                        openModPos:null,
                        openModNTerm:false,
                        openModCTerm:true,
                        openModUnloc:false,
                        openModMass:modMass
                    });

                    reportedPeptideStrings.add(generatedString);

                    openModPositionOverrideByPeptideString.set(generatedString, 'c');
                }

                // iterate over each possible open modded position and create a new peptide sequence
                for(const openModPosition of ModProteinSearchPeptideList_SubTableGenerator.getOpenModPositions({psm})) {
                    const generatedString = ModProteinSearchPeptideList_SubTableGenerator.addModsToPeptideSequence({
                        peptideSequence:reportedPeptide.sequence,
                        variableModsByPosition,
                        nTermMods:nTerminalMods,
                        cTermMods:cTerminalMods,
                        openModPos:openModPosition,
                        openModNTerm:false,
                        openModCTerm:false,
                        openModUnloc:false,
                        openModMass:modMass
                    });

                    reportedPeptideStrings.add(generatedString);

                    openModPositionOverrideByPeptideString.set(generatedString, openModPosition);
                }
            }


        } else {
            const generatedString = ModProteinSearchPeptideList_SubTableGenerator.addModsToPeptideSequence({
                peptideSequence:reportedPeptide.sequence,
                variableModsByPosition,
                nTermMods:nTerminalMods,
                cTermMods:cTerminalMods,
                openModPos:null,
                openModNTerm:false,
                openModCTerm:false,
                openModUnloc:false,
                openModMass:null
            });

            reportedPeptideStrings.add(generatedString);
        }



        return reportedPeptideStrings;
    }

    static addModsToPeptideSequence(
        {
            peptideSequence,
            variableModsByPosition,
            nTermMods,
            cTermMods,
            openModPos,
            openModNTerm,
            openModCTerm,
            openModUnloc,
            openModMass
        }:{
            peptideSequence:string,
            variableModsByPosition:Map<number, Set<number>>,
            nTermMods:Set<number>,
            cTermMods:Set<number>,
            openModPos:number,
            openModNTerm:boolean,
            openModCTerm:boolean,
            openModUnloc:boolean,
            openModMass:number
        }
    ) : string {

        let moddedPeptideString:string = '';

        // add in n-term mod masses
        if((nTermMods !== null && nTermMods.size > 0) || (openModMass !== null && openModNTerm)) {
            moddedPeptideString += 'n';

            if(nTermMods !== null && nTermMods.size > 0) {
                moddedPeptideString += '[' + Array.from(nTermMods).sort((a, b) => a - b).join(',') + ']';
            }

            if(openModMass !== null && openModNTerm) {
                moddedPeptideString += '(' + openModMass + ')';
            }
        }


        // add in positional modifications
        for (let i = 0; i < peptideSequence.length; i++) {
            const peptidePosition = i + 1;

            moddedPeptideString += peptideSequence[i];

            if( variableModsByPosition !== null && variableModsByPosition !== undefined) {
                if(variableModsByPosition.has(peptidePosition)) {
                    moddedPeptideString += '[' + Array.from(variableModsByPosition.get(peptidePosition)).sort((a, b) => a - b).join(',') + ']';
                }
            }

            if(openModMass !== null && openModMass !== undefined && openModPos !== null && openModPos !== undefined && openModPos === peptidePosition) {
                moddedPeptideString += '(' + openModMass + ')';
            }
        }


        // add in c-term mod masses
        if((cTermMods !== null && cTermMods.size > 0) || (openModMass !== null && openModCTerm)) {
            moddedPeptideString += 'c';

            if(cTermMods !== null && cTermMods.size > 0) {
                moddedPeptideString += '[' + Array.from(cTermMods).sort((a, b) => a - b).join(',') + ']';
            }

            if(openModMass !== null && openModCTerm) {
                moddedPeptideString += '(' + openModMass + ')';
            }
        }

        // add in unlocalized open mod
        if(openModMass !== null && openModUnloc) {
            moddedPeptideString += '-(' + openModMass + ')';
        }


        return moddedPeptideString;
    }

    /**
     * Returns true if this psm has any open mod, otherwise false
     * @param psm
     */
    static hasAnyOpenMod({psm}:{psm}) : boolean {
        if(ModProteinSearchPeptideList_SubTableGenerator.getOpenModPositions({psm}).size > 0) {
            return true;
        }

        if(ModProteinSearchPeptideList_SubTableGenerator.getIsUnlocalizedOpenMod({psm})) {
            return true;
        }

        if(ModProteinSearchPeptideList_SubTableGenerator.getIsNTerminalOpenMod({psm})) {
            return true;
        }

        if(ModProteinSearchPeptideList_SubTableGenerator.getIsCTerminalOpenMod({psm})) {
            return true;
        }

        return false;
    }

    /**
     * Get set of positions that are candidates to contain the open mod mass for this psm
     *
     * Get empty set if none are found
     *
     * @param psm
     */
    static getOpenModPositions({psm}:{psm}) : Set<number> {
        const positions:Set<number> = new Set();

        if(psm.open !== null && psm.open !== undefined) {
            if(psm.open.loc !== null && psm.open.loc !== undefined) {
                for(const position of psm.open.loc) {
                    positions.add(position);
                }
            }
        }

        return positions;
    }

    static getIsUnlocalizedOpenMod({psm}:{psm}) : boolean {
        if(psm.open !== null && psm.open !== undefined) {
            return psm.open.unloc;
        }

        return false;
    }

    static getIsCTerminalOpenMod({psm}:{psm}) : boolean {

        if(psm.open !== null && psm.open !== undefined) {
            return psm.open.cterm;
        }

        return false;
    }

    static getIsNTerminalOpenMod({psm}:{psm}) : boolean {

        if(psm.open !== null && psm.open !== undefined) {
            return psm.open.nterm;
        }

        return false;
    }

    /**
     * Get all positions at which each mod mass can be found (map indexed on position), where each
     * position points to the set of mod masses (rounded to ints) that were ided on that position
     *
     * Return empty Map if none are found
     *
     * Does not return n- or c-terminal peptides
     * @param reportedPeptide
     */
    static getVariableModsIndexedByPosition({reportedPeptide}:{reportedPeptide:ReportedPeptide}) : Map<number, Set<number>> {
        const variableMods:Map<number, Set<number>> = new Map();

        if(reportedPeptide.variableMods !== null && reportedPeptide.variableMods !== undefined) {
            for(const [modMass, variableMod] of reportedPeptide.variableMods) {

                if(variableMod.positions !== null && variableMod.positions !== undefined) {
                    for (const position of variableMod.positions) {
                        if(!(variableMods.has(position))) {
                            variableMods.set(position, new Set());
                        }
                        variableMods.get(position).add(Math.round(modMass));
                    }
                }
            }
        }

        return variableMods;
    }

    /**
     * Get the rounded (to int) mod masses found at the n-term of this peptide. Returns empty set if none found
     * @param reportedPeptide
     */
    static getNTerminalVariableMods({reportedPeptide} : {reportedPeptide:ReportedPeptide}) : Set<number> {

        const mods:Set<number> = new Set();

        if(reportedPeptide.variableMods !== undefined && reportedPeptide.variableMods !== null) {
            for(const [modMass, variableMod] of reportedPeptide.variableMods) {
                if(variableMod.isNTerm) {
                    mods.add(Math.round(modMass));
                }
            }
        }

        return mods;
    }

    /**
     * Get the rounded (to int) mod mass found at the c-term of this peptide. Returns empty set if none found
     * @param reportedPeptide
     */
    static getCTerminalVariableMods({reportedPeptide} : {reportedPeptide:ReportedPeptide}) : Set<number> {

        const mods:Set<number> = new Set();

        if(reportedPeptide.variableMods !== undefined && reportedPeptide.variableMods !== null) {
            for(const [modMass, variableMod] of reportedPeptide.variableMods) {
                if(variableMod.isCTerm) {
                    mods.add(Math.round(modMass));
                }
            }
        }

        return mods;
    }
}




class PeptideDataForModProteinSearch {

    private readonly _peptideString:string;
    private readonly _modifiedResidues:Set<string>;
    private readonly _modifiedPositions:Set<number>;
    private readonly _projectSearchId:number;
    private readonly _modMass:number;
    private readonly _psmIds:Set<number>;
    private readonly _unlocalizedPositionRanges:Array<UnlocalizedStartEnd>;
    private readonly _openModPositionOverride:OpenModPosition_DataType;

    constructor(
        {
            peptideString,
            modifiedResidues,
            modifiedPositions,
            psmIds,
            projectSearchId,
            modMass,
            unlocalizedPositionRanges,
            openModPositionOverride
        }:{
            peptideString:string
            modifiedResidues:Set<string>,
            modifiedPositions:Set<number>,
            psmIds:Set<number>,
            projectSearchId:number,
            modMass:number,
            unlocalizedPositionRanges:Array<UnlocalizedStartEnd>,
            openModPositionOverride:OpenModPosition_DataType
        }
    ) {
        this._peptideString = peptideString;
        this._modifiedResidues = modifiedResidues;
        this._modifiedPositions = modifiedPositions;
        this._psmIds = psmIds;
        this._projectSearchId = projectSearchId;
        this._modMass = modMass;
        this._unlocalizedPositionRanges = unlocalizedPositionRanges;
        this._openModPositionOverride = openModPositionOverride;
    }


    get unlocalizedPositionRanges(): Array<UnlocalizedStartEnd> {
        return this._unlocalizedPositionRanges;
    }

    get projectSearchId(): number {
        return this._projectSearchId;
    }

    get modMass(): number {
        return this._modMass;
    }

    get peptideString(): string {
        return this._peptideString;
    }

    get modifiedResidues(): Set<string> {
        return this._modifiedResidues;
    }

    get modifiedPositions(): Set<number> {
        return this._modifiedPositions;
    }

    get psmIds(): Set<number> {
        return this._psmIds;
    }

    get openModPositionOverride(): OpenModPosition_DataType {
        return this._openModPositionOverride;
    }
}

export class UnlocalizedStartEnd {
    private readonly _start;
    private readonly _end;

    constructor(
        {
            start,
            end
        } : {
            start:number,
            end:number
        }
    ) {
        this._start = start;
        this._end = end;
    }

    toString():string {
        if(this.start === this.end) {
            return this.start.toString();
        }

        return "[" + this.start + "-" + this.end + "]";
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }
}