/**
 * projectPage_ShareDataSection_ProjectOwnerInteraction_PublicAccess_ReviewerAccess_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Share Data Section - Provide interaction for Project Owner
 *
 * Public Access and Reviewer Mode (Reviewer Access)
 *
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_ShareDataSection_ProjectOwnerInteraction} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/share_data_section/project_owner/projectPage_ShareDataSection_ProjectOwnerInteraction";
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


//  File Global values loaded from the DOM
let _share_data_project__public_access_code_FromDOM : string;


/**
 *
 */
export interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component_Props {

    projectIdentifier : string
    projectIsLocked : boolean

    share_data_project__public_access_enabled__ExistsInDOM : boolean
    share_data_project__public_access_code_enabled_ExistsInDOM : boolean

    set_publicAccess_Enabled_Callback: () => void
    set_publicAccess_Disabled_Callback: () => void

    set_reviewerAccess_Enabled_Callback: () => void
    set_reviewerAccess_Disabled_Callback: () => void
}

/**
 *
 */
interface ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component_State {

    publicAccessEnabled? : boolean
    reviewerAccessEnabled? : boolean
    reviewerAccessCode? : string
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component extends React.Component< ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component_Props, ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component_State > {

    private _toggle_enable_disable_PublicAccess_Enabled_ButtonClicked_BindThis = this._toggle_enable_disable_PublicAccess_Enabled_ButtonClicked.bind(this);
    private _toggle_enable_disable_PublicAccessCode_Enabled_ButtonClicked_BindThis = this._toggle_enable_disable_PublicAccessCode_Enabled_ButtonClicked.bind(this);
    private _generate_New_PublicAccessCode_Clicked_BindThis = this._generate_New_PublicAccessCode_Clicked.bind(this);

    //  This is source of truth since not updated async like state
    private _publicAccess_Enabled: boolean;
    private _reviewerAccessEnabled: boolean;

    /**
     *
     */
    constructor(props: ProjectPage_PublicAccessSection_ProjectOwnerInteraction__PublicAccess_ReviewerAccess_Component_Props) {
        super(props)

        _initialize_file_global_variables__From_Page();

        this._publicAccess_Enabled = props.share_data_project__public_access_enabled__ExistsInDOM;
        this._reviewerAccessEnabled = props.share_data_project__public_access_code_enabled_ExistsInDOM;

        this.state = {
            publicAccessEnabled: this._publicAccess_Enabled,
            reviewerAccessEnabled : this._reviewerAccessEnabled,
            reviewerAccessCode: _share_data_project__public_access_code_FromDOM,
            showUpdatingMessage: false
        }
    }

    /**
     *
     */
    private _toggle_enable_disable_PublicAccess_Enabled_ButtonClicked() {

        this.setState({showUpdatingMessage: true});
        if ( this._publicAccess_Enabled ) {
            this._publicAccess_Enabled = false;
            const promise = ProjectPage_ShareDataSection_ProjectOwnerInteraction.disablePublicAccess({ projectIdentifier: this.props.projectIdentifier });
            promise.then( () => {
                this.setState({showUpdatingMessage: false});
                this.setState({ publicAccessEnabled: false });
                this.props.set_publicAccess_Disabled_Callback();
            });
        } else {
            this._publicAccess_Enabled = true;
            const promise = ProjectPage_ShareDataSection_ProjectOwnerInteraction.enablePublicAccess({ projectIdentifier: this.props.projectIdentifier })

            //  Disable Public Access Code
            this._reviewerAccessEnabled = false;
            const promise_disable_Code = ProjectPage_ShareDataSection_ProjectOwnerInteraction.disable_PublicAccess_Code({ projectIdentifier: this.props.projectIdentifier });

            const promisesAll = Promise.all([ promise, promise_disable_Code]);

            promisesAll.then( () => {
                this.setState({showUpdatingMessage: false});
                this.setState({publicAccessEnabled: true});
                this.props.set_publicAccess_Enabled_Callback();
                //  Disable Public Access Code
                this.setState({showUpdatingMessage: false});
                this.setState({ reviewerAccessEnabled: false });
                this.props.set_reviewerAccess_Disabled_Callback();
            })
        }
    }

    /**
     *  Reviewer Mode Toggle Enable/Disable
     */
    private _toggle_enable_disable_PublicAccessCode_Enabled_ButtonClicked() {

        this.setState({showUpdatingMessage: true});
        if ( this._reviewerAccessEnabled ) {
            //  Disable Reviewer Mode (Public Access Code)
            this._reviewerAccessEnabled = false;
            const promise = ProjectPage_ShareDataSection_ProjectOwnerInteraction.disable_PublicAccess_Code({ projectIdentifier: this.props.projectIdentifier });
            promise.then( () => {
                this.setState({showUpdatingMessage: false});
                this.setState({ reviewerAccessEnabled: false });
                this.props.set_reviewerAccess_Disabled_Callback();
            });
        } else {
            //  Enable Reviewer Mode (Public Access Code)
            this._reviewerAccessEnabled = true;
            const promise = ProjectPage_ShareDataSection_ProjectOwnerInteraction.enable_PublicAccess_Code({ projectIdentifier: this.props.projectIdentifier })

            //  Disable Public Access
            this._publicAccess_Enabled = false;
            const promise_Disable_PublicAccess = ProjectPage_ShareDataSection_ProjectOwnerInteraction.disablePublicAccess({ projectIdentifier: this.props.projectIdentifier });

            const promisesAll = Promise.all([ promise, promise_Disable_PublicAccess]);

            promisesAll.then( (promiseResults) => {

                //  Enable Reviewer Mode (Public Access Code)
                const responseData = promiseResults[ 0 ];
                this.setState({showUpdatingMessage: false});
                this.setState({reviewerAccessEnabled: true});
                this.setState({reviewerAccessCode: responseData.publicAccessCode});
                this.props.set_reviewerAccess_Enabled_Callback();

                //  Disable Public Access
                this.setState({showUpdatingMessage: false});
                this.setState({ publicAccessEnabled: false });
                this.props.set_publicAccess_Disabled_Callback();
            })
        }
    }

    /**
     *
     */
    private _generate_New_PublicAccessCode_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        if ( ! window.confirm("Permanently replace Reviewer Access Code with a new value?") ) {
            //  User clicked cancel
            return; // EARLY RETURN
        }

        const promise = ProjectPage_ShareDataSection_ProjectOwnerInteraction.generate_New_PublicAccess_Code({ projectIdentifier: this.props.projectIdentifier })
        promise.then( (responseData) => {
            this.setState({showUpdatingMessage: false});
            this.setState({reviewerAccessCode: responseData.publicAccessCode});
        })
    }

