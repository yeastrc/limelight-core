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
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher extends Limelight_JDBC_Base implements ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem {
		
		private String name;
		private String description;
		private int taxonomy;
		private int proteinSequenceVersionId;
		
		public String getName() {
			return name;
		}
		public String getDescription() {
			return description;
		}
		public int getTaxonomy() {
			return taxonomy;
		}
		public int getProteinSequenceVersionId() {
			return proteinSequenceVersionId;
		}
	}
	
	private static final String QUERY_SQL = 
			"SELECT psa.name, psa.description , psa.taxonomy, spsva.protein_sequence_version_id "
			+ " FROM search__protein_sequence_version__annotation_tbl AS spsva "
			+ " INNER JOIN protein_sequence_annotation_tbl AS psa"
			+    " ON spsva.annotation_id = psa.id  "
			+ " WHERE "
			+ "  spsva.search_id = ? AND spsva.protein_sequence_version_id IN ( ";
			
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_IF#getProteinAnnotations_For_SearchID_ProteinVersionId_Searcher(int, java.util.List)
	 */
	@Override
	public List<ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem>  getProteinAnnotations_For_SearchID_ProteinVersionIdList_Searcher( 
			
			int searchId,
			List<Integer> proteinSequenceVersionIdList
			) throws SQLException {

		List<ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem> resultList = new ArrayList<>();
		
		if ( proteinSequenceVersionIdList.isEmpty() ) {
			return resultList;
		}
		
		String sql_protein_sequence_version_id_Placeholders = StringUtils.repeat( "?", ",", proteinSequenceVersionIdList.size() );

		final String querySQL = QUERY_SQL + sql_protein_sequence_version_id_Placeholders + ")";
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			counter++;
			preparedStatement.setInt( counter, searchId );
			for ( Integer proteinSequenceVersionId : proteinSequenceVersionIdList ) {
				counter++;
				preparedStatement.setInt( counter, proteinSequenceVersionId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem result = new ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem();
					result.name = rs.getString( "name" );
					result.description = rs.getString( "description" );
					result.taxonomy = rs.getInt( "taxonomy" );
					result.proteinSequenceVersionId = rs.getInt( "protein_sequence_version_id" );
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
