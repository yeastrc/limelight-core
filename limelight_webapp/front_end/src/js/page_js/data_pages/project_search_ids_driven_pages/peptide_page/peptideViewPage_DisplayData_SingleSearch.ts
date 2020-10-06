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

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import { ProteinView_LoadedDataCommonHolder } from '../protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import { ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result, reportedPeptides_DataTableOjbects_ForSingleSearch_PeptidePage_createChildTableObjects } from './peptidePage_Display_SingleSearch_ReportedPeptideListSection_Create_TableData';
import {
	ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
	ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";

import {create_dataTable_Root_React, remove_dataTable_Root_React} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM";
import {loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";

/**
 * 
 */
export class PeptideViewPage_Display_SingleSearch {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
		
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	
	private _annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;
	

	//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
	
	// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
	
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;

	
	// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;

	private _projectSearchId : number;

	private _loadData_For_PeptideList_LoadInProgress = false;


	/////
	
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
	}
	
	/**
	 * Populate Peptide List On Page For Single Project Search Id
	 * 
	 * @param projectSearchId - may be different than value passed to initialize if now showing a different projectSearchId
	 * 
	 */
	populatePeptideList( { projectSearchId } ) {
		
		let $peptide_table_loading_text_display = $("#peptide_table_loading_text_display");
		if ( $peptide_table_loading_text_display.length === 0 ) {
			throw Error("No element found with id 'peptide_table_loading_text_display'");
		}
		$peptide_table_loading_text_display.show();
		
		let $peptide_list_container = $("#peptide_list_container");
		if ( $peptide_list_container.length === 0 ) {
			throw Error("No element found for id 'peptide_list_container'");
		}
		$peptide_list_container.hide();

		let $peptide_list_size = $("#peptide_list_size");
		if ( $peptide_list_size.length === 0 ) {
			throw Error("No element found for id 'peptide_list_size'");
		}
		$peptide_list_size.empty();


		// if ( this._projectSearchId !== projectSearchId ) {

		// 	//  Clear all retained Data
		// 	this._loadedDataPerProjectSearchIdHolder.clearAllData();
		// }

		this._projectSearchId = projectSearchId;  // Save projectSearchId


		////////

		//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
		
		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

		
		// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

		this._loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
		

		////////
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server } );

		const promise_loadData_For_PeptideList = this._loadData_For_PeptideList();

		promise_loadData_For_PeptideList.catch( (reason) => {  })

		promise_loadData_For_PeptideList.then( ( loadData_PromiseResult ) => { // loadData_PromiseResult may be undefined
			try {
				this._displayOnPage_PeptideList( loadData_PromiseResult );

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
	}



	/**
	 * Load Data for Peptide List On Page For Single Project Search Id
	 * 
	 * @param projectSearchId - may be different than value passed to initialize if now showing a different projectSearchId
	 * 
	 */
	private _loadData_For_PeptideList() : Promise<{ noReportedPeptideIds : boolean }> {

		const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = (
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined })
		);

		this._loadData_For_PeptideList_LoadInProgress = true;

		return new Promise( (resolve, reject) => {
			try {
				const projectSearchId = this._projectSearchId;
				
				let searchDataLookupParams_For_Single_ProjectSearchId = this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );
					
				if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
					const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
					console.log( msg );
					throw Error( msg );
				}
				
				const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = (
					loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder( {
						projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, forPeptidePage : true, loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder
					} )
				);

				promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch( (reason) => {} );
				promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then( (value) => {
					try {

						const reportedPeptideIds : Array<number> = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

						if ( ! reportedPeptideIds.length ) {

							//  No Reported Peptide Ids returned

							this._loadData_For_PeptideList_LoadInProgress = false;

							resolve({ noReportedPeptideIds : true });

							return;  // EARLY RETURN
						}

						const promises = [];

						{
							const promise = loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
								reportedPeptideIds, projectSearchId, loadedDataCommonHolder : this._loadedDataCommonHolder
							});
							if ( promise ) {
								promises.push(promise);
							}
						}

						const promise_loadDataAfterInitialOverlayShow = loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
		
							retrieveForSingleSearch : true, retrieveForMultipleSearches : false, proteinSequenceVersionId : undefined, projectSearchId,
							searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing, //  Used in loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...) if param is not passed
							loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
							loadedDataCommonHolder : this._loadedDataCommonHolder,
							dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
							// Optional
							searchDataLookupParamsRoot, 
							reportedPeptideIds_Override : this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds()
						});

						if ( promise_loadDataAfterInitialOverlayShow ) {

							promises.push( promise_loadDataAfterInitialOverlayShow );
						}

						const promisesAll = Promise.all( promises );

						promisesAll.catch( (reason) => { reject( reason ) } );

						promisesAll.then( ( promiseValue ) => {
							try {

								this._loadData_For_PeptideList_LoadInProgress = false;

								resolve();

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
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}


	/**
	 * 
	 */
	private _displayOnPage_PeptideList( loadData_PromiseResult : { noReportedPeptideIds : boolean } ) {

		// loadData_PromiseResult may be undefined

		// let noReportedPeptideIds = false ;

		if ( loadData_PromiseResult && loadData_PromiseResult.noReportedPeptideIds ) {

			// noReportedPeptideIds = true;
		}

		const reportedPeptideIdsForDisplay = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

		if ( reportedPeptideIdsForDisplay === undefined || reportedPeptideIdsForDisplay === null ) {
			try {
				const msg = "_displayOnPage_PeptideList(...). this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() returned null or undefined.  this._loadData_For_PeptideList_LoadInProgress: " + this._loadData_For_PeptideList_LoadInProgress;
				console.warn( msg );
				throw Error( msg );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}

		console.log("Rendering Peptide List START, Now: " + new Date() );
		
		let $peptide_table_loading_text_display = $("#peptide_table_loading_text_display");
		if ( $peptide_table_loading_text_display.length === 0 ) {
			throw Error("No element found for id 'peptide_table_loading_text_display'");
		}
		$peptide_table_loading_text_display.hide();

		let $peptide_list_container = $("#peptide_list_container");
		if ( $peptide_list_container.length === 0 ) {
			throw Error("No element found for id 'peptide_list_container'");
		}
		$peptide_list_container.show();
		
		const peptide_list_container_DOM = $peptide_list_container[ 0 ];

		let peptideListLength = reportedPeptideIdsForDisplay.length.toString();

		try {
			peptideListLength = reportedPeptideIdsForDisplay.length.toLocaleString();

		} catch(e) {
			//  eat exception
		}
	

		let $peptide_list_size = $("#peptide_list_size");
		if ( $peptide_list_size.length === 0 ) {
			throw Error("No element found for id 'peptide_list_size'");
		}
		$peptide_list_size.text( peptideListLength );
		
        //  Data for Reported Peptide List Table

        if ( reportedPeptideIdsForDisplay.length === 0 ) {

			let $peptide_table_empty_text_display = $("#peptide_table_empty_text_display");
			if ( $peptide_table_empty_text_display.length === 0 ) {
				throw Error("No element found for id 'peptide_table_empty_text_display'");
			}
			$peptide_table_empty_text_display.show();

			//  Remove any existing peptide table

			// Use ONLY when Data Table is not enclosed by React Managed DOM element
			remove_dataTable_Root_React({ containerDOMElement : peptide_list_container_DOM })

			console.log("Rendering Peptide List END, Now: " + new Date() );

		} else {

			let $peptide_table_empty_text_display = $("#peptide_table_empty_text_display");
			if ( $peptide_table_empty_text_display.length === 0 ) {
				throw Error("No element found for id 'peptide_table_empty_text_display'");
			}
			$peptide_table_empty_text_display.hide();

			const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = (
				this._searchDetailsBlockDataMgmtProcessing.
				getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined })
			);

			const reportedPeptideIds_ForDisplay : Set<number> = new Set<number>()
			const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined )
			{
				const numPsmsForReportedPeptideIdMap = this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
				if ( ! numPsmsForReportedPeptideIdMap) {
					throw Error("this._loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() returned nothing")
				}

				for (const reportedPeptideId of reportedPeptideIdsForDisplay) {
					const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
					if ( numPsms === undefined ) {
						throw Error("numPsmsForReportedPeptideIdMap.get(reportedPeptideId) returned undefined for reportedPeptideId: " + reportedPeptideId )
					}
					reportedPeptideIds_ForDisplay.add( reportedPeptideId )
					const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
						reportedPeptideId,
						psmIds_Include: undefined,
						psmIds_Exclude: undefined,
						psmIds_UnionSelection_ExplicitSelectAll: false,
						psmCount_after_Include_Exclude : numPsms
					})
					reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
				}
			}
			
            const reportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result : ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result = (
                reportedPeptides_DataTableOjbects_ForSingleSearch_PeptidePage_createChildTableObjects({
                    projectSearchId : this._projectSearchId,
					reportedPeptideIds_ForDisplay,
					reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                    searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
                    loadedDataCommonHolder : this._loadedDataCommonHolder,
                    dataPageStateManager : this._dataPageStateManager_DataFrom_Server
                })
            );

			let reportedPeptideList_RootTableObject : DataTable_RootTableObject = null;
			let reportedPeptideList_numberOfReportedPeptides : number = 0;
			let reportedPeptideList_numberOfPsmsForReportedPeptides : number = 0;
	
            reportedPeptideList_RootTableObject = reportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result.dataTable_RootTableObject;
            reportedPeptideList_numberOfReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result.numberOfReportedPeptides;
			reportedPeptideList_numberOfPsmsForReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result.numberOfPsmsForReportedPeptides;
			
			//  Called on render complete
			const renderCompleteCallbackFcn = () => {

				console.log("Rendering Peptide List END, Now: " + new Date() );
			};

			// create_dataTable_Root_React(...): Use ONLY when Data Table is not enclosed by React Managed DOM element
			create_dataTable_Root_React({ tableObject : reportedPeptideList_RootTableObject, containerDOMElement : peptide_list_container_DOM, renderCompleteCallbackFcn })
		}
	}

	
}