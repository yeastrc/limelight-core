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
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import {
    open_ModPage_ZScore_SearchSelection_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_ZScore_SearchSelection_Overlay";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    open_ModPage_ZScore_SubSearchSelection_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_ZScore_SubSearchSelection_Overlay";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";

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

    private _change_Searches_InGroups_BindThis = this._change_Searches_InGroups.bind(this)
    private _change_SubSearches_InGroups_BindThis = this._change_SubSearches_InGroups.bind(this)
    private _zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler_BindThis = this._zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData_Checkbox_Changed_Handler.bind(this)

    private _display_NO_Searches_Message = false

    private _display_OnlyOneSearch_Message = false
    private _display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = false


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

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 1 ) {

                //  Single Search with Sub Groups so putting the sub groups into ZScore Groups

                const searchSubGroups_Root= this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

                if ( ! searchSubGroups_Root ) {
                    const msg = "IN 'if ( ( ! this._display_NO_Searches_Message ) && ( ! this._display_OnlyOneSearch_Message ) ) {' AND 'if ( ! searchSubGroups_Root ) {'"
                    console.warn(msg)
                    throw Error(msg)
                }

                const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

                if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
                    searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
                    searchGroups.searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

                    //  NO Sub Searches set so compute from searches

                    const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

                    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
                    if ( ! searchSubGroups_ForProjectSearchId ) {
                        throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                    }

                    const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()

                    const searchSubGroups_ArrayLength_Half_Ceil = Math.ceil( searchSubGroups_Array.length / 2 )

                    const group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()
                    const group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()

                    for ( const searchSubGroup of searchSubGroups_Array.slice( 0, searchSubGroups_ArrayLength_Half_Ceil ) ) {
                        group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.add( searchSubGroup.searchSubGroup_Id )
                    }
                    for ( const searchSubGroup of searchSubGroups_Array.slice( searchSubGroups_ArrayLength_Half_Ceil, searchSubGroups_Array.length ) ) {
                        group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.add( searchSubGroup.searchSubGroup_Id )
                    }

                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().set_SearchGroups({
                        group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                        group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                        searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: new Set(),
                        projectSearchId_FOR_SubSearchIds: projectSearchId,
                        projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS
                    })
                } else {
                    if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ||
                        searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

                        //  Display message that user needs to change searches in groups so at least one search is in each group

                        this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = true
                    }
                }

            } else {

                const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

                if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
                    searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 &&
                    searchGroups.searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

                    //  NO searches set so compute from searches

                    const projectSearchIdsLength_Half_Ceil = Math.ceil( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length / 2 )

                    const group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.slice( 0, projectSearchIdsLength_Half_Ceil ) )
                    const group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.slice( projectSearchIdsLength_Half_Ceil, this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length ) )

                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().set_SearchGroups({
                        group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                        group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
                        searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: new Set(),
                        projectSearchId_FOR_SubSearchIds: undefined,
                        projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS
                    })
                } else {
                    if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ||
                        searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

                        //  Display message that user needs to change searches in groups so at least one search is in each group

                        this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = true
                    }
                }
            }
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

            const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

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
    private _change_Searches_InGroups( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        const callback_updateSelected_Searches = () => {

            this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = false  // Set false since only way to save from overlay is all groups have at least 1 search

            this.setState({ forceReRender_Object: {} })
        }

        open_ModPage_ZScore_SearchSelection_Overlay({
            projectSearchIds_All : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager_DataFrom_Server : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,
            callback_updateSelected_Searches
        })
    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _change_SubSearches_InGroups( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        const callback_updateSelected_Searches = () => {

            this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = false  // Set false since only way to save from overlay is all groups have at least 1 search

            this.setState({ forceReRender_Object: {} })
        }

        open_ModPage_ZScore_SubSearchSelection_Overlay({
            projectSearchIds_All : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager_DataFrom_Server : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,
            callback_updateSelected_Searches
        })
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

        const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        let processing_SubSearches = false

        let subSearchesLabel_NotCapitol: string = undefined

        if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            processing_SubSearches = true

            subSearchesLabel_NotCapitol = "sub "
        }

        if ( this._display_NO_Searches_Message ) {

            return (
                <div style={ { marginTop: 20 } }>
                    No { subSearchesLabel_NotCapitol } searches.
                </div>
            )
        }

        if ( this._display_OnlyOneSearch_Message ) {

            return (
                <div style={ { marginTop: 20 } }>
                    ZScore Requires more than one { subSearchesLabel_NotCapitol } search.
                </div>
            )
        }

        if ( this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message ) {

            if ( processing_SubSearches ) {

                const buttonLabel = "Change Sub Searches in Groups"

                return (
                    <div style={ { marginTop: 20 } }>
                        <div>
                            At least one of the groups does not have any { subSearchesLabel_NotCapitol } searches.
                        </div>
                        <div style={ { marginTop: 2 } }>
                            Click the button '{ buttonLabel }' to change the groups.
                        </div>
                        <div style={ { marginTop: 3 } }>

                            <button
                                onClick={ this._change_SubSearches_InGroups_BindThis }
                            >
                                { buttonLabel }
                            </button>
                        </div>

                    </div>
                )
            }

            const buttonLabel = "Change Searches in Groups"

            return (
                <div style={ { marginTop: 20 } }>
                    <div>
                        At least one of the groups does not have any { subSearchesLabel_NotCapitol } searches.
                    </div>
                    <div style={ { marginTop: 2 } }>
                        Click the button '{ buttonLabel }' to change the groups.
                    </div>
                    <div style={ { marginTop: 3 } }>

                            <button
                                onClick={ this._change_Searches_InGroups_BindThis }
                            >
                                { buttonLabel }
                            </button>
                    </div>

                </div>
            )
        }

        let buttonTo_Change_Searches_Or_SubSearches: JSX.Element = undefined

        const group_1_ProjectSearchIds_OR_SubSearchIds: Array<number> = []
        const group_2_ProjectSearchIds_OR_SubSearchIds: Array<number> = []

        const group_1_SearchNames_OR_SubSearchLabels_Elements: Array<JSX.Element> = []
        const group_2_SearchNames_OR_SubSearchLabels_Elements: Array<JSX.Element> = []

        const notIn_Any_Group_SearchNames_OR_SubSearchLabels_Elements: Array<JSX.Element> = []

        if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_Root= this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()


            for ( const searchSubGroup of searchSubGroups_Array ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                const element = (
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 6 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )

                group_1_SearchNames_OR_SubSearchLabels_Elements.push( element )

                group_1_ProjectSearchIds_OR_SubSearchIds.push( searchSubGroup.searchSubGroup_Id )
            }

            for ( const searchSubGroup of searchSubGroups_Array ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                const element = (
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 6 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )

                group_2_SearchNames_OR_SubSearchLabels_Elements.push( element )

                group_2_ProjectSearchIds_OR_SubSearchIds.push( searchSubGroup.searchSubGroup_Id )
            }


            for ( const searchSubGroup of searchSubGroups_Array ) {

                if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id )
                    || this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
                    // In a group so skip
                    continue  // EARLY CONTINUE
                }

                const element = (
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 6 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )

                notIn_Any_Group_SearchNames_OR_SubSearchLabels_Elements.push( element )
            }

            {
                const buttonLabel = "Change Sub Searches in Groups"

                buttonTo_Change_Searches_Or_SubSearches = (

                    <button
                        onClick={ this._change_SubSearches_InGroups_BindThis }
                    >
                        { buttonLabel }
                    </button>
                )
            }


        } else if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS ) {

            for ( const projectSearchId of this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                    projectSearchId,
                    dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                } )

                const element = (
                    <li
                        key={ projectSearchId }
                        style={ { marginBottom: 6 } }
                    >
                        { searchNameForProjectSearchId }
                    </li>
                )

                group_1_SearchNames_OR_SubSearchLabels_Elements.push( element )

                group_1_ProjectSearchIds_OR_SubSearchIds.push( projectSearchId )
            }

            for ( const projectSearchId of this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage ) {

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
                    //  NOT in group 1 so skip
                    continue  // EARLY CONTINUE
                }

                const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                    projectSearchId,
                    dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                } )

                const element = (
                    <li
                        key={ projectSearchId }
                        style={ { marginBottom: 6 } }
                    >
                        { searchNameForProjectSearchId }
                    </li>
                )

                group_2_SearchNames_OR_SubSearchLabels_Elements.push( element )

                group_2_ProjectSearchIds_OR_SubSearchIds.push( projectSearchId )
            }

            {
                for ( const projectSearchId of this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage ) {

                    if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId )
                        || this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
                        // In a group so skip
                        continue  // EARLY CONTINUE
                    }

                    const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                        projectSearchId,
                        dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                    } )

                    const element = (
                        <li
                            key={ projectSearchId }
                            style={ { marginBottom: 6 } }
                        >
                            { searchNameForProjectSearchId }
                        </li>
                    )

                    notIn_Any_Group_SearchNames_OR_SubSearchLabels_Elements.push( element )
                }
            }

            {
                const buttonLabel = "Change Searches in Groups"

                buttonTo_Change_Searches_Or_SubSearches = (

                    <button
                        onClick={ this._change_Searches_InGroups_BindThis }
                    >
                        { buttonLabel }
                    </button>
                )
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

                    <div>
                        <div style={ { fontWeight: "bold" } }>
                            Group 1 { subSearchesLabel_NotCapitol } searches
                        </div>
                        <div
                            // style={ { marginLeft: 20 } }
                        >
                            <ul>
                                { group_1_SearchNames_OR_SubSearchLabels_Elements }
                            </ul>
                        </div>
                        <div style={ { fontWeight: "bold" } }>
                            Group 2 { subSearchesLabel_NotCapitol } searches
                        </div>
                        <div
                            // style={ { marginLeft: 20 } }
                        >
                            <ul>
                                { group_2_SearchNames_OR_SubSearchLabels_Elements }
                            </ul>
                        </div>

                        { group_1_SearchNames_OR_SubSearchLabels_Elements.length !== group_2_SearchNames_OR_SubSearchLabels_Elements.length ? (
                            <div
                                className=" mod-page-gentle-notification-background "
                                style={ { marginBottom: 10 } }
                            >
                                Warning: Number of { subSearchesLabel_NotCapitol } searches in groups 1 and 2 are not equal.
                            </div>
                        ) : null }

                        { notIn_Any_Group_SearchNames_OR_SubSearchLabels_Elements.length > 0 ? (
                            <>
                                <div style={ { fontWeight: "bold" } }>
                                    { processing_SubSearches ? (
                                        "Sub searches"
                                    ) : (
                                        "Searches"
                                    )}  NOT in a group
                                </div>
                                <div
                                    // style={ { marginLeft: 20 } }
                                >
                                    <ul>
                                        { notIn_Any_Group_SearchNames_OR_SubSearchLabels_Elements }
                                    </ul>
                                </div>
                            </>
                        ) : null }
                    </div>
                    <div>
                        { buttonTo_Change_Searches_Or_SubSearches }
                    </div>

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

