/**
 * common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records.ts
 *
 *
 */

import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export class Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result {

    readonly allEntries: ReadonlyArray<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>

    private _entriesFor_AnnotationTypeId_Map_Key_PsmId: Map<number, Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId>

    constructor(
        {
            allEntries, entriesForAnnotationTypeId_Map_Key_PsmId
        } : {
            allEntries: ReadonlyArray<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
            entriesForAnnotationTypeId_Map_Key_PsmId: Map<number, Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId>
        }
    ) {
        this.allEntries = allEntries
        this._entriesFor_AnnotationTypeId_Map_Key_PsmId = entriesForAnnotationTypeId_Map_Key_PsmId
    }

    get_EntriesForAll_AnnotationTypeId_Values__For_PsmId( psmId: number ) {

        return this._entriesFor_AnnotationTypeId_Map_Key_PsmId.get( psmId )
    }
}

export class Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId {


    private _entries_Array__Map_Key_AnnotationTypeId: Map<number, Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>>

    constructor(
        {
            entries_Array__Map_Key_AnnotationTypeId
        } : {
            entries_Array__Map_Key_AnnotationTypeId: Map<number, Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>>
        }
    ) {
        this._entries_Array__Map_Key_AnnotationTypeId = entries_Array__Map_Key_AnnotationTypeId
    }

    get_EntriesArray_For_AnnotationTypeId( annotationTypeId: number ) {

        return this._entries_Array__Map_Key_AnnotationTypeId.get( annotationTypeId )
    }
}

export class Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry {

    readonly psmId: number
    readonly annotationTypeId: number
    readonly peptidePosition: number
    readonly valueDouble: number
}


/**
 * Get PsmPeptidePositionAnnotation Records
 *
 * NO Caching of data
 */
export const common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records = function (
    {
        projectSearchId, annotationTypeIds, psmIds
    } : {
        projectSearchId: number
        annotationTypeIds: Array<number>
        psmIds: Array<number>
    }
) { try {

    return new Promise<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result>( ( resolve, reject) => { try {

        const requestObject = {
            projectSearchId,
            annotationTypeIds,
            psmIds
        }

        const url = "psm-peptide-position-annotations-for-psm-ids-annotation-type-id-single-project-search-id-rest-webservice-controller"

        console.log("AJAX Call to " + url + " START, Now: " + new Date() );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
        // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = webserviceCallStandardPostResponse.api;

        promise_webserviceCallStandardPost.catch( () => {
            // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
            reject()
        });

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: INTERNAL_WebserviceResponse }) => {
            try {
                // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

                console.log("AJAX Call to " + url + " END, Now: " + new Date() );

                const result = _process_WebserviceResponse( responseData )

                resolve( result );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

                reject();

                throw e;
            }
        });

    } catch( e ) {
        // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    }})

} catch( e ) {
    // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    throw e;
}
}

/**
 *
 * @param webserviceResponse
 */
const _process_WebserviceResponse = function ( webserviceResponse: INTERNAL_WebserviceResponse ) : Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result {

    const entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId: Map<number, Map<number, Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>>> = new Map()

    for ( const webserviceResponse_Entry of webserviceResponse.resultList ) {

        let entries_Array__Map_Key_AnnotationTypeId = entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId.get( webserviceResponse_Entry.psmId )
        if ( ! entries_Array__Map_Key_AnnotationTypeId ) {
            entries_Array__Map_Key_AnnotationTypeId = new Map()
            entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId.set( webserviceResponse_Entry.psmId, entries_Array__Map_Key_AnnotationTypeId )
        }

        let entries_Array = entries_Array__Map_Key_AnnotationTypeId.get( webserviceResponse_Entry.annotationTypeId )
        if ( ! entries_Array ) {
            entries_Array = []
            entries_Array__Map_Key_AnnotationTypeId.set( webserviceResponse_Entry.annotationTypeId, entries_Array )
        }

        entries_Array.push( webserviceResponse_Entry )
    }

    const entriesForAnnotationTypeId_Map_Key_PsmId: Map<number, Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId> = new Map()

    for ( const entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId_ENTRY of entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId.entries() ) {

        const psmId = entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId_ENTRY[ 0 ]
        const entries_Array__Map_Key_AnnotationTypeId = entries_Array__Map_Key_AnnotationTypeId_Map_Key_PsmId_ENTRY[ 1 ]

        const psmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId = new Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId({
            entries_Array__Map_Key_AnnotationTypeId
        })

        entriesForAnnotationTypeId_Map_Key_PsmId.set( psmId, psmPeptidePositionAnnotation_Records_Result_EntriesForAnnotationTypeId )
    }

    const result = new Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_Result({
        allEntries: webserviceResponse.resultList, entriesForAnnotationTypeId_Map_Key_PsmId
    })

    return result
}


class INTERNAL_WebserviceResponse {

    resultList: Array<Common_data_loaded_from_server_single_search_FilterOn_PSM_IDs_AnnotationTypeId__PsmPeptidePositionAnnotation_Records_ResultEntry>
}