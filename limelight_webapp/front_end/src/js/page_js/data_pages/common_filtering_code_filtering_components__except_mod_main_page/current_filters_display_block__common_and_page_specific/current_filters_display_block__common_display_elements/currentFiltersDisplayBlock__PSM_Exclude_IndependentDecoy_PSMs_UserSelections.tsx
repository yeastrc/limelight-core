/**
 * currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections.tsx
 *
 * "Current Filters:"   For Scan RetentionTime M/Z
 *
 *
 */

import React from "react";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections";

/**
 *
 * @param psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections = function (
    {
        psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject
    } : {
        psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject;
    }
) : JSX.Element {

    if ( ( ! psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections/>
        </React.Fragment>
    );
}

/**
 *
 */
const CurrentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections = function() : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            <span style={{whiteSpace: "nowrap"}}>Excluding Independent Decoy PSMs</span>
        </div>
    );
}

