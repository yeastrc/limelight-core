/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections.ts
 *
 * Any / OR / Union
 *
 * !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
 *
 * ONLY For Modification Selections
 */

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
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

//     Filter using "ANY"/"OR" (UI has "OR") Selections building up a UNION of the selected entries

//          !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk

/**
 *
 */
export class Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Internal class for - Get for Static Modification mass Selection Type ANY.
     *
     * Separate class to support caching of results
     *
     */
    private _internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications: Internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications

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

        this._internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications = Internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications.getNewInstance({
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
    ) : Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections {

        return new Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     *
     *   Filter using "ANY"/"OR" (UI has "OR") Selections building up a UNION of the selected entries
     *
     *   !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
     *
     * @returns
     */
    peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ModificationSelections(
        {
            singleProtein_Filter_SelectionType_Requested,   //  ANY/OR or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        {  //  Static Mod ANY/NOT selections

            const result = this._internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications.getFor__SelectionType_ANY_NOT__StaticModifications({
                reportedPeptideIds_ProteinId_Params_PassedIn: reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,
                modificationMass_UserSelections_StateObject
            });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        //  Variable Mods

        {  //  Variable Mod ANY/NOT selection (only unmodified)

            const result =
                this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection({ //  Variable Mod Unmodified type ANY/NOT selection
                    modificationMass_UserSelections_StateObject,
                    singleProtein_Filter_SelectionType_Requested,
                    reportedPeptideIds_ProteinId_Params_PassedIn
                });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {  //  Variable Mod type ANY/NOT selection (excludes unmodified)

            const result =
                this._computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified({
                    modificationMass_UserSelections_StateObject,
                    singleProtein_Filter_SelectionType_Requested,
                    reportedPeptideIds_ProteinId_Params_PassedIn
                });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        //  Open Mods
        {  //  Open Mod ANY/NOT selection (only unmodified)
            const result =
                this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection({ //  Open Mod Unmodified type ANY/NOT selection
                    modificationMass_UserSelections_StateObject,
                    singleProtein_Filter_SelectionType_Requested,
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        {  //  Open Mod type ANY/NOT selection (excludes unmodified)
            const result =
                this._computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    singleProtein_Filter_SelectionType_Requested,
                    modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                });

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__FinalResult =
            this._merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
            })

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__FinalResult;
    }

    /**
     * User has selected 'unmodified' ANY/NOT  in the Variable Modification mass filter section
     *
     *  return
     */
    private _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection(
        {
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn
        }: {
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

        }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections() ) ){

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

        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

            const result = this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData({
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

                            const result = this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData({
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
    private _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_VariableModificationMassSection_AfterGetData(
        {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            reportedPeptideIds_ProteinId_Params_PassedIn,
        }: {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) {

            //  No values for this search, Add Everything

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
            });

            return resultData; // EARLY RETURN
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {
            const modificationsForReportedPeptide = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);
            if (!modificationsForReportedPeptide) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined });

                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    /**
     * User has selected Variable Modification Masses 'ANY'/'NOT' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified (
        {
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn
        }: {
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections() )
            || ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested }) ) ) {

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

        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
            get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;

            const result =
                this._computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified__Create_reportedPeptideIdsMap_Key_VariableModMass({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    modificationMass_UserSelections_StateObject,
                    singleProtein_Filter_SelectionType_Requested
                });

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

                            const result =
                                this._computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified__Create_reportedPeptideIdsMap_Key_VariableModMass({
                                    reportedPeptideIds_ProteinId_Params_PassedIn,
                                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                    modificationMass_UserSelections_StateObject,
                                    singleProtein_Filter_SelectionType_Requested
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
     * User has selected Variable Modification Masses 'ANY' to filter on (Other than 'unmodified')
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__VariableModificationMassesSelected_OtherThanUnmodified__Create_reportedPeptideIdsMap_Key_VariableModMass(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested
        } : {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT

        }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if ((!variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder)
            || ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()) ) {
            //  No values for this search, skip

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData; // EARLY RETURN
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for ( const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

            const variable_Dynamic_Modifications_At_ReportedPeptideId_Entry =
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);

            if ( ! variable_Dynamic_Modifications_At_ReportedPeptideId_Entry ) {
                //  No data for reportedPeptideId so skip
                continue; // EARLY CONTINUE
            }

            for (const dynamicModifications_Entry of variable_Dynamic_Modifications_At_ReportedPeptideId_Entry ) {

                const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

                if ( ! resultData.get_Entry_For_ReportedPeptideId(reportedPeptideId) ) {

                    //  reportedPeptideId not already in resultData

                    const mass = dynamicModifications_Entry.mass;

                    const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                    if (selectEntry && selectEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined
                        });
                        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
                    }
                }
            }
        }

        return resultData;
    }

////////////////////////////////////////

//     Open Mods

    /**
     * User has selected 'unmodified' 'ANY'/'NOT' in the Open Modification mass filter section
     *
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection(
        {
            modificationMass_UserSelections_StateObject,
            singleProtein_Filter_SelectionType_Requested,   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! modificationMass_UserSelections_StateObject )
            || ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections() ) ){

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
        {
            const unmodifiedSelection = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
            if ( ( ! unmodifiedSelection )
                || unmodifiedSelection.selectionType !== singleProtein_Filter_SelectionType_Requested) {

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
        }

        //  Get data for processing

        let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder = undefined;
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined;
        let numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = undefined;

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

            const result = this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData({
                openModifications_On_PSM_For_MainFilters_Holder,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                numPsmsForReportedPeptideIdMap,
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
                        const result = this._computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData({
                            openModifications_On_PSM_For_MainFilters_Holder,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            numPsmsForReportedPeptideIdMap,
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
    private _computeFor__SelectionType_ANY_NOT___For__Unmodified_Selected_In_OpenModificationMassSection_AfterGetData(
        {
            openModifications_On_PSM_For_MainFilters_Holder,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            numPsmsForReportedPeptideIdMap,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if (!openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries()) {

            //  No Open Mod values on PSMs for this search, Add Everything

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
            });

            return resultData; // EARLY RETURN
        }

        //////

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const openModificationsForReportedPeptide = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
            if ((!openModificationsForReportedPeptide)
                || openModificationsForReportedPeptide.psmOpenModificationMassPerPSM_ForPsmIdMap.size === 0) {

                //  No Open Modification for reportedPeptideId so add whole reportedPeptideId to result

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined
                });

                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);

            } else {
                //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);
                const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId =
                    openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId)
                if (numPsmsForReportedPeptideId && psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId) {
                    if (
                        numPsmsForReportedPeptideId === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size
                        && ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() )
                    ) {

                        //  All PSM IDs for reportedPeptideId have Open Mods And Not Treating Zero Mod mass as unmodified  so skip processing

                    } else {

                        //  All PSM IDs for each reported peptide id for current cutoffs

                        //  Create a Set of PSM IDs for reportedPeptideId that are NOT in psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass

                        const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
                        if (!psmIdsForReportedPeptideId) {
                            const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const psmIds_NOT_Containing_AnyOpenModificationMass = new Set<number>(psmIdsForReportedPeptideId);

                        if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                            if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) {
                                const msg = "( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap ) NOT return a value. reportedPeptideId: " + reportedPeptideId
                                console.warn(msg)
                                throw Error(msg)
                            }
                            for (const openModificationMass_RoundedMap_Entry of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.openModificationMass_RoundedMap.entries()) {
                                const openModificationMass_RoundedMap_EntryValue = openModificationMass_RoundedMap_Entry[1];
                                if ( openModificationMass_RoundedMap_EntryValue.openModificationMass_Rounded !== 0 ) { //  Exclude Rounded Mass of Zero
                                    // Processing all BUT Mass Zero since User selected TreatOpenModMassZeroAsUnmodified
                                    for ( const psmId of openModificationMass_RoundedMap_EntryValue.psmIds_Set ) {
                                        psmIds_NOT_Containing_AnyOpenModificationMass.delete(psmId);
                                    }
                                }
                            }
                        } else {
                            //  Not TreatOpenModMassZeroAsUnmodified so Simpler code

                            //  Remove psmId that contains open mod mass
                            for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                                psmIds_NOT_Containing_AnyOpenModificationMass.delete(psmId_ContainAnyOpenModificationMass);
                            }
                        }

                        const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

                        for ( const psmId of psmIds_NOT_Containing_AnyOpenModificationMass ) {

                            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                                psmId
                            })
                            psmEntries_Include_Map_Key_PsmId.set( entry.psmId, entry )
                        }

                        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            reportedPeptideId, psmEntries_Include_Map_Key_PsmId
                        });

                        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
                    }
                }
            }
        }

        return resultData;
    }

    /**
     * User has selected Open Modification Masses to filter on (Other than 'unmodified')
     *
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified(
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

        if ( ! modificationMass_UserSelections_StateObject ) {

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

        if ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested }) )  {

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

        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
            get_OpenModifications_On_PSMHolder_AllForSearch();

        if (get_OpenModifications_On_PSMHolder_AllForSearch_Result.data) {

            const openModifications_On_PSM_For_MainFilters_Holder =
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder

            const result = this._computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                openModifications_On_PSM_For_MainFilters_Holder,
                modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
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

                        const result = this._computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData({
                            singleProtein_Filter_SelectionType_Requested,
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            openModifications_On_PSM_For_MainFilters_Holder,
                            modificationMass_UserSelections_StateObject,
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
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
     * User has selected Open Modification Masses 'ANY' to filter on (Other than 'unmodified')   AfterLoadData
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__OpenModificationMassesSelected_OtherThanUnmodified__AfterLoadData(
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            openModifications_On_PSM_For_MainFilters_Holder,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        // const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

        if ( ! openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries() ) {

            //  NO Open Modification Masses so No Values are Selected for this search so exit

            //  Create Empty Result
            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData;  // EARLY RETURN
        }


        const reportedPeptideIds = reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering;

        const psmIdsSet_Map_Key_ReportedPeptideId: Map<number, Set<number>> = new Map();

//  Add to psmIdsSet_Map_Key_ReportedPeptideId any reported peptide ids with modification masses that are selected

        for (const reportedPeptideId of reportedPeptideIds) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object =
                openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId)
            if (psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object) {

                const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                for (const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries()) {

                    const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[1];
                    const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                    const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                    if (
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection()
                        && openModificationMass_Rounded === 0
                    ) {
                        //  Skip Open Mod Mass Rounded Zero Since User Selected TreatOpenModMassZeroAsUnmodified

                        continue;  //  EARLY CONTINUE
                    }

                    const selectionEntry = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry(openModificationMass_Rounded)
                    if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

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

        for (const mapEntry of psmIdsSet_Map_Key_ReportedPeptideId.entries()) {

            const reportedPeptideId = mapEntry[0];
            const psmIds_Include = mapEntry[1]

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_Include ) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    psmId
                })
                psmEntries_Include_Map_Key_PsmId.set( entry.psmId, entry )
            }

            const resultEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId,
                psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(resultEntry);
        }

        return resultData;
    }

    ////////////

    ///   UNION to support "ANY"/"NOT"

    //    Merge Rules for merging UNION/ANY/OR:

    /**
     * Merge in contents As UNION to support "ANY"/"OR" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
     *
     * reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
     *
     */
    private _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        const entry_Result_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

        const promises_From_Entries_Array: Array<Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>> = []

        { //  Check for any that are just undefined or null and throw Error

            for (const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array) {

                if (entry === undefined || entry === null) {

                    //  Found entry Not populated.  Problem with return statement that generated it.

                    const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
                    console.warn(msg);
                    throw Error(msg);
                }

                if (entry.result) {
                    entry_Result_Array.push(entry.result);

                } else if (entry.promise) {
                    promises_From_Entries_Array.push(entry.promise);

                } else {
                    const msg = "entry not have 'result' or 'promise': in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        if ( promises_From_Entries_Array.length === 0 ) {

            //  No Promises so compute and return immediately

            const mergeResult = this._merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entry_Result_Array
            })

            const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: mergeResult, promise: undefined
            }

            return result;  // EARLY RETURN
        }

        const promisesAll = Promise.all( promises_From_Entries_Array );

        const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {

            promisesAll.catch(reason => {
                reject(reason);
            })
            promisesAll.then(promiseResult_Array => {
                try {
                    // Copy all promise results (promiseResult_Array) into entry_Result_Array

                    for ( const promiseResult of promiseResult_Array ) {
                        entry_Result_Array.push(promiseResult)
                    }

                    const mergeResult = this._merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults({
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entry_Result_Array
                    })

                    resolve( mergeResult );

                } catch( e ) {
                    console.warn("Exception caught in promisesAll.then of _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: ", e);
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        })

        const result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            promise: promise_Return, result: undefined
        }

        return result;  // EARLY RETURN
    }

    /**
     * Merge in contents As UNION to support "ANY"/"OR" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
     *
     * reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
     *
     */
    private _merge_ANY_OR_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array__AfterHaveAllResults(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        {  //  If ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            let all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = true;

            for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

                if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                    all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = false;
                    break;
                }
            }

            if ( all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE ) {

                ///  ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

                const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
                });

                return resultData; // EARLY RETURN
            }
        }

        {  //  If ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return that entry

            let onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;
            let foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = false;

            let entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS = undefined;

            for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

                if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                    if ( onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

                        foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                    } else {

                        onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True = true;
                        entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True = entry;
                    }
                }
            }

            if ( ( ! foundMoreThanOneOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True )
                && onlyOne_Entry_NOT_is_noFilter_OR_FilterHasNoData_True ) {

                ///  ONLY ONE entry does NOT have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

                return entry_OnlyOne_NOT_is_noFilter_OR_FilterHasNoData_True; // EARLY RETURN
            }
        }

        {  //  Check for any that includes ALL Reported Peptide Ids

            for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

                if ( entry.is_includeAll_ReportedPeptideIds() ) {

                    //  Found entry with is_includeAll_ReportedPeptideIds() true so just return that since it covers everything

                    return entry; // EARLY RETURN
                }
            }
        }

        //  Start Computing UNION of values

        //  Break out by reported peptide id.  Store entries without PSM Ids separately.  Combine PSM Ids

        const reportedPeptideIds_Entries_Without_PsmIds : Set<number> = new Set();

        const psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId : Map<number, Map<number, Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS>>> = new Map();

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( entry.is_noFilter_OR_FilterHasNoData() ) {

                continue; // EARLY CONTINUE
            }

            for ( const entryPer_ReportedPeptideId of entry.get_Entries_IterableIterator() ) {

                const reportedPeptideId = entryPer_ReportedPeptideId.reportedPeptideId;
                const psmEntries_Include_Map_Key_PsmId = entryPer_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId;

                if ( psmEntries_Include_Map_Key_PsmId ) {

                    if ( ! reportedPeptideIds_Entries_Without_PsmIds.has( reportedPeptideId ) ) {

                        let psmEntry_Array_Map_Key_PsmId = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.get(reportedPeptideId);
                        if ( ! psmEntry_Array_Map_Key_PsmId ) {
                            psmEntry_Array_Map_Key_PsmId = new Map();
                            psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmEntry_Array_Map_Key_PsmId );
                        }
                        for ( const psmEntry of psmEntries_Include_Map_Key_PsmId.values() ) {

                            let psmEntry_Array = psmEntry_Array_Map_Key_PsmId.get( psmEntry.psmId )
                            if ( ! psmEntry_Array ) {
                                psmEntry_Array = []
                                psmEntry_Array_Map_Key_PsmId.set( psmEntry.psmId, psmEntry_Array )
                            }
                            psmEntry_Array.push( psmEntry )
                        }
                    }
                } else {

                    //  Have entry for Reported Peptide ID with NO Sub Filtering on PSM IDs so the UNION is to NOT filter on any PSM IDS

                    //  This will NOT work well if ANY of the entries for the Reported Peptide Id has an object for a PSM with a value that needs to be passed on.

                    //  TODO For now, assume that all objects that are UNION can drop all data per PSM

                    psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.delete(reportedPeptideId);
                    reportedPeptideIds_Entries_Without_PsmIds.add(reportedPeptideId);
                }
            }
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for ( const psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry of psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId.entries() ) {

            const reportedPeptideId = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry[0];
            const psmEntry_Array_Map_Key_PsmId_Map = psmEntry_Array_Map_Key_PsmId_Map_Key_ReportedPeptideId_Entry[1];

            //  Resulting Map of Psm Entries where each Result Psm Entry is the MERGE of all Psm Entries for that Psm Id
            const psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmEntry_Array of psmEntry_Array_Map_Key_PsmId_Map.values() ) {

                const psmEntry_Array_Merged =
                    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS.merge_ExistingObjectsOfThisType( psmEntry_Array )

                psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId.set( psmEntry_Array_Merged.psmId, psmEntry_Array_Merged )
            }

            const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId : reportedPeptideId,
                psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId_Result_PsmEntries_MergedForEachPsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
        }

        for ( const reportedPeptideId of reportedPeptideIds_Entries_Without_PsmIds ) {

            const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId : reportedPeptideId,
                psmEntries_Include_Map_Key_PsmId : undefined
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
        }

        return resultData;
    }
}


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for Static Modification mass Selection Type ANY/NOT (OR/EXCLUDE).
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications {

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
    ) : Internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications {

        return new Internal_ComputeFor_SelectionType_ANY_NOT__StaticModifications({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * Get for Static Modification mass Selection Type ANY/NOT.
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    getFor__SelectionType_ANY_NOT__StaticModifications(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            singleProtein_Filter_SelectionType_Requested,
            modificationMass_UserSelections_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ! modificationMass_UserSelections_StateObject ) {

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

            //  For processing for all for search

            return this._getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,


                modificationMass_UserSelections_StateObject
            });

        } else if ( reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum ===
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.ALL_FOR_SINGLE_PROTEIN_IN_SEARCH
        ) {

            return this._getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId({
                singleProtein_Filter_SelectionType_Requested,
                proteinSequenceVersionId: reportedPeptideIds_ProteinId_Params_PassedIn.get_proteinSequenceVersionId(),

                modificationMass_UserSelections_StateObject
            });
        } else {

            const msg = "getFor__SelectionType_ANY_NOT__StaticModifications(...):: 'Get for Static Modification mass Selection Type ANY/NOT.'  reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum value NOT supported.  reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum: " +
                reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum;
            console.warn(msg)
            throw Error(msg)
        }

    }

    /**
     * Get for Static Modification mass Selection Type ANY/NOT.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId(
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
            const result = this._getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                singleProtein_Filter_SelectionType_Requested,
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
                const result = this._getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    singleProtein_Filter_SelectionType_Requested,
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
     * Get for Static Modification mass Selection Type ANY/NOT.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            singleProtein_Filter_SelectionType_Requested,
            modificationMass_UserSelections_StateObject,
            staticMods_Holder,
            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

            //  Data from server
            staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        // Build filtered reportedPeptideIds

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
            if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

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

            //  No Static mods that meet filters so return empty selection

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

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if (peptideId === undefined || peptideId === null) {
                    throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
                }
                const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if (peptideSequenceString === undefined || peptideSequenceString === null) {
                    throw Error("peptideSequenceString not found for peptideId. _getFor__SelectionType_ANY_NOT__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                for (const staticMod_residueLetter_I_To_L of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor) {

                    if (peptideSequenceString.includes(staticMod_residueLetter_I_To_L)) {
                        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add(reportedPeptideId);
                        break;
                    } else {
                        if ( staticMod_residueLetter_I_To_L === "L" ) {
                            if ( ! peptideSequenceString.includes("I")) {  //  Letter is "L" so test with "I".  Don't need opposite since staticMod_residueLetter_I_To_L already has "L" if originally was "I"
                                reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add(reportedPeptideId);
                                break;
                            }
                        }
                    }
                }
            }

            this._staticModSearch_CachedResults = {
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
            }
        }

        //  reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod may be empty

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        return resultData;
    }

    /**
     * Get for Static Modification mass Selection Type ANY/NOT.  Have proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId(
        {
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            modificationMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            proteinSequenceVersionId: number
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

        return { result: undefined, promise: this._getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId__MainProcessing({
                singleProtein_Filter_SelectionType_Requested,
                proteinSequenceVersionId,
                modificationMass_UserSelections_StateObject
            })
        }

    }

    /**
     * 'async' function
     *
     * Get for Static Modification mass Selection Type ANY/NOT.  Have proteinSequenceVersionId value  --- main processing
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private async _getFor__SelectionType_ANY_NOT__StaticModifications__Have_proteinSequenceVersionId__MainProcessing(
        {
            singleProtein_Filter_SelectionType_Requested,
            proteinSequenceVersionId,
            modificationMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType
            proteinSequenceVersionId: number
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject

        }): Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> {
        try {

            //  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

            const proteinsPositionsToGetReportedPeptideIdsFor = new Set<number>();

            //  For processing with YES proteinSequenceVersionId


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

                //  No Static mods on this search for this protein so return empty;

                const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });

                return resultData; // EARLY RETURN
            }

            const staticModificationsOnProtein = staticModifications_ResiduesPositions_For_ProteinSequenceVersionId;

            //  Search through Static Masses per position to get positions
            for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

                const position = staticModificationsOnProteinEntry[0];
                const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

                for (const massForPosition of staticModificationsAtPosition.massesSet) {

                    const mass = massForPosition;

                    const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectionEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                        residueLetter: staticModificationsAtPosition.residue,
                        modMass: massForPositionForComparison
                    });
                    if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        proteinsPositionsToGetReportedPeptideIdsFor.add(position);
                    }
                }
            }

            //  proteinsPositionsToGetReportedPeptideIdsFor  may be empty

            //  Utilize _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions =
                await Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected_ReturnPromise({
                    selectedProteinSequencePositions: proteinsPositionsToGetReportedPeptideIdsFor,
                    proteinSequenceVersionId,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions;

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

} //  End of Class



//////////////
//////////////

//   Modification Mass Rounding to provide some level of commonality between searches

/**
 *
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({mass} : {mass : number}) : number {
    return modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
}