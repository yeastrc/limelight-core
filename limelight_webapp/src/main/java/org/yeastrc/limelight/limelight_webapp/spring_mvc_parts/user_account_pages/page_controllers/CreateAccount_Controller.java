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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.constants.UserSignupConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.TermsOfServiceTextVersionsDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceTextVersionsDTO;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.services.TermsOfServiceText_ConvertForDisplay_Service;
import org.yeastrc.limelight.limelight_webapp.web_utils.IsTermsOfServiceEnabled_IF;

@Controller
//@RequestMapping("/")
public class CreateAccount_Controller {

	private static final Logger log = LoggerFactory.getLogger( CreateAccount_Controller.class );

	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.CREATE_ACCOUNT_PAGE_CONTROLLER;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired
	private IsTermsOfServiceEnabled_IF isTermsOfServiceEnabled;
	
	@Autowired
	private TermsOfServiceTextVersionsDAO_IF termsOfServiceTextVersionsDAO;

	@Autowired
	private TermsOfServiceText_ConvertForDisplay_Service termsOfServiceText_ConvertForDisplay_Service;
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public CreateAccount_Controller() {
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

			if ( ! UserSignupConstants.USER_SIGNUP_ALLOW_WITHOUT_INVITE_KEY__TRUE.equals( userSignupAllowWithoutInviteConfigValue ) ) {
				
				log.warn("Controller path for User signup accessed but User signup without invite key not set in congiguration.  redirecting to error page.");

				throw new CreateAccountNotAllowedWithoutInvite_Exception(); //  TODO forward to error page
			}

			String google_RecaptchaSiteKey =
					configSystemDAO.getConfigValueForConfigKey(
							ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SITE_KEY_KEY );

			String google_RecaptchaSecretKey =
					configSystemDAO.getConfigValueForConfigKey(
							ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SECRET_KEY_KEY );

			if ( StringUtils.isNotBlank(google_RecaptchaSiteKey) && StringUtils.isNotBlank(google_RecaptchaSecretKey)) {
				
				httpServletRequest.setAttribute( "google_RecaptchaSiteKey", google_RecaptchaSiteKey );
			}
			
			if ( isTermsOfServiceEnabled.isTermsOfServiceEnabled() ) {

				TermsOfServiceTextVersionsDTO termsOfServiceTextVersionsDTO = termsOfServiceTextVersionsDAO.getLatest();

				if ( termsOfServiceTextVersionsDTO != null ) {

					httpServletRequest.setAttribute( "termsOfServiceTextVersion", termsOfServiceTextVersionsDTO );
				
					String termsOfServiceText = 
							termsOfServiceText_ConvertForDisplay_Service
							.termsOfServiceText_ConvertForDisplay_ExceptConfigurationPage( termsOfServiceTextVersionsDTO.getTermsOfServiceText() );
					
					httpServletRequest.setAttribute( "termsOfServiceText", termsOfServiceText );
				
					String termsOfServiceKey = termsOfServiceTextVersionsDTO.getIdString();
							
					httpServletRequest.setAttribute( "termsOfServiceKey", termsOfServiceKey );
				} else {
					log.error("Terms of Service Enabled but No Terms of Service Latest ");
				}
			}
			
			return "user_account_pages_and_parts/pages/createAccount_NoInvite.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			
		} catch ( CreateAccountNotAllowedWithoutInvite_Exception e ) {
			
			throw e;

		} catch ( Throwable t ) {

			log.error( "Exceptioin: ", t );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();

			throw new RuntimeException( t ); //  TODO forward to error page
		}
    }
	
	/**
	 * 
	 *
	 */
	private static class CreateAccountNotAllowedWithoutInvite_Exception extends RuntimeException {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		/**
		 * 
		 */
		public CreateAccountNotAllowedWithoutInvite_Exception() {
			super();
			// TODO Auto-generated constructor stub
		}

		/**
		 * @param arg0
		 * @param arg1
		 * @param arg2
		 * @param arg3
		 */
		public CreateAccountNotAllowedWithoutInvite_Exception(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
			super(arg0, arg1, arg2, arg3);
			// TODO Auto-generated constructor stub
		}

		/**
		 * @param arg0
		 * @param arg1
		 */
		public CreateAccountNotAllowedWithoutInvite_Exception(String arg0, Throwable arg1) {
			super(arg0, arg1);
			// TODO Auto-generated constructor stub
		}

		/**
		 * @param arg0
		 */
		public CreateAccountNotAllowedWithoutInvite_Exception(String arg0) {
			super(arg0);
			// TODO Auto-generated constructor stub
		}

		/**
		 * @param arg0
		 */
		public CreateAccountNotAllowedWithoutInvite_Exception(Throwable arg0) {
			super(arg0);
			// TODO Auto-generated constructor stub
		}
		
	}

}