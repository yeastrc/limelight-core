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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ZzUserDataMirrorDTO;

/**
 * @author danj
 *
 */
public interface AddNewUserUsingDBTransactionServiceIF {

	/**
	 * @param userDTO
	 * @param zzUserDataMirrorDTO
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
	void addNewUserAddProjectUserDTOForUserInvite(UserDTO userDTO, ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			ProjectUserDTO projectUserDTO, UserInviteTrackingDTO userInviteTrackingDTO);

	/**
		 * @param userDTO
		 * @param zzUserDataMirrorDTO
		 * @param userInviteTrackingDTO
		 * @throws Exception
		 */
	void addNewUserForUserInvite(UserDTO userDTO, ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			UserInviteTrackingDTO userInviteTrackingDTO);
	
	/**
	 * @param userDTO
	 * @param zzUserDataMirrorDTO
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
	void addNewUserAddProjectUserDTO( 
			UserDTO userDTO, 
			ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			ProjectUserDTO projectUserDTO );

	/**
		 * @param userDTO
		 * @throws Exception
		 */
	void addNewUser(UserDTO userDTO, ZzUserDataMirrorDTO zzUserDataMirrorDTO) throws Exception;

}