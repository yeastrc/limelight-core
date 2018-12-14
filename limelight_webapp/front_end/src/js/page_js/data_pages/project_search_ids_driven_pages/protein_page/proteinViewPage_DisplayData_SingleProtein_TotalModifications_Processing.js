/**
 * proteinViewPage_DisplayData_SingleProtein_TotalModifications_Processing.js
 * 
 * Kind of like proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js but for Dynamic and Static Modifications combined on the Reported Peptides
 * 
 * Javascript for proteinView.jsp page - Dynamic and Static Modifications combined - Used on Multiple Search page
 * 
 * Combines those Dynamic and Static Modifications combined for the Protein Sequence Version Id
 *      and adds that to the same instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */

 import { computeTotalModifications_For_ReportedPeptides } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_ReportedPeptides_TotalModifications_Processing.js';


/**
 * Take:
 *   ProteinSequenceCoverage Per Protein Sequence VersionId 
 *   Modification per Reported Peptide Id
 *   Peptide Sequence
 *   Static Mods
 * 
 *   and create Dynamic and Static Modifications combined per Reported Peptide Id
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param proteinSequenceVersionId 
 * @param projectSearchId 
 * 
 * @returns null or Promise that resolves when loadedDataPerProjectSearchIdHolder is updated 
 *          with Dynamic Modifications for parameter Reported Peptide Ids 
 *          returns null if no data needs loading
 */
const getTotalModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = function({ loadedDataPerProjectSearchIdHolder, loadedDataCommonHolder, proteinSequenceVersionId, projectSearchId }) {

    //  First check if Combined Dynamic and Static Modifications for Protein already computed and stored
    const modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();
    if ( modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId !== undefined ) {
        if ( modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId.has( proteinSequenceVersionId ) ) {
            return; //  EARLY EXIT
        }
    }

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
        //  No reportedPeptideIdsKeyProteinSequenceVersionId for this projectSearchId
        return; //  EARLY EXIT
    }

    //  reportedPeptideIds for this proteinSequenceVersionId
    const reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );

    if ( ! reportedPeptideIds_For_proteinSequenceVersionId ) {
        //  No Reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId
        return; //  EARLY EXIT
    }

    // computeTotalModifications_For_ReportedPeptides(...): Resulting value in loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId():
    //
    //     Map <integer,Map<integer,Object> <reportedPeptideId,Map<position, {position, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }>>

    // External function
    computeTotalModifications_For_ReportedPeptides({ loadedDataPerProjectSearchIdHolder, loadedDataCommonHolder, reportedPeptideIds : reportedPeptideIds_For_proteinSequenceVersionId, projectSearchId });

    //  Local function
    _combine_CombinedDynamicStaticModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
}


/**
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Dynamic Modification per Reported Peptide Id
 *   and create Dynamic Modifications Per proteinSequenceVersionId
 * 
 * Map the Combined Dynamic and Static Modifications (Rounded) to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * 
 * Updates input parameter property from loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId()
 * 
 *    to contain: Map<proteinSequenceVersionId, [{ mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString, positionOnProtein, reportedPeptideId }]>
 *          property 'mass' is the same as totalDynamicStaticMassRounded, it is populated since other code expects it to be there and is what is displayed.
 *      One entry in the array for each combination of the properties.
 */
const _combine_CombinedDynamicStaticModificationsForRepPeptIds_AndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder,
    proteinSequenceVersionId }) {

        //  Param reportedPeptideIds_For_proteinSequenceVersionId not needed here since working from protein coverage for protein
        //              - proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array()

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
    const modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId();
    
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinCoverageObject === undefined ) {
        //  No proteinCoverageObject so no Reported Peptide Ids for this proteinSequenceVersionId for this Project Search Id
        //  Probably should not get here since check for Reported Peptide Ids for this proteinSequenceVersionId in a different way in above function
        return;  //  EARLY EXIT
    }
    
    //  Add modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId to holder if not exist
    let modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();
    if ( ! modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId ) {
        modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = new Map();
        loadedDataPerProjectSearchIdHolder.set_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId( modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId );
    }

    const modificationsCombinedAndRoundedOnProtein = [];
    modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, modificationsCombinedAndRoundedOnProtein );
    
    const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

    if ( proteinCoverageEntries_PerReportedPeptideId_Array !== undefined ) {
        
        for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;
            const proteinStartPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinStartPosition;
            
            const modificationsCombinedAndRoundedOnReportedPeptideArray = modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( modificationsCombinedAndRoundedOnReportedPeptideArray ) {
                
                //  Have combined Dynamic and Static Modifications for this reportedPeptideId
                for ( const modificationsCombinedAndRoundedOnReportedPeptideEntry of modificationsCombinedAndRoundedOnReportedPeptideArray ) {
                
                    const positionOnReportedPeptide = modificationsCombinedAndRoundedOnReportedPeptideEntry.position;

                    const mass = modificationsCombinedAndRoundedOnReportedPeptideEntry.totalDynamicStaticMassRounded; // the value to use in code expecting the 'mass' property to be populated

                    const positionOnProtein = positionOnReportedPeptide + proteinStartPosition - 1; // ( subtract 1 since proteinStartPosition is '1' based )
                                                
                    const modificationCombinedAndRoundedOnProtein = { 
                        mass : mass, position : positionOnProtein, reportedPeptideId : reportedPeptideId,
                        totalDynamicStaticMass : modificationsCombinedAndRoundedOnReportedPeptideEntry.totalDynamicStaticMass, 
                        totalDynamicStaticMassRounded : modificationsCombinedAndRoundedOnReportedPeptideEntry.totalDynamicStaticMassRounded,
                        totalDynamicStaticMassRoundedString : modificationsCombinedAndRoundedOnReportedPeptideEntry.totalDynamicStaticMassRoundedString
                     };
                    modificationsCombinedAndRoundedOnProtein.push( modificationCombinedAndRoundedOnProtein );
                }
            }
        }
        
    }

}


export { getTotalModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId }
