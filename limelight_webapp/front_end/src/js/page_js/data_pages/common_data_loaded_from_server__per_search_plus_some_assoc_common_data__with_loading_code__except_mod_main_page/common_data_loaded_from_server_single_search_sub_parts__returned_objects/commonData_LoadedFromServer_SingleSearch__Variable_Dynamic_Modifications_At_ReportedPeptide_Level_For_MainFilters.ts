/**
 * commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters.ts
 *
 * For Single Project Search  -  Variable_Dynamic_Modifications_At_ReportedPeptide_Level
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder {

    // 		Variable/Dynamic Modifications Per Reported Peptide Id.   position is int, mass is double
    // 					- Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass, is_N_Terminal : boolean, is_C_Terminal : boolean }]>>
    private _variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, position : number, mass : number, is_N_Terminal : boolean, is_C_Terminal : boolean}>>

    /**
     * @param variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId
     */
    constructor(
        {
            variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId
        } : {
            variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, position : number, mass : number, is_N_Terminal : boolean, is_C_Terminal : boolean}>>
        }
    ) {
        this._variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId = variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId;
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
    }

    get_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() {
        return this._variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId.values()
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() {
        if ( this._variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId.size > 0 ) {
            return true
        }
        return false
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult {

    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult>

    private _promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult>
    private _reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress: Set<number>

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
        return new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult> {
        try {
            const result = this.get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

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
    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult>
        } {

        if (this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds_HasDynamicModifications();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load Variable_Dynamic_Modifications_At_ReportedPeptide_Level Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult>(
            (resolve, reject) => { try {

                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                    const promise_load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data =
                        this._load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data.then( load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_Value => {
                        try {
                            resolve(load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_Variable_Dynamic_Modifications_At_ReportedPeptide_Level_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.size === 0 ) {

                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult ); //  EARLY RETURN
            }

            if ( this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress !== reportedVariable_Dynamic_Modifications_At_ReportedPeptide_Level )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress;
            }

            this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_Array = Array.from( reportedPeptideIds );

            this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Array,
                    };

                    console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });

                            resolve( this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress.catch( reason => {
                this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = undefined;
            });
            this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress.then( valueIgnored => {
                this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress = undefined;
            })

            return this._promise_LoadVariable_Dynamic_Modifications_At_ReportedPeptide_Level_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        const variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId: Map<number, {reportedPeptideId: number, position: number, mass: number, is_N_Terminal: boolean, is_C_Terminal: boolean}[]> = new Map();

        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
            new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder({ variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId });

        this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult = {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        }

    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const dynamicModificationData_KeyReportedPeptideIdFromServer = responseData.dynamicModification_KeyReportedPeptideId;

        const variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId: Map<number, {reportedPeptideId: number, position: number, mass: number, is_N_Terminal: boolean, is_C_Terminal: boolean}[]> = new Map();

        //   dynamicModificationData_KeyReportedPeptideIdFromServer:
        //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;

        //  Translate to Map, parsing object keys to int

        let dynamicModificationData_KeyReportedPeptideIdFromServer_Keys = Object.keys( dynamicModificationData_KeyReportedPeptideIdFromServer );

        for ( const reportedPeptideIdString of dynamicModificationData_KeyReportedPeptideIdFromServer_Keys ) {
            const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
            const dynamicModificationDataArray_FromServer = dynamicModificationData_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

            variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideIdInt, dynamicModificationDataArray_FromServer );

            //  Remove entry in reportedPeptideIds_Copy_Set that have result
            // reportedPeptideIds_Copy_Set.delete( reportedPeptideIdInt );
        }

        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
            new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder({ variable_Dynamic_ModificationsOnReportedPeptide_KeyReportedPeptideId });

        this._get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder__FunctionResult = {
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        }
    }

}