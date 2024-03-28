/**
 * commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters.ts
 *
 * For Single Project Search  -  PSM_IDs_For_ReportedPeptideId
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
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder {

    //  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
    private _psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId : Map<number, Array<number>>; // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >

    /**
     * @param psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
     */
    constructor(
        {
            psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId
        } : {
            //  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
            psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId : Map<number, Array<number>>; // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >
        }
    ) {
        this._psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId = psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId;
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_psmIds_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId.get(reportedPeptideId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult {

    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadPSM_IDs_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_IDs_For_ReportedPeptideId_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult>

    private _promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult>
    private _reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

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
        return new CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            const result = this.get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();

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
    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult>
        } {

        if (this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load PSM_IDs_For_ReportedPeptideId Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_PSM_IDs_For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedPSM_IDs_For_ReportedPeptideId for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_IDs_For_ReportedPeptideId_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_IDs_For_ReportedPeptideId_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_IDs_For_ReportedPeptideId_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult>(
                (resolve, reject) => { try {
                    get_reportedPeptideIds_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                        const promise_load_PSM_IDs_For_ReportedPeptideId_Data =
                            this._load_PSM_IDs_For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                        promise_load_PSM_IDs_For_ReportedPeptideId_Data.catch( reason => {
                            reject(reason)
                        })
                        promise_load_PSM_IDs_For_ReportedPeptideId_Data.then( load_PSM_IDs_For_ReportedPeptideId_Data_Value => { try {
                            resolve(load_PSM_IDs_For_ReportedPeptideId_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_IDs_For_ReportedPeptideId_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_PSM_IDs_For_ReportedPeptideId_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.length === 0 ) {
                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult );  // EARLY RETURN
            }

            if ( this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress !== reportedPSM_IDs_For_ReportedPeptideId )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress;
            }

            if ( ! ( reportedPeptideIds instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_PSM_IDs_For_ReportedPeptideId_Data";
                console.warn(msg);
                throw Error(msg);
            }

            const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace(reportedPeptideIds_Sorted);

            this._reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = reportedPeptideIds;

            this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters__get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Sorted,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    console.log("START: AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("END: AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress.catch( reason => {
                this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = undefined;
            });
            this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress.then( valueIgnored => {
                this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress = undefined;
            })

            return this._promise_LoadPSM_IDs_For_ReportedPeptideId_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        //  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
        const psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId : Map<number, Array<number>> = new Map(); // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >

        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder({
            psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId
        })

        this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult = {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const reportedPeptideId_psmIdList_List = responseData.reportedPeptideId_psmIdList_List;

        //  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
        const psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId : Map<number, Array<number>> = new Map(); // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >

        for ( const reportedPeptideId_psmIdList_Entry of reportedPeptideId_psmIdList_List ) {

            const reportedPeptideId = reportedPeptideId_psmIdList_Entry.reportedPeptideId;
            const psmIdList = reportedPeptideId_psmIdList_Entry.psmIdList;

            psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId.set( reportedPeptideId, psmIdList );

            // reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded.delete( reportedPeptideId );
        }

        // if ( reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded.size !== 0 ) {
        //     console.warn("reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded not empty after processing AJAX response");
        // }

        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder({
            psmIdsForReportedPeptideIdMap_Key_ReportedPeptideId
        })

        this._get_PSM_IDs_For_ReportedPeptideIdHolder__FunctionResult = {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

}