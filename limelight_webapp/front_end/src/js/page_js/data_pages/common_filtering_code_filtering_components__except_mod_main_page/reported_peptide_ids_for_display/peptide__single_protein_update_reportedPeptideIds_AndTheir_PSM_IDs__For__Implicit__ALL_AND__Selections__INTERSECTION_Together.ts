/**
 * peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts
 *
 * Implicit All / AND / Intersection
 *
 * These are selections that are not user chooses "AND" but are AND by their nature
 *
 */


import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import {UserSearchString_LocationsOn_ProteinSequence_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL"/"AND" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 */
export class Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Internal class for - Get for User Search String to search Protein or Peptide Sequences
     *
     * Separate class to support caching of results
     *
     */
    private _internal_ComputeFor_UserSearchString_Of_Sequences: Internal_ComputeFor_UserSearchString_Of_Sequences

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

        this._internal_ComputeFor_UserSearchString_Of_Sequences = Internal_ComputeFor_UserSearchString_Of_Sequences.getNewInstance({
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
    ) : Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class {

        return new Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     *
     *
     */
    peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
            proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject,
            proteinPositionFilter_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            proteinSequenceVersionId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
            userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
        }): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

//  Implicit ALL

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        {
            const result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                scan_RetentionTime_MZ_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__peptideUniqueSelected({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                peptideUnique_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._internal_ComputeFor_UserSearchString_Of_Sequences.getFor__UserSearchString({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                proteinSequenceVersionId,
                peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__is_proteinPositionFilter_PeptidePage({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                proteinPositionFilter_UserSelections_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__selectedProteinSequencePositions({
                proteinSequenceVersionId,
                proteinSequenceWidget_StateObject,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
    }

    /**
     * User has selected 'Filter On Scan Filename:'
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject )
            || ( scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) ) {

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

        const scanFilenameIds_Selected = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();
        if ( ! scanFilenameIds_Selected ) {
            const msg = "scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected(); returned nothing. ";
            console.warn(msg);
            throw Error(msg);
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData({
                    scanFilenameIds_Selected, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData({
                            scanFilenameIds_Selected, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter On Scan Filename:'  --  Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter On Scan Filename:'  --  After Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData(
        {
            scanFilenameIds_Selected, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            scanFilenameIds_Selected: Set<number>
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForSearchScanFileId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForSearchScanFileId ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmIds_Include__FilteredFor_SearchScanFileId = new Set<number>();

            for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanFilenameIds_Selected.has( psmTblData_For_PsmId.searchScanFileId ) ) {
                    psmIds_Include__FilteredFor_SearchScanFileId.add( psmId );
                }
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: psmIds_Include__FilteredFor_SearchScanFileId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData; // EARLY RETURN
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'
     *
     */
    private _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            scan_RetentionTime_MZ_UserSelection_StateObject
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scan_RetentionTime_MZ_UserSelection_StateObject )
            || ( ! scan_RetentionTime_MZ_UserSelection_StateObject.is_Any_FilterHaveValue()  ) ) {

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

        const getData_Result = this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
                    spectralStorage_NO_Peaks_Data_Holder: getData_Result.data.spectralStorage_NO_Peaks_Data_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData({
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                            scan_RetentionTime_MZ_UserSelection_StateObject,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
                            spectralStorage_NO_Peaks_Data_Holder: value_getData_Result.spectralStorage_NO_Peaks_Data_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'  GetData
     *
     */
    private _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {  // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {  //  spectralStorage_NO_Peaks_Data_Holder
            const get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data().
                get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch();
            if ( get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result.data ) {
                spectralStorage_NO_Peaks_Data_Holder = get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result.data.spectralStorage_NO_Peaks_Data_Holder
            } else if ( get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        spectralStorage_NO_Peaks_Data_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.spectralStorage_NO_Peaks_Data_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, spectralStorage_NO_Peaks_Data_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
                spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, spectralStorage_NO_Peaks_Data_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'  AfterGetData
     *
     */
    private _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            spectralStorage_NO_Peaks_Data_Holder
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        //  Any of these may return undefined or null
        const scanRetentionTime__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__From__Filter();
        const scanRetentionTime__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__To__Filter();
        const scanMZ__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__From__Filter();
        const scanMZ__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__To__Filter();

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForSearchScanFileId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForSearchScanFileId ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmIds_Include__FilteredFor_SearchScanFileId = new Set<number>();

            for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId); returned nothing. psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ) {
                    const msg = "( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ). psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const spectralStorage_NO_Peaks_Data_For_searchScanFileId = spectralStorage_NO_Peaks_Data_Holder.get_SpectralStorage_NO_Peaks_Data_For_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId);
                if ( ! spectralStorage_NO_Peaks_Data_For_searchScanFileId ) {
                    const msg = "dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId); returned nothing. psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
                let spectralStorage_NO_Peaks_Data_For_ScanNumber = spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_For_PsmId.scanNumber);
                if ( ! spectralStorage_NO_Peaks_Data_For_searchScanFileId ) {
                    const msg = "spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_For_PsmId.scanNumber); returned nothing. psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = spectralStorage_NO_Peaks_Data_For_ScanNumber;

                while ( spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.level !== 2 ) {

                    // have scan level > 2 so get MS 2 scan for filtering

                    const parentScanNumber = spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.parentScanNumber;
                    spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(parentScanNumber);
                    if ( ! spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 ) {
                        const msg = "spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( parentScanNumber); returned nothing. parentScanNumber: " + parentScanNumber + ", psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                let scanMeetsFilters = true;
                {
                    const retentionTime_InMinutes = spectralStorage_NO_Peaks_Data_For_ScanNumber.retentionTime_InSeconds / 60;

                    if ( scanRetentionTime__From__Filter !== undefined && scanRetentionTime__From__Filter !== null ) {
                        if ( retentionTime_InMinutes < scanRetentionTime__From__Filter ) {
                            scanMeetsFilters = false;
                        }
                    }
                    if ( scanMeetsFilters ) {
                        if ( scanRetentionTime__To__Filter !== undefined && scanRetentionTime__To__Filter !== null ) {
                            if ( retentionTime_InMinutes > scanRetentionTime__To__Filter ) {
                                scanMeetsFilters = false;
                            }
                        }
                    }
                }
                {
                    if ( scanMeetsFilters ) {
                        if ( scanMZ__From__Filter !== undefined && scanMZ__From__Filter !== null ) {
                            if ( spectralStorage_NO_Peaks_Data_For_ScanNumber.precursor_M_Over_Z < scanMZ__From__Filter ) {
                                scanMeetsFilters = false;
                            }
                        }
                    }
                    if ( scanMeetsFilters ) {
                        if ( scanMZ__To__Filter !== undefined && scanMZ__To__Filter !== null ) {
                            if ( spectralStorage_NO_Peaks_Data_For_ScanNumber.precursor_M_Over_Z > scanMZ__To__Filter ) {
                                scanMeetsFilters = false;
                            }
                        }
                    }
                }

                if ( scanMeetsFilters ) {
                    psmIds_Include__FilteredFor_SearchScanFileId.add(psmId);
                }
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmIds_Include: psmIds_Include__FilteredFor_SearchScanFileId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData;
    }

    /**
     * User has selected 'Show only Unique Peptides:'
     *
     */
    private _getFor__peptideUniqueSelected(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptideUnique_UserSelection_StateObject
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! peptideUnique_UserSelection_StateObject )
            || ( ! peptideUnique_UserSelection_StateObject.getPeptideUnique() ) ) {

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

        const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

        if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;

            return {  //  EARLY RETURN
                promise: undefined, result: this._getFor__peptideUniqueSelected__AfterGetData({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                })
            }

        } if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {

            return { //  EARLY RETURN
                result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        const result = this._getFor__peptideUniqueSelected__AfterGetData({
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        })
                        resolve(result)

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no data or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * User has selected 'Show only Unique Peptides:' -- AfterGetData
     *
     */
    private _getFor__peptideUniqueSelected__AfterGetData(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {
            const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
            if (!proteinSequenceVersionIds_For_ReportedPeptideId) {
                throw Error("_getFor__peptideUniqueSelected: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
            }
            if (proteinSequenceVersionIds_For_ReportedPeptideId.size === 1) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
     *
     */
    private _getFor__is_proteinPositionFilter_PeptidePage(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinPositionFilter_UserSelections_StateObject
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinPositionFilter_UserSelections_StateObject )
            || ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

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

        if (!proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()) {
            const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges(); returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        //  Get Data and then call ..._AfterGetData function

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  staticMods_Holder
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {
            const result = this._getFor__is_proteinPositionFilter_PeptidePage_AfterGetData({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                proteinPositionFilter_UserSelections_StateObject,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__is_proteinPositionFilter_PeptidePage_AfterGetData({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    proteinPositionFilter_UserSelections_StateObject,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }


    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids  -  After Get Data
     *
     */
    private _getFor__is_proteinPositionFilter_PeptidePage_AfterGetData(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinPositionFilter_UserSelections_StateObject,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
        if (!proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId) {
            const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId);
            if (!proteinCoverage_Entries_For_ReportedPeptideId) {
                throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
            }

            let found_proteinCoverage_Entry_For_ProteinPositionFilter = false;

            for (const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId) {

                const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get(proteinCoverage_Entry.proteinSequenceVersionId);
                if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId) {
                    //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                    continue; // EARLY CONTINUE
                }

                if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) {
                    // Filter selection is Full Protein
                    found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                    break;  // BREAK LOOP
                }

                if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries) {
                    throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries contains nothing")
                }
                if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0) {
                    throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries empty array")
                }

                const proteinPositionFilter_UserSelections_RangeEntries = proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries;
                for (const proteinPositionFilter_UserSelections_RangeEntry of proteinPositionFilter_UserSelections_RangeEntries) {

                    const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                    const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                    //  x1 <= y2 && y1 <= x2
                    if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range
                        found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                        break
                    }
                }
            }

            if (found_proteinCoverage_Entry_For_ProteinPositionFilter) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    /**
     * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
     *
     */
    private _getFor__selectedProteinSequencePositions(
        {
            proteinSequenceVersionId,
            proteinSequenceWidget_StateObject,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            proteinSequenceVersionId: number
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinSequenceWidget_StateObject )
            || ( ! proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) ) {

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

        const selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

        const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS =
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                selectedProteinSequencePositions,
                proteinSequenceVersionId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

        if ( ! dataForPositions_ForEnteredSequence ) {
            const msg = "( ! dataForPositions_ForEnteredSequence )";
            console.warn(msg)
            throw Error(msg)
        }

        return dataForPositions_ForEnteredSequence;
    }

}



////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for User Search String to search Protein or Peptide Sequences
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor_UserSearchString_Of_Sequences {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Cached Results
     */
    private _userSearchString_CachedResults :  {
        searchStrings_Set__ToGetReportedPeptideIdsFor : Set<string>,
        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString : Set<number>
    }

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
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
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): Internal_ComputeFor_UserSearchString_Of_Sequences {

        return new Internal_ComputeFor_UserSearchString_Of_Sequences({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * User has entered Protein Sequence "Filter On Peptide:" to filter on
     *
     */
    getFor__UserSearchString(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId,
            peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            proteinSequenceVersionId: number
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
            userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

            //  For processing with NO _proteinSequenceVersionId

            return this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                peptideSequence_UserSelections_StateObject
            });
        } else {

            return this._getFor__UserSearchString_Have_proteinSequenceVersionId({
                proteinSequenceVersionId,
                userSearchString_LocationsOn_ProteinSequence_Root,
                peptideSequence_UserSelections_StateObject
            });
        }
    }

    /**
     * Get for User Search String to search Protein or Peptide Sequences
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptideSequence_UserSelections_StateObject
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! peptideSequence_UserSelections_StateObject )
            || ( ! peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) ) {

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

        const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

        if (searchStrings === undefined || searchStrings === null || searchStrings.length === 0) {
            // Not searching for anything so exit
            const msg = "peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() returned true but (searchStrings === undefined || searchStrings === null || searchStrings.length === 0)";
            console.warn(msg);
            throw Error(msg);
        }

        //  Get Data and then call ..._AfterGetData function
        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []


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
            const result = this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                peptideSequence_UserSelections_StateObject,
                peptideIds_For_MainFilters_Holder,
                peptideSequences_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    peptideSequence_UserSelections_StateObject,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }

    /**
     * Get for User Search String to search Protein or Peptide Sequences  -  After Get Data
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData(
        {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptideSequence_UserSelections_StateObject,
            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder
        }: {
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject

            //  Data from server
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


        const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

        const searchStrings_Set__ToGetReportedPeptideIdsFor: Set<string> = new Set(searchStrings);

        let reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: Set<number> = undefined;

        {  //  ONLY use cached results IF searchStrings_Set__ToGetReportedPeptideIdsFor matches cached results

            if (this._userSearchString_CachedResults) {

                const searchStrings_Set__ToGetReportedPeptideIdsFor_Cached = this._userSearchString_CachedResults.searchStrings_Set__ToGetReportedPeptideIdsFor;
                //  compare searchStrings_Set__ToGetReportedPeptideIdsFor_Cached to local searchStrings_Set__ToGetReportedPeptideIdsFor

                if (searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.size === searchStrings_Set__ToGetReportedPeptideIdsFor.size) {

                    let currentAndCachedContentsSame = true;
                    for (const searchString of searchStrings_Set__ToGetReportedPeptideIdsFor) {
                        if (!searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.has(searchString)) {
                            currentAndCachedContentsSame = false;
                            break;
                        }
                    }
                    if (currentAndCachedContentsSame) {
                        //  Search data same as cached so re-use cached data
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = this._userSearchString_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString;
                    }
                }
            }
        }

        if (!reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

            const searchStrings_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();
            {
                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                for (const searchString of searchStrings) {

                    if (searchString && (searchString !== "")) {  //  Skip searchString === ""

                        const searchStringUpperCase = searchString.toLocaleUpperCase();
                        const searchString_UpperCase_I_to_L = searchStringUpperCase.replace(findAll_I_Regex, "L");
                        searchStrings_I_To_L__ToGetReportedPeptideIdsFor.add(searchString_UpperCase_I_to_L);
                    }
                }
            }

            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = new Set();

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if (peptideId === undefined || peptideId === null) {
                    throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
                }
                const peptideSequenceString_I_To_L = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_I_To_L__For_PeptideId(peptideId)
                if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                    throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                for (const searchString_I_To_L of searchStrings_I_To_L__ToGetReportedPeptideIdsFor) {

                    if (peptideSequenceString_I_To_L.includes(searchString_I_To_L)) {
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.add(reportedPeptideId);
                        break;
                    }
                }
            }

            this._userSearchString_CachedResults = {
                searchStrings_Set__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString
            }
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        return resultData;
    }

    /**
     * User has entered Protein Sequence "Filter On Peptide:" to filter on
     *
     */
    private _getFor__UserSearchString_Have_proteinSequenceVersionId(
        {
            proteinSequenceVersionId,
            userSearchString_LocationsOn_ProteinSequence_Root,
            peptideSequence_UserSelections_StateObject,
        }: {
            proteinSequenceVersionId: number
            userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! peptideSequence_UserSelections_StateObject )
            || ( ! peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) ) {

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

        const proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings
        const proteinPositions_CoveredBy_SearchStrings_length = proteinPositions_CoveredBy_SearchStrings.length

        const selectedProteinSequencePositions = new Set<number>()

        for (let position = 1; position < proteinPositions_CoveredBy_SearchStrings_length; position++) {
            if (proteinPositions_CoveredBy_SearchStrings[position]) {
                selectedProteinSequencePositions.add(position)
            }
        }

        const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = (
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                selectedProteinSequencePositions,
                proteinSequenceVersionId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })
        )

        return dataForPositions_ForEnteredSequence;
    }


}