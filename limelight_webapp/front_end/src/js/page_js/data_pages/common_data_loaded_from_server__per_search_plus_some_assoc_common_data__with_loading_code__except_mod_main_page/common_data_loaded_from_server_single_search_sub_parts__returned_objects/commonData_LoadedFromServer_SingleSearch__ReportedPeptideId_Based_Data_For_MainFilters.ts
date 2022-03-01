/**
 * commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.ts
 *
 * For Single Project Search  -  ReportedPeptideId based Data
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export type CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType =
    Array<number>

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult {

    reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
}

/**
 *
 */
export type CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType =
    Map<number, number>

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult {

    numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
}

export type CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType =
    Set<number>

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult {

    reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

    private _reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult
    private _numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult
    private _reportedPeptideIds_HasDynamicModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
    private _reportedPeptideIds_AnyPsmHas_DynamicModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
    private _reportedPeptideIds_AnyPsmHas_OpenModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
    private _reportedPeptideIds_AnyPsmHas_ReporterIons: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult

    //  Hold In Progress Promises for actually loading data

    private _load_get_reportedPeptideData__InProgressPromise: Promise<void>
    private _load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId
        }: {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId
        });
    }

    /**
     * always return promise
     */
    get_reportedPeptideIds_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult> {
        try {
            const result = this.get_reportedPeptideIds();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_reportedPeptideIds_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    get_reportedPeptideIds():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult>
        } {

        if (this._reportedPeptideIds) {

            //  Have loaded data so just return it
            return {
                data: this._reportedPeptideIds,
                promise: undefined
            };
        }

        const promise_load = this._load_ReportedPeptide_Data();

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_FunctionResult>(
            (resolve, reject) => { try {

                promise_load.catch(reason => {
                    reject(reason)
                });
                promise_load.then(noValue => {
                    try {
                        resolve(this._reportedPeptideIds);

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }

    /**
     * always return promise
     */
    get_reportedPeptideIds_HasDynamicModifications_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult> {
        try {
            const result = this.get_reportedPeptideIds_HasDynamicModifications();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_reportedPeptideIds_HasDynamicModifications_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    get_reportedPeptideIds_HasDynamicModifications():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>
        } {

        if (this._reportedPeptideIds_HasDynamicModifications) {

            //  Have loaded data so just return it
            return {
                data: this._reportedPeptideIds_HasDynamicModifications,
                promise: undefined
            };
        }

        const promise_load = this._load_ReportedPeptide_Data();

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>(
            (resolve, reject) => { try {

                promise_load.catch(reason => {
                    reject(reason)
                });
                promise_load.then(noValue => {
                    try {
                        resolve(this._reportedPeptideIds_HasDynamicModifications);

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }

    /**
     * always return promise
     */
    get_reportedPeptideIds_AnyPsmHas_OpenModifications_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult> {
        try {
            const result = this.get_reportedPeptideIds_AnyPsmHas_OpenModifications();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_reportedPeptideIds_AnyPsmHas_OpenModifications_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    get_reportedPeptideIds_AnyPsmHas_OpenModifications():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>
        } {

        if (this._reportedPeptideIds_AnyPsmHas_OpenModifications) {

            //  Have loaded data so just return it
            return {
                data: this._reportedPeptideIds_AnyPsmHas_OpenModifications,
                promise: undefined
            };
        }

        const promise_load = this._load_ReportedPeptide_Data();

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>(
            (resolve, reject) => { try {

                promise_load.catch(reason => {
                    reject(reason)
                });
                promise_load.then(noValue => {
                    try {
                        resolve(this._reportedPeptideIds_AnyPsmHas_OpenModifications);

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }

    /**
     * always return promise
     */
    get_reportedPeptideIds_AnyPsmHas_ReporterIons_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult> {
        try {
            const result = this.get_reportedPeptideIds_AnyPsmHas_ReporterIons();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_reportedPeptideIds_AnyPsmHas_ReporterIons_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    get_reportedPeptideIds_AnyPsmHas_ReporterIons():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>
        } {

        if (this._reportedPeptideIds_AnyPsmHas_ReporterIons) {

            //  Have loaded data so just return it
            return {
                data: this._reportedPeptideIds_AnyPsmHas_ReporterIons,
                promise: undefined
            };
        }

        const promise_load = this._load_ReportedPeptide_Data();

        const promise = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_FunctionResult>(
            (resolve, reject) => { try {

                promise_load.catch(reason => {
                    reject(reason)
                });
                promise_load.then(noValue => {
                    try {
                        resolve(this._reportedPeptideIds_AnyPsmHas_ReporterIons);

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {
            data: undefined,
            promise
        }
    }

    //////////////////////////

    //   Loading Methods

    /**
     * Get Reported Peptide Id Data For Single Project Search Id
     *
     * Also loads Number of PSMs per Reported Peptide Id under specific conditions (Default Cutoffs, ...)
     */

    private _load_ReportedPeptide_Data() : Promise<void> {

        if ( this._load_get_reportedPeptideData__InProgressPromise ) {
            return this._load_get_reportedPeptideData__InProgressPromise;
        }

        this._load_get_reportedPeptideData__InProgressPromise = new Promise<void>( ( resolve, reject ) => {
            try {
                const requestObject = {
                    projectSearchId : this._projectSearchId,
                    searchDataLookupParams_For_Single_ProjectSearchId : this._searchDataLookupParams_For_Single_ProjectSearchId,
                };

                console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id-version-0001";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                    try {
                        console.log("AJAX Call to get Peptide List END, Now: " + new Date() );

                        this._processReportedPeptideId_AndData_ListFromServer_Populate_loadedData({reportedPeptideCoreDataArray: responseData.reportedPeptideList});

                        resolve();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this._load_get_reportedPeptideData__InProgressPromise.catch( reason => {
            this._load_get_reportedPeptideData__InProgressPromise = undefined;
        });
        this._load_get_reportedPeptideData__InProgressPromise.then( valueIgnored => {
            this._load_get_reportedPeptideData__InProgressPromise = undefined;
        })

        return this._load_get_reportedPeptideData__InProgressPromise;
    }

    /**
     * Populate loadedData with data from dataFromServer.
     *
     * 	Set:  loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds( )
     *  Set (if available):  loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap() : Map of num PSMs : Key ReportedPeptideId
     */
    private _processReportedPeptideId_AndData_ListFromServer_Populate_loadedData(
        {
            reportedPeptideCoreDataArray
        } : {
            reportedPeptideCoreDataArray: any
        } ) {

        //  Each entry in reportedPeptideCoreDataArray is an object with properties reportedPeptideId and numPsms_IfComputedOrInDB

        //             numPsms_IfComputedOrInDB is only populated for some criteria (Default Cutoffs).  Otherwise, it is null.

        //  Extract the reportedPeptideIds into an array and if populated put the numPsms in a Map on loadedData

        // console.log("_processPeptideIdListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray } ) reportedPeptideCoreDataArray:");
        // console.log( reportedPeptideCoreDataArray );

        const reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType = [];
        const reportedPeptideIds_HasDynamicModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType = new Set();
        const reportedPeptideIds_AnyPsmHas_DynamicModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType = new Set();
        const reportedPeptideIds_AnyPsmHas_OpenModifications: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType = new Set();
        const reportedPeptideIds_AnyPsmHas_ReporterIons: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_Has_ResultDataType = new Set();

        //  Build local map then if all entries have values copy to object instance property
        const numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = new Map();

        let allSet_numPsmsForReportedPeptideIdMap = true;

        for ( const reportedPeptideCoreDataEntry of reportedPeptideCoreDataArray ) {

            const reportedPeptideId = reportedPeptideCoreDataEntry.reportedPeptideId;
            const numPsms_IfComputedOrInDB = reportedPeptideCoreDataEntry.numPsms_IfComputedOrInDB;
            const reportedPeptideHas_DynamicModifications = reportedPeptideCoreDataEntry.reportedPeptideHas_DynamicModifications ? true: false;
            const anyPsmHas_DynamicModifications = reportedPeptideCoreDataEntry.anyPsmHas_DynamicModifications ? true: false;
            const anyPsmHas_OpenModifications = reportedPeptideCoreDataEntry.anyPsmHas_OpenModifications ? true: false;
            const anyPsmHas_ReporterIons = reportedPeptideCoreDataEntry.anyPsmHas_ReporterIons ? true: false;

            if ( ! variable_is_type_number_Check( reportedPeptideId )  ) {
                const msg = "_processReportedPeptideId_AndData_ListFromServer_Populate_loadedData: ( ! variable_is_type_number_Check( reportedPeptideId ).  reportedPeptideId: " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg)
            }

            reportedPeptideIds.push( reportedPeptideId );

            if ( numPsms_IfComputedOrInDB !== undefined && numPsms_IfComputedOrInDB !== null ) {

                if ( ! variable_is_type_number_Check( numPsms_IfComputedOrInDB )  ) {
                    const msg = "_processReportedPeptideId_AndData_ListFromServer_Populate_loadedData: ( ! variable_is_type_number_Check( numPsms_IfComputedOrInDB ).  numPsms_IfComputedOrInDB: " + numPsms_IfComputedOrInDB;
                    console.warn(msg);
                    throw Error(msg)
                }

                numPsmsForReportedPeptideIdMap.set( reportedPeptideId, numPsms_IfComputedOrInDB );
            } else {
                allSet_numPsmsForReportedPeptideIdMap = false;
            }

            if ( reportedPeptideHas_DynamicModifications ) {
                reportedPeptideIds_HasDynamicModifications.add( reportedPeptideId );
            }
            if ( anyPsmHas_DynamicModifications ) {
                reportedPeptideIds_AnyPsmHas_DynamicModifications.add( reportedPeptideId );
            }
            if ( anyPsmHas_OpenModifications ) {
                reportedPeptideIds_AnyPsmHas_OpenModifications.add( reportedPeptideId );
            }
            if ( anyPsmHas_ReporterIons ) {
                reportedPeptideIds_AnyPsmHas_ReporterIons.add( reportedPeptideId );
            }
        }

        this._reportedPeptideIds = { reportedPeptideIds };

        //  Reported Peptides for Current Cutoffs/Filters that contain Reported Peptide Level Dynamic Modifications
        this._reportedPeptideIds_HasDynamicModifications = { reportedPeptideIds: reportedPeptideIds_HasDynamicModifications };
        //  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Dynamic Modifications
        this._reportedPeptideIds_AnyPsmHas_DynamicModifications = { reportedPeptideIds: reportedPeptideIds_AnyPsmHas_DynamicModifications };
        //  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Open Modifications
        this._reportedPeptideIds_AnyPsmHas_OpenModifications = { reportedPeptideIds: reportedPeptideIds_AnyPsmHas_OpenModifications };
        //  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Reporter Ions
        this._reportedPeptideIds_AnyPsmHas_ReporterIons = { reportedPeptideIds: reportedPeptideIds_AnyPsmHas_ReporterIons };

        if ( allSet_numPsmsForReportedPeptideIdMap ) {
            //  All entries have numPsms so store
            this._numPsmsForReportedPeptideIdMap = { numPsmsForReportedPeptideIdMap };
        }
    }

    ////////////////////////////


    /**
     *
     */
    get_numPsmsForReportedPeptideIdMap_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult> {
        try {
            const result = this.get_numPsmsForReportedPeptideIdMap();
            if ( result.data ) {
                return Promise.resolve( result.data );
            }
            return result.promise;

        } catch( e ) {
            console.warn("Exception caught in get_numPsmsForReportedPeptideIdMap_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    get_numPsmsForReportedPeptideIdMap():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>
        } {

        if (this._numPsmsForReportedPeptideIdMap) {

            //  Have loaded data so just return it

            return { // EARLY RETURN
                data: this._numPsmsForReportedPeptideIdMap,
                promise: undefined
            };
        }

        //  This logic is a bit extended since in some cases loading the reported peptide ids also loads the Num PSMs and sometimes it does not, depending on the filter data

        //  Get Reported Peptide Ids. Confirms they are loaded and maybe loads Num PSMs

        const get_reportedPeptideIds_Result = this.get_reportedPeptideIds();

        if ( get_reportedPeptideIds_Result.data ) {

            //  Loading Reported Peptide Ids did NOT load Num PSMs so must load from Num PSM web service

            return { // EARLY RETURN
                data: undefined,
                promise: this._load_Num_PSM_Data_From_Num_PSMs_Webservice()
            }

        } else if ( get_reportedPeptideIds_Result.promise ) {

            //  Still loading Reported Peptide Ids

            const promise_Root = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>((resolve, reject) => {

                get_reportedPeptideIds_Result.promise.catch(reason => {
                    reject(reason)
                });
                get_reportedPeptideIds_Result.promise.then(unusedValue => {
                    try {
                        const promise_Final = this._load_Num_PSM_Data_From_Num_PSMs_Webservice()

                        promise_Final.catch( reason => {
                            reject(reason);
                        });
                        promise_Final.then( noValue => {
                            resolve(this._numPsmsForReportedPeptideIdMap);
                        });

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            return {
                data: undefined,
                promise: promise_Root
            }

        } else {
            throw Error("this.get_reportedPeptideIds(); NOT return data or promise")
        }
    }

    /**
     *
     *
     */
    private _get_Num_PSMs_ProcessWhenHave_ReportedPeptideIds() :  {
        data: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult
        promise: Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>
    } {

        const get_reportedPeptideIds_Result = this.get_reportedPeptideIds();

        if ( ! get_reportedPeptideIds_Result.data ) {
            throw Error("Should not get here when no data")
        }

        if (this._numPsmsForReportedPeptideIdMap) {  //  Repeat here in case now data is loaded after loading reported peptide ids

            //  Have loaded data so just return it

            return { // EARLY RETURN
                data: this._numPsmsForReportedPeptideIdMap,
                promise: undefined
            };
        }

        //  Still not loaded so load now

        return {
            data: undefined,
            promise: this._load_Num_PSM_Data_From_Num_PSMs_Webservice()
        }
    }


    /**
     *
     */
    private _load_Num_PSM_Data_From_Num_PSMs_Webservice() : Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult> {

        if ( this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise ) {

            //  Return already in progress Promise

            this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise; // EARLY RETURN
        }

        const promise_load = this._load_Num_PSM_Data_From_Num_PSMs_Webservice_Actual();

        this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise = new Promise<CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>((resolve, reject) => {

            promise_load.catch(reason => {
                reject(reason)
            });
            promise_load.then(value => {
                try {
                    resolve(this._numPsmsForReportedPeptideIdMap);

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
        })

        //  Clear in progess promise on catch or then
        this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise.catch( reason => {
            this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise = undefined;
        });
        this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise.then( result => {
            this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise = undefined;
        });

        return this._load_Num_PSM_Data_From_Num_PSMs_Webservice__InProgressPromise;
    }

    /**
     *
     * @param reportedPeptideIds
     * @private
     */
    private _load_Num_PSM_Data_From_Num_PSMs_Webservice_Actual() : Promise<void> {

        const reportedPeptideIds = this._reportedPeptideIds.reportedPeptideIds;

        if ( ! ( reportedPeptideIds instanceof Array ) ) {
            const msg = "_load_Num_PSM_Data_From_Num_PSMs_Webservice_Actual(): ( reportedPeptideIds instanceof Array )";
            console.warn(msg + ".  reportedPeptideIds: ", reportedPeptideIds)
            throw Error(msg);
        }

        const promise = new Promise<void>( ( resolve, reject ) => {
            try {
                let requestObject = {
                    projectSearchId : this._projectSearchId,
                    reportedPeptideIds,
                    searchDataLookupParams_For_Single_ProjectSearchId : this._searchDataLookupParams_For_Single_ProjectSearchId,
                };

                console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                    try {
                        console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                        const psmCount_PerReportedPeptideId = responseData.psmCount_PerReportedPeptideId;

                        this._processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData({ psmCount_PerReportedPeptideId })

                        resolve( responseData.numPsms_KeyReportedPeptideId );

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        return promise;
    }


    /**
     * Populate loadedData with data from dataFromServer.
     *
     */
    _processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData( { psmCount_PerReportedPeptideId } : {

        psmCount_PerReportedPeptideId: any

    } ) : void {

        const numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = new Map();

        for ( const psmCount_PerReportedPeptideId_Entry of psmCount_PerReportedPeptideId ) {

            const reportedPeptideId = psmCount_PerReportedPeptideId_Entry.reportedPeptideId;
            const psmCount = psmCount_PerReportedPeptideId_Entry.psmCount;

            numPsmsForReportedPeptideIdMap.set( reportedPeptideId, psmCount );
        }

        const result : CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult = {
            numPsmsForReportedPeptideIdMap: numPsmsForReportedPeptideIdMap
        }

        this._numPsmsForReportedPeptideIdMap = result;
    }
}
