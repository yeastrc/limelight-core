/**
 * projectsListPage_Main_Component.tsx
 *
 *
 */




import React from "react";
import { showErrorMsg } from "page_js/showHideErrorMessage";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";



const _TABLE_FIRST_COLUMN_PADDING_RIGHT = 10


/**
 *
 */
export class ProjectsListPage_Main_Component_Props_Prop {

    _placeHolder?: unknown
}


/**
 *
 */
export interface ProjectsListPage_Main_Component_Props {

    propsValue : ProjectsListPage_Main_Component_Props_Prop
}

/**
 *
 */
interface ProjectsListPage_Main_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
export class ProjectsListPage_Main_Component extends React.Component< ProjectsListPage_Main_Component_Props, ProjectsListPage_Main_Component_State > {

    private _projectList: Array<any>

    /**
     *
     */
    constructor(props : ProjectsListPage_Main_Component_Props) {
        super( props );

        this.state = { force_Rerender_Object: {} }

    }

    componentDidMount() {
        try {
            this._load_Display_ProjectList()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _load_Display_ProjectList() {

        var requestObj = {};

        const url = "d/rws/for-page/project-list";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this._projectList = responseData.projectList

                for ( const projectItem of this._projectList ) {

                    projectItem.titleLowerCase = projectItem.title.toLocaleLowerCase();
                }

                //  Sort On Title Lower Case ascending then Id ascending
                this._projectList.sort(function(a, b) {
                    if (a.titleLowerCase < b.titleLowerCase) {
                        return -1;
                    }
                    if (a.titleLowerCase > b.titleLowerCase) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                });

                this.setState({ force_Rerender_Object: {} })


            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    }

    render() {
        return (
            <table style={ { borderWidth: 0, width: "100%" }}>
                <tbody>
                    <INTERNAL__Add_Project_Component
                        refresh_ProjectList_Callback={ () => { this._load_Display_ProjectList() } }
                    />
                    { this._projectList ? (
                        this._projectList.map( (projectData, index) => {

                            return (
                                <INTERNAL__SingleProject_Component
                                    key={ index }
                                    projectData={ projectData }
                                    refresh_ProjectList_Callback={ () => { this._load_Display_ProjectList() } }
                                />
                            )
                        })

                    ) : null }
                </tbody>
            </table>
        );
    }
}


/**
 *
 */
interface INTERNAL__Add_Project_Component_Props {

    refresh_ProjectList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__Add_Project_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
class INTERNAL__Add_Project_Component extends React.Component< INTERNAL__Add_Project_Component_Props, INTERNAL__Add_Project_Component_State > {

    private _showSection_AddProject = false

    /**
     *
     */
    constructor( props: INTERNAL__Add_Project_Component_Props ) {
        super( props );


        this.state = { force_Rerender_Object: {} }
    }

    private _addProject_Clicked() {


        var $new_project_title = $("#new_project_title");

        if ($new_project_title.length === 0) {

            throw Error( "Unable to find input field for id 'new_project_title' " );
        }

        var $new_project_abstract = $("#new_project_abstract");

        if ($new_project_abstract.length === 0) {

            throw Error( "Unable to find input field for id 'new_project_abstract' " );
        }



        var new_project_title = $new_project_title.val();

        var new_project_abstract = $new_project_abstract.val();


        if ( new_project_title === "" ) {

            var $element = $("#error_message_project_title_required");

            $new_project_title.focus();

            showErrorMsg( $element );

            return;  //  !!!  EARLY EXIT

//			} else if ( new_project_abstract === "" ) {

////			alert("Abstract required");

//			var $element = $("#error_message_project_abstract_required");

//			showErrorMsg( $element );

//			return;  //  !!!  EARLY EXIT
        }

        var requestObj = {
            projectTitle : new_project_title,
            projectAbstract : new_project_abstract
        };

        const url = "d/rws/for-page/project-create";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {

                if ( ! responseData.status ) {

                    alert("System Error");

                    var $element = $("#error_message_system_error");

                    showErrorMsg( $element );

                    return;
                }

                this._showSection_AddProject = false

                this.setState({ force_Rerender_Object: {} });

                this.props.refresh_ProjectList_Callback()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    }

    render() {
        return (
            <>
                <tr>
                    {/*  Width will expand to fully display the icon   */}
                    <td valign="top" style={ { paddingRight: _TABLE_FIRST_COLUMN_PADDING_RIGHT, width: 1 } }>
                        {/*   Same padding-right as <td> in single_project_template.handlebars  */}

                        { ! this._showSection_AddProject ? (
                            <img
                                src="static/images/icon-circle-plus.png"
                                className=" fake-link-image icon-large "
                                title="Add new project"
                                onClick={ event => { try {
                                    event.stopPropagation()
                                    this._showSection_AddProject = true
                                    this.setState({ force_Rerender_Object: {} })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                        ) : (
                            <img
                                src="static/images/icon-circle-delete.png"
                                className=" selector_tool_tip_attached fake-link-image icon-large "
                                title="Cancel adding new project"
                                onClick={ event => { try {
                                    event.stopPropagation()
                                    this._showSection_AddProject = false
                                    this.setState({ force_Rerender_Object: {} })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                        ) }
                    </td>
                    <td>
                        { ! this._showSection_AddProject ? (
                            <div >

                                <div className="new-project-text" >
                                    <span
                                        className="fake-link "
                                        style={ { fontSize: 20 } }
                                        title="Add new project"
                                        onClick={ event => { try {
                                            event.stopPropagation()
                                            this._showSection_AddProject = true
                                            this.setState({ force_Rerender_Object: {} })
                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                    >
                                        New Project
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div  id="new_project_expanded" style={ { position: "relative" } }>

                                <div id="error_message_project_title_required" className="error-message-container error_message_container_jq"
                                     style={ { width: 400 } }>

                                    <div className="error-message-inner-container" style={ { width: 300 } }>
                                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                                        <div className="error-message-text" >Project Title cannot be empty</div>
                                    </div>
                                </div>
                                {/*
                                <div className="error-message-container error_message_container_jq" id="error_message_project_abstract_required">

                                    <div className="error-message-inner-container" style="width: 300px;">
                                        <div className="error-message-close-x error_message_close_x_jq">X</div>
                                        <div className="error-message-text" >Project Abstract cannot be empty</div>
                                    </div>
                                </div>
                                */}
                                <div className="new-project-text" >
                                    <div style={ { marginBottom: 5 } }>
                                        <input
                                            id="new_project_title"
                                            type="text" placeholder="Title" title="Title"
                                        />
                                    </div>
                                    <div style={ { marginBottom: 5 } }>
                                        <textarea
                                            id="new_project_abstract"
                                            rows={ 10 } cols={ 100 }
                                            placeholder="Abstract"
                                            title="Abstract"></textarea>
                                    </div>
                                </div>
                                <button
                                    onClick={ event => {
                                        event.stopPropagation()
                                        this._addProject_Clicked()
                                    } }
                                >
                                    Add Project
                                </button>
                                <span> </span>
                                <button
                                    onClick={ event => { try {
                                        event.stopPropagation()
                                        this._showSection_AddProject = false
                                        this.setState({ force_Rerender_Object: {} })
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                >
                                    Cancel
                                </button>
                            </div> // {/*   End of new project expanded */}
                        ) }
                    </td>
                </tr>
                <tr>
                    <td colSpan={ 2 }>
                        <div className="new-project-container-bottom-border" ></div>
                    </td>
                </tr>
            </>
        )
    }

}

/**
 *
 */
interface INTERNAL__SingleProject_Component_Props {

    projectData: any
    refresh_ProjectList_Callback: () => void
}

/**
 *
 */
interface INTERNAL__SingleProject_Component_State {

    force_Rerender_Object?: object
}


/**
 *
 */
class INTERNAL__SingleProject_Component extends React.Component< INTERNAL__SingleProject_Component_Props, INTERNAL__SingleProject_Component_State > {


    /**
     *
     */
    constructor(props : INTERNAL__SingleProject_Component_Props) {
        super( props );


    }


    //////////////////////

    //    Mark Project For Deletion

    /**
     *
     */
    _markProjectForDeletion() {

        if ( ! confirm("Delete Project '" + this.props.projectData.title + "'?" ) ) {
            return; // EARLY EXIT
        }

        var requestObj = {
            projectId : this.props.projectData.id
        };

        const url = "d/rws/for-page/project-mark-for-deletion";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                this.props.refresh_ProjectList_Callback()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }


    render() {
        return (
            <>

                <tr className=" project_root_container_jq ">

                    <td style={ { paddingRight: _TABLE_FIRST_COLUMN_PADDING_RIGHT } }>
                        <div style={ { textAlign: "center" } }>
                            { this.props.projectData.projectLocked ? (
                                <img
                                    src="static/images/icon-locked.png"
                                    className=" fake-link-image icon-small "
                                    title="Project is locked"
                                />
                            ) : (
                                // "x" icon should only appear if they're admins for that project/have permission to delete it and the project isn't locked
                                this.props.projectData.canDelete ? (
                                    <img
                                        src="static/images/icon-circle-delete.png"
                                        className=" delete_project_link_jq selector_tool_tip_attached  fake-link-image icon-small "
                                        title="Delete Project"
                                        data-tooltip="Delete project"
                                        onClick={ event => {
                                            event.stopPropagation()
                                            this._markProjectForDeletion()
                                        } }
                                    />
                                ) : null
                            ) }
                        </div>
                    </td>
                    <td>
                        {/*{ { !-- "Tags" before the Project Title if  applicable  -- } }*/ }
                        {/*{ {!--  Project is Public -- } }*/ }
                        { this.props.projectData.projectPublic ? (
                            <>
                                <span
                                    className=" standard-border-color-very-dark  standard-background-color-very-dark "
                                    style={ { marginRight: 10, padding: 3, borderRadius: 5 } }
                                >
                                    Public
                                </span>
                                <span> </span>
                            </>
                        ) : (
                            this.props.projectData.projectPublicAccessEnabled ? (
                                // Reviewer Mode is Enabled
                                <>
                                    <span
                                        className=" standard-border-color-very-dark  standard-background-color-very-dark "
                                        style={ { marginRight: 10, padding: 3, borderRadius: 5 } }
                                    >
                                        Reviewer Mode
                                    </span>
                                    <span> </span>
                                </>
                            ) : null
                        ) }

                        {/*  Link to Project  */ }
                        <a href={ "d/pg/project/" + this.props.projectData.id }>
                            { this.props.projectData.title }
                        </a>
                    </td>
                </tr>

                <tr>
                    <td colSpan={ 2 }>
                        <div className="project-container-bottom-border"></div>
                    </td>
                </tr>
            </>
        );
    }
}