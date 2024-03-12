/**
 * projectPage_ProjectSection_AllUser_Interaction_ProjectNotes_Main_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Project Section - Notes in the Project
 *
 * Common - All Notes - All Users
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import {
    ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot";
import {
    ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component";
import {
    Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component
} from "page_js/data_pages/common_components__react/render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component";


/**
 *
 */
export interface ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_Props {

    projectIdentifier: string
    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot

    forceReload_Data_Object: object
}

/**
 *
 */
interface ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component extends React.Component< ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_Props, ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_State > {

    private _refresh_NoteList_Callback_BindThis = this._refresh_NoteList_Callback.bind(this)

    private _add_Clicked_BindThis = this._add_Clicked.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _outerContaining_Div_Ref :  React.RefObject<HTMLDivElement>;

    private _notesData_InProject: INTERNAL__NotesData

    /**
     *
     */
    constructor(props: ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_Props) {
        super(props)

        this._outerContaining_Div_Ref = React.createRef();

        this.state = { force_ReRender_Object: {} }
    }

    componentDidMount() {
        try {
            this._loadData()

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    componentDidUpdate( prevProps: Readonly<ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_Props>, prevState: Readonly<ProjectPage__ProjectSection_AllUsers_Interaction_ProjectNotes_Main_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.forceReload_Data_Object !== this.props.forceReload_Data_Object ) {

                this._loadData()
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    private _refresh_NoteList_Callback() : void {

        this._loadData()
    }

    private _loadData() {

        //  TODO  Show Loading message?

        this.setState({ force_ReRender_Object: {} })

        const promise = _get_Notes_In_Project({ projectIdentifier: this.props.projectIdentifier })

        promise.catch(reason => {})
        promise.then( value => { try {

            this._notesData_InProject = value

            this.setState({ force_ReRender_Object: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _add_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            //  Open Add Note

            const noteChanged_callback = ( params: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params ) => {

                this._loadData()
            }

            const outer_containerDOMElement = this._outerContaining_Div_Ref.current

            const buttonContainer_BoundingRect = outer_containerDOMElement.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left - 200;

            this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot.get_Add_Change_Note_Function()({
                noteId: undefined,
                existing_NoteText: undefined,
                projectIdentifier: this.props.projectIdentifier,
                position_top,
                position_left,
                change_Callback: noteChanged_callback,
                cancel_Callback: () => {}
            })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ( ! this._notesData_InProject ) {
            // NO data so return
            return null;  // EARLY RETURN
        }
        if ( ( ! this._notesData_InProject.canAdd ) && this._notesData_InProject.notes_Array.length === 0 ) {
            // NO Notes and cannot add notes so return
            return null;  // EARLY RETURN
        }

        return (
            <React.Fragment>

                <div className="second-level-label project-info-label">Notes:</div>

                <div className=" second-level-text project-info-text ">

                    { this._notesData_InProject.notes_Array.map( ( noteEntry, index ) => {
                        return (
                            <INTERNAL__Note_Entry_Component
                                key={ noteEntry.id }
                                note_Entry={ noteEntry }
                                notesData_InProject={ this._notesData_InProject }
                                projectIdentifier={ this.props.projectIdentifier }
                                projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot={ this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot }
                                refresh_NoteList_Callback={ this._refresh_NoteList_Callback_BindThis }
                            />
                        )
                    } ) }

                    { this._notesData_InProject.canAdd ? (

                        <div
                            ref={ this._outerContaining_Div_Ref }
                        >
                            <span>[</span>
                            <span
                                className="  fake-link "
                                style={ { fontSize: "80%", textDecoration: "none" } }
                                title="Add note to project"
                                onClick={ this._add_Clicked_BindThis }
                            >
                            +Note
                        </span>
                            <span>]</span>
                        </div>
                    ) : null }
                </div>
            </React.Fragment>
        )
    }

}


//////////////////////


/**
 *
 */
interface INTERNAL__ExistingResearcher_Entry_Component_Props {

    note_Entry: INTERNAL__Note_InProject_Entry
    projectIdentifier: string
    projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot: ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot

    notesData_InProject: INTERNAL__NotesData // Changes on View List

    refresh_NoteList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__ExistingResearcher_Entry_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class INTERNAL__Note_Entry_Component extends React.Component< INTERNAL__ExistingResearcher_Entry_Component_Props, INTERNAL__ExistingResearcher_Entry_Component_State > {

    private _edit_Clicked_BindThis = this._edit_Clicked.bind(this)
    private _remove_Clicked_BindThis = this._remove_Clicked.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _outerContaining_Div_Ref :  React.RefObject<HTMLDivElement>;

    private _show_Removing_Message = false
    private _show_Updating_Message = false

    /**
     *
     */
    constructor( props: INTERNAL__ExistingResearcher_Entry_Component_Props ) {
        super( props )

        this._outerContaining_Div_Ref = React.createRef();

        this.state = { force_ReRender_Object: {} }
    }

    componentDidUpdate( prevProps: Readonly<INTERNAL__ExistingResearcher_Entry_Component_Props>, prevState: Readonly<INTERNAL__ExistingResearcher_Entry_Component_State>, snapshot?: any ) {

        if ( this.props.notesData_InProject !== prevProps.notesData_InProject ) {

            this._show_Removing_Message = false
            this._show_Updating_Message = false

            this.setState({ force_ReRender_Object: {} })
        }
    }

    /**
     *
     */
    private _edit_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            //  Open Edit Note

            const noteChanged_callback = ( params: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params ) => {

                this._show_Updating_Message = true

                this.setState({ force_ReRender_Object: {} })

                this.props.refresh_NoteList_Callback()
            }

            const outer_containerDOMElement = this._outerContaining_Div_Ref.current

            const buttonContainer_BoundingRect = outer_containerDOMElement.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left - 200;

            this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot.get_Add_Change_Note_Function()({
                noteId: this.props.note_Entry.id,
                existing_NoteText: this.props.note_Entry.noteText,
                projectIdentifier: this.props.projectIdentifier,
                position_top,
                position_left,
                change_Callback: noteChanged_callback,
                cancel_Callback: () => {}
            })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _remove_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            if ( ! window.confirm("Remove note from project?") ) {
                return;
            }

            this._show_Removing_Message = true

            this.setState({ force_ReRender_Object: {} })

            const promise = this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot.get_Delete_Note_Function()({ noteId: this.props.note_Entry.id })
            promise.catch(reason => {})
            promise.then( response => {
                try {
                    if ( ! response.status ) {
                        const msg = "_remove_Clicked(...) ( ! response.status ). this.props.note_Entry.id }: " + this.props.note_Entry.id
                        console.warn(msg)
                        throw Error(msg)
                    }

                    this.props.refresh_NoteList_Callback()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    //////////////////////

    /**
     *
     */
    render() {

        if ( this._show_Updating_Message ) {
            return (
                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>
                    Saving Note...
                </div>
            )
        }
        if ( this._show_Removing_Message ) {
            return (
                <div style={ { gridColumnStart: 1, gridColumnEnd: -1 } }>
                    Removing Note...
                </div>
            )
        }

        return (
            <React.Fragment>

                <div
                    ref={ this._outerContaining_Div_Ref }
                    className=" note-display-div "
                >
                    <Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component
                        string_ToRender={ this.props.note_Entry.noteText }
                    />
                    { this.props.note_Entry.canEdit && this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot ? (
                        <>
                            <span> </span>
                            <img
                                src="static/images/icon-edit.png"
                                className=" icon-small clickable "
                                title="Edit note"
                                onClick={ this._edit_Clicked_BindThis }
                            />
                        </>
                    ) : null }
                    { this.props.note_Entry.canDelete && this.props.projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot ? (
                        <>
                            <span> </span>
                            <img
                                src="static/images/icon-circle-delete.png"
                                className=" icon-small clickable "
                                title="Remove note"
                                onClick={ this._remove_Clicked_BindThis }
                            />
                        </>
                    ) : null }
                </div>
            </React.Fragment>
        );
    }

}


/////////////////////

const _get_Notes_In_Project = function (
    {
        projectIdentifier
    }: {
        projectIdentifier: string
    }
): Promise<INTERNAL__NotesData> {


    let requestObj = {
        projectIdentifier
    };

    const url = "d/rws/for-page/project-notes-list";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost( { dataToSend: requestObj, url } );

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    return new Promise<INTERNAL__NotesData>( ( resolve, reject ) => {
        try {

            promise_webserviceCallStandardPost.catch( () => {
                reject( reject )
            } );

            promise_webserviceCallStandardPost.then( ( { responseData }: { responseData: any } ) => {
                try {

                    const noteList = responseData.resultList as Array<INTERNAL__Note_InProject_Entry>

                    const result: INTERNAL__NotesData = {
                        notes_Array: noteList,
                        canAdd: responseData.canAdd
                    }

                    resolve( result )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    } )
}

class INTERNAL__NotesData {
    canAdd: boolean
    notes_Array: Array<INTERNAL__Note_InProject_Entry>
}

class INTERNAL__Note_InProject_Entry {

    id: number

    noteText: string

    canEdit: boolean
    canDelete: boolean
}