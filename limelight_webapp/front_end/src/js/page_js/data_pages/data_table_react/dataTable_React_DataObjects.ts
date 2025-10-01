/**
 * dataTable_React_DataObjects.ts
 *
 * Classes and types for the Data Objects used in Data Table React
*/
import React from "react";
import {dataTable_React_DataObjects_Validator} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects_Validator";

type DataTable_UniqueId = string | number;

type DataTable_ColumnId = string;

////

/**
 * Data Table - Root Table Object
 *
 * For stand alone Data Table in DOM (Not enclosed by a React Managed element)
 * it is recommended to use the functions create_dataTable_Root_React, remove_dataTable_Root_React
 * in the file dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * to Create and Remove the Data Table to/from the DOM
 */
class DataTable_RootTableObject {

    dataTableId : string  //  Used for validation error messages
    tableOptions : DataTable_TableOptions 
    tableDataObject : DataTable_RootTableDataObject

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     * @throws Error if not valid
     */
    constructor({ dataTableId, tableOptions, tableDataObject } : {

        dataTableId : string  //  Used for validation error messages
        tableOptions : DataTable_TableOptions 
        tableDataObject : DataTable_RootTableDataObject
    }) {
        this.dataTableId = dataTableId;
        this.tableOptions = tableOptions;
        this.tableDataObject = tableDataObject;

        //  throws Error
        DataTable_RootTableObject.constructorDataValidation( this )

        //  Assumes all child properties are fully populated when this object is created
        //  throws Error
        dataTable_React_DataObjects_Validator({ dataTable_RootTableObject : this })
    }

    /**
     * @throws Error if not valid
     */
    static constructorDataValidation( dataTable_RootTableObject : DataTable_RootTableObject ) : void {

        if ( dataTable_RootTableObject.dataTableId === undefined || dataTable_RootTableObject.dataTableId === null || dataTable_RootTableObject.dataTableId === "" ) {
            const msg = 'DataTable_RootTableObject.constructor: dataTableId === undefined || dataTableId === null || dataTableId === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! dataTable_RootTableObject.tableOptions ) {
            const msg = 'DataTable_RootTableObject.constructor: ( ! tableOptions )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! dataTable_RootTableObject.tableDataObject ) {
            const msg = 'DataTable_RootTableObject.constructor: ( ! tableDataObject )';
            console.warn( msg )
            throw Error( msg );
        }

    }
}

/**
 * Table Options
 */
class DataTable_TableOptions {

    enable_Pagination_Download_Search : boolean
    enable_Download : boolean
    dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow: boolean // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     * @param params - Change from optional '?' if require any of the parameters in the object to be passed
     */
    constructor( params : DataTable_TableOptions_ContructorParams) {
        if ( params ) {
            this.enable_Pagination_Download_Search = params.enable_Pagination_Download_Search;
            this.enable_Download = params.enable_Download
            this.dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow = params.dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow
        }
    }
}

/**
 * Change constructor 'params' from optional '?' if require any of the parameters in the object to be passed
 */
interface DataTable_TableOptions_ContructorParams {
    enable_Pagination_Download_Search : boolean
    enable_Download?: boolean
    dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow?: boolean // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time
}


/**
 * Data Table - columns: Array<DataTable_Column> AND columns_tableDownload: Array<DataTable_Column_DownloadTable>
 *
 *     Convenience Class
 */
class DataTable_RootTableDataObject_Both_ColumnArrays {

    columns: Array<DataTable_Column>
    columns_tableDownload: Array<DataTable_Column_DownloadTable>

    constructor(
        {
            columns, columns_tableDownload
        } : {
            columns: Array<DataTable_Column>
            columns_tableDownload: Array<DataTable_Column_DownloadTable>
        }) {
        this.columns = columns;
        this.columns_tableDownload = columns_tableDownload;
    }
}

//////////////////////////////
//////////////////////////////

/**
 * Data Table - Root Table Data Object
 */
class DataTable_RootTableDataObject {

    //  Update shallowClone if add properties

    dataTable_DataRowEntries? : Array<DataTable_DataRowEntry>
    dataTable_DataGroupRowEntries? : Array<DataTable_DataGroupRowEntry>
    columns : Array<DataTable_Column>
    columns_tableDownload : Array<DataTable_Column_DownloadTable>
    text_Optional_After_CurrentlyShowing_X_Of_Y: string  //  Optional Text to display after the "Currently Showing: ..." in the display of the data table
    download_Content_PrefixLines: Array<string> // Optional Lines to add to start of download content

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     * @param text_Optional_After_CurrentlyShowing_X_Of_Y: Optional Text to display after the "Currently Showing: ..." in the display of the data table
     * @param download_Content_PrefixLines: Optional Lines to add to start of download content.  One array element string per line.  Probably start with "#" so clear it is NOT primary data being downloaded
     */
    constructor({ columns, columns_tableDownload, dataTable_DataRowEntries, dataTable_DataGroupRowEntries, text_Optional_After_CurrentlyShowing_X_Of_Y, download_Content_PrefixLines } : {
        dataTable_DataRowEntries? : Array<DataTable_DataRowEntry>
        dataTable_DataGroupRowEntries? : Array<DataTable_DataGroupRowEntry>
        columns : Array<DataTable_Column>
        columns_tableDownload : Array<DataTable_Column_DownloadTable>
        /**
         * text_Optional_After_CurrentlyShowing_X_Of_Y: Optional Text to display after the "Currently Showing: ..." in the display of the data table
         */
        text_Optional_After_CurrentlyShowing_X_Of_Y?: string
        /**
         * Optional Lines to add to start of download content.  One array element string per line.  Probably start with "#" so clear it is NOT primary data being downloaded
         */
        download_Content_PrefixLines?: Array<string>
    }) {
        this.columns = columns;
        this.columns_tableDownload = columns_tableDownload;
        this.dataTable_DataRowEntries = dataTable_DataRowEntries;
        this.dataTable_DataGroupRowEntries = dataTable_DataGroupRowEntries;
        this.text_Optional_After_CurrentlyShowing_X_Of_Y = text_Optional_After_CurrentlyShowing_X_Of_Y;
        this.download_Content_PrefixLines = download_Content_PrefixLines

        DataTable_RootTableDataObject.constructorDataValidation( this )
    }

