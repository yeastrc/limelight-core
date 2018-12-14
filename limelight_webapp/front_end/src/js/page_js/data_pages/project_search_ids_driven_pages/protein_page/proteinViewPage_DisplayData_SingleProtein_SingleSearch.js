/**
 * proteinViewPage_DisplayData_SingleProtein_SingleSearch.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Protein in Single Search  
 */

let Handlebars = require('handlebars/runtime');

let _protein_table_template_bundle = require("../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

import { downloadPsmsFor_projectSearchId_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

import { ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js';
import { ProteinSequenceFormattedDisplay_Main_displayWidget } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_Main_displayWidget.js';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js';
import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.js';

import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js';

import { ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js';

//  Constants

// Min width for outer container. Increased to 990 for protein sequence length > 999 so need room for 4 digits.  Just increase to 1000 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1000; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 950; // Min width for upper section of protein sequence and boxes to right

/**
 * 
 */
export class ProteinViewPage_Display_SingleProtein_SingleSearch {

	/**
	 * 
	 */
	constructor(
			{ proteinViewPage_Display_SingleSearch,
				proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer, 
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_OtherUserSelections, 
				dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing, 
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder,
				singleProtein_CentralStateManagerObject } ) {
		
		this._proteinViewPage_Display_SingleSearch = proteinViewPage_Display_SingleSearch; // reference to creating class object

		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;

		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;


		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});

		//  Template Bundle _protein_table_template_bundle

		if (!_protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template");
		}
		this._protein_page_single_protein_display_in_overlay_template_Template = _protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template;

		if (!_protein_table_template_bundle.protein_page_single_protein_overlay_container_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_overlay_container_template");
		}
		this._protein_page_single_protein_overlay_container_template_Template = _protein_table_template_bundle.protein_page_single_protein_overlay_container_template;

		if (!_protein_table_template_bundle.protein_page_single_protein_overlay_background_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_overlay_background_template");
		}
		this._protein_page_single_protein_overlay_background_template_Template = _protein_table_template_bundle.protein_page_single_protein_overlay_background_template;

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
			{
				loadedDataPerProjectSearchIdHolder ,
				loadedDataCommonHolder ,
				dataPageStateManager_DataFrom_Server ,
				searchDetailsBlockDataMgmtProcessing ,
				proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
			});

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList(
			{
				containing_ProteinViewPage_Display_SingleProtein_SingleSearch : this,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
				annotationTypeData_ReturnSpecifiedTypes : this._annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
			});

		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			displayOnly : true,  //  Display only.  No attach click handlers to allow changes
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			// rerenderPageForUpdatedFilterCutoffs_Callback : rerenderPageForUpdatedFilterCutoffs_BindThis
		} );

		// @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in

		this._searchDetailsAndFilterBlock_MainPage.initialize({ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : "#view_single_protein_overlay_div" });

		//  Display content Div
		this._contentDivHTMLElement = undefined;

		this._projectSearchId = undefined;
		this._proteinSequenceVersionId = undefined;

		//  Holds object of class ProteinSequenceFormattedDisplay_Main_displayWidget
		this._proteinSequenceFormattedDisplay_Main_displayWidget = undefined;

		//  Have click handlers been attached to download data elements?
		this._clickHandlersAttachedToDownloadDataElements = false;

		this._singleProteinCloseCallback = undefined; // passed in openOverlay

		this._proteinNameDescription = undefined; // passed in openOverlay
	}

	/**
	 * 
	 */
	openOverlay( { proteinSequenceVersionId, projectSearchId, proteinNameDescription, proteinSummaryStatistics, singleProteinCloseCallback } ) {

		const objectThis = this;

		this._singleProteinCloseCallback = singleProteinCloseCallback;

		this._proteinNameDescription = proteinNameDescription;

		//  Attach resize handler
		const $window = $(window);
		$window.on("resize", function() {

			objectThis._resize_OverlayHeight_BasedOnViewportHeight();

			objectThis._update_Overlay_OnWindowResize();
		});

		this._projectSearchId = projectSearchId;

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		this._loadDataForInitialOverlay({
			proteinSequenceVersionId ,
			projectSearchId
		}).then(function(value) {

			// On to displaying the data
			objectThis._openOverlayAfterLoadData({
				proteinSequenceVersionId,
				projectSearchId,
				proteinNameDescription,
				proteinSummaryStatistics
			});

		}, function(reason) {});
	}

	/**
	 * 
	 */
	_loadDataForInitialOverlay({proteinSequenceVersionId, projectSearchId}) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {

			const promises_LoadData_Array = [];

			const promise_loadProteinSequenceIfNeeded = objectThis._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
				.loadProteinSequenceIfNeeded({
					proteinSequenceVersionId ,
					projectSearchId
				});
			if (promise_loadProteinSequenceIfNeeded) {
				promises_LoadData_Array.push(promise_loadProteinSequenceIfNeeded);
			}

			try {
				const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
					loadedDataPerProjectSearchIdHolder : objectThis._loadedDataPerProjectSearchIdHolder, 
					proteinSequenceVersionId, 
					projectSearchId });

				if (promise_getDynamicModificationsForProteinSequenceVersionId) {
					promises_LoadData_Array.push(promise_getDynamicModificationsForProteinSequenceVersionId);
				}
			} catch( e ) {
				console.log("Exception caught calling getDynamicModificationsForProteinSequenceVersionId:");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}

			if (promises_LoadData_Array.length !== 0) {

				const promisesAll = Promise.all(promises_LoadData_Array);

				promisesAll.catch(function(reason) {
					reject(reason);
				})
				promisesAll.then(function(value) {

					resolve(value);
				})
			} else {

				resolve();
			}

		});
	}

	////////////////////////////////////////////////////////

	/**
	 * 
	 */
	_openOverlayAfterLoadData( { proteinSequenceVersionId, projectSearchId, proteinNameDescription, proteinSummaryStatistics } ) {

		const objectThis = this;

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget: mods per sequence position { <position 1 based> : [ <mass> ] }
		const modsOnProteinByPosition = {};  //  Object for Handlebars

		if ( dynamicModificationsOnProtein ) {
			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				let massesAtPosition = modsOnProteinByPosition[ position ];
				if ( ! massesAtPosition ) {
					massesAtPosition = new Set();
					modsOnProteinByPosition[ position ] = massesAtPosition;
				}
				const massNumber = Number.parseFloat( mass )
				massesAtPosition.add( massNumber );
			}
			//  Sort masses at each position
			for ( const position of Object.keys( modsOnProteinByPosition ) ) {
				const massesAtPositionSet = modsOnProteinByPosition[ position ];
				const massesAtPositionArray = Array.from( massesAtPositionSet );
				massesAtPositionArray.sort( function(a, b) {
					if ( a < b ) {
						return -1;
					}
					if ( a > b ) {
						return 1;
					}
					return 0;
				})
				modsOnProteinByPosition[ position ] = massesAtPositionArray;
			}
		}

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({
			proteinSequenceVersionId
		});
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
		}
		
		//  Create links to external resources
		const linksToExternalResources = this._createLinksToExternalResources( { proteinSequenceString } );
		
		// //  Get Search Name and Search Id for Project Search Id

		// const searchNamesKeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );
		// const searchNameObjectForProjectSearchId = searchNamesKeyProjectSearchId[ projectSearchId ];
		// if ( ! searchNameObjectForProjectSearchId ) {
		// 	throw Error("No Search Name for projectSearchIdSingleString: " + projectSearchId );
		// }
		// const searchNameObject = { searchName : searchNameObjectForProjectSearchId.name, searchId : searchNameObjectForProjectSearchId.searchId };

		const $contentDiv = this._createModalOverlayContentDiv( { proteinNameDescription, proteinSummaryStatistics, linksToExternalResources } );

		this._createSingleProteinModalOverlay( { $contentDiv } );

		this._contentDivHTMLElement = $contentDiv[0];

		this._resize_OverlayHeight_BasedOnViewportHeight();

		this._searchDetailsAndFilterBlock_MainPage.populatePage();
		
		this._attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } );

		//////

		//   Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
		if (!proteinCoverageObject) {
			throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId);
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ proteinCoverageObject });
		
		const $selector_protein_sequence_container = $contentDiv.find(".selector_protein_sequence_container");
		if ($selector_protein_sequence_container.length === 0) {
			throw Error("No element with class 'selector_protein_sequence_container'");
		}

		const proteinSequenceContainerHTML_Element = $selector_protein_sequence_container[0];

		const callbackMethodForSelectedProteinSequenceChangeBoundThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

		this._proteinSequenceFormattedDisplay_Main_displayWidget = new ProteinSequenceFormattedDisplay_Main_displayWidget(
			{
				proteinSequenceString,
				widget_SequenceCoverageParam,
				modsForProtein: modsOnProteinByPosition,
				containerHTML_Element: proteinSequenceContainerHTML_Element,
				callbackMethodForSelectedChange: callbackMethodForSelectedProteinSequenceChangeBoundThis
			});

		//  Encoded Data Data from URL to pass to Protein Sequence Widget
		this._proteinSequenceFormattedDisplay_Main_displayWidget.initialize({ encodedStateData : this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData() });

		/// Modification Display and Selection
		{
			const callbackMethodForSelectedChangeBoundThis = this._callbackMethodForSelectedChange.bind(this);
			const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, this._loadedDataPerProjectSearchIdHolder );

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = new ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect(
				{
					rootDisplayJquerySelector : ".selector_protein_mod_list_block",
					projectSearchIds : [ projectSearchId ],
					proteinSequenceVersionId,
					loadedDataCommonHolder : this._loadedDataCommonHolder, 
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
					callbackMethodForSelectedChange : callbackMethodForSelectedChangeBoundThis
				});
		}

		const selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.initialize({ 
			proteinNameDescription : this._proteinNameDescription,
			selectedProteinSequencePositions,
			encodedStateData : this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData() });

		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.modListDisplay();

		////

		//  Load and Display data after initial overlay show.  Currently Reported Peptide List

		const promise_loadDataAfterInitialOverlayShow = 
			this
			._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
			.loadDataAfterInitialOverlayShow({ retrieveForSingleSearch : true, proteinSequenceVersionId, projectSearchId });

		promise_loadDataAfterInitialOverlayShow.catch(function(reason) {});

		promise_loadDataAfterInitialOverlayShow.then(function(value) {

			objectThis._createOrReplaceReportedPeptideList();
		});
	}

	/**
	 * Create links to external resources
	 */
	_createLinksToExternalResources( { proteinSequenceString } ) {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;
		
		const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
		const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
		
		const proteinNames_URI_Encoded_Array = [];

		const proteinInfoMapKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

		let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinInfo === undefined ) {
			throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}
		const annotations = proteinInfo.annotations;
		if ( annotations ) {
			for ( const annotation of annotations ) {
				const name = annotation.name;
//				const description = annotation.description;
//				const taxonomy = annotation.taxonomy;
				const proteinName_URI_Encoded = window.encodeURIComponent( name );
				proteinNames_URI_Encoded_Array.push( proteinName_URI_Encoded );
			}
		}
		
		const proteinNamesForQueries = proteinNames_URI_Encoded_Array.join("+or+");

		// (if more than one name for this sequence, separate they by "+or+")
		const UniProtKB_Search_URL ="https://www.uniprot.org/uniprot/?query=" + proteinNamesForQueries + "&sort=score";

		const NCBI_Search_URL ="https://www.ncbi.nlm.nih.gov/protein/?term=" + proteinNamesForQueries;

			
		const linksToExternalResources = {
				NCBI_Blast_URL,
				PDR_Blast_URL,
				UniProtKB_Search_URL,
				NCBI_Search_URL
		}
		
		return linksToExternalResources;
	}
	
	/**
	 * On links to external resources, attach click handlers to open the links.
	 * 
	 * Do this since the click is eaten by another click handler so the browser does not open the link by default.
	 */
	_attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } ) {
		
		const $selector_ncbi_blast_link = $contentDiv.find(".selector_ncbi_blast_link");
		if ( $selector_ncbi_blast_link.length === 0 ) {
			throw Error("No element found for class 'selector_ncbi_blast_link'");
		}
		const $selector_pdr_blast_link = $contentDiv.find(".selector_pdr_blast_link");
		if ( $selector_pdr_blast_link.length === 0 ) {
			throw Error("No element found for class 'selector_pdr_blast_link'");
		}
		const $selector_uniprotkb_search_link = $contentDiv.find(".selector_uniprotkb_search_link");
		if ( $selector_uniprotkb_search_link.length === 0 ) {
			throw Error("No element found for class 'selector_uniprotkb_search_link'");
		}
		const $selector_ncbi_search_link = $contentDiv.find(".selector_ncbi_search_link");
		if ( $selector_ncbi_search_link.length === 0 ) {
			throw Error("No element found for class 'selector_ncbi_search_link'");
		}
		
		$selector_ncbi_blast_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.NCBI_Blast_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_pdr_blast_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.PDR_Blast_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_uniprotkb_search_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.UniProtKB_Search_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_ncbi_search_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.NCBI_Search_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedProteinSequenceChange( params ) {

		let newSelection = undefined;
		if ( params ) {
			newSelection = params.newSelection;
		}

		const selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.update_selectedProteinSequencePositions({ selectedProteinSequencePositions, newSelection });

		const widgetEncodedStateData = this._proteinSequenceFormattedDisplay_Main_displayWidget.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedChange() {

		const modsSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_createOrReplaceReportedPeptideList() {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $reported_peptides_outer_container = $contentDiv.find(".selector_reported_peptides_outer_container");
		if ( $reported_peptides_outer_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'reported_peptides_outer_container'");
		}

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createOrUpdateReportedPeptideDisplayData(
			{
				proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget,
				proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect : this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId,
				$reported_peptides_outer_container
			});
		
		this._showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } );
	}
	
	/**
	 * 
	 */
	_createModalOverlayContentDiv( { proteinNameDescription, proteinSummaryStatistics, linksToExternalResources } ) {

		const summaryStatisticsDisplay = {
				sequenceCoverageAsPercent : proteinSummaryStatistics.sequenceCoverageAsPercent,
				peptideCountDisplay : proteinSummaryStatistics.peptideCount.toLocaleString(),
				uniquePeptideCountDisplay : proteinSummaryStatistics.uniquePeptideCount.toLocaleString(),
				psmCountDisplay : proteinSummaryStatistics.psmCount.toLocaleString(),
		}

		let contentDivHTML = 
			this._protein_page_single_protein_display_in_overlay_template_Template({
				proteinData : proteinNameDescription,
				summaryStatistics : summaryStatisticsDisplay,
				linksToExternalResources
			});
		let $contentDiv = $(contentDivHTML);
		return $contentDiv;
	}

	/**
	 * 
	 */
	_createSingleProteinModalOverlay( { $contentDiv } ) {

		const objectThis = this;


		// const $data_page_outermost_div = $("#data_page_outermost_div");
		// if ( $data_page_outermost_div.length === 0 ) {
		// 	throw Error("Failed to find DOM element with id 'data_page_outermost_div'");
		// }

		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
		if ( $data_page_overall_enclosing_block_div.length === 0 ) {
			throw Error("Failed to find DOM element with id 'data_page_overall_enclosing_block_div'");
		}
		
		const overlayContainerHTML = this._protein_page_single_protein_overlay_container_template_Template();
		const $overlayContainer = $( overlayContainerHTML );
		$overlayContainer.insertAfter( $data_page_overall_enclosing_block_div );
			
		const backgroundHTML = this._protein_page_single_protein_overlay_background_template_Template();
		const $background = $( backgroundHTML );
		$background.insertAfter( $data_page_overall_enclosing_block_div );
	
		const $single_protein_overlay_background = $("#single_protein_overlay_background");
		if ( $single_protein_overlay_background.length === 0 ) {
			throw Error("Failed to find DOM element with id 'single_protein_overlay_background'");
		}
		const $view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_div'");
		}

		const $view_single_protein_overlay_body = $("#view_single_protein_overlay_body");
		if ( $view_single_protein_overlay_body.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_body'");
		}
		$view_single_protein_overlay_body.append( $contentDiv );

		//   Remove Click on background to close Single Protein View
		
		// $single_protein_overlay_background.click( function(eventObject) {
		// 	try {
		// 		eventObject.preventDefault();
		// 		objectThis._overlayHideClicked();
		// 		return false;
		// 	} catch( e ) {
		// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		// 		throw e;
		// 	}
		// });	

		const $view_single_protein_overlay_X_for_exit_overlay = $("#view_single_protein_overlay_X_for_exit_overlay");
		if ( $view_single_protein_overlay_X_for_exit_overlay.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_X_for_exit_overlay'");
		}
		$view_single_protein_overlay_X_for_exit_overlay.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._overlayHideClicked();
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
	}

	/**
	 * 
	 */
	_showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } ) {
		
		const objectThis = this;
		
		const $selector_downloads_block = $contentDiv.find(".selector_downloads_block");
		if ( $selector_downloads_block.length === 0 ) {
			throw Error("Failed to find Element with class 'selector_downloads_block'");
		}
				
		//  Have click handlers been attached to download data elements?
		if ( ! this._clickHandlersAttachedToDownloadDataElements ) {
		
			const $selector_download_peptides_all = $selector_downloads_block.find(".selector_download_peptides_all");
			if ( $selector_download_peptides_all.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_peptides_all'");
			}
			const $selector_download_peptides_shown = $selector_downloads_block.find(".selector_download_peptides_shown");
			if ( $selector_download_peptides_shown.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_peptides_shown'");
			}

			const $selector_download_psms_all = $selector_downloads_block.find(".selector_download_psms_all");
			if ( $selector_download_psms_all.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_psms_all'");
			}
			const $selector_download_psms_shown = $selector_downloads_block.find(".selector_download_psms_shown");
			if ( $selector_download_psms_shown.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_psms_shown'");
			}
			
			this._clickHandlersAttachedToDownloadDataElements = true;
			
			//  Add Click handler to download Reported Peptides and PSMs, if not already added

			$selector_download_peptides_all.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPeptides_All_ClickHandler( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		

			$selector_download_peptides_shown.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPeptides_Shown_ClickHandler( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		
			
			$selector_download_psms_all.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPsmsClickHandler_All( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		

			$selector_download_psms_shown.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPsmsClickHandler_Shown( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		
		}
		
		$selector_downloads_block.show();
	}
	
	/**
	 * 
	 */
	_downloadPeptides_All_ClickHandler( { clickThis, eventObject } ) {
		
		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchId : this._projectSearchId
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( { clickThis, eventObject } ) {
		
		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget,
						proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect : this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchId : this._projectSearchId
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}
	

	/**
	 * Download ALL PSMs for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_All( { clickThis, eventObject } ) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds ) {
			throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " + proteinSequenceVersionId 
					+ ", projectSearchId: " + this._projectSearchId );
		}

		this._downloadPsms( { reportedPeptideIds } );
	}

	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_Shown( { clickThis, eventObject } ) {

		const reportedPeptideIds = this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.getReportedPeptideIdsForDisplay( 
			{
				proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget,
				proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect : this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId
			});
		
		this._downloadPsms( { reportedPeptideIds } );
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { reportedPeptideIds } ) {
		
		const searchDataLookupParams_For_Single_ProjectSearchId = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId : this._projectSearchId } );

		if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
			throw Error("searchDataLookupParams_For_Single_ProjectSearchId not found for this._projectSearchId: " + this._projectSearchId );
		}

		downloadPsmsFor_projectSearchId_FilterCriteria_RepPeptProtSeqVIds( { 
			projectSearchId : this._projectSearchId,
			searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
			reportedPeptideIds : reportedPeptideIds, 
			proteinSequenceVersionIds : [ this._proteinSequenceVersionId ] } );
	}
	
	//////////////

	/**
	 * Get ReportedPeptideIds To Show:  Based On SequenceSelection, or All if no Selection  
	 */
	_getReportedPeptideIds_ToShow() {

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		//  reportedPeptideIds for this proteinSequenceVersionId
		let reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds ) {
			throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " 
					+ this._proteinSequenceVersionId + ", this._projectSearchId: " + projectSearchId );
		}

		const selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size !== 0 ) {
			//  Have User Selections of Protein Coverage on the Protein Sequences 
			//    so create reportedPeptideIds based on that selection

			const reportedPeptideIdsSelection = new Set();

			//  Sequence Coverage Data
			const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			if ( ! proteinCoverageObject ) {
				throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
			}

			for ( const positionEntry of selectedProteinSequencePositions.entries() ) {
				//  positionEntry is a Map Entry format so it is Array [key,value]
				const positionValue = positionEntry[ 1 ];
				const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : positionValue } );
				for ( const reportedPeptideId of reportedPeptideIdsAtPosition ) {
					reportedPeptideIdsSelection.add( reportedPeptideId );
				}
			}
			reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
		}
		
		return reportedPeptideIds;
	}
	
	/**
	 * 
	 */
	_overlayHideClicked() {

		const $single_protein_overlay_background = $("#single_protein_overlay_background");
		if ( $single_protein_overlay_background.length === 0 ) {
			throw Error("No DOM element found with id 'single_protein_overlay_background'");
		}
		$single_protein_overlay_background.remove();

		const $view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
		}
		$view_single_protein_overlay_div.remove();

		this._contentDivHTMLElement = undefined;
		this._proteinSequenceFormattedDisplay_Main_displayWidget = undefined;

		//  Have click handlers been attached to download data elements?
		this._clickHandlersAttachedToDownloadDataElements = false; //  reset to false since removed elements from DOM

		this._singleProtein_CentralStateManagerObject.clearAll();

		//  Remove resize handler
		const $window = $(window);
		$window.off("resize");

		if ( this._singleProteinCloseCallback ) {
			this._singleProteinCloseCallback();
		}
	}

	//////////////
	
	/**
	 * 
	 */
	_resize_OverlayHeight_BasedOnViewportHeight() {

		if (!this._contentDivHTMLElement) {
			// Exit if no overlay
			return;
		}

		const $window = $(window);

		const windowHeight = $window.height();

		//  Subtract header and footer heights

		const $header_outer_container_div = $("#header_outer_container_div");
		if ( $header_outer_container_div.length === 0 ) {
			throw Error("No DOM element found with id 'header_outer_container_div'");
		}
		const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		// const $footer_outer_container_div = $("#footer_outer_container_div");
		// if ( $footer_outer_container_div.length === 0 ) {
		// 	throw Error("No DOM element found with id 'footer_outer_container_div'");
		// }
		// const footerOuterHeight = $footer_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		const footerOuterHeight = 31;  // Hard code footer height since measuring doesn't work right

		const overlayHeight = windowHeight - headerOuterHeight - footerOuterHeight;

		const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
		if ( $view_single_protein_inner_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
		}

		$view_single_protein_inner_overlay_div.css('min-height', overlayHeight + 'px');
	}

	/**
	 * called by contained object of class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList
	 */
	resize_OverlayWidth_BasedOnReportedPeptidesWidth({reportedPeptidesWidth}) {

		if (!this._contentDivHTMLElement) {
			// Exit if no overlay
			return;
		}

		const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
		if ( $view_single_protein_inner_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
		}

		let overlayWidth = reportedPeptidesWidth + 60;
		if (overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH) {
			overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
		}

		$view_single_protein_inner_overlay_div.css('width', overlayWidth + 'px');
		
		this._update_Overlay_OnWindowResize();
	}

	/**
	 * called by contained object of class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList
	 */
	_update_Overlay_OnWindowResize( params ) {

		let $view_single_protein_overlay_div = undefined;
		let overlayWidth = undefined;

		if ( params ) {
			$view_single_protein_overlay_div = params.$view_single_protein_overlay_div;
			overlayWidth = params.overlayWidth;
		}

		if ( $view_single_protein_overlay_div === undefined ) {
			$view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
			if ( $view_single_protein_overlay_div.length === 0 ) {
				throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
			}
		}
		if ( overlayWidth === undefined ) {
			overlayWidth = $view_single_protein_overlay_div.outerWidth();
		}


		if (!this._contentDivHTMLElement) {
			// Exit if no overlay
			return;
		}

		//  Adjust width of block above reported peptide list to keep the boxes to the right within the viewport, if necessary.

		const $window = $(window);
		const windowWidth = $window.width();

		const $selector_section_above_reported_peptides_list_block = $view_single_protein_overlay_div.find(".selector_section_above_reported_peptides_list_block");

		if ( overlayWidth <= windowWidth ) {

			$selector_section_above_reported_peptides_list_block.css('width', ''); // clear setting

		} else {

			let sectionAboveReportedPeptidesList_Width = windowWidth - 50; // - 50 to adjust in from right edge
			if (sectionAboveReportedPeptidesList_Width < _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH) {
				sectionAboveReportedPeptidesList_Width = _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH; // Min width
			}
			$selector_section_above_reported_peptides_list_block.css('width', sectionAboveReportedPeptidesList_Width + 'px');
		}

	}
}