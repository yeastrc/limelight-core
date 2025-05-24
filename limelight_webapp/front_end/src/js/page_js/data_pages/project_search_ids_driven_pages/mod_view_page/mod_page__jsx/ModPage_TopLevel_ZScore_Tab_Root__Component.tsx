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
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    GeneratedPeptideContents_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
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

/**
 *
 */
interface ModPage_TopLevel_ZScore_Tab_Root__Component_Props {

    force_RecomputeTableData_Object: object
    projectSearchIds_AllForPage: Array<number>

    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    searchDataLookupParameters_Root : SearchDataLookupParameters_Root

    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject  //  To limit which proteins are displayed when expand mod mass table row
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
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
                        projectSearchIds_AllForPage={ this.props.projectSearchIds_AllForPage }

                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass={ this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass }
                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root={ this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root }
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root={ this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root }
                        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result={ this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }
                        searchDataLookupParameters_Root={ this.props.searchDataLookupParameters_Root }
                        generatedPeptideContents_UserSelections_StateObject={ this.props.generatedPeptideContents_UserSelections_StateObject }
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }
                        modViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager }
                        proteinPosition_Of_Modification_Filter_UserSelections_StateObject={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject }
                        proteinPositionFilter_UserSelections_StateObject={ this.props.proteinPositionFilter_UserSelections_StateObject }
                        dataPageStateManager_DataFrom_Server={ this.props.dataPageStateManager_DataFrom_Server }
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
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

