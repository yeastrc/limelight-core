/**
 * currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections.tsx
 *
 * ONLY on Peptide page and QC page
 *
 * "Current Filters:"   For PeptideSequence_UserSelections
 *
 *
 */

import React from "react";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections";

/**
 *
 * @param peptideSequence_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections = function (
    {
        peptideSequence_UserSelections_StateObject
    } : {
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    }
) : React.JSX.Element {

    if ( ( ! peptideSequence_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const peptideSearchString = peptideSequence_UserSelections_StateObject.getPeptideSearchString();

    if ( ! peptideSearchString ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections
                peptideSearchString={ peptideSearchString }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param peptideSearchString
 */
const CurrentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections = function(
    {
        peptideSearchString
    } : {
        peptideSearchString: string
    }
) : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            <span style={{whiteSpace: "nowrap"}}>Peptide sequences must contain: </span> <span>{ peptideSearchString }</span>
        </div>
    );
}
