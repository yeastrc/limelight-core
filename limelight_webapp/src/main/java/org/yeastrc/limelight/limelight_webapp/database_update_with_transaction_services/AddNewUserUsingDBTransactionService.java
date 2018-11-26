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
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UserInviteTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ZzUserDataMirrorDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectUserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UserInviteTrackingDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ZzUserDataMirrorDTO;

/**
 * 
 *
 */
@Component
public class AddNewUserUsingDBTransactionService implements AddNewUserUsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( AddNewUserUsingDBTransactionService.class );

	@Autowired
	private UserDAO_IF userDAO;

	@Autowired
	private ProjectUserDAO_IF projectUserDAO;

	@Autowired
	private UserInviteTrackingDAO_IF userInviteTrackingDAO;
	
	@Autowired
	private ZzUserDataMirrorDAO_IF zzUserDataMirrorDAO;
	
	/**
	 * @param userDTO
	 * @param zzUserDataMirrorDTO
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addNewUserAddProjectUserDTOForUserInvite( 
			UserDTO userDTO, 
			ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			ProjectUserDTO projectUserDTO,
			UserInviteTrackingDTO userInviteTrackingDTO ) {
		try {
			userDAO.save( userDTO );
			//  set user id here since was just set when called addNewUserInternal(...)
			projectUserDTO.setUserId( userDTO.getId() );
			projectUserDAO.save( projectUserDTO );
			int authUserInviteTrackingId = userInviteTrackingDTO.getId();
			int authUserIdUsingInvite = userDTO.getId();
			String authUserInviteTrackingUseIP = userInviteTrackingDTO.getUseIP();
			userInviteTrackingDAO.updateUsedInviteFields( authUserInviteTrackingId, authUserIdUsingInvite, authUserInviteTrackingUseIP );
			zzUserDataMirrorDTO.setUserId( userDTO.getId() );
			zzUserDataMirrorDAO.save( zzUserDataMirrorDTO );
		} catch ( RuntimeException e ) {
			String msg = "Failed addNewUserAddProjectUserDTOForUserInvite(...)";
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param userDTO
	 * @param zzUserDataMirrorDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addNewUserForUserInvite( UserDTO userDTO,
			ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			UserInviteTrackingDTO userInviteTrackingDTO ) {
		try {
			userDAO.save( userDTO );
			if ( userInviteTrackingDTO != null ) {
				int authUserInviteTrackingId = userInviteTrackingDTO.getId();
				int authUserIdUsingInvite = userDTO.getId();
				String authUserInviteTrackingUseIP = userInviteTrackingDTO.getUseIP();
				userInviteTrackingDAO.updateUsedInviteFields( authUserInviteTrackingId, authUserIdUsingInvite, authUserInviteTrackingUseIP );
			}
			zzUserDataMirrorDTO.setUserId( userDTO.getId() );
			zzUserDataMirrorDAO.save( zzUserDataMirrorDTO );
		} catch ( RuntimeException e ) {
			String msg = "Failed addNewUserForUserInvite(...)";
			log.error( msg, e );
			throw e;
		}
	}
	

	/**
	 * @param userDTO
	 * @param zzUserDataMirrorDTO
	 * @param projectUserDTO
	 * @param userInviteTrackingDTO
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addNewUserAddProjectUserDTO( 
			UserDTO userDTO, 
			ZzUserDataMirrorDTO zzUserDataMirrorDTO,
			ProjectUserDTO projectUserDTO ) {
		try {
			userDAO.save( userDTO );
			//  set user id here since was just set when called addNewUserInternal(...)
			projectUserDTO.setUserId( userDTO.getId() );
			projectUserDAO.save( projectUserDTO );
			zzUserDataMirrorDTO.setUserId( userDTO.getId() );
			zzUserDataMirrorDAO.save( zzUserDataMirrorDTO );
		} catch ( RuntimeException e ) {
			String msg = "Failed addNewUserAddProjectUserDTOForUserInvite(...)";
			log.error( msg, e );
			throw e;
		}
	}
	
	/**
	 * @param userDTO
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addNewUser( UserDTO userDTO, ZzUserDataMirrorDTO zzUserDataMirrorDTO ) throws Exception {
		try {
			userDAO.save( userDTO );
			zzUserDataMirrorDTO.setUserId( userDTO.getId() );
			zzUserDataMirrorDAO.save( zzUserDataMirrorDTO );
		} catch ( RuntimeException e ) {
			String msg = "Failed addNewUser(...)";
			log.error( msg, e );
			throw e;
		}
	}

}
