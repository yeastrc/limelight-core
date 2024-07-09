/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.page_controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightPageAcceessErrorException;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_Pending_ProjectIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForProjectIdListSearcher.ProjectListForProjectIdListSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectListForProjectIdListSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

/**
 * Admin Manage Importer / Pipeline Queue Page - Page Controller
 * 
 * 
 * Manage Importer and Pipeline Queue Page - Manages the Queue for "Run Importer" process
 *
 */
@Controller
public class AdminManage_Importer_Queue_Controller {

	private static final Logger log = LoggerFactory.getLogger( AdminManage_Importer_Queue_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_WebappAdmin_PageControllerPaths_Constants.ADMIN_MANAGE_IMPORTER_PIPELINE_QUEUE_PAGE_CONTROLLER;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private FileImportTracking_Pending_ProjectIds_Searcher_IF fileImportTracking_Pending_ProjectIds_Searcher;
	
	@Autowired
	private ProjectListForProjectIdListSearcher_IF projectListForProjectIdListSearcher;
	
	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = { 
					AA_WebappAdmin_PageControllerPaths_Constants.PATH_START_ALL
					+ PRIMARY_CONTROLLER_PATH
			} )

    public String controllerMethod(
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerMethod(...) called" );
		try {
			UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession == null || ( ! userSession.isActualUser() ) ) {
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( userSession.isGlobalAdminUser() || 
					( userSession.getUserAccessLevel() != null 
							&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
				
			} else {
				//  Only admin user authorized to access this page
				
				throw new LimelightPageAcceessErrorException("User does not have access, should not have had the link.");
			}
			
			Integer loggedInUserId = userSession.getUserId();
			
			httpServletRequest.setAttribute( "loggedInUserId", loggedInUserId );

			populatePageHeaderData.populatePageHeaderData( null /* projectIds */, userSession, httpServletRequest );
			
			List<Integer> projectIds_WithPendingImports = fileImportTracking_Pending_ProjectIds_Searcher.getPending_ProjectIds();
			
			List<ProjectListForProjectIdListSearcher_ResultItem> projectListForProjectIdList = projectListForProjectIdListSearcher.getProjectListForProjectIdList(projectIds_WithPendingImports);
			
			List<Internal_PerProject_Data> projectList = new ArrayList<>( projectListForProjectIdList.size() );
			
			for ( ProjectListForProjectIdListSearcher_ResultItem projectListItem : projectListForProjectIdList ) {
				
				Internal_PerProject_Data projectData = new Internal_PerProject_Data();
				projectData.projectId = projectListItem.getId();
				projectData.projectName = projectListItem.getTitle();
				
				projectList.add(projectData);
			}
			
			httpServletRequest.setAttribute( "projectList", projectList );

			return "webapp_administration_pages_and_parts/pages/webappAdminManage_Importer_Pipeline_Queue.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class Internal_PerProject_Data {
		private int projectId;
		private String projectName;
		public int getProjectId() {
			return projectId;
		}
		public String getProjectName() {
			return projectName;
		}
	}
}
