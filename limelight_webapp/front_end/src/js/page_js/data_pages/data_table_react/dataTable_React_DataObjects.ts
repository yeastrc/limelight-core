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

    //  Optional fields

    //        It is assumed that dataRowClickHandler and dataRow_GetChildTableData won't be both populated but it will be supported

    //  If dataRowClickHandler is populated, then the row will have CSS class clickable so mouse pointer will show ...

    /**
     * General User clicked the row, call this function.
     */
    dataRowClickHandler?( param : DataTable_TableOptions_dataRowClickHandler_RequestParm ) : void; 

    //    If  dataRow_GetChildTableData is populated, then the row will have the expansion indicator to the left and 
    //      clicking on the row will show/hide the child data table under the row

    /**
     * Call to get Data Table data for a Child table of this row in table, returning object of class DataTable_RootTableObject
     * @returns object of class DataTable_RootTableObject
     */
    dataRow_GetChildTableData?( param : DataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) : DataTable_RootTableObject;

    /**
     * Call to get Data Table data for a Child table of this row in table, returning object of class that extends React.Component
     * @returns object of class that extends React.Component
     */
    dataRow_GetChildTable_ReturnReactComponent?( param : DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) : React.Component;

    constructor({ dataRowClickHandler, dataRow_GetChildTableData, dataRow_GetChildTable_ReturnReactComponent } : {

        //  If dataRowClickHandler is populated, then the row will have CSS class clickable so mouse pointer will show ...

        /**
         * General User clicked the row, call this function.
         */
        dataRowClickHandler?( param : DataTable_TableOptions_dataRowClickHandler_RequestParm ) : void; 

        //    If  dataRow_GetChildTableData is populated, then the row will have the expansion indicator to the left and 
        //      clicking on the row will show/hide the child data table under the row

        /**
         * Call to get Data Table data for a Child table of this row in table, returning object of class DataTable_RootTableObject
         * @returns object of class DataTable_RootTableObject
         */
        dataRow_GetChildTableData?( param : DataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) : DataTable_RootTableObject;

        /**
         * Call to get Data Table data for a Child table of this row in table, returning object of class that extends React.Component
         * @returns object of class that extends React.Component
         */
        dataRow_GetChildTable_ReturnReactComponent?( param : DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) : React.Component;

    }) {
        this.dataRowClickHandler = dataRowClickHandler;
        this.dataRow_GetChildTableData = dataRow_GetChildTableData;
        this.dataRow_GetChildTable_ReturnReactComponent = dataRow_GetChildTable_ReturnReactComponent;
    }
}

/**
 * Param to DataTable_TableOptions.dataRowClickHandler
 */
class DataTable_TableOptions_dataRowClickHandler_RequestParm {
    event : React.MouseEvent<HTMLTableRowElement, MouseEvent>
    tableRowClickHandlerParameter : any  //  From property DataTable_DataRowEntry.tableRowClickHandlerParameter
}

/**
 * Param to DataTable_TableOptions.dataRow_GetChildTableData
 */
class DataTable_TableOptions_dataRow_GetChildTableData_RequestParm {
    event : React.MouseEvent<HTMLTableRowElement, MouseEvent>
    dataRow_GetChildTableDataParameter : any  //  From property DataTable_DataRowEntry.dataRow_GetChildTableDataParameter
}

/**
 * Param to DataTable_TableOptions.dataRow_GetChildTableData
 */
class DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm {
    event : React.MouseEvent<HTMLTableRowElement, MouseEvent>
    dataRow_GetChildTable_ReturnReactComponent_Parameter : any  //  From property DataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponent_Parameter
}



/////

// SortColumnsInfo

/**
 * Data Table - SortColumnsInfo Entry
 */
class DataTable_SortColumnsInfoEntry {

    columnId : DataTable_ColumnId;
    sortDirection : string
    sortPosition : number
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

    /**
     *
     */
    constructor({ columns, dataTable_DataRowEntries, dataTable_DataGroupRowEntries } : {
        dataTable_DataRowEntries? : Array<DataTable_DataRowEntry>
        dataTable_DataGroupRowEntries? : Array<DataTable_DataGroupRowEntry>
        columns : Array<DataTable_Column>
    }) {
        this.columns = columns;
        this.dataTable_DataRowEntries = dataTable_DataRowEntries;
        this.dataTable_DataGroupRowEntries = dataTable_DataGroupRowEntries;

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
    }

