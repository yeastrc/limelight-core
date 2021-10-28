/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - PSM Filterable Annotation Data for Annotation Type Ids
 *
 */


/////////////////

////  psmFilterableAnnotationData

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root {

    private _per_Psm_Holder_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId>
    private _per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder>

    constructor(
        {
            psmTblData_Map_Key_ReportedPeptideId, per_Psm_Holder_Map_Key_PsmId
        }: {
            psmTblData_Map_Key_ReportedPeptideId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId>
            per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder>
        }
    ) {
        this._per_Psm_Holder_Map_Key_ReportedPeptideId = psmTblData_Map_Key_ReportedPeptideId;
        this._per_Psm_Holder_Map_Key_PsmId = per_Psm_Holder_Map_Key_PsmId;
    }

    get_Per_Psm_Holder_For_ReportedPeptideId(reportedPeptideId: number) {
        return this._per_Psm_Holder_Map_Key_ReportedPeptideId.get(reportedPeptideId);
    }

    get_Per_Psm_Holder_For_PsmId(psmId: number) {
        return this._per_Psm_Holder_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_Per_Psm_Holder_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> {

        return this._per_Psm_Holder_Map_Key_PsmId.values()
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId {

    readonly reportedPeptideId: number;
    private _psmTblData_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> = new Map()

    constructor(
        {
            reportedPeptideId
        }: {
            reportedPeptideId: number
        }
    ) {
        this.reportedPeptideId = reportedPeptideId;
    }

    get_Per_Psm_Holder_Holder_For_PsmId(psmId: number) {
        return this._psmTblData_Map_Key_PsmId.get(psmId);
    }

    /**
     *
     */
    get_Per_Psm_Holder_Holder_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder> {

        return this._psmTblData_Map_Key_PsmId.values()
    }

    //  Add to Map

    /**
     * Set to Map
     * @param entry
     */
    set_Per_Psm_Holder_Holder( psmTblDataEntry_holder : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder ) {
        this._psmTblData_Map_Key_PsmId.set(psmTblDataEntry_holder.psmTblData_Entry.psmId, psmTblDataEntry_holder);
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder {

    readonly psmTblData_Entry: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId
    private _psmFilterableAnnotationData_Map_Key_AnnotationTypeId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId> = new Map()

    constructor(
        {
            psmTblData_Entry
        } : {
            psmTblData_Entry: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId
        }
    ) {
        this.psmTblData_Entry = psmTblData_Entry;
    }

    get_PsmFilterableAnnotationData_For_AnnotationTypeId(annotationTypeId: number) {
        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.get(annotationTypeId);
    }

    /**
     *
     */
    get_PsmFilterableAnnotationData_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId> {

        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.values()
    }

    //  Add to Map

    /**
     * Set to Map
     * @param entry
     */
    set_PsmFilterableAnnotationData( entry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId ) {
        this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.set(entry.annotationTypeId, entry);
    }
}

/**
 *  !!!   cast of object returned from webservice with property reportedPeptideId populated in the Javascript code
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId {

    readonly psmId: number;
    readonly reportedPeptideId: number;
}


/**
 * !!!   cast of object returned from webservice
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId {

    readonly psmId: number;
    readonly annotationTypeId: number;
    readonly annotationValueNumber: number;
}
