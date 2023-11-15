/**
 * commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data.ts
 *
 * Data across Project since pass in ProjectScanFileId  -  ScanData_NO_Peaks_Data
 *
 * Data loaded from server and code to load data from server
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_ForSingle_ProjectScanFileId_And_OPTIONAL_AllParentScans {

    readonly projectScanFileId: number;
    readonly scanNumbers_RetrievedDataFor: ReadonlySet<number>
    readonly allParentScansIncluded: boolean
    readonly retrieved_ALL_Scans_ForFile: boolean

    readonly scansArray: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber>

    private _singleScanEntry_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> // Populate on first request from 'scansArray'

    // private _scanLevels: Set<number> // Populate on first request from 'scansArray'
    // private _scanCount_Map_Key_ScanLevel: Map<number,number> // Populate on first request from 'scansArray'

    /**
     *
     */
    constructor(
        {
            projectScanFileId, scanNumbers_RetrievedDataFor, allParentScansIncluded, retrieved_ALL_Scans_ForFile, scansArray
        }: {
            projectScanFileId: number
            scanNumbers_RetrievedDataFor: ReadonlySet<number>
            allParentScansIncluded: boolean
            retrieved_ALL_Scans_ForFile: boolean
            scansArray: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber>
        }
    ) {
        this.projectScanFileId = projectScanFileId;
        this.scanNumbers_RetrievedDataFor = scanNumbers_RetrievedDataFor
        this.allParentScansIncluded = allParentScansIncluded
        this.retrieved_ALL_Scans_ForFile = retrieved_ALL_Scans_ForFile

        this.scansArray = scansArray
    }

    /**
     *
     */
    get_ScanData_NO_Peaks_For_ScanNumber(scanNumber: number) {

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

    // /**
    //  *
    //  */
    // get_scanLevels_Set() : Set<number> {
    //
    //     if ( ! this._scanLevels ) {
    //
    //         this._scanLevels = new Set()
    //
    //         Populate this._scanLevels
    //     }
    //
    //     return this._scanLevels;
    // }
    //
    // /**
    //  * @returns undefined if scanLevel not found
    //  */
    // get_ScanCount_ForScanLevel( scanLevel: number ) : number {
    //
    //     if ( ! this._scanCount_Map_Key_ScanLevel ) {
    //
    //         this._scanCount_Map_Key_ScanLevel = new Map()
    //
    //         Populate this._scanCount_Map_Key_ScanLevel
    //     }
    //
    //     return this._scanCount_Map_Key_ScanLevel.get( scanLevel );
    // }
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber {

    readonly scanNumber: number;
    readonly level: number;
    readonly retentionTime_InSeconds: number;
    readonly totalIonCurrent_ForScan: number; // Can be null

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    readonly ionInjectionTime_InMilliseconds: number;  // In Milliseconds // Can be null

    //  Only applicable where level > 1

    readonly parentScanNumber: number; // Can be null
    readonly precursorCharge: number; // Can be null
    readonly precursor_M_Over_Z: number; // Can be null
}


/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder {

    readonly scanData: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_ForSingle_ProjectScanFileId_And_OPTIONAL_AllParentScans
}

/**
 *
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult {

    scanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data {

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
        return new CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data();
    }

    private _data_Holder_Array__Map_Key_ProjectScanFileId = new Map<number, Array<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>>()

    private _promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId = new Map<number, Array<INTERNAL__SingleRequestToServer_RequestParams_AND_Promise>>()

    /**
     * !!!  Always return promise
     *
     */
    get_ScanData_NO_Peaks_DataHolder_ReturnPromise( requestParams: INTERNAL__SingleRequestToServer_RequestParams ): Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_ScanData_NO_Peaks_DataHolder(requestParams);

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch (e) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }


    /**
     *
     */
    get_ScanData_NO_Peaks_DataHolder( requestParams: INTERNAL__SingleRequestToServer_RequestParams):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult>
        } {

        if ( requestParams.scanNumbers_RetrievedDataFor && requestParams.retrieved_ALL_Scans_ForFile ) {
            const msg = "ERROR: Input Params: ( requestParams.scanNumbers_RetrievedDataFor && requestParams.retrieved_ALL_Scans_ForFile )"
            console.warn(msg)
            throw Error(msg)
        }
        if ( ( ( ! requestParams.scanNumbers_RetrievedDataFor ) || requestParams.scanNumbers_RetrievedDataFor.size === 0 ) && ( ! requestParams.retrieved_ALL_Scans_ForFile ) ) {
            const msg = "ERROR: Input Params: ( ( ( ! requestParams.scanNumbers_RetrievedDataFor ) || requestParams.scanNumbers_RetrievedDataFor.size === 0 ) && ( ! requestParams.retrieved_ALL_Scans_ForFile ) ) )"
            console.warn(msg)
            throw Error(msg)
        }


        { //  Find existing data loaded to return

            const data_Holder_Array = this._data_Holder_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( data_Holder_Array ) {

                const data_Holder_FromArray = data_Holder_Array.find( data_Holder_Entry => {

                    if ( _requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams( requestParams, data_Holder_Entry.scanData ) ) {
                        return data_Holder_Entry
                    }
                } )

                if ( data_Holder_FromArray ) {

                    //  Found data is loaded so return it

                    return { promise: undefined, data: { scanData_NO_Peaks_Data_Holder: data_Holder_FromArray } } // EARLY RETURN
                }
            }
        }

        {  //  Find existing loading Promise

            const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {

                const promise_And_scanNumbers_RetrieveInProgress_FromArray = promise_And_scanNumbers_RetrieveInProgress_Array.find( promise_And_scanNumbers_RetrieveInProgress_Entry => {

                    if ( requestParams.retrieved_ALL_Scans_ForFile && promise_And_scanNumbers_RetrieveInProgress_Entry.requestParams.retrieved_ALL_Scans_ForFile ) {
                        return promise_And_scanNumbers_RetrieveInProgress_Entry
                    }

                    let match_scanNumbers_RetrievedDataFor = true

                    for ( const scanNumber_requestParams of requestParams.scanNumbers_RetrievedDataFor ) {
                        if ( !promise_And_scanNumbers_RetrieveInProgress_Entry.requestParams.scanNumbers_RetrievedDataFor.has( scanNumber_requestParams ) ) {
                            match_scanNumbers_RetrievedDataFor = false
                        }
                    }
                    if ( match_scanNumbers_RetrievedDataFor ) {
                        for ( const scanNumber_promise_And_scanNumbers_RetrieveInProgress_Entry of promise_And_scanNumbers_RetrieveInProgress_Entry.requestParams.scanNumbers_RetrievedDataFor ) {
                            if ( !requestParams.scanNumbers_RetrievedDataFor.has( scanNumber_promise_And_scanNumbers_RetrieveInProgress_Entry ) ) {
                                match_scanNumbers_RetrievedDataFor = false
                            }
                        }
                    }
                    if ( match_scanNumbers_RetrievedDataFor ) {
                        return promise_And_scanNumbers_RetrieveInProgress_Entry
                    }
                } )

                if ( promise_And_scanNumbers_RetrieveInProgress_FromArray ) {

                    //  Found data is loaded so return it

                    return {
                        data: undefined,
                        promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult>((resolve, reject) => { try {

                            promise_And_scanNumbers_RetrieveInProgress_FromArray.promise.then( value_scanData_NO_Peaks_Data_Holder => { try {

                                resolve({ scanData_NO_Peaks_Data_Holder: value_scanData_NO_Peaks_Data_Holder })

                            } catch (e) {
                                console.warn("Exception caught: ", e);
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }})

                        } catch (e) {
                            console.warn("Exception caught: ", e);
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }})
                    } // EARLY RETURN
                }
            }

        }

        const loadPromise = this._loadData(requestParams )

        {

            const requestParams_AND_Promise: INTERNAL__SingleRequestToServer_RequestParams_AND_Promise = {
                promise: loadPromise, requestParams
            }

            let promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

            if ( ! promise_And_scanNumbers_RetrieveInProgress_Array ) {
                promise_And_scanNumbers_RetrieveInProgress_Array = []
                this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( requestParams.projectScanFileId, promise_And_scanNumbers_RetrieveInProgress_Array )
            }

            promise_And_scanNumbers_RetrieveInProgress_Array.push( requestParams_AND_Promise )



            loadPromise.catch(reason => {
                this._removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise })
            })
            loadPromise.then(value => { try {

                this._removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise })

                let data_Holder_Array = this._data_Holder_Array__Map_Key_ProjectScanFileId.get( requestParams.projectScanFileId )

                if ( ! data_Holder_Array ) {

                    //  Add new data_Holder_Array

                    data_Holder_Array = []

                    data_Holder_Array.push( value )

                    this._data_Holder_Array__Map_Key_ProjectScanFileId.set( requestParams.projectScanFileId, data_Holder_Array )

                } else {

                    //  ONLY add to data_Holder_Array if NOT already exists

                    const data_Holder_FromArray = data_Holder_Array.find( data_Holder_Entry => {

                        if ( _requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams( requestParams, data_Holder_Entry.scanData ) ) {
                            return data_Holder_Entry
                        }
                    } )

                    if ( ! data_Holder_FromArray ) {

                        //  NOT already exists so add

                        data_Holder_Array.push( value )
                    }
                }


            } catch (e) {
                console.warn("Exception caught: ", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }})

        }

        return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data__get_ScanData_NO_Peaks_DataHolder__FunctionResult>((resolve, reject) => { try {

                loadPromise.catch(reason => { reject(reason) })
                loadPromise.then( value_loadPromise => { try {

                    resolve( { scanData_NO_Peaks_Data_Holder: value_loadPromise })

                } catch (e) {
                    console.warn("Exception caught: ", e);
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }})
            } catch (e) {
                console.warn("Exception caught: ", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }})
        }
    }

    /**
     * @param requestParams_AND_Promise
     */
    private _removeFrom_promise_And_scanNumbers_RetrieveInProgress_Array({ requestParams_AND_Promise} : { requestParams_AND_Promise: INTERNAL__SingleRequestToServer_RequestParams_AND_Promise }) {

        const promise_And_scanNumbers_RetrieveInProgress_Array = this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.get( requestParams_AND_Promise.requestParams.projectScanFileId )

        if ( promise_And_scanNumbers_RetrieveInProgress_Array ) {

            const newArray = promise_And_scanNumbers_RetrieveInProgress_Array.filter(arrayEntry => {
                if ( arrayEntry === requestParams_AND_Promise ) {
                    return false; // Remove passed in entry
                }
                return true
            })

            this._promise_And_scanNumbers_RetrieveInProgress_Array__Map_Key_ProjectScanFileId.set( requestParams_AND_Promise.requestParams.projectScanFileId, newArray )
        }
    }

    /**
     *
     * @param requestParams
     */
    private _loadData( requestParams: INTERNAL__SingleRequestToServer_RequestParams ) : Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder> {

        let scanNumberList: Array<number> = undefined

        if ( requestParams.scanNumbers_RetrievedDataFor ) {
            scanNumberList = Array.from( requestParams.scanNumbers_RetrievedDataFor )
        }

        const promise = new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectScanFileId: requestParams.projectScanFileId,
                    retrieve_ALL_Scans_ForFile: requestParams.retrieved_ALL_Scans_ForFile,
                    scanNumberList,
                    returnParentScanData: requestParams.get_ParentScanData
                };

                const url = "d/rws/for-page/psfb/scan-data-no-peaks-and-optional-all-parents-for-scan-numbers--project-scan-file-id";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch((reason) => {
                    console.log("END: REJECTED: getting data from URL: " + url);
                    reject(reason)
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                    console.log( "END: Successful: AJAX Call: getting data from URL: " + url );

                    const holder = _populate_DataPage_common_Data_Holder__ScanData_NO_Peaks_Data_Root({responseData, requestParams });

                    resolve(holder);

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return promise;
    }
}


