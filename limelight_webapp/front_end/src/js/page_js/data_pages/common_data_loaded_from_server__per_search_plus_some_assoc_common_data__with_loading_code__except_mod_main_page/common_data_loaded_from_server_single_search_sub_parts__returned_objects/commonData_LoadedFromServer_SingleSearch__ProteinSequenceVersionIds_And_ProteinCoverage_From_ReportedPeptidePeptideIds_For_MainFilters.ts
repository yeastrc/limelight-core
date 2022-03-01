/**
 * commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptideProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters.ts
 *
 * For Single Project Search  -  proteinCoverage for ReportedPeptideId, proteinSequenceVersionIds for ReportedPeptideId
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder {

    //  	Protein Coverage Data Per Reported Peptide Id
    // 					- Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
    private _proteinCoverage_KeyReportedPeptideId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>>;

    //  Created when requested
    //  	Protein Coverage Data Per ProteinSequenceVersionId
    // 					- Map <integer,[Object]> <ProteinSequenceVersionId, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
    private _proteinCoverage_Key_ProteinSequenceVersionId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>>;

    //    proteinSequenceVersionIds  Per Reported Peptide Id
    private _proteinSequenceVersionIds_KeyReportedPeptideId: Map<number, Set<number>>;

    //  Created when requested
    //    Reported Peptide Ids Per proteinSequenceVersionId - Computed when requested
    private _reportedPeptideIds_Map_Key_ProteinSequenceVersionId: Map<number, Set<number>>;

    //  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
    private _proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>


    constructor(
        {
            proteinCoverage_KeyReportedPeptideId, proteinSequenceVersionIds_KeyReportedPeptideId, proteinSequenceVersionIdsUnique
        } : {
            proteinCoverage_KeyReportedPeptideId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>>;
            proteinSequenceVersionIds_KeyReportedPeptideId: Map<number, Set<number>>;
            proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>
        }
    ) {
        this._proteinCoverage_KeyReportedPeptideId = proteinCoverage_KeyReportedPeptideId
        this._proteinSequenceVersionIds_KeyReportedPeptideId = proteinSequenceVersionIds_KeyReportedPeptideId
        this._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique
    }

    /**
     *
     * @param reportedPeptideId
     */
    get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._proteinCoverage_KeyReportedPeptideId.get(reportedPeptideId);
    }

    /**
     * Prefer this is NOT USED.  Here to support existing code
     */
    get_proteinCoverage_KeyReportedPeptideId__ReturnFullMap_PREFER_NOT_USE() {
        return this._proteinCoverage_KeyReportedPeptideId;
    }

    /**
     *
     */
    get_proteinCoverage_KeyReportedPeptideId__ReturnMap_ValueData() {
        return this._proteinCoverage_KeyReportedPeptideId.values();
    }

    /**
     *
     * @param proteinSequenceVersionId
     * @returns proteinCoverage_Array_For_ProteinSequenceVersionId for proteinSequenceVersionId
     */
    get_proteinCoverage_Entries_For_ProteinSequenceVersionId(proteinSequenceVersionId: number) {

        if ( ! this._proteinCoverage_Key_ProteinSequenceVersionId ) {

            this._proteinCoverage_Key_ProteinSequenceVersionId = new Map()

            for ( const mapEntry of this._proteinCoverage_KeyReportedPeptideId.values() ) {
                for (const entry of mapEntry) {

                    let proteinCoverage_Array_For_ProteinSequenceVersionId = this._proteinCoverage_Key_ProteinSequenceVersionId.get(entry.proteinSequenceVersionId);
                    if ( ! proteinCoverage_Array_For_ProteinSequenceVersionId ) {
                        proteinCoverage_Array_For_ProteinSequenceVersionId = []
                        this._proteinCoverage_Key_ProteinSequenceVersionId.set(entry.proteinSequenceVersionId, proteinCoverage_Array_For_ProteinSequenceVersionId);
                    }
                    proteinCoverage_Array_For_ProteinSequenceVersionId.push(entry)
                }
            }
        }

        return this._proteinCoverage_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId)
    }

    /**
     * @param reportedPeptideId
     */
    get_proteinSequenceVersionIds_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._proteinSequenceVersionIds_KeyReportedPeptideId.get(reportedPeptideId);
    }

    /**
     *
     */
    get_proteinSequenceVersionIdsUnique() {
        return this._proteinSequenceVersionIdsUnique
    }

    /**
     * @param proteinSequenceVersionId
     */
    get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId: number) {
        if ( ! this._reportedPeptideIds_Map_Key_ProteinSequenceVersionId ) {

            const reportedPeptideIds_Map_Key_ProteinSequenceVersionId: Map<number, Set<number>> = new Map()
            {
                const proteinSequenceVersionIds_KeyReportedPeptideId = this._proteinSequenceVersionIds_KeyReportedPeptideId
                for ( const mapEntry of proteinSequenceVersionIds_KeyReportedPeptideId.entries() ) {
                    const reportedPeptideId = mapEntry[0];
                    const proteinSequenceVersionIds = mapEntry[1];
                    for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {
                        let reportedPeptideIds_Result = reportedPeptideIds_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
                        if ( ! reportedPeptideIds_Result ) {
                            reportedPeptideIds_Result = new Set();
                            reportedPeptideIds_Map_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, reportedPeptideIds_Result);
                        }
                        reportedPeptideIds_Result.add(reportedPeptideId)
                    }
                }
            }
            this._reportedPeptideIds_Map_Key_ProteinSequenceVersionId = reportedPeptideIds_Map_Key_ProteinSequenceVersionId;
        }

        return this._reportedPeptideIds_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId)
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult {

    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
}

