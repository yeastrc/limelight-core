/**
 * proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Protein in Multiple Searches
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

import { SharePage_dataPages } from 'page_js/data_pages/data_pages_common/sharePage_dataPages.js';

import { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding.js';

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

import { ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js';
import { ProteinSequenceFormattedDisplay_Main_displayWidget } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_Main_displayWidget.js';

import { ProteinViewDataLoader } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewDataLoader.js';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.js';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js';

import { ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList.js';

import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js';

import { ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js';

//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1270; // Min width for upper section of protein sequence and boxes to right

/**
 * 
 */
export class ProteinViewPage_Display_MultipleSearches_SingleProtein {

	/**
	 * 
	 */
	constructor(
			{ proteinViewPage_Display_MultipleSearch,
				dataPages_LoggedInUser_CommonObjectsFactory,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_OtherUserSelections, 
				dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing, 
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
				singleProtein_CentralStateManagerObject } ) {
		
		this._proteinViewPage_Display_MultipleSearch = proteinViewPage_Display_MultipleSearch; // reference to creating class object

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._loadedDataCommonHolder = loadedDataCommonHolder;

		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
		// this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;

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

		if (!_protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template");
		}
		this._protein_page_single_protein_user_filter_selection_template_Template = _protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template;


		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {
			this._saveView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SaveView_dataPages();
		}

		this._sharePage_dataPages = new SharePage_dataPages();


		this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList = new ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList(
			{
				containing_ProteinViewPage_Display_MultipleSearches_SingleProtein : this,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
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

		this._projectSearchIds = undefined;
		this._proteinSequenceVersionId = undefined;

		//  Holds object of class ProteinSequenceFormattedDisplay_Main_displayWidget
		this._proteinSequenceFormattedDisplay_Main_displayWidget = undefined;

		//  Have click handlers been attached to download data elements?
		this._clickHandlersAttachedToDownloadDataElements = false;

		this._singleProteinCloseCallback = undefined; // passed in openOverlay

		this._proteinNameDescription = undefined; // passed in openOverlay

		//  Save on object when computed
		this._variableModificationMassesForProteinPositions = undefined;
		this._staticModificationMassesForProteinPositions = undefined;
		this._variableModificationMassesToFilterOn = undefined;
		this._staticModificationMassesToFilterOn = undefined;
	}

	/**
	 * 
	 */
	openOverlay( { proteinSequenceVersionId, projectSearchIds, proteinNameDescription, singleProteinCloseCallback } ) {

		const objectThis = this;

		this._singleProteinCloseCallback = singleProteinCloseCallback;

		this._proteinNameDescription = proteinNameDescription;

		this._projectSearchIds = projectSearchIds;

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		this._loadDataForInitialOverlay().then(function(value) {
			try {
				// On to displaying the data
				objectThis._openOverlayAfterLoadData();

			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, function(reason) {});
	}

	/**
	 * 
	 */
	_loadDataForInitialOverlay() {

		const objectThis = this;

		return new Promise( (resolve, reject) => {
			try {
				const promises_Load_First_Set_Data_PerProjectSearchId_Array = [];

				for ( const projectSearchId of objectThis._projectSearchIds ) {

					const loadedDataPerProjectSearchIdHolder = objectThis._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

					const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
					if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

						//  reportedPeptideIds for this proteinSequenceVersionId
						let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( objectThis._proteinSequenceVersionId );
						if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

							// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display
							const promise = objectThis._loadDataForOverlayForSpecific_projectSearchId({proteinSequenceVersionId : objectThis._proteinSequenceVersionId, loadedDataPerProjectSearchIdHolder, projectSearchId});
							promises_Load_First_Set_Data_PerProjectSearchId_Array.push( promise );
						}
					}
				}

				const promise_promises_Load_First_Set_Data_PerProjectSearchId_Array = Promise.all( promises_Load_First_Set_Data_PerProjectSearchId_Array );

				promise_promises_Load_First_Set_Data_PerProjectSearchId_Array.catch(function(reason) { reject() });

				promise_promises_Load_First_Set_Data_PerProjectSearchId_Array.then(function(value) {
					try {
						const promise_getPeptideSequencesForPeptideIds = objectThis._getPeptideSequencesForPeptideIds( {} );

						if ( ! promise_getPeptideSequencesForPeptideIds ) {
							//  No peptide sequences to load so just call next function
							resolve();
							return;
						}

						promise_getPeptideSequencesForPeptideIds.catch(function(reason) {});

						promise_getPeptideSequencesForPeptideIds.then(function(value) {
							try {
								resolve();
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
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}

	/**
	 * 
	 */
	_loadDataForOverlayForSpecific_projectSearchId({ loadedDataPerProjectSearchIdHolder, projectSearchId }) {

		const objectThis = this;

		return new Promise( (resolve, reject) => {
			try {
				const promises_LoadData_Array = [];

				const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
					new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
						searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing
					});

				const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
					{
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
						loadedDataCommonHolder : objectThis._loadedDataCommonHolder ,
						dataPageStateManager_DataFrom_Server : objectThis._dataPageStateManager_DataFrom_Server ,
						searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing ,
						proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
					});

				const promise_loadDataForInitialOverlayShow = proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
					.loadDataForInitialOverlayShow({
						proteinSequenceVersionId : objectThis._proteinSequenceVersionId,
						projectSearchId
					});
				if (promise_loadDataForInitialOverlayShow) {
					promises_LoadData_Array.push(promise_loadDataForInitialOverlayShow);
				}

				try {
					const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder, 
						proteinSequenceVersionId : objectThis._proteinSequenceVersionId, 
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

				const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
				if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {
							
					//  reportedPeptideIds for this proteinSequenceVersionId
					let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( objectThis._proteinSequenceVersionId );
					if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

						// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display

						const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
							new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
								loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
								searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing
							});

						const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
							{
								loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
								loadedDataCommonHolder : objectThis._loadedDataCommonHolder ,
								dataPageStateManager_DataFrom_Server : objectThis._dataPageStateManager_DataFrom_Server ,
								searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing ,
								proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
							});

						const promise_loadDataAfterInitialOverlayShow = 
							proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
							.loadDataAfterInitialOverlayShow({
								retrieveForMultipleSearches : true,
								proteinSequenceVersionId : objectThis._proteinSequenceVersionId,
								projectSearchId
							});

						promises_LoadData_Array.push( promise_loadDataAfterInitialOverlayShow );
					}
				}

				if (promises_LoadData_Array.length !== 0) {

					const promisesAll = Promise.all(promises_LoadData_Array);

					promisesAll.catch( (reason) => {
						reject(reason);
					})
					promisesAll.then( (value) => {
						try {
							resolve(value);
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})
				} else {

					resolve();
				}
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlayForSpecific_projectSearchIds(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}

		});
	}

	////////////////////////////////////////////////////////

	/**
	 * 
	 */
	_openOverlayAfterLoadData() {

		const objectThis = this;

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId : this._proteinSequenceVersionId });
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		//  Create links to external resources
		const linksToExternalResources = this._createLinksToExternalResources( { proteinSequenceString } );

		const proteinSummaryStatistics = {
			sequenceCoverageAsPercent : this._computeSequenceCoverageAsPercent(),
			psmCount : this._computeTotalPsmCount({})
		};
		
		const $contentDiv = this._createModalOverlayContentDiv( { proteinSummaryStatistics, linksToExternalResources } );

		this._createSingleProteinModalOverlay( { $contentDiv } );

		this._contentDivHTMLElement = $contentDiv[0];

		this._resize_OverlayHeight_BasedOnViewportHeight();

		if ( this._saveView_dataPages ) {
			//  Set up handle the "Save View" Button in this Single PRotein Overlay

			const $selector_save_view_root_container__single_protein = $contentDiv.find(".selector_save_view_root_container__single_protein");
			if ( $selector_save_view_root_container__single_protein.length === 0 ) {
				throw Error("Fail find DOM element with class 'selector_save_view_root_container__single_protein'");
			}
			$selector_save_view_root_container__single_protein.show();
			const selector_save_view_root_container__single_proteinDOMElement = $selector_save_view_root_container__single_protein[0];

			this._saveView_dataPages.initialize({ projectSearchIds : this._projectSearchIds, container_DOM_Element : selector_save_view_root_container__single_proteinDOMElement, enableSetDefault : false });
		}

		if ( this._sharePage_dataPages ) {
			//  Set up handle the "Save View" Button in this Single PRotein Overlay

			const $selector_share_page_root_container__single_protein = $contentDiv.find(".selector_share_page_root_container__single_protein");
			if ( $selector_share_page_root_container__single_protein.length === 0 ) {
				throw Error("Fail find DOM element with class 'selector_share_page_root_container__single_protein'");
			}
			$selector_share_page_root_container__single_protein.show();
			const selector_share_page_root_container__single_proteinDOMElement = $selector_share_page_root_container__single_protein[0];

			this._sharePage_dataPages.initialize({ projectSearchIds : this._projectSearchIds, container_DOM_Element : selector_share_page_root_container__single_proteinDOMElement });
		}

		this._resizeWindow_Handler_Attach();

		this._searchDetailsAndFilterBlock_MainPage.populatePage();
		
		this._attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } );

		/// Modification Display and Selection

		{
			const callbackMethodForSelectedChangeBoundThis = this._callbackMethodForSelectedModificationsChange.bind(this);

			const modificationMassTransformer = { //  Transform Modification Mass function passed to ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
				transformMass_ReturnNumber : function({ mass }) {
					return objectThis._roundModificationMass_ReturnNumber_LocalFunction({ mass });  // Call external function
				}
			}

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = new ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect(
				{
					modificationMassTransformer : modificationMassTransformer, // Provide Modification mass transformer to round the mod pas
					rootDisplayJquerySelector : ".selector_protein_mod_list_block",
					projectSearchIds : this._projectSearchIds,
					proteinSequenceVersionId : this._proteinSequenceVersionId,
					loadedDataCommonHolder : this._loadedDataCommonHolder, 
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
					callbackMethodForSelectedChange : callbackMethodForSelectedChangeBoundThis
				});

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.initialize({ 
				proteinNameDescription : this._proteinNameDescription,
				encodedStateData : this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData() });

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.modListDisplay();
		}

		//////

		{  //   Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

			//    Modification Mass Info for display

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
			const variableModificationMassesForProteinPositions = this._get_variableModificationMasses_All_OnProteinByPosition();

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
			let staticModificationMassesForProteinPositions = this._get_staticModificationMasses_All_OnProteinByPosition();

			let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
			if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
				variableModificationMassesToFilterOn = undefined;
			}

			let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
			if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
				staticModificationMassesToFilterOn = undefined;
			}

			//  Save on object for future use
			this._variableModificationMassesForProteinPositions = variableModificationMassesForProteinPositions;
			this._staticModificationMassesForProteinPositions = staticModificationMassesForProteinPositions;
			this._variableModificationMassesToFilterOn = variableModificationMassesToFilterOn;
			this._staticModificationMassesToFilterOn = staticModificationMassesToFilterOn;

			//  Sequence coverage for all peptides for this protein (no apply Mod mass or Protein Position filters)

			const widget_SequenceCoverageParam_All_Peptides = this._get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters();

			//  DOM element to put widget in

			const $selector_protein_sequence_container = $contentDiv.find(".selector_protein_sequence_container");
			if ($selector_protein_sequence_container.length === 0) {
				throw Error("No element with class 'selector_protein_sequence_container'");
			}

			const proteinSequenceContainerHTML_Element = $selector_protein_sequence_container[0];

			const callbackMethodForSelectedProteinSequenceChangeBoundThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

			this._proteinSequenceFormattedDisplay_Main_displayWidget = new ProteinSequenceFormattedDisplay_Main_displayWidget(
				{
					proteinSequenceString,
					variableModificationMassesForProteinPositions,
					staticModificationMassesForProteinPositions,
					variableModificationMassesToFilterOn,
					staticModificationMassesToFilterOn,
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
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() || selectedProteinSequencePositions ) { 
				//   Set Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.set_initial_widget_SequenceCoverageParam_Selected_Peptides({ initial_widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			}

			this._proteinSequenceFormattedDisplay_Main_displayWidget.initialize();

			this._proteinSequenceFormattedDisplay_Main_displayWidget.renderOnPage();
		}

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_computeSequenceCoverageAsPercent() {

		let proteinLength = undefined;
		
		const proteinCoverageCombined = new Set();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			
			if ( proteinCoverageObject === undefined ) {
				//  No proteinCoverageObject found for this projectSearchId and proteinSequenceVersionId
				continue;  //  EARLY CONTINUE
			}

			const proteinLengthForSearch = proteinCoverageObject.getProteinLength();
		
			if ( proteinLength === undefined ) {
				proteinLength = proteinLengthForSearch;
			} else if ( proteinLength !== proteinLengthForSearch ) {
				throw Error("Protein Length does not match across searches. current projectSearchId: " + projectSearchId );
			}

			for ( let position = 1; position <= proteinLength; position++ ) {
				if ( proteinCoverageObject.isProteinCoverageAtPosition({ position }) ) {
					proteinCoverageCombined.add( position );
				}
			}
		}
		if ( proteinLength === undefined ) {
			throw Error("No proteinCoverageObject found for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		const proteinCoverageRatio = proteinCoverageCombined.size / proteinLength;
		const sequenceCoverageAsPercent = ( proteinCoverageRatio * 100 ).toFixed( 1 );

		return sequenceCoverageAsPercent;
	}

	/**
	 * 
	 */
	_computeTotalPsmCount() {

		let totalPsmCount = 0;

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			//  reportedPeptideIds for proteinSequenceVersionId
			let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( this._proteinSequenceVersionId );
		
			if ( reportedPeptideIds && ( reportedPeptideIds.length !== 0 ) ) {
				for ( let reportedPeptideId of reportedPeptideIds ) {

					let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get( reportedPeptideId );
									
					if ( numberOfPSMsForReportedPeptide !== undefined || numberOfPSMsForReportedPeptide !== null ) {

						totalPsmCount += numberOfPSMsForReportedPeptide;
					}
				}
			}
		}

		return totalPsmCount;
	}

	/**
	 * 
	 */
	_getPeptideSequencesForPeptideIds() {

		//   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
		const peptideIdsToLoadSequencesForMap_Key_PeptideId = new Map();

		const loadedDataCommonHolder = this._loadedDataCommonHolder;

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

			if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
				// No data for this projectSearchId
				continue; // early continue
			}
			//  reportedPeptideIds for this proteinSequenceVersionId
			const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			
			if ( ! reportedPeptideIds ) {
				// No data for this projectSearchId and this _proteinSequenceVersionId
				continue; // early continue
			}
	
			for ( const reportedPeptideId of reportedPeptideIds ) {

				const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
				if ( ! peptideId ) {
					throw Error("_getPeptideSequencesForPeptideIds: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds );
				}

				if ( ! loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } ) ) {
					if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {
						peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId, peptideId } );
					}
				}
			}
		}
		if ( peptideIdsToLoadSequencesForMap_Key_PeptideId.size === 0 ) {
			//  No peptide sequence to load so return null
			return null; // EARLY EXIT
		}

