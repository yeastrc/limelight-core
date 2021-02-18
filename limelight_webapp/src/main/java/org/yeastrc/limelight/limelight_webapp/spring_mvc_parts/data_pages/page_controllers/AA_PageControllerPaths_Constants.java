/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers;


/**
 * The paths of the data page controllers
 *
 */
public class AA_PageControllerPaths_Constants {

	//  for user account see: AA_UserAccount_PageControllerPaths_Constants

	/**
	 * URL path separator
	 */
	public static final String PATH_SEPARATOR = "/";
	
	
	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = PATH_SEPARATOR;
	
	
	/**
	 * Root controller for "/"
	 */
	public static final String ROOT_CONTROLLER = "";

	
	/**
	 * URL Shortener URL that will redirect to the URL that the short code maps to using the database
	 */
	public static final String URL_SHORTENER_REDIRECT_PAGE_CONTROLLER = "go";


	//////////////////////////////////////////
	
	//  All Data Pages start with "/d/pg/" for data/page

	//  All Data Pages for Experiment Ids start with "/d/pg/exp/" for data/page ('exp' for experiment based)
	
	//  All Data Pages for Project Search Ids start with "/d/pg/psb/" for data/page ('psb' for project search based)

	/**
	 * List the projects
	 */
	public static final String PROJECTS_LIST_PAGE_CONTROLLER = "d/pg/project-list";

	/**
	 * List the projects.  For each project list the searches and users
	 */
	public static final String PROJECT_SEARCH_LIST_PAGE_CONTROLLER = "d/pg/project-search-list";
	
	/**
	 * View a Project
	 */
	public static final String PROJECT_VIEW_PAGE_CONTROLLER = "d/pg/project";

	/**
	 * Project Short Name that will redirect to "View a Project"
	 */
	public static final String PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER = "p";

	///////////////
	
	//   PSM based controller

	/**
	 * Page to show Lorikeet in
	 */
	public static final String LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER = "d/pg/spectrum-viewer";

	///////////////
	
	/**
	 * All paths for Experiment Id based pages will start with this string
	 */
	public static final String EXPERIMENT_ID_BASED_PAGE_CONTROLLER_START = "d/pg/exp/";
	

	///////////////
	
	//  Start of Experiment Id based pages paths.  Always put trailing '/'.

	/**
	 * View Peptides for 1 experiment id
	 */
	public static final String EXPERIMENT___PEPTIDE_VIEW_PAGE_CONTROLLER = "d/pg/exp/peptide/";

	/**
	 * View Proteins for 1 experiment id
	 */
	public static final String EXPERIMENT___PROTEIN_VIEW_PAGE_CONTROLLER = "d/pg/exp/protein/";

	/**
	 * View Mods for 1 experiment id
	 */
	public static final String EXPERIMENT___MOD_VIEW_PAGE_CONTROLLER = "d/pg/exp/mod-view/";

	

	///////////////
	
	/**
	 * All paths for Project Search Id based pages will start with this string
	 */
	public static final String PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START = "d/pg/psb/";
	

	///////////////
	
	//  Start of Project Search Id based pages paths.  Always put trailing '/'.
	
	/**
	 * View Peptides for 1 or multiple project search ids
	 */
	public static final String PEPTIDE_VIEW_PAGE_CONTROLLER = "d/pg/psb/peptide/";

	/**
	 * View Proteins for 1 or multiple project search ids
	 */
	public static final String PROTEIN_VIEW_PAGE_CONTROLLER = "d/pg/psb/protein/";

	/**
	 * Mod View - Modification View - 1 or multiple project search ids
	 */
	public static final String MOD_VIEW_PAGE_CONTROLLER = "d/pg/psb/mod-view/";
	

	///////////////
	
	//  Experiment Id "ONLY" based pages paths after each page type (ie: '/exp/protein/').

	/**
	 * identifies the Experiment Id
	 */
	public static final String PATH_PARAMETER_EXPERIMENT_ID = "e/";
	
	/**
	 * Experiment id parameter data, next after PATH_PARAMETER_EXPERIMENT_ID
	 */
	public static final String PATH_PARAMETER_EXPERIMENT_ID__DATA = "experimentIdData";

	/**
	 * Experiment id parameter data.  Spring MVC format for path parameter
	 */
	public static final String PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION =
			"{" + PATH_PARAMETER_EXPERIMENT_ID__DATA + "}";

	

	/**
	 * identifies the Search Params Lookup Code (the code immediately after the page label for the Project Search Id based pages)
	 */
	public static final String PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE = "/c/";
	
	//  !!!!!!  For value after '/c/' use PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE from below

	///////////////
	
	//  Experiment Id and Project Search Id based pages paths after each page type (ie: '/peptide/').
	
	//  These strings (except for '{', '}', '/') are arbitrary and just have to be unique within a controller
	
	//  These strings are also used for the @PathVariable on Java method parameter
	

	/**
	 * identifies the data for second parameter as being set by the same page for itself
	 */
	public static final String PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE = "/q/";
	
	/**
	 * identifies the data for second parameter as being referred by another page for this page, no page state
	 */
	public static final String PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE = "/r";

	/**
	 * identifies the data for fourth parameter as being referred by another page for this page, with page state
	 */
	public static final String PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE = "/r";
	
	/**
	 * First item always after page type.  
	 */
	public static final String PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE = "searchDataLookupParametersCode";
	
	/**
	 * Spring MVC format for path parameter
	 */
	public static final String PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE + "}";
	
	/**
	 * Second optional parameter.  Missing if none
	 */
	public static final String PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA = "additionalPageStateDataData";

	/**
	 * Second optional parameter.  Spring MVC format for path parameter
	 */
	public static final String PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA + "}";

	
	
	/////////////////////////////

	/**
	 * Only paths allowed for Save View
	 */
	public static final String[] PATHS_ALLOWED_FOR_SAVE_VIEW = {
			EXPERIMENT___PEPTIDE_VIEW_PAGE_CONTROLLER,
			EXPERIMENT___PROTEIN_VIEW_PAGE_CONTROLLER,
			EXPERIMENT___MOD_VIEW_PAGE_CONTROLLER,
			PEPTIDE_VIEW_PAGE_CONTROLLER,
			PROTEIN_VIEW_PAGE_CONTROLLER,
			MOD_VIEW_PAGE_CONTROLLER
	};

	/////////////////////////////

	/**
	 * Only paths allowed for Share Page
	 */
	public static final String[] PATHS_ALLOWED_FOR_SHARE_PAGE = {
			EXPERIMENT___PEPTIDE_VIEW_PAGE_CONTROLLER,
			EXPERIMENT___PROTEIN_VIEW_PAGE_CONTROLLER,
			EXPERIMENT___MOD_VIEW_PAGE_CONTROLLER,
			PEPTIDE_VIEW_PAGE_CONTROLLER,
			PROTEIN_VIEW_PAGE_CONTROLLER,
			MOD_VIEW_PAGE_CONTROLLER
	};
}
