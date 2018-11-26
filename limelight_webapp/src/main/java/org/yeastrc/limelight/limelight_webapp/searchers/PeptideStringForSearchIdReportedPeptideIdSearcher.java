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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Component
public class PeptideStringForSearchIdReportedPeptideIdSearcher extends Limelight_JDBC_Base implements PeptideStringForSearchIdReportedPeptideIdSearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PeptideStringForSearchIdReportedPeptideIdSearcher.class );
		
	private static final String QUERY_SQL = 
			"SELECT peptide_tbl.sequence "
			+ " FROM "
			+ " search_reported_peptide_tbl INNER JOIN peptide_tbl ON search_reported_peptide_tbl.peptide_id = peptide_tbl.id "
			+ " WHERE search_reported_peptide_tbl.search_id = ? AND search_reported_peptide_tbl.reported_peptide_id = ?";
			  
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF#getSearchListForProjectId(int, int)
	 */
	@Override
	public String getPeptideSequenceStringForSearchIdReportedPeptideId( int searchId, int reportedPeptideId ) throws SQLException {

		String result = null;

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			preparedStatement.setInt( 2, reportedPeptideId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "sequence" );
				}
				if ( rs.next() ) {
					throw new LimelightInternalErrorException( "Found > 1 records for searchId: " + searchId + ", reportedPeptideId: " + reportedPeptideId );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
