/**
 * projPg_Expermnts_Single_MainCell_ChangeSearches_Overlay.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches are in experiment condition cell
 *
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_Single_MainCellMaint";

import {
    SearchSelection_DisplayedNestedInFolders_Component,
    SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params
} from "page_js/data_pages/search_selection__displayed_nested_in_folders__React_Component/searchSelection_DisplayedNestedInFolders_Component";
import {CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root} from "page_js/data_pages/common_data_loaded_from_server__for_project__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders";

/////

const _Overlay_Title = "Select Searches"

const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params {
    updated_selected_ProjectSearchIds : Set<number>
}

/**
 *
 */
export const get_ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Layout = function(
    {
        searchesSearchTagsFolders_Result_Root,
        projectSearchIds_Selected,
        //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
        projectSearchIds_ContainedInAllOtherCells,
        current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        projectSearchIds_Selected : Set<number>
        //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
        projectSearchIds_ContainedInAllOtherCells : Set<number>
        current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void

    }) : JSX.Element {

    return (
        <ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component
            searchesSearchTagsFolders_Result_Root={ searchesSearchTagsFolders_Result_Root }
            projectSearchIds_Selected={ projectSearchIds_Selected }
            projectSearchIds_ContainedInAllOtherExperimentCells={ projectSearchIds_ContainedInAllOtherCells }
            current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint={ current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_updateSelected_Searches={ callback_updateSelected_Searches }
        />
    )
}


////  React Components

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props {

    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    projectSearchIds_Selected : Set<number>
    //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherExperimentCells : Set<number>

    current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint

    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void
}

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component extends React.Component< ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props, ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    private _callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis = this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches.bind(this);

    private _DONOTCALL() {

        const callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches: SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback =
            this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches
    }

    private _selected_Searches_Data_Object__Latest: SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object

    private _updateButton_Disabled: boolean = false


    /**
     *
     */
    constructor(props: ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this.state = {
            force_Rerender: {}
        };
    }

    /**
     *
     */
    private _callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches( params : SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params ) {

        this._selected_Searches_Data_Object__Latest = params.selected_Searches_Data_Object

        let updateButton_Disabled = false;

        if ( ! this._selected_Searches_Data_Object__Latest.is_ANY_Search_Selected() ) {
            updateButton_Disabled = true;
        }

        this._updateButton_Disabled = updateButton_Disabled

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        if ( this._updateButton_Disabled ) {
            //  supposed to be disabled
            return; // EARLY RETURN
        }

        let updated_selected_ProjectSearchIds : Set<number>

        if ( this._selected_Searches_Data_Object__Latest ) {
            //  Have changes
            updated_selected_ProjectSearchIds = new Set(this._selected_Searches_Data_Object__Latest.get_ProjectSearchIds_Selected_IterableIterator());
        } else {
            updated_selected_ProjectSearchIds = new Set( this.props.projectSearchIds_Selected );
        }

        this.props.callback_updateSelected_Searches({
            updated_selected_ProjectSearchIds
        })
    }

    /**
     *
     */
    render(): React.ReactNode {

        const conditionGroupName_ConditionName_Entries : Array<JSX.Element> = [];
        {
            const cell_ConditionIds_Set = this.props.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.mainCell_Identifier.cell_ConditionIds_Set
            for ( const conditionGroup of this.props.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsContainer.conditionGroups ) {

                for (const condition of conditionGroup.conditions) {

                    if (cell_ConditionIds_Set.has(condition.id)) {

                        if (conditionGroupName_ConditionName_Entries.length > 0) {

                            const commaSeparator = (
                                <span key={condition.id + "-comma"}>, </span>
                            );
                            conditionGroupName_ConditionName_Entries.push(commaSeparator);
                        }

                        const conditionGroupName_ConditionName = (
                            <span key={condition.id} style={{whiteSpace: "nowrap"}}>
                                {conditionGroup.label}: {condition.label}
                            </span>
                        );
                        conditionGroupName_ConditionName_Entries.push(conditionGroupName_ConditionName);
                    }
                }
            }
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { marginBottom: 12, fontWeight: "bold" } }
                     // style={ { padding : 6 } }
                >

                    <span>Choosing Searches for: </span>
                    {
                        conditionGroupName_ConditionName_Entries
                    }
                </div>

                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                >
                    <SearchSelection_DisplayedNestedInFolders_Component
                        searchesSearchTagsFolders_Result_Root={ this.props.searchesSearchTagsFolders_Result_Root }
                        projectIdentifier={ null }  /// Not required since pass in searchesSearchTagsFolders_Result_Root

                        projectSearchIds_Previously_Selected={ Array.from( this.props.projectSearchIds_Selected ) }
                        projectSearchIds_ContainedInAllOtherExperimentCells={ this.props.projectSearchIds_ContainedInAllOtherExperimentCells }
                        callbackOn_Cancel_Close_Clicked={ this.props.callbackOn_Cancel_Close_Clicked }
                        callback_updateSelected_Searches={ this._callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis }
                    />

                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input
                            type="button" value={ ( this.props.projectSearchIds_Selected.size < 1 ) ? "Add" : "Change" }
                            style={ { marginRight: 5 } }
                            onClick={ this._updateButtonClicked_BindThis }
                        />

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
