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
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class ProteinCoverage_For_SearchIdReportedPeptideId_Searcher extends Limelight_JDBC_Base implements ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinCoverage_For_SearchIdReportedPeptideId_Searcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT * "
			+ " FROM "
			+ " protein_coverage_tbl "
			+ " WHERE search_id = ? AND reported_peptide_id = ?";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_For_SearchIdReportedPeptideId_SearcherIF#getProteinCoverage_For_SearchIdReportedPeptideId(int, int)
	 */
	@Override
	public List<ProteinCoverageDTO>  getProteinCoverage_For_SearchIdReportedPeptideId( int searchId, int reportedPeptideId ) throws SQLException {

		List<ProteinCoverageDTO> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			preparedStatement.setInt( 2, reportedPeptideId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinCoverageDTO item = new ProteinCoverageDTO();
					item.setId( rs.getInt( "id" ) );
					item.setSearchId( searchId );
					item.setReportedPeptideId( reportedPeptideId );
					item.setPeptideIdInfoOnly( rs.getInt( "peptide_id_info_only" ) );
					item.setProteinSequenceVersionId( rs.getInt( "protein_sequence_version_id" ) );
					item.setProteinStartPosition( rs.getInt( "protein_start_position" ) );
					item.setProteinEndPosition( rs.getInt( "protein_end_position" ) );
					resultList.add( item );
				}

			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
