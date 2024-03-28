
// limelight__IsTextSelected.ts

//  Also have page_js/limelight__variable_is_type_number_Check.ts

/**
 * Is any text on the page currently selected
 */
export function limelight__IsTextSelected() : boolean {

    try { // In try/catch block in case not supported in browser
        const selectionObj = window.getSelection();
        const selection = selectionObj.toString()
        if (selection) {
            //  Found a Selection so exit with no further action
            return true; //  EARLY RETURN
        }

    } catch (e) {
        //  Eat exception
        const znothing = 0;
    }

    return false;
}


