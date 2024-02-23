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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the Reported Peptide Ids for
 * 
 * Protein Sequence Version Ids
 * Reported Peptide Ids
 * 
 * So returns the input Reported Peptide Ids that are in the Protein Sequence Version Ids
 *
 */
@Component
public class ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher extends Limelight_JDBC_Base implements ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher.class );

	private static final String QUERY_SQL_START = 
			"SELECT reported_peptide_id "
			+ " FROM srch_rep_pept__prot_seq_v_id_tbl  "
			+ " WHERE "
			+ "  search_id = ? AND protein_sequence_version_id IN ( ";
	
	private static final String QUERY_SQL_ADD =
			" ) AND reported_peptide_id IN ( ";
			
	private static final String QUERY_SQL_END =
			" ) ";
			
	/**
	 * Get the Reported Peptide Ids for
	 * 
	 * Protein Sequence Version Ids
	 * Reported Peptide Ids
	 * 
	 * So returns the input Reported Peptide Ids that are in the Protein Sequence Version Ids
	 * 
	 * @param searchId
	 * @param proteinSequenceVersionIds
	 * @param reportedPeptideIds
	 * @return
	 * @throws Exception
	 */
	@Override
	public Set<Integer>  get_ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds( 
			
			int searchId,
			List<Integer> proteinSequenceVersionIds,
			List<Integer> reportedPeptideIds
			
			) throws Exception {

		if ( proteinSequenceVersionIds == null || ( proteinSequenceVersionIds.isEmpty() ) ) {
			return new HashSet<>();
		}
		if ( reportedPeptideIds == null || ( reportedPeptideIds.isEmpty() ) ) {
			return new HashSet<>();
		}

		Set<Integer> resultList = new HashSet<>( reportedPeptideIds.size() );
		
		StringBuilder sql_proteinSequenceVersionIds_Params_SB = new StringBuilder( proteinSequenceVersionIds.size() * 5 );
		StringBuilder sql_reportedPeptideIds_Params_SB = new StringBuilder( reportedPeptideIds.size() * 5 );
		
		for ( int counter = 1; counter <= proteinSequenceVersionIds.size(); counter++ ) {
			if ( counter != 1 ) {
				sql_proteinSequenceVersionIds_Params_SB.append( "," );
			}
			sql_proteinSequenceVersionIds_Params_SB.append( "?" );
		}

		for ( int counter = 1; counter <= reportedPeptideIds.size(); counter++ ) {
			if ( counter != 1 ) {
				sql_reportedPeptideIds_Params_SB.append( "," );
			}
			sql_reportedPeptideIds_Params_SB.append( "?" );
		}
		

		String querySQL = 
				QUERY_SQL_START 
				+ sql_proteinSequenceVersionIds_Params_SB.toString() 
				+ QUERY_SQL_ADD
				+ sql_reportedPeptideIds_Params_SB
				+ QUERY_SQL_END;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, searchId );
			
			for ( Integer proteinSequenceVersionId : proteinSequenceVersionIds ) {
				counter++;
				preparedStatement.setInt( counter, proteinSequenceVersionId );
			}

			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					resultList.add( rs.getInt( "reported_peptide_id" ) );
				}
			}
		} catch ( Exception e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
