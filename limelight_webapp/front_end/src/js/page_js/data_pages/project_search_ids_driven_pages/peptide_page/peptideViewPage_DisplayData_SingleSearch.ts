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

import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage';

import { ProteinView_LoadedDataCommonHolder } from '../protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from '../protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer';
import { ProteinViewDataLoader } from '../protein_page/protein_page_common/proteinViewDataLoader';
import { ReportedPeptideStringData_For_ReportedPeptideId } from '../protein_page/protein_page_common/reportedPeptideStringData_For_ReportedPeptideId';
import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';
import { ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result, reportedPeptides_DataTableOjbects_ForSingleSearch_PeptidePage_createChildTableObjects } from './peptidePage_Display_SingleSearch_ReportedPeptideListSection_Create_TableData';
import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from '../protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer';

/**
 * 
 */
export class PeptideViewPage_Display_SingleSearch {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
		
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	
	private _annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;
	
	private _searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage;


	//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
	
	// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
	
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;

	
	// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
	

	private _proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;
	
	private _proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer : ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer;
	
	private _projectSearchId : number;


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
		
		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			displayOnly : false,
			dataPages_LoggedInUser_CommonObjectsFactory : undefined,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			rerenderPageForUpdatedFilterCutoffs_Callback : undefined
		} );
		
		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder
		});

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer({
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing, //  Used in loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...) if param is not passed
			proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
		});
		
		
		const promise_loadData_For_PeptideList = this._loadData_For_PeptideList();

		promise_loadData_For_PeptideList.catch( (reason) => {  })

		promise_loadData_For_PeptideList.then( ( loadData_PromiseResult ) => { // loadData_PromiseResult may be undefined

			this._displayOnPage_PeptideList( loadData_PromiseResult );
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
					this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.getDataFromServer( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, forPeptidePage : true } )
				);

				promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch( (reason) => {} );
				promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then( (value) => {
					try {

						const reportedPeptideIds : Array<number> = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

						if ( ! reportedPeptideIds.length ) {

							//  No Reported Peptide Ids returned

							resolve({ noReportedPeptideIds : true });

							return;  // EARLY RETURN
						}

						const promises = [];

						const promise_getReportedPeptideStringsFromReportedPeptideIds = this._getReportedPeptideStringsFromReportedPeptideIds();
						promises.push( promise_getReportedPeptideStringsFromReportedPeptideIds );

						const promise_loadDataAfterInitialOverlayShow = this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.loadDataAfterInitialOverlayShow( { 
		
							retrieveForSingleSearch : true, retrieveForMultipleSearches : false, proteinSequenceVersionId : undefined, projectSearchId, 
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
	private _getReportedPeptideStringsFromReportedPeptideIds() : Promise<any> {

		return new Promise( (resolve, reject) => {
			try {
				const reportedPeptideIds = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

				const promise_getReportedPeptideStringsFromReportedPeptideIds = ProteinViewDataLoader.getReportedPeptideStringsFromReportedPeptideIds( { 
					projectSearchIds : [ this._projectSearchId ], reportedPeptideIds 
				} );

				promise_getReportedPeptideStringsFromReportedPeptideIds.
				then( ( { reportedPeptideStrings_Key_reportedPeptideId, foundAllReportedPeptideIdsForProjectSearchIds } ) => {
					try {
						const loadedDataCommonHolder = this._loadedDataCommonHolder;

						for ( const reportedPeptideId of reportedPeptideIds ) {

							const reportedPeptideString = reportedPeptideStrings_Key_reportedPeptideId[ reportedPeptideId ];
							if ( reportedPeptideString === undefined ) {
								throw Error("No reportedPeptideString for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + this._projectSearchId );
							}

							const reportedPeptideStringData = new ReportedPeptideStringData_For_ReportedPeptideId( { reportedPeptideString : reportedPeptideString.reportedPeptideString } );

							loadedDataCommonHolder.add_reportedPeptideStringData_KeyReportedPeptideId( { reportedPeptideStringData, reportedPeptideId } );
						}

						resolve();

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				promise_getReportedPeptideStringsFromReportedPeptideIds.catch(function(reason) {
					try {
						reject(reason);

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


	/**
	 * 
	 */
	private _displayOnPage_PeptideList( loadData_PromiseResult : { noReportedPeptideIds : boolean } ) {

		// loadData_PromiseResult may be undefined

		let noReportedPeptideIds = false ;

		if ( loadData_PromiseResult && loadData_PromiseResult.noReportedPeptideIds ) {

			noReportedPeptideIds = true;
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

		const reportedPeptideIdsForDisplay = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

		let peptideListLength = reportedPeptideIdsForDisplay.length;
	

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

			ReactDOM.unmountComponentAtNode( peptide_list_container_DOM );

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
			
            const reportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result : ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result = (
                reportedPeptides_DataTableOjbects_ForSingleSearch_PeptidePage_createChildTableObjects({
                    projectSearchId : this._projectSearchId,
                    reportedPeptideIds : new Set( reportedPeptideIdsForDisplay ),
                    reporterIonMassesSelected : undefined, // new Set(),
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

			//  Create React component instance using React.createElement(...) so don't have to make this file .tsx
			
			const proteinExperimentPage_SingleProtein_Root_Component = (
				React.createElement(
					DataTable_TableRoot,
					{
						tableObject : reportedPeptideList_RootTableObject
					},
					null
				)
			);

			const renedered_DataTable_TableRoot : DataTable_TableRoot = ReactDOM.render( 
				proteinExperimentPage_SingleProtein_Root_Component,
				peptide_list_container_DOM,
				renderCompleteCallbackFcn
			);
		
		}
	}

	
}