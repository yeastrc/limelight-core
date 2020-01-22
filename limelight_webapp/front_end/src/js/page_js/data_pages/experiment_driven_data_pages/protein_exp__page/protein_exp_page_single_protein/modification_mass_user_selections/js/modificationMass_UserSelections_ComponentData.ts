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
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';


type ModificationMass_UserSelections_ComponentData = {
    variableModificationsData : {
        showNoVariableModificationsMsg? : boolean
        is_NO_VariableModification_AKA_Unmodified_Selected? : boolean
        showAddVariableModificationsSelectionLink? : boolean
        variableModificationEntries?
        showChangeVariableModificationsSelectionLink?

        modificationMass_UserSelections_StateObject? : ModificationMass_UserSelections_StateObject;
        proteinSequenceVersionId? : number
        projectSearchIds? : Array<number> 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        modificationMass_CommonRounding_ReturnNumber? : modificationMass_CommonRounding_ReturnNumber_Function
    }
    staticModificationsData;
}

export { ModificationMass_UserSelections_ComponentData }
