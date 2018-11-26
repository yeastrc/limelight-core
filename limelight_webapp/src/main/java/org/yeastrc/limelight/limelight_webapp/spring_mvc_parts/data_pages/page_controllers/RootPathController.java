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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RootPathController {

	private static final Logger log = LoggerFactory.getLogger( RootPathController.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.ROOT_CONTROLLER;

    /**
	 * 
	 */
	public RootPathController() {
		super();
//		log.warn( "constructor no params called" );
	}

	@GetMapping( PRIMARY_CONTROLLER_PATH )
    public ModelAndView rootPath( 
    		ModelMap model,
    		HttpServletRequest httpServletRequest ) {
		
		log.debug( "rootPath(...) called" );
		
//        model.addAttribute("name", name);
		
//		HttpSession httpSession = httpServletRequest.getSession( false ); // Return null if no session
		
		//  Currently forward to List Projects Controller
		
		return new ModelAndView( "forward:" + AA_PageControllerPaths_Constants.PROJECTS_LIST_PAGE_CONTROLLER, model );
    }

}