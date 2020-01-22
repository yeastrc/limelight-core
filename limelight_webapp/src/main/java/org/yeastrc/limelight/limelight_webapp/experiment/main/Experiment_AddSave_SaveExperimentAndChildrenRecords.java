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
package org.yeastrc.limelight.limelight_webapp.experiment.main;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentAssocProjectSearchIdDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;

/**
 * Save the Experiment DB record and children
 * 
 * Does not save the Filters for searches, that is done separately and previously
 * 
 * Done in this class to be done as single DB transaction
 *
 */
@Component
public class Experiment_AddSave_SaveExperimentAndChildrenRecords implements Experiment_AddSave_SaveExperimentAndChildrenRecordsIF {

	private static final Logger log = LoggerFactory.getLogger( Experiment_AddSave_SaveExperimentAndChildrenRecords.class );

	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
	@Autowired
	private ExperimentAssocProjectSearchIdDAO_IF experimentAssocProjectSearchIdDAO;

	//  Spring DB Transactions
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void saveExperimentAndChildrenRecords( ExperimentDTO experimentDTO, List<Integer> projectSearchIdsArray ) {

		experimentDAO.save( experimentDTO );
		
		for ( Integer projectSearchId : projectSearchIdsArray ) {
			ExperimentAssocProjectSearchIdDTO item = new ExperimentAssocProjectSearchIdDTO();
			item.setAssocMainId( experimentDTO.getId() );
			item.setProjectSearchId( projectSearchId );
			experimentAssocProjectSearchIdDAO.save( item );
		}
	}

	//  Spring DB Transactions
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void updateExperimentAndChildrenRecords( ExperimentDTO experimentDTO, List<Integer> projectSearchIdsArray ) {

		experimentDAO.update( experimentDTO );
		
		// delete existing ExperimentAssocProjectSearchIdDTO
		
		experimentAssocProjectSearchIdDAO.delete_ForAssocMainId( experimentDTO.getId() );
		
		for ( Integer projectSearchId : projectSearchIdsArray ) {
			ExperimentAssocProjectSearchIdDTO item = new ExperimentAssocProjectSearchIdDTO();
			item.setAssocMainId( experimentDTO.getId() );
			item.setProjectSearchId( projectSearchId );
			experimentAssocProjectSearchIdDAO.save( item );
		}
	}
	
}
