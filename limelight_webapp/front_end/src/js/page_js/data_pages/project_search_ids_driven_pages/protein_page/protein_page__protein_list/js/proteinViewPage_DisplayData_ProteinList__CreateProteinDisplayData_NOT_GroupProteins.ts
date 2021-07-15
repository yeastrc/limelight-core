/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins.ts
 *
 * Create Display Data for Protein List - NOT Protein Grouping
 *
 * FINAL processing before create DataTable objects
 *
 * 1)  Compute "Unique Peptide" counts
 */


import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries.ts";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins = function (
    {
        process_ExperimentConditions,
        process_SubGroups,
        projectSearchIds,
        proteinDisplayData

    } : {
        process_ExperimentConditions: boolean
        process_SubGroups: boolean
        projectSearchIds: Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }) : void {

    if (proteinDisplayData.proteinList.length === 0) {
        //  No data so exit
        return; // EARLY RETURN
    }

    _process_Data_Overall({ proteinDisplayData });

    if ( process_ExperimentConditions ) {

        _process_Data_In_ExperimentConditionId_Map({ proteinDisplayData });

    } else if ( process_SubGroups ) {

        _process_Data_In_SubGroupId_Map({ proteinDisplayData });
    } else {

        if ( projectSearchIds.length > 1 ) {
            _process_Data_In_ProjectSearchId_Map({ proteinDisplayData });
        }
    }

    _sortProteinList({ proteinDisplayData });
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

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to proteinSequenceVersionId mapping

    const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString = new Map<string,Set<number>>();

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId

        for ( const reportedPeptide_CommonValue_EncodedString of proteinItem.generatedPeptides_Overall_Set ) {

            let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
            if ( ! proteinSequenceVersionIdsSet ) {
                proteinSequenceVersionIdsSet = new Set();
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, proteinSequenceVersionIdsSet );
            }
            proteinSequenceVersionIdsSet.add( proteinSequenceVersionId );
        }
    }


    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId_In_proteinItem = proteinItem.proteinSequenceVersionId

        let uniquePeptideCount_Overall = 0;

        for ( const reportedPeptide_CommonValue_EncodedString of proteinItem.generatedPeptides_Overall_Set ) {

            let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );
            if ( ! proteinSequenceVersionIdsSet ) {
                const msg = "( ! proteinSequenceVersionIdsSet ): Must be populated at this point. in _process_Data_Overall: ";
                console.warn(msg);
                throw Error(msg);
            }

            let peptideIsUnique = true;
            for ( const proteinSequenceVersionId_InSet of proteinSequenceVersionIdsSet ) {

                if ( proteinSequenceVersionId_InSet !== proteinSequenceVersionId_In_proteinItem ) {
                    //  proteinSequenceVersionId_InSet for reportedPeptide_CommonValue_EncodedString is for other protein id than the one being processed.
                    //  reportedPeptide_CommonValue_EncodedString is NOT Unique to this proteinSequenceVersionId_In_proteinItem
                    peptideIsUnique = false;
                    break;
                }
            }
            if ( peptideIsUnique ) {
                uniquePeptideCount_Overall++;
            }
        }

        proteinItem.uniquePeptideCount_Overall = uniquePeptideCount_Overall;
    }
}

/**
 *
 */
const _process_Data_In_ProjectSearchId_Map = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to proteinSequenceVersionId mapping, per Project Search Id

    const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ProjectSearchId = new Map<number,Map<string,Set<number>>>();

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId

        for ( const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId ) {

            const projectSearchId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            let proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ProjectSearchId.get( projectSearchId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = new Map()
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ProjectSearchId.set( projectSearchId, proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue );
            }

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    proteinSequenceVersionIdsSet = new Set();
                    proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.set( reportedPeptide_CommonValue_EncodedString, proteinSequenceVersionIdsSet );
                }
                proteinSequenceVersionIdsSet.add( proteinSequenceVersionId );
            }
        }
    }

    //  Main Process and Update

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId_In_proteinItem = proteinItem.proteinSequenceVersionId

        for ( const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId ) {

            const projectSearchId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ProjectSearchId.get( projectSearchId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                const msg = "( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ): Must be populated at this point. in _process_Data_In_ProjectSearchId_Map: ";
                console.warn(msg);
                throw Error(msg);
            }

            let uniquePeptideCount = 0;

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    const msg = "( ! proteinSequenceVersionIdsSet ): Must be populated at this point. in _process_Data_In_ProjectSearchId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }

                let peptideIsUnique = true;
                for ( const proteinSequenceVersionId_InSet of proteinSequenceVersionIdsSet ) {

                    if ( proteinSequenceVersionId_InSet !== proteinSequenceVersionId_In_proteinItem ) {
                        //  proteinSequenceVersionId_InSet for reportedPeptide_CommonValue_EncodedString is for other protein id than the one being processed.
                        //  reportedPeptide_CommonValue_EncodedString is NOT Unique to this proteinSequenceVersionId_In_proteinItem
                        peptideIsUnique = false;
                        break;
                    }
                }
                if ( peptideIsUnique ) {
                    uniquePeptideCount++;
                }
            }

            protein_SubItem.uniquePeptideCount = uniquePeptideCount;
        }
    }

}

