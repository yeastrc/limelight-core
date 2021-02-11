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

export class ModViewDataManager {

    private readonly _psmCountData: Map<number, number>;
    private readonly _scanCountData: Map<number, number>;
    private readonly _psmModData : Map<number, object>;
    private readonly _scanModData : Map<number, object>;

    private readonly _proteinData : Map<number, Map<number, Protein>>;  // keyed on search id then protein version id

    private readonly _psmsForModMasses : Map<number, Map<number, Array<any>>>;

    private readonly _scanInfoForPsms : Map<number, Map<number, PsmScanInfo>>;

    // keyed on: search id, then mod mass, then reported peptide id, then psm id
    private readonly _openModPsmsForModMassReportedPeptideId : Map<number, Map<number, Map<number, Map<number, any>>>>;

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

    async getReportedPeptides({projectSearchId}:{projectSearchId:number}): Promise<Map<number, ReportedPeptide>> {

        // have to go get the data
        if(!(this._reportedPeptides.has(projectSearchId))) {
            const response:any = await this._dataLoader.getReportedPeptidesForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._reportedPeptides.set(projectSearchId, response);
        }

        return this._reportedPeptides.get(projectSearchId);
    }

    async loadPsmsForModMasses({ modMasses, projectSearchId } : { modMasses:Array<number>, projectSearchId:number }):Promise<void> {
        console.log('called loadPsmsForModMasses()', modMasses, projectSearchId);

        if(!(this._psmsForModMasses.has(projectSearchId))) {
            this._psmsForModMasses.set(projectSearchId, new Map());
        }

        const response:any = await this._dataLoader.getPSMDataForProjectSearchIdModMasses({
            searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
            projectSearchId,
            modMasses
        });

        for(const psmItem of response) {
            const modMass:number = psmItem.modMass;

            if(!(this._psmsForModMasses.get(projectSearchId).has(modMass))) {
                this._psmsForModMasses.get(projectSearchId).set(modMass, new Array<any>());
            }

            this._psmsForModMasses.get(projectSearchId).get(modMass).push(psmItem);
        }

        console.log('done');
    }

