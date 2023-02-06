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
package org.yeastrc.limelight.limelight_run_importer.database_update_with_transaction_services;

import java.sql.Connection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.dao.FileImportTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao.FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.import_and_pipeline_run.dao.FileImportAndPipelineRunTracking_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_run_importer.dao.FileImportAndPipelineRunTracking_For_ImporterRunner_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.objects.FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair;

/**
 * Service for getting next Tracking to process, updating Tracking and updating and inserting Tracking Run records as a single DB transaction
 *
 */
public class GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction {

	private static final Logger log = LoggerFactory.getLogger( GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction.class );

	private GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction() { }
	public static GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction getInstance() { 
		return new GetNext_ImportAndPipelineRunTracking_ToProcessDBTransaction(); 
	}
	

	/**
	 * @param maxPriority - max priority value to consider
	 * @return - null when no next record to process is found
	 * @throws Exception
	 */
	public FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair getNextTrackingToProcess( int maxPriority ) throws Exception {

		FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair fileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair = null;
		
		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO = null;
		FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO = null;
		
		Connection dbConnection = null;

		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			
			dbConnection.setAutoCommit(false);
			
			fileImportAndPipelineRunTrackingDTO =
					FileImportAndPipelineRunTracking_For_ImporterRunner_DAO.getInstance().getNextQueued( maxPriority, dbConnection );

			if ( fileImportAndPipelineRunTrackingDTO != null ) {
			
				fileImportAndPipelineRunTrackingDTO.setStatus( FileImportStatus.STARTED );

				FileImportAndPipelineRunTracking_Importer_RunImporter_DAO.getInstance()
				.updateStatusStarted( fileImportAndPipelineRunTrackingDTO.getId(), dbConnection );
				
				//  Clear "current_run" on previous runs for tracking id
				
				FileImportTrackingRun_Importer_RunImporter_DAO.getInstance()
				.updateClearCurrentRunForTrackingId( fileImportAndPipelineRunTrackingDTO.getId(), dbConnection );

				//  Create a "run" db record

				fileImportAndPipelineRunTrackingRunDTO = new FileImportAndPipelineRunTrackingRunDTO();
				
				fileImportAndPipelineRunTrackingRunDTO.setFileImportAndPipelineRunTracking_Id( fileImportAndPipelineRunTrackingDTO.getId() );
				fileImportAndPipelineRunTrackingRunDTO.setStatus( FileImportStatus.STARTED );
				
				FileImportAndPipelineRunTrackingRun_Importer_RunImporter_DAO.getInstance().save( fileImportAndPipelineRunTrackingRunDTO, dbConnection );

				fileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair = new FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair();

				fileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair.setFileImportAndPipelineRunTrackingDTO( fileImportAndPipelineRunTrackingDTO );
				fileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair.setFileImportAndPipelineRunTrackingRunDTO( fileImportAndPipelineRunTrackingRunDTO );
			}

			dbConnection.commit();
						
		} catch ( Exception e ) {
			
			String msg = "Failed getNextTrackingToProcess(...)";

			log.error( msg , e);

			if ( dbConnection != null ) {
				
				try {
					dbConnection.rollback();
					
				} catch (Exception ex) {
					
					String msgRollback = "Rollback Exception:  getNextTrackingToProcess(...) Exception:  See Syserr or Sysout for original exception: Rollback Exception, tables are in an inconsistent state. '" + ex.toString();

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
					String msg = "Failed dbConnection.setAutoCommit(true) in getNextTrackingToProcess(...)";

					System.out.println( msg );
					System.err.println( msg );

					throw new Exception(msg);
				}

				try { dbConnection.close(); } 
				catch(Throwable t ) { ; }
				dbConnection = null;
			}
		}
		
		return fileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair;
	}
	

}
