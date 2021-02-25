/**
 * dataTable_React_INTERNAL_DataObjects.ts
 *
 * INTERNAL Classes and types for the Data Objects used in Data Table React
 */


import {
    DataTable_ColumnId,
    DataTable_DataGroupRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry,
    DataTable_RootTableDataObject,
    DataTable_UniqueId,
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_INTERNAL_Search_Utils} from "page_js/data_pages/data_table_react/dataTable_INTERNAL_Search_Utils";


// SortColumnsInfo

/**
 * Data Table - SortColumnsInfo Entry
 */
class DataTable_INTERNAL_SortColumnsInfoEntry {

    columnId : DataTable_ColumnId;
    sortDirection : string
    sortPosition : number
}

/**
 * Data Table - INTERNAL - Root Table Data Object
 *
 * !!!!!!  INTERNAL to Data Table   !!!!!!
 *
 */
class DataTable_INTERNAL_RootTableDataObject {

    private _dataTable_RootTableDataObject : DataTable_RootTableDataObject;

    private _dataTable_DataGroupRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataGroupRowEntry>
    private _dataTable_DataRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataRowEntry>

    private _dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing : Array<DataTable_INTERNAL_DataGroupRowEntry>
    private _dataTable_DataRowEntries__INTERNAL_CurrentlyShowing : Array<DataTable_INTERNAL_DataRowEntry>

    private _dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged : Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage>
    private _dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged : Array<DataTable_INTERNAL_DataRowEntries_SinglePage>

    private _totalDataRowsCount_CurrentlyShowing : number

    /**
     * MUST be true if DataTable_DataRowEntry.highlightRowWithBorderSolid or DataTable_DataRowEntry.highlightRowWithBorderSolid is true.
     * This property can be true neither of them are true to hold space for when setting them true
     */
    private _highlightingOneOrMoreRowsWithBorder : boolean = false

    constructor(
        {
            dataTable_RootTableDataObject,
            dataTable_DataGroupRowEntries__INTERNAL_All,
            dataTable_DataRowEntries__INTERNAL_All,
            highlightingOneOrMoreRowsWithBorder
        }:{
            dataTable_RootTableDataObject : DataTable_RootTableDataObject
            dataTable_DataGroupRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataGroupRowEntry>
            dataTable_DataRowEntries__INTERNAL_All : Array<DataTable_INTERNAL_DataRowEntry>
            highlightingOneOrMoreRowsWithBorder : boolean
        }) {
        this._dataTable_RootTableDataObject = dataTable_RootTableDataObject;
        this._dataTable_DataGroupRowEntries__INTERNAL_All = dataTable_DataGroupRowEntries__INTERNAL_All;
        this._dataTable_DataRowEntries__INTERNAL_All = dataTable_DataRowEntries__INTERNAL_All;
        this._highlightingOneOrMoreRowsWithBorder = highlightingOneOrMoreRowsWithBorder;

        //  Default to Single Page

        if ( dataTable_DataGroupRowEntries__INTERNAL_All ) {
            this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing = dataTable_DataGroupRowEntries__INTERNAL_All;
        }
        if ( dataTable_DataRowEntries__INTERNAL_All ) {
            this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing = dataTable_DataRowEntries__INTERNAL_All;
        }
    }

    /**
     *
     */
    shallowClone() : DataTable_INTERNAL_RootTableDataObject {

        const clone = new DataTable_INTERNAL_RootTableDataObject({
            dataTable_RootTableDataObject: this._dataTable_RootTableDataObject,
            dataTable_DataGroupRowEntries__INTERNAL_All: this._dataTable_DataGroupRowEntries__INTERNAL_All,
            dataTable_DataRowEntries__INTERNAL_All: this._dataTable_DataRowEntries__INTERNAL_All,
            highlightingOneOrMoreRowsWithBorder: this._highlightingOneOrMoreRowsWithBorder
        });
        clone._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing = this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing;
        clone._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing = this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing;
        clone._totalDataRowsCount_CurrentlyShowing = this._totalDataRowsCount_CurrentlyShowing;

        return clone;
    }

    /**
     *
     */
    getTotalDataRowsCount_ForCurrentlyShowing() : number {

        return this._totalDataRowsCount_CurrentlyShowing;
    }

    /**
     *
     */
    getPageCount() : number {

        if ( this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged ) {
            return this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged.length;
        }
        if ( this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged ) {
            return this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged.length
        }

        const msg = "getPageCount(): Neither has Value: dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged and dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged";
        console.warn(msg)
        throw Error(msg)
    }

    ////////////////

    //  Get/Set Special

    get dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing(): Array<DataTable_INTERNAL_DataGroupRowEntry> {
        return this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing;
    }

