/**
 * proteinPage_Display_MultipleSearches__SingleProtein_Populate_ModSelections_From_ModPage_ModMass.ts
 *
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 *
 * Populate the Variable and Open Mod Mass selections from the Mod Mass passed from the Mod Page
 *
 */
import {
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass,
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/js/modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {modificationMass_CommonRounding_ReturnNumber_Function} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

/**
 *
 */
export const proteinPage_Display_MultipleSearches__SingleProtein_Populate_ModSelections_From_ModPage_ModMass = function (
    {
        modMass_Rounded_From_ModPage_ForInitialSelection,
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,  //  Not populated on Peptide page
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modMass_Rounded_From_ModPage_ForInitialSelection: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        proteinSequenceVersionId : number  //  Not populated on Peptide page
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : void {

    {
        const modificationMass_UserSelections_StateObject_Variable_OR_Open = modificationMass_UserSelections_StateObject.get_VariableModificationSelections();

        const modMasses_PSM_Counts =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_VariableModifications({
                proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_CommonRounding_ReturnNumber
            });

        _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
    }
    {
        const modificationMass_UserSelections_StateObject_Variable_OR_Open = modificationMass_UserSelections_StateObject.get_OpenModificationSelections();

        const modMasses_PSM_Counts =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_OpenModifications({
                proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_CommonRounding_ReturnNumber
            });

        _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
    }
}

/**
 *
 */
const _process_Variable_OR_Open_Modifications = function(
    {
        modMass_Rounded_From_ModPage_ForInitialSelection,
        modificationMass_UserSelections_StateObject_Variable_OR_Open,
        modMasses_PSM_Counts
    } : {
        modMass_Rounded_From_ModPage_ForInitialSelection: number
        modificationMass_UserSelections_StateObject_Variable_OR_Open: ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        modMasses_PSM_Counts: ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
    }
): void {

    modificationMass_UserSelections_StateObject_Variable_OR_Open.clear_selectedModifications();

    for ( const modMasses_PSM_Counts_Entry of modMasses_PSM_Counts.entries ) {

        if ( modMasses_PSM_Counts_Entry.psmCount === 0 ) {
            // SKIP since no PSMs
            continue;  // EARLY CONTINUE
        }

        const massRounded = Math.round( modMasses_PSM_Counts_Entry.mass );

        if ( massRounded !== modMass_Rounded_From_ModPage_ForInitialSelection ) {
            //  Mass Rounded is not the mass for initial selection so SKIP
            continue; // EARLY CONTINUE
        }

        const singleProtein_Filter_PerUniqueIdentifier_Entry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({selectionType: SingleProtein_Filter_SelectionType.ANY});

        modificationMass_UserSelections_StateObject_Variable_OR_Open.set_Modification_Selected(modMasses_PSM_Counts_Entry.mass, singleProtein_Filter_PerUniqueIdentifier_Entry);
    }
}