    /**
     *
     */
    render() {

        return (
            <div
                className=" share-data-public-access-reviewer-access-root-block "
                style={ { position: "relative", marginTop: 30 }}
            >

                <div style={ { display: "grid", gridTemplateColumns: "min-content min-content"}}>

                    {/*  2 Column Grid  */}

                    <div //   Public Access
                    >
                        <PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component
                            projectIsLocked={ this.props.projectIsLocked }
                            label_Primary="Public Access"
                            enabled={ this.state.publicAccessEnabled }
                            mainContent={ this._get_publicAccess_MainContent() }
                            toggle_enable_disable_Callback={ this._toggle_enable_disable_PublicAccess_Enabled_ButtonClicked_BindThis }
                        />
                    </div>

                    <div //   Reviewer Mode

                        style={ { marginLeft: 30 } }
                    >
                        <PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component
                            projectIsLocked={ this.props.projectIsLocked }
                            label_Primary="Reviewer Mode"
                            enabled={ this.state.reviewerAccessEnabled }
                            mainContent={ this._get_reviewerAccess_MainContent() }
                            toggle_enable_disable_Callback={ this._toggle_enable_disable_PublicAccessCode_Enabled_ButtonClicked_BindThis }
                        />
                    </div>

                </div>
                { this.state.showUpdatingMessage ? (
                    <div style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "white" }}>

                        <div style={ { marginTop: 100, textAlign: "center", fontSize: 18 }}>
                            Updating
                        </div>
                    </div>
                ) : null }

