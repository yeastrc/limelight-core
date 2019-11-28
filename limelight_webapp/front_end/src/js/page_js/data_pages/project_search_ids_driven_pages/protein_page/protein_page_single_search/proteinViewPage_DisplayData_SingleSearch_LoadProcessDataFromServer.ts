/**
 * proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.ts
 * 
 * Javascript for proteinView.jsp page - Get data from Server and Process/Reformat it before storing it  
 * 
 * Companion file to proteinViewPage_DisplayData_SingleSearch.ts
 * 
 * 
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinViewDataLoader } from '../protein_page_common/proteinViewDataLoader';
import { ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId } from '../protein_page_common/proteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId';


/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer {

	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	/**
	 * 
	 */
	constructor({
		loadedDataPerProjectSearchIdHolder,
		searchDetailsBlockDataMgmtProcessing
	} : {
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	}) {
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
	}
	

	/**
	 * Get Data from Server for Single Project Search Id and Cutoffs/Filters
	 */
	getDataFromServer( { projectSearchId } ) {

		let objectThis = this;

		let searchDetails_Filters_AnnTypeDisplayRootObject = 
			objectThis._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });
		
		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
		let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

		let filtersAnnTypeDisplay_For_ProjectSearchId = undefined;
		
		for ( let filtersAnnTypeDisplay_For_Single_ProjectSearchId of filtersAnnTypeDisplayPerProjectSearchIds ) {
			
			if ( projectSearchId === filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId ) {
				filtersAnnTypeDisplay_For_ProjectSearchId = filtersAnnTypeDisplay_For_Single_ProjectSearchId;
				break;
			}
		}
		
		if ( ! filtersAnnTypeDisplay_For_ProjectSearchId ) {
			const msg = "No entry found in filtersAnnTypeDisplayPerProjectSearchIds for projectSearchId: " + projectSearchId;
			console.log( msg );
			throw Error( msg );
		}
		
		//  Outer Promise for getting data from server for projectSearchId

		return new Promise( function(resolve, reject) {
			try {
				let searchDataLookupParams_For_Single_ProjectSearchId = 
					objectThis._searchDetailsBlockDataMgmtProcessing.
					getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );

				//  First get Reported Peptide Ids for current cutoffs/filters
				
				const promise_getReportedPeptideIdList = ProteinViewDataLoader.getReportedPeptideIdList( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } )
				
				promise_getReportedPeptideIdList.catch(function(reason) {
					try {
						reject(reason);
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
				//  Get all the data based on the getReportedPeptideIdList(...) result
				
				const promise_get_Data_From_ReportedPeptideIdList = promise_getReportedPeptideIdList.then( function( reportedPeptideCoreDataArray ) {
					try {
						const promiseAllArray = [];

						//  Static Mods - Arbitrarily put here - Not used on Protein List Page
						if ( ! objectThis._loadedDataPerProjectSearchIdHolder.get_staticMods() ) {
							//  No static mods so load them
							const promise = objectThis._getAndProcessStaticMods_forProjectSearchId( { projectSearchId } );
							promiseAllArray.push( promise );
						}
						
						//  Unique Reporter Ion Masses for the Search - Arbitrarily put here - Not used on Protein List Page
						if ( ! objectThis._loadedDataPerProjectSearchIdHolder.get_reporterIonMasses_ForSearch() ) {
							//  No Unique Reporter Ion Masses for the Search so load them
							const promise = objectThis._getAndProcess_ReporterIonsUnique_ForSearch_forProjectSearchId( { projectSearchId } );
							promiseAllArray.push( promise );
						}

						objectThis._processPeptideIdListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray } );
						
						if ( ! objectThis._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {

							// Get number of PSMs per Reported Peptide Id
							
							const promise__get_numPsmsForReportedPeptideIds =
								objectThis._get_numPsmsForReportedPeptideIds( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } );
								
							promiseAllArray.push( promise__get_numPsmsForReportedPeptideIds );
						}
						
						//  This first loads ProteinSequenceVersionIds for Reported Peptide Ids and then loads data based on those ProteinSequenceVersionIds
						const promise_get_ProteinData_Including_ProteinSequenceVersionIds =
							objectThis._get_ProteinData_Including_ProteinSequenceVersionIds( { projectSearchId } );
						
						promiseAllArray.push( promise_get_ProteinData_Including_ProteinSequenceVersionIds );

						const promise_get_ProteinCoverage_FromReportedPeptideIds =
							objectThis._get_ProteinCoverage_FromReportedPeptideIds( { projectSearchId } );

						promiseAllArray.push( promise_get_ProteinCoverage_FromReportedPeptideIds );
						
						const promise_get_ReportedPeptideFilterableAnnTypeDataForCurrentFilter =
							objectThis._get_ReportedPeptideFilterableAnnTypeDataForCurrentFilter( { projectSearchId, filtersAnnTypeDisplay_For_ProjectSearchId } );
							
						promiseAllArray.push( promise_get_ReportedPeptideFilterableAnnTypeDataForCurrentFilter );
						
						const promise_get_BestPsmFilterableAnnTypeDataForCurrentFilter =
							objectThis._get_BestPsmFilterableAnnTypeDataForCurrentFilter( { projectSearchId, filtersAnnTypeDisplay_For_ProjectSearchId } );
						
						promiseAllArray.push( promise_get_BestPsmFilterableAnnTypeDataForCurrentFilter );

						return Promise.all( promiseAllArray );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

				promise_get_Data_From_ReportedPeptideIdList.catch(function(reason) {
					try {
						reject(reason);
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
				promise_get_Data_From_ReportedPeptideIdList.then(function(value) {
					try {
						//  'value' from Promise.all is an array of the promise values from the individual resolve() calls
						//    Since all calls to resolve() don't pass a value, in this case it is an array of elements each containing undefined 

						//  Processing that requires all data to be loaded
						
						//  Take proteinSequenceCoverage Per Reported Peptide Ids and create proteinSequenceCoverage Per proteinSequenceVersionId
						objectThis._proteinSequenceCoverage_MapPer_proteinSequenceVersionId();
						
						//  All Data is loaded and all post load processing of loaded data is complete
						
						resolve(); // Resolve outer promise in this containing function
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
	 * Performed here since currently not used for single search protein list
	 */
	_getAndProcessStaticMods_forProjectSearchId( { projectSearchId } ) {

		const objectThis = this;
		
		return new Promise((resolve, reject) => {
			try {
				const promise_getData = ProteinViewDataLoader.getStaticMods( { projectSearchId } );

				promise_getData.catch((reason) => { reject(reason)});

				promise_getData.then((staticModsList) => {
					try {
						// DB Results: staticModsList: result list item { String residue, BigDecimal mass }
						// Store: Array [{ String residue, BigDecimal mass }] : [Static Mods]

						objectThis._loadedDataPerProjectSearchIdHolder.set_staticMods(staticModsList)

						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			} catch( e ) {
				console.log("Exception caught in New Promise in _getAndProcessStaticMods_forProjectSearchId(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * Performed here since currently not used for single search protein list
	 */
	_getAndProcess_ReporterIonsUnique_ForSearch_forProjectSearchId( { projectSearchId } ) {

		const objectThis = this;
		
		return new Promise((resolve, reject) => {
			try {
				const promise_getData = ProteinViewDataLoader._get_ReporterIonsUnique_ForSearch_forProjectSearchId( { projectSearchId } );

				promise_getData.catch((reason) => { reject(reason)});

				promise_getData.then( (reporterIonMassesUniqueList) => {
					try {
						// DB Results: reporterIonMassesUniqueList: result list item BigDecimal
						// Store: Set <mass>

						const reporterIonMassesUniqueList_Local = ( reporterIonMassesUniqueList as any ) ;

						const reporterIonMassesUniqueSet = new Set( reporterIonMassesUniqueList_Local )

						objectThis._loadedDataPerProjectSearchIdHolder.set_reporterIonMasses_ForSearch(reporterIonMassesUniqueSet);

						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			} catch( e ) {
				console.log("Exception caught in New Promise in _getAndProcess_ReporterIonsUnique_ForSearch_forProjectSearchId(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * Get Number of PSMs per Reported Peptide Id from Reported Peptide Ids, Search Criteria
	 */
	_get_numPsmsForReportedPeptideIds( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
				ProteinViewDataLoader.getNumPsmsForReportedPeptideIdsCutoffs( 
						{ projectSearchId, 
							reportedPeptideIds : objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(), 
							searchDataLookupParams_For_Single_ProjectSearchId

						}).then(function(numPsms_KeyReportedPeptideId) {
							try {
								objectThis._processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData( { numPsms_KeyReportedPeptideId } );
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
						});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * Get All Reported Peptide Data For Building Protein Display from Reported Peptide Ids
	 * 
	 * Get Reported Peptide Filterable Annotation data For Current Filter
	 */
	_get_ReportedPeptideFilterableAnnTypeDataForCurrentFilter( 
			{ projectSearchId, filtersAnnTypeDisplay_For_ProjectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
				if ( ( ! filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) ||
						( filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters.length === 0 ) ) {
					
					//  No reportedPeptideFilters to get data for
					
					// console.log("No reported Peptide Cutoffs");
					
					resolve();  // EARLY resolve()
					return;     // EARLY EXIT
				}

				if ( ! objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ||
						objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length === 0 ) {
					
					//  No Reported Peptide Ids

					// console.log("No Reported Peptide Ids");
					
					resolve();  // EARLY resolve()
					return;     // EARLY EXIT
				}
				
				const annTypeIds = [];
				for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
					annTypeIds.push( filterEntry.annTypeId );
				}

				ProteinViewDataLoader.getReportedPeptideFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( 
						{ projectSearchId, 
							reportedPeptideIds : objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(),
							annTypeIds : annTypeIds } )
							.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
								try {
									objectThis._processReportedPeptideFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } );
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
	 * Get All  Best PSM Data For Building Protein Display from Reported Peptide Ids
	 * 
	 * Get Best PSM Filterable Annotation data For Current Filter
	 */
	_get_BestPsmFilterableAnnTypeDataForCurrentFilter( 
			{ projectSearchId, filtersAnnTypeDisplay_For_ProjectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
			if ( ( ! filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) ||
					( filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters.length === 0 ) ) {
				
				//  No psmFilters to get data for
				
				// console.log("No PSM Cutoffs");
				
				resolve();  // EARLY resolve()
				return;     // EARLY EXIT
			}
			
			if ( ! objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ||
					objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length === 0 ) {
				
				//  No Reported Peptide Ids

				// console.log("No Reported Peptide Ids");
				
				resolve();  // EARLY resolve()
				return;     // EARLY EXIT
			}
			
			const annTypeIds = [];
			for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) {
				annTypeIds.push( filterEntry.annTypeId );
			}

			ProteinViewDataLoader.getBestPsmFilterableAnnData_From_ReportedPeptideIds_AnnTypeIds( 
					{ projectSearchId, 
						reportedPeptideIds : objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(),
						annTypeIds : annTypeIds } )
						.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
							try {
								objectThis._processPsmBestFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } );
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
	 * Get All Protein Data from Reported Peptide Ids - Except Protein Coverage
	 */
	_get_ProteinData_Including_ProteinSequenceVersionIds( { projectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
				ProteinViewDataLoader.getProteinSequenceVersionIds( { projectSearchId, reportedPeptideIds : objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() } )
				.then(function( proteinSequenceVersionIdsPerReportedPeptideIdMap ) {
					try {
						objectThis._processReportedPeptideIdProteinSequenceVersionIdsFromServer_Populate_loadedData( { proteinSequenceVersionIdsPerReportedPeptideIdMap } );
						
						const promiseAllArray = [];

						const promise__get_ProteinInfo_From_proteinSequenceVersionIds =
							objectThis._get_ProteinInfo_From_proteinSequenceVersionIds( { projectSearchId } );

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
	 * Get Protein Info from proteinSequenceVersionIds
	 */
	_get_ProteinInfo_From_proteinSequenceVersionIds( { projectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
				let proteinSequenceVersionIds = objectThis._loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();
				ProteinViewDataLoader.getProteinInfoFromProteinSequenceVersionIds( { projectSearchId, proteinSequenceVersionIds } )
				.then(function( proteinInfoMapKeyProteinSequenceVersionId ) {
					try {
						objectThis._processProteinInfoFromServer_Populate_loadedData( { proteinInfoMapKeyProteinSequenceVersionIdFromServer : proteinInfoMapKeyProteinSequenceVersionId } );
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
	 * Get Protein Coverage from Reported Peptide Ids, called after protein sequence ids are available
	 */
	_get_ProteinCoverage_FromReportedPeptideIds( { projectSearchId } ) {

		let objectThis = this;
		
		return new Promise(function(resolve, reject) {
			try {
				ProteinViewDataLoader.getProteinCoverageData_From_ReportedPeptideIds( { projectSearchId, reportedPeptideIds : objectThis._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() } )
				.then(function( proteinCoverage_KeyReportedPeptideIdFromServer ) {
					try {
						objectThis._processProteinCoverageFromServer_Populate_loadedData( { proteinCoverage_KeyReportedPeptideIdFromServer } );
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
	 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds( ) 
	 *  Set (if available):  this._loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap() : Map of num PSMs : Key ReportedPeptideId
	 */
	_processPeptideIdListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray } ) {
		
		//  Each entry in reportedPeptideCoreDataArray is an object with properties reportedPeptideId and numPsms_IfComputedOrInDB
		
		//             numPsms_IfComputedOrInDB is only populated for some criteria (Default Cutoffs).  Otherwise, it is null.
		
		//  Extract the reportedPeptideIds into an array and if populated put the numPsms in a Map on loadedData

		// console.log("_processPeptideIdListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray } ) reportedPeptideCoreDataArray:");
		// console.log( reportedPeptideCoreDataArray );
		
		const reportedPeptideIds = [];
		const numPsmsForReportedPeptideIdMap = new Map();
		const reportedPeptideIds_HasDynamicModifications = new Set();
		const reportedPeptideIds_AnyPsmHas_DynamicModifications = new Set();
		const reportedPeptideIds_AnyPsmHas_ReporterIons = new Set();
		
		let allSet_numPsmsForReportedPeptideIdMap = true;
		
		for ( const reportedPeptideCoreDataEntry of reportedPeptideCoreDataArray ) {

			const reportedPeptideId = reportedPeptideCoreDataEntry.reportedPeptideId;
			const numPsms_IfComputedOrInDB = reportedPeptideCoreDataEntry.numPsms_IfComputedOrInDB;
			const reportedPeptideHas_DynamicModifications = reportedPeptideCoreDataEntry.reportedPeptideHas_DynamicModifications;
			const anyPsmHas_DynamicModifications = reportedPeptideCoreDataEntry.anyPsmHas_DynamicModifications;
			const anyPsmHas_ReporterIons = reportedPeptideCoreDataEntry.anyPsmHas_ReporterIons;

			reportedPeptideIds.push( reportedPeptideId );

			if ( numPsms_IfComputedOrInDB !== undefined && numPsms_IfComputedOrInDB !== null ) {
				numPsmsForReportedPeptideIdMap.set( reportedPeptideId, numPsms_IfComputedOrInDB );
			} else {
				allSet_numPsmsForReportedPeptideIdMap = false;
			}

			if ( reportedPeptideHas_DynamicModifications ) {
				reportedPeptideIds_HasDynamicModifications.add( reportedPeptideId );
			}
			if ( anyPsmHas_DynamicModifications ) {
				reportedPeptideIds_AnyPsmHas_DynamicModifications.add( reportedPeptideId );
			}
			if ( anyPsmHas_ReporterIons ) {
				reportedPeptideIds_AnyPsmHas_ReporterIons.add( reportedPeptideId );
			}
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds( reportedPeptideIds );
		if ( allSet_numPsmsForReportedPeptideIdMap ) {
			this._loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap( numPsmsForReportedPeptideIdMap );
		}
		//  Reported Peptides for Current Cutoffs/Filters that contain Reported Peptide Level Dynamic Modifications
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_HasDynamicModifications( reportedPeptideIds_HasDynamicModifications );
		//  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Dynamic Modifications
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_AnyPsmHas_DynamicModifications( reportedPeptideIds_AnyPsmHas_DynamicModifications );
		//  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Reporter Ions
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_AnyPsmHas_ReporterIons( reportedPeptideIds_AnyPsmHas_ReporterIons );
	}

	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 *  Set this._loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap : Map of num PSMs : Key ReportedPeptideId
	 */
	_processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData( { numPsms_KeyReportedPeptideId } ) {
		
		const numPsmsForReportedPeptideIdMap = new Map();

		const numPsms_KeyReportedPeptideId_Keys = Object.keys( numPsms_KeyReportedPeptideId );
		
		for ( const reportedPeptideIdString of numPsms_KeyReportedPeptideId_Keys ) {
			
			const numPsms = numPsms_KeyReportedPeptideId[ reportedPeptideIdString ];
			
			const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
			numPsmsForReportedPeptideIdMap.set( reportedPeptideIdInt, numPsms );
		}
		this._loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap( numPsmsForReportedPeptideIdMap );
	}
	
	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * Set on loadedData:  
	 * 
	 * this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsKeyReportedPeptideId - Map: Key ReportedPeptideId Value Array proteinSequenceVersionIds
	 * this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIdsKeyProteinSequenceVersionId() - Map: Key ProteinSequenceVersionId Value Array ReportedPeptideIds
	 * this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsUnique - Set proteinSequenceVersionIds
	 * this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsArray - Array proteinSequenceVersionIds - unique values, sorted
	 */
	_processReportedPeptideIdProteinSequenceVersionIdsFromServer_Populate_loadedData( { proteinSequenceVersionIdsPerReportedPeptideIdMap } ) {
		
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

		this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsKeyReportedPeptideId( proteinSequenceVersionIdsPerReportedPeptideId );
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideIdsKeyProteinSequenceVersionId( reportedPeptideIdsKeyProteinSequenceVersionId );
		
		this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsUnique( proteinSequenceVersionIdsUnique );
		this._loadedDataPerProjectSearchIdHolder.set_proteinSequenceVersionIdsArray( proteinSequenceVersionIdsArray );
	}

	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_proteinInfoKeyproteinSequenceVersionId : Map Key ProteinSequenceVersionId, Value: Object of Protein Info
	 */
	_processProteinInfoFromServer_Populate_loadedData( { proteinInfoMapKeyProteinSequenceVersionIdFromServer } ) {

		//  JS Object.  Key proteinSequenceVersionId, value, Object Protein Info 
		// proteinInfoMapKeyProteinSequenceVersionIdFromServer
		
		let proteinInfoMapKeyProteinSequenceVersionId = new Map();

		let proteinInfoMapKeyProteinSequenceVersionIdFromServer_Keys = Object.keys( proteinInfoMapKeyProteinSequenceVersionIdFromServer );
		
		for ( const proteinSequenceVersionIdString of proteinInfoMapKeyProteinSequenceVersionIdFromServer_Keys ) {
			const proteinSequenceVersionIdInt = Number.parseInt( proteinSequenceVersionIdString );
			const proteinInfoForProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionIdFromServer[ proteinSequenceVersionIdString ];
			
			proteinInfoMapKeyProteinSequenceVersionId.set( proteinSequenceVersionIdInt, proteinInfoForProteinSequenceVersionId );
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_proteinInfoMapKeyProteinSequenceVersionId( proteinInfoMapKeyProteinSequenceVersionId );
	}

	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * 	Set:  set_proteinCoverage_KeyReportedPeptideId() : JS Object.  <Reported Peptide Id, [{proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
	 */
	_processProteinCoverageFromServer_Populate_loadedData( { proteinCoverage_KeyReportedPeptideIdFromServer } ) {

		//  JS Object.  Key proteinSequenceVersionId, value, Object Protein Info 
		// proteinInfoMapKeyProteinSequenceVersionIdFromServer
		
		let proteinCoverage_KeyReportedPeptideId = new Map();

		let proteinCoverage_KeyReportedPeptideIdFromServer_Keys = Object.keys( proteinCoverage_KeyReportedPeptideIdFromServer );
		
		for ( const reportedPeptideIdString of proteinCoverage_KeyReportedPeptideIdFromServer_Keys ) {
			const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
			const proteinCoverage = proteinCoverage_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
			
			proteinCoverage_KeyReportedPeptideId.set( reportedPeptideIdInt, proteinCoverage );
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_proteinCoverage_KeyReportedPeptideId( proteinCoverage_KeyReportedPeptideId );
	}
	
	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
	 * 
	 * Also called by class ProteinViewPage_Display_SingleProtein_SingleSearch
	 */
	_processReportedPeptideFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } ) {

		//  JS Object.   <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideFilterableAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;
		
		//  Translate to Map, parsing object keys to int
		
		let annData_KeyAnnTypeId_KeyReportedPeptideId = 
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
		
		if ( ! annData_KeyAnnTypeId_KeyReportedPeptideId ) {
			annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();
		}

		let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );
		
		for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
			const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
			const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
			
			let annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideIdInt );
			if ( ! annData_KeyAnnTypeId ) {
				annData_KeyAnnTypeId = new Map();
				annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );
			}
			
			let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );
			
			for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
				const annTypeIdInt = Number.parseInt( annTypeIdString );
				const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];
				
				const annData = { valueDouble : annData_FromServer.valueDouble, valueString : annData_FromServer.valueString };
				
				annData_KeyAnnTypeId.set( annTypeIdInt, annData );
			}
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );

	}

	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
	 * 
	 * Also called by class ProteinViewPage_Display_SingleProtein_SingleSearch
	 */
	_processReportedPeptideDescriptiveAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } ) {

		//  JS Object.   <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;
		
		//  Translate to Map, parsing object keys to int
		
		let annData_KeyAnnTypeId_KeyReportedPeptideId = 
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();
		
		if ( ! annData_KeyAnnTypeId_KeyReportedPeptideId ) {
			annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();
		}

		let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );
		
		for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
			const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
			const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
			
			let annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideIdInt );
			if ( ! annData_KeyAnnTypeId ) {
				annData_KeyAnnTypeId = new Map();
				annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );
			}
			
			let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );
			
			for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
				const annTypeIdInt = Number.parseInt( annTypeIdString );
				const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];
				
				const annData = { valueDouble : annData_FromServer.valueDouble, valueString : annData_FromServer.valueString };
				
				annData_KeyAnnTypeId.set( annTypeIdInt, annData );
			}
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );
	}
		
	/**
	 * Populate loadedData with data from dataFromServer.
	 * 
	 * 	Set:  this._loadedDataPerProjectSearchIdHolder.set_psmBest_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
	 */
	_processPsmBestFilterableAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer } ) {

		//  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;
		
		//  Translate to Map, parsing object keys to int
		
		let annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();

		let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );
		
		for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
			const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
			const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
			
			const annData_KeyAnnTypeId = new Map();
			annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );

			let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );
			
			for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
				const annTypeIdInt = Number.parseInt( annTypeIdString );
				const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];
				
				const annData = { valueDouble : annData_FromServer.bestPsmValue, valueString : annData_FromServer.bestPsmValue.toString() };
				
				annData_KeyAnnTypeId.set( annTypeIdInt, annData );
			}
		}
		
		this._loadedDataPerProjectSearchIdHolder.set_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );
	}

	/**
	 * Map the protein sequence coverage to be per proteinSequenceVersionId
	 */
	_proteinSequenceCoverage_MapPer_proteinSequenceVersionId() {
		
		//  Use current array of reportedPeptideIds
		const reportedPeptideIds = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

		const proteinCoverage_KeyReportedPeptideId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId();
		
		const proteinInfoMapKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();

		const coveragePer_ProteinSequenceVersionId = 
			ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId.
			compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId(
					{ reportedPeptideIds, proteinCoverage_KeyReportedPeptideId, proteinInfoMapKeyProteinSequenceVersionId } );
		
		const proteinCoverage_KeyProteinSequenceVersionId = coveragePer_ProteinSequenceVersionId.proteinCoverage_KeyProteinSequenceVersionId;
				
		this._loadedDataPerProjectSearchIdHolder.set_proteinCoverage_KeyProteinSequenceVersionId( proteinCoverage_KeyProteinSequenceVersionId );
	}
	
}

