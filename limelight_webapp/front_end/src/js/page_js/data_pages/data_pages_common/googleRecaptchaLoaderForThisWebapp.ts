/**
 * googleRecaptchaLoaderForThisWebapp.ts
 * 
 * Javascript for Loading the Google Recaptcha API Library
 * 
 * Uses jQuery $.ajax to load Javascript
 * 
 */



//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * module imports
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { handleRawAJAXError } from 'page_js/common_all_pages/handleServicesAJAXErrors';


/**
 * Local Constants
 */

//   WARNING:  This URL MUST be entered in the "Content-Security-Policy" section in file 'head_section_include_every_page.jsp'
const GOOGLE_RECAPTCHA_URL ="https://www.recaptcha.net/recaptcha/api.js";

const GOOGLE_RECAPTCHA_LOADED_NO = "LOADED_NO";
const GOOGLE_RECAPTCHA_LOADING_IN_PROGRESS = "LOADING_IN_PROGRESS";
const GOOGLE_RECAPTCHA_LOADED_YES = "LOADED_YES";

/**
 * Local Variables
 */

/**
 * Local Variables - Recaptcha Loading
 */
let googleRecaptcha_Loaded = GOOGLE_RECAPTCHA_LOADED_NO;
let googleRecaptcha_DeferredToResolveOnLoad: Array<Deferred_Local_GoogleRecaptchaLoader> = [];

/**
 * Local Class - Kind of a Hack but it works
 */
class Deferred_Local_GoogleRecaptchaLoader {

	private promise: Promise<any>
	private resolve: any
	private reject: any

	constructor() {
		this.promise = new Promise((resolve, reject)=> {
			try {
				this.reject = reject;
				this.resolve = resolve;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}
	
	containedPromise() {
		return this.promise;
	}
	resolvePromise() {
		// @ts-ignore
		const google = window.google
		this.resolve({ google });
	}
	rejectPromise() {
		this.reject();
	}
}



/**
 * Local Functions
 */

/**
 * 
 */
let _loadGoogleRecaptchaLoader = function() : Promise<any> {	

	return new Promise<void>( function( resolve, reject ) {
		try {
			jQuery.ajax({
				url: GOOGLE_RECAPTCHA_URL,
				dataType: "script",
				cache: true
			}).done( function( data, textStatus, jqXHR ) {
				try {
					googleRecaptcha_Loaded = GOOGLE_RECAPTCHA_LOADED_YES;

					let googleRecaptcha_DeferredToResolveOnLoad_Local = googleRecaptcha_DeferredToResolveOnLoad;
					
					googleRecaptcha_DeferredToResolveOnLoad = []; // reset
					
					if ( googleRecaptcha_DeferredToResolveOnLoad_Local.length > 0 ) {
						googleRecaptcha_DeferredToResolveOnLoad_Local.forEach(function( googleRecaptcha_DeferredToResolveOnLoadItem, i, array) {
	//						console.log("Processsing entry in googleRecaptcha_DeferredToResolveOnLoad_Local, index: " + i );
							googleRecaptcha_DeferredToResolveOnLoadItem.resolvePromise();
						}, this)
					}
					
					resolve();
					
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}).fail( function( jqXHR, textStatus, errorThrown ) {
				handleRawAJAXError( jqXHR );
			});
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	} );
};

/**
 * Public functions
 */

/**
 * 
 */
let loadGoogleRecaptcha = function() : { isLoaded: boolean, grecaptcha: any, loadingPromise: Promise<{ grecaptcha: any }> } {

	if ( googleRecaptcha_Loaded === GOOGLE_RECAPTCHA_LOADED_YES ) {

		// @ts-ignore
		const grecaptcha = window.grecaptcha

		if ( ! grecaptcha ) {
			const msg = "loadGoogleRecaptcha: googleRecaptcha_Loaded === GOOGLE_RECAPTCHA_LOADED_YES but window.grecaptcha not populated";
			console.warn( msg );
			throw Error( msg );
		}
		return { isLoaded: true, grecaptcha, loadingPromise: null };
	}
	
	if ( googleRecaptcha_Loaded === GOOGLE_RECAPTCHA_LOADING_IN_PROGRESS ) {
				
		let deferred = new Deferred_Local_GoogleRecaptchaLoader();
		googleRecaptcha_DeferredToResolveOnLoad.push( deferred );
//		console.log("Adding to googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoad");
		return { loadingPromise: deferred.containedPromise(), grecaptcha: null, isLoaded: false };
	}

	googleRecaptcha_Loaded = GOOGLE_RECAPTCHA_LOADING_IN_PROGRESS;

	return { loadingPromise : new Promise( function( resolve, reject ) {
	  	try {
			let loadGoogleRecaptcha_Loader_Promise : any = _loadGoogleRecaptchaLoader()

			loadGoogleRecaptcha_Loader_Promise.catch( reason => {

				reject( reason );
			});

			loadGoogleRecaptcha_Loader_Promise.then(function(value: any) { // On Fulfilled
				try {
					googleRecaptcha_Loaded = GOOGLE_RECAPTCHA_LOADED_YES;

					let googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoad_Local = googleRecaptcha_DeferredToResolveOnLoad;

					googleRecaptcha_DeferredToResolveOnLoad = []; // reset

					if ( googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoad_Local.length > 0 ) {
						googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoad_Local.forEach(function( googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoadItem, i, array) {
							//						console.log("Processsing entry in googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoad_Local, index: " + i );
							googleRecaptchaCoreRecaptchas_DeferredToResolveOnLoadItem.resolvePromise();
						}, this)
					}

					// @ts-ignore
					const grecaptcha = window.grecaptcha

					resolve({ grecaptcha });

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	} ), isLoaded: false, grecaptcha: null };
	
};


export { loadGoogleRecaptcha }
