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
package org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class FileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher extends Limelight_JDBC_Base implements FileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher.class );

	/**
	 * @return
	 * @throws Exception
	 */
	
	@Override
	public ArrayList<Integer> getPendingTrackingIdsAllProjects( ) throws Exception {

		ArrayList<Integer> resultList = new ArrayList<>();
		
		final String sql =  "SELECT id FROM import_and_pipeline_run_tracking_tbl "
				+ " WHERE "
				 + "  status_id IN ( " 
					+ FileImportStatus.QUEUED.value()
					+ ", "
					+ FileImportStatus.RE_QUEUED.value()
					+ ")"
					+ " AND "
					+ " marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
					+ " ORDER BY priority, id ";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					Integer result = rs.getInt( "id" );
					resultList.add( result );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed getPendingTrackingIdsAllProjects( ), sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
}
