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
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequences_For_ProteinVersionIds_SearchIds_Item;

/**
 * 
 *
 */
@Component
public class ProteinSequences_For_ProteinVersionIds_SearchIds_Searcher extends Limelight_JDBC_Base implements ProteinSequences_For_ProteinVersionIds_SearchIds_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinSequences_For_ProteinVersionIds_SearchIds_Searcher.class );
			
	private static final String QUERY_SQL_PART_1 = 
			"SELECT psv.id AS protein_sequence_version_id, protein_sequence_tbl.sequence " 
			+ " FROM protein_sequence_version_tbl AS psv "
			+ "   INNER JOIN (  "
			+ "    SELECT DISTINCT protein_sequence_version_id "
			+ "    FROM srch__prot_seq_v_id_tbl "
			+ " 	WHERE search_id IN ( ";
			
	private static final String QUERY_SQL_PART_2 =
			" ) "
			+ "    ) AS proj_seq_v_ids_for_searches "
			+ "      ON psv.id =  "
			+ " 			proj_seq_v_ids_for_searches.protein_sequence_version_id "
			+ "  INNER JOIN protein_sequence_tbl "
			+ " 	   ON psv.protein_sequence_id = protein_sequence_tbl.id "
			+ "    WHERE "
			+ "    psv.id IN ( ";
	private static final String QUERY_SQL_PART_3 =
			" ) ";

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinSequences_For_ProteinVersionIds_SearchIds_SearcherIF#getProteinSequences_For_ProteinVersionIdsSearchIds(java.util.Collection, java.util.Collection)
	 */
	@Override
	public List<ProteinSequences_For_ProteinVersionIds_SearchIds_Item>  getProteinSequences_For_ProteinVersionIdsSearchIds( 
			Collection<Integer> proteinSequenceVersionIds,
			Collection<Integer> searchIds
			) throws SQLException {

		if ( proteinSequenceVersionIds == null || proteinSequenceVersionIds.isEmpty() || searchIds == null || searchIds.isEmpty() ) {
			//  No request parameters so return empty list
			return new ArrayList<>(); // EARLY RETURN
		}
		
		List<ProteinSequences_For_ProteinVersionIds_SearchIds_Item> resultList = new ArrayList<>();
		
		StringBuilder querySQL_SB = new StringBuilder( 1000 );

		querySQL_SB.append( QUERY_SQL_PART_1 );
		
		int searchIdsSize = searchIds.size();
		for ( int counter = 0; counter < searchIdsSize; counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}

		querySQL_SB.append( QUERY_SQL_PART_2 );
		
		int proteinSequenceVersionIdsSize = proteinSequenceVersionIds.size();
		for ( int counter = 0; counter < proteinSequenceVersionIdsSize; counter++ ) {
			if ( counter != 0 ) {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}

		querySQL_SB.append( QUERY_SQL_PART_3 );
		
		final String querySQL = querySQL_SB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer searchId :searchIds ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}
			for ( Integer proteinSequenceVersionId :proteinSequenceVersionIds ) {
				counter++;
				preparedStatement.setInt( counter, proteinSequenceVersionId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinSequences_For_ProteinVersionIds_SearchIds_Item result = new ProteinSequences_For_ProteinVersionIds_SearchIds_Item();
					result.setProteinVersionId( rs.getInt( "protein_sequence_version_id" ) );
					result.setProteinSequence( rs.getString( "sequence" )  );
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
