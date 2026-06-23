/*
 * chromatogram_Common_Options.ts
 *
 * Chart-option enums + their default values, shared (byte-identical) between the two
 * chromatogram components:
 *   - psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx
 *   - featureDetection_ViewPage__Chromatogram_Component.tsx
 *
 * See EXTRACTION_PLAN.md in this directory.
 */

import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";

export enum chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum {
    ION_CURRENT = "ION_CURRENT",
    IONS = "IONS"
}

export const chromatogram_Common_Options__plotType_IonCurrent_VS_Ions_Select_DEFAULT = chromatogram_Common_Options__PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT  //  Set to default of ION_CURRENT

export enum chromatogram_Common_Options__ScanPeakSelect_Enum {
    MAX_PEAK_INTENSITY = "MAX_PEAK_INTENSITY",
    PEAK_MZ_CENTER_OF_MZ_RANGE = "PEAK_MZ_CENTER_OF_MZ_RANGE"
}

export const chromatogram_Common_Options__scanPeakSelect_DEFAULT = chromatogram_Common_Options__ScanPeakSelect_Enum.MAX_PEAK_INTENSITY  //  Set to default of MAX_PEAK_INTENSITY

export enum chromatogram_Common_Options__SmoothingOption_Enum {
    NONE = "NONE",
    LOWESS = "LOWESS",
    SAVITZKY_GOLAY = "SAVITZKY_GOLAY"
}

export const chromatogram_Common_Options__smoothingOption_Selection_DEFAULT = chromatogram_Common_Options__SmoothingOption_Enum.SAVITZKY_GOLAY;

export enum chromatogram_Common_Options__ChartCreate__IonCurrent__IonCount__Enum {
    ION_CURRENT = "ION_CURRENT",
    ION_COUNT = "ION_COUNT"
}

//  m/z PPM extend-range option values (shared with the data-loading code, which uses
//  _MAX_VALUE_FOR_GET_FROM_SERVER... as the max value to request from the server).

export const chromatogram_Common_Options__MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues = 25;

export const chromatogram_Common_Options__DEFAULT_VALUE__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues = 15

export const chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues = [
    10,
    chromatogram_Common_Options__DEFAULT_VALUE__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues,
    chromatogram_Common_Options__MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues  // MUST include chromatogram_Common_Options__MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues as LAST and Max value
]

{ //  Sort and validate chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues

    if ( ! ( chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length > 0 ) ) {
        const msg = "( ! ( chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length > 0 ) )"
        console.warn(msg)
        throw Error(msg)
    }
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace( chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues )
    if ( chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues[ chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length - 1 ] != chromatogram_Common_Options__MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues ) {
        const msg = "Max value of chromatogram_Common_Options__SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues is NOT chromatogram_Common_Options__MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.  Required for correct get data from server"
        console.warn(msg)
        throw Error(msg)
    }
}

//  Help-symbol (green "?" tooltip) layout constants, shared by the RT overlay components and
//  the main chart UI.

export const chromatogram_Common_Options__PADDING_TOP_ABOVE_HELP_SYMBOL = 3

export const chromatogram_Common_Options__MARGIN_LEFT_AFTER_HELP_SYMBOL = 3
