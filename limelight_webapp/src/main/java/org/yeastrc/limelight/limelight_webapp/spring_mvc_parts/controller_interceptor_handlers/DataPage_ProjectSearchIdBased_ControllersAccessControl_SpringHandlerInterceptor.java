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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetRecordForCodeIF;
import org.yeastrc.limelight.limelight_webapp.services.Get_ProjectIds_For_ProjectSearchIds_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * For PAGE Controllers Auth and other processing.
 * 
 * This is called before PAGE Controllers that are Project Search Id based 
 * 
 * 
 * Parse URL. Validate data. Validate user access. Pass data along.
 * 
 * 
 * Parse 'Search Data Lookup Parameters Code' from URL.
 * 
 * Look up 'Search Data Lookup Parameters Code' in DB to get Project Search Ids and their filters and annotation type ids to display.
 * 
 * Get Project id for Project Search Ids.
 * 
 * Validate Project Search Ids are for same Project Id.
 * 
 * Validate user has access to project.
 * 
 * Store Project Search Ids in request attribute
 * 
 * Store User's access level in request attribute
 * 
 * 
 */
@Component
public class DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor implements HandlerInterceptor {

	private static final Logger log = LoggerFactory.getLogger( DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor.class );

	public final static String PATHS_FOR_INTERCEPTOR = 
			AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
			+ AA_PageControllerPaths_Constants.PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START
			+ "**";
	

	/**
	 * 
	 */
	public DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor() {
		super();
	}

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private SearchDataLookupParams_GetRecordForCodeIF searchDataLookupParams_GetRecordForCode;

	@Autowired
	private Get_ProjectIds_For_ProjectSearchIds_ServiceIF get_ProjectIds_For_ProjectSearchIds_Service;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;
	
    // This method is called before the controller
    @Override
    public boolean preHandle( HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object handler ) {

    	String requestURI = null;
    	
    	try {

    		//  Parse Project Search Ids from URL and validate user has access.

    		//    Store Project Search Ids in request attribute

    		requestURI = httpServletRequest.getRequestURI(); // /limelight/...
    		
    		String contextPathString = httpServletRequest.getContextPath(); // /limelight

    		int pageLabelStartIndex =
    				contextPathString.length()
    				+ AA_PageControllerPaths_Constants.PATH_START_ALL.length()
    				+ AA_PageControllerPaths_Constants.PROJECT_SEARCH_ID_BASED_PAGE_CONTROLLER_START.length();

    		String requestURI_StartAtPageLabel = requestURI.substring( pageLabelStartIndex );

    		String[] requestURI_StartAtPageLabelSplit = requestURI_StartAtPageLabel.split( "/" );


    		if ( requestURI_StartAtPageLabelSplit.length < 2
    				|| StringUtils.isEmpty( requestURI_StartAtPageLabelSplit[ 1 ] ) ) {

    			// 'Search Data Lookup Parameters Code' is 2nd element, is missing

    			final int statusCode400 = 400; // Bad Request

    			httpServletResponse.setStatus( statusCode400 ); 

    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.URL_FORMAT_INVALID, true ); // Control message on error page

    			final String mainErrorPageControllerURL =
    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Error in URL to Project Search Based page, nothing after identifier to page. "
    					+ "setting HTTP status code to: " + statusCode400
    					+ ".  Forwarding to '"
    					+ mainErrorPageControllerURL
    					+ "'. requestURI: " + requestURI );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

    			return false; //  EARLY EXIT

    			//        	// forward to error page
    			//        	String forwardPath = "forward:" + AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER; 
    			//            ModelAndView mav = new ModelAndView( forwardPath );
    			//            throw new ModelAndViewDefiningException(mav);
    			//        	
    			// Above code will send a 401 with no response body.
    			// If you need a 401 view, do a redirect instead of
    			// returning false.
    			// response.sendRedirect("/401"); // assuming you have a handler mapping for 401

    		}

    		// 'Search Data Lookup Parameters Code' is 2nd element, 1st element is page name

    		String searchDataLookupParametersLookupCode = requestURI_StartAtPageLabelSplit[ 1 ];

    		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO =
    				searchDataLookupParams_GetRecordForCode
    				.getSearchDataLookupParametersLookupDTO_RecordForCode( searchDataLookupParametersLookupCode );

    		if ( searchDataLookupParametersLookupDTO == null ) {
    			//  Code not found in DB

    			final int statusCode404 = 404; // Resource not found

    			httpServletResponse.setStatus( statusCode404 ); 
    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

    			final String mainErrorPageControllerURL =
    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Error in URL to Project Search Based page, searchDataLookupParametersLookupCode not found in database. "
    					+ "setting HTTP status code to: " + statusCode404
    					+ ".  Forwarding to '"
    					+ mainErrorPageControllerURL
    					+ "'. requestURI: " + requestURI );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

