/**
 * dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData.ts
 *
 * Common Data - Data From Server - Single Search - Spectral Storage Data - NO Scan Peaks - Load Data
 *
 */

import {
    DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root,
    DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * Common Data - Data From Server - Single Search - Spectral Storage Data - NO Scan Peaks - Load Data
 *
 * @param projectSearchId
 */
export const dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData = function(
    {
        projectSearchId
    } : {
        projectSearchId: number
    }
) : Promise<DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root> {

    const promise = new Promise<DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root> ( (resolve, reject) => {
        try {

            const url = "d/rws/for-page/psb/spectral-storage-data--no-peaks--single-project-search-id";

            console.log( "START: getting data from URL: " + url );

            const requestData = { projectSearchId };

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
    }) : DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root {

    const spectralStorage_NO_Peaks_Data = new DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root();

    if ( responseData.scanFileEntries ) {
        if ( ! ( responseData.scanFileEntries instanceof Array ) ) {
            const msg = "( ! ( responseData.scanFileEntries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const scanFileEntry of responseData.scanFileEntries ) {
            if ( scanFileEntry.searchScanFileId === undefined || scanFileEntry.searchScanFileId === null ) {
                const msg = "( scanFileEntry.searchScanFileId === undefined || scanFileEntry.searchScanFileId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanFileEntry.searchScanFileId ) ) {
                const msg = "( ! variable_is_type_number_Check( scanFileEntry.searchScanFileId ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanFileEntry.scanEntries === undefined || scanFileEntry.scanEntries === null ) {
                const msg = "( scanFileEntry.scanEntries === undefined || scanFileEntry.scanEntries === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! ( scanFileEntry.scanEntries instanceof Array ) ) {
                const msg = "( ! ( scanFileEntry.scanEntries instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }

            const searchScanFileId = scanFileEntry.searchScanFileId;

            const dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId =
                new DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId({ searchScanFileId });
            spectralStorage_NO_Peaks_Data.add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId);

            const scanLevels_Set : Set<number> = new Set()
            const scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

            dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanLevels( scanLevels_Set );
            dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanCount_Map_Key_ScanLevel( scanCount_Map_Key_ScanLevel );

            for ( const scanEntryFromArray of scanFileEntry.scanEntries ) {

                const scanEntry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber = scanEntryFromArray;

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

                dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.add_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanEntry);

                scanLevels_Set.add( scanEntry.level );
                {
                    const scanCount = scanCount_Map_Key_ScanLevel.get(scanEntry.level);
                    if ( ! scanCount ) {
                        scanCount_Map_Key_ScanLevel.set(scanEntry.level, 1);
                    } else {
                        scanCount_Map_Key_ScanLevel.set(scanEntry.level, scanCount + 1);
                    }
                }
            }
        }
    }

    return  spectralStorage_NO_Peaks_Data;
}