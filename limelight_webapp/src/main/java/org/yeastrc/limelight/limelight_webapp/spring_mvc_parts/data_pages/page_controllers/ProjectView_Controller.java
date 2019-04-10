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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

@Controller
//@RequestMapping("/")
public class ProjectView_Controller {

	private static final Logger log = LoggerFactory.getLogger( ProjectView_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER;

	private static final String PATH_PARAMETER_LABEL_PROJECT_ID = "projectId";

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public ProjectView_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}


	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = { 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
			+ "/"
			+ "{" + PATH_PARAMETER_LABEL_PROJECT_ID + "}" } )
	
    public String controllerMethod(
    		@PathVariable(value = PATH_PARAMETER_LABEL_PROJECT_ID) String projectIdentifier,
    		HttpServletRequest httpServletRequest ) {
		
		log.info( "controllerMethod(...) called. projectIdentifier: " + projectIdentifier );
		
		try {

			int projectId = 0;

			try {
				projectId = Integer.parseInt( projectIdentifier ) ;

			} catch ( RuntimeException e ) {

				throw e;
			}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
				//  No User session and not public project so forward to Login page
				
				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {
				
				//  Not at least public project so show error page
				
				return "data_pages/error_pages/project_AccessNotAllowed_Page.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			}
			
			
			httpServletRequest.setAttribute( WebConstants.REQUEST_WEB_SESSION_AUTH_ACCESS_LEVEL, webSessionAuthAccessLevel );


			ProjectItem projectItem = null;

			ProjectDTO projectDTO = projectDAO.getPartialForProjectPageForId( projectId );

			if ( projectDTO == null ) {
				throw new LimelightErrorDataInWebRequestException( "project id not found" );
			}

			// Main Project Page Display
			httpServletRequest.setAttribute( WebConstants.REQUEST_PROJECT_PAGE_PROJECT_INFO, projectDTO );
			
			projectItem = new ProjectItem();
			projectItem.setId( projectId );
			projectItem.setTitle( projectDTO.getTitle() );
			projectItem.setAbstractText( projectDTO.getAbstractText() );
			projectItem.setProjectLocked( projectDTO.isProjectLocked() );
			
			if ( projectDTO.getPublicAccessLevel() != null
					&& projectDTO.getPublicAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY ) {
				
				projectItem.setProjectPublicAccessEnabled(true);
				httpServletRequest.setAttribute( "projectPublicAccessEnabled", true );
			}
			
			String projectIdsJSON = marshalObjectToJSON.getJSONString( projectIds );
			httpServletRequest.setAttribute( WebConstants.REQUEST_PROJECT_IDS, projectIdsJSON );
			
			ProjectItem[] projectEntries = { projectItem }; 
			String projectEntriesJSON = marshalObjectToJSON.getJSONString( projectEntries );
			httpServletRequest.setAttribute( WebConstants.REQUEST_PROJECT_ENTRIES, projectEntriesJSON );

			UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();
			
			populatePageHeaderData.populatePageHeaderData( projectIds, userSession, httpServletRequest );

			return "data_pages/other_data_pages/project_view_page/projectView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

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
    public static class ProjectItem {
    	
    	int id;
    	private String title;
    	private String abstractText;
    	private boolean projectLocked;
    	private boolean projectPublicAccessEnabled;
    	
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getAbstractText() {
			return abstractText;
		}
		public void setAbstractText(String abstractText) {
			this.abstractText = abstractText;
		}
		public boolean isProjectLocked() {
			return projectLocked;
		}
		public void setProjectLocked(boolean projectLocked) {
			this.projectLocked = projectLocked;
		}
		public boolean isProjectPublicAccessEnabled() {
			return projectPublicAccessEnabled;
		}
		public void setProjectPublicAccessEnabled(boolean projectPublicAccessEnabled) {
			this.projectPublicAccessEnabled = projectPublicAccessEnabled;
		}
    }

}