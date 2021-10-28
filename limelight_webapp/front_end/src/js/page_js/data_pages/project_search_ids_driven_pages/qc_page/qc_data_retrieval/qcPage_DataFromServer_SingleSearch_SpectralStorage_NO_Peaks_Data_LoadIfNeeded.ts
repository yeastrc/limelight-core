/**
 * qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Spectral Storage Data - NO Scan Peaks - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";


/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded {

    private _promiseInProgress : Promise<void>

    /**
     * @returns null if no promise needed
     */
    singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded(
        {
            retrievalParams, data_Holder_SingleSearch
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.spectralStorage_NO_Peaks_Data ) {
            //  Data already loaded so return null
            return null
        }

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const projectSearchId = retrievalParams.projectSearchId;

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/spectral-storage-data--no-peaks--single-project-search-id";

                const requestData = { projectSearchId };

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        this._promiseInProgress = null;

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        this._promiseInProgress = null;

                        _populateHolder({ responseData, data_Holder_SingleSearch });

                        resolve();

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

        return this._promiseInProgress;
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        responseData, data_Holder_SingleSearch
    } : {
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    const spectralStorage_NO_Peaks_Data = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root();

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

            const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId =
                new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId({ searchScanFileId });
            spectralStorage_NO_Peaks_Data.add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId);

            const scanLevels_Set : Set<number> = new Set()
            const scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanLevels( scanLevels_Set );
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanCount_Map_Key_ScanLevel( scanCount_Map_Key_ScanLevel );

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

                qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.add_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanEntry);

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
    
    data_Holder_SingleSearch.spectralStorage_NO_Peaks_Data = spectralStorage_NO_Peaks_Data;
}