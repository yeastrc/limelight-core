/**
 * navigation_dataPages_Maint.js
 * 
 * Javascript:   Set/Update Navigation Links between Data Pages
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants.js';

import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM.js';


/**
 * 
 */
class Navigation_dataPages_Maint {

	/**
	 * 
	 */
	constructor() {

		this._projectSearchIdsOnPage = undefined;
	}
	
	/**
	 * 
	 */
	initializePageOnLoad({ projectSearchIds }) {

		this._projectSearchIdsOnPage = projectSearchIds;

		this._insertNavLinksFromTemplateInHead();

		this._updateNavLinks();

		const $data_pages_nav_links_outer_container = $("#data_pages_nav_links_outer_container");
		if ( $data_pages_nav_links_outer_container.length === 0 ) {
			throw Error("No DOM element with id 'data_pages_nav_links_outer_container'");
		}
		$data_pages_nav_links_outer_container.show();
	}

	/**
	 * Need to call when add/remove project search ids for the page
	 */	
	update_ProjectSearchIdsOnPage({ projectSearchIds }) {

		this._projectSearchIdsOnPage = projectSearchIds;
	}

	/**
	 * 
	 */	
	updateNavLinksForPageURL_Change() {

		this._updateNavLinks();
	}

	/**
	 * Copy contents of <script type="text/text" id="page_navigation_links_template">  </script>
	 * to <div id="data_pages_nav_links_page_container" ></div>
	 */	
	_insertNavLinksFromTemplateInHead() {

		const $page_navigation_links_template = $("#page_navigation_links_template");
		if ( $page_navigation_links_template.length === 0 ) {
			throw Error("No DOM element with id 'page_navigation_links_template'");
		}
		const page_navigation_links_templateHTML = $page_navigation_links_template.html();

		const $data_pages_nav_links_page_container = $("#data_pages_nav_links_page_container");
		if ( $data_pages_nav_links_page_container.length === 0 ) {
			throw Error("No DOM element with id 'data_pages_nav_links_page_container'");
		}
		$data_pages_nav_links_page_container.html( page_navigation_links_templateHTML );
	}

	/**
	 * 
	 */	
	_updateNavLinks() {

		const objectThis = this;

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
			
		
		const $data_pages_nav_links_outer_container = $("#data_pages_nav_links_outer_container");
		if ( $data_pages_nav_links_outer_container.length === 0 ) {
			throw Error("No DOM element with id 'data_pages_nav_links_outer_container'");
		}

		const $selector_nav_linkAll = $data_pages_nav_links_outer_container.find(".selector_nav_link");
		if ( $data_pages_nav_links_outer_container.length === 0 ) {
			throw Error("No DOM element with class 'selector_nav_link'");
		}
		$selector_nav_linkAll.each( function( index, element ) {
			
			const $navLink = $( this );
			const nav_link_base_url = $navLink.attr("data-nav_link_base_url");
			if ( nav_link_base_url === undefined || nav_link_base_url === "" ) {
				throw Error("No attribute with name 'data-nav_link_base_url'");
			}
			if ( nav_link_base_url === controllerPath_forCurrentPage ) {
				//  Nav link is to page already on so remove it.
				const $selector_nav_link_outer_container = $navLink.closest(".selector_nav_link_outer_container");
				$selector_nav_link_outer_container.remove();
				return;  // EARLY EXIT from process single nav link
			}

			if ( objectThis._projectSearchIdsOnPage.length > 1 ) {

				//  Update for if link can be shown for multiple Project Search Ids (Merged)

				const supports_multiple_project_search_ids = $navLink.attr("data-supports_multiple_project_search_ids");
				if ( supports_multiple_project_search_ids === "true" ) {
					const $selector_nav_link_outer_container = $navLink.closest(".selector_nav_link_outer_container");
					$selector_nav_link_outer_container.show();
				} else {
					const $selector_nav_link_outer_container = $navLink.closest(".selector_nav_link_outer_container");
					$selector_nav_link_outer_container.hide();
				}
			} else {
				// Always show for single project search id
				const $selector_nav_link_outer_container = $navLink.closest(".selector_nav_link_outer_container");
				$selector_nav_link_outer_container.show();
			}

			//  Process Link to other page
			objectThis._updateSingleNavLink({ $navLink, nav_link_base_url, pathAddition });
		});



	}

	/**
	 * 
	 */	
	_updateSingleNavLink({ $navLink, nav_link_base_url, pathAddition }) {

		const linkHREF = nav_link_base_url + pathAddition;

		$navLink.attr("href", linkHREF );
	}
	
}


const navigation_dataPages_Maint_Instance = new Navigation_dataPages_Maint();

export { navigation_dataPages_Maint_Instance };

