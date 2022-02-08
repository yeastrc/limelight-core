/**
 * currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections.tsx
 *
 * ONLY on Peptide page and Single Protein page - Both for Peptide List
 *
 * "Current Filters:"
 *
 *
 */

import React from "react";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections";

/**
 *
 * @param peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections = function (
    {
        peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
    } : {
        peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
    }
) : JSX.Element {

    if ( ( ! peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }
    const psm_CountFilter = peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter();

    if ( psm_CountFilter === undefined || psm_CountFilter === null ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections
                psm_CountFilter={ psm_CountFilter }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param peptideSearchString
 */
const CurrentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections = function(
    {
        psm_CountFilter
    } : {
        psm_CountFilter: number
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            <span>The peptide must have least </span>
            <span> </span>
            <span>{ psm_CountFilter }</span>
            <span> </span>
            <span>PSM</span>
            { ( psm_CountFilter > 1 ) ? ( // Make "PSM" plural to "PSMs"
                <span>s</span>
            ) : null }
            <span> </span>
            <span>
                in at least one search or condition
            </span>
        </div>
    );
}
