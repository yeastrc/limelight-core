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
package org.yeastrc.limelight.limelight_webapp.servlet_context_listener;

import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_Remove_Old_CurrentSubdirs;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread;
import org.yeastrc.limelight.limelight_webapp.web_utils.GetJsCssCacheBustString;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_Code;
import org.slf4j.Logger;



/**
 * 
 *
 */

@WebListener

public class WebappServletContextListener implements ServletContextListener {
	
	private static final Logger log = LoggerFactory.getLogger( WebappServletContextListener.class );

	public WebappServletContextListener() {
		super();
		log.info("In WebappServletContextListener() constructor");
	}

	
	//  Removing AppContextConfigSystemValuesRetrieval appContextConfigSystemValuesRetrieval since not set via @Autowired
	
//	private AppContextConfigSystemValuesRetrieval appContextConfigSystemValuesRetrieval;
//	
//	//  Never Called:  setAppContextConfigSystemValuesRetrieval(...)  
//	
//	@Autowired
//	public void setAppContextConfigSystemValuesRetrieval(
//			AppContextConfigSystemValuesRetrieval appContextConfigSystemValuesRetrieval) {
//		
//		log.warn( "INFO:  !!!!!!!!!!!!!!!  WebappServletContextListener: setAppContextConfigSystemValuesRetrieval(...) called: appContextConfigSystemValuesRetrieval: "
//				+ appContextConfigSystemValuesRetrieval );
//		
//		this.appContextConfigSystemValuesRetrieval = appContextConfigSystemValuesRetrieval;
//	}
	
	
	@Override
	public void contextInitialized( ServletContextEvent servletContextEvent ) {
		
		//  Runs after Spring finishes initializing
		
		log.warn( "INFO:  !!!!!!!!!!!!!!!   Start up of web app  'Limelight' beginning  !!!!!!!!!!!!!!!!!!!! " );
		
//		log.warn( "INFO:  !!!!!!!!!!!!!!!  WebappServletContextListener: appContextConfigSystemValuesRetrieval: " + appContextConfigSystemValuesRetrieval );
		
		boolean isDevEnv = false;
		Properties prop = System.getProperties();
		String devEnv = prop.getProperty("devEnv");
		if ( "Y".equals(devEnv ) ) {
			isDevEnv = true;
		}
		
		ServletContext context = servletContextEvent.getServletContext();
		String contextPath = context.getContextPath();
		context.setAttribute( WebConstants.APP_CONTEXT_CONTEXT_PATH, contextPath );
		
//		CurrentContext.setCurrentWebAppContext( contextPath );
		
		String jsCssCacheBustString = GetJsCssCacheBustString.getInstance().getJsCssCacheBustString();
		if ( isDevEnv ) {
			jsCssCacheBustString = "devEnv";
		}
		context.setAttribute( WebConstants.APP_CONTEXT_JS_CSS_CACHE_BUST, jsCssCacheBustString );
		
		String webserviceSyncTracking_Code_OnServer = jsCssCacheBustString; // Currently re-use jsCssCacheBustString;
		
		context.setAttribute( WebConstants.APP_CONTEXT_WEBSERVICE_SYNC_TRACKING, webserviceSyncTracking_Code_OnServer );
		
		Validate_WebserviceSyncTracking_Code.setWebserviceSyncTracking_Code_OnServer( webserviceSyncTracking_Code_OnServer );
		
		
//		context.setAttribute( WebConstants.CONFIG_SYSTEM_VALUES_HTML_KEY, appContextConfigSystemValuesRetrieval );
		

//		AsyncActionViaExecutorService.initInstance();
//		
//		try {
//			CachedDataInFileMgmtRegistration.getSingletonInstance().init();
//		} catch (Exception e) {
//			//  already logged
//			throw new RuntimeException( e );
//		} 
		
		log.warn( "INFO:  !!!!!!!!!!!!!!!   Start up of web app  'Limelight' complete  !!!!!!!!!!!!!!!!!!!! " );
		log.warn( "INFO: Application context values set.  Key = " + WebConstants.APP_CONTEXT_CONTEXT_PATH + ": value = " + contextPath
				+ "" );
	}
	@Override
	public void contextDestroyed(ServletContextEvent sce) {

		log.warn("INFO:  !!!!!!!!  Web app Undeploying   !!!!!!!!");
		
		try {
			CachedDataInFileMgmt_Remove_Old_CurrentSubdirs.setShutdownRequested(true);
		} catch ( Throwable t ) {
			//  Eat Exception
		}
		try {
			SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread.webappShutdownRequested();
		} catch ( Throwable t ) {
			//  Eat Exception
		}
	}

}
