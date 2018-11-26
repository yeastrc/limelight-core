/**
 * psm_DrilldownRetrieveDisplay.js
 * 
 * Javascript for retrieving PSM data for a projectSearchId and reportedPeptideId
 * and display on the page
 * 
 */



//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


let Handlebars = require('handlebars/runtime');

let _psm_list_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/psm_list/psm_list_template-bundle.js" );

//  module import 

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { loadGoogleChart_CoreChart }  from 'page_js/data_pages/data_pages_common/googleChartLoaderForThisWebapp.js';

import { SpectrumRetrieveAndDisplay_Use_lorikeet } from 'page_js/data_pages/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet.js';


const PSM_DATA_LOADED_DATA_KEY = "PSMS_LOADED";

const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 5;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;



//  Overridden for Specific elements like Chart Title and X and Y Axis labels
const _CHART_DEFAULT_FONT_SIZE = 12;  //  Default font size - using to set font size for tick marks.

const _TITLE_FONT_SIZE = 15; // In PX
const _AXIS_LABEL_FONT_SIZE = 14; // In PX
const _TICK_MARK_TEXT_FONT_SIZE = 14; // In PX


/**
 * 
 */
export class Psm_DrilldownRetrieveDisplay {

	/**
	 * 
	 */
	constructor( { dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing } ) {
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

//		console.log( "Handlebars: " + Handlebars );
//		console.log( "_psm_list_template_bundle: " + _psm_list_template_bundle );

		if ( ! _psm_list_template_bundle.psm_list_table_headers_template ) {
			throw Error("Nothing in _psm_list_template_bundle.psm_list_table_headers_template");
		}
		if ( ! _psm_list_template_bundle.psm_list_table_entry_template ) {
			throw Error("Nothing in _psm_list_template_bundle.psm_list_table_entry_template");
		}

		this._psm_list_table_headers_template_Template = 
			_psm_list_template_bundle.psm_list_table_headers_template;

		this._psm_list_table_entry_template_Template = 
			_psm_list_template_bundle.psm_list_table_entry_template;
		
		this._spectrumRetrieveAndDisplay_Use_lorikeet = new SpectrumRetrieveAndDisplay_Use_lorikeet();
	}
	
	/**
	 * 
	 */
	loadAndDisplayPSMsIfNeeded(  { container, projectSearchId, reportedPeptideId }  ) {
		
		let $container = $( container ); 
		
		let dataLoaded = $container.data( PSM_DATA_LOADED_DATA_KEY );
		
		//  TODO   !!!!!!!!!!  TEMP COMMENT OUT to force always load from server and display
		
		if ( dataLoaded ) {
			return;  //  EARLY EXIT  since data already loaded. 
		}

		this._loadPSMsFromServer( { 
			container : container,
			projectSearchId : projectSearchId,
			reportedPeptideId : reportedPeptideId
		} );
	};
	
