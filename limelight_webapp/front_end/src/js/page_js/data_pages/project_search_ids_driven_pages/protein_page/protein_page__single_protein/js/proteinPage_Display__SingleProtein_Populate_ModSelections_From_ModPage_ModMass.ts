/**
 * proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass.ts
 *
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 *
 * Populate the Variable and Open Mod Mass selections from the Mod Mass passed from the Mod Page
 *
 */
import {
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass,
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass";
import {modificationMass_CommonRounding_ReturnNumber_Function} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export const proteinPage_Display__SingleProtein_Populate_ModSelections_From_ModPage_ModMass = function (
    {
        modMass_Rounded_From_ModPage_ForInitialSelection,
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,  //  Not populated on Peptide page
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modMass_Rounded_From_ModPage_ForInitialSelection: number
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        proteinSequenceVersionId : number  //  Not populated on Peptide page
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : Promise<unknown> {

    const promises: Array<Promise<void>> = [];

    { // get_VariableModificationSelections
        const modificationMass_UserSelections_StateObject_Variable_OR_Open = modificationMass_UserSelections_StateObject.get_VariableModificationSelections();

        const createModsAndPsmCountsList_VariableModifications_Result =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_VariableModifications({
                proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_CommonRounding_ReturnNumber
            });

        if ( createModsAndPsmCountsList_VariableModifications_Result.data ) {
            const modMasses_PSM_Counts =createModsAndPsmCountsList_VariableModifications_Result.data
            _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
        } else if ( createModsAndPsmCountsList_VariableModifications_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
            createModsAndPsmCountsList_VariableModifications_Result.promise.catch(reason => { reject(reason)})
            createModsAndPsmCountsList_VariableModifications_Result.promise.then( value => { try {
                    const modMasses_PSM_Counts = value;
                    _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("createModsAndPsmCountsList_VariableModifications_Result no data or promise")
        }

    }
    { // OpenModificationSelections
        const modificationMass_UserSelections_StateObject_Variable_OR_Open = modificationMass_UserSelections_StateObject.get_OpenModificationSelections();

        const createModsAndPsmCountsList_VariableModifications_Result =
            ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_OpenModifications({
                proteinSequenceVersionId,  //  Not populated on Peptide page
                projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_CommonRounding_ReturnNumber
            });

        if ( createModsAndPsmCountsList_VariableModifications_Result.data ) {
            const modMasses_PSM_Counts =createModsAndPsmCountsList_VariableModifications_Result.data
        _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
        } else if ( createModsAndPsmCountsList_VariableModifications_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                createModsAndPsmCountsList_VariableModifications_Result.promise.catch(reason => { reject(reason)})
                createModsAndPsmCountsList_VariableModifications_Result.promise.then( value => { try {
                    const modMasses_PSM_Counts = value;
                    _process_Variable_OR_Open_Modifications({ modMass_Rounded_From_ModPage_ForInitialSelection, modificationMass_UserSelections_StateObject_Variable_OR_Open, modMasses_PSM_Counts });
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("createModsAndPsmCountsList_VariableModifications_Result no data or promise")
        }
    }

    if ( promises.length === 0 ) {
        return null; // EARLY RETURN
    }

    const promises_All = Promise.all(promises);

    return promises_All;
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

