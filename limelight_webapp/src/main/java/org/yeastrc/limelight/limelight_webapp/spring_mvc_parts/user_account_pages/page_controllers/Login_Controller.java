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

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.constants.UserSignupConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;

@Controller
//@RequestMapping("/")
public class Login_Controller {

	private static final Logger log = LoggerFactory.getLogger( Login_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public Login_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}

	/**
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = { 
					AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
					+ PRIMARY_CONTROLLER_PATH
			} )
	
    public String controllerMethod(
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerMethod(...) called" );
		try {
			String userSignupAllowWithoutInviteConfigValue =
					configSystemDAO.getConfigValueForConfigKey(
							ConfigSystemsKeysConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY );

			if ( UserSignupConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY__TRUE.equals( userSignupAllowWithoutInviteConfigValue ) ) {

				httpServletRequest.setAttribute( "userSignupAllowWithoutInvite", true );
			}

			return "user_account_pages_and_parts/pages/userLogin.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

		} catch ( Throwable t ) {

			log.error( "Exceptioin: ", t );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();

			throw new RuntimeException( t ); //  TODO forward to error page
		}
    }

}