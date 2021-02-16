/**
 * load_ProteinData_Including_ProteinSequenceVersionIds_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";


/**
 * Get All Protein Data from Reported Peptide Ids - Except Protein Coverage
 */
export const load_ProteinData_Including_ProteinSequenceVersionIds_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder
        
    } : {
        projectSearchId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Promise<unknown> {

    return new Promise<void>(function(resolve, reject) {
        try {
            _getProteinSequenceVersionIds( { projectSearchId, reportedPeptideIds : loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() } )
                .then(function( proteinSequenceVersionIdsPerReportedPeptideIdMap ) {
                    try {
                        _processReportedPeptideIdProteinSequenceVersionIdsFromServer_Populate_loadedData( { proteinSequenceVersionIdsPerReportedPeptideIdMap, loadedDataPerProjectSearchIdHolder } );

                        const promiseAllArray = [];

                        const promise__get_ProteinInfo_From_proteinSequenceVersionIds =
                            _get_ProteinInfo_From_proteinSequenceVersionIds( { projectSearchId, loadedDataPerProjectSearchIdHolder } );

                        promiseAllArray.push( promise__get_ProteinInfo_From_proteinSequenceVersionIds );

                        return Promise.all( promiseAllArray );
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }).then(function( proteinInfoMapKeyProteinSequenceVersionId ) {
                try {

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
 * Set on loadedData:
 *
 * _loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsKeyReportedPeptideId - Map: Key ReportedPeptideId Value Array proteinSequenceVersionIds
 * _loadedDataPerProjectSearchIdHolder.set_reportedPeptideIdsKeyProteinSequenceVersionId() - Map: Key ProteinSequenceVersionId Value Array ReportedPeptideIds
 * _loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsUnique - Set proteinSequenceVersionIds
 * _loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsArray - Array proteinSequenceVersionIds - unique values, sorted
 */
const _processReportedPeptideIdProteinSequenceVersionIdsFromServer_Populate_loadedData = function (
    {
        proteinSequenceVersionIdsPerReportedPeptideIdMap,
        loadedDataPerProjectSearchIdHolder
    } : {
        proteinSequenceVersionIdsPerReportedPeptideIdMap: any
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    }) {

    //  JS Object.  Key Reported Peptide Id, value, Array of proteinSequenceVersionId 
    let proteinSequenceVersionIdsPerReportedPeptideIdFromServer = proteinSequenceVersionIdsPerReportedPeptideIdMap;

    //  Extract the proteinSequenceVersionIds into an array and if populated put the numPsms in a Map on loadedData

    const proteinSequenceVersionIdsUnique = new Set();
    const proteinSequenceVersionIdsPerReportedPeptideId = new Map();
    const reportedPeptideIdsKeyProteinSequenceVersionId = new Map();

    let proteinSequenceVersionIdsPerReportedPeptideIdFromServer_Keys = Object.keys( proteinSequenceVersionIdsPerReportedPeptideIdFromServer );

    for ( const reportedPeptideIdString of proteinSequenceVersionIdsPerReportedPeptideIdFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const proteinSequenceVersionIdsForReportedPeptideId = proteinSequenceVersionIdsPerReportedPeptideIdFromServer[ reportedPeptideIdString ];

        proteinSequenceVersionIdsPerReportedPeptideId.set( reportedPeptideIdInt, proteinSequenceVersionIdsForReportedPeptideId );

        for ( const proteinSequenceVersionId of proteinSequenceVersionIdsForReportedPeptideId ) {
            proteinSequenceVersionIdsUnique.add( proteinSequenceVersionId );

            let reportedPeptideIdsForProtSeqVId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! reportedPeptideIdsForProtSeqVId ) {
                reportedPeptideIdsForProtSeqVId = [];
                reportedPeptideIdsKeyProteinSequenceVersionId.set( proteinSequenceVersionId, reportedPeptideIdsForProtSeqVId );
            }
            if ( ! reportedPeptideIdsForProtSeqVId.includes( reportedPeptideIdInt ) ) {
                reportedPeptideIdsForProtSeqVId.push( reportedPeptideIdInt )
            }
        }
    }

    const proteinSequenceVersionIdsArray = [];
    for ( const proteinSequenceVersionId of proteinSequenceVersionIdsUnique ) {
        proteinSequenceVersionIdsArray.push( proteinSequenceVersionId );
    }
    proteinSequenceVersionIdsArray.sort();

    loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsKeyReportedPeptideId( proteinSequenceVersionIdsPerReportedPeptideId );
    loadedDataPerProjectSearchIdHolder.set_reportedPeptideIdsKeyProteinSequenceVersionId( reportedPeptideIdsKeyProteinSequenceVersionId );

    loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsUnique( proteinSequenceVersionIdsUnique );
    loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsArray( proteinSequenceVersionIdsArray );
}


/**
 * Get Protein Info from proteinSequenceVersionIds
 */
const _get_ProteinInfo_From_proteinSequenceVersionIds = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        projectSearchId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    return new Promise<void>((resolve, reject) => {
        try {
            let proteinSequenceVersionIds = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();
            _getProteinInfoFromProteinSequenceVersionIds( { projectSearchId, proteinSequenceVersionIds } )
                .then(function( proteinInfoMapKeyProteinSequenceVersionId ) {
                    try {
                        _processProteinInfoFromServer_Populate_loadedData( {
                            proteinInfoMapKeyProteinSequenceVersionIdFromServer : proteinInfoMapKeyProteinSequenceVersionId,
                            loadedDataPerProjectSearchIdHolder
                        } );
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
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_proteinInfoKeyproteinSequenceVersionId : Map Key ProteinSequenceVersionId, Value: Object of Protein Info
 */
const _processProteinInfoFromServer_Populate_loadedData = function (
    {
        proteinInfoMapKeyProteinSequenceVersionIdFromServer,
        loadedDataPerProjectSearchIdHolder
    } : {
        proteinInfoMapKeyProteinSequenceVersionIdFromServer: any
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : void {

    //  JS Object.  Key proteinSequenceVersionId, value, Object Protein Info
    // proteinInfoMapKeyProteinSequenceVersionIdFromServer

    let proteinInfoMapKeyProteinSequenceVersionId = new Map();

    let proteinInfoMapKeyProteinSequenceVersionIdFromServer_Keys = Object.keys( proteinInfoMapKeyProteinSequenceVersionIdFromServer );

    for ( const proteinSequenceVersionIdString of proteinInfoMapKeyProteinSequenceVersionIdFromServer_Keys ) {
        const proteinSequenceVersionIdInt = Number.parseInt( proteinSequenceVersionIdString );
        const proteinInfoForProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionIdFromServer[ proteinSequenceVersionIdString ];

        proteinInfoMapKeyProteinSequenceVersionId.set( proteinSequenceVersionIdInt, proteinInfoForProteinSequenceVersionId );
    }

    loadedDataPerProjectSearchIdHolder.set_proteinInfoMapKeyProteinSequenceVersionId( proteinInfoMapKeyProteinSequenceVersionId );
}

//  Webservice calls

/**
 * Get getProteinSequenceVersionIds from reportedPeptideIds
 */
const _getProteinSequenceVersionIds = function (
    {
        projectSearchId, reportedPeptideIds
    }: {
        projectSearchId : number, reportedPeptideIds: Array<number>
    } ) {

    const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );

    reportedPeptideIds_Sorted.sort( (a,b ) => {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds_Sorted,
            };

            console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds END, Now: " + new Date() );

                    //  JS Object.  Key Reported Peptide Id, value, Array of proteinSequenceVersionId

                    resolve( responseData.proteinSequenceVersionIdsPerReportedPeptideIdMap );

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
 * Get ProteinInfo From ProteinSequenceVersionIds
 */
const _getProteinInfoFromProteinSequenceVersionIds = function (
    {
        projectSearchId, proteinSequenceVersionIds
    }: {
        projectSearchId: number, proteinSequenceVersionIds: Array<number>
    } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                proteinSequenceVersionIds : proteinSequenceVersionIds,
            };

            console.log("AJAX Call to get protein-info-prot-seq-v-ids-list START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/protein-info-prot-seq-v-ids-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get protein-info-prot-seq-v-ids-list END, Now: " + new Date() );

                    //  JS Object.  Key ProteinSequenceVersionId, value, Protein Info

                    resolve( responseData.proteinInfoMapKeyProteinSequenceVersionId );

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