    /**
     *
     */
    static constructorDataValidation( dataTable_RootTableDataObject : DataTable_RootTableDataObject ) : void {

        if ( ! dataTable_RootTableDataObject.columns ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ! columns )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! ( dataTable_RootTableDataObject.columns.length > 0 ) ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ! ( dataTable_RootTableDataObject.columns.length > 0 ) )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! dataTable_RootTableDataObject.columns_tableDownload ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ! columns_tableDownload )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! ( dataTable_RootTableDataObject.columns_tableDownload.length > 0 ) ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ! ( dataTable_RootTableDataObject.columns_tableDownload.length > 0 ) )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_RootTableDataObject.dataTable_DataRowEntries && dataTable_RootTableDataObject.dataTable_DataGroupRowEntries ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( dataTable_DataRowEntries && dataTable_DataGroupRowEntries )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ( ! dataTable_RootTableDataObject.dataTable_DataRowEntries ) && ( ! dataTable_RootTableDataObject.dataTable_DataGroupRowEntries ) ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ( ! dataTable_DataRowEntries ) && ( ! dataTable_DataGroupRowEntries ) )';
            console.warn( msg )
            throw Error( msg );
        }
        //  All index values in dataTable_RootTableDataObject.columns must be sequential since Javascript allows gaps
        {
            const columns = dataTable_RootTableDataObject.columns;
            const columns_length = columns.length;
            for ( let index = 0; index < columns_length; index++ ) {
                if ( ! columns[ index ] ) {
                    const msg = 'DataTable_RootTableDataObject.constructor: Gap in dataTable_RootTableDataObject.columns indexes: ( ! columns[ index ] )';
                    console.warn( msg )
                    throw Error( msg );
                }
            }
        }
    }

    shallowClone() : DataTable_RootTableDataObject {

        const clone = new DataTable_RootTableDataObject({
            columns : this.columns, columns_tableDownload: this.columns_tableDownload,
            dataTable_DataGroupRowEntries : this.dataTable_DataGroupRowEntries, dataTable_DataRowEntries : this.dataTable_DataRowEntries,
            text_Optional_After_CurrentlyShowing_X_Of_Y: this.text_Optional_After_CurrentlyShowing_X_Of_Y
        });
        return clone;
    }
}

/**
 * Smallest Value - Closest to negative infinity
 * Largest Value  - Closest to positive infinity
 *
 * The general goal is to sort the null values to after the worst non-null values when sorting scores.
 */
enum DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum {

    /**
     * Smallest Value - Closest to negative infinity
     */
    SORT_NULL_BEFORE_SMALLEST_VALUE = 'SORT_NULL_BEFORE_SMALLEST_VALUE',

    /**
     * Largest Value  - Closest to positive infinity
     */
    SORT_NULL_AFTER_LARGEST_VALUE = 'SORT_NULL_AFTER_LARGEST_VALUE'
}

/**
 * Param to DataTable_TableOptions.dataRowClickHandler
 */
class DataTable_Column_sortFunction_Param {
    sortValue_A : unknown  //  From DataTable_DataRow_ColumnEntry.valueSort
    sortValue_B : unknown  //  From DataTable_DataRow_ColumnEntry.valueSort
}

type DataTable_Column_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element = () => JSX.Element;

type DataTable_Column_tooltip_Fcn_NoInputParam_Return_JSX_Element = () => JSX.Element;

/**
 * A column in the Table.  Data for how to process the column and header content
 */
class DataTable_Column {

    //  If true, then in the first DataRow of a Group will the valueDisplay be shown in the table.  In other rows the table cell will be empty
    onlyShow_ValueDisplay_FirstRowOfGroup?: boolean;

    //  Dimensions of cells for this column, excluding padding around cell contents:
    width: number;      //  width (set as width and max-width on DOM element style property) of column
    heightInitial?: number;  //  Optional: height (set as height but NOT max-height on DOM element style property) of column

    //  If want graph in the cell, uses value from valueSort which must be a number
    showHorizontalGraph?: boolean;
    graphMaxValue?: number; //  Min Value assumed to be zero
    graphWidth?: number;

    cssClassNameAdditions_HeaderRowCell?: string;  //  css classes to add to Header Row Cell entry HTML
    cssClassNameAdditions_DataRowCell?: string;  //  css classes to add to Data Row Cell entry HTML

