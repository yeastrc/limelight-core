/**
 * commonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues.ts
 *
 * For Single Project Search  -  Protein_Filterable_AnnotationValues
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
export class CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_AnnotationTypeId {
    annotationTypeId: number
    valueDouble : number
    valueString : string
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_ProteinId {

    readonly proteinSequenceVersionId : number

    //  	Protein Level Filterable Annotation Data Per Annotation Type Id
    // 					- <annTypeId,{ valueDouble, valueString }>
    private _protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId :
        Map<number, CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_AnnotationTypeId> = new Map();

    constructor({ proteinSequenceVersionId} : { proteinSequenceVersionId : number}) {
        this.proteinSequenceVersionId = proteinSequenceVersionId;
    }

    /**
     * @param proteinSequenceVersionId
     */
    get_Protein_Filterable_AnnotationValues_For_AnnotationTypeId(annotationTypeId: number) {
        return this._protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.get(annotationTypeId)
    }

    /**
     * @param proteinSequenceVersionId
     */
    get_Protein_Filterable_AnnotationValues_All() {
        return this._protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.values()
    }


    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry( entry: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_AnnotationTypeId ) {

        this._protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_AnnotationTypeId.set( entry.annotationTypeId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder {

    //  	Protein Level Filterable Annotation Data Per Protein Sequence Version Id
    // 					- proteinSequenceVersionId,<<annTypeId,{ valueDouble, valueString }>>
    private _protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_ProteinId :
        Map<number, CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_ProteinId> = new Map()

    constructor() {}

    /**
     * @param proteinSequenceVersionId
     */
    get_Protein_Filterable_AnnotationValues_For_ProteinId(proteinSequenceVersionId: number) {
        return this._protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_ProteinId.get(proteinSequenceVersionId)
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry( entry: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_ProteinId ) {

        this._protein_Filterable_AnnotationValues_Key_AnnTypeId_Key_ProteinId.set( entry.proteinSequenceVersionId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult {

    protein_Filterable_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    private _protein_Filterable_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder = new CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder()

    //

    private _proteinSequenceVersionIds_Loaded_DataFor: Set<number> = new Set()
    private _proteinSequenceVersionIds_LoadingInProgress: Set<number> = new Set()

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
        return new CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_Protein_Filterable_AnnotationValues_ReturnPromise(
        {
            proteinSequenceVersionIds, annotationTypeIds
        } : {
            proteinSequenceVersionIds: Set<number>
            annotationTypeIds: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult> {

        const result = this.get_Protein_Filterable_AnnotationValues({ proteinSequenceVersionIds, annotationTypeIds });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }

    /**
     *
     */
    get_Protein_Filterable_AnnotationValues(
        {
            proteinSequenceVersionIds, annotationTypeIds
        } : {
            proteinSequenceVersionIds: Set<number>
            annotationTypeIds: Set<number>
        }
    ):
        {
            data: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult>
        } {

        //  Test 1: if data already loaded, return current Holder

        {
            let foundAll_proteinSequenceVersionIds = true;
            let foundAll_annotationTypeIds = true;

            for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {
                if ( ! this._proteinSequenceVersionIds_Loaded_DataFor.has( proteinSequenceVersionId ) ) {
                    foundAll_proteinSequenceVersionIds = false;
                    break;
                }
            }
            for ( const annotationTypeId of annotationTypeIds ) {
                if ( ! this._annotationTypeIds_Loaded_DataFor.has( annotationTypeId ) ) {
                    foundAll_annotationTypeIds = false;
                    break;
                }
            }

            if ( foundAll_proteinSequenceVersionIds && foundAll_annotationTypeIds ) {
                //  All Data currently loaded so return Holder

                //  EARLY RETURN
                return { promise: undefined, data: { protein_Filterable_AnnotationValues_Holder: this._protein_Filterable_AnnotationValues_Holder } }
            }
        }

        //   Test 2:

        //   If have proteinSequenceVersionIds loaded or loading AND the requested annotationTypeIds are NOT in the loaded or loading annotationTypeIds
        //      Then combine new proteinSequenceVersionIds with loaded and loading proteinSequenceVersionIds and combine annotationTypeIds with loaded and loading
        //         and make new request with combined proteinSequenceVersionIds and annotationTypeIds.
        //      This will ensure that all proteinSequenceVersionIds will have all annotationTypeIds

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

                //  To ensure ALL proteinSequenceVersionIds have data for ALL annotationTypeIds:
                //
                //      1: clear Array of In Progress Loading Promises since existing promises will NOT be for all data
                //
                //      2: make new webservice request for ALL proteinSequenceVersionIds and ALL annotationTypeIds, for loaded and in progress Ids

                //      1: clear Array of In Progress Loading Promises since existing promises will NOT be for all data
                this._loadingInProgress_Promises = []

                //      2: make new webservice request for ALL proteinSequenceVersionIds and ALL annotationTypeIds, for loaded and in progress Ids

                const proteinSequenceVersionIds_ToGet = new Set<number>()
                const annotationTypeIds_ToGet = new Set<number>()

                //  Copy loaded proteinSequenceVersionIds
                for ( const proteinSequenceVersionId of this._proteinSequenceVersionIds_Loaded_DataFor ) {
                    proteinSequenceVersionIds_ToGet.add(proteinSequenceVersionId)
                }
                //  Copy loading in progress proteinSequenceVersionIds
                for ( const proteinSequenceVersionId of this._proteinSequenceVersionIds_LoadingInProgress ) {
                    proteinSequenceVersionIds_ToGet.add(proteinSequenceVersionId)
                }
                //  Copy loaded annotationTypeIds
                for ( const annotationTypeId of this._annotationTypeIds_Loaded_DataFor ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }
                //  Copy loading in progress annotationTypeIds
                for ( const annotationTypeId of this._annotationTypeIds_LoadingInProgress ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }

                //  Copy in new requested proteinSequenceVersionIds and annotationTypeIds
                for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {
                    proteinSequenceVersionIds_ToGet.add(proteinSequenceVersionId)
                }
                for ( const annotationTypeId of annotationTypeIds ) {
                    annotationTypeIds_ToGet.add(annotationTypeId)
                }

                const promise = this._load_Annotation_Data({ proteinSequenceVersionIds_ToGet, annotationTypeIds_ToGet });

                //  EARLY RETURN
                return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult>(
                        (resolve, reject) => { try {
                            promise.catch(reason => reject(reason))
                            promise.then(noValue => { try {
                                resolve({
                                    protein_Filterable_AnnotationValues_Holder: this._protein_Filterable_AnnotationValues_Holder
                                })
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            }
        }

        //  Test 3: if data already loaded or already loading, return promise based on existing promises

        {
            let foundAll_proteinSequenceVersionIds = true;
            let foundAll_annotationTypeIds = true;

            for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {
                if ( ( ! this._proteinSequenceVersionIds_Loaded_DataFor.has( proteinSequenceVersionId ) ) && ( ! this._proteinSequenceVersionIds_LoadingInProgress.has( proteinSequenceVersionId ) ) ) {
                    foundAll_proteinSequenceVersionIds = false;
                    break;
                }
            }
            for ( const annotationTypeId of annotationTypeIds ) {
                if ( ( ! this._annotationTypeIds_Loaded_DataFor.has( annotationTypeId ) ) && ( ! this._annotationTypeIds_LoadingInProgress.has( annotationTypeId ) ) ) {
                    foundAll_annotationTypeIds = false;
                    break;
                }
            }

            if ( foundAll_proteinSequenceVersionIds && foundAll_annotationTypeIds ) {
                //  All Data currently loaded or in progress to load  so return Promise that waits for existing promises

                if ( this._loadingInProgress_Promises.length === 0 ) {
                    const msg = "Found all proteinSequenceVersionIds and annotationTypeIds in either loaded or loading but no entries in this._loadingInProgress_Promises"
                    console.warn(msg);
                    throw Error(msg)
                }

                //  EARLY RETURN
                return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult>(
                        (resolve, reject) => { try {
                            const promises_All = Promise.all(this._loadingInProgress_Promises)
                            promises_All.catch(reason => reject(reason))
                            promises_All.then(noValue => { try {
                                resolve({
                                    protein_Filterable_AnnotationValues_Holder: this._protein_Filterable_AnnotationValues_Holder
                                })
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }
            }
        }

        //  NO tests passed so load requested data, after removing existing loaded and loading data.  If requested data in loading data, Include all existing promises as dependencies

        {
            const proteinSequenceVersionIds_ToGet = new Set<number>( proteinSequenceVersionIds )  // Make copy into "ToGet"
            const annotationTypeIds_ToGet = new Set<number>( annotationTypeIds )    // Make copy into "ToGet"

            let foundAny_In__LoadingInProgress = false;

            for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {
                if ( this._proteinSequenceVersionIds_LoadingInProgress.has( proteinSequenceVersionId ) ) {
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

            //  Remove loaded proteinSequenceVersionIds
            for ( const proteinSequenceVersionId of this._proteinSequenceVersionIds_Loaded_DataFor ) {
                proteinSequenceVersionIds_ToGet.delete(proteinSequenceVersionId)
            }
            //  Remove loading in progress proteinSequenceVersionIds
            for ( const proteinSequenceVersionId of this._proteinSequenceVersionIds_LoadingInProgress ) {
                proteinSequenceVersionIds_ToGet.delete(proteinSequenceVersionId)
            }

            let promise_ToWaitFor: Promise<unknown> = this._load_Annotation_Data({ proteinSequenceVersionIds_ToGet, annotationTypeIds_ToGet });

            if ( foundAny_In__LoadingInProgress ) {
                //  Also need to wait for other Promises in progress

                //  this._loadingInProgress_Promises  already contains promise_ToWaitFor returned from this._load_Annotation_Data

                const promises_CombinedToWaitFor_All = Promise.all( this._loadingInProgress_Promises )
                promise_ToWaitFor = promises_CombinedToWaitFor_All
            }

            //  EARLY RETURN
            return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_Holder__FunctionResult>(
                    (resolve, reject) => { try {
                        promise_ToWaitFor.catch(reason => reject(reason))
                        promise_ToWaitFor.then(noValue => { try {
                            resolve({
                                protein_Filterable_AnnotationValues_Holder: this._protein_Filterable_AnnotationValues_Holder
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
    private _load_Annotation_Data(
        {
            proteinSequenceVersionIds_ToGet, annotationTypeIds_ToGet
        } : {
            proteinSequenceVersionIds_ToGet: Set<number>
            annotationTypeIds_ToGet: Set<number>
        }
    ) : Promise<void> {
        try {
            const proteinSequenceVersionIds = Array.from( proteinSequenceVersionIds_ToGet );
            const annotationTypeIds = Array.from( annotationTypeIds_ToGet );

            const promise = new Promise<void>( ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        proteinSequenceVersionIds,
                        annotationTypeIds
                    };

                    const url = "d/rws/for-page/psb/protein-filtrbl-ann-data-list-protein-seq-v-ids-ann-type-ids-single-project-search-id";

                    console.log("AJAX Call to get " + url + " START, Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        //  Remove this promise
                        this._remove_Promise_From__loadingInProgress_Promises( promise )

                        reject()
                    }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get " + url + " END, Now: " + new Date() );

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
    private _process_WebserviceResponse({ responseData, remove_From_Loading_InProgress }: { responseData: any, remove_From_Loading_InProgress: boolean }) : void {

        const annData_KeyAnnTypeId_Key_ProteinSequenceVersionIdFromServer = responseData.annData_KeyAnnTypeId_Key_ProteinSequenceVersionId;

        //  JS Object.   <Protein Sequence Version Id, <Ann Type Id, SearchProteinFilterableAnnotationDTO>> annData_KeyAnnTypeId_Key_ProteinSequenceVersionId;

        //  Translate to Map, parsing object keys to int

        let proteinSequenceVersionIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_Key_ProteinSequenceVersionIdFromServer );

        for ( const proteinSequenceVersionIdString of proteinSequenceVersionIdsFromServer_Keys ) {
            const proteinSequenceVersionIdInt = Number.parseInt( proteinSequenceVersionIdString );
            const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_Key_ProteinSequenceVersionIdFromServer[ proteinSequenceVersionIdString ];

            this._proteinSequenceVersionIds_Loaded_DataFor.add(proteinSequenceVersionIdInt)
            if ( remove_From_Loading_InProgress ) {
                this._proteinSequenceVersionIds_LoadingInProgress.delete(proteinSequenceVersionIdInt)
            }

            let protein_Filterable_AnnotationValues_For_ProteinId =
                this._protein_Filterable_AnnotationValues_Holder.get_Protein_Filterable_AnnotationValues_For_ProteinId(proteinSequenceVersionIdInt)

            if ( ! protein_Filterable_AnnotationValues_For_ProteinId ) {
                protein_Filterable_AnnotationValues_For_ProteinId =
                    new CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_ProteinId({ proteinSequenceVersionId: proteinSequenceVersionIdInt });
                this._protein_Filterable_AnnotationValues_Holder.InternalUse__InsertEntry(protein_Filterable_AnnotationValues_For_ProteinId)
            }

            let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );

            for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
                const annTypeIdInt = Number.parseInt( annTypeIdString );
                const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];

                const protein_Filterable_AnnotationValues_For_AnnotationTypeId: CommonData_LoadedFromServer_SingleSearch__Protein_Filterable_AnnotationValues_For_AnnotationTypeId = {
                    annotationTypeId: annTypeIdInt, valueDouble : annData_FromServer.valueDouble, valueString : annData_FromServer.valueString
                }
                protein_Filterable_AnnotationValues_For_ProteinId.InternalUse__InsertEntry(protein_Filterable_AnnotationValues_For_AnnotationTypeId);
            }
        }
    }

}