/**
 * commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters.ts
 *
 * For Common Across Searches  -  PeptideSequences
 *
 * Data loaded from server and code to load data from server
 *
 *      Data is loaded either All for Search(es) or for Single ProteinSequenceVersionId for Search(es)
 *
 *    FYI: Data loaded using Reported Peptide Ids passed to webservice for easier access control check
 *
 *
 * (Data loaded based on PSM/Reported Peptide/Protein(eventually) filters)
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";


//  Internal Classes are at the bottom of the file

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder  {

    private _peptideSequence_Map_Key_PeptideId: Map<number,string> = new Map()

    private _peptideSequenceString_I_To_L_KeyPeptideId: Map<number, string> = new Map()

    constructor() {}

    /**
     *
     * @param peptideId
     */
    get_PeptideSequence_For_PeptideId( peptideId: number ) {
        return this._peptideSequence_Map_Key_PeptideId.get(peptideId);
    }

    /**
     *
     * @param peptideId
     * @returns - String where all "I" have been converted to "L"
     */
    get_PeptideSequence_I_To_L__For_PeptideId( peptideId: number ) {
        {
            const existing_peptideSequenceString_I_To_L = this._peptideSequenceString_I_To_L_KeyPeptideId.get( peptideId );
            if ( existing_peptideSequenceString_I_To_L ) {
                return existing_peptideSequenceString_I_To_L; // EARLY RETURN
            }
        }
        const peptideSequenceString = this._peptideSequence_Map_Key_PeptideId.get( peptideId );
        if ( ! peptideSequenceString ) {
            return undefined;
        }

        const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

        //  The Peptide Search Strings will be used to search the protein sequence.
        //  Reported Peptides will be selected where their Protein Coverage records fully contain
        //     the locations of the search strings on the protein sequence.

        //  The amino acid letters I and L will be equivalent.

        const peptideSequenceString_I_To_L = peptideSequenceString.replace(findAll_I_Regex,'L');
        this._peptideSequenceString_I_To_L_KeyPeptideId.set( peptideId, peptideSequenceString_I_To_L );
        return peptideSequenceString_I_To_L;

        return this._peptideSequence_Map_Key_PeptideId.get(peptideId);
    }

    /**
     * INTERNAL Use only to code in the TS file this class is in
     * @param peptideId
     * @param peptideSequence
     */
    INTERNAL__Insert_PeptideId_PeptideSequence(
        {
            peptideId, peptideSequence
        } : {
            peptideId: number
            peptideSequence: string
        }
    ) {
        this._peptideSequence_Map_Key_PeptideId.set(peptideId, peptideSequence )
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult {

    peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
}

/**
 *  !!!!!!!!   Main Class  !!!!!!!!!!!!
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>

    //  'Parent' Class Object
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches

    //

    /**
     *   Loaded Data Result - Added to
     */
    private _peptideSequences_For_MainFilters_Holder = new CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder();

    /**
     * When load for All Reported Peptide Ids for main filters.
     */
    private _flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters: boolean = false;

    private _peptideIds_LoadingInProgress: Set<number> = new Set()      // Loading data in progress for these peptideIds

    private _loadingInProgress_Promises: Array<Promise<void>> = []              // Promises for loading in progress

    /////////////

    //    Data Loaded by other code

    /**
     * ReportedPeptideId To PeptideId mapping - Needed since retrieve Peptide Sequence String using Project Search Id and ReportedPeptideIds to facilitate Access Control check
     */
    private _reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>

    private _promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Promise<void>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        return new CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters({
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for all searches for All Reported Peptide Ids for main filters
     */
    get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise(): Promise<CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult> {
        try {
            const result = this.get_PeptideSequencesHolder_AllForAllSearches();

            if (result.data) {
                return Promise.resolve(result.data);
            }
            return result.promise;

        } catch( e ) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Get PeptideSequencesHolder for all searches for All Reported Peptide Ids for main filters
     */
    get_PeptideSequencesHolder_AllForAllSearches():
        {
            data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult>
        } {

        return this._get_PeptideSequencesHolder_Internal({reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: undefined})
    }

    /**
     *
     * @param reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
     */
    get_PeptideSequencesHolder_For_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        }
    ):
        {
            data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult>
        } {

        return this._get_PeptideSequencesHolder_Internal({ reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds })
    }

    /**
     * Get PeptideSequencesHolder for:
     *   1: all searches for All Reported Peptide Ids for main filters
     *   2: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
     */
    private _get_PeptideSequencesHolder_Internal(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds // Optional
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        }
    ):
        {
            data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult>
        } {

        if (this._flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters) {

            //  Have loaded data For 'All' (for main filters) just return it

            const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
            }
            return { data, promise: undefined };
        }

        if ( reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
            && this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId ) {

            let allEntriesLoaded = true;

            for ( const projectSearchId of reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_ProjectSearchIds() ) {

                const reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder = this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder ) {
                    const msg = "this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }
                const reportedPeptideIds_AndTheir_PSM_IDs = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId);
                for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs.get_reportedPeptideIds() ) {

                    const peptideId = reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder ) {
                        const msg = "reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId); returned Nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }
                    if ( ! this._peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) ) {
                        allEntriesLoaded = false;
                        break;
                    }
                }
                if ( ! allEntriesLoaded ) {
                    break;
                }
            }
            if ( allEntriesLoaded ) {

                //  Have loaded data For requested data so just return it

                const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                    peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
                }
                return { data, promise: undefined };
            }
        }

        // Create and return new Promise that encompasses all to do

        const promise_TopLevel = new Promise<CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult>(
            (resolve_TopLevel, reject_TopLevel) => { try {

                const promise__getData_and_Populate__reportedPeptideId_To_PeptideId_mapping = this._getData_and_Populate__reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId();

                if ( ! promise__getData_and_Populate__reportedPeptideId_To_PeptideId_mapping ) {
                    //  No Peptide Ids For Reported Peptide Ids need to be loaded - Populated: this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId

                    //   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
                    const peptideIdsToLoadSequencesForMap_Key_PeptideId__Object = this._create_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object({ reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds });

                    const promise = this._get_And_Process__PeptideSequences__For_Param_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object({ peptideIdsToLoadSequencesForMap_Key_PeptideId__Object });
                    if ( ! promise ) {

                        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
                            this._flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters = true;
                        }

                        const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                            peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
                        }
                        resolve_TopLevel(data); // resolve

                    } else {
                        promise.catch(reason => { reject_TopLevel(reason)})
                        promise.then(noValue => { try {

                            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
                                this._flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters = true;
                            }

                            const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                                peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
                            }
                            resolve_TopLevel(data); // resolve

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    }
                } else {
                    promise__getData_and_Populate__reportedPeptideId_To_PeptideId_mapping.catch(reason => {reject_TopLevel(reason)})
                    promise__getData_and_Populate__reportedPeptideId_To_PeptideId_mapping.then( noValue_get_reportedPeptideSequences_Result_Value => { try {

                        //   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
                        const peptideIdsToLoadSequencesForMap_Key_PeptideId__Object = this._create_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object({ reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds });

                        const promise = this._get_And_Process__PeptideSequences__For_Param_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object({ peptideIdsToLoadSequencesForMap_Key_PeptideId__Object });
                        if ( ! promise ) {

                            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
                                this._flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters = true;
                            }

                            const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                                peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
                            }
                            resolve_TopLevel(data); // resolve

                        } else {
                            promise.catch(reason => { reject_TopLevel(reason)})
                            promise.then(noValue => { try {

                                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
                                    this._flag__LoadedData_For_All_ProjectSearchIds_For_All_ReportedPeptideIds_For_Main_Filters = true;
                                }

                                const data: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters__get_PeptideSequencesHolder__FunctionResult = {
                                    peptideSequences_For_MainFilters_Holder: this._peptideSequences_For_MainFilters_Holder
                                }
                                resolve_TopLevel(data); // resolve

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: promise_TopLevel
        }
    }

    /**
     * Load Data for this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId - instances of CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
     *
     * @returns - null if nothing to load
     *
     */
    private _getData_and_Populate__reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId() : Promise<unknown> {

        if ( this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId ) {
            //  Data already loaded and stored so skip
            return null; // EARLY RETURN
        }

        if ( this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId ) {
            return this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId;
        }

        const commonData_LoadedFromServer__Root =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches.get_ParentObject();

        const promises: Array<Promise<void>> = []

        const local_reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map()

        for (const projectSearchId of this._projectSearchIds) {

            const commonData_LoadedFromServer_ForSingleSearch = commonData_LoadedFromServer__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)

            const get_PeptideIdsHolder_AllForSearch_Result =
                commonData_LoadedFromServer_ForSingleSearch.
                get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().
                get_PeptideIdsHolder_AllForSearch()

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {

                // Store reportedPeptideId_To_PeptideId_mapping: peptideIds_For_MainFilters_Holder in Internal Map
                local_reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.set(
                    projectSearchId, get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder );

            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value_get_PeptideIdsHolder_AllForSearch_Result => { try {

                        // Store reportedPeptideId_To_PeptideId_mapping: peptideIds_For_MainFilters_Holder in Internal Map
                        local_reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.set(
                            projectSearchId, value_get_PeptideIdsHolder_AllForSearch_Result.peptideIds_For_MainFilters_Holder );

                        resolve() //  resolve

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  All data processed without waiting for any Promise so return null

            //  Save 'fully populated' Map to instance variable
            this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId = local_reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId;

            return null;   //  EARLY RETURN
        }

        //  Create 'top level' promise and return it

        const promises_All = Promise.all(promises);

        this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId =
            new Promise<void>((resolve_TopLevel, reject_TopLevel) => { try {

                promises_All.catch(reason => {
                    this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId = undefined;
                    reject_TopLevel(reason);
                })
                promises_All.then(noValue => { try {
                    this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId = undefined;

                    //  Save 'fully populated' Map to instance variable
                    this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId = local_reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId;

                    resolve_TopLevel();

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return this._promise__LoadingData_For_All_ProjectSearchIds___ReportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId;
    }

    ///////

    //   Have Reported Peptide Id to Peptide Id mapping so get Peptide Sequences

    /**
     * process peptideIdsToLoadSequencesForMap_Key_PeptideId__Object
     *
     * @param peptideIdsToLoadSequencesForMap_Key_PeptideId__Object
     *
     * @returns null if no waiting, otherwise Promise
     */
    private _get_And_Process__PeptideSequences__For_Param_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object(
        {
            peptideIdsToLoadSequencesForMap_Key_PeptideId__Object
        } : {
            peptideIdsToLoadSequencesForMap_Key_PeptideId__Object : Internal__peptideIdsToLoadSequencesForMap_Key_PeptideId
        }
    ) : Promise<unknown> {

        //  Remove since also need to wait for Promises in this._loadingInProgress_Promises
        // if ( peptideIdsToLoadSequencesForMap_Key_PeptideId__Object.peptideIdsToLoadSequencesForMap_Key_PeptideId.size === 0 ) {
        //     //  No peptide sequence to load so return null
        //     return null; // EARLY EXIT
        // }

        //  Re-order by projectSearchId

        //   Map<projectSearchId,[{ reportedPeptideId, projectSearchId, peptideId }]>
        const peptideIdsToLoadSequencesForMap_Key_ProjectSearchId: Map<number, { projectSearchId: number, entries: Array<{ reportedPeptideId: number, peptideId: number }>}> = new Map();

        for ( const mapEntryValue of peptideIdsToLoadSequencesForMap_Key_PeptideId__Object.peptideIdsToLoadSequencesForMap_Key_PeptideId.values() ) {

            const projectSearchId = mapEntryValue.projectSearchId;

            let newMapEntryForProjectSearchId = peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.get( projectSearchId );
            if ( ! newMapEntryForProjectSearchId ) {
                newMapEntryForProjectSearchId = { projectSearchId, entries: [] };
                peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.set( projectSearchId, newMapEntryForProjectSearchId );
            }
            newMapEntryForProjectSearchId.entries.push( { reportedPeptideId: mapEntryValue.reportedPeptideId , peptideId: mapEntryValue.peptideId } );
        }

        //  Retrieve peptide strings on a per projectSearchId basis

        const promiseArray_GetPeptideSequences = Array.from( this._loadingInProgress_Promises );  //  Start with existing promises in progress

        for ( const entriesFor_projectSearchId of peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.values() ) {

            const projectSearchId = entriesFor_projectSearchId.projectSearchId;

            //  Create array of reportedPeptideIds to get Peptide Sequences for
            const reportedPeptideIds: Array<number> = [];
            for ( const entry of entriesFor_projectSearchId.entries ) {
                reportedPeptideIds.push( entry.reportedPeptideId );
            }

            const promise_per_projectSearchIdProcessing = this._get_PeptideSequences_Data_For_Single_ProjectSearchId_and_Associated_ReportedPeptideIds( { projectSearchId, reportedPeptideIds } );
            promiseArray_GetPeptideSequences.push( promise_per_projectSearchIdProcessing );
        }

        return Promise.all( promiseArray_GetPeptideSequences );
    }

    /**
     *   1: all searches for All Reported Peptide Ids for main filters
     *   2: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
     */
    private _create_peptideIdsToLoadSequencesForMap_Key_PeptideId__Object(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds  // Optional
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        }
    ) : Internal__peptideIdsToLoadSequencesForMap_Key_PeptideId {

        const peptideIdsToLoadSequencesForMap_Key_PeptideId__Object = new Internal__peptideIdsToLoadSequencesForMap_Key_PeptideId()

        const peptideIdsToLoadSequencesForMap_Key_PeptideId = peptideIdsToLoadSequencesForMap_Key_PeptideId__Object.peptideIdsToLoadSequencesForMap_Key_PeptideId;

        for (const projectSearchId of this._projectSearchIds) {

            const reportedPeptideId_To_PeptideId_mapping_SingleSearch__peptideIds_For_MainFilters_Holder =
                this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId);

            if ( ! reportedPeptideId_To_PeptideId_mapping_SingleSearch__peptideIds_For_MainFilters_Holder ) {
                const msg = "this._reportedPeptideId_To_PeptideId_mapping__peptideIds_For_MainFilters_Holder__Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            if ( reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {

                //  Have specific reportedPeptideIds per projectSearchId to get Peptide Ids for

                const reportedPeptideIds_AndTheir_PSM_IDs = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId)
                if ( ! reportedPeptideIds_AndTheir_PSM_IDs ) {
                    continue; // EARLY CONTINUE
                }

                for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs.get_reportedPeptideIds() ) {

                    const peptideId = reportedPeptideId_To_PeptideId_mapping_SingleSearch__peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );

                    if ( ! this._peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) ) {
                        //  peptideId Not already loaded

                        if ( ! this._peptideIds_LoadingInProgress.has(peptideId) ) {

                            //  Not peptideId retrieval already in progress

                            if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {

                                //  Currently NO optimization to reduce to fewest number of projectSearchId which would reduce the number of web service calls

                                peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId,  peptideId});

                                this._peptideIds_LoadingInProgress.add(peptideId);  //  Add to items that will be retrieved
                            }
                        }
                    }
                }
            } else {
                //  Get Peptide Ids for reportedPeptideIds for main filters

                const all_PeptideId_ReportedPeptideId_Data = reportedPeptideId_To_PeptideId_mapping_SingleSearch__peptideIds_For_MainFilters_Holder.get_All_PeptideId_ReportedPeptideId_Data()

                for ( const peptideId_ReportedPeptideId_Entry of all_PeptideId_ReportedPeptideId_Data ) {
                    const peptideId = peptideId_ReportedPeptideId_Entry.peptideId
                    const reportedPeptideId = peptideId_ReportedPeptideId_Entry.reportedPeptideId

                    if ( ! this._peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) ) {
                        //  peptideId Not already loaded

                        if ( ! this._peptideIds_LoadingInProgress.has(peptideId) ) {

                            //  Not peptideId retrieval already in progress

                            if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {

                                //  Currently NO optimization to reduce to fewest number of projectSearchId which would reduce the number of web service calls

                                peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId,  peptideId});

                                this._peptideIds_LoadingInProgress.add(peptideId);  //  Add to items that will be retrieved
                            }
                        }
                    }
                }
            }
        }

        return peptideIdsToLoadSequencesForMap_Key_PeptideId__Object;
    }

    //////////////////////////////////

    ///    Get and process actual Peptide Sequences

    /**
     *
     * @param promise
     */
    private _add_Promise_To__loadingInProgress_Promises( promise: Promise<void> ) : void {

        this._loadingInProgress_Promises.push(promise)
    }

    /**
     *
     * @param promise
     * @returns - found_Promise = false if not found in this._loadingInProgress_Promises
     */
    private _remove_Promise_From__loadingInProgress_Promises( promise: Promise<void> ) : {
        found_Promise: boolean
    } {
        let found_Promise = false;

        this._loadingInProgress_Promises = this._loadingInProgress_Promises.filter(value => {
            if ( value === promise ) {
                found_Promise = true;
                return false // Remove element
            }
            return true // keep element
        })

        return { found_Promise }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _get_PeptideSequences_Data_For_Single_ProjectSearchId_and_Associated_ReportedPeptideIds(
        {
            projectSearchId, reportedPeptideIds
        } : {
            projectSearchId: number
            reportedPeptideIds: Array<number>
        }
    ) : Promise<void> {
        try {
            const promise = new Promise<void>( ( resolve, reject ) => {try {

                const requestObject = {
                    projectSearchId,
                    reportedPeptideIds,
                };

                console.log("AJAX Call to get d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids-version-0001 START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids-version-0001";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {

                    //  Remove this promise
                    this._remove_Promise_From__loadingInProgress_Promises( promise )

                    reject()
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                    console.log("AJAX Call to get d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids-version-0001 END, Now: " + new Date() );

                    //  Remove this promise

                    if ( this._remove_Promise_From__loadingInProgress_Promises(promise) ) {

                    }

                    this._process_WebserviceResponse({ responseData });

                    resolve();

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._add_Promise_To__loadingInProgress_Promises(promise)

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const peptideSequenceString_PeptideId_MappingList = responseData.resultList
        const foundAllReportedPeptideIdsForProjectSearchId = responseData.foundAllReportedPeptideIdsForProjectSearchId

        if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
            throw Error("In _process_WebserviceResponse: foundAllReportedPeptideIdsForProjectSearchId is false");
            // reject();
        }
        if ( ! ( peptideSequenceString_PeptideId_MappingList instanceof Array ) ) {
            throw Error("In _process_WebserviceResponse: ( ! ( peptideSequenceString_PeptideId_MappingList instanceof Array ) )");
        }

        for ( const peptideSequencePeptideIdMappingEntry of peptideSequenceString_PeptideId_MappingList ) {

            const peptideId = peptideSequencePeptideIdMappingEntry.peptideId
            const peptideSequence = peptideSequencePeptideIdMappingEntry.peptideSequence

            if ( ! limelight__variable_is_type_number_Check(peptideId) ) {
                throw Error("In _process_WebserviceResponse: ( ! limelight__variable_is_type_number_Check(peptideId) )");
            }
            if ( ! limelight__IsVariableAString( peptideSequence ) ) {
                throw Error("In _process_WebserviceResponse: ( ! limelight__IsVariableAString( peptideSequence) )");
            }

            this._peptideSequences_For_MainFilters_Holder.INTERNAL__Insert_PeptideId_PeptideSequence({ peptideId, peptideSequence });

            this._peptideIds_LoadingInProgress.delete(peptideId);
        }
    }

}


class Internal__peptideIdsToLoadSequencesForMap_Key_PeptideId {

    peptideIdsToLoadSequencesForMap_Key_PeptideId: Map<number,{ reportedPeptideId: number, projectSearchId: number, peptideId: number }> = new Map()

    private _FAKE_FORCE_USE_CONSTRUCTOR() {}
}

