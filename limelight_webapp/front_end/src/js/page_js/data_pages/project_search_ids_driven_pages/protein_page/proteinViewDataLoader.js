/**
 * proteinViewDataLoader.js
 * 
 * Javascript for proteinView.jsp page - Loading Data  
 * 
 * 
 * 
 * 
 * 
 */

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

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
	 * Get Reported Peptide Ids For Single Project Search Id
	 * 
	 * Also returns Number of PSMs per Reported Peptide Id under specific conditions (Default Cutoffs, ...)
	 * 
	 * Could be upgraded to accept a minimum number of PSMs per Reported Peptide
	 */
	static getReportedPeptideIdList( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
			};

			let _URL = "d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get Peptide List END, Now: " + new Date() );

						resolve( responseData.reportedPeptideList );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Number of PSMs per Reported Peptide Id For Single Project Search Id, Reported Peptide Ids, Filter Cutoffs
	 */
	static getNumPsmsForReportedPeptideIdsCutoffs( { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId,
					reportedPeptideIds,
					searchDataLookupParams_For_Single_ProjectSearchId,
			};

			let _URL = "d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

						resolve( responseData.numPsms_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};


	/**
	 * Get Reported Peptide Strings from Reported Peptide Ids
	 */
	static getReportedPeptideStringsFromReportedPeptideIds( { projectSearchIds, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchIds : projectSearchIds,
					reportedPeptideIds : reportedPeptideIds,
			};

			let _URL = "d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids END, Now: " + new Date() );

						//  JS Object.  Key ProteinSequenceVersionId, value, Protein Info 

						resolve( 
								{ reportedPeptideStrings_Key_reportedPeptideId : responseData.reportedPeptideStrings,
									foundAllReportedPeptideIdsForProjectSearchIds : responseData.foundAllReportedPeptideIdsForProjectSearchIds } );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};
	
	/**
	 * Get getProteinSequenceVersionIds from reportedPeptideIds
	 */
	static getProteinSequenceVersionIds( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
			};

			let _URL = "d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get ProteinSequenceVersionIds from reportedPeptideIds END, Now: " + new Date() );

						//  JS Object.  Key Reported Peptide Id, value, Array of proteinSequenceVersionId 

						resolve( responseData.proteinSequenceVersionIdsPerReportedPeptideIdMap );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};
	

	/**
	 * Get ProteinInfo From ProteinSequenceVersionIds
	 */
	static getProteinInfoFromProteinSequenceVersionIds( { projectSearchId, proteinSequenceVersionIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					proteinSequenceVersionIds : proteinSequenceVersionIds,
			};

			let _URL = "d/rws/for-page/psb/protein-info-prot-seq-v-ids-list/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get protein-info-prot-seq-v-ids-list START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get protein-info-prot-seq-v-ids-list END, Now: " + new Date() );

						//  JS Object.  Key ProteinSequenceVersionId, value, Protein Info 

						resolve( responseData.proteinInfoMapKeyProteinSequenceVersionId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Protein Sequences From ProteinSequenceVersionIds
	 */
	static getProteinSequencesFromProteinSequenceVersionIds( { projectSearchIds, proteinSequenceVersionIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchIds : projectSearchIds,
					proteinSequenceVersionIds : proteinSequenceVersionIds,
			};

			let _URL = "d/rws/for-page/psb/protein-sequences-for-prot-seq-ver-ids/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get protein-sequences-for-prot-seq-ver-ids START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
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
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};


	/**
	 * Get Reported Peptide Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
					annotationTypeIds : annTypeIds
			};

			let _URL = "d/rws/for-page/psb/reported-peptide-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get reported-peptide-filtrbl-ann-data START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get reported-peptide-filtrbl-ann-data END, Now: " + new Date() );

						//  JS Object.  <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId; 

						resolve( responseData.annData_KeyAnnTypeId_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Reported Peptide Descriptive Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getReportedPeptideDescriptiveAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
					annotationTypeIds : annTypeIds
			};

			let _URL = "d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get reported-peptide-descriptive-ann-data START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get reported-peptide-descriptive-ann-data END, Now: " + new Date() );

						//  JS Object.  <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId; 

						resolve( responseData.annData_KeyAnnTypeId_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Best PSM Filterable Annotation Data From Reported Peptide Ids, Ann Type Ids
	 */
	static getBestPsmFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( { projectSearchId, reportedPeptideIds, annTypeIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds,
					annotationTypeIds : annTypeIds
			};

			let _URL = "d/rws/for-page/psb/psm-best-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get best-psm-filtrbl-ann-data-list START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get best-psm-filtrbl-ann-data-list END, Now: " + new Date() );

						//  JS Object.  <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId; 

						resolve( responseData.annData_KeyAnnTypeId_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Protein Coverage Data From Reported Peptide Ids
	 */
	static getProteinCoverageData_From_ReportedPeptideIds( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds
			};

			let _URL = "d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get protein-coverage-per-reported-peptide-id START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get protein-coverage-per-reported-peptide-id END, Now: " + new Date() );

						//  JS Object.  <Reported Peptide Id, [{reportedPeptideId,proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>  

						resolve( responseData.proteinCoverage_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};

	/**
	 * Get Modification Data From Reported Peptide Ids
	 */
	static getModificationsForReportedPeptideids( { projectSearchId, reportedPeptideIds } ) {

		let promise = new Promise( function( resolve, reject ) {

			let contentType = _AJAX_POST_JSON_CONTENT_TYPE;

			let requestObject = {
					projectSearchId : projectSearchId,
					reportedPeptideIds : reportedPeptideIds
			};

			let _URL = "d/rws/for-page/psb/modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id/" + getWebserviceSyncTrackingCode();

			let requestData = JSON.stringify( requestObject );

			console.log("AJAX Call to get modifications-per-reported-peptide-id START, Now: " + new Date() );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						console.log("AJAX Call to get modifications-per-reported-peptide-id END, Now: " + new Date() );

						//  JS Object.  <Reported Peptide Id, [{}]>  

						resolve( responseData.modification_KeyReportedPeptideId );

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );
					reject( errMsg );
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject( textStatus );

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});
		});
		
		return promise;
	};
	
}