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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * File Import - Pause Run Importer - Get Current Pause Status
 * 
 * table file_import__run_importer__pause_processing_current_status_tbl
 *
 */
@Component
public class FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher extends Limelight_JDBC_Base implements FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher.class );
	
	private static final String MAIN_QUERY_SQL = 
			" SELECT *, UNIX_TIMESTAMP( last_updated_date_time ) AS last_updated_unix_timestamp_for_updates FROM file_import__run_importer__pause_processing_current_status_tbl";
	
	/**
	 * 
	 *
	 */
	public class FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item {

		private FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum type;

		//  Current Status
		private FileImport_RunImporter_PauseProcessing_Current_Status_Enum status;
		
		private FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum current_Status_TriggerType;
		
		private int time_in_seconds_until_next_check_for_pause;

		
		public FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum getType() {
			return type;
		}
		public FileImport_RunImporter_PauseProcessing_Current_Status_Enum getStatus() {
			return status;
		}
		public int getTime_in_seconds_until_next_check_for_pause() {
			return time_in_seconds_until_next_check_for_pause;
		}
		public FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum getCurrent_Status_TriggerType() {
			return current_Status_TriggerType;
		}
	}
	
	/**
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item> 
	
	get_Current_PauseRunImporter_Status() throws SQLException {

		List<FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item> results = new ArrayList<>();

		String querySQL = MAIN_QUERY_SQL;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item result = new FileImport_Pause_RunImporter_Get_CurrentStatus_Searcher_Return_Item();

					{
						int fieldValue = rs.getInt( "type_id_fk" );
						result.type = FileImport_RunImporter_PauseProcessing_Current_Type_ID_Enum.fromValue(fieldValue);
					}
					{
						int fieldValue = rs.getInt( "status_id_fk" );
						if ( ! rs.wasNull() ) {
							result.status = FileImport_RunImporter_PauseProcessing_Current_Status_Enum.fromValue(fieldValue);
						}
					}
					{
						int fieldValue = rs.getInt( "current_status_trigger_type_id_fk" );
						if ( ! rs.wasNull() ) {
							result.current_Status_TriggerType = FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum.fromValue(fieldValue);
						}
					}
					result.time_in_seconds_until_next_check_for_pause = rs.getInt( "time_in_seconds_until_next_check_for_pause" );

					results.add(result);
				}
			} catch ( SQLException e ) {
				log.error( "error running SQL: " + querySQL, e );
				throw e;
			}

			return results;
		}

	}
}

