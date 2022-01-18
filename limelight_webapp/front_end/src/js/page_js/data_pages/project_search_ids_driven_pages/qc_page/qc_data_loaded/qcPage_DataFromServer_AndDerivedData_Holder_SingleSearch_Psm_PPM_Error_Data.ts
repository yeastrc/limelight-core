/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - PSM PPM Error Data
 *
 *
 *   Also used for Single Search with Sub Groups, per Search Sub Group Id
 *
 */


/////////////////

////  psm_PPM_Error_Data

/**
 * Also used for Single Search with Sub Groups, per Search Sub Group Id
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root {

    private _psm_PPM_Error_Data_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSingleReportedPeptideId>
    private _psm_PPM_Error_Data_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>

    constructor(
        {
            psm_PPM_Error_Data_Map_Key_ReportedPeptideId, psm_PPM_Error_Data_Map_Key_PsmId
        }: {
            psm_PPM_Error_Data_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSingleReportedPeptideId>
            psm_PPM_Error_Data_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>
        }
    ) {
        this._psm_PPM_Error_Data_Map_Key_ReportedPeptideId = psm_PPM_Error_Data_Map_Key_ReportedPeptideId;
        this._psm_PPM_Error_Data_Map_Key_PsmId = psm_PPM_Error_Data_Map_Key_PsmId;
    }

    get_Psm_PPM_Error_Data_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._psm_PPM_Error_Data_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_Psm_PPM_Error_Data_For_PsmId(psmId: number) {
        return this._psm_PPM_Error_Data_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_Psm_PPM_Error_Data_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId> {

        return this._psm_PPM_Error_Data_Map_Key_PsmId.values()
    }
}

/**
 * Also used for Single Search with Sub Groups, per Search Sub Group Id
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psm_PPM_Error_Data_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>

    constructor(
        {
            reportedPeptideId, psm_PPM_Error_Data_Map_Key_PsmId
        }: {
            reportedPeptideId: number
            psm_PPM_Error_Data_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
        this._psm_PPM_Error_Data_Map_Key_PsmId = psm_PPM_Error_Data_Map_Key_PsmId;
    }

    get_Psm_PPM_Error_Data_For_PsmId(psmId: number) {
        return this._psm_PPM_Error_Data_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_Psm_PPM_Error_Data_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId> {

        return this._psm_PPM_Error_Data_Map_Key_PsmId.values()
    }
}

/**
 * Also used for Single Search with Sub Groups, per Search Sub Group Id
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId {

    readonly psmId: number;
    readonly reportedPeptideId: number;
    readonly ppmError: number;
    readonly retentionTimeSeconds: number;
    readonly precursor_M_Over_Z: number;
}
