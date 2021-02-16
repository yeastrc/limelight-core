/**
 * loadPeptideSequencesForReportedPeptideIds_SingleSearch_LoadTo_loadedDataCommonHolder.ts
 * 
 * Javascript for proteinView.jsp page - Loads Peptide Sequences
 * 
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";

/**
 * Load Peptide Sequences for reported peptide ids and projectSearchId into loadedDataCommonHolder
 */
export const loadData_PeptideSequences_LoadTo_loadedDataCommonHolder = function(
	{
		projectSearchId, reportedPeptideIds, loadedDataCommonHolder
	} :  {

		projectSearchId: number
		reportedPeptideIds: Array<number>
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

	} ) : Promise<unknown> {

	return new Promise<void>(function(resolve, reject) {
		try {
			const promise_getPeptideSequenceStringsFromReportedPeptideIds =
				_getPeptideSequenceStringsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } );

			promise_getPeptideSequenceStringsFromReportedPeptideIds.catch((reason) => {
				reject();
			});

			promise_getPeptideSequenceStringsFromReportedPeptideIds.then(({ peptideSequenceString_PeptideId_MappingList, foundAllReportedPeptideIdsForProjectSearchId }) => {
				try {
					if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
						throw Error("In _getPeptideSequencesAndProcess: foundAllReportedPeptideIdsForProjectSearchId is false");
						// reject();
					}

					_process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, loadedDataCommonHolder } );

					resolve();

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			})
		} catch( e ) {
			console.log("Exception caught in New Promise in _getPeptideSequencesAndProcess(...)");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
}

/**
 *
 */
const _process_getPeptideSequenceResult = function(
	{
		peptideSequenceString_PeptideId_MappingList,
		loadedDataCommonHolder
	} :{
		peptideSequenceString_PeptideId_MappingList: any
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
	} ) {

	for ( const entry of peptideSequenceString_PeptideId_MappingList ) {

		loadedDataCommonHolder.add_peptideSequenceString_KeyPeptideId( { peptideSequenceString : entry.peptideSequence, peptideId : entry.peptideId } );
	}
}


/**
 * Get Peptide Sequence Strings from Reported Peptide Ids and Project Search Id
 */
const _getPeptideSequenceStringsFromReportedPeptideIds = function ( { projectSearchId, reportedPeptideIds }: { projectSearchId: number, reportedPeptideIds: Array<number> } ) {

	let promise = new Promise( function( resolve, reject ) {
		try {
			let requestObject = {
				projectSearchId : projectSearchId,
				reportedPeptideIds : reportedPeptideIds,
			};

			console.log("AJAX Call to get d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					console.log("AJAX Call to get d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids END, Now: " + new Date() );

					//  JS Object.

					resolve(
						{ peptideSequenceString_PeptideId_MappingList : responseData.resultList,
							foundAllReportedPeptideIdsForProjectSearchId : responseData.foundAllReportedPeptideIdsForProjectSearchId } );

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
