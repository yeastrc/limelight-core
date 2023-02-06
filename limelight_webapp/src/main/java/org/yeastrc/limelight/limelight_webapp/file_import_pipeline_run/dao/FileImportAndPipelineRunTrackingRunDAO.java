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
package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result.FileImportAndPipelineRunTrackingRun_PopulateDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table import_and_pipeline_run_tracking_run_tbl
 *
 */
@Component
public class FileImportAndPipelineRunTrackingRunDAO extends Limelight_JDBC_Base implements FileImportAndPipelineRunTrackingRunDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTrackingRunDAO.class );

	/**
	 * @param id
	 * @return 
	 * @throws Exception
	 */
	
	@Override
	public FileImportAndPipelineRunTrackingRunDTO getForId( int id ) throws Exception {
		
		FileImportAndPipelineRunTrackingRunDTO result = null;
		
		final String sql = "SELECT * FROM import_and_pipeline_run_tracking_run_tbl WHERE id = ?";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, id );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = FileImportAndPipelineRunTrackingRun_PopulateDTO.getInstance().populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportAndPipelineRunTrackingRunDTO, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}

}
