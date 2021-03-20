/**
 * proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds.ts
 * 
 * Protein Sequence Widget - Get Sequence Coverage Boolean Array based on Filtered Reported Peptide Ids for project search ids
 * 
 *  !!!! React Version !!!!
 * 
 * Display Object used in: proteinSequenceWidgetDisplay_Component_React.tsx
 */

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";

/**
 * Get coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display
 * 
 */
export const getSequenceCoverageBooleanArray_ForReportedPeptideIds = function({ 
    
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    projectSearchIds
} : {
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    projectSearchIds : Array<number>
    
}) : Array<boolean> {


    const coverageArrayOfBoolean : Array<boolean> = [];

    //  Modification or Protein Sequence Positions Selected so compute sequence coverage

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );

        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            // No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for this projectSearchId so skip to next projectSearchId
            continue; //  EARLY CONTINUE
        }

        const reportedPeptideIdsForDisplay = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay({ 
            reportedPeptideIds : reportedPeptideIdsForDisplay, 
            loadedDataPerProjectSearchIdHolder, 
            proteinSequenceVersionId,
            coverageArrayOfBoolean //  Updated in the function
        } );
    }

    return coverageArrayOfBoolean;
}


/**
 * Update coverageArrayOfBoolean for Protein Sequence Coverage for the Reported Peptide Ids for Display.  
 * 
 */
const process_ProteinSequenceCoverage_Matching_ReportedPeptideIdsForDisplay = function({ 
    
    reportedPeptideIds, 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId,
    coverageArrayOfBoolean  //  Updated in this function
} : { 
    reportedPeptideIds : ReadonlySet<number>,
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId : number,
    coverageArrayOfBoolean : Array<boolean>
} ) : void {

    //  Sequence Coverage Data
    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
   
    if ( proteinCoverageObject ) {

        const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

        for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            for ( const reportedPeptideId of reportedPeptideIds ) {
                if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

                    for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
                        coverageArrayOfBoolean[ position ] = true;
                    }
                    break;
                }
            }
        }
    }
}
