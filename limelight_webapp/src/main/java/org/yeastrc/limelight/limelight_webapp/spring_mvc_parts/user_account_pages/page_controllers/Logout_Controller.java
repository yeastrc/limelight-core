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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;

@Controller
//@RequestMapping("/")
public class Logout_Controller {


	private static final Logger log = LoggerFactory.getLogger( Logout_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.LOGOUT_PAGE_CONTROLLER;
			
    /**
	 * 
	 */
	public Logout_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = { 
					AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
					+ PRIMARY_CONTROLLER_PATH
			} )
	
    public RedirectView controllerMethod(
    		RedirectAttributes attributes,
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerMethod(...) called" );
		
		log.info( "controllerMethod(...) called" );
		
		HttpSession httpSession = httpServletRequest.getSession( false );
		
		if ( httpSession != null ) {
			httpSession.invalidate();
		}
		
		return new RedirectView(
				AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL 
				+ AA_PageControllerPaths_Constants.ROOT_CONTROLLER, 
				true // True: Relative to Servlet Context
				);
    }

}