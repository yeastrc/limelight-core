/**
 * purge_FilterSelections_NotIn_CurrentData.ts
 *
 * Remove Filter Selections that are NOT in Current Data
 *
 *     Selections no longer in data because:
 *
 *          Main Filters changed
 *          Searches changed via "Change Searches"
 *          Experiment Definition changed which searches are in it
 *
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "../../common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {ModificationMass_UserSelections_StateObject} from "../filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "../filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {
    ProteinPositionFilter_UserSelections_StateObject,
    ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root
} from "../filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {Psm_Charge_Filter_UserSelection_StateObject} from "../filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {modificationMass_CommonRounding_ReturnNumber} from "../../modification_mass_common/modification_mass_rounding";
import {reporterIonMass_CommonRounding_ReturnNumber} from "../../reporter_ion_mass_common/reporter_ion_mass_rounding";
import {reportWebErrorToServer} from "../../../common_all_pages/reportWebErrorToServer";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "../filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {
    ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";


/**
 *
 */
export const purge_FilterSelections_NotIn_CurrentData = function(
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        psm_Charge_Filter_UserSelection_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    } : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject

    }  ) : Promise<void> {

    return new Promise<void>((resolve, reject) => { try {

        const part_1_Promise = _purge_FilterSelections_NotIn_CurrentData__Part_1({
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject,
            psm_Charge_Filter_UserSelection_StateObject
        })

        const part_2_Promise = _purge_FilterSelections_NotIn_CurrentData__Part_2({
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        })

        const promiseAll = Promise.all( [ part_1_Promise, part_2_Promise ] )

        promiseAll.catch(reason => reject(reason))
        promiseAll.then(novalue => { try {

            resolve()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 *  'async' function
 *
 *
 *
 */
 const _purge_FilterSelections_NotIn_CurrentData__Part_1 = async function(
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        psm_Charge_Filter_UserSelection_StateObject
    } : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    }  ) : Promise<void> {
    try {
        let staticModification_AnySelection = false;
        let variableModification_AnySelection = false;
        let openModification_AnySelection = false;
        let reporterIon_AnySelection = false;
        let proteinPositionFilter_AnySelection = false;
        let psm_Charge_Filter_Not_AllSelected = false;

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

        if ( psm_Charge_Filter_UserSelection_StateObject ) {
            if ( ! psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs()) {
                psm_Charge_Filter_Not_AllSelected = true;
            }
        }

        if ( ( ! staticModification_AnySelection ) &&
            ( ! variableModification_AnySelection ) &&
            ( ! openModification_AnySelection ) &&
            ( ! reporterIon_AnySelection ) &&
            ( ! proteinPositionFilter_AnySelection ) &&
            ( ! psm_Charge_Filter_Not_AllSelected ) ) {

            //  NO selections that need to be purged so EXIT

            return; // EARLY RETURN
        }

        const staticMods_All_Map = new Map<string,Set<number>>();
        const variableModificationMasses_All_Set = new Set<number>();
        const openModificationMasses_All_Set = new Set<number>();
        const reporterIonMasses_All_Set = new Set<number>();
        const proteinSequenceVersionId_All_Set = new Set<number>();
        const psm_Charge_Values_All_Set = new Set<number>();

        for (const projectSearchId of projectSearchIds) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                throw Error("purge_Selections_OfValues_NotInCurrentLoadedData: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId);
            }

            if ( staticModification_AnySelection ) {
                const staticModsHolder_ReturnPromise_Result = await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder_ReturnPromise()
                if (staticModsHolder_ReturnPromise_Result.staticMods_Holder.get_StaticMods()) {
                    for (const staticMod of staticModsHolder_ReturnPromise_Result.staticMods_Holder.get_StaticMods()) {
                        const residue = staticMod.residue
                        const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(staticMod.mass);
                        let masses = staticMods_All_Map.get(residue);
                        if (!masses) {
                            masses = new Set();
                            staticMods_All_Map.set(residue, masses);
                        }
                        masses.add(mass_Rounded);
                    }
                }
            }
            if ( variableModification_AnySelection ) {
                const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise_Result = await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise()
                const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise_Result.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                if (variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) {
                    for (const mapEntryValue of variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) {
                        for (const dynamicModification_Entry of mapEntryValue) {

                            const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(dynamicModification_Entry.mass);
                            variableModificationMasses_All_Set.add(mass_Rounded); //  variable same as dynamic
                        }
                    }
                }
            }
            if ( openModification_AnySelection ) {
                const get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise();
                const openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result.openModifications_On_PSM_For_MainFilters_Holder
                if (openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries()) {
                    const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_DataEntries_Iterable =
                        openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_DataEntries_Iterable();
                    for (const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_Entry of psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_DataEntries_Iterable ) {
                        for (const map_Inner_Entry of psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_Entry.openModificationMass_RoundedMap.entries()) {
                            const map_Inner_EntryValue = map_Inner_Entry[1];
                            const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(map_Inner_EntryValue.openModificationMass_Rounded);
                            openModificationMasses_All_Set.add(mass_Rounded);
                        }
                    }
                }
            }

            if ( reporterIon_AnySelection ) {
                const get_ReporterIonMasses_ForSearchHolder_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch().get_ReporterIonMasses_ForSearchHolder_ReturnPromise()
                const reporterIonMasses_ForSearch_Holder = get_ReporterIonMasses_ForSearchHolder_ReturnPromise_Result.reporterIonMasses_ForSearch_Holder;
                for (const reporterIonMass of reporterIonMasses_ForSearch_Holder.get_ReporterIonMasses_ForSearch()) {
                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass );
                    reporterIonMasses_All_Set.add(reporterIonMass_Rounded);
                }
            }
            if ( proteinPositionFilter_AnySelection) {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise();
                const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                for ( const proteinSequenceVersionId of proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIdsUnique() ) {
                    proteinSequenceVersionId_All_Set.add(proteinSequenceVersionId);
                }
            }

            if ( psm_Charge_Filter_Not_AllSelected ) {
                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();
                for ( const psmTblData_Entry of get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {
                    psm_Charge_Values_All_Set.add(psmTblData_Entry.charge)
                }
            }
        }

        //  All values collected from loaded data

        //  Perform purge of values from Selected State variables

        if ( psm_Charge_Filter_Not_AllSelected ) {

            psm_Charge_Filter_UserSelection_StateObject.remove_chargeValues_OnPSMs_Selected_NOT_in_All_ChargesSet({ all_Charges: psm_Charge_Values_All_Set })
        }

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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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

/**
 * 'async' function
 *
 * @param projectSearchIds
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 *
 * @param scanFilenameId_On_PSM_Filter_UserSelection_StateObject
 * @param scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
 */
const _purge_FilterSelections_NotIn_CurrentData__Part_2 = async function (
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    } : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject

    }  ) : Promise<void> {

    if (
        ( ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject )
            || scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds()
            || ( !  scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected() )
            || scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected().size === 0 )
        && ( ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject )
            || ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.is_AnySelections() ) ) ) {

        //  NO selections to clear so return

        return
    }

    const get_ScanFileDataHolder_Result =
        await
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer__Multiple_ProjectSearchIds().
            get_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId().get_ScanFileDataHolder_ReturnPromise()

    const commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
        get_ScanFileDataHolder_Result.scanFileData_Holder

    {
        //  Remove entries in scanFilenameId_On_PSM_Filter_UserSelection_StateObject NOT IN commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder (loaded from server)

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject.
        remove_scanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder({
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        });
    }
    {
        //  Purge props.propsValue.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject if needed

        //  Remove entries in scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject NOT IN commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder (loaded from server)

        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.
        remove_ProjectSearchIds_Remove_ScanFilenameIds_Selected_NOT_Loaded_In_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder({
            projectSearchIds,
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
        });
    }
}