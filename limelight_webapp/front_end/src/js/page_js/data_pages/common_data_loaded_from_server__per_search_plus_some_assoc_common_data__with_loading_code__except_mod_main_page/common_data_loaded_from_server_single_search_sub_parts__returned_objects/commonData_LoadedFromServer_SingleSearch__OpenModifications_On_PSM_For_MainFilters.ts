/**
 * commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters.ts
 *
 * For Single Project Search  -  OpenModifications_On_PSM
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
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId {
    psmId : number
    openModificationMass : number
    openModificationMass_Rounded : number
    // - positionsMap_KeyPosition has Map values of Array to handle entry position 1 and entry n-term true that has position of 1
    positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId {
    reportedPeptideId: number
    psmOpenModificationMassPerPSM_ForPsmIdMap:
        Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId>
}

////////////////   Rounded Mass
/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId__PerMassMapEntry {
    openModificationMass_Rounded: number
    psmIds_Set: Set<number>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId {
    reportedPeptideId: number
    psmIds_ContainAnyOpenModificationMass : Set<number>
    openModificationMass_RoundedMap:
        Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId__PerMassMapEntry>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder {

    //  	PSM: Open Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
    // 				- Map<Reported Peptide Id, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId >
    //					- positionsMap_KeyPosition has Map values of Array to handle entry position 1 and entry n-term true that has position of 1
    private _psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId>;

    //  Same as above _psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
    //     BUT with removal of entries where Open Mod Mass rounds to zero
    private _psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId>;

    //  Masses rounded to whole number
    private _psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId>;

    constructor(
        {
            psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs, psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
        } : {

            //  	PSM: Open Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
            // 				- Map<Reported Peptide Id, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId >
            psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId>;

            //  Masses rounded to whole number
            psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId>;

        }
    ) {
        this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
        this._psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
    }

    //  For use with this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs

    /**
     *
     * @param reportedPeptideId
     */
    get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
    }

    get_psmOpenModificationMassPerPSM_ForPsmIdMap_Entries() {
        return this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values();
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_Open_ModificationsOnReportedPeptide_Entries() {
        if ( this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.size > 0 ) {
            return true
        }
        return false
    }

    //  For use with this._psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs

    /**
     *
     * @param reportedPeptideId
     */
    get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
    }

    /**
     * @returns  Values Iterable from Map key reportedPeptideId
     *
     */
    get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_DataEntries_Iterable() {
        return this._psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values();
    }


    /**
     *
     * @param reportedPeptideId
     */
    get_psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId: number ) {

        this._populate_If_NotSet___psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();

        return this._psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId)
    }

    private _populate_If_NotSet___psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs() : void {

        if (  this._psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
            //  Already populated so skip
            return; // EARLY RETURN
        }
        // create new
        const result__psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId> = new Map()

        for ( const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_MapValue_Entry of this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values() ) {
            const reportedPeptideId = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_MapValue_Entry.reportedPeptideId

            const result__psmOpenModificationMassPerPSM_ForPsmIdMap: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId> = new Map()

            for ( const psmOpenModificationMassPerPSM of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_MapValue_Entry.psmOpenModificationMassPerPSM_ForPsmIdMap.values() ) {
                if ( psmOpenModificationMassPerPSM.openModificationMass_Rounded !== 0 ) {
                    //  Mass Rounded is NOT zero so add to result
                    result__psmOpenModificationMassPerPSM_ForPsmIdMap.set( psmOpenModificationMassPerPSM.psmId, psmOpenModificationMassPerPSM)
                }
            }

            if ( result__psmOpenModificationMassPerPSM_ForPsmIdMap.size > 0 ) {

                const result__openModifications_On_PSM_For_ReportedPeptideId = new CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId();
                result__openModifications_On_PSM_For_ReportedPeptideId.reportedPeptideId = reportedPeptideId;
                result__openModifications_On_PSM_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap = result__psmOpenModificationMassPerPSM_ForPsmIdMap;
                result__psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set(reportedPeptideId, result__openModifications_On_PSM_For_ReportedPeptideId);
            }
        }

        this._psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = result__psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult {

    openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_OpenModifications_On_PSMHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadOpenModifications_On_PSM_Data__AlsoLoading_ReportedOpenModifications_On_PSM_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult>

    private _promise_LoadOpenModifications_On_PSM_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult>
    private _reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress: Set<number>

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
        return new CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult> {
        try {
            const result = this.get_OpenModifications_On_PSMHolder_AllForSearch();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     * Get all for search for main filters
     */
    get_OpenModifications_On_PSMHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult>
        } {

        if (this._get_OpenModifications_On_PSMHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_OpenModifications_On_PSMHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds_AnyPsmHas_OpenModifications();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load OpenModifications_On_PSM Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_OpenModifications_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedOpenModifications_On_PSM for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadOpenModifications_On_PSM_Data__AlsoLoading_ReportedOpenModifications_On_PSM_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadOpenModifications_On_PSM_Data__AlsoLoading_ReportedOpenModifications_On_PSM_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadOpenModifications_On_PSM_Data__AlsoLoading_ReportedOpenModifications_On_PSM_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult>( (resolve, reject) => {
            try {
                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => {
                    const promise_load_OpenModifications_On_PSM_Data =
                        this._load_OpenModifications_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_OpenModifications_On_PSM_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_OpenModifications_On_PSM_Data.then( load_OpenModifications_On_PSM_Data_Value => {
                        try {
                            resolve(load_OpenModifications_On_PSM_Data_Value);

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

        return {
            data: undefined, promise: this._promise_LoadOpenModifications_On_PSM_Data__AlsoLoading_ReportedOpenModifications_On_PSM_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_OpenModifications_On_PSM_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.size === 0 ) {
                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_OpenModifications_On_PSMHolder__FunctionResult );  // EARLY RETURN
            }

            if ( this._promise_LoadOpenModifications_On_PSM_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadOpenModifications_On_PSM_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress !== reportedOpenModifications_On_PSM )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadOpenModifications_On_PSM_Data_InProgress;
            }

            this._reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_Array = Array.from( reportedPeptideIds );

            this._promise_LoadOpenModifications_On_PSM_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters__get_OpenModifications_On_PSMHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Array,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    console.log("AJAX Call to get psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_OpenModifications_On_PSMHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadOpenModifications_On_PSM_Data_InProgress.catch( reason => {
                this._promise_LoadOpenModifications_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress = undefined;
            });
            this._promise_LoadOpenModifications_On_PSM_Data_InProgress.then( valueIgnored => { try {
                this._promise_LoadOpenModifications_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadOpenModifications_On_PSM_Data_InProgress = undefined;
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return this._promise_LoadOpenModifications_On_PSM_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, { reportedPeptideId : number, psmOpenModificationMassPerPSM_ForPsmIdMap :
                    Map<number, { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                        positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> }> }> = new Map();

        //  	PSM: Open Modification: Psm Ids per Rounded Mass for current cutoffs per Reported Peptide Id
        // 				- Map<Reported Peptide Id, { reportedPeptideId, Set<psm id has any open Mod mass>, Map<openModificationMass_Rounded, { openModificationMass_Rounded, Set<psmId> } > } >
        const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId> = new Map();

        const openModifications_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder({
            psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs,
            psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
        })

        this._get_OpenModifications_On_PSMHolder__FunctionResult = {
            openModifications_On_PSM_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const reportedPeptideId_psmOpenModificationMassesList_List = responseData.reportedPeptideId_psmOpenModificationMassesList_List;

        const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, { reportedPeptideId : number, psmOpenModificationMassPerPSM_ForPsmIdMap :
                    Map<number, { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                        positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> }> }> = new Map();

        //  	PSM: Open Modification: Psm Ids per Rounded Mass for current cutoffs per Reported Peptide Id
        // 				- Map<Reported Peptide Id, { reportedPeptideId, Set<psm id has any open Mod mass>, Map<openModificationMass_Rounded, { openModificationMass_Rounded, Set<psmId> } > } >
        const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId> = new Map();

            // Map<number, { reportedPeptideId : number, psmIds_ContainAnyOpenModificationMass : Set<number>, openModificationMass_RoundedMap : Map<number,{ openModificationMass_Rounded : number, psmIds_Set : Set<number> }> }> = new Map();

        for ( const reportedPeptideId_psmOpenModificationMassesList_Entry of reportedPeptideId_psmOpenModificationMassesList_List ) {

            const reportedPeptideId = reportedPeptideId_psmOpenModificationMassesList_Entry.reportedPeptideId;
            const psmId_OpenModMass_EntriesList = reportedPeptideId_psmOpenModificationMassesList_Entry.psmId_OpenModMass_EntriesList;

            let psmOpenModificationMassPerPSM_ForPsmIdMap :
                Map<number, { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                    positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> }> = undefined;
            {
                let psmOpenModificationMassPerPSM_ForPsmIdMap_Object = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap_Object ) {
                    psmOpenModificationMassPerPSM_ForPsmIdMap = new Map();
                    psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmOpenModificationMassPerPSM_ForPsmIdMap } );
                } else {
                    psmOpenModificationMassPerPSM_ForPsmIdMap = psmOpenModificationMassPerPSM_ForPsmIdMap_Object.psmOpenModificationMassPerPSM_ForPsmIdMap;
                }
            }

            let psmIds_ContainAnyOpenModificationMass : Set<number> = undefined
            let psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap : Map<number, {openModificationMass_Rounded: number, psmIds_Set: Set<number>}> = undefined
            {
                let psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object = psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
                if ( ! psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object ) {
                    psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap = new Map();
                    psmIds_ContainAnyOpenModificationMass = new Set();
                    const newEntry : CommonData_LoadedFromServer_SingleSearch__OpenModifications__ROUNDED_MASS_On_PSM_For_ReportedPeptideId = {
                        reportedPeptideId, psmIds_ContainAnyOpenModificationMass, openModificationMass_RoundedMap : psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap
                    }
                    psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set(
                        reportedPeptideId, newEntry
                    );
                } else {
                    psmIds_ContainAnyOpenModificationMass = psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object.psmIds_ContainAnyOpenModificationMass;
                    psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap = psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object.openModificationMass_RoundedMap;
                }
            }

            for ( const psmId_OpenModMass_Entry of psmId_OpenModMass_EntriesList ) {

                const psmId = psmId_OpenModMass_Entry.psmId;
                const openModificationMass = psmId_OpenModMass_Entry.openModificationMass;
                const psmOpenModificationMassPositionsList = psmId_OpenModMass_Entry.psmOpenModificationMassPositionsList;

                const openModificationMass_Rounded = Math.round( openModificationMass );

                let psmOpenModificationMassPerPSM = psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId );
                if ( ! psmOpenModificationMassPerPSM ) {
                    psmOpenModificationMassPerPSM = { psmId, openModificationMass, openModificationMass_Rounded, positionsMap_KeyPosition : undefined };
                    psmOpenModificationMassPerPSM_ForPsmIdMap.set( psmId, psmOpenModificationMassPerPSM );
                }

                if ( psmOpenModificationMassPositionsList != null && psmOpenModificationMassPositionsList != undefined && psmOpenModificationMassPositionsList.length > 0 ) {
                    // Have positions
                    let positionsMap_KeyPosition : Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> = psmOpenModificationMassPerPSM.positionsMap_KeyPosition;
                    if ( ! positionsMap_KeyPosition ) {
                        positionsMap_KeyPosition = new Map();
                        psmOpenModificationMassPerPSM.positionsMap_KeyPosition = positionsMap_KeyPosition;
                    }
                    for ( const psmOpenModificationMassPosition of psmOpenModificationMassPositionsList ) {
                        const position = psmOpenModificationMassPosition.openModificationPosition;
                        let entriesAtPosition = positionsMap_KeyPosition.get( position );
                        if ( ! entriesAtPosition ) {
                            entriesAtPosition = [];
                            positionsMap_KeyPosition.set( position, entriesAtPosition );
                        }
                        const new_entryAtPosition = { position, isNTerminal : psmOpenModificationMassPosition.is_N_Terminal , isCTerminal : psmOpenModificationMassPosition.is_C_Terminal };
                        entriesAtPosition.push( new_entryAtPosition )
                    }
                }

                //  Map per Rounded Mass then Set of PSM Ids
                {
                    let psmIds_Set : Set<number> = undefined;
                    let psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Object = psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap.get( openModificationMass_Rounded )
                    if ( ! psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Object ) {
                        psmIds_Set = new Set()
                        psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Per_RoundedMassMap.set(openModificationMass_Rounded, { openModificationMass_Rounded, psmIds_Set })
                    } else {
                        psmIds_Set = psm_ROUNDED_MASS_OpenModificationMasses_PsmIdSet_Object.psmIds_Set
                    }
                    psmIds_Set.add( psmId )
                    psmIds_ContainAnyOpenModificationMass.add( psmId )
                }
            }

            // reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
        }

        // if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
        //     console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
        // }

        {  //  Rebuild this._psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs

            //    Copy from this._psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs but remove all Mod Masses that round to zero

            const psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, { reportedPeptideId : number, psmOpenModificationMassPerPSM_ForPsmIdMap :
                        Map<number, { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                            positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> }> }> = new Map()

            for ( const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_Entry of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.entries() ) {

                const reportedPeptideId = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_Entry[0];
                const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_MapValue = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_Entry[1];

                const psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_Result :
                    Map<number, { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                        positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> }> = new Map()

                psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_MapValue.reportedPeptideId

                for ( const psmOpenModificationMassPerPSM_ForPsmIdMapEntry of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs_MapValue.psmOpenModificationMassPerPSM_ForPsmIdMap ) {

                    const psmOpenModificationMassPerPSM_ForPsmIdMapValue = psmOpenModificationMassPerPSM_ForPsmIdMapEntry[1];

                    if ( psmOpenModificationMassPerPSM_ForPsmIdMapValue.openModificationMass_Rounded > 0 ) {

                        const psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmId_Result : { psmId : number, openModificationMass : number, openModificationMass_Rounded : number,
                            positionsMap_KeyPosition: Map<number, Array<{ position : number, isNTerminal : boolean, isCTerminal : boolean}>> } = {
                            psmId: psmOpenModificationMassPerPSM_ForPsmIdMapValue.psmId,
                            openModificationMass: psmOpenModificationMassPerPSM_ForPsmIdMapValue.openModificationMass,
                            openModificationMass_Rounded: psmOpenModificationMassPerPSM_ForPsmIdMapValue.openModificationMass_Rounded,
                            positionsMap_KeyPosition: psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition
                        }
                        psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_Result.set(
                            psmOpenModificationMassPerPSM_ForPsmIdMapValue.psmId, psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmId_Result
                        );
                    }
                }

                if ( psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_Result.size > 0 ) {

                    psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set(
                        reportedPeptideId, { reportedPeptideId, psmOpenModificationMassPerPSM_ForPsmIdMap : psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_Result }
                    );
                }
            }

        }

        const openModifications_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder({
            psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs,
            psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
        })

        this._get_OpenModifications_On_PSMHolder__FunctionResult = {
            openModifications_On_PSM_For_MainFilters_Holder
        }
    }

}