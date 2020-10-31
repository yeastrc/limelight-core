/**
 * Holds modData loaded via web services, will load data on demand if necessary
 */

import {ModViewPage_DataLoader} from './modViewDataLoader';
import {
    ReportedPeptide,
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";

export class ModViewDataManager {

    private readonly _psmCountData: Map<number, number>;
    private readonly _scanCountData: Map<number, number>;
    private readonly _psmModData : Map<number, object>;
    private readonly _scanModData : Map<number, object>;

    private readonly _proteinNames : Map<number, Map<number, Set<string>>>;
    private readonly _psmsForModMasses : Map<number, Map<number, Array<any>>>;
    private readonly _reportedPeptides : Map<number, Map<number, ReportedPeptide>>;

    private readonly _searchDetailsBlockDataMgmtProcessing: any;
    private readonly _dataLoader: ModViewPage_DataLoader;

    constructor(searchDetailsBlockDataMgmtProcessing) {
        this._psmCountData = new Map();
        this._scanCountData = new Map();
        this._psmModData = new Map();
        this._scanModData = new Map();
        this._psmsForModMasses = new Map();
        this._reportedPeptides = new Map();

        this._proteinNames = new Map();

        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._dataLoader = new ModViewPage_DataLoader();
    }

    async getReportedPeptides({projectSearchId}:{projectSearchId:number}): Promise<Map<number, ReportedPeptide>> {
        console.log('called getReportedPeptides()');

        // have to go get the data
        if(!(this._reportedPeptides.has(projectSearchId))) {
            const response:any = await this._dataLoader.getReportedPeptidesForProjectSearchId({
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
                projectSearchId
            });

            this._reportedPeptides.set(projectSearchId, response);
        }

        return this._reportedPeptides.get(projectSearchId);
    }

    async getPsmsForModMass({ modMass, projectSearchId } : { modMass:number, projectSearchId:number }):Promise<Array<any>> {
        console.log('called getPsmsForModMass()', modMass, projectSearchId);

        // have to go get the data
        if(!(this._psmsForModMasses.has(projectSearchId))) {
            this._psmsForModMasses.set(projectSearchId, new Map());
        }

        if(!(this._psmsForModMasses.get(projectSearchId).has(modMass))) {

            const response:any = await this._dataLoader.getPSMDataForProjectSearchIdModMass({
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
                projectSearchId,
                modMass
            });

            this._psmsForModMasses.get(projectSearchId).set(modMass, response);
        }

        console.log('got', this._psmsForModMasses.get(projectSearchId).get(modMass));
        return this._psmsForModMasses.get(projectSearchId).get(modMass);
    }

    async getNamesForProtein({
        proteinId,
        projectSearchId
                             } : {
        proteinId:number,
        projectSearchId:number
    }): Promise<Set<string>> {

        console.log('called getNamesForProtein()');

        // have to go get the data
        if(!(this._proteinNames.has(projectSearchId))) {

            this._proteinNames.set(projectSearchId, new Map());

            const response:any = await this._dataLoader.getProteinAnnotationDataForSingleProjectSearchId({
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
                projectSearchId
            });

            for(const proteinId of Object.keys(response)) {
                this._proteinNames.get(projectSearchId).set(parseInt(proteinId), new Set());

                for(const annotation of response[proteinId]['annotations']) {
                    const name = annotation.name;
                    this._proteinNames.get(projectSearchId).get(parseInt(proteinId)).add(name);
                }
            }
        }

        return this._proteinNames.get(projectSearchId).get(proteinId);
    }

    async getTotalPSMCount(projectSearchId:number): Promise<number> {
        console.log('called getTotalPSMCount()');

        if(!(this._psmCountData.has(projectSearchId))) {

            const response:any = await this._dataLoader.getTotalPSMCountForSingleProjectSearchId({
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
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
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
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
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
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
                searchDetailsBlockDataMgmtProcessing:this._searchDetailsBlockDataMgmtProcessing,
                projectSearchId
            });

            this._scanModData.set(projectSearchId, response);
        }

        return this._scanModData.get(projectSearchId);
    }

}