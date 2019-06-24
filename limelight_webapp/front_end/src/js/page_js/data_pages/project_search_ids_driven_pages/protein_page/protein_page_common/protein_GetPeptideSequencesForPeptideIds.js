/**
 * protein_GetPeptideSequencesForPeptideIds.js
 * 
 * Javascript for proteinView.jsp page - Loads Peptide Sequences
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { ProteinViewDataLoader } from './proteinViewDataLoader.js';

/**
 * 
 */
export class Protein_GetPeptideSequencesForPeptideIds {


	/**
	 * @param loadedDataPerProjectSearchIdHolder_for_projectSearchIds - Map<project search id, loadedDataPerProjectSearchIdHolder>
	 * @returns Promise that is resolved when all data is loaded
     * @returns null if no data to load
	 */
	getPeptideSequencesForPeptideIds({ 
        loadedDataCommonHolder, 
        loadedDataPerProjectSearchIdHolder_for_projectSearchIds, 
        proteinSequenceVersionId,
        projectSearchIds }) {

		//   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
		const peptideIdsToLoadSequencesForMap_Key_PeptideId = new Map();

		for ( const projectSearchId of projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_for_projectSearchIds.get( projectSearchId );
            
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in loadedDataPerProjectSearchIdHolder_for_projectSearchIds for projectSearchId: " + projectSearchId );
            }

			const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

			if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
				// No data for this projectSearchId
				continue; // early continue
			}
			//  reportedPeptideIds for this proteinSequenceVersionId
			const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			
			if ( ! reportedPeptideIds ) {
				// No data for this projectSearchId and this _proteinSequenceVersionId
				continue; // early continue
			}
	
			for ( const reportedPeptideId of reportedPeptideIds ) {

				const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
				if ( ! peptideId ) {
					throw Error("_getPeptideSequencesForPeptideIds: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				if ( ! loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } ) ) {
					if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {
						peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId, peptideId } );
					}
				}
			}
		}
		if ( peptideIdsToLoadSequencesForMap_Key_PeptideId.size === 0 ) {
			//  No peptide sequence to load so return null
			return null; // EARLY EXIT
		}

		//  Re-order by projectSearchId

		//   Map<projectSearchId,[{ reportedPeptideId, projectSearchId, peptideId }]>
		const peptideIdsToLoadSequencesForMap_Key_ProjectSearchId = new Map();

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_PeptideId.entries() ) {

			const mapEntryValue = mapEntry[ 1 ];
			const projectSearchId = mapEntryValue.projectSearchId;

			let newMapEntryForProjectSearchId = peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.get( projectSearchId );
			if ( ! newMapEntryForProjectSearchId ) {
				newMapEntryForProjectSearchId = new Array();
				peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.set( projectSearchId, newMapEntryForProjectSearchId );
			}
			newMapEntryForProjectSearchId.push( mapEntryValue );
		}

		//  Retrieve peptide strings on a per projectSearchId basis

		const promiseArray_GetPeptideSequences = [];

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const entriesFor_projectSearchId = mapEntry[ 1 ];

            const promise_per_projectSearchIdProcessing = 
                this._getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId, loadedDataCommonHolder } );
			promiseArray_GetPeptideSequences.push( promise_per_projectSearchIdProcessing );
		}

		return Promise.all( promiseArray_GetPeptideSequences );
	}

	/**
	 * goes with fcn _getPeptideSequencesForPeptideIds
	 */
	_getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId, loadedDataCommonHolder } ) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				//  Create array of reportedPeptideIds to get Peptide Sequences for
				const reportedPeptideIds = [];
				for ( const entry of entriesFor_projectSearchId ) {
					reportedPeptideIds.push( entry.reportedPeptideId );
				}

				const promise_getPeptideSequenceStringsFromReportedPeptideIds =
					ProteinViewDataLoader.getPeptideSequenceStringsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } );

				promise_getPeptideSequenceStringsFromReportedPeptideIds.catch((reason) => {});

				promise_getPeptideSequenceStringsFromReportedPeptideIds.then(({ peptideSequenceString_PeptideId_MappingList, foundAllReportedPeptideIdsForProjectSearchId }) => {
					try {
						if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
							throw Error("In _getPeptideSequencesAndProcess: foundAllReportedPeptideIdsForProjectSearchId is false");
							reject();
						}

						objectThis._process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, loadedDataCommonHolder } );

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
	_process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, loadedDataCommonHolder } ) {

		for ( const entry of peptideSequenceString_PeptideId_MappingList ) {

			loadedDataCommonHolder.add_peptideSequenceString_KeyPeptideId( { peptideSequenceString : entry.peptideSequence, peptideId : entry.peptideId } );
		}
	}

}
