/**
 * projectPage_SearchesAdmin_DeleteSearch_Overlay_Component.tsx
 *
 * Project Page - Delete Search Overlay
 *
 *   called from projectPage_SearchesAdmin.ts
 */


import React from "react";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    projectPage_ListExperimentsContainingProjectSearchIds, ProjectPage_ListExperimentsContainingProjectSearchIds_Result,
    ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_ListExperimentsContainingProjectSearchIds";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";


const _Overlay_Title = "Delete Searches"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

/**
 *
 */
export class ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry {
    projectSearchId: number
    searchId: number
    searchName: string
}

/**
 *
 */
export const projectPage_DeleteSearch_Overlay_Component__openOverlay = function (
    {
        searchesToDelete,
        projectIdentifier,
        deleteComplete_Callback
    } : {
        searchesToDelete: Array<ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry>
        projectIdentifier : string
        deleteComplete_Callback: () => void

    }) : void {


    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callback_Close_Overlay = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent =  (
        <ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component
            searchesToDelete={ searchesToDelete }
            projectIdentifier={ projectIdentifier }
            deleteComplete_Callback={ deleteComplete_Callback }
            callback_Close_Overlay={ callback_Close_Overlay }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

}

/**
 *
 */
interface ProjectPage_DeleteSearch_Overlay_Component_Props {
    searchesToDelete: Array<ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component__SingleSearchEntry>
    projectIdentifier : string
    deleteComplete_Callback: () => void
    callback_Close_Overlay: () => void
}


/**
 *
 */
interface ProjectPage_DeleteSearch_Overlay_Component_State {

    experiments?: Array<ProjectPage_ListExperimentsContainingProjectSearchIds_Result_ExperimentEntry>

    show_LoadingMessage?: boolean
    show_DeletingMessage?: boolean

    show_ExperimentListChanged_Message?: boolean
    show_GeneralErrorUpdatingServer_Message?: boolean
}


/**
 *
 */
class ProjectPage_SearchesAdmin_DeleteSearch_Overlay_Component extends React.Component< ProjectPage_DeleteSearch_Overlay_Component_Props, ProjectPage_DeleteSearch_Overlay_Component_State > {

    private _deleteSearch_BindThis = this._deleteSearch.bind(this);

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: ProjectPage_DeleteSearch_Overlay_Component_Props) {
        super(props);

        this.state = {
            experiments: null,
            show_LoadingMessage: true
        };
    }

    componentDidMount() {

        this._getExperimentsList();
    }

    componentWillUnmount() {

        this._unmountCalled = true;
    }

    private _getExperimentsList() {


        const projectSearchIds = new Set<number>();

        for ( const searchToDelete of this.props.searchesToDelete ) {
            projectSearchIds.add(  searchToDelete.projectSearchId );
        }

        const promise = projectPage_ListExperimentsContainingProjectSearchIds({
            projectIdentifier: this.props.projectIdentifier, projectSearchIds });

        promise.catch( (reason) => {

        });
        promise.then( (result) => {

            if ( this._unmountCalled ) {
                //  unmounted so exit
                return;  // EARLY RETURN
            }

            this.setState({ experiments: result.experiments, show_LoadingMessage: false });
        })
    }

    private _deleteSearch( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {

        let experimentIds_Containing_ProjectSearchId: Array<number> = undefined;
        if ( this.state.experiments && this.state.experiments.length > 0 ) {
            experimentIds_Containing_ProjectSearchId = [];
            for ( const experiment of this.state.experiments ) {
                experimentIds_Containing_ProjectSearchId.push( experiment.experimentId );
            }
        }

        this.setState({ show_DeletingMessage: true });

        const projectSearchIds = new Set<number>();

        for ( const searchToDelete of this.props.searchesToDelete ) {
            projectSearchIds.add(  searchToDelete.projectSearchId );
        }

        const promise = _deleteSearch_CallWebservice({ projectSearchIds: Array.from( projectSearchIds ), experimentIds_Containing_ProjectSearchId })
        promise.catch( reason => {
            if ( this._unmountCalled ) {

                return; // EARLY RETURN
            }
            this.setState({ show_DeletingMessage: false });
            console.warn("Request rejected.  reason: " , reason );
            throw Error("Request rejected");
        });
        promise.then( result => {
            if ( this._unmountCalled ) {
                if ( result.statusSuccess ) {

                    // if ( experimentIds_Containing_ProjectSearchId && experimentIds_Containing_ProjectSearchId.length > 0 ) {
                    //
                    //     //  Reload page to update Experiment List
                    //
                    //     //  reload current URL
                    //     limelight__ReloadPage_Function()
                    //
                    //     return;  // EARLY RETURN
                    // }

                    this.props.deleteComplete_Callback();
                }

                return; // EARLY RETURN
            }

            if ( ! result.statusSuccess ) {

                this.setState({ show_DeletingMessage: false });

                if ( result.experimentIdsNotMatch ) {

                    console.warn( "( ! result.statusSuccess ) AND ( result.experimentIdsNotMatch )" )

                    this.setState({ show_ExperimentListChanged_Message: true });

                    this._getExperimentsList();

                } else {

                    console.warn( "( ! result.statusSuccess ) AND ( result.experimentIdsNotMatch )" )

                    this.setState({ show_GeneralErrorUpdatingServer_Message: true });
                }
            } else {

                //  Just reload page since more parts need to be updated.

                //  reload current URL
                // limelight__ReloadPage_Function()

                //  WAS

                // if ( experimentIds_Containing_ProjectSearchId && experimentIds_Containing_ProjectSearchId.length > 0 ) {
                //
                //     //  Reload page to update Experiment List
                //
                //     //  reload current URL
                //     limelight__ReloadPage_Function()
                //
                //     return;  // EARLY RETURN
                // }

                this.props.deleteComplete_Callback();
                this.props.callback_Close_Overlay();
            }
        });
    }

    /**
     *
     */
    render() {

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

                ) : ( this.state.show_LoadingMessage || this.state.show_DeletingMessage ) ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "

                        // style={ { padding : 6 } }
                    >
                        <div
                            style={ { textAlign: "center" } }
                        >
                            { ( this.state.show_LoadingMessage ) ? (
                                <span>LOADING DATA</span>
                            ) : (
                                <span>DELETING SEARCH{ this.props.searchesToDelete.length > 1 ? "ES" : null }</span>
                            ) }
                        </div>

                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                            <Spinner_Limelight_Component/>
                        </div>

                    </div>

                ) : (  //  Display Main when no message to display

                    <React.Fragment>

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginTop : 20, marginBottom: 20 } }
                        >
                            <button
                                onClick={ this._deleteSearch_BindThis }
                            >
                                Delete Search{ this.props.searchesToDelete.length > 1 ? "es" : null }
                            </button>
                        </div>

                        <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                             style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                            // style={ { padding : 6 } }
                        >
                            <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                                Search{ this.props.searchesToDelete.length > 1 ? "es" : null } to Delete:
                            </div>
                            <div>
                                <ul>
                                    { this.props.searchesToDelete.map( (value, index, fullArray ) => {

                                        return (
                                            <li key={ value.projectSearchId } style={ { marginBottom: 3 } }>
                                                <span>
                                                    { value.searchName }
                                                </span>
                                                <span> ({ value.searchId })</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            { ( this.state.show_ExperimentListChanged_Message ) ? (

                                    <div style={ { fontWeight: "bold", color: "red", marginBottom: 20 } }>
                                        The Experiment List has changed. Please validate and click the button to delete the search.
                                    </div>

                            ) : null }

                            { ( this.state.experiments && this.state.experiments.length > 0 ) ? (

                                <React.Fragment>
                                    <div style={ { fontWeight: "bold" } }>
                                        { this.props.searchesToDelete.length === 1 ? (
                                            <span>
                                                Experiments that contain the search and will be deleted when the search is deleted:
                                            </span>
                                        ) : (
                                            <span>
                                                Experiments that contain the searches and will be deleted when the searches are deleted:
                                            </span>
                                        )}
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

                                </React.Fragment>

                            ) : null }
                        </div>

                    </React.Fragment>

                )}

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }

}



