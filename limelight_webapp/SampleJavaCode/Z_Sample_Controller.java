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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.page_controllers;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
//@RequestMapping("/")
public class Z_Sample_Controller {


	private static final Logger log = LoggerFactory.getLogger();
	
    /**
	 * 
	 */
	public Z_Sample_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	
	@GetMapping( path = { "/path", "/altPath" } ) //  Example of 2 supported paths
    public String listProjects(
    		@RequestParam(name="name", required=false, defaultValue="World") String name, 
    		@PathVariable String userId, //  Can be a Long or other numeric.  Will return 400 error if value is not parsable
    		Model model,
    		HttpServletRequest httpServletRequest ) {
		
		log.warn( "listProjects(...) called" );
		
//        model.addAttribute("name", name);
		

		String contextPath = httpServletRequest.getContextPath();
		String basePath = httpServletRequest.getScheme()+"://"+httpServletRequest.getServerName()+":"+httpServletRequest.getServerPort()+contextPath+"/";
		
		httpServletRequest.setAttribute( "contextPath", contextPath );
		httpServletRequest.setAttribute( "basePath", basePath );
		
		String httpServletRequestURI = httpServletRequest.getRequestURI();
		StringBuffer httpServletRequestURLSB = httpServletRequest.getRequestURL();
		String httpServletRequestURL = httpServletRequestURLSB.toString();
		
		String queryString = httpServletRequest.getQueryString();
		
		ServletContext servletContext = httpServletRequest.getServletContext();
		
		httpServletRequest.setAttribute( "mm", "uuuuu");
		
        return "pages/listProjects";
        
//        return "sub_templates/greetings.jsp";
        
//        throw new RuntimeException("FORCE IN GreetingController");
        
//        return "greeting_WEB_INF_jsp";
    }

}