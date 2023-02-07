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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.FileImportSubmitImportProgramKeyPerUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.TermsOfServiceTextVersionsDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.TermsOfServiceUserAcceptedVersionHistoryDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceUserAcceptedVersionHistoryDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.web_utils.IsTermsOfServiceEnabled_IF;

/**
 * Validate User Submit Import Program Key Access To Webservice For Access Level And Project Ids
 *
 * What is thrown from this class is directly turned into webservice response 
 * 
 *  
 * WARNING:  The Submit Import Program will show the value of BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage when set
 * 			 and will NO LONGER check the boolean flags (other than statusSuccess).
 * 			 So the property BaseSubmitImportWebserviceResponse.statusFail_ErrorMessage will be REQUIRED to be set for all errors.
 * 
 */
@Component
public class Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId implements Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectIdIF {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId.class );
	
	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	@Autowired
	private FileImportSubmitImportProgramKeyPerUserDAO_IF fileImportSubmitImportProgramKeyPerUserDAO;
	
	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private TermsOfServiceTextVersionsDAO_IF termsOfServiceTextVersionsDAO;
	
	@Autowired
	private TermsOfServiceUserAcceptedVersionHistoryDAO_IF termsOfServiceUserAcceptedVersionHistoryDAO;
	
	@Autowired
	private IsTermsOfServiceEnabled_IF isTermsOfServiceEnabled;
	
	/**
	 * 
	 *
	 */
	public static class Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result {
		
		private boolean success;
		
		private Integer userId;
		
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public Integer getUserId() {
			return userId;
		}
		public void setUserId(Integer userId) {
			this.userId = userId;
		}

	}
	
	/**
	 * Validate authAccessLevel <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER
	 * @param userSubmitImportPgrogramKey
	 * @param projectId
	 * @return userId, if found and valid
	 * @throws SQLException
	 */
	@Override
	public Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateProjectOwnerAllowed(
			String userSubmitImportPgrogramKey, 
			int projectId,
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response_PgmXML ) throws SQLException {

		return validateUserSubmitImportPgrogramKeyAccess_ToWebservice_ForAccessLevelAndProjectId(
				AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER,
				userSubmitImportPgrogramKey,
				projectId,
				submitImport_Init_Response_PgmXML );
	}
	
	/**
	 * @param minimumAccessLevelRequired
	 * @param userSubmitImportPgrogramKey
	 * @param projectId
	 * @return userId, if found and valid
	 * @throws SQLException
	 */
	@Override
	public Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result validateUserSubmitImportPgrogramKeyAccess_ToWebservice_ForAccessLevelAndProjectId( 
			int minimumAccessLevelRequired,
			String userSubmitImportPgrogramKey,
			int projectId,
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response_PgmXML ) throws SQLException {

		Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result result = new Validate_UserSubmitImportPgrogramKey_Access_ToWebservice_ForAccessLevelAnd_ProjectId_Result();

		ProjectDTO projectOnlyProjectLockedPublicAccessLevel = 
				projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		
		if ( projectOnlyProjectLockedPublicAccessLevel == null ) {
			
			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setProjectIdNotFound(true);
				submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Not Found." );
				return result;  // EARLY EXIT
			}
			throw new LimelightErrorDataInWebRequestException( "Project Id not found" );
		}
		
		if ( ! projectOnlyProjectLockedPublicAccessLevel.isEnabled() ) {
			
			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setProjectNotEnabled(true);
				submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Not Enabled." );
				return result;  // EARLY EXIT
			}
			throw new LimelightErrorDataInWebRequestException( "Project Id Not Enabled" );
		}

		if ( projectOnlyProjectLockedPublicAccessLevel.isMarkedForDeletion() ) {

			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setProjectMarkedForDeletion(true);
				submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Deleted." );
				return result;  // EARLY EXIT
			}
			throw new LimelightErrorDataInWebRequestException( "Project Id Marked for Deletion" );
		}

		//  Get User Id
		Integer userId = fileImportSubmitImportProgramKeyPerUserDAO.getUserIdFromSubmitImportProgramKey( userSubmitImportPgrogramKey );
		
		if ( userId == null ) {
			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setUserSubmitImportProgramKeyNotFound(true);
				
				String userSubmitImportPgrogramKey_FirstCharactersMsg = "";
				if ( userSubmitImportPgrogramKey != null && userSubmitImportPgrogramKey.length() > 0 ) {
					String userSubmitImportPgrogramKey_FirstCharacters = userSubmitImportPgrogramKey;
					if ( userSubmitImportPgrogramKey.length() > 2 ) {
						userSubmitImportPgrogramKey_FirstCharacters = userSubmitImportPgrogramKey.substring(0, 2);
					}
					
					userSubmitImportPgrogramKey_FirstCharactersMsg = "  The first 2 characters are '" + userSubmitImportPgrogramKey_FirstCharacters + "'.";
				}
				String errorMsg = "The supplied submit import key (in param '--user-submit-import-key') is invalid." + userSubmitImportPgrogramKey_FirstCharactersMsg;
				submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( errorMsg );
			} else {
				log.warn( "user id not found for userSubmitImportPgrogramKey: " + userSubmitImportPgrogramKey );
			}
			return result;  // EARLY EXIT
		}
		
		UserDTO userDTO = userDAO.getForId( userId );

		if ( userDTO == null ) {
			log.error( "userDTO not found for userId from fileImportSubmitImportProgramKeyPerUserDAO.getUserIdFromSubmitImportProgramKey(...) :"
					+ userId );
			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setUserSubmitImportProgramKeyNotFound(true);
			}
			return result;  // EARLY EXIT
		}
		
		result.userId = userId;

		//  Start at no access level
		int authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_NONE;
		
		ProjectUserDTO projectUserDTO = projectUserDAO.getForProjectIdUserId( projectId, userId );

		if ( projectUserDTO != null ) {

			authAccessLevel = projectUserDTO.getAccessLevel();
		}

		if ( userDTO.getUserAccessLevel() != null 
				&& userDTO.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
			
			//  User is admin
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN;
		}
		
		if ( projectOnlyProjectLockedPublicAccessLevel.isProjectLocked() && authAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			
			authAccessLevel = AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY;
		}

		if ( authAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			
			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setUserNotAuthorizedForProject(true);
				submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( "User is not Authorized as a Project Owner for this project." );
				return result;  // EARLY EXIT
			}
			throw new Limelight_WS_AuthError_Forbidden_Exception();
			  //  EARLY EXIT
		}

		if ( minimumAccessLevelRequired < authAccessLevel ) {

			if ( submitImport_Init_Response_PgmXML != null ) {
				submitImport_Init_Response_PgmXML.setUserNotAuthorizedForProject(true);
				return result;  // EARLY EXIT
			}
			throw new Limelight_WS_AuthError_Forbidden_Exception();
			//  EARLY EXIT
		}

		if ( isTermsOfServiceEnabled.isTermsOfServiceEnabled() ) {
			
			Integer termsOfService_VersionId_Latest = termsOfServiceTextVersionsDAO.getLatest_VersionId();
			if ( termsOfService_VersionId_Latest == null ) {
				String msg = "true ( isTermsOfServiceEnabled.isTermsOfServiceEnabled() ) but true ( termsOfService_VersionId_Latest == null ) ";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			TermsOfServiceUserAcceptedVersionHistoryDTO termsOfServiceUserAcceptedVersionHistoryDTO = 
					termsOfServiceUserAcceptedVersionHistoryDAO.getForUserIdTermsOfServiceVersionId(userId, termsOfService_VersionId_Latest.intValue());

			if ( termsOfServiceUserAcceptedVersionHistoryDTO == null ) {
				//  Latest Terms Of Service NOT Accepted so get user to accept by logging in

				if ( submitImport_Init_Response_PgmXML != null ) {
					submitImport_Init_Response_PgmXML.setUserNotAcceptLatestTermsOfService(true);
					submitImport_Init_Response_PgmXML.setStatusFail_ErrorMessage( "Our Terms of Service have changed. Please sign in to view and accept our new Terms of Service before uploading data." );
					return result;  // EARLY EXIT
				}
				throw new LimelightErrorDataInWebRequestException( "Project Id not found" );	
			}
			
		}
		
		
		result.success = true;
		
		return result;
	}

}
