/**
 * limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage.ts
 *
 *
 */

/**
 * Format any filterable annotation value for display on the web page.
 * Do NOT use for formatting of value to download.
 *
 * @param annotationDataValue_ToFormat
 */
export const limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage = function ( annotationDataValue_ToFormat: number ): string {

    if ( annotationDataValue_ToFormat === undefined ) {
        return undefined
    }
    if ( annotationDataValue_ToFormat === null ) {
        return null
    }

    if ( annotationDataValue_ToFormat === 0 ) {
        return "0"
    }

    if ( Math.abs( annotationDataValue_ToFormat ) >= 100 ) {
        return annotationDataValue_ToFormat.toExponential( 4 )
    }

    if ( Math.abs( annotationDataValue_ToFormat ) <= ( 1 / 100 ) ) {
        return annotationDataValue_ToFormat.toExponential( 4 )
    }

    return annotationDataValue_ToFormat.toFixed( 4 )
}
