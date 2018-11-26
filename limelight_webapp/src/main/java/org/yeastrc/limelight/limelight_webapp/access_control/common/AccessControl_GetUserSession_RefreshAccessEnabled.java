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

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
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
 */
@Component
public class AccessControl_GetUserSession_RefreshAccessEnabled implements AccessControl_GetUserSession_RefreshAccessEnabled_IF {

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired UserSessionAlterSessionIF userSessionAlterSession;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.access_control.common.AccessControl_GetUserSession_RefreshAccessEnabled_IF#getUserSession_RefreshAccessEnabled(javax.servlet.http.HttpServletRequest)
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
