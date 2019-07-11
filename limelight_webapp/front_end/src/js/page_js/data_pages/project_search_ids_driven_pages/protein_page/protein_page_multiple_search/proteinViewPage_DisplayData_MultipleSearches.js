/**
 * proteinViewPage_DisplayData_MultipleSearches.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Multiple Searches
 * 
 * 
 * 
 * 
 * 
 */


let Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

let _protein_table_template_bundle = 
	require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { ProteinView_LoadedDataCommonHolder } from '../protein_page_common/proteinView_LoadedDataCommonHolder.js';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder.js';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from '../protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.js';

import { ProteinViewPage_Display_MultipleSearches_SingleProtein } from './proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js';

import { SingleProtein_CentralStateManagerObjectClass }
	from '../protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.js';

	
	//  Applied to the element containing the protein name so it can be selected
const _CSS_CLASS_SELECTOR_PROTEIN_NAME = "selector_protein_name";
	
/**
 * 
 */
export class ProteinViewPage_Display_MultipleSearches {

	/**
	 * 
	 */
	constructor( {
		dataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_OtherUserSelections,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		singleProtein_CentralStateManagerObject
	}) {

		//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
		
		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_MultipleSearches_SingleProtein
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

		
		// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is shared with this._proteinViewPage_Display_SingleProtein_...

		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );

		this._proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinViewPage_Display_MultipleSearches_SingleProtein( {
			proteinViewPage_Display_MultipleSearch : this,
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections,
			dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject
		} );

		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
		//  From Protein Template:
		
		if ( ! _protein_table_template_bundle.protein_page_protein_tooltip ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_protein_tooltip");
		}
		
		this._protein_page_protein_tooltip_Template = 
			_protein_table_template_bundle.protein_page_protein_tooltip;
			
		
		//   projectSearchId being processed.  Reset All data if receive different projectSearchId
		this._projectSearchIs = undefined;
		
		//   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescription_Key_ProteinSequenceVersionId = undefined;
		
		//   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = undefined;

