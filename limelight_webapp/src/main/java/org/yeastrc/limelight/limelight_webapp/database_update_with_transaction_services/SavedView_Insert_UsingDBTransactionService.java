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
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewAssocExperimentIdDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewAssocProjectSearchIdDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocExperimentIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewDTO;

/**
 * Add all records to the DB for adding a Saved View.  Update Default Project Search Id if required
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class SavedView_Insert_UsingDBTransactionService {

	private static final Logger log = LoggerFactory.getLogger( SavedView_Insert_UsingDBTransactionService.class );
	
	@Autowired
	private DataPageSavedViewDAO_IF dataPageSavedViewDAO;
	
	@Autowired
	private DataPageSavedViewAssocProjectSearchIdDAO_IF dataPageSavedViewAssocProjectSearchIdDAO;
	
	@Autowired
	private DataPageSavedViewAssocExperimentIdDAO_IF dataPageSavedViewAssocExperimentIdDAO;
	
	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param item
	 * @param children
	 * @param childExperimentId TODO
	 */
	
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addDataPageSavedView( DataPageSavedViewDTO item, List<DataPageSavedViewAssocProjectSearchIdDTO> children, DataPageSavedViewAssocExperimentIdDTO childExperimentId ) { //  No 'Throws' allowed due to 
		
		try {
			dataPageSavedViewDAO.save( item );
			
			for ( DataPageSavedViewAssocProjectSearchIdDTO child : children ) {
				
				child.setAssocMainId( item.getId() );
				dataPageSavedViewAssocProjectSearchIdDAO.save( child );
			}
			
			if ( childExperimentId != null ) { // childExperimentId only populated for Experiment
			
				childExperimentId.setAssocMainId( item.getId() );
				dataPageSavedViewAssocExperimentIdDAO.save( childExperimentId );
			}
						
		} catch ( RuntimeException e ) {
			String msg = "fail addDataPageSavedView_UpdateDefaultIfSet(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail addDataPageSavedView_UpdateDefaultIfSet(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
