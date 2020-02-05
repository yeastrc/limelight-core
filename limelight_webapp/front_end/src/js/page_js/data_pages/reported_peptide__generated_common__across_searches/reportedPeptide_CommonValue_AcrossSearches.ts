/**
 * reportedPeptide_CommonValue_AcrossSearches.ts
 * 
 * Javascript for creating a 'Common' representation of a peptide sequence
 * 
 * Currently contains:
 * 
 *      Peptide Id
 *      Variable Mods
 *      Static Mods (When Provided for Single Protein section when user selects Static Mods to filter on)
 */

const  _PRIMARY_SEPARATOR = "!";  // <peptide id>!<variable mods>!<static mods>

const _PEPTIDE_ID_IDENTIER = "PID";  //  Starts <peptide id> section
const _VARIABLE_MODS_IDENTIFIER = "V";  // Starts <variable mods> section
const _STATIC_MODS_IDENTIFIER = "S";    // Starts <static mods> section
const _MODS_ENTRY_SEPARATOR = "@";     //  <position>$<mass>$<mass>...@<position>$<mass>$<mass>...
const _MODS_ENTRY_SUB_SEPARATOR = "$"  //  


const valueCheckForDelimiters = function( value : string ) : void {

    if ( value.includes( _PRIMARY_SEPARATOR ) 
    || value.includes( _PEPTIDE_ID_IDENTIER )
    || value.includes( _VARIABLE_MODS_IDENTIFIER )
    || value.includes( _STATIC_MODS_IDENTIFIER )
    || value.includes( _STATIC_MODS_IDENTIFIER )
    || value.includes( _MODS_ENTRY_SEPARATOR )
    || value.includes( _MODS_ENTRY_SUB_SEPARATOR )
    ) {

        const msg = "create_reportedPeptide_CommonValue_EncodedString: One of the strings to encode contains one of the internal delimiters to encode.  string to encode: " + value;
        console.warn( msg )
        throw Error( msg );
    }
}

/**
 * reportedPeptide_CommonValue_AcrossSearches.ts
 * 
 * Javascript for creating a 'Common' representation of a peptide sequence
 * 
 * Currently contains:
 * 
 *      Peptide Id
 *      Variable Mods
 *      Static Mods (When Provided for Single Protein section when user selects Static Mods to filter on)
 * 
 * Modification Masses will be stored and returned in the order provided.
 * 
 * The same Modification Masses in a different order will result in a different encoded string
 */
export const create_reportedPeptide_CommonValue_EncodedString = function({ peptideId, variableModifications_Map_KeyPosition, staticModifications_Map_KeyPosition } : {
    peptideId : number
    variableModifications_Map_KeyPosition : Map<number,Array<string>>
    staticModifications_Map_KeyPosition : Map<number,string>
}) : string {

    const resultString_Array : Array<string> = [];

    const peptideIdString = peptideId.toString();

    valueCheckForDelimiters( peptideIdString );

    resultString_Array.push( _PEPTIDE_ID_IDENTIER );
    resultString_Array.push( peptideIdString );

    resultString_Array.push( _PRIMARY_SEPARATOR );

    //  Variable Mods

    resultString_Array.push( _VARIABLE_MODS_IDENTIFIER );

    encodeVariableModPositionAndMasses({ modifications_Map_KeyPosition : variableModifications_Map_KeyPosition, resultString_Array })

    resultString_Array.push( _PRIMARY_SEPARATOR );

    //  Static Mods

    resultString_Array.push( _STATIC_MODS_IDENTIFIER );

    encodeStaticModPositionAndMasses({ modifications_Map_KeyPosition : staticModifications_Map_KeyPosition, resultString_Array })

    const resultString = resultString_Array.join( "" );

    return resultString;
}

/**
 * Encode Variable or Static mod masses
 * 
 */
const encodeVariableModPositionAndMasses = function({ modifications_Map_KeyPosition , resultString_Array } : {
    modifications_Map_KeyPosition : Map<number,Array<string>>, resultString_Array : Array<string>
}) {

    if ( ( ! modifications_Map_KeyPosition ) || ( modifications_Map_KeyPosition.size === 0 ) ) {
        // No values so return
        return;  // EARLY RETURN
    }

    //  Process in position order

    const positions = Array.from( modifications_Map_KeyPosition.keys() );
    positions.sort( (a,b) => {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    let firstPosition = true;

    for ( const position of positions ) {

        if ( firstPosition ) {
            firstPosition = false
        } else {
            resultString_Array.push( _MODS_ENTRY_SEPARATOR );    
        }

        const positionString = position.toString();

        valueCheckForDelimiters( positionString );

        resultString_Array.push( positionString );

        const masses = modifications_Map_KeyPosition.get( position );

        for ( const mass of masses ) {
            resultString_Array.push( _MODS_ENTRY_SUB_SEPARATOR );
            resultString_Array.push( mass );
        }
    }

}


/**
 * Encode Variable or Static mod masses
 * 
 */
const encodeStaticModPositionAndMasses = function({ modifications_Map_KeyPosition , resultString_Array } : {
    modifications_Map_KeyPosition : Map<number,string>, resultString_Array : Array<string>
}) {

    if ( ( ! modifications_Map_KeyPosition ) || ( modifications_Map_KeyPosition.size === 0 ) ) {
        // No values so return
        return;  // EARLY RETURN
    }

    //  Process in position order

    const positions = Array.from( modifications_Map_KeyPosition.keys() );
    positions.sort( (a,b) => {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    let firstPosition = true;

    for ( const position of positions ) {

        if ( firstPosition ) {
            firstPosition = false
        } else {
            resultString_Array.push( _MODS_ENTRY_SEPARATOR );    
        }

        resultString_Array.push( position.toString() );

        const mass = modifications_Map_KeyPosition.get( position );

        resultString_Array.push( _MODS_ENTRY_SUB_SEPARATOR );
        resultString_Array.push( mass );
    }

}
