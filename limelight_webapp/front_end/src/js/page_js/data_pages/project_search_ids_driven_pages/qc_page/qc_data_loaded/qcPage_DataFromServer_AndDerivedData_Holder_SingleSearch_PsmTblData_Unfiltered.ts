/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - PSM Table Data - Unfiltered - ALL PSMs for Search Id
 *
 */

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root {

    private _psmTblData_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSingleReportedPeptideId> = new Map();
    private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId> = new Map();

    constructor() { }

    get_PsmTblData_Unfiltered__GetPsmCount() : number {
        return this._psmTblData_Map_Key_PsmId.size;
    }

    get_PsmTblData_Unfiltered_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._psmTblData_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_PsmTblData_Unfiltered_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Unfiltered_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }

    //  ADD

    add_PsmTblData_Unfiltered_For_ReportedPeptideId(item: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSingleReportedPeptideId) : void {
        this._psmTblData_Map_Key_ReportedPeptideId.set(item.reportedPeptideId, item);
    }

    add_PsmTblData_Unfiltered_For_PsmId(item: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId) : void {
        this._psmTblData_Map_Key_PsmId.set(item.psmId, item);
    }

}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId> = new Map()

    constructor(
        {
            reportedPeptideId
        }: {
            reportedPeptideId: number
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
    }

    get_PsmTblData_Unfiltered_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_PsmTblData_Unfiltered_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId> {

        return this._psmTblData_Map_Key_PsmId.values()
    }

    add_PsmTblData_Unfiltered_For_PsmId(item: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId) {
        return this._psmTblData_Map_Key_PsmId.set(item.psmId, item);
    }

}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId {

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
}


