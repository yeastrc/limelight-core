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
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.rest_controllers.AA_UserAccount_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;

/**
 * 
 * Currently UNUSED
 * 
 * Initial Temp Interceptor for securing all pages and web services
 * 
 * This is called before all Controllers (Except Login Page, Login Webservice)
 * 
 */
@Deprecated
@Component
public class Temp_AllControllersAccessControl_SpringHandlerInterceptor implements HandlerInterceptor{

//	
//	private final static String staticAssetsPath = "/static/**"; // Javascript, css, ...
//
//	private final static String loginPath = 
//			AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
//			+ AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER;
//	
//	private final static String loginWebservicePath =
//			AA_UserAccount_RestWSControllerPaths_Constants.PATH_START_ALL
//			+ AA_UserAccount_RestWSControllerPaths_Constants.USER_LOGIN_REST_WEBSERVICE_CONTROLLER;
//
//	/**
//	 * Used in class LimelightWebAppConfig
//	 */
//	public final static String[] excludeInterceptorPaths = { staticAssetsPath, loginPath, loginWebservicePath };
//	
//	
//	/**
//	 * 
//	 */
//	public Temp_AllControllersAccessControl_SpringHandlerInterceptor() {
//		super();
//	}
//
//	@Autowired
//	private UserSessionManager userSessionManager;
//	
//    // This method is called before the controller
//    @Override
//    public boolean preHandle( HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler ) throws Exception {
//
//    	UserSession userSession = userSessionManager.getUserSession( httpServletRequest );
//    	
//        if( userSession != null ) { // Have user session so continue
//            return true;
//        }
//        else {
//        	
//        	// forward to login page
//        	String forwardPath = "forward:" + AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER; 
//            ModelAndView mav = new ModelAndView( forwardPath );
//            throw new ModelAndViewDefiningException(mav);
//        	
////            httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
////            return false;
//            
//            // Above code will send a 401 with no response body.
//            // If you need a 401 view, do a redirect instead of
//            // returning false.
//            // response.sendRedirect("/401"); // assuming you have a handler mapping for 401
//
//        }
////        return false;
//    }
//
//    @Override
//    public void postHandle(HttpServletRequest request,
//            HttpServletResponse response, Object handler,
//            ModelAndView modelAndView) throws Exception {
//
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request,
//            HttpServletResponse response, Object handler, Exception ex)
//            throws Exception {
//
//    }

}
