/**
 * commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData.ts
 *
 * For Single Project Search  -  PSM_TblData - NO Main PSM/Reported Peptide Filters applied
 *
 * Request Options for Include and Exclude Decoy PSMs
 *
 * Data loaded from server and code to load data from server
 *
 * !!!  NOT USE  !!! : SearchDataLookupParams_For_Single_ProjectSearchId  !!!
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch__NO_PSM_Peptide_Protein_Filtering";


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>

    constructor(
        {
            reportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            reportedPeptideId: number
            psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId {

    readonly psmId: number;
    readonly reportedPeptideId: number;
    readonly charge: number;
    readonly scanNumber: number;
    readonly searchScanFileId: number; // Can be null
    readonly retentionTimeSeconds: number; // Float, Can be null
    readonly precursor_M_Over_Z: number; // Double, Can be null

    readonly hasModifications: boolean;
    readonly hasOpenModifications: boolean;
    readonly hasReporterIons: boolean;

    readonly independentDecoyPSM: boolean;
    readonly decoyPSM: boolean;
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder {

    private _psmTblData_Map_Key_ReportedPeptideId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId>
    private _psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>

    constructor(
        {
            psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            psmTblData_Map_Key_ReportedPeptideId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId>
            psmTblData_Map_Key_PsmId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>
        }
    ) {
        this._psmTblData_Map_Key_ReportedPeptideId = psmTblData_Map_Key_ReportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._psmTblData_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult {

    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder
}

/**
 *  Main Class
 */
