/**
 * projectPage_ShareDataSection_ProjectOwnerInteraction_ProjectURL_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide interaction for Project Owner
 *
 * Current Project URL and Customize Project URL
 *
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProjectPage_ShareDataSection_ProjectOwnerInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/project_owner/projectPage_ShareDataSection_ProjectOwnerInteraction";

//  Loaded in initialize at bottom of page, called when main component mounts

let _fileVariablesInitialized = false;

let _projectLabelLengthMax: number;
let _page_controller_ShortName_Path: string;
let _page_controller_path_separator: string;
let _pageURL_BeforeControllerPath: string;
let _customURL_Base: string;


/**
 *
 */
export interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component_Props {

    projectIdentifier : string
    projectIsLocked : boolean
}

/**
 *
 */
interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component_State {

    currentProjectURL? : string
    customLabel? : string
    show_loadingDataMessage? : boolean
}

/**
 *
 */
export class ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component extends React.Component< ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component_Props, ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component_State > {

    private _customizeProjectURL_Button_Location_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: ProjectPage_PublicAccessSection_ProjectOwnerInteraction__CurrentURL_CustomizeProjectURL_Component_Props) {
        super(props)

        this._customizeProjectURL_Button_Location_Ref = React.createRef<HTMLDivElement>();

        const currentProjectURL = window.location.href;

        this.state = {
            currentProjectURL,
            customLabel: null,
            show_loadingDataMessage: true
        }
    }

    /**
     *
     */
    componentDidMount() {

        _initialize_file_global_variables(); // At bottom of file

        const promise =
            ProjectPage_ShareDataSection_ProjectOwnerInteraction.getLabel_ProjectLabel_OnServer({ projectIdentifier : this.props.projectIdentifier })
        promise.catch( (reason) => {

        })
        promise.then( result => {

            let customLabel = result.labelText;
            if ( ! customLabel ) {
                customLabel = "";
            }

            this.setState({ customLabel, show_loadingDataMessage: false })
        } )
    }

    /**
     *
     */
    private _add_Change_CustomURL_ButtonClicked() {

        let addChangeOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

        const buttonContainer_BoundingRect = this._customizeProjectURL_Button_Location_Ref.current.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        if ( position_top > window.innerHeight - 160 ) {
            position_top = window.innerHeight - 160;
        }
        if ( position_top < 10 ) {
            position_top = 10;
        }

        if ( position_left < 10 ) {
            position_left = 10;
        }
        if ( position_left > 100 ) {
            position_left = 100;
        }

        const add_Change_Callback = ( params: CustomizeProjectURL_Overlay_Component_Add_Change_Callback_Params ) => {

            addChangeOverlay.removeContents_AndContainer_FromDOM();
            this.setState({ customLabel: params.newCustomLabel });
        }
        const cancel_Callback = () => {
            addChangeOverlay.removeContents_AndContainer_FromDOM();
        }

        const componentToAdd = (
            <CustomizeProjectURL_Overlay_Component
                projectIdentifier={ this.props.projectIdentifier }
                currentCustomLabel={ this.state.customLabel }
                position_top={ position_top }
                position_left={ position_left }
                add_Change_Callback={ add_Change_Callback }
                cancel_Callback={ cancel_Callback }
            />
        )

        addChangeOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
    }

    /**
     *
     */
    private _remove_CustomURL_ButtonClicked() {

        if ( ! window.confirm( "Remove Custom Label?" ) ) {
            //  user clicked cancel
            return;  // EARLY RETURN
        }

        ProjectPage_ShareDataSection_ProjectOwnerInteraction.changeLabel_ProjectLabel_OnServer({ projectIdentifier: this.props.projectIdentifier, labelText: null })
        this.setState({ customLabel: null });
    }

    /**
     *
     */
    render() {

        return (
            (this.state.show_loadingDataMessage) ? (
                <div>
                    LOADING DATA

                </div>
            ) : (

                <div>
                    <div
                        className=" share-data--text-large "
                        style={ { marginTop: 20, marginBottom: 5 } }
                    >
                        <span style={ { fontWeight: "bold" } }>
                            Main URL:
                        </span>
                        <span> </span>
                        <span style={ { fontWeight: "bold" } }>
                            { this.state.currentProjectURL }
                        </span>
                    </div>
                    <div>
                        The main URL will never change and is one option for sharing this project.
                    </div>

                    <div
                        className=" share-data--text-large "
                        style={ { marginTop: 20, marginBottom: 5, fontWeight: "bold" } }
                    >
                        <span >
                            Custom URL:
                        </span>
                        <span> </span>
                        { this.state.customLabel ? (
                            <React.Fragment>
                                <span >
                                    <span>
                                        { _customURL_Base }
                                    </span>
                                    <span>
                                        { this.state.customLabel }
                                    </span>
                                </span>
                            </React.Fragment>
                        ) : (
                            <span>Not Set</span>
                        ) }
                    </div>
                    <div >
                        The custom URL provides a second URL that can be used to access the project.
                    </div>

                    <div style={ { marginLeft: 20 } }>

                        <div
                            className=" share-data--text-large "
                            style={ {  marginTop: 10, fontWeight: "bold" } }
                        >
                            <span>
                                Custom Label:
                            </span>
                            <span> </span>
                            <span>
                                { ( this.state.customLabel ) ? (
                                    this.state.customLabel
                                ) : (
                                    "Not Set"
                                ) }
                            </span>
                        </div>

                        <div
                            ref={ this._customizeProjectURL_Button_Location_Ref }
                            style={ { marginTop: 5 } }
                        >
                            <div style={ { display: "inline-block", position: "relative" } }>
                                <button
                                    disabled={ this.props.projectIsLocked }
                                    onClick={ () => { this._add_Change_CustomURL_ButtonClicked() } }
                                >
                                    { ( this.state.customLabel === undefined || this.state.customLabel === null || this.state.customLabel === "" ) ? (
                                        "Add Custom Label"
                                    ) : (
                                        "Change Custom Label"
                                    )}
                                </button>

                                { this.props.projectIsLocked ? (
                                    <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                         title="Cannot change since project is locked"
                                    ></div>
                                ) : null }
                            </div>

                            <span > </span>


                            { ( this.state.customLabel === undefined || this.state.customLabel === null || this.state.customLabel === "" ) ? (
                                null
                            ) : (
                                <div style={ { display: "inline-block", position: "relative" } }>
                                    <button
                                        disabled={ this.props.projectIsLocked }
                                        onClick={ () => { this._remove_CustomURL_ButtonClicked() } }
                                    >
                                        Remove Custom Label
                                    </button>

                                    { this.props.projectIsLocked ? (
                                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                             title="Cannot change since project is locked"
                                        ></div>
                                    ) : null }
                                </div>
                            )}

                        </div>
                        <div style={ { marginTop: 5 } } >
                            Note: Changing the customized label will invalidate the existing custom URL.
                        </div>
                    </div>

                </div>
            )
        )
    }
}

