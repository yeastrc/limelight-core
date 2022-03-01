/**
 * commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters.ts
 *
 * For Single Project Search  -  SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId
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
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder {

    //  Sub Group Id for a PSM Id for a Reported Peptide
    private _subGroupIdMap_Key_PsmId_KeyReportedPeptideId : Map<number, Map<number,number>>; // - Map<Reported Peptide Id, Map<PSM Id, Sub Group Id>>
    //  Sub Group Id for a PSM Id
    private _subGroupIdMap_Key_PsmId : Map<number,number>; // - Map<PSM Id, Sub Group Id>

    /**
     * @param psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
     */
    constructor(
        {
            subGroupIdMap_Key_PsmId_KeyReportedPeptideId, subGroupIdMap_Key_PsmId
        } : {
            //  Sub Group Id for a PSM Id for a Reported Peptide
            subGroupIdMap_Key_PsmId_KeyReportedPeptideId : Map<number, Map<number,number>>; // - Map<Reported Peptide Id, Map<PSM Id, Sub Group Id>>
            //  Sub Group Id for a PSM Id
            subGroupIdMap_Key_PsmId : Map<number,number>; // - Map<PSM Id, Sub Group Id>
        }
    ) {
        this._subGroupIdMap_Key_PsmId_KeyReportedPeptideId = subGroupIdMap_Key_PsmId_KeyReportedPeptideId;
        this._subGroupIdMap_Key_PsmId = subGroupIdMap_Key_PsmId;
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._subGroupIdMap_Key_PsmId_KeyReportedPeptideId.get(reportedPeptideId);
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_subGroupId_For_PsmId( psmId: number ) {
        return this._subGroupIdMap_Key_PsmId.get(psmId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult {

    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data__AlsoLoading_ReportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult>

    private _promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult>
    private _reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
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
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            const result = this.get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch();

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
    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult>
        } {

        if (this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data__AlsoLoading_ReportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data__AlsoLoading_ReportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data__AlsoLoading_ReportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult>(
            (resolve, reject) => { try {
                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                    const promise_load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data =
                        this._load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data.then( load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_Value => {
                        try {
                            resolve(load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data__AlsoLoading_ReportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.length === 0 ) {
                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult );  // EARLY RETURN
            }

            if ( this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress !== reportedSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress;
            }

            if ( ! ( reportedPeptideIds instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data";
                console.warn(msg);
                throw Error(msg);
            }

            const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );

            reportedPeptideIds_Sorted.sort( (a,b ) => {
                if ( a < b ) {
                    return -1;
                }
                if ( a > b ) {
                    return 1;
                }
                return 0;
            });

            this._reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = reportedPeptideIds;

            this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters__get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Sorted,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });
                            resolve( this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress.catch( reason => {
                this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = undefined;
            });
            this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress.then( valueIgnored => {
                this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress = undefined;
            })

            return this._promise_LoadSearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        const subGroupIdMap_Key_PsmId_KeyReportedPeptideId : Map<number, Map<number, number>> = new Map();
        //  Sub Group Id for a PSM Id
        const subGroupIdMap_Key_PsmId : Map<number,number> = new Map(); // - Map<PSM Id, Sub Group Id>

        const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder({
            subGroupIdMap_Key_PsmId_KeyReportedPeptideId, subGroupIdMap_Key_PsmId
        })

        this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult = {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const results = responseData.results;

        const subGroupIdMap_Key_PsmId_KeyReportedPeptideId : Map<number, Map<number, number>> = new Map();
        //  Sub Group Id for a PSM Id
        const subGroupIdMap_Key_PsmId : Map<number,number> = new Map(); // - Map<PSM Id, Sub Group Id>

        for ( const result_Entry of results ) {

            if ( ! variable_is_type_number_Check( result_Entry.rPId ) ) {
                const msg = "result_Entry.rPId not numeric: " + result_Entry.rPId;
                console.warn( msg );
                throw Error( msg )
            }
            if ( ! variable_is_type_number_Check( result_Entry.sSbGpId ) ) {
                const msg = "result_Entry.rPId not numeric: " + result_Entry.sSbGpId;
                console.warn( msg );
                throw Error( msg )
            }
            if ( ! variable_is_type_number_Check( result_Entry.psmId ) ) {
                const msg = "result_Entry.psmId not numeric: " + result_Entry.psmId;
                console.warn( msg );
                throw Error( msg )
            }

            const reportedPeptideId = result_Entry.rPId;
            const searchSubGroupId = result_Entry.sSbGpId;
            const psmId = result_Entry.psmId;

            let getSubMap_Key_psmId_For_ReportedPeptideId = subGroupIdMap_Key_PsmId_KeyReportedPeptideId.get( reportedPeptideId );
            if ( ! getSubMap_Key_psmId_For_ReportedPeptideId ) {
                getSubMap_Key_psmId_For_ReportedPeptideId = new Map();
                subGroupIdMap_Key_PsmId_KeyReportedPeptideId.set( reportedPeptideId, getSubMap_Key_psmId_For_ReportedPeptideId );
            }
            getSubMap_Key_psmId_For_ReportedPeptideId.set( psmId, searchSubGroupId );

            subGroupIdMap_Key_PsmId.set( psmId, searchSubGroupId );
        }

        const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder({
            subGroupIdMap_Key_PsmId_KeyReportedPeptideId, subGroupIdMap_Key_PsmId
        })

        this._get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder__FunctionResult = {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

}