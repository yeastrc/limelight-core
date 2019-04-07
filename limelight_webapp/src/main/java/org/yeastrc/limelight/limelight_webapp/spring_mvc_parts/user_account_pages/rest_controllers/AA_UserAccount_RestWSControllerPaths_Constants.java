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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.rest_controllers;

/**
 * The paths of the rest webservice controllers for user account
 *
 */
public class AA_UserAccount_RestWSControllerPaths_Constants {

	//  All start with "/user/rws/" for user account rest web service
	
	//  Adding /for-page to differentiate between possible future public web services

	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";

	///////////////
	
	/**
	 * All paths for user webservices will start with this string
	 */
	public static final String USER_REST_WEBSERVICE_CONTROLLER_START = "user/rws/";
	
	
	public static final String USER_LOGIN_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/login";

	public static final String USER_INFO_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/userInfo";

	public static final String USER_CHANGE_ACCOUNT_INFO_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/user-change-account-info";

	public static final String USER_SUBMIT_IMPORT_KEY_GET_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/user-submit-import-key-get";
	public static final String USER_SUBMIT_IMPORT_KEY_MANAGE_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/user-submit-import-key-manage";

	
	public static final String USER_CREATE_ACCOUNT_FROM_INVITE_REST_WEBSERVICE_CONTROLLER = "user/rws/for-page/create-account-from-invite";
	
	public static final String USER_RESET_PASSWORD_GEN_EMAIL_WEBSERVICE_CONTROLLER = "user/rws/for-page/reset-password-gen-email";

	public static final String USER_RESET_PASSWORD_CHANGE_PASSWORD_WEBSERVICE_CONTROLLER = "user/rws/for-page/reset-password-change-password";

}
