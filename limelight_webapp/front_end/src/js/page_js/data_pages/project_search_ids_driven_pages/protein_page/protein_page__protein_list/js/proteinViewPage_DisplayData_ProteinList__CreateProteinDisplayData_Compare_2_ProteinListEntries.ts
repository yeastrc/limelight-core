/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries.ts
 *
 * Create Display Data for Protein List - Compare 2 Protein List entries for Sorting
 */


import {ProteinDataDisplay_ProteinList_Item} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries = function (
    a: ProteinDataDisplay_ProteinList_Item,
    b: ProteinDataDisplay_ProteinList_Item
) : number {

    //   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

    // PSM Count (numPsms) Descending so reverse comparisons '>' '<'

    if (a.numPsms_Overall > b.numPsms_Overall) {
        return -1;
    }
    if (a.numPsms_Overall < b.numPsms_Overall) {
        return 1;
    }

    if (a.proteinNames < b.proteinNames) {
        return -1;
    }
    if (a.proteinNames > b.proteinNames) {
        return 1;
    }

    //  All others match so order on proteinSequenceVersionId
    if (a.proteinSequenceVersionId < b.proteinSequenceVersionId) {
        return -1;
    }
    if (a.proteinSequenceVersionId > b.proteinSequenceVersionId) {
        return 1;
    }
    return 0;

}

