/**
 * commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries.ts
 *
 * FeatureDetection Persistent Feature Entries - Contents of imported Feature Detection
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder {

    private _featureDetection_PersistentFeature_Entries : Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>;

    //  Populated on demand
    private _featureDetection_PersistentFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id : Map<number,CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>

    constructor(
        {
            featureDetection_PersistentFeature_Entries
        } : {
            featureDetection_PersistentFeature_Entries : Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>
        }
    ) {
        this._featureDetection_PersistentFeature_Entries = featureDetection_PersistentFeature_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_PersistentFeature_Entries() {
        return this._featureDetection_PersistentFeature_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry(id_PersistentFeature_Entry: number) {

        if ( ! this._featureDetection_PersistentFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id ) {
            //  Populate Map
            this._featureDetection_PersistentFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id = new Map();
            for ( const entry of this._featureDetection_PersistentFeature_Entries ) {
                this._featureDetection_PersistentFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id.set( entry.id_PersistentFeature_Entry, entry );
            }
        }

        return this._featureDetection_PersistentFeature_Entries_Map_Key_featureDetection_SingularFeatureEntry_Id.get(id_PersistentFeature_Entry);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry {
    readonly id_PersistentFeature_Entry: number; // int
    readonly featureDetectionPersistentFeatureUploadedFileStatsId: number; // int

    readonly charge: number; // int

    readonly monoisotopicMass: number;// double

    readonly  retentionTimeRange_Start: number;  // float
    readonly retentionTimeRange_End: number;  // float
    readonly retentionTimeRange_Apex: number;  // float

    readonly abundance_RetentionTimeRange_Apex: number; // double
    readonly abundance_Total: number;  // double

    //  From feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl

    readonly ms_2_scn_nmbrs_array_json_String: string;

    readonly ms_2_scanNumbers_Array: Array<number>
}

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult {

    featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries {

    //  !! If these values change, then create a new instance of this class

    //

    private _featureDetection_PersistentFeature_Entries_Holder_Map_Key_FeatureDetectionRootId: Map<number, CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder> = new Map();

    private _promise_Load_FeatureDetection_PersistentFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId: Map<number, Promise<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult>> = new Map();

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_PersistentFeature
     */
    private constructor() {

    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_PersistentFeature
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries();
    }

    /**
     * !!!  Always return promise
     *
     */
    get_FeatureDetection_PersistentFeature_EntriesHolder_ReturnPromise(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ): Promise<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult> {

        const result = this.get_FeatureDetection_PersistentFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     *
     */
    get_FeatureDetection_PersistentFeature_EntriesHolder(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ):
        {
            data: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult>
        } {

        {
            const featureDetection_PersistentFeature_Entries_Holder = this._featureDetection_PersistentFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( featureDetection_PersistentFeature_Entries_Holder ) {

                //  Have loaded data so just return it

                const data : CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult = {
                    featureDetection_PersistentFeature_Entries_Holder
                }

                return {  //  EARLY RETURN
                    data,
                    promise: undefined
                };
            }
        }
        {
            const promise = this._promise_Load_FeatureDetection_PersistentFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( promise ) {

                return {  //  EARLY RETURN
                    promise, data: undefined
                };
            }
        }

        const promise_Loading = this._load_FeatureDetection_PersistentFeature_Entries_Data({ feature_detection_root__project_scnfl_mapping_tbl__id });

        const promise_Return = new Promise<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult>(( resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason));
            promise_Loading.then(noValue => { try {
                const featureDetection_PersistentFeature_Entries_Holder = this._featureDetection_PersistentFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( ! featureDetection_PersistentFeature_Entries_Holder ) {
                    throw Error("this._featureDetection_PersistentFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                }
                const data : CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries__get_FeatureDetection_PersistentFeature_EntriesHolder__FunctionResult = {
                    featureDetection_PersistentFeature_Entries_Holder
                }
                resolve(data);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this._promise_Load_FeatureDetection_PersistentFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, promise_Return );

        return {
            data: undefined,
            promise: promise_Return
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FeatureDetection_PersistentFeature_Entries_Data(
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
                        feature_detection_root__project_scnfl_mapping_tbl__id
                    };

                    const url = "d/rws/for-page/fdb/feature-detection-persistent-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

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
                this._promise_Load_FeatureDetection_PersistentFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise.then( valueIgnored => {
                this._promise_Load_FeatureDetection_PersistentFeature_Entries_Data_InProgress_Map_Key_FeatureDetectionRootId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
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
            console.warn( msg + ". featureDetection_PersistentFeature_EntriesList_FromWebservice: ", result_List )
            throw Error(msg);
        }

        const featureDetection_PersistentFeature_EntriesList : Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry> = [];

        //  Validate each entry is a number

        for ( const result_Entry of result_List ) {

            if ( result_Entry.ms_2_scn_nmbrs_array_json_String !== undefined && result_Entry.ms_2_scn_nmbrs_array_json_String !== null && result_Entry.ms_2_scn_nmbrs_array_json_String !== "" ) {

                if ( ! limelight__IsVariableAString( result_Entry.ms_2_scn_nmbrs_array_json_String ) ) {
                    const msg = "result_Entry.ms_2_scn_nmbrs_array_json_String in result_List is not a string. ";
                    console.warn( msg + "result_Entry: " + result_Entry + ", result_List: ", result_List )
                    throw Error(msg);
                }
                result_Entry.ms_2_scanNumbers_Array = JSON.parse( result_Entry.ms_2_scn_nmbrs_array_json_String );
            }

            const entry = result_Entry as CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry;

            if ( entry.id_PersistentFeature_Entry === undefined || entry.id_PersistentFeature_Entry === null ) {
                const msg = "entry.id_PersistentFeature_Entry is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.id_PersistentFeature_Entry ) ) {
                const msg = "entry.id_PersistentFeature_Entry in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.featureDetectionPersistentFeatureUploadedFileStatsId === undefined || entry.featureDetectionPersistentFeatureUploadedFileStatsId === null ) {
                const msg = "entry.featureDetectionPersistentFeatureUploadedFileStatsId is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.featureDetectionPersistentFeatureUploadedFileStatsId ) ) {
                const msg = "entry.featureDetectionPersistentFeatureUploadedFileStatsId in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.charge === undefined || entry.charge === null ) {
                const msg = "entry.charge is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.charge ) ) {
                const msg = "entry.charge in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.monoisotopicMass === undefined || entry.monoisotopicMass === null ) {
                const msg = "entry.monoisotopicMass is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.monoisotopicMass ) ) {
                const msg = "entry.monoisotopicMass in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.retentionTimeRange_Start === undefined || entry.retentionTimeRange_Start === null ) {
                const msg = "entry.retentionTimeRange_Start is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.retentionTimeRange_Start ) ) {
                const msg = "entry.retentionTimeRange_Start in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.retentionTimeRange_End === undefined || entry.retentionTimeRange_End === null ) {
                const msg = "entry.retentionTimeRange_End is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.retentionTimeRange_End ) ) {
                const msg = "entry.retentionTimeRange_End in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.retentionTimeRange_Apex === undefined || entry.retentionTimeRange_Apex === null ) {
                const msg = "entry.retentionTimeRange_Apex is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.retentionTimeRange_Apex ) ) {
                const msg = "entry.retentionTimeRange_Apex in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.abundance_RetentionTimeRange_Apex === undefined || entry.abundance_RetentionTimeRange_Apex === null ) {
                const msg = "entry.abundance_RetentionTimeRange_Apex is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.abundance_RetentionTimeRange_Apex ) ) {
                const msg = "entry.abundance_RetentionTimeRange_Apex in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.abundance_Total === undefined || entry.abundance_Total === null ) {
                const msg = "entry.abundance_Total is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.abundance_Total ) ) {
                const msg = "entry.abundance_Total in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.ms_2_scn_nmbrs_array_json_String === undefined && entry.ms_2_scn_nmbrs_array_json_String === null ) {
                if ( ! limelight__IsVariableAString( entry.ms_2_scn_nmbrs_array_json_String ) ) {
                    const msg = "entry.ms_2_scn_nmbrs_array_json_String in result_List is not a string. ";
                    console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                    throw Error(msg);
                }
            }
            if ( entry.ms_2_scanNumbers_Array === undefined && entry.ms_2_scanNumbers_Array === null ) {
                if ( ! ( entry.ms_2_scanNumbers_Array instanceof Array ) ) {
                    const msg = "( ! ( entry.ms_2_scanNumbers_Array instanceof Array ) ) ";
                    console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                    throw Error(msg);
                }
                for ( const ms_2_scanNumber in entry.ms_2_scanNumbers_Array ) {
                    if ( ! limelight__variable_is_type_number_Check( ms_2_scanNumber ) ) {
                        const msg = "ms_2_scanNumber in entry.ms_2_scanNumbers_Array in result_List is not a number. ";
                        console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                        throw Error(msg);
                    }
                }
            }

            featureDetection_PersistentFeature_EntriesList.push( entry );
        }

        const featureDetection_PersistentFeature_Entries_Holder = new CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder({ featureDetection_PersistentFeature_Entries: featureDetection_PersistentFeature_EntriesList });

        this._featureDetection_PersistentFeature_Entries_Holder_Map_Key_FeatureDetectionRootId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_PersistentFeature_Entries_Holder );
    }

}