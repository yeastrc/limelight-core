/**
 * peptidePage_Display_MainContent_Component_nonClass_Functions.ts
 * 
 * peptidePage_Display_MainContent_Component.tsx
 * 
 */


// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnNumber_Function,
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import {
    reporterIonMass_CommonRounding_ReturnNumber, reporterIonMass_CommonRounding_ReturnNumber_Function,
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import { peptideSequence_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';

import { modificationMass_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Are_All_SearchSubGroupIds_Selected";
import {PeptidePage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {
    ProteinPositionFilter_UserSelections_StateObject,
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent";
import {load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {SearchSubGroups_Root__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 */
const purge_Selections_OfValues_NotInCurrentLoadedData = function(
    {
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject
    } : {
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
    }  ) : void {

    let staticModification_AnySelection = false;
    let variableModification_AnySelection = false;
    let openModification_AnySelection = false;
    let reporterIon_AnySelection = false;
    let proteinPositionFilter_AnySelection = false;

    if ( modificationMass_UserSelections_StateObject ) {

        staticModification_AnySelection = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();

        if ( modificationMass_UserSelections_StateObject.get_VariableModificationSelections() ) {
            if ( modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected() ) {
                variableModification_AnySelection = true;
            }
        }
        if ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) {
            if ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {
                openModification_AnySelection = true;
            }
        }
    }
    if ( reporterIonMass_UserSelections_StateObject ) {
        if ( reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
            reporterIon_AnySelection = true;
        }
    }

    if ( proteinPositionFilter_UserSelections_StateObject ) {
        if (proteinPositionFilter_UserSelections_StateObject.isAnySelections()) {
            proteinPositionFilter_AnySelection = true;
        }
    }

    if ( ( ! staticModification_AnySelection ) &&
        ( ! variableModification_AnySelection ) &&
        ( ! openModification_AnySelection ) &&
        ( ! reporterIon_AnySelection ) &&
        ( ! proteinPositionFilter_AnySelection ) ) {

        //  NO selections that need to be purged so EXIT

        return; // EARLY RETURN
    }

    const staticMods_All_Map = new Map<string,Set<number>>();
    const variableModificationMasses_All_Set = new Set<number>();
    const openModificationMasses_All_Set = new Set<number>();
    const reporterIonMasses_All_Set = new Set<number>();
    const proteinSequenceVersionId_All_Set = new Set<number>();

    for (const projectSearchId of projectSearchIds) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            throw Error("purge_Selections_OfValues_NotInCurrentLoadedData: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId);
        }

        if (loadedDataPerProjectSearchIdHolder.get_staticMods()){
            for ( const staticMod of loadedDataPerProjectSearchIdHolder.get_staticMods() ) {
                const residue = staticMod.residue
                const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(staticMod.mass);
                let masses = staticMods_All_Map.get(residue);
                if ( ! masses ) {
                    masses = new Set();
                    staticMods_All_Map.set(residue, masses);
                }
                masses.add(mass_Rounded);
            }
        }

        if (loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()) {
            for (const mapEntry of loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().entries()) {
                const mapEntryValue = mapEntry[1];
                for (const dynamicModification_Entry of mapEntryValue) {

                    const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(dynamicModification_Entry.mass);
                    variableModificationMasses_All_Set.add(mass_Rounded); //  variable same as dynamic
                }
            }
        }

        if (loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs()) {
            for (const map_Outer_Entry of loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs().entries()) {
                const map_Outer_EntryValue = map_Outer_Entry[1]; // Which is Map inner
                for (const map_Inner_Entry of map_Outer_EntryValue.openModificationMass_RoundedMap.entries()) {
                    const map_Inner_EntryValue = map_Inner_Entry[ 1 ];
                    const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(map_Inner_EntryValue.openModificationMass_Rounded);
                    openModificationMasses_All_Set.add(mass_Rounded);
                }
            }
        }

        if (loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs()) {
            for (const mapEntry of loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs().entries()) {
                const mapEntryValue = mapEntry[1];
                for (const reporterIonMass of mapEntryValue.reporterIonMasses) {
                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass );
                    reporterIonMasses_All_Set.add(reporterIonMass_Rounded);
                }
            }
        }

        {
            if (!loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsUnique()) {
                const msg = "(!loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsUnique())";
                console.warn(msg);
                throw Error(msg);
            }
            for ( const proteinSequenceVersionId of loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsUnique() ) {
                proteinSequenceVersionId_All_Set.add(proteinSequenceVersionId);
            }
        }
    }

    //  All values collected from loaded data

    //  Perform purge of values from Selected State variables

    if ( proteinPositionFilter_AnySelection ) {
        const selections_Ranges : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();

        for ( const mapEntry of selections_Ranges.entriesMap_Key_proteinSequenceVersionId.entries() ) {
            const mapEntryValue = mapEntry[1];
            const proteinSequenceVersionId = mapEntryValue.proteinSequenceVersionId;

            if ( ! proteinSequenceVersionId_All_Set.has( proteinSequenceVersionId) ) {
                //  proteinSequenceVersionId not in loaded data so delete
                proteinPositionFilter_UserSelections_StateObject.remove_Selected_ProteinSequenceVersionId({proteinSequenceVersionId});
            }
        }
    }

    if ( staticModification_AnySelection ) {
        if ( staticMods_All_Map.size === 0 ) {
            modificationMass_UserSelections_StateObject.clear_selected_Static_Modifications();
        } else {
            //    Map<Residue Letter, Set<Mass>>
            for ( const mapEntry of modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set().entries() ) {
                const selection_Residue = mapEntry[ 0 ];
                const selection_Masses = mapEntry[ 1 ];

                const staticMods_All = staticMods_All_Map.get( selection_Residue );
                if ( ! staticMods_All ) {
                    //  No entries in loaded static mods for selection_Residue so delete all static mod selections for selection_Residue
                    modificationMass_UserSelections_StateObject.delete_StaticModification_Selected_AllFor_ResidueLetter({residueLetter: selection_Residue });
                } else {
                    //  process selected mod masses for residue letter
                    for ( const selection_Mass of selection_Masses ) {
                        if ( ! staticMods_All.has( selection_Mass ) ) {
                            modificationMass_UserSelections_StateObject.delete_StaticModification_Selected({ residueLetter: selection_Residue, modMass: selection_Mass});
                        }
                    }
                }
            }
        }
    }

    if ( variableModification_AnySelection ) {
        _purge_dynamic_or_open_mods_selections({
            variable_Open_Modifications_UserSelections_StateObject: modificationMass_UserSelections_StateObject.get_VariableModificationSelections(),
            loadedValues: variableModificationMasses_All_Set
        });
    }
    if ( openModification_AnySelection ) {
        _purge_dynamic_or_open_mods_selections({
            variable_Open_Modifications_UserSelections_StateObject: modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
            loadedValues: openModificationMasses_All_Set
        });
    }
    if ( reporterIonMass_UserSelections_StateObject && reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
        if ( reporterIonMasses_All_Set.size === 0 ) {
            reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();
        } else {
            const selectedMasses = new Set( reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet() );
            for ( const selectedMass of selectedMasses ) {
                if ( ! reporterIonMasses_All_Set.has( selectedMass ) ) {
                    reporterIonMass_UserSelections_StateObject.delete_ReporterIons_Selected( selectedMass );
                }
            }
        }
    }
}


/**
 *
 */
const _purge_dynamic_or_open_mods_selections = function(
    {
        variable_Open_Modifications_UserSelections_StateObject,
        loadedValues
    } : {
        variable_Open_Modifications_UserSelections_StateObject:  ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        loadedValues: Set<number>
    }
) {
    if ( variable_Open_Modifications_UserSelections_StateObject ) {
        if ( loadedValues.size === 0 ) {
            variable_Open_Modifications_UserSelections_StateObject.clear_selectedModifications();
        } else {
            const selectedMasses = new Set( variable_Open_Modifications_UserSelections_StateObject.get_ModificationsSelected__OnlyModMasses_AsSet() );
            for ( const selectedMass of selectedMasses ) {
                if ( ! loadedValues.has( selectedMass ) ) {
                    variable_Open_Modifications_UserSelections_StateObject.delete_Modification_Selected(selectedMass);
                }
            }
        }
    }
}

//////////////
//////////////

/**
 * 
 */  
const compute_FullPage_Except_SearchDetails = function(
    {
        propsValue,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
    }  ) :

{
    searchSubGroup_Ids_Selected : Set<number>
    searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
    searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
}
{
    const searchSubGroup_Ids_Selected : Set<number> = compute_searchSubGroup_Ids_Selected({ propsValue });

    const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue });

    const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = compute_searchSubGroup_PropValue({ propsValue });

    const modificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({
        modificationMass_UserSelections_StateObject,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData({
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    })

    const reporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({

        reporterIonMass_UserSelections_StateObject,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
        peptideUnique_UserSelection_StateObject
    });

    const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({

        peptideSequence_UserSelections_StateObject
    });

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = create_ProteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({

        projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
    })

    //  Create initial instance.  Updated instance will be created in peptideSequence_UserSelections.tsx when user changes the input field value

    const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({
        not_filtered_position_modification_selections : false,
        proteinSequenceVersionId : undefined,
        projectSearchIds,
        searchSubGroup_Ids_Selected,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject : undefined,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root : null,
        proteinPositionFilter_UserSelections_StateObject
    });

    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

    const psmCountForUnfiltered = _computePsmCountForUnfiltered({ projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    return {
        searchSubGroup_Ids_Selected,
        searchSubGroup_Are_All_SearchSubGroupIds_Selected,
        searchSubGroup_PropValue,
        psmCountForUnfiltered,
        modificationMass_UserSelections_ComponentData,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
        reporterIons_UserSelections_ComponentData,
        peptideUnique_UserSelection_ComponentData,
        peptideSequence_UserSelections_ComponentData,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    }
}        

///////////////////////////

/**
 * Create searchSubGroup_Ids_Selected
 */
const compute_searchSubGroup_Ids_Selected = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    }) :  Set<number>
{
    let searchSubGroup_Ids_Selected : Set<number> = undefined;

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
            searchSubGroup_CentralStateManagerObjectClass : propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    return searchSubGroup_Ids_Selected;
}

/**
 * Create searchSubGroup_Are_All_SearchSubGroupIds_Selected
 */
const compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    }) :  boolean
{
    let searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = true; // Default to true for when Merged Search or No Search SUb Groups

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Are_All_SearchSubGroupIds_Selected = searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn({
            searchSubGroup_CentralStateManagerObjectClass : propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    return searchSubGroup_Are_All_SearchSubGroupIds_Selected;
}

/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchSubGroup_PropValue = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop

    }) : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    let searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = null;

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_PropValue = searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData({
            searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry : searchSubGroups_ForProjectSearchId,
            searchSubGroup_CentralStateManagerObjectClass: propsValue.searchSubGroup_CentralStateManagerObjectClass
        });
    }

    return searchSubGroup_PropValue;
}