//   !!!  MAIN CLASS

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>

    private _promise_Load_Primary_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>
    private _reportedPeptideIds_LoadPeptideIds_Data_InProgress: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

    /**
     *
     * @param projectSearchId
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
     * @param projectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult> {
        try {
            const result = this.get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

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
    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>
        } {

        if (this._get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load Peptide Ids Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_ProteinSequenceVersionIds_And_ProteinCoverage_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedPeptideIds for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>(
                (resolve, reject) => { try {
                    get_reportedPeptideIds_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                        const promise_load_PeptideIds_Data = this._load_ProteinSequenceVersionIds_And_ProteinCoverage_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                        promise_load_PeptideIds_Data.catch( reason => {
                            reject(reason)
                        })
                        promise_load_PeptideIds_Data.then( load_PeptideIds_Data_Value => {
                            try {
                                resolve(load_PeptideIds_Data_Value);
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_Load_Primary_Data__AlsoLoading_ReportedPeptideIds_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_ProteinSequenceVersionIds_And_ProteinCoverage_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult> {
        try {
            if ( this._promise_Load_Primary_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadPeptideIds_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadPeptideIds_Data_InProgress !== reportedPeptideIds )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_Load_Primary_Data_InProgress;
            }

            if ( ! ( reportedPeptideIds instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideIds instanceof Array ) ) in _load_PeptideIds_Data";
                console.warn(msg);
                throw Error(msg);
            }

            this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );

            //  Sort numbers ascending so the same request always sent to the server to match prev request for caching.

            reportedPeptideIds_Sorted.sort( (a,b) => {
                if ( a < b ) {
                    return  -1;
                }
                if ( a > b ) {
                    return  1;
                }
                return 0;
            } );

            this._promise_Load_Primary_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Sorted,
                    };

                    console.log("AJAX Call to get protein-coverage-per-reported-peptide-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id-version-0001";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get protein-coverage-per-reported-peptide-id END, Now: " + new Date() );

                        if ( ! responseData.proteinCoverageList ) {
                            const msg = "responseData.proteinCoverageList has no value after webservice call to " + url;
                            console.warn( msg );
                            throw Error( msg )
                        }
                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_Primary_Data_InProgress.catch( reason => {
                this._promise_Load_Primary_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
            });
            this._promise_Load_Primary_Data_InProgress.then( valueIgnored => {
                this._promise_Load_Primary_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadPeptideIds_Data_InProgress = undefined;
            })

            return this._promise_Load_Primary_Data_InProgress;

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

        const proteinCoverage_KeyReportedPeptideId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>> = new Map();

        const proteinSequenceVersionIds_KeyReportedPeptideId : Map<number, Set<number>> = new Map;

        const proteinSequenceVersionIdsUnique : Set<number> = new Set(); // - Set <integer> : <proteinSequenceVersionIds>

        for ( const proteinCoverage of responseData.proteinCoverageList ) {

            // this.rPId = item.getReportedPeptideId();
            // this.pSVId = item.getProteinSequenceVersionId();
            // this.pSPs = item.getProteinStartPosition();
            // this.pEPs = item.getProteinEndPosition();

            if ( proteinCoverage.rPId === undefined || proteinCoverage.rPId === null ) {
                const msg = "( proteinCoverage.rPId === undefined || proteinCoverage.rPId === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage.pSVId === undefined || proteinCoverage.pSVId === null ) {
                const msg = "( proteinCoverage.pSVId === undefined || proteinCoverage.pSVId === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage.pSPs === undefined || proteinCoverage.pSPs === null ) {
                const msg = "( proteinCoverage.pSPs === undefined || proteinCoverage.pSPs === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage.pEPs === undefined || proteinCoverage.pEPs === null ) {
                const msg = "( proteinCoverage.pEPs === undefined || proteinCoverage.pEPs === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! variable_is_type_number_Check( proteinCoverage.rPId ) ) {
                const msg = "( ! variable_is_type_number_Check( proteinCoverage.rPId ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! variable_is_type_number_Check( proteinCoverage.pSVId ) ) {
                const msg = "( ! variable_is_type_number_Check( proteinCoverage.pSVId ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! variable_is_type_number_Check( proteinCoverage.pSPs ) ) {
                const msg = "( ! variable_is_type_number_Check( proteinCoverage.pSPs ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! variable_is_type_number_Check( proteinCoverage.pEPs ) ) {
                const msg = "( ! variable_is_type_number_Check( proteinCoverage.pEPs ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }

            const entry = { reportedPeptideId : proteinCoverage.rPId, proteinSequenceVersionId : proteinCoverage.pSVId, proteinStartPosition : proteinCoverage.pSPs, proteinEndPosition : proteinCoverage.pEPs };

            let proteinCoverageList_ForReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get( entry.reportedPeptideId );
            if ( ! proteinCoverageList_ForReportedPeptideId ) {
                proteinCoverageList_ForReportedPeptideId = [];
                proteinCoverage_KeyReportedPeptideId.set( entry.reportedPeptideId, proteinCoverageList_ForReportedPeptideId );
            }
            proteinCoverageList_ForReportedPeptideId.push( entry );

            {
                let proteinSequenceVersionIds = proteinSequenceVersionIds_KeyReportedPeptideId.get( entry.reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    proteinSequenceVersionIds = new Set();
                    proteinSequenceVersionIds_KeyReportedPeptideId.set( entry.reportedPeptideId, proteinSequenceVersionIds );
                }
                proteinSequenceVersionIds.add( entry.proteinSequenceVersionId );
            }
            {
                proteinSequenceVersionIdsUnique.add(entry.proteinSequenceVersionId);
            }
        }

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder({
            proteinCoverage_KeyReportedPeptideId, proteinSequenceVersionIds_KeyReportedPeptideId, proteinSequenceVersionIdsUnique
        })

        this._get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult = {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }
    }

}