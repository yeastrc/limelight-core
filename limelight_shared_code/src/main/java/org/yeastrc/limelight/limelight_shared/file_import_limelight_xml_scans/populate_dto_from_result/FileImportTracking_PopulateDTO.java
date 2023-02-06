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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.populate_dto_from_result;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * table file_import_tracking_tbl
 *
 */
public class FileImportTracking_PopulateDTO {

	//  private constructor
	private FileImportTracking_PopulateDTO() { }
	
	/**
	 * @return newly created instance
	 */
	public static FileImportTracking_PopulateDTO getInstance() { 
		return new FileImportTracking_PopulateDTO(); 
	}
	

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public FileImportTrackingDTO populateResultObject(ResultSet rs) throws SQLException {
		
		FileImportTrackingDTO returnItem = new FileImportTrackingDTO();
		
		returnItem.setId( rs.getInt( "id" ) );
		
		returnItem.setProjectId( rs.getInt( "project_id" ) );
		returnItem.setPriority( rs.getInt( "priority" ) );
		returnItem.setUserId( rs.getInt( "user_id" ) );

		returnItem.setStatus( FileImportStatus.fromValue( rs.getInt( "status_id" ) ) );
		
		returnItem.setRemoteUserIpAddress( rs.getString( "remote_user_ip_address" ) );
		
		int markedForDeletionInt = rs.getInt( "marked_for_deletion" );
		
		if ( markedForDeletionInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {

			returnItem.setMarkedForDeletion( true );
		} else {
			returnItem.setMarkedForDeletion( false );
		}
		
		returnItem.setSearchName( rs.getString( "search_name" ) );
		returnItem.setSearchShortName( rs.getString( "search_short_name" ) );
		
		returnItem.setSearchPath( rs.getString( "search_path" ) );
		
		returnItem.setInsertRequestURL( rs.getString( "insert_request_url" ) );
		
		returnItem.setRecordInsertDateTime( rs.getTimestamp("record_insert_date_time" ) );
		returnItem.setImportStartDateTime( rs.getTimestamp( "import_start_date_time" ) );
		returnItem.setImportEndDateTime( rs.getTimestamp( "import_end_date_time" ) );
		returnItem.setLastUpdatedDateTime( rs.getTimestamp( "last_updated_date_time" ) );
		
		int DeletedByUserId = rs.getInt( "deleted_by_user_id" );
		
		if ( ! rs.wasNull() ) {
			returnItem.setDeletedByUserId( DeletedByUserId );
		}
		returnItem.setDeletedDateTime( rs.getDate( "last_updated_date_time" ) );
		 
		return returnItem;
	}

}
