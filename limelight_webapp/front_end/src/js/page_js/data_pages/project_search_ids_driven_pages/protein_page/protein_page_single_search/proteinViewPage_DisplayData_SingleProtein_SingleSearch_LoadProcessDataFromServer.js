/**
 * proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
 * 
 * Javascript for proteinView.jsp page - Get data from Server and Process/Reformat it before storing it  
 * 
 * Companion file to proteinViewPage_DisplayData_SingleSearch.js
 * 
 * 
 * 
 */


import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

import { ProteinSequenceData_For_ProteinSequenceVersionId } from '../protein_page_common/proteinSequenceData_For_ProteinSequenceVersionId.js';

import { ReportedPeptideStringData_For_ReportedPeptideId } from '../protein_page_common/reportedPeptideStringData_For_ReportedPeptideId.js';

import { ProteinViewDataLoader } from '../protein_page_common/proteinViewDataLoader.js';

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer {

	/**
	 * 
	 */
	constructor( {
		loadedDataPerProjectSearchIdHolder,
		loadedDataCommonHolder,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
	}) {
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;
	}


	/**
	 * 
	 */
	loadDataForInitialOverlayShow( { proteinSequenceVersionId, projectSearchId } ) {

		const objectThis = this;
		
		if ( this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) !== undefined ) {
			return null;
		}
		
		return new Promise( function(resolve, reject) {
			try {
				const promise_getProteinSequencesFromProteinSequenceVersionIds = 
					ProteinViewDataLoader.getProteinSequencesFromProteinSequenceVersionIds(
							{ projectSearchIds : [ projectSearchId ], proteinSequenceVersionIds : [ proteinSequenceVersionId ] } );
				
				promise_getProteinSequencesFromProteinSequenceVersionIds.
				then( function( { proteinSequences_Key_proteinSequenceVersionId, foundAllProteinSequenceVersionIdsForProjectSearchIds } ) {
					try {
						const proteinSequenceObject = proteinSequences_Key_proteinSequenceVersionId[ proteinSequenceVersionId ];
						if ( proteinSequenceObject === undefined ) {
							throw Error("No Protein sequence for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
						}
						const proteinSequenceString = proteinSequenceObject.sequence;
						const proteinSequenceData = new ProteinSequenceData_For_ProteinSequenceVersionId( { proteinSequence : proteinSequenceString } );
						
						objectThis._loadedDataCommonHolder.add_proteinSequenceData_KeyProteinSequenceVersionId( { proteinSequenceData, proteinSequenceVersionId } );

						objectThis._populateStaticModificationsPositionsOnProteinSequence({ proteinSequenceVersionId, proteinSequenceString });
						
						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				promise_getProteinSequencesFromProteinSequenceVersionIds.catch(function(reason) {
					reject(reason);
				})
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}

	////////////////////////
	/**
	 * @param retrieveForSingleSearch : boolean, true if retrieving for use with Single Search
	 * @param retrieveForMultipleSearches : boolean, true if retrieving for use with Multiple Searches
	 */
	loadDataAfterInitialOverlayShow( { retrieveForSingleSearch, retrieveForMultipleSearches, proteinSequenceVersionId, projectSearchId } ) {

		const objectThis = this;

		//  Get Reported Peptide Ids

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

			// No Reported Peptide Ids so skip
			
			return new Promise(function( resolve, reject) {
				try {
					resolve();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			
			// EARLY RETURN
		}

		return new Promise(function( resolve, reject) {
			try {
				const promises_LoadData_Array = [];

				if ( retrieveForSingleSearch ) {
					//  Called from display of Single Search

					const promise_loadReportedPeptideStringsIfNeeded = objectThis._loadReportedPeptideStringsIfNeeded( { reportedPeptideIds, projectSearchId } );
					if ( promise_loadReportedPeptideStringsIfNeeded ) {
						promises_LoadData_Array.push( promise_loadReportedPeptideStringsIfNeeded );
					}
				
					const promise_loadReportedPeptideAnnotationDataIfNeeded = objectThis._loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, projectSearchId } );
					if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
						promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
					}
				}

				if ( retrieveForMultipleSearches ) {
					//  Called from display of Multiple Searches

					const promise_loadPeptideIdsIfNeeded = objectThis._loadPeptideIdsIfNeeded( { reportedPeptideIds, projectSearchId } );
					if ( promise_loadPeptideIdsIfNeeded ) {
						promises_LoadData_Array.push( promise_loadPeptideIdsIfNeeded );
					}
				}

				if ( promises_LoadData_Array.length !== 0 ) {

					const promisesAll = Promise.all( promises_LoadData_Array );

					promisesAll.catch(function(reason) {
						reject( reason );
					})

					promisesAll.then(function(value) {
						try {
							resolve( value );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})

				} else {

					resolve();
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}


	////////////////////////
	/**
	 */
	loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch( { reportedPeptideIds, projectSearchId } ) {

		const objectThis = this;

		return new Promise(function( resolve, reject) {
			try {
				const promises_LoadData_Array = [];

				const promise_loadReportedPeptideStringsIfNeeded = objectThis._loadReportedPeptideStringsIfNeeded( { reportedPeptideIds, projectSearchId } );
				if ( promise_loadReportedPeptideStringsIfNeeded ) {
					promises_LoadData_Array.push( promise_loadReportedPeptideStringsIfNeeded );
				}
			
				const promise_loadReportedPeptideAnnotationDataIfNeeded = objectThis._loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, projectSearchId } );
				if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
					promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
				}

				if ( promises_LoadData_Array.length !== 0 ) {

					const promisesAll = Promise.all( promises_LoadData_Array );

					promisesAll.catch(function(reason) {
						try {
							reject( reason );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})

					promisesAll.then(function(value) {
						try {
							resolve( value );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})

				} else {

					resolve();
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}


	/////////////////////

	//   Single Search Processing

	/**
	 * Find the Positions on the Protein Sequence String of the Static modifications for the Search 
	 * Store on this._loadedDataPerProjectSearchIdHolder
	 */
	_populateStaticModificationsPositionsOnProteinSequence({ proteinSequenceVersionId, proteinSequenceString }) {

		{
			const staticModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();

			if ( staticModificationsOnProtein_KeyProteinSequenceVersionId && staticModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId ) ) {
				//  Already populated for proteinSequenceVersionId
				return;  // EARLY EXIT
			}
		}

		//  Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet : Set( mass (number) ) } > 
		//  (Format for class ProteinSequenceFormattedDisplay_Main_displayWidget)

		const staticModificationMassesByProteinPosition = new Map();

		const staticModsForSearch = this._loadedDataPerProjectSearchIdHolder.get_staticMods();

		if ( ( ! staticModsForSearch ) || staticModsForSearch.length === 0 ) {
			//  No Static Modifications so Exit
			return; // EARLY EXIT
		}

		for ( const staticModForSearch of staticModsForSearch ) {

			const staticModResidue = staticModForSearch.residue;
			const staticModMass = staticModForSearch.mass;

			//  Search for static mod residue in protein
			let residueFoundIndex = undefined;
			let searchStartIndex = 0;
			while ( ( residueFoundIndex = proteinSequenceString.indexOf( staticModResidue, searchStartIndex ) ) != -1 ) {
			
				const proteinPosition = residueFoundIndex + 1; // '1' based
				let staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPosition.get( proteinPosition );
				if ( ! staticModificationResiduesMassesForProteinPosition ) {
					staticModificationResiduesMassesForProteinPosition = { residue : staticModResidue, massesSet: new Set() };
					staticModificationMassesByProteinPosition.set( proteinPosition, staticModificationResiduesMassesForProteinPosition );
				}
				staticModificationResiduesMassesForProteinPosition.massesSet.add( staticModMass );

				searchStartIndex = residueFoundIndex + 1; // advance to searching to after last found index
			}
		}

		//  Sort masses at each position
		for ( const staticModificationMassesByProteinPositionEntry of staticModificationMassesByProteinPosition.entries() ) {
			const position = staticModificationMassesByProteinPositionEntry[ 0 ];
			const staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPositionEntry[ 1 ];
			const residue = staticModificationResiduesMassesForProteinPosition.residue;
			const massesAtPositionSet = staticModificationResiduesMassesForProteinPosition.massesSet;
			const massesAtPositionArray = Array.from( massesAtPositionSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			});
			//  Place the sorted Array in the final output Object in the map

			staticModificationResiduesMassesForProteinPosition.massesArray = massesAtPositionArray;
		}

		{
			let staticModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();

			if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
				staticModificationsOnProtein_KeyProteinSequenceVersionId = new Map();
				this._loadedDataPerProjectSearchIdHolder.set_staticModificationsOnProtein_KeyProteinSequenceVersionId( staticModificationsOnProtein_KeyProteinSequenceVersionId );
			}
				
			staticModificationsOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, staticModificationMassesByProteinPosition );
		}

	}

	/////////////////////

	//   Multiple Searches Retrievals

	/**
	 * 
	 */
	_loadPeptideIdsIfNeeded( { reportedPeptideIds, projectSearchId } ) {

		const objectThis = this;

		const reportedPeptideIdsToLoadPeptideIdsFor = [];
		{
			for ( const reportedPeptideId of reportedPeptideIds ) {

				if ( this._loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } ) === undefined ) {
					reportedPeptideIdsToLoadPeptideIdsFor.push( reportedPeptideId );
				}
			}
		}

		if ( reportedPeptideIdsToLoadPeptideIdsFor.length === 0 ) {
			//  No data needs to be loaded
			return null; // EARLY RETURN
		}

		return new Promise( function(resolve, reject) {
			try {
				const promise_getPeptideIdsFromReportedPeptideIds = 
					ProteinViewDataLoader.getPeptideIdsFromReportedPeptideIds( 
							{ projectSearchId : projectSearchId, 
								reportedPeptideIds : reportedPeptideIdsToLoadPeptideIdsFor } );

				promise_getPeptideIdsFromReportedPeptideIds.
				then( function( { peptideIdReportedPeptideIdMappingList, foundAllReportedPeptideIdsForProjectSearchId } ) {
					try {
						if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
							throw Error("_loadPeptideIdsIfNeeded(...) response 'foundAllReportedPeptideIdsForProjectSearchId' is false");
						}

						for ( const peptideIdReportedPeptideIdMappingEntry of peptideIdReportedPeptideIdMappingList ) {

							objectThis._loadedDataPerProjectSearchIdHolder.add_peptideIdForReportedPeptide_KeyReportedPeptideId({ 
								peptideId : peptideIdReportedPeptideIdMappingEntry.peptideId, 
								reportedPeptideId : peptideIdReportedPeptideIdMappingEntry.reportedPeptideId } );
						}
						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				promise_getPeptideIdsFromReportedPeptideIds.catch(function(reason) {
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
	/////////////////////

	//   Single Search Retrievals

	/**
	 * 
	 */
	_loadReportedPeptideStringsIfNeeded( { reportedPeptideIds, projectSearchId } ) {

		const objectThis = this;

		const reportedPeptideIdsToLoadReportedPeptideStringsFor = [];

		{
			const loadedDataCommonHolder = this._loadedDataCommonHolder;

			for ( const reportedPeptideId of reportedPeptideIds ) {

				const reportedPeptideStringData = loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );

				if ( ! reportedPeptideStringData ) {
					reportedPeptideIdsToLoadReportedPeptideStringsFor.push( reportedPeptideId );
				}
			}
		}

		if ( reportedPeptideIdsToLoadReportedPeptideStringsFor.length === 0 ) {
			//  No data needs to be loaded
			return null; // EARLY RETURN
		}

		return new Promise( function(resolve, reject) {
			try {
				const promise_getReportedPeptideStringsFromReportedPeptideIds = 
					ProteinViewDataLoader.getReportedPeptideStringsFromReportedPeptideIds( 
							{ projectSearchIds : [ projectSearchId ], 
								reportedPeptideIds : reportedPeptideIdsToLoadReportedPeptideStringsFor } );

				promise_getReportedPeptideStringsFromReportedPeptideIds.
				then( function( { reportedPeptideStrings_Key_reportedPeptideId, foundAllReportedPeptideIdsForProjectSearchIds } ) {
					try {
						const loadedDataCommonHolder = objectThis._loadedDataCommonHolder;

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
				promise_getReportedPeptideStringsFromReportedPeptideIds.catch(function(reason) {
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
	 * Load Reported Peptide Annotation Data If Not Already Loaded, based on defaultVisible
	 */
	_loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, projectSearchId } ) {

		const objectThis = this;

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  Get Annotation Types

		const annotationTypeData = this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );
		if ( ( ! annotationTypeData ) ) {
			throw Error("No annotation type data loaded." );
		}

		const annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		//  Objects: Keys are Annotation Type Id.  Properties: defaultVisible, 1
		const reportedPeptideFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		const reportedPeptideDescriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;

		// Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId =
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();

		// Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId =
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();


		//  Get Ann Type Ids for Ann Types that are to be displayed, Default or User chosen

		const searchDataLookupParams_For_Single_ProjectSearchId = 
			objectThis._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId /* , optional dataPageStateManager */ } );

		//  Array of Ann Type Ids
		const reportedPeptideAnnTypeIdsDisplay = searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay;

		if ( ( ! reportedPeptideAnnTypeIdsDisplay ) || reportedPeptideAnnTypeIdsDisplay.length === 0 ) {
			//  No Ann Type Ids to display Data for so Exit
			return null;   // EARLY EXIT
		}

		const promiseAll_Array = [];

		{
			//  Process Reported Peptide Filterable Annotation Types

			// { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
			const dataToLoad =
				this._getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading( 
						{ reportedPeptideIds : reportedPeptideIds,
							reportedPeptideAnnTypeIdsDisplay,
							annotationTypes : reportedPeptideFilterableAnnotationTypes, 
							reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId : reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId } );

			if ( dataToLoad && dataToLoad.reportedPeptideIdsToLoadDataFor && dataToLoad.annotationTypeIdsToLoadDataFor_Set ) {

				//  Load data for specified ids

				//  Convert to arrays for convert to JSON
				const reportedPeptideIds = Array.from( dataToLoad.reportedPeptideIdsToLoadDataFor );
				const annTypeIds = Array.from( dataToLoad.annotationTypeIdsToLoadDataFor_Set );

				const promise_loadData = this._loadReportedPeptideAnnotationFilterableData( { reportedPeptideIds, annTypeIds, projectSearchId } );

				promiseAll_Array.push( promise_loadData );
			}			
		}

		{
			//  Process Reported Peptide Descriptive Annotation Types

			// { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
			const dataToLoad =
				this._getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading( 
						{ reportedPeptideIds : reportedPeptideIds,
							reportedPeptideAnnTypeIdsDisplay,
							annotationTypes : reportedPeptideDescriptiveAnnotationTypes, 
							reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId : reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId } );

			if ( dataToLoad && dataToLoad.reportedPeptideIdsToLoadDataFor && dataToLoad.annotationTypeIdsToLoadDataFor_Set ) {

				//  Load data for specified ids

				//  Convert to arrays for convert to JSON
				const reportedPeptideIds = Array.from( dataToLoad.reportedPeptideIdsToLoadDataFor );
				const annTypeIds = Array.from( dataToLoad.annotationTypeIdsToLoadDataFor_Set );

				const promise_loadData = this._loadReportedPeptideAnnotationDescriptiveData( { reportedPeptideIds, annTypeIds, projectSearchId } );

				promiseAll_Array.push( promise_loadData );
			}			
		}

		if ( promiseAll_Array.length === 0 ) {
			return null;
		}

		return Promise.all( promiseAll_Array );
	}

	/**
	 * Load Reported Peptide Filterable Ann Data
	 */
	_loadReportedPeptideAnnotationFilterableData( { reportedPeptideIds, annTypeIds, projectSearchId } ) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				const promise_LoadData = 
					ProteinViewDataLoader.getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( 
							{ projectSearchId, 
								reportedPeptideIds : reportedPeptideIds,
								annTypeIds : annTypeIds } );

				promise_LoadData.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
					try {
						objectThis._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.
						_processReportedPeptideFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } );

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
	 * Load Reported Peptide Descriptive Ann Data
	 */
	_loadReportedPeptideAnnotationDescriptiveData( { reportedPeptideIds, annTypeIds, projectSearchId } ) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				const promise_LoadData = 
					ProteinViewDataLoader.getReportedPeptideDescriptiveAnnData_From_ReportedPeptideIds_AnnTypeIds( 
							{ projectSearchId, 
								reportedPeptideIds : reportedPeptideIds,
								annTypeIds : annTypeIds } );

				promise_LoadData.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
					try {
						objectThis._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.
						_processReportedPeptideDescriptiveAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } );

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
	 * return Ann Type Ids and Reported Peptide Ids to Load for either Filterable or Descriptive
	 * 
	 * @param reportedPeptideAnnTypeIdsDisplay is Array of Ann Type Ids
	 * @param annotationTypes - Object of Ann Type data for either Filterable or Descriptive, keys are Ann Type Ids
	 */
	_getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading( { reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay, annotationTypes, reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId } ) {

		//  reportedPeptideAnnTypeIdsDisplay is Array of Ann Type Ids
		//  

		if ( ( ! reportedPeptideAnnTypeIdsDisplay ) || reportedPeptideAnnTypeIdsDisplay.length === 0 ) {

			// No Chosen Reported Peptide Annotation data so skip
			return null; // EARLY RETURN
		}

		//  Create set of Ann Type Ids from reportedPeptideAnnTypeIdsDisplay 
		//     that is specific to Filterable or Descriptive Ann Types 
		//     as specified by contents of annotationTypes

		const annTypeIdsToProcess = new Set();

		for ( const annTypeIdDisplay of reportedPeptideAnnTypeIdsDisplay ) {
			const annotationType = annotationTypes[ annTypeIdDisplay ];
			if ( annotationType ) {
				annTypeIdsToProcess.add( annTypeIdDisplay );
			}
		}

		if ( annTypeIdsToProcess.size === 0 ) {

			// No Annotation Type Ids To Process so skip
			return null; // EARLY RETURN
		}

		//  This is not highly optimized and may result in loading some data that is already loaded.

		//  Any Annotation Type Ids that are missing for any of the Reported Peptide Ids 
		//    will be loaded for all the Reported Peptide Ids.

		let reportedPeptideIdsToLoadDataFor = undefined;

		let annotationTypeIdsToLoadDataFor_Set = undefined;

		//  Search for Reported Peptide Ids and Annotation Data to be loaded

		if ( ! reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId ) {

			//  No Ann Data so need to load for all Ann Type Ids To Process and All Reported Peptide Ids
			annotationTypeIdsToLoadDataFor_Set = new Set( annTypeIdsToProcess );
			reportedPeptideIdsToLoadDataFor = new Set( reportedPeptideIds );

		} else {

			for ( const reportedPeptideId of reportedPeptideIds ) {

				let peptideAnnotationMap = reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );

				if ( ! peptideAnnotationMap ) {

					//  No Data for this Reported Peptide Id so need all Ann data for all reported Peptide Ids
					//  No Ann Data so need to load for all Ann Type Ids To Process and All Reported Peptide Ids
					annotationTypeIdsToLoadDataFor_Set = new Set( annTypeIdsToProcess );
					reportedPeptideIdsToLoadDataFor = new Set( reportedPeptideIds );

					break; //  Exit Loop since need to load for all Default Visible Ann Type Ids and All Reported Peptide Ids

				} else {
					for ( const annotationTypeId of annTypeIdsToProcess ) {

						const annData = peptideAnnotationMap.get( annotationTypeId );
						if ( ! annData ) {

							if ( ! reportedPeptideIdsToLoadDataFor ) {
								reportedPeptideIdsToLoadDataFor = reportedPeptideIdsToLoadDataFor = new Set();
							}
							if ( ! annotationTypeIdsToLoadDataFor_Set ) {
								annotationTypeIdsToLoadDataFor_Set = new Set();
							}
							annotationTypeIdsToLoadDataFor_Set.add( annotationTypeId );
							reportedPeptideIdsToLoadDataFor.add( reportedPeptideId );
						}
					}
				}
			}
		}

		//  If empty, reset to undefined
		if ( reportedPeptideIdsToLoadDataFor && reportedPeptideIdsToLoadDataFor.size === 0 ) {
			reportedPeptideIdsToLoadDataFor = undefined;
		}
		//  If empty, reset to undefined
		if ( annotationTypeIdsToLoadDataFor_Set && annotationTypeIdsToLoadDataFor_Set.size === 0 ) {
			annotationTypeIdsToLoadDataFor_Set = undefined;
		}

		return { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
	}

}
