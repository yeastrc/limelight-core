/**
 * commonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries.ts
 *
 * For Single Project Search  -  FeatureDetection Mapping of Persistent to Singular Feature Entries - Contents of imported Feature Detection
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder {

    private _featureDetection_MappingOf_PersistentToSingularFeature_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry>;

    //  Populated on demand
    private _featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id :
        Map<number, Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry>>;

    constructor(
        {
            featureDetection_MappingOf_PersistentToSingularFeature_Entries
        } : {
            featureDetection_MappingOf_PersistentToSingularFeature_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry>
        }
    ) {
        this._featureDetection_MappingOf_PersistentToSingularFeature_Entries = featureDetection_MappingOf_PersistentToSingularFeature_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries() {
        return this._featureDetection_MappingOf_PersistentToSingularFeature_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeatureEntry_Id: number) {

        if ( ! this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id ) {
            //  Populate Map
            this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id = new Map();
            for ( const entry of this._featureDetection_MappingOf_PersistentToSingularFeature_Entries ) {
                let entries_For_SingularId = this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id.get( entry.featureDetection_SingularFeatureEntry_Id );
                if ( ! entries_For_SingularId ) {
                    entries_For_SingularId = [];
                    this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id.set( entry.featureDetection_SingularFeatureEntry_Id, entries_For_SingularId );
                }
                entries_For_SingularId.push( entry );
            }
        }

        return this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id.get(featureDetection_SingularFeatureEntry_Id);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry {
    readonly featureDetection_PersistentFeatureEntry_Id: number; // int
    readonly featureDetection_SingularFeatureEntry_Id: number; // int
    readonly featureDetection_Root_Id: number; // int
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult {

    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId: Map<number, CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder> = new Map();

    private _promise_Load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId: Map<number, Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult>> = new Map();

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_MappingOf_PersistentToSingularFeature
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
     * @param searchDataLookupParameters_MappingOf_PersistentToSingularFeature
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_ReturnPromise(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult> {

        const result = this.get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     *
     */
    get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ):
        {
            data: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult>
        } {

        {
            const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder ) {

                //  Have loaded data so just return it

                const data : CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult = {
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
                }

                return {  //  EARLY RETURN
                    data,
                    promise: undefined
                };
            }
        }
        {
            const promise = this._promise_Load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( promise ) {

                return {  //  EARLY RETURN
                    promise, data: undefined
                };
            }
        }

        const promise_Loading = this._load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data({ feature_detection_root__project_scnfl_mapping_tbl__id });

        const promise_Return = new Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult>((resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason));
            promise_Loading.then(noValue => { try {
                const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( ! featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder ) {
                    throw Error("this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                }
                const data : CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries__get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder__FunctionResult = {
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
                }
                resolve(data);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this._promise_Load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, promise_Return );

        return {
            data: undefined,
            promise: promise_Return
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<void> {

        try {
            const promise = new Promise<void>(
                ( resolve, reject ) => { try {

                    const promise_load_FeatureDetection_SingularFeature_RecordCount_MaxAllowed =
                        this._load_FeatureDetection_Mapping_RecordCount_MaxAllowed({ feature_detection_root__project_scnfl_mapping_tbl__id })

                    promise_load_FeatureDetection_SingularFeature_RecordCount_MaxAllowed.catch( () => { reject() }  );
                    promise_load_FeatureDetection_SingularFeature_RecordCount_MaxAllowed.then( promiseResult => { try {

                        let batchSize = promiseResult.max_LimitCount;

                        if ( batchSize > promiseResult.max_LimitCount ) {
                            batchSize = promiseResult.max_LimitCount;
                        }

                        const promises_GetData: Array<Promise<any>> = []

                        if ( promiseResult.recordCount < batchSize ) {

                            //  Make single call without offset or limit since then SQL not use ORDER BY improving performance

                            const promise = this._load_FeatureDetection_Entries_Data_GetDataForOffSetLimit({
                                feature_detection_root__project_scnfl_mapping_tbl__id, limit_Offset: null, limit_Count: null
                            })
                            promises_GetData.push(promise)

                        } else {

                            for ( let limit_Offset = 0; limit_Offset <= promiseResult.recordCount; limit_Offset += batchSize ) {

                                const promise = this._load_FeatureDetection_Entries_Data_GetDataForOffSetLimit({
                                    feature_detection_root__project_scnfl_mapping_tbl__id, limit_Offset, limit_Count: batchSize
                                })
                                promises_GetData.push(promise)
                            }
                        }

                        const promises_GetData_All = Promise.all(promises_GetData);

                        promises_GetData_All.catch(reason => reject(reason))
                        promises_GetData_All.then(webserviceResponseData_Array => { try {

                            this._process_WebserviceResponse({ webserviceResponseData_Array, feature_detection_root__project_scnfl_mapping_tbl__id });

                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promise.catch( reason => {
                this._promise_Load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise.then( valueIgnored => {
                this._promise_Load_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            })

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }


    }

    /**
     * Get Record Count and Max allowed
     *
     */
    private _load_FeatureDetection_Mapping_RecordCount_MaxAllowed(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<{
        recordCount: number
        max_LimitCount: number
    }> {

        try {
            const promise = new Promise<{
                recordCount: number
                max_LimitCount: number
            }>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        feature_detection_root__project_scnfl_mapping_tbl__id
                    };

                    const url =  "d/rws/for-page/scan-file-feature-detection-map-persistent-to-singular-feature-entries-count--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        if ( responseData.recordCount === undefined || responseData.recordCount === null ) {
                            const msg = "( responseData.recordCount === undefined || responseData.recordCount === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( responseData.max_LimitCount === undefined || responseData.max_LimitCount === null ) {
                            const msg = "( responseData.max_LimitCount === undefined || responseData.max_LimitCount === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        resolve({
                            recordCount: responseData.recordCount,
                            max_LimitCount: responseData.max_LimitCount
                        });

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _load_FeatureDetection_Entries_Data_GetDataForOffSetLimit(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id, limit_Offset, limit_Count
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number;
            limit_Offset: number;
            limit_Count: number;
        }
    ) : Promise<any> {

        try {
            const promise = new Promise<any>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        feature_detection_root__project_scnfl_mapping_tbl__id,
                        limit_Offset,
                        limit_Count
                    };

                    const url = "d/rws/for-page/scan-file-feature-detection-map-persistent-to-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0003";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        resolve(responseData);

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

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
            webserviceResponseData_Array, feature_detection_root__project_scnfl_mapping_tbl__id
        }: {
            webserviceResponseData_Array: Array<any>
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }) : void {

        const featureDetection_MappingOf_PersistentToSingularFeature_EntriesList : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry> = [];

        for ( const responseData of webserviceResponseData_Array ) {

            const responseData__Cast : {
                featureDetection_PersistentFeatureEntry_Id_List: Array<number>;
                featureDetection_SingularFeatureEntry_Id_List: Array<number>;
                featureDetection_Root_Id_List: Array<number>;
            } = responseData;

            const featureDetection_PersistentFeatureEntry_Id_List = responseData__Cast.featureDetection_PersistentFeatureEntry_Id_List;
            const featureDetection_SingularFeatureEntry_Id_List = responseData__Cast.featureDetection_SingularFeatureEntry_Id_List;
            const featureDetection_Root_Id_List = responseData__Cast.featureDetection_Root_Id_List;

            if ( ! featureDetection_PersistentFeatureEntry_Id_List ) {
                const msg = "featureDetection_PersistentFeatureEntry_Id_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_PersistentFeatureEntry_Id_List ", featureDetection_PersistentFeatureEntry_Id_List )
                throw Error(msg);
            }
            if ( ! ( featureDetection_PersistentFeatureEntry_Id_List instanceof  Array ) ) {
                const msg = "featureDetection_PersistentFeatureEntry_Id_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_PersistentFeatureEntry_Id_List ", featureDetection_PersistentFeatureEntry_Id_List )
                throw Error(msg);
            }

            if ( ! featureDetection_SingularFeatureEntry_Id_List ) {
                const msg = "featureDetection_SingularFeatureEntry_Id_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_SingularFeatureEntry_Id_List ", featureDetection_SingularFeatureEntry_Id_List )
                throw Error(msg);
            }
            if ( ! ( featureDetection_SingularFeatureEntry_Id_List instanceof  Array ) ) {
                const msg = "featureDetection_SingularFeatureEntry_Id_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_SingularFeatureEntry_Id_List ", featureDetection_SingularFeatureEntry_Id_List )
                throw Error(msg);
            }

            if ( ! featureDetection_Root_Id_List ) {
                const msg = "featureDetection_Root_Id_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_Root_Id_List ", featureDetection_Root_Id_List )
                throw Error(msg);
            }
            if ( ! ( featureDetection_Root_Id_List instanceof  Array ) ) {
                const msg = "featureDetection_Root_Id_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: featureDetection_Root_Id_List ", featureDetection_Root_Id_List )
                throw Error(msg);
            }

            //   ALL Arrays MUST be the SAME length

            if ( featureDetection_PersistentFeatureEntry_Id_List.length !== featureDetection_SingularFeatureEntry_Id_List.length ) {
                const msg = "responseData Array Lengths NOT Match: featureDetection_PersistentFeatureEntry_Id_List.length !== featureDetection_SingularFeatureEntry_Id_List.length.  featureDetection_PersistentFeatureEntry_Id_List.length: " +
                    featureDetection_PersistentFeatureEntry_Id_List.length +
                    ", featureDetection_SingularFeatureEntry_Id_List.length: " +
                    featureDetection_SingularFeatureEntry_Id_List.length;
                console.warn( msg )
                throw Error(msg);
            }


            if ( featureDetection_PersistentFeatureEntry_Id_List.length !== featureDetection_Root_Id_List.length ) {
                const msg = "responseData Array Lengths NOT Match: featureDetection_PersistentFeatureEntry_Id_List.length !== featureDetection_Root_Id_List.length.  featureDetection_PersistentFeatureEntry_Id_List.length: " +
                    featureDetection_PersistentFeatureEntry_Id_List.length +
                    ", featureDetection_Root_Id_List.length: " +
                    featureDetection_Root_Id_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            //  Copy all into results array

            const responseData_Array_Lengths = featureDetection_PersistentFeatureEntry_Id_List.length;

            for ( let index = 0; index < responseData_Array_Lengths; index++ ) {

                const entry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry = {
                    featureDetection_PersistentFeatureEntry_Id: featureDetection_PersistentFeatureEntry_Id_List[ index ],
                    featureDetection_SingularFeatureEntry_Id: featureDetection_SingularFeatureEntry_Id_List[ index ],
                    featureDetection_Root_Id: featureDetection_Root_Id_List[ index ]
                };

                if ( entry.featureDetection_PersistentFeatureEntry_Id === undefined || entry.featureDetection_PersistentFeatureEntry_Id === null ) {
                    const msg = "entry.featureDetection_PersistentFeatureEntry_Id is undefined or null. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( entry.featureDetection_PersistentFeatureEntry_Id ) ) {
                    const msg = "entry.featureDetection_PersistentFeatureEntry_Id in result_List is not a number. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }

                if ( entry.featureDetection_SingularFeatureEntry_Id === undefined || entry.featureDetection_SingularFeatureEntry_Id === null ) {
                    const msg = "entry.feature_detection_root__project_scnfl_mapping_tbl__id is undefined or null. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( entry.featureDetection_SingularFeatureEntry_Id ) ) {
                    const msg = "entry.featureDetection_SingularFeatureEntry_Id in result_List is not a number. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }

                if ( entry.featureDetection_Root_Id === undefined || entry.featureDetection_Root_Id === null ) {
                    const msg = "entry.featureDetection_Root_Id is undefined or null. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( entry.featureDetection_Root_Id ) ) {
                    const msg = "entry.featureDetection_Root_Id in result_List is not a number. ";
                    console.warn( msg + "entry: " + entry )
                    throw Error(msg);
                }

                featureDetection_MappingOf_PersistentToSingularFeature_EntriesList.push( entry );
            }
        }

        const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder({ featureDetection_MappingOf_PersistentToSingularFeature_Entries: featureDetection_MappingOf_PersistentToSingularFeature_EntriesList });

        this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder );
    }

}