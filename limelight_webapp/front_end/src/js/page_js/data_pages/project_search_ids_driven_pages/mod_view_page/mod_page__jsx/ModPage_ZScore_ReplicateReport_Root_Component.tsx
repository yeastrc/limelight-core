/**
 * ModPage_ZScore_ReplicateReport_Root_Component
 *
 * ZScore Replicate Report
 * 
 * Split searches into 2 groups and calculate ZScore between the two groups - Root Component
 */


import React from "react";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModPage_ZScore_ReplicateReport_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_ZScore_ReplicateReport_DataTable_Component";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    ModPage_Groups_For_Searches_Or_SubSearches_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_Groups_For_Searches_Or_SubSearches_Component";
import {
    modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__search_groups_sub_search_groups_init/modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager";

/**
 *
 */
interface ModPage_ZScore_ReplicateReport_Root_Component_Props {

    force_RecomputeTableData_Object: object

    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
}

/**
 *
 */
interface ModPage_ZScore_ReplicateReport_Root_Component_State {

    forceReRender_Object?: unknown
}

/**
 *
 */
export class ModPage_ZScore_ReplicateReport_Root_Component extends React.Component< ModPage_ZScore_ReplicateReport_Root_Component_Props, ModPage_ZScore_ReplicateReport_Root_Component_State > {

    private _zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler_BindThis = this._zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler.bind(this)

    private _display_NO_Searches_Message = false

    private _display_OnlyOneSearch_Message = false


    /**
     *
     */
    constructor( props: ModPage_ZScore_ReplicateReport_Root_Component_Props ) { try {
        super( props );

        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 0 ) {

            this._display_NO_Searches_Message = true

        } else if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 1 ) {

            const searchSubGroups_Root= this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

            if ( searchSubGroups_Root ) {

                const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

                const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()
                if ( searchSubGroups_Array.length === 1 ) {

                    this._display_OnlyOneSearch_Message = true
                }
            } else {

                this._display_OnlyOneSearch_Message = true
            }
        }

        if ( ( ! this._display_NO_Searches_Message ) && ( ! this._display_OnlyOneSearch_Message ) ) {

            modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager({
                projectSearchIds_AllForPage: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
            })
        }

        this.state = { forceReRender_Object: {} };

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate( prevProps: Readonly<ModPage_ZScore_ReplicateReport_Root_Component_Props>, prevState: Readonly<ModPage_ZScore_ReplicateReport_Root_Component_State>, snapshot?: any ) { try {


        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 0 ) {

            this._display_NO_Searches_Message = true

        } else if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 1 ) {

            const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

            if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                this._display_NO_Searches_Message = false

                if ( ! this._display_OnlyOneSearch_Message ) {
                    this._display_OnlyOneSearch_Message = true

                    this.setState( { forceReRender_Object: {} } )
                }
            }

        } else {

            this._display_NO_Searches_Message = false
            this._display_OnlyOneSearch_Message = false

            let projectSearchIds_Changed = false

            if ( prevProps.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length !== this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length ) {
                projectSearchIds_Changed = true
            } else {
                for ( let index = 0; index < prevProps.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length; index++ ) {
                    if ( prevProps.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ index ] !== this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ index ] ) {
                        projectSearchIds_Changed = true
                        break
                    }
                }
            }

            if ( projectSearchIds_Changed ) {

                //  projectSearchIds in 'props' changed so override current projectSearchIds with new computed from 'props'

                //  NOT allowed to change so throw Error

                const msg = "projectSearchIds_AllForPage NOT ALLOWED TO CHANGE: ( projectSearchIds_Changed )"
                console.warn(msg)
                throw Error(msg)

                //  The following code is WRONG.  NEEDS to change if need to handle change to this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage

                // const projectSearchIdsLength_Half_Ceil = Math.ceil( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length / 2 )
                //
                // this._group_1_ProjectSearchIds = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.slice( 0, projectSearchIdsLength_Half_Ceil )
                // this._group_2_ProjectSearchIds = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.slice( projectSearchIdsLength_Half_Ceil, this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length )
                //
                // this.setState( { forceReRender_Object: {} } )
            }
        }
    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler( event: React.ChangeEvent<HTMLInputElement> ){ try {

        this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData( event.target.checked )

        this.setState({ forceReRender_Object: {} })

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }


    /**
     *
     */
    render() { try {

        const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

        const group_1_ProjectSearchIds_OR_SubSearchIds: Array<number> = []
        const group_2_ProjectSearchIds_OR_SubSearchIds: Array<number> = []

        if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_Root= this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()


            for ( const searchSubGroup of searchSubGroups_Array ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                group_1_ProjectSearchIds_OR_SubSearchIds.push( searchSubGroup.searchSubGroup_Id )
            }

            for ( const searchSubGroup of searchSubGroups_Array ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                group_2_ProjectSearchIds_OR_SubSearchIds.push( searchSubGroup.searchSubGroup_Id )
            }

        } else if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS ) {

            for ( const projectSearchId of this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                group_1_ProjectSearchIds_OR_SubSearchIds.push( projectSearchId )
            }

            for ( const projectSearchId of this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                group_2_ProjectSearchIds_OR_SubSearchIds.push( projectSearchId )
            }

        } else {
            const msg = "searchGroups.projectSearchIds_Or_SubSearchIds_Enum is NOT SUB_SEARCH_IDS or PROJECT_SEARCH_IDS. is: " + searchGroups.projectSearchIds_Or_SubSearchIds_Enum
            console.warn(msg)
            throw Error(msg)
        }

        return (
            <div>
                <div>
                    <div style={ { marginTop: 15, marginBottom: 5 } }>
                        <span style={ { fontSize: 18 } }>ZScore Data Report</span>
                    </div>

                    <ModPage_Groups_For_Searches_Or_SubSearches_Component
                        force_RecomputeSearchList_Object={ this.state.forceReRender_Object }

                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root }
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                        modPage_updateSelected_Searches_Callback_Function={ () => {
                            this.setState({ forceReRender_Object: {} })
                        } }
                    />

                </div>

                <div style={ { marginTop: 10 } }>
                    <label>
                        <input
                            type="checkbox"
                            checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() }
                            onChange={ this._zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler_BindThis }
                        />
                        <span> </span>
                        <span>
                            Use filtered PSMs to calculate Z-Score
                        </span>
                    </label>
                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                If checked, the denominator when computing ratios for the Z-score calculation will be
                                the total number of PSMs after secondary filtering
                                (e.g., retention time range or min/max mod mass range).
                                Otherwise, uses total number of PSMs after primary filter (e.g. PSM q-value)
                            </span>
                        }
                    />
                </div>

                <div style={ { marginTop: 15 } }>

                    <ModPage_ZScore_ReplicateReport_DataTable_Component

                        forceUpdate_Object={ this.state.forceReRender_Object }

                        projectSearchIds_AllForPage={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage }
                        group_1_ProjectSearchIds_OR_SubSearchIds={ group_1_ProjectSearchIds_OR_SubSearchIds }
                        group_2_ProjectSearchIds_OR_SubSearchIds={ group_2_ProjectSearchIds_OR_SubSearchIds }

                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root }
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function={ this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function }
                    />
                </div>
            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }
}

