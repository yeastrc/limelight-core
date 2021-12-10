/**
 * proteinPage_ProteinList__GroupProteins.ts
 *
 * Create Display Data for Protein List - Add Protein Grouping if requested
 */



import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";

import {ProteinInferenceUtils} from "page_js/data_pages/protein_inference/ProteinInferenceUtils";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {
    ProteinDataDisplay_ProteinList_GroupedProtein_Item, ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries.ts";


/**
 * Create Protein Data for Display - Group Proteins if requested
 *
 * @param projectSearchIds
 *
 * @returns ProteinDisplayData_From_createProteinDisplayData_ProteinList - May be same object or may be new object
 *
 */
export const proteinPage_ProteinList__GroupProteins = function(
    {
        projectSearchIds,
        proteinDisplayData,
        proteinGrouping_CentralStateManagerObjectClass
    }: {
        projectSearchIds: Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass

    }): ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    if (proteinDisplayData.proteinList.length === 0) {
        //  No data so exit
        return proteinDisplayData; // EARLY RETURN
    }

    //  Populate the Protein Groups List
    proteinDisplayData = _populate_ProteinGroupsList({ projectSearchIds, proteinDisplayData, proteinGrouping_CentralStateManagerObjectClass });

    //  Update Overall Unique Peptide counts
    _process_Data_Overall({ proteinDisplayData })

    _sortProteinList({ proteinDisplayData });

    return proteinDisplayData;
}

/**
 *
 * @param projectSearchIds
 * @param proteinDisplayData
 * @param proteinGrouping_CentralStateManagerObjectClass
 * @returns ProteinDisplayData_From_createProteinDisplayData_ProteinList
 */
const _populate_ProteinGroupsList = function (
    {
        projectSearchIds, // For Error Message
        proteinDisplayData,
        proteinGrouping_CentralStateManagerObjectClass
    } : {
        projectSearchIds: Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        proteinGrouping_CentralStateManagerObjectClass: ProteinGrouping_CentralStateManagerObjectClass

    }) : ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    const proteinPeptideMap: Map<number, Set<string>> = new Map(); // Map<proteinSequenceVersionId, Set<reportedPeptide_CommonValue_EncodedString>>

    {
        for ( const proteinListItem of proteinDisplayData.proteinList ) {

            const proteinPeptideEntry = new Set<string>();

            for ( const generatedPeptide of proteinListItem.generatedPeptides_Overall_Set ) {
                proteinPeptideEntry.add( generatedPeptide );
            }

            proteinPeptideMap.set( proteinListItem.proteinSequenceVersionId, proteinPeptideEntry );
        }
    }

    let proteinGroups_ArrayOf_ProteinGroup: Array<ProteinGroup> = undefined;

    if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups()) {

        proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getProteinGroups({proteinPeptideMap});

    } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

        proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinPeptideMap({proteinPeptideMap});

    } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {

        proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getParsimoniousProteinGroupsFromProteinPeptideMap({proteinPeptideMap});

    } else {

        const msg = "proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData: proteinGrouping_CentralStateManagerObjectClass.isGroupProteins... not === expected values.  proteinGrouping_CentralStateManagerObjectClass (Only in Log): ";
        console.warn(msg, proteinGrouping_CentralStateManagerObjectClass);
        throw Error(msg);
    }

    //  Copy ProteinGroup to map Key proteinSequenceVersionId for faster lookup
    const proteinGroups_All_Map_Key_ProteinId : Map<number,ProteinGroup> = new Map();
    for ( const proteinGroups_AllEntry of proteinGroups_ArrayOf_ProteinGroup ) {
        for ( const proteinId of proteinGroups_AllEntry.proteins ) {
            proteinGroups_All_Map_Key_ProteinId.set( proteinId , proteinGroups_AllEntry );
        }
    }

    let notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count = 0;

    //  Map per Protein Group to produce result Protein Groups Array
    const groupedProteins_map_Key_ProteinGroup : Map<ProteinGroup, { groupedProtein_Entry : ProteinDataDisplay_ProteinList_GroupedProtein_Item }> = new Map();

    for ( const proteinListItem of proteinDisplayData.proteinList ) {

        //  Get ProteinGroup for proteinListItem

        const proteinGroup_For_proteinListItem = proteinGroups_All_Map_Key_ProteinId.get( proteinListItem.proteinSequenceVersionId );

        if ( ! proteinGroup_For_proteinListItem ) {
            //  protein not found in any groups
            notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count++;
            continue; // EARLY CONTINUE
        }

        //  Look for existing entry in groupedProteins to add proteinListItem to

        const groupedProteins_map_Key_ProteinGroup_Entry = groupedProteins_map_Key_ProteinGroup.get( proteinGroup_For_proteinListItem );

        if ( groupedProteins_map_Key_ProteinGroup_Entry ) {

            //  Add to existing entry in groupedProteins

            groupedProteins_map_Key_ProteinGroup_Entry.groupedProtein_Entry.proteinList_Grouped.push( proteinListItem );

        } else {

            //  Add new entry to groupedProteins_map_Key_ProteinGroup

            //  Only Set isSubsetGroup when Selected NonSubset_Groups

            let isSubsetGroup: boolean = undefined;
            if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {
                isSubsetGroup = ! proteinGroup_For_proteinListItem.passesFilter
            }

            const groupedProtein_NewEntry : ProteinDataDisplay_ProteinList_GroupedProtein_Item = {
                proteinList_Grouped : [ proteinListItem ],
                proteinGroup : proteinGroup_For_proteinListItem,
                isSubsetGroup
            };

            groupedProteins_map_Key_ProteinGroup.set( proteinGroup_For_proteinListItem, { groupedProtein_Entry : groupedProtein_NewEntry } );
        }
    }

    if ( notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count > 0 ) {
        try {
            const msg = "WARN: At least 1 entry in  entry in proteinList not found in proteinGroups_All_Map_Key_ProteinId.  Not Found Count: "
                + notFoundIn_proteinGroups_All_Map_Key_ProteinId_Count + ", projectSearchIds: " + projectSearchIds.join(",");
            console.warn( msg );
            throw Error( msg )
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            // Do Not rethrow so not break page
        }
    }
    //  Convert Map to Array and sort

    const groupedProteins_map_Key_ProteinGroup_AsArray : Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item> = [];

    for ( const entry of groupedProteins_map_Key_ProteinGroup.entries() ) {
        groupedProteins_map_Key_ProteinGroup_AsArray.push( entry[ 1 ].groupedProtein_Entry );
    }

    proteinDisplayData.proteinGroupsList = groupedProteins_map_Key_ProteinGroup_AsArray;

    return proteinDisplayData;
}


