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

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.webmvc.error.DefaultErrorAttributes;
import org.springframework.boot.webmvc.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.AllControllers_SpringHandlerInterceptor;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.All_Page_Controllers_SpringHandlerInterceptor;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.controller_interceptor_handlers.DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.resource.EncodedResourceResolver;

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
	

	  @Override
	  public void addResourceHandlers(ResourceHandlerRegistry registry) {
	      registry.addResourceHandler("/static/**")
	              .addResourceLocations("/static/")   // servlet-context-relative = WAR doc root
	              // resourceChain(false): no resolution caching, so bundles regenerated while the
	              // app is running are always re-resolved/re-read fresh. Still auto-appends the
	              // terminating PathResourceResolver. (false because there is no separate prod/dev
	              // runtime build; the WAR is rebuilt and bundles may change under a running server.)
	              .resourceChain(false)
	              .addResolver(new EncodedResourceResolver());
	  }

	//  =====================================================================================
	//  Error-handling / view config moved from application.properties to typed Java beans so
	//  a Spring Boot property rename/removal fails to COMPILE instead of being silently
	//  ignored.  Boot 4 renamed server.error.* -> spring.web.error.* with NO deprecated alias,
	//  and the old string properties were silently dropped (broke the front-end error-message
	//  contract).  See limelight_webapp/CLAUDE.md (Gotchas: error-response message).
	//  =====================================================================================

	/**
	 * Replaces the property  spring.web.error.include-message=always
	 *
	 * Forces the thrown exception's reason text into the "message" field of the JSON error
	 * response.  The TypeScript front end (handleServicesAJAXErrors.ts) matches that text
	 * (e.g. "forbidden" / "no_session") to drive a page reload.  BasicErrorController uses
	 * @ConditionalOnMissingBean(ErrorAttributes.class), so this bean replaces Boot's default.
	 *
	 * Compile-safe: if Spring Boot renames/removes Include.MESSAGE, ErrorAttributeOptions,
	 * DefaultErrorAttributes, or moves their packages, this stops compiling.
	 */
	@Bean
	ErrorAttributes errorAttributes() {
		return new DefaultErrorAttributes() {
			@Override
			public Map<String, Object> getErrorAttributes( WebRequest webRequest, ErrorAttributeOptions options ) {
				return super.getErrorAttributes( webRequest, options.including( Include.MESSAGE ) );
			}
		};
	}

	/**
	 * Replaces the property  spring.mvc.view.prefix=/WEB-INF/jsp/
	 *
	 * Spring Boot's WebMvcAutoConfiguration registers its InternalResourceViewResolver as
	 * @ConditionalOnMissingBean, so providing our own makes Boot back off.  Compile-safe.
	 */
	@Bean
	InternalResourceViewResolver internalResourceViewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix( "/WEB-INF/jsp/" );   //  view name from controller -> /WEB-INF/jsp/<name>
		//  No suffix set (matches the previously commented-out spring.mvc.view.suffix).
		return resolver;
	}

	/**
	 * Guards the property  spring.web.error.whitelabel.enabled=false
	 *
	 * Whitelabel is a conditional bean registration gated by the property (there is no clean
	 * typed "off" bean), so the property is kept in application.properties.  This fails the
	 * app to start -- loudly, not silently -- if that property ever stops binding on a future
	 * Spring Boot upgrade.  Compile-safe via the typed WebProperties getters.
	 */
	@Bean
	ApplicationRunner assert_ErrorWhitelabel_Disabled( WebProperties webProperties ) {
		return args -> {
			if ( webProperties.getError().getWhitelabel().isEnabled() ) {
				throw new IllegalStateException(
						"Spring Boot whitelabel error view is ENABLED -- property"
						+ " 'spring.web.error.whitelabel.enabled=false' is no longer binding"
						+ " (Spring Boot property rename on upgrade?).  See limelight_webapp/CLAUDE.md." );
			}
		};
	}

}
