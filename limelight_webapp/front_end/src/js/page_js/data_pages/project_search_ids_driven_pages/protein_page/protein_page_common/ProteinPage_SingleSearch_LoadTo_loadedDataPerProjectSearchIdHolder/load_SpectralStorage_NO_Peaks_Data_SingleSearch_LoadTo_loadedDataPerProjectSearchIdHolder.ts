/**
 * load_SpectralStorage_NO_Peaks_Data_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData";

/**
 * Get SpectralStorage_NO_Peaks_Data from projectSearchId
 *
 * return null if no loading of data needed
 */
export const load_SpectralStorage_NO_Peaks_Data_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Promise<unknown> {

    if ( loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root() ) {
        //  Have loaded data

        return null; // EARLY RETURN
    }

    return new Promise<void>( (resolve, reject) => {
        try {
            const promise = dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadData({ projectSearchId });

            promise.catch( (reason) => {
                try {
                    // Catches the reject from any promise in the chain
                    reject(reason);
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });

            promise.then( ( data ) => {
                try {
                    loadedDataPerProjectSearchIdHolder.set_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root(data);
                    resolve();

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
}