    //  object where it's properties are copied over the values to be assigned to the DOM element style property
    //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
    style_override_DataRowCell_React?: React.CSSProperties; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

    //  graphWidth : number;  //  Not Supported Yet

    //  For Header:

    id: DataTable_ColumnId

    displayName: string
    columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element: DataTable_Column_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element

    //  These provide 2 different options for show a tooltip on mouseover of the text in that Column Header. Only 1 is allowed to be populated.

    columnHeader_Tooltip_HTML_TitleAttribute?: string //  Added to the HTML element that contains the 'displayName' value as the 'title' attribute.
    columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element?: DataTable_Column_tooltip_Fcn_NoInputParam_Return_JSX_Element  // Function that takes no params and returns JSX.Element

    sortable?: boolean  // Assumed false if missing

    /**
     *  allow valueSort to be null and sort the null before or after the values
     */
    sort_Null_BeforeValues_AfterValues_Enum?: DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum

    sortFunction?: ( param : DataTable_Column_sortFunction_Param ) => number  //  Called passing each cell valueSort_FOR_DataTable_Column_sortFunction for custom sorting

    hideColumnHeader?: boolean  // Assumed false if missing

    //  object where it's properties are copied over the values to be assigned to the DOM element style property
    //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
    style_override_HeaderRowCell_React?: React.CSSProperties; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"


    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor(
        {
            id,

            //   Exactly one of these 2 parameters are required
            displayName,
            columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element,

            width,
            heightInitial,

            //  If want graph in the cell
            showHorizontalGraph,  //  Show single horizontal rectangle where the value from valueSort is a fraction of graphMaxValue
            graphMaxValue, //  Min Value assumed to be zero
            graphWidth,   // width of 'outer' rectangle to represent graphMaxValue

            cssClassNameAdditions_HeaderRowCell, cssClassNameAdditions_DataRowCell, style_override_DataRowCell_React,

            //  These provide 2 different options for show a tooltip on mouseover of the text in that Column Header. Only 1 is allowed to be populated.
            columnHeader_Tooltip_HTML_TitleAttribute, //  Added to the HTML element that contains the 'displayName' value as the 'title' attribute.
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,  // Function that takes no params and returns JSX.Element

            //  If true, then in the first DataRow of a Group will the valueDisplay be shown in the table.  In other rows the table cell will be empty
            onlyShow_ValueDisplay_FirstRowOfGroup,

            sortable, sort_Null_BeforeValues_AfterValues_Enum, sortFunction, hideColumnHeader, style_override_HeaderRowCell_React
        }: {
            id: DataTable_ColumnId,

            //   columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element is displayed on page if populated, else displayName.  
            displayName: string
            columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element?: DataTable_Column_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element

            width: number

            heightInitial?: number;  //  Optional: height (set as height but NOT max-height on DOM element style property) of column

            //  If want graph in the cell
            showHorizontalGraph?: boolean;
            graphMaxValue?: number; //  Min Value assumed to be zero
            graphWidth?: number;

            cssClassNameAdditions_HeaderRowCell?: string;  //  css classes to add to Header Row Cell entry HTML
            cssClassNameAdditions_DataRowCell?: string;  //  css classes to add to Data Row Cell entry HTML

            //  object where it's properties are copied over the values to be assigned to the DOM element style property
            //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
            style_override_DataRowCell_React?: React.CSSProperties; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

            //  graphWidth : number;  //  Not Supported Yet

            //  For Header:

            //  These provide 2 different options for show a tooltip on mouseover of the text in that Column Header. Only 1 is allowed to be populated.
            /**
             * columnHeader_Tooltip_HTML_TitleAttribute:
             *
             * Column Header Tooltip string.  NO Longer put in HTML title attribute so \n new lines are not recognized.
             */
            columnHeader_Tooltip_HTML_TitleAttribute?: string
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element?: DataTable_Column_tooltip_Fcn_NoInputParam_Return_JSX_Element  // Function that takes no params and returns JSX.Element

            //  If true, then in the first DataRow of a Group will the valueDisplay be shown in the table.  In other rows the table cell will be empty
            onlyShow_ValueDisplay_FirstRowOfGroup?: boolean;

            //   Sorting of column on user click of column heading

            sortable?: boolean  // Assumed false if missing

            /**
             *  allow valueSort to be null and sort the null before or after the values
             */
            sort_Null_BeforeValues_AfterValues_Enum?: DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum

            sortFunction?: ( param : DataTable_Column_sortFunction_Param ) => number  //  Called passing each cell valueSort_FOR_DataTable_Column_sortFunction for custom sorting

            ////

            hideColumnHeader?: boolean  // Assumed false if missing

            //  object where it's properties are copied over the values to be assigned to the DOM element style property
            //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
            style_override_HeaderRowCell_React?: React.CSSProperties; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

        }) {
        this.id = id;
        this.displayName = displayName;
        this.columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element = columnHeader_HeaderArea_Display_Contents_Fcn_NoInputParam_Return_JSX_Element
        this.width = width;

        this.heightInitial = heightInitial;

        //  If want graph in the cell
        this.showHorizontalGraph = showHorizontalGraph;
        this.graphMaxValue = graphMaxValue;
        this.graphWidth = graphWidth


        this.cssClassNameAdditions_HeaderRowCell = cssClassNameAdditions_HeaderRowCell;
        this.cssClassNameAdditions_DataRowCell = cssClassNameAdditions_DataRowCell;
        this.style_override_DataRowCell_React = style_override_DataRowCell_React;
        this.columnHeader_Tooltip_HTML_TitleAttribute = columnHeader_Tooltip_HTML_TitleAttribute;
        this.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element;
        this.onlyShow_ValueDisplay_FirstRowOfGroup = onlyShow_ValueDisplay_FirstRowOfGroup;
        this.sortable = sortable;
        this.sort_Null_BeforeValues_AfterValues_Enum = sort_Null_BeforeValues_AfterValues_Enum
        this.sortFunction = sortFunction;
        this.hideColumnHeader = hideColumnHeader
        this.style_override_HeaderRowCell_React = style_override_HeaderRowCell_React
    }

