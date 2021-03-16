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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_fragment_controllers;


/**
 * The paths of the data page Fragment controllers
 * 
 * These return a FRAGMENT of HTML
 *
 */
public class AA_Page_Fragment_ControllerPaths_Constants {

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


	//////////////////////////////////////////
	
	//  All Data Page Fragments start with "/d/pgf/" for data/page fragment

	//  All Data Page Fragments for Experiment Ids start with "/d/pgf/exp/" for data/page fragment ('exp' for experiment based)
	
	//  All Data Page Fragments for Project Search Ids start with "/d/pgf/psb/" for data/page fragment ('psb' for project search based)

	/**
	 * List the projects - For Main Page Header Dropdown 
	 */
	public static final String PROJECTS_LIST_FOR_MAIN_PAGE_HEADER_DROP_DOWN__PAGE_FRAGMENT_CONTROLLER = "d/pgf/project-list-for-main-page-header-drop-down";

}
