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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdForProjectShortNameSearcherIF;

@Controller
//@RequestMapping("/")
public class ProjectShortName_RedirectTo_ProjectView_Controller {

	private static final Logger log = LoggerFactory.getLogger( ProjectShortName_RedirectTo_ProjectView_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PROJECT_SHORT_NAME_REDIRECT_PAGE_CONTROLLER;

	private static final String PATH_PARAMETER_LABEL_PROJECT_SHORT_NAME = "projectShortName";

	@Autowired
	private ProjectIdForProjectShortNameSearcherIF projectIdForProjectShortNameSearcher;
	
	
    /**
	 * 
	 */
	public ProjectShortName_RedirectTo_ProjectView_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}


	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = { 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
			+ "/"
			+ "{" + PATH_PARAMETER_LABEL_PROJECT_SHORT_NAME + "}" } )
	
    public ModelAndView controllerMethod(
    		@PathVariable(value = PATH_PARAMETER_LABEL_PROJECT_SHORT_NAME) String projectShortName,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse ) {
		
		log.info( "controllerMethod(...) called. projectShortName: " + projectShortName );
		
		try {
			Integer projectId =
					projectIdForProjectShortNameSearcher.getProjectIdForProjectShortName( projectShortName );
			
			if ( projectId != null ) {
				String redirectPath = 
						"redirect:" 
								+ AA_PageControllerPaths_Constants.PATH_START_ALL
								+ AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER
								+ "/"
								+ projectId;
			
				return new ModelAndView( redirectPath );
			}
			
			httpServletResponse.setStatus( 404 );
			
			return new ModelAndView( "data_pages/error_pages/project_ShortName_NotFound_Page.jsp" );

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
    }
	
}