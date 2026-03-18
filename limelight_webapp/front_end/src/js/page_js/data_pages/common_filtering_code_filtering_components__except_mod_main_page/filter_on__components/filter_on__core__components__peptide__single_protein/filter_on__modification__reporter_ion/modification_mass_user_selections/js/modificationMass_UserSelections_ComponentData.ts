/**
 * modificationMass_UserSelections_ComponentData.ts
 * 
 * Modification Selection - Component Data
 * 
 *  !!!! React Version !!!!
 * 
 * 
 * Component Data Object used in: 
 *      modificationMass_UserSelections_BuildData_ForReactComponent.ts
 *      modificationMass_UserSelections_Root.tsx
 */


//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber_Function} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";


/**
 *
 */
 export type ModificationMass_UserSelections_ComponentData = {
    variableModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData
    open_ModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData
    staticModificationsData : ModificationMass_UserSelections_ComponentData_StaticModificationsData
    showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection_Data : boolean
}

/**
 *
 */
class ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry {
    modMass : number
    selectionType : SingleProtein_Filter_SelectionType
}

/**
 *
 */
class ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData {
    showNo_Variable_or_Open_ModificationsMsg? : boolean
    unmodified_Selection_Variable_or_Open_Modifications? : SingleProtein_Filter_PerUniqueIdentifier_Entry
    showAdd_Variable_or_Open_ModificationsSelectionLink? : boolean
    variable_or_Open_ModificationEntries? : Array<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry>

    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject? : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
    proteinSequenceVersionId? : number
    projectSearchIds? : Array<number>
    modificationMass_CommonRounding_ReturnNumber? : modificationMass_CommonRounding_ReturnNumber_Function

    //  Pass along for when open overlay
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root? : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

}



/**
 *
 */
class ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry {
    residueLetter : string
    modMass : number
    selected : boolean
}

/**
 *
 */
class ModificationMass_UserSelections_ComponentData_StaticModificationsData {
    showNoStaticModificationsMsg? : boolean
    staticModificationEntries? : Array<ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry>
}


//   Some Exports above

export {
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry
}
