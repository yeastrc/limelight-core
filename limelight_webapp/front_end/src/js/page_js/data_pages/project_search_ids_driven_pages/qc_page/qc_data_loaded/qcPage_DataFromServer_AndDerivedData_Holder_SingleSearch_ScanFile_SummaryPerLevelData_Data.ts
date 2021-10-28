/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - Scan File Summary Per Level Data
 *
 */


/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root {

    private _scanFile_SummaryPerLevelData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId> = new Map();

    constructor() {
    }

    /**
     *
     */
    get_ScanFileData_For_SearchScanFileId(searchScanFileId: number) {
        return this._scanFile_SummaryPerLevelData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     *
     */
    get_ScanFileData_EntryCount() : number {
        return this._scanFile_SummaryPerLevelData_PerSearchScanFileId_Map_Key_SearchScanFileId.size;
    }

    /**
     *
     */
    get_ScanFileData_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId> {

        return this._scanFile_SummaryPerLevelData_PerSearchScanFileId_Map_Key_SearchScanFileId.values()
    }

    ///  Add/Set

    add_ScanFileDataFor_SingleSearchScanFileId( item : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId ) {

        this._scanFile_SummaryPerLevelData_PerSearchScanFileId_Map_Key_SearchScanFileId.set(item.searchScanFileId, item);
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId {

    readonly searchScanFileId: number;

    private _scanFile_Summary_ForScanLevel_Map_Key_ScanLevel: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel> = new Map();

    constructor(
        {
            searchScanFileId
        } : {
            searchScanFileId: number
        }
    ) {
        this.searchScanFileId = searchScanFileId;
    }

    /**
     *
     */
    get_SearchScanFileDataFor_ScanLevel(scanLevel: number) {
        return this._scanFile_Summary_ForScanLevel_Map_Key_ScanLevel.get(scanLevel);
    }

    /**
     *
     */
    get_ScanLevel_EntryCount() : number {
        return this._scanFile_Summary_ForScanLevel_Map_Key_ScanLevel.size;
    }

    /**
     *
     */
    get_ScanLevel_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel> {

        return this._scanFile_Summary_ForScanLevel_Map_Key_ScanLevel.values()
    }

    ///  Add/Set

    add_ScanLevelData_ForScanLevel( item : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel ) {

        this._scanFile_Summary_ForScanLevel_Map_Key_ScanLevel.set(item.scanLevel, item);
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel{

    /**
     * Scan level for this summary data entry
     */
    scanLevel: number;
    /**
     * number of scans with this scan level
     */
    numberOfScans: number;
    /**
     * Sum of intensity of all peaks for all scans with this scan level
     */
    totalIonCurrent: number;
}
