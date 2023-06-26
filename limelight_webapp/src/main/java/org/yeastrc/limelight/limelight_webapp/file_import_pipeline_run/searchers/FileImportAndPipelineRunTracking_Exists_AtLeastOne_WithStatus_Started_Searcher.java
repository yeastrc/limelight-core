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
public class FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher extends Limelight_JDBC_Base implements FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher_IF  {

	private static final Logger log = LoggerFactory.getLogger( FileImportAndPipelineRunTracking_Exists_AtLeastOne_WithStatus_Started_Searcher.class );

	private static final String SQL = 
			" SELECT id FROM import_and_pipeline_run_tracking_tbl WHERE status_id = "
					+ FileImportStatus.STARTED.value()
					+ " AND "
					+ " marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
					+ " LIMIT 1"
					;
	/**
	 * @return true if at least 1 one found
	 * @throws Exception
	 */
	
	@Override
	public boolean exists_AtLeastOne_WithStatus_Started() throws Exception {

		boolean result = false;

		final String querySQL =  SQL;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				if( rs.next() ) {
					result = true;
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select, sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return result;
	}
}
