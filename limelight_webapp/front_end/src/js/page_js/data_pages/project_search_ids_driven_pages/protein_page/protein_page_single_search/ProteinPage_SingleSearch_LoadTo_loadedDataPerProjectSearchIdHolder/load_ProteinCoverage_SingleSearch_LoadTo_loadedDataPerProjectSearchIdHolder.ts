/**
 * load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 * Get Protein Coverage from Reported Peptide Ids, called after protein sequence ids are available
 */
export const load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder

    } : {
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : Promise<unknown> {

    const reportedPeptideIds_FromHolder = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if ( ! reportedPeptideIds_FromHolder ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() not return a value: load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
        console.warn( msg );
        throw Error( msg );
    }

    const reportedPeptideIds = Array.from( reportedPeptideIds_FromHolder );

    //  Sort numbers ascending so the same request always sent to the server to match prev request for caching.

    reportedPeptideIds.sort( (a,b) => {
        if ( a < b ) {
            return  -1;
        }
        if ( a > b ) {
            return  1;
        }
        return 0;
    } );

    return new Promise<void>( (resolve, reject) => {
        try {
            if ( reportedPeptideIds.length === 0 ) {
                //  No reportedPeptideIds

                resolve();

                return; // EARLY RETURN
            }

            _getProteinCoverageData_From_ReportedPeptideIds( { projectSearchId, reportedPeptideIds } )
                .then(function( proteinCoverageList ) {
                    try {
                        _processProteinCoverageFromServer_Populate_loadedData( { proteinCoverageList, loadedDataPerProjectSearchIdHolder } );
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
        proteinCoverageList ,
        loadedDataPerProjectSearchIdHolder
    } : {
        proteinCoverageList: any
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) : void {

    let proteinCoverage_KeyReportedPeptideId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>> = new Map();

    for ( const proteinCoverage of proteinCoverageList ) {

        // this.rPId = item.getReportedPeptideId();
        // this.pSVId = item.getProteinSequenceVersionId();
        // this.pSPs = item.getProteinStartPosition();
        // this.pEPs = item.getProteinEndPosition();

        if ( proteinCoverage.rPId === undefined || proteinCoverage.rPId === null ) {
            const msg = "( proteinCoverage.rPId === undefined || proteinCoverage.rPId === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( proteinCoverage.pSVId === undefined || proteinCoverage.pSVId === null ) {
            const msg = "( proteinCoverage.pSVId === undefined || proteinCoverage.pSVId === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( proteinCoverage.pSPs === undefined || proteinCoverage.pSPs === null ) {
            const msg = "( proteinCoverage.pSPs === undefined || proteinCoverage.pSPs === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( proteinCoverage.pEPs === undefined || proteinCoverage.pEPs === null ) {
            const msg = "( proteinCoverage.pEPs === undefined || proteinCoverage.pEPs === null ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( proteinCoverage.rPId ) ) {
            const msg = "( ! variable_is_type_number_Check( proteinCoverage.rPId ) ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( proteinCoverage.pSVId ) ) {
            const msg = "( ! variable_is_type_number_Check( proteinCoverage.pSVId ) ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( proteinCoverage.pSPs ) ) {
            const msg = "( ! variable_is_type_number_Check( proteinCoverage.pSPs ) ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! variable_is_type_number_Check( proteinCoverage.pEPs ) ) {
            const msg = "( ! variable_is_type_number_Check( proteinCoverage.pEPs ) ): _processProteinCoverageFromServer_Populate_loadedData";
            console.warn( msg );
            throw Error( msg );
        }

        const entry = { reportedPeptideId : proteinCoverage.rPId, proteinSequenceVersionId : proteinCoverage.pSVId, proteinStartPosition : proteinCoverage.pSPs, proteinEndPosition : proteinCoverage.pEPs };

        let proteinCoverageList_ForReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get( entry.reportedPeptideId );
        if ( ! proteinCoverageList_ForReportedPeptideId ) {
            proteinCoverageList_ForReportedPeptideId = [];
            proteinCoverage_KeyReportedPeptideId.set( entry.reportedPeptideId, proteinCoverageList_ForReportedPeptideId );
        }
        proteinCoverageList_ForReportedPeptideId.push( entry );
    }

    loadedDataPerProjectSearchIdHolder.set_proteinCoverage_KeyReportedPeptideId( proteinCoverage_KeyReportedPeptideId );
}


//  Web service call


/**
 * Get Protein Coverage Data From Reported Peptide Ids
 */
const _getProteinCoverageData_From_ReportedPeptideIds = function ( { projectSearchId, reportedPeptideIds } : { projectSearchId: number, reportedPeptideIds: Array<number> } ) : Promise<any> {

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

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get protein-coverage-per-reported-peptide-id END, Now: " + new Date() );

                    if ( ! responseData.proteinCoverageList ) {
                        const msg = "responseData.proteinCoverageList has no value after webservice call to " + url;
                        console.warn( msg );
                        throw Error( msg )
                    }

                    resolve( responseData.proteinCoverageList );

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
