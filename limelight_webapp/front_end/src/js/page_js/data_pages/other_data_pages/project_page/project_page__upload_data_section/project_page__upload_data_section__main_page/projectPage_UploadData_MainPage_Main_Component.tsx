/**
 * projectPage_UploadData_MainPage_Main_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Upload Data Section
 *
 * Main Component
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_i_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


const ProjectPage_UploadData_MainPage__TopLevelLabel_Component_Expanded_Default = false;


//////////////////////

//   Store Mounted component reference so can call Refresh by calling this function -- Assumes only 1 instance of this class will be mounted at any given time

let _mountedComponent: ProjectPage_UploadData_MainPage_Main_Component

/**
 *
 */
export const refresh_ProjectPage_UploadData_MainPage_Main_Component = function() {

    if ( _mountedComponent ) {
        _mountedComponent.load_Data_AndDisplay()
    }
}




////////////////////

export class ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback_Params {

    pendingCount: number
}

export type ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback =
    (params: ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback_Params) => void

//////////

export class ProjectPage_UploadData_MainPage_Main_Component_Props_Prop {

    projectIdentifier : string
}

/**
 *
 */
export interface ProjectPage_UploadData_MainPage_Main_Component_Props {

    propsValue : ProjectPage_UploadData_MainPage_Main_Component_Props_Prop
}

/**
 *
 */
interface ProjectPage_UploadData_MainPage_Main_Component_State {

    limelightXMLFileImport_Is_FullyConfigured?: boolean
    pendingCount?: number

    bodyEverShown?: boolean
    expandBody?: boolean

    refreshData_Force? : object
}

/**
 *
 */
