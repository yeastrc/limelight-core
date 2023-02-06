/**
 * dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - Spectral Storage Data - NO Scan Peaks
 *
 */


/////////////////

////  Spectral Storage Data - NO Scan Peaks

/**
 *
 */
export class DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root {

    private _spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId> = new Map();
    private _spectralStorageData_PerSearchScanFileId_Map_Key_ProjectScanFileId: Map<number, DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId> = new Map();

    constructor() {
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(searchScanFileId: number) {
        return this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataFor_ProjectScanFileId(projectScanFileId: number) {
        return this._spectralStorageData_PerSearchScanFileId_Map_Key_ProjectScanFileId.get(projectScanFileId);
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator(): IterableIterator<DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId> {

        return this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.values()
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataEntries_Key_ProjectScanFileId_IterableIterator(): IterableIterator<DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId> {

        return this._spectralStorageData_PerSearchScanFileId_Map_Key_ProjectScanFileId.values()
    }

    ///  Add/Set

    add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( item : DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId ) {

        this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.set( item.searchScanFileId, item );
        this._spectralStorageData_PerSearchScanFileId_Map_Key_ProjectScanFileId.set( item.projectScanFileId, item );
    }
}

/**
 *
 */
export class DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId{

    readonly searchScanFileId: number;
    readonly projectScanFileId: number;

    private _singleScanEntry_Map_Key_ScanNumber: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> = new Map();

    private _scanLevels: Set<number> = new Set()
    private _scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

    constructor(
        {
            searchScanFileId, projectScanFileId
        }: {
            searchScanFileId: number
            projectScanFileId: number
        }
    ) {
        this.searchScanFileId = searchScanFileId;
        this.projectScanFileId = projectScanFileId;
    }

    get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanNumber: number) {
        return this._singleScanEntry_Map_Key_ScanNumber.get(scanNumber);
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber> {

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

    add_SpectralStorage_NO_Peaks_DataFor_ScanNumber( item : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber ) {

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
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleScanNumber {

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


