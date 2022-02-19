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
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.searchers.Experiments_AnyForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SavedView_AnyForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
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
	
	//  For No Project found page
	private static final String REQUEST_PROJECT_ID_FROM_VIEW_PROJECT_CONTROLLER = "projectId_FromViewProjectController";
	//  For No Project found page
	private static final String REQUEST_ADMIN_EMAIL_ADDRESS = "adminEmailAddress";
	

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private SavedView_AnyForProjectId_Searcher_IF savedView_AnyForProjectId_Searcher;
	
	@Autowired
	private Experiments_AnyForProjectId_Searcher_IF experiments_AnyForProjectId_Searcher;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
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
		
		httpServletRequest.setAttribute( REQUEST_PROJECT_ID_FROM_VIEW_PROJECT_CONTROLLER, projectIdentifier );
		
		try {
			
			if ( true ) {
				throw new Exception("FORCE");
			}

			int projectId = 0;

			try {
				projectId = Integer.parseInt( projectIdentifier ) ;

			} catch ( RuntimeException e ) {
				log.warn( "Failed to parse project id: " + projectIdentifier );
				this.getDataForProjectNotFoundPage( httpServletRequest );
				return "data_pages/error_pages/projectNotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			}
			{	
				//  Confirm projectId is in database and is not marked for deletion and is enabled
				// !!!  Only populates properties projectLocked, publicAccessLevel, public_access_locked, enabled, markedForDeletion,
				ProjectDTO projectDTO_Partial = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
				if ( projectDTO_Partial == null ) {
					log.warn( "project id not found in database: " + projectId );
					this.getDataForProjectNotFoundPage( httpServletRequest );
					return "data_pages/error_pages/projectNotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
				}
				if ( ( ! projectDTO_Partial.isEnabled() ) || projectDTO_Partial.isMarkedForDeletion() ) {
					String msg = "Project is not enabled or is marked for deletion for id: " + projectId;
					log.warn( msg );
					this.getDataForProjectNotFoundPage( httpServletRequest );
					return "data_pages/error_pages/projectNotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
				}
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
				log.warn( "project id not found in database: " + projectId );
				this.getDataForProjectNotFoundPage( httpServletRequest );
				return "data_pages/error_pages/projectNotFound.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
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
			
			if ( webSessionAuthAccessLevel.isProjectOwnerIfProjectNotLockedAllowed() ) {
				
				ProjectDTO projectOnly_PublicAccessCodePublicAccessCodeEnabled = projectDAO.getPublicAccessCodePublicAccessCodeEnabledForProjectId( projectId );

				if ( projectOnly_PublicAccessCodePublicAccessCodeEnabled == null ) {
					throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
				}
				
				httpServletRequest.setAttribute( "projectPublicAccessCode", projectOnly_PublicAccessCodePublicAccessCodeEnabled.getPublicAccessCode() );

				if ( projectOnly_PublicAccessCodePublicAccessCodeEnabled.isPublicAccessCodeEnabled() ) {

					
					httpServletRequest.setAttribute( "projectPublicAccessCodeEnabled", true );
				}
			
			} else if ( webSessionAuthAccessLevel.isViewerReadOnlyIfProjectNotLockedAllowed() ) {
				
				//  Only needed for Assistant Project Owner (AKA Researcher)
				
				String projectShortName = projectDAO.get_ShortName_ForId( projectId );
				
				httpServletRequest.setAttribute( "projectShortName", projectShortName );
			}
			
			String projectIdsJSON = marshalObjectToJSON.getJSONString( projectIds );
			httpServletRequest.setAttribute( WebConstants.REQUEST_PROJECT_IDS, projectIdsJSON );
			
			ProjectItem[] projectEntries = { projectItem }; 
			String projectEntriesJSON = marshalObjectToJSON.getJSONString( projectEntries );
			httpServletRequest.setAttribute( WebConstants.REQUEST_PROJECT_ENTRIES, projectEntriesJSON );

			UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();
			
			populatePageHeaderData.populatePageHeaderData( projectIds, userSession, httpServletRequest );
			
			if ( userSession != null && userSession.isActualUser() ) {

				//  If logged in user, always show Saved Views and Experiments sections
				
				httpServletRequest.setAttribute( WebConstants.REQUEST_SHOW_SAVED_VIEWS_BLOCK, true );
				httpServletRequest.setAttribute( WebConstants.REQUEST_SHOW_EXPRERIMENTS_BLOCK, true );
			
				
			} else {
				// For Public user, only show Saved Views section if there are any saved views

				if ( savedView_AnyForProjectId_Searcher.savedView_AnyForProjectId( projectId ) ) {
					
					httpServletRequest.setAttribute( WebConstants.REQUEST_SHOW_SAVED_VIEWS_BLOCK, true );
				}
				
				// For Public user, only show Saved Views section if there are any saved views
				
				if ( experiments_AnyForProjectId_Searcher.experiments_AnyForProjectId_Searcher( projectId ) ) {
				
					httpServletRequest.setAttribute( WebConstants.REQUEST_SHOW_EXPRERIMENTS_BLOCK, true );
				}
			}

			return "data_pages/other_data_pages/project_view_page/projectView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Exception e ) {
			
			String msg = "Exception: ";
			log.error( msg, e );
			
			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e ); //  TODO forward to error page
		}
    }

	/**
	 * Set up request attributes for projectNotFound.jsp
	 * @param httpServletRequest
	 * @throws Exception 
	 */
	private void getDataForProjectNotFoundPage(HttpServletRequest httpServletRequest) throws Exception {
		
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