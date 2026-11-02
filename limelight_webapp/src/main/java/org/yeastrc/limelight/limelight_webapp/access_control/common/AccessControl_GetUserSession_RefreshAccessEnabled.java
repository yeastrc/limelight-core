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
package org.yeastrc.limelight.limelight_webapp.access_control.common;

import java.sql.SQLException;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmt_UserEnabled_RecheckCache_IF;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionAlterSessionIF;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;

/**
 * !! Mostly Internal to Access Control !!
 * 
 * Get the User Session
 * 
 * Refresh the Access Level and Enabled flag
 * 
 * Ends the session (and returns null) when the user is disabled in Limelight, has no Limelight user record,
 * or (re-checked at most once per interval, see UserMgmt_UserEnabled_RecheckCache) is disabled in User Mgmt.
 *
 */
@Component
public class AccessControl_GetUserSession_RefreshAccessEnabled implements AccessControl_GetUserSession_RefreshAccessEnabled_IF {

	private static final Logger log = LoggerFactory.getLogger( AccessControl_GetUserSession_RefreshAccessEnabled.class );

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired UserSessionAlterSessionIF userSessionAlterSession;
	
	@Autowired
	private UserMgmt_UserEnabled_RecheckCache_IF userMgmt_UserEnabled_RecheckCache;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF#getUserSession_RefreshAccessEnabled(jakarta.servlet.http.HttpServletRequest)
	 */
	@Override
	public UserSession getUserSession_RefreshAccessEnabled( HttpServletRequest httpServletRequest ) {
		
		UserSession userSession = userSessionManager.getUserSession( httpServletRequest );
		if ( userSession == null ) {
			return null;
		}
		if ( ! userSession.isActualUser() ) {
			return userSession;
		}
		if ( userSession.getUserId() == null ) {
			return userSession;
		}
		
		UserDTO userDTO;
		try {
			userDTO = userDAO.getForId( userSession.getUserId() );
		} catch (SQLException e) {
			
			throw new LimelightDatabaseException( e );
		}
		
		if ( userDTO == null ) {
			//  No record for user session user id
			log.info( "No user record for the signed in user.  Ending the session.  Limelight user id: " + userSession.getUserId() );
			userSessionManager.invalidateUserSession( httpServletRequest, null /* httpServletResponse: not used */ );
			return null;
		}
		
		if ( ! userDTO.isEnabledAppSpecific() ) {
			log.info( "User is disabled in Limelight.  Ending the session.  Limelight user id: " + userSession.getUserId() );
			userSessionManager.invalidateUserSession( httpServletRequest, null /* httpServletResponse: not used */ );
			return null;
		}
		
		if ( userMgmt_UserEnabled_RecheckCache.isUserMgmtAccountDisabled_RecheckIfDue( userDTO.getUserMgmtUserId() ) ) {
			log.info( "User is disabled or not found in User Mgmt.  Ending the session.  Limelight user id: " + userSession.getUserId() );
			userSessionManager.invalidateUserSession( httpServletRequest, null /* httpServletResponse: not used */ );
			return null;
		}
		
		if ( userDTO.isEnabledAppSpecific() != userSession.isEnabledAppSpecific() ) {
			userSession = userSessionAlterSession.changeEnabledAppSpecific( userDTO.isEnabledAppSpecific(), userSession, httpServletRequest );
		}
		if ( userDTO.getUserAccessLevel() == null && userSession.getUserAccessLevel() == null ) {

		} else if ( ( userDTO.getUserAccessLevel() == null && userSession.getUserAccessLevel() != null )
				|| ( ! userDTO.getUserAccessLevel().equals( userSession.getUserAccessLevel() ) ) ){
			userSession = userSessionAlterSession.changeUserAccessLevel( userDTO.getUserAccessLevel(), userSession, httpServletRequest );
		}
		
		return userSession;
	}
}
