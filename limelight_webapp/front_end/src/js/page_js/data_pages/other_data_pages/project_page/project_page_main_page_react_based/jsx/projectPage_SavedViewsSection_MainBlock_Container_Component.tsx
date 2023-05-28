/**
 * projectPage_SavedViewsSection_MainBlock_Container_Component.tsx
 *
 * Project Page - "Highlighted Results" section - Main Block Component
 *
 *
 */

import React from "react";
import { DataPages_LoggedInUser_CommonObjectsFactory } from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from "page_js/data_pages/other_data_pages/project_page/projectPage_SavedViews_Section_LoggedInUsersInteraction";
import {
    ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component";
import { values } from "d3";


/**
 *
 */
export interface ProjectPage_SearchesSection_MainBlock_Component_Props {
    force_ReloadFromServer_Object : object
    projectIdentifier : string
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
}

/**
 *
 */
interface ProjectPage_SearchesSection_MainBlock_Component_State {

    show_LoadingMessage_InitialLoad?: boolean
    show_UpdatingMessage?: boolean

    showNoDataMessage?: boolean

    savedViewData?: Internal_WebserviceResponse_Root  ///  WARNING:  Changed below when user changes a label.

    force_Rerender?: object
}

/**
 *
 */
export class ProjectPage_SavedViewsSection_MainBlock_Component extends React.Component< ProjectPage_SearchesSection_MainBlock_Component_Props, ProjectPage_SearchesSection_MainBlock_Component_State > {

    private _deleteEntry_Callback_BindThis = this._deleteEntry_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor( props: ProjectPage_SearchesSection_MainBlock_Component_Props ) {
        super( props )

        this.state = {
            show_LoadingMessage_InitialLoad: true,
            show_UpdatingMessage: false,
            force_Rerender: {}
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._loadData_FromServer()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( {
                errorException: e
            } );
            throw e;
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ProjectPage_SearchesSection_MainBlock_Component_Props>, prevState: Readonly<ProjectPage_SearchesSection_MainBlock_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.force_ReloadFromServer_Object !== this.props.force_ReloadFromServer_Object ) {
                //  Reload Data
                this._loadData_FromServer();
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( {
                errorException: e
            } );
            throw e;
        }
    }


    /**
     *
     */
    private _loadData_FromServer() {


        let requestObj = {
            projectIdentifier : this.props.projectIdentifier
        };

        const url = "d/rws/for-page/project-view-page-saved-views-list";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                const responseData_Cast = responseData as Internal_WebserviceResponse_Root

                const savedViewList = responseData_Cast.savedViewList

                if ( (!savedViewList) || savedViewList.length === 0 ) {
                    //  No savedViewList for identifier

                    this.setState({ showNoDataMessage: true, show_LoadingMessage_InitialLoad: false, show_UpdatingMessage: false })

                    return // EARLY RETURN
                }

                for ( const savedViewItem of savedViewList ) {

                    if ( !this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction ) {
                        // Force to false since no object to call when user click on item
                        savedViewItem.canEdit = false;
                        savedViewItem.canDelete = false;
                    }
                }

                this.setState({ savedViewData: responseData_Cast, showNoDataMessage: false, show_LoadingMessage_InitialLoad: false, show_UpdatingMessage: false })

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
    private _deleteEntry_Callback(id: number) : void {

        this.setState((prevState, props) => {
            const savedViewData = prevState.savedViewData;
            savedViewData.savedViewList = savedViewData.savedViewList.filter( value => {
                if ( value.id === id ) {
                    return false // Remove
                }
                return  true  // keep
            })
            return { savedViewData, force_Rerender: {} }
        })
    }

    /**
     *
     */
    render() {
        return (
            <div style={ { marginBottom: 10 } }>
                { this.state.show_LoadingMessage_InitialLoad || this.state.show_UpdatingMessage ? (
                    <div>
                        LOADING
                    </div>
                ) : this.state.showNoDataMessage ? (
                    <div>
                        No Highlighted Results
                    </div>
                ) : this.state.savedViewData ? (
                    this.state.savedViewData.savedViewList.map( (savedViewItem, index, array) => {
                        return (
                            <Internal__Single_SavedViewEntry_Component
                                key={ savedViewItem.id }
                                savedViewItem={ savedViewItem }
                                projectPage_SavedViews_Section_LoggedInUsersInteraction={ this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction }
                                deleteEntry_Callback={ this._deleteEntry_Callback_BindThis }
                            />
                        )
                    })

                ) : null }
            </div>
        );
    }

}

/**
 *
 */
interface Internal__Single_SavedViewEntry_Component_Props {
    savedViewItem: Internal_WebserviceResponse_Entry
    projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction
    deleteEntry_Callback: (id: number) => void
}

/**
 *
 */
interface Internal__Single_SavedViewEntry_Component_State {

    force_ReRender?: object
}

/**
 *
 */
export class Internal__Single_SavedViewEntry_Component extends React.Component< Internal__Single_SavedViewEntry_Component_Props, Internal__Single_SavedViewEntry_Component_State > {

    private _clickOnLabel_Handler_BindThis = this._clickOnLabel_Handler.bind(this)
    private _clickOn_EditLabelIcon_BindThis = this._clickOn_EditLabelIcon.bind(this)
    private _clickOn_DeleteLabelIcon_BindThis = this._clickOn_DeleteLabelIcon.bind(this)

    private _label_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()


    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    /**
     *
     */
    constructor( props: Internal__Single_SavedViewEntry_Component_Props ) {
        super( props )

        this._label_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = { force_ReRender: {} }
    }

    /**
     *
     */
    private _clickOnLabel_Handler( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.preventDefault(); // to stop the
            event.stopPropagation();

            if ( event.ctrlKey || event.metaKey ) {

                window.open(this.props.savedViewItem.url, "_blank", "noopener");
            } else {
                window.location.href = this.props.savedViewItem.url
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( {
                errorException: e
            } );
            throw e;
        }
    }

    /**
     *
     */
    private _clickOn_EditLabelIcon( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            if ( this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction ) {

                const labelContainer_BoundingRect = this._label_Div_Ref.current.getBoundingClientRect();

                let position_top =  labelContainer_BoundingRect.top;
                let position_left =  labelContainer_BoundingRect.left;

                this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction.openChangeLabel({
                    id: this.props.savedViewItem.id,
                    existingLabel: this.props.savedViewItem.label,
                    position_top,
                    position_left,
                    change_Callback: (params: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback_Params) : void => {

                        this.props.savedViewItem.label = params.newLabelValue;  // Not optimal but will get it displayed

                        this.setState({ force_ReRender: {} })
                    },
                    cancel_Callback: () : void => { }
                })
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( {
                errorException: e
            } );
            throw e;
        }
    }

    /**
     *
     */
    private _clickOn_DeleteLabelIcon( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            if ( this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction ) {

                if ( ! window.confirm("Delete Highlighted Result?") ) {
                    return;  // EARLY EXIT
                }

                const promise =
                    this.props.projectPage_SavedViews_Section_LoggedInUsersInteraction.deleteSavedView_OnServer({
                        id: this.props.savedViewItem.id
                    })

                promise.catch(reason => {
                    try {
                        throw Error("Rejected request")
                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( {
                            errorException: e
                        } );
                        throw e;
                    }
                })

                promise.then(response => {
                    try {

                        this.props.deleteEntry_Callback( this.props.savedViewItem.id )

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( {
                            errorException: e
                        } );
                        throw e;
                    }
                })
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( {
                errorException: e
            } );
            throw e;
        }
    }

    /**
     *
     */
    render() {
        return (
            <div
                ref={ this._label_Div_Ref }
                style={ { marginBottom: 5 } }
            >
                <span
                    className=" fake-link "
                    onClick={ this._clickOnLabel_Handler_BindThis }
                >
                    { this.props.savedViewItem.label }
                </span>

                { this.props.savedViewItem.canEdit ? (
                    <>
                        <span> </span>
                        <img
                            className="icon-small clickable"
                            src="static/images/icon-edit.png"
                            title="Edit name of Highlighted Result"
                            onClick={ this._clickOn_EditLabelIcon_BindThis }
                        />
                    </>
                ) : null }

                { this.props.savedViewItem.canDelete ? (
                    <>
                        <span> </span>
                        <img
                            className="icon-small clickable"
                            src="static/images/icon-circle-delete.png"
                            title="Delete Highlighted Result"
                            onClick={ this._clickOn_DeleteLabelIcon_BindThis }
                        />
                    </>
                ) : null }

            </div>

        )
    }

}

class Internal_WebserviceResponse_Root {

    savedViewList: Array<Internal_WebserviceResponse_Entry>
}

class Internal_WebserviceResponse_Entry {

    id: number
    label: string;
    url:  string;
    defaultView: boolean;
    canEdit: boolean;
    canDelete: boolean;
}