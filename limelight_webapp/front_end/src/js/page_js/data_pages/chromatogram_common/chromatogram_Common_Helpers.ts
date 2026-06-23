/*
 * chromatogram_Common_Helpers.ts
 *
 * Helpers extracted byte-identical from the two chromatogram components so a change is made
 * once instead of in both copies:
 *   - psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx
 *   - featureDetection_ViewPage__Chromatogram_Component.tsx
 *
 * See EXTRACTION_PLAN.md in this directory.
 */

import { C13_MASS_DELTA } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";

//    !!!   NUMBER OF ISOTOPES to DISPLAY
//  Show Lines in Plot for 'Monoisotopic' and then +1, +2, ... Up To Isotope Max
export const chromatogram_Common_Helpers__ISOTOPE_MAX__FOR_CHART_TRACES = 3

//   !!!  IMPORTANT:  The number of elements in 'chromatogram_Common_Helpers__ISOTOPE_PLOT_TRACE_COLORS' MUST be equal to 'chromatogram_Common_Helpers__ISOTOPE_MAX__FOR_CHART_TRACES + 1'
export const chromatogram_Common_Helpers__ISOTOPE_PLOT_TRACE_COLORS = [
    "UNUSED",  // Start with "UNUSED" since isotope numbers start at 1
    "rgb(255, 127, 14)",
    "rgb(44, 160, 44)",
    "#3BB2C4"
]

/**
 *
 * @param isotope_Number
 * @param charge
 * @private
 */
export const chromatogram_Common_Helpers__compute_Isotope_M_Over_Z_Addition_For_Isotope_Number = function(
    {
        isotope_Number, charge
    } : {
        isotope_Number: number  // the +1, +2, ...  Isotope
        charge: number
    }
) : number {
    return isotope_Number * C13_MASS_DELTA / charge
}

/**
 *
 * @param areaUnderCurve_Display
 */
export const chromatogram_Common_Helpers__areaUnderCurve_Display_FormattingFunction = function ( areaUnderCurve_Display: number ) {

    return areaUnderCurve_Display.toExponential( 3 )
}

/**
 *
 * @param ppm_ExtendRange_AddSubtract_ToMinMaxValues
 * @param m_Over_Z_Mass
 */
export const chromatogram_Common_Helpers__compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus = function (
    {
        ppm_ExtendRange_AddSubtract_ToMinMaxValues, m_Over_Z_Mass
    } : {
        ppm_ExtendRange_AddSubtract_ToMinMaxValues: number
        m_Over_Z_Mass: number
    }
) : number {
    const ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus = m_Over_Z_Mass * ppm_ExtendRange_AddSubtract_ToMinMaxValues / 1000000;  //  1000000d is for 1E6;

    return ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus;
}

/**
 * Trapezoidal area under the chromatogram line between two adjacent points
 * (retention time in seconds on X, peak intensity on Y).  Used to accumulate
 * 'areaUnderCurve_SingleTrace' point-by-point.
 *
 * @param prev_RetentionTime_Seconds
 * @param prev_Intensity
 * @param current_RetentionTime_Seconds
 * @param current_Intensity
 */
export const chromatogram_Common_Helpers__areaUnderCurve_TrapezoidBetweenPoints = function (
    {
        prev_RetentionTime_Seconds, prev_Intensity,
        current_RetentionTime_Seconds, current_Intensity
    } : {
        prev_RetentionTime_Seconds: number
        prev_Intensity: number
        current_RetentionTime_Seconds: number
        current_Intensity: number
    }
) : number {
    const scan_retentionTime_Seconds_Difference = current_RetentionTime_Seconds - prev_RetentionTime_Seconds
    const peak_Intensity_Average = ( current_Intensity + prev_Intensity ) / 2
    return scan_retentionTime_Seconds_Difference * peak_Intensity_Average
}
