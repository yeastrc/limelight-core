/**
 * qcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Multiple Searches - Search Scan File Data - Load if Needed
 *
 */

import {QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_MultipleSearches";
import {QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import {QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";

/**
 *
 */
export class QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>
    
    private _singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded> = new Map();

    /**
     * @returns null if no promise needed
     */
    multipleSearches_SearchScanFileData_LoadIfNeeded(
        {
            projectSearchIds_Override,
            retrievalParams,
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
            data_Holder_MultipleSearches
        } : {
            projectSearchIds_Override: Array<number>
            retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params>
            data_Holder_MultipleSearches : QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches
        }
    ) : Promise<void> {

        if ( this._promiseInProgress && ( ! projectSearchIds_Override ) ) {
            return this._promiseInProgress;
        }

        let projectSearchIds = retrievalParams.projectSearchIds;

        if ( projectSearchIds_Override ) {
            projectSearchIds = projectSearchIds_Override;
        }

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of projectSearchIds ) {

            let singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId ) {
                singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = new QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded();
                this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.set(projectSearchId, singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId);
            }

            const data_Holder_SingleSearch = data_Holder_MultipleSearches.get_Holder_For_projectSearchId({ projectSearchId });
            if ( ! data_Holder_SingleSearch ) {
                const msg = "data_Holder_MultipleSearches.get_Holder_For_projectSearchId({ projectSearchId }); returned NOTHING. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const retrievalParamsSingleSearch = retrievalParamsSingleSearch_Map_Key_ProjectSearchId.get(projectSearchId );
            if ( ! retrievalParamsSingleSearch ) {
                const msg = "retrievalParamsSingleSearch_Map_Key_ProjectSearchId.get(projectSearchId ); returned NOTHING. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const promise = singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.singleSearch_SearchScanFileData_LoadIfNeeded({
                retrievalParams: retrievalParamsSingleSearch, data_Holder_SingleSearch
            });

            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve();
        }

        const promisesAll = Promise.all(promises);

        const promiseFinal = new Promise<void>( (resolve, reject) => {
            promisesAll.catch( reason => {
                this._promiseInProgress = null;
                reject( reason );
            });
            promisesAll.then( value => {
                this._promiseInProgress = null;
                resolve();
            });
        });

        if ( ! projectSearchIds_Override ) {
            this._promiseInProgress = promiseFinal;
        }

        return promiseFinal;
    }
}
