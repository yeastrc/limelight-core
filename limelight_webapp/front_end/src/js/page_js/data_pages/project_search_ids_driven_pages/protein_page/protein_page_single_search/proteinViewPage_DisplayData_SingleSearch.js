/**
 * proteinViewPage_DisplayData_SingleSearch.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Search  
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

import { create_dataTable_Root_React, remove_dataTable_Root_React } from 'page_js/data_pages/data_table_react/dataTable_Root_React.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { ProteinView_LoadedDataCommonHolder } from '../protein_page_common/proteinView_LoadedDataCommonHolder.js';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder.js';

import { ProteinViewPage_StatsSectionCreator_SingleSearch } from './proteinPageStatsSectionCreator_SingleSearch.js';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from './proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.js';

import { ProteinViewPage_Display_SingleProtein_SingleSearch }
	from './proteinViewPage_DisplayData_SingleProtein_SingleSearch.js';

import { SingleProtein_CentralStateManagerObjectClass }
	from '../protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass.js';

	
	//  Applied to the element containing the protein name so it can be selected
const _CSS_CLASS_SELECTOR_PROTEIN_NAME = "selector_protein_name";
	
/**
 * 
 */
export class ProteinViewPage_Display_SingleSearch {

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
		singleProtein_CentralStateManagerObject,
		proteinList_CentralStateManagerObjectClass
	}) {

		//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
		
		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

		
		// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

		this._loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
		
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server 
		} );
		
		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
			new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
				loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
			})
		
		this._proteinViewPage_Display_SingleProtein_SingleSearch = new ProteinViewPage_Display_SingleProtein_SingleSearch( {
			dataPages_LoggedInUser_CommonObjectsFactory,
			proteinViewPage_Display_SingleSearch : this,
			proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_OtherUserSelections,
			dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject
		} );

		this._proteinViewPage_StatsSectionCreator_SingleSearch = new ProteinViewPage_StatsSectionCreator_SingleSearch({ loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder });

		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
		//  From Protein Template:
		
		if ( ! _protein_table_template_bundle.protein_page_protein_tooltip ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_protein_tooltip");
		}
		this._protein_page_protein_tooltip_Template = _protein_table_template_bundle.protein_page_protein_tooltip;

		if ( ! _protein_table_template_bundle.protein_filters_show_protein_groups_filter ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_filters_show_protein_groups_filter");
		}
		this._protein_filters_show_protein_groups_filter_Template = _protein_table_template_bundle.protein_filters_show_protein_groups_filter;
			
		
		//   projectSearchId being processed.  Reset All data if receive different projectSearchId
		this._projectSearchId = undefined;
		
		//   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescription_Key_ProteinSequenceVersionId = undefined;
		
		//   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = undefined;
		
		//   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
		this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = undefined;

		this._groupProteins = false; //  default false
	}
	
	/**
	 * Populate Protein List On Page For Single Project Search Id
	 */
	populateProteinList( { projectSearchId } ) {

		let objectThis = this;

		{  // Do this here since this._proteinList_CentralStateManagerObjectClass not initialized when constructor for this class is called
			const state_groupProteins = this._proteinList_CentralStateManagerObjectClass.getGroupProteins();
			if ( state_groupProteins ) {
				this._groupProteins = true;
			}
		}

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

		if ( this._projectSearchId !== projectSearchId ) {

			//  Clear all retained Data
			this._loadedDataPerProjectSearchIdHolder.clearAllData();
		}

		this._projectSearchId = projectSearchId;  // Save projectSearchId
		
		//  for just changes to cutoff filters
		this._loadedDataPerProjectSearchIdHolder.clearForNewCutoffsOrDisplayedData()
		
		//   TODO  Maybe don't need to call this, only clearForNewCutoffsOrDisplayedData()
		
		//  Clear all retained Data
		this._loadedDataPerProjectSearchIdHolder.clearAllData();
		
		
		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ( $protein_table_loading_text_display.length === 0 ) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.show();
		
		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}	
		$protein_list_container.hide();
		
		$("#protein_list_size").empty();

		$("#protein_group_list_size_section_display").hide();
		$("#protein_group_list_size").empty();
		

		const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.getDataFromServer( { projectSearchId } )

		promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch( (reason) => {} );
		promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then( (value) => {
			try {
				objectThis._displayProteinListOnPage();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}		
		});
	}

	
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * Display Protein List on Page
	 */
	_displayProteinListOnPage() {

		const objectThis = this;

		const projectSearchId = this._projectSearchId;

		{  //  Add to "Filters:"  "Show Protein Groups:" with radio buttons
			const $selector_filter_section = $(".selector_filter_section");
			if ( $selector_filter_section.length === 0 ) {
				throw Error("NO DOM element with class 'selector_filter_section'");
			}

			const show_protein_groups_filterHTML = this._protein_filters_show_protein_groups_filter_Template({ groupProteins : this._groupProteins });
			const $show_protein_groups_filter = $( show_protein_groups_filterHTML );
			$show_protein_groups_filter.appendTo( $selector_filter_section );

			const $selector_filter_show_protein_groups_yes = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_yes");
			if ( $selector_filter_show_protein_groups_yes.length === 0 ) {
				throw Error("NO DOM element with class 'selector_filter_show_protein_groups_yes'");
			}
			$selector_filter_show_protein_groups_yes.click( ( eventObject ) => {
				try {
						if ( this._groupProteins ) {
						return;
					}
					this._groupProteins = true;
					window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
						try {
							this._proteinList_CentralStateManagerObjectClass.setGroupProteins( { groupProteins : this._groupProteins } );
							const proteinDisplayData = this._createProteinDisplayData( { projectSearchId : this._projectSearchId } );

							this._renderToPageProteinList( { projectSearchId : this._projectSearchId, proteinDisplayData } );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}	
					}, 0 );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}	
			});

			const $selector_filter_show_protein_groups_no = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_no");
			if ( $selector_filter_show_protein_groups_no.length === 0 ) {
				throw Error("NO DOM element with class 'selector_filter_show_protein_groups_no'");
			}
			$selector_filter_show_protein_groups_no.click( ( eventObject ) => {
				try {
					if ( ! this._groupProteins ) {
						return;
					}
					this._groupProteins = false;
					window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
						try {
							this._proteinList_CentralStateManagerObjectClass.setGroupProteins( { groupProteins : this._groupProteins } );

							const proteinDisplayData = this._createProteinDisplayData( { projectSearchId : this._projectSearchId } );

							this._renderToPageProteinList( { projectSearchId : this._projectSearchId, proteinDisplayData } );
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}	
					}, 0 );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}	
			});
		}

		const proteinDisplayData = this._createProteinDisplayData( { projectSearchId : this._projectSearchId } );

		this._renderToPageProteinList( { projectSearchId : this._projectSearchId, proteinDisplayData } );

		const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

		if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {

			//  When do this processing here, an optimization would be to not create the protein list.  That would require other changes.

			//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
			this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId : proteinSequenceVersionId_FromURL } ) ;
		}


		if ( ! this._downloadProteinsClickHandlerAttached ) {
	
			//  Download Proteins container and link.  The version for 1 project search id

			//  Show and attach click handler here since now have the data loaded for downloading
		
			const $protein_download_proteins = $("#protein_download_proteins");

			//  First remove any previous click handler
			$protein_download_proteins.off("click");
			
			$protein_download_proteins.show();

			$protein_download_proteins.click( (eventObject) => {
				try {
					eventObject.preventDefault();

					this._downloadProteinList();

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
					throw e;
				}
			});

			this._downloadProteinsClickHandlerAttached = true;
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
	_createProteinDisplayData( { projectSearchId } ) {
		
		if ( ! this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {
			throw Error("this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated"); // Must have num PSMs populated
		}

		const loadedDataCommonHolder = this._loadedDataCommonHolder;
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
		const reportedPeptideFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
		const psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		
		const proteinInfoMapKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
		
		//  Used to determine if a reported peptide is unique (maps to only 1 protein)
		const proteinSequenceVersionIdsPerReportedPeptideId = this._loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();
		
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
		
		//  Use proteinSequenceVersionIdsArray since it has the proteinSequenceVersionIds for the current Reported Peptide Ids for the current cutoffs/filters
		const proteinSequenceVersionIdsArray = this._loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();


		//  Get Totals for Search Values: Reported Peptide Count and PSM Count

		let reportedPeptideCount_TotalForSearch = 0;
		let psmCount_TotalForSearch = 0;		
		//  Track reported peptide ids to skip ones already processed under other proteins
		const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch = new Set();
		


		//  Final output Protein List
		
		let proteinResultListResult = [];

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

			//  Final output Protein Item
			
			let proteinItemForProjectSearch = { proteinSequenceVersionId : proteinSequenceVersionId };
			
			{
				let proteinName = undefined;			//  For "," delimited string
				let proteinDescription = undefined;		//  For "," delimited string

				const proteinNamesAndDescriptionsArray = [];  // For Tooltip

				proteinItemForProjectSearch.proteinInfo = proteinInfo;

				const annotations = proteinInfo.annotations;
				if ( annotations ) {
					for ( const annotation of annotations ) {
						const name = annotation.name;
						const description = annotation.description;
						const taxonomy = annotation.taxonomy;
						if ( proteinName === undefined ) {
							proteinName = name;
						} else {
							proteinName += "," + name;
						}
						if ( description ) {
							if ( proteinDescription === undefined ) {
								proteinDescription = description;
							} else {
								proteinDescription += "," + description;
							}
						}
						// For Tooltip, matches Tooltip template
						const proteinNamesAndDescriptionsEntry = {
							name : name,
							description : description
						};
						proteinNamesAndDescriptionsArray.push( proteinNamesAndDescriptionsEntry );
					}
				}

				if ( proteinName === "" ) {
					throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId );
				}

				proteinItemForProjectSearch.proteinName = proteinName;
				proteinItemForProjectSearch.proteinDescription = proteinDescription;
				
				
				const proteinNameDescriptionCacheEntry = { name : proteinName, description : proteinDescription };

				//   Protein Name and Description in a Map, Key ProteinSequenceVersionId
				this._proteinNameDescription_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNameDescriptionCacheEntry );

				//   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
				this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );
			}
			
			let numReportedPeptides = 0;
			let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
			let numPsms = 0;
			
			//  Use JS Object instead of 'new Map()' since already coded for that
			let annotationBestData_ForReportedPeptidesMap = {};
			let annotationBestData_ForPsmsMap = {};
			
			//  reportedPeptideIds for proteinSequenceVersionId
			let reportedPeptideIds = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( proteinSequenceVersionId );
		
    		for ( let reportedPeptideId of reportedPeptideIds ) {

    			let numberOfPSMsForReportedPeptide = this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get( reportedPeptideId );
    			    			
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
    			////////////
    			
    			if ( this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() ) {
    				//  Skip if Not Populated if no User cutoffs for type

    				let peptideAnnotationMap = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId().get( reportedPeptideId );

    				//  Update Reported Peptide Best Values
    				this._updateBestAnnotationValues( {
    					bestAnnotationDataMap : annotationBestData_ForReportedPeptidesMap, // best values 
    					entryAnnotationDataMap : peptideAnnotationMap, // values for current Reported Peptide Entry
    					filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes // Reported Peptide or PSM Filterable Annotation type records
    				} );
    			}

    			if ( this._loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() ) {
    				//  Skip if Not Populated if no User cutoffs for type

    				let psmBestAnnotationMap = this._loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId().get( reportedPeptideId );

    				//  Update PSM Best Values
    				this._updateBestAnnotationValues( {
    					bestAnnotationDataMap : annotationBestData_ForPsmsMap, // best values 
    					entryAnnotationDataMap : psmBestAnnotationMap, // values for current Reported Peptide Entry
    					filterableAnnotationTypes : psmFilterableAnnotationTypes // Reported Peptide or PSM Filterable Annotation type records
    				} );
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
			
			proteinItemForProjectSearch.psmAnnotationMap = annotationBestData_ForPsmsMap;
			proteinItemForProjectSearch.peptideAnnotationMap = annotationBestData_ForReportedPeptidesMap;
			
			proteinItemForProjectSearch.proteinCoverageRatio = proteinCoverageRatio;
			proteinItemForProjectSearch.proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed( 3 );
			
			proteinResultListResult.push( proteinItemForProjectSearch );
		}


		//  Get AnnotationType records for Displaying Annotation data in display order in proteinList
		const annotationTypeRecords_DisplayOrder = this._getAnnotationTypeRecords_DisplayOrder( { projectSearchId, proteinList : proteinResultListResult } );

		this._sortProteinList( { proteinList : proteinResultListResult, projectSearchId, annotationTypeRecords_DisplayOrder } );

		return { proteinList : proteinResultListResult, annotationTypeRecords_DisplayOrder, reportedPeptideCount_TotalForSearch, psmCount_TotalForSearch };
	}

	/**
	 * Update Best Annotation Type values for a single type of Reported Peptide or PSM
	 */
	_updateBestAnnotationValues( 
			{
				bestAnnotationDataMap, // best values - JS Object
				entryAnnotationDataMap, // values for current Reported Peptide - JS Object
				filterableAnnotationTypes // Reported Peptide or PSM Filterable Annotation type records
			} ) {


		for ( let entryAnnotationData_Entry of entryAnnotationDataMap ) {

			let annotationTypeId = entryAnnotationData_Entry[ 0 ]; // key
			let entryAnnotationData = entryAnnotationData_Entry[ 1 ]; // Value
			
			//  Reformat value string to look like what went into best fields in DB
			entryAnnotationData.valueString = Number.parseFloat( entryAnnotationData.valueDouble );
			const bestAnnotationData = bestAnnotationDataMap[ annotationTypeId ];
			if ( ! bestAnnotationData ) {
				bestAnnotationDataMap[ annotationTypeId ] = entryAnnotationData;
			} else {
				let annotationType = filterableAnnotationTypes[ annotationTypeId ];
				if ( ! annotationType ) {
					throw Error( "annotationTypeId not found in filterableAnnotationTypes: " + annotationTypeId );
				}
				if ( annotationType.filterDirectionAbove ) {
					if ( entryAnnotationData.valueDouble > bestAnnotationData.valueDouble ) {
						//  entry has a better value than best so replace best with entry
						bestAnnotationDataMap[ annotationTypeId ] = entryAnnotationData;
					}
				} else {
					if ( entryAnnotationData.valueDouble < bestAnnotationData.valueDouble ) {
						//  entry has a better value than best so replace best with entry
						bestAnnotationDataMap[ annotationTypeId ] = entryAnnotationData;
					}
				}
			}
		}
	}
	

	/**
	 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
	 */
	_getAnnotationTypeRecords_DisplayOrder( { projectSearchId, proteinList } ) {

		let searchDetails_Filters_AnnTypeDisplayRootObject = 
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();
		
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
			const msg = "Method _getAnnotationTypeRecords_DisplayOrder( { projectSearchId, proteinList } ): No entry found in filtersAnnTypeDisplayPerProjectSearchIds for projectSearchId: " + projectSearchId;
			console.log( msg );
			throw Error( msg );
		}
		
		let uniquePSMAnnotationTypeIds_PSM_Filters = new Set();
		if ( filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) {
			for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) {
				uniquePSMAnnotationTypeIds_PSM_Filters.add( filterEntry.annTypeId );
			}
		}
		
		let uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters = new Set();
		if ( filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
			for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
				uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters.add( filterEntry.annTypeId );
			}
		}
		
		//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForProteinListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_PSM_Filters } );
		let reportedPeptideAnnotationTypesForProteinListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters } );

		return {
			psmAnnotationTypesForProteinListEntries : psmAnnotationTypesForProteinListEntries,
			reportedPeptideAnnotationTypesForProteinListEntries : reportedPeptideAnnotationTypesForProteinListEntries
		};
	};
	

	/**
	 * 
	 */
	_sortProteinList( { proteinList, projectSearchId, annotationTypeRecords_DisplayOrder } ) {

		//   Sort Proteins Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id

		/**
		 * Return array ann type entries, sorted on sortOrder
		 */
		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated =
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
		let psmAnnotationTypesForProteinListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries.length;
		
		proteinList.sort( function( a, b ) {

			//  Compare Reported Peptide Ann Values, if they are populated
			let a_peptideAnnotationMap = a.peptideAnnotationMap;
			let b_peptideAnnotationMap = b.peptideAnnotationMap;
			if ( a_peptideAnnotationMap && b_peptideAnnotationMap ) {

				for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
					let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
					let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
					let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap[ annotationTypeId ];
					let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap[ annotationTypeId ];
					
					if ( a_peptideAnnotationMap_ForAnnType && b_peptideAnnotationMap_ForAnnType ) {
						if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}
			
			//  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
			let a_psmAnnotationMap = a.psmAnnotationMap;
			let b_psmAnnotationMap = b.psmAnnotationMap;
			if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

				for ( let psmAnnotationTypesForProteinListEntriesLength_Index = 0; psmAnnotationTypesForProteinListEntriesLength_Index < psmAnnotationTypesForProteinListEntriesLength; psmAnnotationTypesForProteinListEntriesLength_Index++ ) {
					let psmAnnotationTypesForProteinListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries[ psmAnnotationTypesForProteinListEntriesLength_Index ];
					let annotationTypeId = psmAnnotationTypesForProteinListEntries_Entry.annotationTypeId;
					let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
					let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];
					
					if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
						if ( psmAnnotationTypesForProteinListEntries_Entry.filterDirectionBelow ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( psmAnnotationTypesForProteinListEntries_Entry.filterDirectionAbove ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}
			

			//  All Reported Peptide and PSM Ann Type Values match so order on Protein Name
			if ( a.proteinName < b.proteinName ) {
				return -1;
			}
			if ( a.proteinName > b.proteinName ) {
				return 1;
			}

			//  All Reported Peptide and PSM Ann Type Values and Protein Name match so order on proteinSequenceVersionId
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
	_renderToPageProteinList( { projectSearchId, proteinDisplayData } ) {
		
		let objectThis = this;

		console.log("Rendering Protein List START, Now: " + new Date() );
		
		const proteinList = proteinDisplayData.proteinList;
		const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder;

		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ( $protein_table_loading_text_display.length === 0 ) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.hide();
		
		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}
		
		let proteinListLength = 0;
		if (proteinList && proteinList.length > 0) {
			proteinListLength = proteinList.length;
		}

		const proteinCount = proteinListLength.toLocaleString();
		const reportedPeptideCount_TotalForSearch_Display = proteinDisplayData.reportedPeptideCount_TotalForSearch.toLocaleString();
		const psmCount_TotalForSearch_Display = proteinDisplayData.psmCount_TotalForSearch.toLocaleString();

		$("#protein_list_size").text( proteinCount );
		$("#reported_peptide_count_label").show();
		$("#reported_peptide_count_display").text( reportedPeptideCount_TotalForSearch_Display );
		$("#psm_count_label").show();
		$("#psm_count_display").text( psmCount_TotalForSearch_Display );


		this._proteinViewPage_StatsSectionCreator_SingleSearch.setProteinListData({ 
			projectSearchId : this._projectSearchId,
			proteinListData : { 
				psmCount: proteinDisplayData.psmCount_TotalForSearch,
				reportedPeptideCount: proteinDisplayData.reportedPeptideCount_TotalForSearch,
				proteinCount: proteinListLength
			}
		});

		this._proteinViewPage_StatsSectionCreator_SingleSearch.addDisplayClickHandler();
		

		if (proteinList && proteinList.length > 0) {

			//  Have Data to show

			this._renderToPageProteinList_ActualRender({ 
				proteinList, annotationTypeRecords_DisplayOrder, $protein_list_container, projectSearchId });
		} else {

			if ( this._groupProteins ) {
				$("#protein_group_list_size").text( "0" );
				$("#protein_group_list_size_section_display").show();
			} else {
				$("#protein_group_list_size_section_display").hide();
			}

			//  No Data to show

			//  Remove existing React in $protein_list_container

			if ( $protein_list_container.length !== 1 ) {
				throw Error("Not found exactly one DOM element for $protein_list_container");
			}
			const protein_list_containerDOMElement = $protein_list_container[ 0 ];
			remove_dataTable_Root_React({ containerDOMElement : protein_list_containerDOMElement }); // External function

			this._proteinList_renderedReactComponent = undefined;

			console.log("Rendering Protein List END (No Data), Now: " + new Date() );
		}
	}

	/**
	 * Have data so actual render
	 */
	_renderToPageProteinList_ActualRender( { proteinList, annotationTypeRecords_DisplayOrder, $protein_list_container, projectSearchId } ) {
		
		// let objectThis = this;
	
		$protein_list_container.show();

		const groupProteins = this._groupProteins;
		
		// Build $proteinDataTable detached from DOM while adding to it.  
		//   That way browser rendering engine only has to do single render after after all elements added. 
		
		// let proteinDataTablecontext = { 
		// 		psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries,
		// 		reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries
		// };

		//   Create Data Table
		const tableObject = this._renderToPageProteinList_Create_TableObject({ 
			proteinList, annotationTypeRecords_DisplayOrder, groupProteins, projectSearchId });

		
		if ( this._groupProteins ) {
			//  Update Protein Group Count
			if ( tableObject.dataGroupObjects === undefined ) {
				throw Error("this._groupProteins is true and tableObject.dataGroupObjects === undefined");
			}
			const groupCount = tableObject.dataGroupObjects.length.toLocaleString();
			$("#protein_group_list_size").text( groupCount );
			$("#protein_group_list_size_section_display").show();
		} else {
			$("#protein_group_list_size_section_display").hide();
		}	
			
		const rowClickHandler = ({ event, uniqueId, dataObject }) => {

			this._singleProteinRowClickHandler( { eventObject : event, uniqueId, dataObject } );
		}


		const tableOptions = { rowClickHandler, tableGroups: groupProteins };

		if ( this._proteinList_renderedReactComponent ) {

			//  Already have React Component of Protein List on Page so update it

			this._proteinList_renderedReactComponent.update_tableObject({ tableObject, tableOptions });

			return;  // EARLY RETURN
		}

		const renderCompleteCallbackFcn = () => {

			console.log("Rendering Protein List END, Now: " + new Date() );

			//   This code shows that after the component is created it can be updated from outside.
			
			//  Fake code to update the state after some time.  
			//    React render happens some time after setState is called from headerColumnClicked_UpdateState
			// window.setTimeout( () => { 

			// 	const columnId = 'psms';
			// 	const shiftKeyDown = false;

			// 	renderedReactComponent.headerColumnClicked_UpdateState({ shiftKeyDown, columnId});
				
			// }, 5000 );
		}


		// add the table to the page

		if ( $protein_list_container.length !== 1 ) {
			throw Error("Not found exactly one DOM element for $protein_list_container");
		}
		const protein_list_containerDOMElement = $protein_list_container[ 0 ];

		this._proteinList_renderedReactComponent =
			create_dataTable_Root_React({ 
				tableObject, tableOptions, containerDOMElement : protein_list_containerDOMElement, renderCompleteCallbackFcn }); // External Function;

		//  Add tooltips to  $protein_list_container instead since that is what is already in the DOM
		this._addTooltipForProteinName( { $selector_table_rows_container : $protein_list_container } )

		// this._populated_DOM_id_protein_list_container__With_React = true;
	};

	/**
	 * Create tableObject object  for DataTable
	 */
	_renderToPageProteinList_Create_TableObject({ 
		proteinList, annotationTypeRecords_DisplayOrder, groupProteins, projectSearchId }) {

		// the columns for the data being shown on the page
		const columns = this._getProteinDataTableColumns( 
			{ psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries,
				reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries } );

		let dataObjects = undefined;
		let dataGroupObjects = undefined;

		if ( groupProteins ) {

			dataGroupObjects = this._renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({ proteinList, annotationTypeRecords_DisplayOrder, columns, projectSearchId });

		} else {

			dataObjects = this._renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ proteinList, annotationTypeRecords_DisplayOrder, columns });
		}

		const tableObject = { 
			columns,
			dataObjects,
			dataGroupObjects,
			expandableRows : false
		}

		return tableObject;
	}

	/**
	 * Create dataObjects object  for DataTable
	 * 
	 * For NO Grouping of Proteins
	 */
	_renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ proteinList, annotationTypeRecords_DisplayOrder, columns }) {

		const dataObjects = this._createProteinList_ForDataTable( { proteinList, annotationTypeRecords_DisplayOrder } );
		
		const tableDisplayHandler = new TableDisplayHandler();
		tableDisplayHandler.addGraphWidths( { dataObjects : dataObjects, columns } );

		return dataObjects;
	}

	/**
	 * Create object 
	 */
	_createProteinList_ForDataTable( { proteinList, annotationTypeRecords_DisplayOrder } ) {

		const proteinList_ForDataTable = [];
		
		for ( const proteinListItem of proteinList ) {
			
			proteinList_ForDataTable.push( this._createProteinItem_DataTableEntry( { proteinListItem, annotationTypeRecords_DisplayOrder } ) );
		}
		return proteinList_ForDataTable;
	}

	////////////////

	/**
	 * Create dataGroupObjects object  for DataTable
	 * 
	 * For YES Grouping of Proteins
	 */
	_renderToPageProteinList_Create_dataGroupObjects_YES_ProteinGroups({ proteinList, annotationTypeRecords_DisplayOrder, columns, projectSearchId }) {

		const proteinList_Local = proteinList;

	 	const dataGroupObjects = [];

		const groupedProteins = this._renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({ proteinList: proteinList_Local, projectSearchId });

		let proteinList_Grouped_MaxLength = 0;

		//  Populate dataGroupObjects
		for ( const groupedProteinItem of groupedProteins ) {

			if ( proteinList_Grouped_MaxLength < groupedProteinItem.proteinList_Grouped.length ) {
				proteinList_Grouped_MaxLength = groupedProteinItem.proteinList_Grouped.length;
			}

			const dataObjects =
				this._renderToPageProteinList_Create_dataObjects_NO_ProteinGroups({ 
					proteinList : groupedProteinItem.proteinList_Grouped, annotationTypeRecords_DisplayOrder, columns });

			const dataGroupObject = {
				dataObjects : dataObjects
			}

			//  Copy all properties from first dataObject to dataGroupObject so sorting works
			{
				const dataObject_First = dataObjects[ 0 ];
				const dataObject_ObjectKeys = Object.keys( dataObject_First );
				for ( const objectKey of dataObject_ObjectKeys ) {
					dataGroupObject[ objectKey ] = dataObject_First[ objectKey ];
				}
			}

			dataGroupObjects.push( dataGroupObject );
		}

		console.log("proteinList_Grouped_MaxLength: " + proteinList_Grouped_MaxLength );

		return dataGroupObjects;
	}

		// proteinListItem:
		// 	numPsms: 9165
		// 	numReportedPeptides: 788
		// 	numReportedPeptidesUnique: 25
		// 	peptideAnnotationMap: {1912: {…}}
		// 	proteinCoverageRatio: 0.9942965779467681
		// 	proteinCoverageRatioDisplay: "0.994"
		// 	proteinDescription: undefined
		// 	proteinInfo: {proteinLength: 526, annotations: Array(1)}
		// 	proteinName: "ALDH1A2_C319A"
		// 	proteinSequenceVersionId: 426
		// 	psmAnnotationMap: {1916: {…}}
		// 	reportedPeptideIds: (788) [113, 201,...

	/**
	 * Group the entries in proteinList
	 * 
	 */
	_renderToPageProteinList_Create_dataGroupObjects_Group_proteinList_Entries({ proteinList, projectSearchId }) {

		const groupedProteins = [];

		for ( const proteinListItem of proteinList ) {

			//  Put in Set first to remove duplicates
			const proteinItem_reportedPeptideIds_Set = new Set( proteinListItem.reportedPeptideIds );
			//  Put in Array and sort for comparisons
			const proteinItem_reportedPeptideIds_Copy_Sorted = Array.from( proteinItem_reportedPeptideIds_Set );
			proteinItem_reportedPeptideIds_Copy_Sorted.sort();
			const proteinItem_reportedPeptideIds_Copy_SortedLength = proteinItem_reportedPeptideIds_Copy_Sorted.length;

			let reportedPeptides_MatchExactly_InExistingEntry = false;

			for ( const groupedProteinItem of groupedProteins ) {

				const groupedProteinItem_reportedPeptideIds_Copy_Sorted = groupedProteinItem.reportedPeptideIds_Copy_Sorted;

				//  Find if reportedPeptideIds_Copy_Sorted match exactly to groupedProtein.reportedPeptideIds_Copy_Sorted
				if ( groupedProteinItem_reportedPeptideIds_Copy_Sorted.length !== proteinItem_reportedPeptideIds_Copy_SortedLength ) {
					//  No Match so skip to next entry
					continue; //  EARLY CONTINUE
				}

				let arrayCompareAllMatch = true;
				for ( let index = 0; index < proteinItem_reportedPeptideIds_Copy_SortedLength; index++ ) {
					if ( groupedProteinItem_reportedPeptideIds_Copy_Sorted[ index ] !== proteinItem_reportedPeptideIds_Copy_Sorted[ index ] ) {
						//  Found entry in each array that do NOT match
						arrayCompareAllMatch = false;
						break;  //  EARLY EXIT INNER LOOP
					}
				}
				if ( ! arrayCompareAllMatch ) {
					//  No Match so skip to next entry
					continue; //  EARLY CONTINUE
				}

				//  Found entry of groupedProteins with Identical Reported Peptide Ids 

				//  Add proteinListItem to this groupedProteinItem and exit

				groupedProteinItem.proteinList_Grouped.push( proteinListItem );
				
				reportedPeptides_MatchExactly_InExistingEntry = true;
				break; //  EARLY EXIT LOOP
			}

			if ( ! reportedPeptides_MatchExactly_InExistingEntry ) {

				const groupedProtein_NewEntry = {
					reportedPeptideIds_Copy_Sorted : proteinItem_reportedPeptideIds_Copy_Sorted,
					proteinList_Grouped : [ proteinListItem ]
				};
				groupedProteins.push( groupedProtein_NewEntry );
			}
		}

		return groupedProteins;
	}

	/**
	 * Put Proteins into Groups for Render
	 */
	// _renderToPageProteinList_PutProteinsInGroups( { projectSearchId } ) {
		

	// 	//  Fake copy each dataObject to a dataGroupObject

	// 	tableObject.dataGroupObjects = [];
	// 	let dataGroupObjectUniqueId = 0;
	// 	for ( const dataObject of tableObject.dataObjects ) {
	// 		dataGroupObjectUniqueId++;

	// 		const dataGroupObject = {
	// 			dataObjects : [ dataObject ],
	// 			uniqueId : dataGroupObjectUniqueId
	// 		}

	// 		//  Copy all properties from dataObject to dataGroupObject so sorting works
	// 		{
	// 			const dataObject_ObjectKeys = Object.keys( dataObject );
	// 			for ( const objectKey of dataObject_ObjectKeys ) {
	// 				dataGroupObject[ objectKey ] = dataObject[ objectKey ];
	// 			}
	// 		}

	// 		tableObject.dataGroupObjects.push( dataGroupObject );
	// 	}
	// }

	////////////////

	/**
	 * Create object 
	 */
	_createProteinItem_DataTableEntry( { proteinListItem, annotationTypeRecords_DisplayOrder } ) {

		const context = 
		{ uniqueId : proteinListItem.proteinSequenceVersionId, // Set for Data Table to identify the entry in the table
				proteinSequenceVersionId : proteinListItem.proteinSequenceVersionId,
				proteinName : proteinListItem.proteinName,
				proteinDescription : proteinListItem.proteinDescription,
				proteinCoverageRatio : proteinListItem.proteinCoverageRatio,
				proteinCoverageRatioDisplay : proteinListItem.proteinCoverageRatioDisplay,
				numPsms : proteinListItem.numPsms,
				numReportedPeptides : proteinListItem.numReportedPeptides,
				numReportedPeptidesUnique : proteinListItem.numReportedPeptidesUnique
		};

		//  Put Reported Peptide and Best PSM annotations into the context per ann type id for display matching table headers

		const peptideAnnotationMap = proteinListItem.peptideAnnotationMap;
		if ( peptideAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries ) {
				const entryForAnnTypeId = peptideAnnotationMap[ annTypeItem.annotationTypeId ];
				if ( entryForAnnTypeId === undefined || entryForAnnTypeId === null ) {
					throw Error("No entry in peptideAnnotationMap for annTypeItem.annotationTypeId: " + annTypeItem.annotationTypeId );
				}
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}
		const psmAnnotationMap = proteinListItem.psmAnnotationMap;
		if ( psmAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries ) {
				const entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
				if ( entryForAnnTypeId === undefined || entryForAnnTypeId === null ) {
					throw Error("No entry in psmAnnotationMap for annTypeItem.annotationTypeId: " + annTypeItem.annotationTypeId );
				}
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}
		
		return context;
	}

	/**
	 * Create Table Columns 
	 */
	_getProteinDataTableColumns( { psmAnnotationTypes, reportedPeptideAnnotationTypes } ) {

		let columns = [ ];

		{
			let column = {
				id :           'proteins',
				width :        '300px',
				displayName :  'Protein(s)',
				dataProperty : 'proteinName', 
                sort : 'string',
				style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
				style_override_React : { whiteSpace : "nowrap", overflowX:"auto", fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
			};

			columns.push( column );
        }

		{
			let column = {
				id :           'protein_descriptions',
				width :        '325px',
				displayName :  'Protein Descripton(s)',
				dataProperty : 'proteinDescription', 
                sort : 'string',
                style_override : 'white-space:nowrap;overflow:hidden;text-overflow: ellipsis;font-size:12px;',   //prevent line breaks and scroll if too long
				style_override_React : { whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis", fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
			};

			columns.push( column );
        }

		{
			let column = {
				id :           'protein_sequence_coverage',
				width :        '150px',
				displayName :  'Sequence Coverage',
				dataProperty : 'proteinCoverageRatioDisplay',
				sort : 'number',

				showHorizontalGraph: true,
				graphMaxValue: 1,
				graphWidth:50,
				style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
				css_class : ' clickable ' 
			};
			
			columns.push( column );
		}
		{
			let column = {
				id :           'num_reported_peptides',
				width :        '70px',
				displayName :  'Peptides',
				dataProperty : 'numReportedPeptides',
                sort : 'number',
                style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' 
			};

			columns.push( column );
        }
		{
			let column = {
				id :           'num_reported_peptides_unique',
				width :        '70px',
				displayName :  'Peptides Unique',
				dataProperty : 'numReportedPeptidesUnique',
                sort : 'number',
                style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' 
			};

			columns.push( column );
        }
		{
			let column = {
				id :           'psms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'numPsms', // 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' 
			};

			columns.push( column );
        }

        for( let annotation of reportedPeptideAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  'Best Peptide: ' + annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval 
                style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
                css_class : ' clickable ' 
			};

			columns.push( column );
        }

        for( let annotation of psmAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  'Best PSM: ' + annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval
                style_override : 'font-size:12px;',
				style_override_React : { fontSize:"12px" }, // React format Style overrides
				style_override_header_React : { fontSize:"12px" }, //  React format Style Overrides for Header Row Cells
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
    
	// /**
	//  * 
	//  */
    // _addClickHandlersAndTooltips_ToDataTable( { $selector_table_rows_container } ) {
    	
    // 	this._addTooltipForProteinName( { $selector_table_rows_container } );
    	
    // 	this._addClickHandler_ToDataTable_OpenSingleProtein( { $selector_table_rows_container } );
    // }
    
	// /**
	//  * 
	//  */
    // _addClickHandler_ToDataTable_OpenSingleProtein( { $selector_table_rows_container } ) {

	// 	const objectThis = this;
		
	// 	$selector_table_rows_container.click( function(eventObject) {
	// 		try {
	// 			eventObject.preventDefault();
	// 			objectThis._singleProteinRowClickHandler( { eventObject } );
	// 		} catch( e ) {
	// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
	// 			throw e;
	// 		}
	// 	});	
    // }
	
	/**
	 * 
	 */
    _singleProteinRowClickHandler( { eventObject, uniqueId, dataObject } ) {

		eventObject.stopPropagation();

		{
			//  Exit if user selected content on the page
			const selectedContent = window.getSelection().toString();
			if( selectedContent ){
				return false;
			}
		}
		
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
		

		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinCoverageObject === undefined ) {
			throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}
		const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();
		const sequenceCoverageAsPercent = ( proteinCoverageRatio * 100 ).toFixed( 1 );

		const countsFor_proteinSequenceVersionId = 
			this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( countsFor_proteinSequenceVersionId === undefined ) {
			throw Error("No countsFor_proteinSequenceVersionId found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}


		const proteinSummaryStatisticsParam = {
				sequenceCoverageAsPercent : sequenceCoverageAsPercent,
				peptideCount : countsFor_proteinSequenceVersionId.numReportedPeptides,
				uniquePeptideCount : countsFor_proteinSequenceVersionId.numReportedPeptidesUnique,
				psmCount : countsFor_proteinSequenceVersionId.numPsms,
		};

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

		this._proteinViewPage_Display_SingleProtein_SingleSearch.openOverlay( 
				{ proteinSequenceVersionId, projectSearchId : this._projectSearchId, 
					proteinNameDescription : proteinNameDescriptionParam,
					proteinSummaryStatistics : proteinSummaryStatisticsParam,
					singleProteinCloseCallback } );
	}

	
	/**
	 * 
	 */
	_addTooltipForProteinName( { $selector_table_rows_container } ) {
		
		if ( this._addTooltipForProteinName_Called === true ) {
			//  Already called so just exit.  Assume that DOM element has not been removed and added
			return;
		}

		this._addTooltipForProteinName_Called = true;

		// const objectThis = this;
		
		//  qtip tooltip on whole block

		// const selector_table_rows_container_Element = $selector_table_rows_container[ 0 ];

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
		window.addEventListener( "scroll", function( eventObject ) {
			updateTooltipOnScroll_BindThis( eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable );
		}, { passive: true } );
		
	}

	/**
	 * 
	 */
	_updateTooltipOnScroll( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		// User has scrolled.  Hide tooltip and clear tooltip contents.
		
		//  with option { passive: true }, do not call eventObject.preventDefault()

		if ( lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable ) {
			//  Already not showing tooltip so exit
			return;
		}

		//  Not showing tooltip so update lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId to represent that
		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

		//  Update tool tip contents
		qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

		qtipAPI.toggle( false );  // ensure qtip not shown
		qtipAPI.disable( true );  // disable - must pass true to disable it
	}
	
	/**
	 * 
	 */
	_updateTooltipOnMouseMove( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		const $target = $( eventObject.target );

		const $targetParent = $target.parent();
		
		if ( ( ! $target.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME ) ) && ( ! $targetParent.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME ) ) ) {
			
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

		let $tableCell = $target;
		if ( ! $target.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME ) ) {
			$tableCell = $targetParent;
		}
		
		const proteinSequenceVersionIdString = $tableCell.attr( "data-row-id" );
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

		const projectSearchId = this._projectSearchId;
		
		const proteinDisplayData = this._createProteinDisplayData( { projectSearchId : projectSearchId } );

		const proteinDisplayDataAsString = this._createProteinDisplayDownloadDataAsString( { proteinDisplayData } );


		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );

		const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
		if ( ! searchNameObject ) {
			throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
		}
		
		const filename = 'proteins-search-' + searchNameObject.searchId + '.txt';
		
        StringDownloadUtils.downloadStringAsFile( 
			{ stringToDownload : proteinDisplayDataAsString, filename: filename } );
	};

	/**
	 * 
	 */
	_createProteinDisplayDownloadDataAsString( { proteinDisplayData } ) {

		const proteinList = proteinDisplayData.proteinList;
		const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder;

		const psmAnnotationTypes = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
		const reportedPeptideAnnotationTypes = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;;

		// the columns for the data being shown on the page
		const columns = this._getProteinDataTableColumns( 
			{ psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries,
				reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries } );

				// {
				// 	let column = {
				// 		id :           'proteins',
				// 		width :        '500px',
				// 		displayName :  'Protein(s)',
				// 		dataProperty : 'proteinName', 
				// 		sort : 'string',
				// 		style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
				// 		css_class : ' clickable ' + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' ' 
				// 	};
		

		//   Protein List of objects with properties for Data Table
		const proteinList_ForDataTable = this._createProteinList_ForDataTable( { proteinList, annotationTypeRecords_DisplayOrder } );

		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [];

			for ( const column of columns ) {
			
				reportLineParts.push( column.displayName );
			}

			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines
		for ( const proteinItem of proteinList_ForDataTable ) {
		
			const reportLineParts = [];

			for ( const column of columns ) {
			
				const dataForColumn = proteinItem[ column.dataProperty ];
				reportLineParts.push( dataForColumn )
			}

			reportLineParts_AllLines.push( reportLineParts );
		}
		
		//  Join all line parts into strings, delimit on '\t'
		
		const reportLine_AllLines = [];
		
		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for ( const reportLineParts of reportLineParts_AllLines ) {
			
			reportLineParts_AllLinesIndex++;
			
			let reportLine = reportLineParts.join( "\t" );
			if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push( reportLine );
		}
7		
		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

}