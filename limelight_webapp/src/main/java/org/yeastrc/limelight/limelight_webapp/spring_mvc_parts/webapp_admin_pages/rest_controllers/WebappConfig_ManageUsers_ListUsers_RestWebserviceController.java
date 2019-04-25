/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.webapp_admin_pages.rest_controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.GetUserSessionActualUserLoggedIn_ForRestControllerIF;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Manage Users: List Invited
 *
 */
@RestController
public class WebappConfig_ManageUsers_ListUsers_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( WebappConfig_ManageUsers_ListUsers_RestWebserviceController.class );
	

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetUserSessionActualUserLoggedIn_ForRestControllerIF getUserSessionActualUserLoggedIn_ForRestController;

	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same

	@PostMapping( 
			path = { 
					AA_WebappAdmin_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_WebappAdmin_RestWSControllerPaths_Constants.WEBAPP_ADMIN_MANAGE_USERS_LIST_USERS_REST_WEBSERVICE_CONTROLLER
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

		try {

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			final String remoteIP = httpServletRequest.getRemoteAddr();

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class ); 

			WebserviceResult webserviceResult = webserviceMethodInternal( webserviceRequest, remoteIP, httpServletRequest );
			
			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
			throw e;
			
		} catch ( Exception e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}

	/**
	 * @param webserviceRequest
	 * @param remoteIP
	 * @param httpServletRequest
	 * @return
	 * @throws Exception
	 */
	private WebserviceResult webserviceMethodInternal( WebserviceRequest webserviceRequest, String remoteIP, HttpServletRequest httpServletRequest ) throws Exception {
		
		//		log.warn( "webserviceMethod(...) called" );
		
		UserSession userSession =
				getUserSessionActualUserLoggedIn_ForRestController.userSessionOfActualUserLoggedIn( httpServletRequest );

		if ( userSession.isGlobalAdminUser() || 
				( userSession.getUserAccessLevel() != null 
						&& userSession.getUserAccessLevel() <= AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) ) {
			
		} else {
			//  Only admin user authorized to access this page
			
			throw new Limelight_WS_AuthError_Forbidden_Exception();
		}
		
		List<WebserviceResult_UserItem> userAccountDBList = this.getWebserviceResult_UserItemListForAllUsers();
		//  Sort on last name then first name
		Collections.sort( userAccountDBList, new Comparator<WebserviceResult_UserItem>() {
			@Override
			public int compare(WebserviceResult_UserItem o1, WebserviceResult_UserItem o2) {
				int lastNameCompare = o1.getLastName().compareTo( o2.getLastName() );
				if ( lastNameCompare != 0 ) {
					return lastNameCompare;
				}
				return o1.getFirstName().compareTo( o2.getFirstName() );
			}
		});
		
		WebserviceResult webserviceResult = new WebserviceResult();

		webserviceResult.status = true;
		webserviceResult.users = userAccountDBList;

		return webserviceResult;
	}
	
	/**
	 * @return
	 * @throws Exception
	 */
	public List<WebserviceResult_UserItem> getWebserviceResult_UserItemListForAllUsers( ) throws Exception {
		
		List<UserDTO> userList = userDAO.getAll();
		List<WebserviceResult_UserItem> returnList = new ArrayList<>( userList.size() );
		for ( UserDTO userDTO : userList ) {

			//  Get User Mgmt User Id for userId
			int userMgmtUserId = userDTO.getUserMgmtUserId();
			
			//  Get full user data
			UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
//			userMgmtGetUserDataRequest.setSessionKey( userMgmtLoginResponse.getSessionKey() );
			userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
			UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
					userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
			if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
				String msg = "Failed to get Full user data from User Mgmt Webapp for userId: " + userDTO.getId()
						+ ", userMgmtUserId: " + userMgmtUserId;
				log.error( msg );
				continue;  //  EARLY CONTINUE to next entry
			}
			
			boolean enabledAppSpecific = userDTO.isEnabledAppSpecific();
			
			//  Get user Access level at account level from limelight db
			Integer userAccessLevel = userDTO.getUserAccessLevel();
			if ( userAccessLevel == null ) {
				String msg = "Failed to get userAccessLevel from limelight user table for user id: " + userDTO.getId();
				log.error( msg );
				continue;  //  EARLY CONTINUE to next entry
			}
			
			WebserviceResult_UserItem userItem = new WebserviceResult_UserItem();
			userItem.userId = userDTO.getId();
			userItem.firstName = userMgmtGetUserDataResponse.getFirstName();
			userItem.lastName = userMgmtGetUserDataResponse.getLastName();
			userItem.userAccessLevel = userAccessLevel;
			userItem.enabledAppSpecific = enabledAppSpecific;
			userItem.enabledUserMgmtGlobalLevel = userMgmtGetUserDataResponse.isEnabled();
			
			returnList.add( userItem );
		}
		return returnList;
	}


	public static class WebserviceRequest {
		
	}

	public static class WebserviceResult {

		private boolean status;
		List<WebserviceResult_UserItem> users;
		public boolean isStatus() {
			return status;
		}
		public List<WebserviceResult_UserItem> getUsers() {
			return users;
		}
	}

	public static  class WebserviceResult_UserItem {
		
		private int userId;
		private String firstName;
		private String lastName;
		private Integer userAccessLevel;
		private Boolean enabledAppSpecific;
		private Boolean enabledUserMgmtGlobalLevel;
		
		public int getUserId() {
			return userId;
		}
		public String getFirstName() {
			return firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public Integer getUserAccessLevel() {
			return userAccessLevel;
		}
		public Boolean getEnabledAppSpecific() {
			return enabledAppSpecific;
		}
		public Boolean getEnabledUserMgmtGlobalLevel() {
			return enabledUserMgmtGlobalLevel;
		}
	}
	

}
