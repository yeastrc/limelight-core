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
    DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber,
    DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId
} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
import {dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData";


/**
 * TODO:  ONLY USE Going Forward:  'export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data' from 'export class CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT'
 *
 *  TODO  SOME DAY:  Rewrite all to use 'export class CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data'
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
                const promise = dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData({ projectSearchId });

                promise.catch( () => {
                    try {
                        this._promiseInProgress = null;

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise.then( (spectralStorage_NO_Peaks_Data) => {
                    try {
                        this._promiseInProgress = null;

                        data_Holder_SingleSearch.spectralStorage_NO_Peaks_Data = spectralStorage_NO_Peaks_Data;

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