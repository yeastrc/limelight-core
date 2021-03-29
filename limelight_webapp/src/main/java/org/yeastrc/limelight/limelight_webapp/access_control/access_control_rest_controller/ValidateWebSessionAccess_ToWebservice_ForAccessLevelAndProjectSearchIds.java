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
import org.apache.commons.lang3.StringUtils;
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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.services.Get_ProjectIds_For_ProjectSearchIds_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Validate Web Session Access To Webservice For Access Level And ProjectSearch Ids
 *
 * What is thrown from this class is directly turned into webservice response 
 * and handled in JS class handleServicesAJAXErrors.js
 *  
 */
@Component
public class ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds implements ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF {

	private static final Logger log = LoggerFactory.getLogger( ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.class );
	
	public enum CheckWhichAuthAccessLevel { MAIN, IF_PROJECT_NOT_LOCKED }

	@Autowired
	private Get_ProjectIds_For_ProjectSearchIds_ServiceIF get_ProjectIds_For_ProjectSearchIds_Service;

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
	public static class ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result {
		
		private UserSession userSession;
		private WebSessionAuthAccessLevel webSessionAuthAccessLevel;
		private List<Integer> projectIdsForProjectSearchIds;
		
		public UserSession getUserSession() {
			return userSession;
		}

		public WebSessionAuthAccessLevel getWebSessionAuthAccessLevel() {
			return webSessionAuthAccessLevel;
		}

		public List<Integer> getProjectIdsForProjectSearchIds() {
			return projectIdsForProjectSearchIds;
		}
	}

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateAdminAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateAdminIfProjectNotLockedAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateCreateNewProjectAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateProjectOwnerAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateProjectOwnerIfProjectNotLockedAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateAssistantProjectOwnerAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateAssistantProjectOwnerIfProjectNotLockedAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.IF_PROJECT_NOT_LOCKED,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_SEARCH_DELETE
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateSearchDeleteAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_WRITE
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWriteAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_WRITE,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	/**
	 * NO access to user session with public access code for this project.
	 * 
	 * Read only level that allows user session with user logged on with ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY.
	 * 
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * 
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateUserReadAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
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
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validatePublicAccessCodeReadAllowed( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {

		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
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
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validatePublicAccessCodeReadAccessLevel( List<Integer> projectSearchIds, HttpServletRequest httpServletRequest ) throws SQLException {
		
		return validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
				AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY,
				CheckWhichAuthAccessLevel.MAIN,
				projectSearchIds,
				httpServletRequest );
	}
	
	
	/**
	 * @param minimumAccessLevelRequired
	 * @param checkWhichAuthAccessLevel
	 * @param projectSearchIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	@Override
	public ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds( 
			int minimumAccessLevelRequired,
			CheckWhichAuthAccessLevel checkWhichAuthAccessLevel,
			List<Integer> projectSearchIds,
			HttpServletRequest httpServletRequest ) throws SQLException {

		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds == null || projectSearchIds.isEmpty()" );
		}
		
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result result = new ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result();
		
		UserSession userSession =
				accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );
		
		result.userSession = userSession;
		
		List<Integer> projectIds = get_ProjectIds_For_ProjectSearchIds_Service.get_ProjectIds_For_ProjectSearchIds_Service( projectSearchIds );
		
		result.projectIdsForProjectSearchIds = projectIds;
		
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

		
		if ( userSession.isActualUser() ) {

			//  Signed in user

			Integer userId = userSession.getUserId();

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

				if ( projectOnlyProjectLockedPublicAccessLevel.isProjectLocked() ) {

					authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY;
				}

				WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
						WebSessionAuthAccessLevelBuilder.getBuilder()
						.set_authAccessLevel( authAccessLevel )
						.set_authAaccessLevelForProjectIdsIfNotLocked( authAccessLevelForProjectIdsIfNotLocked )
						.build();

				result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;

				return result;  //  EARLY EXIT
			}
		} else {
			
			//  NOT Signed in user so validate Public Access Code

			//  NOT a signed in user so test public access code
			
			if ( StringUtils.isEmpty( userSession.getPublicAccessCode() ) || userSession.getProjectId_ForPublicAccessCode() == null ) {
				
				//  No Public Access code in session so NO access
				

			} else {

				if ( userSession.getProjectId_ForPublicAccessCode().intValue() == projectId ) {

					//  Only if Public Access Code is for current Project Id

					ProjectDTO projectOnly_PublicAccessCodePublicAccessCodeEnabled = projectDAO.getPublicAccessCodePublicAccessCodeEnabledForProjectId( projectId );

					if ( projectOnly_PublicAccessCodePublicAccessCodeEnabled == null ) {
						throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
					}

					if ( projectOnly_PublicAccessCodePublicAccessCodeEnabled.isPublicAccessCodeEnabled() ) {

						//  Only if Public Access Code is Enabled

						if ( userSession.getPublicAccessCode().equals( projectOnly_PublicAccessCodePublicAccessCodeEnabled.getPublicAccessCode() ) ) {

							//  Public Access Code is Enabled and matches code in session and project Id matches so give Public User access

							WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
									WebSessionAuthAccessLevelBuilder.getBuilder()
									.set_authAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY )
									.set_authAaccessLevelForProjectIdsIfNotLocked( AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY )
									.build();

							result.webSessionAuthAccessLevel = webSessionAuthAccessLevel;

							return result;  //  EARLY EXIT
						}
					}
				}
			}
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
