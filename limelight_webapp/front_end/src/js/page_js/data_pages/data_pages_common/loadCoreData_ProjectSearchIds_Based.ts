/**
 * loadCoreData_ProjectSearchIds_Based.ts
 * 
 * Load core data for Project Search Id Based pages page  
 * 
 * ie: Annotation Type data, Per Program data, etc
 * 
 * 
 * 
 */
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchNameRetrieval }  from './searchNameRetrieval';
import { SearchProgramsPerSearchDataRetrieval }  from './searchProgramsPerSearchDataRetrieval';
import { AnnotationTypeDataRetrieval } from './annotationTypeDataRetrieval';
import {dataPage_common_Get_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";


/**
 * 
 */
export class LoadCoreData_ProjectSearchIds_Based{

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	_annotationTypeDataRetrieval : AnnotationTypeDataRetrieval;
	_searchNameRetrieval : SearchNameRetrieval;
	_searchProgramsPerSearchDataRetrieval : SearchProgramsPerSearchDataRetrieval;

	//  Bind 'this' to 'this.loadDataFor_ProjectSearchIds_ExcludeMainQueries'
	_processRequestAsPromise_BoundThis: any;
	

	/**
	 * 
	 */
	constructor( 
		{ dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, dataPageStateManager_DataFrom_Server } :
		{ dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, dataPageStateManager_DataFrom_Server : DataPageStateManager }
	) {

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._annotationTypeDataRetrieval = new AnnotationTypeDataRetrieval();
		this._searchNameRetrieval = new SearchNameRetrieval();
		this._searchProgramsPerSearchDataRetrieval = new SearchProgramsPerSearchDataRetrieval();

		//  Bind 'this' to 'this.loadDataFor_ProjectSearchIds_ExcludeMainQueries'
		this._processRequestAsPromise_BoundThis = this._processRequestAsPromise.bind( this );
		
	}
	

	/**
	 * This is called:
	 * 	  Initial Page Load
	 *    Any time Project Search Ids are changed
	 *    After any AJAX call completes for any function called in this function
	 *    
	 * This loads data for the Project Search Ids (Project Names, Annotation Type data, etc)
	 * 
	 * This does not perform any main query using the filter data
	 * 
	 * returns a Promise 
	 */
	loadCoreDataFor_ProjectSearchIds() {

		return new Promise( this._processRequestAsPromise_BoundThis );
	}
	
	_processRequestAsPromise( resolve_Overall: any, reject_Overall: any ) {
		try {
			const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();
			
			let promisesToWaitFor = []; //  'sub' promises

			{
				const promiseToAdd = new Promise<void>( (resolve_promise_dataPage_common_Get_Searches_Flags, reject_promise_dataPage_common_Get_Searches_Flags) => {
					try {
						const promise_dataPage_common_Get_Searches_Flags = dataPage_common_Get_Searches_Flags({ projectSearchIds });

						promise_dataPage_common_Get_Searches_Flags.catch( reason => {
							try {
								reject_promise_dataPage_common_Get_Searches_Flags(reason);

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						});

						promise_dataPage_common_Get_Searches_Flags.then( result => {
							try {
								this._dataPageStateManager_DataFrom_Server.set_DataPage_common_Searches_Flags(result);

								resolve_promise_dataPage_common_Get_Searches_Flags();

							} catch( e ) {
								console.warn(e);
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}
						})


					} catch( e ) {
						console.warn(e);
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				})

				promisesToWaitFor.push( promiseToAdd );
			}
			{
				//  Retrieval of search names from server for project search ids
				let retrieveSearchNames_Promise = this._searchNameRetrieval.retrieveSearchNames( {
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server 
				} );

				if ( retrieveSearchNames_Promise ) {
					promisesToWaitFor.push( retrieveSearchNames_Promise );
				}
			}

			{
				let retrieveAnnotationType_Promise = this._annotationTypeDataRetrieval.retrieveSearchAnnotationTypeData( {
					dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
				} );

				if ( retrieveAnnotationType_Promise ) {
					promisesToWaitFor.push( retrieveAnnotationType_Promise );
				}
			}

			{
				let searchProgramsPerSearchDataRetrieval_Promise = this._searchProgramsPerSearchDataRetrieval.retrieveSearchProgramsPerSearchData( 
					this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, this._dataPageStateManager_DataFrom_Server
				);

				if ( searchProgramsPerSearchDataRetrieval_Promise ) {
					promisesToWaitFor.push( searchProgramsPerSearchDataRetrieval_Promise );
				}
			}
			
			if ( promisesToWaitFor.length === 0 ) {
				
				window.setTimeout( () => {
					try {
						resolve_Overall();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				}, 10 );
				
			} else {
				
				const promisesToWaitFor_Promise_all = Promise.all( promisesToWaitFor );

				promisesToWaitFor_Promise_all.catch( ( rejectionReason) => {
					try {
						reject_Overall();
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
				
				promisesToWaitFor_Promise_all.then( ( resolvedPromisesArray ) => { 
					try {
						//  All loads complete
						resolve_Overall();

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}

				});
			}
		} catch( e ) {
			console.warn("Exception LoadCoreData_ProjectSearchIds_Based._processRequestAsPromise(...). Exception listed next logging.  Exception as String: " + e );
			console.warn( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}
	
}