/**
 * qcPage_DataFromServer_AndDerivedData_SingleSearch.ts
 *
 * QC Page - Data From Server - and Derived Data - Single Search
 *
 */

import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded";
import {QcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch{

    private _retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params

    private _data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch

    private _qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded
    private _qcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded: QcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded

    constructor(
        {
            retrievalParams
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
        }) {
        this._retrievalParams = retrievalParams;

        this._data_Holder_SingleSearch = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch();

        this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded();

        this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded();
        this._qcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded();
    }

    /**
     *
     */
    get_SearchScanFileData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.singleSearch_SearchScanFileData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        });
    }

    /**
     *
     */
    get_ScanFileSummaryPerLevelData(
        {
            searchScanFileId
        }: {
            searchScanFileId: number
        }
    ) : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promises : Array<Promise<any>> = []
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded.singleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded({
                searchScanFileId, retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     *
     */
    get_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ(
        {
            searchScanFileId
        }: {
            searchScanFileId: number
        }
    ) : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded.singleSearch_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ_LoadIfNeeded({
                searchScanFileId, retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     *
     */
    get_ScanFileStatistics_RetentionTime_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const searchData = this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId )
        if ( ! searchData ) {
            const msg = "get_ScanFileStatistics_RetentionTime_Statistics_Data(): this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId ) returned nothing for this._retrievalParams.projectSearchId: " + this._retrievalParams.projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const qcPage_Flags_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId

        if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
            const msg = "get_ScanFileStatistics_RetentionTime_Statistics_Data(): ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) for this._retrievalParams.projectSearchId: " + this._retrievalParams.projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises : Array<Promise<any>> = []
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     *
     */
    get_ScanFileMS1_RetentionTime_VS_M_Z_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promises : Array<Promise<any>> = []
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if ( promise ) {
                promises.push(promise);
            }
        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if ( promise ) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * Load Filtered
     */
    get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ) : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_LoadIfNeeded.singleSearch_PsmFilterableAnnotationData_LoadIfNeeded({
            psmFilterableAnnotationTypeIds_Requested, retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmData_Only_PsmTblData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_PerScore_Statistics_PsmTblData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_ChargeStateStatistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_M_Z_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const searchData = this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId )
        if ( ! searchData ) {
            const msg = "get_PsmStatistics_M_Z_Statistics_Data(): this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId ) returned nothing for this._retrievalParams.projectSearchId: " + this._retrievalParams.projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises : Array<Promise<any>> = []

        const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
        const qcPage_Flags_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId

        if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull || qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }
        if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_RetentionTime_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const searchData = this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId )
        if ( ! searchData ) {
            const msg = "get_PsmStatistics_M_Z_Statistics_Data(): this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId ) returned nothing for this._retrievalParams.projectSearchId: " + this._retrievalParams.projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises : Array<Promise<any>> = []

        const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
        const qcPage_Flags_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId

        {
            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }
        if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) {
            if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
                const msg = "( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) AND ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ";
                console.warn(msg);
                throw Error(msg);
            }
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

    /**
     * @returns null if no promise needed
     */
    get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const searchData = this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId )
        if ( ! searchData ) {
            const msg = "get_PsmStatistics_M_Z_Statistics_Data(): this._retrievalParams.dataPageStateManager.get_searchNames_AsMap().get( this._retrievalParams.projectSearchId ) returned nothing for this._retrievalParams.projectSearchId: " + this._retrievalParams.projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises : Array<Promise<any>> = []

        const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
        const qcPage_Flags_SingleSearch_ForProjectSearchId = this._retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId

        if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull || qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

            const promise = this._qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.singleSearch_PsmTblData_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }
        if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {
            const promise = this._qcPage_DataFromServer_SingleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded.singleSearch_SpectralStorage_NO_Peaks_Data_LoadIfNeeded({
                retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
            });
            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        const promiseAll = Promise.all(promises );

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promiseAll.catch( reason => {
                reject( reason );
            });
            promiseAll.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }


    /**
     * @returns null if no promise needed
     */
    get_Psm_PPM_Error_Statistics_Data() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_Psm_PPM_Error_Data_LoadIfNeeded.singleSearch_Psm_PPM_Error_Data_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        })
    }

}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params {

    projectSearchId: number
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    dataPageStateManager: DataPageStateManager

    qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch

    /**
     *
     */
    constructor(
        {
            projectSearchId, searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager,
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
