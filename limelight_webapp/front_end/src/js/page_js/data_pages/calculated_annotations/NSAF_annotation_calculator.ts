
/**
 *
 */
export class NSAFAnnotationCalculator {

    /**
     * NSAF is calculated as the number of spectral counts (SpC) identifying a protein, divided by the protein's
     * length (L), divided by the sum of SpC/L for all proteins.
     *
     * param proteinPsmCountMap is also used to pass in other counts like 'adjusted_Spectral_Count_ABACUS'
     *
     * Returns a Map of protein id to calculated NSAF. This Map is guaranteed to have an entry for every protein
     * in the PSMCountMap.
     *
     * @param proteinPsmCountMap Map<number,number> - Map<Protein Sequence Version Id, PSM Count>
     * @param proteinLengthMap Map<number,number> - Map<Protein Sequence Version Id, Protein Length>
     * @returns Map<number,number> - Map<Protein Sequence Version Id, NSAF value>
     */
    static getNSAFAnnotations(
        {
            proteinPsmCountMap,
            proteinLengthMap
        } : {
            proteinPsmCountMap:Map<number,number>,
            proteinLengthMap:Map<number,number>,

        }) : Map<number,number> {

        const nsafMap = new Map<number,number>();

        if(proteinPsmCountMap.size !== proteinLengthMap.size) {
            throw 'proteinPsmCountMap is a different size than proteinLengthMap';
        }

        let sum = 0;

        for(const proteinId of proteinPsmCountMap.keys()) {
            if(!(proteinLengthMap.has(proteinId))) {
                throw 'could not find ' + proteinId + ' in proteinLengthMap';
            }

            const psmCount = proteinPsmCountMap.get(proteinId);
            const length = proteinLengthMap.get(proteinId);

            const ratio = psmCount / length;

            nsafMap.set(proteinId, ratio);
            sum += ratio;
        }

        for(const proteinId of nsafMap.keys()) {
            nsafMap.set(proteinId, nsafMap.get(proteinId) / sum);
        }

        return nsafMap;
    }

}