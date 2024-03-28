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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.AddNewUserUsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.InviteRecord_Save_UpdatePrevInvites_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ZzUserDataMirrorDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailIF;
import org.yeastrc.limelight.limelight_webapp.send_email.SendEmailItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.GenerateRandomStringForCodeIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Contains 2 Webservices
 * 
 * 	1) Project:  Invite User to Project.  New or Existing User - Path: PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER
 * 
 *  2) Resend the Invite Email	- Path: PATH_OF_SECONDARY_RESEND_INVITE_EMAIL_CONTROLLER
 *
 */
@RestController
public class Project_InviteUser_NewOrExistingUser_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_InviteUser_NewOrExistingUser_RestWebserviceController.class );

	private static final String PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER = AA_RestWSControllerPaths_Constants.PROJECT_INVITE_USER_TO_PROJECT_NEW_OR_EXISTING_USER_REST_WEBSERVICE_CONTROLLER;
	
	private static final String PATH_OF_SECONDARY_RESEND_INVITE_EMAIL_CONTROLLER = AA_RestWSControllerPaths_Constants.PROJECT_INVITE_RESEND_INVITE_EMAIL_REST_WEBSERVICE_CONTROLLER;
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	@Autowired
	private AddNewUserUsingDBTransactionServiceIF addNewUserUsingDBTransactionService;
	
	@Autowired
	private InviteRecord_Save_UpdatePrevInvites_ServiceIF inviteRecord_Save_UpdatePrevInvites_Service;
	
	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;
	
	@Autowired
	private GenerateRandomStringForCodeIF generateRandomStringForCode;
	
	@Autowired
	private SendEmailIF sendEmail;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_InviteUser_NewOrExistingUser_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	/////////////////////////////////////////////////////
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {

		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		WebserviceResult webserviceResult = new WebserviceResult();

    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
    		
    		String projectIdentifier = webserviceRequest.getProjectIdentifier();

    		Integer invitedPersonUserId = webserviceRequest.getInvitedPersonUserId();
        	String invitedPersonEmail = webserviceRequest.getInvitedPersonEmail();
        	Integer invitedPersonAccessLevel = webserviceRequest.getInvitedPersonAccessLevel();
        	
    		if ( invitedPersonEmail != null ) {
    			invitedPersonEmail = invitedPersonEmail.trim();
    		}
        	
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( invitedPersonAccessLevel == null ) {
    			log.warn( "invitedPersonAccessLevel is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( invitedPersonUserId == null ) {
    			if ( StringUtils.isEmpty( invitedPersonEmail )) {
    				log.warn( "UserInviteService: invitedPersonUserId and invitedPersonEmail both empty" );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    		}

			if ( invitedPersonAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER 
					&& invitedPersonAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_ASSISTANT_PROJECT_OWNER_AKA_RESEARCHER 
					&& invitedPersonAccessLevel != AuthAccessLevelConstants.ACCESS_LEVEL_LOGGED_IN_USER_READ_ONLY ) {
				log.warn( "UserInviteService: invitedPersonAccessLevel is invalid value: " + invitedPersonAccessLevel );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		int projectId = 0;

    		try {
    			projectId = Integer.parseInt( projectIdentifier );

    		} catch ( RuntimeException e ) {
    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			//  Restrict access to Project owners or above (admin)
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );
			
			//  Change to restrict to project owner only
			//  Was .validateAssistantProjectOwnerAllowed( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getWebSessionAuthAccessLevel();
			
			if ( ! webSessionAuthAccessLevel.isProjectOwnerAllowed() 
					&& webserviceRequest.getInvitedPersonAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_PROJECT_OWNER ) {
				//  Not authorized to add a person with ACCESS_LEVEL_PROJECT_OWNER if not project owner
				throw new Limelight_WS_AuthError_Forbidden_Exception(); //  EARLY EXIT
			}
			
			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();

			////   END Auth Check
			
			//////////////////////
			

			//   Process the request
			if ( invitedPersonUserId != null ) {
				//  process the user id

				addExistingUserToProjectUsingProjectId( 
						invitedPersonUserId, invitedPersonAccessLevel, projectId, userSession, httpServletRequest, webserviceResult );

			} else {
				//  Process the email
				UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest = new UserMgmtSearchUserDataRequest();
//				userMgmtSearchUserDataRequest.setSessionKey( sessionKey );
				userMgmtSearchUserDataRequest.setSearchString( invitedPersonEmail );
				userMgmtSearchUserDataRequest.setSearchStringExactMatch(true);
				
				UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.searchUserDataByEmail( userMgmtSearchUserDataRequest );
				
				if ( ! userMgmtSearchUserDataResponse.isSuccess() ) {
					if ( userMgmtSearchUserDataResponse.isSessionKeyNotValid() ) {
						String msg = "Session Key invalid for call to UserMgmtCentralWebappWebserviceAccess.getInstance().searchUserDataByEmail(...)";
						log.error( msg );
						throw new LimelightInternalErrorException( msg );
					}
					String msg = "call to UserMgmtCentralWebappWebserviceAccess.getInstance().searchUserDataByEmail(...) not successful, invitedPersonEmail: " + invitedPersonEmail;
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
				List<Integer> userMgmtUserIdList = userMgmtSearchUserDataResponse.getUserIdList();
				if ( userMgmtUserIdList != null && ! userMgmtUserIdList.isEmpty() ) {
					// account with this email already exists
					if ( userMgmtUserIdList.size() > 1 ) {
						//  Should not happen but throw error if it does.
						String msg = "For query of User Mgmt with email, received > 1 userMgmtUserId result.  size: " 
								+ userMgmtUserIdList.size()
								+ ", returned list: " + userMgmtUserIdList
								+ ", email address: " + invitedPersonEmail;
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}
					Integer userMgmtUserIdEntry = userMgmtUserIdList.get( 0 );
					int invitedPersonUserMgmtUserIdFromEmail = userMgmtUserIdEntry;
					
					addExistingUser_In_UserMgmt_ToProjectUsingProjectId( 
							invitedPersonUserMgmtUserIdFromEmail, invitedPersonAccessLevel, projectId, userSession, httpServletRequest, webserviceResult );
					
				} else {
					//  no account with this email exists
					inviteNewUserUsingEmail( invitedPersonEmail, httpServletRequest, 
												invitedPersonAccessLevel, userSession, projectId,
												webserviceResult );
				}
			}

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    

	/**
	 * Have existing User Mgmt user to add to this project and add to Limelight
	 * 
	 * @param invitedPerson_UserMgmtUserId_FromEmail
	 * @param invitedPersonAccessLevel
	 * @param projectId
	 * @param webserviceResult
	 * @throws Exception
	 */
	private void addExistingUser_In_UserMgmt_ToProjectUsingProjectId( 
			int invitedPerson_UserMgmtUserId_FromEmail, 
			int invitedPersonAccessLevel,
			int projectId,
			UserSession userSession,
			HttpServletRequest httpServletRequest,
			WebserviceResult webserviceResult ) throws Exception {
		
		//  Get full user data from User Mgmt
		
		UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
//		userMgmtGetUserDataRequest.setSessionKey(  );
		userMgmtGetUserDataRequest.setUserId( invitedPerson_UserMgmtUserId_FromEmail );
		
		UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
				userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
		
		if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
			String msg = "Failed to get Full user data from User Mgmt Webapp for User Mgmt user id: " + invitedPerson_UserMgmtUserId_FromEmail
					+ ", userMgmtUserId: " + invitedPerson_UserMgmtUserId_FromEmail;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}

		if ( ! userMgmtGetUserDataResponse.isEnabled() ) {
			log.warn( "AddExistingUserToProjectService:  user is disabled in User Mgmt: " + invitedPerson_UserMgmtUserId_FromEmail );
			//  TODO  Return a boolean for this
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		{  //  First check if UserMgmtUserId is on existing account in user table in limelight db
			Integer userIdFromUserMgmtUserId = userDAO.getIdForUserMgmtUserId( invitedPerson_UserMgmtUserId_FromEmail );
			if ( userIdFromUserMgmtUserId != null ) {
		
					//  Already user id 
				UserDTO userDTO = userDAO.getForId( userIdFromUserMgmtUserId );
				
				existingUser_Insert_ProjectUserDTO(
						userIdFromUserMgmtUserId, invitedPersonAccessLevel, projectId, webserviceResult, userDTO, userMgmtGetUserDataResponse, userSession, httpServletRequest );
	
				webserviceResult.addedExistingUser = true;
				
				webserviceResult.status = true;
				
				return; //  EARLY EXIT
			}
		}

		UserDTO userDTO = new UserDTO();

		// pass in user id from User Mgmt Webapp
		userDTO.setUserMgmtUserId( invitedPerson_UserMgmtUserId_FromEmail );
		
		userDTO.setEnabledAppSpecific( true );

		//  The InvitedUserAccessLevel is tied to the project so at the user level this default is used.
		userDTO.setUserAccessLevel( AuthAccessLevelConstants.ACCESS_LEVEL_DEFAULT_USER_CREATED_VIA_PROJECT_INVITE  );
		
		//  After user added to User Mgmt, add to local DB
		
		ZzUserDataMirrorDTO zzUserDataMirrorDTO = new ZzUserDataMirrorDTO();
		// zzUserDataMirrorDTO.setUserId( XXX );  UserId set later in addNewUserUsingDBTransactionService
		zzUserDataMirrorDTO.setUsername( userMgmtGetUserDataResponse.getUsername() );
		zzUserDataMirrorDTO.setEmail( userMgmtGetUserDataResponse.getEmail() );
		zzUserDataMirrorDTO.setFirstName( userMgmtGetUserDataResponse.getFirstName() );
		zzUserDataMirrorDTO.setLastName( userMgmtGetUserDataResponse.getLastName() );
		zzUserDataMirrorDTO.setOrganization( userMgmtGetUserDataResponse.getOrganization() );
		
		ProjectUserDTO projectUserDTO = new ProjectUserDTO();
		// projectUserDTO.setUserId( XXX );  UserId set later in addNewUserUsingDBTransactionService
		projectUserDTO.setProjectId( projectId );
		projectUserDTO.setAccessLevel( invitedPersonAccessLevel );

		try {
			addNewUserUsingDBTransactionService.addNewUserAddProjectUserDTO( 
					userDTO, 
					zzUserDataMirrorDTO,
					projectUserDTO );
			
		} catch ( RuntimeException e ) {
			
			String msg = "addExistingUser_In_UserMgmt_ToProjectUsingProjectId(...), Exception calling addNewUserAddProjectUserDTO(...): ";
			log.error( msg, e );
			throw e;
		} finally {
			
		}
		
		webserviceResult.addedExistingUser = true;
		
		webserviceResult.status = true;
	}
    
	/**
	 * Have existing Limelight user to add to this project
	 * 
	 * @param invitedPerson_Limelight_UserId
	 * @param invitedPersonAccessLevel
	 * @param projectId
	 * @param webserviceResult
	 * @throws Exception
	 */
	private void addExistingUserToProjectUsingProjectId( 
			int invitedPersonUserId, 
			int invitedPersonAccessLevel,
			int projectId,
			UserSession userSession,
			HttpServletRequest httpServletRequest,
			WebserviceResult webserviceResult ) throws Exception {

		//  Get User Mgmt User Id for authUserId
		Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( invitedPersonUserId );
		if ( userMgmtUserId == null ) {
			String msg = "Failed to get userMgmtUserId for Limelight user id: " + invitedPersonUserId;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		//  Get full user data
		
		UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
//		userMgmtGetUserDataRequest.setSessionKey(  );
		userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
		
		UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
				userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
		
		if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
			String msg = "Failed to get Full user data from User Mgmt Webapp for Limelight user id: " + invitedPersonUserId
					+ ", userMgmtUserId: " + userMgmtUserId;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}

		if ( ! userMgmtGetUserDataResponse.isEnabled() ) {
			log.warn( "AddExistingUserToProjectService:  user is disabled: " + invitedPersonUserId );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		UserDTO userDTO = userDAO.getForId( invitedPersonUserId );
		
		existingUser_Insert_ProjectUserDTO(invitedPersonUserId, invitedPersonAccessLevel, projectId, webserviceResult, userDTO, userMgmtGetUserDataResponse, userSession, httpServletRequest );
	}

	/**
	 * Existing User: Insert ProjectUserDTO to give user access to this project
	 * 
	 * @param invitedPersonUserId
	 * @param invitedPersonAccessLevel
	 * @param projectId
	 * @param webserviceResult
	 * @param userDTO
	 * @throws SQLException
	 * @throws Exception
	 */
	private void existingUser_Insert_ProjectUserDTO(
			
			int invitedPersonUserId, 
			int invitedPersonAccessLevel, 
			int projectId,
			WebserviceResult webserviceResult, 
			UserDTO userDTO,
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse,
			UserSession userSession,
			HttpServletRequest httpServletRequest ) throws SQLException, Exception {
		
		Integer userAccessLevel = userDTO.getUserAccessLevel();
		
		if ( userAccessLevel != null && userAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL_NONE ) {
			log.warn( "AddExistingUserToProjectService:  user is global acess level none: " + invitedPersonUserId );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		ProjectUserDTO projectUserDTO = new ProjectUserDTO();
		projectUserDTO.setProjectId( projectId );
		projectUserDTO.setUserId( invitedPersonUserId );
		projectUserDTO.setAccessLevel( invitedPersonAccessLevel );

		try {

			//  TODO  For Now, skipping adding user to this application DB that is only in Central User Mgmt DB
			
//			existingUserThatWasAdded.setFirstName( userMgmtGetUserDataResponse.getFirstName() );
//			existingUserThatWasAdded.setLastName( userMgmtGetUserDataResponse.getLastName() );
//			existingUserThatWasAdded.setOrganization( userMgmtGetUserDataResponse.getOrganization() );
			
			projectUserDAO.save( projectUserDTO );

			//  Generate email to existing user to inform them they are added to this project
			// Generate and send the email to the user.
			try {
				//  All Exceptions and Throwable will be eaten and not re-thrown
				
				ProjectDTO projectDTO_Title = projectDAO.get_Title_ProjectLocked_ForId(projectId);
				
				if ( projectDTO_Title == null ) {
					String msg = "projectDAO.get_Title_ProjectLocked_ForId(projectId); return null for projectId: " + projectId;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				
				String projectTitle = projectDTO_Title.getTitle();
				
				SendEmailItem sendEmailItem = createAddExistingAcctToProjectMailMessageToSend( projectId, projectTitle, userMgmtGetUserDataResponse, userSession, httpServletRequest );
				
				if ( log.isInfoEnabled() ) {
					log.info( "after call createAddExistingAcctToProjectMailMessageToSend: About to call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
				
				sendEmail.sendEmail( sendEmailItem );
				
				if ( log.isInfoEnabled() ) {
					log.info( "Afer call createAddExistingAcctToProjectMailMessageToSend: After call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
				
				webserviceResult.setStatus(true);
				webserviceResult.setEmailSent(true);
				
			} catch (LimelightWebappConfigException e) {

				log.warn( "Add existing user to a project: existingUser_Insert_ProjectUserDTO: No email sent since not configured to send email" );

				//  EAT/Swallow any Exception
				
			} catch (Throwable e) {
				
				log.error( "Add existing user to a project: existingUser_Insert_ProjectUserDTO: Exception: userEmail: " + userMgmtGetUserDataResponse.getEmail(), e );
				
				//  EAT/Swallow any Exception or Throwable
			}
			
			webserviceResult.setStatus(true);
			webserviceResult.setAddedExistingUser(true);
			
//			webserviceResult.setExistingUserThatWasAdded( existingUserThatWasAdded );
			
		} catch ( org.springframework.dao.DuplicateKeyException e ) {

			//  Spring JDBCTemplate Exception for Duplicate Key
			
			ProjectUserDTO existingProjectUserDTO = projectUserDAO.getForProjectIdUserId( projectId, invitedPersonUserId );
			if ( existingProjectUserDTO != null ) {
				webserviceResult.setDuplicateInsertError(true);
			}
			
		} catch ( Exception sqlException ) {
			String exceptionMessage = sqlException.getMessage();
			
			if ( exceptionMessage != null && exceptionMessage.startsWith( "Duplicate entry" ) ) {
				
				ProjectUserDTO existingProjectUserDTO = projectUserDAO.getForProjectIdUserId( projectId, invitedPersonUserId );
				if ( existingProjectUserDTO != null ) {
					webserviceResult.setDuplicateInsertError(true);
				}
			} else {
				throw sqlException;
			}
		}
	}


	/**
	 * @param userInviteTrackingDTO
	 * @param userDatabaseRecord
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	private SendEmailItem createAddExistingAcctToProjectMailMessageToSend(
			int projectId,
			String projectTitle,
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse,
			UserSession userSession, 
			HttpServletRequest httpServletRequest )
	throws Exception {
		
		//  Create the URl (to the Page controller for processing the invite) to add to the email sent for the invite.
		
		//  Get base path to Page controller for processing the invite.
		String requestURL = httpServletRequest.getRequestURL().toString();
		
		int controllerStartInURL_Index = requestURL.indexOf( PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER );

		if ( controllerStartInURL_Index == -1 ) {

			//  Main controller path not found, search for secondary path
			
			controllerStartInURL_Index = requestURL.indexOf( PATH_OF_SECONDARY_RESEND_INVITE_EMAIL_CONTROLLER );
			
			if ( controllerStartInURL_Index == -1 ) {
				String msg = "Failed to find path of current controller in request URL.  request URL: " + requestURL
						+ ", path of current page controller: " + PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
		}
		
		String baseURL = requestURL.substring( 0, controllerStartInURL_Index );

		//  Create URL to Page controller for project.
		String projectURL = baseURL + AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER
				+ "/" + projectId;
		
		String atOrgText = "";
		
		if ( StringUtils.isNotEmpty( userSession.getOrganization() ) ) {
			atOrgText = " at "
					+ userSession.getOrganization();
		}
		
		// set the email message body
		String text = 
				"You have been added to the project '" 
						+ projectTitle 
						+ "' in the limelight web application  by "
						+ userSession.getFirstName()
						+ " "
						+ userSession.getLastName()
						+ atOrgText
						+ ".\n\n"
						+ "To view the project, follow this link: " + projectURL 
						+ "\n\n"
						+ "Thank you\n\nlimelight";
		
		String fromEmailAddress = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );

		if ( StringUtils.isEmpty( fromEmailAddress ) ) {
			
			String msg = "Cannot send email: No entry in config table for key '" + ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY
					+ "'.";
			log.error(msg);
			throw new LimelightWebappConfigException( msg );
		}
		
		String toEmailAddress = userMgmtGetUserDataResponse.getEmail();
		String emailSubject = "Added to project in limelight webapp"; 
		String emailBody = text;
		
		SendEmailItem sendEmailItem = new SendEmailItem();
		sendEmailItem.setFromEmailAddress( fromEmailAddress );
		sendEmailItem.setToEmailAddress( toEmailAddress );
		sendEmailItem.setEmailSubject( emailSubject );
		sendEmailItem.setEmailBody( emailBody );
		
		return sendEmailItem;
	}
	
	
	
	//////////
	//////////
	
	/**
	 * @param invitedPersonEmail
	 * @param request
	 * @param invitedPersonAccessLevel
	 * @param userSession
	 * @param projectId
	 * @throws Exception
	 */
	private void inviteNewUserUsingEmail( 
			String invitedPersonEmail,
			HttpServletRequest request, 
			int invitedPersonAccessLevel,
			UserSession userSession,
			Integer projectId,
			WebserviceResult webserviceResult ) throws Exception {
		
//		throw new LimelightInternalErrorException( "Currently NOT supporting inviteNewUserUsingEmail(...)" );
		
		UserInviteTrackingDTO userInviteTrackingDTO = new UserInviteTrackingDTO();
		userInviteTrackingDTO.setInvitedUserAccessLevel( invitedPersonAccessLevel);
		userInviteTrackingDTO.setInvitedUserEmail( invitedPersonEmail );
		userInviteTrackingDTO.setSubmitIP( request.getRemoteAddr() );
		if ( projectId != null ) {
			userInviteTrackingDTO.setInvitedProjectId( projectId );
		}
		Integer userId = userSession.getUserId();
		if ( userId == null ) {
			throw new LimelightInternalErrorException( "userSession.getUserId() cannot be null in inviteNewUserUsingEmail(...) ");
		}
		userInviteTrackingDTO.setSubmittingUserId( userId );

		String inviteTrackingCode = generateRandomStringForCode.generateRandomStringForCode();
		userInviteTrackingDTO.setInviteTrackingCode( inviteTrackingCode );
		
		inviteRecord_Save_UpdatePrevInvites_Service.inviteRecord_Save_UpdatePrevInvites_Service( userInviteTrackingDTO );

		//  Generate email with invite code
		// Generate and send the email to the user.
		try {
			SendEmailItem sendEmailItem = createInviteToAppToCreateAcctMailMessageToSend( userInviteTrackingDTO, userSession, request );
			
			if ( log.isInfoEnabled() ) {
				log.info( "About to call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
			}
			
			sendEmail.sendEmail( sendEmailItem );
			
			if ( log.isInfoEnabled() ) {
				log.info( "After call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
			}
			
			webserviceResult.setStatus(true);
			webserviceResult.setEmailSent(true);
		}
		catch (Exception e) {
			log.error( "UserInviteService: Exception: invitedPersonEmail: " + invitedPersonEmail, e );
			
			
			//  TODO   TEMP COMMENTED OUT
			
			
			
			//  removeInvite( userInviteTrackingDTO );
			
			
			webserviceResult.setUnableToSendEmailError(true);
		}
	}
	
	/**
	 * @param userInviteTrackingDTO
	 */
	private void removeInvite( UserInviteTrackingDTO userInviteTrackingDTO ) {
		if ( userInviteTrackingDTO.getId() != 0 ) {
			try {
				userInviteTrackingDAO.delete( userInviteTrackingDTO.getId() );
			} catch ( Exception e ) {
				log.warn( "Failed to remove invite for id: " + userInviteTrackingDTO.getId(), e );
			}
		}
	}
	
	/**
	 * @param userInviteTrackingDTO
	 * @param userDatabaseRecord
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	private SendEmailItem createInviteToAppToCreateAcctMailMessageToSend( 
			UserInviteTrackingDTO userInviteTrackingDTO, UserSession userSession, HttpServletRequest httpServletRequest )
	throws Exception {
		
		//  Create the URl (to the Page controller for processing the invite) to add to the email sent for the invite.
		
		//  Get base path to Page controller for processing the invite.
		String requestURL = httpServletRequest.getRequestURL().toString();
		
		int controllerStartInURL_Index = requestURL.indexOf( PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER );

		if ( controllerStartInURL_Index == -1 ) {

			//  Main controller path not found, search for secondary path
			
			controllerStartInURL_Index = requestURL.indexOf( PATH_OF_SECONDARY_RESEND_INVITE_EMAIL_CONTROLLER );
			
			if ( controllerStartInURL_Index == -1 ) {
				String msg = "Failed to find path of current controller in request URL.  request URL: " + requestURL
						+ ", path of current page controller: " + PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
		}
		
		String baseURL = requestURL.substring( 0, controllerStartInURL_Index );

		//  Create URL to Page controller for processing the invite.
		String inviteURL = baseURL + AA_UserAccount_PageControllerPaths_Constants.INVITE_PROCESS_CODE_PAGE_CONTROLLER
				+ "/" + userInviteTrackingDTO.getInviteTrackingCode();
		
		String atOrgText = "";
		
		if ( StringUtils.isNotEmpty( userSession.getOrganization() ) ) {
			atOrgText = " at "
					+ userSession.getOrganization();
		}
		
		// set the email message body
		String text = 
				"You have been invited to the limelight web application by "
				+ userSession.getFirstName()
				+ " "
				+ userSession.getLastName()
				+ atOrgText
				+ ".\n\n"
				+ "To create an account follow this link: " + inviteURL 
				+ "\n\n"
				+ "Thank you\n\nlimelight";
		
		String fromEmailAddress = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );

		if ( StringUtils.isEmpty( fromEmailAddress ) ) {
			
			String msg = "Cannot send email: No entry in config table for key '" + ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY
					+ "'.";
			log.error(msg);
			throw new LimelightWebappConfigException( msg );
		}
		
		String toEmailAddress = userInviteTrackingDTO.getInvitedUserEmail();
		String emailSubject = "Invite Email For limelight Webapp"; 
		String emailBody = text;
		
		SendEmailItem sendEmailItem = new SendEmailItem();
		sendEmailItem.setFromEmailAddress( fromEmailAddress );
		sendEmailItem.setToEmailAddress( toEmailAddress );
		sendEmailItem.setEmailSubject( emailSubject );
		sendEmailItem.setEmailBody( emailBody );
		
		return sendEmailItem;
	}
	
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	//   Not Currently Used

//	/**
//	 * @param userInviteTrackingDTO
//	 * @param userDatabaseRecord
//	 * @param request
//	 * @return
//	 * @throws Exception 
//	 */
//	private SendEmailItem createInviteToAppToViewProjectMailMessageToSend( 
//			int projectId, String invitedPersonEmail, UserSession userSession, HttpServletRequest httpServletRequest )
//	throws Exception {
//		
//		//  Create the URl (to the Page controller for processing the invite) to add to the email sent for the invite.
//		
//		//  Get base path to Page controller for processing the invite.
//		String requestURL = httpServletRequest.getRequestURL().toString();
//		
//		int controllerStartInURL_Index = requestURL.indexOf( PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER );
//		
//		if ( controllerStartInURL_Index == -1 ) {
//			String msg = "Failed to find path of current controller in request URL.  request URL: " + requestURL
//					+ ", path of current page controller: " + PATH_OF_MAIN_PROCESS_INVITE_REQUEST_CONTROLLER;
//			log.error( msg );
//			throw new LimelightInternalErrorException(msg);
//		}
//		
//		String baseURL = requestURL.substring( 0, controllerStartInURL_Index );
//
//		//  Create URL to Page controller for processing the invite.
//		String projectURL = baseURL + AA_PageControllerPaths_Constants.PROJECT_VIEW_PAGE_CONTROLLER
//				+ "/" + projectId;
//		
//		String atOrgText = "";
//		
//		if ( StringUtils.isNotEmpty( userSession.getOrganization() ) ) {
//			atOrgText = " at "
//					+ userSession.getOrganization();
//		}
//		
//		// set the email message body
//		String text = 
//				"You have been added to the project in the limelight web application by "
//				+ userSession.getFirstName()
//				+ " "
//				+ userSession.getLastName()
//				+ atOrgText
//				+ ".\n\n"
////				+ "The project is: " +
////				+ ".\n\n"
//				+ "To view the project follow this link: " + projectURL 
//				+ "\n\n"
//				+ "Thank you\n\nlimelight";
//		
//		String fromEmailAddress = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY );
//
//		if ( StringUtils.isEmpty( fromEmailAddress ) ) {
//			
//			String msg = "Cannot send email: No entry in config table for key '" + ConfigSystemsKeysConstants.EMAIL_FROM_ADDRESS_KEY
//					+ "'.";
//			log.error(msg);
//			throw new LimelightWebappConfigException( msg );
//		}
//		
//		String toEmailAddress = invitedPersonEmail;
//		String emailSubject = "Welcome To limelight Webapp project"; 
//		String emailBody = text;
//		SendEmailItem sendEmailItem = new SendEmailItem();
//		sendEmailItem.setFromEmailAddress( fromEmailAddress );
//		sendEmailItem.setToEmailAddress( toEmailAddress );
//		sendEmailItem.setEmailSubject( emailSubject );
//		sendEmailItem.setEmailBody( emailBody );
//		
//		return sendEmailItem;
//	}
	
	//////////////////////////////////////////////////////////////////////
	
	//////    Secondary Webservice to resend Email
	

	/////////////////////////////////////////////////////
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ PATH_OF_SECONDARY_RESEND_INVITE_EMAIL_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  resendEmail_webserviceMethod(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {

		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		WebserviceResult_ResendEmail webserviceResult_ResendEmail = new WebserviceResult_ResendEmail();

    	try {
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest_ResendEmail webserviceRequest_ResendEmail = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest_ResendEmail.class );
    		
    		Integer inviteId = webserviceRequest_ResendEmail.getInviteId();
    		
    		if ( inviteId == null ) {
    			log.warn( "inviteId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		UserInviteTrackingDTO userInviteTrackingDTO = userInviteTrackingDAO.getForInviteTrackingId( inviteId );
    		if ( userInviteTrackingDTO == null ) {
    			log.warn( "inviteId is not found" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = userInviteTrackingDTO.getInvitedProjectId();
    		
    		if ( projectId == null ) {
    			String msg = "Resend Email Not currently supported for Invites without a Project Id";
    			log.error( msg );
    			throw new LimelightInternalErrorException( msg );
    		}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			//  Restrict access to Project owners or above (admin)
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
			
			////   END Auth Check
			
			//////////////////////
			

			//  Generate email with invite code
			// Generate and send the email to the user.
			try {
				SendEmailItem sendEmailItem = createInviteToAppToCreateAcctMailMessageToSend( userInviteTrackingDTO, userSession, httpServletRequest );
				
				if ( log.isInfoEnabled() ) {
					log.info( "About to call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
				
				sendEmail.sendEmail( sendEmailItem );
				
				if ( log.isInfoEnabled() ) {
					log.info( "After call sendEmail.sendEmail() sendEmailItem: " + sendEmailItem );
				}
				
				webserviceResult_ResendEmail.setStatus(true);
			}
			catch (Exception e) {
				log.error( "resendEmail_webserviceMethod(...): Exception: inviteId: " + inviteId, e );
				throw e;
			}
			
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult_ResendEmail );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }

    //   Webservice Request and Response for Main Webservice
    
    /**
     * 
     *
     */
    public static class WebserviceRequest_ResendEmail {
    	
    	private Integer inviteId;

		public Integer getInviteId() {
			return inviteId;
		}
		public void setInviteId(Integer inviteId) {
			this.inviteId = inviteId;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_ResendEmail {
    	
		private boolean status;

		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
    }
	
	//////////////////////////////////////////////////////////////////////

    //   Webservice Request and Response for Main Webservice
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {
    	
    	private String projectIdentifier;
    	
    	private Integer invitedPersonUserId;
    	private String invitedPersonEmail;
    	private Integer invitedPersonAccessLevel;
    	
		public String getProjectIdentifier() {
			return projectIdentifier;
		}
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public Integer getInvitedPersonUserId() {
			return invitedPersonUserId;
		}
		public void setInvitedPersonUserId(Integer invitedPersonUserId) {
			this.invitedPersonUserId = invitedPersonUserId;
		}
		public String getInvitedPersonEmail() {
			return invitedPersonEmail;
		}
		public void setInvitedPersonEmail(String invitedPersonEmail) {
			this.invitedPersonEmail = invitedPersonEmail;
		}
		public Integer getInvitedPersonAccessLevel() {
			return invitedPersonAccessLevel;
		}
		public void setInvitedPersonAccessLevel(Integer invitedPersonAccessLevel) {
			this.invitedPersonAccessLevel = invitedPersonAccessLevel;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {

    	private boolean status;
    	
    	private boolean addedExistingUser;
    	private boolean lastNameNotFoundError;
    	private boolean lastNameDuplicateError;
    	
    	//  For invite from Manage Users page ( no project id sent )
    	private boolean emailAddressDuplicateError;

    	private boolean duplicateInsertError;
    	
    	private boolean emailAddressInvalidSendError;
    	
    	private boolean emailSent;
    	
    	private boolean unableToSendEmailError;
    	
//    	private UserDTO existingUserThatWasAdded;

    	
		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public boolean isAddedExistingUser() {
			return addedExistingUser;
		}
		public void setAddedExistingUser(boolean addedExistingUser) {
			this.addedExistingUser = addedExistingUser;
		}
		public boolean isLastNameNotFoundError() {
			return lastNameNotFoundError;
		}
		public void setLastNameNotFoundError(boolean lastNameNotFoundError) {
			this.lastNameNotFoundError = lastNameNotFoundError;
		}
		public boolean isLastNameDuplicateError() {
			return lastNameDuplicateError;
		}
		public void setLastNameDuplicateError(boolean lastNameDuplicateError) {
			this.lastNameDuplicateError = lastNameDuplicateError;
		}
		public boolean isEmailAddressDuplicateError() {
			return emailAddressDuplicateError;
		}
		public void setEmailAddressDuplicateError(boolean emailAddressDuplicateError) {
			this.emailAddressDuplicateError = emailAddressDuplicateError;
		}
		public boolean isDuplicateInsertError() {
			return duplicateInsertError;
		}
		public void setDuplicateInsertError(boolean duplicateInsertError) {
			this.duplicateInsertError = duplicateInsertError;
		}
		public boolean isEmailAddressInvalidSendError() {
			return emailAddressInvalidSendError;
		}
		public void setEmailAddressInvalidSendError(boolean emailAddressInvalidSendError) {
			this.emailAddressInvalidSendError = emailAddressInvalidSendError;
		}
		public boolean isEmailSent() {
			return emailSent;
		}
		public void setEmailSent(boolean emailSent) {
			this.emailSent = emailSent;
		}
		public boolean isUnableToSendEmailError() {
			return unableToSendEmailError;
		}
		public void setUnableToSendEmailError(boolean unableToSendEmailError) {
			this.unableToSendEmailError = unableToSendEmailError;
		}

    }

}


