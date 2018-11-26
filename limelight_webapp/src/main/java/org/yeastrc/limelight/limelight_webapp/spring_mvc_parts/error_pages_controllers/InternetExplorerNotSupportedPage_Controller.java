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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Display main error page. This JSP is also used by other controllers
 *
 */
@Controller
public class InternetExplorerNotSupportedPage_Controller {

	private static final Logger log = LoggerFactory.getLogger( InternetExplorerNotSupportedPage_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = AA_ErrorPageControllerPaths_Constants.INTERNET_EXPLORER_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER;
	
	/**
	 * Controller Path: 
	 */
	private static final String CONTROLLER_PATH_MAIN = 
			AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH;

	/**
	 * Path for when there is no additional page state data (use defaults), 
	 *        or additional page state data and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = {
					CONTROLLER_PATH_MAIN
			} )

	public String controllerEntryMain(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {

		//				log.warn( "controllerEntryMain(...) called. " );

		return controllerEntryInternal( httpServletRequest, httpServletResponse );

	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	private String controllerEntryInternal( 
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		!!!   Important: 
//			Required to skip the Javascript in head_section_include_every_page.jsp that would do another Redirect to this URL,
//			resulting in an infinite redirect.
//			Also setting to true in JSP as backup
		
		httpServletRequest.setAttribute( "InternetExplorer_NotSupported_Error", true );

        return "InternetExplorer_NotSupported_Error.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}
