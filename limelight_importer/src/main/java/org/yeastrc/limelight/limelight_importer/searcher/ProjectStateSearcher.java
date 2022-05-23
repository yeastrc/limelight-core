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
package org.yeastrc.limelight.limelight_importer.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.slf4j.Logger;

/**
 * Retrieve info on flags on project_tbl
 *
 */
public class ProjectStateSearcher {

	private static final Logger log = LoggerFactory.getLogger( ProjectStateSearcher.class );
	
	private ProjectStateSearcher() { }
	public static ProjectStateSearcher getInstance() { return new ProjectStateSearcher(); }
	
	/**
	 * @param projectId
	 * @return null if projectId not found
	 * @throws Exception
	 */
	public ProjectStateSearcherResults getProjectState( int projectId ) throws Exception {
		
		ProjectStateSearcherResults result = null;
		
		final String sql = "SELECT project_locked, enabled, marked_for_deletion FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, projectId );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if ( rs.next() ) {
						result = new ProjectStateSearcherResults();
						{
							int fieldIntValue = rs.getInt( "project_locked" );
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								result.setProjectLocked( true );
							}
						}
						{
							int fieldIntValue = rs.getInt( "enabled" );
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								result.setProjectEnabled( true );
							}
						}
						{
							int fieldIntValue = rs.getInt( "marked_for_deletion" );
							if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
								result.setProjectMarkedForDeletion( true );
							}
						}
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getProjectState(...) sql: " + sql, e );
			throw e;
		}

		return result;
	}
	
}
