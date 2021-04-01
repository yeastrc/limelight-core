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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectLevelDefaultFltrAnnCutoffs_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectLevelDefaultFltrAnnCutoffs_DTO;

/**
 * Update The Display order on folder_for_project_tbl records
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService implements ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService.class );
	
	@Autowired
	private ProjectLevelDefaultFltrAnnCutoffs_DAO_IF projectLevelDefaultFltrAnnCutoffs_DAO;
	
	@Autowired
	private ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO_IF projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO;

	/**
	 * 
	 *
	 */
	public static class ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry {
		public ProjectLevelDefaultFltrAnnCutoffs_DTO projectLevelDefaultFltrAnnCutoffs_DTO;
		public ProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO;
	}

	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param projectId
	 * @param entries
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void saveUpdate( int projectId, List<ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry> entries ) {
		try {
			projectLevelDefaultFltrAnnCutoffs_DAO.copyToPrevTable_ForProjectId( projectId );
			projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO.copyToPrevTable_ForProjectId( projectId );
			
			projectLevelDefaultFltrAnnCutoffs_DAO.deleteAllFor_ProjectId( projectId );
			
			for ( ProjectLevelDefaultCutoffs_SaveUpdate_UsingDBTransactionService__Entry entry : entries ) {

				projectLevelDefaultFltrAnnCutoffs_DAO.save( entry.projectLevelDefaultFltrAnnCutoffs_DTO );
				
				entry.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO.setProjectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_Id( entry.projectLevelDefaultFltrAnnCutoffs_DTO.getId() );
				projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DAO.save( entry.projectLevelDefaultFltrAnnCutoffs_CutoffAsStringValue_DTO);
			}
			
		} catch ( RuntimeException e ) {
			String msg = "fail saveUpdate(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail saveUpdate(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
	}
}
