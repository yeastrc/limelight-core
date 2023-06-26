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
package org.yeastrc.limelight.limelight_shared.pause_run_importer_common.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.enum_classes.FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum;

/**
 * 
 * 
 * Table file_import__run_importer__pause_processing_request_tbl
 * 
 * Result across all records found
 *
 */
public class RunImporter_PauseProcessing_Schedule_Searcher {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_PauseProcessing_Schedule_Searcher.class );

	//  private constructor
	private RunImporter_PauseProcessing_Schedule_Searcher() { }
	/**
	 * @return newly created instance
	 */
	public static RunImporter_PauseProcessing_Schedule_Searcher getInstance() { 
		return new RunImporter_PauseProcessing_Schedule_Searcher(); 
	}
	
	/**
	 * 
	 *
	 */
	public static class RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType {
		
		private FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum type;
		private String scheduleJSON;
		private int scheduleJSON_Version;
		private long scheduleJSON_LastUpdated_UTC_Milliseconds;
		
		public FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum getType() {
			return type;
		}
		public String getScheduleJSON() {
			return scheduleJSON;
		}
		public int getScheduleJSON_Version() {
			return scheduleJSON_Version;
		}
		public long getScheduleJSON_LastUpdated_UTC_Milliseconds() {
			return scheduleJSON_LastUpdated_UTC_Milliseconds;
		}
	
	}

	/**
	 * Result across all records found
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType> getSchedule_AcrossAllTypes() throws Exception {
		
		List<RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType> resultList = new ArrayList<>();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT *, UNIX_TIMESTAMP( schedule_last_updated_date_time ) AS schedule_last_updated_date_time_unix_timestamp_utc FROM file_import__run_importer__pause_processing_schedule_tbl";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			rs = pstmt.executeQuery();
			while ( rs.next() ) {
				
				RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType result = new RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType();
				
				{
					int fieldValue = rs.getInt( "type_id_fk" );
					result.type = FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum.fromValue(fieldValue);
				}
				
				result.scheduleJSON = rs.getString( "schedule_json" );
				result.scheduleJSON_Version = rs.getInt( "schedule_json_version" );
				result.scheduleJSON_LastUpdated_UTC_Milliseconds = rs.getLong( "schedule_last_updated_date_time_unix_timestamp_utc" );
				
				resultList.add(result);
			}
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql, e );
			throw e;
		} finally {
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
			if( conn != null ) {
				try { conn.close(); } catch( Throwable t ) { ; }
				conn = null;
			}
		}
		return resultList;
	}
	

}
