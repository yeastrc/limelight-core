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

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;

/**
 * @author danj
 *
 */
public interface UserDAO_IF {

	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	UserDTO getForId(int id) throws SQLException;
	
	/**
	 * @return
	 * @throws SQLException
	 */
	List<UserDTO> getAll() throws SQLException;
	
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Integer getIdForId( int id ) throws Exception;

	/**
	 * @param userMgmtUserId
	 * @return
	 * @throws Exception
	 */
	Integer getIdForUserMgmtUserId(int userMgmtUserId) throws Exception;
	
	/**
	 * @param id
	 * @return
	 * @throws Exception
	 */
	Integer getUserMgmtUserIdForId( int id ) throws Exception;

	/**
	 * @param item
	 */
	void save(UserDTO item);

	/**
	 * @param item
	 */

	/**
	 * Update user_access_level = ? 
	 * @param id
	 * @param user_access_level
	 */
	void updateUserAccessLevel(int id, Integer user_access_level);

	/**
	 * Update enabled_app_specific = ? 
	 * @param id
	 * @param enabled_app_specific
	 * @throws Exception
	 */
	void updateEnabledAppSpecific(int id, boolean enabled_app_specific);

	/**
	 * Update last_login_ip = ? 
	 * @param id
	 * @param lastLoginIP
	 * @throws Exception
	 */
	void updateLastLogin(int id, String lastLoginIP);

	/**
	 * Update send_email_on_import_finish = ? 
	 * @param id
	 * @param sendEmailOnImportFinish
	 */
	public void update_SendEmailOnImportFinish( int id, boolean sendEmailOnImportFinish );
}