/**
 * commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters.ts
 *
 * For Single Project Search  -  OpenModification_RollUp_On_ReportedPeptideLevel
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder {

    // 		Open Modifications Per Reported Peptide Id.   mass is double
    // 					- Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, mass }]>>
    private _openModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, mass : number}>>

    constructor(
        {
            openModificationsOnReportedPeptide_KeyReportedPeptideId
        } : {
            openModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, mass : number}>>
        }
    ) {
        this._openModificationsOnReportedPeptide_KeyReportedPeptideId = openModificationsOnReportedPeptide_KeyReportedPeptideId
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_openModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._openModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
    }

    get_openModificationsOnReportedPeptide_Map_Entry_Values() {
        return this._openModificationsOnReportedPeptide_KeyReportedPeptideId.values();
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_OpenModificationsOnReportedPeptide_Entries() {
        if ( this._openModificationsOnReportedPeptide_KeyReportedPeptideId.size > 0 ) {
            return true
        }
        return false
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult {

    openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data__AlsoLoading_ReportedOpenModification_RollUp_On_ReportedPeptideLevel_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult>

    private _promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult>
    private _reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress: Set<number>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
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
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult> {
        try {
            const result = this.get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     * Get all for search for main filters
     */
    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult>
        } {

        if (this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds_AnyPsmHas_OpenModifications();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load OpenModification_RollUp_On_ReportedPeptideLevel Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_OpenModification_RollUp_On_ReportedPeptideLevel_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedOpenModification_RollUp_On_ReportedPeptideLevel for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data__AlsoLoading_ReportedOpenModification_RollUp_On_ReportedPeptideLevel_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data__AlsoLoading_ReportedOpenModification_RollUp_On_ReportedPeptideLevel_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data__AlsoLoading_ReportedOpenModification_RollUp_On_ReportedPeptideLevel_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult>(
                (resolve, reject) => { try {
                    get_reportedPeptideIds_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => {
                        const promise_load_OpenModification_RollUp_On_ReportedPeptideLevel_Data =
                            this._load_OpenModification_RollUp_On_ReportedPeptideLevel_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                        promise_load_OpenModification_RollUp_On_ReportedPeptideLevel_Data.catch( reason => {
                            reject(reason)
                        })
                        promise_load_OpenModification_RollUp_On_ReportedPeptideLevel_Data.then( load_OpenModification_RollUp_On_ReportedPeptideLevel_Data_Value => { try {
                            resolve(load_OpenModification_RollUp_On_ReportedPeptideLevel_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    })
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data__AlsoLoading_ReportedOpenModification_RollUp_On_ReportedPeptideLevel_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_OpenModification_RollUp_On_ReportedPeptideLevel_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.size === 0 ) {
                this._create_For_No_ReportedPeptideIds();

                return Promise.resolve(this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult)
            }

            if ( this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress !== reportedOpenModification_RollUp_On_ReportedPeptideLevel )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress;
            }

            this._reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_AsArray = Array.from( reportedPeptideIds )

            this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress =
                new Promise<CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters__get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult>(
                    ( resolve, reject ) => { try {
                        const requestObject = {
                            projectSearchId : this._projectSearchId,
                            reportedPeptideIds : reportedPeptideIds_AsArray,
                        };

                        console.log("AJAX Call to get open-modifications-per-reported-peptide-id START, Now: " + new Date() );

                        const url = "d/rws/for-page/psb/open-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

                        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                        promise_webserviceCallStandardPost.catch( () => { reject() }  );

                        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                            console.log("AJAX Call to get open-modifications-per-reported-peptide-id END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });
                            resolve( this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress.catch( reason => {
                this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress = undefined;
            });
            this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress.then( value => {
                this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress = undefined;
            })

            return this._promise_LoadOpenModification_RollUp_On_ReportedPeptideLevel_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _create_For_No_ReportedPeptideIds() {

        const openModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, mass : number}>> = new Map();

        const openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder({
            openModificationsOnReportedPeptide_KeyReportedPeptideId
        })

        this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult = {
            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const openModificationData_KeyReportedPeptideIdFromServer = responseData.openModification_KeyReportedPeptideId;

        const openModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, mass : number}>> = new Map();

        //   openModificationData_KeyReportedPeptideIdFromServer:
        //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;

        //  Translate to Map, parsing object keys to int

        let openModificationData_KeyReportedPeptideIdFromServer_Keys = Object.keys( openModificationData_KeyReportedPeptideIdFromServer );

        for ( const reportedPeptideIdString of openModificationData_KeyReportedPeptideIdFromServer_Keys ) {
            const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
            const openModificationDataArray_FromServer = openModificationData_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

            openModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideIdInt, openModificationDataArray_FromServer );

            //  Remove entry in reportedPeptideIds_Copy_Set that have result
            // reportedPeptideIds_Copy_Set.delete( reportedPeptideIdInt );
        }


        const openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder({
            openModificationsOnReportedPeptide_KeyReportedPeptideId
        })

        this._get_OpenModification_RollUp_On_ReportedPeptideLevelHolder__FunctionResult = {
            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
        }
    }

}