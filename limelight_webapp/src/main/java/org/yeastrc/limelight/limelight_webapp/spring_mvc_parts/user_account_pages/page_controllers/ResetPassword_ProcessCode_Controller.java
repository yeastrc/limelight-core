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
import javax.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.services.User_Validate_ResetPassword_Code_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.User_Validate_ResetPassword_Code_Service.User_Validate_ResetPassword_Code_Service_Result;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;

@Controller
//@RequestMapping("/")
public class ResetPassword_ProcessCode_Controller {


	private static final Logger log = LoggerFactory.getLogger( ResetPassword_ProcessCode_Controller.class );

	/**
	 * Path Parameter.  
	 */
	private static final String PATH_PARAMETER_LABEL_RESET_PASSWORD_TRACKING_CODE = "resetPasswordTrackingCode";

	/**
	 * Spring MVC format for path parameter
	 */
	private static final String PATH_PARAMETER_LABEL_RESET_PASSWORD_TRACKING_CODE_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_RESET_PASSWORD_TRACKING_CODE + "}";

	/**
	 * Path for THIS controller
	 */
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.RESET_PASSWORD_PROCESS_CODE_PAGE_CONTROLLER
			+ "/" + PATH_PARAMETER_LABEL_RESET_PASSWORD_TRACKING_CODE_PATH_ADDITION;

	//  Forward to the Invite Landing Page page
	private static final String FORWARD_TO_RESET_PASSWORD_LANDING_PAGE =
			"user_account_pages_and_parts/pages/resetPasswordLandingPage.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	//  Forward to the Invite Error Page page
	private static final String FORWARD_TO_RESET_PASSWORD_ERROR_PAGE =
			"user_account_pages_and_parts/pages/resetPasswordErrorPage.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	

	@Autowired
	private UserSessionManager userSessionManager;

	@Autowired
	private User_Validate_ResetPassword_Code_ServiceIF user_Validate_ResetPassword_Code_Service;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public ResetPassword_ProcessCode_Controller() {
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
	
    public ModelAndView controllerMethod(
			@PathVariable( value = PATH_PARAMETER_LABEL_RESET_PASSWORD_TRACKING_CODE ) 
			String resetPasswordTrackingCode,
			RedirectAttributes attributes,
			HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerMethod(...) called" );
		
		log.info( "controllerMethod(...) called" );

		try {
			userSessionManager.invalidateUserSession( httpServletRequest, httpServletResponse );
					
			User_Validate_ResetPassword_Code_Service_Result user_Validate_ResetPassword_Code_Service_Result =
					user_Validate_ResetPassword_Code_Service.user_Validate_ResetPassword_Code_Service( resetPasswordTrackingCode );

			if ( ! user_Validate_ResetPassword_Code_Service_Result.isValid() ) {

				httpServletRequest.setAttribute( "errorMsg", user_Validate_ResetPassword_Code_Service_Result.getErrorMsg() );
				
				return new ModelAndView( FORWARD_TO_RESET_PASSWORD_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
			}
			
			httpServletRequest.setAttribute( "resetPasswordTrackingCode", resetPasswordTrackingCode );

			return new ModelAndView( FORWARD_TO_RESET_PASSWORD_LANDING_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult

		} catch ( Exception e ) {
			String msg = "Exception caught: " + e.toString();
			log.error( msg, e );
			
			String msg2 = "No Failure Page to Display Yet.";
			log.error(msg2);

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new LimelightInternalErrorException(msg2);
		}
    }

}