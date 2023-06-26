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
package org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum;

/**
 * 
 * 
 * Table file_import__run_importer__pause_processing_request_tbl
 * 
 * Result across all records found
 *
 */
public class RunImporter_PauseProcessing_Request_Searcher {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_PauseProcessing_Request_Searcher.class );

	//  private constructor
	private RunImporter_PauseProcessing_Request_Searcher() { }
	/**
	 * @return newly created instance
	 */
	public static RunImporter_PauseProcessing_Request_Searcher getInstance() { 
		return new RunImporter_PauseProcessing_Request_Searcher(); 
	}
	
	/**
	 * Result across all records found
	 *
	 */
	public static class RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes {
		
		private FileImport_RunImporter_PauseProcessing_Request_Status_Enum status_Requested_PauseAll_Type;

		/**
		 * @return null if record not found
		 */
		public FileImport_RunImporter_PauseProcessing_Request_Status_Enum getStatus_Requested_PauseAll_Type() {
			return status_Requested_PauseAll_Type;
		}
	}

	/**
	 * Result across all records found
	 * 
	 * @return
	 * @throws Exception
	 */
	public RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes getStatus_AcrossAllTypes() throws Exception {
		
		RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes result = new RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes();
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		final String sql = "SELECT * FROM file_import__run_importer__pause_processing_request_tbl";
		try {
			conn = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
			pstmt = conn.prepareStatement( sql );
			
			rs = pstmt.executeQuery();
			while ( rs.next() ) {
				
				FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum type = null;
				{
					int fieldValue = rs.getInt( "type_id_fk" );
					type = FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum.fromValue(fieldValue);
				}
				
				FileImport_RunImporter_PauseProcessing_Request_Status_Enum status = null;
				{
					int fieldValue = rs.getInt( "status_id_requested_fk" );
					status = FileImport_RunImporter_PauseProcessing_Request_Status_Enum.fromValue(fieldValue);
				}
				
				if ( type == FileImport_RunImporter_PauseProcessing_Request_Type_ID_Enum.PAUSE_ALL ) {

					result.status_Requested_PauseAll_Type = status;
				}
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
		return result;
	}
	

}
