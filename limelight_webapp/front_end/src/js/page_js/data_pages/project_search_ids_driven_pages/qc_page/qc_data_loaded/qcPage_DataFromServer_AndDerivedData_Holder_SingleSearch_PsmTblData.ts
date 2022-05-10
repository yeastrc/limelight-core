/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - PSM Table Data
 *
 */


/////////////////

////  psmTblData

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root {

    private _psmTblData_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId>
    private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>

    constructor(
        {
            psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            psmTblData_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId>
            psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>
        }
    ) {
        this._psmTblData_Map_Key_ReportedPeptideId = psmTblData_Map_Key_ReportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._psmTblData_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>

    constructor(
        {
            reportedPeptideId, psmTblData_Map_Key_PsmId
        }: {
            reportedPeptideId: number
            psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
        this._psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId;
    }

    get_PsmTblData_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId {

    readonly psmId: number;
    readonly reportedPeptideId: number;
    readonly charge: number;
    readonly scanNumber: number;
    readonly searchScanFileId: number; // Can be null
    readonly retentionTimeSeconds: number; // Float, Can be null
    readonly precursor_M_Over_Z: number; // Double, Can be null
    readonly hasModifications: boolean;
    readonly hasOpenModifications: boolean;
    readonly hasReporterIons: boolean;

    readonly independentDecoyPSM: boolean;   // skip 'is_decoy' since is excluded in WHERE clause in SQL query
}


