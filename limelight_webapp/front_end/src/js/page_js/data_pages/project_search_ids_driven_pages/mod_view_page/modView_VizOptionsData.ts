/**
 *  modView_VizOptionsData.ts
 */

import {ModMultiSearch_DataVizPageStateManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMultiSearchDataViz_StateManager";
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";


/**
 *  Central Viz Options Object on Mod Page
 *
 *  property 'selectedStateObject' on class ModView_VizOptionsData_SubPart_selectedStateObject
 */
export class ModView_VizOptionsData_SubPart_selectedStateObject {

    data : any //  TODO  looks like this property 'data' is used as a Object map with keys of projectSearchId
}


/**
 *  Central Viz Options Object on Mod Page
 *
 *  property 'data' on class ModView_VizOptionsData
 */
export class ModView_VizOptionsData_SubPart_data {

    selectedStateObject? : ModView_VizOptionsData_SubPart_selectedStateObject
    projectSearchIds? : Array<number>
    proteinPositionFilter? :ProteinPositionFilterDataManager
    quantType? : string
    psmQuant? : string
    dataTransformation? : string
    colorCutoffRatio? : number
    colorCutoffCount? : number
    modMassCutoffMin? : number
    modMassCutoffMax? : number
    showZScore? : any   ///  TODO  Read but never set
}

/**
 *  Central Viz Options Object on Mod Page
 *
 *  Variable is usually vizOptionsData
 */
export class ModView_VizOptionsData {

    data: ModView_VizOptionsData_SubPart_data
    stateManagementObject? : ModMultiSearch_DataVizPageStateManager
}

