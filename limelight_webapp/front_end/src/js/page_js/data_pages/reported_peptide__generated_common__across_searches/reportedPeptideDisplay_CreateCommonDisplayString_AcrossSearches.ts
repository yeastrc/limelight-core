/**
 * reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches.ts
 * 
 * Javascript for creating a 'Common' display representation of a Reported Peptide String across searches
 * 
 * Currently contains:
 * 
 *      Peptide Sequence
 *      Variable Modification Masses
 *      Static Modification Masses (When Provided for Single Protein section when user selects Static Modification Masses to filter on)
 * 
 *   **  The Variable and Static Modification Masses are inserted into the Display String in the order listed in the Array
 *   **  The Variable and Static Modification Masses are likely rounded
 */

/**
 * @param peptideSequence
 * @param variableModificationsRoundedArray_KeyPosition - Map<(position), Array of variable modifications strings)>
 * 
 */
export const reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches = function({ peptideSequence, variableModificationsRoundedArray_KeyPosition, staticModificationsRounded_KeyPosition } : { 
    
    peptideSequence : string, 
    variableModificationsRoundedArray_KeyPosition : Map<number, Array<string>> //  Map<position, Array<mass rounded as string>>
    staticModificationsRounded_KeyPosition : Map<number, string> //  Map<position, mass rounded as string>
}) {

    if ( peptideSequence === undefined ) {
        throw Error("peptideSequence === undefined");
    }
    if ( ( ( ! variableModificationsRoundedArray_KeyPosition ) || variableModificationsRoundedArray_KeyPosition.size === 0 ) &&
        ( ( ! staticModificationsRounded_KeyPosition ) || staticModificationsRounded_KeyPosition.size === 0 ) ) {
        // No mods so just return the peptide sequence
        return peptideSequence; // EARLY RETURN
    }

    //  Create result sequence

    //      Positions in dynamicModificationEntries are 1 based (start at 1)

    //  Peptide Sequence as Array of characters.  From MDN: .split():  If separator is an empty string, str is converted to an array of characters

    const peptideSequence_AsArray = peptideSequence.split("");
    const peptideSequence_Length = peptideSequence.length;

    const outputPeptideString_AsArray = []; // Will combine the array elements

    for ( let peptideSequenceIndex = 0; peptideSequenceIndex < peptideSequence_Length; peptideSequenceIndex++ ) {

        const peptideSequencePosition = peptideSequenceIndex + 1; // positions are 1 based (start at 1)

        const peptideSequenceAtIndex = peptideSequence_AsArray[ peptideSequenceIndex ];
        outputPeptideString_AsArray.push( peptideSequenceAtIndex );

        if ( variableModificationsRoundedArray_KeyPosition ) {
            const variableModificationsRoundedStringsArrayAtPosition : Array<string> = variableModificationsRoundedArray_KeyPosition.get( peptideSequencePosition );
            if ( variableModificationsRoundedStringsArrayAtPosition ) {

                for ( const variableModificationRoundedStringAtPosition of variableModificationsRoundedStringsArrayAtPosition ) {
                    outputPeptideString_AsArray.push( "[" );
                    outputPeptideString_AsArray.push( variableModificationRoundedStringAtPosition );
                    outputPeptideString_AsArray.push( "]" );
                }
            }
        }

        if ( staticModificationsRounded_KeyPosition ) {
            const staticModificationRoundedString : string = staticModificationsRounded_KeyPosition.get( peptideSequencePosition );
            if ( staticModificationRoundedString ) {
                outputPeptideString_AsArray.push( "(" );
                outputPeptideString_AsArray.push( staticModificationRoundedString );
                outputPeptideString_AsArray.push( ")" );
            }
        }
    }

    const outputPeptideString = outputPeptideString_AsArray.join("");

    return outputPeptideString;
}
