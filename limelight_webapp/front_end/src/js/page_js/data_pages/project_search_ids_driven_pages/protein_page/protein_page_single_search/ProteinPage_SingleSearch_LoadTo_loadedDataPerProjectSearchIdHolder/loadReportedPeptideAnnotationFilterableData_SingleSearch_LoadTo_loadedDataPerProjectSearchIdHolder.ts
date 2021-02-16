/**
 * loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * Load Reported Peptide Filterable Ann Data
 */
export const loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        reportedPeptideIds, annTypeIds, projectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIds: Array<number>
        annTypeIds: Array<number>
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) {

    return new Promise<void>(function(resolve, reject) {
        try {
            const promise_LoadData =
                _getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds(
                    { projectSearchId,
                        reportedPeptideIds : reportedPeptideIds,
                        annTypeIds : annTypeIds } );

            promise_LoadData.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
                try {
                    _processReportedPeptideFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer, loadedDataPerProjectSearchIdHolder } );

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
 * Get Reported Peptide Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
 */
const _getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds = function (
    {
        projectSearchId, reportedPeptideIds, annTypeIds
    } : {
        reportedPeptideIds: Array<number>
        annTypeIds: Array<number>
        projectSearchId: number

    } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds,
                annotationTypeIds : annTypeIds
            };

            console.log("AJAX Call to get reported-peptide-filtrbl-ann-data START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/reported-peptide-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get reported-peptide-filtrbl-ann-data END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

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
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
 *
 * Also called by class ProteinViewPage_Display_SingleProtein_SingleSearch
 */
const _processReportedPeptideFilterableAnnDataFromServer_Populate_loadedData = function (
    {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer,
        loadedDataPerProjectSearchIdHolder
    } : {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer: any
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) {

    //  JS Object.   <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

    //  Translate to Map, parsing object keys to int

    let annData_KeyAnnTypeId_KeyReportedPeptideId =
        loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();

    if ( ! annData_KeyAnnTypeId_KeyReportedPeptideId ) {
        annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();
    }

    let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );

    for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

        let annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideIdInt );
        if ( ! annData_KeyAnnTypeId ) {
            annData_KeyAnnTypeId = new Map();
            annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );
        }

        let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );

        for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
            const annTypeIdInt = Number.parseInt( annTypeIdString );
            const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];

            const annData = { valueDouble : annData_FromServer.valueDouble, valueString : annData_FromServer.valueString };

            annData_KeyAnnTypeId.set( annTypeIdInt, annData );
        }
    }

    loadedDataPerProjectSearchIdHolder.set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );

}