///////

interface CustomizeProjectURL_Overlay_Component_Add_Change_Callback_Params {
    newCustomLabel: string
}

type CustomizeProjectURL_Overlay_Component_Add_Change_Callback =
    (params: CustomizeProjectURL_Overlay_Component_Add_Change_Callback_Params) => void

/**
 *
 */
interface CustomizeProjectURL_Overlay_Component_Props {

    projectIdentifier : string
    currentCustomLabel: string

    position_top: number
    position_left: number

    add_Change_Callback: CustomizeProjectURL_Overlay_Component_Add_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface CustomizeProjectURL_Overlay_Component_State {

    customLabel_InProgress? : string
    customLabel_InvalidValue?: boolean

    duplicateLabelEncountered?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class CustomizeProjectURL_Overlay_Component extends React.Component< CustomizeProjectURL_Overlay_Component_Props, CustomizeProjectURL_Overlay_Component_State > {

    private _customLabel_Input_Changed_BndThis = this._customLabel_Input_Changed.bind(this);
    private _add_Change_Button_Clicked_BindThis = this._add_Change_Button_Clicked.bind(this);

    private _customLabel_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _customLabel_InvalidValue : boolean = false;

    /**
     *
     */
    constructor(props: CustomizeProjectURL_Overlay_Component_Props) {
        super(props)

        this._customLabel_Input_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            customLabel_InProgress: props.currentCustomLabel
        }
    }

    /**
     *
     */
    private _customLabel_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        this.setState({ duplicateLabelEncountered: false });

        const customLabel_Value = this._customLabel_Input_Ref.current.value

        if ( ! _isValidateProjectLabel({ labelText: customLabel_Value }) ) { // Returns false if not valid

            this.setState({ customLabel_InvalidValue: true });
            this._customLabel_InvalidValue = true;

            return;  // EARLY EXIT
        }

        this.setState({ customLabel_InvalidValue: false });
        this._customLabel_InvalidValue = false;

        this.setState({ customLabel_InProgress: customLabel_Value });
    }

