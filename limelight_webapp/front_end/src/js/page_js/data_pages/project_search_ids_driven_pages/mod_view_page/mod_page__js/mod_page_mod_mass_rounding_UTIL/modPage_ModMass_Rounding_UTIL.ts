/**
 * modPage_ModMass_Rounding_UTIL.ts
 */

/**
 * Centralized Modification Mass Rounding for Mod Page
 *
 * Using this so if/when let user change rounding to other than whole number have a centralized function to track back to all usage for changes
 */
export const modPage_ModMass_Rounding_UTIL = function ( modMass_Input: number ) {

    const modMass_Result = Math.round( modMass_Input )

    return modMass_Result
}