		//  Re-order by projectSearchId

		//   Map<projectSearchId,[{ reportedPeptideId, projectSearchId, peptideId }]>
		const peptideIdsToLoadSequencesForMap_Key_ProjectSearchId = new Map();

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_PeptideId.entries() ) {

			const mapEntryValue = mapEntry[ 1 ];
			const projectSearchId = mapEntryValue.projectSearchId;

			let newMapEntryForProjectSearchId = peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.get( projectSearchId );
			if ( ! newMapEntryForProjectSearchId ) {
				newMapEntryForProjectSearchId = new Array();
				peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.set( projectSearchId, newMapEntryForProjectSearchId );
			}
			newMapEntryForProjectSearchId.push( mapEntryValue );
		}

		//  Retrieve peptide strings on a per projectSearchId basis

		const promiseArray_GetPeptideSequences = [];

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const entriesFor_projectSearchId = mapEntry[ 1 ];

			const promise_per_projectSearchIdProcessing = this._getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId } );
			promiseArray_GetPeptideSequences.push( promise_per_projectSearchIdProcessing );
		}

		return Promise.all( promiseArray_GetPeptideSequences );
	}

	/**
	 * goes with fcn _getPeptideSequencesForPeptideIds
	 */
	_getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId } ) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				//  Create array of reportedPeptideIds to get Peptide Sequences for
				const reportedPeptideIds = [];
				for ( const entry of entriesFor_projectSearchId ) {
					reportedPeptideIds.push( entry.reportedPeptideId );
				}

				const promise_getPeptideSequenceStringsFromReportedPeptideIds =
					ProteinViewDataLoader.getPeptideSequenceStringsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } );

				promise_getPeptideSequenceStringsFromReportedPeptideIds.catch((reason) => {});

				promise_getPeptideSequenceStringsFromReportedPeptideIds.then(({ peptideSequenceString_PeptideId_MappingList, foundAllReportedPeptideIdsForProjectSearchId }) => {
					try {
						if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
							throw Error("In _getPeptideSequencesAndProcess: foundAllReportedPeptideIdsForProjectSearchId is false");
							reject();
						}

						objectThis._process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, projectSearchId } );

						resolve();
						
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				})
			} catch( e ) {
				console.log("Exception caught in New Promise in _getPeptideSequencesAndProcess(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, projectSearchId } ) {

		for ( const entry of peptideSequenceString_PeptideId_MappingList ) {

			this._loadedDataCommonHolder.add_peptideSequenceString_KeyPeptideId( { peptideSequenceString : entry.peptideSequence, peptideId : entry.peptideId } );
		}
	}

	/**
	 * All Variable modification masses by protein position
	 * 
	 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	 */
	_get_variableModificationMasses_All_OnProteinByPosition() {

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
		const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

		{
			//  Start with Map of Sets to remove duplicates
			const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

			for ( const projectSearchId of this._projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
				const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		
				if ( dynamicModificationsOnProtein ) {

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
						//  Round mass since Multiple Search
						const roundedMass = this._roundModificationMass_ReturnNumber_LocalFunction({ mass });
						massesAtPosition.add( roundedMass );
					}
				}
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
	 * All Static modification masses by protein position
	 * 
	 * Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  
	 * 		 Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >
	 * 
	 * Match format from loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
	 * 
	 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	 */
	_get_staticModificationMasses_All_OnProteinByPosition() {

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
		// Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet: Set< mass (number)> >
		const modsOnProteinByPosition = new Map(); 

		{
			for ( const projectSearchId of this._projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
				const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
				if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
					//  no data for project search id
					continue;  //  EARLY CONTINUE
				}
				const staticModificationMassesForProteinPositions = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
				if ( ! staticModificationMassesForProteinPositions ) {
					//  no data for proteinSequenceVersionId for project search id
					continue;  //  EARLY CONTINUE
				}

				for ( const mapEntry of staticModificationMassesForProteinPositions.entries() ) {
					//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

					//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

					const position = mapEntry[ 0 ];
					const dataForPosition = mapEntry[ 1 ];

					let resultDataForPosition = modsOnProteinByPosition.get( position );

					if ( ! resultDataForPosition ) {

						resultDataForPosition = { residue : dataForPosition.residue, massesSet : new Set() };
						modsOnProteinByPosition.set( position, resultDataForPosition );
					}

					//  Copy all masses from entry for project search id to output Set
					//     Round the mass since Multiple Search
					for ( const mass of dataForPosition.massesSet ) {
						const roundedMass = this._roundModificationMass_ReturnNumber_LocalFunction({ mass });
						resultDataForPosition.massesSet.add( roundedMass );
					}
				}
				
			}

			//  Sort masses at each position
			for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition.entries() ) {
				const position = modsOnProteinByPositionEntry[ 0 ];
				const dataForPosition = modsOnProteinByPositionEntry[ 1 ];
				const massesAtPositionArray = Array.from( dataForPosition.massesSet );
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
				dataForPosition.massesArray = massesAtPositionArray;
			}
		}

		return modsOnProteinByPosition;
	}

	/**
	 * Get Sequence coverage for All Peptides.  Does not reflect User Modification or or Protein Sequence Position Selections 
	 * 
	 * This does NOT USE: user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters() {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;

		const coverageArrayOfBooleanPerProjectSearchId = [];

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			//  Sequence Coverage Data
			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! proteinCoverageObject ) {
				// No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
				continue; //  EARLY CONTINUE
			}

			const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();
			coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
		}

		if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
			const msg = "No proteinCoverageObject objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
			console.log( msg );
			throw Error( msg );
		}

		const coverageArrayOfBoolean = [];

		for ( const coverageArrayOfBooleanThisProjectSearchId of coverageArrayOfBooleanPerProjectSearchId ) {
			for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
				if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
					coverageArrayOfBoolean[ index ] = true;
				}
			}
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : coverageArrayOfBoolean });
		
		return widget_SequenceCoverageParam;
	}

	/**
	 * Uses the user selected modifications and sequence positions to compute the sequence coverage
	 * 
	 * Combine coverages for the searches
	 * 
	 * Create ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam object to pass to Protein Sequence widget
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions() {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;

		const coverageArrayOfBooleanPerProjectSearchId = [];


		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}


		if ( ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() ) && ( ! selectedProteinSequencePositions ) ) {

			//  No Modification or Protein Sequence Positions Selected so use existing computed sequence coverage

			for ( const projectSearchId of this._projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				//  Sequence Coverage Data
				const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

				//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
				const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
				if ( ! proteinCoverageObject ) {
					// No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
					continue; //  EARLY CONTINUE
				}

				const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();
				coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
			}

			if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
				const msg = "No proteinCoverageObject objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
				console.log( msg );
				throw Error( msg );
			}
		} else {

			//  Modification or Protein Sequence Positions Selected so compute sequence coverage

			const reportedPeptideIdsForDisplay_AllProjectSearchIds = this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

			for ( const projectSearchId of this._projectSearchIds ) {

				const reportedPeptideIdsForDisplay = reportedPeptideIdsForDisplay_AllProjectSearchIds.get( projectSearchId );

				if ( ! reportedPeptideIdsForDisplay ) {
					// No reportedPeptideIdsForDisplay for this projectSearchId so skip to next projectSearchId
					continue; //  EARLY CONTINUE
				}

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				const coverageArrayOfBooleanThisProjectSearchId = this._get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ 
					reportedPeptideIds : reportedPeptideIdsForDisplay, loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } );

				coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
			}

			if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
				const msg = "No reportedPeptideIdsForDisplay objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
				console.log( msg );
				throw Error( msg );
			}
		}

		const coverageArrayOfBoolean = [];

		for ( const coverageArrayOfBooleanThisProjectSearchId of coverageArrayOfBooleanPerProjectSearchId ) {
			for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
				if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
					coverageArrayOfBoolean[ index ] = true;
				}
			}
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : coverageArrayOfBoolean });
		
		return widget_SequenceCoverageParam;
	}


	/**
	 * Create links to external resources
	 */
	_createLinksToExternalResources( { proteinSequenceString } ) {

		const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
		const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
		
		const proteinNames_URI_Encoded_Set = new Set();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

			let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			if ( proteinInfo ) {
				const annotations = proteinInfo.annotations;
				if ( annotations ) {
					for ( const annotation of annotations ) {
						const name = annotation.name;
		//				const description = annotation.description;
		//				const taxonomy = annotation.taxonomy;
						const proteinName_URI_Encoded = window.encodeURIComponent( name );
						proteinNames_URI_Encoded_Set.add( proteinName_URI_Encoded );
					}
				}
			}
		}

		if ( proteinNames_URI_Encoded_Set.size === 0 ) {
			throw Error("No Protein names found for any searches.");
		}

		const proteinNames_URI_Encoded_Array = Array.from( proteinNames_URI_Encoded_Set );

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

	////////////////////////////

	//    Display of User Selected Modifications and Protein Positions

	/**
	 * 
	 */
	_updateUserModificationProteinPositionSelectionDisplay() {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $selector_modifications_protein_positions_filtering_listing = $contentDiv.find(".selector_modifications_protein_positions_filtering_listing");
		if ( $selector_modifications_protein_positions_filtering_listing.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_modifications_protein_positions_filtering_listing'");
		}

		$selector_modifications_protein_positions_filtering_listing.empty();

		//  Selected Protein Positions:

		const selectedProteinSequencePositionsDisplay = this._userSelectionDisplay_GetProteinPositionsFormatted();

		const selectedModificationsMasses = this._userSelectionDisplay_GetModificationsFormatted();

		if ( selectedProteinSequencePositionsDisplay || selectedModificationsMasses ) {
			const context = {
				selectedProteinSequencePositions : selectedProteinSequencePositionsDisplay,
				selectedModificationsMasses : selectedModificationsMasses
			};
			const html = this._protein_page_single_protein_user_filter_selection_template_Template( context );
			$selector_modifications_protein_positions_filtering_listing.append( html );

			const $selector_clear_user_selection_modifications_protein_positions = $selector_modifications_protein_positions_filtering_listing.find(".selector_clear_user_selection_modifications_protein_positions");
			if ( $selector_clear_user_selection_modifications_protein_positions.length === 0 ) {
				throw Error("Failed to find DOM element with class 'selector_clear_user_selection_modifications_protein_positions'");
			}

			const objectThis = this;

			$selector_clear_user_selection_modifications_protein_positions.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._clearUserSelection_modificationAndProteinPositions();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});	
		}
	}

	/**
	 * Get User Selected Protein Positions
	 */
	_userSelectionDisplay_GetProteinPositionsFormatted() {

		const selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( ( ! selectedProteinSequencePositions ) || selectedProteinSequencePositions.size === 0 ) {
			//  Noting selected
			return undefined; // EARLY EXIT
		}
	
		const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositions );

		selectedProteinSequencePositionsArray.sort( function( a, b ) {
			//  Sort Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});

		//  Create position list using toString()
		const selectedProteinSequencePositionsFormattedArray = [];
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositionsArray ) {
			const selectedProteinSequencePositionFormatted = selectedProteinSequencePosition.toString();
			selectedProteinSequencePositionsFormattedArray.push( selectedProteinSequencePositionFormatted );
		}

		return this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsFormattedArray });
	}

	/**
	 * Get User Selected Modifications Formatted
	 */
	_userSelectionDisplay_GetModificationsFormatted() {

		//  Variable and Static Modifications Selected

		const noModificationSelected = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoVariableModificationSelected();
		let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
		if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
			variableModificationMassesToFilterOn = undefined;
		}
		let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
		if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
			staticModificationMassesToFilterOn = undefined;
		}

		//  Save on object for future use
		this._variableModificationMassesToFilterOn = variableModificationMassesToFilterOn;
		this._staticModificationMassesToFilterOn = staticModificationMassesToFilterOn;


		if ( ! noModificationSelected && ( ! variableModificationMassesToFilterOn ) && ( ! staticModificationMassesToFilterOn  ) ) {
			//  Noting selected
			return undefined; // EARLY EXIT
		}

		const result = {};

		if ( noModificationSelected ) {
			result.noModificationSelected = true;
		}

		const modsFilteringOnForDisplayArray = [];

		if ( variableModificationMassesToFilterOn ) {
			//  Have Variable Mod Mass selected so add to display array
			this._userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
		}
		if ( staticModificationMassesToFilterOn ) {
			//  Have Static Mod Mass selected so add to display array
			this._userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
		}

		if ( modsFilteringOnForDisplayArray.length !== 0 ) {
			result.modificationMassesVariableStatic = this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : modsFilteringOnForDisplayArray });
		}

		return result;
	}

	/**
	 * Add User Selected Variable Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		const modificationsSelectedArray = Array.from( variableModificationMassesToFilterOn );

		if ( modificationsSelectedArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedArray[ 0 ].toString(); 
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
		}

		// Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

		modificationsSelectedArray.sort( function( a, b ) {
			//  Sort Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});

		//  Add to list using toString()
		for ( const modification of modificationsSelectedArray ) {
			const modificationFormatted = modification.toString();
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * Add User Selected Static Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		//  staticModificationMassesToFilterOn is Map<String (Residue), Set< Number ( Mod Mass ) >>

		const modificationsSelectedEntriesArray = [];

		for ( const entry of staticModificationMassesToFilterOn.entries() ) {

			const residue = entry[ 0 ];
			const modMasses = entry[ 1 ];

			for ( const modMass of modMasses ) {
				const modificationSelectedEntry = { residue : residue, modMass : modMass };
				modificationsSelectedEntriesArray.push( modificationSelectedEntry );
			} 
		}

		if ( modificationsSelectedEntriesArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedEntriesArray[ 0 ].modMass.toString() + " (" + modificationsSelectedEntriesArray[ 0 ].residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
		}

		// Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

		modificationsSelectedEntriesArray.sort( function( a, b ) {
			//  Sort Ascending on Mod Mass then Residue
			if ( a.modMass < b.modMass ) {
				return -1;
			}
			if ( a.modMass > b.modMass ) {
				return 1;
			}
			if ( a.residue < b.residue ) {
				return -1;
			}
			if ( a.residue > b.residue ) {
				return 1;
			}
			return 0;
		});

		//  Add to list using toString()
		for ( const modification of modificationsSelectedEntriesArray ) {
			const modificationFormatted = modification.modMass.toString() + " (" + modification.residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * put in comma delim string with ' or ' before last entry
	 */
	_userSelectionDisplay_CombineArrayIntoFormattedString({ array }) {

		const numEntries = array.length;

		if ( numEntries === 1 ) {
			//  Single Element so return
			return array[ 0 ]; // EARLY RETURN
		}

		//  > 1 entry so format with Comma Delim except before last entry.  Put ' or ' before last entry

		const lastEntryIndex = numEntries - 1;
		const allEntriesButLast = array.slice( 0, lastEntryIndex );

		let allEntriesButLastCommaDelim = allEntriesButLast.join(", ");
		
		const result = allEntriesButLastCommaDelim + " or " + array[ lastEntryIndex ];
		return result;
	}

	///////////////////////////////////////////

	//  Handle Updates to User selection of Modifications and Protein Positions

	//   Click Handler for Clear All selections

	/**
	 * 
	 */
	_clearUserSelection_modificationAndProteinPositions() {

		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.clear_selectedModifications();
		this._proteinSequenceFormattedDisplay_Main_displayWidget.clear_selectedProteinSequencePositions();

		this._handleSelectedModificationsChange();
		this._handleSelectedProteinPositionsChange();
		this._updatePageForSelectionModificationProteinPositionChangeChange();
	}

	//  Callbacks for Updates to User selection of Modifications and Protein Positions

	/**
	 * 
	 */
	_callbackMethodForSelectedModificationsChange() {

		this._handleSelectedModificationsChange();
		this._updatePageForSelectionModificationProteinPositionChangeChange();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedProteinSequenceChange( params ) {

		let newSelection = undefined;
		if ( params ) {
			newSelection = params.newSelection;
		}

		this._handleSelectedProteinPositionsChange();
		this._updatePageForSelectionModificationProteinPositionChangeChange();
	}

	//  Handling Specific Changes by updating the URL


	/**
	 * 
	 */
	_handleSelectedModificationsChange() {

		const modsSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
	}

	/**
	 * 
	 */
	_handleSelectedProteinPositionsChange() {

		const widgetEncodedStateData = this._proteinSequenceFormattedDisplay_Main_displayWidget.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );
	}

	//  Updating Page for Altered Selection Change: 

	/**
	 * 
	 */
	_updatePageForSelectionModificationProteinPositionChangeChange() {

		{
			let variableModificationSelectionUnmodifiedSelected = undefined;
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoVariableModificationSelected() ) {
				variableModificationSelectionUnmodifiedSelected = true;
			}
			let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
			if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
				variableModificationMassesToFilterOn = undefined;
			}
			let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
			if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
				staticModificationMassesToFilterOn = undefined;
			}


			//  Save on object for future use
			this._variableModificationMassesToFilterOn = variableModificationMassesToFilterOn;
			this._staticModificationMassesToFilterOn = staticModificationMassesToFilterOn;


			//  Update Protein Sequence Display Widget with mods to display
			this._proteinSequenceFormattedDisplay_Main_displayWidget.update_modificationMassesToFilterOn( { variableModificationSelectionUnmodifiedSelected, variableModificationMassesToFilterOn, staticModificationMassesToFilterOn } );

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() || 
					this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() || 
					selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}
		}

		this._updateUserModificationProteinPositionSelectionDisplay();

		this._createOrReplaceReportedPeptideList();
	}

	
	///////////////////////////////////////////

	/**
	 * 
	 */
	_createOrReplaceReportedPeptideList() {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $reported_peptides_outer_container = $contentDiv.find(".selector_reported_peptides_outer_container");
		if ( $reported_peptides_outer_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'reported_peptides_outer_container'");
		}

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createOrUpdateReportedPeptideDisplayData(
			{
				reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
				variableModificationMassesToFilterOn : this._variableModificationMassesToFilterOn,
				staticModificationMassesToFilterOn : this._staticModificationMassesToFilterOn,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchIds : this._projectSearchIds,
				$reported_peptides_outer_container
			});
		
		this._showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } );
	}
	
	/**
	 * 
	 */
	_createModalOverlayContentDiv( { proteinSummaryStatistics, linksToExternalResources } ) {

		const summaryStatisticsDisplay = { // TODO  FAKE for now
			sequenceCoverageAsPercent : proteinSummaryStatistics.sequenceCoverageAsPercent,
			peptideCountDisplay : "", //  Not computed yet TODO
			uniquePeptideCountDisplay : "", //  Not computed yet TODO
			psmCountDisplay : proteinSummaryStatistics.psmCount.toLocaleString(),
		};

		let contentDivHTML = 
			this._protein_page_single_protein_display_in_overlay_template_Template({
				proteinData : this._proteinNameDescription,
				summaryStatistics :  summaryStatisticsDisplay,
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

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds({ not_filtered_position_modification_selections : true });

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchIds : this._projectSearchIds
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( { clickThis, eventObject } ) {
		
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchIds : this._projectSearchIds
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

		//  Data in Map
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds({ not_filtered_position_modification_selections : true });

		//  Transfer Map into Object for serializing to JSON

		const reportedPeptideIdsPerProjectSearchId = {};

		for ( const mapEntry of reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const reportedPeptideIdsForDisplayData = mapEntry[ 1 ];
			reportedPeptideIdsPerProjectSearchId[ projectSearchId ] = reportedPeptideIdsForDisplayData; //  Object since serializing to JSON, property name is projectSearchId
		}			

		if ( Object.keys( reportedPeptideIdsPerProjectSearchId ).length === 0 ) {
			throw Error("_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId 
					+ ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		this._downloadPsms( { reportedPeptideIdsPerProjectSearchId } );
	}

	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_Shown( { clickThis, eventObject } ) {

		//  Data in Map
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		//  Transfer Map into Object for serializing to JSON

		const reportedPeptideIdsPerProjectSearchId = {};

		for ( const mapEntry of reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const reportedPeptideIdsForDisplayData = mapEntry[ 1 ];
			reportedPeptideIdsPerProjectSearchId[ projectSearchId ] = reportedPeptideIdsForDisplayData; //  Object since serializing to JSON, property name is projectSearchId
		}			

		if ( Object.keys( reportedPeptideIdsPerProjectSearchId ).length === 0 ) {
			throw Error("_downloadPsmsClickHandler_Shown: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId 
					+ ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		this._downloadPsms( { reportedPeptideIdsPerProjectSearchId } );
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 * 
	 * @param reportedPeptideIdsPerProjectSearchId -  Object since serializing to JSON, property name is projectSearchId
	 */
	_downloadPsms( { reportedPeptideIdsPerProjectSearchId } ) {
		
		const searchDataLookupParamsRoot = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
			projectSearchIds : this._projectSearchIds,
			searchDataLookupParamsRoot : searchDataLookupParamsRoot,
			reportedPeptideIdsPerProjectSearchId : reportedPeptideIdsPerProjectSearchId } );
	}
	
	//////////////

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

		this._resizeWindow_Handler_Remove();

		if ( this._singleProteinCloseCallback ) {
			this._singleProteinCloseCallback();
		}
	}

	//////////////


	/**
	 * 
	 */
	_resizeWindow_Handler_Attach() {

		const objectThis = this;

		//  Attach resize handler
		const $window = $(window);
		$window.on("resize", function() {
			try {
				objectThis._resize_OverlayHeight_BasedOnViewportHeight();

				objectThis._update_Overlay_OnWindowResize();
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_resizeWindow_Handler_Remove() {

		//  Remove resize handler
		const $window = $(window);

		$window.off("resize");
	}
	
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
	 * called by contained object of class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList
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
	 * called by contained object of class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList
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

		if ( ! this._contentDivHTMLElement ) {
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
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 * Uses:
	 * 		this._proteinSequenceFormattedDisplay_Main_displayWidget
	 * 		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
	 * 
	 * @returns Map - < 
	 */
	_getReportedPeptideIdsForDisplay_AllProjectSearchIds( params ) {

		let not_filtered_position_modification_selections = undefined;
		if ( params ) {
			not_filtered_position_modification_selections = params.not_filtered_position_modification_selections;
		}

		let proteinSequenceFormattedDisplay_Main_displayWidget = undefined;
		let proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = undefined;

		if ( ! not_filtered_position_modification_selections ) {
			proteinSequenceFormattedDisplay_Main_displayWidget = this._proteinSequenceFormattedDisplay_Main_displayWidget;
			proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect;
		}

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = new Map();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
			}

			const reportedPeptideIdsForDisplay =
				this._getReportedPeptideIdsForDisplay_SpecificProjectSearchId( { 
					proteinSequenceFormattedDisplay_Main_displayWidget, 
					proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
					loadedDataPerProjectSearchIdHolder, 
					projectSearchId } );

			reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.set( projectSearchId, reportedPeptideIdsForDisplay );
		}

		return reportedPeptideIdsForDisplay_Map_KeyProjectSearchId;
	}
	
	// /**
	//  * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	//  * 
	//  * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	//  * 
	//  * Uses:
	//  * 		this._proteinSequenceFormattedDisplay_Main_displayWidget
	//  * 		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
	//  * 
	//  * @returns empty array if no reportedPeptideIds for proteinSequenceVersionId for projectSearchId
	//  */
	// _getReportedPeptideIdsForDisplay_SpecificProjectSearchId( { 
	// 	not_filtered_position_modification_selections, 
	// 	loadedDataPerProjectSearchIdHolder,
	// 	proteinSequenceVersionId, 
	// 	projectSearchId } ) {

	///////////////////////////////////////////
	///////////////////////////////////////////

	
	/**
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 * Uses:
	 * 		this._proteinSequenceFormattedDisplay_Main_displayWidget
	 * 		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
	 * 
	 * @returns empty array if no reportedPeptideIds for proteinSequenceVersionId for projectSearchId
	 */
	_getReportedPeptideIdsForDisplay_SpecificProjectSearchId( { 
		not_filtered_position_modification_selections, 
		loadedDataPerProjectSearchIdHolder,
		projectSearchId } ) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds_All ) {
			throw Error("_getReportedPeptideIdsForDisplay: No reportedPeptideIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
		}


		if ( not_filtered_position_modification_selections ) {

			// Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		if ( ( ! selectedProteinSequencePositions ) && 
				( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() ) &&
				( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) ) {

			// No User Selections so NO Filtering based on User Selections

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		if ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() &&
			( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() )  ) {

			// no Variable or Static Modification Selections

			if ( selectedProteinSequencePositions ) {
				//  Protein Position Selections
				return this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder })
			}
			throw Error("Should not get here: No variable or static modification selection and no selectedProteinSequencePositions.")
		}

		if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() &&
			 ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() ) && ( ! selectedProteinSequencePositions ) ) {

			//  Only Static Mods Selected so return 

			const reportedPeptideIds_FilteredOnStaticModificationsSelected = this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder });

			return Array.from( reportedPeptideIds_FilteredOnStaticModificationsSelected ); // EARLY RETURN
		}

		//  Is 'unmodified' Variable Modification selected
		const noModificationSelected = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoVariableModificationSelected();
		if ( noModificationSelected ) {
			// Modification Section Selection: 'unmodified'
			if ( selectedProteinSequencePositions ) {
				//  Also have Protein Position Selections

				if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) {
					//  Also have Static Modifications Selected

					return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection_Yes_ProteinPositionsSelected_Yes_StaticModificationsSelected({ reportedPeptideIds_All, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
				}
				
				return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection_Yes_ProteinPositionsSelected_No_StaticModificationsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
			}

			return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder });
		}

		//  Have Modification Section Selection of Modification Masses

		const variableModificationsSelected_ExcludingNoModificationOption = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();

		if ( ! variableModificationsSelected_ExcludingNoModificationOption || variableModificationsSelected_ExcludingNoModificationOption.length === 0 ) {
			throw Error("variableModificationsSelected_ExcludingNoModificationOption cannot be not set or empty at this point");
		}

		if ( selectedProteinSequencePositions ) {
			// Have Modification Section Selection of Modification Masses AND Protein Position Selections
			return this._getReportedPeptideIdsForDisplay_VariableModificationMassesSelected_And_ProteinPositionsSelected({ variableModificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
		}

		return this._getReportedPeptideIdsForDisplay_VariableModificationMassesSelected({ variableModificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder });
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Protein Positions - No Static or Variable Modifications Selections
	 */
	_getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		if ( ! selectedProteinSequencePositions ) {
			//  No positions to select
			return []; // EARLY EXIT
		}
		if ( selectedProteinSequencePositions.length === 0 || selectedProteinSequencePositions.size === 0 ) {
			//  No positions to select, Array or Set
			return []; // EARLY EXIT
		}

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
	 * User has selected entry(s) in the Static Modification mass filter section
	 * 
	 * @returns Set of reportedPeptideIds that meet the Static Modifications Filter
	 */	
	_get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder }) {

		//  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

		const proteinsPositionsToGetReportedPeptideIdsFor = new Set();

		//  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
		const staticModificationMassesSelected = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();

		const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
		if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
			//  No Static mods so return;
			return [];  //  EARLY EXIT
		}
		const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! staticModificationsOnProtein ) {
			//  No Static mods so return;
			return [];  //  EARLY EXIT
		}

		for ( const staticModificationMassesSelected_Entry of staticModificationMassesSelected.entries() ) {

			const selectedResidue = staticModificationMassesSelected_Entry[ 0 ];
			const selectedModificationMasses = staticModificationMassesSelected_Entry[ 1 ];

			//  Search through Static Masses per position to get positions
			for ( const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries() ) {

				const position = staticModificationsOnProteinEntry[ 0 ];
				const staticModificationsAtPosition = staticModificationsOnProteinEntry[ 1 ];

				if ( staticModificationsAtPosition.residue === selectedResidue ) {
					for ( const selectedModificationMass of selectedModificationMasses ) {
						let foundMatchingMassForPosition = false;
						// Change from:  if ( staticModificationsAtPosition.massesSet.has( selectedModificationMass ) ) {
							//  Since have to round
						for ( const massForPosition of staticModificationsAtPosition.massesSet ) { 
							const massForPositionRounded = this._roundModificationMass_ReturnNumber_LocalFunction({ mass : massForPosition});
							if ( massForPositionRounded === selectedModificationMass ) {
								proteinsPositionsToGetReportedPeptideIdsFor.add( position );
								foundMatchingMassForPosition = true;
								break;
							}
						}
						if ( foundMatchingMassForPosition ) {
							break;
						}
					}
				}
			}
		}

		if ( proteinsPositionsToGetReportedPeptideIdsFor.size === 0 ) {
			//  No Static mods for selection so return;
			return [];  //  EARLY EXIT
		}

		return this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions : proteinsPositionsToGetReportedPeptideIdsFor, loadedDataPerProjectSearchIdHolder });
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected 'unmodified' in the Variable Modification mass filter section
	 * 
	 * Also Add In Static Modifications Selected if set (UNION with 'unmodified' Reported Peptide Ids)
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) {
			//  Add In Static Mods Selection
			const reportedPeptideIds_FilteredOnStaticModificationsSelected = this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder });
			if ( reportedPeptideIds_FilteredOnStaticModificationsSelected ) {
				for ( const reportedPeptideId of  reportedPeptideIds_FilteredOnStaticModificationsSelected ) {
					reportedPeptideIdsSelection.add( reportedPeptideId );
				}
			}
		}

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
	 * User has selected 'unmodified' un the modification mass filter section AND User has selected Protein Positions
	 * 
	 * User has not selected any Static Modifications
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection_Yes_ProteinPositionsSelected_No_StaticModificationsSelected({ 
		
		selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

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
	 * User has selected 'unmodified' in the Variable Modification mass filter section
	 *    AND User has Selected Static Modifications
	 *    AND User has selected Protein Positions
	 * 
	 * For Static Modifications Selected, follow same as variable mods and selected position rules of if any mod at position, ...
	 * 
	 * UNION 'unmodified' Reported Peptide Ids with Static Modifications Selected 
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificationMassSection_Yes_ProteinPositionsSelected_Yes_StaticModificationsSelected({ 
		
		reportedPeptideIds_All, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds - method result

		// 1)  Create unmodified Set of Reported Peptide Ids

		// 2)  Create Static Mods Set of Reported Peptide Ids

		// 3)  Process Reported Peptide Ids at selected positions

		//  Create unmodified Set of Reported Peptide Ids.  Start with all, remove ones with variable modifications

		const reportedPeptideIdsSelectionWithNoVariableModifications = new Set( reportedPeptideIds_All );

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Remove from reportedPeptideIdsSelection any reported peptide ids with modifications (since 'unmodified' chosen)
		if ( dynamicModificationsOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				const position = modificationOnProtein.position;
				// const mass = modificationOnProtein.mass;
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;
				//  Remove from reportedPeptideIdsSelectionWithNoVariableModifications any reported peptide ids with modifications (since 'unmodified' chosen)
				reportedPeptideIdsSelectionWithNoVariableModifications.delete( reportedPeptideId );
			}
		}

		//  Static Mods Selection

		const reportedPeptideIdsFor_Selected_StaticModificationMasses = new Set( this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder }) );

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions, filtering on selected Modifications
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			
			//  Select reported peptide id with coverage at this location 
			//      and has No Variable Modifications or Any selected Static Modification mass at any position

			//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
			const reportedPeptideIdsAtPosition = proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			if ( reportedPeptideIdsAtPosition ) {
				for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

					if ( reportedPeptideIdsSelectionWithNoVariableModifications.has( reportedPeptideIdAtPosition ) ||
							reportedPeptideIdsFor_Selected_StaticModificationMasses.has( reportedPeptideIdAtPosition ) ) {

						reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
					}
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Variable Modification Masses to filter on
	 * 
	 * Also Add In Static Modifications Selected if set (UNION with selected Variable Modification Masses Reported Peptide Ids)
	 * 
	 */
	_getReportedPeptideIdsForDisplay_VariableModificationMassesSelected({ variableModificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) {
			//  Static Mods populated so add in
			const reportedPeptideIds_FilteredOnStaticModificationsSelected = this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder });
			for ( const reportedPeptideId of  reportedPeptideIds_FilteredOnStaticModificationsSelected ) {
				reportedPeptideIdsSelection.add( reportedPeptideId );
			}
		}

		//  Dynamic Modifications ARE same as Variable Modifications
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

				const massRounded = this._roundModificationMass_ReturnNumber_LocalFunction({ mass : mass});

				if ( variableModificationsSelected_ExcludingNoModificationOption.has( massRounded ) ) {

					reportedPeptideIdsSelection.add( reportedPeptideId );
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Variable Modification Masses AND User has selected Protein Positions
	 * 
	 * Also Add In Static Modifications Selected if set (UNION with selected Variable Modification Masses Reported Peptide Ids)
	 * 
		1) If a selected position has ANY Variable (or Static Modifications if any static mods selected) for ANY peptides,
		then the peptide being evaluated has to have at least one of the selected
		Variable or Static Modifications masses to be included in the display.

		2) If a selected position has NO Variable or Static Modifications for any peptides,
		then the peptide being evaluated has to have protein coverage at the selected position 
		and include at least one of the selected modification masses in any position to be included in the display.

		The total reported peptide list is a union of the peptides from evaluating each selected position.
	* 
	 */
	_getReportedPeptideIdsForDisplay_VariableModificationMassesSelected_And_ProteinPositionsSelected({ 
		
		variableModificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds - method result


		//  Build Set of positions contains selected Modification Masses and Set of positions contains any Modification Masses
		const positionContains_Any_ModificationMasses = new Set();  //  Set<position (number)>

		const reportedPeptideIds_at_position_For_Selected_VariableModificationMasses = new Map(); //  Map<position (number), Set<reported peptide id (number) >>

		const reportedPeptideIdsFor_Selected_VariableModificationMasses = new Set(); // Set<reported peptide id (number) >

		{  //  Dynamic Modifications ARE Same as Variable Modifications
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

					const massRounded = this._roundModificationMass_ReturnNumber_LocalFunction({ mass : mass});

					positionContains_Any_ModificationMasses.add( position );
					
					if ( variableModificationsSelected_ExcludingNoModificationOption.has( massRounded ) ) {

						reportedPeptideIdsFor_Selected_VariableModificationMasses.add( reportedPeptideId );

						let reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = reportedPeptideIds_at_position_For_Selected_VariableModificationMasses.get( position );
						if ( ! reportedPeptideIds_For_Selected_ModificationMasses_MapEntry ) {
							reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = new Set();
							reportedPeptideIds_at_position_For_Selected_VariableModificationMasses.set( position, reportedPeptideIds_For_Selected_ModificationMasses_MapEntry );
						}
						reportedPeptideIds_For_Selected_ModificationMasses_MapEntry.add( reportedPeptideId );
					}
				}
			}
		}

		let reportedPeptideIdsFor_Selected_StaticModificationMasses = undefined;

		if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) {  
			//  Static Modification(s) Selected

			reportedPeptideIdsFor_Selected_StaticModificationMasses = new Set( this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder }) );

			const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
			if ( staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
				const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
				if ( staticModificationsOnProtein ) {

					//  Search through Static Masses per position to get positions
					for ( const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries() ) {

						const position = staticModificationsOnProteinEntry[ 0 ];
						// const staticModificationsAtPosition = staticModificationsOnProteinEntry[ 1 ];

						positionContains_Any_ModificationMasses.add( position );
					}
				}
			}
		} else {
			reportedPeptideIdsFor_Selected_StaticModificationMasses = new Set();
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
				
			//  Select reported peptide id with coverage at this location 
			//      and has any selected Variable or Static Modification mass at any position

			//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

				if ( reportedPeptideIdsFor_Selected_VariableModificationMasses.has( reportedPeptideIdAtPosition ) ||
						reportedPeptideIdsFor_Selected_StaticModificationMasses.has( reportedPeptideIdAtPosition ) ) {

					reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	////////////////////////////////////////////
		
		
	/**
	 * Get Protein Sequence Coverage for the Reported Peptide Ids for Display.  
	 * 
	 * @returns proteinCoverageArrayOfBoolean
	 *       proteinCoverageArrayOfBoolean : Array (position is '1' based) of boolean with true for is sequence coverage 
	 */
	_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ reportedPeptideIds, loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } ) {

		const proteinCoverageArrayOfBoolean = []; // function result

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			//  No proteinCoverageObject for this proteinSequenceVersionId for this loadedDataPerProjectSearchIdHolder (projectSearchId)
			return proteinCoverageArrayOfBoolean; // EARLY RETURN
		}

		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

			for ( const reportedPeptideId of reportedPeptideIds ) {
				if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

					for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
						proteinCoverageArrayOfBoolean[ position ] = true;
					}
					break;
				}
			}
		}

		return proteinCoverageArrayOfBoolean;
	}

	////////////////////////////////////////////
		
	//   Modification Mass Rounding to provide some level of commonality between searches

	/**
	 * 
	 */
	_roundModificationMass_ReturnNumber_LocalFunction({ mass }) {
		return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
	}

}