    /**
     *
     */
    private _add_Change_Button_Clicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void {
        try {
            const customLabel_Value = this._customLabel_Input_Ref.current.value

            if ( ! _isValidateProjectLabel({ labelText: customLabel_Value }) ) { // Returns false if not valid

                this.setState({ customLabel_InvalidValue: true });
                this._customLabel_InvalidValue = true;

                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            const promise =
                ProjectPage_ShareDataSection_ProjectOwnerInteraction.changeLabel_ProjectLabel_OnServer({
                    labelText: customLabel_Value, projectIdentifier: this.props.projectIdentifier
                });

            promise.catch( (reason) => {

            });
            promise.then( (result) => {

                if ( result.duplicateLabelEncountered ) {

                    this.setState({ duplicateLabelEncountered: true, show_SavingMessage: false });

                    return;  // EARLY RETURN
                }

                this.props.add_Change_Callback({newCustomLabel: customLabel_Value});
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

        let addChangeButton_Disabled = false;
        if (this.state.customLabel_InvalidValue || this.state.customLabel_InProgress === "") {
            addChangeButton_Disabled = true;
        }

        let addChange_Button_Text = "Change Custom Label";
        if (this.props.currentCustomLabel === undefined || this.props.currentCustomLabel === null || this.props.currentCustomLabel === "") {
            addChange_Button_Text = "Add Custom Label";
        }

        const disabled_addChange_Button_Overlay_Title = "Enter a Custom Label or remove invalid characters to enable '" + addChange_Button_Text + "'";

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }} className=" modal-dialog-small-positioned-near-related-content-container ">

                    <div style={ { padding: 20, position: "relative" } }>
                        <div>
                            <span>
                                Custom Label:&nbsp;
                            </span>
                            <span>
                                <input type="text"
                                       style={ { width: 200 } }
                                       maxLength={ _projectLabelLengthMax }
                                       autoFocus={ true }
                                       ref={ this._customLabel_Input_Ref }
                                       defaultValue={ ( this.props.currentCustomLabel ) ?  this.props.currentCustomLabel : "" }
                                       onChange={ this._customLabel_Input_Changed_BndThis }
                                />
                            </span>
                            { (this.state.customLabel_InvalidValue ) ? (
                                <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                    Label value is invalid.
                                </span>
                            ) : (this.state.duplicateLabelEncountered ) ? (
                                <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                    Label value is already in use.
                                </span>
                            ) : null }
                        </div>
                        <div style={ { fontSize: 12 } }>
                            (Only lowercase letters, numbers, hyphen '-', and underscore '_'.  { _projectLabelLengthMax } characters max length)
                        </div>
                        <div style={ { marginTop: 10, marginBottom: 10 } }>
                            <span>
                                Custom URL:&nbsp;
                            </span>
                            <span>
                                { _customURL_Base }
                            </span>
                            <span>
                                { this.state.customLabel_InProgress }
                            </span>
                        </div>
                        <div>
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <button
                                    onClick={ this._add_Change_Button_Clicked_BindThis }
                                    disabled={ addChangeButton_Disabled }
                                >
                                    { addChange_Button_Text }
                                </button>
                                { ( addChangeButton_Disabled ) ? (
                                    <div
                                        style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                        title={ disabled_addChange_Button_Overlay_Title }
                                    >
                                    </div>
                                ) : null }
                            </div>
                            <span > </span>
                            <button
                                onClick={ ( event) => {
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
                    </div>
                </div>
            </div>

        )
    }
}

/////

//  NOT in any class

/**
 * @returns false if not valid
 */
const _isValidateProjectLabel = function ( { labelText }: { labelText: string } ) {

    if ( labelText.length > _projectLabelLengthMax ) {

        return false;  // EARLY EXIT
    }

    //  Allow digits, lowercase letters, '-' and '_'
    if ( !  /^[\da-z\-_]+$/.test( labelText ) ) {
        //  value is not valid
        return false;
    }
    return true;
}

/**
 *
 */
const _initialize_file_global_variables = function () {

    if ( ! _fileVariablesInitialized ) {

        //  Populate File global variables at top of file:

        {
            //  Max length for project label
            const $share_data_project_label_max_length = $("#share_data_project_label_max_length");
            if ($share_data_project_label_max_length.length === 0) {
                throw Error("No element with id: 'share_data_project_label_max_length'");
            }
            const share_data_project_label_max_lengthString = $share_data_project_label_max_length.text();
            const share_data_project_label_max_length = Number.parseInt(share_data_project_label_max_lengthString);
            if (Number.isNaN(share_data_project_label_max_length)) {
                throw Error("Element with id: 'share_data_project_label_max_length' does not contain an integer.  Contents: " + share_data_project_label_max_lengthString);
            }
            _projectLabelLengthMax = share_data_project_label_max_length;
        }
        {
            //  Get Page Controller Separator and Page Controller Short Name Path

            const $share_data_project_label_page_controller_path_separator = $("#share_data_project_label_page_controller_path_separator");
            if ( $share_data_project_label_page_controller_path_separator.length === 0 ) {
                throw Error("No element with id: 'share_data_project_label_page_controller_path_separator'");
            }
            const share_data_project_label_page_controller_path_separator = $share_data_project_label_page_controller_path_separator.text();
            if ( share_data_project_label_page_controller_path_separator === undefined ||
                share_data_project_label_page_controller_path_separator === null ||
                share_data_project_label_page_controller_path_separator === "" ) {
                throw Error("element with id: 'share_data_project_label_page_controller_path_separator' contains empty string or returned null or undefined");
            }
            _page_controller_path_separator = share_data_project_label_page_controller_path_separator;
        }
        {
            const $share_data_project_label_page_controller_path = $("#share_data_project_label_page_controller_path");
            if ( $share_data_project_label_page_controller_path.length === 0 ) {
                throw Error("No element with id: 'share_data_project_label_page_controller_path'");
            }
            const share_data_project_label_page_controller_path = $share_data_project_label_page_controller_path.text();
            if ( share_data_project_label_page_controller_path === undefined ||
                share_data_project_label_page_controller_path === null ||
                share_data_project_label_page_controller_path === "" ) {
                throw Error("element with id: 'share_data_project_label_page_controller_path' contains empty string or returned null or undefined");
            }
            _page_controller_ShortName_Path = share_data_project_label_page_controller_path;
        }
        {
            //  Get Controller Path for page

            const $controller_path = $("#controller_path");
            if ($controller_path.length === 0) {
                throw Error("No element with id: 'controller_path'");
            }
            const controller_path = $controller_path.text();

            //  Set URL Path before controller to span on page

            const pageURL = window.location.href

            const controllerStartIndex = pageURL.indexOf( controller_path );
            if ( controllerStartIndex === -1 ) {
                throw Error("Controller Path is not in Page URL.  Controller Path: " + controller_path + ", pageURL: " + pageURL );
            }
            _pageURL_BeforeControllerPath = pageURL.substring( 0, controllerStartIndex );
        }
        {
            _customURL_Base = _pageURL_BeforeControllerPath + _page_controller_ShortName_Path + _page_controller_path_separator;
        }
    }

    _fileVariablesInitialized = true;
}
