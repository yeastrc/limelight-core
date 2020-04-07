/**
 * proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.ts
 * 
 * Javascript for proteinView.jsp page - Get data from Server and Process/Reformat it before storing it  
 * 
 * Companion file to proteinViewPage_DisplayData_SingleSearch.js
 * 
 * 
 * !!!!!!!!!!   Also used in Multiple Search page, with flags like 'retrieveForMultipleSearches'   !!!!!!!!!!!!!!
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItem } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinSequenceData_For_ProteinSequenceVersionId } from '../protein_page_common/proteinSequenceData_For_ProteinSequenceVersionId';

import { ReportedPeptideStringData_For_ReportedPeptideId } from '../protein_page_common/reportedPeptideStringData_For_ReportedPeptideId';

import { ProteinViewDataLoader } from '../protein_page_common/proteinViewDataLoader';
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer {

	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;

	/**
	 * @param searchDetailsBlockDataMgmtProcessing 
	 * 		- Used in loadDataAfterInitialOverlayShow(...) if Single Search
	 * 		- Used in loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...) if param is not passed
	 */
	constructor({
		loadedDataPerProjectSearchIdHolder,
		loadedDataCommonHolder,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing, //  Used in loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...) if param is not passed
		proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
	} : {
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
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

		// console.log("loadDataForInitialOverlayShow(...): projectSearchId: " + projectSearchId );

		//  When Called for multiple searches in a row like on the multiple search page and experiment page, 
		//  for each search this code will retrieve the protein sequence 
		//  since this code is called for each search before the AJAX response from getting the same protein sequence for the previous search.

		{
			//  class ProteinSequenceData_For_ProteinSequenceVersionId
			const proteinSequenceData : ProteinSequenceData_For_ProteinSequenceVersionId = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } );
		
			if ( proteinSequenceData !== undefined ) {

				const proteinSequenceString = proteinSequenceData.getProteinSequence();

				//  Call this again since use this for multiple searches and need to call this for each projectSearchId

				objectThis._populateStaticModificationsPositionsOnProteinSequence({ proteinSequenceVersionId, proteinSequenceString });
							
				return null; //  EARLY RETURN
			}
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

	/**
	 * MAYBE NOT USED
	 * 
	 * For this proteinSequenceVersionId, get the PSM Ids for the Reported Peptide Ids
	 * @returns Promise or null
	 */
	loadDataFor_PSM_Ids_Per_ReportedPeptideId_For_ProteinSequenceVersionId( { proteinSequenceVersionId, projectSearchId } ) {

		// console.log( "loadDataFor_PSM_Ids_Per_ReportedPeptideId_For_ProteinSequenceVersionId")

		const objectThis = this;

		//  Get Reported Peptide Ids for proteinSequenceVersionId

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

			// No Reported Peptide Ids so skip
			
			return null;  // EARLY RETURN
		}

		//  Get Reported Peptide Ids that don't have PSM IDs for

		let psmIdsForReportedPeptideIdMap = this._loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
		if ( ! psmIdsForReportedPeptideIdMap ) {
			psmIdsForReportedPeptideIdMap = new Map();
			this._loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
		}

		const reportedPeptideIdsToLoadDataFor = [];
		const reportedPeptideIdsToLoadDataFor_AsSet = new Set(); //  Create set for tracking received data for all reported peptide ids
		{
			for ( const reportedPeptideId of reportedPeptideIds ) {

				if ( ! psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) ) {
					reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
				}
			}
		}

		if ( reportedPeptideIdsToLoadDataFor.length === 0 ) {
			//  No data needs to be loaded
			return null; // EARLY RETURN
		}

		return new Promise( (resolve, reject) => {
			try {

				const searchDataLookupParams_For_Single_ProjectSearchId = 
				objectThis._searchDetailsBlockDataMgmtProcessing.
				getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );

				const promise = 
					ProteinViewDataLoader.getPsmsIdsForReportedPeptideIdsCutoffs( 
							{ projectSearchId : projectSearchId, 
								reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
								searchDataLookupParams_For_Single_ProjectSearchId } );

				promise.then( ( { reportedPeptideId_psmIdList_List } ) => {
					try {
								
						let psmIdsForReportedPeptideIdMap = this._loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
						if ( ! psmIdsForReportedPeptideIdMap ) {
							psmIdsForReportedPeptideIdMap = new Map();
							this._loadedDataPerProjectSearchIdHolder.set_psmIdsForReportedPeptideIdMap( psmIdsForReportedPeptideIdMap );
						}

						for ( const reportedPeptideId_psmIdList_Entry of reportedPeptideId_psmIdList_List ) {

							const reportedPeptideId = reportedPeptideId_psmIdList_Entry.reportedPeptideId;
							const psmIdList = reportedPeptideId_psmIdList_Entry.psmIdList;

							psmIdsForReportedPeptideIdMap.set( reportedPeptideId, psmIdList );

							reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
						}

						if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
							console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
						}

						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				promise.catch(function(reason) {
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
	 * For this proteinSequenceVersionId, get the PSM Reporter Ion Masses for the Reported Peptide Ids
	 * 
	 * @param searchDataLookupParams_For_Single_ProjectSearchId - Optional.  If not populated, retrieved from this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId(...)
	 * 
	 * @returns Promise or null
	 */
	loadDataFor_PSM_ReporterIonMasses_Per_ReportedPeptideId_For_ProteinSequenceVersionId({ 
		
		proteinSequenceVersionId, 
		projectSearchId, 
		searchDataLookupParams_For_Single_ProjectSearchId 
	} : { 
		proteinSequenceVersionId, 
		projectSearchId, 
		searchDataLookupParams_For_Single_ProjectSearchId?  // Optional
	}  ) {

		// console.log( "loadDataFor_PSM_ReporterIonMasses_Per_ReportedPeptideId_For_ProteinSequenceVersionId")

		const objectThis = this;

		//  Get Reported Peptide Ids for proteinSequenceVersionId

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

			// No Reported Peptide Ids so skip
			
			return null;  // EARLY RETURN
		}

		//  Get Reported Peptide Ids that don't have Map< PSM ID, Set<Reporter Ion Mass> for

		let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = this._loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
		if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap ) {
			psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap = new Map();
			this._loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap );
		}

		//   Reported Peptide Ids with any PSM level Reporter Ions
		//  	Set
		const reportedPeptideIds_AnyPsmHas_ReporterIons = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_ReporterIons();

		if ( reportedPeptideIds_AnyPsmHas_ReporterIons.size === 0 ) {
			//  No Reported Peptide Ids with any PSM level Reporter Ions so exit
			return null; // EARLY RETURN
		}

		const reportedPeptideIdsToLoadDataFor = [];
		const reportedPeptideIdsToLoadDataFor_AsSet = new Set(); //  Create set for tracking received data for all reported peptide ids
		{
			for ( const reportedPeptideId of reportedPeptideIds ) {

				//  Filter Reported Peptide Ids to just ones with any PSM level Reporter Ions

				if ( ! reportedPeptideIds_AnyPsmHas_ReporterIons.has( reportedPeptideId ) ) {
					// No PSM level Reporter Ions so skip
					continue; // EARLY CONTINUE
				}

				if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap.get( reportedPeptideId ) ) {
					//  Data not already retrieved so add reportedPeptideId
					reportedPeptideIdsToLoadDataFor.push( reportedPeptideId );
				}
			}
		}

		if ( reportedPeptideIdsToLoadDataFor.length === 0 ) {
			//  No data needs to be loaded
			return null; // EARLY RETURN
		}

		return new Promise( (resolve, reject) => {
			try {

				let searchDataLookupParams_For_Single_ProjectSearchId_Local = searchDataLookupParams_For_Single_ProjectSearchId;
				if ( ! searchDataLookupParams_For_Single_ProjectSearchId_Local ) {

					searchDataLookupParams_For_Single_ProjectSearchId_Local = 
					this._searchDetailsBlockDataMgmtProcessing.
					getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined /* , optional dataPageStateManager */ } );
				}

				const promise = ProteinViewDataLoader.getPsmsReporterIonMassesForReportedPeptideIdsCutoffs({ 
					projectSearchId : projectSearchId, 
					reportedPeptideIds : reportedPeptideIdsToLoadDataFor,
					searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId_Local 
				});

				promise.then( ( { reportedPeptideId_psmReporterIonMassesList_List } ) => {
					try {
								
						//  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
						// _psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, { reportedPeptideId, Map<PsmId, { psmId, reporterIonMasses (Set) > >

						let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = this._loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
						if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
							psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
							this._loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs );
						}

						//  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
						// _psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >

						let psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = this._loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs();
						if ( ! psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs ) {
							psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = new Map();
							this._loadedDataPerProjectSearchIdHolder.set_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs( psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs );
						}


						for ( const reportedPeptideId_psmReporterIonMassesList_Entry of reportedPeptideId_psmReporterIonMassesList_List ) {

							const reportedPeptideId = reportedPeptideId_psmReporterIonMassesList_Entry.reportedPeptideId;
							const psmReporterIonMassesList = reportedPeptideId_psmReporterIonMassesList_Entry.psmReporterIonMassesList;

							let psmReporterIonMassesPerPSM_ForPsmIdMap = undefined;
							{
								let psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
								if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
									psmReporterIonMassesPerPSM_ForPsmIdMap = new Map();
									psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, { reportedPeptideId, psmReporterIonMassesPerPSM_ForPsmIdMap } );
								} else {
									psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;
								}
							}

							let psmReporterIonMassesUnique_PerReportedPeptideId : Set<number> = undefined;
							{
								let psmReporterIonMassesUnique_PerReportedPeptideId_Object = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
								if ( ! psmReporterIonMassesUnique_PerReportedPeptideId_Object ) {
									psmReporterIonMassesUnique_PerReportedPeptideId = new Set();
									psmReporterIonMassesUnique_PerReportedPeptideId_Object = { reportedPeptideId, reporterIonMasses : psmReporterIonMassesUnique_PerReportedPeptideId }
									psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.set( reportedPeptideId, psmReporterIonMassesUnique_PerReportedPeptideId_Object );
								} else {
									psmReporterIonMassesUnique_PerReportedPeptideId = psmReporterIonMassesUnique_PerReportedPeptideId_Object.reporterIonMasses;
								}
							}

							for ( const psmReporterIonMassEntry of psmReporterIonMassesList ) {
								const psmId = psmReporterIonMassEntry.psmId;
								const reporterIonMass = psmReporterIonMassEntry.reporterIonMass;

								let psmReporterIonMassesPerPSM = undefined;
								let psmReporterIonMassesPerPSM_Object = psmReporterIonMassesPerPSM_ForPsmIdMap.get( psmId );
								if ( ! psmReporterIonMassesPerPSM_Object ) {
									psmReporterIonMassesPerPSM = new Set();
									psmReporterIonMassesPerPSM_ForPsmIdMap.set( psmId, { psmId, reporterIonMasses : psmReporterIonMassesPerPSM } );
								} else {
									psmReporterIonMassesPerPSM = psmReporterIonMassesPerPSM_Object.reporterIonMasses;
								}

								psmReporterIonMassesPerPSM.add( reporterIonMass );

								psmReporterIonMassesUnique_PerReportedPeptideId.add( reporterIonMass );  // Unique at Reported Peptide Id
							}
							
							reportedPeptideIdsToLoadDataFor_AsSet.delete( reportedPeptideId );
						}

						if ( reportedPeptideIdsToLoadDataFor_AsSet.size !== 0 ) {
							console.warn("reportedPeptideIdsToLoadDataFor_AsSet not empty after processing AJAX response");
						}

						resolve();

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				promise.catch(function(reason) {
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

	////////////////////////
	/**
	 * @param retrieveForSingleSearch : boolean, true if retrieving for use with Single Search
	 * @param retrieveForMultipleSearches : boolean, true if retrieving for use with Multiple Searches
	 */
	loadDataAfterInitialOverlayShow( { 
		
		retrieveForSingleSearch, retrieveForMultipleSearches, proteinSequenceVersionId, projectSearchId, 
		// Optional
		searchDataLookupParamsRoot, reportedPeptideIds_Override 
	} :  { 
		
		retrieveForSingleSearch, retrieveForMultipleSearches, proteinSequenceVersionId, projectSearchId, 
		// Optional
		searchDataLookupParamsRoot? 
		reportedPeptideIds_Override? : Array<number>
	} ) {

		let reportedPeptideIds : Array<number> = undefined;

		if ( reportedPeptideIds_Override ) {

			//  Use parameter since populated
			reportedPeptideIds = reportedPeptideIds_Override;
		
		} else {

			//  Get Reported Peptide Ids

			const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

			reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( reportedPeptideIds === undefined || reportedPeptideIds.length === 0 ) {

				// No Reported Peptide Ids so skip
				
				return new Promise( ( resolve, reject) => {
					try {
						resolve();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
				// EARLY RETURN
			}
		}

		return new Promise( ( resolve, reject) => {
			try {
				const promises_LoadData_Array = [];

				if ( retrieveForSingleSearch ) {
					//  Called from display of Single Search

					const promise_loadReportedPeptideStringsIfNeeded = this._loadReportedPeptideStringsIfNeeded( { reportedPeptideIds, projectSearchId } );
					if ( promise_loadReportedPeptideStringsIfNeeded ) {
						promises_LoadData_Array.push( promise_loadReportedPeptideStringsIfNeeded );
					}

					//  Get Ann Type Ids for Ann Types that are to be displayed, Default or User chosen

					let searchDataLookupParams_For_Single_ProjectSearchId = undefined;


					if ( searchDataLookupParamsRoot ) {

						const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
						const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

						for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
							if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {

								searchDataLookupParams_For_Single_ProjectSearchId = paramsForProjectSearchId;
								break;
							}
						}
						if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
							const msg = "No entry in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
							console.warn( msg )
							throw Error( msg )
						}

					} else {

						searchDataLookupParams_For_Single_ProjectSearchId = 
						this._searchDetailsBlockDataMgmtProcessing.
						getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined /* , optional dataPageStateManager */ } );
					}

					//  Array of Ann Type Ids
					const reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay;

					if ( ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) || reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId.length === 0 ) {
						//  No Ann Type Ids to display Data for so Skip
						
					} else {
						const promise_loadReportedPeptideAnnotationDataIfNeeded = this._loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId, projectSearchId } );
						if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
							promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
						}
					}
				}

				if ( retrieveForMultipleSearches ) {
					//  Called from display of Multiple Searches

					const promise_loadPeptideIdsIfNeeded = loadPeptideIdsIfNeeded( { reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder } );
					if ( promise_loadPeptideIdsIfNeeded ) {
						promises_LoadData_Array.push( promise_loadPeptideIdsIfNeeded );
					}
				}

				if ( promises_LoadData_Array.length !== 0 ) {

					const promisesAll = Promise.all( promises_LoadData_Array );

					promisesAll.catch( (reason) => {
						reject( reason );
					})

					promisesAll.then( (value) => {
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
	 * 
	 * @param reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param - Optional.  If not passed, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId retrieved from this._searchDetailsBlockDataMgmtProcessing
	 *             value: { reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId }
	 */
	loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch( { reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param, projectSearchId } ) {

		return new Promise( ( resolve, reject) => {
			try {
				const promises_LoadData_Array = [];

				const promise_loadReportedPeptideStringsIfNeeded = this._loadReportedPeptideStringsIfNeeded( { reportedPeptideIds, projectSearchId } );
				if ( promise_loadReportedPeptideStringsIfNeeded ) {
					promises_LoadData_Array.push( promise_loadReportedPeptideStringsIfNeeded );
				}
		
				//  Get Ann Type Ids for Ann Types that are to be displayed, Default or User chosen

				let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = undefined;

				if ( reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param ) {

					//  Get reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId from function param reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param

					reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param.reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId;
				
				} else if ( this._searchDetailsBlockDataMgmtProcessing ) {

					//  Get reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId from this._searchDetailsBlockDataMgmtProcessing...

					const searchDataLookupParams_For_Single_ProjectSearchId = (
						this._searchDetailsBlockDataMgmtProcessing.
						getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined /* , optional dataPageStateManager */ } )
					);

					//  Array of Ann Type Ids
					reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay;
					
				} else {
					const msg = "ERROR: loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...): Neither is populated reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param or this._searchDetailsBlockDataMgmtProcessing";
					console.warn( msg );
					throw Error( msg );
				}

				if ( ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) || reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId.length === 0 ) {
					//  No Ann Type Ids to display Data for so Skip
					
				} else {
					const promise_loadReportedPeptideAnnotationDataIfNeeded = this._loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId, projectSearchId } );
					if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
						promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
					}
				}

				if ( promises_LoadData_Array.length !== 0 ) {

					const promisesAll = Promise.all( promises_LoadData_Array );

					promisesAll.catch( (reason) => {
						try {
							reject( reason );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})

					promisesAll.then( (value) => {
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
	 * 
	 * This can be (but not likely) called multiple times for the same search due to where it is currently called from.
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

		const staticModsForSearch: {
			residue: string;
			mass: number;
		}[] = this._loadedDataPerProjectSearchIdHolder.get_staticMods();

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
	_loadReportedPeptideAnnotationDataIfNeeded( { reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId, projectSearchId } ) {

		const objectThis = this;

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  Get Annotation Types

		const annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();
		if ( ( ! annotationTypeData_Root ) ) {
			throw Error("No annotation type data loaded." );
		}

		const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		//  Objects: Keys are Annotation Type Id.  Properties: defaultVisible, 1
		const reportedPeptideFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		const reportedPeptideDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;

		// Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId =
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();

		// Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId =
			this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();

		const promiseAll_Array = [];

		{
			//  Process Reported Peptide Filterable Annotation Types

			// { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
			const dataToLoad =
				this._getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading( 
						{ reportedPeptideIds : reportedPeptideIds,
							reportedPeptideAnnTypeIdsDisplay: reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId,
							annotationTypes_Map : reportedPeptideFilterableAnnotationTypes_Map, 
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
							reportedPeptideAnnTypeIdsDisplay: reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId,
							annotationTypes_Map : reportedPeptideDescriptiveAnnotationTypes_Map, 
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
	_getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading( { 
		
		reportedPeptideIds, 
		reportedPeptideAnnTypeIdsDisplay, 
		annotationTypes_Map, 
		reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId 
	} : { 
		reportedPeptideIds, 
		reportedPeptideAnnTypeIdsDisplay, 
		annotationTypes_Map : Map<number, AnnotationTypeItem> 
		reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId 
	} ) {

		

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

			//  Can remove this check when add type to reportedPeptideAnnTypeIdsDisplay
			if ( ! variable_is_type_number_Check( annTypeIdDisplay ) ) {
				const msg = "annTypeIdDisplay from reportedPeptideAnnTypeIdsDisplay it not a number type variable.  annTypeIdDisplay: " + annTypeIdDisplay;
				console.warn( msg );
				throw Error( msg );
			}
			const annotationType = annotationTypes_Map.get( annTypeIdDisplay );
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

//////////////


///  Code not in ANY Class


/**
 * Also called direct from outside
 */
export const loadPeptideIdsIfNeeded = function( { reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder } : { 
	
	reportedPeptideIds : Array<number>, 
	projectSearchId : number 
	loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
} ) : Promise<any> {

	const reportedPeptideIdsToLoadPeptideIdsFor = [];
	{
		for ( const reportedPeptideId of reportedPeptideIds ) {

			if ( loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } ) === undefined ) {
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
						throw Error("loadPeptideIdsIfNeeded(...) response 'foundAllReportedPeptideIdsForProjectSearchId' is false");
					}

					for ( const peptideIdReportedPeptideIdMappingEntry of peptideIdReportedPeptideIdMappingList ) {

						loadedDataPerProjectSearchIdHolder.add_peptideIdForReportedPeptide_KeyReportedPeptideId({ 
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