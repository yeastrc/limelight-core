/**
 * currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection.tsx
 *
 * "Current Filters:"   For "Must :"
 *
 *
 */

import React from "react";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_ANY_ALL_Selection_Enum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection";

/**
 *
 * @param scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
 * @param commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
 */
export const currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection = function (
    {
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    } : {
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
    }
) : JSX.Element {

    if ( ( ! scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject ) ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    if ( ! scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.is_AnySelections() ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            <CurrentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection
                scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject={ scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param searchScanFileDataEntries
 */
const CurrentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection = function(
    {
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    } : {
        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
    }
) : JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    const selectionsElements: Array<JSX.Element> = [];

    for ( const selection_Entry of scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

        if ( selectionsElements.length === 0 ) {
            //  First Entry Text before
            selectionsElements.push(
                <span key={ "text_before_" + selectionsElements.length }>Only showing data for PSMs that contain a peak with </span>
            )
        } else {
            //  NOT First Entry Text before

            let or_and_text = "or"

            if ( scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get_anyAll_Selection() === ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_ANY_ALL_Selection_Enum.ALL ) {
                or_and_text = "and a peak with"
            }

            selectionsElements.push(
                <span key={ "text_before_" + selectionsElements.length }> { or_and_text } </span>
            )
        }

        selectionsElements.push(
            <span key={ "text_before_" + selectionsElements.length }>
                <span style={ { whiteSpace: "nowrap" } }>
                    a m/z of { selection_Entry.massOverCharge }
                </span>
                { " " }
                <span style={ { whiteSpace: "nowrap" } }>
                    within +/- { selection_Entry.plus_Minus_MassRange_In_PPM } ppm,
                </span>
                { " " }
                and a
                { " " }
                <span style={ { whiteSpace: "nowrap" } }>
                    relative intensity of { selection_Entry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan }{ "%" }
                </span>
            </span>
        )
    }

    return (
        <React.Fragment>

            <div>
                { selectionsElements }
            </div>

        </React.Fragment>
    );

}

