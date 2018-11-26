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
package org.yeastrc.limelight.limelight_webapp.services;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.AllowedTimeConstants;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserForgotPasswordTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserForgotPasswordTrackingDTO;

/**
 * Validate the User Reset Password Code
 *
 */
@Component
public class User_Validate_ResetPassword_Code_Service implements User_Validate_ResetPassword_Code_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( User_Validate_ResetPassword_Code_Service.class );
	
	private static final String ERROR_RESETPASSWORD_PROCESS_INVALID_CODE = "The Reset Password code is invalid.";
	private static final String ERROR_RESETPASSWORD_PROCESS_CODE_ALREADY_USED = "The Reset Password code has already been used.";
	private static final String ERROR_RESETPASSWORD_PROCESS_CODE_REPLACED_BY_NEWER = "A newer Reset Password code has been created so this one is invalid.";
	private static final String ERROR_RESETPASSWORD_PROCESS_CODE_TOO_OLD = "The Reset Password code has expired.";
	private static final String ERROR_RESETPASSWORD_PROCESS_CODE_GENERAL = "There was an error processing the request.";

	@Autowired
	private UserForgotPasswordTrackingDAO_IF userForgotPasswordTrackingDAO;
	
	@Autowired
	private UserDAO_IF userDAO;
	
	/**
	 * Method Result
	 */
	public static class User_Validate_ResetPassword_Code_Service_Result {
		
		private boolean valid = false;
		private Integer userMgmtUserId;
		private UserForgotPasswordTrackingDTO forgotPwdTrk;
		private String errorMsg;
		
		public boolean isValid() {
			return valid;
		}
		public void setValid(boolean valid) {
			this.valid = valid;
		}
		public Integer getUserMgmtUserId() {
			return userMgmtUserId;
		}
		public void setUserMgmtUserId(Integer userMgmtUserId) {
			this.userMgmtUserId = userMgmtUserId;
		}
		public UserForgotPasswordTrackingDTO getForgotPwdTrk() {
			return forgotPwdTrk;
		}
		public void setForgotPwdTrk(UserForgotPasswordTrackingDTO forgotPwdTrk) {
			this.forgotPwdTrk = forgotPwdTrk;
		}
		public String getErrorMsg() {
			return errorMsg;
		}
		public void setErrorMsg(String errorMsg) {
			this.errorMsg = errorMsg;
		}
	}
	
	/**
	 * @param resetPasswordTrackingCode
	 * @return
	 * @throws Exception 
	 */
	@Override
	public User_Validate_ResetPassword_Code_Service_Result user_Validate_ResetPassword_Code_Service( String resetPasswordTrackingCode ) throws Exception {
	
		User_Validate_ResetPassword_Code_Service_Result result = new User_Validate_ResetPassword_Code_Service_Result();
		
		if ( StringUtils.isEmpty( resetPasswordTrackingCode ) ) {
			String msg = "'resetPasswordTrackingCode' is empty";
			throw new IllegalArgumentException( msg );
		}
		
		try {
			if ( StringUtils.isEmpty( resetPasswordTrackingCode ) ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_INVALID_CODE;
				return result;
			}
			
			UserForgotPasswordTrackingDTO forgotPwdTrk = 
					userForgotPasswordTrackingDAO.getForForgotPasswordTrackingCode( resetPasswordTrackingCode );
			
			result.forgotPwdTrk = forgotPwdTrk;
			
			if ( forgotPwdTrk == null ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_INVALID_CODE;
				return result;
			}
			if ( forgotPwdTrk.getUsedDate() != null ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_CODE_ALREADY_USED;
				return result;
			}
			long createDateMilliSec = forgotPwdTrk.getCreateDate().getTime();
			long nowInMilliSec = System.currentTimeMillis();
			if ( createDateMilliSec + AllowedTimeConstants.DURATION_FORGOT_PASSWORD_CODE_VALID < nowInMilliSec ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_CODE_TOO_OLD;
				return result;
			}
			if ( forgotPwdTrk.isCodeReplacedByNewer() ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_CODE_REPLACED_BY_NEWER;
				return result;
			}
			int userId = forgotPwdTrk.getUserId();
			Integer userIdFromDB = userDAO.getIdForId( userId );
			if ( userIdFromDB == null ) {
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_CODE_GENERAL;
				return result;
			}
			//  Get User Mgmt User Id for authUserId
			Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( userId );
			if ( userMgmtUserId == null ) {
				String msg = "Failed to get userMgmtUserId for Limelight user id: " + userId;
				log.error( msg );
				result.errorMsg = ERROR_RESETPASSWORD_PROCESS_CODE_GENERAL;
				return result;
			}
			result.userMgmtUserId = userMgmtUserId;
			
			result.valid = true;
			
			return result;
			
		} catch ( Exception e ) {
			String msg = "Exception caught: " + e.toString();
			log.error( msg, e );
			throw e;
		}
	}
}
