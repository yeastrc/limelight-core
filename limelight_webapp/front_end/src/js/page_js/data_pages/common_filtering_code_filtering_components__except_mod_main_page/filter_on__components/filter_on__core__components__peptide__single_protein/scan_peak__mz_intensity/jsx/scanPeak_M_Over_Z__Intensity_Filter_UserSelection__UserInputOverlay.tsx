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

/////

const _Overlay_Title = "Scan Peak m/z intensity Filter"

const _Overlay_Width_Min = 750;
const _Overlay_Width_Max = 750;

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
                            <img
                                className=" fake-link-image icon-small "
                                title="Delete Entry"
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
                            <span> </span>
                            <span>
                                mass: { selectionEntry.monoisotopicMass } +/- { selectionEntry.plus_Minus_MassRange_In_PPM } %
                                of max
                                peak { selectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan }
                            </span>
                            <span> </span>
                            <img
                                className=" fake-link-image icon-small "
                                title="Change Entry"
                                src="static/images/icon-edit.png"
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
                             style={ { marginTop: 7, marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 } }
                        ></div>

                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */}

                        <div style={ { marginBottom: 10 } }>
                            <span>Mass: </span>
                            <input
                                style={ { width: 90, marginRight: 20 } }
                                type="text"
                                maxLength={ 25 }
                                autoFocus={ true }
                                title="monoisotopic mass"
                                placeholder="Mass"
                                value={ this._monoisotopicMass_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._monoisotopicMass_String_UserInput : "" }
                                onChange={ this._mass_UserInput_FieldChanged_BindThis }
                            />
                            <span>+/-: </span>
                            <input
                                style={ { width: 60, marginRight: 20 } }
                                type="text"
                                maxLength={ 25 }
                                title="+/- PPM"
                                placeholder="+/- PPM"
                                value={ this._plus_Minus_MassRange_In_PPM_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._plus_Minus_MassRange_In_PPM_String_UserInput : "" }
                                onChange={ this._plus_Minus_MassRange_In_PPM_UserInput_FieldChanged_BindThis }
                            />
                            <span>Min % of Max Peak: </span>
                            <input
                                style={ { width: 60, marginRight: 20 } }
                                type="text"
                                maxLength={ 25 }
                                title="Min % of Max Peak"
                                placeholder="Min % of Max Peak"
                                value={ this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput !== _INPUT_VALUE_NOT_SET ? this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_String_UserInput : "" }
                                onChange={ this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged_BindThis }
                            />
                            <span>Charge: </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>+1 </span>
                                <input type="checkbox" defaultChecked={ true }/>
                            </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>+2 </span>
                                <input type="checkbox" defaultChecked={ false }/>
                            </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>+3</span>
                                <input type="checkbox" defaultChecked={ false }/>
                            </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>+4 </span>
                                <input type="checkbox" defaultChecked={ false }/>
                            </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>+5 </span>
                                <input type="checkbox" defaultChecked={ false }/>
                            </span>
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <button
                                    disabled={ ! this._add_Entry_Button_Enabled }
                                    onClick={ this._add_Entry_Button_Clicked_BindThis }
                                >
                                    Add
                                </button>
                                { ! this._add_Entry_Button_Enabled ? (
                                    <div
                                        style={ { position: "absolute", inset: 0 } }
                                        title="Enter a Scan Number and select something below in searchs and scan numbers to add"
                                    >
                                    </div>
                                ) : null }
                            </div>
                        </div>
                        <div style={ { color: "red" } }>
                            Add: User selects charges to use. +1 thru +5 checkboxes. Default to +1 Checked
                        </div>
                        <div style={ { display: "flex", flexDirection: "column", gap: 10 } }>

                            <div style={ { display: "flex" } }>
                                {/*<div style={ _Checkbox_ContainingDiv_Style }>*/ }
                                {/*    <input*/ }
                                {/*        type="checkbox"*/ }
                                {/*        checked={ this._scanFiles_Selections_Root.allSearches_Selected }*/ }
                                {/*        onChange={ this._allSearches_Checkbox_Clicked_BindThis }  // onChange since react not like no onChange when managed component*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<div style={ { width: "calc(100% - 40px)", flexGrow: 0 } }>*/}
                                {/*    <span*/}
                                {/*        className=" clickable "*/}
                                {/*        style={ { overflowWrap: "break-word" } }*/}
                                {/*        onClick={ this._allSearches_Checkbox_Clicked_BindThis }*/}
                                {/*    >*/}
                                {/*        All Searches and their scan files*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                            </div>

                            <div>
                                Existing Selections:
                            </div>

                            { selectionsElements }

                        </div>
                    </div>

                </React.Fragment>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

