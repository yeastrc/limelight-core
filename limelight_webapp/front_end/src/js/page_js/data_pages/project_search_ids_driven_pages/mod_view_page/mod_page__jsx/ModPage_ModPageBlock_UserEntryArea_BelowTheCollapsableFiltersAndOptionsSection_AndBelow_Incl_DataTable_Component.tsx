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
    ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component";
import {
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc, ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modView_DataViz_Renderer
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Renderer";
import {
    ModPage_OptionsSection_UserInput_Display_MainContent_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_MainContent_Component";
import {
    ModPage_TopLevelDataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_TopLevelDataTable_Component";
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
    modPage_Download_SignificantMods
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_Download_SignificantMods";
import {
    modPage_View_SignificantMods
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_View_SignificantMods";
import {
    modPage_View_SignificantMods_CombineReps
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_View_SignificantMods_CombineReps";
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
    modPage_Download_PSM_Localization_Report
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__clickable_links_for_downloads_and_view_js/modPage_Download_PSM_Localization_Report";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

/**
 *
 */
export interface ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props {

    modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass

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

    private __modView_DataViz_Renderer_UserInputMade_Callback_BindThis = this._modView_DataViz_Renderer_UserInputMade_Callback.bind(this)

    private _download_ZScore_Report_Clicked_BindThis = this._download_ZScore_Report_Clicked.bind(this)
    private _view_ZScore_Report_Clicked_BindThis = this._view_ZScore_Report_Clicked.bind(this)
    private _view_Replicate_ZScore_Report_Clicked_BindThis = this._view_Replicate_ZScore_Report_Clicked.bind(this)
    private _download_Data_Table_Clicked_BindThis = this._download_Data_Table_Clicked.bind(this)
    private _download_PSM_Localization_Report_Clicked_BindThis = this._download_PSM_Localization_Report_Clicked.bind(this)

    /**
     * <div
     *   id="data-viz-container"
     *   ref={ this._data_viz_container_Ref }>
     * </div>
     */
    private readonly _data_viz_container_Ref :  React.RefObject<HTMLDivElement>

    private _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
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

        this.state = {
            forceReRender_Object: {}
        };
    }

    componentWillUnmount() {

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

            this._computeLocalData_ModMassMap_From_InputProps()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    componentDidUpdate( prevProps: Readonly<ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_Props>, prevState: Readonly<ModPage_ModPageBlock_UserEntryArea_BelowTheCollapsableFiltersAndOptionsSection_AndBelow_Incl_DataTable_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass !== this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass ) {

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

        const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result =
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable( {
                override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: false,
                override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: false,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
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

                    this._create_Update_ModMassVisualization_For_Updated_DataOrUserInput()
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
     */
    private _download_ZScore_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        modPage_Download_SignificantMods({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _view_ZScore_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        modPage_View_SignificantMods({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _view_Replicate_ZScore_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        modPage_View_SignificantMods_CombineReps({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _download_Data_Table_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        modPage_Download_SummaryStatistics({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _download_PSM_Localization_Report_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        modPage_Download_PSM_Localization_Report({
            projectSearchIds: this.props.projectSearchIds_AllForPage,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject: this.props.proteinPositionFilter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            dataPageStateManager: this.props.dataPageStateManager,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render() {
        try {

            return (
                <div style={ { position: "relative" } }>

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
                                && ( ! this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.is_ContainsAnyData() ) ) ? "none" : undefined  } }
                    >

                        { this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root && this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result ? (

                            <div>
                                <ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
                                    propsValue={ {
                                        projectSearchIds: this.props.projectSearchIds_AllForPage,
                                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                                        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                                        dataPageStateManager_DataFrom_Server: this.props.dataPageStateManager,
                                        modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                                        clear_Clicked_Callback: this.__modView_DataViz_Renderer_UserInputMade_Callback_BindThis
                                    } }
                                />
                            </div>
                        ) : null }

                        {/*
                            The Data Viz is put in this <div> with id="data-viz-container".  That id is used in code: 'd3.select("div#data-viz-container")'

                                "componentWillUnmount()" method calls:     jQuery(this._data_viz_container_Ref.current).empty()
                            }
                        */ }

                        <div
                            id="data-viz-container"
                            ref={ this._data_viz_container_Ref }>
                        </div>

                        <div>
                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._download_ZScore_Report_Clicked_BindThis }
                                >
                                    [Download ZScore Report]
                                </span>
                            </div>

                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._view_ZScore_Report_Clicked_BindThis }
                                >
                                    [View ZScore Report]
                                </span>
                            </div>

                            <div style={ { marginBottom: 4 } }>
                                <span
                                    className=" fake-link "
                                    onClick={ this._view_Replicate_ZScore_Report_Clicked_BindThis }
                                >
                                    [View Replicate ZScore Report]
                                </span>
                            </div>

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

                        <div>
                            <div style={ { marginTop: 15, marginBottom: 5 } }>
                                <span style={ { fontSize: 18 } }>Modification List</span>
                                <span> (click row to view proteins)</span>
                            </div>
                        </div>

                        { this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root && this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result ? (

                            <ModPage_TopLevelDataTable_Component
                                force_RecomputeTableData_Object={ null }
                                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this._modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }
                                searchDataLookupParameters_Root={ this.props.searchDataLookupParameters_Root }
                                generatedPeptideContents_UserSelections_StateObject={ this.props.generatedPeptideContents_UserSelections_StateObject }
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }
                                projectSearchIds={ this.props.projectSearchIds_AllForPage }
                                modViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager }
                                proteinPosition_Of_Modification_Filter_UserSelections_StateObject={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject }
                                proteinPositionFilter_UserSelections_StateObject={ this.props.proteinPositionFilter_UserSelections_StateObject }
                                dataPageStateManager_DataFrom_Server={ this.props.dataPageStateManager }
                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function={ this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function }
                            />
                        ) : null }

                        { this._show_FullComponent_LoadingMessage ? (
                            <div
                                className=" standard-background-color "
                                style={ { position: "absolute", inset: 0, fontSize: 24, fontWeight: "bold" } }
                            >
                                <div style={ { marginTop: 20, fontSize: 24, fontWeight: "bold"} }>
                                    Loading Data...
                                </div>
                                <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                                    <Spinner_Limelight_Component/>
                                </div>
                            </div>
                        ) : null }

                        {/*   "Updating Message" Cover <div>  */}

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
