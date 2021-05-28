
import {ProteinGroup} from './ProteinGroup';

export class ProteinInferenceUtils {

    /**
     * Given a map of protein ids to peptide ids, return an array of all indistinguishable protein groups, where
     * each protein group contains the proteins identified by exactly the same peptides
     *
     * @param proteinPeptideMap
     */
    public static getProteinGroups({proteinPeptideMap}:{proteinPeptideMap:Map<number, Set<number|string>>}):Array<ProteinGroup> {

        let proteinGroupArray = new Array<ProteinGroup>();

        for (const[proteinId, peptideSet] of proteinPeptideMap) {

            let newProteinGroup = true;

            for (let proteinGroup of proteinGroupArray) {

                if(ProteinInferenceUtils.setsAreEqual(peptideSet, proteinGroup.peptides)) {
                    proteinGroup.addProtein(proteinId);
                    newProteinGroup = false;
                    break;
                }
            }

            if(newProteinGroup) {

                const proteinGroup = new ProteinGroup();
                proteinGroup.addProtein(proteinId);
                proteinGroup.peptides = peptideSet;
                proteinGroup.passesFilter = true;

                proteinGroupArray.push(proteinGroup);
            }

        }

        return proteinGroupArray;
    }


    /**
     * Given a map of protein ids to peptide ids:
     * get all protein groups, where each protein group is designated as either being part of the
     * parsimonious solution for the peptides or not.
     *
     * @param proteinPeptideMap
     */
    public static getParsimoniousProteinGroupsFromProteinPeptideMap({proteinPeptideMap}:{proteinPeptideMap:Map<number, Set<number|string>>}):Array<ProteinGroup> {
        return ProteinInferenceUtils.getParsimoniousGroupsFromProteinGroupMap({
            proteinGroups: ProteinInferenceUtils.getProteinGroups({ proteinPeptideMap})
        });
    }


    /**
     * Given a map of protein ids to peptide ids:
     * get all protein groups, where each protein group is designated as either being a non subset group
     * (passed filter set to true) or not. A non subset protein group is a protein group whose identifying
     * peptides are not wholly contained in the peptide set of another protein group.
     *
     * @param proteinPeptideMap
     */
    public static getNonSubsetProteinGroupsFromProteinPeptideMap({proteinPeptideMap}:{proteinPeptideMap:Map<number, Set<number|string>>}):Array<ProteinGroup> {

        return ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinGroupMap({
            proteinGroups: ProteinInferenceUtils.getProteinGroups({ proteinPeptideMap})
        });
    }


    /**
     * Given an array of protein groups, return:
     * all protein groups, where each protein group is designated as either being a non subset group
     * (passed filter set to true) or not. A non subset protein group is a protein group whose identifying
     * peptides are not wholly contained in the peptide set of another protein group.
     *
     * @param proteinGroups
     */
    private static getNonSubsetProteinGroupsFromProteinGroupMap({ proteinGroups }:{proteinGroups:Array<ProteinGroup>}):Array<ProteinGroup> {
        console.log('Calling getNonSubsetProteinGroupsFromProteinGroupMap()');

        let noSubsetProteinGroups = new Array<ProteinGroup>();
        let noSubsetCount = 0;

        for (let proteinGroup of proteinGroups) {

            let newProteinGroup = new ProteinGroup();
            newProteinGroup.proteins =  proteinGroup.proteins;
            newProteinGroup.peptides =  proteinGroup.peptides;
            newProteinGroup.passesFilter = !(ProteinInferenceUtils.proteinGroupIsSubset({proteinGroup, proteinGroups}));

            if(newProteinGroup.passesFilter) { noSubsetCount++; }

            noSubsetProteinGroups.push(newProteinGroup)
        }

        console.log("Got " + noSubsetCount + " groups that passed filter.");

        /* test: compare to parsimonious group */
        // const parsiGroups = ProteinInferenceUtils.getParsimoniousGroupsFromProteinGroupMap({proteinGroups});
        // for(let i = 0; i < parsiGroups.length; i++) {
        //     const pg = parsiGroups[i];
        //
        //     for( const nsg of noSubsetProteinGroups) {
        //         if(ProteinInferenceUtils.setsAreEqual(pg.proteins, nsg.proteins)) {
        //
        //             if (pg.passesFilter !== nsg.passesFilter) {
        //                 console.log('DIFFERENCE DETECTED');
        //                 console.log('parsi group', pg);
        //                 console.log('non subset group', nsg);
        //             }
        //         }
        //     }
        // }

        return noSubsetProteinGroups;
    }

