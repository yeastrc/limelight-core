/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages: SingleSearch__SubSearches - Result Data
 *
 */



/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result {

    private _resultPerProjectSearchId: Map<number, Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch> = new Map();

    get_result_For_SearchSubGroup_Id( searchSubGroup_Id: number ) {
        return this._resultPerProjectSearchId.get(searchSubGroup_Id);
    }
    add_result_For_SearchSubGroup_Id( item: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch ) : void {
        this._resultPerProjectSearchId.set( item.searchSubGroup_Id, item );
    }
}

/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch {

    readonly searchSubGroup_Id: number

    readonly distinctPeptide_Count_Containing_MissedCleavage: number

    readonly psm_Count_Containing_MissedCleavage: number
    readonly missedCleavage_TotalCount_AcrossAllPSMs: number

    readonly total_PSM_Count: number
    readonly total_DistinctPeptide_Count: number
}
