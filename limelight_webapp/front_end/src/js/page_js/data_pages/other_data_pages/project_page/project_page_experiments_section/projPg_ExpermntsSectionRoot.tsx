/**
 * projPg_ExpermntsSectionRoot.tsx
 * 
 * Main Display of Experiments Section - The root is in projPg_ExpermntsSectionRoot_Root.tsx
 */
import React from 'react'


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ProjectPage_ExperimentsList_SingleExperimentDetails } from './projPg_ExpermntsSection_ExpList_SingleExperimentDetails';
import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './projPg_Expermnts_LoggedInUsersInteraction';




export class ProjectPage_ExperimentsSectionRoot_Props {

    force_ReloadFromServer_Object : object

    projectIdentifierFromURL : string
    projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction
}

interface ProjectPage_ExperimentsSectionRoot_State {

    draftExperiments?: any
    experiments_drafts_initialLoading? : boolean
    experiments?: any
    experiments_initialLoading? : boolean

    createExperimentButton_Disabled? : boolean
}


/**
 * 
 */
export class ProjectPage_ExperimentsSectionRoot extends React.Component< ProjectPage_ExperimentsSectionRoot_Props, ProjectPage_ExperimentsSectionRoot_State > {

    private _refreshExperimentsLists_BindThis = this._refreshExperimentsLists.bind(this)

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

