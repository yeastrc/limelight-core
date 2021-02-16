/**
 * loadProteinSequences_LoadTo_loadedDataCommonHolder.ts
 * 
 * Javascript for proteinView.jsp page - Loads Peptide Sequences
 * 
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {ProteinSequenceData_For_ProteinSequenceVersionId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinSequenceData_For_ProteinSequenceVersionId";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";

/**
 * Load Protein Sequences for reported peptide ids and projectSearchId into loadedDataCommonHolder
 */
export const loadProteinSequences_LoadTo_loadedDataCommonHolder = function(
	{
		proteinSequenceVersionId, projectSearchId_Contains_proteinSequenceVersionId, loadedDataCommonHolder
	} :  {

		proteinSequenceVersionId: number
		projectSearchId_Contains_proteinSequenceVersionId: number
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

	} ) : Promise<unknown> {

	return new Promise<void>(function(resolve, reject) {
		try {
			const promise_getProteinSequencesFromProteinSequenceVersionIds =
				_getProteinSequencesFromProteinSequenceVersionIds(
					{ projectSearchIds : [ projectSearchId_Contains_proteinSequenceVersionId ], proteinSequenceVersionIds : [ proteinSequenceVersionId ] } );

			promise_getProteinSequencesFromProteinSequenceVersionIds.
			then( ( { proteinSequences_Key_proteinSequenceVersionId, foundAllProteinSequenceVersionIdsForProjectSearchIds } ) => {
				try {
					const proteinSequenceObject = proteinSequences_Key_proteinSequenceVersionId[ proteinSequenceVersionId ];
					if ( proteinSequenceObject === undefined ) {
						throw Error("No Protein sequence for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId_Contains_proteinSequenceVersionId );
					}
					const proteinSequenceString = proteinSequenceObject.sequence;
					const proteinSequenceData = new ProteinSequenceData_For_ProteinSequenceVersionId( { proteinSequence : proteinSequenceString } );

					loadedDataCommonHolder.add_proteinSequenceData_KeyProteinSequenceVersionId( { proteinSequenceData, proteinSequenceVersionId } );

					resolve();

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			promise_getProteinSequencesFromProteinSequenceVersionIds.catch( (reason) => {
				reject(reason);
			})
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
}


/**
 * Get Protein Sequences From ProteinSequenceVersionIds
 */
const _getProteinSequencesFromProteinSequenceVersionIds = function (
	{
		projectSearchIds,
		proteinSequenceVersionIds
	}: {
		projectSearchIds: Array<number>
		proteinSequenceVersionIds: Array<number>
	} ) {

	let promise = new Promise( function( resolve, reject ) {
		try {
			let requestObject = {
				projectSearchIds : projectSearchIds,
				proteinSequenceVersionIds : proteinSequenceVersionIds,
			};

			console.log("AJAX Call to get protein-sequences-for-prot-seq-ver-ids START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/protein-sequences-for-prot-seq-ver-ids";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					console.log("AJAX Call to get protein-sequences-for-prot-seq-ver-ids END, Now: " + new Date() );

					//  JS Object.  Key ProteinSequenceVersionId, value, Protein Info

					resolve(
						{ proteinSequences_Key_proteinSequenceVersionId : responseData.proteinSequences,
							foundAllProteinSequenceVersionIdsForProjectSearchIds : responseData.foundAllProteinSequenceVersionIdsForProjectSearchIds } );

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