	/**
	 * 
	 */
	_loadPSMsFromServer( { container, projectSearchId, reportedPeptideId } ) {
		
		let objectThis = this;
		
		let searchDetails_Filters_AnnTypeDisplay_ForProjectSearchId = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId } );

		let psmAnnotationTypeIdsForSorting =
			this._get_Psm_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } );
		
		let requestObject = {
				projectSearchId : projectSearchId,
				reportedPeptideId : reportedPeptideId,
				searchDataLookupParams_For_Single_ProjectSearchId : searchDetails_Filters_AnnTypeDisplay_ForProjectSearchId,
				psmAnnotationTypeIdsForSorting : psmAnnotationTypeIdsForSorting
		};

		let _URL = "d/rws/for-page/psb/psm-list/" + getWebserviceSyncTrackingCode();

		let requestData = JSON.stringify( requestObject );
		
		console.log("AJAX Call to get PSM List START, Now: " + new Date() );
		
		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					console.log("AJAX Call to get PSM List END, Now: " + new Date() );
					
					objectThis._loadPSMsFromServerResponse( { projectSearchId, requestObject, responseData, container } );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error : function(jqXHR, textStatus, errorThrown) {

				handleAJAXError(jqXHR, textStatus, errorThrown);

				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
				// textStatus: " + textStatus );
			}
		});

	}
	
	/**
	 * 
	 */
	_loadPSMsFromServerResponse( { projectSearchId, requestObject, responseData, container } ) {
		
		this._renderToPage( { projectSearchId, requestObject, responseData, container } );
	}
	
	/**
	 * 
	 */
	_renderToPage( { projectSearchId, requestObject, responseData, container } ) {
		
		let objectThis = this;
		
		let $container = $( container );

		let psmList = responseData.resultList;
		let searchHasScanData = responseData.searchHasScanData;

		$container.empty();

		if (psmList && psmList.length > 0) {

			//  Get AnnotationType records for Displaying Annotation data in display order in psmList
			let annotationTypeRecords_DisplayOrder = this._getAnnotationTypeRecords_DisplayOrder( { projectSearchId, psmList } );
			let psmAnnotationTypesForPsmListEntries_DisplayOrder = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPsmListEntries;
			
			//   Sort PSM Array on PSM Ann Types Sort Order then PSM Id

			/**
			 * Return array ann type entries, sorted on sortOrder
			 */
			let psm_AnnotationTypeRecords_WhereSortOrderPopulated = this._get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

			let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Length = psm_AnnotationTypeRecords_WhereSortOrderPopulated.length;

			psmList.sort( function( a, b ) {

				//  Compare PSM Ann Values, if they are populated
				let a_psmAnnotationMap = a.psmAnnotationMap;
				let b_psmAnnotationMap = b.psmAnnotationMap;
				if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

					for ( let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index < psm_AnnotationTypeRecords_WhereSortOrderPopulated_Length; psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
						let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = psm_AnnotationTypeRecords_WhereSortOrderPopulated[ psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
						let annotationTypeId = psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
						let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
						let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];
						
						if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
							if ( psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
								if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
									return -1;
								}
								if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
									return 1;
								}
								//  Values match so go to next ann type values
							} else if ( psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
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
				

				//  All PSM Ann Type Values match so order on psm id
				if ( a.psmId < b.psmId ) {
					return -1;
				}
				if ( a.psmId > b.psmId ) {
					return 1;
				}
				return 0;

			});

			//////
			
			//  Determine anyPsmsHave_precursor_M_Over_Z and anyPsmsHave_retentionTime
			
			let anyPsmsHave_precursor_M_Over_Z = false; 
			let anyPsmsHave_retentionTime = false;

			psmList.forEach( function( psmListItem, index, array ) {

				if ( psmListItem.precursor_M_Over_Z !== undefined && psmListItem.precursor_M_Over_Z !== null ) {
					anyPsmsHave_precursor_M_Over_Z = true;
				}
				if ( psmListItem.retentionTimeSeconds !== undefined && psmListItem.retentionTimeSeconds !== null ) {
					anyPsmsHave_retentionTime = true;
				}
			}, this );
			
			/////////

			// Build $psmDataTable detached from DOM while adding to it.  
			//   That way browser rendering engine only has to do single render after after all elements added. 

			let psmDataTablecontext = { 
					psmAnnotationTypes : psmAnnotationTypesForPsmListEntries_DisplayOrder,
					
					searchHasScanData : searchHasScanData,

					anyPsmsHave_precursor_M_Over_Z : anyPsmsHave_precursor_M_Over_Z, 
					anyPsmsHave_retentionTime : anyPsmsHave_retentionTime
			};

			let psmDataTablehtml = this._psm_list_table_headers_template_Template( psmDataTablecontext );

			let $psmDataTable = $( psmDataTablehtml );

			let $psmDataTable_Tbody = $psmDataTable.find(".psm_main_data_table_jq tbody");

			//  Process each entry in peptide list from server and create rows in data table

			psmList.forEach( function( psmListItem, index, array ) {

				let context = psmListItem;

				context.searchHasScanData = searchHasScanData;
				
				context.anyPsmsHave_precursor_M_Over_Z = anyPsmsHave_precursor_M_Over_Z; 
				context.anyPsmsHave_retentionTime = anyPsmsHave_retentionTime;
				
				
				if ( psmListItem.precursor_M_Over_Z !== undefined && psmListItem.precursor_M_Over_Z !== null ) {
					psmListItem.precursor_M_Over_Z_Display = psmListItem.precursor_M_Over_Z.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
				}
				
				if ( psmListItem.retentionTimeSeconds !== undefined && psmListItem.retentionTimeSeconds !== null ) {
					let retentionTimeMinutesNumber = psmListItem.retentionTimeSeconds / 60;
					psmListItem.retentionTimeMinutesDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
				}

				//  Put PSM annotations into a list for display matching table headers

				let psmAnnotationDisplayEntries = [];

				let psmAnnotationMap = psmListItem.psmAnnotationMap;
				if ( psmAnnotationMap ) {
					psmAnnotationTypesForPsmListEntries_DisplayOrder.forEach( function( annTypeItem, index, array ) {
						let entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
						psmAnnotationDisplayEntries.push( entryForAnnTypeId );
					}, this );
				}

				context.psmAnnotationDisplayEntries = psmAnnotationDisplayEntries;

				let html = this._psm_list_table_entry_template_Template( context );

				let $entry = $( html ).appendTo( $psmDataTable_Tbody );

				let $psm_view_spectrum_link_jq = $entry.find(".psm_view_spectrum_link_jq");
				
				let psmId = psmListItem.psmId;

				$psm_view_spectrum_link_jq.click( function(eventObject) {
					try {
						eventObject.preventDefault();
						objectThis._viewSpectrum( { clickThis : this, eventObject : eventObject, psmId : psmId, projectSearchId : projectSearchId } );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
			}, this );

//			addToolTips();

			$psmDataTable.appendTo( $container );  // Add the created DOM tree to the main DOM

			this._addPsmCharts( { psmList, container } );

		}
		
		$container.data( PSM_DATA_LOADED_DATA_KEY, true );
	}

	/**
	 * 
	 */
	_getAnnotationTypeRecords_DisplayOrder( { psmList, projectSearchId } ) {

		//   Get all annotation type ids returned in all entries and produce a list of them to put in columns
		
		let resultObject = {};
		
		let annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}
		
		let allPSMAnnotationTypeIds_InPsmList = {};

		psmList.forEach( function( psmListItem, index, array ) {
			let psmAnnotationMap = psmListItem.psmAnnotationMap;
			if ( psmAnnotationMap ) {
				Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
					let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
					allPSMAnnotationTypeIds_InPsmList[ psmAnnotationDTOItem.annotationTypeId ] = psmAnnotationDTOItem.annotationTypeId;
				}, this );
			}
		}, this );
		
		//  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForPsmListEntries = [];
		
		//  PSM
		
		let allPSMAnnotationTypeIds_InPsmListKeys = Object.keys ( allPSMAnnotationTypeIds_InPsmList );
		if ( allPSMAnnotationTypeIds_InPsmListKeys.length > 0 ) {
			//  Have PSM AnnotationType entries in Peptide list so must have PSM AnnotationType records
			let psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes
			let psmDescriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes
			if ( ( ! psmFilterableAnnotationTypes ) && ( ! psmDescriptiveAnnotationTypes ) ) {
				throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have allPSMAnnotationTypeIds_InPsmList entries");
			}
			//  Get AnnotationTypeRecords for AnnotationTypeIds
			Object.keys ( allPSMAnnotationTypeIds_InPsmList ).forEach( function( allPSMAnnotationTypeIds_InPsmListKeyItem, index, array ) {
				let annotationTypeEntryForKey = psmFilterableAnnotationTypes[ allPSMAnnotationTypeIds_InPsmListKeyItem ];
				if ( ! annotationTypeEntryForKey ) {
					annotationTypeEntryForKey = psmDescriptiveAnnotationTypes[ allPSMAnnotationTypeIds_InPsmListKeyItem ];
					if ( ! annotationTypeEntryForKey ) {
						throw Error( "No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes entry for key: " + allPSMAnnotationTypeIds_InPsmListKeyItem );
					}
				}
				psmAnnotationTypesForPsmListEntries.push( annotationTypeEntryForKey );
			}, this );
		}

		//  Sort this result array, on display order, then by ann type name
		
		this._sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray : psmAnnotationTypesForPsmListEntries } );
		
		return {
			psmAnnotationTypesForPsmListEntries : psmAnnotationTypesForPsmListEntries
		};
	}


	/**
	 * 
	 */
	_sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray } ) {

		annTypesArray.sort( function( a, b ) {
			if ( a.displayOrder && b.displayOrder ) {
				//  both a and b have display order so order them
				if ( a.displayOrder < b.displayOrder ) {
					return -1;
				}
				if ( a.displayOrder > b.displayOrder ) {
					return 1;
				}
				return 0;
			}
			if ( a.displayOrder ) {
				//  Only a has display order so order it first
				return -1;
			}
			if ( b.displayOrder ) {
				//  Only b has display order so order it first
				return 1;
			}
			//  Order on ann type name
			let nameCompare = a.name.localeCompare( b.name );
			return nameCompare;
		});
	}

	/**
	 * 
	 */
	_get_Psm_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } ) {

		let psmFilterableAnnotationTypes_WhereSortOrderPopulated = 
			this._get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );
		
		let result = [];
		
		psmFilterableAnnotationTypes_WhereSortOrderPopulated.forEach(function( element, i, array) {
			result.push( element.annotationTypeId );
		}, this );
		
		return result;
	}

	/**
	 * Return array ann type entries, sorted on sortOrder
	 */
	_get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } ) {

		//   Get all Psm annotation type records with sortOrder set

		let annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
		}

		let psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
		if ( ! psmFilterableAnnotationTypes ) {
			//  No data so return empty array
			return []; //  EARLY RETURN
		}
		
		//  Get AnnotationType Records where sortOrder is populated
		
		let psmFilterableAnnotationTypes_SortOrderPopulated = [];
		
		let psmFilterableAnnotationTypes_Keys = Object.keys ( psmFilterableAnnotationTypes );
		
		psmFilterableAnnotationTypes_Keys.forEach( function( psmFilterableAnnotationTypesKeyItem, index, array ) {
			let annotationTypeEntryForKey = psmFilterableAnnotationTypes[ psmFilterableAnnotationTypesKeyItem ];
			if ( annotationTypeEntryForKey.sortOrder ) {
				psmFilterableAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
			}
		}, this );

		
		//  Sort on sort order
		
		psmFilterableAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
			if ( a.sortOrder < b.sortOrder ) {
				return -1;
			}
			if ( a.sortOrder > b.sortOrder ) {
				return 1;
			}
			return 0;
		})
		
		return psmFilterableAnnotationTypes_SortOrderPopulated;
	};
	
	/**
	 * 
	 */
	_addPsmCharts( { psmList, container } ) {

		let objectThis = this;
		
		let loadGoogleChart_CoreChartResult = loadGoogleChart_CoreChart();

		if ( ! loadGoogleChart_CoreChartResult.isLoaded ) {
			loadGoogleChart_CoreChartResult.loadingPromise.then(function(value) { // On Fulfilled

				console.log( "loadGoogleChart_CoreChartResult.loadingPromise.then ( On Fulfilled ) called" );
				
				objectThis._addPsmChartsActual( { psmList, container } );

			}).catch(function(reason) {
				console.log( "loadGoogleChart_CoreChartResult.loadingPromise.catch(reason) called" );
			});
		} else {
			this._addPsmChartsActual( { psmList, container } );
		}
	};

	/**
	 * 
	 */
	_addPsmChartsActual( { psmList, container }  ) {
		
		let objectThis = this;
		
		let psmWebDisplayList = psmList;
		
		let $psm_data_container = $( container );
		let $psm_qc_charts_container_jq = $psm_data_container.find(".psm_qc_charts_container_jq");
		if ( $psm_qc_charts_container_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_qc_charts_container_jq'" );
		}

		let $psm_empty_div_for_chart_bar_color_jq = $psm_data_container.find(".psm_empty_div_for_chart_bar_color_jq")
		if ( $psm_empty_div_for_chart_bar_color_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_empty_div_for_chart_bar_color_jq'" );
		}
		
		let chartBarColor = $psm_empty_div_for_chart_bar_color_jq.css( "color" );


		let hasChargeDataAllRows = true;
		let hasRetentionTimeDataAllRows = true;

		for ( let psmIndex = 0; psmIndex < psmWebDisplayList.length ; psmIndex++ ) {
			let psm = psmWebDisplayList[ psmIndex ];
			if ( psm.retentionTimeSeconds === undefined || psm.retentionTimeSeconds === null ) {
				hasRetentionTimeDataAllRows = false;
			}
			if ( psm.charge === undefined || psm.charge === null ) {
				hasChargeDataAllRows = false;
			}
		}

		if ( hasChargeDataAllRows ) {
			this._addChargeChart( { psmWebDisplayList, chartBarColor, $psm_qc_charts_container_jq : $psm_qc_charts_container_jq } )
		}
		if ( hasRetentionTimeDataAllRows ) {
			this._addRetentionTimeChart( { psmWebDisplayList, chartBarColor, $psm_qc_charts_container_jq : $psm_qc_charts_container_jq } )
		}
		
		let $chart_download_link_jq_All = $psm_qc_charts_container_jq.find(".chart_download_link_jq");
		$chart_download_link_jq_All.click( function( event ) { 
			event.preventDefault();
			objectThis._downloadChart( { clickedThis : this } ); 
		});

		if ( window.linkInfoOverlayWidthResizer ) {
			window.linkInfoOverlayWidthResizer();
		}
	};

	/**
	 * 
	 */
	_addChargeChart( { psmWebDisplayList, chartBarColor, $psm_qc_charts_container_jq } ) {
		
		let $psm_qc_charge_chart_outer_container_jq = $psm_qc_charts_container_jq.find(".psm_qc_charge_chart_outer_container_jq");
		if ( $psm_qc_charge_chart_outer_container_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_qc_charge_chart_outer_container_jq'" );
		}
		let $psm_qc_charge_chart_container_jq = $psm_qc_charge_chart_outer_container_jq.find(".psm_qc_charge_chart_container_jq");
		if ( $psm_qc_charge_chart_container_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_qc_charge_chart_container_jq'" );
		}
		
		$psm_qc_charge_chart_outer_container_jq.show();

		//  Process charge and get count per value  
		let countsPerCharge = {};
		for ( let psmIndex = 0; psmIndex < psmWebDisplayList.length ; psmIndex++ ) {
			let psm = psmWebDisplayList[ psmIndex ];
			let charge = psm.charge;
			if ( countsPerCharge[ charge ] === undefined ) {
				countsPerCharge[ charge ] = 1;
			} else {
				countsPerCharge[ charge ]++;
			}
		}
		//  Extract counts to array, including object key
		let countsPerChargeArray = [];
		let maxChargeCount = 0;
		let countsPerChargeKeys = Object.keys( countsPerCharge );
		for ( let index = 0; index < countsPerChargeKeys.length; index++ ) {
			let countsPerChargeKeysEntry = countsPerChargeKeys[ index ];
			let countsPerChargeEntry = countsPerCharge[ countsPerChargeKeysEntry ];
			let countsPerChargeWithKey = { charge: countsPerChargeKeysEntry, count: countsPerChargeEntry };
			countsPerChargeArray.push( countsPerChargeWithKey );
			if ( countsPerChargeEntry > maxChargeCount ) {
				maxChargeCount = countsPerChargeEntry;
			}
		}
		//  Sort in charge order
		countsPerChargeArray.sort( function( a, b ) {
			return a.charge - b.charge;
		})

		//  chart data for Google charts
		let chartData = [];

		let chartDataHeaderEntry = [ 'AAAAAAAAA', "MMM", {role: "tooltip", 'p': {'html': true} } ]; 
		chartData.push( chartDataHeaderEntry );

		for ( let index = 0; index < countsPerChargeArray.length; index++ ) {
			let countsPerChargeArrayEntry = countsPerChargeArray[ index ];
			let chartEntry = [ 
				"+" + countsPerChargeArrayEntry.charge, 
				countsPerChargeArrayEntry.count, 
				//  Tool Tip
				"Charge: +" + countsPerChargeArrayEntry.charge + ", Count: " + countsPerChargeArrayEntry.count ];
			chartData.push( chartEntry );
		}
		
		let vAxisTicks = this._getChargeCountTickMarks( { maxValue : maxChargeCount } );

		let chartTitle = 'Counts Per Charge';
		let optionsFullsize = {
			//  Overridden for Specific elements like Chart Title and X and Y Axis labels
							fontSize: _CHART_DEFAULT_FONT_SIZE,  //  Default font size - using to set font size for tick marks.
							
				title: chartTitle, // Title above chart
			    titleTextStyle: {
//			        color: <string>,    // any HTML string color ('red', '#cc00cc')
//			        fontName: <string>, // i.e. 'Times New Roman'
			        fontSize: _TITLE_FONT_SIZE, // 12, 18 whatever you want (don't specify px)
//			        bold: <boolean>,    // true or false
//			        italic: <boolean>   // true of false
			    },
				//  X axis label below chart
				hAxis: { title: 'Charge', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
				},  
				//  Y axis label left of chart
				vAxis: { title: 'Count', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
					,baseline: 0     // always start at zero
					,ticks: vAxisTicks
					,maxValue : maxChargeCount
				},
				legend: { position: 'none' }, //  position: 'none':  Don't show legend of bar colors in upper right corner
//				width : 300, 
//				height : 300,   // width and height of chart, otherwise controlled by enclosing div
				colors: [ chartBarColor ],  //  Color of bars
				tooltip: {isHtml: true}
//				,chartArea : { left : 140, top: 60, 
//				width: objectThis.RETENTION_TIME_COUNT_CHART_WIDTH - 200 ,  //  was 720 as measured in Chrome
//				height : objectThis.RETENTION_TIME_COUNT_CHART_HEIGHT - 120 }  //  was 530 as measured in Chrome
		};        
		// create the chart
		let data = google.visualization.arrayToDataTable( chartData );
		let chartFullsize = new google.visualization.ColumnChart( $psm_qc_charge_chart_container_jq[0] );
		chartFullsize.draw(data, optionsFullsize);
	};

	/**
	 * 
	 */
	_getChargeCountTickMarks( params ) {
		let maxValue = params.maxValue;
		if ( maxValue < 5 ) {
			let tickMarks = [ 0 ];
			for ( let counter = 1; counter <= maxValue; counter++ ) {
				tickMarks.push( counter );
			}
			return tickMarks;
		}
		return undefined; //  Use defaults
	};

	/**
	 * 
	 */
	_addRetentionTimeChart( { psmWebDisplayList, chartBarColor, $psm_qc_charts_container_jq } ) {

		let $psm_qc_retention_time_chart_outer_container_jq = $psm_qc_charts_container_jq.find(".psm_qc_retention_time_chart_outer_container_jq");
		if ( $psm_qc_retention_time_chart_outer_container_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_qc_retention_time_chart_outer_container_jq'" );
		}
		let $psm_qc_retention_time_chart_container_jq = $psm_qc_retention_time_chart_outer_container_jq.find(".psm_qc_retention_time_chart_container_jq");
		if ( $psm_qc_retention_time_chart_container_jq.length === 0 ) {
			throw Error( "unable to find HTML element with class 'psm_qc_retention_time_chart_container_jq'" );
		}
		
		$psm_qc_retention_time_chart_outer_container_jq.show();
		
		//  Get max and min retention time
		let maxRetentionTime = null;
		let minRetentionTime = null;
		for ( let index = 0; index < psmWebDisplayList.length; index++ ) {
			let psmWebDisplayEntry = psmWebDisplayList[ index ];
			let entryRetentionTime = psmWebDisplayEntry.retentionTimeSeconds;
			if ( maxRetentionTime === null ) {
				maxRetentionTime = entryRetentionTime;
				minRetentionTime = entryRetentionTime;
			} else {
				if ( entryRetentionTime > maxRetentionTime ) {
					maxRetentionTime = entryRetentionTime;
				}
				if ( entryRetentionTime < minRetentionTime ) {
					minRetentionTime = entryRetentionTime;
				}
			}
		}
		let maxMinusMinRetentionTime = maxRetentionTime - minRetentionTime;

		//  	Put retention times in buckets
		//  Determine # buckets and bucket size
		let numberBuckets = Math.floor( Math.sqrt( psmWebDisplayList.length ) );
		if ( numberBuckets < 6 ) {
			numberBuckets = 6;
		}
		if ( numberBuckets > psmWebDisplayList.length ) {
			numberBuckets = psmWebDisplayList.length;  
		}
		let bucketSize = maxMinusMinRetentionTime / numberBuckets;

		// initialize buckets to zero
		let buckets = [];
		for ( let index = 0; index < numberBuckets; index++ ) {
			buckets.push( 0 );
		}
		//  increment bucket counts for PSM retention time values
		for ( let index = 0; index < psmWebDisplayList.length; index++ ) {
			let psmWebDisplayEntry = psmWebDisplayList[ index ];
			let entryRetentionTime = psmWebDisplayEntry.retentionTimeSeconds;
			let retentionTimeOffset = entryRetentionTime - minRetentionTime;
			let bucketIndex = 0;
			if ( retentionTimeOffset > 0 ) {
				let retentionTimeOffsetFraction = retentionTimeOffset /  maxMinusMinRetentionTime;
				bucketIndex = Math.floor( retentionTimeOffsetFraction * numberBuckets );
			}
			if ( bucketIndex < 0 ) {
				bucketIndex = 0;
			} else if ( bucketIndex >= numberBuckets ) {
				bucketIndex = numberBuckets - 1; //  required for maxRetetionTime entry since numberBuckets is then 1
			}
			if ( buckets[ bucketIndex ] === undefined ) {
				throw Error( "array buckets not initialized for index: " + bucketIndex );
			}
			buckets[ bucketIndex ]++;
		}
		
		let maxBucketCount = 0;
		
		let bucketSizeMinutes = bucketSize / 60;
		let bucketSizeMinutesHalf = bucketSizeMinutes / 2;

		//  chart data for Google charts
		let chartData = [];
		//  output columns specification
		//  With Tooltip
		chartData.push( ["retention time",
			"count",{role: "tooltip",  'p': {'html': true} }, 
//			, { role: 'style' } 
			] );
		for ( let index = 0; index < buckets.length; index++ ) {
			let bucketCount = buckets[ index ];
			if ( bucketCount > maxBucketCount ) {
				maxBucketCount = bucketCount;
			}
			//  With Tooltip
			let approxBucketStart = ( minRetentionTime + ( index * bucketSize ) ) / 60;
			let approxBucketEnd = ( minRetentionTime + ( ( index + 1 ) * bucketSize ) ) / 60;
			let approxBucketCenter = ( approxBucketStart + ( bucketSizeMinutesHalf ) );
			let approxBucketStartMinutesString = ( approxBucketStart).toFixed( 2 );
			let approxBucketEndMinutesString = ( approxBucketEnd ).toFixed( 2 );
			
			let tooltip = "<div style='margin: 10px;'>PSM count: " + bucketCount + 
			"<br>retention time approximately " + approxBucketStartMinutesString + 
			" to " + approxBucketEndMinutesString + 
			"</div>";
			
			let chartXaxisValue = approxBucketCenter;
			
			if ( maxMinusMinRetentionTime === 0 ) {
				//  Only 1 value for retention time
				
				//  Convert to string so Google Chart will display
				chartXaxisValue = approxBucketStart.toFixed( 2 );
				
				//  Change tooltip
				tooltip = "<div style='margin: 10px;'>PSM count: " + bucketCount + 
				"<br>retention time approximately " + approxBucketStartMinutesString + 
				"</div>";
			}
			
			chartData.push( [ chartXaxisValue, bucketCount, tooltip 
//				,  'stroke-width: 2;stroke-color: blue; '
				] );
		}

		let minDataX = minRetentionTime / 60;
		let maxDataX = maxRetentionTime / 60;
		
		let maxDataY = maxBucketCount;

		//  control the tick marks horizontal and vertical
		let hAxisTicks = this._getRetentionTimeTickMarks( { minValue : minDataX, maxValue : maxDataX } );
		
		let vAxisTicks = this._getRetentionTimeCountTickMarks( { maxValue : maxDataY } );
		
		let chartTitle = 'Count vs/ Retention Time';
		let optionsFullsize = {
				//  Overridden for Specific elements like Chart Title and X and Y Axis labels
				fontSize: _CHART_DEFAULT_FONT_SIZE,  //  Default font size - using to set font size for tick marks.
				
				title: chartTitle, // Title above chart
			    titleTextStyle: {
//			        color: <string>,    // any HTML string color ('red', '#cc00cc')
//			        fontName: <string>, // i.e. 'Times New Roman'
			        fontSize: _TITLE_FONT_SIZE, // 12, 18 whatever you want (don't specify px)
//			        bold: <boolean>,    // true or false
//			        italic: <boolean>   // true of false
			    },
			    //  X axis label below chart
				hAxis: { title: 'Retention Time (minutes)', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
					,ticks: hAxisTicks
					, format:'#,###.##'
					,maxValue : maxDataX
					,gridlines: {  
		                color: 'none'  //  No vertical grid lines on the horzontal axis
		            }
				},  
				//  Y axis label left of chart
				vAxis: { title: 'Count', titleTextStyle: { color: 'black', fontSize: _AXIS_LABEL_FONT_SIZE }
					,baseline: 0                    // always start at zero
					,ticks: vAxisTicks
					, format:'#,###'
					,maxValue : maxDataY
				},
				legend: { position: 'none' }, //  position: 'none':  Don't show legend of bar colors in upper right corner
//				width : objectThis.RETENTION_TIME_COUNT_CHART_WIDTH, 
//				height : objectThis.RETENTION_TIME_COUNT_CHART_HEIGHT,   // width and height of chart, otherwise controlled by enclosing div
//				bar: { groupWidth: 5 },  // set bar width large to eliminate space between bars
				bar: { groupWidth: '100%' },  // set bar width large to eliminate space between bars
//				colors: ['red','blue'],  //  Color of bars
				colors: [ chartBarColor ],  //  Color of bars, total counts is second
				tooltip: {isHtml: true}
//				,
//				isStacked: true
//				,chartArea : { left : 140, top: 60, 
//				width: objectThis.RETENTION_TIME_COUNT_CHART_WIDTH - 200 ,  //  was 720 as measured in Chrome
//				height : objectThis.RETENTION_TIME_COUNT_CHART_HEIGHT - 120 }  //  was 530 as measured in Chrome
		};        
		// create the chart
		let data = google.visualization.arrayToDataTable( chartData );
		let chartFullsize = new google.visualization.ColumnChart( $psm_qc_retention_time_chart_container_jq[0] );
		chartFullsize.draw(data, optionsFullsize);
//		google.visualization.events.addListener(chartFullsize, 'select', function(event) {
//
//			let tableSelection = chartFullsize.getSelection();
//			let tableSelection0 = tableSelection[ 0 ];
//			let column = tableSelection0.column;
//			let row = tableSelection0.row;
//			let chartDataForRow = chartData[ row ];
//			  
//			  let z = 0;
//		});
	};

	/**
	 * 
	 */
	_getRetentionTimeTickMarks( params ) {
		let minValue = params.minValue; 
		let maxValue = params.maxValue;
		let maxValueMinusMinValue = maxValue - minValue;
		let tickMarks = [ 
			minValue,
			( maxValueMinusMinValue * 0.25 ) + minValue,
			( maxValueMinusMinValue * 0.5 ) + minValue,
			( maxValueMinusMinValue * 0.75 ) + minValue,
			maxValue ];
		return tickMarks;
	};

	/**
	 * 
	 */
	_getRetentionTimeCountTickMarks( params ) {
		let maxValue = params.maxValue;
		if ( maxValue < 5 ) {
			let tickMarks = [ 0 ];
			for ( let counter = 1; counter <= maxValue; counter++ ) {
				tickMarks.push( counter );
			}
			return tickMarks;
		}
		return undefined; //  Use defaults
	};
	
	/**
	 * 
	 */
	_downloadChart( params ) {
		alert("Not Currently Supported")
		throw Error("Download Not Currently Supported");
		try {
			let clickedThis = params.clickedThis;

			let $clickedThis = $( clickedThis );
			let download_type = $clickedThis.attr("data-download_type");
			let $psm_qc_either_chart_outer_container_jq = $clickedThis.closest(".psm_qc_either_chart_outer_container_jq");
			let chart_type = $psm_qc_either_chart_outer_container_jq.attr("data-chart_type");

			let getSVGContentsAsStringResult = this._getSVGContentsAsString( $psm_qc_either_chart_outer_container_jq );
			
			if ( getSVGContentsAsStringResult.errorException ) {
				throw errorException;
			}
			
			let fullSVG_String = getSVGContentsAsStringResult.fullSVG_String;
			
			let form = document.createElement( "form" );
			$( form ).hide();
			form.setAttribute( "method", "post" );
			form.setAttribute( "action", "convertAndDownloadSVG/" + getWebserviceSyncTrackingCode() );

			let svgStringField = document.createElement( "input" );
			svgStringField.setAttribute("name", "svgString");
			svgStringField.setAttribute("value", fullSVG_String );
			let fileTypeField = document.createElement( "input" );
			fileTypeField.setAttribute("name", "fileType");
			fileTypeField.setAttribute("value", download_type);
			form.appendChild( svgStringField );
			form.appendChild( fileTypeField );
			document.body.appendChild(form);    // Not entirely sure if this is necessary			
			form.submit();
			document.body.removeChild( form );

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
		
	};
	
	/**
	 * 
	 */
	_getSVGContentsAsString ( $psm_qc_either_chart_outer_container_jq ) {
		try {
			let $psm_qc_either_chart_container_jq = $psm_qc_either_chart_outer_container_jq.find(".psm_qc_either_chart_container_jq");
			if ( $psm_qc_either_chart_container_jq.length === 0 ) {
				// No element found with class psm_qc_either_chart_container_jq
				return { noPageElement : true };
			}
			let $svgRoot = $psm_qc_either_chart_container_jq.find("svg");
			if ( $svgRoot.length === 0 ) {
				// No <svg> element found
				return { noPageElement : true };
			}

			let svgContents = $svgRoot.html();
			let fullSVG_String = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">";
			fullSVG_String += "<svg id=\"svg\" ";
			fullSVG_String += "width=\"" + $svgRoot.attr( "width" ) + "\" ";
			fullSVG_String += "height=\"" + $svgRoot.attr( "height" ) + "\" ";
			fullSVG_String += "xmlns=\"http://www.w3.org/2000/svg\">" + svgContents + "</svg>";
			// fix the URL that google charts is putting into the SVG. Breaks parsing.
			fullSVG_String = fullSVG_String.replace( /url\(.+\#_ABSTRACT_RENDERER_ID_(\d+)\)/g, "url(#_ABSTRACT_RENDERER_ID_$1)" );	

			return { fullSVG_String : fullSVG_String};
		} catch( e ) {
			//  Not all browsers have svgElement.innerHTML which .html() tries to use, causing an exception
			return { errorException : e };
		}
	};

	/**
	 * 
	 */
	_viewSpectrum( { clickThis, eventObject, psmId, projectSearchId } ) {
		
		let psmIdLocal = psmId;

		this._spectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow( { 
			psmId, projectSearchId, 
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing, 
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );

		// this._spectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_InOverlay( { psmId, projectSearchId } );
	}	
};

