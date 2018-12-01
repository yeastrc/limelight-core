/**
 * peptideViewPage_DisplayData_SingleSearch.js
 * 
 * Javascript for peptideView.jsp page - Displaying Data for Single Search  
 * 
 * 
 * 
 * 
 * 
 */


let Handlebars = require('handlebars/runtime');

let _peptide_table_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/peptide_page/peptide_page_single_search_template-bundle.js" );

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

import { Psm_DrilldownRetrieveDisplay } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_DrilldownRetrieveDisplay.js';

/**
 * 
 */
export class PeptideViewPage_Display_SingleSearch {

	/**
	 * 
	 */
	constructor( {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_OtherUserSelections,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing
	}) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
		} );
		
		this._psm_DrilldownRetrieveDisplay = new Psm_DrilldownRetrieveDisplay( { 
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
			});

		if ( ! _peptide_table_template_bundle.peptide_table_table_headers_template ) {
			throw Error("Nothing in _peptide_table_template_bundle.peptide_table_table_headers_template");
		}
		if ( ! _peptide_table_template_bundle.peptide_table_data_entry_template ) {
			throw Error("Nothing in _peptide_table_template_bundle.peptide_table_data_entry_template");
		}
		if ( ! _peptide_table_template_bundle.peptide_table_child_row_template ) {
			throw Error("Nothing in _peptide_table_template_bundle.peptide_table_child_row_template");
		}
		
		this._peptide_table_table_headers_template_Template = 
			_peptide_table_template_bundle.peptide_table_table_headers_template;
		
		this._peptide_table_data_entry_template_Template = 
			_peptide_table_template_bundle.peptide_table_data_entry_template;
			
		this._peptide_table_child_row_template_Template = 
			_peptide_table_template_bundle.peptide_table_child_row_template;
			
		
	}
	
	/**
	 * Get Peptide List To Render For Single Project Search Id
	 */
	getPeptideList( { projectSearchId } ) {
		
		let objectThis = this;
		
		let contentType = _AJAX_POST_JSON_CONTENT_TYPE;
		
		let $peptide_table_loading_text = $("#peptide_table_loading_text");
		if ( $peptide_table_loading_text.length === 0 ) {
			throw Error("No element found with id 'peptide_table_loading_text'");
		}
		
		let peptide_table_loading_text = $peptide_table_loading_text.html();

		let $peptide_list_container = $("#peptide_list_container");
		if ( $peptide_list_container.length === 0 ) {
			throw Error("No element found for id 'peptide_list_container'");
		}
		
		$peptide_list_container.empty();
		$peptide_list_container.html( peptide_table_loading_text );
		
		$("#peptide_list_size").empty();
		

		let searchDataLookupParams_For_Single_ProjectSearchId = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId } );
		
		let reportedPeptideAnnotationTypeIdsForSorting =
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } );
		
		let requestObject = {
				projectSearchId : projectSearchId,
				searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
				reportedPeptideAnnotationTypeIdsForSorting : reportedPeptideAnnotationTypeIdsForSorting
		};
		
		let _URL = "d/rws/for-page/psb/peptide-view-page-peptide-list-single-project-search-id/" + getWebserviceSyncTrackingCode();
		
		let requestData = JSON.stringify( requestObject );
		
		console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(data) {
				try {
					console.log("AJAX Call to get Peptide List END, Now: " + new Date() );
					
					objectThis._getPeptideList_ProcessAJAXResponse( {
						projectSearchId : projectSearchId,
						requestObject : requestObject, 
						responseData : data
					});

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

	};

	/**
	 * 
	 */
	_getPeptideList_ProcessAJAXResponse( { projectSearchId, requestObject, responseData } ) {

		let peptideList = responseData.peptideList;
		
		if ( ! peptideList ) {
			//  No peptideList for identifier
			
			console.log( "peptideList is undefined or null.  Exiting" );
			
			return; // EARY EXIT
		}
		
		console.log( "peptideList length: " + peptideList.length );
		
		if ( peptideList.length === 0 ) {
			console.log( "peptideList IS EMPTY " );
		}
		
		this._renderToPagePeptideList( { projectSearchId : projectSearchId, peptideList : peptideList } );
	};

	/**
	 * 
	 */
	_renderToPagePeptideList( { projectSearchId, peptideList } ) {
		
		let objectThis = this;
		
		console.log("Rendering Peptide List START, Now: " + new Date() );
		
		let $peptide_list_container = $("#peptide_list_container");
		if ( $peptide_list_container.length === 0 ) {
			throw Error("No element found for id 'peptide_list_container'");
		}
		
		let peptideListLength = 0;
		if (peptideList && peptideList.length > 0) {
			peptideListLength = peptideList.length;
		}

		$("#peptide_list_size").text( peptideListLength );
		
		$peptide_list_container.empty();

		if (peptideList && peptideList.length > 0) {
			
			//   Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id

			/**
			 * Return array ann type entries, sorted on sortOrder
			 */
			let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated =
				this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

			//  Get AnnotationType records for Displaying Annotation data in display order in peptideList
			let annotationTypeRecords_DisplayOrder = this._getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList } );
			
			let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
			let psmAnnotationTypesForPeptideListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.length;
			
			peptideList.sort( function( a, b ) {

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

					for ( let psmAnnotationTypesForPeptideListEntriesLength_Index = 0; psmAnnotationTypesForPeptideListEntriesLength_Index < psmAnnotationTypesForPeptideListEntriesLength; psmAnnotationTypesForPeptideListEntriesLength_Index++ ) {
						let psmAnnotationTypesForPeptideListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries[ psmAnnotationTypesForPeptideListEntriesLength_Index ];
						let annotationTypeId = psmAnnotationTypesForPeptideListEntries_Entry.annotationTypeId;
						let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
						let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];
						
						if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
							if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionBelow ) {
								if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
									return -1;
								}
								if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
									return 1;
								}
								//  Values match so go to next ann type values
							} else if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionAbove ) {
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
				

				//  All Reported Peptide and PSM Ann Type Values match so order on reported peptide id
				if ( a.reportedPeptideId < b.reportedPeptideId ) {
					return -1;
				}
				if ( a.reportedPeptideId > b.reportedPeptideId ) {
					return 1;
				}
				return 0;

			});

			//////
			
			
			// Build $peptideDataTable detached from DOM while adding to it.  
			//   That way browser rendering engine only has to do single render after after all elements added. 
			
			let peptideDataTablecontext = { 
					psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries,
					reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries
			};
			
			let peptideDataTablehtml = this._peptide_table_table_headers_template_Template( peptideDataTablecontext );

			let $peptideDataTable = $( peptideDataTablehtml );
			
			let $peptideDataTable_Tbody = $peptideDataTable.find("tbody");
			
			//  Process each entry in peptide list from server and create rows in data table
			
			peptideList.forEach( function( peptideListItem, index, array ) {

				let context = peptideListItem;
				
				if ( context.numPsms === undefined || context.numPsms === null ) {
					context.numPsmsNotSet = true;
				};
				if ( context.numUniquePsms === undefined || context.numUniquePsms === null ) {
					context.numUniquePsmsNotSet = true;
				};
				
				let modMassList = peptideListItem.modMassList;
				if ( modMassList ) {
					modMassList.sort( function( a, b ) {
						if ( a.position < b.position ) {
							return -1;
						}
						if ( a.position > b.position ) {
							return 1;
						}
						if ( a.mass < b.mass ) {
							return -1;
						}
						if ( a.mass > b.mass ) {
							return 1;
						}
						return 0;
					} );
					if ( modMassList.length > 0 ) {
						modMassList[ 0 ].firstEntry = true;
					}
					context.modMassList = modMassList;
				}
				
				let proteinNameList = peptideListItem.proteinNameList;
				if ( proteinNameList ) {
					if ( proteinNameList.length > 0 ) {
						proteinNameList[ 0 ].firstEntry = true;
					}
					context.proteinNameList = proteinNameList;
				}
					
				//  Put Reported Peptide and Best PSM annotations into lists for display matching table headers

				let reportedPeptideAnnotationDisplayEntries = [];
				let psmAnnotationDisplayEntries = [];
				
				let peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
				if ( peptideAnnotationMap ) {
					annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries.forEach( function( annTypeItem, index, array ) {
						let entryForAnnTypeId = peptideAnnotationMap[ annTypeItem.annotationTypeId ];
						reportedPeptideAnnotationDisplayEntries.push( entryForAnnTypeId );
					}, this );
				}
				let psmAnnotationMap = peptideListItem.psmAnnotationMap;
				if ( psmAnnotationMap ) {
					annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.forEach( function( annTypeItem, index, array ) {
						let entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
						reportedPeptideAnnotationDisplayEntries.push( entryForAnnTypeId );
					}, this );
				}
				
				context.reportedPeptideAnnotationDisplayEntries = reportedPeptideAnnotationDisplayEntries;
				context.psmAnnotationDisplayEntries = psmAnnotationDisplayEntries;
				
				let html = this._peptide_table_data_entry_template_Template( context );

				let $entry = $( html ).appendTo( $peptideDataTable_Tbody );
				
				//  Get the number of columns of the inserted row so can set the "colspan=" in the next row
				//       that holds the child data
				let $entry__columns = $entry.find("td");
				let entry__numColumns = $entry__columns.length;
				//  colSpan is used as the value for "colspan=" in the <td>
				let childRowHTML_Context = { colSpan : entry__numColumns };
				let childRowHTML = this._peptide_table_child_row_template_Template( childRowHTML_Context );
				//  Add next row for child data
				$( childRowHTML ).appendTo($peptideDataTable_Tbody);

				
				$entry.click( function( event ) {
					let clickedThis = this;
					event.preventDefault();
	
					objectThis._showPSMsForRowAndLoadIfNecessary( {
						clickedThis : clickedThis,
						projectSearchId : projectSearchId,
						reportedPeptideId : peptideListItem.reportedPeptideId
					});
				});

			}, this );

