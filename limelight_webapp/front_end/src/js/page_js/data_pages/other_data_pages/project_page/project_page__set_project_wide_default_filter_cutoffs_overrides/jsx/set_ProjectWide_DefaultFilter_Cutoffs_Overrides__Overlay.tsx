/**
 * set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay.tsx
 *
 * User enters Search Annotation default filter cutoffs that override the values from the imported file.
 *
 *    These are applied every time a search or searches are opened from the project page.
 *    These are applied every time a search is added to a new or existing experiment.
 *
 * Currently on Project Page - Opened from "
 *
 */


import React from "react";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer,
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result,
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name,
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram,
    Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein
} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {set_ProjectWide_DefaultFilter_Cutoffs_Overrides_SaveDataToServer} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/js/set_ProjectWide_DefaultFilter_Cutoffs_Overrides_SaveDataToServer";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";


const _Overlay_Title = "Set Custom Filters for Project"

const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

/**
 *
 */
export const get_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component = function ( props: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_Props ) {

    if ( ! limelight__IsVariableAString( props.projectIdentifierFromURL ) ) {
        const msg = "props.projectIdentifierFromURL is NOT a string. get_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component ";
        console.warn( msg + ".  props.projectIdentifierFromURL: ", props.projectIdentifierFromURL );
        throw Error(msg);
    }

    return (
        <Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component
            { ...props }
        />
    )
}

////  React Components

/**
 *
 */
interface Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_Props {

    projectIdentifierFromURL: string
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_State {

    mainData?: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result;
    objectForceRerender?: object
    showLoadingMessage?: boolean;
    showSavingMessage?: boolean;
    showDataSavedMessage?: boolean;
    disable_SaveButton?: boolean
}

/**
 *
 */
class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component extends React.Component< Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_Props, Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_State > {

    private _inputField_UserEntry_DefaultFilterCutoff_Changed_BindThis = this._inputField_UserEntry_DefaultFilterCutoff_Changed.bind(this);

    private _save_Button_Clicked_BindThis = this._save_Button_Clicked.bind(this);

    /**
     *
     */
    constructor(props: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component_Props) {
        super(props);

        this.state = {
            showLoadingMessage: true,
            disable_SaveButton: true,
            mainData: null,
            objectForceRerender: {}
        };
    }

    /**
     *
     */
    componentDidMount() {

        const promise = set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer({ projectIdentifierFromURL : this.props.projectIdentifierFromURL })

        promise.catch( reason => {
            this.setState({ showLoadingMessage: false, disable_SaveButton: false });
        })

        promise.then( result => {
            this.setState({ showLoadingMessage: false, disable_SaveButton: false, mainData: result });
        })
    }

    /**
     *
     */
    private _inputField_UserEntry_DefaultFilterCutoff_Changed() {

        window.setTimeout( () => {
            let disable_SaveButton = false;

            if ( _is_ANY_InputField__Value_InvalidDecimalNumber( this.state.mainData ) ) {

                disable_SaveButton = true;
            }

            this.setState({ objectForceRerender: {}, disable_SaveButton })
        }, 50 )
    }

    /**
     *
     */
    private _save_Button_Clicked( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation();

        if ( _is_ANY_InputField__Value_InvalidDecimalNumber(this.state.mainData) ) {

            //  data contains user entered invalid number so exit.  Page state will catch up to display error and disable Save button
            return; // EARLY RETURN
        }

        this.setState({ showSavingMessage: true });

        const promise =
            set_ProjectWide_DefaultFilter_Cutoffs_Overrides_SaveDataToServer({
                projectIdentifierFromURL: this.props.projectIdentifierFromURL,
                set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result: this.state.mainData
            });

        promise.catch( (reason) => {

        });
        promise.then( (result) => {

            this.setState({ showSavingMessage: false, showDataSavedMessage: true });
        })
    }

