/**
 * commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters.ts
 *
 * For Single Project Search  -  ProteinInfo
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder {

    private _proteinInfoMapKeyProteinSequenceVersionId: Map<number,{ proteinSequenceVersionId: number, proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }>}>

    constructor(
        {
            proteinInfoMapKeyProteinSequenceVersionId
        } : {
            proteinInfoMapKeyProteinSequenceVersionId: Map<number,{ proteinSequenceVersionId: number, proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }>}>
        }
    ) {
        this._proteinInfoMapKeyProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionId;
    }

    /**
     *
     * @param proteinSequenceVersionId
     */
    get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
        return this._proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    }

    /**
     *
     */
    get_proteinInfoMap_Values() {
        return this._proteinInfoMapKeyProteinSequenceVersionId.values();
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult {

    proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ProteinInfoHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadProteinInfo_Data__AlsoLoading_ReportedProteinInfo_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>

    private _promise_LoadProteinInfo_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>
    private _proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ProteinInfoHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult> {
        try {
            const result = this.get_ProteinInfoHolder_AllForSearch();

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
     * Get all for search for main filters
     */
    get_ProteinInfoHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>
        } {

        if (this._get_ProteinInfoHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ProteinInfoHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get proteinSequenceVersionIds_And_ProteinCoverage for All for Main filters

        const get_proteinSequenceVersionIds_And_ProteinCoverage_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

        if ( get_proteinSequenceVersionIds_And_ProteinCoverage_Result.data ) {

            // Have proteinSequenceVersionIds_And_ProteinCoverage for All for Main filters Data.  Return Load Peptide Ids Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_ProteinInfo_Data({ proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: get_proteinSequenceVersionIds_And_ProteinCoverage_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder })
            }
        }

        // NOT Have proteinSequenceVersionIds_And_ProteinCoverage for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadProteinInfo_Data__AlsoLoading_ReportedProteinInfo_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadProteinInfo_Data__AlsoLoading_ReportedProteinInfo_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

         this._promise_LoadProteinInfo_Data__AlsoLoading_ReportedProteinInfo_InProgress =
             new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>(
                 (resolve, reject) => { try {
                     get_proteinSequenceVersionIds_And_ProteinCoverage_Result.promise.catch(reason => {
                         reject(reason)
                     })
                     get_proteinSequenceVersionIds_And_ProteinCoverage_Result.promise.then( get_proteinSequenceVersionIds_And_ProteinCoverage_Result_Value => { try {
                         const promise_load_ProteinInfo_Data = this._load_ProteinInfo_Data({ proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: get_proteinSequenceVersionIds_And_ProteinCoverage_Result_Value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder });
                         promise_load_ProteinInfo_Data.catch( reason => {
                             reject(reason)
                         })
                         promise_load_ProteinInfo_Data.then( load_ProteinInfo_Data_Value => {
                             try {
                                 resolve(load_ProteinInfo_Data_Value);
                             } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadProteinInfo_Data__AlsoLoading_ReportedProteinInfo_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_ProteinInfo_Data(
        {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        } : {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult> {
        try {
            if ( this._promise_LoadProteinInfo_Data_InProgress ) {

                if ( this._proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress !== proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
                    const msg = "True ( this._promise_LoadProteinInfo_Data_InProgress ) but also true ( this._proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress !== proteinSequenceVersionIds_And_ProteinCoverage )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadProteinInfo_Data_InProgress;
            }

            const proteinSequenceVersionIds = Array.from( proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIdsUnique() );
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace(proteinSequenceVersionIds)

            this._proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;

            this._promise_LoadProteinInfo_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        proteinSequenceVersionIds : proteinSequenceVersionIds,
                    };

                    console.log("AJAX Call to get protein-info-prot-seq-v-ids-list START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/protein-info-prot-seq-v-ids-list";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                        try {
                            console.log("AJAX Call to get protein-info-prot-seq-v-ids-list END, Now: " + new Date() );

                            this._process_WebserviceResponse({ responseData });
                            resolve( this._get_ProteinInfoHolder__FunctionResult );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadProteinInfo_Data_InProgress.catch( reason => {
                this._promise_LoadProteinInfo_Data_InProgress = undefined;
                this._proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress = undefined;
            });
            this._promise_LoadProteinInfo_Data_InProgress.then( value => {
                this._promise_LoadProteinInfo_Data_InProgress = undefined;
                this._proteinSequenceVersionIds_And_ProteinCoverage_LoadProteinInfo_Data_InProgress = undefined;
            })

            return this._promise_LoadProteinInfo_Data_InProgress;

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
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const proteinAnnotationList = responseData.proteinAnnotationList;
        const proteinLengthList = responseData.proteinLengthList;

        const proteinInfoMapKeyProteinSequenceVersionId: Map<number,{ proteinSequenceVersionId: number, proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }>}> = new Map();

        for ( const proteinLengthServerItem of proteinLengthList ) {

            const proteinSequenceVersionId = proteinLengthServerItem.psvid;
            const proteinLength = proteinLengthServerItem.protLen;

            if ( proteinSequenceVersionId === undefined || proteinSequenceVersionId === null ) {
                const msg = "( proteinSequenceVersionId === undefined || proteinSequenceVersionId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( proteinSequenceVersionId ) ) {
                const msg = "proteinSequenceVersionId is not a number.  proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( proteinLength === undefined || proteinLength === null ) {
                const msg = "( proteinLength === undefined || proteinLength === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( proteinLength ) ) {
                const msg = "proteinLength is not a number.  proteinLength: " + proteinLength;
                console.warn(msg);
                throw Error(msg);
            }

            const proteinInfo = { proteinSequenceVersionId, proteinLength, annotations: [] }

            proteinInfoMapKeyProteinSequenceVersionId.set( proteinSequenceVersionId, proteinInfo );
        }

        for ( const proteinAnnotationServerItem of proteinAnnotationList ) {

            const proteinSequenceVersionId = proteinAnnotationServerItem.psvid;
            const name = proteinAnnotationServerItem.name;
            const description = proteinAnnotationServerItem.desc;
            const taxonomy = proteinAnnotationServerItem.tax;

            if ( proteinSequenceVersionId === undefined || proteinSequenceVersionId === null ) {
                const msg = "( proteinSequenceVersionId === undefined || proteinSequenceVersionId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( proteinSequenceVersionId ) ) {
                const msg = "proteinSequenceVersionId is not a number.  proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( name === undefined || name === null ) {
                const msg = "( taxonomy === undefined || taxonomy === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( name ) ) {
                const msg = "name is not a string.  name: " + name;
                console.warn(msg);
                throw Error(msg);
            }
            if ( description ) {
                if ( ! limelight__IsVariableAString( description ) ) {
                    const msg = "description is populated and is not a string.  description: " + description;
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            if ( taxonomy === undefined || taxonomy === null ) {
                const msg = "( taxonomy === undefined || taxonomy === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( taxonomy ) ) {
                const msg = "taxonomy is not a number.  taxonomy: " + taxonomy;
                console.warn(msg);
                throw Error(msg);
            }

            const annotation = {
                name, description, taxonomy
            };

            const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteinInfo ) {
                const msg = "Processing Protein Annotations. No proteinInfo for proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg);
                throw Error(msg);
            }

            proteinInfo.annotations.push( annotation );
        }

        const proteinInfo_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder({ proteinInfoMapKeyProteinSequenceVersionId });

        this._get_ProteinInfoHolder__FunctionResult = {
            proteinInfo_For_MainFilters_Holder
        }
    }

}