/**
 * estimated_Error__From_IndependentDecoy__CommonCode.ts
 *
 * Estimated Error - Computed from Independent Decoy ( On PSM and Matched Protein ) - Common Code
 */


export class Estimated_Error__From_IndependentDecoy__CommonCode {

    /**
     *
     * @param estimatedError
     * @returns - zero if param is < 0, one if param > 1, else param
     */
    static estimatedError_ClampTo_Zero_To_One( estimatedError: number ) : number {

        if ( estimatedError < 0 ) {
            return 0;
        }
        if ( estimatedError > 1 ) {
            return 1;
        }

        return estimatedError
    }
}