export class ProjectPage_UploadData_MainPage_Main_Component extends React.Component< ProjectPage_UploadData_MainPage_Main_Component_Props, ProjectPage_UploadData_MainPage_Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _set_pendingCount_Callback_BindThis = this._set_pendingCount_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const _set_pendingCount_Callback : ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback = this._set_pendingCount_Callback
    }

    private _componentMounted: boolean

    /**
     *
     */
    constructor(props : ProjectPage_UploadData_MainPage_Main_Component_Props) {
        super(props);

        this.state = {
            limelightXMLFileImport_Is_FullyConfigured: false,
            refreshData_Force: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            _mountedComponent = this;

            this._componentMounted = true;
            this._load_InitialData_AndDisplay()

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
    componentWillUnmount() {

        this._componentMounted = false;

        _mountedComponent = null
    }

    /**
     * Initial Data on Component Mount - Pending Count at top level
     */
    private _load_InitialData_AndDisplay() {

        this.load_Data_AndDisplay()
    }

    /**
     * Data - Pending Count at top level
     *
     * called from function refresh_ProjectPage_UploadData_MainPage_Main_Component above
     */
    load_Data_AndDisplay() {

        const promise = _getPendingCount_FromServer(this.props.propsValue.projectIdentifier)
        promise.catch(reason => { })
        promise.then(promise_value => {
            try {
                this.setState({
                    limelightXMLFileImport_Is_FullyConfigured: promise_value.limelightXMLFileImport_Is_FullyConfigured,
                    pendingCount: promise_value.pendingCount
                })

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        })
    }


    ////////////////////////////////////////

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {

        this.setState({ bodyEverShown: true, expandBody: true });
    }

    /**
     *
     */
    private _collapsed_Chosen_Callback() : void {

        this.setState({ expandBody: false });
    }


    private _set_pendingCount_Callback(params: ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback_Params) : void {
        this.setState({ pendingCount: params.pendingCount });
    }

    /**
     *
     */
    render() {

        if ( ! this.state.limelightXMLFileImport_Is_FullyConfigured ) {

            return null
        }

        return (

            <div className="top-level-container share-data-root ">

                <ProjectPage_UploadData_MainPage__TopLevelLabel_Component
                    pendingCount={ this.state.pendingCount }
                    expanded_Chosen_Callback={ this._expanded_Chosen_Callback_BindThis }
                    collapsed_Chosen_Callback={ this._collapsed_Chosen_Callback_BindThis }
                />

                <div
                    style={ ( this.state.expandBody ? { display: "" } : { display: "none" } ) }
                >
                    { (this.state.bodyEverShown) ? (
                        //  Show the Body Contents so call this method
                        this. _get_ExpandedBodyContents()
                    ) : null }
                </div>

            </div>
        )
    }

    /**
     *
     */
    private _get_ExpandedBodyContents() : JSX.Element {

        return (
            <div>

                <div className="upload-search-block " >

                    <ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component
                        projectIdentifier={ this.props.propsValue.projectIdentifier }
                        refreshData_Force={ this.state.refreshData_Force }
                        setPendingCount_Callback={ this._set_pendingCount_Callback_BindThis }
                    />

                </div>
            </div>
        )
    }

}


/////////////


/**
 *
 */
export interface ProjectPage_UploadData_MainPage__TopLevelLabel_Component_Props {

    pendingCount: number

    expanded_Chosen_Callback: () => void
    collapsed_Chosen_Callback: () => void
}

/**
 *
 */
interface ProjectPage_UploadData_MainPage__TopLevelLabel_Component_State {

    expanded?: boolean
}

/**
 *
 */
export class ProjectPage_UploadData_MainPage__TopLevelLabel_Component extends React.Component< ProjectPage_UploadData_MainPage__TopLevelLabel_Component_Props, ProjectPage_UploadData_MainPage__TopLevelLabel_Component_State > {

    private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_MainPage__TopLevelLabel_Component_Props) {
        super(props)

        this.state = {

            expanded: ProjectPage_UploadData_MainPage__TopLevelLabel_Component_Expanded_Default
        }
    }

    /**
     *
     */
    private _expanded_Chosen_Callback() : void {
        try {
            this.setState({ expanded: true });

            window.setTimeout( () => {
                try {
                    this.props.expanded_Chosen_Callback();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            }, 50 );
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
    private _collapsed_Chosen_Callback() : void {
        try {
            this.setState({ expanded: false });

            window.setTimeout( () => {
                try {
                    this.props.collapsed_Chosen_Callback();

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            }, 50 );
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

        return (
            <React.Fragment>

                <div className="collapsable-link-container top-level-collapsable-link-container ">
                    { ( this.state.expanded ) ? (
                        <img src="static/images/pointer-down.png"
                             className=" icon-large fake-link-image "
                             onClick={ this._collapsed_Chosen_Callback_BindThis }
                        />
                    ) : (
                        <img src="static/images/pointer-right.png"
                             className=" icon-large fake-link-image  "
                             onClick={ this._expanded_Chosen_Callback_BindThis }
                        />
                    )}
                </div>

                <div className="top-level-label share-data-top-level-label-block">

                    <div style={ { whiteSpace: "nowrap" } } >

                        {/*  Top Level Label  */}
                        <span>
                            Upload Data
                        </span>

                        {/*  Text to right of Label

                            only show pending count if has value
                         */}

                        { ( this.props.pendingCount !== undefined && this.props.pendingCount !== null ) ? (
                            <span style={ { whiteSpace: "nowrap" } } className="  ">
                                <span> (Pending </span>
                                <span>{ this.props.pendingCount }</span>
                                <span>)</span>
                            </span>
                        ) : null }

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Upload search results to this project and view upload history.
                                </span>
                            }
                        />
                    </div>
                </div>

                <div className="top-level-label-bottom-border"></div>

            </React.Fragment>
        )
    }

}

/////

///   Functions NOT in any class

/**
 * 	get Pending Count
 *
 * @param projectIdentifierFromURL
 */
const _getPendingCount_FromServer = function(projectIdentifierFromURL: string) {

    return new Promise<{
        limelightXMLFileImport_Is_FullyConfigured: boolean
        pendingCount: number
    }>((resolve, reject) => { try {

        const requestData = {
            projectIdentifier : projectIdentifierFromURL
        }

        const url = "d/rws/for-page/project-upload-data-pending-count";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => {  reject(reason)}  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                if ( ! variable_is_type_number_Check( responseData.pendingCount ) ) {
                    const msg = "( ! variable_is_type_number_Check( responseData.pendingCount ) )"
                    console.warn(msg)
                    throw Error(msg)
                }

                resolve({
                    limelightXMLFileImport_Is_FullyConfigured: responseData.limelightXMLFileImport_Is_FullyConfigured,
                    pendingCount: responseData.pendingCount
                } )

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
    }})
}
