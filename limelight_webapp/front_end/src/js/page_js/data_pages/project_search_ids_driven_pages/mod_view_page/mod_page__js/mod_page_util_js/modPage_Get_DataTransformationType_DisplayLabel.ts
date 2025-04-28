/**
 * modPage_Get_DataTransformationType_DisplayLabel.ts
 */
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";


export const modPage_Get_DataTransformationType_DisplayLabel = function (
    {
        modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    }
) {
    const dataTransformation = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation()

    if ( dataTransformation === undefined || dataTransformation === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {
        return 'None';
    }

    switch ( dataTransformation ) {
        case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore:
            return "Per-Mod Z-Score"
            break;

        case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore:
            return "Global Z-Score"
            break;

        case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf:
            return "Global P-Value"
            break;

        case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh:
            return "Q-Value"
            break;

        case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff:
            return "Scaled Mean Diff."
            break;
    }

}