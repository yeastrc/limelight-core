import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

export class ModProteinList_SubTableProperties {

    private readonly _modMass:number;
    private readonly _vizOptionsData: any;
    private readonly _modViewDataManager: ModViewDataManager;
    private readonly _searchDetailsBlockDataMgmtProcessing: any;
    private readonly _dataPageStateManager_DataFrom_Server: DataPageStateManager;

    constructor({

                    vizSelectedStateObject,
                    searchDetailsBlockDataMgmtProcessing,
                    dataPageStateManager_DataFrom_Server,
                    projectSearchIds,
                    modViewDataManager,
                    vizOptionsData,
                    colorScale,
                    modMass
                }:{
                    vizSelectedStateObject,
                    searchDetailsBlockDataMgmtProcessing,
                    dataPageStateManager_DataFrom_Server,
                    projectSearchIds,
                    modViewDataManager:ModViewDataManager,
                    vizOptionsData,
                    colorScale,
                    modMass:number

                }) {


        this._modMass = modMass;
        this._vizOptionsData = vizOptionsData;
        this._modViewDataManager = modViewDataManager;
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
    }


    get dataPageStateManager_DataFrom_Server(): DataPageStateManager {
        return this._dataPageStateManager_DataFrom_Server;
    }

    get searchDetailsBlockDataMgmtProcessing(): any {
        return this._searchDetailsBlockDataMgmtProcessing;
    }

    get modMass(): number {
        return this._modMass;
    }

    get vizOptionsData(): any {
        return this._vizOptionsData;
    }

    get modViewDataManager(): ModViewDataManager {
        return this._modViewDataManager;
    }
}