/**
 * proteinExperiment__createProteinList_DataTable_ColumnObject.ts
 *
 *
 *
 */


import { loadGoogleChart_CoreChart }  from 'page_js/data_pages/data_pages_common/googleChartLoaderForThisWebapp';


import {
    DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params,
    DataTable_Column
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_Display";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


/**
 * Create Table Columns
 */
export class ProteinExperiment__CreateProteinDataTableColumns_Class {

    private _PSMs_per_Condition_populateCellDOMObject_Initial_BindThis = this._PSMs_per_Condition_populateCellDOMObject_Initial.bind(this);

    private _inProgress_Timeout_Ids = new Set<number>();

    /**
     *
     */
    cancel_scheduledDOMUpdates() : void {
        for ( const timerId of this._inProgress_Timeout_Ids ) {
            window.clearTimeout(timerId)
        }
        this._inProgress_Timeout_Ids.clear();
    }

    /**
     * Create Table Columns
     */
    proteinExperiment__getProteinDataTableColumns({
                                                      conditions_for_condition_group_with_their_project_search_ids
                                                      /*, projectSearchIds, searchNamesKeyProjectSearchId */
                                                  }: {
        conditions_for_condition_group_with_their_project_search_ids: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
    }): Array<DataTable_Column> {

        let columns: Array<DataTable_Column> = [];

        //  Elements for each row must be in the same order as in this array

        {
            const column = new DataTable_Column({
                id: 'protName', //  Short string that is unique for each column
                displayName: 'Protein(s)',
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 350, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
                // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
                //  scroll if too wide
                style_override_DataRowCell_React: {whiteSpace: "nowrap", overflowX: "auto", fontSize: "12px"}, // React format Style overrides
                style_override_HeaderRowCell_React: {fontSize: "12px"}, //  React format Style Overrides for Header Row Cells
                // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' '
            });

            columns.push(column);
        }

        {
            const column = new DataTable_Column({
                id: 'protDesc', //  Short string that is unique for each column
                displayName: 'Protein Description(s)',
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 200, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
                // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
                //  elippsis if too wide
                style_override_DataRowCell_React: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px"
                }, // React format Style overrides
                style_override_HeaderRowCell_React: {fontSize: "12px"}, //  React format Style Overrides for Header Row Cells
                // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' '
            });

            columns.push(column);
        }

        // for ( const projectSearchId of projectSearchIds ) {

        //     const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
        //     if ( ! searchNameObject ) {
        //         throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
        //     }

        //     const column = new DataTable_Column({
        //         id : 'nmPsm_' + projectSearchId, //  Short string that is unique for each column
        //         displayName :  'PSMs (' + searchNameObject.searchId + ")" ,
        //         sortable: true, // Will sort using Javascript < > on the 'value' property
        //         width :        80, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
        //         style_override_React : { fontSize: "12px" }, // React format Style overrides
        //         style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
        //         // css_class : ' clickable '
        //     });

        //     columns.push( column );
        // }

        for (const condition_with_its_project_search_ids of conditions_for_condition_group_with_their_project_search_ids) {

            const condition = condition_with_its_project_search_ids.condition;

            const column = new DataTable_Column({
                id: 'condition_' + condition.id, //  Short string that is unique for each column
                displayName: "PSMs (" + condition.label + ")",
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 80, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
                // heightInitial :        500, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
                style_override_DataRowCell_React: {fontSize: "12px"}, // React format Style overrides
                style_override_HeaderRowCell_React: {fontSize: "12px"}, //  React format Style Overrides for Header Row Cells
                // css_class : ' clickable '
            });

            columns.push(column);
        }

        if (conditions_for_condition_group_with_their_project_search_ids.length > 0) {
            const column = new DataTable_Column({
                id: 'extFun', //  Short string that is unique for each column
                displayName: 'PSMs per Condition',
                // sortable: true, // Will sort using Javascript < > on the 'value' property

                width: 400, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
                heightInitial: 100, // pixels, must be a number.  style 'height' property, not 'maxHeight' property

                //  prevent line breaks and elippsis if too long
                style_override_DataRowCell_React: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "12px"
                }, // React format Style overrides
                style_override_HeaderRowCell_React: {fontSize: "12px"}, //  React format Style Overrides for Header Row Cells
                // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' '

                cellMgmt_External: {
                    //  Function called to populate the DOM element on DOM element Mount (React calls componentDidMount())
                    populateCellDOMObject_Initial: this._PSMs_per_Condition_populateCellDOMObject_Initial_BindThis
                }
            });

            columns.push(column);
        }

        // if ( conditions_for_condition_group_with_their_project_search_ids.length > 0 ) {
        //     const column = new DataTable_Column({
        //         id : 'extFun', //  Short string that is unique for each column
        //         displayName :  'PSMs per Condition - React Component - Only Up to 3 Conditions For Initial Testing',
        //         // sortable: true, // Will sort using Javascript < > on the 'value' property

        //         width :             _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
        //         heightInitial :     _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'height' property, not 'maxHeight' property

        //         //  prevent line breaks and elippsis if too long
        //         style_override_React : { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "12px" }, // React format Style overrides
        //         style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
        //         // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' '

        //         cellMgmt_ExternalReactComponent : {
        //             //  React component to embed inside the <div> for the cell
        //             reactComponent : ProteinExperimentPage_PSMs_Per_Condition_Component
        //         }
        //     });

        //     columns.push( column );
        // }

        // import { ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_WIDTH as _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT as _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } from '../jsx/proteinExperimentPage_PSMs_Per_Condition_Component';


        return columns;
    };

    ////////////////

    //    Create Chart in Protein List

    //  Create Chart - Initial callback after containing DOM element is mounted in DOM ( React: componentDidMount() )

    /**
     * Process the DOM Object in the cell handed from the Data Table React
     */
    _PSMs_per_Condition_populateCellDOMObject_Initial(
        {
            cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External
        }:{
            cellMgmt_External_Data: any
            domObjectInCell: any
            columnWidth: any
            columnHeightInitial: any
            cellMgmt_External: any
        }) {

        // console.log("_PSMs_per_Condition_populateCellDOMObject_Initial(...)")

        let timerId_PopulateCell = window.setTimeout(() => {

            _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout({
                cellMgmt_External_Data,
                domObjectInCell,
                columnWidth,
                columnHeightInitial,
                cellMgmt_External,
                cellMgmt_External_Data_InitialPopulation: undefined
            });

            this._inProgress_Timeout_Ids.delete( timerId_PopulateCell );

            timerId_PopulateCell = undefined;

        }, 10);

        this._inProgress_Timeout_Ids.add( timerId_PopulateCell );

        const domObjectInCell_RemoveContents_Callback = () => {

            if (timerId_PopulateCell) {

                this._inProgress_Timeout_Ids.delete( timerId_PopulateCell );

                window.clearTimeout(timerId_PopulateCell)
            }

            _PSMs_per_Condition_CellCleanup({domObjectInCell});

            // The following should be faster by delaying doing the cleanup
            //
            // Could do the following if put the contents in a child DOM element
            //
            // Detach child DOM element from Parent
            //
            // const cleanupCallback = () => {
            //     try {
            //         Empty and remove child DOM element from Document/Window or whatever
            //
            //     } catch( e ) {
            //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //         throw e;
            //     }
            // }
            //
            // //  Not in all browsers: window.requestIdleCallback
            // //  window.requestIdleCallback not in Typescript declaration since is experimental
            // // @ts-ignore comment suppresses all errors in following line.
            // if ( window.requestIdleCallback ) {
            //     try {
            //         //  Not in all browsers: window.requestIdleCallback
            //         //  window.requestIdleCallback not in Typescript declaration since is experimental
            //         // @ts-ignore comment suppresses all errors in following line.
            //         window.requestIdleCallback( cleanupCallback );
            //
            //     } catch ( e ) {
            //         //  fall back to window.setTimeout
            //
            //         const setTimeoutDelay = 2000 + ( Math.ceil( Math.random() * 2000 ) ); // Random between 2 and 4 seconds
            //
            //         // console.log("removeContents_AndContainer_FromDOM(): Exception caught: Falling back to calling window.setTimeout( cleanupCallback, 4000 ); e: ", e );
            //         window.setTimeout( cleanupCallback, setTimeoutDelay );
            //     }
            // } else {
            //     //  fall back to window.setTimeout
            //
            //     const setTimeoutDelay = 2000 + ( Math.ceil( Math.random() * 2000 ) ); // Random between 2 and 4 seconds
            //
            //     // console.log("removeContents_AndContainer_FromDOM(): No value for window.requestIdleCallback: Falling back to calling window.setTimeout( cleanupCallback, 4000 );" );
            //     window.setTimeout( cleanupCallback, setTimeoutDelay );
            // }
        }

        const cellMgmt_External_Data_InitialPopulation = cellMgmt_External_Data;

        const cellMgmt_External_Data_NewValue_Callback = (params: DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params) => {

            //  TODO  Check if data really changed.  Add true "equals" method to incoming data class and only do work if data changed, not just if object reference changed.
            //        This will reduce DOM updates when change protein grouping.

            const cellMgmt_External_Data = params.cellMgmt_External_Data;

            if (!cellMgmt_External_Data) {
                const msg = "proteinExperimentPage_Display.ts: _PSMs_per_Condition_populateCellDOMObject_Initial: cellMgmt_External_Data_NewValue_Callback: No Value for cellMgmt_External_Data. params(only shown in console): ";
                console.warn(msg, params);
                throw Error(msg);
            }

            if (timerId_PopulateCell) {

                this._inProgress_Timeout_Ids.delete( timerId_PopulateCell );

                window.clearTimeout(timerId_PopulateCell)
            }
            timerId_PopulateCell = window.setTimeout(() => {
                _PSMs_per_Condition_CellCleanup({domObjectInCell});

                _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout({
                    cellMgmt_External_Data,
                    domObjectInCell,
                    columnWidth,
                    columnHeightInitial,
                    cellMgmt_External,
                    cellMgmt_External_Data_InitialPopulation
                });
            }, 10);

            this._inProgress_Timeout_Ids.add( timerId_PopulateCell );
        }

        //  Returned to Data Table code
        const result = {
            //  Called before domObjectInCell removed from page.  Remove any contents and remove any listeners added to domObjectInCell
            domObjectInCell_RemoveContents_Callback: domObjectInCell_RemoveContents_Callback,
            //  Called when new value for cellMgmt_External_Data
            cellMgmt_External_Data_NewValue_Callback: cellMgmt_External_Data_NewValue_Callback
        };

        return result;
    }
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////


