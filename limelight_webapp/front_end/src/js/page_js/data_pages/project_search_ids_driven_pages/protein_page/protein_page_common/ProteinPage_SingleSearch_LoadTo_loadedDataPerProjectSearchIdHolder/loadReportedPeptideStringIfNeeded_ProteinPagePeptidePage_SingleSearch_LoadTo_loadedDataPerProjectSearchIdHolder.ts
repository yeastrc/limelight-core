/**
 * loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {ReportedPeptideStringData_For_ReportedPeptideId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/reportedPeptideStringData_For_ReportedPeptideId";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 *
 */
export const loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        reportedPeptideIds, projectSearchId, loadedDataCommonHolder
    } : {
        reportedPeptideIds: Set<number>
        projectSearchId: number
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    } ) : Promise<unknown> {

    const reportedPeptideIdsToLoadReportedPeptideStringsFor: Array<number> = [];

    {
        for ( const reportedPeptideId of reportedPeptideIds ) {

            const reportedPeptideStringData : ReportedPeptideStringData_For_ReportedPeptideId = loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );

            if ( ! reportedPeptideStringData ) {
                reportedPeptideIdsToLoadReportedPeptideStringsFor.push( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIdsToLoadReportedPeptideStringsFor.length === 0 ) {
        //  No data needs to be loaded
        return null; // EARLY RETURN
    }

    return new Promise<void>( (resolve, reject) => {
        try {
            const promise_getReportedPeptideStringsFromReportedPeptideIds =
                _getReportedPeptideStringsFromReportedPeptideIds(
                    { projectSearchIds : [ projectSearchId ],
                        reportedPeptideIds : reportedPeptideIdsToLoadReportedPeptideStringsFor } );

            promise_getReportedPeptideStringsFromReportedPeptideIds.
            then( ( { reportedPeptideStrings_Key_reportedPeptideId, foundAllReportedPeptideIdsForProjectSearchIds } ) => {
                try {
                    for ( const reportedPeptideId of reportedPeptideIdsToLoadReportedPeptideStringsFor ) {

                        const reportedPeptideString = reportedPeptideStrings_Key_reportedPeptideId[ reportedPeptideId ];
                        if ( reportedPeptideString === undefined ) {
                            throw Error("No reportedPeptideString for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId );
                        }

                        const reportedPeptideStringData = new ReportedPeptideStringData_For_ReportedPeptideId( { reportedPeptideString : reportedPeptideString.reportedPeptideString } );

                        loadedDataCommonHolder.add_reportedPeptideStringData_KeyReportedPeptideId( { reportedPeptideStringData, reportedPeptideId } );
                    }
                    resolve();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise_getReportedPeptideStringsFromReportedPeptideIds.catch( (reason) => {
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
 * Get Reported Peptide Strings from Reported Peptide Ids
 */
const _getReportedPeptideStringsFromReportedPeptideIds = function (
    {
        projectSearchIds, reportedPeptideIds
    } : {
        projectSearchIds: Array<number>
        reportedPeptideIds: Array<number>
    } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchIds : projectSearchIds,
                reportedPeptideIds : reportedPeptideIds,
            };

            console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids END, Now: " + new Date() );

                    //  JS Object.

                    resolve(
                        { reportedPeptideStrings_Key_reportedPeptideId : responseData.reportedPeptideStrings,
                            foundAllReportedPeptideIdsForProjectSearchIds : responseData.foundAllReportedPeptideIdsForProjectSearchIds } );

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
