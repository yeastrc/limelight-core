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
package org.yeastrc.limelight.limelight_webapp.user_invite;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;

/**
 * Validate the User Invite Tracking code
 *
 */
@Component
public class ValidateUserInviteTrackingCode implements ValidateUserInviteTrackingCodeIF {

	private static final Logger log = LoggerFactory.getLogger( ValidateUserInviteTrackingCode.class );
	
	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;
	
	@Autowired
	private ProjectDAO_IF projectDAO;

	/**
	 * Result
	 *
	 */
	public static class ValidateUserInviteTrackingCodeResult_NotValidReason {

		private boolean invalidInviteCode;
		private boolean inviteCodeAlreadyUsed;
		private boolean inviteCodeReplacedByNewer;
		private boolean inviteCodeRevoked;
		private boolean projectNotExist;

		@Override
		public String toString() {
			return "ValidateUserInviteTrackingCodeResult_NotValidReason [invalidInviteCode=" + invalidInviteCode
					+ ", inviteCodeAlreadyUsed=" + inviteCodeAlreadyUsed + ", inviteCodeReplacedByNewer="
					+ inviteCodeReplacedByNewer + ", inviteCodeRevoked=" + inviteCodeRevoked + ", projectNotExist="
					+ projectNotExist + "]";
		}
		
		public boolean isInvalidInviteCode() {
			return invalidInviteCode;
		}
		public void setInvalidInviteCode(boolean invalidInviteCode) {
			this.invalidInviteCode = invalidInviteCode;
		}
		public boolean isInviteCodeAlreadyUsed() {
			return inviteCodeAlreadyUsed;
		}
		public void setInviteCodeAlreadyUsed(boolean inviteCodeAlreadyUsed) {
			this.inviteCodeAlreadyUsed = inviteCodeAlreadyUsed;
		}
		public boolean isInviteCodeReplacedByNewer() {
			return inviteCodeReplacedByNewer;
		}
		public void setInviteCodeReplacedByNewer(boolean inviteCodeReplacedByNewer) {
			this.inviteCodeReplacedByNewer = inviteCodeReplacedByNewer;
		}
		public boolean isInviteCodeRevoked() {
			return inviteCodeRevoked;
		}
		public void setInviteCodeRevoked(boolean inviteCodeRevoked) {
			this.inviteCodeRevoked = inviteCodeRevoked;
		}
		public boolean isProjectNotExist() {
			return projectNotExist;
		}
		public void setProjectNotExist(boolean projectNotExist) {
			this.projectNotExist = projectNotExist;
		}
	}

	/**
	 * Result
	 *
	 */
	public static class ValidateUserInviteTrackingCodeResult {
		
		private boolean codeIsValid = false;
		private UserInviteTrackingDTO userInviteTrackingDTO;
		private ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason;

		@Override
		public String toString() {
			return "ValidateUserInviteTrackingCodeResult [codeIsValid=" + codeIsValid + ", userInviteTrackingDTO="
					+ userInviteTrackingDTO + ", notValidReason=" + notValidReason + "]";
		}
		
		public boolean isCodeIsValid() {
			return codeIsValid;
		}
		public void setCodeIsValid(boolean codeIsValid) {
			this.codeIsValid = codeIsValid;
		}

		public UserInviteTrackingDTO getUserInviteTrackingDTO() {
			return userInviteTrackingDTO;
		}
		public void setUserInviteTrackingDTO(UserInviteTrackingDTO userInviteTrackingDTO) {
			this.userInviteTrackingDTO = userInviteTrackingDTO;
		}
		public ValidateUserInviteTrackingCodeResult_NotValidReason getNotValidReason() {
			return notValidReason;
		}
		public void setNotValidReason(ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason) {
			this.notValidReason = notValidReason;
		}
	}

	
	/**
	 * @param inviteTrackingCode
	 * @return
	 * @throws Exception 
	 */
	@Override
	public ValidateUserInviteTrackingCodeResult validateUserInviteTrackingCode( String inviteTrackingCode ) throws Exception { 

		ValidateUserInviteTrackingCodeResult result = new ValidateUserInviteTrackingCodeResult();
		
		if ( StringUtils.isEmpty( inviteTrackingCode ) ) {
			
			String msg = "'inviteTrackingCode' is empty";
			throw new IllegalArgumentException( msg );
		}

		try {

			if ( StringUtils.isEmpty( inviteTrackingCode ) ) {
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
				notValidReason.invalidInviteCode = true;
				result.notValidReason = notValidReason;
				return result;
			}
			
			UserInviteTrackingDTO userInviteTrackingDTO = userInviteTrackingDAO.getForInviteTrackingCode( inviteTrackingCode );
			
			if ( userInviteTrackingDTO == null ) {
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
				notValidReason.invalidInviteCode = true;
				result.notValidReason = notValidReason;
				return result;
			}
			
			
			if ( userInviteTrackingDTO.isInviteUsed() ) {
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
				notValidReason.inviteCodeAlreadyUsed = true;
				result.notValidReason = notValidReason;
				return result;
			}

			
			
//			long createDateMilliSec = authUserInviteTrackingDTO.getInviteCreateDate().getTime();
//			
//			long nowInMilliSec = System.currentTimeMillis();
//			
//			if ( createDateMilliSec + AllowedTimeConstants.DURATION_FORGOT_PASSWORD_CODE_VALID < nowInMilliSec ) {
//				errorMsgKey = "error.invite.process.code.too.old";
//				return false;
//			}
			
			
			if ( userInviteTrackingDTO.isCodeReplacedByNewer() ) {
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
				notValidReason.inviteCodeReplacedByNewer = true;
				result.notValidReason = notValidReason;
				return result;
			}
					
			
			if ( userInviteTrackingDTO.isInviteRevoked() ) {
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
				notValidReason.inviteCodeRevoked = true;
				result.notValidReason = notValidReason;
				return result;
			}
			
			Integer projectId = userInviteTrackingDTO.getInvitedProjectId();
			
			if ( projectId != null ) {
				
				ProjectDTO project = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );

				if ( project == null ) {

					ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
					notValidReason.projectNotExist = true;
					result.notValidReason = notValidReason;
					return result;
				}	

				if ( project.isMarkedForDeletion() || ( ! project.isEnabled() ) ) {

					ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
					notValidReason.projectNotExist = true;
					result.notValidReason = notValidReason;
					return result;
				}		
			}
			
			result.codeIsValid = true;
			result.userInviteTrackingDTO = userInviteTrackingDTO;
			
			return result;
			
		} catch ( Exception e ) {
			String msg = "Exception caught: " + e.toString();
			log.error( msg, e );
			throw e;
		}

	}
	
}