    /**
     *
     */
    static constructorDataValidation(dataTable_Column: DataTable_Column): void {

        if (dataTable_Column.id === undefined || dataTable_Column.id === null || dataTable_Column.id === "") {
            const msg = 'DataTable_Column.constructorDataValidation: id === undefined || id === null || id === ""';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_Column.displayName === undefined || dataTable_Column.displayName === null) {
            const msg = 'DataTable_Column.constructorDataValidation: displayName === undefined || displayName === null';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_Column.width === undefined || dataTable_Column.width === null) {
            const msg = 'DataTable_Column.constructorDataValidation: width === undefined || width === null';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_Column.width < 1) {
            const msg = 'DataTable_Column.constructorDataValidation: width < 1';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_Column.showHorizontalGraph) {
            if (!dataTable_Column.graphMaxValue) {
                const msg = "DataTable_Column.constructorDataValidation: showHorizontalGraph is true and graphMaxValue is not set or is zero";
                console.warn(msg)
                throw Error(msg);
            }
            if (!dataTable_Column.graphWidth) {
                const msg = "DataTable_Column.constructorDataValidation: showHorizontalGraph is true and graphWidth is not set or is zero";
                console.warn(msg)
                throw Error(msg);
            }
        }
        if ( dataTable_Column.sortFunction && ( ! dataTable_Column.sortable ) ) {
            const msg = "DataTable_Column.constructorDataValidation: dataTable_Column.sortFunction has a value and dataTable_Column.sortable is not true";
            console.warn(msg)
            throw Error(msg);
        }
        if ( dataTable_Column.columnHeader_Tooltip_HTML_TitleAttribute && dataTable_Column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element ) {
            const msg = "DataTable_Column.constructorDataValidation: dataTable_Column.columnHeader_Tooltip_HTML_TitleAttribute and dataTable_Column.columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element CANNOT BOTH have a value";
            console.warn(msg)
            throw Error(msg);
        }

    }
}

/**
 * A column in the Download of the Table.
 */
class DataTable_Column_DownloadTable {

    cell_ColumnHeader_String : string

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor(
        {
            cell_ColumnHeader_String
        } : {
            cell_ColumnHeader_String : string
        }) {

        this.cell_ColumnHeader_String = cell_ColumnHeader_String;
    }
}

/////////////////////////
/////////////////////////
/////////////////////////

//  Actual Data:

/**
 * A Data Group Row
 */
class DataTable_DataGroupRowEntry {

    dataTable_DataRowEntries: Array<DataTable_DataRowEntry>

    // Copied from one of containing DataTable_DataRowEntry, probably first one
    uniqueId: DataTable_UniqueId
    sortOrder_OnEquals: any    //  Must be sortable using Javascript < > comparators
    columnEntries: Array<DataTable_DataRow_ColumnEntry>

    /////////

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor({dataTable_DataRowEntries, uniqueId, sortOrder_OnEquals, columnEntries}: {
        dataTable_DataRowEntries: Array<DataTable_DataRowEntry>
        uniqueId: DataTable_UniqueId,
        sortOrder_OnEquals: any,    //  Must be sortable using Javascript < > comparators
        columnEntries: Array<DataTable_DataRow_ColumnEntry>
    }) {

        this.dataTable_DataRowEntries = dataTable_DataRowEntries;
        this.uniqueId = uniqueId;
        this.sortOrder_OnEquals = sortOrder_OnEquals;
        this.columnEntries = columnEntries;

        DataTable_DataGroupRowEntry.constructorDataValidation( this )
    }

    /**
     *
     */
    static constructorDataValidation(dataTable_DataGroupRowEntry: DataTable_DataGroupRowEntry): void {

        if (!dataTable_DataGroupRowEntry.dataTable_DataRowEntries) {
            const msg = 'DataTable_DataGroupRowEntry.constructorDataValidation: ( ! dataTable_DataRowEntries )';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_DataGroupRowEntry.uniqueId === undefined || dataTable_DataGroupRowEntry.uniqueId === null || dataTable_DataGroupRowEntry.uniqueId === "") {
            const msg = 'DataTable_DataGroupRowEntry.constructorDataValidation: uniqueId === undefined || uniqueId === null || uniqueId === ""';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_DataGroupRowEntry.sortOrder_OnEquals === undefined || dataTable_DataGroupRowEntry.sortOrder_OnEquals === null || dataTable_DataGroupRowEntry.sortOrder_OnEquals === "") {
            const msg = 'DataTable_DataGroupRowEntry.constructorDataValidation: sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === ""';
            console.warn(msg)
            throw Error(msg);
        }
        if (!dataTable_DataGroupRowEntry.columnEntries) {
            const msg = 'DataTable_DataGroupRowEntry.constructorDataValidation: ( ! columnEntries )';
            console.warn(msg)
            throw Error(msg);
        }

    }
}

