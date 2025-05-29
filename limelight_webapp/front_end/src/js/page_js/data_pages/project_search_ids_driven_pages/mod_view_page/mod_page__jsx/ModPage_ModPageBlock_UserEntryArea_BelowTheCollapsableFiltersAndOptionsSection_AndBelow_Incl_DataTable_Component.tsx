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

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
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
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modView_DataViz_Renderer
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Renderer";
import {
    ModPage_OptionsSection_UserInput_Display_MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_MainContent_Component";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    GeneratedPeptideContents_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
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
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
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


//  Default and Min Width for the block for the search names and Color Legend Bar label to the left of the SVG with the Mod Mass Heat Map
const _searchNamesBlock_LeftOfHeatMap_Width__DEFAULT = 330
const _searchNamesBlock_LeftOfHeatMap_Width__MIN_WIDTH = _searchNamesBlock_LeftOfHeatMap_Width__DEFAULT // Min Width so that there is space for the Color Legend Bar label to the left

/**
 *
 */
export interface ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props {

    modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass

    projectSearchIds_AllForPage: Array<number>
    searchDataLookupParameters_Root : SearchDataLookupParameters_Root

    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row

    dataPageStateManager: DataPageStateManager
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

    private _onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    private _onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseMove_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    private _onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseUp_Handler__ON__document__MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)
    //    Commented out _onMouseDoubleClick_Handler_... since currently NOT used
    // private _onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG_BindThis = this._onMouseDoubleClick_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG.bind(this)

    private _download_Data_Table_Clicked_BindThis = this._download_Data_Table_Clicked.bind(this)
    private _download_PSM_Localization_Report_Clicked_BindThis = this._download_PSM_Localization_Report_Clicked.bind(this)

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

    private readonly _search_names_Etc_Container_Ref :  React.RefObject<HTMLDivElement>

    private _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    private _modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    private _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    private _modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result

    private _show_FullComponent_LoadingMessage = true
    private _show_FullComponent_UpdatingMessage = false

    /**
     *
     */
    constructor( props: ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props ) {
        super( props );

        this._data_viz_container_Ref = React.createRef();

        this._search_names_Etc_Container_Ref = React.createRef();

        this.state = {
            forceReRender_Object: {}
        };
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
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject: this.props.proteinPositionFilter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            dataPageStateManager: this.props.dataPageStateManager,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } )

        if ( result.data ) {
            this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = result.data

            if ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {

                this.setState({ forceReRender_Object: {} })
            } else {
                this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed()
            }

        } else if ( result.promise ) {

            result.promise.catch( reason => {
            } )
            result.promise.then( value => {
                try {
                    this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = value
                    if ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) {

                        this.setState({ forceReRender_Object: {} })
                    } else {
                        this._computeLocalData_ModMassMap_WhenInputProps_OR_Data_Visualization_Options_UI_Section_Any_Changed()
                    }

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
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result =
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable( {
                override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
                override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
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

        let projectSearchIds_For_DisplayOrder = this.props.projectSearchIds_AllForPage

        {  //  Allow for projectSearchIds_OrderOverride_Deprecated ( OLD Functionality but since stored in URL needs to be supported )
            const projectSearchIds_OrderOverride_Deprecated = this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_projectSearchIds_OrderOverride_Deprecated()

            if ( projectSearchIds_OrderOverride_Deprecated ) {
                projectSearchIds_For_DisplayOrder = projectSearchIds_OrderOverride_Deprecated
            }
        }

        this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result =
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc( {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                projectSearchIds: projectSearchIds_For_DisplayOrder,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager
            } )

        {
            // window.setTimeout( () => { try {

            modView_DataViz_Renderer( {
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                projectSearchIds: projectSearchIds_For_DisplayOrder,
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                dataPageStateManager_DataFrom_Server: this.props.dataPageStateManager,

                updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => {

                    // this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()

                    //  Change where start recompute since changing inputs to "Min and max mod masses:"

                    this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback()
                }
            } )

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
     * @param event
     */
    private _onMouseDown_Handler_MainVisualizationHeatmap_Between_SearchNames_And_SVG( event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent> ) { try {

        // console.log("Enter onMouseDown")

        if ( ! this._search_names_Etc_Container_Ref.current ) {
            //  NO element at the ref
            return // EARLY RETURN
        }

        if ( event.ctrlKey || event.shiftKey ) {

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
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _download_PSM_Localization_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent> ) { try {

        open_ModPage_Download_PSM_Localization_Report__DownloadForEachSearchIndividually_Overlay({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject: this.props.proteinPositionFilter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            dataPageStateManager: this.props.dataPageStateManager,
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
                    this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
                    this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms

                const quantType = psmQuantType ? 'PSM' : 'Scan';

                let labelText = quantType;
                labelText += (
                    this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                        ? ' Count' : ' Ratio'
                )

                if ( this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== undefined
                    && this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {

                    const labelText_Addition = modPage_Get_DataTransformationType_DisplayLabel( {
                        modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager
                    } )

                    labelText += " (" + labelText_Addition + ")";
                }

                labelText += ' Color:';

                visualization_ColorScaleLegend_LabelText = labelText
            }


            return (
                <div
                    // id="mod_page_visualization_outer_container_block"
                    style={ { position: "relative" } }
                >

                    <ModPage_OptionsSection_UserInput_Display_MainContent_Component
                        propsValue={ {
                            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                            valueChanged_Callback: this._updateMadeTo_modViewPage_DataVizOptions_VizSelections_PageStateManager_Callback_BindThis
                        } }
                    />

                    { ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? (

                        //  SHOW with "none" when NOT is_ContainsAnyData()
                        <div style={ { fontSize: 24 } }>No modification data found for filters.</div>


                    ) : null }

                    <div
                        style={ {
                            position: "relative",
                            display:  // HIDE <div> and children with display: "none" when NOT is_ContainsAnyData().
                                ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
                                    && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? "none" : undefined
                        } }
                    >
                        <div
                            className=" mod-page-data-visualization-block-outer-container " //  Primarily for ":hover" on child element
                            style={ { width: "fit-content" } } //  Limit width to limit hover area to actual content
                        >
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
                                            { this.props.projectSearchIds_AllForPage.map( projectSearchId => {

                                                //  Display the Search Names

                                                const searchData_For_ProjectSearchId = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                                                let shortNameDisplay = ""

                                                if ( searchData_For_ProjectSearchId.searchShortName ) {
                                                    shortNameDisplay = "(" + searchData_For_ProjectSearchId.searchShortName + ") "
                                                }

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

                                {/*  2nd column.  Narrow for the resize handle for user drag to change width of first column  */}

                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <div>
                                            <ul>
                                                <li>
                                                    <b>Drag</b> to show more or less of search names.
                                                </li>
                                                <li style={ { marginTop: 20 } }>
                                                    <b>Control click</b> or <b>Shift click</b> to show all characters of search names.
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
                                            height: this.props.projectSearchIds_AllForPage.length *
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

                                {/*  3rd column for the SVG  */}

                                <div>

                                    {/*
                                        The Data Viz is put in this <div> with id="data-viz-container".  That id is used in code: 'd3.select("div#data-viz-container")'

                                            "componentWillUnmount()" method calls:     jQuery(this._data_viz_container_Ref.current).empty()
                                    */ }

                                    <div
                                        id="data-viz-container"
                                        ref={ this._data_viz_container_Ref }
                                    >
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._download_Data_Table_Clicked_BindThis }
                                >
                                    [Download Data Table]
                                </span>
                            </div>

                            <div>
                                <span
                                    className=" fake-link "
                                    onClick={ this._download_PSM_Localization_Report_Clicked_BindThis }
                                >
                                    [Download PSM Localization Report]
                                </span>
                            </div>
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

                                projectSearchIds_AllForPage={ this.props.projectSearchIds_AllForPage }

                                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root }
                                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this._modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }

                                searchDataLookupParameters_Root={ this.props.searchDataLookupParameters_Root }
                                generatedPeptideContents_UserSelections_StateObject={ this.props.generatedPeptideContents_UserSelections_StateObject }
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }
                                modViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager }
                                proteinPosition_Of_Modification_Filter_UserSelections_StateObject={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject }
                                proteinPositionFilter_UserSelections_StateObject={ this.props.proteinPositionFilter_UserSelections_StateObject }
                                dataPageStateManager_DataFrom_Server={ this.props.dataPageStateManager }
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
