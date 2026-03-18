/**
 * currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Container_GetsDataForDisplay.tsx
 *
 * ONLY on Peptide page and QC page
 *
 * "Current Filters:"   For Protein Position Filter UserSelections
 *
 *
 */

import React from "react";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections,
    CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_ReturnedValue
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections";
import {proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent";

/**
 *
 * @param proteinPositionFilter_UserSelections_StateObject
 * @param proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
 */
export const currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Container_GetsDataForDisplay = function (
    {
        projectSearchIds,
        proteinPositionFilter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    } : {
        projectSearchIds : Array<number>
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object: object
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : React.JSX.Element {

    if ( ( ! proteinPositionFilter_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback = function () {

        return get_ProteinData_Callback({ projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root })
    }

    return currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections({
        proteinPositionFilter_UserSelections_StateObject,
        currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback,
        proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: undefined
    });
}

/**
 *
 * @param projectSearchIds
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
const get_ProteinData_Callback = function (
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : CurrentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_GetData_Callback_ReturnedValue {

    const promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    })

    return {
        promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: undefined
    }
}
