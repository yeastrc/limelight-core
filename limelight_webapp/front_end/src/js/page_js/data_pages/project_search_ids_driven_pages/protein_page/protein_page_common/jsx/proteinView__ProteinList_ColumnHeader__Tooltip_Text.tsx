/**
 * proteinView__ProteinList_ColumnHeader__Tooltip_Text.tsx
 *
 *
 */
import React from "react";

export const proteinView__ProteinList_ColumnHeader__Tooltip_Text = {

    Sequence_Coverage: "Fraction of the protein sequence that is covered by a detected peptide.",
    PSM_Count: "The number of Peptide Spectrum Matches for the protein. This is calculated as the sum of all scans that identified each peptide for this protein.",
    NSAF: "Normalized Spectral Abundance Factor for a protein. This is calculated as: SAF = PSM count / length of protein. Then, NSAF = SAF / sum(SAF for all proteins in the sample).",

    Adjusted_Spectral_Count__ABACUS__ReturnComponent:
        () : React.JSX.Element  => {
        return (
            <span>
                The adjusted spectral count for a protein as calculated by ABACUS (<a target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/21360675/">https://pubmed.ncbi.nlm.nih.gov/21360675/</a>).
                    At a high level, this is calculated as the number of distinct scans unique to a protein plus the sum of the adjusted scan weight for scans not unique to a protein,
                    which is calculated using how many other proteins a scan identified and how many scans are unique to those proteins.
                </span>
        )
        },

    NSAF_Using_Adjusted_Spectral_Count__ABACUS: "This is calculated as: SAF = adjusted spectral count / length of protein. Then, NSAF = SAF / sum(SAF for all proteins in the sample).",

    Distinct_Peptide_Count: 'The number of distinct peptides found for a protein. A distinct peptide typically includes protein sequence and modifications, but may be customized by the "Distinct Peptide Includes" option.',
    Unique_Peptide_Count: "The number of distinct peptides that are uniquely found in the protein (not found in any other protein)."

} as const