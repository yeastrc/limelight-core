/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - Search File Data
 *
 */


/////////////////

////  Search Scan File Data

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData_Root {

    private _searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> = new Map();
    private _searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId>

    constructor() {
    }

    /**
     *
     */
    get_SearchScanFileDataFor_SearchScanFileId(searchScanFileId: number) {
        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     *
     */
    get_SearchScanFileData_EntryCount() : number {
        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.size;
    }

    /**
     *
     */
    get_SearchScanFileData_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> {

        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.values()
    }
    
    get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() : Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> {

        if ( this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE !== undefined && this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE !== null ) {
            return this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE;
        }
        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE = [];

        for ( const item of this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.values() ) {
            this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE.push(item);
        }
        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE.sort( (a,b) => {
            return a.filename.localeCompare( b.filename );
        });

        return this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE;
    }

    ///  Add/Set

    add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( item : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId ) {

        this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.set(item.searchScanFileId, item);

        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE = undefined;  // clear in case populated
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId{

    readonly searchScanFileId: number;
    readonly searchId: number;
    readonly filename: string;
    readonly scanFileId: number;  // Optional
}
