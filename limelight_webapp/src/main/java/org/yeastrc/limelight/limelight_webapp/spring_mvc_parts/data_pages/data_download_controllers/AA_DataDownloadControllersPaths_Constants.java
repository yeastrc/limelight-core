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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers;

/**
 * The paths of the data download controllers
 *
 * !!!!!  WARNING  !!!!  All Data Download Controllers do their own User Authorization.  There is no Interceptor like for Page Controllers.
 * 
 * 
 */
public class AA_DataDownloadControllersPaths_Constants {

	/**
	 * URL path separator
	 */
	public static final String PATH_SEPARATOR = "/";
	
	
	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = PATH_SEPARATOR;
	
	//////////////////////////////////////////
	
	//  All Data Download start with "/d/dnld/" for data/data download

	//    !!!!!  WARNING  !!!!  All Data Download Controllers do their own User Authorization.  There is no Interceptor like for Page Controllers.
	
	//  All Data Downloads for Project Search Ids start with "/d/dnld/psb/" for data/download ('psb' for project search based)
	
	//////////////

	/**
	 * Specific controller to forward to for NO Session and NOT Public Project - Display error msg page to user
	 */
	public static final String NO_SESSION_NOT_PUBLIC_PROJECT_DOWNLOAD_CONTROLLER = 
			"d/dnld/no-session-not-public-project";
	
	
	
	//////////////
	
	/**
	 * Download A Single Search File. Used on Project page for a specific search 
	 */
	public static final String SEARCH_FILE_DOWNLOAD_CONTROLLER = 
			"d/dnld/psb/search-file";
	
	/**
	 * Download PSMs for Project Search Ids and Search Criteria. Optional Single Protein.  Used on Protein Page, Single Protein Overlay. 
	 */
	public static final String PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_DOWNLOAD_CONTROLLER = 
			"d/dnld/psb/psms-for-project-search-ids-search-criteria";
	
}
