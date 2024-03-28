/**
 * commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters.ts.ts
 *
 * For Single Project Search  -  Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder {

    // 		Variable/Dynamic Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. Can have multiple entries with same position and mass with diff reportedPeptideId
    // 					- Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>
    private _variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId : Map<number, Array<{ mass : number, position : number, reportedPeptideId : number }>> = new Map()

    //  Used to create data for requested ProteinSequenceVersion
    private _variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    private _proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

    /**
     * @param variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId
     */
    constructor(
        {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        } : {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        }
    ) {
        this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
        this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
    }

    /**
     *
     * @param proteinSequenceVersionId
     */
    get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {

        let dataInMap_For_proteinSequenceVersionId = this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);

        if ( ! dataInMap_For_proteinSequenceVersionId ) {

            //  Calling this._compute_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId(...)
            //  updates
            //  this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId
            //  adding entry for proteinSequenceVersionId
            this._compute_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId(proteinSequenceVersionId);

            dataInMap_For_proteinSequenceVersionId = this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
        }

        return dataInMap_For_proteinSequenceVersionId;
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Entries() {
        return this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries()
    }

    /**
     *  updates
     *  this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId
     *  adding entry for proteinSequenceVersionId
     *
     * @param proteinSequenceVersionId
     */
    private _compute_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {

        let variable_Dynamic_Modifications_At_ProteinSequenceVersionId = this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId)
        if ( ! variable_Dynamic_Modifications_At_ProteinSequenceVersionId ) {
            variable_Dynamic_Modifications_At_ProteinSequenceVersionId = []
            this._variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, variable_Dynamic_Modifications_At_ProteinSequenceVersionId)
        }

        const proteinCoverage_Entries_For_ProteinSequenceVersionId =
            this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_Entries_For_ProteinSequenceVersionId(proteinSequenceVersionId);

        if ( ! proteinCoverage_Entries_For_ProteinSequenceVersionId ) {
            //  No data for proteinSequenceVersionId
            return; // EARLY RETURN
        }

        for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverage_Entries_For_ProteinSequenceVersionId ) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;
            const proteinStartPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinStartPosition;

            const dynamicModificationsOnReportedPeptideArray =
                this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.
                get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId );

            if ( dynamicModificationsOnReportedPeptideArray ) {

                //  Have Mods for this reportedPeptideId
                for ( const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray ) {

                    const mass = dynamicModificationOnReportedPeptide.mass;
                    const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

                    const positionOnProtein = positionOnReportedPeptide + proteinStartPosition - 1; // ( subtract 1 since proteinStartPosition is '1' based )

                    const dynamicModificationOnProtein = { mass : mass, position : positionOnProtein, reportedPeptideId : reportedPeptideId };
                    variable_Dynamic_Modifications_At_ProteinSequenceVersionId.push( dynamicModificationOnProtein );
                }
            }
        }

    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult {

    variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
}

/**
 *  !!!!!!!!!!!!!!!!!    MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult

    private _promise_LoadVariable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult> {
        try {
            const result = this.get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch();

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
     * Get all for search for main filters
     */
    get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult>
        } {

        if (this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult,
                promise: undefined
            };
        }

        if ( this._promise_LoadVariable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_Data_InProgress ) {
            return {
                promise: this._promise_LoadVariable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_Data_InProgress,
                data: undefined
            }
        }

        // Create and return new Promise that encompasses

        this._promise_LoadVariable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_Data_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult>(
                (resolve_TopLevel, reject_TopLevel) => { try {

                    let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                    let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

                    const promises: Array<Promise<void>> = [];

                    {  //  Get Variable_Dynamic_Modifications At ReportedPeptide_Level
                        const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                            get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

                        if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                        } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                            const promise = new Promise<void>((resolve, reject) => { try {
                                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {reject(reason)})
                                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then( getResult_Value => { try {
                                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = getResult_Value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
                                    resolve();
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }});
                            promises.push(promise);
                        } else {
                            throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result not data or promise")
                        }
                    }

                    {  //  Get Variable_Dynamic_Modifications At ReportedPeptide_Level
                        const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

                        if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                            const  promise = new Promise<void>((resolve, reject) => { try {
                                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {reject(reason)})
                                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then( getResult_Value => { try {
                                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = getResult_Value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                                    resolve();
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise);
                        } else {
                            throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result not data or promise")
                        }
                    }

                    if ( promises.length === 0 ) {
                        const variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder({
                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        })

                        this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult = {
                            variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
                        }

                        resolve_TopLevel( this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult )
                    }

                    const promises_All = Promise.all(promises);

                    promises_All.catch(reason => { reject_TopLevel(reason)})
                    promises_All.then(noValue => {  try {
                        const variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder({
                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        })

                        this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult = {
                            variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
                        }

                        resolve_TopLevel( this._get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder__FunctionResult )

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadVariable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_Data_InProgress
        }
    }
}