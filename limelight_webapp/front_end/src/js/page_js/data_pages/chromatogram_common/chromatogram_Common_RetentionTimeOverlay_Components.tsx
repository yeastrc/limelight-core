/*
 * chromatogram_Common_RetentionTimeOverlay_Components.tsx
 *
 * The Retention-Time Min/Max user-editable component + its overlay (the OpenOverlay fn and the
 * overlay component), extracted byte-identical from the two chromatogram components.  These do
 * NOT use the seconds-vs-minutes RT-rounding fn, so they share cleanly.  See EXTRACTION_PLAN.md.
 */

import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component } from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { chromatogram_Common_Options__PADDING_TOP_ABOVE_HELP_SYMBOL, chromatogram_Common_Options__MARGIN_LEFT_AFTER_HELP_SYMBOL } from "page_js/data_pages/chromatogram_common/chromatogram_Common_Options";


class Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params {
    retentionTime_Minutes_Range_ForChart_Min: number
    retentionTime_Minutes_Range_ForChart_Max: number
}

type Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback =
    (params: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params) => void


/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserEditable_Component_Props {

    force_SetTo_ValueFromParent: object  // On object reference change, the input values will be set to the values from Parent

    retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: number
    retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: number

    retentionTime_Minutes_Range_ForChart_Min__DefaultValue: number
    retentionTime_Minutes_Range_ForChart_Max__DefaultValue: number

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
}

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserEditable_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Chromatogram_Common_RetentionTimeOverlay_Components__RetentionTime_Min_Max_UserEditable_Component extends React.Component< Internal__RetentionTime_Min_Max_UserEditable_Component_Props, Internal__RetentionTime_Min_Max_UserEditable_Component_State > {

    private _retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis = this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults.bind(this)

    private _retentionTime_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    private _retentionTimeMinutes_Range_ForChart_Min__Current__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current__Number: number

    /**
     *
     */
    constructor( props: Internal__RetentionTime_Min_Max_UserEditable_Component_Props ) {
        super( props );

        this._retentionTime_Div_Ref = React.createRef()

        this._set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(props)

        this.state = { forceRerenderObject: {} }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<Internal__RetentionTime_Min_Max_UserEditable_Component_Props>, prevState: Readonly<Internal__RetentionTime_Min_Max_UserEditable_Component_State>, snapshot?: any ) {

        if ( prevProps.force_SetTo_ValueFromParent !== this.props.force_SetTo_ValueFromParent ) {

            this._set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(this.props)

            this.setState({ forceRerenderObject: {} })
        }
    }

    /**
     *
     */
    private _set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(props: Internal__RetentionTime_Min_Max_UserEditable_Component_Props) {

        if ( this._retentionTimeMinutes_Range_ForChart_Min__Current__Number === props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
            && this._retentionTimeMinutes_Range_ForChart_Max__Current__Number=== props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent ) {

            //  Already have current values

            return // EARLY RETURN
        }

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent
    }

    /**
     *
     */
    private _set_LocalProperties_On_Create_Or_SetTo_Defaults() {

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     */
    private _retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults(
        params: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params
    ) {
        try {


            this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = params.retentionTime_Minutes_Range_ForChart_Min
            this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = params.retentionTime_Minutes_Range_ForChart_Max

            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => {
                try {
                    this.props.updatedValues_Callback({
                        retentionTime_Minutes_Range_ForChart_Min: this._retentionTimeMinutes_Range_ForChart_Min__Current__Number,
                        retentionTime_Minutes_Range_ForChart_Max: this._retentionTimeMinutes_Range_ForChart_Max__Current__Number
                    })
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, 10 )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <div style={ { paddingTop: chromatogram_Common_Options__PADDING_TOP_ABOVE_HELP_SYMBOL } }>


                    <div
                        ref={ this._retentionTime_Div_Ref }
                    >
                        <span>Retention time range (minutes):</span>

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <div>
                                    <div>
                                        A chromatogram will be built for this range of retention times.
                                    </div>
                                    <div style={ { marginTop: 5 } }>
                                        By default the range will be the retention time of the earliest PSM (minus 30 seconds) to the retention time of the latest PSM (plus 30 seconds).
                                    </div>
                                </div>
                            }
                        />

                        <span style={ { marginLeft: chromatogram_Common_Options__MARGIN_LEFT_AFTER_HELP_SYMBOL } }> Start: </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to change retention time start and end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" filter-single-value-display-block  clickable "
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                { this._retentionTimeMinutes_Range_ForChart_Min__Current__Number }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span>  End: </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to change retention time start and end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" filter-single-value-display-block  clickable "
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                { this._retentionTimeMinutes_Range_ForChart_Max__Current__Number }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Change retention time start and time end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                Change
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Reset to Retention Time Defaults based on PSM retention times
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => { try {

                                    this._set_LocalProperties_On_Create_Or_SetTo_Defaults()

                                    this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults({
                                        retentionTime_Minutes_Range_ForChart_Min: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue
                                    })
                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue
                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue

                                    this.setState({ forceRerenderObject: {} })

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                Reset
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Retention Time Min/Max OVERLAY

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues {

    retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: number
    retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: number

    retentionTime_Minutes_Range_ForChart_Min__DefaultValue: number
    retentionTime_Minutes_Range_ForChart_Max__DefaultValue: number

    position_top: number
    position_left: number

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
}

const Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay = function (
    params: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues
) {

    if ( params.position_top > window.innerHeight - 160 ) {
        params.position_top = window.innerHeight - 160;
    }
    if ( params.position_top < 10 ) {
        params.position_top = 10;
    }

    if ( params.position_left < 10 ) {
        params.position_left = 10;
    }
    if ( params.position_left > 100 ) {
        params.position_left = 100;
    }

    const window_innerWidth = window.innerWidth - 10; // Subtract 10 for vertical scroll bar

    const width_OtherThan_searchName_InputField = 150;

    let searchName_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_searchName_InputField + searchName_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        searchName_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_searchName_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params ) => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.updatedValues_Callback( params_To_change_Callback_Local )
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();
    }

    const componentToAdd = (
        <Internal__RetentionTime_Min_Max_UserInput_Overlay_Component
            paramValues={ params }
            updatedValues_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    )

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}


/////////

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props {

    paramValues: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__RetentionTime_Min_Max_UserInput_Overlay_Component extends React.Component< Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props, Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_State > {

    private readonly _NUMBER_NOT_ASSIGNED: number = undefined

    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString: string
    private _retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString: string

    private _retentionTimeMinutes_Range_ForChart_Min__Current__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current__Number: number

    private _updateButton_Enabled = true

    /**
     *
     */
    constructor( props: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props ) {
        super( props );

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent

        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent.toString()
        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent.toString()

        this.state = { forceRerenderObject: {} }
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            this.props.updatedValues_Callback({
                retentionTime_Minutes_Range_ForChart_Min: this._retentionTimeMinutes_Range_ForChart_Min__Current__Number,
                retentionTime_Minutes_Range_ForChart_Max: this._retentionTimeMinutes_Range_ForChart_Max__Current__Number
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _is_AllNumbersValid() {

        if ( this._retentionTimeMinutes_Range_ForChart_Min__Current__Number === this._NUMBER_NOT_ASSIGNED ||
            this._retentionTimeMinutes_Range_ForChart_Max__Current__Number === this._NUMBER_NOT_ASSIGNED ) {

            return false
        }

        return true
    }

    /**
     *
     */
    private _set_UpdateButton_Enabled() {

        if ( ! this._is_AllNumbersValid() ) {

            this._updateButton_Enabled = false

            this.setState({ forceRerenderObject: {} })

            return // EARLY RETURN
        }

        this._updateButton_Enabled = true

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     */
    render() {

        const _INPUT_FIELD_MAX_LENGTH = 15
        const _INPUT_FIELD_WIDTH = 60

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.paramValues.position_top, left: this.props.paramValues.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >

                            <span>Retention time range (minutes):</span>

                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                title={
                                    <div>
                                        <div>
                                            A chromatogram will be built for this range of retention times.
                                        </div>
                                    </div>
                                }
                            />

                            <span style={ { marginLeft: chromatogram_Common_Options__MARGIN_LEFT_AFTER_HELP_SYMBOL } }> Start: </span>

                            <input
                                value={ this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString }
                                maxLength={ _INPUT_FIELD_MAX_LENGTH }
                                style={ { width: _INPUT_FIELD_WIDTH } }
                                onChange={ event => {
                                    const valueString = event.target.value
                                    if ( valueString === "" || valueString === "." || valueString === "-" ) {
                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = valueString
                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this._NUMBER_NOT_ASSIGNED

                                        this._set_UpdateButton_Enabled()

                                        return // EARLY RETURN
                                    }

                                    const valueNumber = Number.parseFloat( valueString )
                                    if ( Number.isNaN( valueNumber ) ) {
                                        //  Not a number so ignore new value
                                        return; // EARLY RETURN
                                    }

                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = valueNumber

                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = valueNumber.toString()

                                    if ( valueString.endsWith( "." ) ) {

                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString += "."
                                    }

                                    this._set_UpdateButton_Enabled()

                                } }
                            />

                            <span> End: </span>

                            <input
                                value={ this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString }
                                maxLength={ _INPUT_FIELD_MAX_LENGTH }
                                style={ { width: _INPUT_FIELD_WIDTH } }
                                onChange={ event => {
                                    const valueString = event.target.value
                                    if ( valueString === "" || valueString === "." || valueString === "-" ) {
                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = valueString
                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this._NUMBER_NOT_ASSIGNED

                                        this._set_UpdateButton_Enabled()

                                        return // EARLY RETURN
                                    }

                                    const valueNumber = Number.parseFloat( valueString )
                                    if ( Number.isNaN( valueNumber ) ) {
                                        //  Not a number so ignore new value
                                        return; // EARLY RETURN
                                    }

                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = valueNumber

                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = valueNumber.toString()

                                    if ( valueString.endsWith( "." ) ) {

                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString += "."
                                    }

                                    this._set_UpdateButton_Enabled()

                                } }
                            />

                            <span> </span>

                            <div style={ { position: "relative", display: "inline-block" } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        this._updateButton_Enabled ? (
                                            <span>
                                                Update chart with retention time start and end entered
                                            </span>
                                        ) : (
                                            <span>
                                                Start and End must be populated with decimal numbers
                                            </span>
                                        )
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span>
                                        <button
                                            type="submit"
                                            disabled={ ! this._updateButton_Enabled }
                                            //  containing form has onSubmit
                                        >
                                            Update
                                        </button>
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>

                            <span> </span>

                            <button
                                onClick={ event => {
                                    try {
                                        event.preventDefault();  // Stop form.onsubmit code from running

                                        this.props.cancel_Callback()

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } }
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
