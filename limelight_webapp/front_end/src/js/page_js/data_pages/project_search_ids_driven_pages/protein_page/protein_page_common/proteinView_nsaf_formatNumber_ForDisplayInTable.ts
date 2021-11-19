/**
 * proteinView_nsaf_formatNumber_ForDisplayInTable.ts
 *
 * Protein Page and Experiment Protein Page
 *
 * Format NSAF number for display in Data Table on page
 */

export const proteinView_nsaf_formatNumber_ForDisplayInTable = function( nsaf: number ) : string {

    let nsaf_Formatted: string = undefined;

    if ( nsaf < 0.001 ) {

        nsaf_Formatted = nsaf.toExponential(2);
    } else {

        nsaf_Formatted = nsaf.toFixed(3);
    }

    return nsaf_Formatted;
}
