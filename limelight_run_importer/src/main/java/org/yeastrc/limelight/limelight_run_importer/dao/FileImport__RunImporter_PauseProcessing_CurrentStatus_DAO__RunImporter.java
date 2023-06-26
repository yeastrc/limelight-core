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
package org.yeastrc.limelight.limelight_run_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum;

/**
 * DAO for file_import__run_importer__pause_processing_current_status_tbl table
 *
 * For Run Importer
 */
/**
 * @author danj
 *
 */
public class FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter {
	
	private static final Logger log = LoggerFactory.getLogger( FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter.class );
	
	private static final FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter instance = new FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter();

	//  private constructor
	private FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter() { }
	
	/**
	 * @return Singleton instance
	 */
	public static FileImport__RunImporter_PauseProcessing_CurrentStatus_DAO__RunImporter getSingletonInstance() { 
		return instance; 
	}
	
	private static final String INSERT_UPDATE_SQL = 
			"INSERT INTO file_import__run_importer__pause_processing_current_status_tbl "
			+ " (type_id_fk, status_id_fk, status_id_last_updated_date_time, "
			+ " current_status_trigger_type_id_fk, "
			+ " time_in_seconds_until_next_check_for_pause ) "
			+ " VALUES (?, ?, NOW(), ?, ? ) "
			+ " ON DUPLICATE KEY UPDATE "
			+ " status_id_fk = ?, "
			+ " status_id_last_updated_date_time = NOW(),"
			+ " current_status_trigger_type_id_fk = ?, "
			+ " time_in_seconds_until_next_check_for_pause = ? ";

	/**
	 * @param type
	 * @param status_Current
	 * @param current_Status_TriggerType - null for NOT Pause
	 * @param time_in_seconds_until_next_check_for_pause
	 * @throws Exception
	 */
	public void saveOrUpdate_ForTypeId_Etc( 

			FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum type,
			FileImport_RunImporter_PauseProcessing_Current_Status_Enum status_Current,
			FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum current_Status_TriggerType,
			int time_in_seconds_until_next_check_for_pause
			) throws Exception {

		final String sql = INSERT_UPDATE_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, type.value() );

				counter++;
				pstmt.setInt( counter, status_Current.value() );
				
				counter++;
				if ( current_Status_TriggerType != null ) {
					pstmt.setInt( counter, current_Status_TriggerType.value() );	
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}

				counter++;
				pstmt.setInt( counter, time_in_seconds_until_next_check_for_pause );
				

				counter++;
				pstmt.setInt( counter, status_Current.value() );

				counter++;
				if ( current_Status_TriggerType != null ) {
					pstmt.setInt( counter, current_Status_TriggerType.value() );	
				} else {
					pstmt.setNull( counter, java.sql.Types.INTEGER );
				}

				counter++;
				pstmt.setInt( counter, time_in_seconds_until_next_check_for_pause );

				
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			String msg = "saveOrUpdate_ForTypeId_Etc(...): file_import__run_importer__pause_processing_current_status_tbl, type: " + type + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

}
