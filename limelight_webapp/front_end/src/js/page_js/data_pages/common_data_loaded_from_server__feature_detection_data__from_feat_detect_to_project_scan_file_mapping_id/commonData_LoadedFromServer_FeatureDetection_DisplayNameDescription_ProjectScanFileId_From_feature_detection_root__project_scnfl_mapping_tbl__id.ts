/**
 * commonData_LoadedFromServer_FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id.ts
 *
 * For FeatureDetection DisplayName and Description and ProjectScanFileId From feature_detection_root__project_scnfl_mapping_tbl__id
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder {

    readonly projectScanFileId : number
    readonly displayLabel : string
    readonly description : string
}

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult {

    featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id {

    //  !! If these values change, then create a new instance of this class

    private _featureDetection_Holder_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id: Map<number, CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder> = new Map();

    private _promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id: Map<number, Promise<CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult>> = new Map();

    /**
     *
     */
    private constructor() {
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_SingularFeature
     */
    static getNewInstance( ) {
        return new CommonData_LoadedFromServer_FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id();
    }

    /**
     * !!!  Always return promise
     *
     */
    get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_ReturnPromise(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ): Promise<CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult> {

        const result = this.get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder({ feature_detection_root__project_scnfl_mapping_tbl__id });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     *
     */
    get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ):
        {
            data: CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult>
        } {

        {
            const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_Holder_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( featureDetection_SingularFeature_Entries_Holder ) {

                //  Have loaded data so just return it

                const data : CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult = {
                    featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: featureDetection_SingularFeature_Entries_Holder
                }

                return {  //  EARLY RETURN
                    data,
                    promise: undefined
                };
            }
        }
        {
            const promise = this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.get( feature_detection_root__project_scnfl_mapping_tbl__id );
            if ( promise ) {

                return {  //  EARLY RETURN
                    promise, data: undefined
                };
            }
        }

        const promise_Loading = this._load_Data({ feature_detection_root__project_scnfl_mapping_tbl__id });

        const promise_Return = new Promise<CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult>(( resolve, reject) => { try {
            promise_Loading.catch(reason => reject(reason));
            promise_Loading.then(noValue => { try {
                const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_Holder_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( ! featureDetection_SingularFeature_Entries_Holder ) {
                    throw Error("this._featureDetection_Holder_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                }
                const data : CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id__get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder__FunctionResult = {
                    featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: featureDetection_SingularFeature_Entries_Holder
                }
                resolve(data);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.set( feature_detection_root__project_scnfl_mapping_tbl__id, promise_Return );

        return {
            data: undefined,
            promise: promise_Return
        }
    }

    /**
     *
     */
    private _load_Data(
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

                    const url =  "d/rws/for-page/fdb/feature-detection--name-from-feature-detection-root--project-scnfl-mapping-tbl--id";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
                    promise_webserviceCallStandardPost.catch( reason => {

                        this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.delete(feature_detection_root__project_scnfl_mapping_tbl__id);

                        reject()
                    });
                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.delete(feature_detection_root__project_scnfl_mapping_tbl__id);

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        const holder : CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder = {
                            projectScanFileId: responseData.projectScanFileId ,
                            displayLabel: responseData.displayLabel,
                            description: responseData.description
                        };

                        if ( holder.projectScanFileId === undefined || holder.projectScanFileId === null ) {
                            const msg = "( holder.projectScanFileId === undefined || holder.projectScanFileId === null )"
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( ! limelight__variable_is_type_number_Check( holder.projectScanFileId ) ) {
                            const msg = "( ! limelight__variable_is_type_number_Check( holder.projectScanFileId ) )"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        if ( holder.displayLabel === undefined || holder.displayLabel === null ) {
                            const msg = "( holder.displayLabel === undefined || holder.displayLabel === null )"
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( ! limelight__IsVariableAString( holder.displayLabel ) ) {
                            const msg = "( ! limelight__IsVariableAString( holder.displayLabel ) )"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        if ( holder.description === undefined || holder.description === null ) {
                            const msg = "( holder.description === undefined || holder.description === null )"
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( ! limelight__IsVariableAString( holder.description ) ) {
                            const msg = "( ! limelight__IsVariableAString( holder.description ) )"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        this._featureDetection_Holder_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.set( feature_detection_root__project_scnfl_mapping_tbl__id, holder );

                        resolve();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promise.catch( reason => {
                this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise.then( valueIgnored => {
                this._promise_Load_Data_InProgress_Map_Key_feature_detection_root__project_scnfl_mapping_tbl__id.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            })

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


}