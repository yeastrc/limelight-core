


export class ModViewDataUtilities {

    /**
     * Take in the mod data and get back a object suitable for serialization
     * to JSON for retriving the residue present in positions in proteins.
     * in the form of: { protein_sequence_version_id : [ pos, pos, pos, pos ], ... }
     * @param {modData} param0 
     */
    static getProteinsAndPositionsFromModData( { modData } ) {

        let returnObject = { };

        if( !modData ) {
            throw Error( "No modData in call to getProteinsAndPositionsFromModData()" );
        }

        for (let reportedPeptideId of Object.keys(modData.reportedPeptides)) {

            for (let modMass of Object.keys(modData.reportedPeptides[reportedPeptideId])) {

                for (let proteinSequenceVersionId of Object.keys(modData.reportedPeptides[reportedPeptideId][modMass]['proteins'])) {

                    if( !(proteinSequenceVersionId in returnObject) ) {
                        returnObject[ proteinSequenceVersionId ] = new Set();
                    }

                    for (let proteinPosition of modData.reportedPeptides[reportedPeptideId][modMass]['proteins'][proteinSequenceVersionId]) {
                        returnObject[ proteinSequenceVersionId ].add( proteinPosition );
                    }
                }
            }
        }

        // convert Sets to arrays
        for (let proteinSequenceVersionId of Object.keys(returnObject)) {
            returnObject[ proteinSequenceVersionId ] = Array.from( returnObject[ proteinSequenceVersionId ] );
        }

        return returnObject;
    }

    /**
     * Get the number of distinct mods reported for this search.
     * 
     * @param {*} param0 
     */
    static getModCount( { reportedPeptideModData, proteinPositionFilterStateManager } ) {
        return ModViewDataUtilities.getUniqueModMasses( { reportedPeptideModData, proteinPositionFilterStateManager } ).length;
    }

