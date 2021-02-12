/**
 * proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.ts
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";



/**
 *
 */
export class ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON {

    static getReportedPeptideIdsForDisplay_ProteinPositionsSelected(
        {
            selectedProteinSequencePositions, proteinSequenceVersionId, loadedDataPerProjectSearchIdHolder
        }: {
            selectedProteinSequencePositions: Set<number>
            proteinSequenceVersionId: number
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        return _getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        })
    }

    static create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId(
        {
            reportedPeptideId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideId: number
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

        return _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({ reportedPeptideId, loadedDataPerProjectSearchIdHolder })
    }
}

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

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {
        const msg = "_getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...): proteinSequenceVersionId MUST be assigned a value.  is undefined or null";
        console.warn(msg);
        throw Error(msg);
    }

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined); // Build set of filtered reportedPeptideIds

    // 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

    //  Sequence Coverage Data
    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    if (!proteinCoverageObject) {
        //  No proteinCoverageObject for this proteinSequenceVersionId for this project search id
        //  There will then be no reportedPeptideIdAtPosition
        //  Return empty array
        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId; // EARLY EXIT

        // throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId );
    }

    //  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
    for (const selectedProteinSequencePosition of selectedProteinSequencePositions) {

        const reportedPeptideIdsAtPosition = proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition({position: selectedProteinSequencePosition});

        for (const reportedPeptideId of reportedPeptideIdsAtPosition) {

            const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({
                reportedPeptideId,
                loadedDataPerProjectSearchIdHolder
            })
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
        }
    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
}



/**
 * Create for reportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
 *
 * numPSMs is count of all For ReportedPeptideId at PSM filters
 */
const _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId = function(
    {
        reportedPeptideId,
        loadedDataPerProjectSearchIdHolder
    }: {
        reportedPeptideId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    const numPsmsForReportedPeptideIdMap: Map<number, number> = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
    if (!numPsmsForReportedPeptideIdMap) {
        throw Error("_create__ForSingleReportedPeptideId__For_ReportedPeptideId(...): loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap(); not return a value")
    }

    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
    if (numPsms === undefined || numPsms === null) {
        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
    }

    const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId: reportedPeptideId,
        psmCount_after_Include: numPsms,
        psmIds_Include: undefined,
        psmIds_UnionSelection_ExplicitSelectAll: false
    })

    return entry;
}

