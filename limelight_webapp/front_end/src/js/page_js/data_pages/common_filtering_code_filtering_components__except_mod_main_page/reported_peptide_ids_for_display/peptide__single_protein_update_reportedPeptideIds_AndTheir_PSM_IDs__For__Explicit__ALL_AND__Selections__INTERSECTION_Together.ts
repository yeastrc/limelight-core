/**
 * peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together.ts
 *
 * All / AND / Intersection
 *
 * For Filters where user has explicitly chosen "AND".   Same filters where user can choose "OR" or "EXCLUDE"
 *
 */

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {reporterIonMass_CommonRounding_ReturnNumber} from "page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL"/"AND" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 */
export class Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Internal class for - Get for Static Modification mass Selection Type ALL.
     *
     * Separate class to support caching of results
     *
     */
    private _internal_ComputeFor_SelectionType_ALL__StaticModifications: Internal_ComputeFor_SelectionType_ALL__StaticModifications

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        this._internal_ComputeFor_SelectionType_ALL__StaticModifications = Internal_ComputeFor_SelectionType_ALL__StaticModifications.getNewInstance({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) : Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class {

        return new Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     *
     *
     */
    peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,

            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject,
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        }): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

        const singleProtein_Filter_SelectionType_Requested = SingleProtein_Filter_SelectionType.ALL;

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        {  //  Static Mod ALL selections

            const result = this._internal_ComputeFor_SelectionType_ALL__StaticModifications.computeFor__SelectionType_ALL__StaticModifications({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,

                modificationMass_UserSelections_StateObject
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        { // 'unmodified' ALL  in the Variable Modification mass filter section

            const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection({
                modificationMass_UserSelections_StateObject,
                singleProtein_Filter_SelectionType_Requested,   //  ALL
                reportedPeptideIds_ProteinId_Params_PassedIn
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                modificationMass_UserSelections_StateObject
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        { // 'unmodified' ALL  in the Open Modification mass filter section

            const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection({
                modificationMass_UserSelections_StateObject,
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._computeFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,
                modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        {
            const result = this._computeFor__SelectionType_ALL___For__ReporterIonMassesSelected({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                reporterIonMass_UserSelections_StateObject
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
    }

    /**
     * User has selected 'unmodified' ALL  in the Variable Modification mass filter section
     *
     */
    private _computeFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection (
        {
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ALL
            reportedPeptideIds_ProteinId_Params_PassedIn
        }: {
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ALL
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
        if ( ( ! unmodifiedSelection )
            || unmodifiedSelection.selectionType !== singleProtein_Filter_SelectionType_Requested) {

            //  No Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        //  Get Data and then call ..._AfterGetData function

        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

            const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData({
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                reportedPeptideIds_ProteinId_Params_PassedIn
            });

            return { result, promise: undefined }  // EARLY RETURN

        } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
                try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                                value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

                            const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData({
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                reportedPeptideIds_ProteinId_Params_PassedIn
                            });

                            resolve(result);

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

            return { promise, result: undefined }  // EARLY RETURN

        } else {
            throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result  no 'data' or 'promise'")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("Should Not Get Here")
    }

    /**
     *
     * @param variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     */
    private _computeFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData (
        {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            reportedPeptideIds_ProteinId_Params_PassedIn
        }: {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) {

            //  No values for this search, return Empty

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData; // EARLY RETURN
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {
            const modificationsForReportedPeptide = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);
            if (! modificationsForReportedPeptide) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });

                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    /**
     * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified (
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ((!modificationMass_UserSelections_StateObject)
            || (!modificationMass_UserSelections_StateObject.get_VariableModificationSelections())
            || (!modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({singleProtein_Filter_SelectionType_Requested}))) {

            //  No Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

            const reportedPeptideIdsMap_Key_VariableModMass =
                this._computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AllForSearchMainFilters_Create_reportedPeptideIdsMap_Key_VariableModMass({
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    modificationMass_UserSelections_StateObject
                });

            const result =
                this._computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AfterGetData({
                    reportedPeptideIdsMap_Key_VariableModMass,
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_UserSelections_StateObject
                })

            return {                            //   EARLY RETURN
                result, promise: undefined
            }

        } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
                try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                                value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

                            const reportedPeptideIdsMap_Key_VariableModMass =
                                this._computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AllForSearchMainFilters_Create_reportedPeptideIdsMap_Key_VariableModMass({
                                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                    modificationMass_UserSelections_StateObject
                                });

                            const result =
                                this._computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AfterGetData({
                                    reportedPeptideIdsMap_Key_VariableModMass,
                                    reportedPeptideIds_ProteinId_Params_PassedIn,
                                    modificationMass_UserSelections_StateObject
                                });

                            resolve(result)

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

            return {                            //   EARLY RETURN
                promise, result: undefined
            }

        } else {
            const msg = "get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result: no 'data' or 'promise"
            console.warn(msg)
            throw Error(msg)
        }

    }

    /**
     * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AllForSearchMainFilters_Create_reportedPeptideIdsMap_Key_VariableModMass (
        {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            modificationMass_UserSelections_StateObject
        } : {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        }) {

        const reportedPeptideIdsMap_Key_VariableModMass = new Map<number, Set<number>>()

        for (const variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) {

            for (const dynamicModifications_Entry of variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId_Entry) {

                const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

                let mass = dynamicModifications_Entry.mass;

                const mass_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(mass_Rounded);
                if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                    let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(mass_Rounded);
                    if (!reportedPeptideIdsMapEntry) {
                        reportedPeptideIdsMapEntry = new Set<number>();
                        reportedPeptideIdsMap_Key_VariableModMass.set(mass_Rounded, reportedPeptideIdsMapEntry);
                    }
                    reportedPeptideIdsMapEntry.add(reportedPeptideId);
                }
            }
        }

        return reportedPeptideIdsMap_Key_VariableModMass;
    }

    /**
     * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified__AfterGetData (
        {
            reportedPeptideIdsMap_Key_VariableModMass,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject
        } : {
            reportedPeptideIdsMap_Key_VariableModMass : Map<number, Set<number>>
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS  {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
        {
            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmIds_Include: undefined
                });

                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        //  Remove all reportedPeptideId not found for all selectedModMass

        for (const selectedModMass of modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet()) {

            const reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get(selectedModMass)
            if (!reportedPeptideIdsMapEntry) {
                //  No reportedPeptideIds found for required modification mass so remove all entries and exit loop
                resultData.clearAllEntries();

                break; // EARLY EXIT LOOP
            }

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {
                if (!reportedPeptideIdsMapEntry.has(reportedPeptideId)) {
                    //  Existing ReportedPeptideId not in entries for this selected mod mass so remove since this is an intersection
                    resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)
                }
            }
        }

        return resultData;
    }

////////////////////////////////////////

//     Open Mods

    /**
     * User has selected 'unmodified' ALL  in the Open Modification mass filter section
     *
     */
    private _computeFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection (
        {
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ALL
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ALL
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
        if ( ( ! unmodifiedSelection )
            || unmodifiedSelection.selectionType !== singleProtein_Filter_SelectionType_Requested) {

            //  No Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        //  Get data for processing

        let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder = undefined;
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined;

        const promises: Array<Promise<void>> = [];

        {  // Get openModifications_On_PSM_For_MainFilters_Holder

            const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                get_OpenModifications_On_PSMHolder_AllForSearch();

            if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {

                openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder;

            } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                            try {
                                openModifications_On_PSM_For_MainFilters_Holder = value.openModifications_On_PSM_For_MainFilters_Holder;

                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

                promises.push(promise);

            } else {
                throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
        {  // Get psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder

            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();

            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                            try {
                                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

                promises.push(promise);

            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {

            const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData({
                openModifications_On_PSM_For_MainFilters_Holder,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);


        const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
            try {
                promises_All.catch(reason => {
                    reject(reason)
                })
                promises_All.then(noValue => {
                    try {
                        const result = this._computeFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData({
                            openModifications_On_PSM_For_MainFilters_Holder,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                        });

                        resolve(result);

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

        return {
            promise: promise_Return,  result: undefined
        }
    }

    /**
     *
     * @param openModifications_On_PSM_For_MainFilters_Holder
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     */
    private _computeFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData (
        {
            openModifications_On_PSM_For_MainFilters_Holder,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if ( ! openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries() ) {

            //  No Open Mod values on PSMs for this search, Add Everything

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
            });
            return resultData; // EARLY RETURN
        }

        ////

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
        {
            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmIds_Include: undefined
                });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        //

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId =
                openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
            if ((!psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId)
                || psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size === 0) {

                //  No Open Modification for reportedPeptideId so nothing needs to happen to entry for reportedPeptideId

            } else {
                //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

                const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
                if (!psmIdsForReportedPeptideId) {
                    const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                //  Get Existing entry
                const resultData_Entry = resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId)
                if (!resultData_Entry) {

                    //  NO Existing Entry so skip
                } else {
                    //  Process Existing Entry for this filter

                    if ( ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() )
                        && ( psmIdsForReportedPeptideId.length === psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size)) {

                        //  Not:  User Selected 'TreatOpenModMassZeroAsUnmodified'
                        //  and:  All PSM IDs for reportedPeptideId have Open Mods
                        //      So remove reportedPeptideId entry

                        resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId);

                    } else {
                        //  Remove PSM IDs that have Open Modifications

                        let psmIncludes_New: Set<number> = undefined;

                        if (resultData_Entry.psmIds_Include) {
                            psmIncludes_New = new Set(resultData_Entry.psmIds_Include)
                        } else {
                            psmIncludes_New = new Set(psmIdsForReportedPeptideId); // resultData_Entry.psmIds_Include is always undefined so this is always executed
                        }

                        if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                            if ( ! psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) {
                                const msg = "( ! psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) NOT return a value. reportedPeptideId: " + reportedPeptideId
                                console.warn(msg)
                                throw Error(msg)
                            }
                            for (const openModificationMass_RoundedMap_Entry of psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap.entries()) {
                                const openModificationMass_RoundedMap_EntryValue = openModificationMass_RoundedMap_Entry[1];
                                if ( openModificationMass_RoundedMap_EntryValue.openModificationMass_Rounded !== 0 ) { //  Exclude Rounded Mass of Zero
                                    // Processing all BUT Mass Zero since User selected TreatOpenModMassZeroAsUnmodified
                                    for ( const psmId of openModificationMass_RoundedMap_EntryValue.psmIds_Set ) {
                                        psmIncludes_New.delete(psmId);
                                    }
                                }
                            }
                        } else {
                            //  Not TreatOpenModMassZeroAsUnmodified so Simpler code

                            for (const psmId_ContainAnyOpenModificationMass of psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                                psmIncludes_New.delete(psmId_ContainAnyOpenModificationMass);
                            }
                        }

                        if ( psmIncludes_New.size === 0 ) {

                            //  No PSM IDs left so delete

                            resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId);

                        } else {

                            // Store PSM IDs on resultData_Entry

                            resultData_Entry.psmIds_Include = psmIncludes_New;
                        }
                    }
                }
            }
        }

        return resultData;
    }

    /**
     * User has selected Open Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified (
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            singleProtein_Filter_SelectionType_Requested,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ((!modificationMass_UserSelections_StateObject) || (!modificationMass_UserSelections_StateObject.get_OpenModificationSelections())) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        if (!modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({singleProtein_Filter_SelectionType_Requested})) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        if (modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection()) {

            const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

            if (selectedModificationMasses.has(0)) {

                //  User has selected TreatOpenModMassZeroAsUnmodified And has selected Open Mod Mass Zero type 'ALL'

                //   Return Empty Result since Open Mod Mass Zero is Not being considered an Open Mod Mass

                //  Create Empty Result
                const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });
                const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                    result: resultData_Empty, promise: undefined
                };

                return result;  // EARLY RETURN
            }
        }

        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
            get_OpenModifications_On_PSMHolder_AllForSearch();

        if (get_OpenModifications_On_PSMHolder_AllForSearch_Result.data) {

            const openModifications_On_PSM_For_MainFilters_Holder =
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder

            const result = this._computeFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                openModifications_On_PSM_For_MainFilters_Holder,
                modificationMass_UserSelections_StateObject,
            })

            return { result, promise: undefined }  // EARLY RETURN

        } else if (get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise) {

            const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>( (resolve, reject) => {
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                    try {
                        const openModifications_On_PSM_For_MainFilters_Holder =
                            value.openModifications_On_PSM_For_MainFilters_Holder

                        const result = this._computeFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            openModifications_On_PSM_For_MainFilters_Holder,
                            modificationMass_UserSelections_StateObject,
                        })

                        resolve(result);
                    }catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            })

            return { promise, result: undefined }  // EARLY RETURN

        } else {
            throw Error("get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result: not 'data' or 'promise'")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }


    /**
     * User has selected Open Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData (
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            openModifications_On_PSM_For_MainFilters_Holder,
            modificationMass_UserSelections_StateObject,
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if (!openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries()) {
            //  NO modifications for this search so cannot find any matches to selected Open Modification masses

            //  Create Empty Result
            const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData_Empty;  // EARLY RETURN
        }

        const psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded: Map<number, Map<number, Set<number>>> = new Map();

//  Add to psmIdsSet_Map_Key_ReportedPeptideId any reported peptide ids with modification masses that are selected

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId)
            if (psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object) {

                const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                for (const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries()) {

                    const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[1];
                    const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                    const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                    const selectionEntry = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry(openModificationMass_Rounded)
                    if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                        let psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get(openModificationMass_Rounded);
                        if (!psmIdsSet_Map_Key_ReportedPeptideId) {
                            psmIdsSet_Map_Key_ReportedPeptideId = new Map();
                            psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.set(openModificationMass_Rounded, psmIdsSet_Map_Key_ReportedPeptideId)
                        }
                        let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
                        if (!psmIdsSet) {
                            psmIdsSet = new Set()
                            psmIdsSet_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIdsSet)
                        }
                        for (const psmId of psmIds_Set) {
                            psmIdsSet.add(psmId)
                        }
                    }
                }
            }
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        //  Populate for all reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId.  Will delete some below

        for ( const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {
            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: undefined
            })
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        const selectedModificationMasses = new Set(modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

        for (const selectedModificationMass of selectedModificationMasses) {

            //  Intersection applied for each entry of selectedModificationMasses

            const psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get(selectedModificationMass)

            if (!psmIdsSet_Map_Key_ReportedPeptideId) {
                //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this protein

                //  Create Empty Result
                const resultData_Empty = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });

                return resultData_Empty;  // EARLY RETURN
            }

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const resultData_Entry = resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId)
                if (!resultData_Entry) {

                    continue  //  EARLY CONTINUE
                }

                const psmIds_Include_For_ReportedPeptideId_SelectedModificationMass = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
                if (!psmIds_Include_For_ReportedPeptideId_SelectedModificationMass) {

                    //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this reported peptide id
                    resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)

                    continue  //  EARLY CONTINUE
                }

                if ( ! resultData_Entry.psmIds_Include ) {

                    resultData_Entry.psmIds_Include = new Set( psmIds_Include_For_ReportedPeptideId_SelectedModificationMass );
                } else {

                    resultData_Entry.psmIds_Include = _numberSets_Return_Intersection({ numberSet_1: resultData_Entry.psmIds_Include, numberSet_2: psmIds_Include_For_ReportedPeptideId_SelectedModificationMass });
                }
            }
        }

        return resultData;
    }

    /**
     * User has selected Reporter Ion Masses 'ALL' to filter on
     *
     */
    private _computeFor__SelectionType_ALL___For__ReporterIonMassesSelected (
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            reporterIonMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ! reporterIonMass_UserSelections_StateObject ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }
        if ( ! reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) )  {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        //  Get data for processing
        let reporterIons_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder = undefined;
        let numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = undefined;

        const promises: Array<Promise<void>> = [];

        {  // Get reporterIons_On_PSM_For_MainFilters_Holder

            const get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters().
                get_ReporterIonMasses_On_PSMHolder_AllForSearch();

            if ( get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result.data ) {

                reporterIons_On_PSM_For_MainFilters_Holder = get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result.data.reporterIons_On_PSM_For_MainFilters_Holder;

            } else if ( get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                            try {
                                reporterIons_On_PSM_For_MainFilters_Holder = value.reporterIons_On_PSM_For_MainFilters_Holder;
                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

                promises.push(promise);

            } else {
                throw Error("get_ReporterIonMasses_On_PSMHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
        {  // Get numPsmsForReportedPeptideIdMap

            const get_numPsmsForReportedPeptideIdMap_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().
                get_numPsmsForReportedPeptideIdMap();

            if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {

                numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap;

            } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_numPsmsForReportedPeptideIdMap_Result.promise.then(value => {
                            try {
                                numPsmsForReportedPeptideIdMap = value.numPsmsForReportedPeptideIdMap;

                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

                promises.push(promise);

            } else {
                throw Error("get_numPsmsForReportedPeptideIdMap_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {

            const result = this._computeFor__SelectionType_ALL___For__ReporterIonMassesSelected_AfterLoadData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                reporterIonMass_UserSelections_StateObject,
                reporterIons_On_PSM_For_MainFilters_Holder,
                numPsmsForReportedPeptideIdMap
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);


        const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
            try {
                promises_All.catch(reason => {
                    reject(reason)
                })
                promises_All.then(noValue => {
                    try {
                        const result = this._computeFor__SelectionType_ALL___For__ReporterIonMassesSelected_AfterLoadData({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            reporterIonMass_UserSelections_StateObject,
                            reporterIons_On_PSM_For_MainFilters_Holder,
                            numPsmsForReportedPeptideIdMap
                        });

                        resolve(result);

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

        return {
            promise: promise_Return,  result: undefined
        }
    }


    /**
     * User has selected Reporter Ion Masses 'ALL' to filter on
     *
     */
    private _computeFor__SelectionType_ALL___For__ReporterIonMassesSelected_AfterLoadData (
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            reporterIonMass_UserSelections_StateObject,
            reporterIons_On_PSM_For_MainFilters_Holder,
            numPsmsForReportedPeptideIdMap
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
            reporterIons_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder
            numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if (!reporterIons_On_PSM_For_MainFilters_Holder.is_Has_ReporterIonMasses_OnPSMs_ForReportedPeptides_Entries()) {

            //  NO Reporter Ion Masses so No Values are Selected for this search so return empty selection

            //  Create Empty Result
            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData;  // EARLY RETURN
        }

        ///

        //  Get User "ALL/AND" selections for Reporter Ion Masses
        const reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_MainInstance = reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet();

        //
        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for ( const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

            const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = reporterIons_On_PSM_For_MainFilters_Holder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap_Object) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id so skip

                continue;  // EARLY CONTINUE
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id so skip

                continue;  // EARLY CONTINUE
            }

            const psmIds_FoundFor_All_UserSelections = new Set<number>();

            for (const psmReporterIonMassesPerPSM_ForPsmIdMap_Entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries()) {

                const psmId = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[0];
                const reporterIonMasses_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[1];

                if ( psmId !== reporterIonMasses_Object.psmId ) {
                    //  Map Key is NOT PSM ID
                    const msg = "Map Key is NOT PSM ID: ( psmId !== reporterIonMasses_Object.psmId ) for const psmId = psmReporterIonMassesPerPSM_ForPsmIdMap_Entry[0]; ";
                    console.warn(msg);
                    throw Error(msg);
                }

                //  Make copy for processing this PSM ID
                const reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues = new Set( reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_MainInstance );

                const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;

                for (const reporterIonMass of reporterIonMasses_Set) {

                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber(reporterIonMass);  // Call external function

                    reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues.delete(reporterIonMass_Rounded);
                }

                if ( reporterIonsSelected_MassesOnly__SelectionType__ALL__AsSet_Copy__DeleteFoundValues.size === 0 ) {

                    //  All "ALL/AND" selections found so save PSM ID

                    psmIds_FoundFor_All_UserSelections.add( psmId );
                }
            }

            if ( psmIds_FoundFor_All_UserSelections.size === 0 ) {
                //  NO PSM IDs contain selected "ALL/AND" Reporter Ion Masses for Reported Peptide Id so skip

                continue;  // EARLY CONTINUE
            }

            {
                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                    throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
                }

                if ( psmIds_FoundFor_All_UserSelections.size === numPsmsForReportedPeptideId ) {

                    //  ALL PSM IDs contain selected "ALL/AND" Reporter Ion Masses for Reported Peptide Id so store reported peptide id with no PSM Ids

                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                        reportedPeptideId, psmIds_Include: undefined
                    });
                    resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);

                    continue;  // EARLY CONTINUE
                }
            }

            //  store reported peptide id with PSM Ids

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: psmIds_FoundFor_All_UserSelections
            });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        return resultData;
    }
}


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for Static Modification mass Selection Type ALL.
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor_SelectionType_ALL__StaticModifications {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Cached Results
     */
    private _staticModSearch_CachedResults: {
        staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor: Set<string>
        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod: Set<number>
    }

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) : Internal_ComputeFor_SelectionType_ALL__StaticModifications {

        return new Internal_ComputeFor_SelectionType_ALL__StaticModifications({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * Get for Static Modification mass Selection Type ALL.
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    computeFor__SelectionType_ALL__StaticModifications(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            singleProtein_Filter_SelectionType_Requested,

            modificationMass_UserSelections_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType

            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        if ( reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum ===
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.ALL_FOR_SEARCH
        ) {

            //  For processing with NO _proteinSequenceVersionId

            return this._computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,
                modificationMass_UserSelections_StateObject
            });


        } else if ( reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum ===
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.ALL_FOR_SINGLE_PROTEIN_IN_SEARCH
        ) {

            //  For processing with YES ALL_FOR_SINGLE_PROTEIN_IN_SEARCH

            return this._computeFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,
                modificationMass_UserSelections_StateObject
            });

        } else {

            const msg = "computeFor__SelectionType_ALL__StaticModifications(...):: 'Get for Static Modification mass Selection Type ALL.'  reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum value NOT supported.  reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum: " +
                reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum;
            console.warn(msg)
            throw Error(msg)
        }

    }

    /**
     * Get for Static Modification mass Selection Type ALL.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId (
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            singleProtein_Filter_SelectionType_Requested,
            modificationMass_UserSelections_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        //  Get Data and then call ..._AfterGetData function

        let staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  staticMods_Holder
            const get_StaticModsHolder_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();

            if ( get_StaticModsHolder_Result.data ) {
                staticMods_Holder = get_StaticModsHolder_Result.data.staticMods_Holder;
            } else if ( get_StaticModsHolder_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                        get_StaticModsHolder_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_StaticModsHolder_Result.promise.then(value => { try {
                            staticMods_Holder = value.staticMods_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_StaticModsHolder_Result  no 'data' or 'promise'")
            }
        }

        {  //  peptideIds_For_MainFilters_Holder
            const get_PeptideIdsHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder;
            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                        peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        {  //  peptideSequences_For_MainFilters_Holder
            const get_PeptideSequencesHolder_AllForAllSearches_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

            if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder;
            } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                        peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {
            const result = this._computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                modificationMass_UserSelections_StateObject,
                staticMods_Holder,
                peptideIds_For_MainFilters_Holder,
                peptideSequences_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_UserSelections_StateObject,
                    staticMods_Holder,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }


    /**
     * Get for Static Modification mass Selection Type ALL.  NOT proteinSequenceVersionId value  -  After Get Data
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData (
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject,
            staticMods_Holder,
            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

            //  Data from server
            staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if (!staticMods_Holder.get_StaticMods()) {

            //  No Static mods so return empty selection

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData; // EARLY RETURN
        }

        const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();

        for (const staticModEntry of staticMods_Holder.get_StaticMods()) {

            const residueLetter = staticModEntry.residue
            const mass = staticModEntry.mass;

            const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

            const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                residueLetter,
                modMass: massForPositionForComparison
            });
            if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                const residueLetter_I_To_L = residueLetter.replace(findAll_I_Regex, 'L');
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.add(residueLetter_I_To_L);
            }
        }

        if (staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size === 0) {

            //  No Static mods that meet filters so  return empty selection

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData; // EARLY RETURN
        }

        let reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod: Set<number> = undefined;

        {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

            if (this._staticModSearch_CachedResults) {

                const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached = this._staticModSearch_CachedResults.staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor;
                //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                if (staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.size === staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size) {

                    let currentAndCachedContentsSame = true;
                    for (const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {
                        if (!staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.has(staticMod_residueLetter)) {
                            currentAndCachedContentsSame = false;
                            break;
                        }
                    }
                    if (currentAndCachedContentsSame) {
                        //  Search data same as cached so re-use cached data
                        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = this._staticModSearch_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod;
                    }
                }
            }
        }

        if (!reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = new Set();

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if (peptideId === undefined || peptideId === null) {
                    throw Error("peptideId not found for reportedPeptideId. _computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
                }
                const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if (peptideSequenceString === undefined || peptideSequenceString === null) {
                    throw Error("peptideSequenceString not found for peptideId. _computeFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                //  Only add reportedPeptideId to result if All staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor entries are in peptideSequenceString_I_To_L

                let foundAll_staticMod_residueLetters = true;

                for (const staticMod_residueLetter_I_To_L of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {

                    if ( ! peptideSequenceString.includes(staticMod_residueLetter_I_To_L)) {
                        if ( staticMod_residueLetter_I_To_L === "L" ) {
                            if ( ! peptideSequenceString.includes("I")) {  //  Letter is "L" so test with "I".  Don't need opposite since staticMod_residueLetter_I_To_L already has "L" if originally was "I"
                                foundAll_staticMod_residueLetters = false;
                                break;
                            }
                        } else {
                            foundAll_staticMod_residueLetters = false;
                            break;
                        }
                    }
                }
                if ( foundAll_staticMod_residueLetters ) {
                    reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add(reportedPeptideId);
                }
            }

            this._staticModSearch_CachedResults = {
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
            }
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        return resultData;
    }

    /**
     * Get for Static Modification mass Selection Type ALL.  HAVE proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _computeFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId (
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested }) ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        return {
            result: undefined, promise: this._computeFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId__MainProcessing({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,

                modificationMass_UserSelections_StateObject
            })
        }
    }

    /**
     * 'async' function
     *
     * Get for Static Modification mass Selection Type ALL.  HAVE proteinSequenceVersionId value -- Main Processing
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private async _computeFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId__MainProcessing (
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        }): Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> {

        try {
            const proteinSequenceVersionId = reportedPeptideIds_ProteinId_Params_PassedIn.get_proteinSequenceVersionId()

            const get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_Result = await
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId().
                get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_ReturnPromise(proteinSequenceVersionId);

            if ( ! get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_Result ) {
                const msg = "( ! get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_Result ) proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg)
                throw Error(msg)
            }

            const staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder =
                get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_Result.staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder

            const staticModifications_ResiduesPositions_For_ProteinSequenceVersionId =
                staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder.get_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId(proteinSequenceVersionId)

            if (staticModifications_ResiduesPositions_For_ProteinSequenceVersionId.size === 0) {

                //  No Static mods so return empty selection

                const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });

                return resultData; // EARLY RETURN
            }

            const staticModificationsOnProtein = staticModifications_ResiduesPositions_For_ProteinSequenceVersionId;

            const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter = new Map<string, Map<number, Set<number>>>()

            { // set up proteinPositions_Key_ModMass_Key_ResidueLetter
                //  call ...ONLY__ALL_SelectionType()
                const staticModifications_Selected: Map<string, Set<number>> = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType()
                for (const staticModifications_Selected_Entry of staticModifications_Selected.entries()) {
                    const entry_Key_ResidueLetter = staticModifications_Selected_Entry[0]
                    const entry_Value_MassesSet: Set<number> = staticModifications_Selected_Entry[1]

                    const accumulate_proteinPositions_Key_ModMass = new Map<number, Set<number>>()
                    accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.set(entry_Key_ResidueLetter, accumulate_proteinPositions_Key_ModMass)

                    for (const massSelected of entry_Value_MassesSet) {

                        const massSelected_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massSelected});

                        accumulate_proteinPositions_Key_ModMass.set(massSelected_Rounded, new Set())
                    }
                }
            }

            //  Search through Static Masses per position to get positions
            for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

                const position = staticModificationsOnProteinEntry[0];
                const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

                const residueLetter = staticModificationsAtPosition.residue

                for (const massForPosition of staticModificationsAtPosition.massesSet) {

                    const massForPosition_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForPosition});

                    const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                        residueLetter,
                        modMass: massForPosition_Rounded
                    });
                    if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter)
                        if (!accumulate_proteinPositions_Key_ModMass) {
                            const msg = "accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter) not return a value for residueLetter: " + residueLetter
                            console.warn(msg)
                            throw Error(msg)
                        }
                        const accumulate_proteinPositions = accumulate_proteinPositions_Key_ModMass.get(massForPosition_Rounded)
                        if (!accumulate_proteinPositions_Key_ModMass) {
                            const msg = "accumulate_proteinPositions_Key_ModMass.get( massForPositionForComparison ) not return a value for massForPosition_Rounded: " +
                                massForPosition_Rounded + ",  residueLetter: " + residueLetter
                            console.warn(msg)
                            throw Error(msg)
                        }
                        accumulate_proteinPositions.add(position);
                    }
                }
            }

            //  Process accumulated protein positions

            ////

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            //  First populate for reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId and then delete as needed
            {
                for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                        reportedPeptideId, psmIds_Include: undefined
                    });

                    resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
                }
            }

            for (const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry of accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.entries()) {

                // const residueLetter = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[0];
                const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[1];

                for (const accumulate_proteinPositions_Key_ModMass_Entry of accumulate_proteinPositions_Key_ModMass.entries()) {
                    // const modMass = accumulate_proteinPositions_Key_ModMass_Entry[0]
                    const proteinPositions = accumulate_proteinPositions_Key_ModMass_Entry[1]

                    //  Processing One residueLetter/modMass selection and it's proteinPositions

                    //  Utilize getReportedPeptideIdsForDisplay_ProteinPositionsSelected
                    const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__For_ProteinPositions =
                        await Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.
                        getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise({
                            selectedProteinSequencePositions: proteinPositions,
                            proteinSequenceVersionId,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                        });

                    if (! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__For_ProteinPositions.is_AnyEntries() ) {

                        //  No reportedPeptideId entries for selection so return empty selection

                        return peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__For_ProteinPositions; // EARLY RETURN
                    }

                    //  remove entries in INPUT reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                    //  that are not in result for current  residueLetter/modMass selection (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions)

                    for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                        if (!
                            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__For_ProteinPositions.
                            get_Entry_For_ReportedPeptideId(reportedPeptideId)
                        ) {
                            //  Existing entry NOT in entries for this residueLetter/modMass selection so remove
                            resultData.delete_Entry_For_ReportedPeptideId(reportedPeptideId)
                        }
                    }
                }
            }

            return resultData;

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//   Non Class Functions


/**
 *
 * @param numberSet_1
 * @param numberSet_2
 * @private
 */
const _numberSets_Return_Intersection = function (
    {
        numberSet_1, numberSet_2
    } : {
        numberSet_1 : Set<number>
        numberSet_2 : Set<number>
    }
) : Set<number> {

    const result = new Set<number>();

    for ( const number_1 of numberSet_1 ) {
        if (numberSet_2.has(number_1)) {
            result.add(number_1);
        }
    }

    return result;
}


//////////////
//////////////

//   Modification Mass Rounding to provide some level of commonality between searches

/**
 *
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({mass} : {mass : number}) : number {
    return modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
}