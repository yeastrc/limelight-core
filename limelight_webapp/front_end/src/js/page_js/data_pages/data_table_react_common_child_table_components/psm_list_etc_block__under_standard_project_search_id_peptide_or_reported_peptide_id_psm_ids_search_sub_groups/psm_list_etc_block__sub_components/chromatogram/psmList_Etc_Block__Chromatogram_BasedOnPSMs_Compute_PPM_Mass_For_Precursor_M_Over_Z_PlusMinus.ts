/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus.ts
 *
 * Compute PPM Mass for Precursor m/z Plus/Minus
 *
 */

/**
 *
 * @param ppm_ExtendRange_AddSubtract_ToMinMaxValues
 * @param m_Over_Z_Mass
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus = function (
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

