/**
 * scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay.tsx
 *
 *  Scan Number and Scan Files and/or Searches Selection
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
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

const _Overlay_Title =  "MS/MS Ion Filter"

const _Overlay_Width_Min = 900;
const _Overlay_Width_Max = 900;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 1000;


// const _INPUT_VALUE_NOT_SET = undefined

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

    private _any_ChangesMade_To_CurrentEntries = false

    private _any_CurrentEntries_Have_Errors = false

    private _existingEntries: Array<INTERNAL__UserSelection_Container_ENTRY>

    /**
     *
     */
    constructor(props: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component_Props) {
        super(props);

        this._existingEntries = []

        if ( props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {
            for ( const selectionEntry of props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

                this._existingEntries.push( {
                    selectionEntry: selectionEntry,
                    add_OrChange_InProgress_Entry: undefined
                } )
            }
        }

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _save_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            const validate_Result = _validate_UserInput_SaveValidValuesToNumericFields_Internal_ExistingSelectionContainerEntry_Array( this._existingEntries )

            if ( validate_Result.foundError ) {
                //  Cannot save since has errors

                this._any_CurrentEntries_Have_Errors = true

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            //  Create new State objects to set into State

            const selections_StateObject : Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> = []

            for ( const entry_Internal of this._existingEntries ) {

                if ( entry_Internal.add_OrChange_InProgress_Entry ) {

                    selections_StateObject.push( {
                        massOverCharge: entry_Internal.add_OrChange_InProgress_Entry.massOverCharge,
                        plus_Minus_MassRange_In_PPM: entry_Internal.add_OrChange_InProgress_Entry.plus_Minus_MassRange_In_PPM,
                        scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: entry_Internal.add_OrChange_InProgress_Entry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan
                    } )
                } else {
                    selections_StateObject.push( entry_Internal.selectionEntry )
                }
            }

            this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.set__Selections( selections_StateObject )

            this.props.callbackOn_StateObject_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const selectionsElements: Array<JSX.Element>  = []

        {
            let counter = 0
            for ( const selectionEntry of this._existingEntries ) {
                counter++

                const element = (
                    <React.Fragment
                        key={ counter }
                    >
                        {/*  Existing Entry Component Render  */}
                        <INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component
                            existingContainerEntry={ selectionEntry }
                            callback_On_FieldChange_For_ExistingEntry={ () => {

                                this._any_ChangesMade_To_CurrentEntries = true

                                const validate_Result = _validate_UserInput_SaveValidValuesToNumericFields_Internal_ExistingSelectionContainerEntry_Array( this._existingEntries )

                                if ( validate_Result.foundError ) {

                                    this._any_CurrentEntries_Have_Errors = true
                                } else {
                                    this._any_CurrentEntries_Have_Errors = false
                                }

                                this.setState({ objectForceRerender: {} })

                            } }
                            callback_On_EntryDelete_Clicked={ () => {

                                this._existingEntries = this._existingEntries.filter( value => {
                                    if ( value === selectionEntry ) {
                                        return false // remove this entry
                                    }
                                    return true
                                })

                                this._any_ChangesMade_To_CurrentEntries = true

                                const validate_Result = _validate_UserInput_SaveValidValuesToNumericFields_Internal_ExistingSelectionContainerEntry_Array( this._existingEntries )

                                if ( validate_Result.foundError ) {

                                    this._any_CurrentEntries_Have_Errors = true
                                } else {
                                    this._any_CurrentEntries_Have_Errors = false
                                }

                                this.setState({ objectForceRerender: {} })
                            } }
                        />
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
                                    disabled={ ! ( ( ! this._any_CurrentEntries_Have_Errors ) && this._any_ChangesMade_To_CurrentEntries ) }
                                    onClick={ this._save_Button_Clicked_BindThis }
                                >
                                    Save
                                </button>
                                { this._any_CurrentEntries_Have_Errors ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div className=" error-text ">
                                                To save, must fix all errors under 'Current Special Ion Filters:' or click "Cancel" existing entries with errors.
                                            </div>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <div
                                            style={ { position: "absolute", inset: 0 } }
                                        >
                                        </div>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                ) : null }
                                { ! this._any_ChangesMade_To_CurrentEntries ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div className=" error-text ">
                                                To save, must make changes to 'Current Special Ion Filters:' or Add a filter entry.
                                            </div>
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
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Close without saving
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <button
                                    onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                                >
                                    Cancel
                                </button>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
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

                        <div style={ { marginBottom: 10 } }>
                            <span style={ { fontSize: 18, fontWeight: "bold", marginBottom: 10 } }>
                                Add New Filter Entry:
                            </span>
                            <span> </span>
                            <span> (Only entries that have been added to "Current Special Ion Filters:" will be saved)</span>
                        </div>

                        {/*  ADD Entry Component Render  */ }

                        <INTERNAL__SingleFilterEntry__Add_OR_Change__Component
                            existingEntry={ undefined } // since for ADD
                            callback_On_FieldChange_For_ExistingEntry={ undefined } // Since for ADD
                            callbackOnAdd={ ( newEntry) => {

                                this._existingEntries.push( newEntry )

                                this._any_ChangesMade_To_CurrentEntries = true

                                const validate_Result = _validate_UserInput_SaveValidValuesToNumericFields_Internal_ExistingSelectionContainerEntry_Array( this._existingEntries )

                                if ( validate_Result.foundError ) {

                                    this._any_CurrentEntries_Have_Errors = true
                                } else {
                                    this._any_CurrentEntries_Have_Errors = false
                                }

                                this.setState({ objectForceRerender: {} })
                            } }
                            callbackOn_Cancel_ChangeEntry={ undefined }
                        />


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
                                    Current Special Ion Filters:
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

/////////////////////


//   Existing Filter Entry Display OR Show Component for Change Filter Entry

/**
 *
 */
interface INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component_Props {

    existingContainerEntry: INTERNAL__UserSelection_Container_ENTRY

    callback_On_FieldChange_For_ExistingEntry: () => void
    callback_On_EntryDelete_Clicked: () => void
}

/**
 *
 */
interface INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component extends React.Component< INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component_Props, INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component_State > {

    private _change_Entry_Button_Clicked_BindThis = this._change_Entry_Button_Clicked.bind(this);

    private _show_ChangeEntry_Component = false

    /**
     *
     */
    constructor(props: INTERNAL__SingleFilterEntry__ExistingFilterDisplay__OR__DisplayComponentForChangeFilter__Component_Props) {
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
    private _change_Entry_Button_Clicked( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( limelight__IsTextSelected() ) {
                //  Text selected so exit
                return // EARLY RETURN
            }

            this._show_ChangeEntry_Component = true

            this.props.existingContainerEntry.add_OrChange_InProgress_Entry = {
                massOverCharge: this.props.existingContainerEntry.selectionEntry.massOverCharge,
                plus_Minus_MassRange_In_PPM: this.props.existingContainerEntry.selectionEntry.plus_Minus_MassRange_In_PPM,
                scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: this.props.existingContainerEntry.selectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan,

                massOverCharge_UserInput_String: this.props.existingContainerEntry.selectionEntry.massOverCharge.toString(),
                plus_Minus_MassRange_In_PPM_UserInput_String: this.props.existingContainerEntry.selectionEntry.plus_Minus_MassRange_In_PPM.toString(),
                scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String: this.props.existingContainerEntry.selectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan.toString(),

                massOverCharge_UserInput_InvalidValue_ErrorMessage: undefined,
                plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage: undefined,
                scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage: undefined
            }

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ( this._show_ChangeEntry_Component ) {

            return (
                <INTERNAL__SingleFilterEntry__Add_OR_Change__Component
                    existingEntry={ this.props.existingContainerEntry.add_OrChange_InProgress_Entry }
                    callback_On_FieldChange_For_ExistingEntry={ this.props.callback_On_FieldChange_For_ExistingEntry }
                    callbackOnAdd={ undefined}
                    callbackOn_Cancel_ChangeEntry={ () => {

                        this.props.existingContainerEntry.add_OrChange_InProgress_Entry = undefined

                        this.props.callback_On_FieldChange_For_ExistingEntry()

                        this._show_ChangeEntry_Component = false

                        this.setState({ objectForceRerender: {} })
                    } }
                />
            )
        }

        return (
            <React.Fragment>

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
                                    this.props.callback_On_EntryDelete_Clicked()

                                    this.setState( { objectForceRerender: {} } )

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
                            onClick={ this._change_Entry_Button_Clicked_BindThis }
                        >
                            <span style={ { whiteSpace: "nowrap" } } >
                                m/z:
                                { " " }
                                { this.props.existingContainerEntry.selectionEntry.massOverCharge }
                                { "," }
                            </span>
                            { " " }
                            <span style={ { whiteSpace: "nowrap" } } >
                                Tolerance:
                                { " +/-" }
                                { this.props.existingContainerEntry.selectionEntry.plus_Minus_MassRange_In_PPM }
                                { " ppm," }
                            </span>
                            { " " }
                            <span style={ { whiteSpace: "nowrap" } } >
                                Relative intensity: { this.props.existingContainerEntry.selectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan }
                                { "%" }
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
            ;
    }
}


////////////////////

//   Add Filter Entry OR Change Filter Entry

/**
 *
 */
interface INTERNAL__SingleFilterEntry__Add_OR_Change__Component_Props {

    //  Exactly one of 'existingEntry' and 'callbackOnAdd' must be populated

    existingEntry: INTERNAL__UserSelection_Add_OR_Change_InProgress_ENTRY  // Display and support change

    callbackOnAdd: ( userSelection_Container_ENTRY: INTERNAL__UserSelection_Container_ENTRY ) => void    //  Call when "Add" clicked
    callbackOn_Cancel_ChangeEntry: () => void  // "Cancel" button clicked

    callback_On_FieldChange_For_ExistingEntry: () => void
}

/**
 *
 */
interface INTERNAL__SingleFilterEntry__Add_OR_Change__Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class INTERNAL__SingleFilterEntry__Add_OR_Change__Component extends React.Component<INTERNAL__SingleFilterEntry__Add_OR_Change__Component_Props, INTERNAL__SingleFilterEntry__Add_OR_Change__Component_State> {

    private _add_Entry_Button_Clicked_BindThis = this._add_Entry_Button_Clicked.bind( this );

    private _mass_UserInput_FieldChanged_BindThis = this._mass_UserInput_FieldChanged.bind( this )
    private _plus_Minus_MassRange_In_PPM_UserInput_FieldChanged_BindThis = this._plus_Minus_MassRange_In_PPM_UserInput_FieldChanged.bind( this )
    private _scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged_BindThis = this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged.bind( this )

    private _entry_InProgress: INTERNAL__UserSelection_Add_OR_Change_InProgress_ENTRY  // Display and support Add

    private _add_Entry_Button_Enabled = false

    /**
     *
     */
    constructor( props: INTERNAL__SingleFilterEntry__Add_OR_Change__Component_Props ) {
        super( props );

        if ( this.props.existingEntry ) {
            this._entry_InProgress = this.props.existingEntry
        } else {
            this._create_NewEntry_Object()
        }

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    private _create_NewEntry_Object() {

        this._entry_InProgress = {

            massOverCharge: undefined,
            plus_Minus_MassRange_In_PPM: undefined,
            scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: undefined,

            massOverCharge_UserInput_String: "",
            plus_Minus_MassRange_In_PPM_UserInput_String: "",
            scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String: "",

            massOverCharge_UserInput_InvalidValue_ErrorMessage: undefined,
            plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage: undefined,
            scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage: undefined
        }

    }

    /**
     *
     */
    private _add_Entry_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            this._enable_Disable_Add_Button__Validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry()

            if ( ! this._add_Entry_Button_Enabled ) {
                //  Button should not be enabled based on current values

                return // EARLY RETURN
            }

            const entryContainerToAdd: INTERNAL__UserSelection_Container_ENTRY = {
                selectionEntry: {
                    massOverCharge: this._entry_InProgress.massOverCharge,
                    plus_Minus_MassRange_In_PPM: this._entry_InProgress.plus_Minus_MassRange_In_PPM,
                    scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan
                },
                add_OrChange_InProgress_Entry: undefined
            }

            this.props.callbackOnAdd( entryContainerToAdd )

            //  reset
            this._create_NewEntry_Object()

            this._add_Entry_Button_Enabled = false

            this.setState({ objectForceRerender: {} })

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e;
        }
    }

    private _mass_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            this._entry_InProgress.massOverCharge_UserInput_String = newValue_InField

            this._enable_Disable_Add_Button__Validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry()

            this.setState({ objectForceRerender: {} })

            window.setTimeout( () => {
                try {
                    if ( this.props.callback_On_FieldChange_For_ExistingEntry ) {
                        this.props.callback_On_FieldChange_For_ExistingEntry()
                    }
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _plus_Minus_MassRange_In_PPM_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_String = newValue_InField

            this._enable_Disable_Add_Button__Validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry()

            this.setState({ objectForceRerender: {} })

            window.setTimeout( () => {
                try {
                    if ( this.props.callback_On_FieldChange_For_ExistingEntry ) {
                        this.props.callback_On_FieldChange_For_ExistingEntry()
                    }
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ",", "" ).trim()

            this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String = newValue_InField

            this._enable_Disable_Add_Button__Validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry()

            this.setState({ objectForceRerender: {} })

            window.setTimeout( () => {
                try {
                    if ( this.props.callback_On_FieldChange_For_ExistingEntry ) {
                        this.props.callback_On_FieldChange_For_ExistingEntry()
                    }
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _enable_Disable_Add_Button__Validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry() {

        const validateResult = _validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry( this._entry_InProgress )

        if ( validateResult.foundError ) {
            //  Has error so NOT enable button
            this._add_Entry_Button_Enabled = false;
        } else {
            this._add_Entry_Button_Enabled = true
        }
    }


    /**
     *
     */
    render() {

        return (
            <React.Fragment>

                <div>
                    <div style={ { display: "grid", gridTemplateColumns: "repeat( 5, min-content ", gap: 10, alignItems: "baseline" } }>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        The m/z of the ion.
                                    </div>
                                    { this._entry_InProgress.massOverCharge_UserInput_InvalidValue_ErrorMessage ? (
                                        <div className=" error-text ">
                                            { this._entry_InProgress.massOverCharge_UserInput_InvalidValue_ErrorMessage }
                                        </div>
                                    ) : null }
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <div>
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>m/z: </span>
                                    <input
                                        style={ { width: 90 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="m/z"
                                        value={ this._entry_InProgress.massOverCharge_UserInput_String }
                                        onChange={ this._mass_UserInput_FieldChanged_BindThis }
                                    />
                                </div>
                                { this._entry_InProgress.massOverCharge_UserInput_InvalidValue_ErrorMessage ? (
                                    <div className=" error-text ">
                                        { this._entry_InProgress.massOverCharge_UserInput_InvalidValue_ErrorMessage }
                                    </div>
                                ) : null }
                            </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        The ppm tolerance for peak finding.
                                    </div>
                                    { this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage ? (
                                        <div className=" error-text ">
                                            { this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage }
                                        </div>
                                    ) : null }
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <div>
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>+/-: </span>
                                    <input
                                        style={ { width: 60 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="+/- ppm"
                                        value={ this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_String }
                                        onChange={ this._plus_Minus_MassRange_In_PPM_UserInput_FieldChanged_BindThis }
                                    />
                                </div>
                                { this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage ? (
                                    <div className=" error-text ">
                                        { this._entry_InProgress.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage }
                                    </div>
                                ) : null }
                            </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        Only peaks with at least an intensity of this percentage of the base peak in the scan will be considered.
                                    </div>
                                    { this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage ? (
                                        <div className=" error-text ">
                                            { this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage }
                                        </div>
                                    ) : null }
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <div>
                                <div style={ { whiteSpace: "nowrap" } }>

                                    <span>Min % of Base Peak: </span>
                                    <input
                                        style={ { width: 60 } }
                                        type="text"
                                        maxLength={ 25 }
                                        placeholder="Min %"
                                        value={ this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String }
                                        onChange={ this._scanPeak_Intensity_Minimum_PercentageOf_MaxScanPeakIntensity_In_Scan_UserInput_FieldChanged_BindThis }
                                    />
                                </div>
                                { this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage ? (
                                    <div className=" error-text ">
                                        { this._entry_InProgress.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage }
                                    </div>
                                ) : null }
                            </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <div style={ { position: "relative" } }>
                            { this.props.existingEntry ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Cancel changes to entry
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation()

                                            this.props.callbackOn_Cancel_ChangeEntry()
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : (
                                <>
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
                                                    Enter valid values in all fields to Add
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
            ;
    }
}


////  Internal


class INTERNAL__UserSelection_Container_ENTRY {

    /**
     * Selection Entry that will be saved UNLESS add_OrChange_InProgress_Entry is Populated
     */
    selectionEntry:  ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY

    /**
     * Values used for Save if populated
     */
    add_OrChange_InProgress_Entry: INTERNAL__UserSelection_Add_OR_Change_InProgress_ENTRY
}



////  Internal classes

class INTERNAL__UserSelection_Add_OR_Change_InProgress_ENTRY {

    //  set to undefined if invalid value in field
    massOverCharge: number
    plus_Minus_MassRange_In_PPM: number
    scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: number

    //  User Input Field Current Values
    massOverCharge_UserInput_String: string
    plus_Minus_MassRange_In_PPM_UserInput_String: string
    scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String: string

    //  User Input Field Invalid Value Error Message
    massOverCharge_UserInput_InvalidValue_ErrorMessage: string
    plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage: string
    scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage: string
}


/**
 *
 * @param internal_SelectionEntry_Array
 * @returns { foundError: boolean }
 */
const _validate_UserInput_SaveValidValuesToNumericFields_Internal_ExistingSelectionContainerEntry_Array =

    function ( internal_SelectionEntry_Array: Array<INTERNAL__UserSelection_Container_ENTRY> ) :
        //  Returned values
        {
            foundError: boolean
        } {

    let foundError = false

    for ( const internal_SelectionContainerEntry of internal_SelectionEntry_Array ) {

        if ( internal_SelectionContainerEntry.add_OrChange_InProgress_Entry ) {

            const validateResult = _validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry( internal_SelectionContainerEntry.add_OrChange_InProgress_Entry )
            if ( validateResult.foundError ) {
                foundError = true
            }
        }
    }

    return { foundError }
}

/**
 *
 * @param internal_SelectionEntry
 * @returns { foundError: boolean }
 */
const _validate_UserInput_SaveValidValuesToNumericFields_Internal_SelectionEntry =

    function ( internal_SelectionEntry: INTERNAL__UserSelection_Add_OR_Change_InProgress_ENTRY ) :
        //  Returned values
        {
            foundError: boolean
        } {

    let foundError = false

    // massOverCharge

    // Clear existing error
    internal_SelectionEntry.massOverCharge_UserInput_InvalidValue_ErrorMessage = undefined

    if ( internal_SelectionEntry.massOverCharge_UserInput_String === "" ) {
        internal_SelectionEntry.massOverCharge_UserInput_InvalidValue_ErrorMessage = "Value Required"
        foundError = true
    } else {
        if ( ! _validate_InputString_IsNumber( internal_SelectionEntry.massOverCharge_UserInput_String ) ) {
            internal_SelectionEntry.massOverCharge_UserInput_InvalidValue_ErrorMessage = "Not valid number"
            foundError = true
        } else {
            const valueParsed = Number.parseFloat( internal_SelectionEntry.massOverCharge_UserInput_String )
            if ( Number.isNaN( valueParsed ) ) {
                internal_SelectionEntry.massOverCharge_UserInput_InvalidValue_ErrorMessage = "Not valid number"
                foundError = true
            } else if ( valueParsed < 0 ) {
                internal_SelectionEntry.massOverCharge_UserInput_InvalidValue_ErrorMessage = "Must be not negative"
                foundError = true
            } else {
                internal_SelectionEntry.massOverCharge = valueParsed
            }
        }
    }

    // plus_Minus_MassRange_In_PPM

    // Clear existing error
    internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage = undefined

    if ( internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_String === "" ) {
        internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage = "Value Required"
        foundError = true
    } else {
        if ( ! _validate_InputString_IsNumber( internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_String ) ) {
            internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage = "Not valid number"
            foundError = true
        } else {
            const valueParsed = Number.parseFloat( internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_String )
            if ( Number.isNaN( valueParsed ) ) {
                internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage = "Not valid number"
                foundError = true
            } else if ( valueParsed < 0 ) {
                internal_SelectionEntry.plus_Minus_MassRange_In_PPM_UserInput_InvalidValue_ErrorMessage = "Must be not negative"
                foundError = true
            } else {
                internal_SelectionEntry.plus_Minus_MassRange_In_PPM = valueParsed
            }
        }
    }

    // scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan

    // Clear existing error
    internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage = undefined

    if ( internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String === "" ) {
        internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage = "Value Required"
        foundError = true
    } else {
        if ( ! _validate_InputString_IsNumber( internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String ) ) {
            internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage = "Not valid number"
            foundError = true
        } else {
            const valueParsed = Number.parseFloat( internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_String )
            if ( Number.isNaN( valueParsed ) ) {
                internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage = "Not valid number"
                foundError = true
            } else if ( valueParsed < 0 || valueParsed > 100 ) {
                internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan_UserInput_InvalidValue_ErrorMessage = "Must be 0 to 100"
                foundError = true
            } else {
                internal_SelectionEntry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan = valueParsed
            }
        }
    }

    // Clear existing error

    return { foundError }
}

const _validate_InputString_IsNumber = function ( inputString: string ) : boolean {
    if ( !  /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( inputString ) ) {
        return false
    }
    return true
}