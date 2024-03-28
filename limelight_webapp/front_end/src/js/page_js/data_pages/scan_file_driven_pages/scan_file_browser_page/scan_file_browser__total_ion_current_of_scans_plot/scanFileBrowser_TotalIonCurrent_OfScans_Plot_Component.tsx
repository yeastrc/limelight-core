/**
 * scanFileBrowser_TotalIonCurrent_OfScans_Plot_Component.tsx
 *
 * Scan File Browser -  Plot of Total Ion Current of Scans
 *
 */


import * as d3 from "d3";
import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";


const _CHART_WIDTH_MAIN_CONTENTS = 1000
const _CHART_WIDTH_LEFT_MARGIN = 40;
const _CHART_WIDTH_RIGHT_MARGIN = 40;
const _CHART_WIDTH_OVERALL = _CHART_WIDTH_MAIN_CONTENTS + _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_RIGHT_MARGIN;

const _CHART_HEIGHT_MAIN_CONTENTS = 200
const _CHART_HEIGHT_TOP_MARGIN = 20;
const _CHART_HEIGHT_BOTTOM_MARGIN = 40;
const _CHART_HEIGHT_OVERALL = _CHART_HEIGHT_MAIN_CONTENTS + _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_BOTTOM_MARGIN;


const _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER = 9;
const _TICK_MARK_LENGTH_MEDIUM_BETWEEN_NUMBER = 6;  // Whole Number marks on Horizontal axis.  4 marks between Main marks on vertical axis

const _TICK_MARK_TO_LABEL_SPACE_HORIZONTAL = 3; // Left of Main Chart area
const _TICK_MARK_TO_LABEL_SPACE_VERTICAL = 7;  //  Below Main Chart area

const _BIN_COUNT = _CHART_WIDTH_MAIN_CONTENTS;


const y_Value_Max_DEFAULT = 100;



/**
 *
 */
export interface ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_Params {

    projectScanFileId: number
    scanNumber: number
}

export type ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback =
    (params: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback_Params) => void



/**
 *
 */
export interface ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props {

    projectScanFileId: number

    scanLevels_ToDisplay: Set<number>

    scanNumber_Selected: number
    scanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
    scanNumber_Clicked_Callback: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_ScanNumber_Clicked_Callback
}

/**
 *
 */
interface ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_State {

    binned_Entries?: Binned_Entries_On_X_value_Root

    force_Rerender?: object
}

/**
 *
 */
export class ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component extends React.Component< ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props, ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_State > {

    //  bind to 'this' for passing as parameters
    private _main_Rect_overlay_MouseDown_Event_BindThis = this._main_Rect_overlay_MouseDown_Event.bind(this)
    private _window_MouseUp_Event_BindThis = this._window_MouseUp_Event.bind(this)
    // private _main_Rect_overlay_MouseUp_Event_BindThis = this._main_Rect_overlay_MouseUp_Event.bind(this)
    private _documentBody_MouseMove_Event__UpdateMainChartSelection_BindThis = this._documentBody_MouseMove_Event__UpdateMainChartSelection.bind(this);
    private _main_Rect_overlay_MouseMove_Event_BindThis = this._main_Rect_overlay_MouseMove_Event.bind(this)

    private readonly _main_Rect_overlay_Ref :  React.RefObject<SVGRectElement>
    private readonly _rect_SelectionCover_Ref :  React.RefObject<SVGRectElement>

    private _min_Max_X_Y_Values: Min_Max_X_Y_Values

    //  ONLY populated when zoom in
    private _selected_X_Y_Value: Selected_Min_Max_X_Y_Values

    private _main_Rect_overlay_MouseDown_PositionRelativeTo_Rect: { x: number, y: number, clientX: number, clientY: number }


    private _scanLevels_ToDisplay_PrevFromProps: Set<number>

