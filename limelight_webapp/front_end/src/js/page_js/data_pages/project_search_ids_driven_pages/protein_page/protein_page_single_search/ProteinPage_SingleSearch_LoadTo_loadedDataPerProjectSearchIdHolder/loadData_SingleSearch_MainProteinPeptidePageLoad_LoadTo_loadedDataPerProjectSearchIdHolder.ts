/**
 * loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Javascript for proteinView.jsp page - Get data from Server and Process/Reformat it before storing it
 *
 * Companion file to proteinViewPage_DisplayData_SingleSearch.ts
 *
 * !!!  Also used for Peptide page with parameter forPeptidePage set  !!!
 *
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId } from '../../protein_page_common/proteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId';
import { SearchDataLookupParams_For_Single_ProjectSearchId } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import { get_DynamicModificationsForReportedPeptideIds } from '../../protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides';
import {loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_ReporterIonsUnique_ForSearch_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_ReporterIonsUnique_ForSearch_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_ReportedPeptideIds_ForSearch_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_ReportedPeptideIds_ForSearch_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_NumPsms_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_NumPsms_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_ProteinData_Including_ProteinSequenceVersionIds_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_ProteinData_Including_ProteinSequenceVersionIds_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_NumPsms_By_SearchSubGroup_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_NumPsms_By_SearchSubGroups_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {load_subGroupIdMap_Key_PsmId_KeyReportedPeptideId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_subGroupIdMap_Key_PsmId_KeyReportedPeptideId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";


/**
 * Get Data from Server for Single Project Search Id and Cutoffs/Filters
 */
