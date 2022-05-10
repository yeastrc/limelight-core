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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the fasta_file_statistics_tbl For Search Id List
 *
 */
@Component
public class FastaFileStatistics_For_SearchIdList_Searcher extends Limelight_JDBC_Base implements FastaFileStatistics_For_SearchIdList_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FastaFileStatistics_For_SearchIdList_Searcher.class );
	
	/**
	 * 
	 *
	 */
	public static class FastaFileStatistics_For_SearchId_Searcher_Result {
		private List<FastaFileStatistics_For_SearchId_Searcher_Result_Item> entries;

		public List<FastaFileStatistics_For_SearchId_Searcher_Result_Item> getEntries() {
			return entries;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FastaFileStatistics_For_SearchId_Searcher_Result_Item {
		private int searchId;
		private int numTargets;
		private int numDecoys;
		private int numIndependentDecoys;
		
		public int getNumTargets() {
			return numTargets;
		}
		public int getNumDecoys() {
			return numDecoys;
		}
		public int getNumIndependentDecoys() {
			return numIndependentDecoys;
		}
		public int getSearchId() {
			return searchId;
		}
	}
	
	private static final String QUERY_START_SQL = 
			"SELECT "
			+ "search_to_fasta_file_statistics_mapping_tbl.search_id, "
			+ "fasta_file_statistics_tbl.num_targets, "
			+ "fasta_file_statistics_tbl.num_decoys, "
			+ "fasta_file_statistics_tbl.num_independent_decoys "
			+ " FROM fasta_file_statistics_tbl "
			+ 	" INNER JOIN search_to_fasta_file_statistics_mapping_tbl ON fasta_file_statistics_tbl.id = search_to_fasta_file_statistics_mapping_tbl.fasta_file_statistics_mapping_id"
			+ " WHERE search_to_fasta_file_statistics_mapping_tbl.search_id IN ( ";


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.FastaFileStatistics_For_SearchIdList_Searcher_IF#getForSearchIdList(java.util.List)
	 */
	@Override
	public FastaFileStatistics_For_SearchId_Searcher_Result  getForSearchIdList( List<Integer> searchIdList ) throws Exception {

		FastaFileStatistics_For_SearchId_Searcher_Result result = new FastaFileStatistics_For_SearchId_Searcher_Result();
		
		List<FastaFileStatistics_For_SearchId_Searcher_Result_Item> entries = new ArrayList<>( searchIdList.size() );
		result.entries = entries;
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		sqlSB.append( QUERY_START_SQL );
		
		final int searchIdList_size = searchIdList.size();
		
		for ( int count = 1; count <= searchIdList_size; count++ ) {
			if ( count > 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( ")" );  //  Close 'IN'

		final String querySQL = sqlSB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Integer searchId : searchIdList ) {
				counter++;
				preparedStatement.setInt( counter, searchId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FastaFileStatistics_For_SearchId_Searcher_Result_Item entry = new FastaFileStatistics_For_SearchId_Searcher_Result_Item();
					entry.searchId = rs.getInt( "search_id" );
					entry.numTargets = rs.getInt( "num_targets" );
					entry.numDecoys = rs.getInt( "num_decoys" );
					entry.numIndependentDecoys = rs.getInt( "num_independent_decoys" );
					entries.add( entry );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
