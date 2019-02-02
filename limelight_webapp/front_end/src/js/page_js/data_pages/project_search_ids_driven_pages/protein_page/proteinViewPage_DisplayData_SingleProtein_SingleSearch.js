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

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

import { ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js';
import { ProteinSequenceFormattedDisplay_Main_displayWidget } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_Main_displayWidget.js';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js';
import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.js';

import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js';

import { ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js';

//  Constants

// Min width for outer container. Increased to 1070 for protein sequence length > 999 so need room for 4 digits.  Just increase to 1080 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1080; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1230; // Min width for upper section of protein sequence and boxes to right

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
				dataPages_LoggedInUser_CommonObjectsFactory,
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
			dataPages_LoggedInUser_CommonObjectsFactory,
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
	_openOverlayAfterLoadData( { proteinNameDescription, proteinSummaryStatistics } ) {

		const objectThis = this;

		const projectSearchId = this._projectSearchId;
		const proteinSequenceVersionId = this._proteinSequenceVersionId;

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
		
		const $contentDiv = this._createModalOverlayContentDiv( { proteinNameDescription, proteinSummaryStatistics, linksToExternalResources } );

		this._createSingleProteinModalOverlay( { $contentDiv } );

		this._contentDivHTMLElement = $contentDiv[0];

		this._resize_OverlayHeight_BasedOnViewportHeight();

		this._searchDetailsAndFilterBlock_MainPage.populatePage();
		
		this._attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } );



		/// Modification Display and Selection
		{
			const callbackMethodForSelectedModificationsChangeBoundThis = this._callbackMethodForSelectedModificationsChange.bind( this );
			const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, this._loadedDataPerProjectSearchIdHolder );

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = new ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect(
				{
					rootDisplayJquerySelector : ".selector_protein_mod_list_block",
					projectSearchIds : [ projectSearchId ],
					proteinSequenceVersionId,
					loadedDataCommonHolder : this._loadedDataCommonHolder, 
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
					callbackMethodForSelectedChange : callbackMethodForSelectedModificationsChangeBoundThis
				});


			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.initialize({ 
				proteinNameDescription : this._proteinNameDescription,
				encodedStateData : this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData()
					// selectedProteinSequencePositions - No longer used
			});

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.modListDisplay();
		}

		//////

		{  //   Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

			//    Modification Mass Info for display

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
			//         calls this._getReportedPeptideIdsForDisplay(); so this._proteinSequenceFormattedDisplay_Main_displayWidget must already exist to get positions selected
			const modificationMassesForProteinPositions = this._get_modificationMasses_All_OnProteinByPosition();

			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}

			//  Sequence coverage for all peptides for this protein (no apply Mod mass or Protein Position filters)

			const widget_SequenceCoverageParam_All_Peptides = this._get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters();

			//  DOM element to put widget in

			const $selector_protein_sequence_container = $contentDiv.find(".selector_protein_sequence_container");
			if ($selector_protein_sequence_container.length === 0) {
				throw Error("No element with class 'selector_protein_sequence_container'");
			}

			const proteinSequenceContainerHTML_Element = $selector_protein_sequence_container[0];

			//  Callback function, with 'this' bound to this object

			const callbackMethodForSelectedProteinSequenceChangeBoundThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

			//   Create Object:  Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

			this._proteinSequenceFormattedDisplay_Main_displayWidget = new ProteinSequenceFormattedDisplay_Main_displayWidget(
				{
					proteinSequenceString,
					modificationMassesForProteinPositions,
					modificationMassesToFilterOn,
					widget_SequenceCoverageParam_All_Peptides,
					containerHTML_Element: proteinSequenceContainerHTML_Element,
					callbackMethodForSelectedChange: callbackMethodForSelectedProteinSequenceChangeBoundThis
				});

			//  Encoded Data Data from URL to pass to Protein Sequence Widget
			this._proteinSequenceFormattedDisplay_Main_displayWidget.set_encodedStateData({ encodedStateData : this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData() });

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( modificationMassesToFilterOn || selectedProteinSequencePositions ) { 
				//   Set Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.set_initial_widget_SequenceCoverageParam_Selected_Peptides({ initial_widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			}

			this._proteinSequenceFormattedDisplay_Main_displayWidget.initialize();

			this._proteinSequenceFormattedDisplay_Main_displayWidget.renderOnPage();
		}

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
	 * All modification masses by protein position
	 * 
	 * @param reportedPeptideIdsToFilterOn - Undefined if not filtering
	 * 
	 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	 */
	_get_modificationMasses_All_OnProteinByPosition() {

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
		const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		if ( dynamicModificationsOnProtein ) {

			//  Start with Map of Sets to remove duplicates
			const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

				const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				let massesAtPosition = modsOnProteinByPosition_Sets.get( position );
				if ( ! massesAtPosition ) {
					massesAtPosition = new Set();
					modsOnProteinByPosition_Sets.set( position, massesAtPosition );
				}
				const massNumber = Number.parseFloat( mass )
				massesAtPosition.add( massNumber );
			}
			//  Sort masses at each position
			for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
				const position = modsOnProteinByPositionEntry[ 0 ];
				const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
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
				//  Place the sorted Array in the final output Map
				modsOnProteinByPosition.set( position, massesAtPositionArray );
			}
		}

		return modsOnProteinByPosition;
	}

	/**
	 * NOT USE: user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters() {

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  No Modification or Protein Sequence Positions Selected so use existing computed sequence coverage

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
		if (!proteinCoverageObject) {
			throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId);
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ proteinCoverageObject });

		return widget_SequenceCoverageParam;
	}

	/**
	 * Uses the user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions() {

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		if ( ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) && ( ! selectedProteinSequencePositions ) ) {

			//  No Modification or Protein Sequence Positions Selected so use existing computed sequence coverage

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
			if (!proteinCoverageObject) {
				throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId);
			}

			const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ proteinCoverageObject });

			return widget_SequenceCoverageParam;

		} else {

			//  Modification or Protein Sequence Positions Selected so compute sequence coverage

			const reportedPeptideIdsForDisplay = this._getReportedPeptideIdsForDisplay();

			const proteinCoverageArrayOfBoolean = this._get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ 
				reportedPeptideIds : reportedPeptideIdsForDisplay, 
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId } );

			const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : proteinCoverageArrayOfBoolean });
			
			return widget_SequenceCoverageParam;
		}
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
	_callbackMethodForSelectedModificationsChange() {

		const modsSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );

		{
			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}

			//  Update Protein Sequence Display Widget with mods to display
			this._proteinSequenceFormattedDisplay_Main_displayWidget.update_modificationMassesToFilterOn( { modificationMassesToFilterOn } );

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( modificationMassesToFilterOn || selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}
		}

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedProteinSequenceChange( params ) {

		let newSelection = undefined;
		if ( params ) {
			newSelection = params.newSelection;
		}

		const widgetEncodedStateData = this._proteinSequenceFormattedDisplay_Main_displayWidget.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );

		//  
		{
			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}
			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( modificationMassesToFilterOn || selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}
		}
		
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

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		const reportedPeptideIdsForDisplay = this._getReportedPeptideIdsForDisplay();

		const filteredOn_selectedModificationMasses = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected();
		const filteredOn_selectedProteinSequencePositions = this._is_filteredOn_selectedProteinSequencePositions({ proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget });

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createOrUpdateReportedPeptideDisplayData({
				reportedPeptideIdsForDisplay,
				filteredOn_selectedModificationMasses, 
				filteredOn_selectedProteinSequencePositions, 
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId,
				$reported_peptides_outer_container });
		
		this._showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } );
	}

	/**
	 * Is filtering on Protein Sequence Positions
	 * 
	 * @param proteinSequenceFormattedDisplay_Main_displayWidget 
	 */
	_is_filteredOn_selectedProteinSequencePositions({ proteinSequenceFormattedDisplay_Main_displayWidget }) {

		if ( proteinSequenceFormattedDisplay_Main_displayWidget ) {
			
			//  Only filter if proteinSequenceFormattedDisplay_Main_displayWidget is passed in
			
			const selectedProteinSequencePositionsLocal = proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

			if ( selectedProteinSequencePositionsLocal && selectedProteinSequencePositionsLocal.size !== 0 ) {
				return true;
			}
		}
		return false;
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
		
		const reportedPeptideIdsForDisplay = this._getReportedPeptideIdsForDisplay({ not_filtered_position_modification_selections : true });

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay,
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
		
		const reportedPeptideIdsForDisplay = this._getReportedPeptideIdsForDisplay();

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay,
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

		const reportedPeptideIds = this._getReportedPeptideIdsForDisplay();
		
		this._downloadPsms( { reportedPeptideIds } );
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { reportedPeptideIds } ) {
		
		const reportedPeptideIdsPerProjectSearchId = {}
		
		reportedPeptideIdsPerProjectSearchId[ this._projectSearchId ] = reportedPeptideIds;

		const searchDataLookupParamsRoot = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
			projectSearchIds : [ this._projectSearchId ],
			searchDataLookupParamsRoot : searchDataLookupParamsRoot,
			reportedPeptideIdsPerProjectSearchId : reportedPeptideIdsPerProjectSearchId } );
	}
	
	
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	
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

	///////////////////////////////////////////
	///////////////////////////////////////////

	
	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * Also called from Child class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList for Reported Peptides list
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 */
	_getReportedPeptideIdsForDisplay( params ) {

		let not_filtered_position_modification_selections = undefined;
		if ( params ) {
			not_filtered_position_modification_selections = params.not_filtered_position_modification_selections;
		}

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds_All ) {
			throw Error("_getReportedPeptideIdsForDisplay: No reportedPeptideIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchId: " + this._projectSearchId );
		}


		if ( not_filtered_position_modification_selections ) {

			// Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  Potentially Filtering based on User Selections 
		const proteinSequenceFormattedDisplay_Main_displayWidget = this._proteinSequenceFormattedDisplay_Main_displayWidget;
		const proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect;

		let selectedProteinSequencePositions = undefined;
		if ( proteinSequenceFormattedDisplay_Main_displayWidget ) {
			selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		}
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		if ( ( ! selectedProteinSequencePositions ) && ( ! proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) ) {

			// No User Selections so NO Filtering based on User Selections

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		if ( ! proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) {
			// no Modification Selections
			if ( selectedProteinSequencePositions ) {
				//  Protein Position Selections
				return this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder })
			}
			throw Error("Should not get here: No modification selection and no selectedProteinSequencePositions.")
		}

		//  Is 'unmodified' selected
		const noModificationSelected = proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoModificationSelected();
		if ( noModificationSelected ) {
			// Modification Section Selection: 'unmodified'
			if ( selectedProteinSequencePositions ) {
				//  Also have Protein Position Selections
				return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection_And_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
			}

			return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder });
		}

		//  Have Modification Section Selection of Modification Masses

		const modificationsSelected_ExcludingNoModificationOption = proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();

		if ( ! modificationsSelected_ExcludingNoModificationOption || modificationsSelected_ExcludingNoModificationOption.length === 0 ) {
			throw Error("modificationsSelected_ExcludingNoModificationOption cannot be not set or empty at this point");
		}

		if ( selectedProteinSequencePositions ) {
			// Have Modification Section Selection of Modification Masses AND Protein Position Selections
			return this._getReportedPeptideIdsForDisplay_ModificationMassesSelected_And_ProteinPositionsSelected({ modificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
		}

		return this._getReportedPeptideIdsForDisplay_ModificationMassesSelected({ modificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder });
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected 'unmodified' un the modification mass filter section
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

		for ( const reportedPeptideId of reportedPeptideIds_All ) {
			const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
			if ( ! modificationsForReportedPeptide ) {
				reportedPeptideIdsSelection.add(reportedPeptideId);
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Protein Positions - No Modifications Selections
	 */
	_getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		// 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
				reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected 'unmodified' un the modification mass filter section AND User has selected Protein Positions
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection_And_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		// 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions
		// 2)  Remove from reportedPeptideIdsSelection all reportedPeptideIds that contain modifications

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
				reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
			}
		}

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Remove from reportedPeptideIdsSelection any reported peptide ids with modifications (since 'unmodified' chosen)
		if ( dynamicModificationsOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				// const position = modificationOnProtein.position;
				// const mass = modificationOnProtein.mass;
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;

				//  Remove from reportedPeptideIdsSelection any reported peptide ids with modifications (since 'unmodified' chosen)
				reportedPeptideIdsSelection.delete( reportedPeptideId );
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Modification Masses to filter on
	 * 
	 */
	_getReportedPeptideIdsForDisplay_ModificationMassesSelected({ modificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Add to reportedPeptideIdsSelection any reported peptide ids with modification masses that are selected
		if ( dynamicModificationsOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				// const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;

				if ( modificationsSelected_ExcludingNoModificationOption.has( mass ) ) {
					reportedPeptideIdsSelection.add( reportedPeptideId );
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Modification Masses AND User has selected Protein Positions
	 * 
	 * 
		1) If a selected position has ANY modifications for ANY peptides,
		then the peptide being evaluated has to have at least one of the selected
		modification masses to be included in the display.

		2) If a selected position has NO modifications for any peptides,
		then the peptide being evaluated has to have protein coverage at the selected position 
		and include at least one of the selected modification masses in any position to be included in the display.

		The total reported peptide list is a union of the peptides from evaluating each selected position.
	* 
	 */
	_getReportedPeptideIdsForDisplay_ModificationMassesSelected_And_ProteinPositionsSelected({ modificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds



		//  Build Set of positions contains selected Modification Masses and Set of positions contains any Modification Masses

		const positionContains_Any_ModificationMasses = new Set();  //  Set<position (number)>

		const reportedPeptideIds_at_position_For_Selected_ModificationMasses = new Map(); //  Map<position (number), Set<reported peptide id (number) >>

		const reportedPeptideIdsFor_Selected_ModificationMasses = new Set(); // Set<reported peptide id (number) >

		{
			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
			const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

			//  Add to reportedPeptideIdsSelection any reported peptide ids with modification masses that are selected
			if ( dynamicModificationsOnProtein ) {
				//  Have modifications for this protein so process them
				for ( const modificationOnProtein of dynamicModificationsOnProtein) {
					//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
					const position = modificationOnProtein.position;
					const mass = modificationOnProtein.mass;
					const reportedPeptideId = modificationOnProtein.reportedPeptideId;

					positionContains_Any_ModificationMasses.add( position );
					
					if ( modificationsSelected_ExcludingNoModificationOption.has( mass ) ) {

						reportedPeptideIdsFor_Selected_ModificationMasses.add( reportedPeptideId );

						let reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = reportedPeptideIds_at_position_For_Selected_ModificationMasses.get( position );
						if ( ! reportedPeptideIds_For_Selected_ModificationMasses_MapEntry ) {
							reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = new Set();
							reportedPeptideIds_at_position_For_Selected_ModificationMasses.set( position, reportedPeptideIds_For_Selected_ModificationMasses_MapEntry );
						}
						reportedPeptideIds_For_Selected_ModificationMasses_MapEntry.add( reportedPeptideId );
					}
				}
			}
		}

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
				
			if ( positionContains_Any_ModificationMasses.has( selectedProteinSequencePosition ) ) {

				// special logic when Selected Sequence Position contains modifications on any peptide

				//  Set<reported peptide id (number) > - reported peptide id found to have one of selected mod mass at this position
				const reportedPeptideIds_For_Selected_ModificationMasses = reportedPeptideIds_at_position_For_Selected_ModificationMasses.get( selectedProteinSequencePosition ); //  Map<position (number), Set<reported peptide id (number) >>

				if ( reportedPeptideIds_For_Selected_ModificationMasses ) {
					for ( const reportedPeptideIdAtPosition of reportedPeptideIds_For_Selected_ModificationMasses ) {
						reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
					}
				}

			} else {

				//  No Mod Masses for any peptide at this position so select reported peptide id with coverage at this location and has any selected mod mass at any position

				//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
				const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
					
				for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

					if ( reportedPeptideIdsFor_Selected_ModificationMasses.has( reportedPeptideIdAtPosition ) ) {

						reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
					}
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * Also called from Child class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList for Reported Peptides list
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 */
	UNUSED( params ) {


		// 	//  Have User Selections of Protein Coverage on the Protein Sequences 
		// 	//    so create reportedPeptideIds based on that selection

		// 	const reportedPeptideIdsSelection = new Set();

		// 	//  Sequence Coverage Data
		// 	const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		// 	//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		// 	const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		// 	if ( ! proteinCoverageObject ) {
		// 		throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		// 	}

		// 	for ( const positionEntry of selectedProteinSequencePositions.entries() ) {
		// 		//  positionEntry is a Map Entry format so it is Array [key,value]
		// 		const positionValue = positionEntry[ 1 ];
		// 		let reportedPeptideIdsAtPositionFilteredForMods = undefined;
		// 		if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
		// 			reportedPeptideIdsAtPositionFilteredForMods = filterOnModMap_KeyPosition_SetReportedPeptideIds.get( positionValue );
		// 		}
		// 		const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : positionValue } );
		// 		for ( const reportedPeptideId of reportedPeptideIdsAtPosition ) {
		// 			if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
		// 				//  Filtering on Modification values
		// 				if ( reportedPeptideIdsAtPositionFilteredForMods ) {
		// 					// Have Reported Peptide ids filtered on Mods for this position
		// 					if ( reportedPeptideIdsAtPositionFilteredForMods.has(reportedPeptideId) ) {
		// 						// This reported peptide id found in filtering so add to output
		// 						reportedPeptideIdsSelection.add( reportedPeptideId );
		// 					}
		// 				}
		// 			} else {
		// 				//  No filtering on Modifications so add to output
		// 				reportedPeptideIdsSelection.add( reportedPeptideId );
		// 			}
		// 		}
		// 	}
		// 	reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
		// }

		// return reportedPeptideIds;

		//////////////////////////////////

		//  Used in filter on position if applicable
		let filterOnModMap_KeyPosition_SetReportedPeptideIds = undefined;

		if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect ) {

			//  Only filter if proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect is passed in

			if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) {

				//  Mod mass(es) selected so filter on them

				let reportedPeptideIdsSelection = undefined;

				if ( selectedProteinSequencePositions ) {
					filterOnModMap_KeyPosition_SetReportedPeptideIds = new Map();  // Build map for filter on position if filtering on position
				} else {
					reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds if only filter on Mod Mass
				}

				const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
				const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		
				if ( dynamicModificationsOnProtein ) {
					//  Have modifications for this protein so process them
					for ( const modificationOnProtein of dynamicModificationsOnProtein) {
						//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
						const position = modificationOnProtein.position;
						const mass = modificationOnProtein.mass;
						const reportedPeptideId = modificationOnProtein.reportedPeptideId;

						if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isModificationSelected( mass ) ) {
			
							if ( reportedPeptideIdsSelection ) {
								reportedPeptideIdsSelection.add( reportedPeptideId );
							} else if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
								if ( selectedProteinSequencePositions.has( position ) ) {
									//  for selection position
									let reportedPeptideIdsSet = filterOnModMap_KeyPosition_SetReportedPeptideIds.get(position);
									if ( ! reportedPeptideIdsSet ) {
										reportedPeptideIdsSet = new Set();
										filterOnModMap_KeyPosition_SetReportedPeptideIds.set(position,reportedPeptideIdsSet);
									}
									reportedPeptideIdsSet.add(reportedPeptideId);
								}
							} else {
								throw Error("Neither reportedPeptideIdsSelection nor filterOnModMap_KeyPosition_SetReportedPeptideIds is set. proteinSequenceVersionId: " + this._proteinSequenceVersionId );
							}
						}
					}
				}

				if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoModificationSelected() ) {
					
					//  User selected to include no modifications in filter on modifications

					if ( ! selectedProteinSequencePositions ) {

						//  User has NOT selected ANY Protein Sequence Positions

						//  Process all reported peptide ids for protein 

						const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
						//  re-get here since variable reportedPeptideIds may have been replaced
						const reportedPeptideIds_All_ForNoModsSearch = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
						if ( ! reportedPeptideIds_All_ForNoModsSearch ) {
							throw Error("_getReportedPeptideIdsForDisplay: No reportedPeptideIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchId: " + this._projectSearchId );
						}
				
						const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = this._loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

						for ( const reportedPeptideId of reportedPeptideIds_All_ForNoModsSearch ) {
							const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
							if ( ! modificationsForReportedPeptide ) {
								reportedPeptideIdsSelection.add(reportedPeptideId);
							}
						}

					} else {

						//  User has selected Protein Sequence Positions

						//  Sequence Coverage Data
						const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

						//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
						const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
						if ( ! proteinCoverageObject ) {
							throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
						}

						//  Create a Set of reported Peptide Ids which do not contain modifications at the selected protein positions
						const reportedPeptideIdsFilteredForModsAtSelectedPositions = new Set();

						for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
							const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
								
							for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
								reportedPeptideIdsFilteredForModsAtSelectedPositions.add( reportedPeptideIdAtPosition );
							}
						}

						//  Remove any reported peptide ids with modifications at any of the selected positions
						if ( dynamicModificationsOnProtein ) {
							//  Have modifications for this protein so process them
							for ( const modificationOnProtein of dynamicModificationsOnProtein) {
								//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
								const position = modificationOnProtein.position;
								const mass = modificationOnProtein.mass;
								const reportedPeptideId = modificationOnProtein.reportedPeptideId;

								if ( selectedProteinSequencePositions.has( position ) ) {
									//  'modificationOnProtein' is for one of the selected positions so remove the reportedPeptideId
									reportedPeptideIdsFilteredForModsAtSelectedPositions.delete( reportedPeptideId );
								}
							}
						}

						//  Create (Or Update) a set of reported peptide ids for each selected position

						for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
							const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
							for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

								if ( reportedPeptideIdsFilteredForModsAtSelectedPositions.has( reportedPeptideIdAtPosition ) ) {
									//  Get existing filterOnModMap_... entry for position. Create if not exist
									let reportedPeptideIdsSet = filterOnModMap_KeyPosition_SetReportedPeptideIds.get(selectedProteinSequencePosition);
									if ( ! reportedPeptideIdsSet ) {
										reportedPeptideIdsSet = new Set();
										filterOnModMap_KeyPosition_SetReportedPeptideIds.set(selectedProteinSequencePosition,reportedPeptideIdsSet);
									}
									reportedPeptideIdsSet.add(reportedPeptideIdAtPosition);
								}
							}
						}

					}
				} //  End if isNoModificationSelected() is true

				if ( reportedPeptideIdsSelection ) {
					reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
				}
			}
		}
		
		if ( selectedProteinSequencePositions ) {
			//  Have User Selections of Protein Coverage on the Protein Sequences 
			//    so create reportedPeptideIds based on that selection

			const reportedPeptideIdsSelection = new Set();

			//  Sequence Coverage Data
			const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			if ( ! proteinCoverageObject ) {
				throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
			}

			for ( const positionEntry of selectedProteinSequencePositions.entries() ) {
				//  positionEntry is a Map Entry format so it is Array [key,value]
				const positionValue = positionEntry[ 1 ];
				let reportedPeptideIdsAtPositionFilteredForMods = undefined;
				if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
					reportedPeptideIdsAtPositionFilteredForMods = filterOnModMap_KeyPosition_SetReportedPeptideIds.get( positionValue );
				}
				const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : positionValue } );
				for ( const reportedPeptideId of reportedPeptideIdsAtPosition ) {
					if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
						//  Filtering on Modification values
						if ( reportedPeptideIdsAtPositionFilteredForMods ) {
							// Have Reported Peptide ids filtered on Mods for this position
							if ( reportedPeptideIdsAtPositionFilteredForMods.has(reportedPeptideId) ) {
								// This reported peptide id found in filtering so add to output
								reportedPeptideIdsSelection.add( reportedPeptideId );
							}
						}
					} else {
						//  No filtering on Modifications so add to output
						reportedPeptideIdsSelection.add( reportedPeptideId );
					}
				}
			}
			reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
		}

		return reportedPeptideIds;
	}

	////////////////////////////////////////////
		
	/**
	 * Get Protein Sequence Coverage for the Reported Peptide Ids for Display.  
	 * 
	 * @returns proteinCoverageArrayOfBoolean
	 *       proteinCoverageArrayOfBoolean : Array (position is '1' based) of boolean with true for is sequence coverage 
	 */
	_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ reportedPeptideIds, proteinSequenceVersionId, projectSearchId } ) {

		const proteinCoverageArrayOfBoolean = []; // function result

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  User Selection of Positions in Protein Sequence

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId );
		}

		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

			for ( const reportedPeptideId of reportedPeptideIds ) {
				if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

					if ( selectedProteinSequencePositions ) {
						//  Have User Selection of Positions in Protein Sequence
						let foundPositionWithinCoverageEntryInUserSelectedPositions = false;
						for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
							foundPositionWithinCoverageEntryInUserSelectedPositions = true;
							break;
						}
						if ( ! foundPositionWithinCoverageEntryInUserSelectedPositions ) {
							//  This Coverage entry is not within any of the User selected positions so exclude
							//  (this would be the case when a peptide is on the protein >1 times and this specific coverage entry does not contain a user selected position)
							continue;  // EARLY CONTINUE
						}
					}

					for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
						proteinCoverageArrayOfBoolean[ position ] = true;
					}
					break;
				}
			}
		}

		return proteinCoverageArrayOfBoolean;
	}
	
}
