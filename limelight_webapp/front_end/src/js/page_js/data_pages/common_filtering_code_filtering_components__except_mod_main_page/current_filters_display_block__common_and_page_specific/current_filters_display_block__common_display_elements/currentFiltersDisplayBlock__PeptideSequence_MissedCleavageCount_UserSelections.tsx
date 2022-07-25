/**
 * currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections.tsx
 *
 * "Current Filters:"   For Peptide Sequence Missed Cleavage Count
 *
 *
 */

import React from "react";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections";

/**
 *
 * @param peptideSequence_MissedCleavageCount_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections = function (
    {
        peptideSequence_MissedCleavageCount_UserSelections_StateObject
    } : {
        peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject;
    }
) : JSX.Element {

    if ( ( ! peptideSequence_MissedCleavageCount_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! peptideSequence_MissedCleavageCount_UserSelections_StateObject.is_Any_FilterHaveValue() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections
                peptideSequence_MissedCleavageCount_UserSelections_StateObject={ peptideSequence_MissedCleavageCount_UserSelections_StateObject }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param peptideSequence_MissedCleavageCount_UserSelections_StateObject
 */
const CurrentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections = function(
    {
        peptideSequence_MissedCleavageCount_UserSelections_StateObject
    } : {
        peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject;
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const selected_Entries = [];

    const missedCleavageCount__From__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter();
    const missedCleavageCount__To__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter();

    if ( missedCleavageCount__From__Filter !== undefined && missedCleavageCount__From__Filter !== null
        && missedCleavageCount__To__Filter !== undefined && missedCleavageCount__To__Filter !== null ) {

        const filterEntry = (
            <div key="MissedCleavageCount__From_To">
                <span>Only showing data with Peptide Sequence Missed Cleavage Count between </span>
                <span>{ missedCleavageCount__From__Filter }</span>
                <span> and </span>
                <span>{ missedCleavageCount__To__Filter }</span>
            </div>
        )

        selected_Entries.push( filterEntry );

    } else if ( missedCleavageCount__From__Filter !== undefined && missedCleavageCount__From__Filter !== null ) {

        const filterEntry = (
            <div key="MissedCleavageCount__From">
                <span>Only showing data with Peptide Sequence Missed Cleavage Count </span>
                <span>{ missedCleavageCount__From__Filter }</span>
                <span> or more</span>
            </div>
        )

        selected_Entries.push( filterEntry );

    } else if ( missedCleavageCount__To__Filter !== undefined && missedCleavageCount__To__Filter !== null ) {

        const filterEntry = (
            <div key="MissedCleavageCount__To">
                <span>Only showing data with Peptide Sequence Missed Cleavage Count </span>
                <span>{ missedCleavageCount__To__Filter }</span>
                <span> or less</span>
            </div>
        )

        selected_Entries.push( filterEntry );
    }

    return (
        <React.Fragment>
            { selected_Entries }
        </React.Fragment>
    );
}

