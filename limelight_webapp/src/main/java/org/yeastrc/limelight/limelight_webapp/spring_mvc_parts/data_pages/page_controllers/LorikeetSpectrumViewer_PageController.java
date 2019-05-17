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

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.services.Get_ProjectIds_For_ProjectSearchIds_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;

/**
 * Page controller for page that Lorikeet will be displayed in
 *
 */
@Controller
public class LorikeetSpectrumViewer_PageController {

	private static final Logger log = LoggerFactory.getLogger( LorikeetSpectrumViewer_PageController.class );

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private Get_ProjectIds_For_ProjectSearchIds_ServiceIF get_ProjectIds_For_ProjectSearchIds_Service;

	public LorikeetSpectrumViewer_PageController() {
		log.warn( "INFO: PRIMARY_CONTROLLER_PATH: " + PRIMARY_CONTROLLER_PATH );
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


	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ "ps"
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ "psm"
			+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
			+ PATH_PARAMETER_LABEL_PSM_ID_PATH_ADDITION;

	@GetMapping( path = { PRIMARY_CONTROLLER_PATH } )

	public String controllerEntry(

			@PathVariable(value = PATH_PARAMETER_LABEL_PROJECT_SEARCH_ID) 
			String projectSearchIdString,

			@PathVariable(value = PATH_PARAMETER_LABEL_PSM_ID) 
			String psmIdString,

			HttpServletRequest httpServletRequest ) {

		int projectSearchId = -1;
		int psmId = -1;
		
		try {
			projectSearchId = Integer.parseInt( projectSearchIdString );
		} catch ( Exception e ) {
			log.warn("projectSearchIdString not integer: " + projectSearchIdString );
			throw new RuntimeException();
		}
		try {
			psmId = Integer.parseInt( psmIdString );
		} catch ( Exception e ) {
			log.warn("psmIdString not integer: " + psmIdString );
			throw new RuntimeException();
		}


		try {
			List<Integer> projectSearchIds = new ArrayList<>( 1 );
			projectSearchIds.add( projectSearchId );
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

				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {

				return AA_ErrorPageControllerPaths_Constants.FORWARD_TO_ASSOCIATED_PROJECT_ACCESS_NOT_ALLOWED_ERROR_PAGE;
			}
			
			Integer projectId = projectIds.get( 0 );
			
			httpServletRequest.setAttribute( "projectId", projectId );

		} catch (Exception e) {

			log.error( "Error in controller", e );
			throw new RuntimeException( e );
		}
		
		httpServletRequest.setAttribute( "projectSearchId", projectSearchId );
		httpServletRequest.setAttribute( "psmId", psmId );

		return "data_pages/lorikeetSpectrumViewerView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}
