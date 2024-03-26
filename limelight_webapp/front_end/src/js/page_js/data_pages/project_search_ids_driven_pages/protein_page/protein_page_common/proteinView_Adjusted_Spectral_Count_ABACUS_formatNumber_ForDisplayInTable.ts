/**
 * proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable.ts
 *
 * Protein Page and Experiment Protein Page
 *
 * Format Adjusted_Spectral_Count_ABACUS number for display in Data Table on page
 */


const _ROUNDING_DECIMAL_PLACES = 2

const _MULTIPLY_DIVIDE_NUMBER = Math.pow( 10, _ROUNDING_DECIMAL_PLACES )

export const proteinView_Adjusted_Spectral_Count_ABACUS_formatNumber_ForDisplayInTable = function( adjusted_Spectral_Count_ABACUS: number ) : string {

    let adjusted_Spectral_Count_ABACUS_Formatted: string = undefined;
    
    if ( adjusted_Spectral_Count_ABACUS === 0 ) {
    
    	adjusted_Spectral_Count_ABACUS_Formatted = "0";

    } else if ( adjusted_Spectral_Count_ABACUS < 0.01 ) {

        adjusted_Spectral_Count_ABACUS_Formatted = adjusted_Spectral_Count_ABACUS.toExponential(2);
    } else {

        //  Round to _ROUNDING_DECIMAL_PLACES decimal places then use toLocaleString().  NOT use '.toFixed' since not add thousands separator

        const adjusted_Spectral_Count_ABACUS_Multiply = adjusted_Spectral_Count_ABACUS * _MULTIPLY_DIVIDE_NUMBER
        const adjusted_Spectral_Count_ABACUS_Rounded = Math.round( adjusted_Spectral_Count_ABACUS_Multiply )
        const adjusted_Spectral_Count_ABACUS_Rounded_Final = adjusted_Spectral_Count_ABACUS_Rounded / _MULTIPLY_DIVIDE_NUMBER

        adjusted_Spectral_Count_ABACUS_Formatted = adjusted_Spectral_Count_ABACUS_Rounded_Final.toLocaleString()

        //  If > 2 decimal places, use ".toFixed(...)' instead
        const decimal_Index = adjusted_Spectral_Count_ABACUS_Formatted.indexOf( "." )

        if ( decimal_Index > -1 ) {
            //  Have decimal place
            if ( decimal_Index < ( adjusted_Spectral_Count_ABACUS_Formatted.length - _ROUNDING_DECIMAL_PLACES - 1 /* -1 since zero based index */ ) ) {

                // Have # decimal places > _ROUNDING_DECIMAL_PLACES
                adjusted_Spectral_Count_ABACUS_Formatted = adjusted_Spectral_Count_ABACUS.toFixed( _ROUNDING_DECIMAL_PLACES )
            }
        }
    }

    return adjusted_Spectral_Count_ABACUS_Formatted;
}
