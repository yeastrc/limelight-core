/**
 * commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data.ts
 *
 * Data across Project since pass in ProjectScanFileId  -  ScanData_YES_Peaks_Data
 *
 * Data loaded from server and code to load data from server
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId {

    readonly scansArray: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber>

    private _singleScanEntry_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber> // Populate on first request from 'scansArray'

    /**
     *
     */
    constructor(
        {
            scansArray
        }: {
            scansArray: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber>
        }
    ) {
        this.scansArray = scansArray
    }

    /**
     *
     */
    get_ScanData_YES_Peaks_For_ScanNumber(scanNumber: number) {

        if ( ! this._singleScanEntry_Map_Key_ScanNumber ) {

            this._singleScanEntry_Map_Key_ScanNumber = new Map()

            for ( const scan of this.scansArray ) {
                if ( this._singleScanEntry_Map_Key_ScanNumber.has( scan.scanNumber ) ) {
                    const msg = "Scan number in scansArray more than once. scan.scanNumber: " + scan.scanNumber
                    console.warn(msg)
                    throw Error(msg)
                }
                this._singleScanEntry_Map_Key_ScanNumber.set( scan.scanNumber, scan )
            }
        }

        return this._singleScanEntry_Map_Key_ScanNumber.get(scanNumber);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber {

    level: number;
    scanNumber: number;
    retentionTime: number;
    totalIonCurrent_ForScan: number;

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    ionInjectionTime: number;  // In Milliseconds

    /**
     * Not populated if request other than peaks and scan file contains more than one unique value
     */
    isCentroid: number; //  1 true, 0 false

    //  Only applicable where level > 1

    parentScanNumber: number;
    precursorCharge: number;
    precursor_M_Over_Z: number;

    // Peak with Max Intensity in the scan. IGNORES Scan Peak Filtering.  ONLY Returned if requested so NOT break old callers.
    peak_WithMaxIntensityInAllOfScan: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak

    // Peaks
    peaks: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>;

}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak {

    mz: number;
    intensity: number;
}


/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_Holder {

    readonly scanData: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult {

    scanData_YES_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data {

    private _internal_GetData_CacheResults_Class_Object__NO_FilterOn_MZ_Ranges: INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match

    private _internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges: INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match

    /**
     *
     */
    private constructor() {
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance() {
        return new CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data();
    }

    /**
     * !!!  Always return promise
     *
     * Somewhat caching result !!!!
     *
     */
    get_ScanData_YES_Peaks_DataHolder_ReturnPromise( requestParams: INTERNAL__SingleRequestToServer_RequestParams ): Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_ScanData_YES_Peaks_DataHolder( requestParams );

            if ( result.data ) {

                return Promise.resolve( result.data );
            }

            return result.promise;

        } catch ( e ) {
            console.warn( "Exception caught: ", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e;
        }
    }


    /**
     *
     * Somewhat caching result !!!!
     */
    get_ScanData_YES_Peaks_DataHolder( requestParams: INTERNAL__SingleRequestToServer_RequestParams ):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>
        } {

        if ( ! requestParams.yes_CacheResults_InJS ) {

            //  NOT cache results here

            //  Use a temp created getData object, resulting in no caching

            const getData_Object =
                new INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match( {
                    m_over_Z_Ranges__CachingDataFor: requestParams.m_over_Z_Ranges
                } )

            return getData_Object.get_ScanData_YES_Peaks_DataHolder( requestParams )  // EARLY RETURN
        }

        if ( ! requestParams.m_over_Z_Ranges || requestParams.m_over_Z_Ranges.length === 0 ) {

            //  Use this Cached data if NO m_over_Z_Ranges

            if ( ! this._internal_GetData_CacheResults_Class_Object__NO_FilterOn_MZ_Ranges ) {

                this._internal_GetData_CacheResults_Class_Object__NO_FilterOn_MZ_Ranges =
                    new INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match( {
                        m_over_Z_Ranges__CachingDataFor: requestParams.m_over_Z_Ranges
                    } )
            }
            return this._internal_GetData_CacheResults_Class_Object__NO_FilterOn_MZ_Ranges.get_ScanData_YES_Peaks_DataHolder( requestParams )

        } else {

            //  Use this Cached data if YES m_over_Z_Ranges

            if ( ! this._internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges ) {

                this._internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges =
                    new INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match( {
                        m_over_Z_Ranges__CachingDataFor: requestParams.m_over_Z_Ranges
                    } )
            } else if ( ! _is_Equal__m_over_Z_Ranges__In__INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges_Objects( requestParams.m_over_Z_Ranges, this._internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges.get_m_over_Z_Ranges__CachingDataFor() ) ) {

                //  Requested m_over_Z_Ranges have CHANGED so create new Cached data object to use

                this._internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges =
                    new INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match( {
                        m_over_Z_Ranges__CachingDataFor: requestParams.m_over_Z_Ranges
                    } )
            }

            return this._internal_GetData_CacheResults_Class_Object__YES_FilterOn_MZ_Ranges.get_ScanData_YES_Peaks_DataHolder( requestParams )
        }
    }
}


/**
 *  !!!!!!  INTERNAL  MAIN  CLASS  !!!!!!!!
 *
 *  !!    Added for limited specific caching when filtering on m/z values
 */
class INTERNAL__CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__Cache_When__Request__M_over_Z_Ranges__Match {

    private _m_over_Z_Ranges__CachingDataFor: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges

    constructor(
        {
            m_over_Z_Ranges__CachingDataFor
        } : {
            m_over_Z_Ranges__CachingDataFor: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges
        }
    ) {
        if ( ! m_over_Z_Ranges__CachingDataFor ) {
            //  NO entry so copy the reference to ensure it is exactly same value (null vs undefined)
            this._m_over_Z_Ranges__CachingDataFor = m_over_Z_Ranges__CachingDataFor
        } else {
            //  Clone values
            this._m_over_Z_Ranges__CachingDataFor = []
            for ( const m_over_Z_Range of m_over_Z_Ranges__CachingDataFor ) {
                this._m_over_Z_Ranges__CachingDataFor.push({
                    m_over_Z_Range_Min: m_over_Z_Range.m_over_Z_Range_Min, m_over_Z_Range_Max: m_over_Z_Range.m_over_Z_Range_Max
                })
            }
        }
    }

    get_m_over_Z_Ranges__CachingDataFor() {
        return this._m_over_Z_Ranges__CachingDataFor
    }

    /**
     * Tracked Separately since not all scan numbers requested will be retrieved due to scan peak mz filtering
     *
     * Added while processing webservice response.  Will add all scan numbers that requested data for
     */
    private _scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set_Map_Key_ProjectScanFileId: Map<number, Set<number>> = new Map()

    private _scanData_Map_Key_ScanNumber_Map_Key_ProjectScanFileId: Map<number, Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber>> = new Map()

    private _promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId = new Map<number, Array<INTERNAL__SingleRequestToServer_RequestParams_AND_Promise>>()

    /**
     *
     *
     */
    get_ScanData_YES_Peaks_DataHolder( requestParams: INTERNAL__SingleRequestToServer_RequestParams):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>
        } {

        if ( ! _is_Equal__m_over_Z_Ranges__In__INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges_Objects( requestParams.m_over_Z_Ranges, this._m_over_Z_Ranges__CachingDataFor ) ) {
            // ERROR: Failed params check. Calling class MUST create object of this class with matching  m_over_Z_Ranges
            const msg = "Invalid Params where NOT MATCH: requestParams.m_over_Z_Ranges, this._m_over_Z_Ranges__CachingDataFor"
            console.warn( msg )
            throw Error( msg )
        }

        const scanNumbers_ToLoadDataFor_Set = new Set( requestParams.scanNumberList )

        { //  Find existing data loaded to return

            //  Remove from  the scan numbers tried to retrieve

            const scanNumbers_RetrievedScanDataFor_Set = this._scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set_Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )
            if ( scanNumbers_RetrievedScanDataFor_Set ) {

                for ( const scanNumber_Requested of requestParams.scanNumberList ) {
                    if ( scanNumbers_RetrievedScanDataFor_Set.has( scanNumber_Requested ) ) {
                        scanNumbers_ToLoadDataFor_Set.delete( scanNumber_Requested )
                    }
                }

                if ( scanNumbers_ToLoadDataFor_Set.size === 0 ) {

                    //  Get actual data

                    const scansArray: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber> = []

                    const scanData_Map_Key_ScanNumber_FromCache = this._scanData_Map_Key_ScanNumber_Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )
                    if ( scanData_Map_Key_ScanNumber_FromCache ) {

                        //  Found ALL data is loaded so return it

                        for ( const scanNumber_Requested of requestParams.scanNumberList ) {
                            const scanData = scanData_Map_Key_ScanNumber_FromCache.get( scanNumber_Requested )
                            if ( scanData ) {
                                //  have 'if' since possible no scanData for scan data due to filtering of scans
                                scansArray.push( scanData )
                            }
                        }
                    }
                    const result = new CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId( {
                        scansArray
                    } )

                    //  FOUND:  All Scan Numbers requested, so RETURN the data.
                    return {
                        promise: undefined, data: { scanData_YES_Peaks_Data_Holder: { scanData: result } } // EARLY RETURN
                    }
                }
            }
        }

        //  Return Promise that resolves after all data requested is retrieved

        return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>( (resolve_TopLevel, reject_TopLevel) => { try {

            this._getScans_NeedLoading_Or_LoadingInProgress({ scanNumbers_ToLoadDataFor_Set, requestParams, resolve_TopLevel, reject_TopLevel })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     *
     * @param scanNumbers_ToLoadDataFor_Set
     * @param requestParams
     * @param resolve_TopLevel
     * @param reject_TopLevel
     */
    private _getScans_NeedLoading_Or_LoadingInProgress(
        {
            scanNumbers_ToLoadDataFor_Set,
            requestParams,

            resolve_TopLevel, reject_TopLevel
        } : {
            scanNumbers_ToLoadDataFor_Set: Set<number>
            requestParams: INTERNAL__SingleRequestToServer_RequestParams

            resolve_TopLevel: ( value: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult ) => void
            reject_TopLevel: (reason?: any) => void
        }
    ) {

        const inProgress_Requests_For_ScanNumbers_Requested_Array: Array<Promise<void>> = []

        {  //  Find existing loading Promise

            const scanNumbers_ToLoadDataFor__COPY_For_CheckingExistingLoading = new Set( scanNumbers_ToLoadDataFor_Set )

            const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {

                for ( const promise_And_scanNumbers_RetrieveInProgress_Entry of promise_And_scanNumbers_RetrieveInProgress_Array ) {

                    let foundAnyScanNumbers_Requested_In_promise_And_scanNumbers_RetrieveInProgress_Entry = false

                    for ( const scanNumber_BeingRetrieved of promise_And_scanNumbers_RetrieveInProgress_Entry.scanNumberList_Requested_Set ) {
                        if ( scanNumbers_ToLoadDataFor__COPY_For_CheckingExistingLoading.has( scanNumber_BeingRetrieved ) ) {
                            //  Found Scan Number Requested in Scan Numbers being retrieved
                            scanNumbers_ToLoadDataFor_Set.delete( scanNumber_BeingRetrieved )
                            foundAnyScanNumbers_Requested_In_promise_And_scanNumbers_RetrieveInProgress_Entry = true
                        }
                    }

                    if ( foundAnyScanNumbers_Requested_In_promise_And_scanNumbers_RetrieveInProgress_Entry ) {
                        inProgress_Requests_For_ScanNumbers_Requested_Array.push( promise_And_scanNumbers_RetrieveInProgress_Entry.promise )
                    }
                }
            }
        }

        if ( scanNumbers_ToLoadDataFor_Set.size > 0 ) {

            //  Request scan numbers to load that are not currently loaded

            const scanNumbers_ToLoadDataFor_Array = Array.from( scanNumbers_ToLoadDataFor_Set )

            const promise = this._getData_FromServer({ projectScanFileId: requestParams.projectScanFileId, scanNumberList: scanNumbers_ToLoadDataFor_Array, m_over_Z_Ranges: requestParams.m_over_Z_Ranges })

            promise.then( novalue => { try {

                {  //  Save the Scan Numbers that sent to webservice to retrieve scan data for
                    let scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set = this._scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set_Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )
                    if ( ! scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set ) {
                        scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set = new Set()
                        this._scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set_Map_Key_ProjectScanFileId.set( requestParams.projectScanFileId, scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set )
                    }
                    for ( const scanNumber of scanNumbers_ToLoadDataFor_Array ) {
                        scanNumbers_SentToWebserviceToRetrieveScanDataFor_Set.add( scanNumber )
                    }
                }
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            inProgress_Requests_For_ScanNumbers_Requested_Array.push( promise )
        }

        const promiseAll = Promise.all( inProgress_Requests_For_ScanNumbers_Requested_Array )

        promiseAll.catch(reason => reject_TopLevel(reason));
        promiseAll.then(value => { try {

            const scansArray: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber> = []

            const scanData_Map_Key_ScanNumber_FromCache = this._scanData_Map_Key_ScanNumber_Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )
            if ( scanData_Map_Key_ScanNumber_FromCache ) {
                //  have 'if' since possible no scanData for scan data due to filtering of scans
                for ( const scanNumber_Requested of requestParams.scanNumberList ) {
                    const scanData = scanData_Map_Key_ScanNumber_FromCache.get( scanNumber_Requested )
                    if ( scanData ) {
                        //  have 'if' since possible no scanData for scan data due to filtering of scans
                        scansArray.push( scanData )
                    }
                }
            }

            const result = new CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId( {
                scansArray
            } )

            resolve_TopLevel( { scanData_YES_Peaks_Data_Holder: { scanData: result } } )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param projectScanFileId
     * @param scanNumberList
     * @param m_over_Z_Ranges
     */
    private _getData_FromServer(
        {
            projectScanFileId, scanNumberList, m_over_Z_Ranges
        } : {
            projectScanFileId: number
            scanNumberList: Array<number>
            m_over_Z_Ranges: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges
        }
    ) {
        let promise: Promise<void> = undefined

        promise = new Promise<void>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectScanFileId: projectScanFileId,
                    scanNumberList: scanNumberList,
                    m_over_Z_Ranges: m_over_Z_Ranges
                };

                const url = "d/rws/for-page/psfb/scan-data-with-peaks-for-scan-numbers-project-search-id-search-scan-file-id-optional-m-over-z-ranges";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url, dataRetrieval_CanRetry: true});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch((reason) => {
                    console.log("END: REJECTED: getting data from URL: " + url);

                    let promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( projectScanFileId )
                    if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {
                        promise_And_scanNumbers_RetrieveInProgress_Array.filter( value => {
                            if ( value.promise === promise ) {
                                return false // Remove this promise
                            }
                            return true
                        })
                    }

                    reject(reason)
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                    console.log( "END: Successful: AJAX Call: getting data from URL: " + url );


                    const scanData = new CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId({
                        scansArray: responseData.scanList
                    })

                    if ( scanData.scansArray === undefined || scanData.scansArray === null ) {
                        throw Error("( scanData.scansArray === undefined || scanData.scansArray === null )")
                    }
                    if ( ! ( scanData.scansArray instanceof Array ) ) {
                        throw Error("( ! ( scanData.scansArray instanceof Array ) )")
                    }

                    _validate_ScanData({ scanData })

                    this._addScans_ToCache({ scanData, projectScanFileId })

                    const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( projectScanFileId )
                    if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {
                        const promise_And_scanNumbers_RetrieveInProgress_Array_Filtered = promise_And_scanNumbers_RetrieveInProgress_Array.filter( value => {
                            if ( value.promise === promise ) {
                                return false // Remove this promise
                            }
                            return true
                        })
                        this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( projectScanFileId, promise_And_scanNumbers_RetrieveInProgress_Array_Filtered )
                    }

                    resolve();

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


        let promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( projectScanFileId )
        if ( ! promise_And_scanNumbers_RetrieveInProgress_Array ) {
            promise_And_scanNumbers_RetrieveInProgress_Array = []
            this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( projectScanFileId, promise_And_scanNumbers_RetrieveInProgress_Array )
        }
        promise_And_scanNumbers_RetrieveInProgress_Array.push({ promise, scanNumberList_Requested_Set: new Set( scanNumberList )})

        return promise
    }

    private _addScans_ToCache(
        {
            scanData, projectScanFileId
        } : {
            scanData : CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId
            projectScanFileId: number
        }
    ) {

        let scanData_Map_Key_ScanNumber = this._scanData_Map_Key_ScanNumber_Map_Key_ProjectScanFileId.get( projectScanFileId )
        if ( ! scanData_Map_Key_ScanNumber ) {
            scanData_Map_Key_ScanNumber = new Map()
            this._scanData_Map_Key_ScanNumber_Map_Key_ProjectScanFileId.set( projectScanFileId, scanData_Map_Key_ScanNumber )
        }

        for ( const scanData_Entry of scanData.scansArray ) {
            scanData_Map_Key_ScanNumber.set( scanData_Entry.scanNumber, scanData_Entry)
        }
    }
}

/**
 *
 * @param scanData
 */
const _validate_ScanData = function(
    {
        scanData
    } : {
        scanData : CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_ForSingle_ProjectScanFileId
    }
) {
    for ( const scanEntry of scanData.scansArray ) {

        if ( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null ) {
            const msg = "( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! limelight__variable_is_type_number_Check( scanEntry.scanNumber ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.scanNumber ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( scanEntry.level === undefined || scanEntry.level === null ) {
            const msg = "( scanEntry.level === undefined || scanEntry.level === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! limelight__variable_is_type_number_Check( scanEntry.level ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.level ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( scanEntry.retentionTime === undefined || scanEntry.retentionTime === null ) {
            const msg = "( scanEntry.retentionTime === undefined || scanEntry.retentionTime === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! limelight__variable_is_type_number_Check( scanEntry.retentionTime ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) )";
            console.warn(msg);
            throw Error(msg);
        }
        //  Optional values
        if ( scanEntry.totalIonCurrent_ForScan !== undefined && scanEntry.totalIonCurrent_ForScan !== null ) {
            if ( ! limelight__variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.ionInjectionTime !== undefined && scanEntry.ionInjectionTime !== null ) {
            if ( ! limelight__variable_is_type_number_Check( scanEntry.ionInjectionTime ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.ionInjectionTime ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.parentScanNumber !== undefined && scanEntry.parentScanNumber !== null ) {
            if ( ! limelight__variable_is_type_number_Check( scanEntry.parentScanNumber ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.parentScanNumber ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.precursorCharge !== undefined && scanEntry.precursorCharge !== null ) {
            if ( ! limelight__variable_is_type_number_Check( scanEntry.precursorCharge ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.precursorCharge ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.precursor_M_Over_Z !== undefined && scanEntry.precursor_M_Over_Z !== null ) {
            if ( ! limelight__variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( ! scanEntry.peak_WithMaxIntensityInAllOfScan  ) {
            const msg = "( scanEntry.peak_WithMaxIntensityInAllOfScan is NOT populated )";
            console.warn(msg);
            throw Error(msg);
        }
        {
            if ( scanEntry.peak_WithMaxIntensityInAllOfScan.intensity === undefined || scanEntry.peak_WithMaxIntensityInAllOfScan.intensity === null ) {
                const msg = "( scanEntry.peak_WithMaxIntensityInAllOfScan.intensity === undefined || scanEntry.peak_WithMaxIntensityInAllOfScan.intensity === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( scanEntry.peak_WithMaxIntensityInAllOfScan.intensity ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.peak_WithMaxIntensityInAllOfScan.intensity ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanEntry.peak_WithMaxIntensityInAllOfScan.mz === undefined || scanEntry.peak_WithMaxIntensityInAllOfScan.mz === null ) {
                const msg = "( scanEntry.peak_WithMaxIntensityInAllOfScan.mz === undefined || scanEntry.peak_WithMaxIntensityInAllOfScan.mz === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( scanEntry.peak_WithMaxIntensityInAllOfScan.mz ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( scanEntry.peak_WithMaxIntensityInAllOfScan.mz ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( scanEntry.peaks ) {
            if ( ! ( scanEntry.peaks instanceof Array ) ) {
                throw Error("( ! ( scanEntry.peaks instanceof Array ) )")
            }

            for ( const peak of scanEntry.peaks ) {
                if ( peak.intensity === undefined || peak.intensity === null ) {
                    const msg = "( peak.intensity === undefined || peak.intensity === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( peak.intensity ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( peak.intensity ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( peak.mz === undefined || peak.mz === null ) {
                    const msg = "( peak.mz === undefined || peak.mz === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( peak.mz ) ) {
                    const msg = "( ! limelight__variable_is_type_number_Check( peak.mz ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }
    }
}


/**
 * Are the m_over_Z_Ranges values equal in the two objects.
 * They must be in the same order with the same values
 */
const _is_Equal__m_over_Z_Ranges__In__INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges_Objects = function (
    a__m_over_Z_Ranges: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges,
    b__m_over_Z_Ranges: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges
) : boolean {

    if ( ! a__m_over_Z_Ranges && ! b__m_over_Z_Ranges ) {
        return true
    }
    if ( a__m_over_Z_Ranges && b__m_over_Z_Ranges && a__m_over_Z_Ranges.length === b__m_over_Z_Ranges.length ) {

        const arrayLength = a__m_over_Z_Ranges.length

        for ( let index = 0; index < arrayLength; index++ ) {

            if ( a__m_over_Z_Ranges[ index ].m_over_Z_Range_Min !== b__m_over_Z_Ranges[ index ].m_over_Z_Range_Min
                ||  a__m_over_Z_Ranges[ index ].m_over_Z_Range_Max !== b__m_over_Z_Ranges[ index ].m_over_Z_Range_Max ) {
                return false
            }
        }
        return true
    }

    return false
}


class INTERNAL__SingleRequestToServer_RequestParams {

    projectScanFileId: number;
    scanNumberList: Array<number>
    m_over_Z_Ranges: INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges
    /**
     * YES hold the webservice results here in this object.
     * Use in "Filter On Special Ion:" (Filter on Scan Peak MZ) in class Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
     */
    yes_CacheResults_InJS: boolean
}

type INTERNAL__SingleRequestToServer_RequestParams__M_over_Z_Ranges =

    Array<{
        m_over_Z_Range_Min: number;
        m_over_Z_Range_Max: number;
    }>;


class INTERNAL__SingleRequestToServer_RequestParams_AND_Promise {

    scanNumberList_Requested_Set: Set<number>
    promise: Promise<void>
}
