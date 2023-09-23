/**
 * scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_LoadData.ts
 *
 * Scan File Browser Page - Spectral Storage Data - Single Project Id - Single Scan File Id - Single Scan Number - YES Scan Peaks - Load Data
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


/**
 *
 */
export class ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root{

    readonly singleScanData: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber

    constructor(
        {
            singleScanData
        }: {
            singleScanData: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber
        }
    ) {
        this.singleScanData = singleScanData;
    }
}

/**
 *
 */
export class ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber {

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

    readonly scanPeaksList: Array<ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak>
}

/**
 *
 */
export class ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak {

    readonly intensity: number; // float
    readonly m_over_z: number;  // double

}

/**
 * Scan File Browser Page - Spectral Storage Data - Single Project Id - Single Scan File Id - Single Scan Number - YES Scan Peaks - Load Data
 *
 * @param projectScanFileId
 * @param scanNumber
 */
export const scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_LoadData = function(
    {
        projectScanFileId, scanNumber
    } : {
        projectScanFileId: number
        scanNumber: number
    }
) : Promise<ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root> {

    const promise = new Promise<ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root> ( (resolve, reject) => {
        try {

            const url = "d/rws/for-page/psfb/scan-data-yes-peaks-for-project-scan-file-id-scan-number";

            console.log( "START: getting data from URL: " + url );

            const requestData = { projectScanFileId, scanNumber };

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                try {
                    console.log( "END: REJECTED: getting data from URL: " + url );

                    reject()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    console.log( "END: Successful: getting data from URL: " + url );

                    const result = _populate_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root({ responseData });

                    resolve( result );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            } );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return promise;
}

/**
 *
 */
const _populate_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root = function (
    {
        responseData
    } : {
        responseData: any
    }) : ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root {

    const scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root = responseData;

    if ( scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root.singleScanData === undefined || scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root.singleScanData === null ) {
        const msg = "( scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root.singleScanData === undefined || scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root.singleScanData === null )";
        console.warn(msg);
        throw Error(msg);
    }
    const singleScanData : ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber = scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root.singleScanData;

    if ( singleScanData.scanNumber === undefined || singleScanData.scanNumber === null ) {
        const msg = "( singleScanData.scanNumber === undefined || singleScanData.scanNumber === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( singleScanData.scanNumber ) ) {
        const msg = "( ! variable_is_type_number_Check( singleScanData.scanNumber ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( singleScanData.level === undefined || singleScanData.level === null ) {
        const msg = "( singleScanData.level === undefined || singleScanData.level === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( singleScanData.level ) ) {
        const msg = "( ! variable_is_type_number_Check( singleScanData.level ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( singleScanData.retentionTime_InSeconds === undefined || singleScanData.retentionTime_InSeconds === null ) {
        const msg = "( singleScanData.retentionTime_InSeconds === undefined || singleScanData.retentionTime_InSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( singleScanData.retentionTime_InSeconds ) ) {
        const msg = "( ! variable_is_type_number_Check( singleScanData.retentionTime_InSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    //  Optional values
    if ( singleScanData.totalIonCurrent_ForScan !== undefined && singleScanData.totalIonCurrent_ForScan !== null ) {
        if ( ! variable_is_type_number_Check( singleScanData.totalIonCurrent_ForScan ) ) {
            const msg = "( ! variable_is_type_number_Check( singleScanData.totalIonCurrent_ForScan ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }
    if ( singleScanData.ionInjectionTime_InMilliseconds !== undefined && singleScanData.ionInjectionTime_InMilliseconds !== null ) {
        if ( ! variable_is_type_number_Check( singleScanData.ionInjectionTime_InMilliseconds ) ) {
            const msg = "( ! variable_is_type_number_Check( singleScanData.ionInjectionTime_InMilliseconds ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }
    if ( singleScanData.parentScanNumber !== undefined && singleScanData.parentScanNumber !== null ) {
        if ( ! variable_is_type_number_Check( singleScanData.parentScanNumber ) ) {
            const msg = "( ! variable_is_type_number_Check( singleScanData.parentScanNumber ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }
    if ( singleScanData.precursorCharge !== undefined && singleScanData.precursorCharge !== null ) {
        if ( ! variable_is_type_number_Check( singleScanData.precursorCharge ) ) {
            const msg = "( ! variable_is_type_number_Check( singleScanData.precursorCharge ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }
    if ( singleScanData.precursor_M_Over_Z !== undefined && singleScanData.precursor_M_Over_Z !== null ) {
        if ( ! variable_is_type_number_Check( singleScanData.precursor_M_Over_Z ) ) {
            const msg = "( ! variable_is_type_number_Check( singleScanData.precursor_M_Over_Z ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }

    if ( singleScanData.scanPeaksList === undefined || singleScanData.scanPeaksList === null ) {
        const msg = "( singleScanData.scanPeaksList === undefined || singleScanData.scanPeaksList === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! ( singleScanData.scanPeaksList instanceof Array ) ) {
        const msg = "( ! ( singleScanData.scanPeaksList instanceof Array ) )";
        console.warn(msg);
        throw Error(msg);
    }

    for ( const scanPeak of singleScanData.scanPeaksList ) {

        if ( scanPeak.intensity === undefined || scanPeak.intensity === null ) {
            const msg = "( scanPeak.intensity === undefined || scanPeak.intensity === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanPeak.intensity ) ) {
            const msg = "( ! variable_is_type_number_Check( scanPeak.intensity ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( scanPeak.m_over_z === undefined || scanPeak.m_over_z === null ) {
            const msg = "( scanPeak.m_over_z === undefined || scanPeak.m_over_z === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( scanPeak.m_over_z ) ) {
            const msg = "( ! variable_is_type_number_Check( scanPeak.m_over_z ) )";
            console.warn(msg);
            throw Error(msg);
        }
    }

    return  scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_Root;
}