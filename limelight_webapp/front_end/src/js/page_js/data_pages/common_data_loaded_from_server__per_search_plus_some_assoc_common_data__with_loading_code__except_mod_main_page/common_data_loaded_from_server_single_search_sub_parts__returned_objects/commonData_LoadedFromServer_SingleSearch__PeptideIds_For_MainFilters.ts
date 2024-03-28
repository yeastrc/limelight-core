/**
 * commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters.ts
 *
 * For Single Project Search  -  PeptideIds
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters
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
export class CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder {

    private _peptideId_Data_Map_Key_ReportedPeptideId: Map<number,{ peptideId: number, reportedPeptideId:number }>
    private _reportedPeptideIdEntries_Data_Map_Key_PeptideId: Map<number,Set<number>>

    constructor(
        {
            peptideId_Data_Map_Key_ReportedPeptideId, reportedPeptideIdEntries_Data_Map_Key_PeptideId
        } : {
            peptideId_Data_Map_Key_ReportedPeptideId: Map<number,{ peptideId: number, reportedPeptideId:number }>
            reportedPeptideIdEntries_Data_Map_Key_PeptideId: Map<number,Set<number>>
        }
    ) {
        this._peptideId_Data_Map_Key_ReportedPeptideId = peptideId_Data_Map_Key_ReportedPeptideId;
        this._reportedPeptideIdEntries_Data_Map_Key_PeptideId = reportedPeptideIdEntries_Data_Map_Key_PeptideId;
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_PeptideId_For_ReportedPeptideId( reportedPeptideId: number ) : number {
        const data = this._peptideId_Data_Map_Key_ReportedPeptideId.get(reportedPeptideId);
        if ( ! data ) {
            return undefined
        }
        return data.peptideId
    }

    get_All_PeptideId_ReportedPeptideId_Data() {
        return this._peptideId_Data_Map_Key_ReportedPeptideId.values()
    }

    get_ReportedPeptideIdEntries_For_PeptideId( peptideId: number ) : ReadonlySet<number> {
        return this._reportedPeptideIdEntries_Data_Map_Key_PeptideId.get(peptideId)
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult {

    peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_PeptideIdsHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadPeptideIds_Data__AlsoLoading_ReportedPeptideIds_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>

    private _promise_LoadPeptideIds_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>
    private _reportedPeptideIds_LoadPeptideIds_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

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
        return new CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_PeptideIdsHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult> {
        try {
            const result = this.get_PeptideIdsHolder_AllForSearch();

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
    get_PeptideIdsHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>
        } {

        if (this._get_PeptideIdsHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_PeptideIdsHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load Peptide Ids Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_PeptideIds_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedPeptideIds for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadPeptideIds_Data__AlsoLoading_ReportedPeptideIds_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadPeptideIds_Data__AlsoLoading_ReportedPeptideIds_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadPeptideIds_Data__AlsoLoading_ReportedPeptideIds_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>(
                (resolve, reject) => { try {
                    get_reportedPeptideIds_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                        const promise_load_PeptideIds_Data = this._load_PeptideIds_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                        promise_load_PeptideIds_Data.catch( reason => {
                            reject(reason)
                        })
                        promise_load_PeptideIds_Data.then( load_PeptideIds_Data_Value => { try {
                            resolve(load_PeptideIds_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadPeptideIds_Data__AlsoLoading_ReportedPeptideIds_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_PeptideIds_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.length === 0 ) {
                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_PeptideIdsHolder__FunctionResult );  // EARLY RETURN
            }

            if ( this._promise_LoadPeptideIds_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadPeptideIds_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadPeptideIds_Data_InProgress;
            }

            if ( ! ( reportedPeptideIds instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_PeptideIds_Data";
                console.warn(msg);
                throw Error(msg);
            }

            this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = reportedPeptideIds;

            this._promise_LoadPeptideIds_Data_InProgress =
                new Promise<CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters__get_PeptideIdsHolder__FunctionResult>(
                    ( resolve, reject ) => { try {
                        const requestObject = {
                            projectSearchId : this._projectSearchId,
                            reportedPeptideIds : reportedPeptideIds,
                        };

                        console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids START, Now: " + new Date() );

                        const url = "d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids";

                        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                        promise_webserviceCallStandardPost.catch( () => { reject() }  );

                        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                            console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });
                            resolve( this._get_PeptideIdsHolder__FunctionResult );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadPeptideIds_Data_InProgress.catch( reason => {
                this._promise_LoadPeptideIds_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
            });
            this._promise_LoadPeptideIds_Data_InProgress.then( valueIgnored => {
                this._promise_LoadPeptideIds_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
            })

            return this._promise_LoadPeptideIds_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        const peptideIds_For_MainFilters_Holder =
            new CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder({
                peptideId_Data_Map_Key_ReportedPeptideId: new Map() , reportedPeptideIdEntries_Data_Map_Key_PeptideId: new Map()
            });

        this._get_PeptideIdsHolder__FunctionResult = {
            peptideIds_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        if ( ! responseData.foundAllReportedPeptideIdsForProjectSearchId ) {
            throw Error("loadPeptideIdsIfNeeded(...) response 'foundAllReportedPeptideIdsForProjectSearchId' is false");
        }

        const peptideId_Data_Map_Key_ReportedPeptideId: Map<number,{ peptideId: number, reportedPeptideId:number }> = new Map()
        const reportedPeptideIdEntries_Data_Map_Key_PeptideId: Map<number,Set<number>> = new Map()

        for ( const peptideIdReportedPeptideIdMappingEntry of responseData.resultList ) {

            const data = { peptideId: peptideIdReportedPeptideIdMappingEntry.peptideId, reportedPeptideId: peptideIdReportedPeptideIdMappingEntry.reportedPeptideId };
            peptideId_Data_Map_Key_ReportedPeptideId.set( peptideIdReportedPeptideIdMappingEntry.reportedPeptideId, data )

            let reportedPeptideIdEntries_Data = reportedPeptideIdEntries_Data_Map_Key_PeptideId.get( data.peptideId );
            if ( ! reportedPeptideIdEntries_Data ) {
                reportedPeptideIdEntries_Data = new Set()
                reportedPeptideIdEntries_Data_Map_Key_PeptideId.set( data.peptideId, reportedPeptideIdEntries_Data )
            }
            reportedPeptideIdEntries_Data.add( data.reportedPeptideId )
        }

        const peptideIds_For_MainFilters_Holder =
            new CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder({
                peptideId_Data_Map_Key_ReportedPeptideId, reportedPeptideIdEntries_Data_Map_Key_PeptideId
            });

        this._get_PeptideIdsHolder__FunctionResult = {
            peptideIds_For_MainFilters_Holder
        }
    }

}