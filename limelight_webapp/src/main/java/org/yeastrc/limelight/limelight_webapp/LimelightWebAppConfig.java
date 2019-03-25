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
package org.yeastrc.limelight.limelight_webapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.AllControllers_SpringHandlerInterceptor;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.All_Page_Controllers_SpringHandlerInterceptor;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.Temp_AllControllersAccessControl_SpringHandlerInterceptor;

/**
 * Configure paths for Controller Interceptor class AllControllersAccessControl_SpringHandlerInterceptor
 *
 */
@Configuration

public class LimelightWebAppConfig implements WebMvcConfigurer {

	@Autowired
	private AllControllers_SpringHandlerInterceptor allControllers_SpringHandlerInterceptor;
	
	@Autowired
	private All_Page_Controllers_SpringHandlerInterceptor all_Page_Controllers_SpringHandlerInterceptor;
	
	@Autowired
	private DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor dataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor;
	
//	@Autowired
//	private AllControllersAccessControl_SpringHandlerInterceptor allControllersAccessControl_SpringHandlerInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		{
			registry.addInterceptor( allControllers_SpringHandlerInterceptor )
			.addPathPatterns("/**")
			.excludePathPatterns( AllControllers_SpringHandlerInterceptor.excludeInterceptorPaths );
		}
		{
			registry.addInterceptor( all_Page_Controllers_SpringHandlerInterceptor )
			.addPathPatterns("/**")
			.excludePathPatterns( All_Page_Controllers_SpringHandlerInterceptor.excludeInterceptorPaths );
		}

		{
			final String dataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor_Path =
					DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor.PATHS_FOR_INTERCEPTOR;

			registry.addInterceptor( dataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor )
			.addPathPatterns( dataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor_Path );
		}
//		registry.addInterceptor( allControllersAccessControl_SpringHandlerInterceptor )
//		.addPathPatterns("/**")
//		.excludePathPatterns( AllControllersAccessControl_SpringHandlerInterceptor.excludeInterceptorPaths );
	}
	
}
