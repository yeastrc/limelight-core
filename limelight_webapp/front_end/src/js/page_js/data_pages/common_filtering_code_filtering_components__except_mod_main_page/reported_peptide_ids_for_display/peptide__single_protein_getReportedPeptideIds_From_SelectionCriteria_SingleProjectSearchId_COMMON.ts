/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.ts
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";



/////////  AT FILE BOTTOM:  export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON


/**
 * Get Reported Peptide Ids to display (or download).
 *
 * User has selected Protein Positions
 */
const _getReportedPeptideIdsForDisplay_ProteinPositionsSelected = function (
    {
        selectedProteinSequencePositions,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder
    }: {
        selectedProteinSequencePositions: Set<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {
        const msg = "_getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...): proteinSequenceVersionId MUST be assigned a value.  is undefined or null";
        console.warn(msg);
        throw Error(msg);
    }

    // 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

    //  Sequence Coverage Data
    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    if (!proteinCoverageObject) {
        //  No proteinCoverageObject for this proteinSequenceVersionId for this project search id
        //  There will then be no reportedPeptideIdAtPosition
        //  Return empty

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({ noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false });

        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({ noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false });

    //  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
    for (const selectedProteinSequencePosition of selectedProteinSequencePositions) {

        const reportedPeptideIdsAtPosition = proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition({position: selectedProteinSequencePosition});

        for (const reportedPeptideId of reportedPeptideIdsAtPosition) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }


    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result;
}

/**
 *
 */
export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON {

    static getReportedPeptideIdsForDisplay_ProteinPositionsSelected = _getReportedPeptideIdsForDisplay_ProteinPositionsSelected
}
