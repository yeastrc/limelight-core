/**
 * commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters.ts
 *
 * For Single Project Search  -  Variable_Dynamic_Modifications_On_PSM
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
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry {
    readonly psmId : number
    readonly modificationMass : number

    /**
     * Rounded to whole number
     */
    readonly modificationMass_Rounded : number

    readonly position : number
    readonly isNTerminal : boolean
    readonly isCTerminal : boolean
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId {
    readonly modificationsArray: ReadonlyArray<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId {
    readonly reportedPeptideId: number
    readonly psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId:
        ReadonlyMap<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder {

    //  	PSM: Variable_Dynamic_ Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
    // 				- Map<Reported Peptide Id, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId >
    private _psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
        Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId>;

    constructor(
        {
            psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
        } : {

            //  	PSM: Variable_Dynamic_ Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
            // 				- Map<Reported Peptide Id, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId >
            psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
                Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId>;

        }
    ) {
        this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
    }

    //  For use with this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs

    /**
     *
     * @param reportedPeptideId
     */
    get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);
    }

    get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_Entries() {
        return this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.values();
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_Variable_Dynamic__ModificationsOnReportedPeptide_Entries() {
        if ( this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.size > 0 ) {
            return true
        }
        return false
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult {

    variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult

    //  Set when have to wait to load Reported Peptide Ids first
    private _promise_LoadVariable_Dynamic_Modifications_On_PSM_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_On_PSM_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult>

    private _promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult>
    private _reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress: Set<number>

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
        return new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult> {
        try {
            const result = this.get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     * Get all for search for main filters
     */
    get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult>
        } {

        if (this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult,
                promise: undefined
            };
        }

        //  Get reportedPeptideIds for All for Main filters

        const get_reportedPeptideIds_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds_AnyPsmHas_Variable_Dynamic_Modifications();

        if ( get_reportedPeptideIds_Result.data ) {

            // Have reportedPeptideIds for All for Main filters Data.  Return Load Variable_Dynamic_Modifications_On_PSM Promise

            return {                // EARLY RETURN
                data: undefined,
                promise: this._load_Variable_Dynamic_Modifications_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result.data.reportedPeptideIds })
            }
        }

        // NOT Have reportedVariable_Dynamic_Modifications_On_PSM for All for Main filters Data.  Have outer Promise to encompass loading them as well

        if ( this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_On_PSM_InProgress ) {

            //  EARLY RETURN
            return { data: undefined, promise: this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_On_PSM_InProgress };            //  EARLY RETURN
        }

        // Create and return new Promise that encompasses

        this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_On_PSM_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult>( (resolve, reject) => {
            try {
                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                })
                get_reportedPeptideIds_Result.promise.then( get_reportedPeptideIds_Result_Value => {
                    const promise_load_Variable_Dynamic_Modifications_On_PSM_Data =
                        this._load_Variable_Dynamic_Modifications_On_PSM_Data({ reportedPeptideIds: get_reportedPeptideIds_Result_Value.reportedPeptideIds });
                    promise_load_Variable_Dynamic_Modifications_On_PSM_Data.catch( reason => {
                        reject(reason)
                    })
                    promise_load_Variable_Dynamic_Modifications_On_PSM_Data.then( load_Variable_Dynamic_Modifications_On_PSM_Data_Value => {
                        try {
                            resolve(load_Variable_Dynamic_Modifications_On_PSM_Data_Value);

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
            data: undefined, promise: this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data__AlsoLoading_ReportedVariable_Dynamic_Modifications_On_PSM_InProgress
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */

    private _load_Variable_Dynamic_Modifications_On_PSM_Data(
        {
            reportedPeptideIds
        } : {
            reportedPeptideIds: Set<number>
        }
    ) : Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult> {
        try {
            if ( reportedPeptideIds.size === 0 ) {
                this._createEmpty_No_ReportedPeptideIds();

                return Promise.resolve( this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult );  // EARLY RETURN
            }

            if ( this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress ) {

                if ( this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress !== reportedPeptideIds ) {
                    const msg = "True ( this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress ) but also true ( this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress !== reportedVariable_Dynamic_Modifications_On_PSM )";
                    console.warn(msg)
                    throw Error(msg)
                }

                return this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress;
            }

            this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = reportedPeptideIds;

            const reportedPeptideIds_Array = Array.from( reportedPeptideIds );

            this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters__get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId,
                        reportedPeptideIds : reportedPeptideIds_Array,
                        searchDataLookupParams_For_Single_ProjectSearchId: this._searchDataLookupParams_For_Single_ProjectSearchId,
                    };

                    console.log("AJAX Call to get psm-variable-dynamic-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001 START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/psm-variable-dynamic-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get psm-variable-dynamic-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001 END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress.catch( reason => {
                this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = undefined;
            });
            this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress.then( valueIgnored => { try {
                this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = undefined;
                this._reportedPeptideIds_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress = undefined;
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            return this._promise_LoadVariable_Dynamic_Modifications_On_PSM_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _createEmpty_No_ReportedPeptideIds() {

        const variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder({
            psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs: new Map()
        })

        this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult = {
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const reportedPeptideId_psmModificationMassesList_List = responseData.reportedPeptideId_psmModificationMassesList_List;

        const psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
            Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId> = new Map()

        for ( const reportedPeptideId_psmVariable_Dynamic_ModificationMassesList_Entry of reportedPeptideId_psmModificationMassesList_List ) {

            const reportedPeptideId = reportedPeptideId_psmVariable_Dynamic_ModificationMassesList_Entry.reportedPeptideId;
            const psmId_ModMass_EntriesList = reportedPeptideId_psmVariable_Dynamic_ModificationMassesList_Entry.psmId_ModMass_EntriesList;

            const psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId__Local : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry>> = new Map()

            for ( const psmId_ModMass_Entry of psmId_ModMass_EntriesList ) {

                const resultEntry_ForSingleModification: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry = {
                    psmId: psmId_ModMass_Entry.psmId,
                    modificationMass: psmId_ModMass_Entry.modificationMass,
                    modificationMass_Rounded: Math.round( psmId_ModMass_Entry.modificationMass ),
                    position: psmId_ModMass_Entry.modificationPosition,
                    isNTerminal: psmId_ModMass_Entry.is_N_Terminal,
                    isCTerminal: psmId_ModMass_Entry.is_C_Terminal
                }

                let modificationsArray = psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId__Local.get( resultEntry_ForSingleModification.psmId )
                if ( ! modificationsArray ) {
                    modificationsArray = []
                    psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId__Local.set( resultEntry_ForSingleModification.psmId, modificationsArray )
                }

                modificationsArray.push( resultEntry_ForSingleModification )
            }

            const  psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId> = new Map()

            for ( const mapEntry of psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId__Local.entries() ) {
                const mapKey = mapEntry[ 0 ]
                const mapValue = mapEntry[ 1 ]

                psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId.set( mapKey, { modificationsArray: mapValue } )
            }

            const variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId = {
                reportedPeptideId,
                psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId
            }

            if ( psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.has( reportedPeptideId ) ) {
                const msg = "ERROR: psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ALREADY HAS entry for reportedPeptideId: " + reportedPeptideId
                console.warn(msg)
                throw Error(msg)
            }

            psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, variable_Dynamic_Modifications_On_PSM_For_ReportedPeptideId )
        }

        const variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder({
            psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs
        })

        this._get_Variable_Dynamic_Modifications_On_PSMHolder__FunctionResult = {
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        }
    }

}