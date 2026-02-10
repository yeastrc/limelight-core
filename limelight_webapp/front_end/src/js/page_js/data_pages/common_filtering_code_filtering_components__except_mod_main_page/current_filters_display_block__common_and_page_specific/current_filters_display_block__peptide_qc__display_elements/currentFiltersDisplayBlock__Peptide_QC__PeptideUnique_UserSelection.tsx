/**
 * currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection.tsx
 *
 * ONLY on Peptide page and QC page
 *
 * "Current Filters:"   For PeptideSequence_UserSelections
 *
 *
 */

import React from "react";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection";

/**
 *
 * @param peptideUnique_UserSelection_StateObject
 */
export const currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection = function (
    {
        peptideUnique_UserSelection_StateObject
    } : {
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    }
) : React.JSX.Element {

    if ( ( ! peptideUnique_UserSelection_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! peptideUnique_UserSelection_StateObject.getPeptideUnique() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection/>
        </React.Fragment>
    );
}

/**
 *
 */
const CurrentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection = function() : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            <span style={{whiteSpace: "nowrap"}}>Peptides must be Unique</span>
        </div>
    );
}
