/**
 * commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries.ts
 *
 * For Single Project Search  -  FeatureDetection Singular Feature Entries - Contents of imported Feature Detection
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import { limelight__Compare_2_Sets_OfNumbers_For_Equality } from "page_js/common_all_pages/limelight__Compare_2_Sets_OfNumbers_For_Equality";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder {

    private _featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId : Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>;

    constructor(
        {
            featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId
        } : {
            featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId : Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>;
        }
    ) {
        this._featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId;
    }

    /**
     *
     */
    get_FeatureDetection_SingularFeature_Entries() {
        return this._featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId.values();
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry {
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
export class CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult {

    featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder
}

class INTERNAL__SingularIds_and_Holder {

    singularIds_Set: Set<number>
    featureDetection_SingularFeature_Entry_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder
}

class INTERNAL__InProgressItem_ForSpecificSingularIds_Promise {

    promise: Promise<void>
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries {

    //  !! If these values change, then create a new instance of this class

    //   MappingId:    is feature_detection_root__project_scnfl_mapping_tbl__id
    //   SingularId:   is feature_detection_singular_feature_entry_id

    private _featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId: Map<number, Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>> = new Map();

    private _featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId: Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder> = new Map();

    private _featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array__Map_Key_MappingId: Map<number, Array<INTERNAL__SingularIds_and_Holder>> = new Map();

    //  Loading in progress

    //  Loading of ALL SingularIds for MappingId
    private _promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId: Map<number, Promise<void>> = new Map();

    //  Loading of Specific SingularIds for MappingId
    private _promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId: Map<number, Array<INTERNAL__InProgressItem_ForSpecificSingularIds_Promise>> = new Map();

    //   Goes with Promises in just above: '_promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId'
    private _loadingInProgress__SingularIdsLoadingInProgress__Map_Key_MappingId: Map<number, Set<number>> = new Map()

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
    ): Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult> {

        return this.get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids__ReturnPromise({ feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set: undefined })
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
            data: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>
        } {

        return this.get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids({ feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set: undefined })
    }


    /**
     * !!!  Always return promise
     *
     */
    get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids__ReturnPromise(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
            optional__SingularFeatureIds_Set: Set<number>
        }
    ): Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult> {

        const result = this.get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids({ feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     *
     */
    get_FeatureDetection_SingularFeature_EntriesHolder__With_optional__SingularFeature_Ids(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
            optional__SingularFeatureIds_Set: Set<number>
        }
    ):
        {
            data: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>
        } {

        if ( optional__SingularFeatureIds_Set === undefined || optional__SingularFeatureIds_Set === null ) {

            // NOT HAVE parameter 'optional__SingularFeatureIds_Set'

            //  ONLY USE feature_detection_root__project_scnfl_mapping_tbl__id

            {
                const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( featureDetection_SingularFeature_Entries_Holder ) {

                    //  Have loaded data so just return it

                    const data : CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult = {
                        featureDetection_SingularFeature_Entries_Holder
                    }

                    return {  //  EARLY RETURN
                        data,
                        promise: undefined
                    };
                }
            }
            {
                const promise = this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( promise ) {

                    return {  //  EARLY RETURN
                        data: undefined, promise: new Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>((resolve, reject) => { try {

                            promise.catch(reason => reject(reason))
                            promise.then(novalue => { try {

                                const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                                if ( ! featureDetection_SingularFeature_Entries_Holder ) {
                                    throw Error("this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                                }

                                resolve({ featureDetection_SingularFeature_Entries_Holder })

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    };
                };
            }

            const promise_Loading = this._load_FeatureDetection_SingularFeature_Entries_Data({ feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set });

            promise_Loading.catch( reason => {
                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);
            });
            promise_Loading.then( valueIgnored => { try {

                //  Remove Promise

                this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId.delete(feature_detection_root__project_scnfl_mapping_tbl__id);

                //  Create Holder

                const featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId = this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.get(feature_detection_root__project_scnfl_mapping_tbl__id)

                if ( ! featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId ) {
                    const msg = "this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.get(feature_detection_root__project_scnfl_mapping_tbl__id) returned NOTHING for feature_detection_root__project_scnfl_mapping_tbl__id: " + feature_detection_root__project_scnfl_mapping_tbl__id
                    console.warn(msg)
                    throw Error(msg)
                }

                const featureDetection_SingularFeature_Entries_Holder = new CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder({
                    featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId: featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId
                })

                this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_SingularFeature_Entries_Holder );

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId.set( feature_detection_root__project_scnfl_mapping_tbl__id, promise_Loading )

            const promise_Return = new Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>(( resolve, reject) => { try {
                promise_Loading.catch(reason => {

                    reject(reason)

                });
                promise_Loading.then(noValue => { try {

                    const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                    if ( ! featureDetection_SingularFeature_Entries_Holder ) {
                        throw Error("this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id ); returned NOTHING inside promise_Loading.then")
                    }
                    const data : CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult = {
                        featureDetection_SingularFeature_Entries_Holder
                    }
                    resolve(data)

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return {
                data: undefined,
                promise: promise_Return
            }
        }

        ///////////

        // YES HAVE parameter 'optional__feature_detection_persistent_feature_entry_id'

        /////////

        {
            { //  Return Holder if already loaded

                const singularIds_and_Holder = this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

                if ( singularIds_and_Holder ) {

                    //  Have loaded data so just return it

                    return {
                        promise: undefined,
                        data: {
                            featureDetection_SingularFeature_Entries_Holder: singularIds_and_Holder.featureDetection_SingularFeature_Entry_Entries_Holder
                        }
                    }
                }
            }
            {    //  Next use "All" loaded if available
                const featureDetection_SingularFeature_Entries_Holder = this._featureDetection_SingularFeature_Entries_Holder__ALL_For_MappingId__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( featureDetection_SingularFeature_Entries_Holder ) {

                    this._create_HOLDER_For_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

                    //  Then redo get for SingularId

                    const singularIds_and_Holder = this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

                    if ( singularIds_and_Holder ) {

                        //  Have loaded data so just return it

                        return {
                            promise: undefined,
                            data: {
                                featureDetection_SingularFeature_Entries_Holder: singularIds_and_Holder.featureDetection_SingularFeature_Entry_Entries_Holder
                            }
                        }
                    }
                }
            }

            {    //  Next use "All" loading Promise if available
                const promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress = this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress_Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id );
                if ( promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress ) {

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>((resolve, reject) => { try {

                            promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress.catch(reason => reject(reason))
                            promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress.then(novalue => { try {

                                this._create_HOLDER_For_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

                                const singularIds_and_Holder = this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

                                if ( ! singularIds_and_Holder ) {
                                    const msg = "this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id }) returned NOTHING  inside promise_Load_FeatureDetection_SingularFeature_Entries_Data__ALL_For_MappingId___InProgress.then.  optional__SingularFeatureIds_Set:" + optional__SingularFeatureIds_Set + ", feature_detection_root__project_scnfl_mapping_tbl__id: " + feature_detection_root__project_scnfl_mapping_tbl__id;
                                    console.warn(msg)
                                    throw Error(msg)
                                }

                                resolve({ featureDetection_SingularFeature_Entries_Holder: singularIds_and_Holder.featureDetection_SingularFeature_Entry_Entries_Holder })

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    }
                }
            }
        }

        //

        let promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array =
            this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )

        if ( ! promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array ) {

            promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array = []

        } else {

        }

        //  Replace with a copy
        promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array =
            Array.from( promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array )

        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.set(
            feature_detection_root__project_scnfl_mapping_tbl__id, promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array )


        const singularFeatureIds_ToLoadDataFor = new Set<number>()

        for ( const singularFeatureId_Requested of optional__SingularFeatureIds_Set ) {

            if ( ( ! this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.has( singularFeatureId_Requested ) )
                && ( ! this._loadingInProgress__SingularIdsLoadingInProgress__Map_Key_MappingId.has( singularFeatureId_Requested ) ) ) {

                //  singularFeatureId_Requested NOT already loaded and NOT already loading

                singularFeatureIds_ToLoadDataFor.add( singularFeatureId_Requested )
            }
        }

        if ( singularFeatureIds_ToLoadDataFor.size > 0 ) {

            //  Have new Singular Feature Ids to load

            const promise_Loading = this._load_FeatureDetection_SingularFeature_Entries_Data({ feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set: singularFeatureIds_ToLoadDataFor });

            const inProgressItem_ForSpecificSingularIds_Promise: INTERNAL__InProgressItem_ForSpecificSingularIds_Promise = {
                promise: promise_Loading
            }

            //  Add to In Progress Promises
            promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array.push( inProgressItem_ForSpecificSingularIds_Promise )

            promise_Loading.catch( reason => {

                {  //  Remove Promise

                    let promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal =
                        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )

                    if ( promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal ) {

                        promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal =
                            promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal.filter( inProgress_Entry => {

                                if ( inProgressItem_ForSpecificSingularIds_Promise === inProgress_Entry ) {

                                    return false  // Skip to remove
                                }
                                return true
                            } )

                        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.set(
                            feature_detection_root__project_scnfl_mapping_tbl__id, promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal )
                    }
                }
            });
            promise_Loading.then( valueIgnored => { try {

                {  //  Remove Promise

                    let promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal =
                        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )

                    if ( promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal ) {

                        promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal =
                            promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal.filter( inProgress_Entry => {

                                if ( inProgressItem_ForSpecificSingularIds_Promise === inProgress_Entry ) {

                                    return false  // Skip to remove
                                }
                                return true
                            } )

                        this._promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__Map_Key_MappingId.set(
                            feature_detection_root__project_scnfl_mapping_tbl__id, promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array__For_Removal )
                    }
                }

                //  Create Holder

                this._create_HOLDER_For_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            //   END:   Add Promise for request to get Singular Ids not already retrieving

        }

        const promise_AllLoadingInProgress_PromiseArray: Array<Promise<void>> = []

        for ( const entry of promise_Load_FeatureDetection_SingularFeature_Entries_Data__For_SpecificSingularIds___InProgress_Array ) {
            promise_AllLoadingInProgress_PromiseArray.push( entry.promise )
        }

        const promise_AllLoadingInProgress = Promise.all( promise_AllLoadingInProgress_PromiseArray )

        const promise_Return = new Promise<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries__get_FeatureDetection_SingularFeature_EntriesHolder__FunctionResult>(( resolve, reject) => { try {

            promise_AllLoadingInProgress.catch(reason => {

                reject(reason)
            });
            promise_AllLoadingInProgress.then(noValue => { try {

                const singularIds_and_Holder = this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id })
                if ( ! singularIds_and_Holder ) {
                    throw Error("this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id }); returned NOTHING inside promise_Loading.then. feature_detection_root__project_scnfl_mapping_tbl__id: " +
                        feature_detection_root__project_scnfl_mapping_tbl__id +
                        ", optional__SingularFeatureIds_Set: " + optional__SingularFeatureIds_Set
                    )
                }

                resolve({ featureDetection_SingularFeature_Entries_Holder: singularIds_and_Holder.featureDetection_SingularFeature_Entry_Entries_Holder });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise: promise_Return
        }
    }

    /**
     *
     * @param optional__SingularFeatureIds_Set
     * @param feature_detection_root__project_scnfl_mapping_tbl__id
     */
    private _get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set(
        {
            optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            optional__SingularFeatureIds_Set: Set<number>
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : INTERNAL__SingularIds_and_Holder {

        const featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array = this._featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )

        if ( featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array ) {
            for ( const featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Entry of featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array ) {

                if ( limelight__Compare_2_Sets_OfNumbers_For_Equality( optional__SingularFeatureIds_Set, featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Entry.singularIds_Set ) ) {

                    return featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Entry // EARLY RETURN
                }
            }
        }
    }

    /**
     *
     * @param optional__SingularFeatureIds_Set
     * @param feature_detection_root__project_scnfl_mapping_tbl__id
     */
    private _create_HOLDER_For_optional__SingularFeatureIds_Set(
        {
            optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            optional__SingularFeatureIds_Set: Set<number>
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : void {

        {  //  Check if Holder for Singular Ids Exist

            if ( this._get_INTERNAL__SingularIds_and_HolderFor_optional__SingularFeatureIds_Set({ optional__SingularFeatureIds_Set, feature_detection_root__project_scnfl_mapping_tbl__id }) ) {

                //  Entry ALREADY EXIST

                return  // EARLY RETURN
            }
        }

        //  Create Holder for Singular Ids

        const featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId = this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.get(feature_detection_root__project_scnfl_mapping_tbl__id)

        if ( ! featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId ) {
            const msg = "this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.get(feature_detection_root__project_scnfl_mapping_tbl__id) returned NOTHING for feature_detection_root__project_scnfl_mapping_tbl__id: " + feature_detection_root__project_scnfl_mapping_tbl__id
            console.warn(msg)
            throw Error(msg)
        }

        const featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId: Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry> = new Map()

        for ( const optional__SingularFeatureId of optional__SingularFeatureIds_Set ) {

            const singularFeature = featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId.get( optional__SingularFeatureId )
            if ( ! singularFeature ) {
                const msg = "featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId.get( optional__SingularFeatureId ) returned NOTHING for optional__SingularFeatureId: " + optional__SingularFeatureId + ", feature_detection_root__project_scnfl_mapping_tbl__id: " + feature_detection_root__project_scnfl_mapping_tbl__id
                console.warn(msg)
                throw Error(msg)
            }
            featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId.set( singularFeature.id, singularFeature )
        }

        const featureDetection_SingularFeature_Entry_Entries_Holder = new CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder({
            featureDetection_SingularFeature_Entries_Map_Key_SingularFeatureId
        })


        let featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array = this._featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array__Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )

        if ( ! featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array ) {
            featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array = []
            this._featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array__Map_Key_MappingId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array )
        }

        featureDetection_SingularFeature_Entries_Holder__For_SingularIds_Array.push( {
            featureDetection_SingularFeature_Entry_Entries_Holder, singularIds_Set: optional__SingularFeatureIds_Set
        })
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FeatureDetection_SingularFeature_Entries_Data(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Set
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
            optional__SingularFeatureIds_Set: Set<number>
        }
    ) : Promise<void> {

        try {
            //  NO optional__SingularFeatureIds_Set.  Only use feature_detection_root__project_scnfl_mapping_tbl__id

            const promise = new Promise<void>(
                ( resolve, reject ) => { try {

                    if ( optional__SingularFeatureIds_Set ) {

                        const promise_load_FeatureDetection_SingularFeature_MaxAllowed =
                            this._load_FeatureDetection_SingularFeature_MaxAllowed({ feature_detection_root__project_scnfl_mapping_tbl__id })

                        promise_load_FeatureDetection_SingularFeature_MaxAllowed.catch( (reason) => { reject(reason) }  );
                        promise_load_FeatureDetection_SingularFeature_MaxAllowed.then( promiseResult => { try {

                            let batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed

                            if ( batchSize > promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed ) {
                                batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed;
                            }

                            const optional__SingularFeatureIds_Array_All = Array.from( optional__SingularFeatureIds_Set )
                            limelight__Sort_ArrayOfNumbers_SortArrayInPlace(optional__SingularFeatureIds_Array_All)

                            //  Put singularFeatureIds into Batches

                            const singularFeatureIds_Batches: Array<Array<number>> = []

                            {
                                let singularFeatureIds_NextBatch: Array<number> = []

                                for ( const optional__SingularFeatureId of optional__SingularFeatureIds_Array_All ) {

                                    singularFeatureIds_NextBatch.push( optional__SingularFeatureId )

                                    if ( singularFeatureIds_NextBatch.length === batchSize ) {
                                        singularFeatureIds_Batches.push( singularFeatureIds_NextBatch )
                                        singularFeatureIds_NextBatch = []
                                    }
                                }
                                if ( singularFeatureIds_NextBatch.length > 0 ) {
                                    //  Add last batch
                                    singularFeatureIds_Batches.push( singularFeatureIds_NextBatch )
                                }
                            }

                            const promises_GetData: Array<Promise<void>> = []

                            {
                                for ( const singularFeatureIds_Batch of singularFeatureIds_Batches ) {

                                    const promise = this._load_FeatureDetection_SingularFeature_Entries_Data_GetDataForStartIdEndId({
                                        feature_detection_root__project_scnfl_mapping_tbl__id,
                                        optional__SingularFeatureIds_Array: singularFeatureIds_Batch,
                                        startId: undefined, endId: undefined
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

                    } else {

                        //  Use minId maxId for batches

                        const promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed =
                            this._load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed({ feature_detection_root__project_scnfl_mapping_tbl__id })

                        promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed.catch( () => { reject() }  );
                        promise_load_FeatureDetection_SingularFeature_MinMaxId_MaxAllowed.then( promiseResult => { try {

                            let batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed

                            if ( batchSize > promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed ) {
                                batchSize = promiseResult.max_StartEnd_Id_DifferenceInclusive_Allowed;
                            }

                            const promises_GetData: Array<Promise<void>> = []

                            for ( let batchStartId = promiseResult.minId; batchStartId <= promiseResult.maxId; batchStartId += batchSize ) {

                                const promise = this._load_FeatureDetection_SingularFeature_Entries_Data_GetDataForStartIdEndId({
                                    feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Array: undefined,
                                    startId: batchStartId, endId: batchStartId + batchSize - 1
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
                    }

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

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

            return promise;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Get Max allowed for Singular Feature
     *
     */
    private _load_FeatureDetection_SingularFeature_MaxAllowed(
        {
            feature_detection_root__project_scnfl_mapping_tbl__id
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<{
        max_StartEnd_Id_DifferenceInclusive_Allowed: number
    }> {

        try {
            const promise = new Promise<{
                max_StartEnd_Id_DifferenceInclusive_Allowed: number
            }>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        feature_detection_root__project_scnfl_mapping_tbl__id
                    };

                    const url =  "d/rws/for-page/fdb/feature-detection-singular-feature-entries-max-allowed-requested-singular-ids--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        if ( responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === undefined || responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === null ) {
                            const msg = "( responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === undefined || responseData.max_StartEnd_Id_DifferenceInclusive_Allowed === null )  url: " + url;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        resolve({
                            max_StartEnd_Id_DifferenceInclusive_Allowed: responseData.max_StartEnd_Id_DifferenceInclusive_Allowed
                        });

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

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
            feature_detection_root__project_scnfl_mapping_tbl__id, optional__SingularFeatureIds_Array,
            startId, endId
        } : {
            feature_detection_root__project_scnfl_mapping_tbl__id: number
            optional__SingularFeatureIds_Array: Array<number>
            startId: number
            endId: number
        }
    ) : Promise<any> {

        try {
            const promise = new Promise<any>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        feature_detection_root__project_scnfl_mapping_tbl__id,
                        optional__SingularFeatureIds_List: optional__SingularFeatureIds_Array,
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

        const loadedData_IntermediateList : Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry> = [];

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

                const entry: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry = {
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
                if ( ! limelight__variable_is_type_number_Check( entry.id ) ) {
                    const msg = "entry.id at index is not a number. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( entry.ms_1_scan_number === undefined || entry.ms_1_scan_number === null ) {
                    const msg = "entry.ms_1_scan_number is undefined or null. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( entry.ms_1_scan_number ) ) {
                    const msg = "entry.ms_1_scan_number at index is not a number. ";
                    console.warn( msg + "entry: " + entry + ", index: ", index )
                    throw Error(msg);
                }
                if ( entry.monoisotopic_mass !== undefined && entry.monoisotopic_mass !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.monoisotopic_mass ) ) {
                        const msg = "entry.monoisotopic_mass at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.intensity !== undefined && entry.intensity !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.intensity ) ) {
                        const msg = "entry.intensity at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.charge !== undefined && entry.charge !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.charge ) ) {
                        const msg = "entry.charge at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.base_isotope_peak !== undefined && entry.base_isotope_peak !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.base_isotope_peak ) ) {
                        const msg = "entry.base_isotope_peak at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.analysis_window_start_m_z !== undefined && entry.analysis_window_start_m_z !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.analysis_window_start_m_z ) ) {
                        const msg = "entry.analysis_window_start_m_z at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.analysis_window_end_m_z !== undefined && entry.analysis_window_end_m_z !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.analysis_window_end_m_z ) ) {
                        const msg = "entry.analysis_window_end_m_z at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }
                if ( entry.correlation_score !== undefined && entry.correlation_score !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( entry.correlation_score ) ) {
                        const msg = "entry.correlation_score at index is not a number. ";
                        console.warn( msg + "entry: " + entry + ", index: ", index )
                        throw Error(msg);
                    }
                }

                loadedData_IntermediateList.push( entry );
            }
        }

        //   Process loaded data now that is in intermediateList

        let featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId = this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.get( feature_detection_root__project_scnfl_mapping_tbl__id )
        if ( ! featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId ) {
            featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId = new Map()
            this._featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId_Map_Key_MappingId.set( feature_detection_root__project_scnfl_mapping_tbl__id, featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId )
        }

        for ( const entry of loadedData_IntermediateList ) {

            featureDetection_SingularFeature_Entries_ALL_Loaded_Entries_Map_SingularId.set( entry.id, entry )
        }
    }


}

