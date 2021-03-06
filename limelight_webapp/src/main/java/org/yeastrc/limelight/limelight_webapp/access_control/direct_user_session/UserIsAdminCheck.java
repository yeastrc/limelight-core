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
package org.yeastrc.limelight.limelight_webapp.access_control.direct_user_session;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Is user in User Session an Admin User?
 *
 */
@Component
public class UserIsAdminCheck implements UserIsAdminCheckIF {

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.access_control.direct_user_session.UserIsAdminCheckIF#userIsAdmin(org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession)
	 */
	@Override
	public boolean userIsAdmin( UserSession userSession ) {
		
		if ( userSession.isGlobalAdminUser() ) {
			return true;
		}
		
		if ( userSession.getUserAccessLevel() == null ) {
			return false;
		}
		
		if ( userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN ) {
			return true;
		}
		
		return false;
		
	}
}
