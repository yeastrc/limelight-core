/**
 * peptideSequence_CreateCommonDisplayString.js
 * 
 * Javascript for creating a 'Common' display representation of a peptide sequence
 * 
 * Currently contains:
 * 
 *      Peptide Sequence
 *      Dynamic Mods
 */

import { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding.js';

/**
 * @param peptideSequence
 * @param variableModificationsRoundedArray_KeyPosition - Map<(position), Array of variable modifications strings)>
 * 
 */
const peptideSequence_CreateCommonDisplayString = function({ peptideSequence, variableModificationsRoundedArray_KeyPosition, staticModificationsRounded_KeyPosition }) {

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
            const variableModificationsRoundedStringsArrayAtPosition = variableModificationsRoundedArray_KeyPosition.get( peptideSequencePosition );
            if ( variableModificationsRoundedStringsArrayAtPosition ) {

                for ( const variableModificationRoundedStringAtPosition of variableModificationsRoundedStringsArrayAtPosition ) {
                    outputPeptideString_AsArray.push( "[" );
                    outputPeptideString_AsArray.push( variableModificationRoundedStringAtPosition );
                    outputPeptideString_AsArray.push( "]" );
                }
            }
        }

        if ( staticModificationsRounded_KeyPosition ) {
            const staticModificationRoundedString = staticModificationsRounded_KeyPosition.get( peptideSequencePosition );
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

export { peptideSequence_CreateCommonDisplayString }
