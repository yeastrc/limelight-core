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

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.yeastrc.limelight.limelight_webapp.database_version_info_retrieval_compare__webapp.Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode_IF;
import org.yeastrc.limelight.limelight_webapp.database_version_info_retrieval_compare__webapp.Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.rest_controllers.AA_UserAccount_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_app_version_and_git_info_from_build.Webapp_VersionAndGitInfo_FromBuild_IF;

/**
 * This is called before all Page Controllers, including user pages, by excluding static and rest webservices
 * 
 * 
 *
 */
@Component
public class All_Page_Controllers_SpringHandlerInterceptor implements HandlerInterceptor {
	
	private static final Logger log = LoggerFactory.getLogger( All_Page_Controllers_SpringHandlerInterceptor.class );

	private final static String staticAssetsPath = "/static/**"; // Javascript, css, ...
	
	@Autowired
	private Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode_IF webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode;
	
	@Autowired
	private Webapp_VersionAndGitInfo_FromBuild_IF webapp_VersionAndGitInfo_FromBuild;
	
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
    	
    	{
//    		String releaseString_FromFile = webapp_VersionAndGitInfo_FromBuild.get_Webapp_VersionAndGitInfo_FromBuild_Results().getLimelightRelease_Tag_EnvironmentVariableValue_OrDefault();
    	
    		httpServletRequest.setAttribute( "Webapp_VersionAndGitInfo_FromBuild", webapp_VersionAndGitInfo_FromBuild.get_Webapp_VersionAndGitInfo_FromBuild_Results() );
    	}
    	
    	String requestURI = httpServletRequest.getRequestURI();
    	

		//  Only test if not forwarding to the error page used, since testing then would result in infinite loop.
    	
    	if ( ! requestURI.contains( AA_ErrorPageControllerPaths_Constants.WEBAPP_AND_DATABASE_SCHEMA_VERSION_NUMBER__NOT_MATCH__ERROR_PAGE_CONTROLLER ) ) {
    		

    		LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabaseSchemaVersion_Comparison_Result =
    				webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result();

    		if ( limelightDatabaseSchemaVersion_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

    			//  Database and Code have different Database Schema Version Number so display error page

    			if ( limelightDatabaseSchemaVersion_Comparison_Result == LimelightDatabaseSchemaVersion_Comparison_Result.CODE_GREATER_THAN_DATABASE ) {

    				//  Code > Database.   JSP uses this with 'when' and 'otherwise' to control error message displayed 
    				httpServletRequest.setAttribute( "databaseBehindWebapp", true ); // Control message on error page
    			}

    			final String mainErrorPageControllerURL =
    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
    					+ AA_ErrorPageControllerPaths_Constants.WEBAPP_AND_DATABASE_SCHEMA_VERSION_NUMBER__NOT_MATCH__ERROR_PAGE_CONTROLLER;

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Webapp And Database Schema Version Number  NOT MATCH. "
    					+ "Forwarding to '"
    					+ mainErrorPageControllerURL );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

    			return false; //  EARLY EXIT

    		} else {

        		LimelightDatabaseSchemaVersion_Comparison_Result limelightDatabaseSchemaVersion_UpdateInProgress_Comparison_Result =
        				webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result();

        		if ( limelightDatabaseSchemaVersion_UpdateInProgress_Comparison_Result != LimelightDatabaseSchemaVersion_Comparison_Result.SAME ) {

        			//  Database and Code have different Database Schema Version Number for Update In Progress record so display error page
        			

    				//  Code > Database.   JSP uses this with 'when' and 'otherwise' to control error message displayed 
    				httpServletRequest.setAttribute( "databaseUpdateInProgress", true ); // Control message on error page


        			final String mainErrorPageControllerURL =
        					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
        					+ AA_ErrorPageControllerPaths_Constants.WEBAPP_AND_DATABASE_SCHEMA_VERSION_NUMBER__NOT_MATCH__ERROR_PAGE_CONTROLLER;

        			RequestDispatcher requestDispatcher = 
        					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

        			log.warn( "Webapp And Database Schema Version Number  NOT MATCH. "
        					+ "Forwarding to '"
        					+ mainErrorPageControllerURL );

        			requestDispatcher.forward( httpServletRequest, httpServletResponse );

        			return false; //  EARLY EXIT
        		}
    		}

    	}
    	
    	
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
    	
//    	if ( browserIs_MicrosoftEdgeLegacy_Detection_Service.browserIs_MicrosoftEdgeLegacy_Detection_Service( httpServletRequest ) ) {
    		
    		//  If uncomment redirect, update BrowserIs_MicrosoftEdgeLegacy_Detection_Service
    		
//    		String redirectPath = httpServletRequest.getContextPath() 
//    				+ AA_ErrorPageControllerPaths_Constants.PATH_START_ALL
//    				+ AA_ErrorPageControllerPaths_Constants.MICROSOFT_LEGACY_EDGE_NOT_SUPPORTED_ERROR_PAGE_CONTROLLER;
//    		
//    		httpServletResponse.sendRedirect( redirectPath );
//    		
//    		return false; // request handled here
//    	}
    	
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