		//   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
		this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = undefined;
	}
	
	/**
	 * Create New loadedDataPerProjectSearchIdHolder 
	 */
	_create_loadedDataPerProjectSearchIdHolder() {

		const loadedDataPerProjectSearchIdHolder =  new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
		return loadedDataPerProjectSearchIdHolder;
	}

	/**
	 * Get loadedDataPerProjectSearchIdHolder from this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId
	 * Add to this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds if not exist
	 */
	_get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId ) {

		let loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
		if ( ! loadedDataPerProjectSearchIdHolder ) {
			loadedDataPerProjectSearchIdHolder = this._create_loadedDataPerProjectSearchIdHolder();
			this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );
		}
		return loadedDataPerProjectSearchIdHolder;
	}

	/**
	 * Populate Protein List On Page For Multiple Project Search Ids
	 */
	populateProteinList( { projectSearchIds } ) {

		let objectThis = this;

		{
			const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

			if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {
				//  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

				//  Hide Main Div inside of header/footer
				const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
				$data_page_overall_enclosing_block_div.hide();
			}
		}

		//   Clear: Protein Name and Description in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescription_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
		this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();


		//  TODO  Recode this for Multiple Project Search Ids

		// Blunt approach
		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.clear(); // = new Map();

		// if ( this._projectSearchId !== projectSearchId ) {

		// 	//  Clear all retained Data
		// 	this._loadedDataPerProjectSearchIdHolder.clearAllData();
		// }

		this._projectSearchIds = projectSearchIds;  // Save projectSearchIds
		
		//  for just changes to cutoff filters
		// this._loadedDataPerProjectSearchIdHolder.clearForNewCutoffsOrDisplayedData()
		
		//   TODO  Maybe don't need to call this, only clearForNewCutoffsOrDisplayedData()
		
		//  Clear all retained Data
		// this._loadedDataPerProjectSearchIdHolder.clearAllData();
		
		
		let $protein_table_loading_text = $("#protein_table_loading_text");
		if ( $protein_table_loading_text.length === 0 ) {
			throw Error("No element found with id 'protein_table_loading_text'");
		}
		
		let protein_table_loading_text = $protein_table_loading_text.html();

		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}
		
		$protein_list_container.empty();
		$protein_list_container.html( protein_table_loading_text );
		
		$("#protein_list_size").empty();

		const getDataFromServer_AllPromises = [];

		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
			this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder )
			
			this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
				new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
					loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
					searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
				});

			const promise_getDataFromServer = this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.getDataFromServer( { projectSearchId } );

			getDataFromServer_AllPromises.push( promise_getDataFromServer );
		}

		const promise_getDataFromServer_AllPromises = Promise.all( getDataFromServer_AllPromises );

		promise_getDataFromServer_AllPromises.catch((reason) => {});

		promise_getDataFromServer_AllPromises.then((value) => {
			try {
				objectThis._displayProteinListOnPage( { projectSearchIds } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
		  }
		})
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * 
	 */
	_displayProteinListOnPage( { projectSearchIds } ) {

		const objectThis = this;
		
		const proteinDisplayData = this._createProteinDisplayData( { projectSearchIds } );
		
		const renderToPageProteinList_Result = this._renderToPageProteinList( { projectSearchIds, proteinDisplayData } );

		const proteinListLength = renderToPageProteinList_Result.proteinListLength;

		{
			const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

			if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {
				//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
				this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId : proteinSequenceVersionId_FromURL } ) ;
			}
		}

		if ( proteinListLength === 0 ) {

			const $protein_download_proteins = $("#protein_download_proteins");
			$protein_download_proteins.hide();

		} else {

			if ( ! this._downloadProteinsClickHandlerAttached ) {
		
				//  Download Proteins container and link.  The version for multiple project search id

				//  Show and attach click handler here since now have the data loaded for downloading
			
				const $protein_download_proteins = $("#protein_download_proteins");

				//  First remove any previous click handler
				$protein_download_proteins.off("click");
				
				$protein_download_proteins.show();

				$protein_download_proteins.click( function(eventObject) {
					try {
						eventObject.preventDefault();

						objectThis._downloadProteinList();

					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
						throw e;
					}
				});

				this._downloadProteinsClickHandlerAttached = true;
			}
		}
	};
	
	/////////////

	/**
	 * Create Protein Data for Display
	 * 
	 * Return:
	 * Protein List
	 * Number of Proteins
	 * Number of Reported Peptides Total
	 * Number of PSMs total
	 */
	_createProteinDisplayData( { projectSearchIds } ) {
		

		//  Validate loadedDataPerProjectSearchIdHolder populated for all projectSearchIds
		for ( const projectSearchId of projectSearchIds ) {
			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId ); // Must have loadedDataPerProjectSearchIdHolder populated
			}
		}

		//  Validate num PSMs populated for all projectSearchIds
		for ( const projectSearchId of projectSearchIds ) {
			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {
				throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated for projectSearchId: " + projectSearchId ); // Must have num PSMs populated
			}
		}

		const loadedDataCommonHolder = this._loadedDataCommonHolder;

		//  Map<proteinSequenceVersionId,Map<projectSearchId,ProteinDataForSingleProjectSearchIdSingleProteinSequenceVersionId>>
		const proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId = new Map();


		//  TODO  Currently not used

		//  Get Totals for All Searches: Search Values: Reported Peptide Count and PSM Count

		// let reportedPeptideCount_TotalForSearch_AllSearches = 0;
		// let psmCount_TotalForSearch_AllSearches = 0;		
		//  Track reported peptide ids to skip ones already processed under other proteins
		// const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch_AllSearches = new Set();
		

		
		//  Process for all projectSearchIds
		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId ); // Must have loadedDataPerProjectSearchIdHolder populated
			}

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
			
			//  Used to determine if a reported peptide is unique (maps to only 1 protein)
			const proteinSequenceVersionIdsPerReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();
			
			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
			
			//  Use proteinSequenceVersionIdsArray since it has the proteinSequenceVersionIds for the current Reported Peptide Ids for the current cutoffs/filters
			const proteinSequenceVersionIdsArray = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();


			//  Get Totals for Search Values: Reported Peptide Count and PSM Count

			let reportedPeptideCount_TotalForSearch = 0;
			let psmCount_TotalForSearch = 0;		
			//  Track reported peptide ids to skip ones already processed under other proteins
			const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch = new Set();
			

			for ( let proteinSequenceVersionId of proteinSequenceVersionIdsArray ) {

				let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
				if ( proteinInfo === undefined ) {
					throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
				}

				const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
				if ( proteinCoverageObject === undefined ) {
					throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
				}
				const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();

				//  output Protein Item for this projectSearchId
				
				let proteinItemForProjectSearch = { proteinSequenceVersionId : proteinSequenceVersionId };
				
				proteinItemForProjectSearch.proteinInfo = proteinInfo;
				
				let numReportedPeptides = 0;
				let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
				let numPsms = 0;
				
				//  reportedPeptideIds for proteinSequenceVersionId
				let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( proteinSequenceVersionId );
			
				for ( let reportedPeptideId of reportedPeptideIds ) {

					let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get( reportedPeptideId );
									
					if ( numberOfPSMsForReportedPeptide === undefined || numberOfPSMsForReportedPeptide === null ) {
						throw Error( "number of PSMs Not Found for reportedPeptideId: " + reportedPeptideId );
					}

					numReportedPeptides++;
					numPsms += numberOfPSMsForReportedPeptide;
					
					if ( ! reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.has( reportedPeptideId ) ) {
						//  For totals for whole search
						//  Not processed this reported peptide id yet so do so now
						reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.add( reportedPeptideId );
						reportedPeptideCount_TotalForSearch++;
						psmCount_TotalForSearch += numberOfPSMsForReportedPeptide;
					}
					
					//  Is this Reported Peptide Unique?
					// proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
					const proteinSequenceVersionIds = proteinSequenceVersionIdsPerReportedPeptideId.get( reportedPeptideId );
					if ( ! proteinSequenceVersionIds ) {
						throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
					}
					if ( proteinSequenceVersionIds.length === 1 ) {
						numReportedPeptidesUnique++
					}
				}
				
				//  Stored computed values per proteinSequenceVersionId
				const countsFor_proteinSequenceVersionId = {
						numReportedPeptides,
						numReportedPeptidesUnique,
						numPsms
				}
				this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, countsFor_proteinSequenceVersionId );

				
				proteinItemForProjectSearch.numPsms = numPsms;
				proteinItemForProjectSearch.numReportedPeptides = numReportedPeptides;
				proteinItemForProjectSearch.numReportedPeptidesUnique = numReportedPeptidesUnique;
				
				proteinItemForProjectSearch.reportedPeptideIds = reportedPeptideIds;
				
				//  Insert Map Entry proteinItemForProjectSearch

				let proteinItemRecordsMap_Key_projectSearchId = proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.get( proteinSequenceVersionId );
				if ( ! proteinItemRecordsMap_Key_projectSearchId ) {
					proteinItemRecordsMap_Key_projectSearchId = new Map();
					proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, proteinItemRecordsMap_Key_projectSearchId );
				}
				const outputRecordsMap_Entry = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );
				if ( outputRecordsMap_Entry ) {
					throw Error("Already have entry in proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
				}

				proteinItemRecordsMap_Key_projectSearchId.set( projectSearchId, proteinItemForProjectSearch );

			}
		}

		//  Build output array from Map of Maps

		let proteinResultListResult = [];

		for ( const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.entries() ) {

			let psmCountForThis_proteinSequenceVersionId = 0;

			//  So add only once to result
			const proteinNamesUniqueSet = new Set();
			const proteinDescriptionsUniqueSet = new Set();

			//  To combine with "," separator
			const proteinNamesArray = [];
			const proteinDescriptionsArray = [];

			const proteinNamesAndDescriptionsArray = [];  // For Tooltip

			const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 0 ];
			const proteinItemRecordsMap_Key_projectSearchId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 1 ];

			for ( const projectSearchId of projectSearchIds ) {
				const proteinItem = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

				if ( ! proteinItem ) {
					//  No protein item for this project search id
					continue;
				}

				psmCountForThis_proteinSequenceVersionId += proteinItem.numPsms;

				//  Get Protein Names and Descriptions

				let foundProteinName = false;

				const proteinInfo = proteinItem.proteinInfo;
				if ( ! proteinInfo ) {
					throw Error("No proteinInfo property for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
				}
				const annotations = proteinInfo.annotations;
				if ( annotations ) {
					foundProteinName = true;
					for ( const annotation of annotations ) {
						const name = annotation.name;
						const description = annotation.description;
						const taxonomy = annotation.taxonomy;
						if ( ! proteinNamesUniqueSet.has( name ) ) {
							proteinNamesUniqueSet.add( name );
							proteinNamesArray.push( name );
						}
						if ( description ) {
							if ( ! proteinDescriptionsUniqueSet.has( description ) ) {
								proteinDescriptionsUniqueSet.add( description );
								proteinDescriptionsArray.push( description );
							}
						}
						{ // For Tooltip, matches Tooltip template
							const proteinNamesAndDescriptionsNewEntry = {
								name : name,
								description : description
							};
							//  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
							let nameDescriptionComboFoundInArray = false;
							for ( const entry of proteinNamesAndDescriptionsArray ) {
								if ( entry.name === proteinNamesAndDescriptionsNewEntry.name && entry.description === proteinNamesAndDescriptionsNewEntry.description ) {
									nameDescriptionComboFoundInArray = true;
									break;
								}
							}
							if ( ! nameDescriptionComboFoundInArray ) {
								proteinNamesAndDescriptionsArray.push( proteinNamesAndDescriptionsNewEntry );
							}
						}
					}
				}

				if ( ! foundProteinName ) {
					throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
				}

			}

			const proteinNamesString = proteinNamesArray.join(",");
			const proteinDescriptionsString = proteinDescriptionsArray.join(",");

			const proteinNameDescriptionEntry = { proteinSequenceVersionId, name : proteinNamesString, description : proteinDescriptionsString };
			this._proteinNameDescription_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNameDescriptionEntry );

			//   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
			this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );

			const proteinResultEntry = {
				proteinSequenceVersionId,
				numPsms : psmCountForThis_proteinSequenceVersionId, //  numPsms to be consistent with single search code
				proteinNames : proteinNamesString,
				proteinDescriptions : proteinDescriptionsString,
				proteinItemRecordsMap_Key_projectSearchId
			};

			proteinResultListResult.push( proteinResultEntry );
		}

		this._sortProteinList( { proteinList : proteinResultListResult } );

		return { proteinList : proteinResultListResult };
	}

	//   Maybe not valid sort since not displaying the sorted on number of numPsms (Total across searches)

	/**
	 * 
	 */
	_sortProteinList( { proteinList } ) {

		//   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

		proteinList.sort( function( a, b ) {

			// PSM Count (numPsms) Descending so reverse comparisons '>' '<'

			if ( a.numPsms > b.numPsms ) {
				return -1;
			}
			if ( a.numPsms < b.numPsms ) {
				return 1;
			}

			if ( a.proteinNames < b.proteinNames ) {
				return -1;
			}
			if ( a.proteinNames > b.proteinNames ) {
				return 1;
			}

			//  All others match so order on proteinSequenceVersionId
			if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
				return -1;
			}
			if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
				return 1;
			}
			return 0;

		});
	}

	///////////////////////////////////////
	
	/**
	 * 
	 */
	_renderToPageProteinList( { projectSearchIds, proteinDisplayData } ) {
		
		let objectThis = this;
		
		console.log("Rendering Protein List START, Now: " + new Date() );
		
		const proteinList = proteinDisplayData.proteinList;
		const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder;

		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}
		
		let proteinListLength = 0;
		if (proteinList && proteinList.length > 0) {
			proteinListLength = proteinList.length;
		}

		const proteinCount = proteinListLength.toLocaleString();
		// const reportedPeptideCount_TotalForSearch_Display = proteinDisplayData.reportedPeptideCount_TotalForSearch.toLocaleString();
		// const psmCount_TotalForSearch_Display = proteinDisplayData.psmCount_TotalForSearch.toLocaleString();

		$("#protein_list_size").text( proteinCount );
		// $("#reported_peptide_count_display").text( reportedPeptideCount_TotalForSearch_Display );
		// $("#psm_count_display").text( psmCount_TotalForSearch_Display );
		
		$protein_list_container.empty();

		this.currentProteinListDisplayTableData = undefined;

		if (proteinList && proteinList.length > 0) {

			// Build $proteinDataTable detached from DOM while adding to it.  
			//   That way browser rendering engine only has to do single render after after all elements added. 
			
			let proteinDataTablecontext = { };
			
		//   Protein List of objects with properties for Data Table
			const proteinList_ForDataTable = this._createProteinList_ForDataTable( { proteinList, projectSearchIds } );

			//  Create Data Table and insert on page

			const tableDisplayHandler = new TableDisplayHandler();

			// the columns for the data being shown on the page
			const columns = this._getProteinDataTableColumns( { projectSearchIds } );

			// the data we're showing on the page
			const tableObjects = proteinList_ForDataTable;

			//  Save off currently displayed table data
			this.currentProteinListDisplayTableData = { columns, tableObjects };


			tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

			// add the table to the page

			const tableObject = { };
			tableObject.columns = columns;
			tableObject.dataObjects = tableObjects;
			tableObject.expandableRows = false;

			const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
			const $tableContainerDiv = $( dataTableContainer_HTML );
			$protein_list_container.append( $tableContainerDiv );

			// add in the click handlers for sorting the table
			tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

			tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );

			//  Attach click and tooltip to data table
			
			//  element in table with class '$selector_table_rows_container' is the data rows
			
			const $selector_table_rows_container = $tableContainerDiv.find(".selector_table_rows_container");
			if ( $selector_table_rows_container.length === 0 ) {
				throw Error( "Failed to find element with class 'selector_table_rows_container' in $tableContainerDiv" );
			}
			
			this._addClickHandlersAndTooltips_ToDataTable( { $selector_table_rows_container } );
			
		} else {

//			let noDataMsg = $("#protein_entry_no_data_template_div").html();

//			$protein_list.html(noDataMsg);
		}

		console.log("Rendering Protein List END, Now: " + new Date() );
		
		return { proteinListLength };
	};

	/**
	 * Create object 
	 */
	_createProteinList_ForDataTable( { proteinList, projectSearchIds } ) {

		const proteinList_ForDataTable = [];
		
		for ( const proteinListItem of proteinList ) {
			
			proteinList_ForDataTable.push( this._createProteinItem_DataTableEntry( { proteinListItem, projectSearchIds } ) );
		}
		return proteinList_ForDataTable;
	}


	/**
	 * Create object 
	 */
	_createProteinItem_DataTableEntry( { proteinListItem, projectSearchIds } ) {

		const proteinItemRecordsMap_Key_projectSearchId = proteinListItem.proteinItemRecordsMap_Key_projectSearchId;

		const context = 
		{ uniqueId : proteinListItem.proteinSequenceVersionId, // Set for Data Table to identify the entry in the table
				proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId,
				proteinName : proteinListItem.proteinNames,
				proteinDescription : proteinListItem.proteinDescriptions
		};

		for ( const  projectSearchId of projectSearchIds ) {
			const proteinItemRecord = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

			const contextLabel = 'numPsms_' + projectSearchId;

			if ( ! proteinItemRecord ) {
				// No record for this project search id
				context[ contextLabel ] = 0;
				continue;
			}
			context[ contextLabel ] = proteinItemRecord.numPsms;
		}

		return context;
	}

	/**
	 * Create Table Columns 
	 */
	_getProteinDataTableColumns( { projectSearchIds } ) {

		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );


		let columns = [ ];

		{
			let column = {
				id :           'proteins',
				width :        '350px',
				displayName :  'Protein(s)',
				dataProperty : 'proteinName', 
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
                css_class : ' clickable ' + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
			};

			columns.push( column );
		}
		
		{
			let column = {
				id :           'protein_descriptions',
				width :        '200px',
				displayName :  'Protein Descripton(s)',
				dataProperty : 'proteinDescription', 
                sort : 'string',
                style_override : 'white-space:nowrap;overflow:hidden;text-overflow: ellipsis;font-size:12px;',   //prevent line breaks and scroll if too long
                css_class : ' clickable ' + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
			};

			columns.push( column );
        }

		for ( const projectSearchId of projectSearchIds ) {
			
			const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
			}
			
			let column = {
				id :           'psms_' + projectSearchId,
				width :        '80px',
				displayName :  'PSMs (' + searchNameObject.searchId + ")" ,
				dataProperty : 'numPsms_' + projectSearchId, // 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
                css_class : ' clickable ' 
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    };
    
	//////////////////////////////////////
	//////////////////////////////////////
	//////////////////////////////////////
    
    //     Click Handlers and Tooltips
    
	/**
	 * 
	 */
    _addClickHandlersAndTooltips_ToDataTable( { $selector_table_rows_container } ) {
    	
    	this._addTooltipForProteinName( { $selector_table_rows_container } );
    	
    	this._addClickHandler_ToDataTable_OpenSingleProtein( { $selector_table_rows_container } );
    }
    
	/**
	 * 
	 */
    _addClickHandler_ToDataTable_OpenSingleProtein( { $selector_table_rows_container } ) {

		const objectThis = this;
		
		$selector_table_rows_container.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._singleProteinRowClickHandler( { clickThis : this, eventObject } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
    }
	
	/**
	 * 
	 */
    _singleProteinRowClickHandler( { clickThis, eventObject } ) {
		
		const $target = $( eventObject.target );
//		
//		const proteinSequenceVersionIdString = $target.attr( "data-row-id" );  // Does not work for bar in table row, would be some parent DOM element
		
    	const RowUniqueIdProbablyInt = new TableDisplayHandler().getRowUniqueIdForDOMElement( { domElement : eventObject.target } );
		
		if ( RowUniqueIdProbablyInt === undefined ) {
			//  No value so exit
			return;
		}
		
		const proteinSequenceVersionId = Number.parseInt( RowUniqueIdProbablyInt, 10 );
		if ( Number.isNaN( proteinSequenceVersionId ) ) {
			throw Error( "Row Unique Id is not integer.  value: " + RowUniqueIdProbablyInt );
		}

		if ( eventObject.ctrlKey || eventObject.metaKey ) {

			this._singleProteinRowShowSingleProteinNewWindow( { $target, proteinSequenceVersionId } );
			return;
		}

		this._singleProtein_CentralStateManagerObject.setProteinSequenceVersionId( { proteinSequenceVersionId } );
		
		this._singleProteinRowShowSingleProteinOverlay( { $target, proteinSequenceVersionId } );
	}

	/**
	 * 
	 */
    _singleProteinRowShowSingleProteinNewWindow( { $target, proteinSequenceVersionId } ) {

		//  Create URL for new Window about to open

		//  Create to override the value of proteinSequenceVersionId from the URL
		const singleProtein_CentralStateManagerObjectClass_ForNewWindow =
			new SingleProtein_CentralStateManagerObjectClass({ initialProteinSequenceVersionId: proteinSequenceVersionId });

		const newWindowURL = this._centralPageStateManager.getURL_ForCurrentState({ componentOverridesAdditions: [ singleProtein_CentralStateManagerObjectClass_ForNewWindow ] })

		 // MUST open window before make AJAX Call.  This is a Browser Security requirement
		//  window.open(...): Must run in code directly triggered by click event

		const newWindow = window.open(newWindowURL, "_blank");
	}

	/**
	 * 
	 */
    _singleProteinRowShowSingleProteinOverlay( { $target, proteinSequenceVersionId } ) {
		
		const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinNameDescription === undefined ) {
			return "Description Not Found";
		}
		
		const proteinNameDescriptionParam = { name : proteinNameDescription.name, description : proteinNameDescription.description };
		
		if ($target) {

			if ($target.hasClass("selector_protein_name")) {
				//  Hide tooltip for protein name

				const $selector_table_rows_container = $target.closest(".selector_table_rows_container");

				if ($selector_table_rows_container.length !== 0) {
					// Grab the first element in the tooltips array and access its qTip API
					const qtipAPI = $selector_table_rows_container.qtip('api');
					if (qtipAPI) {
						qtipAPI.toggle(false);  // ensure qtip not shown
					}
				}
			}
		}

		//  Current Window Scroll position
		const currentWindowScrollY = window.scrollY;

		//  Create callback function to call on single protein close
		
		const singleProteinCloseCallback = function() {

			const proteinSequenceVersionIdLocal = proteinSequenceVersionId;

			//  Show Main Div inside of header/footer
			const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
			$data_page_overall_enclosing_block_div.show();

			if ( currentWindowScrollY ) {

				//  Scroll window down to original position when protein was clicked to open Single Protein view
				
				//  Web standard, should be supported in Edge but doesn't seem to work in Edge
				// window.scrollTo({ top : currentWindowScrollY });

				$( window ).scrollTop( currentWindowScrollY );
			}
		}

		//  Hide Main Div inside of header/footer
		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
		$data_page_overall_enclosing_block_div.hide();

		this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay( 
				{ proteinSequenceVersionId, 
					projectSearchIds : this._projectSearchIds, 
					proteinNameDescription : proteinNameDescriptionParam,
					singleProteinCloseCallback } );
	}

	
	/**
	 * 
	 */
	_addTooltipForProteinName( { $selector_table_rows_container } ) {
		
		const objectThis = this;
		
		//  qtip tooltip on whole block

		const selector_table_rows_container_Element = $selector_table_rows_container[ 0 ];

		$selector_table_rows_container.qtip({

			content: {
				text: "&nbsp;" // Replaced as mouse over each sequence letter
			},
			position: {
				effect:false,
				target: 'mouse'
					,
					adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
			},
			show: {
				delay: 1,
			},
			hide: {
				delay:0,
				effect:false,
			}
		});

		// Grab the first element in the tooltips array and access its qTip API
		const qtipAPI = $selector_table_rows_container.qtip('api');
		

		const proteinSequenceVersionIdNotAvailable = undefined;
	
		const lastProteinSequenceVersionIdObjInContainingFunction = { lastProteinSequenceVersionId : -2 };
		
		const updateTooltipOnMouseMove_BindThis = this._updateTooltipOnMouseMove.bind( this ); 

		//  Add a mouse move event handler to the protein bar overlay rectangle to update the contents of the qtip tool tip 
		$selector_table_rows_container.mousemove( function( eventObject ) {
			updateTooltipOnMouseMove_BindThis( eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable );
		} );

		const updateTooltipOnScroll_BindThis = this._updateTooltipOnScroll.bind( this );
		
		//  Add a scroll event handler to hide the tooltip on scroll
		$( window ).scroll( function( eventObject ) {
			updateTooltipOnScroll_BindThis( eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable );
		} );
		
	}

	/**
	 * 
	 */
	_updateTooltipOnScroll( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		if ( lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable ) {
			//  Already not showing tooltip so exit
			return;
		}
		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

		// User has scrolled.  Hide tooltip and clear tooltip contents.
		
		//  Update tool tip contents
		qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

		qtipAPI.toggle( false );  // ensure qtip not shown
		qtipAPI.disable( true );  // disable - must pass true to disable it
	}
	
	/**
	 * 
	 */
	_updateTooltipOnMouseMove( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		const $target = $( eventObject.target )
		
		if ( ! $target.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME ) ) {
			
			if ( lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable ) {
				//  Already not showing tooltip so exit
				return;
			}
			lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

			// Mouse is Not over a Protein Name.  Hide tooltip and clear tooltip contents.
			
			//  Update tool tip contents
			qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

			qtipAPI.toggle( false );  // ensure qtip not shown
			qtipAPI.disable( true );  // disable - must pass true to disable it
			
			return;
		}
		
		const proteinSequenceVersionIdString = $target.attr( "data-row-id" );
		const proteinSequenceVersionIdInt = Number.parseInt( proteinSequenceVersionIdString, 10 );
		if ( Number.isNaN( proteinSequenceVersionIdInt ) ) {
			throw Error( "value in attr 'data-row-id' is not integer.  value: " + proteinSequenceVersionIdString );
		}

		if( proteinSequenceVersionIdInt === lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId ) {
			
			// proteinSequenceVersionIdInt (or undefined for non protein name elements) 
			// is same as prev call to mouse move so no changes required so just exit.
			return;
		}

		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdInt;

		// Mouse is over a protein sequence name.

		const tooltipContentsHTML = this._getTooltipText( { proteinSequenceVersionIdInt } );

		//  Update tool tip contents
		qtipAPI.set('content.text', tooltipContentsHTML );

		qtipAPI.disable( false );	// enable qtip - pass false to enable
		qtipAPI.toggle( true );	    // ensure qtip visible
	}

	/**
	 * 
	 */
	_getTooltipText( { proteinSequenceVersionIdInt } ) {

		//  Only displaying the name and description uploaded with the search

		const proteinNamesAndDescriptionsArray = this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionIdInt );
		if ( proteinNamesAndDescriptionsArray === undefined ) {
			return "Name and Description Not Found";
		}
		
		const tooltipContext = { proteinNamesAndDescriptions : proteinNamesAndDescriptionsArray };
				
		const tooltipHTML = this._protein_page_protein_tooltip_Template( tooltipContext );
		
		return tooltipHTML;
	}



	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * Download Protein List
	 */
	_downloadProteinList() {

		if ( ! this.currentProteinListDisplayTableData ) {
			alert("No Data to Download");
			return; // EARLY RETURN
		}

		const proteinDisplayDataAsString = this._downloadProteinList_GenerateDownloadString();

		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );


		const searchIds = [];

		for ( const projectSearchId of this._projectSearchIds ) {
			const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
			}
			searchIds.push( searchNameObject.searchId );
		}

		const searchIdsDashDelim = searchIds.join("-");
		
		const filename = 'proteins-search-' + searchIdsDashDelim + '.txt';
		
		
        StringDownloadUtils.downloadStringAsFile( 
			{ stringToDownload : proteinDisplayDataAsString, filename: filename } );
	}

	/**
	 * Download Protein List - Generate download String
	 */
	_downloadProteinList_GenerateDownloadString() {

		//  Create String that will be dowloaded from browser

		const columns = this.currentProteinListDisplayTableData.columns;
		const tableObjects = this.currentProteinListDisplayTableData.tableObjects;

		const outputLines = [];

		{
			//  Add Header row
			const outputColumns = [];
				
			for ( const column of columns ) {
				const columnText = column.displayName;
				outputColumns.push( columnText );
			}
			const headerRow = outputColumns.join("\t");
			outputLines.push( headerRow );
		}

		if ( tableObjects ) {
			//  Add Data rows
			for ( const tableObject of tableObjects ) {
				const outputColumns = [];
				for ( const column of columns ) {
					const dataProperty = column.dataProperty;
					const dataPropertyValue = tableObject[ dataProperty ];
					outputColumns.push( dataPropertyValue );
				}
				const dataRow = outputColumns.join("\t");
				outputLines.push( dataRow );
			}
		}

		//  Add end of line for last line since next "join" will not add end of line on last line
		outputLines.push("\n");

		const outputLinesJoined = outputLines.join("\n");

		return outputLinesJoined;
	}

}