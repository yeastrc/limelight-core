/**
 * commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters.ts
 *
 * For Single Project Search  -  ReporterIonMasses_On_PSM
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
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_PsmId {
    psmId : number
    reporterIonMasses : Set<number>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_ReportedPeptideId {
    reportedPeptideId: number
    psmReporterIonMassesPerPSM_ForPsmIdMap:
        Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_PsmId>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder {

    //  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
    private _psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_ReportedPeptideId>;

    //  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
    // 				- Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >
    private _psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, { reportedPeptideId : number, reporterIonMasses : Set<number> }> ;

    constructor(
        {
            psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs,
            psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs
        } : {

            //  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
            psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_ReportedPeptideId>;

            psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, { reportedPeptideId : number, reporterIonMasses : Set<number> }> ;
        }
    ) {
        this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
        this._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
    }

    //  For this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs

    /**
     *
     * @param reportedPeptideId
     */
    get_psmReporterIonMassesPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
    }

    get_psmReporterIonMassesPerPSM_ForPsmIdMap_Entry_Values() {
        return this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values();
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_ReporterIonMasses_OnPSMs_ForReportedPeptides_Entries() {
        if ( this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.size > 0 ) {
            return true
        }
        return false
    }

    //  For this._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs

    /**
     *
     * @param reportedPeptideId
     */
    get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( reportedPeptideId: number ) {
        return this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
    }

    get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_Entry_Values() {
        return this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values();
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_ReporterIonMasses_OnReportedPeptide_Entries() {
        if ( this._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.size > 0 ) {
            return true
        }
        return false
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult {

    reporterIons_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ReporterIonMasses_On_PSMHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadReporterIonMasses_On_PSM_Data__AlsoLoading_ReportedReporterIonMasses_On_PSM_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult>

    private _promise_LoadReporterIonMasses_On_PSM_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult>
    private _reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress: Set<number>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
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
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ReporterIonMasses_On_PSMHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult> {
        try {
            const result = this.get_ReporterIonMasses_On_PSMHolder_AllForSearch();

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
    get_ReporterIonMasses_On_PSMHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult>
        } {

        if (this._get_ReporterIonMasses_On_PSMHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ReporterIonMasses_On_PSMHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds_AnyPsmHas_ReporterIons();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load ReporterIonMasses_On_PSM Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_ReporterIonMasses_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedReporterIonMasses_On_PSM for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadReporterIonMasses_On_PSM_Data__AlsoLoading_ReportedReporterIonMasses_On_PSM_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadReporterIonMasses_On_PSM_Data__AlsoLoading_ReportedReporterIonMasses_On_PSM_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadReporterIonMasses_On_PSM_Data__AlsoLoading_ReportedReporterIonMasses_On_PSM_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult>(
            (resolve, reject) => { try {
                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => { try {
                    const promise_load_ReporterIonMasses_On_PSM_Data =
                        this._load_ReporterIonMasses_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_ReporterIonMasses_On_PSM_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_ReporterIonMasses_On_PSM_Data.then( load_ReporterIonMasses_On_PSM_Data_Value => {
                        try {
                            resolve(load_ReporterIonMasses_On_PSM_Data_Value);

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined, promise: this._promise_LoadReporterIonMasses_On_PSM_Data__AlsoLoading_ReportedReporterIonMasses_On_PSM_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_ReporterIonMasses_On_PSM_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.size === 0 ) {
                this._create_For_No_ReportedPeptideIds();

                return Promise.resolve(this._get_ReporterIonMasses_On_PSMHolder__FunctionResult)
            }

            if ( this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress !== reportedReporterIonMasses_On_PSM )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress;
            }

            this._reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_Array = Array.from( reportedPeptideIds );

            this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters__get_ReporterIonMasses_On_PSMHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Array,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    console.log("AJAX Call to get psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });

                        resolve( this._get_ReporterIonMasses_On_PSMHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress.catch( reason => {
                this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress = undefined;
            });
            this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress.then( valueIgnored => {
                this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadReporterIonMasses_On_PSM_Data_InProgress = undefined;
            })

            return this._promise_LoadReporterIonMasses_On_PSM_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _create_For_No_ReportedPeptideIds() {

        const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_ReportedPeptideId> = new Map();

        const psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, { reportedPeptideId : number, reporterIonMasses : Set<number> }>  = new Map();

        const reporterIons_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder({
            psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs,
            psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs
        })

        this._get_ReporterIonMasses_On_PSMHolder__FunctionResult = {
            reporterIons_On_PSM_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const reportedPeptideId_psmReporterIonMassesList_List = responseData.reportedPeptideId_psmReporterIonMassesList_List;

        const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_ReportedPeptideId> = new Map();

        const psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, { reportedPeptideId : number, reporterIonMasses : Set<number> }>  = new Map();

        for ( const reportedPeptideId_psmReporterIonMassesList_Entry of reportedPeptideId_psmReporterIonMassesList_List ) {

            const reportedPeptideId = reportedPeptideId_psmReporterIonMassesList_Entry.reportedPeptideId;
            const psmReporterIonMassesList = reportedPeptideId_psmReporterIonMassesList_Entry.psmReporterIonMassesList;

            let psmReporterIonMassesPerPSM_ForPsmIdMap = undefined;
            {
                let psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                    psmReporterIonMassesPerPSM_ForPsmIdMap = new Map();
                    psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmReporterIonMassesPerPSM_ForPsmIdMap } );
                } else {
                    psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;
                }
            }

            let psmReporterIonMassesUnique_PerReportedPeptideId : Set<number> = undefined;
            {
                let psmReporterIonMassesUnique_PerReportedPeptideId_Object = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                if ( ! psmReporterIonMassesUnique_PerReportedPeptideId_Object ) {
                    psmReporterIonMassesUnique_PerReportedPeptideId = new Set();
                    psmReporterIonMassesUnique_PerReportedPeptideId_Object = { reportedPeptideId, reporterIonMasses : psmReporterIonMassesUnique_PerReportedPeptideId }
                    psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, psmReporterIonMassesUnique_PerReportedPeptideId_Object );
                } else {
                    psmReporterIonMassesUnique_PerReportedPeptideId = psmReporterIonMassesUnique_PerReportedPeptideId_Object.reporterIonMasses;
                }
            }

            for ( const psmReporterIonMassEntry of psmReporterIonMassesList ) {
                const psmId = psmReporterIonMassEntry.psmId;
                const reporterIonMass = psmReporterIonMassEntry.reporterIonMass;

                let psmReporterIonMassesPerPSM = undefined;
                let psmReporterIonMassesPerPSM_Object = psmReporterIonMassesPerPSM_ForPsmIdMap.get( psmId );
                if ( ! psmReporterIonMassesPerPSM_Object ) {
                    psmReporterIonMassesPerPSM = new Set();
                    psmReporterIonMassesPerPSM_ForPsmIdMap.set( psmId, { psmId, reporterIonMasses : psmReporterIonMassesPerPSM } );
                } else {
                    psmReporterIonMassesPerPSM = psmReporterIonMassesPerPSM_Object.reporterIonMasses;
                }

                psmReporterIonMassesPerPSM.add( reporterIonMass );

                psmReporterIonMassesUnique_PerReportedPeptideId.add( reporterIonMass );  // Unique at Reported Peptide Id
            }
        }

        const reporterIons_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters_Holder({
            psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs,
            psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs
        })

        this._get_ReporterIonMasses_On_PSMHolder__FunctionResult = {
            reporterIons_On_PSM_For_MainFilters_Holder
        }
    }

}