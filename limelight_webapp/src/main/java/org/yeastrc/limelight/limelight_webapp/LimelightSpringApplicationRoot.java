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


//import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * "Root" class of Limelight web app from Spring Boot perspective
 * 
 * This class is at this level so that all Spring managed classes will be found since they are under the package path of this class
 *
 */
@SpringBootApplication
@EnableTransactionManagement
@ServletComponentScan

//  Using server.error.whitelabel.enabled=false in application.properties to accomplish same thing:
//
//  Turn off all error handing in Spring and send errors to Servlet container.
//  	Errors are then handled per HTTP status code in web.xml and the specified web page is displayed
//@EnableAutoConfiguration(exclude = {ErrorMvcAutoConfiguration.class})

//@EnableTransactionManagement(proxyTargetClass=true)
// @ComponentScan(basePackages = "my.servlet.package") where to scan for classes with Spring annotations

@PropertySource(value = { "classpath:/application.properties","classpath:/limelight_db_config.properties" }) // Properties files to configure Spring Boot to load on startup

public class LimelightSpringApplicationRoot extends SpringBootServletInitializer {

//	private static final Logger log = LoggerFactory.getLogger();
	
	/**
	 * 
	 */
	public LimelightSpringApplicationRoot() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//		log.warn( "configure(...) called" );
		return application.sources(LimelightSpringApplicationRoot.class);
	}

	public static void main(String[] args) throws Exception {
//		log.warn( "main(...) called" );
		SpringApplication.run(LimelightSpringApplicationRoot.class, args);
	}

	
	//  Does not result in @Autowired property on WebappServletContextListener to be set
	
	//  Does cause WebappServletContextListener to be init twice, which is wrong

//	  // Register ServletContextListener
//	  @Bean
//	  public ServletListenerRegistrationBean<ServletContextListener> listenerRegistrationBean() {
//	    ServletListenerRegistrationBean<ServletContextListener> bean = 
//	        new ServletListenerRegistrationBean<>();
//	    bean.setListener(new WebappServletContextListener());
//	    int z = 0;
//	    return bean;
//
//	  }
	
}
