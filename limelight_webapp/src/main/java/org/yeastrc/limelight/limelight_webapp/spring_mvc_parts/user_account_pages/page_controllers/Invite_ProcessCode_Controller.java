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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.AddOrUpdateProjectAccessExistingUserUsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCodeIF;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCode.ValidateUserInviteTrackingCodeResult;
import org.yeastrc.limelight.limelight_webapp.user_invite.ValidateUserInviteTrackingCode.ValidateUserInviteTrackingCodeResult_NotValidReason;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Path for THIS controller:  In static: PRIMARY_CONTROLLER_PATH
 *
 */
@Controller
//@RequestMapping("/")
public class Invite_ProcessCode_Controller {


	private static final Logger log = LoggerFactory.getLogger( Invite_ProcessCode_Controller.class );


	/**
	 * Path Parameter.  
	 */
	private static final String PATH_PARAMETER_LABEL_INVITE_PROCESS_CODE = "inviteProcessCode";

	/**
	 * Spring MVC format for path parameter
	 */
	private static final String PATH_PARAMETER_LABEL_INVITE_PROCESS_CODE_PATH_ADDITION =
			"{" + PATH_PARAMETER_LABEL_INVITE_PROCESS_CODE + "}";

	/**
	 * Path for THIS controller
	 */
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_UserAccount_PageControllerPaths_Constants.INVITE_PROCESS_CODE_PAGE_CONTROLLER
			+ "/" + PATH_PARAMETER_LABEL_INVITE_PROCESS_CODE_PATH_ADDITION;
	
	/**
	 * Redirect To Project List
	 */
	private static final String REDIRECT_TO_PROJECT_LIST = 
			"redirect:" 
					+ AA_PageControllerPaths_Constants.PATH_START_ALL
					//  PATH_START_ALL by itself currently displays projects list
					//  + AA_PageControllerPaths_Constants.PROJECTS_LIST_PAGE_CONTROLLER
					;

	//  Forward to the Invite Landing Page page
	private static final String FORWARD_TO_INVITE_LANDING_PAGE =
			"user_account_pages_and_parts/pages/inviteLandingPage.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	//  Forward to the Invite Error Page page
	private static final String FORWARD_TO_INVITE_ERROR_PAGE =
			"user_account_pages_and_parts/pages/inviteErrorPage.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	@Autowired
	private ValidateUserInviteTrackingCodeIF validateUserInviteTrackingCode;

	@Autowired
	private AccessControl_GetUserSession_RefreshAccessEnabled_IF accessControl_GetUserSession_RefreshAccessEnabled;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectUserDAO_IF projectUserDAO;

	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;

	@Autowired
	private AddOrUpdateProjectAccessExistingUserUsingDBTransactionServiceIF addOrUpdateProjectAccessExistingUserUsingDBTransactionService;