//////////

/**
 * A Data Row
 *
 * Type declarations used in this class will appear after this class
 */
class DataTable_DataRowEntry {

    uniqueId : DataTable_UniqueId
    sortOrder_OnEquals : any    //  Must be sortable using Javascript < > comparators
    greyOutRow? : boolean;  //  Grey out the row.  Apply CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    highlightRowWithBackgroundColor? : boolean //  Highlight the row by applying a background color.  Apply CSS class 'table-row-highlight-with-background-color' to <div> with CSS class 'data-table-data-rows-inner-containing-div'

    //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.
    //  Highlight the row by applying a solid border and color using CSS class table-row-border-peptide-filter--not-border-color
    highlightRowWithBorder_peptideFilter_NOT_borderColor? : boolean

    highlightRowWithBorderSolid? : boolean //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.  Highlight the row by applying a solid border.
    highlightRowWithBorderDash? : boolean //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.  Highlight the row by applying a dash border.
    row_CSS_Additions? : string // add to after other CSS class names to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    styleOverrides_innerContainingDiv : React.CSSProperties // USE WITH CARE: Overrides on <div class="data-table-data-rows-inner-containing-div">
    columnEntries : Array<DataTable_DataRow_ColumnEntry>

    dataTable_DataRowEntry_DownloadTable : DataTable_DataRowEntry_DownloadTable

    //  ---  options For providing a callback function here that will NOT be passed any data from this object

    //  function called on row click.  No properties passed from this object.
    tableRowClickHandler_Callback_NoDataPassThrough? : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent

    dataRow_Get_RowChildContent_At_RowMountTime: boolean  //  Get the Child Row Mount Data at Row Mount Time
    dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow  = true // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time

    //  Data Table INTERNAL Properties

    // Child Table:
    //    A Child Table is a sub table tied to this row in this table.
    //    When this row is removed, the child table is removed.
    //    The child table will move with this row if the rows in this table are sorted
    INTERNAL_DataTable_Property_childTableData? : DataTable_RootTableDataObject  // The data for the child table if one exists and expansion is supported.

    INTERNAL_DataTable_Property_showChildTable? : boolean;

    /////////

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor(
        {
            uniqueId, sortOrder_OnEquals, greyOutRow,
            highlightRowWithBackgroundColor, highlightRowWithBorder_peptideFilter_NOT_borderColor, highlightRowWithBorderSolid, highlightRowWithBorderDash,
            row_CSS_Additions, styleOverrides_innerContainingDiv,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,

            //  Only 1 of the following 3 are allowed to be populated (and none allowed if any of dataRow_GetChildTableData_Return_... or dataRow_Get_RowChildContent_Return_... populated)
            // dataRow_GetChildTableDataParameter,
            // dataRow_GetChildTableData_ViaPromise_Parameter,
            // dataRow_GetChildTable_ReturnReactComponent_Parameter,

            tableRowClickHandler_Callback_NoDataPassThrough,

            //  Only 1 of the following 6 are allowed to be populated (and none allowed if any of Old style dataRow_GetChildTable... populated)
            //   (this rule is enforced in the type DataTable_DataRowEntry__Constructor)
            //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
            dataRow_GetChildTableData_Return_DataTable_RootTableObject,
            dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject,
            dataRow_Get_RowChildContent_Return_ChildContent,
            dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
            dataRow_Get_RowChildContent_Return_Promise_ChildContent,

            dataRow_Get_RowChildContent_At_RowMountTime,  //    Get the Child Row Mount Data at Row Mount Time.  ONLY Applicable if one of the dataRow_GetChild... or dataRow_Get_RowChild... is populated
            dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time

        } : DataTable_DataRowEntry__Constructor ) { // type DataTable_DataRowEntry__Constructor for constructor properties declared below to support XOR properties

        this.uniqueId = uniqueId; 
        this.sortOrder_OnEquals = sortOrder_OnEquals;
        this.greyOutRow = greyOutRow;
        this.highlightRowWithBackgroundColor = highlightRowWithBackgroundColor;
        this.highlightRowWithBorder_peptideFilter_NOT_borderColor = highlightRowWithBorder_peptideFilter_NOT_borderColor;
        this.highlightRowWithBorderSolid = highlightRowWithBorderSolid;
        this.highlightRowWithBorderDash = highlightRowWithBorderDash;
        this.row_CSS_Additions = row_CSS_Additions;
        this.styleOverrides_innerContainingDiv = styleOverrides_innerContainingDiv
        this.columnEntries = columnEntries;
        this.dataTable_DataRowEntry_DownloadTable = dataTable_DataRowEntry_DownloadTable

        this.tableRowClickHandler_Callback_NoDataPassThrough = tableRowClickHandler_Callback_NoDataPassThrough;
        this.dataRow_GetChildTableData_Return_DataTable_RootTableObject = dataRow_GetChildTableData_Return_DataTable_RootTableObject;
        this.dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject = dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject;
        this.dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject = dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject;
        this.dataRow_Get_RowChildContent_Return_ChildContent = dataRow_Get_RowChildContent_Return_ChildContent;
        this.dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent = dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent;
        this.dataRow_Get_RowChildContent_Return_Promise_ChildContent = dataRow_Get_RowChildContent_Return_Promise_ChildContent;

        this.dataRow_Get_RowChildContent_At_RowMountTime = dataRow_Get_RowChildContent_At_RowMountTime //  Get the Child Row Mount Data at Row Mount Time
        this.dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow = dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time

        DataTable_DataRowEntry.constructorDataValidation( this )
    }