    			return false; //  EARLY EXIT
    		}

    		String searchDataLookupParametersLookupJSON =
    				searchDataLookupParametersLookupDTO.getLookupParametersJSONMainData();

    		SearchDataLookupParamsRoot searchDataLookupParamsRoot = null;

    		try {
    			searchDataLookupParamsRoot = 
    					unmarshalJSON_ToObject.getObjectFromJSONString(
    							searchDataLookupParametersLookupJSON, 
    							SearchDataLookupParamsRoot.class );
    		} catch ( Exception e ) {
    			String msg = "Failed to unmarshal LookupParametersJSONMainData JSON for searchDataLookupParametersLookupDTO.id: "
    					+ searchDataLookupParametersLookupDTO.getId();
    			log.error( msg );
    			throw new LimelightInternalErrorException(  e );
    		}

    		////////////

    		//   Get Project Search Ids from searchDataLookupParamsRoot

    		SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();

    		if ( searchDataLookupParams_For_ProjectSearchIds == null ) {
    			final String msg = "Fail to handle ( searchDataLookupParams_For_ProjectSearchIds == null ). requestURI: " + requestURI;
    			log.error( msg );
    			throw new LimelightInternalErrorException();
    		}

    		List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();

    		if ( paramsForProjectSearchIdsList == null ) {
    			final String msg = "Fail to handle ( paramsForProjectSearchIdsList == null ). requestURI: " + requestURI;
    			log.error( msg );
    			throw new LimelightInternalErrorException();
    		}

    		List<Integer> projectSearchIds = new ArrayList<>( paramsForProjectSearchIdsList.size() );
    		for ( SearchDataLookupParams_For_Single_ProjectSearchId entry : paramsForProjectSearchIdsList ) {
    			projectSearchIds.add( entry.getProjectSearchId() );
    		}

    		//  TODO !!!!  Use searchDataLookupParamsRoot project search ids to validate user access

    		//  TODO !!!!  Consider query for projectSearchIds one at a time 
    		//             or get list of projectSearchId/projectId pairs 
    		//             and return an error when a projectSearchId is not found in the DB

    		List<Integer> projectIds = get_ProjectIds_For_ProjectSearchIds_Service.get_ProjectIds_For_ProjectSearchIds_Service( projectSearchIds );

    		if ( projectIds.isEmpty() ) {
    			String msg = "No projectIds found. projectsearchIds: " + projectSearchIds;
    			log.warn( msg );
    			throw new LimelightErrorDataInWebRequestException( "Project Search Id not found" );
    		}

    		if ( projectIds.size() > 1 ) {
    			String msg = "Project Search Ids resulted in > 1 Project Id.  projectIds: " + projectIds;
    			log.warn( msg );
    			throw new LimelightErrorDataInWebRequestException( msg );
    		}
    		
    		GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
    				getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isProjectNotEnabledOrIsMarkedForDeletion() ) {
				throw new LimelightErrorDataInWebRequestException("Project Not Enabled Or is Marked for Deletion.  Project Id: " + projectIds );
			}

    		WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
    			//  No User session and not public project so forward to Login page

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( 
    							AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
    							+ AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

    			return false; //  EARLY EXIT
    		}
			
			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {

    			final int statusCode401 = 401; // 

				httpServletResponse.setStatus( statusCode401 ); 
	
				final String controllerURL =
						AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
						+ AA_ErrorPageControllerPaths_Constants.ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE;
	
				RequestDispatcher requestDispatcher = 
						httpServletRequest.getServletContext().getRequestDispatcher( controllerURL );
	
				log.warn( "User not allowed to access project. "
						+ "setting HTTP status code to: " + statusCode401
						+ ".  Forwarding to '"
						+ controllerURL
						+ "'. requestURI: " + requestURI );
	
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
	
				return false; //  EARLY EXIT
	
				//        	// forward to error page
				//        	String forwardPath = "forward:" + AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER; 
				//            ModelAndView mav = new ModelAndView( forwardPath );
				//            throw new ModelAndViewDefiningException(mav);
				//        	
				// Above code will send a 401 with no response body.
				// If you need a 401 view, do a redirect instead of
				// returning false.
				// response.sendRedirect("/401"); // assuming you have a handler mapping for 401
			}

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
    			//  No User session and not public project so forward to Login page

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( 
    							AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
    							+ AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

    			return false; //  EARLY EXIT
    		}

    		UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();

    		populatePageHeaderData.populatePageHeaderData( projectIds, userSession, httpServletRequest );


			httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL, webSessionAuthAccessLevel );

    		httpServletRequest.setAttribute( 
    				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_CODE, searchDataLookupParametersLookupCode );
    		httpServletRequest.setAttribute( 
    				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_RECORD, searchDataLookupParametersLookupDTO );
    		httpServletRequest.setAttribute( 
    				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS, searchDataLookupParamsRoot );
    		httpServletRequest.setAttribute( 
    				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON, searchDataLookupParametersLookupJSON );

    		httpServletRequest.setAttribute( 
    				WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_ROOT_IDS_JSON, searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON() );

    		//		httpServletRequest.setAttribute( 
    		//				WebConstants.REQUEST_PROJECT_ID,  );

    		return true;

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
    		//        return false;

    	} catch ( IllegalArgumentException e ) {

			final int statusCode404 = 404; // Resource not found

			httpServletResponse.setStatus( statusCode404 ); 
			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

			final String mainErrorPageControllerURL =
					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

			log.warn( "Main Catch: IllegalArgumentException text: " + e.toString()
					+ ""
					+ "setting HTTP status code to: " + statusCode404
					+ ".  Forwarding to '"
					+ mainErrorPageControllerURL
					+ "'. requestURI: " + requestURI );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e1) {
				
				log.error( "In Main Exception Catch, Fail to create forward to URL: " + mainErrorPageControllerURL );
				
				throw new LimelightInternalErrorException();
			}
			
			return false;
			
    	} catch ( Exception e ) {

			final int statusCode500 = 500; // Internal Error

			httpServletResponse.setStatus( statusCode500 ); 

			final String mainErrorPageControllerURL =
					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

			log.warn(  "Main Catch: Exception text: " + e.toString()
					+ "setting HTTP status code to: " + statusCode500
					+ ".  Forwarding to '"
					+ mainErrorPageControllerURL
					+ "'. requestURI: " + requestURI, e );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e1) {
				
				log.error( "In Main Exception Catch, Fail to create forward to URL: " + mainErrorPageControllerURL );
				
				throw new LimelightInternalErrorException();
			}
			
			return false;
    	}
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
