/**
 * qcPage_DataFromServer_MultipleSearches_PsmTblData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Multiple Searches - Psm Tbl Data - Load if Needed
 *
 */

import {QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_MultipleSearches";
import {QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded";

/**
 *
 */
export class QcPage_DataFromServer_MultipleSearches_PsmTblData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>
    
    private _singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded> = new Map();

    /**
     * @returns null if no promise needed
     */
    multipleSearches_PsmTblData_LoadIfNeeded(
        {
            retrievalParams,
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
            data_Holder_MultipleSearches
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params>
            data_Holder_MultipleSearches : QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches
        }
    ) : Promise<void> {

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of retrievalParams.projectSearchIds ) {

            let singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId ) {
                singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = new QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded();
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

            const promise = singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.singleSearch_PsmTblData_LoadIfNeeded({
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

        const promise = Promise.all(promises);

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            promise.catch( reason => {
                this._promiseInProgress = null;
                reject( reason );
            });
            promise.then( value => {
                this._promiseInProgress = null;
                resolve();
            });
        });

        return this._promiseInProgress;
    }
}