/**
 *
 */
const _populate_DataPage_common_Data_Holder__ScanData_NO_Peaks_Data_Root = function (
    {
        responseData, requestParams
    } : {
        responseData: any

        requestParams: INTERNAL__SingleRequestToServer_RequestParams

    }) : CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder {

    if ( responseData.scanData === undefined || responseData.scanData === null ) {
        const msg = "( responseData.scanData === undefined || responseData.scanData === null )";
        console.warn(msg);
        throw Error(msg);
    }

    const scanData_FromServer = responseData.scanData as INTERNAL__ScanData_From_Server_Contents

    //  Validate all properties are populated, are arrays and same length

    {

        if ( scanData_FromServer.level_Array === undefined || scanData_FromServer.level_Array === null ) {
            const msg = "( scanData_FromServer.level_Array === undefined || scanData_FromServer.level_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.level_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.level_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.scanNumber_Array === undefined || scanData_FromServer.scanNumber_Array === null ) {
            const msg = "( scanData_FromServer.scanNumber_Array === undefined || scanData_FromServer.scanNumber_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.scanNumber_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.scanNumber_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.retentionTime_InSeconds_Array === undefined || scanData_FromServer.retentionTime_InSeconds_Array === null ) {
            const msg = "( scanData_FromServer.retentionTime_InSeconds_Array === undefined || scanData_FromServer.retentionTime_InSeconds_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.retentionTime_InSeconds_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.retentionTime_InSeconds_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.totalIonCurrent_ForScan_Array === undefined || scanData_FromServer.totalIonCurrent_ForScan_Array === null ) {
            const msg = "( scanData_FromServer.totalIonCurrent_ForScan_Array === undefined || scanData_FromServer.totalIonCurrent_ForScan_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.totalIonCurrent_ForScan_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.totalIonCurrent_ForScan_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.ionInjectionTime_InMilliseconds_Array === undefined || scanData_FromServer.ionInjectionTime_InMilliseconds_Array === null ) {
            const msg = "( scanData_FromServer.ionInjectionTime_InMilliseconds_Array === undefined || scanData_FromServer.ionInjectionTime_InMilliseconds_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.ionInjectionTime_InMilliseconds_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.ionInjectionTime_InMilliseconds_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.parentScanNumber_Array === undefined || scanData_FromServer.parentScanNumber_Array === null ) {
            const msg = "( scanData_FromServer.parentScanNumber_Array === undefined || scanData_FromServer.parentScanNumber_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.parentScanNumber_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.parentScanNumber_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.precursorCharge_Array === undefined || scanData_FromServer.precursorCharge_Array === null ) {
            const msg = "( scanData_FromServer.precursorCharge_Array === undefined || scanData_FromServer.precursorCharge_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.precursorCharge_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.precursorCharge_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( scanData_FromServer.precursor_M_Over_Z_Array === undefined || scanData_FromServer.precursor_M_Over_Z_Array === null ) {
            const msg = "( scanData_FromServer.precursor_M_Over_Z_Array === undefined || scanData_FromServer.precursor_M_Over_Z_Array === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( scanData_FromServer.precursor_M_Over_Z_Array instanceof Array ) ) {
            const msg = "( ! ( scanData_FromServer.precursor_M_Over_Z_Array instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( !
            ( scanData_FromServer.level_Array.length === scanData_FromServer.scanNumber_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.retentionTime_InSeconds_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.totalIonCurrent_ForScan_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.ionInjectionTime_InMilliseconds_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.parentScanNumber_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.precursorCharge_Array.length
                && scanData_FromServer.level_Array.length === scanData_FromServer.precursor_M_Over_Z_Array.length
            ) ) {
            const msg = "( scanData_FromServer arrays are NOT the same length )";
            console.warn(msg);
            throw Error(msg);
        }

    }

    const scansArray: Array<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = []

    const scanData_FromServer_ArrayLength = scanData_FromServer.level_Array.length

    for ( let scanData_FromServer_INDEX = 0; scanData_FromServer_INDEX < scanData_FromServer_ArrayLength; scanData_FromServer_INDEX++ ) {

        const scanEntry : CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber = {
            scanNumber: scanData_FromServer.scanNumber_Array[ scanData_FromServer_INDEX ],
            level: scanData_FromServer.level_Array[ scanData_FromServer_INDEX ],
            retentionTime_InSeconds: scanData_FromServer.retentionTime_InSeconds_Array[ scanData_FromServer_INDEX ],
            totalIonCurrent_ForScan: scanData_FromServer.totalIonCurrent_ForScan_Array[ scanData_FromServer_INDEX ], // Element entries can be null

            /**
             * Not Populated when Data file is version < 5 since not stored in those data files
             */
            ionInjectionTime_InMilliseconds: scanData_FromServer.ionInjectionTime_InMilliseconds_Array[ scanData_FromServer_INDEX ], // In Milliseconds // Element entries can be null

            //  Only applicable where level > 1

            parentScanNumber: scanData_FromServer.parentScanNumber_Array[ scanData_FromServer_INDEX ], // Element entries can be null
            precursorCharge: scanData_FromServer.precursorCharge_Array[ scanData_FromServer_INDEX ], // Element entries can be null
            precursor_M_Over_Z: scanData_FromServer.precursor_M_Over_Z_Array[ scanData_FromServer_INDEX ] // Element entries can be null
        };

        if ( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null ) {
            const msg = "( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanEntry.scanNumber ) ) {
            const msg = "( ! variable_is_type_number_Check( scanEntry.scanNumber ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( scanEntry.level === undefined || scanEntry.level === null ) {
            const msg = "( scanEntry.level === undefined || scanEntry.level === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanEntry.level ) ) {
            const msg = "( ! variable_is_type_number_Check( scanEntry.level ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null ) {
            const msg = "( scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) ) {
            const msg = "( ! variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) )";
            console.warn(msg);
            throw Error(msg);
        }
        //  Optional values
        if ( scanEntry.totalIonCurrent_ForScan !== undefined && scanEntry.totalIonCurrent_ForScan !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.ionInjectionTime_InMilliseconds !== undefined && scanEntry.ionInjectionTime_InMilliseconds !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.ionInjectionTime_InMilliseconds ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.ionInjectionTime_InMilliseconds ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.parentScanNumber !== undefined && scanEntry.parentScanNumber !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.parentScanNumber ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.parentScanNumber ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.precursorCharge !== undefined && scanEntry.precursorCharge !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.precursorCharge ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.precursorCharge ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
        if ( scanEntry.precursor_M_Over_Z !== undefined && scanEntry.precursor_M_Over_Z !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }

        scansArray.push(scanEntry);
    }

    // {
    //     let scanLevel_1_Count = 0
    //     let scanLevel_2_Count = 0
    //     let scanLevel_3_Count = 0
    //
    //     for ( const scan of scansArray ) {
    //         if ( scan.level === 1 ) {
    //             scanLevel_1_Count++
    //         }
    //         if ( scan.level === 2 ) {
    //             scanLevel_2_Count++
    //         }
    //         if ( scan.level === 3 ) {
    //             scanLevel_3_Count++
    //         }
    //     }
    //
    //     console.warn( "scanLevel_1_Count: " + scanLevel_1_Count + ", scanLevel_2_Count: " + scanLevel_2_Count + ", scanLevel_3_Count: " + scanLevel_3_Count )
    // }

    const scanData = new CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_ForSingle_ProjectScanFileId_And_OPTIONAL_AllParentScans({
        projectScanFileId: requestParams.projectScanFileId,
        retrieved_ALL_Scans_ForFile: requestParams.retrieved_ALL_Scans_ForFile,
        scanNumbers_RetrievedDataFor: requestParams.scanNumbers_RetrievedDataFor,
        allParentScansIncluded: requestParams.get_ParentScanData,
        scansArray
    })

    return { scanData } ;
}

/**
 *
 * @param requestParams
 * @param scanData
 * @private
 */
const _requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams = function (

    requestParams: INTERNAL__SingleRequestToServer_RequestParams, scanData: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_ForSingle_ProjectScanFileId_And_OPTIONAL_AllParentScans
) : boolean {

    if ( requestParams.retrieved_ALL_Scans_ForFile && scanData.retrieved_ALL_Scans_ForFile ) {
        return true
    }

    // Test if Only one or other is retrieved_ALL_Scans_ForFile
    if ( requestParams.retrieved_ALL_Scans_ForFile && ( ! scanData.retrieved_ALL_Scans_ForFile ) ) {
        return false
    }
    if ( ( ! requestParams.retrieved_ALL_Scans_ForFile ) && ( scanData.retrieved_ALL_Scans_ForFile ) ) {
        return false
    }

    //  Compare scanNumbers_RetrievedDataFor

    if ( requestParams.scanNumbers_RetrievedDataFor.size !== scanData.scanNumbers_RetrievedDataFor.size ) {
        return false
    }

    for ( const scanNumber_requestParams of requestParams.scanNumbers_RetrievedDataFor ) {
        if ( ! scanData.scanNumbers_RetrievedDataFor.has( scanNumber_requestParams ) ) {
            return false
        }
    }
    for ( const scanNumber_data_Holder_Entry of scanData.scanNumbers_RetrievedDataFor ) {
        if ( ! requestParams.scanNumbers_RetrievedDataFor.has( scanNumber_data_Holder_Entry ) ) {
            return false
        }
    }

    return true
}


class INTERNAL__SingleRequestToServer_RequestParams {

    //   Keep Function above this in Sync with these values  '_requestParams_Match__INTERNAL__SingleRequestToServer_RequestParams'

    readonly projectScanFileId: number;
    readonly scanNumbers_RetrievedDataFor: ReadonlySet<number>
    readonly retrieved_ALL_Scans_ForFile: boolean
    readonly get_ParentScanData: boolean
}


class INTERNAL__SingleRequestToServer_RequestParams_AND_Promise {

    requestParams: INTERNAL__SingleRequestToServer_RequestParams
    promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>
}


class INTERNAL__ScanData_From_Server_Contents {


    level_Array: Array<number>;
    scanNumber_Array: Array<number>;
    retentionTime_InSeconds_Array: Array<number>;
    totalIonCurrent_ForScan_Array: Array<number>;

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    ionInjectionTime_InMilliseconds_Array: Array<number>;  // In Milliseconds


//  SKIP
    /**
     * Not populated if request other than peaks and scan file contains more than one unique value
     */
//    	private Byte isCentroid;

//  Only applicable where level > 1

    parentScanNumber_Array: Array<number>;
    precursorCharge_Array: Array<number>;
    precursor_M_Over_Z_Array: Array<number>;


}
