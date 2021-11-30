/**
 * proteinPage_ProteinList__GroupProteins_Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious.ts
 *
 * Create Display Data for Protein List - Filter Protein Grouping - remove Subset Groups.  Update main Protein List as well
 *
 * Normally called when proteinGrouping_CentralStateManagerObjectClass.get_ShowHiddenProteins_Selected() returns NOT true
 */



import {
    ProteinDataDisplay_ProteinList_GroupedProtein_Item, ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";


/**
 * Create Display Data for Protein List - Filter Protein Groups - Remove proteinGroup.passesFilter is false - remove Subset Groups OR Not Parsimonious.
 *
 * Update main Protein List as well to remove the removed proteins
 *
 * Normally called when proteinGrouping_CentralStateManagerObjectClass.get_ShowHiddenProteins_Selected() returns NOT true
 *
 * @param proteinDisplayData
 *
 * @returns ProteinDisplayData_From_createProteinDisplayData_ProteinList - May be same object or may be new object
 *
 */
export const proteinPage_ProteinList__GroupProteins_Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious = function(
    {
        proteinDisplayData,
    }: {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }): ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    if ( ! proteinDisplayData.proteinGroupsList ) {
        const msg = "( ! proteinDisplayData.proteinGroupsList )";
        console.warn(msg);
        throw Error(msg);
    }

    const proteinGroupsList_Updated : Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item> = [];

    const proteinSequenceVersionIds_Removed = new Set<number>();

    for ( const proteinGroupListItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupListItem.proteinGroup;
        if ( proteinGroup.passesFilter ) {

            proteinGroupsList_Updated.push( proteinGroupListItem );
        } else {
            //  Protein Group does NOT pass filter so SKIP, and remove its proteinList_Grouped entries proteinSequenceVersionId from main protein list

            for ( const proteinListItem of proteinGroupListItem.proteinList_Grouped ) {
                proteinSequenceVersionIds_Removed.add( proteinListItem.proteinSequenceVersionId );
            }

            continue;  // EARLY CONTINUE
        }
    }

    if ( proteinSequenceVersionIds_Removed.size > 0 ) {

        const proteinDisplayData_New = proteinDisplayData.shallowClone();

        proteinDisplayData_New.proteinGroupsList = proteinGroupsList_Updated;

        const proteinList_Updated: Array<ProteinDataDisplay_ProteinList_Item> = [];

        for ( const proteinListItem of proteinDisplayData.proteinList ) {

            if ( ! proteinSequenceVersionIds_Removed.has( proteinListItem.proteinSequenceVersionId ) ) {
                // Not removed so copy to new Array
                proteinList_Updated.push( proteinListItem );
            }
        }

        proteinDisplayData_New.proteinList = proteinList_Updated;

        return proteinDisplayData_New;
    }

    return proteinDisplayData;
}
