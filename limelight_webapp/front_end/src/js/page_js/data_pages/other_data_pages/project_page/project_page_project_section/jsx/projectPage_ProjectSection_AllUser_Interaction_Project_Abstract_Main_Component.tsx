/**
 * projectPage_ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Project Section - Abstract in the Project
 *
 * Common - All Users
 *
 */


import React from "react";
import {
    ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot";
import {
    Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component
} from "page_js/data_pages/common_components__react/render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component";

/**
 *
 */
export interface ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_Props {

    projectIdentifier: string
    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
}

/**
 *
 */
interface ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component extends React.Component< ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_Props, ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_State > {

    private _edit_Clicked_BindThis = this._edit_Clicked.bind( this )

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _outerContaining_Div_Ref: React.RefObject<HTMLDivElement>;

    private _userCanEditAbstract = false

    private _projectAbstract_Text_NotEncoded: string = ""

    /**
     *
     */
    constructor( props: ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_Props ) {
        super( props )

        this._outerContaining_Div_Ref = React.createRef();

        this.state = { force_ReRender_Object: {} }
    }

    componentDidMount() {

        {
            const element = document.getElementById( "project_abstract_user_can_edit")

            if ( element ) {
                //  DOM element exists so set property and remove

                this._userCanEditAbstract = true

                element.remove()
            }
        }

        //   Process Search Data Lookup Parameters JSON and Code from DOM <script> text element

        this._projectAbstract_Text_NotEncoded = _getDOMElementContents_UnEncode_HTML_To_Text( "project_abstract_contents_from_server" );
        if ( this._projectAbstract_Text_NotEncoded === undefined || this._projectAbstract_Text_NotEncoded === null ) {

            // NO project_abstract_contents_from_server so skip (No value and not project owner)

            this._projectAbstract_Text_NotEncoded = ""
        }

        this.setState({ force_ReRender_Object: {} })
    }

    shouldComponentUpdate( nextProps: Readonly<ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_Props>, nextState: Readonly<ProjectPage__ProjectSection_AllUser_Interaction_Project_Abstract_Main_Component_State>, nextContext: any ): boolean {

        if ( nextState.force_ReRender_Object !== this.state.force_ReRender_Object ) {
            return true
        }

        return false  // Never props change
    }

    /**
     *
     */
    private _edit_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            //  Open Edit Abstract

            const outer_containerDOMElement = this._outerContaining_Div_Ref.current

            const buttonContainer_BoundingRect = outer_containerDOMElement.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left - 200;

            const change_Callback = (params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params) => {

                this._projectAbstract_Text_NotEncoded = params.newProjectAbstract

                this.setState({ force_ReRender_Object: {} })
            }

            this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot.get_Edit_Abstract_Function()({
                projectIdentifier: this.props.projectIdentifier,
                existingProjectAbstract: this._projectAbstract_Text_NotEncoded,
                position_top,
                position_left,
                change_Callback,
                cancel_Callback: (): void => {}
            })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    render() {

        if ( ( ! this._userCanEditAbstract ) && ( this._projectAbstract_Text_NotEncoded === "" ) ) {
            //  NOT can edit abstract AND NO abstract string so NOT Render
            return null // EARLY RETURN
        }

        return (
            <div
                ref={ this._outerContaining_Div_Ref }
                className="project-info-single-block"
            >

                <div className="second-level-label project-info-label">Abstract:</div>

                <div id="abstract_display_container"  className="second-level-text project-info-text" >
                    <Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component
                        string_ToRender={ this._projectAbstract_Text_NotEncoded }
                    />

                    { this._userCanEditAbstract ? (
                        <>
                            <span> </span>
                            <input
                                type="image" src="static/images/icon-edit.png"
                                className=" icon-small " title="Edit project abstract"
                                onClick={ this._edit_Clicked_BindThis }
                            />
                        </>
                    ) : null }

                    {/*<c:if test="${ webSessionAuthAccessLevel.projectOwnerAllowed }" >*/}
                    {/*    <%--*/}
                    {/*    --%>*/}
                    {/*    <input id="change_project_abstract_button" type="image" src="static/images/icon-edit.png"  value="Update"*/}
                    {/*           class=" icon-small " title="Edit project abstract" >*/}
                    {/*</c:if>*/}
                </div>
            </div>

    )
    }
}


/**
 *
 * @param domElementIdString
 */
const _getDOMElementContents_UnEncode_HTML_To_Text = function ( domElementIdString : string ) : string {

    const domElementRef = document.getElementById(domElementIdString);
    if ( ! domElementRef ) {
        // Not on Page so exit
        return null; // EARLY EXIT
    }

    let domElementContents_Inside_HTML_BODY_Tags : string = null;

    {
        const innerText = domElementRef.innerText

        const domparser = new DOMParser()

        try {
            const doc = domparser.parseFromString(innerText, "text/html")

            const body = doc.body;

            domElementContents_Inside_HTML_BODY_Tags = body.innerText;

        } catch (e) {
            // Not parsable Value so exit
            return null; // EARLY EXIT
        }
    }
    try {
        domElementRef.remove();
    } catch (e) {
        // swallow any exception
    }

    return domElementContents_Inside_HTML_BODY_Tags;
}
