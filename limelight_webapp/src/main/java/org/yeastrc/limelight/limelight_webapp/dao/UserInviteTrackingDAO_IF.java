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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;

/**
 * @author danj
 *
 */
public interface UserInviteTrackingDAO_IF {

	/**
	 * @param inviteTrackingId
	 * @return null if not found
	 * @throws Exception
	 */
	UserInviteTrackingDTO getForInviteTrackingId(int inviteTrackingId) throws SQLException;

	/**
	 * @param inviteTrackingCode
	 * @return null if not found
	 * @throws Exception
	 */
	UserInviteTrackingDTO getForInviteTrackingCode(String inviteTrackingCode) throws SQLException;

	/**
		 * @param item
		 * @throws Exception
		 */
	void save(UserInviteTrackingDTO item);

	/**
	 * Update used_date = NOW() , useIP = ?
	 * @param id
	 * @param useUserId
	 * @param useIP
	 * @throws Exception
	 */
	void updateUsedInviteFields(int id, int useUserId, String useIP);

	/**
		 * Update revoking_user_id = ?, invite_revoked = 1, revoked_date = NOW()
		 * @param id
		 * @param revokeAuthUserId
		 * @param useIP
		 * @throws Exception
		 */
	void updateRevokedInviteFields(int id, int revokeUserId);

	/**
		 * Update invited_user_access_level = ?
		 * @param id
		 * @param invitedUserAccessLevel
		 * @throws Exception
		 */
	void updateInvitedUserAccessLevelFields(int id, int invitedUserAccessLevel, Connection dbConnection);

	/**
		 * Update code_replaced_by_newer = ? for same shared_object_id and user_email and id < supplied id
		 * @param authUserInviteTrackingDTO
		 * @throws Exception
		 */
	void updateCodeReplacedByNewerToTrueForPrevInvites(UserInviteTrackingDTO authUserInviteTrackingDTO);
	
	/**
	 * SET invited_user_access_level = ? WHERE id = ?
	 * 
	 * @param accessLevel
	 * @param id
	 */
	void updateAccessLevel( int accessLevel, int id );
	
	/**
	 * SET invite_revoked = 'true' ... WHERE id = ?
	 * 
	 * @param revokingUserId
	 * @param id
	 */
	void updateToRevokeInvite( int revokingUserId, int id );

	/**
		 * @param id
		 * @throws Exception
		 */
	void delete(int id);

}