    /**
     * Determine if the given protein group is a subset of any other protein group. A subset means that its
     * identifying peptides are wholly contained in the identifying peptides of another protein group.
     *
     * @param proteinGroup
     * @param proteinGroups
     */
    private static proteinGroupIsSubset({ proteinGroup, proteinGroups }:{ proteinGroup:ProteinGroup, proteinGroups:Array<ProteinGroup>}):boolean {

        for (const queryProteinGroup of proteinGroups) {
            if(ProteinInferenceUtils.setsAreEqual(proteinGroup.proteins, queryProteinGroup.proteins)) {
                continue;
            }

            if(ProteinInferenceUtils.isSubsetOf({ subset: proteinGroup.peptides, superset:queryProteinGroup.peptides })) {
                return true;
            }
        }

        return false;
    }

    private static getParsimoniousGroupsFromProteinGroupMap({ proteinGroups }:{proteinGroups:Array<ProteinGroup>}) {

        console.log('Calling getParsimoniousGroupsFromProteinGroupMap()');

        // sort proteinGroups from largest peptide set to smallest
        proteinGroups.sort( (a, b) => (a.peptides.size === b.peptides.size) ? 0 : (a.peptides.size > b.peptides.size) ? -1 : 1);

        const explainedPeptides = new Set<number|string>();
        const nonParsimoniousGroupIndices = new Set<number>();

        // initialize unexplainedGroupIndices
        for(let i = 0; i < proteinGroups.length; i++) {
            nonParsimoniousGroupIndices.add(i);
        }

        // do the analysis
        let currentGroupIndex = ProteinInferenceUtils.getProteinIndexExplainingMostPeptides({ proteinGroups, explainedPeptides, unexplainedGroupIndices: nonParsimoniousGroupIndices });
        while(currentGroupIndex !== -1) {

            const proteinGroup = proteinGroups[currentGroupIndex];

            nonParsimoniousGroupIndices.delete(currentGroupIndex);

            for(const peptide of proteinGroup.peptides) {
                explainedPeptides.add(peptide);
            }

            currentGroupIndex = ProteinInferenceUtils.getProteinIndexExplainingMostPeptides({ proteinGroups, explainedPeptides, unexplainedGroupIndices: nonParsimoniousGroupIndices });
        }

        // go through and mark each protein group as to whether it is in the desired (parsimonious) set or not
        for(const nonParsimoniousIndex of nonParsimoniousGroupIndices) {
            proteinGroups[nonParsimoniousIndex].passesFilter = false;
        }

        console.log("Got " + (proteinGroups.length - nonParsimoniousGroupIndices.size) + " groups that passed filter.");

        return proteinGroups;
    }

    private static getProteinIndexExplainingMostPeptides(
        {
            proteinGroups,
            explainedPeptides,
            unexplainedGroupIndices
        } : {
            proteinGroups:Array<ProteinGroup>
            explainedPeptides:Set<number|string>
            unexplainedGroupIndices:Set<number>
        }
    ) : number {

        let maxPeptideCount:number = 0;
        let currentProteinGroupIndex = -1;

        for(const i of unexplainedGroupIndices) {
            let peptideCount = 0;

            for(const peptide of proteinGroups[i].peptides) {
                if(!(explainedPeptides.has(peptide))) {
                    peptideCount++;
                }
            }

            if(peptideCount != 0) {
                if(peptideCount > maxPeptideCount) {
                    maxPeptideCount = peptideCount;
                    currentProteinGroupIndex = i;
                }
            }
        }

        return currentProteinGroupIndex;
    }

    private static populateUniquePeptideSet({ nonSubsetProteinGroups } : { nonSubsetProteinGroups:Array<ProteinGroup> }) {



    }

    private static  peptideIsUniqueToGroup({ peptideId, peptideProteinGroup, nonSubsetProteinGroups } : { peptideId:number|string, peptideProteinGroup:ProteinGroup, nonSubsetProteinGroups:Array<ProteinGroup> }) {



    }


    /**
     * Return true if superset contains every element in subset. False otherwise
     * Note: Always returns true if subset is empty.
     *
     * @param subset
     * @param superset
     * @returns {boolean}
     */
    private static isSubsetOf({ subset, superset }:{subset:Set<any>, superset:Set<any>}):boolean {

        if(subset.size > superset.size) {
            return false;
        }

        for(const elem of subset) {
            if(!superset.has(elem)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Return true if both sets contain exactly the same elements, false otherwise
     *
     * @param setA
     * @param setB
     * @returns {boolean}
     */
    private static setsAreEqual(setA:Set<any>, setB:Set<any>):boolean {
        if (setA.size !== setB.size) return false;
        for (const a of setA) if (!setB.has(a)) return false;
        return true;
    }

}
