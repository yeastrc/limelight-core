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
import org.yeastrc.limelight.limelight_webapp.dao.FolderProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;

/**
 * Project Folder: Update to NEW Searches in the folder 
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class Project_Folder_Searches_InFolder_Updateto_NEW_UsingDBTransactionService  {

	private static final Logger log = LoggerFactory.getLogger( Project_Folder_Searches_InFolder_Updateto_NEW_UsingDBTransactionService.class );

	@Autowired
	private FolderProjectSearchDAO_IF folderProjectSearchDAO;
	
	@Autowired
	private ProjectSearchDAO_IF projectSearchDAO;
	
	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 */
	
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions

	public void folder_ProjectSearchIds_Update_To_NewList( 

			int folderId,

			List<Integer> projectSearchIdList_New,
			int userId

			) { //  No 'Throws' allowed due to 
		try {
			
			//  Reset all but   display_order to zero
			
			projectSearchDAO.updateDisplayOrder_ToZero_For_FolderId_AND_Exclude_ProjectSearchId_List(folderId, projectSearchIdList_New);

			//  Remove all but projectSearchIdList_New
			folderProjectSearchDAO.delete_NOT_In_ProjectSearchId_List(projectSearchIdList_New, folderId);
			
			if ( ! projectSearchIdList_New.isEmpty() ) {

				// New, Save or Update

				for ( Integer projectSearchId : projectSearchIdList_New ) {

					FolderProjectSearchDTO folderProjectSearchDTO = new FolderProjectSearchDTO();
					folderProjectSearchDTO.setProjectSearchId( projectSearchId );
					folderProjectSearchDTO.setFolderId( folderId );
					folderProjectSearchDTO.setSearchDisplayOrder(0);
					folderProjectSearchDAO.saveOrUpdate( folderProjectSearchDTO, userId );
					
					projectSearchDAO.updateDisplayOrderForProjectSearch(projectSearchId, 0);  // Set to zero 'clear out' since putting in a folder
				}
			}
												
		} catch ( RuntimeException e ) {
			String msg = "fail folder_ProjectSearchIds_Update_To_NewList(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail folder_ProjectSearchIds_Update_To_NewList(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}
}
