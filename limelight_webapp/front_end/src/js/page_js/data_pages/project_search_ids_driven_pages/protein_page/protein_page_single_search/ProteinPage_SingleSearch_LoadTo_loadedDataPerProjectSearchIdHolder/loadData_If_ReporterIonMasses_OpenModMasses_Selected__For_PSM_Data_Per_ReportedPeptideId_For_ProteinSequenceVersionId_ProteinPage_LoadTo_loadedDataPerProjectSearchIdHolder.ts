/**
 * loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * If Reporter Ion Masses or Open Modification Masses are selected,
 * need to load PSM data to process those selections.
 *
 * For this proteinSequenceVersionId, get the PSM Data for the Reported Peptide Ids
 *
 *
 *
 * @param searchDataLookupParams_For_Single_ProjectSearchId - Optional.  If not populated, retrieved from searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId(...)
 *
 * @returns Promise or null
 */
export const loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        anyReporterIonMassesSelected,
        anyOpenModificationMassesSelected,
        proteinSequenceVersionId,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        anyReporterIonMassesSelected : boolean
        anyOpenModificationMassesSelected : boolean
        proteinSequenceVersionId,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId //  Not typed in data in any of the calls at the moment
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }  ) {

    if ( ( ! anyReporterIonMassesSelected ) && ( ! anyOpenModificationMassesSelected ) ) {

        const msg = "anyReporterIonMassesSelected or anyOpenModificationMassesSelected MUST BE true. loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId(...) ";
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {

        const msg = "searchDataLookupParams_For_Single_ProjectSearchId MUST BE populated. loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId(...) ";
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! ( searchDataLookupParams_For_Single_ProjectSearchId instanceof SearchDataLookupParams_For_Single_ProjectSearchId ) ) {

        const msg = "searchDataLookupParams_For_Single_ProjectSearchId MUST BE instance of SearchDataLookupParams_For_Single_ProjectSearchId. loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId(...) ";
        console.warn( msg );
        throw Error( msg );
    }

    //  Get Reported Peptide Ids for proteinSequenceVersionId

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

        // No Reported Peptide Ids so skip

        return null;  // EARLY RETURN
    }

    let reportedPeptideIds_Get_ReporterIonData_For : Array<number> = null;
    let reportedPeptideIds_Get_OpenModificationData_For : Array<number> = null;

    if ( anyReporterIonMassesSelected ) {

        //  Get Reported Peptide Ids that need Reporter Ion data loaded for:

        reportedPeptideIds_Get_ReporterIonData_For = _loadDataFor_PSM_ReporterIonMasses_Get_ReportedPeptideId_ToLoadDataFor({
            reportedPeptideIds, loadedDataPerProjectSearchIdHolder
        });
    }
    if ( anyOpenModificationMassesSelected ) {

        //  Get Reported Peptide Ids that need Open Modification data loaded for:

        reportedPeptideIds_Get_OpenModificationData_For = _loadDataFor_PSM_OpenModificationMasses_Get_ReportedPeptideId_ToLoadDataFor({
            reportedPeptideIds, loadedDataPerProjectSearchIdHolder
        });
    }

    if ( ( reportedPeptideIds_Get_ReporterIonData_For === null || reportedPeptideIds_Get_ReporterIonData_For.length === 0 )
        && ( reportedPeptideIds_Get_OpenModificationData_For === null || reportedPeptideIds_Get_OpenModificationData_For.length === 0 ) ) {

        //  No Reporter Ion Mass OR Open Modification data to retrieve

        return null; //  EARLY RETURN
    }


    //  Get Reporter Ion and/or Open Mod data at PSM level

    const promises : Array<Promise<unknown>> = []

    //  Comment out since getting PSM IDs in _loadDataFor_PSM_FilterableAnnotationValues_ForBeingFilteredOn__Per_ReportedPeptideId_For_ProteinSequenceVersionId
    // { //  Get PSM Ids
    //     const promise = _loadDataFor_PSM_Ids_Per_ReportedPeptideId_For_ProteinSequenceVersionId({
    //         proteinSequenceVersionId, projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, loadedDataPerProjectSearchIdHolder
    //     })
    //
    //     if ( promise ) {
    //         promises.push( promise )
    //     }
    // }

    { //  Get PSM annotation values for annotation ids being filtered on
        const promise = _loadDataFor_PSM_FilterableAnnotationValues_ForBeingFilteredOn__Per_ReportedPeptideId_For_ProteinSequenceVersionId({
            proteinSequenceVersionId, projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, loadedDataPerProjectSearchIdHolder
        })

        if ( promise ) {
            promises.push( promise )
        }
    }


    if ( anyReporterIonMassesSelected ) {

        //  Get Reporter Ion data

        const promise = _loadDataFor_PSM_ReporterIonMasses_For_ReportedPeptideIdsToLoadDataFor({
            reportedPeptideIdsToLoadDataFor: reportedPeptideIds_Get_ReporterIonData_For,
            projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        });

        if ( promise ) {
            promises.push( promise )
        }
    }

    if ( anyOpenModificationMassesSelected ) {

        //  Get Open Modification data

        const promise = _loadDataFor_PSM_OpenModificationMasses_For_ReportedPeptideIdsToLoadDataFor({
            reportedPeptideIdsToLoadDataFor: reportedPeptideIds_Get_OpenModificationData_For,
            projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        });

        if ( promise ) {
            promises.push( promise )
        }
    }

    if ( promises.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promisesAll = Promise.all( promises )

    return promisesAll;
}

//////////


//  Comment out since get PSM IDs in _loadDataFor_PSM_FilterableAnnotationValues_ForBeingFilteredOn__Per_ReportedPeptideId_For_ProteinSequenceVersionId

// /**
//  *
//  * For this proteinSequenceVersionId, get the PSM Ids for the Reported Peptide Ids
//  * @returns Promise or null
//  */
// const _loadDataFor_PSM_Ids_Per_ReportedPeptideId_For_ProteinSequenceVersionId = function (
//     {
//         proteinSequenceVersionId,
//         projectSearchId,
//         searchDataLookupParams_For_Single_ProjectSearchId,
//         loadedDataPerProjectSearchIdHolder
//     } : {
//
//         proteinSequenceVersionId
//         projectSearchId
//         searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
//         loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
//
//     } ) : Promise<unknown> {
//
//     //  Get Reported Peptide Ids for proteinSequenceVersionId
//
//     const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
//
//     const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
//     if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {
//
//         // No Reported Peptide Ids so skip
//
//         return null;  // EARLY RETURN
//     }
//
//     //  Get Reported Peptide Ids that don't have PSM IDs for
//
//     let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
//     if ( ! psmIdsForReportedPeptideIdMap ) {
//         psmIdsForReportedPeptideIdMap = new Map();
//         loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
//     }
//
//     const reportedPeptideIdsToLoadDataFor = [];
//     {
//         for ( const reportedPeptideId of reportedPeptideIds ) {
//
//             if ( ! psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) ) {
//                 reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
//             }
//         }
//     }
//
//     if ( reportedPeptideIdsToLoadDataFor.length === 0 ) {
//         //  No data needs to be loaded
//         return null; // EARLY RETURN
//     }
//
//     const reportedPeptideIdsToLoadDataFor_AsSet = new Set( reportedPeptideIdsToLoadDataFor ); //  Create set for tracking received data for all reported peptide ids
//
//     return new Promise( (resolve, reject) => {
//         try {
//             const promise = _getPsmsIdsForReportedPeptideIdsCutoffs_WebserviceCall({
//                 projectSearchId : projectSearchId,
//                 reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
//                 searchDataLookupParams_For_Single_ProjectSearchId
//             } );
//
//             promise.then( ( { reportedPeptideId_psmIdList_List } ) => {
//                 try {
//                     let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
//                     if ( ! psmIdsForReportedPeptideIdMap ) {
//                         psmIdsForReportedPeptideIdMap = new Map();
//                         loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
//                     }
//
//                     for ( const reportedPeptideId_psmIdList_Entry of reportedPeptideId_psmIdList_List ) {
//
//                         const reportedPeptideId = reportedPeptideId_psmIdList_Entry.reportedPeptideId;
//                         const psmIdList = reportedPeptideId_psmIdList_Entry.psmIdList;
//
//                         psmIdsForReportedPeptideIdMap.set( reportedPeptideId, psmIdList );
//
//                         reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
//                     }
//
//                     if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
//                         console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
//                     }
//
//                     resolve();
//
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//             promise.catch(function(reason) {
//                 try {
//                     reject(reason);
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             })
//         } catch( e ) {
//             console.warn("Error caught: ", e )
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     })
// }
//
//
// /**
//  *
//  *
//  * Get PSM IDs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
//  */
// const _getPsmsIdsForReportedPeptideIdsCutoffs_WebserviceCall = function ( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {
//
//     let promise = new Promise( function( resolve, reject ) {
//         try {
//             let requestObject = {
//                 projectSearchId,
//                 reportedPeptideIds,
//                 searchDataLookupParams_For_Single_ProjectSearchId,
//             };
//
//             console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );
//
//             const url = "d/rws/for-page/psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";
//
//             const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;
//
//             const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//             promise_webserviceCallStandardPost.catch( () => { reject() }  );
//
//             promise_webserviceCallStandardPost.then( ({ responseData }) => {
//                 try {
//                     console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );
//
//                     resolve({ reportedPeptideId_psmIdList_List : responseData.reportedPeptideId_psmIdList_List });
//
//                 } catch( e ) {
//                     reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                     throw e;
//                 }
//             });
//         } catch( e ) {
//             reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//             throw e;
//         }
//     });
//
//     return promise;
// }

