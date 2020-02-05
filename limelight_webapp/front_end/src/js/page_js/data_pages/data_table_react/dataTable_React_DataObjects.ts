/**
 * dataTable_React_dataTable_DataRowEntries.ts
 * 
 * interface for the Data Objects used in Data Table React
*/

type DataTable_UniqueId = string | number;

type DataTable_ColumnId = string;

////

/**
 * Data Table - Root Table Object
 */
class DataTable_RootTableObject {

    dataTableId : string  //  Used for validation error messages
    tableOptions : DataTable_TableOptions 
    tableDataObject : DataTable_RootTableDataObject

    constructor({ dataTableId, tableOptions, tableDataObject } : {

        dataTableId : string  //  Used for validation error messages
        tableOptions : DataTable_TableOptions 
        tableDataObject : DataTable_RootTableDataObject
    }) {
        if ( dataTableId === undefined || dataTableId === null || dataTableId === "" ) {
            const msg = 'DataTable_RootTableObject.constructor: dataTableId === undefined || dataTableId === null || dataTableId === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! tableOptions ) {
            const msg = 'DataTable_RootTableObject.constructor: ( ! tableOptions )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! tableDataObject ) {
            const msg = 'DataTable_RootTableObject.constructor: ( ! tableDataObject )';
            console.warn( msg )
            throw Error( msg );
        }

        this.dataTableId = dataTableId;
        this.tableOptions = tableOptions;
        this.tableDataObject = tableDataObject;
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

    constructor({ columns, dataTable_DataRowEntries, dataTable_DataGroupRowEntries } : {
        dataTable_DataRowEntries? : Array<DataTable_DataRowEntry>
        dataTable_DataGroupRowEntries? : Array<DataTable_DataGroupRowEntry>
        columns : Array<DataTable_Column>
    }) {
        if ( ! columns ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ! columns )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( dataTable_DataRowEntries && dataTable_DataGroupRowEntries ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( dataTable_DataRowEntries && dataTable_DataGroupRowEntries )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ( ! dataTable_DataRowEntries ) && ( ! dataTable_DataGroupRowEntries ) ) {
            const msg = 'DataTable_RootTableDataObject.constructor: ( ( ! dataTable_DataRowEntries ) && ( ! dataTable_DataGroupRowEntries ) )';
            console.warn( msg )
            throw Error( msg );
        }

        this.columns = columns;
        this.dataTable_DataRowEntries = dataTable_DataRowEntries;
        this.dataTable_DataGroupRowEntries = dataTable_DataGroupRowEntries;
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
    width : number;      //  width (set as width and max-width on DOM element style property) of column
    heightInitial? : number;  //  Optional: height (set as height but NOT max-height on DOM element style property) of column

    //  If want graph in the cell, uses value from valueSort which must be a number
    showHorizontalGraph? : boolean;
    graphMaxValue? : number; //  Min Value assumed to be zero
    graphWidth? : number;

    cssClassNameAdditions_HeaderRowCell? : string;  //  css classes to add to Header Row Cell entry HTML
    cssClassNameAdditions_DataRowCell? : string;  //  css classes to add to Data Row Cell entry HTML

    //  object where it's properties are copied over the values to be assigned to the DOM element style property
    //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
    style_override_DataRowCell_React? : any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

    //  graphWidth : number;  //  Not Supported Yet

    //  Externally managed table cell contents

    cellMgmt_External? : DataTable_cellMgmt_External

    cellMgmt_ExternalReactComponent? : DataTable_cellMgmt_ExternalReactComponent

    //  For Header:

    id : DataTable_ColumnId

    displayName : string

    sortable? : boolean  // Assumed false if missing

    hideColumnHeader? : boolean  // Assumed false if missing

    //  object where it's properties are copied over the values to be assigned to the DOM element style property
    //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
    style_override_HeaderRowCell_React? : any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"

    
    constructor({ 
        id, displayName, width, heightInitial, 

        //  If want graph in the cell
        showHorizontalGraph,  //  Show single horizontal rectangle where the value from valueSort is a fraction of graphMaxValue
        graphMaxValue, //  Min Value assumed to be zero
        graphWidth,   // width of 'outer' rectangle to represent graphMaxValue

        cssClassNameAdditions_HeaderRowCell, cssClassNameAdditions_DataRowCell, style_override_DataRowCell_React, 
        cellMgmt_External, cellMgmt_ExternalReactComponent, 

        //  For Header
        sortable, hideColumnHeader, style_override_HeaderRowCell_React
    } : { 
        id : DataTable_ColumnId, 
        displayName : string
        width : number

        heightInitial? : number;  //  Optional: height (set as height but NOT max-height on DOM element style property) of column

        //  If want graph in the cell
        showHorizontalGraph? : boolean;
        graphMaxValue? : number; //  Min Value assumed to be zero
        graphWidth? : number;

        cssClassNameAdditions_HeaderRowCell? : string;  //  css classes to add to Header Row Cell entry HTML
        cssClassNameAdditions_DataRowCell? : string;  //  css classes to add to Data Row Cell entry HTML
    
        //  object where it's properties are copied over the values to be assigned to the DOM element style property
        //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
        style_override_DataRowCell_React? : any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"
    
        //  graphWidth : number;  //  Not Supported Yet
    
        //  Externally managed table cell contents
    
        cellMgmt_External? : DataTable_cellMgmt_External
    
        cellMgmt_ExternalReactComponent? : DataTable_cellMgmt_ExternalReactComponent
    
        //  For Header:
    
        sortable? : boolean  // Assumed false if missing
    
        hideColumnHeader? : boolean  // Assumed false if missing
    
        //  object where it's properties are copied over the values to be assigned to the DOM element style property
        //      For values that React accepts as numbers like fontSize, just assign the number instead of a string with "px" at the end
        style_override_HeaderRowCell_React? : any; //  Must be object with property names that are compatible with format  domElement.style.<property name>.  IE: domElement.style.fontWeight = "bold"
    
    }) {
        if ( id === undefined || id === null || id === "" ) {
            const msg = 'DataTable_Column.constructor: id === undefined || id === null || id === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( displayName === undefined || displayName === null ) {
            const msg = 'DataTable_Column.constructor: displayName === undefined || displayName === null';
            console.warn( msg )
            throw Error( msg );
        }
        if ( width === undefined || width === null ) {
            const msg = 'DataTable_Column.constructor: width === undefined || width === null';
            console.warn( msg )
            throw Error( msg );
        }
        if ( width < 1 ) {
            const msg = 'DataTable_Column.constructor: width < 1';
            console.warn( msg )
            throw Error( msg );
        }
        if ( showHorizontalGraph ) {
            if ( ! graphMaxValue ) {
                const msg = "DataTable_Column.constructor: showHorizontalGraph is true and graphMaxValue is not set or is zero";
                console.warn( msg )
                throw Error( msg );
            }
            if ( ! graphWidth ) {
                const msg = "DataTable_Column.constructor: showHorizontalGraph is true and graphWidth is not set or is zero";
                console.warn( msg )
                throw Error( msg );
            }
        }

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
}

////////////

//  Actual Data:

/**
 * A Data Group Row
 */
class DataTable_DataGroupRowEntry {

    dataTable_DataRowEntries : Array<DataTable_DataRowEntry>

    // Copied from one of containing DataTable_DataRowEntry, probably first one
    uniqueId : DataTable_UniqueId
    sortOrder_OnEquals : any    //  Must be sortable using Javascript < > comparators
    columnEntries : Array<DataTable_DataRow_ColumnEntry>
    
    /////////
    
    constructor({ dataTable_DataRowEntries, uniqueId, sortOrder_OnEquals, columnEntries } : {
        dataTable_DataRowEntries : Array<DataTable_DataRowEntry>   
        uniqueId : DataTable_UniqueId,
        sortOrder_OnEquals : any,    //  Must be sortable using Javascript < > comparators
        columnEntries : Array<DataTable_DataRow_ColumnEntry>
     }) {
        if ( ! dataTable_DataRowEntries ) {
            const msg = 'DataTable_DataGroupRowEntry.constructor: ( ! dataTable_DataRowEntries )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( uniqueId === undefined || uniqueId === null || uniqueId === "" ) {
            const msg = 'DataTable_DataGroupRowEntry.constructor: uniqueId === undefined || uniqueId === null || uniqueId === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === "" ) {
            const msg = 'DataTable_DataGroupRowEntry.constructor: sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! columnEntries ) {
            const msg = 'DataTable_DataGroupRowEntry.constructor: ( ! columnEntries )';
            console.warn( msg )
            throw Error( msg );
        }

        this.dataTable_DataRowEntries = dataTable_DataRowEntries;
        this.uniqueId = uniqueId; 
        this.sortOrder_OnEquals = sortOrder_OnEquals;
        this.columnEntries = columnEntries;
    }
}

/**
 * A Data Row
 */
class DataTable_DataRowEntry {

    uniqueId : DataTable_UniqueId
    sortOrder_OnEquals : any    //  Must be sortable using Javascript < > comparators
    greyOutRow? : boolean;  //  Grey out the row.  Appy CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
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
    
    constructor({ uniqueId, sortOrder_OnEquals, greyOutRow, columnEntries, tableRowClickHandlerParameter, dataRow_GetChildTableDataParameter, dataRow_GetChildTable_ReturnReactComponent_Parameter } : {   
        uniqueId : DataTable_UniqueId,
        sortOrder_OnEquals : any,    //  Must be sortable using Javascript < > comparators
        greyOutRow? : boolean;  //  Grey out the row.  Appy CSS class 'grey-out-row' to <div> with CSS class 'data-table-data-rows-inner-containing-div'
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
        if ( uniqueId === undefined || uniqueId === null || uniqueId === "" ) {
            const msg = 'DataTable_DataRowEntry.constructor: uniqueId === undefined || uniqueId === null || uniqueId === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === "" ) {
            const msg = 'DataTable_DataRowEntry.constructor: sortOrder_OnEquals === undefined || sortOrder_OnEquals === null || sortOrder_OnEquals === ""';
            console.warn( msg )
            throw Error( msg );
        }
        if ( columnEntries === undefined || columnEntries === null ) {
            const msg = 'DataTable_DataRowEntry.constructor: columnEntries === undefined';
            console.warn( msg )
            throw Error( msg );
        }

        this.uniqueId = uniqueId; 
        this.sortOrder_OnEquals = sortOrder_OnEquals;
        this.greyOutRow = greyOutRow;
        this.columnEntries = columnEntries;
        this.tableRowClickHandlerParameter = tableRowClickHandlerParameter;
        this.dataRow_GetChildTableDataParameter = dataRow_GetChildTableDataParameter
        this.dataRow_GetChildTable_ReturnReactComponent_Parameter = dataRow_GetChildTable_ReturnReactComponent_Parameter;
    }
}

/**
 * A column in a Data Row
 */
class DataTable_DataRow_ColumnEntry {

    //  valueDisplay and valueSort MUST be populated if cellMgmt_External_Data and cellMgmt_ExternalReactComponent are not populated

    valueDisplay? : string;
    valueSort? : any  //  Must be sortable using Javascript < > comparators
    tooltipText? : string;

    //  Only cellMgmt_External_Data or cellMgmt_ExternalReactComponent can be populated, not both, and has to match up with value in DataTable_Column

    cellMgmt_External_Data? : any;
    cellMgmt_ExternalReactComponent_Data? : any;

    //  graphFraction : number;  //  Not Supported Yet

    constructor({ valueDisplay, valueSort, tooltipText, cellMgmt_External_Data, cellMgmt_ExternalReactComponent_Data } : {
        valueDisplay? : string,
        valueSort? : any,  //  Must be sortable using Javascript < > comparators
        tooltipText? : string,

        //  Only cellMgmt_External_Data or cellMgmt_ExternalReactComponent can be populated, not both, and has to match up with value in DataTable_Column

        cellMgmt_External_Data? : any,
        cellMgmt_ExternalReactComponent_Data? : any
    }) {
        //  The params are auto copied to the this. and thus not available for the constructor code to use
        if ( cellMgmt_External_Data && cellMgmt_ExternalReactComponent_Data )  {
            const msg = 'DataTable_DataRow_ColumnEntry.constructor: cellMgmt_External_Data && cellMgmt_ExternalReactComponent_Data';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ( ( ! cellMgmt_External_Data ) && ( ! cellMgmt_ExternalReactComponent_Data ) ) && ( valueDisplay === undefined || valueDisplay === null ) )  {
            const msg = 'DataTable_DataRow_ColumnEntry.constructor: ( ( ( ! cellMgmt_External_Data ) && ( ! cellMgmt_ExternalReactComponent_Data ) ) && ( valueDisplay === undefined || valueDisplay === null || valueDisplay === "" ) )';
            console.warn( msg )
            throw Error( msg );
        }
        if ( ( ( ! cellMgmt_External_Data ) && ( ! cellMgmt_ExternalReactComponent_Data ) ) && ( valueSort === undefined || valueSort === null ) )  {
            const msg = 'DataTable_DataRow_ColumnEntry.constructor: ( ( ( ! cellMgmt_External_Data ) && ( ! cellMgmt_ExternalReactComponent_Data ) ) && ( valueSort === undefined || valueSort === null ) )';
            console.warn( msg )
            throw Error( msg );
        }

        this.valueDisplay = valueDisplay
        this.valueSort = valueSort
        this.tooltipText = tooltipText
        this.cellMgmt_External_Data = cellMgmt_External_Data
        this.cellMgmt_ExternalReactComponent_Data = cellMgmt_ExternalReactComponent_Data
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

/**
 * Response frpm DataTable_cellMgmt_External.populateCellDOMObject_Initial
 */
class DataTable_cellMgmt_External_PopulateResponse {

    domObjectInCell_RemoveContents_Callback : () => void;
    cellMgmt_External_Data_NewValue_Callback : ({ cellMgmt_External_Data } : { cellMgmt_External_Data : any }) => void;
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
    DataTable_cellMgmt_ExternalReactComponent
}

