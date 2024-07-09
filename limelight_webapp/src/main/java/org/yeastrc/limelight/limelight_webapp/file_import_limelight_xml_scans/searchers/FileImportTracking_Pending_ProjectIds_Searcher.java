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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Search file_import_tracking_tbl
 *
 */
@Component
public class FileImportTracking_Pending_ProjectIds_Searcher extends Limelight_JDBC_Base implements FileImportTracking_Pending_ProjectIds_Searcher_IF  {
	
	private static final Logger log = LoggerFactory.getLogger( FileImportTracking_Pending_ProjectIds_Searcher.class );
	
	private static final String SQL = 
			"SELECT DISTINCT project_id AS project_id FROM file_import_tracking_tbl"
					+ " WHERE "
			+ "  marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
			+ " AND status_id IN ( " 
			+ FileImportStatus.QUEUED.value()
			+ ", "
			+ FileImportStatus.RE_QUEUED.value()
			+ ", "
			+ FileImportStatus.STARTED.value()
			+ " ) "
			;
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_Pending_ProjectIds_Searcher_IF#getPending_ProjectIds()
	 */
	@Override
	public List<Integer> getPending_ProjectIds() throws Exception {

		List<Integer> resultList = new ArrayList<>();

		final String sql =  SQL;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					resultList.add( rs.getInt( "project_id" ) );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select project ids, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
}