    shallowClone() : DataTable_RootTableDataObject {

        const clone = new DataTable_RootTableDataObject({ columns : this.columns, dataTable_DataGroupRowEntries : this.dataTable_DataGroupRowEntries, dataTable_DataRowEntries : this.dataTable_DataRowEntries });
        return clone;
    }
}

/**
 * A column in the Table.  Data for how to process the column and header content
 */
class DataTable_Column {

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
    style_override_DataRowCell_React?: any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

    //  graphWidth : number;  //  Not Supported Yet

    //  Externally managed table cell contents

    cellMgmt_External?: DataTable_cellMgmt_External

    cellMgmt_ExternalReactComponent?: DataTable_cellMgmt_ExternalReactComponent

    //  For Header:

    id: DataTable_ColumnId

    displayName: string

    sortable?: boolean  // Assumed false if missing

    hideColumnHeader?: boolean  // Assumed false if missing

    //  object where it's properties are copied over the values to be assigned to the DOM element style property
    //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
    style_override_HeaderRowCell_React?: any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"


    /**
     *
     */
    constructor(
        {
            id, displayName, width, heightInitial,

            //  If want graph in the cell
            showHorizontalGraph,  //  Show single horizontal rectangle where the value from valueSort is a fraction of graphMaxValue
            graphMaxValue, //  Min Value assumed to be zero
            graphWidth,   // width of 'outer' rectangle to represent graphMaxValue

            cssClassNameAdditions_HeaderRowCell, cssClassNameAdditions_DataRowCell, style_override_DataRowCell_React,
            cellMgmt_External, cellMgmt_ExternalReactComponent,

            //  For Header
            sortable, hideColumnHeader, style_override_HeaderRowCell_React
        }: {
            id: DataTable_ColumnId,
            displayName: string
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
            style_override_DataRowCell_React?: any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

            //  graphWidth : number;  //  Not Supported Yet

            //  Externally managed table cell contents

            cellMgmt_External?: DataTable_cellMgmt_External

            cellMgmt_ExternalReactComponent?: DataTable_cellMgmt_ExternalReactComponent

            //  For Header:

            sortable?: boolean  // Assumed false if missing

            hideColumnHeader?: boolean  // Assumed false if missing

            //  object where it's properties are copied over the values to be assigned to the DOM element style property
            //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
            style_override_HeaderRowCell_React?: any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

        }) {
        this.id = id;
        this.displayName = displayName;
        this.width = width;

        this.heightInitial = heightInitial;

        //  If want graph in the cell
        this.showHorizontalGraph = showHorizontalGraph;
        this.graphMaxValue = graphMaxValue;
        this.graphWidth = graphWidth


        this.cssClassNameAdditions_HeaderRowCell = cssClassNameAdditions_HeaderRowCell;
        this.cssClassNameAdditions_DataRowCell = cssClassNameAdditions_DataRowCell;
        this.style_override_DataRowCell_React = style_override_DataRowCell_React;
        this.cellMgmt_External = cellMgmt_External;
        this.cellMgmt_ExternalReactComponent = cellMgmt_ExternalReactComponent;
        this.sortable = sortable;
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

    }
}

////////////

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

/**
 * A Data Row
 */
class DataTable_DataRowEntry {

    uniqueId : DataTable_UniqueId
    sortOrder_OnEquals : any    //  Must be sortable using Javascript < > comparators
    greyOutRow? : boolean;  //  Grey out the row.  Apply CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    highlightRow? : boolean //  Highlight the row.  Apply CSS class 'table-row-highlight' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    row_CSS_Additions? : string // add to after other CSS class names to <div> with CSS class 'data-table-data-rows-inner-containing-div'
    columnEntries : Array<DataTable_DataRow_ColumnEntry>

    tableRowClickHandlerParameter? : any  //  Data passed to DataTable_TableOptions.dataRowClickHandler
    dataRow_GetChildTableDataParameter? : any  //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData

     // Data passed to DataTable_TableOptions.dataRow_GetChildTable_ReturnReactComponent as well as to the React Component as prop dataRow_GetChildTable_ReturnReactComponent_Parameter
    dataRow_GetChildTable_ReturnReactComponent_Parameter? : any

