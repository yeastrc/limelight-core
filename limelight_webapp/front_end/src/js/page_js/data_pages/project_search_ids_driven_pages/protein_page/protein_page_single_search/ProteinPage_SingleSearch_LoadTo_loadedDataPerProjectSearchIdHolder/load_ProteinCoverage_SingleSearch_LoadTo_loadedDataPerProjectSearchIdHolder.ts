/**
 * load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 * Get Protein Coverage from Reported Peptide Ids, called after protein sequence ids are available
 */
export const load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder

    } : {
        projectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Promise<unknown> {

    return new Promise( (resolve, reject) => {
        try {
            _getProteinCoverageData_From_ReportedPeptideIds( { projectSearchId, reportedPeptideIds : loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() } )
                .then(function( proteinCoverage_KeyReportedPeptideIdFromServer ) {
                    try {
                        _processProteinCoverageFromServer_Populate_loadedData( { proteinCoverage_KeyReportedPeptideIdFromServer, loadedDataPerProjectSearchIdHolder } );
                        resolve();
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }).catch( function(reason) {
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
    });
}

/**
 * Populate loadedData with data from dataFromServer.
 *
 * 	Set:  set_proteinCoverage_KeyReportedPeptideId() : JS Object.  <Reported Peptide Id, [{proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
 */
const _processProteinCoverageFromServer_Populate_loadedData = function (
    {
        proteinCoverage_KeyReportedPeptideIdFromServer ,
        loadedDataPerProjectSearchIdHolder
    } : {
        proteinCoverage_KeyReportedPeptideIdFromServer
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) : void {

    //  JS Object.  Key proteinSequenceVersionId, value, Object Protein Info
    // proteinInfoMapKeyProteinSequenceVersionIdFromServer

    let proteinCoverage_KeyReportedPeptideId = new Map();

    let proteinCoverage_KeyReportedPeptideIdFromServer_Keys = Object.keys( proteinCoverage_KeyReportedPeptideIdFromServer );

    for ( const reportedPeptideIdString of proteinCoverage_KeyReportedPeptideIdFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const proteinCoverage = proteinCoverage_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

        proteinCoverage_KeyReportedPeptideId.set( reportedPeptideIdInt, proteinCoverage );
    }

    loadedDataPerProjectSearchIdHolder.set_proteinCoverage_KeyReportedPeptideId( proteinCoverage_KeyReportedPeptideId );
}


//  Web service call


/**
 * Get Protein Coverage Data From Reported Peptide Ids
 */
const _getProteinCoverageData_From_ReportedPeptideIds = function ( { projectSearchId, reportedPeptideIds } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds
            };

            console.log("AJAX Call to get protein-coverage-per-reported-peptide-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get protein-coverage-per-reported-peptide-id END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, [{reportedPeptideId,proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>

                    resolve( responseData.proteinCoverage_KeyReportedPeptideId );

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
