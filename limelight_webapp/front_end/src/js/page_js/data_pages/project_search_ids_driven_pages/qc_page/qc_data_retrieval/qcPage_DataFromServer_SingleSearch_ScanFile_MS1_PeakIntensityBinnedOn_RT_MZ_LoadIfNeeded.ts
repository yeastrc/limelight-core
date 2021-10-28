/**
 * qcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Scan File - Scan File MS1 Peak Intensity Binned On RT and MZ Data - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded {

    private _promiseInProgress_Map_Key_searchScanFileId : Map<number, Promise<void>> = new Map()

    /**
     * @returns null if no promise needed
     */
    singleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded(
        {
            searchScanFileId, retrievalParams, data_Holder_SingleSearch
        } : {
            searchScanFileId: number
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root
            && data_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root.get_Data_For_SearchScanFileId( searchScanFileId ) ) {
            //  Data already loaded so return null
            return null
        }

        {
            const promise = this._promiseInProgress_Map_Key_searchScanFileId.get( searchScanFileId );
            if (promise) {
                return promise;
            }
        }

        const projectSearchId = retrievalParams.projectSearchId;

        const promise = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/scan-file-peak-intensity-binned-on-rt-mz-json-from-spectral-storage-data--search-scan-file-id-single-project-search-id";

                const requestData = { projectSearchId, searchScanFileId };

                console.log( "START: getting data from URL: " + url );

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        console.log( "END: Successful: getting data from URL: " + url );

                        _populateHolder({ searchScanFileId, responseData, data_Holder_SingleSearch });

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

        this._promiseInProgress_Map_Key_searchScanFileId.set( searchScanFileId, promise );

        return promise;
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        searchScanFileId, responseData, data_Holder_SingleSearch
    } : {
        searchScanFileId: number
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    let scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root = data_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root;
    if ( ! scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root ) {
        scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_Root()
        data_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root =  scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root;
    }

    const item : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Data_ForSingle_SearchScanFileId = responseData;

    if ( item.ms1_IntensitiesBinnedSummedMap === undefined || item.ms1_IntensitiesBinnedSummedMap === null ) {
        const msg = "( item.ms1_IntensitiesBinnedSummedMap === undefined || item.ms1_IntensitiesBinnedSummedMap === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( item.jsonContents === undefined || item.jsonContents === null ) {
        const msg = "( item.jsonContents === undefined || item.jsonContents === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__IsVariableAString( item.jsonContents ) ) {
        const msg = "( ! limelight__IsVariableAString( item.jsonContents ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( item.summaryData === undefined || item.summaryData === null ) {
        const msg = "( item.summaryData === undefined || item.summaryData === null )";
        console.warn(msg);
        throw Error(msg);
    }

    //  Sub part summaryData

    const summaryData = item.summaryData;

    if ( summaryData.jsonContents === undefined || summaryData.jsonContents === null ) {
        const msg = "( summaryData.jsonContents === undefined || summaryData.jsonContents === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! limelight__IsVariableAString( summaryData.jsonContents ) ) {
        const msg = "( ! limelight__IsVariableAString( summaryData.jsonContents ) )";
        console.warn(msg);
        throw Error(msg);
    }

    if ( summaryData.binnedSummedIntensityCount === undefined || summaryData.binnedSummedIntensityCount === null ) {
        const msg = "( summaryData.binnedSummedIntensityCount === undefined || summaryData.binnedSummedIntensityCount === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.binnedSummedIntensityCount ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.binnedSummedIntensityCount ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinSizeInSeconds === undefined || summaryData.rtBinSizeInSeconds === null ) {
        const msg = "( summaryData.rtBinSizeInSeconds === undefined || summaryData.rtBinSizeInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.rtBinSizeInSeconds ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.rtBinSizeInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinMinInSeconds === undefined || summaryData.rtBinMinInSeconds === null ) {
        const msg = "( summaryData.rtBinMinInSeconds === undefined || summaryData.rtBinMinInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.rtBinMinInSeconds ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.rtBinMinInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtBinMaxInSeconds === undefined || summaryData.rtBinMaxInSeconds === null ) {
        const msg = "( summaryData.rtBinMaxInSeconds === undefined || summaryData.rtBinMaxInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.rtBinMaxInSeconds ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.rtBinMaxInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.rtMaxPossibleValueInSeconds === undefined || summaryData.rtMaxPossibleValueInSeconds === null ) {
        const msg = "( summaryData.rtMaxPossibleValueInSeconds === undefined || summaryData.rtMaxPossibleValueInSeconds === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.rtMaxPossibleValueInSeconds ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.rtMaxPossibleValueInSeconds ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinSizeInMZ === undefined || summaryData.mzBinSizeInMZ === null ) {
        const msg = "( summaryData.mzBinSizeInMZ === undefined || summaryData.mzBinSizeInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.mzBinSizeInMZ ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.mzBinSizeInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinMinInMZ === undefined || summaryData.mzBinMinInMZ === null ) {
        const msg = "( summaryData.mzBinMinInMZ === undefined || summaryData.mzBinMinInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.mzBinMinInMZ ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.mzBinMinInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzBinMaxInMZ === undefined || summaryData.mzBinMaxInMZ === null ) {
        const msg = "( summaryData.mzBinMaxInMZ === undefined || summaryData.mzBinMaxInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.mzBinMaxInMZ ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.mzBinMaxInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.mzMaxPossibleValueInMZ === undefined || summaryData.mzMaxPossibleValueInMZ === null ) {
        const msg = "( summaryData.mzMaxPossibleValueInMZ === undefined || summaryData.mzMaxPossibleValueInMZ === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.mzMaxPossibleValueInMZ ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.mzMaxPossibleValueInMZ ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.intensityBinnedMin === undefined || summaryData.intensityBinnedMin === null ) {
        const msg = "( summaryData.intensityBinnedMin === undefined || summaryData.intensityBinnedMin === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.intensityBinnedMin ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.intensityBinnedMin ) )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( summaryData.intensityBinnedMax === undefined || summaryData.intensityBinnedMax === null ) {
        const msg = "( summaryData.intensityBinnedMax === undefined || summaryData.intensityBinnedMax === null )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! variable_is_type_number_Check( summaryData.intensityBinnedMax ) ) {
        const msg = "( ! variable_is_type_number_Check( summaryData.intensityBinnedMax ) )";
        console.warn(msg);
        throw Error(msg);
    }


    data_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root.add_ScanFileDataFor_SingleSearchScanFileId({ searchScanFileId, item });

}