
// limelight__IsVariableAString.ts

//  Also have page_js/variable_is_type_number_Check.ts

function limelight__IsVariableAString( variable : any ) : boolean {

    if (typeof variable === 'string' || variable instanceof String) {
        return true;
    }
    return false;
}

export { limelight__IsVariableAString }

// import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';
