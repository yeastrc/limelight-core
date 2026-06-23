/*
 * chromatogram_Common_OptionSelector_Components.tsx
 *
 * The four chart-option selector React components (Plot Type, Peak Selection, Smoothing,
 * MS1 Window Size), extracted byte-identical from the two chromatogram components so they
 * live in one place.  See EXTRACTION_PLAN.md in this directory.
 */

import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component } from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import { chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum, chromatogram_Common_Options__plotType_IonCurrent_VS_Ions_Select_DEFAULT, chromatogram_Common_Options__ScanPeakSelect_Enum, chromatogram_Common_Options__scanPeakSelect_DEFAULT, chromatogram_Common_Options__SmoothingOption_Enum, chromatogram_Common_Options__smoothingOption_Selection_DEFAULT, chromatogram_Common_Options__DEFAULT_VALUE__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues, chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues } from "page_js/data_pages/chromatogram_common/chromatogram_Common_Options";


interface Internal__PlotType_IonCurrent_VS_Ions_Component_Props {

    onChange_Callback: (newSelectionValue: chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum ) => void
}

/**
 *
 */
interface Internal__PlotType_IonCurrent_VS_Ions_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Chromatogram_Common_OptionSelector_Components__PlotType_IonCurrent_VS_Ions_Component extends React.Component< Internal__PlotType_IonCurrent_VS_Ions_Component_Props, Internal__PlotType_IonCurrent_VS_Ions_Component_State > {

    private _plotType_IonCurrent_VS_Ions_Select: chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum = chromatogram_Common_Options__plotType_IonCurrent_VS_Ions_Select_DEFAULT

    /**
     *
     */
    constructor( props: Internal__PlotType_IonCurrent_VS_Ions_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Plot Using:</span>

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._plotType_IonCurrent_VS_Ions_Select === chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT }
                        onChange={ event => { try {

                            this._plotType_IonCurrent_VS_Ions_Select = chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._plotType_IonCurrent_VS_Ions_Select)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Ion Current</span>
                </label>
                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._plotType_IonCurrent_VS_Ions_Select === chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum.IONS }
                        onChange={ event => { try {

                            this._plotType_IonCurrent_VS_Ions_Select = chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum.IONS

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._plotType_IonCurrent_VS_Ions_Select)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Ions</span>
                </label>
            </div>
        );
    }
}

////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Peak Selection


/**
 *
 */
interface Internal__PeakSelection_Component_Props {

    onChange_Callback: (newSelectionValue: chromatogram_Common_Options__ScanPeakSelect_Enum ) => void
}

/**
 *
 */
interface Internal__PeakSelection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Chromatogram_Common_OptionSelector_Components__PeakSelection_Component extends React.Component< Internal__PeakSelection_Component_Props, Internal__PeakSelection_Component_State > {

    private _scanPeakSelect: chromatogram_Common_Options__ScanPeakSelect_Enum = chromatogram_Common_Options__scanPeakSelect_DEFAULT

    /**
     *
     */
    constructor( props: Internal__PeakSelection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Peak Selection:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            A m/z is calculated for the selected ion based on the peptide sequence, any modifications, and the charge state.
                            This m/z serves as the center of a m/z window of a specified width (see below).
                            This option determines which peak in the MS1 spectrum is used to build the chromatogram.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._scanPeakSelect === chromatogram_Common_Options__ScanPeakSelect_Enum.MAX_PEAK_INTENSITY }
                        onChange={ event => { try {

                            this._scanPeakSelect = chromatogram_Common_Options__ScanPeakSelect_Enum.MAX_PEAK_INTENSITY

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._scanPeakSelect)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Max Intensity</span>
                </label>
                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._scanPeakSelect === chromatogram_Common_Options__ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE }
                        onChange={ event => { try {

                            this._scanPeakSelect = chromatogram_Common_Options__ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._scanPeakSelect)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Nearest Peak</span>
                </label>
            </div>
        );
    }
}

////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Smoothing Selection

/**
 *
 */
interface Internal__SmoothingSelection_Component_Props {

    onChange_Callback: (newSelectionValue: chromatogram_Common_Options__SmoothingOption_Enum ) => void
}

/**
 *
 */
interface Internal__SmoothingSelection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Chromatogram_Common_OptionSelector_Components__SmoothingSelection_Component extends React.Component< Internal__SmoothingSelection_Component_Props, Internal__SmoothingSelection_Component_State > {

    private _smoothingOption_Selection: chromatogram_Common_Options__SmoothingOption_Enum = chromatogram_Common_Options__smoothingOption_Selection_DEFAULT

    /**
     *
     */
    constructor( props: Internal__SmoothingSelection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Smoothing:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply a smoothing algorithm to reduce noise in the generated chromatogram while retaining overall patterns.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === chromatogram_Common_Options__SmoothingOption_Enum.NONE }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = chromatogram_Common_Options__SmoothingOption_Enum.NONE

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> None</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply no smoothing
                        </span>
                    }
                    no_Margin_Left={ true }
                />

                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === chromatogram_Common_Options__SmoothingOption_Enum.LOWESS }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = chromatogram_Common_Options__SmoothingOption_Enum.LOWESS

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> LOWESS</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply the LOWESS (locally weighted least squares) smoother. Performs better with wider peaks.
                        </span>
                    }
                    no_Margin_Left={ true }
                />

                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === chromatogram_Common_Options__SmoothingOption_Enum.SAVITZKY_GOLAY }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = chromatogram_Common_Options__SmoothingOption_Enum.SAVITZKY_GOLAY

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Savitzky-Golay</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply the Savitzky–Golay filter to smooth the data, a popular method for signal smoothing in analytical chemistry.
                        </span>
                    }
                    no_Margin_Left={ true }
                />

            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the MS1 Window Size Selection

/**
 *
 */
interface Internal__MS1_Window_Size_Selection_Component_Props {

    onChange_Callback: (newSelectionValue: number ) => void
}

/**
 *
 */
interface Internal__MS1_Window_Size_Selection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Chromatogram_Common_OptionSelector_Components__MS1_Window_Size_Selection_Component extends React.Component< Internal__MS1_Window_Size_Selection_Component_Props, Internal__MS1_Window_Size_Selection_Component_State > {

    private _precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = chromatogram_Common_Options__DEFAULT_VALUE__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues  //  Set default

    /**
     *
     */
    constructor( props: Internal__MS1_Window_Size_Selection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>MS1 Window Size:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            This is the size of the window to use when picking a peak from the MS1 scan to use to build the chromatogram.
                            The window will be centered on the m/z calculated for this ion and
                            will extend this distance both in the positive and negative direction.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                { chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.map(( selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item, index, array) => {

                    return (
                        <React.Fragment key={ selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item }>
                            <span> </span>
                            <label>
                                <input
                                    type="radio"
                                    checked={ this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection === selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item }
                                    onChange={ event => { try {

                                        this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item

                                        window.setTimeout( () => { try {

                                            this.props.onChange_Callback(this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection)

                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                                        this.setState({ forceRerenderObject: {} })

                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                />
                                <span> +/-{ selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item } ppm</span>
                            </label>

                        </React.Fragment>
                    )
                })}
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Retention Time Min/Max

