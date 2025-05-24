/**
 * ModPage_ModStatsUtils.ts
 */

import {
    Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls
} from "page_js/common_all_pages/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls";

/**
 *
 */
export const ModPage_ModStatsUtils = {

    /**
     *
     */
    getPValueForTwoRatios: function({ x1, n1, x2, n2 }: { x1: number, n1: number, x2: number, n2: number }) : number {

        const ZScoreForTwoRatios = this.getZScoreForTwoRatios({ x1, n1, x2, n2 })

        const result = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_ztest( ZScoreForTwoRatios, 2);

        return result
    },

    /**
     *
     */
    getZScoreForTwoRatios: function ({ x1, n1, x2, n2 }: { x1: number, n1: number, x2: number, n2: number }) : number {

        const p = (x1 + x2) / (n1 + n2);
        const numerator = (x1 / n1) - (x2 / n2);
        const denominator = Math.sqrt( p * (1 - p) * (1 / n1 + 1 / n2) );

        return numerator / denominator;
    }

} as const
