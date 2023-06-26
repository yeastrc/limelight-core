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
import org.yeastrc.limelight.limelight_shared.run_importer.run_importer_alive_status.enum_classes.FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.run_importer_alive_status.enum_classes.FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum;

/**
 * DAO for file_import__run_importer_alive_tbl table
 *
 * For Run Importer
 */
public class FileImport__RunImporter_AliveStatus_DAO__RunImporter {
	
	private static final Logger log = LoggerFactory.getLogger( FileImport__RunImporter_AliveStatus_DAO__RunImporter.class );
	
	private static final FileImport__RunImporter_AliveStatus_DAO__RunImporter instance = new FileImport__RunImporter_AliveStatus_DAO__RunImporter();

	//  private constructor
	private FileImport__RunImporter_AliveStatus_DAO__RunImporter() { }
	
	/**
	 * @return Singleton instance
	 */
	public static FileImport__RunImporter_AliveStatus_DAO__RunImporter getSingletonInstance() { 
		return instance; 
	}
	
	private static final String INSERT_UPDATE_SQL = 
			"INSERT INTO file_import__run_importer_alive_tbl "
			+ " (type_id_fk, status_id_fk, last_status_applied_date_time, "
			+ " time_in_seconds_until_next_alive_status_update ) "
			+ " VALUES (?, ?, NOW(), ? ) "
			+ " ON DUPLICATE KEY UPDATE "
			+ " status_id_fk = ?, "
			+ " last_status_applied_date_time = NOW(), "
			+ " time_in_seconds_until_next_alive_status_update = ? ";
	

	/**
	 * @param type
	 * @param status_CurrentEffective
	 * @param time_in_seconds_until_next_alive_status_update
	 * @throws Exception
	 */
	public void saveOrUpdate_ForTypeId_Etc( 

			FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum type,
			FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum status_CurrentEffective,
			int time_in_seconds_until_next_alive_status_update
			) throws Exception {

		final String sql = INSERT_UPDATE_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, type.value() );

				counter++;
				pstmt.setInt( counter, status_CurrentEffective.value() );

				counter++;
				pstmt.setInt( counter, time_in_seconds_until_next_alive_status_update );
				

				counter++;
				pstmt.setInt( counter, status_CurrentEffective.value() );

				counter++;
				pstmt.setInt( counter, time_in_seconds_until_next_alive_status_update );

				
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			String msg = "saveOrUpdate_ForTypeId_Etc(...): file_import__run_importer_alive_tbl, type: " + type + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}

}
