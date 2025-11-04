/**
 * commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences.ts
 *
 * Across all Searches - For ReportedPeptideSequences
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches";

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder {

    private _reportedPeptideSequence_Key_ReportedPeptideId : Map<number, string> = new Map()

    constructor() {}

    /**
     * @param reportedPeptideId
     */
    get_ReportedPeptideSequence_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._reportedPeptideSequence_Key_ReportedPeptideId.get(reportedPeptideId)
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry(
        {
            reportedPeptideId, reportedPeptideSequence
        } : {
            reportedPeptideId: number
            reportedPeptideSequence: string
        }
    ) {
        this._reportedPeptideSequence_Key_ReportedPeptideId.set( reportedPeptideId, reportedPeptideSequence )
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     */
    InternalUse__Get_ReportedPeptideIds() {
        return this._reportedPeptideSequence_Key_ReportedPeptideId.keys()
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult {

    reportedPeptideSequences_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences {

    //  !! If these values change, then create a new instance of this class
    private _projectSearchIds: Array<number>

    //  'Parent' Class Object
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches

    // Retrieved data to be returned
    private _reportedPeptide_Sequences_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder = new CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder()

    //

    private _reportedPeptideIds_LoadingInProgress: Set<number> = new Set()      // Loading data in progress for these reportedPeptideIds

    private _loadingInProgress_Promises: Array<Promise<void>> = []              // Promises for loading in progress

    /**
     *
     */
    private constructor(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        this._projectSearchIds = projectSearchIds
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
    }

    /**
     * Create New Instance
     *
     */
    static getNewInstance(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        return new CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences({
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_ReportedPeptideSequences_ReturnPromise(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult> {

        const result = this.get_ReportedPeptideSequences({ reportedPeptideIds });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }

    /**
     *
     */
    get_ReportedPeptideSequences(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ):
        {
            data: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult>
        } {

        //  Test 1: if data already loaded, return current Holder

        {
            let foundAll_reportedPeptideIds = true;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( ! this._reportedPeptide_Sequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId ) ) {
                    foundAll_reportedPeptideIds = false;
                    break;
                }
            }
            if ( foundAll_reportedPeptideIds ) {
                //  All Data currently loaded so return Holder

                //  EARLY RETURN
                return { promise: undefined, data: { reportedPeptideSequences_Holder: this._reportedPeptide_Sequences_Holder } }
            }
        }

        //  Test 2: if data already loaded or already loading, return promise based on existing promises

        {
            let foundAll_reportedPeptideIds = true;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( ( ! this._reportedPeptide_Sequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId ) ) && ( ! this._reportedPeptideIds_LoadingInProgress.has( reportedPeptideId ) ) ) {
                    foundAll_reportedPeptideIds = false;
                    break;
                }
            }

            if ( foundAll_reportedPeptideIds ) {
                //  All Data currently loaded or in progress to load  so return Promise that waits for existing promises

                if ( this._loadingInProgress_Promises.length === 0 ) {
                    const msg = "Found all reportedPeptideIds and annotationTypeIds in either loaded or loading but no entries in this._loadingInProgress_Promises"
                    console.warn(msg);
                    throw Error(msg)
                }

                //  EARLY RETURN
                return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult>(
                        (resolve, reject) => { try {
                            const promises_All = Promise.all(this._loadingInProgress_Promises)
                            promises_All.catch(reason => reject(reason))
                            promises_All.then(noValue => { try {
                                resolve({
                                    reportedPeptideSequences_Holder: this._reportedPeptide_Sequences_Holder
                                })
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            }
        }

        //  NO tests passed so load requested data, after removing existing loaded and loading data.  If requested data in loading data, Include all existing promises as dependencies

        {
            const reportedPeptideIds_ToGet = new Set<number>( reportedPeptideIds )  // Make copy into "ToGet"

            let foundAny_In__LoadingInProgress = false;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( this._reportedPeptideIds_LoadingInProgress.has( reportedPeptideId ) ) {
                    foundAny_In__LoadingInProgress = true;
                    break;
                }
            }

            //  Remove loaded reportedPeptideIds
            for ( const reportedPeptideId of this._reportedPeptide_Sequences_Holder.InternalUse__Get_ReportedPeptideIds() ) {
                reportedPeptideIds_ToGet.delete(reportedPeptideId)
            }
            //  Remove loading in progress reportedPeptideIds
            for ( const reportedPeptideId of this._reportedPeptideIds_LoadingInProgress ) {
                reportedPeptideIds_ToGet.delete(reportedPeptideId)
            }

            let promise_ToWaitFor: Promise<unknown> = this._load_reportedPeptideIds_ToGet({ reportedPeptideIds_ToGet });

            if ( foundAny_In__LoadingInProgress ) {
                //  Also need to wait for other Promises in progress

                //  this._loadingInProgress_Promises  already contains promise_ToWaitFor returned from this._load_reportedPeptideIds_ToGet

                const promises_CombinedToWaitFor_All = Promise.all( this._loadingInProgress_Promises )
                promise_ToWaitFor = promises_CombinedToWaitFor_All
            }

            //  EARLY RETURN
            return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder__FunctionResult>(
                    (resolve, reject) => { try {
                        promise_ToWaitFor.catch(reason => reject(reason))
                        promise_ToWaitFor.then(noValue => { try {
                            resolve({
                                reportedPeptideSequences_Holder: this._reportedPeptide_Sequences_Holder
                            })
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     *
     * @param promise
     */
    private _add_Promise_To__loadingInProgress_Promises( promise: Promise<void> ) : void {

        this._loadingInProgress_Promises.push(promise)
    }

    /**
     *
     * @param promise
     * @returns - found_Promise = false if not found in this._loadingInProgress_Promises
     */
    private _remove_Promise_From__loadingInProgress_Promises( promise: Promise<void> ) : {
        found_Promise: boolean
    } {
        let found_Promise = false;

        this._loadingInProgress_Promises = this._loadingInProgress_Promises.filter(value => {
            if ( value === promise ) {
                found_Promise = true;
                return false // Remove element
            }
            return true // keep element
        })

        return { found_Promise }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_reportedPeptideIds_ToGet(
        {
            reportedPeptideIds_ToGet
        } : {
            reportedPeptideIds_ToGet: Set<number>
        }
    ) : Promise<void> {
        try {
            const reportedPeptideIds = Array.from( reportedPeptideIds_ToGet );

            const promise = new Promise<void>( ( resolve, reject ) => {
                try {
                    let requestObject = {
                        projectSearchIds : this._projectSearchIds,
                        reportedPeptideIds : reportedPeptideIds,
                    };

                    console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( (reason) => {

                        //  Remove this promise
                        this._remove_Promise_From__loadingInProgress_Promises( promise )

                        reject(reason)
                    }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids END, Now: " + new Date() );

                            //  Remove this promise

                            if ( this._remove_Promise_From__loadingInProgress_Promises(promise) ) {

                            }

                            this._process_WebserviceResponse({ responseData, reportedPeptideIdsToLoadReportedPeptideStringsFor: reportedPeptideIds_ToGet });

                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            this._add_Promise_To__loadingInProgress_Promises(promise)

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
    private _process_WebserviceResponse({ responseData, reportedPeptideIdsToLoadReportedPeptideStringsFor }: { responseData: any, reportedPeptideIdsToLoadReportedPeptideStringsFor: Set<number> }) : void {

        const reportedPeptideStrings_Key_reportedPeptideId = responseData.reportedPeptideStrings
            // foundAllReportedPeptideIdsForProjectSearchIds  responseData.foundAllReportedPeptideIdsForProjectSearchIds

        for ( const reportedPeptideId of reportedPeptideIdsToLoadReportedPeptideStringsFor ) {

            const reportedPeptideString = reportedPeptideStrings_Key_reportedPeptideId[reportedPeptideId];
            if (reportedPeptideString === undefined) {
                throw Error("No reportedPeptideString for reportedPeptideId: " + reportedPeptideId);
            }

            this._reportedPeptideIds_LoadingInProgress.delete(reportedPeptideId)

            this._reportedPeptide_Sequences_Holder.InternalUse__InsertEntry({
                reportedPeptideId,
                reportedPeptideSequence: reportedPeptideString.reportedPeptideString
            })
        }

    }

}