    // Child Table:
    //    A Child Table is a sub table tied to this row in this table.
    //    When this row is removed, the child table is removed.
    //    The child table will move with this row if the rows in this table are sorted
    childTableData? : DataTable_RootTableDataObject  // The data for the child table if one exists and expansion is supported.
    
    showChildTable? : boolean;

    /////////

    /**
     *
     */
    constructor({ uniqueId, sortOrder_OnEquals, greyOutRow, highlightRow, row_CSS_Additions, columnEntries, tableRowClickHandlerParameter, dataRow_GetChildTableDataParameter, dataRow_GetChildTable_ReturnReactComponent_Parameter } : {
        uniqueId : DataTable_UniqueId,
        sortOrder_OnEquals : any,    //  Must be sortable using Javascript < > comparators
        greyOutRow? : boolean;  //  Grey out the row.  Apply CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
        highlightRow? : boolean //  Highlight the row.  Apply CSS class 'table-row-highlight' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
        row_CSS_Additions? : string // add to after other CSS class names to <div> with CSS class 'data-table-data-rows-inner-containing-div'
        columnEntries : Array<DataTable_DataRow_ColumnEntry>,
        tableRowClickHandlerParameter? : any,  //  Data passed to DataTable_TableOptions.dataRowClickHandler
        dataRow_GetChildTableDataParameter? : any,  //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData

         // Data passed to DataTable_TableOptions.dataRow_GetChildTable_ReturnReactComponent as well as to the React Component as prop dataRow_GetChildTable_ReturnReactComponent_Parameter
        dataRow_GetChildTable_ReturnReactComponent_Parameter? : any 

        // Child Table:
        //    A Child Table is a sub table tied to this row in this table.
        //    When this row is removed, the child table is removed.
        //    The child table will move with this row if the rows in this table are sorted
        // childTableData? : DataTable_RootTableDataObject,  // The data for the child table if one exists and expansion is supported.
        
        // showChildTable? : boolean
     }) {
        this.uniqueId = uniqueId; 
        this.sortOrder_OnEquals = sortOrder_OnEquals;
        this.greyOutRow = greyOutRow;
        this.highlightRow = highlightRow;
        this.row_CSS_Additions = row_CSS_Additions;
        this.columnEntries = columnEntries;
        this.tableRowClickHandlerParameter = tableRowClickHandlerParameter;
        this.dataRow_GetChildTableDataParameter = dataRow_GetChildTableDataParameter
        this.dataRow_GetChildTable_ReturnReactComponent_Parameter = dataRow_GetChildTable_ReturnReactComponent_Parameter;

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
    }
}

/**
 * A column in a Data Row
 *
 * valueDisplay MUST be populated if cellMgmt_External_Data and cellMgmt_ExternalReactComponent are not populated
 * valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
 * tooltipText is set on 'title' attribute of cell
 *
 * cellMgmt_External_Data MUST be populated if object of DataTable_Column has 'cellMgmt_External' property set to a value
 * cellMgmt_ExternalReactComponent_Data MUST be populated if object of DataTable_Column has 'cellMgmt_ExternalReactComponent' property set to a value
 */
class DataTable_DataRow_ColumnEntry {

    //  valueDisplay MUST be populated if cellMgmt_External_Data and cellMgmt_ExternalReactComponent are not populated
    //  valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
    //  cellMgmt_External_Data MUST be populated if object of DataTable_Column has 'cellMgmt_External' property set to a value
    //  cellMgmt_ExternalReactComponent_Data MUST be populated if object of DataTable_Column has 'cellMgmt_ExternalReactComponent' property set to a value

    valueDisplay?: string; // Ignored if cellMgmt_External_Data or cellMgmt_ExternalReactComponent is populated
    valueSort?: any  //  Must be sortable using Javascript < > comparators - MUST be populated if object of DataTable_Column has 'sortable' property set to true
    tooltipText?: string; // tooltipText is set on 'title' attribute of cell

    //  Only cellMgmt_External_Data or cellMgmt_ExternalReactComponent can be populated, not both, and has to match up with value in DataTable_Column

    cellMgmt_External_Data?: any;
    cellMgmt_ExternalReactComponent_Data?: any;

    //  graphFraction : number;  //  Not Supported Yet

