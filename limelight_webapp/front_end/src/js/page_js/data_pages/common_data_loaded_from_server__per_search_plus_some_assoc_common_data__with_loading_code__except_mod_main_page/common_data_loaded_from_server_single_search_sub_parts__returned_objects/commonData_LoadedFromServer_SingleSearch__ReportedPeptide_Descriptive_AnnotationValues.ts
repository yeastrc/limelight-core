/**
 * commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues.ts
 *
 * For Single Project Search  -  ReportedPeptide_Descriptive_AnnotationValues
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId {
    annotationTypeId: number
    valueString : string
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId {

    readonly reportedPeptideId : number

    //  	Reported Peptide Level Descriptive Annotation Data Per Annotation Type Id
    // 					- <annTypeId,{ valueString }>
    private _reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId :
        Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId> = new Map();

    constructor({ reportedPeptideId} : { reportedPeptideId : number}) {
        this.reportedPeptideId = reportedPeptideId;
    }

    /**
     * @param reportedPeptideId
     */
    get_ReportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId(annotationTypeId: number) {
        return this._reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.get(annotationTypeId)
    }

    /**
     * @param reportedPeptideId
     */
    get_ReportedPeptide_Descriptive_AnnotationValues_All() {
        return this._reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.values()
    }


    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry( entry: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId ) {

        this._reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.set( entry.annotationTypeId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder {

    //  	Reported Peptide Level Descriptive Annotation Data Per Reported Peptide Id
    // 					- reportedPeptideId,<<annTypeId,{valueString }>>
    private _reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_ReportedPeptideId :
        Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId> = new Map()

    constructor() {}

    /**
     * @param reportedPeptideId
     */
    get_ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_ReportedPeptideId.get(reportedPeptideId)
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry( entry: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId ) {

        this._reportedPeptide_Descriptive_AnnotationValues_Key_AnnTypeId_Key_ReportedPeptideId.set( entry.reportedPeptideId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult {

    reportedPeptide_Descriptive_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    private _reportedPeptide_Descriptive_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder = new CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder()

    //

    private _reportedPeptideIds_Loaded_DataFor: Set<number> = new Set()
    private _reportedPeptideIds_LoadingInProgress: Set<number> = new Set()

    private _annotationTypeIds_Loaded_DataFor: Set<number> = new Set()
    private _annotationTypeIds_LoadingInProgress: Set<number> = new Set()

    private _loadingInProgress_Promises: Array<Promise<void>> = []

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        this._projectSearchId = projectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_ReportedPeptide_Descriptive_AnnotationValues_ReturnPromise(
        {
            reportedPeptideIds, annotationTypeIds
        } : {
            reportedPeptideIds: Set<number>
            annotationTypeIds: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult> {

        const result = this.get_ReportedPeptide_Descriptive_AnnotationValues({ reportedPeptideIds, annotationTypeIds });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }

    /**
     *
     */
    get_ReportedPeptide_Descriptive_AnnotationValues(
        {
            reportedPeptideIds, annotationTypeIds
        } : {
            reportedPeptideIds: Set<number>
            annotationTypeIds: Set<number>
        }
    ):
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult>
        } {

        //  Test 1: if data already loaded, return current Holder

        {
            let foundAll_reportedPeptideIds = true;
            let foundAll_annotationTypeIds = true;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( ! this._reportedPeptideIds_Loaded_DataFor.has( reportedPeptideId ) ) {
                    foundAll_reportedPeptideIds = false;
                    break;
                }
            }
            for ( const annotationTypeId of annotationTypeIds ) {
                if ( ! this._annotationTypeIds_Loaded_DataFor.has( annotationTypeId ) ) {
                    foundAll_annotationTypeIds = false;
                    break;
                }
            }

            if ( foundAll_reportedPeptideIds && foundAll_annotationTypeIds ) {
                //  All Data currently loaded so return Holder

                //  EARLY RETURN
                return { promise: undefined, data: { reportedPeptide_Descriptive_AnnotationValues_Holder: this._reportedPeptide_Descriptive_AnnotationValues_Holder } }
            }
        }

        //   Test 2:

        //   If have reportedPeptideIds loaded or loading AND the requested annotationTypeIds are NOT in the loaded or loading annotationTypeIds
        //      Then combine new reportedPeptideIds with loaded and loading reportedPeptideIds and combine annotationTypeIds with loaded and loading
        //         and make new request with combined reportedPeptideIds and annotationTypeIds.
        //      This will ensure that all reportedPeptideIds will have all annotationTypeIds

        if ( this._annotationTypeIds_Loaded_DataFor.size > 0 || this._annotationTypeIds_LoadingInProgress.size > 0 ) {

            //  Have annotationTypeIds loaded or loading in progress

            let foundAll_annotationTypeIds = true;

            if ( this._annotationTypeIds_Loaded_DataFor.size > 0 ) {
                //  Check loaded
                for ( const annotationTypeId of annotationTypeIds ) {
                    if ( ! this._annotationTypeIds_Loaded_DataFor.has( annotationTypeId ) ) {
                        foundAll_annotationTypeIds = false;
                        break;
                    }
                }
            }

            if ( this._annotationTypeIds_Loaded_DataFor.size > 0 ) {
                //  Check loading
                for ( const annotationTypeId of annotationTypeIds ) {
                    if ( ! this._annotationTypeIds_LoadingInProgress.has( annotationTypeId ) ) {
                        foundAll_annotationTypeIds = false;
                        break;
                    }
                }
            }

            if ( ! foundAll_annotationTypeIds ) {

                //  Found special case where data is loaded or in loading in progress for annotationTypeIds
                //  but new request has other annotationTypeIds.

                //  To ensure ALL reportedPeptideIds have data for ALL annotationTypeIds:
                //
                //      1: clear Array of In Progress Loading Promises since existing promises will NOT be for all data
                //
                //      2: make new webservice request for ALL reportedPeptideIds and ALL annotationTypeIds, for loaded and in progress Ids

                //      1: clear Array of In Progress Loading Promises since existing promises will NOT be for all data
                this._loadingInProgress_Promises = []

                //      2: make new webservice request for ALL reportedPeptideIds and ALL annotationTypeIds, for loaded and in progress Ids

                const reportedPeptideIds_ToGet = new Set<number>()
                const annotationTypeIds_ToGet = new Set<number>()

                //  Copy loaded reportedPeptideIds
                for ( const reportedPeptideId of this._reportedPeptideIds_Loaded_DataFor ) {
                    reportedPeptideIds_ToGet.add(reportedPeptideId)
                }
                //  Copy loading in progress reportedPeptideIds
                for ( const reportedPeptideId of this._reportedPeptideIds_LoadingInProgress ) {
                    reportedPeptideIds_ToGet.add(reportedPeptideId)
                }
                //  Copy loaded annotationTypeIds
                for ( const annotationTypeId of this._annotationTypeIds_Loaded_DataFor ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }
                //  Copy loading in progress annotationTypeIds
                for ( const annotationTypeId of this._annotationTypeIds_LoadingInProgress ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }

                //  Copy in new requested reportedPeptideIds and annotationTypeIds
                for ( const reportedPeptideId of reportedPeptideIds ) {
                    reportedPeptideIds_ToGet.add(reportedPeptideId)
                }
                for ( const annotationTypeId of annotationTypeIds ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }

                const promise = this._load_Annotation_Data({ reportedPeptideIds_ToGet, annotationTypeIds_ToGet });

                //  EARLY RETURN
                return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult>(
                        (resolve, reject) => { try {
                            promise.catch(reason => reject(reason))
                            promise.then(noValue => { try {
                                resolve({
                                    reportedPeptide_Descriptive_AnnotationValues_Holder: this._reportedPeptide_Descriptive_AnnotationValues_Holder
                                })
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            }
        }

        //  Test 3: if data already loaded or already loading, return promise based on existing promises

        {
            let foundAll_reportedPeptideIds = true;
            let foundAll_annotationTypeIds = true;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( ( ! this._reportedPeptideIds_Loaded_DataFor.has( reportedPeptideId ) ) && ( ! this._reportedPeptideIds_LoadingInProgress.has( reportedPeptideId ) ) ) {
                    foundAll_reportedPeptideIds = false;
                    break;
                }
            }
            for ( const annotationTypeId of annotationTypeIds ) {
                if ( ( ! this._annotationTypeIds_Loaded_DataFor.has( annotationTypeId ) ) && ( ! this._annotationTypeIds_LoadingInProgress.has( annotationTypeId ) ) ) {
                    foundAll_annotationTypeIds = false;
                    break;
                }
            }

            if ( foundAll_reportedPeptideIds && foundAll_annotationTypeIds ) {
                //  All Data currently loaded or in progress to load  so return Promise that waits for existing promises

                if ( this._loadingInProgress_Promises.length === 0 ) {
                    const msg = "Found all reportedPeptideIds and annotationTypeIds in either loaded or loading but no entries in this._loadingInProgress_Promises"
                    console.warn(msg);
                    throw Error(msg)
                }

                //  EARLY RETURN
                return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult>(
                        (resolve, reject) => { try {
                            const promises_All = Promise.all(this._loadingInProgress_Promises)
                            promises_All.catch(reason => reject(reason))
                            promises_All.then(noValue => { try {
                                resolve({
                                    reportedPeptide_Descriptive_AnnotationValues_Holder: this._reportedPeptide_Descriptive_AnnotationValues_Holder
                                })
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            }
        }

        //  NO tests passed so load requested data, after removing existing loaded and loading data.  If requested data in loading data, Include all existing promises as dependencies

        {
            const reportedPeptideIds_ToGet = new Set<number>( reportedPeptideIds )  // Make copy into "ToGet"
            const annotationTypeIds_ToGet = new Set<number>( annotationTypeIds )    // Make copy into "ToGet"

            let foundAny_In__LoadingInProgress = false;

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( this._reportedPeptideIds_LoadingInProgress.has( reportedPeptideId ) ) {
                    foundAny_In__LoadingInProgress = true;
                    break;
                }
            }
            if ( ! foundAny_In__LoadingInProgress ) {
                for ( const annotationTypeId of annotationTypeIds ) {
                    if ( this._annotationTypeIds_LoadingInProgress.has( annotationTypeId ) ) {
                        foundAny_In__LoadingInProgress = true;
                        break;
                    }
                }
            }

            //  Remove loaded reportedPeptideIds
            for ( const reportedPeptideId of this._reportedPeptideIds_Loaded_DataFor ) {
                reportedPeptideIds_ToGet.delete(reportedPeptideId)
            }
            //  Remove loading in progress reportedPeptideIds
            for ( const reportedPeptideId of this._reportedPeptideIds_LoadingInProgress ) {
                reportedPeptideIds_ToGet.delete(reportedPeptideId)
            }

            let promise_ToWaitFor: Promise<unknown> = this._load_Annotation_Data({ reportedPeptideIds_ToGet, annotationTypeIds_ToGet });

            if ( foundAny_In__LoadingInProgress ) {
                //  Also need to wait for other Promises in progress

                //  this._loadingInProgress_Promises  already contains promise_ToWaitFor returned from this._load_Annotation_Data

                const promises_CombinedToWaitFor_All = Promise.all( this._loadingInProgress_Promises )
                promise_ToWaitFor = promises_CombinedToWaitFor_All
            }

            //  EARLY RETURN
            return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder__FunctionResult>(
                    (resolve, reject) => { try {
                        promise_ToWaitFor.catch(reason => reject(reason))
                        promise_ToWaitFor.then(noValue => { try {
                            resolve({
                                reportedPeptide_Descriptive_AnnotationValues_Holder: this._reportedPeptide_Descriptive_AnnotationValues_Holder
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

        console.log("CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues: _remove_Promise_From__loadingInProgress_Promises: returned found_Promise: " + found_Promise )

        return { found_Promise }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_Annotation_Data(
        {
            reportedPeptideIds_ToGet, annotationTypeIds_ToGet
        } : {
            reportedPeptideIds_ToGet: Set<number>
            annotationTypeIds_ToGet: Set<number>
        }
    ) : Promise<void> {
        try {
            const reportedPeptideIds = Array.from( reportedPeptideIds_ToGet );
            const annotationTypeIds = Array.from( annotationTypeIds_ToGet );

            const promise = new Promise<void>( ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds,
                        annotationTypeIds
                    };

                    console.log("AJAX Call to get reported-peptide-descriptive-ann-data START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        //  Remove this promise
                        this._remove_Promise_From__loadingInProgress_Promises( promise )

                        reject()
                    }  );

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                    console.log("AJAX Call to get reported-peptide-descriptive-ann-data END, Now: " + new Date() );

                    //  Remove this promise

                    let remove_From_Loading_InProgress = false

                    if ( this._remove_Promise_From__loadingInProgress_Promises(promise) ) {
                        //  Returns false if this request has been 'superceded'
                        remove_From_Loading_InProgress = true;
                    }

                    this._process_WebserviceResponse({ responseData, remove_From_Loading_InProgress });

                    for ( const annotationTypeId of annotationTypeIds_ToGet ) {
                        this._annotationTypeIds_Loaded_DataFor.add(annotationTypeId)
                    }

                    resolve();

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

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
    private _process_WebserviceResponse({ responseData, remove_From_Loading_InProgress }: { responseData: any, remove_From_Loading_InProgress: boolean }) : void {

        const annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer = responseData.annData_KeyAnnTypeId_KeyReportedPeptideId;

        //  JS Object.   <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

        //  Translate to Map, parsing object keys to int

        let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );

        for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
            const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
            const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

            this._reportedPeptideIds_Loaded_DataFor.add(reportedPeptideIdInt)
            if ( remove_From_Loading_InProgress ) {
                this._reportedPeptideIds_LoadingInProgress.delete(reportedPeptideIdInt)
            }

            let reportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId =
                this._reportedPeptide_Descriptive_AnnotationValues_Holder.get_ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId(reportedPeptideIdInt)

            if ( ! reportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId ) {
                reportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId =
                    new CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId({ reportedPeptideId: reportedPeptideIdInt });
                this._reportedPeptide_Descriptive_AnnotationValues_Holder.InternalUse__InsertEntry(reportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId)
            }

            let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );

            for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
                const annTypeIdInt = Number.parseInt( annTypeIdString );
                const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];

                const reportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId = {
                    annotationTypeId: annTypeIdInt, valueString : annData_FromServer.valueString
                }
                reportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId.InternalUse__InsertEntry(reportedPeptide_Descriptive_AnnotationValues_For_AnnotationTypeId);
            }
        }
    }

}