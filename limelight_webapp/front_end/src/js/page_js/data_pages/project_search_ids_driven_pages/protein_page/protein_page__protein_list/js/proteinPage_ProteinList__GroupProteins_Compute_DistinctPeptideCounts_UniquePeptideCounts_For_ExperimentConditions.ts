/**
 * proteinPage_ProteinList__GroupProteins_Compute_DistinctPeptideCounts_UniquePeptideCounts_For_ExperimentConditions.ts
 *
 * Create Display Data for Protein List - Update Protein Groups - Compute Distinct Peptide Counts AND Unique Peptide Counts for Experiment Conditions
 */



import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";

import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";

/**
 * Create Display Data for Protein List - Update Protein Groups - Compute Distinct Peptide Counts AND Unique Peptide Counts for Experiment Conditions
 *
 * @param projectSearchIds
 *
 * @returns ProteinDisplayData_From_createProteinDisplayData_ProteinList - May be same object or may be new object
 *
 */
export const proteinPage_ProteinList__GroupProteins_Compute_DistinctPeptideCounts_UniquePeptideCounts_For_ExperimentConditions = function(
    {
        proteinDisplayData
    }: {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }): ProteinDisplayData_From_createProteinDisplayData_ProteinList {

    if (proteinDisplayData.proteinList.length === 0) {
        //  No data so exit
        return proteinDisplayData; // EARLY RETURN
    }

    _process_Data_In_ExperimentConditionId_Map({ proteinDisplayData });

    return proteinDisplayData;
}

/**
 *
 */
const _process_Data_In_ExperimentConditionId_Map = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to Condition Id to ProteinGroup mapping

    const proteinGroupsSet_Map_Key_ConditionId_Key_reportedPeptide_CommonValue_EncodedString = new Map<string,Map<number,Set<ProteinGroup>>>();

    //  Also accumulate all Distinct Peptide strings per Condition Id per ProteinGroup

    const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_Key_ProteinGroup = new Map<ProteinGroup,Map<number,Set<string>>>();

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {

            if ( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) ) {
                const msg = "( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) )";
                console.warn(msg);
                throw Error(msg);
            }

            for ( const protein_SubItem_MapEntry of proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) {

                const conditionId = protein_SubItem_MapEntry[0];
                const protein_SubItem = protein_SubItem_MapEntry[1];

                for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                    { // Update Map key conditionId key reportedPeptide_CommonValue_EncodedString
                        let proteinGroupsSet_Map_Key_ConditionId = proteinGroupsSet_Map_Key_ConditionId_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
                        if ( ! proteinGroupsSet_Map_Key_ConditionId ) {
                            proteinGroupsSet_Map_Key_ConditionId = new Map();
                            proteinGroupsSet_Map_Key_ConditionId_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, proteinGroupsSet_Map_Key_ConditionId );
                        }
                        let proteinGroupsSet = proteinGroupsSet_Map_Key_ConditionId.get( conditionId );
                        if ( ! proteinGroupsSet ) {
                            proteinGroupsSet = new Set();
                            proteinGroupsSet_Map_Key_ConditionId.set( conditionId, proteinGroupsSet );
                        }
                        proteinGroupsSet.add( proteinGroup );
                    }
                    { // Update Map key ProteinGroup
                        let reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_Key_ProteinGroup.get( proteinGroup );
                        if ( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId ) {
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId = new Map();
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_Key_ProteinGroup.set( proteinGroup, reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId );
                        }
                        let reportedPeptide_CommonValue_EncodedStringsSet = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId.get( conditionId );
                        if ( ! reportedPeptide_CommonValue_EncodedStringsSet ) {
                            reportedPeptide_CommonValue_EncodedStringsSet = new Set();
                            reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId.set( conditionId, reportedPeptide_CommonValue_EncodedStringsSet );
                        }
                        reportedPeptide_CommonValue_EncodedStringsSet.add( reportedPeptide_CommonValue_EncodedString );
                    }
                }
            }
        }
    }

    for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

        const proteinGroup = proteinGroupItem.proteinGroup;

        const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_Key_ProteinGroup.get( proteinGroup );
        if ( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId ) {
            const msg = "( ! reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId )";
            console.warn( msg );
            throw Error(msg);
        }

        for ( const reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_MapEntry of reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId ) {

            const conditionId = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_MapEntry[0];
            const reportedPeptide_CommonValue_EncodedStringsSet = reportedPeptide_CommonValue_EncodedStringsSet_Map_Key_ConditionId_MapEntry[1];

            let uniquePeptideCount = 0;

            for ( const reportedPeptide_CommonValue_EncodedString of reportedPeptide_CommonValue_EncodedStringsSet ) {

                const proteinGroupsSet_Map_Key_ConditionId = proteinGroupsSet_Map_Key_ConditionId_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinGroupsSet_Map_Key_ConditionId ) {
                    const msg = "( ! proteinGroupsSet_Map_Key_ConditionId ): Must be populated at this point. in _process_Data_In_ConditionId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }
                const proteinGroupsSet = proteinGroupsSet_Map_Key_ConditionId.get( conditionId );
                if ( ! proteinGroupsSet ) {
                    const msg = "( ! proteinGroupsSet ): Must be populated at this point. in _process_Data_In_ConditionId_Map: ";
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
                const protein_SubItem_Record = proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.get( conditionId );
                if ( ! protein_SubItem_Record ) {
                    const msg = "( ! protein_SubItem_Record ): Must be populated at this point. in _process_Data_In_ConditionId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }
                protein_SubItem_Record.uniquePeptideCount = uniquePeptideCount;
            }
        }
    }
}
