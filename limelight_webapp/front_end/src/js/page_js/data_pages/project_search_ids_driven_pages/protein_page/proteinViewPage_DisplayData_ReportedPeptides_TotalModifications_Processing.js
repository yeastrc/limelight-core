/**
 * proteinViewPage_DisplayData_ReportedPeptides_TotalModifications_Processing.js
 * 
 * Javascript for proteinView.jsp page - Dynamic and Static Modifications combined - for Reported Peptides
 * 
 * Combines the Dynamic and Static Modifications for each reported peptide, also saves a rounded mass value
 *      and adds that to the same instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 * 
 * Resulting value in loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId():
 * 
 *      Map <integer,[Object,...] <reportedPeptideId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
 */


import { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString } from 'page_js/data_pages/modification_dynamic_static_combined_display_utils/modification_dynamic_static_combined_DisplayUtilities.js';

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
 * @param loadedDataCommonHolder
 * @param reportedPeptideIds 
 * @param projectSearchId 
 * 
 */
const computeTotalModifications_For_ReportedPeptides = function({ loadedDataPerProjectSearchIdHolder, loadedDataCommonHolder, reportedPeptideIds, projectSearchId }) {


    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();
    const staticModsForSearch = loadedDataPerProjectSearchIdHolder.get_staticMods();
    const peptideIdForReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_peptideIdForReportedPeptide_KeyReportedPeptideId();

    const peptideSequenceString_KeyPeptideId = loadedDataCommonHolder.get_peptideSequenceString_KeyPeptideId();

    if ( dynamicModificationsOnReportedPeptide_KeyReportedPeptideId 
        && staticModsForSearch 
        && peptideIdForReportedPeptide_KeyReportedPeptideId
        && peptideSequenceString_KeyPeptideId
        && reportedPeptideIds && reportedPeptideIds.length !== 0 ) {

        _computeTotalModifications_For_ReportedPeptides_Internal({ 
            dynamicModificationsOnReportedPeptide_KeyReportedPeptideId,
            staticModsForSearch,
            peptideIdForReportedPeptide_KeyReportedPeptideId,
            peptideSequenceString_KeyPeptideId,
            loadedDataPerProjectSearchIdHolder, 
            reportedPeptideIds, 
            projectSearchId
            });
    }
}

const _computeTotalModifications_For_ReportedPeptides_Internal = function({ 
    dynamicModificationsOnReportedPeptide_KeyReportedPeptideId,
    staticModsForSearch,
    peptideIdForReportedPeptide_KeyReportedPeptideId,
    peptideSequenceString_KeyPeptideId,
    loadedDataPerProjectSearchIdHolder, 
    reportedPeptideIds, 
    projectSearchId
  }) {

    let modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId();
    if ( ! modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId ) {
        modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = new Map();
        loadedDataPerProjectSearchIdHolder.set_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId( modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId );
    }

    for ( const reportedPeptideId of reportedPeptideIds ) {

        const modificationsCombinedAndRoundedOnReportedPeptide_FromMap = modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
        if ( modificationsCombinedAndRoundedOnReportedPeptide_FromMap ) {
            //  already computed data so skip
            continue; // EARLY CONTINUE
        }

        const peptideId = peptideIdForReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
        if ( peptideId === undefined ) {
            throw Error("No Peptide id for reported peptide id: " + reportedPeptideId + ", projectSearchId: " + projectSearchId )
        }
        const peptideSequenceString = peptideSequenceString_KeyPeptideId.get( peptideId );
        if ( peptideSequenceString === undefined ) {
            throw Error("No peptideSequenceString for peptideId: " + peptideId + ", reported peptide id: " + reportedPeptideId + ", projectSearchId: " + projectSearchId )
        }

        const dynamicModificationsOnReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );

        const totalDynamicStaticMassAtPeptideSequenceArray = new Array();
        modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId, totalDynamicStaticMassAtPeptideSequenceArray );

        const peptideSequenceAsArray = peptideSequenceString.split("");
        const peptideSequenceAsArrayLength = peptideSequenceAsArray.length;
        for ( let peptideSequenceIndex = 0; peptideSequenceIndex < peptideSequenceAsArrayLength; peptideSequenceIndex++ ) {

            const peptideSequencePosition = peptideSequenceIndex + 1; // position is 1 (one) based

            let totalDynamicStaticMassAtPosition = undefined;

            const peptideSequenceAtIndex = peptideSequenceAsArray[ peptideSequenceIndex ];

            for ( const staticMod of staticModsForSearch ) {
                if ( staticMod.residue === peptideSequenceAtIndex ) {

                    const mass = staticMod.mass;
                    if ( totalDynamicStaticMassAtPosition === undefined ) {
                        totalDynamicStaticMassAtPosition = 0;
                    }
                    totalDynamicStaticMassAtPosition += mass;
                }
            }

            if ( dynamicModificationsOnReportedPeptide ) {

                for ( const dynamicModification of dynamicModificationsOnReportedPeptide ) {

                    if ( peptideSequencePosition === dynamicModification.position ) {

                        const mass = dynamicModification.mass;
                        if ( totalDynamicStaticMassAtPosition === undefined ) {
                            totalDynamicStaticMassAtPosition = 0;
                        }
                        totalDynamicStaticMassAtPosition += mass;
                    }
                }
            }
            if ( totalDynamicStaticMassAtPosition !== undefined ) {
                //  Have a mass so store it
                const totalDynamicStaticMassRounded = modificationMass_CommonRounding_ReturnNumber( totalDynamicStaticMassAtPosition );
                const totalDynamicStaticMassRoundedString = modificationMass_CommonRounding_ReturnString( totalDynamicStaticMassAtPosition );
                const mass = totalDynamicStaticMassRounded; // to match dynamic modification mass data
                const entry = { position : peptideSequencePosition, mass, totalDynamicStaticMass : totalDynamicStaticMassAtPosition, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString };
                totalDynamicStaticMassAtPeptideSequenceArray.push( entry );
            }
        }
    }
}

export { computeTotalModifications_For_ReportedPeptides }