    /**
     *
     */
    constructor(props: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props) {
        super(props);
        try {
            this._main_Rect_overlay_Ref = React.createRef();
            this._rect_SelectionCover_Ref = React.createRef();

            this._scanLevels_ToDisplay_PrevFromProps = new Set( props.scanLevels_ToDisplay )

            this._min_Max_X_Y_Values = _compute_Min_Max_X_Y_Values(props);

            const binned_Entries = _bin_Entries_On_X_value({ props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

            this.state = {
                binned_Entries, force_Rerender: {}
            };
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e
        }
    }

    /**
     *
     */
    componentDidMount() {

        this._add_Listener_window_MouseUp_Event()
    }

    componentWillUnmount() {

        this._remove_Listener_window_MouseUp_Event()
    }

    /**
     *
     */
    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props : ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props, state : ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_State ) {
    //
    //     // console.log("called: static getDerivedStateFromProps(): " );
    //
    //     //    Return new state (like return from setState(callback)) or null
    //
    //     return null;
    // }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props>, prevState: Readonly<ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_State>, snapshot?: any) {
        try {

            let scanLevels_ToDisplay_CHANGED = false
            {
                const prev_Copy = new Set( this._scanLevels_ToDisplay_PrevFromProps )

                for ( const scanLevel of this.props.scanLevels_ToDisplay ) {
                    if ( ! prev_Copy.has( scanLevel ) ) {
                        scanLevels_ToDisplay_CHANGED = true
                        break
                    }
                    prev_Copy.delete( scanLevel )
                }
                if ( ! scanLevels_ToDisplay_CHANGED ) {
                    if ( prev_Copy.size > 0 ) {
                        scanLevels_ToDisplay_CHANGED = true;
                    }
                }

                this._scanLevels_ToDisplay_PrevFromProps = new Set( this.props.scanLevels_ToDisplay )
            }

            if ( prevProps.scanData_NO_Peaks_Data_Holder !==
                this.props.scanData_NO_Peaks_Data_Holder
                || scanLevels_ToDisplay_CHANGED ) {

                this._selected_X_Y_Value = undefined; // Reset selection

                this._min_Max_X_Y_Values = _compute_Min_Max_X_Y_Values(this.props);

                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                this.setState({ binned_Entries })
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e
        }
    }

    /**
     *
     */
    private _main_Rect_overlay_MouseDown_Event(event: React.MouseEvent<SVGRectElement, MouseEvent>) {

        console.warn("Overlying <rect> Mouse Down. event: ", event)

        if ( ! this.state.binned_Entries ) {
            // No data in state
            return; // EARLY RETURN
        }
        if ( ! this._main_Rect_overlay_Ref.current ) {
            //  No target mounted
            return; // EARLY RETURN
        }

        this._add_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection();

        const target = this._main_Rect_overlay_Ref.current;

        const clientX = Math.round( event.clientX );
        const clientY = Math.round( event.clientY );

        const target_BoundingClientRect = target.getBoundingClientRect()
        const target_left = Math.round( target_BoundingClientRect.left )
        const target_top = Math.round( target_BoundingClientRect.top )

        const mouseDownPosition_X_RelativeToMainPlotArea = clientX - target_left;
        const mouseDownPosition_Y_RelativeToMainPlotArea = clientY - target_top;

        this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect = { x: mouseDownPosition_X_RelativeToMainPlotArea, y: mouseDownPosition_Y_RelativeToMainPlotArea, clientX, clientY }

        console.warn( "this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect: ", this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect )
    }

    /**
     *
     */
    private _add_Listener_window_MouseUp_Event() {

        console.warn("Enter: _add_Listener_window_MouseUp_Event()" )

        // const documentBody = document.querySelector('body');
        //
        // documentBody.addEventListener("mouseup", this._window_MouseUp_Event_BindThis )

        window.addEventListener("mouseup", this._window_MouseUp_Event_BindThis )
    }

    /**
     *
     */
    private _remove_Listener_window_MouseUp_Event() {

        console.warn("Enter: _remove_Listener_window_MouseUp_Event()" )

        // const documentBody = document.querySelector('body');
        //
        // documentBody.removeEventListener("mouseup", this._window_MouseUp_Event_BindThis )

        window.removeEventListener("mouseup", this._window_MouseUp_Event_BindThis )
    }

    /**
     *
     */
    private _window_MouseUp_Event(event: React.MouseEvent<SVGRectElement, MouseEvent>) {

        console.warn("window Mouse Up. event: ", event)

        this._general_mouseUp_Event(event);
    }

    //  NOT USED since not getting called
    // /**
    //  *
    //  */
    // private _main_Rect_overlay_MouseUp_Event(event: React.MouseEvent<SVGRectElement, MouseEvent>) {
    //
    //     throw Error("NOT USED since not getting called")
    //
    //
    //     console.warn("_main_Rect_overlay_MouseUp_Event called")
    //
    //     console.warn("Overlying <rect> Mouse Up. event: ", event)
    //
    //     // if ( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect ) {
    //     //
    //     //     const clientX = Math.round( event.clientX );
    //     //     const clientY = Math.round( event.clientY );
    //     //
    //     //     if ( Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.clientX - clientX ) <= 1 &&
    //     //         Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.clientY - clientY ) <= 1 ) {
    //     //
    //     //         console.warn( "Overlying <rect> Mouse Up: within 1 pixel so this is a click not a click and drag " )
    //     //
    //     //         return; // EARLY RETURN
    //     //     }
    //     // }
    //
    //     this._general_mouseUp_Event(event);
    // }

    /**
     *
     */
    private _general_mouseUp_Event(event: React.MouseEvent<SVGRectElement, MouseEvent>) {

        console.warn("_general_mouseUp_Event called")

        this._remove_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection();

        //  Hide Selection <rect>

        if ( this._rect_SelectionCover_Ref.current ) {  //  Set Left Side
            const width = ( 0 ).toString()
            this._rect_SelectionCover_Ref.current.setAttribute( "width", width );
        }

        if ( ! this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect ) {
            //  No "Mouse Down" stored data
            console.warn("General Mouse Up. Nothing in this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect")

            return; // EARLY RETURN
        }

        //  Remove Text Selection if dragged outside the component
        try {
            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                    window.getSelection().removeAllRanges();
                }
            } else {
                // @ts-ignore
                if (document.selection) {  // IE?
                    // @ts-ignore
                    document.selection.empty();
                }
            }
        } catch (e) {
            //  eat exception
        }

        if ( ! this.state.binned_Entries ) {
            // No data in state
            return; // EARLY RETURN
        }
        if ( ! this._main_Rect_overlay_Ref.current ) {
            //  No target mounted
            return; // EARLY RETURN
        }

        const target = this._main_Rect_overlay_Ref.current;

        const clientX = Math.round( event.clientX );
        const clientY = Math.round( event.clientY );

        const target_BoundingClientRect = target.getBoundingClientRect()
        const target_left = Math.round( target_BoundingClientRect.left )
        const target_top = Math.round( target_BoundingClientRect.top )

        let mouseUpPosition_X_RelativeToMainPlotArea = clientX - target_left;
        let mouseUpPosition_Y_RelativeToMainPlotArea = clientY - target_top;

        if ( Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x - mouseUpPosition_X_RelativeToMainPlotArea ) <= 2 &&
            Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.y - mouseUpPosition_Y_RelativeToMainPlotArea ) <= 2 ) {

            //  Mouse Down and Mouse Up in close enough position that it is considered a single click without drag so treat as click to select a position in the chart

            this._process_Display_Scan_At_Mouse_Click_Position({ mouseUpPosition_X_RelativeToMainPlotArea, mouseUpPosition_Y_RelativeToMainPlotArea });

            this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect = undefined;

            return; // EARLY RETURN
        }

        console.warn( "Dragged in X direction (Always Print): " + Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x - mouseUpPosition_X_RelativeToMainPlotArea )  )
        console.warn( "Dragged in Y direction (Always Print): " + Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.y - mouseUpPosition_Y_RelativeToMainPlotArea )  )

        if ( mouseUpPosition_X_RelativeToMainPlotArea < 0 ) {
            mouseUpPosition_X_RelativeToMainPlotArea = 0;
        }
        if ( mouseUpPosition_Y_RelativeToMainPlotArea < _CHART_HEIGHT_TOP_MARGIN ) {
            mouseUpPosition_Y_RelativeToMainPlotArea = _CHART_HEIGHT_TOP_MARGIN;
        }

        const _X_Axis_Close_To_Edge_ChangeToEdge_Pixels = 5;
        const _Y_Axis_Close_To_Edge_ChangeToEdge_Pixels = 10;

        const x_Position_Pixels = this._get_MinMax_Pixels_AccountFor_ChangeToEdgeWhenCloseToEdge({
            pixels_Input_1: this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x,
            pixels_Input_2: mouseUpPosition_X_RelativeToMainPlotArea,
            minEdge: _CHART_WIDTH_LEFT_MARGIN,
            maxEdge: _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS,
            close_To_Edge_ChangeToEdge_Pixels: _X_Axis_Close_To_Edge_ChangeToEdge_Pixels
        })

        const y_Position_Pixels = this._get_MinMax_Pixels_AccountFor_ChangeToEdgeWhenCloseToEdge({
            pixels_Input_1: mouseUpPosition_Y_RelativeToMainPlotArea,  //  Pass same value as both inputs
            pixels_Input_2: mouseUpPosition_Y_RelativeToMainPlotArea,  //  Pass same value as both inputs
            minEdge: _CHART_HEIGHT_TOP_MARGIN,
            maxEdge: _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS,
            close_To_Edge_ChangeToEdge_Pixels: _Y_Axis_Close_To_Edge_ChangeToEdge_Pixels
        })

        let x_value_Min_Existing = this._min_Max_X_Y_Values.x_value_MIN;

        if ( this._selected_X_Y_Value && this._selected_X_Y_Value.x_value_MIN !== undefined ) {
            x_value_Min_Existing = this._selected_X_Y_Value.x_value_MIN;
        }

        let y_Value_Max_Prev = y_Value_Max_DEFAULT;
        if ( this._selected_X_Y_Value && this._selected_X_Y_Value.y_value_MAX !== undefined ) {
            y_Value_Max_Prev = this._selected_X_Y_Value.y_value_MAX;
        }

        let x_value_MIN = x_value_Min_Existing + x_Position_Pixels.min_Pixels * this.state.binned_Entries.binSize_On_x_value // Matches Tick Marks
        let x_value_MAX = x_value_Min_Existing + x_Position_Pixels.max_Pixels * this.state.binned_Entries.binSize_On_x_value // Matches Tick Marks
        let y_value_MIN = y_Value_Max_Prev - Math.round( ( ( y_Position_Pixels.min_Pixels - _CHART_HEIGHT_TOP_MARGIN ) / _CHART_HEIGHT_MAIN_CONTENTS ) * y_Value_Max_Prev ) // Matches Tick Marks
        let y_value_MAX = y_Value_Max_Prev - Math.round( ( ( y_Position_Pixels.max_Pixels - _CHART_HEIGHT_TOP_MARGIN ) / _CHART_HEIGHT_MAIN_CONTENTS ) * y_Value_Max_Prev ) // Matches Tick Marks

        if ( y_value_MAX < 1 ) {
            y_value_MAX = 1;
        }

        if ( Number.isNaN( x_value_MIN ) ) {
            if ( x_Position_Pixels.min_Pixels === undefined ) {
                x_value_MIN = undefined;
            } else {
                x_value_MIN = _CHART_WIDTH_LEFT_MARGIN; //  TODO Not correct solution but better than leave NaN
                x_value_MAX = _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS;
            }
        }
        if ( Number.isNaN( x_value_MAX ) ) {
            if ( x_Position_Pixels.max_Pixels === undefined ) {
                x_value_MAX = undefined;
            } else {
                x_value_MIN = _CHART_WIDTH_LEFT_MARGIN; //  TODO Not correct solution but better than leave NaN
                x_value_MAX = _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS;
            }
        }
        if ( Number.isNaN( y_value_MIN ) ) {
            if ( y_Position_Pixels.min_Pixels === undefined ) {
                y_value_MIN = undefined;
            } else {
                y_value_MIN = _CHART_HEIGHT_TOP_MARGIN; //  TODO Not correct solution but better than leave NaN
                y_value_MAX = _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS;
            }
        }
        if ( Number.isNaN( y_value_MAX ) ) {
            if ( y_Position_Pixels.max_Pixels === undefined ) {
                y_value_MAX = undefined;
            } else {
                y_value_MIN = _CHART_HEIGHT_TOP_MARGIN; //  TODO Not correct solution but better than leave NaN
                y_value_MAX = _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS;
            }
        }

        this._selected_X_Y_Value = { x_value_MIN, x_value_MAX, y_value_MIN, y_value_MAX }

        const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

        this.setState({ binned_Entries })

        // console.warn( "Mouse Up.  : ", this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect )

        this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect = undefined;

    }

    /**
     *
     */
    private _get_MinMax_Pixels_AccountFor_ChangeToEdgeWhenCloseToEdge(
        {
            pixels_Input_1, pixels_Input_2, minEdge, maxEdge, close_To_Edge_ChangeToEdge_Pixels
        } : {
            pixels_Input_1: number
            pixels_Input_2: number
            minEdge: number
            maxEdge: number
            close_To_Edge_ChangeToEdge_Pixels: number
        }
    ) : {
        min_Pixels: number
        max_Pixels: number
    } {
        let min_Pixels = pixels_Input_1;
        let max_Pixels = pixels_Input_2;

        if ( min_Pixels > max_Pixels ) {
            //  flip
            const temp = max_Pixels;
            max_Pixels = min_Pixels;
            min_Pixels = temp;
        }

        if ( Math.abs( min_Pixels - minEdge ) < close_To_Edge_ChangeToEdge_Pixels ) {
            min_Pixels = undefined
        }
        if ( Math.abs( max_Pixels - maxEdge ) < close_To_Edge_ChangeToEdge_Pixels ) {
            max_Pixels = undefined
        }

        return { max_Pixels, min_Pixels }
    }

    /**
     * Mouse Down and Mouse Up in close enough position that it is considered a single click without drag so treat as click to select a position in the chart
     *
     * if this.props.lineInPlot_Clicked_Callback has a value, call with binned_Entry_atPosition.entry_UseFor_Y_Value_ForPlot
     */
    private _process_Display_Scan_At_Mouse_Click_Position(
        {
            mouseUpPosition_X_RelativeToMainPlotArea, mouseUpPosition_Y_RelativeToMainPlotArea
        } : {
            mouseUpPosition_X_RelativeToMainPlotArea: number
            mouseUpPosition_Y_RelativeToMainPlotArea: number
        }
    ) {
        if ( ! this.props.scanNumber_Clicked_Callback ) {

            //  No callback so skip

            return;  // EARLY RETURN
        }

        let mouseUpPosition_X_RelativeToMainPlotArea__InProgress = mouseUpPosition_X_RelativeToMainPlotArea

        let binned_Entry_atPosition = this.state.binned_Entries.entries[ mouseUpPosition_X_RelativeToMainPlotArea__InProgress ]

        while ( mouseUpPosition_X_RelativeToMainPlotArea__InProgress >= 0 && ( ! binned_Entry_atPosition ) ) {
            mouseUpPosition_X_RelativeToMainPlotArea__InProgress--
            binned_Entry_atPosition = this.state.binned_Entries.entries[ mouseUpPosition_X_RelativeToMainPlotArea__InProgress ]
        }

        if ( ! binned_Entry_atPosition ) {

            mouseUpPosition_X_RelativeToMainPlotArea__InProgress = mouseUpPosition_X_RelativeToMainPlotArea

            while ( mouseUpPosition_X_RelativeToMainPlotArea__InProgress < this.state.binned_Entries.entries.length && ( ! binned_Entry_atPosition ) ) {
                binned_Entry_atPosition = this.state.binned_Entries.entries[ mouseUpPosition_X_RelativeToMainPlotArea__InProgress ]
                mouseUpPosition_X_RelativeToMainPlotArea__InProgress++
            }
        }

        if ( ! binned_Entry_atPosition ) {
            //  No entry at index
            this.props.scanNumber_Clicked_Callback({ scanNumber: null, projectScanFileId: null })
            return; // EARLY RETURN
        }

        console.warn("Selected entry scanNumber: " + binned_Entry_atPosition.entry_UseFor_Y_Value_ForPlot.scanNumber )

        this.props.scanNumber_Clicked_Callback({
            scanNumber: binned_Entry_atPosition.entry_UseFor_Y_Value_ForPlot.scanNumber,
            projectScanFileId: this.props.projectScanFileId
        })
    }

    /**
     *  Add listener to <body>  _documentBody_MouseMove_Event__UpdateMainChartSelection
     */
    private _add_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection() {

        console.warn("_add_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection called")

        const documentBody = document.querySelector('body');

        //  Remove first so don't have duplicate.
        documentBody.removeEventListener("mousemove", this._documentBody_MouseMove_Event__UpdateMainChartSelection_BindThis )

        documentBody.addEventListener("mousemove", this._documentBody_MouseMove_Event__UpdateMainChartSelection_BindThis )
    }

    /**
     * Remove listener to <body>  _documentBody_MouseMove_Event__UpdateMainChartSelection
     */
    private _remove_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection() {

        console.warn("_remove_Listener_documentBody_MouseMove_Event__UpdateMainChartSelection called")

        const documentBody = document.querySelector('body');
        documentBody.removeEventListener("mousemove", this._documentBody_MouseMove_Event__UpdateMainChartSelection_BindThis )
    }

    /**
     * Only added to <body> on Mouse Down and Removed on Mouse Up
     */
    private _documentBody_MouseMove_Event__UpdateMainChartSelection(event: React.MouseEvent<SVGRectElement, MouseEvent>) {

        console.warn("ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component: _window_MouseMove_Event__UpdateMainChartSelection: window Mouse Move. event: ", event)

        if ( ! this.state.binned_Entries ) {
            // No data in state
            return; // EARLY RETURN
        }
        if ( ! this._main_Rect_overlay_Ref.current ) {
            //  No target mounted
            return; // EARLY RETURN
        }

        if ( ! this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect ) {
            //  No "Mouse Down" stored data
            console.warn("ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component: _documentBody_MouseMove_Event__UpdateMainChartSelection: document <body> Mouse Move. Nothing in this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect")

            return; // EARLY RETURN
        }

        const target = this._main_Rect_overlay_Ref.current;

        const clientX = Math.round( event.clientX );
        const clientY = Math.round( event.clientY );

        const target_BoundingClientRect = target.getBoundingClientRect()
        const target_left = Math.round( target_BoundingClientRect.left )
        const target_top = Math.round( target_BoundingClientRect.top )

        const mouseMovePosition_X_RelativeToMainPlotArea = clientX - target_left;
        const mouseMovePosition_Y_RelativeToMainPlotArea = clientY - target_top;

        if ( ! this._rect_SelectionCover_Ref.current ) {
            //  No _rect_SelectionCover_Ref mounted
            return; // EARLY RETURN
        }

        //  Update selection cover
        let leftEdge = this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x;
        let rightEdge = mouseMovePosition_X_RelativeToMainPlotArea;

        if ( rightEdge < leftEdge ) {
            // Flip
            const temp = leftEdge;
            leftEdge = rightEdge;
            rightEdge = temp;
        }

        if ( leftEdge < 0 ) {
            leftEdge = 0;
        }

        const x = ( _CHART_WIDTH_LEFT_MARGIN + 1 ) + leftEdge;
        const x_String = x.toString()
        let width = rightEdge - leftEdge;
        if ( width > _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS ) {
            width = _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS;
        }
        if ( width < 0 ) {
            width = 0;
        }
        const width_String = width.toString()
        this._rect_SelectionCover_Ref.current.setAttribute( "x", x_String );
        this._rect_SelectionCover_Ref.current.setAttribute( "width", width_String );


        const y = Math.round( mouseMovePosition_Y_RelativeToMainPlotArea );
        const y_String = y.toString()
        let height = ( _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS ) - ( y );
        if ( height < 0 ) {
            height = 0;
        }
        const height_String = height.toString()
        this._rect_SelectionCover_Ref.current.setAttribute( "y", y_String );
        this._rect_SelectionCover_Ref.current.setAttribute( "height", height_String );

        console.warn("Selection rectangle Change on Mouse Move: x: " + x + ", width: " + width + ", y: " + y + ", height: " + height )

        console.warn( "mouseMovePosition_X_RelativeToMainPlotArea: " + mouseMovePosition_X_RelativeToMainPlotArea )
        console.warn( "mouseMovePosition_Y_RelativeToMainPlotArea: " + mouseMovePosition_Y_RelativeToMainPlotArea )

        // this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect = { x: mouseDownPosition_X_RelativeToMainPlotArea, y: mouseDownPosition_Y_RelativeToMainPlotArea }

        // console.warn( "Mouse Up.  : ", this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect )
    }

    /**
     *  Use when show something on mouse move like a tooltip showing current position or data at current mouse position
     */
    private _main_Rect_overlay_MouseMove_Event(event: React.MouseEvent<SVGRectElement, MouseEvent>) {

        // console.warn("Overlying <rect> Mouse Move. event: ", event)

        if ( ! this.state.binned_Entries ) {
            // No data in state
            return; // EARLY RETURN
        }
        if ( ! this._main_Rect_overlay_Ref.current ) {
            //  No target mounted
            return; // EARLY RETURN
        }

        // const target = this._main_Rect_overlay_Ref.current;
        //
        // const clientX = Math.round( event.clientX );
        // const clientY = Math.round( event.clientY );
        //
        // const target_BoundingClientRect = target.getBoundingClientRect()
        // const target_left = Math.round( target_BoundingClientRect.left )
        // const target_top = Math.round( target_BoundingClientRect.top )
        //
        // const mouseMovePosition_X_RelativeToMainPlotArea = clientX - target_left;
        // const mouseMovePosition_Y_RelativeToMainPlotArea = clientY - target_top;

        // if ( ! this._rect_FollowMouse_Ref.current ) {
        //     //  No _rect_FollowMouse_Ref mounted
        //     return; // EARLY RETURN
        // }
        //
        // const rect_FollowMouseMove_X = ( mouseMovePosition_X_RelativeToMainPlotArea + _CHART_WIDTH_LEFT_MARGIN ).toString()
        // const rect_FollowMouseMove_Y = ( mouseMovePosition_Y_RelativeToMainPlotArea ).toString()
        //
        // this._rect_FollowMouse_Ref.current.setAttribute( "x", rect_FollowMouseMove_X );
        // this._rect_FollowMouse_Ref.current.setAttribute( "y", rect_FollowMouseMove_Y );
        //
        // console.warn( "mouseMovePosition_X_RelativeToMainPlotArea: " + mouseMovePosition_X_RelativeToMainPlotArea )
        // console.warn( "mouseMovePosition_Y_RelativeToMainPlotArea: " + mouseMovePosition_Y_RelativeToMainPlotArea )
        //
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let x_Value_Min = this._min_Max_X_Y_Values.x_value_MIN;
        let x_Value_Max = this._min_Max_X_Y_Values.x_value_MAX;

        //  Update for selected
        if ( this._selected_X_Y_Value !== undefined && this._selected_X_Y_Value.x_value_MIN !== undefined ) {
            x_Value_Min = this._selected_X_Y_Value.x_value_MIN;
        }
        if ( this._selected_X_Y_Value !== undefined && this._selected_X_Y_Value.x_value_MAX !== undefined ) {
            x_Value_Max = this._selected_X_Y_Value.x_value_MAX;
        }

        if ( x_Value_Min > x_Value_Max ) {
            //  min > max so put back to computed min/max
            x_Value_Min = this._min_Max_X_Y_Values.x_value_MIN;
            x_Value_Max = this._min_Max_X_Y_Values.x_value_MAX;
        }

        const _y_Value_Max_CEIL_10_MIN_VALUE = 30;

        let y_Value_Min = 0;
        let y_Value_Max = y_Value_Max_DEFAULT;

        if ( this._selected_X_Y_Value !== undefined && this._selected_X_Y_Value.y_value_MAX !== undefined ) {
            y_Value_Max = this._selected_X_Y_Value.y_value_MAX;

            if ( y_Value_Max >= _y_Value_Max_CEIL_10_MIN_VALUE ) {
                const div10_Ceil = Math.ceil(y_Value_Max / 10);
                y_Value_Max = div10_Ceil * 10;
            }
        }

        try {
            const svg_VerticalAxis_TickMarks: Array<JSX.Element> = [];

            const svg_HorizontalAxis_TickMarks: Array<JSX.Element> = [];

            const svg_ScanMaxLines: Array<JSX.Element> = [];

            {
                {  //  Tick Marks on Vertical Axis

                    // populate svg_VerticalAxis_TickMarks

                    let tickMark_Points_WithNumbers_from_d3_Array: Array<number>

                    if ( y_Value_Max === y_Value_Max_DEFAULT ) {

                        tickMark_Points_WithNumbers_from_d3_Array = [0, y_Value_Max_DEFAULT / 2, y_Value_Max_DEFAULT]

                    } else if ( y_Value_Max >= _y_Value_Max_CEIL_10_MIN_VALUE ) {

                        tickMark_Points_WithNumbers_from_d3_Array = [0, y_Value_Max / 2, y_Value_Max]

                    } else  {
                        let tickMark_Count_Main = 4;
                        //  Copy here since 'ts-ignore'
                        const tickMarks_Start = y_Value_Min
                        const tickMarks_End = y_Value_Max

                        tickMark_Points_WithNumbers_from_d3_Array = d3.ticks(tickMarks_Start, tickMarks_End, tickMark_Count_Main)
                        if ( tickMark_Points_WithNumbers_from_d3_Array.length > tickMark_Count_Main + 1 ) {
                            //  Too many tick marks
                            tickMark_Count_Main = 3
                            tickMark_Points_WithNumbers_from_d3_Array = d3.ticks(tickMarks_Start, tickMarks_End, tickMark_Count_Main)
                        }
                    }

                    tickMark_Points_WithNumbers_from_d3_Array = tickMark_Points_WithNumbers_from_d3_Array.reverse(); //  reverse so smallest Pixel position is processed first

                    const tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array: Array<number> = [] //  Largest Number is first !!!

                    {
                        //  Main Tick Marks with numbers

                        for ( const tickMark_Point of tickMark_Points_WithNumbers_from_d3_Array ) {

                            let tickMark_Point_String = tickMark_Point.toString();

                            {
                                const decimalPointIndex = tickMark_Point_String.indexOf(".");
                                if ( decimalPointIndex > -1 ) {

                                    //  Round to 1 decimal places if more than 1 decimal places

                                    let roundingTo = 1;

                                    // if ( ( y_Value_Max - y_Value_Min ) < 1 ) {
                                    //     roundingTo = 4;
                                    // }

                                    if ( tickMark_Point_String.length > decimalPointIndex + roundingTo + 1 ) {
                                        tickMark_Point_String = tickMark_Point.toFixed( roundingTo );
                                    }
                                }
                            }

                            const tickMark_Y = Math.round(
                                _CHART_HEIGHT_TOP_MARGIN +
                                ( ( ( ( y_Value_Max - ( tickMark_Point - y_Value_Min ) ) / ( y_Value_Max - y_Value_Min ) ) * _CHART_HEIGHT_MAIN_CONTENTS ) )
                            );

                            if ( Number.isNaN( tickMark_Y ) ) {
                                //  isNan so skip
                                continue; // EARLY CONTINUE
                            }

                            if ( tickMark_Y < _CHART_HEIGHT_TOP_MARGIN || tickMark_Y > ( _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS ) ) {
                                // Tick mark position outside of main chart area so skip
                                continue; // EARLY CONTINUE
                            }

                            tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array.push( tickMark_Y )

                            {
                                const element = (
                                    <line
                                        key={ "line_" + tickMark_Point }
                                        x1={ _CHART_WIDTH_LEFT_MARGIN - _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER - 1 } x2={ _CHART_WIDTH_LEFT_MARGIN }
                                        y1={ tickMark_Y } y2={ tickMark_Y }
                                        stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                    ></line>
                                )
                                svg_VerticalAxis_TickMarks.push( element )
                            }
                            {
                                const element = (
                                    <text
                                        key={ "text_" + tickMark_Point }
                                        x={ _CHART_WIDTH_LEFT_MARGIN - _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER - _TICK_MARK_TO_LABEL_SPACE_HORIZONTAL }
                                        y={ tickMark_Y }
                                        textAnchor="end"
                                        dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                    >
                                        <tspan
                                            textAnchor="end"
                                            dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            { tickMark_Point_String }
                                        </tspan>
                                    </text>
                                )
                                svg_VerticalAxis_TickMarks.push( element )
                            }
                        }
                    }
                    {
                        // Tick Marks without numbers

                        const tickMark_Points_Without_Numbers_Y_Position_Pixel_Array: Array<number> = []

                        if ( tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array.length > 1 ) {

                            let tickMark_Count = 5;

                            if ( ( y_Value_Max / 10 ) % 2 === 0 ) {
                                // even number after divide by 10
                                tickMark_Count = 4;
                            }

                            {
                                //  Create for above top tick mark with numbers

                                //  pixels between first 2 tick marks
                                const tickMark_WithNumbers_Spacing = tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[1] - tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[0];
                                const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[0] - tickMarks_NoNumbers_Spacing;
                                      tickMark_Position >= _CHART_HEIGHT_TOP_MARGIN;
                                      tickMark_Position -= tickMarks_NoNumbers_Spacing ) {

                                    tickMark_Points_Without_Numbers_Y_Position_Pixel_Array.push( Math.round( tickMark_Position ) );
                                }
                            }
                            {
                                const tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array_Length_Minus_1 = tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array.length - 1;
                                for ( let index_BottomTickMark = 0; index_BottomTickMark < tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array_Length_Minus_1; index_BottomTickMark++ ) {

                                    //  Create for between each tick marks with numbers

                                    //  pixels between 2 tick marks
                                    const tickMark_WithNumbers_Spacing =
                                        tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ index_BottomTickMark + 1 ] -
                                        tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ index_BottomTickMark ];
                                    const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                    for ( let tickMark_Counter = 1; tickMark_Counter < tickMark_Count; tickMark_Counter++ ) {

                                        const tickMark_Position = Math.round( tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ index_BottomTickMark ] +
                                            ( tickMark_Counter * tickMarks_NoNumbers_Spacing ) )
                                        tickMark_Points_Without_Numbers_Y_Position_Pixel_Array.push( tickMark_Position );
                                    }
                                }
                            }
                        }

                        for ( const tickMark_Points_Without_Numbers_Y_Position_Pixel of tickMark_Points_Without_Numbers_Y_Position_Pixel_Array ) {

                            const tickMark_Y = tickMark_Points_Without_Numbers_Y_Position_Pixel

                            {
                                const element = (
                                    <line
                                        key={ "line_nonum_" + tickMark_Y }
                                        x1={ _CHART_WIDTH_LEFT_MARGIN - _TICK_MARK_LENGTH_MEDIUM_BETWEEN_NUMBER - 1 }
                                        x2={ _CHART_WIDTH_LEFT_MARGIN }
                                        y1={ tickMark_Y }
                                        y2={ tickMark_Y }
                                        stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                    ></line>
                                )
                                svg_VerticalAxis_TickMarks.push( element )
                            }
                        }
                    }
                }
            }

            if ( this.state.binned_Entries ) {

                {  //  Tick Marks on Horizontal Axis

                    // populate svg_HorizontalTickMarks

                    let tickMark_Points_WithNumbers_from_d3_Array: Array<number>

                    {
                        let tickMark_Count_Main = 15;
                        //  Copy here since 'ts-ignore'
                        const tickMarks_Start = x_Value_Min
                        const tickMarks_End = x_Value_Max

                        tickMark_Points_WithNumbers_from_d3_Array = d3.ticks(tickMarks_Start, tickMarks_End, tickMark_Count_Main)
                        if ( tickMark_Points_WithNumbers_from_d3_Array.length > tickMark_Count_Main + 2 ) {
                            //  Too many tick marks
                            tickMark_Count_Main = 11
                            tickMark_Points_WithNumbers_from_d3_Array = d3.ticks(tickMarks_Start, tickMarks_End, tickMark_Count_Main)
                        }
                    }

                    const tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array: Array<number> = []

                    {
                        //  Main Tick Marks with numbers

                        for ( const tickMark_Point of tickMark_Points_WithNumbers_from_d3_Array ) {

                            let tickMark_Point_String = tickMark_Point.toString();

                            {
                                const decimalPointIndex = tickMark_Point_String.indexOf(".");
                                if ( decimalPointIndex > -1 ) {

                                    //  Round to 3 or 4 decimal places if more than 3 or 4 decimal places

                                    let roundingTo = 3;

                                    if ( ( x_Value_Max - x_Value_Min ) < 1 ) {
                                        roundingTo = 4;
                                    }

                                    if ( tickMark_Point_String.length > decimalPointIndex + roundingTo + 1 ) {
                                        tickMark_Point_String = tickMark_Point.toFixed( roundingTo );
                                    }
                                }
                            }

                            const tickMark_X = Math.round(
                                _CHART_WIDTH_LEFT_MARGIN +
                                ( ( tickMark_Point - x_Value_Min ) / this.state.binned_Entries.binSize_On_x_value )
                            );

                            if ( Number.isNaN( tickMark_X ) ) {
                                //  isNan so skip
                                continue; // EARLY CONTINUE
                            }

                            if ( tickMark_X < _CHART_WIDTH_LEFT_MARGIN || tickMark_X > ( _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS ) ) {
                                // Tick mark position outside of main chart area so skip
                                continue; // EARLY CONTINUE
                            }

                            tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array.push( tickMark_X )

                            {
                                const element = (
                                    <line
                                        key={ "line_" + tickMark_Point }
                                        x1={ tickMark_X } x2={ tickMark_X }
                                        y1={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS } y2={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS + _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER }
                                        stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                    ></line>
                                )
                                svg_HorizontalAxis_TickMarks.push( element )
                            }
                            {
                                const element = (
                                    <text
                                        key={ "text_" + tickMark_Point }
                                        x={ tickMark_X }
                                        y={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS + _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER + _TICK_MARK_TO_LABEL_SPACE_VERTICAL }
                                        textAnchor="middle"
                                        dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                    >
                                        <tspan
                                            textAnchor="middle"
                                            dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            { tickMark_Point_String }
                                        </tspan>
                                    </text>
                                )
                                svg_HorizontalAxis_TickMarks.push( element )
                            }
                        }
                    }

                    {
                        // Tick Marks without numbers between each with numbers - 4 marks ( 5 spaces) between each mark with numbers

                        const tickMark_Points_Without_Numbers_X_Position_Pixel_Array: Array<number> = []

                        if ( tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array.length > 1 ) {

                            const tickMark_Count = 5;

                            {
                                //  Create for before first tick mark with numbers

                                //  pixels between first 2 tick marks
                                const tickMark_WithNumbers_Spacing = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[1] - tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[0];
                                const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[0] - tickMarks_NoNumbers_Spacing;
                                      tickMark_Position >= _CHART_WIDTH_LEFT_MARGIN;
                                      tickMark_Position -= tickMarks_NoNumbers_Spacing ) {

                                    tickMark_Points_Without_Numbers_X_Position_Pixel_Array.push( Math.round( tickMark_Position ) );
                                }
                            }
                            {
                                //  Create for after last tick mark with numbers

                                //  pixels between last 2 tick marks
                                const wn_length = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array.length;

                                const tickMark_WithNumbers_Spacing =
                                    tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ wn_length - 1 ] -
                                    tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ wn_length - 2 ];
                                const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ wn_length - 1 ] + tickMarks_NoNumbers_Spacing;
                                      tickMark_Position <= _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS;
                                      tickMark_Position += tickMarks_NoNumbers_Spacing ) {

                                    tickMark_Points_Without_Numbers_X_Position_Pixel_Array.push( Math.round( tickMark_Position ) );
                                }
                            }
                            {
                                const tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array_Length_Minus_1 = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array.length - 1;
                                for ( let index_LeftTickMark = 0; index_LeftTickMark < tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array_Length_Minus_1; index_LeftTickMark++ ) {

                                    //  Create for between each tick marks with numbers

                                    //  pixels between 2 tick marks
                                    const tickMark_WithNumbers_Spacing =
                                        tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ index_LeftTickMark + 1 ] -
                                        tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ index_LeftTickMark ];
                                    const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                    for ( let tickMark_Counter = 1; tickMark_Counter < tickMark_Count; tickMark_Counter++ ) {

                                        const tickMark_Position = Math.round( tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ index_LeftTickMark ] +
                                            ( tickMark_Counter * tickMarks_NoNumbers_Spacing ) )
                                        tickMark_Points_Without_Numbers_X_Position_Pixel_Array.push( tickMark_Position );
                                    }
                                }
                            }
                        }

                        for ( const tickMark_Points_Without_Numbers_X_Position_Pixel of tickMark_Points_Without_Numbers_X_Position_Pixel_Array ) {

                            const tickMark_X = tickMark_Points_Without_Numbers_X_Position_Pixel

                            {
                                const element = (
                                    <line
                                        key={ "line_nonum_" + tickMark_X }
                                        x1={ tickMark_X } x2={ tickMark_X }
                                        y1={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS } y2={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS + _TICK_MARK_LENGTH_MEDIUM_BETWEEN_NUMBER }
                                        stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                    ></line>
                                )
                                svg_HorizontalAxis_TickMarks.push( element )
                            }
                        }

                    }

                }

                // populate svg_ScanMaxLines

                //  Lines for each binned entry

                const LINE_FULL_HEIGHT = _CHART_HEIGHT_MAIN_CONTENTS;
                const LINE_BOTTOM_POSITION = LINE_FULL_HEIGHT + _CHART_HEIGHT_TOP_MARGIN;

                const binned_Entries_Entries = this.state.binned_Entries.entries

                const y_Value_Max_FractionOf_Default  = y_Value_Max / y_Value_Max_DEFAULT


                let prev_Y_Value = undefined

                for (let binIndex = 0; binIndex < this.state.binned_Entries.entries.length; binIndex++) {

                    const binEntry = binned_Entries_Entries[binIndex]
                    if ( ! binEntry) {
                        continue; // EARLY CONTINUE
                    }

                    let y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = binEntry.y_value_FractionOfMax / y_Value_Max_FractionOf_Default;

                    //   NEW:  Draw line from one peak to the next.   Comment Out "clip at 1"

                    // if ( y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value > 1 ) {
                    //     y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = 1;  // clip at 1
                    // }


                    if ( y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value < 0 ) {
                        y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = 0;  // clip at 0
                    }

                    const line_X = binIndex + 1 + _CHART_WIDTH_LEFT_MARGIN;
                    let line_Y_1 = LINE_BOTTOM_POSITION - Math.round( LINE_FULL_HEIGHT * y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value );

                    if ( line_Y_1 === LINE_BOTTOM_POSITION ) {
                        line_Y_1 = LINE_BOTTOM_POSITION - 1; // Min height of 1 px
                    }

                    //   NEW:  Draw line from one peak to the next

                    if ( prev_Y_Value !== undefined ) {

                        const element = (
                            <line key={ binIndex } x1={ line_X - 1 } x2={ line_X } y1={ prev_Y_Value } y2={ line_Y_1 } stroke="#000000" fill="none" style={ { strokeWidth: 1 } }></line>
                        )

                        svg_ScanMaxLines.push( element )
                    }

                    prev_Y_Value = line_Y_1


                    //  OLD

                    // const line_Y_2 = LINE_BOTTOM_POSITION
                    //
                    // const element = (
                    //     <line key={ binIndex } x1={ line_X } x2={ line_X } y1={ line_Y_1 } y2={ line_Y_2 } stroke="#000000" fill="none" style={ { strokeWidth: 1 } }></line>
                    // )
                    //
                    // svg_ScanMaxLines.push( element )
                }
            }

            //  Line at Selected Scan Number

            let lineAt_SelectedPosition_X_Element: JSX.Element

            if ( this.state.binned_Entries && this.props.scanNumber_Selected !== undefined && this.props.scanNumber_Selected !== null ) {

                const spectralStorage_NO_Peaks_DataFor_ScanNumber =
                    this.props.scanData_NO_Peaks_Data_Holder.scanData.
                    get_ScanData_NO_Peaks_For_ScanNumber(this.props.scanNumber_Selected);

                if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                    const msg = "this.props.scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(this.props.scanNumber_Selected); returned NOTHING for this.props.scanNumber_Selected: " + this.props.scanNumber_Selected;
                    console.warn(msg)
                    throw Error(msg);
                }

                const retentionTime_Minutes = spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds / 60

                const lineAt_SelectedPosition_X_RelativeToMainPlotArea = Math.round(
                    _CHART_WIDTH_LEFT_MARGIN +
                    ( ( retentionTime_Minutes - x_Value_Min ) / this.state.binned_Entries.binSize_On_x_value )
                );

                if ( lineAt_SelectedPosition_X_RelativeToMainPlotArea > ( _CHART_WIDTH_LEFT_MARGIN ) &&
                    lineAt_SelectedPosition_X_RelativeToMainPlotArea < ( _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS ) ) {

                    lineAt_SelectedPosition_X_Element = (
                        <line
                            stroke="#FF0000" fill="none" style={{strokeWidth: 1}}
                            x1={lineAt_SelectedPosition_X_RelativeToMainPlotArea}
                            x2={lineAt_SelectedPosition_X_RelativeToMainPlotArea}
                            y1={_CHART_HEIGHT_TOP_MARGIN}
                            y2={_CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS}
                        />
                    )
                }
            }

            return (
                <div >
                    {/*
                    <div>
                        ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component
                    </div>
                    <div>
                        <span>X Min value: </span>
                        <input
                            onChange={ event => {
                                const inputValue = event.target.value
                                if ( inputValue === "" )  {

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.x_value_MIN = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })
                                    return
                                }
                                const inputValueNumber = Number.parseFloat( inputValue );
                                if ( Number.isNaN(inputValueNumber) ) {
                                    console.warn( "Min: if ( Number.isNaN(inputValueNumber) )")

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.x_value_MIN = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })
                                    return
                                }

                                if ( this._selected_X_Y_Value ) {
                                    this._selected_X_Y_Value.x_value_MIN = inputValueNumber;
                                } else {
                                    this._selected_X_Y_Value = { x_value_MIN: inputValueNumber, x_value_MAX: undefined, y_value_MIN: undefined, y_value_MAX: undefined }
                                }

                                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                this.setState({ binned_Entries })
                            }}
                        />
                        { this._selected_X_Y_Value === undefined || this._selected_X_Y_Value.x_value_MIN === undefined ?
                            "Not Set"
                            : this._selected_X_Y_Value.x_value_MIN }
                    </div>
                    <div>
                        <span>X Max value: </span>
                        <input
                            onChange={ event => {
                                const inputValue = event.target.value
                                if ( inputValue === "" )  {

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.x_value_MAX = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })

                                    return
                                }

                                const inputValueNumber = Number.parseFloat( inputValue );
                                if ( Number.isNaN(inputValueNumber) ) {
                                    console.warn( "Max: if ( Number.isNaN(inputValueNumber) )")

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.x_value_MAX = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })

                                    return
                                }

                                if ( this._selected_X_Y_Value ) {
                                    this._selected_X_Y_Value.x_value_MAX = inputValueNumber;
                                } else {
                                    this._selected_X_Y_Value = { x_value_MAX: inputValueNumber, x_value_MIN: undefined, y_value_MIN: undefined, y_value_MAX: undefined }
                                }

                                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                this.setState({ binned_Entries })
                            }}
                        />
                        { this._selected_X_Y_Value === undefined || this._selected_X_Y_Value.x_value_MAX === undefined ? "Not Set" : this._selected_X_Y_Value.x_value_MAX }
                    </div>

                    <div>
                        <span>Y Min value: </span>
                        <input
                            onChange={ event => {
                                const inputValue = event.target.value
                                if ( inputValue === "" )  {

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.y_value_MIN = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })
                                    return
                                }
                                const inputValueNumber = Number.parseFloat( inputValue );
                                if ( Number.isNaN(inputValueNumber) ) {
                                    console.warn( "Min: if ( Number.isNaN(inputValueNumber) )")

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.y_value_MIN = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })
                                    return
                                }

                                if ( this._selected_X_Y_Value ) {
                                    this._selected_X_Y_Value.y_value_MIN = inputValueNumber;
                                } else {
                                    this._selected_X_Y_Value = { y_value_MIN: inputValueNumber, y_value_MAX: undefined, x_value_MIN: undefined, x_value_MAX: undefined }
                                }

                                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                this.setState({ binned_Entries })
                            }}
                        />
                        { this._selected_X_Y_Value === undefined || this._selected_X_Y_Value.y_value_MIN === undefined ?
                            "Not Set"
                            : this._selected_X_Y_Value.y_value_MIN }
                    </div>
                    <div>
                        <span>Y Max value: </span>
                        <input
                            onChange={ event => {
                                const inputValue = event.target.value
                                if ( inputValue === "" )  {

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.y_value_MAX = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })

                                    return
                                }

                                const inputValueNumber = Number.parseFloat( inputValue );
                                if ( Number.isNaN(inputValueNumber) ) {
                                    console.warn( "Max: if ( Number.isNaN(inputValueNumber) )")

                                    if ( this._selected_X_Y_Value ) {
                                        this._selected_X_Y_Value.y_value_MAX = undefined;
                                    }

                                    const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                    this.setState({ binned_Entries })

                                    return
                                }

                                if ( this._selected_X_Y_Value ) {
                                    this._selected_X_Y_Value.y_value_MAX = inputValueNumber;
                                } else {
                                    this._selected_X_Y_Value = { y_value_MAX: inputValueNumber, y_value_MIN: undefined, x_value_MIN: undefined, x_value_MAX: undefined }
                                }

                                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                this.setState({ binned_Entries })
                            }}
                        />
                        { this._selected_X_Y_Value === undefined || this._selected_X_Y_Value.y_value_MAX === undefined ? "Not Set" : this._selected_X_Y_Value.y_value_MAX }
                    </div>
*/}
                    <div>
                        <button
                            onClick={ event => {

                                this._selected_X_Y_Value = undefined

                                const binned_Entries = _bin_Entries_On_X_value({ props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values, selected_X_Y_Value: this._selected_X_Y_Value })

                                this.setState({ binned_Entries })
                            }}
                        >
                            Clear Zoom
                        </button>
                    </div>

                    <div

                        onClick={ event => { console.warn("<div> containing <svg> On Click") } }
                    >
                        <svg width={ _CHART_WIDTH_OVERALL } height={ _CHART_HEIGHT_OVERALL } style={ { margin: 0, padding: 0 } }>

                            {/* REMOVED -- Rect under the main chart area  */}
                            {/*<rect*/}
                            {/*    x={ _CHART_WIDTH_LEFT_MARGIN + 1 } y={ 0 - 1 } width={ _CHART_WIDTH_MAIN_CONTENTS - 1 } height={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS }*/}
                            {/*    fill="#EEEEEE"*/}
                            {/*/>*/}

                            {/*  Line and Tick Marks on Left Side  */}

                            {/*  Line on left side  */}
                            <line
                                x1={ _CHART_WIDTH_LEFT_MARGIN } x2={ _CHART_WIDTH_LEFT_MARGIN }
                                y1={ _CHART_HEIGHT_TOP_MARGIN } y2={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS }
                                stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                            ></line>

                            { svg_VerticalAxis_TickMarks }

                            {/*  -----------  */}

                            {/*  Line and Tick Marks on Bottom  */}

                            {/*  Line on bottom side*/}
                            <line
                                x1={ _CHART_WIDTH_LEFT_MARGIN - 1 } x2={ _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_MAIN_CONTENTS }
                                y1={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS } y2={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS }
                                stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                            ></line>

                            { svg_HorizontalAxis_TickMarks }

                            {/*  X Axis Label under chart   */}

                            <text
                                x={ _CHART_WIDTH_LEFT_MARGIN +  Math.round( _CHART_WIDTH_MAIN_CONTENTS / 2 ) }
                                y={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS + 35 }
                                textAnchor="middle"
                                dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                            >
                                <tspan
                                    textAnchor="middle"
                                    dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                >
                                    Time (min)
                                </tspan>
                            </text>

                            {/*  -----------  */}

                            {/*  Main Chart Lines  */}
                            { svg_ScanMaxLines }


                            {/*  Line at Selected Position  */}
                            { lineAt_SelectedPosition_X_Element }

                            {/* Selection Cover */}
                            <rect
                                ref={ this._rect_SelectionCover_Ref }
                                fill="#FFFFE0"
                                fillOpacity="0.5"
                                y={ 0 - 1 }
                                height={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS }
                                //  Initial x and width
                                x={ _CHART_WIDTH_LEFT_MARGIN + 1 }
                                width={ 0 }
                            />

                            {/*  Rect on Top of the main chart area  */}
                            <rect
                                ref={ this._main_Rect_overlay_Ref }
                                x={ _CHART_WIDTH_LEFT_MARGIN + 1 } y={ 0 - 1 } width={ _CHART_WIDTH_MAIN_CONTENTS - 1 } height={ _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_MAIN_CONTENTS }
                                fill="white"
                                fillOpacity="0" // transparent
                                // onMouseEnter={  event => { console.warn("Overlying <rect> Mouse Enter") } }
                                // onMouseLeave={  event => { console.warn("Overlying <rect> Mouse Leave") } }

                                onMouseDown={ this._main_Rect_overlay_MouseDown_Event_BindThis }
                                // onMouseUp={ this._main_Rect_overlay_MouseUp_Event_BindThis }
                                onMouseMove={ this._main_Rect_overlay_MouseMove_Event_BindThis }

                                // onClick={ event => {
                                //     event.stopPropagation()
                                //     console.warn("Overlying <rect> On Click")
                                // } }

                            />

                        </svg>
                    </div>
                </div>
            );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
}


