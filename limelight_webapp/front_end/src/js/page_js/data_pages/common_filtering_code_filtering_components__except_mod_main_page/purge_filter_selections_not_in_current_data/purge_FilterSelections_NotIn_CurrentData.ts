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
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";


/**
 *
 */
export const purge_FilterSelections_NotIn_CurrentData = function(
    {
        projectSearchIds,
        dataPageStateManager,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        psm_Charge_Filter_UserSelection_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
    } : {
        projectSearchIds : Array<number>
        dataPageStateManager: DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

    }  ) : Promise<void> {

    {
        //  scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

        if ( scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject ) {

            let allSearches_Have_ScanData = true;

            for ( const projectSearchId of projectSearchIds ) {

                const dataPage_common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
                if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId ) {
                    const msg = "this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
                    allSearches_Have_ScanData = false;
                    break;
                }
            }
            if ( ! allSearches_Have_ScanData ) {
                scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.clearAll()
            }
        }
    }

    return new Promise<void>((resolve, reject) => { try {

        const part_1_Promise = _purge_FilterSelections_NotIn_CurrentData__Part_1({
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
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
 const _purge_FilterSelections_NotIn_CurrentData__Part_1 = function(
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        psm_Charge_Filter_UserSelection_StateObject
    } : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    }  ) : Promise<void> {
    try {
        let staticModification_AnySelection = false;
        let variableModification_AnySelection = false;
        let openModification_AnySelection = false;
        let reporterIon_AnySelection = false;
        let proteinPosition_Of_Modification_Filter_AnySelection = false;
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

        if ( proteinPosition_Of_Modification_Filter_UserSelections_StateObject ) {
            if (proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections()) {
                proteinPosition_Of_Modification_Filter_AnySelection = true;
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
            ( ! proteinPosition_Of_Modification_Filter_AnySelection ) &&
            ( ! proteinPositionFilter_AnySelection ) &&
            ( ! psm_Charge_Filter_Not_AllSelected ) ) {

            //  NO selections that need to be purged so EXIT

            return; // EARLY RETURN
        }

        const staticMods_All_Map = new Map<string,Set<number>>();
        const variableModificationMasses_All_Set = new Set<number>();
        const openModificationMasses_All_Set = new Set<number>();
        const reporterIonMasses_All_Set = new Set<number>();
        const proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength = new Map<number, { proteinSequenceVersionId: number, proteinLength: number }>();
        const psm_Charge_Values_All_Set = new Set<number>();

        const promises: Array<Promise<void>> = []

        for (const projectSearchId of projectSearchIds) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                throw Error("purge_Selections_OfValues_NotInCurrentLoadedData: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId);
            }

            if ( staticModification_AnySelection ) {

                //  Inline Function to Process Result
                const process_Results = (staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder) => {
                    for (const staticMod of staticMods_Holder.get_StaticMods()) {
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

                const get_StaticModsHolder_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();

                if ( get_StaticModsHolder_Result.data ) {
                    process_Results( get_StaticModsHolder_Result.data.staticMods_Holder )
                } else if ( get_StaticModsHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_StaticModsHolder_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_StaticModsHolder_Result.promise.then(value => { try {
                            process_Results( value.staticMods_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_StaticModsHolder_Result  no 'data' or 'promise'")
                }
            }
            if ( variableModification_AnySelection ) {

                //  Inline Function to Process Result
                const process_Results = (variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder ) => {
                    if (variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) {
                        for (const mapEntryValue of variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) {
                            for (const dynamicModification_Entry of mapEntryValue) {

                                const mass_Rounded = modificationMass_CommonRounding_ReturnNumber(dynamicModification_Entry.mass);
                                variableModificationMasses_All_Set.add(mass_Rounded); //  variable same as dynamic
                            }
                        }
                    }
                }

                const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters()
                        .get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

                if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                    process_Results( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
                } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => { try {
                            process_Results( value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }
            if ( openModification_AnySelection ) {

                //  Inline Function to Process Result
                const process_Results = (openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder ) => {
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

                const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch();

                if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                    process_Results( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder )
                } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => { try {
                            process_Results( value.openModifications_On_PSM_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }

            if ( reporterIon_AnySelection ) {

                //  Inline Function to Process Result
                const process_Results = (reporterIonMasses_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder ) => {
                    for (const reporterIonMass of reporterIonMasses_ForSearch_Holder.get_ReporterIonMasses_ForSearch()) {
                        const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass );
                        reporterIonMasses_All_Set.add(reporterIonMass_Rounded);
                    }
                }

                const get_ReporterIonMasses_ForSearchHolder_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch()
                        .get_ReporterIonMasses_ForSearchHolder()

                if ( get_ReporterIonMasses_ForSearchHolder_Result.data ) {
                    process_Results( get_ReporterIonMasses_ForSearchHolder_Result.data.reporterIonMasses_ForSearch_Holder )
                } else if ( get_ReporterIonMasses_ForSearchHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ReporterIonMasses_ForSearchHolder_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ReporterIonMasses_ForSearchHolder_Result.promise.then(value => { try {
                            process_Results( value.reporterIonMasses_ForSearch_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ReporterIonMasses_ForSearchHolder_Result  no 'data' or 'promise'")
                }
            }

            if ( proteinPosition_Of_Modification_Filter_AnySelection || proteinPositionFilter_AnySelection ) {

                //  Inline Function to Process Result
                const process_Results = (proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder ) => {

                    for ( const proteinInfoMap_Value of proteinInfo_For_MainFilters_Holder.get_proteinInfoMap_Values() ) {

                        const existingSavedMapEntry = proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength.get( proteinInfoMap_Value.proteinSequenceVersionId )
                        if ( existingSavedMapEntry !== undefined && existingSavedMapEntry !== null ) {
                            //  Protein Length from Map MUST be same as from proteinInfoMap_Value
                            if ( proteinInfoMap_Value.proteinLength !== existingSavedMapEntry.proteinLength ) {
                                const msg = "Value from proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength.get( proteinInfoMap_Value.proteinSequenceVersionId ) is NOT SAME AS proteinInfoMap_Value.proteinLength"
                                console.warn(msg)
                                throw Error( msg )
                            }
                        } else {
                            // proteinInfoMap_Value.proteinSequenceVersionId is NOT in Map so add it
                            proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength.set( proteinInfoMap_Value.proteinSequenceVersionId, { proteinSequenceVersionId: proteinInfoMap_Value.proteinSequenceVersionId, proteinLength: proteinInfoMap_Value.proteinLength })
                        }
                    }
                }

                const get_ProteinInfoHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().
                    get_ProteinInfoHolder_AllForSearch()

                if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                    process_Results( get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder )
                } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ProteinInfoHolder_AllForSearch_Result.promise.then(value => { try {
                            process_Results( value.proteinInfo_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinInfoHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }

            if ( psm_Charge_Filter_Not_AllSelected ) {

                //  Inline Function to Process Result
                const process_Results = (psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder ) => {

                    for ( const psmTblData_Entry of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {
                        psm_Charge_Values_All_Set.add(psmTblData_Entry.charge)
                    }
                }

                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    process_Results( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            process_Results( value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }
        }

        //  All values collected from loaded data

        const promisesAll = Promise.all( promises )

        return new Promise<void>((resolve, reject) => { try {

            promisesAll.catch(reason => reject(reason))
            promisesAll.then(novalue => { try {

                //  Perform purge of values from Selected State variables

                if ( psm_Charge_Filter_Not_AllSelected ) {

                    psm_Charge_Filter_UserSelection_StateObject.remove_chargeValues_OnPSMs_Selected_NOT_in_All_ChargesSet({ all_Charges: psm_Charge_Values_All_Set })
                }

                if ( proteinPosition_Of_Modification_Filter_AnySelection ) {

                    let selections_Ranges__AnyChanged = false

                    const selections_Ranges = proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges();

                    const selections_Ranges_MapValues = Array.from( selections_Ranges.entriesMap_Key_proteinSequenceVersionId.values() )
                    for ( const selections_Ranges_mapValue of selections_Ranges_MapValues ) {

                        const selections_Ranges_mapValue_ProteinSequenceVersionId = selections_Ranges_mapValue.proteinSequenceVersionId;

                        const proteinEntries_All_Entry_For_ProteinSequenceVersionId = proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength.get( selections_Ranges_mapValue_ProteinSequenceVersionId )

                        if ( ! proteinEntries_All_Entry_For_ProteinSequenceVersionId ) {
                            //  proteinSequenceVersionId not in loaded data so delete
                            proteinPosition_Of_Modification_Filter_UserSelections_StateObject.remove_Selected_ProteinSequenceVersionId({proteinSequenceVersionId: selections_Ranges_mapValue_ProteinSequenceVersionId});
                        } else {

                            //  Remove any Range Entries for ProteinSequenceVersionId that are the full Protein length.  This cleans up old Mod Page Filter on Protein Position Range entries that cover the whole protein length.

                            if ( selections_Ranges_mapValue.rangeEntries ) {

                                const selections_RangeEntries_Filtered: Array<ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange> = []

                                for ( const selections_RangeEntry of selections_Ranges_mapValue.rangeEntries ) {

                                    if ( selections_RangeEntry.proteinPosition_Start === 1 && selections_RangeEntry.proteinPosition_End === proteinEntries_All_Entry_For_ProteinSequenceVersionId.proteinLength ) {

                                        // Drop any range entries for full protein length so SKIP

                                    } else {
                                        selections_RangeEntries_Filtered.push( selections_RangeEntry )
                                    }
                                }

                                if ( selections_RangeEntries_Filtered.length === 0 ) {
                                    //  NO range entries after filtering so switch to Full Protein length filtering

                                    selections_Ranges_mapValue.fullProteinSelected = true
                                    selections_Ranges_mapValue.rangeEntries = undefined

                                    selections_Ranges__AnyChanged = true

                                } else {
                                    if ( selections_RangeEntries_Filtered.length !== selections_Ranges_mapValue.rangeEntries.length ) {
                                        //  Ranges were removed so update the selections

                                        selections_Ranges_mapValue.rangeEntries = selections_RangeEntries_Filtered

                                        selections_Ranges__AnyChanged = true
                                    }
                                }
                            }
                        }
                    }

                    if ( selections_Ranges__AnyChanged ) {

                        //  Set to itself to force update of URL

                        proteinPosition_Of_Modification_Filter_UserSelections_StateObject.setSelections_Ranges({ entriesMap_Key_proteinSequenceVersionId: proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId })
                    }
                }

                if ( proteinPositionFilter_AnySelection ) {
                    const selections_Ranges : ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();

                    const mapEntries = Array.from( selections_Ranges.entriesMap_Key_proteinSequenceVersionId.entries() )
                    for ( const mapEntry of mapEntries ) {
                        const mapEntryValue = mapEntry[1];
                        const proteinSequenceVersionId = mapEntryValue.proteinSequenceVersionId;

                        if ( ! proteinEntries_All_Map__Key_ProteinSequenceVersionId_Value_ProteinSequenceVersionId_ProteinLength.has( proteinSequenceVersionId) ) {
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

                resolve()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

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