/**
 * Process data Per Sub Group
 */
const _process_Data_In_SubGroupId_Map = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to proteinSequenceVersionId mapping, per Sub Group Id

    const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_SubGroupId = new Map<number,Map<string,Set<number>>>();

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId

        for ( const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

            const subGroupId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            let proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_SubGroupId.get( subGroupId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = new Map()
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_SubGroupId.set( subGroupId, proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue );
            }

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    proteinSequenceVersionIdsSet = new Set();
                    proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.set( reportedPeptide_CommonValue_EncodedString, proteinSequenceVersionIdsSet );
                }
                proteinSequenceVersionIdsSet.add( proteinSequenceVersionId );
            }
        }
    }

    //  Main Process and Update

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId_In_proteinItem = proteinItem.proteinSequenceVersionId

        for ( const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

            const subGroupId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_SubGroupId.get( subGroupId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                const msg = "( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                console.warn(msg);
                throw Error(msg);
            }

            let uniquePeptideCount = 0;

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    const msg = "( ! proteinSequenceVersionIdsSet ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }

                let peptideIsUnique = true;
                for ( const proteinSequenceVersionId_InSet of proteinSequenceVersionIdsSet ) {

                    if ( proteinSequenceVersionId_InSet !== proteinSequenceVersionId_In_proteinItem ) {
                        //  proteinSequenceVersionId_InSet for reportedPeptide_CommonValue_EncodedString is for other protein id than the one being processed.
                        //  reportedPeptide_CommonValue_EncodedString is NOT Unique to this proteinSequenceVersionId_In_proteinItem
                        peptideIsUnique = false;
                        break;
                    }
                }
                if ( peptideIsUnique ) {
                    uniquePeptideCount++;
                }
            }

            protein_SubItem.uniquePeptideCount = uniquePeptideCount;
        }
    }
}


/**
 * Process data Per Experiment Condition (Single Condition Group)
 */
const _process_Data_In_ExperimentConditionId_Map = function(
    {
        proteinDisplayData
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    //  First store Distinct Peptide string (reportedPeptide_CommonValue_EncodedString) to proteinSequenceVersionId mapping, per Sub Group Id

    const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ConditionId = new Map<number,Map<string,Set<number>>>();

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId;

        if ( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) ) {
            const msg = "( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) )";
            console.warn(msg);
            throw Error(msg);
        }

        for ( const mapEntry of proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) {

            const conditionId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            let proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ConditionId.get( conditionId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = new Map()
                proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ConditionId.set( conditionId, proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue );
            }

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    proteinSequenceVersionIdsSet = new Set();
                    proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.set( reportedPeptide_CommonValue_EncodedString, proteinSequenceVersionIdsSet );
                }
                proteinSequenceVersionIdsSet.add( proteinSequenceVersionId );
            }
        }
    }

    //  Main Process and Update

    for ( const proteinItem of proteinDisplayData.proteinList ) {

        const proteinSequenceVersionId_In_proteinItem = proteinItem.proteinSequenceVersionId

        if ( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) ) {
            const msg = "( ( ! proteinItem.experiment_SubData ) || ( ! proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) )";
            console.warn(msg);
            throw Error(msg);
        }

        for ( const mapEntry of proteinItem.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId ) {

            const conditionId = mapEntry[ 0 ];
            const protein_SubItem = mapEntry[ 1 ];

            const proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_Map_Key_ConditionId.get( conditionId );
            if ( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ) {
                const msg = "( ! proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                console.warn(msg);
                throw Error(msg);
            }

            let uniquePeptideCount = 0;

            for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {

                let proteinSequenceVersionIdsSet = proteinSequenceVersionIdsSet_Map_Key_reportedPeptide_CommonValue_EncodedString_MapValue.get( reportedPeptide_CommonValue_EncodedString );
                if ( ! proteinSequenceVersionIdsSet ) {
                    const msg = "( ! proteinSequenceVersionIdsSet ): Must be populated at this point. in _process_Data_In_SubGroupId_Map: ";
                    console.warn(msg);
                    throw Error(msg);
                }

                let peptideIsUnique = true;
                for ( const proteinSequenceVersionId_InSet of proteinSequenceVersionIdsSet ) {

                    if ( proteinSequenceVersionId_InSet !== proteinSequenceVersionId_In_proteinItem ) {
                        //  proteinSequenceVersionId_InSet for reportedPeptide_CommonValue_EncodedString is for other protein id than the one being processed.
                        //  reportedPeptide_CommonValue_EncodedString is NOT Unique to this proteinSequenceVersionId_In_proteinItem
                        peptideIsUnique = false;
                        break;
                    }
                }
                if ( peptideIsUnique ) {
                    uniquePeptideCount++;
                }
            }

            protein_SubItem.uniquePeptideCount = uniquePeptideCount;
        }
    }
}



////

/**
 *
 */
const _sortProteinList = function(
    {
        proteinDisplayData
    }: {

        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    }) {

    proteinDisplayData.proteinList.sort( proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compare_2_ProteinListEntries );
}