        if ( props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {
            props.projectPage_ExperimentsSection_LoggedInUsersInteraction.set_projectPage_ExperimentsSectionRoot( this )
        }

        this.state = {
            experiments_initialLoading : true,
            experiments_drafts_initialLoading : true,
            createExperimentButton_Disabled : true  //  Start at true until get data from server to indicate can change to false
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
    // static getDerivedStateFromProps( props : ProjectPage_ExperimentsSectionRoot_Props, state : ProjectPage_ExperimentsSectionRoot_State ) : ProjectPage_ExperimentsSectionRoot_State {

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

        this._getFromServer_ProjectContainsAtLeastOneActiveSearch();

        this._loadExperiments_NonDrafts_IfNeeded();
        this._loadDraftExperiments_IfNeeded();
    }

    /**
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate( prevProps: Readonly<ProjectPage_ExperimentsSectionRoot_Props>, prevState: Readonly<ProjectPage_ExperimentsSectionRoot_State>, snapshot?: any ) {

        if ( prevProps.force_ReloadFromServer_Object !== this.props.force_ReloadFromServer_Object ) {

            this._loadExperiments_NonDrafts_IfNeeded();
            this._loadDraftExperiments_IfNeeded();
        }

    }

    /**
     *
     */
    refreshExperimentsLists() {

        this._refreshExperimentsLists()
    }

    /**
     *
     */
    private _refreshExperimentsLists() {

        this._loadExperiments_NonDrafts_IfNeeded();
        this._loadDraftExperiments_IfNeeded();
    }

    /**
     * 
     */
    private _show_CreateExperiment_Button_And_DraftExperiments() : boolean {

        if ( this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {

            return true;
        }
        return false;
    }

    /**
     * Non Draft
     */
    private _loadExperiments_NonDrafts_IfNeeded() {

        //  Load Data

        //  Load Experiment NON Drafts

        const promise_loadExperiment = _loadExperiments_NonDrafts({ projectIdentifierFromURL : this.props.projectIdentifierFromURL });
        promise_loadExperiment.catch( (reason) => { } );
        promise_loadExperiment.then( ({ responseData }) => {
            try {
                this.setState( (state : ProjectPage_ExperimentsSectionRoot_State, props : ProjectPage_ExperimentsSectionRoot_Props ) : ProjectPage_ExperimentsSectionRoot_State => {

                    return _process_loadExperiments_NonDrafts_responseData_SetState({ state, props, loadExperiments_responseData : responseData });
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     * Draft
     */
    private _loadDraftExperiments_IfNeeded() {

        //  Load Data

        if ( this._show_CreateExperiment_Button_And_DraftExperiments() ) {

            //  Load Experiment Drafts

            const promise_loadExperimentDrafts = _loadExperimentDrafts({ projectIdentifierFromURL : this.props.projectIdentifierFromURL });
            promise_loadExperimentDrafts.catch( (reason) => { } );
            promise_loadExperimentDrafts.then( ({ responseData }) => {
                try {
                    this.setState( (state : ProjectPage_ExperimentsSectionRoot_State, props : ProjectPage_ExperimentsSectionRoot_Props ) : ProjectPage_ExperimentsSectionRoot_State => {

                        return _process_loadExperimentDrafts_responseData_SetState({ state, props, loadExperimentDrafts_responseData : responseData });
                    });
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    }

    /**
     * 
     */
    private _getFromServer_ProjectContainsAtLeastOneActiveSearch() {

        if ( ! this._show_CreateExperiment_Button_And_DraftExperiments() ) {

            //  Not going to show the "Create Experiment Button" so skip this query

            return;  // EARLY RETURN
        }

        //  Check Project

        const promise = _getFromServer_ProjectContainsAtLeastOneActiveSearch_MakeAJAXCall({ projectIdentifierFromURL : this.props.projectIdentifierFromURL });
        promise.catch( (reason) => { } );
        promise.then( ({ responseData }) => {
            try {
                if ( responseData.projectId_HasAtLeastOneActive_ProjectSearchId ) {

                    this.setState( (state : ProjectPage_ExperimentsSectionRoot_State, props : ProjectPage_ExperimentsSectionRoot_Props ) : ProjectPage_ExperimentsSectionRoot_State => {

                        return ({ createExperimentButton_Disabled : false }); // Change to NOT Disabled
                    });
                }
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }
    /**
     * 
     */
    private _createNewExperiment( event : React.MouseEvent<HTMLElement, MouseEvent> ) {

        if ( ! this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction ) {
            throw Error("_createNewExperiment(..): this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction not populated");
        }

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.createNewExperimentButtonClicked({ event });
    }

    /**
     * 
     */
    private _experimentDraftNameClicked({ id }:{ id: any }) {

        // this.props.editExperimentInvokeHandler({ experimentId : id })

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.editExperiment({ experimentId: id });
    }

    /**
     * 
     */
    private _experimentDraftEditClicked({ id }:{ id: any }) {

        // this.props.editExperimentInvokeHandler({ experimentId : id })

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.editExperiment({ experimentId: id });
    }

    /**
     * @param id - experiment id
     * @param name - experiment name
     */
    private _experimentDraftDeleteClicked({ id, name }:{ id: any, name: any }) {

        if ( window.confirm("Delete Experiment " + name + "?" ) ) {

            // console.log("_experimentDraftDeleteClicked: Confirmed Delete for: id: " + id + ", name: " + name );

            const promise_deleteExperiment = _deleteExperiment({ id });
            promise_deleteExperiment.catch( (reason) => {  });

            promise_deleteExperiment.then( (result) => {
                try {
                  this._loadDraftExperiments_IfNeeded();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    }

    ////  Non-Draft Experiments
    

    /**
     * 
     */
    private _experimentNameClicked({ id }:{ id: any }) {

        // this.props.editExperimentInvokeHandler({ experimentId : id })

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.editExperiment({ experimentId: id });
    }

    /**
     * 
     */
    private _experimentEditClicked({ id }:{ id: any }) {

        // this.props.editExperimentInvokeHandler({ experimentId : id })

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.editExperiment({ experimentId: id });
    }

    /**
     * 
     */
    private _experimentCloneClicked({ id }:{ id: any }) {

        // this.props.cloneExperimentInvokeHandler({ experimentId : id })

        this.props.projectPage_ExperimentsSection_LoggedInUsersInteraction.cloneExperiment({ experimentId: id });
    }

    /**
     * @param id - experiment id
     * @param name - experiment name
     */
    private _experimentDeleteClicked({ id, name }:{ id: any, name: any }) {

        if ( window.confirm("Delete Experiment " + name + "?" ) ) {

            // console.log("_experimentDeleteClicked: Confirmed Delete for: id: " + id + ", name: " + name );

            const promise_deleteExperiment = _deleteExperiment({ id });
            promise_deleteExperiment.catch( (reason) => {  });

            promise_deleteExperiment.then( (result) => {
                try {
                   this._loadExperiments_NonDrafts_IfNeeded();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    }

    /**
     * 
     */
    render () {

        let createNewExperimentButton_WithContainingDiv = undefined;

        let draftExperiments = undefined;

        let experimentsNonDraft_Label = undefined;

        if ( this._show_CreateExperiment_Button_And_DraftExperiments() ) {

            createNewExperimentButton_WithContainingDiv = (
                <div >
                    <input type="button" onClick={ this._createNewExperiment_BindThis } value="Create New Experiment" disabled={ this.state.createExperimentButton_Disabled } />
                </div>
            );

            let draftExperimentsList = undefined;

            if ( this.state.experiments_drafts_initialLoading ) {

                draftExperimentsList = (

                    <React.Fragment>
                        {/* CSS Grid 2 Columns - Column 1 Item */}
                        <div ></div>
                        {/* CSS Grid 2 Columns - Column 2 Item */}
                        <div >Loading</div>
                    </React.Fragment>
                );
            } else if ( this.state.draftExperiments ) {

                draftExperimentsList = (
                    <ExperimentDraftList 
                        draftExperiments={ this.state.draftExperiments } 
                        experimentDraftNameClicked={ this._experimentDraftNameClicked_BindThis }
                        experimentDraftEditClicked={ this._experimentDraftEditClicked_BindThis }
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
                    
                    <React.Fragment>
                        {/* CSS Grid 2 Columns - Column 1 Item */}
                        <div ></div>
                        {/* CSS Grid 2 Columns - Column 2 Item */}
                        <div > {/* Containing <div> since child <div> has "display: inline-block" to limit tooltip area */}
                            <div style={ { fontSize: 16, fontWeight : "bold", marginTop : 2, marginBottom : 10, display: "inline-block" } }
                                title="Experiments that are in Draft status."
                            >
                                Experiment Drafts
                            </div>
                        </div>
                        
                        { draftExperimentsList }
                        
                    </React.Fragment>
                );
            }

            if ( this.state.experiments_drafts_initialLoading || this.state.draftExperiments ) {
                
                experimentsNonDraft_Label = (

                    <React.Fragment>
                        {/* CSS Grid 2 Columns - Column 1 Item */}
                        <div ></div>
                        {/* CSS Grid 2 Columns - Column 2 Item */}
                        <div > {/* Containing <div> since child <div> has "display: inline-block" to limit tooltip area */}
                            <div style={ { fontSize: 16, fontWeight : "bold", marginTop : 10, marginBottom: 10, display: "inline-block" } }
                                title="Published Experiments that all users can see and use."
                            >
                                Experiments
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        }

        let experimentsListSection = undefined;

        if ( this.state.experiments_initialLoading ) {
            experimentsListSection = (

                <React.Fragment>
                    {/* CSS Grid 2 Columns - Column 1 Item */}
                    <div ></div>
                    {/* CSS Grid 2 Columns - Column 2 Item */}
                    <div >Loading</div>
                </React.Fragment>
            );
        } else if ( this.state.experiments ) {

            experimentsListSection = (

                <ExperimentList 
                    experiments={ this.state.experiments } 
                    experimentNameClicked={ this._experimentNameClicked_BindThis }
                    experimentEditClicked={ this._experimentEditClicked_BindThis }
                    experimentCloneClicked={ this._experimentCloneClicked_BindThis }
                    experimentDeleteClicked={ this._experimentDeleteClicked_BindThis }
                    projectIdentifierFromURL={ this.props.projectIdentifierFromURL }
                />
            );
        } else {
            experimentsListSection = ( // No Experiments

                <React.Fragment>
                    {/* CSS Grid 2 Columns - Column 1 Item */}
                    <div ></div>
                    {/* CSS Grid 2 Columns - Column 2 Item */}

                    <div >No Experiments</div>

                </React.Fragment>
            );
        }

        let experimentsListSection_Draft_NonDraft : JSX.Element = undefined;
        if ( draftExperiments || experimentsNonDraft_Label || experimentsListSection ) {

            experimentsListSection_Draft_NonDraft = (

                <div style={ {
                    display: "grid", gridTemplateColumns: "min-content auto",
                    marginTop: 10
                } }>

                    { draftExperiments }
                    { experimentsNonDraft_Label }
                    { experimentsListSection }
                </div>
            )
        }

        return (
            <div >
                { createNewExperimentButton_WithContainingDiv }
                { experimentsListSection_Draft_NonDraft }
            </div>
        );
    }

}

////////////////////////////

//  Functions NOT in a class


/**
 * 
 */
const _process_loadExperiments_NonDrafts_responseData_SetState = function (
    {
        state, props, loadExperiments_responseData
    }: {
        state: ProjectPage_ExperimentsSectionRoot_State
        props: ProjectPage_ExperimentsSectionRoot_Props
        loadExperiments_responseData: any
    }) : ProjectPage_ExperimentsSectionRoot_State {

    const experiments = loadExperiments_responseData.experiments;

    const stateResult: ProjectPage_ExperimentsSectionRoot_State = { experiments : null, experiments_initialLoading : null };

    if ( experiments && experiments.length !== 0 ) {
        stateResult.experiments = experiments;
    }

    return stateResult;
}

/**
 * 
 */
const _process_loadExperimentDrafts_responseData_SetState = function (
    {
        state, props, loadExperimentDrafts_responseData
    }: {
        state: ProjectPage_ExperimentsSectionRoot_State
        props: ProjectPage_ExperimentsSectionRoot_Props
        loadExperimentDrafts_responseData: any
    }) : ProjectPage_ExperimentsSectionRoot_State {
        
        const experiments = loadExperimentDrafts_responseData.experiments;

        const stateResult: ProjectPage_ExperimentsSectionRoot_State = { draftExperiments : null, experiments_drafts_initialLoading : null };

        if ( experiments && experiments.length !== 0 ) {
            stateResult.draftExperiments = experiments;
        }

        return stateResult;
}

////////////////////////////

interface ExperimentDraftList_Props {

    draftExperiments: any
    experimentDraftNameClicked: any
    experimentDraftEditClicked: any
    experimentDraftDeleteClicked: any
}

interface ExperimentDraftList_State {

    _placeholder: any
}

/**
 * 
 */
class ExperimentDraftList extends React.Component< ExperimentDraftList_Props, ExperimentDraftList_State > {

    constructor(props : ExperimentDraftList_Props) {
        super(props);

        // this.state = {
            
        // };
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
                        experimentDraftEditClicked={ this.props.experimentDraftEditClicked }
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
    
    experiment: any
    experimentDraftNameClicked: any
    experimentDraftEditClicked: any
    experimentDraftDeleteClicked: any
}

interface ExperimentDraft_State {

    _placeholder: any
}

class ExperimentDraft extends React.Component< ExperimentDraft_Props, ExperimentDraft_State > {

    // private _experimentDraftNameClicked_BindThis = this._experimentDraftNameClicked.bind(this);
    private _experimentDraftEditClicked_BindThis = this._experimentDraftEditClicked.bind(this);
    private _experimentDraftDeleteClicked_BindThis = this._experimentDraftDeleteClicked.bind(this);


    constructor(props: ExperimentDraft_Props) {
        super(props);

        this.state = {
            _placeholder: null
        };
    }

    // _experimentDraftNameClicked( event ) {
    //     event.stopPropagation();

    //     this.props.experimentDraftNameClicked({ id : this.props.experiment.id });
    // }

    _experimentDraftEditClicked( event: any ) {
        event.stopPropagation();

        this.props.experimentDraftEditClicked({ id : this.props.experiment.id });
    }

    _experimentDraftDeleteClicked( event: any ) {
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
            // name_title = "Click to Edit Experiment"  //  Now show/hide Experiment details (Not on Draft)
            // name_className += " fake-link ";
            // name_onClick = this._experimentDraftNameClicked_BindThis;

            editIcon = (
                <React.Fragment>
                    <span > </span>
                    <img className=" fake-link-image icon-small " title="Edit Experiment" src="static/images/icon-edit.png"
                        onClick={ this._experimentDraftEditClicked_BindThis }
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
            <React.Fragment>
                {/* CSS Grid 2 Columns - Column 1 Item */}
                <div ></div>
                {/* CSS Grid 2 Columns - Column 2 Item */}
                <div style={ { marginBottom: 5 } }>
                    <span className={ name_className } onClick={ name_onClick } title={ name_title }>
                        { this.props.experiment.name }
                    </span>
                    { editIcon }
                    { deleteIcon }
                </div>
            </React.Fragment>
        );
    }

}


////////////////////////////

interface ExperimentList_Props {

    experiments: any
    experimentNameClicked: any
    experimentEditClicked: any
    experimentCloneClicked: any
    experimentDeleteClicked: any

    projectIdentifierFromURL: any
}

interface ExperimentList_State {

    _placeholder: any
}

/**
 * 
 */
class ExperimentList extends React.Component< ExperimentList_Props, ExperimentList_State > {

    constructor(props : ExperimentList_Props) {
        super(props);

        // this.state = {
            
        // };
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

                        projectIdentifierFromURL={ this.props.projectIdentifierFromURL }
                    />
                )
                experiments_Components.push( experiment_Component );
                index++;
            }
        }

        return (
            <React.Fragment>
                { experiments_Components }
            </React.Fragment>
        );
    }

}

///////////

interface Experiment_Props {
    
    experiment: any
    experimentNameClicked: any
    experimentEditClicked: any
    experimentCloneClicked: any
    experimentDeleteClicked: any

    projectIdentifierFromURL: any
}

interface Experiment_State {
    
    showExperimentDetails? : boolean

    prev_experiment?: any;
}

/**
 * 
 */
class Experiment extends React.Component< Experiment_Props, Experiment_State > {

    private _experimentShowDetailsClicked_BindThis = this._experimentShowDetailsClicked.bind(this);
    private _experimentNameClicked_BindThis = this._experimentNameClicked.bind(this);
    private _experimentEditClicked_BindThis = this._experimentEditClicked.bind(this);
    private _experimentCloneClicked_BindThis = this._experimentCloneClicked.bind(this);
    private _experimentDeleteClicked_BindThis = this._experimentDeleteClicked.bind(this);


    constructor(props : Experiment_Props) {
        super(props);

        this.state = {
            showExperimentDetails : false,
            prev_experiment : props.experiment
        };
    }

    
    /**
     * 
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : Experiment_Props, state : Experiment_State ) : Experiment_State {

        // console.log("Experiment::getDerivedStateFromProps() called")
        
        if ( state.prev_experiment !== props.experiment ) {
            
            return {
                showExperimentDetails : false,
                prev_experiment : props.experiment
            };
        }

        return null;  //
    }


    _experimentShowDetailsClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
        event.stopPropagation();

        this.setState( ( state: Experiment_State , props: Readonly<Experiment_Props> ) : Experiment_State => {
            return { 
                showExperimentDetails : true 
            }
        })
    }


    _experimentNameClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
        event.stopPropagation();

		{
			//  Exit if user selected content on the page
			const selectedContent = window.getSelection().toString();
			if( selectedContent ){
				//  user selected content on the page
				return false; //  EARLY RETURN
			}
		}
		
        this.setState( ( state: Experiment_State , props: Readonly<Experiment_Props> ) : Experiment_State => {
            return { 
                showExperimentDetails : ! state.showExperimentDetails 
            }
        })
        // if ( this.props.experimentNameClicked ) {
        //     this.props.experimentNameClicked({ id : this.props.experiment.id });
        // }
    }

    _experimentEditClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
        event.stopPropagation();

        this.props.experimentEditClicked({ id : this.props.experiment.id });
    }

    _experimentCloneClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
        event.stopPropagation();

        this.props.experimentCloneClicked({ id : this.props.experiment.id });
    }

    _experimentDeleteClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {
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
            // name_title = "Click to Edit Experiment"  //  Now show/hide Experiment details (Not on Draft)
            name_className += " clickable ";
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
                    >[clone experiment]</span>
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

        const peptideLink = "d/pg/exp/peptide/e/" + this.props.experiment.id + "/r";
        const proteinLink = "d/pg/exp/protein/e/" + this.props.experiment.id + "/r";
        const modViewLink = "d/pg/exp/mod-view/e/" + this.props.experiment.id + "/r";

        const pointerRightOrDownOnClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) : void => {
            this.setState( ( state: Experiment_State , props: Readonly<Experiment_Props> ) : Experiment_State => {
                return { showExperimentDetails : ! state.showExperimentDetails }
            })
        }

        //  Experiment Details:

        let expandCollapsePointerIcon : JSX.Element = undefined;

        let experimentDetailsComponentContainer : JSX.Element = undefined;

        if ( ! this.state.showExperimentDetails ) {

            //  NO: showing Experiment Details 

            expandCollapsePointerIcon = (
                <img className="icon-small fake-link " src="static/images/pointer-right.png"
                    onClick={ this._experimentShowDetailsClicked_BindThis }
                />
            );
        } else {

            //  YES: showing Experiment Details 

            expandCollapsePointerIcon = (
                <img className="icon-small fake-link " src="static/images/pointer-down.png"
                    onClick={ pointerRightOrDownOnClick }
                />
            );

            experimentDetailsComponentContainer = (
                <div >
                    <ProjectPage_ExperimentsList_SingleExperimentDetails
                        experimentItemFromExperimentList={ this.props.experiment }
                        projectIdentifierFromURL={ this.props.projectIdentifierFromURL }
                    />
                </div>
            );
        }

        return (
            <React.Fragment>
                {/* CSS Grid 2 Columns - Column 1 Item */}
                <div className=" pointer-right-down-icon-small-container ">
                    { expandCollapsePointerIcon }
                </div>
                {/* CSS Grid 2 Columns - Column 2 Item */}
                <div >
                    <div className=" hovered-div-highlight ">
                        <div style={ { float: "right", paddingLeft: 10 } }>

                            <span
                                className=" fake-link "
                                onClick={ (event => {
                                    event.stopPropagation();
                                    if ( event.ctrlKey || event.metaKey ) {
                                        window.open( peptideLink, "_blank", "noopener" )
                                    } else {
                                        window.location.href = peptideLink
                                    }
                                })}
                            >
                                [Peptides]
                            </span>
                            <span>&nbsp;</span>

                            <span
                                className=" fake-link "
                                onClick={ (event => {
                                    event.stopPropagation();
                                    if ( event.ctrlKey || event.metaKey ) {
                                        window.open( proteinLink, "_blank", "noopener" )
                                    } else {
                                        window.location.href = proteinLink
                                    }
                                })}
                            >
                                [Proteins]
                            </span>

                            {/*
                            <span>&nbsp;</span>

                            <span
                                className=" fake-link "
                                onClick={ (event => {
                                    event.stopPropagation();
                                    if ( event.ctrlKey || event.metaKey ) {
                                        window.open( modViewLink, "_blank", "noopener" )
                                    } else {
                                        window.location.href = modViewLink
                                    }
                                })}
                            >
                                [Modifications]
                            </span>
                            */}

                            { deleteIcon }

                        </div>
                        <span className={ name_className } onClick={ name_onClick } title={ name_title }>
                            { this.props.experiment.name }
                        </span>
                        { editIcon }
                        { cloneIcon }
                    </div>
                    { experimentDetailsComponentContainer }
                    <div style={ { marginTop: 7, marginBottom: 8 } } className="searches-block-item-bottom-border"></div>
                </div>
            </React.Fragment>
        );
    }

}

///////////////////////////////////////////////////

////////////////////////////

//  Functions NOT in a class

const _getFromServer_ProjectContainsAtLeastOneActiveSearch_MakeAJAXCall = ({ projectIdentifierFromURL }:{ projectIdentifierFromURL: any }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                projectIdentifier : projectIdentifierFromURL
            };
            
            const url = "d/rws/for-page/project-has-at-least-one-active-search";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
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
const _loadExperimentDrafts = ({ projectIdentifierFromURL }: { projectIdentifierFromURL: any }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                projectIdentifier : projectIdentifierFromURL
            };
            
            const url = "d/rws/for-page/experiment/experiment-list-drafts";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
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
const _loadExperiments_NonDrafts = ({ projectIdentifierFromURL }: { projectIdentifierFromURL: any }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                projectIdentifier : projectIdentifierFromURL
            };
            
            const url = "d/rws/for-page/experiment/experiment-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
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
const _deleteExperiment = ({ id }:{ id: any }) => {

    return new Promise( (resolve, reject) => {
        try {
            const requestObj = {
                id : id
            };
            
            const url = "d/rws/for-page/experiment/experiment-delete";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason: any) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData: any }) => {
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




