/**
 * commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData.ts
 *
 * For Single Project Search  -  PSM_FilterableAnnotationData - NO Main PSM/Reported Peptide Filters applied
 *
 * Request Options for Include and Exclude Decoy PSMs
 *
 * Data loaded from server and code to load data from server
 *
 * !!!  NOT USE  !!! : SearchDataLookupParams_For_Single_ProjectSearchId  !!!
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch__NO_PSM_Peptide_Protein_Filtering";


/**
 * !!!!!!!!!!!!!!!!!!!!!!!   Holder Class  !!!!!!!!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder {

    private _per_Psm_Holder_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId> = new Map();

    private _psmFilterableAnnotationTypeIds_Loaded: Set<number> = new Set();

    constructor() {}

    get_Per_Psm_Holder_For_PsmId(psmId: number) {
        return this._per_Psm_Holder_Map_Key_PsmId.get(psmId);
    }

    set_Per_Psm_Holder_For_PsmId( item: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId ) : void {
        this._per_Psm_Holder_Map_Key_PsmId.set( item.psmId, item );
    }

    /**
     *
     */
    get_Per_Psm_Holder_Entries_Size(): number {

        return this._per_Psm_Holder_Map_Key_PsmId.size
    }

    /**
     *
     */
    get_Per_Psm_Holder_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId> {

        return this._per_Psm_Holder_Map_Key_PsmId.values()
    }

    add_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId: number ) : void {
        this._psmFilterableAnnotationTypeIds_Loaded.add( psmFilterableAnnotationTypeId );
    }

    is_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId: number ) : boolean {
        return this._psmFilterableAnnotationTypeIds_Loaded.has( psmFilterableAnnotationTypeId );
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId {

    readonly psmId: number;
    private _psmFilterableAnnotationData_Map_Key_AnnotationTypeId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder__ForSingleAnnotationTypeId> = new Map();

    constructor(
        {
            psmId
        } : {
            psmId: number
        }
    ) {
        this.psmId = psmId;
    }

    get_PsmFilterableAnnotationData_For_AnnotationTypeId(annotationTypeId: number) {
        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.get(annotationTypeId);
    }

    /**
     *
     */
    get_PsmFilterableAnnotationData_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder__ForSingleAnnotationTypeId> {

        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.values()
    }

    //  Add to Map

    /**
     * Set to Map
     * @param entry
     */
    set_PsmFilterableAnnotationData( entry : CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder__ForSingleAnnotationTypeId ) {
        this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.set(entry.annotationTypeId, entry);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder__ForSingleAnnotationTypeId {

    readonly psmId: number;
    readonly annotationTypeId: number;
    readonly annotationValueNumber: number;
    readonly decoyPSM: boolean
    readonly independentDecoyPSM: boolean
}

////////////////

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult {

    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
}

///////////////////////////

/**
 *  !!!!!!!!!!!!!!!!!!!!!!!   Main Class  !!!!!!!!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering

    //

    private _get_PSM_FilterableAnnotationData_Holder__Include_DecoyPSM = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder()
    private _get_PSM_FilterableAnnotationData_Holder__Exclude_DecoyPSM = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder()

    private _webserviceRetrievals_InProgress__Include_DecoyPSM = new Internal_WebserviceRetrieval_InProgress__All_For_Include_Or_Exclude()
    private _webserviceRetrievals_InProgress__Exclude_DecoyPSM = new Internal_WebserviceRetrieval_InProgress__All_For_Include_Or_Exclude()

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchId
     */
    static getNewInstance(
        {
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        });
    }

    /**
     * !!!  Always return promise
     *
     * PSM Filterable Annotation Data Unfiltered - Include Decoy PSMs - Also includes Target and Independent Decoy data
     */
    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder__ReturnPromise(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult> {
        try {
            const result = this.get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested });

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
     * PSM Filterable Annotation Data Unfiltered - Include Decoy PSMs - Also includes Target and Independent Decoy data
     */
    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ): {
            data: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult>
        } {

        const include_DecoyPSM = true;
        const get_PSM_FilterableAnnotationData_Holder = this._get_PSM_FilterableAnnotationData_Holder__Include_DecoyPSM;
        const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Include_DecoyPSM;

        return this._get_PSM_FilterableAnnotationData_Unfiltered__Holder({
            psmFilterableAnnotationTypeIds_Requested,
            include_DecoyPSM,
            get_PSM_FilterableAnnotationData_Holder,
            webserviceRetrievals_InProgress
        });
    }

    /**
     * !!!  Always return promise
     *
     * PSM Filterable Annotation Data Unfiltered - Exclude Decoy PSMs - Includes Target and Independent Decoy data
     */
    get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder__ReturnPromise(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult> {
        try {
            const result = this.get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested });

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
     * PSM Filterable Annotation Data Unfiltered - Exclude Decoy PSMs - Includes Target and Independent Decoy data
     */
    get_PSM_FilterableAnnotationData_Unfiltered__Exclude_DecoyPSMs__Holder(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ): {
        data: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult
        promise: Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult>
    } {

        const include_DecoyPSM = false;
        const get_PSM_FilterableAnnotationData_Holder = this._get_PSM_FilterableAnnotationData_Holder__Exclude_DecoyPSM;
        const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Exclude_DecoyPSM;

        return this._get_PSM_FilterableAnnotationData_Unfiltered__Holder({
            psmFilterableAnnotationTypeIds_Requested,
            include_DecoyPSM,
            get_PSM_FilterableAnnotationData_Holder,
            webserviceRetrievals_InProgress
        });
    }

    //////////////////

    //  Internal methods

    /**
     *
     * @param psmFilterableAnnotationTypeIds_Requested
     * @param psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder
     * @param webserviceRetrievals_InProgress
     * @private
     */
    private _get_PSM_FilterableAnnotationData_Unfiltered__Holder(
        {
            psmFilterableAnnotationTypeIds_Requested, include_DecoyPSM,
            get_PSM_FilterableAnnotationData_Holder, webserviceRetrievals_InProgress
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
            include_DecoyPSM: boolean
            get_PSM_FilterableAnnotationData_Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
            webserviceRetrievals_InProgress: Internal_WebserviceRetrieval_InProgress__All_For_Include_Or_Exclude
        }
    ) :
        {
            data: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult>
        } {

        const psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded = new Set(psmFilterableAnnotationTypeIds_Requested);  //  will delete from set

        for (const psmFilterableAnnotationTypeId_Requested of psmFilterableAnnotationTypeIds_Requested) {

            if (get_PSM_FilterableAnnotationData_Holder.is_psmFilterableAnnotationTypeId_Loaded(psmFilterableAnnotationTypeId_Requested)) {
                // already loaded
                psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded.delete(psmFilterableAnnotationTypeId_Requested);
            }
        }

        if (psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded.size === 0) {

            //  Data already loaded so return data
            return {                    // EARLY RETURN
                promise: undefined,
                data: {
                    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: get_PSM_FilterableAnnotationData_Holder
                }};
        }


        //  Find all existing requests in progress that contain   psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded

        let psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests = new Set(psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded);  //  will delete from set

        const promises_ToIncludeForThisRequest: Array<Promise<void>> = [];

        for ( const webserviceRetrieval_InProgress of webserviceRetrievals_InProgress.getItems() ) {

            let foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest = false;
            for ( const psmFilterableAnnotationTypeId_Requested_InProgress of webserviceRetrieval_InProgress.psmFilterableAnnotationTypeIds_Requested ) {
                if ( psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests.delete( psmFilterableAnnotationTypeId_Requested_InProgress ) ) {
                    foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest = true;
                }
            }
            if ( foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest ) {
                promises_ToIncludeForThisRequest.push( webserviceRetrieval_InProgress.promise );
            }
        }

        if ( psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests.size > 0 ) {
            //  Still have psmFilterableAnnotationTypeIds to get data for

            const promise = this._loadDataFor_psmFilterableAnnotationTypeIds_Requested({
                psmFilterableAnnotationTypeIds_Requested: psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests,
                include_DecoyPSM
            });

            //  Add promise to promises_ToIncludeForThisRequest

            promises_ToIncludeForThisRequest.push( promise );

            //  Save Request to Retrievals in Progress

            const item : Internal_WebserviceRetrieval_InProgress_Item = {
                promise,
                psmFilterableAnnotationTypeIds_Requested: psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests
            }

            webserviceRetrievals_InProgress.add( item );
        }

        return {
            data: undefined,
            promise: new Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult>(
                (resolve, reject) => { try {
                    const promise = Promise.all( promises_ToIncludeForThisRequest )
                    promise.catch( reason => {
                        reject(reason);
                    })
                    promise.then( noData => {
                        const result : CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData__get_PSM_FilterableAnnotationData_Holder__FunctionResult = {
                            psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: get_PSM_FilterableAnnotationData_Holder
                        }
                        resolve( result );
                    })
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _loadDataFor_psmFilterableAnnotationTypeIds_Requested(
        {
            psmFilterableAnnotationTypeIds_Requested, include_DecoyPSM
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
            include_DecoyPSM: boolean
        }
    ) : Promise<void> {

        try {
            const psmFilterableAnnotationTypeIds = Array.from( psmFilterableAnnotationTypeIds_Requested );

            const promise = new Promise<void>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId: this._projectSearchId,
                        psmFilterableAnnotationTypeIds,
                        include_DecoyPSM
                    };

                    const url = "d/rws/for-page/psb/psm-filterable-annotation-data--no-filtering--single-project-search-id-version-0004";

                    console.log( "START: AJAX Call to: getting data from URL: " + url );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { try {

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        { //  Always clear "Exclude Decoy

                            const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Exclude_DecoyPSM;

                            webserviceRetrievals_InProgress.removeFrom__webserviceRetrievals_InProgress_Array({ promise })
                        }

                        if ( include_DecoyPSM ) {

                            //  Decoy requested so also clear Decoy

                            const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Include_DecoyPSM;

                            webserviceRetrievals_InProgress.removeFrom__webserviceRetrievals_InProgress_Array({ promise })
                        }

                        reject();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                        { //  Always store in "Exclude Decoy" since Webservice result for "Include Decoy" will contain all entries needed in "Exclude Decoy"

                            this._process_WebserviceResponse({
                                responseData, include_DecoyPSM: false, psmFilterableAnnotationTypeIds_Requested
                            });

                            const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Exclude_DecoyPSM;

                            webserviceRetrievals_InProgress.removeFrom__webserviceRetrievals_InProgress_Array({ promise })
                        }

                        if ( include_DecoyPSM ) {

                            //  Decoy requested so also store in Decoy
                            this._process_WebserviceResponse({
                                responseData, include_DecoyPSM, psmFilterableAnnotationTypeIds_Requested
                            });

                            const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Include_DecoyPSM;

                            webserviceRetrievals_InProgress.removeFrom__webserviceRetrievals_InProgress_Array({ promise })
                        }

                        resolve();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            {  //  Save Exclude promise

                const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Exclude_DecoyPSM;

                const webserviceRetrieval_InProgress_Item : Internal_WebserviceRetrieval_InProgress_Item = {
                    promise, psmFilterableAnnotationTypeIds_Requested
                };
                webserviceRetrievals_InProgress.add(webserviceRetrieval_InProgress_Item );
            }

            if ( include_DecoyPSM ) {
                //  Save Include promise

                const webserviceRetrievals_InProgress = this._webserviceRetrievals_InProgress__Include_DecoyPSM;

                const webserviceRetrieval_InProgress_Item : Internal_WebserviceRetrieval_InProgress_Item = {
                    promise, psmFilterableAnnotationTypeIds_Requested
                };
                webserviceRetrievals_InProgress.add(webserviceRetrieval_InProgress_Item );
            }

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
    private _process_WebserviceResponse(
        {
            responseData, include_DecoyPSM, psmFilterableAnnotationTypeIds_Requested
        }: {
            responseData: any
            include_DecoyPSM: boolean
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }) : void {

        { //  Always process "Exclude Decoy" for results

            const include_DecoyPSM_Process_WebserviceResponse = false;
            const psm_FilterableAnnotationData_Holder = this._get_PSM_FilterableAnnotationData_Holder__Exclude_DecoyPSM;

            this._process_WebserviceResponse__Include_Or_Exclude_DecoyPSM({
                responseData, include_DecoyPSM_Process_WebserviceResponse, psmFilterableAnnotationTypeIds_Requested, psm_FilterableAnnotationData_Holder
            });
        }

        if ( include_DecoyPSM ) {

            //  "Include Decoy" requested so process Include

            const include_DecoyPSM_Process_WebserviceResponse = true;
            const psm_FilterableAnnotationData_Holder = this._get_PSM_FilterableAnnotationData_Holder__Include_DecoyPSM;

            this._process_WebserviceResponse__Include_Or_Exclude_DecoyPSM({
                responseData, include_DecoyPSM_Process_WebserviceResponse, psmFilterableAnnotationTypeIds_Requested, psm_FilterableAnnotationData_Holder
            });
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse__Include_Or_Exclude_DecoyPSM(
        {
            responseData, include_DecoyPSM_Process_WebserviceResponse, psmFilterableAnnotationTypeIds_Requested, psm_FilterableAnnotationData_Holder
        }: {
            responseData: any
            include_DecoyPSM_Process_WebserviceResponse: boolean
            psmFilterableAnnotationTypeIds_Requested: Set<number>
            psm_FilterableAnnotationData_Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
        }) : void {

        const include_DecoyPSM_Requested = responseData.include_DecoyPSM_Requested as boolean
        const psmFilterableAnnotationTypeIds_InReturnedOrder = responseData.psmFilterableAnnotationTypeIds_InReturnedOrder as Array<number>

        const psmCount = responseData.psmCount as number
        const starting_PsmId = responseData.starting_PsmId as number
        const psmIds_OffsetFromPrevious_WhenNotSequential = responseData.psmIds_OffsetFromPrevious_WhenNotSequential as Array<number>
        const annotationValuesList_PerAnnotationTypeList = responseData.annotationValuesList_PerAnnotationTypeList as Array<Array<number>>

        const psm_Is_IndependentDecoy = responseData.psm_Is_IndependentDecoy as Array<boolean>
        const psm_Is_Decoy = responseData.psm_Is_Decoy as Array<boolean>


        if ( ! psmFilterableAnnotationTypeIds_InReturnedOrder ) {
            const msg = "( ! psmFilterableAnnotationTypeIds_InReturnedOrder )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( psmFilterableAnnotationTypeIds_InReturnedOrder instanceof Array ) ) {
            const msg = "( ! ( psmFilterableAnnotationTypeIds_InReturnedOrder instanceof Array ) )";
            console.warn( msg );
            throw Error( msg );
        }
        for ( const psmFilterableAnnotationTypeId_Returned of psmFilterableAnnotationTypeIds_InReturnedOrder ) {
            if ( ! limelight__variable_is_type_number_Check( psmFilterableAnnotationTypeId_Returned ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( psmFilterableAnnotationTypeId_Returned ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( ! psmCount ) {
            const msg = "( ! psmCount )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! limelight__variable_is_type_number_Check( psmCount ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( psmCount ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! starting_PsmId ) {
            const msg = "( ! starting_PsmId )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! limelight__variable_is_type_number_Check( starting_PsmId ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( starting_PsmId ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( psmIds_OffsetFromPrevious_WhenNotSequential ) {
            if ( ! ( psmIds_OffsetFromPrevious_WhenNotSequential instanceof Array ) ) {
                const msg = "( ! ( psmIds_OffsetFromPrevious_WhenNotSequential instanceof Array ) )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( psmIds_OffsetFromPrevious_WhenNotSequential.length !== psmCount ) {
                const msg = "( psmIds_WhenNotSequential.length !== psmCount )";
                console.warn( msg );
                throw Error( msg );
            }
            for ( const psmIds_OffsetFromPrevious_WhenNotSequential_Entry of psmIds_OffsetFromPrevious_WhenNotSequential ) {
                if ( ! limelight__variable_is_type_number_Check( psmIds_OffsetFromPrevious_WhenNotSequential_Entry ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( psmIds_OffsetFromPrevious_WhenNotSequential_Entry ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        if ( ! annotationValuesList_PerAnnotationTypeList ) {
            const msg = "( ! annotationValuesList_PerAnnotationTypeList )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( annotationValuesList_PerAnnotationTypeList instanceof Array ) ) {
            const msg = "( ! ( annotationValuesList_PerAnnotationTypeList instanceof Array ) )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( annotationValuesList_PerAnnotationTypeList.length !== psmFilterableAnnotationTypeIds_InReturnedOrder.length ) {
            const msg = "( annotationValuesList_PerAnnotationTypeList.length !== psmFilterableAnnotationTypeIds_InReturnedOrder.length )";
            console.warn( msg );
            throw Error( msg );
        }
        for ( const annotationValuesList_PerAnnotationTypeList_InnerArray of annotationValuesList_PerAnnotationTypeList ) {
            if ( ! ( annotationValuesList_PerAnnotationTypeList_InnerArray instanceof Array ) ) {
                const msg = "( ! ( annotationValuesList_PerAnnotationTypeList_InnerArray instanceof Array ) )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( annotationValuesList_PerAnnotationTypeList_InnerArray.length !== psmCount ) {
                const msg = "( annotationValuesList_PerAnnotationTypeList_InnerArray.length !== psmCount )";
                console.warn( msg );
                throw Error( msg );
            }
            for ( const annotationValuesList_PerAnnotationTypeList_InnerArrayEntry of annotationValuesList_PerAnnotationTypeList_InnerArray ) {
                if ( ! limelight__variable_is_type_number_Check( annotationValuesList_PerAnnotationTypeList_InnerArrayEntry ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( annotationValuesList_PerAnnotationTypeList_InnerArrayEntry ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        if ( psm_Is_IndependentDecoy ) {
            if ( ! ( psm_Is_IndependentDecoy instanceof Array ) ) {
                const msg = "( ! ( psm_Is_IndependentDecoy instanceof Array ) )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( psm_Is_IndependentDecoy.length !== psmCount ) {
                const msg = "( psm_Is_IndependentDecoy.length !== psmCount )";
                console.warn( msg );
                throw Error( msg );
            }
        }
        if ( psm_Is_Decoy ) {
            if ( ! ( psm_Is_Decoy instanceof Array ) ) {
                const msg = "( ! ( psm_Is_Decoy instanceof Array ) )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( psm_Is_Decoy.length !== psmCount ) {
                const msg = "( psm_Is_Decoy.length !== psmCount )";
                console.warn( msg );
                throw Error( msg );
            }
        }

        let psmId_Previous = 0  // Initialize to zero to add next offset.  Only used with psmIds_OffsetFromPrevious_WhenNotSequential

        for ( let psmIndex = 0; psmIndex < psmCount; psmIndex++ ) {

            if ( psm_Is_Decoy ) {
                if ( psm_Is_Decoy[ psmIndex ] && ( ! include_DecoyPSM_Process_WebserviceResponse ) ) {
                    //  PSM is decoy and NOT include Decoy so skip
                    continue;  // EARLY CONTINUE
                }
            }

            let psmId = starting_PsmId + psmIndex

            if ( psmIds_OffsetFromPrevious_WhenNotSequential ) {
                psmId = psmIds_OffsetFromPrevious_WhenNotSequential[ psmIndex ] + psmId_Previous
            }

            psmId_Previous = psmId

            let per_Psm_Holder_Entry = psm_FilterableAnnotationData_Holder.get_Per_Psm_Holder_For_PsmId( psmId );
            if ( ! per_Psm_Holder_Entry ) {
                per_Psm_Holder_Entry = new  CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId({ psmId });
                psm_FilterableAnnotationData_Holder.set_Per_Psm_Holder_For_PsmId( per_Psm_Holder_Entry );
            } else {
                var z = 0
            }

            for ( let psmFilterableAnnotationTypeIds_InReturnedOrder_Index = 0; psmFilterableAnnotationTypeIds_InReturnedOrder_Index < psmFilterableAnnotationTypeIds_InReturnedOrder.length ; psmFilterableAnnotationTypeIds_InReturnedOrder_Index++  ) {

                const psmFilterableAnnotationTypeId = psmFilterableAnnotationTypeIds_InReturnedOrder[ psmFilterableAnnotationTypeIds_InReturnedOrder_Index ]
                const annotationValuesList = annotationValuesList_PerAnnotationTypeList[ psmFilterableAnnotationTypeIds_InReturnedOrder_Index ]
                const annotationValueNumber = annotationValuesList[ psmIndex ]

                let decoyPSM = false
                let independentDecoyPSM = false

                if ( psm_Is_Decoy ) {
                    decoyPSM = psm_Is_Decoy[ psmIndex ]
                }
                if ( psm_Is_IndependentDecoy ) {
                    independentDecoyPSM = psm_Is_IndependentDecoy[ psmIndex ]
                }

                const entry_ForSingleAnnotationTypeId: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder__ForSingleAnnotationTypeId = {
                    annotationTypeId: psmFilterableAnnotationTypeId, annotationValueNumber, psmId, decoyPSM, independentDecoyPSM
                }
                per_Psm_Holder_Entry.set_PsmFilterableAnnotationData( entry_ForSingleAnnotationTypeId );
            }

        }

        for ( const psmFilterableAnnotationTypeId of psmFilterableAnnotationTypeIds_Requested ) {
            psm_FilterableAnnotationData_Holder.add_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId );
        }
    }


}

/**
 * Internal Class to track All "retrieval" from server for Include or Exclude
 */
class Internal_WebserviceRetrieval_InProgress__All_For_Include_Or_Exclude {

    private _webserviceRetrievals_InProgress: Array<Internal_WebserviceRetrieval_InProgress_Item> = []

    /**
     *
     * @param item
     */
    add( item: Internal_WebserviceRetrieval_InProgress_Item) {
        this._webserviceRetrievals_InProgress.push( item )
    }

    /**
     *
     */
    getItems() : IterableIterator<Internal_WebserviceRetrieval_InProgress_Item> {
        return this._webserviceRetrievals_InProgress.values()
    }

    /**
     * Remove entry in this._webserviceRetrievals_InProgress containing any of psmFilterableAnnotationTypeIds_Requested
     */
    removeFrom__webserviceRetrievals_InProgress_Array(
        {
            promise
        } : {
            promise: Promise<void>
        }
    ) : void {

        this._webserviceRetrievals_InProgress =
            this._webserviceRetrievals_InProgress.filter( entry => {
                if (entry.promise === promise ) {
                    // Remove entry with same promise reference
                    return false
                }
                return true
            });
    }
}

/**
 * Internal Class to track a single "retrieval" from server
 */
class Internal_WebserviceRetrieval_InProgress_Item {

    psmFilterableAnnotationTypeIds_Requested: Set<number>
    promise: Promise<void>
}
