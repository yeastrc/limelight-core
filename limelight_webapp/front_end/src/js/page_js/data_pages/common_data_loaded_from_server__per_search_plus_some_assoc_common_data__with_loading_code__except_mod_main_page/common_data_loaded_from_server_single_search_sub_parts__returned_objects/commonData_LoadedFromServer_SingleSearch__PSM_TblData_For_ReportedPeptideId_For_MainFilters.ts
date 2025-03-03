/**
 * commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters.ts
 *
 * For Single Project Search  -  PSM_TblData_For_ReportedPeptideId
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
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>

    constructor(
        {
            reportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            reportedPeptideId: number
            psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId {

    readonly psmId: number;
    readonly reportedPeptideId: number;
    readonly charge: number;
    readonly scanNumber: number;
    readonly searchScanFileId: number; // Can be null
    readonly retentionTimeSeconds: number; // Float, Can be null
    readonly precursor_M_Over_Z: number; // Double, Can be null

    readonly hasModifications: boolean;
    readonly hasOpenModifications: boolean;
    readonly hasReporterIons: boolean;

    readonly independentDecoyPSM: boolean;   // skip 'is_decoy' since is excluded in WHERE clause in SQL query
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder {

    private _psmTblData_Map_Key_ReportedPeptideId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId>
    private _psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
    private _psmTblData_Array_Map_Key_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>
    private _psms_DO_NOT_Have_ScanNumbers: boolean = false

    constructor(
        {
            psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            psmTblData_Map_Key_ReportedPeptideId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId>
            psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>
        }
    ) {
        this._psmTblData_Map_Key_ReportedPeptideId = psmTblData_Map_Key_ReportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_EntryCount() {
        return this._psmTblData_Map_Key_PsmId.size
    }

    get_PsmTblData_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._psmTblData_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }

    /**
     *
     */
    get_PsmTblData_Array_For_ScanNumber(scanNumer: number) {

        this._compute__psmTblData_Array_Map_Key_ScanNumber__psms_DO_NOT_Have_ScanNumbers()

        if ( this._psms_DO_NOT_Have_ScanNumbers ) {
            return undefined
        }

        return this._psmTblData_Array_Map_Key_ScanNumber.get(scanNumer);
    }



    private _compute__psmTblData_Array_Map_Key_ScanNumber__psms_DO_NOT_Have_ScanNumbers() {

        if ( this._psmTblData_Array_Map_Key_ScanNumber || this._psms_DO_NOT_Have_ScanNumbers ) {
            //  Already computed
            return; // EARLY RETURN
        }

        const psmTblData_Array_Map_Key_ScanNumber: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

        for ( const psmTblData of this._psmTblData_Map_Key_PsmId.values() ) {

            if ( psmTblData.scanNumber === undefined || psmTblData.scanNumber === null ) {

                //  PSM NOT have scan number

                this._psms_DO_NOT_Have_ScanNumbers = true;

                return; // EARLY RETURN
            }

            let psmTblData_Array = psmTblData_Array_Map_Key_ScanNumber.get( psmTblData.scanNumber );
            if ( ! psmTblData_Array ) {
                psmTblData_Array = []
                psmTblData_Array_Map_Key_ScanNumber.set( psmTblData.scanNumber, psmTblData_Array );
            }

            psmTblData_Array.push( psmTblData )
        }

        this._psmTblData_Array_Map_Key_ScanNumber = psmTblData_Array_Map_Key_ScanNumber;
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult {

    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadPSM_TblData_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_TblData_For_ReportedPeptideId_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>

    private _promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>
    private _reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

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
        return new CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            const result = this.get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();

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
    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>
        } {

        if (this._get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load PSM_TblData_For_ReportedPeptideId Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_PSM_TblData_For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedPSM_TblData_For_ReportedPeptideId for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_TblData_For_ReportedPeptideId_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_TblData_For_ReportedPeptideId_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_TblData_For_ReportedPeptideId_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>(
            (resolve, reject) => { try {
                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                    const promise_load_PSM_TblData_For_ReportedPeptideId_Data =
                        this._load_PSM_TblData_For_ReportedPeptideId_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_PSM_TblData_For_ReportedPeptideId_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_PSM_TblData_For_ReportedPeptideId_Data.then( load_PSM_TblData_For_ReportedPeptideId_Data_Value => {
                        try {
                            resolve(load_PSM_TblData_For_ReportedPeptideId_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data__AlsoLoading_ReportedPSM_TblData_For_ReportedPeptideId_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_PSM_TblData_For_ReportedPeptideId_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult> {
        try {
            if ( this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress !== reportedPSM_TblData_For_ReportedPeptideId )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress;
            }

            if ( ! ( reportedPeptideIds instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_PSM_TblData_For_ReportedPeptideId_Data";
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

            this._reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = reportedPeptideIds;

            this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters__get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Sorted,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    const url = "d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0003";

                    console.log( "START: AJAX Call to: getting data from URL: " + url );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()
                    });

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress.catch( reason => {
                this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = undefined;
            });
            this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress.then( valueIgnored => {
                this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress = undefined;
            })

            return this._promise_LoadPSM_TblData_For_ReportedPeptideId_Data_InProgress;

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

        const psmTblData_Map_Key_ReportedPeptideId = new Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId>();
        const psmTblData_Map_Key_PsmId = new Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>();

        const reportedPeptideId_OffsetFromPrevValue_Array = responseData.reportedPeptideId_OffsetFromPrevValue_Array as Array<number>
        const psmId_OffsetFromPrevValue_Array = responseData.psmId_OffsetFromPrevValue_Array as Array<number>

        const psm_Charge_Array = responseData.psm_Charge_Array as Array<number>
        const psm_ScanNumber_Array = responseData.psm_ScanNumber_Array as Array<number>

        const psm_RetentionTimeSeconds_Array = responseData.psm_RetentionTimeSeconds_Array as Array<number>
        const psm_Precursor_M_Over_Z_Array = responseData.psm_Precursor_M_Over_Z_Array as Array<number>

        const psm_HasModifications_Array = responseData.psm_HasModifications_Array as Array<boolean>
        const psm_HasOpenModifications_Array = responseData.psm_HasOpenModifications_Array as Array<boolean>
        const psm_HasReporterIons_Array = responseData.psm_HasReporterIons_Array as Array<boolean>
        const psm_IndependentDecoyPSM_Array = responseData.psm_IndependentDecoyPSM_Array as Array<boolean>

        const psm_SearchScanFileId_Array = responseData.psm_SearchScanFileId_Array as Array<boolean>

        if ( reportedPeptideId_OffsetFromPrevValue_Array === undefined || reportedPeptideId_OffsetFromPrevValue_Array === null ) {
            const msg = "( reportedPeptideId_OffsetFromPrevValue_Array === undefined || reportedPeptideId_OffsetFromPrevValue_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const reportedPeptideId_OffsetFromPrevValue_Entry of reportedPeptideId_OffsetFromPrevValue_Array ) {
            if ( reportedPeptideId_OffsetFromPrevValue_Entry === undefined || reportedPeptideId_OffsetFromPrevValue_Entry === null ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Entry === undefined || reportedPeptideId_OffsetFromPrevValue_Entry === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( reportedPeptideId_OffsetFromPrevValue_Entry ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( reportedPeptideId_OffsetFromPrevValue_Entry ) )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psmId_OffsetFromPrevValue_Array === undefined || psmId_OffsetFromPrevValue_Array === null ) {
            const msg = "( psmId_OffsetFromPrevValue_Array === undefined || psmId_OffsetFromPrevValue_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psmId_OffsetFromPrevValue_Array.length ) {
            const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psmId_OffsetFromPrevValue_Array.length )";
            console.warn( msg );
            throw Error( msg );
        }
        for ( const psmId_OffsetFromPrevValue_Entry of psmId_OffsetFromPrevValue_Array ) {
            if ( psmId_OffsetFromPrevValue_Entry === undefined || psmId_OffsetFromPrevValue_Entry === null ) {
                const msg = "( psmId_OffsetFromPrevValue_Entry === undefined || psmId_OffsetFromPrevValue_Entry === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( psmId_OffsetFromPrevValue_Entry ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( psmId_OffsetFromPrevValue_Entry ) )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_Charge_Array === undefined || psm_Charge_Array === null ) {
            const msg = "( psm_Charge_Array === undefined || psm_Charge_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_Charge_Array.length ) {
            const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_Charge_Array.length )";
            console.warn( msg );
            throw Error( msg );
        }
        for ( const psm_Charge_Entry of psm_Charge_Array ) {
            if ( psm_Charge_Entry === undefined || psm_Charge_Entry === null ) {
                const msg = "( psm_Charge_Entry === undefined || psm_Charge_Entry === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( psm_Charge_Entry ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( psm_Charge_Entry ) )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_ScanNumber_Array === undefined || psm_ScanNumber_Array === null ) {
            const msg = "( psm_ScanNumber_Array === undefined || psm_ScanNumber_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_ScanNumber_Array.length ) {
            const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_ScanNumber_Array.length )";
            console.warn( msg );
            throw Error( msg );
        }
        for ( const psm_ScanNumber_Entry of psm_ScanNumber_Array ) {
            if ( psm_ScanNumber_Entry === undefined || psm_ScanNumber_Entry === null ) {
                const msg = "( psm_ScanNumber_Entry === undefined || psm_ScanNumber_Entry === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( psm_ScanNumber_Entry ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( psm_ScanNumber_Entry ) )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_RetentionTimeSeconds_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_RetentionTimeSeconds_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_RetentionTimeSeconds_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
            for ( const psm_RetentionTimeSeconds_Entry of psm_RetentionTimeSeconds_Array ) {
                //  Value can be null
                if ( psm_RetentionTimeSeconds_Entry !== undefined && psm_RetentionTimeSeconds_Entry !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm_RetentionTimeSeconds_Entry ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm_RetentionTimeSeconds_Entry ) )";
                        console.warn( msg );
                        throw Error( msg );
                    }
                }
            }
        }

        if ( psm_Precursor_M_Over_Z_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_Precursor_M_Over_Z_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_Precursor_M_Over_Z_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
            for ( const psm_Pecursor_M_Over_Z_Entry of psm_Precursor_M_Over_Z_Array ) {
                //  Value can be null
                if ( psm_Pecursor_M_Over_Z_Entry !== undefined && psm_Pecursor_M_Over_Z_Entry !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm_Pecursor_M_Over_Z_Entry ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm_Pecursor_M_Over_Z_Entry ) )";
                        console.warn( msg );
                        throw Error( msg );
                    }
                }
            }
        }

        if ( psm_HasModifications_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasModifications_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasModifications_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_HasOpenModifications_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasOpenModifications_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasOpenModifications_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_HasReporterIons_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasReporterIons_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_HasReporterIons_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_IndependentDecoyPSM_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_IndependentDecoyPSM_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_IndependentDecoyPSM_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        if ( psm_SearchScanFileId_Array ) {
            // Optional property
            if ( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_SearchScanFileId_Array.length ) {
                const msg = "( reportedPeptideId_OffsetFromPrevValue_Array.length !== psm_SearchScanFileId_Array.length )";
                console.warn( msg );
                throw Error( msg );
            }
            for ( const psm_SearchScanFileId_Entry of psm_SearchScanFileId_Array ) {
                //  Value can be null
                if ( psm_SearchScanFileId_Entry !== undefined && psm_SearchScanFileId_Entry !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm_SearchScanFileId_Entry ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm_SearchScanFileId_Entry ) )";
                        console.warn( msg );
                        throw Error( msg );
                    }
                }
            }
        }

        let reportedPeptideId_Current = 0  //  Offsets computed from starting at zero
        let reportedPeptideId_Prev = -1    //  Previous - Init to -1 since is not possible

        let psmId_Current = 0  //  Offsets computed from starting at zero

        let psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId : Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = undefined

        for ( let allArrays_Index = 0; allArrays_Index < reportedPeptideId_OffsetFromPrevValue_Array.length; allArrays_Index++ ) {


            const reportedPeptideId_OffsetFromPrevValue = reportedPeptideId_OffsetFromPrevValue_Array[ allArrays_Index ]

            reportedPeptideId_Current += reportedPeptideId_OffsetFromPrevValue

            const psmId_OffsetFromPrevValue = psmId_OffsetFromPrevValue_Array[ allArrays_Index ]

            psmId_Current += psmId_OffsetFromPrevValue

            const psm_Charge = psm_Charge_Array[ allArrays_Index ]
            const psm_ScanNumber = psm_ScanNumber_Array[ allArrays_Index ]

            let psm_RetentionTimeSeconds = null
            if ( psm_RetentionTimeSeconds_Array ) {
                psm_RetentionTimeSeconds = psm_RetentionTimeSeconds_Array[ allArrays_Index ]
                if ( psm_RetentionTimeSeconds === undefined ) {
                    psm_RetentionTimeSeconds = null
                }
            }

            let psm_Precursor_M_Over_Z = null
            if ( psm_Precursor_M_Over_Z_Array ) {
                psm_Precursor_M_Over_Z = psm_Precursor_M_Over_Z_Array[ allArrays_Index ]
                if ( psm_Precursor_M_Over_Z === undefined ) {
                    psm_Precursor_M_Over_Z = null
                }
            }

            let psm_HasModifications = false
            if ( psm_HasModifications_Array ) {
                psm_HasModifications = psm_HasModifications_Array[ allArrays_Index ]
                if ( psm_HasModifications ) {
                    psm_HasModifications = true
                } else {
                    psm_HasModifications = false
                }
            }

            let psm_HasOpenModifications = false
            if ( psm_HasOpenModifications_Array ) {
                psm_HasOpenModifications = psm_HasOpenModifications_Array[ allArrays_Index ]
                if ( psm_HasOpenModifications ) {
                    psm_HasOpenModifications = true
                } else {
                    psm_HasOpenModifications = false
                }
            }

            let psm_HasReporterIons = false
            if ( psm_HasReporterIons_Array ) {
                psm_HasReporterIons = psm_HasReporterIons_Array[ allArrays_Index ]
                if ( psm_HasReporterIons ) {
                    psm_HasReporterIons = true
                } else {
                    psm_HasReporterIons = false
                }
            }

            let psm_IndependentDecoyPSM = false
            if ( psm_IndependentDecoyPSM_Array ) {
                psm_IndependentDecoyPSM = psm_IndependentDecoyPSM_Array[ allArrays_Index ]
                if ( psm_IndependentDecoyPSM ) {
                    psm_IndependentDecoyPSM = true
                } else {
                    psm_IndependentDecoyPSM = false
                }
            }

            let psm_SearchScanFileId = null
            if ( psm_SearchScanFileId_Array ) {
                psm_SearchScanFileId = psm_SearchScanFileId_Array[ allArrays_Index ]
                if ( psm_SearchScanFileId === undefined ) {
                    psm_SearchScanFileId = null
                }
            }

            const psmTableDataEntry: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId = {

                psmId: psmId_Current,
                reportedPeptideId: reportedPeptideId_Current,
                charge: psm_Charge,
                scanNumber: psm_ScanNumber,
                searchScanFileId: psm_SearchScanFileId, // Can be null
                retentionTimeSeconds: psm_RetentionTimeSeconds, // Float, Can be null
                precursor_M_Over_Z: psm_Precursor_M_Over_Z, // Double, Can be null

                hasModifications: psm_HasModifications,
                hasOpenModifications: psm_HasOpenModifications,
                hasReporterIons: psm_HasReporterIons,

                independentDecoyPSM: psm_IndependentDecoyPSM   // skip 'is_decoy' since is excluded in WHERE clause in SQL query
            }

            if ( reportedPeptideId_Prev !== reportedPeptideId_Current ) {

                psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId = new Map()

                const single_ReportedPeptideId_Entry = new CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId({
                    reportedPeptideId: reportedPeptideId_Current, psmTblData_Map_Key_PsmId: psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId
                })

                psmTblData_Map_Key_ReportedPeptideId.set( reportedPeptideId_Current, single_ReportedPeptideId_Entry )

                reportedPeptideId_Prev = reportedPeptideId_Current
            }

            psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId.set( psmTableDataEntry.psmId, psmTableDataEntry );

            psmTblData_Map_Key_PsmId.set( psmTableDataEntry.psmId, psmTableDataEntry );
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder({
            psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId
        })

        this._get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult = {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

}