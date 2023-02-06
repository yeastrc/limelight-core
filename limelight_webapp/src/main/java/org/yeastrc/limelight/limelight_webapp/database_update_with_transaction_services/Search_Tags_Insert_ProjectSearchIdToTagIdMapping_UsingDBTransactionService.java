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
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagMapping_DAO_IF;

/**
 * Update 
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class Search_Tags_Insert_ProjectSearchIdToTagIdMapping_UsingDBTransactionService implements Search_Tags_Insert_ProjectSearchIdToTagIdMapping_UsingDBTransactionService_IF  {

	private static final Logger log = LoggerFactory.getLogger( Search_Tags_Insert_ProjectSearchIdToTagIdMapping_UsingDBTransactionService.class );
	
	@Autowired
	private ProjectSearch_TagMapping_DAO_IF projectSearch_TagMapping_DAO;

	/**
	 * @param projectSearchId
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void insert_ProjectSearchIds_TO_TagId_Mapping( 
			
			List<Integer> projectSearchIds,
			int tagId ) { //  No 'Throws' allowed due to 
		
		try {
			//  Third Insert all mapping entries where tag ARE Selected

			{
				for ( Integer projectSearchId : projectSearchIds ) {

					projectSearch_TagMapping_DAO.save(projectSearchId, tagId);
				}
			}
			
		} catch ( RuntimeException e ) {
			String msg = "fail insert_ProjectSearchIds_TO_TagId_Mapping(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail insert_ProjectSearchIds_TO_TagId_Mapping(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