export const loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder = function (
	{
		projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, load_searchSubGroupsData, forPeptidePage, loadedDataPerProjectSearchIdHolder
	} : {

		projectSearchId : number
		searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
		load_searchSubGroupsData : boolean
		forPeptidePage?  : boolean
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

	} ) : Promise<unknown> {

	//  Outer Promise for getting data from server for projectSearchId

	return new Promise<void>( (resolve, reject) => {
		try {
			//  First get Reported Peptide Ids for current cutoffs/filters

			const promise_getReportedPeptideIdList = load_ReportedPeptideIds_ForSearch_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
				projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId
			} )

			promise_getReportedPeptideIdList.catch( (reason) => {
				try {
					reject(reason);
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			//  Get all the data based on the getReportedPeptideIdList(...) result

			const promise_get_Data_From_ReportedPeptideIdList = promise_getReportedPeptideIdList.then( ( reportedPeptideCoreDataArray ) => {
				try {
					const promiseAllArray = [];

					//  Static Mods - Arbitrarily put here - Not used on Protein List Page
					if ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() ) {
						//  No static mods so load them
						const promise = load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
							projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
						} );
						promiseAllArray.push( promise );
					}

					//  Unique Reporter Ion Masses for the Search - Arbitrarily put here - Not used on Protein List Page
					if ( ! loadedDataPerProjectSearchIdHolder.get_reporterIonMasses_ForSearch() ) {
						//  No Unique Reporter Ion Masses for the Search so load them
						const promise = load_ReporterIonsUnique_ForSearch_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
							projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
						} );
						promiseAllArray.push( promise );
					}

					//   Peptide Page Only
					if ( forPeptidePage ) {

						const reportedPeptideIds = [];
						for ( const reportedPeptideCoreDataEntry of ( reportedPeptideCoreDataArray as any ) ) {
							const reportedPeptideId = reportedPeptideCoreDataEntry.reportedPeptideId;
							reportedPeptideIds.push( reportedPeptideId );
						}
						const promise_get__ = get_DynamicModificationsForReportedPeptideIds({ loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds });

						if ( promise_get__ ) { //  May return null so test before add to array
							promiseAllArray.push( promise_get__ );
						}
					}

					_processReportedPeptideId_AndData_ListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray, loadedDataPerProjectSearchIdHolder } );

					if ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {

						// Get number of PSMs per Reported Peptide Id

						const promise =
							load_NumPsms_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
								projectSearchId,
								reportedPeptideIds : loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(),
								searchDataLookupParams_For_Single_ProjectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
							} );

						promiseAllArray.push( promise );
					}

					if ( load_searchSubGroupsData && loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length > 0 ) {
						if ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map() ) {
							const promise =
								load_NumPsms_By_SearchSubGroup_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
									projectSearchId,
									reportedPeptideIds : loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(),
									searchDataLookupParams_For_Single_ProjectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
								} );

							promiseAllArray.push( promise );
						}
					}

					if ( load_searchSubGroupsData && loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length > 0 ) {
						if ( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ) {
							const promise =
								load_subGroupIdMap_Key_PsmId_KeyReportedPeptideId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
									projectSearchId,
									searchDataLookupParams_For_Single_ProjectSearchId,
									loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
								} );

							promiseAllArray.push( promise );
						}
					}

					{
						//  This first loads ProteinSequenceVersionIds for Reported Peptide Ids and then loads data based on those ProteinSequenceVersionIds
						const promise =
							load_ProteinData_Including_ProteinSequenceVersionIds_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
								projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
							});

						promiseAllArray.push( promise );
					}

					if ( ! forPeptidePage ) {

						const promise_get_ProteinCoverage_FromReportedPeptideIds =
							load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
								projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
							} );

						promiseAllArray.push( promise_get_ProteinCoverage_FromReportedPeptideIds );
					}

					return Promise.all( promiseAllArray );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			promise_get_Data_From_ReportedPeptideIdList.catch( (reason) => {
				try {
					reject(reason);
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			promise_get_Data_From_ReportedPeptideIdList.then( (value) => {
				try {
					//  'value' from Promise.all is an array of the promise values from the individual resolve() calls
					//    Since all calls to resolve() don't pass a value, in this case it is an array of elements each containing undefined

					//  Processing that requires all data to be loaded

					if ( ! forPeptidePage ) {

						//  Take proteinSequenceCoverage Per Reported Peptide Ids and create proteinSequenceCoverage Per proteinSequenceVersionId
						_proteinSequenceCoverage_MapPer_proteinSequenceVersionId({ loadedDataPerProjectSearchIdHolder });
					}
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

// /**
//  * Get All Reported Peptide Data For Building Protein Display from Reported Peptide Ids
//  *
//  * Get Reported Peptide Filterable Annotation data For Current Filter
//  */
// const _get_ReportedPeptideFilterableAnnTypeDataForCurrentFilter = function (
// 	{
// 		projectSearchId,
// 		filtersAnnTypeDisplay_For_ProjectSearchId,
// 		loadedDataPerProjectSearchIdHolder
// 	} : {
// 		projectSearchId
// 		filtersAnnTypeDisplay_For_ProjectSearchId
// 		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
//
// 	}) : Promise<unknown> {
//
// 	if ( ( ! filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) ||
// 		( filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters.length === 0 ) ) {
//
// 		//  No reportedPeptideFilters to get data for
//
// 		// console.log("No reported Peptide Cutoffs");
//
// 		return null;     // EARLY EXIT
// 	}
//
// 	if ( ! loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ||
// 		loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds().length === 0 ) {
//
// 		//  No Reported Peptide Ids
//
// 		// console.log("No Reported Peptide Ids");
//
// 		return null;     // EARLY EXIT
// 	}
//
// 	const annTypeIds = [];
// 	for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
// 		annTypeIds.push( filterEntry.annTypeId );
// 	}
//
// 	if ( annTypeIds.length === 0 ) {
//
// 		//  No Ann Type Ids
//
// 		// console.log("No Reported Peptide Ids");
//
// 		return null;     // EARLY EXIT
// 	}
//
// 	return loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
// 		reportedPeptideIds : loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds(),
// 		annTypeIds, projectSearchId,
// 		loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
// 	})
// }

/**
 * Populate loadedData with data from dataFromServer.
 *
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds( )
 *  Set (if available):  loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap() : Map of num PSMs : Key ReportedPeptideId
 */
const _processReportedPeptideId_AndData_ListFromServer_Populate_loadedData = function (
	{
		reportedPeptideCoreDataArray,
		loadedDataPerProjectSearchIdHolder
	} : {
		reportedPeptideCoreDataArray: any
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	} ) {

	//  Each entry in reportedPeptideCoreDataArray is an object with properties reportedPeptideId and numPsms_IfComputedOrInDB

	//             numPsms_IfComputedOrInDB is only populated for some criteria (Default Cutoffs).  Otherwise, it is null.

	//  Extract the reportedPeptideIds into an array and if populated put the numPsms in a Map on loadedData

	// console.log("_processPeptideIdListFromServer_Populate_loadedData( { reportedPeptideCoreDataArray } ) reportedPeptideCoreDataArray:");
	// console.log( reportedPeptideCoreDataArray );

	const reportedPeptideIds = [];
	const numPsmsForReportedPeptideIdMap = new Map();
	const reportedPeptideIds_HasDynamicModifications = new Set();
	const reportedPeptideIds_AnyPsmHas_DynamicModifications = new Set();
	const reportedPeptideIds_AnyPsmHas_OpenModifications = new Set();
	const reportedPeptideIds_AnyPsmHas_ReporterIons = new Set();

	let allSet_numPsmsForReportedPeptideIdMap = true;

	for ( const reportedPeptideCoreDataEntry of reportedPeptideCoreDataArray ) {

		const reportedPeptideId = reportedPeptideCoreDataEntry.reportedPeptideId;
		const numPsms_IfComputedOrInDB = reportedPeptideCoreDataEntry.numPsms_IfComputedOrInDB;
		const reportedPeptideHas_DynamicModifications = reportedPeptideCoreDataEntry.reportedPeptideHas_DynamicModifications;
		const anyPsmHas_DynamicModifications = reportedPeptideCoreDataEntry.anyPsmHas_DynamicModifications;
		const anyPsmHas_OpenModifications = reportedPeptideCoreDataEntry.anyPsmHas_OpenModifications;
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
		if ( anyPsmHas_OpenModifications ) {
			reportedPeptideIds_AnyPsmHas_OpenModifications.add( reportedPeptideId );
		}
		if ( anyPsmHas_ReporterIons ) {
			reportedPeptideIds_AnyPsmHas_ReporterIons.add( reportedPeptideId );
		}
	}

	loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds( reportedPeptideIds );
	if ( allSet_numPsmsForReportedPeptideIdMap ) {
		loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap( numPsmsForReportedPeptideIdMap );
	}
	//  Reported Peptides for Current Cutoffs/Filters that contain Reported Peptide Level Dynamic Modifications
	loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_HasDynamicModifications( reportedPeptideIds_HasDynamicModifications );
	//  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Dynamic Modifications
	loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_AnyPsmHas_DynamicModifications( reportedPeptideIds_AnyPsmHas_DynamicModifications );
	//  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Open Modifications
	loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_AnyPsmHas_OpenModifications( reportedPeptideIds_AnyPsmHas_OpenModifications );
	//  Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Reporter Ions
	loadedDataPerProjectSearchIdHolder.set_reportedPeptideIds_AnyPsmHas_ReporterIons( reportedPeptideIds_AnyPsmHas_ReporterIons );
}

/**
 * Map the protein sequence coverage to be per proteinSequenceVersionId
 */
const _proteinSequenceCoverage_MapPer_proteinSequenceVersionId = function (
	{
		loadedDataPerProjectSearchIdHolder
	} : {
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

	}) : void {

	//  Use current array of reportedPeptideIds
	const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

	const proteinCoverage_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId();

	const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();

	const coveragePer_ProteinSequenceVersionId =
		ProteinView_compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId.
		compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId(
			{ reportedPeptideIds, proteinCoverage_KeyReportedPeptideId, proteinInfoMapKeyProteinSequenceVersionId } );

	const proteinCoverage_KeyProteinSequenceVersionId = coveragePer_ProteinSequenceVersionId.proteinCoverage_KeyProteinSequenceVersionId;

	loadedDataPerProjectSearchIdHolder.set_proteinCoverage_KeyProteinSequenceVersionId( proteinCoverage_KeyProteinSequenceVersionId );
}

