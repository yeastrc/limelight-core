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
package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;

/**
 * table import_and_pipeline_run_tracking_tbl
 *
 */
public class FileImportAndPipelineRunTracking_PopulateDTO {

	//  private constructor
	private FileImportAndPipelineRunTracking_PopulateDTO() { }
	
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTracking_PopulateDTO getInstance() { 
		return new FileImportAndPipelineRunTracking_PopulateDTO(); 
	}
	

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public FileImportAndPipelineRunTrackingDTO populateResultObject(ResultSet rs) throws SQLException {
		
		FileImportAndPipelineRunTrackingDTO returnItem = new FileImportAndPipelineRunTrackingDTO();
		
		returnItem.setId( rs.getInt( "id" ) );
		
		returnItem.setRequestType( FileImportAndPipelineRun_RequestType.fromValue( rs.getInt( "request_type" ) ) );
		returnItem.setProjectId( rs.getInt( "project_id" ) );
		returnItem.setPriority( rs.getInt( "priority" ) );
		returnItem.setUserId( rs.getInt( "insert_request_user_id" ) );

		returnItem.setStatus( FileImportStatus.fromValue( rs.getInt( "status_id" ) ) );
		
		{
			int fieldValue_Int = rs.getInt( "marked_for_deletion" );

			if ( fieldValue_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {

				returnItem.setMarkedForDeletion( true );
			} else {
				returnItem.setMarkedForDeletion( false );
			}
		}
		
		returnItem.setRequestData_Format_VersionNumber( rs.getInt( "request_data_format_version_number" ) );
		returnItem.setRequestData_Content_VersionNumber(rs.getInt( "request_data_contents_version_number" ) );
		returnItem.setRequestData_AsString( rs.getString( "request_data" ) );
		
		returnItem.setRequestData_LabelValuePairs_JSON_Format_VersionNumber( rs.getInt( "request_data__label_value_pairs__json__format_version_number" ) );
		returnItem.setRequestData_LabelValuePairs_JSON_Content_VersionNumber( rs.getInt( "request_data__label_value_pairs__json__content_version_number" ) );
		returnItem.setRequestData_LabelValuePairs_JSON_AsString( rs.getString( "request_data__label_value_pairs__json" ) );
		  
		{
			int fieldValue_Int = rs.getInt( "run_id_for_status_id" );

			if ( ! rs.wasNull() ) {
				returnItem.setRun_id_for_status_id(fieldValue_Int);;
			}
		}
		
		returnItem.setInsertRequestURL( rs.getString( "insert_request_url" ) );
		returnItem.setInsertRequest_RemoteUserIpAddress( rs.getString( "insert_request__remote_user_ip_address" ) );
		
		returnItem.setRecordInsertDateTime( rs.getTimestamp("record_insert_date_time" ) );
		returnItem.setLastUpdatedDateTime( rs.getTimestamp( "last_updated_date_time" ) );
		
		returnItem.setRunStartDateTime( rs.getTimestamp( "run_start_date_time" ) );
		returnItem.setRunEndDateTime( rs.getTimestamp( "run_end_date_time" ) );
		
		{
			int fieldValue = rs.getInt( "deleted_by_user_id" );

			if ( ! rs.wasNull() ) {
				returnItem.setDeletedByUserId( fieldValue );
			}
		}
		returnItem.setDeletedDateTime( rs.getDate( "deleted_date_time" ) );
		 
		return returnItem;
	}

}
