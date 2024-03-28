/**
 * common_Search_Selection_For_ProjectScanFileId_OverlayLayout.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches to display
 *
 *
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    SearchSelection_DisplayedNestedInFolders_Component,
    SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params
} from "page_js/data_pages/search_selection__displayed_nested_in_folders__React_Component/searchSelection_DisplayedNestedInFolders_Component";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/////

const _Overlay_Title = "Choose the search to display"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params {
    updated_selected_ProjectSearchIds__Object: SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object //  undefined or null if NO changes since NO User interaction
}

export type Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches =
    ( params : Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void

/**
 *
 */
export const open_Common_Search_Selection_For_ProjectScanFileId_Overlay = function(
    {
        projectScanFileId,
        projectSearchIds_Previously_Selected,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        projectScanFileId : number
        projectSearchIds_Previously_Selected : Array<number>  //  Existing selection.  Array to preserve the existing selection order
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    //  Local Callback Functions

    let local_callback_updateSelected_Searches = ( params: Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => {
        try {
            limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF.removeContents_AndContainer_FromDOM()

            if ( callback_updateSelected_Searches ) {
                callback_updateSelected_Searches(params)
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    let local_callbackOn_Cancel_Close_Clicked = () => {
        try {
            limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF.removeContents_AndContainer_FromDOM()

            if ( callbackOn_Cancel_Close_Clicked ) {
                callbackOn_Cancel_Close_Clicked()
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    //  Create Overlay and add to DOM

    const overlayComponent =  (
        <Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component
            projectScanFileId={ projectScanFileId }
            projectSearchIds_Previously_Selected={ projectSearchIds_Previously_Selected }
            callbackOn_Cancel_Close_Clicked={ local_callbackOn_Cancel_Close_Clicked }
            callback_updateSelected_Searches={ local_callback_updateSelected_Searches }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}


////  React Components



/**
 *
 */
interface Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component_Props {
    projectScanFileId : number
    projectSearchIds_Previously_Selected : Array<number>  //  Existing selection.  Array to preserve the existing selection order
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches
}

/**
 *
 */
interface Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component extends React.Component< Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component_Props, Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component_State > {

    private _callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis = this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches.bind(this);

    private _DONOTCALL() {

        const callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches: SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback =
            this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches
    }

    private _commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    private _show_LoadingMessage = true

    private _show_UpdatingMessage = false

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component_Props) {
        super(props);

        this.state = {
            force_Rerender: {}
        };
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    /**
     *
     */
    componentDidMount() { try {

        this._onMount_GetData()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private async _onMount_GetData() {
        try {
            const get_ProjectSearchIds_DataHolder_For_ProjectScanFileId_ReturnPromise_Result =
                await CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT.getNewInstance().
                get_commonData_LoadedFromServer__ProjectSearchIds_Data_For_Single_ProjectScanFileId_MainClass().
                get_ProjectSearchIds_DataHolder_For_ProjectScanFileId_ReturnPromise(this.props.projectScanFileId)

            const projectSearchIds_Data_For_ProjectScanFileId =
                get_ProjectSearchIds_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.commonData_LoadedFromServer__ProjectSearchIds_Data_Holder.get_ProjectSearchIds_Data_For_ProjectScanFileId(this.props.projectScanFileId)

            if ( ! projectSearchIds_Data_For_ProjectScanFileId ) {
                const msg = "get_ProjectSearchIds_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.commonData_LoadedFromServer__ProjectSearchIds_Data_Holder.get_ProjectSearchIds_Data_For_ProjectScanFileId(this.props.projectScanFileId) returned NOTHING for this.props.projectScanFileId: " + this.props.projectScanFileId
                console.warn(msg)
                throw Error(msg)
            }



            // const projectIdentifier = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM()

            const getSearchesSearchTagsAndFolders_SingleProject_Result =
                await getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier: undefined, projectSearchIds: projectSearchIds_Data_For_ProjectScanFileId.projectSearchIds })

            this._commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root = getSearchesSearchTagsAndFolders_SingleProject_Result

            this._show_LoadingMessage = false

            this.setState({ force_Rerender: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches( params : SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params ) {

        this._show_UpdatingMessage = true

        this.setState({ force_Rerender: {} })

        window.setTimeout( () => { try {

            this.props.callback_updateSelected_Searches({
                updated_selected_ProjectSearchIds__Object: params.selected_Searches_Data_Object
            })
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
        }, 20 )

    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >
                    { this._show_LoadingMessage ? (

                        <div>

                            <div
                                style={ { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 } }
                            >
                                LOADING DATA
                            </div>

                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                                <Spinner_Limelight_Component/>
                            </div>

                        </div>

                    ) : this._show_UpdatingMessage ? (

                        <div>

                            <div
                                style={ { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 } }
                            >
                                Updating
                            </div>

                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                                <Spinner_Limelight_Component/>
                            </div>

                        </div>

                    ) : (
                        <SearchSelection_DisplayedNestedInFolders_Component

                            select_ONLY_ONE_Search={ true }

                            hide_SearchFilters={ true }
                            hide_SearchTag_VerboseView_Checkbox={ true }

                            defaultView_ExpandFoldersOnInitialView={ true }

                            projectIdentifier={ null }
                            searchesSearchTagsFolders_Result_Root={ this._commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root }
                            projectSearchIds_Previously_Selected={ this.props.projectSearchIds_Previously_Selected }
                            projectSearchIds_ContainedInAllOtherExperimentCells={ null }  // Only for Experiment Definition
                            callback_updateSelected_Searches={ this._callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis }
                        />
                    ) }
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
