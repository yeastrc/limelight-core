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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers;

/**
 * The paths of the Error Page Controllers 
 *
 */
public class AA_ErrorPageControllerPaths_Constants {

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
	 * Display main error page. This JSP is also used by other controllers
	 */
	public static final String MAIN_ERROR_PAGE_CONTROLLER = "error_display_page";
	
	/**
	 * Display error page for user not allowed to access project associated with requested data (Protein page, etc)
	 */
	public static final String ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE = "associatedProjectAccessNotAllowed_ErrorPage_Controller";

	
	public static final String FORWARD_TO_ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE = 
			"forward:" + PATH_START_ALL + ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE;
	
	/**
	 * Display Internet Explorer Not Supported Error Message.
	 */
	public static final String INTERNET_EXPLORER_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER = "internet-explorer-not-supported";
	
}
