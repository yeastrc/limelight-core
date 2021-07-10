/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide.ts
 *
 * Create Display Data for Protein List - Filter List on Counts ( PSM Peptide and Unique Peptide )
 */

import {
    ProteinDataDisplay_ProteinList_GroupedProtein_Item, ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues,
    ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";

/**
 * @returns copy of param proteinDisplayData if updated, else param proteinDisplayData
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide = function (
    {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
        proteinDisplayData
    } : {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }) : ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    {
        let noFilteringNeeded = true;

        if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter() === undefined ) {
            if ( ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.psm_Default > 1 ) {
                noFilteringNeeded = false;
            }
        } else {
            if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter() > 1 ) {
                noFilteringNeeded = false;
            }
        }
        if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter() === undefined ) {
            if ( ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.peptide_Default > 1 ) {
                noFilteringNeeded = false;
            }
        } else {
            if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter() > 1 ) {
                noFilteringNeeded = false;
            }
        }
        if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter() === undefined ) {
            if ( ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.uniquePeptide_Default > 0 ) {
                noFilteringNeeded = false;
            }
        } else {
            if ( proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter() > 0 ) {
                noFilteringNeeded = false;
            }
        }

        if ( noFilteringNeeded ) {

            //  No filtering so just return
            return proteinDisplayData; // EARLY RETURN
        }
    }

    const proteinDisplayData_Clone = proteinDisplayData.shallowClone();

    if ( proteinDisplayData_Clone.proteinGroupsList ) {

        const new_proteinGroupsList = _process_proteinGroupsList({ proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject, input_proteinGroupsList: proteinDisplayData_Clone.proteinGroupsList });
        proteinDisplayData_Clone.proteinGroupsList = new_proteinGroupsList;
    }

    const new_proteinList = _process_proteinList({ proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject, input_proteinList: proteinDisplayData_Clone.proteinList });
    proteinDisplayData_Clone.proteinList = new_proteinList;

    return proteinDisplayData_Clone;
}

/**
 * @returns new proteinDisplayData_Clone.proteinGroupsList
 */
const _process_proteinGroupsList = function(
    {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
        input_proteinGroupsList
    } : {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
        input_proteinGroupsList: Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item>

    }) : Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item> {

    const new_proteinGroupsList: Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item> = [];

    for (const proteinGroupItem of input_proteinGroupsList) {

        let all_ProteinListItems_PassFilters = true;
        for ( const proteinList_Item of proteinGroupItem.proteinList_Grouped ) {

            if ( ! _is_ProteinItem_PassFilters({ proteinList_Item, proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject }) ) {
                all_ProteinListItems_PassFilters = false;
                break;
            }
        }
        if ( ! all_ProteinListItems_PassFilters ) {
            //  NOT All proteinList_Grouped pass filters so exclude the group
            continue; // EARLY CONTINUE
        }

        new_proteinGroupsList.push( proteinGroupItem );
    }

    return new_proteinGroupsList;
}

/**
 * @returns new proteinDisplayData_Clone.proteinList
 */
const _process_proteinList = function(
    {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
        input_proteinList
    } : {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
        input_proteinList: Array<ProteinDataDisplay_ProteinList_Item>

    }) : Array<ProteinDataDisplay_ProteinList_Item> {

    const new_proteinList: Array<ProteinDataDisplay_ProteinList_Item> = [];

    for (const proteinList_Item of input_proteinList) {

        if ( ! _is_ProteinItem_PassFilters({ proteinList_Item, proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject }) ) {
            //  NOT pass filters so exclude the item
            continue; // EARLY CONTINUE
        }

        new_proteinList.push( proteinList_Item );
    }

    return new_proteinList;
}

/**
 *
 */
const _is_ProteinItem_PassFilters = function(
    {
        proteinList_Item,
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
    } : {
        proteinList_Item: ProteinDataDisplay_ProteinList_Item
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject

    }) : boolean {

    {
        let countFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter();
        if (countFilter === undefined) {
            countFilter = ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.psm_Default
        }
        if (proteinList_Item.numPsms_Overall < countFilter) {
            return false; // EARLY RETURN
        }
    }
    {
        let countFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter();
        if (countFilter === undefined) {
            countFilter = ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.peptide_Default
        }
        if (proteinList_Item.peptideCount_Overall < countFilter) {
            return false; // EARLY RETURN
        }
    }
    {
        let countFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter();
        if (countFilter === undefined) {
            countFilter = ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_DefaultValues.uniquePeptide_Default
        }
        if (proteinList_Item.uniquePeptideCount_Overall < countFilter) {
            return false; // EARLY RETURN
        }
    }

    return true;

}