/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop

    }) : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
{

    let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

    const filterValuesChanged_Callback = (params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param) : void => {

        console.warn("filterValuesChanged_Callback called: params: ", params )

        // throw Error("filterValuesChanged_Callback callback not handled")

        window.location.reload( true );  // TODO
    }

    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
        displayOnly : false,
        dataPages_LoggedInUser_CommonObjectsFactory : propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
        dataPageStateManager_DataFrom_Server : propsValue.dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : propsValue.searchDetailsBlockDataMgmtProcessing,
        filterValuesChanged_Callback,
        searchSubGroup_PropValue,
        limelight_Colors_For_MultipleSearches: undefined
    }

    return searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}

/**
 * Compute PSM Count for All Project Search Ids - No Filtering for any user choices
 */
const _computePsmCountForUnfiltered = function({ 

    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : number {

    let psmCount = 0;

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            //  No entry for this projectSearchId
            continue; // EARLY CONTINUE
        }

        const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
        if ( ! numPsmsForReportedPeptideIdMap ) {
            //  No entry 
            continue; // EARLY CONTINUE
        }

        for ( const reportedPeptideId of reportedPeptideIds ) {
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
            if ( numPsmsForReportedPeptideId ) {
                psmCount += numPsmsForReportedPeptideId;
            }
        }
    }

    return psmCount;
}