//////////

//

/**
 *
 * For this proteinSequenceVersionId, Get PSM Filterable Annotation Values for annotation ids being filtered on for the Reported Peptide Ids
 *
 * Also get PSM IDs here since getting them anyway
 * @returns Promise or null
 */
const _loadDataFor_PSM_FilterableAnnotationValues_ForBeingFilteredOn__Per_ReportedPeptideId_For_ProteinSequenceVersionId = function (
    {
        proteinSequenceVersionId,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {

        proteinSequenceVersionId
        projectSearchId
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    if ( ! searchDataLookupParams_For_Single_ProjectSearchId.psmFilters || searchDataLookupParams_For_Single_ProjectSearchId.psmFilters.length === 0 ) {

        // No PSM Annotation Type Ids to filter on so skip

        return null;  // EARLY RETURN
    }

    //  Get Reported Peptide Ids for proteinSequenceVersionId

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

        // No Reported Peptide Ids so skip

        return null;  // EARLY RETURN
    }

    //  Get Reported Peptide Ids that don't have PSM IDs for

    //   !!!!  Add in get PSM IDs here so don't have to make separate web service call

    let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
    if ( ! psmIdsForReportedPeptideIdMap ) {
        psmIdsForReportedPeptideIdMap = new Map();
        loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
    }

    //  Get Reported Peptide Ids that don't have PSM AnnotationData for

    let psmFilterableAnnotationValuesForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap();
    if ( ! psmFilterableAnnotationValuesForReportedPeptideIdMap ) {
        psmFilterableAnnotationValuesForReportedPeptideIdMap = new Map();
        loadedDataPerProjectSearchIdHolder.set_psmFilterableAnnotationValuesForReportedPeptideIdMap( psmFilterableAnnotationValuesForReportedPeptideIdMap );
    }

    const annotationTypeIdsToLoadDataFor_Set =  new Set<number>();

    for ( const psmFilter of searchDataLookupParams_For_Single_ProjectSearchId.psmFilters ) {

        annotationTypeIdsToLoadDataFor_Set.add( psmFilter.annTypeId );
    }

    const annotationTypeIdsToLoadDataFor : Array<number> = Array.from( annotationTypeIdsToLoadDataFor_Set )
    annotationTypeIdsToLoadDataFor.sort( (a,b) => {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    })

    const reportedPeptideIdsToLoadDataFor = [];
    {
        {
            //  For any reportedPeptideId in reportedPeptideIds that does not have entry in all psmId for current annotationTypeId,
            //    add that reportedPeptideId to Set to be retrieved from server

            loop_on_reportedPeptideIds_Label:
            for ( const reportedPeptideId of reportedPeptideIds ) {

                if ( ! psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) ) {
                    //  Need to get for psmIds
                    reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
                    continue loop_on_reportedPeptideIds_Label;  // EARLY CONTINUE to Label
                }

                //  psmFilterableAnnotationValuesForReportedPeptideIdMap 1st level Key is reportedPeptideId

                const psmFilterableAnnotationValuesMapKey_PsmId = psmFilterableAnnotationValuesForReportedPeptideIdMap.get( reportedPeptideId );

                if ( ( ! psmFilterableAnnotationValuesMapKey_PsmId ) || psmFilterableAnnotationValuesMapKey_PsmId.size === 0 ) {

                    reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
                    continue loop_on_reportedPeptideIds_Label;  // EARLY CONTINUE to Label
                }

                //  psmFilterableAnnotationValuesMapKey_PsmId 2nd level Key is psmId

                for ( const psmFilterableAnnotationValuesMap_Key_PsmId_MapEntry of psmFilterableAnnotationValuesMapKey_PsmId.entries() ) {

                    //  psmFilterableAnnotationValuesMapKey_PsmId 3nd level Key is annotationTypeId, with value of filterable annotation value

                    const psmFilterableAnnotationValuesMap_Key_AnnotationTypeId = psmFilterableAnnotationValuesMap_Key_PsmId_MapEntry[ 1 ];

                    if ( psmFilterableAnnotationValuesMap_Key_AnnotationTypeId.size === 0 ) {

                        reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
                        continue loop_on_reportedPeptideIds_Label;  // EARLY CONTINUE to Label
                    }

                    for ( const perAnnTypeIdMapEntry of psmFilterableAnnotationValuesMap_Key_AnnotationTypeId.entries() ) {

                        const annTypeId_perAnnTypeIdMapEntry = perAnnTypeIdMapEntry[ 0 ]

                        if ( ! annotationTypeIdsToLoadDataFor_Set.has( annTypeId_perAnnTypeIdMapEntry ) ) {

                            reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );

                            continue loop_on_reportedPeptideIds_Label;  // EARLY CONTINUE to Label
                        }
                    }
                }
            }
        }
    }

    if ( reportedPeptideIdsToLoadDataFor.length === 0 ) {
        //  No data needs to be loaded
        return null; // EARLY RETURN
    }

    reportedPeptideIdsToLoadDataFor.sort( (a, b) => {
        if ( a < b ) {
            return  - 1;
        }
        if ( a > b ) {
            return   1;
        }
        return 0;
    })

    const reportedPeptideIdsToLoadDataFor_AsSet = new Set( reportedPeptideIdsToLoadDataFor ); //  Create set for tracking received data for all reported peptide ids

    return new Promise( (resolve, reject) => {
        try {
            const promise = _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall({
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
                annotationTypeIds : annotationTypeIdsToLoadDataFor,
                searchDataLookupParams_For_Single_ProjectSearchId,
                return_reportedPeptideId_psmIdsList_List : true
            } );

            promise.then( ( { responseData } ) => {
                try {
                    const annValue_Entries_List = responseData.annValue_Entries_List
                    const reportedPeptideId_psmIdsList_List = responseData.reportedPeptideId_psmIdsList_List;

                    { // Process annValue_Entries_List returned

                        let psmFilterableAnnotationValuesForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap();
                        if ( ! psmFilterableAnnotationValuesForReportedPeptideIdMap ) {
                            psmFilterableAnnotationValuesForReportedPeptideIdMap = new Map();
                            loadedDataPerProjectSearchIdHolder.set_psmFilterableAnnotationValuesForReportedPeptideIdMap( psmFilterableAnnotationValuesForReportedPeptideIdMap );
                        }

                        for ( const annValue_Entries_List_Entry of annValue_Entries_List ) {

                            if ( ! variable_is_type_number_Check( annValue_Entries_List_Entry.repPId ) ) {
                                const msg = "returned annValue_Entries_List_Entry.repPId is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                console.warn( msg )
                                throw Error( msg )
                            }
                            if ( ! variable_is_type_number_Check( annValue_Entries_List_Entry.psmId ) ) {
                                const msg = "returned annValue_Entries_List_Entry.psmId is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                console.warn( msg )
                                throw Error( msg )
                            }
                            if ( ! variable_is_type_number_Check( annValue_Entries_List_Entry.anTpId ) ) {
                                const msg = "returned annValue_Entries_List_Entry.anTpId is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                console.warn( msg )
                                throw Error( msg )
                            }
                            if ( ! variable_is_type_number_Check( annValue_Entries_List_Entry.vlDbl ) ) {
                                const msg = "returned annValue_Entries_List_Entry.vlDbl is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                console.warn( msg )
                                throw Error( msg )
                            }
                            const reportedPeptideId : number = annValue_Entries_List_Entry.repPId;
                            const psmId : number = annValue_Entries_List_Entry.psmId;
                            const annotationTypeId : number = annValue_Entries_List_Entry.anTpId;
                            const valueDouble : number = annValue_Entries_List_Entry.vlDbl;
                            // const valueString : string = annValue_Entries_List_Entry.vlStr;  // comment out since not used

                            let psmFilterableAnnotationValuesMapKey_PsmId = psmFilterableAnnotationValuesForReportedPeptideIdMap.get( reportedPeptideId );
                            if ( ! psmFilterableAnnotationValuesMapKey_PsmId ) {
                                psmFilterableAnnotationValuesMapKey_PsmId = new Map();
                                psmFilterableAnnotationValuesForReportedPeptideIdMap.set( reportedPeptideId, psmFilterableAnnotationValuesMapKey_PsmId );
                            }
                            let psmFilterableAnnotationValuesMap_Key_AnnotationTypeId = psmFilterableAnnotationValuesMapKey_PsmId.get( psmId )
                            if ( ! psmFilterableAnnotationValuesMap_Key_AnnotationTypeId ) {
                                psmFilterableAnnotationValuesMap_Key_AnnotationTypeId = new Map();
                                psmFilterableAnnotationValuesMapKey_PsmId.set( psmId, psmFilterableAnnotationValuesMap_Key_AnnotationTypeId );
                            }

                            psmFilterableAnnotationValuesMap_Key_AnnotationTypeId.set( annotationTypeId, valueDouble )

                            reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
                        }
                    }

                    { // Process reportedPeptideId_psmIdsList_List returned

                        let psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
                        if ( ! psmIdsForReportedPeptideIdMap ) {
                            psmIdsForReportedPeptideIdMap = new Map();
                            loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
                        }

                        for ( const reportedPeptideId_psmIdList_Entry of reportedPeptideId_psmIdsList_List ) {

                            if ( ! variable_is_type_number_Check( reportedPeptideId_psmIdList_Entry.reportedPeptideId ) ) {
                                const msg = "returned reportedPeptideId_psmIdList_Entry.reportedPeptideId is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                console.warn( msg )
                                throw Error( msg )
                            }
                            if ( reportedPeptideId_psmIdList_Entry.psmIdList && reportedPeptideId_psmIdList_Entry.psmIdList.length > 0 ) {
                                for ( const psmId of reportedPeptideId_psmIdList_Entry.psmIdList ) {
                                    if ( ! variable_is_type_number_Check( psmId ) ) {
                                        const msg = "returned psmId of reportedPeptideId_psmIdList_Entry.psmIdList is not a number, returned from call to _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall"
                                        console.warn( msg )
                                        throw Error( msg )
                                    }
                                }
                            }
                            const reportedPeptideId = reportedPeptideId_psmIdList_Entry.reportedPeptideId;
                            const psmIdList = reportedPeptideId_psmIdList_Entry.psmIdList;

                            psmIdsForReportedPeptideIdMap.set( reportedPeptideId, psmIdList );

                            reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
                        }
                    }

                    if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
                        console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
                    }

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise.catch(function(reason) {
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
    })
}


/**
 *
 *
 * Get PSM IDs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
 */
const _getPSM_FilterableAnnotationValuesForReportedPeptideIdsCutoffs_WebserviceCall = function (
    {
        projectSearchId, reportedPeptideIds, annotationTypeIds, searchDataLookupParams_For_Single_ProjectSearchId, return_reportedPeptideId_psmIdsList_List
    } ) : Promise<{ responseData }> {

    let promise = new Promise<{ responseData }>( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                annotationTypeIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
                return_reportedPeptideId_psmIdsList_List
            };

            console.log("AJAX Call to get d/rws/for-page/psb/psm-filt-ann-values-per-reported-peptide-id-for-rep-pept-ids-ann-type-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-filt-ann-values-per-reported-peptide-id-for-rep-pept-ids-ann-type-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get d/rws/for-page/psb/psm-filt-ann-values-per-reported-peptide-id-for-rep-pept-ids-ann-type-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    resolve({ responseData });

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

/////////////

/**
 * get the  Reported Peptide Ids to load PSM Reporter Ion Masses for
 *
 * @returns reportedPeptideIds
 */
const _loadDataFor_PSM_ReporterIonMasses_Get_ReportedPeptideId_ToLoadDataFor = function (
    {
        reportedPeptideIds,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIds : Array<number>
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }  ) : Array<number> {

    //  Get Reported Peptide Ids that don't have Map< PSM ID, Set<Reporter Ion Mass> for

    let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
    if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap ) {
        psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = new Map();
        loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap );
    }

//   Reported Peptide Ids with any PSM level Reporter Ions
//  	Set
    const reportedPeptideIds_AnyPsmHas_ReporterIons = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_ReporterIons();

    if ( reportedPeptideIds_AnyPsmHas_ReporterIons.size === 0 ) {
        //  No Reported Peptide Ids with any PSM level Reporter Ions so exit
        return null; // EARLY RETURN
    }

    const reportedPeptideIdsToLoadDataFor : Array<number> = [];
    {
        for ( const reportedPeptideId of reportedPeptideIds ) {

            //  Filter Reported Peptide Ids to just ones with any PSM level Reporter Ions

            if ( ! reportedPeptideIds_AnyPsmHas_ReporterIons.has( reportedPeptideId ) ) {
                // No PSM level Reporter Ions so skip
                continue; // EARLY CONTINUE
            }

            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap.get( reportedPeptideId ) ) {
                //  Data not already retrieved so add reportedPeptideId
                reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
            }
        }
    }

    return reportedPeptideIdsToLoadDataFor;
}


/**
 * For this proteinSequenceVersionId, get the PSM Reporter Ion Masses for the Reported Peptide Ids
 *
 * @param searchDataLookupParams_For_Single_ProjectSearchId
 *
 * @returns Promise or null
 */
const _loadDataFor_PSM_ReporterIonMasses_For_ReportedPeptideIdsToLoadDataFor = function (
    {
        reportedPeptideIdsToLoadDataFor,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIdsToLoadDataFor : Array<number>
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }  ) : Promise<unknown> {

    // console.log( "loadDataFor_PSM_ReporterIonMasses_Per_ReportedPeptideId_For_ProteinSequenceVersionId")

    if ( reportedPeptideIdsToLoadDataFor.length === 0 ) {

        //  No Reporter Ion Mass data to retrieve

        return null; //  EARLY RETURN
    }

    return new Promise( (resolve, reject) => {
        try {
            const reportedPeptideIdsToLoadDataFor_AsSet = new Set( reportedPeptideIdsToLoadDataFor ); //  Create set for tracking received data for all reported peptide ids

            const promise = _getPsmsReporterIonMassesForReportedPeptideIdsCutoffs({
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
                searchDataLookupParams_For_Single_ProjectSearchId
            });

            promise.then( ( { reportedPeptideId_psmReporterIonMassesList_List } ) => {
                try {

                    //  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
                    // _psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, { reportedPeptideId, Map<PsmId, { psmId, reporterIonMasses (Set) > >

                    let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
                        loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs );
                    }

                    //  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
                    // _psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >

                    let psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
                        loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs );
                    }


                    for ( const reportedPeptideId_psmReporterIonMassesList_Entry of reportedPeptideId_psmReporterIonMassesList_List ) {

                        const reportedPeptideId = reportedPeptideId_psmReporterIonMassesList_Entry.reportedPeptideId;
                        const psmReporterIonMassesList = reportedPeptideId_psmReporterIonMassesList_Entry.psmReporterIonMassesList;

                        let psmReporterIonMassesPerPSM_ForPsmIdMap = undefined;
                        {
                            let psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                                psmReporterIonMassesPerPSM_ForPsmIdMap = new Map();
                                psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmReporterIonMassesPerPSM_ForPsmIdMap } );
                            } else {
                                psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;
                            }
                        }

                        let psmReporterIonMassesUnique_PerReportedPeptideId : Set<number> = undefined;
                        {
                            let psmReporterIonMassesUnique_PerReportedPeptideId_Object = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                            if ( ! psmReporterIonMassesUnique_PerReportedPeptideId_Object ) {
                                psmReporterIonMassesUnique_PerReportedPeptideId = new Set();
                                psmReporterIonMassesUnique_PerReportedPeptideId_Object = { reportedPeptideId, reporterIonMasses : psmReporterIonMassesUnique_PerReportedPeptideId }
                                psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, psmReporterIonMassesUnique_PerReportedPeptideId_Object );
                            } else {
                                psmReporterIonMassesUnique_PerReportedPeptideId = psmReporterIonMassesUnique_PerReportedPeptideId_Object.reporterIonMasses;
                            }
                        }

                        for ( const psmReporterIonMassEntry of psmReporterIonMassesList ) {
                            const psmId = psmReporterIonMassEntry.psmId;
                            const reporterIonMass = psmReporterIonMassEntry.reporterIonMass;

                            let psmReporterIonMassesPerPSM = undefined;
                            let psmReporterIonMassesPerPSM_Object = psmReporterIonMassesPerPSM_ForPsmIdMap.get( psmId );
                            if ( ! psmReporterIonMassesPerPSM_Object ) {
                                psmReporterIonMassesPerPSM = new Set();
                                psmReporterIonMassesPerPSM_ForPsmIdMap.set( psmId, { psmId, reporterIonMasses : psmReporterIonMassesPerPSM } );
                            } else {
                                psmReporterIonMassesPerPSM = psmReporterIonMassesPerPSM_Object.reporterIonMasses;
                            }

                            psmReporterIonMassesPerPSM.add( reporterIonMass );

                            psmReporterIonMassesUnique_PerReportedPeptideId.add( reporterIonMass );  // Unique at Reported Peptide Id
                        }

                        reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
                    }

                    if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
                        console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
                    }

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise.catch(function(reason) {
                try {
                    reject(reason);
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}


/**
 * Get PSM Reporter Ion Masses per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
 */
const _getPsmsReporterIonMassesForReportedPeptideIdsCutoffs = function ( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    resolve({ reportedPeptideId_psmReporterIonMassesList_List : responseData.reportedPeptideId_psmReporterIonMassesList_List });

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

////////////////////////

/**
 * get the  Reported Peptide Ids to load PSM Open Modification Masses for
 *
 * @returns reportedPeptideIds
 */
const _loadDataFor_PSM_OpenModificationMasses_Get_ReportedPeptideId_ToLoadDataFor = function (
    {
        reportedPeptideIds,
        loadedDataPerProjectSearchIdHolder

    } : {
        reportedPeptideIds
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Array<number> {

    //  Get Reported Peptide Ids that don't have Map< PSM ID, Set<Open Modification Mass> for

    let psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
    if ( ! psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap ) {
        psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = new Map();
        loadedDataPerProjectSearchIdHolder.set_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap );
    }

//   Reported Peptide Ids with any PSM level Open Modifications
//  	Set
    const reportedPeptideIds_AnyPsmHas_OpenModifications = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_OpenModifications();

    if ( reportedPeptideIds_AnyPsmHas_OpenModifications.size === 0 ) {
        //  No Reported Peptide Ids with any PSM level Open Modifications so exit
        return null; // EARLY RETURN
    }

    const reportedPeptideIdsToLoadDataFor = [];
    {
        for ( const reportedPeptideId of reportedPeptideIds ) {

            //  Filter Reported Peptide Ids to just ones with any PSM level Open Modifications

            if ( ! reportedPeptideIds_AnyPsmHas_OpenModifications.has( reportedPeptideId ) ) {
                // No PSM level Open Modifications so skip
                continue; // EARLY CONTINUE
            }

            if ( ! psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap.get( reportedPeptideId ) ) {
                //  Data not already retrieved so add reportedPeptideId
                reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
            }
        }
    }

    return reportedPeptideIdsToLoadDataFor;
}


/**
 * get the  Reported Peptide Ids to load PSM Open Modification Masses for
 *
 * @returns reportedPeptideIds
 */
const _loadDataFor_PSM_OpenModificationMasses_For_ReportedPeptideIdsToLoadDataFor = function (
    {
        reportedPeptideIdsToLoadDataFor,
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIdsToLoadDataFor : Array<number>
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Promise<any> {

    const reportedPeptideIdsToLoadDataFor_AsSet = new Set( reportedPeptideIdsToLoadDataFor ); //  Create set for tracking received data for all reported peptide ids

    return new Promise( (resolve, reject) => {
        try {
            const promise = _getPsmsOpenModificationMassesForReportedPeptideIdsCutoffs({
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
                searchDataLookupParams_For_Single_ProjectSearchId
            });

            promise.then( ( { reportedPeptideId_psmOpenModificationMassesList_List } ) => {
                try {

                    //  	PSM: Open Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
                    // _psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer,

                    let psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
                        loadedDataPerProjectSearchIdHolder.set_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs );
                    }

                    //  	PSM: Open Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
                    // _psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer,

                    let psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
                        loadedDataPerProjectSearchIdHolder.set_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs( psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs );
                    }


                    //  	Open Modification Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
                    // _psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<double> } > } > : Map<Reported Peptide Id, openModificationMasses (Set) >

                    let psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
                        loadedDataPerProjectSearchIdHolder.set_psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs( psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs );
                    }


                    for ( const reportedPeptideId_psmOpenModificationMassesList_Entry of reportedPeptideId_psmOpenModificationMassesList_List ) {

                        const reportedPeptideId = reportedPeptideId_psmOpenModificationMassesList_Entry.reportedPeptideId;
                        const psmOpenModificationMassesList = reportedPeptideId_psmOpenModificationMassesList_Entry.psmOpenModificationMassesList;

                        let psmOpenModificationMassesPerPSM_ForPsmIdMap :
                            Map<number,
                                {psmId: number,
                                    openModificationEntries_ForMassMap: Map<number,
                                        {openModificationMass: number, openModificationMass_Rounded: number,
                                            positions: Map<number, {position: number, isNTerminal: boolean, isCTerminal: boolean}>}[]>}> = undefined;
                        {
                            let psmOpenModificationMassesPerPSM_ForPsmIdMap_Object = psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                            if ( ! psmOpenModificationMassesPerPSM_ForPsmIdMap_Object ) {
                                psmOpenModificationMassesPerPSM_ForPsmIdMap = new Map();
                                psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmOpenModificationMassesPerPSM_ForPsmIdMap } );
                            } else {
                                psmOpenModificationMassesPerPSM_ForPsmIdMap = psmOpenModificationMassesPerPSM_ForPsmIdMap_Object.psmOpenModificationMassesPerPSM_ForPsmIdMap;
                            }
                        }

                        let psmIds_ContainAnyOpenModificationMass : Set<number> = undefined
                        let psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap : Map<number, {openModificationMass_Rounded: number, psmIds_Set: Set<number>}> = undefined
                        {
                            let psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
                            if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object ) {
                                psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap = new Map();
                                psmIds_ContainAnyOpenModificationMass = new Set();
                                psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmIds_ContainAnyOpenModificationMass, openModificationMass_RoundedMap : psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap } );
                            } else {
                                psmIds_ContainAnyOpenModificationMass = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object.psmIds_ContainAnyOpenModificationMass;
                                psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap_Object.openModificationMass_RoundedMap;
                            }
                        }

                        let psmOpenModificationMassesUnique_PerReportedPeptideId : Set<number> = undefined;
                        {
                            let psmOpenModificationMassesUnique_PerReportedPeptideId_Object = psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                            if ( ! psmOpenModificationMassesUnique_PerReportedPeptideId_Object ) {
                                psmOpenModificationMassesUnique_PerReportedPeptideId = new Set();
                                psmOpenModificationMassesUnique_PerReportedPeptideId_Object = { reportedPeptideId, openModificationMasses : psmOpenModificationMassesUnique_PerReportedPeptideId }
                                psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, psmOpenModificationMassesUnique_PerReportedPeptideId_Object );
                            } else {
                                psmOpenModificationMassesUnique_PerReportedPeptideId = psmOpenModificationMassesUnique_PerReportedPeptideId_Object.openModificationMasses;
                            }
                        }

                        for ( const psmOpenModificationMassEntry of psmOpenModificationMassesList ) {
                            const psmId = psmOpenModificationMassEntry.psmId;
                            const openModificationMass = psmOpenModificationMassEntry.openModificationMass;
                            const openModificationMass_Rounded = Math.round( openModificationMass );
                            //  Following only populated when there is a position, otherwise null
                            const openModificationPosition = psmOpenModificationMassEntry.openModificationPosition;
                            const is_N_Terminal = psmOpenModificationMassEntry.is_N_Terminal;
                            const is_C_Terminal = psmOpenModificationMassEntry.is_C_Terminal;

                            let psmOpenModificationMassEntriesPerPSM : Map<number,
                                {openModificationMass: number, openModificationMass_Rounded: number,
                                    positions: Map<number, {position: number, isNTerminal: boolean, isCTerminal: boolean}>}[]> = undefined;

                            let psmOpenModificationMassesPerPSM_Object = psmOpenModificationMassesPerPSM_ForPsmIdMap.get( psmId );
                            if ( ! psmOpenModificationMassesPerPSM_Object ) {
                                psmOpenModificationMassEntriesPerPSM = new Map();
                                psmOpenModificationMassesPerPSM_ForPsmIdMap.set( psmId, { psmId, openModificationEntries_ForMassMap : psmOpenModificationMassEntriesPerPSM } );
                            } else {
                                psmOpenModificationMassEntriesPerPSM = psmOpenModificationMassesPerPSM_Object.openModificationEntries_ForMassMap;
                            }

                            let positions: Map<number, {position: number, isNTerminal: boolean, isCTerminal: boolean}> = undefined;

                            let psmOpenModificationMassEntries_ForRoundedMass = psmOpenModificationMassEntriesPerPSM.get( openModificationMass_Rounded );
                            if ( ! psmOpenModificationMassEntries_ForRoundedMass ) {
                                positions = new Map();
                                psmOpenModificationMassEntries_ForRoundedMass = [{openModificationMass, openModificationMass_Rounded, positions }]
                                psmOpenModificationMassEntriesPerPSM.set( openModificationMass_Rounded, psmOpenModificationMassEntries_ForRoundedMass );
                            } else {
                                //  Find openModificationMass in psmOpenModificationMassEntries_ForRoundedMass
                                let psmOpenModificationMassEntry_openModificationMass = undefined;
                                for ( const entry of psmOpenModificationMassEntries_ForRoundedMass ) {
                                    if ( entry.openModificationMass === openModificationMass ) {
                                        psmOpenModificationMassEntry_openModificationMass = entry;
                                        positions = psmOpenModificationMassEntry_openModificationMass.positions;
                                        break;
                                    }
                                    if ( ! psmOpenModificationMassEntry_openModificationMass ) {
                                        positions = new Map();
                                        psmOpenModificationMassEntry_openModificationMass = {openModificationMass, openModificationMass_Rounded, positions }
                                        psmOpenModificationMassEntries_ForRoundedMass.push( psmOpenModificationMassEntry_openModificationMass );
                                    }
                                }
                            }

                            if ( openModificationPosition !== null ) {
                                const position = {position: openModificationPosition, isNTerminal : is_N_Terminal, isCTerminal : is_C_Terminal }
                                positions.set( openModificationPosition, position );
                            }

                            //  Map per Rounded Mass then Set of PSM Ids
                            {
                                let psmIds_Set : Set<number> = undefined;
                                let psmOpenModificationMasses_PsmIdSet_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap.get( openModificationMass_Rounded )
                                if ( ! psmOpenModificationMasses_PsmIdSet_Object ) {
                                    psmIds_Set = new Set()
                                    psmOpenModificationMasses_PsmIdSet_Per_RoundedMassMap.set(openModificationMass_Rounded, { openModificationMass_Rounded, psmIds_Set })
                                } else {
                                    psmIds_Set = psmOpenModificationMasses_PsmIdSet_Object.psmIds_Set
                                }
                                psmIds_Set.add( psmId )
                                psmIds_ContainAnyOpenModificationMass.add( psmId )
                            }
                        }

                        reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
                    }

                    if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
                        console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
                    }

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise.catch(function(reason) {
                try {
                    reject(reason);
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}


/**
 * Get PSM Open Modification Masses per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
 */
const _getPsmsOpenModificationMassesForReportedPeptideIdsCutoffs = function ( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    //  reportedPeptideId_psmOpenModificationMassesList_List entry:
                    // private long psmId;
                    // private double openModificationMass;
                    // private Integer openModificationPosition;
                    // private Boolean is_N_Terminal;
                    // private Boolean is_C_Terminal;

                    resolve({ reportedPeptideId_psmOpenModificationMassesList_List : responseData.reportedPeptideId_psmOpenModificationMassesList_List });

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
