/**
 * proteinPage_SingleProtein_Filter_CommonObjects.ts
 *
 * Common Objects across Single Protein Filters
 *
 */

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

/**
 * Entry per Unique Identifier for Filter.  Also used for Unmodified entry
 *
 *  Used on selection of Modifications, Reporter Ions, maybe others
 *
 *
 */
export class SingleProtein_Filter_PerUniqueIdentifier_Entry {

    readonly selectionType : SingleProtein_Filter_SelectionType

    constructor({ selectionType } : {
        selectionType : SingleProtein_Filter_SelectionType
    }) {
        this.selectionType = selectionType;
    }
}