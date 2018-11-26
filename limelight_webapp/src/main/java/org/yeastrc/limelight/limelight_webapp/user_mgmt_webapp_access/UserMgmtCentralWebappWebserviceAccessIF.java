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
package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

/**
 * @author danj
 *
 */
public interface UserMgmtCentralWebappWebserviceAccessIF {

	/**
	 * Initialize the Singleton instance
	 * @throws Exception
	 */
	void init();

	/**
	 * @param userMgmtSessionKeyAliveWebserviceRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtSessionKeyAliveWebserviceResponse sessionKeyAlive(
			UserMgmtSessionKeyAliveWebserviceRequest userMgmtSessionKeyAliveWebserviceRequest) throws Exception;

	/**
	 * @param userMgmtCreateAccountRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtCreateAccountResponse createUser(UserMgmtCreateAccountRequest userMgmtCreateAccountRequest)
			throws Exception;

	/**
	 * @param userMgmtLoginRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtLoginResponse userLogin(UserMgmtLoginRequest userMgmtLoginRequest) throws Exception;

	/**
	 * @param userMgmtChangePasswordRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtChangePasswordResponse changePassword(UserMgmtChangePasswordRequest userMgmtChangePasswordRequest)
			throws Exception;

	/**
	 * @param userMgmtResetPasswordRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtResetPasswordResponse resetPassword(UserMgmtResetPasswordRequest userMgmtResetPasswordRequest)
			throws Exception;

	/**
	 * @param userMgmtGetUserDataRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtGetUserDataResponse getUserData(UserMgmtGetUserDataRequest userMgmtGetUserDataRequest) throws Exception;

	/**
	 * @param userMgmtGetAccountEnabledRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtGetAccountEnabledResponse getAccountEnabled(
			UserMgmtGetAccountEnabledRequest userMgmtGetAccountEnabledRequest) throws Exception;

	/**
	 * @param userMgmtManageAccountRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtManageAccountResponse manageUserData(UserMgmtManageAccountRequest userMgmtManageAccountRequest)
			throws Exception;

	/**
	 * @param userMgmtSearchUserDataRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtSearchUserDataResponse searchUserDataByLastName(UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest)
			throws Exception;

	/**
	 * @param userMgmtSearchUserDataRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtSearchUserDataResponse searchUserDataByEmail(UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest)
			throws Exception;

	/**
	 * @param userMgmtSearchUserDataRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtSearchUserDataResponse searchUserDataByEmailExactMatchNoUserSession(
			UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest) throws Exception;

	/**
	 * @param userMgmtSearchUserDataRequest
	 * @return
	 * @throws Exception
	 */
	UserMgmtSearchUserDataResponse searchUserDataByUsernameExactMatchNoUserSession(
			UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest) throws Exception;

}