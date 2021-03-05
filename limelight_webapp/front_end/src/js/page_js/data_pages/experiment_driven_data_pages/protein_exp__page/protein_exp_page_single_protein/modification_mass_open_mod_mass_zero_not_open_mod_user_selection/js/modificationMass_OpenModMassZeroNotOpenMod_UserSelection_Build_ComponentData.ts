/**
 * modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData.ts
 *
 * Peptide Unique Selection - Build Data for React Component
 *
 * Display Data used in: modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component.tsx
 */

import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * build object of class ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
 *
 */
export const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent = function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {

        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData {

    let treatOpenModMassZeroAsUnmodified_UserSelection = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection();

    let searchesHaveOpenModMassEntries = false;

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId);
        }

        const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();
        if (openModificationsOnReportedPeptide_KeyReportedPeptideId && openModificationsOnReportedPeptide_KeyReportedPeptideId.size > 0 ) {

            searchesHaveOpenModMassEntries = true;
            break;
        }
    }

    return {
        treatOpenModMassZeroAsUnmodified_UserSelection, searchesHaveOpenModMassEntries
    };
}

