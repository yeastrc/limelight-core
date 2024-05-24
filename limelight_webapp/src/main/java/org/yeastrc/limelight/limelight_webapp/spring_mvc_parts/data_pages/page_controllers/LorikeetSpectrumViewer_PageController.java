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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.PsmDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdsForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;

/**
 * Page controller for page that Lorikeet will be displayed in
 *
 */
@Controller
public class LorikeetSpectrumViewer_PageController {

	private static final Logger log = LoggerFactory.getLogger( LorikeetSpectrumViewer_PageController.class );
	
	public static final String PATH_PART_PROJECT_SEARCH_ID_LABEL = "ps";
	
	public static final String PATH_PART_PSM_ID_LABEL = "psm";

	//  For No PSM found page
	private static final String REQUEST_PSM_ID_FROM_LORIKEET_SPECTRUM_VIEWER_CONTROLLER = "psmId_From_LorikeetSpectrumViewer_PageController";
	
	//  For No ... found page
	private static final String REQUEST_ADMIN_EMAIL_ADDRESS = "adminEmailAddress";
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private ProjectIdsForProjectSearchIdsSearcherIF projectIdsForProjectSearchIdsSearcher;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private PsmDAO_IF psmDAO;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;

	/**
	 * 
	 */
	public LorikeetSpectrumViewer_PageController() {
		log.warn( "INFO: PRIMARY_CONTROLLER_PATH_PSM_ID_SELECTED_IONS: " + PRIMARY_CONTROLLER_PATH_PSM_ID_SELECTED_IONS );
	}

	/**
	 *   
	 */
	private static final String PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID = "projectSearchId";

	/**
	 * Spring MVC format for path parameter
	 */
	private static final String PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID + "}";

	/**
	 *   
	 */
	private static final String PATH_PARAMETER_LABEL_PSM_ID = "psmId";

	/**
	 * Spring MVC format for path parameter
	 */
	private static final String PATH_PARAMETER_LABEL_PSM_ID_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_PSM_ID + "}";


	/**
	 *   
	 */
	private static final String PATH_PARAMETER_LABEL_SELECTED_IONS_MZ = "sionsmz"; //  UNUSED:  Using Query String instead

	/**
	 * Spring MVC format for path parameter
	 */
	private static final String PATH_PARAMETER_LABEL_SELECTED_IONS_MZ_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_SELECTED_IONS_MZ + "}";


	private static final String PRIMARY_CONTROLLER_PATH_BASE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PART_PROJECT_SEARCH_ID_LABEL
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PART_PSM_ID_LABEL
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PARAMETER_LABEL_PSM_ID_PATH_ADDITION;

	private static final String PRIMARY_CONTROLLER_PATH_PSM_ID_ONLY = PRIMARY_CONTROLLER_PATH_BASE;

	private static final String PRIMARY_CONTROLLER_PATH_PSM_ID_SELECTED_IONS = 
			PRIMARY_CONTROLLER_PATH_BASE
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PARAMETER_LABEL_SELECTED_IONS_MZ_PATH_ADDITION;


	
	@GetMapping( path = { PRIMARY_CONTROLLER_PATH_PSM_ID_ONLY } )

	public String controllerEntry_PsmId_Only(

			@PathVariable(value = PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID) 
			String projectSearchIdString,

			@PathVariable(value = PATH_PARAMETER_LABEL_PSM_ID) 
			String psmIdString,

			HttpServletRequest httpServletRequest ) {

		return controllerEntry_PsmId_SelectedIons(projectSearchIdString, psmIdString, null /* selectedIonsString */, httpServletRequest);
		
	}
	
	@GetMapping( path = { PRIMARY_CONTROLLER_PATH_PSM_ID_SELECTED_IONS } )

	public String controllerEntry_PsmId_SelectedIons(

			@PathVariable(value = PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID) 
			String projectSearchIdString,

			@PathVariable(value = PATH_PARAMETER_LABEL_PSM_ID) 
			String psmIdString,

			@PathVariable(value = PATH_PARAMETER_LABEL_SELECTED_IONS_MZ) 
			String selectedIonsString,

			HttpServletRequest httpServletRequest ) {

		if ( psmIdString == null ) {
			
			log.warn("psmIdString is null: " + psmIdString );
			
			this.getDataForNotFoundPage( httpServletRequest );

			//  EARLY EXIT
			
			return "data_pages/error_pages/spectrumViewer_PSM_NotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
		}
		
		psmIdString = psmIdString.trim();
		
		if ( psmIdString.endsWith( "." ) ) {
			//  remove trailing '.'
			psmIdString = psmIdString.substring(0, psmIdString.length() - 1 );
		}

		psmIdString = psmIdString.trim();

		httpServletRequest.setAttribute( REQUEST_PSM_ID_FROM_LORIKEET_SPECTRUM_VIEWER_CONTROLLER, psmIdString );
		
		int projectSearchId = -1;
		long psmId = -1;
		
		try {
			projectSearchId = Integer.parseInt( projectSearchIdString );
		} catch ( Exception e ) {
			log.warn("projectSearchIdString not integer: " + projectSearchIdString );

			this.getDataForNotFoundPage( httpServletRequest );

			//  EARLY EXIT
		
			return "data_pages/error_pages/spectrumViewer_ProjectSearchId_NotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
		}
		
		try {
			psmId = Long.parseLong( psmIdString );
		} catch ( Exception e ) {
			
			log.warn("psmIdString not integer: " + psmIdString );
			
			this.getDataForNotFoundPage( httpServletRequest );

			//  EARLY EXIT
			
			return "data_pages/error_pages/spectrumViewer_PSM_NotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
		}


		try {
			List<Integer> projectSearchIds = new ArrayList<>( 1 );
			projectSearchIds.add( projectSearchId );
			List<Integer> projectIds = null;
			

    		{
	    		Map<Integer,Integer> projectIdMap_Key_ProjectSearchId = projectIdsForProjectSearchIdsSearcher.getProjectIdMappingForProjectSearchIds( projectSearchIds );
	
	    		if ( projectIdMap_Key_ProjectSearchId.isEmpty() ) {

	    			final int statusCode404 = 404; // Resource not found

	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.RESPONSE_STATUS_CODE, statusCode404 ); 
	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_SEARCH_NOT_FOUND, true ); // Control message on error page

	    			log.warn( "Error in URL to Project Search Based page, No projectSearchIds found in database. projectSearchId: " + StringUtils.join( projectSearchIds )
	    					+ ".  setting HTTP status code to: " + statusCode404
	    					+ ".  Forwarding to spectrumViewer_ProjectSearchId_NotFound.jsp" );

	    			this.getDataForNotFoundPage( httpServletRequest );
	    			
	    			 //  EARLY EXIT
	    			
	    			return "data_pages/error_pages/spectrumViewer_ProjectSearchId_NotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
	    		}
	    			
	    		Set<Integer> projectIdsSet = new HashSet<>();
    		
    			Integer projectIdForProjectSearchId = projectIdMap_Key_ProjectSearchId.get( projectSearchId );
    			if ( projectIdForProjectSearchId == null ) {

	    			final int statusCode404 = 404; // Resource not found

	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.RESPONSE_STATUS_CODE, statusCode404 ); 
 
	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_SEARCH_NOT_FOUND, true ); // Control message on error page

//	    			final String mainErrorPageControllerURL =
//	    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
//	    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

//	    			RequestDispatcher requestDispatcher = 
//	    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

