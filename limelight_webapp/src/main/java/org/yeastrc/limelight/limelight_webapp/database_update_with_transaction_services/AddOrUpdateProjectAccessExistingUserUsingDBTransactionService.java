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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;

/**
 * 
 * * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Component
public class AddOrUpdateProjectAccessExistingUserUsingDBTransactionService implements AddOrUpdateProjectAccessExistingUserUsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( AddOrUpdateProjectAccessExistingUserUsingDBTransactionService.class );

	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;
	
	
	/**
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateUserAddProjectUsersDTO( ProjectUserDTO projectUserDTO, UserInviteTrackingDTO userInviteTrackingDTO ) {
		try {
			projectUserDAO.save( projectUserDTO );
			int authUserInviteTrackingId = userInviteTrackingDTO.getId();
			int authUserIdUsingInvite = projectUserDTO.getUserId();
			String authUserInviteTrackingUseIP = userInviteTrackingDTO.getUseIP();
			userInviteTrackingDAO.updateUsedInviteFields( authUserInviteTrackingId, authUserIdUsingInvite, authUserInviteTrackingUseIP );
						
		} catch ( RuntimeException e ) {
			String msg = "fail updateUserAddProjectUsersDTO(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail updateUserAddProjectUsersDTO(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}
	
	/**
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateUserUpdateUserAccessLevel( ProjectUserDTO projectUserDTO, UserInviteTrackingDTO userInviteTrackingDTO ) throws Exception {
		try {
			projectUserDAO.updateAccessLevel( projectUserDTO );
			int authUserInviteTrackingId = userInviteTrackingDTO.getId();
			int authUserIdUsingInvite = projectUserDTO.getUserId();
			String authUserInviteTrackingUseIP = userInviteTrackingDTO.getUseIP();
			userInviteTrackingDAO.updateUsedInviteFields( authUserInviteTrackingId, authUserIdUsingInvite, authUserInviteTrackingUseIP );
						
		} catch ( RuntimeException e ) {
			String msg = "fail updateUserUpdateUserAccessLevel(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail updateUserUpdateUserAccessLevel(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
	}
}
