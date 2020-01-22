/**
 * variable_is_type_number_Check.ts
 * 
 * Javascript To Check if a variable is type number 
 * 
 * 
 */


const variable_is_type_number_Check = function( variable : any ) : boolean {

    const typeOf_OfVariable = typeof variable;

    if ( typeOf_OfVariable === 'number' ) {
        return true;
    }

    return false;
}

export { variable_is_type_number_Check }
