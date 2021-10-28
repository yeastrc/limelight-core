/**
 * qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered.ts
 *
 * QC Page - Data Loaded - From Server - Single Search - PSM Filterable Annotation Data for Annotation Type Ids
 *
 */


/////////////////

////

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_Root {

    private _per_Psm_Holder_Map_Key_PsmId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder> = new Map();

    private _psmFilterableAnnotationTypeIds_Loaded: Set<number> = new Set();

    constructor() {}

    get_Per_Psm_Holder_For_PsmId(psmId: number) {
        return this._per_Psm_Holder_Map_Key_PsmId.get(psmId);
    }

    set_Per_Psm_Holder_For_PsmId( item: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder ) : void {
        this._per_Psm_Holder_Map_Key_PsmId.set( item.psmId, item );
    }

    /**
     *
     */
    get_Per_Psm_Holder_Entries_Size(): number {

        return this._per_Psm_Holder_Map_Key_PsmId.size
    }

    /**
     *
     */
    get_Per_Psm_Holder_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder> {

        return this._per_Psm_Holder_Map_Key_PsmId.values()
    }

    add_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId: number ) : void {
        this._psmFilterableAnnotationTypeIds_Loaded.add( psmFilterableAnnotationTypeId );
    }

    is_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId: number ) : boolean {
        return this._psmFilterableAnnotationTypeIds_Loaded.has( psmFilterableAnnotationTypeId );
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder {

    readonly psmId: number;
    private _psmFilterableAnnotationData_Map_Key_AnnotationTypeId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId> = new Map()

    constructor(
        {
            psmId
        } : {
            psmId: number
        }
    ) {
        this.psmId = psmId;
    }

    get_PsmFilterableAnnotationData_For_AnnotationTypeId(annotationTypeId: number) {
        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.get(annotationTypeId);
    }

    /**
     *
     */
    get_PsmFilterableAnnotationData_Entries_IterableIterator(): IterableIterator<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId> {

        return this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.values()
    }

    //  Add to Map

    /**
     * Set to Map
     * @param entry
     */
    set_PsmFilterableAnnotationData( entry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId ) {
        this._psmFilterableAnnotationData_Map_Key_AnnotationTypeId.set(entry.annotationTypeId, entry);
    }
}


/**
 * !!!   cast of object returned from webservice
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId {

    readonly annotationTypeId: number;
    readonly annotationValueNumber: number;
}
