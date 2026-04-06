/**
 * protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component.tsx
 */
import { limelight_add_ReactComponent_JSX_Element_To_DocumentBody, Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import React from "react";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


///////

export interface Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback_Params {
    new_Description: string
}

export type Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback =
    (params: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback_Params) => void

export interface Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay__FunctionParams {
    structureFileId: number
    existing_Description: string
    position_top: number
    position_left: number
    change_Callback: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback
    cancel_Callback: () => void
}

export type Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay__FunctionType =
    ( params : Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay__FunctionType = function (
    params: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay__FunctionParams
) : void {

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

    const width_OtherThan_description_InputField = 150;

    let description_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_description_InputField + description_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        description_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_description_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback_Params ) => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback( params_To_change_Callback_Local );
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component
            structureFileId={ params.structureFileId }
            existing_Description={ params.existing_Description }
            position_top={ params.position_top }
            position_left={ params.position_left }
            description_InputField_Width={ description_InputField_Width }
            change_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}

///////

/**
 *
 */
interface Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Props {

    structureFileId: number
    existing_Description: string

    position_top: number
    position_left: number
    description_InputField_Width: number

    change_Callback: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_State {

    description_InProgress? : string
    description_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component extends React.Component< Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Props, Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_State > {

    private _description_Description_Input_Changed_BindThis = this._description_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _description_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _description_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Props) {
        super(props)

        this._description_Input_Ref = React.createRef<HTMLInputElement>();

        // this._description_FromServer = props.existing_Description;

        this.state = {
            description_InProgress: props.existing_Description
        }
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    private _get_Label_Description_InputFields_AndValidate() : {
        descriptionValue: string
        isValid: boolean
    } {
        this._description_InvalidValue = false; //  reset

        const description_Value = this._description_Input_Ref.current.value.trim();

        if ( this._description_InvalidValue ) {
            return {isValid: false, descriptionValue: null };  // EARLY EXIT
        }

        return { isValid: true, descriptionValue: description_Value }
    }

    /**
     *
     */
    private _description_Description_Input_Changed(event: React.ChangeEvent<HTMLInputElement>) : void {

        const  {
            descriptionValue,
            isValid
        } = this._get_Label_Description_InputFields_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            if ( this._cancelButton_Clicked ) {
                //  User clicked "Cancel" button
                return; // EARLY RETURN
            }

            const  {
                descriptionValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                description : descriptionValue,
                structureFileId: this.props.structureFileId
            };

            const url = "d/rws/for-page/structure-file-update-description";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.statusSuccess ) {

                        this.props.change_Callback({ new_Description: descriptionValue });

                        return;  // EARLY RETURN
                    }

                    throw Error("statusSuccess property Not true NOT handled")

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let saveButton_Disabled = false;

        // let saveButton_Disabled = false;
        // if (this.state.description_InvalidValue || this.state.description_InProgress === "") {
        //     saveButton_Disabled = true;
        // }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >
                            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                                {/*  2 Column Grid */}
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>
                                        Description:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <input type="text"
                                               style={ { width: this.props.description_InputField_Width } }
                                               maxLength={ 30 }
                                               ref={ this._description_Input_Ref }
                                               defaultValue={ ( this.state.description_InProgress ) ?  this.state.description_InProgress : "" }
                                               onChange={ this._description_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this.state.description_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Search Name is invalid.
                                        </span>
                                    ) : null }
                                </div>
                            </div>

                            <div style={ { marginTop: 5 }}>

                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        saveButton_Disabled ? (
                                            <span>
                                                Enter a description to enable 'Save'
                                            </span>
                                        ) : null
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span>
                                        <button type="submit"
                                                disabled={ saveButton_Disabled }
                                        >
                                            Save
                                        </button>
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                <span > </span>
                                <button
                                    onClick={ ( event) => {
                                        this._cancelButton_Clicked = true;
                                        event.preventDefault();  // Stop form.onsubmit code from running
                                        event.stopPropagation()
                                        this.props.cancel_Callback()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Cover Div while updating server */}

                            { this.state.show_SavingMessage ? (

                                <div style={
                                    {
                                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0 ,
                                        backgroundColor: "white", textAlign: "center", paddingTop: 50, fontSize: 24
                                    }
                                } >
                                    Saving Data
                                </div>
                            ) : null }

                        </form>

                    </div>

                </div>
            </div>

        )
    }
}
