/**
 * psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer.ts
 * 
 * 
 * Common Child Table: show PSMs for Project Search Id and Reported Peptide Id and PSM Filters and maybe PSM Ids
 * 
 * React Component that is shown for child of Data Table Row and will contain child table 
 * 
 * Get Data from Server
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from 'page_js/webservice_call_common/webserviceCallStandardPost_ApiObject_Class';

//   From data_pages_common
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters"; // dataPageStateManager.ts


/**
 * 
 */
export const getPSMDataFromServer = function({ 
    
    projectSearchId, 
    reportedPeptideId,  // NOT required if have psmIds_Include
    searchSubGroupId,   // Optional, only allowed if reportedPeptideId is populated
    psmIds_Include, // Optional
    searchDataLookupParamsRoot,
    dataPageStateManager,
    webserviceCallStandardPost_ApiObject_Holder_Class
} : { 
    projectSearchId : number
    reportedPeptideId : number  // NOT required if have psmIds_Include
    searchSubGroupId : number     // Optional, only allowed if reportedPeptideId is populated
    psmIds_Include: ReadonlySet<number>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    dataPageStateManager : DataPageStateManager,
    webserviceCallStandardPost_ApiObject_Holder_Class : WebserviceCallStandardPost_ApiObject_Holder_Class
}) : Promise<any> {

    if ( reportedPeptideId === undefined && searchSubGroupId !== undefined ) {
        throw Error("ERROR: reportedPeptideId === undefined && searchSubGroupId !== undefined : getPSMDataFromServer");
    }

    return new Promise( ( resolve, reject ) => {
        try {

            let psmIds_Include_Array : Array<number> = undefined

            if ( psmIds_Include ) {
                psmIds_Include_Array = Array.from(psmIds_Include)
            }

            let searchDetails_Filters_AnnTypeDisplay_ForProjectSearchId = _getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId({ projectSearchId, searchDataLookupParamsRoot });

            let psmAnnotationTypeIdsForSorting : Array<number> = _get_Psm_AnnotationTypeIds_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });
            
            let requestObject = {
                projectSearchId,
                psmIds_Include : psmIds_Include_Array, // Optional.  If provided, override psmIds retrieved based on searchDataLookupParams_For_Single_ProjectSearchId
                // psmIds_Exclude : undefined, // Optional.  If provided, Additive to
                reportedPeptideId,    // NOT required if have psmIds_Include
                searchSubGroupId,   // Optional, only allowed if reportedPeptideId is populated
                searchDataLookupParams_For_Single_ProjectSearchId : searchDetails_Filters_AnnTypeDisplay_ForProjectSearchId,
                psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting
            };

            console.log("AJAX Call to d/rws/for-page/psb/psm-list START, Now: " + new Date() );
            
            const url = "d/rws/for-page/psb/psm-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, webserviceCallStandardPost_ApiObject_Holder_Class }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
            // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = webserviceCallStandardPostResponse.api;

            promise_webserviceCallStandardPost.catch( () => { 
                // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
                reject() 
            });

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

                    console.log("AJAX Call to d/rws/for-page/psb/psm-list END, Now: " + new Date() );

                    resolve( responseData );
                    
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

                    reject();

                    throw e;
                }
            });

        } catch( e ) {
            // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}


/**
 * 
 */
const _get_Psm_AnnotationTypeIds_WhereSortOrderPopulated = function({ 
    
    projectSearchId, 
    dataPageStateManager
} : { 
    projectSearchId : number, 
    dataPageStateManager : DataPageStateManager 
}) : Array<number> {

    let psmFilterableAnnotationTypes_WhereSortOrderPopulated : Array<AnnotationTypeItem> = _get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });
    
    let result : Array<number> = [];
    
    for ( const element of psmFilterableAnnotationTypes_WhereSortOrderPopulated ) {
        result.push( element.annotationTypeId );
    }
    
    return result;
}

/**
 * Return array ann type entries, sorted on sortOrder
 */
const _get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated = function({ 
    
    projectSearchId, 
    dataPageStateManager
} : { 
    projectSearchId : number, 
    dataPageStateManager : DataPageStateManager 
}) : Array<AnnotationTypeItem> {

    //   Get all Psm annotation type records with sortOrder set

    let annotationTypeData : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

    let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }

    let psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
    if ( ! psmFilterableAnnotationTypes_Map ) {
        //  No data so return empty array
        return []; //  EARLY RETURN
    }
    
    //  Get AnnotationType Records where sortOrder is populated
    
    let psmFilterableAnnotationTypes_SortOrderPopulated : Array<AnnotationTypeItem> = [];
    
    for ( const psmFilterableAnnotationTypes_MapEntry of psmFilterableAnnotationTypes_Map.entries() ) {
        let annotationTypeEntry = psmFilterableAnnotationTypes_MapEntry[ 1 ]; // map entry value
        if ( annotationTypeEntry.sortOrder ) {
            psmFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntry );
        }
    }

    
    //  Sort on sort order
    
    psmFilterableAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
        if ( a.sortOrder < b.sortOrder ) {
            return -1;
        }
        if ( a.sortOrder > b.sortOrder ) {
            return 1;
        }
        return 0;
    })
    
    return psmFilterableAnnotationTypes_SortOrderPopulated;
};


	/////////////////////////////////////////////////////////////////////////////

/**
 * Get Search Details (filters, ann types to display) for Webservice Calls, Single Project Search Id
 * 
 * @param dataPageStateManager - optional.  Uses value from constructor if not set 
 * @returns part of searchDetails_Filters_AnnTypeDisplay_Root passed to store... method: which is object Parsed from JSON passed in HTML from server on page load
 * 				Return value has no type info since is from object Parsed from JSON passed in HTML from server on page load
 */
const _getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId = function( 
    { projectSearchId, searchDataLookupParamsRoot }  :
        {
            projectSearchId: number,
            searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        }) {

    let paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
    if ( ! paramsForProjectSearchIds ) {
        throw Error("No value for paramsForProjectSearchIds");
    }

    //  filtersAnnTypeDisplayPerProjectSearchIds is array in same order as projectSearchIds
    let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
    if ( ! filtersAnnTypeDisplayPerProjectSearchIds ) {
        throw Error("No value for filtersAnnTypeDisplayPerProjectSearchIds");
    }
    
    let filtersAnnTypeDisplay_SingleProjectSearchId = undefined;
    for ( const filtersAnnTypeDisplayPerProjectSearchIdsItem of filtersAnnTypeDisplayPerProjectSearchIds ) {
        if ( filtersAnnTypeDisplayPerProjectSearchIdsItem.projectSearchId === projectSearchId ) {
            filtersAnnTypeDisplay_SingleProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIdsItem;
            break;
        }
    }
    
    if ( ! filtersAnnTypeDisplay_SingleProjectSearchId ) {
        throw Error( "getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId: No Entry for projectSearchId: " + projectSearchId );
    }
    

    //  No translation for now
    
    return filtersAnnTypeDisplay_SingleProjectSearchId;
}
