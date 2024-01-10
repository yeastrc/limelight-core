/**
 * qcPage_DataFromServer_AndDerivedData_MultipleSearches.ts
 *
 * QC Page - Data From Server - and Derived Data - Multiple Searches
 *
 */

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import { QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import { QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import { QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded";
import { DataPage_common_Searches_Flags } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import { DataPage_common_Searches_Info } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import { QcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { QcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_MultipleSearches {

    private _retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params

    private _retrievalParamsSingleSearch_Map_Key_ProjectSearchId = new Map<number,QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params>();

    private _data_Holder_MultipleSearches : QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches

    private _qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded : QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded
    private _qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded: QcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded
    private _qcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded: QcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded

    constructor(
        {
            retrievalParams
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params
        }) {
        this._retrievalParams = retrievalParams;

        for ( const projectSearchId of retrievalParams.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = retrievalParams.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "retrievalParams.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Flags_SingleSearch_ForProjectSearchId = retrievalParams.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
                const msg = "retrievalParams.qcPage_Flags_MultipleSearches.get_QcPage_FlagsMultipleSearches_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = retrievalParams.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
                const msg = "retrievalParams.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_InfoMultipleSearches_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const retrievalParams_SingleSearch = new QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params({
                projectSearchId,
                searchDataLookupParamsRoot: retrievalParams.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                dataPageStateManager: retrievalParams.dataPageStateManager,
                qcPage_Flags_SingleSearch_ForProjectSearchId,
                qcPage_Searches_Info_SingleSearch_ForProjectSearchId
            });
            this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId.set(projectSearchId,retrievalParams_SingleSearch);
        }

        this._data_Holder_MultipleSearches = new QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches({ projectSearchIds: retrievalParams.projectSearchIds });

        this._qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded = new QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded();
        this._qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded = new QcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded();
        this._qcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded = new QcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded();
    }

    /**
     *
     */
    get_SearchScanFileData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches> {

        const promise = this._qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded.multipleSearches_SearchScanFileData_LoadIfNeeded({
            projectSearchIds_Override: undefined,
            retrievalParams: this._retrievalParams,
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
            data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
        })

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_MultipleSearches );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_MultipleSearches );
            });
        });
    }

    /**
     *
     */
    get_ScanFileSummaryPerLevelData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches> {

        const promises : Array<Promise<any>> = []

        {
            const promise = this._qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded.multipleSearches_ScanSummaryData_LoadIfNeeded({
                retrievalParams: this._retrievalParams,
                retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
                data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.multipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                projectSearchIds_Override: undefined,
                retrievalParams: this._retrievalParams,
                retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
                data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
            })
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_MultipleSearches );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_MultipleSearches );
            });
        })
    }

    /**
     *
     */
    get_PsmStatistics_RetentionTime_M_Z_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches> {

        const promises : Array<Promise<any>> = []

        {
            const projectSearchIds_LoadScanData: Array<number> = [];

            for ( const projectSearchId of this._retrievalParams.projectSearchIds ) {
                const qcPage_Searches_Info_SingleSearch = this._retrievalParams.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
                if ( ! qcPage_Searches_Info_SingleSearch ) {
                    const msg = "this._retrievalParams.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) {
                    projectSearchIds_LoadScanData.push(projectSearchId);
                }
            }
            if ( projectSearchIds_LoadScanData.length > 0 ) {

                // Have searches that have scan data but not PSM RT or M/Z so load the scan data

                for ( const projectSearchId of projectSearchIds_LoadScanData ) {

                    const qcPage_Flags_SingleSearch = this._retrievalParams.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
                    if ( ! qcPage_Flags_SingleSearch ) {
                        const msg = "this._retrievalParams.qcPage_Flags_MultipleSearches.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if ( ! qcPage_Flags_SingleSearch.hasScanData ) {
                        const msg = "( ( ! qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) || ( ! qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull ) ) AND ( ! qcPage_Flags_SingleSearch.hasScanData ) projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                const promise_loadScanData_Overall = new Promise<void>( (resolve, reject) => {
                    try {
                        const promise_SearchScanFileData = this._qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded.multipleSearches_SearchScanFileData_LoadIfNeeded({
                            projectSearchIds_Override: projectSearchIds_LoadScanData,
                            retrievalParams: this._retrievalParams,
                            retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
                            data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
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
                                    const promise_GetScanData = this._get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData({ projectSearchIds_LoadScanData });

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

                            const promise_GetScanData = this._get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData({ projectSearchIds_LoadScanData });

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
                                    resolve()

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                        }

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promises.push(promise_loadScanData_Overall);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_MultipleSearches );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches>( (resolve, reject) => {
            try {
                promiseAll.catch( reason => {
                    reject( reason );
                });
                promiseAll.then( value => {
                    resolve( this._data_Holder_MultipleSearches );
                });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    private _get_PsmStatistics_RetentionTime_M_Z_Statistics_Data__GetScanData(
        {
            projectSearchIds_LoadScanData
        } : {
            projectSearchIds_LoadScanData: Array<number>
        }
    ) : Promise<void> {

        return this._qcPage_DataFromServer_MultipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.multipleSearches_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
            projectSearchIds_Override: projectSearchIds_LoadScanData,
            retrievalParams: this._retrievalParams,
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
            data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
        })
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params {

    projectSearchIds: Array<number>
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager: DataPageStateManager

    qcPage_Flags_MultipleSearches: DataPage_common_Searches_Flags
    qcPage_Searches_Info_MultipleSearches:  DataPage_common_Searches_Info

    /**
     *
     */
    constructor(
        {
            projectSearchIds, searchDataLookupParamsRoot, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, dataPageStateManager,
            qcPage_Flags_MultipleSearches, qcPage_Searches_Info_MultipleSearches
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            dataPageStateManager: DataPageStateManager
            qcPage_Flags_MultipleSearches: DataPage_common_Searches_Flags
            qcPage_Searches_Info_MultipleSearches:  DataPage_common_Searches_Info
        }) {
        this.projectSearchIds = projectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;
        this.dataPageStateManager = dataPageStateManager;
        this.qcPage_Flags_MultipleSearches = qcPage_Flags_MultipleSearches;
        this.qcPage_Searches_Info_MultipleSearches = qcPage_Searches_Info_MultipleSearches;
    }
}
