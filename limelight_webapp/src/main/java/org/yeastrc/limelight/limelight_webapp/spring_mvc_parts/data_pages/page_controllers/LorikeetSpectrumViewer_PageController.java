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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Page controller for page that Lorikeet will be displayed in
 *
 */
@Controller
public class LorikeetSpectrumViewer_PageController {

	private static final Logger log = LoggerFactory.getLogger( LorikeetSpectrumViewer_PageController.class );
	

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER;

	@GetMapping( path = { PRIMARY_CONTROLLER_PATH } )

    public String controllerEntryWithOtherPageState(
    		
    		
    		HttpServletRequest httpServletRequest ) {
		
		

        return "data_pages/lorikeetSpectrumViewerView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}
