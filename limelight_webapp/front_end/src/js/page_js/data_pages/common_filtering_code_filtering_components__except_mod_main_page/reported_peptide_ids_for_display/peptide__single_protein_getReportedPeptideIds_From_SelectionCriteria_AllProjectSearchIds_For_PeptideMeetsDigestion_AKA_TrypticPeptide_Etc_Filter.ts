/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter.ts
 */

import {DataPage_common_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

/**
 *
 */
export class Peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter {


    private _projectSearchIds : Array<number>;
    private _dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    private _getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class>

    private constructor(
        {
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>;
            dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._dataPage_common_Searches_Flags = dataPage_common_Searches_Flags;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        const create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result =
            this._create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        this._getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId =
            create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result.getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId;
    }

    /**
     * !!!  Used in constructor  !!!
     *
     * @param projectSearchIds
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     * @private
     */
    private _create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) :
        {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class>
        } {

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class> = new Map();

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class.getNewInstance({
                    projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.set(projectSearchId, peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId )
        }

        return {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId
        }
    }

    /**
     *
     * @param projectSearchIds
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     */
    static getNewInstance(
        {
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>;
            dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        return new Peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter({
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });
    }

    /**
     *
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     */
    peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter(
        {
            proteinSequenceVersionId, peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject, data_MainMethod_ReturnContents_FilteredToThisPoint
        } : {
            proteinSequenceVersionId: number // Only populated when Single Protein
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
        }
    ) : {
        data: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
        promise: Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>
    } {

        if ((!peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject)
            || (peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.is_NoneSelection())) {

            //  NO Filtering
            return {
                promise: undefined, data: data_MainMethod_ReturnContents_FilteredToThisPoint
            }; // EARLY RETURN
        }


        if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
            === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES
            || peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
            === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) {

            return this._filterFor_TrypticPeptide_OR_NonTrypticPeptide({
                proteinSequenceVersionId, peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject, data_MainMethod_ReturnContents_FilteredToThisPoint
            })   // EARLY RETURN
        }

        throw Error("peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: NOT ANY OF: None Selected, SelectionEnum === TRYPTIC_PEPTIDES, SelectionEnum === NON_TRYPTIC_PEPTIDES")
    }

    /**
     * User has selected 'Digestion filter:' Tryptic or Non-Tryptic
     *
     * @param proteinSequenceVersionId
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     * @private
     */
    private _filterFor_TrypticPeptide_OR_NonTrypticPeptide(
        {
            proteinSequenceVersionId, peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject, data_MainMethod_ReturnContents_FilteredToThisPoint
        } : {
            proteinSequenceVersionId: number // Only populated when Single Protein
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
        }
    ) : {
        data: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
        promise: Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>
    } {
        //  Get Data and then call ..._AfterGetData function

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()
        let peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map()
        let peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder> = new Map()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of this._projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            {  //  proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

                if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder );
                } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
                }
            }

            {  //  peptideIds_For_MainFilters_Holder
                const get_PeptideIdsHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

                if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                    peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder );
                } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, value.peptideIds_For_MainFilters_Holder );
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
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                    get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

                if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
                    peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder );
                } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, value.peptideSequences_For_MainFilters_Holder );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result  no 'data' or 'promise'")
                }
            }
        }

        if ( promises.length === 0 ) {
            const data = this._filterFor_TrypticPeptide_OR_NonTrypticPeptide__AfterGetData({
                proteinSequenceVersionId,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                data_MainMethod_ReturnContents_FilteredToThisPoint,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
            });

            return { data, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {

                const result = this._filterFor_TrypticPeptide_OR_NonTrypticPeptide__AfterGetData({
                    proteinSequenceVersionId,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                    data_MainMethod_ReturnContents_FilteredToThisPoint,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                    peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                    peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
                });

                resolve(result);

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, data: undefined }
    }

    /**
     * User has selected 'Digestion filter:' Tryptic or Non-Tryptic  -- AfterGetData
     *
     */
    private _filterFor_TrypticPeptide_OR_NonTrypticPeptide__AfterGetData(
        {
            proteinSequenceVersionId,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            proteinSequenceVersionId: number // Only populated when Single Protein
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }): GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {


        if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
            === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES ) {

            return this._filterFor_TrypticPeptide__AfterGetData({
                proteinSequenceVersionId,
                data_MainMethod_ReturnContents_FilteredToThisPoint,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
            })   // EARLY RETURN
        }

        if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
            === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) {

            return this._filterFor_Non_TrypticPeptide__AfterGetData({
                proteinSequenceVersionId,
                data_MainMethod_ReturnContents_FilteredToThisPoint,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
            })   // EARLY RETURN
        }

        throw Error("peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: NOT ANY OF: None Selected, SelectionEnum === TRYPTIC_PEPTIDES, SelectionEnum === NON_TRYPTIC_PEPTIDES")

    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /////   Filter Peptide 'IS' Tryptic

    /**
     * User has selected 'Digestion filter:' Tryptic  -- AfterGetData
     *
     * Peptide is tryptic if it is tryptic in any location in any protein in any search.
     *
     */
    private _filterFor_TrypticPeptide__AfterGetData(
        {
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }): GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {

        const peptideIds_PeptideTryptic_AnySearch = this._get_PeptideIds_PeptideTryptic_AnySearch({
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })

        return this._filterFor_TrypticPeptide__DoFiltering__AfterGetData({
            peptideIds_PeptideTryptic_AnySearch,
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })
    }

    /**
     * Peptide is tryptic if it is tryptic in any location in any protein in any search.
     *
     *
     * @param proteinSequenceVersionId
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     * @param proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @private
     */
    private _get_PeptideIds_PeptideTryptic_AnySearch(
        {
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }) : Set<number> {

        const result_peptideIds_PeptideTryptic_AnySearch = new Set<number>()

        let proteinSequenceVersionId_Param: number = undefined

        if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

            proteinSequenceVersionId_Param = proteinSequenceVersionId_Param
        }

        for ( const projectSearchId of this._projectSearchIds ) {

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned nothing projectSearchId: " + projectSearchId)
            }

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideIds_For_MainFilters_Holder  = peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideSequences_For_MainFilters_Holder  = peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            for ( const reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId of  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

                const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId.reportedPeptideId

                const proteinCoverage_For_ReportedPeptideId  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId)
                if (!proteinCoverage_For_ReportedPeptideId) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
                }

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId)
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ); returned undefined or null: reportedPeptideId: " + reportedPeptideId)
                }

                if ( result_peptideIds_PeptideTryptic_AnySearch.has( peptideId ) ) {

                    //  Already found so skip

                    continue; // EARLY CONTINUE
                }

                const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if ( peptideSequence === undefined || peptideSequence === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId ); returned undefined or null: peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                const peptideSequence_FirstLetter = peptideSequence.substring(0, 1)
                const peptideSequence_EndLetter = peptideSequence.substring( peptideSequence.length - 1, peptideSequence.length)

                for ( const proteinCoverage_For_ReportedPeptideId_Entry of proteinCoverage_For_ReportedPeptideId ) {

                    if ( proteinSequenceVersionId_Param !== undefined && proteinSequenceVersionId_Param !== proteinCoverage_For_ReportedPeptideId_Entry.proteinSequenceVersionId ) {
                        //  Processing for Single Protein and this record NOT for that Protein so SKIP
                        continue;  // EARLY CONTINUE
                    }

                    //  Compute if peptide is Tryptic

                    const peptide_Is_Tryptic = this._compute_Single_Is_Peptide_Tryptic({
                        peptideSequence_FirstLetter, peptideSequence_EndLetter, proteinCoverage_For_ReportedPeptideId_Entry
                    });

                    if ( peptide_Is_Tryptic ) {

                        result_peptideIds_PeptideTryptic_AnySearch.add( peptideId )
                    }
                }
            }

        }

        return result_peptideIds_PeptideTryptic_AnySearch;
    }


    /**
     * Actually do the filtering
     *
     * @param proteinSequenceVersionId
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     * @param proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @private
     */
    private _filterFor_TrypticPeptide__DoFiltering__AfterGetData(
        {
            peptideIds_PeptideTryptic_AnySearch,
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            peptideIds_PeptideTryptic_AnySearch: Set<number>  // Computed in another method in this class

            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }) : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {

        const result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds(null)

        for ( const projectSearchId of this._projectSearchIds ) {

            const result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({ projectSearchId, entriesMap_KeyReportedPeptideId: null })

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned nothing projectSearchId: " + projectSearchId)
            }

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideIds_For_MainFilters_Holder  = peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            for ( const reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId of  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

                const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId.reportedPeptideId

                const proteinCoverage_For_ReportedPeptideId  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId)
                if (!proteinCoverage_For_ReportedPeptideId) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
                }

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId)
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ); returned undefined or null: reportedPeptideId: " + reportedPeptideId)
                }

                if ( peptideIds_PeptideTryptic_AnySearch.has( peptideId ) ) {

                    result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry( reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId );
                }
            }

            result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.insert_Entry({ projectSearchId, entry: result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId })
        }

        return {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        }
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////


    /////   Filter Peptide 'IS NOT' Tryptic

    /**
     * User has selected 'Digestion filter:' Tryptic  -- AfterGetData
     *
     * Within a Single Search, a peptide (peptide sequence) is non-tryptic if ALL protein locations are non-tryptic.
     *
     * Between Searches, a peptide (peptide sequence) is non-tryptic if it is non-tryptic in ANY of the searches.
     *
     */
    private _filterFor_Non_TrypticPeptide__AfterGetData(
        {
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }): GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {

        const peptideIds_Peptide_NON_Tryptic_AnySearch = this._get_PeptideIds_Peptide_Non_Tryptic_AnySearch({
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })

        return this._filterFor_Non_TrypticPeptide__DoFiltering__AfterGetData({
            peptideIds_Peptide_NON_Tryptic_AnySearch,
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })
    }

    /**
     *
     *
     * Within a Single Search, a peptide (peptide sequence) is non-tryptic if ALL protein locations are non-tryptic.
     *
     * Between Searches, a peptide (peptide sequence) is non-tryptic if it is non-tryptic in ANY of the searches.
     *
     *
     * @param proteinSequenceVersionId
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     * @param proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @private
     */
    private _get_PeptideIds_Peptide_Non_Tryptic_AnySearch(
        {
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }) : Set<number> {

        const result_peptideIds_Peptide_Non_Tryptic_AnySearch = new Set<number>()

        let proteinSequenceVersionId_Param: number = undefined

        if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

            proteinSequenceVersionId_Param = proteinSequenceVersionId_Param
        }

        for ( const projectSearchId of this._projectSearchIds ) {

            const result_peptideIds_All_In_SingleSearch = new Set<number>()
            const result_peptideIds_PeptideTryptic_In_SingleSearch = new Set<number>()

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned nothing projectSearchId: " + projectSearchId)
            }

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideIds_For_MainFilters_Holder  = peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideSequences_For_MainFilters_Holder  = peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            for ( const reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId of  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

                const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId.reportedPeptideId

                const proteinCoverage_For_ReportedPeptideId  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId)
                if (!proteinCoverage_For_ReportedPeptideId) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
                }

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId)
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ); returned undefined or null: reportedPeptideId: " + reportedPeptideId)
                }

                if ( result_peptideIds_PeptideTryptic_In_SingleSearch.has( peptideId ) ) {

                    //  Already found so skip

                    continue; // EARLY CONTINUE
                }

                result_peptideIds_All_In_SingleSearch.add( peptideId )

                const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if ( peptideSequence === undefined || peptideSequence === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId ); returned undefined or null: peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                const peptideSequence_FirstLetter = peptideSequence.substring(0, 1)
                const peptideSequence_EndLetter = peptideSequence.substring( peptideSequence.length - 1, peptideSequence.length)

                for ( const proteinCoverage_For_ReportedPeptideId_Entry of proteinCoverage_For_ReportedPeptideId ) {

                    if ( proteinSequenceVersionId_Param !== undefined && proteinSequenceVersionId_Param !== proteinCoverage_For_ReportedPeptideId_Entry.proteinSequenceVersionId ) {
                        //  Processing for Single Protein and this record NOT for that Protein so SKIP
                        continue;  // EARLY CONTINUE
                    }

                    //  Compute if peptide is Tryptic
                    const peptide_Is_Tryptic = this._compute_Single_Is_Peptide_Tryptic({
                        peptideSequence_FirstLetter, peptideSequence_EndLetter, proteinCoverage_For_ReportedPeptideId_Entry
                    });

                    if ( peptide_Is_Tryptic ) {

                        result_peptideIds_PeptideTryptic_In_SingleSearch.add( peptideId )
                    }
                }
            }

            //   Copy Non-Tryptic in Search to final Result Set
            for ( const peptideId of result_peptideIds_All_In_SingleSearch ) {
                if ( ! result_peptideIds_PeptideTryptic_In_SingleSearch.has( peptideId ) ) {

                    //  peptideId that is Non-Tryptic is not Tryptic anywhere in the search

                    //  peptideId that is Non-Tryptic in any search is Non-Tryptic in any of the searches.

                    result_peptideIds_Peptide_Non_Tryptic_AnySearch.add( peptideId )
                }
            }
        }

        return result_peptideIds_Peptide_Non_Tryptic_AnySearch;
    }

    /**
     * Actually do the filtering
     *
     * @param proteinSequenceVersionId
     * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
     * @param data_MainMethod_ReturnContents_FilteredToThisPoint
     * @param proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @param peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
     * @private
     */
    private _filterFor_Non_TrypticPeptide__DoFiltering__AfterGetData(
        {
            peptideIds_Peptide_NON_Tryptic_AnySearch,
            proteinSequenceVersionId,
            data_MainMethod_ReturnContents_FilteredToThisPoint,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId,
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId
        }: {
            peptideIds_Peptide_NON_Tryptic_AnySearch: Set<number>  // Computed in another method in this class

            proteinSequenceVersionId: number // Only populated when Single Protein
            data_MainMethod_ReturnContents_FilteredToThisPoint: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
            peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>
            peptideSequences_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder>

        }) : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {

        const result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds(null)

        for ( const projectSearchId of this._projectSearchIds ) {

            const result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({ projectSearchId, entriesMap_KeyReportedPeptideId: null })

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: data_MainMethod_ReturnContents_FilteredToThisPoint.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned nothing projectSearchId: " + projectSearchId)
            }

            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            const peptideIds_For_MainFilters_Holder  = peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId)
            if (!peptideIds_For_MainFilters_Holder) {
                throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned nothing projectSearchId: " + projectSearchId)
            }

            for ( const reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId of  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

                const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId.reportedPeptideId

                const proteinCoverage_For_ReportedPeptideId  = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId)
                if (!proteinCoverage_For_ReportedPeptideId) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
                }

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId)
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error("_getFor__peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection__AfterGetData: peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ); returned undefined or null: reportedPeptideId: " + reportedPeptideId)
                }

                if ( peptideIds_Peptide_NON_Tryptic_AnySearch.has( peptideId ) ) {

                    result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry( reportedPeptideIds_AndTheir_PSM_IDs__Single_ReportedPeptideId );
                }
            }

            result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.insert_Entry({ projectSearchId, entry: result__peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId })
        }

        return {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: result__reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        }
    }

    ///////////////////////

    /**
     *
     * @param peptideSequence_FirstLetter
     * @param peptideSequence_EndLetter
     * @param proteinCoverage_For_ReportedPeptideId_Entry
     * @private
     */
    private _compute_Single_Is_Peptide_Tryptic(
        {
            peptideSequence_FirstLetter, peptideSequence_EndLetter, proteinCoverage_For_ReportedPeptideId_Entry
        } : {
            peptideSequence_FirstLetter: string
            peptideSequence_EndLetter: string
            proteinCoverage_For_ReportedPeptideId_Entry: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry

        }) : boolean {


        //  Compute if peptide is Tryptic

        // let peptide_Is_Tryptic = false;

        if (
            (
                //  n-terminal (pre) rules:
                //  Peptide at N Terminus of Protein
                ( proteinCoverage_For_ReportedPeptideId_Entry.peptideAtProteinStart_Flag )
                || ( //  peptide pre is ‘K' or 'R’ AND first residue is NOT P
                    ( proteinCoverage_For_ReportedPeptideId_Entry.protein_PreResidue === "K" || proteinCoverage_For_ReportedPeptideId_Entry.protein_PreResidue === "R" )
                    && ( peptideSequence_FirstLetter !== "P" )
                )
            )
            && (
                // c-terminal (post) rules:
                //  Peptide at C Terminus of Protein
                ( proteinCoverage_For_ReportedPeptideId_Entry.peptideAtProteinEnd_Flag )
                || ( // peptide ends with ‘K’ or 'R’ and peptide post is NOT P
                    ( peptideSequence_EndLetter === "K" || peptideSequence_EndLetter === "R" )
                    && ( proteinCoverage_For_ReportedPeptideId_Entry.protein_PostResidue !== "P" )
                )
            )
        ) {
            //  Peptide IS Tryptic

            return true;

        }

        //  Peptide is NOT Tryptic

        return false;
    }
}
