/**
 * trypsinCutPointsForSequence.ts
 *
 *
 */
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

/**
 * Export what is added to a sequence position to get to the center between positions
 */
export const trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions = 0.5

/**
 *
 * @param proteinSequence
 * @returns undefined if proteinSequence is too short, else Array of positions plus '0.5' since between the positions
 */
export const trypsin_CutPointsForSequence_Compute = function ( proteinSequence: string ): Array<number> {

    try {

        const trypsin_CutPoints_Array: Array<number> = [];


        if ( proteinSequence.length < 2 ) {

            return undefined
        }


        let prevChar = ' ';
        let currChar = ' ';
        let nextChar = proteinSequence.charAt( 0 );

        const lastIndexToProcess = proteinSequence.length - 1;


        for ( let index = 0; index < lastIndexToProcess; index++ ) {

            const startOfCutPoint = index + 1;  //  add one since index is Zero based and startOfCutPoint is One based

            const cutPointCenter = startOfCutPoint + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions; //  add 0.5 since cut point after first letter


            prevChar = currChar;
            currChar = nextChar;
            nextChar = proteinSequence.charAt( index + 1 );

            currChar = proteinSequence.charAt( index );

            if ( index === 0 ) {

                //  Special processing for first position

                if ( ( currChar === 'K' || currChar === 'R' ) && nextChar != 'P' ) {

                    //  If first letter in sequence not followed by 'P'

                    trypsin_CutPoints_Array.push( cutPointCenter );
                }
            } else {

                //  First the "include" rules for where cut points are located

                if ( ( ( currChar === 'K' || currChar === 'R' ) && nextChar != 'P' )

                    || ( prevChar === 'W' && currChar === 'K' && nextChar === 'P' )
                    || ( prevChar === 'M' && currChar === 'R' && nextChar === 'P' ) ) {



                    //  Now process the "excludes"

//					Trypsin does NOT cut at (I put a . where cleavage would be expected to occur based on the above rules, but it actually doesn't in these cases.)
                    //
//					[CD]K.D ( after K )
//					CK.[HY] ( after K )
//					CR.K ( after R )
//					RR.[HR] ( after Second R )

                    if ( ( ( prevChar === 'C' || prevChar === 'D' ) && currChar === 'K' && nextChar === 'D' )

                        || ( prevChar === 'C' && currChar === 'K' && ( nextChar === 'H' || nextChar === 'Y' ) )
                        || ( prevChar === 'C' && currChar === 'R' && nextChar === 'K' )
                        || ( prevChar === 'R' && currChar === 'R' && ( nextChar === 'H' || nextChar === 'R' ) ) ) {

                        //  Exclude if this "if" statement is true

                    } else {

                        trypsin_CutPoints_Array.push( cutPointCenter );

                    }
                }
            }
        }

        return trypsin_CutPoints_Array;

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}
