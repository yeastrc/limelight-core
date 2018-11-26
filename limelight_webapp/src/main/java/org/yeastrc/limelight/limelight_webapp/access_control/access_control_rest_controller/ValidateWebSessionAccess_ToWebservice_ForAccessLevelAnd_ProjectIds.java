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
package org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller;

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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Validate Web Session Access To Webservice For Access Level And Project Ids
 *
 * What is thrown from this class is directly turned into webservice response 
 * and handled in JS class handleServicesAJAXErrors.js
 *  
 */
@Component
public class ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds implements ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF {
	
	private static final Logger log = LoggerFactory.getLogger( ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.class );
	
	public enum CheckWhichAuthAccessLevel { MAIN, IF_PROJECT_NOT_LOCKED }

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	/**
	 * Result from any validate call
	 *
	 */
	public static class ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result {
		
		private UserSession userSession;
		private WebSessionAuthAccessLevel webSessionAuthAccessLevel;

		public UserSession getUserSession() {
			return userSession;
		}
		public WebSessionAuthAccessLevel getWebSessionAuthAccessLevel() {
			return webSessionAuthAccessLevel;
		}
	}

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAdminAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAdminIfProjectNotLockedAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateCreateNewProjectAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateProjectOwnerAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateProjectOwnerIfProjectNotLockedAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAssistantProjectOwnerAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAssistantProjectOwnerIfProjectNotLockedAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_SEARCH_DELETE
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateSearchDeleteAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_WRITE
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWriteAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_WRITE,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	/**
	 * NO access to user session with public access code for this project.
	 * 
	 * Read only level that allows user session with user logged on with ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY.
	 * 
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * 
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateUserReadAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}

	/**
	 * Read only level that allows user session with public access code for this project 
	 * to access this data.  User logged on with ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * also has access. 
	 * 
	 * @return true if authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validatePublicAccessCodeReadAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	//////////////////////////////////////////////////////////////
	
	///////////  This block is for checking the specific access level
	
	/**
	 * User session with public access code for this project. 
	 * 
	 * Validate authAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validatePublicAccessCodeReadAccessLevel( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException {
		
		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectIds,
				httpServletRequest );
	}
	
	
	/**
	 * @param minimumAccessLevelRequired
	 * @param checkWhichAuthAccessLevel
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds( 
			int minimumAccessLevelRequired,
			CheckWhichAuthAccessLevel checkWhichAuthAccessLevel,
			List<Integer> projectIds,
			HttpServletRequest httpServletRequest ) throws SQLException {

		if ( projectIds == null || projectIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectIds == null || projectIds.isEmpty()" );
		}

		if ( projectIds.size() > 1 ) {
			String msg = "Currently not accepting projectIds.size() > 1. projectIds: " + projectIds;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result result = new ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result();
		
		UserSession userSession =
				accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );
		
		result.userSession = userSession;
		
		Integer projectId = projectIds.get( 0 );

		ProjectDTO projectOnlyProjectLockedPublicAccessLevel = 
				projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		
		if ( projectOnlyProjectLockedPublicAccessLevel == null ) {
			throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
		}
		
		if ( ( ! projectOnlyProjectLockedPublicAccessLevel.isEnabled() )
				|| projectOnlyProjectLockedPublicAccessLevel.isMarkedForDeletion() ) {
			
			throw new LimelightErrorDataInWebRequestException( "Project Id Not Enabled Or Marked for Deletion" );
		}

		if ( userSession == null ) {
			//  No user logged in so all projects must be public projects

			Integer publicAccessLevel = projectOnlyProjectLockedPublicAccessLevel.getPublicAccessLevel();
			
			if ( publicAccessLevel != null ) {
				
				if ( minimumAccessLevelRequired < publicAccessLevel ) {
					
					throw new Limelight_WS_AuthError_Forbidden_Exception(); //  EARLY EXIT
				}
			} else {
				//  No User session and not public project

				throw new Limelight_WS_AuthError_Unauthorized_Exception(); //  EARLY EXIT
			}

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					WebSessionAuthAccessLevelBuilder.getBuilder()
					.set_authAccessLevel( publicAccessLevel )
					.set_authAaccessLevelForProjectIdsIfNotLocked( publicAccessLevel )
					.build();
			
			result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
			
			return result; //  EARLY EXIT
		}
		
		////////////////////////////
		
		//  Signed in user or at least a user session

		//  Start at no access level
		int authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_NONE;
		
		//  Start at no access level
		int authAccessLevelForProjectIdsIfNotLocked = AuthAccessLevelConstants.ACCESS_LEVEL_NONE;
		
		int userId = userSession.getUserId();

		ProjectUserDTO projectUserDTO = projectUserDAO.getForProjectIdUserId( projectId, userId );

		if ( projectUserDTO != null ) {

			authAccessLevel = projectUserDTO.getAccessLevel();
			authAccessLevelForProjectIdsIfNotLocked = projectUserDTO.getAccessLevel();
		}

		if ( userSession.getUserAccessLevel() != null 
				&& userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
			
			//  User is admin
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN;
			authAccessLevelForProjectIdsIfNotLocked = AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN;
		}
		
		if ( projectOnlyProjectLockedPublicAccessLevel.isProjectLocked() && authAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			
			//  Override auth level to read only if project is locked.
			
			int authAccessLevelIfNotLocked_Local = authAccessLevel;
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY;
			authAccessLevelForProjectIdsIfNotLocked = authAccessLevelIfNotLocked_Local;
		}

		if ( authAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			
			throw new Limelight_WS_AuthError_Forbidden_Exception();
			  //  EARLY EXIT
		}

		if ( checkWhichAuthAccessLevel == CheckWhichAuthAccessLevel.MAIN ) {
			if ( minimumAccessLevelRequired < authAccessLevel ) {

				throw new Limelight_WS_AuthError_Forbidden_Exception();
				//  EARLY EXIT
			}
		} else {

			if ( minimumAccessLevelRequired < authAccessLevelForProjectIdsIfNotLocked ) {

				throw new Limelight_WS_AuthError_Forbidden_Exception();
				//  EARLY EXIT
			}
		}
		

		WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
				WebSessionAuthAccessLevelBuilder.getBuilder()
				.set_authAccessLevel( authAccessLevel )
				.set_authAaccessLevelForProjectIdsIfNotLocked( authAccessLevelForProjectIdsIfNotLocked )
				.build();
		
		result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;
		
		return result;
	}

}
