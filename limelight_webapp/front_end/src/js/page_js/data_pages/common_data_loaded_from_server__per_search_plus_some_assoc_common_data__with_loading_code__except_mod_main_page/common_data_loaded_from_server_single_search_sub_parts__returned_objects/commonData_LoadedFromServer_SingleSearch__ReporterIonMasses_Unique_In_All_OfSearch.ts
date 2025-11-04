/**
 * commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch.ts
 *
 * For Single Project Search  -  ReporterIonMasses_Unique_In_All_OfSearch
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder {

    private _reporterIonMasses_ForSearch : Set<number>;

    constructor(
        {
            reporterIonMasses_ForSearch
        } : {
            reporterIonMasses_ForSearch : Set<number>
        }
    ) {
        this._reporterIonMasses_ForSearch = reporterIonMasses_ForSearch;
    }

    /**
     *
     */
    get_ReporterIonMasses_ForSearch() {
        return this._reporterIonMasses_ForSearch;
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult {

    reporterIonMasses_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _parent_Object: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ReporterIonMasses_ForSearchHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult

    private _promise_Load_ReporterIonMasses_ForSearch_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, parent_Object
        }: {
            projectSearchId: number
            parent_Object: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._parent_Object = parent_Object;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, parent_Object
        }: {
            projectSearchId: number
            parent_Object: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch({
            projectSearchId, parent_Object
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_ReporterIonMasses_ForSearchHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult> {
        try {
            const result = this.get_ReporterIonMasses_ForSearchHolder();

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
     * 
     */
    get_ReporterIonMasses_ForSearchHolder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult>
        } {

        if (this._get_ReporterIonMasses_ForSearchHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ReporterIonMasses_ForSearchHolder__FunctionResult,
                promise: undefined
            };
        }

        if ( ! this._parent_Object.get_common_Flags_SingleSearch_ForProjectSearchId().anyPsmHas_ReporterIons ) {

            //  NO PSMs have Reporter Ions

            this._createEmpty()

            return {
                data: this._get_ReporterIonMasses_ForSearchHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_ReporterIonMasses_ForSearch_Data()
        }
    }

    /**
     * Create Empty for when None for Search
     */
    private _createEmpty() {

        const reporterIonMassesUniqueSet = new Set<number>()

        const reporterIonMasses_ForSearch_Holder = new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder({ reporterIonMasses_ForSearch: reporterIonMassesUniqueSet });

        this._get_ReporterIonMasses_ForSearchHolder__FunctionResult = {
            reporterIonMasses_ForSearch_Holder
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_ReporterIonMasses_ForSearch_Data() : Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult> {
        try {
            if ( this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress ) {

                return this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress;
            }

            this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch__get_ReporterIonMasses_ForSearchHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId
                    };

                    console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/reporter-ion-masses-unique-search-level-single-project-search-id";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url , dataRetrieval_CanRetry: true}) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });

                        resolve( this._get_ReporterIonMasses_ForSearchHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress.catch( reason => {
                this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress = undefined;
            });
            this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress.then( value => {
                this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress = undefined;
            })

            return this._promise_Load_ReporterIonMasses_ForSearch_Data_InProgress;

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

        const reporterIonMassesUniqueList = responseData.reporterIonMassesUniqueList;

        if ( ! ( reporterIonMassesUniqueList instanceof  Array ) ) {
            const msg = "reporterIonMassesUniqueList is not an Array";
            console.warn( msg + ". reporterIonMassesUniqueList: ", reporterIonMassesUniqueList )
            throw Error(msg);
        }

        //  Validate each entry is a number

        for ( const entry of reporterIonMassesUniqueList ) {
            if ( ! limelight__variable_is_type_number_Check( entry ) ) {
                const msg = "entry in reporterIonMassesUniqueList is not a number";
                console.warn( msg + ". reporterIonMassesUniqueList: ", reporterIonMassesUniqueList )
                throw Error(msg);
            }
        }

        const reporterIonMassesUniqueSet = new Set( reporterIonMassesUniqueList )

        const reporterIonMasses_ForSearch_Holder = new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder({ reporterIonMasses_ForSearch: reporterIonMassesUniqueSet });

        this._get_ReporterIonMasses_ForSearchHolder__FunctionResult = {
            reporterIonMasses_ForSearch_Holder
        }
    }

}