    set dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing(value: Array<DataTable_INTERNAL_DataGroupRowEntry>) {
        this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing = value;

        if ( value ) {
            this._totalDataRowsCount_CurrentlyShowing = value.length;
        }

        //  WAS:  Set Total Count to Total number of Data Rows

        // if ( value ) {
        //     let totalCount = 0;
        //     for ( const valueEntry of value ) {
        //         if ( ! valueEntry.dataTable_DataRowEntries__INTERNAL ) {
        //             throw Error("set dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing: if ( ! valueEntry.dataTable_DataRowEntries__INTERNAL )");
        //         }
        //         totalCount += valueEntry.dataTable_DataRowEntries__INTERNAL.length;
        //     }
        //     this._totalDataRowsCount_CurrentlyShowing = totalCount;
        // }
    }

    get dataTable_DataRowEntries__INTERNAL_CurrentlyShowing(): Array<DataTable_INTERNAL_DataRowEntry> {
        return this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing;
    }

    set dataTable_DataRowEntries__INTERNAL_CurrentlyShowing(value: Array<DataTable_INTERNAL_DataRowEntry>) {
        this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing = value;

        if ( value ) {
            this._totalDataRowsCount_CurrentlyShowing = value.length;
        }
    }

    //  Get/Set Not Modified

    get dataTable_RootTableDataObject(): DataTable_RootTableDataObject {
        return this._dataTable_RootTableDataObject;
    }

    set dataTable_RootTableDataObject(value: DataTable_RootTableDataObject) {
        this._dataTable_RootTableDataObject = value;
    }


    get dataTable_DataGroupRowEntries__INTERNAL_All(): Array<DataTable_INTERNAL_DataGroupRowEntry> {
        return this._dataTable_DataGroupRowEntries__INTERNAL_All;
    }

    set dataTable_DataGroupRowEntries__INTERNAL_All(value: Array<DataTable_INTERNAL_DataGroupRowEntry>) {
        this._dataTable_DataGroupRowEntries__INTERNAL_All = value;
    }

    get dataTable_DataRowEntries__INTERNAL_All(): Array<DataTable_INTERNAL_DataRowEntry> {
        return this._dataTable_DataRowEntries__INTERNAL_All;
    }

    set dataTable_DataRowEntries__INTERNAL_All(value: Array<DataTable_INTERNAL_DataRowEntry>) {
        this._dataTable_DataRowEntries__INTERNAL_All = value;
    }

    get dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged(): Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage> {
        return this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged;
    }

    set dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged(value: Array<DataTable_INTERNAL_DataGroupRowEntries_SinglePage>) {
        this._dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged = value;
    }

    get dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged(): Array<DataTable_INTERNAL_DataRowEntries_SinglePage> {
        return this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged;
    }

    set dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged(value: Array<DataTable_INTERNAL_DataRowEntries_SinglePage>) {
        this._dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged = value;
    }

    get totalDataRowsCount_CurrentlyShowing(): number {
        return this._totalDataRowsCount_CurrentlyShowing;
    }

    set totalDataRowsCount_CurrentlyShowing(value: number) {
        this._totalDataRowsCount_CurrentlyShowing = value;
    }

    get highlightingOneOrMoreRowsWithBorder(): boolean {
        return this._highlightingOneOrMoreRowsWithBorder;
    }

    set highlightingOneOrMoreRowsWithBorder(value: boolean) {
        this._highlightingOneOrMoreRowsWithBorder = value;
    }

}

/**
 *
 */
class DataTable_INTERNAL_SinglePage_Base {

    itemCount_pageStart: number
    itemCount_pageEnd: number

    constructor(
        {
            itemCount_pageStart, itemCount_pageEnd
        }:{
            itemCount_pageStart: number
            itemCount_pageEnd: number
        }) {
        this.itemCount_pageStart = itemCount_pageStart;
        this.itemCount_pageEnd = itemCount_pageEnd;
    }
}

/**
 *
 */
class DataTable_INTERNAL_DataGroupRowEntries_SinglePage extends DataTable_INTERNAL_SinglePage_Base {

    dataTable_INTERNAL_DataGroupRowEntries: Array<DataTable_INTERNAL_DataGroupRowEntry>

    constructor(
        {
            itemCount_pageStart, itemCount_pageEnd, dataTable_INTERNAL_DataGroupRowEntries
        }:{
            itemCount_pageStart: number
            itemCount_pageEnd: number
            dataTable_INTERNAL_DataGroupRowEntries: Array<DataTable_INTERNAL_DataGroupRowEntry>;
        }) {
        super({ itemCount_pageStart, itemCount_pageEnd});
        this.dataTable_INTERNAL_DataGroupRowEntries = dataTable_INTERNAL_DataGroupRowEntries;
    }
}

/**
 *
 */
class DataTable_INTERNAL_DataRowEntries_SinglePage extends DataTable_INTERNAL_SinglePage_Base {

    dataTable_INTERNAL_DataRowEntries: Array<DataTable_INTERNAL_DataRowEntry>;

