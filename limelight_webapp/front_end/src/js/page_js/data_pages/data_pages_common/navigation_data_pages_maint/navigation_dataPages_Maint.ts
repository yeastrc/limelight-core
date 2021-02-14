/**
 * navigation_dataPages_Maint.ts
 * 
 * Javascript:   Set/Update Navigation Links between Data Pages
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import {navigation_dataPages_Maint_Component_Create_JSX} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component_Create_JSX";
import {
	Navigation_dataPages_Maint_Entry,
	Navigation_dataPages_Maint_Root_Component_Props_PropsValue
} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";
import ReactDOM from "react-dom";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";



/**
 *
 */
export class Navigation_dataPages_Maint_Updated_CallbackParams {

	private _placeHolder : any
	constructor() {
	}
}

/**
 *
 */
export type Navigation_dataPages_Maint_Updated_Callback = ( params : Navigation_dataPages_Maint_Updated_CallbackParams ) => void

/**
 * 
 */
class Navigation_dataPages_Maint {

	private _page_navigation_links_data : any // Parsed from DOM id 'page_navigation_links_data_json' which is JSON

	private _isManageNavigationOnPage : boolean // DOM for navagation managed by this class or external
	private _navigationChange_Callback : Navigation_dataPages_Maint_Updated_Callback // Called whenever method updateNavLinks() is called
	private _isSingleSearch : boolean
	private _isMultipleSearches : boolean
	private _isExperimentPage : boolean

	constructor() {
		try {
			const page_navigation_links_data_jsonDOM = document.getElementById("page_navigation_links_data_json")
			if ( ! page_navigation_links_data_jsonDOM ) {
				const msg = "No DOM element with id 'page_navigation_links_data_json'"
				console.warn( msg )
				throw Error( msg )
			}
			const page_navigation_links_data_jsonText = page_navigation_links_data_jsonDOM.innerText;
			try {
				this._page_navigation_links_data = JSON.parse( page_navigation_links_data_jsonText );
			} catch (e) {
				const msg = "Failed to parse JSON in DOM element with id 'page_navigation_links_data_json'.  JSON: " +
					page_navigation_links_data_jsonText +
					".  Error msg: " + e;
				console.warn( msg, e );
				throw Error( msg )
			}

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	/**
	 * @param isManageNavigationOnPage : boolean // DOM for navagation managed by this class or external
	 * @param navigationChange_Callback : Called whenever method updateNavLinks() is called. MUST be populated if isManageNavigationOnPage is not true
	 */
	initializePageOnLoad({

		isManageNavigationOnPage,
		navigationChange_Callback,

		isSingleSearch,
		isMultipleSearches,
		isExperimentPage,
	} : {

		isManageNavigationOnPage : boolean
		navigationChange_Callback : Navigation_dataPages_Maint_Updated_Callback
		isSingleSearch : boolean
		isMultipleSearches : boolean
		isExperimentPage : boolean
	} ) : void {

		if ( ( ! isManageNavigationOnPage ) && ( ! navigationChange_Callback ) ) {
			const msg = "Navigation_dataPages_Maint: navigationChange_Callback must be populated if isManageNavigationOnPage is not true"
			console.warn( msg );
			throw Error( msg )
		}
		this._isManageNavigationOnPage = isManageNavigationOnPage;
		this._navigationChange_Callback = navigationChange_Callback;
		this._isSingleSearch = isSingleSearch;
		this._isMultipleSearches = isMultipleSearches;
		this._isExperimentPage = isExperimentPage;

		this.updateNavLinks();
	}

	/**
	 * Need to call when add/remove project search ids for the page
	 */	
	update_isSingleSearch_isMultipleSearches_isExperimentPage({
		isSingleSearch,
		isMultipleSearches,
		isExperimentPage,
	} : {

		isSingleSearch : boolean
		isMultipleSearches : boolean
		isExperimentPage : boolean
	} ) : void {

		this._isSingleSearch = isSingleSearch;
		this._isMultipleSearches = isMultipleSearches;
		this._isExperimentPage = isExperimentPage
	}

	/**
	 * 
	 */	
	updateNavLinksForPageURL_Change() {

		this.updateNavLinks();
	}

	/**
	 *
	 */
	public updateNavLinks() {

		if ( ( ! this._isSingleSearch ) && ( ! this._isMultipleSearches ) ) {

			//  Not Single Search so skip

			console.warn( "ONLY Single Search or Multiple Searches supported for Nav for Now");

			return; // EARLY RETURN
		}

		const controllerPath_forCurrentPage = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

		//  Create URL Path to append to base page controller paths for links

		const windowPath = window.location.pathname;

		const windowPath_controllerPathIndex = windowPath.indexOf( controllerPath_forCurrentPage );
		const windowPath_after_controllerPathIndex = windowPath_controllerPathIndex + controllerPath_forCurrentPage.length;

		const windowPathAfterControllerPath = windowPath.substring( windowPath_after_controllerPathIndex );

		let pathAddition = windowPathAfterControllerPath;

		if ( ! windowPath.endsWith( _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR ) ) {

			pathAddition += _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR;
		}

		let perSearchExperimentType; // per single search, multiple search, or experiment type

		if ( this._isSingleSearch || this._isMultipleSearches ) {
			perSearchExperimentType = this._page_navigation_links_data.single_search
		} else {
			const msg = "ONLY Single Search or Multiple Searches supported for Nav for Now. Should NOT get here.";
			console.warn( msg );
			throw Error( msg )
		}


		const navEntries = perSearchExperimentType.nav_entries; // entries per single search, multiple search, or experiment

		const navComponentEntries : Array<Navigation_dataPages_Maint_Entry> = []

		for ( const navEntry of navEntries ) {

			const nav_link_base_url = navEntry.nav_link_base_url
			if ( nav_link_base_url === controllerPath_forCurrentPage ) {
				//  Skip current page
			} else {
				const label = navEntry.label;
				const href = nav_link_base_url + pathAddition;

				const navComponentEntry = new Navigation_dataPages_Maint_Entry({ label, href });
				navComponentEntries.push( navComponentEntry );
			}
		}

		const navigation_dataPages_Maint_Root_Component_Props_PropsValue = new Navigation_dataPages_Maint_Root_Component_Props_PropsValue({ navEntries : navComponentEntries })

		const navigation_dataPages_Maint_Root_Component = navigation_dataPages_Maint_Component_Create_JSX({ navigation_dataPages_Maint_Root_Component_Props_PropsValue });

		const containerDOMElement = document.getElementById("data_pages_nav_links_page_container")
		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'data_pages_nav_links_page_container'");
		}

		const renderCompletecallbackFcn = ( ) => { };

		const renderedReactComponent = ReactDOM.render(
			navigation_dataPages_Maint_Root_Component,
			containerDOMElement,
			renderCompletecallbackFcn
		);
	}
	
}


const navigation_dataPages_Maint_Instance = new Navigation_dataPages_Maint();

export { navigation_dataPages_Maint_Instance };

