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

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchComment_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchWebLinks_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchFileProjectSearch_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchIdAssocSearchIdInProjectIdSearcherIF;

/**
 * Copy Project Search Ids to Different Project Id
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class CopyProjectSearchIdToNewProjectUsingDBTransactionService implements CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( CopyProjectSearchIdToNewProjectUsingDBTransactionService.class );

	@Autowired
	private ProjectSearchIdAssocSearchIdInProjectIdSearcherIF projectSearchIdAssocSearchIdInProjectIdSearcher;

	@Autowired
	private ProjectSearchDAO_IF projectSearchDAO;
	
	@Autowired
	private SearchFileProjectSearch_WebDAO_IF searchFileProjectSearch_WebDAO;
	
	@Autowired
	private ProjectSearchWebLinks_WebDAO_IF projectSearchWebLinks_WebDAO;
	
	@Autowired
	private ProjectSearchComment_WebDAO_IF projectSearchComment_WebDAO;
	
	/**
	 * @param item
	 * @param projectUserDTO
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void copyProjectSearchIdsToNewProjectId( List<Integer> projectSearchIdList, int newProjectId, int creatingUserId ) { //  No 'Throws' allowed due to 
		
		try {
			for ( int projectSearchId : projectSearchIdList ) {
				boolean copySearch = true;
				// First determine if searchId for projectSearchId is already in newProjectId
				if ( projectSearchIdAssocSearchIdInProjectIdSearcher
						.isSearchIdAssocWithProjectSearchIdInProjectId(
								projectSearchId, newProjectId ) ) {
					//  already in newProjectId so do not move it there
					copySearch = false;
				}
				if ( copySearch ) {
					copyProjectSearchIdToProjectId( projectSearchId, newProjectId, creatingUserId );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "fail addProject(...)";
			log.error( msg, e );
			throw e;
		} catch (Exception e ) {
			String msg = "fail addProject(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
	}

	/**
	 * @param projectSearchId
	 * @param newProjectId
	 * @return insertedProjectsearchId
	 * @throws Exception 
	 */
	private int copyProjectSearchIdToProjectId( int projectSearchId, int newProjectId, int creatingUserId ) throws Exception {
		
		ProjectSearchDTO projectSearchDTO = projectSearchDAO.getFromId( projectSearchId );
		projectSearchDTO.setProjectId( newProjectId );
		projectSearchDTO.setCreatedByUserId( creatingUserId );
		projectSearchDAO.save( projectSearchDTO); 
		int insertedProjectsearchId = projectSearchDTO.getId();

		searchFileProjectSearch_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId, insertedProjectsearchId );

		projectSearchWebLinks_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId, insertedProjectsearchId );
		
		projectSearchComment_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId, insertedProjectsearchId );
		
		return insertedProjectsearchId;
	}
	
}
