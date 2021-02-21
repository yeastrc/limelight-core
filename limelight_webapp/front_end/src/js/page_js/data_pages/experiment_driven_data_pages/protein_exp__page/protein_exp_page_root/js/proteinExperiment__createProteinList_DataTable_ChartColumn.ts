/**
 * proteinExperiment__createProteinList_DataTable_ChartColumn.ts
 *
 *  Chart Column Contents
 *
 */


import { loadGoogleChart_CoreChart }  from 'page_js/data_pages/data_pages_common/googleChartLoaderForThisWebapp';


/**
 * Create Table Columns
 */
export class ProteinExperiment__CreateProteinDataTable_ChartColumn_Class {

    private _inProgress_Timeout_Ids = new Set<number>();

    private _timerId_PopulateCell : number

    /**
     *
     */
    cancel_scheduledDOMUpdates() : void {
        for ( const timerId of this._inProgress_Timeout_Ids ) {
            window.clearTimeout(timerId)
        }
        this._inProgress_Timeout_Ids.clear();
    }

    ////////////////

    //    Create Chart in Protein List

    //  Create Chart - Initial callback after containing DOM element is mounted in DOM ( React: componentDidMount() )

    /**
     * Process the DOM Object in the cell handed from the Data Table React
     */
    PSMs_per_Condition_populateCellDOMObject_Initial(
        {
            cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial
        }:{
            cellMgmt_External_Data: any
            domObjectInCell: HTMLElement
            columnWidth: number
            columnHeightInitial: number
        }) : void {

        // console.log("_PSMs_per_Condition_populateCellDOMObject_Initial(...)")

        this._timerId_PopulateCell = window.setTimeout(() => {

            _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout({
                cellMgmt_External_Data,
                domObjectInCell,
                columnWidth,
                columnHeightInitial,
                cellMgmt_External_Data_InitialPopulation: undefined
            });

            this._inProgress_Timeout_Ids.delete( this._timerId_PopulateCell );

            this._timerId_PopulateCell = undefined;

        }, 10);

        this._inProgress_Timeout_Ids.add( this._timerId_PopulateCell );

        const cellMgmt_External_Data_InitialPopulation = cellMgmt_External_Data;

        // const cellMgmt_External_Data_NewValue_Callback = (params: DataTable_cellMgmt_External_PopulateResponse_NewValue_Callback_Params) => {
        //
        //     //  TODO  Check if data really changed.  Add true "equals" method to incoming data class and only do work if data changed, not just if object reference changed.
        //     //        This will reduce DOM updates when change protein grouping.
        //
        //     const cellMgmt_External_Data = params.cellMgmt_External_Data;
        //
        //     if (!cellMgmt_External_Data) {
        //         const msg = "proteinExperimentPage_Display.ts: _PSMs_per_Condition_populateCellDOMObject_Initial: cellMgmt_External_Data_NewValue_Callback: No Value for cellMgmt_External_Data. params(only shown in console): ";
        //         console.warn(msg, params);
        //         throw Error(msg);
        //     }
        //
        //     if (this._timerId_PopulateCell) {
        //
        //         this._inProgress_Timeout_Ids.delete( this._timerId_PopulateCell );
        //
        //         window.clearTimeout(this._timerId_PopulateCell)
        //     }
        //     this._timerId_PopulateCell = window.setTimeout(() => {
        //         _PSMs_per_Condition_CellCleanup({domObjectInCell});
        //
        //         _PSMs_per_Condition_populateCellDOMObject_Initial_AfterSetTimeout({
        //             cellMgmt_External_Data,
        //             domObjectInCell,
        //             columnWidth,
        //             columnHeightInitial,
        //             cellMgmt_External_Data_InitialPopulation
        //         });
        //     }, 10);
        //
        //     this._inProgress_Timeout_Ids.add( timerId_PopulateCell );
        // }
        //
        // //  Returned to Data Table code
        // const result = {
        //     //  Called before domObjectInCell removed from page.  Remove any contents and remove any listeners added to domObjectInCell
        //     domObjectInCell_RemoveContents_Callback: domObjectInCell_RemoveContents_Callback,
        //     //  Called when new value for cellMgmt_External_Data
        //     cellMgmt_External_Data_NewValue_Callback: cellMgmt_External_Data_NewValue_Callback
        // };
        //
        // return result;
    }


    domObjectInCell_RemoveContents_Callback({domObjectInCell}: {domObjectInCell: HTMLElement}) {

        if (this._timerId_PopulateCell) {

            this._inProgress_Timeout_Ids.delete(this._timerId_PopulateCell);

            window.clearTimeout(this._timerId_PopulateCell)
        }

        _PSMs_per_Condition_CellCleanup({domObjectInCell});
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
        cellMgmt_External_Data, domObjectInCell, columnWidth, columnHeightInitial, cellMgmt_External_Data_InitialPopulation
    }: {
        cellMgmt_External_Data: any
        domObjectInCell: any
        columnWidth: any
        columnHeightInitial: any
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
