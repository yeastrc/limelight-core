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
import java.util.Collection;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item;

/**
 * 
 *
 */
@Component
public class ProteinSequenceLengths_For_SearchID_ProteinVersionIds_Searcher extends Limelight_JDBC_Base implements ProteinSequenceLengths_For_SearchID_ProteinVersionIds_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinSequenceLengths_For_SearchID_ProteinVersionIds_Searcher.class );
			
	private static final String QUERY_SQL_PART_1 = 
			"SELECT psv.id AS protein_sequence_version_id, length( protein_sequence_tbl.sequence ) AS sequence_length " 
			+ " FROM protein_sequence_version_tbl AS psv "
			+ "   INNER JOIN (  "
			+ "    SELECT DISTINCT protein_sequence_version_id "
			+ "    FROM srch__prot_seq_v_id_tbl "
			+ " 	WHERE search_id = ? "
			+ "    ) AS proj_seq_v_ids_for_searches "
			+ "      ON psv.id =  "
			+ " 			proj_seq_v_ids_for_searches.protein_sequence_version_id "
			+ "  INNER JOIN protein_sequence_tbl "
			+ " 	   ON psv.protein_sequence_id = protein_sequence_tbl.id "
			+ "    WHERE "
			+ "    psv.id IN ( ";
	
	private static final String QUERY_SQL_PART_2 =
			" ) ";

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinSequenceLengths_For_SearchID_ProteinVersionIds_SearcherIF#getProteinSequences_For_ProteinVersionIdsSearchId(java.util.Collection, int)
	 */
	@Override
	public List<ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item>  getProteinSequences_For_ProteinVersionIdsSearchId( 
			Collection<Integer> proteinSequenceVersionIds,
			int searchId
			) throws SQLException {

		List<ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item> resultList = new ArrayList<>();
		
		if ( proteinSequenceVersionIds == null || proteinSequenceVersionIds.isEmpty() ) {
			//  No input values to search for so return empty list
			return resultList;  //  EARLY RETURN
		}
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );

		querySQL_SB.append( QUERY_SQL_PART_1 );
				
		int proteinSequenceVersionIdsSize = proteinSequenceVersionIds.size();
		for ( int counter = 0; counter < proteinSequenceVersionIdsSize; counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}

		querySQL_SB.append( QUERY_SQL_PART_2 );
		
		final String querySQL = querySQL_SB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchId );

			for ( Integer proteinSequenceVersionId :proteinSequenceVersionIds ) {
				counter++;
				preparedStatement.setInt( counter, proteinSequenceVersionId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item result = new ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item();
					result.setProteinVersionId( rs.getInt( "protein_sequence_version_id" ) );
					result.setProteinSequenceLength( rs.getInt( "sequence_length" )  );
					resultList.add( result );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
