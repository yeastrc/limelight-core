/**
 * ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component.tsx
 *
 * Tabs to control displaying one of:
 *
 * * Modification Mass List
 * * ZScore Data
 *
 */

import React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    ModPage_TopLevel_ModificationList_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_TopLevel_ModificationList_DataTable_Component";
import {
    ModPage_TopLevel_ZScore_Tab_Root__Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_TopLevel_ZScore_Tab_Root__Component";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component";
import {
    open_ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";


/**
 *
 */
export interface ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_Props {

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function

    modViewPage_DataVizOptions_VizSelections_PageStateManager__get_modMasses_ProjectSearchIds_Visualization_Selections_Root__clear_All_Called_Callback_Function: () => void
}

/**
 *
 */
interface ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_State {

    forceReRender_Object? : object
}

/**
 *
 */
export class ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component extends React.Component< ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_Props, ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_State > {

    //  bind to 'this' for passing as parameters

    private _tabs_OnChange_EventHandler_BindThis = this._tabs_OnChange_EventHandler.bind(this)

    //  Flags Set to true/false in constructor

    private _allSearches_HaveProteins: boolean


    private _tab_ModificationList_EverShown: boolean
    private _tab_ZScore_Data_EverShown: boolean


    /**
     *
     * The values passed to component <ModPage_TopLevel_ZScore_Tab_Root__Component>.  Update ONLY while it is the visible tab.
     *
     * Cache so when NOT the visible tab it does NOT update, speeding page updates
     */
    private _tab_ModificationList__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data: {

        force_RecomputeTableData_Object: object
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }

    /**
     *
     * The values passed to component <ModPage_TopLevel_ZScore_Tab_Root__Component>.  Update ONLY while it is the visible tab.
     *
     * Cache so when NOT the visible tab it does NOT update, speeding page updates
     */
    private _tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data: {

        force_RecomputeTableData_Object: object
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }

    /**
     *
     */
    constructor( props: ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_Props ) { try {
        super( props );

        this._tab_ModificationList_EverShown = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab
        this._tab_ZScore_Data_EverShown = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab

        if ( this._tab_ZScore_Data_EverShown ) {

            this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data = {
                force_RecomputeTableData_Object: null,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
            }
        }

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_Props>, prevState: Readonly<ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component_State>, snapshot?: any ) { try {

        if ( prevProps.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root !== this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
            || prevProps.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass !== this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
            || prevProps.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root !== this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root
            || prevProps.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result !== this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result ) {

            //  Upstream data changed

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab ) {

                this._update__tab_ModificationList_Data_ToShow()

            } else if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab ) {

                this._update__tab_ZScore_Data_ToShow()

            } else {
                throw Error("componentDidUpdate(...): this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() NOT modListTab OR zScoreTab")
            }

            this.setState( { forceReRender_Object: {} } )
        }

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _tabs_OnChange_EventHandler( event: React.SyntheticEvent, newValue: any ) { try {

        if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab ) {

            this._update__tab_ModificationList_Data_ToShow()

            this._tab_ModificationList_EverShown = true

            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_displayTab( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab )

            this.setState( { forceReRender_Object: {} } )

        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab ) {

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().is_AnySelections() ) {

                //  Have OLD Visualization Selections.  Show Overlay where user will either click "YES and the selections will be removed or click Close or Cancel and the user will NOT be changed to the ZScore Tab

                const yesClicked_Callback = () => {

                    this._update__tab_ZScore_Data_ToShow()

                    this._tab_ZScore_Data_EverShown = true

                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_displayTab( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab )

                    this.setState( { forceReRender_Object: {} } )
                }

                open_ModPage_ZScoreTab_Chosen_ClearOld_VisualizationSelection_Overlay({
                    modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                    projectSearchIds: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,

                    dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,
                    yesClicked_Callback
                })

                return  //  EARLY RETURN
            }

            this._update__tab_ZScore_Data_ToShow()

            this._tab_ZScore_Data_EverShown = true

            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_displayTab( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab )

            this.setState( { forceReRender_Object: {} } )

        } else {

            const msg = "'<Tabs' 'newValue' is unexpected value of " + newValue
            console.warn( msg )
            throw Error( msg )
        }

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _update__tab_ModificationList_Data_ToShow() {

        //  Update data passed to tab

        this._tab_ModificationList__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data = {
            force_RecomputeTableData_Object: null,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        }

    }

    /**
     *
     */
    private _update__tab_ZScore_Data_ToShow() {

        //  Update data passed to tab

        this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data = {
            force_RecomputeTableData_Object: null,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        }
    }

    /**
     *
     */
    render() { try {

        return (
            <div style={ { marginTop: 20, marginBottom: 20 } }>

                <div style={ { marginTop: 20 } }>
                    <Tabs
                        value={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() }
                        onChange={ this._tabs_OnChange_EventHandler_BindThis }
                    >

                        <Tab
                            label="Modification Mass List"
                            value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab } // Passed to <Tabs onChange newValue
                        />
                        <Tab
                            label="ZScore Data"
                            value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab }// Passed to <Tabs onChange newValue
                        />
                    </Tabs>

                </div>

                {/*  <div> Block for Modification List Tab  */ }

                { this._tab_ModificationList_EverShown ? (

                    <div
                        hidden={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab } // Hide <div> when true.  style={ { display: ... } } overrides 'hidden' attribute
                    >

                        <ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
                            propsValue={ {
                                renderOnlyContent_WithoutBorder: false,
                                renderClearLink: true,

                                projectSearchIds: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
                                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                                dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,
                                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                                clear_Clicked_Callback: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager__get_modMasses_ProjectSearchIds_Visualization_Selections_Root__clear_All_Called_Callback_Function
                            } }
                        />

                        <div>
                            <div style={ { marginTop: 15, marginBottom: 5 } }>
                                <span style={ { fontSize: 18 } }>Modification List</span>

                                { this._allSearches_HaveProteins ? (
                                    <span> (click row to view proteins)</span>
                                ) : (
                                    <span> (click row to view peptides)</span>
                                ) }
                            </div>
                        </div>

                        { this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root && this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result ? (

                            <ModPage_TopLevel_ModificationList_DataTable_Component

                                force_RecomputeTableData_Object={ null }

                                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }

                                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }

                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function={ this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function }
                            />
                        ) : null }

                    </div>
                ) : null }

                {/*  <div> Block for ZScore Data Tab  */ }

                { this._tab_ZScore_Data_EverShown ? (

                    <div
                        hidden={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_displayTab() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab } // Hide <div> when true.  style={ { display: ... } } overrides 'hidden' attribute
                    >
                        <ModPage_TopLevel_ZScore_Tab_Root__Component

                            force_RecomputeTableData_Object={ null }
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root }
                            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this._tab__ZScore_Data__ModPage_TopLevel_ZScore_Tab_Root__Component__Props_Data.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }

                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                            modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function={ this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function }
                        />

                    </div>

                ) : null }

            </div>
        );

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e }
    }
}
