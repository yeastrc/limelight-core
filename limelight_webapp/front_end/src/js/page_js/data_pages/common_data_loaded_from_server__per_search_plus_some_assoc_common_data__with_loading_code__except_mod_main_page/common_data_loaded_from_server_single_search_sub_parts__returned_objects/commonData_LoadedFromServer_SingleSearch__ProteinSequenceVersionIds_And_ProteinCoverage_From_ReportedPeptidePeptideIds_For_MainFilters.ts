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
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import { SearchDataLookupParams_For_Single_ProjectSearchId } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry {
    reportedPeptideId : number
    proteinSequenceVersionId : number
    proteinStartPosition : number
    proteinEndPosition : number
    proteinIsIndependentDecoy: boolean
    protein_PreResidue: string
    protein_PostResidue: string
    peptideAtProteinStart_Flag: boolean
    peptideAtProteinEnd_Flag: boolean
}


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder {

    //  	Protein Coverage Data Per Reported Peptide Id
    // 					- Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
    private _proteinCoverage_KeyReportedPeptideId : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>>;

    //  Created when requested
    //  	Protein Coverage Data Per ProteinSequenceVersionId
    // 					- Map <integer,[Object]> <ProteinSequenceVersionId, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
    private _proteinCoverage_Key_ProteinSequenceVersionId : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>>;

    //    proteinSequenceVersionIds  Per Reported Peptide Id
    private _proteinSequenceVersionIds_KeyReportedPeptideId: Map<number, Set<number>>;

    //  Created when requested
    //    Reported Peptide Ids Per proteinSequenceVersionId - Computed when requested
    private _reportedPeptideIds_Map_Key_ProteinSequenceVersionId: Map<number, Set<number>>;

    //  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
    private _proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>

    //   proteinSequenceVersionId Entries  for Reported Peptide Id
    private _per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId: Map<number, Array<{ proteinSequenceVersionId : number, proteinIsIndependentDecoy: boolean }>>;

    //   All ProteinSequenceVersionId_Entries have IndependentDecoy_True for Reported Peptide Id
    private _all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId: Map<number, boolean>;

    constructor(
        {
            proteinCoverage_KeyReportedPeptideId, proteinSequenceVersionIds_KeyReportedPeptideId, proteinSequenceVersionIdsUnique,
            per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId, all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId
        } : {
            proteinCoverage_KeyReportedPeptideId : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>>;
            proteinSequenceVersionIds_KeyReportedPeptideId: Map<number, Set<number>>;
            proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>

            //   proteinSequenceVersionId Entries  for Reported Peptide Id
            per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId: Map<number, Array<{ proteinSequenceVersionId : number, proteinIsIndependentDecoy: boolean }>>;

            //   All ProteinSequenceVersionId_Entries have IndependentDecoy_True for Reported Peptide Id
            all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId: Map<number, boolean>;
        }
    ) {
        this._proteinCoverage_KeyReportedPeptideId = proteinCoverage_KeyReportedPeptideId
        this._proteinSequenceVersionIds_KeyReportedPeptideId = proteinSequenceVersionIds_KeyReportedPeptideId
        this._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique
        this._per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId = per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId
        this._all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId = all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId
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
    // get_proteinCoverage_KeyReportedPeptideId__ReturnFullMap_PREFER_NOT_USE() {
    //     return this._proteinCoverage_KeyReportedPeptideId;
    // }

    /**
     *
     */
    // get_proteinCoverage_KeyReportedPeptideId__ReturnMap_ValueData() {
    //     return this._proteinCoverage_KeyReportedPeptideId.values();
    // }

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


    /**
     * @param reportedPeptideId
     */
    get_per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId( reportedPeptideId: number ) {
        //   proteinSequenceVersionId Entries  for Reported Peptide Id
        return this._per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }
    /**
     * @param reportedPeptideId
     */
    get_all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId( reportedPeptideId: number ) {
        //   All ProteinSequenceVersionId_Entries have IndependentDecoy_True for Reported Peptide Id
        return this._all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId.get(reportedPeptideId);
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
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

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
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
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
                        searchDataLookupParams_For_Single_ProjectSearchId : this._searchDataLookupParams_For_Single_ProjectSearchId
                    };

                    console.log("AJAX Call to get protein-coverage-per-reported-peptide-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id-version-0003";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get protein-coverage-per-reported-peptide-id END, Now: " + new Date() );

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

        const responseData_Cast : {
            protein_coverage_tbl__id_Array: Array<number>
            reportedPeptideId_Array: Array<number>
            proteinSequenceVersionId_Array: Array<number>
            proteinStartPosition_Array: Array<number>
            proteinEndPosition_Array: Array<number>
            proteinIsIndependentDecoy_Array: Array<boolean>

            protein_PreResidue_Array: Array<string>
            protein_PostResidue_Array: Array<string>

            peptideAtProteinStart_Flag_Array: Array<boolean>
            peptideAtProteinEnd_Flag_Array: Array<boolean>
        } = responseData;

        const proteinCoverage_KeyReportedPeptideId : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry>> = new Map();

        const proteinSequenceVersionIds_KeyReportedPeptideId : Map<number, Set<number>> = new Map();

        const proteinSequenceVersionIdsUnique : Set<number> = new Set(); // - Set <integer> : <proteinSequenceVersionIds>

        //   proteinSequenceVersionId Entries  for Reported Peptide Id

        const per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId: Map<number, Array<{ proteinSequenceVersionId : number, proteinIsIndependentDecoy: boolean }>> = new Map();

        //   All ProteinSequenceVersionId_Entries have IndependentDecoy_True for Reported Peptide Id
        const all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId: Map<number, boolean> = new Map();

        //  responseData

        if ( responseData_Cast.protein_coverage_tbl__id_Array === undefined || responseData_Cast.protein_coverage_tbl__id_Array === null ) {
            const msg = "( responseData_Cast.protein_coverage_tbl__id_Array === undefined || responseData_Cast.protein_coverage_tbl__id_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.protein_coverage_tbl__id_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.protein_coverage_tbl__id_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.reportedPeptideId_Array === undefined || responseData_Cast.reportedPeptideId_Array === null ) {
            const msg = "( responseData_Cast.reportedPeptideId_Array === undefined || responseData_Cast.reportedPeptideId_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.reportedPeptideId_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.reportedPeptideId_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.proteinSequenceVersionId_Array === undefined || responseData_Cast.proteinSequenceVersionId_Array === null ) {
            const msg = "( responseData_Cast.proteinSequenceVersionId_Array === undefined || responseData_Cast.proteinSequenceVersionId_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.proteinSequenceVersionId_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.proteinSequenceVersionId_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.proteinStartPosition_Array === undefined || responseData_Cast.proteinStartPosition_Array === null ) {
            const msg = "( responseData_Cast.proteinStartPosition_Array === undefined || responseData_Cast.proteinStartPosition_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.proteinStartPosition_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.proteinStartPosition_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.proteinEndPosition_Array === undefined || responseData_Cast.proteinEndPosition_Array === null ) {
            const msg = "( responseData_Cast.proteinEndPosition_Array === undefined || responseData_Cast.proteinEndPosition_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.proteinEndPosition_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.proteinEndPosition_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.proteinIsIndependentDecoy_Array === undefined || responseData_Cast.proteinIsIndependentDecoy_Array === null ) {
            const msg = "( responseData_Cast.proteinIsIndependentDecoy_Array === undefined || responseData_Cast.proteinIsIndependentDecoy_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.proteinIsIndependentDecoy_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.proteinIsIndependentDecoy_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.protein_PreResidue_Array === undefined || responseData_Cast.protein_PreResidue_Array === null ) {
            const msg = "( responseData_Cast.protein_PreResidue_Array === undefined || responseData_Cast.protein_PreResidue_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.protein_PreResidue_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.protein_PreResidue_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.protein_PostResidue_Array === undefined || responseData_Cast.protein_PostResidue_Array === null ) {
            const msg = "( responseData_Cast.protein_PostResidue_Array === undefined || responseData_Cast.protein_PostResidue_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.protein_PostResidue_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.protein_PostResidue_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.peptideAtProteinStart_Flag_Array === undefined || responseData_Cast.peptideAtProteinStart_Flag_Array === null ) {
            const msg = "( responseData_Cast.peptideAtProteinStart_Flag_Array === undefined || responseData_Cast.peptideAtProteinStart_Flag_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.peptideAtProteinStart_Flag_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.peptideAtProteinStart_Flag_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        if ( responseData_Cast.peptideAtProteinEnd_Flag_Array === undefined || responseData_Cast.peptideAtProteinEnd_Flag_Array === null ) {
            const msg = "( responseData_Cast.peptideAtProteinEnd_Flag_Array === undefined || responseData_Cast.peptideAtProteinEnd_Flag_Array === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( responseData_Cast.peptideAtProteinEnd_Flag_Array instanceof Array ) ) {
            const msg = "( ! ( responseData_Cast.peptideAtProteinEnd_Flag_Array instanceof Array ) ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        const responseData_Cast_AnyItem_ArrayLength = responseData_Cast.protein_coverage_tbl__id_Array.length;

        //  Validate all arrays are same length

        if ( ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.reportedPeptideId_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.proteinSequenceVersionId_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.proteinStartPosition_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.proteinEndPosition_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.proteinIsIndependentDecoy_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.protein_PreResidue_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.protein_PostResidue_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.peptideAtProteinStart_Flag_Array.length )
            || ( responseData_Cast.protein_coverage_tbl__id_Array.length !== responseData_Cast.peptideAtProteinEnd_Flag_Array.length )
        ) {
            const msg = "( responseData_Cast Arrays are NOT the same length ) in _processProteinCoverageFromServer_Populate_loadedData";
            console.warn(msg);
            throw Error(msg);
        }

        for ( let responseData_Cast_AnyItem_Array_Index = 0; responseData_Cast_AnyItem_Array_Index < responseData_Cast_AnyItem_ArrayLength; responseData_Cast_AnyItem_Array_Index++ ) {

            const proteinCoverage_Entry: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry = {
                reportedPeptideId : responseData_Cast.reportedPeptideId_Array[ responseData_Cast_AnyItem_Array_Index ],
                proteinSequenceVersionId : responseData_Cast.proteinSequenceVersionId_Array[ responseData_Cast_AnyItem_Array_Index ],
                proteinStartPosition : responseData_Cast.proteinStartPosition_Array[ responseData_Cast_AnyItem_Array_Index ],
                proteinEndPosition : responseData_Cast.proteinEndPosition_Array[ responseData_Cast_AnyItem_Array_Index ],
                proteinIsIndependentDecoy: responseData_Cast.proteinIsIndependentDecoy_Array[ responseData_Cast_AnyItem_Array_Index ],
                protein_PreResidue: responseData_Cast.protein_PreResidue_Array[ responseData_Cast_AnyItem_Array_Index ],
                protein_PostResidue: responseData_Cast.protein_PostResidue_Array[ responseData_Cast_AnyItem_Array_Index ],
                peptideAtProteinStart_Flag: responseData_Cast.peptideAtProteinStart_Flag_Array[ responseData_Cast_AnyItem_Array_Index ],
                peptideAtProteinEnd_Flag: responseData_Cast.peptideAtProteinEnd_Flag_Array[ responseData_Cast_AnyItem_Array_Index ]
            };

            if ( proteinCoverage_Entry.reportedPeptideId === undefined || proteinCoverage_Entry.reportedPeptideId === null ) {
                const msg = "( proteinCoverage_Entry.reportedPeptideId === undefined || proteinCoverage_Entry.reportedPeptideId === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.reportedPeptideId ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.reportedPeptideId ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage_Entry.proteinSequenceVersionId === undefined || proteinCoverage_Entry.proteinSequenceVersionId === null ) {
                const msg = "( proteinCoverage_Entry.proteinSequenceVersionId === undefined || proteinCoverage_Entry.proteinSequenceVersionId === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinSequenceVersionId ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinSequenceVersionId ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage_Entry.proteinStartPosition === undefined || proteinCoverage_Entry.proteinStartPosition === null ) {
                const msg = "( proteinCoverage_Entry.proteinStartPosition === undefined || proteinCoverage_Entry.proteinStartPosition === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinStartPosition ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinStartPosition ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage_Entry.proteinEndPosition === undefined || proteinCoverage_Entry.proteinEndPosition === null ) {
                const msg = "( proteinCoverage_Entry.proteinEndPosition === undefined || proteinCoverage_Entry.proteinEndPosition === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinEndPosition ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( proteinCoverage_Entry.proteinEndPosition ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( proteinCoverage_Entry.proteinIsIndependentDecoy ) {
                proteinCoverage_Entry.proteinIsIndependentDecoy = true;
            } else {
                proteinCoverage_Entry.proteinIsIndependentDecoy = false
            }

            if ( proteinCoverage_Entry.protein_PreResidue === undefined || proteinCoverage_Entry.protein_PreResidue === null ) {
                const msg = "( proteinCoverage_Entry.protein_PreResidue === undefined || proteinCoverage_Entry.protein_PreResidue === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__IsVariableAString( proteinCoverage_Entry.protein_PreResidue ) ) {
               const msg = "( ! limelight__IsVariableAString( proteinCoverage_Entry.protein_PreResidue ) ): _processProteinCoverageFromServer_Populate_loadedData";
               console.warn( msg );
               throw Error( msg );
            }
            if ( proteinCoverage_Entry.protein_PostResidue === undefined || proteinCoverage_Entry.protein_PostResidue === null ) {
                const msg = "( proteinCoverage_Entry.protein_PostResidue === undefined || proteinCoverage_Entry.protein_PostResidue === null ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }
            if ( ! limelight__IsVariableAString( proteinCoverage_Entry.protein_PostResidue ) ) {
                const msg = "( ! limelight__IsVariableAString( proteinCoverage_Entry.protein_PostResidue ) ): _processProteinCoverageFromServer_Populate_loadedData";
                console.warn( msg );
                throw Error( msg );
            }

            if ( proteinCoverage_Entry.peptideAtProteinStart_Flag ) {
                proteinCoverage_Entry.peptideAtProteinStart_Flag = true;
            } else {
                proteinCoverage_Entry.peptideAtProteinStart_Flag = false
            }
            if ( proteinCoverage_Entry.peptideAtProteinEnd_Flag ) {
                proteinCoverage_Entry.peptideAtProteinEnd_Flag = true;
            } else {
                proteinCoverage_Entry.peptideAtProteinEnd_Flag = false
            }

            let proteinCoverageList_ForReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get( proteinCoverage_Entry.reportedPeptideId );
            if ( ! proteinCoverageList_ForReportedPeptideId ) {
                proteinCoverageList_ForReportedPeptideId = [];
                proteinCoverage_KeyReportedPeptideId.set( proteinCoverage_Entry.reportedPeptideId, proteinCoverageList_ForReportedPeptideId );
            }
            proteinCoverageList_ForReportedPeptideId.push( proteinCoverage_Entry );

            {
                let proteinSequenceVersionIds = proteinSequenceVersionIds_KeyReportedPeptideId.get( proteinCoverage_Entry.reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    proteinSequenceVersionIds = new Set();
                    proteinSequenceVersionIds_KeyReportedPeptideId.set( proteinCoverage_Entry.reportedPeptideId, proteinSequenceVersionIds );
                }
                proteinSequenceVersionIds.add( proteinCoverage_Entry.proteinSequenceVersionId );
            }
            {
                proteinSequenceVersionIdsUnique.add(proteinCoverage_Entry.proteinSequenceVersionId);
            }
            { // per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId
                let per_ProteinSequenceVersionId_Entries = per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId.get(proteinCoverage_Entry.reportedPeptideId);
                if ( ! per_ProteinSequenceVersionId_Entries ) {
                    per_ProteinSequenceVersionId_Entries = [];
                    per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId.set(proteinCoverage_Entry.reportedPeptideId, per_ProteinSequenceVersionId_Entries );
                }

                let alreadyIn_per_ProteinSequenceVersionId_Entries = false;
                for ( const per_ProteinSequenceVersionId_Entry of per_ProteinSequenceVersionId_Entries ) {
                    if ( per_ProteinSequenceVersionId_Entry.proteinSequenceVersionId === proteinCoverage_Entry.proteinSequenceVersionId ) {
                        alreadyIn_per_ProteinSequenceVersionId_Entries = true;
                        if ( per_ProteinSequenceVersionId_Entry.proteinIsIndependentDecoy !== proteinCoverage_Entry.proteinIsIndependentDecoy ) {
                            const msg = "( per_ProteinSequenceVersionId_Entry.proteinIsIndependentDecoy !== entry.proteinIsIndependentDecoy ). entry.reportedPeptideId: " + proteinCoverage_Entry.reportedPeptideId + ", entry.proteinSequenceVersionId: " + proteinCoverage_Entry.proteinSequenceVersionId;
                            console.warn(msg)
                            throw Error(msg)
                        }
                        break;
                    }
                }
                if ( ! alreadyIn_per_ProteinSequenceVersionId_Entries ) {
                    per_ProteinSequenceVersionId_Entries.push({ proteinSequenceVersionId: proteinCoverage_Entry.proteinSequenceVersionId, proteinIsIndependentDecoy: proteinCoverage_Entry.proteinIsIndependentDecoy })
                }
            }
        }

        for ( const mapEntry of per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId ) {
            const reportedPeptideId = mapEntry[0];
            const per_ProteinSequenceVersionId_Entries = mapEntry[1];

            let all_ProteinSequenceVersionId_Entries__IndependentDecoy_True = true;
            for ( const per_Entry of per_ProteinSequenceVersionId_Entries ) {
                if ( ! per_Entry.proteinIsIndependentDecoy ) {
                    all_ProteinSequenceVersionId_Entries__IndependentDecoy_True = false;
                    break;
                }
            }
            all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId.set(reportedPeptideId, all_ProteinSequenceVersionId_Entries__IndependentDecoy_True);
        }

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder({
            proteinCoverage_KeyReportedPeptideId, proteinSequenceVersionIds_KeyReportedPeptideId, proteinSequenceVersionIdsUnique,
            per_ProteinSequenceVersionId_Entries__Map_Key_ReportedPeptideId, all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId
        })

        this._get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult = {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }
    }

}