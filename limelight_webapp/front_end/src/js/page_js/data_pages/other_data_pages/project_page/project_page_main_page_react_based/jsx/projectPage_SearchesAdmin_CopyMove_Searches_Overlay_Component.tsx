/**
 * projectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component.tsx
 *
 * Project Page - Copy/Move Searches Overlay
 *
 *   called from projectPage_SearchesAdmin_CopyMove_Searches.ts
 */


import React, {FC} from "react";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    projectPage_ListExperimentsContainingProjectSearchIds,
    ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_ListExperimentsContainingProjectSearchIds";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches,
    ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results,
    projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo,
    ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_ResultEntry,
    projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject,
    ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResultEntry
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


const _Overlay_Title_Move_Searches = "Move Searches"
const _Overlay_Title_Copy_Searches = "Copy Searches"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

/**
 *
 */
export const openOverlay_ForCopyMoveSearches = function (
    {
        doCopy,
        doMove,
        projectSearchIdsSelected,
        projectIdentifier,
        copyMoveSearchesReturnToProject_Callback
    } : {
        doCopy: boolean
        doMove: boolean
        projectSearchIdsSelected: Set<number>
        projectIdentifier : string
        copyMoveSearchesReturnToProject_Callback: () => void

    }) : void {

    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callback_Close_Overlay = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent =  (
        <ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component
            doCopy={ doCopy }
            doMove={ doMove }
            projectSearchIdsSelected={ projectSearchIdsSelected }
            projectIdentifier={ projectIdentifier }
            copyMoveSearchesReturnToProject_Callback={ copyMoveSearchesReturnToProject_Callback }
            callback_Close_Overlay={ callback_Close_Overlay }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

/**
 *
 */
interface ProjectPage_CopyMove_Searches_Overlay_Component_Props {

    doCopy: boolean
    doMove: boolean
    projectSearchIdsSelected: Set<number>
    projectIdentifier : string
    copyMoveSearchesReturnToProject_Callback: () => void
    callback_Close_Overlay: () => void
}


/**
 *
 */
interface ProjectPage_CopyMove_Searches_Overlay_Component_State {

    selectedProjectTitle?: string

    otherProjects?: Array<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_ResultEntry>
    projectSearchDataEntriesInProject?: Array<ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject_ResultEntry>
    experiments?: Array<ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry>

    show_LoadingMessage?: boolean
    show_Copying_Moving_Message?: boolean
    show_OtherProjects_List?: boolean
    show_Experiments_List?: boolean
    show_Overall_Confirm_CopyMove?: boolean

    copyMove_Result?: ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches_Results
    show_CopyMove_Result?: boolean

    show_ExperimentListChanged_Message?: boolean
    show_GeneralErrorUpdatingServer_Message?: boolean
}


/**
 *
 */
class ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_Component extends React.Component< ProjectPage_CopyMove_Searches_Overlay_Component_Props, ProjectPage_CopyMove_Searches_Overlay_Component_State > {

    private _singleOtherProject_Clicked_Callback_BindThis = this._singleOtherProject_Clicked_Callback.bind(this);

    private _DO_NOT_CALL__() {
        const singleOtherProject_Clicked_Callback : SingleOtherProject_Clicked_Callback = this._singleOtherProject_Clicked_Callback
    }

    private _projectSearchIds_To_CopyMove: Set<number>

    private _experimentIds_To_Delete: Set<number>

    private _selected_ProjectId_To_CopyOrMove_To: number

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: ProjectPage_CopyMove_Searches_Overlay_Component_Props) {
        super(props);

        this._projectSearchIds_To_CopyMove = new Set( props.projectSearchIdsSelected );

        this._experimentIds_To_Delete = null;

        this.state = {
            experiments: null,
            show_LoadingMessage: true
        };
    }

    componentDidMount() {

        this._getProjectsTo_CopyOrMove_To();
    }

    componentWillUnmount() {

        this._unmountCalled = true;
    }

    private _getProjectsTo_CopyOrMove_To() {

        this._experimentIds_To_Delete = null;

        const promise = projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo({
            projectSearchIdsSelected: this._projectSearchIds_To_CopyMove,
            projectIdentifier: this.props.projectIdentifier
        });

        promise.catch( reason => {

        });
        promise.then( result => {

            if ( this._unmountCalled ) {
                //  unmounted so exit
                return;  // EARLY RETURN
            }

            this.setState({ otherProjects: result.otherProjects, show_OtherProjects_List: true });

            this.setState({ show_LoadingMessage: false });
        });
    }


    private _singleOtherProject_Clicked_Callback( projectId: number ) {

        this.setState({ show_OtherProjects_List: false });

        this._selected_ProjectId_To_CopyOrMove_To = projectId;

        let found_selectedProjectTitle = false;

        for ( const otherProject of this.state.otherProjects ) {
            if ( otherProject.projectId === projectId ) {
                this.setState({ selectedProjectTitle: otherProject.projectTitle });
                found_selectedProjectTitle = true;
                break;
            }
        }
        if ( ! found_selectedProjectTitle ) {
            const msg = "Failed to find selected project id in this.state.otherProjects.  selected project id: " + projectId;
            console.warn( msg );
            throw Error( msg );
        }

        this.setState({ show_LoadingMessage: true });

        const promise = projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetProjectSearchIdsWhereAssocSearchIdsAlreadyInProject({ projectId, projectSearchIds: this._projectSearchIds_To_CopyMove });

        promise.catch( reason => {

        });
        promise.then( result => {

            if ( this._unmountCalled ) {
                //  unmounted so exit
                return;  // EARLY RETURN
            }

            if ( result.projectSearchDataEntriesInProject && result.projectSearchDataEntriesInProject.length > 0 ) {

                //  Remove Project Search Ids that are already in the destination Project

                for ( const projectSearchDataEntry of result.projectSearchDataEntriesInProject ) {

                    this._projectSearchIds_To_CopyMove.delete( projectSearchDataEntry.projectSearchId );
                }

                if ( this._projectSearchIds_To_CopyMove.size === 0 ) {

                    window.alert("All searches are already in destination project.");
                    const msg = "_singleOtherProject_Clicked_Callback(...): ( this._projectSearchIds_To_CopyMove.size === 0 ) after all this._projectSearchIds_To_CopyMove.delete( projectSearchDataEntry.projectSearchId )";
                    console.warn( msg );
                    throw Error( msg );

                } else {

                    this.setState({show_Overall_Confirm_CopyMove: true, projectSearchDataEntriesInProject: result.projectSearchDataEntriesInProject, show_LoadingMessage: false});
                }

            } else {

                if ( this.props.doMove ) {

                    this._getExperimentsList();

                } else {

                    this.setState({show_Overall_Confirm_CopyMove: true, show_LoadingMessage: false});
                }
            }
        });

    }

    private _yesClicked_AcceptSearchesAlreadyInDestination() {

        if ( this.props.doMove ) {

            this._getExperimentsList();

        } else {

            this._executeCopyOrMove();
        }
    }

    private _getExperimentsList() {

        const promise = projectPage_ListExperimentsContainingProjectSearchIds({
            projectIdentifier: this.props.projectIdentifier, projectSearchIds: this._projectSearchIds_To_CopyMove });

        this.setState({ show_LoadingMessage: true });

        promise.catch( (reason) => {

        });
        promise.then( (result) => {

            if ( this._unmountCalled ) {
                //  unmounted so exit
                return;  // EARLY RETURN
            }

            if ( result.experiments.length > 0 ) {

                this._experimentIds_To_Delete = new Set();

                for ( const experiment of result.experiments ) {
                    this._experimentIds_To_Delete.add( experiment.experimentId );
                }

                this.setState({show_Overall_Confirm_CopyMove: true, projectSearchDataEntriesInProject: null, show_LoadingMessage: false});

                this.setState({ show_Experiments_List: true, experiments: result.experiments });
            } else {

                this._executeCopyOrMove();
            }
        })
    }


    private _yesClicked_AcceptExperimentsWillBeDeleted() {

        this._executeCopyOrMove();
    }

    private _yesClicked_Only_MoveOrCopySearches() {

        this._executeCopyOrMove();
    }

    private _executeCopyOrMove() {

        this.setState({show_LoadingMessage: false, show_Overall_Confirm_CopyMove: false, show_Copying_Moving_Message: true });

        const promise = projectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__ExecuteCopyOrMoveSearches({
            projectIdentifier : this.props.projectIdentifier,
            projectSearchIdsSelected: this._projectSearchIds_To_CopyMove,
            experimentIds_To_Delete: this._experimentIds_To_Delete,
            chosenProjectId: this._selected_ProjectId_To_CopyOrMove_To,
            doCopy: this.props.doCopy,
            doMove: this.props.doMove
        });

        promise.catch( reason => {

        });

        promise.then( result => {

            this.setState({ show_Copying_Moving_Message: false, show_CopyMove_Result: true, copyMove_Result: result });
        });
    }

    /**
     *
     */
    render() {

        let _Overlay_Title: string = null;

        if ( this.props.doMove  ) {
            _Overlay_Title = _Overlay_Title_Move_Searches;
        } else if ( this.props.doCopy  ) {
            _Overlay_Title = _Overlay_Title_Copy_Searches;
        } else {
            const msg="Invalid props. neither of doMove or doCopy is true";
            console.warn(msg);
            throw Error(msg);
        }


        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callback_Close_Overlay }
                close_OnBackgroundClick={ false }>


                { ( this.state.show_GeneralErrorUpdatingServer_Message ) ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        An error has occurred updating the server.  Please reload the page and try again.
                    </div>

                ) : ( this.state.show_LoadingMessage || this.state.show_Copying_Moving_Message ) ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div
                            style={ { textAlign: "center" } }
                        >
                            { ( this.state.show_LoadingMessage ) ? (
                                <span>LOADING DATA</span>
                            ) : ( this.props.doCopy ) ? (
                                <span>Copying Searches</span>
                            ) : (
                                <span>Moving Searches</span>
                            ) }
                        </div>

                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                            <Spinner_Limelight_Component/>
                        </div>

                    </div>

                ) : ( this.state.show_OtherProjects_List && this.state.otherProjects ) ? (  //  Display Project Selection List

                    ( this.state.otherProjects.length === 0 ) ? (

                        //  NO Projects Found

                        <React.Fragment>
                            <div >
                                <span>
                                    No other projects to
                                </span>
                                {( this.props.doCopy ) ? (
                                    <span>
                                            copy
                                        </span>
                                ) : (
                                    <span>
                                            move
                                        </span>
                                )}
                                <span>
                                    to for selected searches.
                                    All searches are in all other projects.
                                </span>
                            </div>
                        </React.Fragment>

                    ) : (

                        //  YES Projects Found

                        <React.Fragment>

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                            >
                                <div >
                                    <span>
                                        Click the title of the project to which you would like to
                                    </span>
                                    <span> </span>
                                    {( this.props.doCopy ) ? (
                                        <span>
                                            copy
                                        </span>
                                    ) : (
                                        <span>
                                            move
                                        </span>
                                    )}
                                    <span> </span>
                                    <span>
                                        the selected searches to.
                                    </span>
                                </div>

                                <div className="top-level-label-bottom-border"></div>

                            </div>


                            <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                                 style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                                // style={ { padding : 6 } }
                            >
                                { this.state.otherProjects.map( (value, index, array) => {
                                  return (
                                      <SingleOtherProject key={ value.projectId }
                                          project={ value }
                                          singleOtherProject_Clicked_Callback={ this._singleOtherProject_Clicked_Callback_BindThis }
                                      />
                                  )

                                })}

                            </div>


                        </React.Fragment>
                    )
                ) : ( this.state.show_Overall_Confirm_CopyMove ) ? (

                    <React.Fragment>
                        <React.Fragment>
                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 style={ { marginBottom: 10 } }
                            >
                                <span> </span>
                                {( this.props.doCopy ) ? (
                                    <span>
                                        Copy
                                    </span>
                                ) : (
                                    <span>
                                        Move
                                    </span>
                                )}
                                <span> </span>
                                <span>
                                    selected searches to &quot;{ this.state.selectedProjectTitle }&quot;?
                                </span>
                            </div>
                        </React.Fragment>
                        {( this.state.projectSearchDataEntriesInProject && this.state.projectSearchDataEntriesInProject.length > 0 ) ? (

                            <React.Fragment>

                                <div className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this._yesClicked_AcceptSearchesAlreadyInDestination();
                                        }}
                                    >
                                        Yes
                                    </button>
                                </div>

                                <div className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                     style={ { marginTop: 10, marginBottom: 10 } }
                                >
                                    <span>
                                        The following searches are already in the destination project and will not be
                                    </span>
                                    <span> </span>
                                    {( this.props.doCopy ) ? (
                                        <span>
                                            copied
                                        </span>
                                            ) : (
                                                <span>
                                            moved
                                        </span>
                                    )}
                                    <span>:</span>
                                </div>
                                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                                    // style={ { padding : 6 } }
                                >
                                    <div style={ { marginLeft: 10 } }>

                                        { this.state.projectSearchDataEntriesInProject.map( (value, index, array) => {
                                            return (
                                                <div key={ value.projectSearchId }>
                                                    <div>
                                                        {value.searchName} ({value.searchId})
                                                    </div>
                                                    <div className="top-level-label-bottom-border"></div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>

                            </React.Fragment>

                        ) :  ( this.state.show_Experiments_List && this.state.experiments && this.state.experiments.length > 0 ) ? (

                            <React.Fragment>
                                <div className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                     style={ { marginBottom: 10 } }
                                >
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this._yesClicked_AcceptExperimentsWillBeDeleted();
                                        }}
                                    >
                                        Yes
                                    </button>
                                </div>

                                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                                    // style={ { padding : 6 } }
                                >
                                    <div style={ { fontWeight: "bold" } }>
                                        Experiments that contain the search and will be deleted when the search is deleted:
                                    </div>
                                    <div >
                                        <ul>
                                            {
                                                this.state.experiments.map( (experiment, index) => {

                                                    return (
                                                        <li key={ experiment.experimentId }>
                                                            { experiment.experimentName }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>

                                </div>
                            </React.Fragment>

                        ) : (
                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                            >
                                <button
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this._yesClicked_Only_MoveOrCopySearches();
                                    }}
                                >
                                    Yes
                                </button>
                            </div>

                        ) }

                    </React.Fragment>

                ) : ( this.state.show_CopyMove_Result ) ? (

                    <React.Fragment>

                        <div className=" top-level fixed-height  modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 style={ { marginTop : 20, marginBottom: 20 } }
                            >

                            { ( this.state.copyMove_Result.status ) ? (

                                <React.Fragment>
                                    <div style={ { marginBottom: 10 } }>

                                        <span>
                                            Searches
                                        </span>
                                        <span> </span>
                                        {( this.props.doCopy ) ? (
                                            <span>
                                        copied
                                        </span>
                                        ) : (
                                            <span>
                                        moved
                                        </span>
                                        )}
                                        <span> </span>
                                        <span>
                                            successfully to &quot;{ this.state.selectedProjectTitle }&quot;?
                                        </span>

                                    </div>
                                    <div >
                                        <button
                                            onClick={ event =>
                                            {
                                                try {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    document.location.href = "d/pg/project/" + this._selected_ProjectId_To_CopyOrMove_To;  // Maybe not hard code this path
                                                } catch (e) {
                                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                                    throw e;
                                                }
                                            }
                                            }
                                        >
                                            <span>
                                                Go to project the searches were
                                            </span>
                                            {( this.props.doCopy ) ? (
                                            <span>
                                                copied
                                            </span>
                                            ) : (
                                            <span>
                                                moved
                                            </span>
                                            )}
                                            <span> </span>
                                            <span>
                                                to
                                            </span>
                                        </button>

                                        <span> </span>

                                        <button
                                            onClick={ event =>
                                            {
                                                try {
                                                    event.preventDefault();
                                                    event.stopPropagation();

                                                    //  Show loading message and reload the page

                                                    this.setState({ show_LoadingMessage: true });
                                                    window.setTimeout( () => {
                                                        try {
                                                            window.location.reload(true);

                                                        } catch (e) {
                                                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                                            throw e;
                                                        }
                                                    });
                                                } catch (e) {
                                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                                    throw e;
                                                }
                                            }
                                            }
                                        >
                                            Return to Project
                                        </button>
                                    </div>
                                </React.Fragment>

                            ) : ( this.state.copyMove_Result.copyToProjectMarkedForDeletion ) ? (

                                    <div  style={ { marginBottom: 10 } }>
                                        <div >
                                            Copy Searches Failed.
                                            {/*  Project copying to is marked for deletion.  */}
                                            Project copying to has been deleted.
                                        </div>
                                        <div >
                                            Please reload the page to get a current list of valid projects to copy to.
                                        </div>
                                    </div>
                            ) : ( this.state.copyMove_Result.copyToProjectDisabled ) ? (
                                    <div  style={ { marginBottom: 10 } }>
                                        <div >
                                            Copy Searches Failed.  Project copying to is disabled.
                                        </div>
                                        <div >
                                            Please reload the page to get a current list of valid projects to copy to.
                                        </div>
                                    </div>

                            ) : null }
                            {/*
                            { ( this.state.show_ExperimentListChanged_Message ) ? (

                                <div className=" top-level fixed-height  modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                     style={ { marginBottom: 20 } }
                                >
                                    <div style={ { fontWeight: "bold", color: "red" } }>
                                        The Experiment List has changed. Please validate and click the button to delete the search.
                                    </div>
                                </div>

                            ) : null }

                            { ( this.state.experiments && this.state.experiments.length > 0 ) ? (

                                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                                    // style={ { padding : 6 } }
                                >
                                    <div style={ { fontWeight: "bold" } }>
                                        Experiments that contain the search and will be deleted when the search is deleted:
                                    </div>
                                    <div >
                                        <ul>
                                        {
                                            this.state.experiments.map( (experiment, index) => {

                                                return (
                                                    <li key={ experiment.experimentId }>
                                                        { experiment.experimentName }
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </div>

                                </div>

                            ) : null }

                            */}

                        </div>

                    </React.Fragment>

                ) : null }

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }

}

