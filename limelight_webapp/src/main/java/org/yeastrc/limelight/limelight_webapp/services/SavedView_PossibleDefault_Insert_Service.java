package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.SavedView_PossibleDefault_Insert_UsingDBTransactionService;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocExperimentIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewDTO;

/**
 * Add all records to the DB for adding a Saved View.  Update Default Project Search Id if required
 * 
 * Wrapper class for SavedView_PossibleDefault_Insert_UsingDBTransactionService
 * to support retry outside the DB transaction
 * 
 * 
 *
 */
@Service
public class SavedView_PossibleDefault_Insert_Service implements SavedView_PossibleDefault_Insert_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( SavedView_PossibleDefault_Insert_Service.class );
	
	private static final int RETRY_COUNT_MAX = 5;

	@Autowired
	private SavedView_PossibleDefault_Insert_UsingDBTransactionService savedView_PossibleDefault_Insert_UsingDBTransactionService;
	
	/**
	 * @param item
	 * @param childrenProjectSearchIds
	 * @throws SQLException 
	 */
	@Override
	public void addDataPageSavedView_UpdateDefaultIfSet( DataPageSavedViewDTO item, List<DataPageSavedViewAssocProjectSearchIdDTO> childrenProjectSearchIds, DataPageSavedViewAssocExperimentIdDTO childExperimentId ) throws SQLException {  
		
		int retryCount = 0;
		
		while ( true ) { //  Exit method inside loop, in multiple places
			
			try {
				savedView_PossibleDefault_Insert_UsingDBTransactionService.addDataPageSavedView_UpdateDefaultIfSet( item, childrenProjectSearchIds, childExperimentId );
				
				return; // Exit method
				
			} catch ( RuntimeException e ) {
				
				retryCount++;
				if ( retryCount > RETRY_COUNT_MAX ) {
					log.error( "Failed to add or update addOrUpdateDataPageSavedView(...)", e );
					throw e;
				}
			}
		}
		
	}
	
}
