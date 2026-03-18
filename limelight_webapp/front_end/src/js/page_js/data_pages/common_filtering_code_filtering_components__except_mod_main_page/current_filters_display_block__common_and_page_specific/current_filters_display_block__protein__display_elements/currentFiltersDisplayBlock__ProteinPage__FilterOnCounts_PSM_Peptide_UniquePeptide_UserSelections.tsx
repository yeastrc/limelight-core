/**
 * currentFiltersDisplayBlock__ProteinPage__FilterOnCounts_PSM_Peptide_UniquePeptide_UserSelections.tsx
 *
 * ONLY on Protein page
 *
 * For "Current Filters"
 */

import React from "react";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__ProteinPage__FilterOnCounts_PSM_Peptide_UniquePeptide_UserSelections";

/**
 *
 * @param proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__ProteinPage__FilterOnCounts_PSM_Peptide_UniquePeptide_UserSelections = function (
    {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
    } : {
        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
    }
) : React.JSX.Element {

    if ( ( ! proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const psm_CountFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter();
    const peptide_CountFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter();
    const uniquePeptide_CountFilter = proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter();

    if (
        ( psm_CountFilter === undefined || psm_CountFilter === null )
        && ( peptide_CountFilter === undefined || peptide_CountFilter === null )
        && ( uniquePeptide_CountFilter === undefined || uniquePeptide_CountFilter === null )
    ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__ProteinPage__FilterOnCounts_PSM_Peptide_UniquePeptide_UserSelections
                psm_CountFilter={ psm_CountFilter }
                peptide_CountFilter={ peptide_CountFilter }
                uniquePeptide_CountFilter={ uniquePeptide_CountFilter }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param peptideSearchString
 */
const CurrentFiltersDisplayBlock__ProteinPage__FilterOnCounts_PSM_Peptide_UniquePeptide_UserSelections = function(
    {
        psm_CountFilter, peptide_CountFilter, uniquePeptide_CountFilter
    } : {
        psm_CountFilter: number
        peptide_CountFilter: number
        uniquePeptide_CountFilter: number
    }
) : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <React.Fragment>

            { ( psm_CountFilter !== undefined && psm_CountFilter !== null ) ? (
                <div >
                    <span>The protein must have least </span>
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
            ) : null }

            { ( peptide_CountFilter !== undefined && peptide_CountFilter !== null ) ? (
                <div >
                    <span>The protein must have least </span>
                    <span> </span>
                    <span>{ peptide_CountFilter }</span>
                    <span> </span>
                    <span>distinct peptide</span>
                    { ( peptide_CountFilter > 1 ) ? ( // Make "peptide" plural to "peptides"
                        <span>s</span>
                    ) : null }
                    <span> </span>
                    <span>
                        in at least one search or condition
                    </span>
                </div>
            ) : null }

            { ( uniquePeptide_CountFilter !== undefined && uniquePeptide_CountFilter !== null ) ? (
                <div >
                    <span>The protein must have least </span>
                    <span> </span>
                    <span>{ uniquePeptide_CountFilter }</span>
                    <span> </span>
                    <span>unique peptide</span>
                    { ( uniquePeptide_CountFilter > 1 ) ? ( // Make "peptide" plural to "PSMs"
                        <span>s</span>
                    ) : null }
                    <span> </span>
                    <span>
                        in at least one search or condition
                    </span>
                </div>
            ) : null }

        </React.Fragment>
    );
}
