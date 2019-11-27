/**
 * proteinViewDataLoader.ts
 * 
 * Javascript for proteinView.jsp page - Loading Data  
 * 
 * 
 * 
 * 
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

/**
 * 
 */
export class ProteinViewDataLoader {

	/**
	 * 
	 */
	constructor() {}

	/**
	 * 
	 */
	initialize() {}
	
	/**
	 * Get Static Mods For Single Project Search Id
	 * 
	 * result list item { String residue, BigDecimal mass }
	 */
	static getStaticMods( { projectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId
			};

			console.log("AJAX Call to get Static Mods List START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/static-mods-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get Static Mods List END, Now: " + new Date() );

					resolve( responseData.staticModsList );

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
	 * Get Reporter Ions - Unique Masses for this Search - For Single Project Search Id
	 * 
	 * result list item { String residue, BigDecimal mass }
	 */
	static _get_ReporterIonsUnique_ForSearch_forProjectSearchId( { projectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId
			};

			console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/reporter-ion-masses-unique-search-level-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get Get Reporter Ions - Unique Masses for this Search END, Now: " + new Date() );

					resolve( responseData.reporterIonMassesUniqueList );

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
	 * Get Reported Peptide Ids For Single Project Search Id
	 * 
	 * Also returns Number of PSMs per Reported Peptide Id under specific conditions (Default Cutoffs, ...)
	 * 
	 * Could be upgraded to accept a minimum number of PSMs per Reported Peptide
	 */
	static getReportedPeptideIdList( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId,
					searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
			};

			console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get Peptide List END, Now: " + new Date() );

					resolve( responseData.reportedPeptideList );

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
	 * Get Number of PSMs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
	 */
	static getNumPsmsForReportedPeptideIdsCutoffs( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId,
					reportedPeptideIds,
					searchDataLookupParams_For_Single_ProjectSearchId,
			};

			console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

					resolve( responseData.numPsms_KeyReportedPeptideId );

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
	 * MAYBE NOT USED
	 * 
	 * Get PSM IDs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
	 */
	static getPsmsIdsForReportedPeptideIdsCutoffs( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId,
					reportedPeptideIds,
					searchDataLookupParams_For_Single_ProjectSearchId,
			};

			console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

					resolve({ reportedPeptideId_psmIdList_List : responseData.reportedPeptideId_psmIdList_List });

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
	 * Get PSM Reporter Ion Masses per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
	 */
	static getPsmsReporterIonMassesForReportedPeptideIdsCutoffs( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

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

	/**
	 * Get Peptide Ids from Reported Peptide Ids and Project Search Id
	 */
	static getPeptideIdsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
			};

			console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids END, Now: " + new Date() );

					//  JS Object.

					resolve( 
							{ peptideIdReportedPeptideIdMappingList : responseData.resultList,
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
	
	/**
	 * Get Peptide Sequence Strings from Reported Peptide Ids and Project Search Id
	 */
	static getPeptideSequenceStringsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } ) {

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

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
	
	/**
	 * Get Reported Peptide Strings from Reported Peptide Ids
	 */
	static getReportedPeptideStringsFromReportedPeptideIds( { projectSearchIds, reportedPeptideIds } ) {

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

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
	
	/**
	 * Get getProteinSequenceVersionIds from reportedPeptideIds
	 */
	static getProteinSequenceVersionIds( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
			};

			console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
	static getProteinInfoFromProteinSequenceVersionIds( { projectSearchId, proteinSequenceVersionIds } ) {

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

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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

	/**
	 * Get Protein Sequences From ProteinSequenceVersionIds
	 */
	static getProteinSequencesFromProteinSequenceVersionIds( { projectSearchIds, proteinSequenceVersionIds } ) {

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

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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


	/**
	 * Get Reported Peptide Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

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

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
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
	 * Get Reported Peptide Descriptive Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getReportedPeptideDescriptiveAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
					annotationTypeIds : annTypeIds
			};

			console.log("AJAX Call to get reported-peptide-descriptive-ann-data START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get reported-peptide-descriptive-ann-data END, Now: " + new Date() );

					//  JS Object.  <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId; 

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
	 * Get Best PSM Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getBestPsmFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

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
	 * Get Protein Coverage Data From Reported Peptide Ids
	 */
	static getProteinCoverageData_From_ReportedPeptideIds( { projectSearchId, reportedPeptideIds } ) {

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

	/**
	 * Get Dynamic Modification Data From Reported Peptide Ids
	 */
	static getDynamicModificationsForReportedPeptideids( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {
		  try {
			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds
			};

			console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id START, Now: " + new Date() );

			const url = "d/rws/for-page/psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }) => {
				try {
					console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id END, Now: " + new Date() );

					//  JS Object.  <Reported Peptide Id, [{}]>  

					resolve( responseData.dynamicModification_KeyReportedPeptideId );

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
	
}
