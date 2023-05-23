/**
 * currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections.tsx
 *
 * "Current Filters:"   For Filter on Peptide Meets the Digestion selection
 *
 *     -  Peptide meets rules of being Tryptic or Non-Tryptic or other such/similar rules
 */

import React from "react";
import {
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections";

/**
 *
 * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections = function (
    {
        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
    } : {
        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
    }
) : JSX.Element {

    if ( ( ! peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.is_NoneSelection() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject={ peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
 */
const CurrentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections = function(
    {
        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
    } : {
        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject;
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <div>
            { ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
                === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES ) ? (
                    <span>
                        Only showing data for tryptic peptides
                    </span>
            ) : null }
            { ( peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()
                === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) ? (
                <span>
                        Only showing data for non-tryptic peptides
                    </span>
            ) : null }
        </div>
    );
}

