/**
 * Holds modData loaded via web services, will load data on demand if necessary
 */

import {ModViewPage_DataLoader} from './modViewDataLoader';
import {
    ReportedPeptide,
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {Protein} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/Protein";
import {PsmScanInfo} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/PsmScanInfo";
import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

export class ModViewDataManager {

    //  Cached Data : Map<projectSearchId, data>

    private readonly _psmCountData: Map<number, number>;
    private readonly _scanCountData: Map<number, number>;
    private readonly _psmModData : Map<number, ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId>;
    private readonly _scanModData : Map<number, ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId>;

    private readonly _proteinData : Map<number, Map<number, Protein>>;  // keyed on search id then protein version id
    private readonly _proteinSequences : Map<number, string>;   // cached sequences for protein sequence version ids

    private readonly _psmsForModMasses : Map<number, Map<number, Array<ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry>>>;

    private readonly _scanInfoForPsms : Map<number, Map<number, PsmScanInfo>>;

    // keyed on: search id, then mod mass, then reported peptide id, then psm id
    private readonly _openModPsmsForModMassReportedPeptideId : Map<number, Map<number, Map<number, Map<number, ModPage_ModViewDataManager_OpenMo_Psm_For_ModMassReportedPeptideIdPsmId_Entry>>>>;

    private readonly _reportedPeptides : Map<number, Map<number, ReportedPeptide>>;

    private readonly _dataLoader: ModViewPage_DataLoader;

    private readonly _searchDetailsProjectMap:Map<number, SearchDataLookupParams_For_Single_ProjectSearchId>;
    private readonly _searchDataLookupParameters_Root:SearchDataLookupParameters_Root;

    constructor(searchDataLookupParameters_Root : SearchDataLookupParameters_Root ) {
        this._psmCountData = new Map();
        this._scanCountData = new Map();
        this._psmModData = new Map();
        this._scanModData = new Map();
        this._psmsForModMasses = new Map();
        this._reportedPeptides = new Map();
        this._proteinData = new Map();
        this._openModPsmsForModMassReportedPeptideId = new Map();
        this._scanInfoForPsms = new Map();
        this._proteinSequences = new Map();

        this._searchDetailsProjectMap = new Map();
        for(const searchDetails of searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList) {
            this._searchDetailsProjectMap.set(searchDetails.projectSearchId, searchDetails);
        }

        this._searchDataLookupParameters_Root = searchDataLookupParameters_Root;

        this._dataLoader = new ModViewPage_DataLoader();
    }


    get searchDataLookupParameters_Root(): SearchDataLookupParameters_Root {
        return this._searchDataLookupParameters_Root;
    }

    async getProteinSequence({projectSearchId, proteinSequenceVersionId}:{projectSearchId:number, proteinSequenceVersionId:number}) { try {

        // have to go get the data
        if(!(this._proteinSequences.has(proteinSequenceVersionId))) {
            const response = await this._dataLoader.getProteinSequencesForProjectSearchId({
                proteinSequenceVersionIds: [proteinSequenceVersionId],
                projectSearchId
            });

            for(const proteinSequenceVersionId of Object.keys(response)) {
                this._proteinSequences.set(parseInt(proteinSequenceVersionId), response[proteinSequenceVersionId].sequence);
            }
        }

        if(!(this._proteinSequences.has(proteinSequenceVersionId))) {
            const e = new Error("Could not find sequence for proteinSequenceVersionId: " + proteinSequenceVersionId);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

        return this._proteinSequences.get(proteinSequenceVersionId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getReportedPeptides({projectSearchId}:{projectSearchId:number}): Promise<Map<number, ReportedPeptide>> { try {

        // have to go get the data
        if(!(this._reportedPeptides.has(projectSearchId))) {
            const response = await this._dataLoader.getReportedPeptidesForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._reportedPeptides.set(projectSearchId, response);
        }

        return this._reportedPeptides.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async loadPsmsForModMasses({ modMasses, projectSearchId } : { modMasses:Array<number>, projectSearchId:number }):Promise<void> { try {

        console.log('called loadPsmsForModMasses()', modMasses, projectSearchId);

        if(!(this._psmsForModMasses.has(projectSearchId))) {
            this._psmsForModMasses.set(projectSearchId, new Map());
        }

        const response = await this._dataLoader.getPSMDataForProjectSearchIdModMasses({
            searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
            projectSearchId,
            modMasses
        });

        for (const psmItem_FromArray of response) {

            const psmItem = psmItem_FromArray as ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry

            const modMass = psmItem.modMass;

            if (!(this._psmsForModMasses.get(projectSearchId).has(modMass))) {
                this._psmsForModMasses.get(projectSearchId).set(modMass, []);
            }

            const psmItem_Out = psmItem

            this._psmsForModMasses.get(projectSearchId).get(modMass).push(psmItem_Out);
        }

        console.log('done');

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getScanInfoForAllPsms({ projectSearchId } : { projectSearchId:number}):Promise<Map<number, PsmScanInfo>> { try {

        if(!(this._scanInfoForPsms.has(projectSearchId))) {
            this._scanInfoForPsms.set(projectSearchId, await this._dataLoader.getScanDataForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            }));
        }

        return this._scanInfoForPsms.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    //  UNUSED

    // async getScanInfoForPsm({ psmId, projectSearchId } : { psmId:number, projectSearchId:number}):Promise<PsmScanInfo> {
    //
    //     //console.log('called getScanInfoForPsm', psmId, projectSearchId);
    //
    //     if(!(this._scanInfoForPsms.has(projectSearchId))) {
    //         this._scanInfoForPsms.set(projectSearchId, await this._dataLoader.getScanDataForSingleProjectSearchId({
    //             searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
    //             projectSearchId
    //         }));
    //     }
    //
    //     return this._scanInfoForPsms.get(projectSearchId).get(psmId);
    // }

    async getPsmsForModMass({ modMass, projectSearchId } : { modMass:number, projectSearchId:number }):Promise<Array<ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry>> { try {

        console.log('called getPsmsForModMass()', modMass, projectSearchId);

        // have to go get the data
        if(!(this._psmsForModMasses.has(projectSearchId))) {
            this._psmsForModMasses.set(projectSearchId, new Map());
        }

        if(!(this._psmsForModMasses.get(projectSearchId).has(modMass))) {

            const response = await this._dataLoader.getPSMDataForProjectSearchIdModMass({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId,
                modMass
            });

            const psmItemArray_Out: Array<ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry> = response

            this._psmsForModMasses.get(projectSearchId).set(modMass, psmItemArray_Out);
        }

        console.log('got', this._psmsForModMasses.get(projectSearchId).get(modMass));

        return this._psmsForModMasses.get(projectSearchId).get(modMass);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Get the open mod psms for the given mod mass in the given search for the given reported peptide id
     * Load data if necessary
     * Returns empty array if none are found
     *
     * @param modMass
     * @param projectSearchId
     * @param reportedPeptideId
     * @param psmId
     */
    async getOpenModPsmForModMassReportedPeptideIdPsmId(
        {
            modMass,
            projectSearchId,
            reportedPeptideId,
            psmId
        } : {
            modMass:number,
            projectSearchId:number,
            reportedPeptideId:number,
            psmId:number
        }) : Promise<ModPage_ModViewDataManager_OpenMo_Psm_For_ModMassReportedPeptideIdPsmId_Entry> { try {

        if(!(this._openModPsmsForModMassReportedPeptideId.has(projectSearchId))) {
            const response = await this._dataLoader.getOpenModPSMDataForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._openModPsmsForModMassReportedPeptideId.set(projectSearchId, response);
        }

        if(
            this._openModPsmsForModMassReportedPeptideId.get(projectSearchId).has(modMass) &&
            this._openModPsmsForModMassReportedPeptideId.get(projectSearchId).get(modMass).has(reportedPeptideId) &&
            this._openModPsmsForModMassReportedPeptideId.get(projectSearchId).get(modMass).get(reportedPeptideId).has(psmId)) {

            return this._openModPsmsForModMassReportedPeptideId.get(projectSearchId).get(modMass).get(reportedPeptideId).get(psmId);
        }

        console.log('did not find a psm, could be weird.');

        return null;

    }  catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Load and save all protein data (currently names and length) for all proteins in the given project search id
     *
     * @param projectSearchId
     */
    async loadProteinDataForProjectSearchId(
        {
            projectSearchId
        } : {
            projectSearchId:number
        }) : Promise<void> { try {

        this._proteinData.set(projectSearchId, new Map());

        const response = await this._dataLoader.getProteinAnnotationDataForSingleProjectSearchId({
            searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
            projectSearchId
        });

        for(const proteinId of Object.keys(response)) {

            const length = response[proteinId]['proteinLength'];
            const annotations = new Map<string, Set<string>>();

            for(const annotation of response[proteinId]['annotations']) {
                const name = annotation.name;
                const description = annotation.description;

                if(!(annotations.has(name))) { annotations.set(name, new Set()); }
                if(description !== null) {
                    annotations.get(name).add(description);
                }
            }

            const protein = new Protein({id:parseInt(proteinId), annotations, length});
            this._proteinData.get(projectSearchId).set(parseInt(proteinId), protein);
        }

    }  catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    //   UNUSED

    // /**
    //  * Get all the names for the given protein in the given array of searches
    //  *
    //  * @param projectSearchIds
    //  * @param proteinId
    //  */
    // async getAllNamesForProteinInSearches(
    //     {
    //         projectSearchIds,
    //         proteinId
    //     } : {
    //         projectSearchIds:Array<number>,
    //         proteinId:number
    //     }) : Promise<Set<string>> {
    //
    //     const names = new Set<string>();
    //
    //     for(const projectSearchId of projectSearchIds) {
    //         const searchNames = await this.getNamesForProtein({projectSearchId, proteinId});
    //         for(const name of searchNames) {
    //             names.add(name);
    //         }
    //     }
    //
    //     return names;
    // }

    /**
     * Get all names for the given protein in the given search
     *
     * @param proteinId
     * @param projectSearchId
     */
    async getNamesForProtein({
        proteinId,
        projectSearchId
                             } : {
        proteinId:number,
        projectSearchId:number
    }): Promise<Set<string>> { try {

        // have to go get the data
        if(!(this._proteinData.has(projectSearchId))) {
            await this.loadProteinDataForProjectSearchId({projectSearchId});
        }

        const names = new Set<string>();

        for(const name of this._proteinData.get(projectSearchId).get(proteinId).annotations.keys()) {
            names.add(name);
        }

        return names;

    }  catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Get all descriptions for the given protein in the given search
     *
     * @param proteinId
     * @param projectSearchId
     *
     * @returns empty Set if no Descriptions found
     */
    async getDescriptionsForProtein(
        {
            proteinId,
            projectSearchId
        } : {
            proteinId:number,
            projectSearchId:number
        }): Promise<Set<string>> { try {

        // have to go get the data
        if(!(this._proteinData.has(projectSearchId))) {
            await this.loadProteinDataForProjectSearchId({projectSearchId});
        }

        const descriptions_Result = new Set<string>();

        for(const descriptions_Entry of this._proteinData.get(projectSearchId).get(proteinId).annotations.values()) {
            if (descriptions_Entry === undefined || descriptions_Entry === null || descriptions_Entry.size < 1) {
                continue
            }
            for (const description of descriptions_Entry) {
                descriptions_Result.add( description );
            }
        }

        return descriptions_Result;

    }  catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getProteinNamesAndDescriptions(
        {
            proteinId,
            projectSearchIds
        } : {
            proteinId:number,
            projectSearchIds:Array<number>
        }
        ) : Promise<Array<{ name: string, description: string }>> { try {

        const proteinNamesAndDescriptions = new Array<{ name: string, description: string }>();

        const protein:Protein = await this.getDataForProteinMultipleSearches({proteinId, projectSearchIds});
        for(const [name, descriptions] of protein.annotations) {

            if(descriptions === undefined || descriptions === null || descriptions.size < 1) {
                proteinNamesAndDescriptions.push(
                    {
                        name: name,
                        description: 'No description found.'
                    }
                );
            } else {
                for (const description of descriptions) {
                    proteinNamesAndDescriptions.push(
                        {
                            name: name,
                            description: description
                        }
                    );
                }
            }
        }

        return proteinNamesAndDescriptions;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Get all data we have for a protein in a given search. Returns a Protein object with
     * id, annotations (name/description), and length for that protein
     *
     * @param proteinId
     * @param projectSearchId
     */
    private async getDataForProtein({
                                proteinId,
                                projectSearchId
                            } : {
        proteinId:number,
        projectSearchId:number
    }): Promise<Protein> { try {

        // have to go get the data
        if(!(this._proteinData.has(projectSearchId))) {
            await this.loadProteinDataForProjectSearchId({projectSearchId});
        }

        return this._proteinData.get(projectSearchId).get(proteinId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Get all data for this protein from all the supplied projectSearchIds
     * @param proteinId
     * @param projectSearchIds
     */
    private async getDataForProteinMultipleSearches({
                                proteinId,
                                projectSearchIds
                            } : {
        proteinId:number,
        projectSearchIds:Array<number>
    }): Promise<Protein> { try {

        const annotations = new Map<string, Set<string>>();
        let length;

        // build the annotations
        for(const projectSearchId of projectSearchIds) {
            const protein = await this.getDataForProtein({proteinId, projectSearchId});

            if(protein !== undefined && protein !== null) {
                if(length === undefined) { length = protein.length; }

                for(const [name, descriptions] of protein.annotations) {
                    if(!(annotations.has(name))) {
                        annotations.set(name, new Set());
                    }

                    for(const description of descriptions) {
                        annotations.get(name).add(description);
                    }
                }
            }
        }

        return new Protein({id:proteinId, annotations, length});

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    async getTotalPSMCount(projectSearchId:number): Promise<number> { try {

        console.log('called getTotalPSMCount()');

        if(!(this._psmCountData.has(projectSearchId))) {

            const response = await this._dataLoader.getTotalPSMCountForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._psmCountData.set(projectSearchId, response.psmCount);
        }

        return this._psmCountData.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getTotalScanCount(projectSearchId:number): Promise<number> { try {

        console.log('called getTotalScanCount()');

        if(!(this._scanCountData.has(projectSearchId))) {

            const response = await this._dataLoader.getTotalScanCountForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._scanCountData.set(projectSearchId, response.scanCount);
        }

        return this._scanCountData.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getPSMModData(projectSearchId:number): Promise<ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId> { try {

        console.log('called getPSMModData()');

        if(!(this._psmModData.has(projectSearchId))) {

            const webserviceResponse = await this._dataLoader.getPSMModDataForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            const data_For_PsmId_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: Map<number, Array<ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId>> = new Map()

            for (const reportedPeptideId_String of Object.keys(webserviceResponse)) {

                const reportedPeptideId_Num = Number.parseInt( reportedPeptideId_String )

                const psmIdEntryArray: Array<ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId> = []

                for ( const psmId_Entry_For_reportedPeptideId_INPUT of webserviceResponse[ reportedPeptideId_String ] ) {

                    const psmId_Entry_Output: ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = {
                        variable: psmId_Entry_For_reportedPeptideId_INPUT.variable,
                        open: psmId_Entry_For_reportedPeptideId_INPUT.open,
                        psmId: psmId_Entry_For_reportedPeptideId_INPUT.psmId
                    }

                    psmIdEntryArray.push( psmId_Entry_Output )
                }

                data_For_PsmId_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.set( reportedPeptideId_Num, psmIdEntryArray )
            }

            const data_For_Single_ProjectSearchId : ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId = {
                data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: data_For_PsmId_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId
            }

            this._psmModData.set(projectSearchId, data_For_Single_ProjectSearchId);
        }

        return this._psmModData.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    async getScanModData(projectSearchId:number): Promise<ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId> { try {

        console.log('called getScanModData()');

        if(!(this._scanModData.has(projectSearchId))) {

            const webserviceResponse = await this._dataLoader.getScanModDataForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            const data_For_ScanNumber_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: Map<number, Array<ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId>> = new Map()

            for (const reportedPeptideId_String of Object.keys(webserviceResponse)) {

                const reportedPeptideId_Num = Number.parseInt( reportedPeptideId_String )

                const scanNumberEntryArray: Array<ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId> = []

                for ( const scanNumber_Entry_For_reportedPeptideId_INPUT of webserviceResponse[ reportedPeptideId_String ] ) {

                    const scanNumber_Entry_Output: ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = {
                        variable: scanNumber_Entry_For_reportedPeptideId_INPUT.variable,
                        open: scanNumber_Entry_For_reportedPeptideId_INPUT.open,
                        psmIds: scanNumber_Entry_For_reportedPeptideId_INPUT.psmIds,
                        scnm: scanNumber_Entry_For_reportedPeptideId_INPUT.scnm,
                        sfid: scanNumber_Entry_For_reportedPeptideId_INPUT.sfid
                    }

                    scanNumberEntryArray.push( scanNumber_Entry_Output )
                }

                data_For_ScanNumber_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.set( reportedPeptideId_Num, scanNumberEntryArray )
            }

            const data_For_Single_ProjectSearchId : ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId = {
                data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: data_For_ScanNumber_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId
            }


            this._scanModData.set(projectSearchId, data_For_Single_ProjectSearchId);
        }

        return this._scanModData.get(projectSearchId);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}


////////////////////

//   Data Classes


export class ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry {

    variable: ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry_VariableModDataEntry
    open: ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry_OpenModDataEntry
    psmId: number
    modMass: number
    reportedPeptideId: number
}

export class ModPage_ModViewDataManager_OpenMo_Psm_For_ModMassReportedPeptideIdPsmId_Entry {

    open: ModPage_ModViewDataManager_OpenMo_Psm_For_ModMassReportedPeptideIdPsmId_Entry_OpenModData_Entry
    readonly psmId: number
    readonly reportedPeptideId: number
}

export class ModPage_ModViewDataManager_OpenMo_Psm_For_ModMassReportedPeptideIdPsmId_Entry_OpenModData_Entry {

    loc: Array<number>
    nterm: boolean
    cterm: boolean
    unloc: boolean
}

export class ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry_VariableModDataEntry {

    loc: Array<number>
    nterm: boolean
    cterm: boolean
}

export class ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry_OpenModDataEntry {

    loc: Array<number>
    nterm: boolean
    cterm: boolean
    unloc: boolean
}



export class ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId {

    readonly data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: ReadonlyMap<number, Array<ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId>>
}

export class ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId {

    readonly variable: ReadonlyArray<number>
    readonly open: ReadonlyArray<number>

    readonly psmId: number
}

export function is_ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item: ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId | ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId):
    item is ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId {

    return (item as ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId).psmId !== undefined;
}

export class ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId {

    readonly data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId: ReadonlyMap<number, Array<ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId>>
}

export class ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId {

    readonly variable: ReadonlyArray<number>
    readonly open: ReadonlyArray<number>

    readonly psmIds: Array<number>
    /**
     * scan number
     */
    scnm: number        // scan number
    /**
     * search scan filename id
     */
    sfid: number        // search scan filename id

}

export function is_ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item: ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId | ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId):
    item is ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId {

    return (item as ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId).psmIds !== undefined;
}