    /**
     *
     */
    static constructorDataValidation( dataTable_DataRowEntry : DataTable_DataRowEntry ) {

        if ( dataTable_DataRowEntry.uniqueId === undefined || dataTable_DataRowEntry.uniqueId === null || dataTable_DataRowEntry.uniqueId === "" ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: uniqueId === undefined || uniqueId === null || uniqueId === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.sortOrder_OnEquals === undefined || dataTable_DataRowEntry.sortOrder_OnEquals === null || dataTable_DataRowEntry.sortOrder_OnEquals === "" ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.columnEntries === undefined || dataTable_DataRowEntry.columnEntries === null ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: columnEntries === undefined';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.dataTable_DataRowEntry_DownloadTable === undefined || dataTable_DataRowEntry.dataTable_DataRowEntry_DownloadTable === null ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: dataTable_DataRowEntry_DownloadTable === undefined';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor && dataTable_DataRowEntry.highlightRowWithBorderDash ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: highlightRowWithBorder_peptideFilter_NOT_borderColor and highlightRowWithBorderDash cannot both be true';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.highlightRowWithBorderSolid && dataTable_DataRowEntry.highlightRowWithBorder_peptideFilter_NOT_borderColor ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: highlightRowWithBorderSolid and highlightRowWithBorder_peptideFilter_NOT_borderColor cannot both be true';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntry.highlightRowWithBorderSolid && dataTable_DataRowEntry.highlightRowWithBorderDash ) {
            const msg = 'DataTable_DataRowEntry.constructorDataValidation: highlightRowWithBorderSolid and highlightRowWithBorderDash cannot both be true';
            console.warn( msg )
            throw Error( msg );
        }
    }
}

//  Type declarations used in the class

//  Type for the constructor at the end of these declarations: 'type DataTable_DataRowEntry__Constructor ='

interface DataTable_DataRowEntry__Constructor_Base {

    uniqueId : DataTable_UniqueId,
    sortOrder_OnEquals : any,    //  Must be sortable using Javascript < > comparators
    greyOutRow? : boolean;  //  Grey out the row.  Apply CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    highlightRowWithBackgroundColor? : boolean //  Highlight the row with background color.  Apply CSS class 'table-row-highlight-with-background-color' to <div> with CSS class 'data-table-data-rows-inner-containing-div'

    //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.
    //  Highlight the row by applying a solid border and color using CSS class table-row-border-peptide-filter--not-border-color
    highlightRowWithBorder_peptideFilter_NOT_borderColor? : boolean

    highlightRowWithBorderSolid? : boolean //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.  Highlight the row by applying a solid border.
    highlightRowWithBorderDash? : boolean //  !!  MUST set property highlightingOneOrMoreRowsWithBorder on object of class DataTable_RootTableDataObject if set this value.  Highlight the row by applying a dash border.
    row_CSS_Additions? : string // add to after other CSS class names to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    styleOverrides_innerContainingDiv? : React.CSSProperties // USE WITH CARE: Overrides on <div class="data-table-data-rows-inner-containing-div">
    columnEntries : Array<DataTable_DataRow_ColumnEntry>,
    dataTable_DataRowEntry_DownloadTable : DataTable_DataRowEntry_DownloadTable

    //  ---  options For providing a callback function here that will NOT be passed any data from this object

    //  function called on row click.  No properties passed from this object.
    tableRowClickHandler_Callback_NoDataPassThrough? : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough

    dataRow_Get_RowChildContent_At_RowMountTime?: boolean  //  Get the Child Row Mount Data at Row Mount Time
    dataRow_Get_RowChildContent_At_RowMountTime_SKIP_When_SingleRow?: boolean // SKIP The Default when Single Row: Get the Child Row Mount Data at Row Mount Time

    //  More properties are added in the extends interfaces.  Done there to limit use to exactly 1 of the properties.
}

