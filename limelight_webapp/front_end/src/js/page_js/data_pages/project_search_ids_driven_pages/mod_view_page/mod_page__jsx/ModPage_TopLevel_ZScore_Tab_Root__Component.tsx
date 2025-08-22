/**
 * ModPage_TopLevel_ZScore_Tab_Root__Component
 *
 * Root component under the <Tab> for ZScore
 */


import React from "react";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
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
    ModPage_ZScore_ReplicateReport_Root_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_ZScore_ReplicateReport_Root_Component";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";

/**
 *
 */
interface ModPage_TopLevel_ZScore_Tab_Root__Component_Props {

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
interface ModPage_TopLevel_ZScore_Tab_Root__Component_State {

    forceReRender_Object?: unknown
}

/**
 *
 */
export class ModPage_TopLevel_ZScore_Tab_Root__Component extends React.Component< ModPage_TopLevel_ZScore_Tab_Root__Component_Props, ModPage_TopLevel_ZScore_Tab_Root__Component_State > {

    /**
     *
     */
    constructor( props: ModPage_TopLevel_ZScore_Tab_Root__Component_Props ) { try {
        super( props );

        this.state = { forceReRender_Object: {} };

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    render() { try {

        return (
            <div>
                <div>
                    <ModPage_ZScore_ReplicateReport_Root_Component

                        force_RecomputeTableData_Object={ null }

                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root }
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root }
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

