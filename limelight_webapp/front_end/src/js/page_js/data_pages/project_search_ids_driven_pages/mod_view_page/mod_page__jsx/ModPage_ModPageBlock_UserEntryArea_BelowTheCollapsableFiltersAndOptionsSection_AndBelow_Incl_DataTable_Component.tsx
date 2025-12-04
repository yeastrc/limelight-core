/**
 * ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component.tsx
 *
 * Includes:
 *
 * * The Mod Page specific User Entry area under "Click to Show Filters and Options"
 * * The Data Visualization Graphic and the 'Clear' above it
 * * The links below the graphic
 * * The main Data table below that
 */


import React from "react";

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc,
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS,
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modView_DataViz_Renderer
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Renderer";
import {
    ModPage_OptionsSection_UserInput_Display_MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_MainContent_Component";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    modPage_Download_SummaryStatistics
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_Download_SummaryStatistics";
import {
    ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";
import {
    open_ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Plotly from "plotly.js-dist-min";
import {
    modView_DataViz_Histogram_Renderer
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Histogram_Renderer";
import {
    ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    open_ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_Download_ModPositionInProtein_Report__DownloadFor_All_Or_SingleModMassRounded_Overlay";
import {
    ModPage_Groups_For_Searches_Or_SubSearches_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_Groups_For_Searches_Or_SubSearches_Component";
import {
    modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__search_groups_sub_search_groups_init/modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager";


//  Default and Min Width for the block for the search names and Color Legend Bar label to the left of the SVG with the Mod Mass Heat Map
const _searchNamesBlock_LeftOfHeatMap_Width__DEFAULT = 330
const _searchNamesBlock_LeftOfHeatMap_Width__MIN_WIDTH = _searchNamesBlock_LeftOfHeatMap_Width__DEFAULT // Min Width so that there is space for the Color Legend Bar label to the left


/**
 *
 */
export interface ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props {

    modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
}

/**
 *
 */
interface ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_State {

    forceReRender_Object? : object
}

/**
 *
 */
export class ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component extends React.Component<ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props, ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_State> {

    //  bind to 'this' for passing as parameters

    private _updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback_BindThis = this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback.bind( this )

    private _modView_DataViz_Renderer_UserInputMade_Callback_BindThis = this._modView_DataViz_Renderer_UserInputMade_Callback.bind(this)

    private _download_ModMassVisualization_SVG_And_LabelsToLeft_As_CombinedSVG_BindThis = this._download_ModMassVisualization_SVG_And_LabelsToLeft_As_CombinedSVG.bind(this)

    private _onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    private _onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    private _onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    //    Commented out _onMouseDoubleClick_Handler_... since currently NOT used
    // private _onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)

    private _download_Data_Table_Clicked_BindThis = this._download_Data_Table_Clicked.bind(this)
    private _download_PSM_Localization_Report_Clicked_BindThis = this._download_PSM_Localization_Report_Clicked.bind(this)
    private _download_ModPositionInProtein_Report_Clicked_BindThis = this._download_ModPositionInProtein_Report_Clicked.bind(this)

    /**
     *  Width for the block for the search names and Color Legend Bar label to the left of the SVG with the Mod Mass Heat Map
     *
     *  The DOM element 'style.left' is directly manipulated in the code but also set here for subsequent React renders
     */
    private _searchNames_Etc_Block_LeftOfHeatMap_Width = _searchNamesBlock_LeftOfHeatMap_Width__DEFAULT

    //  For user drag in heat map between search names and SVG

    private _userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData: {
        clientX_OnMouseDown: number
        width_OfSearchNamesBlock_OnMouseDown: number
    }

    /**
     * <div
     *   id="data-viz-container"
     *   ref={ this._data_viz_container_Ref }>
     * </div>
     */
    private readonly _data_viz_container_Ref :  React.RefObject<HTMLDivElement>

    private readonly _data_viz_Histogram_container_Ref :  React.RefObject<HTMLDivElement>

    private _data_viz_Histogram_Difference_Plot_container_Ref :  React.RefObject<HTMLDivElement>

    private readonly _search_names_Etc_Container_Ref :  React.RefObject<HTMLDivElement>

    private _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    private _modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    private _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    private _modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

    private _show_FullComponent_LoadingMessage = true
    private _show_FullComponent_UpdatingMessage = false

    private _show_Checkbox__Inverse_RangeDirection_Plot_2_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count: boolean

    private _show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count: boolean

    /**
     *
     */
    constructor( props: ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props ) { try {

        super( props );

        this._data_viz_container_Ref = React.createRef();

        this._data_viz_Histogram_container_Ref = React.createRef();

        this._data_viz_Histogram_Difference_Plot_container_Ref = React.createRef();

        this._search_names_Etc_Container_Ref = React.createRef();

        if ( props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 2 ) {

            this._show_Checkbox__Inverse_RangeDirection_Plot_2_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count = true
            this._show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count = true

        } else if ( props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 1 ) {

            const projectSearchId = props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_Root = props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

            if ( searchSubGroups_Root ) {

                const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() returned a value AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode().length === 2 ) {

                    this._show_Checkbox__Inverse_RangeDirection_Plot_2_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count = true
                    this._show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count = true
                }
            }
        }

        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

            modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager({
                projectSearchIds_AllForPage: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
            })
        }

        this.state = {
            forceReRender_Object: {}
        };

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    componentWillUnmount() {

        //  Remove Event Listeners on the 'document' related to dragging to change search names block width

        try {
            document.removeEventListener('mousemove', this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );
        } catch ( e ) {
            console.warn( "Fail in call 'document.removeEventListener('mousemove', this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );'.  exception: ", e )
            // Eat Exception
        }
        try {
            document.removeEventListener('mouseup', this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );
        } catch ( e ) {
            console.warn( "Fail in call 'document.removeEventListener('mouseup', this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );'.  exception: ", e )
            // Eat Exception
        }

        {

            const data_viz_container_DOMElement = this._data_viz_container_Ref.current

            if ( data_viz_container_DOMElement ) {

                //  Clean up removing the d3 viz before remove this component

                try {
                    jQuery( data_viz_container_DOMElement ).empty()
                } catch ( e ) {
                    console.warn( "Fail in call 'jQuery( data_viz_container_DOMElement ).empty()'.  exception: ", e )
                    // Eat Exception
                }
            }
        }
        {

            const container_DOMElement = this._data_viz_Histogram_container_Ref.current

            if ( container_DOMElement ) {

                //  Clean up removing the Histogram viz (Plotly or whatever) before remove this component
                try {
                    Plotly.purge(container_DOMElement)
                } catch (e) {
                    console.warn( "Fail in call 'Plotly.purge(container_DOMElement)' on this._data_viz_Histogram_container_Ref.current.  exception: ", e )
                    //  Eat Exception
                }
                try {
                    jQuery( container_DOMElement ).empty()
                } catch ( e ) {
                    console.warn( "Fail in call 'jQuery( container_DOMElement ).empty()' on this._data_viz_Histogram_container_Ref.current.  exception: ", e )
                    // Eat Exception
                }
            }
        }
        {

            const container_DOMElement = this._data_viz_Histogram_Difference_Plot_container_Ref.current

            if ( container_DOMElement ) {

                //  Clean up removing the Histogram viz (Plotly or whatever) before remove this component
                try {
                    Plotly.purge(container_DOMElement)
                } catch (e) {
                    console.warn( "Fail in call 'Plotly.purge(container_DOMElement)' on this._data_viz_Histogram_Difference_Plot_container_Ref.current.  exception: ", e )
                    //  Eat Exception
                }
                try {
                    jQuery( container_DOMElement ).empty()
                } catch ( e ) {
                    console.warn( "Fail in call 'jQuery( container_DOMElement ).empty()' on this._data_viz_Histogram_Difference_Plot_container_Ref.current.  exception: ", e )
                    // Eat Exception
                }
            }
        }
    }

    componentDidMount() {
        try {

            //  Add Event Listeners on the 'document' related to dragging to change search names block width

            try {
                document.addEventListener('mousemove', this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );
            } catch ( e ) {
                console.warn( "Fail in call 'document.addEventListener('mousemove', this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );'.  exception: ", e )
                // Eat Exception
            }
            try {
                document.addEventListener('mouseup', this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );
            } catch ( e ) {
                console.warn( "Fail in call 'document.addEventListener('mouseup', this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis );'.  exception: ", e )
                // Eat Exception
            }

            this._computeLocalData_ModMassMap_From_InputProps()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    componentDidUpdate( prevProps: Readonly<ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props>, prevState: Readonly<ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass !== this.props.modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass ) {

                this._show_FullComponent_UpdatingMessage = true

                this.setState({ forceReRender_Object: {} })

                window.setTimeout( () => { try {

                    this._computeLocalData_ModMassMap_From_InputProps()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )
            }
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _computeLocalData_ModMassMap_From_InputProps() {

        this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Filters_Changed()
    }

    /**
     *
     */
    private _updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback() {

        this._show_FullComponent_UpdatingMessage = true

        this.setState({ forceReRender_Object: {} })

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Filters_Changed()

                //  The following code WOULD provide a speed enhancement when there are no changes to 'ui_Selections_Used_ForCreation'
                //    BUT this would would need to be properly maintained as other code changed which is too much of a risk.

                // const ui_Selections_Used_ForCreation = this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.ui_Selections_Used_ForCreation
                //
                // if ( ui_Selections_Used_ForCreation.modMassCutoffMin !== this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin()
                //     || ui_Selections_Used_ForCreation.modMassCutoffMax !== this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax()
                //     || ui_Selections_Used_ForCreation.excludeUnlocalizedOpenMods_UI_Selection !== this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_excludeUnlocalizedOpenMods() ) {
                //
                //     // Filtering changed so start at filters changed step
                //     this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Filters_Changed()
                // } else {
                //     //  Filtering NOT changed so skip to next step
                //     this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed()
                // }

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Filters_Changed() {

        const result = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering( {
            modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass: this.props.modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } )

        if ( result.data ) {
            this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = result.data

            //   Comment out so render charts with no data

            // if ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {
            //
            //     this._show_FullComponent_LoadingMessage = false
            //     this._show_FullComponent_UpdatingMessage = false
            //
            //     this.setState({ forceReRender_Object: {} })
            //
            //     return  // EARLY RETURN
            // }

            this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed()

        } else if ( result.promise ) {

            result.promise.catch( reason => {
            } )
            result.promise.then( value => {
                try {
                    this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = value

                    //   Comment out so render charts with no data

                    // if ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {
                    //
                    //     this._show_FullComponent_LoadingMessage = false
                    //     this._show_FullComponent_UpdatingMessage = false
                    //
                    //     this.setState( { forceReRender_Object: {} } )
                    //
                    //     return  // EARLY RETURN
                    // }

                    this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed()

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } else {
            throw Error( "result of call to 'modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering'  NO 'data' or 'promise'" )
        }
    }

    /**
     * To be safe always call 'this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Filters_Changed(...)' which will call this
     */
    private _computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed() {


        this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass =
            new ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass({
                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result =
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable( {
                override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
                override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
            } )

        if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data ) {

            this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.data

            this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

        } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise ) {

            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.catch(reason => {})
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result.promise.then(value => { try {

                this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = value

                this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } else {
            throw Error("modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result no 'data' or 'promise'")
        }
    }


    private _modView_DataViz_Renderer_UserInputMade_Callback() {
        try {
            this._show_FullComponent_UpdatingMessage = true

            this.setState({ forceReRender_Object: {} })

            window.setTimeout( () => { try {

                this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _create_Update_ModMassVisualization_For_Updated_DataOrUserInput() {

        const {
            projectSearchIds_Or_SubSearchIds_For_DisplayOrder, projectSearchId_WhenHaveSingleSearchSubGroups
        } = this._compute_ForCallToFunctions__modView_DataViz_Compute_ColorScale_WidthHeight_Etc__modView_DataViz_Renderer__RETURN_projectSearchIds_Or_SubSearchIds_For_DisplayOrder__projectSearchId_WhenHaveSingleSearchSubGroups()

        this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result =
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc( {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager
            } )

        {
            // window.setTimeout( () => { try {

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

                const data_viz_container_DOMElement = this._data_viz_container_Ref.current

                if ( ! data_viz_container_DOMElement ) {
                    const msg = "this._data_viz_container_Ref.current returned NOTHING so unable to call modView_DataViz_Renderer(...)"
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {

                    //  Hidden if no data so only update if have data

                    modView_DataViz_Renderer( {

                        render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel: false, // false since PRIMARY render visible to user

                        data_viz_container_DOMElement,
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
                        projectSearchId_WhenHaveSingleSearchSubGroups,
                        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                        modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                        dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,

                        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => {

                            // this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

                            //  Change where start recompute since changing inputs to "Min and max mod masses:"

                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                        }
                    } )
                }

            } else if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM ) {

                const data_viz_Histogram_container_DOMElement = this._data_viz_Histogram_container_Ref.current

                if ( ! data_viz_Histogram_container_DOMElement ) {
                    const msg = "this._data_viz_Histogram_container_Ref.current returned NOTHING so unable to call modView_DataViz_Histogram_Renderer(...)"
                    console.warn(msg)
                    throw Error(msg)
                }

                modView_DataViz_Histogram_Renderer( {
                    displaying_Mean_StandardDeviation: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_display_Mean_StandardDeviation_Line_And_Number(),
                    show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count: this._show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count,
                    data_viz_Histogram_container_DOMElement,
                    data_viz_Histogram_Difference_Plot_container_DOMElement: this._data_viz_Histogram_Difference_Plot_container_Ref.current,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                    projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
                    projectSearchId_WhenHaveSingleSearchSubGroups,
                    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,

                    updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => {

                        // this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

                        //  Change where start recompute since changing inputs to "Min and max mod masses:"

                        this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                    }
                } )
            } else {
                const msg = "unknown value for this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab(): " + this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                console.warn(msg)
                throw Error(msg)
            }


            window.setTimeout( () => {
                try {
                    this._show_FullComponent_LoadingMessage = false

                    this._show_FullComponent_UpdatingMessage = false

                    this.setState( { forceReRender_Object: {} } )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 10 )

            // } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )
        }
    }

    /**
     *
     * @private
     */
    private _compute_ForCallToFunctions__modView_DataViz_Compute_ColorScale_WidthHeight_Etc__modView_DataViz_Renderer__RETURN_projectSearchIds_Or_SubSearchIds_For_DisplayOrder__projectSearchId_WhenHaveSingleSearchSubGroups() {

        let projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number> = undefined

        let projectSearchId_WhenHaveSingleSearchSubGroups: number = undefined

        if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
            === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length !== 1 ) {
                const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( this.props.projectSearchIds_AllForPage.length !== 1 ) {"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            projectSearchId_WhenHaveSingleSearchSubGroups = projectSearchId

            const searchSubGroups_Root = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
            if ( ! searchSubGroups_Root ) {
                const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND this.props.dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING"
                console.warn(msg)
                throw Error(msg)
            }

            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            projectSearchIds_Or_SubSearchIds_For_DisplayOrder = []

            for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

                if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {
                    //  Specifically track if NO sub groups were selected
                    continue // EARLY CONTINUE
                }
                {
                    const selectedSearchSubGroupIds = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds()
                    //  selectedSearchSubGroupIds is undefined if ALL sub groups are selected

                    if ( selectedSearchSubGroupIds && ( ! selectedSearchSubGroupIds.has( searchSubGroup.searchSubGroup_Id ) ) ) {
                        //  Have selection and this sub group NOT selected
                        continue // EARLY CONTINUE
                    }
                }

                projectSearchIds_Or_SubSearchIds_For_DisplayOrder.push( searchSubGroup.searchSubGroup_Id )
            }

        } else {

            projectSearchIds_Or_SubSearchIds_For_DisplayOrder = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage

            {  //  Allow for projectSearchIds_OrderOverride_Deprecated ( OLD Functionality but since stored in URL needs to be supported )
                const projectSearchIds_OrderOverride_Deprecated = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_projectSearchIds_OrderOverride_Deprecated()

                if ( projectSearchIds_OrderOverride_Deprecated ) {
                    projectSearchIds_Or_SubSearchIds_For_DisplayOrder = projectSearchIds_OrderOverride_Deprecated
                }
            }
        }

        return { projectSearchIds_Or_SubSearchIds_For_DisplayOrder, projectSearchId_WhenHaveSingleSearchSubGroups }
    }

    /**
     *
     * @param event
     */
    private _download_ModMassVisualization_SVG_And_LabelsToLeft_As_CombinedSVG( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        event.stopPropagation()

        const {
            projectSearchIds_Or_SubSearchIds_For_DisplayOrder, projectSearchId_WhenHaveSingleSearchSubGroups
        } = this._compute_ForCallToFunctions__modView_DataViz_Compute_ColorScale_WidthHeight_Etc__modView_DataViz_Renderer__RETURN_projectSearchIds_Or_SubSearchIds_For_DisplayOrder__projectSearchId_WhenHaveSingleSearchSubGroups()


        const offscreenLevel_1_DivElementDOM = document.createElement("div");

        offscreenLevel_1_DivElementDOM.style.position = "relative"
        offscreenLevel_1_DivElementDOM.style.width = "0px"

        const documentBody = document.querySelector('body');

        documentBody.appendChild( offscreenLevel_1_DivElementDOM );

        const offscreenLevel_2_ForRender_DivElementDOM = document.createElement("div");

        //  Move off screen to left and up from bottom
        offscreenLevel_2_ForRender_DivElementDOM.style.position = "absolute"
        offscreenLevel_2_ForRender_DivElementDOM.style.right = "50px"
        offscreenLevel_2_ForRender_DivElementDOM.style.bottom = "50px"

        offscreenLevel_1_DivElementDOM.appendChild( offscreenLevel_2_ForRender_DivElementDOM )



        modView_DataViz_Renderer( {

            render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel: true,
            data_viz_container_DOMElement: offscreenLevel_2_ForRender_DivElementDOM,
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
            projectSearchId_WhenHaveSingleSearchSubGroups,
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server,

            updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: undefined

            // updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => {
            //
            //     // this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()
            //
            //     //  Change where start recompute since changing inputs to "Min and max mod masses:"
            //
            //     this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
            // }
        } )


        const svgContents = offscreenLevel_2_ForRender_DivElementDOM.innerHTML

        const filename = 'mod-mass-heatmap-visualization.svg'

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : svgContents, filename: filename } );


        jQuery( offscreenLevel_1_DivElementDOM ).remove()


    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     * @param event
     */
    private _onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG( event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent> ) { try {

        // console.log("Enter onMouseDown")

        if ( ! this._search_names_Etc_Container_Ref.current ) {
            //  NO element at the ref
            return // EARLY RETURN
        }

        if ( event.ctrlKey || event.metaKey ) {

            //  CTRL key or Shift key down while clicking

            //   Display the WHOLE search names by removing the 'width' style attribute

            this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData = undefined  //  Clear so stop moving

            this._searchNames_Etc_Block_LeftOfHeatMap_Width = undefined

            this._search_names_Etc_Container_Ref.current.style.width = ""

            return // EARLY RETURN
        }

        //  Get width from DOM element.  Use as starting point for setting 'width' style attribute when dragging

        const width_OfSearchNamesBlock_OnMouseDown = Math.round( this._search_names_Etc_Container_Ref.current.getBoundingClientRect().width )

        this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData = {
            clientX_OnMouseDown: event.clientX,
            width_OfSearchNamesBlock_OnMouseDown  // , this._searchNamesBlock_LeftOfHeatMap_Width
        }

        // console.log( "this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData.clientX_OnMouseDown: " + this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData.clientX_OnMouseDown )
        //
        // console.log( "this._searchNamesBlock_LeftOfHeatMap_Width: " + this._searchNamesBlock_LeftOfHeatMap_Width )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    /**
     * This listener is attached to the document in ''
     * @param event
     */
    private _onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG( event: globalThis.MouseEvent ) { try {

        if ( ! this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData ) {

            //  NOT Moving so EXIT

            return  // EARLY RETURN
        }

        // console.log("Mod Page Resize Testing: Enter onMouseMove, after check   if ( ! _clientX_OnMouseDown ) { ")

        const mouseMove_X = event.clientX - this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData.clientX_OnMouseDown

        // console.log( "mouseMove_X: " + mouseMove_X )

        let newWidth = this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData.width_OfSearchNamesBlock_OnMouseDown + mouseMove_X

        if ( newWidth < _searchNamesBlock_LeftOfHeatMap_Width__MIN_WIDTH ) {
            newWidth = _searchNamesBlock_LeftOfHeatMap_Width__MIN_WIDTH
        }

        this._searchNames_Etc_Block_LeftOfHeatMap_Width = newWidth

        this._search_names_Etc_Container_Ref.current.style.width = this._searchNames_Etc_Block_LeftOfHeatMap_Width + "px"

        // console.log( "this._searchNamesBlock_LeftOfHeatMap_Width: " + this._searchNamesBlock_LeftOfHeatMap_Width )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     * @param event
     */
    private _onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG( event: globalThis.MouseEvent ) { try {

        // console.log('Mod Page Resize Testing: Mouse up at: ', event.clientX, event.clientY);

        this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData = undefined  //  Clear so stop moving

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    // /**
    //  *  // use of 'onDoubleClick' caused problems with subsequent mouse down and drag so removed
    //  *
    //  *
    //  * @param event
    //  */
    // private _onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG( event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent> ) { try {
    //
    //     console.log('Mod Page Resize Testing: Mouse double click at: ', event.clientX, event.clientY);
    //
    //     //////////    TO DO CURRENTLY NOT USED  !!!!!!!!!!!!!!!!!!
    //
    //     throw Error("CURRENTLY NOT USED")
    //
    //     // this._userDrag_InHeatMap_Between_SearchNames_And_SVG_MouseDownData = undefined  //  Clear so stop moving
    //     //
    //     // this._searchNamesBlock_LeftOfHeatMap_Width = undefined
    //     //
    //     // this._search_names_container_Ref.current.style.width = ""
    //
    // } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    ////////////////////////////////////////////////////////////////////////

    /**
     *
     */
    private _download_Data_Table_Clicked( event: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent> ) { try {

        modPage_Download_SummaryStatistics({
            projectSearchIds: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _download_PSM_Localization_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent> ) { try {

        open_ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay({
            projectSearchIds: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _download_ModPositionInProtein_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent> ) { try {

        open_ModPage_Download_ModPositionInProtein_Report__DownloadForSingleModMassRounded_Overlay({
            projectSearchIds: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    /**
     *
     */
    render() {
        try {

            let visualization_ColorScaleLegend_LabelText: string

            {
                const psmQuantType =
                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms

                const quantType = psmQuantType ? 'PSM' : 'Scan';

                let labelText = quantType;
                labelText += (
                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                    !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP
                    || this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                        ? ' Count' : ' Ratio'
                )

                if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                    === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP
                    && this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() !== undefined
                    && this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {

                    const labelText_Addition = modPage_Get_DataTransformationType_DisplayLabel( {
                        modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager
                    } )

                    labelText += " (" + labelText_Addition + ")";
                }

                labelText += ' Color:';

                visualization_ColorScaleLegend_LabelText = labelText
            }

            let searchNames_Or_SearchSubGroupNames_Block: JSX.Element = undefined
            let numberOf_Searches_Or_Subsearches: number = undefined

            if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

                if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
                    === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                    if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length !== 1 ) {
                        const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( this.props.projectSearchIds_AllForPage.length !== 1 ) {"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

                    const searchSubGroups_Root = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
                    if ( ! searchSubGroups_Root ) {
                        const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND this.props.dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING"
                        console.warn(msg)
                        throw Error(msg)
                    }
                    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
                    if ( ! searchSubGroups_ForProjectSearchId ) {
                        const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const elements: Array<JSX.Element> = []
                    numberOf_Searches_Or_Subsearches = 0

                    for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

                        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds()
                            || ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds()
                                && ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds().has(  searchSubGroup.searchSubGroup_Id ) ) ) ) {

                            continue // EARLY CONTINUE
                        }

                        //  Keep same data format as in 'ModView_DataViz_Renderer.ts'
                        const searchSubGroupDisplay = "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile

                        const element = (
                            <div
                                key={ searchSubGroup.searchSubGroup_Id }
                                style={ {
                                    // 'max' and 'min' in 'heightDefs' is set to the same value so using 'max'
                                    height: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.max,  // Height for data for the search

                                    display: "flex",
                                    alignItems: "center", // center vertical
                                } }
                            >
                                <div style={ {
                                    //  Text on single line with hidden overflow and ellipse
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%"
                                } }>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div>
                                                <div>
                                                    Sub Search:
                                                </div>
                                                <div>
                                                    { searchSubGroupDisplay }
                                                </div>
                                            </div>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <span>
                                            { searchSubGroupDisplay }
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            </div>
                        )

                        elements.push( element )

                        numberOf_Searches_Or_Subsearches++
                    }

                    searchNames_Or_SearchSubGroupNames_Block = (
                        <>
                            { elements }
                        </>
                    )
                } else {

                    numberOf_Searches_Or_Subsearches = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length

                    searchNames_Or_SearchSubGroupNames_Block = (
                        <>
                            { this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.map( projectSearchId => {

                                //  Display the Search Names

                                const searchData_For_ProjectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                                let shortNameDisplay = ""

                                if ( searchData_For_ProjectSearchId.searchShortName ) {
                                    shortNameDisplay = "(" + searchData_For_ProjectSearchId.searchShortName + ") "
                                }

                                //  Keep same data format as in 'ModView_DataViz_Renderer.ts'
                                const searchDisplay = "(" + searchData_For_ProjectSearchId.searchId + ") " + shortNameDisplay + searchData_For_ProjectSearchId.name

                                return (
                                    <div
                                        key={ projectSearchId }
                                        style={ {
                                            // 'max' and 'min' in 'heightDefs' is set to the same value so using 'max'
                                            height: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.max,  // Height for data for the search

                                            display: "flex",
                                            alignItems: "center", // center vertical
                                        } }
                                    >
                                        <div style={ {
                                            //  Text on single line with hidden overflow and ellipse
                                            whiteSpace: "nowrap",
                                            overflowX: "hidden",
                                            textOverflow: "ellipsis",
                                            width: "100%"
                                        } }>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <div>
                                                        <div>
                                                            Search:
                                                        </div>
                                                        <div>
                                                            { searchDisplay }
                                                        </div>
                                                    </div>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <span>
                                                    { searchDisplay }
                                                </span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </div>
                                    </div>
                                )
                            } )
                            }
                        </>
                    )
                }
            }

            let download_As_SVG_Div_Top = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top - 30
            if ( download_As_SVG_Div_Top < 0 ) {
                download_As_SVG_Div_Top = 0
            }

            let histogramBlock_GroupingSection_Hide = false

            {
                if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length === 1 ) {

                    const searchSubGroups_Root= this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()

                    if ( searchSubGroups_Root ) {

                        const projectSearchId = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

                        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
                        if ( ! searchSubGroups_ForProjectSearchId ) {
                            throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                        }

                        const searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()
                        if ( searchSubGroups_Array.length === 1 ) {

                            histogramBlock_GroupingSection_Hide = true
                        }
                    } else {

                        histogramBlock_GroupingSection_Hide = true
                    }
                }
            }

            let histogramBlock_SectionAfterGrouping_Hide = false

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ) {

                const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().get_SearchGroups()

                if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0
                    && searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size === 0 ) {

                    histogramBlock_SectionAfterGrouping_Hide = true
                }
            }

            return (
                <div
                    // id="mod_page_visualization_outer_container_block"
                    style={ { position: "relative" } }
                >

                    <div
                        style={ {
                            position: "relative",
                        } }
                    >
                        <div
                            //  Add border on top to make the tabs stand out
                            style={ {
                                width: "fit-content",
                                borderTopStyle: "solid",
                                borderTopWidth: 10,
                                marginTop: 20
                            } }
                            className=" standard-border-color-very-dark "
                        >
                            <Tabs
                                value={
                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                                }
                                onChange={
                                    ( event: React.SyntheticEvent, newValue: any ) => {
                                        try {
                                            if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) {

                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.
                                                modViewPage_DataVizOptions_VizSelections_PageStateManager.
                                                set_visualization_DisplayTab( ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP )

                                            } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM ) {

                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.
                                                modViewPage_DataVizOptions_VizSelections_PageStateManager.
                                                set_visualization_DisplayTab( ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM )

                                            } else {

                                                const msg = "'<Tabs' value= { this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab() }. onChange: 'newValue' is unexpected value of " + newValue
                                                console.warn( msg )
                                                throw Error( msg )
                                            }

                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    }

                                }
                            >

                                <Tab
                                    label="HEATMAP"
                                    value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP } // Passed to <Tabs onChange newValue
                                />
                                <Tab
                                    label="HISTOGRAM"
                                    value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM }// Passed to <Tabs onChange newValue
                                />
                            </Tabs>

                        </div>

                        {/**************/ }

                        {/*   Heatmap Block  */ }

                        <div
                            style={ {
                                display:  // HIDE <div> and children with display: "none" when currentTab_Heatmap_Histogram_Tab !== Heatmap_Histogram_Tabs_Values.HEATMAP.
                                    ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                                        !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ) ? "none" : undefined
                            } }
                        >

                            <ModPage_OptionsSection_UserInput_Display_MainContent_Component
                                propsValue={ {
                                    modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                                    valueChanged_Callback: this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback_BindThis
                                } }
                            />

                            { ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? (

                                //  SHOW with "none" when NOT is_ContainsAnyData()
                                <div style={ { fontSize: 24 } }>No modification data found for filters.</div>


                            ) : null }

                            <div
                                style={ {
                                    display:  // HIDE <div> and children with display: "none" when NOT is_ContainsAnyData().
                                        ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                            && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? "none" : undefined
                                } }
                            >


                                <div
                                    className=" mod-page-data-visualization-block-outer-container " //  Primarily for ":hover" on child element
                                    style={ {
                                        width: "fit-content",
                                        position: "relative"
                                    } } //  Limit width to limit hover area to actual content
                                >
                                    <div
                                        className=" download-as-svg-fake-link-container "  //  class to only display on parent div hover
                                        style={ {
                                            position: "absolute", left: 0, top: download_As_SVG_Div_Top
                                        } }
                                    >
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <div>
                                                    Download the visualization as SVG
                                                </div>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <span
                                                className=" fake-link "
                                                onClick={ this._download_ModMassVisualization_SVG_And_LabelsToLeft_As_CombinedSVG_BindThis }
                                            >
                                                Download as SVG
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>

                                    <div
                                        style={ {
                                            display: "grid",
                                            gridTemplateColumns: "min-content 10px min-content" //  Middle column is for resize functionality
                                        } }
                                    >
                                        <div
                                            style={ {
                                                //  Search Name and Color Legend Bar Label styling to match SVG contents
                                                fontFamily: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily,
                                                fontSize: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize,
                                                textAlign: "right"
                                            } }
                                        >
                                            <div
                                                ref={ this._search_names_Etc_Container_Ref }
                                                style={ {
                                                    //  'width' is also set directly in the JS using the 'ref'.  this._searchNamesBlock_LeftOfHeatMap_Width is updated every time the 'width' is directly updated.
                                                    width: this._searchNames_Etc_Block_LeftOfHeatMap_Width
                                                } }
                                            >
                                                <div
                                                    style={ {
                                                        // Margin Top from the SVG creation
                                                        marginTop: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top
                                                    } }
                                                >
                                                    { searchNames_Or_SearchSubGroupNames_Block }
                                                </div>

                                                <div
                                                    style={ {
                                                        marginTop: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.colorScaleLegend_TopMargin,

                                                        height: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.legendHeight,  // Height for Label

                                                        display: "flex",
                                                        alignItems: "center", // center vertical
                                                    } }
                                                >
                                                    <div style={ {
                                                        //  Text on single line with hidden overflow and ellipse
                                                        whiteSpace: "nowrap",
                                                        textAlign: "right",
                                                        width: "100%"
                                                    } }>
                                                        { visualization_ColorScaleLegend_LabelText }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/*  2nd column.  Narrow for the resize handle for user drag to change width of first column  */ }

                                        <div>

                                            { numberOf_Searches_Or_Subsearches ? (

                                                // render once have value for numberOf_Searches_Or_Subsearches since used in computing 'height' below

                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <div>
                                                            <ul>
                                                                <li>
                                                                    <b>Drag</b> to show more or less of search names.
                                                                </li>
                                                                <li style={ { marginTop: 20 } }>
                                                                    <span><b>Control click</b> or <b>Command click</b> </span>
                                                                    <span>to show all characters of search names.</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    }
                                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                    disableInteractive={ true }
                                                    placement={ "right-end" }
                                                >
                                                    <div
                                                        style={ {
                                                            cursor: "col-resize",
                                                            //  marginTop and height so ONLY display in the searches area
                                                            // Margin Top from the SVG creation
                                                            marginTop: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top,
                                                            height: numberOf_Searches_Or_Subsearches *
                                                                ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.heightDefs.max,  // Height for data for the search
                                                        } }
                                                        onMouseDown={ this._onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis }
                                                        // use of 'onDoubleClick' caused problems with subsequent mouse down and drag so removed
                                                        // onDoubleClick={ this._onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis }
                                                    >
                                                        <div
                                                            className=" draggable-to-change-search-names-display--mod-page "
                                                        >
                                                        </div>
                                                    </div>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                            ) : null }
                                        </div>

                                        {/*  3rd column for the SVG  */ }

                                        <div>

                                            {/*
                                        The Data Viz is put in this <div>.   'd3.select()' is passed this._data_viz_container_Ref.current

                                            "componentWillUnmount()" method calls:     jQuery(this._data_viz_container_Ref.current).empty()
                                    */ }

                                            <div
                                                ref={ this._data_viz_container_Ref }
                                            >
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*******************/ }

                        {/*   Histogram  */ }

                        <div
                            style={ {
                                display:  // HIDE <div> and children with display: "none" when currentTab_Heatmap_Histogram_Tab !== Heatmap_Histogram_Tabs_Values.HEATMAP.
                                    ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
                                        !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM ) ? "none" : undefined
                            } }
                        >
                            <div
                                style={ { marginTop: 20, marginBottom: 20 } }
                            >
                                { ( ! histogramBlock_GroupingSection_Hide ) ? (

                                    <>
                                        <div style={ { marginBottom: 10 } }>

                                            <label>
                                                <span>Group Searches or Sub Searches in the histogram: </span>
                                                <input
                                                    type="checkbox"
                                                    checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() }
                                                    onChange={ event => {
                                                        try {
                                                            const newValue = ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram()

                                                            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_group_SearchesSubSearches_In_Histogram( newValue )

                                                            if ( newValue ) {

                                                                modPage_SearchGroups_SubSearchGroups_Init_VizSelections_PageStateManager( {
                                                                    projectSearchIds_AllForPage: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage,
                                                                    modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                                                                    dataPageStateManager_DataFrom_Server: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                                                                } )
                                                            }

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } }
                                                />
                                            </label>
                                        </div>

                                        { this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram() ? (

                                            <div style={ { marginLeft: 20, marginBottom: 20 } }>

                                                <ModPage_Groups_For_Searches_Or_SubSearches_Component

                                                    force_RecomputeSearchList_Object={ this.state.forceReRender_Object }

                                                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }

                                                    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root }
                                                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                                                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                                                    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }

                                                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                                    modPage_updateSelected_Searches_Callback_Function={ () => {
                                                        try {
                                                            this.setState( { forceReRender_Object: {} } )

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } }
                                                />
                                            </div>

                                        ) : null }
                                    </>
                                ) : null }

                                {/*
                                    Container Div for rest of histogram block.

                                    Needed so can hide when Grouping but one of the groups does NOT have entries.
                                */}
                                <div
                                    hidden={ histogramBlock_SectionAfterGrouping_Hide }

                                >

                                    <div>
                                        <div>
                                            <span>Chart Type: </span>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                                        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS }
                                                    onChange={ event => {
                                                        try {
                                                            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_histogram_ChartType_Enum_Class(
                                                                ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
                                                            )

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } }
                                                />
                                                <span> Separate Plots</span>
                                            </label>
                                            <span> </span>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                                        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART }
                                                    onChange={ event => {
                                                        try {

                                                            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_histogram_ChartType_Enum_Class(
                                                                ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART
                                                            )

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } }
                                                />
                                                <span> Stacked Bar Chart</span>
                                            </label>
                                            <span> </span>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                                        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT }
                                                    onChange={ event => {
                                                        try {

                                                            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_histogram_ChartType_Enum_Class(
                                                                ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT
                                                            )

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    } }
                                                />
                                                <span> All Data Merged Single Plot </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div style={ { marginTop: 10, marginBottom: 5 } }>

                                        <label>
                                            <span> Fit normal curve and show mean </span>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={
                                                    <div>
                                                        <div>
                                                            Fit and draw a normal distribution for the
                                                        </div>
                                                        <div>
                                                            modification mass of all displayed PSMs or scans.
                                                        </div>
                                                        <div>
                                                            Adds calculated mean to plot area.
                                                        </div>
                                                    </div>
                                                }
                                            />
                                            <span> </span>

                                            <input
                                                type="checkbox"
                                                checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_display_Mean_StandardDeviation_Line_And_Number() }
                                                onChange={ event => {
                                                    try {
                                                        const newValue = ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_display_Mean_StandardDeviation_Line_And_Number()

                                                        this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_display_Mean_StandardDeviation_Line_And_Number( newValue )

                                                        this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                } }
                                            />
                                        </label>
                                    </div>

                                    { (
                                        (
                                            this._show_Checkbox__Inverse_RangeDirection_Plot_2_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count
                                            ||
                                            this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram()
                                        )
                                        &&
                                        this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                        === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS

                                    ) ? (

                                        <>
                                            <div style={ { marginTop: 10, marginBottom: 5 } }>

                                                <label>
                                                    <span> Invert Y axis for second sub plot </span>

                                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                        title={
                                                            <div>
                                                                <div>
                                                                    Invert and draw the second plot underneath the first
                                                                    plot,
                                                                </div>
                                                                <div>
                                                                    also known as a butterfly plot.
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                    <span> </span>

                                                    <input
                                                        type="checkbox"
                                                        checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots() }
                                                        onChange={ event => {
                                                            try {
                                                                const newValue = ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots()

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_show_inverse_RangeDirection_Plot_2_WhenTwoPlots( newValue )

                                                                this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                            } catch ( e ) {
                                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                                throw e
                                                            }
                                                        } }
                                                    />
                                                </label>
                                            </div>

                                            <div style={ { marginTop: 10, marginBottom: 5 } }>

                                                <label>
                                                    <span> Show difference chart </span>

                                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                        title={
                                                            <div>
                                                                <div>
                                                                    For each modification mass bin,
                                                                </div>
                                                                <div>
                                                                    plot the number of PSMs (or scans)
                                                                </div>
                                                                <div>
                                                                    in the first search minus the number in the second
                                                                    search.
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                    <span> </span>

                                                    <input
                                                        type="checkbox"
                                                        checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_DifferenceChart_WhenTwoPlots() }
                                                        onChange={ event => {
                                                            try {
                                                                const newValue = ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_DifferenceChart_WhenTwoPlots()

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_show_DifferenceChart_WhenTwoPlots( newValue )

                                                                this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                            } catch ( e ) {
                                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                                throw e
                                                            }
                                                        } }
                                                    />
                                                </label>
                                            </div>
                                        </>

                                    ) : null }

                                    <div style={ { paddingTop: 10 } }>

                                        {/*  "Quant method:" etc  */ }

                                        <ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component
                                            propsValue={ {
                                                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                                                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                                                valueChanged_Callback: this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback_BindThis
                                            } }
                                        />
                                    </div>



                                    { this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ||
                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ? (

                                        // "Pan Left" and "Pan Right" Block

                                        <div style={ { marginTop: 15 } }>
                                            <span
                                                className={
                                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ?
                                                        " fake-link " : " fake-link-disabled "
                                                }
                                                onClick={ event => {
                                                    try {

                                                        const modMassCutoffMin_CurrentSelection = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
                                                        const modMassCutoffMax_CurrentSelection = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                                                        if ( modMassCutoffMin_CurrentSelection !== undefined ) {

                                                            //  Min has value

                                                            const modMass_Min_Across_All_Searches = this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax()
                                                            const modMass_Max_Across_All_Searches = this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax()

                                                            if ( modMassCutoffMax_CurrentSelection !== undefined ) {

                                                                const minMaxDiff = modMassCutoffMax_CurrentSelection - modMassCutoffMin_CurrentSelection
                                                                const minMaxDiff_80Percent = minMaxDiff * .8

                                                                let minNew = modMassCutoffMin_CurrentSelection - minMaxDiff_80Percent
                                                                const maxNew = modMassCutoffMax_CurrentSelection - minMaxDiff_80Percent

                                                                if ( minNew < modMass_Min_Across_All_Searches ) {

                                                                    minNew = undefined
                                                                }

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( minNew )
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( maxNew )

                                                            } else {

                                                                //  NO current Max

                                                                const minMaxDiff = modMass_Max_Across_All_Searches - modMassCutoffMin_CurrentSelection
                                                                const minMaxDiff_80Percent = minMaxDiff * .8

                                                                const minNew = modMassCutoffMin_CurrentSelection - minMaxDiff_80Percent
                                                                const maxNew = modMass_Max_Across_All_Searches - minMaxDiff_80Percent

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( minNew )
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( maxNew )
                                                            }

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                        }

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                } }
                                            >
                                                Pan Left
                                            </span>

                                            <span style={ { width: 10 } }> </span>

                                            <span
                                                className={
                                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ?
                                                        " fake-link " : " fake-link-disabled "
                                                }
                                                style={ { marginLeft: 10 } }
                                                onClick={ event => {
                                                    try {

                                                        const modMassCutoffMin_CurrentSelection = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
                                                        const modMassCutoffMax_CurrentSelection = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                                                        if ( modMassCutoffMax_CurrentSelection !== undefined ) {

                                                            //  Max has value

                                                            const modMass_Min_Across_All_Searches = this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax()
                                                            const modMass_Max_Across_All_Searches = this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax()

                                                            if ( modMassCutoffMin_CurrentSelection !== undefined ) {

                                                                const minMaxDiff = modMassCutoffMax_CurrentSelection - modMassCutoffMin_CurrentSelection
                                                                const minMaxDiff_80Percent = minMaxDiff * .8

                                                                const minNew = modMassCutoffMin_CurrentSelection + minMaxDiff_80Percent
                                                                let maxNew = modMassCutoffMax_CurrentSelection + minMaxDiff_80Percent

                                                                if ( maxNew > modMass_Max_Across_All_Searches ) {

                                                                    maxNew = undefined
                                                                }

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( minNew )
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( maxNew )

                                                            } else {

                                                                //  NO current Min

                                                                const minMaxDiff = modMassCutoffMax_CurrentSelection - modMass_Min_Across_All_Searches
                                                                const minMaxDiff_80Percent = minMaxDiff * .8

                                                                const minNew = modMass_Min_Across_All_Searches + minMaxDiff_80Percent
                                                                const maxNew = modMassCutoffMax_CurrentSelection + minMaxDiff_80Percent

                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( minNew )
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( maxNew )
                                                            }

                                                            this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                                                        }

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                } }
                                            >
                                                Pan Right
                                            </span>


                                        </div>

                                    ) : null }


                                    <div
                                        style={ {
                                            // display:  // HIDE <div> and children with display: "none" when NOT is_ContainsAnyData().
                                            //     ( ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root )
                                            //         || ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                            //             && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ) ? "none" : undefined
                                        } }
                                    >
                                        <div
                                            ref={ this._data_viz_Histogram_container_Ref }
                                            // data-label="this._data_viz_Histogram_container_Ref"
                                        >
                                        </div>
                                    </div>

                                    { ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? (

                                        //  SHOW with "none" when NOT is_ContainsAnyData()
                                        <div style={ { fontSize: 24, marginTop: 20 } }>No modification data found for
                                            filters.</div>


                                    ) : null }

                                    <div
                                        style={ {
                                            display:  // HIDE <div> and children with display: "none" when NOT is_ContainsAnyData().
                                                ( ( ! this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_show_DifferenceChart_WhenTwoPlots() )
                                                    || ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                                        !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS )
                                                    || (
                                                        ! (
                                                            this._show_Difference_Plot_WhenTwoPlots_BasedOn_Search_Or_SubSearch_Count
                                                            ||
                                                            (
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_group_SearchesSubSearches_In_Histogram()
                                                                &&
                                                                this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogram_ChartType_Enum_Class()
                                                                === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
                                                            )
                                                        )
                                                        )
                                                    || ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root )
                                                    || ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                                        && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ) ? "none" : undefined
                                        } }
                                    >
                                        <div>
                                            Difference Chart
                                        </div>

                                        <div
                                            ref={ this._data_viz_Histogram_Difference_Plot_container_Ref }
                                        >
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/*******************************************/ }

                        {/*  Block after Heatmap and Histogram  */ }

                        <div
                            style={ {
                                display:  // HIDE <div> and children with display: "none" when NOT is_ContainsAnyData().
                                    ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                        && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? "none" : undefined
                            } }
                        >
                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._download_Data_Table_Clicked_BindThis }
                                >
                                    [Download Data Table]
                                </span>
                            </div>

                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._download_PSM_Localization_Report_Clicked_BindThis }
                                >
                                    [Download PSM Localization Report]
                                </span>
                            </div>

                            { this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.allSearches_HaveProteins ? (
                                //  ONLY render if ALL searches have proteins
                                <div>
                                    <span
                                        className=" fake-link "
                                        onClick={ this._download_ModPositionInProtein_Report_Clicked_BindThis }
                                    >
                                        [Download Modification Position in Protein Report]
                                    </span>
                                </div>
                            ) : null}
                        </div>

                        {
                            this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
                            && ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                && this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root?.is_ContainsAnyData() )
                            && this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result ? (

                                //  If no data passes the filters [.is_ContainsAnyData()] (including 'Min and max mod masses:' and 'Exclude unlocalized mods:'):
                                //
                                //    Does not mount this component
                                //    Unmounts this component if mounted

                                <ModPage_Tabs_Select__ModificationList_OR_ZScoreData__Component

                                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }

                                    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root }
                                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                                    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }

                                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function={ this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function }
                                    modViewPage_DataVizOptions_VizSelections_PageStateManager__get_modMasses_ProjectSearchIds_Visualization_Selections_Root__clear_All_Called_Callback_Function={
                                        this._modView_DataViz_Renderer_UserInputMade_Callback_BindThis
                                    }
                                />

                            ) : null }

                        {/*  Overall Overlay <div> for "Loading" and "Updating" messages */ }

                        { this._show_FullComponent_LoadingMessage ? (
                            <div
                                className=" standard-background-color "
                                style={ { position: "absolute", inset: 0, fontSize: 24, fontWeight: "bold" } }
                            >
                                <div style={ { marginTop: 20, fontSize: 24, fontWeight: "bold" } }>
                                    Loading Data...
                                </div>
                                <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                                    <Spinner_Limelight_Component/>
                                </div>
                            </div>
                        ) : null }

                        {/*   "Updating Message" Cover <div>  */ }

                        { this._show_FullComponent_UpdatingMessage ? (
                            <div className=" block-updating-overlay-container ">
                                Updating
                            </div>
                        ) : null }
                    </div>

                </div>
            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }
}
