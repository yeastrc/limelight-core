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
 * Display error page when Webapp And Database Schema Version Number  NOT MATCH 
 *
 */
@Controller
public class Webapp_And_Database_Schema_Version_Number__NOT_MATCH_ErrorPage_Controller {

	private static final Logger log = LoggerFactory.getLogger( Webapp_And_Database_Schema_Version_Number__NOT_MATCH_ErrorPage_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = AA_ErrorPageControllerPaths_Constants.WEBAPP_AND_DATABASE_SCHEMA_VERSION_NUMBER__NOT_MATCH__ERROR_PAGE_CONTROLLER;
	
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

		// 

		final int statusCode500 = 500; // Bad Request

		httpServletResponse.setStatus( statusCode500 ); 

		//  httpServletRequest.setAttribute(...) Set in class All_Page_Controllers_SpringHandlerInterceptor

		log.warn( "Webapp And Database Schema Version Number  NOT MATCH. Setting Response Status code to " + statusCode500 );

        return "error_Webapp_And_Database_Schema_Version_Id_NOT_MATCH.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}
