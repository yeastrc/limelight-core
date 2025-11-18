/**
 * ModPage_Groups_For_Searches_Or_SubSearches_Component.tsx
 *
 * Split searches into 2 groups - Component
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
    open_ModPage_ZScore_SubSearchSelection_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_ZScore_SubSearchSelection_Overlay";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    SearchDetailsAndFilterBlock_ChangeSearches
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_ChangeSearches";
import {
    modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__search_groups_sub_search_groups_init/modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager";

/**
 *
 */
interface ModPage_Groups_For_Searches_Or_SubSearches_Component_Props {

    force_RecomputeSearchList_Object: unknown

    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_updateSelected_Searches_Callback_Function: () => void
}

/**
 *
 */
interface ModPage_Groups_For_Searches_Or_SubSearches_Component_State {

    forceReRender_Object?: unknown
}

/**
 *
 */
export class ModPage_Groups_For_Searches_Or_SubSearches_Component extends React.Component< ModPage_Groups_For_Searches_Or_SubSearches_Component_Props, ModPage_Groups_For_Searches_Or_SubSearches_Component_State > {

    private _change_Searches_InGroups_BindThis = this._change_Searches_InGroups.bind(this)
    private _change_SubSearches_InGroups_BindThis = this._change_SubSearches_InGroups.bind(this)

    private _display_NO_Searches_Message = false

    private _display_OnlyOneSearch_Message = false
    private _display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = false


    /**
     *
     */
    constructor( props: ModPage_Groups_For_Searches_Or_SubSearches_Component_Props ) { try {
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
    componentDidUpdate( prevProps: Readonly<ModPage_Groups_For_Searches_Or_SubSearches_Component_Props>, prevState: Readonly<ModPage_Groups_For_Searches_Or_SubSearches_Component_State>, snapshot?: any ) { try {


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
    private _change_Searches_InGroups( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        const callback_updateSelected_Searches = () => {

            this._display_OneOrMoreGroupsHas_No_Searches_Or_SubSearches_Message = false  // Set false since only way to save from overlay is all groups have at least 1 search

            this.setState({ forceReRender_Object: {} })

            window.setTimeout( () => {

                this.props.modPage_updateSelected_Searches_Callback_Function()
            })
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

            window.setTimeout( () => {

                this.props.modPage_updateSelected_Searches_Callback_Function()
            })
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
    render() { try {

        const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

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
                    <div>
                        Enrichment analysis requires more than one { subSearchesLabel_NotCapitol } search to be loaded.
                    </div>

                    { ! processing_SubSearches ? (
                        <div style={ { marginTop: 10 } }>
                            <span
                                className=" fake-link "
                                onClick={ event => { try {

                                    const dataUpdated_Callback = () => {

                                        //  Currently, this will not be called.  The browser will be taken to a new href in searchDetailsAndFilterBlock_ChangeSearches.changeSearches();

                                        throw Error("No Call to 'dataUpdated_Callback()' Expected.  Inside private _openUserChangeSearches_Overlay_Callback()")

                                        // const params = new SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param();
                                        //
                                        // this.props.propValue.filterValuesChanged_Callback( params );
                                    }

                                    const searchDetailsAndFilterBlock_ChangeSearches = new SearchDetailsAndFilterBlock_ChangeSearches({
                                        isProteinPage: false,
                                        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                                        searchDetailsBlockDataMgmtProcessing : this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchDetailsBlockDataMgmtProcessing,
                                        dataUpdated_Callback
                                    })

                                    searchDetailsAndFilterBlock_ChangeSearches.open_ChangeSearches_Overlay();

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                                }}

                            >
                                Click here to add loaded searches
                            </span>
                        </div>
                    ) : null }
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

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
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

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
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

                if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id )
                    || this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( searchSubGroup.searchSubGroup_Id ) ) {
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

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
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

                if ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
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

                    if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId )
                        || this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId ) ) {
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

            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }
}