            </div>

        )
    }

    /**
     *
     */
    private _get_publicAccess_MainContent() : JSX.Element {

        return (
            <div >
                <p>
                    When public access is enabled anyone,
                    including those without a Limelight account,
                    will be able to view this project and its data.
                </p>
                <p>
                    This is usually done after a paper is accepted for publication.
                    This will automatically disable reviewer mode.
                </p>
            </div>
        )
    }


    /**
     *
     */
    private _get_reviewerAccess_MainContent() : JSX.Element {

        let reviewer_access_code_ClassNames_Disabled = "";
        if ( ! this.state.reviewerAccessEnabled ) {
            reviewer_access_code_ClassNames_Disabled = "disabled-reviewer-access-code";
        }

        const reviewer_access_code_ClassNames =" " + reviewer_access_code_ClassNames_Disabled

        return (
            <div >
                <p>
                    Reviewer mode allows you to securely share this project
                    and its data with reviewers.
                </p>
                <p>
                    Enabling reviewer mode will allow anyone with
                    the reviewer access code below to view the project.
                </p>
                <div style={ { marginTop: 12, fontSize: 18, whiteSpace: "nowrap" } }>
                    <span
                        style={ { fontWeight: "bold" } }
                    >
                        Reviewer Access Code:
                    </span>
                    <span > </span>
                    <span
                        className={ reviewer_access_code_ClassNames }
                        title={ ( ! this.state.reviewerAccessEnabled ) ?
                            "Reviewer Mode is Disabled"
                        : null }
                    >
                        { this.state.reviewerAccessCode }
                    </span>
                </div>
                <div>
                    { ( this.props.projectIsLocked ) ? (
                        <Generate_new_Access_Code_Disabled_Component_Component
                            tooltipText="Cannot change since project is locked"
                        />
                    ) : ( ! this.state.reviewerAccessEnabled ) ? (
                        <Generate_new_Access_Code_Disabled_Component_Component
                            tooltipText="Cannot change since Reviewer Mode is Disabled"
                        />
                    ) : (
                        <span
                            className=" fake-link "
                            onClick={ this._generate_New_PublicAccessCode_Clicked_BindThis }
                        >
                            Generate new Access Code
                        </span>
                    )}
                </div>
            </div>
        )
    }
}


///////

//  Generate new Access Code "Disabled" Component

/**
 *
 */
interface Generate_new_Access_Code_Disabled_Component_Component_Props {

    tooltipText: string
}

/**
 *
 */
interface Generate_new_Access_Code_Disabled_Component_Component_State {

    _placeholder: any
}

/**
 *
 */
class Generate_new_Access_Code_Disabled_Component_Component extends React.Component< Generate_new_Access_Code_Disabled_Component_Component_Props, Generate_new_Access_Code_Disabled_Component_Component_State > {

    private _linkSpan_onClick_BindThis = this._linkSpan_onClick.bind(this);
    private _linkSpan_onMouseEnter_BindThis = this._linkSpan_onMouseEnter.bind(this);
    private _linkSpan_onMouseLeave_BindThis = this._linkSpan_onMouseLeave.bind(this);

    private _tooltip_For_LinkSpan : Tooltip_Limelight_Created_Tooltip

    private _linkSpan_Ref : React.RefObject<HTMLElement>; //  React.createRef()

    /**
     *
     */
    constructor(props: Generate_new_Access_Code_Disabled_Component_Component_Props) {
        super(props)

        this._linkSpan_Ref = React.createRef<HTMLElement>();

        // this.state = {
        // }
    }

    /**
     *
     */
    private _linkSpan_onClick( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        window.alert( this.props.tooltipText );
    }

