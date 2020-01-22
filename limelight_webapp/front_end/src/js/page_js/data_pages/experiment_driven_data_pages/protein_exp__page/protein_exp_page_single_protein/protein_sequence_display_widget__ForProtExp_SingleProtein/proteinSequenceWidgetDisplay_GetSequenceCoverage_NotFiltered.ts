/**
 * proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered.ts
 * 
 * Protein Sequence Widget - Get Sequence Coverage Boolean Array based on All Reported Peptide Ids for project search ids that meet cutoffs / main filters
 * 
 *  !!!! React Version !!!!
 * 
 * Display Object used in: proteinSequenceWidgetDisplay_Component_React.tsx
 */

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


/**
 * Get coverageArrayOfBoolean for Protein Sequence Coverage Based on cutoffs / main filters
 * 
 */
export const getSequenceCoverageBooleanArray_NotFiltered = function({ 
    
    proteinSequenceVersionId,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    projectSearchIds
} : { 
    proteinSequenceVersionId : number,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    projectSearchIds : Array<number>
    
}) : Array<boolean> {

    const coverageArrayOfBoolean : Array<boolean> = [];

    //  Modification or Protein Sequence Positions Selected so compute sequence coverage

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        //  Sequence Coverage Data
        const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

        //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
        const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! proteinCoverageObject ) {
            // No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
            continue; //  EARLY CONTINUE
        }

        const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();
        
        for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
            if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
                coverageArrayOfBoolean[ index ] = true;
            }
        }
    }

    return coverageArrayOfBoolean;
}
