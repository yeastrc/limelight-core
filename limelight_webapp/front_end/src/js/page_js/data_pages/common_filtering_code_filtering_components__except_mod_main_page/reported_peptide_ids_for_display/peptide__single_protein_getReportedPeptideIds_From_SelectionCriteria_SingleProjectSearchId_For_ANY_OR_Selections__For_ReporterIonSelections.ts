/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections__For_ReporterIonSelections.ts
 *
 * Any / OR / Union
 *
 * !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk
 *
 * ONLY for Reporter Ions Selections
 *
 */

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {reporterIonMass_CommonRounding_ReturnNumber} from "page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding";
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
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//     Filter using "ANY"/"OR" (UI has "OR") Selections building up a UNION of the selected entries

//          !!!  Also used to create a Union of all NOT which is then excluded from the selection in bulk

/**
 *
 */
export class Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

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
    ) : Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections {

        return new Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections({
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
    peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ReporterIonSelections(
        {
            singleProtein_Filter_SelectionType_Requested,   //  ANY/OR or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn,
            reporterIonMass_UserSelections_StateObject
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        //   Reporter Ion type ANY/NOT selection
        const result =
            this._computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                reporterIonMass_UserSelections_StateObject
            });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );

        return result;
    }

    /**
     * User has selected Reporter Ion Masses to filter on
     *
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected(
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

        if ( promises.length === 0 ) {

            const result = this._computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected_AfterLoadData({
                singleProtein_Filter_SelectionType_Requested,
                reportedPeptideIds_ProteinId_Params_PassedIn,
                reporterIonMass_UserSelections_StateObject,
                reporterIons_On_PSM_For_MainFilters_Holder
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
                        const result = this._computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected_AfterLoadData({
                            singleProtein_Filter_SelectionType_Requested,
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            reporterIonMass_UserSelections_StateObject,
                            reporterIons_On_PSM_For_MainFilters_Holder
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
     * User has selected Reporter Ion Masses  to filter on
     *
     */
    private _computeFor__SelectionType_ANY_NOT___For__ReporterIonMassesSelected_AfterLoadData(
        {
            singleProtein_Filter_SelectionType_Requested,
            reportedPeptideIds_ProteinId_Params_PassedIn,
            reporterIonMass_UserSelections_StateObject,
            reporterIons_On_PSM_For_MainFilters_Holder
        }: {
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType   //  ANY or NOT
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
            reporterIons_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        if (!reporterIons_On_PSM_For_MainFilters_Holder.is_Has_ReporterIonMasses_OnReportedPeptide_Entries()) {

            //  NO Reporter Ion Masses so No Values are Selected for this search so exit

            //  Create Empty Result
            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

            return resultData;  // EARLY RETURN
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            //  commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId does contain psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs for this Project Search Id

            const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = reporterIons_On_PSM_For_MainFilters_Holder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap_Object) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id

                continue // EARLY CONTINUE
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> =
                psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

            if (!psmReporterIonMassesPerPSM_ForPsmIdMap) {
                const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
                console.warn(msg);
                throw Error(msg);
            }

            const psmIds_For_SelectedReporterIonMasses = new Set<number>();

            for (const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries()) {
                const reporterIonMasses_Object = entry[1]; // Map entry value
                const psmId = reporterIonMasses_Object.psmId;
                const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
                for (const reporterIonMass of reporterIonMasses_Set) {

                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber(reporterIonMass);  // Call external function

                    const selectionEntry = reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry(reporterIonMass_Rounded)
                    if (selectionEntry && selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {

                        psmIds_For_SelectedReporterIonMasses.add(psmId);
                        break;
                    }
                }
            }

            if (psmIds_For_SelectedReporterIonMasses.size === 0) {
                //  NO PSMs for Reported Peptide Id contains the Selected Reporter Ion Masses

                continue // EARLY CONTINUE
            }

            const resultEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId,
                psmIds_Include: psmIds_For_SelectedReporterIonMasses
            })

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(resultEntry);
        }

        return resultData;
    }
}