    constructor(
        {
            itemCount_pageStart, itemCount_pageEnd, dataTable_INTERNAL_DataRowEntries
        }:{
            itemCount_pageStart: number
            itemCount_pageEnd: number
            dataTable_INTERNAL_DataRowEntries: Array<DataTable_INTERNAL_DataRowEntry>;
        }) {
        super({ itemCount_pageStart, itemCount_pageEnd});
        this.dataTable_INTERNAL_DataRowEntries = dataTable_INTERNAL_DataRowEntries;
    }

}

/////


/**
 * Data Table - INTERNAL - Data Group Row Object
 *
 * !!!!!!  INTERNAL to Data Table   !!!!!!
 *
 *
 */
class DataTable_INTERNAL_DataGroupRowEntry {

    shallowClone() : DataTable_INTERNAL_DataGroupRowEntry {

        const clone = new DataTable_INTERNAL_DataGroupRowEntry({
            dataTable_DataGroupRowEntry: this.dataTable_DataGroupRowEntry,
            dataTable_DataRowEntries__INTERNAL: this.dataTable_DataRowEntries__INTERNAL,
        });
        clone.uniqueId = this.uniqueId;
        clone.sortOrder_OnEquals = this.sortOrder_OnEquals;
        clone.columnEntries = this.columnEntries;

        return clone;
    }

    readonly dataTable_DataGroupRowEntry : DataTable_DataGroupRowEntry
    dataTable_DataRowEntries__INTERNAL : Array<DataTable_INTERNAL_DataRowEntry>

    // copied from dataTable_DataGroupRowEntry
    uniqueId: DataTable_UniqueId
    sortOrder_OnEquals: any    //  Must be sortable using Javascript < > comparators

    columnEntries: Array<DataTable_DataRow_ColumnEntry> // initially copied from dataTable_DataGroupRowEntry

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    constructor(
        {
            dataTable_DataGroupRowEntry,
            dataTable_DataRowEntries__INTERNAL
        }:{
            dataTable_DataGroupRowEntry : DataTable_DataGroupRowEntry
            dataTable_DataRowEntries__INTERNAL : Array<DataTable_INTERNAL_DataRowEntry>
        }) {
        this.dataTable_DataGroupRowEntry = dataTable_DataGroupRowEntry;
        this.dataTable_DataRowEntries__INTERNAL = dataTable_DataRowEntries__INTERNAL;

        this.uniqueId = dataTable_DataGroupRowEntry.uniqueId;
        this.sortOrder_OnEquals = dataTable_DataGroupRowEntry.sortOrder_OnEquals;

        this.columnEntries = dataTable_DataGroupRowEntry.columnEntries;
    }
}


/**
 * Data Table - INTERNAL - Data Row Object
 *
 * !!!!!!  INTERNAL to Data Table   !!!!!!
 *
 *
 */
class DataTable_INTERNAL_DataRowEntry {

    readonly dataTable_DataRowEntry : DataTable_DataRowEntry

    // copied from dataTable_DataGroupRowEntry
    uniqueId: DataTable_UniqueId
    sortOrder_OnEquals: any    //  Must be sortable using Javascript < > comparators

    columnEntries: Array<DataTable_DataRow_ColumnEntry> // initially copied from dataTable_DataGroupRowEntry

    searchCharacterString_ToSearch_Entries = new Set<string>()

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    constructor(
        {
            dataTable_DataRowEntry
        }:{
            dataTable_DataRowEntry : DataTable_DataRowEntry
        }) {
        this.dataTable_DataRowEntry = dataTable_DataRowEntry;

        if ( ! dataTable_DataRowEntry.columnEntries ) {
            const msg = "DataTable_INTERNAL_DataRowEntry:constructor: ( ! dataTable_DataRowEntry.columnEntries )";
            console.warn(msg);
            throw Error( msg );
        }

        this.uniqueId = dataTable_DataRowEntry.uniqueId;
        this.sortOrder_OnEquals = dataTable_DataRowEntry.sortOrder_OnEquals;

        this.columnEntries = dataTable_DataRowEntry.columnEntries;

        for ( const columnEntry of dataTable_DataRowEntry.columnEntries ) {
            if ( columnEntry.searchTableData && columnEntry.searchTableData.searchEntriesForColumn ) {
                for ( const searchEntry of columnEntry.searchTableData.searchEntriesForColumn ) {
                    const searchCharacterString_ToSearch = DataTable_INTERNAL_Search_Utils.search_ChangeCharacterStringCase_ForSearching( searchEntry );
                    this.searchCharacterString_ToSearch_Entries.add( searchCharacterString_ToSearch );
                }
            }
        }
    }

}


export {
    DataTable_INTERNAL_SortColumnsInfoEntry,
    DataTable_INTERNAL_RootTableDataObject,
    DataTable_INTERNAL_DataGroupRowEntries_SinglePage,
    DataTable_INTERNAL_DataRowEntries_SinglePage,
    DataTable_INTERNAL_DataGroupRowEntry,
    DataTable_INTERNAL_DataRowEntry
}
