/**
 * commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered.ts
 *
 * For Single Project Search  -  SearchSubGroupId For PSM ID - Including Decoys if search has decoys
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

    private _searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder

    private _promise_WebserviceRetrieval_InProgress: Promise<void>

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
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult> {
        try {
            const result = this.get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch();

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
    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>
        } {

        if (this._searchSubGroupId_ForPSM_ID_Holder) {

            //  Have loaded data so just return it
            return {
                data: {
                    searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder
                },
                promise: undefined
            };
        }

        if ( this._promise_WebserviceRetrieval_InProgress ) {

            const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
                this._promise_WebserviceRetrieval_InProgress.catch(reason => reject(reason))
                this._promise_WebserviceRetrieval_InProgress.then(noValue => { try {
                    resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder } );
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return { data: undefined, promise } // EARLY RETURN
        }

        const promise_Loading = this._load_SearchSubGroupId_ForPSM_ID_Data();

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered__get_SearchSubGroupId_ForPSM_ID__FunctionResult>( (resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason))
            promise_Loading.then(noValue => { try {
                    resolve({ searchSubGroupId_ForPSM_ID_Holder: this._searchSubGroupId_ForPSM_ID_Holder } );
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

    private _load_SearchSubGroupId_ForPSM_ID_Data() : Promise<void> {
        try {
            const promise = new Promise<void>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId
                    };

                    const url = "d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0004";

                    console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0003 START, Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        this._promise_WebserviceRetrieval_InProgress = undefined

                        reject()
                    }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0003 END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });

                            this._promise_WebserviceRetrieval_InProgress = undefined

                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


            this._promise_WebserviceRetrieval_InProgress = promise

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
            responseData
        }: {
            responseData: any
        }) {


        const webserviceResponse = responseData as INTERNAL__WebserviceResponse_Root_Class

        //  Separate searchSubGroupIds_Base36 into its entries
        const searchSubGroupIds_Base36_String_Entries: Array<string> = []

        {
            const stringLength = webserviceResponse.searchSubGroupIds_Base36_EachEntryLength
            let stringStart = 0

            while ( stringStart < webserviceResponse.searchSubGroupIds_Base36.length ) {

                const searchSubGroupIds_Base36_Entry = webserviceResponse.searchSubGroupIds_Base36.substring( stringStart, stringStart + stringLength )

                searchSubGroupIds_Base36_String_Entries.push( searchSubGroupIds_Base36_Entry )

                stringStart += stringLength
            }
        }

        //  Sub Group Id for a PSM Id
        const subGroupIdMap_Key_PsmId : Map<number,number> = new Map(); // - Map<PSM Id, Sub Group Id>

        {
            let prev_PsmId = undefined

            for ( let index = 0; index < searchSubGroupIds_Base36_String_Entries.length; index++ ) {

                const searchSubGroupIds_Base36_String_Entry = searchSubGroupIds_Base36_String_Entries[ index ]
                const searchSubGroupId = Number.parseInt( searchSubGroupIds_Base36_String_Entry, webserviceResponse.searchSubGroupIds_Base36_Radix_Number )

                let psmId: number = undefined

                if ( index == 0 ) {
                    //  First entry so always starting PSM Id
                    psmId = webserviceResponse.startingPsmId

                } else {
                    // NOT First entry

                    if ( webserviceResponse.all_PsmId_AreSequential ) {
                        //  YES sequential so increment
                        psmId = prev_PsmId + 1
                    } else {
                        //  NO sequential so compute
                        psmId = prev_PsmId + ( webserviceResponse.psmIds_OffsetFromStartOrPrevious[ index ])
                    }
                }

                subGroupIdMap_Key_PsmId.set( psmId, searchSubGroupId )

                prev_PsmId = psmId
            }
        }

        const searchSubGroupId_ForPSM_ID_Holder = new CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder({
            subGroupIdMap_Key_PsmId
        })

        this._searchSubGroupId_ForPSM_ID_Holder = searchSubGroupId_ForPSM_ID_Holder
    }

}


class INTERNAL__WebserviceResponse_Root_Class {

    all_PsmId_AreSequential: boolean
    startingPsmId: number

    /**
     * Populated ONLY if all_PsmId_AreSequential is false
     *
     * First entry is offset from startingPsmId and is always zero
     * Following entries are offset from previous psmId
     */
    psmIds_OffsetFromStartOrPrevious: Array<number>

    searchSubGroupIds_Base36_Radix_Number: number

    searchSubGroupIds_Base36: string

    searchSubGroupIds_Base36_EachEntryLength: number
}