///////////////////////////

/**
 * 
 */
const create_ModificationMass_UserSelections_ComponentData = function({

    modificationMass_UserSelections_StateObject,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ModificationMass_UserSelections_ComponentData {

    let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

    const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({ 
        modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId : undefined,
        projectSearchIds : projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Param
    });
    
    return modificationMass_UserSelections_ComponentData;
}

/**
 *
 */
const create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData {

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    });

    return modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData;
}

/**
 * 
 */
const create_ReporterIons_UserSelections_ComponentData = function( {

    reporterIonMass_UserSelections_StateObject,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ReporterIonMass_UserSelections_ComponentData {

    let reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

    const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({ 

        reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject, 
        projectSearchIds : projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Param // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
    });

    return reporterIons_UserSelections_ComponentData;
}

/**
 * 
 */
const create_PeptideSequence_UserSelections_ComponentData = function( {

    peptideSequence_UserSelections_StateObject
} : {
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
}) : PeptideSequence_UserSelections_ComponentData {

    const peptideSequence_UserSelections_ComponentData = peptideSequence_UserSelections_BuildData_ForReactComponent({ 

        peptideSequence_UserSelections_StateObject : peptideSequence_UserSelections_StateObject
    });

    return peptideSequence_UserSelections_ComponentData;
}

/**
 *
 *
 */
const create_ProteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent = function(
    {
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder
    } : {
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

    }) : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data {

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data =
        proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({ projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds});

    return proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
}

////////////////////////////////////////////////////////



/////////

//  Modification Mass Info for display


//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

// /**
//  * All Variable modification masses by protein position
//  *
//  * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
//  */
// const _get_variableModificationMasses_All_OnProteinByPosition = function({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }) {
//
// 	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
// 	const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
//
// 	{
// 		//  Start with Map of Sets to remove duplicates
// 		const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.
//
// 		for ( const projectSearchId of projectSearchIds ) {
//
// 			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
//
// 			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
// 			if ( ! dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
// 				//  No data for projectSearchId so skip to next
// 				continue; // EARLY CONTINUE
// 			}
//
// 			const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
// 			if ( ! dynamicModificationsOnProtein ) {
// 				// No Data for _proteinSequenceVersionId so skip to next
// 				continue; // EARLY CONTINUE
// 			}
//
// 			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
// 				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
//
// 				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }
//
// 				const position = modificationOnProtein.position;
// 				const mass = modificationOnProtein.mass;
// 				let massesAtPosition = modsOnProteinByPosition_Sets.get( position );
// 				if ( ! massesAtPosition ) {
// 					massesAtPosition = new Set();
// 					modsOnProteinByPosition_Sets.set( position, massesAtPosition );
// 				}
// 				//  Round mass since Multiple Search
// 				const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
// 				massesAtPosition.add( roundedMass );
// 			}
// 		}
//
// 		//  Sort masses at each position
// 		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
// 			const position = modsOnProteinByPositionEntry[ 0 ];
// 			const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
// 			const massesAtPositionArray = Array.from( massesAtPositionSet );
// 			massesAtPositionArray.sort( function(a, b) {
// 				if ( a < b ) {
// 					return -1;
// 				}
// 				if ( a > b ) {
// 					return 1;
// 				}
// 				return 0;
// 			});
// 			//  Place the sorted Array in the final output Map
// 			modsOnProteinByPosition.set( position, massesAtPositionArray );
// 		}
// 	}
//
// 	return modsOnProteinByPosition;
// }

//////////////////////////////////

///   Get Reporter Ion Mass Info


/**
 * 
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ReporterIonMasses_IfNeeded = function(
    {
        searchSubGroups_Root, // May be null or undefined
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        searchDataLookupParamsRoot
    } : {
        searchSubGroups_Root: SearchSubGroups_Root__DataPageStateManagerEntry
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    }) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
        const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        let searchDataLookupParams_For_projectSearchId = undefined;
        for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

            if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
                searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
                break;
            }
        }
        if ( ! searchDataLookupParams_For_projectSearchId ) {
            const msg = "load_ReporterIonMasses_IfNeeded: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        let getSearchSubGroupIds = false;
        if ( searchSubGroups_Root ) {
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( searchSubGroups_ForProjectSearchId ) {
                const searchSubGroups_Array__ = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode();
                if (searchSubGroups_Array__ && searchSubGroups_Array__.length > 0) {
                    getSearchSubGroupIds = true;
                }
            }
        }

        const promise = (
            loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
                getSearchSubGroupIds,
                anyReporterIonMassesSelected : true,
                anyOpenModificationMassesSelected : false,
                proteinSequenceVersionId : null,
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        );
        if (promise) {
            promises_LoadData_Array.push(promise);
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}

//////////////////////////////////

///   Get Open Modification Mass Info


/**
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_OpenModificationMasses_IfNeeded = function(
    {
        searchSubGroups_Root, // May be null or undefined
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        searchDataLookupParamsRoot
    } : {
        searchSubGroups_Root: SearchSubGroups_Root__DataPageStateManagerEntry
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    }) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
        const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        let searchDataLookupParams_For_projectSearchId = undefined;
        for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

            if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
                searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
                break;
            }
        }
        if ( ! searchDataLookupParams_For_projectSearchId ) {
            const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        let getSearchSubGroupIds = false;
        if ( searchSubGroups_Root ) {
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( searchSubGroups_ForProjectSearchId ) {
                const searchSubGroups_Array__ = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode();
                if (searchSubGroups_Array__ && searchSubGroups_Array__.length > 0) {
                    getSearchSubGroupIds = true;
                }
            }
        }

        const promise = (
            loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
                getSearchSubGroupIds,
                anyReporterIonMassesSelected : false,
                anyOpenModificationMassesSelected : true,
                proteinSequenceVersionId : undefined,
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        );
        if (promise) {
            promises_LoadData_Array.push(promise);
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}


//////////////////////////////////

///   Get Protein Coverage Info


/**
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ProteinCoverage_IfNeeded = function(
    {
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,

    }) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const promise = load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
            projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
        } );
        if (promise) {
            promises_LoadData_Array.push(promise);
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}


////////////////////////////////////////////
	
//   Modification Mass Rounding to provide some level of commonality between searches

// /**
//  *
//  */
// const _roundModificationMass_ReturnNumber_LocalFunction = function({ mass }) {
// 	return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
// }

	

///////////////////////////////////////////////


class PeptidePage_Display_MainContent_Component_nonClass_Functions {
    static purge_Selections_OfValues_NotInCurrentLoadedData = purge_Selections_OfValues_NotInCurrentLoadedData
    static compute_FullPage_Except_SearchDetails = compute_FullPage_Except_SearchDetails
    static compute_searchSubGroup_Ids_Selected = compute_searchSubGroup_Ids_Selected
    static compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected
    static compute_searchSubGroup_PropValue = compute_searchSubGroup_PropValue
    static compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    static create_ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData
    static create_ReporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData
    static create_PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData
    static load_ReporterIonMasses_IfNeeded = load_ReporterIonMasses_IfNeeded
    static load_OpenModificationMasses_IfNeeded = load_OpenModificationMasses_IfNeeded
    static load_ProteinCoverage_IfNeeded = load_ProteinCoverage_IfNeeded
}

export { PeptidePage_Display_MainContent_Component_nonClass_Functions }
