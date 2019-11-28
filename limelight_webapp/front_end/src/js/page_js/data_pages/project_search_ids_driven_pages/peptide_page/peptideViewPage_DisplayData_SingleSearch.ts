/**
 * peptideViewPage_DisplayData_SingleSearch.ts
 * 
 * Javascript for peptideView.jsp page - Displaying Data for Single Search  
 * 
 * 
 * 
 * 
 * 
 */


import { Handlebars, _peptide_table_template_bundle } from './peptideViewPage_DisplayData_SingleSearch_ImportHandlebarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing';
import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage';

import { Psm_DrilldownRetrieveDisplay } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_DrilldownRetrieveDisplay';

/**
 * 
 */
export class PeptideViewPage_Display_SingleSearch {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
		
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	
	private _annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;
	
	private _searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage;
	
	private _psm_DrilldownRetrieveDisplay : Psm_DrilldownRetrieveDisplay;

	private _peptide_table_table_headers_template_Template = 
		_peptide_table_template_bundle.peptide_table_table_headers_template;
	
	private _peptide_table_data_entry_template_Template = 
		_peptide_table_template_bundle.peptide_table_data_entry_template;
		
	private _peptide_table_child_row_template_Template = 
		_peptide_table_template_bundle.peptide_table_child_row_template;
		
	/**
	 * 
	 */
	constructor( {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing
	} : {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	}) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			displayOnly : false,
			dataPages_LoggedInUser_CommonObjectsFactory : undefined,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			rerenderPageForUpdatedFilterCutoffs_Callback : undefined
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
		
	}
	
	/**
	 * Get Peptide List To Render For Single Project Search Id
	 */
	getPeptideList( { projectSearchId } ) {
		
		let objectThis = this;
		
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
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );
		
		let reportedPeptideAnnotationTypeIdsForSorting =
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeIds_WhereSortOrderPopulated( { projectSearchId } );
		
		let requestObject = {
				projectSearchId : projectSearchId,
				searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
				reportedPeptideAnnotationTypeIdsForSorting : reportedPeptideAnnotationTypeIdsForSorting
		};
		
		console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

		const url = "d/rws/for-page/psb/peptide-view-page-peptide-list-single-project-search-id";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				console.log("AJAX Call to get Peptide List END, Now: " + new Date() );
				
				objectThis._getPeptideList_ProcessAJAXResponse( {
					projectSearchId : projectSearchId,
					responseData : responseData
				});

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_getPeptideList_ProcessAJAXResponse( { projectSearchId, responseData } ) {

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
	}

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
				}
				if ( context.numUniquePsms === undefined || context.numUniquePsms === null ) {
					context.numUniquePsmsNotSet = true;
				}
				
				const modMassesAllList = peptideListItem.modMassList;

				if ( modMassesAllList ) {

					const _MOD_MASS_POSITION_LABEL__N_TERMINAL = 'n';
					const _MOD_MASS_POSITION_LABEL__C_TERMINAL = 'c';

					//  Extract 'n' and 'c' terminal mod masses into separate arrays

					const modMasses_Main_List = []; // Not 'n' or 'c' terminal
					const modMasses_N_Terminal_List = []; // 'n' terminal
					const modMasses_C_Terminal_List = []; // 'c' terminal

					for ( const modEntry of modMassesAllList ) {

						if ( modEntry.is_N_Terminal ) {
							modEntry.position = _MOD_MASS_POSITION_LABEL__N_TERMINAL;
							modMasses_N_Terminal_List.push( modEntry );
						} else if ( modEntry.is_C_Terminal ) {
							modEntry.position = _MOD_MASS_POSITION_LABEL__C_TERMINAL;
							modMasses_C_Terminal_List.push( modEntry );
						} else {
							modMasses_Main_List.push( modEntry );
						}
					}

					//  Sort 'n' terminal mods
					modMasses_N_Terminal_List.sort( function( a, b ) {
						if ( a.mass < b.mass ) {
							return -1;
						}
						if ( a.mass > b.mass ) {
							return 1;
						}
						return 0;
					} );

					//  Sort 'c' terminal mods
					modMasses_C_Terminal_List.sort( function( a, b ) {
						if ( a.mass < b.mass ) {
							return -1;
						}
						if ( a.mass > b.mass ) {
							return 1;
						}
						return 0;
					} );

					// Sort Not 'n' or 'c' terminal mods
					modMasses_Main_List.sort( function( a, b ) {
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

					//  Create combined output list

					const modMassList = [];

					for ( const modEntry of modMasses_N_Terminal_List ) {
						modMassList.push( modEntry );
					}
					for ( const modEntry of modMasses_Main_List ) {
						modMassList.push( modEntry );
					}
					for ( const modEntry of modMasses_C_Terminal_List ) {
						modMassList.push( modEntry );
					}

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
	}
	
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
	}
	

	
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
	}

	
}