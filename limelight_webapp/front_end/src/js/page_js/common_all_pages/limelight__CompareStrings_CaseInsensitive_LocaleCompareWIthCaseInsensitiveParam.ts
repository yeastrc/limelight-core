/**
 * limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam.js
 *
 * Javascript  to compare 2 strings, using localeCompare with params for Case Insensitive
 *
 */

/**
 *
 *
 * @param a
 * @param b
 */
export const limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam = function (a: string, b: string ) : number {

    if ( a === undefined || a === null || b === undefined || b === null ) {
        const msg = "limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a,b): ( a === undefined || a === null || b === undefined || b === null )"
        console.warn(msg)
        throw Error(msg)
    }

    return a.localeCompare( b, undefined, { sensitivity: "base" })
}
