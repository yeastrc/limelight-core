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

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_SubStatus;

/**
 * table import_and_pipeline_run_tracking_run_tbl
 *
 */
public class FileImportAndPipelineRunTrackingRun_PopulateDTO {


	//  private constructor
	private FileImportAndPipelineRunTrackingRun_PopulateDTO() { }
	
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingRun_PopulateDTO getInstance() { 
		return new FileImportAndPipelineRunTrackingRun_PopulateDTO(); 
	}
	

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public FileImportAndPipelineRunTrackingRunDTO populateResultObject(ResultSet rs) throws SQLException {
		
		FileImportAndPipelineRunTrackingRunDTO returnItem = new FileImportAndPipelineRunTrackingRunDTO();
		
		returnItem.setId( rs.getInt( "id" ) );

		returnItem.setFileImportAndPipelineRunTracking_Id( rs.getInt( "import_and_pipeline_run_tracking_id" ) );
		
		returnItem.setStatus( FileImportStatus.fromValue( rs.getInt( "status_id" ) ) );

		{
			int fieldValue_Int = rs.getInt( "sub_status_id" );
			if ( ! rs.wasNull() ) {
				returnItem.setSubStatus( FileImportAndPipelineRun_SubStatus.fromValue( fieldValue_Int ) );
			}
		}
		
		returnItem.setIn_progress_end_user_display_message( rs.getString( "in_progress_end_user_display_message" ) );
		returnItem.setFinished_sucess_end_user_display_message( rs.getString( "finished_sucess_end_user_display_message" ) );
		returnItem.setFinished_success_pipeline_end_user_display_message( rs.getString( "finished_success_pipeline_end_user_display_message" ) );
		returnItem.setFinished_fail_end_user_display_message( rs.getString( "finished_fail_end_user_display_message" ) );
		returnItem.setFinished_fail_pipeline_end_user_display_message( rs.getString( "finished_fail_pipeline_end_user_display_message" ) );
		
		return returnItem;
	}
	

}