        /**
     * Get the number of distinct mods reported for this search.
     * 
     * @param {*} param0 
     */
    static getUniqueModMasses( { reportedPeptideModData, proteinPositionFilterStateManager } ) {

        let uniqueModMasses = new Set();

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {

            for (let modMass of Object.keys(reportedPeptideModData[reportedPeptideId])) {

                if( !proteinPositionFilterStateManager.getNoProteinsSelected() ) {

                    let shouldCountModMass = false;

                    for( let proteinId of Object.keys(reportedPeptideModData[reportedPeptideId][ modMass ][ 'proteins' ]  ) ) {

                        if( !proteinPositionFilterStateManager.getIsProteinSelected( { proteinId } ) ) {
                            continue;
                        }

                        for( let position of reportedPeptideModData[reportedPeptideId][ modMass ][ 'proteins' ][ proteinId ] ) {

                            if( proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } ) ) {
                                shouldCountModMass = true;
                                break;
                            }

                        }

                        if( shouldCountModMass ) { break; }
                    }

                    if( shouldCountModMass ) {
                        uniqueModMasses.add( modMass );
                    }

                } else {
                    uniqueModMasses.add( modMass );
                }
            }
        }

        return Array.from( uniqueModMasses );
    }

    /**
     * Get the distinct residues from the proteinPositionResidues object which has form:
     *
     * {  
     *  protein_sequence_version_id :  { position : letter , position : letter },
     *  protein_sequence_version_id :  { position : letter , position : letter },
     *  protein_sequence_version_id :  { position : letter , position : letter },
     *  protein_sequence_version_id :  { position : letter , position : letter },
     *  protein_sequence_version_id :  { position : letter , position : letter },
     *
     *  },
     *  foundAllProteinSequenceVersionIdsForProjectSearchIds : true
     *
     *  }
     * 
     * 
     * @param {*} param0 
     */
    static getDistinctResiduesFromProteinPositionResidues( { proteinPositionResidues } ) {

        let returnObject = new Set();


        Object.keys( proteinPositionResidues ).forEach(function( proteinSequenceVersionId ) {
            Object.keys( proteinPositionResidues[ proteinSequenceVersionId ] ).forEach(function( position ) {
                returnObject.add( proteinPositionResidues[ proteinSequenceVersionId ][ position ] );
            });
        });

        return Array.from( returnObject );
    }

    static getTotalInstancesOfModdedResiduesInAllPSMs( { residues, modMass, reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } ) {

        let totalCount = 0;

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {

        //for (let reportedPeptideId of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            let totalPositionsModified = 0;     // total positions modified in this reported peptide
                                                // that is one of the passed in residues and the passed
                                                // in mod mass.

            if( reportedPeptideModData[reportedPeptideId][ modMass ] ) {

                for (let proteinSequenceVersionId of Object.keys(reportedPeptideModData[reportedPeptideId][modMass]['proteins'])) {

                    for (let proteinPosition of reportedPeptideModData[reportedPeptideId][modMass]['proteins'][proteinSequenceVersionId]) {
                        
                        if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId : proteinSequenceVersionId, position : proteinPosition } ) ) {

                            if( residues.includes( proteinPositionResidues[ proteinSequenceVersionId ][ proteinPosition ] ) ) {

                                // correct mod mass and correct residue
                                totalPositionsModified++;
                            }
                        }
                    }

                    //break only need to do one protein
                    break;
                 }
            }

            totalCount += ( totalPositionsModified * aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ] );
        }

        return totalCount;
    }

    static getTotalInstancesOfModifiedResiduesForProtein( { modMass, residues, proteinId, reportedPeptideModData, aminoAcidModStats, proteinPositionResidues, proteinPositionFilterStateManager } ) {

        let totalCount = 0;

        for (let reportedPeptideId_Entry of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            const reportedPeptideId : any = reportedPeptideId_Entry as any

            let totalPositionsModified = 0;     // total positions modified in this reported peptide
                                                // that is one of the passed in residues and the passed
                                                // in mod mass.

            if( reportedPeptideModData[reportedPeptideId][ modMass ] && reportedPeptideModData[reportedPeptideId][ modMass ][ 'proteins' ][ proteinId ] ) {

                    for (let proteinPosition of reportedPeptideModData[reportedPeptideId][modMass]['proteins'][proteinId]) {
                        
                        if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position : proteinPosition } ) ) {

                            if( residues.includes( proteinPositionResidues[ proteinId ][ proteinPosition ] ) ) {

                                // correct mod mass and correct residue
                                totalPositionsModified++;
                            }
                        }
                 }
            }

            totalCount += ( totalPositionsModified * aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ] );
        }

        return totalCount;
    }

    static getTotalInstancesOfModdableResiduesForProtein( { residues, proteinId, aminoAcidModStats, cacheObject } ) {

        let count = 0;

        for (let reportedPeptideId of Object.keys(aminoAcidModStats)) {

            if( aminoAcidModStats[ reportedPeptideId ][ 'proteinSequenceVersionIdsPeptidePositions' ][ proteinId ] ) {

                let perResidueCountTotal = 0;

                for (let residue of residues) {

                    let perResidueCounts = aminoAcidModStats[ reportedPeptideId ][ 'perResidueCounts' ];

                    if( perResidueCounts[ residue ] ) {
                        perResidueCountTotal += perResidueCounts[ residue ];
                    }
                }

                let psmCount = aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ];
                count += ( perResidueCountTotal * psmCount );
            }

        };

        return count;
    }

    static getTotalInstancesOfResiduesInAllPSMs( { residues, aminoAcidModStats, cacheObject } ) {

        residues.sort();    // ensure consistent ordering because of how maps work
        let cacheKey = residues.join();
        if( cacheObject[ cacheKey ] ) {
            return cacheObject[ cacheKey ];
        }

        let count = 0;

        Object.keys( aminoAcidModStats ).forEach(function( reportedPeptideId ) {

            let perResidueCountTotal = 0;

            for (let residue of residues) {

                let perResidueCounts = aminoAcidModStats[ reportedPeptideId ][ 'perResidueCounts' ];

                if( perResidueCounts[ residue ] ) {
                    perResidueCountTotal += perResidueCounts[ residue ];
                }
            }

            let psmCount = aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ];
            count += ( perResidueCountTotal * psmCount );

        });

        cacheObject[ cacheKey ] = count;
        return count;
    }

    /**
     * Get total PSM count for *all* distinct reported peptides containing
     * any of these residues in this search. A given PSM (a peptide matched by a spectrum)
     * will only ever be counted once, so a PSM containing more than one
     * of the supplied residues will count as one.
     * 
     * @param {*} param0 
     */
    static getTotalPSMCountContainingResidues( { residues,aminoAcidModStats,cacheObject } ) {

        residues.sort();    // ensure consistent ordering because of how maps work
        let cacheKey = residues.join();
        if( cacheObject[ cacheKey ] ) {
            return cacheObject[ cacheKey ];
        }

        let psmCount = 0;

        Object.keys( aminoAcidModStats ).forEach(function( reportedPeptideId ) {

            let perResidueCounts = aminoAcidModStats[ reportedPeptideId ][ 'perResidueCounts' ];

            if( ModViewDataUtilities.objectKeysContainsResidue( { residues, perResidueCounts } ) ) {
                psmCount += aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ];
            }
        });


        cacheObject[ cacheKey ] =  psmCount ;
        return psmCount;
    }

    
    static objectKeysContainsResidue( { residues, perResidueCounts } ) {

        let foundIt = false;

        for (let residue of Object.keys(perResidueCounts)) {
            if( residues.includes( residue ) ) {
                return true;
            }
        }
        
        return false;
    }


    /**
     * Get a formatted number suitable for display on web. If less than
     * 0.01, use scientific notation with 2 decimal places. Otherwise, round
     * to two decimal places.
     * 
     * @param {*} decimalNumber 
     */
    static getFormattedDecimal( decimalNumber ) {

        if( decimalNumber < 0.01 ) {
            return decimalNumber.toExponential( 2 );
        } else {
            return Math.round(decimalNumber * 100) / 100;
        }

    }

    /**
     * Get the number of distinct protein sequence version ids that have
     * that were matched by a reported peptide with this mod mass.
     * 
     * @param {*} param0 
     */
    static getProteinCountForModMass( {modMass, reportedPeptideModData, proteinPositionFilterStateManager } ) {

        let uniqueProteinIds = new Set();

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {
        //for ( let reportedPeptideId of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            for (let rpModMass of Object.keys(reportedPeptideModData[reportedPeptideId])) {

                if( rpModMass == modMass ) {
                    for (let proteinSequenceVersionId of Object.keys(reportedPeptideModData[reportedPeptideId][modMass]['proteins'])) {
                        if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinSelected( { proteinId : proteinSequenceVersionId } ) ) {
                            uniqueProteinIds.add( proteinSequenceVersionId );
                        }
                    }
                }
            }
        }

        return uniqueProteinIds.size;
    }

    /**
     * Get the number of distinct reported peptide ids found to have this
     * mod mass.
     * 
     * @param {*} param0 
     */
    static getPeptideCountForModMass( {modMass, reportedPeptideModData, proteinId, proteinPosition, proteinPositionFilterStateManager } ) {

        let count = 0;

        //for ( let reportedPeptideId of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {
        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                if( proteinId ) {
                    if( ModViewDataUtilities.reportedPeptideMatchesProteinForModMass( { reportedPeptideModData, modMass, proteinId, reportedPeptideId, proteinPosition, proteinPositionFilterStateManager } ) ) {
                        count++;
                    }

                } else if( ModViewDataUtilities.getReportedPeptideModMassHasValidFilteredProtein ( { reportedPeptideModData, reportedPeptideId, modMass, proteinPositionFilterStateManager } ) ) {
                    count++;
                }
            }
        }

        return count;
    }

    /**
     * Return true if the given reported peptide maps to the given protein with the given mod mass (and at the
     * given protein position, if provided)
     * @param {*} param0 
     */
    static reportedPeptideMatchesProteinForModMass( { reportedPeptideModData, modMass, proteinId, reportedPeptideId, proteinPosition, proteinPositionFilterStateManager } ) {

        if( reportedPeptideModData[reportedPeptideId][modMass] ) {

            if( Object.keys(reportedPeptideModData[reportedPeptideId][modMass]['proteins'] ).map( function(a) { return parseInt( a ); }).includes( parseInt( proteinId ) ) ) {

                if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionArraySelected( { proteinId, proteinPositionArray : reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ] } ) ) {

                    if( proteinPosition ) {

                        if( reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ].includes( parseInt( proteinPosition ) ) ) {

                            return true;
                        }

                        return false;   // position doesn't match
                    }

                    return true;    // no position provided, protein matches
                }
            }

        }

        return false;
    }

    static getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) {

        if( proteinPositionFilterStateManager.getNoProteinsSelected() ) {
            return Object.keys( reportedPeptideModData );
        }

        let reportedPeptideIds = new Set();

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {

            let valid = false;

            for( let modMass of Object.keys(reportedPeptideModData[ reportedPeptideId ] ) ) {

                for (let proteinId of Object.keys(reportedPeptideModData[reportedPeptideId][modMass] [ 'proteins' ] ) ) {

                    for( let position of reportedPeptideModData[reportedPeptideId][modMass] [ 'proteins' ][ proteinId ] ) {

                        if( proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } ) ) {
                            reportedPeptideIds.add( reportedPeptideId );
                            valid = true;
                            break;
                        }
                    }

                    if( valid ) { break; }  // reported peptide already added, skip rest of protein Ids
                }

                if( valid ) { break; } // reported peptide already added, skip rest of protein mod masses
            }
        }

        return Array.from( reportedPeptideIds );
    }

    static getAllReportedPeptidesForModMass( { reportedPeptideModData, modMass, proteinId, proteinPosition, proteinPositionFilterStateManager } ) {
        let reportedPeptideIdSet = new Set();

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {
        //for (let reportedPeptideId of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                if( proteinId ) {
                    if( ModViewDataUtilities.reportedPeptideMatchesProteinForModMass( { reportedPeptideModData, modMass, proteinId, reportedPeptideId, proteinPosition, proteinPositionFilterStateManager } ) ) {
                        reportedPeptideIdSet.add( reportedPeptideId );
                    }
                } else if( ModViewDataUtilities.getReportedPeptideModMassHasValidFilteredProtein ( { reportedPeptideModData, reportedPeptideId, modMass, proteinPositionFilterStateManager } ) ) {
                    reportedPeptideIdSet.add( reportedPeptideId );
                }
            }
        }

        return reportedPeptideIdSet;
    }

    /**
     * Return true if the supplied reported peptide and mod mass has any valid protein/position combination
     * given the protein position filters.
     * 
     * @param {*} param0 
     */
    static getReportedPeptideModMassHasValidFilteredProtein( { reportedPeptideModData, reportedPeptideId, modMass, proteinPositionFilterStateManager } ) {

        if( reportedPeptideModData[ reportedPeptideId ] === undefined ) { return false; }
        if( reportedPeptideModData[ reportedPeptideId ][ modMass ] === undefined ) { return false; }

        for( let proteinId of Object.keys( reportedPeptideModData[ reportedPeptideId ][ modMass ][ 'proteins' ] ) ) {
            if( ModViewDataUtilities.reportedPeptideMatchesProteinForModMass( { reportedPeptideModData, modMass, proteinId, reportedPeptideId, proteinPositionFilterStateManager, proteinPosition : undefined } ) ) {
                return true;
            }
        }
    }

    /**
     * Look through all reported peptides (not just modded ones) and find total number of PSMs
     * that contain any of the supplied residues that mapped to the supplied protein
     * 
     * @param {*} param0 
     */
    static getTotalPSMsContainingResiduesForProtein( { residues, proteinId, aminoAcidModStats } ) {

        let psmCount = 0;

        for (let reportedPeptideId of Object.keys(aminoAcidModStats)) {

            if( aminoAcidModStats[ reportedPeptideId ][ 'proteinSequenceVersionIdsPeptidePositions' ][ proteinId ] ) {

                for (let tresidue of Object.keys(aminoAcidModStats[ reportedPeptideId ][ 'perResidueCounts' ] ) ) {
                    if( residues.indexOf( tresidue ) != -1 ) {

                        psmCount += aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ];

                        break;  // do not test more residues if we already have a match
                    }
                }
            }
        }

        return psmCount;
    }

    /**
     * Get the number of distinct peptide spectrum matches that contain the given mod mass.
     * 
     * If proteinId is defined, only PSM counts for the supplied mod mass for that protein will be counted
     * 
     * @param {*} param0 
     */
    static getPSMCountForModMass( {modMass, reportedPeptideModData, aminoAcidModStats, proteinId, proteinPosition, proteinPositionFilterStateManager } ) {

        let reportedPeptideIdSet = ModViewDataUtilities.getAllReportedPeptidesForModMass ({ reportedPeptideModData, modMass, proteinId, proteinPosition, proteinPositionFilterStateManager });

        return ModViewDataUtilities.getPSMCountForReportedPeptideIds( { reportedPeptideIds : Array.from( reportedPeptideIdSet ), aminoAcidModStats } );
    }

    /**
     * Get the PSM count for the given array of reported peptide ids.
     * 
     * @param {*} param0 
     */
    static getPSMCountForReportedPeptideIds( { reportedPeptideIds, aminoAcidModStats }) {

        let psmCount = 0;

        for (let reportedPeptideId of reportedPeptideIds) {
            
            if( aminoAcidModStats[ reportedPeptideId ] ) {
                psmCount += aminoAcidModStats[ reportedPeptideId ][ 'psmCount' ];
            } else {
                console.log( 'WARNING: No psm count for reported peptide id: ' + reportedPeptideId );
            }
        }
        
        return psmCount;
    }

    /**
     * Get an array of amino acid codes (e.g., ['C','S']) modified by the given mod mass in the supplied
     * experimental context
     * @param {*} param0 
     */
    static getResiduesForModMass( {modMass, reportedPeptideModData, proteinPositionResidues, proteinId, proteinPositionFilterStateManager } ) {

        let residues = new Set();

        for (let reportedPeptideId of Object.keys(reportedPeptideModData)) {
        //for ( let reportedPeptideId of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                for (let proteinSequenceVersionId of Object.keys(reportedPeptideModData[reportedPeptideId][modMass]['proteins'])) {

                    if( proteinId && proteinId != proteinSequenceVersionId ) { continue; } // skip this if filtering on proteinId

                    for (let proteinPosition of reportedPeptideModData[reportedPeptideId][modMass]['proteins'][proteinSequenceVersionId]) {       

                        if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId : proteinSequenceVersionId, position : proteinPosition } ) ) {
                            residues.add( proteinPositionResidues[ proteinSequenceVersionId ][ proteinPosition ] );
                        }
                    }
                }
            }
        }

        return Array.from( residues );
    }

    static getProteinIdSetForModMass( { modMass, reportedPeptideModData, proteinPositionFilterStateManager } ) {

        let proteinIds = new Set();

        for (let reportedPeptideId_Entry of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            const reportedPeptideId : any = reportedPeptideId_Entry as any

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                for (let proteinSequenceVersionId of Object.keys(reportedPeptideModData[reportedPeptideId][modMass]['proteins'])) {

                    if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionArraySelected( { proteinId : proteinSequenceVersionId, proteinPositionArray : reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinSequenceVersionId ] } ) ) {
                        proteinIds.add( proteinSequenceVersionId );
                    }

                }
            }
        }

        return proteinIds;
    }

    static getReportedPeptidesForProteinAndModMass({ modMass, proteinId, reportedPeptideModData, proteinPosition, proteinPositionFilterStateManager }) {

        let reportedPeptideIds = new Set();

        for (let reportedPeptideId_Entry of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            const reportedPeptideId : any = reportedPeptideId_Entry as any

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                if( reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ] ) {

                    if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionArraySelected( { proteinId, proteinPositionArray : reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ] } ) ) {

                        if( proteinPosition ) {

                            if( reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ].map( function(a) { return parseInt(a); } ).includes( parseInt( proteinPosition ) ) ) {
                                
                                reportedPeptideIds.add( reportedPeptideId );
                            }

                        } else {

                            reportedPeptideIds.add( reportedPeptideId );
                        }
                    }
                }
            }
        }

        return reportedPeptideIds;
    }

    /**
     * Get a sorted array of integers that are the positions in the given proteinId that are modified
     * with the given mod mass.
     * 
     * @param {*} param0 
     */
    static getPositionsModifiedInProteinForModMass({ modMass, proteinId, reportedPeptideModData, proteinPositionFilterStateManager } ) {

        let positions = new Set<number>();

        for (let reportedPeptideId_Entry of ModViewDataUtilities.getFilteredReportedPeptideIds( { reportedPeptideModData, proteinPositionFilterStateManager } ) ) {

            const reportedPeptideId : any = reportedPeptideId_Entry as any

            if( reportedPeptideModData[reportedPeptideId][modMass] ) {

                if( reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ] ) {

                    for( let position of reportedPeptideModData[reportedPeptideId][modMass]['proteins'][ proteinId ] ) {

                        if( proteinPositionFilterStateManager.getNoProteinsSelected() || proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } ) ) {
                            positions.add( parseInt( position ) );
                        }
                    }
                }
            }
        }

        let positionsArray = Array.from( positions );
        positionsArray.sort( function(a,b) {
            return a-b;
        });

        return positionsArray;
    }

}