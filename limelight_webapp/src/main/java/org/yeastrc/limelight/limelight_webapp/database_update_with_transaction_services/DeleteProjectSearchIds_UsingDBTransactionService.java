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

import java.util.Set;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchDAO_IF;

/**
 * Delete Project Search Ids and associated data in tables that are not deleted via foreign key cascade
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class DeleteProjectSearchIds_UsingDBTransactionService implements DeleteProjectSearchId_UsingDBTransactionServiceIF  {

	private static final Logger log = LoggerFactory.getLogger( DeleteProjectSearchIds_UsingDBTransactionService.class );

	@Autowired
	private ProjectSearchDAO_IF projectSearchDAO;

	@Autowired
	private DataPageSavedViewDAO_IF dataPageSavedViewDAO;
	
	@Autowired
	private ExperimentDAO_IF experimentDAO;

	/**
	 * @param projectSearchIds
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void deleteProjectSearchIds( Set<Integer> projectSearchIds, Set<Integer> experimentIds_Containing_ProjectSearchId ) { //  No 'Throws' allowed due to 
		
		try {
			for ( Integer projectSearchId : projectSearchIds ) {

				projectSearchDAO.delete( projectSearchId );

				//  Remove any Shared Views with this project search id
				dataPageSavedViewDAO.deleteForProjectSearchId( projectSearchId ); 
			}
			
			if ( experimentIds_Containing_ProjectSearchId != null && ( ! experimentIds_Containing_ProjectSearchId.isEmpty() ) ) {

				//  Have Experiment Ids to delete so delete them (Contain ProjectSearchId)
				
				for ( Integer experimentId : experimentIds_Containing_ProjectSearchId ) {
					experimentDAO.delete(experimentId);
				}
    		}
			
			
		} catch ( RuntimeException e ) {
			String msg = "fail deleteProjectSearchIds(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail deleteProjectSearchIds(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
