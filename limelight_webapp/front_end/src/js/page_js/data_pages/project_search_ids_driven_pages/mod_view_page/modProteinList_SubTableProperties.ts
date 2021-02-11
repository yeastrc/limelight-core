import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";

export class ModProteinList_SubTableProperties {

    private readonly _modMass:number;
    private readonly _vizOptionsData: ModView_VizOptionsData;
    private readonly _modViewDataManager: ModViewDataManager;
    private readonly _dataPageStateManager_DataFrom_Server: DataPageStateManager;

    constructor(
        {
            dataPageStateManager_DataFrom_Server,
            modViewDataManager,
            vizOptionsData,
            modMass
        }:{
            dataPageStateManager_DataFrom_Server:DataPageStateManager,
            modViewDataManager:ModViewDataManager,
            vizOptionsData: ModView_VizOptionsData,
            modMass:number

        }
    ) {

        this._modMass = modMass;
        this._vizOptionsData = vizOptionsData;
        this._modViewDataManager = modViewDataManager;
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
    }


    get dataPageStateManager_DataFrom_Server(): DataPageStateManager {
        return this._dataPageStateManager_DataFrom_Server;
    }


    get modMass(): number {
        return this._modMass;
    }

    get vizOptionsData(): ModView_VizOptionsData {
        return this._vizOptionsData;
    }

    get modViewDataManager(): ModViewDataManager {
        return this._modViewDataManager;
    }
}