    /**
     * A column in a Data Row
     *
     * valueDisplay MUST be populated if cellMgmt_External_Data and cellMgmt_ExternalReactComponent are not populated
     * valueSort MUST be populated if object of DataTable_Column has 'sortable' property set to true
     *
     * cellMgmt_External_Data MUST be populated if object of DataTable_Column has 'cellMgmt_External' property set to a value
     * cellMgmt_ExternalReactComponent_Data MUST be populated if object of DataTable_Column has 'cellMgmt_ExternalReactComponent' property set to a value
     */
    constructor({valueDisplay, valueSort, tooltipText, cellMgmt_External_Data, cellMgmt_ExternalReactComponent_Data}: {
        valueDisplay?: string, // Ignored if cellMgmt_External_Data or cellMgmt_ExternalReactComponent is populated
        valueSort?: any,  //  Must be sortable using Javascript < > comparators - MUST be populated if object of DataTable_Column has 'sortable' property set to true
        tooltipText?: string, // tooltipText is set on 'title' attribute of cell

        //  Only cellMgmt_External_Data or cellMgmt_ExternalReactComponent can be populated, not both, and has to match up with value in DataTable_Column

        cellMgmt_External_Data?: any,
        cellMgmt_ExternalReactComponent_Data?: any
    }) {
        this.valueDisplay = valueDisplay
        this.valueSort = valueSort
        this.tooltipText = tooltipText
        this.cellMgmt_External_Data = cellMgmt_External_Data
        this.cellMgmt_ExternalReactComponent_Data = cellMgmt_ExternalReactComponent_Data

        DataTable_DataRow_ColumnEntry.constructorDataValidation(this)
    }

    /**
     *
     */
    static constructorDataValidation(dataTable_DataRow_ColumnEntry: DataTable_DataRow_ColumnEntry) {

        if (dataTable_DataRow_ColumnEntry.cellMgmt_External_Data && dataTable_DataRow_ColumnEntry.cellMgmt_ExternalReactComponent_Data) {
            const msg = 'DataTable_DataRow_ColumnEntry.constructorDataValidation: cellMgmt_External_Data && cellMgmt_ExternalReactComponent_Data';
            console.warn(msg)
            throw Error(msg);
        }
        if (((!dataTable_DataRow_ColumnEntry.cellMgmt_External_Data) && (!dataTable_DataRow_ColumnEntry.cellMgmt_ExternalReactComponent_Data))
            && (dataTable_DataRow_ColumnEntry.valueDisplay === undefined || dataTable_DataRow_ColumnEntry.valueDisplay === null)) {
            const msg = 'DataTable_DataRow_ColumnEntry.constructorDataValidation: ( ( ( ! cellMgmt_External_Data ) && ( ! cellMgmt_ExternalReactComponent_Data ) ) && ( valueDisplay === undefined || valueDisplay === null || valueDisplay === "" ) )';
            console.warn(msg)
            throw Error(msg);
        }
    }
}

///////////////////

//  Additions to DataTable_Column contents

/**
 * property cellMgmt_External in DataTable_Column
 */
interface DataTable_cellMgmt_External {

    populateCellDOMObject_Initial( param : DataTable_cellMgmt_External_PopulateRequest ) : DataTable_cellMgmt_External_PopulateResponse
}

/**
 * Request param to DataTable_cellMgmt_External.populateCellDOMObject_Initial
 */
class DataTable_cellMgmt_External_PopulateRequest {

    cellMgmt_External_Data : any
    domObjectInCell : HTMLElement
    columnWidth : number
    columnHeightInitial : number
    cellMgmt_External : DataTable_cellMgmt_External
}

class DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params {
    cellMgmt_External_Data : any
}

/**
 * Response from DataTable_cellMgmt_External.populateCellDOMObject_Initial
 */
class DataTable_cellMgmt_External_PopulateResponse {

    domObjectInCell_RemoveContents_Callback : () => void;
    cellMgmt_External_Data_NewValue_Callback : ( params : DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params ) => void;
}

/////

/**
 * property cellMgmt_ExternalReactComponent in DataTable_Column
 */
class DataTable_cellMgmt_ExternalReactComponent {

    reactComponent : any
}

////////////////////////////////////

export {

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm,

    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params,
    DataTable_cellMgmt_ExternalReactComponent
}

