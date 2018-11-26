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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.constants.AuthAccessLevelConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectUserDeletedDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDeletedDTO;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;

/**
 * Delete User From Project
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class DeleteUserFromProjectUsingDBTransactionService implements DeleteUserFromProjectUsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( DeleteUserFromProjectUsingDBTransactionService.class );

	@Autowired
	private ProjectUserDAO_IF projectUserDAO;
	
	@Autowired
	private ProjectUserDeletedDAO_IF projectUserDeletedDAO;
	
	/**
	 * @param item
	 * @param projectUserDTO
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void deleteUserFromProject( UserSession userSession, ProjectUserDTO projectUserDTO_UserToDelete ) { //  No 'Throws' allowed due to 
		
		try {
			if ( userSession != null && userSession.getUserId() != null ) {
				if ( userSession.getUserId() == projectUserDTO_UserToDelete.getUserId() ) {
					if ( log.isInfoEnabled() ) {
						log.info( "User is trying to remove their own access which will be blocked. userId: " + projectUserDTO_UserToDelete.getUserId() );
					}
				} else {
					
					ProjectUserDTO projectUserDTO_UserToDeleteFromDB = 
							projectUserDAO.getForProjectIdUserId( projectUserDTO_UserToDelete.getProjectId(), projectUserDTO_UserToDelete.getUserId() );
					ProjectUserDTO projectUserDTO_CurrentUser = projectUserDAO.getForProjectIdUserId( projectUserDTO_UserToDelete.getProjectId(), userSession.getUserId() );

					if ( projectUserDTO_UserToDeleteFromDB != null ) {
					
						if ( userSession.isGlobalAdminUser() 
								|| ( userSession.getUserAccessLevel() != null && userSession.getUserAccessLevel() == AuthAccessLevelConstants.ACCESS_LEVEL_ADMIN )
								|| ( projectUserDTO_CurrentUser.getAccessLevel() <= projectUserDTO_UserToDeleteFromDB.getAccessLevel() ) ) {

							//  Update the DB
							projectUserDAO.delete( projectUserDTO_UserToDeleteFromDB );
							
							ProjectUserDeletedDTO projectUserDeletedDTO = new ProjectUserDeletedDTO();
							projectUserDeletedDTO.setProjectId( projectUserDTO_UserToDeleteFromDB.getProjectId() );
							projectUserDeletedDTO.setUserId( projectUserDTO_UserToDeleteFromDB.getUserId() );
							projectUserDeletedDTO.setAccessLevel( projectUserDTO_UserToDeleteFromDB.getAccessLevel() );
							projectUserDeletedDTO.setDeletedByUserId( userSession.getUserId() );
							projectUserDeletedDAO.save( projectUserDeletedDTO );
						}
					}
				}
			}
			
		} catch ( RuntimeException e ) {
			String msg = "fail deleteUserFromProject(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail deleteUserFromProject(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