    /**
     *
     */
    render() {
        try {
            return (
                <ModalOverlay_Limelight_Component_v001_B_FlexBox
                    widthMinimum={ _Overlay_Width_Min }
                    widthMaximum={ _Overlay_Width_Max }
                    heightMinimum={ _Overlay_Height_Min }
                    heightMaximum={ _Overlay_Height_Max }
                    title={ _Overlay_Title }
                    callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                    close_OnBackgroundClick={ false }>

                    { ( this.state.showLoadingMessage || this.state.showSavingMessage ) ? (

                        <div
                            className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                            // style={ { padding : 6 } }
                        >
                            <div
                                style={ { textAlign: "center" } }
                            >
                                { ( this.state.showLoadingMessage ) ? (
                                    <span>LOADING DATA</span>
                                ) : (
                                    <span>SAVING DATA</span>
                                ) }
                            </div>

                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                                <Spinner_Limelight_Component/>
                            </div>

                        </div>

                    ) : ( this.state.showDataSavedMessage ) ? (

                        <div
                            className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                            // style={ { padding : 6 } }
                        >
                            <div
                                style={ { textAlign: "center" } }
                            >
                                <span>Data Saved</span>
                                <span> </span>
                                <span style={ { marginLeft: 10 } }>
                                <button onClick={ this.props.callbackOn_Cancel_Close_Clicked }>
                                    Close
                                </button>
                            </span>
                            </div>

                        </div>

                    ) : (

                        <React.Fragment>

                            <div
                                className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                style={ { marginBottom: 12 } }
                                // style={ { padding : 6 } }
                            >

                                <div>
                                    All data in project will be filtered using these values.
                                </div>
                                <div>
                                    Remove all values to disable project-level filtering.
                                </div>

                            </div>

                            <div
                                className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                                style={ {
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    borderStyle: "solid",
                                    borderWidth: 1
                                } }
                            >
                                {/*  Main Body:  Scrollable Div  */ }

                                <div className="  ">

                                    <div
                                        // style={ { padding : 6 } }
                                    >
                                        { this._getMainDisplayArea() }

                                    </div>
                                </div>

                            </div>

                            <div
                                className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                // style={ { padding : 6 } }
                            >
                                <div style={ { marginTop: 15 } }>
                                    <div style={ { display: "inline-block", position: "relative", marginRight: 5 } }>
                                        <input
                                            type="button" value="Save"
                                            disabled={ this.state.disable_SaveButton }
                                            onClick={ this._save_Button_Clicked_BindThis }
                                        />
                                        { ( this.state.disable_SaveButton ) ? (
                                            <div
                                                style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                title="Save not available while invalid numbers are entered"
                                            >
                                            </div>
                                        ) : null }
                                    </div>

                                    <input type="button" value="Cancel"
                                           onClick={ this.props.callbackOn_Cancel_Close_Clicked }/>
                                </div>
                            </div>

                        </React.Fragment>
                    ) }

                </ModalOverlay_Limelight_Component_v001_B_FlexBox>
            );
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _getMainDisplayArea() : JSX.Element {

        const elements : Array<JSX.Element> = []

        for ( const data_For_SearchProgram of this.state.mainData.data_Per_SearchProgram_Array ) {

            const element = this._getMainDisplayArea_For_SearchProgram( data_For_SearchProgram );
            elements.push( element );
        }

        return (

            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content auto" } } >

                {/*  3 Column CSS Grid  */}

                { elements }

            </div>
        )
    }

    /**
     *
     */
    private _getMainDisplayArea_For_SearchProgram( data_For_SearchProgram: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_SearchProgram ) : JSX.Element {

        const psmPeptide_Indent = 10;

        //  span all columns
        const psmPeptide_Style : React.CSSProperties = { gridColumn: "1/-1", fontWeight: "bold", marginLeft: psmPeptide_Indent, marginBottom: 5 };

        return (
            <React.Fragment key={ data_For_SearchProgram.searchProgram_name }>

                <div
                    key={ data_For_SearchProgram.searchProgram_name }
                    style={ { gridColumn: "1/-1", fontWeight: "bold", marginTop: 10, marginBottom: 5 } } //  span all columns
                >
                    { data_For_SearchProgram.searchProgram_name }
                </div>

                { (data_For_SearchProgram.data_PerType_Peptide) ? (
                    <React.Fragment>
                        <div
                            key={ data_For_SearchProgram.searchProgram_name + "__Peptide_Label" }
                            style={ psmPeptide_Style }
                        >
                            Peptide filters
                        </div>
                        { this._getMainDisplayArea_For_AnnotationTypes( data_For_SearchProgram.data_PerType_Peptide, data_For_SearchProgram.searchProgram_name + "__Peptide" ) }
                    </React.Fragment>
                ) : null }

                { (data_For_SearchProgram.data_PerType_PSM) ? (
                    <React.Fragment>
                        <div
                            key={ data_For_SearchProgram.searchProgram_name + "__PSM_Label" }
                            style={ psmPeptide_Style }
                        >
                            PSM filters
                        </div>
                        { this._getMainDisplayArea_For_AnnotationTypes( data_For_SearchProgram.data_PerType_PSM, data_For_SearchProgram.searchProgram_name + "__PSM" ) }
                    </React.Fragment>
                ) : null }

                { (data_For_SearchProgram.data_PerType_Protein ) ? (
                    <React.Fragment>
                        <div
                            key={ data_For_SearchProgram.searchProgram_name + "__Protein_Label" }
                            style={ psmPeptide_Style }
                        >
                            Protein filters
                        </div>
                        { this._getMainDisplayArea_For_AnnotationTypes( data_For_SearchProgram.data_PerType_Protein, data_For_SearchProgram.searchProgram_name + "__Protein" ) }
                    </React.Fragment>
                ) : null }

                { (data_For_SearchProgram.data_PerType_ModificationPosition ) ? (
                    <React.Fragment>
                        <div
                            key={ data_For_SearchProgram.searchProgram_name + "__ModPos_Label" }
                            style={ psmPeptide_Style }
                        >
                            Modification Position Filters
                        </div>
                        { this._getMainDisplayArea_For_AnnotationTypes( data_For_SearchProgram.data_PerType_ModificationPosition, data_For_SearchProgram.searchProgram_name + "__Mod" ) }
                    </React.Fragment>
                ) : null }
            </React.Fragment>
        )
    }

    /**
     *
     */
    private _getMainDisplayArea_For_AnnotationTypes (

        data_Per_Type_PSM_Peptide_Protein: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_Type_PSM_Peptide_Protein,
        parentkey: string

    ) : JSX.Element {

        if ( ( ! data_Per_Type_PSM_Peptide_Protein ) || ( ! data_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array ) ) {
            // NO object or property
            const msg = "_getMainDisplayArea_For_AnnotationTypes(...): ( ( ! data_Per_Type_PSM_Peptide_Protein ) || ( ! data_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array ) )"
            console.warn(msg)
            throw Error(msg)
        }

        //  Currently 3 column Grid

        const elements : Array<JSX.Element> = []

        for ( const data_Per_AnnotationType_Name of data_Per_Type_PSM_Peptide_Protein.data_Per_AnnotationType_Name_Array ) {

            const element = (
                <Single_AnnotationTypeEntry_Component
                    key={ parentkey + data_Per_AnnotationType_Name.annotationType_Name }
                    data_Per_AnnotationType_Name={ data_Per_AnnotationType_Name }
                    callback_ValueChanged={ this._inputField_UserEntry_DefaultFilterCutoff_Changed_BindThis }
                />
            )

            elements.push(element);
        }

        return (
            <React.Fragment key={ parentkey }>
                { elements }
            </React.Fragment>
        )

    }

}



/**
 *
 */
interface Single_AnnotationTypeEntry_Component_Props {

    data_Per_AnnotationType_Name: Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result_Per_AnnotationType_Name,
    callback_ValueChanged: () => void
}

/**
 *
 */
interface Single_AnnotationTypeEntry_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class Single_AnnotationTypeEntry_Component extends React.Component< Single_AnnotationTypeEntry_Component_Props, Single_AnnotationTypeEntry_Component_State > {

    private _inputField_UserEntry_DefaultFilterCutoff_OnChange_BindThis = this._inputField_UserEntry_DefaultFilterCutoff_OnChange.bind(this);

    private readonly _inputField_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props: Single_AnnotationTypeEntry_Component_Props) {
        super(props);

        this._inputField_Ref = React.createRef();

        this.state = {
            objectForceRerender: {}
        };
    }

    /**
     *
     */
    private _inputField_UserEntry_DefaultFilterCutoff_OnChange( event: React.ChangeEvent<HTMLInputElement> ) {

        const inputFieldValue = this._inputField_Ref.current.value

        this.props.data_Per_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress = inputFieldValue;

        if ( ! _isFieldValueValidDecimalNumber({ inputFieldValue })) {
            this.props.data_Per_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid = true;
        } else {
            this.props.data_Per_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid = false;
        }

        this.setState({ objectForceRerender: {} })
        this.props.callback_ValueChanged();
    }

    /**
     *
     */
    render() {

        return(

            <React.Fragment>
                <div
                    style={ { marginLeft: 20, marginTop: 2, whiteSpace: "nowrap" } }
                >
                    { this.props.data_Per_AnnotationType_Name.annotationType_Name }
                </div>
                <div
                    style={ { marginLeft: 10, marginRight: 20, marginBottom: 5 } }
                >
                    <input
                        ref={ this._inputField_Ref }
                        style={ { width: 150 } }
                        defaultValue={ this.props.data_Per_AnnotationType_Name.defaultValue_ProjectWide_String_InProgress }
                        onChange={ this._inputField_UserEntry_DefaultFilterCutoff_OnChange_BindThis }
                    />
                </div>

                <div
                    style={ { marginBottom: 5, marginTop: 2 } }
                >
                    {( this.props.data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_DisplayString ) ? (
                        <React.Fragment>
                            <div>
                                <span
                                    title="Default values found on searches"
                                >
                                    Found:
                                </span>
                                <span> </span>
                                <span>{ this.props.data_Per_AnnotationType_Name.defaultValues_From_AnnotationType_Records_DisplayString }</span>
                            </div>
                        </React.Fragment>
                    ) : null }
                    { ( this.props.data_Per_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid ) ? (
                        <React.Fragment>
                            <div>
                                <span className=" error-text ">
                                    value has to be a decimal number
                                </span>
                            </div>
                        </React.Fragment>
                    ) : null }

                </div>
            </React.Fragment>
        )
    }

}

/**
 *
 * @param inputFieldValue
 *
 * @returns true if input field is a valid decimal number, false otherwise
 */
const _isFieldValueValidDecimalNumber = function ({ inputFieldValue } : {inputFieldValue: string}) {

    const inputFieldValue_Local = inputFieldValue.trim();

    if ( inputFieldValue_Local === "" ) {
        return true;
    }
    // only test for valid cutoff value if not empty string
    if ( !  /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( inputFieldValue_Local ) ) {
        //  cutoff value is not a valid decimal number
        return false;
    }

    const inputFieldValue_Local_Parsed = Number.parseFloat( inputFieldValue_Local );
    if ( Number.isNaN( inputFieldValue_Local_Parsed )) {
        return false;
    }

    return true;
};

/**
 * @returns true if any input field is not a valid decimal number
 */
const _is_ANY_InputField__Value_InvalidDecimalNumber = function ( mainData : Set_ProjectWide_DefaultFilter_Cutoffs_Overrides_GetDataFromServer_Result ) : boolean {

    for ( const data_For_SearchProgram of mainData.data_Per_SearchProgram_Array ) {
        if ( data_For_SearchProgram.data_PerType_Peptide ) {
            for ( const data_For_AnnotationType_Name of data_For_SearchProgram.data_PerType_Peptide.data_Per_AnnotationType_Name_Array ) {
                if ( data_For_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid ) {

                    //  Found Invalid

                    return true; // EARLY RETURN
                }
            }
        }
        if ( data_For_SearchProgram.data_PerType_PSM ) {
            for ( const data_For_AnnotationType_Name of data_For_SearchProgram.data_PerType_PSM.data_Per_AnnotationType_Name_Array ) {
                if ( data_For_AnnotationType_Name.defaultValue_ProjectWide_Value_Is_Invalid ) {

                    //  Found Invalid

                    return true; // EARLY RETURN
                }
            }
        }
    }

    return false;

}