interface DataTable_DataRowEntry__Constructor__GetChildTableData extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : never
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Constructor__GetChildTableData_ObjOrPromise extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : never
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Constructor__GetChildTableData_Promise extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : never
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Constructor__GetChildContent extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : never
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Constructor__GetChildContent_FcnOrPromise extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : never
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Constructor__GetChildContent_Promise extends DataTable_DataRowEntry__Constructor_Base {

    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded
    dataRow_Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get 'Row Child Content' to display when this row is expanded.  Callback returns Promise<...> to be compatible with 'async' functions.
    dataRow_Get_RowChildContent_Return_Promise_ChildContent? : DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent

    //  function called to get Child DataTable. Callback returns an DataTable_RootTableObject. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject? : never
    //  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
    dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
    //  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
////

type DataTable_DataRowEntry__Constructor =
    DataTable_DataRowEntry__Constructor__GetChildTableData | DataTable_DataRowEntry__Constructor__GetChildTableData_ObjOrPromise | DataTable_DataRowEntry__Constructor__GetChildTableData_Promise |
    DataTable_DataRowEntry__Constructor__GetChildContent | DataTable_DataRowEntry__Constructor__GetChildContent_FcnOrPromise | DataTable_DataRowEntry__Constructor__GetChildContent_Promise


///////////  Types of properties in the class

/**
 * Property in DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
 */
class DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_RowDOM_Rect {
    left : number
    right : number
    top : number
    bottom : number
}

/**
 * Property in DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params
 */
class DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_ClickEventData {
    ctrlKey_From_ClickEvent : boolean
    metaKey_From_ClickEvent : boolean
}

/**
 * No Properties from DataTable_DataRowEntry will be passed.  This will stay empty until some value HAS to be passed
 */
interface DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params {
    rowDOM_Rect : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_RowDOM_Rect
    clickEventData : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_ClickEventData
}

type DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough = ( params : DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params ) => void;

////////////

interface DataTable_DataRowEntry__GetChildTableData_CallbackParams {  }

////

//  function called to get Child DataTable. Callback returns DataTable_RootTableObject. No properties passed from this object.
type DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) => DataTable_RootTableObject;

////

//  The follow interface and type result in a return value that contains exactly one of the 2 properties (data...  promise...)

interface DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Base {}
interface DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Object extends DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Base {
    dataTable_RootTableObject : DataTable_RootTableObject
    promise_Containing_dataTable_RootTableObject? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Promise extends DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Base {
    promise_Containing_dataTable_RootTableObject : Promise<DataTable_RootTableObject>
    dataTable_RootTableObject? : never                       //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}

type DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue = (
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Object
    | DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue_Promise
)

//  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
type DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject =
    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) => DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue

/////

//  function called to get Child Table.  Callback returns Promise<DataTable_RootTableObject> to be compatible with 'async' functions.  No properties passed from this object.
type DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject = ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) => Promise<DataTable_RootTableObject>

/////////////////

///  Get Child Content ( Content to be placed under current row when row is expanded. )

//  Params passed to function called to get Child Content (Used for all function callbacks for get Child Content)

interface DataTable_DataRowEntry__Get_RowChildContent_CallParams {  }

////////  Callback to Function to get Child Content

//  function called to get Child Table.  Callback returns Promise<ChildContent> to be compatible with 'async' functions.  No properties passed from this object.
type DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent = ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) => JSX.Element

////////  Callback to get Child Content or Promise that contains Function that returns Child Content

//  Start of definition of allowed result from callback to get Child Content or Promise that contains Child Content

//  The follow interface and type result in a return value that contains exactly one of the 2 properties (childContent...  promise...)

interface DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Base {}
interface DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Object extends DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Base {
    getchildContentCallback : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent
    promise_Containing_GetChildContentCallback? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when childContent is populated
}
interface DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Promise extends DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Base {
    promise_Containing_GetChildContentCallback : Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent>
    getchildContentCallback? : never                       //  Need "?" since 'never'.  'never' so can NOT be populated when promise_Containing_ChildContent is populated
}

//  Final definition of allowed result from callback to get Child Content or Promise that contains Function that returns Child Content
type DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue = (
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Object
    | DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue_Promise
)

//  function called to get Child DataTable. Callback returns an object. No properties passed from this object.
type DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent =
    ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) => DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue

////////  Callback to Promise that contains Function to get Child Content

//  function called to get Child Table.  Callback returns Promise<GetChildContentCallback> to be compatible with 'async' functions.  No properties passed from this object.
type DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent = ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) => Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent>



//////////////////
//////////////////

/**
 * The Download Data for A Data Row
 *
 */
class DataTable_DataRowEntry_DownloadTable {

    //  The length of this Array MUST MATCH property: columns_tableDownload : Array<DataTable_Column_DownloadTable>  in class DataTable_RootTableDataObject

    dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn>

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor(
        {
            dataColumns_tableDownload
        } : {
            dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn>
        }) {

        this.dataColumns_tableDownload = dataColumns_tableDownload;
    }
}

/**
 * The Download Data for A Data Row, a single column in download
 *
 */
class DataTable_DataRowEntry_DownloadTable_SingleColumn {

    cell_ColumnData_String : string

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     *
     */
    constructor(
        {
            cell_ColumnData_String
        } : {
            cell_ColumnData_String : string
        }) {

        this.cell_ColumnData_String = cell_ColumnData_String;
    }
}


//////////////////
//////////////////

/**
 * A column in a Data Row
 *
 * valueDisplay MUST be populated if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is not populated
 * valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
 * tooltipText is set on 'title' attribute of cell
 */
class DataTable_DataRow_ColumnEntry {

    searchTableData : DataTable_DataRow_ColumnEntry_SearchTableData

    //  valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true

    valueSort?: string | number  //  Must be sortable using Javascript < > comparators - MUST be populated if object of DataTable_Column has 'sortable' property set to true