export class CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering

    //

    private _get_PSM_TblData_Holder__Include_DecoyPSM : CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder
    private _get_PSM_TblData_Holder__Exclude_DecoyPSM : CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder

    private _promise_LoadPSM_TblData_Data_InProgress__Exclude_DecoyPSM: Promise<void>
    private _promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM: Promise<void>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
    }

    /**
     * Create New Instance
     *
     * @param projectSearchId
     */
    static getNewInstance(
        {
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId__NO_PSM_Peptide_Protein_Filtering
        });
    }

    /**
     * !!!  Always return promise
     *
     * PSM Data Unfiltered - Include Decoy PSMs
     */
    get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder__ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult> {
        try {
            const result = this.get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder();

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
     * PSM Data Unfiltered - Include Decoy PSMs
     */
    get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult>
        } {

        if (this._get_PSM_TblData_Holder__Include_DecoyPSM) {
            //  Have loaded data so just return it
            return {
                data: {
                    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: this._get_PSM_TblData_Holder__Include_DecoyPSM
                },
                promise: undefined
            };
        }

        if ( ! this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM ) {
            //  No Existing Promise so get data
            this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM = this._load_PSM_TblData_For_ReportedPeptideId_Data({ include_DecoyPSM: true })
        }

        return {
            data: undefined,
            promise: new Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult>((resolve, reject) => { try {
                this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM.catch(reason => { reject(reason) })
                this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM.then(noValue => { try {
                    const data = {
                        psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: this._get_PSM_TblData_Holder__Include_DecoyPSM
                    }
                    resolve( data )
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * !!!  Always return promise
     *
     * PSM Data Unfiltered - Exclude Decoy PSMs
     */
    get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder__ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult> {
        try {
            const result = this.get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder();

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
     * PSM Data Unfiltered - Exclude Decoy PSMs
     */
    get_PSM_TblData_Unfiltered__Exclude_DecoyPSMs__Holder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult>
        } {

        if (this._get_PSM_TblData_Holder__Exclude_DecoyPSM) {
            //  Have loaded data so just return it
            return {
                data: {
                    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: this._get_PSM_TblData_Holder__Exclude_DecoyPSM
                },
                promise: undefined
            };
        }

        if ( this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM ) {
            //  Already promise for INCLUDE so return promise dependent on that
            return {
                data: undefined,
                promise: new Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult>((resolve, reject) => { try {
                    this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM.catch(reason => { reject(reason) })
                    this._promise_LoadPSM_TblData_Data_InProgress__Include_DecoyPSM.then(noValue => { try {
                        const data = {
                            psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: this._get_PSM_TblData_Holder__Exclude_DecoyPSM
                        }
                        resolve( data );
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        }

        if ( ! this._promise_LoadPSM_TblData_Data_InProgress__Exclude_DecoyPSM ) {
            //  No Existing Promise so get data
            this._promise_LoadPSM_TblData_Data_InProgress__Exclude_DecoyPSM = this._load_PSM_TblData_For_ReportedPeptideId_Data({ include_DecoyPSM: false })
        }

        return {
            data: undefined,
            promise: new Promise<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData__get_PSM_TblData_Holder__FunctionResult>((resolve, reject) => { try {
                this._promise_LoadPSM_TblData_Data_InProgress__Exclude_DecoyPSM.catch(reason => { reject(reason) })
                this._promise_LoadPSM_TblData_Data_InProgress__Exclude_DecoyPSM.then(noValue => { try {
                    const data = {
                        psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: this._get_PSM_TblData_Holder__Exclude_DecoyPSM
                    }
                    resolve( data );
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_PSM_TblData_For_ReportedPeptideId_Data(
        {
            include_DecoyPSM
        } : {
            include_DecoyPSM: boolean
        }
    ) : Promise<void> {
        try {
            const promise = new Promise<void>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId, include_DecoyPSM
                    };

                    const url = "d/rws/for-page/psb/psm-table-data-unfiltered-for-single-project-search-id-version-0002";

                    console.log( "START: AJAX Call to: getting data from URL: " + url );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()
                    });

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                        this._process_WebserviceResponse({ responseData, include_DecoyPSM });
                        resolve();

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
            responseData, include_DecoyPSM
        }: {
            responseData: any
            include_DecoyPSM: boolean
        }) : void {

        const psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Include_DecoyPSM = new Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>>();
        const psmTblData_Map_Key_PsmId__Include_DecoyPSM = new Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>();

        const psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Exclude_DecoyPSM = new Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>>();
        const psmTblData_Map_Key_PsmId__Exclude_DecoyPSM = new Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId>();

        if ( responseData.psms ) {

            if ( ! ( responseData.psms instanceof Array ) ) {
                const msg = "( ! ( responseData.psms instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }
            for ( const psmEntry of responseData.psms ) {

                const psm : CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId = psmEntry;

                if ( psm.psmId === undefined || psm.psmId === null ) {
                    const msg = "( psm.psmId === undefined || psm.psmId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( psm.psmId ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( psm.psmId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null ) {
                    const msg = "( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( psm.reportedPeptideId ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( psm.reportedPeptideId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.charge === undefined || psm.charge === null ) {
                    const msg = "( psm.charge === undefined || psm.charge === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( psm.charge ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( psm.charge ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.scanNumber === undefined || psm.scanNumber === null ) {
                    const msg = "( psm.scanNumber === undefined || psm.scanNumber === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( psm.scanNumber ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( psm.scanNumber ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                //  Optional values
                if ( psm.searchScanFileId !== undefined && psm.searchScanFileId !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm.searchScanFileId ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm.searchScanFileId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( psm.retentionTimeSeconds !== undefined && psm.retentionTimeSeconds !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm.retentionTimeSeconds ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm.retentionTimeSeconds ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( psm.precursor_M_Over_Z !== undefined && psm.precursor_M_Over_Z !== null ) {
                    if ( ! limelight__variable_is_type_number_Check( psm.precursor_M_Over_Z ) ) {
                        const msg = "( ! limelight__variable_is_type_number_Check( psm.precursor_M_Over_Z ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                //  Boolean values
                if ( psm.hasModifications === undefined || psm.hasModifications === null ) {
                    const msg = "( psm.hasModifications === undefined || psm.hasModifications === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null ) {
                    const msg = "( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.hasReporterIons === undefined || psm.hasReporterIons === null ) {
                    const msg = "( psm.hasReporterIons === undefined || psm.hasReporterIons === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.decoyPSM === undefined || psm.decoyPSM === null ) {
                    const msg = "( psm.decoyPSM === undefined || psm.decoyPSM === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.independentDecoyPSM === undefined || psm.independentDecoyPSM === null ) {
                    const msg = "( psm.independentDecoyPSM === undefined || psm.independentDecoyPSM === null )";
                    console.warn(msg);
                    throw Error(msg);
                }

                {
                    //  Always Add to "Include Decoy"

                    psmTblData_Map_Key_PsmId__Include_DecoyPSM.set(psm.psmId, psm)

                    let psmTblData_Map_Key_PsmId_for_ReportedPeptideId = psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Include_DecoyPSM.get( psm.reportedPeptideId );
                    if ( ! psmTblData_Map_Key_PsmId_for_ReportedPeptideId ) {
                        psmTblData_Map_Key_PsmId_for_ReportedPeptideId = new Map();
                        psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Include_DecoyPSM.set( psm.reportedPeptideId, psmTblData_Map_Key_PsmId_for_ReportedPeptideId );
                    }
                    psmTblData_Map_Key_PsmId_for_ReportedPeptideId.set( psm.psmId, psm );
                }

                if ( ! psm.decoyPSM ) {

                    //  Add to "Exclude Decoy" since NOT Decoy

                    psmTblData_Map_Key_PsmId__Exclude_DecoyPSM.set(psm.psmId, psm)

                    let psmTblData_Map_Key_PsmId_for_ReportedPeptideId = psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Exclude_DecoyPSM.get( psm.reportedPeptideId );
                    if ( ! psmTblData_Map_Key_PsmId_for_ReportedPeptideId ) {
                        psmTblData_Map_Key_PsmId_for_ReportedPeptideId = new Map();
                        psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Exclude_DecoyPSM.set( psm.reportedPeptideId, psmTblData_Map_Key_PsmId_for_ReportedPeptideId );
                    }
                    psmTblData_Map_Key_PsmId_for_ReportedPeptideId.set( psm.psmId, psm );

                }
            }
        }

        {
            //  Process 'Exclude Decoy'

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId__Exclude_DecoyPSM;
            const psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId = psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Exclude_DecoyPSM;

            const psmTblData_Map_Key_ReportedPeptideId = new Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId>();

            for ( const mapEntry of psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId.entries() ) {
                const reportedPeptideId = mapEntry[0];
                const psmTblData_Map_Key_PsmId = mapEntry[1];
                const psm_TblData_Holder__ForSingleReportedPeptideId = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId({ reportedPeptideId, psmTblData_Map_Key_PsmId })
                psmTblData_Map_Key_ReportedPeptideId.set(reportedPeptideId, psm_TblData_Holder__ForSingleReportedPeptideId);
            }

            this._get_PSM_TblData_Holder__Exclude_DecoyPSM = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder({
                psmTblData_Map_Key_PsmId, psmTblData_Map_Key_ReportedPeptideId
            });
        }

        if ( include_DecoyPSM ) {
            //  Process 'Include Decoy'

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId__Include_DecoyPSM;
            const psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId = psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId__Include_DecoyPSM;

            const psmTblData_Map_Key_ReportedPeptideId = new Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId>();

            for ( const mapEntry of psmTblData_Map_Key_PsmId__Map_Key_ReportedPeptideId.entries() ) {
                const reportedPeptideId = mapEntry[0];
                const psmTblData_Map_Key_PsmId = mapEntry[1];
                const psm_TblData_Holder__ForSingleReportedPeptideId = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSingleReportedPeptideId({ reportedPeptideId, psmTblData_Map_Key_PsmId })
                psmTblData_Map_Key_ReportedPeptideId.set(reportedPeptideId, psm_TblData_Holder__ForSingleReportedPeptideId);
            }

            this._get_PSM_TblData_Holder__Include_DecoyPSM = new CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder({
                psmTblData_Map_Key_PsmId, psmTblData_Map_Key_ReportedPeptideId
            });
        }
    }

}