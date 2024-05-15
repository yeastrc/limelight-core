/**
 * commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts
 *
 * For Single Project Search  -  SearchSubGroupId_ForPSM_ID
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
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder {

    //  Sub Group Id for a PSM Id
    private _subGroupIdMap_Key_PsmId : Map<number,number>; // - Map<PSM Id, Sub Group Id>

    /**
     *
     */
    constructor(
        {
            subGroupIdMap_Key_PsmId
        } : {
            //  Sub Group Id for a PSM Id
            subGroupIdMap_Key_PsmId : Map<number,number>; // - Map<PSM Id, Sub Group Id>
        }
    ) {
        this._subGroupIdMap_Key_PsmId = subGroupIdMap_Key_PsmId;
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
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult {

    searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering

    //

    private _searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
    private _searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder

    private _promise_WebserviceRetrieval_InProgress__Include_DecoyPSM: Promise<void>
    private _promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM: Promise<void>

    /**
     *
     * @param projectSearchId
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
        return new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        });
    }

    ///////////


    /**
     * !!!  Always return promise
     *
     * Get all for search
     */
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Include_DecoyPSMs__ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult> {
        try {
            const result = this.get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Include_DecoyPSMs();

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
     * Get all for search
     */
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Include_DecoyPSMs():
        {
            data: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>
        } {

        if (this._searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM) {

            //  Have loaded data so just return it
            return {
                data: {
                    searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM
                },
                promise: undefined
            };
        }

        if ( this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM ) {

            const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
                this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM.catch(reason => reject(reason))
                this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM.then(noValue => { try {
                    resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM } );
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return { data: undefined, promise } // EARLY RETURN
        }

        const include_DecoyPSM = true;

        const promise_Loading = this._load_SearchSubGroupId_ForPSM_ID_Data({ include_DecoyPSM });

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason))
            promise_Loading.then(noValue => { try {
                    resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM } );
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }


    /**
     * !!!  Always return promise
     *
     * Get all for search
     */
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Exclude_DecoyPSMs__ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult> {
        try {
            const result = this.get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Exclude_DecoyPSMs();

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
     * Get all for search
     */
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__Exclude_DecoyPSMs():
        {
            data: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>
        } {

        if (this._searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM) {

            //  Have loaded data so just return it
            return {
                data: {
                    searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM
                },
                promise: undefined
            };
        }

        if ( this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM ) {

            const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
                this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM.catch(reason => reject(reason))
                this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM.then(noValue => { try {
                    resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM } );
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return { data: undefined, promise } // EARLY RETURN
        }

        const include_DecoyPSM = false;

        const promise_Loading = this._load_SearchSubGroupId_ForPSM_ID_Data({ include_DecoyPSM });

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason))
            promise_Loading.then(noValue => { try {
                resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM } );
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_SearchSubGroupId_ForPSM_ID_Data(
        {
            include_DecoyPSM
        } : {
            include_DecoyPSM: boolean
        }
    ) : Promise<void> {
        try {
            const promise = new Promise<void>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        include_DecoyPSM
                    };

                    const url = "d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0003";

                    console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0003 START, Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM = undefined

                        if ( include_DecoyPSM ) {

                            this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM = undefined
                        }

                        reject()
                    }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0003 END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData, include_DecoyPSM });

                            this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM = undefined

                            if ( include_DecoyPSM ) {

                                this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM = undefined
                            }

                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


            this._promise_WebserviceRetrieval_InProgress__Exclude_DecoyPSM = promise

            if ( include_DecoyPSM ) {

                this._promise_WebserviceRetrieval_InProgress__Include_DecoyPSM = promise
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
            responseData, include_DecoyPSM
        }: {
            responseData: any
            include_DecoyPSM: boolean
        }) : void {

        { //  Always process "Exclude Decoy" for results

            const include_DecoyPSM_Process_WebserviceResponse = false;

            const searchSubGroupId_ForPSM_ID_Holder = this._process_WebserviceResponse__Include_Or_Exclude_DecoyPSM({
                responseData, include_DecoyPSM_Process_WebserviceResponse
            });

            this._searchSubGroupId_ForPSM_ID_Holder__Exclude_DecoyPSM = searchSubGroupId_ForPSM_ID_Holder
        }

        if ( include_DecoyPSM ) {

            //  "Include Decoy" requested so process Include

            const include_DecoyPSM_Process_WebserviceResponse = true;

            const searchSubGroupId_ForPSM_ID_Holder = this._process_WebserviceResponse__Include_Or_Exclude_DecoyPSM({
                responseData, include_DecoyPSM_Process_WebserviceResponse
            });

            this._searchSubGroupId_ForPSM_ID_Holder__Include_DecoyPSM = searchSubGroupId_ForPSM_ID_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse__Include_Or_Exclude_DecoyPSM(
        {
            responseData, include_DecoyPSM_Process_WebserviceResponse
        }: {
            responseData: any
            include_DecoyPSM_Process_WebserviceResponse: boolean
        }) : CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder {

        const results = responseData.results;

        //  Sub Group Id for a PSM Id
        const subGroupIdMap_Key_PsmId : Map<number,number> = new Map(); // - Map<PSM Id, Sub Group Id>

        for ( const result_Entry of results ) {

            if ( ! limelight__variable_is_type_number_Check( result_Entry.sSbGpId ) ) {
                const msg = "result_Entry.rPId not numeric: " + result_Entry.sSbGpId;
                console.warn( msg );
                throw Error( msg )
            }
            if ( ! limelight__variable_is_type_number_Check( result_Entry.psmId ) ) {
                const msg = "result_Entry.psmId not numeric: " + result_Entry.psmId;
                console.warn( msg );
                throw Error( msg )
            }

            const searchSubGroupId = result_Entry.sSbGpId;
            const psmId = result_Entry.psmId;
            const decoyPSM = result_Entry.decoyPSM as boolean;

            if ( decoyPSM && ( ! include_DecoyPSM_Process_WebserviceResponse ) ) {
                //  PSM is decoy and NOT include Decoy so skip

                continue;  // EARLY CONTINUE
            }

            subGroupIdMap_Key_PsmId.set( psmId, searchSubGroupId );
        }

        const searchSubGroupId_ForPSM_ID_Holder = new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder({
            subGroupIdMap_Key_PsmId
        })

        return searchSubGroupId_ForPSM_ID_Holder;
    }

}