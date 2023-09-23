/**
 * commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data.ts
 *
 * Data across Project since pass in ProjectScanFileId  -  ScanData_YES_Peaks_Data
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
     * NOT Currently caching result !!!!
     *
     */
    get_ScanData_YES_Peaks_DataHolder_ReturnPromise( requestParams: INTERNAL__SingleRequestToServer_RequestParams ): Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_ScanData_YES_Peaks_DataHolder(requestParams);

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
     * NOT Currently caching result !!!!
     */
    get_ScanData_YES_Peaks_DataHolder( requestParams: INTERNAL__SingleRequestToServer_RequestParams):
        {
            data: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>
        } {

        const promise = new Promise<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data__get_ScanData_YES_Peaks_DataHolder__FunctionResult>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectScanFileId: requestParams.projectScanFileId,
                    scanNumberList: Array.from( requestParams.scanNumberList ),
                    m_over_Z_Ranges: requestParams.m_over_Z_Ranges
                };

                const url = "d/rws/for-page/psb/scan-data-with-peaks-for-scan-numbers-project-search-id-search-scan-file-id-optional-m-over-z-ranges";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch((reason) => {
                    console.log("END: REJECTED: getting data from URL: " + url);
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

                    const holder: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data_Holder = {
                        scanData: scanData
                    }

                    resolve({ scanData_YES_Peaks_Data_Holder: holder } );

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { data: undefined, promise };
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
        if ( scanEntry.retentionTime === undefined || scanEntry.retentionTime === null ) {
            const msg = "( scanEntry.retentionTime === undefined || scanEntry.retentionTime === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanEntry.retentionTime ) ) {
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
        if ( scanEntry.ionInjectionTime !== undefined && scanEntry.ionInjectionTime !== null ) {
            if ( ! variable_is_type_number_Check( scanEntry.ionInjectionTime ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.ionInjectionTime ) )";
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

        if ( scanEntry.peaks ) {
            if ( ! ( scanEntry.peaks instanceof Array ) ) {
                throw Error("( ! ( scanEntry.peaks instanceof Array ) )")
            }
        }

        for ( const peak of scanEntry.peaks ) {
            if ( peak.intensity === undefined || peak.intensity === null ) {
                const msg = "( peak.intensity === undefined || peak.intensity === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( peak.intensity ) ) {
                const msg = "( ! variable_is_type_number_Check( peak.intensity ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( peak.mz === undefined || peak.mz === null ) {
                const msg = "( peak.mz === undefined || peak.mz === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( peak.mz ) ) {
                const msg = "( ! variable_is_type_number_Check( peak.mz ) )";
                console.warn(msg);
                throw Error(msg);
            }
        }
    }
}


class INTERNAL__SingleRequestToServer_RequestParams {

    projectScanFileId: number;
    scanNumberList: Array<number>
    m_over_Z_Ranges: Array<{
        m_over_Z_Range_Min: number;
        m_over_Z_Range_Max: number;
    }>;
}
