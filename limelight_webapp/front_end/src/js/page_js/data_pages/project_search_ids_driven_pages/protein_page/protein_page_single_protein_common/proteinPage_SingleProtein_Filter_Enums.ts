/**
 * proteinPage_SingleProtein_Filter_Enums.ts
 *
 * Enums used in filtering on Single Protein view
 *
 *
 */

/**
 * Enum for filter type
 *
 *  Used on selection of Modifications, Reporter Ions, maybe others
 *
 *  Currently:  All the "ANY" are UNION and the result is INTERSECTION with all the individual "ALL" entries
 *
 *  Typescript Enum:  in Javascript will see the string values
 */
export const enum SingleProtein_Filter_SelectionType {

    ANY = "ANY",
    ALL = "ALL",
    NOT = "NOT"
}
