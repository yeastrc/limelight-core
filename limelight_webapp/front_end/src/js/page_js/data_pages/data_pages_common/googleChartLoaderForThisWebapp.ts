/**
 * googleChartLoaderForThisWebapp.ts
 * 
 * Javascript for Loading the Google Chart API Library
 * 
 * This all needs to be recoded for being called for more than "corechart"
 * 
 * Any calls for another chart package needs to wait
 * until the previous call completes and
 * the function in google.charts.setOnLoadCallback(...) is called. 
 * 
 * Uses jQuery $.ajax to load Javascript
 * 
 */



//   UNUSED so Commented Out

//  If use this, must uncomment:    <%-- 'unsafe-eval' --%>  <%--  Required for Google Charts --%>


//JavaScript directive:   all variables have to be declared with "var", maybe other things
// "use strict";
//
// ///////////////////////////////////////////
//
// /**
//  * module imports
//  */
//
// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
//
// import { handleRawAJAXError } from 'page_js/handleServicesAJAXErrors';
//
//
// /**
//  * Local Constants
//  */
//
// const GOOGLE_CHART_LOADER_URL ="https://www.gstatic.com/charts/loader.js";
//
// const GOOGLE_CHART_LOADER_LOADED_NO = "LOADED_NO";
// const GOOGLE_CHART_LOADER_LOADING_IN_PROGRESS = "LOADING_IN_PROGRESS";
// const GOOGLE_CHART_LOADER_LOADED_YES = "LOADED_YES";
//
// /**
//  * Local Variables
//  */
//
// /**
//  * Local Variables - Chart Loader Loading
//  */
// let googleChartLoader_Loaded = GOOGLE_CHART_LOADER_LOADED_NO;
// let googleChartLoader_DeferredToResolveOnLoad: Array<Deferred_Local_GoogleChartLoader> = [];
//
// /**
//  * Local Variables - Core Charts Loading
//  */
//
// let googleChartCoreCharts_Loaded = GOOGLE_CHART_LOADER_LOADED_NO;
// let googleChartCoreCharts_DeferredToResolveOnLoad: Array<Deferred_Local_GoogleChartLoader> = [];
//
// /**
//  * Local Class - Kind of a Hack but it works
//  */
// class Deferred_Local_GoogleChartLoader {
//
// 	private promise: Promise<any>
// 	private resolve: any
// 	private reject: any
//
// 	constructor() {
// 		this.promise = new Promise((resolve, reject)=> {
// 			try {
// 				this.reject = reject;
// 				this.resolve = resolve;
// 			} catch( e ) {
// 				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 				throw e;
// 			}
// 		});
// 	}
//
// 	containedPromise() {
// 		return this.promise;
// 	}
// 	resolvePromise() {
// 		// @ts-ignore
// 		const google = window.google
// 		this.resolve({ google });
// 	}
// 	rejectPromise() {
// 		this.reject();
// 	}
// }
//
//
//
// /**
//  * Local Functions
//  */
//
// /**
//  *
//  */
// let _loadGoogleChartLoader = function() {
//
// 	if ( googleChartLoader_Loaded === GOOGLE_CHART_LOADER_LOADED_YES ) {
// 		return Promise.resolve();
// 	}
//
// 	if ( googleChartLoader_Loaded === GOOGLE_CHART_LOADER_LOADING_IN_PROGRESS ) {
//
// 		let deferred = new Deferred_Local_GoogleChartLoader();
// 		googleChartLoader_DeferredToResolveOnLoad.push( deferred );
// //		console.log("Adding to googleChartLoader_DeferredToResolveOnLoad");
// 		return { loadingPromise: deferred.containedPromise() };
// 	}
//
// 	googleChartLoader_Loaded = GOOGLE_CHART_LOADER_LOADING_IN_PROGRESS;
//
// 	return new Promise<void>( function( resolve, reject ) {
// 		try {
// 			jQuery.ajax({
// 				url: GOOGLE_CHART_LOADER_URL,
// 				dataType: "script",
// 				cache: true
// 			}).done( function( data, textStatus, jqXHR ) {
// 				try {
// 					googleChartLoader_Loaded = GOOGLE_CHART_LOADER_LOADED_YES;
//
// 					let googleChartLoader_DeferredToResolveOnLoad_Local = googleChartLoader_DeferredToResolveOnLoad;
//
// 					googleChartLoader_DeferredToResolveOnLoad = []; // reset
//
// 					if ( googleChartLoader_DeferredToResolveOnLoad_Local.length > 0 ) {
// 						googleChartLoader_DeferredToResolveOnLoad_Local.forEach(function( googleChartLoader_DeferredToResolveOnLoadItem, i, array) {
// 	//						console.log("Processsing entry in googleChartLoader_DeferredToResolveOnLoad_Local, index: " + i );
// 							googleChartLoader_DeferredToResolveOnLoadItem.resolvePromise();
// 						}, this)
// 					}
//
// 					resolve();
//
// 				} catch( e ) {
// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 					throw e;
// 				}
// 			}).fail( function( jqXHR, textStatus, errorThrown ) {
// 				handleRawAJAXError( jqXHR );
// 			});
// 		} catch( e ) {
// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 			throw e;
// 		}
// 	} );
// };
//
// /**
//  *
//  */
// let _loadGoogleChartPackages = function( { chartPackagesToLoad } : { chartPackagesToLoad: any } ) {
//
// 	return new Promise<void>( function( resolve, reject ) {
// 		try {
// 			// @ts-ignore
// 			const google = window.google
// 			google.charts.load( "current", {packages: chartPackagesToLoad } );
//
// 			let googleOnLoadCallbackFunction = function() {
// 				resolve();
// 			};
//
// 			//  Set a callback for when the charts are loaded
// 			google.charts.setOnLoadCallback( googleOnLoadCallbackFunction );
//
// 		} catch( e ) {
// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 			throw e;
// 		}
// 	} );
// }
//
// /**
//  * Public functions
//  */
//
// /**
//  *
//  */
// let loadGoogleChart_CoreChart = function() {
//
// 	if ( googleChartCoreCharts_Loaded === GOOGLE_CHART_LOADER_LOADED_YES ) {
//
// 		// @ts-ignore
// 		const google = window.google
//
// 		if ( ! google ) {
// 			const msg = "loadGoogleChart_CoreChart: googleChartCoreCharts_Loaded === GOOGLE_CHART_LOADER_LOADED_YES but window.google not populated";
// 			console.warn( msg );
// 			throw Error( msg );
// 		}
// 		return { isLoaded: true, google };
// 	}
//
// 	if ( googleChartCoreCharts_Loaded === GOOGLE_CHART_LOADER_LOADING_IN_PROGRESS ) {
//
// 		let deferred = new Deferred_Local_GoogleChartLoader();
// 		googleChartCoreCharts_DeferredToResolveOnLoad.push( deferred );
// //		console.log("Adding to googleChartCoreCharts_DeferredToResolveOnLoad");
// 		return { loadingPromise: deferred.containedPromise() };
// 	}
//
// 	googleChartCoreCharts_Loaded = GOOGLE_CHART_LOADER_LOADING_IN_PROGRESS;
//
// 	let chartPackagesToLoad = ["corechart"];
//
// 	return { loadingPromise : new Promise( function( resolve, reject ) {
// 	  	try {
// 			let loadGoogleChart_Loader_Promise : any = _loadGoogleChartLoader()
// 			loadGoogleChart_Loader_Promise.then(function(value: any) { // On Fulfilled
// 				try {
// 					let loadGoogleChart__Promise = _loadGoogleChartPackages( { chartPackagesToLoad } );
// 					loadGoogleChart__Promise.then(function(value) { // On Fulfilled
// 						try {
// 							googleChartCoreCharts_Loaded = GOOGLE_CHART_LOADER_LOADED_YES;
//
// 							let googleChartCoreCharts_DeferredToResolveOnLoad_Local = googleChartCoreCharts_DeferredToResolveOnLoad;
//
// 							googleChartCoreCharts_DeferredToResolveOnLoad = []; // reset
//
// 							if ( googleChartCoreCharts_DeferredToResolveOnLoad_Local.length > 0 ) {
// 								googleChartCoreCharts_DeferredToResolveOnLoad_Local.forEach(function( googleChartCoreCharts_DeferredToResolveOnLoadItem, i, array) {
// 			//						console.log("Processsing entry in googleChartCoreCharts_DeferredToResolveOnLoad_Local, index: " + i );
// 									googleChartCoreCharts_DeferredToResolveOnLoadItem.resolvePromise();
// 								}, this)
// 							}
//
// 							// @ts-ignore
// 							const google = window.google
//
// 							resolve({ google });
//
// 						} catch( e ) {
// 							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 							throw e;
// 						}
// 					}).catch(function(reason) {
// 						try {
// 							throw Error( "Loading Google Chart Package Failed" );
// 						} catch( e ) {
// 							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 							throw e;
// 						}
// 					});
// 				} catch( e ) {
// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 					throw e;
// 				}
// 			}).catch(function(reason: any) {
// 				try {
// 					throw Error( "Loading Google Chart Package Loader" );
// 				} catch( e ) {
// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 					throw e;
// 				}
// 			});
// 		} catch( e ) {
// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 			throw e;
// 		}
// 	} ) };
//
// };
//
//
// export { loadGoogleChart_CoreChart }
