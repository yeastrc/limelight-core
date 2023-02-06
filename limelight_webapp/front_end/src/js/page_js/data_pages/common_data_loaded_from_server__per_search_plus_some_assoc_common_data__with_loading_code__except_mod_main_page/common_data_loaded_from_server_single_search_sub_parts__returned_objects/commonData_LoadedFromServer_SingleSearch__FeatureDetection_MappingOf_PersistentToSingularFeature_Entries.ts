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
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        feature_detection_root__project_scnfl_mapping_tbl__id
                    };

                    const url = "d/rws/for-page/scan-file-feature-detection-map-persistent-to-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData, feature_detection_root__project_scnfl_mapping_tbl__id });
                        resolve();

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
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData, feature_detection_root__project_scnfl_mapping_tbl__id }: { responseData: any, feature_detection_root__project_scnfl_mapping_tbl__id: number }) : void {

        const result_List = responseData.result_List;

        if ( ! ( result_List instanceof  Array ) ) {
            const msg = "result_List is not an Array";
            console.warn( msg + ". featureDetection_MappingOf_PersistentToSingularFeature_EntriesList_FromWebservice: ", result_List )
            throw Error(msg);
        }

        const featureDetection_MappingOf_PersistentToSingularFeature_EntriesList : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry> = [];

        //  Validate each entry is a number

        for ( const result_Entry of result_List ) {

            const entry = result_Entry as CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entry;

            if ( entry.featureDetection_PersistentFeatureEntry_Id === undefined || entry.featureDetection_PersistentFeatureEntry_Id === null ) {
                const msg = "entry.featureDetection_PersistentFeatureEntry_Id is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.featureDetection_PersistentFeatureEntry_Id ) ) {
                const msg = "entry.featureDetection_PersistentFeatureEntry_Id in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.featureDetection_SingularFeatureEntry_Id === undefined || entry.featureDetection_SingularFeatureEntry_Id === null ) {
                const msg = "entry.feature_detection_root__project_scnfl_mapping_tbl__id is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.featureDetection_SingularFeatureEntry_Id ) ) {
                const msg = "entry.featureDetection_SingularFeatureEntry_Id in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.featureDetection_Root_Id === undefined || entry.featureDetection_Root_Id === null ) {
                const msg = "entry.featureDetection_Root_Id is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.featureDetection_Root_Id ) ) {
                const msg = "entry.featureDetection_Root_Id in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            featureDetection_MappingOf_PersistentToSingularFeature_EntriesList.push( entry );
        }

        const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder({ featureDetection_MappingOf_PersistentToSingularFeature_Entries: featureDetection_MappingOf_PersistentToSingularFeature_EntriesList });

        this._featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder );
    }

}