    async getScanInfoForAllPsms({ projectSearchId } : { projectSearchId:number}):Promise<Map<number, PsmScanInfo>> {

        if(!(this._scanInfoForPsms.has(projectSearchId))) {
            this._scanInfoForPsms.set(projectSearchId, await this._dataLoader.getScanDataForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            }));
        }

        return this._scanInfoForPsms.get(projectSearchId);
    }

    async getScanInfoForPsm({ psmId, projectSearchId } : { psmId:number, projectSearchId:number}):Promise<PsmScanInfo> {

        //console.log('called getScanInfoForPsm', psmId, projectSearchId);

        if(!(this._scanInfoForPsms.has(projectSearchId))) {
            this._scanInfoForPsms.set(projectSearchId, await this._dataLoader.getScanDataForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            }));
        }

        return this._scanInfoForPsms.get(projectSearchId).get(psmId);
    }

    async getPsmsForModMass({ modMass, projectSearchId } : { modMass:number, projectSearchId:number }):Promise<Array<any>> {
        console.log('called getPsmsForModMass()', modMass, projectSearchId);

        // have to go get the data
        if(!(this._psmsForModMasses.has(projectSearchId))) {
            this._psmsForModMasses.set(projectSearchId, new Map());
        }

        if(!(this._psmsForModMasses.get(projectSearchId).has(modMass))) {

            const response:any = await this._dataLoader.getPSMDataForProjectSearchIdModMass({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId,
                modMass
            });

            this._psmsForModMasses.get(projectSearchId).set(modMass, response);
        }

        console.log('got', this._psmsForModMasses.get(projectSearchId).get(modMass));
        return this._psmsForModMasses.get(projectSearchId).get(modMass);
    }

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
        }) : Promise<any> {

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
    }

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
        }) : Promise<void> {

        this._proteinData.set(projectSearchId, new Map());

        const response:any = await this._dataLoader.getProteinAnnotationDataForSingleProjectSearchId({
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
    }

    /**
     * Get a set of all unique protein ids found in the given searches
     *
     * @param projectSearchIds
     */
    async getAllProteinIdsInSearches(
        {
            projectSearchIds
        } : {
            projectSearchIds:Array<number>
        }
    ) : Promise<Set<number>> {

        const proteinIds = new Set<number>();

        for(const projectSearchId of projectSearchIds) {

            // have to go get the data
            if(!(this._proteinData.has(projectSearchId))) {
                await this.loadProteinDataForProjectSearchId({projectSearchId});
            }

            for(const proteinId of this._proteinData.get(projectSearchId).keys()) {
                proteinIds.add(proteinId);
            }
        }

        return proteinIds;
    }

    /**
     * Get all the names for the given protein in the given array of searches
     *
     * @param projectSearchIds
     * @param proteinId
     */
    async getAllNamesForProteinInSearches(
        {
            projectSearchIds,
            proteinId
        } : {
            projectSearchIds:Array<number>,
            proteinId:number
        }) : Promise<Set<string>> {

        const names = new Set<string>();

        for(const projectSearchId of projectSearchIds) {
            const searchNames = await this.getNamesForProtein({projectSearchId, proteinId});
            for(const name of searchNames) {
                names.add(name);
            }
        }

        return names;
    }

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
    }): Promise<Set<string>> {

        // have to go get the data
        if(!(this._proteinData.has(projectSearchId))) {
            await this.loadProteinDataForProjectSearchId({projectSearchId});
        }

        const names = new Set<string>();

        for(const name of this._proteinData.get(projectSearchId).get(proteinId).annotations.keys()) {
            names.add(name);
        }

        return names;
    }

    /**
     * Get all data we have for a protein in a given search. Returns a Protein object with
     * id, annotations (name/description), and length for that protein
     *
     * @param proteinId
     * @param projectSearchId
     */
    async getDataForProtein({
                                proteinId,
                                projectSearchId
                            } : {
        proteinId:number,
        projectSearchId:number
    }): Promise<Protein> {

        // have to go get the data
        if(!(this._proteinData.has(projectSearchId))) {
            await this.loadProteinDataForProjectSearchId({projectSearchId});
        }

        return this._proteinData.get(projectSearchId).get(proteinId);
    }

    /**
     * Get all data for this protein from all the supplied projectSearchIds
     * @param proteinId
     * @param projectSearchIds
     */
    async getDataForProteinMultipleSearches({
                                proteinId,
                                projectSearchIds
                            } : {
        proteinId:number,
        projectSearchIds:Array<number>
    }): Promise<Protein> {

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
    }


    async getTotalPSMCount(projectSearchId:number): Promise<number> {
        console.log('called getTotalPSMCount()');

        if(!(this._psmCountData.has(projectSearchId))) {

            const response:any = await this._dataLoader.getTotalPSMCountForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._psmCountData.set(projectSearchId, response.psmCount);
        }

        return this._psmCountData.get(projectSearchId);
    }

    async getTotalScanCount(projectSearchId:number): Promise<number> {
        console.log('called getTotalScanCount()');

        if(!(this._scanCountData.has(projectSearchId))) {

            const response:any = await this._dataLoader.getTotalScanCountForSingleProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._scanCountData.set(projectSearchId, response.scanCount);
        }

        return this._scanCountData.get(projectSearchId);
    }

    async getPSMModData(projectSearchId:number): Promise<object> {
        console.log('called getPSMModData()');

        if(!(this._psmModData.has(projectSearchId))) {

            const response:any = await this._dataLoader.getPSMModDataForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._psmModData.set(projectSearchId, response);
        }

        return this._psmModData.get(projectSearchId);
    }

    async getScanModData(projectSearchId:number): Promise<object> {
        console.log('called getScanModData()');

        if(!(this._scanModData.has(projectSearchId))) {

            const response:any = await this._dataLoader.getScanModDataForProjectSearchId({
                searchDataLookupParams:this._searchDetailsProjectMap.get(projectSearchId),
                projectSearchId
            });

            this._scanModData.set(projectSearchId, response);
        }

        return this._scanModData.get(projectSearchId);
    }

}