///////////
///////////


/**
 * Delete this Project Search Id
 */
const _deleteSearch_CallWebservice = function (
    {
        projectSearchIds,
        experimentIds_Containing_ProjectSearchId
    } : {
        projectSearchIds : Array<number>
        experimentIds_Containing_ProjectSearchId: Array<number>
    }) : Promise<DeleteSearch_CallWebservice_Result> {

    let requestObj = {
        projectSearchIds,
        experimentIds_Containing_ProjectSearchId
    };

    return new Promise<DeleteSearch_CallWebservice_Result>((resolve, reject) => {

        const url = "d/rws/for-page/delete-project-search";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend: requestObj, url, dataRetrieval_CanRetry: false });

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch((reason) => {
            try {
                console.warn("_deleteSearch_CallWebservice: in .then: reason: ", reason );
                reject(reason);

            } catch (e) {
                console.warn("_deleteSearch_CallWebservice: exception in .catch: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });

        promise_webserviceCallStandardPost.then(({responseData}) => {
            try {
                if ( responseData.statusSuccess === undefined ) {
                    const msg = "_deleteSearch_CallWebservice: ( responseData.statusSuccess === undefined )";
                    console.warn(msg);
                    throw Error(msg);
                }

                let statusSuccess = false;
                if ( responseData.statusSuccess ) {
                    statusSuccess = true
                }
                let experimentIdsNotMatch = false;
                if ( responseData.experimentIdsNotMatch ) {
                    experimentIdsNotMatch = true
                }
                const response : DeleteSearch_CallWebservice_Result = {
                    statusSuccess,
                    experimentIdsNotMatch
                }
                resolve(response);

            } catch (e) {
                console.warn("_deleteSearch_CallWebservice: exception in .then: ", e )
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });
    })
}

class DeleteSearch_CallWebservice_Result {
    statusSuccess: boolean;
    experimentIdsNotMatch: boolean
}

