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
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


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

                    const url = "d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

                    console.log( "START: AJAX Call to: getting data from URL: " + url );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

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

        if ( responseData.reportedPeptideId_psmTblDataList_List ) {
            if ( ! ( responseData.reportedPeptideId_psmTblDataList_List instanceof Array ) ) {
                const msg = "( ! ( responseData.reportedPeptideId_psmTblDataList_List instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }
            for ( const reportedPeptideId_psmTblDataList_Entry of responseData.reportedPeptideId_psmTblDataList_List ) {
                if ( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === undefined || reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === null ) {
                    const msg = "( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === undefined || reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId ) ) {
                    const msg = "( ! variable_is_type_number_Check( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( reportedPeptideId_psmTblDataList_Entry.psms === undefined || reportedPeptideId_psmTblDataList_Entry.psms === null ) {
                    const msg = "( reportedPeptideId_psmTblDataList_Entry.psms === undefined || reportedPeptideId_psmTblDataList_Entry.psms === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! ( reportedPeptideId_psmTblDataList_Entry.psms instanceof Array ) ) {
                    const msg = "( ! ( reportedPeptideId_psmTblDataList_Entry.psms instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                const reportedPeptideId = reportedPeptideId_psmTblDataList_Entry.reportedPeptideId;

                const psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId = new Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>();

                for ( const psmEntry of reportedPeptideId_psmTblDataList_Entry.psms ) {

                    //  Copy in from Parent reportedPeptideId_psmTblDataList_Entry
                    psmEntry.reportedPeptideId = reportedPeptideId;

                    //  independentDecoyPSM may be not set and thus 'undefined'.  convert that to false.

                    if ( psmEntry.independentDecoyPSM ) {
                        psmEntry.independentDecoyPSM = true
                    } else {
                        psmEntry.independentDecoyPSM = false;
                    }

                    const psm : CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId = psmEntry;

                    if ( psm.psmId === undefined || psm.psmId === null ) {
                        const msg = "( psm.psmId === undefined || psm.psmId === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! variable_is_type_number_Check( psm.psmId ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.psmId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null ) {
                        const msg = "( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! variable_is_type_number_Check( psm.reportedPeptideId ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.reportedPeptideId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.charge === undefined || psm.charge === null ) {
                        const msg = "( psm.charge === undefined || psm.charge === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! variable_is_type_number_Check( psm.charge ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.charge ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.scanNumber === undefined || psm.scanNumber === null ) {
                        const msg = "( psm.scanNumber === undefined || psm.scanNumber === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! variable_is_type_number_Check( psm.scanNumber ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.scanNumber ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    //  Optional values
                    if ( psm.searchScanFileId !== undefined && psm.searchScanFileId !== null ) {
                        if ( ! variable_is_type_number_Check( psm.searchScanFileId ) ) {
                            const msg = "( ! variable_is_type_number_Check( psm.searchScanFileId ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if ( psm.retentionTimeSeconds !== undefined && psm.retentionTimeSeconds !== null ) {
                        if ( ! variable_is_type_number_Check( psm.retentionTimeSeconds ) ) {
                            const msg = "( ! variable_is_type_number_Check( psm.retentionTimeSeconds ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if ( psm.precursor_M_Over_Z !== undefined && psm.precursor_M_Over_Z !== null ) {
                        if ( ! variable_is_type_number_Check( psm.precursor_M_Over_Z ) ) {
                            const msg = "( ! variable_is_type_number_Check( psm.precursor_M_Over_Z ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    //  Boolean values
                    if ( psm.hasModifications === undefined || psm.hasModifications === null ) {
                        const msg = "( psm.hasModifications === undefined || psm.hasModifications === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null ) {
                        const msg = "( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.hasReporterIons === undefined || psm.hasReporterIons === null ) {
                        const msg = "( psm.hasReporterIons === undefined || psm.hasReporterIons === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( psm.independentDecoyPSM === undefined || psm.independentDecoyPSM === null ) {
                        const msg = "( psm.independentDecoyPSM === undefined || psm.independentDecoyPSM === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId.set( psm.psmId, psm );

                    psmTblData_Map_Key_PsmId.set( psm.psmId, psm );
                }

                const single_ReportedPeptideId_Entry = new CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSingleReportedPeptideId({
                    reportedPeptideId, psmTblData_Map_Key_PsmId: psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId
                })

                psmTblData_Map_Key_ReportedPeptideId.set( reportedPeptideId, single_ReportedPeptideId_Entry )
            }
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder({
            psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId
        })

        this._get_PSM_TblData_For_ReportedPeptideIdHolder__FunctionResult = {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
    }

}