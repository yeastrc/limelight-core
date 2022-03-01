/**
 * commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data.ts
 *
 * For Single Project Search  -  SpectralStorage_NO_Peaks_Data
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId{

    readonly searchScanFileId: number;
    private _singleScanEntry_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> = new Map();

    private _scanLevels: Set<number> = new Set()
    private _scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

    constructor(
        {
            searchScanFileId
        }: {
            searchScanFileId: number
        }
    ) {
        this.searchScanFileId = searchScanFileId;
    }

    get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanNumber: number) {
        return this._singleScanEntry_Map_Key_ScanNumber.get(scanNumber);
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator(): IterableIterator<CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> {

        return this._singleScanEntry_Map_Key_ScanNumber.values()
    }

    /**
     *
     */
    get_scanLevels_Set() : Set<number> {
        return this._scanLevels;
    }

    /**
     * @returns undefined if scanLevel not found
     */
    get_ScanCount_ForScanLevel( scanLevel: number ) : number {
        return this._scanCount_Map_Key_ScanLevel.get( scanLevel );
    }

    ///  Add/Set

    add_SpectralStorage_NO_Peaks_DataFor_ScanNumber( item : CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber ) {

        this._singleScanEntry_Map_Key_ScanNumber.set( item.scanNumber, item );
    }

    set_scanLevels( scanLevels: Set<number> ) : void {
        this._scanLevels = scanLevels;
    }
    set_scanCount_Map_Key_ScanLevel( scanCount_Map_Key_ScanLevel: Map<number,number> ) : void {
        this._scanCount_Map_Key_ScanLevel = scanCount_Map_Key_ScanLevel;
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber {

    readonly scanNumber: number;
    readonly level: number;
    readonly retentionTime_InSeconds: number;
    readonly totalIonCurrent_ForScan: number; // Can be null

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    readonly ionInjectionTime_InMilliseconds: number;  // In Milliseconds // Can be null

    //  Only applicable where level > 1

    readonly parentScanNumber: number; // Can be null
    readonly precursorCharge: number; // Can be null
    readonly precursor_M_Over_Z: number; // Can be null
}


/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder {

    private _spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId>

    constructor(
        {
            spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId
        } : {
            spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId>
        }
    ) {
        this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId = spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId;
    }

    /**
     *
     * @param searchScanFileId
     */
    get_SpectralStorage_NO_Peaks_Data_For_SearchScanFileId( searchScanFileId: number ) {
        return this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult {

    spectralStorage_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult

    private _promise_LoadSpectralStorage_NO_Peaks_Data_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult>

    /**
     *
     * @param projectSearchId
     */
    private constructor(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        this._projectSearchId = projectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult> {
        try {
            const result = this.get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch();

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch (e) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }


    /**
     * Get all for search for main filters
     */
    get_SpectralStorage_NO_Peaks_DataHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult>
        } {

        if (this._get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult,
                promise: undefined
            };
        }

        if (this._promise_LoadSpectralStorage_NO_Peaks_Data_Data_InProgress) {

            return {data: undefined, promise: this._promise_LoadSpectralStorage_NO_Peaks_Data_Data_InProgress};
        }

        this._promise_LoadSpectralStorage_NO_Peaks_Data_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data__get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult>(
            (resolve, reject) => { try {
                const requestObject = {
                    projectSearchId: this._projectSearchId
                };

                const url = "d/rws/for-page/psb/spectral-storage-data--no-peaks--single-project-search-id";

                console.log("START: getting data from URL: " + url);

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch(() => {
                    reject()
                });

                promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {
                    console.log("END: REJECTED: getting data from URL: " + url);

                    this._process_WebserviceResponse({responseData});

                    resolve(this._get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult);

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {data: undefined, promise: this._promise_LoadSpectralStorage_NO_Peaks_Data_Data_InProgress};
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({responseData}: { responseData: any }): void {

        const spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId> = new Map();

        if (responseData.scanFileEntries) {
            if (!(responseData.scanFileEntries instanceof Array)) {
                const msg = "( ! ( responseData.scanFileEntries instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }
            for (const scanFileEntry of responseData.scanFileEntries) {
                if (scanFileEntry.searchScanFileId === undefined || scanFileEntry.searchScanFileId === null) {
                    const msg = "( scanFileEntry.searchScanFileId === undefined || scanFileEntry.searchScanFileId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if (!variable_is_type_number_Check(scanFileEntry.searchScanFileId)) {
                    const msg = "( ! variable_is_type_number_Check( scanFileEntry.searchScanFileId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if (scanFileEntry.scanEntries === undefined || scanFileEntry.scanEntries === null) {
                    const msg = "( scanFileEntry.scanEntries === undefined || scanFileEntry.scanEntries === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if (!(scanFileEntry.scanEntries instanceof Array)) {
                    const msg = "( ! ( scanFileEntry.scanEntries instanceof Array ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                const searchScanFileId = scanFileEntry.searchScanFileId;

                const dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId =
                    new CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId({searchScanFileId});
                spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.set(searchScanFileId, dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId);

                const scanLevels_Set: Set<number> = new Set()
                const scanCount_Map_Key_ScanLevel: Map<number, number> = new Map();

                dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanLevels(scanLevels_Set);
                dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanCount_Map_Key_ScanLevel(scanCount_Map_Key_ScanLevel);

                for (const scanEntryFromArray of scanFileEntry.scanEntries) {

                    const scanEntry: CommonData_LoadedFromServer_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber = scanEntryFromArray;

                    if (scanEntry.scanNumber === undefined || scanEntry.scanNumber === null) {
                        const msg = "( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (!variable_is_type_number_Check(scanEntry.scanNumber)) {
                        const msg = "( ! variable_is_type_number_Check( scanEntry.scanNumber ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (scanEntry.level === undefined || scanEntry.level === null) {
                        const msg = "( scanEntry.level === undefined || scanEntry.level === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (!variable_is_type_number_Check(scanEntry.level)) {
                        const msg = "( ! variable_is_type_number_Check( scanEntry.level ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null) {
                        const msg = "( scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    if (!variable_is_type_number_Check(scanEntry.retentionTime_InSeconds)) {
                        const msg = "( ! variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    //  Optional values
                    if (scanEntry.totalIonCurrent_ForScan !== undefined && scanEntry.totalIonCurrent_ForScan !== null) {
                        if (!variable_is_type_number_Check(scanEntry.totalIonCurrent_ForScan)) {
                            const msg = "( ! variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if (scanEntry.ionInjectionTime_InMilliseconds !== undefined && scanEntry.ionInjectionTime_InMilliseconds !== null) {
                        if (!variable_is_type_number_Check(scanEntry.ionInjectionTime_InMilliseconds)) {
                            const msg = "( ! variable_is_type_number_Check( scanEntry.ionInjectionTime_InMilliseconds ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if (scanEntry.parentScanNumber !== undefined && scanEntry.parentScanNumber !== null) {
                        if (!variable_is_type_number_Check(scanEntry.parentScanNumber)) {
                            const msg = "( ! variable_is_type_number_Check( scanEntry.parentScanNumber ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if (scanEntry.precursorCharge !== undefined && scanEntry.precursorCharge !== null) {
                        if (!variable_is_type_number_Check(scanEntry.precursorCharge)) {
                            const msg = "( ! variable_is_type_number_Check( scanEntry.precursorCharge ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }
                    if (scanEntry.precursor_M_Over_Z !== undefined && scanEntry.precursor_M_Over_Z !== null) {
                        if (!variable_is_type_number_Check(scanEntry.precursor_M_Over_Z)) {
                            const msg = "( ! variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }

                    dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.add_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanEntry);

                    scanLevels_Set.add(scanEntry.level);
                    {
                        const scanCount = scanCount_Map_Key_ScanLevel.get(scanEntry.level);
                        if (!scanCount) {
                            scanCount_Map_Key_ScanLevel.set(scanEntry.level, 1);
                        } else {
                            scanCount_Map_Key_ScanLevel.set(scanEntry.level, scanCount + 1);
                        }
                    }
                }
            }
        }

        const spectralStorage_NO_Peaks_Data_Holder = new CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data_Holder({spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId});

        this._get_SpectralStorage_NO_Peaks_DataHolder__FunctionResult = {
            spectralStorage_NO_Peaks_Data_Holder
        }
    }
}