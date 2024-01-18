/**
 * currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection.tsx
 *
 * "Current Filters:"   For "Must :"
 *
 *
 */

import React from "react";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection";

/**
 *
 * @param psm_Charge_Filter_UserSelection_StateObject
 * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
 */
export const currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection = function (
    {
        psm_Charge_Filter_UserSelection_StateObject
    } : {
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    }
) : JSX.Element {

    if ( ( ! psm_Charge_Filter_UserSelection_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    const chargeValues_Selected = psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected();

    if ( chargeValues_Selected.size === 0 ) {

        //  chargeValues_Selected NOT contain entries

        return (  // EARLY RETURN
            <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
                <CurrentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection_NO_Selections/>
            </React.Fragment>
        );
    }

    //  chargeValues_Selected contains entries

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection
                chargeValues_Selected={ chargeValues_Selected }
            />
        </React.Fragment>
    );
}

/**
 *
 */
const CurrentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection_NO_Selections = function() : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div >
            Not showing data for any PSM Charge value
        </div>
    );
}

/**
 *
 * @param searchScanFileDataEntries
 */
const CurrentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection = function(
    {
        chargeValues_Selected
    } : {
        chargeValues_Selected: Set<number>
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const chargeValues_Selected_Array = Array.from( chargeValues_Selected );

    limelight__Sort_ArrayOfNumbers_SortArrayInPlace(chargeValues_Selected_Array);

    const charge_Entries_Elements : Array<JSX.Element> = [];

    let firstEntry = true;
    for ( const chargeValues_Selected_Entry of chargeValues_Selected_Array ) {

        if ( ! firstEntry ) {
            // Not first entry so add ' and ' separator
            const and_Separator = (
                <span key={ chargeValues_Selected_Entry + "_AND" }> and </span>
            );
            charge_Entries_Elements.push(and_Separator);
        }

        const scan_Filename_Selected = (
            <span key={ chargeValues_Selected_Entry }>
                +{ chargeValues_Selected_Entry }
            </span>
        )
        charge_Entries_Elements.push(scan_Filename_Selected);

        firstEntry = false;  // Clear first entry flag
    }

    return (
        <div>
            <span>
                Only showing data for PSM charge
            </span>
            {( charge_Entries_Elements.length > 1 ) ? (
                //  Make 'file' plural to 'charge'
                <span>s</span>
            ) : null }
            <span> </span>
            { charge_Entries_Elements }
        </div>
    )
}

