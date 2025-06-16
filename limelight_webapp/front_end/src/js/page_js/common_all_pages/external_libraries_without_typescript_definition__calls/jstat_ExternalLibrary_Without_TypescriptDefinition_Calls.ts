/**
 * jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.ts
 */


// @ts-ignore
import jStat from 'jstat'

import {
    limelight__variable_is_type_number_Check
} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 * Calls functions on: import jStat from 'jstat'
 */
export const Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls = {

    /**
     * Calls ztest( value, sides[, flag] )
     * Returns the p-value of value taking the jStat object as the observed values. sides is an integer value 1 or 2 denoting a 1 or 2 sided z-test. The test defaults to a 2 sided z-test if sides is not specified. flag===true denotes use of sample standard deviation.
     *
     * https://jstat.github.io/test.html#ztest
     *
     * Have this function to ensure expected result is the result for typescript typing instead of having 'any' get cast to 'number'.
     */
    call_jStat_ztest( value: number, sides: number, flag?: boolean ) : number {

        let result: any

        if ( flag ) {
            result = jStat.ztest( value, sides, flag )
        } else {
            result = jStat.ztest( value, sides )  //  Cannot pass flag if undefined since if undefined the function returns NaN
        }

        //  Assume that if wanted to call jStat.ztest(...) and use default for 'sides' that need to call jStat.ztest( value ) instead of passing undefined for 'sides' since ran into issue with 'flag'

        if ( ! limelight__variable_is_type_number_Check( result ) ) {
            const msg = "result from call to jStat.ztest(...) did NOT return a number"
            console.warn(msg)
            throw Error(msg)
        }

        return result
    }

} as  const
