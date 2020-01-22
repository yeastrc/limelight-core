/**
 * projPg_ExpermntsSectionRoot.tsx
 * 
 * Root of Experments Section
 */
import React from 'react'


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


export interface ProjectPage_ExperimentsSectionRoot_Props {

    projectIdentifierFromURL
    projectPage_ExperimentsSection_LoggedInUsersInteraction
    editExperimentInvokeHandler
    cloneExperimentInvokeHandler
}

interface ProjectPage_ExperimentsSectionRoot_State {

    draftExperiments?
    experiments_drafts_initialLoading?
    experiments?
    experiments_initialLoading?
}


/**
 * 
 */
export class ProjectPage_ExperimentsSectionRoot extends React.Component< ProjectPage_ExperimentsSectionRoot_Props, ProjectPage_ExperimentsSectionRoot_State > {

    private _createNewExperiment_BindThis = this._createNewExperiment.bind(this);

    private _experimentDraftNameClicked_BindThis = this._experimentDraftNameClicked.bind(this);
    private _experimentDraftEditClicked_BindThis = this._experimentDraftEditClicked.bind(this);
    private _experimentDraftDeleteClicked_BindThis = this._experimentDraftDeleteClicked.bind(this);

    private _experimentNameClicked_BindThis = this._experimentNameClicked.bind(this);
    private _experimentEditClicked_BindThis = this._experimentEditClicked.bind(this);
    private _experimentCloneClicked_BindThis = this._experimentCloneClicked.bind(this);
    private _experimentDeleteClicked_BindThis = this._experimentDeleteClicked.bind(this);