    valueSort_FOR_DataTable_Column_sortFunction?: unknown  //  Must be populated if DataTable_Column.sortFunction is populated

    ///////


    //  ---   General  Rules for Table Cell Contents Options

    //  valueDisplay MUST be populated if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is not populated
    //  valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is assigned a function.  The callback params will NOT contain any data set on this object.

    //  ---  Table Cell Contents is determined by one of the following (The first one of the next four ('valueDisplay_...' to 'valueDisplay') that meets the rule is used)

    // Assigned a function.  The callback params will NOT contain any data set on this object.
    valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough? : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

    valueDisplay?: string; // Ignored if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is populated

    ///////////////

    //  Can only have a value in ONE of the following parameters (tooltipText or tooltipDisplay_...):

    tooltipText?: string; // tooltipText is set on 'title' attribute of cell

    tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough? : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

    //  graphFraction : number;  //  Not Supported Yet

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     * A column in a Data Row
     *
     * valueDisplay MUST be populated if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is not populated
     * valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
     */
    constructor(
        {
            searchTableData,
            valueDisplay,
            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
            valueSort,
            valueSort_FOR_DataTable_Column_sortFunction,
            tooltipText,
            tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
        }: {

        searchTableData? : DataTable_DataRow_ColumnEntry_SearchTableData

        /**
         *   valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
         *
         *   Must be sortable using Javascript < > comparators
         *
         *   If DataTable_Column.sort_Null_BeforeValues_AfterValues_Enum is populated for this column, then valueSort can be null and will be sorted according to this property
         */
        valueSort?: string | number  //  Must be sortable using Javascript < > comparators


        valueSort_FOR_DataTable_Column_sortFunction?: unknown  //  Must be populated if DataTable_Column.sortFunction is populated


        ///////


        //  ---   General  Rules for Table Cell Contents Options

        //  valueDisplay MUST be populated if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is not populated
        //  valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is assigned a function.  The callback params will NOT contain any data set on this object.

        //  ---  Table Cell Contents is determined by one of the following (The first one of the next four ('valueDisplay_...' to 'valueDisplay') that meets the rule is used)

        // Assigned a function.  The callback params will NOT contain any data set on this object.
        valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough? : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

        valueDisplay?: string; // Ignored if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is populated

        ///////////////

        //  Can only have a value in ONE of the following parameters (tooltipText or tooltipDisplay_...):

        tooltipText?: string; // tooltipText is set on 'title' attribute of cell

        tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough? : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

    }) {
        this.searchTableData = searchTableData;
        this.valueDisplay = valueDisplay
        this.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;
        this.valueSort = valueSort
        this.valueSort_FOR_DataTable_Column_sortFunction = valueSort_FOR_DataTable_Column_sortFunction;
        this.tooltipText = tooltipText
        this.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough;

        DataTable_DataRow_ColumnEntry.constructorDataValidation(this)
    }

    /**
     *
     */
    static constructorDataValidation(dataTable_DataRow_ColumnEntry: DataTable_DataRow_ColumnEntry) {

        if ( (dataTable_DataRow_ColumnEntry.valueDisplay === undefined || dataTable_DataRow_ColumnEntry.valueDisplay === null)
            && (dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === undefined || dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === null) ) {
            const msg = 'DataTable_DataRow_ColumnEntry.constructorDataValidation: ( ( ( valueDisplay === undefined || valueDisplay === null || valueDisplay === "" )&& (dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === undefined || dataTable_DataRow_ColumnEntry.valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough === null)  )';
            console.warn(msg)
            throw Error(msg);
        }
        if (dataTable_DataRow_ColumnEntry.tooltipText && dataTable_DataRow_ColumnEntry.tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough) {
            const msg = 'DataTable_DataRow_ColumnEntry.constructorDataValidation: values in both tooltipText && tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough';
            console.warn(msg)
            throw Error(msg);
        }
    }
}

//  Type declarations used in the class

interface DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params {   }

type DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) => JSX.Element;

interface DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params {  }

type DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = ( params : DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) => JSX.Element;


///////////////////

//  Additions to DataTable_Column contents

/**
 * Column Entry Search Data
 */
class DataTable_DataRow_ColumnEntry_SearchTableData {

    searchEntriesForColumn : Array<string>

    private _DO_NOT_CALL__ForceUse_ClassConstructor() {} // added to prevent construct object without calling constructor

    /**
     * A column in a Data Row
     *
     * valueDisplay MUST be populated if valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough is not populated
     * valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
     */
    constructor(
        {
            searchEntriesForColumn
        }: {
            searchEntriesForColumn : Array<string>
        }) {
        this.searchEntriesForColumn = searchEntriesForColumn;
    }
}

////////////////////////////////////

export {
    DataTable_UniqueId,
    DataTable_ColumnId,

    DataTable_RootTableObject,

    DataTable_RootTableDataObject_Both_ColumnArrays,

    DataTable_TableOptions,

    DataTable_Column,
    DataTable_Column_tooltip_Fcn_NoInputParam_Return_JSX_Element,
    DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum,
    DataTable_Column_sortFunction_Param,
    DataTable_Column_DownloadTable,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_RowDOM_Rect,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Param_ClickEventData,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params,
    DataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry__tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_OR_Promise_ChildContent_ReturnValue,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent_Or_Promise_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent
}

