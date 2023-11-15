/**
 * limelight__Compare_2_Sets_OfNumbers_For_Equality.js
 *
 * Javascript  to compare 2 Sets of Numbers for Equality
 *
 */

/**
 *
 *
 * @param a
 * @param b
 */
export const limelight__Compare_2_Sets_OfNumbers_For_Equality = function (a: Set<number>, b: Set<number> ) : boolean {

    if ( a === undefined || a === null || b === undefined || b === null ) {
        const msg = "limelight__Compare_2_Sets_OfNumbers_For_Equality(a,b): ( a === undefined || a === null || b === undefined || b === null )"
        console.warn(msg)
        throw Error(msg)
    }

    if ( a.size !== b.size ) {
        return false
    }

    for ( const a_Entry of a ) {
        if ( ! b.has( a_Entry ) ) {
            return false
        }
    }

    return true
}