//////////////////////////

//   Selected Min/Max

class Selected_Min_Max_X_Y_Values {

    y_value_MIN: number
    y_value_MAX: number
    x_value_MIN: number
    x_value_MAX: number
}


//////////////////////////

//   Compute Overall Min/Max

class Min_Max_X_Y_Values {

    y_value_MIN: number
    y_value_MAX: number
    x_value_MIN: number
    x_value_MAX: number
}

/**
 *
 * @param props
 */
const _compute_Min_Max_X_Y_Values = function (props : ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props) : Min_Max_X_Y_Values {

    let y_value_MIN: number
    let y_value_MAX: number

    let x_value_MIN: number
    let x_value_MAX: number

    for (const entry of props.scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

        if ( ! props.scanLevels_ToDisplay.has( entry.level ) ) {
            // Not showing this scan level so skip
            continue // EARLY CONTINUE
        }

        if (y_value_MIN === undefined) {
            y_value_MIN = entry.totalIonCurrent_ForScan
            y_value_MAX = entry.totalIonCurrent_ForScan
        } else {
            if (y_value_MIN > entry.totalIonCurrent_ForScan) {
                y_value_MIN = entry.totalIonCurrent_ForScan;
            }
            if (y_value_MAX < entry.totalIonCurrent_ForScan) {
                y_value_MAX = entry.totalIonCurrent_ForScan;
            }
        }

        const retentionTime_Minutes = entry.retentionTime_InSeconds / 60

        if (x_value_MIN === undefined) {
            x_value_MIN = retentionTime_Minutes
            x_value_MAX = retentionTime_Minutes
        } else {
            if (x_value_MIN > retentionTime_Minutes) {
                x_value_MIN = retentionTime_Minutes;
            }
            if (x_value_MAX < retentionTime_Minutes) {
                x_value_MAX = retentionTime_Minutes;
            }
        }
    }

    x_value_MIN = Math.floor(x_value_MIN);
    x_value_MAX = Math.ceil(x_value_MAX);

    return {
        x_value_MAX, x_value_MIN, y_value_MAX, y_value_MIN
    }
}

