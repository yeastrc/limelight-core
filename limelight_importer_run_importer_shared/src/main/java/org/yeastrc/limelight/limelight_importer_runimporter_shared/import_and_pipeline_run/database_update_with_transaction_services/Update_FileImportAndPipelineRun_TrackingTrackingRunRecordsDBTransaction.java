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
package org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.database_update_with_transaction_services;

import java.sql.Connection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao.FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao.FileImportAndPipelineRunTracking_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;

/**
 * Do NOT use in Web App
 * 
 * 
 * Service for updating Tracking and Tracking Run records as a single DB transaction
 *
 */
public class Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction {
	
	private static final Logger log = LoggerFactory.getLogger( Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction.class );
	
	private Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction() { }
	public static Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction getInstance() { 
		return new Update_FileImportAndPipelineRun_TrackingTrackingRunRecordsDBTransaction(); 
	}
	

	/**
	 * @param status - for tracking item
	 * @param id - for tracking item
	 * @param runItem - tracking run item
	 * @throws Exception
	 */
	public void updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(
			
			FileImportStatus status, 
			int id,
			
			FileImportAndPipelineRunTrackingRunDTO runItem
			) throws Exception {

		Connection dbConnection = null;

		try {
			dbConnection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			dbConnection.setAutoCommit(false);
			
			FileImportAndPipelineRunTracking_Importer_RunImporter_DAO.getInstance()
			.updateStatusAtImportEnd( status, runItem.getId(), id, dbConnection );
			
			FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.getInstance()
			.updateStatusResultTexts( runItem, dbConnection );
			
			dbConnection.commit();
			
		} catch ( Exception e ) {
			
			String msg = "Failed updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(...)";

			log.error( msg , e);

			if ( dbConnection != null ) {
				
				try {
					dbConnection.rollback();
					
				} catch (Exception ex) {
					
					String msgRollback = "Rollback Exception:  updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(...) Exception:  See Syserr or Sysout for original exception: Rollback Exception, tables are in an inconsistent state. '" + ex.toString();
					System.out.println( msgRollback );
					System.err.println( msgRollback );
					log.error( msgRollback, ex );
					throw new Exception( msgRollback, ex );
				}
			}
			throw e;
			
		} finally {
			if( dbConnection != null ) {
				try {
					dbConnection.setAutoCommit(true);  /// reset for next user of connection
				} catch (Exception ex) {
					String msg = "Failed dbConnection.setAutoCommit(true) in updateTrackingStatusAtImportEndupdateTrackingRunStatusResultTexts(...)";
					System.out.println( msg );
					System.err.println( msg );
					throw new Exception(msg);
				}
				try { dbConnection.close(); } 
				catch(Throwable t ) { ; }
				dbConnection = null;
			}
		}
		
	}

}
