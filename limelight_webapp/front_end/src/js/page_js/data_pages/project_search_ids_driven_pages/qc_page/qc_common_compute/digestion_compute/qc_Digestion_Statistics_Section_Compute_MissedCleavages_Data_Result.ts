/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Result Data
 *
 */



/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result {

    private _resultPerProjectSearchId: Map<number, Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch> = new Map();

    get_result_ForProjectSearchId( projectSearchId: number ) {
        return this._resultPerProjectSearchId.get(projectSearchId);
    }
    add_result_ForProjectSearchId( item: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch ) : void {
        this._resultPerProjectSearchId.set( item.projectSearchId, item );
    }
}

/**
 *
 */
export class Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch {

    readonly projectSearchId: number

    readonly distinctPeptide_Count_Containing_MissedCleavage: number

    readonly psm_Count_Containing_MissedCleavage: number
    readonly missedCleavage_TotalCount_AcrossAllPSMs: number

    readonly total_PSM_Count: number
    readonly total_DistinctPeptide_Count: number
}
