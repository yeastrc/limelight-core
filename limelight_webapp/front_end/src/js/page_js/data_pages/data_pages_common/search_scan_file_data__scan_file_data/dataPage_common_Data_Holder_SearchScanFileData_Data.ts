/**
 * dataPage_common_Data_Holder_SearchScanFileData_Data.ts
 *
 * Common Data - Data Loaded - From Server - Search Scan File Data
 *
 */


/////////////////

////  Search Scan File Data

/**
 * for all searches
 */
export class DataPage_common_Data_Holder_Holder_SearchScanFileData_Root {

    private _searchScanFileData_PerSearch_Map_Key_ProjectSearchId: Map<number, DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData> = new Map();

    constructor() {
    }

    /**
     *
     */
    get_total_SearchScanFileCount() : number {

        let total_SearchScanFileCount = 0;

        for ( const searchScanFileData_PerSearch of this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values() ) {
            total_SearchScanFileCount += searchScanFileData_PerSearch.get_SearchScanFileData_EntryCount();
        }

        return total_SearchScanFileCount;
    }

    /**
     *
     */
    get_All_SearchScanFileIds() : Set<number> {

        const all_SearchScanFileIds : Set<number> = new Set()

        for ( const searchScanFileData_PerSearch of this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values() ) {
            for ( const searchScanFileData_Entry of searchScanFileData_PerSearch.get_SearchScanFileData_IterableIterator() ) {
                all_SearchScanFileIds.add( searchScanFileData_Entry.searchScanFileId )
            }
        }

        return all_SearchScanFileIds;
    }

    /**
     *
     * @param projectSearchId
     */
    get_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_For_ProjectSearchId( projectSearchId: number ) : DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData {
        return this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    /**
     *
     */
    get_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_IterableIterator(): IterableIterator<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData> {
        return this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values();
    }

    /**
     *
     * @param dataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData
     */
    insert_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData(
        dataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData
    ) : void {

        this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.set( dataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData.projectSearchId, dataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData );
    }

}

/**
 *
 */
export class DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData {

    readonly projectSearchId: number;
    readonly searchId: number;
    private _searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> = new Map();
    private _searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE: Array<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId>;

    constructor(
        {
            projectSearchId, searchId
        } : {
            projectSearchId: number
            searchId: number
        }
    ) {
        this.projectSearchId = projectSearchId
        this.searchId = searchId;
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
    get_SearchScanFileData_IterableIterator(): IterableIterator<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> {

        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.values();
    }
    
    get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() : Array<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> {

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

    add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( item : DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId ) {

        this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.set(item.searchScanFileId, item);

        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE = undefined;  // clear in case populated
    }
}

/**
 *
 */
export class DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId{

    readonly searchScanFileId: number;
    readonly projectSearchId: number;
    readonly searchId: number;
    readonly filename: string;
    readonly scanFileId: number;  // Optional
}
