/**
 * projPg_Expermnts_Single_Maint_OverlayContainer.tsx
 * 
 * Single Experiment - Maint Overlay Container
 * 
 * Shown when "Add Experiment" is clicked
 */


import React from 'react'


import { ProjectPage_Experiments_SingleExperimentMaintRoot } from './projPg_Expermnts_Single_MaintRoot';
import {keep_UserSession_AliveIfExists_OnServer_WebserviceCall} from "page_js/keep_UserSession_AliveIfExists_OnServer_WebserviceCall";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
    AnnotationTypeData_Root,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperimentMaint_OverlayContainer_Props {

    projectPage_ExperimentsSection_LoggedInUsersInteraction: any
    experimentData: any
    projectIdentifierFromURL: any
    searchesData : {
        searches_TopLevelAndNestedInFolders: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
        searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;
        searchesSubData : {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }
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

    private _beforeunload_eventListener : any;

    private _projectPage_ExperimentsSection_LoggedInUsersInteraction: any;
    private _dialogTop: any;

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
    componentDidMount() {

        const beforeUnload_EventHandler = (event: any) => {
            // Cancel the event
            event.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
            // Chrome requires returnValue to be set
            event.returnValue = '';
        };

        window.addEventListener("beforeunload", beforeUnload_EventHandler );

        this._beforeunload_eventListener = beforeUnload_EventHandler;

        this._call_keep_UserSession_AliveIfExists_OnServer_WebserviceCall();

        // console.warn( "beforeUnload_EventHandler: ", beforeUnload_EventHandler )
    }

    /**
     *
     */
    componentWillUnmount() {

        // console.warn( "this._beforeunload_eventListener: ", this._beforeunload_eventListener )

        if ( this._beforeunload_eventListener ) {
            window.removeEventListener( "beforeunload", this._beforeunload_eventListener );
        }
        this._beforeunload_eventListener = null;

        if ( this._keep_UserSession_AliveIfExists_OnServer_WebserviceCall_SetTimeout ) {
            window.clearTimeout( this._keep_UserSession_AliveIfExists_OnServer_WebserviceCall_SetTimeout );
        }
    }

    /**
     *
     */
    private _keep_UserSession_AliveIfExists_OnServer_WebserviceCall_SetTimeout : any;

    /**
     *
     */
    private _call_keep_UserSession_AliveIfExists_OnServer_WebserviceCall() {

        keep_UserSession_AliveIfExists_OnServer_WebserviceCall();

        const _keep_UserSession_AliveIfExists_OnServer_WebserviceCall_INTERVAL = 1 * 60 * 60 * 1000; // 1 hour

        this._keep_UserSession_AliveIfExists_OnServer_WebserviceCall_SetTimeout = window.setTimeout( () => {
            try {
                this._keep_UserSession_AliveIfExists_OnServer_WebserviceCall_SetTimeout = null;

                this._call_keep_UserSession_AliveIfExists_OnServer_WebserviceCall();

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        }, _keep_UserSession_AliveIfExists_OnServer_WebserviceCall_INTERVAL )
    }

    /**
     * 
     */
    _closeClickHandler( event: any ) {

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
