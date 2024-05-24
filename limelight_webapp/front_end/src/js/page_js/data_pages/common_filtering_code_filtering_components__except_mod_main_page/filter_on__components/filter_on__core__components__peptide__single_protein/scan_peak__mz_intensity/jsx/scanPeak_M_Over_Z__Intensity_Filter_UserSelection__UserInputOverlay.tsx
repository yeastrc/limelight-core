/**
 * scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay.tsx
 *
 *  Scan Number and Scan Files and/or Searches Selection
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";

/////

const _Overlay_Title = "Scan Peak m/z intensity Filter"

const _Overlay_Width_Min = 900;
const _Overlay_Width_Max = 900;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 1000;


const _INPUT_VALUE_NOT_SET = undefined

/**
 *
 */
export const get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component = function ( props: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_Props ) {

    return (
        <ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component
            { ...props }
        />
    )
}

////  Callback definitions



////  React Components

/**
 *
 */
interface ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_Props {

    selection_Entry_To_Change: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY

    projectSearchIds : Array<number>

    dataPageStateManager : DataPageStateManager

    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject;

    callbackOn_Cancel_Close_Clicked: () => void
    callbackOn_StateObject_Changed:  () => void
}

/**
 *
 */
interface ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component extends React.Component< ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_Props, ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_State > {

    private _save_Button_Clicked_BindThis = this._save_Button_Clicked.bind(this);

    private _add_Entry_Button_Clicked_BindThis = this._add_Entry_Button_Clicked.bind(this);

    private _mass_UserInput_FieldChanged_BindThis = this._mass_UserInput_FieldChanged.bind(this)
    private _plus_Minus_MassRange_In_PPM_UserInput_FieldChanged_BindThis = this._plus_Minus_MassRange_In_PPM_UserInput_FieldChanged.bind(this)
    private _scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged_BindThis = this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged.bind(this)

    private _save_Button_Enabled = false
    private _add_Entry_Button_Enabled = false

    private _monoisotopicMass_String_UserInput: string = _INPUT_VALUE_NOT_SET
    private _plus_Minus_MassRange_In_PPM_String_UserInput: string = _INPUT_VALUE_NOT_SET
    private _scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput: string = _INPUT_VALUE_NOT_SET

