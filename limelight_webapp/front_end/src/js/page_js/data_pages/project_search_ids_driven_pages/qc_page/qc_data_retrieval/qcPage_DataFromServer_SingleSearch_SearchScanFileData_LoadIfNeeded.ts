/**
 * qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Search Scan File Data - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData";

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>

    /**
     * @returns null if no promise needed
     */
    singleSearch_SearchScanFileData_LoadIfNeeded(
        {
            retrievalParams, data_Holder_SingleSearch
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.searchScanFileData ) {
            //  Data already loaded so return null
            return null
        }

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const projectSearchId = retrievalParams.projectSearchId;




        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            try {
                const promise = dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData({ projectSearchIds: [ projectSearchId ] });

                promise.catch( reason => {
                    try {
                        this._promiseInProgress = null;
                        reject(reason);

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise.then( searchScanFileData => {
                    try {
                        this._promiseInProgress = null;

                        data_Holder_SingleSearch.searchScanFileData = searchScanFileData.get_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_For_ProjectSearchId(projectSearchId);

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    };
                });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

        return this._promiseInProgress;
    }
}
