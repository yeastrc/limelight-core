/**
 * currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections.tsx
 *
 * "Current Filters:"   For Scan RetentionTime M/Z
 *
 *
 */

import React from "react";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections";

/**
 *
 * @param scan_RetentionTime_MZ_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections = function (
    {
        scan_RetentionTime_MZ_UserSelections_StateObject
    } : {
        scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject;
    }
) : JSX.Element {

    if ( ( ! scan_RetentionTime_MZ_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! scan_RetentionTime_MZ_UserSelections_StateObject.is_Any_FilterHaveValue() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections
                scan_RetentionTime_MZ_UserSelections_StateObject={ scan_RetentionTime_MZ_UserSelections_StateObject }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param scan_RetentionTime_MZ_UserSelections_StateObject
 */
const CurrentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections = function(
    {
        scan_RetentionTime_MZ_UserSelections_StateObject
    } : {
        scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject;
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const scan_RetentionTimes_PrecursorMZ_Selected = [];

    const retentionTime_InMinutes__From__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter();
    const retentionTime_InMinutes__To__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter();
    const mz__From__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter();
    const mz__To__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter();

    //  Retention Time filter

    if ( retentionTime_InMinutes__From__Filter !== undefined && retentionTime_InMinutes__From__Filter !== null
        && retentionTime_InMinutes__To__Filter !== undefined && retentionTime_InMinutes__To__Filter !== null ) {

        const filterEntry = (
            <div key="RetentionTime__From_To">
                <span>Only showing data with Retention Time between </span>
                <span>{ retentionTime_InMinutes__From__Filter }</span>
                <span> and </span>
                <span>{ retentionTime_InMinutes__To__Filter }</span>
                <span> minutes</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

    } else if ( retentionTime_InMinutes__From__Filter !== undefined && retentionTime_InMinutes__From__Filter !== null ) {

        const filterEntry = (
            <div key="RetentionTime__From">
                <span>Only showing data with Retention Time </span>
                <span>{ retentionTime_InMinutes__From__Filter }</span>
                <span> minutes or more</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

    } else if ( retentionTime_InMinutes__To__Filter !== undefined && retentionTime_InMinutes__To__Filter !== null ) {

        const filterEntry = (
            <div key="RetentionTime__To">
                <span>Only showing data with Retention Time </span>
                <span>{ retentionTime_InMinutes__To__Filter }</span>
                <span> minutes or less</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );
    }

    //  M/Z filter

    if ( mz__From__Filter !== undefined && mz__From__Filter !== null
        && mz__To__Filter !== undefined && mz__To__Filter !== null ) {

        const filterEntry = (
            <div key="mz__From_To">
                <span>Only showing data with m/z between </span>
                <span>{ mz__From__Filter }</span>
                <span> and </span>
                <span>{ mz__To__Filter }</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

    } else if ( mz__From__Filter !== undefined && mz__From__Filter !== null ) {

        const filterEntry = (
            <div key="mz__From">
                <span>Only showing data with m/z </span>
                <span>{ mz__From__Filter }</span>
                <span> or more</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

    } else if ( mz__To__Filter !== undefined && mz__To__Filter !== null ) {

        const filterEntry = (
            <div key="mz__To">
                <span>Only showing data with m/z </span>
                <span>{ mz__To__Filter }</span>
                <span> or less</span>
            </div>
        )

        scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );
    }

    return (
        <React.Fragment>
            { scan_RetentionTimes_PrecursorMZ_Selected }
        </React.Fragment>
    );
}