type SingleOtherProject_Clicked_Callback = ( projectId: number ) => void;

class SingleOtherProject_Props {
    project: ProjectPage_SearchesAdmin_CopyMove_Searches_Overlay_SupportCode__GetOtherProjectsCanCopyMoveProjectSearchIdsTo_ResultEntry
    singleOtherProject_Clicked_Callback: SingleOtherProject_Clicked_Callback
}

/**
 *
 * @param props
 */
const SingleOtherProject : FC<SingleOtherProject_Props> =
    function (props: SingleOtherProject_Props) : JSX.Element {

    return (
        <React.Fragment>
            <div
                className=" fake-link  "
                onClick={ event => {
                    event.stopPropagation();
                    props.singleOtherProject_Clicked_Callback( props.project.projectId );
                } }
            >{ props.project.projectTitle }
            </div>
            <div className="top-level-label-bottom-border"></div>
        </React.Fragment>
    )
}



///////////
///////////

//
// /**
//  * Delete this Project Search Id
//  */
// const _singleOtherProject_Clicked_Callback_CallWebservice = function (
//     {
//         projectSearchId,
//         experimentIds_Containing_ProjectSearchId
//     } : {
//         projectSearchId: number
//         experimentIds_Containing_ProjectSearchId: Array<number>
//     }) : Promise<CopyMove_Searches_CallWebservice_Result> {
//
//     let requestObj = {
//         projectSearchId,
//         experimentIds_Containing_ProjectSearchId
//     };
//
//     return new Promise<CopyMove_Searches_CallWebservice_Result>((resolve, reject) => {
//
//         const url = "d/rws/for-page/delete-project-search";
//
//         const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});
//
//         const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//         promise_webserviceCallStandardPost.catch((reason) => {
//             try {
//                 console.warn("_singleOtherProject_Clicked_Callback_CallWebservice: in .then: reason: ", reason );
//                 reject(reason);
//
//             } catch (e) {
//                 console.warn("_singleOtherProject_Clicked_Callback_CallWebservice: exception in .catch: ", e )
//                 reportWebErrorToServer.reportErrorObjectToServer({
//                     errorException: e
//                 });
//                 throw e;
//             }
//         });
//
//         promise_webserviceCallStandardPost.then(({responseData}) => {
//             try {
//                 if ( responseData.statusSuccess === undefined ) {
//                     const msg = "_singleOtherProject_Clicked_Callback_CallWebservice: ( responseData.statusSuccess === undefined )";
//                     console.warn(msg);
//                     throw Error(msg);
//                 }
//
//                 let statusSuccess = false;
//                 if ( responseData.statusSuccess ) {
//                     statusSuccess = true
//                 }
//                 let experimentIdsNotMatch = false;
//                 if ( responseData.experimentIdsNotMatch ) {
//                     experimentIdsNotMatch = true
//                 }
//                 const response : CopyMove_Searches_CallWebservice_Result = {
//                     statusSuccess,
//                     experimentIdsNotMatch
//                 }
//                 resolve(response);
//
//             } catch (e) {
//                 console.warn("_singleOtherProject_Clicked_Callback_CallWebservice: exception in .then: ", e )
//                 reportWebErrorToServer.reportErrorObjectToServer({
//                     errorException: e
//                 });
//                 throw e;
//             }
//         });
//     })
// }

// class CopyMove_Searches_CallWebservice_Result {
//     statusSuccess: boolean;
//     experimentIdsNotMatch: boolean
// }

