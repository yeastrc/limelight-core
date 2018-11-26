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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.populate_dto_from_result.FileImportTrackingRun_PopulateDTO_IF;

/**
 * 
 *
 */
@Component
public class FileImportTrackingRun_LatestForParent_Searcher extends Limelight_JDBC_Base implements FileImportTrackingRun_LatestForParent_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingRun_LatestForParent_Searcher.class );
	
	@Autowired
	private FileImportTrackingRun_PopulateDTO_IF fileImportTrackingRun_PopulateDTO;


	private static final String SQL =  "SELECT * FROM file_import_tracking_run_tbl "
			+ " WHERE id = "
			+ 		"( SELECT MAX(id) from file_import_tracking_run_tbl "
			+ 		" WHERE file_import_tracking_id = ? )";
	
	/**
	 * @param fileImportTrackingId
	 * @return
	 * @throws Exception
	 */
	@Override
	public FileImportTrackingRunDTO getLatestRunForFileImportTrackingDTO( int fileImportTrackingId ) throws Exception {
		
		FileImportTrackingRunDTO result = null;

		final String sql =  SQL;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, fileImportTrackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					result = fileImportTrackingRun_PopulateDTO.populateResultObject( rs );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed getLatestRunForFileImportTrackingDTO(...), sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return result;
	}

}
