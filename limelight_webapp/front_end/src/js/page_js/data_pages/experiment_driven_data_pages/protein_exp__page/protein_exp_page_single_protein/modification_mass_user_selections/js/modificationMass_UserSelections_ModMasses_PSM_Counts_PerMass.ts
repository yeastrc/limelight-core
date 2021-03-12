/**
 * modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.ts
 *
 * Variable or Open Modification Mass Selection - Compute Mod Masses and their PSM Counts
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {modificationMass_CommonRounding_ReturnNumber_Function} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";


//  At Bottom of file:

//      export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass {

//          static  create... = create...

/**
 *
 */
export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result {
    entries: Array<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_ResultEntry>
}

/**
 *
 */
class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_ResultEntry {
    mass : number
    psmCount: number
}

////////////

/**
 * Create Variable Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const createModsAndPsmCountsList_VariableModifications = function (
    {
        proteinSequenceVersionId,  //  Not populated on Peptide page
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number  //  Not populated on Peptide page
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result {

    //    For Overlay
    //  Unique Mod masses And their PSM Counts for the protein or selected positions 
    const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            //   Only process a const reportedPeptideId / ModMass (PossiblyRounded) Combination so only process once
            const reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed = new Map<number,Set<number>>();

            const modificationsOnProtein_KeyProteinSequenceVersionId : Map<number, {mass: number, reportedPeptideId: number}[]> =
                loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

                if ( modificationsOnProtein ) {

                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

                        const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        let mass = modificationOnProtein.mass;

                        if ( modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using

                            //  Used in multiple searches to round the modification mass
                            mass = modificationMass_CommonRounding_ReturnNumber( mass );
                        }

                        {
                            let modMass_PossiblyRounded_Set = reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.get(reportedPeptideId);
                            if ( ! modMass_PossiblyRounded_Set ) {
                                modMass_PossiblyRounded_Set = new Set();
                                reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.set(reportedPeptideId, modMass_PossiblyRounded_Set);
                            } else {
                                if ( modMass_PossiblyRounded_Set.has( mass ) ) {
                                    //  reportedPeptideId / mass  combination has already been processed so skip

                                    continue; // EARLY CONTINUE
                                }
                            }
                            modMass_PossiblyRounded_Set.add( mass ); //  Add to processed
                        }

                        const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                        if ( ! numPsmsForReportedPeptideId ) {
                            throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", proteinSequenceVersionId: " + proteinSequenceVersionId );
                        }

                        let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                        if ( ! modMassPsmCount ) {
                            modMassPsmCount = { mass: mass, psmCount : 0 };
                            modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                        }
                        modMassPsmCount.psmCount += numPsmsForReportedPeptideId;

                    }
                }
            }

        } else {

            //  NO proteinSequenceVersionId

            //   Only process a const reportedPeptideId / ModMass (PossiblyRounded) Combination so only process once
            const reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed = new Map<number,Set<number>>();

            const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
            const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()

            for ( const reportedPeptideId of reportedPeptideIds ) {

                const dynamicModificationsOnReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId )
                if ( ! dynamicModificationsOnReportedPeptide ) {

                    continue // EARLY CONTINUE
                }

                for ( const dynamicModificationEntry of dynamicModificationsOnReportedPeptide ) {

                    const reportedPeptideId = dynamicModificationEntry.reportedPeptideId;

                    let mass = dynamicModificationEntry.mass;

                    if ( modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using

                        //  Used in multiple searches to round the modification mass
                        mass = modificationMass_CommonRounding_ReturnNumber( mass );
                    }

                    {
                        let modMass_PossiblyRounded_Set = reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.get(reportedPeptideId);
                        if ( ! modMass_PossiblyRounded_Set ) {
                            modMass_PossiblyRounded_Set = new Set();
                            reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.set(reportedPeptideId, modMass_PossiblyRounded_Set);
                        } else {
                            if ( modMass_PossiblyRounded_Set.has( mass ) ) {
                                //  reportedPeptideId / mass  combination has already been processed so skip

                                continue; // EARLY CONTINUE
                            }
                        }
                        modMass_PossiblyRounded_Set.add( mass ); //  Add to processed
                    }

                    const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                    if ( ! numPsmsForReportedPeptideId ) {
                        throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", not filtered on protein id" );
                    }

                    let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                    if ( ! modMassPsmCount ) {
                        modMassPsmCount = { mass: mass, psmCount : 0 };
                        modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                    }
                    modMassPsmCount.psmCount += numPsmsForReportedPeptideId;
                }
            }
        }
    }

    const modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = []; // {mass, psmCount}

    for ( const entry of modUniqueMassesWithTheirPsmCountsMap.entries() ) {
        modUniqueMassesWithTheirPsmCountsArray.push( entry[ 1 ] );  // Put 'value' of Map entry into Array
    }

//  Sort on masses
    modUniqueMassesWithTheirPsmCountsArray.sort( function(a, b) {
        if ( a.mass < b.mass ) {
            return -1;
        }
        if ( a.mass > b.mass ) {
            return 1;
        }
        return 0;
    });

    return { entries: modUniqueMassesWithTheirPsmCountsArray };
}

////////////

/**
 * Create Open Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const createModsAndPsmCountsList_OpenModifications = function (
    {
        proteinSequenceVersionId,  //  Not populated on Peptide page
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number  //  Not populated on Peptide page
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result {

    //    For Overlay
    //  Unique Mod masses And their PSM Counts for the protein or selected positions
    const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs()
        if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap ) {

            //  No Open Mods for this search so skip search

            continue // EARLY CONTINUE
        }

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            const modificationsOnProtein_KeyProteinSequenceVersionId : Map<number, {mass: number, reportedPeptideId: number}[]> = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

                if ( modificationsOnProtein ) {
                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                        // const position = modificationOnProtein.position;
                        let mass = modificationOnProtein.mass;

                        //  No Mass rounding since for Open Mod all mass at Reported Peptide level have been rounded to whole number

                        let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                        if ( ! modMassPsmCount ) {
                            modMassPsmCount = { mass: mass, psmCount : 0 };
                            modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                        }

                        const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap.get( reportedPeptideId )
                        if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject ) {

                            continue // EARLY CONTINUE
                        }

                        const psmOpenModificationMasses_PsmIdSetObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject.openModificationMass_RoundedMap.get( mass )
                        if ( ! psmOpenModificationMasses_PsmIdSetObject ) {

                            continue // EARLY CONTINUE
                        }

                        const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSetObject.psmIds_Set


                        modMassPsmCount.psmCount += psmOpenModificationMasses_PsmIdSet.size;

                    }
                }
            }
        } else {

            // NO proteinSequenceVersionId

            const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
            const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()

            for ( const reportedPeptideId of reportedPeptideIds ) {

                const psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap.get( reportedPeptideId )
                if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject ) {

                    continue // EARLY CONTINUE
                }

                const openModificationsOnReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
                if ( ! openModificationsOnReportedPeptide ) {

                    continue // EARLY CONTINUE
                }

                for ( const openModificationEntry of openModificationsOnReportedPeptide ) {

                    const mass = openModificationEntry.mass

                    const psmOpenModificationMasses_PsmIdSetObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject.openModificationMass_RoundedMap.get( mass )
                    if ( ! psmOpenModificationMasses_PsmIdSetObject ) {

                        continue // EARLY CONTINUE
                    }

                    const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSetObject.psmIds_Set

                    //  No Mass rounding since for Open Mod all mass at Reported Peptide level have been rounded to whole number

                    let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                    if ( ! modMassPsmCount ) {
                        modMassPsmCount = { mass: mass, psmCount : 0 };
                        modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                    }

                    modMassPsmCount.psmCount += psmOpenModificationMasses_PsmIdSet.size;
                }
            }
        }
    }

    const modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = []; // {mass, psmCount}

    for ( const entry of modUniqueMassesWithTheirPsmCountsMap.entries() ) {
        modUniqueMassesWithTheirPsmCountsArray.push( entry[ 1 ] );  // Put 'value' of Map entry into Array
    }

//  Sort on masses
    modUniqueMassesWithTheirPsmCountsArray.sort( function(a, b) {
        if ( a.mass < b.mass ) {
            return -1;
        }
        if ( a.mass > b.mass ) {
            return 1;
        }
        return 0;
    });

    return { entries: modUniqueMassesWithTheirPsmCountsArray };
}


export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass {

    static createModsAndPsmCountsList_VariableModifications = createModsAndPsmCountsList_VariableModifications
    static createModsAndPsmCountsList_OpenModifications = createModsAndPsmCountsList_OpenModifications;
}