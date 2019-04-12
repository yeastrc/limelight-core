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

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.yeastrc.limelight.limelight_webapp.config_system_table.AppContextConfigSystemValuesRetrieval;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;

/**
 * This is called before all Controllers.
 * 
 * This ensures AppContextConfigSystemValuesRetrieval is in the application context
 *
 */
@Component
public class AllControllers_SpringHandlerInterceptor implements HandlerInterceptor {

	private final static String staticAssetsPath = "/static/**"; // Javascript, css, ...

	/**
	 * Used in class LimelightWebAppConfig
	 */
	public final static String[] excludeInterceptorPaths = { staticAssetsPath };
	
	@Autowired
	private AppContextConfigSystemValuesRetrieval appContextConfigSystemValuesRetrieval;
	

    // This method is called before the controller
    @Override
    public boolean preHandle( HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler ) throws Exception {

    	ServletContext servletContext = httpServletRequest.getServletContext();
    	
    	Object servletContextObject = servletContext.getAttribute( WebConstants.CONFIG_SYSTEM_VALUES_HTML_KEY );
    	
    	if ( servletContextObject == null ) {
    		servletContext.setAttribute( WebConstants.CONFIG_SYSTEM_VALUES_HTML_KEY, appContextConfigSystemValuesRetrieval );
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
