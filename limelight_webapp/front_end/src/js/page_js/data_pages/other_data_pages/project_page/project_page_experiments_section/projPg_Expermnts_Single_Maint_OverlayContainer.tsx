/**
 * projPg_Expermnts_Single_Maint_OverlayContainer.tsx
 * 
 * Single Experiment - Maint Overlay Container
 * 
 * Shown when "Add Experiment" is clicked
 */


import React from 'react'


import { ProjectPage_Experiments_SingleExperimentMaintRoot } from './projPg_Expermnts_Single_MaintRoot';

/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props {

    projectPage_ExperimentsSection_LoggedInUsersInteraction
    experimentData
    projectIdentifierFromURL
    searchesData 
}

/**
 * 
 */
interface ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_State {

}


/**
 * 
 */
export class ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer extends React.Component< ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props, ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_State > {

    private _closeClickHandler_BindThis = this._closeClickHandler.bind(this);
    private _closeOverlay_BindThis = this._closeOverlay.bind(this);

    private _projectPage_ExperimentsSection_LoggedInUsersInteraction;
    private _dialogTop;

    /**
     * 
     */
    constructor(props : ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props) {
        super(props);

        // this._headerColumnClicked = this._headerColumnClicked.bind(this);
        this._projectPage_ExperimentsSection_LoggedInUsersInteraction = props.projectPage_ExperimentsSection_LoggedInUsersInteraction;

        //  bind to 'this' for passing as parameters
        // this._mainCellClickHandler_BindThis = this._mainCellClickHandler.bind(this);
        
        {
            const defaultDialogTop = 5;

            const windowScrollY = Math.round( window.scrollY );

            this._dialogTop = defaultDialogTop + windowScrollY;
        }

        this.state = {
            projectPage_ExperimentsSection_LoggedInUsersInteraction: props.projectPage_ExperimentsSection_LoggedInUsersInteraction,
        };
    }


    /**
     * 
     */
    _closeClickHandler( event ) {

        this._closeOverlay();
    }


    /**
     * 
     */
    _closeOverlay() {

        const projectPage_ExperimentsSection_LoggedInUsersInteraction = this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction;
        if ( ! projectPage_ExperimentsSection_LoggedInUsersInteraction ) {
            throw Error("_closeClickHandler(..): projectPage_ExperimentsSection_LoggedInUsersInteraction not populated");
        }

        projectPage_ExperimentsSection_LoggedInUsersInteraction.closeOverlay();
    }



    /**
     * 
     */
    render () {

        let overlayHeaderLabel = "Add";

        if ( this.props.experimentData ) {
            overlayHeaderLabel = "Edit";
        }

        return (
            <React.Fragment>
                <div className="modal-overlay-page-background  modal-overlay-page-background-clickable " style={ { zIndex : 600 } } > </div>

                <div className=" modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container experiment-maint-main-body modal-overlay-content-body " 
                    style={ { position: "fixed", left: 5, top: 5, width: "calc(100vw - 10px)", height: "calc(100vh - 10px)", zIndex: 601 } }>
                         {/* if position: "absolute" then use: top: this._dialogTop */}

                    <div className="top-level fixed-height modal-overlay-header" style={ { width: "100%" } }>
                        <h1 className="modal-overlay-X-icon" onClick={ this._closeClickHandler_BindThis }>X</h1>
                        <h1 className="modal-overlay-header-text">{ overlayHeaderLabel } Experiment</h1>
                    </div>

                    {/* <div className=" modal-overlay-content-body experiment-maint-main-body ">
                        <div className="modal-overlay-body-standard-padding"> */}
                            <ProjectPage_Experiments_SingleExperimentMaintRoot 
                                closeOverlay={ this._closeOverlay_BindThis }
                                projectIdentifierFromURL={ this.props.projectIdentifierFromURL }
                                projectPage_ExperimentsSection_LoggedInUsersInteraction={ this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction }
                                searchesData={ this.props.searchesData }
                                experimentData={ this.props.experimentData }
                            />
                        {/* </div>
                    </div> */}
                                
                </div>
            </React.Fragment>
        );

    }
}
