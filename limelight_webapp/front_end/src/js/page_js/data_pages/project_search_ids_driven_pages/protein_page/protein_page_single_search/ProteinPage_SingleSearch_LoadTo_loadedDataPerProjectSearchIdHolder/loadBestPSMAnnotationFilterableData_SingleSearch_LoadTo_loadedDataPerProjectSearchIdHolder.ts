/**
 * loadBestPSMAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * Load Best PSM Filterable Ann Data
 */
export const loadBestPSMAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        reportedPeptideIds, annTypeIds, projectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIds, annTypeIds, projectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) {

    return new Promise(function(resolve, reject) {
        try {
            const promise_LoadData =
                _getBestPsmFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds(
                    { projectSearchId,
                        reportedPeptideIds : reportedPeptideIds,
                        annTypeIds : annTypeIds } );

            promise_LoadData.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
                try {
                    _processPsmBestFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer, loadedDataPerProjectSearchIdHolder } );

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise_LoadData.catch( function(reason) {
                try {
                    // Catches the reject from any promise in the chain
                    reject( reason );
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
 * Get Best PSM Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
 */
const _getBestPsmFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds = function ( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds,
                annotationTypeIds : annTypeIds
            };

            console.log("AJAX Call to get best-psm-filtrbl-ann-data-list START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-best-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get best-psm-filtrbl-ann-data-list END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;

                    resolve( responseData.annData_KeyAnnTypeId_KeyReportedPeptideId );

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


/**
 * Populate loadedData with data from dataFromServer.
 *
 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_psmBest_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
 */
const _processPsmBestFilterableAnnDataFromServer_Populate_loadedData = function (
    {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer,
        loadedDataPerProjectSearchIdHolder
    } : {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) {



    //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;

    //  Translate to Map, parsing object keys to int

    let annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();

    let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );

    for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

        const annData_KeyAnnTypeId = new Map();
        annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );

        let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );

        for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
            const annTypeIdInt = Number.parseInt( annTypeIdString );
            const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];

            const annData = { valueDouble : annData_FromServer.bestPsmValue, valueString : annData_FromServer.bestPsmValue.toString() };

            annData_KeyAnnTypeId.set( annTypeIdInt, annData );
        }
    }

    loadedDataPerProjectSearchIdHolder.set_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );
}