    constructor(props : ProjectPage_ExperimentsSectionRoot_Props) {
        super(props);

        this.state = {
            experiments_initialLoading : true,
            experiments_drafts_initialLoading : true
        };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //  Return new state (like return from setState(callback)) or null

    //     // return { setIn_getDerivedStateFromProps : true };
    //     return null;
    // }

    /**
     * 
     */
    componentDidMount() {

        // console.log("componentDidMount(): this.state.setIn_getDerivedStateFromProps: " + this.state.setIn_getDerivedStateFromProps );

        this._loadExperiments_NonDrafts_IfNeeded();
        this._loadDraftExperiments_IfNeeded();
    }

    /**
     * 
     */
    refreshExperimentsLists() {

        this._loadExperiments_NonDrafts_IfNeeded();
        this._loadDraftExperiments_IfNeeded();
    }

    /**
     * Non Draft
     */
    _loadExperiments_NonDrafts_IfNeeded() {

        //  Load Data

        // if ( this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {

            //  Load Experiment NON Drafts

            const promise_loadExperiment = _loadExperiments_NonDrafts({ projectIdentifierFromURL : this.props.projectIdentifierFromURL });
            promise_loadExperiment.catch( (reason) => { } );
            promise_loadExperiment.then( ({ responseData }) => {

                this._process_loadExperiment_NonDrafts_responseData({ loadExperiments_responseData : responseData });
            });
        // }
    }

    /**
     * 
     */
    _process_loadExperiment_NonDrafts_responseData({ loadExperiments_responseData }) {

        this.setState( (state, props ) => {

            return _process_loadExperiments_NonDrafts_responseData_SetState({ state, props, loadExperiments_responseData });
        });
    }

    /**
     * 
     */
    _loadDraftExperiments_IfNeeded() {

        //  Load Data

        if ( this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {

            //  Load Experiment Drafts

            const promise_loadExperimentDrafts = _loadExperimentDrafts({ projectIdentifierFromURL : this.props.projectIdentifierFromURL });
            promise_loadExperimentDrafts.catch( (reason) => { } );
            promise_loadExperimentDrafts.then( ({ responseData }) => {

                this._process_loadExperimentDrafts_responseData({ loadExperimentDrafts_responseData : responseData });
            });
        }
    }

    /**
     * 
     */
    _process_loadExperimentDrafts_responseData({ loadExperimentDrafts_responseData }) {

        this.setState( (state, props ) => {

            return _process_loadExperimentDrafts_responseData_SetState({ state, props, loadExperimentDrafts_responseData });
        });
    }

    /**
     * 
     */
    _createNewExperiment( event ) {

        if ( ! this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {
            throw Error("_createNewExperiment(..): this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction not populated");
        }

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.createNewExperimentButtonClicked({ event });
    }

    /**
     * 
     */
    _experimentDraftNameClicked({ id }) {

        this.props.editExperimentInvokeHandler({ experimentId : id })
    }

    /**
     * 
     */
    _experimentDraftEditClicked({ id }) {

        this.props.editExperimentInvokeHandler({ experimentId : id })
    }

    /**
     * @param id - experiment id
     * @param name - experiment name
     */
    _experimentDraftDeleteClicked({ id, name }) {

        if ( window.confirm("Delete Experiment " + name + "?" ) ) {

            // console.log("_experimentDraftDeleteClicked: Confirmed Delete for: id: " + id + ", name: " + name );

            const promise_deleteExperiment = _deleteExperiment({ id });
            promise_deleteExperiment.catch( (reason) => {  });

            promise_deleteExperiment.then( (result) => {

                this._loadDraftExperiments_IfNeeded();
            });
        }
    }

    /**
     * 
     */
    _experimentNameClicked({ id }) {

        this.props.editExperimentInvokeHandler({ experimentId : id })
    }

    /**
     * 
     */
    _experimentEditClicked({ id }) {

        this.props.editExperimentInvokeHandler({ experimentId : id })
    }

    /**
     * 
     */
    _experimentCloneClicked({ id }) {

        this.props.cloneExperimentInvokeHandler({ experimentId : id })
    }

    /**
     * @param id - experiment id
     * @param name - experiment name
     */
    _experimentDeleteClicked({ id, name }) {

        if ( window.confirm("Delete Experiment " + name + "?" ) ) {

            // console.log("_experimentDeleteClicked: Confirmed Delete for: id: " + id + ", name: " + name );

            const promise_deleteExperiment = _deleteExperiment({ id });
            promise_deleteExperiment.catch( (reason) => {  });

            promise_deleteExperiment.then( (result) => {

                this._loadExperiments_NonDrafts_IfNeeded();
            });
        }
    }

    /**
     * 
     */
    render () {

        let createNewExperimentButton = undefined;

        let draftExperiments = undefined;

        let experimentsNonDraft_Label = undefined;

        if ( this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {

            createNewExperimentButton = (
                <input type="button" onClick={ this._createNewExperiment_BindThis } value="Create New Experiment" />
            );

            let draftExperimentsList = undefined;

            if ( this.state.experiments_drafts_initialLoading ) {

                draftExperimentsList = (
                    <div >Loading</div>
                );
            } else if ( this.state.draftExperiments ) {

                draftExperimentsList = (
                    <ExperimentDraftList 
                        draftExperiments={ this.state.draftExperiments } 
                        experimentDraftNameClicked={ this._experimentDraftNameClicked_BindThis }
                        experimentDraftDeleteClicked={ this._experimentDraftDeleteClicked_BindThis }
                    />
                );

            } else {
                // draftExperimentsList = (
                //     <div >No Draft Experiments</div>
                // );
            }

            if ( draftExperimentsList ) {
                draftExperiments = (
                    <div >
                        <div style={ { fontSize: 16, fontWeight : "bold", marginTop : 10, marginBottom : 10 } }
                            title="Experiments that are in Draft status."
                        >Experiment Drafts</div>
                        <div >
                            { draftExperimentsList }
                        </div>
                    </div>
                );
            }

            if ( this.state.experiments_drafts_initialLoading || this.state.draftExperiments ) {
                experimentsNonDraft_Label = (

                    <div style={ { fontSize: 16, fontWeight : "bold", marginTop : 10 } }
                        title="Published Experiments that all users can see and use."
                    >Experiments</div>
                );
            }
        }

        let experimentsListSection = undefined;

        if ( this.state.experiments_initialLoading ) {
            experimentsListSection = (
                <div >Loading</div>
            );
        } else if ( this.state.experiments ) {
            experimentsListSection = (
                <ExperimentList 
                        experiments={ this.state.experiments } 
                        experimentNameClicked={ this._experimentNameClicked_BindThis }
                        experimentEditClicked={ this._experimentEditClicked_BindThis }
                        experimentCloneClicked={ this._experimentCloneClicked_BindThis }
                        experimentDeleteClicked={ this._experimentDeleteClicked_BindThis }
                    />
            );
        } else {
            experimentsListSection = (
                <div >No Experiments</div>
            );
        }

        const experimentsListSectionContainer = (
            <div style={ { marginTop : 10 } }>
                { experimentsListSection }
            </div>
        )

        return (
            <div >
                { createNewExperimentButton }
                { draftExperiments }
                { experimentsNonDraft_Label }
                { experimentsListSectionContainer }
            </div>
        );
    }

}

////////////////////////////

//  Functions NOT in a class


/**
 * 
 */
const _process_loadExperiments_NonDrafts_responseData_SetState = ({ state, props, loadExperiments_responseData }) => {

    const experiments = loadExperiments_responseData.experiments;

    const stateResult = { experiments : null, experiments_initialLoading : null };

    if ( experiments && experiments.length !== 0 ) {
        stateResult.experiments = experiments;
    }

    return stateResult;
}

/**
 * 
 */
const _process_loadExperimentDrafts_responseData_SetState = ({ state, props, loadExperimentDrafts_responseData }) => {
        
        const experiments = loadExperimentDrafts_responseData.experiments;

        const stateResult = { draftExperiments : null, experiments_drafts_initialLoading : null };

        if ( experiments && experiments.length !== 0 ) {
            stateResult.draftExperiments = experiments;
        }

        return stateResult;
}

////////////////////////////

interface ExperimentDraftList_Props {

    draftExperiments
    experimentDraftNameClicked
    experimentDraftDeleteClicked
}

/**
 * 
 */
class ExperimentDraftList extends React.Component< ExperimentDraftList_Props, {} > {

    constructor(props : ExperimentDraftList_Props) {
        super(props);

        this.state = {
            
        };
    }

    /**
     * 
     */
    render () {

        const experimentDrafts_Components = [];

        {
            let index = 0;
            for ( const experiment of this.props.draftExperiments ) {
                const experimentDraft_Component = (
                    <ExperimentDraft 
                        key={ index } 
                        experiment={ experiment } 
                        experimentDraftNameClicked={ this.props.experimentDraftNameClicked } 
                        experimentDraftDeleteClicked={ this.props.experimentDraftDeleteClicked }
                    />
                )
                experimentDrafts_Components.push( experimentDraft_Component );
                index++;
            }
        }

        return (
            <React.Fragment>
                { experimentDrafts_Components }
            </React.Fragment>
        );
    }

}

////////////////////////////

interface ExperimentDraft_Props {
    
    experiment
    experimentDraftNameClicked
    experimentDraftDeleteClicked
}

class ExperimentDraft extends React.Component< ExperimentDraft_Props, {} > {

    private _experimentDraftNameClicked_BindThis = this._experimentDraftNameClicked.bind(this);
    private _experimentDraftDeleteClicked_BindThis = this._experimentDraftDeleteClicked.bind(this);


    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    _experimentDraftNameClicked( event ) {
        event.stopPropagation();

        this.props.experimentDraftNameClicked({ id : this.props.experiment.id });
    }

    _experimentDraftDeleteClicked( event ) {
        event.stopPropagation();

        this.props.experimentDraftDeleteClicked({ id : this.props.experiment.id, name :  this.props.experiment.name });
    }

    /**
     * 
     */
    render () {

        // {id: 16, name: "aa", canEdit: true, canDelete: true }

        let name_title = undefined;
        let name_className = " ";
        let name_onClick = undefined;

        let editIcon = undefined;

        if ( this.props.experiment.canEdit ) {
            name_title = "Click to Edit Experiment"
            name_className += " fake-link ";
            name_onClick = this._experimentDraftNameClicked_BindThis;

            editIcon = (
                <React.Fragment>
                    <span > </span>
                    <img className=" fake-link-image icon-small " title="Edit Experiment" src="static/images/icon-edit.png"
                        onClick={ this._experimentDraftNameClicked_BindThis }
                    ></img>
                </React.Fragment>
            );
        }

        let deleteIcon = undefined;
        if ( this.props.experiment.canDelete ) {
            deleteIcon = (
                <React.Fragment>
                    <span > </span>
                    <img className=" fake-link-image icon-small " title="Delete Experiment" src="static/images/icon-circle-delete.png"
                        onClick={ this._experimentDraftDeleteClicked_BindThis }
                    ></img>
                </React.Fragment>
            );
        }

        return (
            <div style={ { marginBottom: 5 } }>
                <span className={ name_className } onClick={ name_onClick } title={ name_title }>
                    { this.props.experiment.name }
                </span>
                { editIcon }
                { deleteIcon }
            </div>
        );
    }

}


////////////////////////////

interface ExperimentList_Props {

    experiments
    experimentNameClicked
    experimentEditClicked
    experimentCloneClicked
    experimentDeleteClicked
}

/**
 * 
 */
class ExperimentList extends React.Component< ExperimentList_Props, {} > {

    constructor(props : ExperimentList_Props) {
        super(props);

        this.state = {
            
        };
    }

    /**
     * 
     */
    render () {

        const experiments_Components = [];

        {
            let index = 0;
            for ( const experiment of this.props.experiments ) {
                const experiment_Component = (
                    <Experiment 
                        key={ index } 
                        experiment={ experiment } 
                        experimentNameClicked={ this.props.experimentNameClicked } 
                        experimentEditClicked={ this.props.experimentEditClicked }
                        experimentCloneClicked={ this.props.experimentCloneClicked }
                        experimentDeleteClicked={ this.props.experimentDeleteClicked }
                    />
                )
                experiments_Components.push( experiment_Component );
                index++;
            }
        }

        return (
            <div >
                { experiments_Components }
            </div>
        );
    }

}

///////////

interface Experiment_Props {
    
    experiment
    experimentNameClicked
    experimentEditClicked
    experimentCloneClicked
    experimentDeleteClicked
}

/**
 * 
 */
class Experiment extends React.Component< Experiment_Props, {} > {

    private _experimentNameClicked_BindThis = this._experimentNameClicked.bind(this);
    private _experimentEditClicked_BindThis = this._experimentEditClicked.bind(this);
    private _experimentCloneClicked_BindThis = this._experimentCloneClicked.bind(this);
    private _experimentDeleteClicked_BindThis = this._experimentDeleteClicked.bind(this);


    constructor(props : Experiment_Props) {
        super(props);

        this.state = {
            
        };
    }

    _experimentNameClicked( event ) {
        event.stopPropagation();

        if ( this.props.experimentNameClicked ) {
            this.props.experimentNameClicked({ id : this.props.experiment.id });
        }
    }

    _experimentEditClicked( event ) {
        event.stopPropagation();

        this.props.experimentEditClicked({ id : this.props.experiment.id });
    }

    _experimentCloneClicked( event ) {
        event.stopPropagation();

        this.props.experimentCloneClicked({ id : this.props.experiment.id });
    }

    _experimentDeleteClicked( event ) {
        event.stopPropagation();

        this.props.experimentDeleteClicked({ id : this.props.experiment.id, name :  this.props.experiment.name });
    }

    /**
     * 
     */
    render () {

        let name_title : string = undefined;
        let name_className = " ";
        let name_onClick = undefined;

        let editIcon : JSX.Element = undefined;
        let cloneIcon : JSX.Element = undefined;

        if ( this.props.experiment.canEdit && this.props.experimentEditClicked ) {
            name_title = "Click to Edit Experiment"
            name_className += " fake-link ";
            name_onClick = this._experimentNameClicked_BindThis;

            editIcon = (
                <React.Fragment>
                    <span > </span>
                    <img className=" fake-link-image icon-small " title="Edit Experiment" src="static/images/icon-edit.png"
                        onClick={ this._experimentEditClicked_BindThis }
                    ></img>
                </React.Fragment>
            );
        }

        if ( this.props.experiment.canClone && this.props.experimentCloneClicked ) {

            cloneIcon = (
                <React.Fragment>
                    <span > </span>
                    <span className=" fake-link " title="Clone Experiment" 
                        onClick={ this._experimentCloneClicked_BindThis }
                    >clone experiment</span>
                    {/* <img className=" fake-link-image icon-small " title="Clone Experiment" src="static/images/icon-edit.png"
                        onClick={ this._experimentCloneClicked_BindThis }
                    ></img> */}
                </React.Fragment>
            );
        }

        let deleteIcon = undefined;
        if ( this.props.experiment.canDelete && this.props.experimentDeleteClicked ) {
            deleteIcon = (
                <React.Fragment>
                    <span > </span>
                    <img className=" fake-link-image icon-small " title="Delete Experiment" src="static/images/icon-circle-delete.png"
                        onClick={ this._experimentDeleteClicked_BindThis }
                    ></img>
                </React.Fragment>
            );
        }

        const proteinLink = "d/pg/exp/protein/e/" + this.props.experiment.id + "/r";

        return (
            <div >
                <div className=" hovered-div-highlight ">
                    <div style={ { float: "right", paddingLeft: 10 } }>
                        <a href={ proteinLink }>[Proteins]</a>
                        { deleteIcon }
                    </div>
                    <span className={ name_className } onClick={ name_onClick } title={ name_title }>
                        { this.props.experiment.name }
                    </span>
                    { editIcon }
                    { cloneIcon }
                </div>
                <div style={ { marginTop: 7, marginBottom: 8 } } className="searches-block-item-bottom-border"></div>
            </div>
        );
    }

}

///////////////////////////////////////////////////

////////////////////////////

//  Functions NOT in a class


/**
 * 
 */
const _loadExperimentDrafts = ({ projectIdentifierFromURL }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                projectIdentifier : projectIdentifierFromURL
            };
            
            const url = "d/rws/for-page/experiment/experiment-list-drafts";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve({ responseData });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    });
}

/**
 * Load Experiments - Not Drafts
 */
const _loadExperiments_NonDrafts = ({ projectIdentifierFromURL }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                projectIdentifier : projectIdentifierFromURL
            };
            
            const url = "d/rws/for-page/experiment/experiment-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve({ responseData });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    });
}


/**
 * 
 */
const _deleteExperiment = ({ id }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                id : id
            };
            
            const url = "d/rws/for-page/experiment/experiment-delete";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve({ responseData });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    });
}




