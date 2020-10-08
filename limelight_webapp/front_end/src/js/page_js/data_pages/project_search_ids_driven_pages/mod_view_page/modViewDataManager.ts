/**
 * Holds modData loaded via web services, will load data on demand if necessary
 */

import {ModViewPage_DataLoader} from './modViewDataLoader';

export class ModViewDataManager {

    private readonly _psmCountData: Map<number, number>;
    private readonly _scanCountData: Map<number, number>;
    private readonly _psmModData : Map<number, object>;
    private readonly _scanModData : Map<number, object>;

    private readonly _searchDetailsBlockDataMgmtProcessing: any;
    private readonly _dataLoader: ModViewPage_DataLoader;

    constructor(searchDetailsBlockDataMgmtProcessing) {
        this._psmCountData = new Map();
        this._scanCountData = new Map();
        this._psmModData = new Map();
        this._scanModData = new Map();

        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._dataLoader = new ModViewPage_DataLoader();
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