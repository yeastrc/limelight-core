/**
 * ModPage_ModStatsUtils.ts
 */

import jStat from 'jstat'

export const ModPage_ModStatsUtils = {


    getPValueForTwoRatios: function({ x1, n1, x2, n2 }: { x1: number, n1: number, x2: number, n2: number }) {

        const result = jStat.ztest( this.getZScoreForTwoRatios({ x1, n1, x2, n2 }), 2);

        //  TODO  Consider adding a test of 'result' is a number so then can specify return type number

        return result
    },

    getZScoreForTwoRatios: function ({ x1, n1, x2, n2 }: { x1: number, n1: number, x2: number, n2: number }) {

        //console.log('getZScoreForTwoRatios', x1, n1, x2, n2);

        //  parseInt NOT needed since all are already number

        // x1 = parseInt(x1);
        // n1 = parseInt(n1);
        // x2 = parseInt(x2);
        // n2 = parseInt(n2);


        const p = (x1 + x2) / (n1 + n2);
        const numerator = (x1 / n1) - (x2 / n2);
        const denominator = Math.sqrt( p * (1 - p) * (1 / n1 + 1 / n2) );

        return numerator / denominator;
    }


} as const
