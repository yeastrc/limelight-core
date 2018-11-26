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
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Importer_RunImporter_DAO;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.file_import_limelight_xml_scans.objects.TrackingDTOTrackingRunDTOPair;
import org.yeastrc.limelight.limelight_run_importer.dao.FileImportTracking_For_ImporterRunner_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * Service for getting next Tracking to process, updating Tracking and updating and inserting Tracking Run records as a single DB transaction
 *
 */
public class GetNextTrackingToProcessDBTransaction {

	private static final Logger log = LoggerFactory.getLogger( GetNextTrackingToProcessDBTransaction.class );

	private GetNextTrackingToProcessDBTransaction() { }
	public static GetNextTrackingToProcessDBTransaction getInstance() { 
		return new GetNextTrackingToProcessDBTransaction(); 
	}
	

	/**
	 * @param maxPriority - max priority value to consider
	 * @return - null when no next record to process is found
	 * @throws Exception
	 */
	public TrackingDTOTrackingRunDTOPair getNextTrackingToProcess( int maxPriority ) throws Exception {

		TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair = null;
		
		FileImportTrackingDTO fileImportTrackingDTO = null;
		FileImportTrackingRunDTO fileImportTrackingRunDTO = null;
		
		Connection dbConnection = null;

		try {
			dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection();
			
			dbConnection.setAutoCommit(false);
			
			fileImportTrackingDTO =
					FileImportTracking_For_ImporterRunner_DAO.getInstance().getNextQueued( maxPriority, dbConnection );

			if ( fileImportTrackingDTO != null ) {
			
				fileImportTrackingDTO.setStatus( FileImportStatus.STARTED );

				FileImportTracking_Importer_RunImporter_DAO.getInstance()
				.updateStatusStarted( fileImportTrackingDTO.getId(), dbConnection );
				
				//  Clear "current_run" on previous runs for tracking id
				
				FileImportTrackingRun_Importer_RunImporter_DAO.getInstance()
				.updateClearCurrentRunForTrackingId( fileImportTrackingDTO.getId(), dbConnection );

				//  Create a "run" db record

				fileImportTrackingRunDTO = new FileImportTrackingRunDTO();
				
				fileImportTrackingRunDTO.setFileImportTrackingId( fileImportTrackingDTO.getId() );
				fileImportTrackingRunDTO.setRunStatus( FileImportStatus.STARTED );
				
				FileImportTrackingRun_Importer_RunImporter_DAO.getInstance().save( fileImportTrackingRunDTO, dbConnection );

				trackingDTOTrackingRunDTOPair = new TrackingDTOTrackingRunDTOPair();

				trackingDTOTrackingRunDTOPair.setFileImportTrackingDTO( fileImportTrackingDTO );
				trackingDTOTrackingRunDTOPair.setFileImportTrackingRunDTO( fileImportTrackingRunDTO );
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
		
		return trackingDTOTrackingRunDTOPair;
	}
	

}
