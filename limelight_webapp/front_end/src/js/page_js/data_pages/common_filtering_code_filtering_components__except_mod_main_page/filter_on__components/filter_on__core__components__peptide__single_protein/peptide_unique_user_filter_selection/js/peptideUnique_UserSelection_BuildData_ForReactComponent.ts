/**
 * peptideUnique_UserSelection_BuildData_ForReactComponent.ts
 *
 * Peptide Unique Selection - Build Data for React Component
 *
 * Display Data used in: peptideUnique_UserSelection_Root.tsx
 */

import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";

/**
 *
 *
 */
export const peptideUnique_UserSelection_BuildData_ForReactComponent = function(
    {
        peptideUnique_UserSelection_StateObject
    } : {

        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
    }) : PeptideUnique_UserSelection_ComponentData {

    let peptideUnique = peptideUnique_UserSelection_StateObject.getPeptideUnique();

    return {
        peptideUnique_UserSelection : peptideUnique
    };
}

