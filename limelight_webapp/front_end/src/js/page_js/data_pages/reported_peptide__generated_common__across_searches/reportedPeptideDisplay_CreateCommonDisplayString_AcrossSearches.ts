/**
 * reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches.ts
 *
 * Javascript for creating a 'Common' display representation of a Reported Peptide String across searches
 *
 * Currently contains:
 *
 *      Peptide Sequence
 *      Variable Modification Masses
 *      Open Modification Mass - assumes only 1
 *      Static Modification Masses (When Provided for Single Protein section when user selects Static Modification Masses to filter on)
 *
 *   **  The Variable, Open, and Static Modification Masses are inserted into the Display String in the order listed in the Array
 *   **  The Variable, Open, and Static Modification Masses are likely rounded
 */
import {
    reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";

//  Assigned from "reportedPeptideDisplay_CommonValue_AcrossSearches..." since the values are used interchangably in the code

export const reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;
export const reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;  // higher number than any possible peptide length

/**
 * @param peptideSequence
 * @param variable_Modifications_RoundedArray_KeyPosition - Map<(position), Array of Variable modifications strings)> - N and C Terminus positions see const above
 * @param open_Modifications_RoundedArray_KeyPosition - Map<(position), Array of Open modifications strings)> - N and C Terminus positions see const above
 * @param open_Modification_NoPosition - open modification without a position
 * @param staticModificationsRounded_KeyPosition - Map<position, mass rounded as string>
 *
 */
export const reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches = function(
    {
        peptideSequence,
        variable_Modifications_RoundedArray_KeyPosition,
        open_Modification_Rounded,
        open_Modification_Rounded_Position,
        open_Modification_Rounded_NoPosition,
        staticModificationsRounded_KeyPosition
    } : {
        peptideSequence : string,
        variable_Modifications_RoundedArray_KeyPosition : Map<number, Array<string>> //  Map<position, Array<mass rounded as string>> - N and C Terminus positions see const above
        open_Modification_Rounded : string
        open_Modification_Rounded_Position : number //  N and C Terminus positions see const above
        open_Modification_Rounded_NoPosition : string
        staticModificationsRounded_KeyPosition : Map<number, string> //  Map<position, mass rounded as string>
    }) {

    if ( peptideSequence === undefined ) {
        throw Error("peptideSequence === undefined");
    }
    if ( open_Modification_Rounded && ( open_Modification_Rounded_Position === undefined || open_Modification_Rounded_Position === null ) ) {
        throw new Error("( open_Modification_Rounded && ( open_Modification_Rounded_Position === undefined || open_Modification_Rounded_Position === null ) )");
    }

    if ( ( ( ! variable_Modifications_RoundedArray_KeyPosition ) || variable_Modifications_RoundedArray_KeyPosition.size === 0 ) &&
        ( ( ! open_Modification_Rounded ) && ( ! open_Modification_Rounded_NoPosition ) ) &&
        ( ( ! staticModificationsRounded_KeyPosition ) || staticModificationsRounded_KeyPosition.size === 0 ) ) {
        // No mods so just return the peptide sequence
        return peptideSequence; // EARLY RETURN
    }

    //  Create result sequence

    //      Positions in dynamicModificationEntries are 1 based (start at 1)

    //  Peptide Sequence as Array of characters.  From MDN: .split():  If separator is an empty string, str is converted to an array of characters

    const peptideSequence_AsArray = peptideSequence.split("");
    const peptideSequence_Length = peptideSequence.length;

    const outputPeptideString_AsArray : Array<string> = []; // Will combine the array elements

    if ( ( variable_Modifications_RoundedArray_KeyPosition && variable_Modifications_RoundedArray_KeyPosition.has( reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX ) )
        || open_Modification_Rounded_Position === reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX ) {

        //  Have "n" terminus mods so add them to result

        outputPeptideString_AsArray.push( "n" );

        let open_Modification_Rounded_Param : string = undefined;
        if ( open_Modification_Rounded_Position === reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX ) {
            open_Modification_Rounded_Param = open_Modification_Rounded;
        }

        _processSinglePosition_And_N_C_Terms({
            peptideSequencePosition : reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX,
            outputPeptideString_AsArray,
            variable_Modifications_RoundedArray_KeyPosition,
            open_Modification_Rounded_Param
        });
    }

    for ( let peptideSequenceIndex = 0; peptideSequenceIndex < peptideSequence_Length; peptideSequenceIndex++ ) {

        const peptideSequencePosition = peptideSequenceIndex + 1; // positions are 1 based (start at 1)

        const peptideSequenceAtIndex = peptideSequence_AsArray[ peptideSequenceIndex ];
        outputPeptideString_AsArray.push( peptideSequenceAtIndex );

        if ( staticModificationsRounded_KeyPosition ) {
            const staticModificationRoundedString : string = staticModificationsRounded_KeyPosition.get( peptideSequencePosition );
            if ( staticModificationRoundedString ) {
                outputPeptideString_AsArray.push( "{" );
                outputPeptideString_AsArray.push( staticModificationRoundedString );
                outputPeptideString_AsArray.push( "}" );
            }
        }

        let open_Modification_Rounded_Param : string = undefined;
        if ( open_Modification_Rounded_Position === peptideSequencePosition ) {
            open_Modification_Rounded_Param = open_Modification_Rounded;
        }

        _processSinglePosition_And_N_C_Terms({
            peptideSequencePosition,
            outputPeptideString_AsArray,
            variable_Modifications_RoundedArray_KeyPosition,
            open_Modification_Rounded_Param
        });
    }

    if ( ( variable_Modifications_RoundedArray_KeyPosition && variable_Modifications_RoundedArray_KeyPosition && variable_Modifications_RoundedArray_KeyPosition.has( reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX ) )
        || open_Modification_Rounded_Position === reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX ) {

        //  Have "c" terminus mods so add them to result

        outputPeptideString_AsArray.push( "c" );

        let open_Modification_Rounded_Param : string = undefined;
        if ( open_Modification_Rounded_Position === reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX ) {
            open_Modification_Rounded_Param = open_Modification_Rounded;
        }

        _processSinglePosition_And_N_C_Terms({
            peptideSequencePosition : reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
            outputPeptideString_AsArray,
            variable_Modifications_RoundedArray_KeyPosition,
            open_Modification_Rounded_Param
        });
    }

    if ( open_Modification_Rounded_NoPosition !== undefined && open_Modification_Rounded_NoPosition !== null ) {
        outputPeptideString_AsArray.push( "-(" );
        outputPeptideString_AsArray.push( open_Modification_Rounded_NoPosition );
        outputPeptideString_AsArray.push( ")" );
    }

    const outputPeptideString = outputPeptideString_AsArray.join("");

    return outputPeptideString;
}

/**
 *
 */
const _processSinglePosition_And_N_C_Terms = function(
    {
        peptideSequencePosition,
        outputPeptideString_AsArray,
        variable_Modifications_RoundedArray_KeyPosition,
        open_Modification_Rounded_Param
    } : {
        peptideSequencePosition: number
        outputPeptideString_AsArray : Array<string>
        variable_Modifications_RoundedArray_KeyPosition : Map<number, Array<string>> //  Map<position, Array<mass rounded as string>> - N and C Terminus positions are -1 and -2
        open_Modification_Rounded_Param : string
    }) {

    if (variable_Modifications_RoundedArray_KeyPosition) {
        const variableModificationsRoundedStringsArrayAtPosition: Array<string> = variable_Modifications_RoundedArray_KeyPosition.get(peptideSequencePosition);
        if (variableModificationsRoundedStringsArrayAtPosition) {

            outputPeptideString_AsArray.push("[");
            const variableModsAtPosition_Formatted = variableModificationsRoundedStringsArrayAtPosition.join(",");
            outputPeptideString_AsArray.push(variableModsAtPosition_Formatted);
            outputPeptideString_AsArray.push("]");
        }
    }
    if ( open_Modification_Rounded_Param ) {
        outputPeptideString_AsArray.push("(");
        outputPeptideString_AsArray.push(open_Modification_Rounded_Param);
        outputPeptideString_AsArray.push(")");
    }
}