	/**
	 * 
	 */
	public Invite_ProcessCode_Controller() {
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
			@PathVariable( value = PATH_PARAMETER_LABEL_INVITE_PROCESS_CODE ) 
			String inviteTrackingCode,
			RedirectAttributes attributes,
			HttpServletRequest httpServletRequest ) {

		//		log.warn( "controllerMethod(...) called" );

		log.info( "controllerMethod(...) called" );
		
		try {
			String userIP = httpServletRequest.getRemoteAddr();

			ValidateUserInviteTrackingCodeResult validateUserInviteTrackingCodeResult = 
					validateUserInviteTrackingCode.validateUserInviteTrackingCode( inviteTrackingCode );

			if ( ! validateUserInviteTrackingCodeResult.isCodeIsValid() ) {
				log.warn( "Validation code is invalid.  Forward to error page.  validateUserInviteTrackingCodeResult:" + validateUserInviteTrackingCodeResult );
				ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = validateUserInviteTrackingCodeResult.getNotValidReason();
				httpServletRequest.setAttribute( "notValidReason", notValidReason );
				return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
			}

			UserInviteTrackingDTO userInviteTrackingDTO =  validateUserInviteTrackingCodeResult.getUserInviteTrackingDTO();
			userInviteTrackingDTO.setUseIP( userIP );

			UserSession userSession = accessControl_GetUserSession_RefreshAccessEnabled.getUserSession_RefreshAccessEnabled( httpServletRequest );

			if ( userSession != null && ( userSession.isActualUser() ) ) {
				//  Actual user logged in
				if ( userInviteTrackingDTO.getInvitedProjectId() != null ) {
					//  Logged in And a Project Id
					//  update access for this user for this project

					ProjectDTO projectDTOMarkedForDeletionEnabledCheck = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( userInviteTrackingDTO.getInvitedProjectId() );
					if ( projectDTOMarkedForDeletionEnabledCheck == null ) {
						log.warn( "Invite Project Record not found for id not Found.  Forward to error page. userInviteTrackingDTO.getInvitedProjectId(): " 
								+ userInviteTrackingDTO.getInvitedProjectId()
								+ ", validateUserInviteTrackingCodeResult:" 
								+ validateUserInviteTrackingCodeResult );
						ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
						notValidReason.setProjectNotExist(true);
						httpServletRequest.setAttribute( "notValidReason", notValidReason );
						return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
					}
					
					if ( projectDTOMarkedForDeletionEnabledCheck.isMarkedForDeletion()
							|| ( ! projectDTOMarkedForDeletionEnabledCheck.isEnabled() ) ) {
						
						log.error( "Invite Project Record is marked for deletion or is not enabled.   No forward page yet.  userInviteTrackingDTO.getInvitedProjectId(): " 
								+ userInviteTrackingDTO.getInvitedProjectId()
								+ ", validateUserInviteTrackingCodeResult:" 
								+ validateUserInviteTrackingCodeResult );
						ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
						notValidReason.setProjectNotExist(true);
						httpServletRequest.setAttribute( "notValidReason", notValidReason );
						return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
					}
					
					ProjectUserDTO projectUserDTO = new ProjectUserDTO();
					projectUserDTO.setUserId( userSession.getUserId() );
					projectUserDTO.setProjectId( userInviteTrackingDTO.getInvitedProjectId() );
					projectUserDTO.setAccessLevel( userInviteTrackingDTO.getInvitedUserAccessLevel() );

					try {
						addOrUpdateProjectAccessExistingUserUsingDBTransactionService
						.updateUserAddProjectUsersDTO( projectUserDTO, userInviteTrackingDTO );

					} catch ( org.springframework.dao.DuplicateKeyException e ) {

						ProjectUserDTO existingProjectUserDTO =
								projectUserDAO.getForProjectIdUserId( userInviteTrackingDTO.getInvitedProjectId(), userSession.getUserId() );

						if ( existingProjectUserDTO != null ) {
							if ( userInviteTrackingDTO.getInvitedUserAccessLevel()  < existingProjectUserDTO.getAccessLevel() ) {
								//  New invite has better access level so update the access level
								addOrUpdateProjectAccessExistingUserUsingDBTransactionService
								.updateUserUpdateUserAccessLevel( projectUserDTO , userInviteTrackingDTO );

							} else {
								//  User already has access to this project.  Mark invite complete
								String msg = "User already has access to this project.  Mark invite complete: authUserInviteTrackingDTO.getId(): " + userInviteTrackingDTO.getId();
								log.warn( msg );
								int authUserIdUsingInvite = userSession.getUserId();
								userInviteTrackingDAO.updateUsedInviteFields( userInviteTrackingDTO.getId(), authUserIdUsingInvite, userIP );
							}
						}

						//  Duplicate handled so continue processing
					}

					//  Redirect To Project List
					return new ModelAndView( REDIRECT_TO_PROJECT_LIST );

				} else {
					//   Logged in and NO Project Id

					//  Do Nothing
					//  User already has access to this app.  Mark invite complete
					String msg = "User already has access to this App.  Mark invite complete: userInviteTrackingDTO.getId(): " + userInviteTrackingDTO.getId();
					log.warn( msg );
					int userIdUsingInvite = userSession.getUserId();
					userInviteTrackingDAO.updateUsedInviteFields( userInviteTrackingDTO.getId(), userIdUsingInvite, userIP );

					//  Redirect To Project List
					return new ModelAndView( REDIRECT_TO_PROJECT_LIST );
				}
			}   

			httpServletRequest.setAttribute( "inviteCode", inviteTrackingCode );

			//  Not Logged In
			if ( userInviteTrackingDTO.getInvitedProjectId() != null ) {
				//  Not logged in and processing a project id

				
				ProjectDTO projectDTOMarkedForDeletionEnabledCheck = projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( userInviteTrackingDTO.getInvitedProjectId() );
				if ( projectDTOMarkedForDeletionEnabledCheck == null ) {
					log.error( "Invite Project Record not found for id not Found. Forward to error page. userInviteTrackingDTO.getInvitedProjectId(): " 
							+ userInviteTrackingDTO.getInvitedProjectId()
							+ ", validateUserInviteTrackingCodeResult:" 
							+ validateUserInviteTrackingCodeResult );
					ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
					notValidReason.setProjectNotExist(true);
					httpServletRequest.setAttribute( "notValidReason", notValidReason );
					return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
				}
				
				if ( projectDTOMarkedForDeletionEnabledCheck.isMarkedForDeletion()
						|| ( ! projectDTOMarkedForDeletionEnabledCheck.isEnabled() ) ) {
					
					log.error( "Invite Project Record is marked for deletion or is not enabled. Forward to error page.  userInviteTrackingDTO.getInvitedProjectId(): " 
							+ userInviteTrackingDTO.getInvitedProjectId()
							+ ", validateUserInviteTrackingCodeResult:" 
							+ validateUserInviteTrackingCodeResult );
					ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
					notValidReason.setProjectNotExist(true);
					httpServletRequest.setAttribute( "notValidReason", notValidReason );
					return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
				}

				ProjectDTO projectDTO_Title = projectDAO.get_Title_ProjectLocked_ForId( userInviteTrackingDTO.getInvitedProjectId() );
				if ( projectDTO_Title == null ) {
					log.error( "Invite Project Record not found for id not Found. Forward to error page.  validateUserInviteTrackingCodeResult:" + validateUserInviteTrackingCodeResult );
					ValidateUserInviteTrackingCodeResult_NotValidReason notValidReason = new ValidateUserInviteTrackingCodeResult_NotValidReason();
					notValidReason.setProjectNotExist(true);
					httpServletRequest.setAttribute( "notValidReason", notValidReason );
					return new ModelAndView( FORWARD_TO_INVITE_ERROR_PAGE );  // forward to JSP to display error message for boolean in validateUserInviteTrackingCodeResult
				}
				
				httpServletRequest.setAttribute( "inviteProjectId", userInviteTrackingDTO.getInvitedProjectId() );
				httpServletRequest.setAttribute( "inviteProjectTitle", projectDTO_Title.getTitle() );

				//  Forward to the Invite Landing Page
				return new ModelAndView( FORWARD_TO_INVITE_LANDING_PAGE );  // forward to Page Controller
			}
			
			
			//  TODO  Handle this:
			
			//   Not Logged in and No project Id 

			{

				String msg2 = "Not Handling 'add new user with this invite code.  Will add user with access to no project id.'";
				log.error(msg2);
				
				throw new LimelightInternalErrorException(msg2);
			}
			
			//  Forward to add new user with this invite code.  Will add user with access to no project id.
//			return mapping.findForward("AddNewUser");


		} catch ( Exception e ) {
			String msg = "Exception caught: " + e.toString();
			log.error( msg, e );
			
			String msg2 = "No Failure Page to Display Yet.";
			log.error(msg2);
			
			throw new LimelightInternalErrorException(msg2);
		}
	}

}