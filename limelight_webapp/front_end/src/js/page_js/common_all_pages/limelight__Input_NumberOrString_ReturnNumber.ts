
/**
 *
 */
// limelight__Input_NumberOrString_ReturnNumber.ts

//  Also have page_js/limelight__variable_is_type_number_Check.ts

import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 * If input is string, uses Number.parseFloat(...)
 */
export function limelight__Input_NumberOrString_ReturnNumber( inputValue_UnknownType : unknown ) : number {

    let resultValue = inputValue_UnknownType as number
    if ( ! limelight__variable_is_type_number_Check( inputValue_UnknownType ) ) {
        if (typeof inputValue_UnknownType === "string") {
            resultValue = Number.parseFloat(inputValue_UnknownType);
            if ( Number.isNaN( resultValue ) ) {
                const msg = "limelight__Input_NumberOrString_ReturnNumber(...) Number.parseFloat(inputValue_UnknownType) results in NaN. inputValue_UnknownType: ";
                console.warn( msg, inputValue_UnknownType );
                throw Error( msg + inputValue_UnknownType );
            }
        } else {
            const msg = "limelight__Input_NumberOrString_ReturnNumber(...) inputValue_UnknownType is not a number or a string. inputValue_UnknownType: ";
            console.warn( msg, inputValue_UnknownType );
            throw Error( msg + inputValue_UnknownType );
        }
    }

    return resultValue;
}
