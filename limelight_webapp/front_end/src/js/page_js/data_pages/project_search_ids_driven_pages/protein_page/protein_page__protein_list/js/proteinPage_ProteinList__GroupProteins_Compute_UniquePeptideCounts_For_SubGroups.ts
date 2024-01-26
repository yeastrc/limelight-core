/**
 * proteinPage_ProteinList__GroupProteins.ts
 *
 * Create Display Data for Protein List - Update Protein Groups - Compute Unique Peptide Counts for subgroups
 */



import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";

import {ProteinInferenceUtils} from "page_js/data_pages/protein_inference/ProteinInferenceUtils";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {
    ProteinDataDisplay_ProteinList_GroupedProtein_Item, ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries";


/**
 * Create Display Data for Protein List - Update Protein Groups - Compute Unique Peptide Counts for subgroups
 *
 * @param projectSearchIds - May be Set instead of Array
 *
 * @returns ProteinDisplayData_From_createProteinDisplayData_ProteinList - May be same object or may be new object
 *
 */
export const proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_SubGroups = function(
    {
        proteinDisplayData
    }: {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }): ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    if (proteinDisplayData.proteinList.length === 0) {
        //  No data so exit
        return proteinDisplayData; // EARLY RETURN
    }

    _process_Data_In_SubGroupId_Map({ proteinDisplayData });

    return proteinDisplayData;
}

/**
 *
 */
const _process_Data_In_SubGroupId_Map = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to Sub Group Id to ProteinGroup mapping

    const proteinGroupsSet_Map_Key_SubGroupId_Key_reportedPeptide_CommonValue_EncodedString = new Map<string,Map<number,Set<ProteinGroup>>>();

    //  Also accumulate all Distinct Peptide strings per Sub Group Id per ProteinGroup

    const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_Key_ProteinGroup = new Map<ProteinGroup,Map<number,Set<string>>>();

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {

            for ( const protein_SubItem_MapEntry of proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

                const subGroupId = protein_SubItem_MapEntry[0];
                const protein_SubItem = protein_SubItem_MapEntry[1];

                for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                    { // Update Map key subGroupId key reportedPeptide_CommonValue_EncodedString
                        let proteinGroupsSet_Map_Key_SubGroupId = proteinGroupsSet_Map_Key_SubGroupId_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
                        if ( ! proteinGroupsSet_Map_Key_SubGroupId ) {
                            proteinGroupsSet_Map_Key_SubGroupId = new Map();
                            proteinGroupsSet_Map_Key_SubGroupId_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, proteinGroupsSet_Map_Key_SubGroupId );
                        }
                        let proteinGroupsSet = proteinGroupsSet_Map_Key_SubGroupId.get( subGroupId );
                        if ( ! proteinGroupsSet ) {
                            proteinGroupsSet = new Set();
                            proteinGroupsSet_Map_Key_SubGroupId.set( subGroupId, proteinGroupsSet );
                        }
                        proteinGroupsSet.add( proteinGroup );
                    }
                    { // Update Map key ProteinGroup
                        let reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_Key_ProteinGroup.get( proteinGroup );
                        if ( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId ) {
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId = new Map();
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_Key_ProteinGroup.set( proteinGroup, reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId );
                        }
                        let reportedPeptide_CommonValue_EncodedStringsSet = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId.get( subGroupId );
                        if ( ! reportedPeptide_CommonValue_EncodedStringsSet ) {
                            reportedPeptide_CommonValue_EncodedStringsSet = new Set();
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId.set( subGroupId, reportedPeptide_CommonValue_EncodedStringsSet );
                        }
                        reportedPeptide_CommonValue_EncodedStringsSet.add( reportedPeptide_CommonValue_EncodedString );
                    }
                }
            }
        }
    }

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_Key_ProteinGroup.get( proteinGroup );
        if ( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId ) {
            const msg = "( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId )";
            console.warn( msg );
            throw Error(msg);
        }

        for ( const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_MapEntry of reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId ) {

            const subGroupId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_MapEntry[0];
            const reportedPeptide_CommonValue_EncodedStringsSet = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_SubGroupId_MapEntry[1];

            let uniquePeptideCount = 0;

            for ( const reportedPeptide_CommonValue_EncodedString of reportedPeptide_CommonValue_EncodedStringsSet ) {

                const proteinGroupsSet_Map_Key_SubGroupId = proteinGroupsSet_Map_Key_SubGroupId_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinGroupsSet_Map_Key_SubGroupId ) {
                    const msg = "( ! proteinGroupsSet_Map_Key_SubGroupId ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }
                const proteinGroupsSet = proteinGroupsSet_Map_Key_SubGroupId.get( subGroupId );
                if ( ! proteinGroupsSet ) {
                    const msg = "( ! proteinGroupsSet ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
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
                    uniquePeptideCount++;
                }
            }

            //  Set uniquePeptideCount_Overall on each Protein Item in the group with the same value as the group
            for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {
                const protein_SubItem_Record = proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( subGroupId );
                if ( ! protein_SubItem_Record ) {
                    const msg = "( ! protein_SubItem_Record ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }
                protein_SubItem_Record.uniquePeptideCount = uniquePeptideCount;
            }
        }
    }
}