//			addToolTips();

			$peptideDataTable.appendTo( $peptide_list_container );  // Add the created DOM tree to the main DOM


		} else {

//			let noDataMsg = $("#peptide_entry_no_data_template_div").html();

//			$peptide_list.html(noDataMsg);
		}

		console.log("Rendering Peptide List END, Now: " + new Date() );
		
	};
	
	/**
	 * 
	 */
	_showPSMsForRowAndLoadIfNecessary( params ) {
		let clickedThis = params.clickedThis;
		let projectSearchId = params.projectSearchId;
		let reportedPeptideId = params.reportedPeptideId;
		
		let $clickedThis = $( clickedThis );
		//  get <tr> with class 'peptide_data_row_root_container_jq' if click not handled on <tr>
		
		let $peptide_data_row_root_container_jq = $clickedThis;
		if ( ! $clickedThis.hasClass( "peptide_data_row_root_container_jq" ) ) {
			$peptide_data_row_root_container_jq = $clickedThis.closest(".peptide_data_row_root_container_jq");
		}
		if ( $peptide_data_row_root_container_jq.length === 0 ) {
			throw Error("Unable to find element with class 'peptide_data_row_root_container_jq'");
		}
		//  go to next <tr> which is where PSMs go
		let $peptide_child_container_jq = $peptide_data_row_root_container_jq.next();
		if ( $peptide_data_row_root_container_jq.length === 0 ) {
			throw Error("Unable to find element $peptide_child_container_jq");
		}
		if( $peptide_child_container_jq.is(":visible" ) ) {
			$peptide_child_container_jq.hide(); 
//			$clickedElement.find(".toggle_visibility_expansion_span_jq").show();
//			$clickedElement.find(".toggle_visibility_contraction_span_jq").hide();
		} else { 
			$peptide_child_container_jq.show();
//			$clickedElement.find(".toggle_visibility_expansion_span_jq").hide();
//			$clickedElement.find(".toggle_visibility_contraction_span_jq").show();
			let $child_data_container_jq = $peptide_child_container_jq.find(".child_data_container_jq");

			this._psm_DrilldownRetrieveDisplay.loadAndDisplayPSMsIfNeeded( {
				container : $child_data_container_jq[ 0 ],
				projectSearchId : projectSearchId,
				reportedPeptideId : reportedPeptideId
			});
		}
	};
	

	
	/**
	 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
	 */
	_getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList } ) {

		//   Get all annotation type ids returned in all entries and produce a list of them to put in columns

		let resultObject = {};
		
		//  First get all Unique Reported Peptide and PSM Annotation Type Ids in the Peptide List
		
		let uniquePSMAnnotationTypeIds_InPeptideList = new Set();
		let uniqueReportedPeptideAnnotationTypeIds_InPeptideList = new Set();
//		let uniqueMatchedProteinAnnotationTypeIds_InPeptideList = new Set; // Not populated yet

		peptideList.forEach( function( peptideListItem, index, array ) {
			let psmAnnotationMap = peptideListItem.psmAnnotationMap;
			if ( psmAnnotationMap ) {
				Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
					let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
					uniquePSMAnnotationTypeIds_InPeptideList.add( psmAnnotationDTOItem.annotationTypeId );
				}, this );
			}
			let peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
			if ( peptideAnnotationMap ) {
				Object.keys ( peptideAnnotationMap ).forEach( function( peptideAnnotationMapKeyItem, index, array ) {
					let peptideAnnotationDTOItem = peptideAnnotationMap[ peptideAnnotationMapKeyItem ];
					uniqueReportedPeptideAnnotationTypeIds_InPeptideList.add( peptideAnnotationDTOItem.annotationTypeId );
				}, this );
			}
		}, this );
		
		//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InPeptideList } );
		let reportedPeptideAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_InPeptideList } );

		return {
			psmAnnotationTypesForPeptideListEntries : psmAnnotationTypesForPeptideListEntries,
			reportedPeptideAnnotationTypesForPeptideListEntries : reportedPeptideAnnotationTypesForPeptideListEntries
		};
	};

	
}