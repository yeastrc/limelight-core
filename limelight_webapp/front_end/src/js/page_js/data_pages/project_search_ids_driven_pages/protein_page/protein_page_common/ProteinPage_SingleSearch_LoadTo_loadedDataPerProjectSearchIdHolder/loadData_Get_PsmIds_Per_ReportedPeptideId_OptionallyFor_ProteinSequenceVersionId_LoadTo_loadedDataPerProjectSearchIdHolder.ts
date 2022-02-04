/**
 * loadData_PSM_Data_For_PsmIds_Per_ReportedPeptideId_OptionallyFor_ProteinSequenceVersionId_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";




//  Storing Promises so do not make webservice call to get same data more than once.  See code at bottom of file

////  !!!!!!!!!!  JS Module Local variables.   Treating JS Module like Singleton Instance of a class


/**
 * Get the PSM Ids for the Reported Peptide Ids - Optional proteinSequenceVersionId
 *
 * @param proteinSequenceVersionId - Optional.  Data for All Reported Peptide Ids if no proteinSequenceVersionId
 * @param projectSearchId
 * @param searchDataLookupParams_For_Single_ProjectSearchId
 * @param loadedDataPerProjectSearchIdHolder
 * @returns Promise or null
 */
export const loadData_Get_PsmIds_Per_ReportedPeptideId_OptionallyFor_ProteinSequenceVersionId_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        proteinSequenceVersionId,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {

        proteinSequenceVersionId: number
        projectSearchId: number
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    //  Default use ALL Reported Peptide Ids for main cutoffs

    let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if ( ! reportedPeptideIds ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() not return a value: loadData_Get_PsmIds_Per_ReportedPeptideId_OptionallyFor_ProteinSequenceVersionId_LoadTo_loadedDataPerProjectSearchIdHolder";
        console.warn( msg );
        throw Error( msg );
    }

    if ( reportedPeptideIds.length === 0 ) {
        //  No reportedPeptideIds

        return null; // EARLY RETURN
    }

    if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

        //  Have proteinSequenceVersionId so get Reported Peptide Ids for proteinSequenceVersionId

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

        reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (reportedPeptideIds === undefined || reportedPeptideIds.length === 0) {

            // No Reported Peptide Ids for proteinSequenceVersionId so skip loading

            return null;  // EARLY RETURN
        }
    }

    //  Get Reported Peptide Ids that don't have PSM IDs for

    let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
    if ( ! psmIdsForReportedPeptideIdMap ) {
        psmIdsForReportedPeptideIdMap = new Map();
        loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
    }

    //  First populate for reportedPeptideIds not in memory in loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();

    const reportedPeptideIds_NotHaveDataFor = new Set<number>();
    {
        for ( const reportedPeptideId of reportedPeptideIds ) {

            if ( ! psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) ) {
                reportedPeptideIds_NotHaveDataFor.add( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIds_NotHaveDataFor.size === 0 ) {
        //  No data needs to be loaded
        return null; // EARLY RETURN
    }

    // Search existing in progress AJAX calls for requested reportedPeptideIds_NotHaveDataFor

    //  Combine any existing promises for the requested data possibly with a new promise for any additional needed data

    const promises: Array<Promise<void>> = [];

    //  Delete entries in reportedPeptideIds_NotHaveDataFor as find in existing AJAX Calls

    const heldPromises__SingleHeldPromise_WithAssociatedData__Array = heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId.get(projectSearchId);
    if ( heldPromises__SingleHeldPromise_WithAssociatedData__Array ) {
        for ( const heldPromises__SingleHeldPromise_WithAssociatedData of heldPromises__SingleHeldPromise_WithAssociatedData__Array ) {

            let foundAny_reportedPeptideIds_InInProgressRequest = false;
            for ( const reportedPeptideId_InProgress of heldPromises__SingleHeldPromise_WithAssociatedData.reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise ) {

                if ( reportedPeptideIds_NotHaveDataFor.delete( reportedPeptideId_InProgress ) ) {
                    foundAny_reportedPeptideIds_InInProgressRequest = true;
                }
            }
            if ( foundAny_reportedPeptideIds_InInProgressRequest ) {
                promises.push( heldPromises__SingleHeldPromise_WithAssociatedData.promise );
            }
        }
    }

    if ( reportedPeptideIds_NotHaveDataFor.size > 0 ) {

        //  reportedPeptideIds_NotHaveDataFor Now ONLY have reportedPeptideIds that need loading that are NOT in existing AJAX request

        const reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded = new Set( reportedPeptideIds_NotHaveDataFor ); //  Create set for tracking received data for all reported peptide ids

        const reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise = new Set( reportedPeptideIds_NotHaveDataFor ); //  Create set for tracking received data for all reported peptide ids

        //  Populate reportedPeptideIdsToLoadDataFor with reportedPeptideIds that do NOT already have PSM Ids for

        const reportedPeptideIdsToLoadDataFor_AsArray: Array<number> = Array.from( reportedPeptideIds_NotHaveDataFor );

        const promise_GetData = new Promise<void>( (resolve, reject) => {
            try {
                const promise_WebserviceCall = _getPsmsIdsForReportedPeptideIdsCutoffs_WebserviceCall({
                    projectSearchId : projectSearchId,
                    reportedPeptideIds : reportedPeptideIdsToLoadDataFor_AsArray,
                    searchDataLookupParams_For_Single_ProjectSearchId
                } );

                promise_WebserviceCall.then( ( { reportedPeptideId_psmIdList_List } ) => {
                    try {
                        let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
                        if ( ! psmIdsForReportedPeptideIdMap ) {
                            psmIdsForReportedPeptideIdMap = new Map();
                            loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
                        }

                        for ( const reportedPeptideId_psmIdList_Entry of reportedPeptideId_psmIdList_List ) {

                            const reportedPeptideId = reportedPeptideId_psmIdList_Entry.reportedPeptideId;
                            const psmIdList = reportedPeptideId_psmIdList_Entry.psmIdList;

                            psmIdsForReportedPeptideIdMap.set( reportedPeptideId, psmIdList );

                            reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded.delete( reportedPeptideId );
                        }

                        if ( reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded.size !== 0 ) {
                            console.warn("reportedPeptideIds_LoadingDataFor_ForValidateAllLoaded not empty after processing AJAX response");
                        }

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
                promise_WebserviceCall.catch(function(reason) {
                    try {
                        reject(reason);
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                console.warn("Error caught: ", e )
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_GetData.catch( reason => {
            _remove_HeldPromise({ projectSearchId, reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise })
        });
        promise_GetData.then( result => {
            _remove_HeldPromise({ projectSearchId, reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise })
        })

        _add_HeldPromise({ projectSearchId, promise: promise_GetData, reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise });

        promises.push( promise_GetData );
    }

    if ( promises.length === 1 ) {

        return promises[0];
    }

    const promisesAll = Promise.all( promises );

    return promisesAll;
}


/**
 *
 *
 * Get PSM IDs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
 */
const _getPsmsIdsForReportedPeptideIdsCutoffs_WebserviceCall = function (
    {
        projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId
    }: {
        projectSearchId: number
        reportedPeptideIds: Array<number>
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
    } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    resolve({ reportedPeptideId_psmIdList_List : responseData.reportedPeptideId_psmIdList_List });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}

////  !!!!!!!!!!  JS Module Local variables.   Treating JS Module like Singleton Instance of a class


class InternalClass_SingleHeldPromise_WithAssociatedData {
    promise : Promise<void>
    reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise: Set<number>
    projectSearchId: number
}

const heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId : Map<number, Array<InternalClass_SingleHeldPromise_WithAssociatedData>> = new Map();



const _add_HeldPromise = function (
    {
        promise,
        reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise,
        projectSearchId
    } : {
        promise : Promise<void>
        reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise: Set<number>
        projectSearchId: number
    }
) : void {

    const entry : InternalClass_SingleHeldPromise_WithAssociatedData = {
        promise,
        reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise,
        projectSearchId
    }

    let heldPromises__SingleHeldPromise_WithAssociatedData__Array = heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId.get(projectSearchId);
    if ( ! heldPromises__SingleHeldPromise_WithAssociatedData__Array ) {
        heldPromises__SingleHeldPromise_WithAssociatedData__Array = [];
        heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId.set(projectSearchId, heldPromises__SingleHeldPromise_WithAssociatedData__Array);
    }
    heldPromises__SingleHeldPromise_WithAssociatedData__Array.push(entry);
}

const _remove_HeldPromise = function (
    {
        reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise,
        projectSearchId
    } : {
        reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise: Set<number>
        projectSearchId: number
    }
) : void {

    const heldPromises__SingleHeldPromise_WithAssociatedData__Array = heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId.get(projectSearchId);
    if ( heldPromises__SingleHeldPromise_WithAssociatedData__Array ) {

        let removedArrayEntry_Counter = 0;

        const new_heldPromises__SingleHeldPromise_WithAssociatedData__Array =
            heldPromises__SingleHeldPromise_WithAssociatedData__Array.filter((new_heldPromises__SingleHeldPromise_WithAssociatedData) => {
                for ( const reportedPeptideId_ToRemove of reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise ) {
                    if ( new_heldPromises__SingleHeldPromise_WithAssociatedData.reportedPeptideIds_LoadingDataFor_TrackingInProgressPromises_StoreWithPromise.has(reportedPeptideId_ToRemove)) {

                        removedArrayEntry_Counter++;
                        return false;  // Remove this entry from new Array
                    }
                }
                return true;  //  Key entry in new Array
            });
        //  Store new updated Array
        heldPromises__SingleHeldPromise_WithAssociatedData__Array__Map_Key_ProjectSearchId.set(projectSearchId, new_heldPromises__SingleHeldPromise_WithAssociatedData__Array);

        if ( removedArrayEntry_Counter === 0 ) {
            console.warn("_remove_HeldPromise did NOT remove any entries.  In loadData_PSM_Data_For_PsmIds_Per_ReportedPeptideId_OptionallyFor_ProteinSequenceVersionId_LoadTo_loadedDataPerProjectSearchIdHolder.ts")
        }
        if ( removedArrayEntry_Counter > 1 ) {
            console.warn(
                "_remove_HeldPromise removed > 1 entries.  In loadData_PSM_Data_For_PsmIds_Per_ReportedPeptideId_OptionallyFor_ProteinSequenceVersionId_LoadTo_loadedDataPerProjectSearchIdHolder.ts.  Removed # entries: "
                + removedArrayEntry_Counter
            )
        }
    }

}
