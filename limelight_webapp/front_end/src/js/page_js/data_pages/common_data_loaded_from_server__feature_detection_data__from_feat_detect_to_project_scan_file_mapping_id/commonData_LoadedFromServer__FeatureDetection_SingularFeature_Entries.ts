/**
 * commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries.ts
 *
 * For Single Project Search  -  FeatureDetection Singular Feature Entries - Contents of imported Feature Detection
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
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder {

    private _featureDetection_SingularFeature_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry>;

    constructor(
        {
            featureDetection_SingularFeature_Entries
        } : {
            featureDetection_SingularFeature_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry>
        }
    ) {
        this._featureDetection_SingularFeature_Entries = featureDetection_SingularFeature_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_SingularFeature_Entries() {
        return this._featureDetection_SingularFeature_Entries;
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry {
    readonly id: number;  //  int
    readonly ms_1_scan_number: number;  //  int
    readonly monoisotopic_mass: number;  //  Double
    readonly charge: number;  //  Integer
    readonly intensity: number;  //  Double
    readonly base_isotope_peak: number;  //  Double
    readonly analysis_window_start_m_z: number;  //  Double
    readonly analysis_window_end_m_z: number;  //  Double
    readonly correlation_score: number;  //  Double
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult {

    featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries {

    //  !! If these values change, then create a new instance of this class

    //

    private _featureDetection_SingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId: Map<number, CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder> = new Map();

    private _promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId: Map<number, Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>> = new Map();

    /**
     *
     */
    private constructor() {
    }

    /**
     * Create New Instance
     *
     */
    static getNewInstance( ) {
        return new CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries();
    }

    /**
     * !!!  Always return promise
     *
     */
    get_FeatureDetection_SingularFeature_EntriesHolder_ReturnPromise(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult> {

        const result = this.get_FeatureDetection_SingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     *
     */
    get_FeatureDetection_SingularFeature_EntriesHolder(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ):
        {
            data: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>
        } {

        {
            const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( featureDetection_SingularFeature_Entries_Holder ) {

                //  Have loaded data so just return it

                const data : CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult = {
                    featureDetection_SingularFeature_Entries_Holder
                }

                return {  //  EARLY RETURN
                    data,
                    promise: undefined
                };
            }
        }
        {
            const promise = this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( promise ) {

                return {  //  EARLY RETURN
                    promise, data: undefined
                };
            }
        }

        const promise_Loading = this._load_FeatureDetection_SingularFeature_Entries_Data({ feature_detection_root__project_scnfl_mapping_tbl__id });

        const promise_Return = new Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>((resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason));
            promise_Loading.then(noValue => { try {
                const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( ! featureDetection_SingularFeature_Entries_Holder ) {
                    throw Error("this._featureDetection_SingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                }
                const data : CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult = {
                    featureDetection_SingularFeature_Entries_Holder
                }
                resolve(data);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, promise_Return );

        return {
            data: undefined,
            promise: promise_Return
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FeatureDetection_SingularFeature_Entries_Data(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<void> {

        try {
            const promise = new Promise<void>(
                ( resolve, reject ) => { try {

                    const promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed =
                        this._load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed({ feature_detection_root__project_scnfl_mapping_tbl__id })

                    promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed.catch( () => { reject() }  );
                    promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed.then( promiseResult => { try {

                        let batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed

                        if ( batchSize > promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed ) {
                            batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed;
                        }

                        const promises_GetData: Array<Promise<any>> = []

                        for ( let batchStartId = promiseResult.minId; batchStartId <= promiseResult.maxId; batchStartId += batchSize ) {

                            const promise = this._load_FeatureDetection_SingularFeature_Entries_Data_GetDataForStartIdEndId({
                                feature_detection_root__project_scnfl_mapping_tbl__id, startId: batchStartId, endId: batchStartId + batchSize - 1
                            })
                            promises_GetData.push(promise)
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
                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise.then( valueIgnored => {
                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            })

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }


    }

    /**
     * Get Min Id and Max Id and Max allowed for Singular Feature
     *
     */
    private _load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<{
        minId: number
        maxId: number
        max_StartEnd_Id_DifferenceInclusive_Allowed: number
    }> {

        try {
            const promise = new Promise<{
                minId: number
                maxId: number
                max_StartEnd_Id_DifferenceInclusive_Allowed: number
            }>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        feature_detection_root__project_scnfl_mapping_tbl__id
                    };

                    const url =  "d/rws/for-page/fdb/feature-detection-singular-feature-entries-min-max-id--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        if ( responseData.minId === undefined || responseData.minId === null ) {
                            const msg = "( responseData.minId === undefined || responseData.minId === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( responseData.maxId === undefined || responseData.maxId === null ) {
                            const msg = "( responseData.maxId === undefined || responseData.maxId === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === undefined || responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === null ) {
                            const msg = "( responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === undefined || responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        resolve({
                            minId: responseData.minId,
                            maxId: responseData.maxId,
                            max_StartEnd_Id_DifferenceInclusive_Allowed: responseData.max_StartEnd_Id_DifferenceInclusive_Allowed
                        });

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promise.catch( reason => {
                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise.then( valueIgnored => {
                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            })

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Get Data For Single Project Search Id FOR feature_detection_root__project_scnfl_mapping_tbl__id, startId, endId
     *
     */
    private _load_FeatureDetection_SingularFeature_Entries_Data_GetDataForStartIdEndId(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id, startId, endId
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
            startId: number
            endId: number
        }
    ) : Promise<any> {

        try {
            const promise = new Promise<any>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        feature_detection_root__project_scnfl_mapping_tbl__id,
                        startId, endId
                    };

                    const url = "d/rws/for-page/fdb/feature-detection-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0003";

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

        const featureDetection_SingularFeature_EntriesList : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry> = [];

        for ( const responseData of webserviceResponseData_Array ) {

            const responseData__Cast : {
                id_List: Array<number>;
                ms_1_scan_number_List: Array<number>;

                monoisotopic_mass_List: Array<number>;
                charge_List: Array<number>;
                intensity_List: Array<number>;
                base_isotope_peak_List: Array<number>;
                analysis_window_start_m_z_List: Array<number>;
                analysis_window_end_m_z_List: Array<number>;
                correlation_score_List: Array<number>;
            } = responseData;

            const id_List = responseData__Cast.id_List;
            const ms_1_scan_number_List = responseData__Cast.ms_1_scan_number_List;

            const monoisotopic_mass_List = responseData__Cast.monoisotopic_mass_List;
            const charge_List = responseData__Cast.charge_List;
            const intensity_List = responseData__Cast.intensity_List;
            const base_isotope_peak_List = responseData__Cast.base_isotope_peak_List;
            const analysis_window_start_m_z_List = responseData__Cast.analysis_window_start_m_z_List;
            const analysis_window_end_m_z_List = responseData__Cast.analysis_window_end_m_z_List;
            const correlation_score_List = responseData__Cast.correlation_score_List;

            if ( ! id_List ) {
                const msg = "id_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: id_List ", id_List )
                throw Error(msg);
            }
            if ( ! ( id_List instanceof  Array ) ) {
                const msg = "id_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: id_List ", id_List )
                throw Error(msg);
            }

            if ( ! ms_1_scan_number_List ) {
                const msg = "ms_1_scan_number_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: ms_1_scan_number_List ", ms_1_scan_number_List )
                throw Error(msg);
            }
            if ( ! ( ms_1_scan_number_List instanceof  Array ) ) {
                const msg = "ms_1_scan_number_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: ms_1_scan_number_List ", ms_1_scan_number_List )
                throw Error(msg);
            }

            if ( ! monoisotopic_mass_List ) {
                const msg = "monoisotopic_mass_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: monoisotopic_mass_List ", monoisotopic_mass_List )
                throw Error(msg);
            }
            if ( ! ( monoisotopic_mass_List instanceof  Array ) ) {
                const msg = "monoisotopic_mass_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: monoisotopic_mass_List ", monoisotopic_mass_List )
                throw Error(msg);
            }

            if ( ! charge_List ) {
                const msg = "charge_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: charge_List ", charge_List )
                throw Error(msg);
            }
            if ( ! ( charge_List instanceof  Array ) ) {
                const msg = "charge_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: charge_List ", charge_List )
                throw Error(msg);
            }

            if ( ! intensity_List ) {
                const msg = "intensity_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: intensity_List ", intensity_List )
                throw Error(msg);
            }
            if ( ! ( intensity_List instanceof  Array ) ) {
                const msg = "intensity_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: intensity_List ", intensity_List )
                throw Error(msg);
            }

            if ( ! analysis_window_start_m_z_List ) {
                const msg = "analysis_window_start_m_z_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: analysis_window_start_m_z_List ", analysis_window_start_m_z_List )
                throw Error(msg);
            }
            if ( ! ( analysis_window_start_m_z_List instanceof  Array ) ) {
                const msg = "analysis_window_start_m_z_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: analysis_window_start_m_z_List ", analysis_window_start_m_z_List )
                throw Error(msg);
            }

            if ( ! analysis_window_end_m_z_List ) {
                const msg = "analysis_window_end_m_z_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: analysis_window_end_m_z_List ", analysis_window_end_m_z_List )
                throw Error(msg);
            }
            if ( ! ( analysis_window_end_m_z_List instanceof  Array ) ) {
                const msg = "analysis_window_end_m_z_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: analysis_window_end_m_z_List ", analysis_window_end_m_z_List )
                throw Error(msg);
            }

            if ( ! correlation_score_List ) {
                const msg = "correlation_score_List is null or undefined";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: correlation_score_List ", correlation_score_List )
                throw Error(msg);
            }
            if ( ! ( correlation_score_List instanceof  Array ) ) {
                const msg = "correlation_score_List is not an Array";
                console.warn( msg + ". featureDetection_SingularFeature_EntriesList_FromWebservice: correlation_score_List ", correlation_score_List )
                throw Error(msg);
            }

            //   ALL Arrays MUST be the SAME length

            if ( id_List.length !== ms_1_scan_number_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== ms_1_scan_number_List.length.  id_List.length: " +
                    id_List.length +
                    ", ms_1_scan_number_List.length: " +
                    ms_1_scan_number_List.length;
                console.warn( msg )
                throw Error(msg);
            }


            if ( id_List.length !== monoisotopic_mass_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== monoisotopic_mass_List.length.  id_List.length: " +
                    id_List.length +
                    ", monoisotopic_mass_List.length: " +
                    monoisotopic_mass_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== charge_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== charge_List.length.  id_List.length: " +
                    id_List.length +
                    ", charge_List.length: " +
                    charge_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== intensity_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== intensity_List.length.  id_List.length: " +
                    id_List.length +
                    ", intensity_List.length: " +
                    intensity_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== base_isotope_peak_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== base_isotope_peak_List.length.  id_List.length: " +
                    id_List.length +
                    ", base_isotope_peak_List.length: " +
                    base_isotope_peak_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== analysis_window_start_m_z_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== analysis_window_start_m_z_List.length.  id_List.length: " +
                    id_List.length +
                    ", analysis_window_start_m_z_List.length: " +
                    analysis_window_start_m_z_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== analysis_window_end_m_z_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== analysis_window_end_m_z_List.length.  id_List.length: " +
                    id_List.length +
                    ", analysis_window_end_m_z_List.length: " +
                    analysis_window_end_m_z_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            if ( id_List.length !== correlation_score_List.length ) {
                const msg = "responseData Array Lengths NOT Match: id_List.length !== correlation_score_List.length.  id_List.length: " +
                    id_List.length +
                    ", correlation_score_List.length: " +
                    correlation_score_List.length;
                console.warn( msg )
                throw Error(msg);
            }

            //  Copy all into results array

            const responseData_Array_Lengths = id_List.length;

            for ( let index = 0; index < responseData_Array_Lengths; index++ ) {

                const entry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entry = {
                    id: id_List[ index ],
                    ms_1_scan_number: ms_1_scan_number_List[ index ],
                    monoisotopic_mass: monoisotopic_mass_List[ index ],
                    charge: charge_List[ index ],
                    intensity: intensity_List[ index ],
                    base_isotope_peak: base_isotope_peak_List[ index ],
                    analysis_window_start_m_z: analysis_window_start_m_z_List[ index ],
                    analysis_window_end_m_z: analysis_window_end_m_z_List[ index ],
                    correlation_score: correlation_score_List[ index ]
                };

                if ( entry.id === undefined || entry.id === null ) {
                    const msg = "entry.id is undefined or null. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( entry.id ) ) {
                    const msg = "entry.id at index is not a number. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( entry.ms_1_scan_number === undefined || entry.ms_1_scan_number === null ) {
                    const msg = "entry.ms_1_scan_number is undefined or null. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( entry.ms_1_scan_number ) ) {
                    const msg = "entry.ms_1_scan_number at index is not a number. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( entry.monoisotopic_mass !== undefined && entry.monoisotopic_mass !== null ) {
                    if ( ! variable_is_type_number_Check( entry.monoisotopic_mass ) ) {
                        const msg = "entry.monoisotopic_mass at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.intensity !== undefined && entry.intensity !== null ) {
                    if ( ! variable_is_type_number_Check( entry.intensity ) ) {
                        const msg = "entry.intensity at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.charge !== undefined && entry.charge !== null ) {
                    if ( ! variable_is_type_number_Check( entry.charge ) ) {
                        const msg = "entry.charge at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.base_isotope_peak !== undefined && entry.base_isotope_peak !== null ) {
                    if ( ! variable_is_type_number_Check( entry.base_isotope_peak ) ) {
                        const msg = "entry.base_isotope_peak at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.analysis_window_start_m_z !== undefined && entry.analysis_window_start_m_z !== null ) {
                    if ( ! variable_is_type_number_Check( entry.analysis_window_start_m_z ) ) {
                        const msg = "entry.analysis_window_start_m_z at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.analysis_window_end_m_z !== undefined && entry.analysis_window_end_m_z !== null ) {
                    if ( ! variable_is_type_number_Check( entry.analysis_window_end_m_z ) ) {
                        const msg = "entry.analysis_window_end_m_z at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.correlation_score !== undefined && entry.correlation_score !== null ) {
                    if ( ! variable_is_type_number_Check( entry.correlation_score ) ) {
                        const msg = "entry.correlation_score at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }

                featureDetection_SingularFeature_EntriesList.push( entry );
            }
        }

        const featureDetection_SingularFeature_Entries_Holder = new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder({ featureDetection_SingularFeature_Entries: featureDetection_SingularFeature_EntriesList });

        this._featureDetection_SingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_SingularFeature_Entries_Holder );
    }

}