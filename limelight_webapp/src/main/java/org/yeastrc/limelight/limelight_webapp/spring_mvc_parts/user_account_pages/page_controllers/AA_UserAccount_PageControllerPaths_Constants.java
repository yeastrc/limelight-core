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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers;

/**
 * The paths of the user account page controllers
 *
 */
public class AA_UserAccount_PageControllerPaths_Constants {

	//////////////////////////////////////////
	
	//  All User Pages start with "/user"


	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";
	
	
	/**
	 * User Login Page
	 */
	public static final String LOGIN_PAGE_CONTROLLER = "user/login";

	/**
	 * User Logout Page
	 */
	public static final String LOGOUT_PAGE_CONTROLLER = "user/logout";
	
	public static final String FORWARD_TO_LOGIN_PAGE_CONTROLLER = "forward:" + PATH_START_ALL + LOGIN_PAGE_CONTROLLER;
	
	////  Invite Processing

	/**
	 * Linked to in the email sent to invite a person to limelight
	 */
	public static final String INVITE_PROCESS_CODE_PAGE_CONTROLLER = "invite-process-code";

	////  Reset Pasword Processing

	/**
	 * Linked to in the email sent to a person to reset their password in limelight
	 */
	public static final String RESET_PASSWORD_PROCESS_CODE_PAGE_CONTROLLER = "reset-password-process-code";
	
	

	////  User Account Management
	
	/**
	 * User Login Page
	 */
	public static final String USER_ACCOUNT_MANAGEMENT_PAGE_CONTROLLER = "user/account-management";

}
