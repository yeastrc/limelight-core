/**
 * variable_is_type_number_Check.ts
 * 
 * Javascript To Check if a variable is type number 
 * 
 * Also have page_js/common_all_pages/limelight__IsVariableAString.ts
 */


const variable_is_type_number_Check = function( variable : any ) : boolean {

    const typeOf_OfVariable = typeof variable;

    if ( typeOf_OfVariable === 'number' ) {
        return true;
    }

    return false;
}

export { variable_is_type_number_Check }
