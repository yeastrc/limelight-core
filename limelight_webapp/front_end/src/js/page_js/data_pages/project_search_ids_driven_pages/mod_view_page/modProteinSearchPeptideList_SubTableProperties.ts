import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

export class ModProteinSearchPeptideList_SubTableProperties {

    private readonly _modMass:number;
    private readonly _proteinId:number;
    private readonly _projectSearchId:number;
    private readonly _vizOptionsData: any;
    private readonly _modViewDataManager: ModViewDataManager;
    private readonly _searchDetailsBlockDataMgmtProcessing: any;
    private readonly _dataPageStateManager_DataFrom_Server:DataPageStateManager;

    constructor({

                    searchDetailsBlockDataMgmtProcessing,
                    modViewDataManager,
                    vizOptionsData,
                    modMass,
                    proteinId,
                    projectSearchId,
                    dataPageStateManager_DataFrom_Server
                }:{
        searchDetailsBlockDataMgmtProcessing,
        modViewDataManager:ModViewDataManager,
        vizOptionsData,
        modMass:number,
        proteinId:number,
        projectSearchId:number,
        dataPageStateManager_DataFrom_Server:DataPageStateManager
    }) {


        this._modMass = modMass;
        this._vizOptionsData = vizOptionsData;
        this._modViewDataManager = modViewDataManager;
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._proteinId = proteinId;
        this._projectSearchId = projectSearchId;
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
    }


    get dataPageStateManager_DataFrom_Server(): DataPageStateManager {
        return this._dataPageStateManager_DataFrom_Server;
    }

    get modMass(): number {
        return this._modMass;
    }

    get proteinId(): number {
        return this._proteinId;
    }

    get projectSearchId(): number {
        return this._projectSearchId;
    }

    get vizOptionsData(): any {
        return this._vizOptionsData;
    }

    get modViewDataManager(): ModViewDataManager {
        return this._modViewDataManager;
    }

    get searchDetailsBlockDataMgmtProcessing(): any {
        return this._searchDetailsBlockDataMgmtProcessing;
    }
}