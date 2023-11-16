/**
 * scanFileBrowser_SingleScan_Plot_Component.tsx
 *
 * Scan File Browser -  Plot of Single Scan
 *
 */

//  d3  used for  d3.ticks(...)  to get optimized Tick marks on horizontal axis

import * as d3 from "d3";
import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
    ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser__get_data/scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_LoadData";
import {
    ScanFileBrowserPage_SingleScan_UserSelections_StateObject,
    ScanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_OR_PSM_Root,
    ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import { C13_MASS_DELTA, PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants } from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";


class Internal__SingleScan_Chart_Dimensions {

    readonly mainContents: {
        readonly width: number
        readonly height: number
    }
    readonly leftMargin: number
    readonly rightMargin: number
    readonly topMargin: number
    readonly bottomMargin: number

    readonly tickMark_Spacing: {
        readonly length_LongestForNumber: number
        readonly length_MediumBetweenNumber: number
        readonly tickMark_to_Label_Spacing_Horizontal: number
        readonly tickMark_to_Label_Spacing_Vertical: number
    }
}

const _CHART_MAIN__DIMENSIONS: Internal__SingleScan_Chart_Dimensions = {
    mainContents: {
        width:  1000,
        height: 200
    },
    leftMargin: 80,
    rightMargin: 40,
    topMargin: 20,
    bottomMargin: 40,
    tickMark_Spacing: {
        length_LongestForNumber: 9,
        length_MediumBetweenNumber: 6,           // Whole Number marks on Horizontal axis.  4 marks between Main marks on vertical axis
        tickMark_to_Label_Spacing_Horizontal: 3, // Left of Main Chart area
        tickMark_to_Label_Spacing_Vertical: 7    //  Below Main Chart area
    }
}

/**
 *   For the "Zoom" Representation
 */
const _CHART_ZOOM_REPRESENTATION__DIMENSIONS: Internal__SingleScan_Chart_Dimensions = {
    mainContents: {
        width:  500,
        height: 50
    },
    leftMargin: 0,
    rightMargin: 0,
    topMargin: 0,
    bottomMargin: 0,
    tickMark_Spacing: undefined
}

// const _CHART_WIDTH_MAIN_CONTENTS = 1000
// const _CHART_WIDTH_LEFT_MARGIN = 80;
// const _CHART_WIDTH_RIGHT_MARGIN = 40;
// const _CHART_WIDTH_OVERALL = _CHART_WIDTH_MAIN_CONTENTS + _CHART_WIDTH_LEFT_MARGIN + _CHART_WIDTH_RIGHT_MARGIN;
//
// const _CHART_HEIGHT_MAIN_CONTENTS = 200
// const _CHART_HEIGHT_TOP_MARGIN = 20;
// const _CHART_HEIGHT_BOTTOM_MARGIN = 40;
// const _CHART_HEIGHT_OVERALL = _CHART_HEIGHT_MAIN_CONTENTS + _CHART_HEIGHT_TOP_MARGIN + _CHART_HEIGHT_BOTTOM_MARGIN;
//
//
// const _TICK_MARK_LENGTH_LONGEST_FOR_NUMBER = 9;
// const _TICK_MARK_LENGTH_MEDIUM_BETWEEN_NUMBER = 6;  // Whole Number marks on Horizontal axis.  4 marks between Main marks on vertical axis
//
// const _TICK_MARK_TO_LABEL_SPACE_HORIZONTAL = 3; // Left of Main Chart area
// const _TICK_MARK_TO_LABEL_SPACE_VERTICAL = 7;  //  Below Main Chart area
//
// const _BIN_COUNT = _CHART_WIDTH_MAIN_CONTENTS;

const _PPM_VALUE_ = 25;



//   !!!  IMPORTANT:  The number of elements in '_ISOTOPE_PLOT_LINES_COLORS' MUST be equal to '_ISOTOPE_MAX__FOR_CHART_LINES + 1'

//    !!!   NUMBER OF ISOTOPES to DISPLAY
const _ISOTOPE_MAX__FOR_CHART_LINES = 3  //  Show Lines in Plot for 'Monoisotopic' and then +1, +2, ... Up To Isotope Max

const _ISOTOPE_PLOT_LINES_COLORS = [
    "rgb(31, 119, 180)",  // For Monoisotopic
    "rgb(255, 127, 14)",  //  +1
    "rgb(44, 160, 44)", // etc
    "#3BB2C4"
]

//  Matching background colors:

const _ISOTOPE_PLOT_SURROUNDING_RANGE_COLORS = [
    "#A5D9FF",  // For Monoisotopic
    "#FFE2C9",  //  +1
    "#CAFFCA", // etc
    "#CEF9FF"
]

{
    if ( ( _ISOTOPE_MAX__FOR_CHART_LINES + 1 ) !== _ISOTOPE_PLOT_LINES_COLORS.length ) {
        const msg = "The number of elements in '_ISOTOPE_PLOT_LINES_COLORS' MUST be equal to '_ISOTOPE_MAX__FOR_CHART_LINES + 1'"
        console.warn( msg )
        window.alert(msg)
        throw Error(msg)
    }
}



export class ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Params {
    autoZoom_Y_Axis_Value: boolean
}

export type ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Type =
    ( params: ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Params ) => void



/**
 *
 */
export interface ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props {

    scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber

    scanFileBrowserPage_SingleScan_UserSelections_StateObject: ScanFileBrowserPage_SingleScan_UserSelections_StateObject

    autoZoom_Y_Axis_Value: boolean

    autoZoom_Y_Axis_ValueChanged_Callback: ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Type
}

/**
 *
 */
interface ScanFileBrowser_SingleScan_Plot_Main_Container_Component_State {

    force_Rerender?: object
}

/**
 *
 */
export class ScanFileBrowser_SingleScan_Plot_Main_Container_Component extends React.Component< ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props, ScanFileBrowser_SingleScan_Plot_Main_Container_Component_State > {

    private _zoomChange_Callback_From_SingleScanComponent_BindThis = this._zoomChange_Callback_From_SingleScanComponent.bind(this)

    private _DO_NOT_CALL() {

        const zoomChange_Callback_From_SingleScanComponent: Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback = this._zoomChange_Callback_From_SingleScanComponent
    }

    private _min_Max_X_Y_Values: Min_Max_X_Y_Values

    private _valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject: Internal__ValuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject

    private _forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component: object

    /**
     *
     */
    constructor( props: ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props ) {
        super( props );
        try {
            this._min_Max_X_Y_Values = _compute_Min_Max_X_Y_Values( props );

            this._scanFileBrowserPage_SingleScan_UserSelections_StateObject__CheckForInvalidValues_UpdateClassProperty( props )

            this.state = {
                force_Rerender: {}
            };
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props>, prevState: Readonly<ScanFileBrowser_SingleScan_Plot_Main_Container_Component_State>, snapshot?: any) {
        try {
            if ( prevProps.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber !==
                this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber ) {

                this._min_Max_X_Y_Values = _compute_Min_Max_X_Y_Values(this.props);

                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( undefined ); // Reset selection
                this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}  //  Force Zoom Component to render current StateObject

                this._scanFileBrowserPage_SingleScan_UserSelections_StateObject__CheckForInvalidValues_UpdateClassProperty( this.props )

                if ( this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
                    this.setState({ force_Rerender: {} })
                } else {

                    const msg = "ScanFileBrowser_SingleScan_Plot_Main_Container_Component::componentDidUpdate  NOT FULLY HANDLED"

                    console.warn(msg)
                    console.warn(msg)


                    // const binned_Entries = _bin_Entries_On_X_value( {
                    //     props: this.props, min_Max_X_Y_Values: this._min_Max_X_Y_Values,
                    //     scanFileBrowserPage_SingleScan_UserSelections_StateObject: this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject
                    // } )
                    //
                    // this.setState( { binned_Entries } )
                }
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e
        }
    }

    /**
     *
     */
    private _scanFileBrowserPage_SingleScan_UserSelections_StateObject__CheckForInvalidValues_UpdateClassProperty( props: ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props ) {

        this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject = undefined

        const zoomRange_Selected = props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()

        if ( zoomRange_Selected ) {

            if ( zoomRange_Selected.mz_Min_ZoomRange < 0 ) {
                if ( ! this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
                    this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject = {}
                }
                this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_Negative = true
            }
            if ( zoomRange_Selected.mz_Max_ZoomRange < 0 ) {
                if ( ! this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
                    this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject = {}
                }
                this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Max_ZoomRange_Negative = true
            }
            if ( zoomRange_Selected.mz_Min_ZoomRange > zoomRange_Selected.mz_Max_ZoomRange ) {
                if ( ! this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
                    this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject = {}
                }
                this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_GreaterThan_mz_Max_ZoomRange_Negative = true
            }
            if ( zoomRange_Selected.tic_Max_ZoomRange < 0 ) {
                if ( ! this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
                    this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject = {}
                }
                this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.tic_Max_ZoomRange_Negative = true
            }
        }
    }

    /**
     *
     */
    private _zoomChange_Callback_From_SingleScanComponent( params: Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback_Params ) {

        this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( params.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange )

        this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback() {

        this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _zoomOut_Callback() {

        let x_value_Min_Prev = this._min_Max_X_Y_Values.x_value_MIN;

        if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange !== undefined ) {
            x_value_Min_Prev = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange;
        }

        let x_value_Max_Prev = this._min_Max_X_Y_Values.x_value_MAX;

        if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange !== undefined ) {
            x_value_Max_Prev = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Max_ZoomRange;
        }

        let y_Value_Max_Prev = this._min_Max_X_Y_Values.y_value_MAX;
        if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange !== undefined ) {
            y_Value_Max_Prev = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange;
        }

        const X_Difference_OLD = x_value_Max_Prev - x_value_Min_Prev

        const X_Difference_NEW = X_Difference_OLD * 2  // New X difference Double
        const X_Difference_NEW_Half = X_Difference_NEW / 2  // Half for each side

        let x_value_MIN = x_value_Min_Prev - X_Difference_NEW_Half
        let x_value_MAX = x_value_Max_Prev + X_Difference_NEW_Half

        {
            let x_Min_Change_LeftOver = 0
            let x_Max_Change_LeftOver = 0

            if ( x_value_MIN < this._min_Max_X_Y_Values.x_value_MIN ) {
                //  MIN exceeds overall min so reset to min

                //  First save off difference to apply to other side
                x_Min_Change_LeftOver = this._min_Max_X_Y_Values.x_value_MIN - x_value_MIN

                //  Reset to min
                x_value_MIN = this._min_Max_X_Y_Values.x_value_MIN
            }
            if ( x_value_MAX > this._min_Max_X_Y_Values.x_value_MAX ) {
                //  MAX exceeds overall max so reset to max

                //  First save off difference to apply to other side
                x_Max_Change_LeftOver = x_value_MAX - this._min_Max_X_Y_Values.x_value_MAX

                //  Reset to max
                x_value_MAX = this._min_Max_X_Y_Values.x_value_MAX
            }

            if ( x_Min_Change_LeftOver > 0 ) {
                //  MIN not changed by full amount so apply rest to MAX
                x_value_MAX += x_Min_Change_LeftOver  // Apply left over to MAX
                if ( x_value_MAX > this._min_Max_X_Y_Values.x_value_MAX ) {
                    //  MAX exceeds overall max so reset to max
                    x_value_MAX = this._min_Max_X_Y_Values.x_value_MAX
                }
            }
            if ( x_Max_Change_LeftOver > 0 ) {
                //  MAX not changed by full amount so apply rest to MIN
                x_value_MIN -= x_Max_Change_LeftOver  // Apply left over to MIN
                if ( x_value_MIN < this._min_Max_X_Y_Values.x_value_MIN ) {
                    //  MIN exceeds overall max so reset to min
                    x_value_MIN = this._min_Max_X_Y_Values.x_value_MIN
                }
            }
        }

        //  y_value_MIN is NOT used
        // let y_value_MIN = y_Value_Max_Prev - Math.round( ( ( y_Position_Pixels.min_Pixels - this.props.singleScan_Chart_Dimensions.topMargin ) / this.props.singleScan_Chart_Dimensions.mainContents.height ) * y_Value_Max_Prev ) // Matches Tick Marks

        let y_value_MAX = Math.ceil( y_Value_Max_Prev * 1.5 )  // set Y Max to 1.5 times prev value

        if ( y_value_MAX > this._min_Max_X_Y_Values.y_value_MAX ) {
            y_value_MAX = Math.ceil( this._min_Max_X_Y_Values.y_value_MAX );
        }

        if ( x_value_MIN === this._min_Max_X_Y_Values.x_value_MIN && y_value_MAX === this._min_Max_X_Y_Values.y_value_MAX ) {

            y_value_MAX = Math.ceil( this._min_Max_X_Y_Values.y_value_MAX )

        } else {

            if ( this.props.autoZoom_Y_Axis_Value
                && ( x_value_MIN !== this._min_Max_X_Y_Values.x_value_MIN || y_value_MAX !== this._min_Max_X_Y_Values.y_value_MAX ) ) {

                //  Bin first on X axis so can compute appropriate automatic Y value

                const binned_Entries_OnlyFor_ZoomOut__FakeSize_MainChart =
                    _bin_Entries_On_X_Y_ZoomRange__OR__min_Max_X_Y_Values( {
                        bin_Count: _CHART_MAIN__DIMENSIONS.mainContents.width,
                        scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
                        min_Max_X_Y_Values: {
                            x_value_MIN, x_value_MAX, y_value_MIN: undefined, y_value_MAX: undefined
                        },
                        scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: undefined
                    } )

                //  Compute Y value max from max of scan peaks within X min/max + 10%

                let peakIntensity_Max = 0

                for ( const binnedEntry of binned_Entries_OnlyFor_ZoomOut__FakeSize_MainChart.entries ) {
                    if ( ! binnedEntry ) {
                        //  entries indexes not contiguous
                        continue
                    }
                    for ( const scanPeak of binnedEntry.entries_Binned ) {
                        if ( scanPeak.m_over_z >= x_value_MIN && scanPeak.m_over_z <= x_value_MAX ) {
                            if ( peakIntensity_Max < scanPeak.intensity ) {
                                peakIntensity_Max = scanPeak.intensity
                            }
                        }
                    }
                }

                if ( peakIntensity_Max > 0 ) {

                    //  Override y_value_MAX with peakIntensity_Max 110%
                    y_value_MAX = Math.ceil( peakIntensity_Max * 1.1 )
                }
            }
        }

        this._zoomChange_Callback_From_SingleScanComponent({
            scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange : {
                mz_Min_ZoomRange: x_value_MIN, mz_Max_ZoomRange: x_value_MAX, tic_Max_ZoomRange: y_value_MAX
            }
        })

        this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {
        try {
            return (
                <div>
                    <div style={ { marginTop: 8, marginBottom: 8 } }>

                        <Internal__Zoom_Of_SingleScan_Plot_Component

                            scanFileBrowserPage_SingleScan_UserSelections_StateObject={ this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject }
                            forceUpdateObject_StateObjectChanged={ this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component }
                            scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback={ () => {

                                this._scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                            } }
                            zoomOut_Callback={ () => {
                                this._zoomOut_Callback()
                            }}
                            autoZoom_Y_Axis_Value={ this.props.autoZoom_Y_Axis_Value }
                            autoZoom_Y_Axis_ValueChanged_Callback={ this.props.autoZoom_Y_Axis_ValueChanged_Callback }
                        />

                        {/*
                        <div style={ { marginTop: 4 } }>
                            <span>Whole Scan: M/Z: Start:  </span>
                            <span>{ this._min_Max_X_Y_Values.x_value_MIN }</span>
                            <span style={ { marginLeft: 5 } }>End: </span>
                            <span>{ this._min_Max_X_Y_Values.x_value_MAX }</span>
                            <span style={ { marginLeft: 10 } }>Max TIC: </span>
                            <span>{ this._min_Max_X_Y_Values.y_value_MAX }</span>
                        </div>
                        */}
                    </div>

                    { this.render_After_ZoomControl() }

                    <div>
                        <div style={ { fontSize: 16, fontWeight: "bold" } }>
                            Scan Information:
                        </div>
                        <div style={ { marginLeft: 10 } }>
                            <div>
                                <span>Scan Number: </span>
                                <span>{ this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.scanNumber }</span>
                            </div>
                            <div>
                                Scan Level: { this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.level }
                            </div>
                            <div>
                                RT (Min): { ( this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.retentionTime_InSeconds / 60 ).toFixed( 2 ) }
                            </div>
                            { ( this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.totalIonCurrent_ForScan !== undefined
                                && this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.totalIonCurrent_ForScan !== null ) ? (

                                <div>
                                    TIC: { ( this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.totalIonCurrent_ForScan ).toExponential( 2 ) }
                                </div>
                            ) : null }
                            { ( this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.ionInjectionTime_InMilliseconds !== undefined
                                && this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.ionInjectionTime_InMilliseconds !== null ) ? (

                                <div>
                                    Ion Injection Time
                                    (Milliseconds): { this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.ionInjectionTime_InMilliseconds }
                                </div>
                            ) : null }

                        </div>
                    </div>
                </div>
            )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render_After_ZoomControl() {
        try {

            if ( this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {

                return (  //  EARLY RETURN
                    <div style={ { marginTop: 10, fontWeight: "bold" } }>
                        { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_Negative ? (
                            <div>
                                Error: M/Z Start is Negative
                            </div>
                        ) : null }
                        { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Max_ZoomRange_Negative ? (
                            <div>
                                Error: M/Z End is Negative
                            </div>
                        ) : null }
                        { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_GreaterThan_mz_Max_ZoomRange_Negative ? (
                            <div>
                                Error: M/Z Start is larger than End
                            </div>
                        ) : null }
                        { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.tic_Max_ZoomRange_Negative ? (
                            <div>
                                Error: Max TIC is Negative
                            </div>
                        ) : null }
                    </div>
                )
            }

            { //  Check for Zoom Range outside the range of data for scan
                const zoomRange_Selected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()

                if ( zoomRange_Selected ) {
                    if ( zoomRange_Selected.mz_Min_ZoomRange > this._min_Max_X_Y_Values.x_value_MAX ) {

                        return (  //  EARLY RETURN

                            <div style={ { marginTop: 10, fontWeight: "bold" } }>
                                No data since M/Z Start is greater than all scan peaks M/Z values
                            </div>
                        )
                    }
                    if ( zoomRange_Selected.mz_Max_ZoomRange < this._min_Max_X_Y_Values.x_value_MIN ) {

                        return (  //  EARLY RETURN

                            <div style={ { marginTop: 10, fontWeight: "bold" } }>
                                No data since M/Z End is less than all scan peaks M/Z values
                            </div>
                        )
                    }
                }
            }

            return (
                <div>
                    { this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected() ? (
                        <>
                            <div>
                                Full Spectrum (shaded area is current zoom)
                            </div>
                            <div
                                className=" standard-border-color-very-dark "
                                style={ { display: "inline-block", borderStyle: "solid", borderWidth: 2 } }
                            >
                                <Internal__ScanFileBrowser_SingleScan_Plot_Component
                                    zoomVisualization_Instance={ true }
                                    singleScan_Chart_Dimensions={ _CHART_ZOOM_REPRESENTATION__DIMENSIONS } // { _CHART_MAIN__DIMENSIONS } //  Fake Main Dimensions to get it to run
                                    autoZoom_Y_Axis_Value={ this.props.autoZoom_Y_Axis_Value }
                                    scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber={ this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber }
                                    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart={ undefined }
                                    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__ZoomVisualization_Instance_For_RectOnTop={ this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected() }
                                    scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root={ this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root() }
                                    min_Max_X_Y_Values={ this._min_Max_X_Y_Values }
                                    zoomChange_Callback={ undefined }
                                />
                            </div>
                        </>
                    ) : null }

                    <Internal__ScanFileBrowser_SingleScan_Plot_Component
                        zoomVisualization_Instance={ false }
                        singleScan_Chart_Dimensions={ _CHART_MAIN__DIMENSIONS }
                        autoZoom_Y_Axis_Value={ this.props.autoZoom_Y_Axis_Value }
                        scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber={ this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber }
                        scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart={ this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected() }
                        scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__ZoomVisualization_Instance_For_RectOnTop={ undefined }
                        scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root={ this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.get_featureDetection_IndividualFeature_OR_PSM_Root() }
                        min_Max_X_Y_Values={ this._min_Max_X_Y_Values }
                        zoomChange_Callback={ this._zoomChange_Callback_From_SingleScanComponent_BindThis }
                    />
                </div>
            )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
}

//////////////////

class Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback_Params {

    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange
}

type Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback =
    ( params: Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback_Params ) => void

/**
 *
 */
interface Internal__ScanFileBrowser_SingleScan_Plot_Component_Props {

    zoomVisualization_Instance: boolean

    singleScan_Chart_Dimensions: Internal__SingleScan_Chart_Dimensions

    autoZoom_Y_Axis_Value: boolean

    scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber

    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange  //  Main Zooming In

    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__ZoomVisualization_Instance_For_RectOnTop: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange  //  Only for drawing <rect> on top for Zoom Visualization Instance

    scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_OR_PSM_Root

    min_Max_X_Y_Values: Min_Max_X_Y_Values

    zoomChange_Callback: Internal__ScanFileBrowser_SingleScan_Plot_Component__ZoomChange_Callback

}

/**
 *
 */
interface Internal__ScanFileBrowser_SingleScan_Plot_Component_State {

    binned_Entries?: Binned_Entries_On_X_value_M_over_Z_Root

    force_Rerender?: object
}

/**
 *
 */
class Internal__ScanFileBrowser_SingleScan_Plot_Component extends React.Component< Internal__ScanFileBrowser_SingleScan_Plot_Component_Props, Internal__ScanFileBrowser_SingleScan_Plot_Component_State > {

    //  bind to 'this' for passing as parameters
    private _main_Rect_overlay_MouseDown_Event_BindThis = this._main_Rect_overlay_MouseDown_Event.bind(this)
    private _window_MouseUp_Event_BindThis = this._window_MouseUp_Event.bind(this)
    // private _main_Rect_overlay_MouseUp_Event_BindThis = this._main_Rect_overlay_MouseUp_Event.bind(this)
    private _documentBody_MouseMove_Event__UpdateMainChartSelection_BindThis = this._documentBody_MouseMove_Event__UpdateMainChartSelection.bind(this);
    private _main_Rect_overlay_MouseMove_Event_BindThis = this._main_Rect_overlay_MouseMove_Event.bind(this)

    private readonly _main_Rect_overlay_Ref :  React.RefObject<SVGRectElement>
    private readonly _rect_SelectionCover_Ref :  React.RefObject<SVGRectElement>

    private _main_Rect_overlay_MouseDown_PositionRelativeTo_Rect: { x: number, y: number, clientX: number, clientY: number }

    // private _valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject: Internal__ValuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject

    private _forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component: object

    /**
     *
     */
    constructor(props: Internal__ScanFileBrowser_SingleScan_Plot_Component_Props) {
        super(props);
        try {
            this._main_Rect_overlay_Ref = React.createRef();
            this._rect_SelectionCover_Ref = React.createRef();

            let binned_Entries: Binned_Entries_On_X_value_M_over_Z_Root

            binned_Entries = _bin_Entries_On_X_Y_ZoomRange__OR__min_Max_X_Y_Values( {
                bin_Count: props.singleScan_Chart_Dimensions.mainContents.width,
                scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
                min_Max_X_Y_Values: props.min_Max_X_Y_Values,
                scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart
            } )

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

        if ( ! this.props.zoomVisualization_Instance ) {
            this._add_Listener_window_MouseUp_Event()
        }
    }

    componentWillUnmount() {

        if ( ! this.props.zoomVisualization_Instance ) {
            this._remove_Listener_window_MouseUp_Event()
        }
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
    // static getDerivedStateFromProps( props : Internal__ScanFileBrowser_SingleScan_Plot_Component_Props, state : Internal__ScanFileBrowser_SingleScan_Plot_Component_State ) {
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
    componentDidUpdate(prevProps: Readonly<Internal__ScanFileBrowser_SingleScan_Plot_Component_Props>, prevState: Readonly<Internal__ScanFileBrowser_SingleScan_Plot_Component_State>, snapshot?: any) {
        try {
            const msg = "Internal__ScanFileBrowser_SingleScan_Plot_Component::componentDidUpdate  NOT DOING ANYTHING"

            console.warn( msg )



            if (
                ( prevProps.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber !==
                    this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber )
                || ( prevProps.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart !==
                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart )
                || ( prevProps.scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root !==
                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root ) )  {

                this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}  //  Force Zoom Component to render current StateObject


                const binned_Entries = _bin_Entries_On_X_Y_ZoomRange__OR__min_Max_X_Y_Values( {
                    bin_Count: this.props.singleScan_Chart_Dimensions.mainContents.width,
                    scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
                    min_Max_X_Y_Values: this.props.min_Max_X_Y_Values,
                    scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart
                } )


                this.setState( { binned_Entries } )

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

            //  Currently no "Click" handler
            // this._process_XXXXXX_At_Mouse_Click_Position({ mouseUpPosition_X_RelativeToMainPlotArea, mouseUpPosition_Y_RelativeToMainPlotArea });

            this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect = undefined;

            return; // EARLY RETURN
        }

        console.warn( "Dragged in X direction (Always Print): " + Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x - mouseUpPosition_X_RelativeToMainPlotArea )  )
        console.warn( "Dragged in Y direction (Always Print): " + Math.abs( this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.y - mouseUpPosition_Y_RelativeToMainPlotArea )  )

        if ( mouseUpPosition_X_RelativeToMainPlotArea < 0 ) {
            mouseUpPosition_X_RelativeToMainPlotArea = 0;
        }
        if ( mouseUpPosition_Y_RelativeToMainPlotArea < this.props.singleScan_Chart_Dimensions.topMargin ) {
            mouseUpPosition_Y_RelativeToMainPlotArea = this.props.singleScan_Chart_Dimensions.topMargin
        }

        const _X_Axis_Close_To_Edge_ChangeToEdge_Pixels = 5;
        const _Y_Axis_Close_To_Edge_ChangeToEdge_Pixels = 10;

        const x_Position_Pixels = this._get_MinMax_Pixels_AccountFor_ChangeToEdgeWhenCloseToEdge({
            pixels_Input_1: this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect.x,
            pixels_Input_2: mouseUpPosition_X_RelativeToMainPlotArea,
            minEdge: this.props.singleScan_Chart_Dimensions.leftMargin,
            maxEdge: this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width,
            close_To_Edge_ChangeToEdge_Pixels: _X_Axis_Close_To_Edge_ChangeToEdge_Pixels
        })

        const y_Position_Pixels = this._get_MinMax_Pixels_AccountFor_ChangeToEdgeWhenCloseToEdge({
            pixels_Input_1: mouseUpPosition_Y_RelativeToMainPlotArea,  //  Pass same value as both inputs
            pixels_Input_2: mouseUpPosition_Y_RelativeToMainPlotArea,  //  Pass same value as both inputs
            minEdge: this.props.singleScan_Chart_Dimensions.topMargin,
            maxEdge: this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height,
            close_To_Edge_ChangeToEdge_Pixels: _Y_Axis_Close_To_Edge_ChangeToEdge_Pixels
        })

        let x_value_Min_Existing = this.props.min_Max_X_Y_Values.x_value_MIN;

        if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Min_ZoomRange !== undefined ) {
            x_value_Min_Existing = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Min_ZoomRange;
        }

        let y_Value_Max_Prev = this.props.min_Max_X_Y_Values.y_value_MAX;
        if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.tic_Max_ZoomRange !== undefined ) {
            y_Value_Max_Prev = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.tic_Max_ZoomRange;
        }

        let x_value_MIN = x_value_Min_Existing + x_Position_Pixels.min_Pixels * this.state.binned_Entries.binSize_On_x_value // Matches Tick Marks
        let x_value_MAX = x_value_Min_Existing + x_Position_Pixels.max_Pixels * this.state.binned_Entries.binSize_On_x_value // Matches Tick Marks

        //  y_value_MIN is NOT used
        // let y_value_MIN = y_Value_Max_Prev - Math.round( ( ( y_Position_Pixels.min_Pixels - this.props.singleScan_Chart_Dimensions.topMargin ) / this.props.singleScan_Chart_Dimensions.mainContents.height ) * y_Value_Max_Prev ) // Matches Tick Marks

        let y_value_MAX = y_Value_Max_Prev - ( ( ( y_Position_Pixels.max_Pixels - this.props.singleScan_Chart_Dimensions.topMargin ) / this.props.singleScan_Chart_Dimensions.mainContents.height ) * y_Value_Max_Prev )  // Matches Tick Marks

        if ( y_value_MAX < 1 ) {
            y_value_MAX = 1;
        }

        if ( Number.isNaN( x_value_MIN ) ) {
            if ( x_Position_Pixels.min_Pixels === undefined ) {
                x_value_MIN = undefined;
            } else {
                x_value_MIN = this.props.singleScan_Chart_Dimensions.leftMargin; //  TODO Not correct solution but better than leave NaN
                x_value_MAX = this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width;
            }
        }
        if ( Number.isNaN( x_value_MAX ) ) {
            if ( x_Position_Pixels.max_Pixels === undefined ) {
                x_value_MAX = undefined;
            } else {
                x_value_MIN = this.props.singleScan_Chart_Dimensions.leftMargin; //  TODO Not correct solution but better than leave NaN
                x_value_MAX = this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width;
            }
        }

        //  y_value_MIN is NOT used

        // if ( Number.isNaN( y_value_MIN ) ) {
        //     if ( y_Position_Pixels.min_Pixels === undefined ) {
        //         y_value_MIN = undefined;
        //     } else {
        //         y_value_MIN = this.props.singleScan_Chart_Dimensions.topMargin; //  TODO Not correct solution but better than leave NaN
        //         y_value_MAX = this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height;
        //     }
        // }

        if ( Number.isNaN( y_value_MAX ) ) {
            if ( y_Position_Pixels.max_Pixels === undefined ) {
                y_value_MAX = undefined;
            } else {
                //  y_value_MIN is NOT used
                // y_value_MIN = this.props.singleScan_Chart_Dimensions.topMargin; //  TODO Not correct solution but better than leave NaN
                y_value_MAX = this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height;
            }
        }


        if ( this.props.autoZoom_Y_Axis_Value ) {

            //  Compute Y value max from max of scan peaks within X min/max + 10%

            let peakIntensity_Max = 0

            for ( const binnedEntry of this.state.binned_Entries.entries ) {
                if ( ! binnedEntry ) {
                    //  entries indexes not contiguous
                    continue
                }
                for ( const scanPeak of binnedEntry.entries_Binned ) {
                    if ( scanPeak.m_over_z >= x_value_MIN && scanPeak.m_over_z <= x_value_MAX ) {
                        if ( peakIntensity_Max < scanPeak.intensity ) {
                            peakIntensity_Max = scanPeak.intensity
                        }
                    }
                }
            }

            if ( peakIntensity_Max > 0 ) {

                //  Override y_value_MAX with peakIntensity_Max 110%
                y_value_MAX = peakIntensity_Max * 1.1
            }
        }

        y_value_MAX = Math.ceil( y_value_MAX )  //  Make Integer

        this.props.zoomChange_Callback({
            scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange : {
                mz_Min_ZoomRange: x_value_MIN, mz_Max_ZoomRange: x_value_MAX, tic_Max_ZoomRange: y_value_MAX
            }
        })

        this._forceUpdateObject_StateObjectChanged__For_Internal__Zoom_Of_SingleScan_Plot_Component = {}


        const binned_Entries = _bin_Entries_On_X_Y_ZoomRange__OR__min_Max_X_Y_Values( {
            bin_Count: this.props.singleScan_Chart_Dimensions.mainContents.width,
            scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: this.props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
            min_Max_X_Y_Values: this.props.min_Max_X_Y_Values,
            scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart
        } )

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

        console.warn("Internal__ScanFileBrowser_SingleScan_Plot_Component: _window_MouseMove_Event__UpdateMainChartSelection: window Mouse Move. event: ", event)

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
            console.warn("Internal__ScanFileBrowser_SingleScan_Plot_Component: _documentBody_MouseMove_Event__UpdateMainChartSelection: document <body> Mouse Move. Nothing in this._main_Rect_overlay_MouseDown_PositionRelativeTo_Rect")

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

        const x = ( this.props.singleScan_Chart_Dimensions.leftMargin + 1 ) + leftEdge;
        const x_String = x.toString()
        let width = rightEdge - leftEdge;
        if ( width > this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width ) {
            width = this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width;
        }
        if ( width < 0 ) {
            width = 0;
        }
        const width_String = width.toString()
        this._rect_SelectionCover_Ref.current.setAttribute( "x", x_String );
        this._rect_SelectionCover_Ref.current.setAttribute( "width", width_String );


        const y = Math.round( mouseMovePosition_Y_RelativeToMainPlotArea );
        const y_String = y.toString()
        let height = ( this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height ) - ( y );
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
        // const rect_FollowMouseMove_X = ( mouseMovePosition_X_RelativeToMainPlotArea + this.props.singleScan_Chart_Dimensions.leftMargin ).toString()
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
        try {

            const chart_Width_Overall = this.props.singleScan_Chart_Dimensions.mainContents.width + this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.rightMargin

            const chart_Height_Overall = this.props.singleScan_Chart_Dimensions.mainContents.height + this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.bottomMargin


            // if ( this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject ) {
            //
            //     return (  //  EARLY RETURN
            //         <div style={ { marginTop: 10, fontWeight: "bold" } }>
            //             { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_Negative ? (
            //                 <div>
            //                     Error: M/Z Start is Negative
            //                 </div>
            //             ) : null }
            //             { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Max_ZoomRange_Negative ? (
            //                 <div>
            //                     Error: M/Z End is Negative
            //                 </div>
            //             ) : null }
            //             { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.mz_Min_ZoomRange_GreaterThan_mz_Max_ZoomRange_Negative ? (
            //                 <div>
            //                     Error: M/Z Start is larger than End
            //                 </div>
            //             ) : null }
            //             { this._valuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject.tic_Max_ZoomRange_Negative ? (
            //                 <div>
            //                     Error: Max TIC is Negative
            //                 </div>
            //             ) : null }
            //         </div>
            //     )
            // }


            { //  Check for Zoom Range outside the range of data for scan
                const zoomRange_Selected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart

                if ( zoomRange_Selected ) {
                    if ( zoomRange_Selected.mz_Min_ZoomRange > this.props.min_Max_X_Y_Values.x_value_MAX ) {

                        return (  //  EARLY RETURN

                            <div style={ { marginTop: 10, fontWeight: "bold" } }>
                                No data since M/Z Start is greater than all scan peaks M/Z values
                            </div>
                        )
                    }
                    if ( zoomRange_Selected.mz_Max_ZoomRange < this.props.min_Max_X_Y_Values.x_value_MIN ) {

                        return (  //  EARLY RETURN

                            <div style={ { marginTop: 10, fontWeight: "bold" } }>
                                No data since M/Z End is less than all scan peaks M/Z values
                            </div>
                        )
                    }
                }
            }

            const mz_Ranges_To_Color: Array<{

                m_Over_Z_Window_Min: number
                m_Over_Z_Window_Max: number
                line_Label: string
                line_Color: string
                surroundingRange_Color: string
            }> = []

            {
                const featureDetection_IndividualFeature_Root =  this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_Root
                if ( featureDetection_IndividualFeature_Root ) {

                    let m_Over_Z_Mass_Base = featureDetection_IndividualFeature_Root.baseIsotopePeak__Containing_M_Over_Z

                    if ( m_Over_Z_Mass_Base === undefined || m_Over_Z_Mass_Base === null ) {

                        if ( featureDetection_IndividualFeature_Root.monoisotopicMass === undefined || featureDetection_IndividualFeature_Root.monoisotopicMass === null ) {

                            const msg = "featureDetection_IndividualFeature_Root.baseIsotopePeak__Containing_M_Over_Z is undefined or null AND featureDetection_IndividualFeature_Root.monoisotopicMass is undefined or null"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        //  Compute m_Over_Z_Mass_Base from featureDetection_IndividualFeature_Root.monoisotopicMass

                        m_Over_Z_Mass_Base =
                            PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge({
                                monoisotopicMass: featureDetection_IndividualFeature_Root.monoisotopicMass,
                                charge: featureDetection_IndividualFeature_Root.charge
                            })
                    }

                    //  LOOP For Isotopes to Display: up to _ISOTOPE_MAX__FOR_CHART_LINES

                    for ( let isotope_Number = 0; isotope_Number <= _ISOTOPE_MAX__FOR_CHART_LINES; isotope_Number++ ) {

                        //  Window:  m/z window for main m/z + X isotope

                        let line_Label = "Monoisoptic"

                        if ( isotope_Number > 0 ) {
                            line_Label = "13C x " + isotope_Number
                        }

                        const line_Color = _ISOTOPE_PLOT_LINES_COLORS[ isotope_Number ]

                        const surroundingRange_Color = _ISOTOPE_PLOT_SURROUNDING_RANGE_COLORS[ isotope_Number ]


                        const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number( {
                            isotope_Number, charge: featureDetection_IndividualFeature_Root.charge
                        } );

                        const m_over_z_Peptide_And_Mods__Plus_X_Isotope = m_Over_Z_Mass_Base + isotope_M_Over_Z_Addition

                        const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = _compute_PPM_Mass_For_M_Over_Z_PlusMinus__using_constant__PPM_VALUE_( {
                            m_Over_Z_Mass: m_over_z_Peptide_And_Mods__Plus_X_Isotope
                        } )

                        const m_Over_Z_Window_Min = m_over_z_Peptide_And_Mods__Plus_X_Isotope - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                        const m_Over_Z_Window_Max = m_over_z_Peptide_And_Mods__Plus_X_Isotope + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                        mz_Ranges_To_Color.push({
                            m_Over_Z_Window_Min,
                            m_Over_Z_Window_Max,
                            line_Label,
                            line_Color,
                            surroundingRange_Color
                        })
                    }
                }
            }

            if ( this.state.binned_Entries ) {

                let x_Value_Min = this.props.min_Max_X_Y_Values.x_value_MIN;
                let x_Value_Max = this.props.min_Max_X_Y_Values.x_value_MAX;

                //  Update for selected


                if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart !== undefined
                    && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Min_ZoomRange !== undefined ) {

                    x_Value_Min = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Min_ZoomRange;
                }
                if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart !== undefined
                    && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Max_ZoomRange !== undefined ) {

                    x_Value_Max = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.mz_Max_ZoomRange;
                }

                if ( x_Value_Min > x_Value_Max ) {
                    //  min > max so put back to computed min/max
                    x_Value_Min = this.props.min_Max_X_Y_Values.x_value_MIN;
                    x_Value_Max = this.props.min_Max_X_Y_Values.x_value_MAX;
                }

                const _y_Value_Max_CEIL_10_MIN_VALUE = 30;

                let y_Value_Min = 0;
                let y_Value_Max = this.props.min_Max_X_Y_Values.y_value_MAX;

                if ( this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart !== undefined
                    && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.tic_Max_ZoomRange !== undefined ) {

                    y_Value_Max = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__MainChart.tic_Max_ZoomRange;

                    if ( y_Value_Max >= _y_Value_Max_CEIL_10_MIN_VALUE ) {
                        const div10_Ceil = Math.ceil( y_Value_Max / 10 );
                        y_Value_Max = div10_Ceil * 10;
                    }
                }

                const svg_VerticalAxis_TickMarks: Array<JSX.Element> = [];

                const svg_HorizontalAxis_TickMarks: Array<JSX.Element> = [];

                const svg_ScanMaxLines: Array<JSX.Element> = [];

                {
                    {  //  Tick Marks on Vertical Axis

                        // populate svg_VerticalAxis_TickMarks

                        let tickMark_Points_WithNumbers_from_d3_Array: Array<number>

                        if ( y_Value_Max === this.props.min_Max_X_Y_Values.y_value_MAX ) {

                            tickMark_Points_WithNumbers_from_d3_Array = [ 0, this.props.min_Max_X_Y_Values.y_value_MAX / 2, this.props.min_Max_X_Y_Values.y_value_MAX ]

                        } else if ( y_Value_Max >= _y_Value_Max_CEIL_10_MIN_VALUE ) {

                            tickMark_Points_WithNumbers_from_d3_Array = [ 0, y_Value_Max / 2, y_Value_Max ]

                        } else {
                            let tickMark_Count_Main = 4;
                            //  Copy here since 'ts-ignore'
                            const tickMarks_Start = y_Value_Min
                            const tickMarks_End = y_Value_Max

                            // @ts-ignore
                            tickMark_Points_WithNumbers_from_d3_Array = d3.ticks( tickMarks_Start, tickMarks_End, tickMark_Count_Main )
                            if ( tickMark_Points_WithNumbers_from_d3_Array.length > tickMark_Count_Main + 1 ) {
                                //  Too many tick marks
                                tickMark_Count_Main = 3
                                // @ts-ignore
                                tickMark_Points_WithNumbers_from_d3_Array = d3.ticks( tickMarks_Start, tickMarks_End, tickMark_Count_Main )
                            }
                        }

                        tickMark_Points_WithNumbers_from_d3_Array = tickMark_Points_WithNumbers_from_d3_Array.reverse(); //  reverse so smallest Pixel position is processed first

                        const tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array: Array<number> = [] //  Largest Number is first !!!

                        if ( this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ) {

                            //  Main Tick Marks with numbers

                            for ( const tickMark_Point of tickMark_Points_WithNumbers_from_d3_Array ) {

                                let tickMark_Point_String: string

                                if ( tickMark_Point === 0 ) {
                                    tickMark_Point_String = "0"
                                } else {
                                    tickMark_Point_String = tickMark_Point.toExponential( 1 );
                                }

                                // let tickMark_Point_String = tickMark_Point.toString();
                                //
                                // {
                                //     const decimalPointIndex = tickMark_Point_String.indexOf(".");
                                //     if ( decimalPointIndex > -1 ) {
                                //
                                //         //  Round to 1 decimal places if more than 1 decimal places
                                //
                                //         let roundingTo = 1;
                                //
                                //         // if ( ( y_Value_Max - y_Value_Min ) < 1 ) {
                                //         //     roundingTo = 4;
                                //         // }
                                //
                                //         if ( tickMark_Point_String.length > decimalPointIndex + roundingTo + 1 ) {
                                //             tickMark_Point_String = tickMark_Point.toFixed( roundingTo );
                                //         }
                                //     }
                                // }

                                const tickMark_Y = Math.round(
                                    this.props.singleScan_Chart_Dimensions.topMargin +
                                    ( ( ( ( y_Value_Max - ( tickMark_Point - y_Value_Min ) ) / ( y_Value_Max - y_Value_Min ) ) * this.props.singleScan_Chart_Dimensions.mainContents.height ) )
                                );

                                if ( Number.isNaN( tickMark_Y ) ) {
                                    //  isNan so skip
                                    continue; // EARLY CONTINUE
                                }

                                if ( tickMark_Y < this.props.singleScan_Chart_Dimensions.topMargin || tickMark_Y > ( this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height ) ) {
                                    // Tick mark position outside of main chart area so skip
                                    continue; // EARLY CONTINUE
                                }

                                tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array.push( tickMark_Y )

                                {
                                    const element = (
                                        <line
                                            key={ "line_" + tickMark_Point }
                                            x1={ this.props.singleScan_Chart_Dimensions.leftMargin - this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_LongestForNumber - 1 }
                                            x2={ this.props.singleScan_Chart_Dimensions.leftMargin }
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
                                            x={ this.props.singleScan_Chart_Dimensions.leftMargin - this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_LongestForNumber - this.props.singleScan_Chart_Dimensions.tickMark_Spacing.tickMark_to_Label_Spacing_Horizontal }
                                            y={ tickMark_Y }
                                            textAnchor="end"
                                            dy=".35em"
                                            style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            <tspan
                                                textAnchor="end"
                                                dy=".35em"
                                                style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
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
                                    const tickMark_WithNumbers_Spacing = tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ 1 ] - tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ 0 ];
                                    const tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                    for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__Y_Position_Pixel_Array[ 0 ] - tickMarks_NoNumbers_Spacing;
                                          tickMark_Position >= this.props.singleScan_Chart_Dimensions.topMargin;
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

                            {
                                let index = 0

                                const tickMark_Y_Set = new Set<number>()

                                for ( const tickMark_Points_Without_Numbers_Y_Position_Pixel of tickMark_Points_Without_Numbers_Y_Position_Pixel_Array ) {

                                    const tickMark_Y = tickMark_Points_Without_Numbers_Y_Position_Pixel

                                    let index_For_Key = ""

                                    if ( tickMark_Y_Set.has( tickMark_Y ) ) {
                                        //  Add to 'key' the index if another 'key' will have same 'tickMark_Y' so that they are unique
                                        index_For_Key = index.toString()
                                    } else {
                                        tickMark_Y_Set.add( tickMark_Y )
                                    }

                                    {
                                        const element = (
                                            <line
                                                key={ "line_nonum_vertical_" + tickMark_Y + "_" + index_For_Key }
                                                x1={ this.props.singleScan_Chart_Dimensions.leftMargin - this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_MediumBetweenNumber - 1 }
                                                x2={ this.props.singleScan_Chart_Dimensions.leftMargin }
                                                y1={ tickMark_Y }
                                                y2={ tickMark_Y }
                                                stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                            ></line>
                                        )
                                        svg_VerticalAxis_TickMarks.push( element )
                                    }

                                    index++
                                }
                            }
                        }
                    }
                }

                {  //  Tick Marks on Horizontal Axis

                    // populate svg_HorizontalTickMarks

                    let tickMark_Points_WithNumbers_from_d3_Array: Array<number>

                    {
                        let tickMark_Count_Main = 15;
                        //  Copy here since 'ts-ignore'
                        const tickMarks_Start = x_Value_Min
                        const tickMarks_End = x_Value_Max

                        // @ts-ignore
                        tickMark_Points_WithNumbers_from_d3_Array = d3.ticks( tickMarks_Start, tickMarks_End, tickMark_Count_Main )
                        if ( tickMark_Points_WithNumbers_from_d3_Array.length > tickMark_Count_Main + 2 ) {
                            //  Too many tick marks
                            tickMark_Count_Main = 11
                            // @ts-ignore
                            tickMark_Points_WithNumbers_from_d3_Array = d3.ticks( tickMarks_Start, tickMarks_End, tickMark_Count_Main )
                        }
                    }

                    const tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array: Array<number> = []

                    if ( this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ) {

                        //  Main Tick Marks with numbers

                        const tickMark_Point_Set = new Set<number>()

                        let index = 0

                        for ( const tickMark_Point of tickMark_Points_WithNumbers_from_d3_Array ) {

                            let index_For_Key = ""

                            if ( tickMark_Point_Set.has( tickMark_Point ) ) {
                                //  Add to 'key' the index if another 'key' will have same 'tickMark_Point' so that they are unique
                                index_For_Key = index.toString()
                            } else {
                                tickMark_Point_Set.add( tickMark_Point )
                            }

                            let tickMark_Point_String = tickMark_Point.toString();

                            {
                                const decimalPointIndex = tickMark_Point_String.indexOf( "." );
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
                                this.props.singleScan_Chart_Dimensions.leftMargin +
                                ( ( tickMark_Point - x_Value_Min ) / this.state.binned_Entries.binSize_On_x_value )
                            );

                            if ( Number.isNaN( tickMark_X ) ) {
                                //  isNan so skip
                                continue; // EARLY CONTINUE
                            }

                            if ( tickMark_X < this.props.singleScan_Chart_Dimensions.leftMargin || tickMark_X > ( this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width ) ) {
                                // Tick mark position outside of main chart area so skip
                                continue; // EARLY CONTINUE
                            }

                            tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array.push( tickMark_X )

                            {
                                const element = (
                                    <line
                                        key={ "line_" + tickMark_Point + "_" + index_For_Key }
                                        x1={ tickMark_X } x2={ tickMark_X }
                                        y1={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                        y2={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height + this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_LongestForNumber }
                                        stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                    ></line>
                                )
                                svg_HorizontalAxis_TickMarks.push( element )
                            }
                            {
                                const element = (
                                    <text
                                        key={ "text_" + tickMark_Point + "_" + index_For_Key }
                                        x={ tickMark_X }
                                        y={
                                            this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height +
                                            this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_LongestForNumber + this.props.singleScan_Chart_Dimensions.tickMark_Spacing.tickMark_to_Label_Spacing_Vertical
                                        }
                                        textAnchor="middle"
                                        dy=".35em"
                                        style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                    >
                                        <tspan
                                            textAnchor="middle"
                                            dy=".35em"
                                            style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            { tickMark_Point_String }
                                        </tspan>
                                    </text>
                                )
                                svg_HorizontalAxis_TickMarks.push( element )
                            }

                            index++
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
                                const tickMark_WithNumbers_Spacing = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ 1 ] - tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ 0 ];
                                let tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                if ( tickMarks_NoNumbers_Spacing < 1 ) {
                                    tickMarks_NoNumbers_Spacing = 1
                                }

                                for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ 0 ] - tickMarks_NoNumbers_Spacing;
                                      tickMark_Position >= this.props.singleScan_Chart_Dimensions.leftMargin;
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
                                let tickMarks_NoNumbers_Spacing = tickMark_WithNumbers_Spacing / tickMark_Count;

                                if ( tickMarks_NoNumbers_Spacing < 1 ) {
                                    tickMarks_NoNumbers_Spacing = 1
                                }

                                for ( let tickMark_Position = tickMark_Points_WithNumbers_from_d3_Array__X_Position_Pixel_Array[ wn_length - 1 ] + tickMarks_NoNumbers_Spacing;
                                      tickMark_Position <= this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width;
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

                        {
                            let index = 0

                            const tickMark_X_Set = new Set<number>()

                            for ( const tickMark_Points_Without_Numbers_X_Position_Pixel of tickMark_Points_Without_Numbers_X_Position_Pixel_Array ) {

                                const tickMark_X = tickMark_Points_Without_Numbers_X_Position_Pixel

                                let index_For_Key = ""

                                if ( tickMark_X_Set.has( tickMark_X ) ) {
                                    //  Add to 'key' the index if another 'key' will have same 'tickMark_X' so that they are unique
                                    index_For_Key = index.toString()
                                } else {
                                    tickMark_X_Set.add( tickMark_X )
                                }

                                {
                                    const element = (
                                        <line
                                            key={ "line_nonum_horizontal_" + tickMark_X + "_" + index_For_Key }
                                            x1={ tickMark_X } x2={ tickMark_X }
                                            y1={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                            y2={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height + this.props.singleScan_Chart_Dimensions.tickMark_Spacing.length_MediumBetweenNumber }
                                            stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                        ></line>
                                    )
                                    svg_HorizontalAxis_TickMarks.push( element )
                                }

                                index++
                            }
                        }
                    }

                }

                const binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data__Map_BinIndex: Map<number, {
                    singleScanPeak: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak,
                    line_Label: string,
                    line_Color: string
                }> = new Map()

                {
                    //   Get binEntry OVERRIDE for color, label, and scan peak

                    //   TODO:  WARNING:  This will probably NOT work properly if the mz_Ranges_To_Color are OVERLAPPING

                    //    TODO: IMPORTANT:   Only ONE bin can be set for each M/Z Range

                    //  TODO  FAKE  Must remove 'console.warn' in this loop

                    console.warn( "FAKE  Must remove 'console.warn' in this loop" )

                    //  Validate the ranges do not overlap


                    {
                        const mz_Ranges_To_Color_Length = mz_Ranges_To_Color.length

                        for ( let main_Index = 0; main_Index < mz_Ranges_To_Color_Length; main_Index++ ) {

                            const mz_Range_To_Color__For_MainIndex = mz_Ranges_To_Color[ main_Index ]
                            if ( ! mz_Range_To_Color__For_MainIndex ) {
                                continue
                            }

                            for ( let compare_Index = ( main_Index + 1 ); compare_Index < mz_Ranges_To_Color_Length; compare_Index++ ) {

                                const mz_Range_To_Color__For_CompareIndex = mz_Ranges_To_Color[ compare_Index ]
                                if ( ! mz_Range_To_Color__For_CompareIndex ) {
                                    continue
                                }

                                //  x1 <= y2 && y1 <= x2

                                if ( mz_Range_To_Color__For_MainIndex.m_Over_Z_Window_Min <= mz_Range_To_Color__For_CompareIndex.m_Over_Z_Window_Max
                                    && mz_Range_To_Color__For_CompareIndex.m_Over_Z_Window_Min <= mz_Range_To_Color__For_MainIndex.m_Over_Z_Window_Max ) {

                                    //  Found Overlay so error

                                    const msg = "mz_Ranges_To_Color has overlapping ranges.  Range 1: Min: " +
                                        mz_Range_To_Color__For_MainIndex.m_Over_Z_Window_Min +
                                        ", Max: " + mz_Range_To_Color__For_MainIndex.m_Over_Z_Window_Max +
                                        ", Range 2: Min: " +
                                        mz_Range_To_Color__For_CompareIndex.m_Over_Z_Window_Min +
                                        ", Max: " + mz_Range_To_Color__For_CompareIndex.m_Over_Z_Window_Max
                                    console.warn(msg)
                                    throw Error(msg)
                                }
                            }
                        }
                    }

                    //  Main processing

                    for ( const mz_Range_To_Color of mz_Ranges_To_Color ) {

                        let binIndex_Found: number
                        let binEntry_Found: Binned_Entries_On_X_value_Entry

                        let entryBinned_Found_For_MZ_Ranges: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak = undefined
                        let mz_Range_To_Color_Found: {m_Over_Z_Window_Min: number, m_Over_Z_Window_Max: number, line_Label: string, line_Color: string} = undefined

                        const binned_Entries_Entries = this.state.binned_Entries.entries

                        const binned_Entries_Entries_Length = binned_Entries_Entries.length

                        for ( let binIndex = 0; binIndex < binned_Entries_Entries_Length; binIndex++ ) {

                            const binEntry = binned_Entries_Entries[ binIndex ]
                            if ( !binEntry ) {
                                continue; // EARLY CONTINUE
                            }

                            for ( const entryBinned of binEntry.entries_Binned ) {

                                if ( entryBinned.m_over_z >= mz_Range_To_Color.m_Over_Z_Window_Min
                                    && entryBinned.m_over_z <= mz_Range_To_Color.m_Over_Z_Window_Max ) {

                                    if ( entryBinned_Found_For_MZ_Ranges ) {

                                        if ( entryBinned_Found_For_MZ_Ranges.intensity < entryBinned.intensity ) {
                                            //  Keep entryBinned with largest intensity

                                            binIndex_Found = binIndex
                                            binEntry_Found = binEntry

                                            entryBinned_Found_For_MZ_Ranges = entryBinned
                                            mz_Range_To_Color_Found = mz_Range_To_Color
                                        }
                                    } else {
                                        //  NO Saved value so save this value

                                        binIndex_Found = binIndex
                                        binEntry_Found = binEntry

                                        entryBinned_Found_For_MZ_Ranges = entryBinned
                                        mz_Range_To_Color_Found = mz_Range_To_Color
                                    }
                                }
                            }
                        }

                        if ( entryBinned_Found_For_MZ_Ranges ) {

                            binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data__Map_BinIndex.set( binIndex_Found, { singleScanPeak: entryBinned_Found_For_MZ_Ranges, line_Color: mz_Range_To_Color_Found.line_Color, line_Label: mz_Range_To_Color_Found.line_Label } )

                            console.warn( "Entry for scan peak Found mz_Range_To_Color.  binIndex_Found: " + binIndex_Found + ", entry.m_over_z: " + entryBinned_Found_For_MZ_Ranges.m_over_z + ", entry.intensity: " + entryBinned_Found_For_MZ_Ranges.intensity )

                            //  TODO  TEMP extra code to show that other peaks in the bin have a larger intensity

                            // for ( const entryBinned of binEntry.entries_Binned ) {
                            //     if ( entryBinned.intensity > entryBinned_Found_For_MZ_Ranges.intensity ) {
                            //         console.warn( "( entryBinned.intensity > entryBinned_Found_For_MZ_Ranges.intensity ).  binIndex: " + binIndex )
                            //     }
                            // }
                        }
                    }
                }



                // populate svg_ScanMaxLines

                //  Lines for each binned entry AND Rect for each highlighted area

                const LINE_FULL_HEIGHT = this.props.singleScan_Chart_Dimensions.mainContents.height;
                const LINE_BOTTOM_POSITION = LINE_FULL_HEIGHT + this.props.singleScan_Chart_Dimensions.topMargin;


                {
                    //  <rect> for mz ranges of highlighted

                    let mz_Range_To_Color_Index = -1

                    for ( const mz_Range_To_Color of mz_Ranges_To_Color ) {

                        mz_Range_To_Color_Index++

                        if ( mz_Range_To_Color.m_Over_Z_Window_Min > x_Value_Max
                            || mz_Range_To_Color.m_Over_Z_Window_Max < x_Value_Min ) {
                            //  range NOT within overall Min/Max so skip
                            continue  // EARLY CONTINUE
                        }

                        let mz_Start = mz_Range_To_Color.m_Over_Z_Window_Min
                        let mz_End = mz_Range_To_Color.m_Over_Z_Window_Max

                        //  Limit to overall Min/Max
                        if ( mz_Start < x_Value_Min ) {
                            mz_Start = x_Value_Min
                        }
                        if ( mz_End > x_Value_Max ) {
                            mz_End = x_Value_Max
                        }


                        const mz_Start_Pixel = Math.round(
                            this.props.singleScan_Chart_Dimensions.leftMargin +
                            ( ( mz_Start - x_Value_Min ) / this.state.binned_Entries.binSize_On_x_value )
                        );

                        const mz_End_Pixel = Math.round(
                            this.props.singleScan_Chart_Dimensions.leftMargin +
                            ( ( mz_End - x_Value_Min ) / this.state.binned_Entries.binSize_On_x_value )
                        );

                        const mz_Width = mz_End_Pixel - mz_Start_Pixel + 1

                        let rect_Y = LINE_BOTTOM_POSITION - LINE_FULL_HEIGHT

                        const color = mz_Range_To_Color.surroundingRange_Color

                        const element = (
                            <rect
                                key={ "mz_Start_Pixel_" + mz_Start_Pixel + "_index_" + mz_Range_To_Color_Index }
                                fill={ color }
                                fillOpacity="1"
                                y={ rect_Y }
                                height={ this.props.singleScan_Chart_Dimensions.mainContents.height - 0.5 }
                                x={ mz_Start_Pixel }
                                width={ mz_Width }
                            />
                        )

                        svg_ScanMaxLines.push( element )
                    }
                }

                {
                    const binned_Entries_Entries = this.state.binned_Entries.entries

                    const binned_Entries_Entries_Length = binned_Entries_Entries.length

                    for ( let binIndex = 0; binIndex < binned_Entries_Entries_Length; binIndex++ ) {

                        const binEntry = binned_Entries_Entries[ binIndex ]
                        if ( !binEntry ) {
                            continue; // EARLY CONTINUE
                        }

                        let entry_UseFor_Y_Value_ForPlot = binEntry.entry_UseFor_Y_Value_ForPlot  //  entry with largest intensity

                        { //  override entry_UseFor_Y_Value_ForPlot.  If plotting a different line color then plot the intensity for that peak

                            const entry_UseFor_Y_Value_ForPlot_Override__And_Data = binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data__Map_BinIndex.get( binIndex );
                            if ( entry_UseFor_Y_Value_ForPlot_Override__And_Data ) {
                                entry_UseFor_Y_Value_ForPlot = entry_UseFor_Y_Value_ForPlot_Override__And_Data.singleScanPeak;
                            }
                        }

                        let y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = entry_UseFor_Y_Value_ForPlot.intensity / y_Value_Max;

                        if ( y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value > 1 ) {
                            y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = 1;  // clip at 1
                        }
                        if ( y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value < 0 ) {
                            y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value = 0;  // clip at 0
                        }

                        const line_X = binIndex + 1 + this.props.singleScan_Chart_Dimensions.leftMargin;
                        let line_Y_1 = LINE_BOTTOM_POSITION - Math.round( LINE_FULL_HEIGHT * y_value_FractionOfMax_Input__FractionOfMaxSelected_Y_Value );

                        if ( line_Y_1 === LINE_BOTTOM_POSITION ) {
                            line_Y_1 = LINE_BOTTOM_POSITION - 1; // Min height of 1 px
                        }

                        const line_Y_2 = LINE_BOTTOM_POSITION - 0.5

                        let lineColor: string = undefined

                        {
                            const binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data = binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data__Map_BinIndex.get( binIndex )
                            if ( binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data ) {
                                lineColor = binEntry__Entry_UseFor_Y_Value_ForPlot_Override__And_Data.line_Color
                            }
                        }

                        if ( ! lineColor ) {
                            //  Default color
                            lineColor = "#000000"
                        }

                        const element = (
                            <line key={ "svg_ScanMaxLines_line_binIndex_" + binIndex } x1={ line_X } x2={ line_X } y1={ line_Y_1 } y2={ line_Y_2 }
                                  stroke={ lineColor } fill="none" style={ { strokeWidth: 1 } }></line>
                        )

                        svg_ScanMaxLines.push( element )
                    }
                }

                //  Highlighted Legend

                let highlightedPeaks_Legend: JSX.Element = undefined

                if ( ! this.props.zoomVisualization_Instance ) {

                    if (mz_Ranges_To_Color.length > 0 ) {  //  Highlighted Peaks Legend

                        const _INDENT_LEGEND_DETAIL_LINES = 10 ;

                        const svg_width = 10
                        const svg_height = 10
                        const marginLeft_From_SVG = 10

                        const line_Y = Math.floor( svg_height / 2 )

                        const legend_Entries_Lines: Array<JSX.Element> = []
                        const legend_Entries_Squares: Array<JSX.Element> = []

                        let index = -1
                        for ( const mz_Range_To_Color of mz_Ranges_To_Color ) {

                            index++

                            const lineEntry = (
                                <div
                                    key={ index + "_line_legend" }
                                    style={ { marginLeft: _INDENT_LEGEND_DETAIL_LINES } }
                                >
                                    <svg width={ svg_width } height={ svg_height }>
                                        <line
                                            x1={ 0 } x2={ svg_width } y1={ line_Y } y2={ line_Y } stroke={ mz_Range_To_Color.line_Color }
                                        />
                                    </svg>
                                    <span
                                        style={ { marginLeft: marginLeft_From_SVG } }
                                    >{ mz_Range_To_Color.line_Label }</span>
                                </div>
                            )

                            legend_Entries_Lines.push( lineEntry)

                            const squareEntry = (
                                <div
                                    key={ index + "_square_legend" }
                                    style={ { marginLeft: _INDENT_LEGEND_DETAIL_LINES } }
                                >
                                    <svg width={ svg_width } height={ svg_height }>
                                        <rect
                                            x={ 0 } width={ svg_width } y={ 0 } height={ svg_height } fill={ mz_Range_To_Color.surroundingRange_Color }
                                        />
                                    </svg>
                                    <span
                                        style={ { marginLeft: marginLeft_From_SVG } }
                                    >
                                        { ( ( mz_Range_To_Color.m_Over_Z_Window_Min + mz_Range_To_Color.m_Over_Z_Window_Max ) / 2 ).toFixed( 4 )  }
                                    </span>
                                    <span>  m/z (+/- { _PPM_VALUE_ }ppm)</span>
                                </div>
                            )

                            legend_Entries_Squares.push( squareEntry)
                        }


                        highlightedPeaks_Legend = (
                            <div
                                style={ { float: "left" } }
                            >
                                <div>
                                    Chosen peaks:
                                </div>
                                { legend_Entries_Lines }
                                <div style={ { marginTop: 4 } }>
                                    Feature m/z window
                                </div>
                                { legend_Entries_Squares }
                            </div>
                        )

                    }
                }


                let zoomRange__ZoomVisualization_Instance_For_RectOnTop_Graphic_Element: JSX.Element = undefined

                { //  Zoom Range Rectangle for "Zoom Visualization" render of this component

                    const zoomRange__ZoomVisualization_Instance_For_RectOnTop = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange__ZoomVisualization_Instance_For_RectOnTop

                    if ( zoomRange__ZoomVisualization_Instance_For_RectOnTop ) {

                        const innerBox_Min_Height = 8

                        const wholeChart_Width = this.props.singleScan_Chart_Dimensions.mainContents.width
                        const wholeChart_Height = this.props.singleScan_Chart_Dimensions.mainContents.height

                        const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer();

                        const total_X_Min_Max_Difference = this.props.min_Max_X_Y_Values.x_value_MAX - this.props.min_Max_X_Y_Values.x_value_MIN

                        const min_Fraction = ( zoomRange__ZoomVisualization_Instance_For_RectOnTop.mz_Min_ZoomRange - this.props.min_Max_X_Y_Values.x_value_MIN ) / total_X_Min_Max_Difference
                        const max_Fraction = ( this.props.min_Max_X_Y_Values.x_value_MAX - zoomRange__ZoomVisualization_Instance_For_RectOnTop.mz_Max_ZoomRange ) / total_X_Min_Max_Difference

                        const zoom_X_Position = Math.floor( min_Fraction * wholeChart_Width )
                        let zoom_Width = wholeChart_Width - Math.ceil( max_Fraction * wholeChart_Width ) - zoom_X_Position + 2
                        if ( zoom_Width > wholeChart_Width ) {
                            zoom_Width = wholeChart_Width
                        }

                        const y_Fraction = zoomRange__ZoomVisualization_Instance_For_RectOnTop.tic_Max_ZoomRange / this.props.min_Max_X_Y_Values.y_value_MAX

                        let zoom_Height = Math.floor( y_Fraction * wholeChart_Height )
                        if ( zoom_Height < innerBox_Min_Height ) {
                            zoom_Height = innerBox_Min_Height
                        }
                        if ( zoom_Height > wholeChart_Height ) {
                            zoom_Height = wholeChart_Height
                        }

                        const zoom_Y_Position = wholeChart_Height - zoom_Height

                        zoomRange__ZoomVisualization_Instance_For_RectOnTop_Graphic_Element = (
                            <>
                                {/*  Outer Box  */}
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ <span>All Of Scan Peaks</span> }
                                    { ...tooltip_Main_Props }
                                >
                                    <rect
                                        x={ 0 } y={ 0 } width={ wholeChart_Width } height={ wholeChart_Height }
                                        stroke="" strokeWidth={ 0 } fill="white" opacity={ 0 }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                {/*  Inner Box  */}
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ <span>Shown Scan Peaks</span> }
                                    { ...tooltip_Main_Props }
                                >
                                    <rect
                                        x={ zoom_X_Position } y={ zoom_Y_Position } width={ zoom_Width } height={ zoom_Height }
                                        stroke="" strokeWidth={ 0 } fill={ limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_dark } opacity="0.3"
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </>
                        )

                    }
                }

                let div_Containing_Main_SVG_CSS: React.CSSProperties = { float: "left", height: chart_Height_Overall }

                if ( this.props.zoomVisualization_Instance ) {
                    //  Remove Float Left
                    div_Containing_Main_SVG_CSS.float = undefined
                }


                return (
                    <div>
                        <div

                            // onClick={ event => { console.warn("<div> containing <svg> On Click") } }
                        >
                            <div style={ div_Containing_Main_SVG_CSS }>

                                <svg width={ chart_Width_Overall } height={ chart_Height_Overall }
                                     style={ { margin: 0, padding: 0 } }>

                                    {/* REMOVED -- Rect under the main chart area  */ }
                                    {/*<rect*/}
                                    {/*    x={ this.props.singleScan_Chart_Dimensions.leftMargin + 1 } y={ 0 - 1 }*/}
                                    {/*    width={ this.props.singleScan_Chart_Dimensions.mainContents.width - 1 }*/}
                                    {/*    height={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }*/}
                                    {/*    fill="#EEEEEE"*/}
                                    {/*/>*/}

                                    {/*  Y Axis Label left of chart   */ }

                                    { ( this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ) ? (

                                        <g
                                            transform={ "translate(" + 6 + ", " + ( this.props.singleScan_Chart_Dimensions.topMargin + Math.round( this.props.singleScan_Chart_Dimensions.mainContents.height / 2 ) ) + ")" }
                                        >
                                            <text
                                                transform="rotate(270)"
                                                textAnchor="middle"
                                                dy=".35em"
                                                style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                            >
                                                <tspan
                                                    textAnchor="middle"
                                                    dy=".35em"
                                                    style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                                    transform="rotate(90)"
                                                >
                                                    Intensity
                                                </tspan>
                                            </text>
                                        </g>
                                    ) : null }

                                    {/*  Line and Tick Marks on Left Side  */ }

                                    {/*  Line on left side  */ }

                                    { this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ? (
                                        <line
                                            x1={ this.props.singleScan_Chart_Dimensions.leftMargin } x2={ this.props.singleScan_Chart_Dimensions.leftMargin }
                                            y1={ this.props.singleScan_Chart_Dimensions.topMargin }
                                            y2={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                            stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                        ></line>
                                    ) : null }

                                    { svg_VerticalAxis_TickMarks }

                                    {/*  -----------  */ }

                                    {/*  Line and Tick Marks on Bottom  */ }

                                    {/*  Line on bottom side*/ }

                                    { this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ? (
                                        <line
                                            x1={ this.props.singleScan_Chart_Dimensions.leftMargin - 1 }
                                            x2={ this.props.singleScan_Chart_Dimensions.leftMargin + this.props.singleScan_Chart_Dimensions.mainContents.width }
                                            y1={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                            y2={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                            stroke="#000000" fill="none" style={ { strokeWidth: 1 } }
                                        ></line>
                                    ) : null }

                                    { svg_HorizontalAxis_TickMarks }

                                    {/*  X Axis Label under chart   */ }

                                    { this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ? (

                                        <text
                                            x={ this.props.singleScan_Chart_Dimensions.leftMargin + Math.round( this.props.singleScan_Chart_Dimensions.mainContents.width / 2 ) }
                                            y={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height + 35 }
                                            textAnchor="middle"
                                            dy=".35em" style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            <tspan
                                                textAnchor="middle"
                                                dy=".35em"
                                                style={ { fontSize: 12, fontFamily: "Helvetica, Arial, sans-serif" } }
                                            >
                                                m/z
                                            </tspan>
                                        </text>
                                    ) : null }

                                    {/*  -----------  */ }

                                    {/*  Main Chart Lines  */ }
                                    { svg_ScanMaxLines }

                                    {/* Selection Cover */ }
                                    <rect
                                        ref={ this._rect_SelectionCover_Ref }
                                        fill="#FFFFE0"
                                        fillOpacity="0.5"
                                        y={ 0 - 1 }
                                        height={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
                                        //  Initial x and width
                                        x={ this.props.singleScan_Chart_Dimensions.leftMargin + 1 }
                                        width={ 0 }
                                    />

                                    {/*  Rect on Top of the main chart area  */ }

                                    { this.props.singleScan_Chart_Dimensions.leftMargin > 0 && this.props.singleScan_Chart_Dimensions.bottomMargin > 0 && this.props.singleScan_Chart_Dimensions.tickMark_Spacing ? (
                                        <rect
                                            ref={ this._main_Rect_overlay_Ref }
                                            x={ this.props.singleScan_Chart_Dimensions.leftMargin + 1 } y={ 0 - 1 }
                                            width={ this.props.singleScan_Chart_Dimensions.mainContents.width - 1 }
                                            height={ this.props.singleScan_Chart_Dimensions.topMargin + this.props.singleScan_Chart_Dimensions.mainContents.height }
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
                                    ) : null }

                                    {/*  Only populated for Zoom Visualization  */}
                                    { zoomRange__ZoomVisualization_Instance_For_RectOnTop_Graphic_Element }

                                    {/*<line x1="686" x2="686" y1="50" y2="25" stroke="#000000" fill="none" style={ { strokeWidth: 1 } }></line>*/ }
                                    {/*<rect x="284" y="125" width="637" height="25" style={ { fillOpacity: 1 } }></rect>*/ }

                                    {/*<text x="418" y="222" style={ { cursor: "default" } } fill="#000000">{ textValue }*/ }
                                    {/*</text>*/ }

                                    {/*This Text is clipped by the top of the svg.  The 'dy=".35em"' was thought to make the 'y' be the top of the text but this appears to not be true*/ }
                                    {/*<text x="18" y="2" dy=".35em" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } } >*/ }
                                    {/*    <tspan dy=".35em" x="" style={ { fontSize:12, fontFamily: "Helvetica, Arial, sans-serif" } }>Row Label 1</tspan>*/ }
                                    {/*</text>*/ }

                                </svg>
                            </div>
                            { highlightedPeaks_Legend }
                            <div style={ { clear: "both" } }></div>
                        </div>
                        {/*<div>*/ }
                        {/*    Canvas*/ }
                        {/*</div>*/ }
                        {/*<canvas id="canvas" height={ 200 } width={ 1600 }></canvas>*/ }
                    </div>
                );
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
}


//////////////////////////

//   Component for Zoom of Single Scan

/**
 *
 */
interface Internal__Zoom_Of_SingleScan_Plot_Component_Props {

    scanFileBrowserPage_SingleScan_UserSelections_StateObject: ScanFileBrowserPage_SingleScan_UserSelections_StateObject

    forceUpdateObject_StateObjectChanged: object

    scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback: () => void
    zoomOut_Callback: () => void

    autoZoom_Y_Axis_Value: boolean

    autoZoom_Y_Axis_ValueChanged_Callback: ScanFileBrowser_SingleScan_Plot__AutoZoom_Y_Axis_ValueChanged_CallbackFunction_Type
}

/**
 *
 */
interface Internal__Zoom_Of_SingleScan_Plot_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class Internal__Zoom_Of_SingleScan_Plot_Component extends React.Component< Internal__Zoom_Of_SingleScan_Plot_Component_Props, Internal__Zoom_Of_SingleScan_Plot_Component_State > {

    //  bind to 'this' for passing as parameters

    private readonly _main_Rect_overlay_Ref: React.RefObject<SVGRectElement>
    private readonly _rect_SelectionCover_Ref: React.RefObject<SVGRectElement>

    private _prevValue__forceUpdateObject_StateObjectChanged: object

    private _mz_Min_ZoomRange_LOCAL : string
    private _mz_Max_ZoomRange_LOCAL : string
    private _tic_Max_ZoomRange_LOCAL : string

    private _prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback: number

    private readonly _scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback__CallbackDelay_Via_SetTimeout = 500

    /**
     *
     */
    constructor( props: Internal__Zoom_Of_SingleScan_Plot_Component_Props ) {
        super( props );
        try {
            this._main_Rect_overlay_Ref = React.createRef();
            this._rect_SelectionCover_Ref = React.createRef();

            this._prevValue__forceUpdateObject_StateObjectChanged = props.forceUpdateObject_StateObjectChanged;

            this._populate_Local_Inputs_From_Props( props )

            this.state = {
                force_Rerender: {}
            };
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<Internal__Zoom_Of_SingleScan_Plot_Component_Props>, prevState: Readonly<Internal__Zoom_Of_SingleScan_Plot_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.forceUpdateObject_StateObjectChanged !== this.props.forceUpdateObject_StateObjectChanged ) {

                //  Update Input fields to current values
                this._populate_Local_Inputs_From_Props( this.props )
                this.setState({ force_Rerender: {} })
            }
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _populate_Local_Inputs_From_Props( props: Internal__Zoom_Of_SingleScan_Plot_Component_Props ) {

        this._mz_Min_ZoomRange_LOCAL =
            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange !== undefined
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange !== null ?
                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Min_ZoomRange.toString() : ""

        this._mz_Max_ZoomRange_LOCAL =
            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Max_ZoomRange !== undefined
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Max_ZoomRange !== null ?
                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().mz_Max_ZoomRange.toString() : ""

        this._tic_Max_ZoomRange_LOCAL =
            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange !== undefined
            && this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange !== null ?
                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected().tic_Max_ZoomRange.toString() : ""
    }

    /**
     *
     */
    private _call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback() {

        try {
            if ( this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback ) {
                window.clearTimeout( this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback )
            }
        } catch ( e ) {
            //  Eat Exception
        }

        this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback =
            window.setTimeout( () => {
                try {
                    this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback = undefined

                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, this._scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback__CallbackDelay_Via_SetTimeout )
    }

    /**
     *
     */
    render() {

        return (

            <div>

                <div>
                    <span>Autozoom Y axis </span>
                    <input
                        type="checkbox"
                        defaultChecked={ this.props.autoZoom_Y_Axis_Value }
                        onChange={ event => {
                            try {
                                this.props.autoZoom_Y_Axis_ValueChanged_Callback({ autoZoom_Y_Axis_Value: event.target.checked })

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        }}
                    />
                </div>

                <div>
                    <span style={ { fontWeight: "bold" } }>Zoom: </span>

                    <span style={ { marginLeft: 10 } }>M/Z: </span>

                    <span>Start: </span>
                    <input
                        style={ { width: 90 } }
                        value={ this._mz_Min_ZoomRange_LOCAL }
                        onChange={ event => { try {

                            const newValue_String = event.target.value

                            this.setState({ force_Rerender: {} })

                            if ( newValue_String === "" || newValue_String === "." ) {

                                this._mz_Min_ZoomRange_LOCAL = newValue_String

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: undefined,
                                        mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                        tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            const newValue_Number = Number.parseFloat( newValue_String )

                            if ( Number.isNaN( newValue_Number ) ) {

                                this._mz_Min_ZoomRange_LOCAL = ""

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: undefined,
                                        mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                        tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            this._mz_Min_ZoomRange_LOCAL = newValue_Number.toString()

                            let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                            if ( currentZoomSelected ) {
                                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                    mz_Min_ZoomRange: newValue_Number,
                                    mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                    tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                })

                                this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                                return // EARLY RETURN
                            }

                            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                mz_Min_ZoomRange: newValue_Number,
                                mz_Max_ZoomRange: undefined,
                                tic_Max_ZoomRange: undefined
                            })

                            this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        } } }
                    />
                    <span> End: </span>
                    <input
                        style={ { width: 90 } }
                        value={ this._mz_Max_ZoomRange_LOCAL }
                        onChange={ event => { try {

                            const newValue_String = event.target.value

                            this.setState({ force_Rerender: {} })

                            if ( newValue_String === "" || newValue_String === "." ) {

                                this._mz_Max_ZoomRange_LOCAL = newValue_String

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                        mz_Max_ZoomRange: undefined,
                                        tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            const newValue_Number = Number.parseFloat( newValue_String )

                            if ( Number.isNaN( newValue_Number ) ) {

                                this._mz_Max_ZoomRange_LOCAL = ""

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                        mz_Max_ZoomRange: undefined,
                                        tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            this._mz_Max_ZoomRange_LOCAL = newValue_Number.toString()

                            let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                            if ( currentZoomSelected ) {
                                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                    mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                    mz_Max_ZoomRange: newValue_Number,
                                    tic_Max_ZoomRange: currentZoomSelected.tic_Max_ZoomRange
                                })

                                this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                                return // EARLY RETURN
                            }

                            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                mz_Min_ZoomRange: undefined,
                                mz_Max_ZoomRange: newValue_Number,
                                tic_Max_ZoomRange: undefined
                            })

                            this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        } } }
                    />
                    <span> </span>

                    <span style={ { marginLeft: 10 } }>Max intensity: </span>

                    <input
                        style={ { width: 100 } }
                        value={ this._tic_Max_ZoomRange_LOCAL }
                        onChange={ event => { try {

                            const newValue_String = event.target.value

                            this.setState({ force_Rerender: {} })

                            if ( newValue_String === "" || newValue_String === "." ) {

                                this._tic_Max_ZoomRange_LOCAL = newValue_String

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                        mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                        tic_Max_ZoomRange: undefined
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            const newValue_Number = Number.parseFloat( newValue_String )

                            if ( Number.isNaN( newValue_Number ) ) {

                                this._tic_Max_ZoomRange_LOCAL = ""

                                let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                                if ( currentZoomSelected ) {
                                    this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                        mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                        mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                        tic_Max_ZoomRange: undefined
                                    })

                                    this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                }

                                return // EARLY RETURN
                            }

                            this._tic_Max_ZoomRange_LOCAL = newValue_Number.toString()

                            let currentZoomSelected = this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.getZoomRange_Selected()
                            if ( currentZoomSelected ) {
                                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                    mz_Min_ZoomRange: currentZoomSelected.mz_Min_ZoomRange,
                                    mz_Max_ZoomRange: currentZoomSelected.mz_Max_ZoomRange,
                                    tic_Max_ZoomRange: newValue_Number
                                })

                                this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                                return // EARLY RETURN
                            }

                            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected({
                                mz_Min_ZoomRange: undefined,
                                mz_Max_ZoomRange: undefined,
                                tic_Max_ZoomRange: newValue_Number
                            })

                            this._call__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        } } }
                    />

                    <span> </span>

                    <button
                        style={ { marginLeft: 15 } }
                        onClick={ event => {
                            try {
                                this.props.zoomOut_Callback()

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        } }
                    >
                        Zoom Out
                    </button>

                    <span> </span>

                    <button
                        style={ { marginLeft: 15 } }
                        onClick={ event => {
                            try {
                                this._mz_Min_ZoomRange_LOCAL = ""
                                this._mz_Max_ZoomRange_LOCAL = ""
                                this._tic_Max_ZoomRange_LOCAL = ""
                                this.setState({ force_Rerender: {} })

                                this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject.setZoomRange_Selected( undefined )

                                try {
                                    if ( this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback ) {
                                        window.clearTimeout( this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback )
                                    }
                                } catch ( e ) {
                                    //  Eat Exception
                                }

                                this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback =
                                    window.setTimeout( () => {
                                        try {
                                            this._prev_TimeoutId__Calling__scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback = undefined

                                            this.props.scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback()
                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    }, this._scanFileBrowserPage_SingleScan_UserSelections_StateObject__Changed__Callback__CallbackDelay_Via_SetTimeout )

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        } }
                    >
                        Clear Zoom
                    </button>
                </div>
            </div>
        )
    }
}

//////////////////////////

//

class Internal__ValuesInvalidIn__ScanFileBrowserPage_SingleScan_UserSelections_StateObject {

    mz_Min_ZoomRange_Negative?: boolean
    mz_Max_ZoomRange_Negative?: boolean

    mz_Min_ZoomRange_GreaterThan_mz_Max_ZoomRange_Negative?: boolean

    tic_Max_ZoomRange_Negative?: boolean
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
const _compute_Min_Max_X_Y_Values = function (props : ScanFileBrowser_SingleScan_Plot_Main_Container_Component_Props) : Min_Max_X_Y_Values {

    let y_value_MIN: number
    let y_value_MAX: number

    let x_value_MIN: number
    let x_value_MAX: number

    for ( const scanPeak of props.scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.scanPeaksList ) {

        if (y_value_MIN === undefined) {
            y_value_MIN = scanPeak.intensity
            y_value_MAX = scanPeak.intensity
        } else {
            if (y_value_MIN > scanPeak.intensity) {
                y_value_MIN = scanPeak.intensity;
            }
            if (y_value_MAX < scanPeak.intensity) {
                y_value_MAX = scanPeak.intensity;
            }
        }

        if (x_value_MIN === undefined) {
            x_value_MIN = scanPeak.m_over_z
            x_value_MAX = scanPeak.m_over_z
        } else {
            if (x_value_MIN > scanPeak.m_over_z) {
                x_value_MIN = scanPeak.m_over_z;
            }
            if (x_value_MAX < scanPeak.m_over_z) {
                x_value_MAX = scanPeak.m_over_z;
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

class Binned_Entries_On_X_value_M_over_Z_Root {
    entries: Array<Binned_Entries_On_X_value_Entry>
    binSize_On_x_value: number
}

class Binned_Entries_On_X_value_Entry {
    entries_Binned: Array<ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak>

    // Compute from entries_Binned
    //  Entry in entries_Binned with largest intensity
    entry_UseFor_Y_Value_ForPlot: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak
}

/**
 *
 * @param props
 */
const _bin_Entries_On_X_Y_ZoomRange__OR__min_Max_X_Y_Values = function (
    {
        bin_Count,
        scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber,
        min_Max_X_Y_Values,
        scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange
    } : {
        bin_Count: number
        scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber
        min_Max_X_Y_Values: Min_Max_X_Y_Values
        scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange
    }
) : Binned_Entries_On_X_value_M_over_Z_Root {

    let x_Value_Min = min_Max_X_Y_Values.x_value_MIN;
    let x_Value_Max = min_Max_X_Y_Values.x_value_MAX;

    //  Update for selected
    if ( scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange !== undefined && scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange.mz_Min_ZoomRange !== undefined ) {
        x_Value_Min = scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange.mz_Min_ZoomRange;
    }
    if ( scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange !== undefined && scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange.mz_Max_ZoomRange !== undefined ) {
        x_Value_Max = scanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange.mz_Max_ZoomRange;
    }

    if ( x_Value_Min > x_Value_Max ) {
        //  min > max so put back to computed min/max
        x_Value_Min = min_Max_X_Y_Values.x_value_MIN;
        x_Value_Max = min_Max_X_Y_Values.x_value_MAX;
    }

    const binSize_On_x_value = ( x_Value_Max - x_Value_Min ) / bin_Count

    console.log("scanPeaks_Like_GenericViewer_Root_Component: x_value_MIN: " + x_Value_Min + ", x_value_MAX: " + x_Value_Max + ", binSize_On_x_value: " + binSize_On_x_value )

    const binned_Entries_On_X_Value: Array<Binned_Entries_On_X_value_Entry> = []

    for ( const scanPeak of scanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber.scanPeaksList ) {

        if ( scanPeak.m_over_z < x_Value_Min || scanPeak.m_over_z > x_Value_Max ) {
            //  Entry x_value outside the Min and Max so skip
            continue; //  EARLY CONTINUE
        }

        const binIndex = Math.floor( ( scanPeak.m_over_z - x_Value_Min ) / binSize_On_x_value )

        const binEntry_Existing = binned_Entries_On_X_Value[ binIndex ];
        if ( binEntry_Existing ) {
            binEntry_Existing.entries_Binned.push( scanPeak )
        } else {
            binned_Entries_On_X_Value[ binIndex ] = {
                entries_Binned: [ scanPeak ],
                entry_UseFor_Y_Value_ForPlot: undefined,  // Set below
            }
        }
    }

    //  Find 'For Line Y axis value' entry and compute 'y_value_FractionOfMax'
    for ( const binned_Entry of binned_Entries_On_X_Value ) {

        if ( ! binned_Entry ) {
            //  No value at index so skip
            continue; // EARLY CONTINUE
        }

        //  Find singleEntryForPlot with largest y_value / intensity

        let  singleEntryForPlot_EntryToUse: ScanFileBrowser__Get_SingleScanData_SpectralStorage_YES_Peaks_Data_ForSingleScanNumber_SingleScanPeak = undefined

        for ( const singleEntryForPlot of binned_Entry.entries_Binned ) {
            if ( ! singleEntryForPlot_EntryToUse ) {
                singleEntryForPlot_EntryToUse = singleEntryForPlot;
            } else if ( singleEntryForPlot_EntryToUse.intensity < singleEntryForPlot.intensity ) {
                singleEntryForPlot_EntryToUse = singleEntryForPlot;
            }
        }

        binned_Entry.entry_UseFor_Y_Value_ForPlot = singleEntryForPlot_EntryToUse
    }

    const result: Binned_Entries_On_X_value_M_over_Z_Root = {
        entries: binned_Entries_On_X_Value,
        binSize_On_x_value
    }

    return result;
}



/**
 *
 * @param isotope_Number
 * @param charge
 * @private
 */
const _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number = function(
    {
        isotope_Number, charge
    } : {
        isotope_Number: number  // the +1, +2, ...  Isotope
        charge: number
    }
) : number {
    return isotope_Number * C13_MASS_DELTA / charge
}


/**
 *
 * @param ppm_ExtendRange_AddSubtract_ToMinMaxValues
 * @param m_Over_Z_Mass
 */
const _compute_PPM_Mass_For_M_Over_Z_PlusMinus__using_constant__PPM_VALUE_ = function (
    {
        m_Over_Z_Mass
    } : {
        m_Over_Z_Mass: number
    }
) : number {
    const ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus = m_Over_Z_Mass * _PPM_VALUE_ / 1000000;  //  1000000d is for 1E6;

    return ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus;
}
