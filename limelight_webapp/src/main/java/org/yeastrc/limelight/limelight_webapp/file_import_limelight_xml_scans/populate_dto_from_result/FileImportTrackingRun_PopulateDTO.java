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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.populate_dto_from_result;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * table file_import_tracking_run_tbl
 *
 */
@Component
public class FileImportTrackingRun_PopulateDTO implements FileImportTrackingRun_PopulateDTO_IF {


	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public FileImportTrackingRunDTO populateResultObject(ResultSet rs) throws SQLException {
		
		FileImportTrackingRunDTO returnItem = new FileImportTrackingRunDTO();
		
		returnItem.setId( rs.getInt( "id" ) );

		int currentRunInt = rs.getInt( "current_run" );
		
		if ( currentRunInt == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {

			returnItem.setCurrentRun( true );
		} else {
			returnItem.setCurrentRun( false );
		}
		
		returnItem.setFileImportTrackingId( rs.getInt( "file_import_tracking_id" ) );
		
		returnItem.setRunStatus( FileImportStatus.fromValue( rs.getInt( "status_id" ) ) );
		
		int insertedSearchId = rs.getInt( "inserted_search_id" );
		if ( ! rs.wasNull() ) {
			returnItem.setInsertedSearchId( insertedSearchId );
		}
		
		//  importer_sub_status_id
		
		returnItem.setImportResultText( rs.getString( "import_result_text" ) );
		returnItem.setDataErrorText( rs.getString( "data_error_text" ) );
		
		returnItem.setStartDateTime( rs.getDate( "start_date_time" ) );
		returnItem.setLastUpdatedDateTime( rs.getDate( "last_updated_date_time" ) );
		
		return returnItem;
	}
	
}