/**
 *
 */
const _process_Data_Overall = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to ProteinGroup mapping

    const proteinGroupsSet_Map_Key_reportedPeptide_CommonValue_EncodedString = new Map<string,Set<ProteinGroup>>();

    //  Also accumulate all Distinct Peptide strings per ProteinGroup

    const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ProteinGroup = new Map<ProteinGroup,Set<string>>();

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {

            for ( const reportedPeptide_CommonValue_EncodedString of proteinItem.generatedPeptides_Overall_Set ) {

                { // Update Map key reportedPeptide_CommonValue_EncodedString
                    let proteinGroupsSet = proteinGroupsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
                    if ( ! proteinGroupsSet ) {
                        proteinGroupsSet = new Set();
                        proteinGroupsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, proteinGroupsSet );
                    }
                    proteinGroupsSet.add( proteinGroup );
                }
                { // Update Map key ProteinGroup
                    let reportedPeptide_CommonValue_EncodedStringsSet = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ProteinGroup.get( proteinGroup );
                    if ( ! reportedPeptide_CommonValue_EncodedStringsSet ) {
                        reportedPeptide_CommonValue_EncodedStringsSet = new Set();
                        reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ProteinGroup.set( proteinGroup, reportedPeptide_CommonValue_EncodedStringsSet );
                    }
                    reportedPeptide_CommonValue_EncodedStringsSet.add( reportedPeptide_CommonValue_EncodedString );
                }
            }
        }
    }

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        const reportedPeptide_CommonValue_EncodedStringsSet_For_ProteinGroup = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ProteinGroup.get( proteinGroup );
        if ( ! reportedPeptide_CommonValue_EncodedStringsSet_For_ProteinGroup ) {
            const msg = "( ! reportedPeptide_CommonValue_EncodedStringsSet_For_ProteinGroup )";
            console.warn( msg );
            throw Error(msg);
        }

        let uniquePeptideCount_Overall = 0;

        for ( const reportedPeptide_CommonValue_EncodedString of reportedPeptide_CommonValue_EncodedStringsSet_For_ProteinGroup ) {

            let proteinGroupsSet = proteinGroupsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
            if ( ! proteinGroupsSet ) {
                const msg = "( ! proteinGroupsSet ): Must be populated at this point. in _process_Data_Overall: ";
                console.warn(msg);
                throw Error(msg);
            }

            let peptideIsUnique = true;
            for ( const proteinGroup_InSet of proteinGroupsSet ) {

                if ( proteinGroup_InSet !== proteinGroup ) {
                    //  proteinGroup_InSet for reportedPeptide_CommonValue_EncodedString is for other protein id than the one being processed.
                    //  reportedPeptide_CommonValue_EncodedString is NOT Unique to this proteinGroup
                    peptideIsUnique = false;
                    break;
                }
            }
            if ( peptideIsUnique ) {
                uniquePeptideCount_Overall++;
            }
        }

        //  Set uniquePeptideCount_Overall on each Protein Item in the group with the same value as the group
        for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {
            proteinItem.uniquePeptideCount_Overall = uniquePeptideCount_Overall;
        }
    }
}

////////

/**
 *
 */
const _sortProteinList = function(
    {
        proteinDisplayData
    }: {

        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }) {

    //   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

    proteinDisplayData.proteinGroupsList.sort(

        ( a,b ) : number => {

            return proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries(
                a.proteinList_Grouped[0],
                b.proteinList_Grouped[0]
            )
        }

    );
}
