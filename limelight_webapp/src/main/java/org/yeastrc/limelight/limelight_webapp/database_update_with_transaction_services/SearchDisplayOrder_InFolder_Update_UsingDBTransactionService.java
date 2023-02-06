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

/**
 * Update The Display order on folder_project_search_tbl records
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class SearchDisplayOrder_InFolder_Update_UsingDBTransactionService implements SearchDisplayOrder_InFolder_Update_UsingDBTransactionService_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchDisplayOrder_InFolder_Update_UsingDBTransactionService.class );

	@Autowired
	private FolderProjectSearchDAO_IF folderProjectSearchDAO;
	
	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param projectSearchIdList
	 */
	
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void searchDisplayOrder_Update( int folderId, List<Integer> projectSearchIdList ) { //  No 'Throws' allowed due to 
		try {
			int newDisplayOrder = 0;
			for ( Integer projectSearchId : projectSearchIdList ) {
				newDisplayOrder++;  //  increment for each search id
				folderProjectSearchDAO.updateDisplayOrderFor_FolderId_ProjectSearchId( folderId, projectSearchId, newDisplayOrder );
			}
									
		} catch ( RuntimeException e ) {
			String msg = "fail searchDisplayOrder_Update(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail searchDisplayOrder_Update(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}
}