    /**
     *
     */
    constructor(props: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_Props) {
        super(props);

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _save_Button_Clicked( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            // Totally change this overlay to update a local copy of the contents of the State Object
            //
            // In this method, copy the local copy into the State Object
            //
            // Can just overlay the contents of the state object in this method since user will update / add and save everything in one shot when click "save" and the code in this method runs

            this.props.callbackOn_StateObject_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     *
     */
    private _add_Entry_Button_Clicked( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            this._enable_Disable_Add_Button()

            if ( ! this._add_Entry_Button_Enabled ) {
                //  Button should not be enabled based on current values

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            const monoisotopicMass = Number.parseFloat( this._monoisotopicMass_String_UserInput )
            const plus_Minus_MassRange_In_PPM = Number.parseFloat( this._plus_Minus_MassRange_In_PPM_String_UserInput )
            let scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan = Number.parseFloat( this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput )
            if ( scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan < 0 ) {
                scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan = 0
            }
            if ( scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan > 100 ) {
                scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan = 100
            }

            // Change to add to local copy

            this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.add_Entry({ monoisotopicMass, plus_Minus_MassRange_In_PPM, scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan })

            this.props.callbackOn_StateObject_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _mass_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            if ( newValue_InField === "" ) {

                this._monoisotopicMass_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()
                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            if ( newValue_InField === "." ) {

                this._monoisotopicMass_String_UserInput = "."

                this._enable_Disable_Add_Button()
                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            const newValue_Number = Number.parseFloat( newValue_InField )

            if ( Number.isNaN( newValue_Number ) ) {

                this._monoisotopicMass_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            this._monoisotopicMass_String_UserInput = newValue_Number.toString()

            if ( newValue_InField.endsWith( "." ) ) {
                this._monoisotopicMass_String_UserInput += "."
            }

            this._enable_Disable_Add_Button()

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _plus_Minus_MassRange_In_PPM_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            if ( newValue_InField === "" ) {

                this._plus_Minus_MassRange_In_PPM_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            if ( newValue_InField === "." ) {

                this._plus_Minus_MassRange_In_PPM_String_UserInput = "."

                this._enable_Disable_Add_Button()
                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            const newValue_Number = Number.parseFloat( newValue_InField )

            if ( Number.isNaN( newValue_Number ) ) {

                this._plus_Minus_MassRange_In_PPM_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            this._plus_Minus_MassRange_In_PPM_String_UserInput = newValue_Number.toString()

            if ( newValue_InField.endsWith( "." ) ) {
                this._plus_Minus_MassRange_In_PPM_String_UserInput += "."
            }

            this._enable_Disable_Add_Button()

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            if ( newValue_InField === "" ) {

                this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            if ( newValue_InField === "." ) {

                this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput = "."

                this._enable_Disable_Add_Button()
                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            const newValue_Number = Number.parseFloat( newValue_InField )

            if ( Number.isNaN( newValue_Number ) ) {

                this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput = _INPUT_VALUE_NOT_SET

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput = newValue_Number.toString()

            if ( newValue_InField.endsWith( "." ) ) {
                this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput += "."
            }

            this._enable_Disable_Add_Button()

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _enable_Disable_Add_Button() {

        this._add_Entry_Button_Enabled = false;

        if ( this._monoisotopicMass_String_UserInput !== _INPUT_VALUE_NOT_SET
            && this._plus_Minus_MassRange_In_PPM_String_UserInput !== _INPUT_VALUE_NOT_SET
            && this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput !== _INPUT_VALUE_NOT_SET ) {

            this._add_Entry_Button_Enabled = true
        }
    }

    /**
     *
     */
    render() {

        const selectionsElements: Array<JSX.Element>  = []

        if ( this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

            let counter = 0
            for ( const selectionEntry of this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {
                counter++

                const element = (
                    <React.Fragment
                        key={ counter }
                    >
                        <div>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Delete Entry
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    className=" fake-link-image icon-small "
                                    src="static/images/icon-circle-delete.png"
                                    onClick={ event => {
                                        try {
                                            // this._open_Add_Change_Overlay( { selection_Entry_To_Change: selection_Entry } )

                                            //  This code was for when was "Delete Entry"

                                            // this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.delete_Entry( selection_Entry )
                                            //
                                            // this.setState( { forceUpdate: {} } )
                                            //
                                            // this.props.updateMadeTo_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_Callback()
                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Click to change entry
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    className=" clickable "
                                    onClick={ event => {
                                        try {
                                            event.stopPropagation()

                                            if ( limelight__IsTextSelected() ) {
                                                return
                                            }
                                            // this._open_Add_Change_Overlay( { selection_Entry_To_Change: selection_Entry } )

                                            //  This code was for when was "Delete Entry"

                                            // this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.delete_Entry( selection_Entry )
                                            //
                                            // this.setState( { forceUpdate: {} } )
                                            //
                                            // this.props.updateMadeTo_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_Callback()
                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    } }
                                >
                                    <span>
                                        mass: { selectionEntry.monoisotopicMass } +/- { selectionEntry.plus_Minus_MassRange_In_PPM } %
                                        of max
                                        peak { selectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan }
                                    </span>
                                    <span> </span>

                                    <img
                                        className=" fake-link-image icon-small "
                                        src="static/images/icon-edit.png"
                                    />
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>

                    </React.Fragment>
                )
                selectionsElements.push( element )
            }
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <React.Fragment>

                    <div
                        className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                        style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div style={ { marginBottom: 10 } }>
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <button
                                    disabled={ ! this._save_Button_Enabled }
                                    onClick={ this._save_Button_Clicked_BindThis }
                                >
                                    Save
                                </button>
                                { ! this._save_Button_Enabled ? (
                                    <div
                                        style={ { position: "absolute", inset: 0 } }
                                        title="Need changes to save"
                                    >
                                    </div>
                                ) : null }
                            </div>
                            <span> </span>
                            <button
                                title="Close without saving"
                                onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            No changes are saved until "Save" is clicked.
                        </div>

                        <div className="standard-border-color-dark"
                             style={ {
                                 marginTop: 7,
                                 marginBottom: 8,
                                 width: "100%",
                                 borderBottomStyle: "solid",
                                 borderBottomWidth: 1
                             } }
                        ></div>

                        <div style={ { fontSize: 18, fontWeight: "bold", marginBottom: 10 } }>
                            Add New Filter Entry:
                        </div>

                        <div style={ { marginBottom: 10 } }>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        monoisotopic mass
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    style={ { marginRight: 10, whiteSpace: "nowrap" } }
                                >
                                    <span>Mass: </span>
                                    <input
                                        style={ { width: 90 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="Mass"
                                        value={ this._monoisotopicMass_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._monoisotopicMass_String_UserInput : "" }
                                        onChange={ this._mass_UserInput_FieldChanged_BindThis }
                                    />
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        +/- PPM
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    style={ { marginRight: 10, whiteSpace: "nowrap" } }
                                >
                                    <span>+/-: </span>
                                    <input
                                        style={ { width: 60 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="+/- PPM"
                                        value={ this._plus_Minus_MassRange_In_PPM_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._plus_Minus_MassRange_In_PPM_String_UserInput : "" }
                                        onChange={ this._plus_Minus_MassRange_In_PPM_UserInput_FieldChanged_BindThis }
                                    />
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Min % of Max Peak
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    style={ { marginRight: 10, whiteSpace: "nowrap" } }
                                >
                                    <span>Min % of Max Peak: </span>
                                    <input
                                        style={ { width: 60 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="Min %"
                                        value={ this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput : "" }
                                        onChange={ this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged_BindThis }
                                    />
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <span
                                style={ { marginRight: 10, whiteSpace: "nowrap" } }
                            >
                                <span>Charge: </span>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <input type="checkbox" defaultChecked={ true }/>
                                    <span>+1 </span>
                                </span>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <input type="checkbox" defaultChecked={ false }/>
                                    <span>+2 </span>
                                </span>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <input type="checkbox" defaultChecked={ false }/>
                                    <span>+3</span>
                                </span>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <input type="checkbox" defaultChecked={ false }/>
                                    <span>+4 </span>
                                </span>
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <input type="checkbox" defaultChecked={ false }/>
                                    <span>+5 </span>
                                </span>
                            </span>
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <button
                                    disabled={ ! this._add_Entry_Button_Enabled }
                                    onClick={ this._add_Entry_Button_Clicked_BindThis }
                                >
                                    Add
                                </button>
                                { ! this._add_Entry_Button_Enabled ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Enter values in all fields and choose at least one charge value to Add
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <div
                                            style={ { position: "absolute", inset: 0 } }
                                        >
                                        </div>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                ) : null }
                            </div>
                        </div>

                        { selectionsElements.length > 0 ? (
                            <>
                                <div className="standard-border-color-dark"
                                     style={ {
                                         marginTop: 7,
                                         marginBottom: 8,
                                         width: "100%",
                                         borderBottomStyle: "solid",
                                         borderBottomWidth: 1
                                     } }
                                ></div>

                                <div style={ { fontSize: 18, fontWeight: "bold" } }>
                                    Current Filter Entries:
                                </div>
                            </>
                        ) : null }

                    </div>

                    { selectionsElements.length > 0 ? (
                        <div
                            className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                            style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                        >
                            {/*  Main Body:  Scrollable Div  */ }

                            <div style={ { display: "flex", flexDirection: "column", gap: 10 } }>

                                { selectionsElements }

                            </div>
                        </div>
                    ) : null }

                </React.Fragment>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

