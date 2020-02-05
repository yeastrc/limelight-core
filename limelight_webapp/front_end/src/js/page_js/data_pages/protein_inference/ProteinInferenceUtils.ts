
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
        return ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinGroupMap({
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
        let noSubsetProteinGroups = new Array<ProteinGroup>();

        for (let proteinGroup of proteinGroups) {

            let newProteinGroup = new ProteinGroup();
            newProteinGroup.proteins =  proteinGroup.proteins;
            newProteinGroup.peptides =  proteinGroup.peptides;
            newProteinGroup.passesFilter = !ProteinInferenceUtils.proteinGroupIsSubset({proteinGroup, proteinGroups});

            noSubsetProteinGroups.push(newProteinGroup)
        }

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
