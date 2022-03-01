/**
 * qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.ts
 *
 * QC Page - Data From Server - and Derived Data - Single Search  Sub Searches
 *
 */


import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch__SubSearches";
import {QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches {

    private _retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches_Constructor_Params

    private _retrievalParams_SingleSearch : QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params

    private _data_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches

    private _qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded

    private _qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded

    constructor(
        {
            retrievalParams
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches_Constructor_Params
        }) {

        this._retrievalParams = retrievalParams;

        this._retrievalParams_SingleSearch = new QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params({

            projectSearchId: retrievalParams.projectSearchId,
            searchDataLookupParamsRoot: retrievalParams.searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: retrievalParams.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager: retrievalParams.dataPageStateManager,

            qcPage_Flags_SingleSearch_ForProjectSearchId: retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId,
            qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  retrievalParams.qcPage_Searches_Info_SingleSearch_ForProjectSearchId
        })

        this._data_Holder_SingleSearch__SubSearches = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches();

        this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded();
    }

    /**
     *
     */
    get_SearchScanFileData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches> {

        const promise = this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.singleSearch_SearchScanFileData_LoadIfNeeded({
            retrievalParams: this._retrievalParams_SingleSearch, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch__SubSearches );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch__SubSearches );
            });
        });
    }

    /**
     *
     */
    get_ScanFileSummaryPerLevelData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches> {

        const promises : Array<Promise<any>> = []

        {
            const promise = this._qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded.singleSearch__SubSearches_ScanSummaryData_LoadIfNeeded({
                retrievalParams: this._retrievalParams,
                retrievalParams_SingleSearch: this._retrievalParams_SingleSearch,
                data_Holder_SingleSearch__SubSearches: this._data_Holder_SingleSearch__SubSearches
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
            });
            if ( promise ) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch__SubSearches );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch__SubSearches );
            });
        })
    }

    /**
     *
     */
    get_PsmStatistics_RetentionTime_M_Z_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches> {

        const promises : Array<Promise<any>> = []

        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const qcPage_Searches_Info_SingleSearch = this._retrievalParams.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
            if ( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) {

                //  Load Data

                if ( ! this._retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
                    const msg = "( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) AND ( ! qcPage_Flags_SingleSearch.hasScanData ) ";
                    console.warn(msg);
                    throw Error(msg);
                }
                const promise_loadScanData_Overall = new Promise<void>( (resolve, reject) => {
                    try {

                        const promise_SearchScanFileData = this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.singleSearch_SearchScanFileData_LoadIfNeeded({
                            retrievalParams: this._retrievalParams_SingleSearch, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
                        });

                        if ( promise_SearchScanFileData ) {

                            promise_SearchScanFileData.catch( reason => {
                                try {
                                    reject(reason);

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });

                            promise_SearchScanFileData.then( result => {
                                try {
                                    const promise_GetScanData = this._get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData();

                                    promise_GetScanData.catch( reason => {
                                        try {
                                            reject(reason);

                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    });

                                    promise_GetScanData.then( result => {
                                        try {
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
                        } else {

                            const promise_GetScanData = this._get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData();

                            if ( promise_GetScanData ) {

                                promise_GetScanData.catch( reason => {
                                    try {
                                        reject(reason);

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise_GetScanData.then( result => {
                                    try {
                                        resolve();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                            } else {

                                //  No Promise in promise_GetScanData so resolve parent Promise

                                resolve();
                            }
                        }

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promises.push(promise_loadScanData_Overall);
            }

            if ( promises.length === 0 ) {
                //  No wait so immediately return resolved promise
                return Promise.resolve( this._data_Holder_SingleSearch__SubSearches );
            }

            const promiseAll = Promise.all(promises );

            return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches>( (resolve, reject) => {
                try {
                    promiseAll.catch( reason => {
                        reject( reason );
                    });
                    promiseAll.then( value => {
                        resolve( this._data_Holder_SingleSearch__SubSearches );
                    });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }

    }

    /**
     *
     */
    private _get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData() : Promise<void> {

        return this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
            retrievalParams: this._retrievalParams_SingleSearch,
            data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
        })
    }

    //////////////

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_ChargeStateStatistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches> {

        const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch__SubSearches );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch__SubSearches );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_Psm_PPM_Error_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches> {

        const promise = this._qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded.singleSearch_Psm_PPM_Error_Data_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch__SubSearches );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch__SubSearches );
            });
        })
    }

}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches_Constructor_Params {

    projectSearchId: number
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    dataPageStateManager: DataPageStateManager

    qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch                   //  Same as for Single Search
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch  //  Same as for Single Search

    /**
     *
     */
    constructor(
        {
            projectSearchId, searchDataLookupParamsRoot, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId, dataPageStateManager,
            qcPage_Flags_SingleSearch_ForProjectSearchId, qcPage_Searches_Info_SingleSearch_ForProjectSearchId
        } : {
            projectSearchId: number
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            dataPageStateManager: DataPageStateManager
            qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
            qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch
        }) {
        this.projectSearchId = projectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
        this.dataPageStateManager = dataPageStateManager;
        this.qcPage_Flags_SingleSearch_ForProjectSearchId = qcPage_Flags_SingleSearch_ForProjectSearchId;
        this.qcPage_Searches_Info_SingleSearch_ForProjectSearchId = qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
    }
}
