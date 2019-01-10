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

import { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString } from 'page_js/data_pages/modification_dynamic_static_combined_display_utils/modification_dynamic_static_combined_DisplayUtilities.js';

/**
 * @param peptideSequence
 * @param modificationEntries - Array of mods 
 *               from one of following: 
 *                   ProteinViewPage_LoadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() 
 *                   ProteinViewPage_LoadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId();
 * 
 *               Each element is object {reportedPeptideId, position, mass}
 * 
 */
const peptideSequence_CreateCommonDisplayString = function({ peptideSequence, modificationEntries }) {

    if ( peptideSequence === undefined ) {
        throw Error("peptideSequence === undefined");
    }
    if ( ( ! modificationEntries ) || modificationEntries.length === 0 ) {
        // No mods so just return the peptide sequence
        return peptideSequence; // EARLY RETURN
    }

    //  Create Map and Array of mods rounded with key position.

    const modsByPosition = new Map();

    for ( const entry of modificationEntries ) {

        if (  entry.is_N_Terminal !== undefined || entry.is_C_Terminal !== undefined ) {

            const msg = "peptideSequence_CreateCommonDisplayString: ERROR: entry.is_N_Terminal or entry.is_C_Terminal exists.  This code does not handle those properties being true.";
            console.log( msg );
            throw Error( msg );
        }

        let mapEntry = modsByPosition.get( entry.position );
        if ( ! mapEntry ) {
            mapEntry = [];
            modsByPosition.set( entry.position, mapEntry );
        }
        const massRounded = modificationMass_CommonRounding_ReturnNumber( entry.mass );
        mapEntry.push( massRounded );
    }

    //  Sort Array of masses for each position

    for ( const mapEntry of modsByPosition.entries() ) {

        const masses = mapEntry[ 1 ];
        masses.sort( function( a, b ) {

			//  mass, Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;

		});
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

        const modsAtPosition = modsByPosition.get( peptideSequencePosition );
        if ( modsAtPosition ) {

            for ( const modAtPosition of modsAtPosition ) {
                const modRoundedString = modificationMass_CommonRounding_ReturnString( modAtPosition );  //  round to String to ensure only specified # decimal places
                outputPeptideString_AsArray.push( "[" );
                outputPeptideString_AsArray.push( modRoundedString );
                outputPeptideString_AsArray.push( "]" );
            }
        }
    }

    const outputPeptideString = outputPeptideString_AsArray.join("");

    return outputPeptideString;
}

export { peptideSequence_CreateCommonDisplayString }