///   NON CLASS Functions

//  Remove Chart - callback after containing DOM element is unmounted (removed) from DOM ( React: componentWillUnmount() )

/**
 * Process the DOM Object in the cell handed from the Data Table React
 */
const _PSMs_per_Condition_CellCleanup = function( { domObjectInCell } : { domObjectInCell: any } ) {

    // console.log( "_PSMs_per_Condition_CellCleanup called " );

    const $domObjectInCell = $( domObjectInCell );
    $domObjectInCell.empty();
}

////////////

//    Create Chart in Protein List - Actually create the chart


/**
 * Process the DOM Object in the cell handed from the Data Table React
 *
 * @param cellMgmt_External - cellMgmt_External property in column in columns in Data Table Definition
 * @param dataObject_columnEntry_InitialPopulation - dataObject_columnEntry at time of initial population
 */
const _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout = function(
    {
        cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External, cellMgmt_External_Data_InitialPopulation
    }: {
        cellMgmt_External_Data: any
        domObjectInCell: any
        columnWidth: any
        columnHeightInitial: any
        cellMgmt_External: any
        cellMgmt_External_Data_InitialPopulation: any
    } ) {

    if ( ! cellMgmt_External_Data ) {
        const msg = "proteinExperimentPage_Display.ts: _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout: No Value for cellMgmt_External_Data.psmCountsPerCondition. cellMgmt_External_Data(only shown in console): ";
        console.warn( msg, cellMgmt_External_Data );
        throw Error( msg );
    }

    // console.log("_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout(...)")

    //  Add Google Chart

    //  chart data for Google charts
    let chartData = [];

    let chartDataHeaderEntry = [ 'PSM Count', "Conditions", {role: "tooltip", 'p': {'html': true} } ];
    chartData.push( chartDataHeaderEntry );

    for ( const psmCountsPerConditionEntry of cellMgmt_External_Data.psmCountsPerCondition ) {
        let chartEntry = [
            psmCountsPerConditionEntry.condition.label,
            psmCountsPerConditionEntry.numPsms,
            //  Tool Tip
            "Condition: " + psmCountsPerConditionEntry.condition.label + ", numPsms: " + psmCountsPerConditionEntry.numPsms ];
        chartData.push( chartEntry );
    }

    //  Overridden for Specific elements like Chart Title and X and Y Axis labels
    const _CHART_DEFAULT_FONT_SIZE = 12;  //  Default font size - using to set font size for tick marks.

    const _TITLE_FONT_SIZE = 15; // In PX
    const _AXIS_LABEL_FONT_SIZE = 14; // In PX
    // const _TICK_MARK_TEXT_FONT_SIZE = 14; // In PX

    // const chartTitle = 'PSM Counts Per Condition';

    let optionsFullsize = {
        //  Overridden for Specific elements like Chart Title and X and Y Axis labels
        fontSize: _CHART_DEFAULT_FONT_SIZE,  //  Default font size - using to set font size for tick marks.

        // title: chartTitle, // Title above chart
        titleTextStyle: {
//			        color: <string>,    // any HTML string color ('red', '#cc00cc')
//			        fontName: <string>, // i.e. 'Times New Roman'
            fontSize: _TITLE_FONT_SIZE, // 12, 18 whatever you want (don't specify px)
//			        bold: <boolean>,    // true or false
//			        italic: <boolean>   // true of false
        },
        //  X axis label below chart
        // hAxis: { title: 'Charge', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
        // },
        //  Y axis label left of chart
        // vAxis: { title: 'Count', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
        //     // ,baseline: 0     // always start at zero
        //     // ,ticks: vAxisTicks
        //     // ,maxValue : maxChargeCount
        // },
        legend: { position: 'none' }, //  position: 'none':  Don't show legend of bar colors in upper right corner
        width : columnWidth,
        height : columnHeightInitial,   // width and height of chart, otherwise controlled by enclosing div
        // colors: [ chartBarColor ],  //  Color of bars
        tooltip: {isHtml: true}
//				,chartArea : { left : 140, top: 60,
//				width: objectThis.RETENTION_TIME_COUNT_CHART_WIDTH - 200 ,  //  was 720 as measured in Chrome
//				height : objectThis.RETENTION_TIME_COUNT_CHART_HEIGHT - 120 }  //  was 530 as measured in Chrome
    };


    //  Get reference to Google Charts.

    //    Request to Load Google Charts Done above and the Promise if returned is waited for so is an error if Google Charts not loaded at this point.

    //  Object returned with Properties
    const loadGoogleChart_CoreChartResult = loadGoogleChart_CoreChart();

    if ( ! loadGoogleChart_CoreChartResult.isLoaded ) {
        const msg = "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout: loadGoogleChart_CoreChartResult.isLoaded is not true";
        console.warn( msg );
        throw Error( msg );
    }

    if ( ! loadGoogleChart_CoreChartResult.google ) {
        const msg = "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout: loadGoogleChart_CoreChartResult.google is not populated";
        console.warn( msg );
        throw Error( msg );
    }

    const google = loadGoogleChart_CoreChartResult.google;

    // console.log( "_PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout" )

    // create the chart
    const data = google.visualization.arrayToDataTable( chartData );
    const chartFullsize = new google.visualization.ColumnChart( domObjectInCell );
    chartFullsize.draw(data, optionsFullsize);

}
