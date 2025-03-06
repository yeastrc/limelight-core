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

    data__ModMass_Array_Map_Key_ProjectSearchId : ModView_VizOptionsData_SubPart_selectedStateObject__ModMass_Array_Map_Key_ProjectSearchId_Type //  was 'data' type 'any'  //  TODO  looks like this property 'data' is used as a Object map with keys of projectSearchId
}

/**
 *
 */
export type ModView_VizOptionsData_SubPart_selectedStateObject__ModMass_Array_Map_Key_ProjectSearchId_Type = Map<number, Array<number>>

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
    excludeUnlocalizedOpenMods? : boolean
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