/////////////////////////////////

//  Binning:   Results and Function

class Binned_Entries_On_X_value_Root {
    entries: Array<Binned_Entries_On_X_value_Entry>
    binSize_On_x_value: number
}

class Binned_Entries_On_X_value_Entry {
    entries_Binned: Array< CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber>
    // Compute from entries_Binned
    entry_UseFor_Y_Value_ForPlot:  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
    y_value_FractionOfMax: number
}


/**
 *
 * @param props
 */
const _bin_Entries_On_X_value = function (
    {
        props, min_Max_X_Y_Values, selected_X_Y_Value
    } : {
        props: ScanFileBrowser_TotalIonCurrent_OfScans_Plot_Component_Props
        min_Max_X_Y_Values: Min_Max_X_Y_Values
        selected_X_Y_Value: Selected_Min_Max_X_Y_Values
    }
) : Binned_Entries_On_X_value_Root {

    let x_Value_Min = min_Max_X_Y_Values.x_value_MIN;
    let x_Value_Max = min_Max_X_Y_Values.x_value_MAX;

    //  Update for selected
    if ( selected_X_Y_Value !== undefined && selected_X_Y_Value.x_value_MIN !== undefined ) {
        x_Value_Min = selected_X_Y_Value.x_value_MIN;
    }
    if ( selected_X_Y_Value !== undefined && selected_X_Y_Value.x_value_MAX !== undefined ) {
        x_Value_Max = selected_X_Y_Value.x_value_MAX;
    }

    if ( x_Value_Min > x_Value_Max ) {
        //  min > max so put back to computed min/max
        x_Value_Min = min_Max_X_Y_Values.x_value_MIN;
        x_Value_Max = min_Max_X_Y_Values.x_value_MAX;
    }

    const binSize_On_x_value = ( x_Value_Max - x_Value_Min ) / _BIN_COUNT

    console.log("scanPeaks_Like_GenericViewer_Root_Component: x_value_MIN: " + x_Value_Min + ", x_value_MAX: " + x_Value_Max + ", binSize_On_x_value: " + binSize_On_x_value )

    const binned_Entries_On_X_Value: Array<Binned_Entries_On_X_value_Entry> = []

    for (const entry of props.scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

        if ( ! props.scanLevels_ToDisplay.has( entry.level ) ) {
            // Not showing this scan level so skip
            continue // EARLY CONTINUE
        }

        const retentionTime_Minutes = entry.retentionTime_InSeconds / 60

        if ( retentionTime_Minutes < x_Value_Min || retentionTime_Minutes > x_Value_Max ) {
            //  Entry retentionTime_Minutes outside the Min and Max so skip
            continue; //  EARLY CONTINUE
        }

        const binIndex = Math.floor( ( retentionTime_Minutes - x_Value_Min ) / binSize_On_x_value )

        const binEntry_Existing = binned_Entries_On_X_Value[ binIndex ];
        if ( binEntry_Existing ) {
            binEntry_Existing.entries_Binned.push( entry )
        } else {
            binned_Entries_On_X_Value[ binIndex ] = {
                entries_Binned: [ entry ],
                entry_UseFor_Y_Value_ForPlot: undefined,  // Set below
                y_value_FractionOfMax: undefined                     // Set below
            }
        }
    }

    //  Find 'For Line Y axis value' entry and compute 'y_value_FractionOfMax'
    for ( const binned_Entry of binned_Entries_On_X_Value ) {

        if ( ! binned_Entry ) {
            //  No value at index so skip
            continue; // EARLY CONTINUE
        }

        let  singleEntryForPlot_EntryToUse: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber = undefined

        for ( const singleEntryForPlot of binned_Entry.entries_Binned ) {
            if ( ! singleEntryForPlot_EntryToUse ) {
                singleEntryForPlot_EntryToUse = singleEntryForPlot;
            } else if ( singleEntryForPlot_EntryToUse.totalIonCurrent_ForScan < singleEntryForPlot.totalIonCurrent_ForScan ) {
                singleEntryForPlot_EntryToUse = singleEntryForPlot;
            }
        }

        binned_Entry.entry_UseFor_Y_Value_ForPlot = singleEntryForPlot_EntryToUse
        binned_Entry.y_value_FractionOfMax = singleEntryForPlot_EntryToUse.totalIonCurrent_ForScan / min_Max_X_Y_Values.y_value_MAX;
    }

    const result: Binned_Entries_On_X_value_Root = {
        entries: binned_Entries_On_X_Value,
        binSize_On_x_value
    }

    return result;
}