	    			log.warn( "Error in URL to Project Search Based page, projectSearchId not found in database. projectSearchId: " + projectSearchId
	    					+ ".  setting HTTP status code to: " + statusCode404
	    					+ ".  Forwarding to '"
	    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER
	    					+ "'. requestURI: " + httpServletRequest.getRequestURI() );

//	    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

	    			//  EARLY EXIT
	    		
	    			return AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER; //  EARLY EXIT
    			}
    			projectIdsSet.add( projectIdForProjectSearchId );

	    		if ( projectIdsSet.size() > 1 ) {

	    			final int statusCode404 = 404; // Resource not found

	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.RESPONSE_STATUS_CODE, statusCode404 ); 
	    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_SEARCHES_FOUND_MORE_THAN_ONE_PROJECT, true ); // Control message on error page

//	    			final String mainErrorPageControllerURL =
//	    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
//	    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

//	    			RequestDispatcher requestDispatcher = 
//	    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

	    			log.warn( "Error in URL to Project Search Based page, projectIdsSet.size() > 1. "
	    					+ "setting HTTP status code to: " + statusCode404
	    					+ ".  Forwarding to '"
	    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER
	    					+ "'. requestURI: " + httpServletRequest.getRequestURI() );

//	    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

	    			//  EARLY EXIT
	    		
	    			return AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER; //  EARLY EXIT
	    		}
	    		
	    		projectIds = new ArrayList<>( projectIdsSet );
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

				//  EARLY EXIT
			
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {

				//  EARLY EXIT
			
				return AA_ErrorPageControllerPaths_Constants.FORWARD_TO_ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE;
			}
			
			Integer projectId = projectIds.get( 0 );
			
			httpServletRequest.setAttribute( "projectId", projectId );

			
				
			Integer searchId;
			try {
				searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			} catch (SQLException e) {
				String msg = "Exception from call searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId ); projectSearchId: " + projectSearchId;
				log.error( msg );
				throw new RuntimeException( msg, e );
			}
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
				throw new RuntimeException( msg );
			}
			
			PsmDTO psmDTO;
			try {
				psmDTO = psmDAO.getById( psmId );
			} catch (SQLException e) {
				String msg = "Exception from call psmDAO.getById( psmId ); psmId: " + psmId;
				log.error( msg );
				throw e;
			}
			if ( psmDTO == null ) {
				String msg = "No psmDTO for psmId: " + psmId;
				log.warn( msg );
	
				this.getDataForNotFoundPage( httpServletRequest );

				//  EARLY EXIT
			
				return "data_pages/error_pages/spectrumViewer_PSM_NotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			}
			
			//  Validate that searchId is on psm_tbl record for psmId
			if ( psmDTO.getSearchId() != searchId ) {
				String msg = "psmDTO.getSearchId() != searchId. psmId: " + psmId + ", searchId: " + searchId;
				log.warn( msg );
				throw new RuntimeException( "psmDTO.getSearchId() != searchId" );
			}
			
			httpServletRequest.setAttribute( "projectSearchId", projectSearchId );
			httpServletRequest.setAttribute( "psmIdNumber", psmId );
			
			return "data_pages/lorikeetSpectrumViewerView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch (Exception e) {

			log.error( "Error in controller", e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e );
		}
		
	}
	

	/**
	 * Set up request attributes for ...NotFound.jsp
	 * @param httpServletRequest
	 * @throws Exception 
	 */
	private void getDataForNotFoundPage(HttpServletRequest httpServletRequest) {
		
		try {
			String adminEmailAddress =
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.ADMIN_EMAIL_ADDRESS_KEY );
			httpServletRequest.setAttribute( REQUEST_ADMIN_EMAIL_ADDRESS, adminEmailAddress );
		} catch ( Exception e ) {
			log.error( "Failed to get config entry for adminEmailAddress for config key: '"
					+ ConfigSystemsKeysConstants.ADMIN_EMAIL_ADDRESS_KEY
					+ "'.  Not returning error to user.");
			//  Do NOT re-throw Exception
		}
	}

}