    /**
     *
     */
    private _linkSpan_onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        const tooltipContents : JSX.Element = (
            <div>
                { this.props.tooltipText }
            </div>
        )

        this._tooltip_For_LinkSpan = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element : this._linkSpan_Ref.current , tooltipContents })
    }
    /**
     *
     */
    private _linkSpan_onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        if ( this._tooltip_For_LinkSpan ) {
            this._tooltip_For_LinkSpan.removeTooltip();
        }
        this._tooltip_For_LinkSpan = null;
    }

    /**
     *
     */
    render() {

        return (
            <span
                ref={ this._linkSpan_Ref }
                className=" disabled-generate-link "
                title={ this.props.tooltipText }
                // onMouseEnter={ this._linkSpan_onMouseEnter_BindThis }
                // onMouseLeave={ this._linkSpan_onMouseLeave_BindThis }
                onClick={ this._linkSpan_onClick_BindThis }
            >
                Generate new Access Code
            </span>
        );
    }

}

/////////////////////
/////////////////////

/**
 *
 */
interface PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component_Props {

    projectIsLocked : boolean

    label_Primary: string
    enabled: boolean
    mainContent: JSX.Element

    toggle_enable_disable_Callback: () => void
}

/**
 *
 */
interface PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component_State {

    _placeholder: any
}

/**
 *
 */
class PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component extends React.Component< PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component_Props, PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component_State > {

    /**
     *
     */
    constructor(props: PublicAccess_OR_PublicAccessCode_ReviewerMode_Maint_Component_Props) {
        super(props)

        // this.state = {
        // }
    }

    /**
     *
     */
    render() {

        return (

            <div
                style={ { width: 370, padding: 20 } }
                className=" share-data-public-access--or--reviewer-access-root-block "
            >
                {/*  Primary Label */}
                <div
                    className=" share-data--text-large "
                    style={ { fontWeight: "bold", marginBottom: 14, textAlign: "center" }}
                >
                    { this.props.label_Primary }
                </div>
                <div >
                    <span
                        className=" share-data--text-large "
                        style={ { marginRight: 5 }}
                    >
                        Status:
                    </span>
                        { ( this.props.enabled ) ? (
                            <span
                                className=" share-data-tag-common share-data--text-large share-data-pa-or-ra--enabled-label "
                            >
                                Enabled
                            </span>
                        ) : (
                            <span
                                className=" share-data-tag-common share-data--text-large share-data-pa-or-ra--disabled-label "
                            >
                                Disabled
                            </span>
                        )}

                </div>

                {/*   Height of Main Content Assumed to be 126px. Used so both boxes are same height and the buttons at the bottom align   */}

                <div style={ { height: 126 }}>
                    { this.props.mainContent }
                </div>

                <div style={ { textAlign: "center", marginTop: 16, position: "relative" }}>
                    <button
                        disabled={ this.props.projectIsLocked }
                        onClick={ ( event) => {
                            this.props.toggle_enable_disable_Callback()
                        }}
                    >
                        { ( this.props.enabled ) ? (
                            "Disable " + this.props.label_Primary
                        ) : (
                            "Enable " + this.props.label_Primary
                        )}
                    </button>
                    { this.props.projectIsLocked ? (
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Cannot change since project is locked
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            ></div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    ) : null }
                </div>
            </div>

        )
    }
}

/////////////

//  Not in a class

const _initialize_file_global_variables__From_Page = function () : void {

    const share_data_project__public_access_codeDOM = document.getElementById("share_data_project__public_access_code");
    if ( share_data_project__public_access_codeDOM ) {

        let share_data_project__public_access_code_Inside_HTML_BODY_Tags: string = null;

        {
            const innerText = share_data_project__public_access_codeDOM.innerText

            const domparser = new DOMParser()

            try {
                const doc = domparser.parseFromString(innerText, "text/html")

                const body = doc.body;

                _share_data_project__public_access_code_FromDOM = body.innerText;

            } catch (e) {
                // Not parsable Value so exit
                return null; // EARLY EXIT
            }
        }
    }
}
