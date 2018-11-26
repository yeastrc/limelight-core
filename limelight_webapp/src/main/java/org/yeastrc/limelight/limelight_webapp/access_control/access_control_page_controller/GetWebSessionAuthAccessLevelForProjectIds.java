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
package org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevelBuilder;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Get User (Or Public User) Access Level for Project Ids
 *
 */
@Component
public class GetWebSessionAuthAccessLevelForProjectIds implements GetWebSessionAuthAccessLevelForProjectIdsIF {

	private static final Logger log = LoggerFactory.getLogger( GetWebSessionAuthAccessLevelForProjectIds.class );
	
	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	
	/**
	 * 
	 *
	 */
	public static class GetWebSessionAuthAccessLevelForProjectIds_Result {
		
		private WebSessionAuthAccessLevel webSessionAuthAccessLevel;
		
		private boolean noSession;
		private UserSession userSession;
		
		public WebSessionAuthAccessLevel getWebSessionAuthAccessLevel() {
			return webSessionAuthAccessLevel;
		}
		public void setWebSessionAuthAccessLevel(WebSessionAuthAccessLevel webSessionAuthAccessLevel) {
			this.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
		}
		public boolean isNoSession() {
			return noSession;
		}
		public void setNoSession(boolean noSession) {
			this.noSession = noSession;
		}
		public UserSession getUserSession() {
			return userSession;
		}
		public void setUserSession(UserSession userSession) {
			this.userSession = userSession;
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF#getAuthAccessLevelForProjectIds(java.util.List, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public GetWebSessionAuthAccessLevelForProjectIds_Result getAuthAccessLevelForProjectIds( List<Integer> projectIds, HttpServletRequest httpServletRequest ) 
			throws SQLException, LimelightErrorDataInWebRequestException {
		
		if ( projectIds == null || projectIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectIds == null || projectIds.isEmpty()" );
		}
		
		if ( projectIds.size() > 1 ) {
			String msg = "Currently not accepting projectIds.size() > 1. projectIds: " + projectIds;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		Integer projectId = projectIds.get( 0 );

		ProjectDTO projectOnlyProjectLockedPublicAccessLevel = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		
		if ( projectOnlyProjectLockedPublicAccessLevel == null ) {
			throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
		}
		
		if ( ( ! projectOnlyProjectLockedPublicAccessLevel.isEnabled() )
				|| projectOnlyProjectLockedPublicAccessLevel.isMarkedForDeletion() ) {
			
			//  Override auth level to none if project is not enabled or marked for deletion.
			
			WebSessionAuthAccessLevel webSessionAuthAccessLevel =
					WebSessionAuthAccessLevelBuilder
					.getBuilder()
					.set_authAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_NONE )
					.set_authAaccessLevelForProjectIdsIfNotLocked( AuthAccessLevelConstants.ACCESS_LEVEL_NONE )
					.build();
			
			GetWebSessionAuthAccessLevelForProjectIds_Result result = new GetWebSessionAuthAccessLevelForProjectIds_Result();
			result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
			
			{
				UserSession userSession =
						accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );
				if ( userSession == null ) {
					result.noSession = true;
				}
			}
			return result;  //  EARLY EXIT
		}
		
		UserSession userSession =
				accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );
		
		if ( userSession == null ) {
			//  No user logged in so all projects must be public projects

			Integer publicAccessLevel = projectOnlyProjectLockedPublicAccessLevel.getPublicAccessLevel();
			
			if ( publicAccessLevel != null && publicAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
				
				WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
						WebSessionAuthAccessLevelBuilder.getBuilder()
						.set_authAccessLevel( publicAccessLevel )
						.set_authAaccessLevelForProjectIdsIfNotLocked( publicAccessLevel )
						.build();

				GetWebSessionAuthAccessLevelForProjectIds_Result result = new GetWebSessionAuthAccessLevelForProjectIds_Result();
				result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
				
				result.noSession = true;
				
				return result;  //  EARLY EXIT
			}
			
			//  No User session and not public project

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					WebSessionAuthAccessLevelBuilder.getBuilder()
					.set_authAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_NONE )
					.set_authAaccessLevelForProjectIdsIfNotLocked( AuthAccessLevelConstants.ACCESS_LEVEL_NONE )
					.build();

			GetWebSessionAuthAccessLevelForProjectIds_Result result = new GetWebSessionAuthAccessLevelForProjectIds_Result();
			result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
			result.noSession = true;
			
			return result;  //  EARLY EXIT
		}
		
		////////////////////////////
		
		//  Signed in user or at least a user session

		//  Start at no access level
		int authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_NONE;
		
		//  Start at no access level
		int authAccessLevelForProjectIdsIfNotLocked = AuthAccessLevelConstants.ACCESS_LEVEL_NONE;
		
		if ( userSession.getUserAccessLevel() != null 
				&& userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
			
			//  User is admin
			
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN;
			authAccessLevelForProjectIdsIfNotLocked = AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN;
		} else {
		
			int userId = userSession.getUserId();

			ProjectUserDTO projectUserDTO = projectUserDAO.getForProjectIdUserId( projectId, userId );
		
			if ( projectUserDTO != null ) {
				
				authAccessLevel = projectUserDTO.getAccessLevel();
				authAccessLevelForProjectIdsIfNotLocked = projectUserDTO.getAccessLevel();
			}
		}

		if ( projectOnlyProjectLockedPublicAccessLevel.isProjectLocked() && authAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			
			//  Override auth level to read only if project is locked.
			
			int authAccessLevelIfNotLocked_Local = authAccessLevel;
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY;
			authAccessLevelForProjectIdsIfNotLocked = authAccessLevelIfNotLocked_Local;
		}
		
		WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
				WebSessionAuthAccessLevelBuilder.getBuilder()
				.set_authAccessLevel( authAccessLevel )
				.set_authAaccessLevelForProjectIdsIfNotLocked( authAccessLevelForProjectIdsIfNotLocked )
				.build();
		
		GetWebSessionAuthAccessLevelForProjectIds_Result result = new GetWebSessionAuthAccessLevelForProjectIds_Result();
		result.userSession = userSession;
		result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
		
		return result;  //  EARLY EXIT
	}
}

