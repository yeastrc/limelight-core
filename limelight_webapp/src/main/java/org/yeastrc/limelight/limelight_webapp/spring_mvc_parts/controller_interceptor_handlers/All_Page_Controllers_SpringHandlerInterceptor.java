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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.yeastrc.limelight.limelight_webapp.services.BrowserIs_InternetExplorer_Detection_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.BrowserIs_MicrosoftEdgeLegacy_Detection_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.rest_controllers.AA_UserAccount_RestWSControllerPaths_Constants;

/**
 * This is called before all Page Controllers, including user pages, by excluding static and rest webservices
 * 
 * 
 *
 */
@Component
public class All_Page_Controllers_SpringHandlerInterceptor implements HandlerInterceptor {

	private final static String staticAssetsPath = "/static/**"; // Javascript, css, ...
	
//	@Autowired
//	private BrowserIs_InternetExplorer_Detection_ServiceIF browserIs_InternetExplorer_Detection_Service;
	
	@Autowired
	private BrowserIs_MicrosoftEdgeLegacy_Detection_ServiceIF browserIs_MicrosoftEdgeLegacy_Detection_Service;

	/**
	 * Used in class LimelightWebAppConfig
	 */
	public final static String[] excludeInterceptorPaths = { 
			staticAssetsPath, 
			
			AA_RestWSControllerPaths_Constants.PATH_START_ALL
			+ AA_RestWSControllerPaths_Constants.DATA_PAGE_REST_WEBSERVICE_CONTROLLER_START,
			
			AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
			+ AA_UserAccount_RestWSControllerPaths_Constants.USER_REST_WEBSERVICE_CONTROLLER_START,
			
			AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
			+ AA_ErrorPageControllerPaths_Constants.INTERNET_EXPLORER_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER
	};
	
    // This method is called before the controller
    @Override
    public boolean preHandle( HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler ) throws Exception {
    	
    	//  !!!  This Redirect have been commented out and detection will only be used in the JS 

//    	if ( browserIs_InternetExplorer_Detection_Service.browserIs_InternetExplorer_Detection_Service( httpServletRequest ) ) {
    		
    		//  If uncomment redirect, update BrowserIs_InternetExplorer_Detection_Service log message
//    		
//    		String redirectPath = httpServletRequest.getContextPath() 
//    				+ AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
//    				+ AA_ErrorPageControllerPaths_Constants.INTERNET_EXPLORER_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER;
//    		
//    		httpServletResponse.sendRedirect( redirectPath );
//    		
//    		return false; // request handled here
//    	}
    	
    	if ( browserIs_MicrosoftEdgeLegacy_Detection_Service.browserIs_MicrosoftEdgeLegacy_Detection_Service( httpServletRequest ) ) {
    		
    		//  If uncomment redirect, update BrowserIs_MicrosoftEdgeLegacy_Detection_Service
    		
//    		String redirectPath = httpServletRequest.getContextPath() 
//    				+ AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
//    				+ AA_ErrorPageControllerPaths_Constants.MICROSOFT_LEGACY_EDGE_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER;
//    		
//    		httpServletResponse.sendRedirect( redirectPath );
//    		
//    		return false; // request handled here
    	}
    	
    	return true;
    }

    @Override
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

    }
}
