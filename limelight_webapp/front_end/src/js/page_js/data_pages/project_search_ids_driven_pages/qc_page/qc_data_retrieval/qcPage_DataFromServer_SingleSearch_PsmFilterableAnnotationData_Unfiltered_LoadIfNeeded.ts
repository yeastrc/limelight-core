/**
 * qcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_Unfiltered_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Psm Filterable Annotation Data - UNFILTERED - Load if Needed
 *
 */


// This Needs to:
//
// Pass annotation type ids to webservice
//
// Copy in the annotation data to new JS class
//
// Handle more than 1 request with different annotation type ids and track them separately with separate Promise objects.
//
//     Combine the results of requests into single object graph under single QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData__PSM_Entry_Holder,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleAnnotationTypeId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_ForSingleReportedPeptideId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered";

/**
 * Internal Class to track a single "retrieval" from server
 */
class Internal_WebserviceRetrieval_InProgress_Item {

    psmFilterableAnnotationTypeIds_Requested: Set<number>
    promise: Promise<void>
}

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_PsmFilterableAnnotationData_Unfiltered_LoadIfNeeded {

    private _webserviceRetrievals_InProgress: Array<Internal_WebserviceRetrieval_InProgress_Item> = []

    /**
     * @returns null if no promise needed
     */
    singleSearch_PsmFilterableAnnotationData_LoadIfNeeded(
        {
            psmFilterableAnnotationTypeIds_Requested, retrievalParams, data_Holder_SingleSearch
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        let psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded = new Set(psmFilterableAnnotationTypeIds_Requested);  //  will delete from set

        if (data_Holder_SingleSearch.psmFilterableAnnotationData_Unfiltered) {

            for (const psmFilterableAnnotationTypeId_Requested of psmFilterableAnnotationTypeIds_Requested) {

                if (data_Holder_SingleSearch.psmFilterableAnnotationData_Unfiltered.is_psmFilterableAnnotationTypeId_Loaded(psmFilterableAnnotationTypeId_Requested)) {
                    // already loaded
                    psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded.delete(psmFilterableAnnotationTypeId_Requested);
                }
            }

            if (psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded.size === 0) {

                //  Data already loaded so return null
                return null;
            }
        }

        //  Find all existing requests in progress that contain   psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded

        let psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests = new Set(psmFilterableAnnotationTypeIds_Requested_NotAlreadyLoaded);  //  will delete from set

        const promises_ToIncludeForThisRequest: Array<Promise<void>> = [];

        for ( const webserviceRetrieval_InProgress of this._webserviceRetrievals_InProgress ) {

            let foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest = false;
            for ( const psmFilterableAnnotationTypeId_Requested_InProgress of webserviceRetrieval_InProgress.psmFilterableAnnotationTypeIds_Requested ) {
                if ( psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests.delete( psmFilterableAnnotationTypeId_Requested_InProgress ) ) {
                    foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest = true;
                }
            }
            if ( foundAny_psmFilterableAnnotationTypeIds_Requested_CurrentRequest ) {
                promises_ToIncludeForThisRequest.push( webserviceRetrieval_InProgress.promise );
            }
        }

        if ( psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests.size > 0 ) {
            //  Still have psmFilterableAnnotationTypeIds to get data for

            const promise = this._loadDataFor_psmFilterableAnnotationTypeIds_Requested({
                psmFilterableAnnotationTypeIds_Requested: psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests,
                retrievalParams,
                data_Holder_SingleSearch
            });

            //  Add promise to promises_ToIncludeForThisRequest

            promises_ToIncludeForThisRequest.push( promise );

            //  Save Request to Retrievals in Progress

            const item : Internal_WebserviceRetrieval_InProgress_Item = {
                promise,
                psmFilterableAnnotationTypeIds_Requested: psmFilterableAnnotationTypeIds_Requested_RemoveInProgressRequests
            }

            this._webserviceRetrievals_InProgress.push( item )
        }

        return new Promise<void>( (resolve, reject) => {
            const promise = Promise.all( promises_ToIncludeForThisRequest )
            promise.catch( reason => {
                reject(reason);
            })
            promise.then( result => {
                resolve();
            })
        })
    }

    /**
     *
     */
    private _loadDataFor_psmFilterableAnnotationTypeIds_Requested(
        {
            psmFilterableAnnotationTypeIds_Requested, retrievalParams, data_Holder_SingleSearch
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        const psmFilterableAnnotationTypeIds = Array.from( psmFilterableAnnotationTypeIds_Requested );

        const projectSearchId = retrievalParams.projectSearchId;

        return new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/psm-filterable-annotation-data--no-filtering--single-project-search-id-version-0001";

                const requestData = { projectSearchId, psmFilterableAnnotationTypeIds };

                console.log( "START: getting data from URL: " + url );

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        console.log( "END: REJECTED: getting data from URL: " + url );

                        this._removeFrom__webserviceRetrievals_InProgress_Array({ psmFilterableAnnotationTypeIds_Requested });

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        console.log( "END: Successful: getting data from URL: " + url );

                        this._removeFrom__webserviceRetrievals_InProgress_Array({ psmFilterableAnnotationTypeIds_Requested });

                        _populateHolder({ psmFilterableAnnotationTypeIds_Requested, responseData, data_Holder_SingleSearch });

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                } );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     * Remove entry in this._webserviceRetrievals_InProgress containing any of psmFilterableAnnotationTypeIds_Requested
     */
    private _removeFrom__webserviceRetrievals_InProgress_Array(
        {
            psmFilterableAnnotationTypeIds_Requested
        } : {
            psmFilterableAnnotationTypeIds_Requested: Set<number>
        }
    ) : void {

        this._webserviceRetrievals_InProgress =
            this._webserviceRetrievals_InProgress.filter( entry => {
                for ( const psmFilterableAnnotationTypeId of psmFilterableAnnotationTypeIds_Requested ) {
                    if (entry.psmFilterableAnnotationTypeIds_Requested.has(psmFilterableAnnotationTypeId)) {
                        return false
                    }
                }
                return true

            });
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        psmFilterableAnnotationTypeIds_Requested,
        responseData, data_Holder_SingleSearch
    } : {
        psmFilterableAnnotationTypeIds_Requested: Set<number>
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    let psmFilterableAnnotationData_Unfiltered = data_Holder_SingleSearch.psmFilterableAnnotationData_Unfiltered;
    if ( ! psmFilterableAnnotationData_Unfiltered ) {
        psmFilterableAnnotationData_Unfiltered = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_Root();
        data_Holder_SingleSearch.psmFilterableAnnotationData_Unfiltered = psmFilterableAnnotationData_Unfiltered;
    }

    if ( responseData.psmFilterableAnnotationDataList_List ) {
        if ( ! ( responseData.psmFilterableAnnotationDataList_List instanceof Array ) ) {
            const msg = "( ! ( responseData.psmFilterableAnnotationDataList_List instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const psmFilterableAnnotationDataList_List_Entry of responseData.psmFilterableAnnotationDataList_List ) {

            if ( psmFilterableAnnotationDataList_List_Entry.psmId === undefined || psmFilterableAnnotationDataList_List_Entry.psmId === null ) {
                const msg = "( psmFilterableAnnotationDataList_List_Entry.psmId === undefined || psmFilterableAnnotationDataList_List_Entry.psmId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.psmId ) ) {
                const msg = "( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.psmId ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( psmFilterableAnnotationDataList_List_Entry.annTpId === undefined || psmFilterableAnnotationDataList_List_Entry.annTpId === null ) {
                const msg = "( psmFilterableAnnotationDataList_List_Entry.annTpId === undefined || psmFilterableAnnotationDataList_List_Entry.annTpId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.annTpId ) ) {
                const msg = "( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.annTpId ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( psmFilterableAnnotationDataList_List_Entry.annVlNbr === undefined || psmFilterableAnnotationDataList_List_Entry.annVlNbr === null ) {
                const msg = "( psmFilterableAnnotationDataList_List_Entry.annVlNbr === undefined || psmFilterableAnnotationDataList_List_Entry.annVlNbr === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.annVlNbr ) ) {
                const msg = "( ! variable_is_type_number_Check( psmFilterableAnnotationDataList_List_Entry.annVlNbr ) )";
                console.warn(msg);
                throw Error(msg);
            }

            const psmId = psmFilterableAnnotationDataList_List_Entry.psmId as number;
            const annotationTypeId = psmFilterableAnnotationDataList_List_Entry.annTpId as number;
            const annotationValueNumber = psmFilterableAnnotationDataList_List_Entry.annVlNbr as number;

            let per_Psm_Holder_Entry = psmFilterableAnnotationData_Unfiltered.get_Per_Psm_Holder_For_PsmId( psmId );
            if ( ! per_Psm_Holder_Entry ) {
                per_Psm_Holder_Entry = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder({ psmId });
                psmFilterableAnnotationData_Unfiltered.set_Per_Psm_Holder_For_PsmId( per_Psm_Holder_Entry );
            }

            const entry_ForSingleAnnotationTypeId : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered_ForSingleAnnotationTypeId = {
                annotationTypeId, annotationValueNumber
            }
            per_Psm_Holder_Entry.set_PsmFilterableAnnotationData( entry_ForSingleAnnotationTypeId );
        }
    }

    for ( const psmFilterableAnnotationTypeId of psmFilterableAnnotationTypeIds_Requested ) {
        psmFilterableAnnotationData_Unfiltered.add_psmFilterableAnnotationTypeId_Loaded( psmFilterableAnnotationTypeId );
    }

}