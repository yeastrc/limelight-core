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

import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.CheckWhichAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;

/**
 * @author danj
 *
 */
public interface ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF {

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAdminAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAdminIfProjectNotLockedAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_CREATE_NEW_PROJECT_AKA_USER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateCreateNewProjectAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateProjectOwnerAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateProjectOwnerIfProjectNotLockedAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAssistantProjectOwnerAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateAssistantProjectOwnerIfProjectNotLockedAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateLoggedInUserReadOnlyAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException;

	/**
	 * Validate authAccessLevelIfNotLocked <= AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */
	
	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateLoggedInUserReadOnlyIfProjectNotLockedAllowed( List<Integer> projectIds, HttpServletRequest httpServletRequest ) throws SQLException;

	

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_SEARCH_DELETE
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateSearchDeleteAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_WRITE
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWriteAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

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

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateUserReadAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * Read only level that allows user session with public access code for this project 
	 * to access this data.  User logged on with ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY
	 * also has access. 
	 * 
	 * @return true if authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validatePublicAccessCodeReadAllowed(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * User session with public access code for this project. 
	 * 
	 * Validate authAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validatePublicAccessCodeReadAccessLevel(
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

	/**
	 * @param minimumAccessLevelRequired
	 * @param checkWhichAuthAccessLevel
	 * @param projectIds
	 * @param httpServletRequest
	 * @throws SQLException
	 */

	ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds(
			int minimumAccessLevelRequired, CheckWhichAuthAccessLevel checkWhichAuthAccessLevel,
			List<Integer> projectIds, HttpServletRequest httpServletRequest) throws SQLException;

}